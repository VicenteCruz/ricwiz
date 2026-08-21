"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.updateBases = updateBases;
const vscode = require("vscode");
const git_1 = require("../git");
const conflictResolver_1 = require("../conflictResolver");
const WorkflowContext_1 = require("../workflows/WorkflowContext");
async function updateBases() {
    const cwd = (0, git_1.getWorkspaceCwd)();
    if (!cwd) {
        vscode.window.showErrorMessage('Ricwiz: Open a folder or workspace that is a Git repository.');
        return;
    }
    try {
        await (0, git_1.exec)('git status', { cwd });
    }
    catch (e) {
        vscode.window.showErrorMessage('Ricwiz: The opened folder does not appear to be a valid Git repository.');
        return;
    }
    const ctx = await WorkflowContext_1.WorkflowContext.initialize(cwd);
    if (!ctx)
        return;
    const environments = ctx.environments;
    const result = await (0, git_1.promptForTicketId)(cwd, { prefix: ctx.ticketPrefix });
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
            await (0, git_1.exec)('git fetch --all', { cwd });
        }
        catch (e) { }
        const processStep = 80 / (environments.length || 1);
        for (const env of environments) {
            if (abortRequested)
                break;
            const targetBranch = `${ticketId}-to-${env.name}`;
            const sourceBranch = env.sourceBranch;
            if (!(await (0, git_1.checkBranchExists)(cwd, targetBranch))) {
                continue; // Skip branches that don't exist
            }
            try {
                progress.report({ message: `Processing ${targetBranch}...`, increment: processStep / 2 });
                await (0, git_1.exec)(`git checkout ${targetBranch}`, { cwd });
                // 1. Merge the source branch (e.g. quality) to keep it up to date
                try {
                    progress.report({ message: `Merging ${sourceBranch} into ${targetBranch}...`, increment: processStep / 2 });
                    const fetchRemote = ctx.getFetchRemote(sourceBranch);
                    const fetchBranch = ctx.getFetchBranch(sourceBranch);
                    const fullUpstreamPath = ctx.buildUpstreamPath(sourceBranch);
                    await (0, git_1.exec)(`git fetch ${fetchRemote} ${fetchBranch}`, { cwd });
                    await (0, git_1.exec)(`git merge ${fullUpstreamPath}`, { cwd });
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
                        const fullUpstreamPath = ctx.buildUpstreamPath(sourceBranch);
                        const resolved = await (0, conflictResolver_1.handleMergeConflict)(cwd, fullUpstreamPath, targetBranch, progress);
                        if (!resolved) {
                            abortRequested = true;
                            throw new Error('Update aborted by user.');
                        }
                    }
                    else {
                        throw e;
                    }
                }
                if (abortRequested)
                    break;
                successCount++;
            }
            catch (e) {
                if (e.message.includes('aborted')) {
                    vscode.window.showInformationMessage('Ricwiz: Update cancelled.');
                }
                else {
                    vscode.window.showErrorMessage(`Ricwiz: Failed to update branch ${targetBranch}. Detail: ${e.message}`);
                }
                return; // Stop execution
            }
        }
        if (!abortRequested) {
            progress.report({ message: 'Finishing up...', increment: 10 });
            try {
                const current = await (0, git_1.getCurrentBranch)(cwd);
                if (originalBranch && originalBranch !== current) {
                    await (0, git_1.exec)(`git checkout ${originalBranch}`, { cwd });
                }
            }
            catch (e) { }
            vscode.window.showInformationMessage(`Ricwiz: Successfully updated ${successCount} environment branches from their bases!`);
        }
    });
}
//# sourceMappingURL=updateBases.js.map