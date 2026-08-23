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
        const cleanToken = token.trim();
        
        // Show progress while validating
        await vscode.window.withProgress({
            location: vscode.ProgressLocation.Notification,
            title: "Ricwiz: Validating GitLab Token...",
            cancellable: false
        }, async () => {
            try {
                // Try to infer base URL from git remote, default to gitlab.com if not inside a repo
                const config = vscode.workspace.getConfiguration('ricwiz');
                let webUrl = config.get<string>('gitlabUrlOverride', '').trim();
                if (!webUrl && vscode.workspace.workspaceFolders) {
                    try {
                        const { exec } = require('../git');
                        const cwd = vscode.workspace.workspaceFolders[0].uri.fsPath;
                        const { stdout } = await exec('git remote get-url origin', { cwd });
                        let remoteUrl = stdout.trim();
                        if (remoteUrl.startsWith('git@')) remoteUrl = `https://${remoteUrl.replace('git@', '').replace(':', '/')}`;
                        if (remoteUrl.endsWith('.git')) remoteUrl = remoteUrl.slice(0, -4);
                        webUrl = remoteUrl;
                    } catch (e) {}
                }
                
                if (!webUrl) {
                    webUrl = 'https://gitlab.com';
                }
                
                const urlObj = new URL(webUrl);
                const baseUrl = `${urlObj.protocol}//${urlObj.host}`;

                // Validate token by fetching the authenticated user
                const https = require('https');
                const user = await new Promise<any>((resolve, reject) => {
                    const req = https.request(new URL(`${baseUrl}/api/v4/user`), {
                        method: 'GET',
                        timeout: 5000,
                        headers: { 'PRIVATE-TOKEN': cleanToken, 'Accept': 'application/json' }
                    }, (res: any) => {
                        if (res.statusCode >= 400) return reject(new Error(`Status ${res.statusCode}`));
                        let data = '';
                        res.on('data', (c: string) => data += c);
                        res.on('end', () => resolve(JSON.parse(data || '{}')));
                    });
                    req.on('error', reject);
                    req.on('timeout', () => { req.destroy(); reject(new Error('Timeout')); });
                    req.end();
                });

                await storeGitlabToken(cleanToken);
                vscode.window.showInformationMessage(`Ricwiz: ✅ GitLab API Token saved and validated successfully for ${user.username || 'user'}!`);
                
                // Force UI refresh if possible
                vscode.commands.executeCommand('ricwiz.manualRefresh');
                
            } catch (error: any) {
                vscode.window.showErrorMessage(`Ricwiz: ❌ Invalid token or cannot reach GitLab (${error.message}). Please check the token and try again.`);
            }
        });
    }
}
