"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.webviewProvider = void 0;
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
const generatePackageXml_1 = require("./commands/generatePackageXml");
const deployPackage_1 = require("./commands/deployPackage");
const importData_1 = require("./commands/importData");
function activate(context) {
    exports.webviewProvider = new webview_1.RicwizWebviewProvider(context.extensionUri);
    context.subscriptions.push(vscode.window.registerWebviewViewProvider('ricwiz-webview', exports.webviewProvider));
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
                        let baseBranches = [];
                        let recentTickets = [];
                        const environments = config.get('environments', [
                            { name: 'Qual', sourceBranch: 'quality' },
                            { name: 'Val', sourceBranch: 'validation' },
                            { name: 'Prod', sourceBranch: 'main' }
                        ]);
                        try {
                            const sourceBranchForTicket = config.get('ticketSourceBranch', 'main');
                            const allBase = [sourceBranchForTicket, ...environments.map(e => e.sourceBranch)];
                            baseBranches = Array.from(new Set(allBase));
                        }
                        catch (e) { }
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
                                    const relatedBranchesRaw = stdout.split('\n')
                                        .map((b) => b.replace('*', '').trim())
                                        .filter((b) => b && b !== currentBranch);
                                    // Determine if sister branches are merged into their target org branch
                                    for (const rb of relatedBranchesRaw) {
                                        let isMerged = false;
                                        for (const env of environments) {
                                            if (rb.endsWith(`-to-${env.name}`)) {
                                                try {
                                                    await (0, git_1.exec)(`git merge-base --is-ancestor ${rb} origin/${env.sourceBranch}`, { cwd });
                                                    isMerged = true;
                                                }
                                                catch {
                                                    try {
                                                        await (0, git_1.exec)(`git merge-base --is-ancestor ${rb} ${env.sourceBranch}`, { cwd });
                                                        isMerged = true;
                                                    }
                                                    catch { }
                                                }
                                                break;
                                            }
                                        }
                                        relatedBranches.push({ name: rb, isMerged });
                                    }
                                }
                            }
                            catch (e) { }
                        }
                        else {
                            // Not on a ticket branch — hide status bar
                            statusBarItem.hide();
                            try {
                                const workspaceFolders = vscode.workspace.workspaceFolders;
                                if (workspaceFolders) {
                                    const cwd = workspaceFolders[0].uri.fsPath;
                                    const { stdout } = await (0, git_1.exec)(`git for-each-ref --sort=-committerdate --format="%(refname:short)" refs/heads/`, { cwd });
                                    const allBranches = stdout.split('\n').map((b) => b.trim()).filter((b) => b);
                                    // Match ticket patterns (e.g., SFPSC-11111) but NOT environment branches (-to-Qual)
                                    const ticketPattern = /^[A-Z]+-\d+$/i;
                                    recentTickets = allBranches.filter((b) => ticketPattern.test(b)).slice(0, 3);
                                }
                            }
                            catch (e) { }
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
                        exports.webviewProvider?.updateBranch(currentBranch, relatedBranches, commits, baseBranches, recentTickets);
                    }
                }
                update();
                repo.state.onDidChange(update);
            }
        }
    }
    initGit();
    // ─── Register All Commands ──────────────────────────────────────────
    context.subscriptions.push(vscode.commands.registerCommand('ricwiz.createBranches', createBranches_1.createBranches), vscode.commands.registerCommand('ricwiz.prepareDeploy', prepareDeploy_1.prepareDeploy), vscode.commands.registerCommand('ricwiz.createMergeRequests', mergeRequests_1.createMergeRequests), vscode.commands.registerCommand('ricwiz.createMergeRequestsVSCode', mergeRequests_1.createMergeRequestsVSCode), vscode.commands.registerCommand('ricwiz.openJiraTicket', jira_1.openJiraTicket), vscode.commands.registerCommand('ricwiz.openJiraTicketVSCode', jira_1.openJiraTicketVSCode), vscode.commands.registerCommand('ricwiz.syncAll', syncAll_1.syncAll), vscode.commands.registerCommand('ricwiz.deleteUnusedBranches', deleteUnused_1.deleteUnusedBranches), vscode.commands.registerCommand('ricwiz.checkoutBranch', checkoutBranch_1.checkoutBranch), vscode.commands.registerCommand('ricwiz.copyBranchName', copyBranch_1.copyBranchName), vscode.commands.registerCommand('ricwiz.generatePackageXml', generatePackageXml_1.generatePackageXml), vscode.commands.registerCommand('ricwiz.deployPackage', deployPackage_1.deployPackage), vscode.commands.registerCommand('ricwiz.importData', importData_1.importData), vscode.commands.registerCommand('ricwiz.openSettings', () => {
        vscode.commands.executeCommand('workbench.action.openSettings', 'ricwiz');
    }));
}
function deactivate() { }
//# sourceMappingURL=extension.js.map