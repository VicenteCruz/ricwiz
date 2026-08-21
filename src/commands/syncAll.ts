import * as vscode from 'vscode';
import { exec, getWorkspaceCwd, getCurrentBranch, promptForTicketId } from '../git';
import { handleMergeConflict } from '../conflictResolver';
import { WorkflowContext } from '../workflows/WorkflowContext';

export async function syncAll(): Promise<void> {
    const cwd = getWorkspaceCwd();
    if (!cwd) {
        vscode.window.showErrorMessage('Ricwiz: Open a folder or workspace that is a Git repository.');
        return;
    }

    const ctx = await WorkflowContext.initialize(cwd);
    if (!ctx) return;

    const result = await promptForTicketId(cwd, { prefix: ctx.ticketPrefix,
        prompt: 'Enter the full ticket ID to sync all branches for (e.g., SCPSCA-1234) or just the number'
    });
    if (!result) return;
    const { ticketId, currentBranch } = result;

    await vscode.window.withProgress({
        location: vscode.ProgressLocation.Notification,
        title: `Ricwiz: Syncing all branches for ${ticketId}...`,
        cancellable: false
    }, async (progress) => {
        try {
            // 1. Fetch everything from remote
            progress.report({ message: 'Fetching from remote...' });
            try { await exec('git fetch --all', { cwd }); } catch(e) {}

            // 2. Find all local branches matching the ticket
            const { stdout } = await exec(`git branch --list "*${ticketId}*"`, { cwd });
            const branches = stdout.split('\n')
                .map((b: string) => b.replace('*', '').trim())
                .filter((b: string) => b.length > 0);

            if (branches.length === 0) {
                vscode.window.showWarningMessage(`Ricwiz: No local branches found for ${ticketId}.`);
                return;
            }

            let synced = 0;
            let failed = 0;

            for (const branch of branches) {
                progress.report({ message: `Syncing ${branch}...` });

                if (branch === currentBranch) {
                    // For the current branch, do a pull
                    try {
                        await exec(`git pull ${ctx.originRemote} ${branch}`, { cwd });
                        synced++;
                    } catch(e: any) {
                        let isConflict = false;
                        try {
                            const { stdout } = await exec('git ls-files -u', { cwd });
                            if (stdout.trim().length > 0) isConflict = true;
                        } catch(err) {}
                        
                        const errStr = ((e.stdout || '') + (e.stderr || '') + (e.message || '')).toLowerCase();
                        if (isConflict || errStr.includes('conflict') || errStr.includes('conflit')) {
                            const resolved = await handleMergeConflict(cwd, `${ctx.originRemote}/${branch}`, branch, progress);
                            if (resolved) {
                                synced++;
                            } else {
                                failed++;
                            }
                        } else {
                            failed++;
                        }
                    }
                } else {
                    // For other branches, fast-forward update without checkout
                    try {
                        await exec(`git fetch ${ctx.originRemote} ${branch}:${branch}`, { cwd });
                        synced++;
                    } catch(e) {
                        // Fast-forward failed (diverged history) — try checkout+pull as fallback
                        try {
                            await exec(`git checkout ${branch}`, { cwd });
                            try {
                                await exec(`git pull ${ctx.originRemote} ${branch}`, { cwd });
                                synced++;
                            } catch(errPull: any) {
                                let isConflict = false;
                                try {
                                    const { stdout } = await exec('git ls-files -u', { cwd });
                                    if (stdout.trim().length > 0) isConflict = true;
                                } catch(err) {}
                                
                                const errStr = ((errPull.stdout || '') + (errPull.stderr || '') + (errPull.message || '')).toLowerCase();
                                if (isConflict || errStr.includes('conflict') || errStr.includes('conflit')) {
                                    const resolved = await handleMergeConflict(cwd, `${ctx.originRemote}/${branch}`, branch, progress);
                                    if (resolved) {
                                        synced++;
                                    } else {
                                        failed++;
                                    }
                                } else {
                                    failed++;
                                }
                            }
                            // Return to original branch safely
                            await exec(`git checkout ${currentBranch}`, { cwd });
                        } catch(e2) {
                            // Revert to original branch if possible
                            try { await exec(`git checkout ${currentBranch}`, { cwd }); } catch(e3) {}
                            failed++;
                        }
                    }
                }
            }

            if (failed > 0) {
                vscode.window.showWarningMessage(`Ricwiz: Synced ${synced}/${branches.length} branches. ${failed} branch(es) could not be synced (possible conflicts or diverged history).`);
            } else {
                vscode.window.showInformationMessage(`Ricwiz: 🔄 All ${synced} branches for ${ticketId} are up to date!`);
            }

        } catch (e: any) {
            vscode.window.showErrorMessage(`Ricwiz: Sync failed: ${e.message}`);
        }
    });
}

