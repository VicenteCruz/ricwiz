import * as vscode from 'vscode';
import { exec, getWorkspaceCwd, sanitizeShellInput } from '../git';
import { checkoutBranch } from './checkoutBranch';

export async function searchTicket() {
    const cwd = getWorkspaceCwd();
    if (!cwd) return;

    const ticketId = await vscode.window.showInputBox({
        prompt: 'Enter ticket number or name (e.g., 48934)',
        placeHolder: '48934'
    });

    if (!ticketId) return;
    
    const sanitizedSearch = sanitizeShellInput(ticketId);

    try {
        const { stdout } = await exec(`git branch --list "*${sanitizedSearch}*"`, { cwd });
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
            await checkoutBranch(selected.branchName);
        }
    } catch (e) {
        vscode.window.showErrorMessage('Ricwiz: Failed to search branches');
    }
}
