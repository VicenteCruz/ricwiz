import * as vscode from 'vscode';
import { exec, getWorkspaceCwd, promptForTicketId, checkBranchExists } from '../git';
import { WorkflowContext } from '../workflows/WorkflowContext';
import { resolveExistingBranchName } from '../branchStatus';

async function doCreateMergeRequests(openInVSCode: boolean = false): Promise<void> {
    const cwd = getWorkspaceCwd();
    if (!cwd) return;

    const ctx = await WorkflowContext.initialize(cwd);
    if (!ctx) return;

    const result = await promptForTicketId(cwd, {
        prefix: ctx.ticketPrefix,
        prompt: 'Enter the full ticket ID for the Merge Requests (e.g., SFPSCA-1234) or just the number'
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
        } else if (webUrl.startsWith('ssh://git@')) {
            webUrl = webUrl.replace('ssh://git@', 'https://');
        }
    }

    const mrLinks: { source: string, target: string }[] = [];

    const actualMainBranch = await resolveExistingBranchName(cwd, ticketId);

    // Check which environment branches actually exist in Git for this ticket
    const existingEnvBranches: { envName: string, source: string, target: string }[] = [];
    for (const env of ctx.environments) {
        const actualEnvBranch = await resolveExistingBranchName(cwd, ticketId, env.name);
        if (await checkBranchExists(cwd, actualEnvBranch)) {
            existingEnvBranches.push({
                envName: env.name,
                source: actualEnvBranch,
                target: env.sourceBranch
            });
        }
    }

    if (existingEnvBranches.length === 0) {
        // ─── Single Release Ticket Flow ──────────────────────────────────────
        // Attempt to discover candidate target release branch
        let candidateTarget = '';
        try {
            if (actualMainBranch) {
                const { stdout } = await exec(`git config branch.${actualMainBranch}.ricwiz-source`, { cwd });
                if (stdout.trim()) {
                    candidateTarget = stdout.trim();
                }
            }
        } catch (e) {}

        if (!candidateTarget) {
            if (actualMainBranch.includes(ticketId) && actualMainBranch !== ticketId) {
                const prefixPart = actualMainBranch.split(ticketId)[0].replace(/[-_]+$/, '');
                if (prefixPart) candidateTarget = prefixPart;
            }
        }

        if (!candidateTarget) {
            candidateTarget = ctx.ticketSourceBranch || 'main';
        }

        // Confirm the target release branch in a text box
        const targetInput = await vscode.window.showInputBox({
            prompt: `Ricwiz: Confirm or enter the Target Release branch in GitLab for '${actualMainBranch}'`,
            placeHolder: 'e.g. CRC-R19, main, release/v5.0',
            value: candidateTarget,
            ignoreFocusOut: true
        });

        if (targetInput === undefined || !targetInput.trim()) {
            vscode.window.showInformationMessage('Ricwiz: Merge request creation cancelled.');
            return;
        }

        const confirmedTarget = targetInput.trim();

        // Save confirmed source branch into git config for future operations
        try {
            await exec(`git config branch.${actualMainBranch}.ricwiz-source "${confirmedTarget}"`, { cwd });
        } catch (e) {}

        mrLinks.push({
            source: actualMainBranch,
            target: confirmedTarget
        });
    } else {
        // ─── Multi-Environment Deploy Flow ────────────────────────────────────
        for (const envBranch of existingEnvBranches) {
            mrLinks.push({
                source: envBranch.source,
                target: envBranch.target
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

    vscode.window.showInformationMessage(`Ricwiz: Opening ${mrLinks.length} Merge Request(s) in ${openInVSCode ? 'VS Code browser' : 'external browser'}!`);
}

export async function createMergeRequests(): Promise<void> {
    return doCreateMergeRequests(false);
}

export async function createMergeRequestsVSCode(): Promise<void> {
    return doCreateMergeRequests(true);
}
