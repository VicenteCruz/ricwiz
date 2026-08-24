"use strict";var ei=Object.create;var We=Object.defineProperty;var ti=Object.getOwnPropertyDescriptor;var oi=Object.getOwnPropertyNames;var ii=Object.getPrototypeOf,ni=Object.prototype.hasOwnProperty;var z=(t,e,o)=>()=>{if(o)throw o[0];try{return t&&(e=t(t=0)),e}catch(s){throw o=[s],s}};var De=(t,e)=>{for(var o in e)We(t,o,{get:e[o],enumerable:!0})},ht=(t,e,o,s)=>{if(e&&typeof e=="object"||typeof e=="function")for(let r of oi(e))!ni.call(t,r)&&r!==o&&We(t,r,{get:()=>e[r],enumerable:!(s=ti(e,r))||s.enumerable});return t};var b=(t,e,o)=>(o=t!=null?ei(ii(t)):{},ht(e||!t||!t.__esModule?We(o,"default",{value:t,enumerable:!0}):o,t)),O=t=>ht(We({},"__esModule",{value:!0}),t);function $(t){return t.replace(/&/g,"&amp;").replace(/</g,"&lt;").replace(/>/g,"&gt;").replace(/"/g,"&quot;").replace(/'/g,"&#39;")}var k,qe,wt=z(()=>{"use strict";k=b(require("vscode"));qe=class{constructor(e){this._extensionUri=e}_extensionUri;webviewView;resolveWebviewView(e,o,s){this.webviewView=e,e.webview.options={enableScripts:!0,localResourceRoots:[this._extensionUri]},this.updateBranch("",!1),e.webview.onDidReceiveMessage(r=>{switch(r.command){case"createBranches":k.commands.executeCommand("ricwiz.createBranches");break;case"createBranchForTicket":k.commands.executeCommand("ricwiz.createBranches",r.args);break;case"prepareDeploy":k.commands.executeCommand("ricwiz.prepareDeploy");break;case"openMRs":k.commands.executeCommand("ricwiz.createMergeRequests");break;case"openMRsVSCode":k.commands.executeCommand("ricwiz.createMergeRequestsVSCode");break;case"openExternal":r.args&&k.env.openExternal(k.Uri.parse(r.args));break;case"openJira":k.commands.executeCommand("ricwiz.openJiraTicket");break;case"showJiraDetails":k.commands.executeCommand("ricwiz.showJiraDetails");break;case"changeJiraStatus":k.commands.executeCommand("ricwiz.changeJiraStatus");break;case"addJiraComment":k.commands.executeCommand("ricwiz.addJiraComment");break;case"addJiraLabel":k.commands.executeCommand("ricwiz.addJiraLabel");break;case"setPage":this.setPage(r.args);break;case"openDashboard":k.commands.executeCommand("ricwiz.openJiraDashboard");break;case"openJiraDetailsForId":k.commands.executeCommand("ricwiz.openJiraDetailsForId",r.args);break;case"refreshDashboard":k.commands.executeCommand("ricwiz.openJiraDashboard");break;case"switchDashboardQuery":k.commands.executeCommand("ricwiz.openJiraDashboard",parseInt(r.args));break;case"toggleDashboardBranches":k.commands.executeCommand("ricwiz.toggleDashboardBranches",r.args);break;case"openJiraVSCode":k.commands.executeCommand("ricwiz.openJiraTicketVSCode");break;case"openSettings":k.commands.executeCommand("ricwiz.openSettings");break;case"checkout":r.branch&&k.commands.executeCommand("ricwiz.checkoutBranch",r.branch);break;case"copyBranch":k.commands.executeCommand("ricwiz.copyBranchName");break;case"generatePackageXml":k.commands.executeCommand("ricwiz.generatePackageXml");break;case"openDevTools":this.setPage("devtools");break;case"openMain":this.setPage("main");break;case"generateDestructiveChanges":k.commands.executeCommand("ricwiz.generateDestructiveChanges");break;case"deployPackage":k.commands.executeCommand("ricwiz.deployPackage");break;case"runSmartTests":k.commands.executeCommand("ricwiz.runSmartTests");break;case"importData":k.commands.executeCommand("ricwiz.importData");break;case"listTicketFiles":k.commands.executeCommand("ricwiz.listTicketFiles");break;case"resetTracking":k.commands.executeCommand("ricwiz.resetTracking");break;case"extractComponent":k.commands.executeCommand("ricwiz.extractComponent");break;case"deployMultiOrg":k.commands.executeCommand("ricwiz.deployMultiOrg");break;case"captureAdminChanges":k.commands.executeCommand("ricwiz.captureAdminChanges");break;case"whoToBlame":k.commands.executeCommand("ricwiz.whoToBlame");break;case"syncAll":k.commands.executeCommand("ricwiz.syncAll");break;case"updateBases":k.commands.executeCommand("ricwiz.updateBases");break;case"deleteUnused":k.commands.executeCommand("ricwiz.deleteUnusedBranches");break;case"conflict_commitAndContinue":k.commands.executeCommand("ricwiz.conflictAction","commitAndContinue");break;case"conflict_resolveDeletions":k.commands.executeCommand("ricwiz.conflictAction","resolveDeletions");break;case"conflict_abortDeploy":k.commands.executeCommand("ricwiz.conflictAction","abortDeploy");break;case"openFile":if(r.file){let d=k.workspace.workspaceFolders;if(d){let c=k.Uri.joinPath(d[0].uri,r.file);k.commands.executeCommand("vscode.open",c)}}break;case"searchTicket":k.commands.executeCommand("ricwiz.searchTicket");break;case"manualRefresh":k.commands.executeCommand("ricwiz.manualRefresh");break;case"toggleAutoRefresh":k.commands.executeCommand("ricwiz.toggleAutoRefresh");break;case"openHistory":k.commands.executeCommand("ricwiz.openHistory");break}})}conflictState=null;setConflictState(e){this.conflictState=e,this.updateView()}updateBranch(e,o,s=[],r=[],d=[],c=[],p="",u=""){this.webviewView&&(this.currentBranchCache=e,this.currentBranchIsMergedCache=o,this.relatedBranchesCache=s,this.commitsCache=r,this.baseBranchesCache=d,this.recentTicketsCache=c,this.ticketTitleCache=p,this.ticketStatusCache=u,this.updateView())}currentBranchCache="";currentBranchIsMergedCache=!1;relatedBranchesCache=[];commitsCache=[];baseBranchesCache=[];recentTicketsCache=[];ticketTitleCache="";ticketStatusCache="";currentPage="main";blameDataCache=null;jiraDataCache=null;dashboardDataCache=null;dashboardShowBranches=!1;autoRefreshEnabled=!0;setDashboardShowBranches(e){this.dashboardShowBranches=e}getDashboardShowBranches(){return this.dashboardShowBranches}setBlameData(e){this.blameDataCache=e}setJiraData(e){this.jiraDataCache=e}setDashboardData(e){this.dashboardDataCache=e}setAutoRefresh(e){this.autoRefreshEnabled=e,this.updateView()}isAutoRefreshEnabled(){return this.autoRefreshEnabled}setPage(e){this.currentPage=e,this.updateView()}updateView(){if(!this.webviewView)return;let e=this.webviewView.webview.asWebviewUri(k.Uri.joinPath(this._extensionUri,"resources","logo.png"));this.webviewView.webview.html=this._getHtmlForWebview(e,this.currentBranchCache,this.relatedBranchesCache,this.commitsCache,this.baseBranchesCache,this.recentTicketsCache,this.currentPage)}_getHtmlForWebview(e,o,s,r,d,c,p){let u=r.length>0?`
            <div class="separator"></div>
            <div style="padding: 0 4px;">
                <div style="font-size: 11px; opacity: 0.7; margin-bottom: 6px; display: flex; align-items: center; gap: 4px;">
                    <span>\u{1F4DC}</span> Recent Commits
                </div>
                <div style="display: flex; flex-direction: column; gap: 2px;">
                    ${r.map(m=>`
                        <div style="font-size: 11px; padding: 3px 4px; border-radius: 2px; display: flex; gap: 6px; align-items: baseline;">
                            <code style="color: var(--vscode-textLink-foreground); font-size: 10px; flex-shrink: 0;">${$(m.hash)}</code>
                            <span style="flex: 1; overflow: hidden; text-overflow: ellipsis; white-space: nowrap;" title="${$(m.message)}">${$(m.message)}</span>
                            <span style="font-size: 9px; opacity: 0.5; flex-shrink: 0;">${$(m.timeAgo)}</span>
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
                ${a}
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
            </html>`}if(p==="blame"){let m=this.blameDataCache;return`<!DOCTYPE html>
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
            </html>`}if(p==="jira"){let m=this.jiraDataCache,w=m?.ticketId||"Jira",v=m?.summary||"No Title",x=m?.description||"No description provided.",R=m?.relatedBranches||[];return`<!DOCTYPE html>
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
            </html>`}if(p==="dashboard"){let m=this.dashboardDataCache||{queries:[],selectedIndex:0,results:[],error:null},w=m.queries.map((x,R)=>`
                <option value="${R}" ${R===m.selectedIndex?"selected":""}>${$(x.name)}</option>
            `).join(""),v=m.error?`
                <div style="color: var(--vscode-errorForeground); padding: 12px; text-align: center; background: var(--vscode-editorError-background); border-radius: 4px;">
                    \u26A0\uFE0F ${$(m.error)}
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
                        ${m.results.map(x=>`
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
            </html>`;let i=s.find(m=>m.name===o),n="";i&&(i.pipelineStatus==="running"?n="\u23F3":i.pipelineStatus==="success"?n="\u2705":i.pipelineStatus==="failed"?n="\u274C":i.pipelineStatus==="canceled"?n="\u{1F6D1}":i.pipelineStatus==="skipped"&&(n="\u23ED\uFE0F"));let l=i?i.mrUrl:void 0,g=s.filter(m=>m.name!==o),h=o?`<div style="background-color: var(--vscode-editor-inactiveSelectionBackground); padding: 10px; border-radius: 6px; margin-bottom: 16px; border: 1px solid var(--vscode-panel-border); box-shadow: 0 2px 4px rgba(0,0,0,0.1); position: relative;">
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
                        ${l?`<span onclick="event.stopPropagation(); sendCommand('openExternal', '${l}');" title="Open Merge Request" style="cursor: pointer; font-size: 12px;">\u{1F517}</span>`:""}
                        ${this.currentBranchIsMergedCache?'<span style="background-color: var(--vscode-charts-green); color: white; border-radius: 3px; padding: 1px 4px; font-size: 10px; font-weight: bold;" title="Merged to target env">MERGED</span>':""}
                    </div>
                    ${this.ticketTitleCache?`<div style="font-size: 12px; margin-top: 6px; text-align: center; opacity: 0.9; font-style: italic;">${$(this.ticketTitleCache)}</div>`:""}
                    ${g.length>0?`
                        <div style="margin-top: 10px; border-top: 1px solid var(--vscode-panel-border); padding-top: 10px;">
                            <div style="font-size: 10px; opacity: 0.7; margin-bottom: 6px; text-transform: uppercase; text-align: center;">Sister Branches</div>
                            <div style="display: flex; flex-direction: column; gap: 4px;">
                                ${g.map(m=>{let w="";return m.pipelineStatus==="running"?w="\u23F3":m.pipelineStatus==="success"?w="\u2705":m.pipelineStatus==="failed"?w="\u274C":m.pipelineStatus==="canceled"?w="\u{1F6D1}":m.pipelineStatus==="skipped"&&(w="\u23ED\uFE0F"),`
                                    <div class="btn" style="padding: 4px 8px; font-size: 11px; display: flex; justify-content: space-between; align-items: center; background-color: var(--vscode-button-secondaryBackground); color: var(--vscode-button-secondaryForeground); border-radius: 4px;" onclick="sendCheckoutCommand('${$(m.name)}', this)" title="Checkout ${$(m.name)}">
                                        <div style="display: flex; align-items: center; gap: 4px; overflow: hidden;">
                                            <span style="overflow: hidden; text-overflow: ellipsis; white-space: nowrap; font-weight: bold;">${$(m.name)}</span>
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
                    `:c.length>0?`
                        <div style="margin-top: 10px; border-top: 1px solid var(--vscode-panel-border); padding-top: 10px;">
                            <div style="font-size: 10px; opacity: 0.7; margin-bottom: 6px; text-transform: uppercase; text-align: center;">Recent Tickets</div>
                            <div style="display: flex; flex-direction: column; gap: 4px;">
                                ${c.map(m=>`
                                    <div class="btn" style="padding: 4px 8px; font-size: 11px; display: flex; align-items: center; background-color: var(--vscode-button-secondaryBackground); color: var(--vscode-button-secondaryForeground); border-radius: 4px;" onclick="sendCheckoutCommand('${$(m)}', this)" title="Checkout ${$(m)}">
                                        <span style="font-weight: bold;">${$(m)}</span>
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


            ${d.length>0?`
                <div style="display: flex; gap: 4px; margin-bottom: 16px; flex-wrap: wrap; justify-content: center;">
                    ${d.map(m=>`
                        <button class="btn" style="flex: 1; min-width: 25%; justify-content: center; padding: 6px 4px; font-size: 10px; font-weight: bold; background-color: var(--vscode-button-secondaryBackground); color: var(--vscode-button-secondaryForeground); border-radius: 4px;" onclick="sendCheckoutCommand('${$(m)}', this)" title="Checkout ${$(m)}">
                            ${$(m.toUpperCase())}
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
        </html>`}}});function vt(t){le=t.secrets}async function bt(t){if(!le)throw new Error("SecretStorage is not initialized.");await le.store("ricwiz.jiraApiToken",t)}async function yt(){if(!le)throw new Error("SecretStorage is not initialized.");return await le.get("ricwiz.jiraApiToken")}async function xt(t){if(!le)throw new Error("SecretStorage is not initialized.");await le.store("ricwiz.gitlabApiToken",t)}async function st(){if(!le)throw new Error("SecretStorage is not initialized.");return await le.get("ricwiz.gitlabApiToken")}var le,ze=z(()=>{"use strict"});var Ae={};De(Ae,{checkBranchExists:()=>fe,checkRemoteBranchExists:()=>Rt,exec:()=>f,extractTicketSuggestion:()=>Be,getCurrentBranch:()=>F,getWorkspaceCwd:()=>y,normalizeTicketId:()=>$t,promptForTicketId:()=>G,resolvePrefix:()=>Pe,ricwizLogger:()=>I});function y(){let t=Se.workspace.workspaceFolders;if(t)return t[0].uri.fsPath}async function F(t){try{let{stdout:e}=await f("git branch --show-current",{cwd:t});return e.trim()}catch{return""}}function Pe(t,e){if(!t.includes(e)){let o=t.match(/([A-Z]+-)\d+/i);if(o)return o[1].toUpperCase()}return e}function Be(t,e,o=!1){let s=t.match(new RegExp(`(${e}\\d+)`,"i"));return s?s[1].toUpperCase():t.includes(e)&&!t.includes("-to-")?t.substring(t.indexOf(e)):o&&t.includes("-to-")?t.substring(t.indexOf(e)).split("-to-")[0]:""}function $t(t,e){let o=t.trim();return/^\d/.test(o)?`${e}${o}`.toUpperCase():o.toUpperCase()}async function G(t,e){let o=Se.workspace.getConfiguration("ricwiz"),s=e?.prefix??o.get("ticketPrefix","SFPSCA-"),r=await F(t),d=Pe(r,s),c=e?.suggestedValue??Be(r,d,e?.handleToSuffix),p=await Se.window.showInputBox({prompt:e?.prompt||"Enter the full ticket ID (e.g., SCPSCA-1234) or just the number",placeHolder:e?.placeHolder||"Ticket ID or number",value:c});return p?{ticketId:$t(p,d),currentBranch:r,prefix:d}:void 0}async function fe(t,e){try{return await f(`git show-ref --verify --quiet refs/heads/${e}`,{cwd:t}),!0}catch{}return await Rt(t,e)}async function Rt(t,e){try{let{stdout:o}=await f(`git branch -r --list "*/${e}"`,{cwd:t});return o.trim().length>0}catch{return!1}}var Se,kt,Ct,si,I,f,S=z(()=>{"use strict";Se=b(require("vscode")),kt=b(require("child_process")),Ct=b(require("util")),si=Ct.promisify(kt.exec),I=Se.window.createOutputChannel("Ricwiz"),f=async(t,e)=>{I.appendLine(`[EXEC] ${t}`);let o=await si(t,{maxBuffer:50*1024*1024,...e});return{stdout:o.stdout.toString(),stderr:o.stderr.toString()}}});var St={};De(St,{WorkflowContext:()=>E});var Le,zt,Ge,E,j=z(()=>{"use strict";Le=b(require("vscode")),zt=b(require("path")),Ge=b(require("fs")),E=class t{style;upstreamRemote;originRemote;ticketSourceBranch;ticketPrefix;branchPrefix;environments;static baseConfig=Le.workspace.getConfiguration("ricwiz");activeProfile;profileName;constructor(e){this.activeProfile=e,this.profileName=e?.name;let o=t.baseConfig;this.style=e?.workflowStyle||o.get("workflowStyle","standard"),this.style==="multi-remote"?(this.upstreamRemote=e?.upstreamRemote||o.get("upstreamRemote","salesforce-master"),this.originRemote=e?.originRemote||o.get("originRemote","origin")):(this.upstreamRemote="origin",this.originRemote="origin"),this.ticketSourceBranch=e?.ticketSourceBranch||o.get("ticketSourceBranch","main"),this.ticketPrefix=e?.ticketPrefix||o.get("ticketPrefix","SFPSCA-"),this.branchPrefix=e?.branchPrefix??o.get("branchPrefix","");let s=[{name:"Qual",sourceBranch:"quality"},{name:"Val",sourceBranch:"validation"},{name:"Prod",sourceBranch:"main"}];this.environments=e?.environments||o.get("environments",s)}getConfig(e,o){return this.activeProfile&&this.activeProfile[e]!==void 0?this.activeProfile[e]:t.baseConfig.get(e,o)}static async initialize(e,o){let s=t.baseConfig.get("profiles",[]),r=zt.join(e,"ricwiz.json");if(Ge.existsSync(r))try{let d=Ge.readFileSync(r,"utf-8"),c=JSON.parse(d);c&&Array.isArray(c.profiles)&&(s=[...s,...c.profiles])}catch(d){Le.window.showErrorMessage(`Ricwiz: Error parsing ricwiz.json: ${d.message}`)}if(s.length>0){if(!o?.forcePrompt)try{let{exec:u}=(S(),O(Ae)),{stdout:a}=await u("git branch --show-current",{cwd:e}),i=a.trim(),n=i;i.includes("-to-")&&(n=i.split("-to-")[0]);let{stdout:l}=await u(`git config branch.${n}.ricwiz-profile`,{cwd:e}),g=l.trim();if(g){let h=s.find(m=>m.name===g);if(h)return new t(h)}}catch{}if(o?.skipPrompt)return new t;let d=s.map(u=>u.name),c=await Le.window.showQuickPick(d,{placeHolder:"Ricwiz: Select Workflow Profile",ignoreFocusOut:!0});if(!c)return;let p=s.find(u=>u.name===c);return new t(p)}return new t}buildUpstreamPath(e){return e.includes("/")?e:`${this.upstreamRemote}/${e}`}getFetchRemote(e){return e.includes("/")?e.split("/")[0]:this.upstreamRemote}getFetchBranch(e){return e.includes("/")?e.substring(e.indexOf("/")+1):e}}});async function Pt(){let t=y();if(!t){H.window.showErrorMessage("Ricwiz: Open a workspace that is a Git repository.");return}let e=await E.initialize(t,{skipPrompt:!0}),o=e?e.ticketSourceBranch:H.workspace.getConfiguration("ricwiz").get("ticketSourceBranch","main"),s=e?e.upstreamRemote:"origin";await H.window.withProgress({location:H.ProgressLocation.Notification,title:`Ricwiz: Finding deleted files compared to ${s}/${o}...`,cancellable:!1},async()=>{try{let{stdout:r}=await f(`git diff --name-only --diff-filter=D ${s}/${o}...HEAD`,{cwd:t}),d=r.split(`
`).map(g=>g.trim()).filter(g=>g.length>0);if(d.length===0){H.window.showInformationMessage(`Ricwiz: No deleted files found compared to ${s}/${o}.`);return}let c={},p=(g,h)=>{c[g]||(c[g]=[]),c[g].includes(h)||c[g].push(h)};for(let g of d){let h=g.replace(/\\/g,"/");if(h.includes("/classes/")){let m=h.match(/\/classes\/([^/.]+)\.cls/);m&&p("ApexClass",m[1])}else if(h.includes("/triggers/")){let m=h.match(/\/triggers\/([^/.]+)\.trigger/);m&&p("ApexTrigger",m[1])}else if(h.includes("/lwc/")){let m=h.match(/\/lwc\/([^/]+)\//);m&&p("LightningComponentBundle",m[1])}else if(h.includes("/aura/")){let m=h.match(/\/aura\/([^/]+)\//);m&&p("AuraDefinitionBundle",m[1])}else if(h.includes("/objects/")&&h.includes("/fields/")){let m=h.match(/\/objects\/([^/]+)\//),w=h.match(/\/fields\/([^/.]+)\.field/);m&&w&&p("CustomField",`${m[1]}.${w[1]}`)}else if(h.includes("/objects/")){let m=h.match(/\/objects\/([^/.]+)\.object/);m&&p("CustomObject",m[1])}else if(h.includes("/layouts/")){let m=h.match(/\/layouts\/([^/.]+)\.layout/);m&&p("Layout",m[1])}else if(h.includes("/flows/")){let m=h.match(/\/flows\/([^/.]+)\.flow/);m&&p("Flow",m[1])}else if(h.includes("/permissionsets/")){let m=h.match(/\/permissionsets\/([^/.]+)\.permissionset/);m&&p("PermissionSet",m[1])}else if(h.includes("/profiles/")){let m=h.match(/\/profiles\/([^/.]+)\.profile/);m&&p("Profile",m[1])}else if(h.includes("/customMetadata/")){let m=h.match(/\/customMetadata\/([^/.]+)\.md/);m&&p("CustomMetadata",m[1])}else if(h.includes("/flexipages/")){let m=h.match(/\/flexipages\/([^/.]+)\.flexipage/);m&&p("FlexiPage",m[1])}}if(Object.keys(c).length===0){H.window.showInformationMessage("Ricwiz: Found deleted files in Git, but none mapped to recognizable Salesforce metadata.");return}let u=`<?xml version="1.0" encoding="UTF-8"?>
<Package xmlns="http://soap.sforce.com/2006/04/metadata">
`;for(let g of Object.keys(c).sort()){u+=`    <types>
`;for(let h of c[g].sort())u+=`        <members>${h}</members>
`;u+=`        <name>${g}</name>
    </types>
`}u+=`    <version>58.0</version>
</Package>`;let a=He.join(t,"destructiveChanges");he.existsSync(a)||he.mkdirSync(a);let i=He.join(a,"destructiveChanges.xml"),n=He.join(a,"package.xml");he.writeFileSync(i,u,"utf8"),he.existsSync(n)||he.writeFileSync(n,`<?xml version="1.0" encoding="UTF-8"?>
<Package xmlns="http://soap.sforce.com/2006/04/metadata">
    <version>58.0</version>
</Package>`,"utf8");let l=await H.workspace.openTextDocument(i);await H.window.showTextDocument(l),H.window.showInformationMessage("Ricwiz: destructiveChanges.xml generated successfully!")}catch(r){H.window.showErrorMessage(`Ricwiz: Error generating destructive changes: ${r.message}`)}})}var H,He,he,Bt=z(()=>{"use strict";H=b(require("vscode")),He=b(require("path")),he=b(require("fs"));S();j()});async function Et(){let t=y();if(!t)return;let e=await E.initialize(t,{skipPrompt:!0}),o=e?e.ticketSourceBranch:re.workspace.getConfiguration("ricwiz").get("ticketSourceBranch","main"),s=e?e.upstreamRemote:"origin";await re.window.withProgress({location:re.ProgressLocation.Notification,title:"Ricwiz: Finding Apex Tests to run...",cancellable:!1},async()=>{try{let{stdout:r}=await f(`git diff --name-status ${s}/${o}...HEAD`,{cwd:t}),d=r.split(`
`).map(g=>g.trim()).filter(g=>g.length>0),c=new Set,p=new Set;for(let g of d){let h=g.split(/\s+/);if(h[0].startsWith("D"))continue;let m=h[1];if(m&&m.endsWith(".cls")){let w=m.match(/\/classes\/([^/.]+)\.cls/);if(w){let v=w[1];v.toLowerCase().endsWith("test")?c.add(v):p.add(v)}}}for(let g of p)c.add(`${g}Test`);if(c.size===0){re.window.showInformationMessage("Ricwiz: No Apex Classes were modified in this branch.");return}let u=Array.from(c).map(g=>({label:`$(beaker) ${g}`,description:"Apex Test Class"})),a=await re.window.showQuickPick(u,{canPickMany:!0,title:"Select Test Classes to Run",placeHolder:"Select tests..."});if(!a||a.length===0)return;let n=`sf apex run test -n ${a.map(g=>g.label.replace("$(beaker) ","").trim()).join(",")} -r human -w 30`,l=re.window.createTerminal("Ricwiz: Smart Tests");l.show(),l.sendText(n)}catch(r){re.window.showErrorMessage(`Ricwiz: Error finding tests: ${r.message}`)}})}var re,Tt=z(()=>{"use strict";re=b(require("vscode"));S();j()});var ye,Mt=z(()=>{"use strict";ye=class{static isValidShellArg(e){return e?/^[a-zA-Z0-9\-_/.]+$/.test(e):!1}}});async function Dt(t){let e=y();if(!e){D.window.showErrorMessage("Open a folder or workspace that is a Git repository.");return}let o=await E.initialize(e,{forcePrompt:!0});if(!o)return;let s=typeof t=="string"?t:void 0,r=await G(e,{prefix:o.ticketPrefix,suggestedValue:s});if(!r){D.window.showErrorMessage("Branch creation cancelled: Ticket not provided.");return}let{ticketId:d}=r,c=o.environments,p="all",u=[{label:"Create Main Branch & Environments",description:"Creates the main ticket branch and all environment branches",value:"all"},{label:"Create Main Branch Only",description:"Creates only the main ticket branch (skips environments)",value:"mainOnly"},{label:"Create Environments Only",description:"Creates only the environment branches (skip main branch)",value:"envs"}];if(c.length>0){let l=await D.window.showQuickPick(u,{placeHolder:"Ricwiz: What do you want to create?",ignoreFocusOut:!0});if(!l)return;p=l.value}let a=o.ticketSourceBranch;if(p==="all"||p==="mainOnly"){let l=[];try{let{stdout:w}=await f('git branch --all --format="%(refname:short)"',{cwd:e});l=w.split(`
`).map(v=>v.trim()).filter(v=>v&&v!=="origin"),l=[...new Set(l)]}catch{}let g=D.window.createQuickPick();g.title="Ricwiz: Ticket Source Branch",g.placeholder="Confirm or change the source branch for this ticket",g.value=o.ticketSourceBranch,g.ignoreFocusOut=!0;let h=()=>{let w=g.value.trim(),v=[];w&&v.push({label:w,description:"Use typed branch"}),v.push(...l.map(x=>({label:x}))),g.items=v};g.onDidChangeValue(h),h();let m=await new Promise(w=>{g.onDidAccept(()=>{let v=g.selectedItems[0];w(v?v.label:g.value),g.hide()}),g.onDidHide(()=>w(void 0)),g.show()});if(!m){D.window.showInformationMessage("Branch creation cancelled.");return}a=m.trim()}let i="";if(o.branchPrefix){let l=await D.window.showInputBox({prompt:"Ricwiz: Branch Prefix (leave empty to not use a prefix)",placeHolder:"e.g. CRC-R19-",value:o.branchPrefix,ignoreFocusOut:!0});if(l===void 0){D.window.showInformationMessage("Branch creation cancelled.");return}i=l.trim()}let n=i?`${i}${d}`:d;if(!ye.isValidShellArg(n)){D.window.showErrorMessage(`Invalid format for ticket ID: ${n}`);return}if(!ye.isValidShellArg(a)){D.window.showErrorMessage(`Invalid format for ticketSourceBranch in settings: ${a}`);return}for(let l of c){if(!ye.isValidShellArg(l.name)){D.window.showErrorMessage(`Invalid format for environment name in settings: ${l.name}`);return}if(!ye.isValidShellArg(l.sourceBranch)){D.window.showErrorMessage(`Invalid format for environment sourceBranch in settings: ${l.sourceBranch}`);return}}try{await f("git status",{cwd:e})}catch{D.window.showErrorMessage("The opened folder does not appear to be a valid Git repository.");return}try{await D.window.withProgress({location:D.ProgressLocation.Notification,title:"Ricwiz: Creating Branches",cancellable:!1},async l=>{let g=[];l.report({message:"Checking remote status (git fetch)...",increment:10});try{await f("git fetch",{cwd:e})}catch{}try{if(p==="all"||p==="mainOnly"){if(l.report({message:`Creating main branch ${n}...`,increment:10}),await fe(e,n))D.window.showInformationMessage(`Ricwiz: The branch ${n} already exists. Skipping creation...`),await f(`git checkout ${n}`,{cwd:e});else try{let h=o.getFetchRemote(a),m=o.getFetchBranch(a),w=o.buildUpstreamPath(a);await f(`git fetch ${h} ${m}`,{cwd:e}),await f(`git checkout -b ${n} ${w}`,{cwd:e}),g.push(n)}catch{try{await f(`git checkout -b ${n} ${a}`,{cwd:e}),g.push(n)}catch{throw new Error(`Could not create main branch '${n}' from '${a}'. Does the source branch exist?`)}}try{await f(`git config branch.${n}.ricwiz-source "${a}"`,{cwd:e}),o.profileName&&await f(`git config branch.${n}.ricwiz-profile "${o.profileName}"`,{cwd:e})}catch{}}if(p==="all"||p==="envs"){let h=50/(c.length||1);for(let m of c){let w=i?`${i}${d}-to-${m.name}`:`${d}-to-${m.name}`,v=m.sourceBranch;if(l.report({message:`Processing environment branch ${w}...`,increment:h}),!await fe(e,w))try{let x=o.buildUpstreamPath(v);await f(`git checkout -b ${w} ${x}`,{cwd:e}),g.push(w)}catch{try{await f(`git checkout -b ${w} ${v}`,{cwd:e}),g.push(w)}catch{throw new Error(`Could not create environment branch '${w}' from '${v}'. Does the source branch exist?`)}}}}l.report({message:`Publishing branches to ${o.originRemote}...`,increment:10});for(let h of g)try{await f(`git push -u ${o.originRemote} ${h}`,{cwd:e})}catch{D.window.showWarningMessage(`Ricwiz: Branch ${h} was created locally but could not be pushed to ${o.originRemote}.`)}if(p==="all"||p==="mainOnly"){l.report({message:`Switching to ${n}...`,increment:10});try{await f(`git checkout ${n}`,{cwd:e})}catch{}}l.report({increment:100}),D.window.showInformationMessage("Ricwiz: All set! You can start working on your branches! \u{1F680}")}catch(h){if(D.window.showErrorMessage(`Ricwiz Branch Creation Failed: ${h.message}`),g.length>0){try{await f(`git checkout ${a}`,{cwd:e})}catch{}for(let m of g)try{await f(`git branch -D ${m}`,{cwd:e})}catch{}D.window.showWarningMessage(`Ricwiz: Rolled back (deleted) ${g.length} branch(es) locally due to failure.`)}}})}catch(l){D.window.showErrorMessage(`Ricwiz general error: ${l.message}`)}}var D,At=z(()=>{"use strict";D=b(require("vscode"));S();Mt();j()});async function xe(t,e,o,s){s&&s.report({message:"CONFLICT! Resolve & click 'Commit & Continue' in Ricwiz panel."});let r=!1,d=!1,c=async()=>{try{let{stdout:i}=await f("git status --porcelain",{cwd:t});return i.split(`
`).filter(n=>{let l=n.substring(0,2);return["UD","DU","DD","AU","UA"].includes(l)}).map(n=>n.substring(3).trim())}catch{return[]}},p=async()=>{try{let{stdout:i}=await f("git status --porcelain",{cwd:t}),n=l=>l==="UU"?"Both Modified":l==="UD"?"Deleted by them":l==="DU"?"Deleted by us":l==="DD"?"Both Deleted":l==="AA"?"Both Added":l==="AU"?"Added by us":l==="UA"?"Added by them":"Conflicted";return i.split(`
`).map(l=>l.trimRight()).filter(l=>l.length>2).filter(l=>{let g=l.substring(0,2);return["UU","AA","UD","DU","AU","UA","DD"].includes(g)}).map(l=>{let g=l.substring(0,2);return{file:l.substring(3).trim(),state:n(g)}})}catch{return[]}},u=async()=>{if(r)return;let i=await c(),n=await p(),{webviewProvider:l}=(_e(),O(Ve));l&&l.setConflictState({isConflict:!0,sourceStr:e,targetStr:o,deletionsCount:i.length,files:n})},a=ae.commands.registerCommand("ricwiz.conflictAction",async i=>{if(i==="abortDeploy")d=!0;else if(i==="resolveDeletions"){try{let l=(await c()).map(h=>({label:h})),g=await ae.window.showQuickPick(l,{canPickMany:!0,placeHolder:"Select conflicted files to DELETE",title:"Ricwiz: Delete Conflicted Files"});if(g&&g.length>0){for(let h of g)try{await f(`git rm --force "${h.label}"`,{cwd:t})}catch{}ae.window.showInformationMessage(`Ricwiz: Deleted ${g.length} conflicted file(s).`)}}catch(n){ae.window.showErrorMessage(`Ricwiz: Error. (${n.message})`)}u()}else if(i==="commitAndContinue")try{let l=(await c()).filter(h=>Lt.existsSync(It.join(t,h)));if(l.length>0&&await ae.window.showWarningMessage(`Wait! There are ${l.length} file(s) with deletion conflicts that are still on your disk.

If you commit now, you will KEEP them in the project.

Are you sure you want to KEEP them?`,{modal:!0},"Yes, KEEP them","No, let me DELETE them")!=="Yes, KEEP them"){u();return}let g=!1;try{let{stdout:h}=await f('git grep -E "^<<<<<<< "',{cwd:t});h.trim().length>0&&(g=!0)}catch{}if(g){ae.window.showErrorMessage("Ricwiz: You still have unresolved conflict markers (<<<<<<<) in your files. Please resolve them first!"),u();return}await f("git add .",{cwd:t}),await f("git commit --no-edit",{cwd:t})}catch(n){ae.window.showErrorMessage(`Ricwiz: Could not commit automatically. (${n.message})`),u()}});for(u();;){if(d){r=!0,a.dispose(),(_e(),O(Ve)).webviewProvider?.setConflictState(null);try{await f("git merge --abort",{cwd:t})}catch{}return!1}try{let{stdout:i}=await f("git status --porcelain",{cwd:t});if(i.trim().length===0)return r=!0,a.dispose(),(_e(),O(Ve)).webviewProvider?.setConflictState(null),ae.window.showInformationMessage("Ricwiz: Changes committed!"),!0}catch{}await new Promise(i=>setTimeout(i,2e3))}}var ae,Lt,It,Qe=z(()=>{"use strict";ae=b(require("vscode")),Lt=b(require("fs")),It=b(require("path"));S()});var rt={};De(rt,{fetchMergeRequestStatus:()=>Ke,hasGitlabToken:()=>Ze,ricwizLogger:()=>J});async function Ze(){let t=await st();return!!(t&&t.trim())}async function ri(t,e){let o=Ye.workspace.getConfiguration("ricwiz"),s=(await st())?.trim();if(!s)throw new Error("No GitLab token");let r=e?e.getConfig("gitlabUrlOverride",""):o.get("gitlabUrlOverride",""),d=[];if(r&&r.trim()!=="")d.push(r.trim());else try{let{stdout:p}=await f("git remote",{cwd:t}),u=p.split(`
`).map(i=>i.trim()).filter(i=>i),a=[];e&&e.upstreamRemote&&u.includes(e.upstreamRemote)&&a.push(e.upstreamRemote),e&&e.originRemote&&e.originRemote!==e.upstreamRemote&&u.includes(e.originRemote)&&a.push(e.originRemote),u.includes("upstream")&&!a.includes("upstream")&&a.push("upstream"),u.includes("origin")&&!a.includes("origin")&&a.push("origin"),a.length===0&&u.length>0&&a.push(...u);for(let i of a)try{let{stdout:n}=await f(`git remote get-url ${i}`,{cwd:t}),l=n.trim();l.endsWith(".git")&&(l=l.slice(0,-4)),l.startsWith("git@")&&(l=l.replace("git@","").replace(":","/"),l=`https://${l}`),d.push(l)}catch(n){J.appendLine(`[GitLab API] Error getting remote URL for ${i}: ${n.message}`)}}catch(p){J.appendLine(`[GitLab API] Error getting remotes: ${p.message}`)}if(d.length===0)throw J.appendLine("[GitLab API] No candidate URLs found in getGitlabTargets!"),new Error("Could not get any remote origin URL.");return d.map(p=>{let u=new URL(p),a=`${u.protocol}//${u.host}`,i=u.pathname;i.startsWith("/")&&(i=i.substring(1)),i.endsWith("/")&&(i=i.slice(0,-1)),i.endsWith(".git")&&(i=i.slice(0,-4));let n=encodeURIComponent(i);return{baseUrl:a,token:s,projectPath:n}})}async function Ft(t,e,o,s,r){let d=new URL(`${e}${r}`);return J.appendLine(`[GitLab API] ${s} ${d.toString()}`),new Promise((c,p)=>{let u=Nt.request(d,{method:s,timeout:5e3,headers:{"PRIVATE-TOKEN":o,Accept:"application/json"}},a=>{let i="";a.on("data",n=>i+=n),a.on("end",()=>{if(J.appendLine(`[GitLab API] Response Code: ${a.statusCode}`),a.statusCode&&a.statusCode>=400)return J.appendLine(`[GitLab API] Error Data: ${i}`),p(new Error(`GitLab API error: ${a.statusCode}`));if(!i)return c({});try{let n=JSON.parse(i);Array.isArray(n)?J.appendLine(`[GitLab API] Returned array with ${n.length} items`):n&&typeof n=="object"&&J.appendLine(`[GitLab API] Returned object with id ${n.id||n.iid||"unknown"}`),c(n)}catch(n){J.appendLine(`[GitLab API] Parse Error: ${n.message}`),p(n)}})});u.on("timeout",()=>{u.destroy(),p(new Error("GitLab request timed out"))}),u.on("error",a=>{J.appendLine(`[GitLab API] Request Failed: ${a.message}`),p(a)}),u.end()})}async function Ke(t,e,o,s){J.appendLine(`[GitLab API] fetchMergeRequestStatus called for source: ${e}, target: ${o||"any"}`);let r=`${t}:${e}:${o||"any"}`,d=Ot.get(r);if(d&&Date.now()-d.timestamp<ai)return d.data;try{let c=await ri(t,s);for(let p of c)try{let u=`/api/v4/projects/${p.projectPath}/merge_requests?source_branch=${encodeURIComponent(e)}&order_by=updated_at&sort=desc`;o&&(u+=`&target_branch=${encodeURIComponent(o)}`);let a=await Ft(t,p.baseUrl,p.token,"GET",u);if(a&&a.length>0){let i=a[0];try{let g=await Ft(t,p.baseUrl,p.token,"GET",`/api/v4/projects/${p.projectPath}/merge_requests/${i.iid}`);g&&(i=g)}catch{}let n="none";if(i.head_pipeline&&i.head_pipeline.status){let g=i.head_pipeline.status;g==="success"||g==="failed"||g==="canceled"||g==="skipped"?n=g:n="running"}let l={isMerged:i.state==="merged",isOpen:i.state==="opened",pipelineStatus:n,webUrl:i.web_url};return Ot.set(r,{data:l,timestamp:Date.now()}),l}}catch(u){J.appendLine(`[GitLab API] Error inside target loop: ${u.message}`)}return null}catch(c){return J.appendLine(`[GitLab API] Failed to fetch MR status: ${c.message}`),null}}var Nt,Ye,J,Ot,ai,Xe=z(()=>{"use strict";Nt=b(require("https")),Ye=b(require("vscode"));ze();S();J=Ye.window.createOutputChannel("Ricwiz Debug");Ot=new Map,ai=30*1e3});var ke={};De(ke,{findRelatedBranches:()=>mt,getCurrentBranchMergeStatus:()=>ct,getRecentCommits:()=>dt,getRecentTickets:()=>lt,getRelatedBranchesStatus:()=>at,resolveExistingBranchName:()=>ci});function Ut(t,e){return e.find(o=>t.endsWith(`-to-${o.name}`))}async function at(t,e,o,s,r){let d=await Ze();return await Promise.all(e.map(async p=>{let u=Ut(p,s);if(d){let a=u?u.sourceBranch:void 0,i=await Ke(t,p,a,r);if(i)return{name:p,isMerged:i.isMerged,pipelineStatus:i.pipelineStatus,mrUrl:i.webUrl}}else{let{ricwizLogger:a}=(Xe(),O(rt));a.appendLine(`[GitLab API] Skipping MR check for ${p} because hasGitlabToken() is false`)}return{name:p,isMerged:!1}}))}async function ct(t,e,o,s){let r=Ut(e,o);if(!r)return!1;if(await Ze()){let d=await Ke(t,e,r.sourceBranch,s);if(d)return d.isMerged}else{let{ricwizLogger:d}=(Xe(),O(rt));d.appendLine(`[GitLab API] Skipping MR check for current branch ${e} because hasGitlabToken() is false`)}return!1}async function dt(t,e=10){try{let{stdout:o}=await f(`git log --oneline -${e} --format="%h|||%s|||%ar"`,{cwd:t});return o.split(`
`).filter(s=>s.trim()).map(s=>{let r=s.split("|||");return{hash:r[0]||"",message:r.length>=3?r.slice(1,-1).join("|||"):r[1]||"",timeAgo:r.length>=3?r[r.length-1]:""}})}catch{return[]}}async function lt(t,e=3){try{let{stdout:o}=await f('git for-each-ref --sort=-committerdate --format="%(refname:short)" refs/heads/',{cwd:t}),s=o.split(`
`).map(d=>d.trim()).filter(d=>d),r=/^[A-Z]+-\d+$/i;return s.filter(d=>r.test(d)).slice(0,e)}catch{return[]}}async function mt(t,e,o){let{stdout:s}=await f(`git branch --all --list "*${e}*"`,{cwd:t}),r=new Set,d=new RegExp(`${e}(?!\\d)`,"i");return s.split(`
`).forEach(c=>{let p=c.replace("*","").trim();if(p){if(p.startsWith("remotes/")){let u=p.split("/");u.length>2&&(p=u.slice(2).join("/"))}p&&p!==o&&!p.includes("HEAD")&&d.test(p)&&r.add(p)}}),Array.from(r)}async function ci(t,e,o){try{let s=require("child_process"),d=require("util").promisify(s.exec),{stdout:c}=await d(`git branch --all --list "*${e}*"`,{cwd:t}),p=new RegExp(`${e}(?!\\d)`,"i"),u=c.split(`
`).map(i=>i.replace("*","").trim().replace(/^remotes\/[^\/]+\//,"")).filter(i=>i&&!i.includes("HEAD")&&p.test(i)),a=Array.from(new Set(u));if(o){let i=`-to-${o}`,n=a.find(l=>l.endsWith(i));return n||`${e}${i}`}else{let i=a.find(n=>!n.includes("-to-"));return i||e}}catch{return o?`${e}-to-${o}`:e}}var we=z(()=>{"use strict";S();Xe()});async function jt(){let t=y();if(!t){W.window.showErrorMessage("Ricwiz: Open a folder or workspace that is a Git repository.");return}try{await f("git status",{cwd:t})}catch{W.window.showErrorMessage("Ricwiz: The opened folder does not appear to be a valid Git repository.");return}let e=await E.initialize(t);if(!e)return;let o=e.environments,s=await G(t,{prefix:e.ticketPrefix});if(!s){W.window.showErrorMessage("Operation cancelled: Ticket not provided.");return}let{ticketId:r,currentBranch:d}=s,{resolveExistingBranchName:c}=(we(),O(ke)),p=await c(t,r);if(!await fe(t,p)){W.window.showErrorMessage(`Ricwiz: Main branch '${p}' does not exist! Prepare deploy is only available when a main ticket branch is used.`);return}let u=e.getConfig("defaultReviewers",""),a="";try{let{stdout:i}=await f(`git config branch.${r}.ricwiz-reviewers`,{cwd:t});a=i.trim()}catch{}if(u.trim()){let i=await W.window.showInputBox({prompt:"Ricwiz: Reviewers for this deploy (optional, comma-separated)",placeHolder:"e.g. @joao, 123456",value:a||u,ignoreFocusOut:!0});if(i===void 0)return;try{i.trim()?await f(`git config branch.${r}.ricwiz-reviewers "${i.trim()}"`,{cwd:t}):a&&await f(`git config --unset branch.${r}.ricwiz-reviewers`,{cwd:t})}catch{}}await W.window.withProgress({location:W.ProgressLocation.Notification,title:"Ricwiz: Preparing Deploy",cancellable:!0},async(i,n)=>{let l=0,g=d,h=!1;n.onCancellationRequested(()=>{h=!0}),i.report({message:"Syncing remote information...",increment:10});try{await f("git fetch --all",{cwd:t});let w=10/(o.length||1);for(let v of o)try{if(h)throw new Error("Aborted");i.report({message:`Fetching ${v.sourceBranch}...`,increment:w});let x=e.getFetchRemote(v.sourceBranch),R=e.getFetchBranch(v.sourceBranch);await f(`git fetch ${x} ${R}:${R}`,{cwd:t})}catch{}}catch{}let m=60/(o.length||1);for(let w of o){if(h)break;let v=await c(t,r,w.name),x=w.sourceBranch;try{i.report({message:`Processing ${v}...`,increment:m/4}),await f(`git checkout ${v}`,{cwd:t});try{await f(`git pull ${e.originRemote} ${v}`,{cwd:t})}catch{}let R=async T=>{try{await f(`git merge ${T}`,{cwd:t})}catch(L){let te=!1;try{let{stdout:de}=await f("git ls-files -u",{cwd:t});de.trim().length>0&&(te=!0)}catch{}let _=((L.stdout||"")+(L.stderr||"")+(L.message||"")).toLowerCase();if(te||_.includes("conflict")||_.includes("conflit")){if(!await xe(t,T,v,i))throw h=!0,new Error("Deploy aborted by user.")}else throw L}};i.report({message:`Merging ${x} into ${v}...`,increment:m/4});let B=e.getFetchRemote(x),U=e.getFetchBranch(x),ge=e.buildUpstreamPath(x);if(await f(`git fetch ${B} ${U}`,{cwd:t}),await R(ge),i.report({message:`Merging ${p} into ${v}...`,increment:m/4}),await R(p),h)break;i.report({message:`Pushing ${v}...`,increment:m/4}),await f(`git push ${e.originRemote} ${v}`,{cwd:t}),l++}catch(R){R.message.includes("aborted")?W.window.showInformationMessage("Ricwiz: Deploy cancelled."):W.window.showErrorMessage(`Ricwiz: Failed to process branch ${v}. Detail: ${R.message}`);return}}if(!h){i.report({message:"Finishing up...",increment:10});let w=g;try{await f(`git show-ref --verify --quiet refs/heads/${p}`,{cwd:t}),w=p}catch{}try{let v=await F(t);w&&w!==v?(await f(`git checkout ${w}`,{cwd:t}),W.window.showInformationMessage(`Ricwiz: Operation complete. Back on branch ${w}.`)):W.window.showInformationMessage("Ricwiz: Operation complete.")}catch{W.window.showInformationMessage("Ricwiz: Operation complete.")}}})}var W,Jt=z(()=>{"use strict";W=b(require("vscode"));S();Qe();j()});async function Wt(t=!1){let e=y();if(!e)return;let o=await E.initialize(e);if(!o)return;let s=await G(e,{prompt:"Enter the full ticket ID for the Merge Requests (e.g., SCPSCA-1234) or just the number"});if(!s)return;let{ticketId:r}=s,d=o.getConfig("gitlabUrlOverride",""),c="";if(d&&d.trim()!=="")c=d.trim().replace(/\/+$/,"");else{let i="";try{let n=o.upstreamRemote||"origin",{stdout:l}=await f(`git remote get-url ${n}`,{cwd:e});i=l.trim()}catch{me.window.showErrorMessage("Ricwiz: Could not get the remote origin URL. Please configure the URL manually in the extension settings.");return}c=i,c.endsWith(".git")&&(c=c.slice(0,-4)),c.startsWith("git@")&&(c=c.replace("git@","").replace(":","/"),c=`https://${c}`)}let p=[],u=o.ticketSourceBranch;try{let{stdout:i}=await f(`git config branch.${r}.ricwiz-source`,{cwd:e});i.trim()&&(u=i.trim())}catch{}let{resolveExistingBranchName:a}=(we(),O(ke));if(o.environments.length===0){let i=await a(e,r);p.push({source:i,target:u})}else for(let i of o.environments){let n=await a(e,r,i.name);p.push({source:n,target:i.sourceBranch})}for(let i of p){let n=`${c}/-/merge_requests/new?merge_request[source_branch]=${i.source}&merge_request[target_branch]=${i.target}`;t?me.commands.executeCommand("simpleBrowser.show",n):me.env.openExternal(me.Uri.parse(n))}me.window.showInformationMessage(`Ricwiz: Opening ${t?"VS Code browser":"external browser"} for Merge Requests!`)}async function qt(){return Wt(!1)}async function Gt(){return Wt(!0)}var me,Ht=z(()=>{"use strict";me=b(require("vscode"));S();j()});async function Vt(t=!1){let e=y();if(!e)return;let o=oe.workspace.getConfiguration("ricwiz"),s=o.get("jiraUrl","");if(!s||s.trim()===""){oe.window.showErrorMessage("Ricwiz: Jira URL is not configured. Please set it in the extension settings (e.g., https://jira.company.com/browse/).");return}let{getCurrentBranch:r,resolvePrefix:d,extractTicketSuggestion:c}=(S(),O(Ae)),p=await r(e),u=o.get("ticketPrefix","SFPSCA-"),a=d(p,u),n=c(p,a,!0);if(n){let{normalizeTicketId:g}=(S(),O(Ae));n=g(n,a)}else{let g=await G(e,{prompt:"Ricwiz could not detect the ticket from the branch name. Enter Jira ticket ID (e.g. SFPSCA-1234)",handleToSuffix:!0});if(!g)return;n=g.ticketId}let l=s.trim();l.endsWith("/")||(l+="/"),l+=n,t?oe.commands.executeCommand("simpleBrowser.show",l):oe.env.openExternal(oe.Uri.parse(l)),oe.window.showInformationMessage(`Ricwiz: Opening Jira Ticket ${n} in ${t?"VS Code":"browser"}!`)}async function _t(){return Vt(!1)}async function Qt(){return Vt(!0)}var oe,Yt=z(()=>{"use strict";oe=b(require("vscode"));S()});async function di(){let t=Kt.workspace.getConfiguration("ricwiz"),e=t.get("jiraUrl",""),o=t.get("jiraEmail","")?.trim(),s=(await yt())?.trim();if(!e||!s)throw new Error('Jira API Token is not securely configured. Please run the "Ricwiz: Set Secure Jira API Token" command.');let r=e;r.includes("/browse")&&(r=r.split("/browse")[0]),r.endsWith("/")&&(r=r.slice(0,-1));let d=o?`Basic ${Buffer.from(`${o}:${s}`).toString("base64")}`:`Bearer ${s}`;return{baseUrl:r,headerAuth:d}}async function Ee(t,e,o){let{baseUrl:s,headerAuth:r}=await di(),d=new URL(`${s}${e}`);return new Promise((c,p)=>{let u=Zt.request(d,{method:t,headers:{Authorization:r,Accept:"application/json",...o?{"Content-Type":"application/json"}:{}}},a=>{let i="";a.on("data",n=>i+=n),a.on("end",()=>{if(a.statusCode===401||a.statusCode===403)return p(new Error(`Authentication failed (HTTP ${a.statusCode}). Please check your Jira settings.`));if(a.statusCode&&a.statusCode>=400){let n="";try{let l=JSON.parse(i);l.errorMessages&&l.errorMessages.length>0&&(n=l.errorMessages.join(", "))}catch{}return a.statusCode===404||a.statusCode===410?p(new Error(`Ticket not found or deleted (HTTP ${a.statusCode}). ${n}`)):p(new Error(`Jira API returned HTTP status ${a.statusCode}. ${n}`))}if(!i)return c({});try{let n=JSON.parse(i);c(n)}catch{p(new Error("Failed to parse Jira response."))}})});u.on("error",a=>p(new Error(`Network error: ${a.message}`))),o&&u.write(JSON.stringify(o)),u.end()})}async function Te(t){let e=await Ee("GET",`/rest/api/2/issue/${t}`);return e&&e.fields?{summary:e.fields.summary||"",description:e.fields.description||"No description provided.",status:e.fields.status?.name||"Unknown"}:null}async function Xt(t){let e=await Ee("GET",`/rest/api/2/issue/${t}/transitions`);return e&&e.transitions?e.transitions.map(o=>({id:o.id,name:o.name})):[]}async function eo(t,e){await Ee("POST",`/rest/api/2/issue/${t}/transitions`,{transition:{id:e}})}async function to(t,e){await Ee("POST",`/rest/api/2/issue/${t}/comment`,{body:e})}async function oo(t,e){await Ee("PUT",`/rest/api/2/issue/${t}`,{update:{labels:[{add:e}]}})}async function io(t){let e=await Ee("POST","/rest/api/3/search/jql",{jql:t,maxResults:50,fields:["summary","status","assignee"]});return e&&e.issues?e.issues.map(o=>({key:o.key,summary:o.fields?.summary||"No Title",status:o.fields?.status?.name||"Unknown",assignee:o.fields?.assignee?.displayName||"Unassigned"})):[]}var Zt,Kt,Ie=z(()=>{"use strict";Zt=b(require("https")),Kt=b(require("vscode"));ze()});async function no(t){let e=y();if(e)try{let o=await E.initialize(e);if(!o)return;let s=await F(e),r=Pe(s,o.ticketPrefix),d=Be(s,r,!0);if(d||(d=s.split("-to-")[0]),!d){Q.window.showErrorMessage("Ricwiz: You are not currently on a valid ticket branch.");return}await Q.window.withProgress({location:Q.ProgressLocation.Notification,title:`Fetching details for ${d}...`,cancellable:!1},async c=>{let p=await Te(d);if(p){let u=[];try{let{findRelatedBranches:a,getRelatedBranchesStatus:i}=(we(),O(ke)),n=Q.workspace.getConfiguration("ricwiz").get("environments",[{name:"Qual",sourceBranch:"quality"},{name:"Val",sourceBranch:"validation"},{name:"Prod",sourceBranch:"main"}]),l=await a(e,d,"");u=await i(e,l,d,n)}catch{}t.setJiraData({ticketId:d,relatedBranches:u,...p}),t.setPage("jira")}else Q.window.showErrorMessage("Ricwiz: No data found for this ticket.")})}catch(o){o.message.includes("securely configured")?await Q.window.showErrorMessage(o.message,"Set Token Now")==="Set Token Now"&&Q.commands.executeCommand("ricwiz.setJiraToken"):Q.window.showErrorMessage(`Ricwiz Jira Error: ${o.message}`)}}var Q,so=z(()=>{"use strict";Q=b(require("vscode"));S();j();Ie()});async function ro(t,e){let s=ie.workspace.getConfiguration("ricwiz").get("jiraDashboards",[]);if(e!==void 0&&(Ce=e),!s||s.length===0){t.setDashboardData({queries:[],selectedIndex:0,results:[],error:"No queries defined in settings. Go to Settings > Ricwiz > Jira Dashboards."}),t.setPage("dashboard");return}Ce>=s.length&&(Ce=0);let r=s[Ce];t.setDashboardData({queries:s,selectedIndex:Ce,results:[],error:"\u23F3 Loading tickets..."}),t.setPage("dashboard");try{let d=await io(r.jql),c=ie.workspace.workspaceFolders?.[0]?.uri.fsPath,p=[],u=t.getDashboardShowBranches();if(c)try{let i=require("child_process"),l=require("util").promisify(i.exec),{stdout:g}=await l("git branch",{cwd:c});p=g.split(`
`).map(h=>h.replace("*","").trim()).filter(h=>h)}catch{}let a=[];if(u&&c)try{let{findRelatedBranches:i,getRelatedBranchesStatus:n}=(we(),O(ke)),{WorkflowContext:l}=(j(),O(St)),g=await l.initialize(c,{skipPrompt:!0}),h=g?.environments||ie.workspace.getConfiguration("ricwiz").get("environments",[{name:"Qual",sourceBranch:"quality"},{name:"Val",sourceBranch:"validation"},{name:"Prod",sourceBranch:"main"}]);a=await Promise.all(d.map(async m=>{let w=await i(c,m.key,""),v=await n(c,w,m.key,h,g);return{...m,detailedBranches:v}}))}catch{a=d}else a=d.map(i=>{let n=p.find(l=>l.includes(i.key));return{...i,branch:n||null}});t.setDashboardData({queries:s,selectedIndex:Ce,results:a,error:null}),t.setPage("dashboard")}catch(d){let c=d.message;(c.includes("ENOTFOUND")||c.includes("network"))&&(c="No Internet or Invalid URL"),t.setDashboardData({queries:s,selectedIndex:Ce,results:[],error:c}),t.setPage("dashboard")}}async function ao(t,e){await ie.window.withProgress({location:ie.ProgressLocation.Notification,title:`Fetching details for ${e}...`,cancellable:!1},async()=>{try{let o=await Te(e);if(o){let s=[],r=y();if(r)try{let{findRelatedBranches:d,getRelatedBranchesStatus:c}=(we(),O(ke)),p=ie.workspace.getConfiguration("ricwiz").get("environments",[{name:"Qual",sourceBranch:"quality"},{name:"Val",sourceBranch:"validation"},{name:"Prod",sourceBranch:"main"}]),u=await d(r,e,"");s=await c(r,u,e,p)}catch{}t.setJiraData({ticketId:e,relatedBranches:s,...o}),t.setPage("jira")}else ie.window.showErrorMessage(`Ricwiz: No data found for ticket ${e}.`)}catch(o){ie.window.showErrorMessage(`Ricwiz Jira Error: ${o.message}`)}})}var ie,Ce,co=z(()=>{"use strict";ie=b(require("vscode"));Ie();S();Ce=0});async function pt(){let t=y();if(!t)return;let e=await E.initialize(t,{forcePrompt:!1});if(!e)return;let o=await F(t);if(!o)return;let s=Pe(o,e.ticketPrefix),r=Be(o,s,!0);return r||o.split("-to-")[0]}async function lo(){try{let t=await pt();if(!t){P.window.showErrorMessage("Ricwiz: You are not on a valid ticket branch.");return}let e=await P.window.withProgress({location:P.ProgressLocation.Notification,title:`Fetching available status for ${t}...`,cancellable:!1},()=>Xt(t));if(!e||e.length===0){P.window.showInformationMessage(`Ricwiz: No transitions available for ${t}.`);return}let o=e.map(r=>({label:r.name,id:r.id})),s=await P.window.showQuickPick(o,{placeHolder:`Select new status for ${t}`,ignoreFocusOut:!0});s&&(await P.window.withProgress({location:P.ProgressLocation.Notification,title:`Updating status to ${s.label}...`,cancellable:!1},()=>eo(t,s.id)),P.window.showInformationMessage(`Ricwiz: Status for ${t} updated to ${s.label}.`))}catch(t){t.message.includes("securely configured")?P.window.showErrorMessage(t.message,"Set Token Now").then(e=>{e==="Set Token Now"&&P.commands.executeCommand("ricwiz.setJiraToken")}):P.window.showErrorMessage(`Ricwiz Jira Error: ${t.message}`)}}async function mo(){try{let t=await pt();if(!t){P.window.showErrorMessage("Ricwiz: You are not on a valid ticket branch.");return}let e=await P.window.showInputBox({prompt:`Add comment to ${t}`,placeHolder:"Type your comment here...",ignoreFocusOut:!0});e&&(await P.window.withProgress({location:P.ProgressLocation.Notification,title:`Adding comment to ${t}...`,cancellable:!1},()=>to(t,e)),P.window.showInformationMessage(`Ricwiz: Comment added to ${t}.`))}catch(t){t.message.includes("securely configured")?P.window.showErrorMessage(t.message,"Set Token Now").then(e=>{e==="Set Token Now"&&P.commands.executeCommand("ricwiz.setJiraToken")}):P.window.showErrorMessage(`Ricwiz Jira Error: ${t.message}`)}}async function po(){try{let t=await pt();if(!t){P.window.showErrorMessage("Ricwiz: You are not on a valid ticket branch.");return}let e=await P.window.showInputBox({prompt:`Add a label to ${t}`,placeHolder:"e.g. Needs-Review, Bug, High-Priority",ignoreFocusOut:!0});e&&e.trim()&&(await P.window.withProgress({location:P.ProgressLocation.Notification,title:`Adding label to ${t}...`,cancellable:!1},()=>oo(t,e.trim())),P.window.showInformationMessage(`Ricwiz: Label '${e.trim()}' added to ${t}.`))}catch(t){t.message.includes("securely configured")?P.window.showErrorMessage(t.message,"Set Token Now").then(e=>{e==="Set Token Now"&&P.commands.executeCommand("ricwiz.setJiraToken")}):P.window.showErrorMessage(`Ricwiz Jira Error: ${t.message}`)}}async function uo(){let t=await P.window.showInputBox({prompt:"Enter your Jira API Token (or Personal Access Token). It will be securely stored in your OS keychain.",password:!0,ignoreFocusOut:!0});if(t)try{await bt(t.trim()),P.window.showInformationMessage("Ricwiz: Jira API Token securely stored!")}catch(e){P.window.showErrorMessage(`Ricwiz: Failed to store token: ${e.message}`)}}var P,go=z(()=>{"use strict";P=b(require("vscode"));S();j();Ie();ze()});async function fo(){let t=await V.window.showInputBox({prompt:"Enter your GitLab Personal Access Token",placeHolder:"glpat-xxxxxxxxxxxxxxxxxxxx",ignoreFocusOut:!0,password:!0});if(t&&t.trim()){let e=t.trim();await V.window.withProgress({location:V.ProgressLocation.Notification,title:"Ricwiz: Validating GitLab Token...",cancellable:!1},async()=>{try{let s=V.workspace.getConfiguration("ricwiz").get("gitlabUrlOverride","").trim();if(!s&&V.workspace.workspaceFolders)try{let{exec:u}=(S(),O(Ae)),a=V.workspace.workspaceFolders[0].uri.fsPath,{stdout:i}=await u("git remote get-url origin",{cwd:a}),n=i.trim();n.startsWith("git@")&&(n=`https://${n.replace("git@","").replace(":","/")}`),n.endsWith(".git")&&(n=n.slice(0,-4)),s=n}catch{}s||(s="https://gitlab.com");let r=new URL(s),d=`${r.protocol}//${r.host}`,c=require("https"),p=await new Promise((u,a)=>{let i=c.request(new URL(`${d}/api/v4/user`),{method:"GET",timeout:5e3,headers:{"PRIVATE-TOKEN":e,Accept:"application/json"}},n=>{if(n.statusCode>=400)return a(new Error(`Status ${n.statusCode}`));let l="";n.on("data",g=>l+=g),n.on("end",()=>u(JSON.parse(l||"{}")))});i.on("error",a),i.on("timeout",()=>{i.destroy(),a(new Error("Timeout"))}),i.end()});await xt(e),V.window.showInformationMessage(`Ricwiz: \u2705 GitLab API Token saved and validated successfully for ${p.username||"user"}!`),V.commands.executeCommand("ricwiz.manualRefresh")}catch(o){V.window.showErrorMessage(`Ricwiz: \u274C Invalid token or cannot reach GitLab (${o.message}). Please check the token and try again.`)}})}}var V,ho=z(()=>{"use strict";V=b(require("vscode"));ze()});async function wo(){let t=y();if(!t){pe.window.showErrorMessage("Ricwiz: Open a folder or workspace that is a Git repository.");return}let e=await E.initialize(t);if(!e)return;let o=await G(t,{prefix:e.ticketPrefix,prompt:"Enter the full ticket ID to sync all branches for (e.g., SCPSCA-1234) or just the number"});if(!o)return;let{ticketId:s,currentBranch:r}=o;await pe.window.withProgress({location:pe.ProgressLocation.Notification,title:`Ricwiz: Syncing all branches for ${s}...`,cancellable:!1},async d=>{try{d.report({message:"Fetching from remote..."});try{await f("git fetch --all",{cwd:t})}catch{}let{stdout:c}=await f(`git branch --list "*${s}*"`,{cwd:t}),p=new RegExp(`${s}(?!\\d)`,"i"),u=c.split(`
`).map(n=>n.replace("*","").trim()).filter(n=>n.length>0&&p.test(n));if(u.length===0){pe.window.showWarningMessage(`Ricwiz: No local branches found for ${s}.`);return}let a=0,i=0;for(let n of u)if(d.report({message:`Syncing ${n}...`}),n===r)try{await f(`git pull ${e.originRemote} ${n}`,{cwd:t}),a++}catch(l){let g=!1;try{let{stdout:m}=await f("git ls-files -u",{cwd:t});m.trim().length>0&&(g=!0)}catch{}let h=((l.stdout||"")+(l.stderr||"")+(l.message||"")).toLowerCase();(g||h.includes("conflict")||h.includes("conflit"))&&await xe(t,`${e.originRemote}/${n}`,n,d)?a++:i++}else try{await f(`git fetch ${e.originRemote} ${n}:${n}`,{cwd:t}),a++}catch{try{await f(`git checkout ${n}`,{cwd:t});try{await f(`git pull ${e.originRemote} ${n}`,{cwd:t}),a++}catch(g){let h=!1;try{let{stdout:w}=await f("git ls-files -u",{cwd:t});w.trim().length>0&&(h=!0)}catch{}let m=((g.stdout||"")+(g.stderr||"")+(g.message||"")).toLowerCase();(h||m.includes("conflict")||m.includes("conflit"))&&await xe(t,`${e.originRemote}/${n}`,n,d)?a++:i++}await f(`git checkout ${r}`,{cwd:t})}catch{try{await f(`git checkout ${r}`,{cwd:t})}catch{}i++}}i>0?pe.window.showWarningMessage(`Ricwiz: Synced ${a}/${u.length} branches. ${i} branch(es) could not be synced (possible conflicts or diverged history).`):pe.window.showInformationMessage(`Ricwiz: \u{1F504} All ${a} branches for ${s} are up to date!`)}catch(c){pe.window.showErrorMessage(`Ricwiz: Sync failed: ${c.message}`)}})}var pe,vo=z(()=>{"use strict";pe=b(require("vscode"));S();Qe();j()});async function bo(){let t=y();if(!t){ue.window.showErrorMessage("Ricwiz: Open a folder or workspace that is a Git repository.");return}try{await f("git status",{cwd:t})}catch{ue.window.showErrorMessage("Ricwiz: The opened folder does not appear to be a valid Git repository.");return}let e=await E.initialize(t);if(!e)return;let o=e.environments,s=await G(t,{prefix:e.ticketPrefix});if(!s)return;let{ticketId:r,currentBranch:d}=s;await ue.window.withProgress({location:ue.ProgressLocation.Notification,title:"Ricwiz: Updating environment branches from their bases",cancellable:!0},async(c,p)=>{let u=0,a=d,i=!1;p.onCancellationRequested(()=>{i=!0}),c.report({message:"Syncing remote information...",increment:10});try{await f("git fetch --all",{cwd:t})}catch{}let n=80/(o.length||1);for(let l of o){if(i)break;let{resolveExistingBranchName:g}=(we(),O(ke)),h=await g(t,r,l.name),m=l.sourceBranch;if(await fe(t,h))try{c.report({message:`Processing ${h}...`,increment:n/2}),await f(`git checkout ${h}`,{cwd:t});try{c.report({message:`Merging ${m} into ${h}...`,increment:n/2});let w=e.getFetchRemote(m),v=e.getFetchBranch(m),x=e.buildUpstreamPath(m);await f(`git fetch ${w} ${v}`,{cwd:t}),await f(`git merge ${x}`,{cwd:t})}catch(w){let v=!1;try{let{stdout:R}=await f("git ls-files -u",{cwd:t});R.trim().length>0&&(v=!0)}catch{}let x=((w.stdout||"")+(w.stderr||"")+(w.message||"")).toLowerCase();if(v||x.includes("conflict")||x.includes("conflit")){let R=e.buildUpstreamPath(m);if(!await xe(t,R,h,c))throw i=!0,new Error("Update aborted by user.")}else throw w}if(i)break;u++}catch(w){w.message.includes("aborted")?ue.window.showInformationMessage("Ricwiz: Update cancelled."):ue.window.showErrorMessage(`Ricwiz: Failed to update branch ${h}. Detail: ${w.message}`);return}}if(!i){c.report({message:"Finishing up...",increment:10});try{let l=await F(t);a&&a!==l&&await f(`git checkout ${a}`,{cwd:t})}catch{}ue.window.showInformationMessage(`Ricwiz: Successfully updated ${u} environment branches from their bases!`)}})}var ue,yo=z(()=>{"use strict";ue=b(require("vscode"));S();Qe();j()});async function xo(){let t=y();if(!t){N.window.showErrorMessage("Ricwiz: Open a folder or workspace that is a Git repository.");return}let e=await F(t),o=N.workspace.getConfiguration("ricwiz");await N.window.withProgress({location:N.ProgressLocation.Notification,title:"Ricwiz: Scanning for unused local branches...",cancellable:!1},async()=>{try{await f("git fetch --prune",{cwd:t})}catch{}let s=[];try{let{stdout:n}=await f('git branch --format="%(refname:short)"',{cwd:t});s=n.split(`
`).map(l=>l.trim()).filter(l=>l.length>0)}catch{}if(s.length===0){N.window.showInformationMessage("Ricwiz: No local branches found.");return}let r=[];try{let{stdout:n}=await f('git branch -r --format="%(refname:short)"',{cwd:t});r=n.split(`
`).map(l=>l.trim().replace(/^origin\//,"").replace(/^[^\/]+\//,"")).filter(l=>l.length>0&&!l.includes("HEAD"))}catch{}let d=[];try{let{stdout:n}=await f('git for-each-ref --format="%(refname:short)|||%(upstream:track)" refs/heads/',{cwd:t});d=n.split(`
`).filter(l=>l.includes("[gone]")).map(l=>l.split("|||")[0].trim())}catch{}let c=s.filter(n=>!r.includes(n));if(c.length===0){N.window.showInformationMessage("Ricwiz: Your local repository is totally clean! All local branches exist on the remote.");return}let p=c.map(n=>{let l=d.includes(n),g=n===e,h="Not found on remote";return l&&(h="Deleted on remote [gone]"),g&&(h+=" (Current branch - will checkout main first)"),{label:n,description:h,picked:l&&!g}}),u=await N.window.showQuickPick(p,{canPickMany:!0,placeHolder:"Select local branches to delete",title:"Ricwiz: Delete Unused Branches"});if(!u||u.length===0){N.window.showInformationMessage("Ricwiz: No branches selected for deletion.");return}if(await N.window.showWarningMessage(`Ricwiz: Delete ${u.length} local branch(es)?
This cannot be undone!`,{modal:!0},"Yes, delete them")!=="Yes, delete them"){N.window.showInformationMessage("Ricwiz: Deletion cancelled.");return}let i=0;for(let n of u){let l=n.label;if(l===e){let g=o.get("ticketSourceBranch","main");try{await f(`git checkout ${g}`,{cwd:t}),e=g}catch{N.window.showWarningMessage(`Ricwiz: Could not switch away from ${l}. Skipping.`);continue}}try{await f(`git branch -D ${l}`,{cwd:t}),i++}catch{N.window.showWarningMessage(`Ricwiz: Could not delete local branch ${l}.`)}}N.window.showInformationMessage(`Ricwiz: \u{1F5D1}\uFE0F Cleaned up ${i} unused local branch(es).`)})}var N,ko=z(()=>{"use strict";N=b(require("vscode"));S()});async function Me(t){let e=y();e&&await ne.window.withProgress({location:ne.ProgressLocation.Notification,title:`Ricwiz: Switching to ${t}...`,cancellable:!1},async()=>{try{let o=await F(e),s=!1;try{let{stdout:d}=await f("git status --porcelain",{cwd:e});s=d.trim().length>0}catch{}if(s&&o)try{await f(`git stash push --include-untracked -m "ricwiz-auto:${o}"`,{cwd:e}),ne.window.showInformationMessage(`Ricwiz: \u{1F4E6} Stashed changes from ${o}`)}catch{ne.window.showWarningMessage("Ricwiz: Could not stash changes. Checkout may fail if there are conflicts.")}let r=t;t.includes("/")&&(r=t.split("/").slice(1).join("/"));try{await f(`git checkout ${r}`,{cwd:e})}catch{let c="";if(t.includes("/"))c=t.split("/")[0];else{let{stdout:p}=await f("git branch -r",{cwd:e}),u=p.split(`
`).map(i=>i.trim()).filter(i=>i),a=[];for(let i of u){let n=i.split(" ")[0];n.endsWith(`/${r}`)&&a.push(n.substring(0,n.lastIndexOf("/")))}if(a.length===0){ne.window.showErrorMessage(`Ricwiz: A branch "${r}" n\xE3o existe localmente nem em nenhuma remote!`);return}else if(a.length===1)c=a[0];else{let i=await E.initialize(e);a.includes("origin")?c="origin":i&&a.includes(i.upstreamRemote)?c=i.upstreamRemote:c=a[0]}}try{await f(`git fetch ${c} ${r}`,{cwd:e}),await f(`git checkout -b ${r} --track ${c}/${r}`,{cwd:e})}catch{ne.window.showErrorMessage(`Ricwiz: Encontrou na remote ${c} mas falhou a fazer checkout.`);return}}try{let{stdout:d}=await f("git stash list",{cwd:e}),c=d.split(`
`);for(let p=0;p<c.length;p++)if(c[p].includes(`ricwiz-auto:${r}`)){let u=c[p].match(/stash@\{(\d+)\}/);u&&(await f(`git stash pop stash@{${u[1]}}`,{cwd:e}),ne.window.showInformationMessage(`Ricwiz: \u{1F4E6} Restored stashed changes on ${r}`));break}}catch{ne.window.showWarningMessage(`Ricwiz: Could not restore stashed changes on ${r}. You may need to resolve conflicts manually (check git stash list).`)}}catch{ne.window.showErrorMessage(`Ricwiz: Could not checkout branch ${t}.`)}})}var ne,et=z(()=>{"use strict";ne=b(require("vscode"));S();j()});async function Co(){let t=y();if(t)try{let{stdout:e}=await f("git branch --show-current",{cwd:t}),o=e.trim();o&&(await Fe.env.clipboard.writeText(o),Fe.window.showInformationMessage(`Ricwiz: \u{1F4CB} Copied "${o}" to clipboard`))}catch{Fe.window.showErrorMessage("Ricwiz: Could not get the current branch name.")}}var Fe,$o=z(()=>{"use strict";Fe=b(require("vscode"));S()});async function zo(){let t=y();if(!t){Y.window.showErrorMessage("Ricwiz: Open a folder or workspace that is a Git repository.");return}let e=Y.workspace.getConfiguration("ricwiz"),o=e.get("ticketSourceBranch","main"),r=e.get("packageXmlCommand",'sf sgd source delta --to "HEAD" --from "origin/{baseBranch}" --output-dir "."').replace("{baseBranch}",o);await Y.window.showWarningMessage("Are you sure you want to generate the package.xml? This may overwrite existing local manifest files.",{modal:!0},"Yes, Generate")==="Yes, Generate"&&await Y.window.withProgress({location:Y.ProgressLocation.Notification,title:"Ricwiz: Generating package.xml using Salesforce CLI...",cancellable:!1},async()=>{try{await f(r,{cwd:t,maxBuffer:10*1024*1024}),Y.window.showInformationMessage("Ricwiz: Successfully generated package.xml!");let c=tt.join(t,"package","package.xml"),p=tt.join(t,"package.xml"),u=tt.join(t,"manifest","package.xml");for(let a of[c,p,u])if(Ro.existsSync(a)){let i=await Y.workspace.openTextDocument(a);await Y.window.showTextDocument(i);break}}catch(c){Y.window.showErrorMessage(`Ricwiz: Error running sf command - ${c.message}`)}})}var Y,tt,Ro,So=z(()=>{"use strict";Y=b(require("vscode")),tt=b(require("path")),Ro=b(require("fs"));S()});async function Po(){let t=y();if(!t){Z.window.showErrorMessage("Ricwiz: Open a folder or workspace that is a Git repository.");return}let o=Z.workspace.getConfiguration("ricwiz").get("deployCommand","sf project deploy start --manifest package/package.xml --post-destructive-changes destructiveChanges/destructiveChanges.xml -c -l NoTestRun -g");await Z.window.showWarningMessage("Are you sure you want to deploy to Salesforce? This action modifies your org and cannot be easily undone.",{modal:!0},"Yes, Deploy")==="Yes, Deploy"&&await Z.window.withProgress({location:Z.ProgressLocation.Notification,title:"Ricwiz: Deploying package...",cancellable:!1},async()=>{try{let{stdout:r,stderr:d}=await f(o,{cwd:t,maxBuffer:52428800}),c=Z.window.createOutputChannel("Ricwiz Deploy");c.appendLine(`Executing: ${o}`),c.appendLine(r),d&&(c.appendLine("--- STDERR ---"),c.appendLine(d)),c.show(),Z.window.showInformationMessage("Ricwiz: Successfully ran deploy command!")}catch(r){let d=Z.window.createOutputChannel("Ricwiz Deploy");d.appendLine(`Error executing: ${o}`),r.stdout&&d.appendLine(r.stdout),r.stderr&&d.appendLine(r.stderr),d.appendLine(r.message),d.show(),Z.window.showErrorMessage("Ricwiz: Error running deploy command. See output channel for details.")}})}var Z,Bo=z(()=>{"use strict";Z=b(require("vscode"));S()});async function Eo(){let t=y();if(!t){K.window.showErrorMessage("Ricwiz: Open a folder or workspace that is a Git repository.");return}let o=K.workspace.getConfiguration("ricwiz").get("importDataCommand","sfdx force:data:tree:import --plan data/plan.json");await K.window.showWarningMessage("Are you sure you want to import data into Salesforce? This action modifies records in your org.",{modal:!0},"Yes, Import")==="Yes, Import"&&await K.window.withProgress({location:K.ProgressLocation.Notification,title:"Ricwiz: Importing data...",cancellable:!1},async()=>{try{let{stdout:r,stderr:d}=await f(o,{cwd:t,maxBuffer:52428800}),c=K.window.createOutputChannel("Ricwiz Import Data");c.appendLine(`Executing: ${o}`),c.appendLine(r),d&&(c.appendLine("--- STDERR ---"),c.appendLine(d)),c.show(),K.window.showInformationMessage("Ricwiz: Successfully ran import data command!")}catch(r){let d=K.window.createOutputChannel("Ricwiz Import Data");d.appendLine(`Error executing: ${o}`),r.stdout&&d.appendLine(r.stdout),r.stderr&&d.appendLine(r.stderr),d.appendLine(r.message),d.show(),K.window.showErrorMessage("Ricwiz: Error running import data command. See output channel for details.")}})}var K,To=z(()=>{"use strict";K=b(require("vscode"));S()});async function Mo(){let t=y();if(!t){X.window.showErrorMessage("Ricwiz: Open a folder or workspace that is a Git repository.");return}let e=await E.initialize(t,{skipPrompt:!0}),o=e?e.ticketSourceBranch:X.workspace.getConfiguration("ricwiz").get("ticketSourceBranch","main"),s=e?e.upstreamRemote:"origin",r="";try{r=await F(t)}catch{}let d=await X.window.showInputBox({prompt:`Enter the branch name to list modified files (compared to ${o})`,value:r,placeHolder:"SFPSCA-1234"});d&&await X.window.withProgress({location:X.ProgressLocation.Notification,title:`Ricwiz: Finding files for ${d}...`,cancellable:!1},async()=>{try{let c=d.replace(/-to-[a-zA-Z0-9]+$/i,""),p=[];try{let m="";try{let{stdout:w}=await f(`git merge-base ${s}/${o} ${d}`,{cwd:t});m=w.trim()}catch{let{stdout:v}=await f(`git merge-base ${o} ${d}`,{cwd:t});m=v.trim()}if(m){let{stdout:w}=await f(`git diff --name-only ${m} ${d}`,{cwd:t,maxBuffer:10485760});p=w.split(`
`).map(v=>v.trim()).filter(v=>v.length>0)}}catch{}let u=[];try{let{stdout:m}=await f(`git --no-pager log --grep="\\b${c}\\b" -i -E --name-only -m --first-parent --format=""`,{cwd:t,maxBuffer:10485760});u=m.split(`
`).map(w=>w.trim()).filter(w=>w.length>0)}catch{}let a=[...p,...u];if(a.length===0){X.window.showInformationMessage(`Ricwiz: No modified files found for ${d}.`);return}let i=Array.from(new Set(a)).sort(),n={};for(let m of i){let w=m.match(/default\/([^/]+)/),v=w&&w[1]?w[1].toUpperCase():"OUTROS";n[v]||(n[v]=[]),n[v].push(m)}let l=`Files modified in branch ${d}:
`,g=Object.keys(n).sort();for(let m of g)l+=`
=== ${m} ===
`,l+=n[m].join(`
`)+`
`;let h=await X.workspace.openTextDocument({content:l,language:"plaintext"});await X.window.showTextDocument(h)}catch(c){X.window.showErrorMessage(`Ricwiz: Error running git log - ${c.message}`)}})}var X,Do=z(()=>{"use strict";X=b(require("vscode"));S();j()});async function Ao(){let t=y();if(!t){se.window.showErrorMessage("Ricwiz: Open a folder or workspace that is a Git repository.");return}let o=se.workspace.getConfiguration("ricwiz").get("resetTrackingCommand","sf org disable tracking && sf project reset tracking --no-prompt");await se.window.withProgress({location:se.ProgressLocation.Notification,title:"Ricwiz: Resetting tracking...",cancellable:!1},async()=>{try{let{stdout:s,stderr:r}=await f(o,{cwd:t,maxBuffer:52428800}),d=se.window.createOutputChannel("Ricwiz Reset Tracking");d.appendLine(`Executing: ${o}`),d.appendLine(s),r&&(d.appendLine("--- STDERR ---"),d.appendLine(r)),d.show(),se.window.showInformationMessage("Ricwiz: Successfully reset tracking!")}catch(s){let r=se.window.createOutputChannel("Ricwiz Reset Tracking");r.appendLine(`Error executing: ${o}`),s.stdout&&r.appendLine(s.stdout),s.stderr&&r.appendLine(s.stderr),r.appendLine(s.message),r.show(),se.window.showErrorMessage("Ricwiz: Error resetting tracking. See output channel for details.")}})}var se,Lo=z(()=>{"use strict";se=b(require("vscode"));S()});async function Io(){let t=y();if(!t){ee.window.showErrorMessage("Ricwiz: Open a workspace first.");return}let e=["ApexClass","ApexTrigger","CustomObject","CustomField","LightningComponentBundle","AuraDefinitionBundle","Flow","CustomLabel","CustomMetadata","StaticResource","Profile","PermissionSet","PermissionSetGroup","Layout","ValidationRule","RecordType","ListView","Report","EmailTemplate","Other (Type manually)..."],o=await ee.window.showQuickPick(e,{placeHolder:"Select Metadata Type to extract (e.g., ApexClass)",ignoreFocusOut:!0});if(!o||o==="Other (Type manually)..."&&(o=await ee.window.showInputBox({prompt:"Enter Metadata Type (e.g., CustomApplication, Queue)",ignoreFocusOut:!0}),!o))return;let s={ApexClass:"**/*.cls",ApexTrigger:"**/*.trigger",CustomObject:"**/*.{object,object-meta.xml}",CustomField:"**/*.field-meta.xml",LightningComponentBundle:"**/lwc/*/*.js",AuraDefinitionBundle:"**/aura/*/*.cmp",Flow:"**/*.flow-meta.xml",CustomLabel:"**/*.labels-meta.xml",CustomMetadata:"**/*.md-meta.xml",StaticResource:"**/*.resource-meta.xml",Profile:"**/*.profile-meta.xml",PermissionSet:"**/*.permissionset-meta.xml",PermissionSetGroup:"**/*.permissionsetgroup-meta.xml",Layout:"**/*.layout-meta.xml",ValidationRule:"**/*.validationRule-meta.xml",RecordType:"**/*.recordType-meta.xml",ListView:"**/*.listView-meta.xml"},r=[],d=s[o];if(d)try{r=(await ee.workspace.findFiles(d,"**/node_modules/**")).map(u=>{let a=u.fsPath.split(/[\\/]/).pop()||"";if(o==="LightningComponentBundle"||o==="AuraDefinitionBundle"){let i=u.fsPath.split(/[\\/]/);return i[i.length-2]||a.split(".")[0]}return a.split(".")[0]}),r=[...new Set(r)].sort()}catch{}let c=await new Promise(p=>{let u=ee.window.createQuickPick();u.title=`Extract ${o}`,u.placeholder="Type name (e.g. MyComponent) or * for all",u.ignoreFocusOut=!0,u.matchOnDescription=!0;let a=()=>{let i=u.value.trim(),n=[];i?n.push({label:`$(cloud-download) Extract "${i}"`,description:"Extract exact name from Salesforce",alwaysShow:!0}):n.push({label:'$(cloud-download) Extract "*" (All)',description:`Extract all ${o}s`,alwaysShow:!0}),r.forEach(l=>{(!i||l.toLowerCase().includes(i.toLowerCase()))&&n.push({label:l,description:"Local workspace component"})}),u.items=n};u.onDidChangeValue(()=>a()),u.onDidAccept(()=>{let i=u.selectedItems[0];if(i){let n=i.label;n.startsWith('$(cloud-download) Extract "')?n=n.replace('$(cloud-download) Extract "',"").replace('" (All)',"").replace('"',""):n==='$(cloud-download) Extract "*" (All)'&&(n="*"),u.hide(),p(n)}}),u.onDidHide(()=>{u.dispose(),p(void 0)}),a(),u.show()});c&&await ee.window.withProgress({location:ee.ProgressLocation.Notification,title:`Ricwiz: Extracting ${o}:${c} from Salesforce...`,cancellable:!0},async(p,u)=>{try{I.show(!0);let a=`${o}:${c}`,{stdout:i,stderr:n}=await f(`sf project retrieve start -m "${a}"`,{cwd:t});i&&I.appendLine(i),n&&I.appendLine(n),ee.window.showInformationMessage(`Ricwiz: Successfully extracted ${a}.`)}catch(a){I.appendLine(`ERROR: ${a.message}`),a.stdout&&I.appendLine(a.stdout),a.stderr&&I.appendLine(a.stderr),ee.window.showErrorMessage("Ricwiz: Extraction failed. See Output channel for details.")}})}var ee,Fo=z(()=>{"use strict";ee=b(require("vscode"));S()});async function No(){let t=q.window.activeTextEditor;if(!t){q.window.showErrorMessage("Ricwiz: Please open the file you want to deploy in the editor first.");return}let e=t.document.uri.fsPath,o=y();if(!o)return;let s="";if(await q.window.withProgress({location:q.ProgressLocation.Notification,title:"Ricwiz: Fetching available Salesforce orgs...",cancellable:!1},async()=>{try{let{stdout:u}=await f("sf org list --json",{cwd:o});s=u}catch(u){s=u.stdout||""}}),!s){q.window.showErrorMessage("Ricwiz: Failed to fetch orgs. Is Salesforce CLI installed?");return}let r=[];try{let u=JSON.parse(s),a=u.result?.nonScratchOrgs||[],i=u.result?.scratchOrgs||[];r=[...a,...i]}catch{q.window.showErrorMessage("Ricwiz: Failed to parse org list.");return}if(r.length===0){q.window.showInformationMessage("Ricwiz: No authenticated orgs found.");return}let d=r.map(u=>({label:u.alias||u.username,description:u.alias?u.username:"",picked:u.isDefaultUsername})),c=await q.window.showQuickPick(d,{placeHolder:"Select the org(s) to deploy this file to",canPickMany:!0,ignoreFocusOut:!0});if(!c||c.length===0)return;let p=Oo.basename(e);await q.window.withProgress({location:q.ProgressLocation.Notification,title:`Ricwiz: Deploying ${p} to ${c.length} org(s)...`,cancellable:!1},async()=>{I.show(!0),I.appendLine(`--- Starting Parallel Deploy of ${p} ---`);let u=c.map(async l=>{let g=l.label;I.appendLine(`[${g}] Deploying...`);try{let{stdout:h,stderr:m}=await f(`sf project deploy start -d "${e}" -o "${g}"`,{cwd:o});return I.appendLine(`[${g}] \u2705 Success`),h&&I.appendLine(h),{org:g,success:!0}}catch(h){return I.appendLine(`[${g}] \u274C Failed`),h.stdout&&I.appendLine(h.stdout),h.stderr&&I.appendLine(h.stderr),{org:g,success:!1}}}),a=await Promise.all(u),i=a.filter(l=>l.success).length,n=a.filter(l=>!l.success).length;n===0?q.window.showInformationMessage(`Ricwiz: Successfully deployed to all ${i} orgs!`):q.window.showErrorMessage(`Ricwiz: Deploy finished with errors (${i} success, ${n} failed). Check Output channel.`)})}var q,Oo,Uo=z(()=>{"use strict";q=b(require("vscode")),Oo=b(require("path"));S()});async function jo(){let t=y();if(!t){A.window.showErrorMessage("Ricwiz: Open a folder or workspace that is a Git repository.");return}let e=A.workspace.getConfiguration("ricwiz"),o=e.get("auditUsername",""),s=e.get("auditHours",8),r=await A.window.showInputBox({prompt:"Enter your Salesforce Username to query in SetupAuditTrail",value:o,placeHolder:"admin@tuaorg.com"});if(!r)return;let d=await A.window.showInputBox({prompt:"How many hours back do you want to search?",value:s.toString(),placeHolder:"8"});if(!d)return;let c=parseFloat(d);if(isNaN(c)||c<=0){A.window.showErrorMessage("Ricwiz: Invalid hours specified.");return}let p=new Date(Date.now()-c*60*60*1e3).toISOString(),a=`sf data query -q "${`SELECT Action, Display, Section FROM SetupAuditTrail WHERE CreatedBy.Username = '${r}' AND CreatedDate >= ${p}`}" --json`;await A.window.withProgress({location:A.ProgressLocation.Notification,title:"Ricwiz: Interrogating Setup Audit Trail...",cancellable:!1},async()=>{try{let{stdout:i}=await f(a,{cwd:t,maxBuffer:52428800}),n=JSON.parse(i);if(!n.result||n.result.records.length===0){A.window.showInformationMessage(`Ricwiz: No changes found for ${r} in the last ${c} hours.`);return}let l=n.result.records,g=[],h=new Set;for(let T of l){let L=li(T.Action,T.Display,T.Section);if(L){let te=`${L.isDelete?"DEL":"ADD"}-${L.metadataFormat}`;if(!h.has(te)){h.add(te);let _=L.isDelete?"$(trash)":"$(plus)";g.push({label:`${_} ${L.metadataFormat}`,description:`${T.Action} -> ${T.Display}`,metadataFormat:L.metadataFormat,isDelete:L.isDelete})}}}if(g.length===0){A.window.showInformationMessage(`Ricwiz: No extractable metadata changes found for ${r} in the last ${c} hours (ignored passwords/logins).`);return}let m=await A.window.showQuickPick(g,{canPickMany:!0,placeHolder:"Select the changes you want to extract to GitLab",ignoreFocusOut:!0});if(!m||m.length===0){A.window.showInformationMessage("Ricwiz: No changes selected.");return}let w=m.filter(T=>T.isDelete),v=m.filter(T=>!T.isDelete),x=A.window.createOutputChannel("Ricwiz Admin Bridge");if(x.show(),w.length>0){let{stdout:T}=await f("git ls-files",{cwd:t}),L=T.split(`
`).map(_=>_.trim()),te=0;for(let _ of w){let de=_.metadataFormat.split(":"),je=de[0],Je=de[1],ve=Je;je==="CustomField"&&(ve=Je.split(".")[1]);let nt=L.filter(Re=>{let M=it.basename(Re);return M.startsWith(ve+".")&&M.includes(je==="CustomField"?".field":"")});for(let Re of nt){let M=it.join(t,Re);ot.existsSync(M)&&(ot.unlinkSync(M),x.appendLine(`Deleted local file: ${Re}`),te++)}}A.window.showInformationMessage(`Ricwiz: Deleted ${te} local files from Git workspace.`)}if(v.length===0)return;let R=v.map(T=>T.metadataFormat).filter(T=>T!=="").join(", "),B=await A.window.showInputBox({prompt:"Review and adjust the metadata components to retrieve",value:R,ignoreFocusOut:!0});if(!B)return;let U=`sf project retrieve start -m "${B}"`;x.appendLine(`Executing: ${U}`),A.window.showInformationMessage(`Ricwiz: Extracting ${v.length} components...`);let ge=await f(U,{cwd:t});x.appendLine(ge.stdout),ge.stderr&&(x.appendLine("--- STDERR ---"),x.appendLine(ge.stderr)),A.window.showInformationMessage("Ricwiz: Changes extracted successfully! Ready for Git Commit.")}catch(i){A.window.showErrorMessage(`Ricwiz: Error capturing changes - ${i.message}`)}})}function li(t,e,o){if(!t||!e||!o)return null;let s=t.toLowerCase(),r=o.toLowerCase();if(["security controls","network access","session settings","data export","login history","password policies","identity verification","delegated administration"].includes(r)||s.includes("login")||s.includes("password")||s.includes("oauth")||s.includes("session"))return null;let c=s.includes("delete"),p=null;if(s==="permissionsetgroupcomponentadd"||s==="permissionsetgroupcomponentdelete")return null;let u=(a,i=!1)=>{let n=a.replace(/\(.*\)/g,"").trim();n.includes(":")&&!s.includes("calculation")&&(n=n.split(":")[0]);let l=["disabled","deleted","removed","created","changed","updated","from","to","on","assigned","assign","assignment","permission","set","group","apex","class","trigger","custom","field","object","layout","validation","rule","flow","profile"],g=n.split(/\s+/);if(i){for(;g.length>0&&l.includes(g[g.length-1].toLowerCase());)g.pop();for(;g.length>0&&l.includes(g[0].toLowerCase());)g.shift();return g.join(" ").trim().replace(/[^a-zA-Z0-9_ ]/g,"")}else return g.filter(w=>!l.includes(w.toLowerCase())).join("_").replace(/[^a-zA-Z0-9_]/g,"")||n.replace(/\s+/g,"")};if(s.includes("profile"))p=`Profile:${u(e,!0)}`;else if(s.includes("permissionsetgroupcalculation")){let a=e.split(":");p=`PermissionSetGroup:${a.length>1?a[a.length-1].trim():u(e,!1)}`}else if(s.includes("permission set group")||s.includes("permissionsetgroup"))p=`PermissionSetGroup:${u(e,!1)}`;else if(s.includes("permission set")||s.includes("permissionset"))p=`PermissionSet:${u(e,!1)}`;else if(s.includes("apexclass"))p=`ApexClass:${u(e,!1)}`;else if(s.includes("apextrigger")||s.includes("apex trigger"))p=`ApexTrigger:${u(e,!1)}`;else if(s.includes("customfield")){let a=e.match(/([A-Za-z0-9_]+__c)/),i=e.match(/(?:on|na|for)\s+([A-Za-z0-9_]+)/i);a&&i?p=`CustomField:${i[1]}.${a[1]}`:p=`CustomField:${u(e,!1)}`}else if(s.includes("layout"))p=`Layout:${u(e,!0)}`;else if(s.includes("validation"))p=`ValidationRule:${u(e,!1)}`;else if(s.includes("flow"))p=`Flow:${u(e,!1)}`;else if(s.includes("customobject")){let a=e.match(/([A-Za-z0-9_]+__c)/);p=a?`CustomObject:${a[1]}`:`CustomObject:${u(e,!1)}`}else if(!s.includes("created")&&!s.includes("changed")&&!s.includes("deleted"))return null;return p?{metadataFormat:p,isDelete:c}:null}var A,ot,it,Jo=z(()=>{"use strict";A=b(require("vscode")),ot=b(require("fs")),it=b(require("path"));S()});async function Wo(){let t=y();if(t)try{let{stdout:e}=await f('git for-each-ref --sort=-committerdate --format="%(refname:short)|||%(committerdate:relative)|||%(subject)" refs/heads/',{cwd:t}),o=e.split(`
`).filter(r=>r.trim()).map(r=>{let d=r.split("|||");return{label:`$(git-branch) ${d[0]}`,description:d[1],detail:d[2],branchName:d[0]}}),s=await ut.window.showQuickPick(o,{placeHolder:"Select a branch from history to checkout",matchOnDescription:!0,matchOnDetail:!0});s&&await Me(s.branchName)}catch{ut.window.showErrorMessage("Ricwiz: Failed to get branch history")}}var ut,qo=z(()=>{"use strict";ut=b(require("vscode"));S();et()});async function Go(){let t=y();if(!t)return;let e=await Oe.window.showInputBox({prompt:"Enter ticket number or name (e.g., 48934)",placeHolder:"48934"});if(e)try{let{stdout:o}=await f(`git branch --list "*${e}*"`,{cwd:t}),s=o.split(`
`).map(c=>c.replace("*","").trim()).filter(c=>c);if(s.length===0){Oe.window.showInformationMessage(`Ricwiz: No branches found matching "${e}"`);return}let r=s.map(c=>({label:`$(git-branch) ${c}`,branchName:c})),d=await Oe.window.showQuickPick(r,{placeHolder:`Select a branch for ${e}`});d&&await Me(d.branchName)}catch{Oe.window.showErrorMessage("Ricwiz: Failed to search branches")}}var Oe,Ho=z(()=>{"use strict";Oe=b(require("vscode"));S();et()});async function _o(){let t=$e.window.activeTextEditor;if(!t)return $e.window.showErrorMessage("Ricwiz: Please open a file in the editor to check blame."),null;let e=t.document.fileName,o=Vo.basename(e),s=y();if(!s)return $e.window.showErrorMessage("Ricwiz: Workspace is not a git repository."),null;let r=[];try{let{stdout:i}=await f(`git log -5 --pretty=format:"%an|%ar|%s|%h" -- "${e}"`,{cwd:s}),n=i.trim().split(`
`);for(let l of n){let g=l.split("|");g.length>=4&&r.push({author:g[0],time:g[1],message:g.slice(2,-1).join("|"),hash:g[g.length-1]})}}catch(i){console.error("Git blame error:",i)}let d="Unknown",c="Unknown",p="Unknown",u=[],a=mi(e);if(a)try{await $e.window.withProgress({location:$e.ProgressLocation.Notification,title:`Ricwiz: Analyzing ${a.name} in Salesforce...`,cancellable:!1},async()=>{let i="";if(a.type==="CustomField"){let n=a.name.split(".");n.length===2&&(i=`SELECT LastModifiedBy.Name, LastModifiedDate, CreatedBy.Name FROM CustomField WHERE DeveloperName = '${n[1].replace("__c","")}' AND TableEnumOrId = '${n[0]}'`)}else a.type==="LightningComponentBundle"?i=`SELECT LastModifiedBy.Name, LastModifiedDate, CreatedBy.Name FROM LightningComponentBundle WHERE DeveloperName = '${a.name}'`:i=`SELECT LastModifiedBy.Name, LastModifiedDate, CreatedBy.Name FROM ${a.type} WHERE Name = '${a.name}'`;if(i)try{let{stdout:n}=await f(`sf data query -t -q "${i}" --json`,{cwd:s,maxBuffer:52428800}),l=JSON.parse(n);if(l&&l.result&&l.result.records&&l.result.records.length>0){let g=l.result.records[0];d=g.LastModifiedBy?g.LastModifiedBy.Name:"Unknown",p=g.CreatedBy?g.CreatedBy.Name:"Unknown",c=new Date(g.LastModifiedDate).toLocaleString()}else d="Not found in Org",c="N/A",p="N/A"}catch{d="Query Error",c="N/A",p="N/A"}try{let n="SELECT Action, Display, CreatedBy.Name, CreatedDate FROM SetupAuditTrail ORDER BY CreatedDate DESC LIMIT 1500",{stdout:l}=await f(`sf data query -q "${n}" --json`,{cwd:s,maxBuffer:52428800}),g=JSON.parse(l);if(g&&g.result&&g.result.records){let h=a.name.replace("__c","");u=g.result.records.filter(w=>w.Display&&w.Display.includes(h)).map(w=>({action:w.Action,display:w.Display,author:w.CreatedBy?w.CreatedBy.Name:"Unknown",time:new Date(w.CreatedDate).toLocaleString()})).slice(0,10)}}catch(n){console.error("Audit trail query error:",n)}})}catch(i){console.error("Salesforce query error:",i)}else d="Unsupported Metadata Type",c="N/A";return{fileName:o,gitHistory:r,sfAuthor:d,sfTime:c,sfCreatedBy:p,auditHistory:u}}function mi(t){let e=t.replace(/\\/g,"/");if(e.includes("/classes/")){let o=e.match(/\/classes\/([^/.]+)\.cls/);if(o)return{type:"ApexClass",name:o[1]}}if(e.includes("/triggers/")){let o=e.match(/\/triggers\/([^/.]+)\.trigger/);if(o)return{type:"ApexTrigger",name:o[1]}}if(e.includes("/lwc/")){let o=e.match(/\/lwc\/([^/]+)\//);if(o)return{type:"LightningComponentBundle",name:o[1]}}if(e.includes("/aura/")){let o=e.match(/\/aura\/([^/]+)\//);if(o)return{type:"AuraDefinitionBundle",name:o[1]}}if(e.includes("/objects/")&&e.includes("/fields/")){let o=e.match(/\/objects\/([^/]+)\//),s=e.match(/\/fields\/([^/.]+)\.field/);if(o&&s)return{type:"CustomField",name:`${o[1]}.${s[1]}`}}return null}var $e,Vo,Qo=z(()=>{"use strict";$e=b(require("vscode")),Vo=b(require("path"));S()});function Yo(t,e,o){t.subscriptions.push(C.commands.registerCommand("ricwiz.generateDestructiveChanges",Pt),C.commands.registerCommand("ricwiz.runSmartTests",Et),C.commands.registerCommand("ricwiz.refreshWebview",()=>{e&&C.commands.executeCommand("workbench.action.webview.reloadWebviewAction")}),C.commands.registerCommand("ricwiz.createBranches",Dt),C.commands.registerCommand("ricwiz.prepareDeploy",jt),C.commands.registerCommand("ricwiz.createMergeRequests",qt),C.commands.registerCommand("ricwiz.createMergeRequestsVSCode",Gt),C.commands.registerCommand("ricwiz.openJiraTicket",_t),C.commands.registerCommand("ricwiz.openJiraTicketVSCode",Qt),C.commands.registerCommand("ricwiz.showJiraDetails",()=>{e&&no(e)}),C.commands.registerCommand("ricwiz.openJiraDashboard",s=>{e&&ro(e,s)}),C.commands.registerCommand("ricwiz.openJiraDetailsForId",s=>{e&&ao(e,s)}),C.commands.registerCommand("ricwiz.toggleDashboardBranches",s=>{e&&(e.setDashboardShowBranches(s),C.commands.executeCommand("ricwiz.openJiraDashboard"))}),C.commands.registerCommand("ricwiz.changeJiraStatus",lo),C.commands.registerCommand("ricwiz.addJiraComment",mo),C.commands.registerCommand("ricwiz.addJiraLabel",po),C.commands.registerCommand("ricwiz.setJiraToken",uo),C.commands.registerCommand("ricwiz.setGitlabToken",fo),C.commands.registerCommand("ricwiz.syncAll",wo),C.commands.registerCommand("ricwiz.updateBases",bo),C.commands.registerCommand("ricwiz.deleteUnusedBranches",xo),C.commands.registerCommand("ricwiz.checkoutBranch",Me),C.commands.registerCommand("ricwiz.copyBranchName",Co),C.commands.registerCommand("ricwiz.generatePackageXml",zo),C.commands.registerCommand("ricwiz.deployPackage",Po),C.commands.registerCommand("ricwiz.importData",Eo),C.commands.registerCommand("ricwiz.listTicketFiles",Mo),C.commands.registerCommand("ricwiz.resetTracking",Ao),C.commands.registerCommand("ricwiz.extractComponent",Io),C.commands.registerCommand("ricwiz.deployMultiOrg",No),C.commands.registerCommand("ricwiz.captureAdminChanges",jo),C.commands.registerCommand("ricwiz.openHistory",Wo),C.commands.registerCommand("ricwiz.searchTicket",Go),C.commands.registerCommand("ricwiz.whoToBlame",async()=>{let s=await _o();s&&e&&(e.setBlameData(s),e.setPage("blame"))}),C.commands.registerCommand("ricwiz.manualRefresh",()=>{o&&o()}),C.commands.registerCommand("ricwiz.toggleAutoRefresh",()=>{if(e){let s=!e.isAutoRefreshEnabled();e.setAutoRefresh(s),C.workspace.getConfiguration("ricwiz").update("autoRefresh",s,C.ConfigurationTarget.Global)}}),C.commands.registerCommand("ricwiz.openSettings",()=>{C.commands.executeCommand("workbench.action.openSettings","ricwiz")}))}var C,Zo=z(()=>{"use strict";C=b(require("vscode"));Bt();Tt();At();Jt();Ht();Yt();so();co();go();ho();vo();yo();ko();et();$o();So();Bo();To();Do();Lo();Fo();Uo();Jo();qo();Ho();Qo()});function Ko(t,e,o){let s,r=ce.workspace.getConfiguration("ricwiz").get("autoRefresh",!0);e?.setAutoRefresh(r),t.subscriptions.push(ce.workspace.onDidChangeConfiguration(c=>{if(c.affectsConfiguration("ricwiz.autoRefresh")){let p=ce.workspace.getConfiguration("ricwiz").get("autoRefresh",!0);e?.setAutoRefresh(p)}}));async function d(){let c=ce.extensions.getExtension("vscode.git");if(c){let a=function(i){let n="",l;async function g(){let m=ce.workspace.workspaceFolders;if(!m)return;let w=m[0].uri.fsPath,v=await F(w);if(v&&v!==n){n=v;let x=ce.workspace.getConfiguration("ricwiz"),R=x.get("ticketPrefix","SFPSCA-");if(!v.includes(R)){let M=v.match(/([A-Z]+-)\d+/i);M&&(R=M[1].toUpperCase())}let B=[],U=[],ge=[],T=[],L=await E.initialize(w,{skipPrompt:!0}),te=L?.environments||x.get("environments",[{name:"Qual",sourceBranch:"quality"},{name:"Val",sourceBranch:"validation"},{name:"Prod",sourceBranch:"main"}]);try{let M=x.get("workspaceCheckoutButtons",["main","quality","validation"]);ge=Array.from(new Set(M))}catch{}let _="",de=v.match(new RegExp(`(${R}\\d+(?:-\\d+)?)`,"i"));if(de){let M=de[1].toUpperCase();_=M;let be=x.get("commitMessageSuffix","- "),gt=/^[A-Z]+-\d+(?:-\d+)?\s*(?:-\s*|:\s*|\s+)?/i;gt.test(i.inputBox.value)?i.inputBox.value.toUpperCase().startsWith(M)||(i.inputBox.value=i.inputBox.value.replace(gt,`${M}${be}`)):i.inputBox.value=`${M}${be}`+i.inputBox.value,o.text=`$(bookmark) ${M}`,o.tooltip=`Branch: ${v}
Click to open Jira ticket`,o.show();try{let ft=await mt(w,M,"");B=await at(w,ft,M,te,L)}catch{}}else{o.hide();try{T=await lt(w)}catch{}}let[je,Je,ve]=await Promise.all([dt(w,10),ct(w,v,te,L),_?Te(_).catch(M=>{let be=M.message;return(be.includes("ENOTFOUND")||be.includes("network"))&&(be="No Internet or Invalid URL"),{summary:`\u26A0\uFE0F Jira Error: ${be}`,description:"",status:""}}):Promise.resolve(null)]);U=je;let nt=ve?ve.summary:"",Re=ve&&ve.status||"";e?.updateBranch(v,Je,B,U,ge,T,nt,Re)}}function h(){e?.isAutoRefreshEnabled()&&(l&&clearTimeout(l),l=setTimeout(()=>{n="",g()},300))}s=()=>{n="",g()},g(),i.state.onDidChange(()=>h()),ce.window.onDidChangeWindowState(m=>{m.focused&&h()})};var p=a;c.isActive||await c.activate();let u=c.exports.getAPI(1);u.repositories.length>0&&u.repositories.forEach(i=>a(i)),u.onDidOpenRepository(i=>a(i))}}return d(),()=>{s&&s()}}var ce,Xo=z(()=>{"use strict";ce=b(require("vscode"));S();we();Ie();j()});var Ve={};De(Ve,{activate:()=>pi,deactivate:()=>ui,webviewProvider:()=>Ne});module.exports=O(Ve);function pi(t){vt(t),Ne=new qe(t.extensionUri),t.subscriptions.push(Ue.window.registerWebviewViewProvider("ricwiz-webview",Ne));let e=Ue.window.createStatusBarItem(Ue.StatusBarAlignment.Left,100);e.command="ricwiz.openJiraTicket",t.subscriptions.push(e);let o=Ko(t,Ne,e);Yo(t,Ne,o)}function ui(){}var Ue,Ne,_e=z(()=>{Ue=b(require("vscode"));wt();ze();Zo();Xo()});_e();0&&(module.exports={activate,deactivate,webviewProvider});
