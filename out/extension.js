"use strict";var ri=Object.create;var Ve=Object.defineProperty;var si=Object.getOwnPropertyDescriptor;var ai=Object.getOwnPropertyNames;var ci=Object.getPrototypeOf,di=Object.prototype.hasOwnProperty;var P=(t,e,i)=>()=>{if(i)throw i[0];try{return t&&(e=t(t=0)),e}catch(o){throw i=[o],o}};var Ae=(t,e)=>{for(var i in e)Ve(t,i,{get:e[i],enumerable:!0})},kt=(t,e,i,o)=>{if(e&&typeof e=="object"||typeof e=="function")for(let s of ai(e))!di.call(t,s)&&s!==i&&Ve(t,s,{get:()=>e[s],enumerable:!(o=si(e,s))||o.enumerable});return t};var y=(t,e,i)=>(i=t!=null?ri(ci(t)):{},kt(e||!t||!t.__esModule?Ve(i,"default",{value:t,enumerable:!0}):i,t)),I=t=>kt(Ve({},"__esModule",{value:!0}),t);function R(t){return t.replace(/&/g,"&amp;").replace(/</g,"&lt;").replace(/>/g,"&gt;").replace(/"/g,"&quot;").replace(/'/g,"&#39;")}var $,_e,Ct=P(()=>{"use strict";$=y(require("vscode"));_e=class{constructor(e){this._extensionUri=e}_extensionUri;webviewView;resolveWebviewView(e,i,o){this.webviewView=e,e.webview.options={enableScripts:!0,localResourceRoots:[this._extensionUri]},this.updateView(),e.webview.onDidReceiveMessage(s=>{switch(s.command){case"createBranches":$.commands.executeCommand("ricwiz.createBranches");break;case"createBranchForTicket":$.commands.executeCommand("ricwiz.createBranches",s.args);break;case"prepareDeploy":$.commands.executeCommand("ricwiz.prepareDeploy");break;case"openMRs":$.commands.executeCommand("ricwiz.createMergeRequests");break;case"openMRsVSCode":$.commands.executeCommand("ricwiz.createMergeRequestsVSCode");break;case"openExternal":s.args&&$.env.openExternal($.Uri.parse(s.args));break;case"openJira":$.commands.executeCommand("ricwiz.openJiraTicket");break;case"showJiraDetails":$.commands.executeCommand("ricwiz.showJiraDetails");break;case"showPipelineLogs":$.commands.executeCommand("ricwiz.showPipelineLogs",s.args.projectPath,s.args.pipelineId);break;case"changeJiraStatus":$.commands.executeCommand("ricwiz.changeJiraStatus");break;case"addJiraComment":$.commands.executeCommand("ricwiz.addJiraComment");break;case"addJiraLabel":$.commands.executeCommand("ricwiz.addJiraLabel");break;case"setPage":this.setPage(s.args);break;case"openDashboard":$.commands.executeCommand("ricwiz.openJiraDashboard");break;case"openJiraDetailsForId":$.commands.executeCommand("ricwiz.openJiraDetailsForId",s.args);break;case"refreshDashboard":$.commands.executeCommand("ricwiz.openJiraDashboard");break;case"switchDashboardQuery":$.commands.executeCommand("ricwiz.openJiraDashboard",parseInt(s.args));break;case"toggleDashboardBranches":$.commands.executeCommand("ricwiz.toggleDashboardBranches",s.args);break;case"openJiraVSCode":$.commands.executeCommand("ricwiz.openJiraTicketVSCode");break;case"openSettings":$.commands.executeCommand("ricwiz.openSettings");break;case"checkout":s.branch&&$.commands.executeCommand("ricwiz.checkoutBranch",s.branch);break;case"copyBranch":$.commands.executeCommand("ricwiz.copyBranchName");break;case"generatePackageXml":$.commands.executeCommand("ricwiz.generatePackageXml");break;case"openDevTools":this.setPage("devtools");break;case"openMain":this.setPage("main");break;case"generateDestructiveChanges":$.commands.executeCommand("ricwiz.generateDestructiveChanges");break;case"deployPackage":$.commands.executeCommand("ricwiz.deployPackage");break;case"runSmartTests":$.commands.executeCommand("ricwiz.runSmartTests");break;case"importData":$.commands.executeCommand("ricwiz.importData");break;case"listTicketFiles":$.commands.executeCommand("ricwiz.listTicketFiles");break;case"resetTracking":$.commands.executeCommand("ricwiz.resetTracking");break;case"extractComponent":$.commands.executeCommand("ricwiz.extractComponent");break;case"deployMultiOrg":$.commands.executeCommand("ricwiz.deployMultiOrg");break;case"captureAdminChanges":$.commands.executeCommand("ricwiz.captureAdminChanges");break;case"whoToBlame":$.commands.executeCommand("ricwiz.whoToBlame");break;case"syncAll":$.commands.executeCommand("ricwiz.syncAll");break;case"updateBases":$.commands.executeCommand("ricwiz.updateBases");break;case"deleteUnused":$.commands.executeCommand("ricwiz.deleteUnusedBranches");break;case"conflict_commitAndContinue":$.commands.executeCommand("ricwiz.conflictAction","commitAndContinue");break;case"conflict_resolveDeletions":$.commands.executeCommand("ricwiz.conflictAction","resolveDeletions");break;case"conflict_abortDeploy":$.commands.executeCommand("ricwiz.conflictAction","abortDeploy");break;case"openFile":if(s.file){let m=$.workspace.workspaceFolders;if(m){let d=$.Uri.joinPath(m[0].uri,s.file);$.commands.executeCommand("vscode.open",d)}}break;case"searchTicket":$.commands.executeCommand("ricwiz.searchTicket");break;case"manualRefresh":$.commands.executeCommand("ricwiz.manualRefresh");break;case"toggleAutoRefresh":$.commands.executeCommand("ricwiz.toggleAutoRefresh");break;case"openHistory":$.commands.executeCommand("ricwiz.openHistory");break}})}conflictState=null;setConflictState(e){this.conflictState=e,this.updateView()}updateBranch(e,i,o=[],s=[],m=[],d=[],g="",l=""){this.currentBranchCache=e,this.currentBranchIsMergedCache=i,this.relatedBranchesCache=o,this.commitsCache=s,this.baseBranchesCache=m,this.recentTicketsCache=d,this.ticketTitleCache=g,this.ticketStatusCache=l,this.webviewView&&this.updateView()}currentBranchCache="";currentBranchIsMergedCache=!1;relatedBranchesCache=[];commitsCache=[];baseBranchesCache=[];recentTicketsCache=[];ticketTitleCache="";ticketStatusCache="";currentPage="main";blameDataCache=null;jiraDataCache=null;dashboardDataCache=null;dashboardShowBranches=!1;autoRefreshEnabled=!0;setDashboardShowBranches(e){this.dashboardShowBranches=e}getDashboardShowBranches(){return this.dashboardShowBranches}setBlameData(e){this.blameDataCache=e}setJiraData(e){this.jiraDataCache=e}setDashboardData(e){this.dashboardDataCache=e}setAutoRefresh(e){this.autoRefreshEnabled=e,this.updateView()}isAutoRefreshEnabled(){return this.autoRefreshEnabled}setPage(e){this.currentPage=e,this.updateView()}updateView(){if(!this.webviewView)return;let e=this.webviewView.webview.asWebviewUri($.Uri.joinPath(this._extensionUri,"resources","logo.png"));this.webviewView.webview.html=this._getHtmlForWebview(e,this.currentBranchCache,this.relatedBranchesCache,this.commitsCache,this.baseBranchesCache,this.recentTicketsCache,this.currentPage)}_getHtmlForWebview(e,i,o,s,m,d,g){let l=u=>{let v=(u||"").toLowerCase().trim();return v==="open"?"#888888":v==="in progress"?"#007acc":v==="waiting for deploy"?"#d7a500":v==="close"||v==="done"||v==="closed"?"#238636":"var(--vscode-badge-background)"},a=s.length>0?`
            <div class="separator"></div>
            <div style="padding: 0 4px;">
                <div style="font-size: 11px; opacity: 0.7; margin-bottom: 6px; display: flex; align-items: center; gap: 4px;">
                    <span>\u2637</span> Recent Commits
                </div>
                <div style="display: flex; flex-direction: column; gap: 2px;">
                    ${s.map(u=>`
                        <div style="font-size: 11px; padding: 3px 4px; border-radius: 2px; display: flex; gap: 6px; align-items: baseline;">
                            <code style="color: var(--vscode-textLink-foreground); font-size: 10px; flex-shrink: 0;">${R(u.hash)}</code>
                            <span style="flex: 1; overflow: hidden; text-overflow: ellipsis; white-space: nowrap;" title="${R(u.message)}">${R(u.message)}</span>
                            <span style="font-size: 9px; opacity: 0.5; flex-shrink: 0;">${R(u.timeAgo)}</span>
                        </div>
                    `).join("")}
                </div>
            </div>
        `:"",n=`
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
        `;if(this.conflictState){let u=(this.conflictState.files||[]).map(v=>`
                <button class="btn" style="padding: 6px; font-size: 12px; display: flex; justify-content: space-between; align-items: center;" onclick="sendOpenFileCommand('${R(v.file)}')">
                    <span style="flex: 1; overflow: hidden; text-overflow: ellipsis; white-space: nowrap; direction: rtl; text-align: left;">&lrm;${R(v.file)}</span>
                    <span style="font-size: 10px; opacity: 0.8; flex-shrink: 0; background-color: var(--vscode-badge-background); color: var(--vscode-badge-foreground); padding: 2px 4px; border-radius: 2px;">${R(v.state)}</span>
                </button>
            `).join("");return`<!DOCTYPE html>
            <html lang="en">
            <head>
                <meta charset="UTF-8">
                <meta name="viewport" content="width=device-width, initial-scale=1.0">
                <title>Ricwiz Conflict</title>
                ${n}
            </head>
            <body>
                <div style="text-align: center; margin-bottom: 12px; margin-top: 8px;">
                    <img src="${e}" alt="Ricwiz Logo" style="width: 80px; height: 80px; opacity: 0.9;" />
                </div>
                <div style="background-color: var(--vscode-editorError-background); color: var(--vscode-editorError-foreground); padding: 12px; border-radius: 4px; margin-bottom: 12px; text-align: center;">
                    <div style="font-size: 14px; font-weight: bold; margin-bottom: 8px;">\u26A0 MERGE CONFLICT</div>
                    <div style="font-size: 11px; margin-bottom: 12px; opacity: 0.9;">
                        Merging <b>${R(this.conflictState.sourceStr)}</b> into <b>${R(this.conflictState.targetStr)}</b>.<br/>
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
                
                ${u?`
                    <div style="font-size: 11px; opacity: 0.7; margin: 8px 4px 4px 4px; text-transform: uppercase;">Conflicted Files</div>
                    <div style="display: flex; flex-direction: column; gap: 2px;">
                        ${u}
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
            </html>`}if(g==="blame"){let u=this.blameDataCache;return`<!DOCTYPE html>
            <html lang="en">
            <head>
                <meta charset="UTF-8">
                <meta name="viewport" content="width=device-width, initial-scale=1.0">
                <title>Ricwiz Blame</title>
                ${n}
            </head>
            <body>
                <div style="display: flex; align-items: center; gap: 8px; margin-bottom: 16px; margin-top: 8px;">
                    <button class="btn" style="width: auto; padding: 4px 8px; background-color: var(--vscode-button-secondaryBackground); color: var(--vscode-button-secondaryForeground);" onclick="sendCommand('openDevTools', null, this)">\u2190 Back</button>
                    <div style="font-weight: bold; font-size: 13px; flex: 1; text-align: center;">Who to Blame</div>
                </div>

                ${u?`
                <div style="padding: 12px; background: var(--vscode-editor-background); border: 1px solid var(--vscode-widget-border); border-radius: 6px; margin-bottom: 12px;">
                    <div style="font-weight: bold; margin-bottom: 12px; font-size: 14px; text-align: center; color: var(--vscode-textLink-foreground); word-break: break-all;">
                        \u25A4 ${u.fileName}
                    </div>


                    <div style="margin-bottom: 20px;">
                        <div style="font-size: 11px; font-weight: bold; opacity: 0.8; text-transform: uppercase; margin-bottom: 8px;"><span class="icon" style="color: #0A84FF;">\u25F3</span> Local Git (Last Commits)</div>
                        <ul style="list-style-type: none; padding: 0; margin: 0; display: flex; flex-direction: column; gap: 8px;">
                            ${u.gitHistory&&u.gitHistory.length>0?u.gitHistory.map(v=>`
                                <li style="background: var(--vscode-editorWidget-background); border: 1px solid var(--vscode-widget-border); padding: 8px 10px; border-radius: 4px; border-left: 4px solid var(--vscode-gitDecoration-modifiedResourceForeground);">
                                    <div style="display: flex; justify-content: space-between; margin-bottom: 4px; align-items: center;">
                                        <strong style="font-size: 13px;">${v.author}</strong>
                                        <span style="opacity: 0.7; font-size: 11px;">${v.time}</span>
                                    </div>
                                    <div style="font-size: 12px; margin-bottom: 6px; opacity: 0.9; font-style: italic;">"${v.message}"</div>
                                    <div style="font-family: monospace; font-size: 10px; opacity: 0.6;">Commit: ${v.hash}</div>
                                </li>
                            `).join(""):'<li style="opacity:0.7; font-size: 12px;">No Git history found.</li>'}
                        </ul>
                    </div>

                    <div style="margin-bottom: 20px;">
                        <div style="font-size: 11px; font-weight: bold; opacity: 0.8; text-transform: uppercase; margin-bottom: 8px;"><span class="icon" style="color: #0A84FF;">\u2601</span> Salesforce Metadata</div>
                        <div style="display: flex; flex-direction: column; gap: 8px;">
                            <div style="background: var(--vscode-editorWidget-background); border: 1px solid var(--vscode-widget-border); padding: 8px 10px; border-radius: 4px; border-left: 4px solid var(--vscode-gitDecoration-addedResourceForeground);">
                                <div style="font-size: 10px; opacity: 0.7; text-transform: uppercase; margin-bottom: 2px;">Last Modified By</div>
                                <div style="font-weight: bold; font-size: 13px;">${u.sfAuthor}</div>
                                <div style="font-size: 11px; opacity: 0.7; margin-top: 2px;">${u.sfTime}</div>
                            </div>
                            ${u.sfCreatedBy!=="Unknown"&&u.sfCreatedBy!=="N/A"?`
                            <div style="background: var(--vscode-editorWidget-background); border: 1px solid var(--vscode-widget-border); padding: 8px 10px; border-radius: 4px; border-left: 4px solid var(--vscode-gitDecoration-addedResourceForeground);">
                                <div style="font-size: 10px; opacity: 0.7; text-transform: uppercase; margin-bottom: 2px;">Created By</div>
                                <div style="font-weight: bold; font-size: 13px;">${u.sfCreatedBy}</div>
                            </div>
                            `:""}
                        </div>
                    </div>

                    <div>
                        <div style="font-size: 11px; font-weight: bold; opacity: 0.8; text-transform: uppercase; margin-bottom: 8px;"><span class="icon" style="color: #FFD60A;">\u26B2</span> Setup Audit Trail (Recent)</div>
                        <ul style="list-style-type: none; padding: 0; margin: 0; display: flex; flex-direction: column; gap: 8px;">
                            ${u.auditHistory&&u.auditHistory.length>0?u.auditHistory.map(v=>`
                                <li style="background: var(--vscode-editorWidget-background); border: 1px solid var(--vscode-widget-border); padding: 8px 10px; border-radius: 4px; border-left: 4px solid var(--vscode-gitDecoration-untrackedResourceForeground);">
                                    <div style="display: flex; justify-content: space-between; margin-bottom: 4px; align-items: center;">
                                        <strong style="font-size: 13px;">${v.author}</strong>
                                        <span style="opacity: 0.7; font-size: 11px;">${v.time}</span>
                                    </div>
                                    <div style="font-size: 12px; font-weight: 500; margin-bottom: 4px;">${v.action}</div>
                                    <div style="font-size: 11px; opacity: 0.7; font-style: italic; background: var(--vscode-editor-background); padding: 4px; border-radius: 3px;">${v.display}</div>
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
            </html>`}if(g==="jira"){let u=this.jiraDataCache,v=u?.ticketId||"Jira",C=u?.summary||"No Title",k=u?.description||"No description provided.",S=u?.relatedBranches||[];return`<!DOCTYPE html>
            <html lang="en">
            <head>
                <meta charset="UTF-8">
                <meta name="viewport" content="width=device-width, initial-scale=1.0">
                <title>Ricwiz Jira Details</title>
                ${n}
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
                    <span style="font-weight: 600; font-size: 13px;">${v} Details</span>
                </div>
                
                <div class="card" style="padding: 16px;">
                    <div class="jira-title">${R(C)}</div>
                    <div class="jira-desc">${R(k)}</div>
                    
                    ${S.length>0?`
                        <div style="margin-top: 16px; border-top: 1px solid var(--vscode-panel-border); padding-top: 12px;">
                            <div style="font-size: 11px; opacity: 0.7; margin-bottom: 8px; text-transform: uppercase; font-weight: bold;"><span class="icon" style="color: #32D74B;">\u2387</span> Related Branches & MRs</div>
                            <div style="display: flex; flex-direction: column; gap: 4px;">
                                ${S.map(T=>{let B="";T.pipelineStatus==="running"?B="\u{1F7E1}":T.pipelineStatus==="success"?B="\u{1F7E2}":T.pipelineStatus==="failed"?B="\u{1F534}":(T.pipelineStatus==="canceled"||T.pipelineStatus==="skipped")&&(B="\u26AA");let z="";return T.pipelineStatus==="failed"&&T.projectPath&&T.pipelineId&&(z=`onclick="event.stopPropagation(); sendCommand('showPipelineLogs', { projectPath: '${T.projectPath}', pipelineId: ${T.pipelineId} });" style="cursor: pointer;"`),`
                                    <div class="btn" style="padding: 6px 10px; font-size: 12px; display: flex; justify-content: space-between; align-items: center; background-color: var(--vscode-button-secondaryBackground); color: var(--vscode-button-secondaryForeground); border-radius: 4px;" onclick="sendCheckoutCommand('${R(T.name)}', this)" title="Checkout ${R(T.name)}">
                                        <div style="display: flex; align-items: center; gap: 6px; overflow: hidden;">
                                            <span style="overflow: hidden; text-overflow: ellipsis; white-space: nowrap; font-weight: bold;">${R(T.name)}</span>
                                        </div>
                                        <div style="display: flex; gap: 6px; align-items: center;">
                                            ${B?`<span title="Pipeline: ${T.pipelineStatus}" style="font-size: 11px;" ${z}>${B}</span>`:""}
                                            ${T.mrUrl?`<span onclick="event.stopPropagation(); sendCommand('openExternal', '${T.mrUrl}');" title="Open Merge Request" style="cursor: pointer; font-size: 12px;">\u{1F517}</span>`:""}
                                            ${T.isMerged?'<span style="background-color: var(--vscode-charts-green); color: white; border-radius: 3px; padding: 2px 6px; font-size: 10px; font-weight: bold;" title="Merged to target env">MERGED</span>':""}
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
                    ${u?.url?`
                    <button class="btn" style="flex: 1; background-color: var(--vscode-button-secondaryBackground); border-radius: 4px;" onclick="sendCommand('openExternal', '${u.url}', this)">
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
            </html>`}if(g==="dashboard"){let u=this.dashboardDataCache||{queries:[],selectedIndex:0,results:[],error:null},v=u.queries.map((k,S)=>`
                <option value="${S}" ${S===u.selectedIndex?"selected":""}>${R(k.name)}</option>
            `).join(""),C=u.error?`
                <div style="color: var(--vscode-errorForeground); padding: 12px; text-align: center; background: var(--vscode-editorError-background); border-radius: 4px;">
                    \u26A0 ${R(u.error)}
                </div>
            `:u.results.length===0?`
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
                        ${u.results.map(k=>`
                            <tr style="border-bottom: ${k.detailedBranches&&k.detailedBranches.length>0?"none":"1px solid var(--vscode-panel-border)"}; cursor: pointer;" class="tr-hover" onclick="sendCommand('openJiraDetailsForId', '${R(k.key)}', this)">
                                <td style="padding: 6px; font-weight: bold; color: var(--vscode-textLink-foreground); white-space: nowrap;">${R(k.key)}</td>
                                <td style="padding: 6px; overflow: hidden; text-overflow: ellipsis; max-width: 150px; white-space: nowrap;" title="${R(k.summary)}">${R(k.summary)}</td>
                                <td style="padding: 6px; white-space: nowrap;">
                                    <span style="background: ${l(k.status)}; color: white; padding: 2px 4px; border-radius: 3px; font-size: 9px; font-weight: bold; text-transform: uppercase;">${R(k.status)}</span>
                                </td>
                                <td style="padding: 6px; white-space: nowrap; text-align: center;">
                                    ${k.detailedBranches?"":k.branch?`
                                        <button class="icon-button" style="background-color: var(--vscode-button-secondaryBackground); color: var(--vscode-button-secondaryForeground); font-size: 10px; padding: 2px 6px;" title="Checkout ${R(k.branch)}" onclick="event.stopPropagation(); sendCommand('checkout', { branch: '${R(k.branch)}' })">
                                            \u2387 Checkout
                                        </button>
                                    `:`
                                        <button class="icon-button" style="background-color: var(--vscode-button-background); color: var(--vscode-button-foreground); font-size: 10px; padding: 2px 6px;" title="Create Branch for ${R(k.key)}" onclick="event.stopPropagation(); sendCommand('createBranchForTicket', '${R(k.key)}')">
                                            + Create
                                        </button>
                                    `}
                                </td>
                            </tr>
                            ${k.detailedBranches&&k.detailedBranches.length>0?`
                            <tr style="border-bottom: 1px solid var(--vscode-panel-border);">
                                <td colspan="4" style="padding: 0 6px 8px 6px;">
                                    <div style="display: flex; flex-direction: column; gap: 4px; padding-left: 8px; border-left: 2px solid var(--vscode-editorIndentGuide-activeBackground1);">
                                        ${k.detailedBranches.map(S=>{let T="";S.pipelineStatus==="running"?T="\u{1F7E1}":S.pipelineStatus==="success"?T="\u{1F7E2}":S.pipelineStatus==="failed"?T="\u{1F534}":S.pipelineStatus==="canceled"&&(T="\u26AA");let B="";return S.pipelineStatus==="failed"&&S.projectPath&&S.pipelineId&&(B=`onclick="event.stopPropagation(); sendCommand('showPipelineLogs', { projectPath: '${S.projectPath}', pipelineId: ${S.pipelineId} });" style="cursor: pointer;"`),`
                                            <div style="display: flex; justify-content: space-between; align-items: center; font-size: 10px; background: var(--vscode-editor-background); padding: 2px 6px; border-radius: 3px;">
                                                <div style="display: flex; align-items: center; gap: 6px; overflow: hidden; cursor: pointer; flex: 1;" onclick="sendCheckoutCommand('${R(S.name)}', this)" title="Checkout ${R(S.name)}">
                                                    <span style="overflow: hidden; text-overflow: ellipsis; white-space: nowrap;">${R(S.name)}</span>
                                                    ${T?`<span title="Pipeline: ${S.pipelineStatus}" ${B}>${T}</span>`:""}
                                                </div>
                                                <div style="display: flex; gap: 6px; align-items: center;">
                                                    ${S.mrUrl?`<span onclick="event.stopPropagation(); sendCommand('openExternal', '${S.mrUrl}');" title="Open Merge Request" style="cursor: pointer;">\u{1F517}</span>`:""}
                                                    ${S.isMerged?'<span style="background-color: var(--vscode-charts-green); color: white; border-radius: 3px; padding: 1px 4px; font-size: 8px; font-weight: bold;">MERGED</span>':""}
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
                ${n}
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
                
                ${u.queries.length>0?`
                <div style="margin-bottom: 12px;">
                    <select id="querySelect" onchange="sendCommand('switchDashboardQuery', this.value)">
                        ${v}
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
                    ${C}
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
                ${n}
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
            </html>`;let r=o.find(u=>u.name===i),c="";r&&(r.pipelineStatus==="running"?c="\u{1F7E1}":r.pipelineStatus==="success"?c="\u{1F7E2}":r.pipelineStatus==="failed"?c="\u{1F534}":(r.pipelineStatus==="canceled"||r.pipelineStatus==="skipped")&&(c="\u26AA"));let p=r?r.mrUrl:void 0,f=o.filter(u=>u.name!==i),w=i?`<div style="background-color: var(--vscode-editor-inactiveSelectionBackground); padding: 10px; border-radius: 6px; margin-bottom: 16px; border: 1px solid var(--vscode-panel-border); box-shadow: 0 2px 4px rgba(0,0,0,0.1); position: relative;">
                ${this.ticketTitleCache&&this.ticketStatusCache?`
                <div style="position: absolute; top: 6px; right: 6px; z-index: 10; cursor: pointer; font-size: 9px; padding: 2px 6px; border-radius: 4px; background-color: ${l(this.ticketStatusCache)}; color: white; border: 1px solid var(--vscode-panel-border); opacity: 0.9; font-weight: bold; text-transform: uppercase; display: flex; align-items: center; gap: 4px;" onclick="sendCommand('changeJiraStatus', null, this)" title="Update Jira Status">
                    <span>\u270E</span><span>${R(this.ticketStatusCache)}</span>
                </div>
                `:""}
                <div style="font-size: 10px; opacity: 0.7; margin-bottom: 4px; display: flex; align-items: center; justify-content: center; gap: 4px; text-transform: uppercase;">
                    <span>Current Ticket / Branch</span>
                    <button class="copy-btn" onclick="sendCommand('copyBranch', null, this)" title="Copy branch name to clipboard">\u2398</button>
                </div>
                <div style="font-weight: bold; font-size: 14px; word-break: break-all; text-align: center; color: var(--vscode-textLink-foreground); display: flex; justify-content: center; align-items: center; gap: 6px;">
                    <span>${R(i)}</span>
                    ${c?`<span title="Pipeline: ${r.pipelineStatus}" style="font-size: 12px;">${c}</span>`:""}
                    ${p?`<span onclick="event.stopPropagation(); sendCommand('openExternal', '${p}');" title="Open Merge Request" style="cursor: pointer; font-size: 12px;">\u{1F517}</span>`:""}
                    ${this.currentBranchIsMergedCache?'<span style="background-color: var(--vscode-charts-green); color: white; border-radius: 3px; padding: 1px 4px; font-size: 10px; font-weight: bold;" title="Merged to target env">MERGED</span>':""}
                </div>
                ${this.ticketTitleCache?`<div style="font-size: 12px; margin-top: 6px; text-align: center; opacity: 0.9; font-style: italic;">${R(this.ticketTitleCache)}</div>`:""}
                ${f.length>0?`
                    <div style="margin-top: 10px; border-top: 1px solid var(--vscode-panel-border); padding-top: 10px;">
                        <div style="font-size: 10px; opacity: 0.7; margin-bottom: 6px; text-transform: uppercase; text-align: center;">Sister Branches</div>
                        <div style="display: flex; flex-direction: column; gap: 4px;">
                            ${f.map(u=>{let v="";u.pipelineStatus==="running"?v="\u{1F7E1}":u.pipelineStatus==="success"?v="\u{1F7E2}":u.pipelineStatus==="failed"?v="\u{1F534}":(u.pipelineStatus==="canceled"||u.pipelineStatus==="skipped")&&(v="\u26AA");let C="";return u.pipelineStatus==="failed"&&u.projectPath&&u.pipelineId&&(C=`onclick="event.stopPropagation(); sendCommand('showPipelineLogs', { projectPath: '${u.projectPath}', pipelineId: ${u.pipelineId} });" style="cursor: pointer;"`),`
                                <div class="btn" style="padding: 6px 8px; font-size: 11px; display: flex; justify-content: space-between; align-items: center; background-color: var(--vscode-button-secondaryBackground); color: var(--vscode-button-secondaryForeground); border-radius: 4px; box-sizing: border-box; width: 100%;" onclick="sendCheckoutCommand('${R(u.name)}', this)" title="Checkout ${R(u.name)}">
                                    <div style="display: flex; align-items: center; gap: 4px; overflow: hidden;">
                                        <span style="overflow: hidden; text-overflow: ellipsis; white-space: nowrap; font-weight: bold;">${R(u.name)}</span>
                                    </div>
                                    <div style="display: flex; gap: 4px; align-items: center;">
                                        ${v?`<span title="Pipeline: ${u.pipelineStatus}" style="font-size: 10px;" ${C}>${v}</span>`:""}
                                        ${u.mrUrl?`<span onclick="event.stopPropagation(); sendCommand('openExternal', '${u.mrUrl}');" title="Open Merge Request" style="cursor: pointer; font-size: 10px;">\u{1F517}</span>`:""}
                                        ${u.isMerged?'<span style="background-color: var(--vscode-charts-green); color: white; border-radius: 3px; padding: 1px 4px; font-size: 9px; font-weight: bold;" title="Merged to target env">MERGED</span>':""}
                                    </div>
                                </div>`}).join("")}
                        </div>
                    </div>
                `:d.length>0?`
                    <div style="margin-top: 10px; border-top: 1px solid var(--vscode-panel-border); padding-top: 10px;">
                        <div style="font-size: 10px; opacity: 0.7; margin-bottom: 6px; text-transform: uppercase; text-align: center;">Recent Tickets</div>
                        <div style="display: flex; flex-direction: column; gap: 4px;">
                            ${d.map(u=>`
                                <div class="btn" style="padding: 6px 8px; font-size: 11px; display: flex; justify-content: space-between; align-items: center; background-color: var(--vscode-button-secondaryBackground); color: var(--vscode-button-secondaryForeground); border-radius: 4px; box-sizing: border-box; width: 100%;" onclick="sendCheckoutCommand('${R(u)}', this)" title="Checkout ${R(u)}">
                                    <span style="font-weight: bold; overflow: hidden; text-overflow: ellipsis; white-space: nowrap;">${R(u)}</span>
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
            ${n}
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

            ${w}


            ${m.length>0?`
                <div style="display: flex; gap: 4px; margin-bottom: 16px; flex-wrap: wrap; justify-content: center;">
                    ${m.map(u=>{let v=u.split("/").pop()?.toUpperCase()||u.toUpperCase();return`
                        <button class="btn" style="flex: 1; min-width: 25%; justify-content: center; padding: 6px 4px; font-size: 10px; font-weight: bold; background-color: var(--vscode-button-secondaryBackground); color: var(--vscode-button-secondaryForeground); border-radius: 4px;" onclick="sendCheckoutCommand('${R(u)}', this)" title="Checkout ${R(u)}">
                            ${R(v)}
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

            ${a}
            
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
        </html>`}}});function $t(t){pe=t.secrets}async function Rt(t){if(!pe)throw new Error("SecretStorage is not initialized.");await pe.store("ricwiz.jiraApiToken",t)}async function zt(){if(!pe)throw new Error("SecretStorage is not initialized.");return await pe.get("ricwiz.jiraApiToken")}async function Pt(t){if(!pe)throw new Error("SecretStorage is not initialized.");await pe.store("ricwiz.gitlabApiToken",t)}async function Fe(){if(!pe)throw new Error("SecretStorage is not initialized.");return await pe.get("ricwiz.gitlabApiToken")}var pe,ke=P(()=>{"use strict"});var Te={};Ae(Te,{checkBranchExists:()=>we,checkRemoteBranchExists:()=>Tt,exec:()=>h,extractTicketSuggestion:()=>Ee,getCurrentBranch:()=>j,getWorkspaceCwd:()=>x,normalizeTicketId:()=>Et,promptForTicketId:()=>H,resolvePrefix:()=>Be,ricwizLogger:()=>U});function x(){let t=Se.workspace.workspaceFolders;if(t)return t[0].uri.fsPath}async function j(t){try{let{stdout:e}=await h("git branch --show-current",{cwd:t});return e.trim()}catch{return""}}function Be(t,e){if(!t.includes(e)){let i=t.match(/([A-Z]+-)\d+/i);if(i)return i[1].toUpperCase()}return e}function Ee(t,e,i=!1){let o=t.match(new RegExp(`(${e}\\d+)`,"i"));return o?o[1].toUpperCase():t.includes(e)&&!t.includes("-to-")?t.substring(t.indexOf(e)):i&&t.includes("-to-")?t.substring(t.indexOf(e)).split("-to-")[0]:""}function Et(t,e){let i=t.trim();return/^\d/.test(i)?`${e}${i}`.toUpperCase():i.toUpperCase()}async function H(t,e){let i=Se.workspace.getConfiguration("ricwiz"),o=e?.prefix??i.get("ticketPrefix","SFPSCA-"),s=await j(t),m=Be(s,o),d=e?.suggestedValue??Ee(s,m,e?.handleToSuffix),g=await Se.window.showInputBox({prompt:e?.prompt||"Enter the full ticket ID (e.g., SCPSCA-1234) or just the number",placeHolder:e?.placeHolder||"Ticket ID or number",value:d});return g?{ticketId:Et(g,m),currentBranch:s,prefix:m}:void 0}async function we(t,e){try{return await h(`git show-ref --verify --quiet refs/heads/${e}`,{cwd:t}),!0}catch{}return await Tt(t,e)}async function Tt(t,e){try{let{stdout:i}=await h(`git branch -r --list "*/${e}"`,{cwd:t});return i.trim().length>0}catch{return!1}}var Se,St,Bt,li,U,h,E=P(()=>{"use strict";Se=y(require("vscode")),St=y(require("child_process")),Bt=y(require("util")),li=Bt.promisify(St.exec),U=Se.window.createOutputChannel("Ricwiz"),h=async(t,e)=>{U.appendLine(`[EXEC] ${t}`);let i=await li(t,{maxBuffer:50*1024*1024,...e});return{stdout:i.stdout.toString(),stderr:i.stderr.toString()}}});var lt={};Ae(lt,{WorkflowContext:()=>D});var Ie,Mt,Qe,D,N=P(()=>{"use strict";Ie=y(require("vscode")),Mt=y(require("path")),Qe=y(require("fs")),D=class t{style;upstreamRemote;originRemote;ticketSourceBranch;ticketPrefix;branchPrefix;environments;static baseConfig=Ie.workspace.getConfiguration("ricwiz");activeProfile;profileName;constructor(e){this.activeProfile=e,this.profileName=e?.name;let i=t.baseConfig;this.style=e?.workflowStyle||i.get("workflowStyle","standard"),this.style==="multi-remote"?(this.upstreamRemote=e?.upstreamRemote||i.get("upstreamRemote","salesforce-master"),this.originRemote=e?.originRemote||i.get("originRemote","origin")):(this.upstreamRemote="origin",this.originRemote="origin"),this.ticketSourceBranch=e?.ticketSourceBranch||i.get("ticketSourceBranch","main"),this.ticketPrefix=e?.ticketPrefix||i.get("ticketPrefix","SFPSCA-"),this.branchPrefix=e?.branchPrefix??i.get("branchPrefix","");let o=[{name:"Qual",sourceBranch:"quality"},{name:"Val",sourceBranch:"validation"},{name:"Prod",sourceBranch:"main"}];this.environments=e?.environments||i.get("environments",o)}getConfig(e,i){return this.activeProfile&&this.activeProfile[e]!==void 0?this.activeProfile[e]:t.baseConfig.get(e,i)}static async initialize(e,i){let o=t.baseConfig.get("profiles",[]),s=Mt.join(e,"ricwiz.json");if(Qe.existsSync(s))try{let m=Qe.readFileSync(s,"utf-8"),d=JSON.parse(m);d&&Array.isArray(d.profiles)&&(o=[...o,...d.profiles])}catch(m){Ie.window.showErrorMessage(`Ricwiz: Error parsing ricwiz.json: ${m.message}`)}if(o.length>0){if(!i?.forcePrompt)try{let{exec:l}=(E(),I(Te)),{stdout:a}=await l("git branch --show-current",{cwd:e}),n=a.trim(),r=n;n.includes("-to-")&&(r=n.split("-to-")[0]);let{stdout:c}=await l(`git config branch.${r}.ricwiz-profile`,{cwd:e}),p=c.trim();if(p){let f=o.find(w=>w.name===p);if(f)return new t(f)}}catch{}if(i?.skipPrompt)return new t;let m=o.map(l=>l.name),d=await Ie.window.showQuickPick(m,{placeHolder:"Ricwiz: Select Workflow Profile",ignoreFocusOut:!0});if(!d)return;let g=o.find(l=>l.name===d);return new t(g)}return new t}buildUpstreamPath(e){return e.includes("/")?e:`${this.upstreamRemote}/${e}`}getFetchRemote(e){return e.includes("/")?e.split("/")[0]:this.upstreamRemote}getFetchBranch(e){return e.includes("/")?e.substring(e.indexOf("/")+1):e}}});async function Dt(){let t=x();if(!t){V.window.showErrorMessage("Ricwiz: Open a workspace that is a Git repository.");return}let e=await D.initialize(t,{skipPrompt:!0}),i=e?e.ticketSourceBranch:V.workspace.getConfiguration("ricwiz").get("ticketSourceBranch","main"),o=e?e.originRemote:"origin";await V.window.withProgress({location:V.ProgressLocation.Notification,title:`Ricwiz: Finding deleted files compared to ${o}/${i}...`,cancellable:!1},async()=>{try{let{stdout:s}=await h(`git diff --name-only --diff-filter=D ${o}/${i}...HEAD`,{cwd:t}),m=s.split(`
`).map(p=>p.trim()).filter(p=>p.length>0);if(m.length===0){V.window.showInformationMessage(`Ricwiz: No deleted files found compared to ${o}/${i}.`);return}let d={},g=(p,f)=>{d[p]||(d[p]=[]),d[p].includes(f)||d[p].push(f)};for(let p of m){let f=p.replace(/\\/g,"/");if(f.includes("/classes/")){let w=f.match(/\/classes\/([^/.]+)\.cls/);w&&g("ApexClass",w[1])}else if(f.includes("/triggers/")){let w=f.match(/\/triggers\/([^/.]+)\.trigger/);w&&g("ApexTrigger",w[1])}else if(f.includes("/lwc/")){let w=f.match(/\/lwc\/([^/]+)\//);w&&g("LightningComponentBundle",w[1])}else if(f.includes("/aura/")){let w=f.match(/\/aura\/([^/]+)\//);w&&g("AuraDefinitionBundle",w[1])}else if(f.includes("/objects/")&&f.includes("/fields/")){let w=f.match(/\/objects\/([^/]+)\//),u=f.match(/\/fields\/([^/.]+)\.field/);w&&u&&g("CustomField",`${w[1]}.${u[1]}`)}else if(f.includes("/objects/")){let w=f.match(/\/objects\/([^/.]+)\.object/);w&&g("CustomObject",w[1])}else if(f.includes("/layouts/")){let w=f.match(/\/layouts\/([^/.]+)\.layout/);w&&g("Layout",w[1])}else if(f.includes("/flows/")){let w=f.match(/\/flows\/([^/.]+)\.flow/);w&&g("Flow",w[1])}else if(f.includes("/permissionsets/")){let w=f.match(/\/permissionsets\/([^/.]+)\.permissionset/);w&&g("PermissionSet",w[1])}else if(f.includes("/profiles/")){let w=f.match(/\/profiles\/([^/.]+)\.profile/);w&&g("Profile",w[1])}else if(f.includes("/customMetadata/")){let w=f.match(/\/customMetadata\/([^/.]+)\.md/);w&&g("CustomMetadata",w[1])}else if(f.includes("/flexipages/")){let w=f.match(/\/flexipages\/([^/.]+)\.flexipage/);w&&g("FlexiPage",w[1])}}if(Object.keys(d).length===0){V.window.showInformationMessage("Ricwiz: Found deleted files in Git, but none mapped to recognizable Salesforce metadata.");return}let l=`<?xml version="1.0" encoding="UTF-8"?>
<Package xmlns="http://soap.sforce.com/2006/04/metadata">
`;for(let p of Object.keys(d).sort()){l+=`    <types>
`;for(let f of d[p].sort())l+=`        <members>${f}</members>
`;l+=`        <name>${p}</name>
    </types>
`}l+=`    <version>58.0</version>
</Package>`;let a=Ye.join(t,"destructiveChanges");ve.existsSync(a)||ve.mkdirSync(a);let n=Ye.join(a,"destructiveChanges.xml"),r=Ye.join(a,"package.xml");ve.writeFileSync(n,l,"utf8"),ve.existsSync(r)||ve.writeFileSync(r,`<?xml version="1.0" encoding="UTF-8"?>
<Package xmlns="http://soap.sforce.com/2006/04/metadata">
    <version>58.0</version>
</Package>`,"utf8");let c=await V.workspace.openTextDocument(n);await V.window.showTextDocument(c),V.window.showInformationMessage("Ricwiz: destructiveChanges.xml generated successfully!")}catch(s){V.window.showErrorMessage(`Ricwiz: Error generating destructive changes: ${s.message}`)}})}var V,Ye,ve,Lt=P(()=>{"use strict";V=y(require("vscode")),Ye=y(require("path")),ve=y(require("fs"));E();N()});async function At(){let t=x();if(!t)return;let e=await D.initialize(t,{skipPrompt:!0}),i=e?e.ticketSourceBranch:ce.workspace.getConfiguration("ricwiz").get("ticketSourceBranch","main"),o=e?e.originRemote:"origin";await ce.window.withProgress({location:ce.ProgressLocation.Notification,title:"Ricwiz: Finding Apex Tests to run...",cancellable:!1},async()=>{try{let{stdout:s}=await h(`git diff --name-status ${o}/${i}...HEAD`,{cwd:t}),m=s.split(`
`).map(p=>p.trim()).filter(p=>p.length>0),d=new Set,g=new Set;for(let p of m){let f=p.split(/\s+/);if(f[0].startsWith("D"))continue;let w=f[1];if(w&&w.endsWith(".cls")){let u=w.match(/\/classes\/([^/.]+)\.cls/);if(u){let v=u[1];v.toLowerCase().endsWith("test")?d.add(v):g.add(v)}}}for(let p of g)d.add(`${p}Test`);if(d.size===0){ce.window.showInformationMessage("Ricwiz: No Apex Classes were modified in this branch.");return}let l=Array.from(d).map(p=>({label:`$(beaker) ${p}`,description:"Apex Test Class"})),a=await ce.window.showQuickPick(l,{canPickMany:!0,title:"Select Test Classes to Run",placeHolder:"Select tests..."});if(!a||a.length===0)return;let r=`sf apex run test -n ${a.map(p=>p.label.replace("$(beaker) ","").trim()).join(",")} -r human -w 30`,c=ce.window.createTerminal("Ricwiz: Smart Tests");c.show(),c.sendText(r)}catch(s){ce.window.showErrorMessage(`Ricwiz: Error finding tests: ${s.message}`)}})}var ce,Ft=P(()=>{"use strict";ce=y(require("vscode"));E();N()});var Ce,It=P(()=>{"use strict";Ce=class{static isValidShellArg(e){return e?/^[a-zA-Z0-9\-_/.]+$/.test(e):!1}}});async function Ot(t){let e=x();if(!e){F.window.showErrorMessage("Open a folder or workspace that is a Git repository.");return}let i=await D.initialize(e,{forcePrompt:!0});if(!i)return;let o=typeof t=="string"?t:void 0,s=await H(e,{prefix:i.ticketPrefix,suggestedValue:o});if(!s){F.window.showErrorMessage("Branch creation cancelled: Ticket not provided.");return}let{ticketId:m}=s,d=i.environments,g="all",l=[{label:"Create Main Branch & Environments",description:"Creates the main ticket branch and all environment branches",value:"all"},{label:"Create Main Branch Only",description:"Creates only the main ticket branch (skips environments)",value:"mainOnly"},{label:"Create Environments Only",description:"Creates only the environment branches (skip main branch)",value:"envs"}];if(d.length>0){let c=await F.window.showQuickPick(l,{placeHolder:"Ricwiz: What do you want to create?",ignoreFocusOut:!0});if(!c)return;g=c.value}let a=i.ticketSourceBranch;if(g==="all"||g==="mainOnly"){let c=[];try{let{stdout:u}=await h('git branch --all --format="%(refname:short)"',{cwd:e});c=u.split(`
`).map(v=>v.trim()).filter(v=>v&&v!=="origin"),c=[...new Set(c)]}catch{}let p=F.window.createQuickPick();p.title="Ricwiz: Ticket Source Branch",p.placeholder="Confirm or change the source branch for this ticket",p.value=i.ticketSourceBranch,p.ignoreFocusOut=!0;let f=()=>{let u=p.value.trim(),v=[];u&&v.push({label:u,description:"Use typed branch"}),v.push(...c.map(C=>({label:C}))),p.items=v};p.onDidChangeValue(f),f();let w=await new Promise(u=>{p.onDidAccept(()=>{let v=p.selectedItems[0];u(v?v.label:p.value),p.hide()}),p.onDidHide(()=>u(void 0)),p.show()});if(!w){F.window.showInformationMessage("Branch creation cancelled.");return}a=w.trim()}let n="";if(i.branchPrefix){let c=await F.window.showInputBox({prompt:"Ricwiz: Branch Prefix (leave empty to not use a prefix)",placeHolder:"e.g. CRC-R19-",value:i.branchPrefix,ignoreFocusOut:!0});if(c===void 0){F.window.showInformationMessage("Branch creation cancelled.");return}n=c.trim()}let r=n?`${n}${m}`:m;if(!Ce.isValidShellArg(r)){F.window.showErrorMessage(`Invalid format for ticket ID: ${r}`);return}if(!Ce.isValidShellArg(a)){F.window.showErrorMessage(`Invalid format for ticketSourceBranch in settings: ${a}`);return}for(let c of d){if(!Ce.isValidShellArg(c.name)){F.window.showErrorMessage(`Invalid format for environment name in settings: ${c.name}`);return}if(!Ce.isValidShellArg(c.sourceBranch)){F.window.showErrorMessage(`Invalid format for environment sourceBranch in settings: ${c.sourceBranch}`);return}}try{await h("git status",{cwd:e})}catch{F.window.showErrorMessage("The opened folder does not appear to be a valid Git repository.");return}try{await F.window.withProgress({location:F.ProgressLocation.Notification,title:"Ricwiz: Creating Branches",cancellable:!1},async c=>{let p=[];c.report({message:"Checking remote status (git fetch)...",increment:10});try{await h("git fetch",{cwd:e})}catch{}try{if(g==="all"||g==="mainOnly"){if(c.report({message:`Creating main branch ${r}...`,increment:10}),await we(e,r))F.window.showInformationMessage(`Ricwiz: The branch ${r} already exists. Skipping creation...`),await h(`git checkout ${r}`,{cwd:e});else try{let f=i.getFetchRemote(a),w=i.getFetchBranch(a),u=i.buildUpstreamPath(a);await h(`git fetch ${f} ${w}`,{cwd:e}),await h(`git checkout -b ${r} ${u}`,{cwd:e}),p.push(r)}catch{try{await h(`git checkout -b ${r} ${a}`,{cwd:e}),p.push(r)}catch{throw new Error(`Could not create main branch '${r}' from '${a}'. Does the source branch exist?`)}}try{await h(`git config branch.${r}.ricwiz-source "${a}"`,{cwd:e}),i.profileName&&await h(`git config branch.${r}.ricwiz-profile "${i.profileName}"`,{cwd:e})}catch{}}if(g==="all"||g==="envs"){let f=50/(d.length||1);for(let w of d){let u=n?`${n}${m}-to-${w.name}`:`${m}-to-${w.name}`,v=w.sourceBranch;if(c.report({message:`Processing environment branch ${u}...`,increment:f}),!await we(e,u))try{let C=i.buildUpstreamPath(v);await h(`git checkout -b ${u} ${C}`,{cwd:e}),p.push(u)}catch{try{await h(`git checkout -b ${u} ${v}`,{cwd:e}),p.push(u)}catch{throw new Error(`Could not create environment branch '${u}' from '${v}'. Does the source branch exist?`)}}}}c.report({message:`Publishing branches to ${i.originRemote}...`,increment:10});for(let f of p)try{await h(`git push -u ${i.originRemote} ${f}`,{cwd:e})}catch{F.window.showWarningMessage(`Ricwiz: Branch ${f} was created locally but could not be pushed to ${i.originRemote}.`)}if(g==="all"||g==="mainOnly"){c.report({message:`Switching to ${r}...`,increment:10});try{await h(`git checkout ${r}`,{cwd:e})}catch{}}c.report({increment:100}),F.window.showInformationMessage("Ricwiz: All set! You can start working on your branches! \u{1F680}")}catch(f){if(F.window.showErrorMessage(`Ricwiz Branch Creation Failed: ${f.message}`),p.length>0){try{await h(`git checkout ${a}`,{cwd:e})}catch{}for(let w of p)try{await h(`git branch -D ${w}`,{cwd:e})}catch{}F.window.showWarningMessage(`Ricwiz: Rolled back (deleted) ${p.length} branch(es) locally due to failure.`)}}})}catch(c){F.window.showErrorMessage(`Ricwiz general error: ${c.message}`)}}var F,Ut=P(()=>{"use strict";F=y(require("vscode"));E();It();N()});async function $e(t,e,i,o){o&&o.report({message:"CONFLICT! Resolve & click 'Commit & Continue' in Ricwiz panel."});let s=!1,m=!1,d=async()=>{try{let{stdout:n}=await h("git status --porcelain",{cwd:t});return n.split(`
`).filter(r=>{let c=r.substring(0,2);return["UD","DU","DD","AU","UA"].includes(c)}).map(r=>r.substring(3).trim())}catch{return[]}},g=async()=>{try{let{stdout:n}=await h("git status --porcelain",{cwd:t}),r=c=>c==="UU"?"Both Modified":c==="UD"?"Deleted by them":c==="DU"?"Deleted by us":c==="DD"?"Both Deleted":c==="AA"?"Both Added":c==="AU"?"Added by us":c==="UA"?"Added by them":"Conflicted";return n.split(`
`).map(c=>c.trimRight()).filter(c=>c.length>2).filter(c=>{let p=c.substring(0,2);return["UU","AA","UD","DU","AU","UA","DD"].includes(p)}).map(c=>{let p=c.substring(0,2);return{file:c.substring(3).trim(),state:r(p)}})}catch{return[]}},l=async()=>{if(s)return;let n=await d(),r=await g(),{webviewProvider:c}=(Ze(),I(Ke));c&&c.setConflictState({isConflict:!0,sourceStr:e,targetStr:i,deletionsCount:n.length,files:r})},a=de.commands.registerCommand("ricwiz.conflictAction",async n=>{if(n==="abortDeploy")m=!0;else if(n==="resolveDeletions"){try{let c=(await d()).map(f=>({label:f})),p=await de.window.showQuickPick(c,{canPickMany:!0,placeHolder:"Select conflicted files to DELETE",title:"Ricwiz: Delete Conflicted Files"});if(p&&p.length>0){for(let f of p)try{await h(`git rm --force "${f.label}"`,{cwd:t})}catch{}de.window.showInformationMessage(`Ricwiz: Deleted ${p.length} conflicted file(s).`)}}catch(r){de.window.showErrorMessage(`Ricwiz: Error. (${r.message})`)}l()}else if(n==="commitAndContinue")try{let c=(await d()).filter(f=>jt.existsSync(Nt.join(t,f)));if(c.length>0&&await de.window.showWarningMessage(`Wait! There are ${c.length} file(s) with deletion conflicts that are still on your disk.

If you commit now, you will KEEP them in the project.

Are you sure you want to KEEP them?`,{modal:!0},"Yes, KEEP them","No, let me DELETE them")!=="Yes, KEEP them"){l();return}let p=!1;try{let{stdout:f}=await h('git grep -E "^<<<<<<< "',{cwd:t});f.trim().length>0&&(p=!0)}catch{}if(p){de.window.showErrorMessage("Ricwiz: You still have unresolved conflict markers (<<<<<<<) in your files. Please resolve them first!"),l();return}await h("git add .",{cwd:t}),await h("git commit --no-edit",{cwd:t})}catch(r){de.window.showErrorMessage(`Ricwiz: Could not commit automatically. (${r.message})`),l()}});for(l();;){if(m){s=!0,a.dispose(),(Ze(),I(Ke)).webviewProvider?.setConflictState(null);try{await h("git merge --abort",{cwd:t})}catch{}return!1}try{let{stdout:n}=await h("git status --porcelain",{cwd:t});if(n.trim().length===0)return s=!0,a.dispose(),(Ze(),I(Ke)).webviewProvider?.setConflictState(null),de.window.showInformationMessage("Ricwiz: Changes committed!"),!0}catch{}await new Promise(n=>setTimeout(n,2e3))}}var de,jt,Nt,Xe=P(()=>{"use strict";de=y(require("vscode")),jt=y(require("fs")),Nt=y(require("path"));E()});var nt={};Ae(nt,{fetchMergeRequestStatus:()=>it,hasGitlabToken:()=>ot,ricwizLogger:()=>J});async function ot(){let t=await Fe();return!!(t&&t.trim())}async function mi(t,e){let i=tt.workspace.getConfiguration("ricwiz"),o=(await Fe())?.trim();if(!o)throw new Error("No GitLab token");let s=e?e.getConfig("gitlabUrlOverride",""):i.get("gitlabUrlOverride",""),m=[];if(s&&s.trim()!=="")m.push(s.trim());else try{let{stdout:g}=await h("git remote",{cwd:t}),l=g.split(`
`).map(n=>n.trim()).filter(n=>n),a=[];e&&e.upstreamRemote&&l.includes(e.upstreamRemote)&&a.push(e.upstreamRemote),e&&e.originRemote&&e.originRemote!==e.upstreamRemote&&l.includes(e.originRemote)&&a.push(e.originRemote),l.includes("upstream")&&!a.includes("upstream")&&a.push("upstream"),l.includes("origin")&&!a.includes("origin")&&a.push("origin"),a.length===0&&l.length>0&&a.push(...l);for(let n of a)try{let{stdout:r}=await h(`git remote get-url ${n}`,{cwd:t}),c=r.trim();c.endsWith(".git")&&(c=c.slice(0,-4)),c.startsWith("git@")&&(c=c.replace("git@","").replace(":","/"),c=`https://${c}`),m.push(c)}catch(r){J.appendLine(`[GitLab API] Error getting remote URL for ${n}: ${r.message}`)}}catch(g){J.appendLine(`[GitLab API] Error getting remotes: ${g.message}`)}if(m.length===0)throw J.appendLine("[GitLab API] No candidate URLs found in getGitlabTargets!"),new Error("Could not get any remote origin URL.");return m.map(g=>{let l=new URL(g),a=`${l.protocol}//${l.host}`,n=l.pathname;n.startsWith("/")&&(n=n.substring(1)),n.endsWith("/")&&(n=n.slice(0,-1)),n.endsWith(".git")&&(n=n.slice(0,-4));let r=encodeURIComponent(n);return{baseUrl:a,token:o,projectPath:r}})}async function mt(t,e,i,o,s){let m=new URL(`${e}${s}`);return J.appendLine(`[GitLab API] ${o} ${m.toString()}`),new Promise((d,g)=>{let l=et.request(m,{method:o,timeout:5e3,agent:pi,headers:{"PRIVATE-TOKEN":i,Accept:"application/json"}},a=>{let n="";a.on("data",r=>n+=r),a.on("end",()=>{if(J.appendLine(`[GitLab API] Response Code: ${a.statusCode}`),a.statusCode&&a.statusCode>=400)return J.appendLine(`[GitLab API] Error Data: ${n}`),g(new Error(`GitLab API error: ${a.statusCode}`));if(!n)return d({});try{let r=JSON.parse(n);Array.isArray(r)?J.appendLine(`[GitLab API] Returned array with ${r.length} items`):r&&typeof r=="object"&&J.appendLine(`[GitLab API] Returned object with id ${r.id||r.iid||"unknown"}`),d(r)}catch(r){J.appendLine(`[GitLab API] Parse Error: ${r.message}`),g(r)}})});l.on("timeout",()=>{l.destroy(),g(new Error("GitLab request timed out"))}),l.on("error",a=>{J.appendLine(`[GitLab API] Request Failed: ${a.message}`),g(a)}),l.end()})}async function it(t,e,i,o){J.appendLine(`[GitLab API] fetchMergeRequestStatus called for source: ${e}, target: ${i||"any"}`);let s=`${t}:${e}:${i||"any"}`,m=pt.get(s);if(m&&Date.now()-m.timestamp<ui)return m.data;try{let d=await mi(t,o),g=null,l=-1;for(let a of d)try{let n=`/api/v4/projects/${a.projectPath}/merge_requests?source_branch=${encodeURIComponent(e)}&order_by=updated_at&sort=desc`;i&&(n+=`&target_branch=${encodeURIComponent(i)}`);let r=await mt(t,a.baseUrl,a.token,"GET",n);if(r&&r.length>0){let c=r[0];try{let u=await mt(t,a.baseUrl,a.token,"GET",`/api/v4/projects/${a.projectPath}/merge_requests/${c.iid}`);u&&(c=u)}catch{}let p="none";if(c.head_pipeline&&c.head_pipeline.status){let u=c.head_pipeline.status;u==="success"||u==="failed"||u==="canceled"||u==="skipped"?p=u:p="running"}let f={isMerged:c.state==="merged",isOpen:c.state==="opened",pipelineStatus:p,webUrl:c.web_url,projectPath:a.projectPath,pipelineId:c.head_pipeline?c.head_pipeline.id:void 0},w=0;f.isOpen?w=2:f.isMerged&&(w=1),w>l&&(g=f,l=w)}}catch(n){J.appendLine(`[GitLab API] Error inside target loop: ${n.message}`)}if(g)return pt.set(s,{data:g,timestamp:Date.now()}),g;for(let a of d)try{let n=`/api/v4/projects/${a.projectPath}/pipelines?ref=${encodeURIComponent(e)}&order_by=updated_at&sort=desc`,r=await mt(t,a.baseUrl,a.token,"GET",n);if(r&&r.length>0){let c=r[0],p="none";if(c.status){let w=c.status;w==="success"||w==="failed"||w==="canceled"||w==="skipped"?p=w:p="running"}let f={isMerged:!1,isOpen:!1,pipelineStatus:p,webUrl:c.web_url,projectPath:a.projectPath,pipelineId:c.id};return pt.set(s,{data:f,timestamp:Date.now()}),f}}catch{}return null}catch(d){return J.appendLine(`[GitLab API] Failed to fetch MR status: ${d.message}`),null}}var et,tt,J,pi,pt,ui,Oe=P(()=>{"use strict";et=y(require("https")),tt=y(require("vscode"));ke();E();J=tt.window.createOutputChannel("Ricwiz Debug"),pi=new et.Agent({keepAlive:!0,maxSockets:10});pt=new Map,ui=30*1e3});var be={};Ae(be,{findRelatedBranches:()=>wt,getCurrentBranchMergeStatus:()=>gt,getRecentCommits:()=>ft,getRecentTickets:()=>ht,getRelatedBranchesStatus:()=>ut,resolveExistingBranchName:()=>gi});function Wt(t,e){return e.find(i=>t.endsWith(`-to-${i.name}`))}async function ut(t,e,i,o,s){let m=await ot(),d=[];for(let g of e){let l=Wt(g,o);if(m){let a=l?l.sourceBranch:void 0,n=await it(t,g,a,s);if(n){d.push({name:g,isMerged:n.isMerged,pipelineStatus:n.pipelineStatus,mrUrl:n.webUrl,projectPath:n.projectPath,pipelineId:n.pipelineId});continue}}else{let{ricwizLogger:a}=(Oe(),I(nt));a.appendLine(`[GitLab API] Skipping MR check for ${g} because hasGitlabToken() is false`)}d.push({name:g,isMerged:!1,pipelineStatus:"none"})}return d}async function gt(t,e,i,o){let s=Wt(e,i);if(!s)return!1;if(await ot()){let m=await it(t,e,s.sourceBranch,o);if(m)return m.isMerged}else{let{ricwizLogger:m}=(Oe(),I(nt));m.appendLine(`[GitLab API] Skipping MR check for current branch ${e} because hasGitlabToken() is false`)}return!1}async function ft(t,e=10){try{let{stdout:i}=await h(`git log --oneline -${e} --format="%h|||%s|||%ar"`,{cwd:t});return i.split(`
`).filter(o=>o.trim()).map(o=>{let s=o.split("|||");return{hash:s[0]||"",message:s.length>=3?s.slice(1,-1).join("|||"):s[1]||"",timeAgo:s.length>=3?s[s.length-1]:""}})}catch{return[]}}async function ht(t,e=3){try{let{stdout:i}=await h('git for-each-ref --sort=-committerdate --format="%(refname:short)" refs/heads/',{cwd:t}),o=i.split(`
`).map(m=>m.trim()).filter(m=>m),s=/^[A-Z]+-\d+$/i;return o.filter(m=>s.test(m)).slice(0,e)}catch{return[]}}async function wt(t,e,i){let{stdout:o}=await h(`git branch --all --list "*${e}*"`,{cwd:t}),s=new Set,m=new RegExp(`${e}(?!\\d)`,"i");return o.split(`
`).forEach(d=>{let g=d.replace("*","").trim();if(g){if(g.startsWith("remotes/")){let l=g.split("/");l.length>2&&(g=l.slice(2).join("/"))}g&&g!==i&&!g.includes("HEAD")&&m.test(g)&&s.add(g)}}),Array.from(s)}async function gi(t,e,i){try{let o=require("child_process"),m=require("util").promisify(o.exec),{stdout:d}=await m(`git branch --all --list "*${e}*"`,{cwd:t}),g=new RegExp(`${e}(?!\\d)`,"i"),l=d.split(`
`).map(n=>n.replace("*","").trim().replace(/^remotes\/[^\/]+\//,"")).filter(n=>n&&!n.includes("HEAD")&&g.test(n)),a=Array.from(new Set(l));if(i){let n=`-to-${i}`,r=a.find(c=>c.endsWith(n));return r||`${e}${n}`}else{let n=a.find(r=>!r.includes("-to-"));return n||e}}catch{return i?`${e}-to-${i}`:e}}var ue=P(()=>{"use strict";E();Oe()});async function Jt(){let t=x();if(!t){q.window.showErrorMessage("Ricwiz: Open a folder or workspace that is a Git repository.");return}try{await h("git status",{cwd:t})}catch{q.window.showErrorMessage("Ricwiz: The opened folder does not appear to be a valid Git repository.");return}let e=await D.initialize(t);if(!e)return;let i=e.environments,o=await H(t,{prefix:e.ticketPrefix});if(!o){q.window.showErrorMessage("Operation cancelled: Ticket not provided.");return}let{ticketId:s,currentBranch:m}=o,{resolveExistingBranchName:d}=(ue(),I(be)),g=await d(t,s);if(!await we(t,g)){q.window.showErrorMessage(`Ricwiz: Main branch '${g}' does not exist! Prepare deploy is only available when a main ticket branch is used.`);return}let l=e.getConfig("defaultReviewers",""),a="";try{let{stdout:n}=await h(`git config branch.${s}.ricwiz-reviewers`,{cwd:t});a=n.trim()}catch{}if(l.trim()){let n=await q.window.showInputBox({prompt:"Ricwiz: Reviewers for this deploy (optional, comma-separated)",placeHolder:"e.g. @joao, 123456",value:a||l,ignoreFocusOut:!0});if(n===void 0)return;try{n.trim()?await h(`git config branch.${s}.ricwiz-reviewers "${n.trim()}"`,{cwd:t}):a&&await h(`git config --unset branch.${s}.ricwiz-reviewers`,{cwd:t})}catch{}}await q.window.withProgress({location:q.ProgressLocation.Notification,title:"Ricwiz: Preparing Deploy",cancellable:!0},async(n,r)=>{let c=0,p=m,f=!1;r.onCancellationRequested(()=>{f=!0}),n.report({message:"Syncing remote information...",increment:10});try{await h("git fetch --all",{cwd:t});let u=10/(i.length||1);for(let v of i)try{if(f)throw new Error("Aborted");n.report({message:`Fetching ${v.sourceBranch}...`,increment:u});let C=e.getFetchRemote(v.sourceBranch),k=e.getFetchBranch(v.sourceBranch);await h(`git fetch ${C} ${k}:${k}`,{cwd:t})}catch{}}catch{}let w=60/(i.length||1);for(let u of i){if(f)break;let v=await d(t,s,u.name),C=u.sourceBranch;try{n.report({message:`Processing ${v}...`,increment:w/4}),await h(`git checkout ${v}`,{cwd:t});try{await h(`git pull ${e.originRemote} ${v}`,{cwd:t})}catch{}let k=async z=>{try{await h(`git merge ${z}`,{cwd:t})}catch(L){let oe=!1;try{let{stdout:me}=await h("git ls-files -u",{cwd:t});me.trim().length>0&&(oe=!0)}catch{}let Y=((L.stdout||"")+(L.stderr||"")+(L.message||"")).toLowerCase();if(oe||Y.includes("conflict")||Y.includes("conflit")){if(!await $e(t,z,v,n))throw f=!0,new Error("Deploy aborted by user.")}else throw L}};n.report({message:`Merging ${C} into ${v}...`,increment:w/4});let S=e.getFetchRemote(C),T=e.getFetchBranch(C),B=e.buildUpstreamPath(C);if(await h(`git fetch ${S} ${T}`,{cwd:t}),await k(B),n.report({message:`Merging ${g} into ${v}...`,increment:w/4}),await k(g),f)break;n.report({message:`Pushing ${v}...`,increment:w/4}),await h(`git push ${e.originRemote} ${v}`,{cwd:t}),c++}catch(k){k.message.includes("aborted")?q.window.showInformationMessage("Ricwiz: Deploy cancelled."):q.window.showErrorMessage(`Ricwiz: Failed to process branch ${v}. Detail: ${k.message}`);return}}if(!f){n.report({message:"Finishing up...",increment:10});let u=p;try{await h(`git show-ref --verify --quiet refs/heads/${g}`,{cwd:t}),u=g}catch{}try{let v=await j(t);u&&u!==v?(await h(`git checkout ${u}`,{cwd:t}),q.window.showInformationMessage(`Ricwiz: Operation complete. Back on branch ${u}.`)):q.window.showInformationMessage("Ricwiz: Operation complete.")}catch{q.window.showInformationMessage("Ricwiz: Operation complete.")}}})}var q,qt=P(()=>{"use strict";q=y(require("vscode"));E();Xe();N()});async function Gt(t=!1){let e=x();if(!e)return;let i=await D.initialize(e);if(!i)return;let o=await H(e,{prompt:"Enter the full ticket ID for the Merge Requests (e.g., SCPSCA-1234) or just the number"});if(!o)return;let{ticketId:s}=o,m=i.getConfig("gitlabUrlOverride",""),d="";if(m&&m.trim()!=="")d=m.trim().replace(/\/+$/,"");else{let n="";try{let r=i.upstreamRemote||"origin",{stdout:c}=await h(`git remote get-url ${r}`,{cwd:e});n=c.trim()}catch{ge.window.showErrorMessage("Ricwiz: Could not get the remote origin URL. Please configure the URL manually in the extension settings.");return}d=n,d.endsWith(".git")&&(d=d.slice(0,-4)),d.startsWith("git@")&&(d=d.replace("git@","").replace(":","/"),d=`https://${d}`)}let g=[],l=i.ticketSourceBranch;try{let{stdout:n}=await h(`git config branch.${s}.ricwiz-source`,{cwd:e});n.trim()&&(l=n.trim())}catch{}let{resolveExistingBranchName:a}=(ue(),I(be));if(i.environments.length===0){let n=await a(e,s);g.push({source:n,target:l})}else for(let n of i.environments){let r=await a(e,s,n.name);g.push({source:r,target:n.sourceBranch})}for(let n of g){let r=`${d}/-/merge_requests/new?merge_request[source_branch]=${n.source}&merge_request[target_branch]=${n.target}`;t?ge.commands.executeCommand("simpleBrowser.show",r):ge.env.openExternal(ge.Uri.parse(r))}ge.window.showInformationMessage(`Ricwiz: Opening ${t?"VS Code browser":"external browser"} for Merge Requests!`)}async function Ht(){return Gt(!1)}async function Vt(){return Gt(!0)}var ge,_t=P(()=>{"use strict";ge=y(require("vscode"));E();N()});async function Qt(t=!1){let e=x();if(!e)return;let i=ie.workspace.getConfiguration("ricwiz"),o=i.get("jiraUrl","");if(!o||o.trim()===""){ie.window.showErrorMessage("Ricwiz: Jira URL is not configured. Please set it in the extension settings (e.g., https://jira.company.com/browse/).");return}let{getCurrentBranch:s,resolvePrefix:m,extractTicketSuggestion:d}=(E(),I(Te)),g=await s(e),l=i.get("ticketPrefix","SFPSCA-"),a=m(g,l),r=d(g,a,!0);if(r){let{normalizeTicketId:p}=(E(),I(Te));r=p(r,a)}else{let p=await H(e,{prompt:"Ricwiz could not detect the ticket from the branch name. Enter Jira ticket ID (e.g. SFPSCA-1234)",handleToSuffix:!0});if(!p)return;r=p.ticketId}let c=o.trim();c.endsWith("/")||(c+="/"),c+=r,t?ie.commands.executeCommand("simpleBrowser.show",c):ie.env.openExternal(ie.Uri.parse(c)),ie.window.showInformationMessage(`Ricwiz: Opening Jira Ticket ${r} in ${t?"VS Code":"browser"}!`)}async function Yt(){return Qt(!1)}async function Kt(){return Qt(!0)}var ie,Zt=P(()=>{"use strict";ie=y(require("vscode"));E()});async function to(){let t=eo.workspace.getConfiguration("ricwiz"),e=t.get("jiraUrl",""),i=t.get("jiraEmail","")?.trim(),o=(await zt())?.trim();if(!e||!o)throw new Error('Jira API Token is not securely configured. Please run the "Ricwiz: Set Secure Jira API Token" command.');let s=e;s.includes("/browse")&&(s=s.split("/browse")[0]),s.endsWith("/")&&(s=s.slice(0,-1));let m=i?`Basic ${Buffer.from(`${i}:${o}`).toString("base64")}`:`Bearer ${o}`;return{baseUrl:s,headerAuth:m}}async function Me(t,e,i){let{baseUrl:o,headerAuth:s}=await to(),m=new URL(`${o}${e}`);return new Promise((d,g)=>{let l=Xt.request(m,{method:t,headers:{Authorization:s,Accept:"application/json",...i?{"Content-Type":"application/json"}:{}}},a=>{let n="";a.on("data",r=>n+=r),a.on("end",()=>{if(a.statusCode===401||a.statusCode===403)return g(new Error(`Authentication failed (HTTP ${a.statusCode}). Please check your Jira settings.`));if(a.statusCode&&a.statusCode>=400){let r="";try{let c=JSON.parse(n);c.errorMessages&&c.errorMessages.length>0&&(r=c.errorMessages.join(", "))}catch{}return a.statusCode===404||a.statusCode===410?g(new Error(`Ticket not found or deleted (HTTP ${a.statusCode}). ${r}`)):g(new Error(`Jira API returned HTTP status ${a.statusCode}. ${r}`))}if(!n)return d({});try{let r=JSON.parse(n);d(r)}catch{g(new Error("Failed to parse Jira response."))}})});l.on("error",a=>g(new Error(`Network error: ${a.message}`))),i&&l.write(JSON.stringify(i)),l.end()})}async function De(t){let{baseUrl:e}=await to(),i=await Me("GET",`/rest/api/2/issue/${t}`);return i&&i.fields?{summary:i.fields.summary||"",description:i.fields.description||"No description provided.",status:i.fields.status?.name||"Unknown",url:`${e}/browse/${t}`}:null}async function oo(t){let e=await Me("GET",`/rest/api/2/issue/${t}/transitions`);return e&&e.transitions?e.transitions.map(i=>({id:i.id,name:i.name})):[]}async function io(t,e){await Me("POST",`/rest/api/2/issue/${t}/transitions`,{transition:{id:e}})}async function no(t,e){await Me("POST",`/rest/api/2/issue/${t}/comment`,{body:e})}async function ro(t,e){await Me("PUT",`/rest/api/2/issue/${t}`,{update:{labels:[{add:e}]}})}async function so(t){let e=await Me("POST","/rest/api/3/search/jql",{jql:t,maxResults:50,fields:["summary","status","assignee"]});return e&&e.issues?e.issues.map(i=>({key:i.key,summary:i.fields?.summary||"No Title",status:i.fields?.status?.name||"Unknown",assignee:i.fields?.assignee?.displayName||"Unassigned"})):[]}var Xt,eo,Ue=P(()=>{"use strict";Xt=y(require("https")),eo=y(require("vscode"));ke()});async function ao(t){let e=x();if(e)try{let i=await D.initialize(e);if(!i)return;let o=await j(e),s=Be(o,i.ticketPrefix),m=Ee(o,s,!0);if(m||(m=o.split("-to-")[0]),!m){K.window.showErrorMessage("Ricwiz: You are not currently on a valid ticket branch.");return}await K.window.withProgress({location:K.ProgressLocation.Notification,title:`Fetching details for ${m}...`,cancellable:!1},async d=>{let g=await De(m);if(g){let l=[];try{let{findRelatedBranches:a,getRelatedBranchesStatus:n}=(ue(),I(be)),r=K.workspace.getConfiguration("ricwiz").get("environments",[{name:"Qual",sourceBranch:"quality"},{name:"Val",sourceBranch:"validation"},{name:"Prod",sourceBranch:"main"}]),c=await a(e,m,"");l=await n(e,c,m,r,i)}catch{}t.setJiraData({ticketId:m,relatedBranches:l,...g}),t.setPage("jira")}else K.window.showErrorMessage("Ricwiz: No data found for this ticket.")})}catch(i){i.message.includes("securely configured")?await K.window.showErrorMessage(i.message,"Set Token Now")==="Set Token Now"&&K.commands.executeCommand("ricwiz.setJiraToken"):K.window.showErrorMessage(`Ricwiz Jira Error: ${i.message}`)}}var K,co=P(()=>{"use strict";K=y(require("vscode"));E();N();Ue()});async function lo(t,e){let o=ne.workspace.getConfiguration("ricwiz").get("jiraDashboards",[]);if(e!==void 0&&(Re=e),!o||o.length===0){t.setDashboardData({queries:[],selectedIndex:0,results:[],error:"No queries defined in settings. Go to Settings > Ricwiz > Jira Dashboards."}),t.setPage("dashboard");return}Re>=o.length&&(Re=0);let s=o[Re];t.setDashboardData({queries:o,selectedIndex:Re,results:[],error:"\u23F3 Loading tickets..."}),t.setPage("dashboard");try{let m=await so(s.jql),d=ne.workspace.workspaceFolders?.[0]?.uri.fsPath,g=[],l=t.getDashboardShowBranches();if(d)try{let n=require("child_process"),c=require("util").promisify(n.exec),{stdout:p}=await c("git branch",{cwd:d});g=p.split(`
`).map(f=>f.replace("*","").trim()).filter(f=>f)}catch{}let a=[];if(l&&d)try{let{findRelatedBranches:n,getRelatedBranchesStatus:r}=(ue(),I(be)),{WorkflowContext:c}=(N(),I(lt)),p=await c.initialize(d,{skipPrompt:!0}),f=p?.environments||ne.workspace.getConfiguration("ricwiz").get("environments",[{name:"Qual",sourceBranch:"quality"},{name:"Val",sourceBranch:"validation"},{name:"Prod",sourceBranch:"main"}]);a=await Promise.all(m.map(async w=>{let u=await n(d,w.key,""),v=await r(d,u,w.key,f,p);return{...w,detailedBranches:v}}))}catch{a=m}else a=m.map(n=>{let r=g.find(c=>c.includes(n.key));return{...n,branch:r||null}});t.setDashboardData({queries:o,selectedIndex:Re,results:a,error:null}),t.setPage("dashboard")}catch(m){let d=m.message;(d.includes("ENOTFOUND")||d.includes("network"))&&(d="No Internet or Invalid URL"),t.setDashboardData({queries:o,selectedIndex:Re,results:[],error:d}),t.setPage("dashboard")}}async function mo(t,e){await ne.window.withProgress({location:ne.ProgressLocation.Notification,title:`Fetching details for ${e}...`,cancellable:!1},async()=>{try{let i=await De(e);if(i){let o=[],s=x();if(s)try{let{WorkflowContext:m}=(N(),I(lt)),d=await m.initialize(s,{skipPrompt:!0}),{findRelatedBranches:g,getRelatedBranchesStatus:l}=(ue(),I(be)),a=ne.workspace.getConfiguration("ricwiz").get("environments",[{name:"Qual",sourceBranch:"quality"},{name:"Val",sourceBranch:"validation"},{name:"Prod",sourceBranch:"main"}]),n=await g(s,e,"");o=await l(s,n,e,a,d)}catch{}t.setJiraData({ticketId:e,relatedBranches:o,...i}),t.setPage("jira")}else ne.window.showErrorMessage(`Ricwiz: No data found for ticket ${e}.`)}catch(i){ne.window.showErrorMessage(`Ricwiz Jira Error: ${i.message}`)}})}var ne,Re,po=P(()=>{"use strict";ne=y(require("vscode"));Ue();E();Re=0});async function vt(){let t=x();if(!t)return;let e=await D.initialize(t,{forcePrompt:!1});if(!e)return;let i=await j(t);if(!i)return;let o=Be(i,e.ticketPrefix),s=Ee(i,o,!0);return s||i.split("-to-")[0]}async function uo(){try{let t=await vt();if(!t){M.window.showErrorMessage("Ricwiz: You are not on a valid ticket branch.");return}let e=await M.window.withProgress({location:M.ProgressLocation.Notification,title:`Fetching available status for ${t}...`,cancellable:!1},()=>oo(t));if(!e||e.length===0){M.window.showInformationMessage(`Ricwiz: No transitions available for ${t}.`);return}let i=e.map(s=>({label:s.name,id:s.id})),o=await M.window.showQuickPick(i,{placeHolder:`Select new status for ${t}`,ignoreFocusOut:!0});o&&(await M.window.withProgress({location:M.ProgressLocation.Notification,title:`Updating status to ${o.label}...`,cancellable:!1},()=>io(t,o.id)),M.window.showInformationMessage(`Ricwiz: Status for ${t} updated to ${o.label}.`))}catch(t){t.message.includes("securely configured")?M.window.showErrorMessage(t.message,"Set Token Now").then(e=>{e==="Set Token Now"&&M.commands.executeCommand("ricwiz.setJiraToken")}):M.window.showErrorMessage(`Ricwiz Jira Error: ${t.message}`)}}async function go(){try{let t=await vt();if(!t){M.window.showErrorMessage("Ricwiz: You are not on a valid ticket branch.");return}let e=await M.window.showInputBox({prompt:`Add comment to ${t}`,placeHolder:"Type your comment here...",ignoreFocusOut:!0});e&&(await M.window.withProgress({location:M.ProgressLocation.Notification,title:`Adding comment to ${t}...`,cancellable:!1},()=>no(t,e)),M.window.showInformationMessage(`Ricwiz: Comment added to ${t}.`))}catch(t){t.message.includes("securely configured")?M.window.showErrorMessage(t.message,"Set Token Now").then(e=>{e==="Set Token Now"&&M.commands.executeCommand("ricwiz.setJiraToken")}):M.window.showErrorMessage(`Ricwiz Jira Error: ${t.message}`)}}async function fo(){try{let t=await vt();if(!t){M.window.showErrorMessage("Ricwiz: You are not on a valid ticket branch.");return}let e=await M.window.showInputBox({prompt:`Add a label to ${t}`,placeHolder:"e.g. Needs-Review, Bug, High-Priority",ignoreFocusOut:!0});e&&e.trim()&&(await M.window.withProgress({location:M.ProgressLocation.Notification,title:`Adding label to ${t}...`,cancellable:!1},()=>ro(t,e.trim())),M.window.showInformationMessage(`Ricwiz: Label '${e.trim()}' added to ${t}.`))}catch(t){t.message.includes("securely configured")?M.window.showErrorMessage(t.message,"Set Token Now").then(e=>{e==="Set Token Now"&&M.commands.executeCommand("ricwiz.setJiraToken")}):M.window.showErrorMessage(`Ricwiz Jira Error: ${t.message}`)}}async function ho(){let t=await M.window.showInputBox({prompt:"Enter your Jira API Token (or Personal Access Token). It will be securely stored in your OS keychain.",password:!0,ignoreFocusOut:!0});if(t)try{await Rt(t.trim()),M.window.showInformationMessage("Ricwiz: Jira API Token securely stored!")}catch(e){M.window.showErrorMessage(`Ricwiz: Failed to store token: ${e.message}`)}}var M,wo=P(()=>{"use strict";M=y(require("vscode"));E();N();Ue();ke()});async function vo(){let t=await _.window.showInputBox({prompt:"Enter your GitLab Personal Access Token",placeHolder:"glpat-xxxxxxxxxxxxxxxxxxxx",ignoreFocusOut:!0,password:!0});if(t&&t.trim()){let e=t.trim();await _.window.withProgress({location:_.ProgressLocation.Notification,title:"Ricwiz: Validating GitLab Token...",cancellable:!1},async()=>{try{let o=_.workspace.getConfiguration("ricwiz").get("gitlabUrlOverride","").trim();if(!o&&_.workspace.workspaceFolders)try{let{exec:l}=(E(),I(Te)),a=_.workspace.workspaceFolders[0].uri.fsPath,{stdout:n}=await l("git remote get-url origin",{cwd:a}),r=n.trim();r.startsWith("git@")&&(r=`https://${r.replace("git@","").replace(":","/")}`),r.endsWith(".git")&&(r=r.slice(0,-4)),o=r}catch{}o||(o="https://gitlab.com");let s=new URL(o),m=`${s.protocol}//${s.host}`,d=require("https"),g=await new Promise((l,a)=>{let n=d.request(new URL(`${m}/api/v4/user`),{method:"GET",timeout:5e3,headers:{"PRIVATE-TOKEN":e,Accept:"application/json"}},r=>{if(r.statusCode>=400)return a(new Error(`Status ${r.statusCode}`));let c="";r.on("data",p=>c+=p),r.on("end",()=>l(JSON.parse(c||"{}")))});n.on("error",a),n.on("timeout",()=>{n.destroy(),a(new Error("Timeout"))}),n.end()});await Pt(e),_.window.showInformationMessage(`Ricwiz: \u2705 GitLab API Token saved and validated successfully for ${g.username||"user"}!`),_.commands.executeCommand("ricwiz.manualRefresh")}catch(i){_.window.showErrorMessage(`Ricwiz: \u274C Invalid token or cannot reach GitLab (${i.message}). Please check the token and try again.`)}})}}var _,bo=P(()=>{"use strict";_=y(require("vscode"));ke()});async function yo(){let t=x();if(!t){fe.window.showErrorMessage("Ricwiz: Open a folder or workspace that is a Git repository.");return}let e=await D.initialize(t);if(!e)return;let i=await H(t,{prefix:e.ticketPrefix,prompt:"Enter the full ticket ID to sync all branches for (e.g., SCPSCA-1234) or just the number"});if(!i)return;let{ticketId:o,currentBranch:s}=i;await fe.window.withProgress({location:fe.ProgressLocation.Notification,title:`Ricwiz: Syncing all branches for ${o}...`,cancellable:!1},async m=>{try{m.report({message:"Fetching from remote..."});try{await h("git fetch --all",{cwd:t})}catch{}let{stdout:d}=await h(`git branch --list "*${o}*"`,{cwd:t}),g=new RegExp(`${o}(?!\\d)`,"i"),l=d.split(`
`).map(r=>r.replace("*","").trim()).filter(r=>r.length>0&&g.test(r));if(l.length===0){fe.window.showWarningMessage(`Ricwiz: No local branches found for ${o}.`);return}let a=0,n=0;for(let r of l)if(m.report({message:`Syncing ${r}...`}),r===s)try{await h(`git pull ${e.originRemote} ${r}`,{cwd:t}),a++}catch(c){let p=!1;try{let{stdout:w}=await h("git ls-files -u",{cwd:t});w.trim().length>0&&(p=!0)}catch{}let f=((c.stdout||"")+(c.stderr||"")+(c.message||"")).toLowerCase();(p||f.includes("conflict")||f.includes("conflit"))&&await $e(t,`${e.originRemote}/${r}`,r,m)?a++:n++}else try{await h(`git fetch ${e.originRemote} ${r}:${r}`,{cwd:t}),a++}catch{try{await h(`git checkout ${r}`,{cwd:t});try{await h(`git pull ${e.originRemote} ${r}`,{cwd:t}),a++}catch(p){let f=!1;try{let{stdout:u}=await h("git ls-files -u",{cwd:t});u.trim().length>0&&(f=!0)}catch{}let w=((p.stdout||"")+(p.stderr||"")+(p.message||"")).toLowerCase();(f||w.includes("conflict")||w.includes("conflit"))&&await $e(t,`${e.originRemote}/${r}`,r,m)?a++:n++}await h(`git checkout ${s}`,{cwd:t})}catch{try{await h(`git checkout ${s}`,{cwd:t})}catch{}n++}}n>0?fe.window.showWarningMessage(`Ricwiz: Synced ${a}/${l.length} branches. ${n} branch(es) could not be synced (possible conflicts or diverged history).`):fe.window.showInformationMessage(`Ricwiz: \u{1F504} All ${a} branches for ${o} are up to date!`)}catch(d){fe.window.showErrorMessage(`Ricwiz: Sync failed: ${d.message}`)}})}var fe,xo=P(()=>{"use strict";fe=y(require("vscode"));E();Xe();N()});async function ko(){let t=x();if(!t){he.window.showErrorMessage("Ricwiz: Open a folder or workspace that is a Git repository.");return}try{await h("git status",{cwd:t})}catch{he.window.showErrorMessage("Ricwiz: The opened folder does not appear to be a valid Git repository.");return}let e=await D.initialize(t);if(!e)return;let i=e.environments,o=await H(t,{prefix:e.ticketPrefix});if(!o)return;let{ticketId:s,currentBranch:m}=o;await he.window.withProgress({location:he.ProgressLocation.Notification,title:"Ricwiz: Updating environment branches from their bases",cancellable:!0},async(d,g)=>{let l=0,a=m,n=!1;g.onCancellationRequested(()=>{n=!0}),d.report({message:"Syncing remote information...",increment:10});try{await h("git fetch --all",{cwd:t})}catch{}let r=80/(i.length||1);for(let c of i){if(n)break;let{resolveExistingBranchName:p}=(ue(),I(be)),f=await p(t,s,c.name),w=c.sourceBranch;if(await we(t,f))try{d.report({message:`Processing ${f}...`,increment:r/2}),await h(`git checkout ${f}`,{cwd:t});try{d.report({message:`Merging ${w} into ${f}...`,increment:r/2});let u=e.getFetchRemote(w),v=e.getFetchBranch(w),C=e.buildUpstreamPath(w);await h(`git fetch ${u} ${v}`,{cwd:t}),await h(`git merge ${C}`,{cwd:t})}catch(u){let v=!1;try{let{stdout:k}=await h("git ls-files -u",{cwd:t});k.trim().length>0&&(v=!0)}catch{}let C=((u.stdout||"")+(u.stderr||"")+(u.message||"")).toLowerCase();if(v||C.includes("conflict")||C.includes("conflit")){let k=e.buildUpstreamPath(w);if(!await $e(t,k,f,d))throw n=!0,new Error("Update aborted by user.")}else throw u}if(n)break;l++}catch(u){u.message.includes("aborted")?he.window.showInformationMessage("Ricwiz: Update cancelled."):he.window.showErrorMessage(`Ricwiz: Failed to update branch ${f}. Detail: ${u.message}`);return}}if(!n){d.report({message:"Finishing up...",increment:10});try{let c=await j(t);a&&a!==c&&await h(`git checkout ${a}`,{cwd:t})}catch{}he.window.showInformationMessage(`Ricwiz: Successfully updated ${l} environment branches from their bases!`)}})}var he,Co=P(()=>{"use strict";he=y(require("vscode"));E();Xe();N()});async function $o(){let t=x();if(!t){W.window.showErrorMessage("Ricwiz: Open a folder or workspace that is a Git repository.");return}let e=await j(t),i=W.workspace.getConfiguration("ricwiz");await W.window.withProgress({location:W.ProgressLocation.Notification,title:"Ricwiz: Scanning for unused local branches...",cancellable:!1},async()=>{try{await h("git fetch --prune",{cwd:t})}catch{}let o=[];try{let{stdout:r}=await h('git branch --format="%(refname:short)"',{cwd:t});o=r.split(`
`).map(c=>c.trim()).filter(c=>c.length>0)}catch{}if(o.length===0){W.window.showInformationMessage("Ricwiz: No local branches found.");return}let s=[];try{let{stdout:r}=await h('git branch -r --format="%(refname:short)"',{cwd:t});s=r.split(`
`).map(c=>c.trim().replace(/^origin\//,"").replace(/^[^\/]+\//,"")).filter(c=>c.length>0&&!c.includes("HEAD"))}catch{}let m=[];try{let{stdout:r}=await h('git for-each-ref --format="%(refname:short)|||%(upstream:track)" refs/heads/',{cwd:t});m=r.split(`
`).filter(c=>c.includes("[gone]")).map(c=>c.split("|||")[0].trim())}catch{}let d=o.filter(r=>!s.includes(r));if(d.length===0){W.window.showInformationMessage("Ricwiz: Your local repository is totally clean! All local branches exist on the remote.");return}let g=d.map(r=>{let c=m.includes(r),p=r===e,f="Not found on remote";return c&&(f="Deleted on remote [gone]"),p&&(f+=" (Current branch - will checkout main first)"),{label:r,description:f,picked:c&&!p}}),l=await W.window.showQuickPick(g,{canPickMany:!0,placeHolder:"Select local branches to delete",title:"Ricwiz: Delete Unused Branches"});if(!l||l.length===0){W.window.showInformationMessage("Ricwiz: No branches selected for deletion.");return}if(await W.window.showWarningMessage(`Ricwiz: Delete ${l.length} local branch(es)?
This cannot be undone!`,{modal:!0},"Yes, delete them")!=="Yes, delete them"){W.window.showInformationMessage("Ricwiz: Deletion cancelled.");return}let n=0;for(let r of l){let c=r.label;if(c===e){let p=i.get("ticketSourceBranch","main");try{await h(`git checkout ${p}`,{cwd:t}),e=p}catch{W.window.showWarningMessage(`Ricwiz: Could not switch away from ${c}. Skipping.`);continue}}try{await h(`git branch -D ${c}`,{cwd:t}),n++}catch{W.window.showWarningMessage(`Ricwiz: Could not delete local branch ${c}.`)}}W.window.showInformationMessage(`Ricwiz: \u{1F5D1}\uFE0F Cleaned up ${n} unused local branch(es).`)})}var W,Ro=P(()=>{"use strict";W=y(require("vscode"));E()});async function Le(t){let e=x();e&&await re.window.withProgress({location:re.ProgressLocation.Notification,title:`Ricwiz: Switching to ${t}...`,cancellable:!1},async()=>{try{let i=await j(e),o=!1;try{let{stdout:m}=await h("git status --porcelain",{cwd:e});o=m.trim().length>0}catch{}if(o&&i)try{await h(`git stash push --include-untracked -m "ricwiz-auto:${i}"`,{cwd:e}),re.window.showInformationMessage(`Ricwiz: \u{1F4E6} Stashed changes from ${i}`)}catch{re.window.showWarningMessage("Ricwiz: Could not stash changes. Checkout may fail if there are conflicts.")}let s=t;t.includes("/")&&(s=t.split("/").slice(1).join("/"));try{await h(`git checkout ${s}`,{cwd:e})}catch{let d="";if(t.includes("/"))d=t.split("/")[0];else{let{stdout:g}=await h("git branch -r",{cwd:e}),l=g.split(`
`).map(n=>n.trim()).filter(n=>n),a=[];for(let n of l){let r=n.split(" ")[0];r.endsWith(`/${s}`)&&a.push(r.substring(0,r.lastIndexOf("/")))}if(a.length===0){re.window.showErrorMessage(`Ricwiz: A branch "${s}" n\xE3o existe localmente nem em nenhuma remote!`);return}else if(a.length===1)d=a[0];else{let n=await D.initialize(e);a.includes("origin")?d="origin":n&&a.includes(n.upstreamRemote)?d=n.upstreamRemote:d=a[0]}}try{await h(`git fetch ${d} ${s}`,{cwd:e}),await h(`git checkout -b ${s} --track ${d}/${s}`,{cwd:e})}catch{re.window.showErrorMessage(`Ricwiz: Encontrou na remote ${d} mas falhou a fazer checkout.`);return}}try{let{stdout:m}=await h("git stash list",{cwd:e}),d=m.split(`
`);for(let g=0;g<d.length;g++)if(d[g].includes(`ricwiz-auto:${s}`)){let l=d[g].match(/stash@\{(\d+)\}/);l&&(await h(`git stash pop stash@{${l[1]}}`,{cwd:e}),re.window.showInformationMessage(`Ricwiz: \u{1F4E6} Restored stashed changes on ${s}`));break}}catch{re.window.showWarningMessage(`Ricwiz: Could not restore stashed changes on ${s}. You may need to resolve conflicts manually (check git stash list).`)}}catch{re.window.showErrorMessage(`Ricwiz: Could not checkout branch ${t}.`)}})}var re,rt=P(()=>{"use strict";re=y(require("vscode"));E();N()});async function zo(){let t=x();if(t)try{let{stdout:e}=await h("git branch --show-current",{cwd:t}),i=e.trim();i&&(await je.env.clipboard.writeText(i),je.window.showInformationMessage(`Ricwiz: \u{1F4CB} Copied "${i}" to clipboard`))}catch{je.window.showErrorMessage("Ricwiz: Could not get the current branch name.")}}var je,Po=P(()=>{"use strict";je=y(require("vscode"));E()});async function Bo(){let t=x();if(!t){Z.window.showErrorMessage("Ricwiz: Open a folder or workspace that is a Git repository.");return}let e=Z.workspace.getConfiguration("ricwiz"),i=e.get("ticketSourceBranch","main"),s=e.get("packageXmlCommand",'sf sgd source delta --to "HEAD" --from "origin/{baseBranch}" --output-dir "."').replace("{baseBranch}",i);await Z.window.showWarningMessage("Are you sure you want to generate the package.xml? This may overwrite existing local manifest files.",{modal:!0},"Yes, Generate")==="Yes, Generate"&&await Z.window.withProgress({location:Z.ProgressLocation.Notification,title:"Ricwiz: Generating package.xml using Salesforce CLI...",cancellable:!1},async()=>{try{await h(s,{cwd:t,maxBuffer:10*1024*1024}),Z.window.showInformationMessage("Ricwiz: Successfully generated package.xml!");let d=st.join(t,"package","package.xml"),g=st.join(t,"package.xml"),l=st.join(t,"manifest","package.xml");for(let a of[d,g,l])if(So.existsSync(a)){let n=await Z.workspace.openTextDocument(a);await Z.window.showTextDocument(n);break}}catch(d){Z.window.showErrorMessage(`Ricwiz: Error running sf command - ${d.message}`)}})}var Z,st,So,Eo=P(()=>{"use strict";Z=y(require("vscode")),st=y(require("path")),So=y(require("fs"));E()});async function To(){let t=x();if(!t){X.window.showErrorMessage("Ricwiz: Open a folder or workspace that is a Git repository.");return}let i=X.workspace.getConfiguration("ricwiz").get("deployCommand","sf project deploy start --manifest package/package.xml --post-destructive-changes destructiveChanges/destructiveChanges.xml -c -l NoTestRun -g");await X.window.showWarningMessage("Are you sure you want to deploy to Salesforce? This action modifies your org and cannot be easily undone.",{modal:!0},"Yes, Deploy")==="Yes, Deploy"&&await X.window.withProgress({location:X.ProgressLocation.Notification,title:"Ricwiz: Deploying package...",cancellable:!1},async()=>{try{let{stdout:s,stderr:m}=await h(i,{cwd:t,maxBuffer:52428800}),d=X.window.createOutputChannel("Ricwiz Deploy");d.appendLine(`Executing: ${i}`),d.appendLine(s),m&&(d.appendLine("--- STDERR ---"),d.appendLine(m)),d.show(),X.window.showInformationMessage("Ricwiz: Successfully ran deploy command!")}catch(s){let m=X.window.createOutputChannel("Ricwiz Deploy");m.appendLine(`Error executing: ${i}`),s.stdout&&m.appendLine(s.stdout),s.stderr&&m.appendLine(s.stderr),m.appendLine(s.message),m.show(),X.window.showErrorMessage("Ricwiz: Error running deploy command. See output channel for details.")}})}var X,Mo=P(()=>{"use strict";X=y(require("vscode"));E()});async function Do(){let t=x();if(!t){ee.window.showErrorMessage("Ricwiz: Open a folder or workspace that is a Git repository.");return}let i=ee.workspace.getConfiguration("ricwiz").get("importDataCommand","sfdx force:data:tree:import --plan data/plan.json");await ee.window.showWarningMessage("Are you sure you want to import data into Salesforce? This action modifies records in your org.",{modal:!0},"Yes, Import")==="Yes, Import"&&await ee.window.withProgress({location:ee.ProgressLocation.Notification,title:"Ricwiz: Importing data...",cancellable:!1},async()=>{try{let{stdout:s,stderr:m}=await h(i,{cwd:t,maxBuffer:52428800}),d=ee.window.createOutputChannel("Ricwiz Import Data");d.appendLine(`Executing: ${i}`),d.appendLine(s),m&&(d.appendLine("--- STDERR ---"),d.appendLine(m)),d.show(),ee.window.showInformationMessage("Ricwiz: Successfully ran import data command!")}catch(s){let m=ee.window.createOutputChannel("Ricwiz Import Data");m.appendLine(`Error executing: ${i}`),s.stdout&&m.appendLine(s.stdout),s.stderr&&m.appendLine(s.stderr),m.appendLine(s.message),m.show(),ee.window.showErrorMessage("Ricwiz: Error running import data command. See output channel for details.")}})}var ee,Lo=P(()=>{"use strict";ee=y(require("vscode"));E()});async function Ao(){let t=x();if(!t){Q.window.showErrorMessage("Ricwiz: Open a folder or workspace that is a Git repository.");return}let e=await D.initialize(t,{skipPrompt:!0}),i=e?e.ticketSourceBranch:Q.workspace.getConfiguration("ricwiz").get("ticketSourceBranch","main"),o=e?e.originRemote:"origin",s="";try{s=await j(t)}catch{}let m=await Q.window.showInputBox({prompt:`Enter the branch name to list modified files (compared to ${i})`,value:s,placeHolder:"SFPSCA-1234"});if(!m)return;let{extractTicketSuggestion:d,resolvePrefix:g}=(E(),I(Te)),{ricwizLogger:l}=(Oe(),I(nt));await Q.window.withProgress({location:Q.ProgressLocation.Notification,title:`Ricwiz: Finding files for ${m}...`,cancellable:!1},async()=>{try{let a=e?e.ticketPrefix:Q.workspace.getConfiguration("ricwiz").get("ticketPrefix","SFPSC-"),n=g(m,a),r=d(m,n,!0)||m.replace(/-to-[a-zA-Z0-9]+$/i,""),{resolveExistingBranchName:c}=(ue(),I(be)),p=await c(t,r);l.appendLine(`[ListTicketFiles] targetBranch (raw): ${m}, resolvedTargetBranch: ${p}, ticketId: ${r}, originRemote: ${o}, sourceBranch: ${i}`);let f=[];try{let B="";try{l.appendLine(`[ListTicketFiles] Running: git merge-base ${o}/${i} ${p}`);let{stdout:z}=await h(`git merge-base ${o}/${i} ${p}`,{cwd:t});B=z.trim()}catch(z){l.appendLine(`[ListTicketFiles] First merge-base failed: ${z.message}`),l.appendLine(`[ListTicketFiles] Running: git merge-base ${i} ${p}`);let{stdout:L}=await h(`git merge-base ${i} ${p}`,{cwd:t});B=L.trim()}if(B){l.appendLine(`[ListTicketFiles] Merge base found: ${B}. Running git diff...`);let{stdout:z}=await h(`git diff --name-only ${B} ${p}`,{cwd:t,maxBuffer:10*1024*1024});f=z.split(`
`).map(L=>L.trim()).filter(L=>L.length>0),l.appendLine(`[ListTicketFiles] diff found ${f.length} files.`)}}catch(B){l.appendLine(`[ListTicketFiles] Diff strategy failed: ${B.message}`)}let w=[];try{l.appendLine(`[ListTicketFiles] Running git log fallback for ticketId: ${r}`);let{stdout:B}=await h(`git --no-pager log --grep="\\b${r}\\b" -i -E --name-only -m --first-parent --format=""`,{cwd:t,maxBuffer:10*1024*1024});w=B.split(`
`).map(z=>z.trim()).filter(z=>z.length>0),l.appendLine(`[ListTicketFiles] git log found ${w.length} files.`)}catch(B){l.appendLine(`[ListTicketFiles] Git log fallback failed: ${B.message}`)}let u=[...f,...w];if(u.length===0){Q.window.showInformationMessage(`Ricwiz: No modified files found for ${m}.`);return}let v=Array.from(new Set(u)).sort(),C={};for(let B of v){let z=B.match(/default\/([^/]+)/),L=z&&z[1]?z[1].toUpperCase():"OUTROS";C[L]||(C[L]=[]),C[L].push(B)}let k=`Files modified in branch ${m}:
`,S=Object.keys(C).sort();for(let B of S)k+=`
=== ${B} ===
`,k+=C[B].join(`
`)+`
`;let T=await Q.workspace.openTextDocument({content:k,language:"plaintext"});await Q.window.showTextDocument(T)}catch(a){Q.window.showErrorMessage(`Ricwiz: Error running git log - ${a.message}`)}})}var Q,Fo=P(()=>{"use strict";Q=y(require("vscode"));E();N()});async function Io(){let t=x();if(!t){se.window.showErrorMessage("Ricwiz: Open a folder or workspace that is a Git repository.");return}let i=se.workspace.getConfiguration("ricwiz").get("resetTrackingCommand","sf org disable tracking && sf project reset tracking --no-prompt");await se.window.withProgress({location:se.ProgressLocation.Notification,title:"Ricwiz: Resetting tracking...",cancellable:!1},async()=>{try{let{stdout:o,stderr:s}=await h(i,{cwd:t,maxBuffer:52428800}),m=se.window.createOutputChannel("Ricwiz Reset Tracking");m.appendLine(`Executing: ${i}`),m.appendLine(o),s&&(m.appendLine("--- STDERR ---"),m.appendLine(s)),m.show(),se.window.showInformationMessage("Ricwiz: Successfully reset tracking!")}catch(o){let s=se.window.createOutputChannel("Ricwiz Reset Tracking");s.appendLine(`Error executing: ${i}`),o.stdout&&s.appendLine(o.stdout),o.stderr&&s.appendLine(o.stderr),s.appendLine(o.message),s.show(),se.window.showErrorMessage("Ricwiz: Error resetting tracking. See output channel for details.")}})}var se,Oo=P(()=>{"use strict";se=y(require("vscode"));E()});async function Uo(){let t=x();if(!t){te.window.showErrorMessage("Ricwiz: Open a workspace first.");return}let e=["ApexClass","ApexTrigger","CustomObject","CustomField","LightningComponentBundle","AuraDefinitionBundle","Flow","CustomLabel","CustomMetadata","StaticResource","Profile","PermissionSet","PermissionSetGroup","Layout","ValidationRule","RecordType","ListView","Report","EmailTemplate","Other (Type manually)..."],i=await te.window.showQuickPick(e,{placeHolder:"Select Metadata Type to extract (e.g., ApexClass)",ignoreFocusOut:!0});if(!i||i==="Other (Type manually)..."&&(i=await te.window.showInputBox({prompt:"Enter Metadata Type (e.g., CustomApplication, Queue)",ignoreFocusOut:!0}),!i))return;let o={ApexClass:"**/*.cls",ApexTrigger:"**/*.trigger",CustomObject:"**/*.{object,object-meta.xml}",CustomField:"**/*.field-meta.xml",LightningComponentBundle:"**/lwc/*/*.js",AuraDefinitionBundle:"**/aura/*/*.cmp",Flow:"**/*.flow-meta.xml",CustomLabel:"**/*.labels-meta.xml",CustomMetadata:"**/*.md-meta.xml",StaticResource:"**/*.resource-meta.xml",Profile:"**/*.profile-meta.xml",PermissionSet:"**/*.permissionset-meta.xml",PermissionSetGroup:"**/*.permissionsetgroup-meta.xml",Layout:"**/*.layout-meta.xml",ValidationRule:"**/*.validationRule-meta.xml",RecordType:"**/*.recordType-meta.xml",ListView:"**/*.listView-meta.xml"},s=[],m=o[i];if(m)try{s=(await te.workspace.findFiles(m,"**/node_modules/**")).map(l=>{let a=l.fsPath.split(/[\\/]/).pop()||"";if(i==="LightningComponentBundle"||i==="AuraDefinitionBundle"){let n=l.fsPath.split(/[\\/]/);return n[n.length-2]||a.split(".")[0]}return a.split(".")[0]}),s=[...new Set(s)].sort()}catch{}let d=await new Promise(g=>{let l=te.window.createQuickPick();l.title=`Extract ${i}`,l.placeholder="Type name (e.g. MyComponent) or * for all",l.ignoreFocusOut=!0,l.matchOnDescription=!0;let a=()=>{let n=l.value.trim(),r=[];n?r.push({label:`$(cloud-download) Extract "${n}"`,description:"Extract exact name from Salesforce",alwaysShow:!0}):r.push({label:'$(cloud-download) Extract "*" (All)',description:`Extract all ${i}s`,alwaysShow:!0}),s.forEach(c=>{(!n||c.toLowerCase().includes(n.toLowerCase()))&&r.push({label:c,description:"Local workspace component"})}),l.items=r};l.onDidChangeValue(()=>a()),l.onDidAccept(()=>{let n=l.selectedItems[0];if(n){let r=n.label;r.startsWith('$(cloud-download) Extract "')?r=r.replace('$(cloud-download) Extract "',"").replace('" (All)',"").replace('"',""):r==='$(cloud-download) Extract "*" (All)'&&(r="*"),l.hide(),g(r)}}),l.onDidHide(()=>{l.dispose(),g(void 0)}),a(),l.show()});d&&await te.window.withProgress({location:te.ProgressLocation.Notification,title:`Ricwiz: Extracting ${i}:${d} from Salesforce...`,cancellable:!0},async(g,l)=>{try{U.show(!0);let a=`${i}:${d}`,{stdout:n,stderr:r}=await h(`sf project retrieve start -m "${a}"`,{cwd:t});n&&U.appendLine(n),r&&U.appendLine(r),te.window.showInformationMessage(`Ricwiz: Successfully extracted ${a}.`)}catch(a){U.appendLine(`ERROR: ${a.message}`),a.stdout&&U.appendLine(a.stdout),a.stderr&&U.appendLine(a.stderr),te.window.showErrorMessage("Ricwiz: Extraction failed. See Output channel for details.")}})}var te,jo=P(()=>{"use strict";te=y(require("vscode"));E()});async function Wo(){let t=G.window.activeTextEditor;if(!t){G.window.showErrorMessage("Ricwiz: Please open the file you want to deploy in the editor first.");return}let e=t.document.uri.fsPath,i=x();if(!i)return;let o="";if(await G.window.withProgress({location:G.ProgressLocation.Notification,title:"Ricwiz: Fetching available Salesforce orgs...",cancellable:!1},async()=>{try{let{stdout:l}=await h("sf org list --json",{cwd:i});o=l}catch(l){o=l.stdout||""}}),!o){G.window.showErrorMessage("Ricwiz: Failed to fetch orgs. Is Salesforce CLI installed?");return}let s=[];try{let l=JSON.parse(o),a=l.result?.nonScratchOrgs||[],n=l.result?.scratchOrgs||[];s=[...a,...n]}catch{G.window.showErrorMessage("Ricwiz: Failed to parse org list.");return}if(s.length===0){G.window.showInformationMessage("Ricwiz: No authenticated orgs found.");return}let m=s.map(l=>({label:l.alias||l.username,description:l.alias?l.username:"",picked:l.isDefaultUsername})),d=await G.window.showQuickPick(m,{placeHolder:"Select the org(s) to deploy this file to",canPickMany:!0,ignoreFocusOut:!0});if(!d||d.length===0)return;let g=No.basename(e);await G.window.withProgress({location:G.ProgressLocation.Notification,title:`Ricwiz: Deploying ${g} to ${d.length} org(s)...`,cancellable:!1},async()=>{U.show(!0),U.appendLine(`--- Starting Parallel Deploy of ${g} ---`);let l=d.map(async c=>{let p=c.label;U.appendLine(`[${p}] Deploying...`);try{let{stdout:f,stderr:w}=await h(`sf project deploy start -d "${e}" -o "${p}"`,{cwd:i});return U.appendLine(`[${p}] \u2705 Success`),f&&U.appendLine(f),{org:p,success:!0}}catch(f){return U.appendLine(`[${p}] \u274C Failed`),f.stdout&&U.appendLine(f.stdout),f.stderr&&U.appendLine(f.stderr),{org:p,success:!1}}}),a=await Promise.all(l),n=a.filter(c=>c.success).length,r=a.filter(c=>!c.success).length;r===0?G.window.showInformationMessage(`Ricwiz: Successfully deployed to all ${n} orgs!`):G.window.showErrorMessage(`Ricwiz: Deploy finished with errors (${n} success, ${r} failed). Check Output channel.`)})}var G,No,Jo=P(()=>{"use strict";G=y(require("vscode")),No=y(require("path"));E()});async function qo(){let t=x();if(!t){O.window.showErrorMessage("Ricwiz: Open a folder or workspace that is a Git repository.");return}let e=O.workspace.getConfiguration("ricwiz"),i=e.get("auditUsername",""),o=e.get("auditHours",8),s=await O.window.showInputBox({prompt:"Enter your Salesforce Username to query in SetupAuditTrail",value:i,placeHolder:"admin@tuaorg.com"});if(!s)return;let m=await O.window.showInputBox({prompt:"How many hours back do you want to search?",value:o.toString(),placeHolder:"8"});if(!m)return;let d=parseFloat(m);if(isNaN(d)||d<=0){O.window.showErrorMessage("Ricwiz: Invalid hours specified.");return}let g=new Date(Date.now()-d*60*60*1e3).toISOString(),a=`sf data query -q "${`SELECT Action, Display, Section FROM SetupAuditTrail WHERE CreatedBy.Username = '${s}' AND CreatedDate >= ${g}`}" --json`;await O.window.withProgress({location:O.ProgressLocation.Notification,title:"Ricwiz: Interrogating Setup Audit Trail...",cancellable:!1},async()=>{try{let{stdout:n}=await h(a,{cwd:t,maxBuffer:52428800}),r=JSON.parse(n);if(!r.result||r.result.records.length===0){O.window.showInformationMessage(`Ricwiz: No changes found for ${s} in the last ${d} hours.`);return}let c=r.result.records,p=[],f=new Set;for(let z of c){let L=fi(z.Action,z.Display,z.Section);if(L){let oe=`${L.isDelete?"DEL":"ADD"}-${L.metadataFormat}`;if(!f.has(oe)){f.add(oe);let Y=L.isDelete?"$(trash)":"$(plus)";p.push({label:`${Y} ${L.metadataFormat}`,description:`${z.Action} -> ${z.Display}`,metadataFormat:L.metadataFormat,isDelete:L.isDelete})}}}if(p.length===0){O.window.showInformationMessage(`Ricwiz: No extractable metadata changes found for ${s} in the last ${d} hours (ignored passwords/logins).`);return}let w=await O.window.showQuickPick(p,{canPickMany:!0,placeHolder:"Select the changes you want to extract to GitLab",ignoreFocusOut:!0});if(!w||w.length===0){O.window.showInformationMessage("Ricwiz: No changes selected.");return}let u=w.filter(z=>z.isDelete),v=w.filter(z=>!z.isDelete),C=O.window.createOutputChannel("Ricwiz Admin Bridge");if(C.show(),u.length>0){let{stdout:z}=await h("git ls-files",{cwd:t}),L=z.split(`
`).map(Y=>Y.trim()),oe=0;for(let Y of u){let me=Y.metadataFormat.split(":"),Ge=me[0],He=me[1],ye=He;Ge==="CustomField"&&(ye=He.split(".")[1]);let dt=L.filter(Pe=>{let A=ct.basename(Pe);return A.startsWith(ye+".")&&A.includes(Ge==="CustomField"?".field":"")});for(let Pe of dt){let A=ct.join(t,Pe);at.existsSync(A)&&(at.unlinkSync(A),C.appendLine(`Deleted local file: ${Pe}`),oe++)}}O.window.showInformationMessage(`Ricwiz: Deleted ${oe} local files from Git workspace.`)}if(v.length===0)return;let k=v.map(z=>z.metadataFormat).filter(z=>z!=="").join(", "),S=await O.window.showInputBox({prompt:"Review and adjust the metadata components to retrieve",value:k,ignoreFocusOut:!0});if(!S)return;let T=`sf project retrieve start -m "${S}"`;C.appendLine(`Executing: ${T}`),O.window.showInformationMessage(`Ricwiz: Extracting ${v.length} components...`);let B=await h(T,{cwd:t});C.appendLine(B.stdout),B.stderr&&(C.appendLine("--- STDERR ---"),C.appendLine(B.stderr)),O.window.showInformationMessage("Ricwiz: Changes extracted successfully! Ready for Git Commit.")}catch(n){O.window.showErrorMessage(`Ricwiz: Error capturing changes - ${n.message}`)}})}function fi(t,e,i){if(!t||!e||!i)return null;let o=t.toLowerCase(),s=i.toLowerCase();if(["security controls","network access","session settings","data export","login history","password policies","identity verification","delegated administration"].includes(s)||o.includes("login")||o.includes("password")||o.includes("oauth")||o.includes("session"))return null;let d=o.includes("delete"),g=null;if(o==="permissionsetgroupcomponentadd"||o==="permissionsetgroupcomponentdelete")return null;let l=(a,n=!1)=>{let r=a.replace(/\(.*\)/g,"").trim();r.includes(":")&&!o.includes("calculation")&&(r=r.split(":")[0]);let c=["disabled","deleted","removed","created","changed","updated","from","to","on","assigned","assign","assignment","permission","set","group","apex","class","trigger","custom","field","object","layout","validation","rule","flow","profile"],p=r.split(/\s+/);if(n){for(;p.length>0&&c.includes(p[p.length-1].toLowerCase());)p.pop();for(;p.length>0&&c.includes(p[0].toLowerCase());)p.shift();return p.join(" ").trim().replace(/[^a-zA-Z0-9_ ]/g,"")}else return p.filter(u=>!c.includes(u.toLowerCase())).join("_").replace(/[^a-zA-Z0-9_]/g,"")||r.replace(/\s+/g,"")};if(o.includes("profile"))g=`Profile:${l(e,!0)}`;else if(o.includes("permissionsetgroupcalculation")){let a=e.split(":");g=`PermissionSetGroup:${a.length>1?a[a.length-1].trim():l(e,!1)}`}else if(o.includes("permission set group")||o.includes("permissionsetgroup"))g=`PermissionSetGroup:${l(e,!1)}`;else if(o.includes("permission set")||o.includes("permissionset"))g=`PermissionSet:${l(e,!1)}`;else if(o.includes("apexclass"))g=`ApexClass:${l(e,!1)}`;else if(o.includes("apextrigger")||o.includes("apex trigger"))g=`ApexTrigger:${l(e,!1)}`;else if(o.includes("customfield")){let a=e.match(/([A-Za-z0-9_]+__c)/),n=e.match(/(?:on|na|for)\s+([A-Za-z0-9_]+)/i);a&&n?g=`CustomField:${n[1]}.${a[1]}`:g=`CustomField:${l(e,!1)}`}else if(o.includes("layout"))g=`Layout:${l(e,!0)}`;else if(o.includes("validation"))g=`ValidationRule:${l(e,!1)}`;else if(o.includes("flow"))g=`Flow:${l(e,!1)}`;else if(o.includes("customobject")){let a=e.match(/([A-Za-z0-9_]+__c)/);g=a?`CustomObject:${a[1]}`:`CustomObject:${l(e,!1)}`}else if(!o.includes("created")&&!o.includes("changed")&&!o.includes("deleted"))return null;return g?{metadataFormat:g,isDelete:d}:null}var O,at,ct,Go=P(()=>{"use strict";O=y(require("vscode")),at=y(require("fs")),ct=y(require("path"));E()});async function Ho(){let t=x();if(t)try{let{stdout:e}=await h('git for-each-ref --sort=-committerdate --format="%(refname:short)|||%(committerdate:relative)|||%(subject)" refs/heads/',{cwd:t}),i=e.split(`
`).filter(s=>s.trim()).map(s=>{let m=s.split("|||");return{label:`$(git-branch) ${m[0]}`,description:m[1],detail:m[2],branchName:m[0]}}),o=await bt.window.showQuickPick(i,{placeHolder:"Select a branch from history to checkout",matchOnDescription:!0,matchOnDetail:!0});o&&await Le(o.branchName)}catch{bt.window.showErrorMessage("Ricwiz: Failed to get branch history")}}var bt,Vo=P(()=>{"use strict";bt=y(require("vscode"));E();rt()});async function _o(){let t=x();if(!t)return;let e=await Ne.window.showInputBox({prompt:"Enter ticket number or name (e.g., 48934)",placeHolder:"48934"});if(e)try{let{stdout:i}=await h(`git branch --list "*${e}*"`,{cwd:t}),o=i.split(`
`).map(d=>d.replace("*","").trim()).filter(d=>d);if(o.length===0){Ne.window.showInformationMessage(`Ricwiz: No branches found matching "${e}"`);return}let s=o.map(d=>({label:`$(git-branch) ${d}`,branchName:d})),m=await Ne.window.showQuickPick(s,{placeHolder:`Select a branch for ${e}`});m&&await Le(m.branchName)}catch{Ne.window.showErrorMessage("Ricwiz: Failed to search branches")}}var Ne,Qo=P(()=>{"use strict";Ne=y(require("vscode"));E();rt()});async function Ko(){let t=ze.window.activeTextEditor;if(!t)return ze.window.showErrorMessage("Ricwiz: Please open a file in the editor to check blame."),null;let e=t.document.fileName,i=Yo.basename(e),o=x();if(!o)return ze.window.showErrorMessage("Ricwiz: Workspace is not a git repository."),null;let s=[];try{let{stdout:n}=await h(`git log -5 --pretty=format:"%an|%ar|%s|%h" -- "${e}"`,{cwd:o}),r=n.trim().split(`
`);for(let c of r){let p=c.split("|");p.length>=4&&s.push({author:p[0],time:p[1],message:p.slice(2,-1).join("|"),hash:p[p.length-1]})}}catch(n){console.error("Git blame error:",n)}let m="Unknown",d="Unknown",g="Unknown",l=[],a=hi(e);if(a)try{await ze.window.withProgress({location:ze.ProgressLocation.Notification,title:`Ricwiz: Analyzing ${a.name} in Salesforce...`,cancellable:!1},async()=>{let n="";if(a.type==="CustomField"){let r=a.name.split(".");r.length===2&&(n=`SELECT LastModifiedBy.Name, LastModifiedDate, CreatedBy.Name FROM CustomField WHERE DeveloperName = '${r[1].replace("__c","")}' AND TableEnumOrId = '${r[0]}'`)}else a.type==="LightningComponentBundle"?n=`SELECT LastModifiedBy.Name, LastModifiedDate, CreatedBy.Name FROM LightningComponentBundle WHERE DeveloperName = '${a.name}'`:n=`SELECT LastModifiedBy.Name, LastModifiedDate, CreatedBy.Name FROM ${a.type} WHERE Name = '${a.name}'`;if(n)try{let{stdout:r}=await h(`sf data query -t -q "${n}" --json`,{cwd:o,maxBuffer:52428800}),c=JSON.parse(r);if(c&&c.result&&c.result.records&&c.result.records.length>0){let p=c.result.records[0];m=p.LastModifiedBy?p.LastModifiedBy.Name:"Unknown",g=p.CreatedBy?p.CreatedBy.Name:"Unknown",d=new Date(p.LastModifiedDate).toLocaleString()}else m="Not found in Org",d="N/A",g="N/A"}catch{m="Query Error",d="N/A",g="N/A"}try{let r="SELECT Action, Display, CreatedBy.Name, CreatedDate FROM SetupAuditTrail ORDER BY CreatedDate DESC LIMIT 1500",{stdout:c}=await h(`sf data query -q "${r}" --json`,{cwd:o,maxBuffer:52428800}),p=JSON.parse(c);if(p&&p.result&&p.result.records){let f=a.name.replace("__c","");l=p.result.records.filter(u=>u.Display&&u.Display.includes(f)).map(u=>({action:u.Action,display:u.Display,author:u.CreatedBy?u.CreatedBy.Name:"Unknown",time:new Date(u.CreatedDate).toLocaleString()})).slice(0,10)}}catch(r){console.error("Audit trail query error:",r)}})}catch(n){console.error("Salesforce query error:",n)}else m="Unsupported Metadata Type",d="N/A";return{fileName:i,gitHistory:s,sfAuthor:m,sfTime:d,sfCreatedBy:g,auditHistory:l}}function hi(t){let e=t.replace(/\\/g,"/");if(e.includes("/classes/")){let i=e.match(/\/classes\/([^/.]+)\.cls/);if(i)return{type:"ApexClass",name:i[1]}}if(e.includes("/triggers/")){let i=e.match(/\/triggers\/([^/.]+)\.trigger/);if(i)return{type:"ApexTrigger",name:i[1]}}if(e.includes("/lwc/")){let i=e.match(/\/lwc\/([^/]+)\//);if(i)return{type:"LightningComponentBundle",name:i[1]}}if(e.includes("/aura/")){let i=e.match(/\/aura\/([^/]+)\//);if(i)return{type:"AuraDefinitionBundle",name:i[1]}}if(e.includes("/objects/")&&e.includes("/fields/")){let i=e.match(/\/objects\/([^/]+)\//),o=e.match(/\/fields\/([^/.]+)\.field/);if(i&&o)return{type:"CustomField",name:`${i[1]}.${o[1]}`}}return null}var ze,Yo,Zo=P(()=>{"use strict";ze=y(require("vscode")),Yo=y(require("path"));E()});async function Xo(t,e){let i=x();if(!i)return;let o=(await Fe())?.trim();if(!o){ae.window.showErrorMessage("Ricwiz: GitLab token is not configured.");return}try{let s=await D.initialize(i,{skipPrompt:!0});if(!s)return;let m=ae.workspace.getConfiguration("ricwiz"),g=s.getConfig("gitlabUrlOverride","");if(g){let l=new URL(g);g=`${l.protocol}//${l.host}`}else{let{stdout:l}=await h("git remote",{cwd:i}),a=l.split(`
`).map(r=>r.trim()).filter(r=>r),n=!1;for(let r of a){let{stdout:c}=await h(`git remote get-url ${r}`,{cwd:i}),p=c.trim();p.endsWith(".git")&&(p=p.slice(0,-4)),p.startsWith("git@")&&(p=p.replace("git@","").replace(":","/"),p=`https://${p}`);let f=new URL(p),w=f.pathname;if(w.startsWith("/")&&(w=w.substring(1)),w.endsWith("/")&&(w=w.slice(0,-1)),encodeURIComponent(w)===t||w===t){g=`${f.protocol}//${f.host}`,n=!0;break}}if(!n){ae.window.showErrorMessage(`Ricwiz: Could not determine base URL for project ${t}`);return}}await ae.window.withProgress({location:ae.ProgressLocation.Notification,title:`Fetching failed jobs for Pipeline #${e}...`,cancellable:!1},async()=>{let l=new We.Agent({keepAlive:!0}),a=new URL(`${g}/api/v4/projects/${t}/pipelines/${e}/jobs?scope[]=failed`),n=await new Promise((u,v)=>{We.get(a,{headers:{"PRIVATE-TOKEN":o},agent:l},C=>{let k="";C.on("data",S=>k+=S),C.on("end",()=>{if(C.statusCode===200)try{u(JSON.parse(k))}catch{u([])}else u([])})}).on("error",()=>u([]))});if(!n||n.length===0){ae.window.showInformationMessage("Ricwiz: No failed jobs found for this pipeline.");return}let r=n[0],c=new URL(`${g}/api/v4/projects/${t}/jobs/${r.id}/trace`),f=(await new Promise((u,v)=>{We.get(c,{headers:{"PRIVATE-TOKEN":o},agent:l},C=>{let k="";C.on("data",S=>k+=S),C.on("end",()=>u(k))}).on("error",C=>u(`Failed to fetch log: ${C.message}`))})).replace(/\x1B\[[0-9;]*[mK]/g,""),w=ae.window.createOutputChannel(`Pipeline #${e} - Job ${r.name}`);w.appendLine(`Pipeline ID: ${e}`),w.appendLine(`Job Name: ${r.name}`),w.appendLine(`Status: ${r.status}`),w.appendLine(`URL: ${r.web_url}`),w.appendLine("========================================"),w.appendLine(f),w.show()})}catch(s){ae.window.showErrorMessage(`Ricwiz: Error fetching pipeline logs - ${s.message}`)}}var ae,We,ei=P(()=>{"use strict";ae=y(require("vscode"));ke();E();We=y(require("https"));N();E()});function ti(t,e,i){t.subscriptions.push(b.commands.registerCommand("ricwiz.generateDestructiveChanges",async(...o)=>{try{await Dt(...o)}finally{b.commands.executeCommand("ricwiz.manualRefresh")}}),b.commands.registerCommand("ricwiz.runSmartTests",async(...o)=>{try{await At(...o)}finally{b.commands.executeCommand("ricwiz.manualRefresh")}}),b.commands.registerCommand("ricwiz.refreshWebview",()=>{e&&b.commands.executeCommand("workbench.action.webview.reloadWebviewAction")}),b.commands.registerCommand("ricwiz.createBranches",async(...o)=>{try{await Ot(...o)}finally{b.commands.executeCommand("ricwiz.manualRefresh")}}),b.commands.registerCommand("ricwiz.prepareDeploy",async(...o)=>{try{await Jt(...o)}finally{b.commands.executeCommand("ricwiz.manualRefresh")}}),b.commands.registerCommand("ricwiz.createMergeRequests",async(...o)=>{try{await Ht(...o)}finally{b.commands.executeCommand("ricwiz.manualRefresh")}}),b.commands.registerCommand("ricwiz.createMergeRequestsVSCode",async(...o)=>{try{await Vt(...o)}finally{b.commands.executeCommand("ricwiz.manualRefresh")}}),b.commands.registerCommand("ricwiz.openJiraTicket",async(...o)=>{try{await Yt(...o)}finally{b.commands.executeCommand("ricwiz.manualRefresh")}}),b.commands.registerCommand("ricwiz.openJiraTicketVSCode",async(...o)=>{try{await Kt(...o)}finally{b.commands.executeCommand("ricwiz.manualRefresh")}}),b.commands.registerCommand("ricwiz.showJiraDetails",()=>{e&&ao(e)}),b.commands.registerCommand("ricwiz.openJiraDashboard",o=>{e&&lo(e,o)}),b.commands.registerCommand("ricwiz.openJiraDetailsForId",o=>{e&&mo(e,o)}),b.commands.registerCommand("ricwiz.toggleDashboardBranches",o=>{e&&(e.setDashboardShowBranches(o),b.commands.executeCommand("ricwiz.openJiraDashboard"))}),b.commands.registerCommand("ricwiz.changeJiraStatus",async(...o)=>{try{await uo(...o)}finally{b.commands.executeCommand("ricwiz.manualRefresh")}}),b.commands.registerCommand("ricwiz.addJiraComment",async(...o)=>{try{await go(...o)}finally{b.commands.executeCommand("ricwiz.manualRefresh")}}),b.commands.registerCommand("ricwiz.addJiraLabel",async(...o)=>{try{await fo(...o)}finally{b.commands.executeCommand("ricwiz.manualRefresh")}}),b.commands.registerCommand("ricwiz.setJiraToken",ho),b.commands.registerCommand("ricwiz.setGitlabToken",vo),b.commands.registerCommand("ricwiz.syncAll",async(...o)=>{try{await yo(...o)}finally{b.commands.executeCommand("ricwiz.manualRefresh")}}),b.commands.registerCommand("ricwiz.updateBases",async(...o)=>{try{await ko(...o)}finally{b.commands.executeCommand("ricwiz.manualRefresh")}}),b.commands.registerCommand("ricwiz.deleteUnusedBranches",async(...o)=>{try{await $o(...o)}finally{b.commands.executeCommand("ricwiz.manualRefresh")}}),b.commands.registerCommand("ricwiz.checkoutBranch",async(...o)=>{try{await Le(...o)}finally{b.commands.executeCommand("ricwiz.manualRefresh")}}),b.commands.registerCommand("ricwiz.copyBranchName",async(...o)=>{try{await zo(...o)}finally{b.commands.executeCommand("ricwiz.manualRefresh")}}),b.commands.registerCommand("ricwiz.generatePackageXml",async(...o)=>{try{await Bo(...o)}finally{b.commands.executeCommand("ricwiz.manualRefresh")}}),b.commands.registerCommand("ricwiz.deployPackage",async(...o)=>{try{await To(...o)}finally{b.commands.executeCommand("ricwiz.manualRefresh")}}),b.commands.registerCommand("ricwiz.importData",async(...o)=>{try{await Do(...o)}finally{b.commands.executeCommand("ricwiz.manualRefresh")}}),b.commands.registerCommand("ricwiz.listTicketFiles",async(...o)=>{try{await Ao(...o)}finally{b.commands.executeCommand("ricwiz.manualRefresh")}}),b.commands.registerCommand("ricwiz.resetTracking",async(...o)=>{try{await Io(...o)}finally{b.commands.executeCommand("ricwiz.manualRefresh")}}),b.commands.registerCommand("ricwiz.extractComponent",async(...o)=>{try{await Uo(...o)}finally{b.commands.executeCommand("ricwiz.manualRefresh")}}),b.commands.registerCommand("ricwiz.deployMultiOrg",async(...o)=>{try{await Wo(...o)}finally{b.commands.executeCommand("ricwiz.manualRefresh")}}),b.commands.registerCommand("ricwiz.captureAdminChanges",async(...o)=>{try{await qo(...o)}finally{b.commands.executeCommand("ricwiz.manualRefresh")}}),b.commands.registerCommand("ricwiz.openHistory",async(...o)=>{try{await Ho(...o)}finally{b.commands.executeCommand("ricwiz.manualRefresh")}}),b.commands.registerCommand("ricwiz.searchTicket",async(...o)=>{try{await _o(...o)}finally{b.commands.executeCommand("ricwiz.manualRefresh")}}),b.commands.registerCommand("ricwiz.whoToBlame",async()=>{let o=await Ko();o&&e&&(e.setBlameData(o),e.setPage("blame"))}),b.commands.registerCommand("ricwiz.showPipelineLogs",(o,s)=>Xo(o,s)),b.commands.registerCommand("ricwiz.manualRefresh",()=>{i&&i()}),b.commands.registerCommand("ricwiz.toggleAutoRefresh",()=>{if(e){let o=!e.isAutoRefreshEnabled();e.setAutoRefresh(o),b.workspace.getConfiguration("ricwiz").update("autoRefresh",o,b.ConfigurationTarget.Global)}}),b.commands.registerCommand("ricwiz.openSettings",()=>{b.commands.executeCommand("workbench.action.openSettings","ricwiz")}))}var b,oi=P(()=>{"use strict";b=y(require("vscode"));Lt();Ft();Ut();qt();_t();Zt();co();po();wo();bo();xo();Co();Ro();rt();Po();Eo();Mo();Lo();Fo();Oo();jo();Jo();Go();Vo();Qo();Zo();ei()});function ii(t,e,i){let o,s=le.workspace.getConfiguration("ricwiz").get("autoRefresh",!0);e?.setAutoRefresh(s),t.subscriptions.push(le.workspace.onDidChangeConfiguration(d=>{if(d.affectsConfiguration("ricwiz.autoRefresh")){let g=le.workspace.getConfiguration("ricwiz").get("autoRefresh",!0);e?.setAutoRefresh(g)}}));async function m(){let d=le.extensions.getExtension("vscode.git");if(d){let a=function(n){let r="",c;async function p(){let w=le.workspace.workspaceFolders;if(!w)return;let u=w[0].uri.fsPath,v=await j(u);if(v&&v!==r){r=v;let C=le.workspace.getConfiguration("ricwiz"),k=C.get("ticketPrefix","SFPSCA-");if(!v.includes(k)){let A=v.match(/([A-Z]+-)\d+/i);A&&(k=A[1].toUpperCase())}let S=[],T=[],B=[],z=[],L=await D.initialize(u,{skipPrompt:!0}),oe=L?.environments||C.get("environments",[{name:"Qual",sourceBranch:"quality"},{name:"Val",sourceBranch:"validation"},{name:"Prod",sourceBranch:"main"}]);try{let A=C.get("workspaceCheckoutButtons",["main","quality","validation"]);B=Array.from(new Set(A))}catch{}let Y="",me=v.match(new RegExp(`(${k}\\d+(?:-\\d+)?)`,"i"));if(me){let A=me[1].toUpperCase();Y=A;let xe=C.get("commitMessageSuffix","- "),yt=/^[A-Z]+-\d+(?:-\d+)?\s*(?:-\s*|:\s*|\s+)?/i;yt.test(n.inputBox.value)?n.inputBox.value.toUpperCase().startsWith(A)||(n.inputBox.value=n.inputBox.value.replace(yt,`${A}${xe}`)):n.inputBox.value=`${A}${xe}`+n.inputBox.value,i.text=`$(bookmark) ${A}`,i.tooltip=`Branch: ${v}
Click to open Jira ticket`,i.show();try{let xt=await wt(u,A,"");S=await ut(u,xt,A,oe,L)}catch{}}else{i.hide();try{z=await ht(u)}catch{}}let[Ge,He,ye]=await Promise.all([ft(u,10),gt(u,v,oe,L),Y?De(Y).catch(A=>{let xe=A.message;return(xe.includes("ENOTFOUND")||xe.includes("network"))&&(xe="No Internet or Invalid URL"),{summary:`\u26A0\uFE0F Jira Error: ${xe}`,description:"",status:""}}):Promise.resolve(null)]);T=Ge;let dt=ye?ye.summary:"",Pe=ye&&ye.status||"";e?.updateBranch(v,He,S,T,B,z,dt,Pe)}}function f(){e?.isAutoRefreshEnabled()&&(c&&clearTimeout(c),c=setTimeout(()=>{r="",p()},300))}o=()=>{r="",p()},p(),n.state.onDidChange(()=>f()),le.window.onDidChangeWindowState(w=>{w.focused&&f()})};var g=a;d.isActive||await d.activate();let l=d.exports.getAPI(1);l.repositories.length>0&&l.repositories.forEach(n=>a(n)),l.onDidOpenRepository(n=>a(n))}}return m(),()=>{o&&o()}}var le,ni=P(()=>{"use strict";le=y(require("vscode"));E();ue();Ue();N()});var Ke={};Ae(Ke,{activate:()=>wi,deactivate:()=>vi,webviewProvider:()=>Je});module.exports=I(Ke);function wi(t){$t(t),Je=new _e(t.extensionUri),t.subscriptions.push(qe.window.registerWebviewViewProvider("ricwiz-webview",Je));let e=qe.window.createStatusBarItem(qe.StatusBarAlignment.Left,100);e.command="ricwiz.openJiraTicket",t.subscriptions.push(e);let i=ii(t,Je,e);ti(t,Je,i)}function vi(){}var qe,Je,Ze=P(()=>{qe=y(require("vscode"));Ct();ke();oi();ni()});Ze();0&&(module.exports={activate,deactivate,webviewProvider});
