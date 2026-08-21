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
                case 'prepareDeploy':
                    vscode.commands.executeCommand('ricwiz.prepareDeploy');
                    break;
                case 'openMRs':
                    vscode.commands.executeCommand('ricwiz.createMergeRequests');
                    break;
                case 'openMRsVSCode':
                    vscode.commands.executeCommand('ricwiz.createMergeRequestsVSCode');
                    break;
                case 'openJira':
                    vscode.commands.executeCommand('ricwiz.openJiraTicket');
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

    public updateBranch(branchName: string, isMerged: boolean, relatedBranches: { name: string, isMerged: boolean }[] = [], commits: CommitEntry[] = [], baseBranches: string[] = [], recentTickets: string[] = []) {
        if (!this.webviewView) return;
        this.currentBranchCache = branchName;
        this.currentBranchIsMergedCache = isMerged;
        this.relatedBranchesCache = relatedBranches;
        this.commitsCache = commits;
        this.baseBranchesCache = baseBranches;
        this.recentTicketsCache = recentTickets;
        this.updateView();
    }

    private currentBranchCache = '';
    private currentBranchIsMergedCache = false;
    private relatedBranchesCache: { name: string, isMerged: boolean }[] = [];
    private commitsCache: CommitEntry[] = [];
    private baseBranchesCache: string[] = [];
    private recentTicketsCache: string[] = [];
    private currentPage: 'main' | 'devtools' | 'blame' = 'main';
    private blameDataCache: any = null;
    private autoRefreshEnabled: boolean = true;

    public setBlameData(data: any) {
        this.blameDataCache = data;
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

    public setPage(page: 'main' | 'devtools' | 'blame') {
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

    private _getHtmlForWebview(logoUri: vscode.Uri, currentBranch: string, relatedBranches: { name: string, isMerged: boolean }[], commits: CommitEntry[], baseBranches: string[], recentTickets: string[], currentPage: 'main' | 'devtools' | 'blame') {
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
                    function sendCommand(cmd) { vscode.postMessage({ command: cmd }); }
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
                    <button class="btn" style="width: auto; padding: 4px 8px; background-color: var(--vscode-button-secondaryBackground); color: var(--vscode-button-secondaryForeground);" onclick="sendCommand('openDevTools')">⬅️ Back</button>
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
                    function sendCommand(cmd) { vscode.postMessage({ command: cmd }); }
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
                    <button class="btn" style="width: auto; padding: 4px 8px; background-color: var(--vscode-button-secondaryBackground); color: var(--vscode-button-secondaryForeground);" onclick="sendCommand('openMain')">⬅️ Back</button>
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
                    function sendCommand(cmd) { vscode.postMessage({ command: cmd }); }
                </script>
            </body>
            </html>`;
        }

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

            ${currentBranch ? 
                `<div style="background-color: var(--vscode-editor-inactiveSelectionBackground); padding: 10px; border-radius: 6px; margin-bottom: 16px; border: 1px solid var(--vscode-panel-border); box-shadow: 0 2px 4px rgba(0,0,0,0.1);">
                    <div style="font-size: 10px; opacity: 0.7; margin-bottom: 4px; display: flex; align-items: center; justify-content: center; gap: 4px; text-transform: uppercase;">
                        Current Ticket / Branch
                        <button class="copy-btn" onclick="sendCommand('copyBranch')" title="Copy branch name to clipboard">📋</button>
                    </div>
                    <div style="font-weight: bold; font-size: 14px; word-break: break-all; text-align: center; color: var(--vscode-textLink-foreground);">
                        ${escapeHtml(currentBranch)} ${this.currentBranchIsMergedCache ? '<span style="margin-left: 4px; background-color: var(--vscode-charts-green); color: white; border-radius: 3px; padding: 1px 4px; font-size: 10px; font-weight: bold;" title="Merged to target env">MERGED</span>' : ''}
                    </div>
                    ${relatedBranches.length > 0 ? `
                        <div style="margin-top: 10px; border-top: 1px solid var(--vscode-panel-border); padding-top: 10px;">
                            <div style="font-size: 10px; opacity: 0.7; margin-bottom: 6px; text-transform: uppercase; text-align: center;">Sister Branches</div>
                            <div style="display: flex; flex-direction: column; gap: 4px;">
                                ${relatedBranches.map(b => `
                                    <div class="btn" style="padding: 4px 8px; font-size: 11px; display: flex; justify-content: space-between; align-items: center; background-color: var(--vscode-button-secondaryBackground); color: var(--vscode-button-secondaryForeground); border: 1px solid var(--vscode-panel-border); border-radius: 4px;" onclick="sendCheckoutCommand('${escapeHtml(b.name)}', this)" title="Checkout ${escapeHtml(b.name)}">
                                        <span style="overflow: hidden; text-overflow: ellipsis; white-space: nowrap; font-weight: bold;">${escapeHtml(b.name)}</span>
                                        ${b.isMerged ? '<span style="background-color: var(--vscode-charts-green); color: white; border-radius: 3px; padding: 1px 4px; font-size: 9px; font-weight: bold;" title="Merged to target env">MERGED</span>' : ''}
                                    </div>
                                `).join('')}
                            </div>
                        </div>
                    ` : (recentTickets.length > 0 ? `
                        <div style="margin-top: 10px; border-top: 1px solid var(--vscode-panel-border); padding-top: 10px;">
                            <div style="font-size: 10px; opacity: 0.7; margin-bottom: 6px; text-transform: uppercase; text-align: center;">Recent Tickets</div>
                            <div style="display: flex; flex-direction: column; gap: 4px;">
                                ${recentTickets.map(b => `
                                    <div class="btn" style="padding: 4px; font-size: 11px; justify-content: center; background-color: var(--vscode-button-secondaryBackground); color: var(--vscode-button-secondaryForeground); border: 1px solid var(--vscode-panel-border); border-radius: 4px;" onclick="sendCheckoutCommand('${escapeHtml(b)}', this)" title="Checkout ${escapeHtml(b)}">
                                        ${escapeHtml(b)}
                                    </div>
                                `).join('')}
                            </div>
                        </div>
                    ` : '')}
                    <div style="display: flex; gap: 6px; margin-top: 10px; justify-content: center;">
                        <button class="btn" style="width: auto; padding: 4px 8px; font-size: 11px; background-color: var(--vscode-button-secondaryBackground); border: 1px solid var(--vscode-panel-border); border-radius: 4px;" onclick="sendCommand('searchTicket')" title="Search branches by ticket number">
                            <span class="icon" style="font-size: 12px; margin-right: 4px;">🔍</span> Search
                        </button>
                        <button class="btn" style="width: auto; padding: 4px 8px; font-size: 11px; background-color: var(--vscode-button-secondaryBackground); border: 1px solid var(--vscode-panel-border); border-radius: 4px;" onclick="sendCommand('openHistory')" title="View recent branches history">
                            <span class="icon" style="font-size: 12px; margin-right: 4px;">🕰️</span> History
                        </button>
                    </div>
                </div>` : ''
            }

            ${baseBranches.length > 0 ? `
                <div style="display: flex; gap: 4px; margin-bottom: 16px; flex-wrap: wrap; justify-content: center;">
                    ${baseBranches.map(b => `
                        <button class="btn" style="flex: 1; min-width: 25%; justify-content: center; padding: 6px 4px; font-size: 10px; font-weight: bold; background-color: var(--vscode-button-secondaryBackground); color: var(--vscode-button-secondaryForeground); border: 1px solid var(--vscode-panel-border); border-radius: 4px;" onclick="sendCheckoutCommand('${escapeHtml(b)}', this)" title="Checkout ${escapeHtml(b)}">
                            ${escapeHtml(b.toUpperCase())}
                        </button>
                    `).join('')}
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

                <div style="display: flex; gap: 4px;">
                    <button class="btn" style="flex: 1; background-color: var(--vscode-button-secondaryBackground); border-radius: 4px;" title="Open Jira Ticket in Browser" onclick="sendCommand('openJira')">
                        <span class="icon">🎫</span> Open Jira
                    </button>
                    <button class="btn" style="width: auto; padding: 6px 12px; font-weight: bold; justify-content: center; background-color: var(--vscode-button-secondaryBackground); border-radius: 4px;" title="Open Jira in VS Code" onclick="sendCommand('openJiraVSCode')">
                        VS
                    </button>
                </div>
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
                function sendCommand(cmd) {
                    vscode.postMessage({ command: cmd });
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
