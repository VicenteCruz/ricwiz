import * as vscode from 'vscode';
import { searchJira, fetchJiraIssue } from '../jiraApi';
import { RicwizWebviewProvider } from '../webview';

let currentSelectedIndex = 0;

export async function openJiraDashboard(webviewProvider: RicwizWebviewProvider, indexOverride?: number): Promise<void> {
    const config = vscode.workspace.getConfiguration('ricwiz');
    const queries = config.get<{ name: string, jql: string }[]>('jiraDashboards', []);

    if (indexOverride !== undefined) {
        currentSelectedIndex = indexOverride;
    }

    if (!queries || queries.length === 0) {
        webviewProvider.setDashboardData({ queries: [], selectedIndex: 0, results: [], error: 'No queries defined in settings. Go to Settings > Ricwiz > Jira Dashboards.' });
        webviewProvider.setPage('dashboard');
        return;
    }

    if (currentSelectedIndex >= queries.length) {
        currentSelectedIndex = 0;
    }

    const currentQuery = queries[currentSelectedIndex];

    // Show initial loading state
    webviewProvider.setDashboardData({ queries, selectedIndex: currentSelectedIndex, results: [], error: '⏳ Loading tickets...' });
    webviewProvider.setPage('dashboard');

    try {
        const results = await searchJira(currentQuery.jql);
        
        // Find existing branches for these tickets
        const cwd = vscode.workspace.workspaceFolders?.[0]?.uri.fsPath;
        let localBranches: string[] = [];
        if (cwd) {
            try {
                // Inline exec to get branches quickly
                const cp = require('child_process');
                const util = require('util');
                const exec = util.promisify(cp.exec);
                const { stdout } = await exec('git branch', { cwd });
                localBranches = stdout.split('\n').map((b: string) => b.replace('*', '').trim()).filter((b: string) => b);
            } catch(e) {}
        }
        
        const enrichedResults = results.map((r: any) => {
            const matchingBranch = localBranches.find(b => b.includes(r.key));
            return {
                ...r,
                branch: matchingBranch || null
            };
        });

        webviewProvider.setDashboardData({ queries, selectedIndex: currentSelectedIndex, results: enrichedResults, error: null });
        webviewProvider.setPage('dashboard');
    } catch (e: any) {
        let msg = e.message;
        if (msg.includes('ENOTFOUND') || msg.includes('network')) {
            msg = 'No Internet or Invalid URL';
        }
        webviewProvider.setDashboardData({ queries, selectedIndex: currentSelectedIndex, results: [], error: msg });
        webviewProvider.setPage('dashboard');
    }
}

export async function openJiraDetailsForId(webviewProvider: RicwizWebviewProvider, ticketId: string): Promise<void> {
    await vscode.window.withProgress({
        location: vscode.ProgressLocation.Notification,
        title: `Fetching details for ${ticketId}...`,
        cancellable: false
    }, async () => {
        try {
            const data = await fetchJiraIssue(ticketId);
            if (data) {
                webviewProvider.setJiraData({ ticketId, ...data });
                webviewProvider.setPage('jira');
            } else {
                vscode.window.showErrorMessage(`Ricwiz: No data found for ticket ${ticketId}.`);
            }
        } catch (e: any) {
            vscode.window.showErrorMessage(`Ricwiz Jira Error: ${e.message}`);
        }
    });
}
