import * as vscode from 'vscode';
import { exec, getWorkspaceCwd, promptForTicketId, checkBranchExists, getCurrentBranch } from '../git';
import { handleMergeConflict } from '../conflictResolver';
import { WorkflowContext } from '../workflows/WorkflowContext';
import { resolveExistingBranchName } from '../branchStatus';

export async function prepareDeploy(): Promise<void> {
    const cwd = getWorkspaceCwd();
    if (!cwd) {
        vscode.window.showErrorMessage('Ricwiz: Open a folder or workspace that is a Git repository.');
        return;
    }

    try {
        await exec('git status', { cwd });
    } catch (e) {
        vscode.window.showErrorMessage('Ricwiz: The opened folder does not appear to be a valid Git repository.');
        return;
    }

    const ctx = await WorkflowContext.initialize(cwd);
    if (!ctx) return;
    const environments = ctx.environments;

    const result = await promptForTicketId(cwd, { prefix: ctx.ticketPrefix });
    if (!result) {
        vscode.window.showErrorMessage('Operation cancelled: Ticket not provided.');
        return;
    }
    const { ticketId, currentBranch } = result;
    const mainBranch = await resolveExistingBranchName(cwd, ticketId);

    // Verify the main branch exists
    if (!(await checkBranchExists(cwd, mainBranch))) {
        vscode.window.showErrorMessage(`Ricwiz: Main branch '${mainBranch}' does not exist! Prepare deploy is only available when a main ticket branch is used.`);
        return;
    }

    // Check which environment branches actually exist for this ticket
    const existingEnvBranches: { env: typeof environments[0], branchName: string }[] = [];
    for (const env of environments) {
        const targetBranch = await resolveExistingBranchName(cwd, ticketId, env.name);
        if (await checkBranchExists(cwd, targetBranch)) {
            existingEnvBranches.push({ env, branchName: targetBranch });
        }
    }

    const isReleaseTicket = existingEnvBranches.length === 0;
    let confirmedReleaseBranch = '';

    if (isReleaseTicket) {
        // Attempt to discover candidate release/source branch
        let candidateSource = '';
        try {
            const { stdout } = await exec(`git config branch.${mainBranch}.ricwiz-source`, { cwd });
            candidateSource = stdout.trim();
        } catch (e) {}

        if (!candidateSource) {
            // Check if there is a prefix in the branch name before ticketId (e.g. CRC-R19-SFPSCA-1234)
            if (mainBranch.includes(ticketId) && mainBranch !== ticketId) {
                const prefixPart = mainBranch.split(ticketId)[0].replace(/[-_]+$/, '');
                if (prefixPart) candidateSource = prefixPart;
            }
        }

        if (!candidateSource) {
            candidateSource = ctx.ticketSourceBranch || 'main';
        }

        // Always ask the user to confirm the release branch in a text box
        const releaseInput = await vscode.window.showInputBox({
            prompt: `Ricwiz: Confirm or enter the Release branch in '${ctx.originRemote}' to merge into '${mainBranch}'`,
            placeHolder: 'e.g. CRC-R19, main, release/v5.0',
            value: candidateSource,
            ignoreFocusOut: true
        });

        if (releaseInput === undefined || !releaseInput.trim()) {
            vscode.window.showInformationMessage('Ricwiz: Prepare deploy cancelled.');
            return;
        }

        confirmedReleaseBranch = releaseInput.trim();

        // Save confirmed source branch into git config for future operations
        try {
            await exec(`git config branch.${mainBranch}.ricwiz-source "${confirmedReleaseBranch}"`, { cwd });
        } catch (e) {}
    }

    // Get default reviewers from settings or active profile
    const defaultReviewers = ctx.getConfig<string>('defaultReviewers', '');

    // Try to get already saved reviewers for this specific branch
    let currentSavedReviewers = '';
    try {
        const { stdout } = await exec(`git config branch.${ticketId}.ricwiz-reviewers`, { cwd });
        currentSavedReviewers = stdout.trim();
    } catch(e) {}

    // Only prompt the user if there is an established default reviewer in the settings
    if (defaultReviewers.trim()) {
        const reviewerInput = await vscode.window.showInputBox({
            prompt: 'Ricwiz: Reviewers for this deploy (optional, comma-separated)',
            placeHolder: 'e.g. @joao, 123456',
            value: currentSavedReviewers || defaultReviewers,
            ignoreFocusOut: true
        });

        if (reviewerInput === undefined) {
            return; // User cancelled
        }

        // Always save it if provided, or unset if cleared
        try {
            if (reviewerInput.trim()) {
                await exec(`git config branch.${ticketId}.ricwiz-reviewers "${reviewerInput.trim()}"`, { cwd });
            } else if (currentSavedReviewers) {
                await exec(`git config --unset branch.${ticketId}.ricwiz-reviewers`, { cwd });
            }
        } catch(e) {}
    }

    await vscode.window.withProgress({
        location: vscode.ProgressLocation.Notification,
        title: "Ricwiz: Preparing Deploy",
        cancellable: true
    }, async (progress, token) => {
        let successCount = 0;
        const originalBranch = currentBranch;
        let abortRequested = false;

        token.onCancellationRequested(() => {
            abortRequested = true;
        });

        // Helper function for merging and handling conflicts
        const performSafeMerge = async (branchToMerge: string, currentActiveBranch: string) => {
            try {
                await exec(`git merge ${branchToMerge}`, { cwd });
            } catch (e: any) {
                let isConflict = false;
                try {
                    const { stdout } = await exec('git ls-files -u', { cwd });
                    if (stdout.trim().length > 0) isConflict = true;
                } catch(err) {}
                
                const errStr = ((e.stdout || '') + (e.stderr || '') + (e.message || '')).toLowerCase();
                if (isConflict || errStr.includes('conflict') || errStr.includes('conflit')) {
                    const resolved = await handleMergeConflict(cwd, branchToMerge, currentActiveBranch, progress, token);
                    if (!resolved) {
                        abortRequested = true;
                        throw new Error('Deploy aborted by user.');
                    }
                } else {
                    throw e;
                }
            }
        };

        if (isReleaseTicket) {
            // ─── Single Release Ticket Flow ──────────────────────────────────────────
            try {
                progress.report({ message: `Fetching ${confirmedReleaseBranch} from ${ctx.originRemote}...`, increment: 15 });
                await exec(`git fetch ${ctx.originRemote} ${confirmedReleaseBranch}`, { cwd });

                progress.report({ message: `Switching to ${mainBranch}...`, increment: 15 });
                await exec(`git checkout ${mainBranch}`, { cwd });

                try {
                    await exec(`git pull ${ctx.originRemote} ${mainBranch}`, { cwd });
                } catch (e) {}

                progress.report({ message: `Merging ${ctx.originRemote}/${confirmedReleaseBranch} into ${mainBranch}...`, increment: 35 });
                await performSafeMerge(`${ctx.originRemote}/${confirmedReleaseBranch}`, mainBranch);

                if (abortRequested) return;

                progress.report({ message: `Pushing ${mainBranch} to ${ctx.originRemote}...`, increment: 25 });
                await exec(`git push ${ctx.originRemote} ${mainBranch}`, { cwd });

                progress.report({ message: 'Finishing up...', increment: 10 });
                vscode.window.showInformationMessage(`Ricwiz: Release branch '${confirmedReleaseBranch}' merged into '${mainBranch}' and pushed to ${ctx.originRemote}! 🚀`);
            } catch (e: any) {
                if (e.message?.includes('aborted')) {
                    vscode.window.showInformationMessage('Ricwiz: Deploy cancelled.');
                } else {
                    vscode.window.showErrorMessage(`Ricwiz: Failed to prepare release ticket ${mainBranch}. Detail: ${e.message}`);
                }
            }
        } else {
            // ─── Multi-Environment Deploy Flow ────────────────────────────────────────
            progress.report({ message: 'Syncing remote information...', increment: 10 });
            try {
                await exec('git fetch --all', { cwd });
                
                const envSyncStep = 10 / (existingEnvBranches.length || 1);
                for (const item of existingEnvBranches) {
                    try {
                        if (abortRequested) throw new Error('Aborted');
                        progress.report({ message: `Fetching ${item.env.sourceBranch}...`, increment: envSyncStep });
                        const fetchRemote = ctx.getFetchRemote(item.env.sourceBranch);
                        const fetchBranch = ctx.getFetchBranch(item.env.sourceBranch);
                        await exec(`git fetch ${fetchRemote} ${fetchBranch}:${fetchBranch}`, { cwd });
                    } catch(e) {}
                }
            } catch(e) {}

            const processStep = 60 / (existingEnvBranches.length || 1);

            for (const item of existingEnvBranches) {
                if (abortRequested) break;

                const targetBranch = item.branchName;
                const sourceBranch = item.env.sourceBranch;

                try {
                    progress.report({ message: `Processing ${targetBranch}...`, increment: processStep / 4 });
                    // Switch to environment branch
                    await exec(`git checkout ${targetBranch}`, { cwd });
                    
                    // Pull to ensure we have the latest remote state
                    try {
                        await exec(`git pull ${ctx.originRemote} ${targetBranch}`, { cwd });
                    } catch (e) {}
                    
                    // 1. Merge the source branch (e.g. quality) to keep it up to date
                    progress.report({ message: `Merging ${sourceBranch} into ${targetBranch}...`, increment: processStep / 4 });
                    const fetchRemote = ctx.getFetchRemote(sourceBranch);
                    const fetchBranch = ctx.getFetchBranch(sourceBranch);
                    const fullUpstreamPath = ctx.buildUpstreamPath(sourceBranch);
                    
                    await exec(`git fetch ${fetchRemote} ${fetchBranch}`, { cwd });
                    await performSafeMerge(fullUpstreamPath, targetBranch);

                    // 2. Merge the main branch (the ticket changes)
                    progress.report({ message: `Merging ${mainBranch} into ${targetBranch}...`, increment: processStep / 4 });
                    await performSafeMerge(mainBranch, targetBranch);
                    
                    if (abortRequested) break;

                    // 3. Push to remote
                    progress.report({ message: `Pushing ${targetBranch}...`, increment: processStep / 4 });
                    await exec(`git push ${ctx.originRemote} ${targetBranch}`, { cwd });
                    
                    successCount++;
                } catch (e: any) {
                    if (e.message.includes('aborted')) {
                        vscode.window.showInformationMessage('Ricwiz: Deploy cancelled.');
                    } else {
                        vscode.window.showErrorMessage(`Ricwiz: Failed to process branch ${targetBranch}. Detail: ${e.message}`);
                    }
                    return;
                }
            }

            if (!abortRequested) {
                progress.report({ message: 'Finishing up...', increment: 10 });
                
                // Return to main branch of ticket
                let targetReturnBranch = originalBranch;
                try {
                    await exec(`git show-ref --verify --quiet refs/heads/${mainBranch}`, { cwd });
                    targetReturnBranch = mainBranch;
                } catch(e) {}

                try {
                    const current = await getCurrentBranch(cwd);
                    if (targetReturnBranch && targetReturnBranch !== current) {
                        await exec(`git checkout ${targetReturnBranch}`, { cwd });
                        vscode.window.showInformationMessage(`Ricwiz: Operation complete. Back on branch ${targetReturnBranch}.`);
                    } else {
                        vscode.window.showInformationMessage(`Ricwiz: Operation complete.`);
                    }
                } catch (e) {
                    vscode.window.showInformationMessage(`Ricwiz: Operation complete.`);
                }
            }
        }
    });
}
