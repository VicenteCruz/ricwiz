import * as vscode from 'vscode';

let secretStorage: vscode.SecretStorage;

export function initializeSecrets(context: vscode.ExtensionContext) {
    secretStorage = context.secrets;
}

export async function storeJiraToken(token: string): Promise<void> {
    if (!secretStorage) {
        throw new Error('SecretStorage is not initialized.');
    }
    await secretStorage.store('ricwiz.jiraApiToken', token);
}

export async function getJiraToken(): Promise<string | undefined> {
    if (!secretStorage) {
        throw new Error('SecretStorage is not initialized.');
    }
    return await secretStorage.get('ricwiz.jiraApiToken');
}
