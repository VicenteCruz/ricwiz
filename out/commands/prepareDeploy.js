"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.prepareDeploy = prepareDeploy;
const vscode = require("vscode");
const git_1 = require("../git");
const conflictResolver_1 = require("../conflictResolver");
async function prepareDeploy() {
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
    const config = vscode.workspace.getConfiguration('ricwiz');
    const environments = config.get('environments', [
        { name: 'Qual', sourceBranch: 'quality' },
        { name: 'Val', sourceBranch: 'validation' },
        { name: 'Prod', sourceBranch: 'main' }
    ]);
    const result = await (0, git_1.promptForTicketId)(cwd);
    if (!result) {
        vscode.window.showErrorMessage('Operation cancelled: Ticket not provided.');
        return;
    }
    const { ticketId, currentBranch } = result;
    const mainBranch = ticketId;
    // Verify the main branch exists
    if (!(await (0, git_1.checkBranchExists)(cwd, mainBranch))) {
        vscode.window.showErrorMessage(`Ricwiz: Main branch '${mainBranch}' does not exist! Prepare deploy is only available when a main ticket branch is used.`);
        return;
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
        progress.report({ message: 'Auto-syncing base branches...', increment: 10 });
        try {
            await (0, git_1.exec)('git fetch', { cwd });
            const envSyncStep = 20 / (environments.length || 1);
            for (const env of environments) {
                try {
                    if (abortRequested)
                        throw new Error('Aborted');
                    progress.report({ message: `Fetching ${env.sourceBranch}...`, increment: envSyncStep });
                    await (0, git_1.exec)(`git fetch origin ${env.sourceBranch}:${env.sourceBranch}`, { cwd });
                }
                catch (e) { }
            }
        }
        catch (e) { }
        const processStep = 60 / (environments.length || 1);
        for (const env of environments) {
            if (abortRequested)
                break;
            const targetBranch = `${ticketId}-to-${env.name}`;
            const sourceBranch = env.sourceBranch;
            try {
                progress.report({ message: `Processing ${targetBranch}...`, increment: processStep / 4 });
                // Switch to environment branch
                await (0, git_1.exec)(`git checkout ${targetBranch}`, { cwd });
                // Pull to ensure we have the latest remote state
                try {
                    await (0, git_1.exec)(`git pull origin ${targetBranch}`, { cwd });
                }
                catch (e) { } // Ignore if it fails
                // 1. Merge the source branch (e.g. quality) to keep it up to date
                try {
                    progress.report({ message: `Merging ${sourceBranch} into ${targetBranch}...`, increment: processStep / 4 });
                    await (0, git_1.exec)(`git fetch origin ${sourceBranch}`, { cwd });
                    await (0, git_1.exec)(`git merge origin/${sourceBranch}`, { cwd });
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
                        const resolved = await (0, conflictResolver_1.handleMergeConflict)(cwd, `origin/${sourceBranch}`, targetBranch, progress);
                        if (!resolved) {
                            abortRequested = true;
                            throw new Error('Deploy aborted by user.');
                        }
                    }
                    else {
                        throw e;
                    }
                }
                // 2. Merge the main branch (the ticket changes)
                try {
                    progress.report({ message: `Merging ${mainBranch} into ${targetBranch}...`, increment: processStep / 4 });
                    await (0, git_1.exec)(`git merge ${mainBranch}`, { cwd });
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
                        const resolved = await (0, conflictResolver_1.handleMergeConflict)(cwd, mainBranch, targetBranch, progress);
                        if (!resolved) {
                            abortRequested = true;
                            throw new Error('Deploy aborted by user.');
                        }
                    }
                    else {
                        throw e;
                    }
                }
                if (abortRequested)
                    break;
                // 3. Push to remote
                progress.report({ message: `Pushing ${targetBranch}...`, increment: processStep / 4 });
                await (0, git_1.exec)(`git push origin ${targetBranch}`, { cwd });
                successCount++;
            }
            catch (e) {
                if (e.message.includes('aborted')) {
                    vscode.window.showInformationMessage('Ricwiz: Deploy cancelled.');
                }
                else {
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
                await (0, git_1.exec)(`git show-ref --verify --quiet refs/heads/${mainBranch}`, { cwd });
                targetReturnBranch = mainBranch;
            }
            catch (e) { }
            try {
                const current = await (0, git_1.getCurrentBranch)(cwd);
                if (targetReturnBranch && targetReturnBranch !== current) {
                    await (0, git_1.exec)(`git checkout ${targetReturnBranch}`, { cwd });
                    vscode.window.showInformationMessage(`Ricwiz: Operation complete. Back on branch ${targetReturnBranch}.`);
                }
                else {
                    vscode.window.showInformationMessage(`Ricwiz: Operation complete.`);
                }
            }
            catch (e) {
                vscode.window.showInformationMessage(`Ricwiz: Operation complete.`);
            }
        }
    });
}
//# sourceMappingURL=prepareDeploy.js.map