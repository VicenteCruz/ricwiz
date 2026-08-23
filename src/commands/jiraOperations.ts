import * as vscode from 'vscode';
import { getWorkspaceCwd, getCurrentBranch } from '../git';
import { WorkflowContext } from '../workflows/WorkflowContext';
import { fetchJiraTransitions, transitionJiraIssue, addJiraComment, addJiraLabel } from '../jiraApi';

async function getTicketId(): Promise<string | undefined> {
    const cwd = getWorkspaceCwd();
    if (!cwd) return;
    const ctx = await WorkflowContext.initialize(cwd, { forcePrompt: false });
    if (!ctx) return;
    const currentBranch = await getCurrentBranch(cwd);
    return currentBranch.split('-to-')[0];
}

export async function changeJiraStatus(): Promise<void> {
    try {
        const ticketId = await getTicketId();
        if (!ticketId) {
            vscode.window.showErrorMessage('Ricwiz: You are not on a valid ticket branch.');
            return;
        }

        const transitions = await vscode.window.withProgress({
            location: vscode.ProgressLocation.Notification,
            title: `Fetching available status for ${ticketId}...`,
            cancellable: false
        }, () => fetchJiraTransitions(ticketId));

        if (!transitions || transitions.length === 0) {
            vscode.window.showInformationMessage(`Ricwiz: No transitions available for ${ticketId}.`);
            return;
        }

        const items = transitions.map(t => ({ label: t.name, id: t.id }));
        const selected = await vscode.window.showQuickPick(items, {
            placeHolder: `Select new status for ${ticketId}`,
            ignoreFocusOut: true
        });

        if (selected) {
            await vscode.window.withProgress({
                location: vscode.ProgressLocation.Notification,
                title: `Updating status to ${selected.label}...`,
                cancellable: false
            }, () => transitionJiraIssue(ticketId, selected.id));
            vscode.window.showInformationMessage(`Ricwiz: Status for ${ticketId} updated to ${selected.label}.`);
        }
    } catch (e: any) {
        vscode.window.showErrorMessage(`Ricwiz Jira Error: ${e.message}`);
    }
}

export async function addJiraCommentCommand(): Promise<void> {
    try {
        const ticketId = await getTicketId();
        if (!ticketId) {
            vscode.window.showErrorMessage('Ricwiz: You are not on a valid ticket branch.');
            return;
        }

        const comment = await vscode.window.showInputBox({
            prompt: `Add comment to ${ticketId}`,
            placeHolder: 'Type your comment here...',
            ignoreFocusOut: true
        });

        if (comment) {
            await vscode.window.withProgress({
                location: vscode.ProgressLocation.Notification,
                title: `Adding comment to ${ticketId}...`,
                cancellable: false
            }, () => addJiraComment(ticketId, comment));
            vscode.window.showInformationMessage(`Ricwiz: Comment added to ${ticketId}.`);
        }
    } catch (e: any) {
        vscode.window.showErrorMessage(`Ricwiz Jira Error: ${e.message}`);
    }
}

export async function addJiraLabelCommand(): Promise<void> {
    try {
        const ticketId = await getTicketId();
        if (!ticketId) {
            vscode.window.showErrorMessage('Ricwiz: You are not on a valid ticket branch.');
            return;
        }

        const label = await vscode.window.showInputBox({
            prompt: `Add a label to ${ticketId}`,
            placeHolder: 'e.g. Needs-Review, Bug, High-Priority',
            ignoreFocusOut: true
        });

        if (label && label.trim()) {
            await vscode.window.withProgress({
                location: vscode.ProgressLocation.Notification,
                title: `Adding label to ${ticketId}...`,
                cancellable: false
            }, () => addJiraLabel(ticketId, label.trim()));
            vscode.window.showInformationMessage(`Ricwiz: Label '${label.trim()}' added to ${ticketId}.`);
        }
    } catch (e: any) {
        vscode.window.showErrorMessage(`Ricwiz Jira Error: ${e.message}`);
    }
}
