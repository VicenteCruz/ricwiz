import * as vscode from 'vscode';
import { exec, getWorkspaceCwd, getCurrentBranch, promptForTicketId } from '../git';

export async function syncAll(): Promise<void> {
    const cwd = getWorkspaceCwd();
    if (!cwd) {
        vscode.window.showErrorMessage('Ricwiz: Open a folder or workspace that is a Git repository.');
        return;
    }

    const result = await promptForTicketId(cwd, {
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
                        await exec(`git pull origin ${branch}`, { cwd });
                        synced++;
                    } catch(e) {
                        failed++;
                    }
                } else {
                    // For other branches, fast-forward update without checkout
                    try {
                        await exec(`git fetch origin ${branch}:${branch}`, { cwd });
                        synced++;
                    } catch(e) {
                        // Fast-forward failed (diverged history) — try checkout+pull as fallback
                        try {
                            await exec(`git checkout ${branch}`, { cwd });
                            await exec(`git pull origin ${branch}`, { cwd });
                            await exec(`git checkout ${currentBranch}`, { cwd });
                            synced++;
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
