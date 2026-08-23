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
import { RicwizWebviewProvider } from '../webview';

export function registerAllCommands(
    context: vscode.ExtensionContext,
    webviewProvider: RicwizWebviewProvider | undefined,
    forceUpdate: (() => void) | undefined
) {
    context.subscriptions.push(
        vscode.commands.registerCommand('ricwiz.generateDestructiveChanges', generateDestructiveChanges),
        vscode.commands.registerCommand('ricwiz.runSmartTests', runSmartTests),
        vscode.commands.registerCommand('ricwiz.refreshWebview', () => { if (webviewProvider) vscode.commands.executeCommand('workbench.action.webview.reloadWebviewAction'); }),
        vscode.commands.registerCommand('ricwiz.createBranches', createBranches),
        vscode.commands.registerCommand('ricwiz.prepareDeploy', prepareDeploy),
        vscode.commands.registerCommand('ricwiz.createMergeRequests', createMergeRequests),
        vscode.commands.registerCommand('ricwiz.createMergeRequestsVSCode', createMergeRequestsVSCode),
        vscode.commands.registerCommand('ricwiz.openJiraTicket', openJiraTicket),
        vscode.commands.registerCommand('ricwiz.openJiraTicketVSCode', openJiraTicketVSCode),
        vscode.commands.registerCommand('ricwiz.showJiraDetails', () => { if (webviewProvider) showJiraDetails(webviewProvider); }),
        vscode.commands.registerCommand('ricwiz.openJiraDashboard', (indexOverride?: number) => { if (webviewProvider) openJiraDashboard(webviewProvider, indexOverride); }),
        vscode.commands.registerCommand('ricwiz.openJiraDetailsForId', (ticketId: string) => { if (webviewProvider) openJiraDetailsForId(webviewProvider, ticketId); }),
        vscode.commands.registerCommand('ricwiz.changeJiraStatus', changeJiraStatus),
        vscode.commands.registerCommand('ricwiz.addJiraComment', addJiraCommentCommand),
        vscode.commands.registerCommand('ricwiz.addJiraLabel', addJiraLabelCommand),
        vscode.commands.registerCommand('ricwiz.setJiraToken', setJiraTokenCommand),
        vscode.commands.registerCommand('ricwiz.setGitlabToken', setGitlabTokenCommand),
        vscode.commands.registerCommand('ricwiz.syncAll', syncAll),
        vscode.commands.registerCommand('ricwiz.updateBases', updateBases),
        vscode.commands.registerCommand('ricwiz.deleteUnusedBranches', deleteUnusedBranches),
        vscode.commands.registerCommand('ricwiz.checkoutBranch', checkoutBranch),
        vscode.commands.registerCommand('ricwiz.copyBranchName', copyBranchName),
        vscode.commands.registerCommand('ricwiz.generatePackageXml', generatePackageXml),
        vscode.commands.registerCommand('ricwiz.deployPackage', deployPackage),
        vscode.commands.registerCommand('ricwiz.importData', importData),
        vscode.commands.registerCommand('ricwiz.listTicketFiles', listTicketFiles),
        vscode.commands.registerCommand('ricwiz.resetTracking', resetTracking),
        vscode.commands.registerCommand('ricwiz.extractComponent', extractComponent),
        vscode.commands.registerCommand('ricwiz.deployMultiOrg', deployMultiOrg),
        vscode.commands.registerCommand('ricwiz.captureAdminChanges', captureAdminChanges),
        vscode.commands.registerCommand('ricwiz.openHistory', openHistory),
        vscode.commands.registerCommand('ricwiz.searchTicket', searchTicket),
        vscode.commands.registerCommand('ricwiz.whoToBlame', async () => {
            const data = await getBlameData();
            if (data && webviewProvider) {
                webviewProvider.setBlameData(data);
                webviewProvider.setPage('blame');
            }
        }),
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
