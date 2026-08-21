"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.syncAll = syncAll;
const vscode = require("vscode");
const git_1 = require("../git");
const conflictResolver_1 = require("../conflictResolver");
const WorkflowContext_1 = require("../workflows/WorkflowContext");
async function syncAll() {
    const cwd = (0, git_1.getWorkspaceCwd)();
    if (!cwd) {
        vscode.window.showErrorMessage('Ricwiz: Open a folder or workspace that is a Git repository.');
        return;
    }
    const ctx = new WorkflowContext_1.WorkflowContext();
    const result = await (0, git_1.promptForTicketId)(cwd, {
        prompt: 'Enter the full ticket ID to sync all branches for (e.g., SCPSCA-1234) or just the number'
    });
    if (!result)
        return;
    const { ticketId, currentBranch } = result;
    await vscode.window.withProgress({
        location: vscode.ProgressLocation.Notification,
        title: `Ricwiz: Syncing all branches for ${ticketId}...`,
        cancellable: false
    }, async (progress) => {
        try {
            // 1. Fetch everything from remote
            progress.report({ message: 'Fetching from remote...' });
            try {
                await (0, git_1.exec)('git fetch --all', { cwd });
            }
            catch (e) { }
            // 2. Find all local branches matching the ticket
            const { stdout } = await (0, git_1.exec)(`git branch --list "*${ticketId}*"`, { cwd });
            const branches = stdout.split('\n')
                .map((b) => b.replace('*', '').trim())
                .filter((b) => b.length > 0);
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
                        await (0, git_1.exec)(`git pull ${ctx.originRemote} ${branch}`, { cwd });
                        synced++;
                    }
                    catch (e) {
                        let isConflict = false;
                        try {
                            const { stdout } = await (0, git_1.exec)('git ls-files -u', { cwd });
                            if (stdout.trim().length > 0)
                                isConflict = true;
                        }
                        catch (err) { }
                        const errStr = ((e.stdout || '') + (e.stderr || '') + (e.message || '')).toLowerCase();
                        if (isConflict || errStr.includes('conflict') || errStr.includes('conflit')) {
                            const resolved = await (0, conflictResolver_1.handleMergeConflict)(cwd, `${ctx.originRemote}/${branch}`, branch, progress);
                            if (resolved) {
                                synced++;
                            }
                            else {
                                failed++;
                            }
                        }
                        else {
                            failed++;
                        }
                    }
                }
                else {
                    // For other branches, fast-forward update without checkout
                    try {
                        await (0, git_1.exec)(`git fetch ${ctx.originRemote} ${branch}:${branch}`, { cwd });
                        synced++;
                    }
                    catch (e) {
                        // Fast-forward failed (diverged history) — try checkout+pull as fallback
                        try {
                            await (0, git_1.exec)(`git checkout ${branch}`, { cwd });
                            try {
                                await (0, git_1.exec)(`git pull ${ctx.originRemote} ${branch}`, { cwd });
                                synced++;
                            }
                            catch (errPull) {
                                let isConflict = false;
                                try {
                                    const { stdout } = await (0, git_1.exec)('git ls-files -u', { cwd });
                                    if (stdout.trim().length > 0)
                                        isConflict = true;
                                }
                                catch (err) { }
                                const errStr = ((errPull.stdout || '') + (errPull.stderr || '') + (errPull.message || '')).toLowerCase();
                                if (isConflict || errStr.includes('conflict') || errStr.includes('conflit')) {
                                    const resolved = await (0, conflictResolver_1.handleMergeConflict)(cwd, `${ctx.originRemote}/${branch}`, branch, progress);
                                    if (resolved) {
                                        synced++;
                                    }
                                    else {
                                        failed++;
                                    }
                                }
                                else {
                                    failed++;
                                }
                            }
                            // Return to original branch safely
                            await (0, git_1.exec)(`git checkout ${currentBranch}`, { cwd });
                        }
                        catch (e2) {
                            // Revert to original branch if possible
                            try {
                                await (0, git_1.exec)(`git checkout ${currentBranch}`, { cwd });
                            }
                            catch (e3) { }
                            failed++;
                        }
                    }
                }
            }
            if (failed > 0) {
                vscode.window.showWarningMessage(`Ricwiz: Synced ${synced}/${branches.length} branches. ${failed} branch(es) could not be synced (possible conflicts or diverged history).`);
            }
            else {
                vscode.window.showInformationMessage(`Ricwiz: 🔄 All ${synced} branches for ${ticketId} are up to date!`);
            }
        }
        catch (e) {
            vscode.window.showErrorMessage(`Ricwiz: Sync failed: ${e.message}`);
        }
    });
}
//# sourceMappingURL=syncAll.js.map