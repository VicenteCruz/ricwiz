import * as https from 'https';
import * as vscode from 'vscode';

export interface JiraIssueData {
    summary: string;
    description: string;
}

export async function fetchJiraIssue(ticketId: string): Promise<JiraIssueData | null> {
    const config = vscode.workspace.getConfiguration('ricwiz');
    const jiraUrlStr = config.get<string>('jiraUrl', '');
    const email = config.get<string>('jiraEmail', '')?.trim();
    const token = config.get<string>('jiraApiToken', '')?.trim();

    if (!jiraUrlStr || !token) {
        throw new Error('Jira API Token is not configured in Ricwiz Settings.');
    }

    // Extract base URL (e.g. from https://jira.company.com/browse/)
    let baseUrl = jiraUrlStr;
    if (baseUrl.includes('/browse')) {
        baseUrl = baseUrl.split('/browse')[0];
    }
    // Remove trailing slash if any
    if (baseUrl.endsWith('/')) {
        baseUrl = baseUrl.slice(0, -1);
    }

    // Auth header: If email is provided, assume Jira Cloud Basic Auth (email:token)
    // If no email, assume Personal Access Token (Bearer) for Jira Data Center
    const headerAuth = email 
        ? `Basic ${Buffer.from(`${email}:${token}`).toString('base64')}` 
        : `Bearer ${token}`;

    const url = new URL(`${baseUrl}/rest/api/2/issue/${ticketId}`);

    return new Promise((resolve, reject) => {
        const req = https.request(url, {
            method: 'GET',
            headers: {
                'Authorization': headerAuth,
                'Accept': 'application/json'
            }
        }, (res) => {
            if (res.statusCode === 401 || res.statusCode === 403) {
                return reject(new Error(`Authentication failed (HTTP ${res.statusCode}). Please check your Jira Email and API Token in settings.`));
            }
            if (res.statusCode === 404) {
                return reject(new Error(`Ticket ${ticketId} not found in Jira.`));
            }
            if (res.statusCode && res.statusCode >= 400) {
                return reject(new Error(`Jira API returned HTTP status ${res.statusCode}`));
            }

            let data = '';
            res.on('data', chunk => data += chunk);
            res.on('end', () => {
                try {
                    const json = JSON.parse(data);
                    if (json && json.fields) {
                        resolve({
                            summary: json.fields.summary || '',
                            description: json.fields.description || 'No description provided.'
                        });
                    } else {
                        resolve(null);
                    }
                } catch(e) {
                    reject(new Error('Failed to parse Jira response.'));
                }
            });
        });

        req.on('error', (e) => reject(new Error(`Network error connecting to Jira: ${e.message}`)));
        req.end();
    });
}
