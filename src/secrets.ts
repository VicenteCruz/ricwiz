import * as vscode from 'vscode';

let secretStorage: vscode.SecretStorage;
let cachedJiraToken: string | undefined;
let cachedGitlabToken: string | undefined;

export function initializeSecrets(context: vscode.ExtensionContext) {
    secretStorage = context.secrets;
    // Pre-load secrets into memory so background tasks (like the HTTP server) 
    // don't get blocked by OS keychain background-access restrictions.
    secretStorage.get('ricwiz.jiraApiToken').then(t => cachedJiraToken = t);
    secretStorage.get('ricwiz.gitlabApiToken').then(t => cachedGitlabToken = t);
}

export async function storeJiraToken(token: string): Promise<void> {
    if (!secretStorage) {
        throw new Error('SecretStorage is not initialized.');
    }
    cachedJiraToken = token;
    await secretStorage.store('ricwiz.jiraApiToken', token);
}

export async function getJiraToken(): Promise<string | undefined> {
    if (cachedJiraToken) return cachedJiraToken;
    if (!secretStorage) {
        throw new Error('SecretStorage is not initialized.');
    }
    const t = await secretStorage.get('ricwiz.jiraApiToken');
    if (t) cachedJiraToken = t;
    return t;
}

export async function storeGitlabToken(token: string): Promise<void> {
    if (!secretStorage) {
        throw new Error('SecretStorage is not initialized.');
    }
    cachedGitlabToken = token;
    await secretStorage.store('ricwiz.gitlabApiToken', token);
}

export async function getGitlabToken(): Promise<string | undefined> {
    if (cachedGitlabToken) return cachedGitlabToken;
    if (!secretStorage) {
        throw new Error('SecretStorage is not initialized.');
    }
    const t = await secretStorage.get('ricwiz.gitlabApiToken');
    if (t) cachedGitlabToken = t;
    return t;
}
