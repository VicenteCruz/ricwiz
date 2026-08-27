import * as vscode from 'vscode';
import { generateDestructiveChanges } from './generateDestructiveChanges';
import { runSmartTests } from './runSmartTests';
import { createBranches } from './createBranches';
import { prepareDeploy } from './prepareDeploy';
import { createMergeRequests, createMergeRequestsVSCode } from './mergeRequests';
import { openJiraTicket, openJiraTicketVSCode } from './jira';
import { showJiraDetails } from './showJiraDetails';
import { openJiraDashboard, openJiraDetailsForId } from './openDashboard';
import { changeJiraStatus, addJiraCommentCommand, addJiraLabelCommand, setJiraTokenCommand } from './jiraOperations';
import { setGitlabTokenCommand } from './gitlabOperations';
import { syncAll } from './syncAll';
import { updateBases } from './updateBases';
import { deleteUnusedBranches } from './deleteUnused';
import { checkoutBranch } from './checkoutBranch';
import { copyBranchName } from './copyBranch';
import { generatePackageXml } from './generatePackageXml';
import { deployPackage } from './deployPackage';
import { importData } from './importData';
import { listTicketFiles } from './listTicketFiles';
import { resetTracking } from './resetTracking';
import { extractComponent } from './extractComponent';
import { deployMultiOrg } from './deployMultiOrg';
import { captureAdminChanges } from './captureAdminChanges';
import { openHistory } from './openHistory';
import { searchTicket } from './searchTicket';
import { getBlameData } from './whoToBlame';
import { showPipelineLogs } from './showPipelineLogs';
import { RicwizWebviewProvider } from '../webview';
import { executeConflictAction } from '../conflictResolver';
import { generateCommitMessage } from './aiCommands';

export function registerAllCommands(
    context: vscode.ExtensionContext,
    webviewProvider: RicwizWebviewProvider | undefined,
    forceUpdate: (() => void) | undefined
) {
    context.subscriptions.push(
        vscode.commands.registerCommand('ricwiz.conflictAction', executeConflictAction),
        vscode.commands.registerCommand('ricwiz.generateDestructiveChanges', async () => {
            try { await generateDestructiveChanges(); } finally { vscode.commands.executeCommand('ricwiz.manualRefresh'); }
        }),
        vscode.commands.registerCommand('ricwiz.runSmartTests', async () => {
            try { await runSmartTests(); } finally { vscode.commands.executeCommand('ricwiz.manualRefresh'); }
        }),
        vscode.commands.registerCommand('ricwiz.refreshWebview', () => {
            if (webviewProvider) vscode.commands.executeCommand('workbench.action.webview.reloadWebviewAction');
        }),
        vscode.commands.registerCommand('ricwiz.createBranches', async (ticket?: string) => {
            try { await createBranches(ticket); } finally { vscode.commands.executeCommand('ricwiz.manualRefresh'); }
        }),
        vscode.commands.registerCommand('ricwiz.prepareDeploy', async () => {
            try { await prepareDeploy(); } finally { vscode.commands.executeCommand('ricwiz.manualRefresh'); }
        }),
        vscode.commands.registerCommand('ricwiz.createMergeRequests', async () => {
            try { await createMergeRequests(); } finally { vscode.commands.executeCommand('ricwiz.manualRefresh'); }
        }),
        vscode.commands.registerCommand('ricwiz.createMergeRequestsVSCode', async () => {
            try { await createMergeRequestsVSCode(); } finally { vscode.commands.executeCommand('ricwiz.manualRefresh'); }
        }),
        vscode.commands.registerCommand('ricwiz.openJiraTicket', async () => {
            try { await openJiraTicket(); } finally { vscode.commands.executeCommand('ricwiz.manualRefresh'); }
        }),
        vscode.commands.registerCommand('ricwiz.openJiraTicketVSCode', async () => {
            try { await openJiraTicketVSCode(); } finally { vscode.commands.executeCommand('ricwiz.manualRefresh'); }
        }),
        vscode.commands.registerCommand('ricwiz.showJiraDetails', () => {
            if (webviewProvider) showJiraDetails(webviewProvider);
        }),
        vscode.commands.registerCommand('ricwiz.openJiraDashboard', (indexOverride?: number) => {
            if (webviewProvider) openJiraDashboard(webviewProvider, indexOverride);
        }),
        vscode.commands.registerCommand('ricwiz.openJiraDetailsForId', (ticketId: string) => {
            if (webviewProvider) openJiraDetailsForId(webviewProvider, ticketId);
        }),
        vscode.commands.registerCommand('ricwiz.toggleDashboardBranches', (show: boolean) => {
            if (webviewProvider) {
                webviewProvider.setDashboardShowBranches(show);
                vscode.commands.executeCommand('ricwiz.openJiraDashboard');
            }
        }),
        vscode.commands.registerCommand('ricwiz.changeJiraStatus', async () => {
            try { await changeJiraStatus(); } finally { vscode.commands.executeCommand('ricwiz.manualRefresh'); }
        }),
        vscode.commands.registerCommand('ricwiz.addJiraComment', async () => {
            try { await addJiraCommentCommand(); } finally { vscode.commands.executeCommand('ricwiz.manualRefresh'); }
        }),
        vscode.commands.registerCommand('ricwiz.addJiraLabel', async () => {
            try { await addJiraLabelCommand(); } finally { vscode.commands.executeCommand('ricwiz.manualRefresh'); }
        }),
        vscode.commands.registerCommand('ricwiz.setJiraToken', setJiraTokenCommand),
        vscode.commands.registerCommand('ricwiz.setGitlabToken', setGitlabTokenCommand),
        vscode.commands.registerCommand('ricwiz.syncAll', async () => {
            try { await syncAll(); } finally { vscode.commands.executeCommand('ricwiz.manualRefresh'); }
        }),
        vscode.commands.registerCommand('ricwiz.updateBases', async () => {
            try { await updateBases(); } finally { vscode.commands.executeCommand('ricwiz.manualRefresh'); }
        }),
        vscode.commands.registerCommand('ricwiz.deleteUnusedBranches', async () => {
            try { await deleteUnusedBranches(); } finally { vscode.commands.executeCommand('ricwiz.manualRefresh'); }
        }),
        vscode.commands.registerCommand('ricwiz.checkoutBranch', async (branchName: string) => {
            try { await checkoutBranch(branchName); } finally { vscode.commands.executeCommand('ricwiz.manualRefresh'); }
        }),
        vscode.commands.registerCommand('ricwiz.copyBranchName', async () => {
            try { await copyBranchName(); } finally { vscode.commands.executeCommand('ricwiz.manualRefresh'); }
        }),
        vscode.commands.registerCommand('ricwiz.generatePackageXml', async () => {
            try { await generatePackageXml(); } finally { vscode.commands.executeCommand('ricwiz.manualRefresh'); }
        }),
        vscode.commands.registerCommand('ricwiz.deployPackage', async () => {
            try { await deployPackage(); } finally { vscode.commands.executeCommand('ricwiz.manualRefresh'); }
        }),
        vscode.commands.registerCommand('ricwiz.importData', async () => {
            try { await importData(); } finally { vscode.commands.executeCommand('ricwiz.manualRefresh'); }
        }),
        vscode.commands.registerCommand('ricwiz.listTicketFiles', async () => {
            try { await listTicketFiles(); } finally { vscode.commands.executeCommand('ricwiz.manualRefresh'); }
        }),
        vscode.commands.registerCommand('ricwiz.resetTracking', async () => {
            try { await resetTracking(); } finally { vscode.commands.executeCommand('ricwiz.manualRefresh'); }
        }),
        vscode.commands.registerCommand('ricwiz.extractComponent', async () => {
            try { await extractComponent(); } finally { vscode.commands.executeCommand('ricwiz.manualRefresh'); }
        }),
        vscode.commands.registerCommand('ricwiz.deployMultiOrg', async () => {
            try { await deployMultiOrg(); } finally { vscode.commands.executeCommand('ricwiz.manualRefresh'); }
        }),
        vscode.commands.registerCommand('ricwiz.captureAdminChanges', async () => {
            try { await captureAdminChanges(); } finally { vscode.commands.executeCommand('ricwiz.manualRefresh'); }
        }),
        vscode.commands.registerCommand('ricwiz.openHistory', async () => {
            try { await openHistory(); } finally { vscode.commands.executeCommand('ricwiz.manualRefresh'); }
        }),
        vscode.commands.registerCommand('ricwiz.searchTicket', async () => {
            try { await searchTicket(); } finally { vscode.commands.executeCommand('ricwiz.manualRefresh'); }
        }),
        vscode.commands.registerCommand('ricwiz.whoToBlame', async () => {
            const data = await getBlameData();
            if (data && webviewProvider) {
                webviewProvider.setBlameData(data);
                webviewProvider.setPage('blame');
            }
        }),
        vscode.commands.registerCommand('ricwiz.showPipelineLogs', (projectPath: string, pipelineId: number) => showPipelineLogs(projectPath, pipelineId)),
        vscode.commands.registerCommand('ricwiz.manualRefresh', () => {
            if (forceUpdate) {
                forceUpdate();
            }
        }),
        vscode.commands.registerCommand('ricwiz.toggleAutoRefresh', () => {
            if (webviewProvider) {
                const newState = !webviewProvider.isAutoRefreshEnabled();
                webviewProvider.setAutoRefresh(newState);
                vscode.workspace.getConfiguration('ricwiz').update('autoRefresh', newState, vscode.ConfigurationTarget.Global);
            }
        }),
        vscode.commands.registerCommand('ricwiz.openSettings', () => {
            vscode.commands.executeCommand('workbench.action.openSettings', 'ricwiz');
        }),
        vscode.commands.registerCommand('ricwiz.generateCommitMessage', async () => {
            await generateCommitMessage();
        })
    );
}
