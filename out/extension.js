"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.activate = activate;
exports.deactivate = deactivate;
const vscode = require("vscode");
const git_1 = require("./git");
const webview_1 = require("./webview");
const createBranches_1 = require("./commands/createBranches");
const prepareDeploy_1 = require("./commands/prepareDeploy");
const mergeRequests_1 = require("./commands/mergeRequests");
const jira_1 = require("./commands/jira");
const syncAll_1 = require("./commands/syncAll");
const deleteUnused_1 = require("./commands/deleteUnused");
const checkoutBranch_1 = require("./commands/checkoutBranch");
const copyBranch_1 = require("./commands/copyBranch");
function activate(context) {
    const provider = new webview_1.RicwizWebviewProvider(context.extensionUri);
    context.subscriptions.push(vscode.window.registerWebviewViewProvider('ricwiz-webview', provider));
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
                git.repositories.forEach((repo) => setupRepo(repo));
            }
            git.onDidOpenRepository((repo) => setupRepo(repo));
            function setupRepo(repo) {
                let lastBranch = '';
                async function update() {
                    const currentBranch = repo.state.HEAD?.name;
                    if (currentBranch && currentBranch !== lastBranch) {
                        lastBranch = currentBranch;
                        const config = vscode.workspace.getConfiguration('ricwiz');
                        let prefix = config.get('ticketPrefix', 'SFPSCA-');
                        if (!currentBranch.includes(prefix)) {
                            const guessMatch = currentBranch.match(/([A-Z]+-)\d+/i);
                            if (guessMatch) {
                                prefix = guessMatch[1].toUpperCase();
                            }
                        }
                        let relatedBranches = [];
                        let commits = [];
                        const match = currentBranch.match(new RegExp(`(${prefix}\\d+)`, 'i'));
                        if (match) {
                            const ticketId = match[1].toUpperCase();
                            const suffix = config.get('commitMessageSuffix', '- ');
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
                                    const { stdout } = await (0, git_1.exec)(`git branch --list "*${ticketId}*"`, { cwd });
                                    relatedBranches = stdout.split('\n')
                                        .map((b) => b.replace('*', '').trim())
                                        .filter((b) => b && b !== currentBranch);
                                }
                            }
                            catch (e) { }
                        }
                        else {
                            // Not on a ticket branch — hide status bar
                            statusBarItem.hide();
                        }
                        // Fetch recent commits for the Git Log
                        try {
                            const workspaceFolders = vscode.workspace.workspaceFolders;
                            if (workspaceFolders) {
                                const cwd = workspaceFolders[0].uri.fsPath;
                                const { stdout } = await (0, git_1.exec)(`git log --oneline -10 --format="%h|||%s|||%ar"`, { cwd });
                                commits = stdout.split('\n')
                                    .filter((line) => line.trim())
                                    .map((line) => {
                                    const parts = line.split('|||');
                                    return {
                                        hash: parts[0] || '',
                                        message: parts.length >= 3 ? parts.slice(1, -1).join('|||') : (parts[1] || ''),
                                        timeAgo: parts.length >= 3 ? parts[parts.length - 1] : ''
                                    };
                                });
                            }
                        }
                        catch (e) { }
                        provider.updateBranch(currentBranch, relatedBranches, commits);
                    }
                }
                update();
                repo.state.onDidChange(update);
            }
        }
    }
    initGit();
    // ─── Register All Commands ──────────────────────────────────────────
    context.subscriptions.push(vscode.commands.registerCommand('ricwiz.createBranches', createBranches_1.createBranches), vscode.commands.registerCommand('ricwiz.prepareDeploy', prepareDeploy_1.prepareDeploy), vscode.commands.registerCommand('ricwiz.createMergeRequests', mergeRequests_1.createMergeRequests), vscode.commands.registerCommand('ricwiz.createMergeRequestsVSCode', mergeRequests_1.createMergeRequestsVSCode), vscode.commands.registerCommand('ricwiz.openJiraTicket', jira_1.openJiraTicket), vscode.commands.registerCommand('ricwiz.openJiraTicketVSCode', jira_1.openJiraTicketVSCode), vscode.commands.registerCommand('ricwiz.syncAll', syncAll_1.syncAll), vscode.commands.registerCommand('ricwiz.deleteUnusedBranches', deleteUnused_1.deleteUnusedBranches), vscode.commands.registerCommand('ricwiz.checkoutBranch', checkoutBranch_1.checkoutBranch), vscode.commands.registerCommand('ricwiz.copyBranchName', copyBranch_1.copyBranchName), vscode.commands.registerCommand('ricwiz.openSettings', () => {
        vscode.commands.executeCommand('workbench.action.openSettings', 'ricwiz');
    }));
}
function deactivate() { }
//# sourceMappingURL=extension.js.map