"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.openJiraTicket = openJiraTicket;
exports.openJiraTicketVSCode = openJiraTicketVSCode;
const vscode = require("vscode");
const git_1 = require("../git");
async function doOpenJiraTicket(openInVSCode = false) {
    const cwd = (0, git_1.getWorkspaceCwd)();
    if (!cwd)
        return;
    const config = vscode.workspace.getConfiguration('ricwiz');
    const jiraUrl = config.get('jiraUrl', '');
    if (!jiraUrl || jiraUrl.trim() === '') {
        vscode.window.showErrorMessage('Ricwiz: Jira URL is not configured. Please set it in the extension settings (e.g., https://jira.company.com/browse/).');
        return;
    }
    const { getCurrentBranch, resolvePrefix, extractTicketSuggestion } = require('../git');
    const currentBranch = await getCurrentBranch(cwd);
    const configPrefix = config.get('ticketPrefix', 'SFPSCA-');
    const prefix = resolvePrefix(currentBranch, configPrefix);
    const suggestedTicket = extractTicketSuggestion(currentBranch, prefix, true);
    let finalTicketId = suggestedTicket;
    if (!finalTicketId) {
        // Only prompt if we cannot guess it from the branch name
        const result = await (0, git_1.promptForTicketId)(cwd, {
            prompt: 'Ricwiz could not detect the ticket from the branch name. Enter Jira ticket ID (e.g. SFPSCA-1234)',
            handleToSuffix: true
        });
        if (!result)
            return;
        finalTicketId = result.ticketId;
    }
    else {
        // Ensure it's normalized just in case
        const { normalizeTicketId } = require('../git');
        finalTicketId = normalizeTicketId(finalTicketId, prefix);
    }
    let url = jiraUrl.trim();
    if (!url.endsWith('/')) {
        url += '/';
    }
    url += finalTicketId;
    if (openInVSCode) {
        vscode.commands.executeCommand('simpleBrowser.show', url);
    }
    else {
        vscode.env.openExternal(vscode.Uri.parse(url));
    }
    vscode.window.showInformationMessage(`Ricwiz: Opening Jira Ticket ${ticketId} in ${openInVSCode ? 'VS Code' : 'browser'}!`);
}
async function openJiraTicket() {
    return doOpenJiraTicket(false);
}
async function openJiraTicketVSCode() {
    return doOpenJiraTicket(true);
}
//# sourceMappingURL=jira.js.map