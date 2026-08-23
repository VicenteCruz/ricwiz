import * as vscode from 'vscode';
import { storeGitlabToken } from '../secrets';

export async function setGitlabTokenCommand(): Promise<void> {
    const token = await vscode.window.showInputBox({
        prompt: 'Enter your GitLab Personal Access Token',
        placeHolder: 'glpat-xxxxxxxxxxxxxxxxxxxx',
        ignoreFocusOut: true,
        password: true
    });

    if (token && token.trim()) {
        await storeGitlabToken(token.trim());
        vscode.window.showInformationMessage('Ricwiz: GitLab API Token has been securely stored.');
    }
}
