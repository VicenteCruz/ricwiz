"use strict";var _o=Object.create;var Ie=Object.defineProperty;var Qo=Object.getOwnPropertyDescriptor;var Yo=Object.getOwnPropertyNames;var Zo=Object.getPrototypeOf,Ko=Object.prototype.hasOwnProperty;var k=(t,e,i)=>()=>{if(i)throw i[0];try{return t&&(e=t(t=0)),e}catch(n){throw i=[n],n}};var et=(t,e)=>{for(var i in e)Ie(t,i,{get:e[i],enumerable:!0})},tt=(t,e,i,n)=>{if(e&&typeof e=="object"||typeof e=="function")for(let r of Yo(e))!Ko.call(t,r)&&r!==i&&Ie(t,r,{get:()=>e[r],enumerable:!(n=Qo(e,r))||n.enumerable});return t};var v=(t,e,i)=>(i=t!=null?_o(Zo(t)):{},tt(e||!t||!t.__esModule?Ie(i,"default",{value:t,enumerable:!0}):i,t)),fe=t=>tt(Ie({},"__esModule",{value:!0}),t);function C(t){return t.replace(/&/g,"&amp;").replace(/</g,"&lt;").replace(/>/g,"&gt;").replace(/"/g,"&quot;").replace(/'/g,"&#39;")}var y,Le,ot=k(()=>{"use strict";y=v(require("vscode"));Le=class{constructor(e){this._extensionUri=e}_extensionUri;webviewView;resolveWebviewView(e,i,n){this.webviewView=e,e.webview.options={enableScripts:!0,localResourceRoots:[this._extensionUri]},this.updateBranch("",!1),e.webview.onDidReceiveMessage(r=>{switch(r.command){case"createBranches":y.commands.executeCommand("ricwiz.createBranches");break;case"createBranchForTicket":y.commands.executeCommand("ricwiz.createBranches",r.args);break;case"prepareDeploy":y.commands.executeCommand("ricwiz.prepareDeploy");break;case"openMRs":y.commands.executeCommand("ricwiz.createMergeRequests");break;case"openMRsVSCode":y.commands.executeCommand("ricwiz.createMergeRequestsVSCode");break;case"openJira":y.commands.executeCommand("ricwiz.openJiraTicket");break;case"showJiraDetails":y.commands.executeCommand("ricwiz.showJiraDetails");break;case"changeJiraStatus":y.commands.executeCommand("ricwiz.changeJiraStatus");break;case"addJiraComment":y.commands.executeCommand("ricwiz.addJiraComment");break;case"addJiraLabel":y.commands.executeCommand("ricwiz.addJiraLabel");break;case"setPage":this.setPage(r.args);break;case"openDashboard":y.commands.executeCommand("ricwiz.openJiraDashboard");break;case"openJiraDetailsForId":y.commands.executeCommand("ricwiz.openJiraDetailsForId",r.args);break;case"refreshDashboard":y.commands.executeCommand("ricwiz.openJiraDashboard");break;case"switchDashboardQuery":y.commands.executeCommand("ricwiz.openJiraDashboard",parseInt(r.args));break;case"openJiraVSCode":y.commands.executeCommand("ricwiz.openJiraTicketVSCode");break;case"openSettings":y.commands.executeCommand("ricwiz.openSettings");break;case"checkout":r.branch&&y.commands.executeCommand("ricwiz.checkoutBranch",r.branch);break;case"copyBranch":y.commands.executeCommand("ricwiz.copyBranchName");break;case"generatePackageXml":y.commands.executeCommand("ricwiz.generatePackageXml");break;case"openDevTools":this.setPage("devtools");break;case"openMain":this.setPage("main");break;case"generateDestructiveChanges":y.commands.executeCommand("ricwiz.generateDestructiveChanges");break;case"deployPackage":y.commands.executeCommand("ricwiz.deployPackage");break;case"runSmartTests":y.commands.executeCommand("ricwiz.runSmartTests");break;case"importData":y.commands.executeCommand("ricwiz.importData");break;case"listTicketFiles":y.commands.executeCommand("ricwiz.listTicketFiles");break;case"resetTracking":y.commands.executeCommand("ricwiz.resetTracking");break;case"extractComponent":y.commands.executeCommand("ricwiz.extractComponent");break;case"deployMultiOrg":y.commands.executeCommand("ricwiz.deployMultiOrg");break;case"captureAdminChanges":y.commands.executeCommand("ricwiz.captureAdminChanges");break;case"whoToBlame":y.commands.executeCommand("ricwiz.whoToBlame");break;case"syncAll":y.commands.executeCommand("ricwiz.syncAll");break;case"updateBases":y.commands.executeCommand("ricwiz.updateBases");break;case"deleteUnused":y.commands.executeCommand("ricwiz.deleteUnusedBranches");break;case"conflict_commitAndContinue":y.commands.executeCommand("ricwiz.conflictAction","commitAndContinue");break;case"conflict_resolveDeletions":y.commands.executeCommand("ricwiz.conflictAction","resolveDeletions");break;case"conflict_abortDeploy":y.commands.executeCommand("ricwiz.conflictAction","abortDeploy");break;case"openFile":if(r.file){let u=y.workspace.workspaceFolders;if(u){let a=y.Uri.joinPath(u[0].uri,r.file);y.commands.executeCommand("vscode.open",a)}}break;case"searchTicket":y.commands.executeCommand("ricwiz.searchTicket");break;case"manualRefresh":y.commands.executeCommand("ricwiz.manualRefresh");break;case"toggleAutoRefresh":y.commands.executeCommand("ricwiz.toggleAutoRefresh");break;case"openHistory":y.commands.executeCommand("ricwiz.openHistory");break}})}conflictState=null;setConflictState(e){this.conflictState=e,this.updateView()}updateBranch(e,i,n=[],r=[],u=[],a=[],p=""){this.webviewView&&(this.currentBranchCache=e,this.currentBranchIsMergedCache=i,this.relatedBranchesCache=n,this.commitsCache=r,this.baseBranchesCache=u,this.recentTicketsCache=a,this.ticketTitleCache=p,this.updateView())}currentBranchCache="";currentBranchIsMergedCache=!1;relatedBranchesCache=[];commitsCache=[];baseBranchesCache=[];recentTicketsCache=[];ticketTitleCache="";currentPage="main";blameDataCache=null;jiraDataCache=null;dashboardDataCache=null;autoRefreshEnabled=!0;setBlameData(e){this.blameDataCache=e}setJiraData(e){this.jiraDataCache=e}setDashboardData(e){this.dashboardDataCache=e}setAutoRefresh(e){this.autoRefreshEnabled=e,this.updateView()}isAutoRefreshEnabled(){return this.autoRefreshEnabled}setPage(e){this.currentPage=e,this.updateView()}updateView(){if(!this.webviewView)return;let e=this.webviewView.webview.asWebviewUri(y.Uri.joinPath(this._extensionUri,"resources","logo.png"));this.webviewView.webview.html=this._getHtmlForWebview(e,this.currentBranchCache,this.relatedBranchesCache,this.commitsCache,this.baseBranchesCache,this.recentTicketsCache,this.currentPage)}_getHtmlForWebview(e,i,n,r,u,a,p){let m=r.length>0?`
            <div class="separator"></div>
            <div style="padding: 0 4px;">
                <div style="font-size: 11px; opacity: 0.7; margin-bottom: 6px; display: flex; align-items: center; gap: 4px;">
                    <span>\u{1F4DC}</span> Recent Commits
                </div>
                <div style="display: flex; flex-direction: column; gap: 2px;">
                    ${r.map(o=>`
                        <div style="font-size: 11px; padding: 3px 4px; border-radius: 2px; display: flex; gap: 6px; align-items: baseline;">
                            <code style="color: var(--vscode-textLink-foreground); font-size: 10px; flex-shrink: 0;">${C(o.hash)}</code>
                            <span style="flex: 1; overflow: hidden; text-overflow: ellipsis; white-space: nowrap;" title="${C(o.message)}">${C(o.message)}</span>
                            <span style="font-size: 9px; opacity: 0.5; flex-shrink: 0;">${C(o.timeAgo)}</span>
                        </div>
                    `).join("")}
                </div>
            </div>
        `:"",l=`
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
        `;if(this.conflictState){let o=(this.conflictState.files||[]).map(s=>`
                <button class="btn" style="padding: 6px; font-size: 12px; display: flex; justify-content: space-between; align-items: center;" onclick="sendOpenFileCommand('${C(s.file)}')">
                    <span style="flex: 1; overflow: hidden; text-overflow: ellipsis; white-space: nowrap; direction: rtl; text-align: left;">&lrm;${C(s.file)}</span>
                    <span style="font-size: 10px; opacity: 0.8; flex-shrink: 0; background-color: var(--vscode-badge-background); color: var(--vscode-badge-foreground); padding: 2px 4px; border-radius: 2px;">${C(s.state)}</span>
                </button>
            `).join("");return`<!DOCTYPE html>
            <html lang="en">
            <head>
                <meta charset="UTF-8">
                <meta name="viewport" content="width=device-width, initial-scale=1.0">
                <title>Ricwiz Conflict</title>
                ${l}
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
                
                ${o?`
                    <div style="font-size: 11px; opacity: 0.7; margin: 8px 4px 4px 4px; text-transform: uppercase;">Conflicted Files</div>
                    <div style="display: flex; flex-direction: column; gap: 2px;">
                        ${o}
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
            </html>`}if(p==="blame"){let o=this.blameDataCache;return`<!DOCTYPE html>
            <html lang="en">
            <head>
                <meta charset="UTF-8">
                <meta name="viewport" content="width=device-width, initial-scale=1.0">
                <title>Ricwiz Blame</title>
                ${l}
            </head>
            <body>
                <div style="display: flex; align-items: center; gap: 8px; margin-bottom: 16px; margin-top: 8px;">
                    <button class="btn" style="width: auto; padding: 4px 8px; background-color: var(--vscode-button-secondaryBackground); color: var(--vscode-button-secondaryForeground);" onclick="sendCommand('openDevTools')">\u2190 Back</button>
                    <div style="font-weight: bold; font-size: 13px; flex: 1; text-align: center;">Who to Blame</div>
                </div>

                ${o?`
                <div style="padding: 12px; background: var(--vscode-editor-background); border: 1px solid var(--vscode-widget-border); border-radius: 6px; margin-bottom: 12px;">
                    <div style="font-weight: bold; margin-bottom: 12px; font-size: 14px; text-align: center; color: var(--vscode-textLink-foreground); word-break: break-all;">
                        \u{1F4C4} ${o.fileName}
                    </div>


                    <div style="margin-bottom: 20px;">
                        <div style="font-size: 11px; font-weight: bold; opacity: 0.8; text-transform: uppercase; margin-bottom: 8px;"><span class="icon">\u{1F4BB}</span> Local Git (Last Commits)</div>
                        <ul style="list-style-type: none; padding: 0; margin: 0; display: flex; flex-direction: column; gap: 8px;">
                            ${o.gitHistory&&o.gitHistory.length>0?o.gitHistory.map(s=>`
                                <li style="background: var(--vscode-editorWidget-background); border: 1px solid var(--vscode-widget-border); padding: 8px 10px; border-radius: 4px; border-left: 4px solid var(--vscode-gitDecoration-modifiedResourceForeground);">
                                    <div style="display: flex; justify-content: space-between; margin-bottom: 4px; align-items: center;">
                                        <strong style="font-size: 13px;">${s.author}</strong>
                                        <span style="opacity: 0.7; font-size: 11px;">${s.time}</span>
                                    </div>
                                    <div style="font-size: 12px; margin-bottom: 6px; opacity: 0.9; font-style: italic;">"${s.message}"</div>
                                    <div style="font-family: monospace; font-size: 10px; opacity: 0.6;">Commit: ${s.hash}</div>
                                </li>
                            `).join(""):'<li style="opacity:0.7; font-size: 12px;">No Git history found.</li>'}
                        </ul>
                    </div>

                    <div style="margin-bottom: 20px;">
                        <div style="font-size: 11px; font-weight: bold; opacity: 0.8; text-transform: uppercase; margin-bottom: 8px;"><span class="icon">\u2601\uFE0F</span> Salesforce Metadata</div>
                        <div style="display: flex; flex-direction: column; gap: 8px;">
                            <div style="background: var(--vscode-editorWidget-background); border: 1px solid var(--vscode-widget-border); padding: 8px 10px; border-radius: 4px; border-left: 4px solid var(--vscode-gitDecoration-addedResourceForeground);">
                                <div style="font-size: 10px; opacity: 0.7; text-transform: uppercase; margin-bottom: 2px;">Last Modified By</div>
                                <div style="font-weight: bold; font-size: 13px;">${o.sfAuthor}</div>
                                <div style="font-size: 11px; opacity: 0.7; margin-top: 2px;">${o.sfTime}</div>
                            </div>
                            ${o.sfCreatedBy!=="Unknown"&&o.sfCreatedBy!=="N/A"?`
                            <div style="background: var(--vscode-editorWidget-background); border: 1px solid var(--vscode-widget-border); padding: 8px 10px; border-radius: 4px; border-left: 4px solid var(--vscode-gitDecoration-addedResourceForeground);">
                                <div style="font-size: 10px; opacity: 0.7; text-transform: uppercase; margin-bottom: 2px;">Created By</div>
                                <div style="font-weight: bold; font-size: 13px;">${o.sfCreatedBy}</div>
                            </div>
                            `:""}
                        </div>
                    </div>

                    <div>
                        <div style="font-size: 11px; font-weight: bold; opacity: 0.8; text-transform: uppercase; margin-bottom: 8px;"><span class="icon">\u{1F575}\uFE0F</span> Setup Audit Trail (Recent)</div>
                        <ul style="list-style-type: none; padding: 0; margin: 0; display: flex; flex-direction: column; gap: 8px;">
                            ${o.auditHistory&&o.auditHistory.length>0?o.auditHistory.map(s=>`
                                <li style="background: var(--vscode-editorWidget-background); border: 1px solid var(--vscode-widget-border); padding: 8px 10px; border-radius: 4px; border-left: 4px solid var(--vscode-gitDecoration-untrackedResourceForeground);">
                                    <div style="display: flex; justify-content: space-between; margin-bottom: 4px; align-items: center;">
                                        <strong style="font-size: 13px;">${s.author}</strong>
                                        <span style="opacity: 0.7; font-size: 11px;">${s.time}</span>
                                    </div>
                                    <div style="font-size: 12px; font-weight: 500; margin-bottom: 4px;">${s.action}</div>
                                    <div style="font-size: 11px; opacity: 0.7; font-style: italic; background: var(--vscode-editor-background); padding: 4px; border-radius: 3px;">${s.display}</div>
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
            </html>`}if(p==="jira"){let o=this.jiraDataCache,s=o?.ticketId||"Jira",c=o?.summary||"No Title",d=o?.description||"No description provided.";return`<!DOCTYPE html>
            <html lang="en">
            <head>
                <meta charset="UTF-8">
                <meta name="viewport" content="width=device-width, initial-scale=1.0">
                <title>Ricwiz Jira Details</title>
                ${l}
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
                    <span style="font-weight: 600; font-size: 13px;">${s} Details</span>
                </div>
                
                <div class="card" style="padding: 16px;">
                    <div class="jira-title">${C(c)}</div>
                    <div class="jira-desc">${C(d)}</div>
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
                </script>
            </body>
            </html>`}if(p==="dashboard"){let o=this.dashboardDataCache||{queries:[],selectedIndex:0,results:[],error:null},s=o.queries.map((d,g)=>`
                <option value="${g}" ${g===o.selectedIndex?"selected":""}>${C(d.name)}</option>
            `).join(""),c=o.error?`
                <div style="color: var(--vscode-errorForeground); padding: 12px; text-align: center; background: var(--vscode-editorError-background); border-radius: 4px;">
                    \u26A0\uFE0F ${C(o.error)}
                </div>
            `:o.results.length===0?`
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
                        ${o.results.map(d=>`
                            <tr style="border-bottom: 1px solid var(--vscode-panel-border); cursor: pointer;" class="tr-hover" onclick="sendCommand('openJiraDetailsForId', '${C(d.key)}')">
                                <td style="padding: 6px; font-weight: bold; color: var(--vscode-textLink-foreground); white-space: nowrap;">${C(d.key)}</td>
                                <td style="padding: 6px; overflow: hidden; text-overflow: ellipsis; max-width: 150px; white-space: nowrap;" title="${C(d.summary)}">${C(d.summary)}</td>
                                <td style="padding: 6px; white-space: nowrap;">
                                    <span style="background: var(--vscode-badge-background); color: var(--vscode-badge-foreground); padding: 2px 4px; border-radius: 3px; font-size: 9px;">${C(d.status)}</span>
                                </td>
                                <td style="padding: 6px; white-space: nowrap; text-align: center;">
                                    ${d.branch?`
                                        <button class="icon-button" style="background-color: var(--vscode-button-secondaryBackground); color: var(--vscode-button-secondaryForeground); font-size: 10px; padding: 2px 6px;" title="Checkout ${C(d.branch)}" onclick="event.stopPropagation(); sendCommand('checkout', { branch: '${C(d.branch)}' })">
                                            \u{1F33F} Checkout
                                        </button>
                                    `:`
                                        <button class="icon-button" style="background-color: var(--vscode-button-background); color: var(--vscode-button-foreground); font-size: 10px; padding: 2px 6px;" title="Create Branch for ${C(d.key)}" onclick="event.stopPropagation(); sendCommand('createBranchForTicket', '${C(d.key)}')">
                                            \u2795 Create
                                        </button>
                                    `}
                                </td>
                            </tr>
                        `).join("")}
                    </tbody>
                </table>
            `;return`<!DOCTYPE html>
            <html lang="en">
            <head>
                <meta charset="UTF-8">
                <meta name="viewport" content="width=device-width, initial-scale=1.0">
                <title>Ricwiz Ticket Dashboard</title>
                ${l}
                <style>
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
                
                ${o.queries.length>0?`
                <div style="margin-bottom: 12px;">
                    <select id="querySelect" onchange="sendCommand('switchDashboardQuery', this.value)">
                        ${s}
                    </select>
                </div>
                `:`
                <div style="padding: 12px; opacity: 0.7; text-align: center;">No queries defined in settings.</div>
                `}

                <div style="background: var(--vscode-editor-background); border: 1px solid var(--vscode-panel-border); border-radius: 4px; overflow-x: auto; max-height: 400px; overflow-y: auto;">
                    ${c}
                </div>

                <script>
                    const vscode = acquireVsCodeApi();
                    function sendCommand(command, args) {
                        vscode.postMessage({ command, args });
                    }
                </script>
            </body>
            </html>`}return p==="devtools"?`<!DOCTYPE html>
            <html lang="en">
            <head>
                <meta charset="UTF-8">
                <meta name="viewport" content="width=device-width, initial-scale=1.0">
                <title>Ricwiz DevTools</title>
                ${l}
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
            </html>`:`<!DOCTYPE html>
        <html lang="en">
        <head>
            <meta charset="UTF-8">
            <meta name="viewport" content="width=device-width, initial-scale=1.0">
            <title>Ricwiz</title>
            ${l}
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

            ${i?`<div style="background-color: var(--vscode-editor-inactiveSelectionBackground); padding: 10px; border-radius: 6px; margin-bottom: 16px; border: 1px solid var(--vscode-panel-border); box-shadow: 0 2px 4px rgba(0,0,0,0.1);">
                    <div style="font-size: 10px; opacity: 0.7; margin-bottom: 4px; display: flex; align-items: center; justify-content: center; gap: 4px; text-transform: uppercase;">
                        Current Ticket / Branch
                        <button class="copy-btn" onclick="sendCommand('copyBranch')" title="Copy branch name to clipboard">\u{1F4CB}</button>
                    </div>
                    <div style="font-weight: bold; font-size: 14px; word-break: break-all; text-align: center; color: var(--vscode-textLink-foreground);">
                        ${C(i)} ${this.currentBranchIsMergedCache?'<span style="margin-left: 4px; background-color: var(--vscode-charts-green); color: white; border-radius: 3px; padding: 1px 4px; font-size: 10px; font-weight: bold;" title="Merged to target env">MERGED</span>':""}
                    </div>
                    ${this.ticketTitleCache?`<div style="font-size: 12px; margin-top: 6px; text-align: center; opacity: 0.9; font-style: italic;">${C(this.ticketTitleCache)}</div>`:""}
                    ${n.length>0?`
                        <div style="margin-top: 10px; border-top: 1px solid var(--vscode-panel-border); padding-top: 10px;">
                            <div style="font-size: 10px; opacity: 0.7; margin-bottom: 6px; text-transform: uppercase; text-align: center;">Sister Branches</div>
                            <div style="display: flex; flex-direction: column; gap: 4px;">
                                ${n.map(o=>{let s="";return o.pipelineStatus==="running"?s="\u23F3":o.pipelineStatus==="success"?s="\u2705":o.pipelineStatus==="failed"?s="\u274C":o.pipelineStatus==="canceled"?s="\u{1F6D1}":o.pipelineStatus==="skipped"&&(s="\u23ED\uFE0F"),`
                                    <div class="btn" style="padding: 4px 8px; font-size: 11px; display: flex; justify-content: space-between; align-items: center; background-color: var(--vscode-button-secondaryBackground); color: var(--vscode-button-secondaryForeground); border-radius: 4px;" onclick="sendCheckoutCommand('${C(o.name)}', this)" title="Checkout ${C(o.name)}">
                                        <div style="display: flex; align-items: center; gap: 4px; overflow: hidden;">
                                            <span style="overflow: hidden; text-overflow: ellipsis; white-space: nowrap; font-weight: bold;">${C(o.name)}</span>
                                            ${s?`<span title="Pipeline: ${o.pipelineStatus}" style="font-size: 10px;">${s}</span>`:""}
                                        </div>
                                        <div style="display: flex; gap: 4px; align-items: center;">
                                            ${o.mrUrl?`<a href="${o.mrUrl}" onclick="event.stopPropagation();" title="Open Merge Request" style="text-decoration: none; font-size: 10px;">\u{1F517}</a>`:""}
                                            ${o.isMerged?'<span style="background-color: var(--vscode-charts-green); color: white; border-radius: 3px; padding: 1px 4px; font-size: 9px; font-weight: bold;" title="Merged to target env">MERGED</span>':""}
                                        </div>
                                    </div>
                                    `}).join("")}
                            </div>
                        </div>
                    `:a.length>0?`
                        <div style="margin-top: 10px; border-top: 1px solid var(--vscode-panel-border); padding-top: 10px;">
                            <div style="font-size: 10px; opacity: 0.7; margin-bottom: 6px; text-transform: uppercase; text-align: center;">Recent Tickets</div>
                            <div style="display: flex; flex-direction: column; gap: 4px;">
                                ${a.map(o=>`
                                    <div class="btn" style="padding: 4px 8px; font-size: 11px; display: flex; align-items: center; background-color: var(--vscode-button-secondaryBackground); color: var(--vscode-button-secondaryForeground); border-radius: 4px;" onclick="sendCheckoutCommand('${C(o)}', this)" title="Checkout ${C(o)}">
                                        <span style="font-weight: bold;">${C(o)}</span>
                                    </div>
                                `).join("")}
                            </div>
                        </div>
                    `:""}
                    <div style="display: flex; gap: 6px; margin-top: 10px; justify-content: center;">
                        <button class="btn" style="width: auto; padding: 4px 8px; font-size: 11px; background-color: var(--vscode-button-secondaryBackground); border-radius: 4px;" onclick="sendCommand('searchTicket')" title="Search branches by ticket number">
                            <span class="icon" style="font-size: 12px; margin-right: 4px;">\u{1F50D}</span> Search
                        </button>
                        <button class="btn" style="width: auto; padding: 4px 8px; font-size: 11px; background-color: var(--vscode-button-secondaryBackground); border-radius: 4px;" onclick="sendCommand('openHistory')" title="View recent branches history">
                            <span class="icon" style="font-size: 12px; margin-right: 4px;">\u{1F570}\uFE0F</span> History
                        </button>
                    </div>
                </div>`:""}

            ${u.length>0?`
                <div style="display: flex; gap: 4px; margin-bottom: 16px; flex-wrap: wrap; justify-content: center;">
                    ${u.map(o=>`
                        <button class="btn" style="flex: 1; min-width: 25%; justify-content: center; padding: 6px 4px; font-size: 10px; font-weight: bold; background-color: var(--vscode-button-secondaryBackground); color: var(--vscode-button-secondaryForeground); border-radius: 4px;" onclick="sendCheckoutCommand('${C(o)}', this)" title="Checkout ${C(o)}">
                            ${C(o.toUpperCase())}
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

                <div style="display: flex; gap: 4px;">
                    <button class="btn" style="flex: 1; background-color: var(--vscode-button-secondaryBackground); border-radius: 4px;" title="Open Jira Ticket in Browser" onclick="sendCommand('openJira')">
                        <span class="icon">\u{1F3AB}</span> Open Jira
                    </button>
                    <button class="btn" style="width: auto; padding: 6px 12px; font-weight: bold; justify-content: center; background-color: var(--vscode-button-secondaryBackground); border-radius: 4px;" title="View Jira Details in Ricwiz" onclick="sendCommand('showJiraDetails')">
                        Details
                    </button>
                </div>

                <button class="btn" style="background-color: var(--vscode-button-secondaryBackground); margin-top: 6px; border-radius: 4px;" title="View Jira Tickets Dashboard" onclick="sendCommand('openDashboard')">
                    <span class="icon">\u{1F4CA}</span> Ticket Dashboard
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
        </html>`}}});function it(t){se=t.secrets}async function st(t){if(!se)throw new Error("SecretStorage is not initialized.");await se.store("ricwiz.jiraApiToken",t)}async function nt(){if(!se)throw new Error("SecretStorage is not initialized.");return await se.get("ricwiz.jiraApiToken")}async function rt(t){if(!se)throw new Error("SecretStorage is not initialized.");await se.store("ricwiz.gitlabApiToken",t)}async function Ve(){if(!se)throw new Error("SecretStorage is not initialized.");return await se.get("ricwiz.gitlabApiToken")}var se,ye=k(()=>{"use strict"});var Fe={};et(Fe,{checkBranchExists:()=>me,exec:()=>f,extractTicketSuggestion:()=>lt,getCurrentBranch:()=>D,getWorkspaceCwd:()=>b,normalizeTicketId:()=>mt,promptForTicketId:()=>N,resolvePrefix:()=>dt,ricwizLogger:()=>M});function b(){let t=xe.workspace.workspaceFolders;if(t)return t[0].uri.fsPath}async function D(t){try{let{stdout:e}=await f("git branch --show-current",{cwd:t});return e.trim()}catch{return""}}function dt(t,e){if(!t.includes(e)){let i=t.match(/([A-Z]+-)\d+/i);if(i)return i[1].toUpperCase()}return e}function lt(t,e,i=!1){let n=t.match(new RegExp(`(${e}\\d+)`,"i"));return n?n[1].toUpperCase():t.includes(e)&&!t.includes("-to-")?t.substring(t.indexOf(e)):i&&t.includes("-to-")?t.substring(t.indexOf(e)).split("-to-")[0]:""}function mt(t,e){let i=t.trim();return/^\d/.test(i)?`${e}${i}`.toUpperCase():i.toUpperCase()}async function N(t,e){let i=xe.workspace.getConfiguration("ricwiz"),n=e?.prefix??i.get("ticketPrefix","SFPSCA-"),r=await D(t),u=dt(r,n),a=e?.suggestedValue??lt(r,u,e?.handleToSuffix),p=await xe.window.showInputBox({prompt:e?.prompt||"Enter the full ticket ID (e.g., SCPSCA-1234) or just the number",placeHolder:e?.placeHolder||"Ticket ID or number",value:a});return p?{ticketId:mt(p,u),currentBranch:r,prefix:u}:void 0}async function me(t,e){try{return await f(`git show-ref --verify --quiet refs/heads/${e}`,{cwd:t}),!0}catch{}try{return await f(`git show-ref --verify --quiet refs/remotes/origin/${e}`,{cwd:t}),!0}catch{}return!1}var xe,at,ct,Xo,M,f,R=k(()=>{"use strict";xe=v(require("vscode")),at=v(require("child_process")),ct=v(require("util")),Xo=ct.promisify(at.exec),M=xe.window.createOutputChannel("Ricwiz"),f=async(t,e)=>{M.appendLine(`[EXEC] ${t}`);let i=await Xo(t,{maxBuffer:50*1024*1024,...e});return{stdout:i.stdout.toString(),stderr:i.stderr.toString()}}});async function ut(){let t=b();if(!t){U.window.showErrorMessage("Ricwiz: Open a workspace that is a Git repository.");return}let i=U.workspace.getConfiguration("ricwiz").get("ticketSourceBranch","main");await U.window.withProgress({location:U.ProgressLocation.Notification,title:`Ricwiz: Finding deleted files compared to origin/${i}...`,cancellable:!1},async()=>{try{let{stdout:n}=await f(`git diff --name-only --diff-filter=D origin/${i}...HEAD`,{cwd:t}),r=n.split(`
`).map(c=>c.trim()).filter(c=>c.length>0);if(r.length===0){U.window.showInformationMessage(`Ricwiz: No deleted files found compared to origin/${i}.`);return}let u={},a=(c,d)=>{u[c]||(u[c]=[]),u[c].includes(d)||u[c].push(d)};for(let c of r){let d=c.replace(/\\/g,"/");if(d.includes("/classes/")){let g=d.match(/\/classes\/([^/.]+)\.cls/);g&&a("ApexClass",g[1])}else if(d.includes("/triggers/")){let g=d.match(/\/triggers\/([^/.]+)\.trigger/);g&&a("ApexTrigger",g[1])}else if(d.includes("/lwc/")){let g=d.match(/\/lwc\/([^/]+)\//);g&&a("LightningComponentBundle",g[1])}else if(d.includes("/aura/")){let g=d.match(/\/aura\/([^/]+)\//);g&&a("AuraDefinitionBundle",g[1])}else if(d.includes("/objects/")&&d.includes("/fields/")){let g=d.match(/\/objects\/([^/]+)\//),h=d.match(/\/fields\/([^/.]+)\.field/);g&&h&&a("CustomField",`${g[1]}.${h[1]}`)}else if(d.includes("/objects/")){let g=d.match(/\/objects\/([^/.]+)\.object/);g&&a("CustomObject",g[1])}else if(d.includes("/layouts/")){let g=d.match(/\/layouts\/([^/.]+)\.layout/);g&&a("Layout",g[1])}else if(d.includes("/flows/")){let g=d.match(/\/flows\/([^/.]+)\.flow/);g&&a("Flow",g[1])}else if(d.includes("/permissionsets/")){let g=d.match(/\/permissionsets\/([^/.]+)\.permissionset/);g&&a("PermissionSet",g[1])}else if(d.includes("/profiles/")){let g=d.match(/\/profiles\/([^/.]+)\.profile/);g&&a("Profile",g[1])}else if(d.includes("/customMetadata/")){let g=d.match(/\/customMetadata\/([^/.]+)\.md/);g&&a("CustomMetadata",g[1])}else if(d.includes("/flexipages/")){let g=d.match(/\/flexipages\/([^/.]+)\.flexipage/);g&&a("FlexiPage",g[1])}}if(Object.keys(u).length===0){U.window.showInformationMessage("Ricwiz: Found deleted files in Git, but none mapped to recognizable Salesforce metadata.");return}let p=`<?xml version="1.0" encoding="UTF-8"?>
<Package xmlns="http://soap.sforce.com/2006/04/metadata">
`;for(let c of Object.keys(u).sort()){p+=`    <types>
`;for(let d of u[c].sort())p+=`        <members>${d}</members>
`;p+=`        <name>${c}</name>
    </types>
`}p+=`    <version>58.0</version>
</Package>`;let m=Oe.join(t,"destructiveChanges");ue.existsSync(m)||ue.mkdirSync(m);let l=Oe.join(m,"destructiveChanges.xml"),o=Oe.join(m,"package.xml");ue.writeFileSync(l,p,"utf8"),ue.existsSync(o)||ue.writeFileSync(o,`<?xml version="1.0" encoding="UTF-8"?>
<Package xmlns="http://soap.sforce.com/2006/04/metadata">
    <version>58.0</version>
</Package>`,"utf8");let s=await U.workspace.openTextDocument(l);await U.window.showTextDocument(s),U.window.showInformationMessage("Ricwiz: destructiveChanges.xml generated successfully!")}catch(n){U.window.showErrorMessage(`Ricwiz: Error generating destructive changes: ${n.message}`)}})}var U,Oe,ue,pt=k(()=>{"use strict";U=v(require("vscode")),Oe=v(require("path")),ue=v(require("fs"));R()});async function gt(){let t=b();if(!t)return;let i=ee.workspace.getConfiguration("ricwiz").get("ticketSourceBranch","main");await ee.window.withProgress({location:ee.ProgressLocation.Notification,title:"Ricwiz: Finding Apex Tests to run...",cancellable:!1},async()=>{try{let{stdout:n}=await f(`git diff --name-status origin/${i}...HEAD`,{cwd:t}),r=n.split(`
`).map(c=>c.trim()).filter(c=>c.length>0),u=new Set,a=new Set;for(let c of r){let d=c.split(/\s+/);if(d[0].startsWith("D"))continue;let g=d[1];if(g&&g.endsWith(".cls")){let h=g.match(/\/classes\/([^/.]+)\.cls/);if(h){let w=h[1];w.toLowerCase().endsWith("test")?u.add(w):a.add(w)}}}for(let c of a)u.add(`${c}Test`);if(u.size===0){ee.window.showInformationMessage("Ricwiz: No Apex Classes were modified in this branch.");return}let p=Array.from(u).map(c=>({label:`$(beaker) ${c}`,description:"Apex Test Class"})),m=await ee.window.showQuickPick(p,{canPickMany:!0,title:"Select Test Classes to Run",placeHolder:"Select tests..."});if(!m||m.length===0)return;let o=`sf apex run test -n ${m.map(c=>c.label.replace("$(beaker) ","").trim()).join(",")} -r human -w 30`,s=ee.window.createTerminal("Ricwiz: Smart Tests");s.show(),s.sendText(o)}catch(n){ee.window.showErrorMessage(`Ricwiz: Error finding tests: ${n.message}`)}})}var ee,ft=k(()=>{"use strict";ee=v(require("vscode"));R()});var he,ht=k(()=>{"use strict";he=class{static isValidShellArg(e){return e?/^[a-zA-Z0-9\-_/.]+$/.test(e):!1}}});var Re,wt,Ne,A,ne=k(()=>{"use strict";Re=v(require("vscode")),wt=v(require("path")),Ne=v(require("fs")),A=class t{style;upstreamRemote;originRemote;ticketSourceBranch;ticketPrefix;environments;static baseConfig=Re.workspace.getConfiguration("ricwiz");activeProfile;profileName;constructor(e){this.activeProfile=e,this.profileName=e?.name;let i=t.baseConfig;this.style=e?.workflowStyle||i.get("workflowStyle","standard"),this.style==="multi-remote"?(this.upstreamRemote=e?.upstreamRemote||i.get("upstreamRemote","salesforce-master"),this.originRemote=e?.originRemote||i.get("originRemote","origin")):(this.upstreamRemote="origin",this.originRemote="origin"),this.ticketSourceBranch=e?.ticketSourceBranch||i.get("ticketSourceBranch","main"),this.ticketPrefix=e?.ticketPrefix||i.get("ticketPrefix","SFPSCA-");let n=[{name:"Qual",sourceBranch:"quality"},{name:"Val",sourceBranch:"validation"},{name:"Prod",sourceBranch:"main"}];this.environments=e?.environments||i.get("environments",n)}getConfig(e,i){return this.activeProfile&&this.activeProfile[e]!==void 0?this.activeProfile[e]:t.baseConfig.get(e,i)}static async initialize(e,i){let n=t.baseConfig.get("profiles",[]),r=wt.join(e,"ricwiz.json");if(Ne.existsSync(r))try{let u=Ne.readFileSync(r,"utf-8"),a=JSON.parse(u);a&&Array.isArray(a.profiles)&&(n=[...n,...a.profiles])}catch(u){Re.window.showErrorMessage(`Ricwiz: Error parsing ricwiz.json: ${u.message}`)}if(n.length>0){if(!i?.forcePrompt)try{let{exec:m}=(R(),fe(Fe)),{stdout:l}=await m("git branch --show-current",{cwd:e}),o=l.trim(),s=o;o.includes("-to-")&&(s=o.split("-to-")[0]);let{stdout:c}=await m(`git config branch.${s}.ricwiz-profile`,{cwd:e}),d=c.trim();if(d){let g=n.find(h=>h.name===d);if(g)return new t(g)}}catch{}let u=n.map(m=>m.name),a=await Re.window.showQuickPick(u,{placeHolder:"Ricwiz: Select Workflow Profile",ignoreFocusOut:!0});if(!a)return;let p=n.find(m=>m.name===a);return new t(p)}return new t}buildUpstreamPath(e){return e.includes("/")?e:`${this.upstreamRemote}/${e}`}getFetchRemote(e){return e.includes("/")?e.split("/")[0]:this.upstreamRemote}getFetchBranch(e){return e.includes("/")?e.substring(e.indexOf("/")+1):e}}});async function vt(t){let e=b();if(!e){B.window.showErrorMessage("Open a folder or workspace that is a Git repository.");return}let i=await A.initialize(e,{forcePrompt:!0});if(!i)return;let n=typeof t=="string"?t:void 0,r=await N(e,{prefix:i.ticketPrefix,suggestedValue:n});if(!r){B.window.showErrorMessage("Branch creation cancelled: Ticket not provided.");return}let{ticketId:u}=r,a=i.environments,p="all",m=[{label:"Create Main Branch & Environments",description:"Creates the main ticket branch and all environment branches",value:"all"},{label:"Create Main Branch Only",description:"Creates only the main ticket branch (skips environments)",value:"mainOnly"},{label:"Create Environments Only",description:"Creates only the environment branches (skip main branch)",value:"envs"}];if(a.length>0){let s=await B.window.showQuickPick(m,{placeHolder:"Ricwiz: What do you want to create?",ignoreFocusOut:!0});if(!s)return;p=s.value}let l=i.ticketSourceBranch;if(p==="all"||p==="mainOnly"){let s=[];try{let{stdout:h}=await f('git branch --all --format="%(refname:short)"',{cwd:e});s=h.split(`
`).map(w=>w.trim()).filter(w=>w&&w!=="origin"),s=[...new Set(s)]}catch{}let c=B.window.createQuickPick();c.title="Ricwiz: Ticket Source Branch",c.placeholder="Confirm or change the source branch for this ticket",c.value=i.ticketSourceBranch,c.ignoreFocusOut=!0;let d=()=>{let h=c.value.trim(),w=[];h&&w.push({label:h,description:"Use typed branch"}),w.push(...s.map(z=>({label:z}))),c.items=w};c.onDidChangeValue(d),d();let g=await new Promise(h=>{c.onDidAccept(()=>{let w=c.selectedItems[0];h(w?w.label:c.value),c.hide()}),c.onDidHide(()=>h(void 0)),c.show()});if(!g){B.window.showInformationMessage("Branch creation cancelled.");return}l=g.trim()}let o=u;if(!he.isValidShellArg(o)){B.window.showErrorMessage(`Invalid format for ticket ID: ${o}`);return}if(!he.isValidShellArg(l)){B.window.showErrorMessage(`Invalid format for ticketSourceBranch in settings: ${l}`);return}for(let s of a){if(!he.isValidShellArg(s.name)){B.window.showErrorMessage(`Invalid format for environment name in settings: ${s.name}`);return}if(!he.isValidShellArg(s.sourceBranch)){B.window.showErrorMessage(`Invalid format for environment sourceBranch in settings: ${s.sourceBranch}`);return}}try{await f("git status",{cwd:e})}catch{B.window.showErrorMessage("The opened folder does not appear to be a valid Git repository.");return}try{await B.window.withProgress({location:B.ProgressLocation.Notification,title:"Ricwiz: Creating Branches",cancellable:!1},async s=>{let c=[];s.report({message:"Checking remote status (git fetch)...",increment:10});try{await f("git fetch",{cwd:e})}catch{}try{if(p==="all"||p==="mainOnly"){if(s.report({message:`Creating main branch ${o}...`,increment:10}),await me(e,o))B.window.showInformationMessage(`Ricwiz: The branch ${o} already exists. Skipping creation...`),await f(`git checkout ${o}`,{cwd:e});else try{let d=i.getFetchRemote(l),g=i.getFetchBranch(l),h=i.buildUpstreamPath(l);await f(`git fetch ${d} ${g}`,{cwd:e}),await f(`git checkout -b ${o} ${h}`,{cwd:e}),c.push(o)}catch{try{await f(`git checkout -b ${o} ${l}`,{cwd:e}),c.push(o)}catch{throw new Error(`Could not create main branch '${o}' from '${l}'. Does the source branch exist?`)}}try{await f(`git config branch.${o}.ricwiz-source "${l}"`,{cwd:e}),i.profileName&&await f(`git config branch.${o}.ricwiz-profile "${i.profileName}"`,{cwd:e})}catch{}}if(p==="all"||p==="envs"){let d=50/(a.length||1);for(let g of a){let h=`${u}-to-${g.name}`,w=g.sourceBranch;if(s.report({message:`Processing environment branch ${h}...`,increment:d}),!await me(e,h))try{let z=i.buildUpstreamPath(w);await f(`git checkout -b ${h} ${z}`,{cwd:e}),c.push(h)}catch{try{await f(`git checkout -b ${h} ${w}`,{cwd:e}),c.push(h)}catch{throw new Error(`Could not create environment branch '${h}' from '${w}'. Does the source branch exist?`)}}}}s.report({message:`Publishing branches to ${i.originRemote}...`,increment:10});for(let d of c)try{await f(`git push -u ${i.originRemote} ${d}`,{cwd:e})}catch{B.window.showWarningMessage(`Ricwiz: Branch ${d} was created locally but could not be pushed to ${i.originRemote}.`)}if(p==="all"||p==="mainOnly"){s.report({message:`Switching to ${o}...`,increment:10});try{await f(`git checkout ${o}`,{cwd:e})}catch{}}s.report({increment:100}),B.window.showInformationMessage("Ricwiz: All set! You can start working on your branches! \u{1F680}")}catch(d){if(B.window.showErrorMessage(`Ricwiz Branch Creation Failed: ${d.message}`),c.length>0){try{await f(`git checkout ${l}`,{cwd:e})}catch{}for(let g of c)try{await f(`git branch -D ${g}`,{cwd:e})}catch{}B.window.showWarningMessage(`Ricwiz: Rolled back (deleted) ${c.length} branch(es) locally due to failure.`)}}})}catch(s){B.window.showErrorMessage(`Ricwiz general error: ${s.message}`)}}var B,bt=k(()=>{"use strict";B=v(require("vscode"));R();ht();ne()});async function we(t,e,i,n){n&&n.report({message:"CONFLICT! Resolve & click 'Commit & Continue' in Ricwiz panel."});let r=!1,u=!1,a=async()=>{try{let{stdout:o}=await f("git status --porcelain",{cwd:t});return o.split(`
`).filter(s=>{let c=s.substring(0,2);return["UD","DU","DD","AU","UA"].includes(c)}).map(s=>s.substring(3).trim())}catch{return[]}},p=async()=>{try{let{stdout:o}=await f("git status --porcelain",{cwd:t}),s=c=>c==="UU"?"Both Modified":c==="UD"?"Deleted by them":c==="DU"?"Deleted by us":c==="DD"?"Both Deleted":c==="AA"?"Both Added":c==="AU"?"Added by us":c==="UA"?"Added by them":"Conflicted";return o.split(`
`).map(c=>c.trimRight()).filter(c=>c.length>2).filter(c=>{let d=c.substring(0,2);return["UU","AA","UD","DU","AU","UA","DD"].includes(d)}).map(c=>{let d=c.substring(0,2);return{file:c.substring(3).trim(),state:s(d)}})}catch{return[]}},m=async()=>{if(r)return;let o=await a(),s=await p(),{webviewProvider:c}=(je(),fe(Ue));c&&c.setConflictState({isConflict:!0,sourceStr:e,targetStr:i,deletionsCount:o.length,files:s})},l=te.commands.registerCommand("ricwiz.conflictAction",async o=>{if(o==="abortDeploy")u=!0;else if(o==="resolveDeletions"){try{let c=(await a()).map(g=>({label:g})),d=await te.window.showQuickPick(c,{canPickMany:!0,placeHolder:"Select conflicted files to DELETE",title:"Ricwiz: Delete Conflicted Files"});if(d&&d.length>0){for(let g of d)try{await f(`git rm --force "${g.label}"`,{cwd:t})}catch{}te.window.showInformationMessage(`Ricwiz: Deleted ${d.length} conflicted file(s).`)}}catch(s){te.window.showErrorMessage(`Ricwiz: Error. (${s.message})`)}m()}else if(o==="commitAndContinue")try{let c=(await a()).filter(g=>yt.existsSync(xt.join(t,g)));if(c.length>0&&await te.window.showWarningMessage(`Wait! There are ${c.length} file(s) with deletion conflicts that are still on your disk.

If you commit now, you will KEEP them in the project.

Are you sure you want to KEEP them?`,{modal:!0},"Yes, KEEP them","No, let me DELETE them")!=="Yes, KEEP them"){m();return}let d=!1;try{let{stdout:g}=await f('git grep -E "^<<<<<<< "',{cwd:t});g.trim().length>0&&(d=!0)}catch{}if(d){te.window.showErrorMessage("Ricwiz: You still have unresolved conflict markers (<<<<<<<) in your files. Please resolve them first!"),m();return}await f("git add .",{cwd:t}),await f("git commit --no-edit",{cwd:t})}catch(s){te.window.showErrorMessage(`Ricwiz: Could not commit automatically. (${s.message})`),m()}});for(m();;){if(u){r=!0,l.dispose(),(je(),fe(Ue)).webviewProvider?.setConflictState(null);try{await f("git merge --abort",{cwd:t})}catch{}return!1}try{let{stdout:o}=await f("git status --porcelain",{cwd:t});if(o.trim().length===0)return r=!0,l.dispose(),(je(),fe(Ue)).webviewProvider?.setConflictState(null),te.window.showInformationMessage("Ricwiz: Changes committed!"),!0}catch{}await new Promise(o=>setTimeout(o,2e3))}}var te,yt,xt,Je=k(()=>{"use strict";te=v(require("vscode")),yt=v(require("fs")),xt=v(require("path"));R()});async function kt(){let t=b();if(!t){F.window.showErrorMessage("Ricwiz: Open a folder or workspace that is a Git repository.");return}try{await f("git status",{cwd:t})}catch{F.window.showErrorMessage("Ricwiz: The opened folder does not appear to be a valid Git repository.");return}let e=await A.initialize(t);if(!e)return;let i=e.environments,n=await N(t,{prefix:e.ticketPrefix});if(!n){F.window.showErrorMessage("Operation cancelled: Ticket not provided.");return}let{ticketId:r,currentBranch:u}=n,a=r;if(!await me(t,a)){F.window.showErrorMessage(`Ricwiz: Main branch '${a}' does not exist! Prepare deploy is only available when a main ticket branch is used.`);return}let p=e.getConfig("defaultReviewers",""),m="";try{let{stdout:l}=await f(`git config branch.${r}.ricwiz-reviewers`,{cwd:t});m=l.trim()}catch{}if(p.trim()){let l=await F.window.showInputBox({prompt:"Ricwiz: Reviewers for this deploy (optional, comma-separated)",placeHolder:"e.g. @joao, 123456",value:m||p,ignoreFocusOut:!0});if(l===void 0)return;try{l.trim()?await f(`git config branch.${r}.ricwiz-reviewers "${l.trim()}"`,{cwd:t}):m&&await f(`git config --unset branch.${r}.ricwiz-reviewers`,{cwd:t})}catch{}}await F.window.withProgress({location:F.ProgressLocation.Notification,title:"Ricwiz: Preparing Deploy",cancellable:!0},async(l,o)=>{let s=0,c=u,d=!1;o.onCancellationRequested(()=>{d=!0}),l.report({message:"Syncing remote information...",increment:10});try{await f("git fetch --all",{cwd:t});let h=10/(i.length||1);for(let w of i)try{if(d)throw new Error("Aborted");l.report({message:`Fetching ${w.sourceBranch}...`,increment:h});let z=e.getFetchRemote(w.sourceBranch),S=e.getFetchBranch(w.sourceBranch);await f(`git fetch ${z} ${S}:${S}`,{cwd:t})}catch{}}catch{}let g=60/(i.length||1);for(let h of i){if(d)break;let w=`${r}-to-${h.name}`,z=h.sourceBranch;try{l.report({message:`Processing ${w}...`,increment:g/4}),await f(`git checkout ${w}`,{cwd:t});try{await f(`git pull ${e.originRemote} ${w}`,{cwd:t})}catch{}let S=async X=>{try{await f(`git merge ${X}`,{cwd:t})}catch(P){let L=!1;try{let{stdout:J}=await f("git ls-files -u",{cwd:t});J.trim().length>0&&(L=!0)}catch{}let j=((P.stdout||"")+(P.stderr||"")+(P.message||"")).toLowerCase();if(L||j.includes("conflict")||j.includes("conflit")){if(!await we(t,X,w,l))throw d=!0,new Error("Deploy aborted by user.")}else throw P}};l.report({message:`Merging ${z} into ${w}...`,increment:g/4});let de=e.getFetchRemote(z),pe=e.getFetchBranch(z),ge=e.buildUpstreamPath(z);if(await f(`git fetch ${de} ${pe}`,{cwd:t}),await S(ge),l.report({message:`Merging ${a} into ${w}...`,increment:g/4}),await S(a),d)break;l.report({message:`Pushing ${w}...`,increment:g/4}),await f(`git push ${e.originRemote} ${w}`,{cwd:t}),s++}catch(S){S.message.includes("aborted")?F.window.showInformationMessage("Ricwiz: Deploy cancelled."):F.window.showErrorMessage(`Ricwiz: Failed to process branch ${w}. Detail: ${S.message}`);return}}if(!d){l.report({message:"Finishing up...",increment:10});let h=c;try{await f(`git show-ref --verify --quiet refs/heads/${a}`,{cwd:t}),h=a}catch{}try{let w=await D(t);h&&h!==w?(await f(`git checkout ${h}`,{cwd:t}),F.window.showInformationMessage(`Ricwiz: Operation complete. Back on branch ${h}.`)):F.window.showInformationMessage("Ricwiz: Operation complete.")}catch{F.window.showInformationMessage("Ricwiz: Operation complete.")}}})}var F,Ct=k(()=>{"use strict";F=v(require("vscode"));R();Je();ne()});async function $t(t=!1){let e=b();if(!e)return;let i=await A.initialize(e);if(!i)return;let n=await N(e,{prompt:"Enter the full ticket ID for the Merge Requests (e.g., SCPSCA-1234) or just the number"});if(!n)return;let{ticketId:r}=n,a=Q.workspace.getConfiguration("ricwiz").get("gitlabUrlOverride",""),p="";if(a&&a.trim()!=="")p=a.trim();else{let o="";try{let{stdout:s}=await f("git remote get-url origin",{cwd:e});o=s.trim()}catch{Q.window.showErrorMessage("Ricwiz: Could not get the remote origin URL. Please configure the URL manually in the extension settings.");return}p=o,p.endsWith(".git")&&(p=p.slice(0,-4)),p.startsWith("git@")&&(p=p.replace("git@","").replace(":","/"),p=`https://${p}`)}let m=[],l=i.ticketSourceBranch;try{let{stdout:o}=await f(`git config branch.${r}.ricwiz-source`,{cwd:e});o.trim()&&(l=o.trim())}catch{}if(i.environments.length===0)m.push({source:r,target:l});else for(let o of i.environments)m.push({source:`${r}-to-${o.name}`,target:o.sourceBranch});for(let o of m){let s=`${p}/-/merge_requests/new?merge_request[source_branch]=${o.source}&merge_request[target_branch]=${o.target}`;t?Q.commands.executeCommand("simpleBrowser.show",s):Q.env.openExternal(Q.Uri.parse(s))}Q.window.showInformationMessage(`Ricwiz: Opening ${t?"VS Code browser":"external browser"} for Merge Requests!`)}async function zt(){return $t(!1)}async function Rt(){return $t(!0)}var Q,St=k(()=>{"use strict";Q=v(require("vscode"));R();ne()});async function Pt(t=!1){let e=b();if(!e)return;let i=Y.workspace.getConfiguration("ricwiz"),n=i.get("jiraUrl","");if(!n||n.trim()===""){Y.window.showErrorMessage("Ricwiz: Jira URL is not configured. Please set it in the extension settings (e.g., https://jira.company.com/browse/).");return}let{getCurrentBranch:r,resolvePrefix:u,extractTicketSuggestion:a}=(R(),fe(Fe)),p=await r(e),m=i.get("ticketPrefix","SFPSCA-"),l=u(p,m),s=a(p,l,!0);if(s){let{normalizeTicketId:d}=(R(),fe(Fe));s=d(s,l)}else{let d=await N(e,{prompt:"Ricwiz could not detect the ticket from the branch name. Enter Jira ticket ID (e.g. SFPSCA-1234)",handleToSuffix:!0});if(!d)return;s=d.ticketId}let c=n.trim();c.endsWith("/")||(c+="/"),c+=s,t?Y.commands.executeCommand("simpleBrowser.show",c):Y.env.openExternal(Y.Uri.parse(c)),Y.window.showInformationMessage(`Ricwiz: Opening Jira Ticket ${s} in ${t?"VS Code":"browser"}!`)}async function Bt(){return Pt(!1)}async function Tt(){return Pt(!0)}var Y,Et=k(()=>{"use strict";Y=v(require("vscode"));R()});async function ei(){let t=Dt.workspace.getConfiguration("ricwiz"),e=t.get("jiraUrl",""),i=t.get("jiraEmail","")?.trim(),n=(await nt())?.trim();if(!e||!n)throw new Error('Jira API Token is not securely configured. Please run the "Ricwiz: Set Secure Jira API Token" command.');let r=e;r.includes("/browse")&&(r=r.split("/browse")[0]),r.endsWith("/")&&(r=r.slice(0,-1));let u=i?`Basic ${Buffer.from(`${i}:${n}`).toString("base64")}`:`Bearer ${n}`;return{baseUrl:r,headerAuth:u}}async function ke(t,e,i){let{baseUrl:n,headerAuth:r}=await ei(),u=new URL(`${n}${e}`);return new Promise((a,p)=>{let m=Mt.request(u,{method:t,headers:{Authorization:r,Accept:"application/json",...i?{"Content-Type":"application/json"}:{}}},l=>{let o="";l.on("data",s=>o+=s),l.on("end",()=>{if(l.statusCode===401||l.statusCode===403)return p(new Error(`Authentication failed (HTTP ${l.statusCode}). Please check your Jira settings.`));if(l.statusCode&&l.statusCode>=400){let s="";try{let c=JSON.parse(o);c.errorMessages&&c.errorMessages.length>0&&(s=c.errorMessages.join(", "))}catch{}return l.statusCode===404||l.statusCode===410?p(new Error(`Ticket not found or deleted (HTTP ${l.statusCode}). ${s}`)):p(new Error(`Jira API returned HTTP status ${l.statusCode}. ${s}`))}if(!o)return a({});try{let s=JSON.parse(o);a(s)}catch{p(new Error("Failed to parse Jira response."))}})});m.on("error",l=>p(new Error(`Network error: ${l.message}`))),i&&m.write(JSON.stringify(i)),m.end()})}async function Ce(t){let e=await ke("GET",`/rest/api/2/issue/${t}`);return e&&e.fields?{summary:e.fields.summary||"",description:e.fields.description||"No description provided."}:null}async function At(t){let e=await ke("GET",`/rest/api/2/issue/${t}/transitions`);return e&&e.transitions?e.transitions.map(i=>({id:i.id,name:i.name})):[]}async function It(t,e){await ke("POST",`/rest/api/2/issue/${t}/transitions`,{transition:{id:e}})}async function Lt(t,e){await ke("POST",`/rest/api/2/issue/${t}/comment`,{body:e})}async function Ft(t,e){await ke("PUT",`/rest/api/2/issue/${t}`,{update:{labels:[{add:e}]}})}async function Ot(t){let e=await ke("POST","/rest/api/3/search/jql",{jql:t,maxResults:50,fields:["summary","status","assignee"]});return e&&e.issues?e.issues.map(i=>({key:i.key,summary:i.fields?.summary||"No Title",status:i.fields?.status?.name||"Unknown",assignee:i.fields?.assignee?.displayName||"Unassigned"})):[]}var Mt,Dt,Se=k(()=>{"use strict";Mt=v(require("https")),Dt=v(require("vscode"));ye()});async function Nt(t){let e=b();if(e)try{if(!await A.initialize(e))return;let r=(await D(e)).split("-to-")[0];if(!r){oe.window.showErrorMessage("Ricwiz: You are not currently on a valid ticket branch.");return}await oe.window.withProgress({location:oe.ProgressLocation.Notification,title:`Fetching details for ${r}...`,cancellable:!1},async u=>{let a=await Ce(r);a?(t.setJiraData({ticketId:r,...a}),t.setPage("jira")):oe.window.showErrorMessage("Ricwiz: No data found for this ticket.")})}catch(i){i.message.includes("securely configured")?await oe.window.showErrorMessage(i.message,"Set Token Now")==="Set Token Now"&&oe.commands.executeCommand("ricwiz.setJiraToken"):oe.window.showErrorMessage(`Ricwiz Jira Error: ${i.message}`)}}var oe,Ut=k(()=>{"use strict";oe=v(require("vscode"));R();ne();Se()});async function jt(t,e){let n=re.workspace.getConfiguration("ricwiz").get("jiraDashboards",[]);if(e!==void 0&&(ve=e),!n||n.length===0){t.setDashboardData({queries:[],selectedIndex:0,results:[],error:"No queries defined in settings. Go to Settings > Ricwiz > Jira Dashboards."}),t.setPage("dashboard");return}ve>=n.length&&(ve=0);let r=n[ve];t.setDashboardData({queries:n,selectedIndex:ve,results:[],error:"\u23F3 Loading tickets..."}),t.setPage("dashboard");try{let u=await Ot(r.jql),a=re.workspace.workspaceFolders?.[0]?.uri.fsPath,p=[];if(a)try{let l=require("child_process"),s=require("util").promisify(l.exec),{stdout:c}=await s("git branch",{cwd:a});p=c.split(`
`).map(d=>d.replace("*","").trim()).filter(d=>d)}catch{}let m=u.map(l=>{let o=p.find(s=>s.includes(l.key));return{...l,branch:o||null}});t.setDashboardData({queries:n,selectedIndex:ve,results:m,error:null}),t.setPage("dashboard")}catch(u){let a=u.message;(a.includes("ENOTFOUND")||a.includes("network"))&&(a="No Internet or Invalid URL"),t.setDashboardData({queries:n,selectedIndex:ve,results:[],error:a}),t.setPage("dashboard")}}async function Jt(t,e){await re.window.withProgress({location:re.ProgressLocation.Notification,title:`Fetching details for ${e}...`,cancellable:!1},async()=>{try{let i=await Ce(e);i?(t.setJiraData({ticketId:e,...i}),t.setPage("jira")):re.window.showErrorMessage(`Ricwiz: No data found for ticket ${e}.`)}catch(i){re.window.showErrorMessage(`Ricwiz Jira Error: ${i.message}`)}})}var re,ve,Wt=k(()=>{"use strict";re=v(require("vscode"));Se();ve=0});async function _e(){let t=b();return!t||!await A.initialize(t,{forcePrompt:!1})?void 0:(await D(t)).split("-to-")[0]}async function qt(){try{let t=await _e();if(!t){$.window.showErrorMessage("Ricwiz: You are not on a valid ticket branch.");return}let e=await $.window.withProgress({location:$.ProgressLocation.Notification,title:`Fetching available status for ${t}...`,cancellable:!1},()=>At(t));if(!e||e.length===0){$.window.showInformationMessage(`Ricwiz: No transitions available for ${t}.`);return}let i=e.map(r=>({label:r.name,id:r.id})),n=await $.window.showQuickPick(i,{placeHolder:`Select new status for ${t}`,ignoreFocusOut:!0});n&&(await $.window.withProgress({location:$.ProgressLocation.Notification,title:`Updating status to ${n.label}...`,cancellable:!1},()=>It(t,n.id)),$.window.showInformationMessage(`Ricwiz: Status for ${t} updated to ${n.label}.`))}catch(t){t.message.includes("securely configured")?$.window.showErrorMessage(t.message,"Set Token Now").then(e=>{e==="Set Token Now"&&$.commands.executeCommand("ricwiz.setJiraToken")}):$.window.showErrorMessage(`Ricwiz Jira Error: ${t.message}`)}}async function Gt(){try{let t=await _e();if(!t){$.window.showErrorMessage("Ricwiz: You are not on a valid ticket branch.");return}let e=await $.window.showInputBox({prompt:`Add comment to ${t}`,placeHolder:"Type your comment here...",ignoreFocusOut:!0});e&&(await $.window.withProgress({location:$.ProgressLocation.Notification,title:`Adding comment to ${t}...`,cancellable:!1},()=>Lt(t,e)),$.window.showInformationMessage(`Ricwiz: Comment added to ${t}.`))}catch(t){t.message.includes("securely configured")?$.window.showErrorMessage(t.message,"Set Token Now").then(e=>{e==="Set Token Now"&&$.commands.executeCommand("ricwiz.setJiraToken")}):$.window.showErrorMessage(`Ricwiz Jira Error: ${t.message}`)}}async function Ht(){try{let t=await _e();if(!t){$.window.showErrorMessage("Ricwiz: You are not on a valid ticket branch.");return}let e=await $.window.showInputBox({prompt:`Add a label to ${t}`,placeHolder:"e.g. Needs-Review, Bug, High-Priority",ignoreFocusOut:!0});e&&e.trim()&&(await $.window.withProgress({location:$.ProgressLocation.Notification,title:`Adding label to ${t}...`,cancellable:!1},()=>Ft(t,e.trim())),$.window.showInformationMessage(`Ricwiz: Label '${e.trim()}' added to ${t}.`))}catch(t){t.message.includes("securely configured")?$.window.showErrorMessage(t.message,"Set Token Now").then(e=>{e==="Set Token Now"&&$.commands.executeCommand("ricwiz.setJiraToken")}):$.window.showErrorMessage(`Ricwiz Jira Error: ${t.message}`)}}async function Vt(){let t=await $.window.showInputBox({prompt:"Enter your Jira API Token (or Personal Access Token). It will be securely stored in your OS keychain.",password:!0,ignoreFocusOut:!0});if(t)try{await st(t.trim()),$.window.showInformationMessage("Ricwiz: Jira API Token securely stored!")}catch(e){$.window.showErrorMessage(`Ricwiz: Failed to store token: ${e.message}`)}}var $,_t=k(()=>{"use strict";$=v(require("vscode"));R();ne();Se();ye()});async function Qt(){let t=await Qe.window.showInputBox({prompt:"Enter your GitLab Personal Access Token",placeHolder:"glpat-xxxxxxxxxxxxxxxxxxxx",ignoreFocusOut:!0,password:!0});t&&t.trim()&&(await rt(t.trim()),Qe.window.showInformationMessage("Ricwiz: GitLab API Token has been securely stored."))}var Qe,Yt=k(()=>{"use strict";Qe=v(require("vscode"));ye()});async function Zt(){let t=b();if(!t){ae.window.showErrorMessage("Ricwiz: Open a folder or workspace that is a Git repository.");return}let e=await A.initialize(t);if(!e)return;let i=await N(t,{prefix:e.ticketPrefix,prompt:"Enter the full ticket ID to sync all branches for (e.g., SCPSCA-1234) or just the number"});if(!i)return;let{ticketId:n,currentBranch:r}=i;await ae.window.withProgress({location:ae.ProgressLocation.Notification,title:`Ricwiz: Syncing all branches for ${n}...`,cancellable:!1},async u=>{try{u.report({message:"Fetching from remote..."});try{await f("git fetch --all",{cwd:t})}catch{}let{stdout:a}=await f(`git branch --list "*${n}*"`,{cwd:t}),p=a.split(`
`).map(o=>o.replace("*","").trim()).filter(o=>o.length>0);if(p.length===0){ae.window.showWarningMessage(`Ricwiz: No local branches found for ${n}.`);return}let m=0,l=0;for(let o of p)if(u.report({message:`Syncing ${o}...`}),o===r)try{await f(`git pull ${e.originRemote} ${o}`,{cwd:t}),m++}catch(s){let c=!1;try{let{stdout:g}=await f("git ls-files -u",{cwd:t});g.trim().length>0&&(c=!0)}catch{}let d=((s.stdout||"")+(s.stderr||"")+(s.message||"")).toLowerCase();(c||d.includes("conflict")||d.includes("conflit"))&&await we(t,`${e.originRemote}/${o}`,o,u)?m++:l++}else try{await f(`git fetch ${e.originRemote} ${o}:${o}`,{cwd:t}),m++}catch{try{await f(`git checkout ${o}`,{cwd:t});try{await f(`git pull ${e.originRemote} ${o}`,{cwd:t}),m++}catch(c){let d=!1;try{let{stdout:h}=await f("git ls-files -u",{cwd:t});h.trim().length>0&&(d=!0)}catch{}let g=((c.stdout||"")+(c.stderr||"")+(c.message||"")).toLowerCase();(d||g.includes("conflict")||g.includes("conflit"))&&await we(t,`${e.originRemote}/${o}`,o,u)?m++:l++}await f(`git checkout ${r}`,{cwd:t})}catch{try{await f(`git checkout ${r}`,{cwd:t})}catch{}l++}}l>0?ae.window.showWarningMessage(`Ricwiz: Synced ${m}/${p.length} branches. ${l} branch(es) could not be synced (possible conflicts or diverged history).`):ae.window.showInformationMessage(`Ricwiz: \u{1F504} All ${m} branches for ${n} are up to date!`)}catch(a){ae.window.showErrorMessage(`Ricwiz: Sync failed: ${a.message}`)}})}var ae,Kt=k(()=>{"use strict";ae=v(require("vscode"));R();Je();ne()});async function Xt(){let t=b();if(!t){ce.window.showErrorMessage("Ricwiz: Open a folder or workspace that is a Git repository.");return}try{await f("git status",{cwd:t})}catch{ce.window.showErrorMessage("Ricwiz: The opened folder does not appear to be a valid Git repository.");return}let e=await A.initialize(t);if(!e)return;let i=e.environments,n=await N(t,{prefix:e.ticketPrefix});if(!n)return;let{ticketId:r,currentBranch:u}=n;await ce.window.withProgress({location:ce.ProgressLocation.Notification,title:"Ricwiz: Updating environment branches from their bases",cancellable:!0},async(a,p)=>{let m=0,l=u,o=!1;p.onCancellationRequested(()=>{o=!0}),a.report({message:"Syncing remote information...",increment:10});try{await f("git fetch --all",{cwd:t})}catch{}let s=80/(i.length||1);for(let c of i){if(o)break;let d=`${r}-to-${c.name}`,g=c.sourceBranch;if(await me(t,d))try{a.report({message:`Processing ${d}...`,increment:s/2}),await f(`git checkout ${d}`,{cwd:t});try{a.report({message:`Merging ${g} into ${d}...`,increment:s/2});let h=e.getFetchRemote(g),w=e.getFetchBranch(g),z=e.buildUpstreamPath(g);await f(`git fetch ${h} ${w}`,{cwd:t}),await f(`git merge ${z}`,{cwd:t})}catch(h){let w=!1;try{let{stdout:S}=await f("git ls-files -u",{cwd:t});S.trim().length>0&&(w=!0)}catch{}let z=((h.stdout||"")+(h.stderr||"")+(h.message||"")).toLowerCase();if(w||z.includes("conflict")||z.includes("conflit")){let S=e.buildUpstreamPath(g);if(!await we(t,S,d,a))throw o=!0,new Error("Update aborted by user.")}else throw h}if(o)break;m++}catch(h){h.message.includes("aborted")?ce.window.showInformationMessage("Ricwiz: Update cancelled."):ce.window.showErrorMessage(`Ricwiz: Failed to update branch ${d}. Detail: ${h.message}`);return}}if(!o){a.report({message:"Finishing up...",increment:10});try{let c=await D(t);l&&l!==c&&await f(`git checkout ${l}`,{cwd:t})}catch{}ce.window.showInformationMessage(`Ricwiz: Successfully updated ${m} environment branches from their bases!`)}})}var ce,eo=k(()=>{"use strict";ce=v(require("vscode"));R();Je();ne()});async function to(){let t=b();if(!t){I.window.showErrorMessage("Ricwiz: Open a folder or workspace that is a Git repository.");return}let e=await D(t),i=I.workspace.getConfiguration("ricwiz");await I.window.withProgress({location:I.ProgressLocation.Notification,title:"Ricwiz: Scanning for unused local branches...",cancellable:!1},async()=>{try{await f("git fetch --prune",{cwd:t})}catch{}let n=[];try{let{stdout:s}=await f('git branch --format="%(refname:short)"',{cwd:t});n=s.split(`
`).map(c=>c.trim()).filter(c=>c.length>0)}catch{}if(n.length===0){I.window.showInformationMessage("Ricwiz: No local branches found.");return}let r=[];try{let{stdout:s}=await f('git branch -r --format="%(refname:short)"',{cwd:t});r=s.split(`
`).map(c=>c.trim().replace(/^origin\//,"").replace(/^[^\/]+\//,"")).filter(c=>c.length>0&&!c.includes("HEAD"))}catch{}let u=[];try{let{stdout:s}=await f('git for-each-ref --format="%(refname:short)|||%(upstream:track)" refs/heads/',{cwd:t});u=s.split(`
`).filter(c=>c.includes("[gone]")).map(c=>c.split("|||")[0].trim())}catch{}let a=n.filter(s=>!r.includes(s));if(a.length===0){I.window.showInformationMessage("Ricwiz: Your local repository is totally clean! All local branches exist on the remote.");return}let p=a.map(s=>{let c=u.includes(s),d=s===e,g="Not found on remote";return c&&(g="Deleted on remote [gone]"),d&&(g+=" (Current branch - will checkout main first)"),{label:s,description:g,picked:c&&!d}}),m=await I.window.showQuickPick(p,{canPickMany:!0,placeHolder:"Select local branches to delete",title:"Ricwiz: Delete Unused Branches"});if(!m||m.length===0){I.window.showInformationMessage("Ricwiz: No branches selected for deletion.");return}if(await I.window.showWarningMessage(`Ricwiz: Delete ${m.length} local branch(es)?
This cannot be undone!`,{modal:!0},"Yes, delete them")!=="Yes, delete them"){I.window.showInformationMessage("Ricwiz: Deletion cancelled.");return}let o=0;for(let s of m){let c=s.label;if(c===e){let d=i.get("ticketSourceBranch","main");try{await f(`git checkout ${d}`,{cwd:t}),e=d}catch{I.window.showWarningMessage(`Ricwiz: Could not switch away from ${c}. Skipping.`);continue}}try{await f(`git branch -D ${c}`,{cwd:t}),o++}catch{I.window.showWarningMessage(`Ricwiz: Could not delete local branch ${c}.`)}}I.window.showInformationMessage(`Ricwiz: \u{1F5D1}\uFE0F Cleaned up ${o} unused local branch(es).`)})}var I,oo=k(()=>{"use strict";I=v(require("vscode"));R()});async function $e(t){let e=b();e&&await Z.window.withProgress({location:Z.ProgressLocation.Notification,title:`Ricwiz: Switching to ${t}...`,cancellable:!1},async()=>{try{let i=await D(e),n=!1;try{let{stdout:u}=await f("git status --porcelain",{cwd:e});n=u.trim().length>0}catch{}if(n&&i)try{await f(`git stash push --include-untracked -m "ricwiz-auto:${i}"`,{cwd:e}),Z.window.showInformationMessage(`Ricwiz: \u{1F4E6} Stashed changes from ${i}`)}catch{Z.window.showWarningMessage("Ricwiz: Could not stash changes. Checkout may fail if there are conflicts.")}let r=t;t.includes("/")&&(r=t.split("/").slice(1).join("/"));try{await f(`git checkout ${r}`,{cwd:e})}catch{let a="";if(t.includes("/"))a=t.split("/")[0];else{let{stdout:p}=await f("git branch -r",{cwd:e}),m=p.split(`
`).map(o=>o.trim()).filter(o=>o),l=[];for(let o of m){let s=o.split(" ")[0];s.endsWith(`/${r}`)&&l.push(s.substring(0,s.lastIndexOf("/")))}if(l.length===0){Z.window.showErrorMessage(`Ricwiz: A branch "${r}" n\xE3o existe localmente nem em nenhuma remote!`);return}else if(l.length===1)a=l[0];else{let o=await A.initialize(e);l.includes("origin")?a="origin":o&&l.includes(o.upstreamRemote)?a=o.upstreamRemote:a=l[0]}}try{await f(`git fetch ${a} ${r}`,{cwd:e}),await f(`git checkout -b ${r} --track ${a}/${r}`,{cwd:e})}catch{Z.window.showErrorMessage(`Ricwiz: Encontrou na remote ${a} mas falhou a fazer checkout.`);return}}try{let{stdout:u}=await f("git stash list",{cwd:e}),a=u.split(`
`);for(let p=0;p<a.length;p++)if(a[p].includes(`ricwiz-auto:${r}`)){let m=a[p].match(/stash@\{(\d+)\}/);m&&(await f(`git stash pop stash@{${m[1]}}`,{cwd:e}),Z.window.showInformationMessage(`Ricwiz: \u{1F4E6} Restored stashed changes on ${r}`));break}}catch{Z.window.showWarningMessage(`Ricwiz: Could not restore stashed changes on ${r}. You may need to resolve conflicts manually (check git stash list).`)}}catch{Z.window.showErrorMessage(`Ricwiz: Could not checkout branch ${t}.`)}})}var Z,We=k(()=>{"use strict";Z=v(require("vscode"));R();ne()});async function io(){let t=b();if(t)try{let{stdout:e}=await f("git branch --show-current",{cwd:t}),i=e.trim();i&&(await Pe.env.clipboard.writeText(i),Pe.window.showInformationMessage(`Ricwiz: \u{1F4CB} Copied "${i}" to clipboard`))}catch{Pe.window.showErrorMessage("Ricwiz: Could not get the current branch name.")}}var Pe,so=k(()=>{"use strict";Pe=v(require("vscode"));R()});async function ro(){let t=b();if(!t){q.window.showErrorMessage("Ricwiz: Open a folder or workspace that is a Git repository.");return}let e=q.workspace.getConfiguration("ricwiz"),i=e.get("ticketSourceBranch","main"),r=e.get("packageXmlCommand",'sf sgd source delta --to "HEAD" --from "origin/{baseBranch}" --output-dir "."').replace("{baseBranch}",i);await q.window.showWarningMessage("Are you sure you want to generate the package.xml? This may overwrite existing local manifest files.",{modal:!0},"Yes, Generate")==="Yes, Generate"&&await q.window.withProgress({location:q.ProgressLocation.Notification,title:"Ricwiz: Generating package.xml using Salesforce CLI...",cancellable:!1},async()=>{try{await f(r,{cwd:t,maxBuffer:10*1024*1024}),q.window.showInformationMessage("Ricwiz: Successfully generated package.xml!");let a=qe.join(t,"package","package.xml"),p=qe.join(t,"package.xml"),m=qe.join(t,"manifest","package.xml");for(let l of[a,p,m])if(no.existsSync(l)){let o=await q.workspace.openTextDocument(l);await q.window.showTextDocument(o);break}}catch(a){q.window.showErrorMessage(`Ricwiz: Error running sf command - ${a.message}`)}})}var q,qe,no,ao=k(()=>{"use strict";q=v(require("vscode")),qe=v(require("path")),no=v(require("fs"));R()});async function co(){let t=b();if(!t){G.window.showErrorMessage("Ricwiz: Open a folder or workspace that is a Git repository.");return}let i=G.workspace.getConfiguration("ricwiz").get("deployCommand","sf project deploy start --manifest package/package.xml --post-destructive-changes destructiveChanges/destructiveChanges.xml -c -l NoTestRun -g");await G.window.showWarningMessage("Are you sure you want to deploy to Salesforce? This action modifies your org and cannot be easily undone.",{modal:!0},"Yes, Deploy")==="Yes, Deploy"&&await G.window.withProgress({location:G.ProgressLocation.Notification,title:"Ricwiz: Deploying package...",cancellable:!1},async()=>{try{let{stdout:r,stderr:u}=await f(i,{cwd:t,maxBuffer:52428800}),a=G.window.createOutputChannel("Ricwiz Deploy");a.appendLine(`Executing: ${i}`),a.appendLine(r),u&&(a.appendLine("--- STDERR ---"),a.appendLine(u)),a.show(),G.window.showInformationMessage("Ricwiz: Successfully ran deploy command!")}catch(r){let u=G.window.createOutputChannel("Ricwiz Deploy");u.appendLine(`Error executing: ${i}`),r.stdout&&u.appendLine(r.stdout),r.stderr&&u.appendLine(r.stderr),u.appendLine(r.message),u.show(),G.window.showErrorMessage("Ricwiz: Error running deploy command. See output channel for details.")}})}var G,lo=k(()=>{"use strict";G=v(require("vscode"));R()});async function mo(){let t=b();if(!t){H.window.showErrorMessage("Ricwiz: Open a folder or workspace that is a Git repository.");return}let i=H.workspace.getConfiguration("ricwiz").get("importDataCommand","sfdx force:data:tree:import --plan data/plan.json");await H.window.showWarningMessage("Are you sure you want to import data into Salesforce? This action modifies records in your org.",{modal:!0},"Yes, Import")==="Yes, Import"&&await H.window.withProgress({location:H.ProgressLocation.Notification,title:"Ricwiz: Importing data...",cancellable:!1},async()=>{try{let{stdout:r,stderr:u}=await f(i,{cwd:t,maxBuffer:52428800}),a=H.window.createOutputChannel("Ricwiz Import Data");a.appendLine(`Executing: ${i}`),a.appendLine(r),u&&(a.appendLine("--- STDERR ---"),a.appendLine(u)),a.show(),H.window.showInformationMessage("Ricwiz: Successfully ran import data command!")}catch(r){let u=H.window.createOutputChannel("Ricwiz Import Data");u.appendLine(`Error executing: ${i}`),r.stdout&&u.appendLine(r.stdout),r.stderr&&u.appendLine(r.stderr),u.appendLine(r.message),u.show(),H.window.showErrorMessage("Ricwiz: Error running import data command. See output channel for details.")}})}var H,uo=k(()=>{"use strict";H=v(require("vscode"));R()});async function po(){let t=b();if(!t){V.window.showErrorMessage("Ricwiz: Open a folder or workspace that is a Git repository.");return}let e="";try{e=await D(t)}catch{}let n=V.workspace.getConfiguration("ricwiz").get("ticketSourceBranch","main"),r=await V.window.showInputBox({prompt:`Enter the branch name to list modified files (compared to ${n})`,value:e,placeHolder:"SFPSCA-1234"});r&&await V.window.withProgress({location:V.ProgressLocation.Notification,title:`Ricwiz: Finding files for ${r}...`,cancellable:!1},async()=>{try{let u=r.replace(/-to-[a-zA-Z0-9]+$/i,""),a=[];try{let g="";try{let{stdout:h}=await f(`git merge-base origin/${n} ${r}`,{cwd:t});g=h.trim()}catch{let{stdout:h}=await f(`git merge-base ${n} ${r}`,{cwd:t});g=h.trim()}if(g){let{stdout:h}=await f(`git diff --name-only ${g} ${r}`,{cwd:t,maxBuffer:10485760});a=h.split(`
`).map(w=>w.trim()).filter(w=>w.length>0)}}catch{}let p=[];try{let{stdout:g}=await f(`git --no-pager log --grep="\\b${u}\\b" -i -E --name-only -m --first-parent --format=""`,{cwd:t,maxBuffer:10485760});p=g.split(`
`).map(h=>h.trim()).filter(h=>h.length>0)}catch{}let m=[...a,...p];if(m.length===0){V.window.showInformationMessage(`Ricwiz: No modified files found for ${r}.`);return}let l=Array.from(new Set(m)).sort(),o={};for(let g of l){let h=g.match(/default\/([^/]+)/),w=h&&h[1]?h[1].toUpperCase():"OUTROS";o[w]||(o[w]=[]),o[w].push(g)}let s=`Files modified in branch ${r}:
`,c=Object.keys(o).sort();for(let g of c)s+=`
=== ${g} ===
`,s+=o[g].join(`
`)+`
`;let d=await V.workspace.openTextDocument({content:s,language:"plaintext"});await V.window.showTextDocument(d)}catch(u){V.window.showErrorMessage(`Ricwiz: Error running git log - ${u.message}`)}})}var V,go=k(()=>{"use strict";V=v(require("vscode"));R()});async function fo(){let t=b();if(!t){K.window.showErrorMessage("Ricwiz: Open a folder or workspace that is a Git repository.");return}let i=K.workspace.getConfiguration("ricwiz").get("resetTrackingCommand","sf org disable tracking && sf project reset tracking --no-prompt");await K.window.withProgress({location:K.ProgressLocation.Notification,title:"Ricwiz: Resetting tracking...",cancellable:!1},async()=>{try{let{stdout:n,stderr:r}=await f(i,{cwd:t,maxBuffer:52428800}),u=K.window.createOutputChannel("Ricwiz Reset Tracking");u.appendLine(`Executing: ${i}`),u.appendLine(n),r&&(u.appendLine("--- STDERR ---"),u.appendLine(r)),u.show(),K.window.showInformationMessage("Ricwiz: Successfully reset tracking!")}catch(n){let r=K.window.createOutputChannel("Ricwiz Reset Tracking");r.appendLine(`Error executing: ${i}`),n.stdout&&r.appendLine(n.stdout),n.stderr&&r.appendLine(n.stderr),r.appendLine(n.message),r.show(),K.window.showErrorMessage("Ricwiz: Error resetting tracking. See output channel for details.")}})}var K,ho=k(()=>{"use strict";K=v(require("vscode"));R()});async function wo(){let t=b();if(!t){_.window.showErrorMessage("Ricwiz: Open a workspace first.");return}let e=["ApexClass","ApexTrigger","CustomObject","CustomField","LightningComponentBundle","AuraDefinitionBundle","Flow","CustomLabel","CustomMetadata","StaticResource","Profile","PermissionSet","PermissionSetGroup","Layout","ValidationRule","RecordType","ListView","Report","EmailTemplate","Other (Type manually)..."],i=await _.window.showQuickPick(e,{placeHolder:"Select Metadata Type to extract (e.g., ApexClass)",ignoreFocusOut:!0});if(!i||i==="Other (Type manually)..."&&(i=await _.window.showInputBox({prompt:"Enter Metadata Type (e.g., CustomApplication, Queue)",ignoreFocusOut:!0}),!i))return;let n={ApexClass:"**/*.cls",ApexTrigger:"**/*.trigger",CustomObject:"**/*.{object,object-meta.xml}",CustomField:"**/*.field-meta.xml",LightningComponentBundle:"**/lwc/*/*.js",AuraDefinitionBundle:"**/aura/*/*.cmp",Flow:"**/*.flow-meta.xml",CustomLabel:"**/*.labels-meta.xml",CustomMetadata:"**/*.md-meta.xml",StaticResource:"**/*.resource-meta.xml",Profile:"**/*.profile-meta.xml",PermissionSet:"**/*.permissionset-meta.xml",PermissionSetGroup:"**/*.permissionsetgroup-meta.xml",Layout:"**/*.layout-meta.xml",ValidationRule:"**/*.validationRule-meta.xml",RecordType:"**/*.recordType-meta.xml",ListView:"**/*.listView-meta.xml"},r=[],u=n[i];if(u)try{r=(await _.workspace.findFiles(u,"**/node_modules/**")).map(m=>{let l=m.fsPath.split(/[\\/]/).pop()||"";if(i==="LightningComponentBundle"||i==="AuraDefinitionBundle"){let o=m.fsPath.split(/[\\/]/);return o[o.length-2]||l.split(".")[0]}return l.split(".")[0]}),r=[...new Set(r)].sort()}catch{}let a=await new Promise(p=>{let m=_.window.createQuickPick();m.title=`Extract ${i}`,m.placeholder="Type name (e.g. MyComponent) or * for all",m.ignoreFocusOut=!0,m.matchOnDescription=!0;let l=()=>{let o=m.value.trim(),s=[];o?s.push({label:`$(cloud-download) Extract "${o}"`,description:"Extract exact name from Salesforce",alwaysShow:!0}):s.push({label:'$(cloud-download) Extract "*" (All)',description:`Extract all ${i}s`,alwaysShow:!0}),r.forEach(c=>{(!o||c.toLowerCase().includes(o.toLowerCase()))&&s.push({label:c,description:"Local workspace component"})}),m.items=s};m.onDidChangeValue(()=>l()),m.onDidAccept(()=>{let o=m.selectedItems[0];if(o){let s=o.label;s.startsWith('$(cloud-download) Extract "')?s=s.replace('$(cloud-download) Extract "',"").replace('" (All)',"").replace('"',""):s==='$(cloud-download) Extract "*" (All)'&&(s="*"),m.hide(),p(s)}}),m.onDidHide(()=>{m.dispose(),p(void 0)}),l(),m.show()});a&&await _.window.withProgress({location:_.ProgressLocation.Notification,title:`Ricwiz: Extracting ${i}:${a} from Salesforce...`,cancellable:!0},async(p,m)=>{try{M.show(!0);let l=`${i}:${a}`,{stdout:o,stderr:s}=await f(`sf project retrieve start -m "${l}"`,{cwd:t});o&&M.appendLine(o),s&&M.appendLine(s),_.window.showInformationMessage(`Ricwiz: Successfully extracted ${l}.`)}catch(l){M.appendLine(`ERROR: ${l.message}`),l.stdout&&M.appendLine(l.stdout),l.stderr&&M.appendLine(l.stderr),_.window.showErrorMessage("Ricwiz: Extraction failed. See Output channel for details.")}})}var _,vo=k(()=>{"use strict";_=v(require("vscode"));R()});async function yo(){let t=O.window.activeTextEditor;if(!t){O.window.showErrorMessage("Ricwiz: Please open the file you want to deploy in the editor first.");return}let e=t.document.uri.fsPath,i=b();if(!i)return;let n="";if(await O.window.withProgress({location:O.ProgressLocation.Notification,title:"Ricwiz: Fetching available Salesforce orgs...",cancellable:!1},async()=>{try{let{stdout:m}=await f("sf org list --json",{cwd:i});n=m}catch(m){n=m.stdout||""}}),!n){O.window.showErrorMessage("Ricwiz: Failed to fetch orgs. Is Salesforce CLI installed?");return}let r=[];try{let m=JSON.parse(n),l=m.result?.nonScratchOrgs||[],o=m.result?.scratchOrgs||[];r=[...l,...o]}catch{O.window.showErrorMessage("Ricwiz: Failed to parse org list.");return}if(r.length===0){O.window.showInformationMessage("Ricwiz: No authenticated orgs found.");return}let u=r.map(m=>({label:m.alias||m.username,description:m.alias?m.username:"",picked:m.isDefaultUsername})),a=await O.window.showQuickPick(u,{placeHolder:"Select the org(s) to deploy this file to",canPickMany:!0,ignoreFocusOut:!0});if(!a||a.length===0)return;let p=bo.basename(e);await O.window.withProgress({location:O.ProgressLocation.Notification,title:`Ricwiz: Deploying ${p} to ${a.length} org(s)...`,cancellable:!1},async()=>{M.show(!0),M.appendLine(`--- Starting Parallel Deploy of ${p} ---`);let m=a.map(async c=>{let d=c.label;M.appendLine(`[${d}] Deploying...`);try{let{stdout:g,stderr:h}=await f(`sf project deploy start -d "${e}" -o "${d}"`,{cwd:i});return M.appendLine(`[${d}] \u2705 Success`),g&&M.appendLine(g),{org:d,success:!0}}catch(g){return M.appendLine(`[${d}] \u274C Failed`),g.stdout&&M.appendLine(g.stdout),g.stderr&&M.appendLine(g.stderr),{org:d,success:!1}}}),l=await Promise.all(m),o=l.filter(c=>c.success).length,s=l.filter(c=>!c.success).length;s===0?O.window.showInformationMessage(`Ricwiz: Successfully deployed to all ${o} orgs!`):O.window.showErrorMessage(`Ricwiz: Deploy finished with errors (${o} success, ${s} failed). Check Output channel.`)})}var O,bo,xo=k(()=>{"use strict";O=v(require("vscode")),bo=v(require("path"));R()});async function ko(){let t=b();if(!t){T.window.showErrorMessage("Ricwiz: Open a folder or workspace that is a Git repository.");return}let e=T.workspace.getConfiguration("ricwiz"),i=e.get("auditUsername",""),n=e.get("auditHours",8),r=await T.window.showInputBox({prompt:"Enter your Salesforce Username to query in SetupAuditTrail",value:i,placeHolder:"admin@tuaorg.com"});if(!r)return;let u=await T.window.showInputBox({prompt:"How many hours back do you want to search?",value:n.toString(),placeHolder:"8"});if(!u)return;let a=parseFloat(u);if(isNaN(a)||a<=0){T.window.showErrorMessage("Ricwiz: Invalid hours specified.");return}let p=new Date(Date.now()-a*60*60*1e3).toISOString(),l=`sf data query -q "${`SELECT Action, Display, Section FROM SetupAuditTrail WHERE CreatedBy.Username = '${r}' AND CreatedDate >= ${p}`}" --json`;await T.window.withProgress({location:T.ProgressLocation.Notification,title:"Ricwiz: Interrogating Setup Audit Trail...",cancellable:!1},async()=>{try{let{stdout:o}=await f(l,{cwd:t,maxBuffer:52428800}),s=JSON.parse(o);if(!s.result||s.result.records.length===0){T.window.showInformationMessage(`Ricwiz: No changes found for ${r} in the last ${a} hours.`);return}let c=s.result.records,d=[],g=new Set;for(let P of c){let L=ti(P.Action,P.Display,P.Section);if(L){let j=`${L.isDelete?"DEL":"ADD"}-${L.metadataFormat}`;if(!g.has(j)){g.add(j);let J=L.isDelete?"$(trash)":"$(plus)";d.push({label:`${J} ${L.metadataFormat}`,description:`${P.Action} -> ${P.Display}`,metadataFormat:L.metadataFormat,isDelete:L.isDelete})}}}if(d.length===0){T.window.showInformationMessage(`Ricwiz: No extractable metadata changes found for ${r} in the last ${a} hours (ignored passwords/logins).`);return}let h=await T.window.showQuickPick(d,{canPickMany:!0,placeHolder:"Select the changes you want to extract to GitLab",ignoreFocusOut:!0});if(!h||h.length===0){T.window.showInformationMessage("Ricwiz: No changes selected.");return}let w=h.filter(P=>P.isDelete),z=h.filter(P=>!P.isDelete),S=T.window.createOutputChannel("Ricwiz Admin Bridge");if(S.show(),w.length>0){let{stdout:P}=await f("git ls-files",{cwd:t}),L=P.split(`
`).map(J=>J.trim()),j=0;for(let J of w){let Me=J.metadataFormat.split(":"),De=Me[0],ze=Me[1],Ae=ze;De==="CustomField"&&(Ae=ze.split(".")[1]);let E=L.filter(W=>{let le=He.basename(W);return le.startsWith(Ae+".")&&le.includes(De==="CustomField"?".field":"")});for(let W of E){let le=He.join(t,W);Ge.existsSync(le)&&(Ge.unlinkSync(le),S.appendLine(`Deleted local file: ${W}`),j++)}}T.window.showInformationMessage(`Ricwiz: Deleted ${j} local files from Git workspace.`)}if(z.length===0)return;let de=z.map(P=>P.metadataFormat).filter(P=>P!=="").join(", "),pe=await T.window.showInputBox({prompt:"Review and adjust the metadata components to retrieve",value:de,ignoreFocusOut:!0});if(!pe)return;let ge=`sf project retrieve start -m "${pe}"`;S.appendLine(`Executing: ${ge}`),T.window.showInformationMessage(`Ricwiz: Extracting ${z.length} components...`);let X=await f(ge,{cwd:t});S.appendLine(X.stdout),X.stderr&&(S.appendLine("--- STDERR ---"),S.appendLine(X.stderr)),T.window.showInformationMessage("Ricwiz: Changes extracted successfully! Ready for Git Commit.")}catch(o){T.window.showErrorMessage(`Ricwiz: Error capturing changes - ${o.message}`)}})}function ti(t,e,i){if(!t||!e||!i)return null;let n=t.toLowerCase(),r=i.toLowerCase();if(["security controls","network access","session settings","data export","login history","password policies","identity verification","delegated administration"].includes(r)||n.includes("login")||n.includes("password")||n.includes("oauth")||n.includes("session"))return null;let a=n.includes("delete"),p=null;if(n==="permissionsetgroupcomponentadd"||n==="permissionsetgroupcomponentdelete")return null;let m=(l,o=!1)=>{let s=l.replace(/\(.*\)/g,"").trim();s.includes(":")&&!n.includes("calculation")&&(s=s.split(":")[0]);let c=["disabled","deleted","removed","created","changed","updated","from","to","on","assigned","assign","assignment","permission","set","group","apex","class","trigger","custom","field","object","layout","validation","rule","flow","profile"],d=s.split(/\s+/);if(o){for(;d.length>0&&c.includes(d[d.length-1].toLowerCase());)d.pop();for(;d.length>0&&c.includes(d[0].toLowerCase());)d.shift();return d.join(" ").trim().replace(/[^a-zA-Z0-9_ ]/g,"")}else return d.filter(w=>!c.includes(w.toLowerCase())).join("_").replace(/[^a-zA-Z0-9_]/g,"")||s.replace(/\s+/g,"")};if(n.includes("profile"))p=`Profile:${m(e,!0)}`;else if(n.includes("permissionsetgroupcalculation")){let l=e.split(":");p=`PermissionSetGroup:${l.length>1?l[l.length-1].trim():m(e,!1)}`}else if(n.includes("permission set group")||n.includes("permissionsetgroup"))p=`PermissionSetGroup:${m(e,!1)}`;else if(n.includes("permission set")||n.includes("permissionset"))p=`PermissionSet:${m(e,!1)}`;else if(n.includes("apexclass"))p=`ApexClass:${m(e,!1)}`;else if(n.includes("apextrigger")||n.includes("apex trigger"))p=`ApexTrigger:${m(e,!1)}`;else if(n.includes("customfield")){let l=e.match(/([A-Za-z0-9_]+__c)/),o=e.match(/(?:on|na|for)\s+([A-Za-z0-9_]+)/i);l&&o?p=`CustomField:${o[1]}.${l[1]}`:p=`CustomField:${m(e,!1)}`}else if(n.includes("layout"))p=`Layout:${m(e,!0)}`;else if(n.includes("validation"))p=`ValidationRule:${m(e,!1)}`;else if(n.includes("flow"))p=`Flow:${m(e,!1)}`;else if(n.includes("customobject")){let l=e.match(/([A-Za-z0-9_]+__c)/);p=l?`CustomObject:${l[1]}`:`CustomObject:${m(e,!1)}`}else if(!n.includes("created")&&!n.includes("changed")&&!n.includes("deleted"))return null;return p?{metadataFormat:p,isDelete:a}:null}var T,Ge,He,Co=k(()=>{"use strict";T=v(require("vscode")),Ge=v(require("fs")),He=v(require("path"));R()});async function $o(){let t=b();if(t)try{let{stdout:e}=await f('git for-each-ref --sort=-committerdate --format="%(refname:short)|||%(committerdate:relative)|||%(subject)" refs/heads/',{cwd:t}),i=e.split(`
`).filter(r=>r.trim()).map(r=>{let u=r.split("|||");return{label:`$(git-branch) ${u[0]}`,description:u[1],detail:u[2],branchName:u[0]}}),n=await Ye.window.showQuickPick(i,{placeHolder:"Select a branch from history to checkout",matchOnDescription:!0,matchOnDetail:!0});n&&await $e(n.branchName)}catch{Ye.window.showErrorMessage("Ricwiz: Failed to get branch history")}}var Ye,zo=k(()=>{"use strict";Ye=v(require("vscode"));R();We()});async function Ro(){let t=b();if(!t)return;let e=await Be.window.showInputBox({prompt:"Enter ticket number or name (e.g., 48934)",placeHolder:"48934"});if(e)try{let{stdout:i}=await f(`git branch --list "*${e}*"`,{cwd:t}),n=i.split(`
`).map(a=>a.replace("*","").trim()).filter(a=>a);if(n.length===0){Be.window.showInformationMessage(`Ricwiz: No branches found matching "${e}"`);return}let r=n.map(a=>({label:`$(git-branch) ${a}`,branchName:a})),u=await Be.window.showQuickPick(r,{placeHolder:`Select a branch for ${e}`});u&&await $e(u.branchName)}catch{Be.window.showErrorMessage("Ricwiz: Failed to search branches")}}var Be,So=k(()=>{"use strict";Be=v(require("vscode"));R();We()});async function Bo(){let t=be.window.activeTextEditor;if(!t)return be.window.showErrorMessage("Ricwiz: Please open a file in the editor to check blame."),null;let e=t.document.fileName,i=Po.basename(e),n=b();if(!n)return be.window.showErrorMessage("Ricwiz: Workspace is not a git repository."),null;let r=[];try{let{stdout:o}=await f(`git log -5 --pretty=format:"%an|%ar|%s|%h" -- "${e}"`,{cwd:n}),s=o.trim().split(`
`);for(let c of s){let d=c.split("|");d.length>=4&&r.push({author:d[0],time:d[1],message:d.slice(2,-1).join("|"),hash:d[d.length-1]})}}catch(o){console.error("Git blame error:",o)}let u="Unknown",a="Unknown",p="Unknown",m=[],l=oi(e);if(l)try{await be.window.withProgress({location:be.ProgressLocation.Notification,title:`Ricwiz: Analyzing ${l.name} in Salesforce...`,cancellable:!1},async()=>{let o="";if(l.type==="CustomField"){let s=l.name.split(".");s.length===2&&(o=`SELECT LastModifiedBy.Name, LastModifiedDate, CreatedBy.Name FROM CustomField WHERE DeveloperName = '${s[1].replace("__c","")}' AND TableEnumOrId = '${s[0]}'`)}else l.type==="LightningComponentBundle"?o=`SELECT LastModifiedBy.Name, LastModifiedDate, CreatedBy.Name FROM LightningComponentBundle WHERE DeveloperName = '${l.name}'`:o=`SELECT LastModifiedBy.Name, LastModifiedDate, CreatedBy.Name FROM ${l.type} WHERE Name = '${l.name}'`;if(o)try{let{stdout:s}=await f(`sf data query -t -q "${o}" --json`,{cwd:n,maxBuffer:52428800}),c=JSON.parse(s);if(c&&c.result&&c.result.records&&c.result.records.length>0){let d=c.result.records[0];u=d.LastModifiedBy?d.LastModifiedBy.Name:"Unknown",p=d.CreatedBy?d.CreatedBy.Name:"Unknown",a=new Date(d.LastModifiedDate).toLocaleString()}else u="Not found in Org",a="N/A",p="N/A"}catch{u="Query Error",a="N/A",p="N/A"}try{let s="SELECT Action, Display, CreatedBy.Name, CreatedDate FROM SetupAuditTrail ORDER BY CreatedDate DESC LIMIT 1500",{stdout:c}=await f(`sf data query -q "${s}" --json`,{cwd:n,maxBuffer:52428800}),d=JSON.parse(c);if(d&&d.result&&d.result.records){let g=l.name.replace("__c","");m=d.result.records.filter(w=>w.Display&&w.Display.includes(g)).map(w=>({action:w.Action,display:w.Display,author:w.CreatedBy?w.CreatedBy.Name:"Unknown",time:new Date(w.CreatedDate).toLocaleString()})).slice(0,10)}}catch(s){console.error("Audit trail query error:",s)}})}catch(o){console.error("Salesforce query error:",o)}else u="Unsupported Metadata Type",a="N/A";return{fileName:i,gitHistory:r,sfAuthor:u,sfTime:a,sfCreatedBy:p,auditHistory:m}}function oi(t){let e=t.replace(/\\/g,"/");if(e.includes("/classes/")){let i=e.match(/\/classes\/([^/.]+)\.cls/);if(i)return{type:"ApexClass",name:i[1]}}if(e.includes("/triggers/")){let i=e.match(/\/triggers\/([^/.]+)\.trigger/);if(i)return{type:"ApexTrigger",name:i[1]}}if(e.includes("/lwc/")){let i=e.match(/\/lwc\/([^/]+)\//);if(i)return{type:"LightningComponentBundle",name:i[1]}}if(e.includes("/aura/")){let i=e.match(/\/aura\/([^/]+)\//);if(i)return{type:"AuraDefinitionBundle",name:i[1]}}if(e.includes("/objects/")&&e.includes("/fields/")){let i=e.match(/\/objects\/([^/]+)\//),n=e.match(/\/fields\/([^/.]+)\.field/);if(i&&n)return{type:"CustomField",name:`${i[1]}.${n[1]}`}}return null}var be,Po,To=k(()=>{"use strict";be=v(require("vscode")),Po=v(require("path"));R()});function Eo(t,e,i){t.subscriptions.push(x.commands.registerCommand("ricwiz.generateDestructiveChanges",ut),x.commands.registerCommand("ricwiz.runSmartTests",gt),x.commands.registerCommand("ricwiz.refreshWebview",()=>{e&&x.commands.executeCommand("workbench.action.webview.reloadWebviewAction")}),x.commands.registerCommand("ricwiz.createBranches",vt),x.commands.registerCommand("ricwiz.prepareDeploy",kt),x.commands.registerCommand("ricwiz.createMergeRequests",zt),x.commands.registerCommand("ricwiz.createMergeRequestsVSCode",Rt),x.commands.registerCommand("ricwiz.openJiraTicket",Bt),x.commands.registerCommand("ricwiz.openJiraTicketVSCode",Tt),x.commands.registerCommand("ricwiz.showJiraDetails",()=>{e&&Nt(e)}),x.commands.registerCommand("ricwiz.openJiraDashboard",n=>{e&&jt(e,n)}),x.commands.registerCommand("ricwiz.openJiraDetailsForId",n=>{e&&Jt(e,n)}),x.commands.registerCommand("ricwiz.changeJiraStatus",qt),x.commands.registerCommand("ricwiz.addJiraComment",Gt),x.commands.registerCommand("ricwiz.addJiraLabel",Ht),x.commands.registerCommand("ricwiz.setJiraToken",Vt),x.commands.registerCommand("ricwiz.setGitlabToken",Qt),x.commands.registerCommand("ricwiz.syncAll",Zt),x.commands.registerCommand("ricwiz.updateBases",Xt),x.commands.registerCommand("ricwiz.deleteUnusedBranches",to),x.commands.registerCommand("ricwiz.checkoutBranch",$e),x.commands.registerCommand("ricwiz.copyBranchName",io),x.commands.registerCommand("ricwiz.generatePackageXml",ro),x.commands.registerCommand("ricwiz.deployPackage",co),x.commands.registerCommand("ricwiz.importData",mo),x.commands.registerCommand("ricwiz.listTicketFiles",po),x.commands.registerCommand("ricwiz.resetTracking",fo),x.commands.registerCommand("ricwiz.extractComponent",wo),x.commands.registerCommand("ricwiz.deployMultiOrg",yo),x.commands.registerCommand("ricwiz.captureAdminChanges",ko),x.commands.registerCommand("ricwiz.openHistory",$o),x.commands.registerCommand("ricwiz.searchTicket",Ro),x.commands.registerCommand("ricwiz.whoToBlame",async()=>{let n=await Bo();n&&e&&(e.setBlameData(n),e.setPage("blame"))}),x.commands.registerCommand("ricwiz.manualRefresh",()=>{i&&i()}),x.commands.registerCommand("ricwiz.toggleAutoRefresh",()=>{if(e){let n=!e.isAutoRefreshEnabled();e.setAutoRefresh(n),x.workspace.getConfiguration("ricwiz").update("autoRefresh",n,x.ConfigurationTarget.Global)}}),x.commands.registerCommand("ricwiz.openSettings",()=>{x.commands.executeCommand("workbench.action.openSettings","ricwiz")}))}var x,Mo=k(()=>{"use strict";x=v(require("vscode"));pt();ft();bt();Ct();St();Et();Ut();Wt();_t();Yt();Kt();eo();oo();We();so();ao();lo();uo();go();ho();vo();xo();Co();zo();So();To()});async function Ze(){let t=await Ve();return!!(t&&t.trim())}async function Fo(t){let e=Lo.workspace.getConfiguration("ricwiz"),i=(await Ve())?.trim();if(!i)throw new Error("No GitLab token");let n=e.get("gitlabUrlOverride","");if(!n||n.trim()==="")try{let{stdout:p}=await f("git remote get-url origin",{cwd:t}),m=p.trim();m.endsWith(".git")&&(m=m.slice(0,-4)),m.startsWith("git@")&&(m=m.replace("git@","").replace(":","/"),m=`https://${m}`),n=m}catch{throw new Error("Could not get remote origin URL.")}let r=new URL(n),u=`${r.protocol}//${r.host}`,a=Do[t];if(!a){let p=r.pathname;p.startsWith("/")&&(p=p.substring(1)),a=encodeURIComponent(p),Do[t]=a}return{baseUrl:u,token:i,projectPath:a}}async function ii(t,e,i){let{baseUrl:n,token:r}=await Fo(t),u=new URL(`${n}${i}`);return new Promise((a,p)=>{let m=Io.request(u,{method:e,timeout:5e3,headers:{"PRIVATE-TOKEN":r,Accept:"application/json"}},l=>{let o="";l.on("data",s=>o+=s),l.on("end",()=>{if(l.statusCode&&l.statusCode>=400)return p(new Error(`GitLab API error: ${l.statusCode}`));if(!o)return a({});try{let s=JSON.parse(o);a(s)}catch{p(new Error("Failed to parse GitLab response."))}})});m.on("timeout",()=>{m.destroy(),p(new Error("GitLab request timed out"))}),m.on("error",l=>p(new Error(`Network error: ${l.message}`))),m.end()})}async function Ke(t,e,i){let n=`${t}:${e}:${i}`,r=Ao.get(n);if(r&&Date.now()-r.timestamp<si)return r.data;try{let{projectPath:u}=await Fo(t),a=`/api/v4/projects/${u}/merge_requests?source_branch=${encodeURIComponent(e)}&target_branch=${encodeURIComponent(i)}&order_by=updated_at&sort=desc`,p=await ii(t,"GET",a);if(p&&p.length>0){let m=p[0],l="none";if(m.head_pipeline&&m.head_pipeline.status){let s=m.head_pipeline.status;s==="success"||s==="failed"||s==="canceled"||s==="skipped"?l=s:l="running"}let o={isMerged:m.state==="merged",isOpen:m.state==="opened",pipelineStatus:l,webUrl:m.web_url};return Ao.set(n,{data:o,timestamp:Date.now()}),o}return null}catch{return null}}var Io,Lo,Do,Ao,si,Oo=k(()=>{"use strict";Io=v(require("https")),Lo=v(require("vscode"));ye();R();Do={};Ao=new Map,si=30*1e3});function No(t,e){return e.find(i=>t.endsWith(`-to-${i.name}`))}async function Uo(t,e,i,n){let r=await Ze();return await Promise.all(e.map(async a=>{let p=No(a,n);if(!p)return{name:a,isMerged:!1};if(r){let m=await Ke(t,a,p.sourceBranch);if(m)return{name:a,isMerged:m.isMerged,pipelineStatus:m.pipelineStatus,mrUrl:m.webUrl}}return{name:a,isMerged:!1}}))}async function jo(t,e,i){let n=No(e,i);if(!n)return!1;if(await Ze()){let r=await Ke(t,e,n.sourceBranch);if(r)return r.isMerged}return!1}async function Jo(t,e=10){try{let{stdout:i}=await f(`git log --oneline -${e} --format="%h|||%s|||%ar"`,{cwd:t});return i.split(`
`).filter(n=>n.trim()).map(n=>{let r=n.split("|||");return{hash:r[0]||"",message:r.length>=3?r.slice(1,-1).join("|||"):r[1]||"",timeAgo:r.length>=3?r[r.length-1]:""}})}catch{return[]}}async function Wo(t,e=3){try{let{stdout:i}=await f('git for-each-ref --sort=-committerdate --format="%(refname:short)" refs/heads/',{cwd:t}),n=i.split(`
`).map(u=>u.trim()).filter(u=>u),r=/^[A-Z]+-\d+$/i;return n.filter(u=>r.test(u)).slice(0,e)}catch{return[]}}async function qo(t,e,i){let{stdout:n}=await f(`git branch --list "*${e}*"`,{cwd:t});return n.split(`
`).map(r=>r.replace("*","").trim()).filter(r=>r&&r!==i)}var Go=k(()=>{"use strict";R();Oo()});function Ho(t,e,i){let n,r=ie.workspace.getConfiguration("ricwiz").get("autoRefresh",!0);e?.setAutoRefresh(r),t.subscriptions.push(ie.workspace.onDidChangeConfiguration(a=>{if(a.affectsConfiguration("ricwiz.autoRefresh")){let p=ie.workspace.getConfiguration("ricwiz").get("autoRefresh",!0);e?.setAutoRefresh(p)}}));async function u(){let a=ie.extensions.getExtension("vscode.git");if(a){let l=function(o){let s="",c;async function d(){let h=ie.workspace.workspaceFolders;if(!h)return;let w=h[0].uri.fsPath,z=await D(w);if(z&&z!==s){s=z;let S=ie.workspace.getConfiguration("ricwiz"),de=S.get("ticketPrefix","SFPSCA-");if(!z.includes(de)){let E=z.match(/([A-Z]+-)\d+/i);E&&(de=E[1].toUpperCase())}let pe=[],ge=[],X=[],P=[],L=S.get("environments",[{name:"Qual",sourceBranch:"quality"},{name:"Val",sourceBranch:"validation"},{name:"Prod",sourceBranch:"main"}]);try{let E=S.get("workspaceCheckoutButtons",["main","quality","validation"]);X=Array.from(new Set(E))}catch{}let j="",J=z.match(new RegExp(`(${de}\\d+(?:-\\d+)?)`,"i"));if(J){let E=J[1].toUpperCase();j=E;let W=S.get("commitMessageSuffix","- "),le=/^[A-Z]+-\d+(?:-\d+)?\s*(?:-\s*|:\s*|\s+)?/i;le.test(o.inputBox.value)?o.inputBox.value.toUpperCase().startsWith(E)||(o.inputBox.value=o.inputBox.value.replace(le,`${E}${W}`)):o.inputBox.value=`${E}${W}`+o.inputBox.value,i.text=`$(bookmark) ${E}`,i.tooltip=`Branch: ${z}
Click to open Jira ticket`,i.show();try{let Xe=await qo(w,E,z);pe=await Uo(w,Xe,E,L)}catch{}}else{i.hide();try{P=await Wo(w)}catch{}}let[Me,De,ze]=await Promise.all([Jo(w,10),jo(w,z,L),j?Ce(j).catch(E=>{let W=E.message;return(W.includes("ENOTFOUND")||W.includes("network"))&&(W="No Internet or Invalid URL"),{summary:`\u26A0\uFE0F Jira Error: ${W}`,description:""}}):Promise.resolve(null)]);ge=Me;let Ae=ze?ze.summary:"";e?.updateBranch(z,De,pe,ge,X,P,Ae)}}function g(){e?.isAutoRefreshEnabled()&&(c&&clearTimeout(c),c=setTimeout(()=>{s="",d()},300))}n=()=>{s="",d()},d(),o.state.onDidChange(()=>g()),ie.window.onDidChangeWindowState(h=>{h.focused&&g()})};var p=l;a.isActive||await a.activate();let m=a.exports.getAPI(1);m.repositories.length>0&&m.repositories.forEach(o=>l(o)),m.onDidOpenRepository(o=>l(o))}}return u(),n}var ie,Vo=k(()=>{"use strict";ie=v(require("vscode"));R();Go();Se()});var Ue={};et(Ue,{activate:()=>ni,deactivate:()=>ri,webviewProvider:()=>Te});module.exports=fe(Ue);function ni(t){it(t),Te=new Le(t.extensionUri),t.subscriptions.push(Ee.window.registerWebviewViewProvider("ricwiz-webview",Te));let e=Ee.window.createStatusBarItem(Ee.StatusBarAlignment.Left,100);e.command="ricwiz.openJiraTicket",t.subscriptions.push(e);let i=Ho(t,Te,e);Eo(t,Te,i)}function ri(){}var Ee,Te,je=k(()=>{Ee=v(require("vscode"));ot();ye();Mo();Vo()});je();0&&(module.exports={activate,deactivate,webviewProvider});
