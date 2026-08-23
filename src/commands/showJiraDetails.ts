import * as vscode from 'vscode';
import { getWorkspaceCwd, getCurrentBranch } from '../git';
import { WorkflowContext } from '../workflows/WorkflowContext';
import { fetchJiraIssue } from '../jiraApi';
import { RicwizWebviewProvider } from '../webview';

export async function showJiraDetails(webviewProvider: RicwizWebviewProvider): Promise<void> {
    const cwd = getWorkspaceCwd();
    if (!cwd) return;

    try {
        const ctx = await WorkflowContext.initialize(cwd);
        if (!ctx) return;

        const currentBranch = await getCurrentBranch(cwd);
        const ticketId = currentBranch.split('-to-')[0];

        if (!ticketId) {
            vscode.window.showErrorMessage('Ricwiz: You are not currently on a valid ticket branch.');
            return;
        }

        await vscode.window.withProgress({
            location: vscode.ProgressLocation.Notification,
            title: `Fetching details for ${ticketId}...`,
            cancellable: false
        }, async (progress) => {
            const data = await fetchJiraIssue(ticketId);
            if (data) {
                // Pass the data to the webview and switch the page
                webviewProvider.setJiraData({ ticketId, ...data });
                webviewProvider.setPage('jira');
            } else {
                vscode.window.showErrorMessage('Ricwiz: No data found for this ticket.');
            }
        });
    } catch (e: any) {
        if (e.message.includes('securely configured')) {
            const action = await vscode.window.showErrorMessage(e.message, 'Set Token Now');
            if (action === 'Set Token Now') {
                vscode.commands.executeCommand('ricwiz.setJiraToken');
            }
        } else {
            vscode.window.showErrorMessage(`Ricwiz Jira Error: ${e.message}`);
        }
    }
}
