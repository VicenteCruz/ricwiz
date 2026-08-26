import * as vscode from 'vscode';

let secretStorage: vscode.SecretStorage;
let cachedJiraToken: string | undefined;
let cachedGitlabToken: string | undefined;

export async function initializeSecrets(context: vscode.ExtensionContext) {
    secretStorage = context.secrets;

    // Await pre-loading to guarantee the cache is populated before the background server starts.
    cachedJiraToken = await secretStorage.get('ricwiz.jiraApiToken');
    cachedGitlabToken = await secretStorage.get('ricwiz.gitlabApiToken');

    // Background poller: if the OS Credential Manager was too slow to initialize during activate(),
    // retry fetching every 2 seconds. Because this interval is created here, it inherits the correct VS Code context!
    const poller = setInterval(async () => {
        if (!cachedJiraToken) {
            const t = await secretStorage.get('ricwiz.jiraApiToken');
            if (t) cachedJiraToken = t;
        }
        if (!cachedGitlabToken) {
            const t = await secretStorage.get('ricwiz.gitlabApiToken');
            if (t) cachedGitlabToken = t;
        }
        // If both are found, we can optionally clear the interval, but it's cheap to leave it or we can clear it.
        // We'll leave it running just in case, or clear it if both are found.
        if (cachedJiraToken && cachedGitlabToken) {
            clearInterval(poller);
        }
    }, 2000);

    // Keep cache synced if tokens change in another VS Code window or UI command
    context.subscriptions.push(
        context.secrets.onDidChange(async (e) => {
            if (e.key === 'ricwiz.jiraApiToken') {
                cachedJiraToken = await secretStorage.get('ricwiz.jiraApiToken');
            } else if (e.key === 'ricwiz.gitlabApiToken') {
                cachedGitlabToken = await secretStorage.get('ricwiz.gitlabApiToken');
            }
        })
    );
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
