"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.checkoutBranch = checkoutBranch;
const vscode = require("vscode");
const git_1 = require("../git");
async function checkoutBranch(branchName) {
    const cwd = (0, git_1.getWorkspaceCwd)();
    if (!cwd)
        return;
    await vscode.window.withProgress({
        location: vscode.ProgressLocation.Notification,
        title: `Ricwiz: Switching to ${branchName}...`,
        cancellable: false
    }, async () => {
        try {
            // 1. Get current branch before checkout
            const currentBranch = await (0, git_1.getCurrentBranch)(cwd);
            // 2. Check for uncommitted changes (staged + unstaged + untracked)
            let hasChanges = false;
            try {
                const { stdout } = await (0, git_1.exec)('git status --porcelain', { cwd });
                hasChanges = stdout.trim().length > 0;
            }
            catch (e) { }
            // 3. Auto-stash if there are uncommitted changes
            if (hasChanges && currentBranch) {
                try {
                    await (0, git_1.exec)(`git stash push --include-untracked -m "ricwiz-auto:${currentBranch}"`, { cwd });
                    vscode.window.showInformationMessage(`Ricwiz: 📦 Stashed changes from ${currentBranch}`);
                }
                catch (e) {
                    vscode.window.showWarningMessage(`Ricwiz: Could not stash changes. Checkout may fail if there are conflicts.`);
                }
            }
            // 4. Checkout the target branch
            await (0, git_1.exec)(`git checkout ${branchName}`, { cwd });
            // 5. Look for a saved stash for the new branch and restore it
            try {
                const { stdout } = await (0, git_1.exec)('git stash list', { cwd });
                const lines = stdout.split('\n');
                for (let i = 0; i < lines.length; i++) {
                    if (lines[i].includes(`ricwiz-auto:${branchName}`)) {
                        const stashMatch = lines[i].match(/stash@\{(\d+)\}/);
                        if (stashMatch) {
                            await (0, git_1.exec)(`git stash pop stash@{${stashMatch[1]}}`, { cwd });
                            vscode.window.showInformationMessage(`Ricwiz: 📦 Restored stashed changes on ${branchName}`);
                        }
                        break;
                    }
                }
            }
            catch (e) {
                vscode.window.showWarningMessage(`Ricwiz: Could not restore stashed changes on ${branchName}. You may need to resolve conflicts manually (check git stash list).`);
            }
        }
        catch (e) {
            vscode.window.showErrorMessage(`Ricwiz: Could not checkout branch ${branchName}.`);
        }
    });
}
//# sourceMappingURL=checkoutBranch.js.map