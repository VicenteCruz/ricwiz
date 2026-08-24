import * as vscode from 'vscode';
import { CommitEntry } from './types';

function escapeHtml(text: string): string {
    return text
        .replace(/&/g, '&amp;')
        .replace(/</g, '&lt;')
        .replace(/>/g, '&gt;')
        .replace(/"/g, '&quot;')
        .replace(/'/g, '&#39;');
}

export class RicwizWebviewProvider implements vscode.WebviewViewProvider {
    private webviewView?: vscode.WebviewView;

    constructor(private readonly _extensionUri: vscode.Uri) { }

    resolveWebviewView(
        webviewView: vscode.WebviewView,
        context: vscode.WebviewViewResolveContext,
        _token: vscode.CancellationToken,
    ) {
        this.webviewView = webviewView;
        webviewView.webview.options = {
            enableScripts: true,
            localResourceRoots: [this._extensionUri]
        };

        this.updateBranch('', false);

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
                    vscode.commands.executeCommand('ricwiz.openJiraDashboard', parseInt(data.args));
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
                    if (data.branch) {
                        vscode.commands.executeCommand('ricwiz.checkoutBranch', data.branch);
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
                    // Need to dynamically require/import or execute it. We'll execute a command that calls a method on webviewProvider, or we can just import getBlameData here.
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

    private conflictState: { isConflict: boolean, sourceStr: string, targetStr: string, deletionsCount: number, files?: { file: string, state: string }[] } | null = null;

    public setConflictState(state: { isConflict: boolean, sourceStr: string, targetStr: string, deletionsCount: number, files?: { file: string, state: string }[] } | null) {
        this.conflictState = state;
        this.updateView();
    }

    public updateBranch(branchName: string, isMerged: boolean, relatedBranches: { name: string, isMerged: boolean, pipelineStatus?: string, mrUrl?: string }[] = [], commits: CommitEntry[] = [], baseBranches: string[] = [], recentTickets: string[] = [], ticketTitle: string = '', ticketStatus: string = '') {
        if (!this.webviewView) return;
        this.currentBranchCache = branchName;
        this.currentBranchIsMergedCache = isMerged;
        this.relatedBranchesCache = relatedBranches;
        this.commitsCache = commits;
        this.baseBranchesCache = baseBranches;
        this.recentTicketsCache = recentTickets;
        this.ticketTitleCache = ticketTitle;
        this.ticketStatusCache = ticketStatus;
        this.updateView();
    }

    private currentBranchCache = '';
    private currentBranchIsMergedCache = false;
    private relatedBranchesCache: { name: string, isMerged: boolean, pipelineStatus?: string, mrUrl?: string }[] = [];
    private commitsCache: CommitEntry[] = [];
    private baseBranchesCache: string[] = [];
    private recentTicketsCache: string[] = [];
    private ticketTitleCache = '';
    private ticketStatusCache = '';
    private currentPage: 'main' | 'devtools' | 'blame' | 'jira' | 'dashboard' = 'main';
    private blameDataCache: any = null;
    private jiraDataCache: any = null;
    private dashboardDataCache: any = null;
    private dashboardShowBranches: boolean = false;
    private autoRefreshEnabled: boolean = true;

    public setDashboardShowBranches(show: boolean) {
        this.dashboardShowBranches = show;
    }

    public getDashboardShowBranches(): boolean {
        return this.dashboardShowBranches;
    }

    public setBlameData(data: any) {
        this.blameDataCache = data;
    }

    public setJiraData(data: any) {
        this.jiraDataCache = data;
    }

    public setDashboardData(data: any) {
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
        this.webviewView.webview.html = this._getHtmlForWebview(logoUri, this.currentBranchCache, this.relatedBranchesCache, this.commitsCache, this.baseBranchesCache, this.recentTicketsCache, this.currentPage);
    }

    private _getHtmlForWebview(logoUri: vscode.Uri, currentBranch: string, relatedBranches: { name: string, isMerged: boolean, pipelineStatus?: string, mrUrl?: string }[], commits: CommitEntry[], baseBranches: string[], recentTickets: string[], currentPage: 'main' | 'devtools' | 'blame' | 'jira' | 'dashboard') {
        const commitsHtml = commits.length > 0 ? `
            <div class="separator"></div>
            <div style="padding: 0 4px;">
                <div style="font-size: 11px; opacity: 0.7; margin-bottom: 6px; display: flex; align-items: center; gap: 4px;">
                    <span>📜</span> Recent Commits
                </div>
                <div style="display: flex; flex-direction: column; gap: 2px;">
                    ${commits.map(c => `
                        <div style="font-size: 11px; padding: 3px 4px; border-radius: 2px; display: flex; gap: 6px; align-items: baseline;">
                            <code style="color: var(--vscode-textLink-foreground); font-size: 10px; flex-shrink: 0;">${escapeHtml(c.hash)}</code>
                            <span style="flex: 1; overflow: hidden; text-overflow: ellipsis; white-space: nowrap;" title="${escapeHtml(c.message)}">${escapeHtml(c.message)}</span>
                            <span style="font-size: 9px; opacity: 0.5; flex-shrink: 0;">${escapeHtml(c.timeAgo)}</span>
                        </div>
                    `).join('')}
                </div>
            </div>
        ` : '';

        const styleHtml = `
            <style>
                body {
                    padding: 10px 8px;
                    display: flex;
                    flex-direction: column;
                    gap: 4px;
                    font-family: var(--vscode-font-family);
                    color: var(--vscode-foreground);
                }
                .btn {
                    display: flex;
                    align-items: center;
                    gap: 8px;
                    background: transparent;
                    color: var(--vscode-foreground);
                    border: 1px solid transparent;
                    padding: 6px 8px;
                    cursor: pointer;
                    font-size: 13px;
                    border-radius: 3px;
                    text-align: left;
                    width: 100%;
                    outline: none;
                }
                .btn:hover {
                    background-color: var(--vscode-list-hoverBackground);
                }
                .btn:focus {
                    border-color: var(--vscode-focusBorder);
                }
                .icon {
                    font-size: 14px;
                    opacity: 0.8;
                }
                .separator {
                    height: 1px;
                    background-color: var(--vscode-panel-border);
                    margin: 8px 4px;
                }
                .copy-btn {
                    background: transparent;
                    border: none;
                    color: var(--vscode-foreground);
                    cursor: pointer;
                    font-size: 12px;
                    opacity: 0.6;
                    padding: 2px 4px;
                    border-radius: 3px;
                }
                .copy-btn:hover {
                    opacity: 1;
                    background-color: var(--vscode-list-hoverBackground);
                }
                .icon-button {
                    background: transparent;
                    border: none;
                    cursor: pointer;
                    color: var(--vscode-foreground);
                    padding: 4px;
                    border-radius: 4px;
                    display: inline-flex;
                    align-items: center;
                    justify-content: center;
                }
                .icon-button:hover {
                    background: var(--vscode-list-hoverBackground);
                }
            </style>
        `;

        if (this.conflictState) {
            const filesHtml = (this.conflictState.files || []).map(f => `
                <button class="btn" style="padding: 6px; font-size: 12px; display: flex; justify-content: space-between; align-items: center;" onclick="sendOpenFileCommand('${escapeHtml(f.file)}')">
                    <span style="flex: 1; overflow: hidden; text-overflow: ellipsis; white-space: nowrap; direction: rtl; text-align: left;">&lrm;${escapeHtml(f.file)}</span>
                    <span style="font-size: 10px; opacity: 0.8; flex-shrink: 0; background-color: var(--vscode-badge-background); color: var(--vscode-badge-foreground); padding: 2px 4px; border-radius: 2px;">${escapeHtml(f.state)}</span>
                </button>
            `).join('');

            return `<!DOCTYPE html>
            <html lang="en">
            <head>
                <meta charset="UTF-8">
                <meta name="viewport" content="width=device-width, initial-scale=1.0">
                <title>Ricwiz Conflict</title>
                ${styleHtml}
            </head>
            <body>
                <div style="text-align: center; margin-bottom: 12px; margin-top: 8px;">
                    <img src="${logoUri}" alt="Ricwiz Logo" style="width: 80px; height: 80px; opacity: 0.9;" />
                </div>
                <div style="background-color: var(--vscode-editorError-background); color: var(--vscode-editorError-foreground); padding: 12px; border-radius: 4px; margin-bottom: 12px; text-align: center;">
                    <div style="font-size: 14px; font-weight: bold; margin-bottom: 8px;">⚠️ MERGE CONFLICT</div>
                    <div style="font-size: 11px; margin-bottom: 12px; opacity: 0.9;">
                        Merging <b>${escapeHtml(this.conflictState.sourceStr)}</b> into <b>${escapeHtml(this.conflictState.targetStr)}</b>.<br/>
                        Resolve the conflicts, then click below.
                    </div>
                    <div style="display: flex; flex-direction: column; gap: 6px;">
                        <button class="btn" style="background-color: var(--vscode-button-background); color: var(--vscode-button-foreground); justify-content: center;" onclick="sendCommand('conflict_commitAndContinue')">
                            ✅ Commit & Continue
                        </button>
                        ${this.conflictState.deletionsCount > 0 ? `
                            <button class="btn" style="background-color: var(--vscode-button-secondaryBackground); color: var(--vscode-button-secondaryForeground); justify-content: center;" onclick="sendCommand('conflict_resolveDeletions')">
                                🗑️ Resolve Deletions (${this.conflictState.deletionsCount})
                            </button>
                        ` : ''}
                        <button class="btn" style="background-color: var(--vscode-button-secondaryBackground); color: var(--vscode-button-secondaryForeground); justify-content: center;" onclick="sendCommand('conflict_abortDeploy')">
                            ❌ Abort Deploy
                        </button>
                    </div>
                </div>
                
                ${filesHtml ? `
                    <div style="font-size: 11px; opacity: 0.7; margin: 8px 4px 4px 4px; text-transform: uppercase;">Conflicted Files</div>
                    <div style="display: flex; flex-direction: column; gap: 2px;">
                        ${filesHtml}
                    </div>
                ` : ''}

                <script>
                    const vscode = acquireVsCodeApi();
                    function sendCommand(cmd, args) {
                    vscode.postMessage({ command: cmd, args: args });
                }
                    function sendOpenFileCommand(file) { vscode.postMessage({ command: 'openFile', file: file }); }
                </script>
            </body>
            </html>`;
        }

        if (currentPage === 'blame') {
            const data = this.blameDataCache;
            return `<!DOCTYPE html>
            <html lang="en">
            <head>
                <meta charset="UTF-8">
                <meta name="viewport" content="width=device-width, initial-scale=1.0">
                <title>Ricwiz Blame</title>
                ${styleHtml}
            </head>
            <body>
                <div style="display: flex; align-items: center; gap: 8px; margin-bottom: 16px; margin-top: 8px;">
                    <button class="btn" style="width: auto; padding: 4px 8px; background-color: var(--vscode-button-secondaryBackground); color: var(--vscode-button-secondaryForeground);" onclick="sendCommand('openDevTools')">← Back</button>
                    <div style="font-weight: bold; font-size: 13px; flex: 1; text-align: center;">Who to Blame</div>
                </div>

                ${data ? `
                <div style="padding: 12px; background: var(--vscode-editor-background); border: 1px solid var(--vscode-widget-border); border-radius: 6px; margin-bottom: 12px;">
                    <div style="font-weight: bold; margin-bottom: 12px; font-size: 14px; text-align: center; color: var(--vscode-textLink-foreground); word-break: break-all;">
                        📄 ${data.fileName}
                    </div>


                    <div style="margin-bottom: 20px;">
                        <div style="font-size: 11px; font-weight: bold; opacity: 0.8; text-transform: uppercase; margin-bottom: 8px;"><span class="icon">💻</span> Local Git (Last Commits)</div>
                        <ul style="list-style-type: none; padding: 0; margin: 0; display: flex; flex-direction: column; gap: 8px;">
                            ${data.gitHistory && data.gitHistory.length > 0 ? data.gitHistory.map((h: any) => `
                                <li style="background: var(--vscode-editorWidget-background); border: 1px solid var(--vscode-widget-border); padding: 8px 10px; border-radius: 4px; border-left: 4px solid var(--vscode-gitDecoration-modifiedResourceForeground);">
                                    <div style="display: flex; justify-content: space-between; margin-bottom: 4px; align-items: center;">
                                        <strong style="font-size: 13px;">${h.author}</strong>
                                        <span style="opacity: 0.7; font-size: 11px;">${h.time}</span>
                                    </div>
                                    <div style="font-size: 12px; margin-bottom: 6px; opacity: 0.9; font-style: italic;">"${h.message}"</div>
                                    <div style="font-family: monospace; font-size: 10px; opacity: 0.6;">Commit: ${h.hash}</div>
                                </li>
                            `).join('') : '<li style="opacity:0.7; font-size: 12px;">No Git history found.</li>'}
                        </ul>
                    </div>

                    <div style="margin-bottom: 20px;">
                        <div style="font-size: 11px; font-weight: bold; opacity: 0.8; text-transform: uppercase; margin-bottom: 8px;"><span class="icon">☁️</span> Salesforce Metadata</div>
                        <div style="display: flex; flex-direction: column; gap: 8px;">
                            <div style="background: var(--vscode-editorWidget-background); border: 1px solid var(--vscode-widget-border); padding: 8px 10px; border-radius: 4px; border-left: 4px solid var(--vscode-gitDecoration-addedResourceForeground);">
                                <div style="font-size: 10px; opacity: 0.7; text-transform: uppercase; margin-bottom: 2px;">Last Modified By</div>
                                <div style="font-weight: bold; font-size: 13px;">${data.sfAuthor}</div>
                                <div style="font-size: 11px; opacity: 0.7; margin-top: 2px;">${data.sfTime}</div>
                            </div>
                            ${data.sfCreatedBy !== 'Unknown' && data.sfCreatedBy !== 'N/A' ? `
                            <div style="background: var(--vscode-editorWidget-background); border: 1px solid var(--vscode-widget-border); padding: 8px 10px; border-radius: 4px; border-left: 4px solid var(--vscode-gitDecoration-addedResourceForeground);">
                                <div style="font-size: 10px; opacity: 0.7; text-transform: uppercase; margin-bottom: 2px;">Created By</div>
                                <div style="font-weight: bold; font-size: 13px;">${data.sfCreatedBy}</div>
                            </div>
                            ` : ''}
                        </div>
                    </div>

                    <div>
                        <div style="font-size: 11px; font-weight: bold; opacity: 0.8; text-transform: uppercase; margin-bottom: 8px;"><span class="icon">🕵️</span> Setup Audit Trail (Recent)</div>
                        <ul style="list-style-type: none; padding: 0; margin: 0; display: flex; flex-direction: column; gap: 8px;">
                            ${data.auditHistory && data.auditHistory.length > 0 ? data.auditHistory.map((a: any) => `
                                <li style="background: var(--vscode-editorWidget-background); border: 1px solid var(--vscode-widget-border); padding: 8px 10px; border-radius: 4px; border-left: 4px solid var(--vscode-gitDecoration-untrackedResourceForeground);">
                                    <div style="display: flex; justify-content: space-between; margin-bottom: 4px; align-items: center;">
                                        <strong style="font-size: 13px;">${a.author}</strong>
                                        <span style="opacity: 0.7; font-size: 11px;">${a.time}</span>
                                    </div>
                                    <div style="font-size: 12px; font-weight: 500; margin-bottom: 4px;">${a.action}</div>
                                    <div style="font-size: 11px; opacity: 0.7; font-style: italic; background: var(--vscode-editor-background); padding: 4px; border-radius: 3px;">${a.display}</div>
                                </li>
                            `).join('') : '<li style="opacity:0.7; font-size: 12px;">No recent setup changes found in Audit Trail.</li>'}
                        </ul>
                    </div>
                </div>
                ` : `
                <div style="text-align: center; padding: 20px; opacity: 0.7;">
                    No blame data available. Make sure you have a file open in the editor.
                </div>
                `}

                <script>
                    const vscode = acquireVsCodeApi();
                    function sendCommand(cmd, args) {
                    vscode.postMessage({ command: cmd, args: args });
                }
                </script>
            </body>
            </html>`;
        }

        if (currentPage === 'jira') {
            const data = this.jiraDataCache;
            const ticketId = data?.ticketId || 'Jira';
            const summary = data?.summary || 'No Title';
            const desc = data?.description || 'No description provided.';
            const relatedBranches = data?.relatedBranches || [];
            
            return `<!DOCTYPE html>
            <html lang="en">
            <head>
                <meta charset="UTF-8">
                <meta name="viewport" content="width=device-width, initial-scale=1.0">
                <title>Ricwiz Jira Details</title>
                ${styleHtml}
                <style>
                    .jira-title {
                        font-size: 16px;
                        font-weight: 600;
                        margin-bottom: 12px;
                        line-height: 1.4;
                    }
                    .jira-desc {
                        font-size: 12px;
                        line-height: 1.5;
                        opacity: 0.9;
                        white-space: pre-wrap;
                        background: var(--vscode-editor-background);
                        padding: 12px;
                        border-radius: 4px;
                        border: 1px solid var(--vscode-panel-border);
                    }
                </style>
            </head>
            <body>
                <div style="display: flex; align-items: center; gap: 8px; margin-bottom: 16px; margin-top: 8px;">
                    <button class="icon-button" onclick="sendCommand('setPage', 'main')" style="font-weight: bold; font-size: 16px;" title="Back">⬅️</button>
                    <span style="font-weight: 600; font-size: 13px;">${ticketId} Details</span>
                </div>
                
                <div class="card" style="padding: 16px;">
                    <div class="jira-title">${escapeHtml(summary)}</div>
                    <div class="jira-desc">${escapeHtml(desc)}</div>
                    
                    ${relatedBranches.length > 0 ? `
                        <div style="margin-top: 16px; border-top: 1px solid var(--vscode-panel-border); padding-top: 12px;">
                            <div style="font-size: 11px; opacity: 0.7; margin-bottom: 8px; text-transform: uppercase; font-weight: bold;"><span class="icon">🌿</span> Related Branches & MRs</div>
                            <div style="display: flex; flex-direction: column; gap: 4px;">
                                ${relatedBranches.map((b: any) => {
                                    let pipelineIcon = '';
                                    if (b.pipelineStatus === 'running') pipelineIcon = '⏳';
                                    else if (b.pipelineStatus === 'success') pipelineIcon = '✅';
                                    else if (b.pipelineStatus === 'failed') pipelineIcon = '❌';
                                    else if (b.pipelineStatus === 'canceled') pipelineIcon = '🛑';
                                    else if (b.pipelineStatus === 'skipped') pipelineIcon = '⏭️';
                                    
                                    return `
                                    <div class="btn" style="padding: 6px 10px; font-size: 12px; display: flex; justify-content: space-between; align-items: center; background-color: var(--vscode-button-secondaryBackground); color: var(--vscode-button-secondaryForeground); border-radius: 4px;" onclick="sendCheckoutCommand('${escapeHtml(b.name)}')" title="Checkout ${escapeHtml(b.name)}">
                                        <div style="display: flex; align-items: center; gap: 6px; overflow: hidden;">
                                            <span style="overflow: hidden; text-overflow: ellipsis; white-space: nowrap; font-weight: bold;">${escapeHtml(b.name)}</span>
                                        </div>
                                        <div style="display: flex; gap: 6px; align-items: center;">
                                            ${pipelineIcon ? `<span title="Pipeline: ${b.pipelineStatus}" style="font-size: 11px;">${pipelineIcon}</span>` : ''}
                                            ${b.mrUrl ? `<span onclick="event.stopPropagation(); sendCommand('openExternal', '${b.mrUrl}');" title="Open Merge Request" style="cursor: pointer; font-size: 12px;">🔗</span>` : ''}
                                            ${b.isMerged ? '<span style="background-color: var(--vscode-charts-green); color: white; border-radius: 3px; padding: 2px 6px; font-size: 10px; font-weight: bold;" title="Merged to target env">MERGED</span>' : ''}
                                        </div>
                                    </div>
                                    `;
                                }).join('')}
                            </div>
                        </div>
                    ` : ''}
                    
                <div style="display: flex; gap: 4px; margin-top: 16px;">
                    <button class="btn" style="flex: 1; background-color: var(--vscode-button-secondaryBackground); border-radius: 4px;" onclick="sendCommand('changeJiraStatus')">
                        <span class="icon">🔄</span> Change Status
                    </button>
                    <button class="btn" style="flex: 1; background-color: var(--vscode-button-secondaryBackground); border-radius: 4px;" onclick="sendCommand('addJiraComment')">
                        <span class="icon">💬</span> Add Comment
                    </button>
                    <button class="btn" style="flex: 1; background-color: var(--vscode-button-secondaryBackground); border-radius: 4px;" onclick="sendCommand('addJiraLabel')">
                        <span class="icon">🏷️</span> Add Label
                    </button>
                    ${data?.url ? `
                    <button class="btn" style="flex: 1; background-color: var(--vscode-button-secondaryBackground); border-radius: 4px;" onclick="sendCommand('openExternal', '${data.url}')">
                        <span class="icon">🌐</span> Open Browser
                    </button>
                    ` : ''}
                </div>
                </div>

                <script>
                    const vscode = acquireVsCodeApi();
                    function sendCommand(cmd, args) {
                        vscode.postMessage({ command: cmd, args: args });
                    }
                    function sendCheckoutCommand(branchName) {
                        vscode.postMessage({ command: 'checkout', branch: branchName });
                    }
                </script>
            </body>
            </html>`;
        }

        if (currentPage === 'dashboard') {
            const data = this.dashboardDataCache || { queries: [], selectedIndex: 0, results: [], error: null };
            
            const queriesHtml = data.queries.map((q: any, idx: number) => `
                <option value="${idx}" ${idx === data.selectedIndex ? 'selected' : ''}>${escapeHtml(q.name)}</option>
            `).join('');

            const resultsHtml = data.error ? `
                <div style="color: var(--vscode-errorForeground); padding: 12px; text-align: center; background: var(--vscode-editorError-background); border-radius: 4px;">
                    ⚠️ ${escapeHtml(data.error)}
                </div>
            ` : data.results.length === 0 ? `
                <div style="padding: 20px; text-align: center; opacity: 0.7;">No tickets found for this query.</div>
            ` : `
                <table style="width: 100%; border-collapse: collapse; font-size: 11px;">
                    <thead>
                        <tr style="border-bottom: 1px solid var(--vscode-panel-border); opacity: 0.7; text-align: left;">
                            <th style="padding: 6px;">Key</th>
                            <th style="padding: 6px;">Summary</th>
                            <th style="padding: 6px;">Status</th>
                            <th style="padding: 6px; text-align: center;">Branch</th>
                        </tr>
                    </thead>
                    <tbody>
                        ${data.results.map((r: any) => `
                            <tr style="border-bottom: ${r.detailedBranches && r.detailedBranches.length > 0 ? 'none' : '1px solid var(--vscode-panel-border)'}; cursor: pointer;" class="tr-hover" onclick="sendCommand('openJiraDetailsForId', '${escapeHtml(r.key)}')">
                                <td style="padding: 6px; font-weight: bold; color: var(--vscode-textLink-foreground); white-space: nowrap;">${escapeHtml(r.key)}</td>
                                <td style="padding: 6px; overflow: hidden; text-overflow: ellipsis; max-width: 150px; white-space: nowrap;" title="${escapeHtml(r.summary)}">${escapeHtml(r.summary)}</td>
                                <td style="padding: 6px; white-space: nowrap;">
                                    <span style="background: var(--vscode-badge-background); color: var(--vscode-badge-foreground); padding: 2px 4px; border-radius: 3px; font-size: 9px;">${escapeHtml(r.status)}</span>
                                </td>
                                <td style="padding: 6px; white-space: nowrap; text-align: center;">
                                    ${r.detailedBranches ? '' : r.branch ? `
                                        <button class="icon-button" style="background-color: var(--vscode-button-secondaryBackground); color: var(--vscode-button-secondaryForeground); font-size: 10px; padding: 2px 6px;" title="Checkout ${escapeHtml(r.branch)}" onclick="event.stopPropagation(); sendCommand('checkout', { branch: '${escapeHtml(r.branch)}' })">
                                            🌿 Checkout
                                        </button>
                                    ` : `
                                        <button class="icon-button" style="background-color: var(--vscode-button-background); color: var(--vscode-button-foreground); font-size: 10px; padding: 2px 6px;" title="Create Branch for ${escapeHtml(r.key)}" onclick="event.stopPropagation(); sendCommand('createBranchForTicket', '${escapeHtml(r.key)}')">
                                            ➕ Create
                                        </button>
                                    `}
                                </td>
                            </tr>
                            ${r.detailedBranches && r.detailedBranches.length > 0 ? `
                            <tr style="border-bottom: 1px solid var(--vscode-panel-border);">
                                <td colspan="4" style="padding: 0 6px 8px 6px;">
                                    <div style="display: flex; flex-direction: column; gap: 4px; padding-left: 8px; border-left: 2px solid var(--vscode-editorIndentGuide-activeBackground1);">
                                        ${r.detailedBranches.map((b: any) => {
                                            let pipelineIcon = '';
                                            if (b.pipelineStatus === 'running') pipelineIcon = '⏳';
                                            else if (b.pipelineStatus === 'success') pipelineIcon = '✅';
                                            else if (b.pipelineStatus === 'failed') pipelineIcon = '❌';
                                            else if (b.pipelineStatus === 'canceled') pipelineIcon = '🛑';
                                            else if (b.pipelineStatus === 'skipped') pipelineIcon = '⏭️';
                                            return `
                                            <div style="display: flex; justify-content: space-between; align-items: center; font-size: 10px; background: var(--vscode-editor-background); padding: 2px 6px; border-radius: 3px;">
                                                <div style="display: flex; align-items: center; gap: 6px; overflow: hidden; cursor: pointer; flex: 1;" onclick="sendCheckoutCommand('${escapeHtml(b.name)}')" title="Checkout ${escapeHtml(b.name)}">
                                                    <span style="overflow: hidden; text-overflow: ellipsis; white-space: nowrap;">${escapeHtml(b.name)}</span>
                                                    ${pipelineIcon ? `<span title="Pipeline: ${b.pipelineStatus}">${pipelineIcon}</span>` : ''}
                                                </div>
                                                <div style="display: flex; gap: 6px; align-items: center;">
                                                    ${b.mrUrl ? `<span onclick="event.stopPropagation(); sendCommand('openExternal', '${b.mrUrl}');" title="Open Merge Request" style="cursor: pointer;">🔗</span>` : ''}
                                                    ${b.isMerged ? '<span style="background-color: var(--vscode-charts-green); color: white; border-radius: 3px; padding: 1px 4px; font-size: 8px; font-weight: bold;">MERGED</span>' : ''}
                                                </div>
                                            </div>
                                            `;
                                        }).join('')}
                                    </div>
                                </td>
                            </tr>
                            ` : ''}
                        `).join('')}
                    </tbody>
                </table>
            `;

            return `<!DOCTYPE html>
            <html lang="en">
            <head>
                <meta charset="UTF-8">
                <meta name="viewport" content="width=device-width, initial-scale=1.0">
                <title>Ricwiz Ticket Dashboard</title>
                ${styleHtml}
                <style>
                    body {
                        height: 100vh;
                        box-sizing: border-box;
                        overflow: hidden;
                    }
                    .tr-hover:hover {
                        background-color: var(--vscode-list-hoverBackground);
                    }
                    select {
                        background-color: var(--vscode-dropdown-background);
                        color: var(--vscode-dropdown-foreground);
                        border: 1px solid var(--vscode-dropdown-border);
                        padding: 4px 8px;
                        border-radius: 4px;
                        width: 100%;
                        font-family: var(--vscode-font-family);
                    }
                </style>
            </head>
            <body>
                <div style="display: flex; align-items: center; gap: 8px; margin-bottom: 16px; margin-top: 8px;">
                    <button class="icon-button" onclick="sendCommand('setPage', 'main')" style="font-weight: bold; font-size: 16px;" title="Back">⬅️</button>
                    <span style="font-weight: 600; font-size: 13px; flex: 1;">Ticket Dashboard</span>
                    <button class="icon-button" onclick="sendCommand('refreshDashboard')" title="Refresh">🔄</button>
                </div>
                
                ${data.queries.length > 0 ? `
                <div style="margin-bottom: 12px;">
                    <select id="querySelect" onchange="sendCommand('switchDashboardQuery', this.value)">
                        ${queriesHtml}
                    </select>
                </div>
                <div style="margin-bottom: 12px; display: flex; align-items: center; gap: 6px;">
                    <input type="checkbox" id="showBranchesCheck" ${this.dashboardShowBranches ? 'checked' : ''} onchange="sendCommand('toggleDashboardBranches', this.checked)" style="margin: 0; cursor: pointer;">
                    <label for="showBranchesCheck" style="font-size: 11px; cursor: pointer;">Show all Branches (MRs & Pipelines)</label>
                </div>
                ` : `
                <div style="padding: 12px; opacity: 0.7; text-align: center;">No queries defined in settings.</div>
                `}

                <div style="background: var(--vscode-editor-background); border: 1px solid var(--vscode-panel-border); border-radius: 4px; overflow-x: auto; overflow-y: auto; flex: 1; display: flex; flex-direction: column;">
                    ${resultsHtml}
                </div>

                <script>
                    const vscode = acquireVsCodeApi();
                    function sendCommand(command, args) {
                        vscode.postMessage({ command, args });
                    }
                    function sendCheckoutCommand(branchName) {
                        vscode.postMessage({ command: 'checkout', branch: branchName });
                    }
                </script>
            </body>
            </html>`;
        }

        if (currentPage === 'devtools') {
            return `<!DOCTYPE html>
            <html lang="en">
            <head>
                <meta charset="UTF-8">
                <meta name="viewport" content="width=device-width, initial-scale=1.0">
                <title>Ricwiz DevTools</title>
                ${styleHtml}
            </head>
            <body>
                <div style="display: flex; align-items: center; gap: 8px; margin-bottom: 16px; margin-top: 8px;">
                    <button class="btn" style="width: auto; padding: 4px 8px; background-color: var(--vscode-button-secondaryBackground); color: var(--vscode-button-secondaryForeground);" onclick="sendCommand('openMain')">← Back</button>
                    <div style="font-weight: bold; font-size: 13px; flex: 1; text-align: center;">Developer Utilities</div>
                </div>

                <div style="display: flex; flex-direction: column; gap: 8px;">
                    <button class="btn" title="Generate Salesforce package.xml from git diff" onclick="sendCommand('generatePackageXml')">
                        <span class="icon">📦</span> Auto Package.xml
                    </button>
                    
                    <button class="btn" title="Generate destructiveChanges.xml for deleted files" onclick="sendCommand('generateDestructiveChanges')">
                        <span class="icon">🗑️</span> Auto DestructiveChanges
                    </button>
        
                    <button class="btn" title="Deploy the generated package to Salesforce" onclick="sendCommand('deployPackage')">
                        <span class="icon">☁️</span> Deploy Package
                    </button>

                    <button class="btn" title="Smart run modified Apex Test classes" onclick="sendCommand('runSmartTests')">
                        <span class="icon">🧪</span> Smart Test Runner
                    </button>

                    <button class="btn" title="Import data using Salesforce CLI" onclick="sendCommand('importData')">
                        <span class="icon">📥</span> Import Data
                    </button>

                    <div class="separator" style="margin: 4px 0;"></div>

                    <button class="btn" title="Find and group all files modified in a specific ticket" onclick="sendCommand('listTicketFiles')">
                        <span class="icon">🗂️</span> List Ticket Files
                    </button>

                    <button class="btn" title="Reset Salesforce source tracking" onclick="sendCommand('resetTracking')">
                        <span class="icon">🧹</span> Reset Tracking
                    </button>

                    <button class="btn" title="Extract metadata components quickly from Salesforce" onclick="sendCommand('extractComponent')">
                        <span class="icon">☁️</span> Extract Component
                    </button>

                    <button class="btn" title="Deploy the current open file to multiple orgs simultaneously" onclick="sendCommand('deployMultiOrg')">
                        <span class="icon">🚀</span> Deploy to Multi-Org
                    </button>

                    <button class="btn" title="Capture admin changes safely" onclick="sendCommand('captureAdminChanges')">
                        <span class="icon">🕵️</span> Capture Admin Changes
                    </button>
                    
                    <button class="btn" title="Discover who last modified the current file in Git and Salesforce" onclick="sendCommand('whoToBlame')" style="background-color: var(--vscode-button-hoverBackground);">
                        <span class="icon">🔍</span> Who to Blame
                    </button>
                </div>
                
                <script>
                    const vscode = acquireVsCodeApi();
                    function sendCommand(cmd, args) {
                    vscode.postMessage({ command: cmd, args: args });
                }
                </script>
            </body>
            </html>`;
        }

        let currentBranchObj = relatedBranches.find(b => b.name === currentBranch);
        let currentPipelineIcon = '';
        if (currentBranchObj) {
            if (currentBranchObj.pipelineStatus === 'running') currentPipelineIcon = '⏳';
            else if (currentBranchObj.pipelineStatus === 'success') currentPipelineIcon = '✅';
            else if (currentBranchObj.pipelineStatus === 'failed') currentPipelineIcon = '❌';
            else if (currentBranchObj.pipelineStatus === 'canceled') currentPipelineIcon = '🛑';
            else if (currentBranchObj.pipelineStatus === 'skipped') currentPipelineIcon = '⏭️';
        }
        let currentMrUrl = currentBranchObj ? currentBranchObj.mrUrl : undefined;

        const sisterBranches = relatedBranches.filter(b => b.name !== currentBranch);

        const currentBranchHtml = currentBranch ? 
                `<div style="background-color: var(--vscode-editor-inactiveSelectionBackground); padding: 10px; border-radius: 6px; margin-bottom: 16px; border: 1px solid var(--vscode-panel-border); box-shadow: 0 2px 4px rgba(0,0,0,0.1); position: relative;">
                    ${this.ticketTitleCache && this.ticketStatusCache ? `
                    <div style="position: absolute; top: 6px; right: 6px; z-index: 10; cursor: pointer; font-size: 9px; padding: 2px 6px; border-radius: 4px; background-color: var(--vscode-button-secondaryBackground); border: 1px solid var(--vscode-panel-border); opacity: 0.9; font-weight: bold; text-transform: uppercase; display: flex; align-items: center; gap: 4px;" onclick="sendCommand('changeJiraStatus')" title="Update Jira Status">
                        <span>📝</span> ${escapeHtml(this.ticketStatusCache)}
                    </div>
                    ` : ''}
                    <div style="font-size: 10px; opacity: 0.7; margin-bottom: 4px; display: flex; align-items: center; justify-content: center; gap: 4px; text-transform: uppercase;">
                        Current Ticket / Branch
                        <button class="copy-btn" onclick="sendCommand('copyBranch')" title="Copy branch name to clipboard">📋</button>
                    </div>
                    <div style="font-weight: bold; font-size: 14px; word-break: break-all; text-align: center; color: var(--vscode-textLink-foreground); display: flex; justify-content: center; align-items: center; gap: 6px;">
                        ${escapeHtml(currentBranch)} 
                        ${currentPipelineIcon ? `<span title="Pipeline: ${currentBranchObj!.pipelineStatus}" style="font-size: 12px;">${currentPipelineIcon}</span>` : ''}
                        ${currentMrUrl ? `<span onclick="event.stopPropagation(); sendCommand('openExternal', '${currentMrUrl}');" title="Open Merge Request" style="cursor: pointer; font-size: 12px;">🔗</span>` : ''}
                        ${this.currentBranchIsMergedCache ? '<span style="background-color: var(--vscode-charts-green); color: white; border-radius: 3px; padding: 1px 4px; font-size: 10px; font-weight: bold;" title="Merged to target env">MERGED</span>' : ''}
                    </div>
                    ${this.ticketTitleCache ? `<div style="font-size: 12px; margin-top: 6px; text-align: center; opacity: 0.9; font-style: italic;">${escapeHtml(this.ticketTitleCache)}</div>` : ''}
                    ${sisterBranches.length > 0 ? `
                        <div style="margin-top: 10px; border-top: 1px solid var(--vscode-panel-border); padding-top: 10px;">
                            <div style="font-size: 10px; opacity: 0.7; margin-bottom: 6px; text-transform: uppercase; text-align: center;">Sister Branches</div>
                            <div style="display: flex; flex-direction: column; gap: 4px;">
                                ${sisterBranches.map(b => {
                                    let pipelineIcon = '';
                                    if (b.pipelineStatus === 'running') pipelineIcon = '⏳';
                                    else if (b.pipelineStatus === 'success') pipelineIcon = '✅';
                                    else if (b.pipelineStatus === 'failed') pipelineIcon = '❌';
                                    else if (b.pipelineStatus === 'canceled') pipelineIcon = '🛑';
                                    else if (b.pipelineStatus === 'skipped') pipelineIcon = '⏭️';
                                    
                                    return `
                                    <div class="btn" style="padding: 4px 8px; font-size: 11px; display: flex; justify-content: space-between; align-items: center; background-color: var(--vscode-button-secondaryBackground); color: var(--vscode-button-secondaryForeground); border-radius: 4px;" onclick="sendCheckoutCommand('${escapeHtml(b.name)}', this)" title="Checkout ${escapeHtml(b.name)}">
                                        <div style="display: flex; align-items: center; gap: 4px; overflow: hidden;">
                                            <span style="overflow: hidden; text-overflow: ellipsis; white-space: nowrap; font-weight: bold;">${escapeHtml(b.name)}</span>
                                        </div>
                                        <div style="display: flex; gap: 4px; align-items: center;">
                                            ${pipelineIcon ? `<span title="Pipeline: ${b.pipelineStatus}" style="font-size: 10px;">${pipelineIcon}</span>` : ''}
                                            ${b.mrUrl ? `<span onclick="event.stopPropagation(); sendCommand('openExternal', '${b.mrUrl}');" title="Open Merge Request" style="cursor: pointer; font-size: 10px;">🔗</span>` : ''}
                                            ${b.isMerged ? '<span style="background-color: var(--vscode-charts-green); color: white; border-radius: 3px; padding: 1px 4px; font-size: 9px; font-weight: bold;" title="Merged to target env">MERGED</span>' : ''}
                                        </div>
                                    </div>
                                    `;
                                }).join('')}
                            </div>
                        </div>
                    ` : (recentTickets.length > 0 ? `
                        <div style="margin-top: 10px; border-top: 1px solid var(--vscode-panel-border); padding-top: 10px;">
                            <div style="font-size: 10px; opacity: 0.7; margin-bottom: 6px; text-transform: uppercase; text-align: center;">Recent Tickets</div>
                            <div style="display: flex; flex-direction: column; gap: 4px;">
                                ${recentTickets.map(b => `
                                    <div class="btn" style="padding: 4px 8px; font-size: 11px; display: flex; align-items: center; background-color: var(--vscode-button-secondaryBackground); color: var(--vscode-button-secondaryForeground); border-radius: 4px;" onclick="sendCheckoutCommand('${escapeHtml(b)}', this)" title="Checkout ${escapeHtml(b)}">
                                        <span style="font-weight: bold;">${escapeHtml(b)}</span>
                                    </div>
                                `).join('')}
                            </div>
                        </div>
                    ` : '')}
                    <div style="display: flex; gap: 6px; margin-top: 10px; justify-content: center;">
                        <button class="btn" style="width: auto; padding: 4px 8px; font-size: 11px; background-color: var(--vscode-button-secondaryBackground); border-radius: 4px;" onclick="sendCommand('showJiraDetails')" title="View Jira Details">
                            <span class="icon" style="font-size: 12px; margin-right: 4px;">🎫</span> Jira Details
                        </button>
                        <button class="btn" style="width: auto; padding: 4px 8px; font-size: 11px; background-color: var(--vscode-button-secondaryBackground); border-radius: 4px;" onclick="sendCommand('openDashboard')" title="View Ticket Dashboard">
                            <span class="icon" style="font-size: 12px; margin-right: 4px;">📊</span> Dashboard
                        </button>
                    </div>
                </div>` : '';

        // NORMAL HTML RENDER (No conflict)
        return `<!DOCTYPE html>
        <html lang="en">
        <head>
            <meta charset="UTF-8">
            <meta name="viewport" content="width=device-width, initial-scale=1.0">
            <title>Ricwiz</title>
            ${styleHtml}
        </head>
        <body>
            <div style="text-align: center; margin-bottom: 12px; margin-top: 8px;">
                <img src="${logoUri}" alt="Ricwiz Logo" style="width: 80px; height: 80px; opacity: 0.9; filter: drop-shadow(0 2px 4px rgba(0,0,0,0.2));" />
            </div>

            <!-- SETTINGS & DEV TOOLS (Top Level) -->
            <div style="display: flex; gap: 8px; margin-bottom: 16px;">
                <button class="btn" style="flex: 1; justify-content: center; background-color: var(--vscode-button-secondaryBackground); border: 1px solid var(--vscode-panel-border); border-radius: 4px;" title="Developer Utilities" onclick="sendCommand('openDevTools')">
                    <span class="icon">🛠️</span> Dev Tools
                </button>
                <button class="btn" style="flex: 1; justify-content: center; background-color: var(--vscode-button-secondaryBackground); border: 1px solid var(--vscode-panel-border); border-radius: 4px;" title="Extension Settings" onclick="sendCommand('openSettings')">
                    <span class="icon">⚙️</span> Settings
                </button>
            </div>

            <div style="display: flex; align-items: center; justify-content: space-between; margin-bottom: 6px; padding: 0 4px;">
                <div style="font-size: 11px; font-weight: bold; opacity: 0.8; text-transform: uppercase;">Workspace</div>
                <div style="display: flex; gap: 4px;">
                    <button class="copy-btn" onclick="sendCommand('manualRefresh')" title="Refresh branch status" style="font-size: 13px; padding: 2px 6px; opacity: 0.8; border: 1px solid var(--vscode-panel-border);">
                        🔄
                    </button>
                    <button class="copy-btn" id="autoRefreshToggle" onclick="sendCommand('toggleAutoRefresh')" title="${this.autoRefreshEnabled ? 'Auto-refresh is ON — click to disable' : 'Auto-refresh is OFF — click to enable'}" style="font-size: 11px; padding: 2px 6px; border-radius: 3px; border: 1px solid var(--vscode-panel-border); ${this.autoRefreshEnabled ? 'opacity: 0.9; background-color: var(--vscode-button-secondaryBackground);' : 'opacity: 0.5;'}">
                        ${this.autoRefreshEnabled ? '⚡ Auto' : '⏸️ Auto'}
                    </button>
                </div>
            </div>

            ${currentBranchHtml}


            ${baseBranches.length > 0 ? `
                <div style="display: flex; gap: 4px; margin-bottom: 16px; flex-wrap: wrap; justify-content: center;">
                    ${baseBranches.map(b => {
                        const displayName = b.split('/').pop()?.toUpperCase() || b.toUpperCase();
                        return `
                        <button class="btn" style="flex: 1; min-width: 25%; justify-content: center; padding: 6px 4px; font-size: 10px; font-weight: bold; background-color: var(--vscode-button-secondaryBackground); color: var(--vscode-button-secondaryForeground); border-radius: 4px;" onclick="sendCheckoutCommand('${escapeHtml(b)}', this)" title="Checkout ${escapeHtml(b)}">
                            ${escapeHtml(displayName)}
                        </button>
                    `}).join('')}
                </div>
            ` : ''}

            <!-- PRIMARY ACTIONS CARD -->
            <div style="background-color: var(--vscode-editor-inactiveSelectionBackground); padding: 10px; border-radius: 6px; margin-bottom: 16px; border: 1px solid var(--vscode-panel-border); box-shadow: 0 2px 4px rgba(0,0,0,0.1);">
                <div style="font-size: 10px; opacity: 0.7; margin-bottom: 10px; text-transform: uppercase; font-weight: bold; text-align: center;">Ticket Workflow</div>
                
                <button class="btn" style="background-color: var(--vscode-button-background); color: var(--vscode-button-foreground); font-weight: bold; margin-bottom: 6px; border-radius: 4px; padding: 8px;" title="Generates the main and environment branches" onclick="sendCommand('createBranches')">
                    <span class="icon">🌿</span> Create Branches
                </button>

                <button class="btn" style="background-color: var(--vscode-button-secondaryBackground); margin-bottom: 6px; border-radius: 4px;" title="Sync environments and merge ticket" onclick="sendCommand('prepareDeploy')">
                    <span class="icon">🔀</span> Prepare Deploy
                </button>

                <div style="display: flex; gap: 4px; margin-bottom: 6px;">
                    <button class="btn" style="flex: 1; background-color: var(--vscode-button-secondaryBackground); border-radius: 4px;" title="Opens Merge Request pages in Browser" onclick="sendCommand('openMRs')">
                        <span class="icon">🚀</span> Open MRs
                    </button>
                    <button class="btn" style="width: auto; padding: 6px 12px; font-weight: bold; justify-content: center; background-color: var(--vscode-button-secondaryBackground); border-radius: 4px;" title="Open MRs in VS Code" onclick="sendCommand('openMRsVSCode')">
                        VS
                    </button>
                </div>

                <button class="btn" style="background-color: var(--vscode-button-secondaryBackground); border-radius: 4px;" title="Open Jira Ticket in Browser" onclick="sendCommand('openJira')">
                    <span class="icon">🎫</span> Open Jira
                </button>
            </div>

            <!-- SECONDARY ACTIONS CARD -->
            <div style="background-color: var(--vscode-editor-inactiveSelectionBackground); padding: 10px; border-radius: 6px; margin-bottom: 12px; border: 1px solid var(--vscode-panel-border); box-shadow: 0 2px 4px rgba(0,0,0,0.1);">
                <div style="font-size: 10px; opacity: 0.7; margin-bottom: 10px; text-transform: uppercase; font-weight: bold; text-align: center;">Git Operations</div>
                
                <button class="btn" style="margin-bottom: 6px; background-color: var(--vscode-button-secondaryBackground); border-radius: 4px;" title="Fetch and pull all branches of the current ticket" onclick="sendCommand('syncAll')">
                    <span class="icon">🔄</span> Sync All
                </button>

                <button class="btn" style="margin-bottom: 6px; background-color: var(--vscode-button-secondaryBackground); border-radius: 4px;" title="Merge latest team changes from origin base into environment branches" onclick="sendCommand('updateBases')">
                    <span class="icon">⏬</span> Update from Base
                </button>

                <button class="btn" style="background-color: var(--vscode-button-secondaryBackground); border-radius: 4px;" title="Delete all branches of a ticket (local and remote)" onclick="sendCommand('deleteUnused')">
                    <span class="icon">🗑️</span> Delete Unused Branches
                </button>
            </div>

            ${commitsHtml}
            
            <script>
                const vscode = acquireVsCodeApi();
                function sendCommand(cmd, args) {
                    vscode.postMessage({ command: cmd, args: args });
                }
                function sendCheckoutCommand(branchName, element) {
                    if (element) {
                        element.style.opacity = '0.5';
                        element.innerHTML = '⏳ Checking out...';
                        element.style.pointerEvents = 'none';
                    }
                    vscode.postMessage({ command: 'checkout', branch: branchName });
                }
            </script>
        </body>
        </html>`;
    }
}
