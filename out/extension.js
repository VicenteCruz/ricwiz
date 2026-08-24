"use strict";var Zo=Object.create;var je=Object.defineProperty;var Ko=Object.getOwnPropertyDescriptor;var Xo=Object.getOwnPropertyNames;var ei=Object.getPrototypeOf,ti=Object.prototype.hasOwnProperty;var R=(t,e,o)=>()=>{if(o)throw o[0];try{return t&&(e=t(t=0)),e}catch(n){throw o=[n],n}};var Je=(t,e)=>{for(var o in e)je(t,o,{get:e[o],enumerable:!0})},pt=(t,e,o,n)=>{if(e&&typeof e=="object"||typeof e=="function")for(let s of Xo(e))!ti.call(t,s)&&s!==o&&je(t,s,{get:()=>e[s],enumerable:!(n=Ko(e,s))||n.enumerable});return t};var y=(t,e,o)=>(o=t!=null?Zo(ei(t)):{},pt(e||!t||!t.__esModule?je(o,"default",{value:t,enumerable:!0}):o,t)),U=t=>pt(je({},"__esModule",{value:!0}),t);function $(t){return t.replace(/&/g,"&amp;").replace(/</g,"&lt;").replace(/>/g,"&gt;").replace(/"/g,"&quot;").replace(/'/g,"&#39;")}var k,We,ut=R(()=>{"use strict";k=y(require("vscode"));We=class{constructor(e){this._extensionUri=e}_extensionUri;webviewView;resolveWebviewView(e,o,n){this.webviewView=e,e.webview.options={enableScripts:!0,localResourceRoots:[this._extensionUri]},this.updateBranch("",!1),e.webview.onDidReceiveMessage(s=>{switch(s.command){case"createBranches":k.commands.executeCommand("ricwiz.createBranches");break;case"createBranchForTicket":k.commands.executeCommand("ricwiz.createBranches",s.args);break;case"prepareDeploy":k.commands.executeCommand("ricwiz.prepareDeploy");break;case"openMRs":k.commands.executeCommand("ricwiz.createMergeRequests");break;case"openMRsVSCode":k.commands.executeCommand("ricwiz.createMergeRequestsVSCode");break;case"openExternal":s.args&&k.env.openExternal(k.Uri.parse(s.args));break;case"openJira":k.commands.executeCommand("ricwiz.openJiraTicket");break;case"showJiraDetails":k.commands.executeCommand("ricwiz.showJiraDetails");break;case"changeJiraStatus":k.commands.executeCommand("ricwiz.changeJiraStatus");break;case"addJiraComment":k.commands.executeCommand("ricwiz.addJiraComment");break;case"addJiraLabel":k.commands.executeCommand("ricwiz.addJiraLabel");break;case"setPage":this.setPage(s.args);break;case"openDashboard":k.commands.executeCommand("ricwiz.openJiraDashboard");break;case"openJiraDetailsForId":k.commands.executeCommand("ricwiz.openJiraDetailsForId",s.args);break;case"refreshDashboard":k.commands.executeCommand("ricwiz.openJiraDashboard");break;case"switchDashboardQuery":k.commands.executeCommand("ricwiz.openJiraDashboard",parseInt(s.args));break;case"toggleDashboardBranches":k.commands.executeCommand("ricwiz.toggleDashboardBranches",s.args);break;case"openJiraVSCode":k.commands.executeCommand("ricwiz.openJiraTicketVSCode");break;case"openSettings":k.commands.executeCommand("ricwiz.openSettings");break;case"checkout":s.branch&&k.commands.executeCommand("ricwiz.checkoutBranch",s.branch);break;case"copyBranch":k.commands.executeCommand("ricwiz.copyBranchName");break;case"generatePackageXml":k.commands.executeCommand("ricwiz.generatePackageXml");break;case"openDevTools":this.setPage("devtools");break;case"openMain":this.setPage("main");break;case"generateDestructiveChanges":k.commands.executeCommand("ricwiz.generateDestructiveChanges");break;case"deployPackage":k.commands.executeCommand("ricwiz.deployPackage");break;case"runSmartTests":k.commands.executeCommand("ricwiz.runSmartTests");break;case"importData":k.commands.executeCommand("ricwiz.importData");break;case"listTicketFiles":k.commands.executeCommand("ricwiz.listTicketFiles");break;case"resetTracking":k.commands.executeCommand("ricwiz.resetTracking");break;case"extractComponent":k.commands.executeCommand("ricwiz.extractComponent");break;case"deployMultiOrg":k.commands.executeCommand("ricwiz.deployMultiOrg");break;case"captureAdminChanges":k.commands.executeCommand("ricwiz.captureAdminChanges");break;case"whoToBlame":k.commands.executeCommand("ricwiz.whoToBlame");break;case"syncAll":k.commands.executeCommand("ricwiz.syncAll");break;case"updateBases":k.commands.executeCommand("ricwiz.updateBases");break;case"deleteUnused":k.commands.executeCommand("ricwiz.deleteUnusedBranches");break;case"conflict_commitAndContinue":k.commands.executeCommand("ricwiz.conflictAction","commitAndContinue");break;case"conflict_resolveDeletions":k.commands.executeCommand("ricwiz.conflictAction","resolveDeletions");break;case"conflict_abortDeploy":k.commands.executeCommand("ricwiz.conflictAction","abortDeploy");break;case"openFile":if(s.file){let l=k.workspace.workspaceFolders;if(l){let c=k.Uri.joinPath(l[0].uri,s.file);k.commands.executeCommand("vscode.open",c)}}break;case"searchTicket":k.commands.executeCommand("ricwiz.searchTicket");break;case"manualRefresh":k.commands.executeCommand("ricwiz.manualRefresh");break;case"toggleAutoRefresh":k.commands.executeCommand("ricwiz.toggleAutoRefresh");break;case"openHistory":k.commands.executeCommand("ricwiz.openHistory");break}})}conflictState=null;setConflictState(e){this.conflictState=e,this.updateView()}updateBranch(e,o,n=[],s=[],l=[],c=[],u="",p=""){this.webviewView&&(this.currentBranchCache=e,this.currentBranchIsMergedCache=o,this.relatedBranchesCache=n,this.commitsCache=s,this.baseBranchesCache=l,this.recentTicketsCache=c,this.ticketTitleCache=u,this.ticketStatusCache=p,this.updateView())}currentBranchCache="";currentBranchIsMergedCache=!1;relatedBranchesCache=[];commitsCache=[];baseBranchesCache=[];recentTicketsCache=[];ticketTitleCache="";ticketStatusCache="";currentPage="main";blameDataCache=null;jiraDataCache=null;dashboardDataCache=null;dashboardShowBranches=!1;autoRefreshEnabled=!0;setDashboardShowBranches(e){this.dashboardShowBranches=e}getDashboardShowBranches(){return this.dashboardShowBranches}setBlameData(e){this.blameDataCache=e}setJiraData(e){this.jiraDataCache=e}setDashboardData(e){this.dashboardDataCache=e}setAutoRefresh(e){this.autoRefreshEnabled=e,this.updateView()}isAutoRefreshEnabled(){return this.autoRefreshEnabled}setPage(e){this.currentPage=e,this.updateView()}updateView(){if(!this.webviewView)return;let e=this.webviewView.webview.asWebviewUri(k.Uri.joinPath(this._extensionUri,"resources","logo.png"));this.webviewView.webview.html=this._getHtmlForWebview(e,this.currentBranchCache,this.relatedBranchesCache,this.commitsCache,this.baseBranchesCache,this.recentTicketsCache,this.currentPage)}_getHtmlForWebview(e,o,n,s,l,c,u){let p=s.length>0?`
            <div class="separator"></div>
            <div style="padding: 0 4px;">
                <div style="font-size: 11px; opacity: 0.7; margin-bottom: 6px; display: flex; align-items: center; gap: 4px;">
                    <span>\u{1F4DC}</span> Recent Commits
                </div>
                <div style="display: flex; flex-direction: column; gap: 2px;">
                    ${s.map(f=>`
                        <div style="font-size: 11px; padding: 3px 4px; border-radius: 2px; display: flex; gap: 6px; align-items: baseline;">
                            <code style="color: var(--vscode-textLink-foreground); font-size: 10px; flex-shrink: 0;">${$(f.hash)}</code>
                            <span style="flex: 1; overflow: hidden; text-overflow: ellipsis; white-space: nowrap;" title="${$(f.message)}">${$(f.message)}</span>
                            <span style="font-size: 9px; opacity: 0.5; flex-shrink: 0;">${$(f.timeAgo)}</span>
                        </div>
                    `).join("")}
                </div>
            </div>
        `:"",d=`
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
                ${d}
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
                ${d}
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
            </html>`}if(u==="jira"){let f=this.jiraDataCache,w=f?.ticketId||"Jira",v=f?.summary||"No Title",x=f?.description||"No description provided.",z=f?.relatedBranches||[];return`<!DOCTYPE html>
            <html lang="en">
            <head>
                <meta charset="UTF-8">
                <meta name="viewport" content="width=device-width, initial-scale=1.0">
                <title>Ricwiz Jira Details</title>
                ${d}
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
                    
                    ${z.length>0?`
                        <div style="margin-top: 16px; border-top: 1px solid var(--vscode-panel-border); padding-top: 12px;">
                            <div style="font-size: 11px; opacity: 0.7; margin-bottom: 8px; text-transform: uppercase; font-weight: bold;"><span class="icon">\u{1F33F}</span> Related Branches & MRs</div>
                            <div style="display: flex; flex-direction: column; gap: 4px;">
                                ${z.map(B=>{let N="";return B.pipelineStatus==="running"?N="\u23F3":B.pipelineStatus==="success"?N="\u2705":B.pipelineStatus==="failed"?N="\u274C":B.pipelineStatus==="canceled"?N="\u{1F6D1}":B.pipelineStatus==="skipped"&&(N="\u23ED\uFE0F"),`
                                    <div class="btn" style="padding: 6px 10px; font-size: 12px; display: flex; justify-content: space-between; align-items: center; background-color: var(--vscode-button-secondaryBackground); color: var(--vscode-button-secondaryForeground); border-radius: 4px;" onclick="sendCheckoutCommand('${$(B.name)}')" title="Checkout ${$(B.name)}">
                                        <div style="display: flex; align-items: center; gap: 6px; overflow: hidden;">
                                            <span style="overflow: hidden; text-overflow: ellipsis; white-space: nowrap; font-weight: bold;">${$(B.name)}</span>
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
            </html>`}if(u==="dashboard"){let f=this.dashboardDataCache||{queries:[],selectedIndex:0,results:[],error:null},w=f.queries.map((x,z)=>`
                <option value="${z}" ${z===f.selectedIndex?"selected":""}>${$(x.name)}</option>
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
                                        ${x.detailedBranches.map(z=>{let B="";return z.pipelineStatus==="running"?B="\u23F3":z.pipelineStatus==="success"?B="\u2705":z.pipelineStatus==="failed"?B="\u274C":z.pipelineStatus==="canceled"?B="\u{1F6D1}":z.pipelineStatus==="skipped"&&(B="\u23ED\uFE0F"),`
                                            <div style="display: flex; justify-content: space-between; align-items: center; font-size: 10px; background: var(--vscode-editor-background); padding: 2px 6px; border-radius: 3px;">
                                                <div style="display: flex; align-items: center; gap: 6px; overflow: hidden; cursor: pointer; flex: 1;" onclick="sendCheckoutCommand('${$(z.name)}')" title="Checkout ${$(z.name)}">
                                                    <span style="overflow: hidden; text-overflow: ellipsis; white-space: nowrap;">${$(z.name)}</span>
                                                    ${B?`<span title="Pipeline: ${z.pipelineStatus}">${B}</span>`:""}
                                                </div>
                                                <div style="display: flex; gap: 6px; align-items: center;">
                                                    ${z.mrUrl?`<span onclick="event.stopPropagation(); sendCommand('openExternal', '${z.mrUrl}');" title="Open Merge Request" style="cursor: pointer;">\u{1F517}</span>`:""}
                                                    ${z.isMerged?'<span style="background-color: var(--vscode-charts-green); color: white; border-radius: 3px; padding: 1px 4px; font-size: 8px; font-weight: bold;">MERGED</span>':""}
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
                ${d}
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
                ${d}
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
            </html>`;let i=n.find(f=>f.name===o),a="";i&&(i.pipelineStatus==="running"?a="\u23F3":i.pipelineStatus==="success"?a="\u2705":i.pipelineStatus==="failed"?a="\u274C":i.pipelineStatus==="canceled"?a="\u{1F6D1}":i.pipelineStatus==="skipped"&&(a="\u23ED\uFE0F"));let r=i?i.mrUrl:void 0,m=n.filter(f=>f.name!==o),g=o?`<div style="background-color: var(--vscode-editor-inactiveSelectionBackground); padding: 10px; border-radius: 6px; margin-bottom: 16px; border: 1px solid var(--vscode-panel-border); box-shadow: 0 2px 4px rgba(0,0,0,0.1); position: relative;">
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
                        ${a?`<span title="Pipeline: ${i.pipelineStatus}" style="font-size: 12px;">${a}</span>`:""}
                        ${r?`<span onclick="event.stopPropagation(); sendCommand('openExternal', '${r}');" title="Open Merge Request" style="cursor: pointer; font-size: 12px;">\u{1F517}</span>`:""}
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
                    `:c.length>0?`
                        <div style="margin-top: 10px; border-top: 1px solid var(--vscode-panel-border); padding-top: 10px;">
                            <div style="font-size: 10px; opacity: 0.7; margin-bottom: 6px; text-transform: uppercase; text-align: center;">Recent Tickets</div>
                            <div style="display: flex; flex-direction: column; gap: 4px;">
                                ${c.map(f=>`
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
            ${d}
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


            ${l.length>0?`
                <div style="display: flex; gap: 4px; margin-bottom: 16px; flex-wrap: wrap; justify-content: center;">
                    ${l.map(f=>`
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
        </html>`}}});function gt(t){de=t.secrets}async function ft(t){if(!de)throw new Error("SecretStorage is not initialized.");await de.store("ricwiz.jiraApiToken",t)}async function ht(){if(!de)throw new Error("SecretStorage is not initialized.");return await de.get("ricwiz.jiraApiToken")}async function wt(t){if(!de)throw new Error("SecretStorage is not initialized.");await de.store("ricwiz.gitlabApiToken",t)}async function et(){if(!de)throw new Error("SecretStorage is not initialized.");return await de.get("ricwiz.gitlabApiToken")}var de,ze=R(()=>{"use strict"});var Me={};Je(Me,{checkBranchExists:()=>ge,exec:()=>h,extractTicketSuggestion:()=>Pe,getCurrentBranch:()=>F,getWorkspaceCwd:()=>b,normalizeTicketId:()=>bt,promptForTicketId:()=>W,resolvePrefix:()=>Se,ricwizLogger:()=>L});function b(){let t=Re.workspace.workspaceFolders;if(t)return t[0].uri.fsPath}async function F(t){try{let{stdout:e}=await h("git branch --show-current",{cwd:t});return e.trim()}catch{return""}}function Se(t,e){if(!t.includes(e)){let o=t.match(/([A-Z]+-)\d+/i);if(o)return o[1].toUpperCase()}return e}function Pe(t,e,o=!1){let n=t.match(new RegExp(`(${e}\\d+)`,"i"));return n?n[1].toUpperCase():t.includes(e)&&!t.includes("-to-")?t.substring(t.indexOf(e)):o&&t.includes("-to-")?t.substring(t.indexOf(e)).split("-to-")[0]:""}function bt(t,e){let o=t.trim();return/^\d/.test(o)?`${e}${o}`.toUpperCase():o.toUpperCase()}async function W(t,e){let o=Re.workspace.getConfiguration("ricwiz"),n=e?.prefix??o.get("ticketPrefix","SFPSCA-"),s=await F(t),l=Se(s,n),c=e?.suggestedValue??Pe(s,l,e?.handleToSuffix),u=await Re.window.showInputBox({prompt:e?.prompt||"Enter the full ticket ID (e.g., SCPSCA-1234) or just the number",placeHolder:e?.placeHolder||"Ticket ID or number",value:c});return u?{ticketId:bt(u,l),currentBranch:s,prefix:l}:void 0}async function ge(t,e){try{return await h(`git show-ref --verify --quiet refs/heads/${e}`,{cwd:t}),!0}catch{}try{return await h(`git show-ref --verify --quiet refs/remotes/origin/${e}`,{cwd:t}),!0}catch{}return!1}var Re,vt,yt,oi,L,h,S=R(()=>{"use strict";Re=y(require("vscode")),vt=y(require("child_process")),yt=y(require("util")),oi=yt.promisify(vt.exec),L=Re.window.createOutputChannel("Ricwiz"),h=async(t,e)=>{L.appendLine(`[EXEC] ${t}`);let o=await oi(t,{maxBuffer:50*1024*1024,...e});return{stdout:o.stdout.toString(),stderr:o.stderr.toString()}}});async function xt(){let t=b();if(!t){q.window.showErrorMessage("Ricwiz: Open a workspace that is a Git repository.");return}let o=q.workspace.getConfiguration("ricwiz").get("ticketSourceBranch","main");await q.window.withProgress({location:q.ProgressLocation.Notification,title:`Ricwiz: Finding deleted files compared to origin/${o}...`,cancellable:!1},async()=>{try{let{stdout:n}=await h(`git diff --name-only --diff-filter=D origin/${o}...HEAD`,{cwd:t}),s=n.split(`
`).map(r=>r.trim()).filter(r=>r.length>0);if(s.length===0){q.window.showInformationMessage(`Ricwiz: No deleted files found compared to origin/${o}.`);return}let l={},c=(r,m)=>{l[r]||(l[r]=[]),l[r].includes(m)||l[r].push(m)};for(let r of s){let m=r.replace(/\\/g,"/");if(m.includes("/classes/")){let g=m.match(/\/classes\/([^/.]+)\.cls/);g&&c("ApexClass",g[1])}else if(m.includes("/triggers/")){let g=m.match(/\/triggers\/([^/.]+)\.trigger/);g&&c("ApexTrigger",g[1])}else if(m.includes("/lwc/")){let g=m.match(/\/lwc\/([^/]+)\//);g&&c("LightningComponentBundle",g[1])}else if(m.includes("/aura/")){let g=m.match(/\/aura\/([^/]+)\//);g&&c("AuraDefinitionBundle",g[1])}else if(m.includes("/objects/")&&m.includes("/fields/")){let g=m.match(/\/objects\/([^/]+)\//),f=m.match(/\/fields\/([^/.]+)\.field/);g&&f&&c("CustomField",`${g[1]}.${f[1]}`)}else if(m.includes("/objects/")){let g=m.match(/\/objects\/([^/.]+)\.object/);g&&c("CustomObject",g[1])}else if(m.includes("/layouts/")){let g=m.match(/\/layouts\/([^/.]+)\.layout/);g&&c("Layout",g[1])}else if(m.includes("/flows/")){let g=m.match(/\/flows\/([^/.]+)\.flow/);g&&c("Flow",g[1])}else if(m.includes("/permissionsets/")){let g=m.match(/\/permissionsets\/([^/.]+)\.permissionset/);g&&c("PermissionSet",g[1])}else if(m.includes("/profiles/")){let g=m.match(/\/profiles\/([^/.]+)\.profile/);g&&c("Profile",g[1])}else if(m.includes("/customMetadata/")){let g=m.match(/\/customMetadata\/([^/.]+)\.md/);g&&c("CustomMetadata",g[1])}else if(m.includes("/flexipages/")){let g=m.match(/\/flexipages\/([^/.]+)\.flexipage/);g&&c("FlexiPage",g[1])}}if(Object.keys(l).length===0){q.window.showInformationMessage("Ricwiz: Found deleted files in Git, but none mapped to recognizable Salesforce metadata.");return}let u=`<?xml version="1.0" encoding="UTF-8"?>
<Package xmlns="http://soap.sforce.com/2006/04/metadata">
`;for(let r of Object.keys(l).sort()){u+=`    <types>
`;for(let m of l[r].sort())u+=`        <members>${m}</members>
`;u+=`        <name>${r}</name>
    </types>
`}u+=`    <version>58.0</version>
</Package>`;let p=qe.join(t,"destructiveChanges");fe.existsSync(p)||fe.mkdirSync(p);let d=qe.join(p,"destructiveChanges.xml"),i=qe.join(p,"package.xml");fe.writeFileSync(d,u,"utf8"),fe.existsSync(i)||fe.writeFileSync(i,`<?xml version="1.0" encoding="UTF-8"?>
<Package xmlns="http://soap.sforce.com/2006/04/metadata">
    <version>58.0</version>
</Package>`,"utf8");let a=await q.workspace.openTextDocument(d);await q.window.showTextDocument(a),q.window.showInformationMessage("Ricwiz: destructiveChanges.xml generated successfully!")}catch(n){q.window.showErrorMessage(`Ricwiz: Error generating destructive changes: ${n.message}`)}})}var q,qe,fe,kt=R(()=>{"use strict";q=y(require("vscode")),qe=y(require("path")),fe=y(require("fs"));S()});async function Ct(){let t=b();if(!t)return;let o=se.workspace.getConfiguration("ricwiz").get("ticketSourceBranch","main");await se.window.withProgress({location:se.ProgressLocation.Notification,title:"Ricwiz: Finding Apex Tests to run...",cancellable:!1},async()=>{try{let{stdout:n}=await h(`git diff --name-status origin/${o}...HEAD`,{cwd:t}),s=n.split(`
`).map(r=>r.trim()).filter(r=>r.length>0),l=new Set,c=new Set;for(let r of s){let m=r.split(/\s+/);if(m[0].startsWith("D"))continue;let g=m[1];if(g&&g.endsWith(".cls")){let f=g.match(/\/classes\/([^/.]+)\.cls/);if(f){let w=f[1];w.toLowerCase().endsWith("test")?l.add(w):c.add(w)}}}for(let r of c)l.add(`${r}Test`);if(l.size===0){se.window.showInformationMessage("Ricwiz: No Apex Classes were modified in this branch.");return}let u=Array.from(l).map(r=>({label:`$(beaker) ${r}`,description:"Apex Test Class"})),p=await se.window.showQuickPick(u,{canPickMany:!0,title:"Select Test Classes to Run",placeHolder:"Select tests..."});if(!p||p.length===0)return;let i=`sf apex run test -n ${p.map(r=>r.label.replace("$(beaker) ","").trim()).join(",")} -r human -w 30`,a=se.window.createTerminal("Ricwiz: Smart Tests");a.show(),a.sendText(i)}catch(n){se.window.showErrorMessage(`Ricwiz: Error finding tests: ${n.message}`)}})}var se,$t=R(()=>{"use strict";se=y(require("vscode"));S()});var ye,zt=R(()=>{"use strict";ye=class{static isValidShellArg(e){return e?/^[a-zA-Z0-9\-_/.]+$/.test(e):!1}}});var St={};Je(St,{WorkflowContext:()=>D});var De,Rt,Ge,D,ee=R(()=>{"use strict";De=y(require("vscode")),Rt=y(require("path")),Ge=y(require("fs")),D=class t{style;upstreamRemote;originRemote;ticketSourceBranch;ticketPrefix;branchPrefix;environments;static baseConfig=De.workspace.getConfiguration("ricwiz");activeProfile;profileName;constructor(e){this.activeProfile=e,this.profileName=e?.name;let o=t.baseConfig;this.style=e?.workflowStyle||o.get("workflowStyle","standard"),this.style==="multi-remote"?(this.upstreamRemote=e?.upstreamRemote||o.get("upstreamRemote","salesforce-master"),this.originRemote=e?.originRemote||o.get("originRemote","origin")):(this.upstreamRemote="origin",this.originRemote="origin"),this.ticketSourceBranch=e?.ticketSourceBranch||o.get("ticketSourceBranch","main"),this.ticketPrefix=e?.ticketPrefix||o.get("ticketPrefix","SFPSCA-"),this.branchPrefix=e?.branchPrefix??o.get("branchPrefix","");let n=[{name:"Qual",sourceBranch:"quality"},{name:"Val",sourceBranch:"validation"},{name:"Prod",sourceBranch:"main"}];this.environments=e?.environments||o.get("environments",n)}getConfig(e,o){return this.activeProfile&&this.activeProfile[e]!==void 0?this.activeProfile[e]:t.baseConfig.get(e,o)}static async initialize(e,o){let n=t.baseConfig.get("profiles",[]),s=Rt.join(e,"ricwiz.json");if(Ge.existsSync(s))try{let l=Ge.readFileSync(s,"utf-8"),c=JSON.parse(l);c&&Array.isArray(c.profiles)&&(n=[...n,...c.profiles])}catch(l){De.window.showErrorMessage(`Ricwiz: Error parsing ricwiz.json: ${l.message}`)}if(n.length>0){if(!o?.forcePrompt)try{let{exec:p}=(S(),U(Me)),{stdout:d}=await p("git branch --show-current",{cwd:e}),i=d.trim(),a=i;i.includes("-to-")&&(a=i.split("-to-")[0]);let{stdout:r}=await p(`git config branch.${a}.ricwiz-profile`,{cwd:e}),m=r.trim();if(m){let g=n.find(f=>f.name===m);if(g)return new t(g)}}catch{}if(o?.skipPrompt)return new t;let l=n.map(p=>p.name),c=await De.window.showQuickPick(l,{placeHolder:"Ricwiz: Select Workflow Profile",ignoreFocusOut:!0});if(!c)return;let u=n.find(p=>p.name===c);return new t(u)}return new t}buildUpstreamPath(e){return e.includes("/")?e:`${this.upstreamRemote}/${e}`}getFetchRemote(e){return e.includes("/")?e.split("/")[0]:this.upstreamRemote}getFetchBranch(e){return e.includes("/")?e.substring(e.indexOf("/")+1):e}}});async function Pt(t){let e=b();if(!e){M.window.showErrorMessage("Open a folder or workspace that is a Git repository.");return}let o=await D.initialize(e,{forcePrompt:!0});if(!o)return;let n=typeof t=="string"?t:void 0,s=await W(e,{prefix:o.ticketPrefix,suggestedValue:n});if(!s){M.window.showErrorMessage("Branch creation cancelled: Ticket not provided.");return}let{ticketId:l}=s,c=o.environments,u="all",p=[{label:"Create Main Branch & Environments",description:"Creates the main ticket branch and all environment branches",value:"all"},{label:"Create Main Branch Only",description:"Creates only the main ticket branch (skips environments)",value:"mainOnly"},{label:"Create Environments Only",description:"Creates only the environment branches (skip main branch)",value:"envs"}];if(c.length>0){let r=await M.window.showQuickPick(p,{placeHolder:"Ricwiz: What do you want to create?",ignoreFocusOut:!0});if(!r)return;u=r.value}let d=o.ticketSourceBranch;if(u==="all"||u==="mainOnly"){let r=[];try{let{stdout:w}=await h('git branch --all --format="%(refname:short)"',{cwd:e});r=w.split(`
`).map(v=>v.trim()).filter(v=>v&&v!=="origin"),r=[...new Set(r)]}catch{}let m=M.window.createQuickPick();m.title="Ricwiz: Ticket Source Branch",m.placeholder="Confirm or change the source branch for this ticket",m.value=o.ticketSourceBranch,m.ignoreFocusOut=!0;let g=()=>{let w=m.value.trim(),v=[];w&&v.push({label:w,description:"Use typed branch"}),v.push(...r.map(x=>({label:x}))),m.items=v};m.onDidChangeValue(g),g();let f=await new Promise(w=>{m.onDidAccept(()=>{let v=m.selectedItems[0];w(v?v.label:m.value),m.hide()}),m.onDidHide(()=>w(void 0)),m.show()});if(!f){M.window.showInformationMessage("Branch creation cancelled.");return}d=f.trim()}let i="";if(o.branchPrefix){let r=await M.window.showInputBox({prompt:"Ricwiz: Branch Prefix (leave empty to not use a prefix)",placeHolder:"e.g. CRC-R19-",value:o.branchPrefix,ignoreFocusOut:!0});if(r===void 0){M.window.showInformationMessage("Branch creation cancelled.");return}i=r.trim()}let a=i?`${i}${l}`:l;if(!ye.isValidShellArg(a)){M.window.showErrorMessage(`Invalid format for ticket ID: ${a}`);return}if(!ye.isValidShellArg(d)){M.window.showErrorMessage(`Invalid format for ticketSourceBranch in settings: ${d}`);return}for(let r of c){if(!ye.isValidShellArg(r.name)){M.window.showErrorMessage(`Invalid format for environment name in settings: ${r.name}`);return}if(!ye.isValidShellArg(r.sourceBranch)){M.window.showErrorMessage(`Invalid format for environment sourceBranch in settings: ${r.sourceBranch}`);return}}try{await h("git status",{cwd:e})}catch{M.window.showErrorMessage("The opened folder does not appear to be a valid Git repository.");return}try{await M.window.withProgress({location:M.ProgressLocation.Notification,title:"Ricwiz: Creating Branches",cancellable:!1},async r=>{let m=[];r.report({message:"Checking remote status (git fetch)...",increment:10});try{await h("git fetch",{cwd:e})}catch{}try{if(u==="all"||u==="mainOnly"){if(r.report({message:`Creating main branch ${a}...`,increment:10}),await ge(e,a))M.window.showInformationMessage(`Ricwiz: The branch ${a} already exists. Skipping creation...`),await h(`git checkout ${a}`,{cwd:e});else try{let g=o.getFetchRemote(d),f=o.getFetchBranch(d),w=o.buildUpstreamPath(d);await h(`git fetch ${g} ${f}`,{cwd:e}),await h(`git checkout -b ${a} ${w}`,{cwd:e}),m.push(a)}catch{try{await h(`git checkout -b ${a} ${d}`,{cwd:e}),m.push(a)}catch{throw new Error(`Could not create main branch '${a}' from '${d}'. Does the source branch exist?`)}}try{await h(`git config branch.${a}.ricwiz-source "${d}"`,{cwd:e}),o.profileName&&await h(`git config branch.${a}.ricwiz-profile "${o.profileName}"`,{cwd:e})}catch{}}if(u==="all"||u==="envs"){let g=50/(c.length||1);for(let f of c){let w=i?`${i}${l}-to-${f.name}`:`${l}-to-${f.name}`,v=f.sourceBranch;if(r.report({message:`Processing environment branch ${w}...`,increment:g}),!await ge(e,w))try{let x=o.buildUpstreamPath(v);await h(`git checkout -b ${w} ${x}`,{cwd:e}),m.push(w)}catch{try{await h(`git checkout -b ${w} ${v}`,{cwd:e}),m.push(w)}catch{throw new Error(`Could not create environment branch '${w}' from '${v}'. Does the source branch exist?`)}}}}r.report({message:`Publishing branches to ${o.originRemote}...`,increment:10});for(let g of m)try{await h(`git push -u ${o.originRemote} ${g}`,{cwd:e})}catch{M.window.showWarningMessage(`Ricwiz: Branch ${g} was created locally but could not be pushed to ${o.originRemote}.`)}if(u==="all"||u==="mainOnly"){r.report({message:`Switching to ${a}...`,increment:10});try{await h(`git checkout ${a}`,{cwd:e})}catch{}}r.report({increment:100}),M.window.showInformationMessage("Ricwiz: All set! You can start working on your branches! \u{1F680}")}catch(g){if(M.window.showErrorMessage(`Ricwiz Branch Creation Failed: ${g.message}`),m.length>0){try{await h(`git checkout ${d}`,{cwd:e})}catch{}for(let f of m)try{await h(`git branch -D ${f}`,{cwd:e})}catch{}M.window.showWarningMessage(`Ricwiz: Rolled back (deleted) ${m.length} branch(es) locally due to failure.`)}}})}catch(r){M.window.showErrorMessage(`Ricwiz general error: ${r.message}`)}}var M,Bt=R(()=>{"use strict";M=y(require("vscode"));S();zt();ee()});async function be(t,e,o,n){n&&n.report({message:"CONFLICT! Resolve & click 'Commit & Continue' in Ricwiz panel."});let s=!1,l=!1,c=async()=>{try{let{stdout:i}=await h("git status --porcelain",{cwd:t});return i.split(`
`).filter(a=>{let r=a.substring(0,2);return["UD","DU","DD","AU","UA"].includes(r)}).map(a=>a.substring(3).trim())}catch{return[]}},u=async()=>{try{let{stdout:i}=await h("git status --porcelain",{cwd:t}),a=r=>r==="UU"?"Both Modified":r==="UD"?"Deleted by them":r==="DU"?"Deleted by us":r==="DD"?"Both Deleted":r==="AA"?"Both Added":r==="AU"?"Added by us":r==="UA"?"Added by them":"Conflicted";return i.split(`
`).map(r=>r.trimRight()).filter(r=>r.length>2).filter(r=>{let m=r.substring(0,2);return["UU","AA","UD","DU","AU","UA","DD"].includes(m)}).map(r=>{let m=r.substring(0,2);return{file:r.substring(3).trim(),state:a(m)}})}catch{return[]}},p=async()=>{if(s)return;let i=await c(),a=await u(),{webviewProvider:r}=(Ve(),U(He));r&&r.setConflictState({isConflict:!0,sourceStr:e,targetStr:o,deletionsCount:i.length,files:a})},d=re.commands.registerCommand("ricwiz.conflictAction",async i=>{if(i==="abortDeploy")l=!0;else if(i==="resolveDeletions"){try{let r=(await c()).map(g=>({label:g})),m=await re.window.showQuickPick(r,{canPickMany:!0,placeHolder:"Select conflicted files to DELETE",title:"Ricwiz: Delete Conflicted Files"});if(m&&m.length>0){for(let g of m)try{await h(`git rm --force "${g.label}"`,{cwd:t})}catch{}re.window.showInformationMessage(`Ricwiz: Deleted ${m.length} conflicted file(s).`)}}catch(a){re.window.showErrorMessage(`Ricwiz: Error. (${a.message})`)}p()}else if(i==="commitAndContinue")try{let r=(await c()).filter(g=>Et.existsSync(Tt.join(t,g)));if(r.length>0&&await re.window.showWarningMessage(`Wait! There are ${r.length} file(s) with deletion conflicts that are still on your disk.

If you commit now, you will KEEP them in the project.

Are you sure you want to KEEP them?`,{modal:!0},"Yes, KEEP them","No, let me DELETE them")!=="Yes, KEEP them"){p();return}let m=!1;try{let{stdout:g}=await h('git grep -E "^<<<<<<< "',{cwd:t});g.trim().length>0&&(m=!0)}catch{}if(m){re.window.showErrorMessage("Ricwiz: You still have unresolved conflict markers (<<<<<<<) in your files. Please resolve them first!"),p();return}await h("git add .",{cwd:t}),await h("git commit --no-edit",{cwd:t})}catch(a){re.window.showErrorMessage(`Ricwiz: Could not commit automatically. (${a.message})`),p()}});for(p();;){if(l){s=!0,d.dispose(),(Ve(),U(He)).webviewProvider?.setConflictState(null);try{await h("git merge --abort",{cwd:t})}catch{}return!1}try{let{stdout:i}=await h("git status --porcelain",{cwd:t});if(i.trim().length===0)return s=!0,d.dispose(),(Ve(),U(He)).webviewProvider?.setConflictState(null),re.window.showInformationMessage("Ricwiz: Changes committed!"),!0}catch{}await new Promise(i=>setTimeout(i,2e3))}}var re,Et,Tt,_e=R(()=>{"use strict";re=y(require("vscode")),Et=y(require("fs")),Tt=y(require("path"));S()});async function tt(){let t=await et();return!!(t&&t.trim())}async function ii(t,e){let o=It.workspace.getConfiguration("ricwiz"),n=(await et())?.trim();if(!n)throw new Error("No GitLab token");let s=e?e.getConfig("gitlabUrlOverride",""):o.get("gitlabUrlOverride",""),l=[];if(s&&s.trim()!=="")l.push(s.trim());else try{let{stdout:u}=await h("git remote",{cwd:t}),p=u.split(`
`).map(i=>i.trim()).filter(i=>i),d=[];e&&e.upstreamRemote&&p.includes(e.upstreamRemote)&&d.push(e.upstreamRemote),e&&e.originRemote&&e.originRemote!==e.upstreamRemote&&p.includes(e.originRemote)&&d.push(e.originRemote),p.includes("upstream")&&!d.includes("upstream")&&d.push("upstream"),p.includes("origin")&&!d.includes("origin")&&d.push("origin");for(let i of d)try{let{stdout:a}=await h(`git remote get-url ${i}`,{cwd:t}),r=a.trim();r.endsWith(".git")&&(r=r.slice(0,-4)),r.startsWith("git@")&&(r=r.replace("git@","").replace(":","/"),r=`https://${r}`),l.push(r)}catch{}}catch{}if(l.length===0)throw new Error("Could not get any remote origin URL.");return l.map(u=>{let p=new URL(u),d=`${p.protocol}//${p.host}`,i=p.pathname;i.startsWith("/")&&(i=i.substring(1)),i.endsWith("/")&&(i=i.slice(0,-1)),i.endsWith(".git")&&(i=i.slice(0,-4));let a=encodeURIComponent(i);return{baseUrl:d,token:n,projectPath:a}})}async function Mt(t,e,o,n,s){let l=new URL(`${e}${s}`);return new Promise((c,u)=>{let p=At.request(l,{method:n,timeout:5e3,headers:{"PRIVATE-TOKEN":o,Accept:"application/json"}},d=>{let i="";d.on("data",a=>i+=a),d.on("end",()=>{if(d.statusCode&&d.statusCode>=400)return u(new Error(`GitLab API error: ${d.statusCode}`));if(!i)return c({});try{let a=JSON.parse(i);c(a)}catch{u(new Error("Failed to parse GitLab response."))}})});p.on("timeout",()=>{p.destroy(),u(new Error("GitLab request timed out"))}),p.on("error",d=>u(new Error(`Network error: ${d.message}`))),p.end()})}async function ot(t,e,o,n){let s=`${t}:${e}:${o||"any"}`,l=Dt.get(s);if(l&&Date.now()-l.timestamp<ni)return l.data;try{let c=await ii(t,n);for(let u of c)try{let p=`/api/v4/projects/${u.projectPath}/merge_requests?source_branch=${encodeURIComponent(e)}&order_by=updated_at&sort=desc`;o&&(p+=`&target_branch=${encodeURIComponent(o)}`);let d=await Mt(t,u.baseUrl,u.token,"GET",p);if(d&&d.length>0){let i=d[0];try{let m=await Mt(t,u.baseUrl,u.token,"GET",`/api/v4/projects/${u.projectPath}/merge_requests/${i.iid}`);m&&(i=m)}catch{}let a="none";if(i.head_pipeline&&i.head_pipeline.status){let m=i.head_pipeline.status;m==="success"||m==="failed"||m==="canceled"||m==="skipped"?a=m:a="running"}let r={isMerged:i.state==="merged",isOpen:i.state==="opened",pipelineStatus:a,webUrl:i.web_url};return Dt.set(s,{data:r,timestamp:Date.now()}),r}}catch{}return null}catch{return null}}var At,It,Dt,ni,Lt=R(()=>{"use strict";At=y(require("https")),It=y(require("vscode"));ze();S();Dt=new Map,ni=30*1e3});var xe={};Je(xe,{findRelatedBranches:()=>at,getCurrentBranchMergeStatus:()=>nt,getRecentCommits:()=>st,getRecentTickets:()=>rt,getRelatedBranchesStatus:()=>it,resolveExistingBranchName:()=>si});function Ft(t,e){return e.find(o=>t.endsWith(`-to-${o.name}`))}async function it(t,e,o,n,s){let l=await tt();return await Promise.all(e.map(async u=>{let p=Ft(u,n);if(l){let d=p?p.sourceBranch:void 0,i=await ot(t,u,d,s);if(i)return{name:u,isMerged:i.isMerged,pipelineStatus:i.pipelineStatus,mrUrl:i.webUrl}}return{name:u,isMerged:!1}}))}async function nt(t,e,o,n){let s=Ft(e,o);if(!s)return!1;if(await tt()){let l=await ot(t,e,s.sourceBranch,n);if(l)return l.isMerged}return!1}async function st(t,e=10){try{let{stdout:o}=await h(`git log --oneline -${e} --format="%h|||%s|||%ar"`,{cwd:t});return o.split(`
`).filter(n=>n.trim()).map(n=>{let s=n.split("|||");return{hash:s[0]||"",message:s.length>=3?s.slice(1,-1).join("|||"):s[1]||"",timeAgo:s.length>=3?s[s.length-1]:""}})}catch{return[]}}async function rt(t,e=3){try{let{stdout:o}=await h('git for-each-ref --sort=-committerdate --format="%(refname:short)" refs/heads/',{cwd:t}),n=o.split(`
`).map(l=>l.trim()).filter(l=>l),s=/^[A-Z]+-\d+$/i;return n.filter(l=>s.test(l)).slice(0,e)}catch{return[]}}async function at(t,e,o){let{stdout:n}=await h(`git branch --all --list "*${e}*"`,{cwd:t}),s=new Set;return n.split(`
`).forEach(l=>{let c=l.replace("*","").trim();if(c){if(c.startsWith("remotes/")){let u=c.split("/");u.length>2&&(c=u.slice(2).join("/"))}c&&c!==o&&!c.includes("HEAD")&&s.add(c)}}),Array.from(s)}async function si(t,e,o){try{let n=require("child_process"),l=require("util").promisify(n.exec),{stdout:c}=await l(`git branch --all --list "*${e}*"`,{cwd:t}),u=c.split(`
`).map(d=>d.replace("*","").trim().replace(/^remotes\/[^\/]+\//,"")).filter(d=>d&&!d.includes("HEAD")),p=Array.from(new Set(u));if(o){let d=`-to-${o}`,i=p.find(a=>a.endsWith(d));return i||`${e}${d}`}else{let d=p.find(i=>!i.includes("-to-"));return d||e}}catch{return o?`${e}-to-${o}`:e}}var he=R(()=>{"use strict";S();Lt()});async function Ot(){let t=b();if(!t){j.window.showErrorMessage("Ricwiz: Open a folder or workspace that is a Git repository.");return}try{await h("git status",{cwd:t})}catch{j.window.showErrorMessage("Ricwiz: The opened folder does not appear to be a valid Git repository.");return}let e=await D.initialize(t);if(!e)return;let o=e.environments,n=await W(t,{prefix:e.ticketPrefix});if(!n){j.window.showErrorMessage("Operation cancelled: Ticket not provided.");return}let{ticketId:s,currentBranch:l}=n,{resolveExistingBranchName:c}=(he(),U(xe)),u=await c(t,s);if(!await ge(t,u)){j.window.showErrorMessage(`Ricwiz: Main branch '${u}' does not exist! Prepare deploy is only available when a main ticket branch is used.`);return}let p=e.getConfig("defaultReviewers",""),d="";try{let{stdout:i}=await h(`git config branch.${s}.ricwiz-reviewers`,{cwd:t});d=i.trim()}catch{}if(p.trim()){let i=await j.window.showInputBox({prompt:"Ricwiz: Reviewers for this deploy (optional, comma-separated)",placeHolder:"e.g. @joao, 123456",value:d||p,ignoreFocusOut:!0});if(i===void 0)return;try{i.trim()?await h(`git config branch.${s}.ricwiz-reviewers "${i.trim()}"`,{cwd:t}):d&&await h(`git config --unset branch.${s}.ricwiz-reviewers`,{cwd:t})}catch{}}await j.window.withProgress({location:j.ProgressLocation.Notification,title:"Ricwiz: Preparing Deploy",cancellable:!0},async(i,a)=>{let r=0,m=l,g=!1;a.onCancellationRequested(()=>{g=!0}),i.report({message:"Syncing remote information...",increment:10});try{await h("git fetch --all",{cwd:t});let w=10/(o.length||1);for(let v of o)try{if(g)throw new Error("Aborted");i.report({message:`Fetching ${v.sourceBranch}...`,increment:w});let x=e.getFetchRemote(v.sourceBranch),z=e.getFetchBranch(v.sourceBranch);await h(`git fetch ${x} ${z}:${z}`,{cwd:t})}catch{}}catch{}let f=60/(o.length||1);for(let w of o){if(g)break;let v=await c(t,s,w.name),x=w.sourceBranch;try{i.report({message:`Processing ${v}...`,increment:f/4}),await h(`git checkout ${v}`,{cwd:t});try{await h(`git pull ${e.originRemote} ${v}`,{cwd:t})}catch{}let z=async E=>{try{await h(`git merge ${E}`,{cwd:t})}catch(I){let X=!1;try{let{stdout:ce}=await h("git ls-files -u",{cwd:t});ce.trim().length>0&&(X=!0)}catch{}let H=((I.stdout||"")+(I.stderr||"")+(I.message||"")).toLowerCase();if(X||H.includes("conflict")||H.includes("conflit")){if(!await be(t,E,v,i))throw g=!0,new Error("Deploy aborted by user.")}else throw I}};i.report({message:`Merging ${x} into ${v}...`,increment:f/4});let B=e.getFetchRemote(x),N=e.getFetchBranch(x),ue=e.buildUpstreamPath(x);if(await h(`git fetch ${B} ${N}`,{cwd:t}),await z(ue),i.report({message:`Merging ${u} into ${v}...`,increment:f/4}),await z(u),g)break;i.report({message:`Pushing ${v}...`,increment:f/4}),await h(`git push ${e.originRemote} ${v}`,{cwd:t}),r++}catch(z){z.message.includes("aborted")?j.window.showInformationMessage("Ricwiz: Deploy cancelled."):j.window.showErrorMessage(`Ricwiz: Failed to process branch ${v}. Detail: ${z.message}`);return}}if(!g){i.report({message:"Finishing up...",increment:10});let w=m;try{await h(`git show-ref --verify --quiet refs/heads/${u}`,{cwd:t}),w=u}catch{}try{let v=await F(t);w&&w!==v?(await h(`git checkout ${w}`,{cwd:t}),j.window.showInformationMessage(`Ricwiz: Operation complete. Back on branch ${w}.`)):j.window.showInformationMessage("Ricwiz: Operation complete.")}catch{j.window.showInformationMessage("Ricwiz: Operation complete.")}}})}var j,Nt=R(()=>{"use strict";j=y(require("vscode"));S();_e();ee()});async function Ut(t=!1){let e=b();if(!e)return;let o=await D.initialize(e);if(!o)return;let n=await W(e,{prompt:"Enter the full ticket ID for the Merge Requests (e.g., SCPSCA-1234) or just the number"});if(!n)return;let{ticketId:s}=n,l=o.getConfig("gitlabUrlOverride",""),c="";if(l&&l.trim()!=="")c=l.trim().replace(/\/+$/,"");else{let i="";try{let a=o.upstreamRemote||"origin",{stdout:r}=await h(`git remote get-url ${a}`,{cwd:e});i=r.trim()}catch{le.window.showErrorMessage("Ricwiz: Could not get the remote origin URL. Please configure the URL manually in the extension settings.");return}c=i,c.endsWith(".git")&&(c=c.slice(0,-4)),c.startsWith("git@")&&(c=c.replace("git@","").replace(":","/"),c=`https://${c}`)}let u=[],p=o.ticketSourceBranch;try{let{stdout:i}=await h(`git config branch.${s}.ricwiz-source`,{cwd:e});i.trim()&&(p=i.trim())}catch{}let{resolveExistingBranchName:d}=(he(),U(xe));if(o.environments.length===0){let i=await d(e,s);u.push({source:i,target:p})}else for(let i of o.environments){let a=await d(e,s,i.name);u.push({source:a,target:i.sourceBranch})}for(let i of u){let a=`${c}/-/merge_requests/new?merge_request[source_branch]=${i.source}&merge_request[target_branch]=${i.target}`;t?le.commands.executeCommand("simpleBrowser.show",a):le.env.openExternal(le.Uri.parse(a))}le.window.showInformationMessage(`Ricwiz: Opening ${t?"VS Code browser":"external browser"} for Merge Requests!`)}async function jt(){return Ut(!1)}async function Jt(){return Ut(!0)}var le,Wt=R(()=>{"use strict";le=y(require("vscode"));S();ee()});async function qt(t=!1){let e=b();if(!e)return;let o=te.workspace.getConfiguration("ricwiz"),n=o.get("jiraUrl","");if(!n||n.trim()===""){te.window.showErrorMessage("Ricwiz: Jira URL is not configured. Please set it in the extension settings (e.g., https://jira.company.com/browse/).");return}let{getCurrentBranch:s,resolvePrefix:l,extractTicketSuggestion:c}=(S(),U(Me)),u=await s(e),p=o.get("ticketPrefix","SFPSCA-"),d=l(u,p),a=c(u,d,!0);if(a){let{normalizeTicketId:m}=(S(),U(Me));a=m(a,d)}else{let m=await W(e,{prompt:"Ricwiz could not detect the ticket from the branch name. Enter Jira ticket ID (e.g. SFPSCA-1234)",handleToSuffix:!0});if(!m)return;a=m.ticketId}let r=n.trim();r.endsWith("/")||(r+="/"),r+=a,t?te.commands.executeCommand("simpleBrowser.show",r):te.env.openExternal(te.Uri.parse(r)),te.window.showInformationMessage(`Ricwiz: Opening Jira Ticket ${a} in ${t?"VS Code":"browser"}!`)}async function Gt(){return qt(!1)}async function Ht(){return qt(!0)}var te,Vt=R(()=>{"use strict";te=y(require("vscode"));S()});async function ri(){let t=Qt.workspace.getConfiguration("ricwiz"),e=t.get("jiraUrl",""),o=t.get("jiraEmail","")?.trim(),n=(await ht())?.trim();if(!e||!n)throw new Error('Jira API Token is not securely configured. Please run the "Ricwiz: Set Secure Jira API Token" command.');let s=e;s.includes("/browse")&&(s=s.split("/browse")[0]),s.endsWith("/")&&(s=s.slice(0,-1));let l=o?`Basic ${Buffer.from(`${o}:${n}`).toString("base64")}`:`Bearer ${n}`;return{baseUrl:s,headerAuth:l}}async function Be(t,e,o){let{baseUrl:n,headerAuth:s}=await ri(),l=new URL(`${n}${e}`);return new Promise((c,u)=>{let p=_t.request(l,{method:t,headers:{Authorization:s,Accept:"application/json",...o?{"Content-Type":"application/json"}:{}}},d=>{let i="";d.on("data",a=>i+=a),d.on("end",()=>{if(d.statusCode===401||d.statusCode===403)return u(new Error(`Authentication failed (HTTP ${d.statusCode}). Please check your Jira settings.`));if(d.statusCode&&d.statusCode>=400){let a="";try{let r=JSON.parse(i);r.errorMessages&&r.errorMessages.length>0&&(a=r.errorMessages.join(", "))}catch{}return d.statusCode===404||d.statusCode===410?u(new Error(`Ticket not found or deleted (HTTP ${d.statusCode}). ${a}`)):u(new Error(`Jira API returned HTTP status ${d.statusCode}. ${a}`))}if(!i)return c({});try{let a=JSON.parse(i);c(a)}catch{u(new Error("Failed to parse Jira response."))}})});p.on("error",d=>u(new Error(`Network error: ${d.message}`))),o&&p.write(JSON.stringify(o)),p.end()})}async function Ee(t){let e=await Be("GET",`/rest/api/2/issue/${t}`);return e&&e.fields?{summary:e.fields.summary||"",description:e.fields.description||"No description provided.",status:e.fields.status?.name||"Unknown"}:null}async function Yt(t){let e=await Be("GET",`/rest/api/2/issue/${t}/transitions`);return e&&e.transitions?e.transitions.map(o=>({id:o.id,name:o.name})):[]}async function Zt(t,e){await Be("POST",`/rest/api/2/issue/${t}/transitions`,{transition:{id:e}})}async function Kt(t,e){await Be("POST",`/rest/api/2/issue/${t}/comment`,{body:e})}async function Xt(t,e){await Be("PUT",`/rest/api/2/issue/${t}`,{update:{labels:[{add:e}]}})}async function eo(t){let e=await Be("POST","/rest/api/3/search/jql",{jql:t,maxResults:50,fields:["summary","status","assignee"]});return e&&e.issues?e.issues.map(o=>({key:o.key,summary:o.fields?.summary||"No Title",status:o.fields?.status?.name||"Unknown",assignee:o.fields?.assignee?.displayName||"Unassigned"})):[]}var _t,Qt,Ae=R(()=>{"use strict";_t=y(require("https")),Qt=y(require("vscode"));ze()});async function to(t){let e=b();if(e)try{let o=await D.initialize(e);if(!o)return;let n=await F(e),s=Se(n,o.ticketPrefix),l=Pe(n,s,!0);if(l||(l=n.split("-to-")[0]),!l){V.window.showErrorMessage("Ricwiz: You are not currently on a valid ticket branch.");return}await V.window.withProgress({location:V.ProgressLocation.Notification,title:`Fetching details for ${l}...`,cancellable:!1},async c=>{let u=await Ee(l);if(u){let p=[];try{let{findRelatedBranches:d,getRelatedBranchesStatus:i}=(he(),U(xe)),a=V.workspace.getConfiguration("ricwiz").get("environments",[{name:"Qual",sourceBranch:"quality"},{name:"Val",sourceBranch:"validation"},{name:"Prod",sourceBranch:"main"}]),r=await d(e,l,"");p=await i(e,r,l,a)}catch{}t.setJiraData({ticketId:l,relatedBranches:p,...u}),t.setPage("jira")}else V.window.showErrorMessage("Ricwiz: No data found for this ticket.")})}catch(o){o.message.includes("securely configured")?await V.window.showErrorMessage(o.message,"Set Token Now")==="Set Token Now"&&V.commands.executeCommand("ricwiz.setJiraToken"):V.window.showErrorMessage(`Ricwiz Jira Error: ${o.message}`)}}var V,oo=R(()=>{"use strict";V=y(require("vscode"));S();ee();Ae()});async function io(t,e){let n=oe.workspace.getConfiguration("ricwiz").get("jiraDashboards",[]);if(e!==void 0&&(ke=e),!n||n.length===0){t.setDashboardData({queries:[],selectedIndex:0,results:[],error:"No queries defined in settings. Go to Settings > Ricwiz > Jira Dashboards."}),t.setPage("dashboard");return}ke>=n.length&&(ke=0);let s=n[ke];t.setDashboardData({queries:n,selectedIndex:ke,results:[],error:"\u23F3 Loading tickets..."}),t.setPage("dashboard");try{let l=await eo(s.jql),c=oe.workspace.workspaceFolders?.[0]?.uri.fsPath,u=[],p=t.getDashboardShowBranches();if(c)try{let i=require("child_process"),r=require("util").promisify(i.exec),{stdout:m}=await r("git branch",{cwd:c});u=m.split(`
`).map(g=>g.replace("*","").trim()).filter(g=>g)}catch{}let d=[];if(p&&c)try{let{findRelatedBranches:i,getRelatedBranchesStatus:a}=(he(),U(xe)),{WorkflowContext:r}=(ee(),U(St)),m=await r.initialize(c,{skipPrompt:!0}),g=m?.environments||oe.workspace.getConfiguration("ricwiz").get("environments",[{name:"Qual",sourceBranch:"quality"},{name:"Val",sourceBranch:"validation"},{name:"Prod",sourceBranch:"main"}]);d=await Promise.all(l.map(async f=>{let w=await i(c,f.key,""),v=await a(c,w,f.key,g,m);return{...f,detailedBranches:v}}))}catch{d=l}else d=l.map(i=>{let a=u.find(r=>r.includes(i.key));return{...i,branch:a||null}});t.setDashboardData({queries:n,selectedIndex:ke,results:d,error:null}),t.setPage("dashboard")}catch(l){let c=l.message;(c.includes("ENOTFOUND")||c.includes("network"))&&(c="No Internet or Invalid URL"),t.setDashboardData({queries:n,selectedIndex:ke,results:[],error:c}),t.setPage("dashboard")}}async function no(t,e){await oe.window.withProgress({location:oe.ProgressLocation.Notification,title:`Fetching details for ${e}...`,cancellable:!1},async()=>{try{let o=await Ee(e);if(o){let n=[],s=b();if(s)try{let{findRelatedBranches:l,getRelatedBranchesStatus:c}=(he(),U(xe)),u=oe.workspace.getConfiguration("ricwiz").get("environments",[{name:"Qual",sourceBranch:"quality"},{name:"Val",sourceBranch:"validation"},{name:"Prod",sourceBranch:"main"}]),p=await l(s,e,"");n=await c(s,p,e,u)}catch{}t.setJiraData({ticketId:e,relatedBranches:n,...o}),t.setPage("jira")}else oe.window.showErrorMessage(`Ricwiz: No data found for ticket ${e}.`)}catch(o){oe.window.showErrorMessage(`Ricwiz Jira Error: ${o.message}`)}})}var oe,ke,so=R(()=>{"use strict";oe=y(require("vscode"));Ae();S();ke=0});async function ct(){let t=b();if(!t)return;let e=await D.initialize(t,{forcePrompt:!1});if(!e)return;let o=await F(t);if(!o)return;let n=Se(o,e.ticketPrefix),s=Pe(o,n,!0);return s||o.split("-to-")[0]}async function ro(){try{let t=await ct();if(!t){P.window.showErrorMessage("Ricwiz: You are not on a valid ticket branch.");return}let e=await P.window.withProgress({location:P.ProgressLocation.Notification,title:`Fetching available status for ${t}...`,cancellable:!1},()=>Yt(t));if(!e||e.length===0){P.window.showInformationMessage(`Ricwiz: No transitions available for ${t}.`);return}let o=e.map(s=>({label:s.name,id:s.id})),n=await P.window.showQuickPick(o,{placeHolder:`Select new status for ${t}`,ignoreFocusOut:!0});n&&(await P.window.withProgress({location:P.ProgressLocation.Notification,title:`Updating status to ${n.label}...`,cancellable:!1},()=>Zt(t,n.id)),P.window.showInformationMessage(`Ricwiz: Status for ${t} updated to ${n.label}.`))}catch(t){t.message.includes("securely configured")?P.window.showErrorMessage(t.message,"Set Token Now").then(e=>{e==="Set Token Now"&&P.commands.executeCommand("ricwiz.setJiraToken")}):P.window.showErrorMessage(`Ricwiz Jira Error: ${t.message}`)}}async function ao(){try{let t=await ct();if(!t){P.window.showErrorMessage("Ricwiz: You are not on a valid ticket branch.");return}let e=await P.window.showInputBox({prompt:`Add comment to ${t}`,placeHolder:"Type your comment here...",ignoreFocusOut:!0});e&&(await P.window.withProgress({location:P.ProgressLocation.Notification,title:`Adding comment to ${t}...`,cancellable:!1},()=>Kt(t,e)),P.window.showInformationMessage(`Ricwiz: Comment added to ${t}.`))}catch(t){t.message.includes("securely configured")?P.window.showErrorMessage(t.message,"Set Token Now").then(e=>{e==="Set Token Now"&&P.commands.executeCommand("ricwiz.setJiraToken")}):P.window.showErrorMessage(`Ricwiz Jira Error: ${t.message}`)}}async function co(){try{let t=await ct();if(!t){P.window.showErrorMessage("Ricwiz: You are not on a valid ticket branch.");return}let e=await P.window.showInputBox({prompt:`Add a label to ${t}`,placeHolder:"e.g. Needs-Review, Bug, High-Priority",ignoreFocusOut:!0});e&&e.trim()&&(await P.window.withProgress({location:P.ProgressLocation.Notification,title:`Adding label to ${t}...`,cancellable:!1},()=>Xt(t,e.trim())),P.window.showInformationMessage(`Ricwiz: Label '${e.trim()}' added to ${t}.`))}catch(t){t.message.includes("securely configured")?P.window.showErrorMessage(t.message,"Set Token Now").then(e=>{e==="Set Token Now"&&P.commands.executeCommand("ricwiz.setJiraToken")}):P.window.showErrorMessage(`Ricwiz Jira Error: ${t.message}`)}}async function lo(){let t=await P.window.showInputBox({prompt:"Enter your Jira API Token (or Personal Access Token). It will be securely stored in your OS keychain.",password:!0,ignoreFocusOut:!0});if(t)try{await ft(t.trim()),P.window.showInformationMessage("Ricwiz: Jira API Token securely stored!")}catch(e){P.window.showErrorMessage(`Ricwiz: Failed to store token: ${e.message}`)}}var P,mo=R(()=>{"use strict";P=y(require("vscode"));S();ee();Ae();ze()});async function po(){let t=await G.window.showInputBox({prompt:"Enter your GitLab Personal Access Token",placeHolder:"glpat-xxxxxxxxxxxxxxxxxxxx",ignoreFocusOut:!0,password:!0});if(t&&t.trim()){let e=t.trim();await G.window.withProgress({location:G.ProgressLocation.Notification,title:"Ricwiz: Validating GitLab Token...",cancellable:!1},async()=>{try{let n=G.workspace.getConfiguration("ricwiz").get("gitlabUrlOverride","").trim();if(!n&&G.workspace.workspaceFolders)try{let{exec:p}=(S(),U(Me)),d=G.workspace.workspaceFolders[0].uri.fsPath,{stdout:i}=await p("git remote get-url origin",{cwd:d}),a=i.trim();a.startsWith("git@")&&(a=`https://${a.replace("git@","").replace(":","/")}`),a.endsWith(".git")&&(a=a.slice(0,-4)),n=a}catch{}n||(n="https://gitlab.com");let s=new URL(n),l=`${s.protocol}//${s.host}`,c=require("https"),u=await new Promise((p,d)=>{let i=c.request(new URL(`${l}/api/v4/user`),{method:"GET",timeout:5e3,headers:{"PRIVATE-TOKEN":e,Accept:"application/json"}},a=>{if(a.statusCode>=400)return d(new Error(`Status ${a.statusCode}`));let r="";a.on("data",m=>r+=m),a.on("end",()=>p(JSON.parse(r||"{}")))});i.on("error",d),i.on("timeout",()=>{i.destroy(),d(new Error("Timeout"))}),i.end()});await wt(e),G.window.showInformationMessage(`Ricwiz: \u2705 GitLab API Token saved and validated successfully for ${u.username||"user"}!`),G.commands.executeCommand("ricwiz.manualRefresh")}catch(o){G.window.showErrorMessage(`Ricwiz: \u274C Invalid token or cannot reach GitLab (${o.message}). Please check the token and try again.`)}})}}var G,uo=R(()=>{"use strict";G=y(require("vscode"));ze()});async function go(){let t=b();if(!t){me.window.showErrorMessage("Ricwiz: Open a folder or workspace that is a Git repository.");return}let e=await D.initialize(t);if(!e)return;let o=await W(t,{prefix:e.ticketPrefix,prompt:"Enter the full ticket ID to sync all branches for (e.g., SCPSCA-1234) or just the number"});if(!o)return;let{ticketId:n,currentBranch:s}=o;await me.window.withProgress({location:me.ProgressLocation.Notification,title:`Ricwiz: Syncing all branches for ${n}...`,cancellable:!1},async l=>{try{l.report({message:"Fetching from remote..."});try{await h("git fetch --all",{cwd:t})}catch{}let{stdout:c}=await h(`git branch --list "*${n}*"`,{cwd:t}),u=c.split(`
`).map(i=>i.replace("*","").trim()).filter(i=>i.length>0);if(u.length===0){me.window.showWarningMessage(`Ricwiz: No local branches found for ${n}.`);return}let p=0,d=0;for(let i of u)if(l.report({message:`Syncing ${i}...`}),i===s)try{await h(`git pull ${e.originRemote} ${i}`,{cwd:t}),p++}catch(a){let r=!1;try{let{stdout:g}=await h("git ls-files -u",{cwd:t});g.trim().length>0&&(r=!0)}catch{}let m=((a.stdout||"")+(a.stderr||"")+(a.message||"")).toLowerCase();(r||m.includes("conflict")||m.includes("conflit"))&&await be(t,`${e.originRemote}/${i}`,i,l)?p++:d++}else try{await h(`git fetch ${e.originRemote} ${i}:${i}`,{cwd:t}),p++}catch{try{await h(`git checkout ${i}`,{cwd:t});try{await h(`git pull ${e.originRemote} ${i}`,{cwd:t}),p++}catch(r){let m=!1;try{let{stdout:f}=await h("git ls-files -u",{cwd:t});f.trim().length>0&&(m=!0)}catch{}let g=((r.stdout||"")+(r.stderr||"")+(r.message||"")).toLowerCase();(m||g.includes("conflict")||g.includes("conflit"))&&await be(t,`${e.originRemote}/${i}`,i,l)?p++:d++}await h(`git checkout ${s}`,{cwd:t})}catch{try{await h(`git checkout ${s}`,{cwd:t})}catch{}d++}}d>0?me.window.showWarningMessage(`Ricwiz: Synced ${p}/${u.length} branches. ${d} branch(es) could not be synced (possible conflicts or diverged history).`):me.window.showInformationMessage(`Ricwiz: \u{1F504} All ${p} branches for ${n} are up to date!`)}catch(c){me.window.showErrorMessage(`Ricwiz: Sync failed: ${c.message}`)}})}var me,fo=R(()=>{"use strict";me=y(require("vscode"));S();_e();ee()});async function ho(){let t=b();if(!t){pe.window.showErrorMessage("Ricwiz: Open a folder or workspace that is a Git repository.");return}try{await h("git status",{cwd:t})}catch{pe.window.showErrorMessage("Ricwiz: The opened folder does not appear to be a valid Git repository.");return}let e=await D.initialize(t);if(!e)return;let o=e.environments,n=await W(t,{prefix:e.ticketPrefix});if(!n)return;let{ticketId:s,currentBranch:l}=n;await pe.window.withProgress({location:pe.ProgressLocation.Notification,title:"Ricwiz: Updating environment branches from their bases",cancellable:!0},async(c,u)=>{let p=0,d=l,i=!1;u.onCancellationRequested(()=>{i=!0}),c.report({message:"Syncing remote information...",increment:10});try{await h("git fetch --all",{cwd:t})}catch{}let a=80/(o.length||1);for(let r of o){if(i)break;let{resolveExistingBranchName:m}=(he(),U(xe)),g=await m(t,s,r.name),f=r.sourceBranch;if(await ge(t,g))try{c.report({message:`Processing ${g}...`,increment:a/2}),await h(`git checkout ${g}`,{cwd:t});try{c.report({message:`Merging ${f} into ${g}...`,increment:a/2});let w=e.getFetchRemote(f),v=e.getFetchBranch(f),x=e.buildUpstreamPath(f);await h(`git fetch ${w} ${v}`,{cwd:t}),await h(`git merge ${x}`,{cwd:t})}catch(w){let v=!1;try{let{stdout:z}=await h("git ls-files -u",{cwd:t});z.trim().length>0&&(v=!0)}catch{}let x=((w.stdout||"")+(w.stderr||"")+(w.message||"")).toLowerCase();if(v||x.includes("conflict")||x.includes("conflit")){let z=e.buildUpstreamPath(f);if(!await be(t,z,g,c))throw i=!0,new Error("Update aborted by user.")}else throw w}if(i)break;p++}catch(w){w.message.includes("aborted")?pe.window.showInformationMessage("Ricwiz: Update cancelled."):pe.window.showErrorMessage(`Ricwiz: Failed to update branch ${g}. Detail: ${w.message}`);return}}if(!i){c.report({message:"Finishing up...",increment:10});try{let r=await F(t);d&&d!==r&&await h(`git checkout ${d}`,{cwd:t})}catch{}pe.window.showInformationMessage(`Ricwiz: Successfully updated ${p} environment branches from their bases!`)}})}var pe,wo=R(()=>{"use strict";pe=y(require("vscode"));S();_e();ee()});async function vo(){let t=b();if(!t){O.window.showErrorMessage("Ricwiz: Open a folder or workspace that is a Git repository.");return}let e=await F(t),o=O.workspace.getConfiguration("ricwiz");await O.window.withProgress({location:O.ProgressLocation.Notification,title:"Ricwiz: Scanning for unused local branches...",cancellable:!1},async()=>{try{await h("git fetch --prune",{cwd:t})}catch{}let n=[];try{let{stdout:a}=await h('git branch --format="%(refname:short)"',{cwd:t});n=a.split(`
`).map(r=>r.trim()).filter(r=>r.length>0)}catch{}if(n.length===0){O.window.showInformationMessage("Ricwiz: No local branches found.");return}let s=[];try{let{stdout:a}=await h('git branch -r --format="%(refname:short)"',{cwd:t});s=a.split(`
`).map(r=>r.trim().replace(/^origin\//,"").replace(/^[^\/]+\//,"")).filter(r=>r.length>0&&!r.includes("HEAD"))}catch{}let l=[];try{let{stdout:a}=await h('git for-each-ref --format="%(refname:short)|||%(upstream:track)" refs/heads/',{cwd:t});l=a.split(`
`).filter(r=>r.includes("[gone]")).map(r=>r.split("|||")[0].trim())}catch{}let c=n.filter(a=>!s.includes(a));if(c.length===0){O.window.showInformationMessage("Ricwiz: Your local repository is totally clean! All local branches exist on the remote.");return}let u=c.map(a=>{let r=l.includes(a),m=a===e,g="Not found on remote";return r&&(g="Deleted on remote [gone]"),m&&(g+=" (Current branch - will checkout main first)"),{label:a,description:g,picked:r&&!m}}),p=await O.window.showQuickPick(u,{canPickMany:!0,placeHolder:"Select local branches to delete",title:"Ricwiz: Delete Unused Branches"});if(!p||p.length===0){O.window.showInformationMessage("Ricwiz: No branches selected for deletion.");return}if(await O.window.showWarningMessage(`Ricwiz: Delete ${p.length} local branch(es)?
This cannot be undone!`,{modal:!0},"Yes, delete them")!=="Yes, delete them"){O.window.showInformationMessage("Ricwiz: Deletion cancelled.");return}let i=0;for(let a of p){let r=a.label;if(r===e){let m=o.get("ticketSourceBranch","main");try{await h(`git checkout ${m}`,{cwd:t}),e=m}catch{O.window.showWarningMessage(`Ricwiz: Could not switch away from ${r}. Skipping.`);continue}}try{await h(`git branch -D ${r}`,{cwd:t}),i++}catch{O.window.showWarningMessage(`Ricwiz: Could not delete local branch ${r}.`)}}O.window.showInformationMessage(`Ricwiz: \u{1F5D1}\uFE0F Cleaned up ${i} unused local branch(es).`)})}var O,yo=R(()=>{"use strict";O=y(require("vscode"));S()});async function Te(t){let e=b();e&&await ie.window.withProgress({location:ie.ProgressLocation.Notification,title:`Ricwiz: Switching to ${t}...`,cancellable:!1},async()=>{try{let o=await F(e),n=!1;try{let{stdout:l}=await h("git status --porcelain",{cwd:e});n=l.trim().length>0}catch{}if(n&&o)try{await h(`git stash push --include-untracked -m "ricwiz-auto:${o}"`,{cwd:e}),ie.window.showInformationMessage(`Ricwiz: \u{1F4E6} Stashed changes from ${o}`)}catch{ie.window.showWarningMessage("Ricwiz: Could not stash changes. Checkout may fail if there are conflicts.")}let s=t;t.includes("/")&&(s=t.split("/").slice(1).join("/"));try{await h(`git checkout ${s}`,{cwd:e})}catch{let c="";if(t.includes("/"))c=t.split("/")[0];else{let{stdout:u}=await h("git branch -r",{cwd:e}),p=u.split(`
`).map(i=>i.trim()).filter(i=>i),d=[];for(let i of p){let a=i.split(" ")[0];a.endsWith(`/${s}`)&&d.push(a.substring(0,a.lastIndexOf("/")))}if(d.length===0){ie.window.showErrorMessage(`Ricwiz: A branch "${s}" n\xE3o existe localmente nem em nenhuma remote!`);return}else if(d.length===1)c=d[0];else{let i=await D.initialize(e);d.includes("origin")?c="origin":i&&d.includes(i.upstreamRemote)?c=i.upstreamRemote:c=d[0]}}try{await h(`git fetch ${c} ${s}`,{cwd:e}),await h(`git checkout -b ${s} --track ${c}/${s}`,{cwd:e})}catch{ie.window.showErrorMessage(`Ricwiz: Encontrou na remote ${c} mas falhou a fazer checkout.`);return}}try{let{stdout:l}=await h("git stash list",{cwd:e}),c=l.split(`
`);for(let u=0;u<c.length;u++)if(c[u].includes(`ricwiz-auto:${s}`)){let p=c[u].match(/stash@\{(\d+)\}/);p&&(await h(`git stash pop stash@{${p[1]}}`,{cwd:e}),ie.window.showInformationMessage(`Ricwiz: \u{1F4E6} Restored stashed changes on ${s}`));break}}catch{ie.window.showWarningMessage(`Ricwiz: Could not restore stashed changes on ${s}. You may need to resolve conflicts manually (check git stash list).`)}}catch{ie.window.showErrorMessage(`Ricwiz: Could not checkout branch ${t}.`)}})}var ie,Qe=R(()=>{"use strict";ie=y(require("vscode"));S();ee()});async function bo(){let t=b();if(t)try{let{stdout:e}=await h("git branch --show-current",{cwd:t}),o=e.trim();o&&(await Ie.env.clipboard.writeText(o),Ie.window.showInformationMessage(`Ricwiz: \u{1F4CB} Copied "${o}" to clipboard`))}catch{Ie.window.showErrorMessage("Ricwiz: Could not get the current branch name.")}}var Ie,xo=R(()=>{"use strict";Ie=y(require("vscode"));S()});async function Co(){let t=b();if(!t){_.window.showErrorMessage("Ricwiz: Open a folder or workspace that is a Git repository.");return}let e=_.workspace.getConfiguration("ricwiz"),o=e.get("ticketSourceBranch","main"),s=e.get("packageXmlCommand",'sf sgd source delta --to "HEAD" --from "origin/{baseBranch}" --output-dir "."').replace("{baseBranch}",o);await _.window.showWarningMessage("Are you sure you want to generate the package.xml? This may overwrite existing local manifest files.",{modal:!0},"Yes, Generate")==="Yes, Generate"&&await _.window.withProgress({location:_.ProgressLocation.Notification,title:"Ricwiz: Generating package.xml using Salesforce CLI...",cancellable:!1},async()=>{try{await h(s,{cwd:t,maxBuffer:10*1024*1024}),_.window.showInformationMessage("Ricwiz: Successfully generated package.xml!");let c=Ye.join(t,"package","package.xml"),u=Ye.join(t,"package.xml"),p=Ye.join(t,"manifest","package.xml");for(let d of[c,u,p])if(ko.existsSync(d)){let i=await _.workspace.openTextDocument(d);await _.window.showTextDocument(i);break}}catch(c){_.window.showErrorMessage(`Ricwiz: Error running sf command - ${c.message}`)}})}var _,Ye,ko,$o=R(()=>{"use strict";_=y(require("vscode")),Ye=y(require("path")),ko=y(require("fs"));S()});async function zo(){let t=b();if(!t){Q.window.showErrorMessage("Ricwiz: Open a folder or workspace that is a Git repository.");return}let o=Q.workspace.getConfiguration("ricwiz").get("deployCommand","sf project deploy start --manifest package/package.xml --post-destructive-changes destructiveChanges/destructiveChanges.xml -c -l NoTestRun -g");await Q.window.showWarningMessage("Are you sure you want to deploy to Salesforce? This action modifies your org and cannot be easily undone.",{modal:!0},"Yes, Deploy")==="Yes, Deploy"&&await Q.window.withProgress({location:Q.ProgressLocation.Notification,title:"Ricwiz: Deploying package...",cancellable:!1},async()=>{try{let{stdout:s,stderr:l}=await h(o,{cwd:t,maxBuffer:52428800}),c=Q.window.createOutputChannel("Ricwiz Deploy");c.appendLine(`Executing: ${o}`),c.appendLine(s),l&&(c.appendLine("--- STDERR ---"),c.appendLine(l)),c.show(),Q.window.showInformationMessage("Ricwiz: Successfully ran deploy command!")}catch(s){let l=Q.window.createOutputChannel("Ricwiz Deploy");l.appendLine(`Error executing: ${o}`),s.stdout&&l.appendLine(s.stdout),s.stderr&&l.appendLine(s.stderr),l.appendLine(s.message),l.show(),Q.window.showErrorMessage("Ricwiz: Error running deploy command. See output channel for details.")}})}var Q,Ro=R(()=>{"use strict";Q=y(require("vscode"));S()});async function So(){let t=b();if(!t){Y.window.showErrorMessage("Ricwiz: Open a folder or workspace that is a Git repository.");return}let o=Y.workspace.getConfiguration("ricwiz").get("importDataCommand","sfdx force:data:tree:import --plan data/plan.json");await Y.window.showWarningMessage("Are you sure you want to import data into Salesforce? This action modifies records in your org.",{modal:!0},"Yes, Import")==="Yes, Import"&&await Y.window.withProgress({location:Y.ProgressLocation.Notification,title:"Ricwiz: Importing data...",cancellable:!1},async()=>{try{let{stdout:s,stderr:l}=await h(o,{cwd:t,maxBuffer:52428800}),c=Y.window.createOutputChannel("Ricwiz Import Data");c.appendLine(`Executing: ${o}`),c.appendLine(s),l&&(c.appendLine("--- STDERR ---"),c.appendLine(l)),c.show(),Y.window.showInformationMessage("Ricwiz: Successfully ran import data command!")}catch(s){let l=Y.window.createOutputChannel("Ricwiz Import Data");l.appendLine(`Error executing: ${o}`),s.stdout&&l.appendLine(s.stdout),s.stderr&&l.appendLine(s.stderr),l.appendLine(s.message),l.show(),Y.window.showErrorMessage("Ricwiz: Error running import data command. See output channel for details.")}})}var Y,Po=R(()=>{"use strict";Y=y(require("vscode"));S()});async function Bo(){let t=b();if(!t){Z.window.showErrorMessage("Ricwiz: Open a folder or workspace that is a Git repository.");return}let e="";try{e=await F(t)}catch{}let n=Z.workspace.getConfiguration("ricwiz").get("ticketSourceBranch","main"),s=await Z.window.showInputBox({prompt:`Enter the branch name to list modified files (compared to ${n})`,value:e,placeHolder:"SFPSCA-1234"});s&&await Z.window.withProgress({location:Z.ProgressLocation.Notification,title:`Ricwiz: Finding files for ${s}...`,cancellable:!1},async()=>{try{let l=s.replace(/-to-[a-zA-Z0-9]+$/i,""),c=[];try{let g="";try{let{stdout:f}=await h(`git merge-base origin/${n} ${s}`,{cwd:t});g=f.trim()}catch{let{stdout:f}=await h(`git merge-base ${n} ${s}`,{cwd:t});g=f.trim()}if(g){let{stdout:f}=await h(`git diff --name-only ${g} ${s}`,{cwd:t,maxBuffer:10485760});c=f.split(`
`).map(w=>w.trim()).filter(w=>w.length>0)}}catch{}let u=[];try{let{stdout:g}=await h(`git --no-pager log --grep="\\b${l}\\b" -i -E --name-only -m --first-parent --format=""`,{cwd:t,maxBuffer:10485760});u=g.split(`
`).map(f=>f.trim()).filter(f=>f.length>0)}catch{}let p=[...c,...u];if(p.length===0){Z.window.showInformationMessage(`Ricwiz: No modified files found for ${s}.`);return}let d=Array.from(new Set(p)).sort(),i={};for(let g of d){let f=g.match(/default\/([^/]+)/),w=f&&f[1]?f[1].toUpperCase():"OUTROS";i[w]||(i[w]=[]),i[w].push(g)}let a=`Files modified in branch ${s}:
`,r=Object.keys(i).sort();for(let g of r)a+=`
=== ${g} ===
`,a+=i[g].join(`
`)+`
`;let m=await Z.workspace.openTextDocument({content:a,language:"plaintext"});await Z.window.showTextDocument(m)}catch(l){Z.window.showErrorMessage(`Ricwiz: Error running git log - ${l.message}`)}})}var Z,Eo=R(()=>{"use strict";Z=y(require("vscode"));S()});async function To(){let t=b();if(!t){ne.window.showErrorMessage("Ricwiz: Open a folder or workspace that is a Git repository.");return}let o=ne.workspace.getConfiguration("ricwiz").get("resetTrackingCommand","sf org disable tracking && sf project reset tracking --no-prompt");await ne.window.withProgress({location:ne.ProgressLocation.Notification,title:"Ricwiz: Resetting tracking...",cancellable:!1},async()=>{try{let{stdout:n,stderr:s}=await h(o,{cwd:t,maxBuffer:52428800}),l=ne.window.createOutputChannel("Ricwiz Reset Tracking");l.appendLine(`Executing: ${o}`),l.appendLine(n),s&&(l.appendLine("--- STDERR ---"),l.appendLine(s)),l.show(),ne.window.showInformationMessage("Ricwiz: Successfully reset tracking!")}catch(n){let s=ne.window.createOutputChannel("Ricwiz Reset Tracking");s.appendLine(`Error executing: ${o}`),n.stdout&&s.appendLine(n.stdout),n.stderr&&s.appendLine(n.stderr),s.appendLine(n.message),s.show(),ne.window.showErrorMessage("Ricwiz: Error resetting tracking. See output channel for details.")}})}var ne,Mo=R(()=>{"use strict";ne=y(require("vscode"));S()});async function Do(){let t=b();if(!t){K.window.showErrorMessage("Ricwiz: Open a workspace first.");return}let e=["ApexClass","ApexTrigger","CustomObject","CustomField","LightningComponentBundle","AuraDefinitionBundle","Flow","CustomLabel","CustomMetadata","StaticResource","Profile","PermissionSet","PermissionSetGroup","Layout","ValidationRule","RecordType","ListView","Report","EmailTemplate","Other (Type manually)..."],o=await K.window.showQuickPick(e,{placeHolder:"Select Metadata Type to extract (e.g., ApexClass)",ignoreFocusOut:!0});if(!o||o==="Other (Type manually)..."&&(o=await K.window.showInputBox({prompt:"Enter Metadata Type (e.g., CustomApplication, Queue)",ignoreFocusOut:!0}),!o))return;let n={ApexClass:"**/*.cls",ApexTrigger:"**/*.trigger",CustomObject:"**/*.{object,object-meta.xml}",CustomField:"**/*.field-meta.xml",LightningComponentBundle:"**/lwc/*/*.js",AuraDefinitionBundle:"**/aura/*/*.cmp",Flow:"**/*.flow-meta.xml",CustomLabel:"**/*.labels-meta.xml",CustomMetadata:"**/*.md-meta.xml",StaticResource:"**/*.resource-meta.xml",Profile:"**/*.profile-meta.xml",PermissionSet:"**/*.permissionset-meta.xml",PermissionSetGroup:"**/*.permissionsetgroup-meta.xml",Layout:"**/*.layout-meta.xml",ValidationRule:"**/*.validationRule-meta.xml",RecordType:"**/*.recordType-meta.xml",ListView:"**/*.listView-meta.xml"},s=[],l=n[o];if(l)try{s=(await K.workspace.findFiles(l,"**/node_modules/**")).map(p=>{let d=p.fsPath.split(/[\\/]/).pop()||"";if(o==="LightningComponentBundle"||o==="AuraDefinitionBundle"){let i=p.fsPath.split(/[\\/]/);return i[i.length-2]||d.split(".")[0]}return d.split(".")[0]}),s=[...new Set(s)].sort()}catch{}let c=await new Promise(u=>{let p=K.window.createQuickPick();p.title=`Extract ${o}`,p.placeholder="Type name (e.g. MyComponent) or * for all",p.ignoreFocusOut=!0,p.matchOnDescription=!0;let d=()=>{let i=p.value.trim(),a=[];i?a.push({label:`$(cloud-download) Extract "${i}"`,description:"Extract exact name from Salesforce",alwaysShow:!0}):a.push({label:'$(cloud-download) Extract "*" (All)',description:`Extract all ${o}s`,alwaysShow:!0}),s.forEach(r=>{(!i||r.toLowerCase().includes(i.toLowerCase()))&&a.push({label:r,description:"Local workspace component"})}),p.items=a};p.onDidChangeValue(()=>d()),p.onDidAccept(()=>{let i=p.selectedItems[0];if(i){let a=i.label;a.startsWith('$(cloud-download) Extract "')?a=a.replace('$(cloud-download) Extract "',"").replace('" (All)',"").replace('"',""):a==='$(cloud-download) Extract "*" (All)'&&(a="*"),p.hide(),u(a)}}),p.onDidHide(()=>{p.dispose(),u(void 0)}),d(),p.show()});c&&await K.window.withProgress({location:K.ProgressLocation.Notification,title:`Ricwiz: Extracting ${o}:${c} from Salesforce...`,cancellable:!0},async(u,p)=>{try{L.show(!0);let d=`${o}:${c}`,{stdout:i,stderr:a}=await h(`sf project retrieve start -m "${d}"`,{cwd:t});i&&L.appendLine(i),a&&L.appendLine(a),K.window.showInformationMessage(`Ricwiz: Successfully extracted ${d}.`)}catch(d){L.appendLine(`ERROR: ${d.message}`),d.stdout&&L.appendLine(d.stdout),d.stderr&&L.appendLine(d.stderr),K.window.showErrorMessage("Ricwiz: Extraction failed. See Output channel for details.")}})}var K,Ao=R(()=>{"use strict";K=y(require("vscode"));S()});async function Lo(){let t=J.window.activeTextEditor;if(!t){J.window.showErrorMessage("Ricwiz: Please open the file you want to deploy in the editor first.");return}let e=t.document.uri.fsPath,o=b();if(!o)return;let n="";if(await J.window.withProgress({location:J.ProgressLocation.Notification,title:"Ricwiz: Fetching available Salesforce orgs...",cancellable:!1},async()=>{try{let{stdout:p}=await h("sf org list --json",{cwd:o});n=p}catch(p){n=p.stdout||""}}),!n){J.window.showErrorMessage("Ricwiz: Failed to fetch orgs. Is Salesforce CLI installed?");return}let s=[];try{let p=JSON.parse(n),d=p.result?.nonScratchOrgs||[],i=p.result?.scratchOrgs||[];s=[...d,...i]}catch{J.window.showErrorMessage("Ricwiz: Failed to parse org list.");return}if(s.length===0){J.window.showInformationMessage("Ricwiz: No authenticated orgs found.");return}let l=s.map(p=>({label:p.alias||p.username,description:p.alias?p.username:"",picked:p.isDefaultUsername})),c=await J.window.showQuickPick(l,{placeHolder:"Select the org(s) to deploy this file to",canPickMany:!0,ignoreFocusOut:!0});if(!c||c.length===0)return;let u=Io.basename(e);await J.window.withProgress({location:J.ProgressLocation.Notification,title:`Ricwiz: Deploying ${u} to ${c.length} org(s)...`,cancellable:!1},async()=>{L.show(!0),L.appendLine(`--- Starting Parallel Deploy of ${u} ---`);let p=c.map(async r=>{let m=r.label;L.appendLine(`[${m}] Deploying...`);try{let{stdout:g,stderr:f}=await h(`sf project deploy start -d "${e}" -o "${m}"`,{cwd:o});return L.appendLine(`[${m}] \u2705 Success`),g&&L.appendLine(g),{org:m,success:!0}}catch(g){return L.appendLine(`[${m}] \u274C Failed`),g.stdout&&L.appendLine(g.stdout),g.stderr&&L.appendLine(g.stderr),{org:m,success:!1}}}),d=await Promise.all(p),i=d.filter(r=>r.success).length,a=d.filter(r=>!r.success).length;a===0?J.window.showInformationMessage(`Ricwiz: Successfully deployed to all ${i} orgs!`):J.window.showErrorMessage(`Ricwiz: Deploy finished with errors (${i} success, ${a} failed). Check Output channel.`)})}var J,Io,Fo=R(()=>{"use strict";J=y(require("vscode")),Io=y(require("path"));S()});async function Oo(){let t=b();if(!t){A.window.showErrorMessage("Ricwiz: Open a folder or workspace that is a Git repository.");return}let e=A.workspace.getConfiguration("ricwiz"),o=e.get("auditUsername",""),n=e.get("auditHours",8),s=await A.window.showInputBox({prompt:"Enter your Salesforce Username to query in SetupAuditTrail",value:o,placeHolder:"admin@tuaorg.com"});if(!s)return;let l=await A.window.showInputBox({prompt:"How many hours back do you want to search?",value:n.toString(),placeHolder:"8"});if(!l)return;let c=parseFloat(l);if(isNaN(c)||c<=0){A.window.showErrorMessage("Ricwiz: Invalid hours specified.");return}let u=new Date(Date.now()-c*60*60*1e3).toISOString(),d=`sf data query -q "${`SELECT Action, Display, Section FROM SetupAuditTrail WHERE CreatedBy.Username = '${s}' AND CreatedDate >= ${u}`}" --json`;await A.window.withProgress({location:A.ProgressLocation.Notification,title:"Ricwiz: Interrogating Setup Audit Trail...",cancellable:!1},async()=>{try{let{stdout:i}=await h(d,{cwd:t,maxBuffer:52428800}),a=JSON.parse(i);if(!a.result||a.result.records.length===0){A.window.showInformationMessage(`Ricwiz: No changes found for ${s} in the last ${c} hours.`);return}let r=a.result.records,m=[],g=new Set;for(let E of r){let I=ai(E.Action,E.Display,E.Section);if(I){let X=`${I.isDelete?"DEL":"ADD"}-${I.metadataFormat}`;if(!g.has(X)){g.add(X);let H=I.isDelete?"$(trash)":"$(plus)";m.push({label:`${H} ${I.metadataFormat}`,description:`${E.Action} -> ${E.Display}`,metadataFormat:I.metadataFormat,isDelete:I.isDelete})}}}if(m.length===0){A.window.showInformationMessage(`Ricwiz: No extractable metadata changes found for ${s} in the last ${c} hours (ignored passwords/logins).`);return}let f=await A.window.showQuickPick(m,{canPickMany:!0,placeHolder:"Select the changes you want to extract to GitLab",ignoreFocusOut:!0});if(!f||f.length===0){A.window.showInformationMessage("Ricwiz: No changes selected.");return}let w=f.filter(E=>E.isDelete),v=f.filter(E=>!E.isDelete),x=A.window.createOutputChannel("Ricwiz Admin Bridge");if(x.show(),w.length>0){let{stdout:E}=await h("git ls-files",{cwd:t}),I=E.split(`
`).map(H=>H.trim()),X=0;for(let H of w){let ce=H.metadataFormat.split(":"),Ne=ce[0],Ue=ce[1],we=Ue;Ne==="CustomField"&&(we=Ue.split(".")[1]);let Xe=I.filter($e=>{let T=Ke.basename($e);return T.startsWith(we+".")&&T.includes(Ne==="CustomField"?".field":"")});for(let $e of Xe){let T=Ke.join(t,$e);Ze.existsSync(T)&&(Ze.unlinkSync(T),x.appendLine(`Deleted local file: ${$e}`),X++)}}A.window.showInformationMessage(`Ricwiz: Deleted ${X} local files from Git workspace.`)}if(v.length===0)return;let z=v.map(E=>E.metadataFormat).filter(E=>E!=="").join(", "),B=await A.window.showInputBox({prompt:"Review and adjust the metadata components to retrieve",value:z,ignoreFocusOut:!0});if(!B)return;let N=`sf project retrieve start -m "${B}"`;x.appendLine(`Executing: ${N}`),A.window.showInformationMessage(`Ricwiz: Extracting ${v.length} components...`);let ue=await h(N,{cwd:t});x.appendLine(ue.stdout),ue.stderr&&(x.appendLine("--- STDERR ---"),x.appendLine(ue.stderr)),A.window.showInformationMessage("Ricwiz: Changes extracted successfully! Ready for Git Commit.")}catch(i){A.window.showErrorMessage(`Ricwiz: Error capturing changes - ${i.message}`)}})}function ai(t,e,o){if(!t||!e||!o)return null;let n=t.toLowerCase(),s=o.toLowerCase();if(["security controls","network access","session settings","data export","login history","password policies","identity verification","delegated administration"].includes(s)||n.includes("login")||n.includes("password")||n.includes("oauth")||n.includes("session"))return null;let c=n.includes("delete"),u=null;if(n==="permissionsetgroupcomponentadd"||n==="permissionsetgroupcomponentdelete")return null;let p=(d,i=!1)=>{let a=d.replace(/\(.*\)/g,"").trim();a.includes(":")&&!n.includes("calculation")&&(a=a.split(":")[0]);let r=["disabled","deleted","removed","created","changed","updated","from","to","on","assigned","assign","assignment","permission","set","group","apex","class","trigger","custom","field","object","layout","validation","rule","flow","profile"],m=a.split(/\s+/);if(i){for(;m.length>0&&r.includes(m[m.length-1].toLowerCase());)m.pop();for(;m.length>0&&r.includes(m[0].toLowerCase());)m.shift();return m.join(" ").trim().replace(/[^a-zA-Z0-9_ ]/g,"")}else return m.filter(w=>!r.includes(w.toLowerCase())).join("_").replace(/[^a-zA-Z0-9_]/g,"")||a.replace(/\s+/g,"")};if(n.includes("profile"))u=`Profile:${p(e,!0)}`;else if(n.includes("permissionsetgroupcalculation")){let d=e.split(":");u=`PermissionSetGroup:${d.length>1?d[d.length-1].trim():p(e,!1)}`}else if(n.includes("permission set group")||n.includes("permissionsetgroup"))u=`PermissionSetGroup:${p(e,!1)}`;else if(n.includes("permission set")||n.includes("permissionset"))u=`PermissionSet:${p(e,!1)}`;else if(n.includes("apexclass"))u=`ApexClass:${p(e,!1)}`;else if(n.includes("apextrigger")||n.includes("apex trigger"))u=`ApexTrigger:${p(e,!1)}`;else if(n.includes("customfield")){let d=e.match(/([A-Za-z0-9_]+__c)/),i=e.match(/(?:on|na|for)\s+([A-Za-z0-9_]+)/i);d&&i?u=`CustomField:${i[1]}.${d[1]}`:u=`CustomField:${p(e,!1)}`}else if(n.includes("layout"))u=`Layout:${p(e,!0)}`;else if(n.includes("validation"))u=`ValidationRule:${p(e,!1)}`;else if(n.includes("flow"))u=`Flow:${p(e,!1)}`;else if(n.includes("customobject")){let d=e.match(/([A-Za-z0-9_]+__c)/);u=d?`CustomObject:${d[1]}`:`CustomObject:${p(e,!1)}`}else if(!n.includes("created")&&!n.includes("changed")&&!n.includes("deleted"))return null;return u?{metadataFormat:u,isDelete:c}:null}var A,Ze,Ke,No=R(()=>{"use strict";A=y(require("vscode")),Ze=y(require("fs")),Ke=y(require("path"));S()});async function Uo(){let t=b();if(t)try{let{stdout:e}=await h('git for-each-ref --sort=-committerdate --format="%(refname:short)|||%(committerdate:relative)|||%(subject)" refs/heads/',{cwd:t}),o=e.split(`
`).filter(s=>s.trim()).map(s=>{let l=s.split("|||");return{label:`$(git-branch) ${l[0]}`,description:l[1],detail:l[2],branchName:l[0]}}),n=await dt.window.showQuickPick(o,{placeHolder:"Select a branch from history to checkout",matchOnDescription:!0,matchOnDetail:!0});n&&await Te(n.branchName)}catch{dt.window.showErrorMessage("Ricwiz: Failed to get branch history")}}var dt,jo=R(()=>{"use strict";dt=y(require("vscode"));S();Qe()});async function Jo(){let t=b();if(!t)return;let e=await Le.window.showInputBox({prompt:"Enter ticket number or name (e.g., 48934)",placeHolder:"48934"});if(e)try{let{stdout:o}=await h(`git branch --list "*${e}*"`,{cwd:t}),n=o.split(`
`).map(c=>c.replace("*","").trim()).filter(c=>c);if(n.length===0){Le.window.showInformationMessage(`Ricwiz: No branches found matching "${e}"`);return}let s=n.map(c=>({label:`$(git-branch) ${c}`,branchName:c})),l=await Le.window.showQuickPick(s,{placeHolder:`Select a branch for ${e}`});l&&await Te(l.branchName)}catch{Le.window.showErrorMessage("Ricwiz: Failed to search branches")}}var Le,Wo=R(()=>{"use strict";Le=y(require("vscode"));S();Qe()});async function Go(){let t=Ce.window.activeTextEditor;if(!t)return Ce.window.showErrorMessage("Ricwiz: Please open a file in the editor to check blame."),null;let e=t.document.fileName,o=qo.basename(e),n=b();if(!n)return Ce.window.showErrorMessage("Ricwiz: Workspace is not a git repository."),null;let s=[];try{let{stdout:i}=await h(`git log -5 --pretty=format:"%an|%ar|%s|%h" -- "${e}"`,{cwd:n}),a=i.trim().split(`
`);for(let r of a){let m=r.split("|");m.length>=4&&s.push({author:m[0],time:m[1],message:m.slice(2,-1).join("|"),hash:m[m.length-1]})}}catch(i){console.error("Git blame error:",i)}let l="Unknown",c="Unknown",u="Unknown",p=[],d=ci(e);if(d)try{await Ce.window.withProgress({location:Ce.ProgressLocation.Notification,title:`Ricwiz: Analyzing ${d.name} in Salesforce...`,cancellable:!1},async()=>{let i="";if(d.type==="CustomField"){let a=d.name.split(".");a.length===2&&(i=`SELECT LastModifiedBy.Name, LastModifiedDate, CreatedBy.Name FROM CustomField WHERE DeveloperName = '${a[1].replace("__c","")}' AND TableEnumOrId = '${a[0]}'`)}else d.type==="LightningComponentBundle"?i=`SELECT LastModifiedBy.Name, LastModifiedDate, CreatedBy.Name FROM LightningComponentBundle WHERE DeveloperName = '${d.name}'`:i=`SELECT LastModifiedBy.Name, LastModifiedDate, CreatedBy.Name FROM ${d.type} WHERE Name = '${d.name}'`;if(i)try{let{stdout:a}=await h(`sf data query -t -q "${i}" --json`,{cwd:n,maxBuffer:52428800}),r=JSON.parse(a);if(r&&r.result&&r.result.records&&r.result.records.length>0){let m=r.result.records[0];l=m.LastModifiedBy?m.LastModifiedBy.Name:"Unknown",u=m.CreatedBy?m.CreatedBy.Name:"Unknown",c=new Date(m.LastModifiedDate).toLocaleString()}else l="Not found in Org",c="N/A",u="N/A"}catch{l="Query Error",c="N/A",u="N/A"}try{let a="SELECT Action, Display, CreatedBy.Name, CreatedDate FROM SetupAuditTrail ORDER BY CreatedDate DESC LIMIT 1500",{stdout:r}=await h(`sf data query -q "${a}" --json`,{cwd:n,maxBuffer:52428800}),m=JSON.parse(r);if(m&&m.result&&m.result.records){let g=d.name.replace("__c","");p=m.result.records.filter(w=>w.Display&&w.Display.includes(g)).map(w=>({action:w.Action,display:w.Display,author:w.CreatedBy?w.CreatedBy.Name:"Unknown",time:new Date(w.CreatedDate).toLocaleString()})).slice(0,10)}}catch(a){console.error("Audit trail query error:",a)}})}catch(i){console.error("Salesforce query error:",i)}else l="Unsupported Metadata Type",c="N/A";return{fileName:o,gitHistory:s,sfAuthor:l,sfTime:c,sfCreatedBy:u,auditHistory:p}}function ci(t){let e=t.replace(/\\/g,"/");if(e.includes("/classes/")){let o=e.match(/\/classes\/([^/.]+)\.cls/);if(o)return{type:"ApexClass",name:o[1]}}if(e.includes("/triggers/")){let o=e.match(/\/triggers\/([^/.]+)\.trigger/);if(o)return{type:"ApexTrigger",name:o[1]}}if(e.includes("/lwc/")){let o=e.match(/\/lwc\/([^/]+)\//);if(o)return{type:"LightningComponentBundle",name:o[1]}}if(e.includes("/aura/")){let o=e.match(/\/aura\/([^/]+)\//);if(o)return{type:"AuraDefinitionBundle",name:o[1]}}if(e.includes("/objects/")&&e.includes("/fields/")){let o=e.match(/\/objects\/([^/]+)\//),n=e.match(/\/fields\/([^/.]+)\.field/);if(o&&n)return{type:"CustomField",name:`${o[1]}.${n[1]}`}}return null}var Ce,qo,Ho=R(()=>{"use strict";Ce=y(require("vscode")),qo=y(require("path"));S()});function Vo(t,e,o){t.subscriptions.push(C.commands.registerCommand("ricwiz.generateDestructiveChanges",xt),C.commands.registerCommand("ricwiz.runSmartTests",Ct),C.commands.registerCommand("ricwiz.refreshWebview",()=>{e&&C.commands.executeCommand("workbench.action.webview.reloadWebviewAction")}),C.commands.registerCommand("ricwiz.createBranches",Pt),C.commands.registerCommand("ricwiz.prepareDeploy",Ot),C.commands.registerCommand("ricwiz.createMergeRequests",jt),C.commands.registerCommand("ricwiz.createMergeRequestsVSCode",Jt),C.commands.registerCommand("ricwiz.openJiraTicket",Gt),C.commands.registerCommand("ricwiz.openJiraTicketVSCode",Ht),C.commands.registerCommand("ricwiz.showJiraDetails",()=>{e&&to(e)}),C.commands.registerCommand("ricwiz.openJiraDashboard",n=>{e&&io(e,n)}),C.commands.registerCommand("ricwiz.openJiraDetailsForId",n=>{e&&no(e,n)}),C.commands.registerCommand("ricwiz.toggleDashboardBranches",n=>{e&&(e.setDashboardShowBranches(n),C.commands.executeCommand("ricwiz.openJiraDashboard"))}),C.commands.registerCommand("ricwiz.changeJiraStatus",ro),C.commands.registerCommand("ricwiz.addJiraComment",ao),C.commands.registerCommand("ricwiz.addJiraLabel",co),C.commands.registerCommand("ricwiz.setJiraToken",lo),C.commands.registerCommand("ricwiz.setGitlabToken",po),C.commands.registerCommand("ricwiz.syncAll",go),C.commands.registerCommand("ricwiz.updateBases",ho),C.commands.registerCommand("ricwiz.deleteUnusedBranches",vo),C.commands.registerCommand("ricwiz.checkoutBranch",Te),C.commands.registerCommand("ricwiz.copyBranchName",bo),C.commands.registerCommand("ricwiz.generatePackageXml",Co),C.commands.registerCommand("ricwiz.deployPackage",zo),C.commands.registerCommand("ricwiz.importData",So),C.commands.registerCommand("ricwiz.listTicketFiles",Bo),C.commands.registerCommand("ricwiz.resetTracking",To),C.commands.registerCommand("ricwiz.extractComponent",Do),C.commands.registerCommand("ricwiz.deployMultiOrg",Lo),C.commands.registerCommand("ricwiz.captureAdminChanges",Oo),C.commands.registerCommand("ricwiz.openHistory",Uo),C.commands.registerCommand("ricwiz.searchTicket",Jo),C.commands.registerCommand("ricwiz.whoToBlame",async()=>{let n=await Go();n&&e&&(e.setBlameData(n),e.setPage("blame"))}),C.commands.registerCommand("ricwiz.manualRefresh",()=>{o&&o()}),C.commands.registerCommand("ricwiz.toggleAutoRefresh",()=>{if(e){let n=!e.isAutoRefreshEnabled();e.setAutoRefresh(n),C.workspace.getConfiguration("ricwiz").update("autoRefresh",n,C.ConfigurationTarget.Global)}}),C.commands.registerCommand("ricwiz.openSettings",()=>{C.commands.executeCommand("workbench.action.openSettings","ricwiz")}))}var C,_o=R(()=>{"use strict";C=y(require("vscode"));kt();$t();Bt();Nt();Wt();Vt();oo();so();mo();uo();fo();wo();yo();Qe();xo();$o();Ro();Po();Eo();Mo();Ao();Fo();No();jo();Wo();Ho()});function Qo(t,e,o){let n,s=ae.workspace.getConfiguration("ricwiz").get("autoRefresh",!0);e?.setAutoRefresh(s),t.subscriptions.push(ae.workspace.onDidChangeConfiguration(c=>{if(c.affectsConfiguration("ricwiz.autoRefresh")){let u=ae.workspace.getConfiguration("ricwiz").get("autoRefresh",!0);e?.setAutoRefresh(u)}}));async function l(){let c=ae.extensions.getExtension("vscode.git");if(c){let d=function(i){let a="",r;async function m(){let f=ae.workspace.workspaceFolders;if(!f)return;let w=f[0].uri.fsPath,v=await F(w);if(v&&v!==a){a=v;let x=ae.workspace.getConfiguration("ricwiz"),z=x.get("ticketPrefix","SFPSCA-");if(!v.includes(z)){let T=v.match(/([A-Z]+-)\d+/i);T&&(z=T[1].toUpperCase())}let B=[],N=[],ue=[],E=[],I=await D.initialize(w,{skipPrompt:!0}),X=I?.environments||x.get("environments",[{name:"Qual",sourceBranch:"quality"},{name:"Val",sourceBranch:"validation"},{name:"Prod",sourceBranch:"main"}]);try{let T=x.get("workspaceCheckoutButtons",["main","quality","validation"]);ue=Array.from(new Set(T))}catch{}let H="",ce=v.match(new RegExp(`(${z}\\d+(?:-\\d+)?)`,"i"));if(ce){let T=ce[1].toUpperCase();H=T;let ve=x.get("commitMessageSuffix","- "),lt=/^[A-Z]+-\d+(?:-\d+)?\s*(?:-\s*|:\s*|\s+)?/i;lt.test(i.inputBox.value)?i.inputBox.value.toUpperCase().startsWith(T)||(i.inputBox.value=i.inputBox.value.replace(lt,`${T}${ve}`)):i.inputBox.value=`${T}${ve}`+i.inputBox.value,o.text=`$(bookmark) ${T}`,o.tooltip=`Branch: ${v}
Click to open Jira ticket`,o.show();try{let mt=await at(w,T,"");B=await it(w,mt,T,X,I)}catch{}}else{o.hide();try{E=await rt(w)}catch{}}let[Ne,Ue,we]=await Promise.all([st(w,10),nt(w,v,X,I),H?Ee(H).catch(T=>{let ve=T.message;return(ve.includes("ENOTFOUND")||ve.includes("network"))&&(ve="No Internet or Invalid URL"),{summary:`\u26A0\uFE0F Jira Error: ${ve}`,description:"",status:""}}):Promise.resolve(null)]);N=Ne;let Xe=we?we.summary:"",$e=we&&we.status||"";e?.updateBranch(v,Ue,B,N,ue,E,Xe,$e)}}function g(){e?.isAutoRefreshEnabled()&&(r&&clearTimeout(r),r=setTimeout(()=>{a="",m()},300))}n=()=>{a="",m()},m(),i.state.onDidChange(()=>g()),ae.window.onDidChangeWindowState(f=>{f.focused&&g()})};var u=d;c.isActive||await c.activate();let p=c.exports.getAPI(1);p.repositories.length>0&&p.repositories.forEach(i=>d(i)),p.onDidOpenRepository(i=>d(i))}}return l(),()=>{n&&n()}}var ae,Yo=R(()=>{"use strict";ae=y(require("vscode"));S();he();Ae();ee()});var He={};Je(He,{activate:()=>di,deactivate:()=>li,webviewProvider:()=>Fe});module.exports=U(He);function di(t){gt(t),Fe=new We(t.extensionUri),t.subscriptions.push(Oe.window.registerWebviewViewProvider("ricwiz-webview",Fe));let e=Oe.window.createStatusBarItem(Oe.StatusBarAlignment.Left,100);e.command="ricwiz.openJiraTicket",t.subscriptions.push(e);let o=Qo(t,Fe,e);Vo(t,Fe,o)}function li(){}var Oe,Fe,Ve=R(()=>{Oe=y(require("vscode"));ut();ze();_o();Yo()});Ve();0&&(module.exports={activate,deactivate,webviewProvider});
