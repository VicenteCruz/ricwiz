import * as vscode from 'vscode';
import * as fs from 'fs';
import * as path from 'path';
import { exec, getWorkspaceCwd, promptForTicketId, checkBranchExists, getCurrentBranch } from '../git';
import { EnvironmentConfig } from '../types';
import { handleMergeConflict } from '../conflictResolver';
import { WorkflowContext } from '../workflows/WorkflowContext';

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
    const mainBranch = ctx.branchPrefix ? `${ctx.branchPrefix}${ticketId}` : ticketId;

    // Verify the main branch exists
    if (!(await checkBranchExists(cwd, mainBranch))) {
        vscode.window.showErrorMessage(`Ricwiz: Main branch '${mainBranch}' does not exist! Prepare deploy is only available when a main ticket branch is used.`);
        return;
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

        progress.report({ message: 'Syncing remote information...', increment: 10 });
        try {
            await exec('git fetch --all', { cwd });
            
            const envSyncStep = 10 / (environments.length || 1);
            for (const env of environments) {
                try {
                    if (abortRequested) throw new Error('Aborted');
                    progress.report({ message: `Fetching ${env.sourceBranch}...`, increment: envSyncStep });
                    const fetchRemote = ctx.getFetchRemote(env.sourceBranch);
                    const fetchBranch = ctx.getFetchBranch(env.sourceBranch);
                    await exec(`git fetch ${fetchRemote} ${fetchBranch}:${fetchBranch}`, { cwd });
                } catch(e) {}
            }
        } catch(e) {}

        const processStep = 60 / (environments.length || 1);

        for (const env of environments) {
            if (abortRequested) break;

            const targetBranch = ctx.branchPrefix ? `${ctx.branchPrefix}${ticketId}-to-${env.name}` : `${ticketId}-to-${env.name}`;
            const sourceBranch = env.sourceBranch;

            try {
                progress.report({ message: `Processing ${targetBranch}...`, increment: processStep / 4 });
                // Switch to environment branch
                await exec(`git checkout ${targetBranch}`, { cwd });
                
                // Pull to ensure we have the latest remote state
                try {
                    await exec(`git pull ${ctx.originRemote} ${targetBranch}`, { cwd });
                } catch (e) {} // Ignore if it fails
                
                // Helper function for merging and handling conflicts
                const performSafeMerge = async (branchToMerge: string) => {
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
                            const resolved = await handleMergeConflict(cwd, branchToMerge, targetBranch, progress);
                            if (!resolved) {
                                abortRequested = true;
                                throw new Error('Deploy aborted by user.');
                            }
                        } else {
                            throw e;
                        }
                    }
                };

                // 1. Merge the source branch (e.g. quality) to keep it up to date
                progress.report({ message: `Merging ${sourceBranch} into ${targetBranch}...`, increment: processStep / 4 });
                const fetchRemote = ctx.getFetchRemote(sourceBranch);
                const fetchBranch = ctx.getFetchBranch(sourceBranch);
                const fullUpstreamPath = ctx.buildUpstreamPath(sourceBranch);
                
                await exec(`git fetch ${fetchRemote} ${fetchBranch}`, { cwd });
                await performSafeMerge(fullUpstreamPath);

                // 2. Merge the main branch (the ticket changes)
                progress.report({ message: `Merging ${mainBranch} into ${targetBranch}...`, increment: processStep / 4 });
                await performSafeMerge(mainBranch);
                
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
                return; // Stop execution
            }
        }

        if (!abortRequested) {
            progress.report({ message: 'Finishing up...', increment: 10 });
            
            // Prioritize returning to the main branch of the ticket
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
    });
}

