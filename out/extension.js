"use strict";var Lo=Object.create;var Ae=Object.defineProperty;var Oo=Object.getOwnPropertyDescriptor;var No=Object.getOwnPropertyNames;var jo=Object.getPrototypeOf,Jo=Object.prototype.hasOwnProperty;var k=(t,e,o)=>()=>{if(o)throw o[0];try{return t&&(e=t(t=0)),e}catch(s){throw o=[s],s}};var _e=(t,e)=>{for(var o in e)Ae(t,o,{get:e[o],enumerable:!0})},Ze=(t,e,o,s)=>{if(e&&typeof e=="object"||typeof e=="function")for(let r of No(e))!Jo.call(t,r)&&r!==o&&Ae(t,r,{get:()=>e[r],enumerable:!(s=Oo(e,r))||s.enumerable});return t};var b=(t,e,o)=>(o=t!=null?Lo(jo(t)):{},Ze(e||!t||!t.__esModule?Ae(o,"default",{value:t,enumerable:!0}):o,t)),ge=t=>Ze(Ae({},"__esModule",{value:!0}),t);function C(t){return t.replace(/&/g,"&amp;").replace(/</g,"&lt;").replace(/>/g,"&gt;").replace(/"/g,"&quot;").replace(/'/g,"&#39;")}var y,Ie,Xe=k(()=>{"use strict";y=b(require("vscode"));Ie=class{constructor(e){this._extensionUri=e}_extensionUri;webviewView;resolveWebviewView(e,o,s){this.webviewView=e,e.webview.options={enableScripts:!0,localResourceRoots:[this._extensionUri]},this.updateBranch("",!1),e.webview.onDidReceiveMessage(r=>{switch(r.command){case"createBranches":y.commands.executeCommand("ricwiz.createBranches");break;case"createBranchForTicket":y.commands.executeCommand("ricwiz.createBranches",r.args);break;case"prepareDeploy":y.commands.executeCommand("ricwiz.prepareDeploy");break;case"openMRs":y.commands.executeCommand("ricwiz.createMergeRequests");break;case"openMRsVSCode":y.commands.executeCommand("ricwiz.createMergeRequestsVSCode");break;case"openJira":y.commands.executeCommand("ricwiz.openJiraTicket");break;case"showJiraDetails":y.commands.executeCommand("ricwiz.showJiraDetails");break;case"changeJiraStatus":y.commands.executeCommand("ricwiz.changeJiraStatus");break;case"addJiraComment":y.commands.executeCommand("ricwiz.addJiraComment");break;case"addJiraLabel":y.commands.executeCommand("ricwiz.addJiraLabel");break;case"setPage":this.setPage(r.args);break;case"openDashboard":y.commands.executeCommand("ricwiz.openJiraDashboard");break;case"openJiraDetailsForId":y.commands.executeCommand("ricwiz.openJiraDetailsForId",r.args);break;case"refreshDashboard":y.commands.executeCommand("ricwiz.openJiraDashboard");break;case"switchDashboardQuery":y.commands.executeCommand("ricwiz.openJiraDashboard",parseInt(r.args));break;case"openJiraVSCode":y.commands.executeCommand("ricwiz.openJiraTicketVSCode");break;case"openSettings":y.commands.executeCommand("ricwiz.openSettings");break;case"checkout":r.branch&&y.commands.executeCommand("ricwiz.checkoutBranch",r.branch);break;case"copyBranch":y.commands.executeCommand("ricwiz.copyBranchName");break;case"generatePackageXml":y.commands.executeCommand("ricwiz.generatePackageXml");break;case"openDevTools":this.setPage("devtools");break;case"openMain":this.setPage("main");break;case"generateDestructiveChanges":y.commands.executeCommand("ricwiz.generateDestructiveChanges");break;case"deployPackage":y.commands.executeCommand("ricwiz.deployPackage");break;case"runSmartTests":y.commands.executeCommand("ricwiz.runSmartTests");break;case"importData":y.commands.executeCommand("ricwiz.importData");break;case"listTicketFiles":y.commands.executeCommand("ricwiz.listTicketFiles");break;case"resetTracking":y.commands.executeCommand("ricwiz.resetTracking");break;case"extractComponent":y.commands.executeCommand("ricwiz.extractComponent");break;case"deployMultiOrg":y.commands.executeCommand("ricwiz.deployMultiOrg");break;case"captureAdminChanges":y.commands.executeCommand("ricwiz.captureAdminChanges");break;case"whoToBlame":y.commands.executeCommand("ricwiz.whoToBlame");break;case"syncAll":y.commands.executeCommand("ricwiz.syncAll");break;case"updateBases":y.commands.executeCommand("ricwiz.updateBases");break;case"deleteUnused":y.commands.executeCommand("ricwiz.deleteUnusedBranches");break;case"conflict_commitAndContinue":y.commands.executeCommand("ricwiz.conflictAction","commitAndContinue");break;case"conflict_resolveDeletions":y.commands.executeCommand("ricwiz.conflictAction","resolveDeletions");break;case"conflict_abortDeploy":y.commands.executeCommand("ricwiz.conflictAction","abortDeploy");break;case"openFile":if(r.file){let m=y.workspace.workspaceFolders;if(m){let a=y.Uri.joinPath(m[0].uri,r.file);y.commands.executeCommand("vscode.open",a)}}break;case"searchTicket":y.commands.executeCommand("ricwiz.searchTicket");break;case"manualRefresh":y.commands.executeCommand("ricwiz.manualRefresh");break;case"toggleAutoRefresh":y.commands.executeCommand("ricwiz.toggleAutoRefresh");break;case"openHistory":y.commands.executeCommand("ricwiz.openHistory");break}})}conflictState=null;setConflictState(e){this.conflictState=e,this.updateView()}updateBranch(e,o,s=[],r=[],m=[],a=[],g=""){this.webviewView&&(this.currentBranchCache=e,this.currentBranchIsMergedCache=o,this.relatedBranchesCache=s,this.commitsCache=r,this.baseBranchesCache=m,this.recentTicketsCache=a,this.ticketTitleCache=g,this.updateView())}currentBranchCache="";currentBranchIsMergedCache=!1;relatedBranchesCache=[];commitsCache=[];baseBranchesCache=[];recentTicketsCache=[];ticketTitleCache="";currentPage="main";blameDataCache=null;jiraDataCache=null;dashboardDataCache=null;autoRefreshEnabled=!0;setBlameData(e){this.blameDataCache=e}setJiraData(e){this.jiraDataCache=e}setDashboardData(e){this.dashboardDataCache=e}setAutoRefresh(e){this.autoRefreshEnabled=e,this.updateView()}isAutoRefreshEnabled(){return this.autoRefreshEnabled}setPage(e){this.currentPage=e,this.updateView()}updateView(){if(!this.webviewView)return;let e=this.webviewView.webview.asWebviewUri(y.Uri.joinPath(this._extensionUri,"resources","logo.png"));this.webviewView.webview.html=this._getHtmlForWebview(e,this.currentBranchCache,this.relatedBranchesCache,this.commitsCache,this.baseBranchesCache,this.recentTicketsCache,this.currentPage)}_getHtmlForWebview(e,o,s,r,m,a,g){let u=r.length>0?`
            <div class="separator"></div>
            <div style="padding: 0 4px;">
                <div style="font-size: 11px; opacity: 0.7; margin-bottom: 6px; display: flex; align-items: center; gap: 4px;">
                    <span>\u{1F4DC}</span> Recent Commits
                </div>
                <div style="display: flex; flex-direction: column; gap: 2px;">
                    ${r.map(i=>`
                        <div style="font-size: 11px; padding: 3px 4px; border-radius: 2px; display: flex; gap: 6px; align-items: baseline;">
                            <code style="color: var(--vscode-textLink-foreground); font-size: 10px; flex-shrink: 0;">${C(i.hash)}</code>
                            <span style="flex: 1; overflow: hidden; text-overflow: ellipsis; white-space: nowrap;" title="${C(i.message)}">${C(i.message)}</span>
                            <span style="font-size: 9px; opacity: 0.5; flex-shrink: 0;">${C(i.timeAgo)}</span>
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
        `;if(this.conflictState){let i=(this.conflictState.files||[]).map(n=>`
                <button class="btn" style="padding: 6px; font-size: 12px; display: flex; justify-content: space-between; align-items: center;" onclick="sendOpenFileCommand('${C(n.file)}')">
                    <span style="flex: 1; overflow: hidden; text-overflow: ellipsis; white-space: nowrap; direction: rtl; text-align: left;">&lrm;${C(n.file)}</span>
                    <span style="font-size: 10px; opacity: 0.8; flex-shrink: 0; background-color: var(--vscode-badge-background); color: var(--vscode-badge-foreground); padding: 2px 4px; border-radius: 2px;">${C(n.state)}</span>
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
                
                ${i?`
                    <div style="font-size: 11px; opacity: 0.7; margin: 8px 4px 4px 4px; text-transform: uppercase;">Conflicted Files</div>
                    <div style="display: flex; flex-direction: column; gap: 2px;">
                        ${i}
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
            </html>`}if(g==="blame"){let i=this.blameDataCache;return`<!DOCTYPE html>
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

                ${i?`
                <div style="padding: 12px; background: var(--vscode-editor-background); border: 1px solid var(--vscode-widget-border); border-radius: 6px; margin-bottom: 12px;">
                    <div style="font-weight: bold; margin-bottom: 12px; font-size: 14px; text-align: center; color: var(--vscode-textLink-foreground); word-break: break-all;">
                        \u{1F4C4} ${i.fileName}
                    </div>


                    <div style="margin-bottom: 20px;">
                        <div style="font-size: 11px; font-weight: bold; opacity: 0.8; text-transform: uppercase; margin-bottom: 8px;"><span class="icon">\u{1F4BB}</span> Local Git (Last Commits)</div>
                        <ul style="list-style-type: none; padding: 0; margin: 0; display: flex; flex-direction: column; gap: 8px;">
                            ${i.gitHistory&&i.gitHistory.length>0?i.gitHistory.map(n=>`
                                <li style="background: var(--vscode-editorWidget-background); border: 1px solid var(--vscode-widget-border); padding: 8px 10px; border-radius: 4px; border-left: 4px solid var(--vscode-gitDecoration-modifiedResourceForeground);">
                                    <div style="display: flex; justify-content: space-between; margin-bottom: 4px; align-items: center;">
                                        <strong style="font-size: 13px;">${n.author}</strong>
                                        <span style="opacity: 0.7; font-size: 11px;">${n.time}</span>
                                    </div>
                                    <div style="font-size: 12px; margin-bottom: 6px; opacity: 0.9; font-style: italic;">"${n.message}"</div>
                                    <div style="font-family: monospace; font-size: 10px; opacity: 0.6;">Commit: ${n.hash}</div>
                                </li>
                            `).join(""):'<li style="opacity:0.7; font-size: 12px;">No Git history found.</li>'}
                        </ul>
                    </div>

                    <div style="margin-bottom: 20px;">
                        <div style="font-size: 11px; font-weight: bold; opacity: 0.8; text-transform: uppercase; margin-bottom: 8px;"><span class="icon">\u2601\uFE0F</span> Salesforce Metadata</div>
                        <div style="display: flex; flex-direction: column; gap: 8px;">
                            <div style="background: var(--vscode-editorWidget-background); border: 1px solid var(--vscode-widget-border); padding: 8px 10px; border-radius: 4px; border-left: 4px solid var(--vscode-gitDecoration-addedResourceForeground);">
                                <div style="font-size: 10px; opacity: 0.7; text-transform: uppercase; margin-bottom: 2px;">Last Modified By</div>
                                <div style="font-weight: bold; font-size: 13px;">${i.sfAuthor}</div>
                                <div style="font-size: 11px; opacity: 0.7; margin-top: 2px;">${i.sfTime}</div>
                            </div>
                            ${i.sfCreatedBy!=="Unknown"&&i.sfCreatedBy!=="N/A"?`
                            <div style="background: var(--vscode-editorWidget-background); border: 1px solid var(--vscode-widget-border); padding: 8px 10px; border-radius: 4px; border-left: 4px solid var(--vscode-gitDecoration-addedResourceForeground);">
                                <div style="font-size: 10px; opacity: 0.7; text-transform: uppercase; margin-bottom: 2px;">Created By</div>
                                <div style="font-weight: bold; font-size: 13px;">${i.sfCreatedBy}</div>
                            </div>
                            `:""}
                        </div>
                    </div>

                    <div>
                        <div style="font-size: 11px; font-weight: bold; opacity: 0.8; text-transform: uppercase; margin-bottom: 8px;"><span class="icon">\u{1F575}\uFE0F</span> Setup Audit Trail (Recent)</div>
                        <ul style="list-style-type: none; padding: 0; margin: 0; display: flex; flex-direction: column; gap: 8px;">
                            ${i.auditHistory&&i.auditHistory.length>0?i.auditHistory.map(n=>`
                                <li style="background: var(--vscode-editorWidget-background); border: 1px solid var(--vscode-widget-border); padding: 8px 10px; border-radius: 4px; border-left: 4px solid var(--vscode-gitDecoration-untrackedResourceForeground);">
                                    <div style="display: flex; justify-content: space-between; margin-bottom: 4px; align-items: center;">
                                        <strong style="font-size: 13px;">${n.author}</strong>
                                        <span style="opacity: 0.7; font-size: 11px;">${n.time}</span>
                                    </div>
                                    <div style="font-size: 12px; font-weight: 500; margin-bottom: 4px;">${n.action}</div>
                                    <div style="font-size: 11px; opacity: 0.7; font-style: italic; background: var(--vscode-editor-background); padding: 4px; border-radius: 3px;">${n.display}</div>
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
            </html>`}if(g==="jira"){let i=this.jiraDataCache,n=i?.ticketId||"Jira",c=i?.summary||"No Title",d=i?.description||"No description provided.";return`<!DOCTYPE html>
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
                    <span style="font-weight: 600; font-size: 13px;">${n} Details</span>
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
            </html>`}if(g==="dashboard"){let i=this.dashboardDataCache||{queries:[],selectedIndex:0,results:[],error:null},n=i.queries.map((d,f)=>`
                <option value="${f}" ${f===i.selectedIndex?"selected":""}>${C(d.name)}</option>
            `).join(""),c=i.error?`
                <div style="color: var(--vscode-errorForeground); padding: 12px; text-align: center; background: var(--vscode-editorError-background); border-radius: 4px;">
                    \u26A0\uFE0F ${C(i.error)}
                </div>
            `:i.results.length===0?`
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
                        ${i.results.map(d=>`
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
                
                ${i.queries.length>0?`
                <div style="margin-bottom: 12px;">
                    <select id="querySelect" onchange="sendCommand('switchDashboardQuery', this.value)">
                        ${n}
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
            </html>`}return g==="devtools"?`<!DOCTYPE html>
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

            ${o?`<div style="background-color: var(--vscode-editor-inactiveSelectionBackground); padding: 10px; border-radius: 6px; margin-bottom: 16px; border: 1px solid var(--vscode-panel-border); box-shadow: 0 2px 4px rgba(0,0,0,0.1);">
                    <div style="font-size: 10px; opacity: 0.7; margin-bottom: 4px; display: flex; align-items: center; justify-content: center; gap: 4px; text-transform: uppercase;">
                        Current Ticket / Branch
                        <button class="copy-btn" onclick="sendCommand('copyBranch')" title="Copy branch name to clipboard">\u{1F4CB}</button>
                    </div>
                    <div style="font-weight: bold; font-size: 14px; word-break: break-all; text-align: center; color: var(--vscode-textLink-foreground);">
                        ${C(o)} ${this.currentBranchIsMergedCache?'<span style="margin-left: 4px; background-color: var(--vscode-charts-green); color: white; border-radius: 3px; padding: 1px 4px; font-size: 10px; font-weight: bold;" title="Merged to target env">MERGED</span>':""}
                    </div>
                    ${this.ticketTitleCache?`<div style="font-size: 12px; margin-top: 6px; text-align: center; opacity: 0.9; font-style: italic;">${C(this.ticketTitleCache)}</div>`:""}
                    ${s.length>0?`
                        <div style="margin-top: 10px; border-top: 1px solid var(--vscode-panel-border); padding-top: 10px;">
                            <div style="font-size: 10px; opacity: 0.7; margin-bottom: 6px; text-transform: uppercase; text-align: center;">Sister Branches</div>
                            <div style="display: flex; flex-direction: column; gap: 4px;">
                                ${s.map(i=>`
                                    <div class="btn" style="padding: 4px 8px; font-size: 11px; display: flex; justify-content: space-between; align-items: center; background-color: var(--vscode-button-secondaryBackground); color: var(--vscode-button-secondaryForeground); border-radius: 4px;" onclick="sendCheckoutCommand('${C(i.name)}', this)" title="Checkout ${C(i.name)}">
                                        <span style="overflow: hidden; text-overflow: ellipsis; white-space: nowrap; font-weight: bold;">${C(i.name)}</span>
                                        ${i.isMerged?'<span style="background-color: var(--vscode-charts-green); color: white; border-radius: 3px; padding: 1px 4px; font-size: 9px; font-weight: bold;" title="Merged to target env">MERGED</span>':""}
                                    </div>
                                `).join("")}
                            </div>
                        </div>
                    `:a.length>0?`
                        <div style="margin-top: 10px; border-top: 1px solid var(--vscode-panel-border); padding-top: 10px;">
                            <div style="font-size: 10px; opacity: 0.7; margin-bottom: 6px; text-transform: uppercase; text-align: center;">Recent Tickets</div>
                            <div style="display: flex; flex-direction: column; gap: 4px;">
                                ${a.map(i=>`
                                    <div class="btn" style="padding: 4px 8px; font-size: 11px; display: flex; align-items: center; background-color: var(--vscode-button-secondaryBackground); color: var(--vscode-button-secondaryForeground); border-radius: 4px;" onclick="sendCheckoutCommand('${C(i)}', this)" title="Checkout ${C(i)}">
                                        <span style="font-weight: bold;">${C(i)}</span>
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

            ${m.length>0?`
                <div style="display: flex; gap: 4px; margin-bottom: 16px; flex-wrap: wrap; justify-content: center;">
                    ${m.map(i=>`
                        <button class="btn" style="flex: 1; min-width: 25%; justify-content: center; padding: 6px 4px; font-size: 10px; font-weight: bold; background-color: var(--vscode-button-secondaryBackground); color: var(--vscode-button-secondaryForeground); border-radius: 4px;" onclick="sendCheckoutCommand('${C(i)}', this)" title="Checkout ${C(i)}">
                            ${C(i.toUpperCase())}
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

            ${u}
            
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
        </html>`}}});function Ke(t){$e=t.secrets}async function et(t){if(!$e)throw new Error("SecretStorage is not initialized.");await $e.store("ricwiz.jiraApiToken",t)}async function tt(){if(!$e)throw new Error("SecretStorage is not initialized.");return await $e.get("ricwiz.jiraApiToken")}var $e,Fe=k(()=>{"use strict"});var Le={};_e(Le,{checkBranchExists:()=>le,exec:()=>p,extractTicketSuggestion:()=>rt,getCurrentBranch:()=>D,getWorkspaceCwd:()=>v,normalizeTicketId:()=>nt,promptForTicketId:()=>N,resolvePrefix:()=>st,ricwizLogger:()=>T});function v(){let t=be.workspace.workspaceFolders;if(t)return t[0].uri.fsPath}async function D(t){try{let{stdout:e}=await p("git branch --show-current",{cwd:t});return e.trim()}catch{return""}}function st(t,e){if(!t.includes(e)){let o=t.match(/([A-Z]+-)\d+/i);if(o)return o[1].toUpperCase()}return e}function rt(t,e,o=!1){let s=t.match(new RegExp(`(${e}\\d+)`,"i"));return s?s[1].toUpperCase():t.includes(e)&&!t.includes("-to-")?t.substring(t.indexOf(e)):o&&t.includes("-to-")?t.substring(t.indexOf(e)).split("-to-")[0]:""}function nt(t,e){let o=t.trim();return/^\d/.test(o)?`${e}${o}`.toUpperCase():o.toUpperCase()}async function N(t,e){let o=be.workspace.getConfiguration("ricwiz"),s=e?.prefix??o.get("ticketPrefix","SFPSCA-"),r=await D(t),m=st(r,s),a=e?.suggestedValue??rt(r,m,e?.handleToSuffix),g=await be.window.showInputBox({prompt:e?.prompt||"Enter the full ticket ID (e.g., SCPSCA-1234) or just the number",placeHolder:e?.placeHolder||"Ticket ID or number",value:a});return g?{ticketId:nt(g,m),currentBranch:r,prefix:m}:void 0}async function le(t,e){try{return await p(`git show-ref --verify --quiet refs/heads/${e}`,{cwd:t}),!0}catch{}try{return await p(`git show-ref --verify --quiet refs/remotes/origin/${e}`,{cwd:t}),!0}catch{}return!1}var be,ot,it,Uo,T,p,R=k(()=>{"use strict";be=b(require("vscode")),ot=b(require("child_process")),it=b(require("util")),Uo=it.promisify(ot.exec),T=be.window.createOutputChannel("Ricwiz"),p=async(t,e)=>{T.appendLine(`[EXEC] ${t}`);let o=await Uo(t,{maxBuffer:50*1024*1024,...e});return{stdout:o.stdout.toString(),stderr:o.stderr.toString()}}});async function at(){let t=v();if(!t){j.window.showErrorMessage("Ricwiz: Open a workspace that is a Git repository.");return}let o=j.workspace.getConfiguration("ricwiz").get("ticketSourceBranch","main");await j.window.withProgress({location:j.ProgressLocation.Notification,title:`Ricwiz: Finding deleted files compared to origin/${o}...`,cancellable:!1},async()=>{try{let{stdout:s}=await p(`git diff --name-only --diff-filter=D origin/${o}...HEAD`,{cwd:t}),r=s.split(`
`).map(c=>c.trim()).filter(c=>c.length>0);if(r.length===0){j.window.showInformationMessage(`Ricwiz: No deleted files found compared to origin/${o}.`);return}let m={},a=(c,d)=>{m[c]||(m[c]=[]),m[c].includes(d)||m[c].push(d)};for(let c of r){let d=c.replace(/\\/g,"/");if(d.includes("/classes/")){let f=d.match(/\/classes\/([^/.]+)\.cls/);f&&a("ApexClass",f[1])}else if(d.includes("/triggers/")){let f=d.match(/\/triggers\/([^/.]+)\.trigger/);f&&a("ApexTrigger",f[1])}else if(d.includes("/lwc/")){let f=d.match(/\/lwc\/([^/]+)\//);f&&a("LightningComponentBundle",f[1])}else if(d.includes("/aura/")){let f=d.match(/\/aura\/([^/]+)\//);f&&a("AuraDefinitionBundle",f[1])}else if(d.includes("/objects/")&&d.includes("/fields/")){let f=d.match(/\/objects\/([^/]+)\//),h=d.match(/\/fields\/([^/.]+)\.field/);f&&h&&a("CustomField",`${f[1]}.${h[1]}`)}else if(d.includes("/objects/")){let f=d.match(/\/objects\/([^/.]+)\.object/);f&&a("CustomObject",f[1])}else if(d.includes("/layouts/")){let f=d.match(/\/layouts\/([^/.]+)\.layout/);f&&a("Layout",f[1])}else if(d.includes("/flows/")){let f=d.match(/\/flows\/([^/.]+)\.flow/);f&&a("Flow",f[1])}else if(d.includes("/permissionsets/")){let f=d.match(/\/permissionsets\/([^/.]+)\.permissionset/);f&&a("PermissionSet",f[1])}else if(d.includes("/profiles/")){let f=d.match(/\/profiles\/([^/.]+)\.profile/);f&&a("Profile",f[1])}else if(d.includes("/customMetadata/")){let f=d.match(/\/customMetadata\/([^/.]+)\.md/);f&&a("CustomMetadata",f[1])}else if(d.includes("/flexipages/")){let f=d.match(/\/flexipages\/([^/.]+)\.flexipage/);f&&a("FlexiPage",f[1])}}if(Object.keys(m).length===0){j.window.showInformationMessage("Ricwiz: Found deleted files in Git, but none mapped to recognizable Salesforce metadata.");return}let g=`<?xml version="1.0" encoding="UTF-8"?>
<Package xmlns="http://soap.sforce.com/2006/04/metadata">
`;for(let c of Object.keys(m).sort()){g+=`    <types>
`;for(let d of m[c].sort())g+=`        <members>${d}</members>
`;g+=`        <name>${c}</name>
    </types>
`}g+=`    <version>58.0</version>
</Package>`;let u=Oe.join(t,"destructiveChanges");me.existsSync(u)||me.mkdirSync(u);let l=Oe.join(u,"destructiveChanges.xml"),i=Oe.join(u,"package.xml");me.writeFileSync(l,g,"utf8"),me.existsSync(i)||me.writeFileSync(i,`<?xml version="1.0" encoding="UTF-8"?>
<Package xmlns="http://soap.sforce.com/2006/04/metadata">
    <version>58.0</version>
</Package>`,"utf8");let n=await j.workspace.openTextDocument(l);await j.window.showTextDocument(n),j.window.showInformationMessage("Ricwiz: destructiveChanges.xml generated successfully!")}catch(s){j.window.showErrorMessage(`Ricwiz: Error generating destructive changes: ${s.message}`)}})}var j,Oe,me,ct=k(()=>{"use strict";j=b(require("vscode")),Oe=b(require("path")),me=b(require("fs"));R()});async function dt(){let t=v();if(!t)return;let o=ee.workspace.getConfiguration("ricwiz").get("ticketSourceBranch","main");await ee.window.withProgress({location:ee.ProgressLocation.Notification,title:"Ricwiz: Finding Apex Tests to run...",cancellable:!1},async()=>{try{let{stdout:s}=await p(`git diff --name-status origin/${o}...HEAD`,{cwd:t}),r=s.split(`
`).map(c=>c.trim()).filter(c=>c.length>0),m=new Set,a=new Set;for(let c of r){let d=c.split(/\s+/);if(d[0].startsWith("D"))continue;let f=d[1];if(f&&f.endsWith(".cls")){let h=f.match(/\/classes\/([^/.]+)\.cls/);if(h){let w=h[1];w.toLowerCase().endsWith("test")?m.add(w):a.add(w)}}}for(let c of a)m.add(`${c}Test`);if(m.size===0){ee.window.showInformationMessage("Ricwiz: No Apex Classes were modified in this branch.");return}let g=Array.from(m).map(c=>({label:`$(beaker) ${c}`,description:"Apex Test Class"})),u=await ee.window.showQuickPick(g,{canPickMany:!0,title:"Select Test Classes to Run",placeHolder:"Select tests..."});if(!u||u.length===0)return;let i=`sf apex run test -n ${u.map(c=>c.label.replace("$(beaker) ","").trim()).join(",")} -r human -w 30`,n=ee.window.createTerminal("Ricwiz: Smart Tests");n.show(),n.sendText(i)}catch(s){ee.window.showErrorMessage(`Ricwiz: Error finding tests: ${s.message}`)}})}var ee,lt=k(()=>{"use strict";ee=b(require("vscode"));R()});var fe,mt=k(()=>{"use strict";fe=class{static isValidShellArg(e){return e?/^[a-zA-Z0-9\-_/.]+$/.test(e):!1}}});var ze,ut,Ne,A,se=k(()=>{"use strict";ze=b(require("vscode")),ut=b(require("path")),Ne=b(require("fs")),A=class t{style;upstreamRemote;originRemote;ticketSourceBranch;ticketPrefix;environments;static baseConfig=ze.workspace.getConfiguration("ricwiz");activeProfile;profileName;constructor(e){this.activeProfile=e,this.profileName=e?.name;let o=t.baseConfig;this.style=e?.workflowStyle||o.get("workflowStyle","standard"),this.style==="multi-remote"?(this.upstreamRemote=e?.upstreamRemote||o.get("upstreamRemote","salesforce-master"),this.originRemote=e?.originRemote||o.get("originRemote","origin")):(this.upstreamRemote="origin",this.originRemote="origin"),this.ticketSourceBranch=e?.ticketSourceBranch||o.get("ticketSourceBranch","main"),this.ticketPrefix=e?.ticketPrefix||o.get("ticketPrefix","SFPSCA-");let s=[{name:"Qual",sourceBranch:"quality"},{name:"Val",sourceBranch:"validation"},{name:"Prod",sourceBranch:"main"}];this.environments=e?.environments||o.get("environments",s)}getConfig(e,o){return this.activeProfile&&this.activeProfile[e]!==void 0?this.activeProfile[e]:t.baseConfig.get(e,o)}static async initialize(e,o){let s=t.baseConfig.get("profiles",[]),r=ut.join(e,"ricwiz.json");if(Ne.existsSync(r))try{let m=Ne.readFileSync(r,"utf-8"),a=JSON.parse(m);a&&Array.isArray(a.profiles)&&(s=[...s,...a.profiles])}catch(m){ze.window.showErrorMessage(`Ricwiz: Error parsing ricwiz.json: ${m.message}`)}if(s.length>0){if(!o?.forcePrompt)try{let{exec:u}=(R(),ge(Le)),{stdout:l}=await u("git branch --show-current",{cwd:e}),i=l.trim(),n=i;i.includes("-to-")&&(n=i.split("-to-")[0]);let{stdout:c}=await u(`git config branch.${n}.ricwiz-profile`,{cwd:e}),d=c.trim();if(d){let f=s.find(h=>h.name===d);if(f)return new t(f)}}catch{}let m=s.map(u=>u.name),a=await ze.window.showQuickPick(m,{placeHolder:"Ricwiz: Select Workflow Profile",ignoreFocusOut:!0});if(!a)return;let g=s.find(u=>u.name===a);return new t(g)}return new t}buildUpstreamPath(e){return e.includes("/")?e:`${this.upstreamRemote}/${e}`}getFetchRemote(e){return e.includes("/")?e.split("/")[0]:this.upstreamRemote}getFetchBranch(e){return e.includes("/")?e.substring(e.indexOf("/")+1):e}}});async function pt(t){let e=v();if(!e){B.window.showErrorMessage("Open a folder or workspace that is a Git repository.");return}let o=await A.initialize(e,{forcePrompt:!0});if(!o)return;let s=typeof t=="string"?t:void 0,r=await N(e,{prefix:o.ticketPrefix,suggestedValue:s});if(!r){B.window.showErrorMessage("Branch creation cancelled: Ticket not provided.");return}let{ticketId:m}=r,a=o.environments,g="all",u=[{label:"Create Main Branch & Environments",description:"Creates the main ticket branch and all environment branches",value:"all"},{label:"Create Main Branch Only",description:"Creates only the main ticket branch (skips environments)",value:"mainOnly"},{label:"Create Environments Only",description:"Creates only the environment branches (skip main branch)",value:"envs"}];if(a.length>0){let n=await B.window.showQuickPick(u,{placeHolder:"Ricwiz: What do you want to create?",ignoreFocusOut:!0});if(!n)return;g=n.value}let l=o.ticketSourceBranch;if(g==="all"||g==="mainOnly"){let n=[];try{let{stdout:h}=await p('git branch --all --format="%(refname:short)"',{cwd:e});n=h.split(`
`).map(w=>w.trim()).filter(w=>w&&w!=="origin"),n=[...new Set(n)]}catch{}let c=B.window.createQuickPick();c.title="Ricwiz: Ticket Source Branch",c.placeholder="Confirm or change the source branch for this ticket",c.value=o.ticketSourceBranch,c.ignoreFocusOut=!0;let d=()=>{let h=c.value.trim(),w=[];h&&w.push({label:h,description:"Use typed branch"}),w.push(...n.map(z=>({label:z}))),c.items=w};c.onDidChangeValue(d),d();let f=await new Promise(h=>{c.onDidAccept(()=>{let w=c.selectedItems[0];h(w?w.label:c.value),c.hide()}),c.onDidHide(()=>h(void 0)),c.show()});if(!f){B.window.showInformationMessage("Branch creation cancelled.");return}l=f.trim()}let i=m;if(!fe.isValidShellArg(i)){B.window.showErrorMessage(`Invalid format for ticket ID: ${i}`);return}if(!fe.isValidShellArg(l)){B.window.showErrorMessage(`Invalid format for ticketSourceBranch in settings: ${l}`);return}for(let n of a){if(!fe.isValidShellArg(n.name)){B.window.showErrorMessage(`Invalid format for environment name in settings: ${n.name}`);return}if(!fe.isValidShellArg(n.sourceBranch)){B.window.showErrorMessage(`Invalid format for environment sourceBranch in settings: ${n.sourceBranch}`);return}}try{await p("git status",{cwd:e})}catch{B.window.showErrorMessage("The opened folder does not appear to be a valid Git repository.");return}try{await B.window.withProgress({location:B.ProgressLocation.Notification,title:"Ricwiz: Creating Branches",cancellable:!1},async n=>{let c=[];n.report({message:"Checking remote status (git fetch)...",increment:10});try{await p("git fetch",{cwd:e})}catch{}try{if(g==="all"||g==="mainOnly"){if(n.report({message:`Creating main branch ${i}...`,increment:10}),await le(e,i))B.window.showInformationMessage(`Ricwiz: The branch ${i} already exists. Skipping creation...`),await p(`git checkout ${i}`,{cwd:e});else try{let d=o.getFetchRemote(l),f=o.getFetchBranch(l),h=o.buildUpstreamPath(l);await p(`git fetch ${d} ${f}`,{cwd:e}),await p(`git checkout -b ${i} ${h}`,{cwd:e}),c.push(i)}catch{try{await p(`git checkout -b ${i} ${l}`,{cwd:e}),c.push(i)}catch{throw new Error(`Could not create main branch '${i}' from '${l}'. Does the source branch exist?`)}}try{await p(`git config branch.${i}.ricwiz-source "${l}"`,{cwd:e}),o.profileName&&await p(`git config branch.${i}.ricwiz-profile "${o.profileName}"`,{cwd:e})}catch{}}if(g==="all"||g==="envs"){let d=50/(a.length||1);for(let f of a){let h=`${m}-to-${f.name}`,w=f.sourceBranch;if(n.report({message:`Processing environment branch ${h}...`,increment:d}),!await le(e,h))try{let z=o.buildUpstreamPath(w);await p(`git checkout -b ${h} ${z}`,{cwd:e}),c.push(h)}catch{try{await p(`git checkout -b ${h} ${w}`,{cwd:e}),c.push(h)}catch{throw new Error(`Could not create environment branch '${h}' from '${w}'. Does the source branch exist?`)}}}}n.report({message:`Publishing branches to ${o.originRemote}...`,increment:10});for(let d of c)try{await p(`git push -u ${o.originRemote} ${d}`,{cwd:e})}catch{B.window.showWarningMessage(`Ricwiz: Branch ${d} was created locally but could not be pushed to ${o.originRemote}.`)}if(g==="all"||g==="mainOnly"){n.report({message:`Switching to ${i}...`,increment:10});try{await p(`git checkout ${i}`,{cwd:e})}catch{}}n.report({increment:100}),B.window.showInformationMessage("Ricwiz: All set! You can start working on your branches! \u{1F680}")}catch(d){if(B.window.showErrorMessage(`Ricwiz Branch Creation Failed: ${d.message}`),c.length>0){try{await p(`git checkout ${l}`,{cwd:e})}catch{}for(let f of c)try{await p(`git branch -D ${f}`,{cwd:e})}catch{}B.window.showWarningMessage(`Ricwiz: Rolled back (deleted) ${c.length} branch(es) locally due to failure.`)}}})}catch(n){B.window.showErrorMessage(`Ricwiz general error: ${n.message}`)}}var B,gt=k(()=>{"use strict";B=b(require("vscode"));R();mt();se()});async function he(t,e,o,s){s&&s.report({message:"CONFLICT! Resolve & click 'Commit & Continue' in Ricwiz panel."});let r=!1,m=!1,a=async()=>{try{let{stdout:i}=await p("git status --porcelain",{cwd:t});return i.split(`
`).filter(n=>{let c=n.substring(0,2);return["UD","DU","DD","AU","UA"].includes(c)}).map(n=>n.substring(3).trim())}catch{return[]}},g=async()=>{try{let{stdout:i}=await p("git status --porcelain",{cwd:t}),n=c=>c==="UU"?"Both Modified":c==="UD"?"Deleted by them":c==="DU"?"Deleted by us":c==="DD"?"Both Deleted":c==="AA"?"Both Added":c==="AU"?"Added by us":c==="UA"?"Added by them":"Conflicted";return i.split(`
`).map(c=>c.trimRight()).filter(c=>c.length>2).filter(c=>{let d=c.substring(0,2);return["UU","AA","UD","DU","AU","UA","DD"].includes(d)}).map(c=>{let d=c.substring(0,2);return{file:c.substring(3).trim(),state:n(d)}})}catch{return[]}},u=async()=>{if(r)return;let i=await a(),n=await g(),{webviewProvider:c}=(Je(),ge(je));c&&c.setConflictState({isConflict:!0,sourceStr:e,targetStr:o,deletionsCount:i.length,files:n})},l=te.commands.registerCommand("ricwiz.conflictAction",async i=>{if(i==="abortDeploy")m=!0;else if(i==="resolveDeletions"){try{let c=(await a()).map(f=>({label:f})),d=await te.window.showQuickPick(c,{canPickMany:!0,placeHolder:"Select conflicted files to DELETE",title:"Ricwiz: Delete Conflicted Files"});if(d&&d.length>0){for(let f of d)try{await p(`git rm --force "${f.label}"`,{cwd:t})}catch{}te.window.showInformationMessage(`Ricwiz: Deleted ${d.length} conflicted file(s).`)}}catch(n){te.window.showErrorMessage(`Ricwiz: Error. (${n.message})`)}u()}else if(i==="commitAndContinue")try{let c=(await a()).filter(f=>ft.existsSync(ht.join(t,f)));if(c.length>0&&await te.window.showWarningMessage(`Wait! There are ${c.length} file(s) with deletion conflicts that are still on your disk.

If you commit now, you will KEEP them in the project.

Are you sure you want to KEEP them?`,{modal:!0},"Yes, KEEP them","No, let me DELETE them")!=="Yes, KEEP them"){u();return}let d=!1;try{let{stdout:f}=await p('git grep -E "^<<<<<<< "',{cwd:t});f.trim().length>0&&(d=!0)}catch{}if(d){te.window.showErrorMessage("Ricwiz: You still have unresolved conflict markers (<<<<<<<) in your files. Please resolve them first!"),u();return}await p("git add .",{cwd:t}),await p("git commit --no-edit",{cwd:t})}catch(n){te.window.showErrorMessage(`Ricwiz: Could not commit automatically. (${n.message})`),u()}});for(u();;){if(m){r=!0,l.dispose(),(Je(),ge(je)).webviewProvider?.setConflictState(null);try{await p("git merge --abort",{cwd:t})}catch{}return!1}try{let{stdout:i}=await p("git status --porcelain",{cwd:t});if(i.trim().length===0)return r=!0,l.dispose(),(Je(),ge(je)).webviewProvider?.setConflictState(null),te.window.showInformationMessage("Ricwiz: Changes committed!"),!0}catch{}await new Promise(i=>setTimeout(i,2e3))}}var te,ft,ht,Ue=k(()=>{"use strict";te=b(require("vscode")),ft=b(require("fs")),ht=b(require("path"));R()});async function wt(){let t=v();if(!t){L.window.showErrorMessage("Ricwiz: Open a folder or workspace that is a Git repository.");return}try{await p("git status",{cwd:t})}catch{L.window.showErrorMessage("Ricwiz: The opened folder does not appear to be a valid Git repository.");return}let e=await A.initialize(t);if(!e)return;let o=e.environments,s=await N(t,{prefix:e.ticketPrefix});if(!s){L.window.showErrorMessage("Operation cancelled: Ticket not provided.");return}let{ticketId:r,currentBranch:m}=s,a=r;if(!await le(t,a)){L.window.showErrorMessage(`Ricwiz: Main branch '${a}' does not exist! Prepare deploy is only available when a main ticket branch is used.`);return}let g=e.getConfig("defaultReviewers",""),u="";try{let{stdout:l}=await p(`git config branch.${r}.ricwiz-reviewers`,{cwd:t});u=l.trim()}catch{}if(g.trim()){let l=await L.window.showInputBox({prompt:"Ricwiz: Reviewers for this deploy (optional, comma-separated)",placeHolder:"e.g. @joao, 123456",value:u||g,ignoreFocusOut:!0});if(l===void 0)return;try{l.trim()?await p(`git config branch.${r}.ricwiz-reviewers "${l.trim()}"`,{cwd:t}):u&&await p(`git config --unset branch.${r}.ricwiz-reviewers`,{cwd:t})}catch{}}await L.window.withProgress({location:L.ProgressLocation.Notification,title:"Ricwiz: Preparing Deploy",cancellable:!0},async(l,i)=>{let n=0,c=m,d=!1;i.onCancellationRequested(()=>{d=!0}),l.report({message:"Syncing remote information...",increment:10});try{await p("git fetch --all",{cwd:t});let h=10/(o.length||1);for(let w of o)try{if(d)throw new Error("Aborted");l.report({message:`Fetching ${w.sourceBranch}...`,increment:h});let z=e.getFetchRemote(w.sourceBranch),P=e.getFetchBranch(w.sourceBranch);await p(`git fetch ${z} ${P}:${P}`,{cwd:t})}catch{}}catch{}let f=60/(o.length||1);for(let h of o){if(d)break;let w=`${r}-to-${h.name}`,z=h.sourceBranch;try{l.report({message:`Processing ${w}...`,increment:f/4}),await p(`git checkout ${w}`,{cwd:t});try{await p(`git pull ${e.originRemote} ${w}`,{cwd:t})}catch{}let P=async K=>{try{await p(`git merge ${K}`,{cwd:t})}catch(S){let F=!1;try{let{stdout:U}=await p("git ls-files -u",{cwd:t});U.trim().length>0&&(F=!0)}catch{}let J=((S.stdout||"")+(S.stderr||"")+(S.message||"")).toLowerCase();if(F||J.includes("conflict")||J.includes("conflit")){if(!await he(t,K,w,l))throw d=!0,new Error("Deploy aborted by user.")}else throw S}};l.report({message:`Merging ${z} into ${w}...`,increment:f/4});let ce=e.getFetchRemote(z),ue=e.getFetchBranch(z),pe=e.buildUpstreamPath(z);if(await p(`git fetch ${ce} ${ue}`,{cwd:t}),await P(pe),l.report({message:`Merging ${a} into ${w}...`,increment:f/4}),await P(a),d)break;l.report({message:`Pushing ${w}...`,increment:f/4}),await p(`git push ${e.originRemote} ${w}`,{cwd:t}),n++}catch(P){P.message.includes("aborted")?L.window.showInformationMessage("Ricwiz: Deploy cancelled."):L.window.showErrorMessage(`Ricwiz: Failed to process branch ${w}. Detail: ${P.message}`);return}}if(!d){l.report({message:"Finishing up...",increment:10});let h=c;try{await p(`git show-ref --verify --quiet refs/heads/${a}`,{cwd:t}),h=a}catch{}try{let w=await D(t);h&&h!==w?(await p(`git checkout ${h}`,{cwd:t}),L.window.showInformationMessage(`Ricwiz: Operation complete. Back on branch ${h}.`)):L.window.showInformationMessage("Ricwiz: Operation complete.")}catch{L.window.showInformationMessage("Ricwiz: Operation complete.")}}})}var L,vt=k(()=>{"use strict";L=b(require("vscode"));R();Ue();se()});async function bt(t=!1){let e=v();if(!e)return;let o=await A.initialize(e);if(!o)return;let s=await N(e,{prompt:"Enter the full ticket ID for the Merge Requests (e.g., SCPSCA-1234) or just the number"});if(!s)return;let{ticketId:r}=s,a=Y.workspace.getConfiguration("ricwiz").get("gitlabUrlOverride",""),g="";if(a&&a.trim()!=="")g=a.trim();else{let i="";try{let{stdout:n}=await p("git remote get-url origin",{cwd:e});i=n.trim()}catch{Y.window.showErrorMessage("Ricwiz: Could not get the remote origin URL. Please configure the URL manually in the extension settings.");return}g=i,g.endsWith(".git")&&(g=g.slice(0,-4)),g.startsWith("git@")&&(g=g.replace("git@","").replace(":","/"),g=`https://${g}`)}let u=[],l=o.ticketSourceBranch;try{let{stdout:i}=await p(`git config branch.${r}.ricwiz-source`,{cwd:e});i.trim()&&(l=i.trim())}catch{}if(o.environments.length===0)u.push({source:r,target:l});else for(let i of o.environments)u.push({source:`${r}-to-${i.name}`,target:i.sourceBranch});for(let i of u){let n=`${g}/-/merge_requests/new?merge_request[source_branch]=${i.source}&merge_request[target_branch]=${i.target}`;t?Y.commands.executeCommand("simpleBrowser.show",n):Y.env.openExternal(Y.Uri.parse(n))}Y.window.showInformationMessage(`Ricwiz: Opening ${t?"VS Code browser":"external browser"} for Merge Requests!`)}async function yt(){return bt(!1)}async function xt(){return bt(!0)}var Y,kt=k(()=>{"use strict";Y=b(require("vscode"));R();se()});async function Ct(t=!1){let e=v();if(!e)return;let o=_.workspace.getConfiguration("ricwiz"),s=o.get("jiraUrl","");if(!s||s.trim()===""){_.window.showErrorMessage("Ricwiz: Jira URL is not configured. Please set it in the extension settings (e.g., https://jira.company.com/browse/).");return}let{getCurrentBranch:r,resolvePrefix:m,extractTicketSuggestion:a}=(R(),ge(Le)),g=await r(e),u=o.get("ticketPrefix","SFPSCA-"),l=m(g,u),n=a(g,l,!0);if(n){let{normalizeTicketId:d}=(R(),ge(Le));n=d(n,l)}else{let d=await N(e,{prompt:"Ricwiz could not detect the ticket from the branch name. Enter Jira ticket ID (e.g. SFPSCA-1234)",handleToSuffix:!0});if(!d)return;n=d.ticketId}let c=s.trim();c.endsWith("/")||(c+="/"),c+=n,t?_.commands.executeCommand("simpleBrowser.show",c):_.env.openExternal(_.Uri.parse(c)),_.window.showInformationMessage(`Ricwiz: Opening Jira Ticket ${n} in ${t?"VS Code":"browser"}!`)}async function $t(){return Ct(!1)}async function zt(){return Ct(!0)}var _,Rt=k(()=>{"use strict";_=b(require("vscode"));R()});async function Wo(){let t=St.workspace.getConfiguration("ricwiz"),e=t.get("jiraUrl",""),o=t.get("jiraEmail","")?.trim(),s=(await tt())?.trim();if(!e||!s)throw new Error('Jira API Token is not securely configured. Please run the "Ricwiz: Set Secure Jira API Token" command.');let r=e;r.includes("/browse")&&(r=r.split("/browse")[0]),r.endsWith("/")&&(r=r.slice(0,-1));let m=o?`Basic ${Buffer.from(`${o}:${s}`).toString("base64")}`:`Bearer ${s}`;return{baseUrl:r,headerAuth:m}}async function ye(t,e,o){let{baseUrl:s,headerAuth:r}=await Wo(),m=new URL(`${s}${e}`);return new Promise((a,g)=>{let u=Pt.request(m,{method:t,headers:{Authorization:r,Accept:"application/json",...o?{"Content-Type":"application/json"}:{}}},l=>{let i="";l.on("data",n=>i+=n),l.on("end",()=>{if(l.statusCode===401||l.statusCode===403)return g(new Error(`Authentication failed (HTTP ${l.statusCode}). Please check your Jira settings.`));if(l.statusCode&&l.statusCode>=400){let n="";try{let c=JSON.parse(i);c.errorMessages&&c.errorMessages.length>0&&(n=c.errorMessages.join(", "))}catch{}return l.statusCode===404||l.statusCode===410?g(new Error(`Ticket not found or deleted (HTTP ${l.statusCode}). ${n}`)):g(new Error(`Jira API returned HTTP status ${l.statusCode}. ${n}`))}if(!i)return a({});try{let n=JSON.parse(i);a(n)}catch{g(new Error("Failed to parse Jira response."))}})});u.on("error",l=>g(new Error(`Network error: ${l.message}`))),o&&u.write(JSON.stringify(o)),u.end()})}async function xe(t){let e=await ye("GET",`/rest/api/2/issue/${t}`);return e&&e.fields?{summary:e.fields.summary||"",description:e.fields.description||"No description provided."}:null}async function Bt(t){let e=await ye("GET",`/rest/api/2/issue/${t}/transitions`);return e&&e.transitions?e.transitions.map(o=>({id:o.id,name:o.name})):[]}async function Et(t,e){await ye("POST",`/rest/api/2/issue/${t}/transitions`,{transition:{id:e}})}async function Mt(t,e){await ye("POST",`/rest/api/2/issue/${t}/comment`,{body:e})}async function Tt(t,e){await ye("PUT",`/rest/api/2/issue/${t}`,{update:{labels:[{add:e}]}})}async function Dt(t){let e=await ye("POST","/rest/api/3/search/jql",{jql:t,maxResults:50,fields:["summary","status","assignee"]});return e&&e.issues?e.issues.map(o=>({key:o.key,summary:o.fields?.summary||"No Title",status:o.fields?.status?.name||"Unknown",assignee:o.fields?.assignee?.displayName||"Unassigned"})):[]}var Pt,St,Re=k(()=>{"use strict";Pt=b(require("https")),St=b(require("vscode"));Fe()});async function At(t){let e=v();if(e)try{if(!await A.initialize(e))return;let r=(await D(e)).split("-to-")[0];if(!r){oe.window.showErrorMessage("Ricwiz: You are not currently on a valid ticket branch.");return}await oe.window.withProgress({location:oe.ProgressLocation.Notification,title:`Fetching details for ${r}...`,cancellable:!1},async m=>{let a=await xe(r);a?(t.setJiraData({ticketId:r,...a}),t.setPage("jira")):oe.window.showErrorMessage("Ricwiz: No data found for this ticket.")})}catch(o){o.message.includes("securely configured")?await oe.window.showErrorMessage(o.message,"Set Token Now")==="Set Token Now"&&oe.commands.executeCommand("ricwiz.setJiraToken"):oe.window.showErrorMessage(`Ricwiz Jira Error: ${o.message}`)}}var oe,It=k(()=>{"use strict";oe=b(require("vscode"));R();se();Re()});async function Ft(t,e){let s=re.workspace.getConfiguration("ricwiz").get("jiraDashboards",[]);if(e!==void 0&&(we=e),!s||s.length===0){t.setDashboardData({queries:[],selectedIndex:0,results:[],error:"No queries defined in settings. Go to Settings > Ricwiz > Jira Dashboards."}),t.setPage("dashboard");return}we>=s.length&&(we=0);let r=s[we];t.setDashboardData({queries:s,selectedIndex:we,results:[],error:"\u23F3 Loading tickets..."}),t.setPage("dashboard");try{let m=await Dt(r.jql),a=re.workspace.workspaceFolders?.[0]?.uri.fsPath,g=[];if(a)try{let l=require("child_process"),n=require("util").promisify(l.exec),{stdout:c}=await n("git branch",{cwd:a});g=c.split(`
`).map(d=>d.replace("*","").trim()).filter(d=>d)}catch{}let u=m.map(l=>{let i=g.find(n=>n.includes(l.key));return{...l,branch:i||null}});t.setDashboardData({queries:s,selectedIndex:we,results:u,error:null}),t.setPage("dashboard")}catch(m){let a=m.message;(a.includes("ENOTFOUND")||a.includes("network"))&&(a="No Internet or Invalid URL"),t.setDashboardData({queries:s,selectedIndex:we,results:[],error:a}),t.setPage("dashboard")}}async function Lt(t,e){await re.window.withProgress({location:re.ProgressLocation.Notification,title:`Fetching details for ${e}...`,cancellable:!1},async()=>{try{let o=await xe(e);o?(t.setJiraData({ticketId:e,...o}),t.setPage("jira")):re.window.showErrorMessage(`Ricwiz: No data found for ticket ${e}.`)}catch(o){re.window.showErrorMessage(`Ricwiz Jira Error: ${o.message}`)}})}var re,we,Ot=k(()=>{"use strict";re=b(require("vscode"));Re();we=0});async function Ge(){let t=v();return!t||!await A.initialize(t,{forcePrompt:!1})?void 0:(await D(t)).split("-to-")[0]}async function Nt(){try{let t=await Ge();if(!t){$.window.showErrorMessage("Ricwiz: You are not on a valid ticket branch.");return}let e=await $.window.withProgress({location:$.ProgressLocation.Notification,title:`Fetching available status for ${t}...`,cancellable:!1},()=>Bt(t));if(!e||e.length===0){$.window.showInformationMessage(`Ricwiz: No transitions available for ${t}.`);return}let o=e.map(r=>({label:r.name,id:r.id})),s=await $.window.showQuickPick(o,{placeHolder:`Select new status for ${t}`,ignoreFocusOut:!0});s&&(await $.window.withProgress({location:$.ProgressLocation.Notification,title:`Updating status to ${s.label}...`,cancellable:!1},()=>Et(t,s.id)),$.window.showInformationMessage(`Ricwiz: Status for ${t} updated to ${s.label}.`))}catch(t){t.message.includes("securely configured")?$.window.showErrorMessage(t.message,"Set Token Now").then(e=>{e==="Set Token Now"&&$.commands.executeCommand("ricwiz.setJiraToken")}):$.window.showErrorMessage(`Ricwiz Jira Error: ${t.message}`)}}async function jt(){try{let t=await Ge();if(!t){$.window.showErrorMessage("Ricwiz: You are not on a valid ticket branch.");return}let e=await $.window.showInputBox({prompt:`Add comment to ${t}`,placeHolder:"Type your comment here...",ignoreFocusOut:!0});e&&(await $.window.withProgress({location:$.ProgressLocation.Notification,title:`Adding comment to ${t}...`,cancellable:!1},()=>Mt(t,e)),$.window.showInformationMessage(`Ricwiz: Comment added to ${t}.`))}catch(t){t.message.includes("securely configured")?$.window.showErrorMessage(t.message,"Set Token Now").then(e=>{e==="Set Token Now"&&$.commands.executeCommand("ricwiz.setJiraToken")}):$.window.showErrorMessage(`Ricwiz Jira Error: ${t.message}`)}}async function Jt(){try{let t=await Ge();if(!t){$.window.showErrorMessage("Ricwiz: You are not on a valid ticket branch.");return}let e=await $.window.showInputBox({prompt:`Add a label to ${t}`,placeHolder:"e.g. Needs-Review, Bug, High-Priority",ignoreFocusOut:!0});e&&e.trim()&&(await $.window.withProgress({location:$.ProgressLocation.Notification,title:`Adding label to ${t}...`,cancellable:!1},()=>Tt(t,e.trim())),$.window.showInformationMessage(`Ricwiz: Label '${e.trim()}' added to ${t}.`))}catch(t){t.message.includes("securely configured")?$.window.showErrorMessage(t.message,"Set Token Now").then(e=>{e==="Set Token Now"&&$.commands.executeCommand("ricwiz.setJiraToken")}):$.window.showErrorMessage(`Ricwiz Jira Error: ${t.message}`)}}async function Ut(){let t=await $.window.showInputBox({prompt:"Enter your Jira API Token (or Personal Access Token). It will be securely stored in your OS keychain.",password:!0,ignoreFocusOut:!0});if(t)try{await et(t.trim()),$.window.showInformationMessage("Ricwiz: Jira API Token securely stored!")}catch(e){$.window.showErrorMessage(`Ricwiz: Failed to store token: ${e.message}`)}}var $,Wt=k(()=>{"use strict";$=b(require("vscode"));R();se();Re();Fe()});async function qt(){let t=v();if(!t){ne.window.showErrorMessage("Ricwiz: Open a folder or workspace that is a Git repository.");return}let e=await A.initialize(t);if(!e)return;let o=await N(t,{prefix:e.ticketPrefix,prompt:"Enter the full ticket ID to sync all branches for (e.g., SCPSCA-1234) or just the number"});if(!o)return;let{ticketId:s,currentBranch:r}=o;await ne.window.withProgress({location:ne.ProgressLocation.Notification,title:`Ricwiz: Syncing all branches for ${s}...`,cancellable:!1},async m=>{try{m.report({message:"Fetching from remote..."});try{await p("git fetch --all",{cwd:t})}catch{}let{stdout:a}=await p(`git branch --list "*${s}*"`,{cwd:t}),g=a.split(`
`).map(i=>i.replace("*","").trim()).filter(i=>i.length>0);if(g.length===0){ne.window.showWarningMessage(`Ricwiz: No local branches found for ${s}.`);return}let u=0,l=0;for(let i of g)if(m.report({message:`Syncing ${i}...`}),i===r)try{await p(`git pull ${e.originRemote} ${i}`,{cwd:t}),u++}catch(n){let c=!1;try{let{stdout:f}=await p("git ls-files -u",{cwd:t});f.trim().length>0&&(c=!0)}catch{}let d=((n.stdout||"")+(n.stderr||"")+(n.message||"")).toLowerCase();(c||d.includes("conflict")||d.includes("conflit"))&&await he(t,`${e.originRemote}/${i}`,i,m)?u++:l++}else try{await p(`git fetch ${e.originRemote} ${i}:${i}`,{cwd:t}),u++}catch{try{await p(`git checkout ${i}`,{cwd:t});try{await p(`git pull ${e.originRemote} ${i}`,{cwd:t}),u++}catch(c){let d=!1;try{let{stdout:h}=await p("git ls-files -u",{cwd:t});h.trim().length>0&&(d=!0)}catch{}let f=((c.stdout||"")+(c.stderr||"")+(c.message||"")).toLowerCase();(d||f.includes("conflict")||f.includes("conflit"))&&await he(t,`${e.originRemote}/${i}`,i,m)?u++:l++}await p(`git checkout ${r}`,{cwd:t})}catch{try{await p(`git checkout ${r}`,{cwd:t})}catch{}l++}}l>0?ne.window.showWarningMessage(`Ricwiz: Synced ${u}/${g.length} branches. ${l} branch(es) could not be synced (possible conflicts or diverged history).`):ne.window.showInformationMessage(`Ricwiz: \u{1F504} All ${u} branches for ${s} are up to date!`)}catch(a){ne.window.showErrorMessage(`Ricwiz: Sync failed: ${a.message}`)}})}var ne,Ht=k(()=>{"use strict";ne=b(require("vscode"));R();Ue();se()});async function Vt(){let t=v();if(!t){ae.window.showErrorMessage("Ricwiz: Open a folder or workspace that is a Git repository.");return}try{await p("git status",{cwd:t})}catch{ae.window.showErrorMessage("Ricwiz: The opened folder does not appear to be a valid Git repository.");return}let e=await A.initialize(t);if(!e)return;let o=e.environments,s=await N(t,{prefix:e.ticketPrefix});if(!s)return;let{ticketId:r,currentBranch:m}=s;await ae.window.withProgress({location:ae.ProgressLocation.Notification,title:"Ricwiz: Updating environment branches from their bases",cancellable:!0},async(a,g)=>{let u=0,l=m,i=!1;g.onCancellationRequested(()=>{i=!0}),a.report({message:"Syncing remote information...",increment:10});try{await p("git fetch --all",{cwd:t})}catch{}let n=80/(o.length||1);for(let c of o){if(i)break;let d=`${r}-to-${c.name}`,f=c.sourceBranch;if(await le(t,d))try{a.report({message:`Processing ${d}...`,increment:n/2}),await p(`git checkout ${d}`,{cwd:t});try{a.report({message:`Merging ${f} into ${d}...`,increment:n/2});let h=e.getFetchRemote(f),w=e.getFetchBranch(f),z=e.buildUpstreamPath(f);await p(`git fetch ${h} ${w}`,{cwd:t}),await p(`git merge ${z}`,{cwd:t})}catch(h){let w=!1;try{let{stdout:P}=await p("git ls-files -u",{cwd:t});P.trim().length>0&&(w=!0)}catch{}let z=((h.stdout||"")+(h.stderr||"")+(h.message||"")).toLowerCase();if(w||z.includes("conflict")||z.includes("conflit")){let P=e.buildUpstreamPath(f);if(!await he(t,P,d,a))throw i=!0,new Error("Update aborted by user.")}else throw h}if(i)break;u++}catch(h){h.message.includes("aborted")?ae.window.showInformationMessage("Ricwiz: Update cancelled."):ae.window.showErrorMessage(`Ricwiz: Failed to update branch ${d}. Detail: ${h.message}`);return}}if(!i){a.report({message:"Finishing up...",increment:10});try{let c=await D(t);l&&l!==c&&await p(`git checkout ${l}`,{cwd:t})}catch{}ae.window.showInformationMessage(`Ricwiz: Successfully updated ${u} environment branches from their bases!`)}})}var ae,Gt=k(()=>{"use strict";ae=b(require("vscode"));R();Ue();se()});async function Qt(){let t=v();if(!t){I.window.showErrorMessage("Ricwiz: Open a folder or workspace that is a Git repository.");return}let e=await D(t),o=I.workspace.getConfiguration("ricwiz");await I.window.withProgress({location:I.ProgressLocation.Notification,title:"Ricwiz: Scanning for unused local branches...",cancellable:!1},async()=>{try{await p("git fetch --prune",{cwd:t})}catch{}let s=[];try{let{stdout:n}=await p('git branch --format="%(refname:short)"',{cwd:t});s=n.split(`
`).map(c=>c.trim()).filter(c=>c.length>0)}catch{}if(s.length===0){I.window.showInformationMessage("Ricwiz: No local branches found.");return}let r=[];try{let{stdout:n}=await p('git branch -r --format="%(refname:short)"',{cwd:t});r=n.split(`
`).map(c=>c.trim().replace(/^origin\//,"").replace(/^[^\/]+\//,"")).filter(c=>c.length>0&&!c.includes("HEAD"))}catch{}let m=[];try{let{stdout:n}=await p('git for-each-ref --format="%(refname:short)|||%(upstream:track)" refs/heads/',{cwd:t});m=n.split(`
`).filter(c=>c.includes("[gone]")).map(c=>c.split("|||")[0].trim())}catch{}let a=s.filter(n=>!r.includes(n));if(a.length===0){I.window.showInformationMessage("Ricwiz: Your local repository is totally clean! All local branches exist on the remote.");return}let g=a.map(n=>{let c=m.includes(n),d=n===e,f="Not found on remote";return c&&(f="Deleted on remote [gone]"),d&&(f+=" (Current branch - will checkout main first)"),{label:n,description:f,picked:c&&!d}}),u=await I.window.showQuickPick(g,{canPickMany:!0,placeHolder:"Select local branches to delete",title:"Ricwiz: Delete Unused Branches"});if(!u||u.length===0){I.window.showInformationMessage("Ricwiz: No branches selected for deletion.");return}if(await I.window.showWarningMessage(`Ricwiz: Delete ${u.length} local branch(es)?
This cannot be undone!`,{modal:!0},"Yes, delete them")!=="Yes, delete them"){I.window.showInformationMessage("Ricwiz: Deletion cancelled.");return}let i=0;for(let n of u){let c=n.label;if(c===e){let d=o.get("ticketSourceBranch","main");try{await p(`git checkout ${d}`,{cwd:t}),e=d}catch{I.window.showWarningMessage(`Ricwiz: Could not switch away from ${c}. Skipping.`);continue}}try{await p(`git branch -D ${c}`,{cwd:t}),i++}catch{I.window.showWarningMessage(`Ricwiz: Could not delete local branch ${c}.`)}}I.window.showInformationMessage(`Ricwiz: \u{1F5D1}\uFE0F Cleaned up ${i} unused local branch(es).`)})}var I,Yt=k(()=>{"use strict";I=b(require("vscode"));R()});async function ke(t){let e=v();e&&await Z.window.withProgress({location:Z.ProgressLocation.Notification,title:`Ricwiz: Switching to ${t}...`,cancellable:!1},async()=>{try{let o=await D(e),s=!1;try{let{stdout:m}=await p("git status --porcelain",{cwd:e});s=m.trim().length>0}catch{}if(s&&o)try{await p(`git stash push --include-untracked -m "ricwiz-auto:${o}"`,{cwd:e}),Z.window.showInformationMessage(`Ricwiz: \u{1F4E6} Stashed changes from ${o}`)}catch{Z.window.showWarningMessage("Ricwiz: Could not stash changes. Checkout may fail if there are conflicts.")}let r=t;t.includes("/")&&(r=t.split("/").slice(1).join("/"));try{await p(`git checkout ${r}`,{cwd:e})}catch{let a="";if(t.includes("/"))a=t.split("/")[0];else{let{stdout:g}=await p("git branch -r",{cwd:e}),u=g.split(`
`).map(i=>i.trim()).filter(i=>i),l=[];for(let i of u){let n=i.split(" ")[0];n.endsWith(`/${r}`)&&l.push(n.substring(0,n.lastIndexOf("/")))}if(l.length===0){Z.window.showErrorMessage(`Ricwiz: A branch "${r}" n\xE3o existe localmente nem em nenhuma remote!`);return}else if(l.length===1)a=l[0];else{let i=await A.initialize(e);l.includes("origin")?a="origin":i&&l.includes(i.upstreamRemote)?a=i.upstreamRemote:a=l[0]}}try{await p(`git fetch ${a} ${r}`,{cwd:e}),await p(`git checkout -b ${r} --track ${a}/${r}`,{cwd:e})}catch{Z.window.showErrorMessage(`Ricwiz: Encontrou na remote ${a} mas falhou a fazer checkout.`);return}}try{let{stdout:m}=await p("git stash list",{cwd:e}),a=m.split(`
`);for(let g=0;g<a.length;g++)if(a[g].includes(`ricwiz-auto:${r}`)){let u=a[g].match(/stash@\{(\d+)\}/);u&&(await p(`git stash pop stash@{${u[1]}}`,{cwd:e}),Z.window.showInformationMessage(`Ricwiz: \u{1F4E6} Restored stashed changes on ${r}`));break}}catch{Z.window.showWarningMessage(`Ricwiz: Could not restore stashed changes on ${r}. You may need to resolve conflicts manually (check git stash list).`)}}catch{Z.window.showErrorMessage(`Ricwiz: Could not checkout branch ${t}.`)}})}var Z,We=k(()=>{"use strict";Z=b(require("vscode"));R();se()});async function _t(){let t=v();if(t)try{let{stdout:e}=await p("git branch --show-current",{cwd:t}),o=e.trim();o&&(await Pe.env.clipboard.writeText(o),Pe.window.showInformationMessage(`Ricwiz: \u{1F4CB} Copied "${o}" to clipboard`))}catch{Pe.window.showErrorMessage("Ricwiz: Could not get the current branch name.")}}var Pe,Zt=k(()=>{"use strict";Pe=b(require("vscode"));R()});async function Kt(){let t=v();if(!t){q.window.showErrorMessage("Ricwiz: Open a folder or workspace that is a Git repository.");return}let e=q.workspace.getConfiguration("ricwiz"),o=e.get("ticketSourceBranch","main"),r=e.get("packageXmlCommand",'sf sgd source delta --to "HEAD" --from "origin/{baseBranch}" --output-dir "."').replace("{baseBranch}",o);await q.window.showWarningMessage("Are you sure you want to generate the package.xml? This may overwrite existing local manifest files.",{modal:!0},"Yes, Generate")==="Yes, Generate"&&await q.window.withProgress({location:q.ProgressLocation.Notification,title:"Ricwiz: Generating package.xml using Salesforce CLI...",cancellable:!1},async()=>{try{await p(r,{cwd:t,maxBuffer:10*1024*1024}),q.window.showInformationMessage("Ricwiz: Successfully generated package.xml!");let a=qe.join(t,"package","package.xml"),g=qe.join(t,"package.xml"),u=qe.join(t,"manifest","package.xml");for(let l of[a,g,u])if(Xt.existsSync(l)){let i=await q.workspace.openTextDocument(l);await q.window.showTextDocument(i);break}}catch(a){q.window.showErrorMessage(`Ricwiz: Error running sf command - ${a.message}`)}})}var q,qe,Xt,eo=k(()=>{"use strict";q=b(require("vscode")),qe=b(require("path")),Xt=b(require("fs"));R()});async function to(){let t=v();if(!t){H.window.showErrorMessage("Ricwiz: Open a folder or workspace that is a Git repository.");return}let o=H.workspace.getConfiguration("ricwiz").get("deployCommand","sf project deploy start --manifest package/package.xml --post-destructive-changes destructiveChanges/destructiveChanges.xml -c -l NoTestRun -g");await H.window.showWarningMessage("Are you sure you want to deploy to Salesforce? This action modifies your org and cannot be easily undone.",{modal:!0},"Yes, Deploy")==="Yes, Deploy"&&await H.window.withProgress({location:H.ProgressLocation.Notification,title:"Ricwiz: Deploying package...",cancellable:!1},async()=>{try{let{stdout:r,stderr:m}=await p(o,{cwd:t,maxBuffer:52428800}),a=H.window.createOutputChannel("Ricwiz Deploy");a.appendLine(`Executing: ${o}`),a.appendLine(r),m&&(a.appendLine("--- STDERR ---"),a.appendLine(m)),a.show(),H.window.showInformationMessage("Ricwiz: Successfully ran deploy command!")}catch(r){let m=H.window.createOutputChannel("Ricwiz Deploy");m.appendLine(`Error executing: ${o}`),r.stdout&&m.appendLine(r.stdout),r.stderr&&m.appendLine(r.stderr),m.appendLine(r.message),m.show(),H.window.showErrorMessage("Ricwiz: Error running deploy command. See output channel for details.")}})}var H,oo=k(()=>{"use strict";H=b(require("vscode"));R()});async function io(){let t=v();if(!t){V.window.showErrorMessage("Ricwiz: Open a folder or workspace that is a Git repository.");return}let o=V.workspace.getConfiguration("ricwiz").get("importDataCommand","sfdx force:data:tree:import --plan data/plan.json");await V.window.showWarningMessage("Are you sure you want to import data into Salesforce? This action modifies records in your org.",{modal:!0},"Yes, Import")==="Yes, Import"&&await V.window.withProgress({location:V.ProgressLocation.Notification,title:"Ricwiz: Importing data...",cancellable:!1},async()=>{try{let{stdout:r,stderr:m}=await p(o,{cwd:t,maxBuffer:52428800}),a=V.window.createOutputChannel("Ricwiz Import Data");a.appendLine(`Executing: ${o}`),a.appendLine(r),m&&(a.appendLine("--- STDERR ---"),a.appendLine(m)),a.show(),V.window.showInformationMessage("Ricwiz: Successfully ran import data command!")}catch(r){let m=V.window.createOutputChannel("Ricwiz Import Data");m.appendLine(`Error executing: ${o}`),r.stdout&&m.appendLine(r.stdout),r.stderr&&m.appendLine(r.stderr),m.appendLine(r.message),m.show(),V.window.showErrorMessage("Ricwiz: Error running import data command. See output channel for details.")}})}var V,so=k(()=>{"use strict";V=b(require("vscode"));R()});async function ro(){let t=v();if(!t){G.window.showErrorMessage("Ricwiz: Open a folder or workspace that is a Git repository.");return}let e="";try{e=await D(t)}catch{}let s=G.workspace.getConfiguration("ricwiz").get("ticketSourceBranch","main"),r=await G.window.showInputBox({prompt:`Enter the branch name to list modified files (compared to ${s})`,value:e,placeHolder:"SFPSCA-1234"});r&&await G.window.withProgress({location:G.ProgressLocation.Notification,title:`Ricwiz: Finding files for ${r}...`,cancellable:!1},async()=>{try{let m=r.replace(/-to-[a-zA-Z0-9]+$/i,""),a=[];try{let f="";try{let{stdout:h}=await p(`git merge-base origin/${s} ${r}`,{cwd:t});f=h.trim()}catch{let{stdout:h}=await p(`git merge-base ${s} ${r}`,{cwd:t});f=h.trim()}if(f){let{stdout:h}=await p(`git diff --name-only ${f} ${r}`,{cwd:t,maxBuffer:10485760});a=h.split(`
`).map(w=>w.trim()).filter(w=>w.length>0)}}catch{}let g=[];try{let{stdout:f}=await p(`git --no-pager log --grep="\\b${m}\\b" -i -E --name-only -m --first-parent --format=""`,{cwd:t,maxBuffer:10485760});g=f.split(`
`).map(h=>h.trim()).filter(h=>h.length>0)}catch{}let u=[...a,...g];if(u.length===0){G.window.showInformationMessage(`Ricwiz: No modified files found for ${r}.`);return}let l=Array.from(new Set(u)).sort(),i={};for(let f of l){let h=f.match(/default\/([^/]+)/),w=h&&h[1]?h[1].toUpperCase():"OUTROS";i[w]||(i[w]=[]),i[w].push(f)}let n=`Files modified in branch ${r}:
`,c=Object.keys(i).sort();for(let f of c)n+=`
=== ${f} ===
`,n+=i[f].join(`
`)+`
`;let d=await G.workspace.openTextDocument({content:n,language:"plaintext"});await G.window.showTextDocument(d)}catch(m){G.window.showErrorMessage(`Ricwiz: Error running git log - ${m.message}`)}})}var G,no=k(()=>{"use strict";G=b(require("vscode"));R()});async function ao(){let t=v();if(!t){X.window.showErrorMessage("Ricwiz: Open a folder or workspace that is a Git repository.");return}let o=X.workspace.getConfiguration("ricwiz").get("resetTrackingCommand","sf org disable tracking && sf project reset tracking --no-prompt");await X.window.withProgress({location:X.ProgressLocation.Notification,title:"Ricwiz: Resetting tracking...",cancellable:!1},async()=>{try{let{stdout:s,stderr:r}=await p(o,{cwd:t,maxBuffer:52428800}),m=X.window.createOutputChannel("Ricwiz Reset Tracking");m.appendLine(`Executing: ${o}`),m.appendLine(s),r&&(m.appendLine("--- STDERR ---"),m.appendLine(r)),m.show(),X.window.showInformationMessage("Ricwiz: Successfully reset tracking!")}catch(s){let r=X.window.createOutputChannel("Ricwiz Reset Tracking");r.appendLine(`Error executing: ${o}`),s.stdout&&r.appendLine(s.stdout),s.stderr&&r.appendLine(s.stderr),r.appendLine(s.message),r.show(),X.window.showErrorMessage("Ricwiz: Error resetting tracking. See output channel for details.")}})}var X,co=k(()=>{"use strict";X=b(require("vscode"));R()});async function lo(){let t=v();if(!t){Q.window.showErrorMessage("Ricwiz: Open a workspace first.");return}let e=["ApexClass","ApexTrigger","CustomObject","CustomField","LightningComponentBundle","AuraDefinitionBundle","Flow","CustomLabel","CustomMetadata","StaticResource","Profile","PermissionSet","PermissionSetGroup","Layout","ValidationRule","RecordType","ListView","Report","EmailTemplate","Other (Type manually)..."],o=await Q.window.showQuickPick(e,{placeHolder:"Select Metadata Type to extract (e.g., ApexClass)",ignoreFocusOut:!0});if(!o||o==="Other (Type manually)..."&&(o=await Q.window.showInputBox({prompt:"Enter Metadata Type (e.g., CustomApplication, Queue)",ignoreFocusOut:!0}),!o))return;let s={ApexClass:"**/*.cls",ApexTrigger:"**/*.trigger",CustomObject:"**/*.{object,object-meta.xml}",CustomField:"**/*.field-meta.xml",LightningComponentBundle:"**/lwc/*/*.js",AuraDefinitionBundle:"**/aura/*/*.cmp",Flow:"**/*.flow-meta.xml",CustomLabel:"**/*.labels-meta.xml",CustomMetadata:"**/*.md-meta.xml",StaticResource:"**/*.resource-meta.xml",Profile:"**/*.profile-meta.xml",PermissionSet:"**/*.permissionset-meta.xml",PermissionSetGroup:"**/*.permissionsetgroup-meta.xml",Layout:"**/*.layout-meta.xml",ValidationRule:"**/*.validationRule-meta.xml",RecordType:"**/*.recordType-meta.xml",ListView:"**/*.listView-meta.xml"},r=[],m=s[o];if(m)try{r=(await Q.workspace.findFiles(m,"**/node_modules/**")).map(u=>{let l=u.fsPath.split(/[\\/]/).pop()||"";if(o==="LightningComponentBundle"||o==="AuraDefinitionBundle"){let i=u.fsPath.split(/[\\/]/);return i[i.length-2]||l.split(".")[0]}return l.split(".")[0]}),r=[...new Set(r)].sort()}catch{}let a=await new Promise(g=>{let u=Q.window.createQuickPick();u.title=`Extract ${o}`,u.placeholder="Type name (e.g. MyComponent) or * for all",u.ignoreFocusOut=!0,u.matchOnDescription=!0;let l=()=>{let i=u.value.trim(),n=[];i?n.push({label:`$(cloud-download) Extract "${i}"`,description:"Extract exact name from Salesforce",alwaysShow:!0}):n.push({label:'$(cloud-download) Extract "*" (All)',description:`Extract all ${o}s`,alwaysShow:!0}),r.forEach(c=>{(!i||c.toLowerCase().includes(i.toLowerCase()))&&n.push({label:c,description:"Local workspace component"})}),u.items=n};u.onDidChangeValue(()=>l()),u.onDidAccept(()=>{let i=u.selectedItems[0];if(i){let n=i.label;n.startsWith('$(cloud-download) Extract "')?n=n.replace('$(cloud-download) Extract "',"").replace('" (All)',"").replace('"',""):n==='$(cloud-download) Extract "*" (All)'&&(n="*"),u.hide(),g(n)}}),u.onDidHide(()=>{u.dispose(),g(void 0)}),l(),u.show()});a&&await Q.window.withProgress({location:Q.ProgressLocation.Notification,title:`Ricwiz: Extracting ${o}:${a} from Salesforce...`,cancellable:!0},async(g,u)=>{try{T.show(!0);let l=`${o}:${a}`,{stdout:i,stderr:n}=await p(`sf project retrieve start -m "${l}"`,{cwd:t});i&&T.appendLine(i),n&&T.appendLine(n),Q.window.showInformationMessage(`Ricwiz: Successfully extracted ${l}.`)}catch(l){T.appendLine(`ERROR: ${l.message}`),l.stdout&&T.appendLine(l.stdout),l.stderr&&T.appendLine(l.stderr),Q.window.showErrorMessage("Ricwiz: Extraction failed. See Output channel for details.")}})}var Q,mo=k(()=>{"use strict";Q=b(require("vscode"));R()});async function po(){let t=O.window.activeTextEditor;if(!t){O.window.showErrorMessage("Ricwiz: Please open the file you want to deploy in the editor first.");return}let e=t.document.uri.fsPath,o=v();if(!o)return;let s="";if(await O.window.withProgress({location:O.ProgressLocation.Notification,title:"Ricwiz: Fetching available Salesforce orgs...",cancellable:!1},async()=>{try{let{stdout:u}=await p("sf org list --json",{cwd:o});s=u}catch(u){s=u.stdout||""}}),!s){O.window.showErrorMessage("Ricwiz: Failed to fetch orgs. Is Salesforce CLI installed?");return}let r=[];try{let u=JSON.parse(s),l=u.result?.nonScratchOrgs||[],i=u.result?.scratchOrgs||[];r=[...l,...i]}catch{O.window.showErrorMessage("Ricwiz: Failed to parse org list.");return}if(r.length===0){O.window.showInformationMessage("Ricwiz: No authenticated orgs found.");return}let m=r.map(u=>({label:u.alias||u.username,description:u.alias?u.username:"",picked:u.isDefaultUsername})),a=await O.window.showQuickPick(m,{placeHolder:"Select the org(s) to deploy this file to",canPickMany:!0,ignoreFocusOut:!0});if(!a||a.length===0)return;let g=uo.basename(e);await O.window.withProgress({location:O.ProgressLocation.Notification,title:`Ricwiz: Deploying ${g} to ${a.length} org(s)...`,cancellable:!1},async()=>{T.show(!0),T.appendLine(`--- Starting Parallel Deploy of ${g} ---`);let u=a.map(async c=>{let d=c.label;T.appendLine(`[${d}] Deploying...`);try{let{stdout:f,stderr:h}=await p(`sf project deploy start -d "${e}" -o "${d}"`,{cwd:o});return T.appendLine(`[${d}] \u2705 Success`),f&&T.appendLine(f),{org:d,success:!0}}catch(f){return T.appendLine(`[${d}] \u274C Failed`),f.stdout&&T.appendLine(f.stdout),f.stderr&&T.appendLine(f.stderr),{org:d,success:!1}}}),l=await Promise.all(u),i=l.filter(c=>c.success).length,n=l.filter(c=>!c.success).length;n===0?O.window.showInformationMessage(`Ricwiz: Successfully deployed to all ${i} orgs!`):O.window.showErrorMessage(`Ricwiz: Deploy finished with errors (${i} success, ${n} failed). Check Output channel.`)})}var O,uo,go=k(()=>{"use strict";O=b(require("vscode")),uo=b(require("path"));R()});async function fo(){let t=v();if(!t){E.window.showErrorMessage("Ricwiz: Open a folder or workspace that is a Git repository.");return}let e=E.workspace.getConfiguration("ricwiz"),o=e.get("auditUsername",""),s=e.get("auditHours",8),r=await E.window.showInputBox({prompt:"Enter your Salesforce Username to query in SetupAuditTrail",value:o,placeHolder:"admin@tuaorg.com"});if(!r)return;let m=await E.window.showInputBox({prompt:"How many hours back do you want to search?",value:s.toString(),placeHolder:"8"});if(!m)return;let a=parseFloat(m);if(isNaN(a)||a<=0){E.window.showErrorMessage("Ricwiz: Invalid hours specified.");return}let g=new Date(Date.now()-a*60*60*1e3).toISOString(),l=`sf data query -q "${`SELECT Action, Display, Section FROM SetupAuditTrail WHERE CreatedBy.Username = '${r}' AND CreatedDate >= ${g}`}" --json`;await E.window.withProgress({location:E.ProgressLocation.Notification,title:"Ricwiz: Interrogating Setup Audit Trail...",cancellable:!1},async()=>{try{let{stdout:i}=await p(l,{cwd:t,maxBuffer:52428800}),n=JSON.parse(i);if(!n.result||n.result.records.length===0){E.window.showInformationMessage(`Ricwiz: No changes found for ${r} in the last ${a} hours.`);return}let c=n.result.records,d=[],f=new Set;for(let S of c){let F=qo(S.Action,S.Display,S.Section);if(F){let J=`${F.isDelete?"DEL":"ADD"}-${F.metadataFormat}`;if(!f.has(J)){f.add(J);let U=F.isDelete?"$(trash)":"$(plus)";d.push({label:`${U} ${F.metadataFormat}`,description:`${S.Action} -> ${S.Display}`,metadataFormat:F.metadataFormat,isDelete:F.isDelete})}}}if(d.length===0){E.window.showInformationMessage(`Ricwiz: No extractable metadata changes found for ${r} in the last ${a} hours (ignored passwords/logins).`);return}let h=await E.window.showQuickPick(d,{canPickMany:!0,placeHolder:"Select the changes you want to extract to GitLab",ignoreFocusOut:!0});if(!h||h.length===0){E.window.showInformationMessage("Ricwiz: No changes selected.");return}let w=h.filter(S=>S.isDelete),z=h.filter(S=>!S.isDelete),P=E.window.createOutputChannel("Ricwiz Admin Bridge");if(P.show(),w.length>0){let{stdout:S}=await p("git ls-files",{cwd:t}),F=S.split(`
`).map(U=>U.trim()),J=0;for(let U of w){let Me=U.metadataFormat.split(":"),Te=Me[0],Ce=Me[1],De=Ce;Te==="CustomField"&&(De=Ce.split(".")[1]);let M=F.filter(W=>{let de=Ve.basename(W);return de.startsWith(De+".")&&de.includes(Te==="CustomField"?".field":"")});for(let W of M){let de=Ve.join(t,W);He.existsSync(de)&&(He.unlinkSync(de),P.appendLine(`Deleted local file: ${W}`),J++)}}E.window.showInformationMessage(`Ricwiz: Deleted ${J} local files from Git workspace.`)}if(z.length===0)return;let ce=z.map(S=>S.metadataFormat).filter(S=>S!=="").join(", "),ue=await E.window.showInputBox({prompt:"Review and adjust the metadata components to retrieve",value:ce,ignoreFocusOut:!0});if(!ue)return;let pe=`sf project retrieve start -m "${ue}"`;P.appendLine(`Executing: ${pe}`),E.window.showInformationMessage(`Ricwiz: Extracting ${z.length} components...`);let K=await p(pe,{cwd:t});P.appendLine(K.stdout),K.stderr&&(P.appendLine("--- STDERR ---"),P.appendLine(K.stderr)),E.window.showInformationMessage("Ricwiz: Changes extracted successfully! Ready for Git Commit.")}catch(i){E.window.showErrorMessage(`Ricwiz: Error capturing changes - ${i.message}`)}})}function qo(t,e,o){if(!t||!e||!o)return null;let s=t.toLowerCase(),r=o.toLowerCase();if(["security controls","network access","session settings","data export","login history","password policies","identity verification","delegated administration"].includes(r)||s.includes("login")||s.includes("password")||s.includes("oauth")||s.includes("session"))return null;let a=s.includes("delete"),g=null;if(s==="permissionsetgroupcomponentadd"||s==="permissionsetgroupcomponentdelete")return null;let u=(l,i=!1)=>{let n=l.replace(/\(.*\)/g,"").trim();n.includes(":")&&!s.includes("calculation")&&(n=n.split(":")[0]);let c=["disabled","deleted","removed","created","changed","updated","from","to","on","assigned","assign","assignment","permission","set","group","apex","class","trigger","custom","field","object","layout","validation","rule","flow","profile"],d=n.split(/\s+/);if(i){for(;d.length>0&&c.includes(d[d.length-1].toLowerCase());)d.pop();for(;d.length>0&&c.includes(d[0].toLowerCase());)d.shift();return d.join(" ").trim().replace(/[^a-zA-Z0-9_ ]/g,"")}else return d.filter(w=>!c.includes(w.toLowerCase())).join("_").replace(/[^a-zA-Z0-9_]/g,"")||n.replace(/\s+/g,"")};if(s.includes("profile"))g=`Profile:${u(e,!0)}`;else if(s.includes("permissionsetgroupcalculation")){let l=e.split(":");g=`PermissionSetGroup:${l.length>1?l[l.length-1].trim():u(e,!1)}`}else if(s.includes("permission set group")||s.includes("permissionsetgroup"))g=`PermissionSetGroup:${u(e,!1)}`;else if(s.includes("permission set")||s.includes("permissionset"))g=`PermissionSet:${u(e,!1)}`;else if(s.includes("apexclass"))g=`ApexClass:${u(e,!1)}`;else if(s.includes("apextrigger")||s.includes("apex trigger"))g=`ApexTrigger:${u(e,!1)}`;else if(s.includes("customfield")){let l=e.match(/([A-Za-z0-9_]+__c)/),i=e.match(/(?:on|na|for)\s+([A-Za-z0-9_]+)/i);l&&i?g=`CustomField:${i[1]}.${l[1]}`:g=`CustomField:${u(e,!1)}`}else if(s.includes("layout"))g=`Layout:${u(e,!0)}`;else if(s.includes("validation"))g=`ValidationRule:${u(e,!1)}`;else if(s.includes("flow"))g=`Flow:${u(e,!1)}`;else if(s.includes("customobject")){let l=e.match(/([A-Za-z0-9_]+__c)/);g=l?`CustomObject:${l[1]}`:`CustomObject:${u(e,!1)}`}else if(!s.includes("created")&&!s.includes("changed")&&!s.includes("deleted"))return null;return g?{metadataFormat:g,isDelete:a}:null}var E,He,Ve,ho=k(()=>{"use strict";E=b(require("vscode")),He=b(require("fs")),Ve=b(require("path"));R()});async function wo(){let t=v();if(t)try{let{stdout:e}=await p('git for-each-ref --sort=-committerdate --format="%(refname:short)|||%(committerdate:relative)|||%(subject)" refs/heads/',{cwd:t}),o=e.split(`
`).filter(r=>r.trim()).map(r=>{let m=r.split("|||");return{label:`$(git-branch) ${m[0]}`,description:m[1],detail:m[2],branchName:m[0]}}),s=await Qe.window.showQuickPick(o,{placeHolder:"Select a branch from history to checkout",matchOnDescription:!0,matchOnDetail:!0});s&&await ke(s.branchName)}catch{Qe.window.showErrorMessage("Ricwiz: Failed to get branch history")}}var Qe,vo=k(()=>{"use strict";Qe=b(require("vscode"));R();We()});async function bo(){let t=v();if(!t)return;let e=await Se.window.showInputBox({prompt:"Enter ticket number or name (e.g., 48934)",placeHolder:"48934"});if(e)try{let{stdout:o}=await p(`git branch --list "*${e}*"`,{cwd:t}),s=o.split(`
`).map(a=>a.replace("*","").trim()).filter(a=>a);if(s.length===0){Se.window.showInformationMessage(`Ricwiz: No branches found matching "${e}"`);return}let r=s.map(a=>({label:`$(git-branch) ${a}`,branchName:a})),m=await Se.window.showQuickPick(r,{placeHolder:`Select a branch for ${e}`});m&&await ke(m.branchName)}catch{Se.window.showErrorMessage("Ricwiz: Failed to search branches")}}var Se,yo=k(()=>{"use strict";Se=b(require("vscode"));R();We()});async function ko(){let t=ve.window.activeTextEditor;if(!t)return ve.window.showErrorMessage("Ricwiz: Please open a file in the editor to check blame."),null;let e=t.document.fileName,o=xo.basename(e),s=v();if(!s)return ve.window.showErrorMessage("Ricwiz: Workspace is not a git repository."),null;let r=[];try{let{stdout:i}=await p(`git log -5 --pretty=format:"%an|%ar|%s|%h" -- "${e}"`,{cwd:s}),n=i.trim().split(`
`);for(let c of n){let d=c.split("|");d.length>=4&&r.push({author:d[0],time:d[1],message:d.slice(2,-1).join("|"),hash:d[d.length-1]})}}catch(i){console.error("Git blame error:",i)}let m="Unknown",a="Unknown",g="Unknown",u=[],l=Ho(e);if(l)try{await ve.window.withProgress({location:ve.ProgressLocation.Notification,title:`Ricwiz: Analyzing ${l.name} in Salesforce...`,cancellable:!1},async()=>{let i="";if(l.type==="CustomField"){let n=l.name.split(".");n.length===2&&(i=`SELECT LastModifiedBy.Name, LastModifiedDate, CreatedBy.Name FROM CustomField WHERE DeveloperName = '${n[1].replace("__c","")}' AND TableEnumOrId = '${n[0]}'`)}else l.type==="LightningComponentBundle"?i=`SELECT LastModifiedBy.Name, LastModifiedDate, CreatedBy.Name FROM LightningComponentBundle WHERE DeveloperName = '${l.name}'`:i=`SELECT LastModifiedBy.Name, LastModifiedDate, CreatedBy.Name FROM ${l.type} WHERE Name = '${l.name}'`;if(i)try{let{stdout:n}=await p(`sf data query -t -q "${i}" --json`,{cwd:s,maxBuffer:52428800}),c=JSON.parse(n);if(c&&c.result&&c.result.records&&c.result.records.length>0){let d=c.result.records[0];m=d.LastModifiedBy?d.LastModifiedBy.Name:"Unknown",g=d.CreatedBy?d.CreatedBy.Name:"Unknown",a=new Date(d.LastModifiedDate).toLocaleString()}else m="Not found in Org",a="N/A",g="N/A"}catch{m="Query Error",a="N/A",g="N/A"}try{let n="SELECT Action, Display, CreatedBy.Name, CreatedDate FROM SetupAuditTrail ORDER BY CreatedDate DESC LIMIT 1500",{stdout:c}=await p(`sf data query -q "${n}" --json`,{cwd:s,maxBuffer:52428800}),d=JSON.parse(c);if(d&&d.result&&d.result.records){let f=l.name.replace("__c","");u=d.result.records.filter(w=>w.Display&&w.Display.includes(f)).map(w=>({action:w.Action,display:w.Display,author:w.CreatedBy?w.CreatedBy.Name:"Unknown",time:new Date(w.CreatedDate).toLocaleString()})).slice(0,10)}}catch(n){console.error("Audit trail query error:",n)}})}catch(i){console.error("Salesforce query error:",i)}else m="Unsupported Metadata Type",a="N/A";return{fileName:o,gitHistory:r,sfAuthor:m,sfTime:a,sfCreatedBy:g,auditHistory:u}}function Ho(t){let e=t.replace(/\\/g,"/");if(e.includes("/classes/")){let o=e.match(/\/classes\/([^/.]+)\.cls/);if(o)return{type:"ApexClass",name:o[1]}}if(e.includes("/triggers/")){let o=e.match(/\/triggers\/([^/.]+)\.trigger/);if(o)return{type:"ApexTrigger",name:o[1]}}if(e.includes("/lwc/")){let o=e.match(/\/lwc\/([^/]+)\//);if(o)return{type:"LightningComponentBundle",name:o[1]}}if(e.includes("/aura/")){let o=e.match(/\/aura\/([^/]+)\//);if(o)return{type:"AuraDefinitionBundle",name:o[1]}}if(e.includes("/objects/")&&e.includes("/fields/")){let o=e.match(/\/objects\/([^/]+)\//),s=e.match(/\/fields\/([^/.]+)\.field/);if(o&&s)return{type:"CustomField",name:`${o[1]}.${s[1]}`}}return null}var ve,xo,Co=k(()=>{"use strict";ve=b(require("vscode")),xo=b(require("path"));R()});function $o(t,e,o){t.subscriptions.push(x.commands.registerCommand("ricwiz.generateDestructiveChanges",at),x.commands.registerCommand("ricwiz.runSmartTests",dt),x.commands.registerCommand("ricwiz.refreshWebview",()=>{e&&x.commands.executeCommand("workbench.action.webview.reloadWebviewAction")}),x.commands.registerCommand("ricwiz.createBranches",pt),x.commands.registerCommand("ricwiz.prepareDeploy",wt),x.commands.registerCommand("ricwiz.createMergeRequests",yt),x.commands.registerCommand("ricwiz.createMergeRequestsVSCode",xt),x.commands.registerCommand("ricwiz.openJiraTicket",$t),x.commands.registerCommand("ricwiz.openJiraTicketVSCode",zt),x.commands.registerCommand("ricwiz.showJiraDetails",()=>{e&&At(e)}),x.commands.registerCommand("ricwiz.openJiraDashboard",s=>{e&&Ft(e,s)}),x.commands.registerCommand("ricwiz.openJiraDetailsForId",s=>{e&&Lt(e,s)}),x.commands.registerCommand("ricwiz.changeJiraStatus",Nt),x.commands.registerCommand("ricwiz.addJiraComment",jt),x.commands.registerCommand("ricwiz.addJiraLabel",Jt),x.commands.registerCommand("ricwiz.setJiraToken",Ut),x.commands.registerCommand("ricwiz.syncAll",qt),x.commands.registerCommand("ricwiz.updateBases",Vt),x.commands.registerCommand("ricwiz.deleteUnusedBranches",Qt),x.commands.registerCommand("ricwiz.checkoutBranch",ke),x.commands.registerCommand("ricwiz.copyBranchName",_t),x.commands.registerCommand("ricwiz.generatePackageXml",Kt),x.commands.registerCommand("ricwiz.deployPackage",to),x.commands.registerCommand("ricwiz.importData",io),x.commands.registerCommand("ricwiz.listTicketFiles",ro),x.commands.registerCommand("ricwiz.resetTracking",ao),x.commands.registerCommand("ricwiz.extractComponent",lo),x.commands.registerCommand("ricwiz.deployMultiOrg",po),x.commands.registerCommand("ricwiz.captureAdminChanges",fo),x.commands.registerCommand("ricwiz.openHistory",wo),x.commands.registerCommand("ricwiz.searchTicket",bo),x.commands.registerCommand("ricwiz.whoToBlame",async()=>{let s=await ko();s&&e&&(e.setBlameData(s),e.setPage("blame"))}),x.commands.registerCommand("ricwiz.manualRefresh",()=>{o&&o()}),x.commands.registerCommand("ricwiz.toggleAutoRefresh",()=>{if(e){let s=!e.isAutoRefreshEnabled();e.setAutoRefresh(s),x.workspace.getConfiguration("ricwiz").update("autoRefresh",s,x.ConfigurationTarget.Global)}}),x.commands.registerCommand("ricwiz.openSettings",()=>{x.commands.executeCommand("workbench.action.openSettings","ricwiz")}))}var x,zo=k(()=>{"use strict";x=b(require("vscode"));ct();lt();gt();vt();kt();Rt();It();Ot();Wt();Ht();Gt();Yt();We();Zt();eo();oo();so();no();co();mo();go();ho();vo();yo();Co()});function Ro(){let t=new Map;function e(s,r){let m=r,a=t.get(m);if(a)return a;let g=(async()=>{try{let{stdout:u}=await p(`git rev-parse origin/${r}`,{cwd:s});return u.trim()}catch{let{stdout:u}=await p(`git rev-parse ${r}`,{cwd:s});return u.trim()}})();return t.set(m,g),g}function o(s,r){let m=`branch:${r}`,a=t.get(m);if(a)return a;let g=(async()=>{let{stdout:u}=await p(`git rev-parse ${r}`,{cwd:s});return u.trim()})();return t.set(m,g),g}return{resolveEnvRef:e,resolveBranchRef:o}}async function Po(t,e,o,s,r){try{if(!(await p(`git --no-pager log ${e} --grep="\\\\b${o}\\\\b" -i -E -1 --format="%h"`,{cwd:t}).catch(()=>({stdout:"",stderr:""}))).stdout.trim())return!1;let[a,g]=await Promise.all([r.resolveBranchRef(t,e),r.resolveEnvRef(t,s.sourceBranch)]);if(a===g)return!1;try{return await p(`git merge-base --is-ancestor ${e} origin/${s.sourceBranch}`,{cwd:t}),!0}catch{try{return await p(`git merge-base --is-ancestor ${e} ${s.sourceBranch}`,{cwd:t}),!0}catch{return!1}}}catch{return!1}}function So(t,e){return e.find(o=>t.endsWith(`-to-${o.name}`))}async function Bo(t,e,o,s){let r=Ro();return await Promise.all(e.map(async a=>{let g=So(a,s);if(!g)return{name:a,isMerged:!1};let u=await Po(t,a,o,g,r);return{name:a,isMerged:u}}))}async function Eo(t,e,o){let s=So(e,o);if(!s)return!1;let r=e.replace(new RegExp(`-to-${s.name}$`,"i"),""),m=Ro();return Po(t,e,r,s,m)}async function Mo(t,e=10){try{let{stdout:o}=await p(`git log --oneline -${e} --format="%h|||%s|||%ar"`,{cwd:t});return o.split(`
`).filter(s=>s.trim()).map(s=>{let r=s.split("|||");return{hash:r[0]||"",message:r.length>=3?r.slice(1,-1).join("|||"):r[1]||"",timeAgo:r.length>=3?r[r.length-1]:""}})}catch{return[]}}async function To(t,e=3){try{let{stdout:o}=await p('git for-each-ref --sort=-committerdate --format="%(refname:short)" refs/heads/',{cwd:t}),s=o.split(`
`).map(m=>m.trim()).filter(m=>m),r=/^[A-Z]+-\d+$/i;return s.filter(m=>r.test(m)).slice(0,e)}catch{return[]}}async function Do(t,e,o){let{stdout:s}=await p(`git branch --list "*${e}*"`,{cwd:t});return s.split(`
`).map(r=>r.replace("*","").trim()).filter(r=>r&&r!==o)}var Ao=k(()=>{"use strict";R()});function Io(t,e,o){let s,r=ie.workspace.getConfiguration("ricwiz").get("autoRefresh",!0);e?.setAutoRefresh(r),t.subscriptions.push(ie.workspace.onDidChangeConfiguration(a=>{if(a.affectsConfiguration("ricwiz.autoRefresh")){let g=ie.workspace.getConfiguration("ricwiz").get("autoRefresh",!0);e?.setAutoRefresh(g)}}));async function m(){let a=ie.extensions.getExtension("vscode.git");if(a){let l=function(i){let n="",c;async function d(){let h=ie.workspace.workspaceFolders;if(!h)return;let w=h[0].uri.fsPath,z=await D(w);if(z&&z!==n){n=z;let P=ie.workspace.getConfiguration("ricwiz"),ce=P.get("ticketPrefix","SFPSCA-");if(!z.includes(ce)){let M=z.match(/([A-Z]+-)\d+/i);M&&(ce=M[1].toUpperCase())}let ue=[],pe=[],K=[],S=[],F=P.get("environments",[{name:"Qual",sourceBranch:"quality"},{name:"Val",sourceBranch:"validation"},{name:"Prod",sourceBranch:"main"}]);try{let M=P.get("workspaceCheckoutButtons",["main","quality","validation"]);K=Array.from(new Set(M))}catch{}let J="",U=z.match(new RegExp(`(${ce}\\d+(?:-\\d+)?)`,"i"));if(U){let M=U[1].toUpperCase();J=M;let W=P.get("commitMessageSuffix","- "),de=/^[A-Z]+-\d+(?:-\d+)?\s*(?:-\s*|:\s*|\s+)?/i;de.test(i.inputBox.value)?i.inputBox.value.toUpperCase().startsWith(M)||(i.inputBox.value=i.inputBox.value.replace(de,`${M}${W}`)):i.inputBox.value=`${M}${W}`+i.inputBox.value,o.text=`$(bookmark) ${M}`,o.tooltip=`Branch: ${z}
Click to open Jira ticket`,o.show();try{let Ye=await Do(w,M,z);ue=await Bo(w,Ye,M,F)}catch{}}else{o.hide();try{S=await To(w)}catch{}}let[Me,Te,Ce]=await Promise.all([Mo(w,10),Eo(w,z,F),J?xe(J).catch(M=>{let W=M.message;return(W.includes("ENOTFOUND")||W.includes("network"))&&(W="No Internet or Invalid URL"),{summary:`\u26A0\uFE0F Jira Error: ${W}`,description:""}}):Promise.resolve(null)]);pe=Me;let De=Ce?Ce.summary:"";e?.updateBranch(z,Te,ue,pe,K,S,De)}}function f(){e?.isAutoRefreshEnabled()&&(c&&clearTimeout(c),c=setTimeout(()=>{n="",d()},300))}s=()=>{n="",d()},d(),i.state.onDidChange(()=>f()),ie.window.onDidChangeWindowState(h=>{h.focused&&f()})};var g=l;a.isActive||await a.activate();let u=a.exports.getAPI(1);u.repositories.length>0&&u.repositories.forEach(i=>l(i)),u.onDidOpenRepository(i=>l(i))}}return m(),s}var ie,Fo=k(()=>{"use strict";ie=b(require("vscode"));R();Ao();Re()});var je={};_e(je,{activate:()=>Vo,deactivate:()=>Go,webviewProvider:()=>Be});module.exports=ge(je);function Vo(t){Ke(t),Be=new Ie(t.extensionUri),t.subscriptions.push(Ee.window.registerWebviewViewProvider("ricwiz-webview",Be));let e=Ee.window.createStatusBarItem(Ee.StatusBarAlignment.Left,100);e.command="ricwiz.openJiraTicket",t.subscriptions.push(e);let o=Io(t,Be,e);$o(t,Be,o)}function Go(){}var Ee,Be,Je=k(()=>{Ee=b(require("vscode"));Xe();Fe();zo();Fo()});Je();0&&(module.exports={activate,deactivate,webviewProvider});
