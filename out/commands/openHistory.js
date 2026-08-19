"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.openHistory = openHistory;
const vscode = require("vscode");
const git_1 = require("../git");
const checkoutBranch_1 = require("./checkoutBranch");
async function openHistory() {
    const cwd = (0, git_1.getWorkspaceCwd)();
    if (!cwd)
        return;
    try {
        const { stdout } = await (0, git_1.exec)(`git for-each-ref --sort=-committerdate --format="%(refname:short)|||%(committerdate:relative)|||%(subject)" refs/heads/`, { cwd });
        const branches = stdout.split('\n').filter(l => l.trim()).map(line => {
            const parts = line.split('|||');
            return {
                label: `$(git-branch) ${parts[0]}`,
                description: parts[1],
                detail: parts[2],
                branchName: parts[0]
            };
        });
        const selected = await vscode.window.showQuickPick(branches, {
            placeHolder: 'Select a branch from history to checkout',
            matchOnDescription: true,
            matchOnDetail: true
        });
        if (selected) {
            await (0, checkoutBranch_1.checkoutBranch)(selected.branchName);
        }
    }
    catch (e) {
        vscode.window.showErrorMessage('Ricwiz: Failed to get branch history');
    }
}
//# sourceMappingURL=openHistory.js.map