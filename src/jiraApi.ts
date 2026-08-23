import * as https from 'https';
import * as vscode from 'vscode';
import { getJiraToken } from './secrets';

export interface JiraIssueData {
    summary: string;
    description: string;
}

export interface JiraTransition {
    id: string;
    name: string;
}

async function getJiraAuthAndBaseUrl() {
    const config = vscode.workspace.getConfiguration('ricwiz');
    const jiraUrlStr = config.get<string>('jiraUrl', '');
    const email = config.get<string>('jiraEmail', '')?.trim();
    const token = (await getJiraToken())?.trim();

    if (!jiraUrlStr || !token) {
        throw new Error('Jira API Token is not securely configured. Please run the "Ricwiz: Set Secure Jira API Token" command.');
    }

    let baseUrl = jiraUrlStr;
    if (baseUrl.includes('/browse')) {
        baseUrl = baseUrl.split('/browse')[0];
    }
    if (baseUrl.endsWith('/')) {
        baseUrl = baseUrl.slice(0, -1);
    }

    const headerAuth = email 
        ? `Basic ${Buffer.from(`${email}:${token}`).toString('base64')}` 
        : `Bearer ${token}`;

    return { baseUrl, headerAuth };
}

async function jiraRequest<T>(method: string, path: string, body?: any): Promise<T> {
    const { baseUrl, headerAuth } = await getJiraAuthAndBaseUrl();
    const url = new URL(`${baseUrl}${path}`);

    return new Promise((resolve, reject) => {
        const req = https.request(url, {
            method,
            headers: {
                'Authorization': headerAuth,
                'Accept': 'application/json',
                ...(body ? { 'Content-Type': 'application/json' } : {})
            }
        }, (res) => {
            let data = '';
            res.on('data', chunk => data += chunk);
            res.on('end', () => {
                if (res.statusCode === 401 || res.statusCode === 403) {
                    return reject(new Error(`Authentication failed (HTTP ${res.statusCode}). Please check your Jira settings.`));
                }
                
                if (res.statusCode && res.statusCode >= 400) {
                    let jiraErrorStr = '';
                    try {
                        const errJson = JSON.parse(data);
                        if (errJson.errorMessages && errJson.errorMessages.length > 0) {
                            jiraErrorStr = errJson.errorMessages.join(', ');
                        }
                    } catch(e) {}
                    
                    if (res.statusCode === 404 || res.statusCode === 410) {
                        return reject(new Error(`Ticket not found or deleted (HTTP ${res.statusCode}). ${jiraErrorStr}`));
                    }
                    
                    return reject(new Error(`Jira API returned HTTP status ${res.statusCode}. ${jiraErrorStr}`));
                }

                if (!data) return resolve({} as T);
                try {
                    const json = JSON.parse(data);
                    resolve(json as T);
                } catch(e) {
                    reject(new Error('Failed to parse Jira response.'));
                }
            });
        });

        req.on('error', (e) => reject(new Error(`Network error: ${e.message}`)));
        if (body) {
            req.write(JSON.stringify(body));
        }
        req.end();
    });
}

export async function fetchJiraIssue(ticketId: string): Promise<JiraIssueData | null> {
    const json = await jiraRequest<any>('GET', `/rest/api/2/issue/${ticketId}`);
    if (json && json.fields) {
        return {
            summary: json.fields.summary || '',
            description: json.fields.description || 'No description provided.'
        };
    }
    return null;
}

export async function fetchJiraTransitions(ticketId: string): Promise<JiraTransition[]> {
    const json = await jiraRequest<any>('GET', `/rest/api/2/issue/${ticketId}/transitions`);
    if (json && json.transitions) {
        return json.transitions.map((t: any) => ({
            id: t.id,
            name: t.name
        }));
    }
    return [];
}

export async function transitionJiraIssue(ticketId: string, transitionId: string): Promise<void> {
    await jiraRequest('POST', `/rest/api/2/issue/${ticketId}/transitions`, {
        transition: {
            id: transitionId
        }
    });
}

export async function addJiraComment(ticketId: string, comment: string): Promise<void> {
    await jiraRequest('POST', `/rest/api/2/issue/${ticketId}/comment`, {
        body: comment
    });
}

export async function addJiraLabel(ticketId: string, label: string): Promise<void> {
    await jiraRequest('PUT', `/rest/api/2/issue/${ticketId}`, {
        update: {
            labels: [
                { add: label }
            ]
        }
    });
}

export interface JiraSearchResult {
    key: string;
    summary: string;
    status: string;
    assignee: string;
}

export async function searchJira(jql: string): Promise<JiraSearchResult[]> {
    const json = await jiraRequest<any>('POST', '/rest/api/3/search', {
        jql,
        maxResults: 50,
        fields: ['summary', 'status', 'assignee']
    });
    
    if (json && json.issues) {
        return json.issues.map((issue: any) => ({
            key: issue.key,
            summary: issue.fields?.summary || 'No Title',
            status: issue.fields?.status?.name || 'Unknown',
            assignee: issue.fields?.assignee?.displayName || 'Unassigned'
        }));
    }
    return [];
}
