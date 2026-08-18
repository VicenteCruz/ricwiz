import * as vscode from 'vscode';
import { getWorkspaceCwd, promptForTicketId } from '../git';

async function doOpenJiraTicket(openInVSCode: boolean = false): Promise<void> {
    const cwd = getWorkspaceCwd();
    if (!cwd) return;

    const config = vscode.workspace.getConfiguration('ricwiz');
    const jiraUrl = config.get<string>('jiraUrl', '');

    if (!jiraUrl || jiraUrl.trim() === '') {
        vscode.window.showErrorMessage('Ricwiz: Jira URL is not configured. Please set it in the extension settings (e.g., https://jira.company.com/browse/).');
        return;
    }

    const result = await promptForTicketId(cwd, {
        prompt: 'Enter the full Jira ticket ID (e.g., SFPSCA-1234) or just the number',
        handleToSuffix: true
    });
    if (!result) return;
    const { ticketId } = result;

    let url = jiraUrl.trim();
    if (!url.endsWith('/')) {
        url += '/';
    }
    url += ticketId;

    if (openInVSCode) {
        vscode.commands.executeCommand('simpleBrowser.show', url);
    } else {
        vscode.env.openExternal(vscode.Uri.parse(url));
    }
    vscode.window.showInformationMessage(`Ricwiz: Opening Jira Ticket ${ticketId} in ${openInVSCode ? 'VS Code' : 'browser'}!`);
}

export async function openJiraTicket(): Promise<void> {
    return doOpenJiraTicket(false);
}

export async function openJiraTicketVSCode(): Promise<void> {
    return doOpenJiraTicket(true);
}
