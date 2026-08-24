"use strict";var Xo=Object.create;var We=Object.defineProperty;var ei=Object.getOwnPropertyDescriptor;var ti=Object.getOwnPropertyNames;var oi=Object.getPrototypeOf,ii=Object.prototype.hasOwnProperty;var z=(t,e,o)=>()=>{if(o)throw o[0];try{return t&&(e=t(t=0)),e}catch(s){throw o=[s],s}};var De=(t,e)=>{for(var o in e)We(t,o,{get:e[o],enumerable:!0})},ht=(t,e,o,s)=>{if(e&&typeof e=="object"||typeof e=="function")for(let r of ti(e))!ii.call(t,r)&&r!==o&&We(t,r,{get:()=>e[r],enumerable:!(s=ei(e,r))||s.enumerable});return t};var y=(t,e,o)=>(o=t!=null?Xo(oi(t)):{},ht(e||!t||!t.__esModule?We(o,"default",{value:t,enumerable:!0}):o,t)),O=t=>ht(We({},"__esModule",{value:!0}),t);function $(t){return t.replace(/&/g,"&amp;").replace(/</g,"&lt;").replace(/>/g,"&gt;").replace(/"/g,"&quot;").replace(/'/g,"&#39;")}var k,qe,wt=z(()=>{"use strict";k=y(require("vscode"));qe=class{constructor(e){this._extensionUri=e}_extensionUri;webviewView;resolveWebviewView(e,o,s){this.webviewView=e,e.webview.options={enableScripts:!0,localResourceRoots:[this._extensionUri]},this.updateBranch("",!1),e.webview.onDidReceiveMessage(r=>{switch(r.command){case"createBranches":k.commands.executeCommand("ricwiz.createBranches");break;case"createBranchForTicket":k.commands.executeCommand("ricwiz.createBranches",r.args);break;case"prepareDeploy":k.commands.executeCommand("ricwiz.prepareDeploy");break;case"openMRs":k.commands.executeCommand("ricwiz.createMergeRequests");break;case"openMRsVSCode":k.commands.executeCommand("ricwiz.createMergeRequestsVSCode");break;case"openExternal":r.args&&k.env.openExternal(k.Uri.parse(r.args));break;case"openJira":k.commands.executeCommand("ricwiz.openJiraTicket");break;case"showJiraDetails":k.commands.executeCommand("ricwiz.showJiraDetails");break;case"changeJiraStatus":k.commands.executeCommand("ricwiz.changeJiraStatus");break;case"addJiraComment":k.commands.executeCommand("ricwiz.addJiraComment");break;case"addJiraLabel":k.commands.executeCommand("ricwiz.addJiraLabel");break;case"setPage":this.setPage(r.args);break;case"openDashboard":k.commands.executeCommand("ricwiz.openJiraDashboard");break;case"openJiraDetailsForId":k.commands.executeCommand("ricwiz.openJiraDetailsForId",r.args);break;case"refreshDashboard":k.commands.executeCommand("ricwiz.openJiraDashboard");break;case"switchDashboardQuery":k.commands.executeCommand("ricwiz.openJiraDashboard",parseInt(r.args));break;case"toggleDashboardBranches":k.commands.executeCommand("ricwiz.toggleDashboardBranches",r.args);break;case"openJiraVSCode":k.commands.executeCommand("ricwiz.openJiraTicketVSCode");break;case"openSettings":k.commands.executeCommand("ricwiz.openSettings");break;case"checkout":r.branch&&k.commands.executeCommand("ricwiz.checkoutBranch",r.branch);break;case"copyBranch":k.commands.executeCommand("ricwiz.copyBranchName");break;case"generatePackageXml":k.commands.executeCommand("ricwiz.generatePackageXml");break;case"openDevTools":this.setPage("devtools");break;case"openMain":this.setPage("main");break;case"generateDestructiveChanges":k.commands.executeCommand("ricwiz.generateDestructiveChanges");break;case"deployPackage":k.commands.executeCommand("ricwiz.deployPackage");break;case"runSmartTests":k.commands.executeCommand("ricwiz.runSmartTests");break;case"importData":k.commands.executeCommand("ricwiz.importData");break;case"listTicketFiles":k.commands.executeCommand("ricwiz.listTicketFiles");break;case"resetTracking":k.commands.executeCommand("ricwiz.resetTracking");break;case"extractComponent":k.commands.executeCommand("ricwiz.extractComponent");break;case"deployMultiOrg":k.commands.executeCommand("ricwiz.deployMultiOrg");break;case"captureAdminChanges":k.commands.executeCommand("ricwiz.captureAdminChanges");break;case"whoToBlame":k.commands.executeCommand("ricwiz.whoToBlame");break;case"syncAll":k.commands.executeCommand("ricwiz.syncAll");break;case"updateBases":k.commands.executeCommand("ricwiz.updateBases");break;case"deleteUnused":k.commands.executeCommand("ricwiz.deleteUnusedBranches");break;case"conflict_commitAndContinue":k.commands.executeCommand("ricwiz.conflictAction","commitAndContinue");break;case"conflict_resolveDeletions":k.commands.executeCommand("ricwiz.conflictAction","resolveDeletions");break;case"conflict_abortDeploy":k.commands.executeCommand("ricwiz.conflictAction","abortDeploy");break;case"openFile":if(r.file){let c=k.workspace.workspaceFolders;if(c){let d=k.Uri.joinPath(c[0].uri,r.file);k.commands.executeCommand("vscode.open",d)}}break;case"searchTicket":k.commands.executeCommand("ricwiz.searchTicket");break;case"manualRefresh":k.commands.executeCommand("ricwiz.manualRefresh");break;case"toggleAutoRefresh":k.commands.executeCommand("ricwiz.toggleAutoRefresh");break;case"openHistory":k.commands.executeCommand("ricwiz.openHistory");break}})}conflictState=null;setConflictState(e){this.conflictState=e,this.updateView()}updateBranch(e,o,s=[],r=[],c=[],d=[],u="",p=""){this.webviewView&&(this.currentBranchCache=e,this.currentBranchIsMergedCache=o,this.relatedBranchesCache=s,this.commitsCache=r,this.baseBranchesCache=c,this.recentTicketsCache=d,this.ticketTitleCache=u,this.ticketStatusCache=p,this.updateView())}currentBranchCache="";currentBranchIsMergedCache=!1;relatedBranchesCache=[];commitsCache=[];baseBranchesCache=[];recentTicketsCache=[];ticketTitleCache="";ticketStatusCache="";currentPage="main";blameDataCache=null;jiraDataCache=null;dashboardDataCache=null;dashboardShowBranches=!1;autoRefreshEnabled=!0;setDashboardShowBranches(e){this.dashboardShowBranches=e}getDashboardShowBranches(){return this.dashboardShowBranches}setBlameData(e){this.blameDataCache=e}setJiraData(e){this.jiraDataCache=e}setDashboardData(e){this.dashboardDataCache=e}setAutoRefresh(e){this.autoRefreshEnabled=e,this.updateView()}isAutoRefreshEnabled(){return this.autoRefreshEnabled}setPage(e){this.currentPage=e,this.updateView()}updateView(){if(!this.webviewView)return;let e=this.webviewView.webview.asWebviewUri(k.Uri.joinPath(this._extensionUri,"resources","logo.png"));this.webviewView.webview.html=this._getHtmlForWebview(e,this.currentBranchCache,this.relatedBranchesCache,this.commitsCache,this.baseBranchesCache,this.recentTicketsCache,this.currentPage)}_getHtmlForWebview(e,o,s,r,c,d,u){let p=r.length>0?`
            <div class="separator"></div>
            <div style="padding: 0 4px;">
                <div style="font-size: 11px; opacity: 0.7; margin-bottom: 6px; display: flex; align-items: center; gap: 4px;">
                    <span>\u{1F4DC}</span> Recent Commits
                </div>
                <div style="display: flex; flex-direction: column; gap: 2px;">
                    ${r.map(f=>`
                        <div style="font-size: 11px; padding: 3px 4px; border-radius: 2px; display: flex; gap: 6px; align-items: baseline;">
                            <code style="color: var(--vscode-textLink-foreground); font-size: 10px; flex-shrink: 0;">${$(f.hash)}</code>
                            <span style="flex: 1; overflow: hidden; text-overflow: ellipsis; white-space: nowrap;" title="${$(f.message)}">${$(f.message)}</span>
                            <span style="font-size: 9px; opacity: 0.5; flex-shrink: 0;">${$(f.timeAgo)}</span>
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
        `;if(this.conflictState){let f=(this.conflictState.files||[]).map(w=>`
                <button class="btn" style="padding: 6px; font-size: 12px; display: flex; justify-content: space-between; align-items: center;" onclick="sendOpenFileCommand('${$(w.file)}')">
                    <span style="flex: 1; overflow: hidden; text-overflow: ellipsis; white-space: nowrap; direction: rtl; text-align: left;">&lrm;${$(w.file)}</span>
                    <span style="font-size: 10px; opacity: 0.8; flex-shrink: 0; background-color: var(--vscode-badge-background); color: var(--vscode-badge-foreground); padding: 2px 4px; border-radius: 2px;">${$(w.state)}</span>
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
                
                ${f?`
                    <div style="font-size: 11px; opacity: 0.7; margin: 8px 4px 4px 4px; text-transform: uppercase;">Conflicted Files</div>
                    <div style="display: flex; flex-direction: column; gap: 2px;">
                        ${f}
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
            </html>`}if(u==="blame"){let f=this.blameDataCache;return`<!DOCTYPE html>
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

                ${f?`
                <div style="padding: 12px; background: var(--vscode-editor-background); border: 1px solid var(--vscode-widget-border); border-radius: 6px; margin-bottom: 12px;">
                    <div style="font-weight: bold; margin-bottom: 12px; font-size: 14px; text-align: center; color: var(--vscode-textLink-foreground); word-break: break-all;">
                        \u{1F4C4} ${f.fileName}
                    </div>


                    <div style="margin-bottom: 20px;">
                        <div style="font-size: 11px; font-weight: bold; opacity: 0.8; text-transform: uppercase; margin-bottom: 8px;"><span class="icon">\u{1F4BB}</span> Local Git (Last Commits)</div>
                        <ul style="list-style-type: none; padding: 0; margin: 0; display: flex; flex-direction: column; gap: 8px;">
                            ${f.gitHistory&&f.gitHistory.length>0?f.gitHistory.map(w=>`
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
                                <div style="font-weight: bold; font-size: 13px;">${f.sfAuthor}</div>
                                <div style="font-size: 11px; opacity: 0.7; margin-top: 2px;">${f.sfTime}</div>
                            </div>
                            ${f.sfCreatedBy!=="Unknown"&&f.sfCreatedBy!=="N/A"?`
                            <div style="background: var(--vscode-editorWidget-background); border: 1px solid var(--vscode-widget-border); padding: 8px 10px; border-radius: 4px; border-left: 4px solid var(--vscode-gitDecoration-addedResourceForeground);">
                                <div style="font-size: 10px; opacity: 0.7; text-transform: uppercase; margin-bottom: 2px;">Created By</div>
                                <div style="font-weight: bold; font-size: 13px;">${f.sfCreatedBy}</div>
                            </div>
                            `:""}
                        </div>
                    </div>

                    <div>
                        <div style="font-size: 11px; font-weight: bold; opacity: 0.8; text-transform: uppercase; margin-bottom: 8px;"><span class="icon">\u{1F575}\uFE0F</span> Setup Audit Trail (Recent)</div>
                        <ul style="list-style-type: none; padding: 0; margin: 0; display: flex; flex-direction: column; gap: 8px;">
                            ${f.auditHistory&&f.auditHistory.length>0?f.auditHistory.map(w=>`
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
            </html>`}if(u==="jira"){let f=this.jiraDataCache,w=f?.ticketId||"Jira",v=f?.summary||"No Title",x=f?.description||"No description provided.",R=f?.relatedBranches||[];return`<!DOCTYPE html>
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
                    <span style="font-weight: 600; font-size: 13px;">${w} Details</span>
                </div>
                
                <div class="card" style="padding: 16px;">
                    <div class="jira-title">${$(v)}</div>
                    <div class="jira-desc">${$(x)}</div>
                    
                    ${R.length>0?`
                        <div style="margin-top: 16px; border-top: 1px solid var(--vscode-panel-border); padding-top: 12px;">
                            <div style="font-size: 11px; opacity: 0.7; margin-bottom: 8px; text-transform: uppercase; font-weight: bold;"><span class="icon">\u{1F33F}</span> Related Branches & MRs</div>
                            <div style="display: flex; flex-direction: column; gap: 4px;">
                                ${R.map(B=>{let U="";return B.pipelineStatus==="running"?U="\u23F3":B.pipelineStatus==="success"?U="\u2705":B.pipelineStatus==="failed"?U="\u274C":B.pipelineStatus==="canceled"?U="\u{1F6D1}":B.pipelineStatus==="skipped"&&(U="\u23ED\uFE0F"),`
                                    <div class="btn" style="padding: 6px 10px; font-size: 12px; display: flex; justify-content: space-between; align-items: center; background-color: var(--vscode-button-secondaryBackground); color: var(--vscode-button-secondaryForeground); border-radius: 4px;" onclick="sendCheckoutCommand('${$(B.name)}')" title="Checkout ${$(B.name)}">
                                        <div style="display: flex; align-items: center; gap: 6px; overflow: hidden;">
                                            <span style="overflow: hidden; text-overflow: ellipsis; white-space: nowrap; font-weight: bold;">${$(B.name)}</span>
                                        </div>
                                        <div style="display: flex; gap: 6px; align-items: center;">
                                            ${U?`<span title="Pipeline: ${B.pipelineStatus}" style="font-size: 11px;">${U}</span>`:""}
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
            </html>`}if(u==="dashboard"){let f=this.dashboardDataCache||{queries:[],selectedIndex:0,results:[],error:null},w=f.queries.map((x,R)=>`
                <option value="${R}" ${R===f.selectedIndex?"selected":""}>${$(x.name)}</option>
            `).join(""),v=f.error?`
                <div style="color: var(--vscode-errorForeground); padding: 12px; text-align: center; background: var(--vscode-editorError-background); border-radius: 4px;">
                    \u26A0\uFE0F ${$(f.error)}
                </div>
            `:f.results.length===0?`
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
                        ${f.results.map(x=>`
                            <tr style="border-bottom: ${x.detailedBranches&&x.detailedBranches.length>0?"none":"1px solid var(--vscode-panel-border)"}; cursor: pointer;" class="tr-hover" onclick="sendCommand('openJiraDetailsForId', '${$(x.key)}')">
                                <td style="padding: 6px; font-weight: bold; color: var(--vscode-textLink-foreground); white-space: nowrap;">${$(x.key)}</td>
                                <td style="padding: 6px; overflow: hidden; text-overflow: ellipsis; max-width: 150px; white-space: nowrap;" title="${$(x.summary)}">${$(x.summary)}</td>
                                <td style="padding: 6px; white-space: nowrap;">
                                    <span style="background: var(--vscode-badge-background); color: var(--vscode-badge-foreground); padding: 2px 4px; border-radius: 3px; font-size: 9px;">${$(x.status)}</span>
                                </td>
                                <td style="padding: 6px; white-space: nowrap; text-align: center;">
                                    ${x.detailedBranches?"":x.branch?`
                                        <button class="icon-button" style="background-color: var(--vscode-button-secondaryBackground); color: var(--vscode-button-secondaryForeground); font-size: 10px; padding: 2px 6px;" title="Checkout ${$(x.branch)}" onclick="event.stopPropagation(); sendCommand('checkout', { branch: '${$(x.branch)}' })">
                                            \u{1F33F} Checkout
                                        </button>
                                    `:`
                                        <button class="icon-button" style="background-color: var(--vscode-button-background); color: var(--vscode-button-foreground); font-size: 10px; padding: 2px 6px;" title="Create Branch for ${$(x.key)}" onclick="event.stopPropagation(); sendCommand('createBranchForTicket', '${$(x.key)}')">
                                            \u2795 Create
                                        </button>
                                    `}
                                </td>
                            </tr>
                            ${x.detailedBranches&&x.detailedBranches.length>0?`
                            <tr style="border-bottom: 1px solid var(--vscode-panel-border);">
                                <td colspan="4" style="padding: 0 6px 8px 6px;">
                                    <div style="display: flex; flex-direction: column; gap: 4px; padding-left: 8px; border-left: 2px solid var(--vscode-editorIndentGuide-activeBackground1);">
                                        ${x.detailedBranches.map(R=>{let B="";return R.pipelineStatus==="running"?B="\u23F3":R.pipelineStatus==="success"?B="\u2705":R.pipelineStatus==="failed"?B="\u274C":R.pipelineStatus==="canceled"?B="\u{1F6D1}":R.pipelineStatus==="skipped"&&(B="\u23ED\uFE0F"),`
                                            <div style="display: flex; justify-content: space-between; align-items: center; font-size: 10px; background: var(--vscode-editor-background); padding: 2px 6px; border-radius: 3px;">
                                                <div style="display: flex; align-items: center; gap: 6px; overflow: hidden; cursor: pointer; flex: 1;" onclick="sendCheckoutCommand('${$(R.name)}')" title="Checkout ${$(R.name)}">
                                                    <span style="overflow: hidden; text-overflow: ellipsis; white-space: nowrap;">${$(R.name)}</span>
                                                    ${B?`<span title="Pipeline: ${R.pipelineStatus}">${B}</span>`:""}
                                                </div>
                                                <div style="display: flex; gap: 6px; align-items: center;">
                                                    ${R.mrUrl?`<span onclick="event.stopPropagation(); sendCommand('openExternal', '${R.mrUrl}');" title="Open Merge Request" style="cursor: pointer;">\u{1F517}</span>`:""}
                                                    ${R.isMerged?'<span style="background-color: var(--vscode-charts-green); color: white; border-radius: 3px; padding: 1px 4px; font-size: 8px; font-weight: bold;">MERGED</span>':""}
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
                
                ${f.queries.length>0?`
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
            </html>`;let i=s.find(f=>f.name===o),n="";i&&(i.pipelineStatus==="running"?n="\u23F3":i.pipelineStatus==="success"?n="\u2705":i.pipelineStatus==="failed"?n="\u274C":i.pipelineStatus==="canceled"?n="\u{1F6D1}":i.pipelineStatus==="skipped"&&(n="\u23ED\uFE0F"));let a=i?i.mrUrl:void 0,m=s.filter(f=>f.name!==o),g=o?`<div style="background-color: var(--vscode-editor-inactiveSelectionBackground); padding: 10px; border-radius: 6px; margin-bottom: 16px; border: 1px solid var(--vscode-panel-border); box-shadow: 0 2px 4px rgba(0,0,0,0.1); position: relative;">
                    ${this.ticketTitleCache&&this.ticketStatusCache?`
                    <div style="position: absolute; top: 6px; right: 6px; z-index: 10; cursor: pointer; font-size: 9px; padding: 2px 6px; border-radius: 4px; background-color: var(--vscode-button-secondaryBackground); border: 1px solid var(--vscode-panel-border); opacity: 0.9; font-weight: bold; text-transform: uppercase; display: flex; align-items: center; gap: 4px;" onclick="sendCommand('changeJiraStatus')" title="Update Jira Status">
                        <span>\u{1F4DD}</span> ${$(this.ticketStatusCache)}
                    </div>
                    `:""}
                    <div style="font-size: 10px; opacity: 0.7; margin-bottom: 4px; display: flex; align-items: center; justify-content: center; gap: 4px; text-transform: uppercase;">
                        Current Ticket / Branch
                        <button class="copy-btn" onclick="sendCommand('copyBranch')" title="Copy branch name to clipboard">\u{1F4CB}</button>
                    </div>
                    <div style="font-weight: bold; font-size: 14px; word-break: break-all; text-align: center; color: var(--vscode-textLink-foreground); display: flex; justify-content: center; align-items: center; gap: 6px;">
                        ${$(o)} 
                        ${n?`<span title="Pipeline: ${i.pipelineStatus}" style="font-size: 12px;">${n}</span>`:""}
                        ${a?`<span onclick="event.stopPropagation(); sendCommand('openExternal', '${a}');" title="Open Merge Request" style="cursor: pointer; font-size: 12px;">\u{1F517}</span>`:""}
                        ${this.currentBranchIsMergedCache?'<span style="background-color: var(--vscode-charts-green); color: white; border-radius: 3px; padding: 1px 4px; font-size: 10px; font-weight: bold;" title="Merged to target env">MERGED</span>':""}
                    </div>
                    ${this.ticketTitleCache?`<div style="font-size: 12px; margin-top: 6px; text-align: center; opacity: 0.9; font-style: italic;">${$(this.ticketTitleCache)}</div>`:""}
                    ${m.length>0?`
                        <div style="margin-top: 10px; border-top: 1px solid var(--vscode-panel-border); padding-top: 10px;">
                            <div style="font-size: 10px; opacity: 0.7; margin-bottom: 6px; text-transform: uppercase; text-align: center;">Sister Branches</div>
                            <div style="display: flex; flex-direction: column; gap: 4px;">
                                ${m.map(f=>{let w="";return f.pipelineStatus==="running"?w="\u23F3":f.pipelineStatus==="success"?w="\u2705":f.pipelineStatus==="failed"?w="\u274C":f.pipelineStatus==="canceled"?w="\u{1F6D1}":f.pipelineStatus==="skipped"&&(w="\u23ED\uFE0F"),`
                                    <div class="btn" style="padding: 4px 8px; font-size: 11px; display: flex; justify-content: space-between; align-items: center; background-color: var(--vscode-button-secondaryBackground); color: var(--vscode-button-secondaryForeground); border-radius: 4px;" onclick="sendCheckoutCommand('${$(f.name)}', this)" title="Checkout ${$(f.name)}">
                                        <div style="display: flex; align-items: center; gap: 4px; overflow: hidden;">
                                            <span style="overflow: hidden; text-overflow: ellipsis; white-space: nowrap; font-weight: bold;">${$(f.name)}</span>
                                        </div>
                                        <div style="display: flex; gap: 4px; align-items: center;">
                                            ${w?`<span title="Pipeline: ${f.pipelineStatus}" style="font-size: 10px;">${w}</span>`:""}
                                            ${f.mrUrl?`<span onclick="event.stopPropagation(); sendCommand('openExternal', '${f.mrUrl}');" title="Open Merge Request" style="cursor: pointer; font-size: 10px;">\u{1F517}</span>`:""}
                                            ${f.isMerged?'<span style="background-color: var(--vscode-charts-green); color: white; border-radius: 3px; padding: 1px 4px; font-size: 9px; font-weight: bold;" title="Merged to target env">MERGED</span>':""}
                                        </div>
                                    </div>
                                    `}).join("")}
                            </div>
                        </div>
                    `:d.length>0?`
                        <div style="margin-top: 10px; border-top: 1px solid var(--vscode-panel-border); padding-top: 10px;">
                            <div style="font-size: 10px; opacity: 0.7; margin-bottom: 6px; text-transform: uppercase; text-align: center;">Recent Tickets</div>
                            <div style="display: flex; flex-direction: column; gap: 4px;">
                                ${d.map(f=>`
                                    <div class="btn" style="padding: 4px 8px; font-size: 11px; display: flex; align-items: center; background-color: var(--vscode-button-secondaryBackground); color: var(--vscode-button-secondaryForeground); border-radius: 4px;" onclick="sendCheckoutCommand('${$(f)}', this)" title="Checkout ${$(f)}">
                                        <span style="font-weight: bold;">${$(f)}</span>
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

            ${g}


            ${c.length>0?`
                <div style="display: flex; gap: 4px; margin-bottom: 16px; flex-wrap: wrap; justify-content: center;">
                    ${c.map(f=>`
                        <button class="btn" style="flex: 1; min-width: 25%; justify-content: center; padding: 6px 4px; font-size: 10px; font-weight: bold; background-color: var(--vscode-button-secondaryBackground); color: var(--vscode-button-secondaryForeground); border-radius: 4px;" onclick="sendCheckoutCommand('${$(f)}', this)" title="Checkout ${$(f)}">
                            ${$(f.toUpperCase())}
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
        </html>`}}});function vt(t){de=t.secrets}async function yt(t){if(!de)throw new Error("SecretStorage is not initialized.");await de.store("ricwiz.jiraApiToken",t)}async function bt(){if(!de)throw new Error("SecretStorage is not initialized.");return await de.get("ricwiz.jiraApiToken")}async function xt(t){if(!de)throw new Error("SecretStorage is not initialized.");await de.store("ricwiz.gitlabApiToken",t)}async function st(){if(!de)throw new Error("SecretStorage is not initialized.");return await de.get("ricwiz.gitlabApiToken")}var de,ze=z(()=>{"use strict"});var Ae={};De(Ae,{checkBranchExists:()=>fe,exec:()=>h,extractTicketSuggestion:()=>Be,getCurrentBranch:()=>F,getWorkspaceCwd:()=>b,normalizeTicketId:()=>$t,promptForTicketId:()=>W,resolvePrefix:()=>Pe,ricwizLogger:()=>I});function b(){let t=Se.workspace.workspaceFolders;if(t)return t[0].uri.fsPath}async function F(t){try{let{stdout:e}=await h("git branch --show-current",{cwd:t});return e.trim()}catch{return""}}function Pe(t,e){if(!t.includes(e)){let o=t.match(/([A-Z]+-)\d+/i);if(o)return o[1].toUpperCase()}return e}function Be(t,e,o=!1){let s=t.match(new RegExp(`(${e}\\d+)`,"i"));return s?s[1].toUpperCase():t.includes(e)&&!t.includes("-to-")?t.substring(t.indexOf(e)):o&&t.includes("-to-")?t.substring(t.indexOf(e)).split("-to-")[0]:""}function $t(t,e){let o=t.trim();return/^\d/.test(o)?`${e}${o}`.toUpperCase():o.toUpperCase()}async function W(t,e){let o=Se.workspace.getConfiguration("ricwiz"),s=e?.prefix??o.get("ticketPrefix","SFPSCA-"),r=await F(t),c=Pe(r,s),d=e?.suggestedValue??Be(r,c,e?.handleToSuffix),u=await Se.window.showInputBox({prompt:e?.prompt||"Enter the full ticket ID (e.g., SCPSCA-1234) or just the number",placeHolder:e?.placeHolder||"Ticket ID or number",value:d});return u?{ticketId:$t(u,c),currentBranch:r,prefix:c}:void 0}async function fe(t,e){try{return await h(`git show-ref --verify --quiet refs/heads/${e}`,{cwd:t}),!0}catch{}try{return await h(`git show-ref --verify --quiet refs/remotes/origin/${e}`,{cwd:t}),!0}catch{}return!1}var Se,kt,Ct,ni,I,h,S=z(()=>{"use strict";Se=y(require("vscode")),kt=y(require("child_process")),Ct=y(require("util")),ni=Ct.promisify(kt.exec),I=Se.window.createOutputChannel("Ricwiz"),h=async(t,e)=>{I.appendLine(`[EXEC] ${t}`);let o=await ni(t,{maxBuffer:50*1024*1024,...e});return{stdout:o.stdout.toString(),stderr:o.stderr.toString()}}});async function Rt(){let t=b();if(!t){q.window.showErrorMessage("Ricwiz: Open a workspace that is a Git repository.");return}let o=q.workspace.getConfiguration("ricwiz").get("ticketSourceBranch","main");await q.window.withProgress({location:q.ProgressLocation.Notification,title:`Ricwiz: Finding deleted files compared to origin/${o}...`,cancellable:!1},async()=>{try{let{stdout:s}=await h(`git diff --name-only --diff-filter=D origin/${o}...HEAD`,{cwd:t}),r=s.split(`
`).map(a=>a.trim()).filter(a=>a.length>0);if(r.length===0){q.window.showInformationMessage(`Ricwiz: No deleted files found compared to origin/${o}.`);return}let c={},d=(a,m)=>{c[a]||(c[a]=[]),c[a].includes(m)||c[a].push(m)};for(let a of r){let m=a.replace(/\\/g,"/");if(m.includes("/classes/")){let g=m.match(/\/classes\/([^/.]+)\.cls/);g&&d("ApexClass",g[1])}else if(m.includes("/triggers/")){let g=m.match(/\/triggers\/([^/.]+)\.trigger/);g&&d("ApexTrigger",g[1])}else if(m.includes("/lwc/")){let g=m.match(/\/lwc\/([^/]+)\//);g&&d("LightningComponentBundle",g[1])}else if(m.includes("/aura/")){let g=m.match(/\/aura\/([^/]+)\//);g&&d("AuraDefinitionBundle",g[1])}else if(m.includes("/objects/")&&m.includes("/fields/")){let g=m.match(/\/objects\/([^/]+)\//),f=m.match(/\/fields\/([^/.]+)\.field/);g&&f&&d("CustomField",`${g[1]}.${f[1]}`)}else if(m.includes("/objects/")){let g=m.match(/\/objects\/([^/.]+)\.object/);g&&d("CustomObject",g[1])}else if(m.includes("/layouts/")){let g=m.match(/\/layouts\/([^/.]+)\.layout/);g&&d("Layout",g[1])}else if(m.includes("/flows/")){let g=m.match(/\/flows\/([^/.]+)\.flow/);g&&d("Flow",g[1])}else if(m.includes("/permissionsets/")){let g=m.match(/\/permissionsets\/([^/.]+)\.permissionset/);g&&d("PermissionSet",g[1])}else if(m.includes("/profiles/")){let g=m.match(/\/profiles\/([^/.]+)\.profile/);g&&d("Profile",g[1])}else if(m.includes("/customMetadata/")){let g=m.match(/\/customMetadata\/([^/.]+)\.md/);g&&d("CustomMetadata",g[1])}else if(m.includes("/flexipages/")){let g=m.match(/\/flexipages\/([^/.]+)\.flexipage/);g&&d("FlexiPage",g[1])}}if(Object.keys(c).length===0){q.window.showInformationMessage("Ricwiz: Found deleted files in Git, but none mapped to recognizable Salesforce metadata.");return}let u=`<?xml version="1.0" encoding="UTF-8"?>
<Package xmlns="http://soap.sforce.com/2006/04/metadata">
`;for(let a of Object.keys(c).sort()){u+=`    <types>
`;for(let m of c[a].sort())u+=`        <members>${m}</members>
`;u+=`        <name>${a}</name>
    </types>
`}u+=`    <version>58.0</version>
</Package>`;let p=Ge.join(t,"destructiveChanges");he.existsSync(p)||he.mkdirSync(p);let l=Ge.join(p,"destructiveChanges.xml"),i=Ge.join(p,"package.xml");he.writeFileSync(l,u,"utf8"),he.existsSync(i)||he.writeFileSync(i,`<?xml version="1.0" encoding="UTF-8"?>
<Package xmlns="http://soap.sforce.com/2006/04/metadata">
    <version>58.0</version>
</Package>`,"utf8");let n=await q.workspace.openTextDocument(l);await q.window.showTextDocument(n),q.window.showInformationMessage("Ricwiz: destructiveChanges.xml generated successfully!")}catch(s){q.window.showErrorMessage(`Ricwiz: Error generating destructive changes: ${s.message}`)}})}var q,Ge,he,zt=z(()=>{"use strict";q=y(require("vscode")),Ge=y(require("path")),he=y(require("fs"));S()});async function St(){let t=b();if(!t)return;let o=se.workspace.getConfiguration("ricwiz").get("ticketSourceBranch","main");await se.window.withProgress({location:se.ProgressLocation.Notification,title:"Ricwiz: Finding Apex Tests to run...",cancellable:!1},async()=>{try{let{stdout:s}=await h(`git diff --name-status origin/${o}...HEAD`,{cwd:t}),r=s.split(`
`).map(a=>a.trim()).filter(a=>a.length>0),c=new Set,d=new Set;for(let a of r){let m=a.split(/\s+/);if(m[0].startsWith("D"))continue;let g=m[1];if(g&&g.endsWith(".cls")){let f=g.match(/\/classes\/([^/.]+)\.cls/);if(f){let w=f[1];w.toLowerCase().endsWith("test")?c.add(w):d.add(w)}}}for(let a of d)c.add(`${a}Test`);if(c.size===0){se.window.showInformationMessage("Ricwiz: No Apex Classes were modified in this branch.");return}let u=Array.from(c).map(a=>({label:`$(beaker) ${a}`,description:"Apex Test Class"})),p=await se.window.showQuickPick(u,{canPickMany:!0,title:"Select Test Classes to Run",placeHolder:"Select tests..."});if(!p||p.length===0)return;let i=`sf apex run test -n ${p.map(a=>a.label.replace("$(beaker) ","").trim()).join(",")} -r human -w 30`,n=se.window.createTerminal("Ricwiz: Smart Tests");n.show(),n.sendText(i)}catch(s){se.window.showErrorMessage(`Ricwiz: Error finding tests: ${s.message}`)}})}var se,Pt=z(()=>{"use strict";se=y(require("vscode"));S()});var be,Bt=z(()=>{"use strict";be=class{static isValidShellArg(e){return e?/^[a-zA-Z0-9\-_/.]+$/.test(e):!1}}});var Tt={};De(Tt,{WorkflowContext:()=>D});var Le,Et,He,D,ee=z(()=>{"use strict";Le=y(require("vscode")),Et=y(require("path")),He=y(require("fs")),D=class t{style;upstreamRemote;originRemote;ticketSourceBranch;ticketPrefix;branchPrefix;environments;static baseConfig=Le.workspace.getConfiguration("ricwiz");activeProfile;profileName;constructor(e){this.activeProfile=e,this.profileName=e?.name;let o=t.baseConfig;this.style=e?.workflowStyle||o.get("workflowStyle","standard"),this.style==="multi-remote"?(this.upstreamRemote=e?.upstreamRemote||o.get("upstreamRemote","salesforce-master"),this.originRemote=e?.originRemote||o.get("originRemote","origin")):(this.upstreamRemote="origin",this.originRemote="origin"),this.ticketSourceBranch=e?.ticketSourceBranch||o.get("ticketSourceBranch","main"),this.ticketPrefix=e?.ticketPrefix||o.get("ticketPrefix","SFPSCA-"),this.branchPrefix=e?.branchPrefix??o.get("branchPrefix","");let s=[{name:"Qual",sourceBranch:"quality"},{name:"Val",sourceBranch:"validation"},{name:"Prod",sourceBranch:"main"}];this.environments=e?.environments||o.get("environments",s)}getConfig(e,o){return this.activeProfile&&this.activeProfile[e]!==void 0?this.activeProfile[e]:t.baseConfig.get(e,o)}static async initialize(e,o){let s=t.baseConfig.get("profiles",[]),r=Et.join(e,"ricwiz.json");if(He.existsSync(r))try{let c=He.readFileSync(r,"utf-8"),d=JSON.parse(c);d&&Array.isArray(d.profiles)&&(s=[...s,...d.profiles])}catch(c){Le.window.showErrorMessage(`Ricwiz: Error parsing ricwiz.json: ${c.message}`)}if(s.length>0){if(!o?.forcePrompt)try{let{exec:p}=(S(),O(Ae)),{stdout:l}=await p("git branch --show-current",{cwd:e}),i=l.trim(),n=i;i.includes("-to-")&&(n=i.split("-to-")[0]);let{stdout:a}=await p(`git config branch.${n}.ricwiz-profile`,{cwd:e}),m=a.trim();if(m){let g=s.find(f=>f.name===m);if(g)return new t(g)}}catch{}if(o?.skipPrompt)return new t;let c=s.map(p=>p.name),d=await Le.window.showQuickPick(c,{placeHolder:"Ricwiz: Select Workflow Profile",ignoreFocusOut:!0});if(!d)return;let u=s.find(p=>p.name===d);return new t(u)}return new t}buildUpstreamPath(e){return e.includes("/")?e:`${this.upstreamRemote}/${e}`}getFetchRemote(e){return e.includes("/")?e.split("/")[0]:this.upstreamRemote}getFetchBranch(e){return e.includes("/")?e.substring(e.indexOf("/")+1):e}}});async function Mt(t){let e=b();if(!e){M.window.showErrorMessage("Open a folder or workspace that is a Git repository.");return}let o=await D.initialize(e,{forcePrompt:!0});if(!o)return;let s=typeof t=="string"?t:void 0,r=await W(e,{prefix:o.ticketPrefix,suggestedValue:s});if(!r){M.window.showErrorMessage("Branch creation cancelled: Ticket not provided.");return}let{ticketId:c}=r,d=o.environments,u="all",p=[{label:"Create Main Branch & Environments",description:"Creates the main ticket branch and all environment branches",value:"all"},{label:"Create Main Branch Only",description:"Creates only the main ticket branch (skips environments)",value:"mainOnly"},{label:"Create Environments Only",description:"Creates only the environment branches (skip main branch)",value:"envs"}];if(d.length>0){let a=await M.window.showQuickPick(p,{placeHolder:"Ricwiz: What do you want to create?",ignoreFocusOut:!0});if(!a)return;u=a.value}let l=o.ticketSourceBranch;if(u==="all"||u==="mainOnly"){let a=[];try{let{stdout:w}=await h('git branch --all --format="%(refname:short)"',{cwd:e});a=w.split(`
`).map(v=>v.trim()).filter(v=>v&&v!=="origin"),a=[...new Set(a)]}catch{}let m=M.window.createQuickPick();m.title="Ricwiz: Ticket Source Branch",m.placeholder="Confirm or change the source branch for this ticket",m.value=o.ticketSourceBranch,m.ignoreFocusOut=!0;let g=()=>{let w=m.value.trim(),v=[];w&&v.push({label:w,description:"Use typed branch"}),v.push(...a.map(x=>({label:x}))),m.items=v};m.onDidChangeValue(g),g();let f=await new Promise(w=>{m.onDidAccept(()=>{let v=m.selectedItems[0];w(v?v.label:m.value),m.hide()}),m.onDidHide(()=>w(void 0)),m.show()});if(!f){M.window.showInformationMessage("Branch creation cancelled.");return}l=f.trim()}let i="";if(o.branchPrefix){let a=await M.window.showInputBox({prompt:"Ricwiz: Branch Prefix (leave empty to not use a prefix)",placeHolder:"e.g. CRC-R19-",value:o.branchPrefix,ignoreFocusOut:!0});if(a===void 0){M.window.showInformationMessage("Branch creation cancelled.");return}i=a.trim()}let n=i?`${i}${c}`:c;if(!be.isValidShellArg(n)){M.window.showErrorMessage(`Invalid format for ticket ID: ${n}`);return}if(!be.isValidShellArg(l)){M.window.showErrorMessage(`Invalid format for ticketSourceBranch in settings: ${l}`);return}for(let a of d){if(!be.isValidShellArg(a.name)){M.window.showErrorMessage(`Invalid format for environment name in settings: ${a.name}`);return}if(!be.isValidShellArg(a.sourceBranch)){M.window.showErrorMessage(`Invalid format for environment sourceBranch in settings: ${a.sourceBranch}`);return}}try{await h("git status",{cwd:e})}catch{M.window.showErrorMessage("The opened folder does not appear to be a valid Git repository.");return}try{await M.window.withProgress({location:M.ProgressLocation.Notification,title:"Ricwiz: Creating Branches",cancellable:!1},async a=>{let m=[];a.report({message:"Checking remote status (git fetch)...",increment:10});try{await h("git fetch",{cwd:e})}catch{}try{if(u==="all"||u==="mainOnly"){if(a.report({message:`Creating main branch ${n}...`,increment:10}),await fe(e,n))M.window.showInformationMessage(`Ricwiz: The branch ${n} already exists. Skipping creation...`),await h(`git checkout ${n}`,{cwd:e});else try{let g=o.getFetchRemote(l),f=o.getFetchBranch(l),w=o.buildUpstreamPath(l);await h(`git fetch ${g} ${f}`,{cwd:e}),await h(`git checkout -b ${n} ${w}`,{cwd:e}),m.push(n)}catch{try{await h(`git checkout -b ${n} ${l}`,{cwd:e}),m.push(n)}catch{throw new Error(`Could not create main branch '${n}' from '${l}'. Does the source branch exist?`)}}try{await h(`git config branch.${n}.ricwiz-source "${l}"`,{cwd:e}),o.profileName&&await h(`git config branch.${n}.ricwiz-profile "${o.profileName}"`,{cwd:e})}catch{}}if(u==="all"||u==="envs"){let g=50/(d.length||1);for(let f of d){let w=i?`${i}${c}-to-${f.name}`:`${c}-to-${f.name}`,v=f.sourceBranch;if(a.report({message:`Processing environment branch ${w}...`,increment:g}),!await fe(e,w))try{let x=o.buildUpstreamPath(v);await h(`git checkout -b ${w} ${x}`,{cwd:e}),m.push(w)}catch{try{await h(`git checkout -b ${w} ${v}`,{cwd:e}),m.push(w)}catch{throw new Error(`Could not create environment branch '${w}' from '${v}'. Does the source branch exist?`)}}}}a.report({message:`Publishing branches to ${o.originRemote}...`,increment:10});for(let g of m)try{await h(`git push -u ${o.originRemote} ${g}`,{cwd:e})}catch{M.window.showWarningMessage(`Ricwiz: Branch ${g} was created locally but could not be pushed to ${o.originRemote}.`)}if(u==="all"||u==="mainOnly"){a.report({message:`Switching to ${n}...`,increment:10});try{await h(`git checkout ${n}`,{cwd:e})}catch{}}a.report({increment:100}),M.window.showInformationMessage("Ricwiz: All set! You can start working on your branches! \u{1F680}")}catch(g){if(M.window.showErrorMessage(`Ricwiz Branch Creation Failed: ${g.message}`),m.length>0){try{await h(`git checkout ${l}`,{cwd:e})}catch{}for(let f of m)try{await h(`git branch -D ${f}`,{cwd:e})}catch{}M.window.showWarningMessage(`Ricwiz: Rolled back (deleted) ${m.length} branch(es) locally due to failure.`)}}})}catch(a){M.window.showErrorMessage(`Ricwiz general error: ${a.message}`)}}var M,Dt=z(()=>{"use strict";M=y(require("vscode"));S();Bt();ee()});async function xe(t,e,o,s){s&&s.report({message:"CONFLICT! Resolve & click 'Commit & Continue' in Ricwiz panel."});let r=!1,c=!1,d=async()=>{try{let{stdout:i}=await h("git status --porcelain",{cwd:t});return i.split(`
`).filter(n=>{let a=n.substring(0,2);return["UD","DU","DD","AU","UA"].includes(a)}).map(n=>n.substring(3).trim())}catch{return[]}},u=async()=>{try{let{stdout:i}=await h("git status --porcelain",{cwd:t}),n=a=>a==="UU"?"Both Modified":a==="UD"?"Deleted by them":a==="DU"?"Deleted by us":a==="DD"?"Both Deleted":a==="AA"?"Both Added":a==="AU"?"Added by us":a==="UA"?"Added by them":"Conflicted";return i.split(`
`).map(a=>a.trimRight()).filter(a=>a.length>2).filter(a=>{let m=a.substring(0,2);return["UU","AA","UD","DU","AU","UA","DD"].includes(m)}).map(a=>{let m=a.substring(0,2);return{file:a.substring(3).trim(),state:n(m)}})}catch{return[]}},p=async()=>{if(r)return;let i=await d(),n=await u(),{webviewProvider:a}=(_e(),O(Ve));a&&a.setConflictState({isConflict:!0,sourceStr:e,targetStr:o,deletionsCount:i.length,files:n})},l=re.commands.registerCommand("ricwiz.conflictAction",async i=>{if(i==="abortDeploy")c=!0;else if(i==="resolveDeletions"){try{let a=(await d()).map(g=>({label:g})),m=await re.window.showQuickPick(a,{canPickMany:!0,placeHolder:"Select conflicted files to DELETE",title:"Ricwiz: Delete Conflicted Files"});if(m&&m.length>0){for(let g of m)try{await h(`git rm --force "${g.label}"`,{cwd:t})}catch{}re.window.showInformationMessage(`Ricwiz: Deleted ${m.length} conflicted file(s).`)}}catch(n){re.window.showErrorMessage(`Ricwiz: Error. (${n.message})`)}p()}else if(i==="commitAndContinue")try{let a=(await d()).filter(g=>At.existsSync(Lt.join(t,g)));if(a.length>0&&await re.window.showWarningMessage(`Wait! There are ${a.length} file(s) with deletion conflicts that are still on your disk.

If you commit now, you will KEEP them in the project.

Are you sure you want to KEEP them?`,{modal:!0},"Yes, KEEP them","No, let me DELETE them")!=="Yes, KEEP them"){p();return}let m=!1;try{let{stdout:g}=await h('git grep -E "^<<<<<<< "',{cwd:t});g.trim().length>0&&(m=!0)}catch{}if(m){re.window.showErrorMessage("Ricwiz: You still have unresolved conflict markers (<<<<<<<) in your files. Please resolve them first!"),p();return}await h("git add .",{cwd:t}),await h("git commit --no-edit",{cwd:t})}catch(n){re.window.showErrorMessage(`Ricwiz: Could not commit automatically. (${n.message})`),p()}});for(p();;){if(c){r=!0,l.dispose(),(_e(),O(Ve)).webviewProvider?.setConflictState(null);try{await h("git merge --abort",{cwd:t})}catch{}return!1}try{let{stdout:i}=await h("git status --porcelain",{cwd:t});if(i.trim().length===0)return r=!0,l.dispose(),(_e(),O(Ve)).webviewProvider?.setConflictState(null),re.window.showInformationMessage("Ricwiz: Changes committed!"),!0}catch{}await new Promise(i=>setTimeout(i,2e3))}}var re,At,Lt,Qe=z(()=>{"use strict";re=y(require("vscode")),At=y(require("fs")),Lt=y(require("path"));S()});var rt={};De(rt,{fetchMergeRequestStatus:()=>Ke,hasGitlabToken:()=>Ze,ricwizLogger:()=>le});async function Ze(){let t=await st();return!!(t&&t.trim())}async function si(t,e){let o=Ye.workspace.getConfiguration("ricwiz"),s=(await st())?.trim();if(!s)throw new Error("No GitLab token");let r=e?e.getConfig("gitlabUrlOverride",""):o.get("gitlabUrlOverride",""),c=[];if(r&&r.trim()!=="")c.push(r.trim());else try{let{stdout:u}=await h("git remote",{cwd:t}),p=u.split(`
`).map(i=>i.trim()).filter(i=>i),l=[];e&&e.upstreamRemote&&p.includes(e.upstreamRemote)&&l.push(e.upstreamRemote),e&&e.originRemote&&e.originRemote!==e.upstreamRemote&&p.includes(e.originRemote)&&l.push(e.originRemote),p.includes("upstream")&&!l.includes("upstream")&&l.push("upstream"),p.includes("origin")&&!l.includes("origin")&&l.push("origin");for(let i of l)try{let{stdout:n}=await h(`git remote get-url ${i}`,{cwd:t}),a=n.trim();a.endsWith(".git")&&(a=a.slice(0,-4)),a.startsWith("git@")&&(a=a.replace("git@","").replace(":","/"),a=`https://${a}`),c.push(a)}catch{}}catch{}if(c.length===0)throw new Error("Could not get any remote origin URL.");return c.map(u=>{let p=new URL(u),l=`${p.protocol}//${p.host}`,i=p.pathname;i.startsWith("/")&&(i=i.substring(1)),i.endsWith("/")&&(i=i.slice(0,-1)),i.endsWith(".git")&&(i=i.slice(0,-4));let n=encodeURIComponent(i);return{baseUrl:l,token:s,projectPath:n}})}async function It(t,e,o,s,r){let c=new URL(`${e}${r}`);return le.appendLine(`[GitLab API] ${s} ${c.toString()}`),new Promise((d,u)=>{let p=Ot.request(c,{method:s,timeout:5e3,headers:{"PRIVATE-TOKEN":o,Accept:"application/json"}},l=>{let i="";l.on("data",n=>i+=n),l.on("end",()=>{if(le.appendLine(`[GitLab API] Response Code: ${l.statusCode}`),l.statusCode&&l.statusCode>=400)return le.appendLine(`[GitLab API] Error Data: ${i}`),u(new Error(`GitLab API error: ${l.statusCode}`));if(!i)return d({});try{let n=JSON.parse(i);Array.isArray(n)?le.appendLine(`[GitLab API] Returned array with ${n.length} items`):n&&typeof n=="object"&&le.appendLine(`[GitLab API] Returned object with id ${n.id||n.iid||"unknown"}`),d(n)}catch(n){le.appendLine(`[GitLab API] Parse Error: ${n.message}`),u(n)}})});p.on("timeout",()=>{p.destroy(),u(new Error("GitLab request timed out"))}),p.on("error",l=>{le.appendLine(`[GitLab API] Request Failed: ${l.message}`),u(l)}),p.end()})}async function Ke(t,e,o,s){le.appendLine(`[GitLab API] fetchMergeRequestStatus called for source: ${e}, target: ${o||"any"}`);let r=`${t}:${e}:${o||"any"}`,c=Ft.get(r);if(c&&Date.now()-c.timestamp<ri)return c.data;try{let d=await si(t,s);for(let u of d)try{let p=`/api/v4/projects/${u.projectPath}/merge_requests?source_branch=${encodeURIComponent(e)}&order_by=updated_at&sort=desc`;o&&(p+=`&target_branch=${encodeURIComponent(o)}`);let l=await It(t,u.baseUrl,u.token,"GET",p);if(l&&l.length>0){let i=l[0];try{let m=await It(t,u.baseUrl,u.token,"GET",`/api/v4/projects/${u.projectPath}/merge_requests/${i.iid}`);m&&(i=m)}catch{}let n="none";if(i.head_pipeline&&i.head_pipeline.status){let m=i.head_pipeline.status;m==="success"||m==="failed"||m==="canceled"||m==="skipped"?n=m:n="running"}let a={isMerged:i.state==="merged",isOpen:i.state==="opened",pipelineStatus:n,webUrl:i.web_url};return Ft.set(r,{data:a,timestamp:Date.now()}),a}}catch{}return null}catch{return null}}var Ot,Ye,le,Ft,ri,Xe=z(()=>{"use strict";Ot=y(require("https")),Ye=y(require("vscode"));ze();S();le=Ye.window.createOutputChannel("Ricwiz Debug");Ft=new Map,ri=30*1e3});var ke={};De(ke,{findRelatedBranches:()=>mt,getCurrentBranchMergeStatus:()=>ct,getRecentCommits:()=>dt,getRecentTickets:()=>lt,getRelatedBranchesStatus:()=>at,resolveExistingBranchName:()=>ai});function Nt(t,e){return e.find(o=>t.endsWith(`-to-${o.name}`))}async function at(t,e,o,s,r){let c=await Ze();return await Promise.all(e.map(async u=>{let p=Nt(u,s);if(c){let l=p?p.sourceBranch:void 0,i=await Ke(t,u,l,r);if(i)return{name:u,isMerged:i.isMerged,pipelineStatus:i.pipelineStatus,mrUrl:i.webUrl}}else{let{ricwizLogger:l}=(Xe(),O(rt));l.appendLine(`[GitLab API] Skipping MR check for ${u} because hasGitlabToken() is false`)}return{name:u,isMerged:!1}}))}async function ct(t,e,o,s){let r=Nt(e,o);if(!r)return!1;if(await Ze()){let c=await Ke(t,e,r.sourceBranch,s);if(c)return c.isMerged}else{let{ricwizLogger:c}=(Xe(),O(rt));c.appendLine(`[GitLab API] Skipping MR check for current branch ${e} because hasGitlabToken() is false`)}return!1}async function dt(t,e=10){try{let{stdout:o}=await h(`git log --oneline -${e} --format="%h|||%s|||%ar"`,{cwd:t});return o.split(`
`).filter(s=>s.trim()).map(s=>{let r=s.split("|||");return{hash:r[0]||"",message:r.length>=3?r.slice(1,-1).join("|||"):r[1]||"",timeAgo:r.length>=3?r[r.length-1]:""}})}catch{return[]}}async function lt(t,e=3){try{let{stdout:o}=await h('git for-each-ref --sort=-committerdate --format="%(refname:short)" refs/heads/',{cwd:t}),s=o.split(`
`).map(c=>c.trim()).filter(c=>c),r=/^[A-Z]+-\d+$/i;return s.filter(c=>r.test(c)).slice(0,e)}catch{return[]}}async function mt(t,e,o){let{stdout:s}=await h(`git branch --all --list "*${e}*"`,{cwd:t}),r=new Set,c=new RegExp(`${e}(?!\\d)`,"i");return s.split(`
`).forEach(d=>{let u=d.replace("*","").trim();if(u){if(u.startsWith("remotes/")){let p=u.split("/");p.length>2&&(u=p.slice(2).join("/"))}u&&u!==o&&!u.includes("HEAD")&&c.test(u)&&r.add(u)}}),Array.from(r)}async function ai(t,e,o){try{let s=require("child_process"),c=require("util").promisify(s.exec),{stdout:d}=await c(`git branch --all --list "*${e}*"`,{cwd:t}),u=new RegExp(`${e}(?!\\d)`,"i"),p=d.split(`
`).map(i=>i.replace("*","").trim().replace(/^remotes\/[^\/]+\//,"")).filter(i=>i&&!i.includes("HEAD")&&u.test(i)),l=Array.from(new Set(p));if(o){let i=`-to-${o}`,n=l.find(a=>a.endsWith(i));return n||`${e}${i}`}else{let i=l.find(n=>!n.includes("-to-"));return i||e}}catch{return o?`${e}-to-${o}`:e}}var we=z(()=>{"use strict";S();Xe()});async function Ut(){let t=b();if(!t){j.window.showErrorMessage("Ricwiz: Open a folder or workspace that is a Git repository.");return}try{await h("git status",{cwd:t})}catch{j.window.showErrorMessage("Ricwiz: The opened folder does not appear to be a valid Git repository.");return}let e=await D.initialize(t);if(!e)return;let o=e.environments,s=await W(t,{prefix:e.ticketPrefix});if(!s){j.window.showErrorMessage("Operation cancelled: Ticket not provided.");return}let{ticketId:r,currentBranch:c}=s,{resolveExistingBranchName:d}=(we(),O(ke)),u=await d(t,r);if(!await fe(t,u)){j.window.showErrorMessage(`Ricwiz: Main branch '${u}' does not exist! Prepare deploy is only available when a main ticket branch is used.`);return}let p=e.getConfig("defaultReviewers",""),l="";try{let{stdout:i}=await h(`git config branch.${r}.ricwiz-reviewers`,{cwd:t});l=i.trim()}catch{}if(p.trim()){let i=await j.window.showInputBox({prompt:"Ricwiz: Reviewers for this deploy (optional, comma-separated)",placeHolder:"e.g. @joao, 123456",value:l||p,ignoreFocusOut:!0});if(i===void 0)return;try{i.trim()?await h(`git config branch.${r}.ricwiz-reviewers "${i.trim()}"`,{cwd:t}):l&&await h(`git config --unset branch.${r}.ricwiz-reviewers`,{cwd:t})}catch{}}await j.window.withProgress({location:j.ProgressLocation.Notification,title:"Ricwiz: Preparing Deploy",cancellable:!0},async(i,n)=>{let a=0,m=c,g=!1;n.onCancellationRequested(()=>{g=!0}),i.report({message:"Syncing remote information...",increment:10});try{await h("git fetch --all",{cwd:t});let w=10/(o.length||1);for(let v of o)try{if(g)throw new Error("Aborted");i.report({message:`Fetching ${v.sourceBranch}...`,increment:w});let x=e.getFetchRemote(v.sourceBranch),R=e.getFetchBranch(v.sourceBranch);await h(`git fetch ${x} ${R}:${R}`,{cwd:t})}catch{}}catch{}let f=60/(o.length||1);for(let w of o){if(g)break;let v=await d(t,r,w.name),x=w.sourceBranch;try{i.report({message:`Processing ${v}...`,increment:f/4}),await h(`git checkout ${v}`,{cwd:t});try{await h(`git pull ${e.originRemote} ${v}`,{cwd:t})}catch{}let R=async E=>{try{await h(`git merge ${E}`,{cwd:t})}catch(L){let X=!1;try{let{stdout:ce}=await h("git ls-files -u",{cwd:t});ce.trim().length>0&&(X=!0)}catch{}let H=((L.stdout||"")+(L.stderr||"")+(L.message||"")).toLowerCase();if(X||H.includes("conflict")||H.includes("conflit")){if(!await xe(t,E,v,i))throw g=!0,new Error("Deploy aborted by user.")}else throw L}};i.report({message:`Merging ${x} into ${v}...`,increment:f/4});let B=e.getFetchRemote(x),U=e.getFetchBranch(x),ge=e.buildUpstreamPath(x);if(await h(`git fetch ${B} ${U}`,{cwd:t}),await R(ge),i.report({message:`Merging ${u} into ${v}...`,increment:f/4}),await R(u),g)break;i.report({message:`Pushing ${v}...`,increment:f/4}),await h(`git push ${e.originRemote} ${v}`,{cwd:t}),a++}catch(R){R.message.includes("aborted")?j.window.showInformationMessage("Ricwiz: Deploy cancelled."):j.window.showErrorMessage(`Ricwiz: Failed to process branch ${v}. Detail: ${R.message}`);return}}if(!g){i.report({message:"Finishing up...",increment:10});let w=m;try{await h(`git show-ref --verify --quiet refs/heads/${u}`,{cwd:t}),w=u}catch{}try{let v=await F(t);w&&w!==v?(await h(`git checkout ${w}`,{cwd:t}),j.window.showInformationMessage(`Ricwiz: Operation complete. Back on branch ${w}.`)):j.window.showInformationMessage("Ricwiz: Operation complete.")}catch{j.window.showInformationMessage("Ricwiz: Operation complete.")}}})}var j,jt=z(()=>{"use strict";j=y(require("vscode"));S();Qe();ee()});async function Jt(t=!1){let e=b();if(!e)return;let o=await D.initialize(e);if(!o)return;let s=await W(e,{prompt:"Enter the full ticket ID for the Merge Requests (e.g., SCPSCA-1234) or just the number"});if(!s)return;let{ticketId:r}=s,c=o.getConfig("gitlabUrlOverride",""),d="";if(c&&c.trim()!=="")d=c.trim().replace(/\/+$/,"");else{let i="";try{let n=o.upstreamRemote||"origin",{stdout:a}=await h(`git remote get-url ${n}`,{cwd:e});i=a.trim()}catch{me.window.showErrorMessage("Ricwiz: Could not get the remote origin URL. Please configure the URL manually in the extension settings.");return}d=i,d.endsWith(".git")&&(d=d.slice(0,-4)),d.startsWith("git@")&&(d=d.replace("git@","").replace(":","/"),d=`https://${d}`)}let u=[],p=o.ticketSourceBranch;try{let{stdout:i}=await h(`git config branch.${r}.ricwiz-source`,{cwd:e});i.trim()&&(p=i.trim())}catch{}let{resolveExistingBranchName:l}=(we(),O(ke));if(o.environments.length===0){let i=await l(e,r);u.push({source:i,target:p})}else for(let i of o.environments){let n=await l(e,r,i.name);u.push({source:n,target:i.sourceBranch})}for(let i of u){let n=`${d}/-/merge_requests/new?merge_request[source_branch]=${i.source}&merge_request[target_branch]=${i.target}`;t?me.commands.executeCommand("simpleBrowser.show",n):me.env.openExternal(me.Uri.parse(n))}me.window.showInformationMessage(`Ricwiz: Opening ${t?"VS Code browser":"external browser"} for Merge Requests!`)}async function Wt(){return Jt(!1)}async function qt(){return Jt(!0)}var me,Gt=z(()=>{"use strict";me=y(require("vscode"));S();ee()});async function Ht(t=!1){let e=b();if(!e)return;let o=te.workspace.getConfiguration("ricwiz"),s=o.get("jiraUrl","");if(!s||s.trim()===""){te.window.showErrorMessage("Ricwiz: Jira URL is not configured. Please set it in the extension settings (e.g., https://jira.company.com/browse/).");return}let{getCurrentBranch:r,resolvePrefix:c,extractTicketSuggestion:d}=(S(),O(Ae)),u=await r(e),p=o.get("ticketPrefix","SFPSCA-"),l=c(u,p),n=d(u,l,!0);if(n){let{normalizeTicketId:m}=(S(),O(Ae));n=m(n,l)}else{let m=await W(e,{prompt:"Ricwiz could not detect the ticket from the branch name. Enter Jira ticket ID (e.g. SFPSCA-1234)",handleToSuffix:!0});if(!m)return;n=m.ticketId}let a=s.trim();a.endsWith("/")||(a+="/"),a+=n,t?te.commands.executeCommand("simpleBrowser.show",a):te.env.openExternal(te.Uri.parse(a)),te.window.showInformationMessage(`Ricwiz: Opening Jira Ticket ${n} in ${t?"VS Code":"browser"}!`)}async function Vt(){return Ht(!1)}async function _t(){return Ht(!0)}var te,Qt=z(()=>{"use strict";te=y(require("vscode"));S()});async function ci(){let t=Zt.workspace.getConfiguration("ricwiz"),e=t.get("jiraUrl",""),o=t.get("jiraEmail","")?.trim(),s=(await bt())?.trim();if(!e||!s)throw new Error('Jira API Token is not securely configured. Please run the "Ricwiz: Set Secure Jira API Token" command.');let r=e;r.includes("/browse")&&(r=r.split("/browse")[0]),r.endsWith("/")&&(r=r.slice(0,-1));let c=o?`Basic ${Buffer.from(`${o}:${s}`).toString("base64")}`:`Bearer ${s}`;return{baseUrl:r,headerAuth:c}}async function Ee(t,e,o){let{baseUrl:s,headerAuth:r}=await ci(),c=new URL(`${s}${e}`);return new Promise((d,u)=>{let p=Yt.request(c,{method:t,headers:{Authorization:r,Accept:"application/json",...o?{"Content-Type":"application/json"}:{}}},l=>{let i="";l.on("data",n=>i+=n),l.on("end",()=>{if(l.statusCode===401||l.statusCode===403)return u(new Error(`Authentication failed (HTTP ${l.statusCode}). Please check your Jira settings.`));if(l.statusCode&&l.statusCode>=400){let n="";try{let a=JSON.parse(i);a.errorMessages&&a.errorMessages.length>0&&(n=a.errorMessages.join(", "))}catch{}return l.statusCode===404||l.statusCode===410?u(new Error(`Ticket not found or deleted (HTTP ${l.statusCode}). ${n}`)):u(new Error(`Jira API returned HTTP status ${l.statusCode}. ${n}`))}if(!i)return d({});try{let n=JSON.parse(i);d(n)}catch{u(new Error("Failed to parse Jira response."))}})});p.on("error",l=>u(new Error(`Network error: ${l.message}`))),o&&p.write(JSON.stringify(o)),p.end()})}async function Te(t){let e=await Ee("GET",`/rest/api/2/issue/${t}`);return e&&e.fields?{summary:e.fields.summary||"",description:e.fields.description||"No description provided.",status:e.fields.status?.name||"Unknown"}:null}async function Kt(t){let e=await Ee("GET",`/rest/api/2/issue/${t}/transitions`);return e&&e.transitions?e.transitions.map(o=>({id:o.id,name:o.name})):[]}async function Xt(t,e){await Ee("POST",`/rest/api/2/issue/${t}/transitions`,{transition:{id:e}})}async function eo(t,e){await Ee("POST",`/rest/api/2/issue/${t}/comment`,{body:e})}async function to(t,e){await Ee("PUT",`/rest/api/2/issue/${t}`,{update:{labels:[{add:e}]}})}async function oo(t){let e=await Ee("POST","/rest/api/3/search/jql",{jql:t,maxResults:50,fields:["summary","status","assignee"]});return e&&e.issues?e.issues.map(o=>({key:o.key,summary:o.fields?.summary||"No Title",status:o.fields?.status?.name||"Unknown",assignee:o.fields?.assignee?.displayName||"Unassigned"})):[]}var Yt,Zt,Ie=z(()=>{"use strict";Yt=y(require("https")),Zt=y(require("vscode"));ze()});async function io(t){let e=b();if(e)try{let o=await D.initialize(e);if(!o)return;let s=await F(e),r=Pe(s,o.ticketPrefix),c=Be(s,r,!0);if(c||(c=s.split("-to-")[0]),!c){V.window.showErrorMessage("Ricwiz: You are not currently on a valid ticket branch.");return}await V.window.withProgress({location:V.ProgressLocation.Notification,title:`Fetching details for ${c}...`,cancellable:!1},async d=>{let u=await Te(c);if(u){let p=[];try{let{findRelatedBranches:l,getRelatedBranchesStatus:i}=(we(),O(ke)),n=V.workspace.getConfiguration("ricwiz").get("environments",[{name:"Qual",sourceBranch:"quality"},{name:"Val",sourceBranch:"validation"},{name:"Prod",sourceBranch:"main"}]),a=await l(e,c,"");p=await i(e,a,c,n)}catch{}t.setJiraData({ticketId:c,relatedBranches:p,...u}),t.setPage("jira")}else V.window.showErrorMessage("Ricwiz: No data found for this ticket.")})}catch(o){o.message.includes("securely configured")?await V.window.showErrorMessage(o.message,"Set Token Now")==="Set Token Now"&&V.commands.executeCommand("ricwiz.setJiraToken"):V.window.showErrorMessage(`Ricwiz Jira Error: ${o.message}`)}}var V,no=z(()=>{"use strict";V=y(require("vscode"));S();ee();Ie()});async function so(t,e){let s=oe.workspace.getConfiguration("ricwiz").get("jiraDashboards",[]);if(e!==void 0&&(Ce=e),!s||s.length===0){t.setDashboardData({queries:[],selectedIndex:0,results:[],error:"No queries defined in settings. Go to Settings > Ricwiz > Jira Dashboards."}),t.setPage("dashboard");return}Ce>=s.length&&(Ce=0);let r=s[Ce];t.setDashboardData({queries:s,selectedIndex:Ce,results:[],error:"\u23F3 Loading tickets..."}),t.setPage("dashboard");try{let c=await oo(r.jql),d=oe.workspace.workspaceFolders?.[0]?.uri.fsPath,u=[],p=t.getDashboardShowBranches();if(d)try{let i=require("child_process"),a=require("util").promisify(i.exec),{stdout:m}=await a("git branch",{cwd:d});u=m.split(`
`).map(g=>g.replace("*","").trim()).filter(g=>g)}catch{}let l=[];if(p&&d)try{let{findRelatedBranches:i,getRelatedBranchesStatus:n}=(we(),O(ke)),{WorkflowContext:a}=(ee(),O(Tt)),m=await a.initialize(d,{skipPrompt:!0}),g=m?.environments||oe.workspace.getConfiguration("ricwiz").get("environments",[{name:"Qual",sourceBranch:"quality"},{name:"Val",sourceBranch:"validation"},{name:"Prod",sourceBranch:"main"}]);l=await Promise.all(c.map(async f=>{let w=await i(d,f.key,""),v=await n(d,w,f.key,g,m);return{...f,detailedBranches:v}}))}catch{l=c}else l=c.map(i=>{let n=u.find(a=>a.includes(i.key));return{...i,branch:n||null}});t.setDashboardData({queries:s,selectedIndex:Ce,results:l,error:null}),t.setPage("dashboard")}catch(c){let d=c.message;(d.includes("ENOTFOUND")||d.includes("network"))&&(d="No Internet or Invalid URL"),t.setDashboardData({queries:s,selectedIndex:Ce,results:[],error:d}),t.setPage("dashboard")}}async function ro(t,e){await oe.window.withProgress({location:oe.ProgressLocation.Notification,title:`Fetching details for ${e}...`,cancellable:!1},async()=>{try{let o=await Te(e);if(o){let s=[],r=b();if(r)try{let{findRelatedBranches:c,getRelatedBranchesStatus:d}=(we(),O(ke)),u=oe.workspace.getConfiguration("ricwiz").get("environments",[{name:"Qual",sourceBranch:"quality"},{name:"Val",sourceBranch:"validation"},{name:"Prod",sourceBranch:"main"}]),p=await c(r,e,"");s=await d(r,p,e,u)}catch{}t.setJiraData({ticketId:e,relatedBranches:s,...o}),t.setPage("jira")}else oe.window.showErrorMessage(`Ricwiz: No data found for ticket ${e}.`)}catch(o){oe.window.showErrorMessage(`Ricwiz Jira Error: ${o.message}`)}})}var oe,Ce,ao=z(()=>{"use strict";oe=y(require("vscode"));Ie();S();Ce=0});async function pt(){let t=b();if(!t)return;let e=await D.initialize(t,{forcePrompt:!1});if(!e)return;let o=await F(t);if(!o)return;let s=Pe(o,e.ticketPrefix),r=Be(o,s,!0);return r||o.split("-to-")[0]}async function co(){try{let t=await pt();if(!t){P.window.showErrorMessage("Ricwiz: You are not on a valid ticket branch.");return}let e=await P.window.withProgress({location:P.ProgressLocation.Notification,title:`Fetching available status for ${t}...`,cancellable:!1},()=>Kt(t));if(!e||e.length===0){P.window.showInformationMessage(`Ricwiz: No transitions available for ${t}.`);return}let o=e.map(r=>({label:r.name,id:r.id})),s=await P.window.showQuickPick(o,{placeHolder:`Select new status for ${t}`,ignoreFocusOut:!0});s&&(await P.window.withProgress({location:P.ProgressLocation.Notification,title:`Updating status to ${s.label}...`,cancellable:!1},()=>Xt(t,s.id)),P.window.showInformationMessage(`Ricwiz: Status for ${t} updated to ${s.label}.`))}catch(t){t.message.includes("securely configured")?P.window.showErrorMessage(t.message,"Set Token Now").then(e=>{e==="Set Token Now"&&P.commands.executeCommand("ricwiz.setJiraToken")}):P.window.showErrorMessage(`Ricwiz Jira Error: ${t.message}`)}}async function lo(){try{let t=await pt();if(!t){P.window.showErrorMessage("Ricwiz: You are not on a valid ticket branch.");return}let e=await P.window.showInputBox({prompt:`Add comment to ${t}`,placeHolder:"Type your comment here...",ignoreFocusOut:!0});e&&(await P.window.withProgress({location:P.ProgressLocation.Notification,title:`Adding comment to ${t}...`,cancellable:!1},()=>eo(t,e)),P.window.showInformationMessage(`Ricwiz: Comment added to ${t}.`))}catch(t){t.message.includes("securely configured")?P.window.showErrorMessage(t.message,"Set Token Now").then(e=>{e==="Set Token Now"&&P.commands.executeCommand("ricwiz.setJiraToken")}):P.window.showErrorMessage(`Ricwiz Jira Error: ${t.message}`)}}async function mo(){try{let t=await pt();if(!t){P.window.showErrorMessage("Ricwiz: You are not on a valid ticket branch.");return}let e=await P.window.showInputBox({prompt:`Add a label to ${t}`,placeHolder:"e.g. Needs-Review, Bug, High-Priority",ignoreFocusOut:!0});e&&e.trim()&&(await P.window.withProgress({location:P.ProgressLocation.Notification,title:`Adding label to ${t}...`,cancellable:!1},()=>to(t,e.trim())),P.window.showInformationMessage(`Ricwiz: Label '${e.trim()}' added to ${t}.`))}catch(t){t.message.includes("securely configured")?P.window.showErrorMessage(t.message,"Set Token Now").then(e=>{e==="Set Token Now"&&P.commands.executeCommand("ricwiz.setJiraToken")}):P.window.showErrorMessage(`Ricwiz Jira Error: ${t.message}`)}}async function po(){let t=await P.window.showInputBox({prompt:"Enter your Jira API Token (or Personal Access Token). It will be securely stored in your OS keychain.",password:!0,ignoreFocusOut:!0});if(t)try{await yt(t.trim()),P.window.showInformationMessage("Ricwiz: Jira API Token securely stored!")}catch(e){P.window.showErrorMessage(`Ricwiz: Failed to store token: ${e.message}`)}}var P,uo=z(()=>{"use strict";P=y(require("vscode"));S();ee();Ie();ze()});async function go(){let t=await G.window.showInputBox({prompt:"Enter your GitLab Personal Access Token",placeHolder:"glpat-xxxxxxxxxxxxxxxxxxxx",ignoreFocusOut:!0,password:!0});if(t&&t.trim()){let e=t.trim();await G.window.withProgress({location:G.ProgressLocation.Notification,title:"Ricwiz: Validating GitLab Token...",cancellable:!1},async()=>{try{let s=G.workspace.getConfiguration("ricwiz").get("gitlabUrlOverride","").trim();if(!s&&G.workspace.workspaceFolders)try{let{exec:p}=(S(),O(Ae)),l=G.workspace.workspaceFolders[0].uri.fsPath,{stdout:i}=await p("git remote get-url origin",{cwd:l}),n=i.trim();n.startsWith("git@")&&(n=`https://${n.replace("git@","").replace(":","/")}`),n.endsWith(".git")&&(n=n.slice(0,-4)),s=n}catch{}s||(s="https://gitlab.com");let r=new URL(s),c=`${r.protocol}//${r.host}`,d=require("https"),u=await new Promise((p,l)=>{let i=d.request(new URL(`${c}/api/v4/user`),{method:"GET",timeout:5e3,headers:{"PRIVATE-TOKEN":e,Accept:"application/json"}},n=>{if(n.statusCode>=400)return l(new Error(`Status ${n.statusCode}`));let a="";n.on("data",m=>a+=m),n.on("end",()=>p(JSON.parse(a||"{}")))});i.on("error",l),i.on("timeout",()=>{i.destroy(),l(new Error("Timeout"))}),i.end()});await xt(e),G.window.showInformationMessage(`Ricwiz: \u2705 GitLab API Token saved and validated successfully for ${u.username||"user"}!`),G.commands.executeCommand("ricwiz.manualRefresh")}catch(o){G.window.showErrorMessage(`Ricwiz: \u274C Invalid token or cannot reach GitLab (${o.message}). Please check the token and try again.`)}})}}var G,fo=z(()=>{"use strict";G=y(require("vscode"));ze()});async function ho(){let t=b();if(!t){pe.window.showErrorMessage("Ricwiz: Open a folder or workspace that is a Git repository.");return}let e=await D.initialize(t);if(!e)return;let o=await W(t,{prefix:e.ticketPrefix,prompt:"Enter the full ticket ID to sync all branches for (e.g., SCPSCA-1234) or just the number"});if(!o)return;let{ticketId:s,currentBranch:r}=o;await pe.window.withProgress({location:pe.ProgressLocation.Notification,title:`Ricwiz: Syncing all branches for ${s}...`,cancellable:!1},async c=>{try{c.report({message:"Fetching from remote..."});try{await h("git fetch --all",{cwd:t})}catch{}let{stdout:d}=await h(`git branch --list "*${s}*"`,{cwd:t}),u=new RegExp(`${s}(?!\\d)`,"i"),p=d.split(`
`).map(n=>n.replace("*","").trim()).filter(n=>n.length>0&&u.test(n));if(p.length===0){pe.window.showWarningMessage(`Ricwiz: No local branches found for ${s}.`);return}let l=0,i=0;for(let n of p)if(c.report({message:`Syncing ${n}...`}),n===r)try{await h(`git pull ${e.originRemote} ${n}`,{cwd:t}),l++}catch(a){let m=!1;try{let{stdout:f}=await h("git ls-files -u",{cwd:t});f.trim().length>0&&(m=!0)}catch{}let g=((a.stdout||"")+(a.stderr||"")+(a.message||"")).toLowerCase();(m||g.includes("conflict")||g.includes("conflit"))&&await xe(t,`${e.originRemote}/${n}`,n,c)?l++:i++}else try{await h(`git fetch ${e.originRemote} ${n}:${n}`,{cwd:t}),l++}catch{try{await h(`git checkout ${n}`,{cwd:t});try{await h(`git pull ${e.originRemote} ${n}`,{cwd:t}),l++}catch(m){let g=!1;try{let{stdout:w}=await h("git ls-files -u",{cwd:t});w.trim().length>0&&(g=!0)}catch{}let f=((m.stdout||"")+(m.stderr||"")+(m.message||"")).toLowerCase();(g||f.includes("conflict")||f.includes("conflit"))&&await xe(t,`${e.originRemote}/${n}`,n,c)?l++:i++}await h(`git checkout ${r}`,{cwd:t})}catch{try{await h(`git checkout ${r}`,{cwd:t})}catch{}i++}}i>0?pe.window.showWarningMessage(`Ricwiz: Synced ${l}/${p.length} branches. ${i} branch(es) could not be synced (possible conflicts or diverged history).`):pe.window.showInformationMessage(`Ricwiz: \u{1F504} All ${l} branches for ${s} are up to date!`)}catch(d){pe.window.showErrorMessage(`Ricwiz: Sync failed: ${d.message}`)}})}var pe,wo=z(()=>{"use strict";pe=y(require("vscode"));S();Qe();ee()});async function vo(){let t=b();if(!t){ue.window.showErrorMessage("Ricwiz: Open a folder or workspace that is a Git repository.");return}try{await h("git status",{cwd:t})}catch{ue.window.showErrorMessage("Ricwiz: The opened folder does not appear to be a valid Git repository.");return}let e=await D.initialize(t);if(!e)return;let o=e.environments,s=await W(t,{prefix:e.ticketPrefix});if(!s)return;let{ticketId:r,currentBranch:c}=s;await ue.window.withProgress({location:ue.ProgressLocation.Notification,title:"Ricwiz: Updating environment branches from their bases",cancellable:!0},async(d,u)=>{let p=0,l=c,i=!1;u.onCancellationRequested(()=>{i=!0}),d.report({message:"Syncing remote information...",increment:10});try{await h("git fetch --all",{cwd:t})}catch{}let n=80/(o.length||1);for(let a of o){if(i)break;let{resolveExistingBranchName:m}=(we(),O(ke)),g=await m(t,r,a.name),f=a.sourceBranch;if(await fe(t,g))try{d.report({message:`Processing ${g}...`,increment:n/2}),await h(`git checkout ${g}`,{cwd:t});try{d.report({message:`Merging ${f} into ${g}...`,increment:n/2});let w=e.getFetchRemote(f),v=e.getFetchBranch(f),x=e.buildUpstreamPath(f);await h(`git fetch ${w} ${v}`,{cwd:t}),await h(`git merge ${x}`,{cwd:t})}catch(w){let v=!1;try{let{stdout:R}=await h("git ls-files -u",{cwd:t});R.trim().length>0&&(v=!0)}catch{}let x=((w.stdout||"")+(w.stderr||"")+(w.message||"")).toLowerCase();if(v||x.includes("conflict")||x.includes("conflit")){let R=e.buildUpstreamPath(f);if(!await xe(t,R,g,d))throw i=!0,new Error("Update aborted by user.")}else throw w}if(i)break;p++}catch(w){w.message.includes("aborted")?ue.window.showInformationMessage("Ricwiz: Update cancelled."):ue.window.showErrorMessage(`Ricwiz: Failed to update branch ${g}. Detail: ${w.message}`);return}}if(!i){d.report({message:"Finishing up...",increment:10});try{let a=await F(t);l&&l!==a&&await h(`git checkout ${l}`,{cwd:t})}catch{}ue.window.showInformationMessage(`Ricwiz: Successfully updated ${p} environment branches from their bases!`)}})}var ue,yo=z(()=>{"use strict";ue=y(require("vscode"));S();Qe();ee()});async function bo(){let t=b();if(!t){N.window.showErrorMessage("Ricwiz: Open a folder or workspace that is a Git repository.");return}let e=await F(t),o=N.workspace.getConfiguration("ricwiz");await N.window.withProgress({location:N.ProgressLocation.Notification,title:"Ricwiz: Scanning for unused local branches...",cancellable:!1},async()=>{try{await h("git fetch --prune",{cwd:t})}catch{}let s=[];try{let{stdout:n}=await h('git branch --format="%(refname:short)"',{cwd:t});s=n.split(`
`).map(a=>a.trim()).filter(a=>a.length>0)}catch{}if(s.length===0){N.window.showInformationMessage("Ricwiz: No local branches found.");return}let r=[];try{let{stdout:n}=await h('git branch -r --format="%(refname:short)"',{cwd:t});r=n.split(`
`).map(a=>a.trim().replace(/^origin\//,"").replace(/^[^\/]+\//,"")).filter(a=>a.length>0&&!a.includes("HEAD"))}catch{}let c=[];try{let{stdout:n}=await h('git for-each-ref --format="%(refname:short)|||%(upstream:track)" refs/heads/',{cwd:t});c=n.split(`
`).filter(a=>a.includes("[gone]")).map(a=>a.split("|||")[0].trim())}catch{}let d=s.filter(n=>!r.includes(n));if(d.length===0){N.window.showInformationMessage("Ricwiz: Your local repository is totally clean! All local branches exist on the remote.");return}let u=d.map(n=>{let a=c.includes(n),m=n===e,g="Not found on remote";return a&&(g="Deleted on remote [gone]"),m&&(g+=" (Current branch - will checkout main first)"),{label:n,description:g,picked:a&&!m}}),p=await N.window.showQuickPick(u,{canPickMany:!0,placeHolder:"Select local branches to delete",title:"Ricwiz: Delete Unused Branches"});if(!p||p.length===0){N.window.showInformationMessage("Ricwiz: No branches selected for deletion.");return}if(await N.window.showWarningMessage(`Ricwiz: Delete ${p.length} local branch(es)?
This cannot be undone!`,{modal:!0},"Yes, delete them")!=="Yes, delete them"){N.window.showInformationMessage("Ricwiz: Deletion cancelled.");return}let i=0;for(let n of p){let a=n.label;if(a===e){let m=o.get("ticketSourceBranch","main");try{await h(`git checkout ${m}`,{cwd:t}),e=m}catch{N.window.showWarningMessage(`Ricwiz: Could not switch away from ${a}. Skipping.`);continue}}try{await h(`git branch -D ${a}`,{cwd:t}),i++}catch{N.window.showWarningMessage(`Ricwiz: Could not delete local branch ${a}.`)}}N.window.showInformationMessage(`Ricwiz: \u{1F5D1}\uFE0F Cleaned up ${i} unused local branch(es).`)})}var N,xo=z(()=>{"use strict";N=y(require("vscode"));S()});async function Me(t){let e=b();e&&await ie.window.withProgress({location:ie.ProgressLocation.Notification,title:`Ricwiz: Switching to ${t}...`,cancellable:!1},async()=>{try{let o=await F(e),s=!1;try{let{stdout:c}=await h("git status --porcelain",{cwd:e});s=c.trim().length>0}catch{}if(s&&o)try{await h(`git stash push --include-untracked -m "ricwiz-auto:${o}"`,{cwd:e}),ie.window.showInformationMessage(`Ricwiz: \u{1F4E6} Stashed changes from ${o}`)}catch{ie.window.showWarningMessage("Ricwiz: Could not stash changes. Checkout may fail if there are conflicts.")}let r=t;t.includes("/")&&(r=t.split("/").slice(1).join("/"));try{await h(`git checkout ${r}`,{cwd:e})}catch{let d="";if(t.includes("/"))d=t.split("/")[0];else{let{stdout:u}=await h("git branch -r",{cwd:e}),p=u.split(`
`).map(i=>i.trim()).filter(i=>i),l=[];for(let i of p){let n=i.split(" ")[0];n.endsWith(`/${r}`)&&l.push(n.substring(0,n.lastIndexOf("/")))}if(l.length===0){ie.window.showErrorMessage(`Ricwiz: A branch "${r}" n\xE3o existe localmente nem em nenhuma remote!`);return}else if(l.length===1)d=l[0];else{let i=await D.initialize(e);l.includes("origin")?d="origin":i&&l.includes(i.upstreamRemote)?d=i.upstreamRemote:d=l[0]}}try{await h(`git fetch ${d} ${r}`,{cwd:e}),await h(`git checkout -b ${r} --track ${d}/${r}`,{cwd:e})}catch{ie.window.showErrorMessage(`Ricwiz: Encontrou na remote ${d} mas falhou a fazer checkout.`);return}}try{let{stdout:c}=await h("git stash list",{cwd:e}),d=c.split(`
`);for(let u=0;u<d.length;u++)if(d[u].includes(`ricwiz-auto:${r}`)){let p=d[u].match(/stash@\{(\d+)\}/);p&&(await h(`git stash pop stash@{${p[1]}}`,{cwd:e}),ie.window.showInformationMessage(`Ricwiz: \u{1F4E6} Restored stashed changes on ${r}`));break}}catch{ie.window.showWarningMessage(`Ricwiz: Could not restore stashed changes on ${r}. You may need to resolve conflicts manually (check git stash list).`)}}catch{ie.window.showErrorMessage(`Ricwiz: Could not checkout branch ${t}.`)}})}var ie,et=z(()=>{"use strict";ie=y(require("vscode"));S();ee()});async function ko(){let t=b();if(t)try{let{stdout:e}=await h("git branch --show-current",{cwd:t}),o=e.trim();o&&(await Fe.env.clipboard.writeText(o),Fe.window.showInformationMessage(`Ricwiz: \u{1F4CB} Copied "${o}" to clipboard`))}catch{Fe.window.showErrorMessage("Ricwiz: Could not get the current branch name.")}}var Fe,Co=z(()=>{"use strict";Fe=y(require("vscode"));S()});async function Ro(){let t=b();if(!t){_.window.showErrorMessage("Ricwiz: Open a folder or workspace that is a Git repository.");return}let e=_.workspace.getConfiguration("ricwiz"),o=e.get("ticketSourceBranch","main"),r=e.get("packageXmlCommand",'sf sgd source delta --to "HEAD" --from "origin/{baseBranch}" --output-dir "."').replace("{baseBranch}",o);await _.window.showWarningMessage("Are you sure you want to generate the package.xml? This may overwrite existing local manifest files.",{modal:!0},"Yes, Generate")==="Yes, Generate"&&await _.window.withProgress({location:_.ProgressLocation.Notification,title:"Ricwiz: Generating package.xml using Salesforce CLI...",cancellable:!1},async()=>{try{await h(r,{cwd:t,maxBuffer:10*1024*1024}),_.window.showInformationMessage("Ricwiz: Successfully generated package.xml!");let d=tt.join(t,"package","package.xml"),u=tt.join(t,"package.xml"),p=tt.join(t,"manifest","package.xml");for(let l of[d,u,p])if($o.existsSync(l)){let i=await _.workspace.openTextDocument(l);await _.window.showTextDocument(i);break}}catch(d){_.window.showErrorMessage(`Ricwiz: Error running sf command - ${d.message}`)}})}var _,tt,$o,zo=z(()=>{"use strict";_=y(require("vscode")),tt=y(require("path")),$o=y(require("fs"));S()});async function So(){let t=b();if(!t){Q.window.showErrorMessage("Ricwiz: Open a folder or workspace that is a Git repository.");return}let o=Q.workspace.getConfiguration("ricwiz").get("deployCommand","sf project deploy start --manifest package/package.xml --post-destructive-changes destructiveChanges/destructiveChanges.xml -c -l NoTestRun -g");await Q.window.showWarningMessage("Are you sure you want to deploy to Salesforce? This action modifies your org and cannot be easily undone.",{modal:!0},"Yes, Deploy")==="Yes, Deploy"&&await Q.window.withProgress({location:Q.ProgressLocation.Notification,title:"Ricwiz: Deploying package...",cancellable:!1},async()=>{try{let{stdout:r,stderr:c}=await h(o,{cwd:t,maxBuffer:52428800}),d=Q.window.createOutputChannel("Ricwiz Deploy");d.appendLine(`Executing: ${o}`),d.appendLine(r),c&&(d.appendLine("--- STDERR ---"),d.appendLine(c)),d.show(),Q.window.showInformationMessage("Ricwiz: Successfully ran deploy command!")}catch(r){let c=Q.window.createOutputChannel("Ricwiz Deploy");c.appendLine(`Error executing: ${o}`),r.stdout&&c.appendLine(r.stdout),r.stderr&&c.appendLine(r.stderr),c.appendLine(r.message),c.show(),Q.window.showErrorMessage("Ricwiz: Error running deploy command. See output channel for details.")}})}var Q,Po=z(()=>{"use strict";Q=y(require("vscode"));S()});async function Bo(){let t=b();if(!t){Y.window.showErrorMessage("Ricwiz: Open a folder or workspace that is a Git repository.");return}let o=Y.workspace.getConfiguration("ricwiz").get("importDataCommand","sfdx force:data:tree:import --plan data/plan.json");await Y.window.showWarningMessage("Are you sure you want to import data into Salesforce? This action modifies records in your org.",{modal:!0},"Yes, Import")==="Yes, Import"&&await Y.window.withProgress({location:Y.ProgressLocation.Notification,title:"Ricwiz: Importing data...",cancellable:!1},async()=>{try{let{stdout:r,stderr:c}=await h(o,{cwd:t,maxBuffer:52428800}),d=Y.window.createOutputChannel("Ricwiz Import Data");d.appendLine(`Executing: ${o}`),d.appendLine(r),c&&(d.appendLine("--- STDERR ---"),d.appendLine(c)),d.show(),Y.window.showInformationMessage("Ricwiz: Successfully ran import data command!")}catch(r){let c=Y.window.createOutputChannel("Ricwiz Import Data");c.appendLine(`Error executing: ${o}`),r.stdout&&c.appendLine(r.stdout),r.stderr&&c.appendLine(r.stderr),c.appendLine(r.message),c.show(),Y.window.showErrorMessage("Ricwiz: Error running import data command. See output channel for details.")}})}var Y,Eo=z(()=>{"use strict";Y=y(require("vscode"));S()});async function To(){let t=b();if(!t){Z.window.showErrorMessage("Ricwiz: Open a folder or workspace that is a Git repository.");return}let e="";try{e=await F(t)}catch{}let s=Z.workspace.getConfiguration("ricwiz").get("ticketSourceBranch","main"),r=await Z.window.showInputBox({prompt:`Enter the branch name to list modified files (compared to ${s})`,value:e,placeHolder:"SFPSCA-1234"});r&&await Z.window.withProgress({location:Z.ProgressLocation.Notification,title:`Ricwiz: Finding files for ${r}...`,cancellable:!1},async()=>{try{let c=r.replace(/-to-[a-zA-Z0-9]+$/i,""),d=[];try{let g="";try{let{stdout:f}=await h(`git merge-base origin/${s} ${r}`,{cwd:t});g=f.trim()}catch{let{stdout:f}=await h(`git merge-base ${s} ${r}`,{cwd:t});g=f.trim()}if(g){let{stdout:f}=await h(`git diff --name-only ${g} ${r}`,{cwd:t,maxBuffer:10485760});d=f.split(`
`).map(w=>w.trim()).filter(w=>w.length>0)}}catch{}let u=[];try{let{stdout:g}=await h(`git --no-pager log --grep="\\b${c}\\b" -i -E --name-only -m --first-parent --format=""`,{cwd:t,maxBuffer:10485760});u=g.split(`
`).map(f=>f.trim()).filter(f=>f.length>0)}catch{}let p=[...d,...u];if(p.length===0){Z.window.showInformationMessage(`Ricwiz: No modified files found for ${r}.`);return}let l=Array.from(new Set(p)).sort(),i={};for(let g of l){let f=g.match(/default\/([^/]+)/),w=f&&f[1]?f[1].toUpperCase():"OUTROS";i[w]||(i[w]=[]),i[w].push(g)}let n=`Files modified in branch ${r}:
`,a=Object.keys(i).sort();for(let g of a)n+=`
=== ${g} ===
`,n+=i[g].join(`
`)+`
`;let m=await Z.workspace.openTextDocument({content:n,language:"plaintext"});await Z.window.showTextDocument(m)}catch(c){Z.window.showErrorMessage(`Ricwiz: Error running git log - ${c.message}`)}})}var Z,Mo=z(()=>{"use strict";Z=y(require("vscode"));S()});async function Do(){let t=b();if(!t){ne.window.showErrorMessage("Ricwiz: Open a folder or workspace that is a Git repository.");return}let o=ne.workspace.getConfiguration("ricwiz").get("resetTrackingCommand","sf org disable tracking && sf project reset tracking --no-prompt");await ne.window.withProgress({location:ne.ProgressLocation.Notification,title:"Ricwiz: Resetting tracking...",cancellable:!1},async()=>{try{let{stdout:s,stderr:r}=await h(o,{cwd:t,maxBuffer:52428800}),c=ne.window.createOutputChannel("Ricwiz Reset Tracking");c.appendLine(`Executing: ${o}`),c.appendLine(s),r&&(c.appendLine("--- STDERR ---"),c.appendLine(r)),c.show(),ne.window.showInformationMessage("Ricwiz: Successfully reset tracking!")}catch(s){let r=ne.window.createOutputChannel("Ricwiz Reset Tracking");r.appendLine(`Error executing: ${o}`),s.stdout&&r.appendLine(s.stdout),s.stderr&&r.appendLine(s.stderr),r.appendLine(s.message),r.show(),ne.window.showErrorMessage("Ricwiz: Error resetting tracking. See output channel for details.")}})}var ne,Ao=z(()=>{"use strict";ne=y(require("vscode"));S()});async function Lo(){let t=b();if(!t){K.window.showErrorMessage("Ricwiz: Open a workspace first.");return}let e=["ApexClass","ApexTrigger","CustomObject","CustomField","LightningComponentBundle","AuraDefinitionBundle","Flow","CustomLabel","CustomMetadata","StaticResource","Profile","PermissionSet","PermissionSetGroup","Layout","ValidationRule","RecordType","ListView","Report","EmailTemplate","Other (Type manually)..."],o=await K.window.showQuickPick(e,{placeHolder:"Select Metadata Type to extract (e.g., ApexClass)",ignoreFocusOut:!0});if(!o||o==="Other (Type manually)..."&&(o=await K.window.showInputBox({prompt:"Enter Metadata Type (e.g., CustomApplication, Queue)",ignoreFocusOut:!0}),!o))return;let s={ApexClass:"**/*.cls",ApexTrigger:"**/*.trigger",CustomObject:"**/*.{object,object-meta.xml}",CustomField:"**/*.field-meta.xml",LightningComponentBundle:"**/lwc/*/*.js",AuraDefinitionBundle:"**/aura/*/*.cmp",Flow:"**/*.flow-meta.xml",CustomLabel:"**/*.labels-meta.xml",CustomMetadata:"**/*.md-meta.xml",StaticResource:"**/*.resource-meta.xml",Profile:"**/*.profile-meta.xml",PermissionSet:"**/*.permissionset-meta.xml",PermissionSetGroup:"**/*.permissionsetgroup-meta.xml",Layout:"**/*.layout-meta.xml",ValidationRule:"**/*.validationRule-meta.xml",RecordType:"**/*.recordType-meta.xml",ListView:"**/*.listView-meta.xml"},r=[],c=s[o];if(c)try{r=(await K.workspace.findFiles(c,"**/node_modules/**")).map(p=>{let l=p.fsPath.split(/[\\/]/).pop()||"";if(o==="LightningComponentBundle"||o==="AuraDefinitionBundle"){let i=p.fsPath.split(/[\\/]/);return i[i.length-2]||l.split(".")[0]}return l.split(".")[0]}),r=[...new Set(r)].sort()}catch{}let d=await new Promise(u=>{let p=K.window.createQuickPick();p.title=`Extract ${o}`,p.placeholder="Type name (e.g. MyComponent) or * for all",p.ignoreFocusOut=!0,p.matchOnDescription=!0;let l=()=>{let i=p.value.trim(),n=[];i?n.push({label:`$(cloud-download) Extract "${i}"`,description:"Extract exact name from Salesforce",alwaysShow:!0}):n.push({label:'$(cloud-download) Extract "*" (All)',description:`Extract all ${o}s`,alwaysShow:!0}),r.forEach(a=>{(!i||a.toLowerCase().includes(i.toLowerCase()))&&n.push({label:a,description:"Local workspace component"})}),p.items=n};p.onDidChangeValue(()=>l()),p.onDidAccept(()=>{let i=p.selectedItems[0];if(i){let n=i.label;n.startsWith('$(cloud-download) Extract "')?n=n.replace('$(cloud-download) Extract "',"").replace('" (All)',"").replace('"',""):n==='$(cloud-download) Extract "*" (All)'&&(n="*"),p.hide(),u(n)}}),p.onDidHide(()=>{p.dispose(),u(void 0)}),l(),p.show()});d&&await K.window.withProgress({location:K.ProgressLocation.Notification,title:`Ricwiz: Extracting ${o}:${d} from Salesforce...`,cancellable:!0},async(u,p)=>{try{I.show(!0);let l=`${o}:${d}`,{stdout:i,stderr:n}=await h(`sf project retrieve start -m "${l}"`,{cwd:t});i&&I.appendLine(i),n&&I.appendLine(n),K.window.showInformationMessage(`Ricwiz: Successfully extracted ${l}.`)}catch(l){I.appendLine(`ERROR: ${l.message}`),l.stdout&&I.appendLine(l.stdout),l.stderr&&I.appendLine(l.stderr),K.window.showErrorMessage("Ricwiz: Extraction failed. See Output channel for details.")}})}var K,Io=z(()=>{"use strict";K=y(require("vscode"));S()});async function Oo(){let t=J.window.activeTextEditor;if(!t){J.window.showErrorMessage("Ricwiz: Please open the file you want to deploy in the editor first.");return}let e=t.document.uri.fsPath,o=b();if(!o)return;let s="";if(await J.window.withProgress({location:J.ProgressLocation.Notification,title:"Ricwiz: Fetching available Salesforce orgs...",cancellable:!1},async()=>{try{let{stdout:p}=await h("sf org list --json",{cwd:o});s=p}catch(p){s=p.stdout||""}}),!s){J.window.showErrorMessage("Ricwiz: Failed to fetch orgs. Is Salesforce CLI installed?");return}let r=[];try{let p=JSON.parse(s),l=p.result?.nonScratchOrgs||[],i=p.result?.scratchOrgs||[];r=[...l,...i]}catch{J.window.showErrorMessage("Ricwiz: Failed to parse org list.");return}if(r.length===0){J.window.showInformationMessage("Ricwiz: No authenticated orgs found.");return}let c=r.map(p=>({label:p.alias||p.username,description:p.alias?p.username:"",picked:p.isDefaultUsername})),d=await J.window.showQuickPick(c,{placeHolder:"Select the org(s) to deploy this file to",canPickMany:!0,ignoreFocusOut:!0});if(!d||d.length===0)return;let u=Fo.basename(e);await J.window.withProgress({location:J.ProgressLocation.Notification,title:`Ricwiz: Deploying ${u} to ${d.length} org(s)...`,cancellable:!1},async()=>{I.show(!0),I.appendLine(`--- Starting Parallel Deploy of ${u} ---`);let p=d.map(async a=>{let m=a.label;I.appendLine(`[${m}] Deploying...`);try{let{stdout:g,stderr:f}=await h(`sf project deploy start -d "${e}" -o "${m}"`,{cwd:o});return I.appendLine(`[${m}] \u2705 Success`),g&&I.appendLine(g),{org:m,success:!0}}catch(g){return I.appendLine(`[${m}] \u274C Failed`),g.stdout&&I.appendLine(g.stdout),g.stderr&&I.appendLine(g.stderr),{org:m,success:!1}}}),l=await Promise.all(p),i=l.filter(a=>a.success).length,n=l.filter(a=>!a.success).length;n===0?J.window.showInformationMessage(`Ricwiz: Successfully deployed to all ${i} orgs!`):J.window.showErrorMessage(`Ricwiz: Deploy finished with errors (${i} success, ${n} failed). Check Output channel.`)})}var J,Fo,No=z(()=>{"use strict";J=y(require("vscode")),Fo=y(require("path"));S()});async function Uo(){let t=b();if(!t){A.window.showErrorMessage("Ricwiz: Open a folder or workspace that is a Git repository.");return}let e=A.workspace.getConfiguration("ricwiz"),o=e.get("auditUsername",""),s=e.get("auditHours",8),r=await A.window.showInputBox({prompt:"Enter your Salesforce Username to query in SetupAuditTrail",value:o,placeHolder:"admin@tuaorg.com"});if(!r)return;let c=await A.window.showInputBox({prompt:"How many hours back do you want to search?",value:s.toString(),placeHolder:"8"});if(!c)return;let d=parseFloat(c);if(isNaN(d)||d<=0){A.window.showErrorMessage("Ricwiz: Invalid hours specified.");return}let u=new Date(Date.now()-d*60*60*1e3).toISOString(),l=`sf data query -q "${`SELECT Action, Display, Section FROM SetupAuditTrail WHERE CreatedBy.Username = '${r}' AND CreatedDate >= ${u}`}" --json`;await A.window.withProgress({location:A.ProgressLocation.Notification,title:"Ricwiz: Interrogating Setup Audit Trail...",cancellable:!1},async()=>{try{let{stdout:i}=await h(l,{cwd:t,maxBuffer:52428800}),n=JSON.parse(i);if(!n.result||n.result.records.length===0){A.window.showInformationMessage(`Ricwiz: No changes found for ${r} in the last ${d} hours.`);return}let a=n.result.records,m=[],g=new Set;for(let E of a){let L=di(E.Action,E.Display,E.Section);if(L){let X=`${L.isDelete?"DEL":"ADD"}-${L.metadataFormat}`;if(!g.has(X)){g.add(X);let H=L.isDelete?"$(trash)":"$(plus)";m.push({label:`${H} ${L.metadataFormat}`,description:`${E.Action} -> ${E.Display}`,metadataFormat:L.metadataFormat,isDelete:L.isDelete})}}}if(m.length===0){A.window.showInformationMessage(`Ricwiz: No extractable metadata changes found for ${r} in the last ${d} hours (ignored passwords/logins).`);return}let f=await A.window.showQuickPick(m,{canPickMany:!0,placeHolder:"Select the changes you want to extract to GitLab",ignoreFocusOut:!0});if(!f||f.length===0){A.window.showInformationMessage("Ricwiz: No changes selected.");return}let w=f.filter(E=>E.isDelete),v=f.filter(E=>!E.isDelete),x=A.window.createOutputChannel("Ricwiz Admin Bridge");if(x.show(),w.length>0){let{stdout:E}=await h("git ls-files",{cwd:t}),L=E.split(`
`).map(H=>H.trim()),X=0;for(let H of w){let ce=H.metadataFormat.split(":"),je=ce[0],Je=ce[1],ve=Je;je==="CustomField"&&(ve=Je.split(".")[1]);let nt=L.filter(Re=>{let T=it.basename(Re);return T.startsWith(ve+".")&&T.includes(je==="CustomField"?".field":"")});for(let Re of nt){let T=it.join(t,Re);ot.existsSync(T)&&(ot.unlinkSync(T),x.appendLine(`Deleted local file: ${Re}`),X++)}}A.window.showInformationMessage(`Ricwiz: Deleted ${X} local files from Git workspace.`)}if(v.length===0)return;let R=v.map(E=>E.metadataFormat).filter(E=>E!=="").join(", "),B=await A.window.showInputBox({prompt:"Review and adjust the metadata components to retrieve",value:R,ignoreFocusOut:!0});if(!B)return;let U=`sf project retrieve start -m "${B}"`;x.appendLine(`Executing: ${U}`),A.window.showInformationMessage(`Ricwiz: Extracting ${v.length} components...`);let ge=await h(U,{cwd:t});x.appendLine(ge.stdout),ge.stderr&&(x.appendLine("--- STDERR ---"),x.appendLine(ge.stderr)),A.window.showInformationMessage("Ricwiz: Changes extracted successfully! Ready for Git Commit.")}catch(i){A.window.showErrorMessage(`Ricwiz: Error capturing changes - ${i.message}`)}})}function di(t,e,o){if(!t||!e||!o)return null;let s=t.toLowerCase(),r=o.toLowerCase();if(["security controls","network access","session settings","data export","login history","password policies","identity verification","delegated administration"].includes(r)||s.includes("login")||s.includes("password")||s.includes("oauth")||s.includes("session"))return null;let d=s.includes("delete"),u=null;if(s==="permissionsetgroupcomponentadd"||s==="permissionsetgroupcomponentdelete")return null;let p=(l,i=!1)=>{let n=l.replace(/\(.*\)/g,"").trim();n.includes(":")&&!s.includes("calculation")&&(n=n.split(":")[0]);let a=["disabled","deleted","removed","created","changed","updated","from","to","on","assigned","assign","assignment","permission","set","group","apex","class","trigger","custom","field","object","layout","validation","rule","flow","profile"],m=n.split(/\s+/);if(i){for(;m.length>0&&a.includes(m[m.length-1].toLowerCase());)m.pop();for(;m.length>0&&a.includes(m[0].toLowerCase());)m.shift();return m.join(" ").trim().replace(/[^a-zA-Z0-9_ ]/g,"")}else return m.filter(w=>!a.includes(w.toLowerCase())).join("_").replace(/[^a-zA-Z0-9_]/g,"")||n.replace(/\s+/g,"")};if(s.includes("profile"))u=`Profile:${p(e,!0)}`;else if(s.includes("permissionsetgroupcalculation")){let l=e.split(":");u=`PermissionSetGroup:${l.length>1?l[l.length-1].trim():p(e,!1)}`}else if(s.includes("permission set group")||s.includes("permissionsetgroup"))u=`PermissionSetGroup:${p(e,!1)}`;else if(s.includes("permission set")||s.includes("permissionset"))u=`PermissionSet:${p(e,!1)}`;else if(s.includes("apexclass"))u=`ApexClass:${p(e,!1)}`;else if(s.includes("apextrigger")||s.includes("apex trigger"))u=`ApexTrigger:${p(e,!1)}`;else if(s.includes("customfield")){let l=e.match(/([A-Za-z0-9_]+__c)/),i=e.match(/(?:on|na|for)\s+([A-Za-z0-9_]+)/i);l&&i?u=`CustomField:${i[1]}.${l[1]}`:u=`CustomField:${p(e,!1)}`}else if(s.includes("layout"))u=`Layout:${p(e,!0)}`;else if(s.includes("validation"))u=`ValidationRule:${p(e,!1)}`;else if(s.includes("flow"))u=`Flow:${p(e,!1)}`;else if(s.includes("customobject")){let l=e.match(/([A-Za-z0-9_]+__c)/);u=l?`CustomObject:${l[1]}`:`CustomObject:${p(e,!1)}`}else if(!s.includes("created")&&!s.includes("changed")&&!s.includes("deleted"))return null;return u?{metadataFormat:u,isDelete:d}:null}var A,ot,it,jo=z(()=>{"use strict";A=y(require("vscode")),ot=y(require("fs")),it=y(require("path"));S()});async function Jo(){let t=b();if(t)try{let{stdout:e}=await h('git for-each-ref --sort=-committerdate --format="%(refname:short)|||%(committerdate:relative)|||%(subject)" refs/heads/',{cwd:t}),o=e.split(`
`).filter(r=>r.trim()).map(r=>{let c=r.split("|||");return{label:`$(git-branch) ${c[0]}`,description:c[1],detail:c[2],branchName:c[0]}}),s=await ut.window.showQuickPick(o,{placeHolder:"Select a branch from history to checkout",matchOnDescription:!0,matchOnDetail:!0});s&&await Me(s.branchName)}catch{ut.window.showErrorMessage("Ricwiz: Failed to get branch history")}}var ut,Wo=z(()=>{"use strict";ut=y(require("vscode"));S();et()});async function qo(){let t=b();if(!t)return;let e=await Oe.window.showInputBox({prompt:"Enter ticket number or name (e.g., 48934)",placeHolder:"48934"});if(e)try{let{stdout:o}=await h(`git branch --list "*${e}*"`,{cwd:t}),s=o.split(`
`).map(d=>d.replace("*","").trim()).filter(d=>d);if(s.length===0){Oe.window.showInformationMessage(`Ricwiz: No branches found matching "${e}"`);return}let r=s.map(d=>({label:`$(git-branch) ${d}`,branchName:d})),c=await Oe.window.showQuickPick(r,{placeHolder:`Select a branch for ${e}`});c&&await Me(c.branchName)}catch{Oe.window.showErrorMessage("Ricwiz: Failed to search branches")}}var Oe,Go=z(()=>{"use strict";Oe=y(require("vscode"));S();et()});async function Vo(){let t=$e.window.activeTextEditor;if(!t)return $e.window.showErrorMessage("Ricwiz: Please open a file in the editor to check blame."),null;let e=t.document.fileName,o=Ho.basename(e),s=b();if(!s)return $e.window.showErrorMessage("Ricwiz: Workspace is not a git repository."),null;let r=[];try{let{stdout:i}=await h(`git log -5 --pretty=format:"%an|%ar|%s|%h" -- "${e}"`,{cwd:s}),n=i.trim().split(`
`);for(let a of n){let m=a.split("|");m.length>=4&&r.push({author:m[0],time:m[1],message:m.slice(2,-1).join("|"),hash:m[m.length-1]})}}catch(i){console.error("Git blame error:",i)}let c="Unknown",d="Unknown",u="Unknown",p=[],l=li(e);if(l)try{await $e.window.withProgress({location:$e.ProgressLocation.Notification,title:`Ricwiz: Analyzing ${l.name} in Salesforce...`,cancellable:!1},async()=>{let i="";if(l.type==="CustomField"){let n=l.name.split(".");n.length===2&&(i=`SELECT LastModifiedBy.Name, LastModifiedDate, CreatedBy.Name FROM CustomField WHERE DeveloperName = '${n[1].replace("__c","")}' AND TableEnumOrId = '${n[0]}'`)}else l.type==="LightningComponentBundle"?i=`SELECT LastModifiedBy.Name, LastModifiedDate, CreatedBy.Name FROM LightningComponentBundle WHERE DeveloperName = '${l.name}'`:i=`SELECT LastModifiedBy.Name, LastModifiedDate, CreatedBy.Name FROM ${l.type} WHERE Name = '${l.name}'`;if(i)try{let{stdout:n}=await h(`sf data query -t -q "${i}" --json`,{cwd:s,maxBuffer:52428800}),a=JSON.parse(n);if(a&&a.result&&a.result.records&&a.result.records.length>0){let m=a.result.records[0];c=m.LastModifiedBy?m.LastModifiedBy.Name:"Unknown",u=m.CreatedBy?m.CreatedBy.Name:"Unknown",d=new Date(m.LastModifiedDate).toLocaleString()}else c="Not found in Org",d="N/A",u="N/A"}catch{c="Query Error",d="N/A",u="N/A"}try{let n="SELECT Action, Display, CreatedBy.Name, CreatedDate FROM SetupAuditTrail ORDER BY CreatedDate DESC LIMIT 1500",{stdout:a}=await h(`sf data query -q "${n}" --json`,{cwd:s,maxBuffer:52428800}),m=JSON.parse(a);if(m&&m.result&&m.result.records){let g=l.name.replace("__c","");p=m.result.records.filter(w=>w.Display&&w.Display.includes(g)).map(w=>({action:w.Action,display:w.Display,author:w.CreatedBy?w.CreatedBy.Name:"Unknown",time:new Date(w.CreatedDate).toLocaleString()})).slice(0,10)}}catch(n){console.error("Audit trail query error:",n)}})}catch(i){console.error("Salesforce query error:",i)}else c="Unsupported Metadata Type",d="N/A";return{fileName:o,gitHistory:r,sfAuthor:c,sfTime:d,sfCreatedBy:u,auditHistory:p}}function li(t){let e=t.replace(/\\/g,"/");if(e.includes("/classes/")){let o=e.match(/\/classes\/([^/.]+)\.cls/);if(o)return{type:"ApexClass",name:o[1]}}if(e.includes("/triggers/")){let o=e.match(/\/triggers\/([^/.]+)\.trigger/);if(o)return{type:"ApexTrigger",name:o[1]}}if(e.includes("/lwc/")){let o=e.match(/\/lwc\/([^/]+)\//);if(o)return{type:"LightningComponentBundle",name:o[1]}}if(e.includes("/aura/")){let o=e.match(/\/aura\/([^/]+)\//);if(o)return{type:"AuraDefinitionBundle",name:o[1]}}if(e.includes("/objects/")&&e.includes("/fields/")){let o=e.match(/\/objects\/([^/]+)\//),s=e.match(/\/fields\/([^/.]+)\.field/);if(o&&s)return{type:"CustomField",name:`${o[1]}.${s[1]}`}}return null}var $e,Ho,_o=z(()=>{"use strict";$e=y(require("vscode")),Ho=y(require("path"));S()});function Qo(t,e,o){t.subscriptions.push(C.commands.registerCommand("ricwiz.generateDestructiveChanges",Rt),C.commands.registerCommand("ricwiz.runSmartTests",St),C.commands.registerCommand("ricwiz.refreshWebview",()=>{e&&C.commands.executeCommand("workbench.action.webview.reloadWebviewAction")}),C.commands.registerCommand("ricwiz.createBranches",Mt),C.commands.registerCommand("ricwiz.prepareDeploy",Ut),C.commands.registerCommand("ricwiz.createMergeRequests",Wt),C.commands.registerCommand("ricwiz.createMergeRequestsVSCode",qt),C.commands.registerCommand("ricwiz.openJiraTicket",Vt),C.commands.registerCommand("ricwiz.openJiraTicketVSCode",_t),C.commands.registerCommand("ricwiz.showJiraDetails",()=>{e&&io(e)}),C.commands.registerCommand("ricwiz.openJiraDashboard",s=>{e&&so(e,s)}),C.commands.registerCommand("ricwiz.openJiraDetailsForId",s=>{e&&ro(e,s)}),C.commands.registerCommand("ricwiz.toggleDashboardBranches",s=>{e&&(e.setDashboardShowBranches(s),C.commands.executeCommand("ricwiz.openJiraDashboard"))}),C.commands.registerCommand("ricwiz.changeJiraStatus",co),C.commands.registerCommand("ricwiz.addJiraComment",lo),C.commands.registerCommand("ricwiz.addJiraLabel",mo),C.commands.registerCommand("ricwiz.setJiraToken",po),C.commands.registerCommand("ricwiz.setGitlabToken",go),C.commands.registerCommand("ricwiz.syncAll",ho),C.commands.registerCommand("ricwiz.updateBases",vo),C.commands.registerCommand("ricwiz.deleteUnusedBranches",bo),C.commands.registerCommand("ricwiz.checkoutBranch",Me),C.commands.registerCommand("ricwiz.copyBranchName",ko),C.commands.registerCommand("ricwiz.generatePackageXml",Ro),C.commands.registerCommand("ricwiz.deployPackage",So),C.commands.registerCommand("ricwiz.importData",Bo),C.commands.registerCommand("ricwiz.listTicketFiles",To),C.commands.registerCommand("ricwiz.resetTracking",Do),C.commands.registerCommand("ricwiz.extractComponent",Lo),C.commands.registerCommand("ricwiz.deployMultiOrg",Oo),C.commands.registerCommand("ricwiz.captureAdminChanges",Uo),C.commands.registerCommand("ricwiz.openHistory",Jo),C.commands.registerCommand("ricwiz.searchTicket",qo),C.commands.registerCommand("ricwiz.whoToBlame",async()=>{let s=await Vo();s&&e&&(e.setBlameData(s),e.setPage("blame"))}),C.commands.registerCommand("ricwiz.manualRefresh",()=>{o&&o()}),C.commands.registerCommand("ricwiz.toggleAutoRefresh",()=>{if(e){let s=!e.isAutoRefreshEnabled();e.setAutoRefresh(s),C.workspace.getConfiguration("ricwiz").update("autoRefresh",s,C.ConfigurationTarget.Global)}}),C.commands.registerCommand("ricwiz.openSettings",()=>{C.commands.executeCommand("workbench.action.openSettings","ricwiz")}))}var C,Yo=z(()=>{"use strict";C=y(require("vscode"));zt();Pt();Dt();jt();Gt();Qt();no();ao();uo();fo();wo();yo();xo();et();Co();zo();Po();Eo();Mo();Ao();Io();No();jo();Wo();Go();_o()});function Zo(t,e,o){let s,r=ae.workspace.getConfiguration("ricwiz").get("autoRefresh",!0);e?.setAutoRefresh(r),t.subscriptions.push(ae.workspace.onDidChangeConfiguration(d=>{if(d.affectsConfiguration("ricwiz.autoRefresh")){let u=ae.workspace.getConfiguration("ricwiz").get("autoRefresh",!0);e?.setAutoRefresh(u)}}));async function c(){let d=ae.extensions.getExtension("vscode.git");if(d){let l=function(i){let n="",a;async function m(){let f=ae.workspace.workspaceFolders;if(!f)return;let w=f[0].uri.fsPath,v=await F(w);if(v&&v!==n){n=v;let x=ae.workspace.getConfiguration("ricwiz"),R=x.get("ticketPrefix","SFPSCA-");if(!v.includes(R)){let T=v.match(/([A-Z]+-)\d+/i);T&&(R=T[1].toUpperCase())}let B=[],U=[],ge=[],E=[],L=await D.initialize(w,{skipPrompt:!0}),X=L?.environments||x.get("environments",[{name:"Qual",sourceBranch:"quality"},{name:"Val",sourceBranch:"validation"},{name:"Prod",sourceBranch:"main"}]);try{let T=x.get("workspaceCheckoutButtons",["main","quality","validation"]);ge=Array.from(new Set(T))}catch{}let H="",ce=v.match(new RegExp(`(${R}\\d+(?:-\\d+)?)`,"i"));if(ce){let T=ce[1].toUpperCase();H=T;let ye=x.get("commitMessageSuffix","- "),gt=/^[A-Z]+-\d+(?:-\d+)?\s*(?:-\s*|:\s*|\s+)?/i;gt.test(i.inputBox.value)?i.inputBox.value.toUpperCase().startsWith(T)||(i.inputBox.value=i.inputBox.value.replace(gt,`${T}${ye}`)):i.inputBox.value=`${T}${ye}`+i.inputBox.value,o.text=`$(bookmark) ${T}`,o.tooltip=`Branch: ${v}
Click to open Jira ticket`,o.show();try{let ft=await mt(w,T,"");B=await at(w,ft,T,X,L)}catch{}}else{o.hide();try{E=await lt(w)}catch{}}let[je,Je,ve]=await Promise.all([dt(w,10),ct(w,v,X,L),H?Te(H).catch(T=>{let ye=T.message;return(ye.includes("ENOTFOUND")||ye.includes("network"))&&(ye="No Internet or Invalid URL"),{summary:`\u26A0\uFE0F Jira Error: ${ye}`,description:"",status:""}}):Promise.resolve(null)]);U=je;let nt=ve?ve.summary:"",Re=ve&&ve.status||"";e?.updateBranch(v,Je,B,U,ge,E,nt,Re)}}function g(){e?.isAutoRefreshEnabled()&&(a&&clearTimeout(a),a=setTimeout(()=>{n="",m()},300))}s=()=>{n="",m()},m(),i.state.onDidChange(()=>g()),ae.window.onDidChangeWindowState(f=>{f.focused&&g()})};var u=l;d.isActive||await d.activate();let p=d.exports.getAPI(1);p.repositories.length>0&&p.repositories.forEach(i=>l(i)),p.onDidOpenRepository(i=>l(i))}}return c(),()=>{s&&s()}}var ae,Ko=z(()=>{"use strict";ae=y(require("vscode"));S();we();Ie();ee()});var Ve={};De(Ve,{activate:()=>mi,deactivate:()=>pi,webviewProvider:()=>Ne});module.exports=O(Ve);function mi(t){vt(t),Ne=new qe(t.extensionUri),t.subscriptions.push(Ue.window.registerWebviewViewProvider("ricwiz-webview",Ne));let e=Ue.window.createStatusBarItem(Ue.StatusBarAlignment.Left,100);e.command="ricwiz.openJiraTicket",t.subscriptions.push(e);let o=Zo(t,Ne,e);Qo(t,Ne,o)}function pi(){}var Ue,Ne,_e=z(()=>{Ue=y(require("vscode"));wt();ze();Yo();Ko()});_e();0&&(module.exports={activate,deactivate,webviewProvider});
