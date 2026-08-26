import * as vscode from 'vscode';
import { RicwizWebviewProvider } from './webview';
import { initializeSecrets, getJiraToken, getGitlabToken } from './secrets';
import { registerAllCommands } from './commands/index';
import { initializeGitMonitor } from './gitMonitor';
import { AiSkills } from './acpSkills';
import { RicwizPublicApi } from './types';

export let webviewProvider: RicwizWebviewProvider | undefined;

export function activate(context: vscode.ExtensionContext): RicwizPublicApi {
    initializeSecrets(context);
    
    webviewProvider = new RicwizWebviewProvider(context.extensionUri);
    context.subscriptions.push(
        vscode.window.registerWebviewViewProvider('ricwiz-webview', webviewProvider)
    );

    // Status Bar Item — shows current ticket, click opens Jira
    const statusBarItem = vscode.window.createStatusBarItem(vscode.StatusBarAlignment.Left, 100);
    statusBarItem.command = 'ricwiz.openJiraTicket';
    context.subscriptions.push(statusBarItem);

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

export function deactivate() {}

