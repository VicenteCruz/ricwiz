import * as vscode from 'vscode';
import { exec, getWorkspaceCwd, promptForTicketId, checkBranchExists, getCurrentBranch } from '../git';
import { EnvironmentConfig } from '../types';
import { handleMergeConflict } from '../conflictResolver';
import { WorkflowContext } from '../workflows/WorkflowContext';

export async function updateBases(): Promise<void> {
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

    const config = vscode.workspace.getConfiguration('ricwiz');
    const ctx = new WorkflowContext();
    const environments = config.get<EnvironmentConfig[]>('environments', [
        { name: 'Qual', sourceBranch: 'quality' },
        { name: 'Val', sourceBranch: 'validation' },
        { name: 'Prod', sourceBranch: 'main' }
    ]);

    const result = await promptForTicketId(cwd);
    if (!result) {
        return;
    }
    const { ticketId, currentBranch } = result;

    await vscode.window.withProgress({
        location: vscode.ProgressLocation.Notification,
        title: "Ricwiz: Updating environment branches from their bases",
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
        } catch(e) {}

        const processStep = 80 / (environments.length || 1);

        for (const env of environments) {
            if (abortRequested) break;

            const targetBranch = `${ticketId}-to-${env.name}`;
            const sourceBranch = env.sourceBranch;

            if (!(await checkBranchExists(cwd, targetBranch))) {
                continue; // Skip branches that don't exist
            }

            try {
                progress.report({ message: `Processing ${targetBranch}...`, increment: processStep / 2 });
                await exec(`git checkout ${targetBranch}`, { cwd });
                
                // 1. Merge the source branch (e.g. quality) to keep it up to date
                try {
                    progress.report({ message: `Merging ${sourceBranch} into ${targetBranch}...`, increment: processStep / 2 });
                    const fetchRemote = ctx.getFetchRemote(sourceBranch);
                    const fetchBranch = ctx.getFetchBranch(sourceBranch);
                    const fullUpstreamPath = ctx.buildUpstreamPath(sourceBranch);
                    
                    await exec(`git fetch ${fetchRemote} ${fetchBranch}`, { cwd });
                    await exec(`git merge ${fullUpstreamPath}`, { cwd });
                } catch (e: any) {
                    let isConflict = false;
                    try {
                        const { stdout } = await exec('git ls-files -u', { cwd });
                        if (stdout.trim().length > 0) isConflict = true;
                    } catch(err) {}
                    
                    const errStr = ((e.stdout || '') + (e.stderr || '') + (e.message || '')).toLowerCase();
                    if (isConflict || errStr.includes('conflict') || errStr.includes('conflit')) {
                        const fullUpstreamPath = ctx.buildUpstreamPath(sourceBranch);
                        const resolved = await handleMergeConflict(cwd, fullUpstreamPath, targetBranch, progress);
                        if (!resolved) {
                            abortRequested = true;
                            throw new Error('Update aborted by user.');
                        }
                    } else {
                        throw e;
                    }
                }
                
                if (abortRequested) break;
                successCount++;
            } catch (e: any) {
                if (e.message.includes('aborted')) {
                    vscode.window.showInformationMessage('Ricwiz: Update cancelled.');
                } else {
                    vscode.window.showErrorMessage(`Ricwiz: Failed to update branch ${targetBranch}. Detail: ${e.message}`);
                }
                return; // Stop execution
            }
        }

        if (!abortRequested) {
            progress.report({ message: 'Finishing up...', increment: 10 });
            try {
                const current = await getCurrentBranch(cwd);
                if (originalBranch && originalBranch !== current) {
                    await exec(`git checkout ${originalBranch}`, { cwd });
                }
            } catch(e) {}

            vscode.window.showInformationMessage(`Ricwiz: Successfully updated ${successCount} environment branches from their bases!`);
        }
    });
}

