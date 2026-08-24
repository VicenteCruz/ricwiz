"use strict";var ei=Object.create;var Oe=Object.defineProperty;var ti=Object.getOwnPropertyDescriptor;var oi=Object.getOwnPropertyNames;var ii=Object.getPrototypeOf,ni=Object.prototype.hasOwnProperty;var $=(t,e,o)=>()=>{if(o)throw o[0];try{return t&&(e=t(t=0)),e}catch(s){throw o=[s],s}};var Ne=(t,e)=>{for(var o in e)Oe(t,o,{get:e[o],enumerable:!0})},pt=(t,e,o,s)=>{if(e&&typeof e=="object"||typeof e=="function")for(let n of oi(e))!ni.call(t,n)&&n!==o&&Oe(t,n,{get:()=>e[n],enumerable:!(s=ti(e,n))||s.enumerable});return t};var v=(t,e,o)=>(o=t!=null?ei(ii(t)):{},pt(e||!t||!t.__esModule?Oe(o,"default",{value:t,enumerable:!0}):o,t)),W=t=>pt(Oe({},"__esModule",{value:!0}),t);function C(t){return t.replace(/&/g,"&amp;").replace(/</g,"&lt;").replace(/>/g,"&gt;").replace(/"/g,"&quot;").replace(/'/g,"&#39;")}var b,Ue,ut=$(()=>{"use strict";b=v(require("vscode"));Ue=class{constructor(e){this._extensionUri=e}_extensionUri;webviewView;resolveWebviewView(e,o,s){this.webviewView=e,e.webview.options={enableScripts:!0,localResourceRoots:[this._extensionUri]},this.updateBranch("",!1),e.webview.onDidReceiveMessage(n=>{switch(n.command){case"createBranches":b.commands.executeCommand("ricwiz.createBranches");break;case"createBranchForTicket":b.commands.executeCommand("ricwiz.createBranches",n.args);break;case"prepareDeploy":b.commands.executeCommand("ricwiz.prepareDeploy");break;case"openMRs":b.commands.executeCommand("ricwiz.createMergeRequests");break;case"openMRsVSCode":b.commands.executeCommand("ricwiz.createMergeRequestsVSCode");break;case"openExternal":n.args&&b.env.openExternal(b.Uri.parse(n.args));break;case"openJira":b.commands.executeCommand("ricwiz.openJiraTicket");break;case"showJiraDetails":b.commands.executeCommand("ricwiz.showJiraDetails");break;case"changeJiraStatus":b.commands.executeCommand("ricwiz.changeJiraStatus");break;case"addJiraComment":b.commands.executeCommand("ricwiz.addJiraComment");break;case"addJiraLabel":b.commands.executeCommand("ricwiz.addJiraLabel");break;case"setPage":this.setPage(n.args);break;case"openDashboard":b.commands.executeCommand("ricwiz.openJiraDashboard");break;case"openJiraDetailsForId":b.commands.executeCommand("ricwiz.openJiraDetailsForId",n.args);break;case"refreshDashboard":b.commands.executeCommand("ricwiz.openJiraDashboard");break;case"switchDashboardQuery":b.commands.executeCommand("ricwiz.openJiraDashboard",parseInt(n.args));break;case"toggleDashboardBranches":b.commands.executeCommand("ricwiz.toggleDashboardBranches",n.args);break;case"openJiraVSCode":b.commands.executeCommand("ricwiz.openJiraTicketVSCode");break;case"openSettings":b.commands.executeCommand("ricwiz.openSettings");break;case"checkout":n.branch&&b.commands.executeCommand("ricwiz.checkoutBranch",n.branch);break;case"copyBranch":b.commands.executeCommand("ricwiz.copyBranchName");break;case"generatePackageXml":b.commands.executeCommand("ricwiz.generatePackageXml");break;case"openDevTools":this.setPage("devtools");break;case"openMain":this.setPage("main");break;case"generateDestructiveChanges":b.commands.executeCommand("ricwiz.generateDestructiveChanges");break;case"deployPackage":b.commands.executeCommand("ricwiz.deployPackage");break;case"runSmartTests":b.commands.executeCommand("ricwiz.runSmartTests");break;case"importData":b.commands.executeCommand("ricwiz.importData");break;case"listTicketFiles":b.commands.executeCommand("ricwiz.listTicketFiles");break;case"resetTracking":b.commands.executeCommand("ricwiz.resetTracking");break;case"extractComponent":b.commands.executeCommand("ricwiz.extractComponent");break;case"deployMultiOrg":b.commands.executeCommand("ricwiz.deployMultiOrg");break;case"captureAdminChanges":b.commands.executeCommand("ricwiz.captureAdminChanges");break;case"whoToBlame":b.commands.executeCommand("ricwiz.whoToBlame");break;case"syncAll":b.commands.executeCommand("ricwiz.syncAll");break;case"updateBases":b.commands.executeCommand("ricwiz.updateBases");break;case"deleteUnused":b.commands.executeCommand("ricwiz.deleteUnusedBranches");break;case"conflict_commitAndContinue":b.commands.executeCommand("ricwiz.conflictAction","commitAndContinue");break;case"conflict_resolveDeletions":b.commands.executeCommand("ricwiz.conflictAction","resolveDeletions");break;case"conflict_abortDeploy":b.commands.executeCommand("ricwiz.conflictAction","abortDeploy");break;case"openFile":if(n.file){let m=b.workspace.workspaceFolders;if(m){let a=b.Uri.joinPath(m[0].uri,n.file);b.commands.executeCommand("vscode.open",a)}}break;case"searchTicket":b.commands.executeCommand("ricwiz.searchTicket");break;case"manualRefresh":b.commands.executeCommand("ricwiz.manualRefresh");break;case"toggleAutoRefresh":b.commands.executeCommand("ricwiz.toggleAutoRefresh");break;case"openHistory":b.commands.executeCommand("ricwiz.openHistory");break}})}conflictState=null;setConflictState(e){this.conflictState=e,this.updateView()}updateBranch(e,o,s=[],n=[],m=[],a=[],g="",l=""){this.webviewView&&(this.currentBranchCache=e,this.currentBranchIsMergedCache=o,this.relatedBranchesCache=s,this.commitsCache=n,this.baseBranchesCache=m,this.recentTicketsCache=a,this.ticketTitleCache=g,this.ticketStatusCache=l,this.updateView())}currentBranchCache="";currentBranchIsMergedCache=!1;relatedBranchesCache=[];commitsCache=[];baseBranchesCache=[];recentTicketsCache=[];ticketTitleCache="";ticketStatusCache="";currentPage="main";blameDataCache=null;jiraDataCache=null;dashboardDataCache=null;dashboardShowBranches=!1;autoRefreshEnabled=!0;setDashboardShowBranches(e){this.dashboardShowBranches=e}getDashboardShowBranches(){return this.dashboardShowBranches}setBlameData(e){this.blameDataCache=e}setJiraData(e){this.jiraDataCache=e}setDashboardData(e){this.dashboardDataCache=e}setAutoRefresh(e){this.autoRefreshEnabled=e,this.updateView()}isAutoRefreshEnabled(){return this.autoRefreshEnabled}setPage(e){this.currentPage=e,this.updateView()}updateView(){if(!this.webviewView)return;let e=this.webviewView.webview.asWebviewUri(b.Uri.joinPath(this._extensionUri,"resources","logo.png"));this.webviewView.webview.html=this._getHtmlForWebview(e,this.currentBranchCache,this.relatedBranchesCache,this.commitsCache,this.baseBranchesCache,this.recentTicketsCache,this.currentPage)}_getHtmlForWebview(e,o,s,n,m,a,g){let l=n.length>0?`
            <div class="separator"></div>
            <div style="padding: 0 4px;">
                <div style="font-size: 11px; opacity: 0.7; margin-bottom: 6px; display: flex; align-items: center; gap: 4px;">
                    <span>\u{1F4DC}</span> Recent Commits
                </div>
                <div style="display: flex; flex-direction: column; gap: 2px;">
                    ${n.map(u=>`
                        <div style="font-size: 11px; padding: 3px 4px; border-radius: 2px; display: flex; gap: 6px; align-items: baseline;">
                            <code style="color: var(--vscode-textLink-foreground); font-size: 10px; flex-shrink: 0;">${C(u.hash)}</code>
                            <span style="flex: 1; overflow: hidden; text-overflow: ellipsis; white-space: nowrap;" title="${C(u.message)}">${C(u.message)}</span>
                            <span style="font-size: 9px; opacity: 0.5; flex-shrink: 0;">${C(u.timeAgo)}</span>
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
        `;if(this.conflictState){let u=(this.conflictState.files||[]).map(w=>`
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
                
                ${u?`
                    <div style="font-size: 11px; opacity: 0.7; margin: 8px 4px 4px 4px; text-transform: uppercase;">Conflicted Files</div>
                    <div style="display: flex; flex-direction: column; gap: 2px;">
                        ${u}
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
            </html>`}if(g==="blame"){let u=this.blameDataCache;return`<!DOCTYPE html>
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

                ${u?`
                <div style="padding: 12px; background: var(--vscode-editor-background); border: 1px solid var(--vscode-widget-border); border-radius: 6px; margin-bottom: 12px;">
                    <div style="font-weight: bold; margin-bottom: 12px; font-size: 14px; text-align: center; color: var(--vscode-textLink-foreground); word-break: break-all;">
                        \u{1F4C4} ${u.fileName}
                    </div>


                    <div style="margin-bottom: 20px;">
                        <div style="font-size: 11px; font-weight: bold; opacity: 0.8; text-transform: uppercase; margin-bottom: 8px;"><span class="icon">\u{1F4BB}</span> Local Git (Last Commits)</div>
                        <ul style="list-style-type: none; padding: 0; margin: 0; display: flex; flex-direction: column; gap: 8px;">
                            ${u.gitHistory&&u.gitHistory.length>0?u.gitHistory.map(w=>`
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
                        <div style="font-size: 11px; font-weight: bold; opacity: 0.8; text-transform: uppercase; margin-bottom: 8px;"><span class="icon">\u{1F575}\uFE0F</span> Setup Audit Trail (Recent)</div>
                        <ul style="list-style-type: none; padding: 0; margin: 0; display: flex; flex-direction: column; gap: 8px;">
                            ${u.auditHistory&&u.auditHistory.length>0?u.auditHistory.map(w=>`
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
            </html>`}if(g==="jira"){let u=this.jiraDataCache,w=u?.ticketId||"Jira",z=u?.summary||"No Title",x=u?.description||"No description provided.",P=u?.relatedBranches||[];return`<!DOCTYPE html>
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
                    <span style="font-weight: 600; font-size: 13px;">${w} Details</span>
                </div>
                
                <div class="card" style="padding: 16px;">
                    <div class="jira-title">${C(z)}</div>
                    <div class="jira-desc">${C(x)}</div>
                    
                    ${P.length>0?`
                        <div style="margin-top: 16px; border-top: 1px solid var(--vscode-panel-border); padding-top: 12px;">
                            <div style="font-size: 11px; opacity: 0.7; margin-bottom: 8px; text-transform: uppercase; font-weight: bold;"><span class="icon">\u{1F33F}</span> Related Branches & MRs</div>
                            <div style="display: flex; flex-direction: column; gap: 4px;">
                                ${P.map(B=>{let N="";return B.pipelineStatus==="running"?N="\u23F3":B.pipelineStatus==="success"?N="\u2705":B.pipelineStatus==="failed"?N="\u274C":B.pipelineStatus==="canceled"?N="\u{1F6D1}":B.pipelineStatus==="skipped"&&(N="\u23ED\uFE0F"),`
                                    <div class="btn" style="padding: 6px 10px; font-size: 12px; display: flex; justify-content: space-between; align-items: center; background-color: var(--vscode-button-secondaryBackground); color: var(--vscode-button-secondaryForeground); border-radius: 4px;" onclick="sendCheckoutCommand('${C(B.name)}')" title="Checkout ${C(B.name)}">
                                        <div style="display: flex; align-items: center; gap: 6px; overflow: hidden;">
                                            <span style="overflow: hidden; text-overflow: ellipsis; white-space: nowrap; font-weight: bold;">${C(B.name)}</span>
                                        </div>
                                        <div style="display: flex; gap: 6px; align-items: center;">
                                            ${N?`<span title="Pipeline: ${B.pipelineStatus}" style="font-size: 11px;">${N}</span>`:""}
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
            </html>`}if(g==="dashboard"){let u=this.dashboardDataCache||{queries:[],selectedIndex:0,results:[],error:null},w=u.queries.map((x,P)=>`
                <option value="${P}" ${P===u.selectedIndex?"selected":""}>${C(x.name)}</option>
            `).join(""),z=u.error?`
                <div style="color: var(--vscode-errorForeground); padding: 12px; text-align: center; background: var(--vscode-editorError-background); border-radius: 4px;">
                    \u26A0\uFE0F ${C(u.error)}
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
                        ${u.results.map(x=>`
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
                ${c}
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
                
                ${u.queries.length>0?`
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
            </html>`}if(g==="devtools")return`<!DOCTYPE html>
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
            </html>`;let i=s.find(u=>u.name===o),d="";i&&(i.pipelineStatus==="running"?d="\u23F3":i.pipelineStatus==="success"?d="\u2705":i.pipelineStatus==="failed"?d="\u274C":i.pipelineStatus==="canceled"?d="\u{1F6D1}":i.pipelineStatus==="skipped"&&(d="\u23ED\uFE0F"));let r=i?i.mrUrl:void 0,p=s.filter(u=>u.name!==o),f=o?`<div style="background-color: var(--vscode-editor-inactiveSelectionBackground); padding: 10px; border-radius: 6px; margin-bottom: 16px; border: 1px solid var(--vscode-panel-border); box-shadow: 0 2px 4px rgba(0,0,0,0.1); position: relative;">
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
                        ${d?`<span title="Pipeline: ${i.pipelineStatus}" style="font-size: 12px;">${d}</span>`:""}
                        ${r?`<span onclick="event.stopPropagation(); sendCommand('openExternal', '${r}');" title="Open Merge Request" style="cursor: pointer; font-size: 12px;">\u{1F517}</span>`:""}
                        ${this.currentBranchIsMergedCache?'<span style="background-color: var(--vscode-charts-green); color: white; border-radius: 3px; padding: 1px 4px; font-size: 10px; font-weight: bold;" title="Merged to target env">MERGED</span>':""}
                    </div>
                    ${this.ticketTitleCache?`<div style="font-size: 12px; margin-top: 6px; text-align: center; opacity: 0.9; font-style: italic;">${C(this.ticketTitleCache)}</div>`:""}
                    ${p.length>0?`
                        <div style="margin-top: 10px; border-top: 1px solid var(--vscode-panel-border); padding-top: 10px;">
                            <div style="font-size: 10px; opacity: 0.7; margin-bottom: 6px; text-transform: uppercase; text-align: center;">Sister Branches</div>
                            <div style="display: flex; flex-direction: column; gap: 4px;">
                                ${p.map(u=>{let w="";return u.pipelineStatus==="running"?w="\u23F3":u.pipelineStatus==="success"?w="\u2705":u.pipelineStatus==="failed"?w="\u274C":u.pipelineStatus==="canceled"?w="\u{1F6D1}":u.pipelineStatus==="skipped"&&(w="\u23ED\uFE0F"),`
                                    <div class="btn" style="padding: 4px 8px; font-size: 11px; display: flex; justify-content: space-between; align-items: center; background-color: var(--vscode-button-secondaryBackground); color: var(--vscode-button-secondaryForeground); border-radius: 4px;" onclick="sendCheckoutCommand('${C(u.name)}', this)" title="Checkout ${C(u.name)}">
                                        <div style="display: flex; align-items: center; gap: 4px; overflow: hidden;">
                                            <span style="overflow: hidden; text-overflow: ellipsis; white-space: nowrap; font-weight: bold;">${C(u.name)}</span>
                                        </div>
                                        <div style="display: flex; gap: 4px; align-items: center;">
                                            ${w?`<span title="Pipeline: ${u.pipelineStatus}" style="font-size: 10px;">${w}</span>`:""}
                                            ${u.mrUrl?`<span onclick="event.stopPropagation(); sendCommand('openExternal', '${u.mrUrl}');" title="Open Merge Request" style="cursor: pointer; font-size: 10px;">\u{1F517}</span>`:""}
                                            ${u.isMerged?'<span style="background-color: var(--vscode-charts-green); color: white; border-radius: 3px; padding: 1px 4px; font-size: 9px; font-weight: bold;" title="Merged to target env">MERGED</span>':""}
                                        </div>
                                    </div>
                                    `}).join("")}
                            </div>
                        </div>
                    `:a.length>0?`
                        <div style="margin-top: 10px; border-top: 1px solid var(--vscode-panel-border); padding-top: 10px;">
                            <div style="font-size: 10px; opacity: 0.7; margin-bottom: 6px; text-transform: uppercase; text-align: center;">Recent Tickets</div>
                            <div style="display: flex; flex-direction: column; gap: 4px;">
                                ${a.map(u=>`
                                    <div class="btn" style="padding: 4px 8px; font-size: 11px; display: flex; align-items: center; background-color: var(--vscode-button-secondaryBackground); color: var(--vscode-button-secondaryForeground); border-radius: 4px;" onclick="sendCheckoutCommand('${C(u)}', this)" title="Checkout ${C(u)}">
                                        <span style="font-weight: bold;">${C(u)}</span>
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

            ${f}


            ${m.length>0?`
                <div style="display: flex; gap: 4px; margin-bottom: 16px; flex-wrap: wrap; justify-content: center;">
                    ${m.map(u=>`
                        <button class="btn" style="flex: 1; min-width: 25%; justify-content: center; padding: 6px 4px; font-size: 10px; font-weight: bold; background-color: var(--vscode-button-secondaryBackground); color: var(--vscode-button-secondaryForeground); border-radius: 4px;" onclick="sendCheckoutCommand('${C(u)}', this)" title="Checkout ${C(u)}">
                            ${C(u.toUpperCase())}
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
        </html>`}}});function gt(t){de=t.secrets}async function ft(t){if(!de)throw new Error("SecretStorage is not initialized.");await de.store("ricwiz.jiraApiToken",t)}async function ht(){if(!de)throw new Error("SecretStorage is not initialized.");return await de.get("ricwiz.jiraApiToken")}async function wt(t){if(!de)throw new Error("SecretStorage is not initialized.");await de.store("ricwiz.gitlabApiToken",t)}async function Ke(){if(!de)throw new Error("SecretStorage is not initialized.");return await de.get("ricwiz.gitlabApiToken")}var de,ke=$(()=>{"use strict"});var Be={};Ne(Be,{checkBranchExists:()=>ue,exec:()=>h,extractTicketSuggestion:()=>xt,getCurrentBranch:()=>L,getWorkspaceCwd:()=>y,normalizeTicketId:()=>kt,promptForTicketId:()=>q,resolvePrefix:()=>bt,ricwizLogger:()=>I});function y(){let t=Ce.workspace.workspaceFolders;if(t)return t[0].uri.fsPath}async function L(t){try{let{stdout:e}=await h("git branch --show-current",{cwd:t});return e.trim()}catch{return""}}function bt(t,e){if(!t.includes(e)){let o=t.match(/([A-Z]+-)\d+/i);if(o)return o[1].toUpperCase()}return e}function xt(t,e,o=!1){let s=t.match(new RegExp(`(${e}\\d+)`,"i"));return s?s[1].toUpperCase():t.includes(e)&&!t.includes("-to-")?t.substring(t.indexOf(e)):o&&t.includes("-to-")?t.substring(t.indexOf(e)).split("-to-")[0]:""}function kt(t,e){let o=t.trim();return/^\d/.test(o)?`${e}${o}`.toUpperCase():o.toUpperCase()}async function q(t,e){let o=Ce.workspace.getConfiguration("ricwiz"),s=e?.prefix??o.get("ticketPrefix","SFPSCA-"),n=await L(t),m=bt(n,s),a=e?.suggestedValue??xt(n,m,e?.handleToSuffix),g=await Ce.window.showInputBox({prompt:e?.prompt||"Enter the full ticket ID (e.g., SCPSCA-1234) or just the number",placeHolder:e?.placeHolder||"Ticket ID or number",value:a});return g?{ticketId:kt(g,m),currentBranch:n,prefix:m}:void 0}async function ue(t,e){try{return await h(`git show-ref --verify --quiet refs/heads/${e}`,{cwd:t}),!0}catch{}try{return await h(`git show-ref --verify --quiet refs/remotes/origin/${e}`,{cwd:t}),!0}catch{}return!1}var Ce,vt,yt,si,I,h,R=$(()=>{"use strict";Ce=v(require("vscode")),vt=v(require("child_process")),yt=v(require("util")),si=yt.promisify(vt.exec),I=Ce.window.createOutputChannel("Ricwiz"),h=async(t,e)=>{I.appendLine(`[EXEC] ${t}`);let o=await si(t,{maxBuffer:50*1024*1024,...e});return{stdout:o.stdout.toString(),stderr:o.stderr.toString()}}});async function Ct(){let t=y();if(!t){G.window.showErrorMessage("Ricwiz: Open a workspace that is a Git repository.");return}let o=G.workspace.getConfiguration("ricwiz").get("ticketSourceBranch","main");await G.window.withProgress({location:G.ProgressLocation.Notification,title:`Ricwiz: Finding deleted files compared to origin/${o}...`,cancellable:!1},async()=>{try{let{stdout:s}=await h(`git diff --name-only --diff-filter=D origin/${o}...HEAD`,{cwd:t}),n=s.split(`
`).map(r=>r.trim()).filter(r=>r.length>0);if(n.length===0){G.window.showInformationMessage(`Ricwiz: No deleted files found compared to origin/${o}.`);return}let m={},a=(r,p)=>{m[r]||(m[r]=[]),m[r].includes(p)||m[r].push(p)};for(let r of n){let p=r.replace(/\\/g,"/");if(p.includes("/classes/")){let f=p.match(/\/classes\/([^/.]+)\.cls/);f&&a("ApexClass",f[1])}else if(p.includes("/triggers/")){let f=p.match(/\/triggers\/([^/.]+)\.trigger/);f&&a("ApexTrigger",f[1])}else if(p.includes("/lwc/")){let f=p.match(/\/lwc\/([^/]+)\//);f&&a("LightningComponentBundle",f[1])}else if(p.includes("/aura/")){let f=p.match(/\/aura\/([^/]+)\//);f&&a("AuraDefinitionBundle",f[1])}else if(p.includes("/objects/")&&p.includes("/fields/")){let f=p.match(/\/objects\/([^/]+)\//),u=p.match(/\/fields\/([^/.]+)\.field/);f&&u&&a("CustomField",`${f[1]}.${u[1]}`)}else if(p.includes("/objects/")){let f=p.match(/\/objects\/([^/.]+)\.object/);f&&a("CustomObject",f[1])}else if(p.includes("/layouts/")){let f=p.match(/\/layouts\/([^/.]+)\.layout/);f&&a("Layout",f[1])}else if(p.includes("/flows/")){let f=p.match(/\/flows\/([^/.]+)\.flow/);f&&a("Flow",f[1])}else if(p.includes("/permissionsets/")){let f=p.match(/\/permissionsets\/([^/.]+)\.permissionset/);f&&a("PermissionSet",f[1])}else if(p.includes("/profiles/")){let f=p.match(/\/profiles\/([^/.]+)\.profile/);f&&a("Profile",f[1])}else if(p.includes("/customMetadata/")){let f=p.match(/\/customMetadata\/([^/.]+)\.md/);f&&a("CustomMetadata",f[1])}else if(p.includes("/flexipages/")){let f=p.match(/\/flexipages\/([^/.]+)\.flexipage/);f&&a("FlexiPage",f[1])}}if(Object.keys(m).length===0){G.window.showInformationMessage("Ricwiz: Found deleted files in Git, but none mapped to recognizable Salesforce metadata.");return}let g=`<?xml version="1.0" encoding="UTF-8"?>
<Package xmlns="http://soap.sforce.com/2006/04/metadata">
`;for(let r of Object.keys(m).sort()){g+=`    <types>
`;for(let p of m[r].sort())g+=`        <members>${p}</members>
`;g+=`        <name>${r}</name>
    </types>
`}g+=`    <version>58.0</version>
</Package>`;let l=je.join(t,"destructiveChanges");ge.existsSync(l)||ge.mkdirSync(l);let c=je.join(l,"destructiveChanges.xml"),i=je.join(l,"package.xml");ge.writeFileSync(c,g,"utf8"),ge.existsSync(i)||ge.writeFileSync(i,`<?xml version="1.0" encoding="UTF-8"?>
<Package xmlns="http://soap.sforce.com/2006/04/metadata">
    <version>58.0</version>
</Package>`,"utf8");let d=await G.workspace.openTextDocument(c);await G.window.showTextDocument(d),G.window.showInformationMessage("Ricwiz: destructiveChanges.xml generated successfully!")}catch(s){G.window.showErrorMessage(`Ricwiz: Error generating destructive changes: ${s.message}`)}})}var G,je,ge,$t=$(()=>{"use strict";G=v(require("vscode")),je=v(require("path")),ge=v(require("fs"));R()});async function zt(){let t=y();if(!t)return;let o=re.workspace.getConfiguration("ricwiz").get("ticketSourceBranch","main");await re.window.withProgress({location:re.ProgressLocation.Notification,title:"Ricwiz: Finding Apex Tests to run...",cancellable:!1},async()=>{try{let{stdout:s}=await h(`git diff --name-status origin/${o}...HEAD`,{cwd:t}),n=s.split(`
`).map(r=>r.trim()).filter(r=>r.length>0),m=new Set,a=new Set;for(let r of n){let p=r.split(/\s+/);if(p[0].startsWith("D"))continue;let f=p[1];if(f&&f.endsWith(".cls")){let u=f.match(/\/classes\/([^/.]+)\.cls/);if(u){let w=u[1];w.toLowerCase().endsWith("test")?m.add(w):a.add(w)}}}for(let r of a)m.add(`${r}Test`);if(m.size===0){re.window.showInformationMessage("Ricwiz: No Apex Classes were modified in this branch.");return}let g=Array.from(m).map(r=>({label:`$(beaker) ${r}`,description:"Apex Test Class"})),l=await re.window.showQuickPick(g,{canPickMany:!0,title:"Select Test Classes to Run",placeHolder:"Select tests..."});if(!l||l.length===0)return;let i=`sf apex run test -n ${l.map(r=>r.label.replace("$(beaker) ","").trim()).join(",")} -r human -w 30`,d=re.window.createTerminal("Ricwiz: Smart Tests");d.show(),d.sendText(i)}catch(s){re.window.showErrorMessage(`Ricwiz: Error finding tests: ${s.message}`)}})}var re,Rt=$(()=>{"use strict";re=v(require("vscode"));R()});var we,St=$(()=>{"use strict";we=class{static isValidShellArg(e){return e?/^[a-zA-Z0-9\-_/.]+$/.test(e):!1}}});var Xe={};Ne(Xe,{WorkflowContext:()=>T});var Pe,Bt,Je,T,V=$(()=>{"use strict";Pe=v(require("vscode")),Bt=v(require("path")),Je=v(require("fs")),T=class t{style;upstreamRemote;originRemote;ticketSourceBranch;ticketPrefix;environments;static baseConfig=Pe.workspace.getConfiguration("ricwiz");activeProfile;profileName;constructor(e){this.activeProfile=e,this.profileName=e?.name;let o=t.baseConfig;this.style=e?.workflowStyle||o.get("workflowStyle","standard"),this.style==="multi-remote"?(this.upstreamRemote=e?.upstreamRemote||o.get("upstreamRemote","salesforce-master"),this.originRemote=e?.originRemote||o.get("originRemote","origin")):(this.upstreamRemote="origin",this.originRemote="origin"),this.ticketSourceBranch=e?.ticketSourceBranch||o.get("ticketSourceBranch","main"),this.ticketPrefix=e?.ticketPrefix||o.get("ticketPrefix","SFPSCA-");let s=[{name:"Qual",sourceBranch:"quality"},{name:"Val",sourceBranch:"validation"},{name:"Prod",sourceBranch:"main"}];this.environments=e?.environments||o.get("environments",s)}getConfig(e,o){return this.activeProfile&&this.activeProfile[e]!==void 0?this.activeProfile[e]:t.baseConfig.get(e,o)}static async initialize(e,o){let s=t.baseConfig.get("profiles",[]),n=Bt.join(e,"ricwiz.json");if(Je.existsSync(n))try{let m=Je.readFileSync(n,"utf-8"),a=JSON.parse(m);a&&Array.isArray(a.profiles)&&(s=[...s,...a.profiles])}catch(m){Pe.window.showErrorMessage(`Ricwiz: Error parsing ricwiz.json: ${m.message}`)}if(s.length>0){if(o?.ticketId){let l=s.find(c=>c.ticketPrefix&&o.ticketId.toUpperCase().startsWith(c.ticketPrefix.toUpperCase()));if(l)return new t(l)}if(!o?.forcePrompt)try{let{exec:l}=(R(),W(Be)),{stdout:c}=await l("git branch --show-current",{cwd:e}),i=c.trim(),d=i;i.includes("-to-")&&(d=i.split("-to-")[0]);let{stdout:r}=await l(`git config branch.${d}.ricwiz-profile`,{cwd:e}),p=r.trim();if(p){let f=s.find(u=>u.name===p);if(f)return new t(f)}}catch{}if(o?.skipPrompt)return new t;let m=s.map(l=>l.name),a=await Pe.window.showQuickPick(m,{placeHolder:"Ricwiz: Select Workflow Profile",ignoreFocusOut:!0});if(!a)return;let g=s.find(l=>l.name===a);return new t(g)}return new t}buildUpstreamPath(e){return e.includes("/")?e:`${this.upstreamRemote}/${e}`}getFetchRemote(e){return e.includes("/")?e.split("/")[0]:this.upstreamRemote}getFetchBranch(e){return e.includes("/")?e.substring(e.indexOf("/")+1):e}}});async function Pt(t){let e=y();if(!e){D.window.showErrorMessage("Open a folder or workspace that is a Git repository.");return}let o=await T.initialize(e,{forcePrompt:!0});if(!o)return;let s=typeof t=="string"?t:void 0,n=await q(e,{prefix:o.ticketPrefix,suggestedValue:s});if(!n){D.window.showErrorMessage("Branch creation cancelled: Ticket not provided.");return}let{ticketId:m}=n,a=o.environments,g="all",l=[{label:"Create Main Branch & Environments",description:"Creates the main ticket branch and all environment branches",value:"all"},{label:"Create Main Branch Only",description:"Creates only the main ticket branch (skips environments)",value:"mainOnly"},{label:"Create Environments Only",description:"Creates only the environment branches (skip main branch)",value:"envs"}];if(a.length>0){let d=await D.window.showQuickPick(l,{placeHolder:"Ricwiz: What do you want to create?",ignoreFocusOut:!0});if(!d)return;g=d.value}let c=o.ticketSourceBranch;if(g==="all"||g==="mainOnly"){let d=[];try{let{stdout:u}=await h('git branch --all --format="%(refname:short)"',{cwd:e});d=u.split(`
`).map(w=>w.trim()).filter(w=>w&&w!=="origin"),d=[...new Set(d)]}catch{}let r=D.window.createQuickPick();r.title="Ricwiz: Ticket Source Branch",r.placeholder="Confirm or change the source branch for this ticket",r.value=o.ticketSourceBranch,r.ignoreFocusOut=!0;let p=()=>{let u=r.value.trim(),w=[];u&&w.push({label:u,description:"Use typed branch"}),w.push(...d.map(z=>({label:z}))),r.items=w};r.onDidChangeValue(p),p();let f=await new Promise(u=>{r.onDidAccept(()=>{let w=r.selectedItems[0];u(w?w.label:r.value),r.hide()}),r.onDidHide(()=>u(void 0)),r.show()});if(!f){D.window.showInformationMessage("Branch creation cancelled.");return}c=f.trim()}let i=m;if(!we.isValidShellArg(i)){D.window.showErrorMessage(`Invalid format for ticket ID: ${i}`);return}if(!we.isValidShellArg(c)){D.window.showErrorMessage(`Invalid format for ticketSourceBranch in settings: ${c}`);return}for(let d of a){if(!we.isValidShellArg(d.name)){D.window.showErrorMessage(`Invalid format for environment name in settings: ${d.name}`);return}if(!we.isValidShellArg(d.sourceBranch)){D.window.showErrorMessage(`Invalid format for environment sourceBranch in settings: ${d.sourceBranch}`);return}}try{await h("git status",{cwd:e})}catch{D.window.showErrorMessage("The opened folder does not appear to be a valid Git repository.");return}try{await D.window.withProgress({location:D.ProgressLocation.Notification,title:"Ricwiz: Creating Branches",cancellable:!1},async d=>{let r=[];d.report({message:"Checking remote status (git fetch)...",increment:10});try{await h("git fetch",{cwd:e})}catch{}try{if(g==="all"||g==="mainOnly"){if(d.report({message:`Creating main branch ${i}...`,increment:10}),await ue(e,i))D.window.showInformationMessage(`Ricwiz: The branch ${i} already exists. Skipping creation...`),await h(`git checkout ${i}`,{cwd:e});else try{let p=o.getFetchRemote(c),f=o.getFetchBranch(c),u=o.buildUpstreamPath(c);await h(`git fetch ${p} ${f}`,{cwd:e}),await h(`git checkout -b ${i} ${u}`,{cwd:e}),r.push(i)}catch{try{await h(`git checkout -b ${i} ${c}`,{cwd:e}),r.push(i)}catch{throw new Error(`Could not create main branch '${i}' from '${c}'. Does the source branch exist?`)}}try{await h(`git config branch.${i}.ricwiz-source "${c}"`,{cwd:e}),o.profileName&&await h(`git config branch.${i}.ricwiz-profile "${o.profileName}"`,{cwd:e})}catch{}}if(g==="all"||g==="envs"){let p=50/(a.length||1);for(let f of a){let u=`${m}-to-${f.name}`,w=f.sourceBranch;if(d.report({message:`Processing environment branch ${u}...`,increment:p}),!await ue(e,u))try{let z=o.buildUpstreamPath(w);await h(`git checkout -b ${u} ${z}`,{cwd:e}),r.push(u)}catch{try{await h(`git checkout -b ${u} ${w}`,{cwd:e}),r.push(u)}catch{throw new Error(`Could not create environment branch '${u}' from '${w}'. Does the source branch exist?`)}}}}d.report({message:`Publishing branches to ${o.originRemote}...`,increment:10});for(let p of r)try{await h(`git push -u ${o.originRemote} ${p}`,{cwd:e})}catch{D.window.showWarningMessage(`Ricwiz: Branch ${p} was created locally but could not be pushed to ${o.originRemote}.`)}if(g==="all"||g==="mainOnly"){d.report({message:`Switching to ${i}...`,increment:10});try{await h(`git checkout ${i}`,{cwd:e})}catch{}}d.report({increment:100}),D.window.showInformationMessage("Ricwiz: All set! You can start working on your branches! \u{1F680}")}catch(p){if(D.window.showErrorMessage(`Ricwiz Branch Creation Failed: ${p.message}`),r.length>0){try{await h(`git checkout ${c}`,{cwd:e})}catch{}for(let f of r)try{await h(`git branch -D ${f}`,{cwd:e})}catch{}D.window.showWarningMessage(`Ricwiz: Rolled back (deleted) ${r.length} branch(es) locally due to failure.`)}}})}catch(d){D.window.showErrorMessage(`Ricwiz general error: ${d.message}`)}}var D,Et=$(()=>{"use strict";D=v(require("vscode"));R();St();V()});async function ve(t,e,o,s){s&&s.report({message:"CONFLICT! Resolve & click 'Commit & Continue' in Ricwiz panel."});let n=!1,m=!1,a=async()=>{try{let{stdout:i}=await h("git status --porcelain",{cwd:t});return i.split(`
`).filter(d=>{let r=d.substring(0,2);return["UD","DU","DD","AU","UA"].includes(r)}).map(d=>d.substring(3).trim())}catch{return[]}},g=async()=>{try{let{stdout:i}=await h("git status --porcelain",{cwd:t}),d=r=>r==="UU"?"Both Modified":r==="UD"?"Deleted by them":r==="DU"?"Deleted by us":r==="DD"?"Both Deleted":r==="AA"?"Both Added":r==="AU"?"Added by us":r==="UA"?"Added by them":"Conflicted";return i.split(`
`).map(r=>r.trimRight()).filter(r=>r.length>2).filter(r=>{let p=r.substring(0,2);return["UU","AA","UD","DU","AU","UA","DD"].includes(p)}).map(r=>{let p=r.substring(0,2);return{file:r.substring(3).trim(),state:d(p)}})}catch{return[]}},l=async()=>{if(n)return;let i=await a(),d=await g(),{webviewProvider:r}=(qe(),W(We));r&&r.setConflictState({isConflict:!0,sourceStr:e,targetStr:o,deletionsCount:i.length,files:d})},c=ae.commands.registerCommand("ricwiz.conflictAction",async i=>{if(i==="abortDeploy")m=!0;else if(i==="resolveDeletions"){try{let r=(await a()).map(f=>({label:f})),p=await ae.window.showQuickPick(r,{canPickMany:!0,placeHolder:"Select conflicted files to DELETE",title:"Ricwiz: Delete Conflicted Files"});if(p&&p.length>0){for(let f of p)try{await h(`git rm --force "${f.label}"`,{cwd:t})}catch{}ae.window.showInformationMessage(`Ricwiz: Deleted ${p.length} conflicted file(s).`)}}catch(d){ae.window.showErrorMessage(`Ricwiz: Error. (${d.message})`)}l()}else if(i==="commitAndContinue")try{let r=(await a()).filter(f=>Mt.existsSync(Tt.join(t,f)));if(r.length>0&&await ae.window.showWarningMessage(`Wait! There are ${r.length} file(s) with deletion conflicts that are still on your disk.

If you commit now, you will KEEP them in the project.

Are you sure you want to KEEP them?`,{modal:!0},"Yes, KEEP them","No, let me DELETE them")!=="Yes, KEEP them"){l();return}let p=!1;try{let{stdout:f}=await h('git grep -E "^<<<<<<< "',{cwd:t});f.trim().length>0&&(p=!0)}catch{}if(p){ae.window.showErrorMessage("Ricwiz: You still have unresolved conflict markers (<<<<<<<) in your files. Please resolve them first!"),l();return}await h("git add .",{cwd:t}),await h("git commit --no-edit",{cwd:t})}catch(d){ae.window.showErrorMessage(`Ricwiz: Could not commit automatically. (${d.message})`),l()}});for(l();;){if(m){n=!0,c.dispose(),(qe(),W(We)).webviewProvider?.setConflictState(null);try{await h("git merge --abort",{cwd:t})}catch{}return!1}try{let{stdout:i}=await h("git status --porcelain",{cwd:t});if(i.trim().length===0)return n=!0,c.dispose(),(qe(),W(We)).webviewProvider?.setConflictState(null),ae.window.showInformationMessage("Ricwiz: Changes committed!"),!0}catch{}await new Promise(i=>setTimeout(i,2e3))}}var ae,Mt,Tt,Ge=$(()=>{"use strict";ae=v(require("vscode")),Mt=v(require("fs")),Tt=v(require("path"));R()});async function Dt(){let t=y();if(!t){U.window.showErrorMessage("Ricwiz: Open a folder or workspace that is a Git repository.");return}try{await h("git status",{cwd:t})}catch{U.window.showErrorMessage("Ricwiz: The opened folder does not appear to be a valid Git repository.");return}let e=await T.initialize(t);if(!e)return;let o=e.environments,s=await q(t,{prefix:e.ticketPrefix});if(!s){U.window.showErrorMessage("Operation cancelled: Ticket not provided.");return}let{ticketId:n,currentBranch:m}=s,a=n;if(!await ue(t,a)){U.window.showErrorMessage(`Ricwiz: Main branch '${a}' does not exist! Prepare deploy is only available when a main ticket branch is used.`);return}let g=e.getConfig("defaultReviewers",""),l="";try{let{stdout:c}=await h(`git config branch.${n}.ricwiz-reviewers`,{cwd:t});l=c.trim()}catch{}if(g.trim()){let c=await U.window.showInputBox({prompt:"Ricwiz: Reviewers for this deploy (optional, comma-separated)",placeHolder:"e.g. @joao, 123456",value:l||g,ignoreFocusOut:!0});if(c===void 0)return;try{c.trim()?await h(`git config branch.${n}.ricwiz-reviewers "${c.trim()}"`,{cwd:t}):l&&await h(`git config --unset branch.${n}.ricwiz-reviewers`,{cwd:t})}catch{}}await U.window.withProgress({location:U.ProgressLocation.Notification,title:"Ricwiz: Preparing Deploy",cancellable:!0},async(c,i)=>{let d=0,r=m,p=!1;i.onCancellationRequested(()=>{p=!0}),c.report({message:"Syncing remote information...",increment:10});try{await h("git fetch --all",{cwd:t});let u=10/(o.length||1);for(let w of o)try{if(p)throw new Error("Aborted");c.report({message:`Fetching ${w.sourceBranch}...`,increment:u});let z=e.getFetchRemote(w.sourceBranch),x=e.getFetchBranch(w.sourceBranch);await h(`git fetch ${z} ${x}:${x}`,{cwd:t})}catch{}}catch{}let f=60/(o.length||1);for(let u of o){if(p)break;let w=`${n}-to-${u.name}`,z=u.sourceBranch;try{c.report({message:`Processing ${w}...`,increment:f/4}),await h(`git checkout ${w}`,{cwd:t});try{await h(`git pull ${e.originRemote} ${w}`,{cwd:t})}catch{}let x=async se=>{try{await h(`git merge ${se}`,{cwd:t})}catch(E){let F=!1;try{let{stdout:J}=await h("git ls-files -u",{cwd:t});J.trim().length>0&&(F=!0)}catch{}let ee=((E.stdout||"")+(E.stderr||"")+(E.message||"")).toLowerCase();if(F||ee.includes("conflict")||ee.includes("conflit")){if(!await ve(t,se,w,c))throw p=!0,new Error("Deploy aborted by user.")}else throw E}};c.report({message:`Merging ${z} into ${w}...`,increment:f/4});let P=e.getFetchRemote(z),B=e.getFetchBranch(z),N=e.buildUpstreamPath(z);if(await h(`git fetch ${P} ${B}`,{cwd:t}),await x(N),c.report({message:`Merging ${a} into ${w}...`,increment:f/4}),await x(a),p)break;c.report({message:`Pushing ${w}...`,increment:f/4}),await h(`git push ${e.originRemote} ${w}`,{cwd:t}),d++}catch(x){x.message.includes("aborted")?U.window.showInformationMessage("Ricwiz: Deploy cancelled."):U.window.showErrorMessage(`Ricwiz: Failed to process branch ${w}. Detail: ${x.message}`);return}}if(!p){c.report({message:"Finishing up...",increment:10});let u=r;try{await h(`git show-ref --verify --quiet refs/heads/${a}`,{cwd:t}),u=a}catch{}try{let w=await L(t);u&&u!==w?(await h(`git checkout ${u}`,{cwd:t}),U.window.showInformationMessage(`Ricwiz: Operation complete. Back on branch ${u}.`)):U.window.showInformationMessage("Ricwiz: Operation complete.")}catch{U.window.showInformationMessage("Ricwiz: Operation complete.")}}})}var U,At=$(()=>{"use strict";U=v(require("vscode"));R();Ge();V()});async function It(t=!1){let e=y();if(!e)return;let o=await T.initialize(e);if(!o)return;let s=await q(e,{prompt:"Enter the full ticket ID for the Merge Requests (e.g., SCPSCA-1234) or just the number"});if(!s)return;let{ticketId:n}=s,m=o.getConfig("gitlabUrlOverride",""),a="";if(m&&m.trim()!=="")a=m.trim().replace(/\/+$/,"");else{let c="";try{let i=o.upstreamRemote||"origin",{stdout:d}=await h(`git remote get-url ${i}`,{cwd:e});c=d.trim()}catch{le.window.showErrorMessage("Ricwiz: Could not get the remote origin URL. Please configure the URL manually in the extension settings.");return}a=c,a.endsWith(".git")&&(a=a.slice(0,-4)),a.startsWith("git@")&&(a=a.replace("git@","").replace(":","/"),a=`https://${a}`)}let g=[],l=o.ticketSourceBranch;try{let{stdout:c}=await h(`git config branch.${n}.ricwiz-source`,{cwd:e});c.trim()&&(l=c.trim())}catch{}if(o.environments.length===0)g.push({source:n,target:l});else for(let c of o.environments)g.push({source:`${n}-to-${c.name}`,target:c.sourceBranch});for(let c of g){let i=`${a}/-/merge_requests/new?merge_request[source_branch]=${c.source}&merge_request[target_branch]=${c.target}`;t?le.commands.executeCommand("simpleBrowser.show",i):le.env.openExternal(le.Uri.parse(i))}le.window.showInformationMessage(`Ricwiz: Opening ${t?"VS Code browser":"external browser"} for Merge Requests!`)}async function Lt(){return It(!1)}async function Ft(){return It(!0)}var le,Ot=$(()=>{"use strict";le=v(require("vscode"));R();V()});async function Nt(t=!1){let e=y();if(!e)return;let o=te.workspace.getConfiguration("ricwiz"),s=o.get("jiraUrl","");if(!s||s.trim()===""){te.window.showErrorMessage("Ricwiz: Jira URL is not configured. Please set it in the extension settings (e.g., https://jira.company.com/browse/).");return}let{getCurrentBranch:n,resolvePrefix:m,extractTicketSuggestion:a}=(R(),W(Be)),g=await n(e),l=o.get("ticketPrefix","SFPSCA-"),c=m(g,l),d=a(g,c,!0);if(d){let{normalizeTicketId:p}=(R(),W(Be));d=p(d,c)}else{let p=await q(e,{prompt:"Ricwiz could not detect the ticket from the branch name. Enter Jira ticket ID (e.g. SFPSCA-1234)",handleToSuffix:!0});if(!p)return;d=p.ticketId}let r=s.trim();r.endsWith("/")||(r+="/"),r+=d,t?te.commands.executeCommand("simpleBrowser.show",r):te.env.openExternal(te.Uri.parse(r)),te.window.showInformationMessage(`Ricwiz: Opening Jira Ticket ${d} in ${t?"VS Code":"browser"}!`)}async function Ut(){return Nt(!1)}async function jt(){return Nt(!0)}var te,Jt=$(()=>{"use strict";te=v(require("vscode"));R()});async function ri(){let t=qt.workspace.getConfiguration("ricwiz"),e=t.get("jiraUrl",""),o=t.get("jiraEmail","")?.trim(),s=(await ht())?.trim();if(!e||!s)throw new Error('Jira API Token is not securely configured. Please run the "Ricwiz: Set Secure Jira API Token" command.');let n=e;n.includes("/browse")&&(n=n.split("/browse")[0]),n.endsWith("/")&&(n=n.slice(0,-1));let m=o?`Basic ${Buffer.from(`${o}:${s}`).toString("base64")}`:`Bearer ${s}`;return{baseUrl:n,headerAuth:m}}async function $e(t,e,o){let{baseUrl:s,headerAuth:n}=await ri(),m=new URL(`${s}${e}`);return new Promise((a,g)=>{let l=Wt.request(m,{method:t,headers:{Authorization:n,Accept:"application/json",...o?{"Content-Type":"application/json"}:{}}},c=>{let i="";c.on("data",d=>i+=d),c.on("end",()=>{if(c.statusCode===401||c.statusCode===403)return g(new Error(`Authentication failed (HTTP ${c.statusCode}). Please check your Jira settings.`));if(c.statusCode&&c.statusCode>=400){let d="";try{let r=JSON.parse(i);r.errorMessages&&r.errorMessages.length>0&&(d=r.errorMessages.join(", "))}catch{}return c.statusCode===404||c.statusCode===410?g(new Error(`Ticket not found or deleted (HTTP ${c.statusCode}). ${d}`)):g(new Error(`Jira API returned HTTP status ${c.statusCode}. ${d}`))}if(!i)return a({});try{let d=JSON.parse(i);a(d)}catch{g(new Error("Failed to parse Jira response."))}})});l.on("error",c=>g(new Error(`Network error: ${c.message}`))),o&&l.write(JSON.stringify(o)),l.end()})}async function ze(t){let e=await $e("GET",`/rest/api/2/issue/${t}`);return e&&e.fields?{summary:e.fields.summary||"",description:e.fields.description||"No description provided.",status:e.fields.status?.name||"Unknown"}:null}async function Gt(t){let e=await $e("GET",`/rest/api/2/issue/${t}/transitions`);return e&&e.transitions?e.transitions.map(o=>({id:o.id,name:o.name})):[]}async function Ht(t,e){await $e("POST",`/rest/api/2/issue/${t}/transitions`,{transition:{id:e}})}async function Vt(t,e){await $e("POST",`/rest/api/2/issue/${t}/comment`,{body:e})}async function _t(t,e){await $e("PUT",`/rest/api/2/issue/${t}`,{update:{labels:[{add:e}]}})}async function Qt(t){let e=await $e("POST","/rest/api/3/search/jql",{jql:t,maxResults:50,fields:["summary","status","assignee"]});return e&&e.issues?e.issues.map(o=>({key:o.key,summary:o.fields?.summary||"No Title",status:o.fields?.status?.name||"Unknown",assignee:o.fields?.assignee?.displayName||"Unassigned"})):[]}var Wt,qt,Ee=$(()=>{"use strict";Wt=v(require("https")),qt=v(require("vscode"));ke()});async function tt(){let t=await Ke();return!!(t&&t.trim())}async function to(t,e){let o=eo.workspace.getConfiguration("ricwiz"),s=(await Ke())?.trim();if(!s)throw new Error("No GitLab token");let n=e?e.getConfig("gitlabUrlOverride",""):o.get("gitlabUrlOverride","");if(!n||n.trim()==="")if(et)n=et;else try{let l=e&&e.upstreamRemote?e.upstreamRemote:"origin",{stdout:c}=await h(`git remote get-url ${l}`,{cwd:t}),i=c.trim();i.endsWith(".git")&&(i=i.slice(0,-4)),i.startsWith("git@")&&(i=i.replace("git@","").replace(":","/"),i=`https://${i}`),n=i,et=n}catch{throw new Error("Could not get remote origin URL.")}let m=new URL(n),a=`${m.protocol}//${m.host}`,g=Yt[t];if(!g){let l=m.pathname;l.startsWith("/")&&(l=l.substring(1)),l.endsWith("/")&&(l=l.slice(0,-1)),l.endsWith(".git")&&(l=l.slice(0,-4)),g=encodeURIComponent(l),Yt[t]=g}return{baseUrl:a,token:s,projectPath:g}}async function Zt(t,e,o,s){let{baseUrl:n,token:m}=await to(t,s),a=new URL(`${n}${o}`);return new Promise((g,l)=>{let c=Xt.request(a,{method:e,timeout:5e3,headers:{"PRIVATE-TOKEN":m,Accept:"application/json"}},i=>{let d="";i.on("data",r=>d+=r),i.on("end",()=>{if(i.statusCode&&i.statusCode>=400)return l(new Error(`GitLab API error: ${i.statusCode}`));if(!d)return g({});try{let r=JSON.parse(d);g(r)}catch{l(new Error("Failed to parse GitLab response."))}})});c.on("timeout",()=>{c.destroy(),l(new Error("GitLab request timed out"))}),c.on("error",i=>l(new Error(`Network error: ${i.message}`))),c.end()})}async function ot(t,e,o,s){let n=`${t}:${e}:${o||"any"}`,m=Kt.get(n);if(m&&Date.now()-m.timestamp<ai)return m.data;try{let{projectPath:a}=await to(t,s),g=`/api/v4/projects/${a}/merge_requests?source_branch=${encodeURIComponent(e)}&order_by=updated_at&sort=desc`;o&&(g+=`&target_branch=${encodeURIComponent(o)}`);let l=await Zt(t,"GET",g,s);if(l&&l.length>0){let c=l[0];try{let r=await Zt(t,"GET",`/api/v4/projects/${a}/merge_requests/${c.iid}`,s);r&&(c=r)}catch{}let i="none";if(c.head_pipeline&&c.head_pipeline.status){let r=c.head_pipeline.status;r==="success"||r==="failed"||r==="canceled"||r==="skipped"?i=r:i="running"}let d={isMerged:c.state==="merged",isOpen:c.state==="opened",pipelineStatus:i,webUrl:c.web_url};return Kt.set(n,{data:d,timestamp:Date.now()}),d}return null}catch{return null}}var Xt,eo,Yt,et,Kt,ai,oo=$(()=>{"use strict";Xt=v(require("https")),eo=v(require("vscode"));ke();R();Yt={},et=null;Kt=new Map,ai=30*1e3});var He={};Ne(He,{findRelatedBranches:()=>at,getCurrentBranchMergeStatus:()=>nt,getRecentCommits:()=>st,getRecentTickets:()=>rt,getRelatedBranchesStatus:()=>it});function io(t,e){return e.find(o=>t.endsWith(`-to-${o.name}`))}async function it(t,e,o,s,n){let m=await tt();return await Promise.all(e.map(async g=>{let l=io(g,s);if(m){let c=l?l.sourceBranch:void 0,i=await ot(t,g,c,n);if(i)return{name:g,isMerged:i.isMerged,pipelineStatus:i.pipelineStatus,mrUrl:i.webUrl}}return{name:g,isMerged:!1}}))}async function nt(t,e,o,s){let n=io(e,o);if(!n)return!1;if(await tt()){let m=await ot(t,e,n.sourceBranch,s);if(m)return m.isMerged}return!1}async function st(t,e=10){try{let{stdout:o}=await h(`git log --oneline -${e} --format="%h|||%s|||%ar"`,{cwd:t});return o.split(`
`).filter(s=>s.trim()).map(s=>{let n=s.split("|||");return{hash:n[0]||"",message:n.length>=3?n.slice(1,-1).join("|||"):n[1]||"",timeAgo:n.length>=3?n[n.length-1]:""}})}catch{return[]}}async function rt(t,e=3){try{let{stdout:o}=await h('git for-each-ref --sort=-committerdate --format="%(refname:short)" refs/heads/',{cwd:t}),s=o.split(`
`).map(m=>m.trim()).filter(m=>m),n=/^[A-Z]+-\d+$/i;return s.filter(m=>n.test(m)).slice(0,e)}catch{return[]}}async function at(t,e,o){let{stdout:s}=await h(`git branch --all --list "*${e}*"`,{cwd:t}),n=new Set;return s.split(`
`).forEach(m=>{let a=m.replace("*","").trim();if(a){if(a.startsWith("remotes/")){let g=a.split("/");g.length>2&&(a=g.slice(2).join("/"))}a&&a!==o&&!a.includes("HEAD")&&n.add(a)}}),Array.from(n)}var Me=$(()=>{"use strict";R();oo()});async function no(t){let e=y();if(e)try{if(!await T.initialize(e))return;let n=(await L(e)).split("-to-")[0];if(!n){_.window.showErrorMessage("Ricwiz: You are not currently on a valid ticket branch.");return}await _.window.withProgress({location:_.ProgressLocation.Notification,title:`Fetching details for ${n}...`,cancellable:!1},async m=>{let a=await ze(n);if(a){let g=[];try{let{findRelatedBranches:l,getRelatedBranchesStatus:c}=(Me(),W(He)),{WorkflowContext:i}=(V(),W(Xe)),d=await i.initialize(e,{skipPrompt:!0,ticketId:n}),r=d?.environments||_.workspace.getConfiguration("ricwiz").get("environments",[{name:"Qual",sourceBranch:"quality"},{name:"Val",sourceBranch:"validation"},{name:"Prod",sourceBranch:"main"}]),p=await l(e,n,"");g=await c(e,p,n,r,d)}catch{}t.setJiraData({ticketId:n,relatedBranches:g,...a}),t.setPage("jira")}else _.window.showErrorMessage("Ricwiz: No data found for this ticket.")})}catch(o){o.message.includes("securely configured")?await _.window.showErrorMessage(o.message,"Set Token Now")==="Set Token Now"&&_.commands.executeCommand("ricwiz.setJiraToken"):_.window.showErrorMessage(`Ricwiz Jira Error: ${o.message}`)}}var _,so=$(()=>{"use strict";_=v(require("vscode"));R();V();Ee()});async function ro(t,e){let s=oe.workspace.getConfiguration("ricwiz").get("jiraDashboards",[]);if(e!==void 0&&(ye=e),!s||s.length===0){t.setDashboardData({queries:[],selectedIndex:0,results:[],error:"No queries defined in settings. Go to Settings > Ricwiz > Jira Dashboards."}),t.setPage("dashboard");return}ye>=s.length&&(ye=0);let n=s[ye];t.setDashboardData({queries:s,selectedIndex:ye,results:[],error:"\u23F3 Loading tickets..."}),t.setPage("dashboard");try{let m=await Qt(n.jql),a=oe.workspace.workspaceFolders?.[0]?.uri.fsPath,g=[],l=t.getDashboardShowBranches();if(a)try{let i=require("child_process"),r=require("util").promisify(i.exec),{stdout:p}=await r("git branch",{cwd:a});g=p.split(`
`).map(f=>f.replace("*","").trim()).filter(f=>f)}catch{}let c=[];if(l&&a)try{let{findRelatedBranches:i,getRelatedBranchesStatus:d}=(Me(),W(He)),{WorkflowContext:r}=(V(),W(Xe));c=await Promise.all(m.map(async p=>{let f=await r.initialize(a,{skipPrompt:!0,ticketId:p.key}),u=f?.environments||oe.workspace.getConfiguration("ricwiz").get("environments",[{name:"Qual",sourceBranch:"quality"},{name:"Val",sourceBranch:"validation"},{name:"Prod",sourceBranch:"main"}]),w=await i(a,p.key,""),z=await d(a,w,p.key,u,f);return{...p,detailedBranches:z}}))}catch{c=m}else c=m.map(i=>{let d=g.find(r=>r.includes(i.key));return{...i,branch:d||null}});t.setDashboardData({queries:s,selectedIndex:ye,results:c,error:null}),t.setPage("dashboard")}catch(m){let a=m.message;(a.includes("ENOTFOUND")||a.includes("network"))&&(a="No Internet or Invalid URL"),t.setDashboardData({queries:s,selectedIndex:ye,results:[],error:a}),t.setPage("dashboard")}}async function ao(t,e){await oe.window.withProgress({location:oe.ProgressLocation.Notification,title:`Fetching details for ${e}...`,cancellable:!1},async()=>{try{let o=await ze(e);if(o){let s=[],n=y();if(n)try{let{findRelatedBranches:m,getRelatedBranchesStatus:a}=(Me(),W(He)),g=oe.workspace.getConfiguration("ricwiz").get("environments",[{name:"Qual",sourceBranch:"quality"},{name:"Val",sourceBranch:"validation"},{name:"Prod",sourceBranch:"main"}]),l=await m(n,e,"");s=await a(n,l,e,g)}catch{}t.setJiraData({ticketId:e,relatedBranches:s,...o}),t.setPage("jira")}else oe.window.showErrorMessage(`Ricwiz: No data found for ticket ${e}.`)}catch(o){oe.window.showErrorMessage(`Ricwiz Jira Error: ${o.message}`)}})}var oe,ye,co=$(()=>{"use strict";oe=v(require("vscode"));Ee();R();ye=0});async function ct(){let t=y();return!t||!await T.initialize(t,{forcePrompt:!1})?void 0:(await L(t)).split("-to-")[0]}async function lo(){try{let t=await ct();if(!t){S.window.showErrorMessage("Ricwiz: You are not on a valid ticket branch.");return}let e=await S.window.withProgress({location:S.ProgressLocation.Notification,title:`Fetching available status for ${t}...`,cancellable:!1},()=>Gt(t));if(!e||e.length===0){S.window.showInformationMessage(`Ricwiz: No transitions available for ${t}.`);return}let o=e.map(n=>({label:n.name,id:n.id})),s=await S.window.showQuickPick(o,{placeHolder:`Select new status for ${t}`,ignoreFocusOut:!0});s&&(await S.window.withProgress({location:S.ProgressLocation.Notification,title:`Updating status to ${s.label}...`,cancellable:!1},()=>Ht(t,s.id)),S.window.showInformationMessage(`Ricwiz: Status for ${t} updated to ${s.label}.`))}catch(t){t.message.includes("securely configured")?S.window.showErrorMessage(t.message,"Set Token Now").then(e=>{e==="Set Token Now"&&S.commands.executeCommand("ricwiz.setJiraToken")}):S.window.showErrorMessage(`Ricwiz Jira Error: ${t.message}`)}}async function mo(){try{let t=await ct();if(!t){S.window.showErrorMessage("Ricwiz: You are not on a valid ticket branch.");return}let e=await S.window.showInputBox({prompt:`Add comment to ${t}`,placeHolder:"Type your comment here...",ignoreFocusOut:!0});e&&(await S.window.withProgress({location:S.ProgressLocation.Notification,title:`Adding comment to ${t}...`,cancellable:!1},()=>Vt(t,e)),S.window.showInformationMessage(`Ricwiz: Comment added to ${t}.`))}catch(t){t.message.includes("securely configured")?S.window.showErrorMessage(t.message,"Set Token Now").then(e=>{e==="Set Token Now"&&S.commands.executeCommand("ricwiz.setJiraToken")}):S.window.showErrorMessage(`Ricwiz Jira Error: ${t.message}`)}}async function po(){try{let t=await ct();if(!t){S.window.showErrorMessage("Ricwiz: You are not on a valid ticket branch.");return}let e=await S.window.showInputBox({prompt:`Add a label to ${t}`,placeHolder:"e.g. Needs-Review, Bug, High-Priority",ignoreFocusOut:!0});e&&e.trim()&&(await S.window.withProgress({location:S.ProgressLocation.Notification,title:`Adding label to ${t}...`,cancellable:!1},()=>_t(t,e.trim())),S.window.showInformationMessage(`Ricwiz: Label '${e.trim()}' added to ${t}.`))}catch(t){t.message.includes("securely configured")?S.window.showErrorMessage(t.message,"Set Token Now").then(e=>{e==="Set Token Now"&&S.commands.executeCommand("ricwiz.setJiraToken")}):S.window.showErrorMessage(`Ricwiz Jira Error: ${t.message}`)}}async function uo(){let t=await S.window.showInputBox({prompt:"Enter your Jira API Token (or Personal Access Token). It will be securely stored in your OS keychain.",password:!0,ignoreFocusOut:!0});if(t)try{await ft(t.trim()),S.window.showInformationMessage("Ricwiz: Jira API Token securely stored!")}catch(e){S.window.showErrorMessage(`Ricwiz: Failed to store token: ${e.message}`)}}var S,go=$(()=>{"use strict";S=v(require("vscode"));R();V();Ee();ke()});async function fo(){let t=await H.window.showInputBox({prompt:"Enter your GitLab Personal Access Token",placeHolder:"glpat-xxxxxxxxxxxxxxxxxxxx",ignoreFocusOut:!0,password:!0});if(t&&t.trim()){let e=t.trim();await H.window.withProgress({location:H.ProgressLocation.Notification,title:"Ricwiz: Validating GitLab Token...",cancellable:!1},async()=>{try{let s=H.workspace.getConfiguration("ricwiz").get("gitlabUrlOverride","").trim();if(!s&&H.workspace.workspaceFolders)try{let{exec:l}=(R(),W(Be)),c=H.workspace.workspaceFolders[0].uri.fsPath,{stdout:i}=await l("git remote get-url origin",{cwd:c}),d=i.trim();d.startsWith("git@")&&(d=`https://${d.replace("git@","").replace(":","/")}`),d.endsWith(".git")&&(d=d.slice(0,-4)),s=d}catch{}s||(s="https://gitlab.com");let n=new URL(s),m=`${n.protocol}//${n.host}`,a=require("https"),g=await new Promise((l,c)=>{let i=a.request(new URL(`${m}/api/v4/user`),{method:"GET",timeout:5e3,headers:{"PRIVATE-TOKEN":e,Accept:"application/json"}},d=>{if(d.statusCode>=400)return c(new Error(`Status ${d.statusCode}`));let r="";d.on("data",p=>r+=p),d.on("end",()=>l(JSON.parse(r||"{}")))});i.on("error",c),i.on("timeout",()=>{i.destroy(),c(new Error("Timeout"))}),i.end()});await wt(e),H.window.showInformationMessage(`Ricwiz: \u2705 GitLab API Token saved and validated successfully for ${g.username||"user"}!`),H.commands.executeCommand("ricwiz.manualRefresh")}catch(o){H.window.showErrorMessage(`Ricwiz: \u274C Invalid token or cannot reach GitLab (${o.message}). Please check the token and try again.`)}})}}var H,ho=$(()=>{"use strict";H=v(require("vscode"));ke()});async function wo(){let t=y();if(!t){me.window.showErrorMessage("Ricwiz: Open a folder or workspace that is a Git repository.");return}let e=await T.initialize(t);if(!e)return;let o=await q(t,{prefix:e.ticketPrefix,prompt:"Enter the full ticket ID to sync all branches for (e.g., SCPSCA-1234) or just the number"});if(!o)return;let{ticketId:s,currentBranch:n}=o;await me.window.withProgress({location:me.ProgressLocation.Notification,title:`Ricwiz: Syncing all branches for ${s}...`,cancellable:!1},async m=>{try{m.report({message:"Fetching from remote..."});try{await h("git fetch --all",{cwd:t})}catch{}let{stdout:a}=await h(`git branch --list "*${s}*"`,{cwd:t}),g=a.split(`
`).map(i=>i.replace("*","").trim()).filter(i=>i.length>0);if(g.length===0){me.window.showWarningMessage(`Ricwiz: No local branches found for ${s}.`);return}let l=0,c=0;for(let i of g)if(m.report({message:`Syncing ${i}...`}),i===n)try{await h(`git pull ${e.originRemote} ${i}`,{cwd:t}),l++}catch(d){let r=!1;try{let{stdout:f}=await h("git ls-files -u",{cwd:t});f.trim().length>0&&(r=!0)}catch{}let p=((d.stdout||"")+(d.stderr||"")+(d.message||"")).toLowerCase();(r||p.includes("conflict")||p.includes("conflit"))&&await ve(t,`${e.originRemote}/${i}`,i,m)?l++:c++}else try{await h(`git fetch ${e.originRemote} ${i}:${i}`,{cwd:t}),l++}catch{try{await h(`git checkout ${i}`,{cwd:t});try{await h(`git pull ${e.originRemote} ${i}`,{cwd:t}),l++}catch(r){let p=!1;try{let{stdout:u}=await h("git ls-files -u",{cwd:t});u.trim().length>0&&(p=!0)}catch{}let f=((r.stdout||"")+(r.stderr||"")+(r.message||"")).toLowerCase();(p||f.includes("conflict")||f.includes("conflit"))&&await ve(t,`${e.originRemote}/${i}`,i,m)?l++:c++}await h(`git checkout ${n}`,{cwd:t})}catch{try{await h(`git checkout ${n}`,{cwd:t})}catch{}c++}}c>0?me.window.showWarningMessage(`Ricwiz: Synced ${l}/${g.length} branches. ${c} branch(es) could not be synced (possible conflicts or diverged history).`):me.window.showInformationMessage(`Ricwiz: \u{1F504} All ${l} branches for ${s} are up to date!`)}catch(a){me.window.showErrorMessage(`Ricwiz: Sync failed: ${a.message}`)}})}var me,vo=$(()=>{"use strict";me=v(require("vscode"));R();Ge();V()});async function yo(){let t=y();if(!t){pe.window.showErrorMessage("Ricwiz: Open a folder or workspace that is a Git repository.");return}try{await h("git status",{cwd:t})}catch{pe.window.showErrorMessage("Ricwiz: The opened folder does not appear to be a valid Git repository.");return}let e=await T.initialize(t);if(!e)return;let o=e.environments,s=await q(t,{prefix:e.ticketPrefix});if(!s)return;let{ticketId:n,currentBranch:m}=s;await pe.window.withProgress({location:pe.ProgressLocation.Notification,title:"Ricwiz: Updating environment branches from their bases",cancellable:!0},async(a,g)=>{let l=0,c=m,i=!1;g.onCancellationRequested(()=>{i=!0}),a.report({message:"Syncing remote information...",increment:10});try{await h("git fetch --all",{cwd:t})}catch{}let d=80/(o.length||1);for(let r of o){if(i)break;let p=`${n}-to-${r.name}`,f=r.sourceBranch;if(await ue(t,p))try{a.report({message:`Processing ${p}...`,increment:d/2}),await h(`git checkout ${p}`,{cwd:t});try{a.report({message:`Merging ${f} into ${p}...`,increment:d/2});let u=e.getFetchRemote(f),w=e.getFetchBranch(f),z=e.buildUpstreamPath(f);await h(`git fetch ${u} ${w}`,{cwd:t}),await h(`git merge ${z}`,{cwd:t})}catch(u){let w=!1;try{let{stdout:x}=await h("git ls-files -u",{cwd:t});x.trim().length>0&&(w=!0)}catch{}let z=((u.stdout||"")+(u.stderr||"")+(u.message||"")).toLowerCase();if(w||z.includes("conflict")||z.includes("conflit")){let x=e.buildUpstreamPath(f);if(!await ve(t,x,p,a))throw i=!0,new Error("Update aborted by user.")}else throw u}if(i)break;l++}catch(u){u.message.includes("aborted")?pe.window.showInformationMessage("Ricwiz: Update cancelled."):pe.window.showErrorMessage(`Ricwiz: Failed to update branch ${p}. Detail: ${u.message}`);return}}if(!i){a.report({message:"Finishing up...",increment:10});try{let r=await L(t);c&&c!==r&&await h(`git checkout ${c}`,{cwd:t})}catch{}pe.window.showInformationMessage(`Ricwiz: Successfully updated ${l} environment branches from their bases!`)}})}var pe,bo=$(()=>{"use strict";pe=v(require("vscode"));R();Ge();V()});async function xo(){let t=y();if(!t){O.window.showErrorMessage("Ricwiz: Open a folder or workspace that is a Git repository.");return}let e=await L(t),o=O.workspace.getConfiguration("ricwiz");await O.window.withProgress({location:O.ProgressLocation.Notification,title:"Ricwiz: Scanning for unused local branches...",cancellable:!1},async()=>{try{await h("git fetch --prune",{cwd:t})}catch{}let s=[];try{let{stdout:d}=await h('git branch --format="%(refname:short)"',{cwd:t});s=d.split(`
`).map(r=>r.trim()).filter(r=>r.length>0)}catch{}if(s.length===0){O.window.showInformationMessage("Ricwiz: No local branches found.");return}let n=[];try{let{stdout:d}=await h('git branch -r --format="%(refname:short)"',{cwd:t});n=d.split(`
`).map(r=>r.trim().replace(/^origin\//,"").replace(/^[^\/]+\//,"")).filter(r=>r.length>0&&!r.includes("HEAD"))}catch{}let m=[];try{let{stdout:d}=await h('git for-each-ref --format="%(refname:short)|||%(upstream:track)" refs/heads/',{cwd:t});m=d.split(`
`).filter(r=>r.includes("[gone]")).map(r=>r.split("|||")[0].trim())}catch{}let a=s.filter(d=>!n.includes(d));if(a.length===0){O.window.showInformationMessage("Ricwiz: Your local repository is totally clean! All local branches exist on the remote.");return}let g=a.map(d=>{let r=m.includes(d),p=d===e,f="Not found on remote";return r&&(f="Deleted on remote [gone]"),p&&(f+=" (Current branch - will checkout main first)"),{label:d,description:f,picked:r&&!p}}),l=await O.window.showQuickPick(g,{canPickMany:!0,placeHolder:"Select local branches to delete",title:"Ricwiz: Delete Unused Branches"});if(!l||l.length===0){O.window.showInformationMessage("Ricwiz: No branches selected for deletion.");return}if(await O.window.showWarningMessage(`Ricwiz: Delete ${l.length} local branch(es)?
This cannot be undone!`,{modal:!0},"Yes, delete them")!=="Yes, delete them"){O.window.showInformationMessage("Ricwiz: Deletion cancelled.");return}let i=0;for(let d of l){let r=d.label;if(r===e){let p=o.get("ticketSourceBranch","main");try{await h(`git checkout ${p}`,{cwd:t}),e=p}catch{O.window.showWarningMessage(`Ricwiz: Could not switch away from ${r}. Skipping.`);continue}}try{await h(`git branch -D ${r}`,{cwd:t}),i++}catch{O.window.showWarningMessage(`Ricwiz: Could not delete local branch ${r}.`)}}O.window.showInformationMessage(`Ricwiz: \u{1F5D1}\uFE0F Cleaned up ${i} unused local branch(es).`)})}var O,ko=$(()=>{"use strict";O=v(require("vscode"));R()});async function Re(t){let e=y();e&&await ie.window.withProgress({location:ie.ProgressLocation.Notification,title:`Ricwiz: Switching to ${t}...`,cancellable:!1},async()=>{try{let o=await L(e),s=!1;try{let{stdout:m}=await h("git status --porcelain",{cwd:e});s=m.trim().length>0}catch{}if(s&&o)try{await h(`git stash push --include-untracked -m "ricwiz-auto:${o}"`,{cwd:e}),ie.window.showInformationMessage(`Ricwiz: \u{1F4E6} Stashed changes from ${o}`)}catch{ie.window.showWarningMessage("Ricwiz: Could not stash changes. Checkout may fail if there are conflicts.")}let n=t;t.includes("/")&&(n=t.split("/").slice(1).join("/"));try{await h(`git checkout ${n}`,{cwd:e})}catch{let a="";if(t.includes("/"))a=t.split("/")[0];else{let{stdout:g}=await h("git branch -r",{cwd:e}),l=g.split(`
`).map(i=>i.trim()).filter(i=>i),c=[];for(let i of l){let d=i.split(" ")[0];d.endsWith(`/${n}`)&&c.push(d.substring(0,d.lastIndexOf("/")))}if(c.length===0){ie.window.showErrorMessage(`Ricwiz: A branch "${n}" n\xE3o existe localmente nem em nenhuma remote!`);return}else if(c.length===1)a=c[0];else{let i=await T.initialize(e);c.includes("origin")?a="origin":i&&c.includes(i.upstreamRemote)?a=i.upstreamRemote:a=c[0]}}try{await h(`git fetch ${a} ${n}`,{cwd:e}),await h(`git checkout -b ${n} --track ${a}/${n}`,{cwd:e})}catch{ie.window.showErrorMessage(`Ricwiz: Encontrou na remote ${a} mas falhou a fazer checkout.`);return}}try{let{stdout:m}=await h("git stash list",{cwd:e}),a=m.split(`
`);for(let g=0;g<a.length;g++)if(a[g].includes(`ricwiz-auto:${n}`)){let l=a[g].match(/stash@\{(\d+)\}/);l&&(await h(`git stash pop stash@{${l[1]}}`,{cwd:e}),ie.window.showInformationMessage(`Ricwiz: \u{1F4E6} Restored stashed changes on ${n}`));break}}catch{ie.window.showWarningMessage(`Ricwiz: Could not restore stashed changes on ${n}. You may need to resolve conflicts manually (check git stash list).`)}}catch{ie.window.showErrorMessage(`Ricwiz: Could not checkout branch ${t}.`)}})}var ie,Ve=$(()=>{"use strict";ie=v(require("vscode"));R();V()});async function Co(){let t=y();if(t)try{let{stdout:e}=await h("git branch --show-current",{cwd:t}),o=e.trim();o&&(await Te.env.clipboard.writeText(o),Te.window.showInformationMessage(`Ricwiz: \u{1F4CB} Copied "${o}" to clipboard`))}catch{Te.window.showErrorMessage("Ricwiz: Could not get the current branch name.")}}var Te,$o=$(()=>{"use strict";Te=v(require("vscode"));R()});async function Ro(){let t=y();if(!t){Q.window.showErrorMessage("Ricwiz: Open a folder or workspace that is a Git repository.");return}let e=Q.workspace.getConfiguration("ricwiz"),o=e.get("ticketSourceBranch","main"),n=e.get("packageXmlCommand",'sf sgd source delta --to "HEAD" --from "origin/{baseBranch}" --output-dir "."').replace("{baseBranch}",o);await Q.window.showWarningMessage("Are you sure you want to generate the package.xml? This may overwrite existing local manifest files.",{modal:!0},"Yes, Generate")==="Yes, Generate"&&await Q.window.withProgress({location:Q.ProgressLocation.Notification,title:"Ricwiz: Generating package.xml using Salesforce CLI...",cancellable:!1},async()=>{try{await h(n,{cwd:t,maxBuffer:10*1024*1024}),Q.window.showInformationMessage("Ricwiz: Successfully generated package.xml!");let a=_e.join(t,"package","package.xml"),g=_e.join(t,"package.xml"),l=_e.join(t,"manifest","package.xml");for(let c of[a,g,l])if(zo.existsSync(c)){let i=await Q.workspace.openTextDocument(c);await Q.window.showTextDocument(i);break}}catch(a){Q.window.showErrorMessage(`Ricwiz: Error running sf command - ${a.message}`)}})}var Q,_e,zo,So=$(()=>{"use strict";Q=v(require("vscode")),_e=v(require("path")),zo=v(require("fs"));R()});async function Bo(){let t=y();if(!t){Y.window.showErrorMessage("Ricwiz: Open a folder or workspace that is a Git repository.");return}let o=Y.workspace.getConfiguration("ricwiz").get("deployCommand","sf project deploy start --manifest package/package.xml --post-destructive-changes destructiveChanges/destructiveChanges.xml -c -l NoTestRun -g");await Y.window.showWarningMessage("Are you sure you want to deploy to Salesforce? This action modifies your org and cannot be easily undone.",{modal:!0},"Yes, Deploy")==="Yes, Deploy"&&await Y.window.withProgress({location:Y.ProgressLocation.Notification,title:"Ricwiz: Deploying package...",cancellable:!1},async()=>{try{let{stdout:n,stderr:m}=await h(o,{cwd:t,maxBuffer:52428800}),a=Y.window.createOutputChannel("Ricwiz Deploy");a.appendLine(`Executing: ${o}`),a.appendLine(n),m&&(a.appendLine("--- STDERR ---"),a.appendLine(m)),a.show(),Y.window.showInformationMessage("Ricwiz: Successfully ran deploy command!")}catch(n){let m=Y.window.createOutputChannel("Ricwiz Deploy");m.appendLine(`Error executing: ${o}`),n.stdout&&m.appendLine(n.stdout),n.stderr&&m.appendLine(n.stderr),m.appendLine(n.message),m.show(),Y.window.showErrorMessage("Ricwiz: Error running deploy command. See output channel for details.")}})}var Y,Po=$(()=>{"use strict";Y=v(require("vscode"));R()});async function Eo(){let t=y();if(!t){Z.window.showErrorMessage("Ricwiz: Open a folder or workspace that is a Git repository.");return}let o=Z.workspace.getConfiguration("ricwiz").get("importDataCommand","sfdx force:data:tree:import --plan data/plan.json");await Z.window.showWarningMessage("Are you sure you want to import data into Salesforce? This action modifies records in your org.",{modal:!0},"Yes, Import")==="Yes, Import"&&await Z.window.withProgress({location:Z.ProgressLocation.Notification,title:"Ricwiz: Importing data...",cancellable:!1},async()=>{try{let{stdout:n,stderr:m}=await h(o,{cwd:t,maxBuffer:52428800}),a=Z.window.createOutputChannel("Ricwiz Import Data");a.appendLine(`Executing: ${o}`),a.appendLine(n),m&&(a.appendLine("--- STDERR ---"),a.appendLine(m)),a.show(),Z.window.showInformationMessage("Ricwiz: Successfully ran import data command!")}catch(n){let m=Z.window.createOutputChannel("Ricwiz Import Data");m.appendLine(`Error executing: ${o}`),n.stdout&&m.appendLine(n.stdout),n.stderr&&m.appendLine(n.stderr),m.appendLine(n.message),m.show(),Z.window.showErrorMessage("Ricwiz: Error running import data command. See output channel for details.")}})}var Z,Mo=$(()=>{"use strict";Z=v(require("vscode"));R()});async function To(){let t=y();if(!t){K.window.showErrorMessage("Ricwiz: Open a folder or workspace that is a Git repository.");return}let e="";try{e=await L(t)}catch{}let s=K.workspace.getConfiguration("ricwiz").get("ticketSourceBranch","main"),n=await K.window.showInputBox({prompt:`Enter the branch name to list modified files (compared to ${s})`,value:e,placeHolder:"SFPSCA-1234"});n&&await K.window.withProgress({location:K.ProgressLocation.Notification,title:`Ricwiz: Finding files for ${n}...`,cancellable:!1},async()=>{try{let m=n.replace(/-to-[a-zA-Z0-9]+$/i,""),a=[];try{let f="";try{let{stdout:u}=await h(`git merge-base origin/${s} ${n}`,{cwd:t});f=u.trim()}catch{let{stdout:u}=await h(`git merge-base ${s} ${n}`,{cwd:t});f=u.trim()}if(f){let{stdout:u}=await h(`git diff --name-only ${f} ${n}`,{cwd:t,maxBuffer:10485760});a=u.split(`
`).map(w=>w.trim()).filter(w=>w.length>0)}}catch{}let g=[];try{let{stdout:f}=await h(`git --no-pager log --grep="\\b${m}\\b" -i -E --name-only -m --first-parent --format=""`,{cwd:t,maxBuffer:10485760});g=f.split(`
`).map(u=>u.trim()).filter(u=>u.length>0)}catch{}let l=[...a,...g];if(l.length===0){K.window.showInformationMessage(`Ricwiz: No modified files found for ${n}.`);return}let c=Array.from(new Set(l)).sort(),i={};for(let f of c){let u=f.match(/default\/([^/]+)/),w=u&&u[1]?u[1].toUpperCase():"OUTROS";i[w]||(i[w]=[]),i[w].push(f)}let d=`Files modified in branch ${n}:
`,r=Object.keys(i).sort();for(let f of r)d+=`
=== ${f} ===
`,d+=i[f].join(`
`)+`
`;let p=await K.workspace.openTextDocument({content:d,language:"plaintext"});await K.window.showTextDocument(p)}catch(m){K.window.showErrorMessage(`Ricwiz: Error running git log - ${m.message}`)}})}var K,Do=$(()=>{"use strict";K=v(require("vscode"));R()});async function Ao(){let t=y();if(!t){ne.window.showErrorMessage("Ricwiz: Open a folder or workspace that is a Git repository.");return}let o=ne.workspace.getConfiguration("ricwiz").get("resetTrackingCommand","sf org disable tracking && sf project reset tracking --no-prompt");await ne.window.withProgress({location:ne.ProgressLocation.Notification,title:"Ricwiz: Resetting tracking...",cancellable:!1},async()=>{try{let{stdout:s,stderr:n}=await h(o,{cwd:t,maxBuffer:52428800}),m=ne.window.createOutputChannel("Ricwiz Reset Tracking");m.appendLine(`Executing: ${o}`),m.appendLine(s),n&&(m.appendLine("--- STDERR ---"),m.appendLine(n)),m.show(),ne.window.showInformationMessage("Ricwiz: Successfully reset tracking!")}catch(s){let n=ne.window.createOutputChannel("Ricwiz Reset Tracking");n.appendLine(`Error executing: ${o}`),s.stdout&&n.appendLine(s.stdout),s.stderr&&n.appendLine(s.stderr),n.appendLine(s.message),n.show(),ne.window.showErrorMessage("Ricwiz: Error resetting tracking. See output channel for details.")}})}var ne,Io=$(()=>{"use strict";ne=v(require("vscode"));R()});async function Lo(){let t=y();if(!t){X.window.showErrorMessage("Ricwiz: Open a workspace first.");return}let e=["ApexClass","ApexTrigger","CustomObject","CustomField","LightningComponentBundle","AuraDefinitionBundle","Flow","CustomLabel","CustomMetadata","StaticResource","Profile","PermissionSet","PermissionSetGroup","Layout","ValidationRule","RecordType","ListView","Report","EmailTemplate","Other (Type manually)..."],o=await X.window.showQuickPick(e,{placeHolder:"Select Metadata Type to extract (e.g., ApexClass)",ignoreFocusOut:!0});if(!o||o==="Other (Type manually)..."&&(o=await X.window.showInputBox({prompt:"Enter Metadata Type (e.g., CustomApplication, Queue)",ignoreFocusOut:!0}),!o))return;let s={ApexClass:"**/*.cls",ApexTrigger:"**/*.trigger",CustomObject:"**/*.{object,object-meta.xml}",CustomField:"**/*.field-meta.xml",LightningComponentBundle:"**/lwc/*/*.js",AuraDefinitionBundle:"**/aura/*/*.cmp",Flow:"**/*.flow-meta.xml",CustomLabel:"**/*.labels-meta.xml",CustomMetadata:"**/*.md-meta.xml",StaticResource:"**/*.resource-meta.xml",Profile:"**/*.profile-meta.xml",PermissionSet:"**/*.permissionset-meta.xml",PermissionSetGroup:"**/*.permissionsetgroup-meta.xml",Layout:"**/*.layout-meta.xml",ValidationRule:"**/*.validationRule-meta.xml",RecordType:"**/*.recordType-meta.xml",ListView:"**/*.listView-meta.xml"},n=[],m=s[o];if(m)try{n=(await X.workspace.findFiles(m,"**/node_modules/**")).map(l=>{let c=l.fsPath.split(/[\\/]/).pop()||"";if(o==="LightningComponentBundle"||o==="AuraDefinitionBundle"){let i=l.fsPath.split(/[\\/]/);return i[i.length-2]||c.split(".")[0]}return c.split(".")[0]}),n=[...new Set(n)].sort()}catch{}let a=await new Promise(g=>{let l=X.window.createQuickPick();l.title=`Extract ${o}`,l.placeholder="Type name (e.g. MyComponent) or * for all",l.ignoreFocusOut=!0,l.matchOnDescription=!0;let c=()=>{let i=l.value.trim(),d=[];i?d.push({label:`$(cloud-download) Extract "${i}"`,description:"Extract exact name from Salesforce",alwaysShow:!0}):d.push({label:'$(cloud-download) Extract "*" (All)',description:`Extract all ${o}s`,alwaysShow:!0}),n.forEach(r=>{(!i||r.toLowerCase().includes(i.toLowerCase()))&&d.push({label:r,description:"Local workspace component"})}),l.items=d};l.onDidChangeValue(()=>c()),l.onDidAccept(()=>{let i=l.selectedItems[0];if(i){let d=i.label;d.startsWith('$(cloud-download) Extract "')?d=d.replace('$(cloud-download) Extract "',"").replace('" (All)',"").replace('"',""):d==='$(cloud-download) Extract "*" (All)'&&(d="*"),l.hide(),g(d)}}),l.onDidHide(()=>{l.dispose(),g(void 0)}),c(),l.show()});a&&await X.window.withProgress({location:X.ProgressLocation.Notification,title:`Ricwiz: Extracting ${o}:${a} from Salesforce...`,cancellable:!0},async(g,l)=>{try{I.show(!0);let c=`${o}:${a}`,{stdout:i,stderr:d}=await h(`sf project retrieve start -m "${c}"`,{cwd:t});i&&I.appendLine(i),d&&I.appendLine(d),X.window.showInformationMessage(`Ricwiz: Successfully extracted ${c}.`)}catch(c){I.appendLine(`ERROR: ${c.message}`),c.stdout&&I.appendLine(c.stdout),c.stderr&&I.appendLine(c.stderr),X.window.showErrorMessage("Ricwiz: Extraction failed. See Output channel for details.")}})}var X,Fo=$(()=>{"use strict";X=v(require("vscode"));R()});async function No(){let t=j.window.activeTextEditor;if(!t){j.window.showErrorMessage("Ricwiz: Please open the file you want to deploy in the editor first.");return}let e=t.document.uri.fsPath,o=y();if(!o)return;let s="";if(await j.window.withProgress({location:j.ProgressLocation.Notification,title:"Ricwiz: Fetching available Salesforce orgs...",cancellable:!1},async()=>{try{let{stdout:l}=await h("sf org list --json",{cwd:o});s=l}catch(l){s=l.stdout||""}}),!s){j.window.showErrorMessage("Ricwiz: Failed to fetch orgs. Is Salesforce CLI installed?");return}let n=[];try{let l=JSON.parse(s),c=l.result?.nonScratchOrgs||[],i=l.result?.scratchOrgs||[];n=[...c,...i]}catch{j.window.showErrorMessage("Ricwiz: Failed to parse org list.");return}if(n.length===0){j.window.showInformationMessage("Ricwiz: No authenticated orgs found.");return}let m=n.map(l=>({label:l.alias||l.username,description:l.alias?l.username:"",picked:l.isDefaultUsername})),a=await j.window.showQuickPick(m,{placeHolder:"Select the org(s) to deploy this file to",canPickMany:!0,ignoreFocusOut:!0});if(!a||a.length===0)return;let g=Oo.basename(e);await j.window.withProgress({location:j.ProgressLocation.Notification,title:`Ricwiz: Deploying ${g} to ${a.length} org(s)...`,cancellable:!1},async()=>{I.show(!0),I.appendLine(`--- Starting Parallel Deploy of ${g} ---`);let l=a.map(async r=>{let p=r.label;I.appendLine(`[${p}] Deploying...`);try{let{stdout:f,stderr:u}=await h(`sf project deploy start -d "${e}" -o "${p}"`,{cwd:o});return I.appendLine(`[${p}] \u2705 Success`),f&&I.appendLine(f),{org:p,success:!0}}catch(f){return I.appendLine(`[${p}] \u274C Failed`),f.stdout&&I.appendLine(f.stdout),f.stderr&&I.appendLine(f.stderr),{org:p,success:!1}}}),c=await Promise.all(l),i=c.filter(r=>r.success).length,d=c.filter(r=>!r.success).length;d===0?j.window.showInformationMessage(`Ricwiz: Successfully deployed to all ${i} orgs!`):j.window.showErrorMessage(`Ricwiz: Deploy finished with errors (${i} success, ${d} failed). Check Output channel.`)})}var j,Oo,Uo=$(()=>{"use strict";j=v(require("vscode")),Oo=v(require("path"));R()});async function jo(){let t=y();if(!t){A.window.showErrorMessage("Ricwiz: Open a folder or workspace that is a Git repository.");return}let e=A.workspace.getConfiguration("ricwiz"),o=e.get("auditUsername",""),s=e.get("auditHours",8),n=await A.window.showInputBox({prompt:"Enter your Salesforce Username to query in SetupAuditTrail",value:o,placeHolder:"admin@tuaorg.com"});if(!n)return;let m=await A.window.showInputBox({prompt:"How many hours back do you want to search?",value:s.toString(),placeHolder:"8"});if(!m)return;let a=parseFloat(m);if(isNaN(a)||a<=0){A.window.showErrorMessage("Ricwiz: Invalid hours specified.");return}let g=new Date(Date.now()-a*60*60*1e3).toISOString(),c=`sf data query -q "${`SELECT Action, Display, Section FROM SetupAuditTrail WHERE CreatedBy.Username = '${n}' AND CreatedDate >= ${g}`}" --json`;await A.window.withProgress({location:A.ProgressLocation.Notification,title:"Ricwiz: Interrogating Setup Audit Trail...",cancellable:!1},async()=>{try{let{stdout:i}=await h(c,{cwd:t,maxBuffer:52428800}),d=JSON.parse(i);if(!d.result||d.result.records.length===0){A.window.showInformationMessage(`Ricwiz: No changes found for ${n} in the last ${a} hours.`);return}let r=d.result.records,p=[],f=new Set;for(let E of r){let F=ci(E.Action,E.Display,E.Section);if(F){let ee=`${F.isDelete?"DEL":"ADD"}-${F.metadataFormat}`;if(!f.has(ee)){f.add(ee);let J=F.isDelete?"$(trash)":"$(plus)";p.push({label:`${J} ${F.metadataFormat}`,description:`${E.Action} -> ${E.Display}`,metadataFormat:F.metadataFormat,isDelete:F.isDelete})}}}if(p.length===0){A.window.showInformationMessage(`Ricwiz: No extractable metadata changes found for ${n} in the last ${a} hours (ignored passwords/logins).`);return}let u=await A.window.showQuickPick(p,{canPickMany:!0,placeHolder:"Select the changes you want to extract to GitLab",ignoreFocusOut:!0});if(!u||u.length===0){A.window.showInformationMessage("Ricwiz: No changes selected.");return}let w=u.filter(E=>E.isDelete),z=u.filter(E=>!E.isDelete),x=A.window.createOutputChannel("Ricwiz Admin Bridge");if(x.show(),w.length>0){let{stdout:E}=await h("git ls-files",{cwd:t}),F=E.split(`
`).map(J=>J.trim()),ee=0;for(let J of w){let Se=J.metadataFormat.split(":"),Le=Se[0],Fe=Se[1],fe=Fe;Le==="CustomField"&&(fe=Fe.split(".")[1]);let Ze=F.filter(xe=>{let M=Ye.basename(xe);return M.startsWith(fe+".")&&M.includes(Le==="CustomField"?".field":"")});for(let xe of Ze){let M=Ye.join(t,xe);Qe.existsSync(M)&&(Qe.unlinkSync(M),x.appendLine(`Deleted local file: ${xe}`),ee++)}}A.window.showInformationMessage(`Ricwiz: Deleted ${ee} local files from Git workspace.`)}if(z.length===0)return;let P=z.map(E=>E.metadataFormat).filter(E=>E!=="").join(", "),B=await A.window.showInputBox({prompt:"Review and adjust the metadata components to retrieve",value:P,ignoreFocusOut:!0});if(!B)return;let N=`sf project retrieve start -m "${B}"`;x.appendLine(`Executing: ${N}`),A.window.showInformationMessage(`Ricwiz: Extracting ${z.length} components...`);let se=await h(N,{cwd:t});x.appendLine(se.stdout),se.stderr&&(x.appendLine("--- STDERR ---"),x.appendLine(se.stderr)),A.window.showInformationMessage("Ricwiz: Changes extracted successfully! Ready for Git Commit.")}catch(i){A.window.showErrorMessage(`Ricwiz: Error capturing changes - ${i.message}`)}})}function ci(t,e,o){if(!t||!e||!o)return null;let s=t.toLowerCase(),n=o.toLowerCase();if(["security controls","network access","session settings","data export","login history","password policies","identity verification","delegated administration"].includes(n)||s.includes("login")||s.includes("password")||s.includes("oauth")||s.includes("session"))return null;let a=s.includes("delete"),g=null;if(s==="permissionsetgroupcomponentadd"||s==="permissionsetgroupcomponentdelete")return null;let l=(c,i=!1)=>{let d=c.replace(/\(.*\)/g,"").trim();d.includes(":")&&!s.includes("calculation")&&(d=d.split(":")[0]);let r=["disabled","deleted","removed","created","changed","updated","from","to","on","assigned","assign","assignment","permission","set","group","apex","class","trigger","custom","field","object","layout","validation","rule","flow","profile"],p=d.split(/\s+/);if(i){for(;p.length>0&&r.includes(p[p.length-1].toLowerCase());)p.pop();for(;p.length>0&&r.includes(p[0].toLowerCase());)p.shift();return p.join(" ").trim().replace(/[^a-zA-Z0-9_ ]/g,"")}else return p.filter(w=>!r.includes(w.toLowerCase())).join("_").replace(/[^a-zA-Z0-9_]/g,"")||d.replace(/\s+/g,"")};if(s.includes("profile"))g=`Profile:${l(e,!0)}`;else if(s.includes("permissionsetgroupcalculation")){let c=e.split(":");g=`PermissionSetGroup:${c.length>1?c[c.length-1].trim():l(e,!1)}`}else if(s.includes("permission set group")||s.includes("permissionsetgroup"))g=`PermissionSetGroup:${l(e,!1)}`;else if(s.includes("permission set")||s.includes("permissionset"))g=`PermissionSet:${l(e,!1)}`;else if(s.includes("apexclass"))g=`ApexClass:${l(e,!1)}`;else if(s.includes("apextrigger")||s.includes("apex trigger"))g=`ApexTrigger:${l(e,!1)}`;else if(s.includes("customfield")){let c=e.match(/([A-Za-z0-9_]+__c)/),i=e.match(/(?:on|na|for)\s+([A-Za-z0-9_]+)/i);c&&i?g=`CustomField:${i[1]}.${c[1]}`:g=`CustomField:${l(e,!1)}`}else if(s.includes("layout"))g=`Layout:${l(e,!0)}`;else if(s.includes("validation"))g=`ValidationRule:${l(e,!1)}`;else if(s.includes("flow"))g=`Flow:${l(e,!1)}`;else if(s.includes("customobject")){let c=e.match(/([A-Za-z0-9_]+__c)/);g=c?`CustomObject:${c[1]}`:`CustomObject:${l(e,!1)}`}else if(!s.includes("created")&&!s.includes("changed")&&!s.includes("deleted"))return null;return g?{metadataFormat:g,isDelete:a}:null}var A,Qe,Ye,Jo=$(()=>{"use strict";A=v(require("vscode")),Qe=v(require("fs")),Ye=v(require("path"));R()});async function Wo(){let t=y();if(t)try{let{stdout:e}=await h('git for-each-ref --sort=-committerdate --format="%(refname:short)|||%(committerdate:relative)|||%(subject)" refs/heads/',{cwd:t}),o=e.split(`
`).filter(n=>n.trim()).map(n=>{let m=n.split("|||");return{label:`$(git-branch) ${m[0]}`,description:m[1],detail:m[2],branchName:m[0]}}),s=await dt.window.showQuickPick(o,{placeHolder:"Select a branch from history to checkout",matchOnDescription:!0,matchOnDetail:!0});s&&await Re(s.branchName)}catch{dt.window.showErrorMessage("Ricwiz: Failed to get branch history")}}var dt,qo=$(()=>{"use strict";dt=v(require("vscode"));R();Ve()});async function Go(){let t=y();if(!t)return;let e=await De.window.showInputBox({prompt:"Enter ticket number or name (e.g., 48934)",placeHolder:"48934"});if(e)try{let{stdout:o}=await h(`git branch --list "*${e}*"`,{cwd:t}),s=o.split(`
`).map(a=>a.replace("*","").trim()).filter(a=>a);if(s.length===0){De.window.showInformationMessage(`Ricwiz: No branches found matching "${e}"`);return}let n=s.map(a=>({label:`$(git-branch) ${a}`,branchName:a})),m=await De.window.showQuickPick(n,{placeHolder:`Select a branch for ${e}`});m&&await Re(m.branchName)}catch{De.window.showErrorMessage("Ricwiz: Failed to search branches")}}var De,Ho=$(()=>{"use strict";De=v(require("vscode"));R();Ve()});async function _o(){let t=be.window.activeTextEditor;if(!t)return be.window.showErrorMessage("Ricwiz: Please open a file in the editor to check blame."),null;let e=t.document.fileName,o=Vo.basename(e),s=y();if(!s)return be.window.showErrorMessage("Ricwiz: Workspace is not a git repository."),null;let n=[];try{let{stdout:i}=await h(`git log -5 --pretty=format:"%an|%ar|%s|%h" -- "${e}"`,{cwd:s}),d=i.trim().split(`
`);for(let r of d){let p=r.split("|");p.length>=4&&n.push({author:p[0],time:p[1],message:p.slice(2,-1).join("|"),hash:p[p.length-1]})}}catch(i){console.error("Git blame error:",i)}let m="Unknown",a="Unknown",g="Unknown",l=[],c=di(e);if(c)try{await be.window.withProgress({location:be.ProgressLocation.Notification,title:`Ricwiz: Analyzing ${c.name} in Salesforce...`,cancellable:!1},async()=>{let i="";if(c.type==="CustomField"){let d=c.name.split(".");d.length===2&&(i=`SELECT LastModifiedBy.Name, LastModifiedDate, CreatedBy.Name FROM CustomField WHERE DeveloperName = '${d[1].replace("__c","")}' AND TableEnumOrId = '${d[0]}'`)}else c.type==="LightningComponentBundle"?i=`SELECT LastModifiedBy.Name, LastModifiedDate, CreatedBy.Name FROM LightningComponentBundle WHERE DeveloperName = '${c.name}'`:i=`SELECT LastModifiedBy.Name, LastModifiedDate, CreatedBy.Name FROM ${c.type} WHERE Name = '${c.name}'`;if(i)try{let{stdout:d}=await h(`sf data query -t -q "${i}" --json`,{cwd:s,maxBuffer:52428800}),r=JSON.parse(d);if(r&&r.result&&r.result.records&&r.result.records.length>0){let p=r.result.records[0];m=p.LastModifiedBy?p.LastModifiedBy.Name:"Unknown",g=p.CreatedBy?p.CreatedBy.Name:"Unknown",a=new Date(p.LastModifiedDate).toLocaleString()}else m="Not found in Org",a="N/A",g="N/A"}catch{m="Query Error",a="N/A",g="N/A"}try{let d="SELECT Action, Display, CreatedBy.Name, CreatedDate FROM SetupAuditTrail ORDER BY CreatedDate DESC LIMIT 1500",{stdout:r}=await h(`sf data query -q "${d}" --json`,{cwd:s,maxBuffer:52428800}),p=JSON.parse(r);if(p&&p.result&&p.result.records){let f=c.name.replace("__c","");l=p.result.records.filter(w=>w.Display&&w.Display.includes(f)).map(w=>({action:w.Action,display:w.Display,author:w.CreatedBy?w.CreatedBy.Name:"Unknown",time:new Date(w.CreatedDate).toLocaleString()})).slice(0,10)}}catch(d){console.error("Audit trail query error:",d)}})}catch(i){console.error("Salesforce query error:",i)}else m="Unsupported Metadata Type",a="N/A";return{fileName:o,gitHistory:n,sfAuthor:m,sfTime:a,sfCreatedBy:g,auditHistory:l}}function di(t){let e=t.replace(/\\/g,"/");if(e.includes("/classes/")){let o=e.match(/\/classes\/([^/.]+)\.cls/);if(o)return{type:"ApexClass",name:o[1]}}if(e.includes("/triggers/")){let o=e.match(/\/triggers\/([^/.]+)\.trigger/);if(o)return{type:"ApexTrigger",name:o[1]}}if(e.includes("/lwc/")){let o=e.match(/\/lwc\/([^/]+)\//);if(o)return{type:"LightningComponentBundle",name:o[1]}}if(e.includes("/aura/")){let o=e.match(/\/aura\/([^/]+)\//);if(o)return{type:"AuraDefinitionBundle",name:o[1]}}if(e.includes("/objects/")&&e.includes("/fields/")){let o=e.match(/\/objects\/([^/]+)\//),s=e.match(/\/fields\/([^/.]+)\.field/);if(o&&s)return{type:"CustomField",name:`${o[1]}.${s[1]}`}}return null}var be,Vo,Qo=$(()=>{"use strict";be=v(require("vscode")),Vo=v(require("path"));R()});function Yo(t,e,o){t.subscriptions.push(k.commands.registerCommand("ricwiz.generateDestructiveChanges",Ct),k.commands.registerCommand("ricwiz.runSmartTests",zt),k.commands.registerCommand("ricwiz.refreshWebview",()=>{e&&k.commands.executeCommand("workbench.action.webview.reloadWebviewAction")}),k.commands.registerCommand("ricwiz.createBranches",Pt),k.commands.registerCommand("ricwiz.prepareDeploy",Dt),k.commands.registerCommand("ricwiz.createMergeRequests",Lt),k.commands.registerCommand("ricwiz.createMergeRequestsVSCode",Ft),k.commands.registerCommand("ricwiz.openJiraTicket",Ut),k.commands.registerCommand("ricwiz.openJiraTicketVSCode",jt),k.commands.registerCommand("ricwiz.showJiraDetails",()=>{e&&no(e)}),k.commands.registerCommand("ricwiz.openJiraDashboard",s=>{e&&ro(e,s)}),k.commands.registerCommand("ricwiz.openJiraDetailsForId",s=>{e&&ao(e,s)}),k.commands.registerCommand("ricwiz.toggleDashboardBranches",s=>{e&&(e.setDashboardShowBranches(s),k.commands.executeCommand("ricwiz.openJiraDashboard"))}),k.commands.registerCommand("ricwiz.changeJiraStatus",lo),k.commands.registerCommand("ricwiz.addJiraComment",mo),k.commands.registerCommand("ricwiz.addJiraLabel",po),k.commands.registerCommand("ricwiz.setJiraToken",uo),k.commands.registerCommand("ricwiz.setGitlabToken",fo),k.commands.registerCommand("ricwiz.syncAll",wo),k.commands.registerCommand("ricwiz.updateBases",yo),k.commands.registerCommand("ricwiz.deleteUnusedBranches",xo),k.commands.registerCommand("ricwiz.checkoutBranch",Re),k.commands.registerCommand("ricwiz.copyBranchName",Co),k.commands.registerCommand("ricwiz.generatePackageXml",Ro),k.commands.registerCommand("ricwiz.deployPackage",Bo),k.commands.registerCommand("ricwiz.importData",Eo),k.commands.registerCommand("ricwiz.listTicketFiles",To),k.commands.registerCommand("ricwiz.resetTracking",Ao),k.commands.registerCommand("ricwiz.extractComponent",Lo),k.commands.registerCommand("ricwiz.deployMultiOrg",No),k.commands.registerCommand("ricwiz.captureAdminChanges",jo),k.commands.registerCommand("ricwiz.openHistory",Wo),k.commands.registerCommand("ricwiz.searchTicket",Go),k.commands.registerCommand("ricwiz.whoToBlame",async()=>{let s=await _o();s&&e&&(e.setBlameData(s),e.setPage("blame"))}),k.commands.registerCommand("ricwiz.manualRefresh",()=>{o&&o()}),k.commands.registerCommand("ricwiz.toggleAutoRefresh",()=>{if(e){let s=!e.isAutoRefreshEnabled();e.setAutoRefresh(s),k.workspace.getConfiguration("ricwiz").update("autoRefresh",s,k.ConfigurationTarget.Global)}}),k.commands.registerCommand("ricwiz.openSettings",()=>{k.commands.executeCommand("workbench.action.openSettings","ricwiz")}))}var k,Zo=$(()=>{"use strict";k=v(require("vscode"));$t();Rt();Et();At();Ot();Jt();so();co();go();ho();vo();bo();ko();Ve();$o();So();Po();Mo();Do();Io();Fo();Uo();Jo();qo();Ho();Qo()});function Ko(t,e,o){let s,n=ce.workspace.getConfiguration("ricwiz").get("autoRefresh",!0);e?.setAutoRefresh(n),t.subscriptions.push(ce.workspace.onDidChangeConfiguration(a=>{if(a.affectsConfiguration("ricwiz.autoRefresh")){let g=ce.workspace.getConfiguration("ricwiz").get("autoRefresh",!0);e?.setAutoRefresh(g)}}));async function m(){let a=ce.extensions.getExtension("vscode.git");if(a){let c=function(i){let d="",r;async function p(){let u=ce.workspace.workspaceFolders;if(!u)return;let w=u[0].uri.fsPath,z=await L(w);if(z&&z!==d){d=z;let x=ce.workspace.getConfiguration("ricwiz"),P=x.get("ticketPrefix","SFPSCA-");if(!z.includes(P)){let M=z.match(/([A-Z]+-)\d+/i);M&&(P=M[1].toUpperCase())}let B=[],N=[],se=[],E=[],F=await T.initialize(w,{skipPrompt:!0}),ee=F?.environments||x.get("environments",[{name:"Qual",sourceBranch:"quality"},{name:"Val",sourceBranch:"validation"},{name:"Prod",sourceBranch:"main"}]);try{let M=x.get("workspaceCheckoutButtons",["main","quality","validation"]);se=Array.from(new Set(M))}catch{}let J="",Se=z.match(new RegExp(`(${P}\\d+(?:-\\d+)?)`,"i"));if(Se){let M=Se[1].toUpperCase();J=M;let he=x.get("commitMessageSuffix","- "),lt=/^[A-Z]+-\d+(?:-\d+)?\s*(?:-\s*|:\s*|\s+)?/i;lt.test(i.inputBox.value)?i.inputBox.value.toUpperCase().startsWith(M)||(i.inputBox.value=i.inputBox.value.replace(lt,`${M}${he}`)):i.inputBox.value=`${M}${he}`+i.inputBox.value,o.text=`$(bookmark) ${M}`,o.tooltip=`Branch: ${z}
Click to open Jira ticket`,o.show();try{let mt=await at(w,M,"");B=await it(w,mt,M,ee,F)}catch{}}else{o.hide();try{E=await rt(w)}catch{}}let[Le,Fe,fe]=await Promise.all([st(w,10),nt(w,z,ee,F),J?ze(J).catch(M=>{let he=M.message;return(he.includes("ENOTFOUND")||he.includes("network"))&&(he="No Internet or Invalid URL"),{summary:`\u26A0\uFE0F Jira Error: ${he}`,description:"",status:""}}):Promise.resolve(null)]);N=Le;let Ze=fe?fe.summary:"",xe=fe&&fe.status||"";e?.updateBranch(z,Fe,B,N,se,E,Ze,xe)}}function f(){e?.isAutoRefreshEnabled()&&(r&&clearTimeout(r),r=setTimeout(()=>{d="",p()},300))}s=()=>{d="",p()},p(),i.state.onDidChange(()=>f()),ce.window.onDidChangeWindowState(u=>{u.focused&&f()})};var g=c;a.isActive||await a.activate();let l=a.exports.getAPI(1);l.repositories.length>0&&l.repositories.forEach(i=>c(i)),l.onDidOpenRepository(i=>c(i))}}return m(),()=>{s&&s()}}var ce,Xo=$(()=>{"use strict";ce=v(require("vscode"));R();Me();Ee();V()});var We={};Ne(We,{activate:()=>li,deactivate:()=>mi,webviewProvider:()=>Ae});module.exports=W(We);function li(t){gt(t),Ae=new Ue(t.extensionUri),t.subscriptions.push(Ie.window.registerWebviewViewProvider("ricwiz-webview",Ae));let e=Ie.window.createStatusBarItem(Ie.StatusBarAlignment.Left,100);e.command="ricwiz.openJiraTicket",t.subscriptions.push(e);let o=Ko(t,Ae,e);Yo(t,Ae,o)}function mi(){}var Ie,Ae,qe=$(()=>{Ie=v(require("vscode"));ut();ke();Zo();Xo()});qe();0&&(module.exports={activate,deactivate,webviewProvider});
