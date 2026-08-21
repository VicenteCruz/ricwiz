"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.webviewProvider = void 0;
exports.activate = activate;
exports.deactivate = deactivate;
const vscode = require("vscode");
const git_1 = require("./git");
const branchStatus_1 = require("./branchStatus");
const webview_1 = require("./webview");
const createBranches_1 = require("./commands/createBranches");
const prepareDeploy_1 = require("./commands/prepareDeploy");
const mergeRequests_1 = require("./commands/mergeRequests");
const jira_1 = require("./commands/jira");
const syncAll_1 = require("./commands/syncAll");
const updateBases_1 = require("./commands/updateBases");
const deleteUnused_1 = require("./commands/deleteUnused");
const checkoutBranch_1 = require("./commands/checkoutBranch");
const copyBranch_1 = require("./commands/copyBranch");
const generatePackageXml_1 = require("./commands/generatePackageXml");
const deployPackage_1 = require("./commands/deployPackage");
const importData_1 = require("./commands/importData");
const listTicketFiles_1 = require("./commands/listTicketFiles");
const resetTracking_1 = require("./commands/resetTracking");
const extractComponent_1 = require("./commands/extractComponent");
const captureAdminChanges_1 = require("./commands/captureAdminChanges");
const openHistory_1 = require("./commands/openHistory");
const searchTicket_1 = require("./commands/searchTicket");
const whoToBlame_1 = require("./commands/whoToBlame");
const generateDestructiveChanges_1 = require("./commands/generateDestructiveChanges");
const runSmartTests_1 = require("./commands/runSmartTests");
function activate(context) {
    exports.webviewProvider = new webview_1.RicwizWebviewProvider(context.extensionUri);
    context.subscriptions.push(vscode.window.registerWebviewViewProvider('ricwiz-webview', exports.webviewProvider));
    // Status Bar Item — shows current ticket, click opens Jira
    const statusBarItem = vscode.window.createStatusBarItem(vscode.StatusBarAlignment.Left, 100);
    statusBarItem.command = 'ricwiz.openJiraTicket';
    context.subscriptions.push(statusBarItem);
    // ─── Git Integration (Auto Commit Message, Webview Update, Status Bar Update) ───
    /** Exposed so the manual refresh command can trigger an update from outside setupRepo */
    let forceUpdate;
    // Initialize auto-refresh from VS Code settings
    const initialAutoRefresh = vscode.workspace.getConfiguration('ricwiz').get('autoRefresh', true);
    exports.webviewProvider.setAutoRefresh(initialAutoRefresh);
    // Keep webview toggle in sync when the user changes the setting via Settings UI
    context.subscriptions.push(vscode.workspace.onDidChangeConfiguration(e => {
        if (e.affectsConfiguration('ricwiz.autoRefresh')) {
            const enabled = vscode.workspace.getConfiguration('ricwiz').get('autoRefresh', true);
            exports.webviewProvider?.setAutoRefresh(enabled);
        }
    }));
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
                let updateTimer;
                async function update() {
                    const workspaceFolders = vscode.workspace.workspaceFolders;
                    if (!workspaceFolders)
                        return;
                    const cwd = workspaceFolders[0].uri.fsPath;
                    const currentBranch = await (0, git_1.getCurrentBranch)(cwd);
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
                        const match = currentBranch.match(new RegExp(`(${prefix}\\d+(?:-\\d+)?)`, 'i'));
                        if (match) {
                            const ticketId = match[1].toUpperCase();
                            const suffix = config.get('commitMessageSuffix', '- ');
                            const existingTicketPattern = /^[A-Z]+-\d+(?:-\d+)?\s*(?:-\s*|:\s*|\s+)?/i;
                            if (existingTicketPattern.test(repo.inputBox.value)) {
                                if (!repo.inputBox.value.toUpperCase().startsWith(ticketId)) {
                                    // Replace the old ticket prefix with the new one
                                    repo.inputBox.value = repo.inputBox.value.replace(existingTicketPattern, `${ticketId}${suffix}`);
                                }
                            }
                            else {
                                // Prepend the new ticket prefix
                                repo.inputBox.value = `${ticketId}${suffix}` + repo.inputBox.value;
                            }
                            // Update status bar with ticket ID
                            statusBarItem.text = `$(bookmark) ${ticketId}`;
                            statusBarItem.tooltip = `Branch: ${currentBranch}\nClick to open Jira ticket`;
                            statusBarItem.show();
                            // Fetch related branches and their merge status in parallel
                            try {
                                const relatedBranchNames = await (0, branchStatus_1.findRelatedBranches)(cwd, ticketId, currentBranch);
                                relatedBranches = await (0, branchStatus_1.getRelatedBranchesStatus)(cwd, relatedBranchNames, ticketId, environments);
                            }
                            catch (e) { }
                        }
                        else {
                            // Not on a ticket branch — hide status bar
                            statusBarItem.hide();
                            try {
                                recentTickets = await (0, branchStatus_1.getRecentTickets)(cwd);
                            }
                            catch (e) { }
                        }
                        // Fetch recent commits and current branch merge status in parallel
                        const [fetchedCommits, currentBranchIsMerged] = await Promise.all([
                            (0, branchStatus_1.getRecentCommits)(cwd, 10),
                            (0, branchStatus_1.getCurrentBranchMergeStatus)(cwd, currentBranch, environments)
                        ]);
                        commits = fetchedCommits;
                        exports.webviewProvider?.updateBranch(currentBranch, currentBranchIsMerged, relatedBranches, commits, baseBranches, recentTickets);
                    }
                }
                /** Debounced update to avoid git command storms on rapid state changes */
                function scheduleUpdate() {
                    if (!exports.webviewProvider?.isAutoRefreshEnabled()) {
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
    context.subscriptions.push(vscode.commands.registerCommand('ricwiz.generateDestructiveChanges', generateDestructiveChanges_1.generateDestructiveChanges), vscode.commands.registerCommand('ricwiz.runSmartTests', runSmartTests_1.runSmartTests), vscode.commands.registerCommand('ricwiz.refreshWebview', () => { if (exports.webviewProvider)
        vscode.commands.executeCommand('workbench.action.webview.reloadWebviewAction'); }), vscode.commands.registerCommand('ricwiz.createBranches', createBranches_1.createBranches), vscode.commands.registerCommand('ricwiz.prepareDeploy', prepareDeploy_1.prepareDeploy), vscode.commands.registerCommand('ricwiz.createMergeRequests', mergeRequests_1.createMergeRequests), vscode.commands.registerCommand('ricwiz.createMergeRequestsVSCode', mergeRequests_1.createMergeRequestsVSCode), vscode.commands.registerCommand('ricwiz.openJiraTicket', jira_1.openJiraTicket), vscode.commands.registerCommand('ricwiz.openJiraTicketVSCode', jira_1.openJiraTicketVSCode), vscode.commands.registerCommand('ricwiz.syncAll', syncAll_1.syncAll), vscode.commands.registerCommand('ricwiz.updateBases', updateBases_1.updateBases), vscode.commands.registerCommand('ricwiz.deleteUnusedBranches', deleteUnused_1.deleteUnusedBranches), vscode.commands.registerCommand('ricwiz.checkoutBranch', checkoutBranch_1.checkoutBranch), vscode.commands.registerCommand('ricwiz.copyBranchName', copyBranch_1.copyBranchName), vscode.commands.registerCommand('ricwiz.generatePackageXml', generatePackageXml_1.generatePackageXml), vscode.commands.registerCommand('ricwiz.deployPackage', deployPackage_1.deployPackage), vscode.commands.registerCommand('ricwiz.importData', importData_1.importData), vscode.commands.registerCommand('ricwiz.listTicketFiles', listTicketFiles_1.listTicketFiles), vscode.commands.registerCommand('ricwiz.resetTracking', resetTracking_1.resetTracking), vscode.commands.registerCommand('ricwiz.extractComponent', extractComponent_1.extractComponent), vscode.commands.registerCommand('ricwiz.captureAdminChanges', captureAdminChanges_1.captureAdminChanges), vscode.commands.registerCommand('ricwiz.openHistory', openHistory_1.openHistory), vscode.commands.registerCommand('ricwiz.searchTicket', searchTicket_1.searchTicket), vscode.commands.registerCommand('ricwiz.whoToBlame', async () => {
        const data = await (0, whoToBlame_1.getBlameData)();
        if (data && exports.webviewProvider) {
            exports.webviewProvider.setBlameData(data);
            exports.webviewProvider.setPage('blame');
        }
    }), vscode.commands.registerCommand('ricwiz.manualRefresh', () => {
        if (forceUpdate) {
            forceUpdate();
        }
    }), vscode.commands.registerCommand('ricwiz.toggleAutoRefresh', () => {
        if (exports.webviewProvider) {
            const newState = !exports.webviewProvider.isAutoRefreshEnabled();
            exports.webviewProvider.setAutoRefresh(newState);
            // Persist to VS Code settings so it survives restarts
            vscode.workspace.getConfiguration('ricwiz').update('autoRefresh', newState, vscode.ConfigurationTarget.Global);
        }
    }), vscode.commands.registerCommand('ricwiz.openSettings', () => {
        vscode.commands.executeCommand('workbench.action.openSettings', 'ricwiz');
    }));
}
function deactivate() { }
//# sourceMappingURL=extension.js.map