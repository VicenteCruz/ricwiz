"use strict";var ri=Object.create;var Ve=Object.defineProperty;var si=Object.getOwnPropertyDescriptor;var ai=Object.getOwnPropertyNames;var ci=Object.getPrototypeOf,di=Object.prototype.hasOwnProperty;var P=(t,e,i)=>()=>{if(i)throw i[0];try{return t&&(e=t(t=0)),e}catch(o){throw i=[o],o}};var Ae=(t,e)=>{for(var i in e)Ve(t,i,{get:e[i],enumerable:!0})},kt=(t,e,i,o)=>{if(e&&typeof e=="object"||typeof e=="function")for(let s of ai(e))!di.call(t,s)&&s!==i&&Ve(t,s,{get:()=>e[s],enumerable:!(o=si(e,s))||o.enumerable});return t};var x=(t,e,i)=>(i=t!=null?ri(ci(t)):{},kt(e||!t||!t.__esModule?Ve(i,"default",{value:t,enumerable:!0}):i,t)),I=t=>kt(Ve({},"__esModule",{value:!0}),t);function z(t){return t.replace(/&/g,"&amp;").replace(/</g,"&lt;").replace(/>/g,"&gt;").replace(/"/g,"&quot;").replace(/'/g,"&#39;")}var C,_e,Ct=P(()=>{"use strict";C=x(require("vscode"));_e=class{constructor(e){this._extensionUri=e}_extensionUri;webviewView;resolveWebviewView(e,i,o){this.webviewView=e,e.webview.options={enableScripts:!0,localResourceRoots:[this._extensionUri]},this.updateView(),e.webview.onDidReceiveMessage(s=>{switch(s.command){case"createBranches":C.commands.executeCommand("ricwiz.createBranches");break;case"createBranchForTicket":C.commands.executeCommand("ricwiz.createBranches",s.args);break;case"prepareDeploy":C.commands.executeCommand("ricwiz.prepareDeploy");break;case"openMRs":C.commands.executeCommand("ricwiz.createMergeRequests");break;case"openMRsVSCode":C.commands.executeCommand("ricwiz.createMergeRequestsVSCode");break;case"openExternal":s.args&&C.env.openExternal(C.Uri.parse(s.args));break;case"openJira":C.commands.executeCommand("ricwiz.openJiraTicket");break;case"showJiraDetails":C.commands.executeCommand("ricwiz.showJiraDetails");break;case"showPipelineLogs":C.commands.executeCommand("ricwiz.showPipelineLogs",s.args.projectPath,s.args.pipelineId);break;case"changeJiraStatus":C.commands.executeCommand("ricwiz.changeJiraStatus");break;case"addJiraComment":C.commands.executeCommand("ricwiz.addJiraComment");break;case"addJiraLabel":C.commands.executeCommand("ricwiz.addJiraLabel");break;case"setPage":this.setPage(s.args);break;case"openDashboard":C.commands.executeCommand("ricwiz.openJiraDashboard");break;case"openJiraDetailsForId":C.commands.executeCommand("ricwiz.openJiraDetailsForId",s.args);break;case"refreshDashboard":C.commands.executeCommand("ricwiz.openJiraDashboard");break;case"switchDashboardQuery":C.commands.executeCommand("ricwiz.openJiraDashboard",parseInt(s.args));break;case"toggleDashboardBranches":C.commands.executeCommand("ricwiz.toggleDashboardBranches",s.args);break;case"openJiraVSCode":C.commands.executeCommand("ricwiz.openJiraTicketVSCode");break;case"openSettings":C.commands.executeCommand("ricwiz.openSettings");break;case"checkout":s.branch&&C.commands.executeCommand("ricwiz.checkoutBranch",s.branch);break;case"copyBranch":C.commands.executeCommand("ricwiz.copyBranchName");break;case"generatePackageXml":C.commands.executeCommand("ricwiz.generatePackageXml");break;case"openDevTools":this.setPage("devtools");break;case"openMain":this.setPage("main");break;case"generateDestructiveChanges":C.commands.executeCommand("ricwiz.generateDestructiveChanges");break;case"deployPackage":C.commands.executeCommand("ricwiz.deployPackage");break;case"runSmartTests":C.commands.executeCommand("ricwiz.runSmartTests");break;case"importData":C.commands.executeCommand("ricwiz.importData");break;case"listTicketFiles":C.commands.executeCommand("ricwiz.listTicketFiles");break;case"resetTracking":C.commands.executeCommand("ricwiz.resetTracking");break;case"extractComponent":C.commands.executeCommand("ricwiz.extractComponent");break;case"deployMultiOrg":C.commands.executeCommand("ricwiz.deployMultiOrg");break;case"captureAdminChanges":C.commands.executeCommand("ricwiz.captureAdminChanges");break;case"whoToBlame":C.commands.executeCommand("ricwiz.whoToBlame");break;case"syncAll":C.commands.executeCommand("ricwiz.syncAll");break;case"updateBases":C.commands.executeCommand("ricwiz.updateBases");break;case"deleteUnused":C.commands.executeCommand("ricwiz.deleteUnusedBranches");break;case"conflict_commitAndContinue":C.commands.executeCommand("ricwiz.conflictAction","commitAndContinue");break;case"conflict_resolveDeletions":C.commands.executeCommand("ricwiz.conflictAction","resolveDeletions");break;case"conflict_abortDeploy":C.commands.executeCommand("ricwiz.conflictAction","abortDeploy");break;case"openFile":if(s.file){let m=C.workspace.workspaceFolders;if(m){let d=C.Uri.joinPath(m[0].uri,s.file);C.commands.executeCommand("vscode.open",d)}}break;case"searchTicket":C.commands.executeCommand("ricwiz.searchTicket");break;case"manualRefresh":C.commands.executeCommand("ricwiz.manualRefresh");break;case"toggleAutoRefresh":C.commands.executeCommand("ricwiz.toggleAutoRefresh");break;case"openHistory":C.commands.executeCommand("ricwiz.openHistory");break}})}conflictState=null;setConflictState(e){this.conflictState=e,this.updateView()}updateBranch(e,i,o=[],s=[],m=[],d=[],u="",l=""){this.currentBranchCache=e,this.currentBranchIsMergedCache=i,this.relatedBranchesCache=o,this.commitsCache=s,this.baseBranchesCache=m,this.recentTicketsCache=d,this.ticketTitleCache=u,this.ticketStatusCache=l,this.webviewView&&this.updateView()}currentBranchCache="";currentBranchIsMergedCache=!1;relatedBranchesCache=[];commitsCache=[];baseBranchesCache=[];recentTicketsCache=[];ticketTitleCache="";ticketStatusCache="";currentPage="main";blameDataCache=null;jiraDataCache=null;dashboardDataCache=null;dashboardShowBranches=!1;autoRefreshEnabled=!0;setDashboardShowBranches(e){this.dashboardShowBranches=e}getDashboardShowBranches(){return this.dashboardShowBranches}setBlameData(e){this.blameDataCache=e}setJiraData(e){this.jiraDataCache=e}setDashboardData(e){this.dashboardDataCache=e}setAutoRefresh(e){this.autoRefreshEnabled=e,this.updateView()}isAutoRefreshEnabled(){return this.autoRefreshEnabled}setPage(e){this.currentPage=e,this.updateView()}updateView(){if(!this.webviewView)return;let e=this.webviewView.webview.asWebviewUri(C.Uri.joinPath(this._extensionUri,"resources","logo.png"));this.webviewView.webview.html=this._getHtmlForWebview(e,this.currentBranchCache,this.relatedBranchesCache,this.commitsCache,this.baseBranchesCache,this.recentTicketsCache,this.currentPage)}_getHtmlForWebview(e,i,o,s,m,d,u){let l=g=>{let b=(g||"").toLowerCase().trim();return b==="open"?"#888888":b==="in progress"?"#007acc":b==="waiting for deploy"?"#d7a500":b==="close"||b==="done"||b==="closed"?"#238636":"var(--vscode-badge-background)"},a=g=>g?g==="running"?"\u{1F7E1}":g==="success"?"\u{1F7E2}":g==="failed"?"\u{1F534}":g==="canceled"||g==="skipped"?"\u26AA":"":"",n=s.length>0?`
            <div class="separator"></div>
            <div style="padding: 0 4px;">
                <div style="font-size: 11px; opacity: 0.7; margin-bottom: 6px; display: flex; align-items: center; gap: 4px;">
                    <span>\u2637</span> Recent Commits
                </div>
                <div style="display: flex; flex-direction: column; gap: 2px;">
                    ${s.map(g=>`
                        <div style="font-size: 11px; padding: 3px 4px; border-radius: 2px; display: flex; gap: 6px; align-items: baseline;">
                            <code style="color: var(--vscode-textLink-foreground); font-size: 10px; flex-shrink: 0;">${z(g.hash)}</code>
                            <span style="flex: 1; overflow: hidden; text-overflow: ellipsis; white-space: nowrap;" title="${z(g.message)}">${z(g.message)}</span>
                            <span style="font-size: 9px; opacity: 0.5; flex-shrink: 0;">${z(g.timeAgo)}</span>
                        </div>
                    `).join("")}
                </div>
            </div>
        `:"",r=`
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
        `;if(this.conflictState){let g=(this.conflictState.files||[]).map(b=>`
                <button class="btn" style="padding: 6px; font-size: 12px; display: flex; justify-content: space-between; align-items: center;" onclick="sendOpenFileCommand('${z(b.file)}')">
                    <span style="flex: 1; overflow: hidden; text-overflow: ellipsis; white-space: nowrap; direction: rtl; text-align: left;">&lrm;${z(b.file)}</span>
                    <span style="font-size: 10px; opacity: 0.8; flex-shrink: 0; background-color: var(--vscode-badge-background); color: var(--vscode-badge-foreground); padding: 2px 4px; border-radius: 2px;">${z(b.state)}</span>
                </button>
            `).join("");return`<!DOCTYPE html>
            <html lang="en">
            <head>
                <meta charset="UTF-8">
                <meta name="viewport" content="width=device-width, initial-scale=1.0">
                <title>Ricwiz Conflict</title>
                ${r}
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
                
                ${g?`
                    <div style="font-size: 11px; opacity: 0.7; margin: 8px 4px 4px 4px; text-transform: uppercase;">Conflicted Files</div>
                    <div style="display: flex; flex-direction: column; gap: 2px;">
                        ${g}
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
            </html>`}if(u==="blame"){let g=this.blameDataCache;return`<!DOCTYPE html>
            <html lang="en">
            <head>
                <meta charset="UTF-8">
                <meta name="viewport" content="width=device-width, initial-scale=1.0">
                <title>Ricwiz Blame</title>
                ${r}
            </head>
            <body>
                <div style="display: flex; align-items: center; gap: 8px; margin-bottom: 16px; margin-top: 8px;">
                    <button class="btn" style="width: auto; padding: 4px 8px; background-color: var(--vscode-button-secondaryBackground); color: var(--vscode-button-secondaryForeground);" onclick="sendCommand('openDevTools', null, this)">\u2190 Back</button>
                    <div style="font-weight: bold; font-size: 13px; flex: 1; text-align: center;">Who to Blame</div>
                </div>

                ${g?`
                <div style="padding: 12px; background: var(--vscode-editor-background); border: 1px solid var(--vscode-widget-border); border-radius: 6px; margin-bottom: 12px;">
                    <div style="font-weight: bold; margin-bottom: 12px; font-size: 14px; text-align: center; color: var(--vscode-textLink-foreground); word-break: break-all;">
                        \u25A4 ${g.fileName}
                    </div>


                    <div style="margin-bottom: 20px;">
                        <div style="font-size: 11px; font-weight: bold; opacity: 0.8; text-transform: uppercase; margin-bottom: 8px;"><span class="icon" style="color: #0A84FF;">\u25F3</span> Local Git (Last Commits)</div>
                        <ul style="list-style-type: none; padding: 0; margin: 0; display: flex; flex-direction: column; gap: 8px;">
                            ${g.gitHistory&&g.gitHistory.length>0?g.gitHistory.map(b=>`
                                <li style="background: var(--vscode-editorWidget-background); border: 1px solid var(--vscode-widget-border); padding: 8px 10px; border-radius: 4px; border-left: 4px solid var(--vscode-gitDecoration-modifiedResourceForeground);">
                                    <div style="display: flex; justify-content: space-between; margin-bottom: 4px; align-items: center;">
                                        <strong style="font-size: 13px;">${b.author}</strong>
                                        <span style="opacity: 0.7; font-size: 11px;">${b.time}</span>
                                    </div>
                                    <div style="font-size: 12px; margin-bottom: 6px; opacity: 0.9; font-style: italic;">"${b.message}"</div>
                                    <div style="font-family: monospace; font-size: 10px; opacity: 0.6;">Commit: ${b.hash}</div>
                                </li>
                            `).join(""):'<li style="opacity:0.7; font-size: 12px;">No Git history found.</li>'}
                        </ul>
                    </div>

                    <div style="margin-bottom: 20px;">
                        <div style="font-size: 11px; font-weight: bold; opacity: 0.8; text-transform: uppercase; margin-bottom: 8px;"><span class="icon" style="color: #0A84FF;">\u2601</span> Salesforce Metadata</div>
                        <div style="display: flex; flex-direction: column; gap: 8px;">
                            <div style="background: var(--vscode-editorWidget-background); border: 1px solid var(--vscode-widget-border); padding: 8px 10px; border-radius: 4px; border-left: 4px solid var(--vscode-gitDecoration-addedResourceForeground);">
                                <div style="font-size: 10px; opacity: 0.7; text-transform: uppercase; margin-bottom: 2px;">Last Modified By</div>
                                <div style="font-weight: bold; font-size: 13px;">${g.sfAuthor}</div>
                                <div style="font-size: 11px; opacity: 0.7; margin-top: 2px;">${g.sfTime}</div>
                            </div>
                            ${g.sfCreatedBy!=="Unknown"&&g.sfCreatedBy!=="N/A"?`
                            <div style="background: var(--vscode-editorWidget-background); border: 1px solid var(--vscode-widget-border); padding: 8px 10px; border-radius: 4px; border-left: 4px solid var(--vscode-gitDecoration-addedResourceForeground);">
                                <div style="font-size: 10px; opacity: 0.7; text-transform: uppercase; margin-bottom: 2px;">Created By</div>
                                <div style="font-weight: bold; font-size: 13px;">${g.sfCreatedBy}</div>
                            </div>
                            `:""}
                        </div>
                    </div>

                    <div>
                        <div style="font-size: 11px; font-weight: bold; opacity: 0.8; text-transform: uppercase; margin-bottom: 8px;"><span class="icon" style="color: #FFD60A;">\u26B2</span> Setup Audit Trail (Recent)</div>
                        <ul style="list-style-type: none; padding: 0; margin: 0; display: flex; flex-direction: column; gap: 8px;">
                            ${g.auditHistory&&g.auditHistory.length>0?g.auditHistory.map(b=>`
                                <li style="background: var(--vscode-editorWidget-background); border: 1px solid var(--vscode-widget-border); padding: 8px 10px; border-radius: 4px; border-left: 4px solid var(--vscode-gitDecoration-untrackedResourceForeground);">
                                    <div style="display: flex; justify-content: space-between; margin-bottom: 4px; align-items: center;">
                                        <strong style="font-size: 13px;">${b.author}</strong>
                                        <span style="opacity: 0.7; font-size: 11px;">${b.time}</span>
                                    </div>
                                    <div style="font-size: 12px; font-weight: 500; margin-bottom: 4px;">${b.action}</div>
                                    <div style="font-size: 11px; opacity: 0.7; font-style: italic; background: var(--vscode-editor-background); padding: 4px; border-radius: 3px;">${b.display}</div>
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
            </html>`}if(u==="jira"){let g=this.jiraDataCache,b=g?.ticketId||"Jira",S=g?.summary||"No Title",B=g?.description||"No description provided.",D=g?.relatedBranches||[];return`<!DOCTYPE html>
            <html lang="en">
            <head>
                <meta charset="UTF-8">
                <meta name="viewport" content="width=device-width, initial-scale=1.0">
                <title>Ricwiz Jira Details</title>
                ${r}
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
                    <span style="font-weight: 600; font-size: 13px;">${b} Details</span>
                </div>
                
                <div class="card" style="padding: 16px;">
                    <div class="jira-title">${z(S)}</div>
                    <div class="jira-desc">${z(B)}</div>
                    
                    ${D.length>0?`
                        <div style="margin-top: 16px; border-top: 1px solid var(--vscode-panel-border); padding-top: 12px;">
                            <div style="font-size: 11px; opacity: 0.7; margin-bottom: 8px; text-transform: uppercase; font-weight: bold;"><span class="icon" style="color: #32D74B;">\u2387</span> Related Branches & MRs</div>
                            <div style="display: flex; flex-direction: column; gap: 4px;">
                                ${D.map($=>{let R=a($.pipelineStatus),M="";return $.pipelineStatus==="failed"&&$.projectPath&&$.pipelineId&&(M=`onclick="event.stopPropagation(); sendCommand('showPipelineLogs', { projectPath: '${$.projectPath}', pipelineId: ${$.pipelineId} });" style="cursor: pointer;"`),`
                                    <div class="btn" style="padding: 6px 10px; font-size: 12px; display: flex; justify-content: space-between; align-items: center; background-color: var(--vscode-button-secondaryBackground); color: var(--vscode-button-secondaryForeground); border-radius: 4px;" onclick="sendCheckoutCommand('${z($.name)}', this)" title="Checkout ${z($.name)}">
                                        <div style="display: flex; align-items: center; gap: 6px; overflow: hidden;">
                                            <span style="overflow: hidden; text-overflow: ellipsis; white-space: nowrap; font-weight: bold;">${z($.name)}</span>
                                        </div>
                                        <div style="display: flex; gap: 6px; align-items: center;">
                                            ${R?`<span title="Pipeline: ${$.pipelineStatus}" style="font-size: 11px;" ${M}>${R}</span>`:""}
                                            ${$.mrUrl?`<span onclick="event.stopPropagation(); sendCommand('openExternal', '${$.mrUrl}');" title="Open Merge Request" style="cursor: pointer; font-size: 12px;">\u{1F517}</span>`:""}
                                            ${$.isMerged?'<span style="background-color: var(--vscode-charts-green); color: white; border-radius: 3px; padding: 2px 6px; font-size: 10px; font-weight: bold;" title="Merged to target env">MERGED</span>':""}
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
                    ${g?.url?`
                    <button class="btn" style="flex: 1; background-color: var(--vscode-button-secondaryBackground); border-radius: 4px;" onclick="sendCommand('openExternal', '${g.url}', this)">
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
            </html>`}if(u==="dashboard"){let g=this.dashboardDataCache||{queries:[],selectedIndex:0,results:[],error:null},b=g.queries.map((B,D)=>`
                <option value="${D}" ${D===g.selectedIndex?"selected":""}>${z(B.name)}</option>
            `).join(""),S=g.error?`
                <div style="color: var(--vscode-errorForeground); padding: 12px; text-align: center; background: var(--vscode-editorError-background); border-radius: 4px;">
                    \u26A0 ${z(g.error)}
                </div>
            `:g.results.length===0?`
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
                        ${g.results.map(B=>`
                            <tr style="border-bottom: ${B.detailedBranches&&B.detailedBranches.length>0?"none":"1px solid var(--vscode-panel-border)"}; cursor: pointer;" class="tr-hover" onclick="sendCommand('openJiraDetailsForId', '${z(B.key)}', this)">
                                <td style="padding: 6px; font-weight: bold; color: var(--vscode-textLink-foreground); white-space: nowrap;">${z(B.key)}</td>
                                <td style="padding: 6px; overflow: hidden; text-overflow: ellipsis; max-width: 150px; white-space: nowrap;" title="${z(B.summary)}">${z(B.summary)}</td>
                                <td style="padding: 6px; white-space: nowrap;">
                                    <span style="background: ${l(B.status)}; color: white; padding: 2px 4px; border-radius: 3px; font-size: 9px; font-weight: bold; text-transform: uppercase;">${z(B.status)}</span>
                                </td>
                                <td style="padding: 6px; white-space: nowrap; text-align: center;">
                                    ${B.detailedBranches?"":B.branch?`
                                        <button class="icon-button" style="background-color: var(--vscode-button-secondaryBackground); color: var(--vscode-button-secondaryForeground); font-size: 10px; padding: 2px 6px;" title="Checkout ${z(B.branch)}" onclick="event.stopPropagation(); sendCommand('checkout', { branch: '${z(B.branch)}' })">
                                            \u2387 Checkout
                                        </button>
                                    `:`
                                        <button class="icon-button" style="background-color: var(--vscode-button-background); color: var(--vscode-button-foreground); font-size: 10px; padding: 2px 6px;" title="Create Branch for ${z(B.key)}" onclick="event.stopPropagation(); sendCommand('createBranchForTicket', '${z(B.key)}')">
                                            + Create
                                        </button>
                                    `}
                                </td>
                            </tr>
                            ${B.detailedBranches&&B.detailedBranches.length>0?`
                            <tr style="border-bottom: 1px solid var(--vscode-panel-border);">
                                <td colspan="4" style="padding: 0 6px 8px 6px;">
                                    <div style="display: flex; flex-direction: column; gap: 4px; padding-left: 8px; border-left: 2px solid var(--vscode-editorIndentGuide-activeBackground1);">
                                        ${B.detailedBranches.map(D=>{let $=a(D.pipelineStatus),R="";return D.pipelineStatus==="failed"&&D.projectPath&&D.pipelineId&&(R=`onclick="event.stopPropagation(); sendCommand('showPipelineLogs', { projectPath: '${D.projectPath}', pipelineId: ${D.pipelineId} });" style="cursor: pointer;"`),`
                                            <div style="display: flex; justify-content: space-between; align-items: center; font-size: 10px; background: var(--vscode-editor-background); padding: 2px 6px; border-radius: 3px;">
                                                <div style="display: flex; align-items: center; gap: 6px; overflow: hidden; cursor: pointer; flex: 1;" onclick="sendCheckoutCommand('${z(D.name)}', this)" title="Checkout ${z(D.name)}">
                                                    <span style="overflow: hidden; text-overflow: ellipsis; white-space: nowrap;">${z(D.name)}</span>
                                                    ${$?`<span title="Pipeline: ${D.pipelineStatus}" ${R}>${$}</span>`:""}
                                                </div>
                                                <div style="display: flex; gap: 6px; align-items: center;">
                                                    ${D.mrUrl?`<span onclick="event.stopPropagation(); sendCommand('openExternal', '${D.mrUrl}');" title="Open Merge Request" style="cursor: pointer;">\u{1F517}</span>`:""}
                                                    ${D.isMerged?'<span style="background-color: var(--vscode-charts-green); color: white; border-radius: 3px; padding: 1px 4px; font-size: 8px; font-weight: bold;">MERGED</span>':""}
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
                ${r}
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
                
                ${g.queries.length>0?`
                <div style="margin-bottom: 12px;">
                    <select id="querySelect" onchange="sendCommand('switchDashboardQuery', this.value)">
                        ${b}
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
                    ${S}
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
            </html>`}if(u==="devtools")return`<!DOCTYPE html>
            <html lang="en">
            <head>
                <meta charset="UTF-8">
                <meta name="viewport" content="width=device-width, initial-scale=1.0">
                <title>Ricwiz DevTools</title>
                ${r}
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
            </html>`;let c=o.find(g=>g.name===i),p="";c&&(p=a(c.pipelineStatus));let f=c?c.mrUrl:void 0,w=o.filter(g=>g.name!==i),v=i?`<div style="background-color: var(--vscode-editor-inactiveSelectionBackground); padding: 10px; border-radius: 6px; margin-bottom: 16px; border: 1px solid var(--vscode-panel-border); box-shadow: 0 2px 4px rgba(0,0,0,0.1); position: relative;">
                ${this.ticketTitleCache&&this.ticketStatusCache?`
                <div style="position: absolute; top: 6px; right: 6px; z-index: 10; cursor: pointer; font-size: 9px; padding: 2px 6px; border-radius: 4px; background-color: ${l(this.ticketStatusCache)}; color: white; border: 1px solid var(--vscode-panel-border); opacity: 0.9; font-weight: bold; text-transform: uppercase; display: flex; align-items: center; gap: 4px;" onclick="sendCommand('changeJiraStatus', null, this)" title="Update Jira Status">
                    <span>\u270E</span><span>${z(this.ticketStatusCache)}</span>
                </div>
                `:""}
                <div style="font-size: 10px; opacity: 0.7; margin-bottom: 4px; display: flex; align-items: center; justify-content: center; gap: 4px; text-transform: uppercase;">
                    <span>Current Ticket / Branch</span>
                    <button class="copy-btn" onclick="sendCommand('copyBranch', null, this)" title="Copy branch name to clipboard">\u2398</button>
                </div>
                <div style="font-weight: bold; font-size: 14px; word-break: break-all; text-align: center; color: var(--vscode-textLink-foreground); display: flex; justify-content: center; align-items: center; gap: 6px;">
                    <span>${z(i)}</span>
                    ${p?`<span title="Pipeline: ${c.pipelineStatus}" style="font-size: 12px;">${p}</span>`:""}
                    ${f?`<span onclick="event.stopPropagation(); sendCommand('openExternal', '${f}');" title="Open Merge Request" style="cursor: pointer; font-size: 12px;">\u{1F517}</span>`:""}
                    ${this.currentBranchIsMergedCache?'<span style="background-color: var(--vscode-charts-green); color: white; border-radius: 3px; padding: 1px 4px; font-size: 10px; font-weight: bold;" title="Merged to target env">MERGED</span>':""}
                </div>
                ${this.ticketTitleCache?`<div style="font-size: 12px; margin-top: 6px; text-align: center; opacity: 0.9; font-style: italic;">${z(this.ticketTitleCache)}</div>`:""}
                ${w.length>0?`
                    <div style="margin-top: 10px; border-top: 1px solid var(--vscode-panel-border); padding-top: 10px;">
                        <div style="font-size: 10px; opacity: 0.7; margin-bottom: 6px; text-transform: uppercase; text-align: center;">Sister Branches</div>
                        <div style="display: flex; flex-direction: column; gap: 4px;">
                            ${w.map(g=>{let b=a(g.pipelineStatus),S="";return g.pipelineStatus==="failed"&&g.projectPath&&g.pipelineId&&(S=`onclick="event.stopPropagation(); sendCommand('showPipelineLogs', { projectPath: '${g.projectPath}', pipelineId: ${g.pipelineId} });" style="cursor: pointer;"`),`
                                <div class="btn" style="padding: 6px 8px; font-size: 11px; display: flex; justify-content: space-between; align-items: center; background-color: var(--vscode-button-secondaryBackground); color: var(--vscode-button-secondaryForeground); border-radius: 4px; box-sizing: border-box; width: 100%;" onclick="sendCheckoutCommand('${z(g.name)}', this)" title="Checkout ${z(g.name)}">
                                    <div style="display: flex; align-items: center; gap: 4px; overflow: hidden;">
                                        <span style="overflow: hidden; text-overflow: ellipsis; white-space: nowrap; font-weight: bold;">${z(g.name)}</span>
                                    </div>
                                    <div style="display: flex; gap: 4px; align-items: center;">
                                        ${b?`<span title="Pipeline: ${g.pipelineStatus}" style="font-size: 10px;" ${S}>${b}</span>`:""}
                                        ${g.mrUrl?`<span onclick="event.stopPropagation(); sendCommand('openExternal', '${g.mrUrl}');" title="Open Merge Request" style="cursor: pointer; font-size: 10px;">\u{1F517}</span>`:""}
                                        ${g.isMerged?'<span style="background-color: var(--vscode-charts-green); color: white; border-radius: 3px; padding: 1px 4px; font-size: 9px; font-weight: bold;" title="Merged to target env">MERGED</span>':""}
                                    </div>
                                </div>`}).join("")}
                        </div>
                    </div>
                `:d.length>0?`
                    <div style="margin-top: 10px; border-top: 1px solid var(--vscode-panel-border); padding-top: 10px;">
                        <div style="font-size: 10px; opacity: 0.7; margin-bottom: 6px; text-transform: uppercase; text-align: center;">Recent Tickets</div>
                        <div style="display: flex; flex-direction: column; gap: 4px;">
                            ${d.map(g=>`
                                <div class="btn" style="padding: 6px 8px; font-size: 11px; display: flex; justify-content: space-between; align-items: center; background-color: var(--vscode-button-secondaryBackground); color: var(--vscode-button-secondaryForeground); border-radius: 4px; box-sizing: border-box; width: 100%;" onclick="sendCheckoutCommand('${z(g)}', this)" title="Checkout ${z(g)}">
                                    <span style="font-weight: bold; overflow: hidden; text-overflow: ellipsis; white-space: nowrap;">${z(g)}</span>
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
            ${r}
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

            ${v}


            ${m.length>0?`
                <div style="display: flex; gap: 4px; margin-bottom: 16px; flex-wrap: wrap; justify-content: center;">
                    ${m.map(g=>{let b=g.split("/").pop()?.toUpperCase()||g.toUpperCase();return`
                        <button class="btn" style="flex: 1; min-width: 25%; justify-content: center; padding: 6px 4px; font-size: 10px; font-weight: bold; background-color: var(--vscode-button-secondaryBackground); color: var(--vscode-button-secondaryForeground); border-radius: 4px;" onclick="sendCheckoutCommand('${z(g)}', this)" title="Checkout ${z(g)}">
                            ${z(b)}
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

            ${n}
            
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
        </html>`}}});function $t(t){pe=t.secrets}async function Rt(t){if(!pe)throw new Error("SecretStorage is not initialized.");await pe.store("ricwiz.jiraApiToken",t)}async function zt(){if(!pe)throw new Error("SecretStorage is not initialized.");return await pe.get("ricwiz.jiraApiToken")}async function Pt(t){if(!pe)throw new Error("SecretStorage is not initialized.");await pe.store("ricwiz.gitlabApiToken",t)}async function Fe(){if(!pe)throw new Error("SecretStorage is not initialized.");return await pe.get("ricwiz.gitlabApiToken")}var pe,ke=P(()=>{"use strict"});var Te={};Ae(Te,{checkBranchExists:()=>we,checkRemoteBranchExists:()=>Tt,exec:()=>h,extractTicketSuggestion:()=>Ee,getCurrentBranch:()=>j,getWorkspaceCwd:()=>k,normalizeTicketId:()=>Et,promptForTicketId:()=>H,resolvePrefix:()=>Be,ricwizLogger:()=>U});function k(){let t=Se.workspace.workspaceFolders;if(t)return t[0].uri.fsPath}async function j(t){try{let{stdout:e}=await h("git branch --show-current",{cwd:t});return e.trim()}catch{return""}}function Be(t,e){if(!t.includes(e)){let i=t.match(/([A-Z]+-)\d+/i);if(i)return i[1].toUpperCase()}return e}function Ee(t,e,i=!1){let o=t.match(new RegExp(`(${e}\\d+)`,"i"));return o?o[1].toUpperCase():t.includes(e)&&!t.includes("-to-")?t.substring(t.indexOf(e)):i&&t.includes("-to-")?t.substring(t.indexOf(e)).split("-to-")[0]:""}function Et(t,e){let i=t.trim();return/^\d/.test(i)?`${e}${i}`.toUpperCase():i.toUpperCase()}async function H(t,e){let i=Se.workspace.getConfiguration("ricwiz"),o=e?.prefix??i.get("ticketPrefix","SFPSCA-"),s=await j(t),m=Be(s,o),d=e?.suggestedValue??Ee(s,m,e?.handleToSuffix),u=await Se.window.showInputBox({prompt:e?.prompt||"Enter the full ticket ID (e.g., SCPSCA-1234) or just the number",placeHolder:e?.placeHolder||"Ticket ID or number",value:d});return u?{ticketId:Et(u,m),currentBranch:s,prefix:m}:void 0}async function we(t,e){try{return await h(`git show-ref --verify --quiet refs/heads/${e}`,{cwd:t}),!0}catch{}return await Tt(t,e)}async function Tt(t,e){try{let{stdout:i}=await h(`git branch -r --list "*/${e}"`,{cwd:t});return i.trim().length>0}catch{return!1}}var Se,St,Bt,li,U,h,E=P(()=>{"use strict";Se=x(require("vscode")),St=x(require("child_process")),Bt=x(require("util")),li=Bt.promisify(St.exec),U=Se.window.createOutputChannel("Ricwiz"),h=async(t,e)=>{U.appendLine(`[EXEC] ${t}`);let i=await li(t,{maxBuffer:50*1024*1024,...e});return{stdout:i.stdout.toString(),stderr:i.stderr.toString()}}});var lt={};Ae(lt,{WorkflowContext:()=>L});var Ie,Mt,Qe,L,N=P(()=>{"use strict";Ie=x(require("vscode")),Mt=x(require("path")),Qe=x(require("fs")),L=class t{style;upstreamRemote;originRemote;ticketSourceBranch;ticketPrefix;branchPrefix;environments;static baseConfig=Ie.workspace.getConfiguration("ricwiz");activeProfile;profileName;constructor(e){this.activeProfile=e,this.profileName=e?.name;let i=t.baseConfig;this.style=e?.workflowStyle||i.get("workflowStyle","standard"),this.style==="multi-remote"?(this.upstreamRemote=e?.upstreamRemote||i.get("upstreamRemote","salesforce-master"),this.originRemote=e?.originRemote||i.get("originRemote","origin")):(this.upstreamRemote="origin",this.originRemote="origin"),this.ticketSourceBranch=e?.ticketSourceBranch||i.get("ticketSourceBranch","main"),this.ticketPrefix=e?.ticketPrefix||i.get("ticketPrefix","SFPSCA-"),this.branchPrefix=e?.branchPrefix??i.get("branchPrefix","");let o=[{name:"Qual",sourceBranch:"quality"},{name:"Val",sourceBranch:"validation"},{name:"Prod",sourceBranch:"main"}];this.environments=e?.environments||i.get("environments",o)}getConfig(e,i){return this.activeProfile&&this.activeProfile[e]!==void 0?this.activeProfile[e]:t.baseConfig.get(e,i)}static async initialize(e,i){let o=t.baseConfig.get("profiles",[]),s=Mt.join(e,"ricwiz.json");if(Qe.existsSync(s))try{let m=Qe.readFileSync(s,"utf-8"),d=JSON.parse(m);d&&Array.isArray(d.profiles)&&(o=[...o,...d.profiles])}catch(m){Ie.window.showErrorMessage(`Ricwiz: Error parsing ricwiz.json: ${m.message}`)}if(o.length>0){if(!i?.forcePrompt)try{let{exec:l}=(E(),I(Te)),{stdout:a}=await l("git branch --show-current",{cwd:e}),n=a.trim(),r=n;n.includes("-to-")&&(r=n.split("-to-")[0]);let{stdout:c}=await l(`git config branch.${r}.ricwiz-profile`,{cwd:e}),p=c.trim();if(p){let f=o.find(w=>w.name===p);if(f)return new t(f)}}catch{}if(i?.skipPrompt)return new t;let m=o.map(l=>l.name),d=await Ie.window.showQuickPick(m,{placeHolder:"Ricwiz: Select Workflow Profile",ignoreFocusOut:!0});if(!d)return;let u=o.find(l=>l.name===d);return new t(u)}return new t}buildUpstreamPath(e){return e.includes("/")?e:`${this.upstreamRemote}/${e}`}getFetchRemote(e){return e.includes("/")?e.split("/")[0]:this.upstreamRemote}getFetchBranch(e){return e.includes("/")?e.substring(e.indexOf("/")+1):e}}});async function Dt(){let t=k();if(!t){V.window.showErrorMessage("Ricwiz: Open a workspace that is a Git repository.");return}let e=await L.initialize(t,{skipPrompt:!0}),i=e?e.ticketSourceBranch:V.workspace.getConfiguration("ricwiz").get("ticketSourceBranch","main"),o=e?e.originRemote:"origin";await V.window.withProgress({location:V.ProgressLocation.Notification,title:`Ricwiz: Finding deleted files compared to ${o}/${i}...`,cancellable:!1},async()=>{try{let{stdout:s}=await h(`git diff --name-only --diff-filter=D ${o}/${i}...HEAD`,{cwd:t}),m=s.split(`
`).map(p=>p.trim()).filter(p=>p.length>0);if(m.length===0){V.window.showInformationMessage(`Ricwiz: No deleted files found compared to ${o}/${i}.`);return}let d={},u=(p,f)=>{d[p]||(d[p]=[]),d[p].includes(f)||d[p].push(f)};for(let p of m){let f=p.replace(/\\/g,"/");if(f.includes("/classes/")){let w=f.match(/\/classes\/([^/.]+)\.cls/);w&&u("ApexClass",w[1])}else if(f.includes("/triggers/")){let w=f.match(/\/triggers\/([^/.]+)\.trigger/);w&&u("ApexTrigger",w[1])}else if(f.includes("/lwc/")){let w=f.match(/\/lwc\/([^/]+)\//);w&&u("LightningComponentBundle",w[1])}else if(f.includes("/aura/")){let w=f.match(/\/aura\/([^/]+)\//);w&&u("AuraDefinitionBundle",w[1])}else if(f.includes("/objects/")&&f.includes("/fields/")){let w=f.match(/\/objects\/([^/]+)\//),v=f.match(/\/fields\/([^/.]+)\.field/);w&&v&&u("CustomField",`${w[1]}.${v[1]}`)}else if(f.includes("/objects/")){let w=f.match(/\/objects\/([^/.]+)\.object/);w&&u("CustomObject",w[1])}else if(f.includes("/layouts/")){let w=f.match(/\/layouts\/([^/.]+)\.layout/);w&&u("Layout",w[1])}else if(f.includes("/flows/")){let w=f.match(/\/flows\/([^/.]+)\.flow/);w&&u("Flow",w[1])}else if(f.includes("/permissionsets/")){let w=f.match(/\/permissionsets\/([^/.]+)\.permissionset/);w&&u("PermissionSet",w[1])}else if(f.includes("/profiles/")){let w=f.match(/\/profiles\/([^/.]+)\.profile/);w&&u("Profile",w[1])}else if(f.includes("/customMetadata/")){let w=f.match(/\/customMetadata\/([^/.]+)\.md/);w&&u("CustomMetadata",w[1])}else if(f.includes("/flexipages/")){let w=f.match(/\/flexipages\/([^/.]+)\.flexipage/);w&&u("FlexiPage",w[1])}}if(Object.keys(d).length===0){V.window.showInformationMessage("Ricwiz: Found deleted files in Git, but none mapped to recognizable Salesforce metadata.");return}let l=`<?xml version="1.0" encoding="UTF-8"?>
<Package xmlns="http://soap.sforce.com/2006/04/metadata">
`;for(let p of Object.keys(d).sort()){l+=`    <types>
`;for(let f of d[p].sort())l+=`        <members>${f}</members>
`;l+=`        <name>${p}</name>
    </types>
`}l+=`    <version>58.0</version>
</Package>`;let a=Ye.join(t,"destructiveChanges");ve.existsSync(a)||ve.mkdirSync(a);let n=Ye.join(a,"destructiveChanges.xml"),r=Ye.join(a,"package.xml");ve.writeFileSync(n,l,"utf8"),ve.existsSync(r)||ve.writeFileSync(r,`<?xml version="1.0" encoding="UTF-8"?>
<Package xmlns="http://soap.sforce.com/2006/04/metadata">
    <version>58.0</version>
</Package>`,"utf8");let c=await V.workspace.openTextDocument(n);await V.window.showTextDocument(c),V.window.showInformationMessage("Ricwiz: destructiveChanges.xml generated successfully!")}catch(s){V.window.showErrorMessage(`Ricwiz: Error generating destructive changes: ${s.message}`)}})}var V,Ye,ve,Lt=P(()=>{"use strict";V=x(require("vscode")),Ye=x(require("path")),ve=x(require("fs"));E();N()});async function At(){let t=k();if(!t)return;let e=await L.initialize(t,{skipPrompt:!0}),i=e?e.ticketSourceBranch:ce.workspace.getConfiguration("ricwiz").get("ticketSourceBranch","main"),o=e?e.originRemote:"origin";await ce.window.withProgress({location:ce.ProgressLocation.Notification,title:"Ricwiz: Finding Apex Tests to run...",cancellable:!1},async()=>{try{let{stdout:s}=await h(`git diff --name-status ${o}/${i}...HEAD`,{cwd:t}),m=s.split(`
`).map(p=>p.trim()).filter(p=>p.length>0),d=new Set,u=new Set;for(let p of m){let f=p.split(/\s+/);if(f[0].startsWith("D"))continue;let w=f[1];if(w&&w.endsWith(".cls")){let v=w.match(/\/classes\/([^/.]+)\.cls/);if(v){let g=v[1];g.toLowerCase().endsWith("test")?d.add(g):u.add(g)}}}for(let p of u)d.add(`${p}Test`);if(d.size===0){ce.window.showInformationMessage("Ricwiz: No Apex Classes were modified in this branch.");return}let l=Array.from(d).map(p=>({label:`$(beaker) ${p}`,description:"Apex Test Class"})),a=await ce.window.showQuickPick(l,{canPickMany:!0,title:"Select Test Classes to Run",placeHolder:"Select tests..."});if(!a||a.length===0)return;let r=`sf apex run test -n ${a.map(p=>p.label.replace("$(beaker) ","").trim()).join(",")} -r human -w 30`,c=ce.window.createTerminal("Ricwiz: Smart Tests");c.show(),c.sendText(r)}catch(s){ce.window.showErrorMessage(`Ricwiz: Error finding tests: ${s.message}`)}})}var ce,Ft=P(()=>{"use strict";ce=x(require("vscode"));E();N()});var Ce,It=P(()=>{"use strict";Ce=class{static isValidShellArg(e){return e?/^[a-zA-Z0-9\-_/.]+$/.test(e):!1}}});async function Ot(t){let e=k();if(!e){F.window.showErrorMessage("Open a folder or workspace that is a Git repository.");return}let i=await L.initialize(e,{forcePrompt:!0});if(!i)return;let o=typeof t=="string"?t:void 0,s=await H(e,{prefix:i.ticketPrefix,suggestedValue:o});if(!s){F.window.showErrorMessage("Branch creation cancelled: Ticket not provided.");return}let{ticketId:m}=s,d=i.environments,u="all",l=[{label:"Create Main Branch & Environments",description:"Creates the main ticket branch and all environment branches",value:"all"},{label:"Create Main Branch Only",description:"Creates only the main ticket branch (skips environments)",value:"mainOnly"},{label:"Create Environments Only",description:"Creates only the environment branches (skip main branch)",value:"envs"}];if(d.length>0){let c=await F.window.showQuickPick(l,{placeHolder:"Ricwiz: What do you want to create?",ignoreFocusOut:!0});if(!c)return;u=c.value}let a=i.ticketSourceBranch;if(u==="all"||u==="mainOnly"){let c=[];try{let{stdout:v}=await h('git branch --all --format="%(refname:short)"',{cwd:e});c=v.split(`
`).map(g=>g.trim()).filter(g=>g&&g!=="origin"),c=[...new Set(c)]}catch{}let p=F.window.createQuickPick();p.title="Ricwiz: Ticket Source Branch",p.placeholder="Confirm or change the source branch for this ticket",p.value=i.ticketSourceBranch,p.ignoreFocusOut=!0;let f=()=>{let v=p.value.trim(),g=[];v&&g.push({label:v,description:"Use typed branch"}),g.push(...c.map(b=>({label:b}))),p.items=g};p.onDidChangeValue(f),f();let w=await new Promise(v=>{p.onDidAccept(()=>{let g=p.selectedItems[0];v(g?g.label:p.value),p.hide()}),p.onDidHide(()=>v(void 0)),p.show()});if(!w){F.window.showInformationMessage("Branch creation cancelled.");return}a=w.trim()}let n="";if(i.branchPrefix){let c=await F.window.showInputBox({prompt:"Ricwiz: Branch Prefix (leave empty to not use a prefix)",placeHolder:"e.g. CRC-R19-",value:i.branchPrefix,ignoreFocusOut:!0});if(c===void 0){F.window.showInformationMessage("Branch creation cancelled.");return}n=c.trim()}let r=n?`${n}${m}`:m;if(!Ce.isValidShellArg(r)){F.window.showErrorMessage(`Invalid format for ticket ID: ${r}`);return}if(!Ce.isValidShellArg(a)){F.window.showErrorMessage(`Invalid format for ticketSourceBranch in settings: ${a}`);return}for(let c of d){if(!Ce.isValidShellArg(c.name)){F.window.showErrorMessage(`Invalid format for environment name in settings: ${c.name}`);return}if(!Ce.isValidShellArg(c.sourceBranch)){F.window.showErrorMessage(`Invalid format for environment sourceBranch in settings: ${c.sourceBranch}`);return}}try{await h("git status",{cwd:e})}catch{F.window.showErrorMessage("The opened folder does not appear to be a valid Git repository.");return}try{await F.window.withProgress({location:F.ProgressLocation.Notification,title:"Ricwiz: Creating Branches",cancellable:!1},async c=>{let p=[];c.report({message:"Checking remote status (git fetch)...",increment:10});try{await h("git fetch",{cwd:e})}catch{}try{if(u==="all"||u==="mainOnly"){if(c.report({message:`Creating main branch ${r}...`,increment:10}),await we(e,r))F.window.showInformationMessage(`Ricwiz: The branch ${r} already exists. Skipping creation...`),await h(`git checkout ${r}`,{cwd:e});else try{let f=i.getFetchRemote(a),w=i.getFetchBranch(a),v=i.buildUpstreamPath(a);await h(`git fetch ${f} ${w}`,{cwd:e}),await h(`git checkout -b ${r} ${v}`,{cwd:e}),p.push(r)}catch{try{await h(`git checkout -b ${r} ${a}`,{cwd:e}),p.push(r)}catch{throw new Error(`Could not create main branch '${r}' from '${a}'. Does the source branch exist?`)}}try{await h(`git config branch.${r}.ricwiz-source "${a}"`,{cwd:e}),i.profileName&&await h(`git config branch.${r}.ricwiz-profile "${i.profileName}"`,{cwd:e})}catch{}}if(u==="all"||u==="envs"){let f=50/(d.length||1);for(let w of d){let v=n?`${n}${m}-to-${w.name}`:`${m}-to-${w.name}`,g=w.sourceBranch;if(c.report({message:`Processing environment branch ${v}...`,increment:f}),!await we(e,v))try{let b=i.buildUpstreamPath(g);await h(`git checkout -b ${v} ${b}`,{cwd:e}),p.push(v)}catch{try{await h(`git checkout -b ${v} ${g}`,{cwd:e}),p.push(v)}catch{throw new Error(`Could not create environment branch '${v}' from '${g}'. Does the source branch exist?`)}}}}c.report({message:`Publishing branches to ${i.originRemote}...`,increment:10});for(let f of p)try{await h(`git push -u ${i.originRemote} ${f}`,{cwd:e})}catch{F.window.showWarningMessage(`Ricwiz: Branch ${f} was created locally but could not be pushed to ${i.originRemote}.`)}if(u==="all"||u==="mainOnly"){c.report({message:`Switching to ${r}...`,increment:10});try{await h(`git checkout ${r}`,{cwd:e})}catch{}}c.report({increment:100}),F.window.showInformationMessage("Ricwiz: All set! You can start working on your branches! \u{1F680}")}catch(f){if(F.window.showErrorMessage(`Ricwiz Branch Creation Failed: ${f.message}`),p.length>0){try{await h(`git checkout ${a}`,{cwd:e})}catch{}for(let w of p)try{await h(`git branch -D ${w}`,{cwd:e})}catch{}F.window.showWarningMessage(`Ricwiz: Rolled back (deleted) ${p.length} branch(es) locally due to failure.`)}}})}catch(c){F.window.showErrorMessage(`Ricwiz general error: ${c.message}`)}}var F,Ut=P(()=>{"use strict";F=x(require("vscode"));E();It();N()});async function $e(t,e,i,o){o&&o.report({message:"CONFLICT! Resolve & click 'Commit & Continue' in Ricwiz panel."});let s=!1,m=!1,d=async()=>{try{let{stdout:n}=await h("git status --porcelain",{cwd:t});return n.split(`
`).filter(r=>{let c=r.substring(0,2);return["UD","DU","DD","AU","UA"].includes(c)}).map(r=>r.substring(3).trim())}catch{return[]}},u=async()=>{try{let{stdout:n}=await h("git status --porcelain",{cwd:t}),r=c=>c==="UU"?"Both Modified":c==="UD"?"Deleted by them":c==="DU"?"Deleted by us":c==="DD"?"Both Deleted":c==="AA"?"Both Added":c==="AU"?"Added by us":c==="UA"?"Added by them":"Conflicted";return n.split(`
`).map(c=>c.trimRight()).filter(c=>c.length>2).filter(c=>{let p=c.substring(0,2);return["UU","AA","UD","DU","AU","UA","DD"].includes(p)}).map(c=>{let p=c.substring(0,2);return{file:c.substring(3).trim(),state:r(p)}})}catch{return[]}},l=async()=>{if(s)return;let n=await d(),r=await u(),{webviewProvider:c}=(Ze(),I(Ke));c&&c.setConflictState({isConflict:!0,sourceStr:e,targetStr:i,deletionsCount:n.length,files:r})},a=de.commands.registerCommand("ricwiz.conflictAction",async n=>{if(n==="abortDeploy")m=!0;else if(n==="resolveDeletions"){try{let c=(await d()).map(f=>({label:f})),p=await de.window.showQuickPick(c,{canPickMany:!0,placeHolder:"Select conflicted files to DELETE",title:"Ricwiz: Delete Conflicted Files"});if(p&&p.length>0){for(let f of p)try{await h(`git rm --force "${f.label}"`,{cwd:t})}catch{}de.window.showInformationMessage(`Ricwiz: Deleted ${p.length} conflicted file(s).`)}}catch(r){de.window.showErrorMessage(`Ricwiz: Error. (${r.message})`)}l()}else if(n==="commitAndContinue")try{let c=(await d()).filter(f=>jt.existsSync(Nt.join(t,f)));if(c.length>0&&await de.window.showWarningMessage(`Wait! There are ${c.length} file(s) with deletion conflicts that are still on your disk.

If you commit now, you will KEEP them in the project.

Are you sure you want to KEEP them?`,{modal:!0},"Yes, KEEP them","No, let me DELETE them")!=="Yes, KEEP them"){l();return}let p=!1;try{let{stdout:f}=await h('git grep -E "^<<<<<<< "',{cwd:t});f.trim().length>0&&(p=!0)}catch{}if(p){de.window.showErrorMessage("Ricwiz: You still have unresolved conflict markers (<<<<<<<) in your files. Please resolve them first!"),l();return}await h("git add .",{cwd:t}),await h("git commit --no-edit",{cwd:t})}catch(r){de.window.showErrorMessage(`Ricwiz: Could not commit automatically. (${r.message})`),l()}});for(l();;){if(m){s=!0,a.dispose(),(Ze(),I(Ke)).webviewProvider?.setConflictState(null);try{await h("git merge --abort",{cwd:t})}catch{}return!1}try{let{stdout:n}=await h("git status --porcelain",{cwd:t});if(n.trim().length===0)return s=!0,a.dispose(),(Ze(),I(Ke)).webviewProvider?.setConflictState(null),de.window.showInformationMessage("Ricwiz: Changes committed!"),!0}catch{}await new Promise(n=>setTimeout(n,2e3))}}var de,jt,Nt,Xe=P(()=>{"use strict";de=x(require("vscode")),jt=x(require("fs")),Nt=x(require("path"));E()});var nt={};Ae(nt,{fetchMergeRequestStatus:()=>it,hasGitlabToken:()=>ot,ricwizLogger:()=>J});async function ot(){let t=await Fe();return!!(t&&t.trim())}async function mi(t,e){let i=tt.workspace.getConfiguration("ricwiz"),o=(await Fe())?.trim();if(!o)throw new Error("No GitLab token");let s=e?e.getConfig("gitlabUrlOverride",""):i.get("gitlabUrlOverride",""),m=[];if(s&&s.trim()!=="")m.push(s.trim());else try{let{stdout:u}=await h("git remote",{cwd:t}),l=u.split(`
`).map(n=>n.trim()).filter(n=>n),a=[];e&&e.upstreamRemote&&l.includes(e.upstreamRemote)&&a.push(e.upstreamRemote),e&&e.originRemote&&e.originRemote!==e.upstreamRemote&&l.includes(e.originRemote)&&a.push(e.originRemote),l.includes("upstream")&&!a.includes("upstream")&&a.push("upstream"),l.includes("origin")&&!a.includes("origin")&&a.push("origin"),a.length===0&&l.length>0&&a.push(...l);for(let n of a)try{let{stdout:r}=await h(`git remote get-url ${n}`,{cwd:t}),c=r.trim();c.endsWith(".git")&&(c=c.slice(0,-4)),c.startsWith("git@")&&(c=c.replace("git@","").replace(":","/"),c=`https://${c}`),m.push(c)}catch(r){J.appendLine(`[GitLab API] Error getting remote URL for ${n}: ${r.message}`)}}catch(u){J.appendLine(`[GitLab API] Error getting remotes: ${u.message}`)}if(m.length===0)throw J.appendLine("[GitLab API] No candidate URLs found in getGitlabTargets!"),new Error("Could not get any remote origin URL.");return m.map(u=>{let l=new URL(u),a=`${l.protocol}//${l.host}`,n=l.pathname;n.startsWith("/")&&(n=n.substring(1)),n.endsWith("/")&&(n=n.slice(0,-1)),n.endsWith(".git")&&(n=n.slice(0,-4));let r=encodeURIComponent(n);return{baseUrl:a,token:o,projectPath:r}})}async function mt(t,e,i,o,s){let m=new URL(`${e}${s}`);return J.appendLine(`[GitLab API] ${o} ${m.toString()}`),new Promise((d,u)=>{let l=et.request(m,{method:o,timeout:5e3,agent:pi,headers:{"PRIVATE-TOKEN":i,Accept:"application/json"}},a=>{let n="";a.on("data",r=>n+=r),a.on("end",()=>{if(J.appendLine(`[GitLab API] Response Code: ${a.statusCode}`),a.statusCode&&a.statusCode>=400)return J.appendLine(`[GitLab API] Error Data: ${n}`),u(new Error(`GitLab API error: ${a.statusCode}`));if(!n)return d({});try{let r=JSON.parse(n);Array.isArray(r)?J.appendLine(`[GitLab API] Returned array with ${r.length} items`):r&&typeof r=="object"&&J.appendLine(`[GitLab API] Returned object with id ${r.id||r.iid||"unknown"}`),d(r)}catch(r){J.appendLine(`[GitLab API] Parse Error: ${r.message}`),u(r)}})});l.on("timeout",()=>{l.destroy(),u(new Error("GitLab request timed out"))}),l.on("error",a=>{J.appendLine(`[GitLab API] Request Failed: ${a.message}`),u(a)}),l.end()})}async function it(t,e,i,o){J.appendLine(`[GitLab API] fetchMergeRequestStatus called for source: ${e}, target: ${i||"any"}`);let s=`${t}:${e}:${i||"any"}`,m=pt.get(s);if(m&&Date.now()-m.timestamp<ui)return m.data;try{let d=await mi(t,o),u=null,l=-1;for(let a of d)try{let n=`/api/v4/projects/${a.projectPath}/merge_requests?source_branch=${encodeURIComponent(e)}&order_by=updated_at&sort=desc`;i&&(n+=`&target_branch=${encodeURIComponent(i)}`);let r=await mt(t,a.baseUrl,a.token,"GET",n);if(r&&r.length>0){let c=r[0];try{let v=await mt(t,a.baseUrl,a.token,"GET",`/api/v4/projects/${a.projectPath}/merge_requests/${c.iid}`);v&&(c=v)}catch{}let p="none";if(c.head_pipeline&&c.head_pipeline.status){let v=c.head_pipeline.status;v==="success"||v==="failed"||v==="canceled"||v==="skipped"?p=v:p="running"}let f={isMerged:c.state==="merged",isOpen:c.state==="opened",pipelineStatus:p,webUrl:c.web_url,projectPath:a.projectPath,pipelineId:c.head_pipeline?c.head_pipeline.id:void 0},w=0;f.isOpen?w=2:f.isMerged&&(w=1),w>l&&(u=f,l=w)}}catch(n){J.appendLine(`[GitLab API] Error inside target loop: ${n.message}`)}if(u)return pt.set(s,{data:u,timestamp:Date.now()}),u;for(let a of d)try{let n=`/api/v4/projects/${a.projectPath}/pipelines?ref=${encodeURIComponent(e)}&order_by=updated_at&sort=desc`,r=await mt(t,a.baseUrl,a.token,"GET",n);if(r&&r.length>0){let c=r[0],p="none";if(c.status){let w=c.status;w==="success"||w==="failed"||w==="canceled"||w==="skipped"?p=w:p="running"}let f={isMerged:!1,isOpen:!1,pipelineStatus:p,webUrl:c.web_url,projectPath:a.projectPath,pipelineId:c.id};return pt.set(s,{data:f,timestamp:Date.now()}),f}}catch{}return null}catch(d){return J.appendLine(`[GitLab API] Failed to fetch MR status: ${d.message}`),null}}var et,tt,J,pi,pt,ui,Oe=P(()=>{"use strict";et=x(require("https")),tt=x(require("vscode"));ke();E();J=tt.window.createOutputChannel("Ricwiz Debug"),pi=new et.Agent({keepAlive:!0,maxSockets:10});pt=new Map,ui=30*1e3});var be={};Ae(be,{findRelatedBranches:()=>wt,getCurrentBranchMergeStatus:()=>gt,getRecentCommits:()=>ft,getRecentTickets:()=>ht,getRelatedBranchesStatus:()=>ut,resolveExistingBranchName:()=>gi});function Wt(t,e){return e.find(i=>t.endsWith(`-to-${i.name}`))}async function ut(t,e,i,o,s){let m=await ot(),d=[];for(let u of e){let l=Wt(u,o);if(m){let a=l?l.sourceBranch:void 0,n=await it(t,u,a,s);if(n){d.push({name:u,isMerged:n.isMerged,pipelineStatus:n.pipelineStatus,mrUrl:n.webUrl,projectPath:n.projectPath,pipelineId:n.pipelineId});continue}}else{let{ricwizLogger:a}=(Oe(),I(nt));a.appendLine(`[GitLab API] Skipping MR check for ${u} because hasGitlabToken() is false`)}d.push({name:u,isMerged:!1,pipelineStatus:"none"})}return d}async function gt(t,e,i,o){let s=Wt(e,i);if(!s)return!1;if(await ot()){let m=await it(t,e,s.sourceBranch,o);if(m)return m.isMerged}else{let{ricwizLogger:m}=(Oe(),I(nt));m.appendLine(`[GitLab API] Skipping MR check for current branch ${e} because hasGitlabToken() is false`)}return!1}async function ft(t,e=10){try{let{stdout:i}=await h(`git log --oneline -${e} --format="%h|||%s|||%ar"`,{cwd:t});return i.split(`
`).filter(o=>o.trim()).map(o=>{let s=o.split("|||");return{hash:s[0]||"",message:s.length>=3?s.slice(1,-1).join("|||"):s[1]||"",timeAgo:s.length>=3?s[s.length-1]:""}})}catch{return[]}}async function ht(t,e=3){try{let{stdout:i}=await h('git for-each-ref --sort=-committerdate --format="%(refname:short)" refs/heads/',{cwd:t}),o=i.split(`
`).map(m=>m.trim()).filter(m=>m),s=/^[A-Z]+-\d+$/i;return o.filter(m=>s.test(m)).slice(0,e)}catch{return[]}}async function wt(t,e,i){let{stdout:o}=await h(`git branch --all --list "*${e}*"`,{cwd:t}),s=new Set,m=new RegExp(`${e}(?!\\d)`,"i");return o.split(`
`).forEach(d=>{let u=d.replace("*","").trim();if(u){if(u.startsWith("remotes/")){let l=u.split("/");l.length>2&&(u=l.slice(2).join("/"))}u&&u!==i&&!u.includes("HEAD")&&m.test(u)&&s.add(u)}}),Array.from(s)}async function gi(t,e,i){try{let o=require("child_process"),m=require("util").promisify(o.exec),{stdout:d}=await m(`git branch --all --list "*${e}*"`,{cwd:t}),u=new RegExp(`${e}(?!\\d)`,"i"),l=d.split(`
`).map(n=>n.replace("*","").trim().replace(/^remotes\/[^\/]+\//,"")).filter(n=>n&&!n.includes("HEAD")&&u.test(n)),a=Array.from(new Set(l));if(i){let n=`-to-${i}`,r=a.find(c=>c.endsWith(n));return r||`${e}${n}`}else{let n=a.find(r=>!r.includes("-to-"));return n||e}}catch{return i?`${e}-to-${i}`:e}}var ue=P(()=>{"use strict";E();Oe()});async function Jt(){let t=k();if(!t){q.window.showErrorMessage("Ricwiz: Open a folder or workspace that is a Git repository.");return}try{await h("git status",{cwd:t})}catch{q.window.showErrorMessage("Ricwiz: The opened folder does not appear to be a valid Git repository.");return}let e=await L.initialize(t);if(!e)return;let i=e.environments,o=await H(t,{prefix:e.ticketPrefix});if(!o){q.window.showErrorMessage("Operation cancelled: Ticket not provided.");return}let{ticketId:s,currentBranch:m}=o,{resolveExistingBranchName:d}=(ue(),I(be)),u=await d(t,s);if(!await we(t,u)){q.window.showErrorMessage(`Ricwiz: Main branch '${u}' does not exist! Prepare deploy is only available when a main ticket branch is used.`);return}let l=e.getConfig("defaultReviewers",""),a="";try{let{stdout:n}=await h(`git config branch.${s}.ricwiz-reviewers`,{cwd:t});a=n.trim()}catch{}if(l.trim()){let n=await q.window.showInputBox({prompt:"Ricwiz: Reviewers for this deploy (optional, comma-separated)",placeHolder:"e.g. @joao, 123456",value:a||l,ignoreFocusOut:!0});if(n===void 0)return;try{n.trim()?await h(`git config branch.${s}.ricwiz-reviewers "${n.trim()}"`,{cwd:t}):a&&await h(`git config --unset branch.${s}.ricwiz-reviewers`,{cwd:t})}catch{}}await q.window.withProgress({location:q.ProgressLocation.Notification,title:"Ricwiz: Preparing Deploy",cancellable:!0},async(n,r)=>{let c=0,p=m,f=!1;r.onCancellationRequested(()=>{f=!0}),n.report({message:"Syncing remote information...",increment:10});try{await h("git fetch --all",{cwd:t});let v=10/(i.length||1);for(let g of i)try{if(f)throw new Error("Aborted");n.report({message:`Fetching ${g.sourceBranch}...`,increment:v});let b=e.getFetchRemote(g.sourceBranch),S=e.getFetchBranch(g.sourceBranch);await h(`git fetch ${b} ${S}:${S}`,{cwd:t})}catch{}}catch{}let w=60/(i.length||1);for(let v of i){if(f)break;let g=await d(t,s,v.name),b=v.sourceBranch;try{n.report({message:`Processing ${g}...`,increment:w/4}),await h(`git checkout ${g}`,{cwd:t});try{await h(`git pull ${e.originRemote} ${g}`,{cwd:t})}catch{}let S=async R=>{try{await h(`git merge ${R}`,{cwd:t})}catch(M){let oe=!1;try{let{stdout:me}=await h("git ls-files -u",{cwd:t});me.trim().length>0&&(oe=!0)}catch{}let Y=((M.stdout||"")+(M.stderr||"")+(M.message||"")).toLowerCase();if(oe||Y.includes("conflict")||Y.includes("conflit")){if(!await $e(t,R,g,n))throw f=!0,new Error("Deploy aborted by user.")}else throw M}};n.report({message:`Merging ${b} into ${g}...`,increment:w/4});let B=e.getFetchRemote(b),D=e.getFetchBranch(b),$=e.buildUpstreamPath(b);if(await h(`git fetch ${B} ${D}`,{cwd:t}),await S($),n.report({message:`Merging ${u} into ${g}...`,increment:w/4}),await S(u),f)break;n.report({message:`Pushing ${g}...`,increment:w/4}),await h(`git push ${e.originRemote} ${g}`,{cwd:t}),c++}catch(S){S.message.includes("aborted")?q.window.showInformationMessage("Ricwiz: Deploy cancelled."):q.window.showErrorMessage(`Ricwiz: Failed to process branch ${g}. Detail: ${S.message}`);return}}if(!f){n.report({message:"Finishing up...",increment:10});let v=p;try{await h(`git show-ref --verify --quiet refs/heads/${u}`,{cwd:t}),v=u}catch{}try{let g=await j(t);v&&v!==g?(await h(`git checkout ${v}`,{cwd:t}),q.window.showInformationMessage(`Ricwiz: Operation complete. Back on branch ${v}.`)):q.window.showInformationMessage("Ricwiz: Operation complete.")}catch{q.window.showInformationMessage("Ricwiz: Operation complete.")}}})}var q,qt=P(()=>{"use strict";q=x(require("vscode"));E();Xe();N()});async function Gt(t=!1){let e=k();if(!e)return;let i=await L.initialize(e);if(!i)return;let o=await H(e,{prompt:"Enter the full ticket ID for the Merge Requests (e.g., SCPSCA-1234) or just the number"});if(!o)return;let{ticketId:s}=o,m=i.getConfig("gitlabUrlOverride",""),d="";if(m&&m.trim()!=="")d=m.trim().replace(/\/+$/,"");else{let n="";try{let r=i.upstreamRemote||"origin",{stdout:c}=await h(`git remote get-url ${r}`,{cwd:e});n=c.trim()}catch{ge.window.showErrorMessage("Ricwiz: Could not get the remote origin URL. Please configure the URL manually in the extension settings.");return}d=n,d.endsWith(".git")&&(d=d.slice(0,-4)),d.startsWith("git@")&&(d=d.replace("git@","").replace(":","/"),d=`https://${d}`)}let u=[],l=i.ticketSourceBranch;try{let{stdout:n}=await h(`git config branch.${s}.ricwiz-source`,{cwd:e});n.trim()&&(l=n.trim())}catch{}let{resolveExistingBranchName:a}=(ue(),I(be));if(i.environments.length===0){let n=await a(e,s);u.push({source:n,target:l})}else for(let n of i.environments){let r=await a(e,s,n.name);u.push({source:r,target:n.sourceBranch})}for(let n of u){let r=`${d}/-/merge_requests/new?merge_request[source_branch]=${n.source}&merge_request[target_branch]=${n.target}`;t?ge.commands.executeCommand("simpleBrowser.show",r):ge.env.openExternal(ge.Uri.parse(r))}ge.window.showInformationMessage(`Ricwiz: Opening ${t?"VS Code browser":"external browser"} for Merge Requests!`)}async function Ht(){return Gt(!1)}async function Vt(){return Gt(!0)}var ge,_t=P(()=>{"use strict";ge=x(require("vscode"));E();N()});async function Qt(t=!1){let e=k();if(!e)return;let i=ie.workspace.getConfiguration("ricwiz"),o=i.get("jiraUrl","");if(!o||o.trim()===""){ie.window.showErrorMessage("Ricwiz: Jira URL is not configured. Please set it in the extension settings (e.g., https://jira.company.com/browse/).");return}let{getCurrentBranch:s,resolvePrefix:m,extractTicketSuggestion:d}=(E(),I(Te)),u=await s(e),l=i.get("ticketPrefix","SFPSCA-"),a=m(u,l),r=d(u,a,!0);if(r){let{normalizeTicketId:p}=(E(),I(Te));r=p(r,a)}else{let p=await H(e,{prompt:"Ricwiz could not detect the ticket from the branch name. Enter Jira ticket ID (e.g. SFPSCA-1234)",handleToSuffix:!0});if(!p)return;r=p.ticketId}let c=o.trim();c.endsWith("/")||(c+="/"),c+=r,t?ie.commands.executeCommand("simpleBrowser.show",c):ie.env.openExternal(ie.Uri.parse(c)),ie.window.showInformationMessage(`Ricwiz: Opening Jira Ticket ${r} in ${t?"VS Code":"browser"}!`)}async function Yt(){return Qt(!1)}async function Kt(){return Qt(!0)}var ie,Zt=P(()=>{"use strict";ie=x(require("vscode"));E()});async function to(){let t=eo.workspace.getConfiguration("ricwiz"),e=t.get("jiraUrl",""),i=t.get("jiraEmail","")?.trim(),o=(await zt())?.trim();if(!e||!o)throw new Error('Jira API Token is not securely configured. Please run the "Ricwiz: Set Secure Jira API Token" command.');let s=e;s.includes("/browse")&&(s=s.split("/browse")[0]),s.endsWith("/")&&(s=s.slice(0,-1));let m=i?`Basic ${Buffer.from(`${i}:${o}`).toString("base64")}`:`Bearer ${o}`;return{baseUrl:s,headerAuth:m}}async function Me(t,e,i){let{baseUrl:o,headerAuth:s}=await to(),m=new URL(`${o}${e}`);return new Promise((d,u)=>{let l=Xt.request(m,{method:t,headers:{Authorization:s,Accept:"application/json",...i?{"Content-Type":"application/json"}:{}}},a=>{let n="";a.on("data",r=>n+=r),a.on("end",()=>{if(a.statusCode===401||a.statusCode===403)return u(new Error(`Authentication failed (HTTP ${a.statusCode}). Please check your Jira settings.`));if(a.statusCode&&a.statusCode>=400){let r="";try{let c=JSON.parse(n);c.errorMessages&&c.errorMessages.length>0&&(r=c.errorMessages.join(", "))}catch{}return a.statusCode===404||a.statusCode===410?u(new Error(`Ticket not found or deleted (HTTP ${a.statusCode}). ${r}`)):u(new Error(`Jira API returned HTTP status ${a.statusCode}. ${r}`))}if(!n)return d({});try{let r=JSON.parse(n);d(r)}catch{u(new Error("Failed to parse Jira response."))}})});l.on("error",a=>u(new Error(`Network error: ${a.message}`))),i&&l.write(JSON.stringify(i)),l.end()})}async function De(t){let{baseUrl:e}=await to(),i=await Me("GET",`/rest/api/2/issue/${t}`);return i&&i.fields?{summary:i.fields.summary||"",description:i.fields.description||"No description provided.",status:i.fields.status?.name||"Unknown",url:`${e}/browse/${t}`}:null}async function oo(t){let e=await Me("GET",`/rest/api/2/issue/${t}/transitions`);return e&&e.transitions?e.transitions.map(i=>({id:i.id,name:i.name})):[]}async function io(t,e){await Me("POST",`/rest/api/2/issue/${t}/transitions`,{transition:{id:e}})}async function no(t,e){await Me("POST",`/rest/api/2/issue/${t}/comment`,{body:e})}async function ro(t,e){await Me("PUT",`/rest/api/2/issue/${t}`,{update:{labels:[{add:e}]}})}async function so(t){let e=await Me("POST","/rest/api/3/search/jql",{jql:t,maxResults:50,fields:["summary","status","assignee"]});return e&&e.issues?e.issues.map(i=>({key:i.key,summary:i.fields?.summary||"No Title",status:i.fields?.status?.name||"Unknown",assignee:i.fields?.assignee?.displayName||"Unassigned"})):[]}var Xt,eo,Ue=P(()=>{"use strict";Xt=x(require("https")),eo=x(require("vscode"));ke()});async function ao(t){let e=k();if(e)try{let i=await L.initialize(e);if(!i)return;let o=await j(e),s=Be(o,i.ticketPrefix),m=Ee(o,s,!0);if(m||(m=o.split("-to-")[0]),!m){K.window.showErrorMessage("Ricwiz: You are not currently on a valid ticket branch.");return}await K.window.withProgress({location:K.ProgressLocation.Notification,title:`Fetching details for ${m}...`,cancellable:!1},async d=>{let u=await De(m);if(u){let l=[];try{let{findRelatedBranches:a,getRelatedBranchesStatus:n}=(ue(),I(be)),r=K.workspace.getConfiguration("ricwiz").get("environments",[{name:"Qual",sourceBranch:"quality"},{name:"Val",sourceBranch:"validation"},{name:"Prod",sourceBranch:"main"}]),c=await a(e,m,"");l=await n(e,c,m,r,i)}catch{}t.setJiraData({ticketId:m,relatedBranches:l,...u}),t.setPage("jira")}else K.window.showErrorMessage("Ricwiz: No data found for this ticket.")})}catch(i){i.message.includes("securely configured")?await K.window.showErrorMessage(i.message,"Set Token Now")==="Set Token Now"&&K.commands.executeCommand("ricwiz.setJiraToken"):K.window.showErrorMessage(`Ricwiz Jira Error: ${i.message}`)}}var K,co=P(()=>{"use strict";K=x(require("vscode"));E();N();Ue()});async function lo(t,e){let o=ne.workspace.getConfiguration("ricwiz").get("jiraDashboards",[]);if(e!==void 0&&(Re=e),!o||o.length===0){t.setDashboardData({queries:[],selectedIndex:0,results:[],error:"No queries defined in settings. Go to Settings > Ricwiz > Jira Dashboards."}),t.setPage("dashboard");return}Re>=o.length&&(Re=0);let s=o[Re];t.setDashboardData({queries:o,selectedIndex:Re,results:[],error:"\u23F3 Loading tickets..."}),t.setPage("dashboard");try{let m=await so(s.jql),d=ne.workspace.workspaceFolders?.[0]?.uri.fsPath,u=[],l=t.getDashboardShowBranches();if(d)try{let n=require("child_process"),c=require("util").promisify(n.exec),{stdout:p}=await c("git branch",{cwd:d});u=p.split(`
`).map(f=>f.replace("*","").trim()).filter(f=>f)}catch{}let a=[];if(l&&d)try{let{findRelatedBranches:n,getRelatedBranchesStatus:r}=(ue(),I(be)),{WorkflowContext:c}=(N(),I(lt)),p=await c.initialize(d,{skipPrompt:!0}),f=p?.environments||ne.workspace.getConfiguration("ricwiz").get("environments",[{name:"Qual",sourceBranch:"quality"},{name:"Val",sourceBranch:"validation"},{name:"Prod",sourceBranch:"main"}]);a=await Promise.all(m.map(async w=>{let v=await n(d,w.key,""),g=await r(d,v,w.key,f,p);return{...w,detailedBranches:g}}))}catch{a=m}else a=m.map(n=>{let r=u.find(c=>c.includes(n.key));return{...n,branch:r||null}});t.setDashboardData({queries:o,selectedIndex:Re,results:a,error:null}),t.setPage("dashboard")}catch(m){let d=m.message;(d.includes("ENOTFOUND")||d.includes("network"))&&(d="No Internet or Invalid URL"),t.setDashboardData({queries:o,selectedIndex:Re,results:[],error:d}),t.setPage("dashboard")}}async function mo(t,e){await ne.window.withProgress({location:ne.ProgressLocation.Notification,title:`Fetching details for ${e}...`,cancellable:!1},async()=>{try{let i=await De(e);if(i){let o=[],s=k();if(s)try{let{WorkflowContext:m}=(N(),I(lt)),d=await m.initialize(s,{skipPrompt:!0}),{findRelatedBranches:u,getRelatedBranchesStatus:l}=(ue(),I(be)),a=ne.workspace.getConfiguration("ricwiz").get("environments",[{name:"Qual",sourceBranch:"quality"},{name:"Val",sourceBranch:"validation"},{name:"Prod",sourceBranch:"main"}]),n=await u(s,e,"");o=await l(s,n,e,a,d)}catch{}t.setJiraData({ticketId:e,relatedBranches:o,...i}),t.setPage("jira")}else ne.window.showErrorMessage(`Ricwiz: No data found for ticket ${e}.`)}catch(i){ne.window.showErrorMessage(`Ricwiz Jira Error: ${i.message}`)}})}var ne,Re,po=P(()=>{"use strict";ne=x(require("vscode"));Ue();E();Re=0});async function vt(){let t=k();if(!t)return;let e=await L.initialize(t,{forcePrompt:!1});if(!e)return;let i=await j(t);if(!i)return;let o=Be(i,e.ticketPrefix),s=Ee(i,o,!0);return s||i.split("-to-")[0]}async function uo(){try{let t=await vt();if(!t){T.window.showErrorMessage("Ricwiz: You are not on a valid ticket branch.");return}let e=await T.window.withProgress({location:T.ProgressLocation.Notification,title:`Fetching available status for ${t}...`,cancellable:!1},()=>oo(t));if(!e||e.length===0){T.window.showInformationMessage(`Ricwiz: No transitions available for ${t}.`);return}let i=e.map(s=>({label:s.name,id:s.id})),o=await T.window.showQuickPick(i,{placeHolder:`Select new status for ${t}`,ignoreFocusOut:!0});o&&(await T.window.withProgress({location:T.ProgressLocation.Notification,title:`Updating status to ${o.label}...`,cancellable:!1},()=>io(t,o.id)),T.window.showInformationMessage(`Ricwiz: Status for ${t} updated to ${o.label}.`))}catch(t){t.message.includes("securely configured")?T.window.showErrorMessage(t.message,"Set Token Now").then(e=>{e==="Set Token Now"&&T.commands.executeCommand("ricwiz.setJiraToken")}):T.window.showErrorMessage(`Ricwiz Jira Error: ${t.message}`)}}async function go(){try{let t=await vt();if(!t){T.window.showErrorMessage("Ricwiz: You are not on a valid ticket branch.");return}let e=await T.window.showInputBox({prompt:`Add comment to ${t}`,placeHolder:"Type your comment here...",ignoreFocusOut:!0});e&&(await T.window.withProgress({location:T.ProgressLocation.Notification,title:`Adding comment to ${t}...`,cancellable:!1},()=>no(t,e)),T.window.showInformationMessage(`Ricwiz: Comment added to ${t}.`))}catch(t){t.message.includes("securely configured")?T.window.showErrorMessage(t.message,"Set Token Now").then(e=>{e==="Set Token Now"&&T.commands.executeCommand("ricwiz.setJiraToken")}):T.window.showErrorMessage(`Ricwiz Jira Error: ${t.message}`)}}async function fo(){try{let t=await vt();if(!t){T.window.showErrorMessage("Ricwiz: You are not on a valid ticket branch.");return}let e=await T.window.showInputBox({prompt:`Add a label to ${t}`,placeHolder:"e.g. Needs-Review, Bug, High-Priority",ignoreFocusOut:!0});e&&e.trim()&&(await T.window.withProgress({location:T.ProgressLocation.Notification,title:`Adding label to ${t}...`,cancellable:!1},()=>ro(t,e.trim())),T.window.showInformationMessage(`Ricwiz: Label '${e.trim()}' added to ${t}.`))}catch(t){t.message.includes("securely configured")?T.window.showErrorMessage(t.message,"Set Token Now").then(e=>{e==="Set Token Now"&&T.commands.executeCommand("ricwiz.setJiraToken")}):T.window.showErrorMessage(`Ricwiz Jira Error: ${t.message}`)}}async function ho(){let t=await T.window.showInputBox({prompt:"Enter your Jira API Token (or Personal Access Token). It will be securely stored in your OS keychain.",password:!0,ignoreFocusOut:!0});if(t)try{await Rt(t.trim()),T.window.showInformationMessage("Ricwiz: Jira API Token securely stored!")}catch(e){T.window.showErrorMessage(`Ricwiz: Failed to store token: ${e.message}`)}}var T,wo=P(()=>{"use strict";T=x(require("vscode"));E();N();Ue();ke()});async function vo(){let t=await _.window.showInputBox({prompt:"Enter your GitLab Personal Access Token",placeHolder:"glpat-xxxxxxxxxxxxxxxxxxxx",ignoreFocusOut:!0,password:!0});if(t&&t.trim()){let e=t.trim();await _.window.withProgress({location:_.ProgressLocation.Notification,title:"Ricwiz: Validating GitLab Token...",cancellable:!1},async()=>{try{let o=_.workspace.getConfiguration("ricwiz").get("gitlabUrlOverride","").trim();if(!o&&_.workspace.workspaceFolders)try{let{exec:l}=(E(),I(Te)),a=_.workspace.workspaceFolders[0].uri.fsPath,{stdout:n}=await l("git remote get-url origin",{cwd:a}),r=n.trim();r.startsWith("git@")&&(r=`https://${r.replace("git@","").replace(":","/")}`),r.endsWith(".git")&&(r=r.slice(0,-4)),o=r}catch{}o||(o="https://gitlab.com");let s=new URL(o),m=`${s.protocol}//${s.host}`,d=require("https"),u=await new Promise((l,a)=>{let n=d.request(new URL(`${m}/api/v4/user`),{method:"GET",timeout:5e3,headers:{"PRIVATE-TOKEN":e,Accept:"application/json"}},r=>{if(r.statusCode>=400)return a(new Error(`Status ${r.statusCode}`));let c="";r.on("data",p=>c+=p),r.on("end",()=>l(JSON.parse(c||"{}")))});n.on("error",a),n.on("timeout",()=>{n.destroy(),a(new Error("Timeout"))}),n.end()});await Pt(e),_.window.showInformationMessage(`Ricwiz: \u2705 GitLab API Token saved and validated successfully for ${u.username||"user"}!`),_.commands.executeCommand("ricwiz.manualRefresh")}catch(i){_.window.showErrorMessage(`Ricwiz: \u274C Invalid token or cannot reach GitLab (${i.message}). Please check the token and try again.`)}})}}var _,bo=P(()=>{"use strict";_=x(require("vscode"));ke()});async function yo(){let t=k();if(!t){fe.window.showErrorMessage("Ricwiz: Open a folder or workspace that is a Git repository.");return}let e=await L.initialize(t);if(!e)return;let i=await H(t,{prefix:e.ticketPrefix,prompt:"Enter the full ticket ID to sync all branches for (e.g., SCPSCA-1234) or just the number"});if(!i)return;let{ticketId:o,currentBranch:s}=i;await fe.window.withProgress({location:fe.ProgressLocation.Notification,title:`Ricwiz: Syncing all branches for ${o}...`,cancellable:!1},async m=>{try{m.report({message:"Fetching from remote..."});try{await h("git fetch --all",{cwd:t})}catch{}let{stdout:d}=await h(`git branch --list "*${o}*"`,{cwd:t}),u=new RegExp(`${o}(?!\\d)`,"i"),l=d.split(`
`).map(r=>r.replace("*","").trim()).filter(r=>r.length>0&&u.test(r));if(l.length===0){fe.window.showWarningMessage(`Ricwiz: No local branches found for ${o}.`);return}let a=0,n=0;for(let r of l)if(m.report({message:`Syncing ${r}...`}),r===s)try{await h(`git pull ${e.originRemote} ${r}`,{cwd:t}),a++}catch(c){let p=!1;try{let{stdout:w}=await h("git ls-files -u",{cwd:t});w.trim().length>0&&(p=!0)}catch{}let f=((c.stdout||"")+(c.stderr||"")+(c.message||"")).toLowerCase();(p||f.includes("conflict")||f.includes("conflit"))&&await $e(t,`${e.originRemote}/${r}`,r,m)?a++:n++}else try{await h(`git fetch ${e.originRemote} ${r}:${r}`,{cwd:t}),a++}catch{try{await h(`git checkout ${r}`,{cwd:t});try{await h(`git pull ${e.originRemote} ${r}`,{cwd:t}),a++}catch(p){let f=!1;try{let{stdout:v}=await h("git ls-files -u",{cwd:t});v.trim().length>0&&(f=!0)}catch{}let w=((p.stdout||"")+(p.stderr||"")+(p.message||"")).toLowerCase();(f||w.includes("conflict")||w.includes("conflit"))&&await $e(t,`${e.originRemote}/${r}`,r,m)?a++:n++}await h(`git checkout ${s}`,{cwd:t})}catch{try{await h(`git checkout ${s}`,{cwd:t})}catch{}n++}}n>0?fe.window.showWarningMessage(`Ricwiz: Synced ${a}/${l.length} branches. ${n} branch(es) could not be synced (possible conflicts or diverged history).`):fe.window.showInformationMessage(`Ricwiz: \u{1F504} All ${a} branches for ${o} are up to date!`)}catch(d){fe.window.showErrorMessage(`Ricwiz: Sync failed: ${d.message}`)}})}var fe,xo=P(()=>{"use strict";fe=x(require("vscode"));E();Xe();N()});async function ko(){let t=k();if(!t){he.window.showErrorMessage("Ricwiz: Open a folder or workspace that is a Git repository.");return}try{await h("git status",{cwd:t})}catch{he.window.showErrorMessage("Ricwiz: The opened folder does not appear to be a valid Git repository.");return}let e=await L.initialize(t);if(!e)return;let i=e.environments,o=await H(t,{prefix:e.ticketPrefix});if(!o)return;let{ticketId:s,currentBranch:m}=o;await he.window.withProgress({location:he.ProgressLocation.Notification,title:"Ricwiz: Updating environment branches from their bases",cancellable:!0},async(d,u)=>{let l=0,a=m,n=!1;u.onCancellationRequested(()=>{n=!0}),d.report({message:"Syncing remote information...",increment:10});try{await h("git fetch --all",{cwd:t})}catch{}let r=80/(i.length||1);for(let c of i){if(n)break;let{resolveExistingBranchName:p}=(ue(),I(be)),f=await p(t,s,c.name),w=c.sourceBranch;if(await we(t,f))try{d.report({message:`Processing ${f}...`,increment:r/2}),await h(`git checkout ${f}`,{cwd:t});try{d.report({message:`Merging ${w} into ${f}...`,increment:r/2});let v=e.getFetchRemote(w),g=e.getFetchBranch(w),b=e.buildUpstreamPath(w);await h(`git fetch ${v} ${g}`,{cwd:t}),await h(`git merge ${b}`,{cwd:t})}catch(v){let g=!1;try{let{stdout:S}=await h("git ls-files -u",{cwd:t});S.trim().length>0&&(g=!0)}catch{}let b=((v.stdout||"")+(v.stderr||"")+(v.message||"")).toLowerCase();if(g||b.includes("conflict")||b.includes("conflit")){let S=e.buildUpstreamPath(w);if(!await $e(t,S,f,d))throw n=!0,new Error("Update aborted by user.")}else throw v}if(n)break;l++}catch(v){v.message.includes("aborted")?he.window.showInformationMessage("Ricwiz: Update cancelled."):he.window.showErrorMessage(`Ricwiz: Failed to update branch ${f}. Detail: ${v.message}`);return}}if(!n){d.report({message:"Finishing up...",increment:10});try{let c=await j(t);a&&a!==c&&await h(`git checkout ${a}`,{cwd:t})}catch{}he.window.showInformationMessage(`Ricwiz: Successfully updated ${l} environment branches from their bases!`)}})}var he,Co=P(()=>{"use strict";he=x(require("vscode"));E();Xe();N()});async function $o(){let t=k();if(!t){W.window.showErrorMessage("Ricwiz: Open a folder or workspace that is a Git repository.");return}let e=await j(t),i=W.workspace.getConfiguration("ricwiz");await W.window.withProgress({location:W.ProgressLocation.Notification,title:"Ricwiz: Scanning for unused local branches...",cancellable:!1},async()=>{try{await h("git fetch --prune",{cwd:t})}catch{}let o=[];try{let{stdout:r}=await h('git branch --format="%(refname:short)"',{cwd:t});o=r.split(`
`).map(c=>c.trim()).filter(c=>c.length>0)}catch{}if(o.length===0){W.window.showInformationMessage("Ricwiz: No local branches found.");return}let s=[];try{let{stdout:r}=await h('git branch -r --format="%(refname:short)"',{cwd:t});s=r.split(`
`).map(c=>c.trim().replace(/^origin\//,"").replace(/^[^\/]+\//,"")).filter(c=>c.length>0&&!c.includes("HEAD"))}catch{}let m=[];try{let{stdout:r}=await h('git for-each-ref --format="%(refname:short)|||%(upstream:track)" refs/heads/',{cwd:t});m=r.split(`
`).filter(c=>c.includes("[gone]")).map(c=>c.split("|||")[0].trim())}catch{}let d=o.filter(r=>!s.includes(r));if(d.length===0){W.window.showInformationMessage("Ricwiz: Your local repository is totally clean! All local branches exist on the remote.");return}let u=d.map(r=>{let c=m.includes(r),p=r===e,f="Not found on remote";return c&&(f="Deleted on remote [gone]"),p&&(f+=" (Current branch - will checkout main first)"),{label:r,description:f,picked:c&&!p}}),l=await W.window.showQuickPick(u,{canPickMany:!0,placeHolder:"Select local branches to delete",title:"Ricwiz: Delete Unused Branches"});if(!l||l.length===0){W.window.showInformationMessage("Ricwiz: No branches selected for deletion.");return}if(await W.window.showWarningMessage(`Ricwiz: Delete ${l.length} local branch(es)?
This cannot be undone!`,{modal:!0},"Yes, delete them")!=="Yes, delete them"){W.window.showInformationMessage("Ricwiz: Deletion cancelled.");return}let n=0;for(let r of l){let c=r.label;if(c===e){let p=i.get("ticketSourceBranch","main");try{await h(`git checkout ${p}`,{cwd:t}),e=p}catch{W.window.showWarningMessage(`Ricwiz: Could not switch away from ${c}. Skipping.`);continue}}try{await h(`git branch -D ${c}`,{cwd:t}),n++}catch{W.window.showWarningMessage(`Ricwiz: Could not delete local branch ${c}.`)}}W.window.showInformationMessage(`Ricwiz: \u{1F5D1}\uFE0F Cleaned up ${n} unused local branch(es).`)})}var W,Ro=P(()=>{"use strict";W=x(require("vscode"));E()});async function Le(t){let e=k();e&&await re.window.withProgress({location:re.ProgressLocation.Notification,title:`Ricwiz: Switching to ${t}...`,cancellable:!1},async()=>{try{let i=await j(e),o=!1;try{let{stdout:m}=await h("git status --porcelain",{cwd:e});o=m.trim().length>0}catch{}if(o&&i)try{await h(`git stash push --include-untracked -m "ricwiz-auto:${i}"`,{cwd:e}),re.window.showInformationMessage(`Ricwiz: \u{1F4E6} Stashed changes from ${i}`)}catch{re.window.showWarningMessage("Ricwiz: Could not stash changes. Checkout may fail if there are conflicts.")}let s=t;t.includes("/")&&(s=t.split("/").slice(1).join("/"));try{await h(`git checkout ${s}`,{cwd:e})}catch{let d="";if(t.includes("/"))d=t.split("/")[0];else{let{stdout:u}=await h("git branch -r",{cwd:e}),l=u.split(`
`).map(n=>n.trim()).filter(n=>n),a=[];for(let n of l){let r=n.split(" ")[0];r.endsWith(`/${s}`)&&a.push(r.substring(0,r.lastIndexOf("/")))}if(a.length===0){re.window.showErrorMessage(`Ricwiz: A branch "${s}" n\xE3o existe localmente nem em nenhuma remote!`);return}else if(a.length===1)d=a[0];else{let n=await L.initialize(e);a.includes("origin")?d="origin":n&&a.includes(n.upstreamRemote)?d=n.upstreamRemote:d=a[0]}}try{await h(`git fetch ${d} ${s}`,{cwd:e}),await h(`git checkout -b ${s} --track ${d}/${s}`,{cwd:e})}catch{re.window.showErrorMessage(`Ricwiz: Encontrou na remote ${d} mas falhou a fazer checkout.`);return}}try{let{stdout:m}=await h("git stash list",{cwd:e}),d=m.split(`
`);for(let u=0;u<d.length;u++)if(d[u].includes(`ricwiz-auto:${s}`)){let l=d[u].match(/stash@\{(\d+)\}/);l&&(await h(`git stash pop stash@{${l[1]}}`,{cwd:e}),re.window.showInformationMessage(`Ricwiz: \u{1F4E6} Restored stashed changes on ${s}`));break}}catch{re.window.showWarningMessage(`Ricwiz: Could not restore stashed changes on ${s}. You may need to resolve conflicts manually (check git stash list).`)}}catch{re.window.showErrorMessage(`Ricwiz: Could not checkout branch ${t}.`)}})}var re,rt=P(()=>{"use strict";re=x(require("vscode"));E();N()});async function zo(){let t=k();if(t)try{let{stdout:e}=await h("git branch --show-current",{cwd:t}),i=e.trim();i&&(await je.env.clipboard.writeText(i),je.window.showInformationMessage(`Ricwiz: \u{1F4CB} Copied "${i}" to clipboard`))}catch{je.window.showErrorMessage("Ricwiz: Could not get the current branch name.")}}var je,Po=P(()=>{"use strict";je=x(require("vscode"));E()});async function Bo(){let t=k();if(!t){Z.window.showErrorMessage("Ricwiz: Open a folder or workspace that is a Git repository.");return}let e=Z.workspace.getConfiguration("ricwiz"),i=e.get("ticketSourceBranch","main"),s=e.get("packageXmlCommand",'sf sgd source delta --to "HEAD" --from "origin/{baseBranch}" --output-dir "."').replace("{baseBranch}",i);await Z.window.showWarningMessage("Are you sure you want to generate the package.xml? This may overwrite existing local manifest files.",{modal:!0},"Yes, Generate")==="Yes, Generate"&&await Z.window.withProgress({location:Z.ProgressLocation.Notification,title:"Ricwiz: Generating package.xml using Salesforce CLI...",cancellable:!1},async()=>{try{await h(s,{cwd:t,maxBuffer:10*1024*1024}),Z.window.showInformationMessage("Ricwiz: Successfully generated package.xml!");let d=st.join(t,"package","package.xml"),u=st.join(t,"package.xml"),l=st.join(t,"manifest","package.xml");for(let a of[d,u,l])if(So.existsSync(a)){let n=await Z.workspace.openTextDocument(a);await Z.window.showTextDocument(n);break}}catch(d){Z.window.showErrorMessage(`Ricwiz: Error running sf command - ${d.message}`)}})}var Z,st,So,Eo=P(()=>{"use strict";Z=x(require("vscode")),st=x(require("path")),So=x(require("fs"));E()});async function To(){let t=k();if(!t){X.window.showErrorMessage("Ricwiz: Open a folder or workspace that is a Git repository.");return}let i=X.workspace.getConfiguration("ricwiz").get("deployCommand","sf project deploy start --manifest package/package.xml --post-destructive-changes destructiveChanges/destructiveChanges.xml -c -l NoTestRun -g");await X.window.showWarningMessage("Are you sure you want to deploy to Salesforce? This action modifies your org and cannot be easily undone.",{modal:!0},"Yes, Deploy")==="Yes, Deploy"&&await X.window.withProgress({location:X.ProgressLocation.Notification,title:"Ricwiz: Deploying package...",cancellable:!1},async()=>{try{let{stdout:s,stderr:m}=await h(i,{cwd:t,maxBuffer:52428800}),d=X.window.createOutputChannel("Ricwiz Deploy");d.appendLine(`Executing: ${i}`),d.appendLine(s),m&&(d.appendLine("--- STDERR ---"),d.appendLine(m)),d.show(),X.window.showInformationMessage("Ricwiz: Successfully ran deploy command!")}catch(s){let m=X.window.createOutputChannel("Ricwiz Deploy");m.appendLine(`Error executing: ${i}`),s.stdout&&m.appendLine(s.stdout),s.stderr&&m.appendLine(s.stderr),m.appendLine(s.message),m.show(),X.window.showErrorMessage("Ricwiz: Error running deploy command. See output channel for details.")}})}var X,Mo=P(()=>{"use strict";X=x(require("vscode"));E()});async function Do(){let t=k();if(!t){ee.window.showErrorMessage("Ricwiz: Open a folder or workspace that is a Git repository.");return}let i=ee.workspace.getConfiguration("ricwiz").get("importDataCommand","sfdx force:data:tree:import --plan data/plan.json");await ee.window.showWarningMessage("Are you sure you want to import data into Salesforce? This action modifies records in your org.",{modal:!0},"Yes, Import")==="Yes, Import"&&await ee.window.withProgress({location:ee.ProgressLocation.Notification,title:"Ricwiz: Importing data...",cancellable:!1},async()=>{try{let{stdout:s,stderr:m}=await h(i,{cwd:t,maxBuffer:52428800}),d=ee.window.createOutputChannel("Ricwiz Import Data");d.appendLine(`Executing: ${i}`),d.appendLine(s),m&&(d.appendLine("--- STDERR ---"),d.appendLine(m)),d.show(),ee.window.showInformationMessage("Ricwiz: Successfully ran import data command!")}catch(s){let m=ee.window.createOutputChannel("Ricwiz Import Data");m.appendLine(`Error executing: ${i}`),s.stdout&&m.appendLine(s.stdout),s.stderr&&m.appendLine(s.stderr),m.appendLine(s.message),m.show(),ee.window.showErrorMessage("Ricwiz: Error running import data command. See output channel for details.")}})}var ee,Lo=P(()=>{"use strict";ee=x(require("vscode"));E()});async function Ao(){let t=k();if(!t){Q.window.showErrorMessage("Ricwiz: Open a folder or workspace that is a Git repository.");return}let e=await L.initialize(t,{skipPrompt:!0}),i=e?e.ticketSourceBranch:Q.workspace.getConfiguration("ricwiz").get("ticketSourceBranch","main"),o=e?e.originRemote:"origin",s="";try{s=await j(t)}catch{}let m=await Q.window.showInputBox({prompt:`Enter the branch name to list modified files (compared to ${i})`,value:s,placeHolder:"SFPSCA-1234"});if(!m)return;let{extractTicketSuggestion:d,resolvePrefix:u}=(E(),I(Te)),{ricwizLogger:l}=(Oe(),I(nt));await Q.window.withProgress({location:Q.ProgressLocation.Notification,title:`Ricwiz: Finding files for ${m}...`,cancellable:!1},async()=>{try{let a=e?e.ticketPrefix:Q.workspace.getConfiguration("ricwiz").get("ticketPrefix","SFPSC-"),n=u(m,a),r=d(m,n,!0)||m.replace(/-to-[a-zA-Z0-9]+$/i,""),{resolveExistingBranchName:c}=(ue(),I(be)),p=await c(t,r);l.appendLine(`[ListTicketFiles] targetBranch (raw): ${m}, resolvedTargetBranch: ${p}, ticketId: ${r}, originRemote: ${o}, sourceBranch: ${i}`);let f=[];try{let $="";try{l.appendLine(`[ListTicketFiles] Running: git merge-base ${o}/${i} ${p}`);let{stdout:R}=await h(`git merge-base ${o}/${i} ${p}`,{cwd:t});$=R.trim()}catch(R){l.appendLine(`[ListTicketFiles] First merge-base failed: ${R.message}`),l.appendLine(`[ListTicketFiles] Running: git merge-base ${i} ${p}`);let{stdout:M}=await h(`git merge-base ${i} ${p}`,{cwd:t});$=M.trim()}if($){l.appendLine(`[ListTicketFiles] Merge base found: ${$}. Running git diff...`);let{stdout:R}=await h(`git diff --name-only ${$} ${p}`,{cwd:t,maxBuffer:10*1024*1024});f=R.split(`
`).map(M=>M.trim()).filter(M=>M.length>0),l.appendLine(`[ListTicketFiles] diff found ${f.length} files.`)}}catch($){l.appendLine(`[ListTicketFiles] Diff strategy failed: ${$.message}`)}let w=[];try{l.appendLine(`[ListTicketFiles] Running git log fallback for ticketId: ${r}`);let{stdout:$}=await h(`git --no-pager log --grep="\\b${r}\\b" -i -E --name-only -m --first-parent --format=""`,{cwd:t,maxBuffer:10*1024*1024});w=$.split(`
`).map(R=>R.trim()).filter(R=>R.length>0),l.appendLine(`[ListTicketFiles] git log found ${w.length} files.`)}catch($){l.appendLine(`[ListTicketFiles] Git log fallback failed: ${$.message}`)}let v=[...f,...w];if(v.length===0){Q.window.showInformationMessage(`Ricwiz: No modified files found for ${m}.`);return}let g=Array.from(new Set(v)).sort(),b={};for(let $ of g){let R=$.match(/default\/([^/]+)/),M=R&&R[1]?R[1].toUpperCase():"OUTROS";b[M]||(b[M]=[]),b[M].push($)}let S=`Files modified in branch ${m}:
`,B=Object.keys(b).sort();for(let $ of B)S+=`
=== ${$} ===
`,S+=b[$].join(`
`)+`
`;let D=await Q.workspace.openTextDocument({content:S,language:"plaintext"});await Q.window.showTextDocument(D)}catch(a){Q.window.showErrorMessage(`Ricwiz: Error running git log - ${a.message}`)}})}var Q,Fo=P(()=>{"use strict";Q=x(require("vscode"));E();N()});async function Io(){let t=k();if(!t){se.window.showErrorMessage("Ricwiz: Open a folder or workspace that is a Git repository.");return}let i=se.workspace.getConfiguration("ricwiz").get("resetTrackingCommand","sf org disable tracking && sf project reset tracking --no-prompt");await se.window.withProgress({location:se.ProgressLocation.Notification,title:"Ricwiz: Resetting tracking...",cancellable:!1},async()=>{try{let{stdout:o,stderr:s}=await h(i,{cwd:t,maxBuffer:52428800}),m=se.window.createOutputChannel("Ricwiz Reset Tracking");m.appendLine(`Executing: ${i}`),m.appendLine(o),s&&(m.appendLine("--- STDERR ---"),m.appendLine(s)),m.show(),se.window.showInformationMessage("Ricwiz: Successfully reset tracking!")}catch(o){let s=se.window.createOutputChannel("Ricwiz Reset Tracking");s.appendLine(`Error executing: ${i}`),o.stdout&&s.appendLine(o.stdout),o.stderr&&s.appendLine(o.stderr),s.appendLine(o.message),s.show(),se.window.showErrorMessage("Ricwiz: Error resetting tracking. See output channel for details.")}})}var se,Oo=P(()=>{"use strict";se=x(require("vscode"));E()});async function Uo(){let t=k();if(!t){te.window.showErrorMessage("Ricwiz: Open a workspace first.");return}let e=["ApexClass","ApexTrigger","CustomObject","CustomField","LightningComponentBundle","AuraDefinitionBundle","Flow","CustomLabel","CustomMetadata","StaticResource","Profile","PermissionSet","PermissionSetGroup","Layout","ValidationRule","RecordType","ListView","Report","EmailTemplate","Other (Type manually)..."],i=await te.window.showQuickPick(e,{placeHolder:"Select Metadata Type to extract (e.g., ApexClass)",ignoreFocusOut:!0});if(!i||i==="Other (Type manually)..."&&(i=await te.window.showInputBox({prompt:"Enter Metadata Type (e.g., CustomApplication, Queue)",ignoreFocusOut:!0}),!i))return;let o={ApexClass:"**/*.cls",ApexTrigger:"**/*.trigger",CustomObject:"**/*.{object,object-meta.xml}",CustomField:"**/*.field-meta.xml",LightningComponentBundle:"**/lwc/*/*.js",AuraDefinitionBundle:"**/aura/*/*.cmp",Flow:"**/*.flow-meta.xml",CustomLabel:"**/*.labels-meta.xml",CustomMetadata:"**/*.md-meta.xml",StaticResource:"**/*.resource-meta.xml",Profile:"**/*.profile-meta.xml",PermissionSet:"**/*.permissionset-meta.xml",PermissionSetGroup:"**/*.permissionsetgroup-meta.xml",Layout:"**/*.layout-meta.xml",ValidationRule:"**/*.validationRule-meta.xml",RecordType:"**/*.recordType-meta.xml",ListView:"**/*.listView-meta.xml"},s=[],m=o[i];if(m)try{s=(await te.workspace.findFiles(m,"**/node_modules/**")).map(l=>{let a=l.fsPath.split(/[\\/]/).pop()||"";if(i==="LightningComponentBundle"||i==="AuraDefinitionBundle"){let n=l.fsPath.split(/[\\/]/);return n[n.length-2]||a.split(".")[0]}return a.split(".")[0]}),s=[...new Set(s)].sort()}catch{}let d=await new Promise(u=>{let l=te.window.createQuickPick();l.title=`Extract ${i}`,l.placeholder="Type name (e.g. MyComponent) or * for all",l.ignoreFocusOut=!0,l.matchOnDescription=!0;let a=()=>{let n=l.value.trim(),r=[];n?r.push({label:`$(cloud-download) Extract "${n}"`,description:"Extract exact name from Salesforce",alwaysShow:!0}):r.push({label:'$(cloud-download) Extract "*" (All)',description:`Extract all ${i}s`,alwaysShow:!0}),s.forEach(c=>{(!n||c.toLowerCase().includes(n.toLowerCase()))&&r.push({label:c,description:"Local workspace component"})}),l.items=r};l.onDidChangeValue(()=>a()),l.onDidAccept(()=>{let n=l.selectedItems[0];if(n){let r=n.label;r.startsWith('$(cloud-download) Extract "')?r=r.replace('$(cloud-download) Extract "',"").replace('" (All)',"").replace('"',""):r==='$(cloud-download) Extract "*" (All)'&&(r="*"),l.hide(),u(r)}}),l.onDidHide(()=>{l.dispose(),u(void 0)}),a(),l.show()});d&&await te.window.withProgress({location:te.ProgressLocation.Notification,title:`Ricwiz: Extracting ${i}:${d} from Salesforce...`,cancellable:!0},async(u,l)=>{try{U.show(!0);let a=`${i}:${d}`,{stdout:n,stderr:r}=await h(`sf project retrieve start -m "${a}"`,{cwd:t});n&&U.appendLine(n),r&&U.appendLine(r),te.window.showInformationMessage(`Ricwiz: Successfully extracted ${a}.`)}catch(a){U.appendLine(`ERROR: ${a.message}`),a.stdout&&U.appendLine(a.stdout),a.stderr&&U.appendLine(a.stderr),te.window.showErrorMessage("Ricwiz: Extraction failed. See Output channel for details.")}})}var te,jo=P(()=>{"use strict";te=x(require("vscode"));E()});async function Wo(){let t=G.window.activeTextEditor;if(!t){G.window.showErrorMessage("Ricwiz: Please open the file you want to deploy in the editor first.");return}let e=t.document.uri.fsPath,i=k();if(!i)return;let o="";if(await G.window.withProgress({location:G.ProgressLocation.Notification,title:"Ricwiz: Fetching available Salesforce orgs...",cancellable:!1},async()=>{try{let{stdout:l}=await h("sf org list --json",{cwd:i});o=l}catch(l){o=l.stdout||""}}),!o){G.window.showErrorMessage("Ricwiz: Failed to fetch orgs. Is Salesforce CLI installed?");return}let s=[];try{let l=JSON.parse(o),a=l.result?.nonScratchOrgs||[],n=l.result?.scratchOrgs||[];s=[...a,...n]}catch{G.window.showErrorMessage("Ricwiz: Failed to parse org list.");return}if(s.length===0){G.window.showInformationMessage("Ricwiz: No authenticated orgs found.");return}let m=s.map(l=>({label:l.alias||l.username,description:l.alias?l.username:"",picked:l.isDefaultUsername})),d=await G.window.showQuickPick(m,{placeHolder:"Select the org(s) to deploy this file to",canPickMany:!0,ignoreFocusOut:!0});if(!d||d.length===0)return;let u=No.basename(e);await G.window.withProgress({location:G.ProgressLocation.Notification,title:`Ricwiz: Deploying ${u} to ${d.length} org(s)...`,cancellable:!1},async()=>{U.show(!0),U.appendLine(`--- Starting Parallel Deploy of ${u} ---`);let l=d.map(async c=>{let p=c.label;U.appendLine(`[${p}] Deploying...`);try{let{stdout:f,stderr:w}=await h(`sf project deploy start -d "${e}" -o "${p}"`,{cwd:i});return U.appendLine(`[${p}] \u2705 Success`),f&&U.appendLine(f),{org:p,success:!0}}catch(f){return U.appendLine(`[${p}] \u274C Failed`),f.stdout&&U.appendLine(f.stdout),f.stderr&&U.appendLine(f.stderr),{org:p,success:!1}}}),a=await Promise.all(l),n=a.filter(c=>c.success).length,r=a.filter(c=>!c.success).length;r===0?G.window.showInformationMessage(`Ricwiz: Successfully deployed to all ${n} orgs!`):G.window.showErrorMessage(`Ricwiz: Deploy finished with errors (${n} success, ${r} failed). Check Output channel.`)})}var G,No,Jo=P(()=>{"use strict";G=x(require("vscode")),No=x(require("path"));E()});async function qo(){let t=k();if(!t){O.window.showErrorMessage("Ricwiz: Open a folder or workspace that is a Git repository.");return}let e=O.workspace.getConfiguration("ricwiz"),i=e.get("auditUsername",""),o=e.get("auditHours",8),s=await O.window.showInputBox({prompt:"Enter your Salesforce Username to query in SetupAuditTrail",value:i,placeHolder:"admin@tuaorg.com"});if(!s)return;let m=await O.window.showInputBox({prompt:"How many hours back do you want to search?",value:o.toString(),placeHolder:"8"});if(!m)return;let d=parseFloat(m);if(isNaN(d)||d<=0){O.window.showErrorMessage("Ricwiz: Invalid hours specified.");return}let u=new Date(Date.now()-d*60*60*1e3).toISOString(),a=`sf data query -q "${`SELECT Action, Display, Section FROM SetupAuditTrail WHERE CreatedBy.Username = '${s}' AND CreatedDate >= ${u}`}" --json`;await O.window.withProgress({location:O.ProgressLocation.Notification,title:"Ricwiz: Interrogating Setup Audit Trail...",cancellable:!1},async()=>{try{let{stdout:n}=await h(a,{cwd:t,maxBuffer:52428800}),r=JSON.parse(n);if(!r.result||r.result.records.length===0){O.window.showInformationMessage(`Ricwiz: No changes found for ${s} in the last ${d} hours.`);return}let c=r.result.records,p=[],f=new Set;for(let R of c){let M=fi(R.Action,R.Display,R.Section);if(M){let oe=`${M.isDelete?"DEL":"ADD"}-${M.metadataFormat}`;if(!f.has(oe)){f.add(oe);let Y=M.isDelete?"$(trash)":"$(plus)";p.push({label:`${Y} ${M.metadataFormat}`,description:`${R.Action} -> ${R.Display}`,metadataFormat:M.metadataFormat,isDelete:M.isDelete})}}}if(p.length===0){O.window.showInformationMessage(`Ricwiz: No extractable metadata changes found for ${s} in the last ${d} hours (ignored passwords/logins).`);return}let w=await O.window.showQuickPick(p,{canPickMany:!0,placeHolder:"Select the changes you want to extract to GitLab",ignoreFocusOut:!0});if(!w||w.length===0){O.window.showInformationMessage("Ricwiz: No changes selected.");return}let v=w.filter(R=>R.isDelete),g=w.filter(R=>!R.isDelete),b=O.window.createOutputChannel("Ricwiz Admin Bridge");if(b.show(),v.length>0){let{stdout:R}=await h("git ls-files",{cwd:t}),M=R.split(`
`).map(Y=>Y.trim()),oe=0;for(let Y of v){let me=Y.metadataFormat.split(":"),Ge=me[0],He=me[1],ye=He;Ge==="CustomField"&&(ye=He.split(".")[1]);let dt=M.filter(Pe=>{let A=ct.basename(Pe);return A.startsWith(ye+".")&&A.includes(Ge==="CustomField"?".field":"")});for(let Pe of dt){let A=ct.join(t,Pe);at.existsSync(A)&&(at.unlinkSync(A),b.appendLine(`Deleted local file: ${Pe}`),oe++)}}O.window.showInformationMessage(`Ricwiz: Deleted ${oe} local files from Git workspace.`)}if(g.length===0)return;let S=g.map(R=>R.metadataFormat).filter(R=>R!=="").join(", "),B=await O.window.showInputBox({prompt:"Review and adjust the metadata components to retrieve",value:S,ignoreFocusOut:!0});if(!B)return;let D=`sf project retrieve start -m "${B}"`;b.appendLine(`Executing: ${D}`),O.window.showInformationMessage(`Ricwiz: Extracting ${g.length} components...`);let $=await h(D,{cwd:t});b.appendLine($.stdout),$.stderr&&(b.appendLine("--- STDERR ---"),b.appendLine($.stderr)),O.window.showInformationMessage("Ricwiz: Changes extracted successfully! Ready for Git Commit.")}catch(n){O.window.showErrorMessage(`Ricwiz: Error capturing changes - ${n.message}`)}})}function fi(t,e,i){if(!t||!e||!i)return null;let o=t.toLowerCase(),s=i.toLowerCase();if(["security controls","network access","session settings","data export","login history","password policies","identity verification","delegated administration"].includes(s)||o.includes("login")||o.includes("password")||o.includes("oauth")||o.includes("session"))return null;let d=o.includes("delete"),u=null;if(o==="permissionsetgroupcomponentadd"||o==="permissionsetgroupcomponentdelete")return null;let l=(a,n=!1)=>{let r=a.replace(/\(.*\)/g,"").trim();r.includes(":")&&!o.includes("calculation")&&(r=r.split(":")[0]);let c=["disabled","deleted","removed","created","changed","updated","from","to","on","assigned","assign","assignment","permission","set","group","apex","class","trigger","custom","field","object","layout","validation","rule","flow","profile"],p=r.split(/\s+/);if(n){for(;p.length>0&&c.includes(p[p.length-1].toLowerCase());)p.pop();for(;p.length>0&&c.includes(p[0].toLowerCase());)p.shift();return p.join(" ").trim().replace(/[^a-zA-Z0-9_ ]/g,"")}else return p.filter(v=>!c.includes(v.toLowerCase())).join("_").replace(/[^a-zA-Z0-9_]/g,"")||r.replace(/\s+/g,"")};if(o.includes("profile"))u=`Profile:${l(e,!0)}`;else if(o.includes("permissionsetgroupcalculation")){let a=e.split(":");u=`PermissionSetGroup:${a.length>1?a[a.length-1].trim():l(e,!1)}`}else if(o.includes("permission set group")||o.includes("permissionsetgroup"))u=`PermissionSetGroup:${l(e,!1)}`;else if(o.includes("permission set")||o.includes("permissionset"))u=`PermissionSet:${l(e,!1)}`;else if(o.includes("apexclass"))u=`ApexClass:${l(e,!1)}`;else if(o.includes("apextrigger")||o.includes("apex trigger"))u=`ApexTrigger:${l(e,!1)}`;else if(o.includes("customfield")){let a=e.match(/([A-Za-z0-9_]+__c)/),n=e.match(/(?:on|na|for)\s+([A-Za-z0-9_]+)/i);a&&n?u=`CustomField:${n[1]}.${a[1]}`:u=`CustomField:${l(e,!1)}`}else if(o.includes("layout"))u=`Layout:${l(e,!0)}`;else if(o.includes("validation"))u=`ValidationRule:${l(e,!1)}`;else if(o.includes("flow"))u=`Flow:${l(e,!1)}`;else if(o.includes("customobject")){let a=e.match(/([A-Za-z0-9_]+__c)/);u=a?`CustomObject:${a[1]}`:`CustomObject:${l(e,!1)}`}else if(!o.includes("created")&&!o.includes("changed")&&!o.includes("deleted"))return null;return u?{metadataFormat:u,isDelete:d}:null}var O,at,ct,Go=P(()=>{"use strict";O=x(require("vscode")),at=x(require("fs")),ct=x(require("path"));E()});async function Ho(){let t=k();if(t)try{let{stdout:e}=await h('git for-each-ref --sort=-committerdate --format="%(refname:short)|||%(committerdate:relative)|||%(subject)" refs/heads/',{cwd:t}),i=e.split(`
`).filter(s=>s.trim()).map(s=>{let m=s.split("|||");return{label:`$(git-branch) ${m[0]}`,description:m[1],detail:m[2],branchName:m[0]}}),o=await bt.window.showQuickPick(i,{placeHolder:"Select a branch from history to checkout",matchOnDescription:!0,matchOnDetail:!0});o&&await Le(o.branchName)}catch{bt.window.showErrorMessage("Ricwiz: Failed to get branch history")}}var bt,Vo=P(()=>{"use strict";bt=x(require("vscode"));E();rt()});async function _o(){let t=k();if(!t)return;let e=await Ne.window.showInputBox({prompt:"Enter ticket number or name (e.g., 48934)",placeHolder:"48934"});if(e)try{let{stdout:i}=await h(`git branch --list "*${e}*"`,{cwd:t}),o=i.split(`
`).map(d=>d.replace("*","").trim()).filter(d=>d);if(o.length===0){Ne.window.showInformationMessage(`Ricwiz: No branches found matching "${e}"`);return}let s=o.map(d=>({label:`$(git-branch) ${d}`,branchName:d})),m=await Ne.window.showQuickPick(s,{placeHolder:`Select a branch for ${e}`});m&&await Le(m.branchName)}catch{Ne.window.showErrorMessage("Ricwiz: Failed to search branches")}}var Ne,Qo=P(()=>{"use strict";Ne=x(require("vscode"));E();rt()});async function Ko(){let t=ze.window.activeTextEditor;if(!t)return ze.window.showErrorMessage("Ricwiz: Please open a file in the editor to check blame."),null;let e=t.document.fileName,i=Yo.basename(e),o=k();if(!o)return ze.window.showErrorMessage("Ricwiz: Workspace is not a git repository."),null;let s=[];try{let{stdout:n}=await h(`git log -5 --pretty=format:"%an|%ar|%s|%h" -- "${e}"`,{cwd:o}),r=n.trim().split(`
`);for(let c of r){let p=c.split("|");p.length>=4&&s.push({author:p[0],time:p[1],message:p.slice(2,-1).join("|"),hash:p[p.length-1]})}}catch(n){console.error("Git blame error:",n)}let m="Unknown",d="Unknown",u="Unknown",l=[],a=hi(e);if(a)try{await ze.window.withProgress({location:ze.ProgressLocation.Notification,title:`Ricwiz: Analyzing ${a.name} in Salesforce...`,cancellable:!1},async()=>{let n="";if(a.type==="CustomField"){let r=a.name.split(".");r.length===2&&(n=`SELECT LastModifiedBy.Name, LastModifiedDate, CreatedBy.Name FROM CustomField WHERE DeveloperName = '${r[1].replace("__c","")}' AND TableEnumOrId = '${r[0]}'`)}else a.type==="LightningComponentBundle"?n=`SELECT LastModifiedBy.Name, LastModifiedDate, CreatedBy.Name FROM LightningComponentBundle WHERE DeveloperName = '${a.name}'`:n=`SELECT LastModifiedBy.Name, LastModifiedDate, CreatedBy.Name FROM ${a.type} WHERE Name = '${a.name}'`;if(n)try{let{stdout:r}=await h(`sf data query -t -q "${n}" --json`,{cwd:o,maxBuffer:52428800}),c=JSON.parse(r);if(c&&c.result&&c.result.records&&c.result.records.length>0){let p=c.result.records[0];m=p.LastModifiedBy?p.LastModifiedBy.Name:"Unknown",u=p.CreatedBy?p.CreatedBy.Name:"Unknown",d=new Date(p.LastModifiedDate).toLocaleString()}else m="Not found in Org",d="N/A",u="N/A"}catch{m="Query Error",d="N/A",u="N/A"}try{let r="SELECT Action, Display, CreatedBy.Name, CreatedDate FROM SetupAuditTrail ORDER BY CreatedDate DESC LIMIT 1500",{stdout:c}=await h(`sf data query -q "${r}" --json`,{cwd:o,maxBuffer:52428800}),p=JSON.parse(c);if(p&&p.result&&p.result.records){let f=a.name.replace("__c","");l=p.result.records.filter(v=>v.Display&&v.Display.includes(f)).map(v=>({action:v.Action,display:v.Display,author:v.CreatedBy?v.CreatedBy.Name:"Unknown",time:new Date(v.CreatedDate).toLocaleString()})).slice(0,10)}}catch(r){console.error("Audit trail query error:",r)}})}catch(n){console.error("Salesforce query error:",n)}else m="Unsupported Metadata Type",d="N/A";return{fileName:i,gitHistory:s,sfAuthor:m,sfTime:d,sfCreatedBy:u,auditHistory:l}}function hi(t){let e=t.replace(/\\/g,"/");if(e.includes("/classes/")){let i=e.match(/\/classes\/([^/.]+)\.cls/);if(i)return{type:"ApexClass",name:i[1]}}if(e.includes("/triggers/")){let i=e.match(/\/triggers\/([^/.]+)\.trigger/);if(i)return{type:"ApexTrigger",name:i[1]}}if(e.includes("/lwc/")){let i=e.match(/\/lwc\/([^/]+)\//);if(i)return{type:"LightningComponentBundle",name:i[1]}}if(e.includes("/aura/")){let i=e.match(/\/aura\/([^/]+)\//);if(i)return{type:"AuraDefinitionBundle",name:i[1]}}if(e.includes("/objects/")&&e.includes("/fields/")){let i=e.match(/\/objects\/([^/]+)\//),o=e.match(/\/fields\/([^/.]+)\.field/);if(i&&o)return{type:"CustomField",name:`${i[1]}.${o[1]}`}}return null}var ze,Yo,Zo=P(()=>{"use strict";ze=x(require("vscode")),Yo=x(require("path"));E()});async function Xo(t,e){let i=k();if(!i)return;let o=(await Fe())?.trim();if(!o){ae.window.showErrorMessage("Ricwiz: GitLab token is not configured.");return}try{let s=await L.initialize(i,{skipPrompt:!0});if(!s)return;let m=ae.workspace.getConfiguration("ricwiz"),u=s.getConfig("gitlabUrlOverride","");if(u){let l=new URL(u);u=`${l.protocol}//${l.host}`}else{let{stdout:l}=await h("git remote",{cwd:i}),a=l.split(`
`).map(r=>r.trim()).filter(r=>r),n=!1;for(let r of a){let{stdout:c}=await h(`git remote get-url ${r}`,{cwd:i}),p=c.trim();p.endsWith(".git")&&(p=p.slice(0,-4)),p.startsWith("git@")&&(p=p.replace("git@","").replace(":","/"),p=`https://${p}`);let f=new URL(p),w=f.pathname;if(w.startsWith("/")&&(w=w.substring(1)),w.endsWith("/")&&(w=w.slice(0,-1)),encodeURIComponent(w)===t||w===t){u=`${f.protocol}//${f.host}`,n=!0;break}}if(!n){ae.window.showErrorMessage(`Ricwiz: Could not determine base URL for project ${t}`);return}}await ae.window.withProgress({location:ae.ProgressLocation.Notification,title:`Fetching failed jobs for Pipeline #${e}...`,cancellable:!1},async()=>{let l=new We.Agent({keepAlive:!0}),a=new URL(`${u}/api/v4/projects/${t}/pipelines/${e}/jobs?scope[]=failed`),n=await new Promise((v,g)=>{We.get(a,{headers:{"PRIVATE-TOKEN":o},agent:l},b=>{let S="";b.on("data",B=>S+=B),b.on("end",()=>{if(b.statusCode===200)try{v(JSON.parse(S))}catch{v([])}else v([])})}).on("error",()=>v([]))});if(!n||n.length===0){ae.window.showInformationMessage("Ricwiz: No failed jobs found for this pipeline.");return}let r=n[0],c=new URL(`${u}/api/v4/projects/${t}/jobs/${r.id}/trace`),f=(await new Promise((v,g)=>{We.get(c,{headers:{"PRIVATE-TOKEN":o},agent:l},b=>{let S="";b.on("data",B=>S+=B),b.on("end",()=>v(S))}).on("error",b=>v(`Failed to fetch log: ${b.message}`))})).replace(/\x1B\[[0-9;]*[mK]/g,""),w=ae.window.createOutputChannel(`Pipeline #${e} - Job ${r.name}`);w.appendLine(`Pipeline ID: ${e}`),w.appendLine(`Job Name: ${r.name}`),w.appendLine(`Status: ${r.status}`),w.appendLine(`URL: ${r.web_url}`),w.appendLine("========================================"),w.appendLine(f),w.show()})}catch(s){ae.window.showErrorMessage(`Ricwiz: Error fetching pipeline logs - ${s.message}`)}}var ae,We,ei=P(()=>{"use strict";ae=x(require("vscode"));ke();E();We=x(require("https"));N();E()});function ti(t,e,i){t.subscriptions.push(y.commands.registerCommand("ricwiz.generateDestructiveChanges",async(...o)=>{try{await Dt(...o)}finally{y.commands.executeCommand("ricwiz.manualRefresh")}}),y.commands.registerCommand("ricwiz.runSmartTests",async(...o)=>{try{await At(...o)}finally{y.commands.executeCommand("ricwiz.manualRefresh")}}),y.commands.registerCommand("ricwiz.refreshWebview",()=>{e&&y.commands.executeCommand("workbench.action.webview.reloadWebviewAction")}),y.commands.registerCommand("ricwiz.createBranches",async(...o)=>{try{await Ot(...o)}finally{y.commands.executeCommand("ricwiz.manualRefresh")}}),y.commands.registerCommand("ricwiz.prepareDeploy",async(...o)=>{try{await Jt(...o)}finally{y.commands.executeCommand("ricwiz.manualRefresh")}}),y.commands.registerCommand("ricwiz.createMergeRequests",async(...o)=>{try{await Ht(...o)}finally{y.commands.executeCommand("ricwiz.manualRefresh")}}),y.commands.registerCommand("ricwiz.createMergeRequestsVSCode",async(...o)=>{try{await Vt(...o)}finally{y.commands.executeCommand("ricwiz.manualRefresh")}}),y.commands.registerCommand("ricwiz.openJiraTicket",async(...o)=>{try{await Yt(...o)}finally{y.commands.executeCommand("ricwiz.manualRefresh")}}),y.commands.registerCommand("ricwiz.openJiraTicketVSCode",async(...o)=>{try{await Kt(...o)}finally{y.commands.executeCommand("ricwiz.manualRefresh")}}),y.commands.registerCommand("ricwiz.showJiraDetails",()=>{e&&ao(e)}),y.commands.registerCommand("ricwiz.openJiraDashboard",o=>{e&&lo(e,o)}),y.commands.registerCommand("ricwiz.openJiraDetailsForId",o=>{e&&mo(e,o)}),y.commands.registerCommand("ricwiz.toggleDashboardBranches",o=>{e&&(e.setDashboardShowBranches(o),y.commands.executeCommand("ricwiz.openJiraDashboard"))}),y.commands.registerCommand("ricwiz.changeJiraStatus",async(...o)=>{try{await uo(...o)}finally{y.commands.executeCommand("ricwiz.manualRefresh")}}),y.commands.registerCommand("ricwiz.addJiraComment",async(...o)=>{try{await go(...o)}finally{y.commands.executeCommand("ricwiz.manualRefresh")}}),y.commands.registerCommand("ricwiz.addJiraLabel",async(...o)=>{try{await fo(...o)}finally{y.commands.executeCommand("ricwiz.manualRefresh")}}),y.commands.registerCommand("ricwiz.setJiraToken",ho),y.commands.registerCommand("ricwiz.setGitlabToken",vo),y.commands.registerCommand("ricwiz.syncAll",async(...o)=>{try{await yo(...o)}finally{y.commands.executeCommand("ricwiz.manualRefresh")}}),y.commands.registerCommand("ricwiz.updateBases",async(...o)=>{try{await ko(...o)}finally{y.commands.executeCommand("ricwiz.manualRefresh")}}),y.commands.registerCommand("ricwiz.deleteUnusedBranches",async(...o)=>{try{await $o(...o)}finally{y.commands.executeCommand("ricwiz.manualRefresh")}}),y.commands.registerCommand("ricwiz.checkoutBranch",async(...o)=>{try{await Le(...o)}finally{y.commands.executeCommand("ricwiz.manualRefresh")}}),y.commands.registerCommand("ricwiz.copyBranchName",async(...o)=>{try{await zo(...o)}finally{y.commands.executeCommand("ricwiz.manualRefresh")}}),y.commands.registerCommand("ricwiz.generatePackageXml",async(...o)=>{try{await Bo(...o)}finally{y.commands.executeCommand("ricwiz.manualRefresh")}}),y.commands.registerCommand("ricwiz.deployPackage",async(...o)=>{try{await To(...o)}finally{y.commands.executeCommand("ricwiz.manualRefresh")}}),y.commands.registerCommand("ricwiz.importData",async(...o)=>{try{await Do(...o)}finally{y.commands.executeCommand("ricwiz.manualRefresh")}}),y.commands.registerCommand("ricwiz.listTicketFiles",async(...o)=>{try{await Ao(...o)}finally{y.commands.executeCommand("ricwiz.manualRefresh")}}),y.commands.registerCommand("ricwiz.resetTracking",async(...o)=>{try{await Io(...o)}finally{y.commands.executeCommand("ricwiz.manualRefresh")}}),y.commands.registerCommand("ricwiz.extractComponent",async(...o)=>{try{await Uo(...o)}finally{y.commands.executeCommand("ricwiz.manualRefresh")}}),y.commands.registerCommand("ricwiz.deployMultiOrg",async(...o)=>{try{await Wo(...o)}finally{y.commands.executeCommand("ricwiz.manualRefresh")}}),y.commands.registerCommand("ricwiz.captureAdminChanges",async(...o)=>{try{await qo(...o)}finally{y.commands.executeCommand("ricwiz.manualRefresh")}}),y.commands.registerCommand("ricwiz.openHistory",async(...o)=>{try{await Ho(...o)}finally{y.commands.executeCommand("ricwiz.manualRefresh")}}),y.commands.registerCommand("ricwiz.searchTicket",async(...o)=>{try{await _o(...o)}finally{y.commands.executeCommand("ricwiz.manualRefresh")}}),y.commands.registerCommand("ricwiz.whoToBlame",async()=>{let o=await Ko();o&&e&&(e.setBlameData(o),e.setPage("blame"))}),y.commands.registerCommand("ricwiz.showPipelineLogs",(o,s)=>Xo(o,s)),y.commands.registerCommand("ricwiz.manualRefresh",()=>{i&&i()}),y.commands.registerCommand("ricwiz.toggleAutoRefresh",()=>{if(e){let o=!e.isAutoRefreshEnabled();e.setAutoRefresh(o),y.workspace.getConfiguration("ricwiz").update("autoRefresh",o,y.ConfigurationTarget.Global)}}),y.commands.registerCommand("ricwiz.openSettings",()=>{y.commands.executeCommand("workbench.action.openSettings","ricwiz")}))}var y,oi=P(()=>{"use strict";y=x(require("vscode"));Lt();Ft();Ut();qt();_t();Zt();co();po();wo();bo();xo();Co();Ro();rt();Po();Eo();Mo();Lo();Fo();Oo();jo();Jo();Go();Vo();Qo();Zo();ei()});function ii(t,e,i){let o,s=le.workspace.getConfiguration("ricwiz").get("autoRefresh",!0);e?.setAutoRefresh(s),t.subscriptions.push(le.workspace.onDidChangeConfiguration(d=>{if(d.affectsConfiguration("ricwiz.autoRefresh")){let u=le.workspace.getConfiguration("ricwiz").get("autoRefresh",!0);e?.setAutoRefresh(u)}}));async function m(){let d=le.extensions.getExtension("vscode.git");if(d){let a=function(n){let r="",c;async function p(){let w=le.workspace.workspaceFolders;if(!w)return;let v=w[0].uri.fsPath,g=await j(v);if(g&&g!==r){r=g;let b=le.workspace.getConfiguration("ricwiz"),S=b.get("ticketPrefix","SFPSCA-");if(!g.includes(S)){let A=g.match(/([A-Z]+-)\d+/i);A&&(S=A[1].toUpperCase())}let B=[],D=[],$=[],R=[],M=await L.initialize(v,{skipPrompt:!0}),oe=M?.environments||b.get("environments",[{name:"Qual",sourceBranch:"quality"},{name:"Val",sourceBranch:"validation"},{name:"Prod",sourceBranch:"main"}]);try{let A=b.get("workspaceCheckoutButtons",["main","quality","validation"]);$=Array.from(new Set(A))}catch{}let Y="",me=g.match(new RegExp(`(${S}\\d+(?:-\\d+)?)`,"i"));if(me){let A=me[1].toUpperCase();Y=A;let xe=b.get("commitMessageSuffix","- "),yt=/^[A-Z]+-\d+(?:-\d+)?\s*(?:-\s*|:\s*|\s+)?/i;yt.test(n.inputBox.value)?n.inputBox.value.toUpperCase().startsWith(A)||(n.inputBox.value=n.inputBox.value.replace(yt,`${A}${xe}`)):n.inputBox.value=`${A}${xe}`+n.inputBox.value,i.text=`$(bookmark) ${A}`,i.tooltip=`Branch: ${g}
Click to open Jira ticket`,i.show();try{let xt=await wt(v,A,"");B=await ut(v,xt,A,oe,M)}catch{}}else{i.hide();try{R=await ht(v)}catch{}}let[Ge,He,ye]=await Promise.all([ft(v,10),gt(v,g,oe,M),Y?De(Y).catch(A=>{let xe=A.message;return(xe.includes("ENOTFOUND")||xe.includes("network"))&&(xe="No Internet or Invalid URL"),{summary:`\u26A0\uFE0F Jira Error: ${xe}`,description:"",status:""}}):Promise.resolve(null)]);D=Ge;let dt=ye?ye.summary:"",Pe=ye&&ye.status||"";e?.updateBranch(g,He,B,D,$,R,dt,Pe)}}function f(){e?.isAutoRefreshEnabled()&&(c&&clearTimeout(c),c=setTimeout(()=>{r="",p()},300))}o=()=>{r="",p()},p(),n.state.onDidChange(()=>f()),le.window.onDidChangeWindowState(w=>{w.focused&&f()})};var u=a;d.isActive||await d.activate();let l=d.exports.getAPI(1);l.repositories.length>0&&l.repositories.forEach(n=>a(n)),l.onDidOpenRepository(n=>a(n))}}return m(),()=>{o&&o()}}var le,ni=P(()=>{"use strict";le=x(require("vscode"));E();ue();Ue();N()});var Ke={};Ae(Ke,{activate:()=>wi,deactivate:()=>vi,webviewProvider:()=>Je});module.exports=I(Ke);function wi(t){$t(t),Je=new _e(t.extensionUri),t.subscriptions.push(qe.window.registerWebviewViewProvider("ricwiz-webview",Je));let e=qe.window.createStatusBarItem(qe.StatusBarAlignment.Left,100);e.command="ricwiz.openJiraTicket",t.subscriptions.push(e);let i=ii(t,Je,e);ti(t,Je,i)}function vi(){}var qe,Je,Ze=P(()=>{qe=x(require("vscode"));Ct();ke();oi();ni()});Ze();0&&(module.exports={activate,deactivate,webviewProvider});
