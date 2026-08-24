"use strict";var si=Object.create;var He=Object.defineProperty;var ri=Object.getOwnPropertyDescriptor;var ai=Object.getOwnPropertyNames;var ci=Object.getPrototypeOf,di=Object.prototype.hasOwnProperty;var z=(t,e,o)=>()=>{if(o)throw o[0];try{return t&&(e=t(t=0)),e}catch(s){throw o=[s],s}};var Ae=(t,e)=>{for(var o in e)He(t,o,{get:e[o],enumerable:!0})},xt=(t,e,o,s)=>{if(e&&typeof e=="object"||typeof e=="function")for(let r of ai(e))!di.call(t,r)&&r!==o&&He(t,r,{get:()=>e[r],enumerable:!(s=ri(e,r))||s.enumerable});return t};var y=(t,e,o)=>(o=t!=null?si(ci(t)):{},xt(e||!t||!t.__esModule?He(o,"default",{value:t,enumerable:!0}):o,t)),I=t=>xt(He({},"__esModule",{value:!0}),t);function R(t){return t.replace(/&/g,"&amp;").replace(/</g,"&lt;").replace(/>/g,"&gt;").replace(/"/g,"&quot;").replace(/'/g,"&#39;")}var C,Ve,kt=z(()=>{"use strict";C=y(require("vscode"));Ve=class{constructor(e){this._extensionUri=e}_extensionUri;webviewView;resolveWebviewView(e,o,s){this.webviewView=e,e.webview.options={enableScripts:!0,localResourceRoots:[this._extensionUri]},this.updateView(),e.webview.onDidReceiveMessage(r=>{switch(r.command){case"createBranches":C.commands.executeCommand("ricwiz.createBranches");break;case"createBranchForTicket":C.commands.executeCommand("ricwiz.createBranches",r.args);break;case"prepareDeploy":C.commands.executeCommand("ricwiz.prepareDeploy");break;case"openMRs":C.commands.executeCommand("ricwiz.createMergeRequests");break;case"openMRsVSCode":C.commands.executeCommand("ricwiz.createMergeRequestsVSCode");break;case"openExternal":r.args&&C.env.openExternal(C.Uri.parse(r.args));break;case"openJira":C.commands.executeCommand("ricwiz.openJiraTicket");break;case"showJiraDetails":C.commands.executeCommand("ricwiz.showJiraDetails");break;case"showPipelineLogs":C.commands.executeCommand("ricwiz.showPipelineLogs",r.args.projectPath,r.args.pipelineId);break;case"changeJiraStatus":C.commands.executeCommand("ricwiz.changeJiraStatus");break;case"addJiraComment":C.commands.executeCommand("ricwiz.addJiraComment");break;case"addJiraLabel":C.commands.executeCommand("ricwiz.addJiraLabel");break;case"setPage":this.setPage(r.args);break;case"openDashboard":C.commands.executeCommand("ricwiz.openJiraDashboard");break;case"openJiraDetailsForId":C.commands.executeCommand("ricwiz.openJiraDetailsForId",r.args);break;case"refreshDashboard":C.commands.executeCommand("ricwiz.openJiraDashboard");break;case"switchDashboardQuery":C.commands.executeCommand("ricwiz.openJiraDashboard",parseInt(r.args));break;case"toggleDashboardBranches":C.commands.executeCommand("ricwiz.toggleDashboardBranches",r.args);break;case"openJiraVSCode":C.commands.executeCommand("ricwiz.openJiraTicketVSCode");break;case"openSettings":C.commands.executeCommand("ricwiz.openSettings");break;case"checkout":r.branch&&C.commands.executeCommand("ricwiz.checkoutBranch",r.branch);break;case"copyBranch":C.commands.executeCommand("ricwiz.copyBranchName");break;case"generatePackageXml":C.commands.executeCommand("ricwiz.generatePackageXml");break;case"openDevTools":this.setPage("devtools");break;case"openMain":this.setPage("main");break;case"generateDestructiveChanges":C.commands.executeCommand("ricwiz.generateDestructiveChanges");break;case"deployPackage":C.commands.executeCommand("ricwiz.deployPackage");break;case"runSmartTests":C.commands.executeCommand("ricwiz.runSmartTests");break;case"importData":C.commands.executeCommand("ricwiz.importData");break;case"listTicketFiles":C.commands.executeCommand("ricwiz.listTicketFiles");break;case"resetTracking":C.commands.executeCommand("ricwiz.resetTracking");break;case"extractComponent":C.commands.executeCommand("ricwiz.extractComponent");break;case"deployMultiOrg":C.commands.executeCommand("ricwiz.deployMultiOrg");break;case"captureAdminChanges":C.commands.executeCommand("ricwiz.captureAdminChanges");break;case"whoToBlame":C.commands.executeCommand("ricwiz.whoToBlame");break;case"syncAll":C.commands.executeCommand("ricwiz.syncAll");break;case"updateBases":C.commands.executeCommand("ricwiz.updateBases");break;case"deleteUnused":C.commands.executeCommand("ricwiz.deleteUnusedBranches");break;case"conflict_commitAndContinue":C.commands.executeCommand("ricwiz.conflictAction","commitAndContinue");break;case"conflict_resolveDeletions":C.commands.executeCommand("ricwiz.conflictAction","resolveDeletions");break;case"conflict_abortDeploy":C.commands.executeCommand("ricwiz.conflictAction","abortDeploy");break;case"openFile":if(r.file){let p=C.workspace.workspaceFolders;if(p){let l=C.Uri.joinPath(p[0].uri,r.file);C.commands.executeCommand("vscode.open",l)}}break;case"searchTicket":C.commands.executeCommand("ricwiz.searchTicket");break;case"manualRefresh":C.commands.executeCommand("ricwiz.manualRefresh");break;case"toggleAutoRefresh":C.commands.executeCommand("ricwiz.toggleAutoRefresh");break;case"openHistory":C.commands.executeCommand("ricwiz.openHistory");break}})}conflictState=null;setConflictState(e){this.conflictState=e,this.updateView()}updateBranch(e,o,s=[],r=[],p=[],l=[],g="",m=""){this.currentBranchCache=e,this.currentBranchIsMergedCache=o,this.relatedBranchesCache=s,this.commitsCache=r,this.baseBranchesCache=p,this.recentTicketsCache=l,this.ticketTitleCache=g,this.ticketStatusCache=m,this.webviewView&&this.updateView()}currentBranchCache="";currentBranchIsMergedCache=!1;relatedBranchesCache=[];commitsCache=[];baseBranchesCache=[];recentTicketsCache=[];ticketTitleCache="";ticketStatusCache="";currentPage="main";blameDataCache=null;jiraDataCache=null;dashboardDataCache=null;dashboardShowBranches=!1;autoRefreshEnabled=!0;setDashboardShowBranches(e){this.dashboardShowBranches=e}getDashboardShowBranches(){return this.dashboardShowBranches}setBlameData(e){this.blameDataCache=e}setJiraData(e){this.jiraDataCache=e}setDashboardData(e){this.dashboardDataCache=e}setAutoRefresh(e){this.autoRefreshEnabled=e,this.updateView()}isAutoRefreshEnabled(){return this.autoRefreshEnabled}setPage(e){this.currentPage=e,this.updateView()}updateView(){if(!this.webviewView)return;let e=this.webviewView.webview.asWebviewUri(C.Uri.joinPath(this._extensionUri,"resources","logo.png"));this.webviewView.webview.html=this._getHtmlForWebview(e,this.currentBranchCache,this.relatedBranchesCache,this.commitsCache,this.baseBranchesCache,this.recentTicketsCache,this.currentPage)}_getHtmlForWebview(e,o,s,r,p,l,g){let m=r.length>0?`
            <div class="separator"></div>
            <div style="padding: 0 4px;">
                <div style="font-size: 11px; opacity: 0.7; margin-bottom: 6px; display: flex; align-items: center; gap: 4px;">
                    <span>\u{1F4DC}</span> Recent Commits
                </div>
                <div style="display: flex; flex-direction: column; gap: 2px;">
                    ${r.map(c=>`
                        <div style="font-size: 11px; padding: 3px 4px; border-radius: 2px; display: flex; gap: 6px; align-items: baseline;">
                            <code style="color: var(--vscode-textLink-foreground); font-size: 10px; flex-shrink: 0;">${R(c.hash)}</code>
                            <span style="flex: 1; overflow: hidden; text-overflow: ellipsis; white-space: nowrap;" title="${R(c.message)}">${R(c.message)}</span>
                            <span style="font-size: 9px; opacity: 0.5; flex-shrink: 0;">${R(c.timeAgo)}</span>
                        </div>
                    `).join("")}
                </div>
            </div>
        `:"",a=`
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
        `;if(this.conflictState){let c=(this.conflictState.files||[]).map(w=>`
                <button class="btn" style="padding: 6px; font-size: 12px; display: flex; justify-content: space-between; align-items: center;" onclick="sendOpenFileCommand('${R(w.file)}')">
                    <span style="flex: 1; overflow: hidden; text-overflow: ellipsis; white-space: nowrap; direction: rtl; text-align: left;">&lrm;${R(w.file)}</span>
                    <span style="font-size: 10px; opacity: 0.8; flex-shrink: 0; background-color: var(--vscode-badge-background); color: var(--vscode-badge-foreground); padding: 2px 4px; border-radius: 2px;">${R(w.state)}</span>
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
                    <div style="font-size: 14px; font-weight: bold; margin-bottom: 8px;">\u26A0\uFE0F MERGE CONFLICT</div>
                    <div style="font-size: 11px; margin-bottom: 12px; opacity: 0.9;">
                        Merging <b>${R(this.conflictState.sourceStr)}</b> into <b>${R(this.conflictState.targetStr)}</b>.<br/>
                        Resolve the conflicts, then click below.
                    </div>
                    <div style="display: flex; flex-direction: column; gap: 6px;">
                        <button class="btn" style="background-color: var(--vscode-button-background); color: var(--vscode-button-foreground); justify-content: center;" onclick="sendCommand('conflict_commitAndContinue')">
                            \u2705 Commit & Continue
                        </button>
                        ${this.conflictState.deletionsCount>0?`
                            <button class="btn" style="background-color: var(--vscode-button-secondaryBackground); color: var(--vscode-button-secondaryForeground); justify-content: center;" onclick="sendCommand('conflict_resolveDeletions')">
                                \u{1F5D1}\uFE0F Resolve Deletions (${this.conflictState.deletionsCount})
                            </button>
                        `:""}
                        <button class="btn" style="background-color: var(--vscode-button-secondaryBackground); color: var(--vscode-button-secondaryForeground); justify-content: center;" onclick="sendCommand('conflict_abortDeploy')">
                            \u274C Abort Deploy
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
                    function sendCommand(cmd, args) {
                    vscode.postMessage({ command: cmd, args: args });
                }
                    function sendOpenFileCommand(file) { vscode.postMessage({ command: 'openFile', file: file }); }
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
                    <button class="btn" style="width: auto; padding: 4px 8px; background-color: var(--vscode-button-secondaryBackground); color: var(--vscode-button-secondaryForeground);" onclick="sendCommand('openDevTools')">\u2190 Back</button>
                    <div style="font-weight: bold; font-size: 13px; flex: 1; text-align: center;">Who to Blame</div>
                </div>

                ${c?`
                <div style="padding: 12px; background: var(--vscode-editor-background); border: 1px solid var(--vscode-widget-border); border-radius: 6px; margin-bottom: 12px;">
                    <div style="font-weight: bold; margin-bottom: 12px; font-size: 14px; text-align: center; color: var(--vscode-textLink-foreground); word-break: break-all;">
                        \u{1F4C4} ${c.fileName}
                    </div>


                    <div style="margin-bottom: 20px;">
                        <div style="font-size: 11px; font-weight: bold; opacity: 0.8; text-transform: uppercase; margin-bottom: 8px;"><span class="icon">\u{1F4BB}</span> Local Git (Last Commits)</div>
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
                        <div style="font-size: 11px; font-weight: bold; opacity: 0.8; text-transform: uppercase; margin-bottom: 8px;"><span class="icon">\u2601\uFE0F</span> Salesforce Metadata</div>
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
                        <div style="font-size: 11px; font-weight: bold; opacity: 0.8; text-transform: uppercase; margin-bottom: 8px;"><span class="icon">\u{1F575}\uFE0F</span> Setup Audit Trail (Recent)</div>
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
                    function sendCommand(cmd, args) {
                    vscode.postMessage({ command: cmd, args: args });
                }
                </script>
            </body>
            </html>`}if(g==="jira"){let c=this.jiraDataCache,w=c?.ticketId||"Jira",v=c?.summary||"No Title",b=c?.description||"No description provided.",k=c?.relatedBranches||[];return`<!DOCTYPE html>
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
                    <button class="icon-button" onclick="sendCommand('setPage', 'main')" style="font-weight: bold; font-size: 16px;" title="Back">\u2B05\uFE0F</button>
                    <span style="font-weight: 600; font-size: 13px;">${w} Details</span>
                </div>
                
                <div class="card" style="padding: 16px;">
                    <div class="jira-title">${R(v)}</div>
                    <div class="jira-desc">${R(b)}</div>
                    
                    ${k.length>0?`
                        <div style="margin-top: 16px; border-top: 1px solid var(--vscode-panel-border); padding-top: 12px;">
                            <div style="font-size: 11px; opacity: 0.7; margin-bottom: 8px; text-transform: uppercase; font-weight: bold;"><span class="icon">\u{1F33F}</span> Related Branches & MRs</div>
                            <div style="display: flex; flex-direction: column; gap: 4px;">
                                ${k.map(B=>{let F="";B.pipelineStatus==="running"?F="\u23F3":B.pipelineStatus==="success"?F="\u2705":B.pipelineStatus==="failed"?F="\u274C":B.pipelineStatus==="canceled"?F="\u{1F6D1}":B.pipelineStatus==="skipped"&&(F="\u23ED\uFE0F");let T="";return B.pipelineStatus==="failed"&&B.projectPath&&B.pipelineId&&(T=`onclick="event.stopPropagation(); sendCommand('showPipelineLogs', { projectPath: '${B.projectPath}', pipelineId: ${B.pipelineId} });" style="cursor: pointer;"`),`
                                    <div class="btn" style="padding: 6px 10px; font-size: 12px; display: flex; justify-content: space-between; align-items: center; background-color: var(--vscode-button-secondaryBackground); color: var(--vscode-button-secondaryForeground); border-radius: 4px;" onclick="sendCheckoutCommand('${R(B.name)}')" title="Checkout ${R(B.name)}">
                                        <div style="display: flex; align-items: center; gap: 6px; overflow: hidden;">
                                            <span style="overflow: hidden; text-overflow: ellipsis; white-space: nowrap; font-weight: bold;">${R(B.name)}</span>
                                        </div>
                                        <div style="display: flex; gap: 6px; align-items: center;">
                                            ${F?`<span title="Pipeline: ${B.pipelineStatus}" style="font-size: 11px;" ${T}>${F}</span>`:""}
                                            ${B.mrUrl?`<span onclick="event.stopPropagation(); sendCommand('openExternal', '${B.mrUrl}');" title="Open Merge Request" style="cursor: pointer; font-size: 12px;">\u{1F517}</span>`:""}
                                            ${B.isMerged?'<span style="background-color: var(--vscode-charts-green); color: white; border-radius: 3px; padding: 2px 6px; font-size: 10px; font-weight: bold;" title="Merged to target env">MERGED</span>':""}
                                        </div>
                                    </div>
                                    `}).join("")}
                            </div>
                        </div>
                    `:""}
                    
                <div style="display: flex; gap: 4px; margin-top: 16px;">
                    <button class="btn" style="flex: 1; background-color: var(--vscode-button-secondaryBackground); border-radius: 4px;" onclick="sendCommand('changeJiraStatus')">
                        <span class="icon">\u{1F504}</span> Change Status
                    </button>
                    <button class="btn" style="flex: 1; background-color: var(--vscode-button-secondaryBackground); border-radius: 4px;" onclick="sendCommand('addJiraComment')">
                        <span class="icon">\u{1F4AC}</span> Add Comment
                    </button>
                    <button class="btn" style="flex: 1; background-color: var(--vscode-button-secondaryBackground); border-radius: 4px;" onclick="sendCommand('addJiraLabel')">
                        <span class="icon">\u{1F3F7}\uFE0F</span> Add Label
                    </button>
                    ${c?.url?`
                    <button class="btn" style="flex: 1; background-color: var(--vscode-button-secondaryBackground); border-radius: 4px;" onclick="sendCommand('openExternal', '${c.url}')">
                        <span class="icon">\u{1F310}</span> Open Browser
                    </button>
                    `:""}
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
            </html>`}if(g==="dashboard"){let c=this.dashboardDataCache||{queries:[],selectedIndex:0,results:[],error:null},w=c.queries.map((b,k)=>`
                <option value="${k}" ${k===c.selectedIndex?"selected":""}>${R(b.name)}</option>
            `).join(""),v=c.error?`
                <div style="color: var(--vscode-errorForeground); padding: 12px; text-align: center; background: var(--vscode-editorError-background); border-radius: 4px;">
                    \u26A0\uFE0F ${R(c.error)}
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
                        ${c.results.map(b=>`
                            <tr style="border-bottom: ${b.detailedBranches&&b.detailedBranches.length>0?"none":"1px solid var(--vscode-panel-border)"}; cursor: pointer;" class="tr-hover" onclick="sendCommand('openJiraDetailsForId', '${R(b.key)}')">
                                <td style="padding: 6px; font-weight: bold; color: var(--vscode-textLink-foreground); white-space: nowrap;">${R(b.key)}</td>
                                <td style="padding: 6px; overflow: hidden; text-overflow: ellipsis; max-width: 150px; white-space: nowrap;" title="${R(b.summary)}">${R(b.summary)}</td>
                                <td style="padding: 6px; white-space: nowrap;">
                                    <span style="background: var(--vscode-badge-background); color: var(--vscode-badge-foreground); padding: 2px 4px; border-radius: 3px; font-size: 9px;">${R(b.status)}</span>
                                </td>
                                <td style="padding: 6px; white-space: nowrap; text-align: center;">
                                    ${b.detailedBranches?"":b.branch?`
                                        <button class="icon-button" style="background-color: var(--vscode-button-secondaryBackground); color: var(--vscode-button-secondaryForeground); font-size: 10px; padding: 2px 6px;" title="Checkout ${R(b.branch)}" onclick="event.stopPropagation(); sendCommand('checkout', { branch: '${R(b.branch)}' })">
                                            \u{1F33F} Checkout
                                        </button>
                                    `:`
                                        <button class="icon-button" style="background-color: var(--vscode-button-background); color: var(--vscode-button-foreground); font-size: 10px; padding: 2px 6px;" title="Create Branch for ${R(b.key)}" onclick="event.stopPropagation(); sendCommand('createBranchForTicket', '${R(b.key)}')">
                                            \u2795 Create
                                        </button>
                                    `}
                                </td>
                            </tr>
                            ${b.detailedBranches&&b.detailedBranches.length>0?`
                            <tr style="border-bottom: 1px solid var(--vscode-panel-border);">
                                <td colspan="4" style="padding: 0 6px 8px 6px;">
                                    <div style="display: flex; flex-direction: column; gap: 4px; padding-left: 8px; border-left: 2px solid var(--vscode-editorIndentGuide-activeBackground1);">
                                        ${b.detailedBranches.map(k=>{let B="";k.pipelineStatus==="running"?B="\u23F3":k.pipelineStatus==="success"?B="\u2705":k.pipelineStatus==="failed"?B="\u274C":k.pipelineStatus==="canceled"&&(B="\u{1F6D1}");let F="";return k.pipelineStatus==="failed"&&k.projectPath&&k.pipelineId&&(F=`onclick="event.stopPropagation(); sendCommand('showPipelineLogs', { projectPath: '${k.projectPath}', pipelineId: ${k.pipelineId} });" style="cursor: pointer;"`),`
                                            <div style="display: flex; justify-content: space-between; align-items: center; font-size: 10px; background: var(--vscode-editor-background); padding: 2px 6px; border-radius: 3px;">
                                                <div style="display: flex; align-items: center; gap: 6px; overflow: hidden; cursor: pointer; flex: 1;" onclick="sendCheckoutCommand('${R(k.name)}')" title="Checkout ${R(k.name)}">
                                                    <span style="overflow: hidden; text-overflow: ellipsis; white-space: nowrap;">${R(k.name)}</span>
                                                    ${B?`<span title="Pipeline: ${k.pipelineStatus}" ${F}>${B}</span>`:""}
                                                </div>
                                                <div style="display: flex; gap: 6px; align-items: center;">
                                                    ${k.mrUrl?`<span onclick="event.stopPropagation(); sendCommand('openExternal', '${k.mrUrl}');" title="Open Merge Request" style="cursor: pointer;">\u{1F517}</span>`:""}
                                                    ${k.isMerged?'<span style="background-color: var(--vscode-charts-green); color: white; border-radius: 3px; padding: 1px 4px; font-size: 8px; font-weight: bold;">MERGED</span>':""}
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
                    <button class="icon-button" onclick="sendCommand('setPage', 'main')" style="font-weight: bold; font-size: 16px;" title="Back">\u2B05\uFE0F</button>
                    <span style="font-weight: 600; font-size: 13px; flex: 1;">Ticket Dashboard</span>
                    <button class="icon-button" onclick="sendCommand('refreshDashboard')" title="Refresh">\u{1F504}</button>
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
                    ${v}
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
                    <button class="btn" style="width: auto; padding: 4px 8px; background-color: var(--vscode-button-secondaryBackground); color: var(--vscode-button-secondaryForeground);" onclick="sendCommand('openMain')">\u2190 Back</button>
                    <div style="font-weight: bold; font-size: 13px; flex: 1; text-align: center;">Developer Utilities</div>
                </div>

                <div style="display: flex; flex-direction: column; gap: 8px;">
                    <button class="btn" title="Generate Salesforce package.xml from git diff" onclick="sendCommand('generatePackageXml')">
                        <span class="icon">\u{1F4E6}</span> Auto Package.xml
                    </button>
                    
                    <button class="btn" title="Generate destructiveChanges.xml for deleted files" onclick="sendCommand('generateDestructiveChanges')">
                        <span class="icon">\u{1F5D1}\uFE0F</span> Auto DestructiveChanges
                    </button>
        
                    <button class="btn" title="Deploy the generated package to Salesforce" onclick="sendCommand('deployPackage')">
                        <span class="icon">\u2601\uFE0F</span> Deploy Package
                    </button>

                    <button class="btn" title="Smart run modified Apex Test classes" onclick="sendCommand('runSmartTests')">
                        <span class="icon">\u{1F9EA}</span> Smart Test Runner
                    </button>

                    <button class="btn" title="Import data using Salesforce CLI" onclick="sendCommand('importData')">
                        <span class="icon">\u{1F4E5}</span> Import Data
                    </button>

                    <div class="separator" style="margin: 4px 0;"></div>

                    <button class="btn" title="Find and group all files modified in a specific ticket" onclick="sendCommand('listTicketFiles')">
                        <span class="icon">\u{1F5C2}\uFE0F</span> List Ticket Files
                    </button>

                    <button class="btn" title="Reset Salesforce source tracking" onclick="sendCommand('resetTracking')">
                        <span class="icon">\u{1F9F9}</span> Reset Tracking
                    </button>

                    <button class="btn" title="Extract metadata components quickly from Salesforce" onclick="sendCommand('extractComponent')">
                        <span class="icon">\u2601\uFE0F</span> Extract Component
                    </button>

                    <button class="btn" title="Deploy the current open file to multiple orgs simultaneously" onclick="sendCommand('deployMultiOrg')">
                        <span class="icon">\u{1F680}</span> Deploy to Multi-Org
                    </button>

                    <button class="btn" title="Capture admin changes safely" onclick="sendCommand('captureAdminChanges')">
                        <span class="icon">\u{1F575}\uFE0F</span> Capture Admin Changes
                    </button>
                    
                    <button class="btn" title="Discover who last modified the current file in Git and Salesforce" onclick="sendCommand('whoToBlame')" style="background-color: var(--vscode-button-hoverBackground);">
                        <span class="icon">\u{1F50D}</span> Who to Blame
                    </button>
                </div>
                
                <script>
                    const vscode = acquireVsCodeApi();
                    function sendCommand(cmd, args) {
                    vscode.postMessage({ command: cmd, args: args });
                }
                </script>
            </body>
            </html>`;let i=s.find(c=>c.name===o),n="";i&&(i.pipelineStatus==="running"?n="\u23F3":i.pipelineStatus==="success"?n="\u2705":i.pipelineStatus==="failed"?n="\u274C":i.pipelineStatus==="canceled"?n="\u{1F6D1}":i.pipelineStatus==="skipped"&&(n="\u23ED\uFE0F"));let d=i?i.mrUrl:void 0,u=s.filter(c=>c.name!==o),f=o?`<div style="background-color: var(--vscode-editor-inactiveSelectionBackground); padding: 10px; border-radius: 6px; margin-bottom: 16px; border: 1px solid var(--vscode-panel-border); box-shadow: 0 2px 4px rgba(0,0,0,0.1); position: relative;">
                    ${this.ticketTitleCache&&this.ticketStatusCache?`
                    <div style="position: absolute; top: 6px; right: 6px; z-index: 10; cursor: pointer; font-size: 9px; padding: 2px 6px; border-radius: 4px; background-color: var(--vscode-button-secondaryBackground); border: 1px solid var(--vscode-panel-border); opacity: 0.9; font-weight: bold; text-transform: uppercase; display: flex; align-items: center; gap: 4px;" onclick="sendCommand('changeJiraStatus')" title="Update Jira Status">
                        <span>\u{1F4DD}</span> ${R(this.ticketStatusCache)}
                    </div>
                    `:""}
                    <div style="font-size: 10px; opacity: 0.7; margin-bottom: 4px; display: flex; align-items: center; justify-content: center; gap: 4px; text-transform: uppercase;">
                        Current Ticket / Branch
                        <button class="copy-btn" onclick="sendCommand('copyBranch')" title="Copy branch name to clipboard">\u{1F4CB}</button>
                    </div>
                    <div style="font-weight: bold; font-size: 14px; word-break: break-all; text-align: center; color: var(--vscode-textLink-foreground); display: flex; justify-content: center; align-items: center; gap: 6px;">
                        ${R(o)} 
                        ${n?`<span title="Pipeline: ${i.pipelineStatus}" style="font-size: 12px;">${n}</span>`:""}
                        ${d?`<span onclick="event.stopPropagation(); sendCommand('openExternal', '${d}');" title="Open Merge Request" style="cursor: pointer; font-size: 12px;">\u{1F517}</span>`:""}
                        ${this.currentBranchIsMergedCache?'<span style="background-color: var(--vscode-charts-green); color: white; border-radius: 3px; padding: 1px 4px; font-size: 10px; font-weight: bold;" title="Merged to target env">MERGED</span>':""}
                    </div>
                    ${this.ticketTitleCache?`<div style="font-size: 12px; margin-top: 6px; text-align: center; opacity: 0.9; font-style: italic;">${R(this.ticketTitleCache)}</div>`:""}
                    ${u.length>0?`
                        <div style="margin-top: 10px; border-top: 1px solid var(--vscode-panel-border); padding-top: 10px;">
                            <div style="font-size: 10px; opacity: 0.7; margin-bottom: 6px; text-transform: uppercase; text-align: center;">Sister Branches</div>
                            <div style="display: flex; flex-direction: column; gap: 4px;">
                                ${u.map(c=>{let w="";c.pipelineStatus==="running"?w="\u23F3":c.pipelineStatus==="success"?w="\u2705":c.pipelineStatus==="failed"?w="\u274C":c.pipelineStatus==="canceled"?w="\u{1F6D1}":c.pipelineStatus==="skipped"&&(w="\u23ED\uFE0F");let v="";return c.pipelineStatus==="failed"&&c.projectPath&&c.pipelineId&&(v=`onclick="event.stopPropagation(); sendCommand('showPipelineLogs', { projectPath: '${c.projectPath}', pipelineId: ${c.pipelineId} });" style="cursor: pointer;"`),`
                                    <div class="btn" style="padding: 4px 8px; font-size: 11px; display: flex; justify-content: space-between; align-items: center; background-color: var(--vscode-button-secondaryBackground); color: var(--vscode-button-secondaryForeground); border-radius: 4px;" onclick="sendCheckoutCommand('${R(c.name)}', this)" title="Checkout ${R(c.name)}">
                                        <div style="display: flex; align-items: center; gap: 4px; overflow: hidden;">
                                            <span style="overflow: hidden; text-overflow: ellipsis; white-space: nowrap; font-weight: bold;">${R(c.name)}</span>
                                        </div>
                                        <div style="display: flex; gap: 4px; align-items: center;">
                                            ${w?`<span title="Pipeline: ${c.pipelineStatus}" style="font-size: 10px;" ${v}>${w}</span>`:""}
                                            ${c.mrUrl?`<span onclick="event.stopPropagation(); sendCommand('openExternal', '${c.mrUrl}');" title="Open Merge Request" style="cursor: pointer; font-size: 10px;">\u{1F517}</span>`:""}
                                            ${c.isMerged?'<span style="background-color: var(--vscode-charts-green); color: white; border-radius: 3px; padding: 1px 4px; font-size: 9px; font-weight: bold;" title="Merged to target env">MERGED</span>':""}
                                        </div>
                                    </div>
                                    `}).join("")}
                            </div>
                        </div>
                    `:l.length>0?`
                        <div style="margin-top: 10px; border-top: 1px solid var(--vscode-panel-border); padding-top: 10px;">
                            <div style="font-size: 10px; opacity: 0.7; margin-bottom: 6px; text-transform: uppercase; text-align: center;">Recent Tickets</div>
                            <div style="display: flex; flex-direction: column; gap: 4px;">
                                ${l.map(c=>`
                                    <div class="btn" style="padding: 4px 8px; font-size: 11px; display: flex; align-items: center; background-color: var(--vscode-button-secondaryBackground); color: var(--vscode-button-secondaryForeground); border-radius: 4px;" onclick="sendCheckoutCommand('${R(c)}', this)" title="Checkout ${R(c)}">
                                        <span style="font-weight: bold;">${R(c)}</span>
                                    </div>
                                `).join("")}
                            </div>
                        </div>
                    `:""}
                    <div style="display: flex; gap: 6px; margin-top: 10px; justify-content: center;">
                        <button class="btn" style="width: auto; padding: 4px 8px; font-size: 11px; background-color: var(--vscode-button-secondaryBackground); border-radius: 4px;" onclick="sendCommand('showJiraDetails')" title="View Jira Details">
                            <span class="icon" style="font-size: 12px; margin-right: 4px;">\u{1F3AB}</span> Jira Details
                        </button>
                        <button class="btn" style="width: auto; padding: 4px 8px; font-size: 11px; background-color: var(--vscode-button-secondaryBackground); border-radius: 4px;" onclick="sendCommand('openDashboard')" title="View Ticket Dashboard">
                            <span class="icon" style="font-size: 12px; margin-right: 4px;">\u{1F4CA}</span> Dashboard
                        </button>
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
                <button class="btn" style="flex: 1; justify-content: center; background-color: var(--vscode-button-secondaryBackground); border: 1px solid var(--vscode-panel-border); border-radius: 4px;" title="Developer Utilities" onclick="sendCommand('openDevTools')">
                    <span class="icon">\u{1F6E0}\uFE0F</span> Dev Tools
                </button>
                <button class="btn" style="flex: 1; justify-content: center; background-color: var(--vscode-button-secondaryBackground); border: 1px solid var(--vscode-panel-border); border-radius: 4px;" title="Extension Settings" onclick="sendCommand('openSettings')">
                    <span class="icon">\u2699\uFE0F</span> Settings
                </button>
            </div>

            <div style="display: flex; align-items: center; justify-content: space-between; margin-bottom: 6px; padding: 0 4px;">
                <div style="font-size: 11px; font-weight: bold; opacity: 0.8; text-transform: uppercase;">Workspace</div>
                <div style="display: flex; gap: 4px;">
                    <button class="copy-btn" onclick="sendCommand('manualRefresh')" title="Refresh branch status" style="font-size: 13px; padding: 2px 6px; opacity: 0.8; border: 1px solid var(--vscode-panel-border);">
                        \u{1F504}
                    </button>
                    <button class="copy-btn" id="autoRefreshToggle" onclick="sendCommand('toggleAutoRefresh')" title="${this.autoRefreshEnabled?"Auto-refresh is ON \u2014 click to disable":"Auto-refresh is OFF \u2014 click to enable"}" style="font-size: 11px; padding: 2px 6px; border-radius: 3px; border: 1px solid var(--vscode-panel-border); ${this.autoRefreshEnabled?"opacity: 0.9; background-color: var(--vscode-button-secondaryBackground);":"opacity: 0.5;"}">
                        ${this.autoRefreshEnabled?"\u26A1 Auto":"\u23F8\uFE0F Auto"}
                    </button>
                </div>
            </div>

            ${f}


            ${p.length>0?`
                <div style="display: flex; gap: 4px; margin-bottom: 16px; flex-wrap: wrap; justify-content: center;">
                    ${p.map(c=>{let w=c.split("/").pop()?.toUpperCase()||c.toUpperCase();return`
                        <button class="btn" style="flex: 1; min-width: 25%; justify-content: center; padding: 6px 4px; font-size: 10px; font-weight: bold; background-color: var(--vscode-button-secondaryBackground); color: var(--vscode-button-secondaryForeground); border-radius: 4px;" onclick="sendCheckoutCommand('${R(c)}', this)" title="Checkout ${R(c)}">
                            ${R(w)}
                        </button>
                    `}).join("")}
                </div>
            `:""}

            <!-- PRIMARY ACTIONS CARD -->
            <div style="background-color: var(--vscode-editor-inactiveSelectionBackground); padding: 10px; border-radius: 6px; margin-bottom: 16px; border: 1px solid var(--vscode-panel-border); box-shadow: 0 2px 4px rgba(0,0,0,0.1);">
                <div style="font-size: 10px; opacity: 0.7; margin-bottom: 10px; text-transform: uppercase; font-weight: bold; text-align: center;">Ticket Workflow</div>
                
                <button class="btn" style="background-color: var(--vscode-button-background); color: var(--vscode-button-foreground); font-weight: bold; margin-bottom: 6px; border-radius: 4px; padding: 8px;" title="Generates the main and environment branches" onclick="sendCommand('createBranches')">
                    <span class="icon">\u{1F33F}</span> Create Branches
                </button>

                <button class="btn" style="background-color: var(--vscode-button-secondaryBackground); margin-bottom: 6px; border-radius: 4px;" title="Sync environments and merge ticket" onclick="sendCommand('prepareDeploy')">
                    <span class="icon">\u{1F500}</span> Prepare Deploy
                </button>

                <div style="display: flex; gap: 4px; margin-bottom: 6px;">
                    <button class="btn" style="flex: 1; background-color: var(--vscode-button-secondaryBackground); border-radius: 4px;" title="Opens Merge Request pages in Browser" onclick="sendCommand('openMRs')">
                        <span class="icon">\u{1F680}</span> Open MRs
                    </button>
                    <button class="btn" style="width: auto; padding: 6px 12px; font-weight: bold; justify-content: center; background-color: var(--vscode-button-secondaryBackground); border-radius: 4px;" title="Open MRs in VS Code" onclick="sendCommand('openMRsVSCode')">
                        VS
                    </button>
                </div>

                <button class="btn" style="background-color: var(--vscode-button-secondaryBackground); border-radius: 4px;" title="Open Jira Ticket in Browser" onclick="sendCommand('openJira')">
                    <span class="icon">\u{1F3AB}</span> Open Jira
                </button>
            </div>

            <!-- SECONDARY ACTIONS CARD -->
            <div style="background-color: var(--vscode-editor-inactiveSelectionBackground); padding: 10px; border-radius: 6px; margin-bottom: 12px; border: 1px solid var(--vscode-panel-border); box-shadow: 0 2px 4px rgba(0,0,0,0.1);">
                <div style="font-size: 10px; opacity: 0.7; margin-bottom: 10px; text-transform: uppercase; font-weight: bold; text-align: center;">Git Operations</div>
                
                <button class="btn" style="margin-bottom: 6px; background-color: var(--vscode-button-secondaryBackground); border-radius: 4px;" title="Fetch and pull all branches of the current ticket" onclick="sendCommand('syncAll')">
                    <span class="icon">\u{1F504}</span> Sync All
                </button>

                <button class="btn" style="margin-bottom: 6px; background-color: var(--vscode-button-secondaryBackground); border-radius: 4px;" title="Merge latest team changes from origin base into environment branches" onclick="sendCommand('updateBases')">
                    <span class="icon">\u23EC</span> Update from Base
                </button>

                <button class="btn" style="background-color: var(--vscode-button-secondaryBackground); border-radius: 4px;" title="Delete all branches of a ticket (local and remote)" onclick="sendCommand('deleteUnused')">
                    <span class="icon">\u{1F5D1}\uFE0F</span> Delete Unused Branches
                </button>
            </div>

            ${m}
            
            <script>
                const vscode = acquireVsCodeApi();
                function sendCommand(cmd, args) {
                    vscode.postMessage({ command: cmd, args: args });
                }
                function sendCheckoutCommand(branchName, element) {
                    if (element) {
                        element.style.opacity = '0.5';
                        element.innerHTML = '\u23F3 Checking out...';
                        element.style.pointerEvents = 'none';
                    }
                    vscode.postMessage({ command: 'checkout', branch: branchName });
                }
            </script>
        </body>
        </html>`}}});function Ct(t){me=t.secrets}async function $t(t){if(!me)throw new Error("SecretStorage is not initialized.");await me.store("ricwiz.jiraApiToken",t)}async function Rt(){if(!me)throw new Error("SecretStorage is not initialized.");return await me.get("ricwiz.jiraApiToken")}async function zt(t){if(!me)throw new Error("SecretStorage is not initialized.");await me.store("ricwiz.gitlabApiToken",t)}async function Ie(){if(!me)throw new Error("SecretStorage is not initialized.");return await me.get("ricwiz.gitlabApiToken")}var me,ke=z(()=>{"use strict"});var Te={};Ae(Te,{checkBranchExists:()=>we,checkRemoteBranchExists:()=>Et,exec:()=>h,extractTicketSuggestion:()=>Ee,getCurrentBranch:()=>j,getWorkspaceCwd:()=>x,normalizeTicketId:()=>Bt,promptForTicketId:()=>H,resolvePrefix:()=>Be,ricwizLogger:()=>U});function x(){let t=Se.workspace.workspaceFolders;if(t)return t[0].uri.fsPath}async function j(t){try{let{stdout:e}=await h("git branch --show-current",{cwd:t});return e.trim()}catch{return""}}function Be(t,e){if(!t.includes(e)){let o=t.match(/([A-Z]+-)\d+/i);if(o)return o[1].toUpperCase()}return e}function Ee(t,e,o=!1){let s=t.match(new RegExp(`(${e}\\d+)`,"i"));return s?s[1].toUpperCase():t.includes(e)&&!t.includes("-to-")?t.substring(t.indexOf(e)):o&&t.includes("-to-")?t.substring(t.indexOf(e)).split("-to-")[0]:""}function Bt(t,e){let o=t.trim();return/^\d/.test(o)?`${e}${o}`.toUpperCase():o.toUpperCase()}async function H(t,e){let o=Se.workspace.getConfiguration("ricwiz"),s=e?.prefix??o.get("ticketPrefix","SFPSCA-"),r=await j(t),p=Be(r,s),l=e?.suggestedValue??Ee(r,p,e?.handleToSuffix),g=await Se.window.showInputBox({prompt:e?.prompt||"Enter the full ticket ID (e.g., SCPSCA-1234) or just the number",placeHolder:e?.placeHolder||"Ticket ID or number",value:l});return g?{ticketId:Bt(g,p),currentBranch:r,prefix:p}:void 0}async function we(t,e){try{return await h(`git show-ref --verify --quiet refs/heads/${e}`,{cwd:t}),!0}catch{}return await Et(t,e)}async function Et(t,e){try{let{stdout:o}=await h(`git branch -r --list "*/${e}"`,{cwd:t});return o.trim().length>0}catch{return!1}}var Se,Pt,St,li,U,h,P=z(()=>{"use strict";Se=y(require("vscode")),Pt=y(require("child_process")),St=y(require("util")),li=St.promisify(Pt.exec),U=Se.window.createOutputChannel("Ricwiz"),h=async(t,e)=>{U.appendLine(`[EXEC] ${t}`);let o=await li(t,{maxBuffer:50*1024*1024,...e});return{stdout:o.stdout.toString(),stderr:o.stderr.toString()}}});var ct={};Ae(ct,{WorkflowContext:()=>M});var Fe,Tt,_e,M,N=z(()=>{"use strict";Fe=y(require("vscode")),Tt=y(require("path")),_e=y(require("fs")),M=class t{style;upstreamRemote;originRemote;ticketSourceBranch;ticketPrefix;branchPrefix;environments;static baseConfig=Fe.workspace.getConfiguration("ricwiz");activeProfile;profileName;constructor(e){this.activeProfile=e,this.profileName=e?.name;let o=t.baseConfig;this.style=e?.workflowStyle||o.get("workflowStyle","standard"),this.style==="multi-remote"?(this.upstreamRemote=e?.upstreamRemote||o.get("upstreamRemote","salesforce-master"),this.originRemote=e?.originRemote||o.get("originRemote","origin")):(this.upstreamRemote="origin",this.originRemote="origin"),this.ticketSourceBranch=e?.ticketSourceBranch||o.get("ticketSourceBranch","main"),this.ticketPrefix=e?.ticketPrefix||o.get("ticketPrefix","SFPSCA-"),this.branchPrefix=e?.branchPrefix??o.get("branchPrefix","");let s=[{name:"Qual",sourceBranch:"quality"},{name:"Val",sourceBranch:"validation"},{name:"Prod",sourceBranch:"main"}];this.environments=e?.environments||o.get("environments",s)}getConfig(e,o){return this.activeProfile&&this.activeProfile[e]!==void 0?this.activeProfile[e]:t.baseConfig.get(e,o)}static async initialize(e,o){let s=t.baseConfig.get("profiles",[]),r=Tt.join(e,"ricwiz.json");if(_e.existsSync(r))try{let p=_e.readFileSync(r,"utf-8"),l=JSON.parse(p);l&&Array.isArray(l.profiles)&&(s=[...s,...l.profiles])}catch(p){Fe.window.showErrorMessage(`Ricwiz: Error parsing ricwiz.json: ${p.message}`)}if(s.length>0){if(!o?.forcePrompt)try{let{exec:m}=(P(),I(Te)),{stdout:a}=await m("git branch --show-current",{cwd:e}),i=a.trim(),n=i;i.includes("-to-")&&(n=i.split("-to-")[0]);let{stdout:d}=await m(`git config branch.${n}.ricwiz-profile`,{cwd:e}),u=d.trim();if(u){let f=s.find(c=>c.name===u);if(f)return new t(f)}}catch{}if(o?.skipPrompt)return new t;let p=s.map(m=>m.name),l=await Fe.window.showQuickPick(p,{placeHolder:"Ricwiz: Select Workflow Profile",ignoreFocusOut:!0});if(!l)return;let g=s.find(m=>m.name===l);return new t(g)}return new t}buildUpstreamPath(e){return e.includes("/")?e:`${this.upstreamRemote}/${e}`}getFetchRemote(e){return e.includes("/")?e.split("/")[0]:this.upstreamRemote}getFetchBranch(e){return e.includes("/")?e.substring(e.indexOf("/")+1):e}}});async function Mt(){let t=x();if(!t){V.window.showErrorMessage("Ricwiz: Open a workspace that is a Git repository.");return}let e=await M.initialize(t,{skipPrompt:!0}),o=e?e.ticketSourceBranch:V.workspace.getConfiguration("ricwiz").get("ticketSourceBranch","main"),s=e?e.originRemote:"origin";await V.window.withProgress({location:V.ProgressLocation.Notification,title:`Ricwiz: Finding deleted files compared to ${s}/${o}...`,cancellable:!1},async()=>{try{let{stdout:r}=await h(`git diff --name-only --diff-filter=D ${s}/${o}...HEAD`,{cwd:t}),p=r.split(`
`).map(u=>u.trim()).filter(u=>u.length>0);if(p.length===0){V.window.showInformationMessage(`Ricwiz: No deleted files found compared to ${s}/${o}.`);return}let l={},g=(u,f)=>{l[u]||(l[u]=[]),l[u].includes(f)||l[u].push(f)};for(let u of p){let f=u.replace(/\\/g,"/");if(f.includes("/classes/")){let c=f.match(/\/classes\/([^/.]+)\.cls/);c&&g("ApexClass",c[1])}else if(f.includes("/triggers/")){let c=f.match(/\/triggers\/([^/.]+)\.trigger/);c&&g("ApexTrigger",c[1])}else if(f.includes("/lwc/")){let c=f.match(/\/lwc\/([^/]+)\//);c&&g("LightningComponentBundle",c[1])}else if(f.includes("/aura/")){let c=f.match(/\/aura\/([^/]+)\//);c&&g("AuraDefinitionBundle",c[1])}else if(f.includes("/objects/")&&f.includes("/fields/")){let c=f.match(/\/objects\/([^/]+)\//),w=f.match(/\/fields\/([^/.]+)\.field/);c&&w&&g("CustomField",`${c[1]}.${w[1]}`)}else if(f.includes("/objects/")){let c=f.match(/\/objects\/([^/.]+)\.object/);c&&g("CustomObject",c[1])}else if(f.includes("/layouts/")){let c=f.match(/\/layouts\/([^/.]+)\.layout/);c&&g("Layout",c[1])}else if(f.includes("/flows/")){let c=f.match(/\/flows\/([^/.]+)\.flow/);c&&g("Flow",c[1])}else if(f.includes("/permissionsets/")){let c=f.match(/\/permissionsets\/([^/.]+)\.permissionset/);c&&g("PermissionSet",c[1])}else if(f.includes("/profiles/")){let c=f.match(/\/profiles\/([^/.]+)\.profile/);c&&g("Profile",c[1])}else if(f.includes("/customMetadata/")){let c=f.match(/\/customMetadata\/([^/.]+)\.md/);c&&g("CustomMetadata",c[1])}else if(f.includes("/flexipages/")){let c=f.match(/\/flexipages\/([^/.]+)\.flexipage/);c&&g("FlexiPage",c[1])}}if(Object.keys(l).length===0){V.window.showInformationMessage("Ricwiz: Found deleted files in Git, but none mapped to recognizable Salesforce metadata.");return}let m=`<?xml version="1.0" encoding="UTF-8"?>
<Package xmlns="http://soap.sforce.com/2006/04/metadata">
`;for(let u of Object.keys(l).sort()){m+=`    <types>
`;for(let f of l[u].sort())m+=`        <members>${f}</members>
`;m+=`        <name>${u}</name>
    </types>
`}m+=`    <version>58.0</version>
</Package>`;let a=Qe.join(t,"destructiveChanges");ve.existsSync(a)||ve.mkdirSync(a);let i=Qe.join(a,"destructiveChanges.xml"),n=Qe.join(a,"package.xml");ve.writeFileSync(i,m,"utf8"),ve.existsSync(n)||ve.writeFileSync(n,`<?xml version="1.0" encoding="UTF-8"?>
<Package xmlns="http://soap.sforce.com/2006/04/metadata">
    <version>58.0</version>
</Package>`,"utf8");let d=await V.workspace.openTextDocument(i);await V.window.showTextDocument(d),V.window.showInformationMessage("Ricwiz: destructiveChanges.xml generated successfully!")}catch(r){V.window.showErrorMessage(`Ricwiz: Error generating destructive changes: ${r.message}`)}})}var V,Qe,ve,Dt=z(()=>{"use strict";V=y(require("vscode")),Qe=y(require("path")),ve=y(require("fs"));P();N()});async function Lt(){let t=x();if(!t)return;let e=await M.initialize(t,{skipPrompt:!0}),o=e?e.ticketSourceBranch:ce.workspace.getConfiguration("ricwiz").get("ticketSourceBranch","main"),s=e?e.originRemote:"origin";await ce.window.withProgress({location:ce.ProgressLocation.Notification,title:"Ricwiz: Finding Apex Tests to run...",cancellable:!1},async()=>{try{let{stdout:r}=await h(`git diff --name-status ${s}/${o}...HEAD`,{cwd:t}),p=r.split(`
`).map(u=>u.trim()).filter(u=>u.length>0),l=new Set,g=new Set;for(let u of p){let f=u.split(/\s+/);if(f[0].startsWith("D"))continue;let c=f[1];if(c&&c.endsWith(".cls")){let w=c.match(/\/classes\/([^/.]+)\.cls/);if(w){let v=w[1];v.toLowerCase().endsWith("test")?l.add(v):g.add(v)}}}for(let u of g)l.add(`${u}Test`);if(l.size===0){ce.window.showInformationMessage("Ricwiz: No Apex Classes were modified in this branch.");return}let m=Array.from(l).map(u=>({label:`$(beaker) ${u}`,description:"Apex Test Class"})),a=await ce.window.showQuickPick(m,{canPickMany:!0,title:"Select Test Classes to Run",placeHolder:"Select tests..."});if(!a||a.length===0)return;let n=`sf apex run test -n ${a.map(u=>u.label.replace("$(beaker) ","").trim()).join(",")} -r human -w 30`,d=ce.window.createTerminal("Ricwiz: Smart Tests");d.show(),d.sendText(n)}catch(r){ce.window.showErrorMessage(`Ricwiz: Error finding tests: ${r.message}`)}})}var ce,At=z(()=>{"use strict";ce=y(require("vscode"));P();N()});var Ce,It=z(()=>{"use strict";Ce=class{static isValidShellArg(e){return e?/^[a-zA-Z0-9\-_/.]+$/.test(e):!1}}});async function Ft(t){let e=x();if(!e){A.window.showErrorMessage("Open a folder or workspace that is a Git repository.");return}let o=await M.initialize(e,{forcePrompt:!0});if(!o)return;let s=typeof t=="string"?t:void 0,r=await H(e,{prefix:o.ticketPrefix,suggestedValue:s});if(!r){A.window.showErrorMessage("Branch creation cancelled: Ticket not provided.");return}let{ticketId:p}=r,l=o.environments,g="all",m=[{label:"Create Main Branch & Environments",description:"Creates the main ticket branch and all environment branches",value:"all"},{label:"Create Main Branch Only",description:"Creates only the main ticket branch (skips environments)",value:"mainOnly"},{label:"Create Environments Only",description:"Creates only the environment branches (skip main branch)",value:"envs"}];if(l.length>0){let d=await A.window.showQuickPick(m,{placeHolder:"Ricwiz: What do you want to create?",ignoreFocusOut:!0});if(!d)return;g=d.value}let a=o.ticketSourceBranch;if(g==="all"||g==="mainOnly"){let d=[];try{let{stdout:w}=await h('git branch --all --format="%(refname:short)"',{cwd:e});d=w.split(`
`).map(v=>v.trim()).filter(v=>v&&v!=="origin"),d=[...new Set(d)]}catch{}let u=A.window.createQuickPick();u.title="Ricwiz: Ticket Source Branch",u.placeholder="Confirm or change the source branch for this ticket",u.value=o.ticketSourceBranch,u.ignoreFocusOut=!0;let f=()=>{let w=u.value.trim(),v=[];w&&v.push({label:w,description:"Use typed branch"}),v.push(...d.map(b=>({label:b}))),u.items=v};u.onDidChangeValue(f),f();let c=await new Promise(w=>{u.onDidAccept(()=>{let v=u.selectedItems[0];w(v?v.label:u.value),u.hide()}),u.onDidHide(()=>w(void 0)),u.show()});if(!c){A.window.showInformationMessage("Branch creation cancelled.");return}a=c.trim()}let i="";if(o.branchPrefix){let d=await A.window.showInputBox({prompt:"Ricwiz: Branch Prefix (leave empty to not use a prefix)",placeHolder:"e.g. CRC-R19-",value:o.branchPrefix,ignoreFocusOut:!0});if(d===void 0){A.window.showInformationMessage("Branch creation cancelled.");return}i=d.trim()}let n=i?`${i}${p}`:p;if(!Ce.isValidShellArg(n)){A.window.showErrorMessage(`Invalid format for ticket ID: ${n}`);return}if(!Ce.isValidShellArg(a)){A.window.showErrorMessage(`Invalid format for ticketSourceBranch in settings: ${a}`);return}for(let d of l){if(!Ce.isValidShellArg(d.name)){A.window.showErrorMessage(`Invalid format for environment name in settings: ${d.name}`);return}if(!Ce.isValidShellArg(d.sourceBranch)){A.window.showErrorMessage(`Invalid format for environment sourceBranch in settings: ${d.sourceBranch}`);return}}try{await h("git status",{cwd:e})}catch{A.window.showErrorMessage("The opened folder does not appear to be a valid Git repository.");return}try{await A.window.withProgress({location:A.ProgressLocation.Notification,title:"Ricwiz: Creating Branches",cancellable:!1},async d=>{let u=[];d.report({message:"Checking remote status (git fetch)...",increment:10});try{await h("git fetch",{cwd:e})}catch{}try{if(g==="all"||g==="mainOnly"){if(d.report({message:`Creating main branch ${n}...`,increment:10}),await we(e,n))A.window.showInformationMessage(`Ricwiz: The branch ${n} already exists. Skipping creation...`),await h(`git checkout ${n}`,{cwd:e});else try{let f=o.getFetchRemote(a),c=o.getFetchBranch(a),w=o.buildUpstreamPath(a);await h(`git fetch ${f} ${c}`,{cwd:e}),await h(`git checkout -b ${n} ${w}`,{cwd:e}),u.push(n)}catch{try{await h(`git checkout -b ${n} ${a}`,{cwd:e}),u.push(n)}catch{throw new Error(`Could not create main branch '${n}' from '${a}'. Does the source branch exist?`)}}try{await h(`git config branch.${n}.ricwiz-source "${a}"`,{cwd:e}),o.profileName&&await h(`git config branch.${n}.ricwiz-profile "${o.profileName}"`,{cwd:e})}catch{}}if(g==="all"||g==="envs"){let f=50/(l.length||1);for(let c of l){let w=i?`${i}${p}-to-${c.name}`:`${p}-to-${c.name}`,v=c.sourceBranch;if(d.report({message:`Processing environment branch ${w}...`,increment:f}),!await we(e,w))try{let b=o.buildUpstreamPath(v);await h(`git checkout -b ${w} ${b}`,{cwd:e}),u.push(w)}catch{try{await h(`git checkout -b ${w} ${v}`,{cwd:e}),u.push(w)}catch{throw new Error(`Could not create environment branch '${w}' from '${v}'. Does the source branch exist?`)}}}}d.report({message:`Publishing branches to ${o.originRemote}...`,increment:10});for(let f of u)try{await h(`git push -u ${o.originRemote} ${f}`,{cwd:e})}catch{A.window.showWarningMessage(`Ricwiz: Branch ${f} was created locally but could not be pushed to ${o.originRemote}.`)}if(g==="all"||g==="mainOnly"){d.report({message:`Switching to ${n}...`,increment:10});try{await h(`git checkout ${n}`,{cwd:e})}catch{}}d.report({increment:100}),A.window.showInformationMessage("Ricwiz: All set! You can start working on your branches! \u{1F680}")}catch(f){if(A.window.showErrorMessage(`Ricwiz Branch Creation Failed: ${f.message}`),u.length>0){try{await h(`git checkout ${a}`,{cwd:e})}catch{}for(let c of u)try{await h(`git branch -D ${c}`,{cwd:e})}catch{}A.window.showWarningMessage(`Ricwiz: Rolled back (deleted) ${u.length} branch(es) locally due to failure.`)}}})}catch(d){A.window.showErrorMessage(`Ricwiz general error: ${d.message}`)}}var A,Ot=z(()=>{"use strict";A=y(require("vscode"));P();It();N()});async function $e(t,e,o,s){s&&s.report({message:"CONFLICT! Resolve & click 'Commit & Continue' in Ricwiz panel."});let r=!1,p=!1,l=async()=>{try{let{stdout:i}=await h("git status --porcelain",{cwd:t});return i.split(`
`).filter(n=>{let d=n.substring(0,2);return["UD","DU","DD","AU","UA"].includes(d)}).map(n=>n.substring(3).trim())}catch{return[]}},g=async()=>{try{let{stdout:i}=await h("git status --porcelain",{cwd:t}),n=d=>d==="UU"?"Both Modified":d==="UD"?"Deleted by them":d==="DU"?"Deleted by us":d==="DD"?"Both Deleted":d==="AA"?"Both Added":d==="AU"?"Added by us":d==="UA"?"Added by them":"Conflicted";return i.split(`
`).map(d=>d.trimRight()).filter(d=>d.length>2).filter(d=>{let u=d.substring(0,2);return["UU","AA","UD","DU","AU","UA","DD"].includes(u)}).map(d=>{let u=d.substring(0,2);return{file:d.substring(3).trim(),state:n(u)}})}catch{return[]}},m=async()=>{if(r)return;let i=await l(),n=await g(),{webviewProvider:d}=(Ke(),I(Ye));d&&d.setConflictState({isConflict:!0,sourceStr:e,targetStr:o,deletionsCount:i.length,files:n})},a=de.commands.registerCommand("ricwiz.conflictAction",async i=>{if(i==="abortDeploy")p=!0;else if(i==="resolveDeletions"){try{let d=(await l()).map(f=>({label:f})),u=await de.window.showQuickPick(d,{canPickMany:!0,placeHolder:"Select conflicted files to DELETE",title:"Ricwiz: Delete Conflicted Files"});if(u&&u.length>0){for(let f of u)try{await h(`git rm --force "${f.label}"`,{cwd:t})}catch{}de.window.showInformationMessage(`Ricwiz: Deleted ${u.length} conflicted file(s).`)}}catch(n){de.window.showErrorMessage(`Ricwiz: Error. (${n.message})`)}m()}else if(i==="commitAndContinue")try{let d=(await l()).filter(f=>Ut.existsSync(jt.join(t,f)));if(d.length>0&&await de.window.showWarningMessage(`Wait! There are ${d.length} file(s) with deletion conflicts that are still on your disk.

If you commit now, you will KEEP them in the project.

Are you sure you want to KEEP them?`,{modal:!0},"Yes, KEEP them","No, let me DELETE them")!=="Yes, KEEP them"){m();return}let u=!1;try{let{stdout:f}=await h('git grep -E "^<<<<<<< "',{cwd:t});f.trim().length>0&&(u=!0)}catch{}if(u){de.window.showErrorMessage("Ricwiz: You still have unresolved conflict markers (<<<<<<<) in your files. Please resolve them first!"),m();return}await h("git add .",{cwd:t}),await h("git commit --no-edit",{cwd:t})}catch(n){de.window.showErrorMessage(`Ricwiz: Could not commit automatically. (${n.message})`),m()}});for(m();;){if(p){r=!0,a.dispose(),(Ke(),I(Ye)).webviewProvider?.setConflictState(null);try{await h("git merge --abort",{cwd:t})}catch{}return!1}try{let{stdout:i}=await h("git status --porcelain",{cwd:t});if(i.trim().length===0)return r=!0,a.dispose(),(Ke(),I(Ye)).webviewProvider?.setConflictState(null),de.window.showInformationMessage("Ricwiz: Changes committed!"),!0}catch{}await new Promise(i=>setTimeout(i,2e3))}}var de,Ut,jt,Ze=z(()=>{"use strict";de=y(require("vscode")),Ut=y(require("fs")),jt=y(require("path"));P()});var ot={};Ae(ot,{fetchMergeRequestStatus:()=>tt,hasGitlabToken:()=>et,ricwizLogger:()=>J});async function et(){let t=await Ie();return!!(t&&t.trim())}async function pi(t,e){let o=Xe.workspace.getConfiguration("ricwiz"),s=(await Ie())?.trim();if(!s)throw new Error("No GitLab token");let r=e?e.getConfig("gitlabUrlOverride",""):o.get("gitlabUrlOverride",""),p=[];if(r&&r.trim()!=="")p.push(r.trim());else try{let{stdout:g}=await h("git remote",{cwd:t}),m=g.split(`
`).map(i=>i.trim()).filter(i=>i),a=[];e&&e.upstreamRemote&&m.includes(e.upstreamRemote)&&a.push(e.upstreamRemote),e&&e.originRemote&&e.originRemote!==e.upstreamRemote&&m.includes(e.originRemote)&&a.push(e.originRemote),m.includes("upstream")&&!a.includes("upstream")&&a.push("upstream"),m.includes("origin")&&!a.includes("origin")&&a.push("origin"),a.length===0&&m.length>0&&a.push(...m);for(let i of a)try{let{stdout:n}=await h(`git remote get-url ${i}`,{cwd:t}),d=n.trim();d.endsWith(".git")&&(d=d.slice(0,-4)),d.startsWith("git@")&&(d=d.replace("git@","").replace(":","/"),d=`https://${d}`),p.push(d)}catch(n){J.appendLine(`[GitLab API] Error getting remote URL for ${i}: ${n.message}`)}}catch(g){J.appendLine(`[GitLab API] Error getting remotes: ${g.message}`)}if(p.length===0)throw J.appendLine("[GitLab API] No candidate URLs found in getGitlabTargets!"),new Error("Could not get any remote origin URL.");return p.map(g=>{let m=new URL(g),a=`${m.protocol}//${m.host}`,i=m.pathname;i.startsWith("/")&&(i=i.substring(1)),i.endsWith("/")&&(i=i.slice(0,-1)),i.endsWith(".git")&&(i=i.slice(0,-4));let n=encodeURIComponent(i);return{baseUrl:a,token:s,projectPath:n}})}async function dt(t,e,o,s,r){let p=new URL(`${e}${r}`);return J.appendLine(`[GitLab API] ${s} ${p.toString()}`),new Promise((l,g)=>{let m=Nt.request(p,{method:s,timeout:5e3,headers:{"PRIVATE-TOKEN":o,Accept:"application/json"}},a=>{let i="";a.on("data",n=>i+=n),a.on("end",()=>{if(J.appendLine(`[GitLab API] Response Code: ${a.statusCode}`),a.statusCode&&a.statusCode>=400)return J.appendLine(`[GitLab API] Error Data: ${i}`),g(new Error(`GitLab API error: ${a.statusCode}`));if(!i)return l({});try{let n=JSON.parse(i);Array.isArray(n)?J.appendLine(`[GitLab API] Returned array with ${n.length} items`):n&&typeof n=="object"&&J.appendLine(`[GitLab API] Returned object with id ${n.id||n.iid||"unknown"}`),l(n)}catch(n){J.appendLine(`[GitLab API] Parse Error: ${n.message}`),g(n)}})});m.on("timeout",()=>{m.destroy(),g(new Error("GitLab request timed out"))}),m.on("error",a=>{J.appendLine(`[GitLab API] Request Failed: ${a.message}`),g(a)}),m.end()})}async function tt(t,e,o,s){J.appendLine(`[GitLab API] fetchMergeRequestStatus called for source: ${e}, target: ${o||"any"}`);let r=`${t}:${e}:${o||"any"}`,p=lt.get(r);if(p&&Date.now()-p.timestamp<mi)return p.data;try{let l=await pi(t,s),g=null,m=-1;for(let a of l)try{let i=`/api/v4/projects/${a.projectPath}/merge_requests?source_branch=${encodeURIComponent(e)}&order_by=updated_at&sort=desc`;o&&(i+=`&target_branch=${encodeURIComponent(o)}`);let n=await dt(t,a.baseUrl,a.token,"GET",i);if(n&&n.length>0){let d=n[0];try{let w=await dt(t,a.baseUrl,a.token,"GET",`/api/v4/projects/${a.projectPath}/merge_requests/${d.iid}`);w&&(d=w)}catch{}let u="none";if(d.head_pipeline&&d.head_pipeline.status){let w=d.head_pipeline.status;w==="success"||w==="failed"||w==="canceled"||w==="skipped"?u=w:u="running"}let f={isMerged:d.state==="merged",isOpen:d.state==="opened",pipelineStatus:u,webUrl:d.web_url,projectPath:a.projectPath,pipelineId:d.head_pipeline?d.head_pipeline.id:void 0},c=0;f.isOpen?c=2:f.isMerged&&(c=1),c>m&&(g=f,m=c)}}catch(i){J.appendLine(`[GitLab API] Error inside target loop: ${i.message}`)}if(g)return lt.set(r,{data:g,timestamp:Date.now()}),g;for(let a of l)try{let i=`/api/v4/projects/${a.projectPath}/pipelines?ref=${encodeURIComponent(e)}&order_by=updated_at&sort=desc`,n=await dt(t,a.baseUrl,a.token,"GET",i);if(n&&n.length>0){let d=n[0],u="none";if(d.status){let c=d.status;c==="success"||c==="failed"||c==="canceled"||c==="skipped"?u=c:u="running"}let f={isMerged:!1,isOpen:!1,pipelineStatus:u,webUrl:d.web_url,projectPath:a.projectPath,pipelineId:d.id};return lt.set(r,{data:f,timestamp:Date.now()}),f}}catch{}return null}catch(l){return J.appendLine(`[GitLab API] Failed to fetch MR status: ${l.message}`),null}}var Nt,Xe,J,lt,mi,Oe=z(()=>{"use strict";Nt=y(require("https")),Xe=y(require("vscode"));ke();P();J=Xe.window.createOutputChannel("Ricwiz Debug");lt=new Map,mi=30*1e3});var be={};Ae(be,{findRelatedBranches:()=>ft,getCurrentBranchMergeStatus:()=>mt,getRecentCommits:()=>ut,getRecentTickets:()=>gt,getRelatedBranchesStatus:()=>pt,resolveExistingBranchName:()=>ui});function Wt(t,e){return e.find(o=>t.endsWith(`-to-${o.name}`))}async function pt(t,e,o,s,r){let p=await et();return await Promise.all(e.map(async g=>{let m=Wt(g,s);if(p){let a=m?m.sourceBranch:void 0,i=await tt(t,g,a,r);if(i)return{name:g,isMerged:i.isMerged,pipelineStatus:i.pipelineStatus,mrUrl:i.webUrl,projectPath:i.projectPath,pipelineId:i.pipelineId}}else{let{ricwizLogger:a}=(Oe(),I(ot));a.appendLine(`[GitLab API] Skipping MR check for ${g} because hasGitlabToken() is false`)}return{name:g,isMerged:!1}}))}async function mt(t,e,o,s){let r=Wt(e,o);if(!r)return!1;if(await et()){let p=await tt(t,e,r.sourceBranch,s);if(p)return p.isMerged}else{let{ricwizLogger:p}=(Oe(),I(ot));p.appendLine(`[GitLab API] Skipping MR check for current branch ${e} because hasGitlabToken() is false`)}return!1}async function ut(t,e=10){try{let{stdout:o}=await h(`git log --oneline -${e} --format="%h|||%s|||%ar"`,{cwd:t});return o.split(`
`).filter(s=>s.trim()).map(s=>{let r=s.split("|||");return{hash:r[0]||"",message:r.length>=3?r.slice(1,-1).join("|||"):r[1]||"",timeAgo:r.length>=3?r[r.length-1]:""}})}catch{return[]}}async function gt(t,e=3){try{let{stdout:o}=await h('git for-each-ref --sort=-committerdate --format="%(refname:short)" refs/heads/',{cwd:t}),s=o.split(`
`).map(p=>p.trim()).filter(p=>p),r=/^[A-Z]+-\d+$/i;return s.filter(p=>r.test(p)).slice(0,e)}catch{return[]}}async function ft(t,e,o){let{stdout:s}=await h(`git branch --all --list "*${e}*"`,{cwd:t}),r=new Set,p=new RegExp(`${e}(?!\\d)`,"i");return s.split(`
`).forEach(l=>{let g=l.replace("*","").trim();if(g){if(g.startsWith("remotes/")){let m=g.split("/");m.length>2&&(g=m.slice(2).join("/"))}g&&g!==o&&!g.includes("HEAD")&&p.test(g)&&r.add(g)}}),Array.from(r)}async function ui(t,e,o){try{let s=require("child_process"),p=require("util").promisify(s.exec),{stdout:l}=await p(`git branch --all --list "*${e}*"`,{cwd:t}),g=new RegExp(`${e}(?!\\d)`,"i"),m=l.split(`
`).map(i=>i.replace("*","").trim().replace(/^remotes\/[^\/]+\//,"")).filter(i=>i&&!i.includes("HEAD")&&g.test(i)),a=Array.from(new Set(m));if(o){let i=`-to-${o}`,n=a.find(d=>d.endsWith(i));return n||`${e}${i}`}else{let i=a.find(n=>!n.includes("-to-"));return i||e}}catch{return o?`${e}-to-${o}`:e}}var ue=z(()=>{"use strict";P();Oe()});async function Jt(){let t=x();if(!t){q.window.showErrorMessage("Ricwiz: Open a folder or workspace that is a Git repository.");return}try{await h("git status",{cwd:t})}catch{q.window.showErrorMessage("Ricwiz: The opened folder does not appear to be a valid Git repository.");return}let e=await M.initialize(t);if(!e)return;let o=e.environments,s=await H(t,{prefix:e.ticketPrefix});if(!s){q.window.showErrorMessage("Operation cancelled: Ticket not provided.");return}let{ticketId:r,currentBranch:p}=s,{resolveExistingBranchName:l}=(ue(),I(be)),g=await l(t,r);if(!await we(t,g)){q.window.showErrorMessage(`Ricwiz: Main branch '${g}' does not exist! Prepare deploy is only available when a main ticket branch is used.`);return}let m=e.getConfig("defaultReviewers",""),a="";try{let{stdout:i}=await h(`git config branch.${r}.ricwiz-reviewers`,{cwd:t});a=i.trim()}catch{}if(m.trim()){let i=await q.window.showInputBox({prompt:"Ricwiz: Reviewers for this deploy (optional, comma-separated)",placeHolder:"e.g. @joao, 123456",value:a||m,ignoreFocusOut:!0});if(i===void 0)return;try{i.trim()?await h(`git config branch.${r}.ricwiz-reviewers "${i.trim()}"`,{cwd:t}):a&&await h(`git config --unset branch.${r}.ricwiz-reviewers`,{cwd:t})}catch{}}await q.window.withProgress({location:q.ProgressLocation.Notification,title:"Ricwiz: Preparing Deploy",cancellable:!0},async(i,n)=>{let d=0,u=p,f=!1;n.onCancellationRequested(()=>{f=!0}),i.report({message:"Syncing remote information...",increment:10});try{await h("git fetch --all",{cwd:t});let w=10/(o.length||1);for(let v of o)try{if(f)throw new Error("Aborted");i.report({message:`Fetching ${v.sourceBranch}...`,increment:w});let b=e.getFetchRemote(v.sourceBranch),k=e.getFetchBranch(v.sourceBranch);await h(`git fetch ${b} ${k}:${k}`,{cwd:t})}catch{}}catch{}let c=60/(o.length||1);for(let w of o){if(f)break;let v=await l(t,r,w.name),b=w.sourceBranch;try{i.report({message:`Processing ${v}...`,increment:c/4}),await h(`git checkout ${v}`,{cwd:t});try{await h(`git pull ${e.originRemote} ${v}`,{cwd:t})}catch{}let k=async S=>{try{await h(`git merge ${S}`,{cwd:t})}catch(D){let oe=!1;try{let{stdout:pe}=await h("git ls-files -u",{cwd:t});pe.trim().length>0&&(oe=!0)}catch{}let Y=((D.stdout||"")+(D.stderr||"")+(D.message||"")).toLowerCase();if(oe||Y.includes("conflict")||Y.includes("conflit")){if(!await $e(t,S,v,i))throw f=!0,new Error("Deploy aborted by user.")}else throw D}};i.report({message:`Merging ${b} into ${v}...`,increment:c/4});let B=e.getFetchRemote(b),F=e.getFetchBranch(b),T=e.buildUpstreamPath(b);if(await h(`git fetch ${B} ${F}`,{cwd:t}),await k(T),i.report({message:`Merging ${g} into ${v}...`,increment:c/4}),await k(g),f)break;i.report({message:`Pushing ${v}...`,increment:c/4}),await h(`git push ${e.originRemote} ${v}`,{cwd:t}),d++}catch(k){k.message.includes("aborted")?q.window.showInformationMessage("Ricwiz: Deploy cancelled."):q.window.showErrorMessage(`Ricwiz: Failed to process branch ${v}. Detail: ${k.message}`);return}}if(!f){i.report({message:"Finishing up...",increment:10});let w=u;try{await h(`git show-ref --verify --quiet refs/heads/${g}`,{cwd:t}),w=g}catch{}try{let v=await j(t);w&&w!==v?(await h(`git checkout ${w}`,{cwd:t}),q.window.showInformationMessage(`Ricwiz: Operation complete. Back on branch ${w}.`)):q.window.showInformationMessage("Ricwiz: Operation complete.")}catch{q.window.showInformationMessage("Ricwiz: Operation complete.")}}})}var q,qt=z(()=>{"use strict";q=y(require("vscode"));P();Ze();N()});async function Gt(t=!1){let e=x();if(!e)return;let o=await M.initialize(e);if(!o)return;let s=await H(e,{prompt:"Enter the full ticket ID for the Merge Requests (e.g., SCPSCA-1234) or just the number"});if(!s)return;let{ticketId:r}=s,p=o.getConfig("gitlabUrlOverride",""),l="";if(p&&p.trim()!=="")l=p.trim().replace(/\/+$/,"");else{let i="";try{let n=o.upstreamRemote||"origin",{stdout:d}=await h(`git remote get-url ${n}`,{cwd:e});i=d.trim()}catch{ge.window.showErrorMessage("Ricwiz: Could not get the remote origin URL. Please configure the URL manually in the extension settings.");return}l=i,l.endsWith(".git")&&(l=l.slice(0,-4)),l.startsWith("git@")&&(l=l.replace("git@","").replace(":","/"),l=`https://${l}`)}let g=[],m=o.ticketSourceBranch;try{let{stdout:i}=await h(`git config branch.${r}.ricwiz-source`,{cwd:e});i.trim()&&(m=i.trim())}catch{}let{resolveExistingBranchName:a}=(ue(),I(be));if(o.environments.length===0){let i=await a(e,r);g.push({source:i,target:m})}else for(let i of o.environments){let n=await a(e,r,i.name);g.push({source:n,target:i.sourceBranch})}for(let i of g){let n=`${l}/-/merge_requests/new?merge_request[source_branch]=${i.source}&merge_request[target_branch]=${i.target}`;t?ge.commands.executeCommand("simpleBrowser.show",n):ge.env.openExternal(ge.Uri.parse(n))}ge.window.showInformationMessage(`Ricwiz: Opening ${t?"VS Code browser":"external browser"} for Merge Requests!`)}async function Ht(){return Gt(!1)}async function Vt(){return Gt(!0)}var ge,_t=z(()=>{"use strict";ge=y(require("vscode"));P();N()});async function Qt(t=!1){let e=x();if(!e)return;let o=ie.workspace.getConfiguration("ricwiz"),s=o.get("jiraUrl","");if(!s||s.trim()===""){ie.window.showErrorMessage("Ricwiz: Jira URL is not configured. Please set it in the extension settings (e.g., https://jira.company.com/browse/).");return}let{getCurrentBranch:r,resolvePrefix:p,extractTicketSuggestion:l}=(P(),I(Te)),g=await r(e),m=o.get("ticketPrefix","SFPSCA-"),a=p(g,m),n=l(g,a,!0);if(n){let{normalizeTicketId:u}=(P(),I(Te));n=u(n,a)}else{let u=await H(e,{prompt:"Ricwiz could not detect the ticket from the branch name. Enter Jira ticket ID (e.g. SFPSCA-1234)",handleToSuffix:!0});if(!u)return;n=u.ticketId}let d=s.trim();d.endsWith("/")||(d+="/"),d+=n,t?ie.commands.executeCommand("simpleBrowser.show",d):ie.env.openExternal(ie.Uri.parse(d)),ie.window.showInformationMessage(`Ricwiz: Opening Jira Ticket ${n} in ${t?"VS Code":"browser"}!`)}async function Yt(){return Qt(!1)}async function Kt(){return Qt(!0)}var ie,Zt=z(()=>{"use strict";ie=y(require("vscode"));P()});async function to(){let t=eo.workspace.getConfiguration("ricwiz"),e=t.get("jiraUrl",""),o=t.get("jiraEmail","")?.trim(),s=(await Rt())?.trim();if(!e||!s)throw new Error('Jira API Token is not securely configured. Please run the "Ricwiz: Set Secure Jira API Token" command.');let r=e;r.includes("/browse")&&(r=r.split("/browse")[0]),r.endsWith("/")&&(r=r.slice(0,-1));let p=o?`Basic ${Buffer.from(`${o}:${s}`).toString("base64")}`:`Bearer ${s}`;return{baseUrl:r,headerAuth:p}}async function Me(t,e,o){let{baseUrl:s,headerAuth:r}=await to(),p=new URL(`${s}${e}`);return new Promise((l,g)=>{let m=Xt.request(p,{method:t,headers:{Authorization:r,Accept:"application/json",...o?{"Content-Type":"application/json"}:{}}},a=>{let i="";a.on("data",n=>i+=n),a.on("end",()=>{if(a.statusCode===401||a.statusCode===403)return g(new Error(`Authentication failed (HTTP ${a.statusCode}). Please check your Jira settings.`));if(a.statusCode&&a.statusCode>=400){let n="";try{let d=JSON.parse(i);d.errorMessages&&d.errorMessages.length>0&&(n=d.errorMessages.join(", "))}catch{}return a.statusCode===404||a.statusCode===410?g(new Error(`Ticket not found or deleted (HTTP ${a.statusCode}). ${n}`)):g(new Error(`Jira API returned HTTP status ${a.statusCode}. ${n}`))}if(!i)return l({});try{let n=JSON.parse(i);l(n)}catch{g(new Error("Failed to parse Jira response."))}})});m.on("error",a=>g(new Error(`Network error: ${a.message}`))),o&&m.write(JSON.stringify(o)),m.end()})}async function De(t){let{baseUrl:e}=await to(),o=await Me("GET",`/rest/api/2/issue/${t}`);return o&&o.fields?{summary:o.fields.summary||"",description:o.fields.description||"No description provided.",status:o.fields.status?.name||"Unknown",url:`${e}/browse/${t}`}:null}async function oo(t){let e=await Me("GET",`/rest/api/2/issue/${t}/transitions`);return e&&e.transitions?e.transitions.map(o=>({id:o.id,name:o.name})):[]}async function io(t,e){await Me("POST",`/rest/api/2/issue/${t}/transitions`,{transition:{id:e}})}async function no(t,e){await Me("POST",`/rest/api/2/issue/${t}/comment`,{body:e})}async function so(t,e){await Me("PUT",`/rest/api/2/issue/${t}`,{update:{labels:[{add:e}]}})}async function ro(t){let e=await Me("POST","/rest/api/3/search/jql",{jql:t,maxResults:50,fields:["summary","status","assignee"]});return e&&e.issues?e.issues.map(o=>({key:o.key,summary:o.fields?.summary||"No Title",status:o.fields?.status?.name||"Unknown",assignee:o.fields?.assignee?.displayName||"Unassigned"})):[]}var Xt,eo,Ue=z(()=>{"use strict";Xt=y(require("https")),eo=y(require("vscode"));ke()});async function ao(t){let e=x();if(e)try{let o=await M.initialize(e);if(!o)return;let s=await j(e),r=Be(s,o.ticketPrefix),p=Ee(s,r,!0);if(p||(p=s.split("-to-")[0]),!p){K.window.showErrorMessage("Ricwiz: You are not currently on a valid ticket branch.");return}await K.window.withProgress({location:K.ProgressLocation.Notification,title:`Fetching details for ${p}...`,cancellable:!1},async l=>{let g=await De(p);if(g){let m=[];try{let{findRelatedBranches:a,getRelatedBranchesStatus:i}=(ue(),I(be)),n=K.workspace.getConfiguration("ricwiz").get("environments",[{name:"Qual",sourceBranch:"quality"},{name:"Val",sourceBranch:"validation"},{name:"Prod",sourceBranch:"main"}]),d=await a(e,p,"");m=await i(e,d,p,n,o)}catch{}t.setJiraData({ticketId:p,relatedBranches:m,...g}),t.setPage("jira")}else K.window.showErrorMessage("Ricwiz: No data found for this ticket.")})}catch(o){o.message.includes("securely configured")?await K.window.showErrorMessage(o.message,"Set Token Now")==="Set Token Now"&&K.commands.executeCommand("ricwiz.setJiraToken"):K.window.showErrorMessage(`Ricwiz Jira Error: ${o.message}`)}}var K,co=z(()=>{"use strict";K=y(require("vscode"));P();N();Ue()});async function lo(t,e){let s=ne.workspace.getConfiguration("ricwiz").get("jiraDashboards",[]);if(e!==void 0&&(Re=e),!s||s.length===0){t.setDashboardData({queries:[],selectedIndex:0,results:[],error:"No queries defined in settings. Go to Settings > Ricwiz > Jira Dashboards."}),t.setPage("dashboard");return}Re>=s.length&&(Re=0);let r=s[Re];t.setDashboardData({queries:s,selectedIndex:Re,results:[],error:"\u23F3 Loading tickets..."}),t.setPage("dashboard");try{let p=await ro(r.jql),l=ne.workspace.workspaceFolders?.[0]?.uri.fsPath,g=[],m=t.getDashboardShowBranches();if(l)try{let i=require("child_process"),d=require("util").promisify(i.exec),{stdout:u}=await d("git branch",{cwd:l});g=u.split(`
`).map(f=>f.replace("*","").trim()).filter(f=>f)}catch{}let a=[];if(m&&l)try{let{findRelatedBranches:i,getRelatedBranchesStatus:n}=(ue(),I(be)),{WorkflowContext:d}=(N(),I(ct)),u=await d.initialize(l,{skipPrompt:!0}),f=u?.environments||ne.workspace.getConfiguration("ricwiz").get("environments",[{name:"Qual",sourceBranch:"quality"},{name:"Val",sourceBranch:"validation"},{name:"Prod",sourceBranch:"main"}]);a=await Promise.all(p.map(async c=>{let w=await i(l,c.key,""),v=await n(l,w,c.key,f,u);return{...c,detailedBranches:v}}))}catch{a=p}else a=p.map(i=>{let n=g.find(d=>d.includes(i.key));return{...i,branch:n||null}});t.setDashboardData({queries:s,selectedIndex:Re,results:a,error:null}),t.setPage("dashboard")}catch(p){let l=p.message;(l.includes("ENOTFOUND")||l.includes("network"))&&(l="No Internet or Invalid URL"),t.setDashboardData({queries:s,selectedIndex:Re,results:[],error:l}),t.setPage("dashboard")}}async function po(t,e){await ne.window.withProgress({location:ne.ProgressLocation.Notification,title:`Fetching details for ${e}...`,cancellable:!1},async()=>{try{let o=await De(e);if(o){let s=[],r=x();if(r)try{let{WorkflowContext:p}=(N(),I(ct)),l=await p.initialize(r,{skipPrompt:!0}),{findRelatedBranches:g,getRelatedBranchesStatus:m}=(ue(),I(be)),a=ne.workspace.getConfiguration("ricwiz").get("environments",[{name:"Qual",sourceBranch:"quality"},{name:"Val",sourceBranch:"validation"},{name:"Prod",sourceBranch:"main"}]),i=await g(r,e,"");s=await m(r,i,e,a,l)}catch{}t.setJiraData({ticketId:e,relatedBranches:s,...o}),t.setPage("jira")}else ne.window.showErrorMessage(`Ricwiz: No data found for ticket ${e}.`)}catch(o){ne.window.showErrorMessage(`Ricwiz Jira Error: ${o.message}`)}})}var ne,Re,mo=z(()=>{"use strict";ne=y(require("vscode"));Ue();P();Re=0});async function ht(){let t=x();if(!t)return;let e=await M.initialize(t,{forcePrompt:!1});if(!e)return;let o=await j(t);if(!o)return;let s=Be(o,e.ticketPrefix),r=Ee(o,s,!0);return r||o.split("-to-")[0]}async function uo(){try{let t=await ht();if(!t){E.window.showErrorMessage("Ricwiz: You are not on a valid ticket branch.");return}let e=await E.window.withProgress({location:E.ProgressLocation.Notification,title:`Fetching available status for ${t}...`,cancellable:!1},()=>oo(t));if(!e||e.length===0){E.window.showInformationMessage(`Ricwiz: No transitions available for ${t}.`);return}let o=e.map(r=>({label:r.name,id:r.id})),s=await E.window.showQuickPick(o,{placeHolder:`Select new status for ${t}`,ignoreFocusOut:!0});s&&(await E.window.withProgress({location:E.ProgressLocation.Notification,title:`Updating status to ${s.label}...`,cancellable:!1},()=>io(t,s.id)),E.window.showInformationMessage(`Ricwiz: Status for ${t} updated to ${s.label}.`))}catch(t){t.message.includes("securely configured")?E.window.showErrorMessage(t.message,"Set Token Now").then(e=>{e==="Set Token Now"&&E.commands.executeCommand("ricwiz.setJiraToken")}):E.window.showErrorMessage(`Ricwiz Jira Error: ${t.message}`)}}async function go(){try{let t=await ht();if(!t){E.window.showErrorMessage("Ricwiz: You are not on a valid ticket branch.");return}let e=await E.window.showInputBox({prompt:`Add comment to ${t}`,placeHolder:"Type your comment here...",ignoreFocusOut:!0});e&&(await E.window.withProgress({location:E.ProgressLocation.Notification,title:`Adding comment to ${t}...`,cancellable:!1},()=>no(t,e)),E.window.showInformationMessage(`Ricwiz: Comment added to ${t}.`))}catch(t){t.message.includes("securely configured")?E.window.showErrorMessage(t.message,"Set Token Now").then(e=>{e==="Set Token Now"&&E.commands.executeCommand("ricwiz.setJiraToken")}):E.window.showErrorMessage(`Ricwiz Jira Error: ${t.message}`)}}async function fo(){try{let t=await ht();if(!t){E.window.showErrorMessage("Ricwiz: You are not on a valid ticket branch.");return}let e=await E.window.showInputBox({prompt:`Add a label to ${t}`,placeHolder:"e.g. Needs-Review, Bug, High-Priority",ignoreFocusOut:!0});e&&e.trim()&&(await E.window.withProgress({location:E.ProgressLocation.Notification,title:`Adding label to ${t}...`,cancellable:!1},()=>so(t,e.trim())),E.window.showInformationMessage(`Ricwiz: Label '${e.trim()}' added to ${t}.`))}catch(t){t.message.includes("securely configured")?E.window.showErrorMessage(t.message,"Set Token Now").then(e=>{e==="Set Token Now"&&E.commands.executeCommand("ricwiz.setJiraToken")}):E.window.showErrorMessage(`Ricwiz Jira Error: ${t.message}`)}}async function ho(){let t=await E.window.showInputBox({prompt:"Enter your Jira API Token (or Personal Access Token). It will be securely stored in your OS keychain.",password:!0,ignoreFocusOut:!0});if(t)try{await $t(t.trim()),E.window.showInformationMessage("Ricwiz: Jira API Token securely stored!")}catch(e){E.window.showErrorMessage(`Ricwiz: Failed to store token: ${e.message}`)}}var E,wo=z(()=>{"use strict";E=y(require("vscode"));P();N();Ue();ke()});async function vo(){let t=await _.window.showInputBox({prompt:"Enter your GitLab Personal Access Token",placeHolder:"glpat-xxxxxxxxxxxxxxxxxxxx",ignoreFocusOut:!0,password:!0});if(t&&t.trim()){let e=t.trim();await _.window.withProgress({location:_.ProgressLocation.Notification,title:"Ricwiz: Validating GitLab Token...",cancellable:!1},async()=>{try{let s=_.workspace.getConfiguration("ricwiz").get("gitlabUrlOverride","").trim();if(!s&&_.workspace.workspaceFolders)try{let{exec:m}=(P(),I(Te)),a=_.workspace.workspaceFolders[0].uri.fsPath,{stdout:i}=await m("git remote get-url origin",{cwd:a}),n=i.trim();n.startsWith("git@")&&(n=`https://${n.replace("git@","").replace(":","/")}`),n.endsWith(".git")&&(n=n.slice(0,-4)),s=n}catch{}s||(s="https://gitlab.com");let r=new URL(s),p=`${r.protocol}//${r.host}`,l=require("https"),g=await new Promise((m,a)=>{let i=l.request(new URL(`${p}/api/v4/user`),{method:"GET",timeout:5e3,headers:{"PRIVATE-TOKEN":e,Accept:"application/json"}},n=>{if(n.statusCode>=400)return a(new Error(`Status ${n.statusCode}`));let d="";n.on("data",u=>d+=u),n.on("end",()=>m(JSON.parse(d||"{}")))});i.on("error",a),i.on("timeout",()=>{i.destroy(),a(new Error("Timeout"))}),i.end()});await zt(e),_.window.showInformationMessage(`Ricwiz: \u2705 GitLab API Token saved and validated successfully for ${g.username||"user"}!`),_.commands.executeCommand("ricwiz.manualRefresh")}catch(o){_.window.showErrorMessage(`Ricwiz: \u274C Invalid token or cannot reach GitLab (${o.message}). Please check the token and try again.`)}})}}var _,bo=z(()=>{"use strict";_=y(require("vscode"));ke()});async function yo(){let t=x();if(!t){fe.window.showErrorMessage("Ricwiz: Open a folder or workspace that is a Git repository.");return}let e=await M.initialize(t);if(!e)return;let o=await H(t,{prefix:e.ticketPrefix,prompt:"Enter the full ticket ID to sync all branches for (e.g., SCPSCA-1234) or just the number"});if(!o)return;let{ticketId:s,currentBranch:r}=o;await fe.window.withProgress({location:fe.ProgressLocation.Notification,title:`Ricwiz: Syncing all branches for ${s}...`,cancellable:!1},async p=>{try{p.report({message:"Fetching from remote..."});try{await h("git fetch --all",{cwd:t})}catch{}let{stdout:l}=await h(`git branch --list "*${s}*"`,{cwd:t}),g=new RegExp(`${s}(?!\\d)`,"i"),m=l.split(`
`).map(n=>n.replace("*","").trim()).filter(n=>n.length>0&&g.test(n));if(m.length===0){fe.window.showWarningMessage(`Ricwiz: No local branches found for ${s}.`);return}let a=0,i=0;for(let n of m)if(p.report({message:`Syncing ${n}...`}),n===r)try{await h(`git pull ${e.originRemote} ${n}`,{cwd:t}),a++}catch(d){let u=!1;try{let{stdout:c}=await h("git ls-files -u",{cwd:t});c.trim().length>0&&(u=!0)}catch{}let f=((d.stdout||"")+(d.stderr||"")+(d.message||"")).toLowerCase();(u||f.includes("conflict")||f.includes("conflit"))&&await $e(t,`${e.originRemote}/${n}`,n,p)?a++:i++}else try{await h(`git fetch ${e.originRemote} ${n}:${n}`,{cwd:t}),a++}catch{try{await h(`git checkout ${n}`,{cwd:t});try{await h(`git pull ${e.originRemote} ${n}`,{cwd:t}),a++}catch(u){let f=!1;try{let{stdout:w}=await h("git ls-files -u",{cwd:t});w.trim().length>0&&(f=!0)}catch{}let c=((u.stdout||"")+(u.stderr||"")+(u.message||"")).toLowerCase();(f||c.includes("conflict")||c.includes("conflit"))&&await $e(t,`${e.originRemote}/${n}`,n,p)?a++:i++}await h(`git checkout ${r}`,{cwd:t})}catch{try{await h(`git checkout ${r}`,{cwd:t})}catch{}i++}}i>0?fe.window.showWarningMessage(`Ricwiz: Synced ${a}/${m.length} branches. ${i} branch(es) could not be synced (possible conflicts or diverged history).`):fe.window.showInformationMessage(`Ricwiz: \u{1F504} All ${a} branches for ${s} are up to date!`)}catch(l){fe.window.showErrorMessage(`Ricwiz: Sync failed: ${l.message}`)}})}var fe,xo=z(()=>{"use strict";fe=y(require("vscode"));P();Ze();N()});async function ko(){let t=x();if(!t){he.window.showErrorMessage("Ricwiz: Open a folder or workspace that is a Git repository.");return}try{await h("git status",{cwd:t})}catch{he.window.showErrorMessage("Ricwiz: The opened folder does not appear to be a valid Git repository.");return}let e=await M.initialize(t);if(!e)return;let o=e.environments,s=await H(t,{prefix:e.ticketPrefix});if(!s)return;let{ticketId:r,currentBranch:p}=s;await he.window.withProgress({location:he.ProgressLocation.Notification,title:"Ricwiz: Updating environment branches from their bases",cancellable:!0},async(l,g)=>{let m=0,a=p,i=!1;g.onCancellationRequested(()=>{i=!0}),l.report({message:"Syncing remote information...",increment:10});try{await h("git fetch --all",{cwd:t})}catch{}let n=80/(o.length||1);for(let d of o){if(i)break;let{resolveExistingBranchName:u}=(ue(),I(be)),f=await u(t,r,d.name),c=d.sourceBranch;if(await we(t,f))try{l.report({message:`Processing ${f}...`,increment:n/2}),await h(`git checkout ${f}`,{cwd:t});try{l.report({message:`Merging ${c} into ${f}...`,increment:n/2});let w=e.getFetchRemote(c),v=e.getFetchBranch(c),b=e.buildUpstreamPath(c);await h(`git fetch ${w} ${v}`,{cwd:t}),await h(`git merge ${b}`,{cwd:t})}catch(w){let v=!1;try{let{stdout:k}=await h("git ls-files -u",{cwd:t});k.trim().length>0&&(v=!0)}catch{}let b=((w.stdout||"")+(w.stderr||"")+(w.message||"")).toLowerCase();if(v||b.includes("conflict")||b.includes("conflit")){let k=e.buildUpstreamPath(c);if(!await $e(t,k,f,l))throw i=!0,new Error("Update aborted by user.")}else throw w}if(i)break;m++}catch(w){w.message.includes("aborted")?he.window.showInformationMessage("Ricwiz: Update cancelled."):he.window.showErrorMessage(`Ricwiz: Failed to update branch ${f}. Detail: ${w.message}`);return}}if(!i){l.report({message:"Finishing up...",increment:10});try{let d=await j(t);a&&a!==d&&await h(`git checkout ${a}`,{cwd:t})}catch{}he.window.showInformationMessage(`Ricwiz: Successfully updated ${m} environment branches from their bases!`)}})}var he,Co=z(()=>{"use strict";he=y(require("vscode"));P();Ze();N()});async function $o(){let t=x();if(!t){W.window.showErrorMessage("Ricwiz: Open a folder or workspace that is a Git repository.");return}let e=await j(t),o=W.workspace.getConfiguration("ricwiz");await W.window.withProgress({location:W.ProgressLocation.Notification,title:"Ricwiz: Scanning for unused local branches...",cancellable:!1},async()=>{try{await h("git fetch --prune",{cwd:t})}catch{}let s=[];try{let{stdout:n}=await h('git branch --format="%(refname:short)"',{cwd:t});s=n.split(`
`).map(d=>d.trim()).filter(d=>d.length>0)}catch{}if(s.length===0){W.window.showInformationMessage("Ricwiz: No local branches found.");return}let r=[];try{let{stdout:n}=await h('git branch -r --format="%(refname:short)"',{cwd:t});r=n.split(`
`).map(d=>d.trim().replace(/^origin\//,"").replace(/^[^\/]+\//,"")).filter(d=>d.length>0&&!d.includes("HEAD"))}catch{}let p=[];try{let{stdout:n}=await h('git for-each-ref --format="%(refname:short)|||%(upstream:track)" refs/heads/',{cwd:t});p=n.split(`
`).filter(d=>d.includes("[gone]")).map(d=>d.split("|||")[0].trim())}catch{}let l=s.filter(n=>!r.includes(n));if(l.length===0){W.window.showInformationMessage("Ricwiz: Your local repository is totally clean! All local branches exist on the remote.");return}let g=l.map(n=>{let d=p.includes(n),u=n===e,f="Not found on remote";return d&&(f="Deleted on remote [gone]"),u&&(f+=" (Current branch - will checkout main first)"),{label:n,description:f,picked:d&&!u}}),m=await W.window.showQuickPick(g,{canPickMany:!0,placeHolder:"Select local branches to delete",title:"Ricwiz: Delete Unused Branches"});if(!m||m.length===0){W.window.showInformationMessage("Ricwiz: No branches selected for deletion.");return}if(await W.window.showWarningMessage(`Ricwiz: Delete ${m.length} local branch(es)?
This cannot be undone!`,{modal:!0},"Yes, delete them")!=="Yes, delete them"){W.window.showInformationMessage("Ricwiz: Deletion cancelled.");return}let i=0;for(let n of m){let d=n.label;if(d===e){let u=o.get("ticketSourceBranch","main");try{await h(`git checkout ${u}`,{cwd:t}),e=u}catch{W.window.showWarningMessage(`Ricwiz: Could not switch away from ${d}. Skipping.`);continue}}try{await h(`git branch -D ${d}`,{cwd:t}),i++}catch{W.window.showWarningMessage(`Ricwiz: Could not delete local branch ${d}.`)}}W.window.showInformationMessage(`Ricwiz: \u{1F5D1}\uFE0F Cleaned up ${i} unused local branch(es).`)})}var W,Ro=z(()=>{"use strict";W=y(require("vscode"));P()});async function Le(t){let e=x();e&&await se.window.withProgress({location:se.ProgressLocation.Notification,title:`Ricwiz: Switching to ${t}...`,cancellable:!1},async()=>{try{let o=await j(e),s=!1;try{let{stdout:p}=await h("git status --porcelain",{cwd:e});s=p.trim().length>0}catch{}if(s&&o)try{await h(`git stash push --include-untracked -m "ricwiz-auto:${o}"`,{cwd:e}),se.window.showInformationMessage(`Ricwiz: \u{1F4E6} Stashed changes from ${o}`)}catch{se.window.showWarningMessage("Ricwiz: Could not stash changes. Checkout may fail if there are conflicts.")}let r=t;t.includes("/")&&(r=t.split("/").slice(1).join("/"));try{await h(`git checkout ${r}`,{cwd:e})}catch{let l="";if(t.includes("/"))l=t.split("/")[0];else{let{stdout:g}=await h("git branch -r",{cwd:e}),m=g.split(`
`).map(i=>i.trim()).filter(i=>i),a=[];for(let i of m){let n=i.split(" ")[0];n.endsWith(`/${r}`)&&a.push(n.substring(0,n.lastIndexOf("/")))}if(a.length===0){se.window.showErrorMessage(`Ricwiz: A branch "${r}" n\xE3o existe localmente nem em nenhuma remote!`);return}else if(a.length===1)l=a[0];else{let i=await M.initialize(e);a.includes("origin")?l="origin":i&&a.includes(i.upstreamRemote)?l=i.upstreamRemote:l=a[0]}}try{await h(`git fetch ${l} ${r}`,{cwd:e}),await h(`git checkout -b ${r} --track ${l}/${r}`,{cwd:e})}catch{se.window.showErrorMessage(`Ricwiz: Encontrou na remote ${l} mas falhou a fazer checkout.`);return}}try{let{stdout:p}=await h("git stash list",{cwd:e}),l=p.split(`
`);for(let g=0;g<l.length;g++)if(l[g].includes(`ricwiz-auto:${r}`)){let m=l[g].match(/stash@\{(\d+)\}/);m&&(await h(`git stash pop stash@{${m[1]}}`,{cwd:e}),se.window.showInformationMessage(`Ricwiz: \u{1F4E6} Restored stashed changes on ${r}`));break}}catch{se.window.showWarningMessage(`Ricwiz: Could not restore stashed changes on ${r}. You may need to resolve conflicts manually (check git stash list).`)}}catch{se.window.showErrorMessage(`Ricwiz: Could not checkout branch ${t}.`)}})}var se,it=z(()=>{"use strict";se=y(require("vscode"));P();N()});async function zo(){let t=x();if(t)try{let{stdout:e}=await h("git branch --show-current",{cwd:t}),o=e.trim();o&&(await je.env.clipboard.writeText(o),je.window.showInformationMessage(`Ricwiz: \u{1F4CB} Copied "${o}" to clipboard`))}catch{je.window.showErrorMessage("Ricwiz: Could not get the current branch name.")}}var je,Po=z(()=>{"use strict";je=y(require("vscode"));P()});async function Bo(){let t=x();if(!t){Z.window.showErrorMessage("Ricwiz: Open a folder or workspace that is a Git repository.");return}let e=Z.workspace.getConfiguration("ricwiz"),o=e.get("ticketSourceBranch","main"),r=e.get("packageXmlCommand",'sf sgd source delta --to "HEAD" --from "origin/{baseBranch}" --output-dir "."').replace("{baseBranch}",o);await Z.window.showWarningMessage("Are you sure you want to generate the package.xml? This may overwrite existing local manifest files.",{modal:!0},"Yes, Generate")==="Yes, Generate"&&await Z.window.withProgress({location:Z.ProgressLocation.Notification,title:"Ricwiz: Generating package.xml using Salesforce CLI...",cancellable:!1},async()=>{try{await h(r,{cwd:t,maxBuffer:10*1024*1024}),Z.window.showInformationMessage("Ricwiz: Successfully generated package.xml!");let l=nt.join(t,"package","package.xml"),g=nt.join(t,"package.xml"),m=nt.join(t,"manifest","package.xml");for(let a of[l,g,m])if(So.existsSync(a)){let i=await Z.workspace.openTextDocument(a);await Z.window.showTextDocument(i);break}}catch(l){Z.window.showErrorMessage(`Ricwiz: Error running sf command - ${l.message}`)}})}var Z,nt,So,Eo=z(()=>{"use strict";Z=y(require("vscode")),nt=y(require("path")),So=y(require("fs"));P()});async function To(){let t=x();if(!t){X.window.showErrorMessage("Ricwiz: Open a folder or workspace that is a Git repository.");return}let o=X.workspace.getConfiguration("ricwiz").get("deployCommand","sf project deploy start --manifest package/package.xml --post-destructive-changes destructiveChanges/destructiveChanges.xml -c -l NoTestRun -g");await X.window.showWarningMessage("Are you sure you want to deploy to Salesforce? This action modifies your org and cannot be easily undone.",{modal:!0},"Yes, Deploy")==="Yes, Deploy"&&await X.window.withProgress({location:X.ProgressLocation.Notification,title:"Ricwiz: Deploying package...",cancellable:!1},async()=>{try{let{stdout:r,stderr:p}=await h(o,{cwd:t,maxBuffer:52428800}),l=X.window.createOutputChannel("Ricwiz Deploy");l.appendLine(`Executing: ${o}`),l.appendLine(r),p&&(l.appendLine("--- STDERR ---"),l.appendLine(p)),l.show(),X.window.showInformationMessage("Ricwiz: Successfully ran deploy command!")}catch(r){let p=X.window.createOutputChannel("Ricwiz Deploy");p.appendLine(`Error executing: ${o}`),r.stdout&&p.appendLine(r.stdout),r.stderr&&p.appendLine(r.stderr),p.appendLine(r.message),p.show(),X.window.showErrorMessage("Ricwiz: Error running deploy command. See output channel for details.")}})}var X,Mo=z(()=>{"use strict";X=y(require("vscode"));P()});async function Do(){let t=x();if(!t){ee.window.showErrorMessage("Ricwiz: Open a folder or workspace that is a Git repository.");return}let o=ee.workspace.getConfiguration("ricwiz").get("importDataCommand","sfdx force:data:tree:import --plan data/plan.json");await ee.window.showWarningMessage("Are you sure you want to import data into Salesforce? This action modifies records in your org.",{modal:!0},"Yes, Import")==="Yes, Import"&&await ee.window.withProgress({location:ee.ProgressLocation.Notification,title:"Ricwiz: Importing data...",cancellable:!1},async()=>{try{let{stdout:r,stderr:p}=await h(o,{cwd:t,maxBuffer:52428800}),l=ee.window.createOutputChannel("Ricwiz Import Data");l.appendLine(`Executing: ${o}`),l.appendLine(r),p&&(l.appendLine("--- STDERR ---"),l.appendLine(p)),l.show(),ee.window.showInformationMessage("Ricwiz: Successfully ran import data command!")}catch(r){let p=ee.window.createOutputChannel("Ricwiz Import Data");p.appendLine(`Error executing: ${o}`),r.stdout&&p.appendLine(r.stdout),r.stderr&&p.appendLine(r.stderr),p.appendLine(r.message),p.show(),ee.window.showErrorMessage("Ricwiz: Error running import data command. See output channel for details.")}})}var ee,Lo=z(()=>{"use strict";ee=y(require("vscode"));P()});async function Ao(){let t=x();if(!t){Q.window.showErrorMessage("Ricwiz: Open a folder or workspace that is a Git repository.");return}let e=await M.initialize(t,{skipPrompt:!0}),o=e?e.ticketSourceBranch:Q.workspace.getConfiguration("ricwiz").get("ticketSourceBranch","main"),s=e?e.originRemote:"origin",r="";try{r=await j(t)}catch{}let p=await Q.window.showInputBox({prompt:`Enter the branch name to list modified files (compared to ${o})`,value:r,placeHolder:"SFPSCA-1234"});if(!p)return;let{extractTicketSuggestion:l,resolvePrefix:g}=(P(),I(Te)),{ricwizLogger:m}=(Oe(),I(ot));await Q.window.withProgress({location:Q.ProgressLocation.Notification,title:`Ricwiz: Finding files for ${p}...`,cancellable:!1},async()=>{try{let a=e?e.ticketPrefix:Q.workspace.getConfiguration("ricwiz").get("ticketPrefix","SFPSC-"),i=g(p,a),n=l(p,i,!0)||p.replace(/-to-[a-zA-Z0-9]+$/i,""),{resolveExistingBranchName:d}=(ue(),I(be)),u=await d(t,n);m.appendLine(`[ListTicketFiles] targetBranch (raw): ${p}, resolvedTargetBranch: ${u}, ticketId: ${n}, originRemote: ${s}, sourceBranch: ${o}`);let f=[];try{let T="";try{m.appendLine(`[ListTicketFiles] Running: git merge-base ${s}/${o} ${u}`);let{stdout:S}=await h(`git merge-base ${s}/${o} ${u}`,{cwd:t});T=S.trim()}catch(S){m.appendLine(`[ListTicketFiles] First merge-base failed: ${S.message}`),m.appendLine(`[ListTicketFiles] Running: git merge-base ${o} ${u}`);let{stdout:D}=await h(`git merge-base ${o} ${u}`,{cwd:t});T=D.trim()}if(T){m.appendLine(`[ListTicketFiles] Merge base found: ${T}. Running git diff...`);let{stdout:S}=await h(`git diff --name-only ${T} ${u}`,{cwd:t,maxBuffer:10*1024*1024});f=S.split(`
`).map(D=>D.trim()).filter(D=>D.length>0),m.appendLine(`[ListTicketFiles] diff found ${f.length} files.`)}}catch(T){m.appendLine(`[ListTicketFiles] Diff strategy failed: ${T.message}`)}let c=[];try{m.appendLine(`[ListTicketFiles] Running git log fallback for ticketId: ${n}`);let{stdout:T}=await h(`git --no-pager log --grep="\\b${n}\\b" -i -E --name-only -m --first-parent --format=""`,{cwd:t,maxBuffer:10*1024*1024});c=T.split(`
`).map(S=>S.trim()).filter(S=>S.length>0),m.appendLine(`[ListTicketFiles] git log found ${c.length} files.`)}catch(T){m.appendLine(`[ListTicketFiles] Git log fallback failed: ${T.message}`)}let w=[...f,...c];if(w.length===0){Q.window.showInformationMessage(`Ricwiz: No modified files found for ${p}.`);return}let v=Array.from(new Set(w)).sort(),b={};for(let T of v){let S=T.match(/default\/([^/]+)/),D=S&&S[1]?S[1].toUpperCase():"OUTROS";b[D]||(b[D]=[]),b[D].push(T)}let k=`Files modified in branch ${p}:
`,B=Object.keys(b).sort();for(let T of B)k+=`
=== ${T} ===
`,k+=b[T].join(`
`)+`
`;let F=await Q.workspace.openTextDocument({content:k,language:"plaintext"});await Q.window.showTextDocument(F)}catch(a){Q.window.showErrorMessage(`Ricwiz: Error running git log - ${a.message}`)}})}var Q,Io=z(()=>{"use strict";Q=y(require("vscode"));P();N()});async function Fo(){let t=x();if(!t){re.window.showErrorMessage("Ricwiz: Open a folder or workspace that is a Git repository.");return}let o=re.workspace.getConfiguration("ricwiz").get("resetTrackingCommand","sf org disable tracking && sf project reset tracking --no-prompt");await re.window.withProgress({location:re.ProgressLocation.Notification,title:"Ricwiz: Resetting tracking...",cancellable:!1},async()=>{try{let{stdout:s,stderr:r}=await h(o,{cwd:t,maxBuffer:52428800}),p=re.window.createOutputChannel("Ricwiz Reset Tracking");p.appendLine(`Executing: ${o}`),p.appendLine(s),r&&(p.appendLine("--- STDERR ---"),p.appendLine(r)),p.show(),re.window.showInformationMessage("Ricwiz: Successfully reset tracking!")}catch(s){let r=re.window.createOutputChannel("Ricwiz Reset Tracking");r.appendLine(`Error executing: ${o}`),s.stdout&&r.appendLine(s.stdout),s.stderr&&r.appendLine(s.stderr),r.appendLine(s.message),r.show(),re.window.showErrorMessage("Ricwiz: Error resetting tracking. See output channel for details.")}})}var re,Oo=z(()=>{"use strict";re=y(require("vscode"));P()});async function Uo(){let t=x();if(!t){te.window.showErrorMessage("Ricwiz: Open a workspace first.");return}let e=["ApexClass","ApexTrigger","CustomObject","CustomField","LightningComponentBundle","AuraDefinitionBundle","Flow","CustomLabel","CustomMetadata","StaticResource","Profile","PermissionSet","PermissionSetGroup","Layout","ValidationRule","RecordType","ListView","Report","EmailTemplate","Other (Type manually)..."],o=await te.window.showQuickPick(e,{placeHolder:"Select Metadata Type to extract (e.g., ApexClass)",ignoreFocusOut:!0});if(!o||o==="Other (Type manually)..."&&(o=await te.window.showInputBox({prompt:"Enter Metadata Type (e.g., CustomApplication, Queue)",ignoreFocusOut:!0}),!o))return;let s={ApexClass:"**/*.cls",ApexTrigger:"**/*.trigger",CustomObject:"**/*.{object,object-meta.xml}",CustomField:"**/*.field-meta.xml",LightningComponentBundle:"**/lwc/*/*.js",AuraDefinitionBundle:"**/aura/*/*.cmp",Flow:"**/*.flow-meta.xml",CustomLabel:"**/*.labels-meta.xml",CustomMetadata:"**/*.md-meta.xml",StaticResource:"**/*.resource-meta.xml",Profile:"**/*.profile-meta.xml",PermissionSet:"**/*.permissionset-meta.xml",PermissionSetGroup:"**/*.permissionsetgroup-meta.xml",Layout:"**/*.layout-meta.xml",ValidationRule:"**/*.validationRule-meta.xml",RecordType:"**/*.recordType-meta.xml",ListView:"**/*.listView-meta.xml"},r=[],p=s[o];if(p)try{r=(await te.workspace.findFiles(p,"**/node_modules/**")).map(m=>{let a=m.fsPath.split(/[\\/]/).pop()||"";if(o==="LightningComponentBundle"||o==="AuraDefinitionBundle"){let i=m.fsPath.split(/[\\/]/);return i[i.length-2]||a.split(".")[0]}return a.split(".")[0]}),r=[...new Set(r)].sort()}catch{}let l=await new Promise(g=>{let m=te.window.createQuickPick();m.title=`Extract ${o}`,m.placeholder="Type name (e.g. MyComponent) or * for all",m.ignoreFocusOut=!0,m.matchOnDescription=!0;let a=()=>{let i=m.value.trim(),n=[];i?n.push({label:`$(cloud-download) Extract "${i}"`,description:"Extract exact name from Salesforce",alwaysShow:!0}):n.push({label:'$(cloud-download) Extract "*" (All)',description:`Extract all ${o}s`,alwaysShow:!0}),r.forEach(d=>{(!i||d.toLowerCase().includes(i.toLowerCase()))&&n.push({label:d,description:"Local workspace component"})}),m.items=n};m.onDidChangeValue(()=>a()),m.onDidAccept(()=>{let i=m.selectedItems[0];if(i){let n=i.label;n.startsWith('$(cloud-download) Extract "')?n=n.replace('$(cloud-download) Extract "',"").replace('" (All)',"").replace('"',""):n==='$(cloud-download) Extract "*" (All)'&&(n="*"),m.hide(),g(n)}}),m.onDidHide(()=>{m.dispose(),g(void 0)}),a(),m.show()});l&&await te.window.withProgress({location:te.ProgressLocation.Notification,title:`Ricwiz: Extracting ${o}:${l} from Salesforce...`,cancellable:!0},async(g,m)=>{try{U.show(!0);let a=`${o}:${l}`,{stdout:i,stderr:n}=await h(`sf project retrieve start -m "${a}"`,{cwd:t});i&&U.appendLine(i),n&&U.appendLine(n),te.window.showInformationMessage(`Ricwiz: Successfully extracted ${a}.`)}catch(a){U.appendLine(`ERROR: ${a.message}`),a.stdout&&U.appendLine(a.stdout),a.stderr&&U.appendLine(a.stderr),te.window.showErrorMessage("Ricwiz: Extraction failed. See Output channel for details.")}})}var te,jo=z(()=>{"use strict";te=y(require("vscode"));P()});async function Wo(){let t=G.window.activeTextEditor;if(!t){G.window.showErrorMessage("Ricwiz: Please open the file you want to deploy in the editor first.");return}let e=t.document.uri.fsPath,o=x();if(!o)return;let s="";if(await G.window.withProgress({location:G.ProgressLocation.Notification,title:"Ricwiz: Fetching available Salesforce orgs...",cancellable:!1},async()=>{try{let{stdout:m}=await h("sf org list --json",{cwd:o});s=m}catch(m){s=m.stdout||""}}),!s){G.window.showErrorMessage("Ricwiz: Failed to fetch orgs. Is Salesforce CLI installed?");return}let r=[];try{let m=JSON.parse(s),a=m.result?.nonScratchOrgs||[],i=m.result?.scratchOrgs||[];r=[...a,...i]}catch{G.window.showErrorMessage("Ricwiz: Failed to parse org list.");return}if(r.length===0){G.window.showInformationMessage("Ricwiz: No authenticated orgs found.");return}let p=r.map(m=>({label:m.alias||m.username,description:m.alias?m.username:"",picked:m.isDefaultUsername})),l=await G.window.showQuickPick(p,{placeHolder:"Select the org(s) to deploy this file to",canPickMany:!0,ignoreFocusOut:!0});if(!l||l.length===0)return;let g=No.basename(e);await G.window.withProgress({location:G.ProgressLocation.Notification,title:`Ricwiz: Deploying ${g} to ${l.length} org(s)...`,cancellable:!1},async()=>{U.show(!0),U.appendLine(`--- Starting Parallel Deploy of ${g} ---`);let m=l.map(async d=>{let u=d.label;U.appendLine(`[${u}] Deploying...`);try{let{stdout:f,stderr:c}=await h(`sf project deploy start -d "${e}" -o "${u}"`,{cwd:o});return U.appendLine(`[${u}] \u2705 Success`),f&&U.appendLine(f),{org:u,success:!0}}catch(f){return U.appendLine(`[${u}] \u274C Failed`),f.stdout&&U.appendLine(f.stdout),f.stderr&&U.appendLine(f.stderr),{org:u,success:!1}}}),a=await Promise.all(m),i=a.filter(d=>d.success).length,n=a.filter(d=>!d.success).length;n===0?G.window.showInformationMessage(`Ricwiz: Successfully deployed to all ${i} orgs!`):G.window.showErrorMessage(`Ricwiz: Deploy finished with errors (${i} success, ${n} failed). Check Output channel.`)})}var G,No,Jo=z(()=>{"use strict";G=y(require("vscode")),No=y(require("path"));P()});async function qo(){let t=x();if(!t){O.window.showErrorMessage("Ricwiz: Open a folder or workspace that is a Git repository.");return}let e=O.workspace.getConfiguration("ricwiz"),o=e.get("auditUsername",""),s=e.get("auditHours",8),r=await O.window.showInputBox({prompt:"Enter your Salesforce Username to query in SetupAuditTrail",value:o,placeHolder:"admin@tuaorg.com"});if(!r)return;let p=await O.window.showInputBox({prompt:"How many hours back do you want to search?",value:s.toString(),placeHolder:"8"});if(!p)return;let l=parseFloat(p);if(isNaN(l)||l<=0){O.window.showErrorMessage("Ricwiz: Invalid hours specified.");return}let g=new Date(Date.now()-l*60*60*1e3).toISOString(),a=`sf data query -q "${`SELECT Action, Display, Section FROM SetupAuditTrail WHERE CreatedBy.Username = '${r}' AND CreatedDate >= ${g}`}" --json`;await O.window.withProgress({location:O.ProgressLocation.Notification,title:"Ricwiz: Interrogating Setup Audit Trail...",cancellable:!1},async()=>{try{let{stdout:i}=await h(a,{cwd:t,maxBuffer:52428800}),n=JSON.parse(i);if(!n.result||n.result.records.length===0){O.window.showInformationMessage(`Ricwiz: No changes found for ${r} in the last ${l} hours.`);return}let d=n.result.records,u=[],f=new Set;for(let S of d){let D=gi(S.Action,S.Display,S.Section);if(D){let oe=`${D.isDelete?"DEL":"ADD"}-${D.metadataFormat}`;if(!f.has(oe)){f.add(oe);let Y=D.isDelete?"$(trash)":"$(plus)";u.push({label:`${Y} ${D.metadataFormat}`,description:`${S.Action} -> ${S.Display}`,metadataFormat:D.metadataFormat,isDelete:D.isDelete})}}}if(u.length===0){O.window.showInformationMessage(`Ricwiz: No extractable metadata changes found for ${r} in the last ${l} hours (ignored passwords/logins).`);return}let c=await O.window.showQuickPick(u,{canPickMany:!0,placeHolder:"Select the changes you want to extract to GitLab",ignoreFocusOut:!0});if(!c||c.length===0){O.window.showInformationMessage("Ricwiz: No changes selected.");return}let w=c.filter(S=>S.isDelete),v=c.filter(S=>!S.isDelete),b=O.window.createOutputChannel("Ricwiz Admin Bridge");if(b.show(),w.length>0){let{stdout:S}=await h("git ls-files",{cwd:t}),D=S.split(`
`).map(Y=>Y.trim()),oe=0;for(let Y of w){let pe=Y.metadataFormat.split(":"),qe=pe[0],Ge=pe[1],ye=Ge;qe==="CustomField"&&(ye=Ge.split(".")[1]);let at=D.filter(Pe=>{let L=rt.basename(Pe);return L.startsWith(ye+".")&&L.includes(qe==="CustomField"?".field":"")});for(let Pe of at){let L=rt.join(t,Pe);st.existsSync(L)&&(st.unlinkSync(L),b.appendLine(`Deleted local file: ${Pe}`),oe++)}}O.window.showInformationMessage(`Ricwiz: Deleted ${oe} local files from Git workspace.`)}if(v.length===0)return;let k=v.map(S=>S.metadataFormat).filter(S=>S!=="").join(", "),B=await O.window.showInputBox({prompt:"Review and adjust the metadata components to retrieve",value:k,ignoreFocusOut:!0});if(!B)return;let F=`sf project retrieve start -m "${B}"`;b.appendLine(`Executing: ${F}`),O.window.showInformationMessage(`Ricwiz: Extracting ${v.length} components...`);let T=await h(F,{cwd:t});b.appendLine(T.stdout),T.stderr&&(b.appendLine("--- STDERR ---"),b.appendLine(T.stderr)),O.window.showInformationMessage("Ricwiz: Changes extracted successfully! Ready for Git Commit.")}catch(i){O.window.showErrorMessage(`Ricwiz: Error capturing changes - ${i.message}`)}})}function gi(t,e,o){if(!t||!e||!o)return null;let s=t.toLowerCase(),r=o.toLowerCase();if(["security controls","network access","session settings","data export","login history","password policies","identity verification","delegated administration"].includes(r)||s.includes("login")||s.includes("password")||s.includes("oauth")||s.includes("session"))return null;let l=s.includes("delete"),g=null;if(s==="permissionsetgroupcomponentadd"||s==="permissionsetgroupcomponentdelete")return null;let m=(a,i=!1)=>{let n=a.replace(/\(.*\)/g,"").trim();n.includes(":")&&!s.includes("calculation")&&(n=n.split(":")[0]);let d=["disabled","deleted","removed","created","changed","updated","from","to","on","assigned","assign","assignment","permission","set","group","apex","class","trigger","custom","field","object","layout","validation","rule","flow","profile"],u=n.split(/\s+/);if(i){for(;u.length>0&&d.includes(u[u.length-1].toLowerCase());)u.pop();for(;u.length>0&&d.includes(u[0].toLowerCase());)u.shift();return u.join(" ").trim().replace(/[^a-zA-Z0-9_ ]/g,"")}else return u.filter(w=>!d.includes(w.toLowerCase())).join("_").replace(/[^a-zA-Z0-9_]/g,"")||n.replace(/\s+/g,"")};if(s.includes("profile"))g=`Profile:${m(e,!0)}`;else if(s.includes("permissionsetgroupcalculation")){let a=e.split(":");g=`PermissionSetGroup:${a.length>1?a[a.length-1].trim():m(e,!1)}`}else if(s.includes("permission set group")||s.includes("permissionsetgroup"))g=`PermissionSetGroup:${m(e,!1)}`;else if(s.includes("permission set")||s.includes("permissionset"))g=`PermissionSet:${m(e,!1)}`;else if(s.includes("apexclass"))g=`ApexClass:${m(e,!1)}`;else if(s.includes("apextrigger")||s.includes("apex trigger"))g=`ApexTrigger:${m(e,!1)}`;else if(s.includes("customfield")){let a=e.match(/([A-Za-z0-9_]+__c)/),i=e.match(/(?:on|na|for)\s+([A-Za-z0-9_]+)/i);a&&i?g=`CustomField:${i[1]}.${a[1]}`:g=`CustomField:${m(e,!1)}`}else if(s.includes("layout"))g=`Layout:${m(e,!0)}`;else if(s.includes("validation"))g=`ValidationRule:${m(e,!1)}`;else if(s.includes("flow"))g=`Flow:${m(e,!1)}`;else if(s.includes("customobject")){let a=e.match(/([A-Za-z0-9_]+__c)/);g=a?`CustomObject:${a[1]}`:`CustomObject:${m(e,!1)}`}else if(!s.includes("created")&&!s.includes("changed")&&!s.includes("deleted"))return null;return g?{metadataFormat:g,isDelete:l}:null}var O,st,rt,Go=z(()=>{"use strict";O=y(require("vscode")),st=y(require("fs")),rt=y(require("path"));P()});async function Ho(){let t=x();if(t)try{let{stdout:e}=await h('git for-each-ref --sort=-committerdate --format="%(refname:short)|||%(committerdate:relative)|||%(subject)" refs/heads/',{cwd:t}),o=e.split(`
`).filter(r=>r.trim()).map(r=>{let p=r.split("|||");return{label:`$(git-branch) ${p[0]}`,description:p[1],detail:p[2],branchName:p[0]}}),s=await wt.window.showQuickPick(o,{placeHolder:"Select a branch from history to checkout",matchOnDescription:!0,matchOnDetail:!0});s&&await Le(s.branchName)}catch{wt.window.showErrorMessage("Ricwiz: Failed to get branch history")}}var wt,Vo=z(()=>{"use strict";wt=y(require("vscode"));P();it()});async function _o(){let t=x();if(!t)return;let e=await Ne.window.showInputBox({prompt:"Enter ticket number or name (e.g., 48934)",placeHolder:"48934"});if(e)try{let{stdout:o}=await h(`git branch --list "*${e}*"`,{cwd:t}),s=o.split(`
`).map(l=>l.replace("*","").trim()).filter(l=>l);if(s.length===0){Ne.window.showInformationMessage(`Ricwiz: No branches found matching "${e}"`);return}let r=s.map(l=>({label:`$(git-branch) ${l}`,branchName:l})),p=await Ne.window.showQuickPick(r,{placeHolder:`Select a branch for ${e}`});p&&await Le(p.branchName)}catch{Ne.window.showErrorMessage("Ricwiz: Failed to search branches")}}var Ne,Qo=z(()=>{"use strict";Ne=y(require("vscode"));P();it()});async function Ko(){let t=ze.window.activeTextEditor;if(!t)return ze.window.showErrorMessage("Ricwiz: Please open a file in the editor to check blame."),null;let e=t.document.fileName,o=Yo.basename(e),s=x();if(!s)return ze.window.showErrorMessage("Ricwiz: Workspace is not a git repository."),null;let r=[];try{let{stdout:i}=await h(`git log -5 --pretty=format:"%an|%ar|%s|%h" -- "${e}"`,{cwd:s}),n=i.trim().split(`
`);for(let d of n){let u=d.split("|");u.length>=4&&r.push({author:u[0],time:u[1],message:u.slice(2,-1).join("|"),hash:u[u.length-1]})}}catch(i){console.error("Git blame error:",i)}let p="Unknown",l="Unknown",g="Unknown",m=[],a=fi(e);if(a)try{await ze.window.withProgress({location:ze.ProgressLocation.Notification,title:`Ricwiz: Analyzing ${a.name} in Salesforce...`,cancellable:!1},async()=>{let i="";if(a.type==="CustomField"){let n=a.name.split(".");n.length===2&&(i=`SELECT LastModifiedBy.Name, LastModifiedDate, CreatedBy.Name FROM CustomField WHERE DeveloperName = '${n[1].replace("__c","")}' AND TableEnumOrId = '${n[0]}'`)}else a.type==="LightningComponentBundle"?i=`SELECT LastModifiedBy.Name, LastModifiedDate, CreatedBy.Name FROM LightningComponentBundle WHERE DeveloperName = '${a.name}'`:i=`SELECT LastModifiedBy.Name, LastModifiedDate, CreatedBy.Name FROM ${a.type} WHERE Name = '${a.name}'`;if(i)try{let{stdout:n}=await h(`sf data query -t -q "${i}" --json`,{cwd:s,maxBuffer:52428800}),d=JSON.parse(n);if(d&&d.result&&d.result.records&&d.result.records.length>0){let u=d.result.records[0];p=u.LastModifiedBy?u.LastModifiedBy.Name:"Unknown",g=u.CreatedBy?u.CreatedBy.Name:"Unknown",l=new Date(u.LastModifiedDate).toLocaleString()}else p="Not found in Org",l="N/A",g="N/A"}catch{p="Query Error",l="N/A",g="N/A"}try{let n="SELECT Action, Display, CreatedBy.Name, CreatedDate FROM SetupAuditTrail ORDER BY CreatedDate DESC LIMIT 1500",{stdout:d}=await h(`sf data query -q "${n}" --json`,{cwd:s,maxBuffer:52428800}),u=JSON.parse(d);if(u&&u.result&&u.result.records){let f=a.name.replace("__c","");m=u.result.records.filter(w=>w.Display&&w.Display.includes(f)).map(w=>({action:w.Action,display:w.Display,author:w.CreatedBy?w.CreatedBy.Name:"Unknown",time:new Date(w.CreatedDate).toLocaleString()})).slice(0,10)}}catch(n){console.error("Audit trail query error:",n)}})}catch(i){console.error("Salesforce query error:",i)}else p="Unsupported Metadata Type",l="N/A";return{fileName:o,gitHistory:r,sfAuthor:p,sfTime:l,sfCreatedBy:g,auditHistory:m}}function fi(t){let e=t.replace(/\\/g,"/");if(e.includes("/classes/")){let o=e.match(/\/classes\/([^/.]+)\.cls/);if(o)return{type:"ApexClass",name:o[1]}}if(e.includes("/triggers/")){let o=e.match(/\/triggers\/([^/.]+)\.trigger/);if(o)return{type:"ApexTrigger",name:o[1]}}if(e.includes("/lwc/")){let o=e.match(/\/lwc\/([^/]+)\//);if(o)return{type:"LightningComponentBundle",name:o[1]}}if(e.includes("/aura/")){let o=e.match(/\/aura\/([^/]+)\//);if(o)return{type:"AuraDefinitionBundle",name:o[1]}}if(e.includes("/objects/")&&e.includes("/fields/")){let o=e.match(/\/objects\/([^/]+)\//),s=e.match(/\/fields\/([^/.]+)\.field/);if(o&&s)return{type:"CustomField",name:`${o[1]}.${s[1]}`}}return null}var ze,Yo,Zo=z(()=>{"use strict";ze=y(require("vscode")),Yo=y(require("path"));P()});async function Xo(t,e){let o=x();if(!o)return;let s=(await Ie())?.trim();if(!s){ae.window.showErrorMessage("Ricwiz: GitLab token is not configured.");return}try{let r=await M.initialize(o,{skipPrompt:!0});if(!r)return;let p=ae.workspace.getConfiguration("ricwiz"),g=r.getConfig("gitlabUrlOverride","");if(g){let m=new URL(g);g=`${m.protocol}//${m.host}`}else{let{stdout:m}=await h("git remote",{cwd:o}),a=m.split(`
`).map(n=>n.trim()).filter(n=>n),i=!1;for(let n of a){let{stdout:d}=await h(`git remote get-url ${n}`,{cwd:o}),u=d.trim();u.endsWith(".git")&&(u=u.slice(0,-4)),u.startsWith("git@")&&(u=u.replace("git@","").replace(":","/"),u=`https://${u}`);let f=new URL(u),c=f.pathname;if(c.startsWith("/")&&(c=c.substring(1)),c.endsWith("/")&&(c=c.slice(0,-1)),encodeURIComponent(c)===t||c===t){g=`${f.protocol}//${f.host}`,i=!0;break}}if(!i){ae.window.showErrorMessage(`Ricwiz: Could not determine base URL for project ${t}`);return}}await ae.window.withProgress({location:ae.ProgressLocation.Notification,title:`Fetching failed jobs for Pipeline #${e}...`,cancellable:!1},async()=>{let m=new URL(`${g}/api/v4/projects/${t}/pipelines/${e}/jobs?scope[]=failed`),a=await new Promise((c,w)=>{vt.get(m,{headers:{"PRIVATE-TOKEN":s}},v=>{let b="";v.on("data",k=>b+=k),v.on("end",()=>{if(v.statusCode===200)try{c(JSON.parse(b))}catch{c([])}else c([])})}).on("error",()=>c([]))});if(!a||a.length===0){ae.window.showInformationMessage("Ricwiz: No failed jobs found for this pipeline.");return}let i=a[0],n=new URL(`${g}/api/v4/projects/${t}/jobs/${i.id}/trace`),u=(await new Promise((c,w)=>{vt.get(n,{headers:{"PRIVATE-TOKEN":s}},v=>{let b="";v.on("data",k=>b+=k),v.on("end",()=>c(b))}).on("error",v=>c(`Failed to fetch log: ${v.message}`))})).replace(/\x1B\[[0-9;]*[mK]/g,""),f=ae.window.createOutputChannel(`Pipeline #${e} - Job ${i.name}`);f.appendLine(`Pipeline ID: ${e}`),f.appendLine(`Job Name: ${i.name}`),f.appendLine(`Status: ${i.status}`),f.appendLine(`URL: ${i.web_url}`),f.appendLine("========================================"),f.appendLine(u),f.show()})}catch(r){ae.window.showErrorMessage(`Ricwiz: Error fetching pipeline logs - ${r.message}`)}}var ae,vt,ei=z(()=>{"use strict";ae=y(require("vscode"));ke();P();vt=y(require("https"));N();P()});function ti(t,e,o){t.subscriptions.push($.commands.registerCommand("ricwiz.generateDestructiveChanges",Mt),$.commands.registerCommand("ricwiz.runSmartTests",Lt),$.commands.registerCommand("ricwiz.refreshWebview",()=>{e&&$.commands.executeCommand("workbench.action.webview.reloadWebviewAction")}),$.commands.registerCommand("ricwiz.createBranches",Ft),$.commands.registerCommand("ricwiz.prepareDeploy",Jt),$.commands.registerCommand("ricwiz.createMergeRequests",Ht),$.commands.registerCommand("ricwiz.createMergeRequestsVSCode",Vt),$.commands.registerCommand("ricwiz.openJiraTicket",Yt),$.commands.registerCommand("ricwiz.openJiraTicketVSCode",Kt),$.commands.registerCommand("ricwiz.showJiraDetails",()=>{e&&ao(e)}),$.commands.registerCommand("ricwiz.openJiraDashboard",s=>{e&&lo(e,s)}),$.commands.registerCommand("ricwiz.openJiraDetailsForId",s=>{e&&po(e,s)}),$.commands.registerCommand("ricwiz.toggleDashboardBranches",s=>{e&&(e.setDashboardShowBranches(s),$.commands.executeCommand("ricwiz.openJiraDashboard"))}),$.commands.registerCommand("ricwiz.changeJiraStatus",uo),$.commands.registerCommand("ricwiz.addJiraComment",go),$.commands.registerCommand("ricwiz.addJiraLabel",fo),$.commands.registerCommand("ricwiz.setJiraToken",ho),$.commands.registerCommand("ricwiz.setGitlabToken",vo),$.commands.registerCommand("ricwiz.syncAll",yo),$.commands.registerCommand("ricwiz.updateBases",ko),$.commands.registerCommand("ricwiz.deleteUnusedBranches",$o),$.commands.registerCommand("ricwiz.checkoutBranch",Le),$.commands.registerCommand("ricwiz.copyBranchName",zo),$.commands.registerCommand("ricwiz.generatePackageXml",Bo),$.commands.registerCommand("ricwiz.deployPackage",To),$.commands.registerCommand("ricwiz.importData",Do),$.commands.registerCommand("ricwiz.listTicketFiles",Ao),$.commands.registerCommand("ricwiz.resetTracking",Fo),$.commands.registerCommand("ricwiz.extractComponent",Uo),$.commands.registerCommand("ricwiz.deployMultiOrg",Wo),$.commands.registerCommand("ricwiz.captureAdminChanges",qo),$.commands.registerCommand("ricwiz.openHistory",Ho),$.commands.registerCommand("ricwiz.searchTicket",_o),$.commands.registerCommand("ricwiz.whoToBlame",async()=>{let s=await Ko();s&&e&&(e.setBlameData(s),e.setPage("blame"))}),$.commands.registerCommand("ricwiz.showPipelineLogs",(s,r)=>Xo(s,r)),$.commands.registerCommand("ricwiz.manualRefresh",()=>{o&&o()}),$.commands.registerCommand("ricwiz.toggleAutoRefresh",()=>{if(e){let s=!e.isAutoRefreshEnabled();e.setAutoRefresh(s),$.workspace.getConfiguration("ricwiz").update("autoRefresh",s,$.ConfigurationTarget.Global)}}),$.commands.registerCommand("ricwiz.openSettings",()=>{$.commands.executeCommand("workbench.action.openSettings","ricwiz")}))}var $,oi=z(()=>{"use strict";$=y(require("vscode"));Dt();At();Ot();qt();_t();Zt();co();mo();wo();bo();xo();Co();Ro();it();Po();Eo();Mo();Lo();Io();Oo();jo();Jo();Go();Vo();Qo();Zo();ei()});function ii(t,e,o){let s,r=le.workspace.getConfiguration("ricwiz").get("autoRefresh",!0);e?.setAutoRefresh(r),t.subscriptions.push(le.workspace.onDidChangeConfiguration(l=>{if(l.affectsConfiguration("ricwiz.autoRefresh")){let g=le.workspace.getConfiguration("ricwiz").get("autoRefresh",!0);e?.setAutoRefresh(g)}}));async function p(){let l=le.extensions.getExtension("vscode.git");if(l){let a=function(i){let n="",d;async function u(){let c=le.workspace.workspaceFolders;if(!c)return;let w=c[0].uri.fsPath,v=await j(w);if(v&&v!==n){n=v;let b=le.workspace.getConfiguration("ricwiz"),k=b.get("ticketPrefix","SFPSCA-");if(!v.includes(k)){let L=v.match(/([A-Z]+-)\d+/i);L&&(k=L[1].toUpperCase())}let B=[],F=[],T=[],S=[],D=await M.initialize(w,{skipPrompt:!0}),oe=D?.environments||b.get("environments",[{name:"Qual",sourceBranch:"quality"},{name:"Val",sourceBranch:"validation"},{name:"Prod",sourceBranch:"main"}]);try{let L=b.get("workspaceCheckoutButtons",["main","quality","validation"]);T=Array.from(new Set(L))}catch{}let Y="",pe=v.match(new RegExp(`(${k}\\d+(?:-\\d+)?)`,"i"));if(pe){let L=pe[1].toUpperCase();Y=L;let xe=b.get("commitMessageSuffix","- "),bt=/^[A-Z]+-\d+(?:-\d+)?\s*(?:-\s*|:\s*|\s+)?/i;bt.test(i.inputBox.value)?i.inputBox.value.toUpperCase().startsWith(L)||(i.inputBox.value=i.inputBox.value.replace(bt,`${L}${xe}`)):i.inputBox.value=`${L}${xe}`+i.inputBox.value,o.text=`$(bookmark) ${L}`,o.tooltip=`Branch: ${v}
Click to open Jira ticket`,o.show();try{let yt=await ft(w,L,"");B=await pt(w,yt,L,oe,D)}catch{}}else{o.hide();try{S=await gt(w)}catch{}}let[qe,Ge,ye]=await Promise.all([ut(w,10),mt(w,v,oe,D),Y?De(Y).catch(L=>{let xe=L.message;return(xe.includes("ENOTFOUND")||xe.includes("network"))&&(xe="No Internet or Invalid URL"),{summary:`\u26A0\uFE0F Jira Error: ${xe}`,description:"",status:""}}):Promise.resolve(null)]);F=qe;let at=ye?ye.summary:"",Pe=ye&&ye.status||"";e?.updateBranch(v,Ge,B,F,T,S,at,Pe)}}function f(){e?.isAutoRefreshEnabled()&&(d&&clearTimeout(d),d=setTimeout(()=>{n="",u()},300))}s=()=>{n="",u()},u(),i.state.onDidChange(()=>f()),le.window.onDidChangeWindowState(c=>{c.focused&&f()})};var g=a;l.isActive||await l.activate();let m=l.exports.getAPI(1);m.repositories.length>0&&m.repositories.forEach(i=>a(i)),m.onDidOpenRepository(i=>a(i))}}return p(),()=>{s&&s()}}var le,ni=z(()=>{"use strict";le=y(require("vscode"));P();ue();Ue();N()});var Ye={};Ae(Ye,{activate:()=>hi,deactivate:()=>wi,webviewProvider:()=>We});module.exports=I(Ye);function hi(t){Ct(t),We=new Ve(t.extensionUri),t.subscriptions.push(Je.window.registerWebviewViewProvider("ricwiz-webview",We));let e=Je.window.createStatusBarItem(Je.StatusBarAlignment.Left,100);e.command="ricwiz.openJiraTicket",t.subscriptions.push(e);let o=ii(t,We,e);ti(t,We,o)}function wi(){}var Je,We,Ke=z(()=>{Je=y(require("vscode"));kt();ke();oi();ni()});Ke();0&&(module.exports={activate,deactivate,webviewProvider});
