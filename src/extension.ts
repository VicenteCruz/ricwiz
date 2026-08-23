import * as vscode from 'vscode';
import { getCurrentBranch } from './git';
import { CommitEntry, EnvironmentConfig } from './types';
import { getRelatedBranchesStatus, getCurrentBranchMergeStatus, getRecentCommits, getRecentTickets, findRelatedBranches } from './branchStatus';
import { RicwizWebviewProvider } from './webview';
import { createBranches } from './commands/createBranches';
import { prepareDeploy } from './commands/prepareDeploy';
import { createMergeRequests, createMergeRequestsVSCode } from './commands/mergeRequests';
import { openJiraTicket, openJiraTicketVSCode } from './commands/jira';
import { syncAll } from './commands/syncAll';
import { updateBases } from './commands/updateBases';
import { deleteUnusedBranches } from './commands/deleteUnused';
import { checkoutBranch } from './commands/checkoutBranch';
import { copyBranchName } from './commands/copyBranch';
import { generatePackageXml } from './commands/generatePackageXml';
import { deployPackage } from './commands/deployPackage';
import { importData } from './commands/importData';
import { listTicketFiles } from './commands/listTicketFiles';
import { resetTracking } from './commands/resetTracking';
import { extractComponent } from './commands/extractComponent';
import { deployMultiOrg } from './commands/deployMultiOrg';
import { captureAdminChanges } from './commands/captureAdminChanges';
import { openHistory } from './commands/openHistory';
import { searchTicket } from './commands/searchTicket';
import { getBlameData } from './commands/whoToBlame';
import { generateDestructiveChanges } from './commands/generateDestructiveChanges';
import { runSmartTests } from './commands/runSmartTests';
import { showJiraDetails } from './commands/showJiraDetails';
import { changeJiraStatus, addJiraCommentCommand, addJiraLabelCommand, setJiraTokenCommand } from './commands/jiraOperations';
import { initializeSecrets } from './secrets';

export let webviewProvider: RicwizWebviewProvider | undefined;

export function activate(context: vscode.ExtensionContext) {
    initializeSecrets(context);
    webviewProvider = new RicwizWebviewProvider(context.extensionUri);
    context.subscriptions.push(
        vscode.window.registerWebviewViewProvider('ricwiz-webview', webviewProvider)
    );

    // Status Bar Item — shows current ticket, click opens Jira
    const statusBarItem = vscode.window.createStatusBarItem(vscode.StatusBarAlignment.Left, 100);
    statusBarItem.command = 'ricwiz.openJiraTicket';
    context.subscriptions.push(statusBarItem);

    // ─── Git Integration (Auto Commit Message, Webview Update, Status Bar Update) ───
    /** Exposed so the manual refresh command can trigger an update from outside setupRepo */
    let forceUpdate: (() => void) | undefined;

    // Initialize auto-refresh from VS Code settings
    const initialAutoRefresh = vscode.workspace.getConfiguration('ricwiz').get<boolean>('autoRefresh', true);
    webviewProvider.setAutoRefresh(initialAutoRefresh);

    // Keep webview toggle in sync when the user changes the setting via Settings UI
    context.subscriptions.push(
        vscode.workspace.onDidChangeConfiguration(e => {
            if (e.affectsConfiguration('ricwiz.autoRefresh')) {
                const enabled = vscode.workspace.getConfiguration('ricwiz').get<boolean>('autoRefresh', true);
                webviewProvider?.setAutoRefresh(enabled);
            }
        })
    );

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
                let updateTimer: ReturnType<typeof setTimeout> | undefined;
                
                async function update() {
                    const workspaceFolders = vscode.workspace.workspaceFolders;
                    if (!workspaceFolders) return;
                    const cwd = workspaceFolders[0].uri.fsPath;
                    const currentBranch = await getCurrentBranch(cwd);
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
                            const buttons = config.get<string[]>('workspaceCheckoutButtons', ['main', 'quality', 'validation']);
                            baseBranches = Array.from(new Set(buttons));
                        } catch (e) {}

                        const match = currentBranch.match(new RegExp(`(${prefix}\\d+(?:-\\d+)?)`, 'i'));
                        if (match) {
                            const ticketId = match[1].toUpperCase();
                            const suffix = config.get<string>('commitMessageSuffix', '- ');
                            
                            const existingTicketPattern = /^[A-Z]+-\d+(?:-\d+)?\s*(?:-\s*|:\s*|\s+)?/i;
                            if (existingTicketPattern.test(repo.inputBox.value)) {
                                if (!repo.inputBox.value.toUpperCase().startsWith(ticketId)) {
                                    // Replace the old ticket prefix with the new one
                                    repo.inputBox.value = repo.inputBox.value.replace(existingTicketPattern, `${ticketId}${suffix}`);
                                }
                            } else {
                                // Prepend the new ticket prefix
                                repo.inputBox.value = `${ticketId}${suffix}` + repo.inputBox.value;
                            }

                            // Update status bar with ticket ID
                            statusBarItem.text = `$(bookmark) ${ticketId}`;
                            statusBarItem.tooltip = `Branch: ${currentBranch}\nClick to open Jira ticket`;
                            statusBarItem.show();

                            // Fetch related branches and their merge status in parallel
                            try {
                                const relatedBranchNames = await findRelatedBranches(cwd, ticketId, currentBranch);
                                relatedBranches = await getRelatedBranchesStatus(cwd, relatedBranchNames, ticketId, environments);
                            } catch (e) {}
                        } else {
                            // Not on a ticket branch — hide status bar
                            statusBarItem.hide();

                            try {
                                recentTickets = await getRecentTickets(cwd);
                            } catch (e) {}
                        }

                        // Fetch recent commits and current branch merge status in parallel
                        const [fetchedCommits, currentBranchIsMerged] = await Promise.all([
                            getRecentCommits(cwd, 10),
                            getCurrentBranchMergeStatus(cwd, currentBranch, environments)
                        ]);
                        commits = fetchedCommits;

                        webviewProvider?.updateBranch(currentBranch, currentBranchIsMerged, relatedBranches, commits, baseBranches, recentTickets);
                    }
                }

                /** Debounced update to avoid git command storms on rapid state changes */
                function scheduleUpdate() {
                    if (!webviewProvider?.isAutoRefreshEnabled()) {
                        return;
                    }
                    if (updateTimer) {
                        clearTimeout(updateTimer);
                    }
                    updateTimer = setTimeout(() => {
                        lastBranch = '';
                        update();
                    }, 300);
                }

                /** Expose a way to force a manual refresh from outside this closure */
                forceUpdate = () => {
                    lastBranch = '';
                    update();
                };

                update();
                repo.state.onDidChange(() => scheduleUpdate());
                vscode.window.onDidChangeWindowState(e => {
                    if (e.focused) {
                        scheduleUpdate();
                    }
                });
            }
        }
    }
    initGit();

    // ─── Register All Commands ──────────────────────────────────────────
    context.subscriptions.push(
        vscode.commands.registerCommand('ricwiz.generateDestructiveChanges', generateDestructiveChanges),
        vscode.commands.registerCommand('ricwiz.runSmartTests', runSmartTests),
        vscode.commands.registerCommand('ricwiz.refreshWebview', () => { if (webviewProvider) vscode.commands.executeCommand('workbench.action.webview.reloadWebviewAction'); }),
        vscode.commands.registerCommand('ricwiz.createBranches', createBranches),
        vscode.commands.registerCommand('ricwiz.prepareDeploy', prepareDeploy),
        vscode.commands.registerCommand('ricwiz.createMergeRequests', createMergeRequests),
        vscode.commands.registerCommand('ricwiz.createMergeRequestsVSCode', createMergeRequestsVSCode),
        vscode.commands.registerCommand('ricwiz.openJiraTicket', openJiraTicket),
        vscode.commands.registerCommand('ricwiz.openJiraTicketVSCode', openJiraTicketVSCode),
        vscode.commands.registerCommand('ricwiz.showJiraDetails', () => { if (webviewProvider) showJiraDetails(webviewProvider); }),
        vscode.commands.registerCommand('ricwiz.changeJiraStatus', changeJiraStatus),
        vscode.commands.registerCommand('ricwiz.addJiraComment', addJiraCommentCommand),
        vscode.commands.registerCommand('ricwiz.addJiraLabel', addJiraLabelCommand),
        vscode.commands.registerCommand('ricwiz.setJiraToken', setJiraTokenCommand),
        vscode.commands.registerCommand('ricwiz.syncAll', syncAll),
        vscode.commands.registerCommand('ricwiz.updateBases', updateBases),
        vscode.commands.registerCommand('ricwiz.deleteUnusedBranches', deleteUnusedBranches),
        vscode.commands.registerCommand('ricwiz.checkoutBranch', checkoutBranch),
        vscode.commands.registerCommand('ricwiz.copyBranchName', copyBranchName),
        vscode.commands.registerCommand('ricwiz.generatePackageXml', generatePackageXml),
        vscode.commands.registerCommand('ricwiz.deployPackage', deployPackage),
        vscode.commands.registerCommand('ricwiz.importData', importData),
        vscode.commands.registerCommand('ricwiz.listTicketFiles', listTicketFiles),
        vscode.commands.registerCommand('ricwiz.resetTracking', resetTracking),
        vscode.commands.registerCommand('ricwiz.extractComponent', extractComponent),
        vscode.commands.registerCommand('ricwiz.deployMultiOrg', deployMultiOrg),
        vscode.commands.registerCommand('ricwiz.captureAdminChanges', captureAdminChanges),
        vscode.commands.registerCommand('ricwiz.openHistory', openHistory),
        vscode.commands.registerCommand('ricwiz.searchTicket', searchTicket),
        vscode.commands.registerCommand('ricwiz.whoToBlame', async () => {
            const data = await getBlameData();
            if (data && webviewProvider) {
                webviewProvider.setBlameData(data);
                webviewProvider.setPage('blame');
            }
        }),
        vscode.commands.registerCommand('ricwiz.manualRefresh', () => {
            if (forceUpdate) {
                forceUpdate();
            }
        }),
        vscode.commands.registerCommand('ricwiz.toggleAutoRefresh', () => {
            if (webviewProvider) {
                const newState = !webviewProvider.isAutoRefreshEnabled();
                webviewProvider.setAutoRefresh(newState);
                // Persist to VS Code settings so it survives restarts
                vscode.workspace.getConfiguration('ricwiz').update('autoRefresh', newState, vscode.ConfigurationTarget.Global);
            }
        }),
        vscode.commands.registerCommand('ricwiz.openSettings', () => {
            vscode.commands.executeCommand('workbench.action.openSettings', 'ricwiz');
        })
    );
}

export function deactivate() {}



