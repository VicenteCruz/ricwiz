"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.copyBranchName = copyBranchName;
const vscode = require("vscode");
const git_1 = require("../git");
async function copyBranchName() {
    const cwd = (0, git_1.getWorkspaceCwd)();
    if (!cwd)
        return;
    try {
        const { stdout } = await (0, git_1.exec)('git branch --show-current', { cwd });
        const branchName = stdout.trim();
        if (branchName) {
            await vscode.env.clipboard.writeText(branchName);
            vscode.window.showInformationMessage(`Ricwiz: 📋 Copied "${branchName}" to clipboard`);
        }
    }
    catch (e) {
        vscode.window.showErrorMessage('Ricwiz: Could not get the current branch name.');
    }
}
//# sourceMappingURL=copyBranch.js.map