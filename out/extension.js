"use strict";var Fo=Object.create;var Ae=Object.defineProperty;var Oo=Object.getOwnPropertyDescriptor;var No=Object.getOwnPropertyNames;var jo=Object.getPrototypeOf,Jo=Object.prototype.hasOwnProperty;var k=(t,e,i)=>()=>{if(i)throw i[0];try{return t&&(e=t(t=0)),e}catch(s){throw i=[s],s}};var _e=(t,e)=>{for(var i in e)Ae(t,i,{get:e[i],enumerable:!0})},Ze=(t,e,i,s)=>{if(e&&typeof e=="object"||typeof e=="function")for(let r of No(e))!Jo.call(t,r)&&r!==i&&Ae(t,r,{get:()=>e[r],enumerable:!(s=Oo(e,r))||s.enumerable});return t};var b=(t,e,i)=>(i=t!=null?Fo(jo(t)):{},Ze(e||!t||!t.__esModule?Ae(i,"default",{value:t,enumerable:!0}):i,t)),ge=t=>Ze(Ae({},"__esModule",{value:!0}),t);function z(t){return t.replace(/&/g,"&amp;").replace(/</g,"&lt;").replace(/>/g,"&gt;").replace(/"/g,"&quot;").replace(/'/g,"&#39;")}var y,Ie,Xe=k(()=>{"use strict";y=b(require("vscode"));Ie=class{constructor(e){this._extensionUri=e}_extensionUri;webviewView;resolveWebviewView(e,i,s){this.webviewView=e,e.webview.options={enableScripts:!0,localResourceRoots:[this._extensionUri]},this.updateBranch("",!1),e.webview.onDidReceiveMessage(r=>{switch(r.command){case"createBranches":y.commands.executeCommand("ricwiz.createBranches");break;case"prepareDeploy":y.commands.executeCommand("ricwiz.prepareDeploy");break;case"openMRs":y.commands.executeCommand("ricwiz.createMergeRequests");break;case"openMRsVSCode":y.commands.executeCommand("ricwiz.createMergeRequestsVSCode");break;case"openJira":y.commands.executeCommand("ricwiz.openJiraTicket");break;case"showJiraDetails":y.commands.executeCommand("ricwiz.showJiraDetails");break;case"changeJiraStatus":y.commands.executeCommand("ricwiz.changeJiraStatus");break;case"addJiraComment":y.commands.executeCommand("ricwiz.addJiraComment");break;case"addJiraLabel":y.commands.executeCommand("ricwiz.addJiraLabel");break;case"setPage":this.setPage(r.args);break;case"openDashboard":y.commands.executeCommand("ricwiz.openJiraDashboard");break;case"openJiraDetailsForId":y.commands.executeCommand("ricwiz.openJiraDetailsForId",r.args);break;case"refreshDashboard":y.commands.executeCommand("ricwiz.openJiraDashboard");break;case"switchDashboardQuery":y.commands.executeCommand("ricwiz.openJiraDashboard",parseInt(r.args));break;case"openJiraVSCode":y.commands.executeCommand("ricwiz.openJiraTicketVSCode");break;case"openSettings":y.commands.executeCommand("ricwiz.openSettings");break;case"checkout":r.branch&&y.commands.executeCommand("ricwiz.checkoutBranch",r.branch);break;case"copyBranch":y.commands.executeCommand("ricwiz.copyBranchName");break;case"generatePackageXml":y.commands.executeCommand("ricwiz.generatePackageXml");break;case"openDevTools":this.setPage("devtools");break;case"openMain":this.setPage("main");break;case"generateDestructiveChanges":y.commands.executeCommand("ricwiz.generateDestructiveChanges");break;case"deployPackage":y.commands.executeCommand("ricwiz.deployPackage");break;case"runSmartTests":y.commands.executeCommand("ricwiz.runSmartTests");break;case"importData":y.commands.executeCommand("ricwiz.importData");break;case"listTicketFiles":y.commands.executeCommand("ricwiz.listTicketFiles");break;case"resetTracking":y.commands.executeCommand("ricwiz.resetTracking");break;case"extractComponent":y.commands.executeCommand("ricwiz.extractComponent");break;case"deployMultiOrg":y.commands.executeCommand("ricwiz.deployMultiOrg");break;case"captureAdminChanges":y.commands.executeCommand("ricwiz.captureAdminChanges");break;case"whoToBlame":y.commands.executeCommand("ricwiz.whoToBlame");break;case"syncAll":y.commands.executeCommand("ricwiz.syncAll");break;case"updateBases":y.commands.executeCommand("ricwiz.updateBases");break;case"deleteUnused":y.commands.executeCommand("ricwiz.deleteUnusedBranches");break;case"conflict_commitAndContinue":y.commands.executeCommand("ricwiz.conflictAction","commitAndContinue");break;case"conflict_resolveDeletions":y.commands.executeCommand("ricwiz.conflictAction","resolveDeletions");break;case"conflict_abortDeploy":y.commands.executeCommand("ricwiz.conflictAction","abortDeploy");break;case"openFile":if(r.file){let d=y.workspace.workspaceFolders;if(d){let n=y.Uri.joinPath(d[0].uri,r.file);y.commands.executeCommand("vscode.open",n)}}break;case"searchTicket":y.commands.executeCommand("ricwiz.searchTicket");break;case"manualRefresh":y.commands.executeCommand("ricwiz.manualRefresh");break;case"toggleAutoRefresh":y.commands.executeCommand("ricwiz.toggleAutoRefresh");break;case"openHistory":y.commands.executeCommand("ricwiz.openHistory");break}})}conflictState=null;setConflictState(e){this.conflictState=e,this.updateView()}updateBranch(e,i,s=[],r=[],d=[],n=[],f=""){this.webviewView&&(this.currentBranchCache=e,this.currentBranchIsMergedCache=i,this.relatedBranchesCache=s,this.commitsCache=r,this.baseBranchesCache=d,this.recentTicketsCache=n,this.ticketTitleCache=f,this.updateView())}currentBranchCache="";currentBranchIsMergedCache=!1;relatedBranchesCache=[];commitsCache=[];baseBranchesCache=[];recentTicketsCache=[];ticketTitleCache="";currentPage="main";blameDataCache=null;jiraDataCache=null;dashboardDataCache=null;autoRefreshEnabled=!0;setBlameData(e){this.blameDataCache=e}setJiraData(e){this.jiraDataCache=e}setDashboardData(e){this.dashboardDataCache=e}setAutoRefresh(e){this.autoRefreshEnabled=e,this.updateView()}isAutoRefreshEnabled(){return this.autoRefreshEnabled}setPage(e){this.currentPage=e,this.updateView()}updateView(){if(!this.webviewView)return;let e=this.webviewView.webview.asWebviewUri(y.Uri.joinPath(this._extensionUri,"resources","logo.png"));this.webviewView.webview.html=this._getHtmlForWebview(e,this.currentBranchCache,this.relatedBranchesCache,this.commitsCache,this.baseBranchesCache,this.recentTicketsCache,this.currentPage)}_getHtmlForWebview(e,i,s,r,d,n,f){let u=r.length>0?`
            <div class="separator"></div>
            <div style="padding: 0 4px;">
                <div style="font-size: 11px; opacity: 0.7; margin-bottom: 6px; display: flex; align-items: center; gap: 4px;">
                    <span>\u{1F4DC}</span> Recent Commits
                </div>
                <div style="display: flex; flex-direction: column; gap: 2px;">
                    ${r.map(o=>`
                        <div style="font-size: 11px; padding: 3px 4px; border-radius: 2px; display: flex; gap: 6px; align-items: baseline;">
                            <code style="color: var(--vscode-textLink-foreground); font-size: 10px; flex-shrink: 0;">${z(o.hash)}</code>
                            <span style="flex: 1; overflow: hidden; text-overflow: ellipsis; white-space: nowrap;" title="${z(o.message)}">${z(o.message)}</span>
                            <span style="font-size: 9px; opacity: 0.5; flex-shrink: 0;">${z(o.timeAgo)}</span>
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
            </style>
        `;if(this.conflictState){let o=(this.conflictState.files||[]).map(c=>`
                <button class="btn" style="padding: 6px; font-size: 12px; display: flex; justify-content: space-between; align-items: center;" onclick="sendOpenFileCommand('${z(c.file)}')">
                    <span style="flex: 1; overflow: hidden; text-overflow: ellipsis; white-space: nowrap; direction: rtl; text-align: left;">&lrm;${z(c.file)}</span>
                    <span style="font-size: 10px; opacity: 0.8; flex-shrink: 0; background-color: var(--vscode-badge-background); color: var(--vscode-badge-foreground); padding: 2px 4px; border-radius: 2px;">${z(c.state)}</span>
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
                        Merging <b>${z(this.conflictState.sourceStr)}</b> into <b>${z(this.conflictState.targetStr)}</b>.<br/>
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
                    function sendCommand(cmd) { vscode.postMessage({ command: cmd }); }
                    function sendOpenFileCommand(file) { vscode.postMessage({ command: 'openFile', file: file }); }
                </script>
            </body>
            </html>`}if(f==="blame"){let o=this.blameDataCache;return`<!DOCTYPE html>
            <html lang="en">
            <head>
                <meta charset="UTF-8">
                <meta name="viewport" content="width=device-width, initial-scale=1.0">
                <title>Ricwiz Blame</title>
                ${l}
            </head>
            <body>
                <div style="display: flex; align-items: center; gap: 8px; margin-bottom: 16px; margin-top: 8px;">
                    <button class="btn" style="width: auto; padding: 4px 8px; background-color: var(--vscode-button-secondaryBackground); color: var(--vscode-button-secondaryForeground);" onclick="sendCommand('openDevTools')">\u2B05\uFE0F Back</button>
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
                            ${o.gitHistory&&o.gitHistory.length>0?o.gitHistory.map(c=>`
                                <li style="background: var(--vscode-editorWidget-background); border: 1px solid var(--vscode-widget-border); padding: 8px 10px; border-radius: 4px; border-left: 4px solid var(--vscode-gitDecoration-modifiedResourceForeground);">
                                    <div style="display: flex; justify-content: space-between; margin-bottom: 4px; align-items: center;">
                                        <strong style="font-size: 13px;">${c.author}</strong>
                                        <span style="opacity: 0.7; font-size: 11px;">${c.time}</span>
                                    </div>
                                    <div style="font-size: 12px; margin-bottom: 6px; opacity: 0.9; font-style: italic;">"${c.message}"</div>
                                    <div style="font-family: monospace; font-size: 10px; opacity: 0.6;">Commit: ${c.hash}</div>
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
                            ${o.auditHistory&&o.auditHistory.length>0?o.auditHistory.map(c=>`
                                <li style="background: var(--vscode-editorWidget-background); border: 1px solid var(--vscode-widget-border); padding: 8px 10px; border-radius: 4px; border-left: 4px solid var(--vscode-gitDecoration-untrackedResourceForeground);">
                                    <div style="display: flex; justify-content: space-between; margin-bottom: 4px; align-items: center;">
                                        <strong style="font-size: 13px;">${c.author}</strong>
                                        <span style="opacity: 0.7; font-size: 11px;">${c.time}</span>
                                    </div>
                                    <div style="font-size: 12px; font-weight: 500; margin-bottom: 4px;">${c.action}</div>
                                    <div style="font-size: 11px; opacity: 0.7; font-style: italic; background: var(--vscode-editor-background); padding: 4px; border-radius: 3px;">${c.display}</div>
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
                    function sendCommand(cmd) { vscode.postMessage({ command: cmd }); }
                </script>
            </body>
            </html>`}if(f==="jira"){let o=this.jiraDataCache,c=o?.ticketId||"Jira",m=o?.summary||"No Title",a=o?.description||"No description provided.";return`<!DOCTYPE html>
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
                    <button class="icon-button" onclick="sendCommand('setPage', 'main')" title="Back">\u2B05\uFE0F</button>
                    <span style="font-weight: 600; font-size: 13px;">${c} Details</span>
                </div>
                
                <div class="card" style="padding: 16px;">
                    <div class="jira-title">${z(m)}</div>
                    <div class="jira-desc">${z(a)}</div>
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

                </script>
            </body>
            </html>`}if(f==="dashboard"){let o=this.dashboardDataCache||{queries:[],selectedIndex:0,results:[],error:null},c=o.queries.map((a,g)=>`
                <option value="${g}" ${g===o.selectedIndex?"selected":""}>${z(a.name)}</option>
            `).join(""),m=o.error?`
                <div style="color: var(--vscode-errorForeground); padding: 12px; text-align: center; background: var(--vscode-editorError-background); border-radius: 4px;">
                    \u26A0\uFE0F ${z(o.error)}
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
                        </tr>
                    </thead>
                    <tbody>
                        ${o.results.map(a=>`
                            <tr style="border-bottom: 1px solid var(--vscode-panel-border); cursor: pointer;" class="tr-hover" onclick="sendCommand('openJiraDetailsForId', '${z(a.key)}')">
                                <td style="padding: 6px; font-weight: bold; color: var(--vscode-textLink-foreground); white-space: nowrap;">${z(a.key)}</td>
                                <td style="padding: 6px; overflow: hidden; text-overflow: ellipsis; max-width: 150px; white-space: nowrap;" title="${z(a.summary)}">${z(a.summary)}</td>
                                <td style="padding: 6px; white-space: nowrap;">
                                    <span style="background: var(--vscode-badge-background); color: var(--vscode-badge-foreground); padding: 2px 4px; border-radius: 3px; font-size: 9px;">${z(a.status)}</span>
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
                    .icon-button {
                        background: transparent;
                        border: none;
                        cursor: pointer;
                        color: var(--vscode-foreground);
                        padding: 4px;
                        border-radius: 4px;
                    }
                    .icon-button:hover {
                        background: var(--vscode-list-hoverBackground);
                    }
                </style>
            </head>
            <body>
                <div style="display: flex; align-items: center; gap: 8px; margin-bottom: 16px; margin-top: 8px;">
                    <button class="icon-button" onclick="sendCommand('setPage', 'main')" title="Back">\u2B05\uFE0F</button>
                    <span style="font-weight: 600; font-size: 13px; flex: 1;">Ticket Dashboard</span>
                    <button class="icon-button" onclick="sendCommand('refreshDashboard')" title="Refresh">\u{1F504}</button>
                </div>
                
                ${o.queries.length>0?`
                <div style="margin-bottom: 12px;">
                    <select id="querySelect" onchange="sendCommand('switchDashboardQuery', this.value)">
                        ${c}
                    </select>
                </div>
                `:`
                <div style="padding: 12px; opacity: 0.7; text-align: center;">No queries defined in settings.</div>
                `}

                <div style="background: var(--vscode-editor-background); border: 1px solid var(--vscode-panel-border); border-radius: 4px; overflow-x: auto; max-height: 400px; overflow-y: auto;">
                    ${m}
                </div>

                <script>
                    const vscode = acquireVsCodeApi();
                    function sendCommand(command, args) {
                        vscode.postMessage({ command, args });
                    }
                </script>
            </body>
            </html>`}return f==="devtools"?`<!DOCTYPE html>
            <html lang="en">
            <head>
                <meta charset="UTF-8">
                <meta name="viewport" content="width=device-width, initial-scale=1.0">
                <title>Ricwiz DevTools</title>
                ${l}
            </head>
            <body>
                <div style="display: flex; align-items: center; gap: 8px; margin-bottom: 16px; margin-top: 8px;">
                    <button class="btn" style="width: auto; padding: 4px 8px; background-color: var(--vscode-button-secondaryBackground); color: var(--vscode-button-secondaryForeground);" onclick="sendCommand('openMain')">\u2B05\uFE0F Back</button>
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
                    function sendCommand(cmd) { vscode.postMessage({ command: cmd }); }
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
                        ${z(i)} ${this.currentBranchIsMergedCache?'<span style="margin-left: 4px; background-color: var(--vscode-charts-green); color: white; border-radius: 3px; padding: 1px 4px; font-size: 10px; font-weight: bold;" title="Merged to target env">MERGED</span>':""}
                    </div>
                    ${this.ticketTitleCache?`<div style="font-size: 12px; margin-top: 6px; text-align: center; opacity: 0.9; font-style: italic;">${z(this.ticketTitleCache)}</div>`:""}
                    ${s.length>0?`
                        <div style="margin-top: 10px; border-top: 1px solid var(--vscode-panel-border); padding-top: 10px;">
                            <div style="font-size: 10px; opacity: 0.7; margin-bottom: 6px; text-transform: uppercase; text-align: center;">Sister Branches</div>
                            <div style="display: flex; flex-direction: column; gap: 4px;">
                                ${s.map(o=>`
                                    <div class="btn" style="padding: 4px 8px; font-size: 11px; display: flex; justify-content: space-between; align-items: center; background-color: var(--vscode-button-secondaryBackground); color: var(--vscode-button-secondaryForeground); border-radius: 4px;" onclick="sendCheckoutCommand('${z(o.name)}', this)" title="Checkout ${z(o.name)}">
                                        <span style="overflow: hidden; text-overflow: ellipsis; white-space: nowrap; font-weight: bold;">${z(o.name)}</span>
                                        ${o.isMerged?'<span style="background-color: var(--vscode-charts-green); color: white; border-radius: 3px; padding: 1px 4px; font-size: 9px; font-weight: bold;" title="Merged to target env">MERGED</span>':""}
                                    </div>
                                `).join("")}
                            </div>
                        </div>
                    `:n.length>0?`
                        <div style="margin-top: 10px; border-top: 1px solid var(--vscode-panel-border); padding-top: 10px;">
                            <div style="font-size: 10px; opacity: 0.7; margin-bottom: 6px; text-transform: uppercase; text-align: center;">Recent Tickets</div>
                            <div style="display: flex; flex-direction: column; gap: 4px;">
                                ${n.map(o=>`
                                    <div class="btn" style="padding: 4px 8px; font-size: 11px; display: flex; align-items: center; background-color: var(--vscode-button-secondaryBackground); color: var(--vscode-button-secondaryForeground); border-radius: 4px;" onclick="sendCheckoutCommand('${z(o)}', this)" title="Checkout ${z(o)}">
                                        <span style="font-weight: bold;">${z(o)}</span>
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

            ${d.length>0?`
                <div style="display: flex; gap: 4px; margin-bottom: 16px; flex-wrap: wrap; justify-content: center;">
                    ${d.map(o=>`
                        <button class="btn" style="flex: 1; min-width: 25%; justify-content: center; padding: 6px 4px; font-size: 10px; font-weight: bold; background-color: var(--vscode-button-secondaryBackground); color: var(--vscode-button-secondaryForeground); border-radius: 4px;" onclick="sendCheckoutCommand('${z(o)}', this)" title="Checkout ${z(o)}">
                            ${z(o.toUpperCase())}
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
                function sendCommand(cmd) {
                    vscode.postMessage({ command: cmd });
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
        </html>`}}});function Ke(t){$e=t.secrets}async function et(t){if(!$e)throw new Error("SecretStorage is not initialized.");await $e.store("ricwiz.jiraApiToken",t)}async function tt(){if(!$e)throw new Error("SecretStorage is not initialized.");return await $e.get("ricwiz.jiraApiToken")}var $e,Le=k(()=>{"use strict"});var Fe={};_e(Fe,{checkBranchExists:()=>de,exec:()=>p,extractTicketSuggestion:()=>rt,getCurrentBranch:()=>M,getWorkspaceCwd:()=>v,normalizeTicketId:()=>nt,promptForTicketId:()=>N,resolvePrefix:()=>st,ricwizLogger:()=>T});function v(){let t=be.workspace.workspaceFolders;if(t)return t[0].uri.fsPath}async function M(t){try{let{stdout:e}=await p("git branch --show-current",{cwd:t});return e.trim()}catch{return""}}function st(t,e){if(!t.includes(e)){let i=t.match(/([A-Z]+-)\d+/i);if(i)return i[1].toUpperCase()}return e}function rt(t,e,i=!1){let s=t.match(new RegExp(`(${e}\\d+)`,"i"));return s?s[1].toUpperCase():t.includes(e)&&!t.includes("-to-")?t.substring(t.indexOf(e)):i&&t.includes("-to-")?t.substring(t.indexOf(e)).split("-to-")[0]:""}function nt(t,e){let i=t.trim();return/^\d/.test(i)?`${e}${i}`.toUpperCase():i.toUpperCase()}async function N(t,e){let i=be.workspace.getConfiguration("ricwiz"),s=e?.prefix??i.get("ticketPrefix","SFPSCA-"),r=await M(t),d=st(r,s),n=rt(r,d,e?.handleToSuffix),f=await be.window.showInputBox({prompt:e?.prompt||"Enter the full ticket ID (e.g., SCPSCA-1234) or just the number",placeHolder:e?.placeHolder||"Ticket ID or number",value:n});return f?{ticketId:nt(f,d),currentBranch:r,prefix:d}:void 0}async function de(t,e){try{return await p(`git show-ref --verify --quiet refs/heads/${e}`,{cwd:t}),!0}catch{}try{return await p(`git show-ref --verify --quiet refs/remotes/origin/${e}`,{cwd:t}),!0}catch{}return!1}var be,ot,it,Uo,T,p,$=k(()=>{"use strict";be=b(require("vscode")),ot=b(require("child_process")),it=b(require("util")),Uo=it.promisify(ot.exec),T=be.window.createOutputChannel("Ricwiz"),p=async(t,e)=>{T.appendLine(`[EXEC] ${t}`);let i=await Uo(t,{maxBuffer:50*1024*1024,...e});return{stdout:i.stdout.toString(),stderr:i.stderr.toString()}}});async function at(){let t=v();if(!t){j.window.showErrorMessage("Ricwiz: Open a workspace that is a Git repository.");return}let i=j.workspace.getConfiguration("ricwiz").get("ticketSourceBranch","main");await j.window.withProgress({location:j.ProgressLocation.Notification,title:`Ricwiz: Finding deleted files compared to origin/${i}...`,cancellable:!1},async()=>{try{let{stdout:s}=await p(`git diff --name-only --diff-filter=D origin/${i}...HEAD`,{cwd:t}),r=s.split(`
`).map(m=>m.trim()).filter(m=>m.length>0);if(r.length===0){j.window.showInformationMessage(`Ricwiz: No deleted files found compared to origin/${i}.`);return}let d={},n=(m,a)=>{d[m]||(d[m]=[]),d[m].includes(a)||d[m].push(a)};for(let m of r){let a=m.replace(/\\/g,"/");if(a.includes("/classes/")){let g=a.match(/\/classes\/([^/.]+)\.cls/);g&&n("ApexClass",g[1])}else if(a.includes("/triggers/")){let g=a.match(/\/triggers\/([^/.]+)\.trigger/);g&&n("ApexTrigger",g[1])}else if(a.includes("/lwc/")){let g=a.match(/\/lwc\/([^/]+)\//);g&&n("LightningComponentBundle",g[1])}else if(a.includes("/aura/")){let g=a.match(/\/aura\/([^/]+)\//);g&&n("AuraDefinitionBundle",g[1])}else if(a.includes("/objects/")&&a.includes("/fields/")){let g=a.match(/\/objects\/([^/]+)\//),h=a.match(/\/fields\/([^/.]+)\.field/);g&&h&&n("CustomField",`${g[1]}.${h[1]}`)}else if(a.includes("/objects/")){let g=a.match(/\/objects\/([^/.]+)\.object/);g&&n("CustomObject",g[1])}else if(a.includes("/layouts/")){let g=a.match(/\/layouts\/([^/.]+)\.layout/);g&&n("Layout",g[1])}else if(a.includes("/flows/")){let g=a.match(/\/flows\/([^/.]+)\.flow/);g&&n("Flow",g[1])}else if(a.includes("/permissionsets/")){let g=a.match(/\/permissionsets\/([^/.]+)\.permissionset/);g&&n("PermissionSet",g[1])}else if(a.includes("/profiles/")){let g=a.match(/\/profiles\/([^/.]+)\.profile/);g&&n("Profile",g[1])}else if(a.includes("/customMetadata/")){let g=a.match(/\/customMetadata\/([^/.]+)\.md/);g&&n("CustomMetadata",g[1])}else if(a.includes("/flexipages/")){let g=a.match(/\/flexipages\/([^/.]+)\.flexipage/);g&&n("FlexiPage",g[1])}}if(Object.keys(d).length===0){j.window.showInformationMessage("Ricwiz: Found deleted files in Git, but none mapped to recognizable Salesforce metadata.");return}let f=`<?xml version="1.0" encoding="UTF-8"?>
<Package xmlns="http://soap.sforce.com/2006/04/metadata">
`;for(let m of Object.keys(d).sort()){f+=`    <types>
`;for(let a of d[m].sort())f+=`        <members>${a}</members>
`;f+=`        <name>${m}</name>
    </types>
`}f+=`    <version>58.0</version>
</Package>`;let u=Oe.join(t,"destructiveChanges");le.existsSync(u)||le.mkdirSync(u);let l=Oe.join(u,"destructiveChanges.xml"),o=Oe.join(u,"package.xml");le.writeFileSync(l,f,"utf8"),le.existsSync(o)||le.writeFileSync(o,`<?xml version="1.0" encoding="UTF-8"?>
<Package xmlns="http://soap.sforce.com/2006/04/metadata">
    <version>58.0</version>
</Package>`,"utf8");let c=await j.workspace.openTextDocument(l);await j.window.showTextDocument(c),j.window.showInformationMessage("Ricwiz: destructiveChanges.xml generated successfully!")}catch(s){j.window.showErrorMessage(`Ricwiz: Error generating destructive changes: ${s.message}`)}})}var j,Oe,le,ct=k(()=>{"use strict";j=b(require("vscode")),Oe=b(require("path")),le=b(require("fs"));$()});async function dt(){let t=v();if(!t)return;let i=ee.workspace.getConfiguration("ricwiz").get("ticketSourceBranch","main");await ee.window.withProgress({location:ee.ProgressLocation.Notification,title:"Ricwiz: Finding Apex Tests to run...",cancellable:!1},async()=>{try{let{stdout:s}=await p(`git diff --name-status origin/${i}...HEAD`,{cwd:t}),r=s.split(`
`).map(m=>m.trim()).filter(m=>m.length>0),d=new Set,n=new Set;for(let m of r){let a=m.split(/\s+/);if(a[0].startsWith("D"))continue;let g=a[1];if(g&&g.endsWith(".cls")){let h=g.match(/\/classes\/([^/.]+)\.cls/);if(h){let w=h[1];w.toLowerCase().endsWith("test")?d.add(w):n.add(w)}}}for(let m of n)d.add(`${m}Test`);if(d.size===0){ee.window.showInformationMessage("Ricwiz: No Apex Classes were modified in this branch.");return}let f=Array.from(d).map(m=>({label:`$(beaker) ${m}`,description:"Apex Test Class"})),u=await ee.window.showQuickPick(f,{canPickMany:!0,title:"Select Test Classes to Run",placeHolder:"Select tests..."});if(!u||u.length===0)return;let o=`sf apex run test -n ${u.map(m=>m.label.replace("$(beaker) ","").trim()).join(",")} -r human -w 30`,c=ee.window.createTerminal("Ricwiz: Smart Tests");c.show(),c.sendText(o)}catch(s){ee.window.showErrorMessage(`Ricwiz: Error finding tests: ${s.message}`)}})}var ee,lt=k(()=>{"use strict";ee=b(require("vscode"));$()});var fe,mt=k(()=>{"use strict";fe=class{static isValidShellArg(e){return e?/^[a-zA-Z0-9\-_/.]+$/.test(e):!1}}});var ze,ut,Ne,A,se=k(()=>{"use strict";ze=b(require("vscode")),ut=b(require("path")),Ne=b(require("fs")),A=class t{style;upstreamRemote;originRemote;ticketSourceBranch;ticketPrefix;environments;static baseConfig=ze.workspace.getConfiguration("ricwiz");activeProfile;profileName;constructor(e){this.activeProfile=e,this.profileName=e?.name;let i=t.baseConfig;this.style=e?.workflowStyle||i.get("workflowStyle","standard"),this.style==="multi-remote"?(this.upstreamRemote=e?.upstreamRemote||i.get("upstreamRemote","salesforce-master"),this.originRemote=e?.originRemote||i.get("originRemote","origin")):(this.upstreamRemote="origin",this.originRemote="origin"),this.ticketSourceBranch=e?.ticketSourceBranch||i.get("ticketSourceBranch","main"),this.ticketPrefix=e?.ticketPrefix||i.get("ticketPrefix","SFPSCA-");let s=[{name:"Qual",sourceBranch:"quality"},{name:"Val",sourceBranch:"validation"},{name:"Prod",sourceBranch:"main"}];this.environments=e?.environments||i.get("environments",s)}getConfig(e,i){return this.activeProfile&&this.activeProfile[e]!==void 0?this.activeProfile[e]:t.baseConfig.get(e,i)}static async initialize(e,i){let s=t.baseConfig.get("profiles",[]),r=ut.join(e,"ricwiz.json");if(Ne.existsSync(r))try{let d=Ne.readFileSync(r,"utf-8"),n=JSON.parse(d);n&&Array.isArray(n.profiles)&&(s=[...s,...n.profiles])}catch(d){ze.window.showErrorMessage(`Ricwiz: Error parsing ricwiz.json: ${d.message}`)}if(s.length>0){if(!i?.forcePrompt)try{let{exec:u}=($(),ge(Fe)),{stdout:l}=await u("git branch --show-current",{cwd:e}),o=l.trim(),c=o;o.includes("-to-")&&(c=o.split("-to-")[0]);let{stdout:m}=await u(`git config branch.${c}.ricwiz-profile`,{cwd:e}),a=m.trim();if(a){let g=s.find(h=>h.name===a);if(g)return new t(g)}}catch{}let d=s.map(u=>u.name),n=await ze.window.showQuickPick(d,{placeHolder:"Ricwiz: Select Workflow Profile",ignoreFocusOut:!0});if(!n)return;let f=s.find(u=>u.name===n);return new t(f)}return new t}buildUpstreamPath(e){return e.includes("/")?e:`${this.upstreamRemote}/${e}`}getFetchRemote(e){return e.includes("/")?e.split("/")[0]:this.upstreamRemote}getFetchBranch(e){return e.includes("/")?e.substring(e.indexOf("/")+1):e}}});async function pt(){let t=v();if(!t){B.window.showErrorMessage("Open a folder or workspace that is a Git repository.");return}let e=await A.initialize(t,{forcePrompt:!0});if(!e)return;let i=await N(t,{prefix:e.ticketPrefix});if(!i){B.window.showErrorMessage("Branch creation cancelled: Ticket not provided.");return}let{ticketId:s}=i,r=e.environments,d="all",n=[{label:"Create Main Branch & Environments",description:"Creates the main ticket branch and all environment branches",value:"all"},{label:"Create Main Branch Only",description:"Creates only the main ticket branch (skips environments)",value:"mainOnly"},{label:"Create Environments Only",description:"Creates only the environment branches (skip main branch)",value:"envs"}];if(r.length>0){let l=await B.window.showQuickPick(n,{placeHolder:"Ricwiz: What do you want to create?",ignoreFocusOut:!0});if(!l)return;d=l.value}let f=e.ticketSourceBranch;if(d==="all"||d==="mainOnly"){let l=[];try{let{stdout:a}=await p('git branch --all --format="%(refname:short)"',{cwd:t});l=a.split(`
`).map(g=>g.trim()).filter(g=>g&&g!=="origin"),l=[...new Set(l)]}catch{}let o=B.window.createQuickPick();o.title="Ricwiz: Ticket Source Branch",o.placeholder="Confirm or change the source branch for this ticket",o.value=e.ticketSourceBranch,o.ignoreFocusOut=!0;let c=()=>{let a=o.value.trim(),g=[];a&&g.push({label:a,description:"Use typed branch"}),g.push(...l.map(h=>({label:h}))),o.items=g};o.onDidChangeValue(c),c();let m=await new Promise(a=>{o.onDidAccept(()=>{let g=o.selectedItems[0];a(g?g.label:o.value),o.hide()}),o.onDidHide(()=>a(void 0)),o.show()});if(!m){B.window.showInformationMessage("Branch creation cancelled.");return}f=m.trim()}let u=s;if(!fe.isValidShellArg(u)){B.window.showErrorMessage(`Invalid format for ticket ID: ${u}`);return}if(!fe.isValidShellArg(f)){B.window.showErrorMessage(`Invalid format for ticketSourceBranch in settings: ${f}`);return}for(let l of r){if(!fe.isValidShellArg(l.name)){B.window.showErrorMessage(`Invalid format for environment name in settings: ${l.name}`);return}if(!fe.isValidShellArg(l.sourceBranch)){B.window.showErrorMessage(`Invalid format for environment sourceBranch in settings: ${l.sourceBranch}`);return}}try{await p("git status",{cwd:t})}catch{B.window.showErrorMessage("The opened folder does not appear to be a valid Git repository.");return}try{await B.window.withProgress({location:B.ProgressLocation.Notification,title:"Ricwiz: Creating Branches",cancellable:!1},async l=>{let o=[];l.report({message:"Checking remote status (git fetch)...",increment:10});try{await p("git fetch",{cwd:t})}catch{}try{if(d==="all"||d==="mainOnly"){if(l.report({message:`Creating main branch ${u}...`,increment:10}),await de(t,u))B.window.showInformationMessage(`Ricwiz: The branch ${u} already exists. Skipping creation...`),await p(`git checkout ${u}`,{cwd:t});else try{let c=e.getFetchRemote(f),m=e.getFetchBranch(f),a=e.buildUpstreamPath(f);await p(`git fetch ${c} ${m}`,{cwd:t}),await p(`git checkout -b ${u} ${a}`,{cwd:t}),o.push(u)}catch{try{await p(`git checkout -b ${u} ${f}`,{cwd:t}),o.push(u)}catch{throw new Error(`Could not create main branch '${u}' from '${f}'. Does the source branch exist?`)}}try{await p(`git config branch.${u}.ricwiz-source "${f}"`,{cwd:t}),e.profileName&&await p(`git config branch.${u}.ricwiz-profile "${e.profileName}"`,{cwd:t})}catch{}}if(d==="all"||d==="envs"){let c=50/(r.length||1);for(let m of r){let a=`${s}-to-${m.name}`,g=m.sourceBranch;if(l.report({message:`Processing environment branch ${a}...`,increment:c}),!await de(t,a))try{let h=e.buildUpstreamPath(g);await p(`git checkout -b ${a} ${h}`,{cwd:t}),o.push(a)}catch{try{await p(`git checkout -b ${a} ${g}`,{cwd:t}),o.push(a)}catch{throw new Error(`Could not create environment branch '${a}' from '${g}'. Does the source branch exist?`)}}}}l.report({message:`Publishing branches to ${e.originRemote}...`,increment:10});for(let c of o)try{await p(`git push -u ${e.originRemote} ${c}`,{cwd:t})}catch{B.window.showWarningMessage(`Ricwiz: Branch ${c} was created locally but could not be pushed to ${e.originRemote}.`)}if(d==="all"||d==="mainOnly"){l.report({message:`Switching to ${u}...`,increment:10});try{await p(`git checkout ${u}`,{cwd:t})}catch{}}l.report({increment:100}),B.window.showInformationMessage("Ricwiz: All set! You can start working on your branches! \u{1F680}")}catch(c){if(B.window.showErrorMessage(`Ricwiz Branch Creation Failed: ${c.message}`),o.length>0){try{await p(`git checkout ${f}`,{cwd:t})}catch{}for(let m of o)try{await p(`git branch -D ${m}`,{cwd:t})}catch{}B.window.showWarningMessage(`Ricwiz: Rolled back (deleted) ${o.length} branch(es) locally due to failure.`)}}})}catch(l){B.window.showErrorMessage(`Ricwiz general error: ${l.message}`)}}var B,gt=k(()=>{"use strict";B=b(require("vscode"));$();mt();se()});async function he(t,e,i,s){s&&s.report({message:"CONFLICT! Resolve & click 'Commit & Continue' in Ricwiz panel."});let r=!1,d=!1,n=async()=>{try{let{stdout:o}=await p("git status --porcelain",{cwd:t});return o.split(`
`).filter(c=>{let m=c.substring(0,2);return["UD","DU","DD","AU","UA"].includes(m)}).map(c=>c.substring(3).trim())}catch{return[]}},f=async()=>{try{let{stdout:o}=await p("git status --porcelain",{cwd:t}),c=m=>m==="UU"?"Both Modified":m==="UD"?"Deleted by them":m==="DU"?"Deleted by us":m==="DD"?"Both Deleted":m==="AA"?"Both Added":m==="AU"?"Added by us":m==="UA"?"Added by them":"Conflicted";return o.split(`
`).map(m=>m.trimRight()).filter(m=>m.length>2).filter(m=>{let a=m.substring(0,2);return["UU","AA","UD","DU","AU","UA","DD"].includes(a)}).map(m=>{let a=m.substring(0,2);return{file:m.substring(3).trim(),state:c(a)}})}catch{return[]}},u=async()=>{if(r)return;let o=await n(),c=await f(),{webviewProvider:m}=(Je(),ge(je));m&&m.setConflictState({isConflict:!0,sourceStr:e,targetStr:i,deletionsCount:o.length,files:c})},l=te.commands.registerCommand("ricwiz.conflictAction",async o=>{if(o==="abortDeploy")d=!0;else if(o==="resolveDeletions"){try{let m=(await n()).map(g=>({label:g})),a=await te.window.showQuickPick(m,{canPickMany:!0,placeHolder:"Select conflicted files to DELETE",title:"Ricwiz: Delete Conflicted Files"});if(a&&a.length>0){for(let g of a)try{await p(`git rm --force "${g.label}"`,{cwd:t})}catch{}te.window.showInformationMessage(`Ricwiz: Deleted ${a.length} conflicted file(s).`)}}catch(c){te.window.showErrorMessage(`Ricwiz: Error. (${c.message})`)}u()}else if(o==="commitAndContinue")try{let m=(await n()).filter(g=>ft.existsSync(ht.join(t,g)));if(m.length>0&&await te.window.showWarningMessage(`Wait! There are ${m.length} file(s) with deletion conflicts that are still on your disk.

If you commit now, you will KEEP them in the project.

Are you sure you want to KEEP them?`,{modal:!0},"Yes, KEEP them","No, let me DELETE them")!=="Yes, KEEP them"){u();return}let a=!1;try{let{stdout:g}=await p('git grep -E "^<<<<<<< "',{cwd:t});g.trim().length>0&&(a=!0)}catch{}if(a){te.window.showErrorMessage("Ricwiz: You still have unresolved conflict markers (<<<<<<<) in your files. Please resolve them first!"),u();return}await p("git add .",{cwd:t}),await p("git commit --no-edit",{cwd:t})}catch(c){te.window.showErrorMessage(`Ricwiz: Could not commit automatically. (${c.message})`),u()}});for(u();;){if(d){r=!0,l.dispose(),(Je(),ge(je)).webviewProvider?.setConflictState(null);try{await p("git merge --abort",{cwd:t})}catch{}return!1}try{let{stdout:o}=await p("git status --porcelain",{cwd:t});if(o.trim().length===0)return r=!0,l.dispose(),(Je(),ge(je)).webviewProvider?.setConflictState(null),te.window.showInformationMessage("Ricwiz: Changes committed!"),!0}catch{}await new Promise(o=>setTimeout(o,2e3))}}var te,ft,ht,Ue=k(()=>{"use strict";te=b(require("vscode")),ft=b(require("fs")),ht=b(require("path"));$()});async function wt(){let t=v();if(!t){F.window.showErrorMessage("Ricwiz: Open a folder or workspace that is a Git repository.");return}try{await p("git status",{cwd:t})}catch{F.window.showErrorMessage("Ricwiz: The opened folder does not appear to be a valid Git repository.");return}let e=await A.initialize(t);if(!e)return;let i=e.environments,s=await N(t,{prefix:e.ticketPrefix});if(!s){F.window.showErrorMessage("Operation cancelled: Ticket not provided.");return}let{ticketId:r,currentBranch:d}=s,n=r;if(!await de(t,n)){F.window.showErrorMessage(`Ricwiz: Main branch '${n}' does not exist! Prepare deploy is only available when a main ticket branch is used.`);return}let f=e.getConfig("defaultReviewers",""),u="";try{let{stdout:l}=await p(`git config branch.${r}.ricwiz-reviewers`,{cwd:t});u=l.trim()}catch{}if(f.trim()){let l=await F.window.showInputBox({prompt:"Ricwiz: Reviewers for this deploy (optional, comma-separated)",placeHolder:"e.g. @joao, 123456",value:u||f,ignoreFocusOut:!0});if(l===void 0)return;try{l.trim()?await p(`git config branch.${r}.ricwiz-reviewers "${l.trim()}"`,{cwd:t}):u&&await p(`git config --unset branch.${r}.ricwiz-reviewers`,{cwd:t})}catch{}}await F.window.withProgress({location:F.ProgressLocation.Notification,title:"Ricwiz: Preparing Deploy",cancellable:!0},async(l,o)=>{let c=0,m=d,a=!1;o.onCancellationRequested(()=>{a=!0}),l.report({message:"Syncing remote information...",increment:10});try{await p("git fetch --all",{cwd:t});let h=10/(i.length||1);for(let w of i)try{if(a)throw new Error("Aborted");l.report({message:`Fetching ${w.sourceBranch}...`,increment:h});let R=e.getFetchRemote(w.sourceBranch),P=e.getFetchBranch(w.sourceBranch);await p(`git fetch ${R} ${P}:${P}`,{cwd:t})}catch{}}catch{}let g=60/(i.length||1);for(let h of i){if(a)break;let w=`${r}-to-${h.name}`,R=h.sourceBranch;try{l.report({message:`Processing ${w}...`,increment:g/4}),await p(`git checkout ${w}`,{cwd:t});try{await p(`git pull ${e.originRemote} ${w}`,{cwd:t})}catch{}let P=async K=>{try{await p(`git merge ${K}`,{cwd:t})}catch(S){let L=!1;try{let{stdout:U}=await p("git ls-files -u",{cwd:t});U.trim().length>0&&(L=!0)}catch{}let J=((S.stdout||"")+(S.stderr||"")+(S.message||"")).toLowerCase();if(L||J.includes("conflict")||J.includes("conflit")){if(!await he(t,K,w,l))throw a=!0,new Error("Deploy aborted by user.")}else throw S}};l.report({message:`Merging ${R} into ${w}...`,increment:g/4});let ae=e.getFetchRemote(R),ue=e.getFetchBranch(R),pe=e.buildUpstreamPath(R);if(await p(`git fetch ${ae} ${ue}`,{cwd:t}),await P(pe),l.report({message:`Merging ${n} into ${w}...`,increment:g/4}),await P(n),a)break;l.report({message:`Pushing ${w}...`,increment:g/4}),await p(`git push ${e.originRemote} ${w}`,{cwd:t}),c++}catch(P){P.message.includes("aborted")?F.window.showInformationMessage("Ricwiz: Deploy cancelled."):F.window.showErrorMessage(`Ricwiz: Failed to process branch ${w}. Detail: ${P.message}`);return}}if(!a){l.report({message:"Finishing up...",increment:10});let h=m;try{await p(`git show-ref --verify --quiet refs/heads/${n}`,{cwd:t}),h=n}catch{}try{let w=await M(t);h&&h!==w?(await p(`git checkout ${h}`,{cwd:t}),F.window.showInformationMessage(`Ricwiz: Operation complete. Back on branch ${h}.`)):F.window.showInformationMessage("Ricwiz: Operation complete.")}catch{F.window.showInformationMessage("Ricwiz: Operation complete.")}}})}var F,vt=k(()=>{"use strict";F=b(require("vscode"));$();Ue();se()});async function bt(t=!1){let e=v();if(!e)return;let i=await A.initialize(e);if(!i)return;let s=await N(e,{prompt:"Enter the full ticket ID for the Merge Requests (e.g., SCPSCA-1234) or just the number"});if(!s)return;let{ticketId:r}=s,n=Y.workspace.getConfiguration("ricwiz").get("gitlabUrlOverride",""),f="";if(n&&n.trim()!=="")f=n.trim();else{let o="";try{let{stdout:c}=await p("git remote get-url origin",{cwd:e});o=c.trim()}catch{Y.window.showErrorMessage("Ricwiz: Could not get the remote origin URL. Please configure the URL manually in the extension settings.");return}f=o,f.endsWith(".git")&&(f=f.slice(0,-4)),f.startsWith("git@")&&(f=f.replace("git@","").replace(":","/"),f=`https://${f}`)}let u=[],l=i.ticketSourceBranch;try{let{stdout:o}=await p(`git config branch.${r}.ricwiz-source`,{cwd:e});o.trim()&&(l=o.trim())}catch{}if(i.environments.length===0)u.push({source:r,target:l});else for(let o of i.environments)u.push({source:`${r}-to-${o.name}`,target:o.sourceBranch});for(let o of u){let c=`${f}/-/merge_requests/new?merge_request[source_branch]=${o.source}&merge_request[target_branch]=${o.target}`;t?Y.commands.executeCommand("simpleBrowser.show",c):Y.env.openExternal(Y.Uri.parse(c))}Y.window.showInformationMessage(`Ricwiz: Opening ${t?"VS Code browser":"external browser"} for Merge Requests!`)}async function yt(){return bt(!1)}async function xt(){return bt(!0)}var Y,kt=k(()=>{"use strict";Y=b(require("vscode"));$();se()});async function Ct(t=!1){let e=v();if(!e)return;let i=_.workspace.getConfiguration("ricwiz"),s=i.get("jiraUrl","");if(!s||s.trim()===""){_.window.showErrorMessage("Ricwiz: Jira URL is not configured. Please set it in the extension settings (e.g., https://jira.company.com/browse/).");return}let{getCurrentBranch:r,resolvePrefix:d,extractTicketSuggestion:n}=($(),ge(Fe)),f=await r(e),u=i.get("ticketPrefix","SFPSCA-"),l=d(f,u),c=n(f,l,!0);if(c){let{normalizeTicketId:a}=($(),ge(Fe));c=a(c,l)}else{let a=await N(e,{prompt:"Ricwiz could not detect the ticket from the branch name. Enter Jira ticket ID (e.g. SFPSCA-1234)",handleToSuffix:!0});if(!a)return;c=a.ticketId}let m=s.trim();m.endsWith("/")||(m+="/"),m+=c,t?_.commands.executeCommand("simpleBrowser.show",m):_.env.openExternal(_.Uri.parse(m)),_.window.showInformationMessage(`Ricwiz: Opening Jira Ticket ${c} in ${t?"VS Code":"browser"}!`)}async function $t(){return Ct(!1)}async function zt(){return Ct(!0)}var _,Rt=k(()=>{"use strict";_=b(require("vscode"));$()});async function Wo(){let t=St.workspace.getConfiguration("ricwiz"),e=t.get("jiraUrl",""),i=t.get("jiraEmail","")?.trim(),s=(await tt())?.trim();if(!e||!s)throw new Error('Jira API Token is not securely configured. Please run the "Ricwiz: Set Secure Jira API Token" command.');let r=e;r.includes("/browse")&&(r=r.split("/browse")[0]),r.endsWith("/")&&(r=r.slice(0,-1));let d=i?`Basic ${Buffer.from(`${i}:${s}`).toString("base64")}`:`Bearer ${s}`;return{baseUrl:r,headerAuth:d}}async function ye(t,e,i){let{baseUrl:s,headerAuth:r}=await Wo(),d=new URL(`${s}${e}`);return new Promise((n,f)=>{let u=Pt.request(d,{method:t,headers:{Authorization:r,Accept:"application/json",...i?{"Content-Type":"application/json"}:{}}},l=>{if(l.statusCode===401||l.statusCode===403)return f(new Error(`Authentication failed (HTTP ${l.statusCode}). Please check your Jira settings.`));if(l.statusCode===404)return f(new Error("Resource not found (HTTP 404)."));if(l.statusCode&&l.statusCode>=400)return f(new Error(`Jira API returned HTTP status ${l.statusCode}`));let o="";l.on("data",c=>o+=c),l.on("end",()=>{if(!o)return n({});try{let c=JSON.parse(o);n(c)}catch{f(new Error("Failed to parse Jira response."))}})});u.on("error",l=>f(new Error(`Network error: ${l.message}`))),i&&u.write(JSON.stringify(i)),u.end()})}async function xe(t){let e=await ye("GET",`/rest/api/2/issue/${t}`);return e&&e.fields?{summary:e.fields.summary||"",description:e.fields.description||"No description provided."}:null}async function Bt(t){let e=await ye("GET",`/rest/api/2/issue/${t}/transitions`);return e&&e.transitions?e.transitions.map(i=>({id:i.id,name:i.name})):[]}async function Et(t,e){await ye("POST",`/rest/api/2/issue/${t}/transitions`,{transition:{id:e}})}async function Dt(t,e){await ye("POST",`/rest/api/2/issue/${t}/comment`,{body:e})}async function Tt(t,e){await ye("PUT",`/rest/api/2/issue/${t}`,{update:{labels:[{add:e}]}})}async function Mt(t){let e=await ye("POST","/rest/api/2/search",{jql:t,maxResults:50,fields:["summary","status","assignee"]});return e&&e.issues?e.issues.map(i=>({key:i.key,summary:i.fields?.summary||"No Title",status:i.fields?.status?.name||"Unknown",assignee:i.fields?.assignee?.displayName||"Unassigned"})):[]}var Pt,St,Re=k(()=>{"use strict";Pt=b(require("https")),St=b(require("vscode"));Le()});async function At(t){let e=v();if(e)try{if(!await A.initialize(e))return;let r=(await M(e)).split("-to-")[0];if(!r){oe.window.showErrorMessage("Ricwiz: You are not currently on a valid ticket branch.");return}await oe.window.withProgress({location:oe.ProgressLocation.Notification,title:`Fetching details for ${r}...`,cancellable:!1},async d=>{let n=await xe(r);n?(t.setJiraData({ticketId:r,...n}),t.setPage("jira")):oe.window.showErrorMessage("Ricwiz: No data found for this ticket.")})}catch(i){i.message.includes("securely configured")?await oe.window.showErrorMessage(i.message,"Set Token Now")==="Set Token Now"&&oe.commands.executeCommand("ricwiz.setJiraToken"):oe.window.showErrorMessage(`Ricwiz Jira Error: ${i.message}`)}}var oe,It=k(()=>{"use strict";oe=b(require("vscode"));$();se();Re()});async function Lt(t,e){let s=me.workspace.getConfiguration("ricwiz").get("jiraDashboards",[]);if(e!==void 0&&(we=e),!s||s.length===0){t.setDashboardData({queries:[],selectedIndex:0,results:[],error:"No queries defined in settings. Go to Settings > Ricwiz > Jira Dashboards."}),t.setPage("dashboard");return}we>=s.length&&(we=0);let r=s[we];t.setDashboardData({queries:s,selectedIndex:we,results:[],error:"\u23F3 Loading tickets..."}),t.setPage("dashboard");try{let d=await Mt(r.jql);t.setDashboardData({queries:s,selectedIndex:we,results:d,error:null}),t.setPage("dashboard")}catch(d){let n=d.message;(n.includes("ENOTFOUND")||n.includes("network"))&&(n="No Internet or Invalid URL"),t.setDashboardData({queries:s,selectedIndex:we,results:[],error:n}),t.setPage("dashboard")}}async function Ft(t,e){await me.window.withProgress({location:me.ProgressLocation.Notification,title:`Fetching details for ${e}...`,cancellable:!1},async()=>{try{let i=await xe(e);i?(t.setJiraData({ticketId:e,...i}),t.setPage("jira")):me.window.showErrorMessage(`Ricwiz: No data found for ticket ${e}.`)}catch(i){me.window.showErrorMessage(`Ricwiz Jira Error: ${i.message}`)}})}var me,we,Ot=k(()=>{"use strict";me=b(require("vscode"));Re();we=0});async function Ge(){let t=v();return!t||!await A.initialize(t,{forcePrompt:!1})?void 0:(await M(t)).split("-to-")[0]}async function Nt(){try{let t=await Ge();if(!t){C.window.showErrorMessage("Ricwiz: You are not on a valid ticket branch.");return}let e=await C.window.withProgress({location:C.ProgressLocation.Notification,title:`Fetching available status for ${t}...`,cancellable:!1},()=>Bt(t));if(!e||e.length===0){C.window.showInformationMessage(`Ricwiz: No transitions available for ${t}.`);return}let i=e.map(r=>({label:r.name,id:r.id})),s=await C.window.showQuickPick(i,{placeHolder:`Select new status for ${t}`,ignoreFocusOut:!0});s&&(await C.window.withProgress({location:C.ProgressLocation.Notification,title:`Updating status to ${s.label}...`,cancellable:!1},()=>Et(t,s.id)),C.window.showInformationMessage(`Ricwiz: Status for ${t} updated to ${s.label}.`))}catch(t){t.message.includes("securely configured")?C.window.showErrorMessage(t.message,"Set Token Now").then(e=>{e==="Set Token Now"&&C.commands.executeCommand("ricwiz.setJiraToken")}):C.window.showErrorMessage(`Ricwiz Jira Error: ${t.message}`)}}async function jt(){try{let t=await Ge();if(!t){C.window.showErrorMessage("Ricwiz: You are not on a valid ticket branch.");return}let e=await C.window.showInputBox({prompt:`Add comment to ${t}`,placeHolder:"Type your comment here...",ignoreFocusOut:!0});e&&(await C.window.withProgress({location:C.ProgressLocation.Notification,title:`Adding comment to ${t}...`,cancellable:!1},()=>Dt(t,e)),C.window.showInformationMessage(`Ricwiz: Comment added to ${t}.`))}catch(t){t.message.includes("securely configured")?C.window.showErrorMessage(t.message,"Set Token Now").then(e=>{e==="Set Token Now"&&C.commands.executeCommand("ricwiz.setJiraToken")}):C.window.showErrorMessage(`Ricwiz Jira Error: ${t.message}`)}}async function Jt(){try{let t=await Ge();if(!t){C.window.showErrorMessage("Ricwiz: You are not on a valid ticket branch.");return}let e=await C.window.showInputBox({prompt:`Add a label to ${t}`,placeHolder:"e.g. Needs-Review, Bug, High-Priority",ignoreFocusOut:!0});e&&e.trim()&&(await C.window.withProgress({location:C.ProgressLocation.Notification,title:`Adding label to ${t}...`,cancellable:!1},()=>Tt(t,e.trim())),C.window.showInformationMessage(`Ricwiz: Label '${e.trim()}' added to ${t}.`))}catch(t){t.message.includes("securely configured")?C.window.showErrorMessage(t.message,"Set Token Now").then(e=>{e==="Set Token Now"&&C.commands.executeCommand("ricwiz.setJiraToken")}):C.window.showErrorMessage(`Ricwiz Jira Error: ${t.message}`)}}async function Ut(){let t=await C.window.showInputBox({prompt:"Enter your Jira API Token (or Personal Access Token). It will be securely stored in your OS keychain.",password:!0,ignoreFocusOut:!0});if(t)try{await et(t.trim()),C.window.showInformationMessage("Ricwiz: Jira API Token securely stored!")}catch(e){C.window.showErrorMessage(`Ricwiz: Failed to store token: ${e.message}`)}}var C,Wt=k(()=>{"use strict";C=b(require("vscode"));$();se();Re();Le()});async function qt(){let t=v();if(!t){re.window.showErrorMessage("Ricwiz: Open a folder or workspace that is a Git repository.");return}let e=await A.initialize(t);if(!e)return;let i=await N(t,{prefix:e.ticketPrefix,prompt:"Enter the full ticket ID to sync all branches for (e.g., SCPSCA-1234) or just the number"});if(!i)return;let{ticketId:s,currentBranch:r}=i;await re.window.withProgress({location:re.ProgressLocation.Notification,title:`Ricwiz: Syncing all branches for ${s}...`,cancellable:!1},async d=>{try{d.report({message:"Fetching from remote..."});try{await p("git fetch --all",{cwd:t})}catch{}let{stdout:n}=await p(`git branch --list "*${s}*"`,{cwd:t}),f=n.split(`
`).map(o=>o.replace("*","").trim()).filter(o=>o.length>0);if(f.length===0){re.window.showWarningMessage(`Ricwiz: No local branches found for ${s}.`);return}let u=0,l=0;for(let o of f)if(d.report({message:`Syncing ${o}...`}),o===r)try{await p(`git pull ${e.originRemote} ${o}`,{cwd:t}),u++}catch(c){let m=!1;try{let{stdout:g}=await p("git ls-files -u",{cwd:t});g.trim().length>0&&(m=!0)}catch{}let a=((c.stdout||"")+(c.stderr||"")+(c.message||"")).toLowerCase();(m||a.includes("conflict")||a.includes("conflit"))&&await he(t,`${e.originRemote}/${o}`,o,d)?u++:l++}else try{await p(`git fetch ${e.originRemote} ${o}:${o}`,{cwd:t}),u++}catch{try{await p(`git checkout ${o}`,{cwd:t});try{await p(`git pull ${e.originRemote} ${o}`,{cwd:t}),u++}catch(m){let a=!1;try{let{stdout:h}=await p("git ls-files -u",{cwd:t});h.trim().length>0&&(a=!0)}catch{}let g=((m.stdout||"")+(m.stderr||"")+(m.message||"")).toLowerCase();(a||g.includes("conflict")||g.includes("conflit"))&&await he(t,`${e.originRemote}/${o}`,o,d)?u++:l++}await p(`git checkout ${r}`,{cwd:t})}catch{try{await p(`git checkout ${r}`,{cwd:t})}catch{}l++}}l>0?re.window.showWarningMessage(`Ricwiz: Synced ${u}/${f.length} branches. ${l} branch(es) could not be synced (possible conflicts or diverged history).`):re.window.showInformationMessage(`Ricwiz: \u{1F504} All ${u} branches for ${s} are up to date!`)}catch(n){re.window.showErrorMessage(`Ricwiz: Sync failed: ${n.message}`)}})}var re,Ht=k(()=>{"use strict";re=b(require("vscode"));$();Ue();se()});async function Vt(){let t=v();if(!t){ne.window.showErrorMessage("Ricwiz: Open a folder or workspace that is a Git repository.");return}try{await p("git status",{cwd:t})}catch{ne.window.showErrorMessage("Ricwiz: The opened folder does not appear to be a valid Git repository.");return}let e=await A.initialize(t);if(!e)return;let i=e.environments,s=await N(t,{prefix:e.ticketPrefix});if(!s)return;let{ticketId:r,currentBranch:d}=s;await ne.window.withProgress({location:ne.ProgressLocation.Notification,title:"Ricwiz: Updating environment branches from their bases",cancellable:!0},async(n,f)=>{let u=0,l=d,o=!1;f.onCancellationRequested(()=>{o=!0}),n.report({message:"Syncing remote information...",increment:10});try{await p("git fetch --all",{cwd:t})}catch{}let c=80/(i.length||1);for(let m of i){if(o)break;let a=`${r}-to-${m.name}`,g=m.sourceBranch;if(await de(t,a))try{n.report({message:`Processing ${a}...`,increment:c/2}),await p(`git checkout ${a}`,{cwd:t});try{n.report({message:`Merging ${g} into ${a}...`,increment:c/2});let h=e.getFetchRemote(g),w=e.getFetchBranch(g),R=e.buildUpstreamPath(g);await p(`git fetch ${h} ${w}`,{cwd:t}),await p(`git merge ${R}`,{cwd:t})}catch(h){let w=!1;try{let{stdout:P}=await p("git ls-files -u",{cwd:t});P.trim().length>0&&(w=!0)}catch{}let R=((h.stdout||"")+(h.stderr||"")+(h.message||"")).toLowerCase();if(w||R.includes("conflict")||R.includes("conflit")){let P=e.buildUpstreamPath(g);if(!await he(t,P,a,n))throw o=!0,new Error("Update aborted by user.")}else throw h}if(o)break;u++}catch(h){h.message.includes("aborted")?ne.window.showInformationMessage("Ricwiz: Update cancelled."):ne.window.showErrorMessage(`Ricwiz: Failed to update branch ${a}. Detail: ${h.message}`);return}}if(!o){n.report({message:"Finishing up...",increment:10});try{let m=await M(t);l&&l!==m&&await p(`git checkout ${l}`,{cwd:t})}catch{}ne.window.showInformationMessage(`Ricwiz: Successfully updated ${u} environment branches from their bases!`)}})}var ne,Gt=k(()=>{"use strict";ne=b(require("vscode"));$();Ue();se()});async function Qt(){let t=v();if(!t){I.window.showErrorMessage("Ricwiz: Open a folder or workspace that is a Git repository.");return}let e=await M(t),i=I.workspace.getConfiguration("ricwiz");await I.window.withProgress({location:I.ProgressLocation.Notification,title:"Ricwiz: Scanning for unused local branches...",cancellable:!1},async()=>{try{await p("git fetch --prune",{cwd:t})}catch{}let s=[];try{let{stdout:c}=await p('git branch --format="%(refname:short)"',{cwd:t});s=c.split(`
`).map(m=>m.trim()).filter(m=>m.length>0)}catch{}if(s.length===0){I.window.showInformationMessage("Ricwiz: No local branches found.");return}let r=[];try{let{stdout:c}=await p('git branch -r --format="%(refname:short)"',{cwd:t});r=c.split(`
`).map(m=>m.trim().replace(/^origin\//,"").replace(/^[^\/]+\//,"")).filter(m=>m.length>0&&!m.includes("HEAD"))}catch{}let d=[];try{let{stdout:c}=await p('git for-each-ref --format="%(refname:short)|||%(upstream:track)" refs/heads/',{cwd:t});d=c.split(`
`).filter(m=>m.includes("[gone]")).map(m=>m.split("|||")[0].trim())}catch{}let n=s.filter(c=>!r.includes(c));if(n.length===0){I.window.showInformationMessage("Ricwiz: Your local repository is totally clean! All local branches exist on the remote.");return}let f=n.map(c=>{let m=d.includes(c),a=c===e,g="Not found on remote";return m&&(g="Deleted on remote [gone]"),a&&(g+=" (Current branch - will checkout main first)"),{label:c,description:g,picked:m&&!a}}),u=await I.window.showQuickPick(f,{canPickMany:!0,placeHolder:"Select local branches to delete",title:"Ricwiz: Delete Unused Branches"});if(!u||u.length===0){I.window.showInformationMessage("Ricwiz: No branches selected for deletion.");return}if(await I.window.showWarningMessage(`Ricwiz: Delete ${u.length} local branch(es)?
This cannot be undone!`,{modal:!0},"Yes, delete them")!=="Yes, delete them"){I.window.showInformationMessage("Ricwiz: Deletion cancelled.");return}let o=0;for(let c of u){let m=c.label;if(m===e){let a=i.get("ticketSourceBranch","main");try{await p(`git checkout ${a}`,{cwd:t}),e=a}catch{I.window.showWarningMessage(`Ricwiz: Could not switch away from ${m}. Skipping.`);continue}}try{await p(`git branch -D ${m}`,{cwd:t}),o++}catch{I.window.showWarningMessage(`Ricwiz: Could not delete local branch ${m}.`)}}I.window.showInformationMessage(`Ricwiz: \u{1F5D1}\uFE0F Cleaned up ${o} unused local branch(es).`)})}var I,Yt=k(()=>{"use strict";I=b(require("vscode"));$()});async function ke(t){let e=v();e&&await Z.window.withProgress({location:Z.ProgressLocation.Notification,title:`Ricwiz: Switching to ${t}...`,cancellable:!1},async()=>{try{let i=await M(e),s=!1;try{let{stdout:d}=await p("git status --porcelain",{cwd:e});s=d.trim().length>0}catch{}if(s&&i)try{await p(`git stash push --include-untracked -m "ricwiz-auto:${i}"`,{cwd:e}),Z.window.showInformationMessage(`Ricwiz: \u{1F4E6} Stashed changes from ${i}`)}catch{Z.window.showWarningMessage("Ricwiz: Could not stash changes. Checkout may fail if there are conflicts.")}let r=t;t.includes("/")&&(r=t.split("/").slice(1).join("/"));try{await p(`git checkout ${r}`,{cwd:e})}catch{let n="";if(t.includes("/"))n=t.split("/")[0];else{let{stdout:f}=await p("git branch -r",{cwd:e}),u=f.split(`
`).map(o=>o.trim()).filter(o=>o),l=[];for(let o of u){let c=o.split(" ")[0];c.endsWith(`/${r}`)&&l.push(c.substring(0,c.lastIndexOf("/")))}if(l.length===0){Z.window.showErrorMessage(`Ricwiz: A branch "${r}" n\xE3o existe localmente nem em nenhuma remote!`);return}else if(l.length===1)n=l[0];else{let o=await A.initialize(e);l.includes("origin")?n="origin":o&&l.includes(o.upstreamRemote)?n=o.upstreamRemote:n=l[0]}}try{await p(`git fetch ${n} ${r}`,{cwd:e}),await p(`git checkout -b ${r} --track ${n}/${r}`,{cwd:e})}catch{Z.window.showErrorMessage(`Ricwiz: Encontrou na remote ${n} mas falhou a fazer checkout.`);return}}try{let{stdout:d}=await p("git stash list",{cwd:e}),n=d.split(`
`);for(let f=0;f<n.length;f++)if(n[f].includes(`ricwiz-auto:${r}`)){let u=n[f].match(/stash@\{(\d+)\}/);u&&(await p(`git stash pop stash@{${u[1]}}`,{cwd:e}),Z.window.showInformationMessage(`Ricwiz: \u{1F4E6} Restored stashed changes on ${r}`));break}}catch{Z.window.showWarningMessage(`Ricwiz: Could not restore stashed changes on ${r}. You may need to resolve conflicts manually (check git stash list).`)}}catch{Z.window.showErrorMessage(`Ricwiz: Could not checkout branch ${t}.`)}})}var Z,We=k(()=>{"use strict";Z=b(require("vscode"));$();se()});async function _t(){let t=v();if(t)try{let{stdout:e}=await p("git branch --show-current",{cwd:t}),i=e.trim();i&&(await Pe.env.clipboard.writeText(i),Pe.window.showInformationMessage(`Ricwiz: \u{1F4CB} Copied "${i}" to clipboard`))}catch{Pe.window.showErrorMessage("Ricwiz: Could not get the current branch name.")}}var Pe,Zt=k(()=>{"use strict";Pe=b(require("vscode"));$()});async function Kt(){let t=v();if(!t){q.window.showErrorMessage("Ricwiz: Open a folder or workspace that is a Git repository.");return}let e=q.workspace.getConfiguration("ricwiz"),i=e.get("ticketSourceBranch","main"),r=e.get("packageXmlCommand",'sf sgd source delta --to "HEAD" --from "origin/{baseBranch}" --output-dir "."').replace("{baseBranch}",i);await q.window.showWarningMessage("Are you sure you want to generate the package.xml? This may overwrite existing local manifest files.",{modal:!0},"Yes, Generate")==="Yes, Generate"&&await q.window.withProgress({location:q.ProgressLocation.Notification,title:"Ricwiz: Generating package.xml using Salesforce CLI...",cancellable:!1},async()=>{try{await p(r,{cwd:t,maxBuffer:10*1024*1024}),q.window.showInformationMessage("Ricwiz: Successfully generated package.xml!");let n=qe.join(t,"package","package.xml"),f=qe.join(t,"package.xml"),u=qe.join(t,"manifest","package.xml");for(let l of[n,f,u])if(Xt.existsSync(l)){let o=await q.workspace.openTextDocument(l);await q.window.showTextDocument(o);break}}catch(n){q.window.showErrorMessage(`Ricwiz: Error running sf command - ${n.message}`)}})}var q,qe,Xt,eo=k(()=>{"use strict";q=b(require("vscode")),qe=b(require("path")),Xt=b(require("fs"));$()});async function to(){let t=v();if(!t){H.window.showErrorMessage("Ricwiz: Open a folder or workspace that is a Git repository.");return}let i=H.workspace.getConfiguration("ricwiz").get("deployCommand","sf project deploy start --manifest package/package.xml --post-destructive-changes destructiveChanges/destructiveChanges.xml -c -l NoTestRun -g");await H.window.showWarningMessage("Are you sure you want to deploy to Salesforce? This action modifies your org and cannot be easily undone.",{modal:!0},"Yes, Deploy")==="Yes, Deploy"&&await H.window.withProgress({location:H.ProgressLocation.Notification,title:"Ricwiz: Deploying package...",cancellable:!1},async()=>{try{let{stdout:r,stderr:d}=await p(i,{cwd:t,maxBuffer:52428800}),n=H.window.createOutputChannel("Ricwiz Deploy");n.appendLine(`Executing: ${i}`),n.appendLine(r),d&&(n.appendLine("--- STDERR ---"),n.appendLine(d)),n.show(),H.window.showInformationMessage("Ricwiz: Successfully ran deploy command!")}catch(r){let d=H.window.createOutputChannel("Ricwiz Deploy");d.appendLine(`Error executing: ${i}`),r.stdout&&d.appendLine(r.stdout),r.stderr&&d.appendLine(r.stderr),d.appendLine(r.message),d.show(),H.window.showErrorMessage("Ricwiz: Error running deploy command. See output channel for details.")}})}var H,oo=k(()=>{"use strict";H=b(require("vscode"));$()});async function io(){let t=v();if(!t){V.window.showErrorMessage("Ricwiz: Open a folder or workspace that is a Git repository.");return}let i=V.workspace.getConfiguration("ricwiz").get("importDataCommand","sfdx force:data:tree:import --plan data/plan.json");await V.window.showWarningMessage("Are you sure you want to import data into Salesforce? This action modifies records in your org.",{modal:!0},"Yes, Import")==="Yes, Import"&&await V.window.withProgress({location:V.ProgressLocation.Notification,title:"Ricwiz: Importing data...",cancellable:!1},async()=>{try{let{stdout:r,stderr:d}=await p(i,{cwd:t,maxBuffer:52428800}),n=V.window.createOutputChannel("Ricwiz Import Data");n.appendLine(`Executing: ${i}`),n.appendLine(r),d&&(n.appendLine("--- STDERR ---"),n.appendLine(d)),n.show(),V.window.showInformationMessage("Ricwiz: Successfully ran import data command!")}catch(r){let d=V.window.createOutputChannel("Ricwiz Import Data");d.appendLine(`Error executing: ${i}`),r.stdout&&d.appendLine(r.stdout),r.stderr&&d.appendLine(r.stderr),d.appendLine(r.message),d.show(),V.window.showErrorMessage("Ricwiz: Error running import data command. See output channel for details.")}})}var V,so=k(()=>{"use strict";V=b(require("vscode"));$()});async function ro(){let t=v();if(!t){G.window.showErrorMessage("Ricwiz: Open a folder or workspace that is a Git repository.");return}let e="";try{e=await M(t)}catch{}let s=G.workspace.getConfiguration("ricwiz").get("ticketSourceBranch","main"),r=await G.window.showInputBox({prompt:`Enter the branch name to list modified files (compared to ${s})`,value:e,placeHolder:"SFPSCA-1234"});r&&await G.window.withProgress({location:G.ProgressLocation.Notification,title:`Ricwiz: Finding files for ${r}...`,cancellable:!1},async()=>{try{let d=r.replace(/-to-[a-zA-Z0-9]+$/i,""),n=[];try{let g="";try{let{stdout:h}=await p(`git merge-base origin/${s} ${r}`,{cwd:t});g=h.trim()}catch{let{stdout:h}=await p(`git merge-base ${s} ${r}`,{cwd:t});g=h.trim()}if(g){let{stdout:h}=await p(`git diff --name-only ${g} ${r}`,{cwd:t,maxBuffer:10485760});n=h.split(`
`).map(w=>w.trim()).filter(w=>w.length>0)}}catch{}let f=[];try{let{stdout:g}=await p(`git --no-pager log --grep="\\b${d}\\b" -i -E --name-only -m --first-parent --format=""`,{cwd:t,maxBuffer:10485760});f=g.split(`
`).map(h=>h.trim()).filter(h=>h.length>0)}catch{}let u=[...n,...f];if(u.length===0){G.window.showInformationMessage(`Ricwiz: No modified files found for ${r}.`);return}let l=Array.from(new Set(u)).sort(),o={};for(let g of l){let h=g.match(/default\/([^/]+)/),w=h&&h[1]?h[1].toUpperCase():"OUTROS";o[w]||(o[w]=[]),o[w].push(g)}let c=`Files modified in branch ${r}:
`,m=Object.keys(o).sort();for(let g of m)c+=`
=== ${g} ===
`,c+=o[g].join(`
`)+`
`;let a=await G.workspace.openTextDocument({content:c,language:"plaintext"});await G.window.showTextDocument(a)}catch(d){G.window.showErrorMessage(`Ricwiz: Error running git log - ${d.message}`)}})}var G,no=k(()=>{"use strict";G=b(require("vscode"));$()});async function ao(){let t=v();if(!t){X.window.showErrorMessage("Ricwiz: Open a folder or workspace that is a Git repository.");return}let i=X.workspace.getConfiguration("ricwiz").get("resetTrackingCommand","sf org disable tracking && sf project reset tracking --no-prompt");await X.window.withProgress({location:X.ProgressLocation.Notification,title:"Ricwiz: Resetting tracking...",cancellable:!1},async()=>{try{let{stdout:s,stderr:r}=await p(i,{cwd:t,maxBuffer:52428800}),d=X.window.createOutputChannel("Ricwiz Reset Tracking");d.appendLine(`Executing: ${i}`),d.appendLine(s),r&&(d.appendLine("--- STDERR ---"),d.appendLine(r)),d.show(),X.window.showInformationMessage("Ricwiz: Successfully reset tracking!")}catch(s){let r=X.window.createOutputChannel("Ricwiz Reset Tracking");r.appendLine(`Error executing: ${i}`),s.stdout&&r.appendLine(s.stdout),s.stderr&&r.appendLine(s.stderr),r.appendLine(s.message),r.show(),X.window.showErrorMessage("Ricwiz: Error resetting tracking. See output channel for details.")}})}var X,co=k(()=>{"use strict";X=b(require("vscode"));$()});async function lo(){let t=v();if(!t){Q.window.showErrorMessage("Ricwiz: Open a workspace first.");return}let e=["ApexClass","ApexTrigger","CustomObject","CustomField","LightningComponentBundle","AuraDefinitionBundle","Flow","CustomLabel","CustomMetadata","StaticResource","Profile","PermissionSet","PermissionSetGroup","Layout","ValidationRule","RecordType","ListView","Report","EmailTemplate","Other (Type manually)..."],i=await Q.window.showQuickPick(e,{placeHolder:"Select Metadata Type to extract (e.g., ApexClass)",ignoreFocusOut:!0});if(!i||i==="Other (Type manually)..."&&(i=await Q.window.showInputBox({prompt:"Enter Metadata Type (e.g., CustomApplication, Queue)",ignoreFocusOut:!0}),!i))return;let s={ApexClass:"**/*.cls",ApexTrigger:"**/*.trigger",CustomObject:"**/*.{object,object-meta.xml}",CustomField:"**/*.field-meta.xml",LightningComponentBundle:"**/lwc/*/*.js",AuraDefinitionBundle:"**/aura/*/*.cmp",Flow:"**/*.flow-meta.xml",CustomLabel:"**/*.labels-meta.xml",CustomMetadata:"**/*.md-meta.xml",StaticResource:"**/*.resource-meta.xml",Profile:"**/*.profile-meta.xml",PermissionSet:"**/*.permissionset-meta.xml",PermissionSetGroup:"**/*.permissionsetgroup-meta.xml",Layout:"**/*.layout-meta.xml",ValidationRule:"**/*.validationRule-meta.xml",RecordType:"**/*.recordType-meta.xml",ListView:"**/*.listView-meta.xml"},r=[],d=s[i];if(d)try{r=(await Q.workspace.findFiles(d,"**/node_modules/**")).map(u=>{let l=u.fsPath.split(/[\\/]/).pop()||"";if(i==="LightningComponentBundle"||i==="AuraDefinitionBundle"){let o=u.fsPath.split(/[\\/]/);return o[o.length-2]||l.split(".")[0]}return l.split(".")[0]}),r=[...new Set(r)].sort()}catch{}let n=await new Promise(f=>{let u=Q.window.createQuickPick();u.title=`Extract ${i}`,u.placeholder="Type name (e.g. MyComponent) or * for all",u.ignoreFocusOut=!0,u.matchOnDescription=!0;let l=()=>{let o=u.value.trim(),c=[];o?c.push({label:`$(cloud-download) Extract "${o}"`,description:"Extract exact name from Salesforce",alwaysShow:!0}):c.push({label:'$(cloud-download) Extract "*" (All)',description:`Extract all ${i}s`,alwaysShow:!0}),r.forEach(m=>{(!o||m.toLowerCase().includes(o.toLowerCase()))&&c.push({label:m,description:"Local workspace component"})}),u.items=c};u.onDidChangeValue(()=>l()),u.onDidAccept(()=>{let o=u.selectedItems[0];if(o){let c=o.label;c.startsWith('$(cloud-download) Extract "')?c=c.replace('$(cloud-download) Extract "',"").replace('" (All)',"").replace('"',""):c==='$(cloud-download) Extract "*" (All)'&&(c="*"),u.hide(),f(c)}}),u.onDidHide(()=>{u.dispose(),f(void 0)}),l(),u.show()});n&&await Q.window.withProgress({location:Q.ProgressLocation.Notification,title:`Ricwiz: Extracting ${i}:${n} from Salesforce...`,cancellable:!0},async(f,u)=>{try{T.show(!0);let l=`${i}:${n}`,{stdout:o,stderr:c}=await p(`sf project retrieve start -m "${l}"`,{cwd:t});o&&T.appendLine(o),c&&T.appendLine(c),Q.window.showInformationMessage(`Ricwiz: Successfully extracted ${l}.`)}catch(l){T.appendLine(`ERROR: ${l.message}`),l.stdout&&T.appendLine(l.stdout),l.stderr&&T.appendLine(l.stderr),Q.window.showErrorMessage("Ricwiz: Extraction failed. See Output channel for details.")}})}var Q,mo=k(()=>{"use strict";Q=b(require("vscode"));$()});async function po(){let t=O.window.activeTextEditor;if(!t){O.window.showErrorMessage("Ricwiz: Please open the file you want to deploy in the editor first.");return}let e=t.document.uri.fsPath,i=v();if(!i)return;let s="";if(await O.window.withProgress({location:O.ProgressLocation.Notification,title:"Ricwiz: Fetching available Salesforce orgs...",cancellable:!1},async()=>{try{let{stdout:u}=await p("sf org list --json",{cwd:i});s=u}catch(u){s=u.stdout||""}}),!s){O.window.showErrorMessage("Ricwiz: Failed to fetch orgs. Is Salesforce CLI installed?");return}let r=[];try{let u=JSON.parse(s),l=u.result?.nonScratchOrgs||[],o=u.result?.scratchOrgs||[];r=[...l,...o]}catch{O.window.showErrorMessage("Ricwiz: Failed to parse org list.");return}if(r.length===0){O.window.showInformationMessage("Ricwiz: No authenticated orgs found.");return}let d=r.map(u=>({label:u.alias||u.username,description:u.alias?u.username:"",picked:u.isDefaultUsername})),n=await O.window.showQuickPick(d,{placeHolder:"Select the org(s) to deploy this file to",canPickMany:!0,ignoreFocusOut:!0});if(!n||n.length===0)return;let f=uo.basename(e);await O.window.withProgress({location:O.ProgressLocation.Notification,title:`Ricwiz: Deploying ${f} to ${n.length} org(s)...`,cancellable:!1},async()=>{T.show(!0),T.appendLine(`--- Starting Parallel Deploy of ${f} ---`);let u=n.map(async m=>{let a=m.label;T.appendLine(`[${a}] Deploying...`);try{let{stdout:g,stderr:h}=await p(`sf project deploy start -d "${e}" -o "${a}"`,{cwd:i});return T.appendLine(`[${a}] \u2705 Success`),g&&T.appendLine(g),{org:a,success:!0}}catch(g){return T.appendLine(`[${a}] \u274C Failed`),g.stdout&&T.appendLine(g.stdout),g.stderr&&T.appendLine(g.stderr),{org:a,success:!1}}}),l=await Promise.all(u),o=l.filter(m=>m.success).length,c=l.filter(m=>!m.success).length;c===0?O.window.showInformationMessage(`Ricwiz: Successfully deployed to all ${o} orgs!`):O.window.showErrorMessage(`Ricwiz: Deploy finished with errors (${o} success, ${c} failed). Check Output channel.`)})}var O,uo,go=k(()=>{"use strict";O=b(require("vscode")),uo=b(require("path"));$()});async function fo(){let t=v();if(!t){E.window.showErrorMessage("Ricwiz: Open a folder or workspace that is a Git repository.");return}let e=E.workspace.getConfiguration("ricwiz"),i=e.get("auditUsername",""),s=e.get("auditHours",8),r=await E.window.showInputBox({prompt:"Enter your Salesforce Username to query in SetupAuditTrail",value:i,placeHolder:"admin@tuaorg.com"});if(!r)return;let d=await E.window.showInputBox({prompt:"How many hours back do you want to search?",value:s.toString(),placeHolder:"8"});if(!d)return;let n=parseFloat(d);if(isNaN(n)||n<=0){E.window.showErrorMessage("Ricwiz: Invalid hours specified.");return}let f=new Date(Date.now()-n*60*60*1e3).toISOString(),l=`sf data query -q "${`SELECT Action, Display, Section FROM SetupAuditTrail WHERE CreatedBy.Username = '${r}' AND CreatedDate >= ${f}`}" --json`;await E.window.withProgress({location:E.ProgressLocation.Notification,title:"Ricwiz: Interrogating Setup Audit Trail...",cancellable:!1},async()=>{try{let{stdout:o}=await p(l,{cwd:t,maxBuffer:52428800}),c=JSON.parse(o);if(!c.result||c.result.records.length===0){E.window.showInformationMessage(`Ricwiz: No changes found for ${r} in the last ${n} hours.`);return}let m=c.result.records,a=[],g=new Set;for(let S of m){let L=qo(S.Action,S.Display,S.Section);if(L){let J=`${L.isDelete?"DEL":"ADD"}-${L.metadataFormat}`;if(!g.has(J)){g.add(J);let U=L.isDelete?"$(trash)":"$(plus)";a.push({label:`${U} ${L.metadataFormat}`,description:`${S.Action} -> ${S.Display}`,metadataFormat:L.metadataFormat,isDelete:L.isDelete})}}}if(a.length===0){E.window.showInformationMessage(`Ricwiz: No extractable metadata changes found for ${r} in the last ${n} hours (ignored passwords/logins).`);return}let h=await E.window.showQuickPick(a,{canPickMany:!0,placeHolder:"Select the changes you want to extract to GitLab",ignoreFocusOut:!0});if(!h||h.length===0){E.window.showInformationMessage("Ricwiz: No changes selected.");return}let w=h.filter(S=>S.isDelete),R=h.filter(S=>!S.isDelete),P=E.window.createOutputChannel("Ricwiz Admin Bridge");if(P.show(),w.length>0){let{stdout:S}=await p("git ls-files",{cwd:t}),L=S.split(`
`).map(U=>U.trim()),J=0;for(let U of w){let De=U.metadataFormat.split(":"),Te=De[0],Ce=De[1],Me=Ce;Te==="CustomField"&&(Me=Ce.split(".")[1]);let D=L.filter(W=>{let ce=Ve.basename(W);return ce.startsWith(Me+".")&&ce.includes(Te==="CustomField"?".field":"")});for(let W of D){let ce=Ve.join(t,W);He.existsSync(ce)&&(He.unlinkSync(ce),P.appendLine(`Deleted local file: ${W}`),J++)}}E.window.showInformationMessage(`Ricwiz: Deleted ${J} local files from Git workspace.`)}if(R.length===0)return;let ae=R.map(S=>S.metadataFormat).filter(S=>S!=="").join(", "),ue=await E.window.showInputBox({prompt:"Review and adjust the metadata components to retrieve",value:ae,ignoreFocusOut:!0});if(!ue)return;let pe=`sf project retrieve start -m "${ue}"`;P.appendLine(`Executing: ${pe}`),E.window.showInformationMessage(`Ricwiz: Extracting ${R.length} components...`);let K=await p(pe,{cwd:t});P.appendLine(K.stdout),K.stderr&&(P.appendLine("--- STDERR ---"),P.appendLine(K.stderr)),E.window.showInformationMessage("Ricwiz: Changes extracted successfully! Ready for Git Commit.")}catch(o){E.window.showErrorMessage(`Ricwiz: Error capturing changes - ${o.message}`)}})}function qo(t,e,i){if(!t||!e||!i)return null;let s=t.toLowerCase(),r=i.toLowerCase();if(["security controls","network access","session settings","data export","login history","password policies","identity verification","delegated administration"].includes(r)||s.includes("login")||s.includes("password")||s.includes("oauth")||s.includes("session"))return null;let n=s.includes("delete"),f=null;if(s==="permissionsetgroupcomponentadd"||s==="permissionsetgroupcomponentdelete")return null;let u=(l,o=!1)=>{let c=l.replace(/\(.*\)/g,"").trim();c.includes(":")&&!s.includes("calculation")&&(c=c.split(":")[0]);let m=["disabled","deleted","removed","created","changed","updated","from","to","on","assigned","assign","assignment","permission","set","group","apex","class","trigger","custom","field","object","layout","validation","rule","flow","profile"],a=c.split(/\s+/);if(o){for(;a.length>0&&m.includes(a[a.length-1].toLowerCase());)a.pop();for(;a.length>0&&m.includes(a[0].toLowerCase());)a.shift();return a.join(" ").trim().replace(/[^a-zA-Z0-9_ ]/g,"")}else return a.filter(w=>!m.includes(w.toLowerCase())).join("_").replace(/[^a-zA-Z0-9_]/g,"")||c.replace(/\s+/g,"")};if(s.includes("profile"))f=`Profile:${u(e,!0)}`;else if(s.includes("permissionsetgroupcalculation")){let l=e.split(":");f=`PermissionSetGroup:${l.length>1?l[l.length-1].trim():u(e,!1)}`}else if(s.includes("permission set group")||s.includes("permissionsetgroup"))f=`PermissionSetGroup:${u(e,!1)}`;else if(s.includes("permission set")||s.includes("permissionset"))f=`PermissionSet:${u(e,!1)}`;else if(s.includes("apexclass"))f=`ApexClass:${u(e,!1)}`;else if(s.includes("apextrigger")||s.includes("apex trigger"))f=`ApexTrigger:${u(e,!1)}`;else if(s.includes("customfield")){let l=e.match(/([A-Za-z0-9_]+__c)/),o=e.match(/(?:on|na|for)\s+([A-Za-z0-9_]+)/i);l&&o?f=`CustomField:${o[1]}.${l[1]}`:f=`CustomField:${u(e,!1)}`}else if(s.includes("layout"))f=`Layout:${u(e,!0)}`;else if(s.includes("validation"))f=`ValidationRule:${u(e,!1)}`;else if(s.includes("flow"))f=`Flow:${u(e,!1)}`;else if(s.includes("customobject")){let l=e.match(/([A-Za-z0-9_]+__c)/);f=l?`CustomObject:${l[1]}`:`CustomObject:${u(e,!1)}`}else if(!s.includes("created")&&!s.includes("changed")&&!s.includes("deleted"))return null;return f?{metadataFormat:f,isDelete:n}:null}var E,He,Ve,ho=k(()=>{"use strict";E=b(require("vscode")),He=b(require("fs")),Ve=b(require("path"));$()});async function wo(){let t=v();if(t)try{let{stdout:e}=await p('git for-each-ref --sort=-committerdate --format="%(refname:short)|||%(committerdate:relative)|||%(subject)" refs/heads/',{cwd:t}),i=e.split(`
`).filter(r=>r.trim()).map(r=>{let d=r.split("|||");return{label:`$(git-branch) ${d[0]}`,description:d[1],detail:d[2],branchName:d[0]}}),s=await Qe.window.showQuickPick(i,{placeHolder:"Select a branch from history to checkout",matchOnDescription:!0,matchOnDetail:!0});s&&await ke(s.branchName)}catch{Qe.window.showErrorMessage("Ricwiz: Failed to get branch history")}}var Qe,vo=k(()=>{"use strict";Qe=b(require("vscode"));$();We()});async function bo(){let t=v();if(!t)return;let e=await Se.window.showInputBox({prompt:"Enter ticket number or name (e.g., 48934)",placeHolder:"48934"});if(e)try{let{stdout:i}=await p(`git branch --list "*${e}*"`,{cwd:t}),s=i.split(`
`).map(n=>n.replace("*","").trim()).filter(n=>n);if(s.length===0){Se.window.showInformationMessage(`Ricwiz: No branches found matching "${e}"`);return}let r=s.map(n=>({label:`$(git-branch) ${n}`,branchName:n})),d=await Se.window.showQuickPick(r,{placeHolder:`Select a branch for ${e}`});d&&await ke(d.branchName)}catch{Se.window.showErrorMessage("Ricwiz: Failed to search branches")}}var Se,yo=k(()=>{"use strict";Se=b(require("vscode"));$();We()});async function ko(){let t=ve.window.activeTextEditor;if(!t)return ve.window.showErrorMessage("Ricwiz: Please open a file in the editor to check blame."),null;let e=t.document.fileName,i=xo.basename(e),s=v();if(!s)return ve.window.showErrorMessage("Ricwiz: Workspace is not a git repository."),null;let r=[];try{let{stdout:o}=await p(`git log -5 --pretty=format:"%an|%ar|%s|%h" -- "${e}"`,{cwd:s}),c=o.trim().split(`
`);for(let m of c){let a=m.split("|");a.length>=4&&r.push({author:a[0],time:a[1],message:a.slice(2,-1).join("|"),hash:a[a.length-1]})}}catch(o){console.error("Git blame error:",o)}let d="Unknown",n="Unknown",f="Unknown",u=[],l=Ho(e);if(l)try{await ve.window.withProgress({location:ve.ProgressLocation.Notification,title:`Ricwiz: Analyzing ${l.name} in Salesforce...`,cancellable:!1},async()=>{let o="";if(l.type==="CustomField"){let c=l.name.split(".");c.length===2&&(o=`SELECT LastModifiedBy.Name, LastModifiedDate, CreatedBy.Name FROM CustomField WHERE DeveloperName = '${c[1].replace("__c","")}' AND TableEnumOrId = '${c[0]}'`)}else l.type==="LightningComponentBundle"?o=`SELECT LastModifiedBy.Name, LastModifiedDate, CreatedBy.Name FROM LightningComponentBundle WHERE DeveloperName = '${l.name}'`:o=`SELECT LastModifiedBy.Name, LastModifiedDate, CreatedBy.Name FROM ${l.type} WHERE Name = '${l.name}'`;if(o)try{let{stdout:c}=await p(`sf data query -t -q "${o}" --json`,{cwd:s,maxBuffer:52428800}),m=JSON.parse(c);if(m&&m.result&&m.result.records&&m.result.records.length>0){let a=m.result.records[0];d=a.LastModifiedBy?a.LastModifiedBy.Name:"Unknown",f=a.CreatedBy?a.CreatedBy.Name:"Unknown",n=new Date(a.LastModifiedDate).toLocaleString()}else d="Not found in Org",n="N/A",f="N/A"}catch{d="Query Error",n="N/A",f="N/A"}try{let c="SELECT Action, Display, CreatedBy.Name, CreatedDate FROM SetupAuditTrail ORDER BY CreatedDate DESC LIMIT 1500",{stdout:m}=await p(`sf data query -q "${c}" --json`,{cwd:s,maxBuffer:52428800}),a=JSON.parse(m);if(a&&a.result&&a.result.records){let g=l.name.replace("__c","");u=a.result.records.filter(w=>w.Display&&w.Display.includes(g)).map(w=>({action:w.Action,display:w.Display,author:w.CreatedBy?w.CreatedBy.Name:"Unknown",time:new Date(w.CreatedDate).toLocaleString()})).slice(0,10)}}catch(c){console.error("Audit trail query error:",c)}})}catch(o){console.error("Salesforce query error:",o)}else d="Unsupported Metadata Type",n="N/A";return{fileName:i,gitHistory:r,sfAuthor:d,sfTime:n,sfCreatedBy:f,auditHistory:u}}function Ho(t){let e=t.replace(/\\/g,"/");if(e.includes("/classes/")){let i=e.match(/\/classes\/([^/.]+)\.cls/);if(i)return{type:"ApexClass",name:i[1]}}if(e.includes("/triggers/")){let i=e.match(/\/triggers\/([^/.]+)\.trigger/);if(i)return{type:"ApexTrigger",name:i[1]}}if(e.includes("/lwc/")){let i=e.match(/\/lwc\/([^/]+)\//);if(i)return{type:"LightningComponentBundle",name:i[1]}}if(e.includes("/aura/")){let i=e.match(/\/aura\/([^/]+)\//);if(i)return{type:"AuraDefinitionBundle",name:i[1]}}if(e.includes("/objects/")&&e.includes("/fields/")){let i=e.match(/\/objects\/([^/]+)\//),s=e.match(/\/fields\/([^/.]+)\.field/);if(i&&s)return{type:"CustomField",name:`${i[1]}.${s[1]}`}}return null}var ve,xo,Co=k(()=>{"use strict";ve=b(require("vscode")),xo=b(require("path"));$()});function $o(t,e,i){t.subscriptions.push(x.commands.registerCommand("ricwiz.generateDestructiveChanges",at),x.commands.registerCommand("ricwiz.runSmartTests",dt),x.commands.registerCommand("ricwiz.refreshWebview",()=>{e&&x.commands.executeCommand("workbench.action.webview.reloadWebviewAction")}),x.commands.registerCommand("ricwiz.createBranches",pt),x.commands.registerCommand("ricwiz.prepareDeploy",wt),x.commands.registerCommand("ricwiz.createMergeRequests",yt),x.commands.registerCommand("ricwiz.createMergeRequestsVSCode",xt),x.commands.registerCommand("ricwiz.openJiraTicket",$t),x.commands.registerCommand("ricwiz.openJiraTicketVSCode",zt),x.commands.registerCommand("ricwiz.showJiraDetails",()=>{e&&At(e)}),x.commands.registerCommand("ricwiz.openJiraDashboard",s=>{e&&Lt(e,s)}),x.commands.registerCommand("ricwiz.openJiraDetailsForId",s=>{e&&Ft(e,s)}),x.commands.registerCommand("ricwiz.changeJiraStatus",Nt),x.commands.registerCommand("ricwiz.addJiraComment",jt),x.commands.registerCommand("ricwiz.addJiraLabel",Jt),x.commands.registerCommand("ricwiz.setJiraToken",Ut),x.commands.registerCommand("ricwiz.syncAll",qt),x.commands.registerCommand("ricwiz.updateBases",Vt),x.commands.registerCommand("ricwiz.deleteUnusedBranches",Qt),x.commands.registerCommand("ricwiz.checkoutBranch",ke),x.commands.registerCommand("ricwiz.copyBranchName",_t),x.commands.registerCommand("ricwiz.generatePackageXml",Kt),x.commands.registerCommand("ricwiz.deployPackage",to),x.commands.registerCommand("ricwiz.importData",io),x.commands.registerCommand("ricwiz.listTicketFiles",ro),x.commands.registerCommand("ricwiz.resetTracking",ao),x.commands.registerCommand("ricwiz.extractComponent",lo),x.commands.registerCommand("ricwiz.deployMultiOrg",po),x.commands.registerCommand("ricwiz.captureAdminChanges",fo),x.commands.registerCommand("ricwiz.openHistory",wo),x.commands.registerCommand("ricwiz.searchTicket",bo),x.commands.registerCommand("ricwiz.whoToBlame",async()=>{let s=await ko();s&&e&&(e.setBlameData(s),e.setPage("blame"))}),x.commands.registerCommand("ricwiz.manualRefresh",()=>{i&&i()}),x.commands.registerCommand("ricwiz.toggleAutoRefresh",()=>{if(e){let s=!e.isAutoRefreshEnabled();e.setAutoRefresh(s),x.workspace.getConfiguration("ricwiz").update("autoRefresh",s,x.ConfigurationTarget.Global)}}),x.commands.registerCommand("ricwiz.openSettings",()=>{x.commands.executeCommand("workbench.action.openSettings","ricwiz")}))}var x,zo=k(()=>{"use strict";x=b(require("vscode"));ct();lt();gt();vt();kt();Rt();It();Ot();Wt();Ht();Gt();Yt();We();Zt();eo();oo();so();no();co();mo();go();ho();vo();yo();Co()});function Ro(){let t=new Map;function e(s,r){let d=r,n=t.get(d);if(n)return n;let f=(async()=>{try{let{stdout:u}=await p(`git rev-parse origin/${r}`,{cwd:s});return u.trim()}catch{let{stdout:u}=await p(`git rev-parse ${r}`,{cwd:s});return u.trim()}})();return t.set(d,f),f}function i(s,r){let d=`branch:${r}`,n=t.get(d);if(n)return n;let f=(async()=>{let{stdout:u}=await p(`git rev-parse ${r}`,{cwd:s});return u.trim()})();return t.set(d,f),f}return{resolveEnvRef:e,resolveBranchRef:i}}async function Po(t,e,i,s,r){try{if(!(await p(`git --no-pager log ${e} --grep="\\\\b${i}\\\\b" -i -E -1 --format="%h"`,{cwd:t}).catch(()=>({stdout:"",stderr:""}))).stdout.trim())return!1;let[n,f]=await Promise.all([r.resolveBranchRef(t,e),r.resolveEnvRef(t,s.sourceBranch)]);if(n===f)return!1;try{return await p(`git merge-base --is-ancestor ${e} origin/${s.sourceBranch}`,{cwd:t}),!0}catch{try{return await p(`git merge-base --is-ancestor ${e} ${s.sourceBranch}`,{cwd:t}),!0}catch{return!1}}}catch{return!1}}function So(t,e){return e.find(i=>t.endsWith(`-to-${i.name}`))}async function Bo(t,e,i,s){let r=Ro();return await Promise.all(e.map(async n=>{let f=So(n,s);if(!f)return{name:n,isMerged:!1};let u=await Po(t,n,i,f,r);return{name:n,isMerged:u}}))}async function Eo(t,e,i){let s=So(e,i);if(!s)return!1;let r=e.replace(new RegExp(`-to-${s.name}$`,"i"),""),d=Ro();return Po(t,e,r,s,d)}async function Do(t,e=10){try{let{stdout:i}=await p(`git log --oneline -${e} --format="%h|||%s|||%ar"`,{cwd:t});return i.split(`
`).filter(s=>s.trim()).map(s=>{let r=s.split("|||");return{hash:r[0]||"",message:r.length>=3?r.slice(1,-1).join("|||"):r[1]||"",timeAgo:r.length>=3?r[r.length-1]:""}})}catch{return[]}}async function To(t,e=3){try{let{stdout:i}=await p('git for-each-ref --sort=-committerdate --format="%(refname:short)" refs/heads/',{cwd:t}),s=i.split(`
`).map(d=>d.trim()).filter(d=>d),r=/^[A-Z]+-\d+$/i;return s.filter(d=>r.test(d)).slice(0,e)}catch{return[]}}async function Mo(t,e,i){let{stdout:s}=await p(`git branch --list "*${e}*"`,{cwd:t});return s.split(`
`).map(r=>r.replace("*","").trim()).filter(r=>r&&r!==i)}var Ao=k(()=>{"use strict";$()});function Io(t,e,i){let s,r=ie.workspace.getConfiguration("ricwiz").get("autoRefresh",!0);e?.setAutoRefresh(r),t.subscriptions.push(ie.workspace.onDidChangeConfiguration(n=>{if(n.affectsConfiguration("ricwiz.autoRefresh")){let f=ie.workspace.getConfiguration("ricwiz").get("autoRefresh",!0);e?.setAutoRefresh(f)}}));async function d(){let n=ie.extensions.getExtension("vscode.git");if(n){let l=function(o){let c="",m;async function a(){let h=ie.workspace.workspaceFolders;if(!h)return;let w=h[0].uri.fsPath,R=await M(w);if(R&&R!==c){c=R;let P=ie.workspace.getConfiguration("ricwiz"),ae=P.get("ticketPrefix","SFPSCA-");if(!R.includes(ae)){let D=R.match(/([A-Z]+-)\d+/i);D&&(ae=D[1].toUpperCase())}let ue=[],pe=[],K=[],S=[],L=P.get("environments",[{name:"Qual",sourceBranch:"quality"},{name:"Val",sourceBranch:"validation"},{name:"Prod",sourceBranch:"main"}]);try{let D=P.get("workspaceCheckoutButtons",["main","quality","validation"]);K=Array.from(new Set(D))}catch{}let J="",U=R.match(new RegExp(`(${ae}\\d+(?:-\\d+)?)`,"i"));if(U){let D=U[1].toUpperCase();J=D;let W=P.get("commitMessageSuffix","- "),ce=/^[A-Z]+-\d+(?:-\d+)?\s*(?:-\s*|:\s*|\s+)?/i;ce.test(o.inputBox.value)?o.inputBox.value.toUpperCase().startsWith(D)||(o.inputBox.value=o.inputBox.value.replace(ce,`${D}${W}`)):o.inputBox.value=`${D}${W}`+o.inputBox.value,i.text=`$(bookmark) ${D}`,i.tooltip=`Branch: ${R}
Click to open Jira ticket`,i.show();try{let Ye=await Mo(w,D,R);ue=await Bo(w,Ye,D,L)}catch{}}else{i.hide();try{S=await To(w)}catch{}}let[De,Te,Ce]=await Promise.all([Do(w,10),Eo(w,R,L),J?xe(J).catch(D=>{let W=D.message;return(W.includes("ENOTFOUND")||W.includes("network"))&&(W="No Internet or Invalid URL"),{summary:`\u26A0\uFE0F Jira Error: ${W}`,description:""}}):Promise.resolve(null)]);pe=De;let Me=Ce?Ce.summary:"";e?.updateBranch(R,Te,ue,pe,K,S,Me)}}function g(){e?.isAutoRefreshEnabled()&&(m&&clearTimeout(m),m=setTimeout(()=>{c="",a()},300))}s=()=>{c="",a()},a(),o.state.onDidChange(()=>g()),ie.window.onDidChangeWindowState(h=>{h.focused&&g()})};var f=l;n.isActive||await n.activate();let u=n.exports.getAPI(1);u.repositories.length>0&&u.repositories.forEach(o=>l(o)),u.onDidOpenRepository(o=>l(o))}}return d(),s}var ie,Lo=k(()=>{"use strict";ie=b(require("vscode"));$();Ao();Re()});var je={};_e(je,{activate:()=>Vo,deactivate:()=>Go,webviewProvider:()=>Be});module.exports=ge(je);function Vo(t){Ke(t),Be=new Ie(t.extensionUri),t.subscriptions.push(Ee.window.registerWebviewViewProvider("ricwiz-webview",Be));let e=Ee.window.createStatusBarItem(Ee.StatusBarAlignment.Left,100);e.command="ricwiz.openJiraTicket",t.subscriptions.push(e);let i=Io(t,Be,e);$o(t,Be,i)}function Go(){}var Ee,Be,Je=k(()=>{Ee=b(require("vscode"));Xe();Le();zo();Lo()});Je();0&&(module.exports={activate,deactivate,webviewProvider});
