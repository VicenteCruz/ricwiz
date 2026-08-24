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

export function registerAllCommands(
    context: vscode.ExtensionContext,
    webviewProvider: RicwizWebviewProvider | undefined,
    forceUpdate: (() => void) | undefined
) {
    context.subscriptions.push(
        vscode.commands.registerCommand('ricwiz.generateDestructiveChanges', async (...args) => { try { await generateDestructiveChanges(...args); } finally { vscode.commands.executeCommand('ricwiz.manualRefresh'); } }),
        vscode.commands.registerCommand('ricwiz.runSmartTests', async (...args) => { try { await runSmartTests(...args); } finally { vscode.commands.executeCommand('ricwiz.manualRefresh'); } }),
        vscode.commands.registerCommand('ricwiz.refreshWebview', () => { if (webviewProvider) vscode.commands.executeCommand('workbench.action.webview.reloadWebviewAction'); }),
        vscode.commands.registerCommand('ricwiz.createBranches', async (...args) => { try { await createBranches(...args); } finally { vscode.commands.executeCommand('ricwiz.manualRefresh'); } }),
        vscode.commands.registerCommand('ricwiz.prepareDeploy', async (...args) => { try { await prepareDeploy(...args); } finally { vscode.commands.executeCommand('ricwiz.manualRefresh'); } }),
        vscode.commands.registerCommand('ricwiz.createMergeRequests', async (...args) => { try { await createMergeRequests(...args); } finally { vscode.commands.executeCommand('ricwiz.manualRefresh'); } }),
        vscode.commands.registerCommand('ricwiz.createMergeRequestsVSCode', async (...args) => { try { await createMergeRequestsVSCode(...args); } finally { vscode.commands.executeCommand('ricwiz.manualRefresh'); } }),
        vscode.commands.registerCommand('ricwiz.openJiraTicket', async (...args) => { try { await openJiraTicket(...args); } finally { vscode.commands.executeCommand('ricwiz.manualRefresh'); } }),
        vscode.commands.registerCommand('ricwiz.openJiraTicketVSCode', async (...args) => { try { await openJiraTicketVSCode(...args); } finally { vscode.commands.executeCommand('ricwiz.manualRefresh'); } }),
        vscode.commands.registerCommand('ricwiz.showJiraDetails', () => { if (webviewProvider) showJiraDetails(webviewProvider); }),
        vscode.commands.registerCommand('ricwiz.openJiraDashboard', (indexOverride?: number) => { if (webviewProvider) openJiraDashboard(webviewProvider, indexOverride); }),
        vscode.commands.registerCommand('ricwiz.openJiraDetailsForId', (ticketId: string) => { if (webviewProvider) openJiraDetailsForId(webviewProvider, ticketId); }),
        vscode.commands.registerCommand('ricwiz.toggleDashboardBranches', (show: boolean) => {
            if (webviewProvider) {
                webviewProvider.setDashboardShowBranches(show);
                vscode.commands.executeCommand('ricwiz.openJiraDashboard');
            }
        }),
        vscode.commands.registerCommand('ricwiz.changeJiraStatus', async (...args) => { try { await changeJiraStatus(...args); } finally { vscode.commands.executeCommand('ricwiz.manualRefresh'); } }),
        vscode.commands.registerCommand('ricwiz.addJiraComment', async (...args) => { try { await addJiraCommentCommand(...args); } finally { vscode.commands.executeCommand('ricwiz.manualRefresh'); } }),
        vscode.commands.registerCommand('ricwiz.addJiraLabel', async (...args) => { try { await addJiraLabelCommand(...args); } finally { vscode.commands.executeCommand('ricwiz.manualRefresh'); } }),
        vscode.commands.registerCommand('ricwiz.setJiraToken', setJiraTokenCommand),
        vscode.commands.registerCommand('ricwiz.setGitlabToken', setGitlabTokenCommand),
        vscode.commands.registerCommand('ricwiz.syncAll', async (...args) => { try { await syncAll(...args); } finally { vscode.commands.executeCommand('ricwiz.manualRefresh'); } }),
        vscode.commands.registerCommand('ricwiz.updateBases', async (...args) => { try { await updateBases(...args); } finally { vscode.commands.executeCommand('ricwiz.manualRefresh'); } }),
        vscode.commands.registerCommand('ricwiz.deleteUnusedBranches', async (...args) => { try { await deleteUnusedBranches(...args); } finally { vscode.commands.executeCommand('ricwiz.manualRefresh'); } }),
        vscode.commands.registerCommand('ricwiz.checkoutBranch', async (...args) => { try { await checkoutBranch(...args); } finally { vscode.commands.executeCommand('ricwiz.manualRefresh'); } }),
        vscode.commands.registerCommand('ricwiz.copyBranchName', async (...args) => { try { await copyBranchName(...args); } finally { vscode.commands.executeCommand('ricwiz.manualRefresh'); } }),
        vscode.commands.registerCommand('ricwiz.generatePackageXml', async (...args) => { try { await generatePackageXml(...args); } finally { vscode.commands.executeCommand('ricwiz.manualRefresh'); } }),
        vscode.commands.registerCommand('ricwiz.deployPackage', async (...args) => { try { await deployPackage(...args); } finally { vscode.commands.executeCommand('ricwiz.manualRefresh'); } }),
        vscode.commands.registerCommand('ricwiz.importData', async (...args) => { try { await importData(...args); } finally { vscode.commands.executeCommand('ricwiz.manualRefresh'); } }),
        vscode.commands.registerCommand('ricwiz.listTicketFiles', async (...args) => { try { await listTicketFiles(...args); } finally { vscode.commands.executeCommand('ricwiz.manualRefresh'); } }),
        vscode.commands.registerCommand('ricwiz.resetTracking', async (...args) => { try { await resetTracking(...args); } finally { vscode.commands.executeCommand('ricwiz.manualRefresh'); } }),
        vscode.commands.registerCommand('ricwiz.extractComponent', async (...args) => { try { await extractComponent(...args); } finally { vscode.commands.executeCommand('ricwiz.manualRefresh'); } }),
        vscode.commands.registerCommand('ricwiz.deployMultiOrg', async (...args) => { try { await deployMultiOrg(...args); } finally { vscode.commands.executeCommand('ricwiz.manualRefresh'); } }),
        vscode.commands.registerCommand('ricwiz.captureAdminChanges', async (...args) => { try { await captureAdminChanges(...args); } finally { vscode.commands.executeCommand('ricwiz.manualRefresh'); } }),
        vscode.commands.registerCommand('ricwiz.openHistory', async (...args) => { try { await openHistory(...args); } finally { vscode.commands.executeCommand('ricwiz.manualRefresh'); } }),
        vscode.commands.registerCommand('ricwiz.searchTicket', async (...args) => { try { await searchTicket(...args); } finally { vscode.commands.executeCommand('ricwiz.manualRefresh'); } }),
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
        })
    );
}
