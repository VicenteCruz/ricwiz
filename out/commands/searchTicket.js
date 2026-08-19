"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.searchTicket = searchTicket;
const vscode = require("vscode");
const git_1 = require("../git");
const checkoutBranch_1 = require("./checkoutBranch");
async function searchTicket() {
    const cwd = (0, git_1.getWorkspaceCwd)();
    if (!cwd)
        return;
    const ticketId = await vscode.window.showInputBox({
        prompt: 'Enter ticket number or name (e.g., 48934)',
        placeHolder: '48934'
    });
    if (!ticketId)
        return;
    try {
        const { stdout } = await (0, git_1.exec)(`git branch --list "*${ticketId}*"`, { cwd });
        const branches = stdout.split('\n')
            .map(b => b.replace('*', '').trim())
            .filter(b => b);
        if (branches.length === 0) {
            vscode.window.showInformationMessage(`Ricwiz: No branches found matching "${ticketId}"`);
            return;
        }
        const items = branches.map(b => ({
            label: `$(git-branch) ${b}`,
            branchName: b
        }));
        const selected = await vscode.window.showQuickPick(items, {
            placeHolder: `Select a branch for ${ticketId}`
        });
        if (selected) {
            await (0, checkoutBranch_1.checkoutBranch)(selected.branchName);
        }
    }
    catch (e) {
        vscode.window.showErrorMessage('Ricwiz: Failed to search branches');
    }
}
//# sourceMappingURL=searchTicket.js.map