"use strict";var Fo=Object.create;var Ae=Object.defineProperty;var Oo=Object.getOwnPropertyDescriptor;var No=Object.getOwnPropertyNames;var jo=Object.getPrototypeOf,Jo=Object.prototype.hasOwnProperty;var k=(t,e,i)=>()=>{if(i)throw i[0];try{return t&&(e=t(t=0)),e}catch(s){throw i=[s],s}};var _e=(t,e)=>{for(var i in e)Ae(t,i,{get:e[i],enumerable:!0})},Ze=(t,e,i,s)=>{if(e&&typeof e=="object"||typeof e=="function")for(let r of No(e))!Jo.call(t,r)&&r!==i&&Ae(t,r,{get:()=>e[r],enumerable:!(s=Oo(e,r))||s.enumerable});return t};var y=(t,e,i)=>(i=t!=null?Fo(jo(t)):{},Ze(e||!t||!t.__esModule?Ae(i,"default",{value:t,enumerable:!0}):i,t)),ge=t=>Ze(Ae({},"__esModule",{value:!0}),t);function z(t){return t.replace(/&/g,"&amp;").replace(/</g,"&lt;").replace(/>/g,"&gt;").replace(/"/g,"&quot;").replace(/'/g,"&#39;")}var b,Ie,Xe=k(()=>{"use strict";b=y(require("vscode"));Ie=class{constructor(e){this._extensionUri=e}_extensionUri;webviewView;resolveWebviewView(e,i,s){this.webviewView=e,e.webview.options={enableScripts:!0,localResourceRoots:[this._extensionUri]},this.updateBranch("",!1),e.webview.onDidReceiveMessage(r=>{switch(r.command){case"createBranches":b.commands.executeCommand("ricwiz.createBranches");break;case"prepareDeploy":b.commands.executeCommand("ricwiz.prepareDeploy");break;case"openMRs":b.commands.executeCommand("ricwiz.createMergeRequests");break;case"openMRsVSCode":b.commands.executeCommand("ricwiz.createMergeRequestsVSCode");break;case"openJira":b.commands.executeCommand("ricwiz.openJiraTicket");break;case"showJiraDetails":b.commands.executeCommand("ricwiz.showJiraDetails");break;case"changeJiraStatus":b.commands.executeCommand("ricwiz.changeJiraStatus");break;case"addJiraComment":b.commands.executeCommand("ricwiz.addJiraComment");break;case"addJiraLabel":b.commands.executeCommand("ricwiz.addJiraLabel");break;case"setPage":this.setPage(r.args);break;case"openDashboard":b.commands.executeCommand("ricwiz.openJiraDashboard");break;case"openJiraDetailsForId":b.commands.executeCommand("ricwiz.openJiraDetailsForId",r.args);break;case"refreshDashboard":b.commands.executeCommand("ricwiz.openJiraDashboard");break;case"switchDashboardQuery":b.commands.executeCommand("ricwiz.openJiraDashboard",parseInt(r.args));break;case"openJiraVSCode":b.commands.executeCommand("ricwiz.openJiraTicketVSCode");break;case"openSettings":b.commands.executeCommand("ricwiz.openSettings");break;case"checkout":r.branch&&b.commands.executeCommand("ricwiz.checkoutBranch",r.branch);break;case"copyBranch":b.commands.executeCommand("ricwiz.copyBranchName");break;case"generatePackageXml":b.commands.executeCommand("ricwiz.generatePackageXml");break;case"openDevTools":this.setPage("devtools");break;case"openMain":this.setPage("main");break;case"generateDestructiveChanges":b.commands.executeCommand("ricwiz.generateDestructiveChanges");break;case"deployPackage":b.commands.executeCommand("ricwiz.deployPackage");break;case"runSmartTests":b.commands.executeCommand("ricwiz.runSmartTests");break;case"importData":b.commands.executeCommand("ricwiz.importData");break;case"listTicketFiles":b.commands.executeCommand("ricwiz.listTicketFiles");break;case"resetTracking":b.commands.executeCommand("ricwiz.resetTracking");break;case"extractComponent":b.commands.executeCommand("ricwiz.extractComponent");break;case"deployMultiOrg":b.commands.executeCommand("ricwiz.deployMultiOrg");break;case"captureAdminChanges":b.commands.executeCommand("ricwiz.captureAdminChanges");break;case"whoToBlame":b.commands.executeCommand("ricwiz.whoToBlame");break;case"syncAll":b.commands.executeCommand("ricwiz.syncAll");break;case"updateBases":b.commands.executeCommand("ricwiz.updateBases");break;case"deleteUnused":b.commands.executeCommand("ricwiz.deleteUnusedBranches");break;case"conflict_commitAndContinue":b.commands.executeCommand("ricwiz.conflictAction","commitAndContinue");break;case"conflict_resolveDeletions":b.commands.executeCommand("ricwiz.conflictAction","resolveDeletions");break;case"conflict_abortDeploy":b.commands.executeCommand("ricwiz.conflictAction","abortDeploy");break;case"openFile":if(r.file){let m=b.workspace.workspaceFolders;if(m){let a=b.Uri.joinPath(m[0].uri,r.file);b.commands.executeCommand("vscode.open",a)}}break;case"searchTicket":b.commands.executeCommand("ricwiz.searchTicket");break;case"manualRefresh":b.commands.executeCommand("ricwiz.manualRefresh");break;case"toggleAutoRefresh":b.commands.executeCommand("ricwiz.toggleAutoRefresh");break;case"openHistory":b.commands.executeCommand("ricwiz.openHistory");break}})}conflictState=null;setConflictState(e){this.conflictState=e,this.updateView()}updateBranch(e,i,s=[],r=[],m=[],a=[],f=""){this.webviewView&&(this.currentBranchCache=e,this.currentBranchIsMergedCache=i,this.relatedBranchesCache=s,this.commitsCache=r,this.baseBranchesCache=m,this.recentTicketsCache=a,this.ticketTitleCache=f,this.updateView())}currentBranchCache="";currentBranchIsMergedCache=!1;relatedBranchesCache=[];commitsCache=[];baseBranchesCache=[];recentTicketsCache=[];ticketTitleCache="";currentPage="main";blameDataCache=null;jiraDataCache=null;dashboardDataCache=null;autoRefreshEnabled=!0;setBlameData(e){this.blameDataCache=e}setJiraData(e){this.jiraDataCache=e}setDashboardData(e){this.dashboardDataCache=e}setAutoRefresh(e){this.autoRefreshEnabled=e,this.updateView()}isAutoRefreshEnabled(){return this.autoRefreshEnabled}setPage(e){this.currentPage=e,this.updateView()}updateView(){if(!this.webviewView)return;let e=this.webviewView.webview.asWebviewUri(b.Uri.joinPath(this._extensionUri,"resources","logo.png"));this.webviewView.webview.html=this._getHtmlForWebview(e,this.currentBranchCache,this.relatedBranchesCache,this.commitsCache,this.baseBranchesCache,this.recentTicketsCache,this.currentPage)}_getHtmlForWebview(e,i,s,r,m,a,f){let u=r.length>0?`
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
        `;if(this.conflictState){let o=(this.conflictState.files||[]).map(n=>`
                <button class="btn" style="padding: 6px; font-size: 12px; display: flex; justify-content: space-between; align-items: center;" onclick="sendOpenFileCommand('${z(n.file)}')">
                    <span style="flex: 1; overflow: hidden; text-overflow: ellipsis; white-space: nowrap; direction: rtl; text-align: left;">&lrm;${z(n.file)}</span>
                    <span style="font-size: 10px; opacity: 0.8; flex-shrink: 0; background-color: var(--vscode-badge-background); color: var(--vscode-badge-foreground); padding: 2px 4px; border-radius: 2px;">${z(n.state)}</span>
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
                    function sendCommand(cmd, args) {
                    vscode.postMessage({ command: cmd, args: args });
                }
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
                            ${o.gitHistory&&o.gitHistory.length>0?o.gitHistory.map(n=>`
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
                            ${o.auditHistory&&o.auditHistory.length>0?o.auditHistory.map(n=>`
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
            </html>`}if(f==="jira"){let o=this.jiraDataCache,n=o?.ticketId||"Jira",d=o?.summary||"No Title",c=o?.description||"No description provided.";return`<!DOCTYPE html>
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
                    <div class="jira-title">${z(d)}</div>
                    <div class="jira-desc">${z(c)}</div>
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
            </html>`}if(f==="dashboard"){let o=this.dashboardDataCache||{queries:[],selectedIndex:0,results:[],error:null},n=o.queries.map((c,g)=>`
                <option value="${g}" ${g===o.selectedIndex?"selected":""}>${z(c.name)}</option>
            `).join(""),d=o.error?`
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
                        ${o.results.map(c=>`
                            <tr style="border-bottom: 1px solid var(--vscode-panel-border); cursor: pointer;" class="tr-hover" onclick="sendCommand('openJiraDetailsForId', '${z(c.key)}')">
                                <td style="padding: 6px; font-weight: bold; color: var(--vscode-textLink-foreground); white-space: nowrap;">${z(c.key)}</td>
                                <td style="padding: 6px; overflow: hidden; text-overflow: ellipsis; max-width: 150px; white-space: nowrap;" title="${z(c.summary)}">${z(c.summary)}</td>
                                <td style="padding: 6px; white-space: nowrap;">
                                    <span style="background: var(--vscode-badge-background); color: var(--vscode-badge-foreground); padding: 2px 4px; border-radius: 3px; font-size: 9px;">${z(c.status)}</span>
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
                        ${n}
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
                    `:a.length>0?`
                        <div style="margin-top: 10px; border-top: 1px solid var(--vscode-panel-border); padding-top: 10px;">
                            <div style="font-size: 10px; opacity: 0.7; margin-bottom: 6px; text-transform: uppercase; text-align: center;">Recent Tickets</div>
                            <div style="display: flex; flex-direction: column; gap: 4px;">
                                ${a.map(o=>`
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

            ${m.length>0?`
                <div style="display: flex; gap: 4px; margin-bottom: 16px; flex-wrap: wrap; justify-content: center;">
                    ${m.map(o=>`
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
        </html>`}}});function Ke(t){$e=t.secrets}async function et(t){if(!$e)throw new Error("SecretStorage is not initialized.");await $e.store("ricwiz.jiraApiToken",t)}async function tt(){if(!$e)throw new Error("SecretStorage is not initialized.");return await $e.get("ricwiz.jiraApiToken")}var $e,Le=k(()=>{"use strict"});var Fe={};_e(Fe,{checkBranchExists:()=>de,exec:()=>p,extractTicketSuggestion:()=>rt,getCurrentBranch:()=>T,getWorkspaceCwd:()=>v,normalizeTicketId:()=>nt,promptForTicketId:()=>N,resolvePrefix:()=>st,ricwizLogger:()=>D});function v(){let t=ye.workspace.workspaceFolders;if(t)return t[0].uri.fsPath}async function T(t){try{let{stdout:e}=await p("git branch --show-current",{cwd:t});return e.trim()}catch{return""}}function st(t,e){if(!t.includes(e)){let i=t.match(/([A-Z]+-)\d+/i);if(i)return i[1].toUpperCase()}return e}function rt(t,e,i=!1){let s=t.match(new RegExp(`(${e}\\d+)`,"i"));return s?s[1].toUpperCase():t.includes(e)&&!t.includes("-to-")?t.substring(t.indexOf(e)):i&&t.includes("-to-")?t.substring(t.indexOf(e)).split("-to-")[0]:""}function nt(t,e){let i=t.trim();return/^\d/.test(i)?`${e}${i}`.toUpperCase():i.toUpperCase()}async function N(t,e){let i=ye.workspace.getConfiguration("ricwiz"),s=e?.prefix??i.get("ticketPrefix","SFPSCA-"),r=await T(t),m=st(r,s),a=rt(r,m,e?.handleToSuffix),f=await ye.window.showInputBox({prompt:e?.prompt||"Enter the full ticket ID (e.g., SCPSCA-1234) or just the number",placeHolder:e?.placeHolder||"Ticket ID or number",value:a});return f?{ticketId:nt(f,m),currentBranch:r,prefix:m}:void 0}async function de(t,e){try{return await p(`git show-ref --verify --quiet refs/heads/${e}`,{cwd:t}),!0}catch{}try{return await p(`git show-ref --verify --quiet refs/remotes/origin/${e}`,{cwd:t}),!0}catch{}return!1}var ye,ot,it,Uo,D,p,$=k(()=>{"use strict";ye=y(require("vscode")),ot=y(require("child_process")),it=y(require("util")),Uo=it.promisify(ot.exec),D=ye.window.createOutputChannel("Ricwiz"),p=async(t,e)=>{D.appendLine(`[EXEC] ${t}`);let i=await Uo(t,{maxBuffer:50*1024*1024,...e});return{stdout:i.stdout.toString(),stderr:i.stderr.toString()}}});async function at(){let t=v();if(!t){j.window.showErrorMessage("Ricwiz: Open a workspace that is a Git repository.");return}let i=j.workspace.getConfiguration("ricwiz").get("ticketSourceBranch","main");await j.window.withProgress({location:j.ProgressLocation.Notification,title:`Ricwiz: Finding deleted files compared to origin/${i}...`,cancellable:!1},async()=>{try{let{stdout:s}=await p(`git diff --name-only --diff-filter=D origin/${i}...HEAD`,{cwd:t}),r=s.split(`
`).map(d=>d.trim()).filter(d=>d.length>0);if(r.length===0){j.window.showInformationMessage(`Ricwiz: No deleted files found compared to origin/${i}.`);return}let m={},a=(d,c)=>{m[d]||(m[d]=[]),m[d].includes(c)||m[d].push(c)};for(let d of r){let c=d.replace(/\\/g,"/");if(c.includes("/classes/")){let g=c.match(/\/classes\/([^/.]+)\.cls/);g&&a("ApexClass",g[1])}else if(c.includes("/triggers/")){let g=c.match(/\/triggers\/([^/.]+)\.trigger/);g&&a("ApexTrigger",g[1])}else if(c.includes("/lwc/")){let g=c.match(/\/lwc\/([^/]+)\//);g&&a("LightningComponentBundle",g[1])}else if(c.includes("/aura/")){let g=c.match(/\/aura\/([^/]+)\//);g&&a("AuraDefinitionBundle",g[1])}else if(c.includes("/objects/")&&c.includes("/fields/")){let g=c.match(/\/objects\/([^/]+)\//),h=c.match(/\/fields\/([^/.]+)\.field/);g&&h&&a("CustomField",`${g[1]}.${h[1]}`)}else if(c.includes("/objects/")){let g=c.match(/\/objects\/([^/.]+)\.object/);g&&a("CustomObject",g[1])}else if(c.includes("/layouts/")){let g=c.match(/\/layouts\/([^/.]+)\.layout/);g&&a("Layout",g[1])}else if(c.includes("/flows/")){let g=c.match(/\/flows\/([^/.]+)\.flow/);g&&a("Flow",g[1])}else if(c.includes("/permissionsets/")){let g=c.match(/\/permissionsets\/([^/.]+)\.permissionset/);g&&a("PermissionSet",g[1])}else if(c.includes("/profiles/")){let g=c.match(/\/profiles\/([^/.]+)\.profile/);g&&a("Profile",g[1])}else if(c.includes("/customMetadata/")){let g=c.match(/\/customMetadata\/([^/.]+)\.md/);g&&a("CustomMetadata",g[1])}else if(c.includes("/flexipages/")){let g=c.match(/\/flexipages\/([^/.]+)\.flexipage/);g&&a("FlexiPage",g[1])}}if(Object.keys(m).length===0){j.window.showInformationMessage("Ricwiz: Found deleted files in Git, but none mapped to recognizable Salesforce metadata.");return}let f=`<?xml version="1.0" encoding="UTF-8"?>
<Package xmlns="http://soap.sforce.com/2006/04/metadata">
`;for(let d of Object.keys(m).sort()){f+=`    <types>
`;for(let c of m[d].sort())f+=`        <members>${c}</members>
`;f+=`        <name>${d}</name>
    </types>
`}f+=`    <version>58.0</version>
</Package>`;let u=Oe.join(t,"destructiveChanges");le.existsSync(u)||le.mkdirSync(u);let l=Oe.join(u,"destructiveChanges.xml"),o=Oe.join(u,"package.xml");le.writeFileSync(l,f,"utf8"),le.existsSync(o)||le.writeFileSync(o,`<?xml version="1.0" encoding="UTF-8"?>
<Package xmlns="http://soap.sforce.com/2006/04/metadata">
    <version>58.0</version>
</Package>`,"utf8");let n=await j.workspace.openTextDocument(l);await j.window.showTextDocument(n),j.window.showInformationMessage("Ricwiz: destructiveChanges.xml generated successfully!")}catch(s){j.window.showErrorMessage(`Ricwiz: Error generating destructive changes: ${s.message}`)}})}var j,Oe,le,ct=k(()=>{"use strict";j=y(require("vscode")),Oe=y(require("path")),le=y(require("fs"));$()});async function dt(){let t=v();if(!t)return;let i=ee.workspace.getConfiguration("ricwiz").get("ticketSourceBranch","main");await ee.window.withProgress({location:ee.ProgressLocation.Notification,title:"Ricwiz: Finding Apex Tests to run...",cancellable:!1},async()=>{try{let{stdout:s}=await p(`git diff --name-status origin/${i}...HEAD`,{cwd:t}),r=s.split(`
`).map(d=>d.trim()).filter(d=>d.length>0),m=new Set,a=new Set;for(let d of r){let c=d.split(/\s+/);if(c[0].startsWith("D"))continue;let g=c[1];if(g&&g.endsWith(".cls")){let h=g.match(/\/classes\/([^/.]+)\.cls/);if(h){let w=h[1];w.toLowerCase().endsWith("test")?m.add(w):a.add(w)}}}for(let d of a)m.add(`${d}Test`);if(m.size===0){ee.window.showInformationMessage("Ricwiz: No Apex Classes were modified in this branch.");return}let f=Array.from(m).map(d=>({label:`$(beaker) ${d}`,description:"Apex Test Class"})),u=await ee.window.showQuickPick(f,{canPickMany:!0,title:"Select Test Classes to Run",placeHolder:"Select tests..."});if(!u||u.length===0)return;let o=`sf apex run test -n ${u.map(d=>d.label.replace("$(beaker) ","").trim()).join(",")} -r human -w 30`,n=ee.window.createTerminal("Ricwiz: Smart Tests");n.show(),n.sendText(o)}catch(s){ee.window.showErrorMessage(`Ricwiz: Error finding tests: ${s.message}`)}})}var ee,lt=k(()=>{"use strict";ee=y(require("vscode"));$()});var fe,mt=k(()=>{"use strict";fe=class{static isValidShellArg(e){return e?/^[a-zA-Z0-9\-_/.]+$/.test(e):!1}}});var ze,ut,Ne,A,se=k(()=>{"use strict";ze=y(require("vscode")),ut=y(require("path")),Ne=y(require("fs")),A=class t{style;upstreamRemote;originRemote;ticketSourceBranch;ticketPrefix;environments;static baseConfig=ze.workspace.getConfiguration("ricwiz");activeProfile;profileName;constructor(e){this.activeProfile=e,this.profileName=e?.name;let i=t.baseConfig;this.style=e?.workflowStyle||i.get("workflowStyle","standard"),this.style==="multi-remote"?(this.upstreamRemote=e?.upstreamRemote||i.get("upstreamRemote","salesforce-master"),this.originRemote=e?.originRemote||i.get("originRemote","origin")):(this.upstreamRemote="origin",this.originRemote="origin"),this.ticketSourceBranch=e?.ticketSourceBranch||i.get("ticketSourceBranch","main"),this.ticketPrefix=e?.ticketPrefix||i.get("ticketPrefix","SFPSCA-");let s=[{name:"Qual",sourceBranch:"quality"},{name:"Val",sourceBranch:"validation"},{name:"Prod",sourceBranch:"main"}];this.environments=e?.environments||i.get("environments",s)}getConfig(e,i){return this.activeProfile&&this.activeProfile[e]!==void 0?this.activeProfile[e]:t.baseConfig.get(e,i)}static async initialize(e,i){let s=t.baseConfig.get("profiles",[]),r=ut.join(e,"ricwiz.json");if(Ne.existsSync(r))try{let m=Ne.readFileSync(r,"utf-8"),a=JSON.parse(m);a&&Array.isArray(a.profiles)&&(s=[...s,...a.profiles])}catch(m){ze.window.showErrorMessage(`Ricwiz: Error parsing ricwiz.json: ${m.message}`)}if(s.length>0){if(!i?.forcePrompt)try{let{exec:u}=($(),ge(Fe)),{stdout:l}=await u("git branch --show-current",{cwd:e}),o=l.trim(),n=o;o.includes("-to-")&&(n=o.split("-to-")[0]);let{stdout:d}=await u(`git config branch.${n}.ricwiz-profile`,{cwd:e}),c=d.trim();if(c){let g=s.find(h=>h.name===c);if(g)return new t(g)}}catch{}let m=s.map(u=>u.name),a=await ze.window.showQuickPick(m,{placeHolder:"Ricwiz: Select Workflow Profile",ignoreFocusOut:!0});if(!a)return;let f=s.find(u=>u.name===a);return new t(f)}return new t}buildUpstreamPath(e){return e.includes("/")?e:`${this.upstreamRemote}/${e}`}getFetchRemote(e){return e.includes("/")?e.split("/")[0]:this.upstreamRemote}getFetchBranch(e){return e.includes("/")?e.substring(e.indexOf("/")+1):e}}});async function pt(){let t=v();if(!t){B.window.showErrorMessage("Open a folder or workspace that is a Git repository.");return}let e=await A.initialize(t,{forcePrompt:!0});if(!e)return;let i=await N(t,{prefix:e.ticketPrefix});if(!i){B.window.showErrorMessage("Branch creation cancelled: Ticket not provided.");return}let{ticketId:s}=i,r=e.environments,m="all",a=[{label:"Create Main Branch & Environments",description:"Creates the main ticket branch and all environment branches",value:"all"},{label:"Create Main Branch Only",description:"Creates only the main ticket branch (skips environments)",value:"mainOnly"},{label:"Create Environments Only",description:"Creates only the environment branches (skip main branch)",value:"envs"}];if(r.length>0){let l=await B.window.showQuickPick(a,{placeHolder:"Ricwiz: What do you want to create?",ignoreFocusOut:!0});if(!l)return;m=l.value}let f=e.ticketSourceBranch;if(m==="all"||m==="mainOnly"){let l=[];try{let{stdout:c}=await p('git branch --all --format="%(refname:short)"',{cwd:t});l=c.split(`
`).map(g=>g.trim()).filter(g=>g&&g!=="origin"),l=[...new Set(l)]}catch{}let o=B.window.createQuickPick();o.title="Ricwiz: Ticket Source Branch",o.placeholder="Confirm or change the source branch for this ticket",o.value=e.ticketSourceBranch,o.ignoreFocusOut=!0;let n=()=>{let c=o.value.trim(),g=[];c&&g.push({label:c,description:"Use typed branch"}),g.push(...l.map(h=>({label:h}))),o.items=g};o.onDidChangeValue(n),n();let d=await new Promise(c=>{o.onDidAccept(()=>{let g=o.selectedItems[0];c(g?g.label:o.value),o.hide()}),o.onDidHide(()=>c(void 0)),o.show()});if(!d){B.window.showInformationMessage("Branch creation cancelled.");return}f=d.trim()}let u=s;if(!fe.isValidShellArg(u)){B.window.showErrorMessage(`Invalid format for ticket ID: ${u}`);return}if(!fe.isValidShellArg(f)){B.window.showErrorMessage(`Invalid format for ticketSourceBranch in settings: ${f}`);return}for(let l of r){if(!fe.isValidShellArg(l.name)){B.window.showErrorMessage(`Invalid format for environment name in settings: ${l.name}`);return}if(!fe.isValidShellArg(l.sourceBranch)){B.window.showErrorMessage(`Invalid format for environment sourceBranch in settings: ${l.sourceBranch}`);return}}try{await p("git status",{cwd:t})}catch{B.window.showErrorMessage("The opened folder does not appear to be a valid Git repository.");return}try{await B.window.withProgress({location:B.ProgressLocation.Notification,title:"Ricwiz: Creating Branches",cancellable:!1},async l=>{let o=[];l.report({message:"Checking remote status (git fetch)...",increment:10});try{await p("git fetch",{cwd:t})}catch{}try{if(m==="all"||m==="mainOnly"){if(l.report({message:`Creating main branch ${u}...`,increment:10}),await de(t,u))B.window.showInformationMessage(`Ricwiz: The branch ${u} already exists. Skipping creation...`),await p(`git checkout ${u}`,{cwd:t});else try{let n=e.getFetchRemote(f),d=e.getFetchBranch(f),c=e.buildUpstreamPath(f);await p(`git fetch ${n} ${d}`,{cwd:t}),await p(`git checkout -b ${u} ${c}`,{cwd:t}),o.push(u)}catch{try{await p(`git checkout -b ${u} ${f}`,{cwd:t}),o.push(u)}catch{throw new Error(`Could not create main branch '${u}' from '${f}'. Does the source branch exist?`)}}try{await p(`git config branch.${u}.ricwiz-source "${f}"`,{cwd:t}),e.profileName&&await p(`git config branch.${u}.ricwiz-profile "${e.profileName}"`,{cwd:t})}catch{}}if(m==="all"||m==="envs"){let n=50/(r.length||1);for(let d of r){let c=`${s}-to-${d.name}`,g=d.sourceBranch;if(l.report({message:`Processing environment branch ${c}...`,increment:n}),!await de(t,c))try{let h=e.buildUpstreamPath(g);await p(`git checkout -b ${c} ${h}`,{cwd:t}),o.push(c)}catch{try{await p(`git checkout -b ${c} ${g}`,{cwd:t}),o.push(c)}catch{throw new Error(`Could not create environment branch '${c}' from '${g}'. Does the source branch exist?`)}}}}l.report({message:`Publishing branches to ${e.originRemote}...`,increment:10});for(let n of o)try{await p(`git push -u ${e.originRemote} ${n}`,{cwd:t})}catch{B.window.showWarningMessage(`Ricwiz: Branch ${n} was created locally but could not be pushed to ${e.originRemote}.`)}if(m==="all"||m==="mainOnly"){l.report({message:`Switching to ${u}...`,increment:10});try{await p(`git checkout ${u}`,{cwd:t})}catch{}}l.report({increment:100}),B.window.showInformationMessage("Ricwiz: All set! You can start working on your branches! \u{1F680}")}catch(n){if(B.window.showErrorMessage(`Ricwiz Branch Creation Failed: ${n.message}`),o.length>0){try{await p(`git checkout ${f}`,{cwd:t})}catch{}for(let d of o)try{await p(`git branch -D ${d}`,{cwd:t})}catch{}B.window.showWarningMessage(`Ricwiz: Rolled back (deleted) ${o.length} branch(es) locally due to failure.`)}}})}catch(l){B.window.showErrorMessage(`Ricwiz general error: ${l.message}`)}}var B,gt=k(()=>{"use strict";B=y(require("vscode"));$();mt();se()});async function he(t,e,i,s){s&&s.report({message:"CONFLICT! Resolve & click 'Commit & Continue' in Ricwiz panel."});let r=!1,m=!1,a=async()=>{try{let{stdout:o}=await p("git status --porcelain",{cwd:t});return o.split(`
`).filter(n=>{let d=n.substring(0,2);return["UD","DU","DD","AU","UA"].includes(d)}).map(n=>n.substring(3).trim())}catch{return[]}},f=async()=>{try{let{stdout:o}=await p("git status --porcelain",{cwd:t}),n=d=>d==="UU"?"Both Modified":d==="UD"?"Deleted by them":d==="DU"?"Deleted by us":d==="DD"?"Both Deleted":d==="AA"?"Both Added":d==="AU"?"Added by us":d==="UA"?"Added by them":"Conflicted";return o.split(`
`).map(d=>d.trimRight()).filter(d=>d.length>2).filter(d=>{let c=d.substring(0,2);return["UU","AA","UD","DU","AU","UA","DD"].includes(c)}).map(d=>{let c=d.substring(0,2);return{file:d.substring(3).trim(),state:n(c)}})}catch{return[]}},u=async()=>{if(r)return;let o=await a(),n=await f(),{webviewProvider:d}=(Je(),ge(je));d&&d.setConflictState({isConflict:!0,sourceStr:e,targetStr:i,deletionsCount:o.length,files:n})},l=te.commands.registerCommand("ricwiz.conflictAction",async o=>{if(o==="abortDeploy")m=!0;else if(o==="resolveDeletions"){try{let d=(await a()).map(g=>({label:g})),c=await te.window.showQuickPick(d,{canPickMany:!0,placeHolder:"Select conflicted files to DELETE",title:"Ricwiz: Delete Conflicted Files"});if(c&&c.length>0){for(let g of c)try{await p(`git rm --force "${g.label}"`,{cwd:t})}catch{}te.window.showInformationMessage(`Ricwiz: Deleted ${c.length} conflicted file(s).`)}}catch(n){te.window.showErrorMessage(`Ricwiz: Error. (${n.message})`)}u()}else if(o==="commitAndContinue")try{let d=(await a()).filter(g=>ft.existsSync(ht.join(t,g)));if(d.length>0&&await te.window.showWarningMessage(`Wait! There are ${d.length} file(s) with deletion conflicts that are still on your disk.

If you commit now, you will KEEP them in the project.

Are you sure you want to KEEP them?`,{modal:!0},"Yes, KEEP them","No, let me DELETE them")!=="Yes, KEEP them"){u();return}let c=!1;try{let{stdout:g}=await p('git grep -E "^<<<<<<< "',{cwd:t});g.trim().length>0&&(c=!0)}catch{}if(c){te.window.showErrorMessage("Ricwiz: You still have unresolved conflict markers (<<<<<<<) in your files. Please resolve them first!"),u();return}await p("git add .",{cwd:t}),await p("git commit --no-edit",{cwd:t})}catch(n){te.window.showErrorMessage(`Ricwiz: Could not commit automatically. (${n.message})`),u()}});for(u();;){if(m){r=!0,l.dispose(),(Je(),ge(je)).webviewProvider?.setConflictState(null);try{await p("git merge --abort",{cwd:t})}catch{}return!1}try{let{stdout:o}=await p("git status --porcelain",{cwd:t});if(o.trim().length===0)return r=!0,l.dispose(),(Je(),ge(je)).webviewProvider?.setConflictState(null),te.window.showInformationMessage("Ricwiz: Changes committed!"),!0}catch{}await new Promise(o=>setTimeout(o,2e3))}}var te,ft,ht,Ue=k(()=>{"use strict";te=y(require("vscode")),ft=y(require("fs")),ht=y(require("path"));$()});async function wt(){let t=v();if(!t){F.window.showErrorMessage("Ricwiz: Open a folder or workspace that is a Git repository.");return}try{await p("git status",{cwd:t})}catch{F.window.showErrorMessage("Ricwiz: The opened folder does not appear to be a valid Git repository.");return}let e=await A.initialize(t);if(!e)return;let i=e.environments,s=await N(t,{prefix:e.ticketPrefix});if(!s){F.window.showErrorMessage("Operation cancelled: Ticket not provided.");return}let{ticketId:r,currentBranch:m}=s,a=r;if(!await de(t,a)){F.window.showErrorMessage(`Ricwiz: Main branch '${a}' does not exist! Prepare deploy is only available when a main ticket branch is used.`);return}let f=e.getConfig("defaultReviewers",""),u="";try{let{stdout:l}=await p(`git config branch.${r}.ricwiz-reviewers`,{cwd:t});u=l.trim()}catch{}if(f.trim()){let l=await F.window.showInputBox({prompt:"Ricwiz: Reviewers for this deploy (optional, comma-separated)",placeHolder:"e.g. @joao, 123456",value:u||f,ignoreFocusOut:!0});if(l===void 0)return;try{l.trim()?await p(`git config branch.${r}.ricwiz-reviewers "${l.trim()}"`,{cwd:t}):u&&await p(`git config --unset branch.${r}.ricwiz-reviewers`,{cwd:t})}catch{}}await F.window.withProgress({location:F.ProgressLocation.Notification,title:"Ricwiz: Preparing Deploy",cancellable:!0},async(l,o)=>{let n=0,d=m,c=!1;o.onCancellationRequested(()=>{c=!0}),l.report({message:"Syncing remote information...",increment:10});try{await p("git fetch --all",{cwd:t});let h=10/(i.length||1);for(let w of i)try{if(c)throw new Error("Aborted");l.report({message:`Fetching ${w.sourceBranch}...`,increment:h});let R=e.getFetchRemote(w.sourceBranch),S=e.getFetchBranch(w.sourceBranch);await p(`git fetch ${R} ${S}:${S}`,{cwd:t})}catch{}}catch{}let g=60/(i.length||1);for(let h of i){if(c)break;let w=`${r}-to-${h.name}`,R=h.sourceBranch;try{l.report({message:`Processing ${w}...`,increment:g/4}),await p(`git checkout ${w}`,{cwd:t});try{await p(`git pull ${e.originRemote} ${w}`,{cwd:t})}catch{}let S=async K=>{try{await p(`git merge ${K}`,{cwd:t})}catch(P){let L=!1;try{let{stdout:U}=await p("git ls-files -u",{cwd:t});U.trim().length>0&&(L=!0)}catch{}let J=((P.stdout||"")+(P.stderr||"")+(P.message||"")).toLowerCase();if(L||J.includes("conflict")||J.includes("conflit")){if(!await he(t,K,w,l))throw c=!0,new Error("Deploy aborted by user.")}else throw P}};l.report({message:`Merging ${R} into ${w}...`,increment:g/4});let ae=e.getFetchRemote(R),ue=e.getFetchBranch(R),pe=e.buildUpstreamPath(R);if(await p(`git fetch ${ae} ${ue}`,{cwd:t}),await S(pe),l.report({message:`Merging ${a} into ${w}...`,increment:g/4}),await S(a),c)break;l.report({message:`Pushing ${w}...`,increment:g/4}),await p(`git push ${e.originRemote} ${w}`,{cwd:t}),n++}catch(S){S.message.includes("aborted")?F.window.showInformationMessage("Ricwiz: Deploy cancelled."):F.window.showErrorMessage(`Ricwiz: Failed to process branch ${w}. Detail: ${S.message}`);return}}if(!c){l.report({message:"Finishing up...",increment:10});let h=d;try{await p(`git show-ref --verify --quiet refs/heads/${a}`,{cwd:t}),h=a}catch{}try{let w=await T(t);h&&h!==w?(await p(`git checkout ${h}`,{cwd:t}),F.window.showInformationMessage(`Ricwiz: Operation complete. Back on branch ${h}.`)):F.window.showInformationMessage("Ricwiz: Operation complete.")}catch{F.window.showInformationMessage("Ricwiz: Operation complete.")}}})}var F,vt=k(()=>{"use strict";F=y(require("vscode"));$();Ue();se()});async function yt(t=!1){let e=v();if(!e)return;let i=await A.initialize(e);if(!i)return;let s=await N(e,{prompt:"Enter the full ticket ID for the Merge Requests (e.g., SCPSCA-1234) or just the number"});if(!s)return;let{ticketId:r}=s,a=Y.workspace.getConfiguration("ricwiz").get("gitlabUrlOverride",""),f="";if(a&&a.trim()!=="")f=a.trim();else{let o="";try{let{stdout:n}=await p("git remote get-url origin",{cwd:e});o=n.trim()}catch{Y.window.showErrorMessage("Ricwiz: Could not get the remote origin URL. Please configure the URL manually in the extension settings.");return}f=o,f.endsWith(".git")&&(f=f.slice(0,-4)),f.startsWith("git@")&&(f=f.replace("git@","").replace(":","/"),f=`https://${f}`)}let u=[],l=i.ticketSourceBranch;try{let{stdout:o}=await p(`git config branch.${r}.ricwiz-source`,{cwd:e});o.trim()&&(l=o.trim())}catch{}if(i.environments.length===0)u.push({source:r,target:l});else for(let o of i.environments)u.push({source:`${r}-to-${o.name}`,target:o.sourceBranch});for(let o of u){let n=`${f}/-/merge_requests/new?merge_request[source_branch]=${o.source}&merge_request[target_branch]=${o.target}`;t?Y.commands.executeCommand("simpleBrowser.show",n):Y.env.openExternal(Y.Uri.parse(n))}Y.window.showInformationMessage(`Ricwiz: Opening ${t?"VS Code browser":"external browser"} for Merge Requests!`)}async function bt(){return yt(!1)}async function xt(){return yt(!0)}var Y,kt=k(()=>{"use strict";Y=y(require("vscode"));$();se()});async function Ct(t=!1){let e=v();if(!e)return;let i=_.workspace.getConfiguration("ricwiz"),s=i.get("jiraUrl","");if(!s||s.trim()===""){_.window.showErrorMessage("Ricwiz: Jira URL is not configured. Please set it in the extension settings (e.g., https://jira.company.com/browse/).");return}let{getCurrentBranch:r,resolvePrefix:m,extractTicketSuggestion:a}=($(),ge(Fe)),f=await r(e),u=i.get("ticketPrefix","SFPSCA-"),l=m(f,u),n=a(f,l,!0);if(n){let{normalizeTicketId:c}=($(),ge(Fe));n=c(n,l)}else{let c=await N(e,{prompt:"Ricwiz could not detect the ticket from the branch name. Enter Jira ticket ID (e.g. SFPSCA-1234)",handleToSuffix:!0});if(!c)return;n=c.ticketId}let d=s.trim();d.endsWith("/")||(d+="/"),d+=n,t?_.commands.executeCommand("simpleBrowser.show",d):_.env.openExternal(_.Uri.parse(d)),_.window.showInformationMessage(`Ricwiz: Opening Jira Ticket ${n} in ${t?"VS Code":"browser"}!`)}async function $t(){return Ct(!1)}async function zt(){return Ct(!0)}var _,Rt=k(()=>{"use strict";_=y(require("vscode"));$()});async function Wo(){let t=Pt.workspace.getConfiguration("ricwiz"),e=t.get("jiraUrl",""),i=t.get("jiraEmail","")?.trim(),s=(await tt())?.trim();if(!e||!s)throw new Error('Jira API Token is not securely configured. Please run the "Ricwiz: Set Secure Jira API Token" command.');let r=e;r.includes("/browse")&&(r=r.split("/browse")[0]),r.endsWith("/")&&(r=r.slice(0,-1));let m=i?`Basic ${Buffer.from(`${i}:${s}`).toString("base64")}`:`Bearer ${s}`;return{baseUrl:r,headerAuth:m}}async function be(t,e,i){let{baseUrl:s,headerAuth:r}=await Wo(),m=new URL(`${s}${e}`);return new Promise((a,f)=>{let u=St.request(m,{method:t,headers:{Authorization:r,Accept:"application/json",...i?{"Content-Type":"application/json"}:{}}},l=>{let o="";l.on("data",n=>o+=n),l.on("end",()=>{if(l.statusCode===401||l.statusCode===403)return f(new Error(`Authentication failed (HTTP ${l.statusCode}). Please check your Jira settings.`));if(l.statusCode&&l.statusCode>=400){let n="";try{let d=JSON.parse(o);d.errorMessages&&d.errorMessages.length>0&&(n=d.errorMessages.join(", "))}catch{}return l.statusCode===404||l.statusCode===410?f(new Error(`Ticket not found or deleted (HTTP ${l.statusCode}). ${n}`)):f(new Error(`Jira API returned HTTP status ${l.statusCode}. ${n}`))}if(!o)return a({});try{let n=JSON.parse(o);a(n)}catch{f(new Error("Failed to parse Jira response."))}})});u.on("error",l=>f(new Error(`Network error: ${l.message}`))),i&&u.write(JSON.stringify(i)),u.end()})}async function xe(t){let e=await be("GET",`/rest/api/2/issue/${t}`);return e&&e.fields?{summary:e.fields.summary||"",description:e.fields.description||"No description provided."}:null}async function Bt(t){let e=await be("GET",`/rest/api/2/issue/${t}/transitions`);return e&&e.transitions?e.transitions.map(i=>({id:i.id,name:i.name})):[]}async function Et(t,e){await be("POST",`/rest/api/2/issue/${t}/transitions`,{transition:{id:e}})}async function Mt(t,e){await be("POST",`/rest/api/2/issue/${t}/comment`,{body:e})}async function Dt(t,e){await be("PUT",`/rest/api/2/issue/${t}`,{update:{labels:[{add:e}]}})}async function Tt(t){let e=await be("POST","/rest/api/3/search/jql",{jql:t,maxResults:50,fields:["summary","status","assignee"]});return e&&e.issues?e.issues.map(i=>({key:i.key,summary:i.fields?.summary||"No Title",status:i.fields?.status?.name||"Unknown",assignee:i.fields?.assignee?.displayName||"Unassigned"})):[]}var St,Pt,Re=k(()=>{"use strict";St=y(require("https")),Pt=y(require("vscode"));Le()});async function At(t){let e=v();if(e)try{if(!await A.initialize(e))return;let r=(await T(e)).split("-to-")[0];if(!r){oe.window.showErrorMessage("Ricwiz: You are not currently on a valid ticket branch.");return}await oe.window.withProgress({location:oe.ProgressLocation.Notification,title:`Fetching details for ${r}...`,cancellable:!1},async m=>{let a=await xe(r);a?(t.setJiraData({ticketId:r,...a}),t.setPage("jira")):oe.window.showErrorMessage("Ricwiz: No data found for this ticket.")})}catch(i){i.message.includes("securely configured")?await oe.window.showErrorMessage(i.message,"Set Token Now")==="Set Token Now"&&oe.commands.executeCommand("ricwiz.setJiraToken"):oe.window.showErrorMessage(`Ricwiz Jira Error: ${i.message}`)}}var oe,It=k(()=>{"use strict";oe=y(require("vscode"));$();se();Re()});async function Lt(t,e){let s=me.workspace.getConfiguration("ricwiz").get("jiraDashboards",[]);if(e!==void 0&&(we=e),!s||s.length===0){t.setDashboardData({queries:[],selectedIndex:0,results:[],error:"No queries defined in settings. Go to Settings > Ricwiz > Jira Dashboards."}),t.setPage("dashboard");return}we>=s.length&&(we=0);let r=s[we];t.setDashboardData({queries:s,selectedIndex:we,results:[],error:"\u23F3 Loading tickets..."}),t.setPage("dashboard");try{let m=await Tt(r.jql);t.setDashboardData({queries:s,selectedIndex:we,results:m,error:null}),t.setPage("dashboard")}catch(m){let a=m.message;(a.includes("ENOTFOUND")||a.includes("network"))&&(a="No Internet or Invalid URL"),t.setDashboardData({queries:s,selectedIndex:we,results:[],error:a}),t.setPage("dashboard")}}async function Ft(t,e){await me.window.withProgress({location:me.ProgressLocation.Notification,title:`Fetching details for ${e}...`,cancellable:!1},async()=>{try{let i=await xe(e);i?(t.setJiraData({ticketId:e,...i}),t.setPage("jira")):me.window.showErrorMessage(`Ricwiz: No data found for ticket ${e}.`)}catch(i){me.window.showErrorMessage(`Ricwiz Jira Error: ${i.message}`)}})}var me,we,Ot=k(()=>{"use strict";me=y(require("vscode"));Re();we=0});async function Ge(){let t=v();return!t||!await A.initialize(t,{forcePrompt:!1})?void 0:(await T(t)).split("-to-")[0]}async function Nt(){try{let t=await Ge();if(!t){C.window.showErrorMessage("Ricwiz: You are not on a valid ticket branch.");return}let e=await C.window.withProgress({location:C.ProgressLocation.Notification,title:`Fetching available status for ${t}...`,cancellable:!1},()=>Bt(t));if(!e||e.length===0){C.window.showInformationMessage(`Ricwiz: No transitions available for ${t}.`);return}let i=e.map(r=>({label:r.name,id:r.id})),s=await C.window.showQuickPick(i,{placeHolder:`Select new status for ${t}`,ignoreFocusOut:!0});s&&(await C.window.withProgress({location:C.ProgressLocation.Notification,title:`Updating status to ${s.label}...`,cancellable:!1},()=>Et(t,s.id)),C.window.showInformationMessage(`Ricwiz: Status for ${t} updated to ${s.label}.`))}catch(t){t.message.includes("securely configured")?C.window.showErrorMessage(t.message,"Set Token Now").then(e=>{e==="Set Token Now"&&C.commands.executeCommand("ricwiz.setJiraToken")}):C.window.showErrorMessage(`Ricwiz Jira Error: ${t.message}`)}}async function jt(){try{let t=await Ge();if(!t){C.window.showErrorMessage("Ricwiz: You are not on a valid ticket branch.");return}let e=await C.window.showInputBox({prompt:`Add comment to ${t}`,placeHolder:"Type your comment here...",ignoreFocusOut:!0});e&&(await C.window.withProgress({location:C.ProgressLocation.Notification,title:`Adding comment to ${t}...`,cancellable:!1},()=>Mt(t,e)),C.window.showInformationMessage(`Ricwiz: Comment added to ${t}.`))}catch(t){t.message.includes("securely configured")?C.window.showErrorMessage(t.message,"Set Token Now").then(e=>{e==="Set Token Now"&&C.commands.executeCommand("ricwiz.setJiraToken")}):C.window.showErrorMessage(`Ricwiz Jira Error: ${t.message}`)}}async function Jt(){try{let t=await Ge();if(!t){C.window.showErrorMessage("Ricwiz: You are not on a valid ticket branch.");return}let e=await C.window.showInputBox({prompt:`Add a label to ${t}`,placeHolder:"e.g. Needs-Review, Bug, High-Priority",ignoreFocusOut:!0});e&&e.trim()&&(await C.window.withProgress({location:C.ProgressLocation.Notification,title:`Adding label to ${t}...`,cancellable:!1},()=>Dt(t,e.trim())),C.window.showInformationMessage(`Ricwiz: Label '${e.trim()}' added to ${t}.`))}catch(t){t.message.includes("securely configured")?C.window.showErrorMessage(t.message,"Set Token Now").then(e=>{e==="Set Token Now"&&C.commands.executeCommand("ricwiz.setJiraToken")}):C.window.showErrorMessage(`Ricwiz Jira Error: ${t.message}`)}}async function Ut(){let t=await C.window.showInputBox({prompt:"Enter your Jira API Token (or Personal Access Token). It will be securely stored in your OS keychain.",password:!0,ignoreFocusOut:!0});if(t)try{await et(t.trim()),C.window.showInformationMessage("Ricwiz: Jira API Token securely stored!")}catch(e){C.window.showErrorMessage(`Ricwiz: Failed to store token: ${e.message}`)}}var C,Wt=k(()=>{"use strict";C=y(require("vscode"));$();se();Re();Le()});async function qt(){let t=v();if(!t){re.window.showErrorMessage("Ricwiz: Open a folder or workspace that is a Git repository.");return}let e=await A.initialize(t);if(!e)return;let i=await N(t,{prefix:e.ticketPrefix,prompt:"Enter the full ticket ID to sync all branches for (e.g., SCPSCA-1234) or just the number"});if(!i)return;let{ticketId:s,currentBranch:r}=i;await re.window.withProgress({location:re.ProgressLocation.Notification,title:`Ricwiz: Syncing all branches for ${s}...`,cancellable:!1},async m=>{try{m.report({message:"Fetching from remote..."});try{await p("git fetch --all",{cwd:t})}catch{}let{stdout:a}=await p(`git branch --list "*${s}*"`,{cwd:t}),f=a.split(`
`).map(o=>o.replace("*","").trim()).filter(o=>o.length>0);if(f.length===0){re.window.showWarningMessage(`Ricwiz: No local branches found for ${s}.`);return}let u=0,l=0;for(let o of f)if(m.report({message:`Syncing ${o}...`}),o===r)try{await p(`git pull ${e.originRemote} ${o}`,{cwd:t}),u++}catch(n){let d=!1;try{let{stdout:g}=await p("git ls-files -u",{cwd:t});g.trim().length>0&&(d=!0)}catch{}let c=((n.stdout||"")+(n.stderr||"")+(n.message||"")).toLowerCase();(d||c.includes("conflict")||c.includes("conflit"))&&await he(t,`${e.originRemote}/${o}`,o,m)?u++:l++}else try{await p(`git fetch ${e.originRemote} ${o}:${o}`,{cwd:t}),u++}catch{try{await p(`git checkout ${o}`,{cwd:t});try{await p(`git pull ${e.originRemote} ${o}`,{cwd:t}),u++}catch(d){let c=!1;try{let{stdout:h}=await p("git ls-files -u",{cwd:t});h.trim().length>0&&(c=!0)}catch{}let g=((d.stdout||"")+(d.stderr||"")+(d.message||"")).toLowerCase();(c||g.includes("conflict")||g.includes("conflit"))&&await he(t,`${e.originRemote}/${o}`,o,m)?u++:l++}await p(`git checkout ${r}`,{cwd:t})}catch{try{await p(`git checkout ${r}`,{cwd:t})}catch{}l++}}l>0?re.window.showWarningMessage(`Ricwiz: Synced ${u}/${f.length} branches. ${l} branch(es) could not be synced (possible conflicts or diverged history).`):re.window.showInformationMessage(`Ricwiz: \u{1F504} All ${u} branches for ${s} are up to date!`)}catch(a){re.window.showErrorMessage(`Ricwiz: Sync failed: ${a.message}`)}})}var re,Ht=k(()=>{"use strict";re=y(require("vscode"));$();Ue();se()});async function Vt(){let t=v();if(!t){ne.window.showErrorMessage("Ricwiz: Open a folder or workspace that is a Git repository.");return}try{await p("git status",{cwd:t})}catch{ne.window.showErrorMessage("Ricwiz: The opened folder does not appear to be a valid Git repository.");return}let e=await A.initialize(t);if(!e)return;let i=e.environments,s=await N(t,{prefix:e.ticketPrefix});if(!s)return;let{ticketId:r,currentBranch:m}=s;await ne.window.withProgress({location:ne.ProgressLocation.Notification,title:"Ricwiz: Updating environment branches from their bases",cancellable:!0},async(a,f)=>{let u=0,l=m,o=!1;f.onCancellationRequested(()=>{o=!0}),a.report({message:"Syncing remote information...",increment:10});try{await p("git fetch --all",{cwd:t})}catch{}let n=80/(i.length||1);for(let d of i){if(o)break;let c=`${r}-to-${d.name}`,g=d.sourceBranch;if(await de(t,c))try{a.report({message:`Processing ${c}...`,increment:n/2}),await p(`git checkout ${c}`,{cwd:t});try{a.report({message:`Merging ${g} into ${c}...`,increment:n/2});let h=e.getFetchRemote(g),w=e.getFetchBranch(g),R=e.buildUpstreamPath(g);await p(`git fetch ${h} ${w}`,{cwd:t}),await p(`git merge ${R}`,{cwd:t})}catch(h){let w=!1;try{let{stdout:S}=await p("git ls-files -u",{cwd:t});S.trim().length>0&&(w=!0)}catch{}let R=((h.stdout||"")+(h.stderr||"")+(h.message||"")).toLowerCase();if(w||R.includes("conflict")||R.includes("conflit")){let S=e.buildUpstreamPath(g);if(!await he(t,S,c,a))throw o=!0,new Error("Update aborted by user.")}else throw h}if(o)break;u++}catch(h){h.message.includes("aborted")?ne.window.showInformationMessage("Ricwiz: Update cancelled."):ne.window.showErrorMessage(`Ricwiz: Failed to update branch ${c}. Detail: ${h.message}`);return}}if(!o){a.report({message:"Finishing up...",increment:10});try{let d=await T(t);l&&l!==d&&await p(`git checkout ${l}`,{cwd:t})}catch{}ne.window.showInformationMessage(`Ricwiz: Successfully updated ${u} environment branches from their bases!`)}})}var ne,Gt=k(()=>{"use strict";ne=y(require("vscode"));$();Ue();se()});async function Qt(){let t=v();if(!t){I.window.showErrorMessage("Ricwiz: Open a folder or workspace that is a Git repository.");return}let e=await T(t),i=I.workspace.getConfiguration("ricwiz");await I.window.withProgress({location:I.ProgressLocation.Notification,title:"Ricwiz: Scanning for unused local branches...",cancellable:!1},async()=>{try{await p("git fetch --prune",{cwd:t})}catch{}let s=[];try{let{stdout:n}=await p('git branch --format="%(refname:short)"',{cwd:t});s=n.split(`
`).map(d=>d.trim()).filter(d=>d.length>0)}catch{}if(s.length===0){I.window.showInformationMessage("Ricwiz: No local branches found.");return}let r=[];try{let{stdout:n}=await p('git branch -r --format="%(refname:short)"',{cwd:t});r=n.split(`
`).map(d=>d.trim().replace(/^origin\//,"").replace(/^[^\/]+\//,"")).filter(d=>d.length>0&&!d.includes("HEAD"))}catch{}let m=[];try{let{stdout:n}=await p('git for-each-ref --format="%(refname:short)|||%(upstream:track)" refs/heads/',{cwd:t});m=n.split(`
`).filter(d=>d.includes("[gone]")).map(d=>d.split("|||")[0].trim())}catch{}let a=s.filter(n=>!r.includes(n));if(a.length===0){I.window.showInformationMessage("Ricwiz: Your local repository is totally clean! All local branches exist on the remote.");return}let f=a.map(n=>{let d=m.includes(n),c=n===e,g="Not found on remote";return d&&(g="Deleted on remote [gone]"),c&&(g+=" (Current branch - will checkout main first)"),{label:n,description:g,picked:d&&!c}}),u=await I.window.showQuickPick(f,{canPickMany:!0,placeHolder:"Select local branches to delete",title:"Ricwiz: Delete Unused Branches"});if(!u||u.length===0){I.window.showInformationMessage("Ricwiz: No branches selected for deletion.");return}if(await I.window.showWarningMessage(`Ricwiz: Delete ${u.length} local branch(es)?
This cannot be undone!`,{modal:!0},"Yes, delete them")!=="Yes, delete them"){I.window.showInformationMessage("Ricwiz: Deletion cancelled.");return}let o=0;for(let n of u){let d=n.label;if(d===e){let c=i.get("ticketSourceBranch","main");try{await p(`git checkout ${c}`,{cwd:t}),e=c}catch{I.window.showWarningMessage(`Ricwiz: Could not switch away from ${d}. Skipping.`);continue}}try{await p(`git branch -D ${d}`,{cwd:t}),o++}catch{I.window.showWarningMessage(`Ricwiz: Could not delete local branch ${d}.`)}}I.window.showInformationMessage(`Ricwiz: \u{1F5D1}\uFE0F Cleaned up ${o} unused local branch(es).`)})}var I,Yt=k(()=>{"use strict";I=y(require("vscode"));$()});async function ke(t){let e=v();e&&await Z.window.withProgress({location:Z.ProgressLocation.Notification,title:`Ricwiz: Switching to ${t}...`,cancellable:!1},async()=>{try{let i=await T(e),s=!1;try{let{stdout:m}=await p("git status --porcelain",{cwd:e});s=m.trim().length>0}catch{}if(s&&i)try{await p(`git stash push --include-untracked -m "ricwiz-auto:${i}"`,{cwd:e}),Z.window.showInformationMessage(`Ricwiz: \u{1F4E6} Stashed changes from ${i}`)}catch{Z.window.showWarningMessage("Ricwiz: Could not stash changes. Checkout may fail if there are conflicts.")}let r=t;t.includes("/")&&(r=t.split("/").slice(1).join("/"));try{await p(`git checkout ${r}`,{cwd:e})}catch{let a="";if(t.includes("/"))a=t.split("/")[0];else{let{stdout:f}=await p("git branch -r",{cwd:e}),u=f.split(`
`).map(o=>o.trim()).filter(o=>o),l=[];for(let o of u){let n=o.split(" ")[0];n.endsWith(`/${r}`)&&l.push(n.substring(0,n.lastIndexOf("/")))}if(l.length===0){Z.window.showErrorMessage(`Ricwiz: A branch "${r}" n\xE3o existe localmente nem em nenhuma remote!`);return}else if(l.length===1)a=l[0];else{let o=await A.initialize(e);l.includes("origin")?a="origin":o&&l.includes(o.upstreamRemote)?a=o.upstreamRemote:a=l[0]}}try{await p(`git fetch ${a} ${r}`,{cwd:e}),await p(`git checkout -b ${r} --track ${a}/${r}`,{cwd:e})}catch{Z.window.showErrorMessage(`Ricwiz: Encontrou na remote ${a} mas falhou a fazer checkout.`);return}}try{let{stdout:m}=await p("git stash list",{cwd:e}),a=m.split(`
`);for(let f=0;f<a.length;f++)if(a[f].includes(`ricwiz-auto:${r}`)){let u=a[f].match(/stash@\{(\d+)\}/);u&&(await p(`git stash pop stash@{${u[1]}}`,{cwd:e}),Z.window.showInformationMessage(`Ricwiz: \u{1F4E6} Restored stashed changes on ${r}`));break}}catch{Z.window.showWarningMessage(`Ricwiz: Could not restore stashed changes on ${r}. You may need to resolve conflicts manually (check git stash list).`)}}catch{Z.window.showErrorMessage(`Ricwiz: Could not checkout branch ${t}.`)}})}var Z,We=k(()=>{"use strict";Z=y(require("vscode"));$();se()});async function _t(){let t=v();if(t)try{let{stdout:e}=await p("git branch --show-current",{cwd:t}),i=e.trim();i&&(await Se.env.clipboard.writeText(i),Se.window.showInformationMessage(`Ricwiz: \u{1F4CB} Copied "${i}" to clipboard`))}catch{Se.window.showErrorMessage("Ricwiz: Could not get the current branch name.")}}var Se,Zt=k(()=>{"use strict";Se=y(require("vscode"));$()});async function Kt(){let t=v();if(!t){q.window.showErrorMessage("Ricwiz: Open a folder or workspace that is a Git repository.");return}let e=q.workspace.getConfiguration("ricwiz"),i=e.get("ticketSourceBranch","main"),r=e.get("packageXmlCommand",'sf sgd source delta --to "HEAD" --from "origin/{baseBranch}" --output-dir "."').replace("{baseBranch}",i);await q.window.showWarningMessage("Are you sure you want to generate the package.xml? This may overwrite existing local manifest files.",{modal:!0},"Yes, Generate")==="Yes, Generate"&&await q.window.withProgress({location:q.ProgressLocation.Notification,title:"Ricwiz: Generating package.xml using Salesforce CLI...",cancellable:!1},async()=>{try{await p(r,{cwd:t,maxBuffer:10*1024*1024}),q.window.showInformationMessage("Ricwiz: Successfully generated package.xml!");let a=qe.join(t,"package","package.xml"),f=qe.join(t,"package.xml"),u=qe.join(t,"manifest","package.xml");for(let l of[a,f,u])if(Xt.existsSync(l)){let o=await q.workspace.openTextDocument(l);await q.window.showTextDocument(o);break}}catch(a){q.window.showErrorMessage(`Ricwiz: Error running sf command - ${a.message}`)}})}var q,qe,Xt,eo=k(()=>{"use strict";q=y(require("vscode")),qe=y(require("path")),Xt=y(require("fs"));$()});async function to(){let t=v();if(!t){H.window.showErrorMessage("Ricwiz: Open a folder or workspace that is a Git repository.");return}let i=H.workspace.getConfiguration("ricwiz").get("deployCommand","sf project deploy start --manifest package/package.xml --post-destructive-changes destructiveChanges/destructiveChanges.xml -c -l NoTestRun -g");await H.window.showWarningMessage("Are you sure you want to deploy to Salesforce? This action modifies your org and cannot be easily undone.",{modal:!0},"Yes, Deploy")==="Yes, Deploy"&&await H.window.withProgress({location:H.ProgressLocation.Notification,title:"Ricwiz: Deploying package...",cancellable:!1},async()=>{try{let{stdout:r,stderr:m}=await p(i,{cwd:t,maxBuffer:52428800}),a=H.window.createOutputChannel("Ricwiz Deploy");a.appendLine(`Executing: ${i}`),a.appendLine(r),m&&(a.appendLine("--- STDERR ---"),a.appendLine(m)),a.show(),H.window.showInformationMessage("Ricwiz: Successfully ran deploy command!")}catch(r){let m=H.window.createOutputChannel("Ricwiz Deploy");m.appendLine(`Error executing: ${i}`),r.stdout&&m.appendLine(r.stdout),r.stderr&&m.appendLine(r.stderr),m.appendLine(r.message),m.show(),H.window.showErrorMessage("Ricwiz: Error running deploy command. See output channel for details.")}})}var H,oo=k(()=>{"use strict";H=y(require("vscode"));$()});async function io(){let t=v();if(!t){V.window.showErrorMessage("Ricwiz: Open a folder or workspace that is a Git repository.");return}let i=V.workspace.getConfiguration("ricwiz").get("importDataCommand","sfdx force:data:tree:import --plan data/plan.json");await V.window.showWarningMessage("Are you sure you want to import data into Salesforce? This action modifies records in your org.",{modal:!0},"Yes, Import")==="Yes, Import"&&await V.window.withProgress({location:V.ProgressLocation.Notification,title:"Ricwiz: Importing data...",cancellable:!1},async()=>{try{let{stdout:r,stderr:m}=await p(i,{cwd:t,maxBuffer:52428800}),a=V.window.createOutputChannel("Ricwiz Import Data");a.appendLine(`Executing: ${i}`),a.appendLine(r),m&&(a.appendLine("--- STDERR ---"),a.appendLine(m)),a.show(),V.window.showInformationMessage("Ricwiz: Successfully ran import data command!")}catch(r){let m=V.window.createOutputChannel("Ricwiz Import Data");m.appendLine(`Error executing: ${i}`),r.stdout&&m.appendLine(r.stdout),r.stderr&&m.appendLine(r.stderr),m.appendLine(r.message),m.show(),V.window.showErrorMessage("Ricwiz: Error running import data command. See output channel for details.")}})}var V,so=k(()=>{"use strict";V=y(require("vscode"));$()});async function ro(){let t=v();if(!t){G.window.showErrorMessage("Ricwiz: Open a folder or workspace that is a Git repository.");return}let e="";try{e=await T(t)}catch{}let s=G.workspace.getConfiguration("ricwiz").get("ticketSourceBranch","main"),r=await G.window.showInputBox({prompt:`Enter the branch name to list modified files (compared to ${s})`,value:e,placeHolder:"SFPSCA-1234"});r&&await G.window.withProgress({location:G.ProgressLocation.Notification,title:`Ricwiz: Finding files for ${r}...`,cancellable:!1},async()=>{try{let m=r.replace(/-to-[a-zA-Z0-9]+$/i,""),a=[];try{let g="";try{let{stdout:h}=await p(`git merge-base origin/${s} ${r}`,{cwd:t});g=h.trim()}catch{let{stdout:h}=await p(`git merge-base ${s} ${r}`,{cwd:t});g=h.trim()}if(g){let{stdout:h}=await p(`git diff --name-only ${g} ${r}`,{cwd:t,maxBuffer:10485760});a=h.split(`
`).map(w=>w.trim()).filter(w=>w.length>0)}}catch{}let f=[];try{let{stdout:g}=await p(`git --no-pager log --grep="\\b${m}\\b" -i -E --name-only -m --first-parent --format=""`,{cwd:t,maxBuffer:10485760});f=g.split(`
`).map(h=>h.trim()).filter(h=>h.length>0)}catch{}let u=[...a,...f];if(u.length===0){G.window.showInformationMessage(`Ricwiz: No modified files found for ${r}.`);return}let l=Array.from(new Set(u)).sort(),o={};for(let g of l){let h=g.match(/default\/([^/]+)/),w=h&&h[1]?h[1].toUpperCase():"OUTROS";o[w]||(o[w]=[]),o[w].push(g)}let n=`Files modified in branch ${r}:
`,d=Object.keys(o).sort();for(let g of d)n+=`
=== ${g} ===
`,n+=o[g].join(`
`)+`
`;let c=await G.workspace.openTextDocument({content:n,language:"plaintext"});await G.window.showTextDocument(c)}catch(m){G.window.showErrorMessage(`Ricwiz: Error running git log - ${m.message}`)}})}var G,no=k(()=>{"use strict";G=y(require("vscode"));$()});async function ao(){let t=v();if(!t){X.window.showErrorMessage("Ricwiz: Open a folder or workspace that is a Git repository.");return}let i=X.workspace.getConfiguration("ricwiz").get("resetTrackingCommand","sf org disable tracking && sf project reset tracking --no-prompt");await X.window.withProgress({location:X.ProgressLocation.Notification,title:"Ricwiz: Resetting tracking...",cancellable:!1},async()=>{try{let{stdout:s,stderr:r}=await p(i,{cwd:t,maxBuffer:52428800}),m=X.window.createOutputChannel("Ricwiz Reset Tracking");m.appendLine(`Executing: ${i}`),m.appendLine(s),r&&(m.appendLine("--- STDERR ---"),m.appendLine(r)),m.show(),X.window.showInformationMessage("Ricwiz: Successfully reset tracking!")}catch(s){let r=X.window.createOutputChannel("Ricwiz Reset Tracking");r.appendLine(`Error executing: ${i}`),s.stdout&&r.appendLine(s.stdout),s.stderr&&r.appendLine(s.stderr),r.appendLine(s.message),r.show(),X.window.showErrorMessage("Ricwiz: Error resetting tracking. See output channel for details.")}})}var X,co=k(()=>{"use strict";X=y(require("vscode"));$()});async function lo(){let t=v();if(!t){Q.window.showErrorMessage("Ricwiz: Open a workspace first.");return}let e=["ApexClass","ApexTrigger","CustomObject","CustomField","LightningComponentBundle","AuraDefinitionBundle","Flow","CustomLabel","CustomMetadata","StaticResource","Profile","PermissionSet","PermissionSetGroup","Layout","ValidationRule","RecordType","ListView","Report","EmailTemplate","Other (Type manually)..."],i=await Q.window.showQuickPick(e,{placeHolder:"Select Metadata Type to extract (e.g., ApexClass)",ignoreFocusOut:!0});if(!i||i==="Other (Type manually)..."&&(i=await Q.window.showInputBox({prompt:"Enter Metadata Type (e.g., CustomApplication, Queue)",ignoreFocusOut:!0}),!i))return;let s={ApexClass:"**/*.cls",ApexTrigger:"**/*.trigger",CustomObject:"**/*.{object,object-meta.xml}",CustomField:"**/*.field-meta.xml",LightningComponentBundle:"**/lwc/*/*.js",AuraDefinitionBundle:"**/aura/*/*.cmp",Flow:"**/*.flow-meta.xml",CustomLabel:"**/*.labels-meta.xml",CustomMetadata:"**/*.md-meta.xml",StaticResource:"**/*.resource-meta.xml",Profile:"**/*.profile-meta.xml",PermissionSet:"**/*.permissionset-meta.xml",PermissionSetGroup:"**/*.permissionsetgroup-meta.xml",Layout:"**/*.layout-meta.xml",ValidationRule:"**/*.validationRule-meta.xml",RecordType:"**/*.recordType-meta.xml",ListView:"**/*.listView-meta.xml"},r=[],m=s[i];if(m)try{r=(await Q.workspace.findFiles(m,"**/node_modules/**")).map(u=>{let l=u.fsPath.split(/[\\/]/).pop()||"";if(i==="LightningComponentBundle"||i==="AuraDefinitionBundle"){let o=u.fsPath.split(/[\\/]/);return o[o.length-2]||l.split(".")[0]}return l.split(".")[0]}),r=[...new Set(r)].sort()}catch{}let a=await new Promise(f=>{let u=Q.window.createQuickPick();u.title=`Extract ${i}`,u.placeholder="Type name (e.g. MyComponent) or * for all",u.ignoreFocusOut=!0,u.matchOnDescription=!0;let l=()=>{let o=u.value.trim(),n=[];o?n.push({label:`$(cloud-download) Extract "${o}"`,description:"Extract exact name from Salesforce",alwaysShow:!0}):n.push({label:'$(cloud-download) Extract "*" (All)',description:`Extract all ${i}s`,alwaysShow:!0}),r.forEach(d=>{(!o||d.toLowerCase().includes(o.toLowerCase()))&&n.push({label:d,description:"Local workspace component"})}),u.items=n};u.onDidChangeValue(()=>l()),u.onDidAccept(()=>{let o=u.selectedItems[0];if(o){let n=o.label;n.startsWith('$(cloud-download) Extract "')?n=n.replace('$(cloud-download) Extract "',"").replace('" (All)',"").replace('"',""):n==='$(cloud-download) Extract "*" (All)'&&(n="*"),u.hide(),f(n)}}),u.onDidHide(()=>{u.dispose(),f(void 0)}),l(),u.show()});a&&await Q.window.withProgress({location:Q.ProgressLocation.Notification,title:`Ricwiz: Extracting ${i}:${a} from Salesforce...`,cancellable:!0},async(f,u)=>{try{D.show(!0);let l=`${i}:${a}`,{stdout:o,stderr:n}=await p(`sf project retrieve start -m "${l}"`,{cwd:t});o&&D.appendLine(o),n&&D.appendLine(n),Q.window.showInformationMessage(`Ricwiz: Successfully extracted ${l}.`)}catch(l){D.appendLine(`ERROR: ${l.message}`),l.stdout&&D.appendLine(l.stdout),l.stderr&&D.appendLine(l.stderr),Q.window.showErrorMessage("Ricwiz: Extraction failed. See Output channel for details.")}})}var Q,mo=k(()=>{"use strict";Q=y(require("vscode"));$()});async function po(){let t=O.window.activeTextEditor;if(!t){O.window.showErrorMessage("Ricwiz: Please open the file you want to deploy in the editor first.");return}let e=t.document.uri.fsPath,i=v();if(!i)return;let s="";if(await O.window.withProgress({location:O.ProgressLocation.Notification,title:"Ricwiz: Fetching available Salesforce orgs...",cancellable:!1},async()=>{try{let{stdout:u}=await p("sf org list --json",{cwd:i});s=u}catch(u){s=u.stdout||""}}),!s){O.window.showErrorMessage("Ricwiz: Failed to fetch orgs. Is Salesforce CLI installed?");return}let r=[];try{let u=JSON.parse(s),l=u.result?.nonScratchOrgs||[],o=u.result?.scratchOrgs||[];r=[...l,...o]}catch{O.window.showErrorMessage("Ricwiz: Failed to parse org list.");return}if(r.length===0){O.window.showInformationMessage("Ricwiz: No authenticated orgs found.");return}let m=r.map(u=>({label:u.alias||u.username,description:u.alias?u.username:"",picked:u.isDefaultUsername})),a=await O.window.showQuickPick(m,{placeHolder:"Select the org(s) to deploy this file to",canPickMany:!0,ignoreFocusOut:!0});if(!a||a.length===0)return;let f=uo.basename(e);await O.window.withProgress({location:O.ProgressLocation.Notification,title:`Ricwiz: Deploying ${f} to ${a.length} org(s)...`,cancellable:!1},async()=>{D.show(!0),D.appendLine(`--- Starting Parallel Deploy of ${f} ---`);let u=a.map(async d=>{let c=d.label;D.appendLine(`[${c}] Deploying...`);try{let{stdout:g,stderr:h}=await p(`sf project deploy start -d "${e}" -o "${c}"`,{cwd:i});return D.appendLine(`[${c}] \u2705 Success`),g&&D.appendLine(g),{org:c,success:!0}}catch(g){return D.appendLine(`[${c}] \u274C Failed`),g.stdout&&D.appendLine(g.stdout),g.stderr&&D.appendLine(g.stderr),{org:c,success:!1}}}),l=await Promise.all(u),o=l.filter(d=>d.success).length,n=l.filter(d=>!d.success).length;n===0?O.window.showInformationMessage(`Ricwiz: Successfully deployed to all ${o} orgs!`):O.window.showErrorMessage(`Ricwiz: Deploy finished with errors (${o} success, ${n} failed). Check Output channel.`)})}var O,uo,go=k(()=>{"use strict";O=y(require("vscode")),uo=y(require("path"));$()});async function fo(){let t=v();if(!t){E.window.showErrorMessage("Ricwiz: Open a folder or workspace that is a Git repository.");return}let e=E.workspace.getConfiguration("ricwiz"),i=e.get("auditUsername",""),s=e.get("auditHours",8),r=await E.window.showInputBox({prompt:"Enter your Salesforce Username to query in SetupAuditTrail",value:i,placeHolder:"admin@tuaorg.com"});if(!r)return;let m=await E.window.showInputBox({prompt:"How many hours back do you want to search?",value:s.toString(),placeHolder:"8"});if(!m)return;let a=parseFloat(m);if(isNaN(a)||a<=0){E.window.showErrorMessage("Ricwiz: Invalid hours specified.");return}let f=new Date(Date.now()-a*60*60*1e3).toISOString(),l=`sf data query -q "${`SELECT Action, Display, Section FROM SetupAuditTrail WHERE CreatedBy.Username = '${r}' AND CreatedDate >= ${f}`}" --json`;await E.window.withProgress({location:E.ProgressLocation.Notification,title:"Ricwiz: Interrogating Setup Audit Trail...",cancellable:!1},async()=>{try{let{stdout:o}=await p(l,{cwd:t,maxBuffer:52428800}),n=JSON.parse(o);if(!n.result||n.result.records.length===0){E.window.showInformationMessage(`Ricwiz: No changes found for ${r} in the last ${a} hours.`);return}let d=n.result.records,c=[],g=new Set;for(let P of d){let L=qo(P.Action,P.Display,P.Section);if(L){let J=`${L.isDelete?"DEL":"ADD"}-${L.metadataFormat}`;if(!g.has(J)){g.add(J);let U=L.isDelete?"$(trash)":"$(plus)";c.push({label:`${U} ${L.metadataFormat}`,description:`${P.Action} -> ${P.Display}`,metadataFormat:L.metadataFormat,isDelete:L.isDelete})}}}if(c.length===0){E.window.showInformationMessage(`Ricwiz: No extractable metadata changes found for ${r} in the last ${a} hours (ignored passwords/logins).`);return}let h=await E.window.showQuickPick(c,{canPickMany:!0,placeHolder:"Select the changes you want to extract to GitLab",ignoreFocusOut:!0});if(!h||h.length===0){E.window.showInformationMessage("Ricwiz: No changes selected.");return}let w=h.filter(P=>P.isDelete),R=h.filter(P=>!P.isDelete),S=E.window.createOutputChannel("Ricwiz Admin Bridge");if(S.show(),w.length>0){let{stdout:P}=await p("git ls-files",{cwd:t}),L=P.split(`
`).map(U=>U.trim()),J=0;for(let U of w){let Me=U.metadataFormat.split(":"),De=Me[0],Ce=Me[1],Te=Ce;De==="CustomField"&&(Te=Ce.split(".")[1]);let M=L.filter(W=>{let ce=Ve.basename(W);return ce.startsWith(Te+".")&&ce.includes(De==="CustomField"?".field":"")});for(let W of M){let ce=Ve.join(t,W);He.existsSync(ce)&&(He.unlinkSync(ce),S.appendLine(`Deleted local file: ${W}`),J++)}}E.window.showInformationMessage(`Ricwiz: Deleted ${J} local files from Git workspace.`)}if(R.length===0)return;let ae=R.map(P=>P.metadataFormat).filter(P=>P!=="").join(", "),ue=await E.window.showInputBox({prompt:"Review and adjust the metadata components to retrieve",value:ae,ignoreFocusOut:!0});if(!ue)return;let pe=`sf project retrieve start -m "${ue}"`;S.appendLine(`Executing: ${pe}`),E.window.showInformationMessage(`Ricwiz: Extracting ${R.length} components...`);let K=await p(pe,{cwd:t});S.appendLine(K.stdout),K.stderr&&(S.appendLine("--- STDERR ---"),S.appendLine(K.stderr)),E.window.showInformationMessage("Ricwiz: Changes extracted successfully! Ready for Git Commit.")}catch(o){E.window.showErrorMessage(`Ricwiz: Error capturing changes - ${o.message}`)}})}function qo(t,e,i){if(!t||!e||!i)return null;let s=t.toLowerCase(),r=i.toLowerCase();if(["security controls","network access","session settings","data export","login history","password policies","identity verification","delegated administration"].includes(r)||s.includes("login")||s.includes("password")||s.includes("oauth")||s.includes("session"))return null;let a=s.includes("delete"),f=null;if(s==="permissionsetgroupcomponentadd"||s==="permissionsetgroupcomponentdelete")return null;let u=(l,o=!1)=>{let n=l.replace(/\(.*\)/g,"").trim();n.includes(":")&&!s.includes("calculation")&&(n=n.split(":")[0]);let d=["disabled","deleted","removed","created","changed","updated","from","to","on","assigned","assign","assignment","permission","set","group","apex","class","trigger","custom","field","object","layout","validation","rule","flow","profile"],c=n.split(/\s+/);if(o){for(;c.length>0&&d.includes(c[c.length-1].toLowerCase());)c.pop();for(;c.length>0&&d.includes(c[0].toLowerCase());)c.shift();return c.join(" ").trim().replace(/[^a-zA-Z0-9_ ]/g,"")}else return c.filter(w=>!d.includes(w.toLowerCase())).join("_").replace(/[^a-zA-Z0-9_]/g,"")||n.replace(/\s+/g,"")};if(s.includes("profile"))f=`Profile:${u(e,!0)}`;else if(s.includes("permissionsetgroupcalculation")){let l=e.split(":");f=`PermissionSetGroup:${l.length>1?l[l.length-1].trim():u(e,!1)}`}else if(s.includes("permission set group")||s.includes("permissionsetgroup"))f=`PermissionSetGroup:${u(e,!1)}`;else if(s.includes("permission set")||s.includes("permissionset"))f=`PermissionSet:${u(e,!1)}`;else if(s.includes("apexclass"))f=`ApexClass:${u(e,!1)}`;else if(s.includes("apextrigger")||s.includes("apex trigger"))f=`ApexTrigger:${u(e,!1)}`;else if(s.includes("customfield")){let l=e.match(/([A-Za-z0-9_]+__c)/),o=e.match(/(?:on|na|for)\s+([A-Za-z0-9_]+)/i);l&&o?f=`CustomField:${o[1]}.${l[1]}`:f=`CustomField:${u(e,!1)}`}else if(s.includes("layout"))f=`Layout:${u(e,!0)}`;else if(s.includes("validation"))f=`ValidationRule:${u(e,!1)}`;else if(s.includes("flow"))f=`Flow:${u(e,!1)}`;else if(s.includes("customobject")){let l=e.match(/([A-Za-z0-9_]+__c)/);f=l?`CustomObject:${l[1]}`:`CustomObject:${u(e,!1)}`}else if(!s.includes("created")&&!s.includes("changed")&&!s.includes("deleted"))return null;return f?{metadataFormat:f,isDelete:a}:null}var E,He,Ve,ho=k(()=>{"use strict";E=y(require("vscode")),He=y(require("fs")),Ve=y(require("path"));$()});async function wo(){let t=v();if(t)try{let{stdout:e}=await p('git for-each-ref --sort=-committerdate --format="%(refname:short)|||%(committerdate:relative)|||%(subject)" refs/heads/',{cwd:t}),i=e.split(`
`).filter(r=>r.trim()).map(r=>{let m=r.split("|||");return{label:`$(git-branch) ${m[0]}`,description:m[1],detail:m[2],branchName:m[0]}}),s=await Qe.window.showQuickPick(i,{placeHolder:"Select a branch from history to checkout",matchOnDescription:!0,matchOnDetail:!0});s&&await ke(s.branchName)}catch{Qe.window.showErrorMessage("Ricwiz: Failed to get branch history")}}var Qe,vo=k(()=>{"use strict";Qe=y(require("vscode"));$();We()});async function yo(){let t=v();if(!t)return;let e=await Pe.window.showInputBox({prompt:"Enter ticket number or name (e.g., 48934)",placeHolder:"48934"});if(e)try{let{stdout:i}=await p(`git branch --list "*${e}*"`,{cwd:t}),s=i.split(`
`).map(a=>a.replace("*","").trim()).filter(a=>a);if(s.length===0){Pe.window.showInformationMessage(`Ricwiz: No branches found matching "${e}"`);return}let r=s.map(a=>({label:`$(git-branch) ${a}`,branchName:a})),m=await Pe.window.showQuickPick(r,{placeHolder:`Select a branch for ${e}`});m&&await ke(m.branchName)}catch{Pe.window.showErrorMessage("Ricwiz: Failed to search branches")}}var Pe,bo=k(()=>{"use strict";Pe=y(require("vscode"));$();We()});async function ko(){let t=ve.window.activeTextEditor;if(!t)return ve.window.showErrorMessage("Ricwiz: Please open a file in the editor to check blame."),null;let e=t.document.fileName,i=xo.basename(e),s=v();if(!s)return ve.window.showErrorMessage("Ricwiz: Workspace is not a git repository."),null;let r=[];try{let{stdout:o}=await p(`git log -5 --pretty=format:"%an|%ar|%s|%h" -- "${e}"`,{cwd:s}),n=o.trim().split(`
`);for(let d of n){let c=d.split("|");c.length>=4&&r.push({author:c[0],time:c[1],message:c.slice(2,-1).join("|"),hash:c[c.length-1]})}}catch(o){console.error("Git blame error:",o)}let m="Unknown",a="Unknown",f="Unknown",u=[],l=Ho(e);if(l)try{await ve.window.withProgress({location:ve.ProgressLocation.Notification,title:`Ricwiz: Analyzing ${l.name} in Salesforce...`,cancellable:!1},async()=>{let o="";if(l.type==="CustomField"){let n=l.name.split(".");n.length===2&&(o=`SELECT LastModifiedBy.Name, LastModifiedDate, CreatedBy.Name FROM CustomField WHERE DeveloperName = '${n[1].replace("__c","")}' AND TableEnumOrId = '${n[0]}'`)}else l.type==="LightningComponentBundle"?o=`SELECT LastModifiedBy.Name, LastModifiedDate, CreatedBy.Name FROM LightningComponentBundle WHERE DeveloperName = '${l.name}'`:o=`SELECT LastModifiedBy.Name, LastModifiedDate, CreatedBy.Name FROM ${l.type} WHERE Name = '${l.name}'`;if(o)try{let{stdout:n}=await p(`sf data query -t -q "${o}" --json`,{cwd:s,maxBuffer:52428800}),d=JSON.parse(n);if(d&&d.result&&d.result.records&&d.result.records.length>0){let c=d.result.records[0];m=c.LastModifiedBy?c.LastModifiedBy.Name:"Unknown",f=c.CreatedBy?c.CreatedBy.Name:"Unknown",a=new Date(c.LastModifiedDate).toLocaleString()}else m="Not found in Org",a="N/A",f="N/A"}catch{m="Query Error",a="N/A",f="N/A"}try{let n="SELECT Action, Display, CreatedBy.Name, CreatedDate FROM SetupAuditTrail ORDER BY CreatedDate DESC LIMIT 1500",{stdout:d}=await p(`sf data query -q "${n}" --json`,{cwd:s,maxBuffer:52428800}),c=JSON.parse(d);if(c&&c.result&&c.result.records){let g=l.name.replace("__c","");u=c.result.records.filter(w=>w.Display&&w.Display.includes(g)).map(w=>({action:w.Action,display:w.Display,author:w.CreatedBy?w.CreatedBy.Name:"Unknown",time:new Date(w.CreatedDate).toLocaleString()})).slice(0,10)}}catch(n){console.error("Audit trail query error:",n)}})}catch(o){console.error("Salesforce query error:",o)}else m="Unsupported Metadata Type",a="N/A";return{fileName:i,gitHistory:r,sfAuthor:m,sfTime:a,sfCreatedBy:f,auditHistory:u}}function Ho(t){let e=t.replace(/\\/g,"/");if(e.includes("/classes/")){let i=e.match(/\/classes\/([^/.]+)\.cls/);if(i)return{type:"ApexClass",name:i[1]}}if(e.includes("/triggers/")){let i=e.match(/\/triggers\/([^/.]+)\.trigger/);if(i)return{type:"ApexTrigger",name:i[1]}}if(e.includes("/lwc/")){let i=e.match(/\/lwc\/([^/]+)\//);if(i)return{type:"LightningComponentBundle",name:i[1]}}if(e.includes("/aura/")){let i=e.match(/\/aura\/([^/]+)\//);if(i)return{type:"AuraDefinitionBundle",name:i[1]}}if(e.includes("/objects/")&&e.includes("/fields/")){let i=e.match(/\/objects\/([^/]+)\//),s=e.match(/\/fields\/([^/.]+)\.field/);if(i&&s)return{type:"CustomField",name:`${i[1]}.${s[1]}`}}return null}var ve,xo,Co=k(()=>{"use strict";ve=y(require("vscode")),xo=y(require("path"));$()});function $o(t,e,i){t.subscriptions.push(x.commands.registerCommand("ricwiz.generateDestructiveChanges",at),x.commands.registerCommand("ricwiz.runSmartTests",dt),x.commands.registerCommand("ricwiz.refreshWebview",()=>{e&&x.commands.executeCommand("workbench.action.webview.reloadWebviewAction")}),x.commands.registerCommand("ricwiz.createBranches",pt),x.commands.registerCommand("ricwiz.prepareDeploy",wt),x.commands.registerCommand("ricwiz.createMergeRequests",bt),x.commands.registerCommand("ricwiz.createMergeRequestsVSCode",xt),x.commands.registerCommand("ricwiz.openJiraTicket",$t),x.commands.registerCommand("ricwiz.openJiraTicketVSCode",zt),x.commands.registerCommand("ricwiz.showJiraDetails",()=>{e&&At(e)}),x.commands.registerCommand("ricwiz.openJiraDashboard",s=>{e&&Lt(e,s)}),x.commands.registerCommand("ricwiz.openJiraDetailsForId",s=>{e&&Ft(e,s)}),x.commands.registerCommand("ricwiz.changeJiraStatus",Nt),x.commands.registerCommand("ricwiz.addJiraComment",jt),x.commands.registerCommand("ricwiz.addJiraLabel",Jt),x.commands.registerCommand("ricwiz.setJiraToken",Ut),x.commands.registerCommand("ricwiz.syncAll",qt),x.commands.registerCommand("ricwiz.updateBases",Vt),x.commands.registerCommand("ricwiz.deleteUnusedBranches",Qt),x.commands.registerCommand("ricwiz.checkoutBranch",ke),x.commands.registerCommand("ricwiz.copyBranchName",_t),x.commands.registerCommand("ricwiz.generatePackageXml",Kt),x.commands.registerCommand("ricwiz.deployPackage",to),x.commands.registerCommand("ricwiz.importData",io),x.commands.registerCommand("ricwiz.listTicketFiles",ro),x.commands.registerCommand("ricwiz.resetTracking",ao),x.commands.registerCommand("ricwiz.extractComponent",lo),x.commands.registerCommand("ricwiz.deployMultiOrg",po),x.commands.registerCommand("ricwiz.captureAdminChanges",fo),x.commands.registerCommand("ricwiz.openHistory",wo),x.commands.registerCommand("ricwiz.searchTicket",yo),x.commands.registerCommand("ricwiz.whoToBlame",async()=>{let s=await ko();s&&e&&(e.setBlameData(s),e.setPage("blame"))}),x.commands.registerCommand("ricwiz.manualRefresh",()=>{i&&i()}),x.commands.registerCommand("ricwiz.toggleAutoRefresh",()=>{if(e){let s=!e.isAutoRefreshEnabled();e.setAutoRefresh(s),x.workspace.getConfiguration("ricwiz").update("autoRefresh",s,x.ConfigurationTarget.Global)}}),x.commands.registerCommand("ricwiz.openSettings",()=>{x.commands.executeCommand("workbench.action.openSettings","ricwiz")}))}var x,zo=k(()=>{"use strict";x=y(require("vscode"));ct();lt();gt();vt();kt();Rt();It();Ot();Wt();Ht();Gt();Yt();We();Zt();eo();oo();so();no();co();mo();go();ho();vo();bo();Co()});function Ro(){let t=new Map;function e(s,r){let m=r,a=t.get(m);if(a)return a;let f=(async()=>{try{let{stdout:u}=await p(`git rev-parse origin/${r}`,{cwd:s});return u.trim()}catch{let{stdout:u}=await p(`git rev-parse ${r}`,{cwd:s});return u.trim()}})();return t.set(m,f),f}function i(s,r){let m=`branch:${r}`,a=t.get(m);if(a)return a;let f=(async()=>{let{stdout:u}=await p(`git rev-parse ${r}`,{cwd:s});return u.trim()})();return t.set(m,f),f}return{resolveEnvRef:e,resolveBranchRef:i}}async function So(t,e,i,s,r){try{if(!(await p(`git --no-pager log ${e} --grep="\\\\b${i}\\\\b" -i -E -1 --format="%h"`,{cwd:t}).catch(()=>({stdout:"",stderr:""}))).stdout.trim())return!1;let[a,f]=await Promise.all([r.resolveBranchRef(t,e),r.resolveEnvRef(t,s.sourceBranch)]);if(a===f)return!1;try{return await p(`git merge-base --is-ancestor ${e} origin/${s.sourceBranch}`,{cwd:t}),!0}catch{try{return await p(`git merge-base --is-ancestor ${e} ${s.sourceBranch}`,{cwd:t}),!0}catch{return!1}}}catch{return!1}}function Po(t,e){return e.find(i=>t.endsWith(`-to-${i.name}`))}async function Bo(t,e,i,s){let r=Ro();return await Promise.all(e.map(async a=>{let f=Po(a,s);if(!f)return{name:a,isMerged:!1};let u=await So(t,a,i,f,r);return{name:a,isMerged:u}}))}async function Eo(t,e,i){let s=Po(e,i);if(!s)return!1;let r=e.replace(new RegExp(`-to-${s.name}$`,"i"),""),m=Ro();return So(t,e,r,s,m)}async function Mo(t,e=10){try{let{stdout:i}=await p(`git log --oneline -${e} --format="%h|||%s|||%ar"`,{cwd:t});return i.split(`
`).filter(s=>s.trim()).map(s=>{let r=s.split("|||");return{hash:r[0]||"",message:r.length>=3?r.slice(1,-1).join("|||"):r[1]||"",timeAgo:r.length>=3?r[r.length-1]:""}})}catch{return[]}}async function Do(t,e=3){try{let{stdout:i}=await p('git for-each-ref --sort=-committerdate --format="%(refname:short)" refs/heads/',{cwd:t}),s=i.split(`
`).map(m=>m.trim()).filter(m=>m),r=/^[A-Z]+-\d+$/i;return s.filter(m=>r.test(m)).slice(0,e)}catch{return[]}}async function To(t,e,i){let{stdout:s}=await p(`git branch --list "*${e}*"`,{cwd:t});return s.split(`
`).map(r=>r.replace("*","").trim()).filter(r=>r&&r!==i)}var Ao=k(()=>{"use strict";$()});function Io(t,e,i){let s,r=ie.workspace.getConfiguration("ricwiz").get("autoRefresh",!0);e?.setAutoRefresh(r),t.subscriptions.push(ie.workspace.onDidChangeConfiguration(a=>{if(a.affectsConfiguration("ricwiz.autoRefresh")){let f=ie.workspace.getConfiguration("ricwiz").get("autoRefresh",!0);e?.setAutoRefresh(f)}}));async function m(){let a=ie.extensions.getExtension("vscode.git");if(a){let l=function(o){let n="",d;async function c(){let h=ie.workspace.workspaceFolders;if(!h)return;let w=h[0].uri.fsPath,R=await T(w);if(R&&R!==n){n=R;let S=ie.workspace.getConfiguration("ricwiz"),ae=S.get("ticketPrefix","SFPSCA-");if(!R.includes(ae)){let M=R.match(/([A-Z]+-)\d+/i);M&&(ae=M[1].toUpperCase())}let ue=[],pe=[],K=[],P=[],L=S.get("environments",[{name:"Qual",sourceBranch:"quality"},{name:"Val",sourceBranch:"validation"},{name:"Prod",sourceBranch:"main"}]);try{let M=S.get("workspaceCheckoutButtons",["main","quality","validation"]);K=Array.from(new Set(M))}catch{}let J="",U=R.match(new RegExp(`(${ae}\\d+(?:-\\d+)?)`,"i"));if(U){let M=U[1].toUpperCase();J=M;let W=S.get("commitMessageSuffix","- "),ce=/^[A-Z]+-\d+(?:-\d+)?\s*(?:-\s*|:\s*|\s+)?/i;ce.test(o.inputBox.value)?o.inputBox.value.toUpperCase().startsWith(M)||(o.inputBox.value=o.inputBox.value.replace(ce,`${M}${W}`)):o.inputBox.value=`${M}${W}`+o.inputBox.value,i.text=`$(bookmark) ${M}`,i.tooltip=`Branch: ${R}
Click to open Jira ticket`,i.show();try{let Ye=await To(w,M,R);ue=await Bo(w,Ye,M,L)}catch{}}else{i.hide();try{P=await Do(w)}catch{}}let[Me,De,Ce]=await Promise.all([Mo(w,10),Eo(w,R,L),J?xe(J).catch(M=>{let W=M.message;return(W.includes("ENOTFOUND")||W.includes("network"))&&(W="No Internet or Invalid URL"),{summary:`\u26A0\uFE0F Jira Error: ${W}`,description:""}}):Promise.resolve(null)]);pe=Me;let Te=Ce?Ce.summary:"";e?.updateBranch(R,De,ue,pe,K,P,Te)}}function g(){e?.isAutoRefreshEnabled()&&(d&&clearTimeout(d),d=setTimeout(()=>{n="",c()},300))}s=()=>{n="",c()},c(),o.state.onDidChange(()=>g()),ie.window.onDidChangeWindowState(h=>{h.focused&&g()})};var f=l;a.isActive||await a.activate();let u=a.exports.getAPI(1);u.repositories.length>0&&u.repositories.forEach(o=>l(o)),u.onDidOpenRepository(o=>l(o))}}return m(),s}var ie,Lo=k(()=>{"use strict";ie=y(require("vscode"));$();Ao();Re()});var je={};_e(je,{activate:()=>Vo,deactivate:()=>Go,webviewProvider:()=>Be});module.exports=ge(je);function Vo(t){Ke(t),Be=new Ie(t.extensionUri),t.subscriptions.push(Ee.window.registerWebviewViewProvider("ricwiz-webview",Be));let e=Ee.window.createStatusBarItem(Ee.StatusBarAlignment.Left,100);e.command="ricwiz.openJiraTicket",t.subscriptions.push(e);let i=Io(t,Be,e);$o(t,Be,i)}function Go(){}var Ee,Be,Je=k(()=>{Ee=y(require("vscode"));Xe();Le();zo();Lo()});Je();0&&(module.exports={activate,deactivate,webviewProvider});
