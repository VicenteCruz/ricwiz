"use strict";var Ko=Object.create;var Fe=Object.defineProperty;var Xo=Object.getOwnPropertyDescriptor;var ei=Object.getOwnPropertyNames;var ti=Object.getPrototypeOf,oi=Object.prototype.hasOwnProperty;var $=(t,e,o)=>()=>{if(o)throw o[0];try{return t&&(e=t(t=0)),e}catch(i){throw o=[i],i}};var Ye=(t,e)=>{for(var o in e)Fe(t,o,{get:e[o],enumerable:!0})},lt=(t,e,o,i)=>{if(e&&typeof e=="object"||typeof e=="function")for(let s of ei(e))!oi.call(t,s)&&s!==o&&Fe(t,s,{get:()=>e[s],enumerable:!(i=Xo(e,s))||i.enumerable});return t};var v=(t,e,o)=>(o=t!=null?Ko(ti(t)):{},lt(e||!t||!t.__esModule?Fe(o,"default",{value:t,enumerable:!0}):o,t)),ee=t=>lt(Fe({},"__esModule",{value:!0}),t);function C(t){return t.replace(/&/g,"&amp;").replace(/</g,"&lt;").replace(/>/g,"&gt;").replace(/"/g,"&quot;").replace(/'/g,"&#39;")}var b,Oe,mt=$(()=>{"use strict";b=v(require("vscode"));Oe=class{constructor(e){this._extensionUri=e}_extensionUri;webviewView;resolveWebviewView(e,o,i){this.webviewView=e,e.webview.options={enableScripts:!0,localResourceRoots:[this._extensionUri]},this.updateBranch("",!1),e.webview.onDidReceiveMessage(s=>{switch(s.command){case"createBranches":b.commands.executeCommand("ricwiz.createBranches");break;case"createBranchForTicket":b.commands.executeCommand("ricwiz.createBranches",s.args);break;case"prepareDeploy":b.commands.executeCommand("ricwiz.prepareDeploy");break;case"openMRs":b.commands.executeCommand("ricwiz.createMergeRequests");break;case"openMRsVSCode":b.commands.executeCommand("ricwiz.createMergeRequestsVSCode");break;case"openExternal":s.args&&b.env.openExternal(b.Uri.parse(s.args));break;case"openJira":b.commands.executeCommand("ricwiz.openJiraTicket");break;case"showJiraDetails":b.commands.executeCommand("ricwiz.showJiraDetails");break;case"changeJiraStatus":b.commands.executeCommand("ricwiz.changeJiraStatus");break;case"addJiraComment":b.commands.executeCommand("ricwiz.addJiraComment");break;case"addJiraLabel":b.commands.executeCommand("ricwiz.addJiraLabel");break;case"setPage":this.setPage(s.args);break;case"openDashboard":b.commands.executeCommand("ricwiz.openJiraDashboard");break;case"openJiraDetailsForId":b.commands.executeCommand("ricwiz.openJiraDetailsForId",s.args);break;case"refreshDashboard":b.commands.executeCommand("ricwiz.openJiraDashboard");break;case"switchDashboardQuery":b.commands.executeCommand("ricwiz.openJiraDashboard",parseInt(s.args));break;case"toggleDashboardBranches":b.commands.executeCommand("ricwiz.toggleDashboardBranches",s.args);break;case"openJiraVSCode":b.commands.executeCommand("ricwiz.openJiraTicketVSCode");break;case"openSettings":b.commands.executeCommand("ricwiz.openSettings");break;case"checkout":s.branch&&b.commands.executeCommand("ricwiz.checkoutBranch",s.branch);break;case"copyBranch":b.commands.executeCommand("ricwiz.copyBranchName");break;case"generatePackageXml":b.commands.executeCommand("ricwiz.generatePackageXml");break;case"openDevTools":this.setPage("devtools");break;case"openMain":this.setPage("main");break;case"generateDestructiveChanges":b.commands.executeCommand("ricwiz.generateDestructiveChanges");break;case"deployPackage":b.commands.executeCommand("ricwiz.deployPackage");break;case"runSmartTests":b.commands.executeCommand("ricwiz.runSmartTests");break;case"importData":b.commands.executeCommand("ricwiz.importData");break;case"listTicketFiles":b.commands.executeCommand("ricwiz.listTicketFiles");break;case"resetTracking":b.commands.executeCommand("ricwiz.resetTracking");break;case"extractComponent":b.commands.executeCommand("ricwiz.extractComponent");break;case"deployMultiOrg":b.commands.executeCommand("ricwiz.deployMultiOrg");break;case"captureAdminChanges":b.commands.executeCommand("ricwiz.captureAdminChanges");break;case"whoToBlame":b.commands.executeCommand("ricwiz.whoToBlame");break;case"syncAll":b.commands.executeCommand("ricwiz.syncAll");break;case"updateBases":b.commands.executeCommand("ricwiz.updateBases");break;case"deleteUnused":b.commands.executeCommand("ricwiz.deleteUnusedBranches");break;case"conflict_commitAndContinue":b.commands.executeCommand("ricwiz.conflictAction","commitAndContinue");break;case"conflict_resolveDeletions":b.commands.executeCommand("ricwiz.conflictAction","resolveDeletions");break;case"conflict_abortDeploy":b.commands.executeCommand("ricwiz.conflictAction","abortDeploy");break;case"openFile":if(s.file){let u=b.workspace.workspaceFolders;if(u){let a=b.Uri.joinPath(u[0].uri,s.file);b.commands.executeCommand("vscode.open",a)}}break;case"searchTicket":b.commands.executeCommand("ricwiz.searchTicket");break;case"manualRefresh":b.commands.executeCommand("ricwiz.manualRefresh");break;case"toggleAutoRefresh":b.commands.executeCommand("ricwiz.toggleAutoRefresh");break;case"openHistory":b.commands.executeCommand("ricwiz.openHistory");break}})}conflictState=null;setConflictState(e){this.conflictState=e,this.updateView()}updateBranch(e,o,i=[],s=[],u=[],a=[],p="",l=""){this.webviewView&&(this.currentBranchCache=e,this.currentBranchIsMergedCache=o,this.relatedBranchesCache=i,this.commitsCache=s,this.baseBranchesCache=u,this.recentTicketsCache=a,this.ticketTitleCache=p,this.ticketStatusCache=l,this.updateView())}currentBranchCache="";currentBranchIsMergedCache=!1;relatedBranchesCache=[];commitsCache=[];baseBranchesCache=[];recentTicketsCache=[];ticketTitleCache="";ticketStatusCache="";currentPage="main";blameDataCache=null;jiraDataCache=null;dashboardDataCache=null;dashboardShowBranches=!1;autoRefreshEnabled=!0;setDashboardShowBranches(e){this.dashboardShowBranches=e}getDashboardShowBranches(){return this.dashboardShowBranches}setBlameData(e){this.blameDataCache=e}setJiraData(e){this.jiraDataCache=e}setDashboardData(e){this.dashboardDataCache=e}setAutoRefresh(e){this.autoRefreshEnabled=e,this.updateView()}isAutoRefreshEnabled(){return this.autoRefreshEnabled}setPage(e){this.currentPage=e,this.updateView()}updateView(){if(!this.webviewView)return;let e=this.webviewView.webview.asWebviewUri(b.Uri.joinPath(this._extensionUri,"resources","logo.png"));this.webviewView.webview.html=this._getHtmlForWebview(e,this.currentBranchCache,this.relatedBranchesCache,this.commitsCache,this.baseBranchesCache,this.recentTicketsCache,this.currentPage)}_getHtmlForWebview(e,o,i,s,u,a,p){let l=s.length>0?`
            <div class="separator"></div>
            <div style="padding: 0 4px;">
                <div style="font-size: 11px; opacity: 0.7; margin-bottom: 6px; display: flex; align-items: center; gap: 4px;">
                    <span>\u{1F4DC}</span> Recent Commits
                </div>
                <div style="display: flex; flex-direction: column; gap: 2px;">
                    ${s.map(g=>`
                        <div style="font-size: 11px; padding: 3px 4px; border-radius: 2px; display: flex; gap: 6px; align-items: baseline;">
                            <code style="color: var(--vscode-textLink-foreground); font-size: 10px; flex-shrink: 0;">${C(g.hash)}</code>
                            <span style="flex: 1; overflow: hidden; text-overflow: ellipsis; white-space: nowrap;" title="${C(g.message)}">${C(g.message)}</span>
                            <span style="font-size: 9px; opacity: 0.5; flex-shrink: 0;">${C(g.timeAgo)}</span>
                        </div>
                    `).join("")}
                </div>
            </div>
        `:"",d=`
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
        `;if(this.conflictState){let g=(this.conflictState.files||[]).map(w=>`
                <button class="btn" style="padding: 6px; font-size: 12px; display: flex; justify-content: space-between; align-items: center;" onclick="sendOpenFileCommand('${C(w.file)}')">
                    <span style="flex: 1; overflow: hidden; text-overflow: ellipsis; white-space: nowrap; direction: rtl; text-align: left;">&lrm;${C(w.file)}</span>
                    <span style="font-size: 10px; opacity: 0.8; flex-shrink: 0; background-color: var(--vscode-badge-background); color: var(--vscode-badge-foreground); padding: 2px 4px; border-radius: 2px;">${C(w.state)}</span>
                </button>
            `).join("");return`<!DOCTYPE html>
            <html lang="en">
            <head>
                <meta charset="UTF-8">
                <meta name="viewport" content="width=device-width, initial-scale=1.0">
                <title>Ricwiz Conflict</title>
                ${d}
            </head>
            <body>
                <div style="text-align: center; margin-bottom: 12px; margin-top: 8px;">
                    <img src="${e}" alt="Ricwiz Logo" style="width: 80px; height: 80px; opacity: 0.9;" />
                </div>
                <div style="background-color: var(--vscode-editorError-background); color: var(--vscode-editorError-foreground); padding: 12px; border-radius: 4px; margin-bottom: 12px; text-align: center;">
                    <div style="font-size: 14px; font-weight: bold; margin-bottom: 8px;">\u26A0\uFE0F MERGE CONFLICT</div>
                    <div style="font-size: 11px; margin-bottom: 12px; opacity: 0.9;">
                        Merging <b>${C(this.conflictState.sourceStr)}</b> into <b>${C(this.conflictState.targetStr)}</b>.<br/>
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
                
                ${g?`
                    <div style="font-size: 11px; opacity: 0.7; margin: 8px 4px 4px 4px; text-transform: uppercase;">Conflicted Files</div>
                    <div style="display: flex; flex-direction: column; gap: 2px;">
                        ${g}
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
            </html>`}if(p==="blame"){let g=this.blameDataCache;return`<!DOCTYPE html>
            <html lang="en">
            <head>
                <meta charset="UTF-8">
                <meta name="viewport" content="width=device-width, initial-scale=1.0">
                <title>Ricwiz Blame</title>
                ${d}
            </head>
            <body>
                <div style="display: flex; align-items: center; gap: 8px; margin-bottom: 16px; margin-top: 8px;">
                    <button class="btn" style="width: auto; padding: 4px 8px; background-color: var(--vscode-button-secondaryBackground); color: var(--vscode-button-secondaryForeground);" onclick="sendCommand('openDevTools')">\u2190 Back</button>
                    <div style="font-weight: bold; font-size: 13px; flex: 1; text-align: center;">Who to Blame</div>
                </div>

                ${g?`
                <div style="padding: 12px; background: var(--vscode-editor-background); border: 1px solid var(--vscode-widget-border); border-radius: 6px; margin-bottom: 12px;">
                    <div style="font-weight: bold; margin-bottom: 12px; font-size: 14px; text-align: center; color: var(--vscode-textLink-foreground); word-break: break-all;">
                        \u{1F4C4} ${g.fileName}
                    </div>


                    <div style="margin-bottom: 20px;">
                        <div style="font-size: 11px; font-weight: bold; opacity: 0.8; text-transform: uppercase; margin-bottom: 8px;"><span class="icon">\u{1F4BB}</span> Local Git (Last Commits)</div>
                        <ul style="list-style-type: none; padding: 0; margin: 0; display: flex; flex-direction: column; gap: 8px;">
                            ${g.gitHistory&&g.gitHistory.length>0?g.gitHistory.map(w=>`
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
                        <div style="font-size: 11px; font-weight: bold; opacity: 0.8; text-transform: uppercase; margin-bottom: 8px;"><span class="icon">\u{1F575}\uFE0F</span> Setup Audit Trail (Recent)</div>
                        <ul style="list-style-type: none; padding: 0; margin: 0; display: flex; flex-direction: column; gap: 8px;">
                            ${g.auditHistory&&g.auditHistory.length>0?g.auditHistory.map(w=>`
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
            </html>`}if(p==="jira"){let g=this.jiraDataCache,w=g?.ticketId||"Jira",z=g?.summary||"No Title",x=g?.description||"No description provided.",P=g?.relatedBranches||[];return`<!DOCTYPE html>
            <html lang="en">
            <head>
                <meta charset="UTF-8">
                <meta name="viewport" content="width=device-width, initial-scale=1.0">
                <title>Ricwiz Jira Details</title>
                ${d}
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
                    <div class="jira-title">${C(z)}</div>
                    <div class="jira-desc">${C(x)}</div>
                    
                    ${P.length>0?`
                        <div style="margin-top: 16px; border-top: 1px solid var(--vscode-panel-border); padding-top: 12px;">
                            <div style="font-size: 11px; opacity: 0.7; margin-bottom: 8px; text-transform: uppercase; font-weight: bold;"><span class="icon">\u{1F33F}</span> Related Branches & MRs</div>
                            <div style="display: flex; flex-direction: column; gap: 4px;">
                                ${P.map(B=>{let O="";return B.pipelineStatus==="running"?O="\u23F3":B.pipelineStatus==="success"?O="\u2705":B.pipelineStatus==="failed"?O="\u274C":B.pipelineStatus==="canceled"?O="\u{1F6D1}":B.pipelineStatus==="skipped"&&(O="\u23ED\uFE0F"),`
                                    <div class="btn" style="padding: 6px 10px; font-size: 12px; display: flex; justify-content: space-between; align-items: center; background-color: var(--vscode-button-secondaryBackground); color: var(--vscode-button-secondaryForeground); border-radius: 4px;" onclick="sendCheckoutCommand('${C(B.name)}')" title="Checkout ${C(B.name)}">
                                        <div style="display: flex; align-items: center; gap: 6px; overflow: hidden;">
                                            <span style="overflow: hidden; text-overflow: ellipsis; white-space: nowrap; font-weight: bold;">${C(B.name)}</span>
                                        </div>
                                        <div style="display: flex; gap: 6px; align-items: center;">
                                            ${O?`<span title="Pipeline: ${B.pipelineStatus}" style="font-size: 11px;">${O}</span>`:""}
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
            </html>`}if(p==="dashboard"){let g=this.dashboardDataCache||{queries:[],selectedIndex:0,results:[],error:null},w=g.queries.map((x,P)=>`
                <option value="${P}" ${P===g.selectedIndex?"selected":""}>${C(x.name)}</option>
            `).join(""),z=g.error?`
                <div style="color: var(--vscode-errorForeground); padding: 12px; text-align: center; background: var(--vscode-editorError-background); border-radius: 4px;">
                    \u26A0\uFE0F ${C(g.error)}
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
                        ${g.results.map(x=>`
                            <tr style="border-bottom: ${x.detailedBranches&&x.detailedBranches.length>0?"none":"1px solid var(--vscode-panel-border)"}; cursor: pointer;" class="tr-hover" onclick="sendCommand('openJiraDetailsForId', '${C(x.key)}')">
                                <td style="padding: 6px; font-weight: bold; color: var(--vscode-textLink-foreground); white-space: nowrap;">${C(x.key)}</td>
                                <td style="padding: 6px; overflow: hidden; text-overflow: ellipsis; max-width: 150px; white-space: nowrap;" title="${C(x.summary)}">${C(x.summary)}</td>
                                <td style="padding: 6px; white-space: nowrap;">
                                    <span style="background: var(--vscode-badge-background); color: var(--vscode-badge-foreground); padding: 2px 4px; border-radius: 3px; font-size: 9px;">${C(x.status)}</span>
                                </td>
                                <td style="padding: 6px; white-space: nowrap; text-align: center;">
                                    ${x.detailedBranches?"":x.branch?`
                                        <button class="icon-button" style="background-color: var(--vscode-button-secondaryBackground); color: var(--vscode-button-secondaryForeground); font-size: 10px; padding: 2px 6px;" title="Checkout ${C(x.branch)}" onclick="event.stopPropagation(); sendCommand('checkout', { branch: '${C(x.branch)}' })">
                                            \u{1F33F} Checkout
                                        </button>
                                    `:`
                                        <button class="icon-button" style="background-color: var(--vscode-button-background); color: var(--vscode-button-foreground); font-size: 10px; padding: 2px 6px;" title="Create Branch for ${C(x.key)}" onclick="event.stopPropagation(); sendCommand('createBranchForTicket', '${C(x.key)}')">
                                            \u2795 Create
                                        </button>
                                    `}
                                </td>
                            </tr>
                            ${x.detailedBranches&&x.detailedBranches.length>0?`
                            <tr style="border-bottom: 1px solid var(--vscode-panel-border);">
                                <td colspan="4" style="padding: 0 6px 8px 6px;">
                                    <div style="display: flex; flex-direction: column; gap: 4px; padding-left: 8px; border-left: 2px solid var(--vscode-editorIndentGuide-activeBackground1);">
                                        ${x.detailedBranches.map(P=>{let B="";return P.pipelineStatus==="running"?B="\u23F3":P.pipelineStatus==="success"?B="\u2705":P.pipelineStatus==="failed"?B="\u274C":P.pipelineStatus==="canceled"?B="\u{1F6D1}":P.pipelineStatus==="skipped"&&(B="\u23ED\uFE0F"),`
                                            <div style="display: flex; justify-content: space-between; align-items: center; font-size: 10px; background: var(--vscode-editor-background); padding: 2px 6px; border-radius: 3px;">
                                                <div style="display: flex; align-items: center; gap: 6px; overflow: hidden; cursor: pointer; flex: 1;" onclick="sendCheckoutCommand('${C(P.name)}')" title="Checkout ${C(P.name)}">
                                                    <span style="overflow: hidden; text-overflow: ellipsis; white-space: nowrap;">${C(P.name)}</span>
                                                    ${B?`<span title="Pipeline: ${P.pipelineStatus}">${B}</span>`:""}
                                                </div>
                                                <div style="display: flex; gap: 6px; align-items: center;">
                                                    ${P.mrUrl?`<span onclick="event.stopPropagation(); sendCommand('openExternal', '${P.mrUrl}');" title="Open Merge Request" style="cursor: pointer;">\u{1F517}</span>`:""}
                                                    ${P.isMerged?'<span style="background-color: var(--vscode-charts-green); color: white; border-radius: 3px; padding: 1px 4px; font-size: 8px; font-weight: bold;">MERGED</span>':""}
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
                ${d}
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
                
                ${g.queries.length>0?`
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
                    ${z}
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
            </html>`}if(p==="devtools")return`<!DOCTYPE html>
            <html lang="en">
            <head>
                <meta charset="UTF-8">
                <meta name="viewport" content="width=device-width, initial-scale=1.0">
                <title>Ricwiz DevTools</title>
                ${d}
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
            </html>`;let n=i.find(g=>g.name===o),r="";n&&(n.pipelineStatus==="running"?r="\u23F3":n.pipelineStatus==="success"?r="\u2705":n.pipelineStatus==="failed"?r="\u274C":n.pipelineStatus==="canceled"?r="\u{1F6D1}":n.pipelineStatus==="skipped"&&(r="\u23ED\uFE0F"));let c=n?n.mrUrl:void 0,m=i.filter(g=>g.name!==o),f=o?`<div style="background-color: var(--vscode-editor-inactiveSelectionBackground); padding: 10px; border-radius: 6px; margin-bottom: 16px; border: 1px solid var(--vscode-panel-border); box-shadow: 0 2px 4px rgba(0,0,0,0.1); position: relative;">
                    ${this.ticketTitleCache&&this.ticketStatusCache?`
                    <div style="position: absolute; top: 6px; right: 6px; cursor: pointer; font-size: 9px; padding: 2px 6px; border-radius: 4px; background-color: var(--vscode-button-secondaryBackground); border: 1px solid var(--vscode-panel-border); opacity: 0.9; font-weight: bold; text-transform: uppercase; display: flex; align-items: center; gap: 4px;" onclick="sendCommand('changeJiraStatus')" title="Update Jira Status">
                        <span>\u{1F4DD}</span> ${C(this.ticketStatusCache)}
                    </div>
                    `:""}
                    <div style="font-size: 10px; opacity: 0.7; margin-bottom: 4px; display: flex; align-items: center; justify-content: center; gap: 4px; text-transform: uppercase;">
                        Current Ticket / Branch
                        <button class="copy-btn" onclick="sendCommand('copyBranch')" title="Copy branch name to clipboard">\u{1F4CB}</button>
                    </div>
                    <div style="font-weight: bold; font-size: 14px; word-break: break-all; text-align: center; color: var(--vscode-textLink-foreground); display: flex; justify-content: center; align-items: center; gap: 6px;">
                        ${C(o)} 
                        ${r?`<span title="Pipeline: ${n.pipelineStatus}" style="font-size: 12px;">${r}</span>`:""}
                        ${c?`<span onclick="event.stopPropagation(); sendCommand('openExternal', '${c}');" title="Open Merge Request" style="cursor: pointer; font-size: 12px;">\u{1F517}</span>`:""}
                        ${this.currentBranchIsMergedCache?'<span style="background-color: var(--vscode-charts-green); color: white; border-radius: 3px; padding: 1px 4px; font-size: 10px; font-weight: bold;" title="Merged to target env">MERGED</span>':""}
                    </div>
                    ${this.ticketTitleCache?`<div style="font-size: 12px; margin-top: 6px; text-align: center; opacity: 0.9; font-style: italic;">${C(this.ticketTitleCache)}</div>`:""}
                    ${m.length>0?`
                        <div style="margin-top: 10px; border-top: 1px solid var(--vscode-panel-border); padding-top: 10px;">
                            <div style="font-size: 10px; opacity: 0.7; margin-bottom: 6px; text-transform: uppercase; text-align: center;">Sister Branches</div>
                            <div style="display: flex; flex-direction: column; gap: 4px;">
                                ${m.map(g=>{let w="";return g.pipelineStatus==="running"?w="\u23F3":g.pipelineStatus==="success"?w="\u2705":g.pipelineStatus==="failed"?w="\u274C":g.pipelineStatus==="canceled"?w="\u{1F6D1}":g.pipelineStatus==="skipped"&&(w="\u23ED\uFE0F"),`
                                    <div class="btn" style="padding: 4px 8px; font-size: 11px; display: flex; justify-content: space-between; align-items: center; background-color: var(--vscode-button-secondaryBackground); color: var(--vscode-button-secondaryForeground); border-radius: 4px;" onclick="sendCheckoutCommand('${C(g.name)}', this)" title="Checkout ${C(g.name)}">
                                        <div style="display: flex; align-items: center; gap: 4px; overflow: hidden;">
                                            <span style="overflow: hidden; text-overflow: ellipsis; white-space: nowrap; font-weight: bold;">${C(g.name)}</span>
                                        </div>
                                        <div style="display: flex; gap: 4px; align-items: center;">
                                            ${w?`<span title="Pipeline: ${g.pipelineStatus}" style="font-size: 10px;">${w}</span>`:""}
                                            ${g.mrUrl?`<span onclick="event.stopPropagation(); sendCommand('openExternal', '${g.mrUrl}');" title="Open Merge Request" style="cursor: pointer; font-size: 10px;">\u{1F517}</span>`:""}
                                            ${g.isMerged?'<span style="background-color: var(--vscode-charts-green); color: white; border-radius: 3px; padding: 1px 4px; font-size: 9px; font-weight: bold;" title="Merged to target env">MERGED</span>':""}
                                        </div>
                                    </div>
                                    `}).join("")}
                            </div>
                        </div>
                    `:a.length>0?`
                        <div style="margin-top: 10px; border-top: 1px solid var(--vscode-panel-border); padding-top: 10px;">
                            <div style="font-size: 10px; opacity: 0.7; margin-bottom: 6px; text-transform: uppercase; text-align: center;">Recent Tickets</div>
                            <div style="display: flex; flex-direction: column; gap: 4px;">
                                ${a.map(g=>`
                                    <div class="btn" style="padding: 4px 8px; font-size: 11px; display: flex; align-items: center; background-color: var(--vscode-button-secondaryBackground); color: var(--vscode-button-secondaryForeground); border-radius: 4px;" onclick="sendCheckoutCommand('${C(g)}', this)" title="Checkout ${C(g)}">
                                        <span style="font-weight: bold;">${C(g)}</span>
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
            ${d}
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


            ${u.length>0?`
                <div style="display: flex; gap: 4px; margin-bottom: 16px; flex-wrap: wrap; justify-content: center;">
                    ${u.map(g=>`
                        <button class="btn" style="flex: 1; min-width: 25%; justify-content: center; padding: 6px 4px; font-size: 10px; font-weight: bold; background-color: var(--vscode-button-secondaryBackground); color: var(--vscode-button-secondaryForeground); border-radius: 4px;" onclick="sendCheckoutCommand('${C(g)}', this)" title="Checkout ${C(g)}">
                            ${C(g.toUpperCase())}
                        </button>
                    `).join("")}
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

            ${l}
            
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
        </html>`}}});function pt(t){le=t.secrets}async function ut(t){if(!le)throw new Error("SecretStorage is not initialized.");await le.store("ricwiz.jiraApiToken",t)}async function gt(){if(!le)throw new Error("SecretStorage is not initialized.");return await le.get("ricwiz.jiraApiToken")}async function ft(t){if(!le)throw new Error("SecretStorage is not initialized.");await le.store("ricwiz.gitlabApiToken",t)}async function Ze(){if(!le)throw new Error("SecretStorage is not initialized.");return await le.get("ricwiz.gitlabApiToken")}var le,xe=$(()=>{"use strict"});var Re={};Ye(Re,{checkBranchExists:()=>ge,exec:()=>h,extractTicketSuggestion:()=>yt,getCurrentBranch:()=>I,getWorkspaceCwd:()=>y,normalizeTicketId:()=>bt,promptForTicketId:()=>W,resolvePrefix:()=>vt,ricwizLogger:()=>A});function y(){let t=ke.workspace.workspaceFolders;if(t)return t[0].uri.fsPath}async function I(t){try{let{stdout:e}=await h("git branch --show-current",{cwd:t});return e.trim()}catch{return""}}function vt(t,e){if(!t.includes(e)){let o=t.match(/([A-Z]+-)\d+/i);if(o)return o[1].toUpperCase()}return e}function yt(t,e,o=!1){let i=t.match(new RegExp(`(${e}\\d+)`,"i"));return i?i[1].toUpperCase():t.includes(e)&&!t.includes("-to-")?t.substring(t.indexOf(e)):o&&t.includes("-to-")?t.substring(t.indexOf(e)).split("-to-")[0]:""}function bt(t,e){let o=t.trim();return/^\d/.test(o)?`${e}${o}`.toUpperCase():o.toUpperCase()}async function W(t,e){let o=ke.workspace.getConfiguration("ricwiz"),i=e?.prefix??o.get("ticketPrefix","SFPSCA-"),s=await I(t),u=vt(s,i),a=e?.suggestedValue??yt(s,u,e?.handleToSuffix),p=await ke.window.showInputBox({prompt:e?.prompt||"Enter the full ticket ID (e.g., SCPSCA-1234) or just the number",placeHolder:e?.placeHolder||"Ticket ID or number",value:a});return p?{ticketId:bt(p,u),currentBranch:s,prefix:u}:void 0}async function ge(t,e){try{return await h(`git show-ref --verify --quiet refs/heads/${e}`,{cwd:t}),!0}catch{}try{return await h(`git show-ref --verify --quiet refs/remotes/origin/${e}`,{cwd:t}),!0}catch{}return!1}var ke,ht,wt,ii,A,h,R=$(()=>{"use strict";ke=v(require("vscode")),ht=v(require("child_process")),wt=v(require("util")),ii=wt.promisify(ht.exec),A=ke.window.createOutputChannel("Ricwiz"),h=async(t,e)=>{A.appendLine(`[EXEC] ${t}`);let o=await ii(t,{maxBuffer:50*1024*1024,...e});return{stdout:o.stdout.toString(),stderr:o.stderr.toString()}}});async function xt(){let t=y();if(!t){q.window.showErrorMessage("Ricwiz: Open a workspace that is a Git repository.");return}let o=q.workspace.getConfiguration("ricwiz").get("ticketSourceBranch","main");await q.window.withProgress({location:q.ProgressLocation.Notification,title:`Ricwiz: Finding deleted files compared to origin/${o}...`,cancellable:!1},async()=>{try{let{stdout:i}=await h(`git diff --name-only --diff-filter=D origin/${o}...HEAD`,{cwd:t}),s=i.split(`
`).map(c=>c.trim()).filter(c=>c.length>0);if(s.length===0){q.window.showInformationMessage(`Ricwiz: No deleted files found compared to origin/${o}.`);return}let u={},a=(c,m)=>{u[c]||(u[c]=[]),u[c].includes(m)||u[c].push(m)};for(let c of s){let m=c.replace(/\\/g,"/");if(m.includes("/classes/")){let f=m.match(/\/classes\/([^/.]+)\.cls/);f&&a("ApexClass",f[1])}else if(m.includes("/triggers/")){let f=m.match(/\/triggers\/([^/.]+)\.trigger/);f&&a("ApexTrigger",f[1])}else if(m.includes("/lwc/")){let f=m.match(/\/lwc\/([^/]+)\//);f&&a("LightningComponentBundle",f[1])}else if(m.includes("/aura/")){let f=m.match(/\/aura\/([^/]+)\//);f&&a("AuraDefinitionBundle",f[1])}else if(m.includes("/objects/")&&m.includes("/fields/")){let f=m.match(/\/objects\/([^/]+)\//),g=m.match(/\/fields\/([^/.]+)\.field/);f&&g&&a("CustomField",`${f[1]}.${g[1]}`)}else if(m.includes("/objects/")){let f=m.match(/\/objects\/([^/.]+)\.object/);f&&a("CustomObject",f[1])}else if(m.includes("/layouts/")){let f=m.match(/\/layouts\/([^/.]+)\.layout/);f&&a("Layout",f[1])}else if(m.includes("/flows/")){let f=m.match(/\/flows\/([^/.]+)\.flow/);f&&a("Flow",f[1])}else if(m.includes("/permissionsets/")){let f=m.match(/\/permissionsets\/([^/.]+)\.permissionset/);f&&a("PermissionSet",f[1])}else if(m.includes("/profiles/")){let f=m.match(/\/profiles\/([^/.]+)\.profile/);f&&a("Profile",f[1])}else if(m.includes("/customMetadata/")){let f=m.match(/\/customMetadata\/([^/.]+)\.md/);f&&a("CustomMetadata",f[1])}else if(m.includes("/flexipages/")){let f=m.match(/\/flexipages\/([^/.]+)\.flexipage/);f&&a("FlexiPage",f[1])}}if(Object.keys(u).length===0){q.window.showInformationMessage("Ricwiz: Found deleted files in Git, but none mapped to recognizable Salesforce metadata.");return}let p=`<?xml version="1.0" encoding="UTF-8"?>
<Package xmlns="http://soap.sforce.com/2006/04/metadata">
`;for(let c of Object.keys(u).sort()){p+=`    <types>
`;for(let m of u[c].sort())p+=`        <members>${m}</members>
`;p+=`        <name>${c}</name>
    </types>
`}p+=`    <version>58.0</version>
</Package>`;let l=Ne.join(t,"destructiveChanges");fe.existsSync(l)||fe.mkdirSync(l);let d=Ne.join(l,"destructiveChanges.xml"),n=Ne.join(l,"package.xml");fe.writeFileSync(d,p,"utf8"),fe.existsSync(n)||fe.writeFileSync(n,`<?xml version="1.0" encoding="UTF-8"?>
<Package xmlns="http://soap.sforce.com/2006/04/metadata">
    <version>58.0</version>
</Package>`,"utf8");let r=await q.workspace.openTextDocument(d);await q.window.showTextDocument(r),q.window.showInformationMessage("Ricwiz: destructiveChanges.xml generated successfully!")}catch(i){q.window.showErrorMessage(`Ricwiz: Error generating destructive changes: ${i.message}`)}})}var q,Ne,fe,kt=$(()=>{"use strict";q=v(require("vscode")),Ne=v(require("path")),fe=v(require("fs"));R()});async function Ct(){let t=y();if(!t)return;let o=ae.workspace.getConfiguration("ricwiz").get("ticketSourceBranch","main");await ae.window.withProgress({location:ae.ProgressLocation.Notification,title:"Ricwiz: Finding Apex Tests to run...",cancellable:!1},async()=>{try{let{stdout:i}=await h(`git diff --name-status origin/${o}...HEAD`,{cwd:t}),s=i.split(`
`).map(c=>c.trim()).filter(c=>c.length>0),u=new Set,a=new Set;for(let c of s){let m=c.split(/\s+/);if(m[0].startsWith("D"))continue;let f=m[1];if(f&&f.endsWith(".cls")){let g=f.match(/\/classes\/([^/.]+)\.cls/);if(g){let w=g[1];w.toLowerCase().endsWith("test")?u.add(w):a.add(w)}}}for(let c of a)u.add(`${c}Test`);if(u.size===0){ae.window.showInformationMessage("Ricwiz: No Apex Classes were modified in this branch.");return}let p=Array.from(u).map(c=>({label:`$(beaker) ${c}`,description:"Apex Test Class"})),l=await ae.window.showQuickPick(p,{canPickMany:!0,title:"Select Test Classes to Run",placeHolder:"Select tests..."});if(!l||l.length===0)return;let n=`sf apex run test -n ${l.map(c=>c.label.replace("$(beaker) ","").trim()).join(",")} -r human -w 30`,r=ae.window.createTerminal("Ricwiz: Smart Tests");r.show(),r.sendText(n)}catch(i){ae.window.showErrorMessage(`Ricwiz: Error finding tests: ${i.message}`)}})}var ae,$t=$(()=>{"use strict";ae=v(require("vscode"));R()});var we,zt=$(()=>{"use strict";we=class{static isValidShellArg(e){return e?/^[a-zA-Z0-9\-_/.]+$/.test(e):!1}}});var Se,Rt,Ue,L,me=$(()=>{"use strict";Se=v(require("vscode")),Rt=v(require("path")),Ue=v(require("fs")),L=class t{style;upstreamRemote;originRemote;ticketSourceBranch;ticketPrefix;environments;static baseConfig=Se.workspace.getConfiguration("ricwiz");activeProfile;profileName;constructor(e){this.activeProfile=e,this.profileName=e?.name;let o=t.baseConfig;this.style=e?.workflowStyle||o.get("workflowStyle","standard"),this.style==="multi-remote"?(this.upstreamRemote=e?.upstreamRemote||o.get("upstreamRemote","salesforce-master"),this.originRemote=e?.originRemote||o.get("originRemote","origin")):(this.upstreamRemote="origin",this.originRemote="origin"),this.ticketSourceBranch=e?.ticketSourceBranch||o.get("ticketSourceBranch","main"),this.ticketPrefix=e?.ticketPrefix||o.get("ticketPrefix","SFPSCA-");let i=[{name:"Qual",sourceBranch:"quality"},{name:"Val",sourceBranch:"validation"},{name:"Prod",sourceBranch:"main"}];this.environments=e?.environments||o.get("environments",i)}getConfig(e,o){return this.activeProfile&&this.activeProfile[e]!==void 0?this.activeProfile[e]:t.baseConfig.get(e,o)}static async initialize(e,o){let i=t.baseConfig.get("profiles",[]),s=Rt.join(e,"ricwiz.json");if(Ue.existsSync(s))try{let u=Ue.readFileSync(s,"utf-8"),a=JSON.parse(u);a&&Array.isArray(a.profiles)&&(i=[...i,...a.profiles])}catch(u){Se.window.showErrorMessage(`Ricwiz: Error parsing ricwiz.json: ${u.message}`)}if(i.length>0){if(!o?.forcePrompt)try{let{exec:l}=(R(),ee(Re)),{stdout:d}=await l("git branch --show-current",{cwd:e}),n=d.trim(),r=n;n.includes("-to-")&&(r=n.split("-to-")[0]);let{stdout:c}=await l(`git config branch.${r}.ricwiz-profile`,{cwd:e}),m=c.trim();if(m){let f=i.find(g=>g.name===m);if(f)return new t(f)}}catch{}let u=i.map(l=>l.name),a=await Se.window.showQuickPick(u,{placeHolder:"Ricwiz: Select Workflow Profile",ignoreFocusOut:!0});if(!a)return;let p=i.find(l=>l.name===a);return new t(p)}return new t}buildUpstreamPath(e){return e.includes("/")?e:`${this.upstreamRemote}/${e}`}getFetchRemote(e){return e.includes("/")?e.split("/")[0]:this.upstreamRemote}getFetchBranch(e){return e.includes("/")?e.substring(e.indexOf("/")+1):e}}});async function St(t){let e=y();if(!e){T.window.showErrorMessage("Open a folder or workspace that is a Git repository.");return}let o=await L.initialize(e,{forcePrompt:!0});if(!o)return;let i=typeof t=="string"?t:void 0,s=await W(e,{prefix:o.ticketPrefix,suggestedValue:i});if(!s){T.window.showErrorMessage("Branch creation cancelled: Ticket not provided.");return}let{ticketId:u}=s,a=o.environments,p="all",l=[{label:"Create Main Branch & Environments",description:"Creates the main ticket branch and all environment branches",value:"all"},{label:"Create Main Branch Only",description:"Creates only the main ticket branch (skips environments)",value:"mainOnly"},{label:"Create Environments Only",description:"Creates only the environment branches (skip main branch)",value:"envs"}];if(a.length>0){let r=await T.window.showQuickPick(l,{placeHolder:"Ricwiz: What do you want to create?",ignoreFocusOut:!0});if(!r)return;p=r.value}let d=o.ticketSourceBranch;if(p==="all"||p==="mainOnly"){let r=[];try{let{stdout:g}=await h('git branch --all --format="%(refname:short)"',{cwd:e});r=g.split(`
`).map(w=>w.trim()).filter(w=>w&&w!=="origin"),r=[...new Set(r)]}catch{}let c=T.window.createQuickPick();c.title="Ricwiz: Ticket Source Branch",c.placeholder="Confirm or change the source branch for this ticket",c.value=o.ticketSourceBranch,c.ignoreFocusOut=!0;let m=()=>{let g=c.value.trim(),w=[];g&&w.push({label:g,description:"Use typed branch"}),w.push(...r.map(z=>({label:z}))),c.items=w};c.onDidChangeValue(m),m();let f=await new Promise(g=>{c.onDidAccept(()=>{let w=c.selectedItems[0];g(w?w.label:c.value),c.hide()}),c.onDidHide(()=>g(void 0)),c.show()});if(!f){T.window.showInformationMessage("Branch creation cancelled.");return}d=f.trim()}let n=u;if(!we.isValidShellArg(n)){T.window.showErrorMessage(`Invalid format for ticket ID: ${n}`);return}if(!we.isValidShellArg(d)){T.window.showErrorMessage(`Invalid format for ticketSourceBranch in settings: ${d}`);return}for(let r of a){if(!we.isValidShellArg(r.name)){T.window.showErrorMessage(`Invalid format for environment name in settings: ${r.name}`);return}if(!we.isValidShellArg(r.sourceBranch)){T.window.showErrorMessage(`Invalid format for environment sourceBranch in settings: ${r.sourceBranch}`);return}}try{await h("git status",{cwd:e})}catch{T.window.showErrorMessage("The opened folder does not appear to be a valid Git repository.");return}try{await T.window.withProgress({location:T.ProgressLocation.Notification,title:"Ricwiz: Creating Branches",cancellable:!1},async r=>{let c=[];r.report({message:"Checking remote status (git fetch)...",increment:10});try{await h("git fetch",{cwd:e})}catch{}try{if(p==="all"||p==="mainOnly"){if(r.report({message:`Creating main branch ${n}...`,increment:10}),await ge(e,n))T.window.showInformationMessage(`Ricwiz: The branch ${n} already exists. Skipping creation...`),await h(`git checkout ${n}`,{cwd:e});else try{let m=o.getFetchRemote(d),f=o.getFetchBranch(d),g=o.buildUpstreamPath(d);await h(`git fetch ${m} ${f}`,{cwd:e}),await h(`git checkout -b ${n} ${g}`,{cwd:e}),c.push(n)}catch{try{await h(`git checkout -b ${n} ${d}`,{cwd:e}),c.push(n)}catch{throw new Error(`Could not create main branch '${n}' from '${d}'. Does the source branch exist?`)}}try{await h(`git config branch.${n}.ricwiz-source "${d}"`,{cwd:e}),o.profileName&&await h(`git config branch.${n}.ricwiz-profile "${o.profileName}"`,{cwd:e})}catch{}}if(p==="all"||p==="envs"){let m=50/(a.length||1);for(let f of a){let g=`${u}-to-${f.name}`,w=f.sourceBranch;if(r.report({message:`Processing environment branch ${g}...`,increment:m}),!await ge(e,g))try{let z=o.buildUpstreamPath(w);await h(`git checkout -b ${g} ${z}`,{cwd:e}),c.push(g)}catch{try{await h(`git checkout -b ${g} ${w}`,{cwd:e}),c.push(g)}catch{throw new Error(`Could not create environment branch '${g}' from '${w}'. Does the source branch exist?`)}}}}r.report({message:`Publishing branches to ${o.originRemote}...`,increment:10});for(let m of c)try{await h(`git push -u ${o.originRemote} ${m}`,{cwd:e})}catch{T.window.showWarningMessage(`Ricwiz: Branch ${m} was created locally but could not be pushed to ${o.originRemote}.`)}if(p==="all"||p==="mainOnly"){r.report({message:`Switching to ${n}...`,increment:10});try{await h(`git checkout ${n}`,{cwd:e})}catch{}}r.report({increment:100}),T.window.showInformationMessage("Ricwiz: All set! You can start working on your branches! \u{1F680}")}catch(m){if(T.window.showErrorMessage(`Ricwiz Branch Creation Failed: ${m.message}`),c.length>0){try{await h(`git checkout ${d}`,{cwd:e})}catch{}for(let f of c)try{await h(`git branch -D ${f}`,{cwd:e})}catch{}T.window.showWarningMessage(`Ricwiz: Rolled back (deleted) ${c.length} branch(es) locally due to failure.`)}}})}catch(r){T.window.showErrorMessage(`Ricwiz general error: ${r.message}`)}}var T,Bt=$(()=>{"use strict";T=v(require("vscode"));R();zt();me()});async function ve(t,e,o,i){i&&i.report({message:"CONFLICT! Resolve & click 'Commit & Continue' in Ricwiz panel."});let s=!1,u=!1,a=async()=>{try{let{stdout:n}=await h("git status --porcelain",{cwd:t});return n.split(`
`).filter(r=>{let c=r.substring(0,2);return["UD","DU","DD","AU","UA"].includes(c)}).map(r=>r.substring(3).trim())}catch{return[]}},p=async()=>{try{let{stdout:n}=await h("git status --porcelain",{cwd:t}),r=c=>c==="UU"?"Both Modified":c==="UD"?"Deleted by them":c==="DU"?"Deleted by us":c==="DD"?"Both Deleted":c==="AA"?"Both Added":c==="AU"?"Added by us":c==="UA"?"Added by them":"Conflicted";return n.split(`
`).map(c=>c.trimRight()).filter(c=>c.length>2).filter(c=>{let m=c.substring(0,2);return["UU","AA","UD","DU","AU","UA","DD"].includes(m)}).map(c=>{let m=c.substring(0,2);return{file:c.substring(3).trim(),state:r(m)}})}catch{return[]}},l=async()=>{if(s)return;let n=await a(),r=await p(),{webviewProvider:c}=(Je(),ee(je));c&&c.setConflictState({isConflict:!0,sourceStr:e,targetStr:o,deletionsCount:n.length,files:r})},d=ce.commands.registerCommand("ricwiz.conflictAction",async n=>{if(n==="abortDeploy")u=!0;else if(n==="resolveDeletions"){try{let c=(await a()).map(f=>({label:f})),m=await ce.window.showQuickPick(c,{canPickMany:!0,placeHolder:"Select conflicted files to DELETE",title:"Ricwiz: Delete Conflicted Files"});if(m&&m.length>0){for(let f of m)try{await h(`git rm --force "${f.label}"`,{cwd:t})}catch{}ce.window.showInformationMessage(`Ricwiz: Deleted ${m.length} conflicted file(s).`)}}catch(r){ce.window.showErrorMessage(`Ricwiz: Error. (${r.message})`)}l()}else if(n==="commitAndContinue")try{let c=(await a()).filter(f=>Pt.existsSync(Et.join(t,f)));if(c.length>0&&await ce.window.showWarningMessage(`Wait! There are ${c.length} file(s) with deletion conflicts that are still on your disk.

If you commit now, you will KEEP them in the project.

Are you sure you want to KEEP them?`,{modal:!0},"Yes, KEEP them","No, let me DELETE them")!=="Yes, KEEP them"){l();return}let m=!1;try{let{stdout:f}=await h('git grep -E "^<<<<<<< "',{cwd:t});f.trim().length>0&&(m=!0)}catch{}if(m){ce.window.showErrorMessage("Ricwiz: You still have unresolved conflict markers (<<<<<<<) in your files. Please resolve them first!"),l();return}await h("git add .",{cwd:t}),await h("git commit --no-edit",{cwd:t})}catch(r){ce.window.showErrorMessage(`Ricwiz: Could not commit automatically. (${r.message})`),l()}});for(l();;){if(u){s=!0,d.dispose(),(Je(),ee(je)).webviewProvider?.setConflictState(null);try{await h("git merge --abort",{cwd:t})}catch{}return!1}try{let{stdout:n}=await h("git status --porcelain",{cwd:t});if(n.trim().length===0)return s=!0,d.dispose(),(Je(),ee(je)).webviewProvider?.setConflictState(null),ce.window.showInformationMessage("Ricwiz: Changes committed!"),!0}catch{}await new Promise(n=>setTimeout(n,2e3))}}var ce,Pt,Et,We=$(()=>{"use strict";ce=v(require("vscode")),Pt=v(require("fs")),Et=v(require("path"));R()});async function Mt(){let t=y();if(!t){U.window.showErrorMessage("Ricwiz: Open a folder or workspace that is a Git repository.");return}try{await h("git status",{cwd:t})}catch{U.window.showErrorMessage("Ricwiz: The opened folder does not appear to be a valid Git repository.");return}let e=await L.initialize(t);if(!e)return;let o=e.environments,i=await W(t,{prefix:e.ticketPrefix});if(!i){U.window.showErrorMessage("Operation cancelled: Ticket not provided.");return}let{ticketId:s,currentBranch:u}=i,a=s;if(!await ge(t,a)){U.window.showErrorMessage(`Ricwiz: Main branch '${a}' does not exist! Prepare deploy is only available when a main ticket branch is used.`);return}let p=e.getConfig("defaultReviewers",""),l="";try{let{stdout:d}=await h(`git config branch.${s}.ricwiz-reviewers`,{cwd:t});l=d.trim()}catch{}if(p.trim()){let d=await U.window.showInputBox({prompt:"Ricwiz: Reviewers for this deploy (optional, comma-separated)",placeHolder:"e.g. @joao, 123456",value:l||p,ignoreFocusOut:!0});if(d===void 0)return;try{d.trim()?await h(`git config branch.${s}.ricwiz-reviewers "${d.trim()}"`,{cwd:t}):l&&await h(`git config --unset branch.${s}.ricwiz-reviewers`,{cwd:t})}catch{}}await U.window.withProgress({location:U.ProgressLocation.Notification,title:"Ricwiz: Preparing Deploy",cancellable:!0},async(d,n)=>{let r=0,c=u,m=!1;n.onCancellationRequested(()=>{m=!0}),d.report({message:"Syncing remote information...",increment:10});try{await h("git fetch --all",{cwd:t});let g=10/(o.length||1);for(let w of o)try{if(m)throw new Error("Aborted");d.report({message:`Fetching ${w.sourceBranch}...`,increment:g});let z=e.getFetchRemote(w.sourceBranch),x=e.getFetchBranch(w.sourceBranch);await h(`git fetch ${z} ${x}:${x}`,{cwd:t})}catch{}}catch{}let f=60/(o.length||1);for(let g of o){if(m)break;let w=`${s}-to-${g.name}`,z=g.sourceBranch;try{d.report({message:`Processing ${w}...`,increment:f/4}),await h(`git checkout ${w}`,{cwd:t});try{await h(`git pull ${e.originRemote} ${w}`,{cwd:t})}catch{}let x=async re=>{try{await h(`git merge ${re}`,{cwd:t})}catch(E){let N=!1;try{let{stdout:V}=await h("git ls-files -u",{cwd:t});V.trim().length>0&&(N=!0)}catch{}let H=((E.stdout||"")+(E.stderr||"")+(E.message||"")).toLowerCase();if(N||H.includes("conflict")||H.includes("conflit")){if(!await ve(t,re,w,d))throw m=!0,new Error("Deploy aborted by user.")}else throw E}};d.report({message:`Merging ${z} into ${w}...`,increment:f/4});let P=e.getFetchRemote(z),B=e.getFetchBranch(z),O=e.buildUpstreamPath(z);if(await h(`git fetch ${P} ${B}`,{cwd:t}),await x(O),d.report({message:`Merging ${a} into ${w}...`,increment:f/4}),await x(a),m)break;d.report({message:`Pushing ${w}...`,increment:f/4}),await h(`git push ${e.originRemote} ${w}`,{cwd:t}),r++}catch(x){x.message.includes("aborted")?U.window.showInformationMessage("Ricwiz: Deploy cancelled."):U.window.showErrorMessage(`Ricwiz: Failed to process branch ${w}. Detail: ${x.message}`);return}}if(!m){d.report({message:"Finishing up...",increment:10});let g=c;try{await h(`git show-ref --verify --quiet refs/heads/${a}`,{cwd:t}),g=a}catch{}try{let w=await I(t);g&&g!==w?(await h(`git checkout ${g}`,{cwd:t}),U.window.showInformationMessage(`Ricwiz: Operation complete. Back on branch ${g}.`)):U.window.showInformationMessage("Ricwiz: Operation complete.")}catch{U.window.showInformationMessage("Ricwiz: Operation complete.")}}})}var U,Tt=$(()=>{"use strict";U=v(require("vscode"));R();We();me()});async function Dt(t=!1){let e=y();if(!e)return;let o=await L.initialize(e);if(!o)return;let i=await W(e,{prompt:"Enter the full ticket ID for the Merge Requests (e.g., SCPSCA-1234) or just the number"});if(!i)return;let{ticketId:s}=i,a=te.workspace.getConfiguration("ricwiz").get("gitlabUrlOverride",""),p="";if(a&&a.trim()!=="")p=a.trim().replace(/\/+$/,"");else{let n="";try{let{stdout:r}=await h("git remote get-url origin",{cwd:e});n=r.trim()}catch{te.window.showErrorMessage("Ricwiz: Could not get the remote origin URL. Please configure the URL manually in the extension settings.");return}p=n,p.endsWith(".git")&&(p=p.slice(0,-4)),p.startsWith("git@")&&(p=p.replace("git@","").replace(":","/"),p=`https://${p}`)}let l=[],d=o.ticketSourceBranch;try{let{stdout:n}=await h(`git config branch.${s}.ricwiz-source`,{cwd:e});n.trim()&&(d=n.trim())}catch{}if(o.environments.length===0)l.push({source:s,target:d});else for(let n of o.environments)l.push({source:`${s}-to-${n.name}`,target:n.sourceBranch});for(let n of l){let r=`${p}/-/merge_requests/new?merge_request[source_branch]=${n.source}&merge_request[target_branch]=${n.target}`;t?te.commands.executeCommand("simpleBrowser.show",r):te.env.openExternal(te.Uri.parse(r))}te.window.showInformationMessage(`Ricwiz: Opening ${t?"VS Code browser":"external browser"} for Merge Requests!`)}async function At(){return Dt(!1)}async function It(){return Dt(!0)}var te,Lt=$(()=>{"use strict";te=v(require("vscode"));R();me()});async function Ft(t=!1){let e=y();if(!e)return;let o=oe.workspace.getConfiguration("ricwiz"),i=o.get("jiraUrl","");if(!i||i.trim()===""){oe.window.showErrorMessage("Ricwiz: Jira URL is not configured. Please set it in the extension settings (e.g., https://jira.company.com/browse/).");return}let{getCurrentBranch:s,resolvePrefix:u,extractTicketSuggestion:a}=(R(),ee(Re)),p=await s(e),l=o.get("ticketPrefix","SFPSCA-"),d=u(p,l),r=a(p,d,!0);if(r){let{normalizeTicketId:m}=(R(),ee(Re));r=m(r,d)}else{let m=await W(e,{prompt:"Ricwiz could not detect the ticket from the branch name. Enter Jira ticket ID (e.g. SFPSCA-1234)",handleToSuffix:!0});if(!m)return;r=m.ticketId}let c=i.trim();c.endsWith("/")||(c+="/"),c+=r,t?oe.commands.executeCommand("simpleBrowser.show",c):oe.env.openExternal(oe.Uri.parse(c)),oe.window.showInformationMessage(`Ricwiz: Opening Jira Ticket ${r} in ${t?"VS Code":"browser"}!`)}async function Ot(){return Ft(!1)}async function Nt(){return Ft(!0)}var oe,Ut=$(()=>{"use strict";oe=v(require("vscode"));R()});async function ni(){let t=Jt.workspace.getConfiguration("ricwiz"),e=t.get("jiraUrl",""),o=t.get("jiraEmail","")?.trim(),i=(await gt())?.trim();if(!e||!i)throw new Error('Jira API Token is not securely configured. Please run the "Ricwiz: Set Secure Jira API Token" command.');let s=e;s.includes("/browse")&&(s=s.split("/browse")[0]),s.endsWith("/")&&(s=s.slice(0,-1));let u=o?`Basic ${Buffer.from(`${o}:${i}`).toString("base64")}`:`Bearer ${i}`;return{baseUrl:s,headerAuth:u}}async function Ce(t,e,o){let{baseUrl:i,headerAuth:s}=await ni(),u=new URL(`${i}${e}`);return new Promise((a,p)=>{let l=jt.request(u,{method:t,headers:{Authorization:s,Accept:"application/json",...o?{"Content-Type":"application/json"}:{}}},d=>{let n="";d.on("data",r=>n+=r),d.on("end",()=>{if(d.statusCode===401||d.statusCode===403)return p(new Error(`Authentication failed (HTTP ${d.statusCode}). Please check your Jira settings.`));if(d.statusCode&&d.statusCode>=400){let r="";try{let c=JSON.parse(n);c.errorMessages&&c.errorMessages.length>0&&(r=c.errorMessages.join(", "))}catch{}return d.statusCode===404||d.statusCode===410?p(new Error(`Ticket not found or deleted (HTTP ${d.statusCode}). ${r}`)):p(new Error(`Jira API returned HTTP status ${d.statusCode}. ${r}`))}if(!n)return a({});try{let r=JSON.parse(n);a(r)}catch{p(new Error("Failed to parse Jira response."))}})});l.on("error",d=>p(new Error(`Network error: ${d.message}`))),o&&l.write(JSON.stringify(o)),l.end()})}async function $e(t){let e=await Ce("GET",`/rest/api/2/issue/${t}`);return e&&e.fields?{summary:e.fields.summary||"",description:e.fields.description||"No description provided.",status:e.fields.status?.name||"Unknown"}:null}async function Wt(t){let e=await Ce("GET",`/rest/api/2/issue/${t}/transitions`);return e&&e.transitions?e.transitions.map(o=>({id:o.id,name:o.name})):[]}async function qt(t,e){await Ce("POST",`/rest/api/2/issue/${t}/transitions`,{transition:{id:e}})}async function Gt(t,e){await Ce("POST",`/rest/api/2/issue/${t}/comment`,{body:e})}async function Ht(t,e){await Ce("PUT",`/rest/api/2/issue/${t}`,{update:{labels:[{add:e}]}})}async function Vt(t){let e=await Ce("POST","/rest/api/3/search/jql",{jql:t,maxResults:50,fields:["summary","status","assignee"]});return e&&e.issues?e.issues.map(o=>({key:o.key,summary:o.fields?.summary||"No Title",status:o.fields?.status?.name||"Unknown",assignee:o.fields?.assignee?.displayName||"Unassigned"})):[]}var jt,Jt,Be=$(()=>{"use strict";jt=v(require("https")),Jt=v(require("vscode"));xe()});async function Xe(){let t=await Ze();return!!(t&&t.trim())}async function Xt(t){let e=Kt.workspace.getConfiguration("ricwiz"),o=(await Ze())?.trim();if(!o)throw new Error("No GitLab token");let i=e.get("gitlabUrlOverride","");if(!i||i.trim()==="")if(Ke)i=Ke;else try{let{stdout:p}=await h("git remote get-url origin",{cwd:t}),l=p.trim();l.endsWith(".git")&&(l=l.slice(0,-4)),l.startsWith("git@")&&(l=l.replace("git@","").replace(":","/"),l=`https://${l}`),i=l,Ke=i}catch{throw new Error("Could not get remote origin URL.")}let s=new URL(i),u=`${s.protocol}//${s.host}`,a=_t[t];if(!a){let p=s.pathname;p.startsWith("/")&&(p=p.substring(1)),p.endsWith("/")&&(p=p.slice(0,-1)),p.endsWith(".git")&&(p=p.slice(0,-4)),a=encodeURIComponent(p),_t[t]=a}return{baseUrl:u,token:o,projectPath:a}}async function Qt(t,e,o){let{baseUrl:i,token:s}=await Xt(t),u=new URL(`${i}${o}`);return new Promise((a,p)=>{let l=Zt.request(u,{method:e,timeout:5e3,headers:{"PRIVATE-TOKEN":s,Accept:"application/json"}},d=>{let n="";d.on("data",r=>n+=r),d.on("end",()=>{if(d.statusCode&&d.statusCode>=400)return p(new Error(`GitLab API error: ${d.statusCode}`));if(!n)return a({});try{let r=JSON.parse(n);a(r)}catch{p(new Error("Failed to parse GitLab response."))}})});l.on("timeout",()=>{l.destroy(),p(new Error("GitLab request timed out"))}),l.on("error",d=>p(new Error(`Network error: ${d.message}`))),l.end()})}async function et(t,e,o){let i=`${t}:${e}:${o||"any"}`,s=Yt.get(i);if(s&&Date.now()-s.timestamp<si)return s.data;try{let{projectPath:u}=await Xt(t),a=`/api/v4/projects/${u}/merge_requests?source_branch=${encodeURIComponent(e)}&order_by=updated_at&sort=desc`;o&&(a+=`&target_branch=${encodeURIComponent(o)}`);let p=await Qt(t,"GET",a);if(p&&p.length>0){let l=p[0];try{let r=await Qt(t,"GET",`/api/v4/projects/${u}/merge_requests/${l.iid}`);r&&(l=r)}catch{}let d="none";if(l.head_pipeline&&l.head_pipeline.status){let r=l.head_pipeline.status;r==="success"||r==="failed"||r==="canceled"||r==="skipped"?d=r:d="running"}let n={isMerged:l.state==="merged",isOpen:l.state==="opened",pipelineStatus:d,webUrl:l.web_url};return Yt.set(i,{data:n,timestamp:Date.now()}),n}return null}catch{return null}}var Zt,Kt,_t,Ke,Yt,si,eo=$(()=>{"use strict";Zt=v(require("https")),Kt=v(require("vscode"));xe();R();_t={},Ke=null;Yt=new Map,si=30*1e3});var qe={};Ye(qe,{findRelatedBranches:()=>st,getCurrentBranchMergeStatus:()=>ot,getRecentCommits:()=>it,getRecentTickets:()=>nt,getRelatedBranchesStatus:()=>tt});function to(t,e){return e.find(o=>t.endsWith(`-to-${o.name}`))}async function tt(t,e,o,i){let s=await Xe();return await Promise.all(e.map(async a=>{let p=to(a,i);if(s){let l=p?p.sourceBranch:void 0,d=await et(t,a,l);if(d)return{name:a,isMerged:d.isMerged,pipelineStatus:d.pipelineStatus,mrUrl:d.webUrl}}return{name:a,isMerged:!1}}))}async function ot(t,e,o){let i=to(e,o);if(!i)return!1;if(await Xe()){let s=await et(t,e,i.sourceBranch);if(s)return s.isMerged}return!1}async function it(t,e=10){try{let{stdout:o}=await h(`git log --oneline -${e} --format="%h|||%s|||%ar"`,{cwd:t});return o.split(`
`).filter(i=>i.trim()).map(i=>{let s=i.split("|||");return{hash:s[0]||"",message:s.length>=3?s.slice(1,-1).join("|||"):s[1]||"",timeAgo:s.length>=3?s[s.length-1]:""}})}catch{return[]}}async function nt(t,e=3){try{let{stdout:o}=await h('git for-each-ref --sort=-committerdate --format="%(refname:short)" refs/heads/',{cwd:t}),i=o.split(`
`).map(u=>u.trim()).filter(u=>u),s=/^[A-Z]+-\d+$/i;return i.filter(u=>s.test(u)).slice(0,e)}catch{return[]}}async function st(t,e,o){let{stdout:i}=await h(`git branch --all --list "*${e}*"`,{cwd:t}),s=new Set;return i.split(`
`).forEach(u=>{let a=u.replace("*","").trim();if(a){if(a.startsWith("remotes/")){let p=a.split("/");p.length>2&&(a=p.slice(2).join("/"))}a&&a!==o&&!a.includes("HEAD")&&s.add(a)}}),Array.from(s)}var Pe=$(()=>{"use strict";R();eo()});async function oo(t){let e=y();if(e)try{if(!await L.initialize(e))return;let s=(await I(e)).split("-to-")[0];if(!s){_.window.showErrorMessage("Ricwiz: You are not currently on a valid ticket branch.");return}await _.window.withProgress({location:_.ProgressLocation.Notification,title:`Fetching details for ${s}...`,cancellable:!1},async u=>{let a=await $e(s);if(a){let p=[];try{let{findRelatedBranches:l,getRelatedBranchesStatus:d}=(Pe(),ee(qe)),n=_.workspace.getConfiguration("ricwiz").get("environments",[{name:"Qual",sourceBranch:"quality"},{name:"Val",sourceBranch:"validation"},{name:"Prod",sourceBranch:"main"}]),r=await l(e,s,"");p=await d(e,r,s,n)}catch{}t.setJiraData({ticketId:s,relatedBranches:p,...a}),t.setPage("jira")}else _.window.showErrorMessage("Ricwiz: No data found for this ticket.")})}catch(o){o.message.includes("securely configured")?await _.window.showErrorMessage(o.message,"Set Token Now")==="Set Token Now"&&_.commands.executeCommand("ricwiz.setJiraToken"):_.window.showErrorMessage(`Ricwiz Jira Error: ${o.message}`)}}var _,io=$(()=>{"use strict";_=v(require("vscode"));R();me();Be()});async function no(t,e){let i=ie.workspace.getConfiguration("ricwiz").get("jiraDashboards",[]);if(e!==void 0&&(ye=e),!i||i.length===0){t.setDashboardData({queries:[],selectedIndex:0,results:[],error:"No queries defined in settings. Go to Settings > Ricwiz > Jira Dashboards."}),t.setPage("dashboard");return}ye>=i.length&&(ye=0);let s=i[ye];t.setDashboardData({queries:i,selectedIndex:ye,results:[],error:"\u23F3 Loading tickets..."}),t.setPage("dashboard");try{let u=await Vt(s.jql),a=ie.workspace.workspaceFolders?.[0]?.uri.fsPath,p=[],l=t.getDashboardShowBranches();if(a)try{let n=require("child_process"),c=require("util").promisify(n.exec),{stdout:m}=await c("git branch",{cwd:a});p=m.split(`
`).map(f=>f.replace("*","").trim()).filter(f=>f)}catch{}let d=[];if(l&&a)try{let{findRelatedBranches:n,getRelatedBranchesStatus:r}=(Pe(),ee(qe)),c=ie.workspace.getConfiguration("ricwiz").get("environments",[{name:"Qual",sourceBranch:"quality"},{name:"Val",sourceBranch:"validation"},{name:"Prod",sourceBranch:"main"}]);d=await Promise.all(u.map(async m=>{let f=await n(a,m.key,""),g=await r(a,f,m.key,c);return{...m,detailedBranches:g}}))}catch{d=u}else d=u.map(n=>{let r=p.find(c=>c.includes(n.key));return{...n,branch:r||null}});t.setDashboardData({queries:i,selectedIndex:ye,results:d,error:null}),t.setPage("dashboard")}catch(u){let a=u.message;(a.includes("ENOTFOUND")||a.includes("network"))&&(a="No Internet or Invalid URL"),t.setDashboardData({queries:i,selectedIndex:ye,results:[],error:a}),t.setPage("dashboard")}}async function so(t,e){await ie.window.withProgress({location:ie.ProgressLocation.Notification,title:`Fetching details for ${e}...`,cancellable:!1},async()=>{try{let o=await $e(e);if(o){let i=[],s=y();if(s)try{let{findRelatedBranches:u,getRelatedBranchesStatus:a}=(Pe(),ee(qe)),p=ie.workspace.getConfiguration("ricwiz").get("environments",[{name:"Qual",sourceBranch:"quality"},{name:"Val",sourceBranch:"validation"},{name:"Prod",sourceBranch:"main"}]),l=await u(s,e,"");i=await a(s,l,e,p)}catch{}t.setJiraData({ticketId:e,relatedBranches:i,...o}),t.setPage("jira")}else ie.window.showErrorMessage(`Ricwiz: No data found for ticket ${e}.`)}catch(o){ie.window.showErrorMessage(`Ricwiz Jira Error: ${o.message}`)}})}var ie,ye,ro=$(()=>{"use strict";ie=v(require("vscode"));Be();R();ye=0});async function rt(){let t=y();return!t||!await L.initialize(t,{forcePrompt:!1})?void 0:(await I(t)).split("-to-")[0]}async function ao(){try{let t=await rt();if(!t){S.window.showErrorMessage("Ricwiz: You are not on a valid ticket branch.");return}let e=await S.window.withProgress({location:S.ProgressLocation.Notification,title:`Fetching available status for ${t}...`,cancellable:!1},()=>Wt(t));if(!e||e.length===0){S.window.showInformationMessage(`Ricwiz: No transitions available for ${t}.`);return}let o=e.map(s=>({label:s.name,id:s.id})),i=await S.window.showQuickPick(o,{placeHolder:`Select new status for ${t}`,ignoreFocusOut:!0});i&&(await S.window.withProgress({location:S.ProgressLocation.Notification,title:`Updating status to ${i.label}...`,cancellable:!1},()=>qt(t,i.id)),S.window.showInformationMessage(`Ricwiz: Status for ${t} updated to ${i.label}.`))}catch(t){t.message.includes("securely configured")?S.window.showErrorMessage(t.message,"Set Token Now").then(e=>{e==="Set Token Now"&&S.commands.executeCommand("ricwiz.setJiraToken")}):S.window.showErrorMessage(`Ricwiz Jira Error: ${t.message}`)}}async function co(){try{let t=await rt();if(!t){S.window.showErrorMessage("Ricwiz: You are not on a valid ticket branch.");return}let e=await S.window.showInputBox({prompt:`Add comment to ${t}`,placeHolder:"Type your comment here...",ignoreFocusOut:!0});e&&(await S.window.withProgress({location:S.ProgressLocation.Notification,title:`Adding comment to ${t}...`,cancellable:!1},()=>Gt(t,e)),S.window.showInformationMessage(`Ricwiz: Comment added to ${t}.`))}catch(t){t.message.includes("securely configured")?S.window.showErrorMessage(t.message,"Set Token Now").then(e=>{e==="Set Token Now"&&S.commands.executeCommand("ricwiz.setJiraToken")}):S.window.showErrorMessage(`Ricwiz Jira Error: ${t.message}`)}}async function lo(){try{let t=await rt();if(!t){S.window.showErrorMessage("Ricwiz: You are not on a valid ticket branch.");return}let e=await S.window.showInputBox({prompt:`Add a label to ${t}`,placeHolder:"e.g. Needs-Review, Bug, High-Priority",ignoreFocusOut:!0});e&&e.trim()&&(await S.window.withProgress({location:S.ProgressLocation.Notification,title:`Adding label to ${t}...`,cancellable:!1},()=>Ht(t,e.trim())),S.window.showInformationMessage(`Ricwiz: Label '${e.trim()}' added to ${t}.`))}catch(t){t.message.includes("securely configured")?S.window.showErrorMessage(t.message,"Set Token Now").then(e=>{e==="Set Token Now"&&S.commands.executeCommand("ricwiz.setJiraToken")}):S.window.showErrorMessage(`Ricwiz Jira Error: ${t.message}`)}}async function mo(){let t=await S.window.showInputBox({prompt:"Enter your Jira API Token (or Personal Access Token). It will be securely stored in your OS keychain.",password:!0,ignoreFocusOut:!0});if(t)try{await ut(t.trim()),S.window.showInformationMessage("Ricwiz: Jira API Token securely stored!")}catch(e){S.window.showErrorMessage(`Ricwiz: Failed to store token: ${e.message}`)}}var S,po=$(()=>{"use strict";S=v(require("vscode"));R();me();Be();xe()});async function uo(){let t=await G.window.showInputBox({prompt:"Enter your GitLab Personal Access Token",placeHolder:"glpat-xxxxxxxxxxxxxxxxxxxx",ignoreFocusOut:!0,password:!0});if(t&&t.trim()){let e=t.trim();await G.window.withProgress({location:G.ProgressLocation.Notification,title:"Ricwiz: Validating GitLab Token...",cancellable:!1},async()=>{try{let i=G.workspace.getConfiguration("ricwiz").get("gitlabUrlOverride","").trim();if(!i&&G.workspace.workspaceFolders)try{let{exec:l}=(R(),ee(Re)),d=G.workspace.workspaceFolders[0].uri.fsPath,{stdout:n}=await l("git remote get-url origin",{cwd:d}),r=n.trim();r.startsWith("git@")&&(r=`https://${r.replace("git@","").replace(":","/")}`),r.endsWith(".git")&&(r=r.slice(0,-4)),i=r}catch{}i||(i="https://gitlab.com");let s=new URL(i),u=`${s.protocol}//${s.host}`,a=require("https"),p=await new Promise((l,d)=>{let n=a.request(new URL(`${u}/api/v4/user`),{method:"GET",timeout:5e3,headers:{"PRIVATE-TOKEN":e,Accept:"application/json"}},r=>{if(r.statusCode>=400)return d(new Error(`Status ${r.statusCode}`));let c="";r.on("data",m=>c+=m),r.on("end",()=>l(JSON.parse(c||"{}")))});n.on("error",d),n.on("timeout",()=>{n.destroy(),d(new Error("Timeout"))}),n.end()});await ft(e),G.window.showInformationMessage(`Ricwiz: \u2705 GitLab API Token saved and validated successfully for ${p.username||"user"}!`),G.commands.executeCommand("ricwiz.manualRefresh")}catch(o){G.window.showErrorMessage(`Ricwiz: \u274C Invalid token or cannot reach GitLab (${o.message}). Please check the token and try again.`)}})}}var G,go=$(()=>{"use strict";G=v(require("vscode"));xe()});async function fo(){let t=y();if(!t){pe.window.showErrorMessage("Ricwiz: Open a folder or workspace that is a Git repository.");return}let e=await L.initialize(t);if(!e)return;let o=await W(t,{prefix:e.ticketPrefix,prompt:"Enter the full ticket ID to sync all branches for (e.g., SCPSCA-1234) or just the number"});if(!o)return;let{ticketId:i,currentBranch:s}=o;await pe.window.withProgress({location:pe.ProgressLocation.Notification,title:`Ricwiz: Syncing all branches for ${i}...`,cancellable:!1},async u=>{try{u.report({message:"Fetching from remote..."});try{await h("git fetch --all",{cwd:t})}catch{}let{stdout:a}=await h(`git branch --list "*${i}*"`,{cwd:t}),p=a.split(`
`).map(n=>n.replace("*","").trim()).filter(n=>n.length>0);if(p.length===0){pe.window.showWarningMessage(`Ricwiz: No local branches found for ${i}.`);return}let l=0,d=0;for(let n of p)if(u.report({message:`Syncing ${n}...`}),n===s)try{await h(`git pull ${e.originRemote} ${n}`,{cwd:t}),l++}catch(r){let c=!1;try{let{stdout:f}=await h("git ls-files -u",{cwd:t});f.trim().length>0&&(c=!0)}catch{}let m=((r.stdout||"")+(r.stderr||"")+(r.message||"")).toLowerCase();(c||m.includes("conflict")||m.includes("conflit"))&&await ve(t,`${e.originRemote}/${n}`,n,u)?l++:d++}else try{await h(`git fetch ${e.originRemote} ${n}:${n}`,{cwd:t}),l++}catch{try{await h(`git checkout ${n}`,{cwd:t});try{await h(`git pull ${e.originRemote} ${n}`,{cwd:t}),l++}catch(c){let m=!1;try{let{stdout:g}=await h("git ls-files -u",{cwd:t});g.trim().length>0&&(m=!0)}catch{}let f=((c.stdout||"")+(c.stderr||"")+(c.message||"")).toLowerCase();(m||f.includes("conflict")||f.includes("conflit"))&&await ve(t,`${e.originRemote}/${n}`,n,u)?l++:d++}await h(`git checkout ${s}`,{cwd:t})}catch{try{await h(`git checkout ${s}`,{cwd:t})}catch{}d++}}d>0?pe.window.showWarningMessage(`Ricwiz: Synced ${l}/${p.length} branches. ${d} branch(es) could not be synced (possible conflicts or diverged history).`):pe.window.showInformationMessage(`Ricwiz: \u{1F504} All ${l} branches for ${i} are up to date!`)}catch(a){pe.window.showErrorMessage(`Ricwiz: Sync failed: ${a.message}`)}})}var pe,ho=$(()=>{"use strict";pe=v(require("vscode"));R();We();me()});async function wo(){let t=y();if(!t){ue.window.showErrorMessage("Ricwiz: Open a folder or workspace that is a Git repository.");return}try{await h("git status",{cwd:t})}catch{ue.window.showErrorMessage("Ricwiz: The opened folder does not appear to be a valid Git repository.");return}let e=await L.initialize(t);if(!e)return;let o=e.environments,i=await W(t,{prefix:e.ticketPrefix});if(!i)return;let{ticketId:s,currentBranch:u}=i;await ue.window.withProgress({location:ue.ProgressLocation.Notification,title:"Ricwiz: Updating environment branches from their bases",cancellable:!0},async(a,p)=>{let l=0,d=u,n=!1;p.onCancellationRequested(()=>{n=!0}),a.report({message:"Syncing remote information...",increment:10});try{await h("git fetch --all",{cwd:t})}catch{}let r=80/(o.length||1);for(let c of o){if(n)break;let m=`${s}-to-${c.name}`,f=c.sourceBranch;if(await ge(t,m))try{a.report({message:`Processing ${m}...`,increment:r/2}),await h(`git checkout ${m}`,{cwd:t});try{a.report({message:`Merging ${f} into ${m}...`,increment:r/2});let g=e.getFetchRemote(f),w=e.getFetchBranch(f),z=e.buildUpstreamPath(f);await h(`git fetch ${g} ${w}`,{cwd:t}),await h(`git merge ${z}`,{cwd:t})}catch(g){let w=!1;try{let{stdout:x}=await h("git ls-files -u",{cwd:t});x.trim().length>0&&(w=!0)}catch{}let z=((g.stdout||"")+(g.stderr||"")+(g.message||"")).toLowerCase();if(w||z.includes("conflict")||z.includes("conflit")){let x=e.buildUpstreamPath(f);if(!await ve(t,x,m,a))throw n=!0,new Error("Update aborted by user.")}else throw g}if(n)break;l++}catch(g){g.message.includes("aborted")?ue.window.showInformationMessage("Ricwiz: Update cancelled."):ue.window.showErrorMessage(`Ricwiz: Failed to update branch ${m}. Detail: ${g.message}`);return}}if(!n){a.report({message:"Finishing up...",increment:10});try{let c=await I(t);d&&d!==c&&await h(`git checkout ${d}`,{cwd:t})}catch{}ue.window.showInformationMessage(`Ricwiz: Successfully updated ${l} environment branches from their bases!`)}})}var ue,vo=$(()=>{"use strict";ue=v(require("vscode"));R();We();me()});async function yo(){let t=y();if(!t){F.window.showErrorMessage("Ricwiz: Open a folder or workspace that is a Git repository.");return}let e=await I(t),o=F.workspace.getConfiguration("ricwiz");await F.window.withProgress({location:F.ProgressLocation.Notification,title:"Ricwiz: Scanning for unused local branches...",cancellable:!1},async()=>{try{await h("git fetch --prune",{cwd:t})}catch{}let i=[];try{let{stdout:r}=await h('git branch --format="%(refname:short)"',{cwd:t});i=r.split(`
`).map(c=>c.trim()).filter(c=>c.length>0)}catch{}if(i.length===0){F.window.showInformationMessage("Ricwiz: No local branches found.");return}let s=[];try{let{stdout:r}=await h('git branch -r --format="%(refname:short)"',{cwd:t});s=r.split(`
`).map(c=>c.trim().replace(/^origin\//,"").replace(/^[^\/]+\//,"")).filter(c=>c.length>0&&!c.includes("HEAD"))}catch{}let u=[];try{let{stdout:r}=await h('git for-each-ref --format="%(refname:short)|||%(upstream:track)" refs/heads/',{cwd:t});u=r.split(`
`).filter(c=>c.includes("[gone]")).map(c=>c.split("|||")[0].trim())}catch{}let a=i.filter(r=>!s.includes(r));if(a.length===0){F.window.showInformationMessage("Ricwiz: Your local repository is totally clean! All local branches exist on the remote.");return}let p=a.map(r=>{let c=u.includes(r),m=r===e,f="Not found on remote";return c&&(f="Deleted on remote [gone]"),m&&(f+=" (Current branch - will checkout main first)"),{label:r,description:f,picked:c&&!m}}),l=await F.window.showQuickPick(p,{canPickMany:!0,placeHolder:"Select local branches to delete",title:"Ricwiz: Delete Unused Branches"});if(!l||l.length===0){F.window.showInformationMessage("Ricwiz: No branches selected for deletion.");return}if(await F.window.showWarningMessage(`Ricwiz: Delete ${l.length} local branch(es)?
This cannot be undone!`,{modal:!0},"Yes, delete them")!=="Yes, delete them"){F.window.showInformationMessage("Ricwiz: Deletion cancelled.");return}let n=0;for(let r of l){let c=r.label;if(c===e){let m=o.get("ticketSourceBranch","main");try{await h(`git checkout ${m}`,{cwd:t}),e=m}catch{F.window.showWarningMessage(`Ricwiz: Could not switch away from ${c}. Skipping.`);continue}}try{await h(`git branch -D ${c}`,{cwd:t}),n++}catch{F.window.showWarningMessage(`Ricwiz: Could not delete local branch ${c}.`)}}F.window.showInformationMessage(`Ricwiz: \u{1F5D1}\uFE0F Cleaned up ${n} unused local branch(es).`)})}var F,bo=$(()=>{"use strict";F=v(require("vscode"));R()});async function ze(t){let e=y();e&&await ne.window.withProgress({location:ne.ProgressLocation.Notification,title:`Ricwiz: Switching to ${t}...`,cancellable:!1},async()=>{try{let o=await I(e),i=!1;try{let{stdout:u}=await h("git status --porcelain",{cwd:e});i=u.trim().length>0}catch{}if(i&&o)try{await h(`git stash push --include-untracked -m "ricwiz-auto:${o}"`,{cwd:e}),ne.window.showInformationMessage(`Ricwiz: \u{1F4E6} Stashed changes from ${o}`)}catch{ne.window.showWarningMessage("Ricwiz: Could not stash changes. Checkout may fail if there are conflicts.")}let s=t;t.includes("/")&&(s=t.split("/").slice(1).join("/"));try{await h(`git checkout ${s}`,{cwd:e})}catch{let a="";if(t.includes("/"))a=t.split("/")[0];else{let{stdout:p}=await h("git branch -r",{cwd:e}),l=p.split(`
`).map(n=>n.trim()).filter(n=>n),d=[];for(let n of l){let r=n.split(" ")[0];r.endsWith(`/${s}`)&&d.push(r.substring(0,r.lastIndexOf("/")))}if(d.length===0){ne.window.showErrorMessage(`Ricwiz: A branch "${s}" n\xE3o existe localmente nem em nenhuma remote!`);return}else if(d.length===1)a=d[0];else{let n=await L.initialize(e);d.includes("origin")?a="origin":n&&d.includes(n.upstreamRemote)?a=n.upstreamRemote:a=d[0]}}try{await h(`git fetch ${a} ${s}`,{cwd:e}),await h(`git checkout -b ${s} --track ${a}/${s}`,{cwd:e})}catch{ne.window.showErrorMessage(`Ricwiz: Encontrou na remote ${a} mas falhou a fazer checkout.`);return}}try{let{stdout:u}=await h("git stash list",{cwd:e}),a=u.split(`
`);for(let p=0;p<a.length;p++)if(a[p].includes(`ricwiz-auto:${s}`)){let l=a[p].match(/stash@\{(\d+)\}/);l&&(await h(`git stash pop stash@{${l[1]}}`,{cwd:e}),ne.window.showInformationMessage(`Ricwiz: \u{1F4E6} Restored stashed changes on ${s}`));break}}catch{ne.window.showWarningMessage(`Ricwiz: Could not restore stashed changes on ${s}. You may need to resolve conflicts manually (check git stash list).`)}}catch{ne.window.showErrorMessage(`Ricwiz: Could not checkout branch ${t}.`)}})}var ne,Ge=$(()=>{"use strict";ne=v(require("vscode"));R();me()});async function xo(){let t=y();if(t)try{let{stdout:e}=await h("git branch --show-current",{cwd:t}),o=e.trim();o&&(await Ee.env.clipboard.writeText(o),Ee.window.showInformationMessage(`Ricwiz: \u{1F4CB} Copied "${o}" to clipboard`))}catch{Ee.window.showErrorMessage("Ricwiz: Could not get the current branch name.")}}var Ee,ko=$(()=>{"use strict";Ee=v(require("vscode"));R()});async function $o(){let t=y();if(!t){Q.window.showErrorMessage("Ricwiz: Open a folder or workspace that is a Git repository.");return}let e=Q.workspace.getConfiguration("ricwiz"),o=e.get("ticketSourceBranch","main"),s=e.get("packageXmlCommand",'sf sgd source delta --to "HEAD" --from "origin/{baseBranch}" --output-dir "."').replace("{baseBranch}",o);await Q.window.showWarningMessage("Are you sure you want to generate the package.xml? This may overwrite existing local manifest files.",{modal:!0},"Yes, Generate")==="Yes, Generate"&&await Q.window.withProgress({location:Q.ProgressLocation.Notification,title:"Ricwiz: Generating package.xml using Salesforce CLI...",cancellable:!1},async()=>{try{await h(s,{cwd:t,maxBuffer:10*1024*1024}),Q.window.showInformationMessage("Ricwiz: Successfully generated package.xml!");let a=He.join(t,"package","package.xml"),p=He.join(t,"package.xml"),l=He.join(t,"manifest","package.xml");for(let d of[a,p,l])if(Co.existsSync(d)){let n=await Q.workspace.openTextDocument(d);await Q.window.showTextDocument(n);break}}catch(a){Q.window.showErrorMessage(`Ricwiz: Error running sf command - ${a.message}`)}})}var Q,He,Co,zo=$(()=>{"use strict";Q=v(require("vscode")),He=v(require("path")),Co=v(require("fs"));R()});async function Ro(){let t=y();if(!t){Y.window.showErrorMessage("Ricwiz: Open a folder or workspace that is a Git repository.");return}let o=Y.workspace.getConfiguration("ricwiz").get("deployCommand","sf project deploy start --manifest package/package.xml --post-destructive-changes destructiveChanges/destructiveChanges.xml -c -l NoTestRun -g");await Y.window.showWarningMessage("Are you sure you want to deploy to Salesforce? This action modifies your org and cannot be easily undone.",{modal:!0},"Yes, Deploy")==="Yes, Deploy"&&await Y.window.withProgress({location:Y.ProgressLocation.Notification,title:"Ricwiz: Deploying package...",cancellable:!1},async()=>{try{let{stdout:s,stderr:u}=await h(o,{cwd:t,maxBuffer:52428800}),a=Y.window.createOutputChannel("Ricwiz Deploy");a.appendLine(`Executing: ${o}`),a.appendLine(s),u&&(a.appendLine("--- STDERR ---"),a.appendLine(u)),a.show(),Y.window.showInformationMessage("Ricwiz: Successfully ran deploy command!")}catch(s){let u=Y.window.createOutputChannel("Ricwiz Deploy");u.appendLine(`Error executing: ${o}`),s.stdout&&u.appendLine(s.stdout),s.stderr&&u.appendLine(s.stderr),u.appendLine(s.message),u.show(),Y.window.showErrorMessage("Ricwiz: Error running deploy command. See output channel for details.")}})}var Y,So=$(()=>{"use strict";Y=v(require("vscode"));R()});async function Bo(){let t=y();if(!t){Z.window.showErrorMessage("Ricwiz: Open a folder or workspace that is a Git repository.");return}let o=Z.workspace.getConfiguration("ricwiz").get("importDataCommand","sfdx force:data:tree:import --plan data/plan.json");await Z.window.showWarningMessage("Are you sure you want to import data into Salesforce? This action modifies records in your org.",{modal:!0},"Yes, Import")==="Yes, Import"&&await Z.window.withProgress({location:Z.ProgressLocation.Notification,title:"Ricwiz: Importing data...",cancellable:!1},async()=>{try{let{stdout:s,stderr:u}=await h(o,{cwd:t,maxBuffer:52428800}),a=Z.window.createOutputChannel("Ricwiz Import Data");a.appendLine(`Executing: ${o}`),a.appendLine(s),u&&(a.appendLine("--- STDERR ---"),a.appendLine(u)),a.show(),Z.window.showInformationMessage("Ricwiz: Successfully ran import data command!")}catch(s){let u=Z.window.createOutputChannel("Ricwiz Import Data");u.appendLine(`Error executing: ${o}`),s.stdout&&u.appendLine(s.stdout),s.stderr&&u.appendLine(s.stderr),u.appendLine(s.message),u.show(),Z.window.showErrorMessage("Ricwiz: Error running import data command. See output channel for details.")}})}var Z,Po=$(()=>{"use strict";Z=v(require("vscode"));R()});async function Eo(){let t=y();if(!t){K.window.showErrorMessage("Ricwiz: Open a folder or workspace that is a Git repository.");return}let e="";try{e=await I(t)}catch{}let i=K.workspace.getConfiguration("ricwiz").get("ticketSourceBranch","main"),s=await K.window.showInputBox({prompt:`Enter the branch name to list modified files (compared to ${i})`,value:e,placeHolder:"SFPSCA-1234"});s&&await K.window.withProgress({location:K.ProgressLocation.Notification,title:`Ricwiz: Finding files for ${s}...`,cancellable:!1},async()=>{try{let u=s.replace(/-to-[a-zA-Z0-9]+$/i,""),a=[];try{let f="";try{let{stdout:g}=await h(`git merge-base origin/${i} ${s}`,{cwd:t});f=g.trim()}catch{let{stdout:g}=await h(`git merge-base ${i} ${s}`,{cwd:t});f=g.trim()}if(f){let{stdout:g}=await h(`git diff --name-only ${f} ${s}`,{cwd:t,maxBuffer:10485760});a=g.split(`
`).map(w=>w.trim()).filter(w=>w.length>0)}}catch{}let p=[];try{let{stdout:f}=await h(`git --no-pager log --grep="\\b${u}\\b" -i -E --name-only -m --first-parent --format=""`,{cwd:t,maxBuffer:10485760});p=f.split(`
`).map(g=>g.trim()).filter(g=>g.length>0)}catch{}let l=[...a,...p];if(l.length===0){K.window.showInformationMessage(`Ricwiz: No modified files found for ${s}.`);return}let d=Array.from(new Set(l)).sort(),n={};for(let f of d){let g=f.match(/default\/([^/]+)/),w=g&&g[1]?g[1].toUpperCase():"OUTROS";n[w]||(n[w]=[]),n[w].push(f)}let r=`Files modified in branch ${s}:
`,c=Object.keys(n).sort();for(let f of c)r+=`
=== ${f} ===
`,r+=n[f].join(`
`)+`
`;let m=await K.workspace.openTextDocument({content:r,language:"plaintext"});await K.window.showTextDocument(m)}catch(u){K.window.showErrorMessage(`Ricwiz: Error running git log - ${u.message}`)}})}var K,Mo=$(()=>{"use strict";K=v(require("vscode"));R()});async function To(){let t=y();if(!t){se.window.showErrorMessage("Ricwiz: Open a folder or workspace that is a Git repository.");return}let o=se.workspace.getConfiguration("ricwiz").get("resetTrackingCommand","sf org disable tracking && sf project reset tracking --no-prompt");await se.window.withProgress({location:se.ProgressLocation.Notification,title:"Ricwiz: Resetting tracking...",cancellable:!1},async()=>{try{let{stdout:i,stderr:s}=await h(o,{cwd:t,maxBuffer:52428800}),u=se.window.createOutputChannel("Ricwiz Reset Tracking");u.appendLine(`Executing: ${o}`),u.appendLine(i),s&&(u.appendLine("--- STDERR ---"),u.appendLine(s)),u.show(),se.window.showInformationMessage("Ricwiz: Successfully reset tracking!")}catch(i){let s=se.window.createOutputChannel("Ricwiz Reset Tracking");s.appendLine(`Error executing: ${o}`),i.stdout&&s.appendLine(i.stdout),i.stderr&&s.appendLine(i.stderr),s.appendLine(i.message),s.show(),se.window.showErrorMessage("Ricwiz: Error resetting tracking. See output channel for details.")}})}var se,Do=$(()=>{"use strict";se=v(require("vscode"));R()});async function Ao(){let t=y();if(!t){X.window.showErrorMessage("Ricwiz: Open a workspace first.");return}let e=["ApexClass","ApexTrigger","CustomObject","CustomField","LightningComponentBundle","AuraDefinitionBundle","Flow","CustomLabel","CustomMetadata","StaticResource","Profile","PermissionSet","PermissionSetGroup","Layout","ValidationRule","RecordType","ListView","Report","EmailTemplate","Other (Type manually)..."],o=await X.window.showQuickPick(e,{placeHolder:"Select Metadata Type to extract (e.g., ApexClass)",ignoreFocusOut:!0});if(!o||o==="Other (Type manually)..."&&(o=await X.window.showInputBox({prompt:"Enter Metadata Type (e.g., CustomApplication, Queue)",ignoreFocusOut:!0}),!o))return;let i={ApexClass:"**/*.cls",ApexTrigger:"**/*.trigger",CustomObject:"**/*.{object,object-meta.xml}",CustomField:"**/*.field-meta.xml",LightningComponentBundle:"**/lwc/*/*.js",AuraDefinitionBundle:"**/aura/*/*.cmp",Flow:"**/*.flow-meta.xml",CustomLabel:"**/*.labels-meta.xml",CustomMetadata:"**/*.md-meta.xml",StaticResource:"**/*.resource-meta.xml",Profile:"**/*.profile-meta.xml",PermissionSet:"**/*.permissionset-meta.xml",PermissionSetGroup:"**/*.permissionsetgroup-meta.xml",Layout:"**/*.layout-meta.xml",ValidationRule:"**/*.validationRule-meta.xml",RecordType:"**/*.recordType-meta.xml",ListView:"**/*.listView-meta.xml"},s=[],u=i[o];if(u)try{s=(await X.workspace.findFiles(u,"**/node_modules/**")).map(l=>{let d=l.fsPath.split(/[\\/]/).pop()||"";if(o==="LightningComponentBundle"||o==="AuraDefinitionBundle"){let n=l.fsPath.split(/[\\/]/);return n[n.length-2]||d.split(".")[0]}return d.split(".")[0]}),s=[...new Set(s)].sort()}catch{}let a=await new Promise(p=>{let l=X.window.createQuickPick();l.title=`Extract ${o}`,l.placeholder="Type name (e.g. MyComponent) or * for all",l.ignoreFocusOut=!0,l.matchOnDescription=!0;let d=()=>{let n=l.value.trim(),r=[];n?r.push({label:`$(cloud-download) Extract "${n}"`,description:"Extract exact name from Salesforce",alwaysShow:!0}):r.push({label:'$(cloud-download) Extract "*" (All)',description:`Extract all ${o}s`,alwaysShow:!0}),s.forEach(c=>{(!n||c.toLowerCase().includes(n.toLowerCase()))&&r.push({label:c,description:"Local workspace component"})}),l.items=r};l.onDidChangeValue(()=>d()),l.onDidAccept(()=>{let n=l.selectedItems[0];if(n){let r=n.label;r.startsWith('$(cloud-download) Extract "')?r=r.replace('$(cloud-download) Extract "',"").replace('" (All)',"").replace('"',""):r==='$(cloud-download) Extract "*" (All)'&&(r="*"),l.hide(),p(r)}}),l.onDidHide(()=>{l.dispose(),p(void 0)}),d(),l.show()});a&&await X.window.withProgress({location:X.ProgressLocation.Notification,title:`Ricwiz: Extracting ${o}:${a} from Salesforce...`,cancellable:!0},async(p,l)=>{try{A.show(!0);let d=`${o}:${a}`,{stdout:n,stderr:r}=await h(`sf project retrieve start -m "${d}"`,{cwd:t});n&&A.appendLine(n),r&&A.appendLine(r),X.window.showInformationMessage(`Ricwiz: Successfully extracted ${d}.`)}catch(d){A.appendLine(`ERROR: ${d.message}`),d.stdout&&A.appendLine(d.stdout),d.stderr&&A.appendLine(d.stderr),X.window.showErrorMessage("Ricwiz: Extraction failed. See Output channel for details.")}})}var X,Io=$(()=>{"use strict";X=v(require("vscode"));R()});async function Fo(){let t=j.window.activeTextEditor;if(!t){j.window.showErrorMessage("Ricwiz: Please open the file you want to deploy in the editor first.");return}let e=t.document.uri.fsPath,o=y();if(!o)return;let i="";if(await j.window.withProgress({location:j.ProgressLocation.Notification,title:"Ricwiz: Fetching available Salesforce orgs...",cancellable:!1},async()=>{try{let{stdout:l}=await h("sf org list --json",{cwd:o});i=l}catch(l){i=l.stdout||""}}),!i){j.window.showErrorMessage("Ricwiz: Failed to fetch orgs. Is Salesforce CLI installed?");return}let s=[];try{let l=JSON.parse(i),d=l.result?.nonScratchOrgs||[],n=l.result?.scratchOrgs||[];s=[...d,...n]}catch{j.window.showErrorMessage("Ricwiz: Failed to parse org list.");return}if(s.length===0){j.window.showInformationMessage("Ricwiz: No authenticated orgs found.");return}let u=s.map(l=>({label:l.alias||l.username,description:l.alias?l.username:"",picked:l.isDefaultUsername})),a=await j.window.showQuickPick(u,{placeHolder:"Select the org(s) to deploy this file to",canPickMany:!0,ignoreFocusOut:!0});if(!a||a.length===0)return;let p=Lo.basename(e);await j.window.withProgress({location:j.ProgressLocation.Notification,title:`Ricwiz: Deploying ${p} to ${a.length} org(s)...`,cancellable:!1},async()=>{A.show(!0),A.appendLine(`--- Starting Parallel Deploy of ${p} ---`);let l=a.map(async c=>{let m=c.label;A.appendLine(`[${m}] Deploying...`);try{let{stdout:f,stderr:g}=await h(`sf project deploy start -d "${e}" -o "${m}"`,{cwd:o});return A.appendLine(`[${m}] \u2705 Success`),f&&A.appendLine(f),{org:m,success:!0}}catch(f){return A.appendLine(`[${m}] \u274C Failed`),f.stdout&&A.appendLine(f.stdout),f.stderr&&A.appendLine(f.stderr),{org:m,success:!1}}}),d=await Promise.all(l),n=d.filter(c=>c.success).length,r=d.filter(c=>!c.success).length;r===0?j.window.showInformationMessage(`Ricwiz: Successfully deployed to all ${n} orgs!`):j.window.showErrorMessage(`Ricwiz: Deploy finished with errors (${n} success, ${r} failed). Check Output channel.`)})}var j,Lo,Oo=$(()=>{"use strict";j=v(require("vscode")),Lo=v(require("path"));R()});async function No(){let t=y();if(!t){D.window.showErrorMessage("Ricwiz: Open a folder or workspace that is a Git repository.");return}let e=D.workspace.getConfiguration("ricwiz"),o=e.get("auditUsername",""),i=e.get("auditHours",8),s=await D.window.showInputBox({prompt:"Enter your Salesforce Username to query in SetupAuditTrail",value:o,placeHolder:"admin@tuaorg.com"});if(!s)return;let u=await D.window.showInputBox({prompt:"How many hours back do you want to search?",value:i.toString(),placeHolder:"8"});if(!u)return;let a=parseFloat(u);if(isNaN(a)||a<=0){D.window.showErrorMessage("Ricwiz: Invalid hours specified.");return}let p=new Date(Date.now()-a*60*60*1e3).toISOString(),d=`sf data query -q "${`SELECT Action, Display, Section FROM SetupAuditTrail WHERE CreatedBy.Username = '${s}' AND CreatedDate >= ${p}`}" --json`;await D.window.withProgress({location:D.ProgressLocation.Notification,title:"Ricwiz: Interrogating Setup Audit Trail...",cancellable:!1},async()=>{try{let{stdout:n}=await h(d,{cwd:t,maxBuffer:52428800}),r=JSON.parse(n);if(!r.result||r.result.records.length===0){D.window.showInformationMessage(`Ricwiz: No changes found for ${s} in the last ${a} hours.`);return}let c=r.result.records,m=[],f=new Set;for(let E of c){let N=ri(E.Action,E.Display,E.Section);if(N){let H=`${N.isDelete?"DEL":"ADD"}-${N.metadataFormat}`;if(!f.has(H)){f.add(H);let V=N.isDelete?"$(trash)":"$(plus)";m.push({label:`${V} ${N.metadataFormat}`,description:`${E.Action} -> ${E.Display}`,metadataFormat:N.metadataFormat,isDelete:N.isDelete})}}}if(m.length===0){D.window.showInformationMessage(`Ricwiz: No extractable metadata changes found for ${s} in the last ${a} hours (ignored passwords/logins).`);return}let g=await D.window.showQuickPick(m,{canPickMany:!0,placeHolder:"Select the changes you want to extract to GitLab",ignoreFocusOut:!0});if(!g||g.length===0){D.window.showInformationMessage("Ricwiz: No changes selected.");return}let w=g.filter(E=>E.isDelete),z=g.filter(E=>!E.isDelete),x=D.window.createOutputChannel("Ricwiz Admin Bridge");if(x.show(),w.length>0){let{stdout:E}=await h("git ls-files",{cwd:t}),N=E.split(`
`).map(V=>V.trim()),H=0;for(let V of w){let Ae=V.metadataFormat.split(":"),Ie=Ae[0],he=Ae[1],Le=he;Ie==="CustomField"&&(Le=he.split(".")[1]);let Qe=N.filter(M=>{let J=_e.basename(M);return J.startsWith(Le+".")&&J.includes(Ie==="CustomField"?".field":"")});for(let M of Qe){let J=_e.join(t,M);Ve.existsSync(J)&&(Ve.unlinkSync(J),x.appendLine(`Deleted local file: ${M}`),H++)}}D.window.showInformationMessage(`Ricwiz: Deleted ${H} local files from Git workspace.`)}if(z.length===0)return;let P=z.map(E=>E.metadataFormat).filter(E=>E!=="").join(", "),B=await D.window.showInputBox({prompt:"Review and adjust the metadata components to retrieve",value:P,ignoreFocusOut:!0});if(!B)return;let O=`sf project retrieve start -m "${B}"`;x.appendLine(`Executing: ${O}`),D.window.showInformationMessage(`Ricwiz: Extracting ${z.length} components...`);let re=await h(O,{cwd:t});x.appendLine(re.stdout),re.stderr&&(x.appendLine("--- STDERR ---"),x.appendLine(re.stderr)),D.window.showInformationMessage("Ricwiz: Changes extracted successfully! Ready for Git Commit.")}catch(n){D.window.showErrorMessage(`Ricwiz: Error capturing changes - ${n.message}`)}})}function ri(t,e,o){if(!t||!e||!o)return null;let i=t.toLowerCase(),s=o.toLowerCase();if(["security controls","network access","session settings","data export","login history","password policies","identity verification","delegated administration"].includes(s)||i.includes("login")||i.includes("password")||i.includes("oauth")||i.includes("session"))return null;let a=i.includes("delete"),p=null;if(i==="permissionsetgroupcomponentadd"||i==="permissionsetgroupcomponentdelete")return null;let l=(d,n=!1)=>{let r=d.replace(/\(.*\)/g,"").trim();r.includes(":")&&!i.includes("calculation")&&(r=r.split(":")[0]);let c=["disabled","deleted","removed","created","changed","updated","from","to","on","assigned","assign","assignment","permission","set","group","apex","class","trigger","custom","field","object","layout","validation","rule","flow","profile"],m=r.split(/\s+/);if(n){for(;m.length>0&&c.includes(m[m.length-1].toLowerCase());)m.pop();for(;m.length>0&&c.includes(m[0].toLowerCase());)m.shift();return m.join(" ").trim().replace(/[^a-zA-Z0-9_ ]/g,"")}else return m.filter(w=>!c.includes(w.toLowerCase())).join("_").replace(/[^a-zA-Z0-9_]/g,"")||r.replace(/\s+/g,"")};if(i.includes("profile"))p=`Profile:${l(e,!0)}`;else if(i.includes("permissionsetgroupcalculation")){let d=e.split(":");p=`PermissionSetGroup:${d.length>1?d[d.length-1].trim():l(e,!1)}`}else if(i.includes("permission set group")||i.includes("permissionsetgroup"))p=`PermissionSetGroup:${l(e,!1)}`;else if(i.includes("permission set")||i.includes("permissionset"))p=`PermissionSet:${l(e,!1)}`;else if(i.includes("apexclass"))p=`ApexClass:${l(e,!1)}`;else if(i.includes("apextrigger")||i.includes("apex trigger"))p=`ApexTrigger:${l(e,!1)}`;else if(i.includes("customfield")){let d=e.match(/([A-Za-z0-9_]+__c)/),n=e.match(/(?:on|na|for)\s+([A-Za-z0-9_]+)/i);d&&n?p=`CustomField:${n[1]}.${d[1]}`:p=`CustomField:${l(e,!1)}`}else if(i.includes("layout"))p=`Layout:${l(e,!0)}`;else if(i.includes("validation"))p=`ValidationRule:${l(e,!1)}`;else if(i.includes("flow"))p=`Flow:${l(e,!1)}`;else if(i.includes("customobject")){let d=e.match(/([A-Za-z0-9_]+__c)/);p=d?`CustomObject:${d[1]}`:`CustomObject:${l(e,!1)}`}else if(!i.includes("created")&&!i.includes("changed")&&!i.includes("deleted"))return null;return p?{metadataFormat:p,isDelete:a}:null}var D,Ve,_e,Uo=$(()=>{"use strict";D=v(require("vscode")),Ve=v(require("fs")),_e=v(require("path"));R()});async function jo(){let t=y();if(t)try{let{stdout:e}=await h('git for-each-ref --sort=-committerdate --format="%(refname:short)|||%(committerdate:relative)|||%(subject)" refs/heads/',{cwd:t}),o=e.split(`
`).filter(s=>s.trim()).map(s=>{let u=s.split("|||");return{label:`$(git-branch) ${u[0]}`,description:u[1],detail:u[2],branchName:u[0]}}),i=await at.window.showQuickPick(o,{placeHolder:"Select a branch from history to checkout",matchOnDescription:!0,matchOnDetail:!0});i&&await ze(i.branchName)}catch{at.window.showErrorMessage("Ricwiz: Failed to get branch history")}}var at,Jo=$(()=>{"use strict";at=v(require("vscode"));R();Ge()});async function Wo(){let t=y();if(!t)return;let e=await Me.window.showInputBox({prompt:"Enter ticket number or name (e.g., 48934)",placeHolder:"48934"});if(e)try{let{stdout:o}=await h(`git branch --list "*${e}*"`,{cwd:t}),i=o.split(`
`).map(a=>a.replace("*","").trim()).filter(a=>a);if(i.length===0){Me.window.showInformationMessage(`Ricwiz: No branches found matching "${e}"`);return}let s=i.map(a=>({label:`$(git-branch) ${a}`,branchName:a})),u=await Me.window.showQuickPick(s,{placeHolder:`Select a branch for ${e}`});u&&await ze(u.branchName)}catch{Me.window.showErrorMessage("Ricwiz: Failed to search branches")}}var Me,qo=$(()=>{"use strict";Me=v(require("vscode"));R();Ge()});async function Ho(){let t=be.window.activeTextEditor;if(!t)return be.window.showErrorMessage("Ricwiz: Please open a file in the editor to check blame."),null;let e=t.document.fileName,o=Go.basename(e),i=y();if(!i)return be.window.showErrorMessage("Ricwiz: Workspace is not a git repository."),null;let s=[];try{let{stdout:n}=await h(`git log -5 --pretty=format:"%an|%ar|%s|%h" -- "${e}"`,{cwd:i}),r=n.trim().split(`
`);for(let c of r){let m=c.split("|");m.length>=4&&s.push({author:m[0],time:m[1],message:m.slice(2,-1).join("|"),hash:m[m.length-1]})}}catch(n){console.error("Git blame error:",n)}let u="Unknown",a="Unknown",p="Unknown",l=[],d=ai(e);if(d)try{await be.window.withProgress({location:be.ProgressLocation.Notification,title:`Ricwiz: Analyzing ${d.name} in Salesforce...`,cancellable:!1},async()=>{let n="";if(d.type==="CustomField"){let r=d.name.split(".");r.length===2&&(n=`SELECT LastModifiedBy.Name, LastModifiedDate, CreatedBy.Name FROM CustomField WHERE DeveloperName = '${r[1].replace("__c","")}' AND TableEnumOrId = '${r[0]}'`)}else d.type==="LightningComponentBundle"?n=`SELECT LastModifiedBy.Name, LastModifiedDate, CreatedBy.Name FROM LightningComponentBundle WHERE DeveloperName = '${d.name}'`:n=`SELECT LastModifiedBy.Name, LastModifiedDate, CreatedBy.Name FROM ${d.type} WHERE Name = '${d.name}'`;if(n)try{let{stdout:r}=await h(`sf data query -t -q "${n}" --json`,{cwd:i,maxBuffer:52428800}),c=JSON.parse(r);if(c&&c.result&&c.result.records&&c.result.records.length>0){let m=c.result.records[0];u=m.LastModifiedBy?m.LastModifiedBy.Name:"Unknown",p=m.CreatedBy?m.CreatedBy.Name:"Unknown",a=new Date(m.LastModifiedDate).toLocaleString()}else u="Not found in Org",a="N/A",p="N/A"}catch{u="Query Error",a="N/A",p="N/A"}try{let r="SELECT Action, Display, CreatedBy.Name, CreatedDate FROM SetupAuditTrail ORDER BY CreatedDate DESC LIMIT 1500",{stdout:c}=await h(`sf data query -q "${r}" --json`,{cwd:i,maxBuffer:52428800}),m=JSON.parse(c);if(m&&m.result&&m.result.records){let f=d.name.replace("__c","");l=m.result.records.filter(w=>w.Display&&w.Display.includes(f)).map(w=>({action:w.Action,display:w.Display,author:w.CreatedBy?w.CreatedBy.Name:"Unknown",time:new Date(w.CreatedDate).toLocaleString()})).slice(0,10)}}catch(r){console.error("Audit trail query error:",r)}})}catch(n){console.error("Salesforce query error:",n)}else u="Unsupported Metadata Type",a="N/A";return{fileName:o,gitHistory:s,sfAuthor:u,sfTime:a,sfCreatedBy:p,auditHistory:l}}function ai(t){let e=t.replace(/\\/g,"/");if(e.includes("/classes/")){let o=e.match(/\/classes\/([^/.]+)\.cls/);if(o)return{type:"ApexClass",name:o[1]}}if(e.includes("/triggers/")){let o=e.match(/\/triggers\/([^/.]+)\.trigger/);if(o)return{type:"ApexTrigger",name:o[1]}}if(e.includes("/lwc/")){let o=e.match(/\/lwc\/([^/]+)\//);if(o)return{type:"LightningComponentBundle",name:o[1]}}if(e.includes("/aura/")){let o=e.match(/\/aura\/([^/]+)\//);if(o)return{type:"AuraDefinitionBundle",name:o[1]}}if(e.includes("/objects/")&&e.includes("/fields/")){let o=e.match(/\/objects\/([^/]+)\//),i=e.match(/\/fields\/([^/.]+)\.field/);if(o&&i)return{type:"CustomField",name:`${o[1]}.${i[1]}`}}return null}var be,Go,Vo=$(()=>{"use strict";be=v(require("vscode")),Go=v(require("path"));R()});function _o(t,e,o){t.subscriptions.push(k.commands.registerCommand("ricwiz.generateDestructiveChanges",xt),k.commands.registerCommand("ricwiz.runSmartTests",Ct),k.commands.registerCommand("ricwiz.refreshWebview",()=>{e&&k.commands.executeCommand("workbench.action.webview.reloadWebviewAction")}),k.commands.registerCommand("ricwiz.createBranches",St),k.commands.registerCommand("ricwiz.prepareDeploy",Mt),k.commands.registerCommand("ricwiz.createMergeRequests",At),k.commands.registerCommand("ricwiz.createMergeRequestsVSCode",It),k.commands.registerCommand("ricwiz.openJiraTicket",Ot),k.commands.registerCommand("ricwiz.openJiraTicketVSCode",Nt),k.commands.registerCommand("ricwiz.showJiraDetails",()=>{e&&oo(e)}),k.commands.registerCommand("ricwiz.openJiraDashboard",i=>{e&&no(e,i)}),k.commands.registerCommand("ricwiz.openJiraDetailsForId",i=>{e&&so(e,i)}),k.commands.registerCommand("ricwiz.toggleDashboardBranches",i=>{e&&(e.setDashboardShowBranches(i),k.commands.executeCommand("ricwiz.openJiraDashboard"))}),k.commands.registerCommand("ricwiz.changeJiraStatus",ao),k.commands.registerCommand("ricwiz.addJiraComment",co),k.commands.registerCommand("ricwiz.addJiraLabel",lo),k.commands.registerCommand("ricwiz.setJiraToken",mo),k.commands.registerCommand("ricwiz.setGitlabToken",uo),k.commands.registerCommand("ricwiz.syncAll",fo),k.commands.registerCommand("ricwiz.updateBases",wo),k.commands.registerCommand("ricwiz.deleteUnusedBranches",yo),k.commands.registerCommand("ricwiz.checkoutBranch",ze),k.commands.registerCommand("ricwiz.copyBranchName",xo),k.commands.registerCommand("ricwiz.generatePackageXml",$o),k.commands.registerCommand("ricwiz.deployPackage",Ro),k.commands.registerCommand("ricwiz.importData",Bo),k.commands.registerCommand("ricwiz.listTicketFiles",Eo),k.commands.registerCommand("ricwiz.resetTracking",To),k.commands.registerCommand("ricwiz.extractComponent",Ao),k.commands.registerCommand("ricwiz.deployMultiOrg",Fo),k.commands.registerCommand("ricwiz.captureAdminChanges",No),k.commands.registerCommand("ricwiz.openHistory",jo),k.commands.registerCommand("ricwiz.searchTicket",Wo),k.commands.registerCommand("ricwiz.whoToBlame",async()=>{let i=await Ho();i&&e&&(e.setBlameData(i),e.setPage("blame"))}),k.commands.registerCommand("ricwiz.manualRefresh",()=>{o&&o()}),k.commands.registerCommand("ricwiz.toggleAutoRefresh",()=>{if(e){let i=!e.isAutoRefreshEnabled();e.setAutoRefresh(i),k.workspace.getConfiguration("ricwiz").update("autoRefresh",i,k.ConfigurationTarget.Global)}}),k.commands.registerCommand("ricwiz.openSettings",()=>{k.commands.executeCommand("workbench.action.openSettings","ricwiz")}))}var k,Qo=$(()=>{"use strict";k=v(require("vscode"));kt();$t();Bt();Tt();Lt();Ut();io();ro();po();go();ho();vo();bo();Ge();ko();zo();So();Po();Mo();Do();Io();Oo();Uo();Jo();qo();Vo()});function Yo(t,e,o){let i,s=de.workspace.getConfiguration("ricwiz").get("autoRefresh",!0);e?.setAutoRefresh(s),t.subscriptions.push(de.workspace.onDidChangeConfiguration(a=>{if(a.affectsConfiguration("ricwiz.autoRefresh")){let p=de.workspace.getConfiguration("ricwiz").get("autoRefresh",!0);e?.setAutoRefresh(p)}}));async function u(){let a=de.extensions.getExtension("vscode.git");if(a){let d=function(n){let r="",c;async function m(){let g=de.workspace.workspaceFolders;if(!g)return;let w=g[0].uri.fsPath,z=await I(w);if(z&&z!==r){r=z;let x=de.workspace.getConfiguration("ricwiz"),P=x.get("ticketPrefix","SFPSCA-");if(!z.includes(P)){let M=z.match(/([A-Z]+-)\d+/i);M&&(P=M[1].toUpperCase())}let B=[],O=[],re=[],E=[],N=x.get("environments",[{name:"Qual",sourceBranch:"quality"},{name:"Val",sourceBranch:"validation"},{name:"Prod",sourceBranch:"main"}]);try{let M=x.get("workspaceCheckoutButtons",["main","quality","validation"]);re=Array.from(new Set(M))}catch{}let H="",V=z.match(new RegExp(`(${P}\\d+(?:-\\d+)?)`,"i"));if(V){let M=V[1].toUpperCase();H=M;let J=x.get("commitMessageSuffix","- "),ct=/^[A-Z]+-\d+(?:-\d+)?\s*(?:-\s*|:\s*|\s+)?/i;ct.test(n.inputBox.value)?n.inputBox.value.toUpperCase().startsWith(M)||(n.inputBox.value=n.inputBox.value.replace(ct,`${M}${J}`)):n.inputBox.value=`${M}${J}`+n.inputBox.value,o.text=`$(bookmark) ${M}`,o.tooltip=`Branch: ${z}
Click to open Jira ticket`,o.show();try{let dt=await st(w,M,"");B=await tt(w,dt,M,N)}catch{}}else{o.hide();try{E=await nt(w)}catch{}}let[Ae,Ie,he]=await Promise.all([it(w,10),ot(w,z,N),H?$e(H).catch(M=>{let J=M.message;return(J.includes("ENOTFOUND")||J.includes("network"))&&(J="No Internet or Invalid URL"),{summary:`\u26A0\uFE0F Jira Error: ${J}`,description:"",status:""}}):Promise.resolve(null)]);O=Ae;let Le=he?he.summary:"",Qe=he&&he.status||"";e?.updateBranch(z,Ie,B,O,re,E,Le,Qe)}}function f(){e?.isAutoRefreshEnabled()&&(c&&clearTimeout(c),c=setTimeout(()=>{r="",m()},300))}i=()=>{r="",m()},m(),n.state.onDidChange(()=>f()),de.window.onDidChangeWindowState(g=>{g.focused&&f()})};var p=d;a.isActive||await a.activate();let l=a.exports.getAPI(1);l.repositories.length>0&&l.repositories.forEach(n=>d(n)),l.onDidOpenRepository(n=>d(n))}}return u(),()=>{i&&i()}}var de,Zo=$(()=>{"use strict";de=v(require("vscode"));R();Pe();Be()});var je={};Ye(je,{activate:()=>ci,deactivate:()=>di,webviewProvider:()=>Te});module.exports=ee(je);function ci(t){pt(t),Te=new Oe(t.extensionUri),t.subscriptions.push(De.window.registerWebviewViewProvider("ricwiz-webview",Te));let e=De.window.createStatusBarItem(De.StatusBarAlignment.Left,100);e.command="ricwiz.openJiraTicket",t.subscriptions.push(e);let o=Yo(t,Te,e);_o(t,Te,o)}function di(){}var De,Te,Je=$(()=>{De=v(require("vscode"));mt();xe();Qo();Zo()});Je();0&&(module.exports={activate,deactivate,webviewProvider});
