import * as vscode from 'vscode';
import { RicwizWebviewProvider } from './webview';
import { initializeSecrets, getJiraToken, getGitlabToken } from './secrets';
import { registerAllCommands } from './commands/index';
import { initializeGitMonitor } from './gitMonitor';
import { AiSkills } from './acpSkills';
import { RicwizPublicApi } from './types';
import { startLocalServer, stopLocalServer } from './localServer';

export let webviewProvider: RicwizWebviewProvider | undefined;

export async function activate(context: vscode.ExtensionContext): Promise<RicwizPublicApi> {
    await initializeSecrets(context);
    startLocalServer();
    
    webviewProvider = new RicwizWebviewProvider(context.extensionUri);
    context.subscriptions.push(
        vscode.window.registerWebviewViewProvider('ricwiz-webview', webviewProvider)
    );

    // Status Bar Item — shows current ticket, click opens Jira
    const statusBarItem = vscode.window.createStatusBarItem(vscode.StatusBarAlignment.Left, 100);
    statusBarItem.command = 'ricwiz.openJiraTicket';
    context.subscriptions.push(statusBarItem);

    // --- Custom URI Handler for external automation ---
    context.subscriptions.push(
        vscode.window.registerUriHandler({
            handleUri(uri: vscode.Uri) {
                if (uri.path === '/setCommitMessage') {
                    const queryParams = new URLSearchParams(uri.query);
                    const msg = queryParams.get('msg');
                    if (msg) {
                        const gitExt = vscode.extensions.getExtension('vscode.git');
                        if (gitExt && gitExt.isActive) {
                            const git = gitExt.exports.getAPI(1);
                            if (git.repositories.length > 0) {
                                const repo = git.repositories[0];
                                // Check if we already have the ticket prefix to preserve it
                                const current = repo.inputBox.value;
                                const ticketPattern = /^[A-Z]+-\d+(?:-\d+)?\s*(?:-\s*|:\s*|\s+)?/i;
                                const match = current.match(ticketPattern);
                                if (match) {
                                    repo.inputBox.value = match[0] + msg;
                                } else {
                                    repo.inputBox.value = msg;
                                }
                            }
                        }
                    }
                }
            }
        })
    );

    // ─── Git Integration (Auto Commit Message, Webview Update, Status Bar Update) ───
    const forceUpdate = initializeGitMonitor(context, webviewProvider, statusBarItem);

    // ─── Register All Commands ──────────────────────────────────────────
    registerAllCommands(context, webviewProvider, forceUpdate);

    // ─── Inter-Extension API (consumed by the ACP extension) ───────────
    return {
        getJiraCredentials: async () => ({
            email: vscode.workspace.getConfiguration('ricwiz').get<string>('jiraEmail', ''),
            token: await getJiraToken()
        }),
        getGitLabToken: async () => getGitlabToken(),
        AiSkills
    };
}

export function deactivate() {
    stopLocalServer();
}
