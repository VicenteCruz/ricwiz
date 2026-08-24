"use strict";var ti=Object.create;var qe=Object.defineProperty;var oi=Object.getOwnPropertyDescriptor;var ii=Object.getOwnPropertyNames;var ni=Object.getPrototypeOf,si=Object.prototype.hasOwnProperty;var z=(t,e,o)=>()=>{if(o)throw o[0];try{return t&&(e=t(t=0)),e}catch(s){throw o=[s],s}};var Le=(t,e)=>{for(var o in e)qe(t,o,{get:e[o],enumerable:!0})},bt=(t,e,o,s)=>{if(e&&typeof e=="object"||typeof e=="function")for(let r of ii(e))!si.call(t,r)&&r!==o&&qe(t,r,{get:()=>e[r],enumerable:!(s=oi(e,r))||s.enumerable});return t};var y=(t,e,o)=>(o=t!=null?ti(ni(t)):{},bt(e||!t||!t.__esModule?qe(o,"default",{value:t,enumerable:!0}):o,t)),I=t=>bt(qe({},"__esModule",{value:!0}),t);function R(t){return t.replace(/&/g,"&amp;").replace(/</g,"&lt;").replace(/>/g,"&gt;").replace(/"/g,"&quot;").replace(/'/g,"&#39;")}var k,Ge,yt=z(()=>{"use strict";k=y(require("vscode"));Ge=class{constructor(e){this._extensionUri=e}_extensionUri;webviewView;resolveWebviewView(e,o,s){this.webviewView=e,e.webview.options={enableScripts:!0,localResourceRoots:[this._extensionUri]},this.updateView(),e.webview.onDidReceiveMessage(r=>{switch(r.command){case"createBranches":k.commands.executeCommand("ricwiz.createBranches");break;case"createBranchForTicket":k.commands.executeCommand("ricwiz.createBranches",r.args);break;case"prepareDeploy":k.commands.executeCommand("ricwiz.prepareDeploy");break;case"openMRs":k.commands.executeCommand("ricwiz.createMergeRequests");break;case"openMRsVSCode":k.commands.executeCommand("ricwiz.createMergeRequestsVSCode");break;case"openExternal":r.args&&k.env.openExternal(k.Uri.parse(r.args));break;case"openJira":k.commands.executeCommand("ricwiz.openJiraTicket");break;case"showJiraDetails":k.commands.executeCommand("ricwiz.showJiraDetails");break;case"changeJiraStatus":k.commands.executeCommand("ricwiz.changeJiraStatus");break;case"addJiraComment":k.commands.executeCommand("ricwiz.addJiraComment");break;case"addJiraLabel":k.commands.executeCommand("ricwiz.addJiraLabel");break;case"setPage":this.setPage(r.args);break;case"openDashboard":k.commands.executeCommand("ricwiz.openJiraDashboard");break;case"openJiraDetailsForId":k.commands.executeCommand("ricwiz.openJiraDetailsForId",r.args);break;case"refreshDashboard":k.commands.executeCommand("ricwiz.openJiraDashboard");break;case"switchDashboardQuery":k.commands.executeCommand("ricwiz.openJiraDashboard",parseInt(r.args));break;case"toggleDashboardBranches":k.commands.executeCommand("ricwiz.toggleDashboardBranches",r.args);break;case"openJiraVSCode":k.commands.executeCommand("ricwiz.openJiraTicketVSCode");break;case"openSettings":k.commands.executeCommand("ricwiz.openSettings");break;case"checkout":r.branch&&k.commands.executeCommand("ricwiz.checkoutBranch",r.branch);break;case"copyBranch":k.commands.executeCommand("ricwiz.copyBranchName");break;case"generatePackageXml":k.commands.executeCommand("ricwiz.generatePackageXml");break;case"openDevTools":this.setPage("devtools");break;case"openMain":this.setPage("main");break;case"generateDestructiveChanges":k.commands.executeCommand("ricwiz.generateDestructiveChanges");break;case"deployPackage":k.commands.executeCommand("ricwiz.deployPackage");break;case"runSmartTests":k.commands.executeCommand("ricwiz.runSmartTests");break;case"importData":k.commands.executeCommand("ricwiz.importData");break;case"listTicketFiles":k.commands.executeCommand("ricwiz.listTicketFiles");break;case"resetTracking":k.commands.executeCommand("ricwiz.resetTracking");break;case"extractComponent":k.commands.executeCommand("ricwiz.extractComponent");break;case"deployMultiOrg":k.commands.executeCommand("ricwiz.deployMultiOrg");break;case"captureAdminChanges":k.commands.executeCommand("ricwiz.captureAdminChanges");break;case"whoToBlame":k.commands.executeCommand("ricwiz.whoToBlame");break;case"syncAll":k.commands.executeCommand("ricwiz.syncAll");break;case"updateBases":k.commands.executeCommand("ricwiz.updateBases");break;case"deleteUnused":k.commands.executeCommand("ricwiz.deleteUnusedBranches");break;case"conflict_commitAndContinue":k.commands.executeCommand("ricwiz.conflictAction","commitAndContinue");break;case"conflict_resolveDeletions":k.commands.executeCommand("ricwiz.conflictAction","resolveDeletions");break;case"conflict_abortDeploy":k.commands.executeCommand("ricwiz.conflictAction","abortDeploy");break;case"openFile":if(r.file){let l=k.workspace.workspaceFolders;if(l){let d=k.Uri.joinPath(l[0].uri,r.file);k.commands.executeCommand("vscode.open",d)}}break;case"searchTicket":k.commands.executeCommand("ricwiz.searchTicket");break;case"manualRefresh":k.commands.executeCommand("ricwiz.manualRefresh");break;case"toggleAutoRefresh":k.commands.executeCommand("ricwiz.toggleAutoRefresh");break;case"openHistory":k.commands.executeCommand("ricwiz.openHistory");break}})}conflictState=null;setConflictState(e){this.conflictState=e,this.updateView()}updateBranch(e,o,s=[],r=[],l=[],d=[],u="",p=""){this.currentBranchCache=e,this.currentBranchIsMergedCache=o,this.relatedBranchesCache=s,this.commitsCache=r,this.baseBranchesCache=l,this.recentTicketsCache=d,this.ticketTitleCache=u,this.ticketStatusCache=p,this.webviewView&&this.updateView()}currentBranchCache="";currentBranchIsMergedCache=!1;relatedBranchesCache=[];commitsCache=[];baseBranchesCache=[];recentTicketsCache=[];ticketTitleCache="";ticketStatusCache="";currentPage="main";blameDataCache=null;jiraDataCache=null;dashboardDataCache=null;dashboardShowBranches=!1;autoRefreshEnabled=!0;setDashboardShowBranches(e){this.dashboardShowBranches=e}getDashboardShowBranches(){return this.dashboardShowBranches}setBlameData(e){this.blameDataCache=e}setJiraData(e){this.jiraDataCache=e}setDashboardData(e){this.dashboardDataCache=e}setAutoRefresh(e){this.autoRefreshEnabled=e,this.updateView()}isAutoRefreshEnabled(){return this.autoRefreshEnabled}setPage(e){this.currentPage=e,this.updateView()}updateView(){if(!this.webviewView)return;let e=this.webviewView.webview.asWebviewUri(k.Uri.joinPath(this._extensionUri,"resources","logo.png"));this.webviewView.webview.html=this._getHtmlForWebview(e,this.currentBranchCache,this.relatedBranchesCache,this.commitsCache,this.baseBranchesCache,this.recentTicketsCache,this.currentPage)}_getHtmlForWebview(e,o,s,r,l,d,u){let p=r.length>0?`
            <div class="separator"></div>
            <div style="padding: 0 4px;">
                <div style="font-size: 11px; opacity: 0.7; margin-bottom: 6px; display: flex; align-items: center; gap: 4px;">
                    <span>\u{1F4DC}</span> Recent Commits
                </div>
                <div style="display: flex; flex-direction: column; gap: 2px;">
                    ${r.map(m=>`
                        <div style="font-size: 11px; padding: 3px 4px; border-radius: 2px; display: flex; gap: 6px; align-items: baseline;">
                            <code style="color: var(--vscode-textLink-foreground); font-size: 10px; flex-shrink: 0;">${R(m.hash)}</code>
                            <span style="flex: 1; overflow: hidden; text-overflow: ellipsis; white-space: nowrap;" title="${R(m.message)}">${R(m.message)}</span>
                            <span style="font-size: 9px; opacity: 0.5; flex-shrink: 0;">${R(m.timeAgo)}</span>
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
        `;if(this.conflictState){let m=(this.conflictState.files||[]).map(w=>`
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
                
                ${m?`
                    <div style="font-size: 11px; opacity: 0.7; margin: 8px 4px 4px 4px; text-transform: uppercase;">Conflicted Files</div>
                    <div style="display: flex; flex-direction: column; gap: 2px;">
                        ${m}
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
            </html>`}if(u==="blame"){let m=this.blameDataCache;return`<!DOCTYPE html>
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

                ${m?`
                <div style="padding: 12px; background: var(--vscode-editor-background); border: 1px solid var(--vscode-widget-border); border-radius: 6px; margin-bottom: 12px;">
                    <div style="font-weight: bold; margin-bottom: 12px; font-size: 14px; text-align: center; color: var(--vscode-textLink-foreground); word-break: break-all;">
                        \u{1F4C4} ${m.fileName}
                    </div>


                    <div style="margin-bottom: 20px;">
                        <div style="font-size: 11px; font-weight: bold; opacity: 0.8; text-transform: uppercase; margin-bottom: 8px;"><span class="icon">\u{1F4BB}</span> Local Git (Last Commits)</div>
                        <ul style="list-style-type: none; padding: 0; margin: 0; display: flex; flex-direction: column; gap: 8px;">
                            ${m.gitHistory&&m.gitHistory.length>0?m.gitHistory.map(w=>`
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
                                <div style="font-weight: bold; font-size: 13px;">${m.sfAuthor}</div>
                                <div style="font-size: 11px; opacity: 0.7; margin-top: 2px;">${m.sfTime}</div>
                            </div>
                            ${m.sfCreatedBy!=="Unknown"&&m.sfCreatedBy!=="N/A"?`
                            <div style="background: var(--vscode-editorWidget-background); border: 1px solid var(--vscode-widget-border); padding: 8px 10px; border-radius: 4px; border-left: 4px solid var(--vscode-gitDecoration-addedResourceForeground);">
                                <div style="font-size: 10px; opacity: 0.7; text-transform: uppercase; margin-bottom: 2px;">Created By</div>
                                <div style="font-weight: bold; font-size: 13px;">${m.sfCreatedBy}</div>
                            </div>
                            `:""}
                        </div>
                    </div>

                    <div>
                        <div style="font-size: 11px; font-weight: bold; opacity: 0.8; text-transform: uppercase; margin-bottom: 8px;"><span class="icon">\u{1F575}\uFE0F</span> Setup Audit Trail (Recent)</div>
                        <ul style="list-style-type: none; padding: 0; margin: 0; display: flex; flex-direction: column; gap: 8px;">
                            ${m.auditHistory&&m.auditHistory.length>0?m.auditHistory.map(w=>`
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
            </html>`}if(u==="jira"){let m=this.jiraDataCache,w=m?.ticketId||"Jira",v=m?.summary||"No Title",b=m?.description||"No description provided.",$=m?.relatedBranches||[];return`<!DOCTYPE html>
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
                    
                    ${$.length>0?`
                        <div style="margin-top: 16px; border-top: 1px solid var(--vscode-panel-border); padding-top: 12px;">
                            <div style="font-size: 11px; opacity: 0.7; margin-bottom: 8px; text-transform: uppercase; font-weight: bold;"><span class="icon">\u{1F33F}</span> Related Branches & MRs</div>
                            <div style="display: flex; flex-direction: column; gap: 4px;">
                                ${$.map(E=>{let N="";return E.pipelineStatus==="running"?N="\u23F3":E.pipelineStatus==="success"?N="\u2705":E.pipelineStatus==="failed"?N="\u274C":E.pipelineStatus==="canceled"?N="\u{1F6D1}":E.pipelineStatus==="skipped"&&(N="\u23ED\uFE0F"),`
                                    <div class="btn" style="padding: 6px 10px; font-size: 12px; display: flex; justify-content: space-between; align-items: center; background-color: var(--vscode-button-secondaryBackground); color: var(--vscode-button-secondaryForeground); border-radius: 4px;" onclick="sendCheckoutCommand('${R(E.name)}')" title="Checkout ${R(E.name)}">
                                        <div style="display: flex; align-items: center; gap: 6px; overflow: hidden;">
                                            <span style="overflow: hidden; text-overflow: ellipsis; white-space: nowrap; font-weight: bold;">${R(E.name)}</span>
                                        </div>
                                        <div style="display: flex; gap: 6px; align-items: center;">
                                            ${N?`<span title="Pipeline: ${E.pipelineStatus}" style="font-size: 11px;">${N}</span>`:""}
                                            ${E.mrUrl?`<span onclick="event.stopPropagation(); sendCommand('openExternal', '${E.mrUrl}');" title="Open Merge Request" style="cursor: pointer; font-size: 12px;">\u{1F517}</span>`:""}
                                            ${E.isMerged?'<span style="background-color: var(--vscode-charts-green); color: white; border-radius: 3px; padding: 2px 6px; font-size: 10px; font-weight: bold;" title="Merged to target env">MERGED</span>':""}
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
                    ${m?.url?`
                    <button class="btn" style="flex: 1; background-color: var(--vscode-button-secondaryBackground); border-radius: 4px;" onclick="sendCommand('openExternal', '${m.url}')">
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
            </html>`}if(u==="dashboard"){let m=this.dashboardDataCache||{queries:[],selectedIndex:0,results:[],error:null},w=m.queries.map((b,$)=>`
                <option value="${$}" ${$===m.selectedIndex?"selected":""}>${R(b.name)}</option>
            `).join(""),v=m.error?`
                <div style="color: var(--vscode-errorForeground); padding: 12px; text-align: center; background: var(--vscode-editorError-background); border-radius: 4px;">
                    \u26A0\uFE0F ${R(m.error)}
                </div>
            `:m.results.length===0?`
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
                        ${m.results.map(b=>`
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
                                        ${b.detailedBranches.map($=>{let E="";return $.pipelineStatus==="running"?E="\u23F3":$.pipelineStatus==="success"?E="\u2705":$.pipelineStatus==="failed"?E="\u274C":$.pipelineStatus==="canceled"?E="\u{1F6D1}":$.pipelineStatus==="skipped"&&(E="\u23ED\uFE0F"),`
                                            <div style="display: flex; justify-content: space-between; align-items: center; font-size: 10px; background: var(--vscode-editor-background); padding: 2px 6px; border-radius: 3px;">
                                                <div style="display: flex; align-items: center; gap: 6px; overflow: hidden; cursor: pointer; flex: 1;" onclick="sendCheckoutCommand('${R($.name)}')" title="Checkout ${R($.name)}">
                                                    <span style="overflow: hidden; text-overflow: ellipsis; white-space: nowrap;">${R($.name)}</span>
                                                    ${E?`<span title="Pipeline: ${$.pipelineStatus}">${E}</span>`:""}
                                                </div>
                                                <div style="display: flex; gap: 6px; align-items: center;">
                                                    ${$.mrUrl?`<span onclick="event.stopPropagation(); sendCommand('openExternal', '${$.mrUrl}');" title="Open Merge Request" style="cursor: pointer;">\u{1F517}</span>`:""}
                                                    ${$.isMerged?'<span style="background-color: var(--vscode-charts-green); color: white; border-radius: 3px; padding: 1px 4px; font-size: 8px; font-weight: bold;">MERGED</span>':""}
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
                
                ${m.queries.length>0?`
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
            </html>`}if(u==="devtools")return`<!DOCTYPE html>
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
            </html>`;let i=s.find(m=>m.name===o),n="";i&&(i.pipelineStatus==="running"?n="\u23F3":i.pipelineStatus==="success"?n="\u2705":i.pipelineStatus==="failed"?n="\u274C":i.pipelineStatus==="canceled"?n="\u{1F6D1}":i.pipelineStatus==="skipped"&&(n="\u23ED\uFE0F"));let c=i?i.mrUrl:void 0,g=s.filter(m=>m.name!==o),f=o?`<div style="background-color: var(--vscode-editor-inactiveSelectionBackground); padding: 10px; border-radius: 6px; margin-bottom: 16px; border: 1px solid var(--vscode-panel-border); box-shadow: 0 2px 4px rgba(0,0,0,0.1); position: relative;">
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
                        ${c?`<span onclick="event.stopPropagation(); sendCommand('openExternal', '${c}');" title="Open Merge Request" style="cursor: pointer; font-size: 12px;">\u{1F517}</span>`:""}
                        ${this.currentBranchIsMergedCache?'<span style="background-color: var(--vscode-charts-green); color: white; border-radius: 3px; padding: 1px 4px; font-size: 10px; font-weight: bold;" title="Merged to target env">MERGED</span>':""}
                    </div>
                    ${this.ticketTitleCache?`<div style="font-size: 12px; margin-top: 6px; text-align: center; opacity: 0.9; font-style: italic;">${R(this.ticketTitleCache)}</div>`:""}
                    ${g.length>0?`
                        <div style="margin-top: 10px; border-top: 1px solid var(--vscode-panel-border); padding-top: 10px;">
                            <div style="font-size: 10px; opacity: 0.7; margin-bottom: 6px; text-transform: uppercase; text-align: center;">Sister Branches</div>
                            <div style="display: flex; flex-direction: column; gap: 4px;">
                                ${g.map(m=>{let w="";return m.pipelineStatus==="running"?w="\u23F3":m.pipelineStatus==="success"?w="\u2705":m.pipelineStatus==="failed"?w="\u274C":m.pipelineStatus==="canceled"?w="\u{1F6D1}":m.pipelineStatus==="skipped"&&(w="\u23ED\uFE0F"),`
                                    <div class="btn" style="padding: 4px 8px; font-size: 11px; display: flex; justify-content: space-between; align-items: center; background-color: var(--vscode-button-secondaryBackground); color: var(--vscode-button-secondaryForeground); border-radius: 4px;" onclick="sendCheckoutCommand('${R(m.name)}', this)" title="Checkout ${R(m.name)}">
                                        <div style="display: flex; align-items: center; gap: 4px; overflow: hidden;">
                                            <span style="overflow: hidden; text-overflow: ellipsis; white-space: nowrap; font-weight: bold;">${R(m.name)}</span>
                                        </div>
                                        <div style="display: flex; gap: 4px; align-items: center;">
                                            ${w?`<span title="Pipeline: ${m.pipelineStatus}" style="font-size: 10px;">${w}</span>`:""}
                                            ${m.mrUrl?`<span onclick="event.stopPropagation(); sendCommand('openExternal', '${m.mrUrl}');" title="Open Merge Request" style="cursor: pointer; font-size: 10px;">\u{1F517}</span>`:""}
                                            ${m.isMerged?'<span style="background-color: var(--vscode-charts-green); color: white; border-radius: 3px; padding: 1px 4px; font-size: 9px; font-weight: bold;" title="Merged to target env">MERGED</span>':""}
                                        </div>
                                    </div>
                                    `}).join("")}
                            </div>
                        </div>
                    `:d.length>0?`
                        <div style="margin-top: 10px; border-top: 1px solid var(--vscode-panel-border); padding-top: 10px;">
                            <div style="font-size: 10px; opacity: 0.7; margin-bottom: 6px; text-transform: uppercase; text-align: center;">Recent Tickets</div>
                            <div style="display: flex; flex-direction: column; gap: 4px;">
                                ${d.map(m=>`
                                    <div class="btn" style="padding: 4px 8px; font-size: 11px; display: flex; align-items: center; background-color: var(--vscode-button-secondaryBackground); color: var(--vscode-button-secondaryForeground); border-radius: 4px;" onclick="sendCheckoutCommand('${R(m)}', this)" title="Checkout ${R(m)}">
                                        <span style="font-weight: bold;">${R(m)}</span>
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


            ${l.length>0?`
                <div style="display: flex; gap: 4px; margin-bottom: 16px; flex-wrap: wrap; justify-content: center;">
                    ${l.map(m=>{let w=m.split("/").pop()?.toUpperCase()||m.toUpperCase();return`
                        <button class="btn" style="flex: 1; min-width: 25%; justify-content: center; padding: 6px 4px; font-size: 10px; font-weight: bold; background-color: var(--vscode-button-secondaryBackground); color: var(--vscode-button-secondaryForeground); border-radius: 4px;" onclick="sendCheckoutCommand('${R(m)}', this)" title="Checkout ${R(m)}">
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

            ${p}
            
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
        </html>`}}});function xt(t){me=t.secrets}async function kt(t){if(!me)throw new Error("SecretStorage is not initialized.");await me.store("ricwiz.jiraApiToken",t)}async function Ct(){if(!me)throw new Error("SecretStorage is not initialized.");return await me.get("ricwiz.jiraApiToken")}async function $t(t){if(!me)throw new Error("SecretStorage is not initialized.");await me.store("ricwiz.gitlabApiToken",t)}async function rt(){if(!me)throw new Error("SecretStorage is not initialized.");return await me.get("ricwiz.gitlabApiToken")}var me,ze=z(()=>{"use strict"});var Ee={};Le(Ee,{checkBranchExists:()=>he,checkRemoteBranchExists:()=>Pt,exec:()=>h,extractTicketSuggestion:()=>Be,getCurrentBranch:()=>U,getWorkspaceCwd:()=>x,normalizeTicketId:()=>St,promptForTicketId:()=>H,resolvePrefix:()=>Pe,ricwizLogger:()=>O});function x(){let t=Se.workspace.workspaceFolders;if(t)return t[0].uri.fsPath}async function U(t){try{let{stdout:e}=await h("git branch --show-current",{cwd:t});return e.trim()}catch{return""}}function Pe(t,e){if(!t.includes(e)){let o=t.match(/([A-Z]+-)\d+/i);if(o)return o[1].toUpperCase()}return e}function Be(t,e,o=!1){let s=t.match(new RegExp(`(${e}\\d+)`,"i"));return s?s[1].toUpperCase():t.includes(e)&&!t.includes("-to-")?t.substring(t.indexOf(e)):o&&t.includes("-to-")?t.substring(t.indexOf(e)).split("-to-")[0]:""}function St(t,e){let o=t.trim();return/^\d/.test(o)?`${e}${o}`.toUpperCase():o.toUpperCase()}async function H(t,e){let o=Se.workspace.getConfiguration("ricwiz"),s=e?.prefix??o.get("ticketPrefix","SFPSCA-"),r=await U(t),l=Pe(r,s),d=e?.suggestedValue??Be(r,l,e?.handleToSuffix),u=await Se.window.showInputBox({prompt:e?.prompt||"Enter the full ticket ID (e.g., SCPSCA-1234) or just the number",placeHolder:e?.placeHolder||"Ticket ID or number",value:d});return u?{ticketId:St(u,l),currentBranch:r,prefix:l}:void 0}async function he(t,e){try{return await h(`git show-ref --verify --quiet refs/heads/${e}`,{cwd:t}),!0}catch{}return await Pt(t,e)}async function Pt(t,e){try{let{stdout:o}=await h(`git branch -r --list "*/${e}"`,{cwd:t});return o.trim().length>0}catch{return!1}}var Se,Rt,zt,ri,O,h,P=z(()=>{"use strict";Se=y(require("vscode")),Rt=y(require("child_process")),zt=y(require("util")),ri=zt.promisify(Rt.exec),O=Se.window.createOutputChannel("Ricwiz"),h=async(t,e)=>{O.appendLine(`[EXEC] ${t}`);let o=await ri(t,{maxBuffer:50*1024*1024,...e});return{stdout:o.stdout.toString(),stderr:o.stderr.toString()}}});var at={};Le(at,{WorkflowContext:()=>M});var Ae,Bt,He,M,J=z(()=>{"use strict";Ae=y(require("vscode")),Bt=y(require("path")),He=y(require("fs")),M=class t{style;upstreamRemote;originRemote;ticketSourceBranch;ticketPrefix;branchPrefix;environments;static baseConfig=Ae.workspace.getConfiguration("ricwiz");activeProfile;profileName;constructor(e){this.activeProfile=e,this.profileName=e?.name;let o=t.baseConfig;this.style=e?.workflowStyle||o.get("workflowStyle","standard"),this.style==="multi-remote"?(this.upstreamRemote=e?.upstreamRemote||o.get("upstreamRemote","salesforce-master"),this.originRemote=e?.originRemote||o.get("originRemote","origin")):(this.upstreamRemote="origin",this.originRemote="origin"),this.ticketSourceBranch=e?.ticketSourceBranch||o.get("ticketSourceBranch","main"),this.ticketPrefix=e?.ticketPrefix||o.get("ticketPrefix","SFPSCA-"),this.branchPrefix=e?.branchPrefix??o.get("branchPrefix","");let s=[{name:"Qual",sourceBranch:"quality"},{name:"Val",sourceBranch:"validation"},{name:"Prod",sourceBranch:"main"}];this.environments=e?.environments||o.get("environments",s)}getConfig(e,o){return this.activeProfile&&this.activeProfile[e]!==void 0?this.activeProfile[e]:t.baseConfig.get(e,o)}static async initialize(e,o){let s=t.baseConfig.get("profiles",[]),r=Bt.join(e,"ricwiz.json");if(He.existsSync(r))try{let l=He.readFileSync(r,"utf-8"),d=JSON.parse(l);d&&Array.isArray(d.profiles)&&(s=[...s,...d.profiles])}catch(l){Ae.window.showErrorMessage(`Ricwiz: Error parsing ricwiz.json: ${l.message}`)}if(s.length>0){if(!o?.forcePrompt)try{let{exec:p}=(P(),I(Ee)),{stdout:a}=await p("git branch --show-current",{cwd:e}),i=a.trim(),n=i;i.includes("-to-")&&(n=i.split("-to-")[0]);let{stdout:c}=await p(`git config branch.${n}.ricwiz-profile`,{cwd:e}),g=c.trim();if(g){let f=s.find(m=>m.name===g);if(f)return new t(f)}}catch{}if(o?.skipPrompt)return new t;let l=s.map(p=>p.name),d=await Ae.window.showQuickPick(l,{placeHolder:"Ricwiz: Select Workflow Profile",ignoreFocusOut:!0});if(!d)return;let u=s.find(p=>p.name===d);return new t(u)}return new t}buildUpstreamPath(e){return e.includes("/")?e:`${this.upstreamRemote}/${e}`}getFetchRemote(e){return e.includes("/")?e.split("/")[0]:this.upstreamRemote}getFetchBranch(e){return e.includes("/")?e.substring(e.indexOf("/")+1):e}}});async function Et(){let t=x();if(!t){V.window.showErrorMessage("Ricwiz: Open a workspace that is a Git repository.");return}let e=await M.initialize(t,{skipPrompt:!0}),o=e?e.ticketSourceBranch:V.workspace.getConfiguration("ricwiz").get("ticketSourceBranch","main"),s=e?e.originRemote:"origin";await V.window.withProgress({location:V.ProgressLocation.Notification,title:`Ricwiz: Finding deleted files compared to ${s}/${o}...`,cancellable:!1},async()=>{try{let{stdout:r}=await h(`git diff --name-only --diff-filter=D ${s}/${o}...HEAD`,{cwd:t}),l=r.split(`
`).map(g=>g.trim()).filter(g=>g.length>0);if(l.length===0){V.window.showInformationMessage(`Ricwiz: No deleted files found compared to ${s}/${o}.`);return}let d={},u=(g,f)=>{d[g]||(d[g]=[]),d[g].includes(f)||d[g].push(f)};for(let g of l){let f=g.replace(/\\/g,"/");if(f.includes("/classes/")){let m=f.match(/\/classes\/([^/.]+)\.cls/);m&&u("ApexClass",m[1])}else if(f.includes("/triggers/")){let m=f.match(/\/triggers\/([^/.]+)\.trigger/);m&&u("ApexTrigger",m[1])}else if(f.includes("/lwc/")){let m=f.match(/\/lwc\/([^/]+)\//);m&&u("LightningComponentBundle",m[1])}else if(f.includes("/aura/")){let m=f.match(/\/aura\/([^/]+)\//);m&&u("AuraDefinitionBundle",m[1])}else if(f.includes("/objects/")&&f.includes("/fields/")){let m=f.match(/\/objects\/([^/]+)\//),w=f.match(/\/fields\/([^/.]+)\.field/);m&&w&&u("CustomField",`${m[1]}.${w[1]}`)}else if(f.includes("/objects/")){let m=f.match(/\/objects\/([^/.]+)\.object/);m&&u("CustomObject",m[1])}else if(f.includes("/layouts/")){let m=f.match(/\/layouts\/([^/.]+)\.layout/);m&&u("Layout",m[1])}else if(f.includes("/flows/")){let m=f.match(/\/flows\/([^/.]+)\.flow/);m&&u("Flow",m[1])}else if(f.includes("/permissionsets/")){let m=f.match(/\/permissionsets\/([^/.]+)\.permissionset/);m&&u("PermissionSet",m[1])}else if(f.includes("/profiles/")){let m=f.match(/\/profiles\/([^/.]+)\.profile/);m&&u("Profile",m[1])}else if(f.includes("/customMetadata/")){let m=f.match(/\/customMetadata\/([^/.]+)\.md/);m&&u("CustomMetadata",m[1])}else if(f.includes("/flexipages/")){let m=f.match(/\/flexipages\/([^/.]+)\.flexipage/);m&&u("FlexiPage",m[1])}}if(Object.keys(d).length===0){V.window.showInformationMessage("Ricwiz: Found deleted files in Git, but none mapped to recognizable Salesforce metadata.");return}let p=`<?xml version="1.0" encoding="UTF-8"?>
<Package xmlns="http://soap.sforce.com/2006/04/metadata">
`;for(let g of Object.keys(d).sort()){p+=`    <types>
`;for(let f of d[g].sort())p+=`        <members>${f}</members>
`;p+=`        <name>${g}</name>
    </types>
`}p+=`    <version>58.0</version>
</Package>`;let a=Ve.join(t,"destructiveChanges");we.existsSync(a)||we.mkdirSync(a);let i=Ve.join(a,"destructiveChanges.xml"),n=Ve.join(a,"package.xml");we.writeFileSync(i,p,"utf8"),we.existsSync(n)||we.writeFileSync(n,`<?xml version="1.0" encoding="UTF-8"?>
<Package xmlns="http://soap.sforce.com/2006/04/metadata">
    <version>58.0</version>
</Package>`,"utf8");let c=await V.workspace.openTextDocument(i);await V.window.showTextDocument(c),V.window.showInformationMessage("Ricwiz: destructiveChanges.xml generated successfully!")}catch(r){V.window.showErrorMessage(`Ricwiz: Error generating destructive changes: ${r.message}`)}})}var V,Ve,we,Tt=z(()=>{"use strict";V=y(require("vscode")),Ve=y(require("path")),we=y(require("fs"));P();J()});async function Mt(){let t=x();if(!t)return;let e=await M.initialize(t,{skipPrompt:!0}),o=e?e.ticketSourceBranch:ae.workspace.getConfiguration("ricwiz").get("ticketSourceBranch","main"),s=e?e.originRemote:"origin";await ae.window.withProgress({location:ae.ProgressLocation.Notification,title:"Ricwiz: Finding Apex Tests to run...",cancellable:!1},async()=>{try{let{stdout:r}=await h(`git diff --name-status ${s}/${o}...HEAD`,{cwd:t}),l=r.split(`
`).map(g=>g.trim()).filter(g=>g.length>0),d=new Set,u=new Set;for(let g of l){let f=g.split(/\s+/);if(f[0].startsWith("D"))continue;let m=f[1];if(m&&m.endsWith(".cls")){let w=m.match(/\/classes\/([^/.]+)\.cls/);if(w){let v=w[1];v.toLowerCase().endsWith("test")?d.add(v):u.add(v)}}}for(let g of u)d.add(`${g}Test`);if(d.size===0){ae.window.showInformationMessage("Ricwiz: No Apex Classes were modified in this branch.");return}let p=Array.from(d).map(g=>({label:`$(beaker) ${g}`,description:"Apex Test Class"})),a=await ae.window.showQuickPick(p,{canPickMany:!0,title:"Select Test Classes to Run",placeHolder:"Select tests..."});if(!a||a.length===0)return;let n=`sf apex run test -n ${a.map(g=>g.label.replace("$(beaker) ","").trim()).join(",")} -r human -w 30`,c=ae.window.createTerminal("Ricwiz: Smart Tests");c.show(),c.sendText(n)}catch(r){ae.window.showErrorMessage(`Ricwiz: Error finding tests: ${r.message}`)}})}var ae,Dt=z(()=>{"use strict";ae=y(require("vscode"));P();J()});var xe,Lt=z(()=>{"use strict";xe=class{static isValidShellArg(e){return e?/^[a-zA-Z0-9\-_/.]+$/.test(e):!1}}});async function At(t){let e=x();if(!e){A.window.showErrorMessage("Open a folder or workspace that is a Git repository.");return}let o=await M.initialize(e,{forcePrompt:!0});if(!o)return;let s=typeof t=="string"?t:void 0,r=await H(e,{prefix:o.ticketPrefix,suggestedValue:s});if(!r){A.window.showErrorMessage("Branch creation cancelled: Ticket not provided.");return}let{ticketId:l}=r,d=o.environments,u="all",p=[{label:"Create Main Branch & Environments",description:"Creates the main ticket branch and all environment branches",value:"all"},{label:"Create Main Branch Only",description:"Creates only the main ticket branch (skips environments)",value:"mainOnly"},{label:"Create Environments Only",description:"Creates only the environment branches (skip main branch)",value:"envs"}];if(d.length>0){let c=await A.window.showQuickPick(p,{placeHolder:"Ricwiz: What do you want to create?",ignoreFocusOut:!0});if(!c)return;u=c.value}let a=o.ticketSourceBranch;if(u==="all"||u==="mainOnly"){let c=[];try{let{stdout:w}=await h('git branch --all --format="%(refname:short)"',{cwd:e});c=w.split(`
`).map(v=>v.trim()).filter(v=>v&&v!=="origin"),c=[...new Set(c)]}catch{}let g=A.window.createQuickPick();g.title="Ricwiz: Ticket Source Branch",g.placeholder="Confirm or change the source branch for this ticket",g.value=o.ticketSourceBranch,g.ignoreFocusOut=!0;let f=()=>{let w=g.value.trim(),v=[];w&&v.push({label:w,description:"Use typed branch"}),v.push(...c.map(b=>({label:b}))),g.items=v};g.onDidChangeValue(f),f();let m=await new Promise(w=>{g.onDidAccept(()=>{let v=g.selectedItems[0];w(v?v.label:g.value),g.hide()}),g.onDidHide(()=>w(void 0)),g.show()});if(!m){A.window.showInformationMessage("Branch creation cancelled.");return}a=m.trim()}let i="";if(o.branchPrefix){let c=await A.window.showInputBox({prompt:"Ricwiz: Branch Prefix (leave empty to not use a prefix)",placeHolder:"e.g. CRC-R19-",value:o.branchPrefix,ignoreFocusOut:!0});if(c===void 0){A.window.showInformationMessage("Branch creation cancelled.");return}i=c.trim()}let n=i?`${i}${l}`:l;if(!xe.isValidShellArg(n)){A.window.showErrorMessage(`Invalid format for ticket ID: ${n}`);return}if(!xe.isValidShellArg(a)){A.window.showErrorMessage(`Invalid format for ticketSourceBranch in settings: ${a}`);return}for(let c of d){if(!xe.isValidShellArg(c.name)){A.window.showErrorMessage(`Invalid format for environment name in settings: ${c.name}`);return}if(!xe.isValidShellArg(c.sourceBranch)){A.window.showErrorMessage(`Invalid format for environment sourceBranch in settings: ${c.sourceBranch}`);return}}try{await h("git status",{cwd:e})}catch{A.window.showErrorMessage("The opened folder does not appear to be a valid Git repository.");return}try{await A.window.withProgress({location:A.ProgressLocation.Notification,title:"Ricwiz: Creating Branches",cancellable:!1},async c=>{let g=[];c.report({message:"Checking remote status (git fetch)...",increment:10});try{await h("git fetch",{cwd:e})}catch{}try{if(u==="all"||u==="mainOnly"){if(c.report({message:`Creating main branch ${n}...`,increment:10}),await he(e,n))A.window.showInformationMessage(`Ricwiz: The branch ${n} already exists. Skipping creation...`),await h(`git checkout ${n}`,{cwd:e});else try{let f=o.getFetchRemote(a),m=o.getFetchBranch(a),w=o.buildUpstreamPath(a);await h(`git fetch ${f} ${m}`,{cwd:e}),await h(`git checkout -b ${n} ${w}`,{cwd:e}),g.push(n)}catch{try{await h(`git checkout -b ${n} ${a}`,{cwd:e}),g.push(n)}catch{throw new Error(`Could not create main branch '${n}' from '${a}'. Does the source branch exist?`)}}try{await h(`git config branch.${n}.ricwiz-source "${a}"`,{cwd:e}),o.profileName&&await h(`git config branch.${n}.ricwiz-profile "${o.profileName}"`,{cwd:e})}catch{}}if(u==="all"||u==="envs"){let f=50/(d.length||1);for(let m of d){let w=i?`${i}${l}-to-${m.name}`:`${l}-to-${m.name}`,v=m.sourceBranch;if(c.report({message:`Processing environment branch ${w}...`,increment:f}),!await he(e,w))try{let b=o.buildUpstreamPath(v);await h(`git checkout -b ${w} ${b}`,{cwd:e}),g.push(w)}catch{try{await h(`git checkout -b ${w} ${v}`,{cwd:e}),g.push(w)}catch{throw new Error(`Could not create environment branch '${w}' from '${v}'. Does the source branch exist?`)}}}}c.report({message:`Publishing branches to ${o.originRemote}...`,increment:10});for(let f of g)try{await h(`git push -u ${o.originRemote} ${f}`,{cwd:e})}catch{A.window.showWarningMessage(`Ricwiz: Branch ${f} was created locally but could not be pushed to ${o.originRemote}.`)}if(u==="all"||u==="mainOnly"){c.report({message:`Switching to ${n}...`,increment:10});try{await h(`git checkout ${n}`,{cwd:e})}catch{}}c.report({increment:100}),A.window.showInformationMessage("Ricwiz: All set! You can start working on your branches! \u{1F680}")}catch(f){if(A.window.showErrorMessage(`Ricwiz Branch Creation Failed: ${f.message}`),g.length>0){try{await h(`git checkout ${a}`,{cwd:e})}catch{}for(let m of g)try{await h(`git branch -D ${m}`,{cwd:e})}catch{}A.window.showWarningMessage(`Ricwiz: Rolled back (deleted) ${g.length} branch(es) locally due to failure.`)}}})}catch(c){A.window.showErrorMessage(`Ricwiz general error: ${c.message}`)}}var A,It=z(()=>{"use strict";A=y(require("vscode"));P();Lt();J()});async function ke(t,e,o,s){s&&s.report({message:"CONFLICT! Resolve & click 'Commit & Continue' in Ricwiz panel."});let r=!1,l=!1,d=async()=>{try{let{stdout:i}=await h("git status --porcelain",{cwd:t});return i.split(`
`).filter(n=>{let c=n.substring(0,2);return["UD","DU","DD","AU","UA"].includes(c)}).map(n=>n.substring(3).trim())}catch{return[]}},u=async()=>{try{let{stdout:i}=await h("git status --porcelain",{cwd:t}),n=c=>c==="UU"?"Both Modified":c==="UD"?"Deleted by them":c==="DU"?"Deleted by us":c==="DD"?"Both Deleted":c==="AA"?"Both Added":c==="AU"?"Added by us":c==="UA"?"Added by them":"Conflicted";return i.split(`
`).map(c=>c.trimRight()).filter(c=>c.length>2).filter(c=>{let g=c.substring(0,2);return["UU","AA","UD","DU","AU","UA","DD"].includes(g)}).map(c=>{let g=c.substring(0,2);return{file:c.substring(3).trim(),state:n(g)}})}catch{return[]}},p=async()=>{if(r)return;let i=await d(),n=await u(),{webviewProvider:c}=(Qe(),I(_e));c&&c.setConflictState({isConflict:!0,sourceStr:e,targetStr:o,deletionsCount:i.length,files:n})},a=ce.commands.registerCommand("ricwiz.conflictAction",async i=>{if(i==="abortDeploy")l=!0;else if(i==="resolveDeletions"){try{let c=(await d()).map(f=>({label:f})),g=await ce.window.showQuickPick(c,{canPickMany:!0,placeHolder:"Select conflicted files to DELETE",title:"Ricwiz: Delete Conflicted Files"});if(g&&g.length>0){for(let f of g)try{await h(`git rm --force "${f.label}"`,{cwd:t})}catch{}ce.window.showInformationMessage(`Ricwiz: Deleted ${g.length} conflicted file(s).`)}}catch(n){ce.window.showErrorMessage(`Ricwiz: Error. (${n.message})`)}p()}else if(i==="commitAndContinue")try{let c=(await d()).filter(f=>Ft.existsSync(Ot.join(t,f)));if(c.length>0&&await ce.window.showWarningMessage(`Wait! There are ${c.length} file(s) with deletion conflicts that are still on your disk.

If you commit now, you will KEEP them in the project.

Are you sure you want to KEEP them?`,{modal:!0},"Yes, KEEP them","No, let me DELETE them")!=="Yes, KEEP them"){p();return}let g=!1;try{let{stdout:f}=await h('git grep -E "^<<<<<<< "',{cwd:t});f.trim().length>0&&(g=!0)}catch{}if(g){ce.window.showErrorMessage("Ricwiz: You still have unresolved conflict markers (<<<<<<<) in your files. Please resolve them first!"),p();return}await h("git add .",{cwd:t}),await h("git commit --no-edit",{cwd:t})}catch(n){ce.window.showErrorMessage(`Ricwiz: Could not commit automatically. (${n.message})`),p()}});for(p();;){if(l){r=!0,a.dispose(),(Qe(),I(_e)).webviewProvider?.setConflictState(null);try{await h("git merge --abort",{cwd:t})}catch{}return!1}try{let{stdout:i}=await h("git status --porcelain",{cwd:t});if(i.trim().length===0)return r=!0,a.dispose(),(Qe(),I(_e)).webviewProvider?.setConflictState(null),ce.window.showInformationMessage("Ricwiz: Changes committed!"),!0}catch{}await new Promise(i=>setTimeout(i,2e3))}}var ce,Ft,Ot,Ye=z(()=>{"use strict";ce=y(require("vscode")),Ft=y(require("fs")),Ot=y(require("path"));P()});var et={};Le(et,{fetchMergeRequestStatus:()=>Xe,hasGitlabToken:()=>Ke,ricwizLogger:()=>W});async function Ke(){let t=await rt();return!!(t&&t.trim())}async function ai(t,e){let o=Ze.workspace.getConfiguration("ricwiz"),s=(await rt())?.trim();if(!s)throw new Error("No GitLab token");let r=e?e.getConfig("gitlabUrlOverride",""):o.get("gitlabUrlOverride",""),l=[];if(r&&r.trim()!=="")l.push(r.trim());else try{let{stdout:u}=await h("git remote",{cwd:t}),p=u.split(`
`).map(i=>i.trim()).filter(i=>i),a=[];e&&e.upstreamRemote&&p.includes(e.upstreamRemote)&&a.push(e.upstreamRemote),e&&e.originRemote&&e.originRemote!==e.upstreamRemote&&p.includes(e.originRemote)&&a.push(e.originRemote),p.includes("upstream")&&!a.includes("upstream")&&a.push("upstream"),p.includes("origin")&&!a.includes("origin")&&a.push("origin"),a.length===0&&p.length>0&&a.push(...p);for(let i of a)try{let{stdout:n}=await h(`git remote get-url ${i}`,{cwd:t}),c=n.trim();c.endsWith(".git")&&(c=c.slice(0,-4)),c.startsWith("git@")&&(c=c.replace("git@","").replace(":","/"),c=`https://${c}`),l.push(c)}catch(n){W.appendLine(`[GitLab API] Error getting remote URL for ${i}: ${n.message}`)}}catch(u){W.appendLine(`[GitLab API] Error getting remotes: ${u.message}`)}if(l.length===0)throw W.appendLine("[GitLab API] No candidate URLs found in getGitlabTargets!"),new Error("Could not get any remote origin URL.");return l.map(u=>{let p=new URL(u),a=`${p.protocol}//${p.host}`,i=p.pathname;i.startsWith("/")&&(i=i.substring(1)),i.endsWith("/")&&(i=i.slice(0,-1)),i.endsWith(".git")&&(i=i.slice(0,-4));let n=encodeURIComponent(i);return{baseUrl:a,token:s,projectPath:n}})}async function ct(t,e,o,s,r){let l=new URL(`${e}${r}`);return W.appendLine(`[GitLab API] ${s} ${l.toString()}`),new Promise((d,u)=>{let p=Ut.request(l,{method:s,timeout:5e3,headers:{"PRIVATE-TOKEN":o,Accept:"application/json"}},a=>{let i="";a.on("data",n=>i+=n),a.on("end",()=>{if(W.appendLine(`[GitLab API] Response Code: ${a.statusCode}`),a.statusCode&&a.statusCode>=400)return W.appendLine(`[GitLab API] Error Data: ${i}`),u(new Error(`GitLab API error: ${a.statusCode}`));if(!i)return d({});try{let n=JSON.parse(i);Array.isArray(n)?W.appendLine(`[GitLab API] Returned array with ${n.length} items`):n&&typeof n=="object"&&W.appendLine(`[GitLab API] Returned object with id ${n.id||n.iid||"unknown"}`),d(n)}catch(n){W.appendLine(`[GitLab API] Parse Error: ${n.message}`),u(n)}})});p.on("timeout",()=>{p.destroy(),u(new Error("GitLab request timed out"))}),p.on("error",a=>{W.appendLine(`[GitLab API] Request Failed: ${a.message}`),u(a)}),p.end()})}async function Xe(t,e,o,s){W.appendLine(`[GitLab API] fetchMergeRequestStatus called for source: ${e}, target: ${o||"any"}`);let r=`${t}:${e}:${o||"any"}`,l=dt.get(r);if(l&&Date.now()-l.timestamp<ci)return l.data;try{let d=await ai(t,s),u=null,p=-1;for(let a of d)try{let i=`/api/v4/projects/${a.projectPath}/merge_requests?source_branch=${encodeURIComponent(e)}&order_by=updated_at&sort=desc`;o&&(i+=`&target_branch=${encodeURIComponent(o)}`);let n=await ct(t,a.baseUrl,a.token,"GET",i);if(n&&n.length>0){let c=n[0];try{let w=await ct(t,a.baseUrl,a.token,"GET",`/api/v4/projects/${a.projectPath}/merge_requests/${c.iid}`);w&&(c=w)}catch{}let g="none";if(c.head_pipeline&&c.head_pipeline.status){let w=c.head_pipeline.status;w==="success"||w==="failed"||w==="canceled"||w==="skipped"?g=w:g="running"}let f={isMerged:c.state==="merged",isOpen:c.state==="opened",pipelineStatus:g,webUrl:c.web_url},m=0;f.isOpen?m=2:f.isMerged&&(m=1),m>p&&(u=f,p=m)}}catch(i){W.appendLine(`[GitLab API] Error inside target loop: ${i.message}`)}if(u)return dt.set(r,{data:u,timestamp:Date.now()}),u;for(let a of d)try{let i=`/api/v4/projects/${a.projectPath}/pipelines?ref=${encodeURIComponent(e)}&order_by=updated_at&sort=desc`,n=await ct(t,a.baseUrl,a.token,"GET",i);if(n&&n.length>0){let c=n[0],g="none";if(c.status){let m=c.status;m==="success"||m==="failed"||m==="canceled"||m==="skipped"?g=m:g="running"}let f={isMerged:!1,isOpen:!1,pipelineStatus:g,webUrl:c.web_url};return dt.set(r,{data:f,timestamp:Date.now()}),f}}catch{}return null}catch(d){return W.appendLine(`[GitLab API] Failed to fetch MR status: ${d.message}`),null}}var Ut,Ze,W,dt,ci,Ie=z(()=>{"use strict";Ut=y(require("https")),Ze=y(require("vscode"));ze();P();W=Ze.window.createOutputChannel("Ricwiz Debug");dt=new Map,ci=30*1e3});var ve={};Le(ve,{findRelatedBranches:()=>gt,getCurrentBranchMergeStatus:()=>mt,getRecentCommits:()=>pt,getRecentTickets:()=>ut,getRelatedBranchesStatus:()=>lt,resolveExistingBranchName:()=>di});function Nt(t,e){return e.find(o=>t.endsWith(`-to-${o.name}`))}async function lt(t,e,o,s,r){let l=await Ke();return await Promise.all(e.map(async u=>{let p=Nt(u,s);if(l){let a=p?p.sourceBranch:void 0,i=await Xe(t,u,a,r);if(i)return{name:u,isMerged:i.isMerged,pipelineStatus:i.pipelineStatus,mrUrl:i.webUrl}}else{let{ricwizLogger:a}=(Ie(),I(et));a.appendLine(`[GitLab API] Skipping MR check for ${u} because hasGitlabToken() is false`)}return{name:u,isMerged:!1}}))}async function mt(t,e,o,s){let r=Nt(e,o);if(!r)return!1;if(await Ke()){let l=await Xe(t,e,r.sourceBranch,s);if(l)return l.isMerged}else{let{ricwizLogger:l}=(Ie(),I(et));l.appendLine(`[GitLab API] Skipping MR check for current branch ${e} because hasGitlabToken() is false`)}return!1}async function pt(t,e=10){try{let{stdout:o}=await h(`git log --oneline -${e} --format="%h|||%s|||%ar"`,{cwd:t});return o.split(`
`).filter(s=>s.trim()).map(s=>{let r=s.split("|||");return{hash:r[0]||"",message:r.length>=3?r.slice(1,-1).join("|||"):r[1]||"",timeAgo:r.length>=3?r[r.length-1]:""}})}catch{return[]}}async function ut(t,e=3){try{let{stdout:o}=await h('git for-each-ref --sort=-committerdate --format="%(refname:short)" refs/heads/',{cwd:t}),s=o.split(`
`).map(l=>l.trim()).filter(l=>l),r=/^[A-Z]+-\d+$/i;return s.filter(l=>r.test(l)).slice(0,e)}catch{return[]}}async function gt(t,e,o){let{stdout:s}=await h(`git branch --all --list "*${e}*"`,{cwd:t}),r=new Set,l=new RegExp(`${e}(?!\\d)`,"i");return s.split(`
`).forEach(d=>{let u=d.replace("*","").trim();if(u){if(u.startsWith("remotes/")){let p=u.split("/");p.length>2&&(u=p.slice(2).join("/"))}u&&u!==o&&!u.includes("HEAD")&&l.test(u)&&r.add(u)}}),Array.from(r)}async function di(t,e,o){try{let s=require("child_process"),l=require("util").promisify(s.exec),{stdout:d}=await l(`git branch --all --list "*${e}*"`,{cwd:t}),u=new RegExp(`${e}(?!\\d)`,"i"),p=d.split(`
`).map(i=>i.replace("*","").trim().replace(/^remotes\/[^\/]+\//,"")).filter(i=>i&&!i.includes("HEAD")&&u.test(i)),a=Array.from(new Set(p));if(o){let i=`-to-${o}`,n=a.find(c=>c.endsWith(i));return n||`${e}${i}`}else{let i=a.find(n=>!n.includes("-to-"));return i||e}}catch{return o?`${e}-to-${o}`:e}}var pe=z(()=>{"use strict";P();Ie()});async function jt(){let t=x();if(!t){q.window.showErrorMessage("Ricwiz: Open a folder or workspace that is a Git repository.");return}try{await h("git status",{cwd:t})}catch{q.window.showErrorMessage("Ricwiz: The opened folder does not appear to be a valid Git repository.");return}let e=await M.initialize(t);if(!e)return;let o=e.environments,s=await H(t,{prefix:e.ticketPrefix});if(!s){q.window.showErrorMessage("Operation cancelled: Ticket not provided.");return}let{ticketId:r,currentBranch:l}=s,{resolveExistingBranchName:d}=(pe(),I(ve)),u=await d(t,r);if(!await he(t,u)){q.window.showErrorMessage(`Ricwiz: Main branch '${u}' does not exist! Prepare deploy is only available when a main ticket branch is used.`);return}let p=e.getConfig("defaultReviewers",""),a="";try{let{stdout:i}=await h(`git config branch.${r}.ricwiz-reviewers`,{cwd:t});a=i.trim()}catch{}if(p.trim()){let i=await q.window.showInputBox({prompt:"Ricwiz: Reviewers for this deploy (optional, comma-separated)",placeHolder:"e.g. @joao, 123456",value:a||p,ignoreFocusOut:!0});if(i===void 0)return;try{i.trim()?await h(`git config branch.${r}.ricwiz-reviewers "${i.trim()}"`,{cwd:t}):a&&await h(`git config --unset branch.${r}.ricwiz-reviewers`,{cwd:t})}catch{}}await q.window.withProgress({location:q.ProgressLocation.Notification,title:"Ricwiz: Preparing Deploy",cancellable:!0},async(i,n)=>{let c=0,g=l,f=!1;n.onCancellationRequested(()=>{f=!0}),i.report({message:"Syncing remote information...",increment:10});try{await h("git fetch --all",{cwd:t});let w=10/(o.length||1);for(let v of o)try{if(f)throw new Error("Aborted");i.report({message:`Fetching ${v.sourceBranch}...`,increment:w});let b=e.getFetchRemote(v.sourceBranch),$=e.getFetchBranch(v.sourceBranch);await h(`git fetch ${b} ${$}:${$}`,{cwd:t})}catch{}}catch{}let m=60/(o.length||1);for(let w of o){if(f)break;let v=await d(t,r,w.name),b=w.sourceBranch;try{i.report({message:`Processing ${v}...`,increment:m/4}),await h(`git checkout ${v}`,{cwd:t});try{await h(`git pull ${e.originRemote} ${v}`,{cwd:t})}catch{}let $=async S=>{try{await h(`git merge ${S}`,{cwd:t})}catch(T){let oe=!1;try{let{stdout:le}=await h("git ls-files -u",{cwd:t});le.trim().length>0&&(oe=!0)}catch{}let Y=((T.stdout||"")+(T.stderr||"")+(T.message||"")).toLowerCase();if(oe||Y.includes("conflict")||Y.includes("conflit")){if(!await ke(t,S,v,i))throw f=!0,new Error("Deploy aborted by user.")}else throw T}};i.report({message:`Merging ${b} into ${v}...`,increment:m/4});let E=e.getFetchRemote(b),N=e.getFetchBranch(b),D=e.buildUpstreamPath(b);if(await h(`git fetch ${E} ${N}`,{cwd:t}),await $(D),i.report({message:`Merging ${u} into ${v}...`,increment:m/4}),await $(u),f)break;i.report({message:`Pushing ${v}...`,increment:m/4}),await h(`git push ${e.originRemote} ${v}`,{cwd:t}),c++}catch($){$.message.includes("aborted")?q.window.showInformationMessage("Ricwiz: Deploy cancelled."):q.window.showErrorMessage(`Ricwiz: Failed to process branch ${v}. Detail: ${$.message}`);return}}if(!f){i.report({message:"Finishing up...",increment:10});let w=g;try{await h(`git show-ref --verify --quiet refs/heads/${u}`,{cwd:t}),w=u}catch{}try{let v=await U(t);w&&w!==v?(await h(`git checkout ${w}`,{cwd:t}),q.window.showInformationMessage(`Ricwiz: Operation complete. Back on branch ${w}.`)):q.window.showInformationMessage("Ricwiz: Operation complete.")}catch{q.window.showInformationMessage("Ricwiz: Operation complete.")}}})}var q,Jt=z(()=>{"use strict";q=y(require("vscode"));P();Ye();J()});async function Wt(t=!1){let e=x();if(!e)return;let o=await M.initialize(e);if(!o)return;let s=await H(e,{prompt:"Enter the full ticket ID for the Merge Requests (e.g., SCPSCA-1234) or just the number"});if(!s)return;let{ticketId:r}=s,l=o.getConfig("gitlabUrlOverride",""),d="";if(l&&l.trim()!=="")d=l.trim().replace(/\/+$/,"");else{let i="";try{let n=o.upstreamRemote||"origin",{stdout:c}=await h(`git remote get-url ${n}`,{cwd:e});i=c.trim()}catch{ue.window.showErrorMessage("Ricwiz: Could not get the remote origin URL. Please configure the URL manually in the extension settings.");return}d=i,d.endsWith(".git")&&(d=d.slice(0,-4)),d.startsWith("git@")&&(d=d.replace("git@","").replace(":","/"),d=`https://${d}`)}let u=[],p=o.ticketSourceBranch;try{let{stdout:i}=await h(`git config branch.${r}.ricwiz-source`,{cwd:e});i.trim()&&(p=i.trim())}catch{}let{resolveExistingBranchName:a}=(pe(),I(ve));if(o.environments.length===0){let i=await a(e,r);u.push({source:i,target:p})}else for(let i of o.environments){let n=await a(e,r,i.name);u.push({source:n,target:i.sourceBranch})}for(let i of u){let n=`${d}/-/merge_requests/new?merge_request[source_branch]=${i.source}&merge_request[target_branch]=${i.target}`;t?ue.commands.executeCommand("simpleBrowser.show",n):ue.env.openExternal(ue.Uri.parse(n))}ue.window.showInformationMessage(`Ricwiz: Opening ${t?"VS Code browser":"external browser"} for Merge Requests!`)}async function qt(){return Wt(!1)}async function Gt(){return Wt(!0)}var ue,Ht=z(()=>{"use strict";ue=y(require("vscode"));P();J()});async function Vt(t=!1){let e=x();if(!e)return;let o=ie.workspace.getConfiguration("ricwiz"),s=o.get("jiraUrl","");if(!s||s.trim()===""){ie.window.showErrorMessage("Ricwiz: Jira URL is not configured. Please set it in the extension settings (e.g., https://jira.company.com/browse/).");return}let{getCurrentBranch:r,resolvePrefix:l,extractTicketSuggestion:d}=(P(),I(Ee)),u=await r(e),p=o.get("ticketPrefix","SFPSCA-"),a=l(u,p),n=d(u,a,!0);if(n){let{normalizeTicketId:g}=(P(),I(Ee));n=g(n,a)}else{let g=await H(e,{prompt:"Ricwiz could not detect the ticket from the branch name. Enter Jira ticket ID (e.g. SFPSCA-1234)",handleToSuffix:!0});if(!g)return;n=g.ticketId}let c=s.trim();c.endsWith("/")||(c+="/"),c+=n,t?ie.commands.executeCommand("simpleBrowser.show",c):ie.env.openExternal(ie.Uri.parse(c)),ie.window.showInformationMessage(`Ricwiz: Opening Jira Ticket ${n} in ${t?"VS Code":"browser"}!`)}async function _t(){return Vt(!1)}async function Qt(){return Vt(!0)}var ie,Yt=z(()=>{"use strict";ie=y(require("vscode"));P()});async function Xt(){let t=Kt.workspace.getConfiguration("ricwiz"),e=t.get("jiraUrl",""),o=t.get("jiraEmail","")?.trim(),s=(await Ct())?.trim();if(!e||!s)throw new Error('Jira API Token is not securely configured. Please run the "Ricwiz: Set Secure Jira API Token" command.');let r=e;r.includes("/browse")&&(r=r.split("/browse")[0]),r.endsWith("/")&&(r=r.slice(0,-1));let l=o?`Basic ${Buffer.from(`${o}:${s}`).toString("base64")}`:`Bearer ${s}`;return{baseUrl:r,headerAuth:l}}async function Te(t,e,o){let{baseUrl:s,headerAuth:r}=await Xt(),l=new URL(`${s}${e}`);return new Promise((d,u)=>{let p=Zt.request(l,{method:t,headers:{Authorization:r,Accept:"application/json",...o?{"Content-Type":"application/json"}:{}}},a=>{let i="";a.on("data",n=>i+=n),a.on("end",()=>{if(a.statusCode===401||a.statusCode===403)return u(new Error(`Authentication failed (HTTP ${a.statusCode}). Please check your Jira settings.`));if(a.statusCode&&a.statusCode>=400){let n="";try{let c=JSON.parse(i);c.errorMessages&&c.errorMessages.length>0&&(n=c.errorMessages.join(", "))}catch{}return a.statusCode===404||a.statusCode===410?u(new Error(`Ticket not found or deleted (HTTP ${a.statusCode}). ${n}`)):u(new Error(`Jira API returned HTTP status ${a.statusCode}. ${n}`))}if(!i)return d({});try{let n=JSON.parse(i);d(n)}catch{u(new Error("Failed to parse Jira response."))}})});p.on("error",a=>u(new Error(`Network error: ${a.message}`))),o&&p.write(JSON.stringify(o)),p.end()})}async function Me(t){let{baseUrl:e}=await Xt(),o=await Te("GET",`/rest/api/2/issue/${t}`);return o&&o.fields?{summary:o.fields.summary||"",description:o.fields.description||"No description provided.",status:o.fields.status?.name||"Unknown",url:`${e}/browse/${t}`}:null}async function eo(t){let e=await Te("GET",`/rest/api/2/issue/${t}/transitions`);return e&&e.transitions?e.transitions.map(o=>({id:o.id,name:o.name})):[]}async function to(t,e){await Te("POST",`/rest/api/2/issue/${t}/transitions`,{transition:{id:e}})}async function oo(t,e){await Te("POST",`/rest/api/2/issue/${t}/comment`,{body:e})}async function io(t,e){await Te("PUT",`/rest/api/2/issue/${t}`,{update:{labels:[{add:e}]}})}async function no(t){let e=await Te("POST","/rest/api/3/search/jql",{jql:t,maxResults:50,fields:["summary","status","assignee"]});return e&&e.issues?e.issues.map(o=>({key:o.key,summary:o.fields?.summary||"No Title",status:o.fields?.status?.name||"Unknown",assignee:o.fields?.assignee?.displayName||"Unassigned"})):[]}var Zt,Kt,Fe=z(()=>{"use strict";Zt=y(require("https")),Kt=y(require("vscode"));ze()});async function so(t){let e=x();if(e)try{let o=await M.initialize(e);if(!o)return;let s=await U(e),r=Pe(s,o.ticketPrefix),l=Be(s,r,!0);if(l||(l=s.split("-to-")[0]),!l){Z.window.showErrorMessage("Ricwiz: You are not currently on a valid ticket branch.");return}await Z.window.withProgress({location:Z.ProgressLocation.Notification,title:`Fetching details for ${l}...`,cancellable:!1},async d=>{let u=await Me(l);if(u){let p=[];try{let{findRelatedBranches:a,getRelatedBranchesStatus:i}=(pe(),I(ve)),n=Z.workspace.getConfiguration("ricwiz").get("environments",[{name:"Qual",sourceBranch:"quality"},{name:"Val",sourceBranch:"validation"},{name:"Prod",sourceBranch:"main"}]),c=await a(e,l,"");p=await i(e,c,l,n,o)}catch{}t.setJiraData({ticketId:l,relatedBranches:p,...u}),t.setPage("jira")}else Z.window.showErrorMessage("Ricwiz: No data found for this ticket.")})}catch(o){o.message.includes("securely configured")?await Z.window.showErrorMessage(o.message,"Set Token Now")==="Set Token Now"&&Z.commands.executeCommand("ricwiz.setJiraToken"):Z.window.showErrorMessage(`Ricwiz Jira Error: ${o.message}`)}}var Z,ro=z(()=>{"use strict";Z=y(require("vscode"));P();J();Fe()});async function ao(t,e){let s=ne.workspace.getConfiguration("ricwiz").get("jiraDashboards",[]);if(e!==void 0&&(Ce=e),!s||s.length===0){t.setDashboardData({queries:[],selectedIndex:0,results:[],error:"No queries defined in settings. Go to Settings > Ricwiz > Jira Dashboards."}),t.setPage("dashboard");return}Ce>=s.length&&(Ce=0);let r=s[Ce];t.setDashboardData({queries:s,selectedIndex:Ce,results:[],error:"\u23F3 Loading tickets..."}),t.setPage("dashboard");try{let l=await no(r.jql),d=ne.workspace.workspaceFolders?.[0]?.uri.fsPath,u=[],p=t.getDashboardShowBranches();if(d)try{let i=require("child_process"),c=require("util").promisify(i.exec),{stdout:g}=await c("git branch",{cwd:d});u=g.split(`
`).map(f=>f.replace("*","").trim()).filter(f=>f)}catch{}let a=[];if(p&&d)try{let{findRelatedBranches:i,getRelatedBranchesStatus:n}=(pe(),I(ve)),{WorkflowContext:c}=(J(),I(at)),g=await c.initialize(d,{skipPrompt:!0}),f=g?.environments||ne.workspace.getConfiguration("ricwiz").get("environments",[{name:"Qual",sourceBranch:"quality"},{name:"Val",sourceBranch:"validation"},{name:"Prod",sourceBranch:"main"}]);a=await Promise.all(l.map(async m=>{let w=await i(d,m.key,""),v=await n(d,w,m.key,f,g);return{...m,detailedBranches:v}}))}catch{a=l}else a=l.map(i=>{let n=u.find(c=>c.includes(i.key));return{...i,branch:n||null}});t.setDashboardData({queries:s,selectedIndex:Ce,results:a,error:null}),t.setPage("dashboard")}catch(l){let d=l.message;(d.includes("ENOTFOUND")||d.includes("network"))&&(d="No Internet or Invalid URL"),t.setDashboardData({queries:s,selectedIndex:Ce,results:[],error:d}),t.setPage("dashboard")}}async function co(t,e){await ne.window.withProgress({location:ne.ProgressLocation.Notification,title:`Fetching details for ${e}...`,cancellable:!1},async()=>{try{let o=await Me(e);if(o){let s=[],r=x();if(r)try{let{WorkflowContext:l}=(J(),I(at)),d=await l.initialize(r,{skipPrompt:!0}),{findRelatedBranches:u,getRelatedBranchesStatus:p}=(pe(),I(ve)),a=ne.workspace.getConfiguration("ricwiz").get("environments",[{name:"Qual",sourceBranch:"quality"},{name:"Val",sourceBranch:"validation"},{name:"Prod",sourceBranch:"main"}]),i=await u(r,e,"");s=await p(r,i,e,a,d)}catch{}t.setJiraData({ticketId:e,relatedBranches:s,...o}),t.setPage("jira")}else ne.window.showErrorMessage(`Ricwiz: No data found for ticket ${e}.`)}catch(o){ne.window.showErrorMessage(`Ricwiz Jira Error: ${o.message}`)}})}var ne,Ce,lo=z(()=>{"use strict";ne=y(require("vscode"));Fe();P();Ce=0});async function ft(){let t=x();if(!t)return;let e=await M.initialize(t,{forcePrompt:!1});if(!e)return;let o=await U(t);if(!o)return;let s=Pe(o,e.ticketPrefix),r=Be(o,s,!0);return r||o.split("-to-")[0]}async function mo(){try{let t=await ft();if(!t){B.window.showErrorMessage("Ricwiz: You are not on a valid ticket branch.");return}let e=await B.window.withProgress({location:B.ProgressLocation.Notification,title:`Fetching available status for ${t}...`,cancellable:!1},()=>eo(t));if(!e||e.length===0){B.window.showInformationMessage(`Ricwiz: No transitions available for ${t}.`);return}let o=e.map(r=>({label:r.name,id:r.id})),s=await B.window.showQuickPick(o,{placeHolder:`Select new status for ${t}`,ignoreFocusOut:!0});s&&(await B.window.withProgress({location:B.ProgressLocation.Notification,title:`Updating status to ${s.label}...`,cancellable:!1},()=>to(t,s.id)),B.window.showInformationMessage(`Ricwiz: Status for ${t} updated to ${s.label}.`))}catch(t){t.message.includes("securely configured")?B.window.showErrorMessage(t.message,"Set Token Now").then(e=>{e==="Set Token Now"&&B.commands.executeCommand("ricwiz.setJiraToken")}):B.window.showErrorMessage(`Ricwiz Jira Error: ${t.message}`)}}async function po(){try{let t=await ft();if(!t){B.window.showErrorMessage("Ricwiz: You are not on a valid ticket branch.");return}let e=await B.window.showInputBox({prompt:`Add comment to ${t}`,placeHolder:"Type your comment here...",ignoreFocusOut:!0});e&&(await B.window.withProgress({location:B.ProgressLocation.Notification,title:`Adding comment to ${t}...`,cancellable:!1},()=>oo(t,e)),B.window.showInformationMessage(`Ricwiz: Comment added to ${t}.`))}catch(t){t.message.includes("securely configured")?B.window.showErrorMessage(t.message,"Set Token Now").then(e=>{e==="Set Token Now"&&B.commands.executeCommand("ricwiz.setJiraToken")}):B.window.showErrorMessage(`Ricwiz Jira Error: ${t.message}`)}}async function uo(){try{let t=await ft();if(!t){B.window.showErrorMessage("Ricwiz: You are not on a valid ticket branch.");return}let e=await B.window.showInputBox({prompt:`Add a label to ${t}`,placeHolder:"e.g. Needs-Review, Bug, High-Priority",ignoreFocusOut:!0});e&&e.trim()&&(await B.window.withProgress({location:B.ProgressLocation.Notification,title:`Adding label to ${t}...`,cancellable:!1},()=>io(t,e.trim())),B.window.showInformationMessage(`Ricwiz: Label '${e.trim()}' added to ${t}.`))}catch(t){t.message.includes("securely configured")?B.window.showErrorMessage(t.message,"Set Token Now").then(e=>{e==="Set Token Now"&&B.commands.executeCommand("ricwiz.setJiraToken")}):B.window.showErrorMessage(`Ricwiz Jira Error: ${t.message}`)}}async function go(){let t=await B.window.showInputBox({prompt:"Enter your Jira API Token (or Personal Access Token). It will be securely stored in your OS keychain.",password:!0,ignoreFocusOut:!0});if(t)try{await kt(t.trim()),B.window.showInformationMessage("Ricwiz: Jira API Token securely stored!")}catch(e){B.window.showErrorMessage(`Ricwiz: Failed to store token: ${e.message}`)}}var B,fo=z(()=>{"use strict";B=y(require("vscode"));P();J();Fe();ze()});async function ho(){let t=await _.window.showInputBox({prompt:"Enter your GitLab Personal Access Token",placeHolder:"glpat-xxxxxxxxxxxxxxxxxxxx",ignoreFocusOut:!0,password:!0});if(t&&t.trim()){let e=t.trim();await _.window.withProgress({location:_.ProgressLocation.Notification,title:"Ricwiz: Validating GitLab Token...",cancellable:!1},async()=>{try{let s=_.workspace.getConfiguration("ricwiz").get("gitlabUrlOverride","").trim();if(!s&&_.workspace.workspaceFolders)try{let{exec:p}=(P(),I(Ee)),a=_.workspace.workspaceFolders[0].uri.fsPath,{stdout:i}=await p("git remote get-url origin",{cwd:a}),n=i.trim();n.startsWith("git@")&&(n=`https://${n.replace("git@","").replace(":","/")}`),n.endsWith(".git")&&(n=n.slice(0,-4)),s=n}catch{}s||(s="https://gitlab.com");let r=new URL(s),l=`${r.protocol}//${r.host}`,d=require("https"),u=await new Promise((p,a)=>{let i=d.request(new URL(`${l}/api/v4/user`),{method:"GET",timeout:5e3,headers:{"PRIVATE-TOKEN":e,Accept:"application/json"}},n=>{if(n.statusCode>=400)return a(new Error(`Status ${n.statusCode}`));let c="";n.on("data",g=>c+=g),n.on("end",()=>p(JSON.parse(c||"{}")))});i.on("error",a),i.on("timeout",()=>{i.destroy(),a(new Error("Timeout"))}),i.end()});await $t(e),_.window.showInformationMessage(`Ricwiz: \u2705 GitLab API Token saved and validated successfully for ${u.username||"user"}!`),_.commands.executeCommand("ricwiz.manualRefresh")}catch(o){_.window.showErrorMessage(`Ricwiz: \u274C Invalid token or cannot reach GitLab (${o.message}). Please check the token and try again.`)}})}}var _,wo=z(()=>{"use strict";_=y(require("vscode"));ze()});async function vo(){let t=x();if(!t){ge.window.showErrorMessage("Ricwiz: Open a folder or workspace that is a Git repository.");return}let e=await M.initialize(t);if(!e)return;let o=await H(t,{prefix:e.ticketPrefix,prompt:"Enter the full ticket ID to sync all branches for (e.g., SCPSCA-1234) or just the number"});if(!o)return;let{ticketId:s,currentBranch:r}=o;await ge.window.withProgress({location:ge.ProgressLocation.Notification,title:`Ricwiz: Syncing all branches for ${s}...`,cancellable:!1},async l=>{try{l.report({message:"Fetching from remote..."});try{await h("git fetch --all",{cwd:t})}catch{}let{stdout:d}=await h(`git branch --list "*${s}*"`,{cwd:t}),u=new RegExp(`${s}(?!\\d)`,"i"),p=d.split(`
`).map(n=>n.replace("*","").trim()).filter(n=>n.length>0&&u.test(n));if(p.length===0){ge.window.showWarningMessage(`Ricwiz: No local branches found for ${s}.`);return}let a=0,i=0;for(let n of p)if(l.report({message:`Syncing ${n}...`}),n===r)try{await h(`git pull ${e.originRemote} ${n}`,{cwd:t}),a++}catch(c){let g=!1;try{let{stdout:m}=await h("git ls-files -u",{cwd:t});m.trim().length>0&&(g=!0)}catch{}let f=((c.stdout||"")+(c.stderr||"")+(c.message||"")).toLowerCase();(g||f.includes("conflict")||f.includes("conflit"))&&await ke(t,`${e.originRemote}/${n}`,n,l)?a++:i++}else try{await h(`git fetch ${e.originRemote} ${n}:${n}`,{cwd:t}),a++}catch{try{await h(`git checkout ${n}`,{cwd:t});try{await h(`git pull ${e.originRemote} ${n}`,{cwd:t}),a++}catch(g){let f=!1;try{let{stdout:w}=await h("git ls-files -u",{cwd:t});w.trim().length>0&&(f=!0)}catch{}let m=((g.stdout||"")+(g.stderr||"")+(g.message||"")).toLowerCase();(f||m.includes("conflict")||m.includes("conflit"))&&await ke(t,`${e.originRemote}/${n}`,n,l)?a++:i++}await h(`git checkout ${r}`,{cwd:t})}catch{try{await h(`git checkout ${r}`,{cwd:t})}catch{}i++}}i>0?ge.window.showWarningMessage(`Ricwiz: Synced ${a}/${p.length} branches. ${i} branch(es) could not be synced (possible conflicts or diverged history).`):ge.window.showInformationMessage(`Ricwiz: \u{1F504} All ${a} branches for ${s} are up to date!`)}catch(d){ge.window.showErrorMessage(`Ricwiz: Sync failed: ${d.message}`)}})}var ge,bo=z(()=>{"use strict";ge=y(require("vscode"));P();Ye();J()});async function yo(){let t=x();if(!t){fe.window.showErrorMessage("Ricwiz: Open a folder or workspace that is a Git repository.");return}try{await h("git status",{cwd:t})}catch{fe.window.showErrorMessage("Ricwiz: The opened folder does not appear to be a valid Git repository.");return}let e=await M.initialize(t);if(!e)return;let o=e.environments,s=await H(t,{prefix:e.ticketPrefix});if(!s)return;let{ticketId:r,currentBranch:l}=s;await fe.window.withProgress({location:fe.ProgressLocation.Notification,title:"Ricwiz: Updating environment branches from their bases",cancellable:!0},async(d,u)=>{let p=0,a=l,i=!1;u.onCancellationRequested(()=>{i=!0}),d.report({message:"Syncing remote information...",increment:10});try{await h("git fetch --all",{cwd:t})}catch{}let n=80/(o.length||1);for(let c of o){if(i)break;let{resolveExistingBranchName:g}=(pe(),I(ve)),f=await g(t,r,c.name),m=c.sourceBranch;if(await he(t,f))try{d.report({message:`Processing ${f}...`,increment:n/2}),await h(`git checkout ${f}`,{cwd:t});try{d.report({message:`Merging ${m} into ${f}...`,increment:n/2});let w=e.getFetchRemote(m),v=e.getFetchBranch(m),b=e.buildUpstreamPath(m);await h(`git fetch ${w} ${v}`,{cwd:t}),await h(`git merge ${b}`,{cwd:t})}catch(w){let v=!1;try{let{stdout:$}=await h("git ls-files -u",{cwd:t});$.trim().length>0&&(v=!0)}catch{}let b=((w.stdout||"")+(w.stderr||"")+(w.message||"")).toLowerCase();if(v||b.includes("conflict")||b.includes("conflit")){let $=e.buildUpstreamPath(m);if(!await ke(t,$,f,d))throw i=!0,new Error("Update aborted by user.")}else throw w}if(i)break;p++}catch(w){w.message.includes("aborted")?fe.window.showInformationMessage("Ricwiz: Update cancelled."):fe.window.showErrorMessage(`Ricwiz: Failed to update branch ${f}. Detail: ${w.message}`);return}}if(!i){d.report({message:"Finishing up...",increment:10});try{let c=await U(t);a&&a!==c&&await h(`git checkout ${a}`,{cwd:t})}catch{}fe.window.showInformationMessage(`Ricwiz: Successfully updated ${p} environment branches from their bases!`)}})}var fe,xo=z(()=>{"use strict";fe=y(require("vscode"));P();Ye();J()});async function ko(){let t=x();if(!t){j.window.showErrorMessage("Ricwiz: Open a folder or workspace that is a Git repository.");return}let e=await U(t),o=j.workspace.getConfiguration("ricwiz");await j.window.withProgress({location:j.ProgressLocation.Notification,title:"Ricwiz: Scanning for unused local branches...",cancellable:!1},async()=>{try{await h("git fetch --prune",{cwd:t})}catch{}let s=[];try{let{stdout:n}=await h('git branch --format="%(refname:short)"',{cwd:t});s=n.split(`
`).map(c=>c.trim()).filter(c=>c.length>0)}catch{}if(s.length===0){j.window.showInformationMessage("Ricwiz: No local branches found.");return}let r=[];try{let{stdout:n}=await h('git branch -r --format="%(refname:short)"',{cwd:t});r=n.split(`
`).map(c=>c.trim().replace(/^origin\//,"").replace(/^[^\/]+\//,"")).filter(c=>c.length>0&&!c.includes("HEAD"))}catch{}let l=[];try{let{stdout:n}=await h('git for-each-ref --format="%(refname:short)|||%(upstream:track)" refs/heads/',{cwd:t});l=n.split(`
`).filter(c=>c.includes("[gone]")).map(c=>c.split("|||")[0].trim())}catch{}let d=s.filter(n=>!r.includes(n));if(d.length===0){j.window.showInformationMessage("Ricwiz: Your local repository is totally clean! All local branches exist on the remote.");return}let u=d.map(n=>{let c=l.includes(n),g=n===e,f="Not found on remote";return c&&(f="Deleted on remote [gone]"),g&&(f+=" (Current branch - will checkout main first)"),{label:n,description:f,picked:c&&!g}}),p=await j.window.showQuickPick(u,{canPickMany:!0,placeHolder:"Select local branches to delete",title:"Ricwiz: Delete Unused Branches"});if(!p||p.length===0){j.window.showInformationMessage("Ricwiz: No branches selected for deletion.");return}if(await j.window.showWarningMessage(`Ricwiz: Delete ${p.length} local branch(es)?
This cannot be undone!`,{modal:!0},"Yes, delete them")!=="Yes, delete them"){j.window.showInformationMessage("Ricwiz: Deletion cancelled.");return}let i=0;for(let n of p){let c=n.label;if(c===e){let g=o.get("ticketSourceBranch","main");try{await h(`git checkout ${g}`,{cwd:t}),e=g}catch{j.window.showWarningMessage(`Ricwiz: Could not switch away from ${c}. Skipping.`);continue}}try{await h(`git branch -D ${c}`,{cwd:t}),i++}catch{j.window.showWarningMessage(`Ricwiz: Could not delete local branch ${c}.`)}}j.window.showInformationMessage(`Ricwiz: \u{1F5D1}\uFE0F Cleaned up ${i} unused local branch(es).`)})}var j,Co=z(()=>{"use strict";j=y(require("vscode"));P()});async function De(t){let e=x();e&&await se.window.withProgress({location:se.ProgressLocation.Notification,title:`Ricwiz: Switching to ${t}...`,cancellable:!1},async()=>{try{let o=await U(e),s=!1;try{let{stdout:l}=await h("git status --porcelain",{cwd:e});s=l.trim().length>0}catch{}if(s&&o)try{await h(`git stash push --include-untracked -m "ricwiz-auto:${o}"`,{cwd:e}),se.window.showInformationMessage(`Ricwiz: \u{1F4E6} Stashed changes from ${o}`)}catch{se.window.showWarningMessage("Ricwiz: Could not stash changes. Checkout may fail if there are conflicts.")}let r=t;t.includes("/")&&(r=t.split("/").slice(1).join("/"));try{await h(`git checkout ${r}`,{cwd:e})}catch{let d="";if(t.includes("/"))d=t.split("/")[0];else{let{stdout:u}=await h("git branch -r",{cwd:e}),p=u.split(`
`).map(i=>i.trim()).filter(i=>i),a=[];for(let i of p){let n=i.split(" ")[0];n.endsWith(`/${r}`)&&a.push(n.substring(0,n.lastIndexOf("/")))}if(a.length===0){se.window.showErrorMessage(`Ricwiz: A branch "${r}" n\xE3o existe localmente nem em nenhuma remote!`);return}else if(a.length===1)d=a[0];else{let i=await M.initialize(e);a.includes("origin")?d="origin":i&&a.includes(i.upstreamRemote)?d=i.upstreamRemote:d=a[0]}}try{await h(`git fetch ${d} ${r}`,{cwd:e}),await h(`git checkout -b ${r} --track ${d}/${r}`,{cwd:e})}catch{se.window.showErrorMessage(`Ricwiz: Encontrou na remote ${d} mas falhou a fazer checkout.`);return}}try{let{stdout:l}=await h("git stash list",{cwd:e}),d=l.split(`
`);for(let u=0;u<d.length;u++)if(d[u].includes(`ricwiz-auto:${r}`)){let p=d[u].match(/stash@\{(\d+)\}/);p&&(await h(`git stash pop stash@{${p[1]}}`,{cwd:e}),se.window.showInformationMessage(`Ricwiz: \u{1F4E6} Restored stashed changes on ${r}`));break}}catch{se.window.showWarningMessage(`Ricwiz: Could not restore stashed changes on ${r}. You may need to resolve conflicts manually (check git stash list).`)}}catch{se.window.showErrorMessage(`Ricwiz: Could not checkout branch ${t}.`)}})}var se,tt=z(()=>{"use strict";se=y(require("vscode"));P();J()});async function $o(){let t=x();if(t)try{let{stdout:e}=await h("git branch --show-current",{cwd:t}),o=e.trim();o&&(await Oe.env.clipboard.writeText(o),Oe.window.showInformationMessage(`Ricwiz: \u{1F4CB} Copied "${o}" to clipboard`))}catch{Oe.window.showErrorMessage("Ricwiz: Could not get the current branch name.")}}var Oe,Ro=z(()=>{"use strict";Oe=y(require("vscode"));P()});async function So(){let t=x();if(!t){K.window.showErrorMessage("Ricwiz: Open a folder or workspace that is a Git repository.");return}let e=K.workspace.getConfiguration("ricwiz"),o=e.get("ticketSourceBranch","main"),r=e.get("packageXmlCommand",'sf sgd source delta --to "HEAD" --from "origin/{baseBranch}" --output-dir "."').replace("{baseBranch}",o);await K.window.showWarningMessage("Are you sure you want to generate the package.xml? This may overwrite existing local manifest files.",{modal:!0},"Yes, Generate")==="Yes, Generate"&&await K.window.withProgress({location:K.ProgressLocation.Notification,title:"Ricwiz: Generating package.xml using Salesforce CLI...",cancellable:!1},async()=>{try{await h(r,{cwd:t,maxBuffer:10*1024*1024}),K.window.showInformationMessage("Ricwiz: Successfully generated package.xml!");let d=ot.join(t,"package","package.xml"),u=ot.join(t,"package.xml"),p=ot.join(t,"manifest","package.xml");for(let a of[d,u,p])if(zo.existsSync(a)){let i=await K.workspace.openTextDocument(a);await K.window.showTextDocument(i);break}}catch(d){K.window.showErrorMessage(`Ricwiz: Error running sf command - ${d.message}`)}})}var K,ot,zo,Po=z(()=>{"use strict";K=y(require("vscode")),ot=y(require("path")),zo=y(require("fs"));P()});async function Bo(){let t=x();if(!t){X.window.showErrorMessage("Ricwiz: Open a folder or workspace that is a Git repository.");return}let o=X.workspace.getConfiguration("ricwiz").get("deployCommand","sf project deploy start --manifest package/package.xml --post-destructive-changes destructiveChanges/destructiveChanges.xml -c -l NoTestRun -g");await X.window.showWarningMessage("Are you sure you want to deploy to Salesforce? This action modifies your org and cannot be easily undone.",{modal:!0},"Yes, Deploy")==="Yes, Deploy"&&await X.window.withProgress({location:X.ProgressLocation.Notification,title:"Ricwiz: Deploying package...",cancellable:!1},async()=>{try{let{stdout:r,stderr:l}=await h(o,{cwd:t,maxBuffer:52428800}),d=X.window.createOutputChannel("Ricwiz Deploy");d.appendLine(`Executing: ${o}`),d.appendLine(r),l&&(d.appendLine("--- STDERR ---"),d.appendLine(l)),d.show(),X.window.showInformationMessage("Ricwiz: Successfully ran deploy command!")}catch(r){let l=X.window.createOutputChannel("Ricwiz Deploy");l.appendLine(`Error executing: ${o}`),r.stdout&&l.appendLine(r.stdout),r.stderr&&l.appendLine(r.stderr),l.appendLine(r.message),l.show(),X.window.showErrorMessage("Ricwiz: Error running deploy command. See output channel for details.")}})}var X,Eo=z(()=>{"use strict";X=y(require("vscode"));P()});async function To(){let t=x();if(!t){ee.window.showErrorMessage("Ricwiz: Open a folder or workspace that is a Git repository.");return}let o=ee.workspace.getConfiguration("ricwiz").get("importDataCommand","sfdx force:data:tree:import --plan data/plan.json");await ee.window.showWarningMessage("Are you sure you want to import data into Salesforce? This action modifies records in your org.",{modal:!0},"Yes, Import")==="Yes, Import"&&await ee.window.withProgress({location:ee.ProgressLocation.Notification,title:"Ricwiz: Importing data...",cancellable:!1},async()=>{try{let{stdout:r,stderr:l}=await h(o,{cwd:t,maxBuffer:52428800}),d=ee.window.createOutputChannel("Ricwiz Import Data");d.appendLine(`Executing: ${o}`),d.appendLine(r),l&&(d.appendLine("--- STDERR ---"),d.appendLine(l)),d.show(),ee.window.showInformationMessage("Ricwiz: Successfully ran import data command!")}catch(r){let l=ee.window.createOutputChannel("Ricwiz Import Data");l.appendLine(`Error executing: ${o}`),r.stdout&&l.appendLine(r.stdout),r.stderr&&l.appendLine(r.stderr),l.appendLine(r.message),l.show(),ee.window.showErrorMessage("Ricwiz: Error running import data command. See output channel for details.")}})}var ee,Mo=z(()=>{"use strict";ee=y(require("vscode"));P()});async function Do(){let t=x();if(!t){Q.window.showErrorMessage("Ricwiz: Open a folder or workspace that is a Git repository.");return}let e=await M.initialize(t,{skipPrompt:!0}),o=e?e.ticketSourceBranch:Q.workspace.getConfiguration("ricwiz").get("ticketSourceBranch","main"),s=e?e.originRemote:"origin",r="";try{r=await U(t)}catch{}let l=await Q.window.showInputBox({prompt:`Enter the branch name to list modified files (compared to ${o})`,value:r,placeHolder:"SFPSCA-1234"});if(!l)return;let{extractTicketSuggestion:d,resolvePrefix:u}=(P(),I(Ee)),{ricwizLogger:p}=(Ie(),I(et));await Q.window.withProgress({location:Q.ProgressLocation.Notification,title:`Ricwiz: Finding files for ${l}...`,cancellable:!1},async()=>{try{let a=e?e.ticketPrefix:Q.workspace.getConfiguration("ricwiz").get("ticketPrefix","SFPSC-"),i=u(l,a),n=d(l,i,!0)||l.replace(/-to-[a-zA-Z0-9]+$/i,""),{resolveExistingBranchName:c}=(pe(),I(ve)),g=await c(t,n);p.appendLine(`[ListTicketFiles] targetBranch (raw): ${l}, resolvedTargetBranch: ${g}, ticketId: ${n}, originRemote: ${s}, sourceBranch: ${o}`);let f=[];try{let D="";try{p.appendLine(`[ListTicketFiles] Running: git merge-base ${s}/${o} ${g}`);let{stdout:S}=await h(`git merge-base ${s}/${o} ${g}`,{cwd:t});D=S.trim()}catch(S){p.appendLine(`[ListTicketFiles] First merge-base failed: ${S.message}`),p.appendLine(`[ListTicketFiles] Running: git merge-base ${o} ${g}`);let{stdout:T}=await h(`git merge-base ${o} ${g}`,{cwd:t});D=T.trim()}if(D){p.appendLine(`[ListTicketFiles] Merge base found: ${D}. Running git diff...`);let{stdout:S}=await h(`git diff --name-only ${D} ${g}`,{cwd:t,maxBuffer:10*1024*1024});f=S.split(`
`).map(T=>T.trim()).filter(T=>T.length>0),p.appendLine(`[ListTicketFiles] diff found ${f.length} files.`)}}catch(D){p.appendLine(`[ListTicketFiles] Diff strategy failed: ${D.message}`)}let m=[];try{p.appendLine(`[ListTicketFiles] Running git log fallback for ticketId: ${n}`);let{stdout:D}=await h(`git --no-pager log --grep="\\b${n}\\b" -i -E --name-only -m --first-parent --format=""`,{cwd:t,maxBuffer:10*1024*1024});m=D.split(`
`).map(S=>S.trim()).filter(S=>S.length>0),p.appendLine(`[ListTicketFiles] git log found ${m.length} files.`)}catch(D){p.appendLine(`[ListTicketFiles] Git log fallback failed: ${D.message}`)}let w=[...f,...m];if(w.length===0){Q.window.showInformationMessage(`Ricwiz: No modified files found for ${l}.`);return}let v=Array.from(new Set(w)).sort(),b={};for(let D of v){let S=D.match(/default\/([^/]+)/),T=S&&S[1]?S[1].toUpperCase():"OUTROS";b[T]||(b[T]=[]),b[T].push(D)}let $=`Files modified in branch ${l}:
`,E=Object.keys(b).sort();for(let D of E)$+=`
=== ${D} ===
`,$+=b[D].join(`
`)+`
`;let N=await Q.workspace.openTextDocument({content:$,language:"plaintext"});await Q.window.showTextDocument(N)}catch(a){Q.window.showErrorMessage(`Ricwiz: Error running git log - ${a.message}`)}})}var Q,Lo=z(()=>{"use strict";Q=y(require("vscode"));P();J()});async function Ao(){let t=x();if(!t){re.window.showErrorMessage("Ricwiz: Open a folder or workspace that is a Git repository.");return}let o=re.workspace.getConfiguration("ricwiz").get("resetTrackingCommand","sf org disable tracking && sf project reset tracking --no-prompt");await re.window.withProgress({location:re.ProgressLocation.Notification,title:"Ricwiz: Resetting tracking...",cancellable:!1},async()=>{try{let{stdout:s,stderr:r}=await h(o,{cwd:t,maxBuffer:52428800}),l=re.window.createOutputChannel("Ricwiz Reset Tracking");l.appendLine(`Executing: ${o}`),l.appendLine(s),r&&(l.appendLine("--- STDERR ---"),l.appendLine(r)),l.show(),re.window.showInformationMessage("Ricwiz: Successfully reset tracking!")}catch(s){let r=re.window.createOutputChannel("Ricwiz Reset Tracking");r.appendLine(`Error executing: ${o}`),s.stdout&&r.appendLine(s.stdout),s.stderr&&r.appendLine(s.stderr),r.appendLine(s.message),r.show(),re.window.showErrorMessage("Ricwiz: Error resetting tracking. See output channel for details.")}})}var re,Io=z(()=>{"use strict";re=y(require("vscode"));P()});async function Fo(){let t=x();if(!t){te.window.showErrorMessage("Ricwiz: Open a workspace first.");return}let e=["ApexClass","ApexTrigger","CustomObject","CustomField","LightningComponentBundle","AuraDefinitionBundle","Flow","CustomLabel","CustomMetadata","StaticResource","Profile","PermissionSet","PermissionSetGroup","Layout","ValidationRule","RecordType","ListView","Report","EmailTemplate","Other (Type manually)..."],o=await te.window.showQuickPick(e,{placeHolder:"Select Metadata Type to extract (e.g., ApexClass)",ignoreFocusOut:!0});if(!o||o==="Other (Type manually)..."&&(o=await te.window.showInputBox({prompt:"Enter Metadata Type (e.g., CustomApplication, Queue)",ignoreFocusOut:!0}),!o))return;let s={ApexClass:"**/*.cls",ApexTrigger:"**/*.trigger",CustomObject:"**/*.{object,object-meta.xml}",CustomField:"**/*.field-meta.xml",LightningComponentBundle:"**/lwc/*/*.js",AuraDefinitionBundle:"**/aura/*/*.cmp",Flow:"**/*.flow-meta.xml",CustomLabel:"**/*.labels-meta.xml",CustomMetadata:"**/*.md-meta.xml",StaticResource:"**/*.resource-meta.xml",Profile:"**/*.profile-meta.xml",PermissionSet:"**/*.permissionset-meta.xml",PermissionSetGroup:"**/*.permissionsetgroup-meta.xml",Layout:"**/*.layout-meta.xml",ValidationRule:"**/*.validationRule-meta.xml",RecordType:"**/*.recordType-meta.xml",ListView:"**/*.listView-meta.xml"},r=[],l=s[o];if(l)try{r=(await te.workspace.findFiles(l,"**/node_modules/**")).map(p=>{let a=p.fsPath.split(/[\\/]/).pop()||"";if(o==="LightningComponentBundle"||o==="AuraDefinitionBundle"){let i=p.fsPath.split(/[\\/]/);return i[i.length-2]||a.split(".")[0]}return a.split(".")[0]}),r=[...new Set(r)].sort()}catch{}let d=await new Promise(u=>{let p=te.window.createQuickPick();p.title=`Extract ${o}`,p.placeholder="Type name (e.g. MyComponent) or * for all",p.ignoreFocusOut=!0,p.matchOnDescription=!0;let a=()=>{let i=p.value.trim(),n=[];i?n.push({label:`$(cloud-download) Extract "${i}"`,description:"Extract exact name from Salesforce",alwaysShow:!0}):n.push({label:'$(cloud-download) Extract "*" (All)',description:`Extract all ${o}s`,alwaysShow:!0}),r.forEach(c=>{(!i||c.toLowerCase().includes(i.toLowerCase()))&&n.push({label:c,description:"Local workspace component"})}),p.items=n};p.onDidChangeValue(()=>a()),p.onDidAccept(()=>{let i=p.selectedItems[0];if(i){let n=i.label;n.startsWith('$(cloud-download) Extract "')?n=n.replace('$(cloud-download) Extract "',"").replace('" (All)',"").replace('"',""):n==='$(cloud-download) Extract "*" (All)'&&(n="*"),p.hide(),u(n)}}),p.onDidHide(()=>{p.dispose(),u(void 0)}),a(),p.show()});d&&await te.window.withProgress({location:te.ProgressLocation.Notification,title:`Ricwiz: Extracting ${o}:${d} from Salesforce...`,cancellable:!0},async(u,p)=>{try{O.show(!0);let a=`${o}:${d}`,{stdout:i,stderr:n}=await h(`sf project retrieve start -m "${a}"`,{cwd:t});i&&O.appendLine(i),n&&O.appendLine(n),te.window.showInformationMessage(`Ricwiz: Successfully extracted ${a}.`)}catch(a){O.appendLine(`ERROR: ${a.message}`),a.stdout&&O.appendLine(a.stdout),a.stderr&&O.appendLine(a.stderr),te.window.showErrorMessage("Ricwiz: Extraction failed. See Output channel for details.")}})}var te,Oo=z(()=>{"use strict";te=y(require("vscode"));P()});async function No(){let t=G.window.activeTextEditor;if(!t){G.window.showErrorMessage("Ricwiz: Please open the file you want to deploy in the editor first.");return}let e=t.document.uri.fsPath,o=x();if(!o)return;let s="";if(await G.window.withProgress({location:G.ProgressLocation.Notification,title:"Ricwiz: Fetching available Salesforce orgs...",cancellable:!1},async()=>{try{let{stdout:p}=await h("sf org list --json",{cwd:o});s=p}catch(p){s=p.stdout||""}}),!s){G.window.showErrorMessage("Ricwiz: Failed to fetch orgs. Is Salesforce CLI installed?");return}let r=[];try{let p=JSON.parse(s),a=p.result?.nonScratchOrgs||[],i=p.result?.scratchOrgs||[];r=[...a,...i]}catch{G.window.showErrorMessage("Ricwiz: Failed to parse org list.");return}if(r.length===0){G.window.showInformationMessage("Ricwiz: No authenticated orgs found.");return}let l=r.map(p=>({label:p.alias||p.username,description:p.alias?p.username:"",picked:p.isDefaultUsername})),d=await G.window.showQuickPick(l,{placeHolder:"Select the org(s) to deploy this file to",canPickMany:!0,ignoreFocusOut:!0});if(!d||d.length===0)return;let u=Uo.basename(e);await G.window.withProgress({location:G.ProgressLocation.Notification,title:`Ricwiz: Deploying ${u} to ${d.length} org(s)...`,cancellable:!1},async()=>{O.show(!0),O.appendLine(`--- Starting Parallel Deploy of ${u} ---`);let p=d.map(async c=>{let g=c.label;O.appendLine(`[${g}] Deploying...`);try{let{stdout:f,stderr:m}=await h(`sf project deploy start -d "${e}" -o "${g}"`,{cwd:o});return O.appendLine(`[${g}] \u2705 Success`),f&&O.appendLine(f),{org:g,success:!0}}catch(f){return O.appendLine(`[${g}] \u274C Failed`),f.stdout&&O.appendLine(f.stdout),f.stderr&&O.appendLine(f.stderr),{org:g,success:!1}}}),a=await Promise.all(p),i=a.filter(c=>c.success).length,n=a.filter(c=>!c.success).length;n===0?G.window.showInformationMessage(`Ricwiz: Successfully deployed to all ${i} orgs!`):G.window.showErrorMessage(`Ricwiz: Deploy finished with errors (${i} success, ${n} failed). Check Output channel.`)})}var G,Uo,jo=z(()=>{"use strict";G=y(require("vscode")),Uo=y(require("path"));P()});async function Jo(){let t=x();if(!t){F.window.showErrorMessage("Ricwiz: Open a folder or workspace that is a Git repository.");return}let e=F.workspace.getConfiguration("ricwiz"),o=e.get("auditUsername",""),s=e.get("auditHours",8),r=await F.window.showInputBox({prompt:"Enter your Salesforce Username to query in SetupAuditTrail",value:o,placeHolder:"admin@tuaorg.com"});if(!r)return;let l=await F.window.showInputBox({prompt:"How many hours back do you want to search?",value:s.toString(),placeHolder:"8"});if(!l)return;let d=parseFloat(l);if(isNaN(d)||d<=0){F.window.showErrorMessage("Ricwiz: Invalid hours specified.");return}let u=new Date(Date.now()-d*60*60*1e3).toISOString(),a=`sf data query -q "${`SELECT Action, Display, Section FROM SetupAuditTrail WHERE CreatedBy.Username = '${r}' AND CreatedDate >= ${u}`}" --json`;await F.window.withProgress({location:F.ProgressLocation.Notification,title:"Ricwiz: Interrogating Setup Audit Trail...",cancellable:!1},async()=>{try{let{stdout:i}=await h(a,{cwd:t,maxBuffer:52428800}),n=JSON.parse(i);if(!n.result||n.result.records.length===0){F.window.showInformationMessage(`Ricwiz: No changes found for ${r} in the last ${d} hours.`);return}let c=n.result.records,g=[],f=new Set;for(let S of c){let T=li(S.Action,S.Display,S.Section);if(T){let oe=`${T.isDelete?"DEL":"ADD"}-${T.metadataFormat}`;if(!f.has(oe)){f.add(oe);let Y=T.isDelete?"$(trash)":"$(plus)";g.push({label:`${Y} ${T.metadataFormat}`,description:`${S.Action} -> ${S.Display}`,metadataFormat:T.metadataFormat,isDelete:T.isDelete})}}}if(g.length===0){F.window.showInformationMessage(`Ricwiz: No extractable metadata changes found for ${r} in the last ${d} hours (ignored passwords/logins).`);return}let m=await F.window.showQuickPick(g,{canPickMany:!0,placeHolder:"Select the changes you want to extract to GitLab",ignoreFocusOut:!0});if(!m||m.length===0){F.window.showInformationMessage("Ricwiz: No changes selected.");return}let w=m.filter(S=>S.isDelete),v=m.filter(S=>!S.isDelete),b=F.window.createOutputChannel("Ricwiz Admin Bridge");if(b.show(),w.length>0){let{stdout:S}=await h("git ls-files",{cwd:t}),T=S.split(`
`).map(Y=>Y.trim()),oe=0;for(let Y of w){let le=Y.metadataFormat.split(":"),Je=le[0],We=le[1],be=We;Je==="CustomField"&&(be=We.split(".")[1]);let st=T.filter(Re=>{let L=nt.basename(Re);return L.startsWith(be+".")&&L.includes(Je==="CustomField"?".field":"")});for(let Re of st){let L=nt.join(t,Re);it.existsSync(L)&&(it.unlinkSync(L),b.appendLine(`Deleted local file: ${Re}`),oe++)}}F.window.showInformationMessage(`Ricwiz: Deleted ${oe} local files from Git workspace.`)}if(v.length===0)return;let $=v.map(S=>S.metadataFormat).filter(S=>S!=="").join(", "),E=await F.window.showInputBox({prompt:"Review and adjust the metadata components to retrieve",value:$,ignoreFocusOut:!0});if(!E)return;let N=`sf project retrieve start -m "${E}"`;b.appendLine(`Executing: ${N}`),F.window.showInformationMessage(`Ricwiz: Extracting ${v.length} components...`);let D=await h(N,{cwd:t});b.appendLine(D.stdout),D.stderr&&(b.appendLine("--- STDERR ---"),b.appendLine(D.stderr)),F.window.showInformationMessage("Ricwiz: Changes extracted successfully! Ready for Git Commit.")}catch(i){F.window.showErrorMessage(`Ricwiz: Error capturing changes - ${i.message}`)}})}function li(t,e,o){if(!t||!e||!o)return null;let s=t.toLowerCase(),r=o.toLowerCase();if(["security controls","network access","session settings","data export","login history","password policies","identity verification","delegated administration"].includes(r)||s.includes("login")||s.includes("password")||s.includes("oauth")||s.includes("session"))return null;let d=s.includes("delete"),u=null;if(s==="permissionsetgroupcomponentadd"||s==="permissionsetgroupcomponentdelete")return null;let p=(a,i=!1)=>{let n=a.replace(/\(.*\)/g,"").trim();n.includes(":")&&!s.includes("calculation")&&(n=n.split(":")[0]);let c=["disabled","deleted","removed","created","changed","updated","from","to","on","assigned","assign","assignment","permission","set","group","apex","class","trigger","custom","field","object","layout","validation","rule","flow","profile"],g=n.split(/\s+/);if(i){for(;g.length>0&&c.includes(g[g.length-1].toLowerCase());)g.pop();for(;g.length>0&&c.includes(g[0].toLowerCase());)g.shift();return g.join(" ").trim().replace(/[^a-zA-Z0-9_ ]/g,"")}else return g.filter(w=>!c.includes(w.toLowerCase())).join("_").replace(/[^a-zA-Z0-9_]/g,"")||n.replace(/\s+/g,"")};if(s.includes("profile"))u=`Profile:${p(e,!0)}`;else if(s.includes("permissionsetgroupcalculation")){let a=e.split(":");u=`PermissionSetGroup:${a.length>1?a[a.length-1].trim():p(e,!1)}`}else if(s.includes("permission set group")||s.includes("permissionsetgroup"))u=`PermissionSetGroup:${p(e,!1)}`;else if(s.includes("permission set")||s.includes("permissionset"))u=`PermissionSet:${p(e,!1)}`;else if(s.includes("apexclass"))u=`ApexClass:${p(e,!1)}`;else if(s.includes("apextrigger")||s.includes("apex trigger"))u=`ApexTrigger:${p(e,!1)}`;else if(s.includes("customfield")){let a=e.match(/([A-Za-z0-9_]+__c)/),i=e.match(/(?:on|na|for)\s+([A-Za-z0-9_]+)/i);a&&i?u=`CustomField:${i[1]}.${a[1]}`:u=`CustomField:${p(e,!1)}`}else if(s.includes("layout"))u=`Layout:${p(e,!0)}`;else if(s.includes("validation"))u=`ValidationRule:${p(e,!1)}`;else if(s.includes("flow"))u=`Flow:${p(e,!1)}`;else if(s.includes("customobject")){let a=e.match(/([A-Za-z0-9_]+__c)/);u=a?`CustomObject:${a[1]}`:`CustomObject:${p(e,!1)}`}else if(!s.includes("created")&&!s.includes("changed")&&!s.includes("deleted"))return null;return u?{metadataFormat:u,isDelete:d}:null}var F,it,nt,Wo=z(()=>{"use strict";F=y(require("vscode")),it=y(require("fs")),nt=y(require("path"));P()});async function qo(){let t=x();if(t)try{let{stdout:e}=await h('git for-each-ref --sort=-committerdate --format="%(refname:short)|||%(committerdate:relative)|||%(subject)" refs/heads/',{cwd:t}),o=e.split(`
`).filter(r=>r.trim()).map(r=>{let l=r.split("|||");return{label:`$(git-branch) ${l[0]}`,description:l[1],detail:l[2],branchName:l[0]}}),s=await ht.window.showQuickPick(o,{placeHolder:"Select a branch from history to checkout",matchOnDescription:!0,matchOnDetail:!0});s&&await De(s.branchName)}catch{ht.window.showErrorMessage("Ricwiz: Failed to get branch history")}}var ht,Go=z(()=>{"use strict";ht=y(require("vscode"));P();tt()});async function Ho(){let t=x();if(!t)return;let e=await Ue.window.showInputBox({prompt:"Enter ticket number or name (e.g., 48934)",placeHolder:"48934"});if(e)try{let{stdout:o}=await h(`git branch --list "*${e}*"`,{cwd:t}),s=o.split(`
`).map(d=>d.replace("*","").trim()).filter(d=>d);if(s.length===0){Ue.window.showInformationMessage(`Ricwiz: No branches found matching "${e}"`);return}let r=s.map(d=>({label:`$(git-branch) ${d}`,branchName:d})),l=await Ue.window.showQuickPick(r,{placeHolder:`Select a branch for ${e}`});l&&await De(l.branchName)}catch{Ue.window.showErrorMessage("Ricwiz: Failed to search branches")}}var Ue,Vo=z(()=>{"use strict";Ue=y(require("vscode"));P();tt()});async function Qo(){let t=$e.window.activeTextEditor;if(!t)return $e.window.showErrorMessage("Ricwiz: Please open a file in the editor to check blame."),null;let e=t.document.fileName,o=_o.basename(e),s=x();if(!s)return $e.window.showErrorMessage("Ricwiz: Workspace is not a git repository."),null;let r=[];try{let{stdout:i}=await h(`git log -5 --pretty=format:"%an|%ar|%s|%h" -- "${e}"`,{cwd:s}),n=i.trim().split(`
`);for(let c of n){let g=c.split("|");g.length>=4&&r.push({author:g[0],time:g[1],message:g.slice(2,-1).join("|"),hash:g[g.length-1]})}}catch(i){console.error("Git blame error:",i)}let l="Unknown",d="Unknown",u="Unknown",p=[],a=mi(e);if(a)try{await $e.window.withProgress({location:$e.ProgressLocation.Notification,title:`Ricwiz: Analyzing ${a.name} in Salesforce...`,cancellable:!1},async()=>{let i="";if(a.type==="CustomField"){let n=a.name.split(".");n.length===2&&(i=`SELECT LastModifiedBy.Name, LastModifiedDate, CreatedBy.Name FROM CustomField WHERE DeveloperName = '${n[1].replace("__c","")}' AND TableEnumOrId = '${n[0]}'`)}else a.type==="LightningComponentBundle"?i=`SELECT LastModifiedBy.Name, LastModifiedDate, CreatedBy.Name FROM LightningComponentBundle WHERE DeveloperName = '${a.name}'`:i=`SELECT LastModifiedBy.Name, LastModifiedDate, CreatedBy.Name FROM ${a.type} WHERE Name = '${a.name}'`;if(i)try{let{stdout:n}=await h(`sf data query -t -q "${i}" --json`,{cwd:s,maxBuffer:52428800}),c=JSON.parse(n);if(c&&c.result&&c.result.records&&c.result.records.length>0){let g=c.result.records[0];l=g.LastModifiedBy?g.LastModifiedBy.Name:"Unknown",u=g.CreatedBy?g.CreatedBy.Name:"Unknown",d=new Date(g.LastModifiedDate).toLocaleString()}else l="Not found in Org",d="N/A",u="N/A"}catch{l="Query Error",d="N/A",u="N/A"}try{let n="SELECT Action, Display, CreatedBy.Name, CreatedDate FROM SetupAuditTrail ORDER BY CreatedDate DESC LIMIT 1500",{stdout:c}=await h(`sf data query -q "${n}" --json`,{cwd:s,maxBuffer:52428800}),g=JSON.parse(c);if(g&&g.result&&g.result.records){let f=a.name.replace("__c","");p=g.result.records.filter(w=>w.Display&&w.Display.includes(f)).map(w=>({action:w.Action,display:w.Display,author:w.CreatedBy?w.CreatedBy.Name:"Unknown",time:new Date(w.CreatedDate).toLocaleString()})).slice(0,10)}}catch(n){console.error("Audit trail query error:",n)}})}catch(i){console.error("Salesforce query error:",i)}else l="Unsupported Metadata Type",d="N/A";return{fileName:o,gitHistory:r,sfAuthor:l,sfTime:d,sfCreatedBy:u,auditHistory:p}}function mi(t){let e=t.replace(/\\/g,"/");if(e.includes("/classes/")){let o=e.match(/\/classes\/([^/.]+)\.cls/);if(o)return{type:"ApexClass",name:o[1]}}if(e.includes("/triggers/")){let o=e.match(/\/triggers\/([^/.]+)\.trigger/);if(o)return{type:"ApexTrigger",name:o[1]}}if(e.includes("/lwc/")){let o=e.match(/\/lwc\/([^/]+)\//);if(o)return{type:"LightningComponentBundle",name:o[1]}}if(e.includes("/aura/")){let o=e.match(/\/aura\/([^/]+)\//);if(o)return{type:"AuraDefinitionBundle",name:o[1]}}if(e.includes("/objects/")&&e.includes("/fields/")){let o=e.match(/\/objects\/([^/]+)\//),s=e.match(/\/fields\/([^/.]+)\.field/);if(o&&s)return{type:"CustomField",name:`${o[1]}.${s[1]}`}}return null}var $e,_o,Yo=z(()=>{"use strict";$e=y(require("vscode")),_o=y(require("path"));P()});function Zo(t,e,o){t.subscriptions.push(C.commands.registerCommand("ricwiz.generateDestructiveChanges",Et),C.commands.registerCommand("ricwiz.runSmartTests",Mt),C.commands.registerCommand("ricwiz.refreshWebview",()=>{e&&C.commands.executeCommand("workbench.action.webview.reloadWebviewAction")}),C.commands.registerCommand("ricwiz.createBranches",At),C.commands.registerCommand("ricwiz.prepareDeploy",jt),C.commands.registerCommand("ricwiz.createMergeRequests",qt),C.commands.registerCommand("ricwiz.createMergeRequestsVSCode",Gt),C.commands.registerCommand("ricwiz.openJiraTicket",_t),C.commands.registerCommand("ricwiz.openJiraTicketVSCode",Qt),C.commands.registerCommand("ricwiz.showJiraDetails",()=>{e&&so(e)}),C.commands.registerCommand("ricwiz.openJiraDashboard",s=>{e&&ao(e,s)}),C.commands.registerCommand("ricwiz.openJiraDetailsForId",s=>{e&&co(e,s)}),C.commands.registerCommand("ricwiz.toggleDashboardBranches",s=>{e&&(e.setDashboardShowBranches(s),C.commands.executeCommand("ricwiz.openJiraDashboard"))}),C.commands.registerCommand("ricwiz.changeJiraStatus",mo),C.commands.registerCommand("ricwiz.addJiraComment",po),C.commands.registerCommand("ricwiz.addJiraLabel",uo),C.commands.registerCommand("ricwiz.setJiraToken",go),C.commands.registerCommand("ricwiz.setGitlabToken",ho),C.commands.registerCommand("ricwiz.syncAll",vo),C.commands.registerCommand("ricwiz.updateBases",yo),C.commands.registerCommand("ricwiz.deleteUnusedBranches",ko),C.commands.registerCommand("ricwiz.checkoutBranch",De),C.commands.registerCommand("ricwiz.copyBranchName",$o),C.commands.registerCommand("ricwiz.generatePackageXml",So),C.commands.registerCommand("ricwiz.deployPackage",Bo),C.commands.registerCommand("ricwiz.importData",To),C.commands.registerCommand("ricwiz.listTicketFiles",Do),C.commands.registerCommand("ricwiz.resetTracking",Ao),C.commands.registerCommand("ricwiz.extractComponent",Fo),C.commands.registerCommand("ricwiz.deployMultiOrg",No),C.commands.registerCommand("ricwiz.captureAdminChanges",Jo),C.commands.registerCommand("ricwiz.openHistory",qo),C.commands.registerCommand("ricwiz.searchTicket",Ho),C.commands.registerCommand("ricwiz.whoToBlame",async()=>{let s=await Qo();s&&e&&(e.setBlameData(s),e.setPage("blame"))}),C.commands.registerCommand("ricwiz.manualRefresh",()=>{o&&o()}),C.commands.registerCommand("ricwiz.toggleAutoRefresh",()=>{if(e){let s=!e.isAutoRefreshEnabled();e.setAutoRefresh(s),C.workspace.getConfiguration("ricwiz").update("autoRefresh",s,C.ConfigurationTarget.Global)}}),C.commands.registerCommand("ricwiz.openSettings",()=>{C.commands.executeCommand("workbench.action.openSettings","ricwiz")}))}var C,Ko=z(()=>{"use strict";C=y(require("vscode"));Tt();Dt();It();Jt();Ht();Yt();ro();lo();fo();wo();bo();xo();Co();tt();Ro();Po();Eo();Mo();Lo();Io();Oo();jo();Wo();Go();Vo();Yo()});function Xo(t,e,o){let s,r=de.workspace.getConfiguration("ricwiz").get("autoRefresh",!0);e?.setAutoRefresh(r),t.subscriptions.push(de.workspace.onDidChangeConfiguration(d=>{if(d.affectsConfiguration("ricwiz.autoRefresh")){let u=de.workspace.getConfiguration("ricwiz").get("autoRefresh",!0);e?.setAutoRefresh(u)}}));async function l(){let d=de.extensions.getExtension("vscode.git");if(d){let a=function(i){let n="",c;async function g(){let m=de.workspace.workspaceFolders;if(!m)return;let w=m[0].uri.fsPath,v=await U(w);if(v&&v!==n){n=v;let b=de.workspace.getConfiguration("ricwiz"),$=b.get("ticketPrefix","SFPSCA-");if(!v.includes($)){let L=v.match(/([A-Z]+-)\d+/i);L&&($=L[1].toUpperCase())}let E=[],N=[],D=[],S=[],T=await M.initialize(w,{skipPrompt:!0}),oe=T?.environments||b.get("environments",[{name:"Qual",sourceBranch:"quality"},{name:"Val",sourceBranch:"validation"},{name:"Prod",sourceBranch:"main"}]);try{let L=b.get("workspaceCheckoutButtons",["main","quality","validation"]);D=Array.from(new Set(L))}catch{}let Y="",le=v.match(new RegExp(`(${$}\\d+(?:-\\d+)?)`,"i"));if(le){let L=le[1].toUpperCase();Y=L;let ye=b.get("commitMessageSuffix","- "),wt=/^[A-Z]+-\d+(?:-\d+)?\s*(?:-\s*|:\s*|\s+)?/i;wt.test(i.inputBox.value)?i.inputBox.value.toUpperCase().startsWith(L)||(i.inputBox.value=i.inputBox.value.replace(wt,`${L}${ye}`)):i.inputBox.value=`${L}${ye}`+i.inputBox.value,o.text=`$(bookmark) ${L}`,o.tooltip=`Branch: ${v}
Click to open Jira ticket`,o.show();try{let vt=await gt(w,L,"");E=await lt(w,vt,L,oe,T)}catch{}}else{o.hide();try{S=await ut(w)}catch{}}let[Je,We,be]=await Promise.all([pt(w,10),mt(w,v,oe,T),Y?Me(Y).catch(L=>{let ye=L.message;return(ye.includes("ENOTFOUND")||ye.includes("network"))&&(ye="No Internet or Invalid URL"),{summary:`\u26A0\uFE0F Jira Error: ${ye}`,description:"",status:""}}):Promise.resolve(null)]);N=Je;let st=be?be.summary:"",Re=be&&be.status||"";e?.updateBranch(v,We,E,N,D,S,st,Re)}}function f(){e?.isAutoRefreshEnabled()&&(c&&clearTimeout(c),c=setTimeout(()=>{n="",g()},300))}s=()=>{n="",g()},g(),i.state.onDidChange(()=>f()),de.window.onDidChangeWindowState(m=>{m.focused&&f()})};var u=a;d.isActive||await d.activate();let p=d.exports.getAPI(1);p.repositories.length>0&&p.repositories.forEach(i=>a(i)),p.onDidOpenRepository(i=>a(i))}}return l(),()=>{s&&s()}}var de,ei=z(()=>{"use strict";de=y(require("vscode"));P();pe();Fe();J()});var _e={};Le(_e,{activate:()=>pi,deactivate:()=>ui,webviewProvider:()=>Ne});module.exports=I(_e);function pi(t){xt(t),Ne=new Ge(t.extensionUri),t.subscriptions.push(je.window.registerWebviewViewProvider("ricwiz-webview",Ne));let e=je.window.createStatusBarItem(je.StatusBarAlignment.Left,100);e.command="ricwiz.openJiraTicket",t.subscriptions.push(e);let o=Xo(t,Ne,e);Zo(t,Ne,o)}function ui(){}var je,Ne,Qe=z(()=>{je=y(require("vscode"));yt();ze();Ko();ei()});Qe();0&&(module.exports={activate,deactivate,webviewProvider});
