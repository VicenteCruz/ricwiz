"use strict";var Zo=Object.create;var Fe=Object.defineProperty;var Ko=Object.getOwnPropertyDescriptor;var Xo=Object.getOwnPropertyNames;var ei=Object.getPrototypeOf,ti=Object.prototype.hasOwnProperty;var k=(t,e,i)=>()=>{if(i)throw i[0];try{return t&&(e=t(t=0)),e}catch(s){throw i=[s],s}};var Qe=(t,e)=>{for(var i in e)Fe(t,i,{get:e[i],enumerable:!0})},dt=(t,e,i,s)=>{if(e&&typeof e=="object"||typeof e=="function")for(let r of Xo(e))!ti.call(t,r)&&r!==i&&Fe(t,r,{get:()=>e[r],enumerable:!(s=Ko(e,r))||s.enumerable});return t};var v=(t,e,i)=>(i=t!=null?Zo(ei(t)):{},dt(e||!t||!t.__esModule?Fe(i,"default",{value:t,enumerable:!0}):i,t)),oe=t=>dt(Fe({},"__esModule",{value:!0}),t);function C(t){return t.replace(/&/g,"&amp;").replace(/</g,"&lt;").replace(/>/g,"&gt;").replace(/"/g,"&quot;").replace(/'/g,"&#39;")}var y,Oe,lt=k(()=>{"use strict";y=v(require("vscode"));Oe=class{constructor(e){this._extensionUri=e}_extensionUri;webviewView;resolveWebviewView(e,i,s){this.webviewView=e,e.webview.options={enableScripts:!0,localResourceRoots:[this._extensionUri]},this.updateBranch("",!1),e.webview.onDidReceiveMessage(r=>{switch(r.command){case"createBranches":y.commands.executeCommand("ricwiz.createBranches");break;case"createBranchForTicket":y.commands.executeCommand("ricwiz.createBranches",r.args);break;case"prepareDeploy":y.commands.executeCommand("ricwiz.prepareDeploy");break;case"openMRs":y.commands.executeCommand("ricwiz.createMergeRequests");break;case"openMRsVSCode":y.commands.executeCommand("ricwiz.createMergeRequestsVSCode");break;case"openExternal":r.args&&y.env.openExternal(y.Uri.parse(r.args));break;case"openJira":y.commands.executeCommand("ricwiz.openJiraTicket");break;case"showJiraDetails":y.commands.executeCommand("ricwiz.showJiraDetails");break;case"changeJiraStatus":y.commands.executeCommand("ricwiz.changeJiraStatus");break;case"addJiraComment":y.commands.executeCommand("ricwiz.addJiraComment");break;case"addJiraLabel":y.commands.executeCommand("ricwiz.addJiraLabel");break;case"setPage":this.setPage(r.args);break;case"openDashboard":y.commands.executeCommand("ricwiz.openJiraDashboard");break;case"openJiraDetailsForId":y.commands.executeCommand("ricwiz.openJiraDetailsForId",r.args);break;case"refreshDashboard":y.commands.executeCommand("ricwiz.openJiraDashboard");break;case"switchDashboardQuery":y.commands.executeCommand("ricwiz.openJiraDashboard",parseInt(r.args));break;case"openJiraVSCode":y.commands.executeCommand("ricwiz.openJiraTicketVSCode");break;case"openSettings":y.commands.executeCommand("ricwiz.openSettings");break;case"checkout":r.branch&&y.commands.executeCommand("ricwiz.checkoutBranch",r.branch);break;case"copyBranch":y.commands.executeCommand("ricwiz.copyBranchName");break;case"generatePackageXml":y.commands.executeCommand("ricwiz.generatePackageXml");break;case"openDevTools":this.setPage("devtools");break;case"openMain":this.setPage("main");break;case"generateDestructiveChanges":y.commands.executeCommand("ricwiz.generateDestructiveChanges");break;case"deployPackage":y.commands.executeCommand("ricwiz.deployPackage");break;case"runSmartTests":y.commands.executeCommand("ricwiz.runSmartTests");break;case"importData":y.commands.executeCommand("ricwiz.importData");break;case"listTicketFiles":y.commands.executeCommand("ricwiz.listTicketFiles");break;case"resetTracking":y.commands.executeCommand("ricwiz.resetTracking");break;case"extractComponent":y.commands.executeCommand("ricwiz.extractComponent");break;case"deployMultiOrg":y.commands.executeCommand("ricwiz.deployMultiOrg");break;case"captureAdminChanges":y.commands.executeCommand("ricwiz.captureAdminChanges");break;case"whoToBlame":y.commands.executeCommand("ricwiz.whoToBlame");break;case"syncAll":y.commands.executeCommand("ricwiz.syncAll");break;case"updateBases":y.commands.executeCommand("ricwiz.updateBases");break;case"deleteUnused":y.commands.executeCommand("ricwiz.deleteUnusedBranches");break;case"conflict_commitAndContinue":y.commands.executeCommand("ricwiz.conflictAction","commitAndContinue");break;case"conflict_resolveDeletions":y.commands.executeCommand("ricwiz.conflictAction","resolveDeletions");break;case"conflict_abortDeploy":y.commands.executeCommand("ricwiz.conflictAction","abortDeploy");break;case"openFile":if(r.file){let p=y.workspace.workspaceFolders;if(p){let a=y.Uri.joinPath(p[0].uri,r.file);y.commands.executeCommand("vscode.open",a)}}break;case"searchTicket":y.commands.executeCommand("ricwiz.searchTicket");break;case"manualRefresh":y.commands.executeCommand("ricwiz.manualRefresh");break;case"toggleAutoRefresh":y.commands.executeCommand("ricwiz.toggleAutoRefresh");break;case"openHistory":y.commands.executeCommand("ricwiz.openHistory");break}})}conflictState=null;setConflictState(e){this.conflictState=e,this.updateView()}updateBranch(e,i,s=[],r=[],p=[],a=[],u=""){this.webviewView&&(this.currentBranchCache=e,this.currentBranchIsMergedCache=i,this.relatedBranchesCache=s,this.commitsCache=r,this.baseBranchesCache=p,this.recentTicketsCache=a,this.ticketTitleCache=u,this.updateView())}currentBranchCache="";currentBranchIsMergedCache=!1;relatedBranchesCache=[];commitsCache=[];baseBranchesCache=[];recentTicketsCache=[];ticketTitleCache="";currentPage="main";blameDataCache=null;jiraDataCache=null;dashboardDataCache=null;autoRefreshEnabled=!0;setBlameData(e){this.blameDataCache=e}setJiraData(e){this.jiraDataCache=e}setDashboardData(e){this.dashboardDataCache=e}setAutoRefresh(e){this.autoRefreshEnabled=e,this.updateView()}isAutoRefreshEnabled(){return this.autoRefreshEnabled}setPage(e){this.currentPage=e,this.updateView()}updateView(){if(!this.webviewView)return;let e=this.webviewView.webview.asWebviewUri(y.Uri.joinPath(this._extensionUri,"resources","logo.png"));this.webviewView.webview.html=this._getHtmlForWebview(e,this.currentBranchCache,this.relatedBranchesCache,this.commitsCache,this.baseBranchesCache,this.recentTicketsCache,this.currentPage)}_getHtmlForWebview(e,i,s,r,p,a,u){let m=r.length>0?`
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
        `;if(this.conflictState){let o=(this.conflictState.files||[]).map(n=>`
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
            </html>`}if(u==="jira"){let o=this.jiraDataCache,n=o?.ticketId||"Jira",d=o?.summary||"No Title",l=o?.description||"No description provided.",g=o?.relatedBranches||[];return`<!DOCTYPE html>
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
                    <span style="font-weight: 600; font-size: 13px;">${n} Details</span>
                </div>
                
                <div class="card" style="padding: 16px;">
                    <div class="jira-title">${C(d)}</div>
                    <div class="jira-desc">${C(l)}</div>
                    
                    ${g.length>0?`
                        <div style="margin-top: 16px; border-top: 1px solid var(--vscode-panel-border); padding-top: 12px;">
                            <div style="font-size: 11px; opacity: 0.7; margin-bottom: 8px; text-transform: uppercase; font-weight: bold;"><span class="icon">\u{1F33F}</span> Related Branches & MRs</div>
                            <div style="display: flex; flex-direction: column; gap: 4px;">
                                ${g.map(h=>{let w="";return h.pipelineStatus==="running"?w="\u23F3":h.pipelineStatus==="success"?w="\u2705":h.pipelineStatus==="failed"?w="\u274C":h.pipelineStatus==="canceled"?w="\u{1F6D1}":h.pipelineStatus==="skipped"&&(w="\u23ED\uFE0F"),`
                                    <div class="btn" style="padding: 6px 10px; font-size: 12px; display: flex; justify-content: space-between; align-items: center; background-color: var(--vscode-button-secondaryBackground); color: var(--vscode-button-secondaryForeground); border-radius: 4px;" onclick="sendCheckoutCommand('${C(h.name)}')" title="Checkout ${C(h.name)}">
                                        <div style="display: flex; align-items: center; gap: 6px; overflow: hidden;">
                                            <span style="overflow: hidden; text-overflow: ellipsis; white-space: nowrap; font-weight: bold;">${C(h.name)}</span>
                                            ${w?`<span title="Pipeline: ${h.pipelineStatus}" style="font-size: 11px;">${w}</span>`:""}
                                        </div>
                                        <div style="display: flex; gap: 6px; align-items: center;">
                                            ${h.mrUrl?`<span onclick="event.stopPropagation(); sendCommand('openExternal', '${h.mrUrl}');" title="Open Merge Request" style="cursor: pointer; font-size: 12px;">\u{1F517}</span>`:""}
                                            ${h.isMerged?'<span style="background-color: var(--vscode-charts-green); color: white; border-radius: 3px; padding: 2px 6px; font-size: 10px; font-weight: bold;" title="Merged to target env">MERGED</span>':""}
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
            </html>`}if(u==="dashboard"){let o=this.dashboardDataCache||{queries:[],selectedIndex:0,results:[],error:null},n=o.queries.map((l,g)=>`
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
                    ${s.length>0?`
                        <div style="margin-top: 10px; border-top: 1px solid var(--vscode-panel-border); padding-top: 10px;">
                            <div style="font-size: 10px; opacity: 0.7; margin-bottom: 6px; text-transform: uppercase; text-align: center;">Sister Branches</div>
                            <div style="display: flex; flex-direction: column; gap: 4px;">
                                ${s.map(o=>{let n="";return o.pipelineStatus==="running"?n="\u23F3":o.pipelineStatus==="success"?n="\u2705":o.pipelineStatus==="failed"?n="\u274C":o.pipelineStatus==="canceled"?n="\u{1F6D1}":o.pipelineStatus==="skipped"&&(n="\u23ED\uFE0F"),`
                                    <div class="btn" style="padding: 4px 8px; font-size: 11px; display: flex; justify-content: space-between; align-items: center; background-color: var(--vscode-button-secondaryBackground); color: var(--vscode-button-secondaryForeground); border-radius: 4px;" onclick="sendCheckoutCommand('${C(o.name)}', this)" title="Checkout ${C(o.name)}">
                                        <div style="display: flex; align-items: center; gap: 4px; overflow: hidden;">
                                            <span style="overflow: hidden; text-overflow: ellipsis; white-space: nowrap; font-weight: bold;">${C(o.name)}</span>
                                            ${n?`<span title="Pipeline: ${o.pipelineStatus}" style="font-size: 10px;">${n}</span>`:""}
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
        </html>`}}});function mt(t){ae=t.secrets}async function ut(t){if(!ae)throw new Error("SecretStorage is not initialized.");await ae.store("ricwiz.jiraApiToken",t)}async function pt(){if(!ae)throw new Error("SecretStorage is not initialized.");return await ae.get("ricwiz.jiraApiToken")}async function gt(t){if(!ae)throw new Error("SecretStorage is not initialized.");await ae.store("ricwiz.gitlabApiToken",t)}async function Ye(){if(!ae)throw new Error("SecretStorage is not initialized.");return await ae.get("ricwiz.gitlabApiToken")}var ae,xe=k(()=>{"use strict"});var Se={};Qe(Se,{checkBranchExists:()=>pe,exec:()=>f,extractTicketSuggestion:()=>vt,getCurrentBranch:()=>D,getWorkspaceCwd:()=>b,normalizeTicketId:()=>bt,promptForTicketId:()=>N,resolvePrefix:()=>wt,ricwizLogger:()=>M});function b(){let t=ke.workspace.workspaceFolders;if(t)return t[0].uri.fsPath}async function D(t){try{let{stdout:e}=await f("git branch --show-current",{cwd:t});return e.trim()}catch{return""}}function wt(t,e){if(!t.includes(e)){let i=t.match(/([A-Z]+-)\d+/i);if(i)return i[1].toUpperCase()}return e}function vt(t,e,i=!1){let s=t.match(new RegExp(`(${e}\\d+)`,"i"));return s?s[1].toUpperCase():t.includes(e)&&!t.includes("-to-")?t.substring(t.indexOf(e)):i&&t.includes("-to-")?t.substring(t.indexOf(e)).split("-to-")[0]:""}function bt(t,e){let i=t.trim();return/^\d/.test(i)?`${e}${i}`.toUpperCase():i.toUpperCase()}async function N(t,e){let i=ke.workspace.getConfiguration("ricwiz"),s=e?.prefix??i.get("ticketPrefix","SFPSCA-"),r=await D(t),p=wt(r,s),a=e?.suggestedValue??vt(r,p,e?.handleToSuffix),u=await ke.window.showInputBox({prompt:e?.prompt||"Enter the full ticket ID (e.g., SCPSCA-1234) or just the number",placeHolder:e?.placeHolder||"Ticket ID or number",value:a});return u?{ticketId:bt(u,p),currentBranch:r,prefix:p}:void 0}async function pe(t,e){try{return await f(`git show-ref --verify --quiet refs/heads/${e}`,{cwd:t}),!0}catch{}try{return await f(`git show-ref --verify --quiet refs/remotes/origin/${e}`,{cwd:t}),!0}catch{}return!1}var ke,ft,ht,oi,M,f,$=k(()=>{"use strict";ke=v(require("vscode")),ft=v(require("child_process")),ht=v(require("util")),oi=ht.promisify(ft.exec),M=ke.window.createOutputChannel("Ricwiz"),f=async(t,e)=>{M.appendLine(`[EXEC] ${t}`);let i=await oi(t,{maxBuffer:50*1024*1024,...e});return{stdout:i.stdout.toString(),stderr:i.stderr.toString()}}});async function yt(){let t=b();if(!t){U.window.showErrorMessage("Ricwiz: Open a workspace that is a Git repository.");return}let i=U.workspace.getConfiguration("ricwiz").get("ticketSourceBranch","main");await U.window.withProgress({location:U.ProgressLocation.Notification,title:`Ricwiz: Finding deleted files compared to origin/${i}...`,cancellable:!1},async()=>{try{let{stdout:s}=await f(`git diff --name-only --diff-filter=D origin/${i}...HEAD`,{cwd:t}),r=s.split(`
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
</Package>`,"utf8");let n=await U.workspace.openTextDocument(c);await U.window.showTextDocument(n),U.window.showInformationMessage("Ricwiz: destructiveChanges.xml generated successfully!")}catch(s){U.window.showErrorMessage(`Ricwiz: Error generating destructive changes: ${s.message}`)}})}var U,Ne,ge,xt=k(()=>{"use strict";U=v(require("vscode")),Ne=v(require("path")),ge=v(require("fs"));$()});async function kt(){let t=b();if(!t)return;let i=ie.workspace.getConfiguration("ricwiz").get("ticketSourceBranch","main");await ie.window.withProgress({location:ie.ProgressLocation.Notification,title:"Ricwiz: Finding Apex Tests to run...",cancellable:!1},async()=>{try{let{stdout:s}=await f(`git diff --name-status origin/${i}...HEAD`,{cwd:t}),r=s.split(`
`).map(d=>d.trim()).filter(d=>d.length>0),p=new Set,a=new Set;for(let d of r){let l=d.split(/\s+/);if(l[0].startsWith("D"))continue;let g=l[1];if(g&&g.endsWith(".cls")){let h=g.match(/\/classes\/([^/.]+)\.cls/);if(h){let w=h[1];w.toLowerCase().endsWith("test")?p.add(w):a.add(w)}}}for(let d of a)p.add(`${d}Test`);if(p.size===0){ie.window.showInformationMessage("Ricwiz: No Apex Classes were modified in this branch.");return}let u=Array.from(p).map(d=>({label:`$(beaker) ${d}`,description:"Apex Test Class"})),m=await ie.window.showQuickPick(u,{canPickMany:!0,title:"Select Test Classes to Run",placeHolder:"Select tests..."});if(!m||m.length===0)return;let o=`sf apex run test -n ${m.map(d=>d.label.replace("$(beaker) ","").trim()).join(",")} -r human -w 30`,n=ie.window.createTerminal("Ricwiz: Smart Tests");n.show(),n.sendText(o)}catch(s){ie.window.showErrorMessage(`Ricwiz: Error finding tests: ${s.message}`)}})}var ie,Ct=k(()=>{"use strict";ie=v(require("vscode"));$()});var we,$t=k(()=>{"use strict";we=class{static isValidShellArg(e){return e?/^[a-zA-Z0-9\-_/.]+$/.test(e):!1}}});var Pe,zt,Ue,A,ce=k(()=>{"use strict";Pe=v(require("vscode")),zt=v(require("path")),Ue=v(require("fs")),A=class t{style;upstreamRemote;originRemote;ticketSourceBranch;ticketPrefix;environments;static baseConfig=Pe.workspace.getConfiguration("ricwiz");activeProfile;profileName;constructor(e){this.activeProfile=e,this.profileName=e?.name;let i=t.baseConfig;this.style=e?.workflowStyle||i.get("workflowStyle","standard"),this.style==="multi-remote"?(this.upstreamRemote=e?.upstreamRemote||i.get("upstreamRemote","salesforce-master"),this.originRemote=e?.originRemote||i.get("originRemote","origin")):(this.upstreamRemote="origin",this.originRemote="origin"),this.ticketSourceBranch=e?.ticketSourceBranch||i.get("ticketSourceBranch","main"),this.ticketPrefix=e?.ticketPrefix||i.get("ticketPrefix","SFPSCA-");let s=[{name:"Qual",sourceBranch:"quality"},{name:"Val",sourceBranch:"validation"},{name:"Prod",sourceBranch:"main"}];this.environments=e?.environments||i.get("environments",s)}getConfig(e,i){return this.activeProfile&&this.activeProfile[e]!==void 0?this.activeProfile[e]:t.baseConfig.get(e,i)}static async initialize(e,i){let s=t.baseConfig.get("profiles",[]),r=zt.join(e,"ricwiz.json");if(Ue.existsSync(r))try{let p=Ue.readFileSync(r,"utf-8"),a=JSON.parse(p);a&&Array.isArray(a.profiles)&&(s=[...s,...a.profiles])}catch(p){Pe.window.showErrorMessage(`Ricwiz: Error parsing ricwiz.json: ${p.message}`)}if(s.length>0){if(!i?.forcePrompt)try{let{exec:m}=($(),oe(Se)),{stdout:c}=await m("git branch --show-current",{cwd:e}),o=c.trim(),n=o;o.includes("-to-")&&(n=o.split("-to-")[0]);let{stdout:d}=await m(`git config branch.${n}.ricwiz-profile`,{cwd:e}),l=d.trim();if(l){let g=s.find(h=>h.name===l);if(g)return new t(g)}}catch{}let p=s.map(m=>m.name),a=await Pe.window.showQuickPick(p,{placeHolder:"Ricwiz: Select Workflow Profile",ignoreFocusOut:!0});if(!a)return;let u=s.find(m=>m.name===a);return new t(u)}return new t}buildUpstreamPath(e){return e.includes("/")?e:`${this.upstreamRemote}/${e}`}getFetchRemote(e){return e.includes("/")?e.split("/")[0]:this.upstreamRemote}getFetchBranch(e){return e.includes("/")?e.substring(e.indexOf("/")+1):e}}});async function Rt(t){let e=b();if(!e){B.window.showErrorMessage("Open a folder or workspace that is a Git repository.");return}let i=await A.initialize(e,{forcePrompt:!0});if(!i)return;let s=typeof t=="string"?t:void 0,r=await N(e,{prefix:i.ticketPrefix,suggestedValue:s});if(!r){B.window.showErrorMessage("Branch creation cancelled: Ticket not provided.");return}let{ticketId:p}=r,a=i.environments,u="all",m=[{label:"Create Main Branch & Environments",description:"Creates the main ticket branch and all environment branches",value:"all"},{label:"Create Main Branch Only",description:"Creates only the main ticket branch (skips environments)",value:"mainOnly"},{label:"Create Environments Only",description:"Creates only the environment branches (skip main branch)",value:"envs"}];if(a.length>0){let n=await B.window.showQuickPick(m,{placeHolder:"Ricwiz: What do you want to create?",ignoreFocusOut:!0});if(!n)return;u=n.value}let c=i.ticketSourceBranch;if(u==="all"||u==="mainOnly"){let n=[];try{let{stdout:h}=await f('git branch --all --format="%(refname:short)"',{cwd:e});n=h.split(`
`).map(w=>w.trim()).filter(w=>w&&w!=="origin"),n=[...new Set(n)]}catch{}let d=B.window.createQuickPick();d.title="Ricwiz: Ticket Source Branch",d.placeholder="Confirm or change the source branch for this ticket",d.value=i.ticketSourceBranch,d.ignoreFocusOut=!0;let l=()=>{let h=d.value.trim(),w=[];h&&w.push({label:h,description:"Use typed branch"}),w.push(...n.map(R=>({label:R}))),d.items=w};d.onDidChangeValue(l),l();let g=await new Promise(h=>{d.onDidAccept(()=>{let w=d.selectedItems[0];h(w?w.label:d.value),d.hide()}),d.onDidHide(()=>h(void 0)),d.show()});if(!g){B.window.showInformationMessage("Branch creation cancelled.");return}c=g.trim()}let o=p;if(!we.isValidShellArg(o)){B.window.showErrorMessage(`Invalid format for ticket ID: ${o}`);return}if(!we.isValidShellArg(c)){B.window.showErrorMessage(`Invalid format for ticketSourceBranch in settings: ${c}`);return}for(let n of a){if(!we.isValidShellArg(n.name)){B.window.showErrorMessage(`Invalid format for environment name in settings: ${n.name}`);return}if(!we.isValidShellArg(n.sourceBranch)){B.window.showErrorMessage(`Invalid format for environment sourceBranch in settings: ${n.sourceBranch}`);return}}try{await f("git status",{cwd:e})}catch{B.window.showErrorMessage("The opened folder does not appear to be a valid Git repository.");return}try{await B.window.withProgress({location:B.ProgressLocation.Notification,title:"Ricwiz: Creating Branches",cancellable:!1},async n=>{let d=[];n.report({message:"Checking remote status (git fetch)...",increment:10});try{await f("git fetch",{cwd:e})}catch{}try{if(u==="all"||u==="mainOnly"){if(n.report({message:`Creating main branch ${o}...`,increment:10}),await pe(e,o))B.window.showInformationMessage(`Ricwiz: The branch ${o} already exists. Skipping creation...`),await f(`git checkout ${o}`,{cwd:e});else try{let l=i.getFetchRemote(c),g=i.getFetchBranch(c),h=i.buildUpstreamPath(c);await f(`git fetch ${l} ${g}`,{cwd:e}),await f(`git checkout -b ${o} ${h}`,{cwd:e}),d.push(o)}catch{try{await f(`git checkout -b ${o} ${c}`,{cwd:e}),d.push(o)}catch{throw new Error(`Could not create main branch '${o}' from '${c}'. Does the source branch exist?`)}}try{await f(`git config branch.${o}.ricwiz-source "${c}"`,{cwd:e}),i.profileName&&await f(`git config branch.${o}.ricwiz-profile "${i.profileName}"`,{cwd:e})}catch{}}if(u==="all"||u==="envs"){let l=50/(a.length||1);for(let g of a){let h=`${p}-to-${g.name}`,w=g.sourceBranch;if(n.report({message:`Processing environment branch ${h}...`,increment:l}),!await pe(e,h))try{let R=i.buildUpstreamPath(w);await f(`git checkout -b ${h} ${R}`,{cwd:e}),d.push(h)}catch{try{await f(`git checkout -b ${h} ${w}`,{cwd:e}),d.push(h)}catch{throw new Error(`Could not create environment branch '${h}' from '${w}'. Does the source branch exist?`)}}}}n.report({message:`Publishing branches to ${i.originRemote}...`,increment:10});for(let l of d)try{await f(`git push -u ${i.originRemote} ${l}`,{cwd:e})}catch{B.window.showWarningMessage(`Ricwiz: Branch ${l} was created locally but could not be pushed to ${i.originRemote}.`)}if(u==="all"||u==="mainOnly"){n.report({message:`Switching to ${o}...`,increment:10});try{await f(`git checkout ${o}`,{cwd:e})}catch{}}n.report({increment:100}),B.window.showInformationMessage("Ricwiz: All set! You can start working on your branches! \u{1F680}")}catch(l){if(B.window.showErrorMessage(`Ricwiz Branch Creation Failed: ${l.message}`),d.length>0){try{await f(`git checkout ${c}`,{cwd:e})}catch{}for(let g of d)try{await f(`git branch -D ${g}`,{cwd:e})}catch{}B.window.showWarningMessage(`Ricwiz: Rolled back (deleted) ${d.length} branch(es) locally due to failure.`)}}})}catch(n){B.window.showErrorMessage(`Ricwiz general error: ${n.message}`)}}var B,St=k(()=>{"use strict";B=v(require("vscode"));$();$t();ce()});async function ve(t,e,i,s){s&&s.report({message:"CONFLICT! Resolve & click 'Commit & Continue' in Ricwiz panel."});let r=!1,p=!1,a=async()=>{try{let{stdout:o}=await f("git status --porcelain",{cwd:t});return o.split(`
`).filter(n=>{let d=n.substring(0,2);return["UD","DU","DD","AU","UA"].includes(d)}).map(n=>n.substring(3).trim())}catch{return[]}},u=async()=>{try{let{stdout:o}=await f("git status --porcelain",{cwd:t}),n=d=>d==="UU"?"Both Modified":d==="UD"?"Deleted by them":d==="DU"?"Deleted by us":d==="DD"?"Both Deleted":d==="AA"?"Both Added":d==="AU"?"Added by us":d==="UA"?"Added by them":"Conflicted";return o.split(`
`).map(d=>d.trimRight()).filter(d=>d.length>2).filter(d=>{let l=d.substring(0,2);return["UU","AA","UD","DU","AU","UA","DD"].includes(l)}).map(d=>{let l=d.substring(0,2);return{file:d.substring(3).trim(),state:n(l)}})}catch{return[]}},m=async()=>{if(r)return;let o=await a(),n=await u(),{webviewProvider:d}=(Je(),oe(je));d&&d.setConflictState({isConflict:!0,sourceStr:e,targetStr:i,deletionsCount:o.length,files:n})},c=ne.commands.registerCommand("ricwiz.conflictAction",async o=>{if(o==="abortDeploy")p=!0;else if(o==="resolveDeletions"){try{let d=(await a()).map(g=>({label:g})),l=await ne.window.showQuickPick(d,{canPickMany:!0,placeHolder:"Select conflicted files to DELETE",title:"Ricwiz: Delete Conflicted Files"});if(l&&l.length>0){for(let g of l)try{await f(`git rm --force "${g.label}"`,{cwd:t})}catch{}ne.window.showInformationMessage(`Ricwiz: Deleted ${l.length} conflicted file(s).`)}}catch(n){ne.window.showErrorMessage(`Ricwiz: Error. (${n.message})`)}m()}else if(o==="commitAndContinue")try{let d=(await a()).filter(g=>Pt.existsSync(Bt.join(t,g)));if(d.length>0&&await ne.window.showWarningMessage(`Wait! There are ${d.length} file(s) with deletion conflicts that are still on your disk.

If you commit now, you will KEEP them in the project.

Are you sure you want to KEEP them?`,{modal:!0},"Yes, KEEP them","No, let me DELETE them")!=="Yes, KEEP them"){m();return}let l=!1;try{let{stdout:g}=await f('git grep -E "^<<<<<<< "',{cwd:t});g.trim().length>0&&(l=!0)}catch{}if(l){ne.window.showErrorMessage("Ricwiz: You still have unresolved conflict markers (<<<<<<<) in your files. Please resolve them first!"),m();return}await f("git add .",{cwd:t}),await f("git commit --no-edit",{cwd:t})}catch(n){ne.window.showErrorMessage(`Ricwiz: Could not commit automatically. (${n.message})`),m()}});for(m();;){if(p){r=!0,c.dispose(),(Je(),oe(je)).webviewProvider?.setConflictState(null);try{await f("git merge --abort",{cwd:t})}catch{}return!1}try{let{stdout:o}=await f("git status --porcelain",{cwd:t});if(o.trim().length===0)return r=!0,c.dispose(),(Je(),oe(je)).webviewProvider?.setConflictState(null),ne.window.showInformationMessage("Ricwiz: Changes committed!"),!0}catch{}await new Promise(o=>setTimeout(o,2e3))}}var ne,Pt,Bt,We=k(()=>{"use strict";ne=v(require("vscode")),Pt=v(require("fs")),Bt=v(require("path"));$()});async function Et(){let t=b();if(!t){F.window.showErrorMessage("Ricwiz: Open a folder or workspace that is a Git repository.");return}try{await f("git status",{cwd:t})}catch{F.window.showErrorMessage("Ricwiz: The opened folder does not appear to be a valid Git repository.");return}let e=await A.initialize(t);if(!e)return;let i=e.environments,s=await N(t,{prefix:e.ticketPrefix});if(!s){F.window.showErrorMessage("Operation cancelled: Ticket not provided.");return}let{ticketId:r,currentBranch:p}=s,a=r;if(!await pe(t,a)){F.window.showErrorMessage(`Ricwiz: Main branch '${a}' does not exist! Prepare deploy is only available when a main ticket branch is used.`);return}let u=e.getConfig("defaultReviewers",""),m="";try{let{stdout:c}=await f(`git config branch.${r}.ricwiz-reviewers`,{cwd:t});m=c.trim()}catch{}if(u.trim()){let c=await F.window.showInputBox({prompt:"Ricwiz: Reviewers for this deploy (optional, comma-separated)",placeHolder:"e.g. @joao, 123456",value:m||u,ignoreFocusOut:!0});if(c===void 0)return;try{c.trim()?await f(`git config branch.${r}.ricwiz-reviewers "${c.trim()}"`,{cwd:t}):m&&await f(`git config --unset branch.${r}.ricwiz-reviewers`,{cwd:t})}catch{}}await F.window.withProgress({location:F.ProgressLocation.Notification,title:"Ricwiz: Preparing Deploy",cancellable:!0},async(c,o)=>{let n=0,d=p,l=!1;o.onCancellationRequested(()=>{l=!0}),c.report({message:"Syncing remote information...",increment:10});try{await f("git fetch --all",{cwd:t});let h=10/(i.length||1);for(let w of i)try{if(l)throw new Error("Aborted");c.report({message:`Fetching ${w.sourceBranch}...`,increment:h});let R=e.getFetchRemote(w.sourceBranch),S=e.getFetchBranch(w.sourceBranch);await f(`git fetch ${R} ${S}:${S}`,{cwd:t})}catch{}}catch{}let g=60/(i.length||1);for(let h of i){if(l)break;let w=`${r}-to-${h.name}`,R=h.sourceBranch;try{c.report({message:`Processing ${w}...`,increment:g/4}),await f(`git checkout ${w}`,{cwd:t});try{await f(`git pull ${e.originRemote} ${w}`,{cwd:t})}catch{}let S=async te=>{try{await f(`git merge ${te}`,{cwd:t})}catch(P){let L=!1;try{let{stdout:W}=await f("git ls-files -u",{cwd:t});W.trim().length>0&&(L=!0)}catch{}let J=((P.stdout||"")+(P.stderr||"")+(P.message||"")).toLowerCase();if(L||J.includes("conflict")||J.includes("conflit")){if(!await ve(t,te,w,c))throw l=!0,new Error("Deploy aborted by user.")}else throw P}};c.report({message:`Merging ${R} into ${w}...`,increment:g/4});let me=e.getFetchRemote(R),fe=e.getFetchBranch(R),he=e.buildUpstreamPath(R);if(await f(`git fetch ${me} ${fe}`,{cwd:t}),await S(he),c.report({message:`Merging ${a} into ${w}...`,increment:g/4}),await S(a),l)break;c.report({message:`Pushing ${w}...`,increment:g/4}),await f(`git push ${e.originRemote} ${w}`,{cwd:t}),n++}catch(S){S.message.includes("aborted")?F.window.showInformationMessage("Ricwiz: Deploy cancelled."):F.window.showErrorMessage(`Ricwiz: Failed to process branch ${w}. Detail: ${S.message}`);return}}if(!l){c.report({message:"Finishing up...",increment:10});let h=d;try{await f(`git show-ref --verify --quiet refs/heads/${a}`,{cwd:t}),h=a}catch{}try{let w=await D(t);h&&h!==w?(await f(`git checkout ${h}`,{cwd:t}),F.window.showInformationMessage(`Ricwiz: Operation complete. Back on branch ${h}.`)):F.window.showInformationMessage("Ricwiz: Operation complete.")}catch{F.window.showInformationMessage("Ricwiz: Operation complete.")}}})}var F,Tt=k(()=>{"use strict";F=v(require("vscode"));$();We();ce()});async function Mt(t=!1){let e=b();if(!e)return;let i=await A.initialize(e);if(!i)return;let s=await N(e,{prompt:"Enter the full ticket ID for the Merge Requests (e.g., SCPSCA-1234) or just the number"});if(!s)return;let{ticketId:r}=s,a=Z.workspace.getConfiguration("ricwiz").get("gitlabUrlOverride",""),u="";if(a&&a.trim()!=="")u=a.trim().replace(/\/+$/,"");else{let o="";try{let{stdout:n}=await f("git remote get-url origin",{cwd:e});o=n.trim()}catch{Z.window.showErrorMessage("Ricwiz: Could not get the remote origin URL. Please configure the URL manually in the extension settings.");return}u=o,u.endsWith(".git")&&(u=u.slice(0,-4)),u.startsWith("git@")&&(u=u.replace("git@","").replace(":","/"),u=`https://${u}`)}let m=[],c=i.ticketSourceBranch;try{let{stdout:o}=await f(`git config branch.${r}.ricwiz-source`,{cwd:e});o.trim()&&(c=o.trim())}catch{}if(i.environments.length===0)m.push({source:r,target:c});else for(let o of i.environments)m.push({source:`${r}-to-${o.name}`,target:o.sourceBranch});for(let o of m){let n=`${u}/-/merge_requests/new?merge_request[source_branch]=${o.source}&merge_request[target_branch]=${o.target}`;t?Z.commands.executeCommand("simpleBrowser.show",n):Z.env.openExternal(Z.Uri.parse(n))}Z.window.showInformationMessage(`Ricwiz: Opening ${t?"VS Code browser":"external browser"} for Merge Requests!`)}async function Dt(){return Mt(!1)}async function At(){return Mt(!0)}var Z,It=k(()=>{"use strict";Z=v(require("vscode"));$();ce()});async function Lt(t=!1){let e=b();if(!e)return;let i=K.workspace.getConfiguration("ricwiz"),s=i.get("jiraUrl","");if(!s||s.trim()===""){K.window.showErrorMessage("Ricwiz: Jira URL is not configured. Please set it in the extension settings (e.g., https://jira.company.com/browse/).");return}let{getCurrentBranch:r,resolvePrefix:p,extractTicketSuggestion:a}=($(),oe(Se)),u=await r(e),m=i.get("ticketPrefix","SFPSCA-"),c=p(u,m),n=a(u,c,!0);if(n){let{normalizeTicketId:l}=($(),oe(Se));n=l(n,c)}else{let l=await N(e,{prompt:"Ricwiz could not detect the ticket from the branch name. Enter Jira ticket ID (e.g. SFPSCA-1234)",handleToSuffix:!0});if(!l)return;n=l.ticketId}let d=s.trim();d.endsWith("/")||(d+="/"),d+=n,t?K.commands.executeCommand("simpleBrowser.show",d):K.env.openExternal(K.Uri.parse(d)),K.window.showInformationMessage(`Ricwiz: Opening Jira Ticket ${n} in ${t?"VS Code":"browser"}!`)}async function Ft(){return Lt(!1)}async function Ot(){return Lt(!0)}var K,Nt=k(()=>{"use strict";K=v(require("vscode"));$()});async function ii(){let t=jt.workspace.getConfiguration("ricwiz"),e=t.get("jiraUrl",""),i=t.get("jiraEmail","")?.trim(),s=(await pt())?.trim();if(!e||!s)throw new Error('Jira API Token is not securely configured. Please run the "Ricwiz: Set Secure Jira API Token" command.');let r=e;r.includes("/browse")&&(r=r.split("/browse")[0]),r.endsWith("/")&&(r=r.slice(0,-1));let p=i?`Basic ${Buffer.from(`${i}:${s}`).toString("base64")}`:`Bearer ${s}`;return{baseUrl:r,headerAuth:p}}async function Ce(t,e,i){let{baseUrl:s,headerAuth:r}=await ii(),p=new URL(`${s}${e}`);return new Promise((a,u)=>{let m=Ut.request(p,{method:t,headers:{Authorization:r,Accept:"application/json",...i?{"Content-Type":"application/json"}:{}}},c=>{let o="";c.on("data",n=>o+=n),c.on("end",()=>{if(c.statusCode===401||c.statusCode===403)return u(new Error(`Authentication failed (HTTP ${c.statusCode}). Please check your Jira settings.`));if(c.statusCode&&c.statusCode>=400){let n="";try{let d=JSON.parse(o);d.errorMessages&&d.errorMessages.length>0&&(n=d.errorMessages.join(", "))}catch{}return c.statusCode===404||c.statusCode===410?u(new Error(`Ticket not found or deleted (HTTP ${c.statusCode}). ${n}`)):u(new Error(`Jira API returned HTTP status ${c.statusCode}. ${n}`))}if(!o)return a({});try{let n=JSON.parse(o);a(n)}catch{u(new Error("Failed to parse Jira response."))}})});m.on("error",c=>u(new Error(`Network error: ${c.message}`))),i&&m.write(JSON.stringify(i)),m.end()})}async function $e(t){let e=await Ce("GET",`/rest/api/2/issue/${t}`);return e&&e.fields?{summary:e.fields.summary||"",description:e.fields.description||"No description provided."}:null}async function Jt(t){let e=await Ce("GET",`/rest/api/2/issue/${t}/transitions`);return e&&e.transitions?e.transitions.map(i=>({id:i.id,name:i.name})):[]}async function Wt(t,e){await Ce("POST",`/rest/api/2/issue/${t}/transitions`,{transition:{id:e}})}async function qt(t,e){await Ce("POST",`/rest/api/2/issue/${t}/comment`,{body:e})}async function Gt(t,e){await Ce("PUT",`/rest/api/2/issue/${t}`,{update:{labels:[{add:e}]}})}async function Ht(t){let e=await Ce("POST","/rest/api/3/search/jql",{jql:t,maxResults:50,fields:["summary","status","assignee"]});return e&&e.issues?e.issues.map(i=>({key:i.key,summary:i.fields?.summary||"No Title",status:i.fields?.status?.name||"Unknown",assignee:i.fields?.assignee?.displayName||"Unassigned"})):[]}var Ut,jt,Be=k(()=>{"use strict";Ut=v(require("https")),jt=v(require("vscode"));xe()});async function Ke(){let t=await Ye();return!!(t&&t.trim())}async function Kt(t){let e=Zt.workspace.getConfiguration("ricwiz"),i=(await Ye())?.trim();if(!i)throw new Error("No GitLab token");let s=e.get("gitlabUrlOverride","");if(!s||s.trim()==="")if(Ze)s=Ze;else try{let{stdout:u}=await f("git remote get-url origin",{cwd:t}),m=u.trim();m.endsWith(".git")&&(m=m.slice(0,-4)),m.startsWith("git@")&&(m=m.replace("git@","").replace(":","/"),m=`https://${m}`),s=m,Ze=s}catch{throw new Error("Could not get remote origin URL.")}let r=new URL(s),p=`${r.protocol}//${r.host}`,a=Vt[t];if(!a){let u=r.pathname;u.startsWith("/")&&(u=u.substring(1)),u.endsWith("/")&&(u=u.slice(0,-1)),u.endsWith(".git")&&(u=u.slice(0,-4)),a=encodeURIComponent(u),Vt[t]=a}return{baseUrl:p,token:i,projectPath:a}}async function _t(t,e,i){let{baseUrl:s,token:r}=await Kt(t),p=new URL(`${s}${i}`);return new Promise((a,u)=>{let m=Yt.request(p,{method:e,timeout:5e3,headers:{"PRIVATE-TOKEN":r,Accept:"application/json"}},c=>{let o="";c.on("data",n=>o+=n),c.on("end",()=>{if(c.statusCode&&c.statusCode>=400)return u(new Error(`GitLab API error: ${c.statusCode}`));if(!o)return a({});try{let n=JSON.parse(o);a(n)}catch{u(new Error("Failed to parse GitLab response."))}})});m.on("timeout",()=>{m.destroy(),u(new Error("GitLab request timed out"))}),m.on("error",c=>u(new Error(`Network error: ${c.message}`))),m.end()})}async function Xe(t,e,i){let s=`${t}:${e}:${i||"any"}`,r=Qt.get(s);if(r&&Date.now()-r.timestamp<ni)return r.data;try{let{projectPath:p}=await Kt(t),a=`/api/v4/projects/${p}/merge_requests?source_branch=${encodeURIComponent(e)}&order_by=updated_at&sort=desc`;i&&(a+=`&target_branch=${encodeURIComponent(i)}`);let u=await _t(t,"GET",a);if(u&&u.length>0){let m=u[0];try{let n=await _t(t,"GET",`/api/v4/projects/${p}/merge_requests/${m.iid}`);n&&(m=n)}catch{}let c="none";if(m.head_pipeline&&m.head_pipeline.status){let n=m.head_pipeline.status;n==="success"||n==="failed"||n==="canceled"||n==="skipped"?c=n:c="running"}let o={isMerged:m.state==="merged",isOpen:m.state==="opened",pipelineStatus:c,webUrl:m.web_url};return Qt.set(s,{data:o,timestamp:Date.now()}),o}return null}catch{return null}}var Yt,Zt,Vt,Ze,Qt,ni,Xt=k(()=>{"use strict";Yt=v(require("https")),Zt=v(require("vscode"));xe();$();Vt={},Ze=null;Qt=new Map,ni=30*1e3});var st={};Qe(st,{findRelatedBranches:()=>nt,getCurrentBranchMergeStatus:()=>tt,getRecentCommits:()=>ot,getRecentTickets:()=>it,getRelatedBranchesStatus:()=>et});function eo(t,e){return e.find(i=>t.endsWith(`-to-${i.name}`))}async function et(t,e,i,s){let r=await Ke();return await Promise.all(e.map(async a=>{let u=eo(a,s);if(r){let m=u?u.sourceBranch:void 0,c=await Xe(t,a,m);if(c)return{name:a,isMerged:c.isMerged,pipelineStatus:c.pipelineStatus,mrUrl:c.webUrl}}return{name:a,isMerged:!1}}))}async function tt(t,e,i){let s=eo(e,i);if(!s)return!1;if(await Ke()){let r=await Xe(t,e,s.sourceBranch);if(r)return r.isMerged}return!1}async function ot(t,e=10){try{let{stdout:i}=await f(`git log --oneline -${e} --format="%h|||%s|||%ar"`,{cwd:t});return i.split(`
`).filter(s=>s.trim()).map(s=>{let r=s.split("|||");return{hash:r[0]||"",message:r.length>=3?r.slice(1,-1).join("|||"):r[1]||"",timeAgo:r.length>=3?r[r.length-1]:""}})}catch{return[]}}async function it(t,e=3){try{let{stdout:i}=await f('git for-each-ref --sort=-committerdate --format="%(refname:short)" refs/heads/',{cwd:t}),s=i.split(`
`).map(p=>p.trim()).filter(p=>p),r=/^[A-Z]+-\d+$/i;return s.filter(p=>r.test(p)).slice(0,e)}catch{return[]}}async function nt(t,e,i){let{stdout:s}=await f(`git branch --all --list "*${e}*"`,{cwd:t}),r=new Set;return s.split(`
`).forEach(p=>{let a=p.replace("*","").trim();if(a){if(a.startsWith("remotes/")){let u=a.split("/");u.length>2&&(a=u.slice(2).join("/"))}a&&a!==i&&!a.includes("HEAD")&&r.add(a)}}),Array.from(r)}var qe=k(()=>{"use strict";$();Xt()});async function to(t){let e=b();if(e)try{if(!await A.initialize(e))return;let r=(await D(e)).split("-to-")[0];if(!r){G.window.showErrorMessage("Ricwiz: You are not currently on a valid ticket branch.");return}await G.window.withProgress({location:G.ProgressLocation.Notification,title:`Fetching details for ${r}...`,cancellable:!1},async p=>{let a=await $e(r);if(a){let u=[];try{let{findRelatedBranches:m,getRelatedBranchesStatus:c}=(qe(),oe(st)),o=G.workspace.getConfiguration("ricwiz").get("environments",[{name:"Qual",sourceBranch:"quality"},{name:"Val",sourceBranch:"validation"},{name:"Prod",sourceBranch:"main"}]),n=await m(e,r,"");u=await c(e,n,r,o)}catch{}t.setJiraData({ticketId:r,relatedBranches:u,...a}),t.setPage("jira")}else G.window.showErrorMessage("Ricwiz: No data found for this ticket.")})}catch(i){i.message.includes("securely configured")?await G.window.showErrorMessage(i.message,"Set Token Now")==="Set Token Now"&&G.commands.executeCommand("ricwiz.setJiraToken"):G.window.showErrorMessage(`Ricwiz Jira Error: ${i.message}`)}}var G,oo=k(()=>{"use strict";G=v(require("vscode"));$();ce();Be()});async function io(t,e){let s=se.workspace.getConfiguration("ricwiz").get("jiraDashboards",[]);if(e!==void 0&&(be=e),!s||s.length===0){t.setDashboardData({queries:[],selectedIndex:0,results:[],error:"No queries defined in settings. Go to Settings > Ricwiz > Jira Dashboards."}),t.setPage("dashboard");return}be>=s.length&&(be=0);let r=s[be];t.setDashboardData({queries:s,selectedIndex:be,results:[],error:"\u23F3 Loading tickets..."}),t.setPage("dashboard");try{let p=await Ht(r.jql),a=se.workspace.workspaceFolders?.[0]?.uri.fsPath,u=[];if(a)try{let c=require("child_process"),n=require("util").promisify(c.exec),{stdout:d}=await n("git branch",{cwd:a});u=d.split(`
`).map(l=>l.replace("*","").trim()).filter(l=>l)}catch{}let m=p.map(c=>{let o=u.find(n=>n.includes(c.key));return{...c,branch:o||null}});t.setDashboardData({queries:s,selectedIndex:be,results:m,error:null}),t.setPage("dashboard")}catch(p){let a=p.message;(a.includes("ENOTFOUND")||a.includes("network"))&&(a="No Internet or Invalid URL"),t.setDashboardData({queries:s,selectedIndex:be,results:[],error:a}),t.setPage("dashboard")}}async function no(t,e){await se.window.withProgress({location:se.ProgressLocation.Notification,title:`Fetching details for ${e}...`,cancellable:!1},async()=>{try{let i=await $e(e);if(i){let s=[],r=b();if(r)try{let{findRelatedBranches:p,getRelatedBranchesStatus:a}=(qe(),oe(st)),u=se.workspace.getConfiguration("ricwiz").get("environments",[{name:"Qual",sourceBranch:"quality"},{name:"Val",sourceBranch:"validation"},{name:"Prod",sourceBranch:"main"}]),m=await p(r,e,"");s=await a(r,m,e,u)}catch{}t.setJiraData({ticketId:e,relatedBranches:s,...i}),t.setPage("jira")}else se.window.showErrorMessage(`Ricwiz: No data found for ticket ${e}.`)}catch(i){se.window.showErrorMessage(`Ricwiz Jira Error: ${i.message}`)}})}var se,be,so=k(()=>{"use strict";se=v(require("vscode"));Be();$();be=0});async function rt(){let t=b();return!t||!await A.initialize(t,{forcePrompt:!1})?void 0:(await D(t)).split("-to-")[0]}async function ro(){try{let t=await rt();if(!t){z.window.showErrorMessage("Ricwiz: You are not on a valid ticket branch.");return}let e=await z.window.withProgress({location:z.ProgressLocation.Notification,title:`Fetching available status for ${t}...`,cancellable:!1},()=>Jt(t));if(!e||e.length===0){z.window.showInformationMessage(`Ricwiz: No transitions available for ${t}.`);return}let i=e.map(r=>({label:r.name,id:r.id})),s=await z.window.showQuickPick(i,{placeHolder:`Select new status for ${t}`,ignoreFocusOut:!0});s&&(await z.window.withProgress({location:z.ProgressLocation.Notification,title:`Updating status to ${s.label}...`,cancellable:!1},()=>Wt(t,s.id)),z.window.showInformationMessage(`Ricwiz: Status for ${t} updated to ${s.label}.`))}catch(t){t.message.includes("securely configured")?z.window.showErrorMessage(t.message,"Set Token Now").then(e=>{e==="Set Token Now"&&z.commands.executeCommand("ricwiz.setJiraToken")}):z.window.showErrorMessage(`Ricwiz Jira Error: ${t.message}`)}}async function ao(){try{let t=await rt();if(!t){z.window.showErrorMessage("Ricwiz: You are not on a valid ticket branch.");return}let e=await z.window.showInputBox({prompt:`Add comment to ${t}`,placeHolder:"Type your comment here...",ignoreFocusOut:!0});e&&(await z.window.withProgress({location:z.ProgressLocation.Notification,title:`Adding comment to ${t}...`,cancellable:!1},()=>qt(t,e)),z.window.showInformationMessage(`Ricwiz: Comment added to ${t}.`))}catch(t){t.message.includes("securely configured")?z.window.showErrorMessage(t.message,"Set Token Now").then(e=>{e==="Set Token Now"&&z.commands.executeCommand("ricwiz.setJiraToken")}):z.window.showErrorMessage(`Ricwiz Jira Error: ${t.message}`)}}async function co(){try{let t=await rt();if(!t){z.window.showErrorMessage("Ricwiz: You are not on a valid ticket branch.");return}let e=await z.window.showInputBox({prompt:`Add a label to ${t}`,placeHolder:"e.g. Needs-Review, Bug, High-Priority",ignoreFocusOut:!0});e&&e.trim()&&(await z.window.withProgress({location:z.ProgressLocation.Notification,title:`Adding label to ${t}...`,cancellable:!1},()=>Gt(t,e.trim())),z.window.showInformationMessage(`Ricwiz: Label '${e.trim()}' added to ${t}.`))}catch(t){t.message.includes("securely configured")?z.window.showErrorMessage(t.message,"Set Token Now").then(e=>{e==="Set Token Now"&&z.commands.executeCommand("ricwiz.setJiraToken")}):z.window.showErrorMessage(`Ricwiz Jira Error: ${t.message}`)}}async function lo(){let t=await z.window.showInputBox({prompt:"Enter your Jira API Token (or Personal Access Token). It will be securely stored in your OS keychain.",password:!0,ignoreFocusOut:!0});if(t)try{await ut(t.trim()),z.window.showInformationMessage("Ricwiz: Jira API Token securely stored!")}catch(e){z.window.showErrorMessage(`Ricwiz: Failed to store token: ${e.message}`)}}var z,mo=k(()=>{"use strict";z=v(require("vscode"));$();ce();Be();xe()});async function uo(){let t=await j.window.showInputBox({prompt:"Enter your GitLab Personal Access Token",placeHolder:"glpat-xxxxxxxxxxxxxxxxxxxx",ignoreFocusOut:!0,password:!0});if(t&&t.trim()){let e=t.trim();await j.window.withProgress({location:j.ProgressLocation.Notification,title:"Ricwiz: Validating GitLab Token...",cancellable:!1},async()=>{try{let s=j.workspace.getConfiguration("ricwiz").get("gitlabUrlOverride","").trim();if(!s&&j.workspace.workspaceFolders)try{let{exec:m}=($(),oe(Se)),c=j.workspace.workspaceFolders[0].uri.fsPath,{stdout:o}=await m("git remote get-url origin",{cwd:c}),n=o.trim();n.startsWith("git@")&&(n=`https://${n.replace("git@","").replace(":","/")}`),n.endsWith(".git")&&(n=n.slice(0,-4)),s=n}catch{}s||(s="https://gitlab.com");let r=new URL(s),p=`${r.protocol}//${r.host}`,a=require("https"),u=await new Promise((m,c)=>{let o=a.request(new URL(`${p}/api/v4/user`),{method:"GET",timeout:5e3,headers:{"PRIVATE-TOKEN":e,Accept:"application/json"}},n=>{if(n.statusCode>=400)return c(new Error(`Status ${n.statusCode}`));let d="";n.on("data",l=>d+=l),n.on("end",()=>m(JSON.parse(d||"{}")))});o.on("error",c),o.on("timeout",()=>{o.destroy(),c(new Error("Timeout"))}),o.end()});await gt(e),j.window.showInformationMessage(`Ricwiz: \u2705 GitLab API Token saved and validated successfully for ${u.username||"user"}!`),j.commands.executeCommand("ricwiz.manualRefresh")}catch(i){j.window.showErrorMessage(`Ricwiz: \u274C Invalid token or cannot reach GitLab (${i.message}). Please check the token and try again.`)}})}}var j,po=k(()=>{"use strict";j=v(require("vscode"));xe()});async function go(){let t=b();if(!t){de.window.showErrorMessage("Ricwiz: Open a folder or workspace that is a Git repository.");return}let e=await A.initialize(t);if(!e)return;let i=await N(t,{prefix:e.ticketPrefix,prompt:"Enter the full ticket ID to sync all branches for (e.g., SCPSCA-1234) or just the number"});if(!i)return;let{ticketId:s,currentBranch:r}=i;await de.window.withProgress({location:de.ProgressLocation.Notification,title:`Ricwiz: Syncing all branches for ${s}...`,cancellable:!1},async p=>{try{p.report({message:"Fetching from remote..."});try{await f("git fetch --all",{cwd:t})}catch{}let{stdout:a}=await f(`git branch --list "*${s}*"`,{cwd:t}),u=a.split(`
`).map(o=>o.replace("*","").trim()).filter(o=>o.length>0);if(u.length===0){de.window.showWarningMessage(`Ricwiz: No local branches found for ${s}.`);return}let m=0,c=0;for(let o of u)if(p.report({message:`Syncing ${o}...`}),o===r)try{await f(`git pull ${e.originRemote} ${o}`,{cwd:t}),m++}catch(n){let d=!1;try{let{stdout:g}=await f("git ls-files -u",{cwd:t});g.trim().length>0&&(d=!0)}catch{}let l=((n.stdout||"")+(n.stderr||"")+(n.message||"")).toLowerCase();(d||l.includes("conflict")||l.includes("conflit"))&&await ve(t,`${e.originRemote}/${o}`,o,p)?m++:c++}else try{await f(`git fetch ${e.originRemote} ${o}:${o}`,{cwd:t}),m++}catch{try{await f(`git checkout ${o}`,{cwd:t});try{await f(`git pull ${e.originRemote} ${o}`,{cwd:t}),m++}catch(d){let l=!1;try{let{stdout:h}=await f("git ls-files -u",{cwd:t});h.trim().length>0&&(l=!0)}catch{}let g=((d.stdout||"")+(d.stderr||"")+(d.message||"")).toLowerCase();(l||g.includes("conflict")||g.includes("conflit"))&&await ve(t,`${e.originRemote}/${o}`,o,p)?m++:c++}await f(`git checkout ${r}`,{cwd:t})}catch{try{await f(`git checkout ${r}`,{cwd:t})}catch{}c++}}c>0?de.window.showWarningMessage(`Ricwiz: Synced ${m}/${u.length} branches. ${c} branch(es) could not be synced (possible conflicts or diverged history).`):de.window.showInformationMessage(`Ricwiz: \u{1F504} All ${m} branches for ${s} are up to date!`)}catch(a){de.window.showErrorMessage(`Ricwiz: Sync failed: ${a.message}`)}})}var de,fo=k(()=>{"use strict";de=v(require("vscode"));$();We();ce()});async function ho(){let t=b();if(!t){le.window.showErrorMessage("Ricwiz: Open a folder or workspace that is a Git repository.");return}try{await f("git status",{cwd:t})}catch{le.window.showErrorMessage("Ricwiz: The opened folder does not appear to be a valid Git repository.");return}let e=await A.initialize(t);if(!e)return;let i=e.environments,s=await N(t,{prefix:e.ticketPrefix});if(!s)return;let{ticketId:r,currentBranch:p}=s;await le.window.withProgress({location:le.ProgressLocation.Notification,title:"Ricwiz: Updating environment branches from their bases",cancellable:!0},async(a,u)=>{let m=0,c=p,o=!1;u.onCancellationRequested(()=>{o=!0}),a.report({message:"Syncing remote information...",increment:10});try{await f("git fetch --all",{cwd:t})}catch{}let n=80/(i.length||1);for(let d of i){if(o)break;let l=`${r}-to-${d.name}`,g=d.sourceBranch;if(await pe(t,l))try{a.report({message:`Processing ${l}...`,increment:n/2}),await f(`git checkout ${l}`,{cwd:t});try{a.report({message:`Merging ${g} into ${l}...`,increment:n/2});let h=e.getFetchRemote(g),w=e.getFetchBranch(g),R=e.buildUpstreamPath(g);await f(`git fetch ${h} ${w}`,{cwd:t}),await f(`git merge ${R}`,{cwd:t})}catch(h){let w=!1;try{let{stdout:S}=await f("git ls-files -u",{cwd:t});S.trim().length>0&&(w=!0)}catch{}let R=((h.stdout||"")+(h.stderr||"")+(h.message||"")).toLowerCase();if(w||R.includes("conflict")||R.includes("conflit")){let S=e.buildUpstreamPath(g);if(!await ve(t,S,l,a))throw o=!0,new Error("Update aborted by user.")}else throw h}if(o)break;m++}catch(h){h.message.includes("aborted")?le.window.showInformationMessage("Ricwiz: Update cancelled."):le.window.showErrorMessage(`Ricwiz: Failed to update branch ${l}. Detail: ${h.message}`);return}}if(!o){a.report({message:"Finishing up...",increment:10});try{let d=await D(t);c&&c!==d&&await f(`git checkout ${c}`,{cwd:t})}catch{}le.window.showInformationMessage(`Ricwiz: Successfully updated ${m} environment branches from their bases!`)}})}var le,wo=k(()=>{"use strict";le=v(require("vscode"));$();We();ce()});async function vo(){let t=b();if(!t){I.window.showErrorMessage("Ricwiz: Open a folder or workspace that is a Git repository.");return}let e=await D(t),i=I.workspace.getConfiguration("ricwiz");await I.window.withProgress({location:I.ProgressLocation.Notification,title:"Ricwiz: Scanning for unused local branches...",cancellable:!1},async()=>{try{await f("git fetch --prune",{cwd:t})}catch{}let s=[];try{let{stdout:n}=await f('git branch --format="%(refname:short)"',{cwd:t});s=n.split(`
`).map(d=>d.trim()).filter(d=>d.length>0)}catch{}if(s.length===0){I.window.showInformationMessage("Ricwiz: No local branches found.");return}let r=[];try{let{stdout:n}=await f('git branch -r --format="%(refname:short)"',{cwd:t});r=n.split(`
`).map(d=>d.trim().replace(/^origin\//,"").replace(/^[^\/]+\//,"")).filter(d=>d.length>0&&!d.includes("HEAD"))}catch{}let p=[];try{let{stdout:n}=await f('git for-each-ref --format="%(refname:short)|||%(upstream:track)" refs/heads/',{cwd:t});p=n.split(`
`).filter(d=>d.includes("[gone]")).map(d=>d.split("|||")[0].trim())}catch{}let a=s.filter(n=>!r.includes(n));if(a.length===0){I.window.showInformationMessage("Ricwiz: Your local repository is totally clean! All local branches exist on the remote.");return}let u=a.map(n=>{let d=p.includes(n),l=n===e,g="Not found on remote";return d&&(g="Deleted on remote [gone]"),l&&(g+=" (Current branch - will checkout main first)"),{label:n,description:g,picked:d&&!l}}),m=await I.window.showQuickPick(u,{canPickMany:!0,placeHolder:"Select local branches to delete",title:"Ricwiz: Delete Unused Branches"});if(!m||m.length===0){I.window.showInformationMessage("Ricwiz: No branches selected for deletion.");return}if(await I.window.showWarningMessage(`Ricwiz: Delete ${m.length} local branch(es)?
This cannot be undone!`,{modal:!0},"Yes, delete them")!=="Yes, delete them"){I.window.showInformationMessage("Ricwiz: Deletion cancelled.");return}let o=0;for(let n of m){let d=n.label;if(d===e){let l=i.get("ticketSourceBranch","main");try{await f(`git checkout ${l}`,{cwd:t}),e=l}catch{I.window.showWarningMessage(`Ricwiz: Could not switch away from ${d}. Skipping.`);continue}}try{await f(`git branch -D ${d}`,{cwd:t}),o++}catch{I.window.showWarningMessage(`Ricwiz: Could not delete local branch ${d}.`)}}I.window.showInformationMessage(`Ricwiz: \u{1F5D1}\uFE0F Cleaned up ${o} unused local branch(es).`)})}var I,bo=k(()=>{"use strict";I=v(require("vscode"));$()});async function ze(t){let e=b();e&&await X.window.withProgress({location:X.ProgressLocation.Notification,title:`Ricwiz: Switching to ${t}...`,cancellable:!1},async()=>{try{let i=await D(e),s=!1;try{let{stdout:p}=await f("git status --porcelain",{cwd:e});s=p.trim().length>0}catch{}if(s&&i)try{await f(`git stash push --include-untracked -m "ricwiz-auto:${i}"`,{cwd:e}),X.window.showInformationMessage(`Ricwiz: \u{1F4E6} Stashed changes from ${i}`)}catch{X.window.showWarningMessage("Ricwiz: Could not stash changes. Checkout may fail if there are conflicts.")}let r=t;t.includes("/")&&(r=t.split("/").slice(1).join("/"));try{await f(`git checkout ${r}`,{cwd:e})}catch{let a="";if(t.includes("/"))a=t.split("/")[0];else{let{stdout:u}=await f("git branch -r",{cwd:e}),m=u.split(`
`).map(o=>o.trim()).filter(o=>o),c=[];for(let o of m){let n=o.split(" ")[0];n.endsWith(`/${r}`)&&c.push(n.substring(0,n.lastIndexOf("/")))}if(c.length===0){X.window.showErrorMessage(`Ricwiz: A branch "${r}" n\xE3o existe localmente nem em nenhuma remote!`);return}else if(c.length===1)a=c[0];else{let o=await A.initialize(e);c.includes("origin")?a="origin":o&&c.includes(o.upstreamRemote)?a=o.upstreamRemote:a=c[0]}}try{await f(`git fetch ${a} ${r}`,{cwd:e}),await f(`git checkout -b ${r} --track ${a}/${r}`,{cwd:e})}catch{X.window.showErrorMessage(`Ricwiz: Encontrou na remote ${a} mas falhou a fazer checkout.`);return}}try{let{stdout:p}=await f("git stash list",{cwd:e}),a=p.split(`
`);for(let u=0;u<a.length;u++)if(a[u].includes(`ricwiz-auto:${r}`)){let m=a[u].match(/stash@\{(\d+)\}/);m&&(await f(`git stash pop stash@{${m[1]}}`,{cwd:e}),X.window.showInformationMessage(`Ricwiz: \u{1F4E6} Restored stashed changes on ${r}`));break}}catch{X.window.showWarningMessage(`Ricwiz: Could not restore stashed changes on ${r}. You may need to resolve conflicts manually (check git stash list).`)}}catch{X.window.showErrorMessage(`Ricwiz: Could not checkout branch ${t}.`)}})}var X,Ge=k(()=>{"use strict";X=v(require("vscode"));$();ce()});async function yo(){let t=b();if(t)try{let{stdout:e}=await f("git branch --show-current",{cwd:t}),i=e.trim();i&&(await Ee.env.clipboard.writeText(i),Ee.window.showInformationMessage(`Ricwiz: \u{1F4CB} Copied "${i}" to clipboard`))}catch{Ee.window.showErrorMessage("Ricwiz: Could not get the current branch name.")}}var Ee,xo=k(()=>{"use strict";Ee=v(require("vscode"));$()});async function Co(){let t=b();if(!t){H.window.showErrorMessage("Ricwiz: Open a folder or workspace that is a Git repository.");return}let e=H.workspace.getConfiguration("ricwiz"),i=e.get("ticketSourceBranch","main"),r=e.get("packageXmlCommand",'sf sgd source delta --to "HEAD" --from "origin/{baseBranch}" --output-dir "."').replace("{baseBranch}",i);await H.window.showWarningMessage("Are you sure you want to generate the package.xml? This may overwrite existing local manifest files.",{modal:!0},"Yes, Generate")==="Yes, Generate"&&await H.window.withProgress({location:H.ProgressLocation.Notification,title:"Ricwiz: Generating package.xml using Salesforce CLI...",cancellable:!1},async()=>{try{await f(r,{cwd:t,maxBuffer:10*1024*1024}),H.window.showInformationMessage("Ricwiz: Successfully generated package.xml!");let a=He.join(t,"package","package.xml"),u=He.join(t,"package.xml"),m=He.join(t,"manifest","package.xml");for(let c of[a,u,m])if(ko.existsSync(c)){let o=await H.workspace.openTextDocument(c);await H.window.showTextDocument(o);break}}catch(a){H.window.showErrorMessage(`Ricwiz: Error running sf command - ${a.message}`)}})}var H,He,ko,$o=k(()=>{"use strict";H=v(require("vscode")),He=v(require("path")),ko=v(require("fs"));$()});async function zo(){let t=b();if(!t){V.window.showErrorMessage("Ricwiz: Open a folder or workspace that is a Git repository.");return}let i=V.workspace.getConfiguration("ricwiz").get("deployCommand","sf project deploy start --manifest package/package.xml --post-destructive-changes destructiveChanges/destructiveChanges.xml -c -l NoTestRun -g");await V.window.showWarningMessage("Are you sure you want to deploy to Salesforce? This action modifies your org and cannot be easily undone.",{modal:!0},"Yes, Deploy")==="Yes, Deploy"&&await V.window.withProgress({location:V.ProgressLocation.Notification,title:"Ricwiz: Deploying package...",cancellable:!1},async()=>{try{let{stdout:r,stderr:p}=await f(i,{cwd:t,maxBuffer:52428800}),a=V.window.createOutputChannel("Ricwiz Deploy");a.appendLine(`Executing: ${i}`),a.appendLine(r),p&&(a.appendLine("--- STDERR ---"),a.appendLine(p)),a.show(),V.window.showInformationMessage("Ricwiz: Successfully ran deploy command!")}catch(r){let p=V.window.createOutputChannel("Ricwiz Deploy");p.appendLine(`Error executing: ${i}`),r.stdout&&p.appendLine(r.stdout),r.stderr&&p.appendLine(r.stderr),p.appendLine(r.message),p.show(),V.window.showErrorMessage("Ricwiz: Error running deploy command. See output channel for details.")}})}var V,Ro=k(()=>{"use strict";V=v(require("vscode"));$()});async function So(){let t=b();if(!t){_.window.showErrorMessage("Ricwiz: Open a folder or workspace that is a Git repository.");return}let i=_.workspace.getConfiguration("ricwiz").get("importDataCommand","sfdx force:data:tree:import --plan data/plan.json");await _.window.showWarningMessage("Are you sure you want to import data into Salesforce? This action modifies records in your org.",{modal:!0},"Yes, Import")==="Yes, Import"&&await _.window.withProgress({location:_.ProgressLocation.Notification,title:"Ricwiz: Importing data...",cancellable:!1},async()=>{try{let{stdout:r,stderr:p}=await f(i,{cwd:t,maxBuffer:52428800}),a=_.window.createOutputChannel("Ricwiz Import Data");a.appendLine(`Executing: ${i}`),a.appendLine(r),p&&(a.appendLine("--- STDERR ---"),a.appendLine(p)),a.show(),_.window.showInformationMessage("Ricwiz: Successfully ran import data command!")}catch(r){let p=_.window.createOutputChannel("Ricwiz Import Data");p.appendLine(`Error executing: ${i}`),r.stdout&&p.appendLine(r.stdout),r.stderr&&p.appendLine(r.stderr),p.appendLine(r.message),p.show(),_.window.showErrorMessage("Ricwiz: Error running import data command. See output channel for details.")}})}var _,Po=k(()=>{"use strict";_=v(require("vscode"));$()});async function Bo(){let t=b();if(!t){Q.window.showErrorMessage("Ricwiz: Open a folder or workspace that is a Git repository.");return}let e="";try{e=await D(t)}catch{}let s=Q.workspace.getConfiguration("ricwiz").get("ticketSourceBranch","main"),r=await Q.window.showInputBox({prompt:`Enter the branch name to list modified files (compared to ${s})`,value:e,placeHolder:"SFPSCA-1234"});r&&await Q.window.withProgress({location:Q.ProgressLocation.Notification,title:`Ricwiz: Finding files for ${r}...`,cancellable:!1},async()=>{try{let p=r.replace(/-to-[a-zA-Z0-9]+$/i,""),a=[];try{let g="";try{let{stdout:h}=await f(`git merge-base origin/${s} ${r}`,{cwd:t});g=h.trim()}catch{let{stdout:h}=await f(`git merge-base ${s} ${r}`,{cwd:t});g=h.trim()}if(g){let{stdout:h}=await f(`git diff --name-only ${g} ${r}`,{cwd:t,maxBuffer:10485760});a=h.split(`
`).map(w=>w.trim()).filter(w=>w.length>0)}}catch{}let u=[];try{let{stdout:g}=await f(`git --no-pager log --grep="\\b${p}\\b" -i -E --name-only -m --first-parent --format=""`,{cwd:t,maxBuffer:10485760});u=g.split(`
`).map(h=>h.trim()).filter(h=>h.length>0)}catch{}let m=[...a,...u];if(m.length===0){Q.window.showInformationMessage(`Ricwiz: No modified files found for ${r}.`);return}let c=Array.from(new Set(m)).sort(),o={};for(let g of c){let h=g.match(/default\/([^/]+)/),w=h&&h[1]?h[1].toUpperCase():"OUTROS";o[w]||(o[w]=[]),o[w].push(g)}let n=`Files modified in branch ${r}:
`,d=Object.keys(o).sort();for(let g of d)n+=`
=== ${g} ===
`,n+=o[g].join(`
`)+`
`;let l=await Q.workspace.openTextDocument({content:n,language:"plaintext"});await Q.window.showTextDocument(l)}catch(p){Q.window.showErrorMessage(`Ricwiz: Error running git log - ${p.message}`)}})}var Q,Eo=k(()=>{"use strict";Q=v(require("vscode"));$()});async function To(){let t=b();if(!t){ee.window.showErrorMessage("Ricwiz: Open a folder or workspace that is a Git repository.");return}let i=ee.workspace.getConfiguration("ricwiz").get("resetTrackingCommand","sf org disable tracking && sf project reset tracking --no-prompt");await ee.window.withProgress({location:ee.ProgressLocation.Notification,title:"Ricwiz: Resetting tracking...",cancellable:!1},async()=>{try{let{stdout:s,stderr:r}=await f(i,{cwd:t,maxBuffer:52428800}),p=ee.window.createOutputChannel("Ricwiz Reset Tracking");p.appendLine(`Executing: ${i}`),p.appendLine(s),r&&(p.appendLine("--- STDERR ---"),p.appendLine(r)),p.show(),ee.window.showInformationMessage("Ricwiz: Successfully reset tracking!")}catch(s){let r=ee.window.createOutputChannel("Ricwiz Reset Tracking");r.appendLine(`Error executing: ${i}`),s.stdout&&r.appendLine(s.stdout),s.stderr&&r.appendLine(s.stderr),r.appendLine(s.message),r.show(),ee.window.showErrorMessage("Ricwiz: Error resetting tracking. See output channel for details.")}})}var ee,Mo=k(()=>{"use strict";ee=v(require("vscode"));$()});async function Do(){let t=b();if(!t){Y.window.showErrorMessage("Ricwiz: Open a workspace first.");return}let e=["ApexClass","ApexTrigger","CustomObject","CustomField","LightningComponentBundle","AuraDefinitionBundle","Flow","CustomLabel","CustomMetadata","StaticResource","Profile","PermissionSet","PermissionSetGroup","Layout","ValidationRule","RecordType","ListView","Report","EmailTemplate","Other (Type manually)..."],i=await Y.window.showQuickPick(e,{placeHolder:"Select Metadata Type to extract (e.g., ApexClass)",ignoreFocusOut:!0});if(!i||i==="Other (Type manually)..."&&(i=await Y.window.showInputBox({prompt:"Enter Metadata Type (e.g., CustomApplication, Queue)",ignoreFocusOut:!0}),!i))return;let s={ApexClass:"**/*.cls",ApexTrigger:"**/*.trigger",CustomObject:"**/*.{object,object-meta.xml}",CustomField:"**/*.field-meta.xml",LightningComponentBundle:"**/lwc/*/*.js",AuraDefinitionBundle:"**/aura/*/*.cmp",Flow:"**/*.flow-meta.xml",CustomLabel:"**/*.labels-meta.xml",CustomMetadata:"**/*.md-meta.xml",StaticResource:"**/*.resource-meta.xml",Profile:"**/*.profile-meta.xml",PermissionSet:"**/*.permissionset-meta.xml",PermissionSetGroup:"**/*.permissionsetgroup-meta.xml",Layout:"**/*.layout-meta.xml",ValidationRule:"**/*.validationRule-meta.xml",RecordType:"**/*.recordType-meta.xml",ListView:"**/*.listView-meta.xml"},r=[],p=s[i];if(p)try{r=(await Y.workspace.findFiles(p,"**/node_modules/**")).map(m=>{let c=m.fsPath.split(/[\\/]/).pop()||"";if(i==="LightningComponentBundle"||i==="AuraDefinitionBundle"){let o=m.fsPath.split(/[\\/]/);return o[o.length-2]||c.split(".")[0]}return c.split(".")[0]}),r=[...new Set(r)].sort()}catch{}let a=await new Promise(u=>{let m=Y.window.createQuickPick();m.title=`Extract ${i}`,m.placeholder="Type name (e.g. MyComponent) or * for all",m.ignoreFocusOut=!0,m.matchOnDescription=!0;let c=()=>{let o=m.value.trim(),n=[];o?n.push({label:`$(cloud-download) Extract "${o}"`,description:"Extract exact name from Salesforce",alwaysShow:!0}):n.push({label:'$(cloud-download) Extract "*" (All)',description:`Extract all ${i}s`,alwaysShow:!0}),r.forEach(d=>{(!o||d.toLowerCase().includes(o.toLowerCase()))&&n.push({label:d,description:"Local workspace component"})}),m.items=n};m.onDidChangeValue(()=>c()),m.onDidAccept(()=>{let o=m.selectedItems[0];if(o){let n=o.label;n.startsWith('$(cloud-download) Extract "')?n=n.replace('$(cloud-download) Extract "',"").replace('" (All)',"").replace('"',""):n==='$(cloud-download) Extract "*" (All)'&&(n="*"),m.hide(),u(n)}}),m.onDidHide(()=>{m.dispose(),u(void 0)}),c(),m.show()});a&&await Y.window.withProgress({location:Y.ProgressLocation.Notification,title:`Ricwiz: Extracting ${i}:${a} from Salesforce...`,cancellable:!0},async(u,m)=>{try{M.show(!0);let c=`${i}:${a}`,{stdout:o,stderr:n}=await f(`sf project retrieve start -m "${c}"`,{cwd:t});o&&M.appendLine(o),n&&M.appendLine(n),Y.window.showInformationMessage(`Ricwiz: Successfully extracted ${c}.`)}catch(c){M.appendLine(`ERROR: ${c.message}`),c.stdout&&M.appendLine(c.stdout),c.stderr&&M.appendLine(c.stderr),Y.window.showErrorMessage("Ricwiz: Extraction failed. See Output channel for details.")}})}var Y,Ao=k(()=>{"use strict";Y=v(require("vscode"));$()});async function Lo(){let t=O.window.activeTextEditor;if(!t){O.window.showErrorMessage("Ricwiz: Please open the file you want to deploy in the editor first.");return}let e=t.document.uri.fsPath,i=b();if(!i)return;let s="";if(await O.window.withProgress({location:O.ProgressLocation.Notification,title:"Ricwiz: Fetching available Salesforce orgs...",cancellable:!1},async()=>{try{let{stdout:m}=await f("sf org list --json",{cwd:i});s=m}catch(m){s=m.stdout||""}}),!s){O.window.showErrorMessage("Ricwiz: Failed to fetch orgs. Is Salesforce CLI installed?");return}let r=[];try{let m=JSON.parse(s),c=m.result?.nonScratchOrgs||[],o=m.result?.scratchOrgs||[];r=[...c,...o]}catch{O.window.showErrorMessage("Ricwiz: Failed to parse org list.");return}if(r.length===0){O.window.showInformationMessage("Ricwiz: No authenticated orgs found.");return}let p=r.map(m=>({label:m.alias||m.username,description:m.alias?m.username:"",picked:m.isDefaultUsername})),a=await O.window.showQuickPick(p,{placeHolder:"Select the org(s) to deploy this file to",canPickMany:!0,ignoreFocusOut:!0});if(!a||a.length===0)return;let u=Io.basename(e);await O.window.withProgress({location:O.ProgressLocation.Notification,title:`Ricwiz: Deploying ${u} to ${a.length} org(s)...`,cancellable:!1},async()=>{M.show(!0),M.appendLine(`--- Starting Parallel Deploy of ${u} ---`);let m=a.map(async d=>{let l=d.label;M.appendLine(`[${l}] Deploying...`);try{let{stdout:g,stderr:h}=await f(`sf project deploy start -d "${e}" -o "${l}"`,{cwd:i});return M.appendLine(`[${l}] \u2705 Success`),g&&M.appendLine(g),{org:l,success:!0}}catch(g){return M.appendLine(`[${l}] \u274C Failed`),g.stdout&&M.appendLine(g.stdout),g.stderr&&M.appendLine(g.stderr),{org:l,success:!1}}}),c=await Promise.all(m),o=c.filter(d=>d.success).length,n=c.filter(d=>!d.success).length;n===0?O.window.showInformationMessage(`Ricwiz: Successfully deployed to all ${o} orgs!`):O.window.showErrorMessage(`Ricwiz: Deploy finished with errors (${o} success, ${n} failed). Check Output channel.`)})}var O,Io,Fo=k(()=>{"use strict";O=v(require("vscode")),Io=v(require("path"));$()});async function Oo(){let t=b();if(!t){E.window.showErrorMessage("Ricwiz: Open a folder or workspace that is a Git repository.");return}let e=E.workspace.getConfiguration("ricwiz"),i=e.get("auditUsername",""),s=e.get("auditHours",8),r=await E.window.showInputBox({prompt:"Enter your Salesforce Username to query in SetupAuditTrail",value:i,placeHolder:"admin@tuaorg.com"});if(!r)return;let p=await E.window.showInputBox({prompt:"How many hours back do you want to search?",value:s.toString(),placeHolder:"8"});if(!p)return;let a=parseFloat(p);if(isNaN(a)||a<=0){E.window.showErrorMessage("Ricwiz: Invalid hours specified.");return}let u=new Date(Date.now()-a*60*60*1e3).toISOString(),c=`sf data query -q "${`SELECT Action, Display, Section FROM SetupAuditTrail WHERE CreatedBy.Username = '${r}' AND CreatedDate >= ${u}`}" --json`;await E.window.withProgress({location:E.ProgressLocation.Notification,title:"Ricwiz: Interrogating Setup Audit Trail...",cancellable:!1},async()=>{try{let{stdout:o}=await f(c,{cwd:t,maxBuffer:52428800}),n=JSON.parse(o);if(!n.result||n.result.records.length===0){E.window.showInformationMessage(`Ricwiz: No changes found for ${r} in the last ${a} hours.`);return}let d=n.result.records,l=[],g=new Set;for(let P of d){let L=si(P.Action,P.Display,P.Section);if(L){let J=`${L.isDelete?"DEL":"ADD"}-${L.metadataFormat}`;if(!g.has(J)){g.add(J);let W=L.isDelete?"$(trash)":"$(plus)";l.push({label:`${W} ${L.metadataFormat}`,description:`${P.Action} -> ${P.Display}`,metadataFormat:L.metadataFormat,isDelete:L.isDelete})}}}if(l.length===0){E.window.showInformationMessage(`Ricwiz: No extractable metadata changes found for ${r} in the last ${a} hours (ignored passwords/logins).`);return}let h=await E.window.showQuickPick(l,{canPickMany:!0,placeHolder:"Select the changes you want to extract to GitLab",ignoreFocusOut:!0});if(!h||h.length===0){E.window.showInformationMessage("Ricwiz: No changes selected.");return}let w=h.filter(P=>P.isDelete),R=h.filter(P=>!P.isDelete),S=E.window.createOutputChannel("Ricwiz Admin Bridge");if(S.show(),w.length>0){let{stdout:P}=await f("git ls-files",{cwd:t}),L=P.split(`
`).map(W=>W.trim()),J=0;for(let W of w){let Ae=W.metadataFormat.split(":"),Ie=Ae[0],Re=Ae[1],Le=Re;Ie==="CustomField"&&(Le=Re.split(".")[1]);let T=L.filter(q=>{let ue=_e.basename(q);return ue.startsWith(Le+".")&&ue.includes(Ie==="CustomField"?".field":"")});for(let q of T){let ue=_e.join(t,q);Ve.existsSync(ue)&&(Ve.unlinkSync(ue),S.appendLine(`Deleted local file: ${q}`),J++)}}E.window.showInformationMessage(`Ricwiz: Deleted ${J} local files from Git workspace.`)}if(R.length===0)return;let me=R.map(P=>P.metadataFormat).filter(P=>P!=="").join(", "),fe=await E.window.showInputBox({prompt:"Review and adjust the metadata components to retrieve",value:me,ignoreFocusOut:!0});if(!fe)return;let he=`sf project retrieve start -m "${fe}"`;S.appendLine(`Executing: ${he}`),E.window.showInformationMessage(`Ricwiz: Extracting ${R.length} components...`);let te=await f(he,{cwd:t});S.appendLine(te.stdout),te.stderr&&(S.appendLine("--- STDERR ---"),S.appendLine(te.stderr)),E.window.showInformationMessage("Ricwiz: Changes extracted successfully! Ready for Git Commit.")}catch(o){E.window.showErrorMessage(`Ricwiz: Error capturing changes - ${o.message}`)}})}function si(t,e,i){if(!t||!e||!i)return null;let s=t.toLowerCase(),r=i.toLowerCase();if(["security controls","network access","session settings","data export","login history","password policies","identity verification","delegated administration"].includes(r)||s.includes("login")||s.includes("password")||s.includes("oauth")||s.includes("session"))return null;let a=s.includes("delete"),u=null;if(s==="permissionsetgroupcomponentadd"||s==="permissionsetgroupcomponentdelete")return null;let m=(c,o=!1)=>{let n=c.replace(/\(.*\)/g,"").trim();n.includes(":")&&!s.includes("calculation")&&(n=n.split(":")[0]);let d=["disabled","deleted","removed","created","changed","updated","from","to","on","assigned","assign","assignment","permission","set","group","apex","class","trigger","custom","field","object","layout","validation","rule","flow","profile"],l=n.split(/\s+/);if(o){for(;l.length>0&&d.includes(l[l.length-1].toLowerCase());)l.pop();for(;l.length>0&&d.includes(l[0].toLowerCase());)l.shift();return l.join(" ").trim().replace(/[^a-zA-Z0-9_ ]/g,"")}else return l.filter(w=>!d.includes(w.toLowerCase())).join("_").replace(/[^a-zA-Z0-9_]/g,"")||n.replace(/\s+/g,"")};if(s.includes("profile"))u=`Profile:${m(e,!0)}`;else if(s.includes("permissionsetgroupcalculation")){let c=e.split(":");u=`PermissionSetGroup:${c.length>1?c[c.length-1].trim():m(e,!1)}`}else if(s.includes("permission set group")||s.includes("permissionsetgroup"))u=`PermissionSetGroup:${m(e,!1)}`;else if(s.includes("permission set")||s.includes("permissionset"))u=`PermissionSet:${m(e,!1)}`;else if(s.includes("apexclass"))u=`ApexClass:${m(e,!1)}`;else if(s.includes("apextrigger")||s.includes("apex trigger"))u=`ApexTrigger:${m(e,!1)}`;else if(s.includes("customfield")){let c=e.match(/([A-Za-z0-9_]+__c)/),o=e.match(/(?:on|na|for)\s+([A-Za-z0-9_]+)/i);c&&o?u=`CustomField:${o[1]}.${c[1]}`:u=`CustomField:${m(e,!1)}`}else if(s.includes("layout"))u=`Layout:${m(e,!0)}`;else if(s.includes("validation"))u=`ValidationRule:${m(e,!1)}`;else if(s.includes("flow"))u=`Flow:${m(e,!1)}`;else if(s.includes("customobject")){let c=e.match(/([A-Za-z0-9_]+__c)/);u=c?`CustomObject:${c[1]}`:`CustomObject:${m(e,!1)}`}else if(!s.includes("created")&&!s.includes("changed")&&!s.includes("deleted"))return null;return u?{metadataFormat:u,isDelete:a}:null}var E,Ve,_e,No=k(()=>{"use strict";E=v(require("vscode")),Ve=v(require("fs")),_e=v(require("path"));$()});async function Uo(){let t=b();if(t)try{let{stdout:e}=await f('git for-each-ref --sort=-committerdate --format="%(refname:short)|||%(committerdate:relative)|||%(subject)" refs/heads/',{cwd:t}),i=e.split(`
`).filter(r=>r.trim()).map(r=>{let p=r.split("|||");return{label:`$(git-branch) ${p[0]}`,description:p[1],detail:p[2],branchName:p[0]}}),s=await at.window.showQuickPick(i,{placeHolder:"Select a branch from history to checkout",matchOnDescription:!0,matchOnDetail:!0});s&&await ze(s.branchName)}catch{at.window.showErrorMessage("Ricwiz: Failed to get branch history")}}var at,jo=k(()=>{"use strict";at=v(require("vscode"));$();Ge()});async function Jo(){let t=b();if(!t)return;let e=await Te.window.showInputBox({prompt:"Enter ticket number or name (e.g., 48934)",placeHolder:"48934"});if(e)try{let{stdout:i}=await f(`git branch --list "*${e}*"`,{cwd:t}),s=i.split(`
`).map(a=>a.replace("*","").trim()).filter(a=>a);if(s.length===0){Te.window.showInformationMessage(`Ricwiz: No branches found matching "${e}"`);return}let r=s.map(a=>({label:`$(git-branch) ${a}`,branchName:a})),p=await Te.window.showQuickPick(r,{placeHolder:`Select a branch for ${e}`});p&&await ze(p.branchName)}catch{Te.window.showErrorMessage("Ricwiz: Failed to search branches")}}var Te,Wo=k(()=>{"use strict";Te=v(require("vscode"));$();Ge()});async function Go(){let t=ye.window.activeTextEditor;if(!t)return ye.window.showErrorMessage("Ricwiz: Please open a file in the editor to check blame."),null;let e=t.document.fileName,i=qo.basename(e),s=b();if(!s)return ye.window.showErrorMessage("Ricwiz: Workspace is not a git repository."),null;let r=[];try{let{stdout:o}=await f(`git log -5 --pretty=format:"%an|%ar|%s|%h" -- "${e}"`,{cwd:s}),n=o.trim().split(`
`);for(let d of n){let l=d.split("|");l.length>=4&&r.push({author:l[0],time:l[1],message:l.slice(2,-1).join("|"),hash:l[l.length-1]})}}catch(o){console.error("Git blame error:",o)}let p="Unknown",a="Unknown",u="Unknown",m=[],c=ri(e);if(c)try{await ye.window.withProgress({location:ye.ProgressLocation.Notification,title:`Ricwiz: Analyzing ${c.name} in Salesforce...`,cancellable:!1},async()=>{let o="";if(c.type==="CustomField"){let n=c.name.split(".");n.length===2&&(o=`SELECT LastModifiedBy.Name, LastModifiedDate, CreatedBy.Name FROM CustomField WHERE DeveloperName = '${n[1].replace("__c","")}' AND TableEnumOrId = '${n[0]}'`)}else c.type==="LightningComponentBundle"?o=`SELECT LastModifiedBy.Name, LastModifiedDate, CreatedBy.Name FROM LightningComponentBundle WHERE DeveloperName = '${c.name}'`:o=`SELECT LastModifiedBy.Name, LastModifiedDate, CreatedBy.Name FROM ${c.type} WHERE Name = '${c.name}'`;if(o)try{let{stdout:n}=await f(`sf data query -t -q "${o}" --json`,{cwd:s,maxBuffer:52428800}),d=JSON.parse(n);if(d&&d.result&&d.result.records&&d.result.records.length>0){let l=d.result.records[0];p=l.LastModifiedBy?l.LastModifiedBy.Name:"Unknown",u=l.CreatedBy?l.CreatedBy.Name:"Unknown",a=new Date(l.LastModifiedDate).toLocaleString()}else p="Not found in Org",a="N/A",u="N/A"}catch{p="Query Error",a="N/A",u="N/A"}try{let n="SELECT Action, Display, CreatedBy.Name, CreatedDate FROM SetupAuditTrail ORDER BY CreatedDate DESC LIMIT 1500",{stdout:d}=await f(`sf data query -q "${n}" --json`,{cwd:s,maxBuffer:52428800}),l=JSON.parse(d);if(l&&l.result&&l.result.records){let g=c.name.replace("__c","");m=l.result.records.filter(w=>w.Display&&w.Display.includes(g)).map(w=>({action:w.Action,display:w.Display,author:w.CreatedBy?w.CreatedBy.Name:"Unknown",time:new Date(w.CreatedDate).toLocaleString()})).slice(0,10)}}catch(n){console.error("Audit trail query error:",n)}})}catch(o){console.error("Salesforce query error:",o)}else p="Unsupported Metadata Type",a="N/A";return{fileName:i,gitHistory:r,sfAuthor:p,sfTime:a,sfCreatedBy:u,auditHistory:m}}function ri(t){let e=t.replace(/\\/g,"/");if(e.includes("/classes/")){let i=e.match(/\/classes\/([^/.]+)\.cls/);if(i)return{type:"ApexClass",name:i[1]}}if(e.includes("/triggers/")){let i=e.match(/\/triggers\/([^/.]+)\.trigger/);if(i)return{type:"ApexTrigger",name:i[1]}}if(e.includes("/lwc/")){let i=e.match(/\/lwc\/([^/]+)\//);if(i)return{type:"LightningComponentBundle",name:i[1]}}if(e.includes("/aura/")){let i=e.match(/\/aura\/([^/]+)\//);if(i)return{type:"AuraDefinitionBundle",name:i[1]}}if(e.includes("/objects/")&&e.includes("/fields/")){let i=e.match(/\/objects\/([^/]+)\//),s=e.match(/\/fields\/([^/.]+)\.field/);if(i&&s)return{type:"CustomField",name:`${i[1]}.${s[1]}`}}return null}var ye,qo,Ho=k(()=>{"use strict";ye=v(require("vscode")),qo=v(require("path"));$()});function Vo(t,e,i){t.subscriptions.push(x.commands.registerCommand("ricwiz.generateDestructiveChanges",yt),x.commands.registerCommand("ricwiz.runSmartTests",kt),x.commands.registerCommand("ricwiz.refreshWebview",()=>{e&&x.commands.executeCommand("workbench.action.webview.reloadWebviewAction")}),x.commands.registerCommand("ricwiz.createBranches",Rt),x.commands.registerCommand("ricwiz.prepareDeploy",Et),x.commands.registerCommand("ricwiz.createMergeRequests",Dt),x.commands.registerCommand("ricwiz.createMergeRequestsVSCode",At),x.commands.registerCommand("ricwiz.openJiraTicket",Ft),x.commands.registerCommand("ricwiz.openJiraTicketVSCode",Ot),x.commands.registerCommand("ricwiz.showJiraDetails",()=>{e&&to(e)}),x.commands.registerCommand("ricwiz.openJiraDashboard",s=>{e&&io(e,s)}),x.commands.registerCommand("ricwiz.openJiraDetailsForId",s=>{e&&no(e,s)}),x.commands.registerCommand("ricwiz.changeJiraStatus",ro),x.commands.registerCommand("ricwiz.addJiraComment",ao),x.commands.registerCommand("ricwiz.addJiraLabel",co),x.commands.registerCommand("ricwiz.setJiraToken",lo),x.commands.registerCommand("ricwiz.setGitlabToken",uo),x.commands.registerCommand("ricwiz.syncAll",go),x.commands.registerCommand("ricwiz.updateBases",ho),x.commands.registerCommand("ricwiz.deleteUnusedBranches",vo),x.commands.registerCommand("ricwiz.checkoutBranch",ze),x.commands.registerCommand("ricwiz.copyBranchName",yo),x.commands.registerCommand("ricwiz.generatePackageXml",Co),x.commands.registerCommand("ricwiz.deployPackage",zo),x.commands.registerCommand("ricwiz.importData",So),x.commands.registerCommand("ricwiz.listTicketFiles",Bo),x.commands.registerCommand("ricwiz.resetTracking",To),x.commands.registerCommand("ricwiz.extractComponent",Do),x.commands.registerCommand("ricwiz.deployMultiOrg",Lo),x.commands.registerCommand("ricwiz.captureAdminChanges",Oo),x.commands.registerCommand("ricwiz.openHistory",Uo),x.commands.registerCommand("ricwiz.searchTicket",Jo),x.commands.registerCommand("ricwiz.whoToBlame",async()=>{let s=await Go();s&&e&&(e.setBlameData(s),e.setPage("blame"))}),x.commands.registerCommand("ricwiz.manualRefresh",()=>{i&&i()}),x.commands.registerCommand("ricwiz.toggleAutoRefresh",()=>{if(e){let s=!e.isAutoRefreshEnabled();e.setAutoRefresh(s),x.workspace.getConfiguration("ricwiz").update("autoRefresh",s,x.ConfigurationTarget.Global)}}),x.commands.registerCommand("ricwiz.openSettings",()=>{x.commands.executeCommand("workbench.action.openSettings","ricwiz")}))}var x,_o=k(()=>{"use strict";x=v(require("vscode"));xt();Ct();St();Tt();It();Nt();oo();so();mo();po();fo();wo();bo();Ge();xo();$o();Ro();Po();Eo();Mo();Ao();Fo();No();jo();Wo();Ho()});function Qo(t,e,i){let s,r=re.workspace.getConfiguration("ricwiz").get("autoRefresh",!0);e?.setAutoRefresh(r),t.subscriptions.push(re.workspace.onDidChangeConfiguration(a=>{if(a.affectsConfiguration("ricwiz.autoRefresh")){let u=re.workspace.getConfiguration("ricwiz").get("autoRefresh",!0);e?.setAutoRefresh(u)}}));async function p(){let a=re.extensions.getExtension("vscode.git");if(a){let c=function(o){let n="",d;async function l(){let h=re.workspace.workspaceFolders;if(!h)return;let w=h[0].uri.fsPath,R=await D(w);if(R&&R!==n){n=R;let S=re.workspace.getConfiguration("ricwiz"),me=S.get("ticketPrefix","SFPSCA-");if(!R.includes(me)){let T=R.match(/([A-Z]+-)\d+/i);T&&(me=T[1].toUpperCase())}let fe=[],he=[],te=[],P=[],L=S.get("environments",[{name:"Qual",sourceBranch:"quality"},{name:"Val",sourceBranch:"validation"},{name:"Prod",sourceBranch:"main"}]);try{let T=S.get("workspaceCheckoutButtons",["main","quality","validation"]);te=Array.from(new Set(T))}catch{}let J="",W=R.match(new RegExp(`(${me}\\d+(?:-\\d+)?)`,"i"));if(W){let T=W[1].toUpperCase();J=T;let q=S.get("commitMessageSuffix","- "),ue=/^[A-Z]+-\d+(?:-\d+)?\s*(?:-\s*|:\s*|\s+)?/i;ue.test(o.inputBox.value)?o.inputBox.value.toUpperCase().startsWith(T)||(o.inputBox.value=o.inputBox.value.replace(ue,`${T}${q}`)):o.inputBox.value=`${T}${q}`+o.inputBox.value,i.text=`$(bookmark) ${T}`,i.tooltip=`Branch: ${R}
Click to open Jira ticket`,i.show();try{let ct=await nt(w,T,R);fe=await et(w,ct,T,L)}catch{}}else{i.hide();try{P=await it(w)}catch{}}let[Ae,Ie,Re]=await Promise.all([ot(w,10),tt(w,R,L),J?$e(J).catch(T=>{let q=T.message;return(q.includes("ENOTFOUND")||q.includes("network"))&&(q="No Internet or Invalid URL"),{summary:`\u26A0\uFE0F Jira Error: ${q}`,description:""}}):Promise.resolve(null)]);he=Ae;let Le=Re?Re.summary:"";e?.updateBranch(R,Ie,fe,he,te,P,Le)}}function g(){e?.isAutoRefreshEnabled()&&(d&&clearTimeout(d),d=setTimeout(()=>{n="",l()},300))}s=()=>{n="",l()},l(),o.state.onDidChange(()=>g()),re.window.onDidChangeWindowState(h=>{h.focused&&g()})};var u=c;a.isActive||await a.activate();let m=a.exports.getAPI(1);m.repositories.length>0&&m.repositories.forEach(o=>c(o)),m.onDidOpenRepository(o=>c(o))}}return p(),()=>{s&&s()}}var re,Yo=k(()=>{"use strict";re=v(require("vscode"));$();qe();Be()});var je={};Qe(je,{activate:()=>ai,deactivate:()=>ci,webviewProvider:()=>Me});module.exports=oe(je);function ai(t){mt(t),Me=new Oe(t.extensionUri),t.subscriptions.push(De.window.registerWebviewViewProvider("ricwiz-webview",Me));let e=De.window.createStatusBarItem(De.StatusBarAlignment.Left,100);e.command="ricwiz.openJiraTicket",t.subscriptions.push(e);let i=Qo(t,Me,e);Vo(t,Me,i)}function ci(){}var De,Me,Je=k(()=>{De=v(require("vscode"));lt();xe();_o();Yo()});Je();0&&(module.exports={activate,deactivate,webviewProvider});
