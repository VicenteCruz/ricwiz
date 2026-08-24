import * as vscode from 'vscode';
import { getCurrentBranch } from './git';
import { CommitEntry, EnvironmentConfig } from './types';
import { getRelatedBranchesStatus, getCurrentBranchMergeStatus, getRecentCommits, getRecentTickets, findRelatedBranches } from './branchStatus';
import { RicwizWebviewProvider } from './webview';
import { fetchJiraIssue } from './jiraApi';
import { WorkflowContext } from './workflows/WorkflowContext';

export function initializeGitMonitor(
    context: vscode.ExtensionContext,
    webviewProvider: RicwizWebviewProvider | undefined,
    statusBarItem: vscode.StatusBarItem
): (() => void) | undefined {
    let forceUpdate: (() => void) | undefined;

    // Initialize auto-refresh from VS Code settings
    const initialAutoRefresh = vscode.workspace.getConfiguration('ricwiz').get<boolean>('autoRefresh', true);
    webviewProvider?.setAutoRefresh(initialAutoRefresh);

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

                        const ctx = await WorkflowContext.initialize(cwd, { skipPrompt: true });
                        const environments = ctx?.environments || config.get<EnvironmentConfig[]>('environments', [
                            { name: 'Qual', sourceBranch: 'quality' },
                            { name: 'Val', sourceBranch: 'validation' },
                            { name: 'Prod', sourceBranch: 'main' }
                        ]);

                        try {
                            const buttons = config.get<string[]>('workspaceCheckoutButtons', ['main', 'quality', 'validation']);
                            baseBranches = Array.from(new Set(buttons));
                        } catch (e) {}

                        let ticketIdForJira = '';

                        const match = currentBranch.match(new RegExp(`(${prefix}\\d+(?:-\\d+)?)`, 'i'));
                        if (match) {
                            const ticketId = match[1].toUpperCase();
                            ticketIdForJira = ticketId;
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
                                const relatedBranchNames = await findRelatedBranches(cwd, ticketId, '');
                                relatedBranches = await getRelatedBranchesStatus(cwd, relatedBranchNames, ticketId, environments, ctx);
                            } catch (e) {}
                        } else {
                            // Not on a ticket branch — hide status bar
                            statusBarItem.hide();

                            try {
                                recentTickets = await getRecentTickets(cwd);
                            } catch (e) {}
                        }

                        // Fetch recent commits, current branch merge status, and jira issue in parallel
                        const [fetchedCommits, currentBranchIsMerged, jiraIssue] = await Promise.all([
                            getRecentCommits(cwd, 10),
                            getCurrentBranchMergeStatus(cwd, currentBranch, environments, ctx),
                            ticketIdForJira ? fetchJiraIssue(ticketIdForJira).catch((e: any) => {
                                let msg = e.message;
                                if (msg.includes('ENOTFOUND') || msg.includes('network')) {
                                    msg = 'No Internet or Invalid URL';
                                }
                                return { summary: `⚠️ Jira Error: ${msg}`, description: '', status: '' };
                            }) : Promise.resolve(null)
                        ]);
                        commits = fetchedCommits;

                        const ticketTitle = jiraIssue ? jiraIssue.summary : '';
                        const ticketStatus = jiraIssue ? (jiraIssue as any).status || '' : '';

                        webviewProvider?.updateBranch(currentBranch, currentBranchIsMerged, relatedBranches, commits, baseBranches, recentTickets, ticketTitle, ticketStatus);
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
    
    return () => {
        if (forceUpdate) {
            forceUpdate();
        }
    };
}
