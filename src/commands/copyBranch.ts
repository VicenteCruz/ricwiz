import * as vscode from 'vscode';
import { exec, getWorkspaceCwd } from '../git';

export async function copyBranchName(): Promise<void> {
    const cwd = getWorkspaceCwd();
    if (!cwd) return;

    try {
        const { stdout } = await exec('git branch --show-current', { cwd });
        const branchName = stdout.trim();
        if (branchName) {
            await vscode.env.clipboard.writeText(branchName);
            vscode.window.showInformationMessage(`Ricwiz: 📋 Copied "${branchName}" to clipboard`);
        }
    } catch (e) {
        vscode.window.showErrorMessage('Ricwiz: Could not get the current branch name.');
    }
}
