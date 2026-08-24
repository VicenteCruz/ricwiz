"use strict";var ri=Object.create;var Ve=Object.defineProperty;var si=Object.getOwnPropertyDescriptor;var ai=Object.getOwnPropertyNames;var ci=Object.getPrototypeOf,di=Object.prototype.hasOwnProperty;var P=(t,e,i)=>()=>{if(i)throw i[0];try{return t&&(e=t(t=0)),e}catch(o){throw i=[o],o}};var Ae=(t,e)=>{for(var i in e)Ve(t,i,{get:e[i],enumerable:!0})},kt=(t,e,i,o)=>{if(e&&typeof e=="object"||typeof e=="function")for(let s of ai(e))!di.call(t,s)&&s!==i&&Ve(t,s,{get:()=>e[s],enumerable:!(o=si(e,s))||o.enumerable});return t};var k=(t,e,i)=>(i=t!=null?ri(ci(t)):{},kt(e||!t||!t.__esModule?Ve(i,"default",{value:t,enumerable:!0}):i,t)),F=t=>kt(Ve({},"__esModule",{value:!0}),t);function z(t){return t.replace(/&/g,"&amp;").replace(/</g,"&lt;").replace(/>/g,"&gt;").replace(/"/g,"&quot;").replace(/'/g,"&#39;")}var $,_e,Ct=P(()=>{"use strict";$=k(require("vscode"));_e=class{constructor(e){this._extensionUri=e}_extensionUri;webviewView;resolveWebviewView(e,i,o){this.webviewView=e,e.webview.options={enableScripts:!0,localResourceRoots:[this._extensionUri]},this.updateView(),e.webview.onDidReceiveMessage(s=>{switch(s.command){case"createBranches":$.commands.executeCommand("ricwiz.createBranches");break;case"createBranchForTicket":$.commands.executeCommand("ricwiz.createBranches",s.args);break;case"prepareDeploy":$.commands.executeCommand("ricwiz.prepareDeploy");break;case"openMRs":$.commands.executeCommand("ricwiz.createMergeRequests");break;case"openMRsVSCode":$.commands.executeCommand("ricwiz.createMergeRequestsVSCode");break;case"openExternal":s.args&&$.env.openExternal($.Uri.parse(s.args));break;case"openJira":$.commands.executeCommand("ricwiz.openJiraTicket");break;case"showJiraDetails":$.commands.executeCommand("ricwiz.showJiraDetails");break;case"showPipelineLogs":$.commands.executeCommand("ricwiz.showPipelineLogs",s.args.projectPath,s.args.pipelineId);break;case"changeJiraStatus":$.commands.executeCommand("ricwiz.changeJiraStatus");break;case"addJiraComment":$.commands.executeCommand("ricwiz.addJiraComment");break;case"addJiraLabel":$.commands.executeCommand("ricwiz.addJiraLabel");break;case"setPage":this.setPage(s.args);break;case"openDashboard":$.commands.executeCommand("ricwiz.openJiraDashboard");break;case"openJiraDetailsForId":$.commands.executeCommand("ricwiz.openJiraDetailsForId",s.args);break;case"refreshDashboard":$.commands.executeCommand("ricwiz.openJiraDashboard");break;case"switchDashboardQuery":$.commands.executeCommand("ricwiz.openJiraDashboard",parseInt(s.args));break;case"toggleDashboardBranches":$.commands.executeCommand("ricwiz.toggleDashboardBranches",s.args);break;case"openJiraVSCode":$.commands.executeCommand("ricwiz.openJiraTicketVSCode");break;case"openSettings":$.commands.executeCommand("ricwiz.openSettings");break;case"checkout":s.branch&&$.commands.executeCommand("ricwiz.checkoutBranch",s.branch);break;case"copyBranch":$.commands.executeCommand("ricwiz.copyBranchName");break;case"generatePackageXml":$.commands.executeCommand("ricwiz.generatePackageXml");break;case"openDevTools":this.setPage("devtools");break;case"openMain":this.setPage("main");break;case"generateDestructiveChanges":$.commands.executeCommand("ricwiz.generateDestructiveChanges");break;case"deployPackage":$.commands.executeCommand("ricwiz.deployPackage");break;case"runSmartTests":$.commands.executeCommand("ricwiz.runSmartTests");break;case"importData":$.commands.executeCommand("ricwiz.importData");break;case"listTicketFiles":$.commands.executeCommand("ricwiz.listTicketFiles");break;case"resetTracking":$.commands.executeCommand("ricwiz.resetTracking");break;case"extractComponent":$.commands.executeCommand("ricwiz.extractComponent");break;case"deployMultiOrg":$.commands.executeCommand("ricwiz.deployMultiOrg");break;case"captureAdminChanges":$.commands.executeCommand("ricwiz.captureAdminChanges");break;case"whoToBlame":$.commands.executeCommand("ricwiz.whoToBlame");break;case"syncAll":$.commands.executeCommand("ricwiz.syncAll");break;case"updateBases":$.commands.executeCommand("ricwiz.updateBases");break;case"deleteUnused":$.commands.executeCommand("ricwiz.deleteUnusedBranches");break;case"conflict_commitAndContinue":$.commands.executeCommand("ricwiz.conflictAction","commitAndContinue");break;case"conflict_resolveDeletions":$.commands.executeCommand("ricwiz.conflictAction","resolveDeletions");break;case"conflict_abortDeploy":$.commands.executeCommand("ricwiz.conflictAction","abortDeploy");break;case"openFile":if(s.file){let p=$.workspace.workspaceFolders;if(p){let l=$.Uri.joinPath(p[0].uri,s.file);$.commands.executeCommand("vscode.open",l)}}break;case"searchTicket":$.commands.executeCommand("ricwiz.searchTicket");break;case"manualRefresh":$.commands.executeCommand("ricwiz.manualRefresh");break;case"toggleAutoRefresh":$.commands.executeCommand("ricwiz.toggleAutoRefresh");break;case"openHistory":$.commands.executeCommand("ricwiz.openHistory");break}})}conflictState=null;setConflictState(e){this.conflictState=e,this.updateView()}updateBranch(e,i,o=[],s=[],p=[],l=[],g="",m=""){this.currentBranchCache=e,this.currentBranchIsMergedCache=i,this.relatedBranchesCache=o,this.commitsCache=s,this.baseBranchesCache=p,this.recentTicketsCache=l,this.ticketTitleCache=g,this.ticketStatusCache=m,this.webviewView&&this.updateView()}currentBranchCache="";currentBranchIsMergedCache=!1;relatedBranchesCache=[];commitsCache=[];baseBranchesCache=[];recentTicketsCache=[];ticketTitleCache="";ticketStatusCache="";currentPage="main";blameDataCache=null;jiraDataCache=null;dashboardDataCache=null;dashboardShowBranches=!1;autoRefreshEnabled=!0;setDashboardShowBranches(e){this.dashboardShowBranches=e}getDashboardShowBranches(){return this.dashboardShowBranches}setBlameData(e){this.blameDataCache=e}setJiraData(e){this.jiraDataCache=e}setDashboardData(e){this.dashboardDataCache=e}setAutoRefresh(e){this.autoRefreshEnabled=e,this.updateView()}isAutoRefreshEnabled(){return this.autoRefreshEnabled}setPage(e){this.currentPage=e,this.updateView()}updateView(){if(!this.webviewView)return;let e=this.webviewView.webview.asWebviewUri($.Uri.joinPath(this._extensionUri,"resources","logo.png"));this.webviewView.webview.html=this._getHtmlForWebview(e,this.currentBranchCache,this.relatedBranchesCache,this.commitsCache,this.baseBranchesCache,this.recentTicketsCache,this.currentPage)}_getHtmlForWebview(e,i,o,s,p,l,g){let m=s.length>0?`
            <div class="separator"></div>
            <div style="padding: 0 4px;">
                <div style="font-size: 11px; opacity: 0.7; margin-bottom: 6px; display: flex; align-items: center; gap: 4px;">
                    <span>\u2637</span> Recent Commits
                </div>
                <div style="display: flex; flex-direction: column; gap: 2px;">
                    ${s.map(c=>`
                        <div style="font-size: 11px; padding: 3px 4px; border-radius: 2px; display: flex; gap: 6px; align-items: baseline;">
                            <code style="color: var(--vscode-textLink-foreground); font-size: 10px; flex-shrink: 0;">${z(c.hash)}</code>
                            <span style="flex: 1; overflow: hidden; text-overflow: ellipsis; white-space: nowrap;" title="${z(c.message)}">${z(c.message)}</span>
                            <span style="font-size: 9px; opacity: 0.5; flex-shrink: 0;">${z(c.timeAgo)}</span>
                        </div>
                    `).join("")}
                </div>
            </div>
        `:"",a=`
            <style>
                :root {
                    /* Richemont Palette */
                    --rich-blue: #003366;
                    --rich-gold: #D4AF37;
                    --rich-white: #FFFFFF;
                    
                    /* Apple-style UI elements (Dark Mode) */
                    --rich-bg: #000000;
                    --rich-text: #F5F5F7;
                    --rich-border: #38383A;
                    --rich-card: #1C1C1E;
                    --rich-btn: #2C2C2E;
                    
                    --radius-sm: 6px;
                    --radius-md: 10px;
                    --radius-lg: 14px;
                    
                    --shadow-sm: 0 1px 2px rgba(0,0,0,0.3);
                    --shadow-md: 0 4px 12px rgba(0,0,0,0.5);
                }

                body {
                    padding: 16px 12px;
                    display: flex;
                    flex-direction: column;
                    gap: 12px;
                    font-family: -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, Helvetica, Arial, sans-serif;
                    background-color: var(--rich-bg) !important;
                    color: var(--rich-text) !important;
                    -webkit-font-smoothing: antialiased;

                    /* Override VSCode theme variables for a consistent dark Apple theme */
                    --vscode-panel-border: var(--rich-border);
                    --vscode-list-hoverBackground: rgba(255, 255, 255, 0.1);
                    --vscode-widget-border: var(--rich-border);
                    --vscode-dropdown-background: var(--rich-card);
                    --vscode-dropdown-foreground: var(--rich-text);
                    --vscode-dropdown-border: var(--rich-border);
                    --vscode-editorIndentGuide-activeBackground1: var(--rich-gold);
                    --vscode-foreground: var(--rich-text);
                    --vscode-button-foreground: var(--rich-text);
                    --vscode-button-secondaryForeground: var(--rich-text);
                }

                .btn {
                    display: flex;
                    align-items: center;
                    gap: 10px;
                    background: var(--rich-btn);
                    color: var(--rich-text);
                    border: 1px solid var(--rich-border);
                    padding: 10px 12px;
                    cursor: pointer;
                    font-size: 13px;
                    font-weight: 500;
                    border-radius: var(--radius-md);
                    text-align: left;
                    width: 100%;
                    outline: none;
                    transition: all 0.2s cubic-bezier(0.25, 0.8, 0.25, 1);
                    box-shadow: var(--shadow-sm);
                }
                
                .btn:hover {
                    background-color: var(--rich-blue);
                    color: var(--rich-white);
                    border-color: var(--rich-blue);
                    transform: translateY(-1px);
                    box-shadow: 0 4px 8px rgba(0, 51, 102, 0.4);
                }
                
                .btn:active {
                    transform: scale(0.98);
                }

                .icon {
                    font-size: 15px;
                    opacity: 0.9;
                }

                .separator {
                    height: 1px;
                    background-color: var(--rich-border);
                    margin: 12px 4px;
                }

                .copy-btn {
                    background: transparent;
                    border: none;
                    color: var(--rich-text);
                    cursor: pointer;
                    font-size: 12px;
                    opacity: 0.6;
                    padding: 4px 6px;
                    border-radius: var(--radius-sm);
                    transition: all 0.2s ease;
                }
                .copy-btn:hover {
                    opacity: 1;
                    background-color: rgba(255, 255, 255, 0.1);
                }

                .icon-button {
                    background: transparent;
                    border: none;
                    cursor: pointer;
                    color: var(--rich-text);
                    padding: 6px;
                    border-radius: var(--radius-sm);
                    display: inline-flex;
                    align-items: center;
                    justify-content: center;
                    transition: all 0.2s ease;
                }
                .icon-button:hover {
                    background: rgba(255, 255, 255, 0.1);
                }
                
                /* Override inline VS Code styles injected in the HTML */
                [style*="var(--vscode-editor-inactiveSelectionBackground)"] {
                    background-color: var(--rich-card) !important;
                    border: 1px solid var(--rich-border) !important;
                    box-shadow: var(--shadow-md) !important;
                    border-radius: var(--radius-lg) !important;
                    color: var(--rich-text) !important;
                    padding: 14px !important;
                }
                
                [style*="var(--vscode-button-background)"] {
                    background-color: var(--rich-btn) !important;
                    color: var(--rich-text) !important;
                    border: 1px solid var(--rich-border) !important;
                }
                
                [style*="var(--vscode-button-background)"]:hover {
                    background-color: var(--rich-blue) !important;
                    color: var(--rich-white) !important;
                    border-color: var(--rich-blue) !important;
                }
                
                [style*="var(--vscode-button-secondaryBackground)"] {
                    background-color: var(--rich-btn) !important;
                    color: var(--rich-text) !important;
                    border: 1px solid var(--rich-border) !important;
                }
                
                [style*="var(--vscode-button-secondaryBackground)"]:hover {
                    background-color: var(--rich-blue) !important;
                    color: var(--rich-white) !important;
                    border-color: var(--rich-blue) !important;
                }

                [style*="var(--vscode-editor-background)"] {
                    background-color: var(--rich-card) !important;
                    border-color: var(--rich-border) !important;
                    color: var(--rich-text) !important;
                }

                [style*="var(--vscode-editorWidget-background)"] {
                    background-color: var(--rich-btn) !important;
                    border-color: var(--rich-border) !important;
                }

                /* General overrides */
                a {
                    color: var(--rich-blue);
                }
                a:hover {
                    color: var(--rich-gold);
                }
                
                /* Badges */
                [style*="var(--vscode-charts-green)"] {
                    background-color: var(--rich-gold) !important;
                    color: var(--rich-bg) !important;
                }
                
                [style*="var(--vscode-badge-background)"] {
                    background-color: var(--rich-gold) !important;
                    color: var(--rich-bg) !important;
                    font-weight: bold;
                }
                
                [style*="var(--vscode-textLink-foreground)"] {
                    color: var(--rich-gold) !important;
                }
            
                </style>
        `;if(this.conflictState){let c=(this.conflictState.files||[]).map(w=>`
                <button class="btn" style="padding: 6px; font-size: 12px; display: flex; justify-content: space-between; align-items: center;" onclick="sendOpenFileCommand('${z(w.file)}')">
                    <span style="flex: 1; overflow: hidden; text-overflow: ellipsis; white-space: nowrap; direction: rtl; text-align: left;">&lrm;${z(w.file)}</span>
                    <span style="font-size: 10px; opacity: 0.8; flex-shrink: 0; background-color: var(--vscode-badge-background); color: var(--vscode-badge-foreground); padding: 2px 4px; border-radius: 2px;">${z(w.state)}</span>
                </button>
            `).join("");return`<!DOCTYPE html>
            <html lang="en">
            <head>
                <meta charset="UTF-8">
                <meta name="viewport" content="width=device-width, initial-scale=1.0">
                <title>Ricwiz Conflict</title>
                ${a}
            </head>
            <body>
                <div style="text-align: center; margin-bottom: 12px; margin-top: 8px;">
                    <img src="${e}" alt="Ricwiz Logo" style="width: 80px; height: 80px; opacity: 0.9;" />
                </div>
                <div style="background-color: var(--vscode-editorError-background); color: var(--vscode-editorError-foreground); padding: 12px; border-radius: 4px; margin-bottom: 12px; text-align: center;">
                    <div style="font-size: 14px; font-weight: bold; margin-bottom: 8px;">\u26A0 MERGE CONFLICT</div>
                    <div style="font-size: 11px; margin-bottom: 12px; opacity: 0.9;">
                        Merging <b>${z(this.conflictState.sourceStr)}</b> into <b>${z(this.conflictState.targetStr)}</b>.<br/>
                        Resolve the conflicts, then click below.
                    </div>
                    <div style="display: flex; flex-direction: column; gap: 6px;">
                        <button class="btn" style="background-color: var(--vscode-button-background); color: var(--vscode-button-foreground); justify-content: center;" onclick="sendCommand('conflict_commitAndContinue', null, this)">
                            \u2713 Commit & Continue
                        </button>
                        ${this.conflictState.deletionsCount>0?`
                            <button class="btn" style="background-color: var(--vscode-button-secondaryBackground); color: var(--vscode-button-secondaryForeground); justify-content: center;" onclick="sendCommand('conflict_resolveDeletions', null, this)">
                                \u2A2F Resolve Deletions (${this.conflictState.deletionsCount})
                            </button>
                        `:""}
                        <button class="btn" style="background-color: var(--vscode-button-secondaryBackground); color: var(--vscode-button-secondaryForeground); justify-content: center;" onclick="sendCommand('conflict_abortDeploy', null, this)">
                            \u2715 Abort Deploy
                        </button>
                    </div>
                </div>
                
                ${c?`
                    <div style="font-size: 11px; opacity: 0.7; margin: 8px 4px 4px 4px; text-transform: uppercase;">Conflicted Files</div>
                    <div style="display: flex; flex-direction: column; gap: 2px;">
                        ${c}
                    </div>
                `:""}

                <script>

                    const vscode = acquireVsCodeApi();
                    function sendCommand(cmd, args, element) {
                        vscode.postMessage({ command: cmd, args: args });
                    }
                    function sendCheckoutCommand(branchName, element) {
                        vscode.postMessage({ command: 'checkout', branch: branchName });
                    }
                    function sendOpenFileCommand(file, element) {
                        vscode.postMessage({ command: 'openFile', file: file });
                    }
                </script>
            </body>
            </html>`}if(g==="blame"){let c=this.blameDataCache;return`<!DOCTYPE html>
            <html lang="en">
            <head>
                <meta charset="UTF-8">
                <meta name="viewport" content="width=device-width, initial-scale=1.0">
                <title>Ricwiz Blame</title>
                ${a}
            </head>
            <body>
                <div style="display: flex; align-items: center; gap: 8px; margin-bottom: 16px; margin-top: 8px;">
                    <button class="btn" style="width: auto; padding: 4px 8px; background-color: var(--vscode-button-secondaryBackground); color: var(--vscode-button-secondaryForeground);" onclick="sendCommand('openDevTools', null, this)">\u2190 Back</button>
                    <div style="font-weight: bold; font-size: 13px; flex: 1; text-align: center;">Who to Blame</div>
                </div>

                ${c?`
                <div style="padding: 12px; background: var(--vscode-editor-background); border: 1px solid var(--vscode-widget-border); border-radius: 6px; margin-bottom: 12px;">
                    <div style="font-weight: bold; margin-bottom: 12px; font-size: 14px; text-align: center; color: var(--vscode-textLink-foreground); word-break: break-all;">
                        \u25A4 ${c.fileName}
                    </div>


                    <div style="margin-bottom: 20px;">
                        <div style="font-size: 11px; font-weight: bold; opacity: 0.8; text-transform: uppercase; margin-bottom: 8px;"><span class="icon" style="color: #0A84FF;">\u25F3</span> Local Git (Last Commits)</div>
                        <ul style="list-style-type: none; padding: 0; margin: 0; display: flex; flex-direction: column; gap: 8px;">
                            ${c.gitHistory&&c.gitHistory.length>0?c.gitHistory.map(w=>`
                                <li style="background: var(--vscode-editorWidget-background); border: 1px solid var(--vscode-widget-border); padding: 8px 10px; border-radius: 4px; border-left: 4px solid var(--vscode-gitDecoration-modifiedResourceForeground);">
                                    <div style="display: flex; justify-content: space-between; margin-bottom: 4px; align-items: center;">
                                        <strong style="font-size: 13px;">${w.author}</strong>
                                        <span style="opacity: 0.7; font-size: 11px;">${w.time}</span>
                                    </div>
                                    <div style="font-size: 12px; margin-bottom: 6px; opacity: 0.9; font-style: italic;">"${w.message}"</div>
                                    <div style="font-family: monospace; font-size: 10px; opacity: 0.6;">Commit: ${w.hash}</div>
                                </li>
                            `).join(""):'<li style="opacity:0.7; font-size: 12px;">No Git history found.</li>'}
                        </ul>
                    </div>

                    <div style="margin-bottom: 20px;">
                        <div style="font-size: 11px; font-weight: bold; opacity: 0.8; text-transform: uppercase; margin-bottom: 8px;"><span class="icon" style="color: #0A84FF;">\u2601</span> Salesforce Metadata</div>
                        <div style="display: flex; flex-direction: column; gap: 8px;">
                            <div style="background: var(--vscode-editorWidget-background); border: 1px solid var(--vscode-widget-border); padding: 8px 10px; border-radius: 4px; border-left: 4px solid var(--vscode-gitDecoration-addedResourceForeground);">
                                <div style="font-size: 10px; opacity: 0.7; text-transform: uppercase; margin-bottom: 2px;">Last Modified By</div>
                                <div style="font-weight: bold; font-size: 13px;">${c.sfAuthor}</div>
                                <div style="font-size: 11px; opacity: 0.7; margin-top: 2px;">${c.sfTime}</div>
                            </div>
                            ${c.sfCreatedBy!=="Unknown"&&c.sfCreatedBy!=="N/A"?`
                            <div style="background: var(--vscode-editorWidget-background); border: 1px solid var(--vscode-widget-border); padding: 8px 10px; border-radius: 4px; border-left: 4px solid var(--vscode-gitDecoration-addedResourceForeground);">
                                <div style="font-size: 10px; opacity: 0.7; text-transform: uppercase; margin-bottom: 2px;">Created By</div>
                                <div style="font-weight: bold; font-size: 13px;">${c.sfCreatedBy}</div>
                            </div>
                            `:""}
                        </div>
                    </div>

                    <div>
                        <div style="font-size: 11px; font-weight: bold; opacity: 0.8; text-transform: uppercase; margin-bottom: 8px;"><span class="icon" style="color: #FFD60A;">\u26B2</span> Setup Audit Trail (Recent)</div>
                        <ul style="list-style-type: none; padding: 0; margin: 0; display: flex; flex-direction: column; gap: 8px;">
                            ${c.auditHistory&&c.auditHistory.length>0?c.auditHistory.map(w=>`
                                <li style="background: var(--vscode-editorWidget-background); border: 1px solid var(--vscode-widget-border); padding: 8px 10px; border-radius: 4px; border-left: 4px solid var(--vscode-gitDecoration-untrackedResourceForeground);">
                                    <div style="display: flex; justify-content: space-between; margin-bottom: 4px; align-items: center;">
                                        <strong style="font-size: 13px;">${w.author}</strong>
                                        <span style="opacity: 0.7; font-size: 11px;">${w.time}</span>
                                    </div>
                                    <div style="font-size: 12px; font-weight: 500; margin-bottom: 4px;">${w.action}</div>
                                    <div style="font-size: 11px; opacity: 0.7; font-style: italic; background: var(--vscode-editor-background); padding: 4px; border-radius: 3px;">${w.display}</div>
                                </li>
                            `).join(""):'<li style="opacity:0.7; font-size: 12px;">No recent setup changes found in Audit Trail.</li>'}
                        </ul>
                    </div>
                </div>
                `:`
                <div style="text-align: center; padding: 20px; opacity: 0.7;">
                    No blame data available. Make sure you have a file open in the editor.
                </div>
                `}

                <script>

                    const vscode = acquireVsCodeApi();
                    function sendCommand(cmd, args, element) {
                        vscode.postMessage({ command: cmd, args: args });
                    }
                    function sendCheckoutCommand(branchName, element) {
                        vscode.postMessage({ command: 'checkout', branch: branchName });
                    }
                    function sendOpenFileCommand(file, element) {
                        vscode.postMessage({ command: 'openFile', file: file });
                    }
                </script>
            </body>
            </html>`}if(g==="jira"){let c=this.jiraDataCache,w=c?.ticketId||"Jira",b=c?.summary||"No Title",y=c?.description||"No description provided.",x=c?.relatedBranches||[];return`<!DOCTYPE html>
            <html lang="en">
            <head>
                <meta charset="UTF-8">
                <meta name="viewport" content="width=device-width, initial-scale=1.0">
                <title>Ricwiz Jira Details</title>
                ${a}
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
                    <button class="icon-button" onclick="sendCommand('setPage', 'main', this)" style="font-weight: bold; font-size: 16px;" title="Back">\u2B9C</button>
                    <span style="font-weight: 600; font-size: 13px;">${w} Details</span>
                </div>
                
                <div class="card" style="padding: 16px;">
                    <div class="jira-title">${z(b)}</div>
                    <div class="jira-desc">${z(y)}</div>
                    
                    ${x.length>0?`
                        <div style="margin-top: 16px; border-top: 1px solid var(--vscode-panel-border); padding-top: 12px;">
                            <div style="font-size: 11px; opacity: 0.7; margin-bottom: 8px; text-transform: uppercase; font-weight: bold;"><span class="icon" style="color: #32D74B;">\u2387</span> Related Branches & MRs</div>
                            <div style="display: flex; flex-direction: column; gap: 4px;">
                                ${x.map(R=>{let I="";R.pipelineStatus==="running"?I="\u{1F7E1}":R.pipelineStatus==="success"?I="\u{1F7E2}":R.pipelineStatus==="failed"?I="\u{1F534}":(R.pipelineStatus==="canceled"||R.pipelineStatus==="skipped")&&(I="\u26AA");let T="";return R.pipelineStatus==="failed"&&R.projectPath&&R.pipelineId&&(T=`onclick="event.stopPropagation(); sendCommand('showPipelineLogs', { projectPath: '${R.projectPath}', pipelineId: ${R.pipelineId} });" style="cursor: pointer;"`),`
                                    <div class="btn" style="padding: 6px 10px; font-size: 12px; display: flex; justify-content: space-between; align-items: center; background-color: var(--vscode-button-secondaryBackground); color: var(--vscode-button-secondaryForeground); border-radius: 4px;" onclick="sendCheckoutCommand('${z(R.name)}', this)" title="Checkout ${z(R.name)}">
                                        <div style="display: flex; align-items: center; gap: 6px; overflow: hidden;">
                                            <span style="overflow: hidden; text-overflow: ellipsis; white-space: nowrap; font-weight: bold;">${z(R.name)}</span>
                                        </div>
                                        <div style="display: flex; gap: 6px; align-items: center;">
                                            ${I?`<span title="Pipeline: ${R.pipelineStatus}" style="font-size: 11px;" ${T}>${I}</span>`:""}
                                            ${R.mrUrl?`<span onclick="event.stopPropagation(); sendCommand('openExternal', '${R.mrUrl}');" title="Open Merge Request" style="cursor: pointer; font-size: 12px;">\u{1F517}</span>`:""}
                                            ${R.isMerged?'<span style="background-color: var(--vscode-charts-green); color: white; border-radius: 3px; padding: 2px 6px; font-size: 10px; font-weight: bold;" title="Merged to target env">MERGED</span>':""}
                                        </div>
                                    </div>
                                    `}).join("")}
                            </div>
                        </div>
                    `:""}
                    
                <div style="display: flex; gap: 4px; margin-top: 16px;">
                    <button class="btn" style="flex: 1; background-color: var(--vscode-button-secondaryBackground); border-radius: 4px;" onclick="sendCommand('changeJiraStatus', null, this)">
                        <span class="icon" style="color: #32D74B;">\u27F3</span> Change Status
                    </button>
                    <button class="btn" style="flex: 1; background-color: var(--vscode-button-secondaryBackground); border-radius: 4px;" onclick="sendCommand('addJiraComment', null, this)">
                        <span class="icon" style="color: #64D2FF;">\u2709</span> Add Comment
                    </button>
                    <button class="btn" style="flex: 1; background-color: var(--vscode-button-secondaryBackground); border-radius: 4px;" onclick="sendCommand('addJiraLabel', null, this)">
                        <span class="icon" style="color: #BF5AF2;">\u2637</span> Add Label
                    </button>
                    ${c?.url?`
                    <button class="btn" style="flex: 1; background-color: var(--vscode-button-secondaryBackground); border-radius: 4px;" onclick="sendCommand('openExternal', '${c.url}', this)">
                        <span class="icon" style="color: #0A84FF;">\u2388</span> Open Browser
                    </button>
                    `:""}
                </div>
                </div>

                <script>

                    const vscode = acquireVsCodeApi();
                    function sendCommand(cmd, args, element) {
                        vscode.postMessage({ command: cmd, args: args });
                    }
                    function sendCheckoutCommand(branchName, element) {
                        vscode.postMessage({ command: 'checkout', branch: branchName });
                    }
                    function sendOpenFileCommand(file, element) {
                        vscode.postMessage({ command: 'openFile', file: file });
                    }
                </script>
            </body>
            </html>`}if(g==="dashboard"){let c=this.dashboardDataCache||{queries:[],selectedIndex:0,results:[],error:null},w=c.queries.map((y,x)=>`
                <option value="${x}" ${x===c.selectedIndex?"selected":""}>${z(y.name)}</option>
            `).join(""),b=c.error?`
                <div style="color: var(--vscode-errorForeground); padding: 12px; text-align: center; background: var(--vscode-editorError-background); border-radius: 4px;">
                    \u26A0 ${z(c.error)}
                </div>
            `:c.results.length===0?`
                <div style="padding: 20px; text-align: center; opacity: 0.7;">No tickets found for this query.</div>
            `:`
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
                        ${c.results.map(y=>`
                            <tr style="border-bottom: ${y.detailedBranches&&y.detailedBranches.length>0?"none":"1px solid var(--vscode-panel-border)"}; cursor: pointer;" class="tr-hover" onclick="sendCommand('openJiraDetailsForId', '${z(y.key)}', this)">
                                <td style="padding: 6px; font-weight: bold; color: var(--vscode-textLink-foreground); white-space: nowrap;">${z(y.key)}</td>
                                <td style="padding: 6px; overflow: hidden; text-overflow: ellipsis; max-width: 150px; white-space: nowrap;" title="${z(y.summary)}">${z(y.summary)}</td>
                                <td style="padding: 6px; white-space: nowrap;">
                                    <span style="background: var(--vscode-badge-background); color: var(--vscode-badge-foreground); padding: 2px 4px; border-radius: 3px; font-size: 9px;">${z(y.status)}</span>
                                </td>
                                <td style="padding: 6px; white-space: nowrap; text-align: center;">
                                    ${y.detailedBranches?"":y.branch?`
                                        <button class="icon-button" style="background-color: var(--vscode-button-secondaryBackground); color: var(--vscode-button-secondaryForeground); font-size: 10px; padding: 2px 6px;" title="Checkout ${z(y.branch)}" onclick="event.stopPropagation(); sendCommand('checkout', { branch: '${z(y.branch)}' })">
                                            \u2387 Checkout
                                        </button>
                                    `:`
                                        <button class="icon-button" style="background-color: var(--vscode-button-background); color: var(--vscode-button-foreground); font-size: 10px; padding: 2px 6px;" title="Create Branch for ${z(y.key)}" onclick="event.stopPropagation(); sendCommand('createBranchForTicket', '${z(y.key)}')">
                                            + Create
                                        </button>
                                    `}
                                </td>
                            </tr>
                            ${y.detailedBranches&&y.detailedBranches.length>0?`
                            <tr style="border-bottom: 1px solid var(--vscode-panel-border);">
                                <td colspan="4" style="padding: 0 6px 8px 6px;">
                                    <div style="display: flex; flex-direction: column; gap: 4px; padding-left: 8px; border-left: 2px solid var(--vscode-editorIndentGuide-activeBackground1);">
                                        ${y.detailedBranches.map(x=>{let R="";x.pipelineStatus==="running"?R="\u{1F7E1}":x.pipelineStatus==="success"?R="\u{1F7E2}":x.pipelineStatus==="failed"?R="\u{1F534}":x.pipelineStatus==="canceled"&&(R="\u26AA");let I="";return x.pipelineStatus==="failed"&&x.projectPath&&x.pipelineId&&(I=`onclick="event.stopPropagation(); sendCommand('showPipelineLogs', { projectPath: '${x.projectPath}', pipelineId: ${x.pipelineId} });" style="cursor: pointer;"`),`
                                            <div style="display: flex; justify-content: space-between; align-items: center; font-size: 10px; background: var(--vscode-editor-background); padding: 2px 6px; border-radius: 3px;">
                                                <div style="display: flex; align-items: center; gap: 6px; overflow: hidden; cursor: pointer; flex: 1;" onclick="sendCheckoutCommand('${z(x.name)}', this)" title="Checkout ${z(x.name)}">
                                                    <span style="overflow: hidden; text-overflow: ellipsis; white-space: nowrap;">${z(x.name)}</span>
                                                    ${R?`<span title="Pipeline: ${x.pipelineStatus}" ${I}>${R}</span>`:""}
                                                </div>
                                                <div style="display: flex; gap: 6px; align-items: center;">
                                                    ${x.mrUrl?`<span onclick="event.stopPropagation(); sendCommand('openExternal', '${x.mrUrl}');" title="Open Merge Request" style="cursor: pointer;">\u{1F517}</span>`:""}
                                                    ${x.isMerged?'<span style="background-color: var(--vscode-charts-green); color: white; border-radius: 3px; padding: 1px 4px; font-size: 8px; font-weight: bold;">MERGED</span>':""}
                                                </div>
                                            </div>
                                            `}).join("")}
                                    </div>
                                </td>
                            </tr>
                            `:""}
                        `).join("")}
                    </tbody>
                </table>
            `;return`<!DOCTYPE html>
            <html lang="en">
            <head>
                <meta charset="UTF-8">
                <meta name="viewport" content="width=device-width, initial-scale=1.0">
                <title>Ricwiz Ticket Dashboard</title>
                ${a}
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
                    <button class="icon-button" onclick="sendCommand('setPage', 'main', this)" style="font-weight: bold; font-size: 16px;" title="Back">\u2B9C</button>
                    <span style="font-weight: 600; font-size: 13px; flex: 1;">Ticket Dashboard</span>
                    <button class="icon-button" onclick="sendCommand('refreshDashboard', null, this)" title="Refresh">\u27F3</button>
                </div>
                
                ${c.queries.length>0?`
                <div style="margin-bottom: 12px;">
                    <select id="querySelect" onchange="sendCommand('switchDashboardQuery', this.value)">
                        ${w}
                    </select>
                </div>
                <div style="margin-bottom: 12px; display: flex; align-items: center; gap: 6px;">
                    <input type="checkbox" id="showBranchesCheck" ${this.dashboardShowBranches?"checked":""} onchange="sendCommand('toggleDashboardBranches', this.checked)" style="margin: 0; cursor: pointer;">
                    <label for="showBranchesCheck" style="font-size: 11px; cursor: pointer;">Show all Branches (MRs & Pipelines)</label>
                </div>
                `:`
                <div style="padding: 12px; opacity: 0.7; text-align: center;">No queries defined in settings.</div>
                `}

                <div style="background: var(--vscode-editor-background); border: 1px solid var(--vscode-panel-border); border-radius: 4px; overflow-x: auto; overflow-y: auto; flex: 1; display: flex; flex-direction: column;">
                    ${b}
                </div>

                <script>

                    const vscode = acquireVsCodeApi();
                    function sendCommand(cmd, args, element) {
                        vscode.postMessage({ command: cmd, args: args });
                    }
                    function sendCheckoutCommand(branchName, element) {
                        vscode.postMessage({ command: 'checkout', branch: branchName });
                    }
                    function sendOpenFileCommand(file, element) {
                        vscode.postMessage({ command: 'openFile', file: file });
                    }
                </script>
            </body>
            </html>`}if(g==="devtools")return`<!DOCTYPE html>
            <html lang="en">
            <head>
                <meta charset="UTF-8">
                <meta name="viewport" content="width=device-width, initial-scale=1.0">
                <title>Ricwiz DevTools</title>
                ${a}
            </head>
            <body>
                <div style="display: flex; align-items: center; gap: 8px; margin-bottom: 16px; margin-top: 8px;">
                    <button class="btn" style="width: auto; padding: 4px 8px; background-color: var(--vscode-button-secondaryBackground); color: var(--vscode-button-secondaryForeground);" onclick="sendCommand('openMain', null, this)">\u2190 Back</button>
                    <div style="font-weight: bold; font-size: 13px; flex: 1; text-align: center;">Developer Utilities</div>
                </div>

                <div style="display: flex; flex-direction: column; gap: 8px;">
                    <button class="btn" title="Generate Salesforce package.xml from git diff" onclick="sendCommand('generatePackageXml', null, this)">
                        <span class="icon" style="color: #FF9F0A;">\u25A2</span> Auto Package.xml
                    </button>
                    
                    <button class="btn" title="Generate destructiveChanges.xml for deleted files" onclick="sendCommand('generateDestructiveChanges', null, this)">
                        <span class="icon" style="color: #FF453A;">\u2A2F</span> Auto DestructiveChanges
                    </button>
        
                    <button class="btn" title="Deploy the generated package to Salesforce" onclick="sendCommand('deployPackage', null, this)">
                        <span class="icon" style="color: #0A84FF;">\u2601</span> Deploy Package
                    </button>

                    <button class="btn" title="Smart run modified Apex Test classes" onclick="sendCommand('runSmartTests', null, this)">
                        <span class="icon" style="color: #BF5AF2;">\u2697</span> Smart Test Runner
                    </button>

                    <button class="btn" title="Import data using Salesforce CLI" onclick="sendCommand('importData', null, this)">
                        <span class="icon" style="color: #64D2FF;">\u21A7</span> Import Data
                    </button>

                    <div class="separator" style="margin: 4px 0;"></div>

                    <button class="btn" title="Find and group all files modified in a specific ticket" onclick="sendCommand('listTicketFiles', null, this)">
                        <span class="icon" style="color: #64D2FF;">\u2630</span> List Ticket Files
                    </button>

                    <button class="btn" title="Reset Salesforce source tracking" onclick="sendCommand('resetTracking', null, this)">
                        <span class="icon" style="color: #FF453A;">\u232B</span> Reset Tracking
                    </button>

                    <button class="btn" title="Extract metadata components quickly from Salesforce" onclick="sendCommand('extractComponent', null, this)">
                        <span class="icon" style="color: #0A84FF;">\u2601</span> Extract Component
                    </button>

                    <button class="btn" title="Deploy the current open file to multiple orgs simultaneously" onclick="sendCommand('deployMultiOrg', null, this)">
                        <span class="icon" style="color: #0A84FF;">\u21EA</span> Deploy to Multi-Org
                    </button>

                    <button class="btn" title="Capture admin changes safely" onclick="sendCommand('captureAdminChanges', null, this)">
                        <span class="icon" style="color: #FFD60A;">\u26B2</span> Capture Admin Changes
                    </button>
                    
                    <button class="btn" title="Discover who last modified the current file in Git and Salesforce" onclick="sendCommand('whoToBlame', null, this)" style="background-color: var(--vscode-button-hoverBackground);">
                        <span class="icon">\u2315</span> Who to Blame
                    </button>
                </div>
                
                <script>

                    const vscode = acquireVsCodeApi();
                    function sendCommand(cmd, args, element) {
                        vscode.postMessage({ command: cmd, args: args });
                    }
                    function sendCheckoutCommand(branchName, element) {
                        vscode.postMessage({ command: 'checkout', branch: branchName });
                    }
                    function sendOpenFileCommand(file, element) {
                        vscode.postMessage({ command: 'openFile', file: file });
                    }
                </script>
            </body>
            </html>`;let n=o.find(c=>c.name===i),r="";n&&(n.pipelineStatus==="running"?r="\u{1F7E1}":n.pipelineStatus==="success"?r="\u{1F7E2}":n.pipelineStatus==="failed"?r="\u{1F534}":(n.pipelineStatus==="canceled"||n.pipelineStatus==="skipped")&&(r="\u26AA"));let d=n?n.mrUrl:void 0,u=o.filter(c=>c.name!==i),f=i?`<div style="background-color: var(--vscode-editor-inactiveSelectionBackground); padding: 10px; border-radius: 6px; margin-bottom: 16px; border: 1px solid var(--vscode-panel-border); box-shadow: 0 2px 4px rgba(0,0,0,0.1); position: relative;">
                ${this.ticketTitleCache&&this.ticketStatusCache?`
                <div style="position: absolute; top: 6px; right: 6px; z-index: 10; cursor: pointer; font-size: 9px; padding: 2px 6px; border-radius: 4px; background-color: var(--vscode-button-secondaryBackground); border: 1px solid var(--vscode-panel-border); opacity: 0.9; font-weight: bold; text-transform: uppercase; display: flex; align-items: center; gap: 4px;" onclick="sendCommand('changeJiraStatus', null, this)" title="Update Jira Status">
                    <span>\u270E</span><span>${z(this.ticketStatusCache)}</span>
                </div>
                `:""}
                <div style="font-size: 10px; opacity: 0.7; margin-bottom: 4px; display: flex; align-items: center; justify-content: center; gap: 4px; text-transform: uppercase;">
                    <span>Current Ticket / Branch</span>
                    <button class="copy-btn" onclick="sendCommand('copyBranch', null, this)" title="Copy branch name to clipboard">\u2398</button>
                </div>
                <div style="font-weight: bold; font-size: 14px; word-break: break-all; text-align: center; color: var(--vscode-textLink-foreground); display: flex; justify-content: center; align-items: center; gap: 6px;">
                    <span>${z(i)}</span>
                    ${r?`<span title="Pipeline: ${n.pipelineStatus}" style="font-size: 12px;">${r}</span>`:""}
                    ${d?`<span onclick="event.stopPropagation(); sendCommand('openExternal', '${d}');" title="Open Merge Request" style="cursor: pointer; font-size: 12px;">\u{1F517}</span>`:""}
                    ${this.currentBranchIsMergedCache?'<span style="background-color: var(--vscode-charts-green); color: white; border-radius: 3px; padding: 1px 4px; font-size: 10px; font-weight: bold;" title="Merged to target env">MERGED</span>':""}
                </div>
                ${this.ticketTitleCache?`<div style="font-size: 12px; margin-top: 6px; text-align: center; opacity: 0.9; font-style: italic;">${z(this.ticketTitleCache)}</div>`:""}
                ${u.length>0?`
                    <div style="margin-top: 10px; border-top: 1px solid var(--vscode-panel-border); padding-top: 10px;">
                        <div style="font-size: 10px; opacity: 0.7; margin-bottom: 6px; text-transform: uppercase; text-align: center;">Sister Branches</div>
                        <div style="display: flex; flex-direction: column; gap: 4px;">
                            ${u.map(c=>{let w="";c.pipelineStatus==="running"?w="\u{1F7E1}":c.pipelineStatus==="success"?w="\u{1F7E2}":c.pipelineStatus==="failed"?w="\u{1F534}":(c.pipelineStatus==="canceled"||c.pipelineStatus==="skipped")&&(w="\u26AA");let b="";return c.pipelineStatus==="failed"&&c.projectPath&&c.pipelineId&&(b=`onclick="event.stopPropagation(); sendCommand('showPipelineLogs', { projectPath: '${c.projectPath}', pipelineId: ${c.pipelineId} });" style="cursor: pointer;"`),`
                                <div class="btn" style="padding: 6px 8px; font-size: 11px; display: flex; justify-content: space-between; align-items: center; background-color: var(--vscode-button-secondaryBackground); color: var(--vscode-button-secondaryForeground); border-radius: 4px; box-sizing: border-box; width: 100%;" onclick="sendCheckoutCommand('${z(c.name)}', this)" title="Checkout ${z(c.name)}">
                                    <div style="display: flex; align-items: center; gap: 4px; overflow: hidden;">
                                        <span style="overflow: hidden; text-overflow: ellipsis; white-space: nowrap; font-weight: bold;">${z(c.name)}</span>
                                    </div>
                                    <div style="display: flex; gap: 4px; align-items: center;">
                                        ${w?`<span title="Pipeline: ${c.pipelineStatus}" style="font-size: 10px;" ${b}>${w}</span>`:""}
                                        ${c.mrUrl?`<span onclick="event.stopPropagation(); sendCommand('openExternal', '${c.mrUrl}');" title="Open Merge Request" style="cursor: pointer; font-size: 10px;">\u{1F517}</span>`:""}
                                        ${c.isMerged?'<span style="background-color: var(--vscode-charts-green); color: white; border-radius: 3px; padding: 1px 4px; font-size: 9px; font-weight: bold;" title="Merged to target env">MERGED</span>':""}
                                    </div>
                                </div>`}).join("")}
                        </div>
                    </div>
                `:l.length>0?`
                    <div style="margin-top: 10px; border-top: 1px solid var(--vscode-panel-border); padding-top: 10px;">
                        <div style="font-size: 10px; opacity: 0.7; margin-bottom: 6px; text-transform: uppercase; text-align: center;">Recent Tickets</div>
                        <div style="display: flex; flex-direction: column; gap: 4px;">
                            ${l.map(c=>`
                                <div class="btn" style="padding: 6px 8px; font-size: 11px; display: flex; justify-content: space-between; align-items: center; background-color: var(--vscode-button-secondaryBackground); color: var(--vscode-button-secondaryForeground); border-radius: 4px; box-sizing: border-box; width: 100%;" onclick="sendCheckoutCommand('${z(c)}', this)" title="Checkout ${z(c)}">
                                    <span style="font-weight: bold; overflow: hidden; text-overflow: ellipsis; white-space: nowrap;">${z(c)}</span>
                                </div>
                            `).join("")}
                        </div>
                    </div>
                `:""}
                <div style="display: flex; gap: 6px; margin-top: 10px; justify-content: center;">
                    <button class="btn" style="width: auto; padding: 4px 10px; font-size: 11px; display: inline-flex; align-items: center; justify-content: center; gap: 5px; background-color: var(--vscode-button-secondaryBackground); border-radius: 4px; border: 1px solid var(--vscode-panel-border); cursor: pointer;" onclick="sendCommand('showJiraDetails', null, this)" title="View Jira Details"><span class="icon" style="font-size: 12px; color: #FF9F0A;">\u2691</span><span>Jira Details</span></button>
                    <button class="btn" style="width: auto; padding: 4px 10px; font-size: 11px; display: inline-flex; align-items: center; justify-content: center; gap: 5px; background-color: var(--vscode-button-secondaryBackground); border-radius: 4px; border: 1px solid var(--vscode-panel-border); cursor: pointer;" onclick="sendCommand('openDashboard', null, this)" title="View Ticket Dashboard"><span class="icon" style="font-size: 12px; color: #32D74B;">\u25A4</span><span>Dashboard</span></button>
                </div>
            </div>`:"";return`<!DOCTYPE html>
        <html lang="en">
        <head>
            <meta charset="UTF-8">
            <meta name="viewport" content="width=device-width, initial-scale=1.0">
            <title>Ricwiz</title>
            ${a}
        </head>
        <body>
            <div style="text-align: center; margin-bottom: 12px; margin-top: 8px;">
                <img src="${e}" alt="Ricwiz Logo" style="width: 80px; height: 80px; opacity: 0.9; filter: drop-shadow(0 2px 4px rgba(0,0,0,0.2));" />
            </div>

            <!-- SETTINGS & DEV TOOLS (Top Level) -->
            <div style="display: flex; gap: 8px; margin-bottom: 16px;">
                <button class="btn" style="flex: 1; justify-content: center; background-color: var(--vscode-button-secondaryBackground); border: 1px solid var(--vscode-panel-border); border-radius: 4px;" title="Developer Utilities" onclick="sendCommand('openDevTools', null, this)">
                    <span class="icon" style="color: #FFD60A;">\u26B2</span> Dev Tools
                </button>
                <button class="btn" style="flex: 1; justify-content: center; background-color: var(--vscode-button-secondaryBackground); border: 1px solid var(--vscode-panel-border); border-radius: 4px;" title="Extension Settings" onclick="sendCommand('openSettings', null, this)">
                    <span class="icon" style="color: #98989D;">\u2699</span> Settings
                </button>
            </div>

            <div style="display: flex; align-items: center; justify-content: space-between; margin-bottom: 6px; padding: 0 4px;">
                <div style="font-size: 11px; font-weight: bold; opacity: 0.8; text-transform: uppercase;">Workspace</div>
                <div style="display: flex; gap: 4px;">
                    <button class="copy-btn" onclick="sendCommand('manualRefresh', null, this)" title="Refresh branch status" style="font-size: 13px; padding: 2px 6px; opacity: 0.8; border: 1px solid var(--vscode-panel-border);">
                        <span class="icon" style="color: #32D74B; font-size: 14px;">\u27F3</span>
                    </button>
                    <button class="copy-btn" id="autoRefreshToggle" onclick="sendCommand('toggleAutoRefresh', null, this)" title="${this.autoRefreshEnabled?"Auto-refresh is ON \u2014 click to disable":"Auto-refresh is OFF \u2014 click to enable"}" style="font-size: 11px; padding: 2px 6px; border-radius: 3px; border: 1px solid var(--vscode-panel-border); ${this.autoRefreshEnabled?"opacity: 0.9; background-color: var(--vscode-button-secondaryBackground);":"opacity: 0.5;"}">
                        ${this.autoRefreshEnabled?"\u26A1 Auto":"\u23F8\uFE0F Auto"}
                    </button>
                </div>
            </div>

            ${f}


            ${p.length>0?`
                <div style="display: flex; gap: 4px; margin-bottom: 16px; flex-wrap: wrap; justify-content: center;">
                    ${p.map(c=>{let w=c.split("/").pop()?.toUpperCase()||c.toUpperCase();return`
                        <button class="btn" style="flex: 1; min-width: 25%; justify-content: center; padding: 6px 4px; font-size: 10px; font-weight: bold; background-color: var(--vscode-button-secondaryBackground); color: var(--vscode-button-secondaryForeground); border-radius: 4px;" onclick="sendCheckoutCommand('${z(c)}', this)" title="Checkout ${z(c)}">
                            ${z(w)}
                        </button>
                    `}).join("")}
                </div>
            `:""}

            <!-- PRIMARY ACTIONS CARD -->
            <div style="background-color: var(--vscode-editor-inactiveSelectionBackground); padding: 10px; border-radius: 6px; margin-bottom: 16px; border: 1px solid var(--vscode-panel-border); box-shadow: 0 2px 4px rgba(0,0,0,0.1);">
                <div style="font-size: 10px; opacity: 0.7; margin-bottom: 10px; text-transform: uppercase; font-weight: bold; text-align: center;">Ticket Workflow</div>
                
                <button class="btn" style="background-color: var(--vscode-button-background); color: var(--vscode-button-foreground); font-weight: bold; margin-bottom: 6px; border-radius: 4px; padding: 8px;" title="Generates the main and environment branches" onclick="sendCommand('createBranches', null, this)">
                    <span class="icon" style="color: #32D74B;">\u2387</span> Create Branches
                </button>

                <button class="btn" style="background-color: var(--vscode-button-secondaryBackground); margin-bottom: 6px; border-radius: 4px;" title="Sync environments and merge ticket" onclick="sendCommand('prepareDeploy', null, this)">
                    <span class="icon" style="color: #BF5AF2;">\u2928</span> Prepare Deploy
                </button>

                <div style="display: flex; gap: 4px; margin-bottom: 6px;">
                    <button class="btn" style="flex: 1; background-color: var(--vscode-button-secondaryBackground); border-radius: 4px;" title="Opens Merge Request pages in Browser" onclick="sendCommand('openMRs', null, this)">
                        <span class="icon" style="color: #0A84FF;">\u21EA</span> Open MRs
                    </button>
                    <button class="btn" style="width: auto; padding: 6px 12px; font-weight: bold; justify-content: center; background-color: var(--vscode-button-secondaryBackground); border-radius: 4px;" title="Open MRs in VS Code" onclick="sendCommand('openMRsVSCode', null, this)">
                        VS
                    </button>
                </div>

                <button class="btn" style="background-color: var(--vscode-button-secondaryBackground); border-radius: 4px;" title="Open Jira Ticket in Browser" onclick="sendCommand('openJira', null, this)">
                    <span class="icon" style="color: #FF9F0A;">\u2691</span> Open Jira
                </button>
            </div>

            <!-- SECONDARY ACTIONS CARD -->
            <div style="background-color: var(--vscode-editor-inactiveSelectionBackground); padding: 10px; border-radius: 6px; margin-bottom: 12px; border: 1px solid var(--vscode-panel-border); box-shadow: 0 2px 4px rgba(0,0,0,0.1);">
                <div style="font-size: 10px; opacity: 0.7; margin-bottom: 10px; text-transform: uppercase; font-weight: bold; text-align: center;">Git Operations</div>
                
                <button class="btn" style="margin-bottom: 6px; background-color: var(--vscode-button-secondaryBackground); border-radius: 4px;" title="Fetch and pull all branches of the current ticket" onclick="sendCommand('syncAll', null, this)">
                    <span class="icon" style="color: #32D74B;">\u27F3</span> Sync All
                </button>

                <button class="btn" style="margin-bottom: 6px; background-color: var(--vscode-button-secondaryBackground); border-radius: 4px;" title="Merge latest team changes from origin base into environment branches" onclick="sendCommand('updateBases', null, this)">
                    <span class="icon" style="color: #64D2FF;">\u21A7</span> Update from Base
                </button>

                <button class="btn" style="background-color: var(--vscode-button-secondaryBackground); border-radius: 4px;" title="Delete all branches of a ticket (local and remote)" onclick="sendCommand('deleteUnused', null, this)">
                    <span class="icon" style="color: #FF453A;">\u2A2F</span> Delete Unused Branches
                </button>
            </div>

            ${m}
            
            <script>

                    const vscode = acquireVsCodeApi();
                    function sendCommand(cmd, args, element) {
                        vscode.postMessage({ command: cmd, args: args });
                    }
                    function sendCheckoutCommand(branchName, element) {
                        vscode.postMessage({ command: 'checkout', branch: branchName });
                    }
                    function sendOpenFileCommand(file, element) {
                        vscode.postMessage({ command: 'openFile', file: file });
                    }
                </script>
        </body>
        </html>`}}});function $t(t){pe=t.secrets}async function Rt(t){if(!pe)throw new Error("SecretStorage is not initialized.");await pe.store("ricwiz.jiraApiToken",t)}async function zt(){if(!pe)throw new Error("SecretStorage is not initialized.");return await pe.get("ricwiz.jiraApiToken")}async function Pt(t){if(!pe)throw new Error("SecretStorage is not initialized.");await pe.store("ricwiz.gitlabApiToken",t)}async function Fe(){if(!pe)throw new Error("SecretStorage is not initialized.");return await pe.get("ricwiz.gitlabApiToken")}var pe,ke=P(()=>{"use strict"});var Te={};Ae(Te,{checkBranchExists:()=>we,checkRemoteBranchExists:()=>Tt,exec:()=>h,extractTicketSuggestion:()=>Ee,getCurrentBranch:()=>j,getWorkspaceCwd:()=>C,normalizeTicketId:()=>Et,promptForTicketId:()=>H,resolvePrefix:()=>Be,ricwizLogger:()=>U});function C(){let t=Se.workspace.workspaceFolders;if(t)return t[0].uri.fsPath}async function j(t){try{let{stdout:e}=await h("git branch --show-current",{cwd:t});return e.trim()}catch{return""}}function Be(t,e){if(!t.includes(e)){let i=t.match(/([A-Z]+-)\d+/i);if(i)return i[1].toUpperCase()}return e}function Ee(t,e,i=!1){let o=t.match(new RegExp(`(${e}\\d+)`,"i"));return o?o[1].toUpperCase():t.includes(e)&&!t.includes("-to-")?t.substring(t.indexOf(e)):i&&t.includes("-to-")?t.substring(t.indexOf(e)).split("-to-")[0]:""}function Et(t,e){let i=t.trim();return/^\d/.test(i)?`${e}${i}`.toUpperCase():i.toUpperCase()}async function H(t,e){let i=Se.workspace.getConfiguration("ricwiz"),o=e?.prefix??i.get("ticketPrefix","SFPSCA-"),s=await j(t),p=Be(s,o),l=e?.suggestedValue??Ee(s,p,e?.handleToSuffix),g=await Se.window.showInputBox({prompt:e?.prompt||"Enter the full ticket ID (e.g., SCPSCA-1234) or just the number",placeHolder:e?.placeHolder||"Ticket ID or number",value:l});return g?{ticketId:Et(g,p),currentBranch:s,prefix:p}:void 0}async function we(t,e){try{return await h(`git show-ref --verify --quiet refs/heads/${e}`,{cwd:t}),!0}catch{}return await Tt(t,e)}async function Tt(t,e){try{let{stdout:i}=await h(`git branch -r --list "*/${e}"`,{cwd:t});return i.trim().length>0}catch{return!1}}var Se,St,Bt,li,U,h,S=P(()=>{"use strict";Se=k(require("vscode")),St=k(require("child_process")),Bt=k(require("util")),li=Bt.promisify(St.exec),U=Se.window.createOutputChannel("Ricwiz"),h=async(t,e)=>{U.appendLine(`[EXEC] ${t}`);let i=await li(t,{maxBuffer:50*1024*1024,...e});return{stdout:i.stdout.toString(),stderr:i.stderr.toString()}}});var lt={};Ae(lt,{WorkflowContext:()=>M});var Ie,Mt,Qe,M,N=P(()=>{"use strict";Ie=k(require("vscode")),Mt=k(require("path")),Qe=k(require("fs")),M=class t{style;upstreamRemote;originRemote;ticketSourceBranch;ticketPrefix;branchPrefix;environments;static baseConfig=Ie.workspace.getConfiguration("ricwiz");activeProfile;profileName;constructor(e){this.activeProfile=e,this.profileName=e?.name;let i=t.baseConfig;this.style=e?.workflowStyle||i.get("workflowStyle","standard"),this.style==="multi-remote"?(this.upstreamRemote=e?.upstreamRemote||i.get("upstreamRemote","salesforce-master"),this.originRemote=e?.originRemote||i.get("originRemote","origin")):(this.upstreamRemote="origin",this.originRemote="origin"),this.ticketSourceBranch=e?.ticketSourceBranch||i.get("ticketSourceBranch","main"),this.ticketPrefix=e?.ticketPrefix||i.get("ticketPrefix","SFPSCA-"),this.branchPrefix=e?.branchPrefix??i.get("branchPrefix","");let o=[{name:"Qual",sourceBranch:"quality"},{name:"Val",sourceBranch:"validation"},{name:"Prod",sourceBranch:"main"}];this.environments=e?.environments||i.get("environments",o)}getConfig(e,i){return this.activeProfile&&this.activeProfile[e]!==void 0?this.activeProfile[e]:t.baseConfig.get(e,i)}static async initialize(e,i){let o=t.baseConfig.get("profiles",[]),s=Mt.join(e,"ricwiz.json");if(Qe.existsSync(s))try{let p=Qe.readFileSync(s,"utf-8"),l=JSON.parse(p);l&&Array.isArray(l.profiles)&&(o=[...o,...l.profiles])}catch(p){Ie.window.showErrorMessage(`Ricwiz: Error parsing ricwiz.json: ${p.message}`)}if(o.length>0){if(!i?.forcePrompt)try{let{exec:m}=(S(),F(Te)),{stdout:a}=await m("git branch --show-current",{cwd:e}),n=a.trim(),r=n;n.includes("-to-")&&(r=n.split("-to-")[0]);let{stdout:d}=await m(`git config branch.${r}.ricwiz-profile`,{cwd:e}),u=d.trim();if(u){let f=o.find(c=>c.name===u);if(f)return new t(f)}}catch{}if(i?.skipPrompt)return new t;let p=o.map(m=>m.name),l=await Ie.window.showQuickPick(p,{placeHolder:"Ricwiz: Select Workflow Profile",ignoreFocusOut:!0});if(!l)return;let g=o.find(m=>m.name===l);return new t(g)}return new t}buildUpstreamPath(e){return e.includes("/")?e:`${this.upstreamRemote}/${e}`}getFetchRemote(e){return e.includes("/")?e.split("/")[0]:this.upstreamRemote}getFetchBranch(e){return e.includes("/")?e.substring(e.indexOf("/")+1):e}}});async function Dt(){let t=C();if(!t){V.window.showErrorMessage("Ricwiz: Open a workspace that is a Git repository.");return}let e=await M.initialize(t,{skipPrompt:!0}),i=e?e.ticketSourceBranch:V.workspace.getConfiguration("ricwiz").get("ticketSourceBranch","main"),o=e?e.originRemote:"origin";await V.window.withProgress({location:V.ProgressLocation.Notification,title:`Ricwiz: Finding deleted files compared to ${o}/${i}...`,cancellable:!1},async()=>{try{let{stdout:s}=await h(`git diff --name-only --diff-filter=D ${o}/${i}...HEAD`,{cwd:t}),p=s.split(`
`).map(u=>u.trim()).filter(u=>u.length>0);if(p.length===0){V.window.showInformationMessage(`Ricwiz: No deleted files found compared to ${o}/${i}.`);return}let l={},g=(u,f)=>{l[u]||(l[u]=[]),l[u].includes(f)||l[u].push(f)};for(let u of p){let f=u.replace(/\\/g,"/");if(f.includes("/classes/")){let c=f.match(/\/classes\/([^/.]+)\.cls/);c&&g("ApexClass",c[1])}else if(f.includes("/triggers/")){let c=f.match(/\/triggers\/([^/.]+)\.trigger/);c&&g("ApexTrigger",c[1])}else if(f.includes("/lwc/")){let c=f.match(/\/lwc\/([^/]+)\//);c&&g("LightningComponentBundle",c[1])}else if(f.includes("/aura/")){let c=f.match(/\/aura\/([^/]+)\//);c&&g("AuraDefinitionBundle",c[1])}else if(f.includes("/objects/")&&f.includes("/fields/")){let c=f.match(/\/objects\/([^/]+)\//),w=f.match(/\/fields\/([^/.]+)\.field/);c&&w&&g("CustomField",`${c[1]}.${w[1]}`)}else if(f.includes("/objects/")){let c=f.match(/\/objects\/([^/.]+)\.object/);c&&g("CustomObject",c[1])}else if(f.includes("/layouts/")){let c=f.match(/\/layouts\/([^/.]+)\.layout/);c&&g("Layout",c[1])}else if(f.includes("/flows/")){let c=f.match(/\/flows\/([^/.]+)\.flow/);c&&g("Flow",c[1])}else if(f.includes("/permissionsets/")){let c=f.match(/\/permissionsets\/([^/.]+)\.permissionset/);c&&g("PermissionSet",c[1])}else if(f.includes("/profiles/")){let c=f.match(/\/profiles\/([^/.]+)\.profile/);c&&g("Profile",c[1])}else if(f.includes("/customMetadata/")){let c=f.match(/\/customMetadata\/([^/.]+)\.md/);c&&g("CustomMetadata",c[1])}else if(f.includes("/flexipages/")){let c=f.match(/\/flexipages\/([^/.]+)\.flexipage/);c&&g("FlexiPage",c[1])}}if(Object.keys(l).length===0){V.window.showInformationMessage("Ricwiz: Found deleted files in Git, but none mapped to recognizable Salesforce metadata.");return}let m=`<?xml version="1.0" encoding="UTF-8"?>
<Package xmlns="http://soap.sforce.com/2006/04/metadata">
`;for(let u of Object.keys(l).sort()){m+=`    <types>
`;for(let f of l[u].sort())m+=`        <members>${f}</members>
`;m+=`        <name>${u}</name>
    </types>
`}m+=`    <version>58.0</version>
</Package>`;let a=Ye.join(t,"destructiveChanges");ve.existsSync(a)||ve.mkdirSync(a);let n=Ye.join(a,"destructiveChanges.xml"),r=Ye.join(a,"package.xml");ve.writeFileSync(n,m,"utf8"),ve.existsSync(r)||ve.writeFileSync(r,`<?xml version="1.0" encoding="UTF-8"?>
<Package xmlns="http://soap.sforce.com/2006/04/metadata">
    <version>58.0</version>
</Package>`,"utf8");let d=await V.workspace.openTextDocument(n);await V.window.showTextDocument(d),V.window.showInformationMessage("Ricwiz: destructiveChanges.xml generated successfully!")}catch(s){V.window.showErrorMessage(`Ricwiz: Error generating destructive changes: ${s.message}`)}})}var V,Ye,ve,Lt=P(()=>{"use strict";V=k(require("vscode")),Ye=k(require("path")),ve=k(require("fs"));S();N()});async function At(){let t=C();if(!t)return;let e=await M.initialize(t,{skipPrompt:!0}),i=e?e.ticketSourceBranch:ce.workspace.getConfiguration("ricwiz").get("ticketSourceBranch","main"),o=e?e.originRemote:"origin";await ce.window.withProgress({location:ce.ProgressLocation.Notification,title:"Ricwiz: Finding Apex Tests to run...",cancellable:!1},async()=>{try{let{stdout:s}=await h(`git diff --name-status ${o}/${i}...HEAD`,{cwd:t}),p=s.split(`
`).map(u=>u.trim()).filter(u=>u.length>0),l=new Set,g=new Set;for(let u of p){let f=u.split(/\s+/);if(f[0].startsWith("D"))continue;let c=f[1];if(c&&c.endsWith(".cls")){let w=c.match(/\/classes\/([^/.]+)\.cls/);if(w){let b=w[1];b.toLowerCase().endsWith("test")?l.add(b):g.add(b)}}}for(let u of g)l.add(`${u}Test`);if(l.size===0){ce.window.showInformationMessage("Ricwiz: No Apex Classes were modified in this branch.");return}let m=Array.from(l).map(u=>({label:`$(beaker) ${u}`,description:"Apex Test Class"})),a=await ce.window.showQuickPick(m,{canPickMany:!0,title:"Select Test Classes to Run",placeHolder:"Select tests..."});if(!a||a.length===0)return;let r=`sf apex run test -n ${a.map(u=>u.label.replace("$(beaker) ","").trim()).join(",")} -r human -w 30`,d=ce.window.createTerminal("Ricwiz: Smart Tests");d.show(),d.sendText(r)}catch(s){ce.window.showErrorMessage(`Ricwiz: Error finding tests: ${s.message}`)}})}var ce,Ft=P(()=>{"use strict";ce=k(require("vscode"));S();N()});var Ce,It=P(()=>{"use strict";Ce=class{static isValidShellArg(e){return e?/^[a-zA-Z0-9\-_/.]+$/.test(e):!1}}});async function Ot(t){let e=C();if(!e){A.window.showErrorMessage("Open a folder or workspace that is a Git repository.");return}let i=await M.initialize(e,{forcePrompt:!0});if(!i)return;let o=typeof t=="string"?t:void 0,s=await H(e,{prefix:i.ticketPrefix,suggestedValue:o});if(!s){A.window.showErrorMessage("Branch creation cancelled: Ticket not provided.");return}let{ticketId:p}=s,l=i.environments,g="all",m=[{label:"Create Main Branch & Environments",description:"Creates the main ticket branch and all environment branches",value:"all"},{label:"Create Main Branch Only",description:"Creates only the main ticket branch (skips environments)",value:"mainOnly"},{label:"Create Environments Only",description:"Creates only the environment branches (skip main branch)",value:"envs"}];if(l.length>0){let d=await A.window.showQuickPick(m,{placeHolder:"Ricwiz: What do you want to create?",ignoreFocusOut:!0});if(!d)return;g=d.value}let a=i.ticketSourceBranch;if(g==="all"||g==="mainOnly"){let d=[];try{let{stdout:w}=await h('git branch --all --format="%(refname:short)"',{cwd:e});d=w.split(`
`).map(b=>b.trim()).filter(b=>b&&b!=="origin"),d=[...new Set(d)]}catch{}let u=A.window.createQuickPick();u.title="Ricwiz: Ticket Source Branch",u.placeholder="Confirm or change the source branch for this ticket",u.value=i.ticketSourceBranch,u.ignoreFocusOut=!0;let f=()=>{let w=u.value.trim(),b=[];w&&b.push({label:w,description:"Use typed branch"}),b.push(...d.map(y=>({label:y}))),u.items=b};u.onDidChangeValue(f),f();let c=await new Promise(w=>{u.onDidAccept(()=>{let b=u.selectedItems[0];w(b?b.label:u.value),u.hide()}),u.onDidHide(()=>w(void 0)),u.show()});if(!c){A.window.showInformationMessage("Branch creation cancelled.");return}a=c.trim()}let n="";if(i.branchPrefix){let d=await A.window.showInputBox({prompt:"Ricwiz: Branch Prefix (leave empty to not use a prefix)",placeHolder:"e.g. CRC-R19-",value:i.branchPrefix,ignoreFocusOut:!0});if(d===void 0){A.window.showInformationMessage("Branch creation cancelled.");return}n=d.trim()}let r=n?`${n}${p}`:p;if(!Ce.isValidShellArg(r)){A.window.showErrorMessage(`Invalid format for ticket ID: ${r}`);return}if(!Ce.isValidShellArg(a)){A.window.showErrorMessage(`Invalid format for ticketSourceBranch in settings: ${a}`);return}for(let d of l){if(!Ce.isValidShellArg(d.name)){A.window.showErrorMessage(`Invalid format for environment name in settings: ${d.name}`);return}if(!Ce.isValidShellArg(d.sourceBranch)){A.window.showErrorMessage(`Invalid format for environment sourceBranch in settings: ${d.sourceBranch}`);return}}try{await h("git status",{cwd:e})}catch{A.window.showErrorMessage("The opened folder does not appear to be a valid Git repository.");return}try{await A.window.withProgress({location:A.ProgressLocation.Notification,title:"Ricwiz: Creating Branches",cancellable:!1},async d=>{let u=[];d.report({message:"Checking remote status (git fetch)...",increment:10});try{await h("git fetch",{cwd:e})}catch{}try{if(g==="all"||g==="mainOnly"){if(d.report({message:`Creating main branch ${r}...`,increment:10}),await we(e,r))A.window.showInformationMessage(`Ricwiz: The branch ${r} already exists. Skipping creation...`),await h(`git checkout ${r}`,{cwd:e});else try{let f=i.getFetchRemote(a),c=i.getFetchBranch(a),w=i.buildUpstreamPath(a);await h(`git fetch ${f} ${c}`,{cwd:e}),await h(`git checkout -b ${r} ${w}`,{cwd:e}),u.push(r)}catch{try{await h(`git checkout -b ${r} ${a}`,{cwd:e}),u.push(r)}catch{throw new Error(`Could not create main branch '${r}' from '${a}'. Does the source branch exist?`)}}try{await h(`git config branch.${r}.ricwiz-source "${a}"`,{cwd:e}),i.profileName&&await h(`git config branch.${r}.ricwiz-profile "${i.profileName}"`,{cwd:e})}catch{}}if(g==="all"||g==="envs"){let f=50/(l.length||1);for(let c of l){let w=n?`${n}${p}-to-${c.name}`:`${p}-to-${c.name}`,b=c.sourceBranch;if(d.report({message:`Processing environment branch ${w}...`,increment:f}),!await we(e,w))try{let y=i.buildUpstreamPath(b);await h(`git checkout -b ${w} ${y}`,{cwd:e}),u.push(w)}catch{try{await h(`git checkout -b ${w} ${b}`,{cwd:e}),u.push(w)}catch{throw new Error(`Could not create environment branch '${w}' from '${b}'. Does the source branch exist?`)}}}}d.report({message:`Publishing branches to ${i.originRemote}...`,increment:10});for(let f of u)try{await h(`git push -u ${i.originRemote} ${f}`,{cwd:e})}catch{A.window.showWarningMessage(`Ricwiz: Branch ${f} was created locally but could not be pushed to ${i.originRemote}.`)}if(g==="all"||g==="mainOnly"){d.report({message:`Switching to ${r}...`,increment:10});try{await h(`git checkout ${r}`,{cwd:e})}catch{}}d.report({increment:100}),A.window.showInformationMessage("Ricwiz: All set! You can start working on your branches! \u{1F680}")}catch(f){if(A.window.showErrorMessage(`Ricwiz Branch Creation Failed: ${f.message}`),u.length>0){try{await h(`git checkout ${a}`,{cwd:e})}catch{}for(let c of u)try{await h(`git branch -D ${c}`,{cwd:e})}catch{}A.window.showWarningMessage(`Ricwiz: Rolled back (deleted) ${u.length} branch(es) locally due to failure.`)}}})}catch(d){A.window.showErrorMessage(`Ricwiz general error: ${d.message}`)}}var A,Ut=P(()=>{"use strict";A=k(require("vscode"));S();It();N()});async function $e(t,e,i,o){o&&o.report({message:"CONFLICT! Resolve & click 'Commit & Continue' in Ricwiz panel."});let s=!1,p=!1,l=async()=>{try{let{stdout:n}=await h("git status --porcelain",{cwd:t});return n.split(`
`).filter(r=>{let d=r.substring(0,2);return["UD","DU","DD","AU","UA"].includes(d)}).map(r=>r.substring(3).trim())}catch{return[]}},g=async()=>{try{let{stdout:n}=await h("git status --porcelain",{cwd:t}),r=d=>d==="UU"?"Both Modified":d==="UD"?"Deleted by them":d==="DU"?"Deleted by us":d==="DD"?"Both Deleted":d==="AA"?"Both Added":d==="AU"?"Added by us":d==="UA"?"Added by them":"Conflicted";return n.split(`
`).map(d=>d.trimRight()).filter(d=>d.length>2).filter(d=>{let u=d.substring(0,2);return["UU","AA","UD","DU","AU","UA","DD"].includes(u)}).map(d=>{let u=d.substring(0,2);return{file:d.substring(3).trim(),state:r(u)}})}catch{return[]}},m=async()=>{if(s)return;let n=await l(),r=await g(),{webviewProvider:d}=(Ze(),F(Ke));d&&d.setConflictState({isConflict:!0,sourceStr:e,targetStr:i,deletionsCount:n.length,files:r})},a=de.commands.registerCommand("ricwiz.conflictAction",async n=>{if(n==="abortDeploy")p=!0;else if(n==="resolveDeletions"){try{let d=(await l()).map(f=>({label:f})),u=await de.window.showQuickPick(d,{canPickMany:!0,placeHolder:"Select conflicted files to DELETE",title:"Ricwiz: Delete Conflicted Files"});if(u&&u.length>0){for(let f of u)try{await h(`git rm --force "${f.label}"`,{cwd:t})}catch{}de.window.showInformationMessage(`Ricwiz: Deleted ${u.length} conflicted file(s).`)}}catch(r){de.window.showErrorMessage(`Ricwiz: Error. (${r.message})`)}m()}else if(n==="commitAndContinue")try{let d=(await l()).filter(f=>jt.existsSync(Nt.join(t,f)));if(d.length>0&&await de.window.showWarningMessage(`Wait! There are ${d.length} file(s) with deletion conflicts that are still on your disk.

If you commit now, you will KEEP them in the project.

Are you sure you want to KEEP them?`,{modal:!0},"Yes, KEEP them","No, let me DELETE them")!=="Yes, KEEP them"){m();return}let u=!1;try{let{stdout:f}=await h('git grep -E "^<<<<<<< "',{cwd:t});f.trim().length>0&&(u=!0)}catch{}if(u){de.window.showErrorMessage("Ricwiz: You still have unresolved conflict markers (<<<<<<<) in your files. Please resolve them first!"),m();return}await h("git add .",{cwd:t}),await h("git commit --no-edit",{cwd:t})}catch(r){de.window.showErrorMessage(`Ricwiz: Could not commit automatically. (${r.message})`),m()}});for(m();;){if(p){s=!0,a.dispose(),(Ze(),F(Ke)).webviewProvider?.setConflictState(null);try{await h("git merge --abort",{cwd:t})}catch{}return!1}try{let{stdout:n}=await h("git status --porcelain",{cwd:t});if(n.trim().length===0)return s=!0,a.dispose(),(Ze(),F(Ke)).webviewProvider?.setConflictState(null),de.window.showInformationMessage("Ricwiz: Changes committed!"),!0}catch{}await new Promise(n=>setTimeout(n,2e3))}}var de,jt,Nt,Xe=P(()=>{"use strict";de=k(require("vscode")),jt=k(require("fs")),Nt=k(require("path"));S()});var nt={};Ae(nt,{fetchMergeRequestStatus:()=>it,hasGitlabToken:()=>ot,ricwizLogger:()=>J});async function ot(){let t=await Fe();return!!(t&&t.trim())}async function mi(t,e){let i=tt.workspace.getConfiguration("ricwiz"),o=(await Fe())?.trim();if(!o)throw new Error("No GitLab token");let s=e?e.getConfig("gitlabUrlOverride",""):i.get("gitlabUrlOverride",""),p=[];if(s&&s.trim()!=="")p.push(s.trim());else try{let{stdout:g}=await h("git remote",{cwd:t}),m=g.split(`
`).map(n=>n.trim()).filter(n=>n),a=[];e&&e.upstreamRemote&&m.includes(e.upstreamRemote)&&a.push(e.upstreamRemote),e&&e.originRemote&&e.originRemote!==e.upstreamRemote&&m.includes(e.originRemote)&&a.push(e.originRemote),m.includes("upstream")&&!a.includes("upstream")&&a.push("upstream"),m.includes("origin")&&!a.includes("origin")&&a.push("origin"),a.length===0&&m.length>0&&a.push(...m);for(let n of a)try{let{stdout:r}=await h(`git remote get-url ${n}`,{cwd:t}),d=r.trim();d.endsWith(".git")&&(d=d.slice(0,-4)),d.startsWith("git@")&&(d=d.replace("git@","").replace(":","/"),d=`https://${d}`),p.push(d)}catch(r){J.appendLine(`[GitLab API] Error getting remote URL for ${n}: ${r.message}`)}}catch(g){J.appendLine(`[GitLab API] Error getting remotes: ${g.message}`)}if(p.length===0)throw J.appendLine("[GitLab API] No candidate URLs found in getGitlabTargets!"),new Error("Could not get any remote origin URL.");return p.map(g=>{let m=new URL(g),a=`${m.protocol}//${m.host}`,n=m.pathname;n.startsWith("/")&&(n=n.substring(1)),n.endsWith("/")&&(n=n.slice(0,-1)),n.endsWith(".git")&&(n=n.slice(0,-4));let r=encodeURIComponent(n);return{baseUrl:a,token:o,projectPath:r}})}async function mt(t,e,i,o,s){let p=new URL(`${e}${s}`);return J.appendLine(`[GitLab API] ${o} ${p.toString()}`),new Promise((l,g)=>{let m=et.request(p,{method:o,timeout:5e3,agent:pi,headers:{"PRIVATE-TOKEN":i,Accept:"application/json"}},a=>{let n="";a.on("data",r=>n+=r),a.on("end",()=>{if(J.appendLine(`[GitLab API] Response Code: ${a.statusCode}`),a.statusCode&&a.statusCode>=400)return J.appendLine(`[GitLab API] Error Data: ${n}`),g(new Error(`GitLab API error: ${a.statusCode}`));if(!n)return l({});try{let r=JSON.parse(n);Array.isArray(r)?J.appendLine(`[GitLab API] Returned array with ${r.length} items`):r&&typeof r=="object"&&J.appendLine(`[GitLab API] Returned object with id ${r.id||r.iid||"unknown"}`),l(r)}catch(r){J.appendLine(`[GitLab API] Parse Error: ${r.message}`),g(r)}})});m.on("timeout",()=>{m.destroy(),g(new Error("GitLab request timed out"))}),m.on("error",a=>{J.appendLine(`[GitLab API] Request Failed: ${a.message}`),g(a)}),m.end()})}async function it(t,e,i,o){J.appendLine(`[GitLab API] fetchMergeRequestStatus called for source: ${e}, target: ${i||"any"}`);let s=`${t}:${e}:${i||"any"}`,p=pt.get(s);if(p&&Date.now()-p.timestamp<ui)return p.data;try{let l=await mi(t,o),g=null,m=-1;for(let a of l)try{let n=`/api/v4/projects/${a.projectPath}/merge_requests?source_branch=${encodeURIComponent(e)}&order_by=updated_at&sort=desc`;i&&(n+=`&target_branch=${encodeURIComponent(i)}`);let r=await mt(t,a.baseUrl,a.token,"GET",n);if(r&&r.length>0){let d=r[0];try{let w=await mt(t,a.baseUrl,a.token,"GET",`/api/v4/projects/${a.projectPath}/merge_requests/${d.iid}`);w&&(d=w)}catch{}let u="none";if(d.head_pipeline&&d.head_pipeline.status){let w=d.head_pipeline.status;w==="success"||w==="failed"||w==="canceled"||w==="skipped"?u=w:u="running"}let f={isMerged:d.state==="merged",isOpen:d.state==="opened",pipelineStatus:u,webUrl:d.web_url,projectPath:a.projectPath,pipelineId:d.head_pipeline?d.head_pipeline.id:void 0},c=0;f.isOpen?c=2:f.isMerged&&(c=1),c>m&&(g=f,m=c)}}catch(n){J.appendLine(`[GitLab API] Error inside target loop: ${n.message}`)}if(g)return pt.set(s,{data:g,timestamp:Date.now()}),g;for(let a of l)try{let n=`/api/v4/projects/${a.projectPath}/pipelines?ref=${encodeURIComponent(e)}&order_by=updated_at&sort=desc`,r=await mt(t,a.baseUrl,a.token,"GET",n);if(r&&r.length>0){let d=r[0],u="none";if(d.status){let c=d.status;c==="success"||c==="failed"||c==="canceled"||c==="skipped"?u=c:u="running"}let f={isMerged:!1,isOpen:!1,pipelineStatus:u,webUrl:d.web_url,projectPath:a.projectPath,pipelineId:d.id};return pt.set(s,{data:f,timestamp:Date.now()}),f}}catch{}return null}catch(l){return J.appendLine(`[GitLab API] Failed to fetch MR status: ${l.message}`),null}}var et,tt,J,pi,pt,ui,Oe=P(()=>{"use strict";et=k(require("https")),tt=k(require("vscode"));ke();S();J=tt.window.createOutputChannel("Ricwiz Debug"),pi=new et.Agent({keepAlive:!0,maxSockets:10});pt=new Map,ui=30*1e3});var be={};Ae(be,{findRelatedBranches:()=>wt,getCurrentBranchMergeStatus:()=>gt,getRecentCommits:()=>ft,getRecentTickets:()=>ht,getRelatedBranchesStatus:()=>ut,resolveExistingBranchName:()=>gi});function Wt(t,e){return e.find(i=>t.endsWith(`-to-${i.name}`))}async function ut(t,e,i,o,s){let p=await ot(),l=[];for(let g of e){let m=Wt(g,o);if(p){let a=m?m.sourceBranch:void 0,n=await it(t,g,a,s);if(n){l.push({name:g,isMerged:n.isMerged,pipelineStatus:n.pipelineStatus,mrUrl:n.webUrl,projectPath:n.projectPath,pipelineId:n.pipelineId});continue}}else{let{ricwizLogger:a}=(Oe(),F(nt));a.appendLine(`[GitLab API] Skipping MR check for ${g} because hasGitlabToken() is false`)}l.push({name:g,isMerged:!1,pipelineStatus:"none"})}return l}async function gt(t,e,i,o){let s=Wt(e,i);if(!s)return!1;if(await ot()){let p=await it(t,e,s.sourceBranch,o);if(p)return p.isMerged}else{let{ricwizLogger:p}=(Oe(),F(nt));p.appendLine(`[GitLab API] Skipping MR check for current branch ${e} because hasGitlabToken() is false`)}return!1}async function ft(t,e=10){try{let{stdout:i}=await h(`git log --oneline -${e} --format="%h|||%s|||%ar"`,{cwd:t});return i.split(`
`).filter(o=>o.trim()).map(o=>{let s=o.split("|||");return{hash:s[0]||"",message:s.length>=3?s.slice(1,-1).join("|||"):s[1]||"",timeAgo:s.length>=3?s[s.length-1]:""}})}catch{return[]}}async function ht(t,e=3){try{let{stdout:i}=await h('git for-each-ref --sort=-committerdate --format="%(refname:short)" refs/heads/',{cwd:t}),o=i.split(`
`).map(p=>p.trim()).filter(p=>p),s=/^[A-Z]+-\d+$/i;return o.filter(p=>s.test(p)).slice(0,e)}catch{return[]}}async function wt(t,e,i){let{stdout:o}=await h(`git branch --all --list "*${e}*"`,{cwd:t}),s=new Set,p=new RegExp(`${e}(?!\\d)`,"i");return o.split(`
`).forEach(l=>{let g=l.replace("*","").trim();if(g){if(g.startsWith("remotes/")){let m=g.split("/");m.length>2&&(g=m.slice(2).join("/"))}g&&g!==i&&!g.includes("HEAD")&&p.test(g)&&s.add(g)}}),Array.from(s)}async function gi(t,e,i){try{let o=require("child_process"),p=require("util").promisify(o.exec),{stdout:l}=await p(`git branch --all --list "*${e}*"`,{cwd:t}),g=new RegExp(`${e}(?!\\d)`,"i"),m=l.split(`
`).map(n=>n.replace("*","").trim().replace(/^remotes\/[^\/]+\//,"")).filter(n=>n&&!n.includes("HEAD")&&g.test(n)),a=Array.from(new Set(m));if(i){let n=`-to-${i}`,r=a.find(d=>d.endsWith(n));return r||`${e}${n}`}else{let n=a.find(r=>!r.includes("-to-"));return n||e}}catch{return i?`${e}-to-${i}`:e}}var ue=P(()=>{"use strict";S();Oe()});async function Jt(){let t=C();if(!t){q.window.showErrorMessage("Ricwiz: Open a folder or workspace that is a Git repository.");return}try{await h("git status",{cwd:t})}catch{q.window.showErrorMessage("Ricwiz: The opened folder does not appear to be a valid Git repository.");return}let e=await M.initialize(t);if(!e)return;let i=e.environments,o=await H(t,{prefix:e.ticketPrefix});if(!o){q.window.showErrorMessage("Operation cancelled: Ticket not provided.");return}let{ticketId:s,currentBranch:p}=o,{resolveExistingBranchName:l}=(ue(),F(be)),g=await l(t,s);if(!await we(t,g)){q.window.showErrorMessage(`Ricwiz: Main branch '${g}' does not exist! Prepare deploy is only available when a main ticket branch is used.`);return}let m=e.getConfig("defaultReviewers",""),a="";try{let{stdout:n}=await h(`git config branch.${s}.ricwiz-reviewers`,{cwd:t});a=n.trim()}catch{}if(m.trim()){let n=await q.window.showInputBox({prompt:"Ricwiz: Reviewers for this deploy (optional, comma-separated)",placeHolder:"e.g. @joao, 123456",value:a||m,ignoreFocusOut:!0});if(n===void 0)return;try{n.trim()?await h(`git config branch.${s}.ricwiz-reviewers "${n.trim()}"`,{cwd:t}):a&&await h(`git config --unset branch.${s}.ricwiz-reviewers`,{cwd:t})}catch{}}await q.window.withProgress({location:q.ProgressLocation.Notification,title:"Ricwiz: Preparing Deploy",cancellable:!0},async(n,r)=>{let d=0,u=p,f=!1;r.onCancellationRequested(()=>{f=!0}),n.report({message:"Syncing remote information...",increment:10});try{await h("git fetch --all",{cwd:t});let w=10/(i.length||1);for(let b of i)try{if(f)throw new Error("Aborted");n.report({message:`Fetching ${b.sourceBranch}...`,increment:w});let y=e.getFetchRemote(b.sourceBranch),x=e.getFetchBranch(b.sourceBranch);await h(`git fetch ${y} ${x}:${x}`,{cwd:t})}catch{}}catch{}let c=60/(i.length||1);for(let w of i){if(f)break;let b=await l(t,s,w.name),y=w.sourceBranch;try{n.report({message:`Processing ${b}...`,increment:c/4}),await h(`git checkout ${b}`,{cwd:t});try{await h(`git pull ${e.originRemote} ${b}`,{cwd:t})}catch{}let x=async B=>{try{await h(`git merge ${B}`,{cwd:t})}catch(D){let oe=!1;try{let{stdout:me}=await h("git ls-files -u",{cwd:t});me.trim().length>0&&(oe=!0)}catch{}let Y=((D.stdout||"")+(D.stderr||"")+(D.message||"")).toLowerCase();if(oe||Y.includes("conflict")||Y.includes("conflit")){if(!await $e(t,B,b,n))throw f=!0,new Error("Deploy aborted by user.")}else throw D}};n.report({message:`Merging ${y} into ${b}...`,increment:c/4});let R=e.getFetchRemote(y),I=e.getFetchBranch(y),T=e.buildUpstreamPath(y);if(await h(`git fetch ${R} ${I}`,{cwd:t}),await x(T),n.report({message:`Merging ${g} into ${b}...`,increment:c/4}),await x(g),f)break;n.report({message:`Pushing ${b}...`,increment:c/4}),await h(`git push ${e.originRemote} ${b}`,{cwd:t}),d++}catch(x){x.message.includes("aborted")?q.window.showInformationMessage("Ricwiz: Deploy cancelled."):q.window.showErrorMessage(`Ricwiz: Failed to process branch ${b}. Detail: ${x.message}`);return}}if(!f){n.report({message:"Finishing up...",increment:10});let w=u;try{await h(`git show-ref --verify --quiet refs/heads/${g}`,{cwd:t}),w=g}catch{}try{let b=await j(t);w&&w!==b?(await h(`git checkout ${w}`,{cwd:t}),q.window.showInformationMessage(`Ricwiz: Operation complete. Back on branch ${w}.`)):q.window.showInformationMessage("Ricwiz: Operation complete.")}catch{q.window.showInformationMessage("Ricwiz: Operation complete.")}}})}var q,qt=P(()=>{"use strict";q=k(require("vscode"));S();Xe();N()});async function Gt(t=!1){let e=C();if(!e)return;let i=await M.initialize(e);if(!i)return;let o=await H(e,{prompt:"Enter the full ticket ID for the Merge Requests (e.g., SCPSCA-1234) or just the number"});if(!o)return;let{ticketId:s}=o,p=i.getConfig("gitlabUrlOverride",""),l="";if(p&&p.trim()!=="")l=p.trim().replace(/\/+$/,"");else{let n="";try{let r=i.upstreamRemote||"origin",{stdout:d}=await h(`git remote get-url ${r}`,{cwd:e});n=d.trim()}catch{ge.window.showErrorMessage("Ricwiz: Could not get the remote origin URL. Please configure the URL manually in the extension settings.");return}l=n,l.endsWith(".git")&&(l=l.slice(0,-4)),l.startsWith("git@")&&(l=l.replace("git@","").replace(":","/"),l=`https://${l}`)}let g=[],m=i.ticketSourceBranch;try{let{stdout:n}=await h(`git config branch.${s}.ricwiz-source`,{cwd:e});n.trim()&&(m=n.trim())}catch{}let{resolveExistingBranchName:a}=(ue(),F(be));if(i.environments.length===0){let n=await a(e,s);g.push({source:n,target:m})}else for(let n of i.environments){let r=await a(e,s,n.name);g.push({source:r,target:n.sourceBranch})}for(let n of g){let r=`${l}/-/merge_requests/new?merge_request[source_branch]=${n.source}&merge_request[target_branch]=${n.target}`;t?ge.commands.executeCommand("simpleBrowser.show",r):ge.env.openExternal(ge.Uri.parse(r))}ge.window.showInformationMessage(`Ricwiz: Opening ${t?"VS Code browser":"external browser"} for Merge Requests!`)}async function Ht(){return Gt(!1)}async function Vt(){return Gt(!0)}var ge,_t=P(()=>{"use strict";ge=k(require("vscode"));S();N()});async function Qt(t=!1){let e=C();if(!e)return;let i=ie.workspace.getConfiguration("ricwiz"),o=i.get("jiraUrl","");if(!o||o.trim()===""){ie.window.showErrorMessage("Ricwiz: Jira URL is not configured. Please set it in the extension settings (e.g., https://jira.company.com/browse/).");return}let{getCurrentBranch:s,resolvePrefix:p,extractTicketSuggestion:l}=(S(),F(Te)),g=await s(e),m=i.get("ticketPrefix","SFPSCA-"),a=p(g,m),r=l(g,a,!0);if(r){let{normalizeTicketId:u}=(S(),F(Te));r=u(r,a)}else{let u=await H(e,{prompt:"Ricwiz could not detect the ticket from the branch name. Enter Jira ticket ID (e.g. SFPSCA-1234)",handleToSuffix:!0});if(!u)return;r=u.ticketId}let d=o.trim();d.endsWith("/")||(d+="/"),d+=r,t?ie.commands.executeCommand("simpleBrowser.show",d):ie.env.openExternal(ie.Uri.parse(d)),ie.window.showInformationMessage(`Ricwiz: Opening Jira Ticket ${r} in ${t?"VS Code":"browser"}!`)}async function Yt(){return Qt(!1)}async function Kt(){return Qt(!0)}var ie,Zt=P(()=>{"use strict";ie=k(require("vscode"));S()});async function to(){let t=eo.workspace.getConfiguration("ricwiz"),e=t.get("jiraUrl",""),i=t.get("jiraEmail","")?.trim(),o=(await zt())?.trim();if(!e||!o)throw new Error('Jira API Token is not securely configured. Please run the "Ricwiz: Set Secure Jira API Token" command.');let s=e;s.includes("/browse")&&(s=s.split("/browse")[0]),s.endsWith("/")&&(s=s.slice(0,-1));let p=i?`Basic ${Buffer.from(`${i}:${o}`).toString("base64")}`:`Bearer ${o}`;return{baseUrl:s,headerAuth:p}}async function Me(t,e,i){let{baseUrl:o,headerAuth:s}=await to(),p=new URL(`${o}${e}`);return new Promise((l,g)=>{let m=Xt.request(p,{method:t,headers:{Authorization:s,Accept:"application/json",...i?{"Content-Type":"application/json"}:{}}},a=>{let n="";a.on("data",r=>n+=r),a.on("end",()=>{if(a.statusCode===401||a.statusCode===403)return g(new Error(`Authentication failed (HTTP ${a.statusCode}). Please check your Jira settings.`));if(a.statusCode&&a.statusCode>=400){let r="";try{let d=JSON.parse(n);d.errorMessages&&d.errorMessages.length>0&&(r=d.errorMessages.join(", "))}catch{}return a.statusCode===404||a.statusCode===410?g(new Error(`Ticket not found or deleted (HTTP ${a.statusCode}). ${r}`)):g(new Error(`Jira API returned HTTP status ${a.statusCode}. ${r}`))}if(!n)return l({});try{let r=JSON.parse(n);l(r)}catch{g(new Error("Failed to parse Jira response."))}})});m.on("error",a=>g(new Error(`Network error: ${a.message}`))),i&&m.write(JSON.stringify(i)),m.end()})}async function De(t){let{baseUrl:e}=await to(),i=await Me("GET",`/rest/api/2/issue/${t}`);return i&&i.fields?{summary:i.fields.summary||"",description:i.fields.description||"No description provided.",status:i.fields.status?.name||"Unknown",url:`${e}/browse/${t}`}:null}async function oo(t){let e=await Me("GET",`/rest/api/2/issue/${t}/transitions`);return e&&e.transitions?e.transitions.map(i=>({id:i.id,name:i.name})):[]}async function io(t,e){await Me("POST",`/rest/api/2/issue/${t}/transitions`,{transition:{id:e}})}async function no(t,e){await Me("POST",`/rest/api/2/issue/${t}/comment`,{body:e})}async function ro(t,e){await Me("PUT",`/rest/api/2/issue/${t}`,{update:{labels:[{add:e}]}})}async function so(t){let e=await Me("POST","/rest/api/3/search/jql",{jql:t,maxResults:50,fields:["summary","status","assignee"]});return e&&e.issues?e.issues.map(i=>({key:i.key,summary:i.fields?.summary||"No Title",status:i.fields?.status?.name||"Unknown",assignee:i.fields?.assignee?.displayName||"Unassigned"})):[]}var Xt,eo,Ue=P(()=>{"use strict";Xt=k(require("https")),eo=k(require("vscode"));ke()});async function ao(t){let e=C();if(e)try{let i=await M.initialize(e);if(!i)return;let o=await j(e),s=Be(o,i.ticketPrefix),p=Ee(o,s,!0);if(p||(p=o.split("-to-")[0]),!p){K.window.showErrorMessage("Ricwiz: You are not currently on a valid ticket branch.");return}await K.window.withProgress({location:K.ProgressLocation.Notification,title:`Fetching details for ${p}...`,cancellable:!1},async l=>{let g=await De(p);if(g){let m=[];try{let{findRelatedBranches:a,getRelatedBranchesStatus:n}=(ue(),F(be)),r=K.workspace.getConfiguration("ricwiz").get("environments",[{name:"Qual",sourceBranch:"quality"},{name:"Val",sourceBranch:"validation"},{name:"Prod",sourceBranch:"main"}]),d=await a(e,p,"");m=await n(e,d,p,r,i)}catch{}t.setJiraData({ticketId:p,relatedBranches:m,...g}),t.setPage("jira")}else K.window.showErrorMessage("Ricwiz: No data found for this ticket.")})}catch(i){i.message.includes("securely configured")?await K.window.showErrorMessage(i.message,"Set Token Now")==="Set Token Now"&&K.commands.executeCommand("ricwiz.setJiraToken"):K.window.showErrorMessage(`Ricwiz Jira Error: ${i.message}`)}}var K,co=P(()=>{"use strict";K=k(require("vscode"));S();N();Ue()});async function lo(t,e){let o=ne.workspace.getConfiguration("ricwiz").get("jiraDashboards",[]);if(e!==void 0&&(Re=e),!o||o.length===0){t.setDashboardData({queries:[],selectedIndex:0,results:[],error:"No queries defined in settings. Go to Settings > Ricwiz > Jira Dashboards."}),t.setPage("dashboard");return}Re>=o.length&&(Re=0);let s=o[Re];t.setDashboardData({queries:o,selectedIndex:Re,results:[],error:"\u23F3 Loading tickets..."}),t.setPage("dashboard");try{let p=await so(s.jql),l=ne.workspace.workspaceFolders?.[0]?.uri.fsPath,g=[],m=t.getDashboardShowBranches();if(l)try{let n=require("child_process"),d=require("util").promisify(n.exec),{stdout:u}=await d("git branch",{cwd:l});g=u.split(`
`).map(f=>f.replace("*","").trim()).filter(f=>f)}catch{}let a=[];if(m&&l)try{let{findRelatedBranches:n,getRelatedBranchesStatus:r}=(ue(),F(be)),{WorkflowContext:d}=(N(),F(lt)),u=await d.initialize(l,{skipPrompt:!0}),f=u?.environments||ne.workspace.getConfiguration("ricwiz").get("environments",[{name:"Qual",sourceBranch:"quality"},{name:"Val",sourceBranch:"validation"},{name:"Prod",sourceBranch:"main"}]);a=await Promise.all(p.map(async c=>{let w=await n(l,c.key,""),b=await r(l,w,c.key,f,u);return{...c,detailedBranches:b}}))}catch{a=p}else a=p.map(n=>{let r=g.find(d=>d.includes(n.key));return{...n,branch:r||null}});t.setDashboardData({queries:o,selectedIndex:Re,results:a,error:null}),t.setPage("dashboard")}catch(p){let l=p.message;(l.includes("ENOTFOUND")||l.includes("network"))&&(l="No Internet or Invalid URL"),t.setDashboardData({queries:o,selectedIndex:Re,results:[],error:l}),t.setPage("dashboard")}}async function mo(t,e){await ne.window.withProgress({location:ne.ProgressLocation.Notification,title:`Fetching details for ${e}...`,cancellable:!1},async()=>{try{let i=await De(e);if(i){let o=[],s=C();if(s)try{let{WorkflowContext:p}=(N(),F(lt)),l=await p.initialize(s,{skipPrompt:!0}),{findRelatedBranches:g,getRelatedBranchesStatus:m}=(ue(),F(be)),a=ne.workspace.getConfiguration("ricwiz").get("environments",[{name:"Qual",sourceBranch:"quality"},{name:"Val",sourceBranch:"validation"},{name:"Prod",sourceBranch:"main"}]),n=await g(s,e,"");o=await m(s,n,e,a,l)}catch{}t.setJiraData({ticketId:e,relatedBranches:o,...i}),t.setPage("jira")}else ne.window.showErrorMessage(`Ricwiz: No data found for ticket ${e}.`)}catch(i){ne.window.showErrorMessage(`Ricwiz Jira Error: ${i.message}`)}})}var ne,Re,po=P(()=>{"use strict";ne=k(require("vscode"));Ue();S();Re=0});async function vt(){let t=C();if(!t)return;let e=await M.initialize(t,{forcePrompt:!1});if(!e)return;let i=await j(t);if(!i)return;let o=Be(i,e.ticketPrefix),s=Ee(i,o,!0);return s||i.split("-to-")[0]}async function uo(){try{let t=await vt();if(!t){E.window.showErrorMessage("Ricwiz: You are not on a valid ticket branch.");return}let e=await E.window.withProgress({location:E.ProgressLocation.Notification,title:`Fetching available status for ${t}...`,cancellable:!1},()=>oo(t));if(!e||e.length===0){E.window.showInformationMessage(`Ricwiz: No transitions available for ${t}.`);return}let i=e.map(s=>({label:s.name,id:s.id})),o=await E.window.showQuickPick(i,{placeHolder:`Select new status for ${t}`,ignoreFocusOut:!0});o&&(await E.window.withProgress({location:E.ProgressLocation.Notification,title:`Updating status to ${o.label}...`,cancellable:!1},()=>io(t,o.id)),E.window.showInformationMessage(`Ricwiz: Status for ${t} updated to ${o.label}.`))}catch(t){t.message.includes("securely configured")?E.window.showErrorMessage(t.message,"Set Token Now").then(e=>{e==="Set Token Now"&&E.commands.executeCommand("ricwiz.setJiraToken")}):E.window.showErrorMessage(`Ricwiz Jira Error: ${t.message}`)}}async function go(){try{let t=await vt();if(!t){E.window.showErrorMessage("Ricwiz: You are not on a valid ticket branch.");return}let e=await E.window.showInputBox({prompt:`Add comment to ${t}`,placeHolder:"Type your comment here...",ignoreFocusOut:!0});e&&(await E.window.withProgress({location:E.ProgressLocation.Notification,title:`Adding comment to ${t}...`,cancellable:!1},()=>no(t,e)),E.window.showInformationMessage(`Ricwiz: Comment added to ${t}.`))}catch(t){t.message.includes("securely configured")?E.window.showErrorMessage(t.message,"Set Token Now").then(e=>{e==="Set Token Now"&&E.commands.executeCommand("ricwiz.setJiraToken")}):E.window.showErrorMessage(`Ricwiz Jira Error: ${t.message}`)}}async function fo(){try{let t=await vt();if(!t){E.window.showErrorMessage("Ricwiz: You are not on a valid ticket branch.");return}let e=await E.window.showInputBox({prompt:`Add a label to ${t}`,placeHolder:"e.g. Needs-Review, Bug, High-Priority",ignoreFocusOut:!0});e&&e.trim()&&(await E.window.withProgress({location:E.ProgressLocation.Notification,title:`Adding label to ${t}...`,cancellable:!1},()=>ro(t,e.trim())),E.window.showInformationMessage(`Ricwiz: Label '${e.trim()}' added to ${t}.`))}catch(t){t.message.includes("securely configured")?E.window.showErrorMessage(t.message,"Set Token Now").then(e=>{e==="Set Token Now"&&E.commands.executeCommand("ricwiz.setJiraToken")}):E.window.showErrorMessage(`Ricwiz Jira Error: ${t.message}`)}}async function ho(){let t=await E.window.showInputBox({prompt:"Enter your Jira API Token (or Personal Access Token). It will be securely stored in your OS keychain.",password:!0,ignoreFocusOut:!0});if(t)try{await Rt(t.trim()),E.window.showInformationMessage("Ricwiz: Jira API Token securely stored!")}catch(e){E.window.showErrorMessage(`Ricwiz: Failed to store token: ${e.message}`)}}var E,wo=P(()=>{"use strict";E=k(require("vscode"));S();N();Ue();ke()});async function vo(){let t=await _.window.showInputBox({prompt:"Enter your GitLab Personal Access Token",placeHolder:"glpat-xxxxxxxxxxxxxxxxxxxx",ignoreFocusOut:!0,password:!0});if(t&&t.trim()){let e=t.trim();await _.window.withProgress({location:_.ProgressLocation.Notification,title:"Ricwiz: Validating GitLab Token...",cancellable:!1},async()=>{try{let o=_.workspace.getConfiguration("ricwiz").get("gitlabUrlOverride","").trim();if(!o&&_.workspace.workspaceFolders)try{let{exec:m}=(S(),F(Te)),a=_.workspace.workspaceFolders[0].uri.fsPath,{stdout:n}=await m("git remote get-url origin",{cwd:a}),r=n.trim();r.startsWith("git@")&&(r=`https://${r.replace("git@","").replace(":","/")}`),r.endsWith(".git")&&(r=r.slice(0,-4)),o=r}catch{}o||(o="https://gitlab.com");let s=new URL(o),p=`${s.protocol}//${s.host}`,l=require("https"),g=await new Promise((m,a)=>{let n=l.request(new URL(`${p}/api/v4/user`),{method:"GET",timeout:5e3,headers:{"PRIVATE-TOKEN":e,Accept:"application/json"}},r=>{if(r.statusCode>=400)return a(new Error(`Status ${r.statusCode}`));let d="";r.on("data",u=>d+=u),r.on("end",()=>m(JSON.parse(d||"{}")))});n.on("error",a),n.on("timeout",()=>{n.destroy(),a(new Error("Timeout"))}),n.end()});await Pt(e),_.window.showInformationMessage(`Ricwiz: \u2705 GitLab API Token saved and validated successfully for ${g.username||"user"}!`),_.commands.executeCommand("ricwiz.manualRefresh")}catch(i){_.window.showErrorMessage(`Ricwiz: \u274C Invalid token or cannot reach GitLab (${i.message}). Please check the token and try again.`)}})}}var _,bo=P(()=>{"use strict";_=k(require("vscode"));ke()});async function yo(){let t=C();if(!t){fe.window.showErrorMessage("Ricwiz: Open a folder or workspace that is a Git repository.");return}let e=await M.initialize(t);if(!e)return;let i=await H(t,{prefix:e.ticketPrefix,prompt:"Enter the full ticket ID to sync all branches for (e.g., SCPSCA-1234) or just the number"});if(!i)return;let{ticketId:o,currentBranch:s}=i;await fe.window.withProgress({location:fe.ProgressLocation.Notification,title:`Ricwiz: Syncing all branches for ${o}...`,cancellable:!1},async p=>{try{p.report({message:"Fetching from remote..."});try{await h("git fetch --all",{cwd:t})}catch{}let{stdout:l}=await h(`git branch --list "*${o}*"`,{cwd:t}),g=new RegExp(`${o}(?!\\d)`,"i"),m=l.split(`
`).map(r=>r.replace("*","").trim()).filter(r=>r.length>0&&g.test(r));if(m.length===0){fe.window.showWarningMessage(`Ricwiz: No local branches found for ${o}.`);return}let a=0,n=0;for(let r of m)if(p.report({message:`Syncing ${r}...`}),r===s)try{await h(`git pull ${e.originRemote} ${r}`,{cwd:t}),a++}catch(d){let u=!1;try{let{stdout:c}=await h("git ls-files -u",{cwd:t});c.trim().length>0&&(u=!0)}catch{}let f=((d.stdout||"")+(d.stderr||"")+(d.message||"")).toLowerCase();(u||f.includes("conflict")||f.includes("conflit"))&&await $e(t,`${e.originRemote}/${r}`,r,p)?a++:n++}else try{await h(`git fetch ${e.originRemote} ${r}:${r}`,{cwd:t}),a++}catch{try{await h(`git checkout ${r}`,{cwd:t});try{await h(`git pull ${e.originRemote} ${r}`,{cwd:t}),a++}catch(u){let f=!1;try{let{stdout:w}=await h("git ls-files -u",{cwd:t});w.trim().length>0&&(f=!0)}catch{}let c=((u.stdout||"")+(u.stderr||"")+(u.message||"")).toLowerCase();(f||c.includes("conflict")||c.includes("conflit"))&&await $e(t,`${e.originRemote}/${r}`,r,p)?a++:n++}await h(`git checkout ${s}`,{cwd:t})}catch{try{await h(`git checkout ${s}`,{cwd:t})}catch{}n++}}n>0?fe.window.showWarningMessage(`Ricwiz: Synced ${a}/${m.length} branches. ${n} branch(es) could not be synced (possible conflicts or diverged history).`):fe.window.showInformationMessage(`Ricwiz: \u{1F504} All ${a} branches for ${o} are up to date!`)}catch(l){fe.window.showErrorMessage(`Ricwiz: Sync failed: ${l.message}`)}})}var fe,xo=P(()=>{"use strict";fe=k(require("vscode"));S();Xe();N()});async function ko(){let t=C();if(!t){he.window.showErrorMessage("Ricwiz: Open a folder or workspace that is a Git repository.");return}try{await h("git status",{cwd:t})}catch{he.window.showErrorMessage("Ricwiz: The opened folder does not appear to be a valid Git repository.");return}let e=await M.initialize(t);if(!e)return;let i=e.environments,o=await H(t,{prefix:e.ticketPrefix});if(!o)return;let{ticketId:s,currentBranch:p}=o;await he.window.withProgress({location:he.ProgressLocation.Notification,title:"Ricwiz: Updating environment branches from their bases",cancellable:!0},async(l,g)=>{let m=0,a=p,n=!1;g.onCancellationRequested(()=>{n=!0}),l.report({message:"Syncing remote information...",increment:10});try{await h("git fetch --all",{cwd:t})}catch{}let r=80/(i.length||1);for(let d of i){if(n)break;let{resolveExistingBranchName:u}=(ue(),F(be)),f=await u(t,s,d.name),c=d.sourceBranch;if(await we(t,f))try{l.report({message:`Processing ${f}...`,increment:r/2}),await h(`git checkout ${f}`,{cwd:t});try{l.report({message:`Merging ${c} into ${f}...`,increment:r/2});let w=e.getFetchRemote(c),b=e.getFetchBranch(c),y=e.buildUpstreamPath(c);await h(`git fetch ${w} ${b}`,{cwd:t}),await h(`git merge ${y}`,{cwd:t})}catch(w){let b=!1;try{let{stdout:x}=await h("git ls-files -u",{cwd:t});x.trim().length>0&&(b=!0)}catch{}let y=((w.stdout||"")+(w.stderr||"")+(w.message||"")).toLowerCase();if(b||y.includes("conflict")||y.includes("conflit")){let x=e.buildUpstreamPath(c);if(!await $e(t,x,f,l))throw n=!0,new Error("Update aborted by user.")}else throw w}if(n)break;m++}catch(w){w.message.includes("aborted")?he.window.showInformationMessage("Ricwiz: Update cancelled."):he.window.showErrorMessage(`Ricwiz: Failed to update branch ${f}. Detail: ${w.message}`);return}}if(!n){l.report({message:"Finishing up...",increment:10});try{let d=await j(t);a&&a!==d&&await h(`git checkout ${a}`,{cwd:t})}catch{}he.window.showInformationMessage(`Ricwiz: Successfully updated ${m} environment branches from their bases!`)}})}var he,Co=P(()=>{"use strict";he=k(require("vscode"));S();Xe();N()});async function $o(){let t=C();if(!t){W.window.showErrorMessage("Ricwiz: Open a folder or workspace that is a Git repository.");return}let e=await j(t),i=W.workspace.getConfiguration("ricwiz");await W.window.withProgress({location:W.ProgressLocation.Notification,title:"Ricwiz: Scanning for unused local branches...",cancellable:!1},async()=>{try{await h("git fetch --prune",{cwd:t})}catch{}let o=[];try{let{stdout:r}=await h('git branch --format="%(refname:short)"',{cwd:t});o=r.split(`
`).map(d=>d.trim()).filter(d=>d.length>0)}catch{}if(o.length===0){W.window.showInformationMessage("Ricwiz: No local branches found.");return}let s=[];try{let{stdout:r}=await h('git branch -r --format="%(refname:short)"',{cwd:t});s=r.split(`
`).map(d=>d.trim().replace(/^origin\//,"").replace(/^[^\/]+\//,"")).filter(d=>d.length>0&&!d.includes("HEAD"))}catch{}let p=[];try{let{stdout:r}=await h('git for-each-ref --format="%(refname:short)|||%(upstream:track)" refs/heads/',{cwd:t});p=r.split(`
`).filter(d=>d.includes("[gone]")).map(d=>d.split("|||")[0].trim())}catch{}let l=o.filter(r=>!s.includes(r));if(l.length===0){W.window.showInformationMessage("Ricwiz: Your local repository is totally clean! All local branches exist on the remote.");return}let g=l.map(r=>{let d=p.includes(r),u=r===e,f="Not found on remote";return d&&(f="Deleted on remote [gone]"),u&&(f+=" (Current branch - will checkout main first)"),{label:r,description:f,picked:d&&!u}}),m=await W.window.showQuickPick(g,{canPickMany:!0,placeHolder:"Select local branches to delete",title:"Ricwiz: Delete Unused Branches"});if(!m||m.length===0){W.window.showInformationMessage("Ricwiz: No branches selected for deletion.");return}if(await W.window.showWarningMessage(`Ricwiz: Delete ${m.length} local branch(es)?
This cannot be undone!`,{modal:!0},"Yes, delete them")!=="Yes, delete them"){W.window.showInformationMessage("Ricwiz: Deletion cancelled.");return}let n=0;for(let r of m){let d=r.label;if(d===e){let u=i.get("ticketSourceBranch","main");try{await h(`git checkout ${u}`,{cwd:t}),e=u}catch{W.window.showWarningMessage(`Ricwiz: Could not switch away from ${d}. Skipping.`);continue}}try{await h(`git branch -D ${d}`,{cwd:t}),n++}catch{W.window.showWarningMessage(`Ricwiz: Could not delete local branch ${d}.`)}}W.window.showInformationMessage(`Ricwiz: \u{1F5D1}\uFE0F Cleaned up ${n} unused local branch(es).`)})}var W,Ro=P(()=>{"use strict";W=k(require("vscode"));S()});async function Le(t){let e=C();e&&await re.window.withProgress({location:re.ProgressLocation.Notification,title:`Ricwiz: Switching to ${t}...`,cancellable:!1},async()=>{try{let i=await j(e),o=!1;try{let{stdout:p}=await h("git status --porcelain",{cwd:e});o=p.trim().length>0}catch{}if(o&&i)try{await h(`git stash push --include-untracked -m "ricwiz-auto:${i}"`,{cwd:e}),re.window.showInformationMessage(`Ricwiz: \u{1F4E6} Stashed changes from ${i}`)}catch{re.window.showWarningMessage("Ricwiz: Could not stash changes. Checkout may fail if there are conflicts.")}let s=t;t.includes("/")&&(s=t.split("/").slice(1).join("/"));try{await h(`git checkout ${s}`,{cwd:e})}catch{let l="";if(t.includes("/"))l=t.split("/")[0];else{let{stdout:g}=await h("git branch -r",{cwd:e}),m=g.split(`
`).map(n=>n.trim()).filter(n=>n),a=[];for(let n of m){let r=n.split(" ")[0];r.endsWith(`/${s}`)&&a.push(r.substring(0,r.lastIndexOf("/")))}if(a.length===0){re.window.showErrorMessage(`Ricwiz: A branch "${s}" n\xE3o existe localmente nem em nenhuma remote!`);return}else if(a.length===1)l=a[0];else{let n=await M.initialize(e);a.includes("origin")?l="origin":n&&a.includes(n.upstreamRemote)?l=n.upstreamRemote:l=a[0]}}try{await h(`git fetch ${l} ${s}`,{cwd:e}),await h(`git checkout -b ${s} --track ${l}/${s}`,{cwd:e})}catch{re.window.showErrorMessage(`Ricwiz: Encontrou na remote ${l} mas falhou a fazer checkout.`);return}}try{let{stdout:p}=await h("git stash list",{cwd:e}),l=p.split(`
`);for(let g=0;g<l.length;g++)if(l[g].includes(`ricwiz-auto:${s}`)){let m=l[g].match(/stash@\{(\d+)\}/);m&&(await h(`git stash pop stash@{${m[1]}}`,{cwd:e}),re.window.showInformationMessage(`Ricwiz: \u{1F4E6} Restored stashed changes on ${s}`));break}}catch{re.window.showWarningMessage(`Ricwiz: Could not restore stashed changes on ${s}. You may need to resolve conflicts manually (check git stash list).`)}}catch{re.window.showErrorMessage(`Ricwiz: Could not checkout branch ${t}.`)}})}var re,rt=P(()=>{"use strict";re=k(require("vscode"));S();N()});async function zo(){let t=C();if(t)try{let{stdout:e}=await h("git branch --show-current",{cwd:t}),i=e.trim();i&&(await je.env.clipboard.writeText(i),je.window.showInformationMessage(`Ricwiz: \u{1F4CB} Copied "${i}" to clipboard`))}catch{je.window.showErrorMessage("Ricwiz: Could not get the current branch name.")}}var je,Po=P(()=>{"use strict";je=k(require("vscode"));S()});async function Bo(){let t=C();if(!t){Z.window.showErrorMessage("Ricwiz: Open a folder or workspace that is a Git repository.");return}let e=Z.workspace.getConfiguration("ricwiz"),i=e.get("ticketSourceBranch","main"),s=e.get("packageXmlCommand",'sf sgd source delta --to "HEAD" --from "origin/{baseBranch}" --output-dir "."').replace("{baseBranch}",i);await Z.window.showWarningMessage("Are you sure you want to generate the package.xml? This may overwrite existing local manifest files.",{modal:!0},"Yes, Generate")==="Yes, Generate"&&await Z.window.withProgress({location:Z.ProgressLocation.Notification,title:"Ricwiz: Generating package.xml using Salesforce CLI...",cancellable:!1},async()=>{try{await h(s,{cwd:t,maxBuffer:10*1024*1024}),Z.window.showInformationMessage("Ricwiz: Successfully generated package.xml!");let l=st.join(t,"package","package.xml"),g=st.join(t,"package.xml"),m=st.join(t,"manifest","package.xml");for(let a of[l,g,m])if(So.existsSync(a)){let n=await Z.workspace.openTextDocument(a);await Z.window.showTextDocument(n);break}}catch(l){Z.window.showErrorMessage(`Ricwiz: Error running sf command - ${l.message}`)}})}var Z,st,So,Eo=P(()=>{"use strict";Z=k(require("vscode")),st=k(require("path")),So=k(require("fs"));S()});async function To(){let t=C();if(!t){X.window.showErrorMessage("Ricwiz: Open a folder or workspace that is a Git repository.");return}let i=X.workspace.getConfiguration("ricwiz").get("deployCommand","sf project deploy start --manifest package/package.xml --post-destructive-changes destructiveChanges/destructiveChanges.xml -c -l NoTestRun -g");await X.window.showWarningMessage("Are you sure you want to deploy to Salesforce? This action modifies your org and cannot be easily undone.",{modal:!0},"Yes, Deploy")==="Yes, Deploy"&&await X.window.withProgress({location:X.ProgressLocation.Notification,title:"Ricwiz: Deploying package...",cancellable:!1},async()=>{try{let{stdout:s,stderr:p}=await h(i,{cwd:t,maxBuffer:52428800}),l=X.window.createOutputChannel("Ricwiz Deploy");l.appendLine(`Executing: ${i}`),l.appendLine(s),p&&(l.appendLine("--- STDERR ---"),l.appendLine(p)),l.show(),X.window.showInformationMessage("Ricwiz: Successfully ran deploy command!")}catch(s){let p=X.window.createOutputChannel("Ricwiz Deploy");p.appendLine(`Error executing: ${i}`),s.stdout&&p.appendLine(s.stdout),s.stderr&&p.appendLine(s.stderr),p.appendLine(s.message),p.show(),X.window.showErrorMessage("Ricwiz: Error running deploy command. See output channel for details.")}})}var X,Mo=P(()=>{"use strict";X=k(require("vscode"));S()});async function Do(){let t=C();if(!t){ee.window.showErrorMessage("Ricwiz: Open a folder or workspace that is a Git repository.");return}let i=ee.workspace.getConfiguration("ricwiz").get("importDataCommand","sfdx force:data:tree:import --plan data/plan.json");await ee.window.showWarningMessage("Are you sure you want to import data into Salesforce? This action modifies records in your org.",{modal:!0},"Yes, Import")==="Yes, Import"&&await ee.window.withProgress({location:ee.ProgressLocation.Notification,title:"Ricwiz: Importing data...",cancellable:!1},async()=>{try{let{stdout:s,stderr:p}=await h(i,{cwd:t,maxBuffer:52428800}),l=ee.window.createOutputChannel("Ricwiz Import Data");l.appendLine(`Executing: ${i}`),l.appendLine(s),p&&(l.appendLine("--- STDERR ---"),l.appendLine(p)),l.show(),ee.window.showInformationMessage("Ricwiz: Successfully ran import data command!")}catch(s){let p=ee.window.createOutputChannel("Ricwiz Import Data");p.appendLine(`Error executing: ${i}`),s.stdout&&p.appendLine(s.stdout),s.stderr&&p.appendLine(s.stderr),p.appendLine(s.message),p.show(),ee.window.showErrorMessage("Ricwiz: Error running import data command. See output channel for details.")}})}var ee,Lo=P(()=>{"use strict";ee=k(require("vscode"));S()});async function Ao(){let t=C();if(!t){Q.window.showErrorMessage("Ricwiz: Open a folder or workspace that is a Git repository.");return}let e=await M.initialize(t,{skipPrompt:!0}),i=e?e.ticketSourceBranch:Q.workspace.getConfiguration("ricwiz").get("ticketSourceBranch","main"),o=e?e.originRemote:"origin",s="";try{s=await j(t)}catch{}let p=await Q.window.showInputBox({prompt:`Enter the branch name to list modified files (compared to ${i})`,value:s,placeHolder:"SFPSCA-1234"});if(!p)return;let{extractTicketSuggestion:l,resolvePrefix:g}=(S(),F(Te)),{ricwizLogger:m}=(Oe(),F(nt));await Q.window.withProgress({location:Q.ProgressLocation.Notification,title:`Ricwiz: Finding files for ${p}...`,cancellable:!1},async()=>{try{let a=e?e.ticketPrefix:Q.workspace.getConfiguration("ricwiz").get("ticketPrefix","SFPSC-"),n=g(p,a),r=l(p,n,!0)||p.replace(/-to-[a-zA-Z0-9]+$/i,""),{resolveExistingBranchName:d}=(ue(),F(be)),u=await d(t,r);m.appendLine(`[ListTicketFiles] targetBranch (raw): ${p}, resolvedTargetBranch: ${u}, ticketId: ${r}, originRemote: ${o}, sourceBranch: ${i}`);let f=[];try{let T="";try{m.appendLine(`[ListTicketFiles] Running: git merge-base ${o}/${i} ${u}`);let{stdout:B}=await h(`git merge-base ${o}/${i} ${u}`,{cwd:t});T=B.trim()}catch(B){m.appendLine(`[ListTicketFiles] First merge-base failed: ${B.message}`),m.appendLine(`[ListTicketFiles] Running: git merge-base ${i} ${u}`);let{stdout:D}=await h(`git merge-base ${i} ${u}`,{cwd:t});T=D.trim()}if(T){m.appendLine(`[ListTicketFiles] Merge base found: ${T}. Running git diff...`);let{stdout:B}=await h(`git diff --name-only ${T} ${u}`,{cwd:t,maxBuffer:10*1024*1024});f=B.split(`
`).map(D=>D.trim()).filter(D=>D.length>0),m.appendLine(`[ListTicketFiles] diff found ${f.length} files.`)}}catch(T){m.appendLine(`[ListTicketFiles] Diff strategy failed: ${T.message}`)}let c=[];try{m.appendLine(`[ListTicketFiles] Running git log fallback for ticketId: ${r}`);let{stdout:T}=await h(`git --no-pager log --grep="\\b${r}\\b" -i -E --name-only -m --first-parent --format=""`,{cwd:t,maxBuffer:10*1024*1024});c=T.split(`
`).map(B=>B.trim()).filter(B=>B.length>0),m.appendLine(`[ListTicketFiles] git log found ${c.length} files.`)}catch(T){m.appendLine(`[ListTicketFiles] Git log fallback failed: ${T.message}`)}let w=[...f,...c];if(w.length===0){Q.window.showInformationMessage(`Ricwiz: No modified files found for ${p}.`);return}let b=Array.from(new Set(w)).sort(),y={};for(let T of b){let B=T.match(/default\/([^/]+)/),D=B&&B[1]?B[1].toUpperCase():"OUTROS";y[D]||(y[D]=[]),y[D].push(T)}let x=`Files modified in branch ${p}:
`,R=Object.keys(y).sort();for(let T of R)x+=`
=== ${T} ===
`,x+=y[T].join(`
`)+`
`;let I=await Q.workspace.openTextDocument({content:x,language:"plaintext"});await Q.window.showTextDocument(I)}catch(a){Q.window.showErrorMessage(`Ricwiz: Error running git log - ${a.message}`)}})}var Q,Fo=P(()=>{"use strict";Q=k(require("vscode"));S();N()});async function Io(){let t=C();if(!t){se.window.showErrorMessage("Ricwiz: Open a folder or workspace that is a Git repository.");return}let i=se.workspace.getConfiguration("ricwiz").get("resetTrackingCommand","sf org disable tracking && sf project reset tracking --no-prompt");await se.window.withProgress({location:se.ProgressLocation.Notification,title:"Ricwiz: Resetting tracking...",cancellable:!1},async()=>{try{let{stdout:o,stderr:s}=await h(i,{cwd:t,maxBuffer:52428800}),p=se.window.createOutputChannel("Ricwiz Reset Tracking");p.appendLine(`Executing: ${i}`),p.appendLine(o),s&&(p.appendLine("--- STDERR ---"),p.appendLine(s)),p.show(),se.window.showInformationMessage("Ricwiz: Successfully reset tracking!")}catch(o){let s=se.window.createOutputChannel("Ricwiz Reset Tracking");s.appendLine(`Error executing: ${i}`),o.stdout&&s.appendLine(o.stdout),o.stderr&&s.appendLine(o.stderr),s.appendLine(o.message),s.show(),se.window.showErrorMessage("Ricwiz: Error resetting tracking. See output channel for details.")}})}var se,Oo=P(()=>{"use strict";se=k(require("vscode"));S()});async function Uo(){let t=C();if(!t){te.window.showErrorMessage("Ricwiz: Open a workspace first.");return}let e=["ApexClass","ApexTrigger","CustomObject","CustomField","LightningComponentBundle","AuraDefinitionBundle","Flow","CustomLabel","CustomMetadata","StaticResource","Profile","PermissionSet","PermissionSetGroup","Layout","ValidationRule","RecordType","ListView","Report","EmailTemplate","Other (Type manually)..."],i=await te.window.showQuickPick(e,{placeHolder:"Select Metadata Type to extract (e.g., ApexClass)",ignoreFocusOut:!0});if(!i||i==="Other (Type manually)..."&&(i=await te.window.showInputBox({prompt:"Enter Metadata Type (e.g., CustomApplication, Queue)",ignoreFocusOut:!0}),!i))return;let o={ApexClass:"**/*.cls",ApexTrigger:"**/*.trigger",CustomObject:"**/*.{object,object-meta.xml}",CustomField:"**/*.field-meta.xml",LightningComponentBundle:"**/lwc/*/*.js",AuraDefinitionBundle:"**/aura/*/*.cmp",Flow:"**/*.flow-meta.xml",CustomLabel:"**/*.labels-meta.xml",CustomMetadata:"**/*.md-meta.xml",StaticResource:"**/*.resource-meta.xml",Profile:"**/*.profile-meta.xml",PermissionSet:"**/*.permissionset-meta.xml",PermissionSetGroup:"**/*.permissionsetgroup-meta.xml",Layout:"**/*.layout-meta.xml",ValidationRule:"**/*.validationRule-meta.xml",RecordType:"**/*.recordType-meta.xml",ListView:"**/*.listView-meta.xml"},s=[],p=o[i];if(p)try{s=(await te.workspace.findFiles(p,"**/node_modules/**")).map(m=>{let a=m.fsPath.split(/[\\/]/).pop()||"";if(i==="LightningComponentBundle"||i==="AuraDefinitionBundle"){let n=m.fsPath.split(/[\\/]/);return n[n.length-2]||a.split(".")[0]}return a.split(".")[0]}),s=[...new Set(s)].sort()}catch{}let l=await new Promise(g=>{let m=te.window.createQuickPick();m.title=`Extract ${i}`,m.placeholder="Type name (e.g. MyComponent) or * for all",m.ignoreFocusOut=!0,m.matchOnDescription=!0;let a=()=>{let n=m.value.trim(),r=[];n?r.push({label:`$(cloud-download) Extract "${n}"`,description:"Extract exact name from Salesforce",alwaysShow:!0}):r.push({label:'$(cloud-download) Extract "*" (All)',description:`Extract all ${i}s`,alwaysShow:!0}),s.forEach(d=>{(!n||d.toLowerCase().includes(n.toLowerCase()))&&r.push({label:d,description:"Local workspace component"})}),m.items=r};m.onDidChangeValue(()=>a()),m.onDidAccept(()=>{let n=m.selectedItems[0];if(n){let r=n.label;r.startsWith('$(cloud-download) Extract "')?r=r.replace('$(cloud-download) Extract "',"").replace('" (All)',"").replace('"',""):r==='$(cloud-download) Extract "*" (All)'&&(r="*"),m.hide(),g(r)}}),m.onDidHide(()=>{m.dispose(),g(void 0)}),a(),m.show()});l&&await te.window.withProgress({location:te.ProgressLocation.Notification,title:`Ricwiz: Extracting ${i}:${l} from Salesforce...`,cancellable:!0},async(g,m)=>{try{U.show(!0);let a=`${i}:${l}`,{stdout:n,stderr:r}=await h(`sf project retrieve start -m "${a}"`,{cwd:t});n&&U.appendLine(n),r&&U.appendLine(r),te.window.showInformationMessage(`Ricwiz: Successfully extracted ${a}.`)}catch(a){U.appendLine(`ERROR: ${a.message}`),a.stdout&&U.appendLine(a.stdout),a.stderr&&U.appendLine(a.stderr),te.window.showErrorMessage("Ricwiz: Extraction failed. See Output channel for details.")}})}var te,jo=P(()=>{"use strict";te=k(require("vscode"));S()});async function Wo(){let t=G.window.activeTextEditor;if(!t){G.window.showErrorMessage("Ricwiz: Please open the file you want to deploy in the editor first.");return}let e=t.document.uri.fsPath,i=C();if(!i)return;let o="";if(await G.window.withProgress({location:G.ProgressLocation.Notification,title:"Ricwiz: Fetching available Salesforce orgs...",cancellable:!1},async()=>{try{let{stdout:m}=await h("sf org list --json",{cwd:i});o=m}catch(m){o=m.stdout||""}}),!o){G.window.showErrorMessage("Ricwiz: Failed to fetch orgs. Is Salesforce CLI installed?");return}let s=[];try{let m=JSON.parse(o),a=m.result?.nonScratchOrgs||[],n=m.result?.scratchOrgs||[];s=[...a,...n]}catch{G.window.showErrorMessage("Ricwiz: Failed to parse org list.");return}if(s.length===0){G.window.showInformationMessage("Ricwiz: No authenticated orgs found.");return}let p=s.map(m=>({label:m.alias||m.username,description:m.alias?m.username:"",picked:m.isDefaultUsername})),l=await G.window.showQuickPick(p,{placeHolder:"Select the org(s) to deploy this file to",canPickMany:!0,ignoreFocusOut:!0});if(!l||l.length===0)return;let g=No.basename(e);await G.window.withProgress({location:G.ProgressLocation.Notification,title:`Ricwiz: Deploying ${g} to ${l.length} org(s)...`,cancellable:!1},async()=>{U.show(!0),U.appendLine(`--- Starting Parallel Deploy of ${g} ---`);let m=l.map(async d=>{let u=d.label;U.appendLine(`[${u}] Deploying...`);try{let{stdout:f,stderr:c}=await h(`sf project deploy start -d "${e}" -o "${u}"`,{cwd:i});return U.appendLine(`[${u}] \u2705 Success`),f&&U.appendLine(f),{org:u,success:!0}}catch(f){return U.appendLine(`[${u}] \u274C Failed`),f.stdout&&U.appendLine(f.stdout),f.stderr&&U.appendLine(f.stderr),{org:u,success:!1}}}),a=await Promise.all(m),n=a.filter(d=>d.success).length,r=a.filter(d=>!d.success).length;r===0?G.window.showInformationMessage(`Ricwiz: Successfully deployed to all ${n} orgs!`):G.window.showErrorMessage(`Ricwiz: Deploy finished with errors (${n} success, ${r} failed). Check Output channel.`)})}var G,No,Jo=P(()=>{"use strict";G=k(require("vscode")),No=k(require("path"));S()});async function qo(){let t=C();if(!t){O.window.showErrorMessage("Ricwiz: Open a folder or workspace that is a Git repository.");return}let e=O.workspace.getConfiguration("ricwiz"),i=e.get("auditUsername",""),o=e.get("auditHours",8),s=await O.window.showInputBox({prompt:"Enter your Salesforce Username to query in SetupAuditTrail",value:i,placeHolder:"admin@tuaorg.com"});if(!s)return;let p=await O.window.showInputBox({prompt:"How many hours back do you want to search?",value:o.toString(),placeHolder:"8"});if(!p)return;let l=parseFloat(p);if(isNaN(l)||l<=0){O.window.showErrorMessage("Ricwiz: Invalid hours specified.");return}let g=new Date(Date.now()-l*60*60*1e3).toISOString(),a=`sf data query -q "${`SELECT Action, Display, Section FROM SetupAuditTrail WHERE CreatedBy.Username = '${s}' AND CreatedDate >= ${g}`}" --json`;await O.window.withProgress({location:O.ProgressLocation.Notification,title:"Ricwiz: Interrogating Setup Audit Trail...",cancellable:!1},async()=>{try{let{stdout:n}=await h(a,{cwd:t,maxBuffer:52428800}),r=JSON.parse(n);if(!r.result||r.result.records.length===0){O.window.showInformationMessage(`Ricwiz: No changes found for ${s} in the last ${l} hours.`);return}let d=r.result.records,u=[],f=new Set;for(let B of d){let D=fi(B.Action,B.Display,B.Section);if(D){let oe=`${D.isDelete?"DEL":"ADD"}-${D.metadataFormat}`;if(!f.has(oe)){f.add(oe);let Y=D.isDelete?"$(trash)":"$(plus)";u.push({label:`${Y} ${D.metadataFormat}`,description:`${B.Action} -> ${B.Display}`,metadataFormat:D.metadataFormat,isDelete:D.isDelete})}}}if(u.length===0){O.window.showInformationMessage(`Ricwiz: No extractable metadata changes found for ${s} in the last ${l} hours (ignored passwords/logins).`);return}let c=await O.window.showQuickPick(u,{canPickMany:!0,placeHolder:"Select the changes you want to extract to GitLab",ignoreFocusOut:!0});if(!c||c.length===0){O.window.showInformationMessage("Ricwiz: No changes selected.");return}let w=c.filter(B=>B.isDelete),b=c.filter(B=>!B.isDelete),y=O.window.createOutputChannel("Ricwiz Admin Bridge");if(y.show(),w.length>0){let{stdout:B}=await h("git ls-files",{cwd:t}),D=B.split(`
`).map(Y=>Y.trim()),oe=0;for(let Y of w){let me=Y.metadataFormat.split(":"),Ge=me[0],He=me[1],ye=He;Ge==="CustomField"&&(ye=He.split(".")[1]);let dt=D.filter(Pe=>{let L=ct.basename(Pe);return L.startsWith(ye+".")&&L.includes(Ge==="CustomField"?".field":"")});for(let Pe of dt){let L=ct.join(t,Pe);at.existsSync(L)&&(at.unlinkSync(L),y.appendLine(`Deleted local file: ${Pe}`),oe++)}}O.window.showInformationMessage(`Ricwiz: Deleted ${oe} local files from Git workspace.`)}if(b.length===0)return;let x=b.map(B=>B.metadataFormat).filter(B=>B!=="").join(", "),R=await O.window.showInputBox({prompt:"Review and adjust the metadata components to retrieve",value:x,ignoreFocusOut:!0});if(!R)return;let I=`sf project retrieve start -m "${R}"`;y.appendLine(`Executing: ${I}`),O.window.showInformationMessage(`Ricwiz: Extracting ${b.length} components...`);let T=await h(I,{cwd:t});y.appendLine(T.stdout),T.stderr&&(y.appendLine("--- STDERR ---"),y.appendLine(T.stderr)),O.window.showInformationMessage("Ricwiz: Changes extracted successfully! Ready for Git Commit.")}catch(n){O.window.showErrorMessage(`Ricwiz: Error capturing changes - ${n.message}`)}})}function fi(t,e,i){if(!t||!e||!i)return null;let o=t.toLowerCase(),s=i.toLowerCase();if(["security controls","network access","session settings","data export","login history","password policies","identity verification","delegated administration"].includes(s)||o.includes("login")||o.includes("password")||o.includes("oauth")||o.includes("session"))return null;let l=o.includes("delete"),g=null;if(o==="permissionsetgroupcomponentadd"||o==="permissionsetgroupcomponentdelete")return null;let m=(a,n=!1)=>{let r=a.replace(/\(.*\)/g,"").trim();r.includes(":")&&!o.includes("calculation")&&(r=r.split(":")[0]);let d=["disabled","deleted","removed","created","changed","updated","from","to","on","assigned","assign","assignment","permission","set","group","apex","class","trigger","custom","field","object","layout","validation","rule","flow","profile"],u=r.split(/\s+/);if(n){for(;u.length>0&&d.includes(u[u.length-1].toLowerCase());)u.pop();for(;u.length>0&&d.includes(u[0].toLowerCase());)u.shift();return u.join(" ").trim().replace(/[^a-zA-Z0-9_ ]/g,"")}else return u.filter(w=>!d.includes(w.toLowerCase())).join("_").replace(/[^a-zA-Z0-9_]/g,"")||r.replace(/\s+/g,"")};if(o.includes("profile"))g=`Profile:${m(e,!0)}`;else if(o.includes("permissionsetgroupcalculation")){let a=e.split(":");g=`PermissionSetGroup:${a.length>1?a[a.length-1].trim():m(e,!1)}`}else if(o.includes("permission set group")||o.includes("permissionsetgroup"))g=`PermissionSetGroup:${m(e,!1)}`;else if(o.includes("permission set")||o.includes("permissionset"))g=`PermissionSet:${m(e,!1)}`;else if(o.includes("apexclass"))g=`ApexClass:${m(e,!1)}`;else if(o.includes("apextrigger")||o.includes("apex trigger"))g=`ApexTrigger:${m(e,!1)}`;else if(o.includes("customfield")){let a=e.match(/([A-Za-z0-9_]+__c)/),n=e.match(/(?:on|na|for)\s+([A-Za-z0-9_]+)/i);a&&n?g=`CustomField:${n[1]}.${a[1]}`:g=`CustomField:${m(e,!1)}`}else if(o.includes("layout"))g=`Layout:${m(e,!0)}`;else if(o.includes("validation"))g=`ValidationRule:${m(e,!1)}`;else if(o.includes("flow"))g=`Flow:${m(e,!1)}`;else if(o.includes("customobject")){let a=e.match(/([A-Za-z0-9_]+__c)/);g=a?`CustomObject:${a[1]}`:`CustomObject:${m(e,!1)}`}else if(!o.includes("created")&&!o.includes("changed")&&!o.includes("deleted"))return null;return g?{metadataFormat:g,isDelete:l}:null}var O,at,ct,Go=P(()=>{"use strict";O=k(require("vscode")),at=k(require("fs")),ct=k(require("path"));S()});async function Ho(){let t=C();if(t)try{let{stdout:e}=await h('git for-each-ref --sort=-committerdate --format="%(refname:short)|||%(committerdate:relative)|||%(subject)" refs/heads/',{cwd:t}),i=e.split(`
`).filter(s=>s.trim()).map(s=>{let p=s.split("|||");return{label:`$(git-branch) ${p[0]}`,description:p[1],detail:p[2],branchName:p[0]}}),o=await bt.window.showQuickPick(i,{placeHolder:"Select a branch from history to checkout",matchOnDescription:!0,matchOnDetail:!0});o&&await Le(o.branchName)}catch{bt.window.showErrorMessage("Ricwiz: Failed to get branch history")}}var bt,Vo=P(()=>{"use strict";bt=k(require("vscode"));S();rt()});async function _o(){let t=C();if(!t)return;let e=await Ne.window.showInputBox({prompt:"Enter ticket number or name (e.g., 48934)",placeHolder:"48934"});if(e)try{let{stdout:i}=await h(`git branch --list "*${e}*"`,{cwd:t}),o=i.split(`
`).map(l=>l.replace("*","").trim()).filter(l=>l);if(o.length===0){Ne.window.showInformationMessage(`Ricwiz: No branches found matching "${e}"`);return}let s=o.map(l=>({label:`$(git-branch) ${l}`,branchName:l})),p=await Ne.window.showQuickPick(s,{placeHolder:`Select a branch for ${e}`});p&&await Le(p.branchName)}catch{Ne.window.showErrorMessage("Ricwiz: Failed to search branches")}}var Ne,Qo=P(()=>{"use strict";Ne=k(require("vscode"));S();rt()});async function Ko(){let t=ze.window.activeTextEditor;if(!t)return ze.window.showErrorMessage("Ricwiz: Please open a file in the editor to check blame."),null;let e=t.document.fileName,i=Yo.basename(e),o=C();if(!o)return ze.window.showErrorMessage("Ricwiz: Workspace is not a git repository."),null;let s=[];try{let{stdout:n}=await h(`git log -5 --pretty=format:"%an|%ar|%s|%h" -- "${e}"`,{cwd:o}),r=n.trim().split(`
`);for(let d of r){let u=d.split("|");u.length>=4&&s.push({author:u[0],time:u[1],message:u.slice(2,-1).join("|"),hash:u[u.length-1]})}}catch(n){console.error("Git blame error:",n)}let p="Unknown",l="Unknown",g="Unknown",m=[],a=hi(e);if(a)try{await ze.window.withProgress({location:ze.ProgressLocation.Notification,title:`Ricwiz: Analyzing ${a.name} in Salesforce...`,cancellable:!1},async()=>{let n="";if(a.type==="CustomField"){let r=a.name.split(".");r.length===2&&(n=`SELECT LastModifiedBy.Name, LastModifiedDate, CreatedBy.Name FROM CustomField WHERE DeveloperName = '${r[1].replace("__c","")}' AND TableEnumOrId = '${r[0]}'`)}else a.type==="LightningComponentBundle"?n=`SELECT LastModifiedBy.Name, LastModifiedDate, CreatedBy.Name FROM LightningComponentBundle WHERE DeveloperName = '${a.name}'`:n=`SELECT LastModifiedBy.Name, LastModifiedDate, CreatedBy.Name FROM ${a.type} WHERE Name = '${a.name}'`;if(n)try{let{stdout:r}=await h(`sf data query -t -q "${n}" --json`,{cwd:o,maxBuffer:52428800}),d=JSON.parse(r);if(d&&d.result&&d.result.records&&d.result.records.length>0){let u=d.result.records[0];p=u.LastModifiedBy?u.LastModifiedBy.Name:"Unknown",g=u.CreatedBy?u.CreatedBy.Name:"Unknown",l=new Date(u.LastModifiedDate).toLocaleString()}else p="Not found in Org",l="N/A",g="N/A"}catch{p="Query Error",l="N/A",g="N/A"}try{let r="SELECT Action, Display, CreatedBy.Name, CreatedDate FROM SetupAuditTrail ORDER BY CreatedDate DESC LIMIT 1500",{stdout:d}=await h(`sf data query -q "${r}" --json`,{cwd:o,maxBuffer:52428800}),u=JSON.parse(d);if(u&&u.result&&u.result.records){let f=a.name.replace("__c","");m=u.result.records.filter(w=>w.Display&&w.Display.includes(f)).map(w=>({action:w.Action,display:w.Display,author:w.CreatedBy?w.CreatedBy.Name:"Unknown",time:new Date(w.CreatedDate).toLocaleString()})).slice(0,10)}}catch(r){console.error("Audit trail query error:",r)}})}catch(n){console.error("Salesforce query error:",n)}else p="Unsupported Metadata Type",l="N/A";return{fileName:i,gitHistory:s,sfAuthor:p,sfTime:l,sfCreatedBy:g,auditHistory:m}}function hi(t){let e=t.replace(/\\/g,"/");if(e.includes("/classes/")){let i=e.match(/\/classes\/([^/.]+)\.cls/);if(i)return{type:"ApexClass",name:i[1]}}if(e.includes("/triggers/")){let i=e.match(/\/triggers\/([^/.]+)\.trigger/);if(i)return{type:"ApexTrigger",name:i[1]}}if(e.includes("/lwc/")){let i=e.match(/\/lwc\/([^/]+)\//);if(i)return{type:"LightningComponentBundle",name:i[1]}}if(e.includes("/aura/")){let i=e.match(/\/aura\/([^/]+)\//);if(i)return{type:"AuraDefinitionBundle",name:i[1]}}if(e.includes("/objects/")&&e.includes("/fields/")){let i=e.match(/\/objects\/([^/]+)\//),o=e.match(/\/fields\/([^/.]+)\.field/);if(i&&o)return{type:"CustomField",name:`${i[1]}.${o[1]}`}}return null}var ze,Yo,Zo=P(()=>{"use strict";ze=k(require("vscode")),Yo=k(require("path"));S()});async function Xo(t,e){let i=C();if(!i)return;let o=(await Fe())?.trim();if(!o){ae.window.showErrorMessage("Ricwiz: GitLab token is not configured.");return}try{let s=await M.initialize(i,{skipPrompt:!0});if(!s)return;let p=ae.workspace.getConfiguration("ricwiz"),g=s.getConfig("gitlabUrlOverride","");if(g){let m=new URL(g);g=`${m.protocol}//${m.host}`}else{let{stdout:m}=await h("git remote",{cwd:i}),a=m.split(`
`).map(r=>r.trim()).filter(r=>r),n=!1;for(let r of a){let{stdout:d}=await h(`git remote get-url ${r}`,{cwd:i}),u=d.trim();u.endsWith(".git")&&(u=u.slice(0,-4)),u.startsWith("git@")&&(u=u.replace("git@","").replace(":","/"),u=`https://${u}`);let f=new URL(u),c=f.pathname;if(c.startsWith("/")&&(c=c.substring(1)),c.endsWith("/")&&(c=c.slice(0,-1)),encodeURIComponent(c)===t||c===t){g=`${f.protocol}//${f.host}`,n=!0;break}}if(!n){ae.window.showErrorMessage(`Ricwiz: Could not determine base URL for project ${t}`);return}}await ae.window.withProgress({location:ae.ProgressLocation.Notification,title:`Fetching failed jobs for Pipeline #${e}...`,cancellable:!1},async()=>{let m=new We.Agent({keepAlive:!0}),a=new URL(`${g}/api/v4/projects/${t}/pipelines/${e}/jobs?scope[]=failed`),n=await new Promise((w,b)=>{We.get(a,{headers:{"PRIVATE-TOKEN":o},agent:m},y=>{let x="";y.on("data",R=>x+=R),y.on("end",()=>{if(y.statusCode===200)try{w(JSON.parse(x))}catch{w([])}else w([])})}).on("error",()=>w([]))});if(!n||n.length===0){ae.window.showInformationMessage("Ricwiz: No failed jobs found for this pipeline.");return}let r=n[0],d=new URL(`${g}/api/v4/projects/${t}/jobs/${r.id}/trace`),f=(await new Promise((w,b)=>{We.get(d,{headers:{"PRIVATE-TOKEN":o},agent:m},y=>{let x="";y.on("data",R=>x+=R),y.on("end",()=>w(x))}).on("error",y=>w(`Failed to fetch log: ${y.message}`))})).replace(/\x1B\[[0-9;]*[mK]/g,""),c=ae.window.createOutputChannel(`Pipeline #${e} - Job ${r.name}`);c.appendLine(`Pipeline ID: ${e}`),c.appendLine(`Job Name: ${r.name}`),c.appendLine(`Status: ${r.status}`),c.appendLine(`URL: ${r.web_url}`),c.appendLine("========================================"),c.appendLine(f),c.show()})}catch(s){ae.window.showErrorMessage(`Ricwiz: Error fetching pipeline logs - ${s.message}`)}}var ae,We,ei=P(()=>{"use strict";ae=k(require("vscode"));ke();S();We=k(require("https"));N();S()});function ti(t,e,i){t.subscriptions.push(v.commands.registerCommand("ricwiz.generateDestructiveChanges",async(...o)=>{try{await Dt(...o)}finally{v.commands.executeCommand("ricwiz.manualRefresh")}}),v.commands.registerCommand("ricwiz.runSmartTests",async(...o)=>{try{await At(...o)}finally{v.commands.executeCommand("ricwiz.manualRefresh")}}),v.commands.registerCommand("ricwiz.refreshWebview",()=>{e&&v.commands.executeCommand("workbench.action.webview.reloadWebviewAction")}),v.commands.registerCommand("ricwiz.createBranches",async(...o)=>{try{await Ot(...o)}finally{v.commands.executeCommand("ricwiz.manualRefresh")}}),v.commands.registerCommand("ricwiz.prepareDeploy",async(...o)=>{try{await Jt(...o)}finally{v.commands.executeCommand("ricwiz.manualRefresh")}}),v.commands.registerCommand("ricwiz.createMergeRequests",async(...o)=>{try{await Ht(...o)}finally{v.commands.executeCommand("ricwiz.manualRefresh")}}),v.commands.registerCommand("ricwiz.createMergeRequestsVSCode",async(...o)=>{try{await Vt(...o)}finally{v.commands.executeCommand("ricwiz.manualRefresh")}}),v.commands.registerCommand("ricwiz.openJiraTicket",async(...o)=>{try{await Yt(...o)}finally{v.commands.executeCommand("ricwiz.manualRefresh")}}),v.commands.registerCommand("ricwiz.openJiraTicketVSCode",async(...o)=>{try{await Kt(...o)}finally{v.commands.executeCommand("ricwiz.manualRefresh")}}),v.commands.registerCommand("ricwiz.showJiraDetails",()=>{e&&ao(e)}),v.commands.registerCommand("ricwiz.openJiraDashboard",o=>{e&&lo(e,o)}),v.commands.registerCommand("ricwiz.openJiraDetailsForId",o=>{e&&mo(e,o)}),v.commands.registerCommand("ricwiz.toggleDashboardBranches",o=>{e&&(e.setDashboardShowBranches(o),v.commands.executeCommand("ricwiz.openJiraDashboard"))}),v.commands.registerCommand("ricwiz.changeJiraStatus",async(...o)=>{try{await uo(...o)}finally{v.commands.executeCommand("ricwiz.manualRefresh")}}),v.commands.registerCommand("ricwiz.addJiraComment",async(...o)=>{try{await go(...o)}finally{v.commands.executeCommand("ricwiz.manualRefresh")}}),v.commands.registerCommand("ricwiz.addJiraLabel",async(...o)=>{try{await fo(...o)}finally{v.commands.executeCommand("ricwiz.manualRefresh")}}),v.commands.registerCommand("ricwiz.setJiraToken",ho),v.commands.registerCommand("ricwiz.setGitlabToken",vo),v.commands.registerCommand("ricwiz.syncAll",async(...o)=>{try{await yo(...o)}finally{v.commands.executeCommand("ricwiz.manualRefresh")}}),v.commands.registerCommand("ricwiz.updateBases",async(...o)=>{try{await ko(...o)}finally{v.commands.executeCommand("ricwiz.manualRefresh")}}),v.commands.registerCommand("ricwiz.deleteUnusedBranches",async(...o)=>{try{await $o(...o)}finally{v.commands.executeCommand("ricwiz.manualRefresh")}}),v.commands.registerCommand("ricwiz.checkoutBranch",async(...o)=>{try{await Le(...o)}finally{v.commands.executeCommand("ricwiz.manualRefresh")}}),v.commands.registerCommand("ricwiz.copyBranchName",async(...o)=>{try{await zo(...o)}finally{v.commands.executeCommand("ricwiz.manualRefresh")}}),v.commands.registerCommand("ricwiz.generatePackageXml",async(...o)=>{try{await Bo(...o)}finally{v.commands.executeCommand("ricwiz.manualRefresh")}}),v.commands.registerCommand("ricwiz.deployPackage",async(...o)=>{try{await To(...o)}finally{v.commands.executeCommand("ricwiz.manualRefresh")}}),v.commands.registerCommand("ricwiz.importData",async(...o)=>{try{await Do(...o)}finally{v.commands.executeCommand("ricwiz.manualRefresh")}}),v.commands.registerCommand("ricwiz.listTicketFiles",async(...o)=>{try{await Ao(...o)}finally{v.commands.executeCommand("ricwiz.manualRefresh")}}),v.commands.registerCommand("ricwiz.resetTracking",async(...o)=>{try{await Io(...o)}finally{v.commands.executeCommand("ricwiz.manualRefresh")}}),v.commands.registerCommand("ricwiz.extractComponent",async(...o)=>{try{await Uo(...o)}finally{v.commands.executeCommand("ricwiz.manualRefresh")}}),v.commands.registerCommand("ricwiz.deployMultiOrg",async(...o)=>{try{await Wo(...o)}finally{v.commands.executeCommand("ricwiz.manualRefresh")}}),v.commands.registerCommand("ricwiz.captureAdminChanges",async(...o)=>{try{await qo(...o)}finally{v.commands.executeCommand("ricwiz.manualRefresh")}}),v.commands.registerCommand("ricwiz.openHistory",async(...o)=>{try{await Ho(...o)}finally{v.commands.executeCommand("ricwiz.manualRefresh")}}),v.commands.registerCommand("ricwiz.searchTicket",async(...o)=>{try{await _o(...o)}finally{v.commands.executeCommand("ricwiz.manualRefresh")}}),v.commands.registerCommand("ricwiz.whoToBlame",async()=>{let o=await Ko();o&&e&&(e.setBlameData(o),e.setPage("blame"))}),v.commands.registerCommand("ricwiz.showPipelineLogs",(o,s)=>Xo(o,s)),v.commands.registerCommand("ricwiz.manualRefresh",()=>{i&&i()}),v.commands.registerCommand("ricwiz.toggleAutoRefresh",()=>{if(e){let o=!e.isAutoRefreshEnabled();e.setAutoRefresh(o),v.workspace.getConfiguration("ricwiz").update("autoRefresh",o,v.ConfigurationTarget.Global)}}),v.commands.registerCommand("ricwiz.openSettings",()=>{v.commands.executeCommand("workbench.action.openSettings","ricwiz")}))}var v,oi=P(()=>{"use strict";v=k(require("vscode"));Lt();Ft();Ut();qt();_t();Zt();co();po();wo();bo();xo();Co();Ro();rt();Po();Eo();Mo();Lo();Fo();Oo();jo();Jo();Go();Vo();Qo();Zo();ei()});function ii(t,e,i){let o,s=le.workspace.getConfiguration("ricwiz").get("autoRefresh",!0);e?.setAutoRefresh(s),t.subscriptions.push(le.workspace.onDidChangeConfiguration(l=>{if(l.affectsConfiguration("ricwiz.autoRefresh")){let g=le.workspace.getConfiguration("ricwiz").get("autoRefresh",!0);e?.setAutoRefresh(g)}}));async function p(){let l=le.extensions.getExtension("vscode.git");if(l){let a=function(n){let r="",d;async function u(){let c=le.workspace.workspaceFolders;if(!c)return;let w=c[0].uri.fsPath,b=await j(w);if(b&&b!==r){r=b;let y=le.workspace.getConfiguration("ricwiz"),x=y.get("ticketPrefix","SFPSCA-");if(!b.includes(x)){let L=b.match(/([A-Z]+-)\d+/i);L&&(x=L[1].toUpperCase())}let R=[],I=[],T=[],B=[],D=await M.initialize(w,{skipPrompt:!0}),oe=D?.environments||y.get("environments",[{name:"Qual",sourceBranch:"quality"},{name:"Val",sourceBranch:"validation"},{name:"Prod",sourceBranch:"main"}]);try{let L=y.get("workspaceCheckoutButtons",["main","quality","validation"]);T=Array.from(new Set(L))}catch{}let Y="",me=b.match(new RegExp(`(${x}\\d+(?:-\\d+)?)`,"i"));if(me){let L=me[1].toUpperCase();Y=L;let xe=y.get("commitMessageSuffix","- "),yt=/^[A-Z]+-\d+(?:-\d+)?\s*(?:-\s*|:\s*|\s+)?/i;yt.test(n.inputBox.value)?n.inputBox.value.toUpperCase().startsWith(L)||(n.inputBox.value=n.inputBox.value.replace(yt,`${L}${xe}`)):n.inputBox.value=`${L}${xe}`+n.inputBox.value,i.text=`$(bookmark) ${L}`,i.tooltip=`Branch: ${b}
Click to open Jira ticket`,i.show();try{let xt=await wt(w,L,"");R=await ut(w,xt,L,oe,D)}catch{}}else{i.hide();try{B=await ht(w)}catch{}}let[Ge,He,ye]=await Promise.all([ft(w,10),gt(w,b,oe,D),Y?De(Y).catch(L=>{let xe=L.message;return(xe.includes("ENOTFOUND")||xe.includes("network"))&&(xe="No Internet or Invalid URL"),{summary:`\u26A0\uFE0F Jira Error: ${xe}`,description:"",status:""}}):Promise.resolve(null)]);I=Ge;let dt=ye?ye.summary:"",Pe=ye&&ye.status||"";e?.updateBranch(b,He,R,I,T,B,dt,Pe)}}function f(){e?.isAutoRefreshEnabled()&&(d&&clearTimeout(d),d=setTimeout(()=>{r="",u()},300))}o=()=>{r="",u()},u(),n.state.onDidChange(()=>f()),le.window.onDidChangeWindowState(c=>{c.focused&&f()})};var g=a;l.isActive||await l.activate();let m=l.exports.getAPI(1);m.repositories.length>0&&m.repositories.forEach(n=>a(n)),m.onDidOpenRepository(n=>a(n))}}return p(),()=>{o&&o()}}var le,ni=P(()=>{"use strict";le=k(require("vscode"));S();ue();Ue();N()});var Ke={};Ae(Ke,{activate:()=>wi,deactivate:()=>vi,webviewProvider:()=>Je});module.exports=F(Ke);function wi(t){$t(t),Je=new _e(t.extensionUri),t.subscriptions.push(qe.window.registerWebviewViewProvider("ricwiz-webview",Je));let e=qe.window.createStatusBarItem(qe.StatusBarAlignment.Left,100);e.command="ricwiz.openJiraTicket",t.subscriptions.push(e);let i=ii(t,Je,e);ti(t,Je,i)}function vi(){}var qe,Je,Ze=P(()=>{qe=k(require("vscode"));Ct();ke();oi();ni()});Ze();0&&(module.exports={activate,deactivate,webviewProvider});
