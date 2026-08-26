import * as vscode from 'vscode';
import { logDebug } from './logger';

let secretStorage: vscode.SecretStorage;
let cachedJiraToken: string | undefined;
let cachedGitlabToken: string | undefined;

export async function initializeSecrets(context: vscode.ExtensionContext) {
    logDebug('initializeSecrets: Start');
    secretStorage = context.secrets;

    try {
        logDebug('initializeSecrets: Awaiting secretStorage.get for Jira...');
        cachedJiraToken = await secretStorage.get('ricwiz.jiraApiToken');
        logDebug(`initializeSecrets: cachedJiraToken is ${cachedJiraToken ? 'SET' : 'UNDEFINED'}`);
        
        cachedGitlabToken = await secretStorage.get('ricwiz.gitlabApiToken');
    } catch (e: any) {
        logDebug(`initializeSecrets: ERROR during initial fetch: ${e.message}`);
    }

    const poller = setInterval(async () => {
        logDebug('Secret Poller: Running background check...');
        try {
            if (!cachedJiraToken) {
                logDebug('Secret Poller: cachedJiraToken is missing, attempting to fetch...');
                const t = await secretStorage.get('ricwiz.jiraApiToken');
                if (t) {
                    cachedJiraToken = t;
                    logDebug('Secret Poller: Successfully fetched Jira Token!');
                } else {
                    logDebug('Secret Poller: Fetch returned undefined for Jira Token.');
                }
            }
            if (!cachedGitlabToken) {
                const t = await secretStorage.get('ricwiz.gitlabApiToken');
                if (t) cachedGitlabToken = t;
            }
            if (cachedJiraToken && cachedGitlabToken) {
                logDebug('Secret Poller: Both tokens cached. Stopping poller.');
                clearInterval(poller);
            }
        } catch (e: any) {
            logDebug(`Secret Poller: ERROR during fetch: ${e.message}`);
        }
    }, 2000);

    context.subscriptions.push(
        context.secrets.onDidChange(async (e) => {
            logDebug(`onDidChange event fired for key: ${e.key}`);
            if (e.key === 'ricwiz.jiraApiToken') {
                cachedJiraToken = await secretStorage.get('ricwiz.jiraApiToken');
                logDebug(`onDidChange: cachedJiraToken updated to ${cachedJiraToken ? 'SET' : 'UNDEFINED'}`);
            } else if (e.key === 'ricwiz.gitlabApiToken') {
                cachedGitlabToken = await secretStorage.get('ricwiz.gitlabApiToken');
            }
        })
    );
}

export async function storeJiraToken(token: string): Promise<void> {
    logDebug('storeJiraToken: Storing token...');
    if (!secretStorage) {
        throw new Error('SecretStorage is not initialized.');
    }
    cachedJiraToken = token;
    await secretStorage.store('ricwiz.jiraApiToken', token);
    logDebug('storeJiraToken: Successfully stored');
}

export async function getJiraToken(): Promise<string | undefined> {
    logDebug(`getJiraToken: Called. Cache is ${cachedJiraToken ? 'SET' : 'UNDEFINED'}`);
    if (cachedJiraToken) return cachedJiraToken;
    if (!secretStorage) {
        logDebug('getJiraToken: SecretStorage not initialized!');
        throw new Error('SecretStorage is not initialized.');
    }
    logDebug('getJiraToken: Cache is empty, falling back to secretStorage.get...');
    try {
        const t = await secretStorage.get('ricwiz.jiraApiToken');
        logDebug(`getJiraToken: Fallback returned ${t ? 'SET' : 'UNDEFINED'}`);
        if (t) cachedJiraToken = t;
        return t;
    } catch (e: any) {
        logDebug(`getJiraToken: ERROR during fallback fetch: ${e.message}`);
        return undefined;
    }
}

export async function storeGitlabToken(token: string): Promise<void> {
    if (!secretStorage) throw new Error('SecretStorage is not initialized.');
    cachedGitlabToken = token;
    await secretStorage.store('ricwiz.gitlabApiToken', token);
}

export async function getGitlabToken(): Promise<string | undefined> {
    if (cachedGitlabToken) return cachedGitlabToken;
    if (!secretStorage) throw new Error('SecretStorage is not initialized.');
    const t = await secretStorage.get('ricwiz.gitlabApiToken');
    if (t) cachedGitlabToken = t;
    return t;
}
