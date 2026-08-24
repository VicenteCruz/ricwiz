"use strict";var Zo=Object.create;var Oe=Object.defineProperty;var Ko=Object.getOwnPropertyDescriptor;var Xo=Object.getOwnPropertyNames;var ei=Object.getPrototypeOf,ti=Object.prototype.hasOwnProperty;var z=(t,e,o)=>()=>{if(o)throw o[0];try{return t&&(e=t(t=0)),e}catch(i){throw o=[i],i}};var Ye=(t,e)=>{for(var o in e)Oe(t,o,{get:e[o],enumerable:!0})},dt=(t,e,o,i)=>{if(e&&typeof e=="object"||typeof e=="function")for(let s of Xo(e))!ti.call(t,s)&&s!==o&&Oe(t,s,{get:()=>e[s],enumerable:!(i=Ko(e,s))||i.enumerable});return t};var y=(t,e,o)=>(o=t!=null?Zo(ei(t)):{},dt(e||!t||!t.__esModule?Oe(o,"default",{value:t,enumerable:!0}):o,t)),X=t=>dt(Oe({},"__esModule",{value:!0}),t);function $(t){return t.replace(/&/g,"&amp;").replace(/</g,"&lt;").replace(/>/g,"&gt;").replace(/"/g,"&quot;").replace(/'/g,"&#39;")}var x,Ne,lt=z(()=>{"use strict";x=y(require("vscode"));Ne=class{constructor(e){this._extensionUri=e}_extensionUri;webviewView;resolveWebviewView(e,o,i){this.webviewView=e,e.webview.options={enableScripts:!0,localResourceRoots:[this._extensionUri]},this.updateBranch("",!1),e.webview.onDidReceiveMessage(s=>{switch(s.command){case"createBranches":x.commands.executeCommand("ricwiz.createBranches");break;case"createBranchForTicket":x.commands.executeCommand("ricwiz.createBranches",s.args);break;case"prepareDeploy":x.commands.executeCommand("ricwiz.prepareDeploy");break;case"openMRs":x.commands.executeCommand("ricwiz.createMergeRequests");break;case"openMRsVSCode":x.commands.executeCommand("ricwiz.createMergeRequestsVSCode");break;case"openExternal":s.args&&x.env.openExternal(x.Uri.parse(s.args));break;case"openJira":x.commands.executeCommand("ricwiz.openJiraTicket");break;case"showJiraDetails":x.commands.executeCommand("ricwiz.showJiraDetails");break;case"changeJiraStatus":x.commands.executeCommand("ricwiz.changeJiraStatus");break;case"addJiraComment":x.commands.executeCommand("ricwiz.addJiraComment");break;case"addJiraLabel":x.commands.executeCommand("ricwiz.addJiraLabel");break;case"setPage":this.setPage(s.args);break;case"openDashboard":x.commands.executeCommand("ricwiz.openJiraDashboard");break;case"openJiraDetailsForId":x.commands.executeCommand("ricwiz.openJiraDetailsForId",s.args);break;case"refreshDashboard":x.commands.executeCommand("ricwiz.openJiraDashboard");break;case"switchDashboardQuery":x.commands.executeCommand("ricwiz.openJiraDashboard",parseInt(s.args));break;case"toggleDashboardBranches":x.commands.executeCommand("ricwiz.toggleDashboardBranches",s.args);break;case"openJiraVSCode":x.commands.executeCommand("ricwiz.openJiraTicketVSCode");break;case"openSettings":x.commands.executeCommand("ricwiz.openSettings");break;case"checkout":s.branch&&x.commands.executeCommand("ricwiz.checkoutBranch",s.branch);break;case"copyBranch":x.commands.executeCommand("ricwiz.copyBranchName");break;case"generatePackageXml":x.commands.executeCommand("ricwiz.generatePackageXml");break;case"openDevTools":this.setPage("devtools");break;case"openMain":this.setPage("main");break;case"generateDestructiveChanges":x.commands.executeCommand("ricwiz.generateDestructiveChanges");break;case"deployPackage":x.commands.executeCommand("ricwiz.deployPackage");break;case"runSmartTests":x.commands.executeCommand("ricwiz.runSmartTests");break;case"importData":x.commands.executeCommand("ricwiz.importData");break;case"listTicketFiles":x.commands.executeCommand("ricwiz.listTicketFiles");break;case"resetTracking":x.commands.executeCommand("ricwiz.resetTracking");break;case"extractComponent":x.commands.executeCommand("ricwiz.extractComponent");break;case"deployMultiOrg":x.commands.executeCommand("ricwiz.deployMultiOrg");break;case"captureAdminChanges":x.commands.executeCommand("ricwiz.captureAdminChanges");break;case"whoToBlame":x.commands.executeCommand("ricwiz.whoToBlame");break;case"syncAll":x.commands.executeCommand("ricwiz.syncAll");break;case"updateBases":x.commands.executeCommand("ricwiz.updateBases");break;case"deleteUnused":x.commands.executeCommand("ricwiz.deleteUnusedBranches");break;case"conflict_commitAndContinue":x.commands.executeCommand("ricwiz.conflictAction","commitAndContinue");break;case"conflict_resolveDeletions":x.commands.executeCommand("ricwiz.conflictAction","resolveDeletions");break;case"conflict_abortDeploy":x.commands.executeCommand("ricwiz.conflictAction","abortDeploy");break;case"openFile":if(s.file){let g=x.workspace.workspaceFolders;if(g){let c=x.Uri.joinPath(g[0].uri,s.file);x.commands.executeCommand("vscode.open",c)}}break;case"searchTicket":x.commands.executeCommand("ricwiz.searchTicket");break;case"manualRefresh":x.commands.executeCommand("ricwiz.manualRefresh");break;case"toggleAutoRefresh":x.commands.executeCommand("ricwiz.toggleAutoRefresh");break;case"openHistory":x.commands.executeCommand("ricwiz.openHistory");break}})}conflictState=null;setConflictState(e){this.conflictState=e,this.updateView()}updateBranch(e,o,i=[],s=[],g=[],c=[],u=""){this.webviewView&&(this.currentBranchCache=e,this.currentBranchIsMergedCache=o,this.relatedBranchesCache=i,this.commitsCache=s,this.baseBranchesCache=g,this.recentTicketsCache=c,this.ticketTitleCache=u,this.updateView())}currentBranchCache="";currentBranchIsMergedCache=!1;relatedBranchesCache=[];commitsCache=[];baseBranchesCache=[];recentTicketsCache=[];ticketTitleCache="";currentPage="main";blameDataCache=null;jiraDataCache=null;dashboardDataCache=null;dashboardShowBranches=!1;autoRefreshEnabled=!0;setDashboardShowBranches(e){this.dashboardShowBranches=e}getDashboardShowBranches(){return this.dashboardShowBranches}setBlameData(e){this.blameDataCache=e}setJiraData(e){this.jiraDataCache=e}setDashboardData(e){this.dashboardDataCache=e}setAutoRefresh(e){this.autoRefreshEnabled=e,this.updateView()}isAutoRefreshEnabled(){return this.autoRefreshEnabled}setPage(e){this.currentPage=e,this.updateView()}updateView(){if(!this.webviewView)return;let e=this.webviewView.webview.asWebviewUri(x.Uri.joinPath(this._extensionUri,"resources","logo.png"));this.webviewView.webview.html=this._getHtmlForWebview(e,this.currentBranchCache,this.relatedBranchesCache,this.commitsCache,this.baseBranchesCache,this.recentTicketsCache,this.currentPage)}_getHtmlForWebview(e,o,i,s,g,c,u){let m=s.length>0?`
            <div class="separator"></div>
            <div style="padding: 0 4px;">
                <div style="font-size: 11px; opacity: 0.7; margin-bottom: 6px; display: flex; align-items: center; gap: 4px;">
                    <span>\u{1F4DC}</span> Recent Commits
                </div>
                <div style="display: flex; flex-direction: column; gap: 2px;">
                    ${s.map(a=>`
                        <div style="font-size: 11px; padding: 3px 4px; border-radius: 2px; display: flex; gap: 6px; align-items: baseline;">
                            <code style="color: var(--vscode-textLink-foreground); font-size: 10px; flex-shrink: 0;">${$(a.hash)}</code>
                            <span style="flex: 1; overflow: hidden; text-overflow: ellipsis; white-space: nowrap;" title="${$(a.message)}">${$(a.message)}</span>
                            <span style="font-size: 9px; opacity: 0.5; flex-shrink: 0;">${$(a.timeAgo)}</span>
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
        `;if(this.conflictState){let a=(this.conflictState.files||[]).map(h=>`
                <button class="btn" style="padding: 6px; font-size: 12px; display: flex; justify-content: space-between; align-items: center;" onclick="sendOpenFileCommand('${$(h.file)}')">
                    <span style="flex: 1; overflow: hidden; text-overflow: ellipsis; white-space: nowrap; direction: rtl; text-align: left;">&lrm;${$(h.file)}</span>
                    <span style="font-size: 10px; opacity: 0.8; flex-shrink: 0; background-color: var(--vscode-badge-background); color: var(--vscode-badge-foreground); padding: 2px 4px; border-radius: 2px;">${$(h.state)}</span>
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
                        Merging <b>${$(this.conflictState.sourceStr)}</b> into <b>${$(this.conflictState.targetStr)}</b>.<br/>
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
                
                ${a?`
                    <div style="font-size: 11px; opacity: 0.7; margin: 8px 4px 4px 4px; text-transform: uppercase;">Conflicted Files</div>
                    <div style="display: flex; flex-direction: column; gap: 2px;">
                        ${a}
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
            </html>`}if(u==="blame"){let a=this.blameDataCache;return`<!DOCTYPE html>
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

                ${a?`
                <div style="padding: 12px; background: var(--vscode-editor-background); border: 1px solid var(--vscode-widget-border); border-radius: 6px; margin-bottom: 12px;">
                    <div style="font-weight: bold; margin-bottom: 12px; font-size: 14px; text-align: center; color: var(--vscode-textLink-foreground); word-break: break-all;">
                        \u{1F4C4} ${a.fileName}
                    </div>


                    <div style="margin-bottom: 20px;">
                        <div style="font-size: 11px; font-weight: bold; opacity: 0.8; text-transform: uppercase; margin-bottom: 8px;"><span class="icon">\u{1F4BB}</span> Local Git (Last Commits)</div>
                        <ul style="list-style-type: none; padding: 0; margin: 0; display: flex; flex-direction: column; gap: 8px;">
                            ${a.gitHistory&&a.gitHistory.length>0?a.gitHistory.map(h=>`
                                <li style="background: var(--vscode-editorWidget-background); border: 1px solid var(--vscode-widget-border); padding: 8px 10px; border-radius: 4px; border-left: 4px solid var(--vscode-gitDecoration-modifiedResourceForeground);">
                                    <div style="display: flex; justify-content: space-between; margin-bottom: 4px; align-items: center;">
                                        <strong style="font-size: 13px;">${h.author}</strong>
                                        <span style="opacity: 0.7; font-size: 11px;">${h.time}</span>
                                    </div>
                                    <div style="font-size: 12px; margin-bottom: 6px; opacity: 0.9; font-style: italic;">"${h.message}"</div>
                                    <div style="font-family: monospace; font-size: 10px; opacity: 0.6;">Commit: ${h.hash}</div>
                                </li>
                            `).join(""):'<li style="opacity:0.7; font-size: 12px;">No Git history found.</li>'}
                        </ul>
                    </div>

                    <div style="margin-bottom: 20px;">
                        <div style="font-size: 11px; font-weight: bold; opacity: 0.8; text-transform: uppercase; margin-bottom: 8px;"><span class="icon">\u2601\uFE0F</span> Salesforce Metadata</div>
                        <div style="display: flex; flex-direction: column; gap: 8px;">
                            <div style="background: var(--vscode-editorWidget-background); border: 1px solid var(--vscode-widget-border); padding: 8px 10px; border-radius: 4px; border-left: 4px solid var(--vscode-gitDecoration-addedResourceForeground);">
                                <div style="font-size: 10px; opacity: 0.7; text-transform: uppercase; margin-bottom: 2px;">Last Modified By</div>
                                <div style="font-weight: bold; font-size: 13px;">${a.sfAuthor}</div>
                                <div style="font-size: 11px; opacity: 0.7; margin-top: 2px;">${a.sfTime}</div>
                            </div>
                            ${a.sfCreatedBy!=="Unknown"&&a.sfCreatedBy!=="N/A"?`
                            <div style="background: var(--vscode-editorWidget-background); border: 1px solid var(--vscode-widget-border); padding: 8px 10px; border-radius: 4px; border-left: 4px solid var(--vscode-gitDecoration-addedResourceForeground);">
                                <div style="font-size: 10px; opacity: 0.7; text-transform: uppercase; margin-bottom: 2px;">Created By</div>
                                <div style="font-weight: bold; font-size: 13px;">${a.sfCreatedBy}</div>
                            </div>
                            `:""}
                        </div>
                    </div>

                    <div>
                        <div style="font-size: 11px; font-weight: bold; opacity: 0.8; text-transform: uppercase; margin-bottom: 8px;"><span class="icon">\u{1F575}\uFE0F</span> Setup Audit Trail (Recent)</div>
                        <ul style="list-style-type: none; padding: 0; margin: 0; display: flex; flex-direction: column; gap: 8px;">
                            ${a.auditHistory&&a.auditHistory.length>0?a.auditHistory.map(h=>`
                                <li style="background: var(--vscode-editorWidget-background); border: 1px solid var(--vscode-widget-border); padding: 8px 10px; border-radius: 4px; border-left: 4px solid var(--vscode-gitDecoration-untrackedResourceForeground);">
                                    <div style="display: flex; justify-content: space-between; margin-bottom: 4px; align-items: center;">
                                        <strong style="font-size: 13px;">${h.author}</strong>
                                        <span style="opacity: 0.7; font-size: 11px;">${h.time}</span>
                                    </div>
                                    <div style="font-size: 12px; font-weight: 500; margin-bottom: 4px;">${h.action}</div>
                                    <div style="font-size: 11px; opacity: 0.7; font-style: italic; background: var(--vscode-editor-background); padding: 4px; border-radius: 3px;">${h.display}</div>
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
            </html>`}if(u==="jira"){let a=this.jiraDataCache,h=a?.ticketId||"Jira",w=a?.summary||"No Title",v=a?.description||"No description provided.",k=a?.relatedBranches||[];return`<!DOCTYPE html>
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
                    <span style="font-weight: 600; font-size: 13px;">${h} Details</span>
                </div>
                
                <div class="card" style="padding: 16px;">
                    <div class="jira-title">${$(w)}</div>
                    <div class="jira-desc">${$(v)}</div>
                    
                    ${k.length>0?`
                        <div style="margin-top: 16px; border-top: 1px solid var(--vscode-panel-border); padding-top: 12px;">
                            <div style="font-size: 11px; opacity: 0.7; margin-bottom: 8px; text-transform: uppercase; font-weight: bold;"><span class="icon">\u{1F33F}</span> Related Branches & MRs</div>
                            <div style="display: flex; flex-direction: column; gap: 4px;">
                                ${k.map(B=>{let F="";return B.pipelineStatus==="running"?F="\u23F3":B.pipelineStatus==="success"?F="\u2705":B.pipelineStatus==="failed"?F="\u274C":B.pipelineStatus==="canceled"?F="\u{1F6D1}":B.pipelineStatus==="skipped"&&(F="\u23ED\uFE0F"),`
                                    <div class="btn" style="padding: 6px 10px; font-size: 12px; display: flex; justify-content: space-between; align-items: center; background-color: var(--vscode-button-secondaryBackground); color: var(--vscode-button-secondaryForeground); border-radius: 4px;" onclick="sendCheckoutCommand('${$(B.name)}')" title="Checkout ${$(B.name)}">
                                        <div style="display: flex; align-items: center; gap: 6px; overflow: hidden;">
                                            <span style="overflow: hidden; text-overflow: ellipsis; white-space: nowrap; font-weight: bold;">${$(B.name)}</span>
                                            ${F?`<span title="Pipeline: ${B.pipelineStatus}" style="font-size: 11px;">${F}</span>`:""}
                                        </div>
                                        <div style="display: flex; gap: 6px; align-items: center;">
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
            </html>`}if(u==="dashboard"){let a=this.dashboardDataCache||{queries:[],selectedIndex:0,results:[],error:null},h=a.queries.map((v,k)=>`
                <option value="${k}" ${k===a.selectedIndex?"selected":""}>${$(v.name)}</option>
            `).join(""),w=a.error?`
                <div style="color: var(--vscode-errorForeground); padding: 12px; text-align: center; background: var(--vscode-editorError-background); border-radius: 4px;">
                    \u26A0\uFE0F ${$(a.error)}
                </div>
            `:a.results.length===0?`
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
                        ${a.results.map(v=>`
                            <tr style="border-bottom: ${v.detailedBranches&&v.detailedBranches.length>0?"none":"1px solid var(--vscode-panel-border)"}; cursor: pointer;" class="tr-hover" onclick="sendCommand('openJiraDetailsForId', '${$(v.key)}')">
                                <td style="padding: 6px; font-weight: bold; color: var(--vscode-textLink-foreground); white-space: nowrap;">${$(v.key)}</td>
                                <td style="padding: 6px; overflow: hidden; text-overflow: ellipsis; max-width: 150px; white-space: nowrap;" title="${$(v.summary)}">${$(v.summary)}</td>
                                <td style="padding: 6px; white-space: nowrap;">
                                    <span style="background: var(--vscode-badge-background); color: var(--vscode-badge-foreground); padding: 2px 4px; border-radius: 3px; font-size: 9px;">${$(v.status)}</span>
                                </td>
                                <td style="padding: 6px; white-space: nowrap; text-align: center;">
                                    ${v.detailedBranches?"":v.branch?`
                                        <button class="icon-button" style="background-color: var(--vscode-button-secondaryBackground); color: var(--vscode-button-secondaryForeground); font-size: 10px; padding: 2px 6px;" title="Checkout ${$(v.branch)}" onclick="event.stopPropagation(); sendCommand('checkout', { branch: '${$(v.branch)}' })">
                                            \u{1F33F} Checkout
                                        </button>
                                    `:`
                                        <button class="icon-button" style="background-color: var(--vscode-button-background); color: var(--vscode-button-foreground); font-size: 10px; padding: 2px 6px;" title="Create Branch for ${$(v.key)}" onclick="event.stopPropagation(); sendCommand('createBranchForTicket', '${$(v.key)}')">
                                            \u2795 Create
                                        </button>
                                    `}
                                </td>
                            </tr>
                            ${v.detailedBranches&&v.detailedBranches.length>0?`
                            <tr style="border-bottom: 1px solid var(--vscode-panel-border);">
                                <td colspan="4" style="padding: 0 6px 8px 6px;">
                                    <div style="display: flex; flex-direction: column; gap: 4px; padding-left: 8px; border-left: 2px solid var(--vscode-editorIndentGuide-activeBackground1);">
                                        ${v.detailedBranches.map(k=>{let B="";return k.pipelineStatus==="running"?B="\u23F3":k.pipelineStatus==="success"?B="\u2705":k.pipelineStatus==="failed"?B="\u274C":k.pipelineStatus==="canceled"?B="\u{1F6D1}":k.pipelineStatus==="skipped"&&(B="\u23ED\uFE0F"),`
                                            <div style="display: flex; justify-content: space-between; align-items: center; font-size: 10px; background: var(--vscode-editor-background); padding: 2px 6px; border-radius: 3px;">
                                                <div style="display: flex; align-items: center; gap: 6px; overflow: hidden; cursor: pointer; flex: 1;" onclick="sendCheckoutCommand('${$(k.name)}')" title="Checkout ${$(k.name)}">
                                                    <span style="overflow: hidden; text-overflow: ellipsis; white-space: nowrap;">${$(k.name)}</span>
                                                    ${B?`<span title="Pipeline: ${k.pipelineStatus}">${B}</span>`:""}
                                                </div>
                                                <div style="display: flex; gap: 6px; align-items: center;">
                                                    ${k.mrUrl?`<span onclick="event.stopPropagation(); sendCommand('openExternal', '${k.mrUrl}');" title="Open Merge Request" style="cursor: pointer;">\u{1F517}</span>`:""}
                                                    ${k.isMerged?'<span style="background-color: var(--vscode-charts-green); color: white; border-radius: 3px; padding: 1px 4px; font-size: 8px; font-weight: bold;">MERGED</span>':""}
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
                
                ${a.queries.length>0?`
                <div style="margin-bottom: 12px;">
                    <select id="querySelect" onchange="sendCommand('switchDashboardQuery', this.value)">
                        ${h}
                    </select>
                </div>
                <div style="margin-bottom: 12px; display: flex; align-items: center; gap: 6px;">
                    <input type="checkbox" id="showBranchesCheck" ${this.dashboardShowBranches?"checked":""} onchange="sendCommand('toggleDashboardBranches', this.checked)" style="margin: 0; cursor: pointer;">
                    <label for="showBranchesCheck" style="font-size: 11px; cursor: pointer;">Show all Branches (MRs & Pipelines)</label>
                </div>
                `:`
                <div style="padding: 12px; opacity: 0.7; text-align: center;">No queries defined in settings.</div>
                `}

                <div style="background: var(--vscode-editor-background); border: 1px solid var(--vscode-panel-border); border-radius: 4px; overflow-x: auto; max-height: 400px; overflow-y: auto;">
                    ${w}
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
            </html>`;let n=i.find(a=>a.name===o),r="";n&&(n.pipelineStatus==="running"?r="\u23F3":n.pipelineStatus==="success"?r="\u2705":n.pipelineStatus==="failed"?r="\u274C":n.pipelineStatus==="canceled"?r="\u{1F6D1}":n.pipelineStatus==="skipped"&&(r="\u23ED\uFE0F"));let d=n?n.mrUrl:void 0,p=o?`<div style="background-color: var(--vscode-editor-inactiveSelectionBackground); padding: 10px; border-radius: 6px; margin-bottom: 16px; border: 1px solid var(--vscode-panel-border); box-shadow: 0 2px 4px rgba(0,0,0,0.1);">
                    <div style="font-size: 10px; opacity: 0.7; margin-bottom: 4px; display: flex; align-items: center; justify-content: center; gap: 4px; text-transform: uppercase;">
                        Current Ticket / Branch
                        <button class="copy-btn" onclick="sendCommand('copyBranch')" title="Copy branch name to clipboard">\u{1F4CB}</button>
                    </div>
                    <div style="font-weight: bold; font-size: 14px; word-break: break-all; text-align: center; color: var(--vscode-textLink-foreground); display: flex; justify-content: center; align-items: center; gap: 6px;">
                        ${$(o)} 
                        ${r?`<span title="Pipeline: ${n.pipelineStatus}" style="font-size: 12px;">${r}</span>`:""}
                        ${d?`<span onclick="event.stopPropagation(); sendCommand('openExternal', '${d}');" title="Open Merge Request" style="cursor: pointer; font-size: 12px;">\u{1F517}</span>`:""}
                        ${this.currentBranchIsMergedCache?'<span style="background-color: var(--vscode-charts-green); color: white; border-radius: 3px; padding: 1px 4px; font-size: 10px; font-weight: bold;" title="Merged to target env">MERGED</span>':""}
                    </div>
                    ${this.ticketTitleCache?`<div style="font-size: 12px; margin-top: 6px; text-align: center; opacity: 0.9; font-style: italic;">${$(this.ticketTitleCache)}</div>`:""}
                    ${i.length>0?`
                        <div style="margin-top: 10px; border-top: 1px solid var(--vscode-panel-border); padding-top: 10px;">
                            <div style="font-size: 10px; opacity: 0.7; margin-bottom: 6px; text-transform: uppercase; text-align: center;">Sister Branches</div>
                            <div style="display: flex; flex-direction: column; gap: 4px;">
                                ${i.map(a=>{let h="";return a.pipelineStatus==="running"?h="\u23F3":a.pipelineStatus==="success"?h="\u2705":a.pipelineStatus==="failed"?h="\u274C":a.pipelineStatus==="canceled"?h="\u{1F6D1}":a.pipelineStatus==="skipped"&&(h="\u23ED\uFE0F"),`
                                    <div class="btn" style="padding: 4px 8px; font-size: 11px; display: flex; justify-content: space-between; align-items: center; background-color: var(--vscode-button-secondaryBackground); color: var(--vscode-button-secondaryForeground); border-radius: 4px;" onclick="sendCheckoutCommand('${$(a.name)}', this)" title="Checkout ${$(a.name)}">
                                        <div style="display: flex; align-items: center; gap: 4px; overflow: hidden;">
                                            <span style="overflow: hidden; text-overflow: ellipsis; white-space: nowrap; font-weight: bold;">${$(a.name)}</span>
                                        </div>
                                        <div style="display: flex; gap: 4px; align-items: center;">
                                            ${h?`<span title="Pipeline: ${a.pipelineStatus}" style="font-size: 10px;">${h}</span>`:""}
                                            ${a.mrUrl?`<span onclick="event.stopPropagation(); sendCommand('openExternal', '${a.mrUrl}');" title="Open Merge Request" style="cursor: pointer; font-size: 10px;">\u{1F517}</span>`:""}
                                            ${a.isMerged?'<span style="background-color: var(--vscode-charts-green); color: white; border-radius: 3px; padding: 1px 4px; font-size: 9px; font-weight: bold;" title="Merged to target env">MERGED</span>':""}
                                        </div>
                                    </div>
                                    `}).join("")}
                            </div>
                        </div>
                    `:c.length>0?`
                        <div style="margin-top: 10px; border-top: 1px solid var(--vscode-panel-border); padding-top: 10px;">
                            <div style="font-size: 10px; opacity: 0.7; margin-bottom: 6px; text-transform: uppercase; text-align: center;">Recent Tickets</div>
                            <div style="display: flex; flex-direction: column; gap: 4px;">
                                ${c.map(a=>`
                                    <div class="btn" style="padding: 4px 8px; font-size: 11px; display: flex; align-items: center; background-color: var(--vscode-button-secondaryBackground); color: var(--vscode-button-secondaryForeground); border-radius: 4px;" onclick="sendCheckoutCommand('${$(a)}', this)" title="Checkout ${$(a)}">
                                        <span style="font-weight: bold;">${$(a)}</span>
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
                </div>`:"";return`<!DOCTYPE html>
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

            ${p}


            ${g.length>0?`
                <div style="display: flex; gap: 4px; margin-bottom: 16px; flex-wrap: wrap; justify-content: center;">
                    ${g.map(a=>`
                        <button class="btn" style="flex: 1; min-width: 25%; justify-content: center; padding: 6px 4px; font-size: 10px; font-weight: bold; background-color: var(--vscode-button-secondaryBackground); color: var(--vscode-button-secondaryForeground); border-radius: 4px;" onclick="sendCheckoutCommand('${$(a)}', this)" title="Checkout ${$(a)}">
                            ${$(a.toUpperCase())}
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
        </html>`}}});function mt(t){de=t.secrets}async function pt(t){if(!de)throw new Error("SecretStorage is not initialized.");await de.store("ricwiz.jiraApiToken",t)}async function ut(){if(!de)throw new Error("SecretStorage is not initialized.");return await de.get("ricwiz.jiraApiToken")}async function gt(t){if(!de)throw new Error("SecretStorage is not initialized.");await de.store("ricwiz.gitlabApiToken",t)}async function Ze(){if(!de)throw new Error("SecretStorage is not initialized.");return await de.get("ricwiz.gitlabApiToken")}var de,xe=z(()=>{"use strict"});var Se={};Ye(Se,{checkBranchExists:()=>ge,exec:()=>f,extractTicketSuggestion:()=>vt,getCurrentBranch:()=>A,getWorkspaceCwd:()=>b,normalizeTicketId:()=>yt,promptForTicketId:()=>j,resolvePrefix:()=>wt,ricwizLogger:()=>D});function b(){let t=ke.workspace.workspaceFolders;if(t)return t[0].uri.fsPath}async function A(t){try{let{stdout:e}=await f("git branch --show-current",{cwd:t});return e.trim()}catch{return""}}function wt(t,e){if(!t.includes(e)){let o=t.match(/([A-Z]+-)\d+/i);if(o)return o[1].toUpperCase()}return e}function vt(t,e,o=!1){let i=t.match(new RegExp(`(${e}\\d+)`,"i"));return i?i[1].toUpperCase():t.includes(e)&&!t.includes("-to-")?t.substring(t.indexOf(e)):o&&t.includes("-to-")?t.substring(t.indexOf(e)).split("-to-")[0]:""}function yt(t,e){let o=t.trim();return/^\d/.test(o)?`${e}${o}`.toUpperCase():o.toUpperCase()}async function j(t,e){let o=ke.workspace.getConfiguration("ricwiz"),i=e?.prefix??o.get("ticketPrefix","SFPSCA-"),s=await A(t),g=wt(s,i),c=e?.suggestedValue??vt(s,g,e?.handleToSuffix),u=await ke.window.showInputBox({prompt:e?.prompt||"Enter the full ticket ID (e.g., SCPSCA-1234) or just the number",placeHolder:e?.placeHolder||"Ticket ID or number",value:c});return u?{ticketId:yt(u,g),currentBranch:s,prefix:g}:void 0}async function ge(t,e){try{return await f(`git show-ref --verify --quiet refs/heads/${e}`,{cwd:t}),!0}catch{}try{return await f(`git show-ref --verify --quiet refs/remotes/origin/${e}`,{cwd:t}),!0}catch{}return!1}var ke,ft,ht,oi,D,f,R=z(()=>{"use strict";ke=y(require("vscode")),ft=y(require("child_process")),ht=y(require("util")),oi=ht.promisify(ft.exec),D=ke.window.createOutputChannel("Ricwiz"),f=async(t,e)=>{D.appendLine(`[EXEC] ${t}`);let o=await oi(t,{maxBuffer:50*1024*1024,...e});return{stdout:o.stdout.toString(),stderr:o.stderr.toString()}}});async function bt(){let t=b();if(!t){J.window.showErrorMessage("Ricwiz: Open a workspace that is a Git repository.");return}let o=J.workspace.getConfiguration("ricwiz").get("ticketSourceBranch","main");await J.window.withProgress({location:J.ProgressLocation.Notification,title:`Ricwiz: Finding deleted files compared to origin/${o}...`,cancellable:!1},async()=>{try{let{stdout:i}=await f(`git diff --name-only --diff-filter=D origin/${o}...HEAD`,{cwd:t}),s=i.split(`
`).map(d=>d.trim()).filter(d=>d.length>0);if(s.length===0){J.window.showInformationMessage(`Ricwiz: No deleted files found compared to origin/${o}.`);return}let g={},c=(d,p)=>{g[d]||(g[d]=[]),g[d].includes(p)||g[d].push(p)};for(let d of s){let p=d.replace(/\\/g,"/");if(p.includes("/classes/")){let a=p.match(/\/classes\/([^/.]+)\.cls/);a&&c("ApexClass",a[1])}else if(p.includes("/triggers/")){let a=p.match(/\/triggers\/([^/.]+)\.trigger/);a&&c("ApexTrigger",a[1])}else if(p.includes("/lwc/")){let a=p.match(/\/lwc\/([^/]+)\//);a&&c("LightningComponentBundle",a[1])}else if(p.includes("/aura/")){let a=p.match(/\/aura\/([^/]+)\//);a&&c("AuraDefinitionBundle",a[1])}else if(p.includes("/objects/")&&p.includes("/fields/")){let a=p.match(/\/objects\/([^/]+)\//),h=p.match(/\/fields\/([^/.]+)\.field/);a&&h&&c("CustomField",`${a[1]}.${h[1]}`)}else if(p.includes("/objects/")){let a=p.match(/\/objects\/([^/.]+)\.object/);a&&c("CustomObject",a[1])}else if(p.includes("/layouts/")){let a=p.match(/\/layouts\/([^/.]+)\.layout/);a&&c("Layout",a[1])}else if(p.includes("/flows/")){let a=p.match(/\/flows\/([^/.]+)\.flow/);a&&c("Flow",a[1])}else if(p.includes("/permissionsets/")){let a=p.match(/\/permissionsets\/([^/.]+)\.permissionset/);a&&c("PermissionSet",a[1])}else if(p.includes("/profiles/")){let a=p.match(/\/profiles\/([^/.]+)\.profile/);a&&c("Profile",a[1])}else if(p.includes("/customMetadata/")){let a=p.match(/\/customMetadata\/([^/.]+)\.md/);a&&c("CustomMetadata",a[1])}else if(p.includes("/flexipages/")){let a=p.match(/\/flexipages\/([^/.]+)\.flexipage/);a&&c("FlexiPage",a[1])}}if(Object.keys(g).length===0){J.window.showInformationMessage("Ricwiz: Found deleted files in Git, but none mapped to recognizable Salesforce metadata.");return}let u=`<?xml version="1.0" encoding="UTF-8"?>
<Package xmlns="http://soap.sforce.com/2006/04/metadata">
`;for(let d of Object.keys(g).sort()){u+=`    <types>
`;for(let p of g[d].sort())u+=`        <members>${p}</members>
`;u+=`        <name>${d}</name>
    </types>
`}u+=`    <version>58.0</version>
</Package>`;let m=Ue.join(t,"destructiveChanges");fe.existsSync(m)||fe.mkdirSync(m);let l=Ue.join(m,"destructiveChanges.xml"),n=Ue.join(m,"package.xml");fe.writeFileSync(l,u,"utf8"),fe.existsSync(n)||fe.writeFileSync(n,`<?xml version="1.0" encoding="UTF-8"?>
<Package xmlns="http://soap.sforce.com/2006/04/metadata">
    <version>58.0</version>
</Package>`,"utf8");let r=await J.workspace.openTextDocument(l);await J.window.showTextDocument(r),J.window.showInformationMessage("Ricwiz: destructiveChanges.xml generated successfully!")}catch(i){J.window.showErrorMessage(`Ricwiz: Error generating destructive changes: ${i.message}`)}})}var J,Ue,fe,xt=z(()=>{"use strict";J=y(require("vscode")),Ue=y(require("path")),fe=y(require("fs"));R()});async function kt(){let t=b();if(!t)return;let o=re.workspace.getConfiguration("ricwiz").get("ticketSourceBranch","main");await re.window.withProgress({location:re.ProgressLocation.Notification,title:"Ricwiz: Finding Apex Tests to run...",cancellable:!1},async()=>{try{let{stdout:i}=await f(`git diff --name-status origin/${o}...HEAD`,{cwd:t}),s=i.split(`
`).map(d=>d.trim()).filter(d=>d.length>0),g=new Set,c=new Set;for(let d of s){let p=d.split(/\s+/);if(p[0].startsWith("D"))continue;let a=p[1];if(a&&a.endsWith(".cls")){let h=a.match(/\/classes\/([^/.]+)\.cls/);if(h){let w=h[1];w.toLowerCase().endsWith("test")?g.add(w):c.add(w)}}}for(let d of c)g.add(`${d}Test`);if(g.size===0){re.window.showInformationMessage("Ricwiz: No Apex Classes were modified in this branch.");return}let u=Array.from(g).map(d=>({label:`$(beaker) ${d}`,description:"Apex Test Class"})),m=await re.window.showQuickPick(u,{canPickMany:!0,title:"Select Test Classes to Run",placeHolder:"Select tests..."});if(!m||m.length===0)return;let n=`sf apex run test -n ${m.map(d=>d.label.replace("$(beaker) ","").trim()).join(",")} -r human -w 30`,r=re.window.createTerminal("Ricwiz: Smart Tests");r.show(),r.sendText(n)}catch(i){re.window.showErrorMessage(`Ricwiz: Error finding tests: ${i.message}`)}})}var re,Ct=z(()=>{"use strict";re=y(require("vscode"));R()});var we,$t=z(()=>{"use strict";we=class{static isValidShellArg(e){return e?/^[a-zA-Z0-9\-_/.]+$/.test(e):!1}}});var Be,zt,je,I,le=z(()=>{"use strict";Be=y(require("vscode")),zt=y(require("path")),je=y(require("fs")),I=class t{style;upstreamRemote;originRemote;ticketSourceBranch;ticketPrefix;environments;static baseConfig=Be.workspace.getConfiguration("ricwiz");activeProfile;profileName;constructor(e){this.activeProfile=e,this.profileName=e?.name;let o=t.baseConfig;this.style=e?.workflowStyle||o.get("workflowStyle","standard"),this.style==="multi-remote"?(this.upstreamRemote=e?.upstreamRemote||o.get("upstreamRemote","salesforce-master"),this.originRemote=e?.originRemote||o.get("originRemote","origin")):(this.upstreamRemote="origin",this.originRemote="origin"),this.ticketSourceBranch=e?.ticketSourceBranch||o.get("ticketSourceBranch","main"),this.ticketPrefix=e?.ticketPrefix||o.get("ticketPrefix","SFPSCA-");let i=[{name:"Qual",sourceBranch:"quality"},{name:"Val",sourceBranch:"validation"},{name:"Prod",sourceBranch:"main"}];this.environments=e?.environments||o.get("environments",i)}getConfig(e,o){return this.activeProfile&&this.activeProfile[e]!==void 0?this.activeProfile[e]:t.baseConfig.get(e,o)}static async initialize(e,o){let i=t.baseConfig.get("profiles",[]),s=zt.join(e,"ricwiz.json");if(je.existsSync(s))try{let g=je.readFileSync(s,"utf-8"),c=JSON.parse(g);c&&Array.isArray(c.profiles)&&(i=[...i,...c.profiles])}catch(g){Be.window.showErrorMessage(`Ricwiz: Error parsing ricwiz.json: ${g.message}`)}if(i.length>0){if(!o?.forcePrompt)try{let{exec:m}=(R(),X(Se)),{stdout:l}=await m("git branch --show-current",{cwd:e}),n=l.trim(),r=n;n.includes("-to-")&&(r=n.split("-to-")[0]);let{stdout:d}=await m(`git config branch.${r}.ricwiz-profile`,{cwd:e}),p=d.trim();if(p){let a=i.find(h=>h.name===p);if(a)return new t(a)}}catch{}let g=i.map(m=>m.name),c=await Be.window.showQuickPick(g,{placeHolder:"Ricwiz: Select Workflow Profile",ignoreFocusOut:!0});if(!c)return;let u=i.find(m=>m.name===c);return new t(u)}return new t}buildUpstreamPath(e){return e.includes("/")?e:`${this.upstreamRemote}/${e}`}getFetchRemote(e){return e.includes("/")?e.split("/")[0]:this.upstreamRemote}getFetchBranch(e){return e.includes("/")?e.substring(e.indexOf("/")+1):e}}});async function Rt(t){let e=b();if(!e){E.window.showErrorMessage("Open a folder or workspace that is a Git repository.");return}let o=await I.initialize(e,{forcePrompt:!0});if(!o)return;let i=typeof t=="string"?t:void 0,s=await j(e,{prefix:o.ticketPrefix,suggestedValue:i});if(!s){E.window.showErrorMessage("Branch creation cancelled: Ticket not provided.");return}let{ticketId:g}=s,c=o.environments,u="all",m=[{label:"Create Main Branch & Environments",description:"Creates the main ticket branch and all environment branches",value:"all"},{label:"Create Main Branch Only",description:"Creates only the main ticket branch (skips environments)",value:"mainOnly"},{label:"Create Environments Only",description:"Creates only the environment branches (skip main branch)",value:"envs"}];if(c.length>0){let r=await E.window.showQuickPick(m,{placeHolder:"Ricwiz: What do you want to create?",ignoreFocusOut:!0});if(!r)return;u=r.value}let l=o.ticketSourceBranch;if(u==="all"||u==="mainOnly"){let r=[];try{let{stdout:h}=await f('git branch --all --format="%(refname:short)"',{cwd:e});r=h.split(`
`).map(w=>w.trim()).filter(w=>w&&w!=="origin"),r=[...new Set(r)]}catch{}let d=E.window.createQuickPick();d.title="Ricwiz: Ticket Source Branch",d.placeholder="Confirm or change the source branch for this ticket",d.value=o.ticketSourceBranch,d.ignoreFocusOut=!0;let p=()=>{let h=d.value.trim(),w=[];h&&w.push({label:h,description:"Use typed branch"}),w.push(...r.map(v=>({label:v}))),d.items=w};d.onDidChangeValue(p),p();let a=await new Promise(h=>{d.onDidAccept(()=>{let w=d.selectedItems[0];h(w?w.label:d.value),d.hide()}),d.onDidHide(()=>h(void 0)),d.show()});if(!a){E.window.showInformationMessage("Branch creation cancelled.");return}l=a.trim()}let n=g;if(!we.isValidShellArg(n)){E.window.showErrorMessage(`Invalid format for ticket ID: ${n}`);return}if(!we.isValidShellArg(l)){E.window.showErrorMessage(`Invalid format for ticketSourceBranch in settings: ${l}`);return}for(let r of c){if(!we.isValidShellArg(r.name)){E.window.showErrorMessage(`Invalid format for environment name in settings: ${r.name}`);return}if(!we.isValidShellArg(r.sourceBranch)){E.window.showErrorMessage(`Invalid format for environment sourceBranch in settings: ${r.sourceBranch}`);return}}try{await f("git status",{cwd:e})}catch{E.window.showErrorMessage("The opened folder does not appear to be a valid Git repository.");return}try{await E.window.withProgress({location:E.ProgressLocation.Notification,title:"Ricwiz: Creating Branches",cancellable:!1},async r=>{let d=[];r.report({message:"Checking remote status (git fetch)...",increment:10});try{await f("git fetch",{cwd:e})}catch{}try{if(u==="all"||u==="mainOnly"){if(r.report({message:`Creating main branch ${n}...`,increment:10}),await ge(e,n))E.window.showInformationMessage(`Ricwiz: The branch ${n} already exists. Skipping creation...`),await f(`git checkout ${n}`,{cwd:e});else try{let p=o.getFetchRemote(l),a=o.getFetchBranch(l),h=o.buildUpstreamPath(l);await f(`git fetch ${p} ${a}`,{cwd:e}),await f(`git checkout -b ${n} ${h}`,{cwd:e}),d.push(n)}catch{try{await f(`git checkout -b ${n} ${l}`,{cwd:e}),d.push(n)}catch{throw new Error(`Could not create main branch '${n}' from '${l}'. Does the source branch exist?`)}}try{await f(`git config branch.${n}.ricwiz-source "${l}"`,{cwd:e}),o.profileName&&await f(`git config branch.${n}.ricwiz-profile "${o.profileName}"`,{cwd:e})}catch{}}if(u==="all"||u==="envs"){let p=50/(c.length||1);for(let a of c){let h=`${g}-to-${a.name}`,w=a.sourceBranch;if(r.report({message:`Processing environment branch ${h}...`,increment:p}),!await ge(e,h))try{let v=o.buildUpstreamPath(w);await f(`git checkout -b ${h} ${v}`,{cwd:e}),d.push(h)}catch{try{await f(`git checkout -b ${h} ${w}`,{cwd:e}),d.push(h)}catch{throw new Error(`Could not create environment branch '${h}' from '${w}'. Does the source branch exist?`)}}}}r.report({message:`Publishing branches to ${o.originRemote}...`,increment:10});for(let p of d)try{await f(`git push -u ${o.originRemote} ${p}`,{cwd:e})}catch{E.window.showWarningMessage(`Ricwiz: Branch ${p} was created locally but could not be pushed to ${o.originRemote}.`)}if(u==="all"||u==="mainOnly"){r.report({message:`Switching to ${n}...`,increment:10});try{await f(`git checkout ${n}`,{cwd:e})}catch{}}r.report({increment:100}),E.window.showInformationMessage("Ricwiz: All set! You can start working on your branches! \u{1F680}")}catch(p){if(E.window.showErrorMessage(`Ricwiz Branch Creation Failed: ${p.message}`),d.length>0){try{await f(`git checkout ${l}`,{cwd:e})}catch{}for(let a of d)try{await f(`git branch -D ${a}`,{cwd:e})}catch{}E.window.showWarningMessage(`Ricwiz: Rolled back (deleted) ${d.length} branch(es) locally due to failure.`)}}})}catch(r){E.window.showErrorMessage(`Ricwiz general error: ${r.message}`)}}var E,St=z(()=>{"use strict";E=y(require("vscode"));R();$t();le()});async function ve(t,e,o,i){i&&i.report({message:"CONFLICT! Resolve & click 'Commit & Continue' in Ricwiz panel."});let s=!1,g=!1,c=async()=>{try{let{stdout:n}=await f("git status --porcelain",{cwd:t});return n.split(`
`).filter(r=>{let d=r.substring(0,2);return["UD","DU","DD","AU","UA"].includes(d)}).map(r=>r.substring(3).trim())}catch{return[]}},u=async()=>{try{let{stdout:n}=await f("git status --porcelain",{cwd:t}),r=d=>d==="UU"?"Both Modified":d==="UD"?"Deleted by them":d==="DU"?"Deleted by us":d==="DD"?"Both Deleted":d==="AA"?"Both Added":d==="AU"?"Added by us":d==="UA"?"Added by them":"Conflicted";return n.split(`
`).map(d=>d.trimRight()).filter(d=>d.length>2).filter(d=>{let p=d.substring(0,2);return["UU","AA","UD","DU","AU","UA","DD"].includes(p)}).map(d=>{let p=d.substring(0,2);return{file:d.substring(3).trim(),state:r(p)}})}catch{return[]}},m=async()=>{if(s)return;let n=await c(),r=await u(),{webviewProvider:d}=(We(),X(Je));d&&d.setConflictState({isConflict:!0,sourceStr:e,targetStr:o,deletionsCount:n.length,files:r})},l=ae.commands.registerCommand("ricwiz.conflictAction",async n=>{if(n==="abortDeploy")g=!0;else if(n==="resolveDeletions"){try{let d=(await c()).map(a=>({label:a})),p=await ae.window.showQuickPick(d,{canPickMany:!0,placeHolder:"Select conflicted files to DELETE",title:"Ricwiz: Delete Conflicted Files"});if(p&&p.length>0){for(let a of p)try{await f(`git rm --force "${a.label}"`,{cwd:t})}catch{}ae.window.showInformationMessage(`Ricwiz: Deleted ${p.length} conflicted file(s).`)}}catch(r){ae.window.showErrorMessage(`Ricwiz: Error. (${r.message})`)}m()}else if(n==="commitAndContinue")try{let d=(await c()).filter(a=>Bt.existsSync(Pt.join(t,a)));if(d.length>0&&await ae.window.showWarningMessage(`Wait! There are ${d.length} file(s) with deletion conflicts that are still on your disk.

If you commit now, you will KEEP them in the project.

Are you sure you want to KEEP them?`,{modal:!0},"Yes, KEEP them","No, let me DELETE them")!=="Yes, KEEP them"){m();return}let p=!1;try{let{stdout:a}=await f('git grep -E "^<<<<<<< "',{cwd:t});a.trim().length>0&&(p=!0)}catch{}if(p){ae.window.showErrorMessage("Ricwiz: You still have unresolved conflict markers (<<<<<<<) in your files. Please resolve them first!"),m();return}await f("git add .",{cwd:t}),await f("git commit --no-edit",{cwd:t})}catch(r){ae.window.showErrorMessage(`Ricwiz: Could not commit automatically. (${r.message})`),m()}});for(m();;){if(g){s=!0,l.dispose(),(We(),X(Je)).webviewProvider?.setConflictState(null);try{await f("git merge --abort",{cwd:t})}catch{}return!1}try{let{stdout:n}=await f("git status --porcelain",{cwd:t});if(n.trim().length===0)return s=!0,l.dispose(),(We(),X(Je)).webviewProvider?.setConflictState(null),ae.window.showInformationMessage("Ricwiz: Changes committed!"),!0}catch{}await new Promise(n=>setTimeout(n,2e3))}}var ae,Bt,Pt,qe=z(()=>{"use strict";ae=y(require("vscode")),Bt=y(require("fs")),Pt=y(require("path"));R()});async function Et(){let t=b();if(!t){N.window.showErrorMessage("Ricwiz: Open a folder or workspace that is a Git repository.");return}try{await f("git status",{cwd:t})}catch{N.window.showErrorMessage("Ricwiz: The opened folder does not appear to be a valid Git repository.");return}let e=await I.initialize(t);if(!e)return;let o=e.environments,i=await j(t,{prefix:e.ticketPrefix});if(!i){N.window.showErrorMessage("Operation cancelled: Ticket not provided.");return}let{ticketId:s,currentBranch:g}=i,c=s;if(!await ge(t,c)){N.window.showErrorMessage(`Ricwiz: Main branch '${c}' does not exist! Prepare deploy is only available when a main ticket branch is used.`);return}let u=e.getConfig("defaultReviewers",""),m="";try{let{stdout:l}=await f(`git config branch.${s}.ricwiz-reviewers`,{cwd:t});m=l.trim()}catch{}if(u.trim()){let l=await N.window.showInputBox({prompt:"Ricwiz: Reviewers for this deploy (optional, comma-separated)",placeHolder:"e.g. @joao, 123456",value:m||u,ignoreFocusOut:!0});if(l===void 0)return;try{l.trim()?await f(`git config branch.${s}.ricwiz-reviewers "${l.trim()}"`,{cwd:t}):m&&await f(`git config --unset branch.${s}.ricwiz-reviewers`,{cwd:t})}catch{}}await N.window.withProgress({location:N.ProgressLocation.Notification,title:"Ricwiz: Preparing Deploy",cancellable:!0},async(l,n)=>{let r=0,d=g,p=!1;n.onCancellationRequested(()=>{p=!0}),l.report({message:"Syncing remote information...",increment:10});try{await f("git fetch --all",{cwd:t});let h=10/(o.length||1);for(let w of o)try{if(p)throw new Error("Aborted");l.report({message:`Fetching ${w.sourceBranch}...`,increment:h});let v=e.getFetchRemote(w.sourceBranch),k=e.getFetchBranch(w.sourceBranch);await f(`git fetch ${v} ${k}:${k}`,{cwd:t})}catch{}}catch{}let a=60/(o.length||1);for(let h of o){if(p)break;let w=`${s}-to-${h.name}`,v=h.sourceBranch;try{l.report({message:`Processing ${w}...`,increment:a/4}),await f(`git checkout ${w}`,{cwd:t});try{await f(`git pull ${e.originRemote} ${w}`,{cwd:t})}catch{}let k=async se=>{try{await f(`git merge ${se}`,{cwd:t})}catch(P){let O=!1;try{let{stdout:G}=await f("git ls-files -u",{cwd:t});G.trim().length>0&&(O=!0)}catch{}let q=((P.stdout||"")+(P.stderr||"")+(P.message||"")).toLowerCase();if(O||q.includes("conflict")||q.includes("conflit")){if(!await ve(t,se,w,l))throw p=!0,new Error("Deploy aborted by user.")}else throw P}};l.report({message:`Merging ${v} into ${w}...`,increment:a/4});let B=e.getFetchRemote(v),F=e.getFetchBranch(v),he=e.buildUpstreamPath(v);if(await f(`git fetch ${B} ${F}`,{cwd:t}),await k(he),l.report({message:`Merging ${c} into ${w}...`,increment:a/4}),await k(c),p)break;l.report({message:`Pushing ${w}...`,increment:a/4}),await f(`git push ${e.originRemote} ${w}`,{cwd:t}),r++}catch(k){k.message.includes("aborted")?N.window.showInformationMessage("Ricwiz: Deploy cancelled."):N.window.showErrorMessage(`Ricwiz: Failed to process branch ${w}. Detail: ${k.message}`);return}}if(!p){l.report({message:"Finishing up...",increment:10});let h=d;try{await f(`git show-ref --verify --quiet refs/heads/${c}`,{cwd:t}),h=c}catch{}try{let w=await A(t);h&&h!==w?(await f(`git checkout ${h}`,{cwd:t}),N.window.showInformationMessage(`Ricwiz: Operation complete. Back on branch ${h}.`)):N.window.showInformationMessage("Ricwiz: Operation complete.")}catch{N.window.showInformationMessage("Ricwiz: Operation complete.")}}})}var N,Mt=z(()=>{"use strict";N=y(require("vscode"));R();qe();le()});async function Tt(t=!1){let e=b();if(!e)return;let o=await I.initialize(e);if(!o)return;let i=await j(e,{prompt:"Enter the full ticket ID for the Merge Requests (e.g., SCPSCA-1234) or just the number"});if(!i)return;let{ticketId:s}=i,c=ee.workspace.getConfiguration("ricwiz").get("gitlabUrlOverride",""),u="";if(c&&c.trim()!=="")u=c.trim().replace(/\/+$/,"");else{let n="";try{let{stdout:r}=await f("git remote get-url origin",{cwd:e});n=r.trim()}catch{ee.window.showErrorMessage("Ricwiz: Could not get the remote origin URL. Please configure the URL manually in the extension settings.");return}u=n,u.endsWith(".git")&&(u=u.slice(0,-4)),u.startsWith("git@")&&(u=u.replace("git@","").replace(":","/"),u=`https://${u}`)}let m=[],l=o.ticketSourceBranch;try{let{stdout:n}=await f(`git config branch.${s}.ricwiz-source`,{cwd:e});n.trim()&&(l=n.trim())}catch{}if(o.environments.length===0)m.push({source:s,target:l});else for(let n of o.environments)m.push({source:`${s}-to-${n.name}`,target:n.sourceBranch});for(let n of m){let r=`${u}/-/merge_requests/new?merge_request[source_branch]=${n.source}&merge_request[target_branch]=${n.target}`;t?ee.commands.executeCommand("simpleBrowser.show",r):ee.env.openExternal(ee.Uri.parse(r))}ee.window.showInformationMessage(`Ricwiz: Opening ${t?"VS Code browser":"external browser"} for Merge Requests!`)}async function Dt(){return Tt(!1)}async function At(){return Tt(!0)}var ee,It=z(()=>{"use strict";ee=y(require("vscode"));R();le()});async function Lt(t=!1){let e=b();if(!e)return;let o=te.workspace.getConfiguration("ricwiz"),i=o.get("jiraUrl","");if(!i||i.trim()===""){te.window.showErrorMessage("Ricwiz: Jira URL is not configured. Please set it in the extension settings (e.g., https://jira.company.com/browse/).");return}let{getCurrentBranch:s,resolvePrefix:g,extractTicketSuggestion:c}=(R(),X(Se)),u=await s(e),m=o.get("ticketPrefix","SFPSCA-"),l=g(u,m),r=c(u,l,!0);if(r){let{normalizeTicketId:p}=(R(),X(Se));r=p(r,l)}else{let p=await j(e,{prompt:"Ricwiz could not detect the ticket from the branch name. Enter Jira ticket ID (e.g. SFPSCA-1234)",handleToSuffix:!0});if(!p)return;r=p.ticketId}let d=i.trim();d.endsWith("/")||(d+="/"),d+=r,t?te.commands.executeCommand("simpleBrowser.show",d):te.env.openExternal(te.Uri.parse(d)),te.window.showInformationMessage(`Ricwiz: Opening Jira Ticket ${r} in ${t?"VS Code":"browser"}!`)}async function Ft(){return Lt(!1)}async function Ot(){return Lt(!0)}var te,Nt=z(()=>{"use strict";te=y(require("vscode"));R()});async function ii(){let t=jt.workspace.getConfiguration("ricwiz"),e=t.get("jiraUrl",""),o=t.get("jiraEmail","")?.trim(),i=(await ut())?.trim();if(!e||!i)throw new Error('Jira API Token is not securely configured. Please run the "Ricwiz: Set Secure Jira API Token" command.');let s=e;s.includes("/browse")&&(s=s.split("/browse")[0]),s.endsWith("/")&&(s=s.slice(0,-1));let g=o?`Basic ${Buffer.from(`${o}:${i}`).toString("base64")}`:`Bearer ${i}`;return{baseUrl:s,headerAuth:g}}async function Ce(t,e,o){let{baseUrl:i,headerAuth:s}=await ii(),g=new URL(`${i}${e}`);return new Promise((c,u)=>{let m=Ut.request(g,{method:t,headers:{Authorization:s,Accept:"application/json",...o?{"Content-Type":"application/json"}:{}}},l=>{let n="";l.on("data",r=>n+=r),l.on("end",()=>{if(l.statusCode===401||l.statusCode===403)return u(new Error(`Authentication failed (HTTP ${l.statusCode}). Please check your Jira settings.`));if(l.statusCode&&l.statusCode>=400){let r="";try{let d=JSON.parse(n);d.errorMessages&&d.errorMessages.length>0&&(r=d.errorMessages.join(", "))}catch{}return l.statusCode===404||l.statusCode===410?u(new Error(`Ticket not found or deleted (HTTP ${l.statusCode}). ${r}`)):u(new Error(`Jira API returned HTTP status ${l.statusCode}. ${r}`))}if(!n)return c({});try{let r=JSON.parse(n);c(r)}catch{u(new Error("Failed to parse Jira response."))}})});m.on("error",l=>u(new Error(`Network error: ${l.message}`))),o&&m.write(JSON.stringify(o)),m.end()})}async function $e(t){let e=await Ce("GET",`/rest/api/2/issue/${t}`);return e&&e.fields?{summary:e.fields.summary||"",description:e.fields.description||"No description provided."}:null}async function Jt(t){let e=await Ce("GET",`/rest/api/2/issue/${t}/transitions`);return e&&e.transitions?e.transitions.map(o=>({id:o.id,name:o.name})):[]}async function Wt(t,e){await Ce("POST",`/rest/api/2/issue/${t}/transitions`,{transition:{id:e}})}async function qt(t,e){await Ce("POST",`/rest/api/2/issue/${t}/comment`,{body:e})}async function Gt(t,e){await Ce("PUT",`/rest/api/2/issue/${t}`,{update:{labels:[{add:e}]}})}async function Ht(t){let e=await Ce("POST","/rest/api/3/search/jql",{jql:t,maxResults:50,fields:["summary","status","assignee"]});return e&&e.issues?e.issues.map(o=>({key:o.key,summary:o.fields?.summary||"No Title",status:o.fields?.status?.name||"Unknown",assignee:o.fields?.assignee?.displayName||"Unassigned"})):[]}var Ut,jt,Pe=z(()=>{"use strict";Ut=y(require("https")),jt=y(require("vscode"));xe()});async function Xe(){let t=await Ze();return!!(t&&t.trim())}async function Kt(t){let e=Zt.workspace.getConfiguration("ricwiz"),o=(await Ze())?.trim();if(!o)throw new Error("No GitLab token");let i=e.get("gitlabUrlOverride","");if(!i||i.trim()==="")if(Ke)i=Ke;else try{let{stdout:u}=await f("git remote get-url origin",{cwd:t}),m=u.trim();m.endsWith(".git")&&(m=m.slice(0,-4)),m.startsWith("git@")&&(m=m.replace("git@","").replace(":","/"),m=`https://${m}`),i=m,Ke=i}catch{throw new Error("Could not get remote origin URL.")}let s=new URL(i),g=`${s.protocol}//${s.host}`,c=Vt[t];if(!c){let u=s.pathname;u.startsWith("/")&&(u=u.substring(1)),u.endsWith("/")&&(u=u.slice(0,-1)),u.endsWith(".git")&&(u=u.slice(0,-4)),c=encodeURIComponent(u),Vt[t]=c}return{baseUrl:g,token:o,projectPath:c}}async function _t(t,e,o){let{baseUrl:i,token:s}=await Kt(t),g=new URL(`${i}${o}`);return new Promise((c,u)=>{let m=Yt.request(g,{method:e,timeout:5e3,headers:{"PRIVATE-TOKEN":s,Accept:"application/json"}},l=>{let n="";l.on("data",r=>n+=r),l.on("end",()=>{if(l.statusCode&&l.statusCode>=400)return u(new Error(`GitLab API error: ${l.statusCode}`));if(!n)return c({});try{let r=JSON.parse(n);c(r)}catch{u(new Error("Failed to parse GitLab response."))}})});m.on("timeout",()=>{m.destroy(),u(new Error("GitLab request timed out"))}),m.on("error",l=>u(new Error(`Network error: ${l.message}`))),m.end()})}async function et(t,e,o){let i=`${t}:${e}:${o||"any"}`,s=Qt.get(i);if(s&&Date.now()-s.timestamp<ni)return s.data;try{let{projectPath:g}=await Kt(t),c=`/api/v4/projects/${g}/merge_requests?source_branch=${encodeURIComponent(e)}&order_by=updated_at&sort=desc`;o&&(c+=`&target_branch=${encodeURIComponent(o)}`);let u=await _t(t,"GET",c);if(u&&u.length>0){let m=u[0];try{let r=await _t(t,"GET",`/api/v4/projects/${g}/merge_requests/${m.iid}`);r&&(m=r)}catch{}let l="none";if(m.head_pipeline&&m.head_pipeline.status){let r=m.head_pipeline.status;r==="success"||r==="failed"||r==="canceled"||r==="skipped"?l=r:l="running"}let n={isMerged:m.state==="merged",isOpen:m.state==="opened",pipelineStatus:l,webUrl:m.web_url};return Qt.set(i,{data:n,timestamp:Date.now()}),n}return null}catch{return null}}var Yt,Zt,Vt,Ke,Qt,ni,Xt=z(()=>{"use strict";Yt=y(require("https")),Zt=y(require("vscode"));xe();R();Vt={},Ke=null;Qt=new Map,ni=30*1e3});var Ge={};Ye(Ge,{findRelatedBranches:()=>st,getCurrentBranchMergeStatus:()=>ot,getRecentCommits:()=>it,getRecentTickets:()=>nt,getRelatedBranchesStatus:()=>tt});function eo(t,e){return e.find(o=>t.endsWith(`-to-${o.name}`))}async function tt(t,e,o,i){let s=await Xe();return await Promise.all(e.map(async c=>{let u=eo(c,i);if(s){let m=u?u.sourceBranch:void 0,l=await et(t,c,m);if(l)return{name:c,isMerged:l.isMerged,pipelineStatus:l.pipelineStatus,mrUrl:l.webUrl}}return{name:c,isMerged:!1}}))}async function ot(t,e,o){let i=eo(e,o);if(!i)return!1;if(await Xe()){let s=await et(t,e,i.sourceBranch);if(s)return s.isMerged}return!1}async function it(t,e=10){try{let{stdout:o}=await f(`git log --oneline -${e} --format="%h|||%s|||%ar"`,{cwd:t});return o.split(`
`).filter(i=>i.trim()).map(i=>{let s=i.split("|||");return{hash:s[0]||"",message:s.length>=3?s.slice(1,-1).join("|||"):s[1]||"",timeAgo:s.length>=3?s[s.length-1]:""}})}catch{return[]}}async function nt(t,e=3){try{let{stdout:o}=await f('git for-each-ref --sort=-committerdate --format="%(refname:short)" refs/heads/',{cwd:t}),i=o.split(`
`).map(g=>g.trim()).filter(g=>g),s=/^[A-Z]+-\d+$/i;return i.filter(g=>s.test(g)).slice(0,e)}catch{return[]}}async function st(t,e,o){let{stdout:i}=await f(`git branch --all --list "*${e}*"`,{cwd:t}),s=new Set;return i.split(`
`).forEach(g=>{let c=g.replace("*","").trim();if(c){if(c.startsWith("remotes/")){let u=c.split("/");u.length>2&&(c=u.slice(2).join("/"))}c&&c!==o&&!c.includes("HEAD")&&s.add(c)}}),Array.from(s)}var Ee=z(()=>{"use strict";R();Xt()});async function to(t){let e=b();if(e)try{if(!await I.initialize(e))return;let s=(await A(e)).split("-to-")[0];if(!s){V.window.showErrorMessage("Ricwiz: You are not currently on a valid ticket branch.");return}await V.window.withProgress({location:V.ProgressLocation.Notification,title:`Fetching details for ${s}...`,cancellable:!1},async g=>{let c=await $e(s);if(c){let u=[];try{let{findRelatedBranches:m,getRelatedBranchesStatus:l}=(Ee(),X(Ge)),n=V.workspace.getConfiguration("ricwiz").get("environments",[{name:"Qual",sourceBranch:"quality"},{name:"Val",sourceBranch:"validation"},{name:"Prod",sourceBranch:"main"}]),r=await m(e,s,"");u=await l(e,r,s,n)}catch{}t.setJiraData({ticketId:s,relatedBranches:u,...c}),t.setPage("jira")}else V.window.showErrorMessage("Ricwiz: No data found for this ticket.")})}catch(o){o.message.includes("securely configured")?await V.window.showErrorMessage(o.message,"Set Token Now")==="Set Token Now"&&V.commands.executeCommand("ricwiz.setJiraToken"):V.window.showErrorMessage(`Ricwiz Jira Error: ${o.message}`)}}var V,oo=z(()=>{"use strict";V=y(require("vscode"));R();le();Pe()});async function io(t,e){let i=oe.workspace.getConfiguration("ricwiz").get("jiraDashboards",[]);if(e!==void 0&&(ye=e),!i||i.length===0){t.setDashboardData({queries:[],selectedIndex:0,results:[],error:"No queries defined in settings. Go to Settings > Ricwiz > Jira Dashboards."}),t.setPage("dashboard");return}ye>=i.length&&(ye=0);let s=i[ye];t.setDashboardData({queries:i,selectedIndex:ye,results:[],error:"\u23F3 Loading tickets..."}),t.setPage("dashboard");try{let g=await Ht(s.jql),c=oe.workspace.workspaceFolders?.[0]?.uri.fsPath,u=[],m=t.getDashboardShowBranches();if(c)try{let n=require("child_process"),d=require("util").promisify(n.exec),{stdout:p}=await d("git branch",{cwd:c});u=p.split(`
`).map(a=>a.replace("*","").trim()).filter(a=>a)}catch{}let l=[];if(m&&c)try{let{findRelatedBranches:n,getRelatedBranchesStatus:r}=(Ee(),X(Ge)),d=oe.workspace.getConfiguration("ricwiz").get("environments",[{name:"Qual",sourceBranch:"quality"},{name:"Val",sourceBranch:"validation"},{name:"Prod",sourceBranch:"main"}]);l=await Promise.all(g.map(async p=>{let a=await n(c,p.key,""),h=await r(c,a,p.key,d);return{...p,detailedBranches:h}}))}catch{l=g}else l=g.map(n=>{let r=u.find(d=>d.includes(n.key));return{...n,branch:r||null}});t.setDashboardData({queries:i,selectedIndex:ye,results:l,error:null}),t.setPage("dashboard")}catch(g){let c=g.message;(c.includes("ENOTFOUND")||c.includes("network"))&&(c="No Internet or Invalid URL"),t.setDashboardData({queries:i,selectedIndex:ye,results:[],error:c}),t.setPage("dashboard")}}async function no(t,e){await oe.window.withProgress({location:oe.ProgressLocation.Notification,title:`Fetching details for ${e}...`,cancellable:!1},async()=>{try{let o=await $e(e);if(o){let i=[],s=b();if(s)try{let{findRelatedBranches:g,getRelatedBranchesStatus:c}=(Ee(),X(Ge)),u=oe.workspace.getConfiguration("ricwiz").get("environments",[{name:"Qual",sourceBranch:"quality"},{name:"Val",sourceBranch:"validation"},{name:"Prod",sourceBranch:"main"}]),m=await g(s,e,"");i=await c(s,m,e,u)}catch{}t.setJiraData({ticketId:e,relatedBranches:i,...o}),t.setPage("jira")}else oe.window.showErrorMessage(`Ricwiz: No data found for ticket ${e}.`)}catch(o){oe.window.showErrorMessage(`Ricwiz Jira Error: ${o.message}`)}})}var oe,ye,so=z(()=>{"use strict";oe=y(require("vscode"));Pe();R();ye=0});async function rt(){let t=b();return!t||!await I.initialize(t,{forcePrompt:!1})?void 0:(await A(t)).split("-to-")[0]}async function ro(){try{let t=await rt();if(!t){S.window.showErrorMessage("Ricwiz: You are not on a valid ticket branch.");return}let e=await S.window.withProgress({location:S.ProgressLocation.Notification,title:`Fetching available status for ${t}...`,cancellable:!1},()=>Jt(t));if(!e||e.length===0){S.window.showInformationMessage(`Ricwiz: No transitions available for ${t}.`);return}let o=e.map(s=>({label:s.name,id:s.id})),i=await S.window.showQuickPick(o,{placeHolder:`Select new status for ${t}`,ignoreFocusOut:!0});i&&(await S.window.withProgress({location:S.ProgressLocation.Notification,title:`Updating status to ${i.label}...`,cancellable:!1},()=>Wt(t,i.id)),S.window.showInformationMessage(`Ricwiz: Status for ${t} updated to ${i.label}.`))}catch(t){t.message.includes("securely configured")?S.window.showErrorMessage(t.message,"Set Token Now").then(e=>{e==="Set Token Now"&&S.commands.executeCommand("ricwiz.setJiraToken")}):S.window.showErrorMessage(`Ricwiz Jira Error: ${t.message}`)}}async function ao(){try{let t=await rt();if(!t){S.window.showErrorMessage("Ricwiz: You are not on a valid ticket branch.");return}let e=await S.window.showInputBox({prompt:`Add comment to ${t}`,placeHolder:"Type your comment here...",ignoreFocusOut:!0});e&&(await S.window.withProgress({location:S.ProgressLocation.Notification,title:`Adding comment to ${t}...`,cancellable:!1},()=>qt(t,e)),S.window.showInformationMessage(`Ricwiz: Comment added to ${t}.`))}catch(t){t.message.includes("securely configured")?S.window.showErrorMessage(t.message,"Set Token Now").then(e=>{e==="Set Token Now"&&S.commands.executeCommand("ricwiz.setJiraToken")}):S.window.showErrorMessage(`Ricwiz Jira Error: ${t.message}`)}}async function co(){try{let t=await rt();if(!t){S.window.showErrorMessage("Ricwiz: You are not on a valid ticket branch.");return}let e=await S.window.showInputBox({prompt:`Add a label to ${t}`,placeHolder:"e.g. Needs-Review, Bug, High-Priority",ignoreFocusOut:!0});e&&e.trim()&&(await S.window.withProgress({location:S.ProgressLocation.Notification,title:`Adding label to ${t}...`,cancellable:!1},()=>Gt(t,e.trim())),S.window.showInformationMessage(`Ricwiz: Label '${e.trim()}' added to ${t}.`))}catch(t){t.message.includes("securely configured")?S.window.showErrorMessage(t.message,"Set Token Now").then(e=>{e==="Set Token Now"&&S.commands.executeCommand("ricwiz.setJiraToken")}):S.window.showErrorMessage(`Ricwiz Jira Error: ${t.message}`)}}async function lo(){let t=await S.window.showInputBox({prompt:"Enter your Jira API Token (or Personal Access Token). It will be securely stored in your OS keychain.",password:!0,ignoreFocusOut:!0});if(t)try{await pt(t.trim()),S.window.showInformationMessage("Ricwiz: Jira API Token securely stored!")}catch(e){S.window.showErrorMessage(`Ricwiz: Failed to store token: ${e.message}`)}}var S,mo=z(()=>{"use strict";S=y(require("vscode"));R();le();Pe();xe()});async function po(){let t=await W.window.showInputBox({prompt:"Enter your GitLab Personal Access Token",placeHolder:"glpat-xxxxxxxxxxxxxxxxxxxx",ignoreFocusOut:!0,password:!0});if(t&&t.trim()){let e=t.trim();await W.window.withProgress({location:W.ProgressLocation.Notification,title:"Ricwiz: Validating GitLab Token...",cancellable:!1},async()=>{try{let i=W.workspace.getConfiguration("ricwiz").get("gitlabUrlOverride","").trim();if(!i&&W.workspace.workspaceFolders)try{let{exec:m}=(R(),X(Se)),l=W.workspace.workspaceFolders[0].uri.fsPath,{stdout:n}=await m("git remote get-url origin",{cwd:l}),r=n.trim();r.startsWith("git@")&&(r=`https://${r.replace("git@","").replace(":","/")}`),r.endsWith(".git")&&(r=r.slice(0,-4)),i=r}catch{}i||(i="https://gitlab.com");let s=new URL(i),g=`${s.protocol}//${s.host}`,c=require("https"),u=await new Promise((m,l)=>{let n=c.request(new URL(`${g}/api/v4/user`),{method:"GET",timeout:5e3,headers:{"PRIVATE-TOKEN":e,Accept:"application/json"}},r=>{if(r.statusCode>=400)return l(new Error(`Status ${r.statusCode}`));let d="";r.on("data",p=>d+=p),r.on("end",()=>m(JSON.parse(d||"{}")))});n.on("error",l),n.on("timeout",()=>{n.destroy(),l(new Error("Timeout"))}),n.end()});await gt(e),W.window.showInformationMessage(`Ricwiz: \u2705 GitLab API Token saved and validated successfully for ${u.username||"user"}!`),W.commands.executeCommand("ricwiz.manualRefresh")}catch(o){W.window.showErrorMessage(`Ricwiz: \u274C Invalid token or cannot reach GitLab (${o.message}). Please check the token and try again.`)}})}}var W,uo=z(()=>{"use strict";W=y(require("vscode"));xe()});async function go(){let t=b();if(!t){me.window.showErrorMessage("Ricwiz: Open a folder or workspace that is a Git repository.");return}let e=await I.initialize(t);if(!e)return;let o=await j(t,{prefix:e.ticketPrefix,prompt:"Enter the full ticket ID to sync all branches for (e.g., SCPSCA-1234) or just the number"});if(!o)return;let{ticketId:i,currentBranch:s}=o;await me.window.withProgress({location:me.ProgressLocation.Notification,title:`Ricwiz: Syncing all branches for ${i}...`,cancellable:!1},async g=>{try{g.report({message:"Fetching from remote..."});try{await f("git fetch --all",{cwd:t})}catch{}let{stdout:c}=await f(`git branch --list "*${i}*"`,{cwd:t}),u=c.split(`
`).map(n=>n.replace("*","").trim()).filter(n=>n.length>0);if(u.length===0){me.window.showWarningMessage(`Ricwiz: No local branches found for ${i}.`);return}let m=0,l=0;for(let n of u)if(g.report({message:`Syncing ${n}...`}),n===s)try{await f(`git pull ${e.originRemote} ${n}`,{cwd:t}),m++}catch(r){let d=!1;try{let{stdout:a}=await f("git ls-files -u",{cwd:t});a.trim().length>0&&(d=!0)}catch{}let p=((r.stdout||"")+(r.stderr||"")+(r.message||"")).toLowerCase();(d||p.includes("conflict")||p.includes("conflit"))&&await ve(t,`${e.originRemote}/${n}`,n,g)?m++:l++}else try{await f(`git fetch ${e.originRemote} ${n}:${n}`,{cwd:t}),m++}catch{try{await f(`git checkout ${n}`,{cwd:t});try{await f(`git pull ${e.originRemote} ${n}`,{cwd:t}),m++}catch(d){let p=!1;try{let{stdout:h}=await f("git ls-files -u",{cwd:t});h.trim().length>0&&(p=!0)}catch{}let a=((d.stdout||"")+(d.stderr||"")+(d.message||"")).toLowerCase();(p||a.includes("conflict")||a.includes("conflit"))&&await ve(t,`${e.originRemote}/${n}`,n,g)?m++:l++}await f(`git checkout ${s}`,{cwd:t})}catch{try{await f(`git checkout ${s}`,{cwd:t})}catch{}l++}}l>0?me.window.showWarningMessage(`Ricwiz: Synced ${m}/${u.length} branches. ${l} branch(es) could not be synced (possible conflicts or diverged history).`):me.window.showInformationMessage(`Ricwiz: \u{1F504} All ${m} branches for ${i} are up to date!`)}catch(c){me.window.showErrorMessage(`Ricwiz: Sync failed: ${c.message}`)}})}var me,fo=z(()=>{"use strict";me=y(require("vscode"));R();qe();le()});async function ho(){let t=b();if(!t){pe.window.showErrorMessage("Ricwiz: Open a folder or workspace that is a Git repository.");return}try{await f("git status",{cwd:t})}catch{pe.window.showErrorMessage("Ricwiz: The opened folder does not appear to be a valid Git repository.");return}let e=await I.initialize(t);if(!e)return;let o=e.environments,i=await j(t,{prefix:e.ticketPrefix});if(!i)return;let{ticketId:s,currentBranch:g}=i;await pe.window.withProgress({location:pe.ProgressLocation.Notification,title:"Ricwiz: Updating environment branches from their bases",cancellable:!0},async(c,u)=>{let m=0,l=g,n=!1;u.onCancellationRequested(()=>{n=!0}),c.report({message:"Syncing remote information...",increment:10});try{await f("git fetch --all",{cwd:t})}catch{}let r=80/(o.length||1);for(let d of o){if(n)break;let p=`${s}-to-${d.name}`,a=d.sourceBranch;if(await ge(t,p))try{c.report({message:`Processing ${p}...`,increment:r/2}),await f(`git checkout ${p}`,{cwd:t});try{c.report({message:`Merging ${a} into ${p}...`,increment:r/2});let h=e.getFetchRemote(a),w=e.getFetchBranch(a),v=e.buildUpstreamPath(a);await f(`git fetch ${h} ${w}`,{cwd:t}),await f(`git merge ${v}`,{cwd:t})}catch(h){let w=!1;try{let{stdout:k}=await f("git ls-files -u",{cwd:t});k.trim().length>0&&(w=!0)}catch{}let v=((h.stdout||"")+(h.stderr||"")+(h.message||"")).toLowerCase();if(w||v.includes("conflict")||v.includes("conflit")){let k=e.buildUpstreamPath(a);if(!await ve(t,k,p,c))throw n=!0,new Error("Update aborted by user.")}else throw h}if(n)break;m++}catch(h){h.message.includes("aborted")?pe.window.showInformationMessage("Ricwiz: Update cancelled."):pe.window.showErrorMessage(`Ricwiz: Failed to update branch ${p}. Detail: ${h.message}`);return}}if(!n){c.report({message:"Finishing up...",increment:10});try{let d=await A(t);l&&l!==d&&await f(`git checkout ${l}`,{cwd:t})}catch{}pe.window.showInformationMessage(`Ricwiz: Successfully updated ${m} environment branches from their bases!`)}})}var pe,wo=z(()=>{"use strict";pe=y(require("vscode"));R();qe();le()});async function vo(){let t=b();if(!t){L.window.showErrorMessage("Ricwiz: Open a folder or workspace that is a Git repository.");return}let e=await A(t),o=L.workspace.getConfiguration("ricwiz");await L.window.withProgress({location:L.ProgressLocation.Notification,title:"Ricwiz: Scanning for unused local branches...",cancellable:!1},async()=>{try{await f("git fetch --prune",{cwd:t})}catch{}let i=[];try{let{stdout:r}=await f('git branch --format="%(refname:short)"',{cwd:t});i=r.split(`
`).map(d=>d.trim()).filter(d=>d.length>0)}catch{}if(i.length===0){L.window.showInformationMessage("Ricwiz: No local branches found.");return}let s=[];try{let{stdout:r}=await f('git branch -r --format="%(refname:short)"',{cwd:t});s=r.split(`
`).map(d=>d.trim().replace(/^origin\//,"").replace(/^[^\/]+\//,"")).filter(d=>d.length>0&&!d.includes("HEAD"))}catch{}let g=[];try{let{stdout:r}=await f('git for-each-ref --format="%(refname:short)|||%(upstream:track)" refs/heads/',{cwd:t});g=r.split(`
`).filter(d=>d.includes("[gone]")).map(d=>d.split("|||")[0].trim())}catch{}let c=i.filter(r=>!s.includes(r));if(c.length===0){L.window.showInformationMessage("Ricwiz: Your local repository is totally clean! All local branches exist on the remote.");return}let u=c.map(r=>{let d=g.includes(r),p=r===e,a="Not found on remote";return d&&(a="Deleted on remote [gone]"),p&&(a+=" (Current branch - will checkout main first)"),{label:r,description:a,picked:d&&!p}}),m=await L.window.showQuickPick(u,{canPickMany:!0,placeHolder:"Select local branches to delete",title:"Ricwiz: Delete Unused Branches"});if(!m||m.length===0){L.window.showInformationMessage("Ricwiz: No branches selected for deletion.");return}if(await L.window.showWarningMessage(`Ricwiz: Delete ${m.length} local branch(es)?
This cannot be undone!`,{modal:!0},"Yes, delete them")!=="Yes, delete them"){L.window.showInformationMessage("Ricwiz: Deletion cancelled.");return}let n=0;for(let r of m){let d=r.label;if(d===e){let p=o.get("ticketSourceBranch","main");try{await f(`git checkout ${p}`,{cwd:t}),e=p}catch{L.window.showWarningMessage(`Ricwiz: Could not switch away from ${d}. Skipping.`);continue}}try{await f(`git branch -D ${d}`,{cwd:t}),n++}catch{L.window.showWarningMessage(`Ricwiz: Could not delete local branch ${d}.`)}}L.window.showInformationMessage(`Ricwiz: \u{1F5D1}\uFE0F Cleaned up ${n} unused local branch(es).`)})}var L,yo=z(()=>{"use strict";L=y(require("vscode"));R()});async function ze(t){let e=b();e&&await ie.window.withProgress({location:ie.ProgressLocation.Notification,title:`Ricwiz: Switching to ${t}...`,cancellable:!1},async()=>{try{let o=await A(e),i=!1;try{let{stdout:g}=await f("git status --porcelain",{cwd:e});i=g.trim().length>0}catch{}if(i&&o)try{await f(`git stash push --include-untracked -m "ricwiz-auto:${o}"`,{cwd:e}),ie.window.showInformationMessage(`Ricwiz: \u{1F4E6} Stashed changes from ${o}`)}catch{ie.window.showWarningMessage("Ricwiz: Could not stash changes. Checkout may fail if there are conflicts.")}let s=t;t.includes("/")&&(s=t.split("/").slice(1).join("/"));try{await f(`git checkout ${s}`,{cwd:e})}catch{let c="";if(t.includes("/"))c=t.split("/")[0];else{let{stdout:u}=await f("git branch -r",{cwd:e}),m=u.split(`
`).map(n=>n.trim()).filter(n=>n),l=[];for(let n of m){let r=n.split(" ")[0];r.endsWith(`/${s}`)&&l.push(r.substring(0,r.lastIndexOf("/")))}if(l.length===0){ie.window.showErrorMessage(`Ricwiz: A branch "${s}" n\xE3o existe localmente nem em nenhuma remote!`);return}else if(l.length===1)c=l[0];else{let n=await I.initialize(e);l.includes("origin")?c="origin":n&&l.includes(n.upstreamRemote)?c=n.upstreamRemote:c=l[0]}}try{await f(`git fetch ${c} ${s}`,{cwd:e}),await f(`git checkout -b ${s} --track ${c}/${s}`,{cwd:e})}catch{ie.window.showErrorMessage(`Ricwiz: Encontrou na remote ${c} mas falhou a fazer checkout.`);return}}try{let{stdout:g}=await f("git stash list",{cwd:e}),c=g.split(`
`);for(let u=0;u<c.length;u++)if(c[u].includes(`ricwiz-auto:${s}`)){let m=c[u].match(/stash@\{(\d+)\}/);m&&(await f(`git stash pop stash@{${m[1]}}`,{cwd:e}),ie.window.showInformationMessage(`Ricwiz: \u{1F4E6} Restored stashed changes on ${s}`));break}}catch{ie.window.showWarningMessage(`Ricwiz: Could not restore stashed changes on ${s}. You may need to resolve conflicts manually (check git stash list).`)}}catch{ie.window.showErrorMessage(`Ricwiz: Could not checkout branch ${t}.`)}})}var ie,He=z(()=>{"use strict";ie=y(require("vscode"));R();le()});async function bo(){let t=b();if(t)try{let{stdout:e}=await f("git branch --show-current",{cwd:t}),o=e.trim();o&&(await Me.env.clipboard.writeText(o),Me.window.showInformationMessage(`Ricwiz: \u{1F4CB} Copied "${o}" to clipboard`))}catch{Me.window.showErrorMessage("Ricwiz: Could not get the current branch name.")}}var Me,xo=z(()=>{"use strict";Me=y(require("vscode"));R()});async function Co(){let t=b();if(!t){_.window.showErrorMessage("Ricwiz: Open a folder or workspace that is a Git repository.");return}let e=_.workspace.getConfiguration("ricwiz"),o=e.get("ticketSourceBranch","main"),s=e.get("packageXmlCommand",'sf sgd source delta --to "HEAD" --from "origin/{baseBranch}" --output-dir "."').replace("{baseBranch}",o);await _.window.showWarningMessage("Are you sure you want to generate the package.xml? This may overwrite existing local manifest files.",{modal:!0},"Yes, Generate")==="Yes, Generate"&&await _.window.withProgress({location:_.ProgressLocation.Notification,title:"Ricwiz: Generating package.xml using Salesforce CLI...",cancellable:!1},async()=>{try{await f(s,{cwd:t,maxBuffer:10*1024*1024}),_.window.showInformationMessage("Ricwiz: Successfully generated package.xml!");let c=Ve.join(t,"package","package.xml"),u=Ve.join(t,"package.xml"),m=Ve.join(t,"manifest","package.xml");for(let l of[c,u,m])if(ko.existsSync(l)){let n=await _.workspace.openTextDocument(l);await _.window.showTextDocument(n);break}}catch(c){_.window.showErrorMessage(`Ricwiz: Error running sf command - ${c.message}`)}})}var _,Ve,ko,$o=z(()=>{"use strict";_=y(require("vscode")),Ve=y(require("path")),ko=y(require("fs"));R()});async function zo(){let t=b();if(!t){Q.window.showErrorMessage("Ricwiz: Open a folder or workspace that is a Git repository.");return}let o=Q.workspace.getConfiguration("ricwiz").get("deployCommand","sf project deploy start --manifest package/package.xml --post-destructive-changes destructiveChanges/destructiveChanges.xml -c -l NoTestRun -g");await Q.window.showWarningMessage("Are you sure you want to deploy to Salesforce? This action modifies your org and cannot be easily undone.",{modal:!0},"Yes, Deploy")==="Yes, Deploy"&&await Q.window.withProgress({location:Q.ProgressLocation.Notification,title:"Ricwiz: Deploying package...",cancellable:!1},async()=>{try{let{stdout:s,stderr:g}=await f(o,{cwd:t,maxBuffer:52428800}),c=Q.window.createOutputChannel("Ricwiz Deploy");c.appendLine(`Executing: ${o}`),c.appendLine(s),g&&(c.appendLine("--- STDERR ---"),c.appendLine(g)),c.show(),Q.window.showInformationMessage("Ricwiz: Successfully ran deploy command!")}catch(s){let g=Q.window.createOutputChannel("Ricwiz Deploy");g.appendLine(`Error executing: ${o}`),s.stdout&&g.appendLine(s.stdout),s.stderr&&g.appendLine(s.stderr),g.appendLine(s.message),g.show(),Q.window.showErrorMessage("Ricwiz: Error running deploy command. See output channel for details.")}})}var Q,Ro=z(()=>{"use strict";Q=y(require("vscode"));R()});async function So(){let t=b();if(!t){Y.window.showErrorMessage("Ricwiz: Open a folder or workspace that is a Git repository.");return}let o=Y.workspace.getConfiguration("ricwiz").get("importDataCommand","sfdx force:data:tree:import --plan data/plan.json");await Y.window.showWarningMessage("Are you sure you want to import data into Salesforce? This action modifies records in your org.",{modal:!0},"Yes, Import")==="Yes, Import"&&await Y.window.withProgress({location:Y.ProgressLocation.Notification,title:"Ricwiz: Importing data...",cancellable:!1},async()=>{try{let{stdout:s,stderr:g}=await f(o,{cwd:t,maxBuffer:52428800}),c=Y.window.createOutputChannel("Ricwiz Import Data");c.appendLine(`Executing: ${o}`),c.appendLine(s),g&&(c.appendLine("--- STDERR ---"),c.appendLine(g)),c.show(),Y.window.showInformationMessage("Ricwiz: Successfully ran import data command!")}catch(s){let g=Y.window.createOutputChannel("Ricwiz Import Data");g.appendLine(`Error executing: ${o}`),s.stdout&&g.appendLine(s.stdout),s.stderr&&g.appendLine(s.stderr),g.appendLine(s.message),g.show(),Y.window.showErrorMessage("Ricwiz: Error running import data command. See output channel for details.")}})}var Y,Bo=z(()=>{"use strict";Y=y(require("vscode"));R()});async function Po(){let t=b();if(!t){Z.window.showErrorMessage("Ricwiz: Open a folder or workspace that is a Git repository.");return}let e="";try{e=await A(t)}catch{}let i=Z.workspace.getConfiguration("ricwiz").get("ticketSourceBranch","main"),s=await Z.window.showInputBox({prompt:`Enter the branch name to list modified files (compared to ${i})`,value:e,placeHolder:"SFPSCA-1234"});s&&await Z.window.withProgress({location:Z.ProgressLocation.Notification,title:`Ricwiz: Finding files for ${s}...`,cancellable:!1},async()=>{try{let g=s.replace(/-to-[a-zA-Z0-9]+$/i,""),c=[];try{let a="";try{let{stdout:h}=await f(`git merge-base origin/${i} ${s}`,{cwd:t});a=h.trim()}catch{let{stdout:h}=await f(`git merge-base ${i} ${s}`,{cwd:t});a=h.trim()}if(a){let{stdout:h}=await f(`git diff --name-only ${a} ${s}`,{cwd:t,maxBuffer:10485760});c=h.split(`
`).map(w=>w.trim()).filter(w=>w.length>0)}}catch{}let u=[];try{let{stdout:a}=await f(`git --no-pager log --grep="\\b${g}\\b" -i -E --name-only -m --first-parent --format=""`,{cwd:t,maxBuffer:10485760});u=a.split(`
`).map(h=>h.trim()).filter(h=>h.length>0)}catch{}let m=[...c,...u];if(m.length===0){Z.window.showInformationMessage(`Ricwiz: No modified files found for ${s}.`);return}let l=Array.from(new Set(m)).sort(),n={};for(let a of l){let h=a.match(/default\/([^/]+)/),w=h&&h[1]?h[1].toUpperCase():"OUTROS";n[w]||(n[w]=[]),n[w].push(a)}let r=`Files modified in branch ${s}:
`,d=Object.keys(n).sort();for(let a of d)r+=`
=== ${a} ===
`,r+=n[a].join(`
`)+`
`;let p=await Z.workspace.openTextDocument({content:r,language:"plaintext"});await Z.window.showTextDocument(p)}catch(g){Z.window.showErrorMessage(`Ricwiz: Error running git log - ${g.message}`)}})}var Z,Eo=z(()=>{"use strict";Z=y(require("vscode"));R()});async function Mo(){let t=b();if(!t){ne.window.showErrorMessage("Ricwiz: Open a folder or workspace that is a Git repository.");return}let o=ne.workspace.getConfiguration("ricwiz").get("resetTrackingCommand","sf org disable tracking && sf project reset tracking --no-prompt");await ne.window.withProgress({location:ne.ProgressLocation.Notification,title:"Ricwiz: Resetting tracking...",cancellable:!1},async()=>{try{let{stdout:i,stderr:s}=await f(o,{cwd:t,maxBuffer:52428800}),g=ne.window.createOutputChannel("Ricwiz Reset Tracking");g.appendLine(`Executing: ${o}`),g.appendLine(i),s&&(g.appendLine("--- STDERR ---"),g.appendLine(s)),g.show(),ne.window.showInformationMessage("Ricwiz: Successfully reset tracking!")}catch(i){let s=ne.window.createOutputChannel("Ricwiz Reset Tracking");s.appendLine(`Error executing: ${o}`),i.stdout&&s.appendLine(i.stdout),i.stderr&&s.appendLine(i.stderr),s.appendLine(i.message),s.show(),ne.window.showErrorMessage("Ricwiz: Error resetting tracking. See output channel for details.")}})}var ne,To=z(()=>{"use strict";ne=y(require("vscode"));R()});async function Do(){let t=b();if(!t){K.window.showErrorMessage("Ricwiz: Open a workspace first.");return}let e=["ApexClass","ApexTrigger","CustomObject","CustomField","LightningComponentBundle","AuraDefinitionBundle","Flow","CustomLabel","CustomMetadata","StaticResource","Profile","PermissionSet","PermissionSetGroup","Layout","ValidationRule","RecordType","ListView","Report","EmailTemplate","Other (Type manually)..."],o=await K.window.showQuickPick(e,{placeHolder:"Select Metadata Type to extract (e.g., ApexClass)",ignoreFocusOut:!0});if(!o||o==="Other (Type manually)..."&&(o=await K.window.showInputBox({prompt:"Enter Metadata Type (e.g., CustomApplication, Queue)",ignoreFocusOut:!0}),!o))return;let i={ApexClass:"**/*.cls",ApexTrigger:"**/*.trigger",CustomObject:"**/*.{object,object-meta.xml}",CustomField:"**/*.field-meta.xml",LightningComponentBundle:"**/lwc/*/*.js",AuraDefinitionBundle:"**/aura/*/*.cmp",Flow:"**/*.flow-meta.xml",CustomLabel:"**/*.labels-meta.xml",CustomMetadata:"**/*.md-meta.xml",StaticResource:"**/*.resource-meta.xml",Profile:"**/*.profile-meta.xml",PermissionSet:"**/*.permissionset-meta.xml",PermissionSetGroup:"**/*.permissionsetgroup-meta.xml",Layout:"**/*.layout-meta.xml",ValidationRule:"**/*.validationRule-meta.xml",RecordType:"**/*.recordType-meta.xml",ListView:"**/*.listView-meta.xml"},s=[],g=i[o];if(g)try{s=(await K.workspace.findFiles(g,"**/node_modules/**")).map(m=>{let l=m.fsPath.split(/[\\/]/).pop()||"";if(o==="LightningComponentBundle"||o==="AuraDefinitionBundle"){let n=m.fsPath.split(/[\\/]/);return n[n.length-2]||l.split(".")[0]}return l.split(".")[0]}),s=[...new Set(s)].sort()}catch{}let c=await new Promise(u=>{let m=K.window.createQuickPick();m.title=`Extract ${o}`,m.placeholder="Type name (e.g. MyComponent) or * for all",m.ignoreFocusOut=!0,m.matchOnDescription=!0;let l=()=>{let n=m.value.trim(),r=[];n?r.push({label:`$(cloud-download) Extract "${n}"`,description:"Extract exact name from Salesforce",alwaysShow:!0}):r.push({label:'$(cloud-download) Extract "*" (All)',description:`Extract all ${o}s`,alwaysShow:!0}),s.forEach(d=>{(!n||d.toLowerCase().includes(n.toLowerCase()))&&r.push({label:d,description:"Local workspace component"})}),m.items=r};m.onDidChangeValue(()=>l()),m.onDidAccept(()=>{let n=m.selectedItems[0];if(n){let r=n.label;r.startsWith('$(cloud-download) Extract "')?r=r.replace('$(cloud-download) Extract "',"").replace('" (All)',"").replace('"',""):r==='$(cloud-download) Extract "*" (All)'&&(r="*"),m.hide(),u(r)}}),m.onDidHide(()=>{m.dispose(),u(void 0)}),l(),m.show()});c&&await K.window.withProgress({location:K.ProgressLocation.Notification,title:`Ricwiz: Extracting ${o}:${c} from Salesforce...`,cancellable:!0},async(u,m)=>{try{D.show(!0);let l=`${o}:${c}`,{stdout:n,stderr:r}=await f(`sf project retrieve start -m "${l}"`,{cwd:t});n&&D.appendLine(n),r&&D.appendLine(r),K.window.showInformationMessage(`Ricwiz: Successfully extracted ${l}.`)}catch(l){D.appendLine(`ERROR: ${l.message}`),l.stdout&&D.appendLine(l.stdout),l.stderr&&D.appendLine(l.stderr),K.window.showErrorMessage("Ricwiz: Extraction failed. See Output channel for details.")}})}var K,Ao=z(()=>{"use strict";K=y(require("vscode"));R()});async function Lo(){let t=U.window.activeTextEditor;if(!t){U.window.showErrorMessage("Ricwiz: Please open the file you want to deploy in the editor first.");return}let e=t.document.uri.fsPath,o=b();if(!o)return;let i="";if(await U.window.withProgress({location:U.ProgressLocation.Notification,title:"Ricwiz: Fetching available Salesforce orgs...",cancellable:!1},async()=>{try{let{stdout:m}=await f("sf org list --json",{cwd:o});i=m}catch(m){i=m.stdout||""}}),!i){U.window.showErrorMessage("Ricwiz: Failed to fetch orgs. Is Salesforce CLI installed?");return}let s=[];try{let m=JSON.parse(i),l=m.result?.nonScratchOrgs||[],n=m.result?.scratchOrgs||[];s=[...l,...n]}catch{U.window.showErrorMessage("Ricwiz: Failed to parse org list.");return}if(s.length===0){U.window.showInformationMessage("Ricwiz: No authenticated orgs found.");return}let g=s.map(m=>({label:m.alias||m.username,description:m.alias?m.username:"",picked:m.isDefaultUsername})),c=await U.window.showQuickPick(g,{placeHolder:"Select the org(s) to deploy this file to",canPickMany:!0,ignoreFocusOut:!0});if(!c||c.length===0)return;let u=Io.basename(e);await U.window.withProgress({location:U.ProgressLocation.Notification,title:`Ricwiz: Deploying ${u} to ${c.length} org(s)...`,cancellable:!1},async()=>{D.show(!0),D.appendLine(`--- Starting Parallel Deploy of ${u} ---`);let m=c.map(async d=>{let p=d.label;D.appendLine(`[${p}] Deploying...`);try{let{stdout:a,stderr:h}=await f(`sf project deploy start -d "${e}" -o "${p}"`,{cwd:o});return D.appendLine(`[${p}] \u2705 Success`),a&&D.appendLine(a),{org:p,success:!0}}catch(a){return D.appendLine(`[${p}] \u274C Failed`),a.stdout&&D.appendLine(a.stdout),a.stderr&&D.appendLine(a.stderr),{org:p,success:!1}}}),l=await Promise.all(m),n=l.filter(d=>d.success).length,r=l.filter(d=>!d.success).length;r===0?U.window.showInformationMessage(`Ricwiz: Successfully deployed to all ${n} orgs!`):U.window.showErrorMessage(`Ricwiz: Deploy finished with errors (${n} success, ${r} failed). Check Output channel.`)})}var U,Io,Fo=z(()=>{"use strict";U=y(require("vscode")),Io=y(require("path"));R()});async function Oo(){let t=b();if(!t){M.window.showErrorMessage("Ricwiz: Open a folder or workspace that is a Git repository.");return}let e=M.workspace.getConfiguration("ricwiz"),o=e.get("auditUsername",""),i=e.get("auditHours",8),s=await M.window.showInputBox({prompt:"Enter your Salesforce Username to query in SetupAuditTrail",value:o,placeHolder:"admin@tuaorg.com"});if(!s)return;let g=await M.window.showInputBox({prompt:"How many hours back do you want to search?",value:i.toString(),placeHolder:"8"});if(!g)return;let c=parseFloat(g);if(isNaN(c)||c<=0){M.window.showErrorMessage("Ricwiz: Invalid hours specified.");return}let u=new Date(Date.now()-c*60*60*1e3).toISOString(),l=`sf data query -q "${`SELECT Action, Display, Section FROM SetupAuditTrail WHERE CreatedBy.Username = '${s}' AND CreatedDate >= ${u}`}" --json`;await M.window.withProgress({location:M.ProgressLocation.Notification,title:"Ricwiz: Interrogating Setup Audit Trail...",cancellable:!1},async()=>{try{let{stdout:n}=await f(l,{cwd:t,maxBuffer:52428800}),r=JSON.parse(n);if(!r.result||r.result.records.length===0){M.window.showInformationMessage(`Ricwiz: No changes found for ${s} in the last ${c} hours.`);return}let d=r.result.records,p=[],a=new Set;for(let P of d){let O=si(P.Action,P.Display,P.Section);if(O){let q=`${O.isDelete?"DEL":"ADD"}-${O.metadataFormat}`;if(!a.has(q)){a.add(q);let G=O.isDelete?"$(trash)":"$(plus)";p.push({label:`${G} ${O.metadataFormat}`,description:`${P.Action} -> ${P.Display}`,metadataFormat:O.metadataFormat,isDelete:O.isDelete})}}}if(p.length===0){M.window.showInformationMessage(`Ricwiz: No extractable metadata changes found for ${s} in the last ${c} hours (ignored passwords/logins).`);return}let h=await M.window.showQuickPick(p,{canPickMany:!0,placeHolder:"Select the changes you want to extract to GitLab",ignoreFocusOut:!0});if(!h||h.length===0){M.window.showInformationMessage("Ricwiz: No changes selected.");return}let w=h.filter(P=>P.isDelete),v=h.filter(P=>!P.isDelete),k=M.window.createOutputChannel("Ricwiz Admin Bridge");if(k.show(),w.length>0){let{stdout:P}=await f("git ls-files",{cwd:t}),O=P.split(`
`).map(G=>G.trim()),q=0;for(let G of w){let Ie=G.metadataFormat.split(":"),Le=Ie[0],Re=Ie[1],Fe=Re;Le==="CustomField"&&(Fe=Re.split(".")[1]);let T=O.filter(H=>{let ue=Qe.basename(H);return ue.startsWith(Fe+".")&&ue.includes(Le==="CustomField"?".field":"")});for(let H of T){let ue=Qe.join(t,H);_e.existsSync(ue)&&(_e.unlinkSync(ue),k.appendLine(`Deleted local file: ${H}`),q++)}}M.window.showInformationMessage(`Ricwiz: Deleted ${q} local files from Git workspace.`)}if(v.length===0)return;let B=v.map(P=>P.metadataFormat).filter(P=>P!=="").join(", "),F=await M.window.showInputBox({prompt:"Review and adjust the metadata components to retrieve",value:B,ignoreFocusOut:!0});if(!F)return;let he=`sf project retrieve start -m "${F}"`;k.appendLine(`Executing: ${he}`),M.window.showInformationMessage(`Ricwiz: Extracting ${v.length} components...`);let se=await f(he,{cwd:t});k.appendLine(se.stdout),se.stderr&&(k.appendLine("--- STDERR ---"),k.appendLine(se.stderr)),M.window.showInformationMessage("Ricwiz: Changes extracted successfully! Ready for Git Commit.")}catch(n){M.window.showErrorMessage(`Ricwiz: Error capturing changes - ${n.message}`)}})}function si(t,e,o){if(!t||!e||!o)return null;let i=t.toLowerCase(),s=o.toLowerCase();if(["security controls","network access","session settings","data export","login history","password policies","identity verification","delegated administration"].includes(s)||i.includes("login")||i.includes("password")||i.includes("oauth")||i.includes("session"))return null;let c=i.includes("delete"),u=null;if(i==="permissionsetgroupcomponentadd"||i==="permissionsetgroupcomponentdelete")return null;let m=(l,n=!1)=>{let r=l.replace(/\(.*\)/g,"").trim();r.includes(":")&&!i.includes("calculation")&&(r=r.split(":")[0]);let d=["disabled","deleted","removed","created","changed","updated","from","to","on","assigned","assign","assignment","permission","set","group","apex","class","trigger","custom","field","object","layout","validation","rule","flow","profile"],p=r.split(/\s+/);if(n){for(;p.length>0&&d.includes(p[p.length-1].toLowerCase());)p.pop();for(;p.length>0&&d.includes(p[0].toLowerCase());)p.shift();return p.join(" ").trim().replace(/[^a-zA-Z0-9_ ]/g,"")}else return p.filter(w=>!d.includes(w.toLowerCase())).join("_").replace(/[^a-zA-Z0-9_]/g,"")||r.replace(/\s+/g,"")};if(i.includes("profile"))u=`Profile:${m(e,!0)}`;else if(i.includes("permissionsetgroupcalculation")){let l=e.split(":");u=`PermissionSetGroup:${l.length>1?l[l.length-1].trim():m(e,!1)}`}else if(i.includes("permission set group")||i.includes("permissionsetgroup"))u=`PermissionSetGroup:${m(e,!1)}`;else if(i.includes("permission set")||i.includes("permissionset"))u=`PermissionSet:${m(e,!1)}`;else if(i.includes("apexclass"))u=`ApexClass:${m(e,!1)}`;else if(i.includes("apextrigger")||i.includes("apex trigger"))u=`ApexTrigger:${m(e,!1)}`;else if(i.includes("customfield")){let l=e.match(/([A-Za-z0-9_]+__c)/),n=e.match(/(?:on|na|for)\s+([A-Za-z0-9_]+)/i);l&&n?u=`CustomField:${n[1]}.${l[1]}`:u=`CustomField:${m(e,!1)}`}else if(i.includes("layout"))u=`Layout:${m(e,!0)}`;else if(i.includes("validation"))u=`ValidationRule:${m(e,!1)}`;else if(i.includes("flow"))u=`Flow:${m(e,!1)}`;else if(i.includes("customobject")){let l=e.match(/([A-Za-z0-9_]+__c)/);u=l?`CustomObject:${l[1]}`:`CustomObject:${m(e,!1)}`}else if(!i.includes("created")&&!i.includes("changed")&&!i.includes("deleted"))return null;return u?{metadataFormat:u,isDelete:c}:null}var M,_e,Qe,No=z(()=>{"use strict";M=y(require("vscode")),_e=y(require("fs")),Qe=y(require("path"));R()});async function Uo(){let t=b();if(t)try{let{stdout:e}=await f('git for-each-ref --sort=-committerdate --format="%(refname:short)|||%(committerdate:relative)|||%(subject)" refs/heads/',{cwd:t}),o=e.split(`
`).filter(s=>s.trim()).map(s=>{let g=s.split("|||");return{label:`$(git-branch) ${g[0]}`,description:g[1],detail:g[2],branchName:g[0]}}),i=await at.window.showQuickPick(o,{placeHolder:"Select a branch from history to checkout",matchOnDescription:!0,matchOnDetail:!0});i&&await ze(i.branchName)}catch{at.window.showErrorMessage("Ricwiz: Failed to get branch history")}}var at,jo=z(()=>{"use strict";at=y(require("vscode"));R();He()});async function Jo(){let t=b();if(!t)return;let e=await Te.window.showInputBox({prompt:"Enter ticket number or name (e.g., 48934)",placeHolder:"48934"});if(e)try{let{stdout:o}=await f(`git branch --list "*${e}*"`,{cwd:t}),i=o.split(`
`).map(c=>c.replace("*","").trim()).filter(c=>c);if(i.length===0){Te.window.showInformationMessage(`Ricwiz: No branches found matching "${e}"`);return}let s=i.map(c=>({label:`$(git-branch) ${c}`,branchName:c})),g=await Te.window.showQuickPick(s,{placeHolder:`Select a branch for ${e}`});g&&await ze(g.branchName)}catch{Te.window.showErrorMessage("Ricwiz: Failed to search branches")}}var Te,Wo=z(()=>{"use strict";Te=y(require("vscode"));R();He()});async function Go(){let t=be.window.activeTextEditor;if(!t)return be.window.showErrorMessage("Ricwiz: Please open a file in the editor to check blame."),null;let e=t.document.fileName,o=qo.basename(e),i=b();if(!i)return be.window.showErrorMessage("Ricwiz: Workspace is not a git repository."),null;let s=[];try{let{stdout:n}=await f(`git log -5 --pretty=format:"%an|%ar|%s|%h" -- "${e}"`,{cwd:i}),r=n.trim().split(`
`);for(let d of r){let p=d.split("|");p.length>=4&&s.push({author:p[0],time:p[1],message:p.slice(2,-1).join("|"),hash:p[p.length-1]})}}catch(n){console.error("Git blame error:",n)}let g="Unknown",c="Unknown",u="Unknown",m=[],l=ri(e);if(l)try{await be.window.withProgress({location:be.ProgressLocation.Notification,title:`Ricwiz: Analyzing ${l.name} in Salesforce...`,cancellable:!1},async()=>{let n="";if(l.type==="CustomField"){let r=l.name.split(".");r.length===2&&(n=`SELECT LastModifiedBy.Name, LastModifiedDate, CreatedBy.Name FROM CustomField WHERE DeveloperName = '${r[1].replace("__c","")}' AND TableEnumOrId = '${r[0]}'`)}else l.type==="LightningComponentBundle"?n=`SELECT LastModifiedBy.Name, LastModifiedDate, CreatedBy.Name FROM LightningComponentBundle WHERE DeveloperName = '${l.name}'`:n=`SELECT LastModifiedBy.Name, LastModifiedDate, CreatedBy.Name FROM ${l.type} WHERE Name = '${l.name}'`;if(n)try{let{stdout:r}=await f(`sf data query -t -q "${n}" --json`,{cwd:i,maxBuffer:52428800}),d=JSON.parse(r);if(d&&d.result&&d.result.records&&d.result.records.length>0){let p=d.result.records[0];g=p.LastModifiedBy?p.LastModifiedBy.Name:"Unknown",u=p.CreatedBy?p.CreatedBy.Name:"Unknown",c=new Date(p.LastModifiedDate).toLocaleString()}else g="Not found in Org",c="N/A",u="N/A"}catch{g="Query Error",c="N/A",u="N/A"}try{let r="SELECT Action, Display, CreatedBy.Name, CreatedDate FROM SetupAuditTrail ORDER BY CreatedDate DESC LIMIT 1500",{stdout:d}=await f(`sf data query -q "${r}" --json`,{cwd:i,maxBuffer:52428800}),p=JSON.parse(d);if(p&&p.result&&p.result.records){let a=l.name.replace("__c","");m=p.result.records.filter(w=>w.Display&&w.Display.includes(a)).map(w=>({action:w.Action,display:w.Display,author:w.CreatedBy?w.CreatedBy.Name:"Unknown",time:new Date(w.CreatedDate).toLocaleString()})).slice(0,10)}}catch(r){console.error("Audit trail query error:",r)}})}catch(n){console.error("Salesforce query error:",n)}else g="Unsupported Metadata Type",c="N/A";return{fileName:o,gitHistory:s,sfAuthor:g,sfTime:c,sfCreatedBy:u,auditHistory:m}}function ri(t){let e=t.replace(/\\/g,"/");if(e.includes("/classes/")){let o=e.match(/\/classes\/([^/.]+)\.cls/);if(o)return{type:"ApexClass",name:o[1]}}if(e.includes("/triggers/")){let o=e.match(/\/triggers\/([^/.]+)\.trigger/);if(o)return{type:"ApexTrigger",name:o[1]}}if(e.includes("/lwc/")){let o=e.match(/\/lwc\/([^/]+)\//);if(o)return{type:"LightningComponentBundle",name:o[1]}}if(e.includes("/aura/")){let o=e.match(/\/aura\/([^/]+)\//);if(o)return{type:"AuraDefinitionBundle",name:o[1]}}if(e.includes("/objects/")&&e.includes("/fields/")){let o=e.match(/\/objects\/([^/]+)\//),i=e.match(/\/fields\/([^/.]+)\.field/);if(o&&i)return{type:"CustomField",name:`${o[1]}.${i[1]}`}}return null}var be,qo,Ho=z(()=>{"use strict";be=y(require("vscode")),qo=y(require("path"));R()});function Vo(t,e,o){t.subscriptions.push(C.commands.registerCommand("ricwiz.generateDestructiveChanges",bt),C.commands.registerCommand("ricwiz.runSmartTests",kt),C.commands.registerCommand("ricwiz.refreshWebview",()=>{e&&C.commands.executeCommand("workbench.action.webview.reloadWebviewAction")}),C.commands.registerCommand("ricwiz.createBranches",Rt),C.commands.registerCommand("ricwiz.prepareDeploy",Et),C.commands.registerCommand("ricwiz.createMergeRequests",Dt),C.commands.registerCommand("ricwiz.createMergeRequestsVSCode",At),C.commands.registerCommand("ricwiz.openJiraTicket",Ft),C.commands.registerCommand("ricwiz.openJiraTicketVSCode",Ot),C.commands.registerCommand("ricwiz.showJiraDetails",()=>{e&&to(e)}),C.commands.registerCommand("ricwiz.openJiraDashboard",i=>{e&&io(e,i)}),C.commands.registerCommand("ricwiz.openJiraDetailsForId",i=>{e&&no(e,i)}),C.commands.registerCommand("ricwiz.toggleDashboardBranches",i=>{e&&(e.setDashboardShowBranches(i),C.commands.executeCommand("ricwiz.openJiraDashboard"))}),C.commands.registerCommand("ricwiz.changeJiraStatus",ro),C.commands.registerCommand("ricwiz.addJiraComment",ao),C.commands.registerCommand("ricwiz.addJiraLabel",co),C.commands.registerCommand("ricwiz.setJiraToken",lo),C.commands.registerCommand("ricwiz.setGitlabToken",po),C.commands.registerCommand("ricwiz.syncAll",go),C.commands.registerCommand("ricwiz.updateBases",ho),C.commands.registerCommand("ricwiz.deleteUnusedBranches",vo),C.commands.registerCommand("ricwiz.checkoutBranch",ze),C.commands.registerCommand("ricwiz.copyBranchName",bo),C.commands.registerCommand("ricwiz.generatePackageXml",Co),C.commands.registerCommand("ricwiz.deployPackage",zo),C.commands.registerCommand("ricwiz.importData",So),C.commands.registerCommand("ricwiz.listTicketFiles",Po),C.commands.registerCommand("ricwiz.resetTracking",Mo),C.commands.registerCommand("ricwiz.extractComponent",Do),C.commands.registerCommand("ricwiz.deployMultiOrg",Lo),C.commands.registerCommand("ricwiz.captureAdminChanges",Oo),C.commands.registerCommand("ricwiz.openHistory",Uo),C.commands.registerCommand("ricwiz.searchTicket",Jo),C.commands.registerCommand("ricwiz.whoToBlame",async()=>{let i=await Go();i&&e&&(e.setBlameData(i),e.setPage("blame"))}),C.commands.registerCommand("ricwiz.manualRefresh",()=>{o&&o()}),C.commands.registerCommand("ricwiz.toggleAutoRefresh",()=>{if(e){let i=!e.isAutoRefreshEnabled();e.setAutoRefresh(i),C.workspace.getConfiguration("ricwiz").update("autoRefresh",i,C.ConfigurationTarget.Global)}}),C.commands.registerCommand("ricwiz.openSettings",()=>{C.commands.executeCommand("workbench.action.openSettings","ricwiz")}))}var C,_o=z(()=>{"use strict";C=y(require("vscode"));xt();Ct();St();Mt();It();Nt();oo();so();mo();uo();fo();wo();yo();He();xo();$o();Ro();Bo();Eo();To();Ao();Fo();No();jo();Wo();Ho()});function Qo(t,e,o){let i,s=ce.workspace.getConfiguration("ricwiz").get("autoRefresh",!0);e?.setAutoRefresh(s),t.subscriptions.push(ce.workspace.onDidChangeConfiguration(c=>{if(c.affectsConfiguration("ricwiz.autoRefresh")){let u=ce.workspace.getConfiguration("ricwiz").get("autoRefresh",!0);e?.setAutoRefresh(u)}}));async function g(){let c=ce.extensions.getExtension("vscode.git");if(c){let l=function(n){let r="",d;async function p(){let h=ce.workspace.workspaceFolders;if(!h)return;let w=h[0].uri.fsPath,v=await A(w);if(v&&v!==r){r=v;let k=ce.workspace.getConfiguration("ricwiz"),B=k.get("ticketPrefix","SFPSCA-");if(!v.includes(B)){let T=v.match(/([A-Z]+-)\d+/i);T&&(B=T[1].toUpperCase())}let F=[],he=[],se=[],P=[],O=k.get("environments",[{name:"Qual",sourceBranch:"quality"},{name:"Val",sourceBranch:"validation"},{name:"Prod",sourceBranch:"main"}]);try{let T=k.get("workspaceCheckoutButtons",["main","quality","validation"]);se=Array.from(new Set(T))}catch{}let q="",G=v.match(new RegExp(`(${B}\\d+(?:-\\d+)?)`,"i"));if(G){let T=G[1].toUpperCase();q=T;let H=k.get("commitMessageSuffix","- "),ue=/^[A-Z]+-\d+(?:-\d+)?\s*(?:-\s*|:\s*|\s+)?/i;ue.test(n.inputBox.value)?n.inputBox.value.toUpperCase().startsWith(T)||(n.inputBox.value=n.inputBox.value.replace(ue,`${T}${H}`)):n.inputBox.value=`${T}${H}`+n.inputBox.value,o.text=`$(bookmark) ${T}`,o.tooltip=`Branch: ${v}
Click to open Jira ticket`,o.show();try{let ct=await st(w,T,v);F=await tt(w,ct,T,O)}catch{}}else{o.hide();try{P=await nt(w)}catch{}}let[Ie,Le,Re]=await Promise.all([it(w,10),ot(w,v,O),q?$e(q).catch(T=>{let H=T.message;return(H.includes("ENOTFOUND")||H.includes("network"))&&(H="No Internet or Invalid URL"),{summary:`\u26A0\uFE0F Jira Error: ${H}`,description:""}}):Promise.resolve(null)]);he=Ie;let Fe=Re?Re.summary:"";e?.updateBranch(v,Le,F,he,se,P,Fe)}}function a(){e?.isAutoRefreshEnabled()&&(d&&clearTimeout(d),d=setTimeout(()=>{r="",p()},300))}i=()=>{r="",p()},p(),n.state.onDidChange(()=>a()),ce.window.onDidChangeWindowState(h=>{h.focused&&a()})};var u=l;c.isActive||await c.activate();let m=c.exports.getAPI(1);m.repositories.length>0&&m.repositories.forEach(n=>l(n)),m.onDidOpenRepository(n=>l(n))}}return g(),()=>{i&&i()}}var ce,Yo=z(()=>{"use strict";ce=y(require("vscode"));R();Ee();Pe()});var Je={};Ye(Je,{activate:()=>ai,deactivate:()=>ci,webviewProvider:()=>De});module.exports=X(Je);function ai(t){mt(t),De=new Ne(t.extensionUri),t.subscriptions.push(Ae.window.registerWebviewViewProvider("ricwiz-webview",De));let e=Ae.window.createStatusBarItem(Ae.StatusBarAlignment.Left,100);e.command="ricwiz.openJiraTicket",t.subscriptions.push(e);let o=Qo(t,De,e);Vo(t,De,o)}function ci(){}var Ae,De,We=z(()=>{Ae=y(require("vscode"));lt();xe();_o();Yo()});We();0&&(module.exports={activate,deactivate,webviewProvider});
