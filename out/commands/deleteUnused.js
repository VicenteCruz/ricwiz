"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.deleteUnusedBranches = deleteUnusedBranches;
const vscode = require("vscode");
const git_1 = require("../git");
async function deleteUnusedBranches() {
    const cwd = (0, git_1.getWorkspaceCwd)();
    if (!cwd) {
        vscode.window.showErrorMessage('Ricwiz: Open a folder or workspace that is a Git repository.');
        return;
    }
    const result = await (0, git_1.promptForTicketId)(cwd, {
        prompt: 'Enter the full ticket ID whose unused branches you want to clean up (e.g., SCPSCA-1234) or just the number'
    });
    if (!result)
        return;
    const { ticketId } = result;
    let currentBranch = result.currentBranch;
    const config = vscode.workspace.getConfiguration('ricwiz');
    await vscode.window.withProgress({
        location: vscode.ProgressLocation.Notification,
        title: `Ricwiz: Scanning branches for ${ticketId}...`,
        cancellable: false
    }, async () => {
        // Fetch and prune to update remote tracking info
        try {
            await (0, git_1.exec)('git fetch --prune', { cwd });
        }
        catch (e) { }
        // Find local branches matching the ticket
        let localBranches = [];
        try {
            const { stdout } = await (0, git_1.exec)(`git branch --list "*${ticketId}*"`, { cwd });
            localBranches = stdout.split('\n')
                .map((b) => b.replace('*', '').trim())
                .filter((b) => b.length > 0);
        }
        catch (e) { }
        if (localBranches.length === 0) {
            vscode.window.showInformationMessage(`Ricwiz: No local branches found for ${ticketId}.`);
            return;
        }
        // Find remote branches matching the ticket
        let remoteBranchNames = [];
        try {
            const { stdout } = await (0, git_1.exec)(`git branch -r --list "*${ticketId}*"`, { cwd });
            remoteBranchNames = stdout.split('\n')
                .map((b) => b.trim().replace(/^origin\//, ''))
                .filter((b) => b.length > 0 && !b.includes('->'));
        }
        catch (e) { }
        // Filter: keep only local branches that do NOT exist on remote
        const orphanedBranches = localBranches.filter(b => !remoteBranchNames.includes(b));
        if (orphanedBranches.length === 0) {
            vscode.window.showInformationMessage(`Ricwiz: All local branches for ${ticketId} still exist on the remote. Nothing to clean up.`);
            return;
        }
        // Show which branches will be deleted
        const items = orphanedBranches.map(name => ({
            label: name,
            description: name === currentBranch ? 'current branch — will switch away first' : 'no longer on remote',
            picked: name !== currentBranch
        }));
        const selected = await vscode.window.showQuickPick(items, {
            canPickMany: true,
            placeHolder: `These local branches no longer exist on the remote. Select which to delete:`,
            title: 'Ricwiz: Delete Unused Branches'
        });
        if (!selected || selected.length === 0) {
            vscode.window.showInformationMessage('Ricwiz: No branches selected for deletion.');
            return;
        }
        // Final confirmation
        const branchList = selected.map(s => s.label).join(', ');
        const confirm = await vscode.window.showWarningMessage(`Ricwiz: Delete ${selected.length} local branch(es)?\n${branchList}`, { modal: true }, 'Yes, delete them');
        if (confirm !== 'Yes, delete them') {
            vscode.window.showInformationMessage('Ricwiz: Deletion cancelled.');
            return;
        }
        let deleted = 0;
        for (const item of selected) {
            const name = item.label;
            // If on this branch, switch away first
            if (name === currentBranch) {
                const fallbackBranch = config.get('ticketSourceBranch', 'main');
                try {
                    await (0, git_1.exec)(`git checkout ${fallbackBranch}`, { cwd });
                    currentBranch = fallbackBranch;
                }
                catch (e) {
                    vscode.window.showWarningMessage(`Ricwiz: Could not switch away from ${name}. Skipping.`);
                    continue;
                }
            }
            try {
                await (0, git_1.exec)(`git branch -D ${name}`, { cwd });
                deleted++;
            }
            catch (e) {
                vscode.window.showWarningMessage(`Ricwiz: Could not delete local branch ${name}.`);
            }
        }
        vscode.window.showInformationMessage(`Ricwiz: 🗑️ Cleaned up ${deleted} unused local branch(es) for ${ticketId}.`);
    });
}
//# sourceMappingURL=deleteUnused.js.map