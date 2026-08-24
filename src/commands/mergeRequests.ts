import * as vscode from 'vscode';
import { exec, getWorkspaceCwd, promptForTicketId } from '../git';
import { WorkflowContext } from '../workflows/WorkflowContext';
import { resolveExistingBranchName } from '../branchStatus';

async function doCreateMergeRequests(openInVSCode: boolean = false): Promise<void> {
    const cwd = getWorkspaceCwd();
    if (!cwd) return;

    const ctx = await WorkflowContext.initialize(cwd);
    if (!ctx) return;

    const result = await promptForTicketId(cwd, {
        prompt: 'Enter the full ticket ID for the Merge Requests (e.g., SCPSCA-1234) or just the number'
    });
    if (!result) return;
    const { ticketId } = result;

    const gitlabUrlOverride = ctx.getConfig<string>('gitlabUrlOverride', '');

    let webUrl = '';
    if (gitlabUrlOverride && gitlabUrlOverride.trim() !== '') {
        webUrl = gitlabUrlOverride.trim().replace(/\/+$/, '');
    } else {
        let remoteUrl = '';
        try {
            const targetRemote = ctx.originRemote || 'origin';
            const { stdout } = await exec(`git remote get-url ${targetRemote}`, { cwd });
            remoteUrl = stdout.trim();
        } catch (e) {
            vscode.window.showErrorMessage('Ricwiz: Could not get the remote origin URL. Please configure the URL manually in the extension settings.');
            return;
        }

        // Convert Git URL to Web URL (GitLab/GitHub)
        webUrl = remoteUrl;
        if (webUrl.endsWith('.git')) {
            webUrl = webUrl.slice(0, -4);
        }
        if (webUrl.startsWith('git@')) {
            webUrl = webUrl.replace('git@', '').replace(':', '/');
            webUrl = `https://${webUrl}`;
        }
    }

    const mrLinks: { source: string, target: string }[] = [];

    const actualMainBranch = await resolveExistingBranchName(cwd, ticketId);

    let mainSourceBranch = ctx.ticketSourceBranch;
    try {
        if (actualMainBranch) {
            const { stdout } = await exec(`git config branch.${actualMainBranch}.ricwiz-source`, { cwd });
            if (stdout.trim()) {
                mainSourceBranch = stdout.trim();
            }
        }
    } catch (e) {}

    if (ctx.environments.length === 0) {
        // If there are no environments, just open the MR for the main ticket branch
        mrLinks.push({
            source: actualMainBranch,
            target: mainSourceBranch
        });
    } else {
        // If environments exist, open MRs for them
        for (const env of ctx.environments) {
            const actualEnvBranch = await resolveExistingBranchName(cwd, ticketId, env.name);
            mrLinks.push({
                source: actualEnvBranch,
                target: env.sourceBranch
            });
        }
    }

    // Open a tab for each branch
    for (const link of mrLinks) {
        // GitLab MR URL Format
        const url = `${webUrl}/-/merge_requests/new?merge_request[source_branch]=${encodeURIComponent(link.source)}&merge_request[target_branch]=${encodeURIComponent(link.target)}`;
        
        if (openInVSCode) {
            vscode.commands.executeCommand('simpleBrowser.show', url);
        } else {
            vscode.env.openExternal(vscode.Uri.parse(url));
        }
    }

    vscode.window.showInformationMessage(`Ricwiz: Opening ${openInVSCode ? 'VS Code browser' : 'external browser'} for Merge Requests!`);
}

export async function createMergeRequests(): Promise<void> {
    return doCreateMergeRequests(false);
}

export async function createMergeRequestsVSCode(): Promise<void> {
    return doCreateMergeRequests(true);
}
