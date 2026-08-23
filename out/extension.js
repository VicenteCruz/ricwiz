"use strict";var _o=Object.create;var Fe=Object.defineProperty;var Qo=Object.getOwnPropertyDescriptor;var Yo=Object.getOwnPropertyNames;var Zo=Object.getPrototypeOf,Ko=Object.prototype.hasOwnProperty;var k=(t,e,i)=>()=>{if(i)throw i[0];try{return t&&(e=t(t=0)),e}catch(n){throw i=[n],n}};var et=(t,e)=>{for(var i in e)Fe(t,i,{get:e[i],enumerable:!0})},tt=(t,e,i,n)=>{if(e&&typeof e=="object"||typeof e=="function")for(let r of Yo(e))!Ko.call(t,r)&&r!==i&&Fe(t,r,{get:()=>e[r],enumerable:!(n=Qo(e,r))||n.enumerable});return t};var v=(t,e,i)=>(i=t!=null?_o(Zo(t)):{},tt(e||!t||!t.__esModule?Fe(i,"default",{value:t,enumerable:!0}):i,t)),ue=t=>tt(Fe({},"__esModule",{value:!0}),t);function C(t){return t.replace(/&/g,"&amp;").replace(/</g,"&lt;").replace(/>/g,"&gt;").replace(/"/g,"&quot;").replace(/'/g,"&#39;")}var b,Oe,ot=k(()=>{"use strict";b=v(require("vscode"));Oe=class{constructor(e){this._extensionUri=e}_extensionUri;webviewView;resolveWebviewView(e,i,n){this.webviewView=e,e.webview.options={enableScripts:!0,localResourceRoots:[this._extensionUri]},this.updateBranch("",!1),e.webview.onDidReceiveMessage(r=>{switch(r.command){case"createBranches":b.commands.executeCommand("ricwiz.createBranches");break;case"createBranchForTicket":b.commands.executeCommand("ricwiz.createBranches",r.args);break;case"prepareDeploy":b.commands.executeCommand("ricwiz.prepareDeploy");break;case"openMRs":b.commands.executeCommand("ricwiz.createMergeRequests");break;case"openMRsVSCode":b.commands.executeCommand("ricwiz.createMergeRequestsVSCode");break;case"openExternal":r.args&&b.env.openExternal(b.Uri.parse(r.args));break;case"openJira":b.commands.executeCommand("ricwiz.openJiraTicket");break;case"showJiraDetails":b.commands.executeCommand("ricwiz.showJiraDetails");break;case"changeJiraStatus":b.commands.executeCommand("ricwiz.changeJiraStatus");break;case"addJiraComment":b.commands.executeCommand("ricwiz.addJiraComment");break;case"addJiraLabel":b.commands.executeCommand("ricwiz.addJiraLabel");break;case"setPage":this.setPage(r.args);break;case"openDashboard":b.commands.executeCommand("ricwiz.openJiraDashboard");break;case"openJiraDetailsForId":b.commands.executeCommand("ricwiz.openJiraDetailsForId",r.args);break;case"refreshDashboard":b.commands.executeCommand("ricwiz.openJiraDashboard");break;case"switchDashboardQuery":b.commands.executeCommand("ricwiz.openJiraDashboard",parseInt(r.args));break;case"openJiraVSCode":b.commands.executeCommand("ricwiz.openJiraTicketVSCode");break;case"openSettings":b.commands.executeCommand("ricwiz.openSettings");break;case"checkout":r.branch&&b.commands.executeCommand("ricwiz.checkoutBranch",r.branch);break;case"copyBranch":b.commands.executeCommand("ricwiz.copyBranchName");break;case"generatePackageXml":b.commands.executeCommand("ricwiz.generatePackageXml");break;case"openDevTools":this.setPage("devtools");break;case"openMain":this.setPage("main");break;case"generateDestructiveChanges":b.commands.executeCommand("ricwiz.generateDestructiveChanges");break;case"deployPackage":b.commands.executeCommand("ricwiz.deployPackage");break;case"runSmartTests":b.commands.executeCommand("ricwiz.runSmartTests");break;case"importData":b.commands.executeCommand("ricwiz.importData");break;case"listTicketFiles":b.commands.executeCommand("ricwiz.listTicketFiles");break;case"resetTracking":b.commands.executeCommand("ricwiz.resetTracking");break;case"extractComponent":b.commands.executeCommand("ricwiz.extractComponent");break;case"deployMultiOrg":b.commands.executeCommand("ricwiz.deployMultiOrg");break;case"captureAdminChanges":b.commands.executeCommand("ricwiz.captureAdminChanges");break;case"whoToBlame":b.commands.executeCommand("ricwiz.whoToBlame");break;case"syncAll":b.commands.executeCommand("ricwiz.syncAll");break;case"updateBases":b.commands.executeCommand("ricwiz.updateBases");break;case"deleteUnused":b.commands.executeCommand("ricwiz.deleteUnusedBranches");break;case"conflict_commitAndContinue":b.commands.executeCommand("ricwiz.conflictAction","commitAndContinue");break;case"conflict_resolveDeletions":b.commands.executeCommand("ricwiz.conflictAction","resolveDeletions");break;case"conflict_abortDeploy":b.commands.executeCommand("ricwiz.conflictAction","abortDeploy");break;case"openFile":if(r.file){let p=b.workspace.workspaceFolders;if(p){let a=b.Uri.joinPath(p[0].uri,r.file);b.commands.executeCommand("vscode.open",a)}}break;case"searchTicket":b.commands.executeCommand("ricwiz.searchTicket");break;case"manualRefresh":b.commands.executeCommand("ricwiz.manualRefresh");break;case"toggleAutoRefresh":b.commands.executeCommand("ricwiz.toggleAutoRefresh");break;case"openHistory":b.commands.executeCommand("ricwiz.openHistory");break}})}conflictState=null;setConflictState(e){this.conflictState=e,this.updateView()}updateBranch(e,i,n=[],r=[],p=[],a=[],u=""){this.webviewView&&(this.currentBranchCache=e,this.currentBranchIsMergedCache=i,this.relatedBranchesCache=n,this.commitsCache=r,this.baseBranchesCache=p,this.recentTicketsCache=a,this.ticketTitleCache=u,this.updateView())}currentBranchCache="";currentBranchIsMergedCache=!1;relatedBranchesCache=[];commitsCache=[];baseBranchesCache=[];recentTicketsCache=[];ticketTitleCache="";currentPage="main";blameDataCache=null;jiraDataCache=null;dashboardDataCache=null;autoRefreshEnabled=!0;setBlameData(e){this.blameDataCache=e}setJiraData(e){this.jiraDataCache=e}setDashboardData(e){this.dashboardDataCache=e}setAutoRefresh(e){this.autoRefreshEnabled=e,this.updateView()}isAutoRefreshEnabled(){return this.autoRefreshEnabled}setPage(e){this.currentPage=e,this.updateView()}updateView(){if(!this.webviewView)return;let e=this.webviewView.webview.asWebviewUri(b.Uri.joinPath(this._extensionUri,"resources","logo.png"));this.webviewView.webview.html=this._getHtmlForWebview(e,this.currentBranchCache,this.relatedBranchesCache,this.commitsCache,this.baseBranchesCache,this.recentTicketsCache,this.currentPage)}_getHtmlForWebview(e,i,n,r,p,a,u){let m=r.length>0?`
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
        `:"",c=`
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
                ${c}
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
            </html>`}if(u==="blame"){let o=this.blameDataCache;return`<!DOCTYPE html>
            <html lang="en">
            <head>
                <meta charset="UTF-8">
                <meta name="viewport" content="width=device-width, initial-scale=1.0">
                <title>Ricwiz Blame</title>
                ${c}
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
            </html>`}if(u==="jira"){let o=this.jiraDataCache,s=o?.ticketId||"Jira",d=o?.summary||"No Title",l=o?.description||"No description provided.";return`<!DOCTYPE html>
            <html lang="en">
            <head>
                <meta charset="UTF-8">
                <meta name="viewport" content="width=device-width, initial-scale=1.0">
                <title>Ricwiz Jira Details</title>
                ${c}
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
                    <div class="jira-title">${C(d)}</div>
                    <div class="jira-desc">${C(l)}</div>
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
            </html>`}if(u==="dashboard"){let o=this.dashboardDataCache||{queries:[],selectedIndex:0,results:[],error:null},s=o.queries.map((l,g)=>`
                <option value="${g}" ${g===o.selectedIndex?"selected":""}>${C(l.name)}</option>
            `).join(""),d=o.error?`
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
                        ${o.results.map(l=>`
                            <tr style="border-bottom: 1px solid var(--vscode-panel-border); cursor: pointer;" class="tr-hover" onclick="sendCommand('openJiraDetailsForId', '${C(l.key)}')">
                                <td style="padding: 6px; font-weight: bold; color: var(--vscode-textLink-foreground); white-space: nowrap;">${C(l.key)}</td>
                                <td style="padding: 6px; overflow: hidden; text-overflow: ellipsis; max-width: 150px; white-space: nowrap;" title="${C(l.summary)}">${C(l.summary)}</td>
                                <td style="padding: 6px; white-space: nowrap;">
                                    <span style="background: var(--vscode-badge-background); color: var(--vscode-badge-foreground); padding: 2px 4px; border-radius: 3px; font-size: 9px;">${C(l.status)}</span>
                                </td>
                                <td style="padding: 6px; white-space: nowrap; text-align: center;">
                                    ${l.branch?`
                                        <button class="icon-button" style="background-color: var(--vscode-button-secondaryBackground); color: var(--vscode-button-secondaryForeground); font-size: 10px; padding: 2px 6px;" title="Checkout ${C(l.branch)}" onclick="event.stopPropagation(); sendCommand('checkout', { branch: '${C(l.branch)}' })">
                                            \u{1F33F} Checkout
                                        </button>
                                    `:`
                                        <button class="icon-button" style="background-color: var(--vscode-button-background); color: var(--vscode-button-foreground); font-size: 10px; padding: 2px 6px;" title="Create Branch for ${C(l.key)}" onclick="event.stopPropagation(); sendCommand('createBranchForTicket', '${C(l.key)}')">
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
                ${c}
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
                    ${d}
                </div>

                <script>
                    const vscode = acquireVsCodeApi();
                    function sendCommand(command, args) {
                        vscode.postMessage({ command, args });
                    }
                </script>
            </body>
            </html>`}return u==="devtools"?`<!DOCTYPE html>
            <html lang="en">
            <head>
                <meta charset="UTF-8">
                <meta name="viewport" content="width=device-width, initial-scale=1.0">
                <title>Ricwiz DevTools</title>
                ${c}
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
            ${c}
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
                                            ${o.mrUrl?`<span onclick="event.stopPropagation(); sendCommand('openExternal', '${o.mrUrl}');" title="Open Merge Request" style="cursor: pointer; font-size: 10px;">\u{1F517}</span>`:""}
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

            ${p.length>0?`
                <div style="display: flex; gap: 4px; margin-bottom: 16px; flex-wrap: wrap; justify-content: center;">
                    ${p.map(o=>`
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
        </html>`}}});function it(t){ne=t.secrets}async function st(t){if(!ne)throw new Error("SecretStorage is not initialized.");await ne.store("ricwiz.jiraApiToken",t)}async function nt(){if(!ne)throw new Error("SecretStorage is not initialized.");return await ne.get("ricwiz.jiraApiToken")}async function rt(t){if(!ne)throw new Error("SecretStorage is not initialized.");await ne.store("ricwiz.gitlabApiToken",t)}async function _e(){if(!ne)throw new Error("SecretStorage is not initialized.");return await ne.get("ricwiz.gitlabApiToken")}var ne,xe=k(()=>{"use strict"});var Se={};et(Se,{checkBranchExists:()=>pe,exec:()=>f,extractTicketSuggestion:()=>lt,getCurrentBranch:()=>D,getWorkspaceCwd:()=>y,normalizeTicketId:()=>mt,promptForTicketId:()=>N,resolvePrefix:()=>dt,ricwizLogger:()=>M});function y(){let t=ke.workspace.workspaceFolders;if(t)return t[0].uri.fsPath}async function D(t){try{let{stdout:e}=await f("git branch --show-current",{cwd:t});return e.trim()}catch{return""}}function dt(t,e){if(!t.includes(e)){let i=t.match(/([A-Z]+-)\d+/i);if(i)return i[1].toUpperCase()}return e}function lt(t,e,i=!1){let n=t.match(new RegExp(`(${e}\\d+)`,"i"));return n?n[1].toUpperCase():t.includes(e)&&!t.includes("-to-")?t.substring(t.indexOf(e)):i&&t.includes("-to-")?t.substring(t.indexOf(e)).split("-to-")[0]:""}function mt(t,e){let i=t.trim();return/^\d/.test(i)?`${e}${i}`.toUpperCase():i.toUpperCase()}async function N(t,e){let i=ke.workspace.getConfiguration("ricwiz"),n=e?.prefix??i.get("ticketPrefix","SFPSCA-"),r=await D(t),p=dt(r,n),a=e?.suggestedValue??lt(r,p,e?.handleToSuffix),u=await ke.window.showInputBox({prompt:e?.prompt||"Enter the full ticket ID (e.g., SCPSCA-1234) or just the number",placeHolder:e?.placeHolder||"Ticket ID or number",value:a});return u?{ticketId:mt(u,p),currentBranch:r,prefix:p}:void 0}async function pe(t,e){try{return await f(`git show-ref --verify --quiet refs/heads/${e}`,{cwd:t}),!0}catch{}try{return await f(`git show-ref --verify --quiet refs/remotes/origin/${e}`,{cwd:t}),!0}catch{}return!1}var ke,at,ct,Xo,M,f,$=k(()=>{"use strict";ke=v(require("vscode")),at=v(require("child_process")),ct=v(require("util")),Xo=ct.promisify(at.exec),M=ke.window.createOutputChannel("Ricwiz"),f=async(t,e)=>{M.appendLine(`[EXEC] ${t}`);let i=await Xo(t,{maxBuffer:50*1024*1024,...e});return{stdout:i.stdout.toString(),stderr:i.stderr.toString()}}});async function ut(){let t=y();if(!t){U.window.showErrorMessage("Ricwiz: Open a workspace that is a Git repository.");return}let i=U.workspace.getConfiguration("ricwiz").get("ticketSourceBranch","main");await U.window.withProgress({location:U.ProgressLocation.Notification,title:`Ricwiz: Finding deleted files compared to origin/${i}...`,cancellable:!1},async()=>{try{let{stdout:n}=await f(`git diff --name-only --diff-filter=D origin/${i}...HEAD`,{cwd:t}),r=n.split(`
`).map(d=>d.trim()).filter(d=>d.length>0);if(r.length===0){U.window.showInformationMessage(`Ricwiz: No deleted files found compared to origin/${i}.`);return}let p={},a=(d,l)=>{p[d]||(p[d]=[]),p[d].includes(l)||p[d].push(l)};for(let d of r){let l=d.replace(/\\/g,"/");if(l.includes("/classes/")){let g=l.match(/\/classes\/([^/.]+)\.cls/);g&&a("ApexClass",g[1])}else if(l.includes("/triggers/")){let g=l.match(/\/triggers\/([^/.]+)\.trigger/);g&&a("ApexTrigger",g[1])}else if(l.includes("/lwc/")){let g=l.match(/\/lwc\/([^/]+)\//);g&&a("LightningComponentBundle",g[1])}else if(l.includes("/aura/")){let g=l.match(/\/aura\/([^/]+)\//);g&&a("AuraDefinitionBundle",g[1])}else if(l.includes("/objects/")&&l.includes("/fields/")){let g=l.match(/\/objects\/([^/]+)\//),h=l.match(/\/fields\/([^/.]+)\.field/);g&&h&&a("CustomField",`${g[1]}.${h[1]}`)}else if(l.includes("/objects/")){let g=l.match(/\/objects\/([^/.]+)\.object/);g&&a("CustomObject",g[1])}else if(l.includes("/layouts/")){let g=l.match(/\/layouts\/([^/.]+)\.layout/);g&&a("Layout",g[1])}else if(l.includes("/flows/")){let g=l.match(/\/flows\/([^/.]+)\.flow/);g&&a("Flow",g[1])}else if(l.includes("/permissionsets/")){let g=l.match(/\/permissionsets\/([^/.]+)\.permissionset/);g&&a("PermissionSet",g[1])}else if(l.includes("/profiles/")){let g=l.match(/\/profiles\/([^/.]+)\.profile/);g&&a("Profile",g[1])}else if(l.includes("/customMetadata/")){let g=l.match(/\/customMetadata\/([^/.]+)\.md/);g&&a("CustomMetadata",g[1])}else if(l.includes("/flexipages/")){let g=l.match(/\/flexipages\/([^/.]+)\.flexipage/);g&&a("FlexiPage",g[1])}}if(Object.keys(p).length===0){U.window.showInformationMessage("Ricwiz: Found deleted files in Git, but none mapped to recognizable Salesforce metadata.");return}let u=`<?xml version="1.0" encoding="UTF-8"?>
<Package xmlns="http://soap.sforce.com/2006/04/metadata">
`;for(let d of Object.keys(p).sort()){u+=`    <types>
`;for(let l of p[d].sort())u+=`        <members>${l}</members>
`;u+=`        <name>${d}</name>
    </types>
`}u+=`    <version>58.0</version>
</Package>`;let m=Ne.join(t,"destructiveChanges");ge.existsSync(m)||ge.mkdirSync(m);let c=Ne.join(m,"destructiveChanges.xml"),o=Ne.join(m,"package.xml");ge.writeFileSync(c,u,"utf8"),ge.existsSync(o)||ge.writeFileSync(o,`<?xml version="1.0" encoding="UTF-8"?>
<Package xmlns="http://soap.sforce.com/2006/04/metadata">
    <version>58.0</version>
</Package>`,"utf8");let s=await U.workspace.openTextDocument(c);await U.window.showTextDocument(s),U.window.showInformationMessage("Ricwiz: destructiveChanges.xml generated successfully!")}catch(n){U.window.showErrorMessage(`Ricwiz: Error generating destructive changes: ${n.message}`)}})}var U,Ne,ge,pt=k(()=>{"use strict";U=v(require("vscode")),Ne=v(require("path")),ge=v(require("fs"));$()});async function gt(){let t=y();if(!t)return;let i=te.workspace.getConfiguration("ricwiz").get("ticketSourceBranch","main");await te.window.withProgress({location:te.ProgressLocation.Notification,title:"Ricwiz: Finding Apex Tests to run...",cancellable:!1},async()=>{try{let{stdout:n}=await f(`git diff --name-status origin/${i}...HEAD`,{cwd:t}),r=n.split(`
`).map(d=>d.trim()).filter(d=>d.length>0),p=new Set,a=new Set;for(let d of r){let l=d.split(/\s+/);if(l[0].startsWith("D"))continue;let g=l[1];if(g&&g.endsWith(".cls")){let h=g.match(/\/classes\/([^/.]+)\.cls/);if(h){let w=h[1];w.toLowerCase().endsWith("test")?p.add(w):a.add(w)}}}for(let d of a)p.add(`${d}Test`);if(p.size===0){te.window.showInformationMessage("Ricwiz: No Apex Classes were modified in this branch.");return}let u=Array.from(p).map(d=>({label:`$(beaker) ${d}`,description:"Apex Test Class"})),m=await te.window.showQuickPick(u,{canPickMany:!0,title:"Select Test Classes to Run",placeHolder:"Select tests..."});if(!m||m.length===0)return;let o=`sf apex run test -n ${m.map(d=>d.label.replace("$(beaker) ","").trim()).join(",")} -r human -w 30`,s=te.window.createTerminal("Ricwiz: Smart Tests");s.show(),s.sendText(o)}catch(n){te.window.showErrorMessage(`Ricwiz: Error finding tests: ${n.message}`)}})}var te,ft=k(()=>{"use strict";te=v(require("vscode"));$()});var we,ht=k(()=>{"use strict";we=class{static isValidShellArg(e){return e?/^[a-zA-Z0-9\-_/.]+$/.test(e):!1}}});var Pe,wt,Ue,A,re=k(()=>{"use strict";Pe=v(require("vscode")),wt=v(require("path")),Ue=v(require("fs")),A=class t{style;upstreamRemote;originRemote;ticketSourceBranch;ticketPrefix;environments;static baseConfig=Pe.workspace.getConfiguration("ricwiz");activeProfile;profileName;constructor(e){this.activeProfile=e,this.profileName=e?.name;let i=t.baseConfig;this.style=e?.workflowStyle||i.get("workflowStyle","standard"),this.style==="multi-remote"?(this.upstreamRemote=e?.upstreamRemote||i.get("upstreamRemote","salesforce-master"),this.originRemote=e?.originRemote||i.get("originRemote","origin")):(this.upstreamRemote="origin",this.originRemote="origin"),this.ticketSourceBranch=e?.ticketSourceBranch||i.get("ticketSourceBranch","main"),this.ticketPrefix=e?.ticketPrefix||i.get("ticketPrefix","SFPSCA-");let n=[{name:"Qual",sourceBranch:"quality"},{name:"Val",sourceBranch:"validation"},{name:"Prod",sourceBranch:"main"}];this.environments=e?.environments||i.get("environments",n)}getConfig(e,i){return this.activeProfile&&this.activeProfile[e]!==void 0?this.activeProfile[e]:t.baseConfig.get(e,i)}static async initialize(e,i){let n=t.baseConfig.get("profiles",[]),r=wt.join(e,"ricwiz.json");if(Ue.existsSync(r))try{let p=Ue.readFileSync(r,"utf-8"),a=JSON.parse(p);a&&Array.isArray(a.profiles)&&(n=[...n,...a.profiles])}catch(p){Pe.window.showErrorMessage(`Ricwiz: Error parsing ricwiz.json: ${p.message}`)}if(n.length>0){if(!i?.forcePrompt)try{let{exec:m}=($(),ue(Se)),{stdout:c}=await m("git branch --show-current",{cwd:e}),o=c.trim(),s=o;o.includes("-to-")&&(s=o.split("-to-")[0]);let{stdout:d}=await m(`git config branch.${s}.ricwiz-profile`,{cwd:e}),l=d.trim();if(l){let g=n.find(h=>h.name===l);if(g)return new t(g)}}catch{}let p=n.map(m=>m.name),a=await Pe.window.showQuickPick(p,{placeHolder:"Ricwiz: Select Workflow Profile",ignoreFocusOut:!0});if(!a)return;let u=n.find(m=>m.name===a);return new t(u)}return new t}buildUpstreamPath(e){return e.includes("/")?e:`${this.upstreamRemote}/${e}`}getFetchRemote(e){return e.includes("/")?e.split("/")[0]:this.upstreamRemote}getFetchBranch(e){return e.includes("/")?e.substring(e.indexOf("/")+1):e}}});async function vt(t){let e=y();if(!e){B.window.showErrorMessage("Open a folder or workspace that is a Git repository.");return}let i=await A.initialize(e,{forcePrompt:!0});if(!i)return;let n=typeof t=="string"?t:void 0,r=await N(e,{prefix:i.ticketPrefix,suggestedValue:n});if(!r){B.window.showErrorMessage("Branch creation cancelled: Ticket not provided.");return}let{ticketId:p}=r,a=i.environments,u="all",m=[{label:"Create Main Branch & Environments",description:"Creates the main ticket branch and all environment branches",value:"all"},{label:"Create Main Branch Only",description:"Creates only the main ticket branch (skips environments)",value:"mainOnly"},{label:"Create Environments Only",description:"Creates only the environment branches (skip main branch)",value:"envs"}];if(a.length>0){let s=await B.window.showQuickPick(m,{placeHolder:"Ricwiz: What do you want to create?",ignoreFocusOut:!0});if(!s)return;u=s.value}let c=i.ticketSourceBranch;if(u==="all"||u==="mainOnly"){let s=[];try{let{stdout:h}=await f('git branch --all --format="%(refname:short)"',{cwd:e});s=h.split(`
`).map(w=>w.trim()).filter(w=>w&&w!=="origin"),s=[...new Set(s)]}catch{}let d=B.window.createQuickPick();d.title="Ricwiz: Ticket Source Branch",d.placeholder="Confirm or change the source branch for this ticket",d.value=i.ticketSourceBranch,d.ignoreFocusOut=!0;let l=()=>{let h=d.value.trim(),w=[];h&&w.push({label:h,description:"Use typed branch"}),w.push(...s.map(R=>({label:R}))),d.items=w};d.onDidChangeValue(l),l();let g=await new Promise(h=>{d.onDidAccept(()=>{let w=d.selectedItems[0];h(w?w.label:d.value),d.hide()}),d.onDidHide(()=>h(void 0)),d.show()});if(!g){B.window.showInformationMessage("Branch creation cancelled.");return}c=g.trim()}let o=p;if(!we.isValidShellArg(o)){B.window.showErrorMessage(`Invalid format for ticket ID: ${o}`);return}if(!we.isValidShellArg(c)){B.window.showErrorMessage(`Invalid format for ticketSourceBranch in settings: ${c}`);return}for(let s of a){if(!we.isValidShellArg(s.name)){B.window.showErrorMessage(`Invalid format for environment name in settings: ${s.name}`);return}if(!we.isValidShellArg(s.sourceBranch)){B.window.showErrorMessage(`Invalid format for environment sourceBranch in settings: ${s.sourceBranch}`);return}}try{await f("git status",{cwd:e})}catch{B.window.showErrorMessage("The opened folder does not appear to be a valid Git repository.");return}try{await B.window.withProgress({location:B.ProgressLocation.Notification,title:"Ricwiz: Creating Branches",cancellable:!1},async s=>{let d=[];s.report({message:"Checking remote status (git fetch)...",increment:10});try{await f("git fetch",{cwd:e})}catch{}try{if(u==="all"||u==="mainOnly"){if(s.report({message:`Creating main branch ${o}...`,increment:10}),await pe(e,o))B.window.showInformationMessage(`Ricwiz: The branch ${o} already exists. Skipping creation...`),await f(`git checkout ${o}`,{cwd:e});else try{let l=i.getFetchRemote(c),g=i.getFetchBranch(c),h=i.buildUpstreamPath(c);await f(`git fetch ${l} ${g}`,{cwd:e}),await f(`git checkout -b ${o} ${h}`,{cwd:e}),d.push(o)}catch{try{await f(`git checkout -b ${o} ${c}`,{cwd:e}),d.push(o)}catch{throw new Error(`Could not create main branch '${o}' from '${c}'. Does the source branch exist?`)}}try{await f(`git config branch.${o}.ricwiz-source "${c}"`,{cwd:e}),i.profileName&&await f(`git config branch.${o}.ricwiz-profile "${i.profileName}"`,{cwd:e})}catch{}}if(u==="all"||u==="envs"){let l=50/(a.length||1);for(let g of a){let h=`${p}-to-${g.name}`,w=g.sourceBranch;if(s.report({message:`Processing environment branch ${h}...`,increment:l}),!await pe(e,h))try{let R=i.buildUpstreamPath(w);await f(`git checkout -b ${h} ${R}`,{cwd:e}),d.push(h)}catch{try{await f(`git checkout -b ${h} ${w}`,{cwd:e}),d.push(h)}catch{throw new Error(`Could not create environment branch '${h}' from '${w}'. Does the source branch exist?`)}}}}s.report({message:`Publishing branches to ${i.originRemote}...`,increment:10});for(let l of d)try{await f(`git push -u ${i.originRemote} ${l}`,{cwd:e})}catch{B.window.showWarningMessage(`Ricwiz: Branch ${l} was created locally but could not be pushed to ${i.originRemote}.`)}if(u==="all"||u==="mainOnly"){s.report({message:`Switching to ${o}...`,increment:10});try{await f(`git checkout ${o}`,{cwd:e})}catch{}}s.report({increment:100}),B.window.showInformationMessage("Ricwiz: All set! You can start working on your branches! \u{1F680}")}catch(l){if(B.window.showErrorMessage(`Ricwiz Branch Creation Failed: ${l.message}`),d.length>0){try{await f(`git checkout ${c}`,{cwd:e})}catch{}for(let g of d)try{await f(`git branch -D ${g}`,{cwd:e})}catch{}B.window.showWarningMessage(`Ricwiz: Rolled back (deleted) ${d.length} branch(es) locally due to failure.`)}}})}catch(s){B.window.showErrorMessage(`Ricwiz general error: ${s.message}`)}}var B,bt=k(()=>{"use strict";B=v(require("vscode"));$();ht();re()});async function ve(t,e,i,n){n&&n.report({message:"CONFLICT! Resolve & click 'Commit & Continue' in Ricwiz panel."});let r=!1,p=!1,a=async()=>{try{let{stdout:o}=await f("git status --porcelain",{cwd:t});return o.split(`
`).filter(s=>{let d=s.substring(0,2);return["UD","DU","DD","AU","UA"].includes(d)}).map(s=>s.substring(3).trim())}catch{return[]}},u=async()=>{try{let{stdout:o}=await f("git status --porcelain",{cwd:t}),s=d=>d==="UU"?"Both Modified":d==="UD"?"Deleted by them":d==="DU"?"Deleted by us":d==="DD"?"Both Deleted":d==="AA"?"Both Added":d==="AU"?"Added by us":d==="UA"?"Added by them":"Conflicted";return o.split(`
`).map(d=>d.trimRight()).filter(d=>d.length>2).filter(d=>{let l=d.substring(0,2);return["UU","AA","UD","DU","AU","UA","DD"].includes(l)}).map(d=>{let l=d.substring(0,2);return{file:d.substring(3).trim(),state:s(l)}})}catch{return[]}},m=async()=>{if(r)return;let o=await a(),s=await u(),{webviewProvider:d}=(Je(),ue(je));d&&d.setConflictState({isConflict:!0,sourceStr:e,targetStr:i,deletionsCount:o.length,files:s})},c=oe.commands.registerCommand("ricwiz.conflictAction",async o=>{if(o==="abortDeploy")p=!0;else if(o==="resolveDeletions"){try{let d=(await a()).map(g=>({label:g})),l=await oe.window.showQuickPick(d,{canPickMany:!0,placeHolder:"Select conflicted files to DELETE",title:"Ricwiz: Delete Conflicted Files"});if(l&&l.length>0){for(let g of l)try{await f(`git rm --force "${g.label}"`,{cwd:t})}catch{}oe.window.showInformationMessage(`Ricwiz: Deleted ${l.length} conflicted file(s).`)}}catch(s){oe.window.showErrorMessage(`Ricwiz: Error. (${s.message})`)}m()}else if(o==="commitAndContinue")try{let d=(await a()).filter(g=>yt.existsSync(xt.join(t,g)));if(d.length>0&&await oe.window.showWarningMessage(`Wait! There are ${d.length} file(s) with deletion conflicts that are still on your disk.

If you commit now, you will KEEP them in the project.

Are you sure you want to KEEP them?`,{modal:!0},"Yes, KEEP them","No, let me DELETE them")!=="Yes, KEEP them"){m();return}let l=!1;try{let{stdout:g}=await f('git grep -E "^<<<<<<< "',{cwd:t});g.trim().length>0&&(l=!0)}catch{}if(l){oe.window.showErrorMessage("Ricwiz: You still have unresolved conflict markers (<<<<<<<) in your files. Please resolve them first!"),m();return}await f("git add .",{cwd:t}),await f("git commit --no-edit",{cwd:t})}catch(s){oe.window.showErrorMessage(`Ricwiz: Could not commit automatically. (${s.message})`),m()}});for(m();;){if(p){r=!0,c.dispose(),(Je(),ue(je)).webviewProvider?.setConflictState(null);try{await f("git merge --abort",{cwd:t})}catch{}return!1}try{let{stdout:o}=await f("git status --porcelain",{cwd:t});if(o.trim().length===0)return r=!0,c.dispose(),(Je(),ue(je)).webviewProvider?.setConflictState(null),oe.window.showInformationMessage("Ricwiz: Changes committed!"),!0}catch{}await new Promise(o=>setTimeout(o,2e3))}}var oe,yt,xt,We=k(()=>{"use strict";oe=v(require("vscode")),yt=v(require("fs")),xt=v(require("path"));$()});async function kt(){let t=y();if(!t){F.window.showErrorMessage("Ricwiz: Open a folder or workspace that is a Git repository.");return}try{await f("git status",{cwd:t})}catch{F.window.showErrorMessage("Ricwiz: The opened folder does not appear to be a valid Git repository.");return}let e=await A.initialize(t);if(!e)return;let i=e.environments,n=await N(t,{prefix:e.ticketPrefix});if(!n){F.window.showErrorMessage("Operation cancelled: Ticket not provided.");return}let{ticketId:r,currentBranch:p}=n,a=r;if(!await pe(t,a)){F.window.showErrorMessage(`Ricwiz: Main branch '${a}' does not exist! Prepare deploy is only available when a main ticket branch is used.`);return}let u=e.getConfig("defaultReviewers",""),m="";try{let{stdout:c}=await f(`git config branch.${r}.ricwiz-reviewers`,{cwd:t});m=c.trim()}catch{}if(u.trim()){let c=await F.window.showInputBox({prompt:"Ricwiz: Reviewers for this deploy (optional, comma-separated)",placeHolder:"e.g. @joao, 123456",value:m||u,ignoreFocusOut:!0});if(c===void 0)return;try{c.trim()?await f(`git config branch.${r}.ricwiz-reviewers "${c.trim()}"`,{cwd:t}):m&&await f(`git config --unset branch.${r}.ricwiz-reviewers`,{cwd:t})}catch{}}await F.window.withProgress({location:F.ProgressLocation.Notification,title:"Ricwiz: Preparing Deploy",cancellable:!0},async(c,o)=>{let s=0,d=p,l=!1;o.onCancellationRequested(()=>{l=!0}),c.report({message:"Syncing remote information...",increment:10});try{await f("git fetch --all",{cwd:t});let h=10/(i.length||1);for(let w of i)try{if(l)throw new Error("Aborted");c.report({message:`Fetching ${w.sourceBranch}...`,increment:h});let R=e.getFetchRemote(w.sourceBranch),S=e.getFetchBranch(w.sourceBranch);await f(`git fetch ${R} ${S}:${S}`,{cwd:t})}catch{}}catch{}let g=60/(i.length||1);for(let h of i){if(l)break;let w=`${r}-to-${h.name}`,R=h.sourceBranch;try{c.report({message:`Processing ${w}...`,increment:g/4}),await f(`git checkout ${w}`,{cwd:t});try{await f(`git pull ${e.originRemote} ${w}`,{cwd:t})}catch{}let S=async ee=>{try{await f(`git merge ${ee}`,{cwd:t})}catch(P){let L=!1;try{let{stdout:W}=await f("git ls-files -u",{cwd:t});W.trim().length>0&&(L=!0)}catch{}let J=((P.stdout||"")+(P.stderr||"")+(P.message||"")).toLowerCase();if(L||J.includes("conflict")||J.includes("conflit")){if(!await ve(t,ee,w,c))throw l=!0,new Error("Deploy aborted by user.")}else throw P}};c.report({message:`Merging ${R} into ${w}...`,increment:g/4});let le=e.getFetchRemote(R),fe=e.getFetchBranch(R),he=e.buildUpstreamPath(R);if(await f(`git fetch ${le} ${fe}`,{cwd:t}),await S(he),c.report({message:`Merging ${a} into ${w}...`,increment:g/4}),await S(a),l)break;c.report({message:`Pushing ${w}...`,increment:g/4}),await f(`git push ${e.originRemote} ${w}`,{cwd:t}),s++}catch(S){S.message.includes("aborted")?F.window.showInformationMessage("Ricwiz: Deploy cancelled."):F.window.showErrorMessage(`Ricwiz: Failed to process branch ${w}. Detail: ${S.message}`);return}}if(!l){c.report({message:"Finishing up...",increment:10});let h=d;try{await f(`git show-ref --verify --quiet refs/heads/${a}`,{cwd:t}),h=a}catch{}try{let w=await D(t);h&&h!==w?(await f(`git checkout ${h}`,{cwd:t}),F.window.showInformationMessage(`Ricwiz: Operation complete. Back on branch ${h}.`)):F.window.showInformationMessage("Ricwiz: Operation complete.")}catch{F.window.showInformationMessage("Ricwiz: Operation complete.")}}})}var F,Ct=k(()=>{"use strict";F=v(require("vscode"));$();We();re()});async function $t(t=!1){let e=y();if(!e)return;let i=await A.initialize(e);if(!i)return;let n=await N(e,{prompt:"Enter the full ticket ID for the Merge Requests (e.g., SCPSCA-1234) or just the number"});if(!n)return;let{ticketId:r}=n,a=Y.workspace.getConfiguration("ricwiz").get("gitlabUrlOverride",""),u="";if(a&&a.trim()!=="")u=a.trim().replace(/\/+$/,"");else{let o="";try{let{stdout:s}=await f("git remote get-url origin",{cwd:e});o=s.trim()}catch{Y.window.showErrorMessage("Ricwiz: Could not get the remote origin URL. Please configure the URL manually in the extension settings.");return}u=o,u.endsWith(".git")&&(u=u.slice(0,-4)),u.startsWith("git@")&&(u=u.replace("git@","").replace(":","/"),u=`https://${u}`)}let m=[],c=i.ticketSourceBranch;try{let{stdout:o}=await f(`git config branch.${r}.ricwiz-source`,{cwd:e});o.trim()&&(c=o.trim())}catch{}if(i.environments.length===0)m.push({source:r,target:c});else for(let o of i.environments)m.push({source:`${r}-to-${o.name}`,target:o.sourceBranch});for(let o of m){let s=`${u}/-/merge_requests/new?merge_request[source_branch]=${o.source}&merge_request[target_branch]=${o.target}`;t?Y.commands.executeCommand("simpleBrowser.show",s):Y.env.openExternal(Y.Uri.parse(s))}Y.window.showInformationMessage(`Ricwiz: Opening ${t?"VS Code browser":"external browser"} for Merge Requests!`)}async function zt(){return $t(!1)}async function Rt(){return $t(!0)}var Y,St=k(()=>{"use strict";Y=v(require("vscode"));$();re()});async function Pt(t=!1){let e=y();if(!e)return;let i=Z.workspace.getConfiguration("ricwiz"),n=i.get("jiraUrl","");if(!n||n.trim()===""){Z.window.showErrorMessage("Ricwiz: Jira URL is not configured. Please set it in the extension settings (e.g., https://jira.company.com/browse/).");return}let{getCurrentBranch:r,resolvePrefix:p,extractTicketSuggestion:a}=($(),ue(Se)),u=await r(e),m=i.get("ticketPrefix","SFPSCA-"),c=p(u,m),s=a(u,c,!0);if(s){let{normalizeTicketId:l}=($(),ue(Se));s=l(s,c)}else{let l=await N(e,{prompt:"Ricwiz could not detect the ticket from the branch name. Enter Jira ticket ID (e.g. SFPSCA-1234)",handleToSuffix:!0});if(!l)return;s=l.ticketId}let d=n.trim();d.endsWith("/")||(d+="/"),d+=s,t?Z.commands.executeCommand("simpleBrowser.show",d):Z.env.openExternal(Z.Uri.parse(d)),Z.window.showInformationMessage(`Ricwiz: Opening Jira Ticket ${s} in ${t?"VS Code":"browser"}!`)}async function Bt(){return Pt(!1)}async function Et(){return Pt(!0)}var Z,Tt=k(()=>{"use strict";Z=v(require("vscode"));$()});async function ei(){let t=Dt.workspace.getConfiguration("ricwiz"),e=t.get("jiraUrl",""),i=t.get("jiraEmail","")?.trim(),n=(await nt())?.trim();if(!e||!n)throw new Error('Jira API Token is not securely configured. Please run the "Ricwiz: Set Secure Jira API Token" command.');let r=e;r.includes("/browse")&&(r=r.split("/browse")[0]),r.endsWith("/")&&(r=r.slice(0,-1));let p=i?`Basic ${Buffer.from(`${i}:${n}`).toString("base64")}`:`Bearer ${n}`;return{baseUrl:r,headerAuth:p}}async function Ce(t,e,i){let{baseUrl:n,headerAuth:r}=await ei(),p=new URL(`${n}${e}`);return new Promise((a,u)=>{let m=Mt.request(p,{method:t,headers:{Authorization:r,Accept:"application/json",...i?{"Content-Type":"application/json"}:{}}},c=>{let o="";c.on("data",s=>o+=s),c.on("end",()=>{if(c.statusCode===401||c.statusCode===403)return u(new Error(`Authentication failed (HTTP ${c.statusCode}). Please check your Jira settings.`));if(c.statusCode&&c.statusCode>=400){let s="";try{let d=JSON.parse(o);d.errorMessages&&d.errorMessages.length>0&&(s=d.errorMessages.join(", "))}catch{}return c.statusCode===404||c.statusCode===410?u(new Error(`Ticket not found or deleted (HTTP ${c.statusCode}). ${s}`)):u(new Error(`Jira API returned HTTP status ${c.statusCode}. ${s}`))}if(!o)return a({});try{let s=JSON.parse(o);a(s)}catch{u(new Error("Failed to parse Jira response."))}})});m.on("error",c=>u(new Error(`Network error: ${c.message}`))),i&&m.write(JSON.stringify(i)),m.end()})}async function $e(t){let e=await Ce("GET",`/rest/api/2/issue/${t}`);return e&&e.fields?{summary:e.fields.summary||"",description:e.fields.description||"No description provided."}:null}async function At(t){let e=await Ce("GET",`/rest/api/2/issue/${t}/transitions`);return e&&e.transitions?e.transitions.map(i=>({id:i.id,name:i.name})):[]}async function It(t,e){await Ce("POST",`/rest/api/2/issue/${t}/transitions`,{transition:{id:e}})}async function Lt(t,e){await Ce("POST",`/rest/api/2/issue/${t}/comment`,{body:e})}async function Ft(t,e){await Ce("PUT",`/rest/api/2/issue/${t}`,{update:{labels:[{add:e}]}})}async function Ot(t){let e=await Ce("POST","/rest/api/3/search/jql",{jql:t,maxResults:50,fields:["summary","status","assignee"]});return e&&e.issues?e.issues.map(i=>({key:i.key,summary:i.fields?.summary||"No Title",status:i.fields?.status?.name||"Unknown",assignee:i.fields?.assignee?.displayName||"Unassigned"})):[]}var Mt,Dt,Be=k(()=>{"use strict";Mt=v(require("https")),Dt=v(require("vscode"));xe()});async function Nt(t){let e=y();if(e)try{if(!await A.initialize(e))return;let r=(await D(e)).split("-to-")[0];if(!r){ie.window.showErrorMessage("Ricwiz: You are not currently on a valid ticket branch.");return}await ie.window.withProgress({location:ie.ProgressLocation.Notification,title:`Fetching details for ${r}...`,cancellable:!1},async p=>{let a=await $e(r);a?(t.setJiraData({ticketId:r,...a}),t.setPage("jira")):ie.window.showErrorMessage("Ricwiz: No data found for this ticket.")})}catch(i){i.message.includes("securely configured")?await ie.window.showErrorMessage(i.message,"Set Token Now")==="Set Token Now"&&ie.commands.executeCommand("ricwiz.setJiraToken"):ie.window.showErrorMessage(`Ricwiz Jira Error: ${i.message}`)}}var ie,Ut=k(()=>{"use strict";ie=v(require("vscode"));$();re();Be()});async function jt(t,e){let n=ae.workspace.getConfiguration("ricwiz").get("jiraDashboards",[]);if(e!==void 0&&(be=e),!n||n.length===0){t.setDashboardData({queries:[],selectedIndex:0,results:[],error:"No queries defined in settings. Go to Settings > Ricwiz > Jira Dashboards."}),t.setPage("dashboard");return}be>=n.length&&(be=0);let r=n[be];t.setDashboardData({queries:n,selectedIndex:be,results:[],error:"\u23F3 Loading tickets..."}),t.setPage("dashboard");try{let p=await Ot(r.jql),a=ae.workspace.workspaceFolders?.[0]?.uri.fsPath,u=[];if(a)try{let c=require("child_process"),s=require("util").promisify(c.exec),{stdout:d}=await s("git branch",{cwd:a});u=d.split(`
`).map(l=>l.replace("*","").trim()).filter(l=>l)}catch{}let m=p.map(c=>{let o=u.find(s=>s.includes(c.key));return{...c,branch:o||null}});t.setDashboardData({queries:n,selectedIndex:be,results:m,error:null}),t.setPage("dashboard")}catch(p){let a=p.message;(a.includes("ENOTFOUND")||a.includes("network"))&&(a="No Internet or Invalid URL"),t.setDashboardData({queries:n,selectedIndex:be,results:[],error:a}),t.setPage("dashboard")}}async function Jt(t,e){await ae.window.withProgress({location:ae.ProgressLocation.Notification,title:`Fetching details for ${e}...`,cancellable:!1},async()=>{try{let i=await $e(e);i?(t.setJiraData({ticketId:e,...i}),t.setPage("jira")):ae.window.showErrorMessage(`Ricwiz: No data found for ticket ${e}.`)}catch(i){ae.window.showErrorMessage(`Ricwiz Jira Error: ${i.message}`)}})}var ae,be,Wt=k(()=>{"use strict";ae=v(require("vscode"));Be();be=0});async function Qe(){let t=y();return!t||!await A.initialize(t,{forcePrompt:!1})?void 0:(await D(t)).split("-to-")[0]}async function qt(){try{let t=await Qe();if(!t){z.window.showErrorMessage("Ricwiz: You are not on a valid ticket branch.");return}let e=await z.window.withProgress({location:z.ProgressLocation.Notification,title:`Fetching available status for ${t}...`,cancellable:!1},()=>At(t));if(!e||e.length===0){z.window.showInformationMessage(`Ricwiz: No transitions available for ${t}.`);return}let i=e.map(r=>({label:r.name,id:r.id})),n=await z.window.showQuickPick(i,{placeHolder:`Select new status for ${t}`,ignoreFocusOut:!0});n&&(await z.window.withProgress({location:z.ProgressLocation.Notification,title:`Updating status to ${n.label}...`,cancellable:!1},()=>It(t,n.id)),z.window.showInformationMessage(`Ricwiz: Status for ${t} updated to ${n.label}.`))}catch(t){t.message.includes("securely configured")?z.window.showErrorMessage(t.message,"Set Token Now").then(e=>{e==="Set Token Now"&&z.commands.executeCommand("ricwiz.setJiraToken")}):z.window.showErrorMessage(`Ricwiz Jira Error: ${t.message}`)}}async function Gt(){try{let t=await Qe();if(!t){z.window.showErrorMessage("Ricwiz: You are not on a valid ticket branch.");return}let e=await z.window.showInputBox({prompt:`Add comment to ${t}`,placeHolder:"Type your comment here...",ignoreFocusOut:!0});e&&(await z.window.withProgress({location:z.ProgressLocation.Notification,title:`Adding comment to ${t}...`,cancellable:!1},()=>Lt(t,e)),z.window.showInformationMessage(`Ricwiz: Comment added to ${t}.`))}catch(t){t.message.includes("securely configured")?z.window.showErrorMessage(t.message,"Set Token Now").then(e=>{e==="Set Token Now"&&z.commands.executeCommand("ricwiz.setJiraToken")}):z.window.showErrorMessage(`Ricwiz Jira Error: ${t.message}`)}}async function Ht(){try{let t=await Qe();if(!t){z.window.showErrorMessage("Ricwiz: You are not on a valid ticket branch.");return}let e=await z.window.showInputBox({prompt:`Add a label to ${t}`,placeHolder:"e.g. Needs-Review, Bug, High-Priority",ignoreFocusOut:!0});e&&e.trim()&&(await z.window.withProgress({location:z.ProgressLocation.Notification,title:`Adding label to ${t}...`,cancellable:!1},()=>Ft(t,e.trim())),z.window.showInformationMessage(`Ricwiz: Label '${e.trim()}' added to ${t}.`))}catch(t){t.message.includes("securely configured")?z.window.showErrorMessage(t.message,"Set Token Now").then(e=>{e==="Set Token Now"&&z.commands.executeCommand("ricwiz.setJiraToken")}):z.window.showErrorMessage(`Ricwiz Jira Error: ${t.message}`)}}async function Vt(){let t=await z.window.showInputBox({prompt:"Enter your Jira API Token (or Personal Access Token). It will be securely stored in your OS keychain.",password:!0,ignoreFocusOut:!0});if(t)try{await st(t.trim()),z.window.showInformationMessage("Ricwiz: Jira API Token securely stored!")}catch(e){z.window.showErrorMessage(`Ricwiz: Failed to store token: ${e.message}`)}}var z,_t=k(()=>{"use strict";z=v(require("vscode"));$();re();Be();xe()});async function Qt(){let t=await j.window.showInputBox({prompt:"Enter your GitLab Personal Access Token",placeHolder:"glpat-xxxxxxxxxxxxxxxxxxxx",ignoreFocusOut:!0,password:!0});if(t&&t.trim()){let e=t.trim();await j.window.withProgress({location:j.ProgressLocation.Notification,title:"Ricwiz: Validating GitLab Token...",cancellable:!1},async()=>{try{let n=j.workspace.getConfiguration("ricwiz").get("gitlabUrlOverride","").trim();if(!n&&j.workspace.workspaceFolders)try{let{exec:m}=($(),ue(Se)),c=j.workspace.workspaceFolders[0].uri.fsPath,{stdout:o}=await m("git remote get-url origin",{cwd:c}),s=o.trim();s.startsWith("git@")&&(s=`https://${s.replace("git@","").replace(":","/")}`),s.endsWith(".git")&&(s=s.slice(0,-4)),n=s}catch{}n||(n="https://gitlab.com");let r=new URL(n),p=`${r.protocol}//${r.host}`,a=require("https"),u=await new Promise((m,c)=>{let o=a.request(new URL(`${p}/api/v4/user`),{method:"GET",timeout:5e3,headers:{"PRIVATE-TOKEN":e,Accept:"application/json"}},s=>{if(s.statusCode>=400)return c(new Error(`Status ${s.statusCode}`));let d="";s.on("data",l=>d+=l),s.on("end",()=>m(JSON.parse(d||"{}")))});o.on("error",c),o.on("timeout",()=>{o.destroy(),c(new Error("Timeout"))}),o.end()});await rt(e),j.window.showInformationMessage(`Ricwiz: \u2705 GitLab API Token saved and validated successfully for ${u.username||"user"}!`),j.commands.executeCommand("ricwiz.manualRefresh")}catch(i){j.window.showErrorMessage(`Ricwiz: \u274C Invalid token or cannot reach GitLab (${i.message}). Please check the token and try again.`)}})}}var j,Yt=k(()=>{"use strict";j=v(require("vscode"));xe()});async function Zt(){let t=y();if(!t){ce.window.showErrorMessage("Ricwiz: Open a folder or workspace that is a Git repository.");return}let e=await A.initialize(t);if(!e)return;let i=await N(t,{prefix:e.ticketPrefix,prompt:"Enter the full ticket ID to sync all branches for (e.g., SCPSCA-1234) or just the number"});if(!i)return;let{ticketId:n,currentBranch:r}=i;await ce.window.withProgress({location:ce.ProgressLocation.Notification,title:`Ricwiz: Syncing all branches for ${n}...`,cancellable:!1},async p=>{try{p.report({message:"Fetching from remote..."});try{await f("git fetch --all",{cwd:t})}catch{}let{stdout:a}=await f(`git branch --list "*${n}*"`,{cwd:t}),u=a.split(`
`).map(o=>o.replace("*","").trim()).filter(o=>o.length>0);if(u.length===0){ce.window.showWarningMessage(`Ricwiz: No local branches found for ${n}.`);return}let m=0,c=0;for(let o of u)if(p.report({message:`Syncing ${o}...`}),o===r)try{await f(`git pull ${e.originRemote} ${o}`,{cwd:t}),m++}catch(s){let d=!1;try{let{stdout:g}=await f("git ls-files -u",{cwd:t});g.trim().length>0&&(d=!0)}catch{}let l=((s.stdout||"")+(s.stderr||"")+(s.message||"")).toLowerCase();(d||l.includes("conflict")||l.includes("conflit"))&&await ve(t,`${e.originRemote}/${o}`,o,p)?m++:c++}else try{await f(`git fetch ${e.originRemote} ${o}:${o}`,{cwd:t}),m++}catch{try{await f(`git checkout ${o}`,{cwd:t});try{await f(`git pull ${e.originRemote} ${o}`,{cwd:t}),m++}catch(d){let l=!1;try{let{stdout:h}=await f("git ls-files -u",{cwd:t});h.trim().length>0&&(l=!0)}catch{}let g=((d.stdout||"")+(d.stderr||"")+(d.message||"")).toLowerCase();(l||g.includes("conflict")||g.includes("conflit"))&&await ve(t,`${e.originRemote}/${o}`,o,p)?m++:c++}await f(`git checkout ${r}`,{cwd:t})}catch{try{await f(`git checkout ${r}`,{cwd:t})}catch{}c++}}c>0?ce.window.showWarningMessage(`Ricwiz: Synced ${m}/${u.length} branches. ${c} branch(es) could not be synced (possible conflicts or diverged history).`):ce.window.showInformationMessage(`Ricwiz: \u{1F504} All ${m} branches for ${n} are up to date!`)}catch(a){ce.window.showErrorMessage(`Ricwiz: Sync failed: ${a.message}`)}})}var ce,Kt=k(()=>{"use strict";ce=v(require("vscode"));$();We();re()});async function Xt(){let t=y();if(!t){de.window.showErrorMessage("Ricwiz: Open a folder or workspace that is a Git repository.");return}try{await f("git status",{cwd:t})}catch{de.window.showErrorMessage("Ricwiz: The opened folder does not appear to be a valid Git repository.");return}let e=await A.initialize(t);if(!e)return;let i=e.environments,n=await N(t,{prefix:e.ticketPrefix});if(!n)return;let{ticketId:r,currentBranch:p}=n;await de.window.withProgress({location:de.ProgressLocation.Notification,title:"Ricwiz: Updating environment branches from their bases",cancellable:!0},async(a,u)=>{let m=0,c=p,o=!1;u.onCancellationRequested(()=>{o=!0}),a.report({message:"Syncing remote information...",increment:10});try{await f("git fetch --all",{cwd:t})}catch{}let s=80/(i.length||1);for(let d of i){if(o)break;let l=`${r}-to-${d.name}`,g=d.sourceBranch;if(await pe(t,l))try{a.report({message:`Processing ${l}...`,increment:s/2}),await f(`git checkout ${l}`,{cwd:t});try{a.report({message:`Merging ${g} into ${l}...`,increment:s/2});let h=e.getFetchRemote(g),w=e.getFetchBranch(g),R=e.buildUpstreamPath(g);await f(`git fetch ${h} ${w}`,{cwd:t}),await f(`git merge ${R}`,{cwd:t})}catch(h){let w=!1;try{let{stdout:S}=await f("git ls-files -u",{cwd:t});S.trim().length>0&&(w=!0)}catch{}let R=((h.stdout||"")+(h.stderr||"")+(h.message||"")).toLowerCase();if(w||R.includes("conflict")||R.includes("conflit")){let S=e.buildUpstreamPath(g);if(!await ve(t,S,l,a))throw o=!0,new Error("Update aborted by user.")}else throw h}if(o)break;m++}catch(h){h.message.includes("aborted")?de.window.showInformationMessage("Ricwiz: Update cancelled."):de.window.showErrorMessage(`Ricwiz: Failed to update branch ${l}. Detail: ${h.message}`);return}}if(!o){a.report({message:"Finishing up...",increment:10});try{let d=await D(t);c&&c!==d&&await f(`git checkout ${c}`,{cwd:t})}catch{}de.window.showInformationMessage(`Ricwiz: Successfully updated ${m} environment branches from their bases!`)}})}var de,eo=k(()=>{"use strict";de=v(require("vscode"));$();We();re()});async function to(){let t=y();if(!t){I.window.showErrorMessage("Ricwiz: Open a folder or workspace that is a Git repository.");return}let e=await D(t),i=I.workspace.getConfiguration("ricwiz");await I.window.withProgress({location:I.ProgressLocation.Notification,title:"Ricwiz: Scanning for unused local branches...",cancellable:!1},async()=>{try{await f("git fetch --prune",{cwd:t})}catch{}let n=[];try{let{stdout:s}=await f('git branch --format="%(refname:short)"',{cwd:t});n=s.split(`
`).map(d=>d.trim()).filter(d=>d.length>0)}catch{}if(n.length===0){I.window.showInformationMessage("Ricwiz: No local branches found.");return}let r=[];try{let{stdout:s}=await f('git branch -r --format="%(refname:short)"',{cwd:t});r=s.split(`
`).map(d=>d.trim().replace(/^origin\//,"").replace(/^[^\/]+\//,"")).filter(d=>d.length>0&&!d.includes("HEAD"))}catch{}let p=[];try{let{stdout:s}=await f('git for-each-ref --format="%(refname:short)|||%(upstream:track)" refs/heads/',{cwd:t});p=s.split(`
`).filter(d=>d.includes("[gone]")).map(d=>d.split("|||")[0].trim())}catch{}let a=n.filter(s=>!r.includes(s));if(a.length===0){I.window.showInformationMessage("Ricwiz: Your local repository is totally clean! All local branches exist on the remote.");return}let u=a.map(s=>{let d=p.includes(s),l=s===e,g="Not found on remote";return d&&(g="Deleted on remote [gone]"),l&&(g+=" (Current branch - will checkout main first)"),{label:s,description:g,picked:d&&!l}}),m=await I.window.showQuickPick(u,{canPickMany:!0,placeHolder:"Select local branches to delete",title:"Ricwiz: Delete Unused Branches"});if(!m||m.length===0){I.window.showInformationMessage("Ricwiz: No branches selected for deletion.");return}if(await I.window.showWarningMessage(`Ricwiz: Delete ${m.length} local branch(es)?
This cannot be undone!`,{modal:!0},"Yes, delete them")!=="Yes, delete them"){I.window.showInformationMessage("Ricwiz: Deletion cancelled.");return}let o=0;for(let s of m){let d=s.label;if(d===e){let l=i.get("ticketSourceBranch","main");try{await f(`git checkout ${l}`,{cwd:t}),e=l}catch{I.window.showWarningMessage(`Ricwiz: Could not switch away from ${d}. Skipping.`);continue}}try{await f(`git branch -D ${d}`,{cwd:t}),o++}catch{I.window.showWarningMessage(`Ricwiz: Could not delete local branch ${d}.`)}}I.window.showInformationMessage(`Ricwiz: \u{1F5D1}\uFE0F Cleaned up ${o} unused local branch(es).`)})}var I,oo=k(()=>{"use strict";I=v(require("vscode"));$()});async function ze(t){let e=y();e&&await K.window.withProgress({location:K.ProgressLocation.Notification,title:`Ricwiz: Switching to ${t}...`,cancellable:!1},async()=>{try{let i=await D(e),n=!1;try{let{stdout:p}=await f("git status --porcelain",{cwd:e});n=p.trim().length>0}catch{}if(n&&i)try{await f(`git stash push --include-untracked -m "ricwiz-auto:${i}"`,{cwd:e}),K.window.showInformationMessage(`Ricwiz: \u{1F4E6} Stashed changes from ${i}`)}catch{K.window.showWarningMessage("Ricwiz: Could not stash changes. Checkout may fail if there are conflicts.")}let r=t;t.includes("/")&&(r=t.split("/").slice(1).join("/"));try{await f(`git checkout ${r}`,{cwd:e})}catch{let a="";if(t.includes("/"))a=t.split("/")[0];else{let{stdout:u}=await f("git branch -r",{cwd:e}),m=u.split(`
`).map(o=>o.trim()).filter(o=>o),c=[];for(let o of m){let s=o.split(" ")[0];s.endsWith(`/${r}`)&&c.push(s.substring(0,s.lastIndexOf("/")))}if(c.length===0){K.window.showErrorMessage(`Ricwiz: A branch "${r}" n\xE3o existe localmente nem em nenhuma remote!`);return}else if(c.length===1)a=c[0];else{let o=await A.initialize(e);c.includes("origin")?a="origin":o&&c.includes(o.upstreamRemote)?a=o.upstreamRemote:a=c[0]}}try{await f(`git fetch ${a} ${r}`,{cwd:e}),await f(`git checkout -b ${r} --track ${a}/${r}`,{cwd:e})}catch{K.window.showErrorMessage(`Ricwiz: Encontrou na remote ${a} mas falhou a fazer checkout.`);return}}try{let{stdout:p}=await f("git stash list",{cwd:e}),a=p.split(`
`);for(let u=0;u<a.length;u++)if(a[u].includes(`ricwiz-auto:${r}`)){let m=a[u].match(/stash@\{(\d+)\}/);m&&(await f(`git stash pop stash@{${m[1]}}`,{cwd:e}),K.window.showInformationMessage(`Ricwiz: \u{1F4E6} Restored stashed changes on ${r}`));break}}catch{K.window.showWarningMessage(`Ricwiz: Could not restore stashed changes on ${r}. You may need to resolve conflicts manually (check git stash list).`)}}catch{K.window.showErrorMessage(`Ricwiz: Could not checkout branch ${t}.`)}})}var K,qe=k(()=>{"use strict";K=v(require("vscode"));$();re()});async function io(){let t=y();if(t)try{let{stdout:e}=await f("git branch --show-current",{cwd:t}),i=e.trim();i&&(await Ee.env.clipboard.writeText(i),Ee.window.showInformationMessage(`Ricwiz: \u{1F4CB} Copied "${i}" to clipboard`))}catch{Ee.window.showErrorMessage("Ricwiz: Could not get the current branch name.")}}var Ee,so=k(()=>{"use strict";Ee=v(require("vscode"));$()});async function ro(){let t=y();if(!t){G.window.showErrorMessage("Ricwiz: Open a folder or workspace that is a Git repository.");return}let e=G.workspace.getConfiguration("ricwiz"),i=e.get("ticketSourceBranch","main"),r=e.get("packageXmlCommand",'sf sgd source delta --to "HEAD" --from "origin/{baseBranch}" --output-dir "."').replace("{baseBranch}",i);await G.window.showWarningMessage("Are you sure you want to generate the package.xml? This may overwrite existing local manifest files.",{modal:!0},"Yes, Generate")==="Yes, Generate"&&await G.window.withProgress({location:G.ProgressLocation.Notification,title:"Ricwiz: Generating package.xml using Salesforce CLI...",cancellable:!1},async()=>{try{await f(r,{cwd:t,maxBuffer:10*1024*1024}),G.window.showInformationMessage("Ricwiz: Successfully generated package.xml!");let a=Ge.join(t,"package","package.xml"),u=Ge.join(t,"package.xml"),m=Ge.join(t,"manifest","package.xml");for(let c of[a,u,m])if(no.existsSync(c)){let o=await G.workspace.openTextDocument(c);await G.window.showTextDocument(o);break}}catch(a){G.window.showErrorMessage(`Ricwiz: Error running sf command - ${a.message}`)}})}var G,Ge,no,ao=k(()=>{"use strict";G=v(require("vscode")),Ge=v(require("path")),no=v(require("fs"));$()});async function co(){let t=y();if(!t){H.window.showErrorMessage("Ricwiz: Open a folder or workspace that is a Git repository.");return}let i=H.workspace.getConfiguration("ricwiz").get("deployCommand","sf project deploy start --manifest package/package.xml --post-destructive-changes destructiveChanges/destructiveChanges.xml -c -l NoTestRun -g");await H.window.showWarningMessage("Are you sure you want to deploy to Salesforce? This action modifies your org and cannot be easily undone.",{modal:!0},"Yes, Deploy")==="Yes, Deploy"&&await H.window.withProgress({location:H.ProgressLocation.Notification,title:"Ricwiz: Deploying package...",cancellable:!1},async()=>{try{let{stdout:r,stderr:p}=await f(i,{cwd:t,maxBuffer:52428800}),a=H.window.createOutputChannel("Ricwiz Deploy");a.appendLine(`Executing: ${i}`),a.appendLine(r),p&&(a.appendLine("--- STDERR ---"),a.appendLine(p)),a.show(),H.window.showInformationMessage("Ricwiz: Successfully ran deploy command!")}catch(r){let p=H.window.createOutputChannel("Ricwiz Deploy");p.appendLine(`Error executing: ${i}`),r.stdout&&p.appendLine(r.stdout),r.stderr&&p.appendLine(r.stderr),p.appendLine(r.message),p.show(),H.window.showErrorMessage("Ricwiz: Error running deploy command. See output channel for details.")}})}var H,lo=k(()=>{"use strict";H=v(require("vscode"));$()});async function mo(){let t=y();if(!t){V.window.showErrorMessage("Ricwiz: Open a folder or workspace that is a Git repository.");return}let i=V.workspace.getConfiguration("ricwiz").get("importDataCommand","sfdx force:data:tree:import --plan data/plan.json");await V.window.showWarningMessage("Are you sure you want to import data into Salesforce? This action modifies records in your org.",{modal:!0},"Yes, Import")==="Yes, Import"&&await V.window.withProgress({location:V.ProgressLocation.Notification,title:"Ricwiz: Importing data...",cancellable:!1},async()=>{try{let{stdout:r,stderr:p}=await f(i,{cwd:t,maxBuffer:52428800}),a=V.window.createOutputChannel("Ricwiz Import Data");a.appendLine(`Executing: ${i}`),a.appendLine(r),p&&(a.appendLine("--- STDERR ---"),a.appendLine(p)),a.show(),V.window.showInformationMessage("Ricwiz: Successfully ran import data command!")}catch(r){let p=V.window.createOutputChannel("Ricwiz Import Data");p.appendLine(`Error executing: ${i}`),r.stdout&&p.appendLine(r.stdout),r.stderr&&p.appendLine(r.stderr),p.appendLine(r.message),p.show(),V.window.showErrorMessage("Ricwiz: Error running import data command. See output channel for details.")}})}var V,uo=k(()=>{"use strict";V=v(require("vscode"));$()});async function po(){let t=y();if(!t){_.window.showErrorMessage("Ricwiz: Open a folder or workspace that is a Git repository.");return}let e="";try{e=await D(t)}catch{}let n=_.workspace.getConfiguration("ricwiz").get("ticketSourceBranch","main"),r=await _.window.showInputBox({prompt:`Enter the branch name to list modified files (compared to ${n})`,value:e,placeHolder:"SFPSCA-1234"});r&&await _.window.withProgress({location:_.ProgressLocation.Notification,title:`Ricwiz: Finding files for ${r}...`,cancellable:!1},async()=>{try{let p=r.replace(/-to-[a-zA-Z0-9]+$/i,""),a=[];try{let g="";try{let{stdout:h}=await f(`git merge-base origin/${n} ${r}`,{cwd:t});g=h.trim()}catch{let{stdout:h}=await f(`git merge-base ${n} ${r}`,{cwd:t});g=h.trim()}if(g){let{stdout:h}=await f(`git diff --name-only ${g} ${r}`,{cwd:t,maxBuffer:10485760});a=h.split(`
`).map(w=>w.trim()).filter(w=>w.length>0)}}catch{}let u=[];try{let{stdout:g}=await f(`git --no-pager log --grep="\\b${p}\\b" -i -E --name-only -m --first-parent --format=""`,{cwd:t,maxBuffer:10485760});u=g.split(`
`).map(h=>h.trim()).filter(h=>h.length>0)}catch{}let m=[...a,...u];if(m.length===0){_.window.showInformationMessage(`Ricwiz: No modified files found for ${r}.`);return}let c=Array.from(new Set(m)).sort(),o={};for(let g of c){let h=g.match(/default\/([^/]+)/),w=h&&h[1]?h[1].toUpperCase():"OUTROS";o[w]||(o[w]=[]),o[w].push(g)}let s=`Files modified in branch ${r}:
`,d=Object.keys(o).sort();for(let g of d)s+=`
=== ${g} ===
`,s+=o[g].join(`
`)+`
`;let l=await _.workspace.openTextDocument({content:s,language:"plaintext"});await _.window.showTextDocument(l)}catch(p){_.window.showErrorMessage(`Ricwiz: Error running git log - ${p.message}`)}})}var _,go=k(()=>{"use strict";_=v(require("vscode"));$()});async function fo(){let t=y();if(!t){X.window.showErrorMessage("Ricwiz: Open a folder or workspace that is a Git repository.");return}let i=X.workspace.getConfiguration("ricwiz").get("resetTrackingCommand","sf org disable tracking && sf project reset tracking --no-prompt");await X.window.withProgress({location:X.ProgressLocation.Notification,title:"Ricwiz: Resetting tracking...",cancellable:!1},async()=>{try{let{stdout:n,stderr:r}=await f(i,{cwd:t,maxBuffer:52428800}),p=X.window.createOutputChannel("Ricwiz Reset Tracking");p.appendLine(`Executing: ${i}`),p.appendLine(n),r&&(p.appendLine("--- STDERR ---"),p.appendLine(r)),p.show(),X.window.showInformationMessage("Ricwiz: Successfully reset tracking!")}catch(n){let r=X.window.createOutputChannel("Ricwiz Reset Tracking");r.appendLine(`Error executing: ${i}`),n.stdout&&r.appendLine(n.stdout),n.stderr&&r.appendLine(n.stderr),r.appendLine(n.message),r.show(),X.window.showErrorMessage("Ricwiz: Error resetting tracking. See output channel for details.")}})}var X,ho=k(()=>{"use strict";X=v(require("vscode"));$()});async function wo(){let t=y();if(!t){Q.window.showErrorMessage("Ricwiz: Open a workspace first.");return}let e=["ApexClass","ApexTrigger","CustomObject","CustomField","LightningComponentBundle","AuraDefinitionBundle","Flow","CustomLabel","CustomMetadata","StaticResource","Profile","PermissionSet","PermissionSetGroup","Layout","ValidationRule","RecordType","ListView","Report","EmailTemplate","Other (Type manually)..."],i=await Q.window.showQuickPick(e,{placeHolder:"Select Metadata Type to extract (e.g., ApexClass)",ignoreFocusOut:!0});if(!i||i==="Other (Type manually)..."&&(i=await Q.window.showInputBox({prompt:"Enter Metadata Type (e.g., CustomApplication, Queue)",ignoreFocusOut:!0}),!i))return;let n={ApexClass:"**/*.cls",ApexTrigger:"**/*.trigger",CustomObject:"**/*.{object,object-meta.xml}",CustomField:"**/*.field-meta.xml",LightningComponentBundle:"**/lwc/*/*.js",AuraDefinitionBundle:"**/aura/*/*.cmp",Flow:"**/*.flow-meta.xml",CustomLabel:"**/*.labels-meta.xml",CustomMetadata:"**/*.md-meta.xml",StaticResource:"**/*.resource-meta.xml",Profile:"**/*.profile-meta.xml",PermissionSet:"**/*.permissionset-meta.xml",PermissionSetGroup:"**/*.permissionsetgroup-meta.xml",Layout:"**/*.layout-meta.xml",ValidationRule:"**/*.validationRule-meta.xml",RecordType:"**/*.recordType-meta.xml",ListView:"**/*.listView-meta.xml"},r=[],p=n[i];if(p)try{r=(await Q.workspace.findFiles(p,"**/node_modules/**")).map(m=>{let c=m.fsPath.split(/[\\/]/).pop()||"";if(i==="LightningComponentBundle"||i==="AuraDefinitionBundle"){let o=m.fsPath.split(/[\\/]/);return o[o.length-2]||c.split(".")[0]}return c.split(".")[0]}),r=[...new Set(r)].sort()}catch{}let a=await new Promise(u=>{let m=Q.window.createQuickPick();m.title=`Extract ${i}`,m.placeholder="Type name (e.g. MyComponent) or * for all",m.ignoreFocusOut=!0,m.matchOnDescription=!0;let c=()=>{let o=m.value.trim(),s=[];o?s.push({label:`$(cloud-download) Extract "${o}"`,description:"Extract exact name from Salesforce",alwaysShow:!0}):s.push({label:'$(cloud-download) Extract "*" (All)',description:`Extract all ${i}s`,alwaysShow:!0}),r.forEach(d=>{(!o||d.toLowerCase().includes(o.toLowerCase()))&&s.push({label:d,description:"Local workspace component"})}),m.items=s};m.onDidChangeValue(()=>c()),m.onDidAccept(()=>{let o=m.selectedItems[0];if(o){let s=o.label;s.startsWith('$(cloud-download) Extract "')?s=s.replace('$(cloud-download) Extract "',"").replace('" (All)',"").replace('"',""):s==='$(cloud-download) Extract "*" (All)'&&(s="*"),m.hide(),u(s)}}),m.onDidHide(()=>{m.dispose(),u(void 0)}),c(),m.show()});a&&await Q.window.withProgress({location:Q.ProgressLocation.Notification,title:`Ricwiz: Extracting ${i}:${a} from Salesforce...`,cancellable:!0},async(u,m)=>{try{M.show(!0);let c=`${i}:${a}`,{stdout:o,stderr:s}=await f(`sf project retrieve start -m "${c}"`,{cwd:t});o&&M.appendLine(o),s&&M.appendLine(s),Q.window.showInformationMessage(`Ricwiz: Successfully extracted ${c}.`)}catch(c){M.appendLine(`ERROR: ${c.message}`),c.stdout&&M.appendLine(c.stdout),c.stderr&&M.appendLine(c.stderr),Q.window.showErrorMessage("Ricwiz: Extraction failed. See Output channel for details.")}})}var Q,vo=k(()=>{"use strict";Q=v(require("vscode"));$()});async function yo(){let t=O.window.activeTextEditor;if(!t){O.window.showErrorMessage("Ricwiz: Please open the file you want to deploy in the editor first.");return}let e=t.document.uri.fsPath,i=y();if(!i)return;let n="";if(await O.window.withProgress({location:O.ProgressLocation.Notification,title:"Ricwiz: Fetching available Salesforce orgs...",cancellable:!1},async()=>{try{let{stdout:m}=await f("sf org list --json",{cwd:i});n=m}catch(m){n=m.stdout||""}}),!n){O.window.showErrorMessage("Ricwiz: Failed to fetch orgs. Is Salesforce CLI installed?");return}let r=[];try{let m=JSON.parse(n),c=m.result?.nonScratchOrgs||[],o=m.result?.scratchOrgs||[];r=[...c,...o]}catch{O.window.showErrorMessage("Ricwiz: Failed to parse org list.");return}if(r.length===0){O.window.showInformationMessage("Ricwiz: No authenticated orgs found.");return}let p=r.map(m=>({label:m.alias||m.username,description:m.alias?m.username:"",picked:m.isDefaultUsername})),a=await O.window.showQuickPick(p,{placeHolder:"Select the org(s) to deploy this file to",canPickMany:!0,ignoreFocusOut:!0});if(!a||a.length===0)return;let u=bo.basename(e);await O.window.withProgress({location:O.ProgressLocation.Notification,title:`Ricwiz: Deploying ${u} to ${a.length} org(s)...`,cancellable:!1},async()=>{M.show(!0),M.appendLine(`--- Starting Parallel Deploy of ${u} ---`);let m=a.map(async d=>{let l=d.label;M.appendLine(`[${l}] Deploying...`);try{let{stdout:g,stderr:h}=await f(`sf project deploy start -d "${e}" -o "${l}"`,{cwd:i});return M.appendLine(`[${l}] \u2705 Success`),g&&M.appendLine(g),{org:l,success:!0}}catch(g){return M.appendLine(`[${l}] \u274C Failed`),g.stdout&&M.appendLine(g.stdout),g.stderr&&M.appendLine(g.stderr),{org:l,success:!1}}}),c=await Promise.all(m),o=c.filter(d=>d.success).length,s=c.filter(d=>!d.success).length;s===0?O.window.showInformationMessage(`Ricwiz: Successfully deployed to all ${o} orgs!`):O.window.showErrorMessage(`Ricwiz: Deploy finished with errors (${o} success, ${s} failed). Check Output channel.`)})}var O,bo,xo=k(()=>{"use strict";O=v(require("vscode")),bo=v(require("path"));$()});async function ko(){let t=y();if(!t){E.window.showErrorMessage("Ricwiz: Open a folder or workspace that is a Git repository.");return}let e=E.workspace.getConfiguration("ricwiz"),i=e.get("auditUsername",""),n=e.get("auditHours",8),r=await E.window.showInputBox({prompt:"Enter your Salesforce Username to query in SetupAuditTrail",value:i,placeHolder:"admin@tuaorg.com"});if(!r)return;let p=await E.window.showInputBox({prompt:"How many hours back do you want to search?",value:n.toString(),placeHolder:"8"});if(!p)return;let a=parseFloat(p);if(isNaN(a)||a<=0){E.window.showErrorMessage("Ricwiz: Invalid hours specified.");return}let u=new Date(Date.now()-a*60*60*1e3).toISOString(),c=`sf data query -q "${`SELECT Action, Display, Section FROM SetupAuditTrail WHERE CreatedBy.Username = '${r}' AND CreatedDate >= ${u}`}" --json`;await E.window.withProgress({location:E.ProgressLocation.Notification,title:"Ricwiz: Interrogating Setup Audit Trail...",cancellable:!1},async()=>{try{let{stdout:o}=await f(c,{cwd:t,maxBuffer:52428800}),s=JSON.parse(o);if(!s.result||s.result.records.length===0){E.window.showInformationMessage(`Ricwiz: No changes found for ${r} in the last ${a} hours.`);return}let d=s.result.records,l=[],g=new Set;for(let P of d){let L=ti(P.Action,P.Display,P.Section);if(L){let J=`${L.isDelete?"DEL":"ADD"}-${L.metadataFormat}`;if(!g.has(J)){g.add(J);let W=L.isDelete?"$(trash)":"$(plus)";l.push({label:`${W} ${L.metadataFormat}`,description:`${P.Action} -> ${P.Display}`,metadataFormat:L.metadataFormat,isDelete:L.isDelete})}}}if(l.length===0){E.window.showInformationMessage(`Ricwiz: No extractable metadata changes found for ${r} in the last ${a} hours (ignored passwords/logins).`);return}let h=await E.window.showQuickPick(l,{canPickMany:!0,placeHolder:"Select the changes you want to extract to GitLab",ignoreFocusOut:!0});if(!h||h.length===0){E.window.showInformationMessage("Ricwiz: No changes selected.");return}let w=h.filter(P=>P.isDelete),R=h.filter(P=>!P.isDelete),S=E.window.createOutputChannel("Ricwiz Admin Bridge");if(S.show(),w.length>0){let{stdout:P}=await f("git ls-files",{cwd:t}),L=P.split(`
`).map(W=>W.trim()),J=0;for(let W of w){let Ae=W.metadataFormat.split(":"),Ie=Ae[0],Re=Ae[1],Le=Re;Ie==="CustomField"&&(Le=Re.split(".")[1]);let T=L.filter(q=>{let me=Ve.basename(q);return me.startsWith(Le+".")&&me.includes(Ie==="CustomField"?".field":"")});for(let q of T){let me=Ve.join(t,q);He.existsSync(me)&&(He.unlinkSync(me),S.appendLine(`Deleted local file: ${q}`),J++)}}E.window.showInformationMessage(`Ricwiz: Deleted ${J} local files from Git workspace.`)}if(R.length===0)return;let le=R.map(P=>P.metadataFormat).filter(P=>P!=="").join(", "),fe=await E.window.showInputBox({prompt:"Review and adjust the metadata components to retrieve",value:le,ignoreFocusOut:!0});if(!fe)return;let he=`sf project retrieve start -m "${fe}"`;S.appendLine(`Executing: ${he}`),E.window.showInformationMessage(`Ricwiz: Extracting ${R.length} components...`);let ee=await f(he,{cwd:t});S.appendLine(ee.stdout),ee.stderr&&(S.appendLine("--- STDERR ---"),S.appendLine(ee.stderr)),E.window.showInformationMessage("Ricwiz: Changes extracted successfully! Ready for Git Commit.")}catch(o){E.window.showErrorMessage(`Ricwiz: Error capturing changes - ${o.message}`)}})}function ti(t,e,i){if(!t||!e||!i)return null;let n=t.toLowerCase(),r=i.toLowerCase();if(["security controls","network access","session settings","data export","login history","password policies","identity verification","delegated administration"].includes(r)||n.includes("login")||n.includes("password")||n.includes("oauth")||n.includes("session"))return null;let a=n.includes("delete"),u=null;if(n==="permissionsetgroupcomponentadd"||n==="permissionsetgroupcomponentdelete")return null;let m=(c,o=!1)=>{let s=c.replace(/\(.*\)/g,"").trim();s.includes(":")&&!n.includes("calculation")&&(s=s.split(":")[0]);let d=["disabled","deleted","removed","created","changed","updated","from","to","on","assigned","assign","assignment","permission","set","group","apex","class","trigger","custom","field","object","layout","validation","rule","flow","profile"],l=s.split(/\s+/);if(o){for(;l.length>0&&d.includes(l[l.length-1].toLowerCase());)l.pop();for(;l.length>0&&d.includes(l[0].toLowerCase());)l.shift();return l.join(" ").trim().replace(/[^a-zA-Z0-9_ ]/g,"")}else return l.filter(w=>!d.includes(w.toLowerCase())).join("_").replace(/[^a-zA-Z0-9_]/g,"")||s.replace(/\s+/g,"")};if(n.includes("profile"))u=`Profile:${m(e,!0)}`;else if(n.includes("permissionsetgroupcalculation")){let c=e.split(":");u=`PermissionSetGroup:${c.length>1?c[c.length-1].trim():m(e,!1)}`}else if(n.includes("permission set group")||n.includes("permissionsetgroup"))u=`PermissionSetGroup:${m(e,!1)}`;else if(n.includes("permission set")||n.includes("permissionset"))u=`PermissionSet:${m(e,!1)}`;else if(n.includes("apexclass"))u=`ApexClass:${m(e,!1)}`;else if(n.includes("apextrigger")||n.includes("apex trigger"))u=`ApexTrigger:${m(e,!1)}`;else if(n.includes("customfield")){let c=e.match(/([A-Za-z0-9_]+__c)/),o=e.match(/(?:on|na|for)\s+([A-Za-z0-9_]+)/i);c&&o?u=`CustomField:${o[1]}.${c[1]}`:u=`CustomField:${m(e,!1)}`}else if(n.includes("layout"))u=`Layout:${m(e,!0)}`;else if(n.includes("validation"))u=`ValidationRule:${m(e,!1)}`;else if(n.includes("flow"))u=`Flow:${m(e,!1)}`;else if(n.includes("customobject")){let c=e.match(/([A-Za-z0-9_]+__c)/);u=c?`CustomObject:${c[1]}`:`CustomObject:${m(e,!1)}`}else if(!n.includes("created")&&!n.includes("changed")&&!n.includes("deleted"))return null;return u?{metadataFormat:u,isDelete:a}:null}var E,He,Ve,Co=k(()=>{"use strict";E=v(require("vscode")),He=v(require("fs")),Ve=v(require("path"));$()});async function $o(){let t=y();if(t)try{let{stdout:e}=await f('git for-each-ref --sort=-committerdate --format="%(refname:short)|||%(committerdate:relative)|||%(subject)" refs/heads/',{cwd:t}),i=e.split(`
`).filter(r=>r.trim()).map(r=>{let p=r.split("|||");return{label:`$(git-branch) ${p[0]}`,description:p[1],detail:p[2],branchName:p[0]}}),n=await Ye.window.showQuickPick(i,{placeHolder:"Select a branch from history to checkout",matchOnDescription:!0,matchOnDetail:!0});n&&await ze(n.branchName)}catch{Ye.window.showErrorMessage("Ricwiz: Failed to get branch history")}}var Ye,zo=k(()=>{"use strict";Ye=v(require("vscode"));$();qe()});async function Ro(){let t=y();if(!t)return;let e=await Te.window.showInputBox({prompt:"Enter ticket number or name (e.g., 48934)",placeHolder:"48934"});if(e)try{let{stdout:i}=await f(`git branch --list "*${e}*"`,{cwd:t}),n=i.split(`
`).map(a=>a.replace("*","").trim()).filter(a=>a);if(n.length===0){Te.window.showInformationMessage(`Ricwiz: No branches found matching "${e}"`);return}let r=n.map(a=>({label:`$(git-branch) ${a}`,branchName:a})),p=await Te.window.showQuickPick(r,{placeHolder:`Select a branch for ${e}`});p&&await ze(p.branchName)}catch{Te.window.showErrorMessage("Ricwiz: Failed to search branches")}}var Te,So=k(()=>{"use strict";Te=v(require("vscode"));$();qe()});async function Bo(){let t=ye.window.activeTextEditor;if(!t)return ye.window.showErrorMessage("Ricwiz: Please open a file in the editor to check blame."),null;let e=t.document.fileName,i=Po.basename(e),n=y();if(!n)return ye.window.showErrorMessage("Ricwiz: Workspace is not a git repository."),null;let r=[];try{let{stdout:o}=await f(`git log -5 --pretty=format:"%an|%ar|%s|%h" -- "${e}"`,{cwd:n}),s=o.trim().split(`
`);for(let d of s){let l=d.split("|");l.length>=4&&r.push({author:l[0],time:l[1],message:l.slice(2,-1).join("|"),hash:l[l.length-1]})}}catch(o){console.error("Git blame error:",o)}let p="Unknown",a="Unknown",u="Unknown",m=[],c=oi(e);if(c)try{await ye.window.withProgress({location:ye.ProgressLocation.Notification,title:`Ricwiz: Analyzing ${c.name} in Salesforce...`,cancellable:!1},async()=>{let o="";if(c.type==="CustomField"){let s=c.name.split(".");s.length===2&&(o=`SELECT LastModifiedBy.Name, LastModifiedDate, CreatedBy.Name FROM CustomField WHERE DeveloperName = '${s[1].replace("__c","")}' AND TableEnumOrId = '${s[0]}'`)}else c.type==="LightningComponentBundle"?o=`SELECT LastModifiedBy.Name, LastModifiedDate, CreatedBy.Name FROM LightningComponentBundle WHERE DeveloperName = '${c.name}'`:o=`SELECT LastModifiedBy.Name, LastModifiedDate, CreatedBy.Name FROM ${c.type} WHERE Name = '${c.name}'`;if(o)try{let{stdout:s}=await f(`sf data query -t -q "${o}" --json`,{cwd:n,maxBuffer:52428800}),d=JSON.parse(s);if(d&&d.result&&d.result.records&&d.result.records.length>0){let l=d.result.records[0];p=l.LastModifiedBy?l.LastModifiedBy.Name:"Unknown",u=l.CreatedBy?l.CreatedBy.Name:"Unknown",a=new Date(l.LastModifiedDate).toLocaleString()}else p="Not found in Org",a="N/A",u="N/A"}catch{p="Query Error",a="N/A",u="N/A"}try{let s="SELECT Action, Display, CreatedBy.Name, CreatedDate FROM SetupAuditTrail ORDER BY CreatedDate DESC LIMIT 1500",{stdout:d}=await f(`sf data query -q "${s}" --json`,{cwd:n,maxBuffer:52428800}),l=JSON.parse(d);if(l&&l.result&&l.result.records){let g=c.name.replace("__c","");m=l.result.records.filter(w=>w.Display&&w.Display.includes(g)).map(w=>({action:w.Action,display:w.Display,author:w.CreatedBy?w.CreatedBy.Name:"Unknown",time:new Date(w.CreatedDate).toLocaleString()})).slice(0,10)}}catch(s){console.error("Audit trail query error:",s)}})}catch(o){console.error("Salesforce query error:",o)}else p="Unsupported Metadata Type",a="N/A";return{fileName:i,gitHistory:r,sfAuthor:p,sfTime:a,sfCreatedBy:u,auditHistory:m}}function oi(t){let e=t.replace(/\\/g,"/");if(e.includes("/classes/")){let i=e.match(/\/classes\/([^/.]+)\.cls/);if(i)return{type:"ApexClass",name:i[1]}}if(e.includes("/triggers/")){let i=e.match(/\/triggers\/([^/.]+)\.trigger/);if(i)return{type:"ApexTrigger",name:i[1]}}if(e.includes("/lwc/")){let i=e.match(/\/lwc\/([^/]+)\//);if(i)return{type:"LightningComponentBundle",name:i[1]}}if(e.includes("/aura/")){let i=e.match(/\/aura\/([^/]+)\//);if(i)return{type:"AuraDefinitionBundle",name:i[1]}}if(e.includes("/objects/")&&e.includes("/fields/")){let i=e.match(/\/objects\/([^/]+)\//),n=e.match(/\/fields\/([^/.]+)\.field/);if(i&&n)return{type:"CustomField",name:`${i[1]}.${n[1]}`}}return null}var ye,Po,Eo=k(()=>{"use strict";ye=v(require("vscode")),Po=v(require("path"));$()});function To(t,e,i){t.subscriptions.push(x.commands.registerCommand("ricwiz.generateDestructiveChanges",ut),x.commands.registerCommand("ricwiz.runSmartTests",gt),x.commands.registerCommand("ricwiz.refreshWebview",()=>{e&&x.commands.executeCommand("workbench.action.webview.reloadWebviewAction")}),x.commands.registerCommand("ricwiz.createBranches",vt),x.commands.registerCommand("ricwiz.prepareDeploy",kt),x.commands.registerCommand("ricwiz.createMergeRequests",zt),x.commands.registerCommand("ricwiz.createMergeRequestsVSCode",Rt),x.commands.registerCommand("ricwiz.openJiraTicket",Bt),x.commands.registerCommand("ricwiz.openJiraTicketVSCode",Et),x.commands.registerCommand("ricwiz.showJiraDetails",()=>{e&&Nt(e)}),x.commands.registerCommand("ricwiz.openJiraDashboard",n=>{e&&jt(e,n)}),x.commands.registerCommand("ricwiz.openJiraDetailsForId",n=>{e&&Jt(e,n)}),x.commands.registerCommand("ricwiz.changeJiraStatus",qt),x.commands.registerCommand("ricwiz.addJiraComment",Gt),x.commands.registerCommand("ricwiz.addJiraLabel",Ht),x.commands.registerCommand("ricwiz.setJiraToken",Vt),x.commands.registerCommand("ricwiz.setGitlabToken",Qt),x.commands.registerCommand("ricwiz.syncAll",Zt),x.commands.registerCommand("ricwiz.updateBases",Xt),x.commands.registerCommand("ricwiz.deleteUnusedBranches",to),x.commands.registerCommand("ricwiz.checkoutBranch",ze),x.commands.registerCommand("ricwiz.copyBranchName",io),x.commands.registerCommand("ricwiz.generatePackageXml",ro),x.commands.registerCommand("ricwiz.deployPackage",co),x.commands.registerCommand("ricwiz.importData",mo),x.commands.registerCommand("ricwiz.listTicketFiles",po),x.commands.registerCommand("ricwiz.resetTracking",fo),x.commands.registerCommand("ricwiz.extractComponent",wo),x.commands.registerCommand("ricwiz.deployMultiOrg",yo),x.commands.registerCommand("ricwiz.captureAdminChanges",ko),x.commands.registerCommand("ricwiz.openHistory",$o),x.commands.registerCommand("ricwiz.searchTicket",Ro),x.commands.registerCommand("ricwiz.whoToBlame",async()=>{let n=await Bo();n&&e&&(e.setBlameData(n),e.setPage("blame"))}),x.commands.registerCommand("ricwiz.manualRefresh",()=>{i&&i()}),x.commands.registerCommand("ricwiz.toggleAutoRefresh",()=>{if(e){let n=!e.isAutoRefreshEnabled();e.setAutoRefresh(n),x.workspace.getConfiguration("ricwiz").update("autoRefresh",n,x.ConfigurationTarget.Global)}}),x.commands.registerCommand("ricwiz.openSettings",()=>{x.commands.executeCommand("workbench.action.openSettings","ricwiz")}))}var x,Mo=k(()=>{"use strict";x=v(require("vscode"));pt();ft();bt();Ct();St();Tt();Ut();Wt();_t();Yt();Kt();eo();oo();qe();so();ao();lo();uo();go();ho();vo();xo();Co();zo();So();Eo()});async function Ze(){let t=await _e();return!!(t&&t.trim())}async function Fo(t){let e=Lo.workspace.getConfiguration("ricwiz"),i=(await _e())?.trim();if(!i)throw new Error("No GitLab token");let n=e.get("gitlabUrlOverride","");if(!n||n.trim()==="")try{let{stdout:u}=await f("git remote get-url origin",{cwd:t}),m=u.trim();m.endsWith(".git")&&(m=m.slice(0,-4)),m.startsWith("git@")&&(m=m.replace("git@","").replace(":","/"),m=`https://${m}`),n=m}catch{throw new Error("Could not get remote origin URL.")}let r=new URL(n),p=`${r.protocol}//${r.host}`,a=Do[t];if(!a){let u=r.pathname;u.startsWith("/")&&(u=u.substring(1)),u.endsWith("/")&&(u=u.slice(0,-1)),u.endsWith(".git")&&(u=u.slice(0,-4)),a=encodeURIComponent(u),Do[t]=a}return{baseUrl:p,token:i,projectPath:a}}async function ii(t,e,i){let{baseUrl:n,token:r}=await Fo(t),p=new URL(`${n}${i}`);return new Promise((a,u)=>{let m=Io.request(p,{method:e,timeout:5e3,headers:{"PRIVATE-TOKEN":r,Accept:"application/json"}},c=>{let o="";c.on("data",s=>o+=s),c.on("end",()=>{if(c.statusCode&&c.statusCode>=400)return u(new Error(`GitLab API error: ${c.statusCode}`));if(!o)return a({});try{let s=JSON.parse(o);a(s)}catch{u(new Error("Failed to parse GitLab response."))}})});m.on("timeout",()=>{m.destroy(),u(new Error("GitLab request timed out"))}),m.on("error",c=>u(new Error(`Network error: ${c.message}`))),m.end()})}async function Ke(t,e,i){let n=`${t}:${e}:${i||"any"}`,r=Ao.get(n);if(r&&Date.now()-r.timestamp<si)return r.data;try{let{projectPath:p}=await Fo(t),a=`/api/v4/projects/${p}/merge_requests?source_branch=${encodeURIComponent(e)}&order_by=updated_at&sort=desc`;i&&(a+=`&target_branch=${encodeURIComponent(i)}`);let u=await ii(t,"GET",a);if(u&&u.length>0){let m=u[0],c="none";if(m.head_pipeline&&m.head_pipeline.status){let s=m.head_pipeline.status;s==="success"||s==="failed"||s==="canceled"||s==="skipped"?c=s:c="running"}let o={isMerged:m.state==="merged",isOpen:m.state==="opened",pipelineStatus:c,webUrl:m.web_url};return Ao.set(n,{data:o,timestamp:Date.now()}),o}return null}catch{return null}}var Io,Lo,Do,Ao,si,Oo=k(()=>{"use strict";Io=v(require("https")),Lo=v(require("vscode"));xe();$();Do={};Ao=new Map,si=30*1e3});function No(t,e){return e.find(i=>t.endsWith(`-to-${i.name}`))}async function Uo(t,e,i,n){let r=await Ze();return await Promise.all(e.map(async a=>{let u=No(a,n);if(r){let m=u?u.sourceBranch:void 0,c=await Ke(t,a,m);if(c)return{name:a,isMerged:c.isMerged,pipelineStatus:c.pipelineStatus,mrUrl:c.webUrl}}return{name:a,isMerged:!1}}))}async function jo(t,e,i){let n=No(e,i);if(!n)return!1;if(await Ze()){let r=await Ke(t,e,n.sourceBranch);if(r)return r.isMerged}return!1}async function Jo(t,e=10){try{let{stdout:i}=await f(`git log --oneline -${e} --format="%h|||%s|||%ar"`,{cwd:t});return i.split(`
`).filter(n=>n.trim()).map(n=>{let r=n.split("|||");return{hash:r[0]||"",message:r.length>=3?r.slice(1,-1).join("|||"):r[1]||"",timeAgo:r.length>=3?r[r.length-1]:""}})}catch{return[]}}async function Wo(t,e=3){try{let{stdout:i}=await f('git for-each-ref --sort=-committerdate --format="%(refname:short)" refs/heads/',{cwd:t}),n=i.split(`
`).map(p=>p.trim()).filter(p=>p),r=/^[A-Z]+-\d+$/i;return n.filter(p=>r.test(p)).slice(0,e)}catch{return[]}}async function qo(t,e,i){let{stdout:n}=await f(`git branch --all --list "*${e}*"`,{cwd:t}),r=new Set;return n.split(`
`).forEach(p=>{let a=p.replace("*","").trim();if(a){if(a.startsWith("remotes/")){let u=a.split("/");u.length>2&&(a=u.slice(2).join("/"))}a&&a!==i&&!a.includes("HEAD")&&r.add(a)}}),Array.from(r)}var Go=k(()=>{"use strict";$();Oo()});function Ho(t,e,i){let n,r=se.workspace.getConfiguration("ricwiz").get("autoRefresh",!0);e?.setAutoRefresh(r),t.subscriptions.push(se.workspace.onDidChangeConfiguration(a=>{if(a.affectsConfiguration("ricwiz.autoRefresh")){let u=se.workspace.getConfiguration("ricwiz").get("autoRefresh",!0);e?.setAutoRefresh(u)}}));async function p(){let a=se.extensions.getExtension("vscode.git");if(a){let c=function(o){let s="",d;async function l(){let h=se.workspace.workspaceFolders;if(!h)return;let w=h[0].uri.fsPath,R=await D(w);if(R&&R!==s){s=R;let S=se.workspace.getConfiguration("ricwiz"),le=S.get("ticketPrefix","SFPSCA-");if(!R.includes(le)){let T=R.match(/([A-Z]+-)\d+/i);T&&(le=T[1].toUpperCase())}let fe=[],he=[],ee=[],P=[],L=S.get("environments",[{name:"Qual",sourceBranch:"quality"},{name:"Val",sourceBranch:"validation"},{name:"Prod",sourceBranch:"main"}]);try{let T=S.get("workspaceCheckoutButtons",["main","quality","validation"]);ee=Array.from(new Set(T))}catch{}let J="",W=R.match(new RegExp(`(${le}\\d+(?:-\\d+)?)`,"i"));if(W){let T=W[1].toUpperCase();J=T;let q=S.get("commitMessageSuffix","- "),me=/^[A-Z]+-\d+(?:-\d+)?\s*(?:-\s*|:\s*|\s+)?/i;me.test(o.inputBox.value)?o.inputBox.value.toUpperCase().startsWith(T)||(o.inputBox.value=o.inputBox.value.replace(me,`${T}${q}`)):o.inputBox.value=`${T}${q}`+o.inputBox.value,i.text=`$(bookmark) ${T}`,i.tooltip=`Branch: ${R}
Click to open Jira ticket`,i.show();try{let Xe=await qo(w,T,R);fe=await Uo(w,Xe,T,L)}catch{}}else{i.hide();try{P=await Wo(w)}catch{}}let[Ae,Ie,Re]=await Promise.all([Jo(w,10),jo(w,R,L),J?$e(J).catch(T=>{let q=T.message;return(q.includes("ENOTFOUND")||q.includes("network"))&&(q="No Internet or Invalid URL"),{summary:`\u26A0\uFE0F Jira Error: ${q}`,description:""}}):Promise.resolve(null)]);he=Ae;let Le=Re?Re.summary:"";e?.updateBranch(R,Ie,fe,he,ee,P,Le)}}function g(){e?.isAutoRefreshEnabled()&&(d&&clearTimeout(d),d=setTimeout(()=>{s="",l()},300))}n=()=>{s="",l()},l(),o.state.onDidChange(()=>g()),se.window.onDidChangeWindowState(h=>{h.focused&&g()})};var u=c;a.isActive||await a.activate();let m=a.exports.getAPI(1);m.repositories.length>0&&m.repositories.forEach(o=>c(o)),m.onDidOpenRepository(o=>c(o))}}return p(),n}var se,Vo=k(()=>{"use strict";se=v(require("vscode"));$();Go();Be()});var je={};et(je,{activate:()=>ni,deactivate:()=>ri,webviewProvider:()=>Me});module.exports=ue(je);function ni(t){it(t),Me=new Oe(t.extensionUri),t.subscriptions.push(De.window.registerWebviewViewProvider("ricwiz-webview",Me));let e=De.window.createStatusBarItem(De.StatusBarAlignment.Left,100);e.command="ricwiz.openJiraTicket",t.subscriptions.push(e);let i=Ho(t,Me,e);To(t,Me,i)}function ri(){}var De,Me,Je=k(()=>{De=v(require("vscode"));ot();xe();Mo();Vo()});Je();0&&(module.exports={activate,deactivate,webviewProvider});
