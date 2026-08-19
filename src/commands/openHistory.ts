import * as vscode from 'vscode';
import { exec, getWorkspaceCwd } from '../git';
import { checkoutBranch } from './checkoutBranch';

export async function openHistory() {
    const cwd = getWorkspaceCwd();
    if (!cwd) return;

    try {
        const { stdout } = await exec(`git for-each-ref --sort=-committerdate --format="%(refname:short)|||%(committerdate:relative)|||%(subject)" refs/heads/`, { cwd });
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
            await checkoutBranch(selected.branchName);
        }
    } catch (e) {
        vscode.window.showErrorMessage('Ricwiz: Failed to get branch history');
    }
}
