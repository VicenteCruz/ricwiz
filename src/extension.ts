import * as vscode from 'vscode';
import { exec } from './git';
import { CommitEntry, EnvironmentConfig } from './types';
import { RicwizWebviewProvider } from './webview';
import { createBranches } from './commands/createBranches';
import { prepareDeploy } from './commands/prepareDeploy';
import { createMergeRequests, createMergeRequestsVSCode } from './commands/mergeRequests';
import { openJiraTicket, openJiraTicketVSCode } from './commands/jira';
import { syncAll } from './commands/syncAll';
import { deleteUnusedBranches } from './commands/deleteUnused';
import { checkoutBranch } from './commands/checkoutBranch';
import { copyBranchName } from './commands/copyBranch';
import { generatePackageXml } from './commands/generatePackageXml';
import { deployPackage } from './commands/deployPackage';
import { importData } from './commands/importData';
import { listTicketFiles } from './commands/listTicketFiles';
import { resetTracking } from './commands/resetTracking';
import { captureAdminChanges } from './commands/captureAdminChanges';

export let webviewProvider: RicwizWebviewProvider | undefined;

export function activate(context: vscode.ExtensionContext) {
    webviewProvider = new RicwizWebviewProvider(context.extensionUri);
    context.subscriptions.push(
        vscode.window.registerWebviewViewProvider('ricwiz-webview', webviewProvider)
    );

    // Status Bar Item — shows current ticket, click opens Jira
    const statusBarItem = vscode.window.createStatusBarItem(vscode.StatusBarAlignment.Left, 100);
    statusBarItem.command = 'ricwiz.openJiraTicket';
    context.subscriptions.push(statusBarItem);

    // ─── Git Integration (Auto Commit Message, Webview Update, Status Bar Update) ───
    async function initGit() {
        const gitExtension = vscode.extensions.getExtension('vscode.git');
        if (gitExtension) {
            if (!gitExtension.isActive) {
                await gitExtension.activate();
            }
            const git = gitExtension.exports.getAPI(1);
            if (git.repositories.length > 0) {
                git.repositories.forEach((repo: any) => setupRepo(repo));
            }
            git.onDidOpenRepository((repo: any) => setupRepo(repo));
            
            function setupRepo(repo: any) {
                let lastBranch = '';
                
                async function update() {
                    const currentBranch = repo.state.HEAD?.name;
                    if (currentBranch && currentBranch !== lastBranch) {
                        lastBranch = currentBranch;
                        
                        const config = vscode.workspace.getConfiguration('ricwiz');
                        let prefix = config.get<string>('ticketPrefix', 'SFPSCA-');
                        
                        if (!currentBranch.includes(prefix)) {
                            const guessMatch = currentBranch.match(/([A-Z]+-)\d+/i);
                            if (guessMatch) {
                                prefix = guessMatch[1].toUpperCase();
                            }
                        }

                        let relatedBranches: { name: string, isMerged: boolean }[] = [];
                        let commits: CommitEntry[] = [];
                        let baseBranches: string[] = [];
                        let recentTickets: string[] = [];

                        const environments = config.get<EnvironmentConfig[]>('environments', [
                            { name: 'Qual', sourceBranch: 'quality' },
                            { name: 'Val', sourceBranch: 'validation' },
                            { name: 'Prod', sourceBranch: 'main' }
                        ]);

                        try {
                            const sourceBranchForTicket = config.get<string>('ticketSourceBranch', 'main');
                            
                            const allBase = [sourceBranchForTicket, ...environments.map(e => e.sourceBranch)];
                            baseBranches = Array.from(new Set(allBase));
                        } catch (e) {}

                        const match = currentBranch.match(new RegExp(`(${prefix}\\d+)`, 'i'));
                        if (match) {
                            const ticketId = match[1].toUpperCase();
                            const suffix = config.get<string>('commitMessageSuffix', '- ');
                            if (!repo.inputBox.value.toUpperCase().startsWith(ticketId)) {
                                repo.inputBox.value = `${ticketId}${suffix}` + repo.inputBox.value;
                            }

                            // Update status bar with ticket ID
                            statusBarItem.text = `$(bookmark) ${ticketId}`;
                            statusBarItem.tooltip = `Branch: ${currentBranch}\nClick to open Jira ticket`;
                            statusBarItem.show();

                            try {
                                const workspaceFolders = vscode.workspace.workspaceFolders;
                                if (workspaceFolders) {
                                    const cwd = workspaceFolders[0].uri.fsPath;
                                    const { stdout } = await exec(`git branch --list "*${ticketId}*"`, { cwd });
                                    const relatedBranchesRaw = stdout.split('\n')
                                        .map((b: string) => b.replace('*', '').trim())
                                        .filter((b: string) => b && b !== currentBranch);

                                    // Determine if sister branches are merged into their target org branch
                                    for (const rb of relatedBranchesRaw) {
                                        let isMerged = false;
                                        for (const env of environments) {
                                            if (rb.endsWith(`-to-${env.name}`)) {
                                                try {
                                                    await exec(`git merge-base --is-ancestor ${rb} origin/${env.sourceBranch}`, { cwd });
                                                    isMerged = true;
                                                } catch {
                                                    try {
                                                        await exec(`git merge-base --is-ancestor ${rb} ${env.sourceBranch}`, { cwd });
                                                        isMerged = true;
                                                    } catch {}
                                                }
                                                break;
                                            }
                                        }
                                        relatedBranches.push({ name: rb, isMerged });
                                    }
                                }
                            } catch (e) {}
                        } else {
                            // Not on a ticket branch — hide status bar
                            statusBarItem.hide();

                            try {
                                const workspaceFolders = vscode.workspace.workspaceFolders;
                                if (workspaceFolders) {
                                    const cwd = workspaceFolders[0].uri.fsPath;
                                    const { stdout } = await exec(`git for-each-ref --sort=-committerdate --format="%(refname:short)" refs/heads/`, { cwd });
                                    const allBranches = stdout.split('\n').map((b: string) => b.trim()).filter((b: string) => b);
                                    
                                    // Match ticket patterns (e.g., SFPSC-11111) but NOT environment branches (-to-Qual)
                                    const ticketPattern = /^[A-Z]+-\d+$/i;
                                    recentTickets = allBranches.filter((b: string) => ticketPattern.test(b)).slice(0, 3);
                                }
                            } catch (e) {}
                        }

                        // Fetch recent commits for the Git Log
                        try {
                            const workspaceFolders = vscode.workspace.workspaceFolders;
                            if (workspaceFolders) {
                                const cwd = workspaceFolders[0].uri.fsPath;
                                const { stdout } = await exec(`git log --oneline -10 --format="%h|||%s|||%ar"`, { cwd });
                                commits = stdout.split('\n')
                                    .filter((line: string) => line.trim())
                                    .map((line: string) => {
                                        const parts = line.split('|||');
                                        return {
                                            hash: parts[0] || '',
                                            message: parts.length >= 3 ? parts.slice(1, -1).join('|||') : (parts[1] || ''),
                                            timeAgo: parts.length >= 3 ? parts[parts.length - 1] : ''
                                        };
                                    });
                            }
                        } catch (e) {}
                        
                        webviewProvider?.updateBranch(currentBranch, relatedBranches, commits, baseBranches, recentTickets);
                    }
                }

                update();
                repo.state.onDidChange(update);
            }
        }
    }
    initGit();

    // ─── Register All Commands ──────────────────────────────────────────
    context.subscriptions.push(
        vscode.commands.registerCommand('ricwiz.createBranches', createBranches),
        vscode.commands.registerCommand('ricwiz.prepareDeploy', prepareDeploy),
        vscode.commands.registerCommand('ricwiz.createMergeRequests', createMergeRequests),
        vscode.commands.registerCommand('ricwiz.createMergeRequestsVSCode', createMergeRequestsVSCode),
        vscode.commands.registerCommand('ricwiz.openJiraTicket', openJiraTicket),
        vscode.commands.registerCommand('ricwiz.openJiraTicketVSCode', openJiraTicketVSCode),
        vscode.commands.registerCommand('ricwiz.syncAll', syncAll),
        vscode.commands.registerCommand('ricwiz.deleteUnusedBranches', deleteUnusedBranches),
        vscode.commands.registerCommand('ricwiz.checkoutBranch', checkoutBranch),
        vscode.commands.registerCommand('ricwiz.copyBranchName', copyBranchName),
        vscode.commands.registerCommand('ricwiz.generatePackageXml', generatePackageXml),
        vscode.commands.registerCommand('ricwiz.deployPackage', deployPackage),
        vscode.commands.registerCommand('ricwiz.importData', importData),
        vscode.commands.registerCommand('ricwiz.listTicketFiles', listTicketFiles),
        vscode.commands.registerCommand('ricwiz.resetTracking', resetTracking),
        vscode.commands.registerCommand('ricwiz.captureAdminChanges', captureAdminChanges),
        vscode.commands.registerCommand('ricwiz.openSettings', () => {
            vscode.commands.executeCommand('workbench.action.openSettings', 'ricwiz');
        })
    );
}

export function deactivate() {}
