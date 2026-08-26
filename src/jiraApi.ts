import * as https from 'https';
import * as vscode from 'vscode';
import { getJiraToken } from './secrets';

export interface JiraIssueData {
    summary: string;
    description: string;
    status: string;
    url?: string;
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
        throw new Error(`[v5.1.2] Jira API Token is not securely configured. URL: "${jiraUrlStr}", hasToken: ${!!token}`);
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
    const { baseUrl } = await getJiraAuthAndBaseUrl();
    const json = await jiraRequest<any>('GET', `/rest/api/2/issue/${ticketId}`);
    if (json && json.fields) {
        return {
            summary: json.fields.summary || '',
            description: json.fields.description || 'No description provided.',
            status: json.fields.status?.name || 'Unknown',
            url: `${baseUrl}/browse/${ticketId}`
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
    const json = await jiraRequest<any>('POST', '/rest/api/3/search/jql', {
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

/**
 * Recursively extracts plain text from an Atlassian Document Format (ADF) node.
 * Jira API v3 returns rich text fields (e.g. description) as ADF instead of plain strings.
 */
export function extractTextFromADF(adfNode: unknown): string {
    if (!adfNode || typeof adfNode !== 'object') { return ''; }
    const node = adfNode as Record<string, unknown>;

    if (node.type === 'text') {
        return typeof node.text === 'string' ? node.text : '';
    }

    let text = '';
    if (Array.isArray(node.content)) {
        for (const child of node.content) {
            const childText = extractTextFromADF(child);
            if (childText) {
                text += childText + ' ';
            }
        }
    }
    return text.trim();
}

/**
 * Fetches multiple Jira issues in a single JQL batch request using API v3.
 * Converts ADF description fields to plain text to reduce token consumption for AI contexts.
 * Includes parent, subtasks, and issue links for full relationship context.
 * @param ticketIds - Array of Jira issue keys, e.g. ["SFPSCA-1234", "SFPSCA-5678"]
 */
export async function fetchJiraIssuesBatch(ticketIds: string[]): Promise<import('./types').BatchIssueResult[]> {
    if (ticketIds.length === 0) { return []; }

    const jql = `issueKey IN (${ticketIds.join(',')})`;
    const json = await jiraRequest<any>('POST', '/rest/api/3/search/jql', {
        jql,
        maxResults: 15,
        fields: ['summary', 'description', 'parent', 'subtasks', 'issuelinks']
    });

    if (!json || !json.issues) { return []; }

    return json.issues.map((issue: any): import('./types').BatchIssueResult => {
        // ── Parent ──────────────────────────────────────────────────────────
        const parentRaw = issue.fields?.parent;
        const parent = parentRaw
            ? { key: parentRaw.key, title: parentRaw.fields?.summary || '' }
            : undefined;

        // ── Subtasks ─────────────────────────────────────────────────────────
        const subtasks: import('./types').IssueSummary[] = (issue.fields?.subtasks ?? []).map(
            (s: any) => ({ key: s.key, title: s.fields?.summary || '' })
        );

        // ── Issue Links ───────────────────────────────────────────────────────
        // Each link has either inwardIssue or outwardIssue (never both).
        // The matching direction determines which relationship label to use.
        const issueLinks: import('./types').IssueLink[] = (issue.fields?.issuelinks ?? []).map(
            (link: any): import('./types').IssueLink => {
                if (link.outwardIssue) {
                    return {
                        type: link.type?.outward || 'relates to',
                        issue: { key: link.outwardIssue.key, title: link.outwardIssue.fields?.summary || '' }
                    };
                }
                return {
                    type: link.type?.inward || 'relates to',
                    issue: { key: link.inwardIssue.key, title: link.inwardIssue.fields?.summary || '' }
                };
            }
        );

        return {
            key: issue.key,
            title: issue.fields?.summary || '',
            description: extractTextFromADF(issue.fields?.description),
            parent,
            subtasks,
            issueLinks
        };
    });
}
