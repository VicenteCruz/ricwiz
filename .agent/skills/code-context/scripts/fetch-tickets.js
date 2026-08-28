#!/usr/bin/env node

const https = require('https');
const fs = require('fs');
const path = require('path');
const os = require('os');

function getVSCodeSettings() {
    let settings = {};
    
    // 1. Try global VS Code settings
    try {
        const appData = process.env.APPDATA || (process.platform === 'darwin' ? path.join(os.homedir(), 'Library', 'Application Support') : path.join(os.homedir(), '.config'));
        const globalSettingsPath = path.join(appData, 'Code', 'User', 'settings.json');
        if (fs.existsSync(globalSettingsPath)) {
            const content = fs.readFileSync(globalSettingsPath, 'utf8');
            // Strip comments if any
            const cleaned = content.replace(/\/\/.*$/gm, '').replace(/\/\*[\s\S]*?\*\//g, '');
            Object.assign(settings, JSON.parse(cleaned));
        }
    } catch (e) {}

    // 2. Try workspace settings (.vscode/settings.json)
    try {
        const localSettingsPath = path.join(process.cwd(), '.vscode', 'settings.json');
        if (fs.existsSync(localSettingsPath)) {
            const content = fs.readFileSync(localSettingsPath, 'utf8');
            const cleaned = content.replace(/\/\/.*$/gm, '').replace(/\/\*[\s\S]*?\*\//g, '');
            Object.assign(settings, JSON.parse(cleaned));
        }
    } catch (e) {}

    return settings;
}

function extractTextFromADF(node) {
    if (!node || typeof node !== 'object') return '';
    if (node.type === 'text') return typeof node.text === 'string' ? node.text : '';
    let text = '';
    if (Array.isArray(node.content)) {
        for (const child of node.content) {
            const childText = extractTextFromADF(child);
            if (childText) text += childText + ' ';
        }
    }
    return text.trim();
}

async function fetchJiraBatch(ticketIds) {
    if (!ticketIds || ticketIds.length === 0) {
        console.log(JSON.stringify([]));
        return;
    }

    const settings = getVSCodeSettings();
    const jiraUrlStr = process.env.JIRA_URL || process.env.RICWIZ_JIRA_URL || settings['ricwiz.jiraUrl'] || '';
    const email = (process.env.JIRA_EMAIL || process.env.RICWIZ_JIRA_EMAIL || settings['ricwiz.jiraEmail'] || '').trim();
    const token = (process.env.JIRA_API_TOKEN || process.env.RICWIZ_JIRA_TOKEN || settings['ricwiz.jiraApiToken'] || '').trim();

    if (!jiraUrlStr) {
        console.error("Error: Jira URL not configured. Set 'ricwiz.jiraUrl' in VS Code settings or JIRA_URL environment variable.");
        process.exit(1);
    }
    if (!token) {
        console.error("Error: Jira API Token not configured. Set 'ricwiz.jiraApiToken' or JIRA_API_TOKEN / RICWIZ_JIRA_TOKEN environment variable.");
        process.exit(1);
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

    const jql = `issueKey IN (${ticketIds.join(',')})`;
    const postData = JSON.stringify({
        jql,
        maxResults: 15,
        fields: ['summary', 'description', 'parent', 'subtasks', 'issuelinks', 'issuetype', 'status', 'assignee', 'priority', 'labels', 'fixVersions']
    });

    const url = new URL(`${baseUrl}/rest/api/3/search/jql`);

    const req = https.request(url, {
        method: 'POST',
        headers: {
            'Authorization': headerAuth,
            'Accept': 'application/json',
            'Content-Type': 'application/json'
        }
    }, (res) => {
        let data = '';
        res.on('data', chunk => data += chunk);
        res.on('end', () => {
            if (res.statusCode && res.statusCode >= 400) {
                console.error(`Jira API error (HTTP ${res.statusCode}): ${data}`);
                process.exit(1);
            }
            try {
                const json = JSON.parse(data);
                const results = (json.issues || []).map(issue => {
                    const parentRaw = issue.fields?.parent;
                    const parent = parentRaw
                        ? { key: parentRaw.key, title: parentRaw.fields?.summary || '' }
                        : undefined;

                    const subtasks = (issue.fields?.subtasks || []).map(s => ({
                        key: s.key,
                        title: s.fields?.summary || ''
                    }));

                    const issueLinks = (issue.fields?.issuelinks || []).map(link => {
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
                    });

                    const fixVersions = (issue.fields?.fixVersions || []).map(v => v.name).filter(Boolean);

                    return {
                        key: issue.key,
                        title: issue.fields?.summary || '',
                        type: issue.fields?.issuetype?.name || '',
                        status: issue.fields?.status?.name || '',
                        assignee: issue.fields?.assignee?.displayName || '',
                        priority: issue.fields?.priority?.name || '',
                        labels: issue.fields?.labels || [],
                        fixVersions,
                        description: extractTextFromADF(issue.fields?.description),
                        parent,
                        subtasks,
                        issueLinks
                    };
                });

                console.log(JSON.stringify(results, null, 2));
            } catch (err) {
                console.error("Failed to parse response:", err.message);
                process.exit(1);
            }
        });
    });

    req.on('error', (err) => {
        console.error("Network error:", err.message);
        process.exit(1);
    });

    req.write(postData);
    req.end();
}

const args = process.argv.slice(2).flatMap(arg => arg.split(/[,\s]+/)).map(t => t.trim().toUpperCase()).filter(Boolean);
if (args.length === 0) {
    console.error("Usage: node fetch-tickets.js <TICKET-1> [TICKET-2] ...");
    process.exit(1);
}

fetchJiraBatch(args);
