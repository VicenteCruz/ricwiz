"use strict";var ei=Object.create;var qe=Object.defineProperty;var ti=Object.getOwnPropertyDescriptor;var oi=Object.getOwnPropertyNames;var ii=Object.getPrototypeOf,ni=Object.prototype.hasOwnProperty;var z=(t,e,o)=>()=>{if(o)throw o[0];try{return t&&(e=t(t=0)),e}catch(s){throw o=[s],s}};var Le=(t,e)=>{for(var o in e)qe(t,o,{get:e[o],enumerable:!0})},ht=(t,e,o,s)=>{if(e&&typeof e=="object"||typeof e=="function")for(let r of oi(e))!ni.call(t,r)&&r!==o&&qe(t,r,{get:()=>e[r],enumerable:!(s=ti(e,r))||s.enumerable});return t};var y=(t,e,o)=>(o=t!=null?ei(ii(t)):{},ht(e||!t||!t.__esModule?qe(o,"default",{value:t,enumerable:!0}):o,t)),I=t=>ht(qe({},"__esModule",{value:!0}),t);function R(t){return t.replace(/&/g,"&amp;").replace(/</g,"&lt;").replace(/>/g,"&gt;").replace(/"/g,"&quot;").replace(/'/g,"&#39;")}var k,Ge,wt=z(()=>{"use strict";k=y(require("vscode"));Ge=class{constructor(e){this._extensionUri=e}_extensionUri;webviewView;resolveWebviewView(e,o,s){this.webviewView=e,e.webview.options={enableScripts:!0,localResourceRoots:[this._extensionUri]},this.updateBranch("",!1),e.webview.onDidReceiveMessage(r=>{switch(r.command){case"createBranches":k.commands.executeCommand("ricwiz.createBranches");break;case"createBranchForTicket":k.commands.executeCommand("ricwiz.createBranches",r.args);break;case"prepareDeploy":k.commands.executeCommand("ricwiz.prepareDeploy");break;case"openMRs":k.commands.executeCommand("ricwiz.createMergeRequests");break;case"openMRsVSCode":k.commands.executeCommand("ricwiz.createMergeRequestsVSCode");break;case"openExternal":r.args&&k.env.openExternal(k.Uri.parse(r.args));break;case"openJira":k.commands.executeCommand("ricwiz.openJiraTicket");break;case"showJiraDetails":k.commands.executeCommand("ricwiz.showJiraDetails");break;case"changeJiraStatus":k.commands.executeCommand("ricwiz.changeJiraStatus");break;case"addJiraComment":k.commands.executeCommand("ricwiz.addJiraComment");break;case"addJiraLabel":k.commands.executeCommand("ricwiz.addJiraLabel");break;case"setPage":this.setPage(r.args);break;case"openDashboard":k.commands.executeCommand("ricwiz.openJiraDashboard");break;case"openJiraDetailsForId":k.commands.executeCommand("ricwiz.openJiraDetailsForId",r.args);break;case"refreshDashboard":k.commands.executeCommand("ricwiz.openJiraDashboard");break;case"switchDashboardQuery":k.commands.executeCommand("ricwiz.openJiraDashboard",parseInt(r.args));break;case"toggleDashboardBranches":k.commands.executeCommand("ricwiz.toggleDashboardBranches",r.args);break;case"openJiraVSCode":k.commands.executeCommand("ricwiz.openJiraTicketVSCode");break;case"openSettings":k.commands.executeCommand("ricwiz.openSettings");break;case"checkout":r.branch&&k.commands.executeCommand("ricwiz.checkoutBranch",r.branch);break;case"copyBranch":k.commands.executeCommand("ricwiz.copyBranchName");break;case"generatePackageXml":k.commands.executeCommand("ricwiz.generatePackageXml");break;case"openDevTools":this.setPage("devtools");break;case"openMain":this.setPage("main");break;case"generateDestructiveChanges":k.commands.executeCommand("ricwiz.generateDestructiveChanges");break;case"deployPackage":k.commands.executeCommand("ricwiz.deployPackage");break;case"runSmartTests":k.commands.executeCommand("ricwiz.runSmartTests");break;case"importData":k.commands.executeCommand("ricwiz.importData");break;case"listTicketFiles":k.commands.executeCommand("ricwiz.listTicketFiles");break;case"resetTracking":k.commands.executeCommand("ricwiz.resetTracking");break;case"extractComponent":k.commands.executeCommand("ricwiz.extractComponent");break;case"deployMultiOrg":k.commands.executeCommand("ricwiz.deployMultiOrg");break;case"captureAdminChanges":k.commands.executeCommand("ricwiz.captureAdminChanges");break;case"whoToBlame":k.commands.executeCommand("ricwiz.whoToBlame");break;case"syncAll":k.commands.executeCommand("ricwiz.syncAll");break;case"updateBases":k.commands.executeCommand("ricwiz.updateBases");break;case"deleteUnused":k.commands.executeCommand("ricwiz.deleteUnusedBranches");break;case"conflict_commitAndContinue":k.commands.executeCommand("ricwiz.conflictAction","commitAndContinue");break;case"conflict_resolveDeletions":k.commands.executeCommand("ricwiz.conflictAction","resolveDeletions");break;case"conflict_abortDeploy":k.commands.executeCommand("ricwiz.conflictAction","abortDeploy");break;case"openFile":if(r.file){let l=k.workspace.workspaceFolders;if(l){let d=k.Uri.joinPath(l[0].uri,r.file);k.commands.executeCommand("vscode.open",d)}}break;case"searchTicket":k.commands.executeCommand("ricwiz.searchTicket");break;case"manualRefresh":k.commands.executeCommand("ricwiz.manualRefresh");break;case"toggleAutoRefresh":k.commands.executeCommand("ricwiz.toggleAutoRefresh");break;case"openHistory":k.commands.executeCommand("ricwiz.openHistory");break}})}conflictState=null;setConflictState(e){this.conflictState=e,this.updateView()}updateBranch(e,o,s=[],r=[],l=[],d=[],p="",m=""){this.webviewView&&(this.currentBranchCache=e,this.currentBranchIsMergedCache=o,this.relatedBranchesCache=s,this.commitsCache=r,this.baseBranchesCache=l,this.recentTicketsCache=d,this.ticketTitleCache=p,this.ticketStatusCache=m,this.updateView())}currentBranchCache="";currentBranchIsMergedCache=!1;relatedBranchesCache=[];commitsCache=[];baseBranchesCache=[];recentTicketsCache=[];ticketTitleCache="";ticketStatusCache="";currentPage="main";blameDataCache=null;jiraDataCache=null;dashboardDataCache=null;dashboardShowBranches=!1;autoRefreshEnabled=!0;setDashboardShowBranches(e){this.dashboardShowBranches=e}getDashboardShowBranches(){return this.dashboardShowBranches}setBlameData(e){this.blameDataCache=e}setJiraData(e){this.jiraDataCache=e}setDashboardData(e){this.dashboardDataCache=e}setAutoRefresh(e){this.autoRefreshEnabled=e,this.updateView()}isAutoRefreshEnabled(){return this.autoRefreshEnabled}setPage(e){this.currentPage=e,this.updateView()}updateView(){if(!this.webviewView)return;let e=this.webviewView.webview.asWebviewUri(k.Uri.joinPath(this._extensionUri,"resources","logo.png"));this.webviewView.webview.html=this._getHtmlForWebview(e,this.currentBranchCache,this.relatedBranchesCache,this.commitsCache,this.baseBranchesCache,this.recentTicketsCache,this.currentPage)}_getHtmlForWebview(e,o,s,r,l,d,p){let m=r.length>0?`
            <div class="separator"></div>
            <div style="padding: 0 4px;">
                <div style="font-size: 11px; opacity: 0.7; margin-bottom: 6px; display: flex; align-items: center; gap: 4px;">
                    <span>\u{1F4DC}</span> Recent Commits
                </div>
                <div style="display: flex; flex-direction: column; gap: 2px;">
                    ${r.map(g=>`
                        <div style="font-size: 11px; padding: 3px 4px; border-radius: 2px; display: flex; gap: 6px; align-items: baseline;">
                            <code style="color: var(--vscode-textLink-foreground); font-size: 10px; flex-shrink: 0;">${R(g.hash)}</code>
                            <span style="flex: 1; overflow: hidden; text-overflow: ellipsis; white-space: nowrap;" title="${R(g.message)}">${R(g.message)}</span>
                            <span style="font-size: 9px; opacity: 0.5; flex-shrink: 0;">${R(g.timeAgo)}</span>
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
        `;if(this.conflictState){let g=(this.conflictState.files||[]).map(w=>`
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
                ${a}
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
            </html>`}if(p==="jira"){let g=this.jiraDataCache,w=g?.ticketId||"Jira",v=g?.summary||"No Title",b=g?.description||"No description provided.",$=g?.relatedBranches||[];return`<!DOCTYPE html>
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
                                ${$.map(E=>{let P="";return E.pipelineStatus==="running"?P="\u23F3":E.pipelineStatus==="success"?P="\u2705":E.pipelineStatus==="failed"?P="\u274C":E.pipelineStatus==="canceled"?P="\u{1F6D1}":E.pipelineStatus==="skipped"&&(P="\u23ED\uFE0F"),`
                                    <div class="btn" style="padding: 6px 10px; font-size: 12px; display: flex; justify-content: space-between; align-items: center; background-color: var(--vscode-button-secondaryBackground); color: var(--vscode-button-secondaryForeground); border-radius: 4px;" onclick="sendCheckoutCommand('${R(E.name)}')" title="Checkout ${R(E.name)}">
                                        <div style="display: flex; align-items: center; gap: 6px; overflow: hidden;">
                                            <span style="overflow: hidden; text-overflow: ellipsis; white-space: nowrap; font-weight: bold;">${R(E.name)}</span>
                                        </div>
                                        <div style="display: flex; gap: 6px; align-items: center;">
                                            ${P?`<span title="Pipeline: ${E.pipelineStatus}" style="font-size: 11px;">${P}</span>`:""}
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
            </html>`}if(p==="dashboard"){let g=this.dashboardDataCache||{queries:[],selectedIndex:0,results:[],error:null},w=g.queries.map((b,$)=>`
                <option value="${$}" ${$===g.selectedIndex?"selected":""}>${R(b.name)}</option>
            `).join(""),v=g.error?`
                <div style="color: var(--vscode-errorForeground); padding: 12px; text-align: center; background: var(--vscode-editorError-background); border-radius: 4px;">
                    \u26A0\uFE0F ${R(g.error)}
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
                        ${g.results.map(b=>`
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
            </html>`}if(p==="devtools")return`<!DOCTYPE html>
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
            </html>`;let i=s.find(g=>g.name===o),n="";i&&(i.pipelineStatus==="running"?n="\u23F3":i.pipelineStatus==="success"?n="\u2705":i.pipelineStatus==="failed"?n="\u274C":i.pipelineStatus==="canceled"?n="\u{1F6D1}":i.pipelineStatus==="skipped"&&(n="\u23ED\uFE0F"));let c=i?i.mrUrl:void 0,u=s.filter(g=>g.name!==o),h=o?`<div style="background-color: var(--vscode-editor-inactiveSelectionBackground); padding: 10px; border-radius: 6px; margin-bottom: 16px; border: 1px solid var(--vscode-panel-border); box-shadow: 0 2px 4px rgba(0,0,0,0.1); position: relative;">
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
                    ${u.length>0?`
                        <div style="margin-top: 10px; border-top: 1px solid var(--vscode-panel-border); padding-top: 10px;">
                            <div style="font-size: 10px; opacity: 0.7; margin-bottom: 6px; text-transform: uppercase; text-align: center;">Sister Branches</div>
                            <div style="display: flex; flex-direction: column; gap: 4px;">
                                ${u.map(g=>{let w="";return g.pipelineStatus==="running"?w="\u23F3":g.pipelineStatus==="success"?w="\u2705":g.pipelineStatus==="failed"?w="\u274C":g.pipelineStatus==="canceled"?w="\u{1F6D1}":g.pipelineStatus==="skipped"&&(w="\u23ED\uFE0F"),`
                                    <div class="btn" style="padding: 4px 8px; font-size: 11px; display: flex; justify-content: space-between; align-items: center; background-color: var(--vscode-button-secondaryBackground); color: var(--vscode-button-secondaryForeground); border-radius: 4px;" onclick="sendCheckoutCommand('${R(g.name)}', this)" title="Checkout ${R(g.name)}">
                                        <div style="display: flex; align-items: center; gap: 4px; overflow: hidden;">
                                            <span style="overflow: hidden; text-overflow: ellipsis; white-space: nowrap; font-weight: bold;">${R(g.name)}</span>
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
                    `:d.length>0?`
                        <div style="margin-top: 10px; border-top: 1px solid var(--vscode-panel-border); padding-top: 10px;">
                            <div style="font-size: 10px; opacity: 0.7; margin-bottom: 6px; text-transform: uppercase; text-align: center;">Recent Tickets</div>
                            <div style="display: flex; flex-direction: column; gap: 4px;">
                                ${d.map(g=>`
                                    <div class="btn" style="padding: 4px 8px; font-size: 11px; display: flex; align-items: center; background-color: var(--vscode-button-secondaryBackground); color: var(--vscode-button-secondaryForeground); border-radius: 4px;" onclick="sendCheckoutCommand('${R(g)}', this)" title="Checkout ${R(g)}">
                                        <span style="font-weight: bold;">${R(g)}</span>
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

            ${h}


            ${l.length>0?`
                <div style="display: flex; gap: 4px; margin-bottom: 16px; flex-wrap: wrap; justify-content: center;">
                    ${l.map(g=>`
                        <button class="btn" style="flex: 1; min-width: 25%; justify-content: center; padding: 6px 4px; font-size: 10px; font-weight: bold; background-color: var(--vscode-button-secondaryBackground); color: var(--vscode-button-secondaryForeground); border-radius: 4px;" onclick="sendCheckoutCommand('${R(g)}', this)" title="Checkout ${R(g)}">
                            ${R(g.toUpperCase())}
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
        </html>`}}});function vt(t){me=t.secrets}async function bt(t){if(!me)throw new Error("SecretStorage is not initialized.");await me.store("ricwiz.jiraApiToken",t)}async function yt(){if(!me)throw new Error("SecretStorage is not initialized.");return await me.get("ricwiz.jiraApiToken")}async function xt(t){if(!me)throw new Error("SecretStorage is not initialized.");await me.store("ricwiz.gitlabApiToken",t)}async function rt(){if(!me)throw new Error("SecretStorage is not initialized.");return await me.get("ricwiz.gitlabApiToken")}var me,ze=z(()=>{"use strict"});var Te={};Le(Te,{checkBranchExists:()=>he,checkRemoteBranchExists:()=>Rt,exec:()=>f,extractTicketSuggestion:()=>Be,getCurrentBranch:()=>U,getWorkspaceCwd:()=>x,normalizeTicketId:()=>$t,promptForTicketId:()=>H,resolvePrefix:()=>Pe,ricwizLogger:()=>N});function x(){let t=Se.workspace.workspaceFolders;if(t)return t[0].uri.fsPath}async function U(t){try{let{stdout:e}=await f("git branch --show-current",{cwd:t});return e.trim()}catch{return""}}function Pe(t,e){if(!t.includes(e)){let o=t.match(/([A-Z]+-)\d+/i);if(o)return o[1].toUpperCase()}return e}function Be(t,e,o=!1){let s=t.match(new RegExp(`(${e}\\d+)`,"i"));return s?s[1].toUpperCase():t.includes(e)&&!t.includes("-to-")?t.substring(t.indexOf(e)):o&&t.includes("-to-")?t.substring(t.indexOf(e)).split("-to-")[0]:""}function $t(t,e){let o=t.trim();return/^\d/.test(o)?`${e}${o}`.toUpperCase():o.toUpperCase()}async function H(t,e){let o=Se.workspace.getConfiguration("ricwiz"),s=e?.prefix??o.get("ticketPrefix","SFPSCA-"),r=await U(t),l=Pe(r,s),d=e?.suggestedValue??Be(r,l,e?.handleToSuffix),p=await Se.window.showInputBox({prompt:e?.prompt||"Enter the full ticket ID (e.g., SCPSCA-1234) or just the number",placeHolder:e?.placeHolder||"Ticket ID or number",value:d});return p?{ticketId:$t(p,l),currentBranch:r,prefix:l}:void 0}async function he(t,e){try{return await f(`git show-ref --verify --quiet refs/heads/${e}`,{cwd:t}),!0}catch{}return await Rt(t,e)}async function Rt(t,e){try{let{stdout:o}=await f(`git branch -r --list "*/${e}"`,{cwd:t});return o.trim().length>0}catch{return!1}}var Se,kt,Ct,si,N,f,S=z(()=>{"use strict";Se=y(require("vscode")),kt=y(require("child_process")),Ct=y(require("util")),si=Ct.promisify(kt.exec),N=Se.window.createOutputChannel("Ricwiz"),f=async(t,e)=>{N.appendLine(`[EXEC] ${t}`);let o=await si(t,{maxBuffer:50*1024*1024,...e});return{stdout:o.stdout.toString(),stderr:o.stderr.toString()}}});var St={};Le(St,{WorkflowContext:()=>M});var Ae,zt,He,M,J=z(()=>{"use strict";Ae=y(require("vscode")),zt=y(require("path")),He=y(require("fs")),M=class t{style;upstreamRemote;originRemote;ticketSourceBranch;ticketPrefix;branchPrefix;environments;static baseConfig=Ae.workspace.getConfiguration("ricwiz");activeProfile;profileName;constructor(e){this.activeProfile=e,this.profileName=e?.name;let o=t.baseConfig;this.style=e?.workflowStyle||o.get("workflowStyle","standard"),this.style==="multi-remote"?(this.upstreamRemote=e?.upstreamRemote||o.get("upstreamRemote","salesforce-master"),this.originRemote=e?.originRemote||o.get("originRemote","origin")):(this.upstreamRemote="origin",this.originRemote="origin"),this.ticketSourceBranch=e?.ticketSourceBranch||o.get("ticketSourceBranch","main"),this.ticketPrefix=e?.ticketPrefix||o.get("ticketPrefix","SFPSCA-"),this.branchPrefix=e?.branchPrefix??o.get("branchPrefix","");let s=[{name:"Qual",sourceBranch:"quality"},{name:"Val",sourceBranch:"validation"},{name:"Prod",sourceBranch:"main"}];this.environments=e?.environments||o.get("environments",s)}getConfig(e,o){return this.activeProfile&&this.activeProfile[e]!==void 0?this.activeProfile[e]:t.baseConfig.get(e,o)}static async initialize(e,o){let s=t.baseConfig.get("profiles",[]),r=zt.join(e,"ricwiz.json");if(He.existsSync(r))try{let l=He.readFileSync(r,"utf-8"),d=JSON.parse(l);d&&Array.isArray(d.profiles)&&(s=[...s,...d.profiles])}catch(l){Ae.window.showErrorMessage(`Ricwiz: Error parsing ricwiz.json: ${l.message}`)}if(s.length>0){if(!o?.forcePrompt)try{let{exec:m}=(S(),I(Te)),{stdout:a}=await m("git branch --show-current",{cwd:e}),i=a.trim(),n=i;i.includes("-to-")&&(n=i.split("-to-")[0]);let{stdout:c}=await m(`git config branch.${n}.ricwiz-profile`,{cwd:e}),u=c.trim();if(u){let h=s.find(g=>g.name===u);if(h)return new t(h)}}catch{}if(o?.skipPrompt)return new t;let l=s.map(m=>m.name),d=await Ae.window.showQuickPick(l,{placeHolder:"Ricwiz: Select Workflow Profile",ignoreFocusOut:!0});if(!d)return;let p=s.find(m=>m.name===d);return new t(p)}return new t}buildUpstreamPath(e){return e.includes("/")?e:`${this.upstreamRemote}/${e}`}getFetchRemote(e){return e.includes("/")?e.split("/")[0]:this.upstreamRemote}getFetchBranch(e){return e.includes("/")?e.substring(e.indexOf("/")+1):e}}});async function Pt(){let t=x();if(!t){V.window.showErrorMessage("Ricwiz: Open a workspace that is a Git repository.");return}let e=await M.initialize(t,{skipPrompt:!0}),o=e?e.ticketSourceBranch:V.workspace.getConfiguration("ricwiz").get("ticketSourceBranch","main"),s=e?e.originRemote:"origin";await V.window.withProgress({location:V.ProgressLocation.Notification,title:`Ricwiz: Finding deleted files compared to ${s}/${o}...`,cancellable:!1},async()=>{try{let{stdout:r}=await f(`git diff --name-only --diff-filter=D ${s}/${o}...HEAD`,{cwd:t}),l=r.split(`
`).map(u=>u.trim()).filter(u=>u.length>0);if(l.length===0){V.window.showInformationMessage(`Ricwiz: No deleted files found compared to ${s}/${o}.`);return}let d={},p=(u,h)=>{d[u]||(d[u]=[]),d[u].includes(h)||d[u].push(h)};for(let u of l){let h=u.replace(/\\/g,"/");if(h.includes("/classes/")){let g=h.match(/\/classes\/([^/.]+)\.cls/);g&&p("ApexClass",g[1])}else if(h.includes("/triggers/")){let g=h.match(/\/triggers\/([^/.]+)\.trigger/);g&&p("ApexTrigger",g[1])}else if(h.includes("/lwc/")){let g=h.match(/\/lwc\/([^/]+)\//);g&&p("LightningComponentBundle",g[1])}else if(h.includes("/aura/")){let g=h.match(/\/aura\/([^/]+)\//);g&&p("AuraDefinitionBundle",g[1])}else if(h.includes("/objects/")&&h.includes("/fields/")){let g=h.match(/\/objects\/([^/]+)\//),w=h.match(/\/fields\/([^/.]+)\.field/);g&&w&&p("CustomField",`${g[1]}.${w[1]}`)}else if(h.includes("/objects/")){let g=h.match(/\/objects\/([^/.]+)\.object/);g&&p("CustomObject",g[1])}else if(h.includes("/layouts/")){let g=h.match(/\/layouts\/([^/.]+)\.layout/);g&&p("Layout",g[1])}else if(h.includes("/flows/")){let g=h.match(/\/flows\/([^/.]+)\.flow/);g&&p("Flow",g[1])}else if(h.includes("/permissionsets/")){let g=h.match(/\/permissionsets\/([^/.]+)\.permissionset/);g&&p("PermissionSet",g[1])}else if(h.includes("/profiles/")){let g=h.match(/\/profiles\/([^/.]+)\.profile/);g&&p("Profile",g[1])}else if(h.includes("/customMetadata/")){let g=h.match(/\/customMetadata\/([^/.]+)\.md/);g&&p("CustomMetadata",g[1])}else if(h.includes("/flexipages/")){let g=h.match(/\/flexipages\/([^/.]+)\.flexipage/);g&&p("FlexiPage",g[1])}}if(Object.keys(d).length===0){V.window.showInformationMessage("Ricwiz: Found deleted files in Git, but none mapped to recognizable Salesforce metadata.");return}let m=`<?xml version="1.0" encoding="UTF-8"?>
<Package xmlns="http://soap.sforce.com/2006/04/metadata">
`;for(let u of Object.keys(d).sort()){m+=`    <types>
`;for(let h of d[u].sort())m+=`        <members>${h}</members>
`;m+=`        <name>${u}</name>
    </types>
`}m+=`    <version>58.0</version>
</Package>`;let a=Ve.join(t,"destructiveChanges");we.existsSync(a)||we.mkdirSync(a);let i=Ve.join(a,"destructiveChanges.xml"),n=Ve.join(a,"package.xml");we.writeFileSync(i,m,"utf8"),we.existsSync(n)||we.writeFileSync(n,`<?xml version="1.0" encoding="UTF-8"?>
<Package xmlns="http://soap.sforce.com/2006/04/metadata">
    <version>58.0</version>
</Package>`,"utf8");let c=await V.workspace.openTextDocument(i);await V.window.showTextDocument(c),V.window.showInformationMessage("Ricwiz: destructiveChanges.xml generated successfully!")}catch(r){V.window.showErrorMessage(`Ricwiz: Error generating destructive changes: ${r.message}`)}})}var V,Ve,we,Bt=z(()=>{"use strict";V=y(require("vscode")),Ve=y(require("path")),we=y(require("fs"));S();J()});async function Tt(){let t=x();if(!t)return;let e=await M.initialize(t,{skipPrompt:!0}),o=e?e.ticketSourceBranch:ae.workspace.getConfiguration("ricwiz").get("ticketSourceBranch","main"),s=e?e.originRemote:"origin";await ae.window.withProgress({location:ae.ProgressLocation.Notification,title:"Ricwiz: Finding Apex Tests to run...",cancellable:!1},async()=>{try{let{stdout:r}=await f(`git diff --name-status ${s}/${o}...HEAD`,{cwd:t}),l=r.split(`
`).map(u=>u.trim()).filter(u=>u.length>0),d=new Set,p=new Set;for(let u of l){let h=u.split(/\s+/);if(h[0].startsWith("D"))continue;let g=h[1];if(g&&g.endsWith(".cls")){let w=g.match(/\/classes\/([^/.]+)\.cls/);if(w){let v=w[1];v.toLowerCase().endsWith("test")?d.add(v):p.add(v)}}}for(let u of p)d.add(`${u}Test`);if(d.size===0){ae.window.showInformationMessage("Ricwiz: No Apex Classes were modified in this branch.");return}let m=Array.from(d).map(u=>({label:`$(beaker) ${u}`,description:"Apex Test Class"})),a=await ae.window.showQuickPick(m,{canPickMany:!0,title:"Select Test Classes to Run",placeHolder:"Select tests..."});if(!a||a.length===0)return;let n=`sf apex run test -n ${a.map(u=>u.label.replace("$(beaker) ","").trim()).join(",")} -r human -w 30`,c=ae.window.createTerminal("Ricwiz: Smart Tests");c.show(),c.sendText(n)}catch(r){ae.window.showErrorMessage(`Ricwiz: Error finding tests: ${r.message}`)}})}var ae,Et=z(()=>{"use strict";ae=y(require("vscode"));S();J()});var xe,Mt=z(()=>{"use strict";xe=class{static isValidShellArg(e){return e?/^[a-zA-Z0-9\-_/.]+$/.test(e):!1}}});async function Dt(t){let e=x();if(!e){A.window.showErrorMessage("Open a folder or workspace that is a Git repository.");return}let o=await M.initialize(e,{forcePrompt:!0});if(!o)return;let s=typeof t=="string"?t:void 0,r=await H(e,{prefix:o.ticketPrefix,suggestedValue:s});if(!r){A.window.showErrorMessage("Branch creation cancelled: Ticket not provided.");return}let{ticketId:l}=r,d=o.environments,p="all",m=[{label:"Create Main Branch & Environments",description:"Creates the main ticket branch and all environment branches",value:"all"},{label:"Create Main Branch Only",description:"Creates only the main ticket branch (skips environments)",value:"mainOnly"},{label:"Create Environments Only",description:"Creates only the environment branches (skip main branch)",value:"envs"}];if(d.length>0){let c=await A.window.showQuickPick(m,{placeHolder:"Ricwiz: What do you want to create?",ignoreFocusOut:!0});if(!c)return;p=c.value}let a=o.ticketSourceBranch;if(p==="all"||p==="mainOnly"){let c=[];try{let{stdout:w}=await f('git branch --all --format="%(refname:short)"',{cwd:e});c=w.split(`
`).map(v=>v.trim()).filter(v=>v&&v!=="origin"),c=[...new Set(c)]}catch{}let u=A.window.createQuickPick();u.title="Ricwiz: Ticket Source Branch",u.placeholder="Confirm or change the source branch for this ticket",u.value=o.ticketSourceBranch,u.ignoreFocusOut=!0;let h=()=>{let w=u.value.trim(),v=[];w&&v.push({label:w,description:"Use typed branch"}),v.push(...c.map(b=>({label:b}))),u.items=v};u.onDidChangeValue(h),h();let g=await new Promise(w=>{u.onDidAccept(()=>{let v=u.selectedItems[0];w(v?v.label:u.value),u.hide()}),u.onDidHide(()=>w(void 0)),u.show()});if(!g){A.window.showInformationMessage("Branch creation cancelled.");return}a=g.trim()}let i="";if(o.branchPrefix){let c=await A.window.showInputBox({prompt:"Ricwiz: Branch Prefix (leave empty to not use a prefix)",placeHolder:"e.g. CRC-R19-",value:o.branchPrefix,ignoreFocusOut:!0});if(c===void 0){A.window.showInformationMessage("Branch creation cancelled.");return}i=c.trim()}let n=i?`${i}${l}`:l;if(!xe.isValidShellArg(n)){A.window.showErrorMessage(`Invalid format for ticket ID: ${n}`);return}if(!xe.isValidShellArg(a)){A.window.showErrorMessage(`Invalid format for ticketSourceBranch in settings: ${a}`);return}for(let c of d){if(!xe.isValidShellArg(c.name)){A.window.showErrorMessage(`Invalid format for environment name in settings: ${c.name}`);return}if(!xe.isValidShellArg(c.sourceBranch)){A.window.showErrorMessage(`Invalid format for environment sourceBranch in settings: ${c.sourceBranch}`);return}}try{await f("git status",{cwd:e})}catch{A.window.showErrorMessage("The opened folder does not appear to be a valid Git repository.");return}try{await A.window.withProgress({location:A.ProgressLocation.Notification,title:"Ricwiz: Creating Branches",cancellable:!1},async c=>{let u=[];c.report({message:"Checking remote status (git fetch)...",increment:10});try{await f("git fetch",{cwd:e})}catch{}try{if(p==="all"||p==="mainOnly"){if(c.report({message:`Creating main branch ${n}...`,increment:10}),await he(e,n))A.window.showInformationMessage(`Ricwiz: The branch ${n} already exists. Skipping creation...`),await f(`git checkout ${n}`,{cwd:e});else try{let h=o.getFetchRemote(a),g=o.getFetchBranch(a),w=o.buildUpstreamPath(a);await f(`git fetch ${h} ${g}`,{cwd:e}),await f(`git checkout -b ${n} ${w}`,{cwd:e}),u.push(n)}catch{try{await f(`git checkout -b ${n} ${a}`,{cwd:e}),u.push(n)}catch{throw new Error(`Could not create main branch '${n}' from '${a}'. Does the source branch exist?`)}}try{await f(`git config branch.${n}.ricwiz-source "${a}"`,{cwd:e}),o.profileName&&await f(`git config branch.${n}.ricwiz-profile "${o.profileName}"`,{cwd:e})}catch{}}if(p==="all"||p==="envs"){let h=50/(d.length||1);for(let g of d){let w=i?`${i}${l}-to-${g.name}`:`${l}-to-${g.name}`,v=g.sourceBranch;if(c.report({message:`Processing environment branch ${w}...`,increment:h}),!await he(e,w))try{let b=o.buildUpstreamPath(v);await f(`git checkout -b ${w} ${b}`,{cwd:e}),u.push(w)}catch{try{await f(`git checkout -b ${w} ${v}`,{cwd:e}),u.push(w)}catch{throw new Error(`Could not create environment branch '${w}' from '${v}'. Does the source branch exist?`)}}}}c.report({message:`Publishing branches to ${o.originRemote}...`,increment:10});for(let h of u)try{await f(`git push -u ${o.originRemote} ${h}`,{cwd:e})}catch{A.window.showWarningMessage(`Ricwiz: Branch ${h} was created locally but could not be pushed to ${o.originRemote}.`)}if(p==="all"||p==="mainOnly"){c.report({message:`Switching to ${n}...`,increment:10});try{await f(`git checkout ${n}`,{cwd:e})}catch{}}c.report({increment:100}),A.window.showInformationMessage("Ricwiz: All set! You can start working on your branches! \u{1F680}")}catch(h){if(A.window.showErrorMessage(`Ricwiz Branch Creation Failed: ${h.message}`),u.length>0){try{await f(`git checkout ${a}`,{cwd:e})}catch{}for(let g of u)try{await f(`git branch -D ${g}`,{cwd:e})}catch{}A.window.showWarningMessage(`Ricwiz: Rolled back (deleted) ${u.length} branch(es) locally due to failure.`)}}})}catch(c){A.window.showErrorMessage(`Ricwiz general error: ${c.message}`)}}var A,Lt=z(()=>{"use strict";A=y(require("vscode"));S();Mt();J()});async function ke(t,e,o,s){s&&s.report({message:"CONFLICT! Resolve & click 'Commit & Continue' in Ricwiz panel."});let r=!1,l=!1,d=async()=>{try{let{stdout:i}=await f("git status --porcelain",{cwd:t});return i.split(`
`).filter(n=>{let c=n.substring(0,2);return["UD","DU","DD","AU","UA"].includes(c)}).map(n=>n.substring(3).trim())}catch{return[]}},p=async()=>{try{let{stdout:i}=await f("git status --porcelain",{cwd:t}),n=c=>c==="UU"?"Both Modified":c==="UD"?"Deleted by them":c==="DU"?"Deleted by us":c==="DD"?"Both Deleted":c==="AA"?"Both Added":c==="AU"?"Added by us":c==="UA"?"Added by them":"Conflicted";return i.split(`
`).map(c=>c.trimRight()).filter(c=>c.length>2).filter(c=>{let u=c.substring(0,2);return["UU","AA","UD","DU","AU","UA","DD"].includes(u)}).map(c=>{let u=c.substring(0,2);return{file:c.substring(3).trim(),state:n(u)}})}catch{return[]}},m=async()=>{if(r)return;let i=await d(),n=await p(),{webviewProvider:c}=(Qe(),I(_e));c&&c.setConflictState({isConflict:!0,sourceStr:e,targetStr:o,deletionsCount:i.length,files:n})},a=ce.commands.registerCommand("ricwiz.conflictAction",async i=>{if(i==="abortDeploy")l=!0;else if(i==="resolveDeletions"){try{let c=(await d()).map(h=>({label:h})),u=await ce.window.showQuickPick(c,{canPickMany:!0,placeHolder:"Select conflicted files to DELETE",title:"Ricwiz: Delete Conflicted Files"});if(u&&u.length>0){for(let h of u)try{await f(`git rm --force "${h.label}"`,{cwd:t})}catch{}ce.window.showInformationMessage(`Ricwiz: Deleted ${u.length} conflicted file(s).`)}}catch(n){ce.window.showErrorMessage(`Ricwiz: Error. (${n.message})`)}m()}else if(i==="commitAndContinue")try{let c=(await d()).filter(h=>At.existsSync(It.join(t,h)));if(c.length>0&&await ce.window.showWarningMessage(`Wait! There are ${c.length} file(s) with deletion conflicts that are still on your disk.

If you commit now, you will KEEP them in the project.

Are you sure you want to KEEP them?`,{modal:!0},"Yes, KEEP them","No, let me DELETE them")!=="Yes, KEEP them"){m();return}let u=!1;try{let{stdout:h}=await f('git grep -E "^<<<<<<< "',{cwd:t});h.trim().length>0&&(u=!0)}catch{}if(u){ce.window.showErrorMessage("Ricwiz: You still have unresolved conflict markers (<<<<<<<) in your files. Please resolve them first!"),m();return}await f("git add .",{cwd:t}),await f("git commit --no-edit",{cwd:t})}catch(n){ce.window.showErrorMessage(`Ricwiz: Could not commit automatically. (${n.message})`),m()}});for(m();;){if(l){r=!0,a.dispose(),(Qe(),I(_e)).webviewProvider?.setConflictState(null);try{await f("git merge --abort",{cwd:t})}catch{}return!1}try{let{stdout:i}=await f("git status --porcelain",{cwd:t});if(i.trim().length===0)return r=!0,a.dispose(),(Qe(),I(_e)).webviewProvider?.setConflictState(null),ce.window.showInformationMessage("Ricwiz: Changes committed!"),!0}catch{}await new Promise(i=>setTimeout(i,2e3))}}var ce,At,It,Ye=z(()=>{"use strict";ce=y(require("vscode")),At=y(require("fs")),It=y(require("path"));S()});var et={};Le(et,{fetchMergeRequestStatus:()=>Xe,hasGitlabToken:()=>Ke,ricwizLogger:()=>W});async function Ke(){let t=await rt();return!!(t&&t.trim())}async function ri(t,e){let o=Ze.workspace.getConfiguration("ricwiz"),s=(await rt())?.trim();if(!s)throw new Error("No GitLab token");let r=e?e.getConfig("gitlabUrlOverride",""):o.get("gitlabUrlOverride",""),l=[];if(r&&r.trim()!=="")l.push(r.trim());else try{let{stdout:p}=await f("git remote",{cwd:t}),m=p.split(`
`).map(i=>i.trim()).filter(i=>i),a=[];e&&e.upstreamRemote&&m.includes(e.upstreamRemote)&&a.push(e.upstreamRemote),e&&e.originRemote&&e.originRemote!==e.upstreamRemote&&m.includes(e.originRemote)&&a.push(e.originRemote),m.includes("upstream")&&!a.includes("upstream")&&a.push("upstream"),m.includes("origin")&&!a.includes("origin")&&a.push("origin"),a.length===0&&m.length>0&&a.push(...m);for(let i of a)try{let{stdout:n}=await f(`git remote get-url ${i}`,{cwd:t}),c=n.trim();c.endsWith(".git")&&(c=c.slice(0,-4)),c.startsWith("git@")&&(c=c.replace("git@","").replace(":","/"),c=`https://${c}`),l.push(c)}catch(n){W.appendLine(`[GitLab API] Error getting remote URL for ${i}: ${n.message}`)}}catch(p){W.appendLine(`[GitLab API] Error getting remotes: ${p.message}`)}if(l.length===0)throw W.appendLine("[GitLab API] No candidate URLs found in getGitlabTargets!"),new Error("Could not get any remote origin URL.");return l.map(p=>{let m=new URL(p),a=`${m.protocol}//${m.host}`,i=m.pathname;i.startsWith("/")&&(i=i.substring(1)),i.endsWith("/")&&(i=i.slice(0,-1)),i.endsWith(".git")&&(i=i.slice(0,-4));let n=encodeURIComponent(i);return{baseUrl:a,token:s,projectPath:n}})}async function Ft(t,e,o,s,r){let l=new URL(`${e}${r}`);return W.appendLine(`[GitLab API] ${s} ${l.toString()}`),new Promise((d,p)=>{let m=Nt.request(l,{method:s,timeout:5e3,headers:{"PRIVATE-TOKEN":o,Accept:"application/json"}},a=>{let i="";a.on("data",n=>i+=n),a.on("end",()=>{if(W.appendLine(`[GitLab API] Response Code: ${a.statusCode}`),a.statusCode&&a.statusCode>=400)return W.appendLine(`[GitLab API] Error Data: ${i}`),p(new Error(`GitLab API error: ${a.statusCode}`));if(!i)return d({});try{let n=JSON.parse(i);Array.isArray(n)?W.appendLine(`[GitLab API] Returned array with ${n.length} items`):n&&typeof n=="object"&&W.appendLine(`[GitLab API] Returned object with id ${n.id||n.iid||"unknown"}`),d(n)}catch(n){W.appendLine(`[GitLab API] Parse Error: ${n.message}`),p(n)}})});m.on("timeout",()=>{m.destroy(),p(new Error("GitLab request timed out"))}),m.on("error",a=>{W.appendLine(`[GitLab API] Request Failed: ${a.message}`),p(a)}),m.end()})}async function Xe(t,e,o,s){W.appendLine(`[GitLab API] fetchMergeRequestStatus called for source: ${e}, target: ${o||"any"}`);let r=`${t}:${e}:${o||"any"}`,l=Ot.get(r);if(l&&Date.now()-l.timestamp<ai)return l.data;try{let d=await ri(t,s);for(let p of d)try{let m=`/api/v4/projects/${p.projectPath}/merge_requests?source_branch=${encodeURIComponent(e)}&order_by=updated_at&sort=desc`;o&&(m+=`&target_branch=${encodeURIComponent(o)}`);let a=await Ft(t,p.baseUrl,p.token,"GET",m);if(a&&a.length>0){let i=a[0];try{let u=await Ft(t,p.baseUrl,p.token,"GET",`/api/v4/projects/${p.projectPath}/merge_requests/${i.iid}`);u&&(i=u)}catch{}let n="none";if(i.head_pipeline&&i.head_pipeline.status){let u=i.head_pipeline.status;u==="success"||u==="failed"||u==="canceled"||u==="skipped"?n=u:n="running"}let c={isMerged:i.state==="merged",isOpen:i.state==="opened",pipelineStatus:n,webUrl:i.web_url};return Ot.set(r,{data:c,timestamp:Date.now()}),c}}catch(m){W.appendLine(`[GitLab API] Error inside target loop: ${m.message}`)}return null}catch(d){return W.appendLine(`[GitLab API] Failed to fetch MR status: ${d.message}`),null}}var Nt,Ze,W,Ot,ai,Ie=z(()=>{"use strict";Nt=y(require("https")),Ze=y(require("vscode"));ze();S();W=Ze.window.createOutputChannel("Ricwiz Debug");Ot=new Map,ai=30*1e3});var ve={};Le(ve,{findRelatedBranches:()=>mt,getCurrentBranchMergeStatus:()=>ct,getRecentCommits:()=>dt,getRecentTickets:()=>lt,getRelatedBranchesStatus:()=>at,resolveExistingBranchName:()=>ci});function Ut(t,e){return e.find(o=>t.endsWith(`-to-${o.name}`))}async function at(t,e,o,s,r){let l=await Ke();return await Promise.all(e.map(async p=>{let m=Ut(p,s);if(l){let a=m?m.sourceBranch:void 0,i=await Xe(t,p,a,r);if(i)return{name:p,isMerged:i.isMerged,pipelineStatus:i.pipelineStatus,mrUrl:i.webUrl}}else{let{ricwizLogger:a}=(Ie(),I(et));a.appendLine(`[GitLab API] Skipping MR check for ${p} because hasGitlabToken() is false`)}return{name:p,isMerged:!1}}))}async function ct(t,e,o,s){let r=Ut(e,o);if(!r)return!1;if(await Ke()){let l=await Xe(t,e,r.sourceBranch,s);if(l)return l.isMerged}else{let{ricwizLogger:l}=(Ie(),I(et));l.appendLine(`[GitLab API] Skipping MR check for current branch ${e} because hasGitlabToken() is false`)}return!1}async function dt(t,e=10){try{let{stdout:o}=await f(`git log --oneline -${e} --format="%h|||%s|||%ar"`,{cwd:t});return o.split(`
`).filter(s=>s.trim()).map(s=>{let r=s.split("|||");return{hash:r[0]||"",message:r.length>=3?r.slice(1,-1).join("|||"):r[1]||"",timeAgo:r.length>=3?r[r.length-1]:""}})}catch{return[]}}async function lt(t,e=3){try{let{stdout:o}=await f('git for-each-ref --sort=-committerdate --format="%(refname:short)" refs/heads/',{cwd:t}),s=o.split(`
`).map(l=>l.trim()).filter(l=>l),r=/^[A-Z]+-\d+$/i;return s.filter(l=>r.test(l)).slice(0,e)}catch{return[]}}async function mt(t,e,o){let{stdout:s}=await f(`git branch --all --list "*${e}*"`,{cwd:t}),r=new Set,l=new RegExp(`${e}(?!\\d)`,"i");return s.split(`
`).forEach(d=>{let p=d.replace("*","").trim();if(p){if(p.startsWith("remotes/")){let m=p.split("/");m.length>2&&(p=m.slice(2).join("/"))}p&&p!==o&&!p.includes("HEAD")&&l.test(p)&&r.add(p)}}),Array.from(r)}async function ci(t,e,o){try{let s=require("child_process"),l=require("util").promisify(s.exec),{stdout:d}=await l(`git branch --all --list "*${e}*"`,{cwd:t}),p=new RegExp(`${e}(?!\\d)`,"i"),m=d.split(`
`).map(i=>i.replace("*","").trim().replace(/^remotes\/[^\/]+\//,"")).filter(i=>i&&!i.includes("HEAD")&&p.test(i)),a=Array.from(new Set(m));if(o){let i=`-to-${o}`,n=a.find(c=>c.endsWith(i));return n||`${e}${i}`}else{let i=a.find(n=>!n.includes("-to-"));return i||e}}catch{return o?`${e}-to-${o}`:e}}var pe=z(()=>{"use strict";S();Ie()});async function jt(){let t=x();if(!t){q.window.showErrorMessage("Ricwiz: Open a folder or workspace that is a Git repository.");return}try{await f("git status",{cwd:t})}catch{q.window.showErrorMessage("Ricwiz: The opened folder does not appear to be a valid Git repository.");return}let e=await M.initialize(t);if(!e)return;let o=e.environments,s=await H(t,{prefix:e.ticketPrefix});if(!s){q.window.showErrorMessage("Operation cancelled: Ticket not provided.");return}let{ticketId:r,currentBranch:l}=s,{resolveExistingBranchName:d}=(pe(),I(ve)),p=await d(t,r);if(!await he(t,p)){q.window.showErrorMessage(`Ricwiz: Main branch '${p}' does not exist! Prepare deploy is only available when a main ticket branch is used.`);return}let m=e.getConfig("defaultReviewers",""),a="";try{let{stdout:i}=await f(`git config branch.${r}.ricwiz-reviewers`,{cwd:t});a=i.trim()}catch{}if(m.trim()){let i=await q.window.showInputBox({prompt:"Ricwiz: Reviewers for this deploy (optional, comma-separated)",placeHolder:"e.g. @joao, 123456",value:a||m,ignoreFocusOut:!0});if(i===void 0)return;try{i.trim()?await f(`git config branch.${r}.ricwiz-reviewers "${i.trim()}"`,{cwd:t}):a&&await f(`git config --unset branch.${r}.ricwiz-reviewers`,{cwd:t})}catch{}}await q.window.withProgress({location:q.ProgressLocation.Notification,title:"Ricwiz: Preparing Deploy",cancellable:!0},async(i,n)=>{let c=0,u=l,h=!1;n.onCancellationRequested(()=>{h=!0}),i.report({message:"Syncing remote information...",increment:10});try{await f("git fetch --all",{cwd:t});let w=10/(o.length||1);for(let v of o)try{if(h)throw new Error("Aborted");i.report({message:`Fetching ${v.sourceBranch}...`,increment:w});let b=e.getFetchRemote(v.sourceBranch),$=e.getFetchBranch(v.sourceBranch);await f(`git fetch ${b} ${$}:${$}`,{cwd:t})}catch{}}catch{}let g=60/(o.length||1);for(let w of o){if(h)break;let v=await d(t,r,w.name),b=w.sourceBranch;try{i.report({message:`Processing ${v}...`,increment:g/4}),await f(`git checkout ${v}`,{cwd:t});try{await f(`git pull ${e.originRemote} ${v}`,{cwd:t})}catch{}let $=async T=>{try{await f(`git merge ${T}`,{cwd:t})}catch(O){let oe=!1;try{let{stdout:le}=await f("git ls-files -u",{cwd:t});le.trim().length>0&&(oe=!0)}catch{}let Q=((O.stdout||"")+(O.stderr||"")+(O.message||"")).toLowerCase();if(oe||Q.includes("conflict")||Q.includes("conflit")){if(!await ke(t,T,v,i))throw h=!0,new Error("Deploy aborted by user.")}else throw O}};i.report({message:`Merging ${b} into ${v}...`,increment:g/4});let E=e.getFetchRemote(b),P=e.getFetchBranch(b),D=e.buildUpstreamPath(b);if(await f(`git fetch ${E} ${P}`,{cwd:t}),await $(D),i.report({message:`Merging ${p} into ${v}...`,increment:g/4}),await $(p),h)break;i.report({message:`Pushing ${v}...`,increment:g/4}),await f(`git push ${e.originRemote} ${v}`,{cwd:t}),c++}catch($){$.message.includes("aborted")?q.window.showInformationMessage("Ricwiz: Deploy cancelled."):q.window.showErrorMessage(`Ricwiz: Failed to process branch ${v}. Detail: ${$.message}`);return}}if(!h){i.report({message:"Finishing up...",increment:10});let w=u;try{await f(`git show-ref --verify --quiet refs/heads/${p}`,{cwd:t}),w=p}catch{}try{let v=await U(t);w&&w!==v?(await f(`git checkout ${w}`,{cwd:t}),q.window.showInformationMessage(`Ricwiz: Operation complete. Back on branch ${w}.`)):q.window.showInformationMessage("Ricwiz: Operation complete.")}catch{q.window.showInformationMessage("Ricwiz: Operation complete.")}}})}var q,Jt=z(()=>{"use strict";q=y(require("vscode"));S();Ye();J()});async function Wt(t=!1){let e=x();if(!e)return;let o=await M.initialize(e);if(!o)return;let s=await H(e,{prompt:"Enter the full ticket ID for the Merge Requests (e.g., SCPSCA-1234) or just the number"});if(!s)return;let{ticketId:r}=s,l=o.getConfig("gitlabUrlOverride",""),d="";if(l&&l.trim()!=="")d=l.trim().replace(/\/+$/,"");else{let i="";try{let n=o.upstreamRemote||"origin",{stdout:c}=await f(`git remote get-url ${n}`,{cwd:e});i=c.trim()}catch{ue.window.showErrorMessage("Ricwiz: Could not get the remote origin URL. Please configure the URL manually in the extension settings.");return}d=i,d.endsWith(".git")&&(d=d.slice(0,-4)),d.startsWith("git@")&&(d=d.replace("git@","").replace(":","/"),d=`https://${d}`)}let p=[],m=o.ticketSourceBranch;try{let{stdout:i}=await f(`git config branch.${r}.ricwiz-source`,{cwd:e});i.trim()&&(m=i.trim())}catch{}let{resolveExistingBranchName:a}=(pe(),I(ve));if(o.environments.length===0){let i=await a(e,r);p.push({source:i,target:m})}else for(let i of o.environments){let n=await a(e,r,i.name);p.push({source:n,target:i.sourceBranch})}for(let i of p){let n=`${d}/-/merge_requests/new?merge_request[source_branch]=${i.source}&merge_request[target_branch]=${i.target}`;t?ue.commands.executeCommand("simpleBrowser.show",n):ue.env.openExternal(ue.Uri.parse(n))}ue.window.showInformationMessage(`Ricwiz: Opening ${t?"VS Code browser":"external browser"} for Merge Requests!`)}async function qt(){return Wt(!1)}async function Gt(){return Wt(!0)}var ue,Ht=z(()=>{"use strict";ue=y(require("vscode"));S();J()});async function Vt(t=!1){let e=x();if(!e)return;let o=ie.workspace.getConfiguration("ricwiz"),s=o.get("jiraUrl","");if(!s||s.trim()===""){ie.window.showErrorMessage("Ricwiz: Jira URL is not configured. Please set it in the extension settings (e.g., https://jira.company.com/browse/).");return}let{getCurrentBranch:r,resolvePrefix:l,extractTicketSuggestion:d}=(S(),I(Te)),p=await r(e),m=o.get("ticketPrefix","SFPSCA-"),a=l(p,m),n=d(p,a,!0);if(n){let{normalizeTicketId:u}=(S(),I(Te));n=u(n,a)}else{let u=await H(e,{prompt:"Ricwiz could not detect the ticket from the branch name. Enter Jira ticket ID (e.g. SFPSCA-1234)",handleToSuffix:!0});if(!u)return;n=u.ticketId}let c=s.trim();c.endsWith("/")||(c+="/"),c+=n,t?ie.commands.executeCommand("simpleBrowser.show",c):ie.env.openExternal(ie.Uri.parse(c)),ie.window.showInformationMessage(`Ricwiz: Opening Jira Ticket ${n} in ${t?"VS Code":"browser"}!`)}async function _t(){return Vt(!1)}async function Qt(){return Vt(!0)}var ie,Yt=z(()=>{"use strict";ie=y(require("vscode"));S()});async function di(){let t=Kt.workspace.getConfiguration("ricwiz"),e=t.get("jiraUrl",""),o=t.get("jiraEmail","")?.trim(),s=(await yt())?.trim();if(!e||!s)throw new Error('Jira API Token is not securely configured. Please run the "Ricwiz: Set Secure Jira API Token" command.');let r=e;r.includes("/browse")&&(r=r.split("/browse")[0]),r.endsWith("/")&&(r=r.slice(0,-1));let l=o?`Basic ${Buffer.from(`${o}:${s}`).toString("base64")}`:`Bearer ${s}`;return{baseUrl:r,headerAuth:l}}async function Ee(t,e,o){let{baseUrl:s,headerAuth:r}=await di(),l=new URL(`${s}${e}`);return new Promise((d,p)=>{let m=Zt.request(l,{method:t,headers:{Authorization:r,Accept:"application/json",...o?{"Content-Type":"application/json"}:{}}},a=>{let i="";a.on("data",n=>i+=n),a.on("end",()=>{if(a.statusCode===401||a.statusCode===403)return p(new Error(`Authentication failed (HTTP ${a.statusCode}). Please check your Jira settings.`));if(a.statusCode&&a.statusCode>=400){let n="";try{let c=JSON.parse(i);c.errorMessages&&c.errorMessages.length>0&&(n=c.errorMessages.join(", "))}catch{}return a.statusCode===404||a.statusCode===410?p(new Error(`Ticket not found or deleted (HTTP ${a.statusCode}). ${n}`)):p(new Error(`Jira API returned HTTP status ${a.statusCode}. ${n}`))}if(!i)return d({});try{let n=JSON.parse(i);d(n)}catch{p(new Error("Failed to parse Jira response."))}})});m.on("error",a=>p(new Error(`Network error: ${a.message}`))),o&&m.write(JSON.stringify(o)),m.end()})}async function Me(t){let e=await Ee("GET",`/rest/api/2/issue/${t}`);return e&&e.fields?{summary:e.fields.summary||"",description:e.fields.description||"No description provided.",status:e.fields.status?.name||"Unknown"}:null}async function Xt(t){let e=await Ee("GET",`/rest/api/2/issue/${t}/transitions`);return e&&e.transitions?e.transitions.map(o=>({id:o.id,name:o.name})):[]}async function eo(t,e){await Ee("POST",`/rest/api/2/issue/${t}/transitions`,{transition:{id:e}})}async function to(t,e){await Ee("POST",`/rest/api/2/issue/${t}/comment`,{body:e})}async function oo(t,e){await Ee("PUT",`/rest/api/2/issue/${t}`,{update:{labels:[{add:e}]}})}async function io(t){let e=await Ee("POST","/rest/api/3/search/jql",{jql:t,maxResults:50,fields:["summary","status","assignee"]});return e&&e.issues?e.issues.map(o=>({key:o.key,summary:o.fields?.summary||"No Title",status:o.fields?.status?.name||"Unknown",assignee:o.fields?.assignee?.displayName||"Unassigned"})):[]}var Zt,Kt,Fe=z(()=>{"use strict";Zt=y(require("https")),Kt=y(require("vscode"));ze()});async function no(t){let e=x();if(e)try{let o=await M.initialize(e);if(!o)return;let s=await U(e),r=Pe(s,o.ticketPrefix),l=Be(s,r,!0);if(l||(l=s.split("-to-")[0]),!l){Y.window.showErrorMessage("Ricwiz: You are not currently on a valid ticket branch.");return}await Y.window.withProgress({location:Y.ProgressLocation.Notification,title:`Fetching details for ${l}...`,cancellable:!1},async d=>{let p=await Me(l);if(p){let m=[];try{let{findRelatedBranches:a,getRelatedBranchesStatus:i}=(pe(),I(ve)),n=Y.workspace.getConfiguration("ricwiz").get("environments",[{name:"Qual",sourceBranch:"quality"},{name:"Val",sourceBranch:"validation"},{name:"Prod",sourceBranch:"main"}]),c=await a(e,l,"");m=await i(e,c,l,n)}catch{}t.setJiraData({ticketId:l,relatedBranches:m,...p}),t.setPage("jira")}else Y.window.showErrorMessage("Ricwiz: No data found for this ticket.")})}catch(o){o.message.includes("securely configured")?await Y.window.showErrorMessage(o.message,"Set Token Now")==="Set Token Now"&&Y.commands.executeCommand("ricwiz.setJiraToken"):Y.window.showErrorMessage(`Ricwiz Jira Error: ${o.message}`)}}var Y,so=z(()=>{"use strict";Y=y(require("vscode"));S();J();Fe()});async function ro(t,e){let s=ne.workspace.getConfiguration("ricwiz").get("jiraDashboards",[]);if(e!==void 0&&(Ce=e),!s||s.length===0){t.setDashboardData({queries:[],selectedIndex:0,results:[],error:"No queries defined in settings. Go to Settings > Ricwiz > Jira Dashboards."}),t.setPage("dashboard");return}Ce>=s.length&&(Ce=0);let r=s[Ce];t.setDashboardData({queries:s,selectedIndex:Ce,results:[],error:"\u23F3 Loading tickets..."}),t.setPage("dashboard");try{let l=await io(r.jql),d=ne.workspace.workspaceFolders?.[0]?.uri.fsPath,p=[],m=t.getDashboardShowBranches();if(d)try{let i=require("child_process"),c=require("util").promisify(i.exec),{stdout:u}=await c("git branch",{cwd:d});p=u.split(`
`).map(h=>h.replace("*","").trim()).filter(h=>h)}catch{}let a=[];if(m&&d)try{let{findRelatedBranches:i,getRelatedBranchesStatus:n}=(pe(),I(ve)),{WorkflowContext:c}=(J(),I(St)),u=await c.initialize(d,{skipPrompt:!0}),h=u?.environments||ne.workspace.getConfiguration("ricwiz").get("environments",[{name:"Qual",sourceBranch:"quality"},{name:"Val",sourceBranch:"validation"},{name:"Prod",sourceBranch:"main"}]);a=await Promise.all(l.map(async g=>{let w=await i(d,g.key,""),v=await n(d,w,g.key,h,u);return{...g,detailedBranches:v}}))}catch{a=l}else a=l.map(i=>{let n=p.find(c=>c.includes(i.key));return{...i,branch:n||null}});t.setDashboardData({queries:s,selectedIndex:Ce,results:a,error:null}),t.setPage("dashboard")}catch(l){let d=l.message;(d.includes("ENOTFOUND")||d.includes("network"))&&(d="No Internet or Invalid URL"),t.setDashboardData({queries:s,selectedIndex:Ce,results:[],error:d}),t.setPage("dashboard")}}async function ao(t,e){await ne.window.withProgress({location:ne.ProgressLocation.Notification,title:`Fetching details for ${e}...`,cancellable:!1},async()=>{try{let o=await Me(e);if(o){let s=[],r=x();if(r)try{let{findRelatedBranches:l,getRelatedBranchesStatus:d}=(pe(),I(ve)),p=ne.workspace.getConfiguration("ricwiz").get("environments",[{name:"Qual",sourceBranch:"quality"},{name:"Val",sourceBranch:"validation"},{name:"Prod",sourceBranch:"main"}]),m=await l(r,e,"");s=await d(r,m,e,p)}catch{}t.setJiraData({ticketId:e,relatedBranches:s,...o}),t.setPage("jira")}else ne.window.showErrorMessage(`Ricwiz: No data found for ticket ${e}.`)}catch(o){ne.window.showErrorMessage(`Ricwiz Jira Error: ${o.message}`)}})}var ne,Ce,co=z(()=>{"use strict";ne=y(require("vscode"));Fe();S();Ce=0});async function pt(){let t=x();if(!t)return;let e=await M.initialize(t,{forcePrompt:!1});if(!e)return;let o=await U(t);if(!o)return;let s=Pe(o,e.ticketPrefix),r=Be(o,s,!0);return r||o.split("-to-")[0]}async function lo(){try{let t=await pt();if(!t){B.window.showErrorMessage("Ricwiz: You are not on a valid ticket branch.");return}let e=await B.window.withProgress({location:B.ProgressLocation.Notification,title:`Fetching available status for ${t}...`,cancellable:!1},()=>Xt(t));if(!e||e.length===0){B.window.showInformationMessage(`Ricwiz: No transitions available for ${t}.`);return}let o=e.map(r=>({label:r.name,id:r.id})),s=await B.window.showQuickPick(o,{placeHolder:`Select new status for ${t}`,ignoreFocusOut:!0});s&&(await B.window.withProgress({location:B.ProgressLocation.Notification,title:`Updating status to ${s.label}...`,cancellable:!1},()=>eo(t,s.id)),B.window.showInformationMessage(`Ricwiz: Status for ${t} updated to ${s.label}.`))}catch(t){t.message.includes("securely configured")?B.window.showErrorMessage(t.message,"Set Token Now").then(e=>{e==="Set Token Now"&&B.commands.executeCommand("ricwiz.setJiraToken")}):B.window.showErrorMessage(`Ricwiz Jira Error: ${t.message}`)}}async function mo(){try{let t=await pt();if(!t){B.window.showErrorMessage("Ricwiz: You are not on a valid ticket branch.");return}let e=await B.window.showInputBox({prompt:`Add comment to ${t}`,placeHolder:"Type your comment here...",ignoreFocusOut:!0});e&&(await B.window.withProgress({location:B.ProgressLocation.Notification,title:`Adding comment to ${t}...`,cancellable:!1},()=>to(t,e)),B.window.showInformationMessage(`Ricwiz: Comment added to ${t}.`))}catch(t){t.message.includes("securely configured")?B.window.showErrorMessage(t.message,"Set Token Now").then(e=>{e==="Set Token Now"&&B.commands.executeCommand("ricwiz.setJiraToken")}):B.window.showErrorMessage(`Ricwiz Jira Error: ${t.message}`)}}async function po(){try{let t=await pt();if(!t){B.window.showErrorMessage("Ricwiz: You are not on a valid ticket branch.");return}let e=await B.window.showInputBox({prompt:`Add a label to ${t}`,placeHolder:"e.g. Needs-Review, Bug, High-Priority",ignoreFocusOut:!0});e&&e.trim()&&(await B.window.withProgress({location:B.ProgressLocation.Notification,title:`Adding label to ${t}...`,cancellable:!1},()=>oo(t,e.trim())),B.window.showInformationMessage(`Ricwiz: Label '${e.trim()}' added to ${t}.`))}catch(t){t.message.includes("securely configured")?B.window.showErrorMessage(t.message,"Set Token Now").then(e=>{e==="Set Token Now"&&B.commands.executeCommand("ricwiz.setJiraToken")}):B.window.showErrorMessage(`Ricwiz Jira Error: ${t.message}`)}}async function uo(){let t=await B.window.showInputBox({prompt:"Enter your Jira API Token (or Personal Access Token). It will be securely stored in your OS keychain.",password:!0,ignoreFocusOut:!0});if(t)try{await bt(t.trim()),B.window.showInformationMessage("Ricwiz: Jira API Token securely stored!")}catch(e){B.window.showErrorMessage(`Ricwiz: Failed to store token: ${e.message}`)}}var B,go=z(()=>{"use strict";B=y(require("vscode"));S();J();Fe();ze()});async function fo(){let t=await _.window.showInputBox({prompt:"Enter your GitLab Personal Access Token",placeHolder:"glpat-xxxxxxxxxxxxxxxxxxxx",ignoreFocusOut:!0,password:!0});if(t&&t.trim()){let e=t.trim();await _.window.withProgress({location:_.ProgressLocation.Notification,title:"Ricwiz: Validating GitLab Token...",cancellable:!1},async()=>{try{let s=_.workspace.getConfiguration("ricwiz").get("gitlabUrlOverride","").trim();if(!s&&_.workspace.workspaceFolders)try{let{exec:m}=(S(),I(Te)),a=_.workspace.workspaceFolders[0].uri.fsPath,{stdout:i}=await m("git remote get-url origin",{cwd:a}),n=i.trim();n.startsWith("git@")&&(n=`https://${n.replace("git@","").replace(":","/")}`),n.endsWith(".git")&&(n=n.slice(0,-4)),s=n}catch{}s||(s="https://gitlab.com");let r=new URL(s),l=`${r.protocol}//${r.host}`,d=require("https"),p=await new Promise((m,a)=>{let i=d.request(new URL(`${l}/api/v4/user`),{method:"GET",timeout:5e3,headers:{"PRIVATE-TOKEN":e,Accept:"application/json"}},n=>{if(n.statusCode>=400)return a(new Error(`Status ${n.statusCode}`));let c="";n.on("data",u=>c+=u),n.on("end",()=>m(JSON.parse(c||"{}")))});i.on("error",a),i.on("timeout",()=>{i.destroy(),a(new Error("Timeout"))}),i.end()});await xt(e),_.window.showInformationMessage(`Ricwiz: \u2705 GitLab API Token saved and validated successfully for ${p.username||"user"}!`),_.commands.executeCommand("ricwiz.manualRefresh")}catch(o){_.window.showErrorMessage(`Ricwiz: \u274C Invalid token or cannot reach GitLab (${o.message}). Please check the token and try again.`)}})}}var _,ho=z(()=>{"use strict";_=y(require("vscode"));ze()});async function wo(){let t=x();if(!t){ge.window.showErrorMessage("Ricwiz: Open a folder or workspace that is a Git repository.");return}let e=await M.initialize(t);if(!e)return;let o=await H(t,{prefix:e.ticketPrefix,prompt:"Enter the full ticket ID to sync all branches for (e.g., SCPSCA-1234) or just the number"});if(!o)return;let{ticketId:s,currentBranch:r}=o;await ge.window.withProgress({location:ge.ProgressLocation.Notification,title:`Ricwiz: Syncing all branches for ${s}...`,cancellable:!1},async l=>{try{l.report({message:"Fetching from remote..."});try{await f("git fetch --all",{cwd:t})}catch{}let{stdout:d}=await f(`git branch --list "*${s}*"`,{cwd:t}),p=new RegExp(`${s}(?!\\d)`,"i"),m=d.split(`
`).map(n=>n.replace("*","").trim()).filter(n=>n.length>0&&p.test(n));if(m.length===0){ge.window.showWarningMessage(`Ricwiz: No local branches found for ${s}.`);return}let a=0,i=0;for(let n of m)if(l.report({message:`Syncing ${n}...`}),n===r)try{await f(`git pull ${e.originRemote} ${n}`,{cwd:t}),a++}catch(c){let u=!1;try{let{stdout:g}=await f("git ls-files -u",{cwd:t});g.trim().length>0&&(u=!0)}catch{}let h=((c.stdout||"")+(c.stderr||"")+(c.message||"")).toLowerCase();(u||h.includes("conflict")||h.includes("conflit"))&&await ke(t,`${e.originRemote}/${n}`,n,l)?a++:i++}else try{await f(`git fetch ${e.originRemote} ${n}:${n}`,{cwd:t}),a++}catch{try{await f(`git checkout ${n}`,{cwd:t});try{await f(`git pull ${e.originRemote} ${n}`,{cwd:t}),a++}catch(u){let h=!1;try{let{stdout:w}=await f("git ls-files -u",{cwd:t});w.trim().length>0&&(h=!0)}catch{}let g=((u.stdout||"")+(u.stderr||"")+(u.message||"")).toLowerCase();(h||g.includes("conflict")||g.includes("conflit"))&&await ke(t,`${e.originRemote}/${n}`,n,l)?a++:i++}await f(`git checkout ${r}`,{cwd:t})}catch{try{await f(`git checkout ${r}`,{cwd:t})}catch{}i++}}i>0?ge.window.showWarningMessage(`Ricwiz: Synced ${a}/${m.length} branches. ${i} branch(es) could not be synced (possible conflicts or diverged history).`):ge.window.showInformationMessage(`Ricwiz: \u{1F504} All ${a} branches for ${s} are up to date!`)}catch(d){ge.window.showErrorMessage(`Ricwiz: Sync failed: ${d.message}`)}})}var ge,vo=z(()=>{"use strict";ge=y(require("vscode"));S();Ye();J()});async function bo(){let t=x();if(!t){fe.window.showErrorMessage("Ricwiz: Open a folder or workspace that is a Git repository.");return}try{await f("git status",{cwd:t})}catch{fe.window.showErrorMessage("Ricwiz: The opened folder does not appear to be a valid Git repository.");return}let e=await M.initialize(t);if(!e)return;let o=e.environments,s=await H(t,{prefix:e.ticketPrefix});if(!s)return;let{ticketId:r,currentBranch:l}=s;await fe.window.withProgress({location:fe.ProgressLocation.Notification,title:"Ricwiz: Updating environment branches from their bases",cancellable:!0},async(d,p)=>{let m=0,a=l,i=!1;p.onCancellationRequested(()=>{i=!0}),d.report({message:"Syncing remote information...",increment:10});try{await f("git fetch --all",{cwd:t})}catch{}let n=80/(o.length||1);for(let c of o){if(i)break;let{resolveExistingBranchName:u}=(pe(),I(ve)),h=await u(t,r,c.name),g=c.sourceBranch;if(await he(t,h))try{d.report({message:`Processing ${h}...`,increment:n/2}),await f(`git checkout ${h}`,{cwd:t});try{d.report({message:`Merging ${g} into ${h}...`,increment:n/2});let w=e.getFetchRemote(g),v=e.getFetchBranch(g),b=e.buildUpstreamPath(g);await f(`git fetch ${w} ${v}`,{cwd:t}),await f(`git merge ${b}`,{cwd:t})}catch(w){let v=!1;try{let{stdout:$}=await f("git ls-files -u",{cwd:t});$.trim().length>0&&(v=!0)}catch{}let b=((w.stdout||"")+(w.stderr||"")+(w.message||"")).toLowerCase();if(v||b.includes("conflict")||b.includes("conflit")){let $=e.buildUpstreamPath(g);if(!await ke(t,$,h,d))throw i=!0,new Error("Update aborted by user.")}else throw w}if(i)break;m++}catch(w){w.message.includes("aborted")?fe.window.showInformationMessage("Ricwiz: Update cancelled."):fe.window.showErrorMessage(`Ricwiz: Failed to update branch ${h}. Detail: ${w.message}`);return}}if(!i){d.report({message:"Finishing up...",increment:10});try{let c=await U(t);a&&a!==c&&await f(`git checkout ${a}`,{cwd:t})}catch{}fe.window.showInformationMessage(`Ricwiz: Successfully updated ${m} environment branches from their bases!`)}})}var fe,yo=z(()=>{"use strict";fe=y(require("vscode"));S();Ye();J()});async function xo(){let t=x();if(!t){j.window.showErrorMessage("Ricwiz: Open a folder or workspace that is a Git repository.");return}let e=await U(t),o=j.workspace.getConfiguration("ricwiz");await j.window.withProgress({location:j.ProgressLocation.Notification,title:"Ricwiz: Scanning for unused local branches...",cancellable:!1},async()=>{try{await f("git fetch --prune",{cwd:t})}catch{}let s=[];try{let{stdout:n}=await f('git branch --format="%(refname:short)"',{cwd:t});s=n.split(`
`).map(c=>c.trim()).filter(c=>c.length>0)}catch{}if(s.length===0){j.window.showInformationMessage("Ricwiz: No local branches found.");return}let r=[];try{let{stdout:n}=await f('git branch -r --format="%(refname:short)"',{cwd:t});r=n.split(`
`).map(c=>c.trim().replace(/^origin\//,"").replace(/^[^\/]+\//,"")).filter(c=>c.length>0&&!c.includes("HEAD"))}catch{}let l=[];try{let{stdout:n}=await f('git for-each-ref --format="%(refname:short)|||%(upstream:track)" refs/heads/',{cwd:t});l=n.split(`
`).filter(c=>c.includes("[gone]")).map(c=>c.split("|||")[0].trim())}catch{}let d=s.filter(n=>!r.includes(n));if(d.length===0){j.window.showInformationMessage("Ricwiz: Your local repository is totally clean! All local branches exist on the remote.");return}let p=d.map(n=>{let c=l.includes(n),u=n===e,h="Not found on remote";return c&&(h="Deleted on remote [gone]"),u&&(h+=" (Current branch - will checkout main first)"),{label:n,description:h,picked:c&&!u}}),m=await j.window.showQuickPick(p,{canPickMany:!0,placeHolder:"Select local branches to delete",title:"Ricwiz: Delete Unused Branches"});if(!m||m.length===0){j.window.showInformationMessage("Ricwiz: No branches selected for deletion.");return}if(await j.window.showWarningMessage(`Ricwiz: Delete ${m.length} local branch(es)?
This cannot be undone!`,{modal:!0},"Yes, delete them")!=="Yes, delete them"){j.window.showInformationMessage("Ricwiz: Deletion cancelled.");return}let i=0;for(let n of m){let c=n.label;if(c===e){let u=o.get("ticketSourceBranch","main");try{await f(`git checkout ${u}`,{cwd:t}),e=u}catch{j.window.showWarningMessage(`Ricwiz: Could not switch away from ${c}. Skipping.`);continue}}try{await f(`git branch -D ${c}`,{cwd:t}),i++}catch{j.window.showWarningMessage(`Ricwiz: Could not delete local branch ${c}.`)}}j.window.showInformationMessage(`Ricwiz: \u{1F5D1}\uFE0F Cleaned up ${i} unused local branch(es).`)})}var j,ko=z(()=>{"use strict";j=y(require("vscode"));S()});async function De(t){let e=x();e&&await se.window.withProgress({location:se.ProgressLocation.Notification,title:`Ricwiz: Switching to ${t}...`,cancellable:!1},async()=>{try{let o=await U(e),s=!1;try{let{stdout:l}=await f("git status --porcelain",{cwd:e});s=l.trim().length>0}catch{}if(s&&o)try{await f(`git stash push --include-untracked -m "ricwiz-auto:${o}"`,{cwd:e}),se.window.showInformationMessage(`Ricwiz: \u{1F4E6} Stashed changes from ${o}`)}catch{se.window.showWarningMessage("Ricwiz: Could not stash changes. Checkout may fail if there are conflicts.")}let r=t;t.includes("/")&&(r=t.split("/").slice(1).join("/"));try{await f(`git checkout ${r}`,{cwd:e})}catch{let d="";if(t.includes("/"))d=t.split("/")[0];else{let{stdout:p}=await f("git branch -r",{cwd:e}),m=p.split(`
`).map(i=>i.trim()).filter(i=>i),a=[];for(let i of m){let n=i.split(" ")[0];n.endsWith(`/${r}`)&&a.push(n.substring(0,n.lastIndexOf("/")))}if(a.length===0){se.window.showErrorMessage(`Ricwiz: A branch "${r}" n\xE3o existe localmente nem em nenhuma remote!`);return}else if(a.length===1)d=a[0];else{let i=await M.initialize(e);a.includes("origin")?d="origin":i&&a.includes(i.upstreamRemote)?d=i.upstreamRemote:d=a[0]}}try{await f(`git fetch ${d} ${r}`,{cwd:e}),await f(`git checkout -b ${r} --track ${d}/${r}`,{cwd:e})}catch{se.window.showErrorMessage(`Ricwiz: Encontrou na remote ${d} mas falhou a fazer checkout.`);return}}try{let{stdout:l}=await f("git stash list",{cwd:e}),d=l.split(`
`);for(let p=0;p<d.length;p++)if(d[p].includes(`ricwiz-auto:${r}`)){let m=d[p].match(/stash@\{(\d+)\}/);m&&(await f(`git stash pop stash@{${m[1]}}`,{cwd:e}),se.window.showInformationMessage(`Ricwiz: \u{1F4E6} Restored stashed changes on ${r}`));break}}catch{se.window.showWarningMessage(`Ricwiz: Could not restore stashed changes on ${r}. You may need to resolve conflicts manually (check git stash list).`)}}catch{se.window.showErrorMessage(`Ricwiz: Could not checkout branch ${t}.`)}})}var se,tt=z(()=>{"use strict";se=y(require("vscode"));S();J()});async function Co(){let t=x();if(t)try{let{stdout:e}=await f("git branch --show-current",{cwd:t}),o=e.trim();o&&(await Oe.env.clipboard.writeText(o),Oe.window.showInformationMessage(`Ricwiz: \u{1F4CB} Copied "${o}" to clipboard`))}catch{Oe.window.showErrorMessage("Ricwiz: Could not get the current branch name.")}}var Oe,$o=z(()=>{"use strict";Oe=y(require("vscode"));S()});async function zo(){let t=x();if(!t){Z.window.showErrorMessage("Ricwiz: Open a folder or workspace that is a Git repository.");return}let e=Z.workspace.getConfiguration("ricwiz"),o=e.get("ticketSourceBranch","main"),r=e.get("packageXmlCommand",'sf sgd source delta --to "HEAD" --from "origin/{baseBranch}" --output-dir "."').replace("{baseBranch}",o);await Z.window.showWarningMessage("Are you sure you want to generate the package.xml? This may overwrite existing local manifest files.",{modal:!0},"Yes, Generate")==="Yes, Generate"&&await Z.window.withProgress({location:Z.ProgressLocation.Notification,title:"Ricwiz: Generating package.xml using Salesforce CLI...",cancellable:!1},async()=>{try{await f(r,{cwd:t,maxBuffer:10*1024*1024}),Z.window.showInformationMessage("Ricwiz: Successfully generated package.xml!");let d=ot.join(t,"package","package.xml"),p=ot.join(t,"package.xml"),m=ot.join(t,"manifest","package.xml");for(let a of[d,p,m])if(Ro.existsSync(a)){let i=await Z.workspace.openTextDocument(a);await Z.window.showTextDocument(i);break}}catch(d){Z.window.showErrorMessage(`Ricwiz: Error running sf command - ${d.message}`)}})}var Z,ot,Ro,So=z(()=>{"use strict";Z=y(require("vscode")),ot=y(require("path")),Ro=y(require("fs"));S()});async function Po(){let t=x();if(!t){K.window.showErrorMessage("Ricwiz: Open a folder or workspace that is a Git repository.");return}let o=K.workspace.getConfiguration("ricwiz").get("deployCommand","sf project deploy start --manifest package/package.xml --post-destructive-changes destructiveChanges/destructiveChanges.xml -c -l NoTestRun -g");await K.window.showWarningMessage("Are you sure you want to deploy to Salesforce? This action modifies your org and cannot be easily undone.",{modal:!0},"Yes, Deploy")==="Yes, Deploy"&&await K.window.withProgress({location:K.ProgressLocation.Notification,title:"Ricwiz: Deploying package...",cancellable:!1},async()=>{try{let{stdout:r,stderr:l}=await f(o,{cwd:t,maxBuffer:52428800}),d=K.window.createOutputChannel("Ricwiz Deploy");d.appendLine(`Executing: ${o}`),d.appendLine(r),l&&(d.appendLine("--- STDERR ---"),d.appendLine(l)),d.show(),K.window.showInformationMessage("Ricwiz: Successfully ran deploy command!")}catch(r){let l=K.window.createOutputChannel("Ricwiz Deploy");l.appendLine(`Error executing: ${o}`),r.stdout&&l.appendLine(r.stdout),r.stderr&&l.appendLine(r.stderr),l.appendLine(r.message),l.show(),K.window.showErrorMessage("Ricwiz: Error running deploy command. See output channel for details.")}})}var K,Bo=z(()=>{"use strict";K=y(require("vscode"));S()});async function To(){let t=x();if(!t){X.window.showErrorMessage("Ricwiz: Open a folder or workspace that is a Git repository.");return}let o=X.workspace.getConfiguration("ricwiz").get("importDataCommand","sfdx force:data:tree:import --plan data/plan.json");await X.window.showWarningMessage("Are you sure you want to import data into Salesforce? This action modifies records in your org.",{modal:!0},"Yes, Import")==="Yes, Import"&&await X.window.withProgress({location:X.ProgressLocation.Notification,title:"Ricwiz: Importing data...",cancellable:!1},async()=>{try{let{stdout:r,stderr:l}=await f(o,{cwd:t,maxBuffer:52428800}),d=X.window.createOutputChannel("Ricwiz Import Data");d.appendLine(`Executing: ${o}`),d.appendLine(r),l&&(d.appendLine("--- STDERR ---"),d.appendLine(l)),d.show(),X.window.showInformationMessage("Ricwiz: Successfully ran import data command!")}catch(r){let l=X.window.createOutputChannel("Ricwiz Import Data");l.appendLine(`Error executing: ${o}`),r.stdout&&l.appendLine(r.stdout),r.stderr&&l.appendLine(r.stderr),l.appendLine(r.message),l.show(),X.window.showErrorMessage("Ricwiz: Error running import data command. See output channel for details.")}})}var X,Eo=z(()=>{"use strict";X=y(require("vscode"));S()});async function Mo(){let t=x();if(!t){ee.window.showErrorMessage("Ricwiz: Open a folder or workspace that is a Git repository.");return}let e=await M.initialize(t,{skipPrompt:!0}),o=e?e.ticketSourceBranch:ee.workspace.getConfiguration("ricwiz").get("ticketSourceBranch","main"),s=e?e.originRemote:"origin",r="";try{r=await U(t)}catch{}let l=await ee.window.showInputBox({prompt:`Enter the branch name to list modified files (compared to ${o})`,value:r,placeHolder:"SFPSCA-1234"});if(!l)return;let{extractTicketSuggestion:d,resolvePrefix:p}=(S(),I(Te)),{ricwizLogger:m}=(Ie(),I(et));await ee.window.withProgress({location:ee.ProgressLocation.Notification,title:`Ricwiz: Finding files for ${l}...`,cancellable:!1},async()=>{try{let a=p(e,t),i=d(l,a,!0)||l.replace(/-to-[a-zA-Z0-9]+$/i,""),{resolveExistingBranchName:n}=(pe(),I(ve)),c=await n(t,i);m.appendLine(`[ListTicketFiles] targetBranch (raw): ${l}, resolvedTargetBranch: ${c}, ticketId: ${i}, originRemote: ${s}, sourceBranch: ${o}`);let u=[];try{let P="";try{m.appendLine(`[ListTicketFiles] Running: git merge-base ${s}/${o} ${c}`);let{stdout:D}=await f(`git merge-base ${s}/${o} ${c}`,{cwd:t});P=D.trim()}catch(D){m.appendLine(`[ListTicketFiles] First merge-base failed: ${D.message}`),m.appendLine(`[ListTicketFiles] Running: git merge-base ${o} ${c}`);let{stdout:T}=await f(`git merge-base ${o} ${c}`,{cwd:t});P=T.trim()}if(P){m.appendLine(`[ListTicketFiles] Merge base found: ${P}. Running git diff...`);let{stdout:D}=await f(`git diff --name-only ${P} ${c}`,{cwd:t,maxBuffer:10*1024*1024});u=D.split(`
`).map(T=>T.trim()).filter(T=>T.length>0),m.appendLine(`[ListTicketFiles] diff found ${u.length} files.`)}}catch(P){m.appendLine(`[ListTicketFiles] Diff strategy failed: ${P.message}`)}let h=[];try{m.appendLine(`[ListTicketFiles] Running git log fallback for ticketId: ${i}`);let{stdout:P}=await f(`git --no-pager log --grep="\\b${i}\\b" -i -E --name-only -m --first-parent --format=""`,{cwd:t,maxBuffer:10*1024*1024});h=P.split(`
`).map(D=>D.trim()).filter(D=>D.length>0),m.appendLine(`[ListTicketFiles] git log found ${h.length} files.`)}catch(P){m.appendLine(`[ListTicketFiles] Git log fallback failed: ${P.message}`)}let g=[...u,...h];if(g.length===0){ee.window.showInformationMessage(`Ricwiz: No modified files found for ${l}.`);return}let w=Array.from(new Set(g)).sort(),v={};for(let P of w){let D=P.match(/default\/([^/]+)/),T=D&&D[1]?D[1].toUpperCase():"OUTROS";v[T]||(v[T]=[]),v[T].push(P)}let b=`Files modified in branch ${l}:
`,$=Object.keys(v).sort();for(let P of $)b+=`
=== ${P} ===
`,b+=v[P].join(`
`)+`
`;let E=await ee.workspace.openTextDocument({content:b,language:"plaintext"});await ee.window.showTextDocument(E)}catch(a){ee.window.showErrorMessage(`Ricwiz: Error running git log - ${a.message}`)}})}var ee,Do=z(()=>{"use strict";ee=y(require("vscode"));S();J()});async function Lo(){let t=x();if(!t){re.window.showErrorMessage("Ricwiz: Open a folder or workspace that is a Git repository.");return}let o=re.workspace.getConfiguration("ricwiz").get("resetTrackingCommand","sf org disable tracking && sf project reset tracking --no-prompt");await re.window.withProgress({location:re.ProgressLocation.Notification,title:"Ricwiz: Resetting tracking...",cancellable:!1},async()=>{try{let{stdout:s,stderr:r}=await f(o,{cwd:t,maxBuffer:52428800}),l=re.window.createOutputChannel("Ricwiz Reset Tracking");l.appendLine(`Executing: ${o}`),l.appendLine(s),r&&(l.appendLine("--- STDERR ---"),l.appendLine(r)),l.show(),re.window.showInformationMessage("Ricwiz: Successfully reset tracking!")}catch(s){let r=re.window.createOutputChannel("Ricwiz Reset Tracking");r.appendLine(`Error executing: ${o}`),s.stdout&&r.appendLine(s.stdout),s.stderr&&r.appendLine(s.stderr),r.appendLine(s.message),r.show(),re.window.showErrorMessage("Ricwiz: Error resetting tracking. See output channel for details.")}})}var re,Ao=z(()=>{"use strict";re=y(require("vscode"));S()});async function Io(){let t=x();if(!t){te.window.showErrorMessage("Ricwiz: Open a workspace first.");return}let e=["ApexClass","ApexTrigger","CustomObject","CustomField","LightningComponentBundle","AuraDefinitionBundle","Flow","CustomLabel","CustomMetadata","StaticResource","Profile","PermissionSet","PermissionSetGroup","Layout","ValidationRule","RecordType","ListView","Report","EmailTemplate","Other (Type manually)..."],o=await te.window.showQuickPick(e,{placeHolder:"Select Metadata Type to extract (e.g., ApexClass)",ignoreFocusOut:!0});if(!o||o==="Other (Type manually)..."&&(o=await te.window.showInputBox({prompt:"Enter Metadata Type (e.g., CustomApplication, Queue)",ignoreFocusOut:!0}),!o))return;let s={ApexClass:"**/*.cls",ApexTrigger:"**/*.trigger",CustomObject:"**/*.{object,object-meta.xml}",CustomField:"**/*.field-meta.xml",LightningComponentBundle:"**/lwc/*/*.js",AuraDefinitionBundle:"**/aura/*/*.cmp",Flow:"**/*.flow-meta.xml",CustomLabel:"**/*.labels-meta.xml",CustomMetadata:"**/*.md-meta.xml",StaticResource:"**/*.resource-meta.xml",Profile:"**/*.profile-meta.xml",PermissionSet:"**/*.permissionset-meta.xml",PermissionSetGroup:"**/*.permissionsetgroup-meta.xml",Layout:"**/*.layout-meta.xml",ValidationRule:"**/*.validationRule-meta.xml",RecordType:"**/*.recordType-meta.xml",ListView:"**/*.listView-meta.xml"},r=[],l=s[o];if(l)try{r=(await te.workspace.findFiles(l,"**/node_modules/**")).map(m=>{let a=m.fsPath.split(/[\\/]/).pop()||"";if(o==="LightningComponentBundle"||o==="AuraDefinitionBundle"){let i=m.fsPath.split(/[\\/]/);return i[i.length-2]||a.split(".")[0]}return a.split(".")[0]}),r=[...new Set(r)].sort()}catch{}let d=await new Promise(p=>{let m=te.window.createQuickPick();m.title=`Extract ${o}`,m.placeholder="Type name (e.g. MyComponent) or * for all",m.ignoreFocusOut=!0,m.matchOnDescription=!0;let a=()=>{let i=m.value.trim(),n=[];i?n.push({label:`$(cloud-download) Extract "${i}"`,description:"Extract exact name from Salesforce",alwaysShow:!0}):n.push({label:'$(cloud-download) Extract "*" (All)',description:`Extract all ${o}s`,alwaysShow:!0}),r.forEach(c=>{(!i||c.toLowerCase().includes(i.toLowerCase()))&&n.push({label:c,description:"Local workspace component"})}),m.items=n};m.onDidChangeValue(()=>a()),m.onDidAccept(()=>{let i=m.selectedItems[0];if(i){let n=i.label;n.startsWith('$(cloud-download) Extract "')?n=n.replace('$(cloud-download) Extract "',"").replace('" (All)',"").replace('"',""):n==='$(cloud-download) Extract "*" (All)'&&(n="*"),m.hide(),p(n)}}),m.onDidHide(()=>{m.dispose(),p(void 0)}),a(),m.show()});d&&await te.window.withProgress({location:te.ProgressLocation.Notification,title:`Ricwiz: Extracting ${o}:${d} from Salesforce...`,cancellable:!0},async(p,m)=>{try{N.show(!0);let a=`${o}:${d}`,{stdout:i,stderr:n}=await f(`sf project retrieve start -m "${a}"`,{cwd:t});i&&N.appendLine(i),n&&N.appendLine(n),te.window.showInformationMessage(`Ricwiz: Successfully extracted ${a}.`)}catch(a){N.appendLine(`ERROR: ${a.message}`),a.stdout&&N.appendLine(a.stdout),a.stderr&&N.appendLine(a.stderr),te.window.showErrorMessage("Ricwiz: Extraction failed. See Output channel for details.")}})}var te,Fo=z(()=>{"use strict";te=y(require("vscode"));S()});async function No(){let t=G.window.activeTextEditor;if(!t){G.window.showErrorMessage("Ricwiz: Please open the file you want to deploy in the editor first.");return}let e=t.document.uri.fsPath,o=x();if(!o)return;let s="";if(await G.window.withProgress({location:G.ProgressLocation.Notification,title:"Ricwiz: Fetching available Salesforce orgs...",cancellable:!1},async()=>{try{let{stdout:m}=await f("sf org list --json",{cwd:o});s=m}catch(m){s=m.stdout||""}}),!s){G.window.showErrorMessage("Ricwiz: Failed to fetch orgs. Is Salesforce CLI installed?");return}let r=[];try{let m=JSON.parse(s),a=m.result?.nonScratchOrgs||[],i=m.result?.scratchOrgs||[];r=[...a,...i]}catch{G.window.showErrorMessage("Ricwiz: Failed to parse org list.");return}if(r.length===0){G.window.showInformationMessage("Ricwiz: No authenticated orgs found.");return}let l=r.map(m=>({label:m.alias||m.username,description:m.alias?m.username:"",picked:m.isDefaultUsername})),d=await G.window.showQuickPick(l,{placeHolder:"Select the org(s) to deploy this file to",canPickMany:!0,ignoreFocusOut:!0});if(!d||d.length===0)return;let p=Oo.basename(e);await G.window.withProgress({location:G.ProgressLocation.Notification,title:`Ricwiz: Deploying ${p} to ${d.length} org(s)...`,cancellable:!1},async()=>{N.show(!0),N.appendLine(`--- Starting Parallel Deploy of ${p} ---`);let m=d.map(async c=>{let u=c.label;N.appendLine(`[${u}] Deploying...`);try{let{stdout:h,stderr:g}=await f(`sf project deploy start -d "${e}" -o "${u}"`,{cwd:o});return N.appendLine(`[${u}] \u2705 Success`),h&&N.appendLine(h),{org:u,success:!0}}catch(h){return N.appendLine(`[${u}] \u274C Failed`),h.stdout&&N.appendLine(h.stdout),h.stderr&&N.appendLine(h.stderr),{org:u,success:!1}}}),a=await Promise.all(m),i=a.filter(c=>c.success).length,n=a.filter(c=>!c.success).length;n===0?G.window.showInformationMessage(`Ricwiz: Successfully deployed to all ${i} orgs!`):G.window.showErrorMessage(`Ricwiz: Deploy finished with errors (${i} success, ${n} failed). Check Output channel.`)})}var G,Oo,Uo=z(()=>{"use strict";G=y(require("vscode")),Oo=y(require("path"));S()});async function jo(){let t=x();if(!t){F.window.showErrorMessage("Ricwiz: Open a folder or workspace that is a Git repository.");return}let e=F.workspace.getConfiguration("ricwiz"),o=e.get("auditUsername",""),s=e.get("auditHours",8),r=await F.window.showInputBox({prompt:"Enter your Salesforce Username to query in SetupAuditTrail",value:o,placeHolder:"admin@tuaorg.com"});if(!r)return;let l=await F.window.showInputBox({prompt:"How many hours back do you want to search?",value:s.toString(),placeHolder:"8"});if(!l)return;let d=parseFloat(l);if(isNaN(d)||d<=0){F.window.showErrorMessage("Ricwiz: Invalid hours specified.");return}let p=new Date(Date.now()-d*60*60*1e3).toISOString(),a=`sf data query -q "${`SELECT Action, Display, Section FROM SetupAuditTrail WHERE CreatedBy.Username = '${r}' AND CreatedDate >= ${p}`}" --json`;await F.window.withProgress({location:F.ProgressLocation.Notification,title:"Ricwiz: Interrogating Setup Audit Trail...",cancellable:!1},async()=>{try{let{stdout:i}=await f(a,{cwd:t,maxBuffer:52428800}),n=JSON.parse(i);if(!n.result||n.result.records.length===0){F.window.showInformationMessage(`Ricwiz: No changes found for ${r} in the last ${d} hours.`);return}let c=n.result.records,u=[],h=new Set;for(let T of c){let O=li(T.Action,T.Display,T.Section);if(O){let oe=`${O.isDelete?"DEL":"ADD"}-${O.metadataFormat}`;if(!h.has(oe)){h.add(oe);let Q=O.isDelete?"$(trash)":"$(plus)";u.push({label:`${Q} ${O.metadataFormat}`,description:`${T.Action} -> ${T.Display}`,metadataFormat:O.metadataFormat,isDelete:O.isDelete})}}}if(u.length===0){F.window.showInformationMessage(`Ricwiz: No extractable metadata changes found for ${r} in the last ${d} hours (ignored passwords/logins).`);return}let g=await F.window.showQuickPick(u,{canPickMany:!0,placeHolder:"Select the changes you want to extract to GitLab",ignoreFocusOut:!0});if(!g||g.length===0){F.window.showInformationMessage("Ricwiz: No changes selected.");return}let w=g.filter(T=>T.isDelete),v=g.filter(T=>!T.isDelete),b=F.window.createOutputChannel("Ricwiz Admin Bridge");if(b.show(),w.length>0){let{stdout:T}=await f("git ls-files",{cwd:t}),O=T.split(`
`).map(Q=>Q.trim()),oe=0;for(let Q of w){let le=Q.metadataFormat.split(":"),Je=le[0],We=le[1],be=We;Je==="CustomField"&&(be=We.split(".")[1]);let st=O.filter(Re=>{let L=nt.basename(Re);return L.startsWith(be+".")&&L.includes(Je==="CustomField"?".field":"")});for(let Re of st){let L=nt.join(t,Re);it.existsSync(L)&&(it.unlinkSync(L),b.appendLine(`Deleted local file: ${Re}`),oe++)}}F.window.showInformationMessage(`Ricwiz: Deleted ${oe} local files from Git workspace.`)}if(v.length===0)return;let $=v.map(T=>T.metadataFormat).filter(T=>T!=="").join(", "),E=await F.window.showInputBox({prompt:"Review and adjust the metadata components to retrieve",value:$,ignoreFocusOut:!0});if(!E)return;let P=`sf project retrieve start -m "${E}"`;b.appendLine(`Executing: ${P}`),F.window.showInformationMessage(`Ricwiz: Extracting ${v.length} components...`);let D=await f(P,{cwd:t});b.appendLine(D.stdout),D.stderr&&(b.appendLine("--- STDERR ---"),b.appendLine(D.stderr)),F.window.showInformationMessage("Ricwiz: Changes extracted successfully! Ready for Git Commit.")}catch(i){F.window.showErrorMessage(`Ricwiz: Error capturing changes - ${i.message}`)}})}function li(t,e,o){if(!t||!e||!o)return null;let s=t.toLowerCase(),r=o.toLowerCase();if(["security controls","network access","session settings","data export","login history","password policies","identity verification","delegated administration"].includes(r)||s.includes("login")||s.includes("password")||s.includes("oauth")||s.includes("session"))return null;let d=s.includes("delete"),p=null;if(s==="permissionsetgroupcomponentadd"||s==="permissionsetgroupcomponentdelete")return null;let m=(a,i=!1)=>{let n=a.replace(/\(.*\)/g,"").trim();n.includes(":")&&!s.includes("calculation")&&(n=n.split(":")[0]);let c=["disabled","deleted","removed","created","changed","updated","from","to","on","assigned","assign","assignment","permission","set","group","apex","class","trigger","custom","field","object","layout","validation","rule","flow","profile"],u=n.split(/\s+/);if(i){for(;u.length>0&&c.includes(u[u.length-1].toLowerCase());)u.pop();for(;u.length>0&&c.includes(u[0].toLowerCase());)u.shift();return u.join(" ").trim().replace(/[^a-zA-Z0-9_ ]/g,"")}else return u.filter(w=>!c.includes(w.toLowerCase())).join("_").replace(/[^a-zA-Z0-9_]/g,"")||n.replace(/\s+/g,"")};if(s.includes("profile"))p=`Profile:${m(e,!0)}`;else if(s.includes("permissionsetgroupcalculation")){let a=e.split(":");p=`PermissionSetGroup:${a.length>1?a[a.length-1].trim():m(e,!1)}`}else if(s.includes("permission set group")||s.includes("permissionsetgroup"))p=`PermissionSetGroup:${m(e,!1)}`;else if(s.includes("permission set")||s.includes("permissionset"))p=`PermissionSet:${m(e,!1)}`;else if(s.includes("apexclass"))p=`ApexClass:${m(e,!1)}`;else if(s.includes("apextrigger")||s.includes("apex trigger"))p=`ApexTrigger:${m(e,!1)}`;else if(s.includes("customfield")){let a=e.match(/([A-Za-z0-9_]+__c)/),i=e.match(/(?:on|na|for)\s+([A-Za-z0-9_]+)/i);a&&i?p=`CustomField:${i[1]}.${a[1]}`:p=`CustomField:${m(e,!1)}`}else if(s.includes("layout"))p=`Layout:${m(e,!0)}`;else if(s.includes("validation"))p=`ValidationRule:${m(e,!1)}`;else if(s.includes("flow"))p=`Flow:${m(e,!1)}`;else if(s.includes("customobject")){let a=e.match(/([A-Za-z0-9_]+__c)/);p=a?`CustomObject:${a[1]}`:`CustomObject:${m(e,!1)}`}else if(!s.includes("created")&&!s.includes("changed")&&!s.includes("deleted"))return null;return p?{metadataFormat:p,isDelete:d}:null}var F,it,nt,Jo=z(()=>{"use strict";F=y(require("vscode")),it=y(require("fs")),nt=y(require("path"));S()});async function Wo(){let t=x();if(t)try{let{stdout:e}=await f('git for-each-ref --sort=-committerdate --format="%(refname:short)|||%(committerdate:relative)|||%(subject)" refs/heads/',{cwd:t}),o=e.split(`
`).filter(r=>r.trim()).map(r=>{let l=r.split("|||");return{label:`$(git-branch) ${l[0]}`,description:l[1],detail:l[2],branchName:l[0]}}),s=await ut.window.showQuickPick(o,{placeHolder:"Select a branch from history to checkout",matchOnDescription:!0,matchOnDetail:!0});s&&await De(s.branchName)}catch{ut.window.showErrorMessage("Ricwiz: Failed to get branch history")}}var ut,qo=z(()=>{"use strict";ut=y(require("vscode"));S();tt()});async function Go(){let t=x();if(!t)return;let e=await Ne.window.showInputBox({prompt:"Enter ticket number or name (e.g., 48934)",placeHolder:"48934"});if(e)try{let{stdout:o}=await f(`git branch --list "*${e}*"`,{cwd:t}),s=o.split(`
`).map(d=>d.replace("*","").trim()).filter(d=>d);if(s.length===0){Ne.window.showInformationMessage(`Ricwiz: No branches found matching "${e}"`);return}let r=s.map(d=>({label:`$(git-branch) ${d}`,branchName:d})),l=await Ne.window.showQuickPick(r,{placeHolder:`Select a branch for ${e}`});l&&await De(l.branchName)}catch{Ne.window.showErrorMessage("Ricwiz: Failed to search branches")}}var Ne,Ho=z(()=>{"use strict";Ne=y(require("vscode"));S();tt()});async function _o(){let t=$e.window.activeTextEditor;if(!t)return $e.window.showErrorMessage("Ricwiz: Please open a file in the editor to check blame."),null;let e=t.document.fileName,o=Vo.basename(e),s=x();if(!s)return $e.window.showErrorMessage("Ricwiz: Workspace is not a git repository."),null;let r=[];try{let{stdout:i}=await f(`git log -5 --pretty=format:"%an|%ar|%s|%h" -- "${e}"`,{cwd:s}),n=i.trim().split(`
`);for(let c of n){let u=c.split("|");u.length>=4&&r.push({author:u[0],time:u[1],message:u.slice(2,-1).join("|"),hash:u[u.length-1]})}}catch(i){console.error("Git blame error:",i)}let l="Unknown",d="Unknown",p="Unknown",m=[],a=mi(e);if(a)try{await $e.window.withProgress({location:$e.ProgressLocation.Notification,title:`Ricwiz: Analyzing ${a.name} in Salesforce...`,cancellable:!1},async()=>{let i="";if(a.type==="CustomField"){let n=a.name.split(".");n.length===2&&(i=`SELECT LastModifiedBy.Name, LastModifiedDate, CreatedBy.Name FROM CustomField WHERE DeveloperName = '${n[1].replace("__c","")}' AND TableEnumOrId = '${n[0]}'`)}else a.type==="LightningComponentBundle"?i=`SELECT LastModifiedBy.Name, LastModifiedDate, CreatedBy.Name FROM LightningComponentBundle WHERE DeveloperName = '${a.name}'`:i=`SELECT LastModifiedBy.Name, LastModifiedDate, CreatedBy.Name FROM ${a.type} WHERE Name = '${a.name}'`;if(i)try{let{stdout:n}=await f(`sf data query -t -q "${i}" --json`,{cwd:s,maxBuffer:52428800}),c=JSON.parse(n);if(c&&c.result&&c.result.records&&c.result.records.length>0){let u=c.result.records[0];l=u.LastModifiedBy?u.LastModifiedBy.Name:"Unknown",p=u.CreatedBy?u.CreatedBy.Name:"Unknown",d=new Date(u.LastModifiedDate).toLocaleString()}else l="Not found in Org",d="N/A",p="N/A"}catch{l="Query Error",d="N/A",p="N/A"}try{let n="SELECT Action, Display, CreatedBy.Name, CreatedDate FROM SetupAuditTrail ORDER BY CreatedDate DESC LIMIT 1500",{stdout:c}=await f(`sf data query -q "${n}" --json`,{cwd:s,maxBuffer:52428800}),u=JSON.parse(c);if(u&&u.result&&u.result.records){let h=a.name.replace("__c","");m=u.result.records.filter(w=>w.Display&&w.Display.includes(h)).map(w=>({action:w.Action,display:w.Display,author:w.CreatedBy?w.CreatedBy.Name:"Unknown",time:new Date(w.CreatedDate).toLocaleString()})).slice(0,10)}}catch(n){console.error("Audit trail query error:",n)}})}catch(i){console.error("Salesforce query error:",i)}else l="Unsupported Metadata Type",d="N/A";return{fileName:o,gitHistory:r,sfAuthor:l,sfTime:d,sfCreatedBy:p,auditHistory:m}}function mi(t){let e=t.replace(/\\/g,"/");if(e.includes("/classes/")){let o=e.match(/\/classes\/([^/.]+)\.cls/);if(o)return{type:"ApexClass",name:o[1]}}if(e.includes("/triggers/")){let o=e.match(/\/triggers\/([^/.]+)\.trigger/);if(o)return{type:"ApexTrigger",name:o[1]}}if(e.includes("/lwc/")){let o=e.match(/\/lwc\/([^/]+)\//);if(o)return{type:"LightningComponentBundle",name:o[1]}}if(e.includes("/aura/")){let o=e.match(/\/aura\/([^/]+)\//);if(o)return{type:"AuraDefinitionBundle",name:o[1]}}if(e.includes("/objects/")&&e.includes("/fields/")){let o=e.match(/\/objects\/([^/]+)\//),s=e.match(/\/fields\/([^/.]+)\.field/);if(o&&s)return{type:"CustomField",name:`${o[1]}.${s[1]}`}}return null}var $e,Vo,Qo=z(()=>{"use strict";$e=y(require("vscode")),Vo=y(require("path"));S()});function Yo(t,e,o){t.subscriptions.push(C.commands.registerCommand("ricwiz.generateDestructiveChanges",Pt),C.commands.registerCommand("ricwiz.runSmartTests",Tt),C.commands.registerCommand("ricwiz.refreshWebview",()=>{e&&C.commands.executeCommand("workbench.action.webview.reloadWebviewAction")}),C.commands.registerCommand("ricwiz.createBranches",Dt),C.commands.registerCommand("ricwiz.prepareDeploy",jt),C.commands.registerCommand("ricwiz.createMergeRequests",qt),C.commands.registerCommand("ricwiz.createMergeRequestsVSCode",Gt),C.commands.registerCommand("ricwiz.openJiraTicket",_t),C.commands.registerCommand("ricwiz.openJiraTicketVSCode",Qt),C.commands.registerCommand("ricwiz.showJiraDetails",()=>{e&&no(e)}),C.commands.registerCommand("ricwiz.openJiraDashboard",s=>{e&&ro(e,s)}),C.commands.registerCommand("ricwiz.openJiraDetailsForId",s=>{e&&ao(e,s)}),C.commands.registerCommand("ricwiz.toggleDashboardBranches",s=>{e&&(e.setDashboardShowBranches(s),C.commands.executeCommand("ricwiz.openJiraDashboard"))}),C.commands.registerCommand("ricwiz.changeJiraStatus",lo),C.commands.registerCommand("ricwiz.addJiraComment",mo),C.commands.registerCommand("ricwiz.addJiraLabel",po),C.commands.registerCommand("ricwiz.setJiraToken",uo),C.commands.registerCommand("ricwiz.setGitlabToken",fo),C.commands.registerCommand("ricwiz.syncAll",wo),C.commands.registerCommand("ricwiz.updateBases",bo),C.commands.registerCommand("ricwiz.deleteUnusedBranches",xo),C.commands.registerCommand("ricwiz.checkoutBranch",De),C.commands.registerCommand("ricwiz.copyBranchName",Co),C.commands.registerCommand("ricwiz.generatePackageXml",zo),C.commands.registerCommand("ricwiz.deployPackage",Po),C.commands.registerCommand("ricwiz.importData",To),C.commands.registerCommand("ricwiz.listTicketFiles",Mo),C.commands.registerCommand("ricwiz.resetTracking",Lo),C.commands.registerCommand("ricwiz.extractComponent",Io),C.commands.registerCommand("ricwiz.deployMultiOrg",No),C.commands.registerCommand("ricwiz.captureAdminChanges",jo),C.commands.registerCommand("ricwiz.openHistory",Wo),C.commands.registerCommand("ricwiz.searchTicket",Go),C.commands.registerCommand("ricwiz.whoToBlame",async()=>{let s=await _o();s&&e&&(e.setBlameData(s),e.setPage("blame"))}),C.commands.registerCommand("ricwiz.manualRefresh",()=>{o&&o()}),C.commands.registerCommand("ricwiz.toggleAutoRefresh",()=>{if(e){let s=!e.isAutoRefreshEnabled();e.setAutoRefresh(s),C.workspace.getConfiguration("ricwiz").update("autoRefresh",s,C.ConfigurationTarget.Global)}}),C.commands.registerCommand("ricwiz.openSettings",()=>{C.commands.executeCommand("workbench.action.openSettings","ricwiz")}))}var C,Zo=z(()=>{"use strict";C=y(require("vscode"));Bt();Et();Lt();Jt();Ht();Yt();so();co();go();ho();vo();yo();ko();tt();$o();So();Bo();Eo();Do();Ao();Fo();Uo();Jo();qo();Ho();Qo()});function Ko(t,e,o){let s,r=de.workspace.getConfiguration("ricwiz").get("autoRefresh",!0);e?.setAutoRefresh(r),t.subscriptions.push(de.workspace.onDidChangeConfiguration(d=>{if(d.affectsConfiguration("ricwiz.autoRefresh")){let p=de.workspace.getConfiguration("ricwiz").get("autoRefresh",!0);e?.setAutoRefresh(p)}}));async function l(){let d=de.extensions.getExtension("vscode.git");if(d){let a=function(i){let n="",c;async function u(){let g=de.workspace.workspaceFolders;if(!g)return;let w=g[0].uri.fsPath,v=await U(w);if(v&&v!==n){n=v;let b=de.workspace.getConfiguration("ricwiz"),$=b.get("ticketPrefix","SFPSCA-");if(!v.includes($)){let L=v.match(/([A-Z]+-)\d+/i);L&&($=L[1].toUpperCase())}let E=[],P=[],D=[],T=[],O=await M.initialize(w,{skipPrompt:!0}),oe=O?.environments||b.get("environments",[{name:"Qual",sourceBranch:"quality"},{name:"Val",sourceBranch:"validation"},{name:"Prod",sourceBranch:"main"}]);try{let L=b.get("workspaceCheckoutButtons",["main","quality","validation"]);D=Array.from(new Set(L))}catch{}let Q="",le=v.match(new RegExp(`(${$}\\d+(?:-\\d+)?)`,"i"));if(le){let L=le[1].toUpperCase();Q=L;let ye=b.get("commitMessageSuffix","- "),gt=/^[A-Z]+-\d+(?:-\d+)?\s*(?:-\s*|:\s*|\s+)?/i;gt.test(i.inputBox.value)?i.inputBox.value.toUpperCase().startsWith(L)||(i.inputBox.value=i.inputBox.value.replace(gt,`${L}${ye}`)):i.inputBox.value=`${L}${ye}`+i.inputBox.value,o.text=`$(bookmark) ${L}`,o.tooltip=`Branch: ${v}
Click to open Jira ticket`,o.show();try{let ft=await mt(w,L,"");E=await at(w,ft,L,oe,O)}catch{}}else{o.hide();try{T=await lt(w)}catch{}}let[Je,We,be]=await Promise.all([dt(w,10),ct(w,v,oe,O),Q?Me(Q).catch(L=>{let ye=L.message;return(ye.includes("ENOTFOUND")||ye.includes("network"))&&(ye="No Internet or Invalid URL"),{summary:`\u26A0\uFE0F Jira Error: ${ye}`,description:"",status:""}}):Promise.resolve(null)]);P=Je;let st=be?be.summary:"",Re=be&&be.status||"";e?.updateBranch(v,We,E,P,D,T,st,Re)}}function h(){e?.isAutoRefreshEnabled()&&(c&&clearTimeout(c),c=setTimeout(()=>{n="",u()},300))}s=()=>{n="",u()},u(),i.state.onDidChange(()=>h()),de.window.onDidChangeWindowState(g=>{g.focused&&h()})};var p=a;d.isActive||await d.activate();let m=d.exports.getAPI(1);m.repositories.length>0&&m.repositories.forEach(i=>a(i)),m.onDidOpenRepository(i=>a(i))}}return l(),()=>{s&&s()}}var de,Xo=z(()=>{"use strict";de=y(require("vscode"));S();pe();Fe();J()});var _e={};Le(_e,{activate:()=>pi,deactivate:()=>ui,webviewProvider:()=>Ue});module.exports=I(_e);function pi(t){vt(t),Ue=new Ge(t.extensionUri),t.subscriptions.push(je.window.registerWebviewViewProvider("ricwiz-webview",Ue));let e=je.window.createStatusBarItem(je.StatusBarAlignment.Left,100);e.command="ricwiz.openJiraTicket",t.subscriptions.push(e);let o=Ko(t,Ue,e);Yo(t,Ue,o)}function ui(){}var je,Ue,Qe=z(()=>{je=y(require("vscode"));wt();ze();Zo();Xo()});Qe();0&&(module.exports={activate,deactivate,webviewProvider});
