import * as vscode from 'vscode';
import {
    CommitEntry,
    RelatedBranch,
    BlameData,
    ConflictState,
    JiraDashboardData,
    JiraDetailsData
} from './types';
import { renderConflictView } from './webview/views/conflictView';
import { renderBlameView } from './webview/views/blameView';
import { renderJiraView } from './webview/views/jiraView';
import { renderDashboardView } from './webview/views/dashboardView';
import { renderDevtoolsView } from './webview/views/devtoolsView';
import { renderMainView } from './webview/views/mainView';

export class RicwizWebviewProvider implements vscode.WebviewViewProvider {
    private webviewView?: vscode.WebviewView;

    private currentBranchCache = '';
    private currentBranchIsMergedCache = false;
    private relatedBranchesCache: RelatedBranch[] = [];
    private commitsCache: CommitEntry[] = [];
    private baseBranchesCache: string[] = [];
    private recentTicketsCache: string[] = [];
    private ticketTitleCache = '';
    private ticketStatusCache = '';
    private currentPage: 'main' | 'devtools' | 'blame' | 'jira' | 'dashboard' = 'main';
    private blameDataCache: BlameData | null = null;
    private jiraDataCache: JiraDetailsData | null = null;
    private dashboardDataCache: JiraDashboardData | null = null;
    private dashboardShowBranches: boolean = false;
    private autoRefreshEnabled: boolean = true;
    private conflictState: ConflictState | null = null;

    constructor(private readonly _extensionUri: vscode.Uri) { }

    resolveWebviewView(
        webviewView: vscode.WebviewView,
        _context: vscode.WebviewViewResolveContext,
        _token: vscode.CancellationToken,
    ) {
        this.webviewView = webviewView;
        webviewView.webview.options = {
            enableScripts: true,
            localResourceRoots: [this._extensionUri]
        };
        this.updateView();

        webviewView.webview.onDidReceiveMessage(data => {
            switch (data.command) {
                case 'createBranches':
                    vscode.commands.executeCommand('ricwiz.createBranches');
                    break;
                case 'createBranchForTicket':
                    vscode.commands.executeCommand('ricwiz.createBranches', data.args);
                    break;
                case 'prepareDeploy':
                    vscode.commands.executeCommand('ricwiz.prepareDeploy');
                    break;
                case 'openMRs':
                    vscode.commands.executeCommand('ricwiz.createMergeRequests');
                    break;
                case 'openMRsVSCode':
                    vscode.commands.executeCommand('ricwiz.createMergeRequestsVSCode');
                    break;
                case 'openExternal':
                    if (data.args) {
                        vscode.env.openExternal(vscode.Uri.parse(data.args));
                    }
                    break;
                case 'openJira':
                    vscode.commands.executeCommand('ricwiz.openJiraTicket');
                    break;
                case 'showJiraDetails':
                    vscode.commands.executeCommand('ricwiz.showJiraDetails');
                    break;
                case 'showPipelineLogs':
                    vscode.commands.executeCommand('ricwiz.showPipelineLogs', data.args.projectPath, data.args.pipelineId);
                    break;
                case 'changeJiraStatus':
                    vscode.commands.executeCommand('ricwiz.changeJiraStatus');
                    break;
                case 'addJiraComment':
                    vscode.commands.executeCommand('ricwiz.addJiraComment');
                    break;
                case 'addJiraLabel':
                    vscode.commands.executeCommand('ricwiz.addJiraLabel');
                    break;
                case 'setPage':
                    this.setPage(data.args);
                    break;
                case 'openDashboard':
                    vscode.commands.executeCommand('ricwiz.openJiraDashboard');
                    break;
                case 'openJiraDetailsForId':
                    vscode.commands.executeCommand('ricwiz.openJiraDetailsForId', data.args);
                    break;
                case 'refreshDashboard':
                    vscode.commands.executeCommand('ricwiz.openJiraDashboard');
                    break;
                case 'switchDashboardQuery':
                    vscode.commands.executeCommand('ricwiz.openJiraDashboard', parseInt(data.args, 10));
                    break;
                case 'toggleDashboardBranches':
                    vscode.commands.executeCommand('ricwiz.toggleDashboardBranches', data.args);
                    break;
                case 'openJiraVSCode':
                    vscode.commands.executeCommand('ricwiz.openJiraTicketVSCode');
                    break;
                case 'openSettings':
                    vscode.commands.executeCommand('ricwiz.openSettings');
                    break;
                case 'checkout':
                    const branchName = data.branch || data.args;
                    if (branchName) {
                        vscode.commands.executeCommand('ricwiz.checkoutBranch', branchName);
                    }
                    break;
                case 'copyBranch':
                    vscode.commands.executeCommand('ricwiz.copyBranchName');
                    break;
                case 'generatePackageXml':
                    vscode.commands.executeCommand('ricwiz.generatePackageXml');
                    break;
                case 'openDevTools':
                    this.setPage('devtools');
                    break;
                case 'openMain':
                    this.setPage('main');
                    break;
                case 'generateDestructiveChanges':
                    vscode.commands.executeCommand('ricwiz.generateDestructiveChanges');
                    break;
                case 'deployPackage':
                    vscode.commands.executeCommand('ricwiz.deployPackage');
                    break;
                case 'runSmartTests':
                    vscode.commands.executeCommand('ricwiz.runSmartTests');
                    break;
                case 'importData':
                    vscode.commands.executeCommand('ricwiz.importData');
                    break;
                case 'listTicketFiles':
                    vscode.commands.executeCommand('ricwiz.listTicketFiles');
                    break;
                case 'resetTracking':
                    vscode.commands.executeCommand('ricwiz.resetTracking');
                    break;
                case 'extractComponent':
                    vscode.commands.executeCommand('ricwiz.extractComponent');
                    break;
                case 'deployMultiOrg':
                    vscode.commands.executeCommand('ricwiz.deployMultiOrg');
                    break;
                case 'captureAdminChanges':
                    vscode.commands.executeCommand('ricwiz.captureAdminChanges');
                    break;
                case 'whoToBlame':
                    vscode.commands.executeCommand('ricwiz.whoToBlame');
                    break;
                case 'syncAll':
                    vscode.commands.executeCommand('ricwiz.syncAll');
                    break;
                case 'updateBases':
                    vscode.commands.executeCommand('ricwiz.updateBases');
                    break;
                case 'deleteUnused':
                    vscode.commands.executeCommand('ricwiz.deleteUnusedBranches');
                    break;
                case 'conflict_commitAndContinue':
                    vscode.commands.executeCommand('ricwiz.conflictAction', 'commitAndContinue');
                    break;
                case 'conflict_resolveDeletions':
                    vscode.commands.executeCommand('ricwiz.conflictAction', 'resolveDeletions');
                    break;
                case 'conflict_abortDeploy':
                    vscode.commands.executeCommand('ricwiz.conflictAction', 'abortDeploy');
                    break;
                case 'openFile':
                    if (data.file) {
                        const workspaceFolders = vscode.workspace.workspaceFolders;
                        if (workspaceFolders) {
                            const uri = vscode.Uri.joinPath(workspaceFolders[0].uri, data.file);
                            vscode.commands.executeCommand('vscode.open', uri);
                        }
                    }
                    break;
                case 'searchTicket':
                    vscode.commands.executeCommand('ricwiz.searchTicket');
                    break;
                case 'manualRefresh':
                    vscode.commands.executeCommand('ricwiz.manualRefresh');
                    break;
                case 'toggleAutoRefresh':
                    vscode.commands.executeCommand('ricwiz.toggleAutoRefresh');
                    break;
                case 'openHistory':
                    vscode.commands.executeCommand('ricwiz.openHistory');
                    break;
            }
        });
    }

    public setConflictState(state: ConflictState | null) {
        this.conflictState = state;
        this.updateView();
    }

    public updateBranch(
        branchName: string,
        isMerged: boolean,
        relatedBranches: RelatedBranch[] = [],
        commits: CommitEntry[] = [],
        baseBranches: string[] = [],
        recentTickets: string[] = [],
        ticketTitle: string = '',
        ticketStatus: string = ''
    ) {
        this.currentBranchCache = branchName;
        this.currentBranchIsMergedCache = isMerged;
        this.relatedBranchesCache = relatedBranches;
        this.commitsCache = commits;
        this.baseBranchesCache = baseBranches;
        this.recentTicketsCache = recentTickets;
        this.ticketTitleCache = ticketTitle;
        this.ticketStatusCache = ticketStatus;
        if (!this.webviewView) return;
        this.updateView();
    }

    public setDashboardShowBranches(show: boolean) {
        this.dashboardShowBranches = show;
    }

    public getDashboardShowBranches(): boolean {
        return this.dashboardShowBranches;
    }

    public setBlameData(data: BlameData | null) {
        this.blameDataCache = data;
    }

    public setJiraData(data: JiraDetailsData | null) {
        this.jiraDataCache = data;
    }

    public setDashboardData(data: JiraDashboardData | null) {
        this.dashboardDataCache = data;
    }

    /** Updates the auto-refresh toggle state and refreshes the view */
    public setAutoRefresh(enabled: boolean) {
        this.autoRefreshEnabled = enabled;
        this.updateView();
    }

    /** Returns whether auto-refresh is currently enabled */
    public isAutoRefreshEnabled(): boolean {
        return this.autoRefreshEnabled;
    }

    public setPage(page: 'main' | 'devtools' | 'blame' | 'jira' | 'dashboard') {
        this.currentPage = page;
        this.updateView();
    }

    private updateView() {
        if (!this.webviewView) return;
        const logoUri = this.webviewView.webview.asWebviewUri(
            vscode.Uri.joinPath(this._extensionUri, 'resources', 'logo.png')
        );

        if (this.conflictState) {
            this.webviewView.webview.html = renderConflictView(logoUri, this.conflictState);
            return;
        }

        switch (this.currentPage) {
            case 'blame':
                this.webviewView.webview.html = renderBlameView(this.blameDataCache);
                break;
            case 'jira':
                this.webviewView.webview.html = renderJiraView(this.jiraDataCache);
                break;
            case 'dashboard':
                this.webviewView.webview.html = renderDashboardView({
                    data: this.dashboardDataCache,
                    showBranches: this.dashboardShowBranches
                });
                break;
            case 'devtools':
                this.webviewView.webview.html = renderDevtoolsView();
                break;
            case 'main':
            default:
                this.webviewView.webview.html = renderMainView({
                    logoUri,
                    currentBranch: this.currentBranchCache,
                    currentBranchIsMerged: this.currentBranchIsMergedCache,
                    relatedBranches: this.relatedBranchesCache,
                    commits: this.commitsCache,
                    baseBranches: this.baseBranchesCache,
                    recentTickets: this.recentTicketsCache,
                    ticketTitle: this.ticketTitleCache,
                    ticketStatus: this.ticketStatusCache,
                    autoRefreshEnabled: this.autoRefreshEnabled
                });
                break;
        }
    }
}
