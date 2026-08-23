import * as vscode from 'vscode';
import { RicwizWebviewProvider } from './webview';
import { initializeSecrets } from './secrets';
import { registerAllCommands } from './commands/index';
import { initializeGitMonitor } from './gitMonitor';

export let webviewProvider: RicwizWebviewProvider | undefined;

export function activate(context: vscode.ExtensionContext) {
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
}

export function deactivate() {}
