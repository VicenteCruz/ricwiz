"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.createMergeRequests = createMergeRequests;
exports.createMergeRequestsVSCode = createMergeRequestsVSCode;
const vscode = require("vscode");
const git_1 = require("../git");
async function doCreateMergeRequests(openInVSCode = false) {
    const cwd = (0, git_1.getWorkspaceCwd)();
    if (!cwd)
        return;
    const config = vscode.workspace.getConfiguration('ricwiz');
    const environments = config.get('environments', [
        { name: 'Qual', sourceBranch: 'quality' },
        { name: 'Val', sourceBranch: 'validation' },
        { name: 'Prod', sourceBranch: 'main' }
    ]);
    const result = await (0, git_1.promptForTicketId)(cwd, {
        prompt: 'Enter the full ticket ID for the Merge Requests (e.g., SCPSCA-1234) or just the number'
    });
    if (!result)
        return;
    const { ticketId } = result;
    const gitlabUrlOverride = config.get('gitlabUrlOverride', '');
    let webUrl = '';
    if (gitlabUrlOverride && gitlabUrlOverride.trim() !== '') {
        webUrl = gitlabUrlOverride.trim();
    }
    else {
        let remoteUrl = '';
        try {
            const { stdout } = await (0, git_1.exec)('git remote get-url origin', { cwd });
            remoteUrl = stdout.trim();
        }
        catch (e) {
            vscode.window.showErrorMessage('Ricwiz: Could not get the remote origin URL. Please configure the URL manually in the extension settings.');
            return;
        }
        // Convert Git URL to Web URL (GitLab/GitHub)
        webUrl = remoteUrl;
        if (webUrl.endsWith('.git')) {
            webUrl = webUrl.slice(0, -4);
        }
        if (webUrl.startsWith('git@')) {
            // git@gitlab.com:empresa/projeto -> gitlab.com/empresa/projeto
            webUrl = webUrl.replace('git@', '').replace(':', '/');
            webUrl = `https://${webUrl}`;
        }
    }
    // Open a tab for each environment
    for (const env of environments) {
        const mrSourceBranch = `${ticketId}-to-${env.name}`;
        const mrTargetBranch = env.sourceBranch;
        // GitLab MR URL Format
        const url = `${webUrl}/-/merge_requests/new?merge_request[source_branch]=${mrSourceBranch}&merge_request[target_branch]=${mrTargetBranch}`;
        if (openInVSCode) {
            vscode.commands.executeCommand('simpleBrowser.show', url);
        }
        else {
            vscode.env.openExternal(vscode.Uri.parse(url));
        }
    }
    vscode.window.showInformationMessage(`Ricwiz: Opening ${openInVSCode ? 'VS Code browser' : 'external browser'} for Merge Requests!`);
}
async function createMergeRequests() {
    return doCreateMergeRequests(false);
}
async function createMergeRequestsVSCode() {
    return doCreateMergeRequests(true);
}
//# sourceMappingURL=mergeRequests.js.map