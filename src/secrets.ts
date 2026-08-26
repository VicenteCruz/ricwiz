import * as vscode from 'vscode';
import { logDebug } from './logger';

export async function initializeSecrets(context: vscode.ExtensionContext) {
    logDebug('initializeSecrets: No longer using SecretStorage. Tokens are read directly from VS Code configuration.');
}

export async function storeJiraToken(token: string): Promise<void> {
    logDebug('storeJiraToken: Storing token in VS Code global configuration...');
    const config = vscode.workspace.getConfiguration('ricwiz');
    await config.update('jiraApiToken', token, vscode.ConfigurationTarget.Global);
    logDebug('storeJiraToken: Successfully stored');
}

export async function getJiraToken(): Promise<string | undefined> {
    logDebug('getJiraToken: Reading token from VS Code configuration...');
    const config = vscode.workspace.getConfiguration('ricwiz');
    const token = config.get<string>('jiraApiToken', '');
    if (token) {
        logDebug('getJiraToken: Successfully read Jira Token from configuration.');
        return token;
    }
    logDebug('getJiraToken: Token not found in configuration.');
    return undefined;
}

export async function storeGitlabToken(token: string): Promise<void> {
    logDebug('storeGitlabToken: Storing token in VS Code global configuration...');
    const config = vscode.workspace.getConfiguration('ricwiz');
    await config.update('gitlabApiToken', token, vscode.ConfigurationTarget.Global);
    logDebug('storeGitlabToken: Successfully stored');
}

export async function getGitlabToken(): Promise<string | undefined> {
    logDebug('getGitlabToken: Reading token from VS Code configuration...');
    const config = vscode.workspace.getConfiguration('ricwiz');
    const token = config.get<string>('gitlabApiToken', '');
    if (token) {
        return token;
    }
    return undefined;
}
