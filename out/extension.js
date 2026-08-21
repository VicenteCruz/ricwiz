"use strict";var Yt=Object.create;var ke=Object.defineProperty;var Qt=Object.getOwnPropertyDescriptor;var Zt=Object.getOwnPropertyNames;var Xt=Object.getPrototypeOf,Kt=Object.prototype.hasOwnProperty;var k=(e,t,o)=>()=>{if(o)throw o[0];try{return e&&(t=e(e=0)),t}catch(i){throw o=[i],i}};var Fe=(e,t)=>{for(var o in t)ke(e,o,{get:t[o],enumerable:!0})},Le=(e,t,o,i)=>{if(t&&typeof t=="object"||typeof t=="function")for(let n of Zt(t))!Kt.call(e,n)&&n!==o&&ke(e,n,{get:()=>t[n],enumerable:!(i=Qt(t,n))||i.enumerable});return e};var b=(e,t,o)=>(o=e!=null?Yt(Xt(e)):{},Le(t||!e||!e.__esModule?ke(o,"default",{value:e,enumerable:!0}):o,e)),me=e=>Le(ke({},"__esModule",{value:!0}),e);var Te={};Fe(Te,{checkBranchExists:()=>ee,exec:()=>m,extractTicketSuggestion:()=>Ne,getCurrentBranch:()=>T,getWorkspaceCwd:()=>y,normalizeTicketId:()=>We,promptForTicketId:()=>F,resolvePrefix:()=>Oe,ricwizLogger:()=>Q});function y(){let e=ue.workspace.workspaceFolders;if(e)return e[0].uri.fsPath}async function T(e){try{let{stdout:t}=await m("git branch --show-current",{cwd:e});return t.trim()}catch{return""}}function Oe(e,t){if(!e.includes(t)){let o=e.match(/([A-Z]+-)\d+/i);if(o)return o[1].toUpperCase()}return t}function Ne(e,t,o=!1){let i=e.match(new RegExp(`(${t}\\d+)`,"i"));return i?i[1].toUpperCase():e.includes(t)&&!e.includes("-to-")?e.substring(e.indexOf(t)):o&&e.includes("-to-")?e.substring(e.indexOf(t)).split("-to-")[0]:""}function We(e,t){let o=e.trim();return/^\d/.test(o)?`${t}${o}`.toUpperCase():o.toUpperCase()}async function F(e,t){let o=ue.workspace.getConfiguration("ricwiz"),i=t?.prefix??o.get("ticketPrefix","SFPSCA-"),n=await T(e),r=Oe(n,i),s=Ne(n,r,t?.handleToSuffix),p=await ue.window.showInputBox({prompt:t?.prompt||"Enter the full ticket ID (e.g., SCPSCA-1234) or just the number",placeHolder:t?.placeHolder||"Ticket ID or number",value:s});return p?{ticketId:We(p,r),currentBranch:n,prefix:r}:void 0}async function ee(e,t){try{return await m(`git show-ref --verify --quiet refs/heads/${t}`,{cwd:e}),!0}catch{}try{return await m(`git show-ref --verify --quiet refs/remotes/origin/${t}`,{cwd:e}),!0}catch{}return!1}var ue,Ie,Ue,eo,Q,m,C=k(()=>{"use strict";ue=b(require("vscode")),Ie=b(require("child_process")),Ue=b(require("util")),eo=Ue.promisify(Ie.exec),Q=ue.window.createOutputChannel("Ricwiz"),m=async(e,t)=>{Q.appendLine(`[EXEC] ${e}`);let o=await eo(e,{maxBuffer:50*1024*1024,...t});return{stdout:o.stdout.toString(),stderr:o.stderr.toString()}}});function je(){let e=new Map;function t(i,n){let r=n,s=e.get(r);if(s)return s;let p=(async()=>{try{let{stdout:g}=await m(`git rev-parse origin/${n}`,{cwd:i});return g.trim()}catch{let{stdout:g}=await m(`git rev-parse ${n}`,{cwd:i});return g.trim()}})();return e.set(r,p),p}function o(i,n){let r=`branch:${n}`,s=e.get(r);if(s)return s;let p=(async()=>{let{stdout:g}=await m(`git rev-parse ${n}`,{cwd:i});return g.trim()})();return e.set(r,p),p}return{resolveEnvRef:t,resolveBranchRef:o}}async function He(e,t,o,i,n){try{if(!(await m(`git --no-pager log ${t} --grep="\\\\b${o}\\\\b" -i -E -1 --format="%h"`,{cwd:e}).catch(()=>({stdout:"",stderr:""}))).stdout.trim())return!1;let[s,p]=await Promise.all([n.resolveBranchRef(e,t),n.resolveEnvRef(e,i.sourceBranch)]);if(s===p)return!1;try{return await m(`git merge-base --is-ancestor ${t} origin/${i.sourceBranch}`,{cwd:e}),!0}catch{try{return await m(`git merge-base --is-ancestor ${t} ${i.sourceBranch}`,{cwd:e}),!0}catch{return!1}}}catch{return!1}}function qe(e,t){return t.find(o=>e.endsWith(`-to-${o.name}`))}async function Ve(e,t,o,i){let n=je();return await Promise.all(t.map(async s=>{let p=qe(s,i);if(!p)return{name:s,isMerged:!1};let g=await He(e,s,o,p,n);return{name:s,isMerged:g}}))}async function Ge(e,t,o){let i=qe(t,o);if(!i)return!1;let n=t.replace(new RegExp(`-to-${i.name}$`,"i"),""),r=je();return He(e,t,n,i,r)}async function _e(e,t=10){try{let{stdout:o}=await m(`git log --oneline -${t} --format="%h|||%s|||%ar"`,{cwd:e});return o.split(`
`).filter(i=>i.trim()).map(i=>{let n=i.split("|||");return{hash:n[0]||"",message:n.length>=3?n.slice(1,-1).join("|||"):n[1]||"",timeAgo:n.length>=3?n[n.length-1]:""}})}catch{return[]}}async function Je(e,t=3){try{let{stdout:o}=await m('git for-each-ref --sort=-committerdate --format="%(refname:short)" refs/heads/',{cwd:e}),i=o.split(`
`).map(r=>r.trim()).filter(r=>r),n=/^[A-Z]+-\d+$/i;return i.filter(r=>n.test(r)).slice(0,t)}catch{return[]}}async function Ye(e,t,o){let{stdout:i}=await m(`git branch --list "*${t}*"`,{cwd:e});return i.split(`
`).map(n=>n.replace("*","").trim()).filter(n=>n&&n!==o)}var Qe=k(()=>{"use strict";C()});function S(e){return e.replace(/&/g,"&amp;").replace(/</g,"&lt;").replace(/>/g,"&gt;").replace(/"/g,"&quot;").replace(/'/g,"&#39;")}var x,Ce,Ze=k(()=>{"use strict";x=b(require("vscode"));Ce=class{constructor(t){this._extensionUri=t}_extensionUri;webviewView;resolveWebviewView(t,o,i){this.webviewView=t,t.webview.options={enableScripts:!0,localResourceRoots:[this._extensionUri]},this.updateBranch("",!1),t.webview.onDidReceiveMessage(n=>{switch(n.command){case"createBranches":x.commands.executeCommand("ricwiz.createBranches");break;case"prepareDeploy":x.commands.executeCommand("ricwiz.prepareDeploy");break;case"openMRs":x.commands.executeCommand("ricwiz.createMergeRequests");break;case"openMRsVSCode":x.commands.executeCommand("ricwiz.createMergeRequestsVSCode");break;case"openJira":x.commands.executeCommand("ricwiz.openJiraTicket");break;case"openJiraVSCode":x.commands.executeCommand("ricwiz.openJiraTicketVSCode");break;case"openSettings":x.commands.executeCommand("ricwiz.openSettings");break;case"checkout":n.branch&&x.commands.executeCommand("ricwiz.checkoutBranch",n.branch);break;case"copyBranch":x.commands.executeCommand("ricwiz.copyBranchName");break;case"generatePackageXml":x.commands.executeCommand("ricwiz.generatePackageXml");break;case"openDevTools":this.setPage("devtools");break;case"openMain":this.setPage("main");break;case"generateDestructiveChanges":x.commands.executeCommand("ricwiz.generateDestructiveChanges");break;case"deployPackage":x.commands.executeCommand("ricwiz.deployPackage");break;case"runSmartTests":x.commands.executeCommand("ricwiz.runSmartTests");break;case"importData":x.commands.executeCommand("ricwiz.importData");break;case"listTicketFiles":x.commands.executeCommand("ricwiz.listTicketFiles");break;case"resetTracking":x.commands.executeCommand("ricwiz.resetTracking");break;case"extractComponent":x.commands.executeCommand("ricwiz.extractComponent");break;case"captureAdminChanges":x.commands.executeCommand("ricwiz.captureAdminChanges");break;case"whoToBlame":x.commands.executeCommand("ricwiz.whoToBlame");break;case"syncAll":x.commands.executeCommand("ricwiz.syncAll");break;case"updateBases":x.commands.executeCommand("ricwiz.updateBases");break;case"deleteUnused":x.commands.executeCommand("ricwiz.deleteUnusedBranches");break;case"conflict_commitAndContinue":x.commands.executeCommand("ricwiz.conflictAction","commitAndContinue");break;case"conflict_resolveDeletions":x.commands.executeCommand("ricwiz.conflictAction","resolveDeletions");break;case"conflict_abortDeploy":x.commands.executeCommand("ricwiz.conflictAction","abortDeploy");break;case"openFile":if(n.file){let r=x.workspace.workspaceFolders;if(r){let s=x.Uri.joinPath(r[0].uri,n.file);x.commands.executeCommand("vscode.open",s)}}break;case"searchTicket":x.commands.executeCommand("ricwiz.searchTicket");break;case"manualRefresh":x.commands.executeCommand("ricwiz.manualRefresh");break;case"toggleAutoRefresh":x.commands.executeCommand("ricwiz.toggleAutoRefresh");break;case"openHistory":x.commands.executeCommand("ricwiz.openHistory");break}})}conflictState=null;setConflictState(t){this.conflictState=t,this.updateView()}updateBranch(t,o,i=[],n=[],r=[],s=[]){this.webviewView&&(this.currentBranchCache=t,this.currentBranchIsMergedCache=o,this.relatedBranchesCache=i,this.commitsCache=n,this.baseBranchesCache=r,this.recentTicketsCache=s,this.updateView())}currentBranchCache="";currentBranchIsMergedCache=!1;relatedBranchesCache=[];commitsCache=[];baseBranchesCache=[];recentTicketsCache=[];currentPage="main";blameDataCache=null;autoRefreshEnabled=!0;setBlameData(t){this.blameDataCache=t}setAutoRefresh(t){this.autoRefreshEnabled=t,this.updateView()}isAutoRefreshEnabled(){return this.autoRefreshEnabled}setPage(t){this.currentPage=t,this.updateView()}updateView(){if(!this.webviewView)return;let t=this.webviewView.webview.asWebviewUri(x.Uri.joinPath(this._extensionUri,"resources","logo.png"));this.webviewView.webview.html=this._getHtmlForWebview(t,this.currentBranchCache,this.relatedBranchesCache,this.commitsCache,this.baseBranchesCache,this.recentTicketsCache,this.currentPage)}_getHtmlForWebview(t,o,i,n,r,s,p){let g=n.length>0?`
            <div class="separator"></div>
            <div style="padding: 0 4px;">
                <div style="font-size: 11px; opacity: 0.7; margin-bottom: 6px; display: flex; align-items: center; gap: 4px;">
                    <span>\u{1F4DC}</span> Recent Commits
                </div>
                <div style="display: flex; flex-direction: column; gap: 2px;">
                    ${n.map(d=>`
                        <div style="font-size: 11px; padding: 3px 4px; border-radius: 2px; display: flex; gap: 6px; align-items: baseline;">
                            <code style="color: var(--vscode-textLink-foreground); font-size: 10px; flex-shrink: 0;">${S(d.hash)}</code>
                            <span style="flex: 1; overflow: hidden; text-overflow: ellipsis; white-space: nowrap;" title="${S(d.message)}">${S(d.message)}</span>
                            <span style="font-size: 9px; opacity: 0.5; flex-shrink: 0;">${S(d.timeAgo)}</span>
                        </div>
                    `).join("")}
                </div>
            </div>
        `:"",f=`
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
        `;if(this.conflictState){let d=(this.conflictState.files||[]).map(u=>`
                <button class="btn" style="padding: 6px; font-size: 12px; display: flex; justify-content: space-between; align-items: center;" onclick="sendOpenFileCommand('${S(u.file)}')">
                    <span style="flex: 1; overflow: hidden; text-overflow: ellipsis; white-space: nowrap; direction: rtl; text-align: left;">&lrm;${S(u.file)}</span>
                    <span style="font-size: 10px; opacity: 0.8; flex-shrink: 0; background-color: var(--vscode-badge-background); color: var(--vscode-badge-foreground); padding: 2px 4px; border-radius: 2px;">${S(u.state)}</span>
                </button>
            `).join("");return`<!DOCTYPE html>
            <html lang="en">
            <head>
                <meta charset="UTF-8">
                <meta name="viewport" content="width=device-width, initial-scale=1.0">
                <title>Ricwiz Conflict</title>
                ${f}
            </head>
            <body>
                <div style="text-align: center; margin-bottom: 12px; margin-top: 8px;">
                    <img src="${t}" alt="Ricwiz Logo" style="width: 80px; height: 80px; opacity: 0.9;" />
                </div>
                <div style="background-color: var(--vscode-editorError-background); color: var(--vscode-editorError-foreground); padding: 12px; border-radius: 4px; margin-bottom: 12px; text-align: center;">
                    <div style="font-size: 14px; font-weight: bold; margin-bottom: 8px;">\u26A0\uFE0F MERGE CONFLICT</div>
                    <div style="font-size: 11px; margin-bottom: 12px; opacity: 0.9;">
                        Merging <b>${S(this.conflictState.sourceStr)}</b> into <b>${S(this.conflictState.targetStr)}</b>.<br/>
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
                
                ${d?`
                    <div style="font-size: 11px; opacity: 0.7; margin: 8px 4px 4px 4px; text-transform: uppercase;">Conflicted Files</div>
                    <div style="display: flex; flex-direction: column; gap: 2px;">
                        ${d}
                    </div>
                `:""}

                <script>
                    const vscode = acquireVsCodeApi();
                    function sendCommand(cmd) { vscode.postMessage({ command: cmd }); }
                    function sendOpenFileCommand(file) { vscode.postMessage({ command: 'openFile', file: file }); }
                </script>
            </body>
            </html>`}if(p==="blame"){let d=this.blameDataCache;return`<!DOCTYPE html>
            <html lang="en">
            <head>
                <meta charset="UTF-8">
                <meta name="viewport" content="width=device-width, initial-scale=1.0">
                <title>Ricwiz Blame</title>
                ${f}
            </head>
            <body>
                <div style="display: flex; align-items: center; gap: 8px; margin-bottom: 16px; margin-top: 8px;">
                    <button class="btn" style="width: auto; padding: 4px 8px; background-color: var(--vscode-button-secondaryBackground); color: var(--vscode-button-secondaryForeground);" onclick="sendCommand('openDevTools')">\u2B05\uFE0F Back</button>
                    <div style="font-weight: bold; font-size: 13px; flex: 1; text-align: center;">Who to Blame</div>
                </div>

                ${d?`
                <div style="padding: 12px; background: var(--vscode-editor-background); border: 1px solid var(--vscode-widget-border); border-radius: 6px; margin-bottom: 12px;">
                    <div style="font-weight: bold; margin-bottom: 12px; font-size: 14px; text-align: center; color: var(--vscode-textLink-foreground); word-break: break-all;">
                        \u{1F4C4} ${d.fileName}
                    </div>


                    <div style="margin-bottom: 20px;">
                        <div style="font-size: 11px; font-weight: bold; opacity: 0.8; text-transform: uppercase; margin-bottom: 8px;"><span class="icon">\u{1F4BB}</span> Local Git (Last Commits)</div>
                        <ul style="list-style-type: none; padding: 0; margin: 0; display: flex; flex-direction: column; gap: 8px;">
                            ${d.gitHistory&&d.gitHistory.length>0?d.gitHistory.map(u=>`
                                <li style="background: var(--vscode-editorWidget-background); border: 1px solid var(--vscode-widget-border); padding: 8px 10px; border-radius: 4px; border-left: 4px solid var(--vscode-gitDecoration-modifiedResourceForeground);">
                                    <div style="display: flex; justify-content: space-between; margin-bottom: 4px; align-items: center;">
                                        <strong style="font-size: 13px;">${u.author}</strong>
                                        <span style="opacity: 0.7; font-size: 11px;">${u.time}</span>
                                    </div>
                                    <div style="font-size: 12px; margin-bottom: 6px; opacity: 0.9; font-style: italic;">"${u.message}"</div>
                                    <div style="font-family: monospace; font-size: 10px; opacity: 0.6;">Commit: ${u.hash}</div>
                                </li>
                            `).join(""):'<li style="opacity:0.7; font-size: 12px;">No Git history found.</li>'}
                        </ul>
                    </div>

                    <div style="margin-bottom: 20px;">
                        <div style="font-size: 11px; font-weight: bold; opacity: 0.8; text-transform: uppercase; margin-bottom: 8px;"><span class="icon">\u2601\uFE0F</span> Salesforce Metadata</div>
                        <div style="display: flex; flex-direction: column; gap: 8px;">
                            <div style="background: var(--vscode-editorWidget-background); border: 1px solid var(--vscode-widget-border); padding: 8px 10px; border-radius: 4px; border-left: 4px solid var(--vscode-gitDecoration-addedResourceForeground);">
                                <div style="font-size: 10px; opacity: 0.7; text-transform: uppercase; margin-bottom: 2px;">Last Modified By</div>
                                <div style="font-weight: bold; font-size: 13px;">${d.sfAuthor}</div>
                                <div style="font-size: 11px; opacity: 0.7; margin-top: 2px;">${d.sfTime}</div>
                            </div>
                            ${d.sfCreatedBy!=="Unknown"&&d.sfCreatedBy!=="N/A"?`
                            <div style="background: var(--vscode-editorWidget-background); border: 1px solid var(--vscode-widget-border); padding: 8px 10px; border-radius: 4px; border-left: 4px solid var(--vscode-gitDecoration-addedResourceForeground);">
                                <div style="font-size: 10px; opacity: 0.7; text-transform: uppercase; margin-bottom: 2px;">Created By</div>
                                <div style="font-weight: bold; font-size: 13px;">${d.sfCreatedBy}</div>
                            </div>
                            `:""}
                        </div>
                    </div>

                    <div>
                        <div style="font-size: 11px; font-weight: bold; opacity: 0.8; text-transform: uppercase; margin-bottom: 8px;"><span class="icon">\u{1F575}\uFE0F</span> Setup Audit Trail (Recent)</div>
                        <ul style="list-style-type: none; padding: 0; margin: 0; display: flex; flex-direction: column; gap: 8px;">
                            ${d.auditHistory&&d.auditHistory.length>0?d.auditHistory.map(u=>`
                                <li style="background: var(--vscode-editorWidget-background); border: 1px solid var(--vscode-widget-border); padding: 8px 10px; border-radius: 4px; border-left: 4px solid var(--vscode-gitDecoration-untrackedResourceForeground);">
                                    <div style="display: flex; justify-content: space-between; margin-bottom: 4px; align-items: center;">
                                        <strong style="font-size: 13px;">${u.author}</strong>
                                        <span style="opacity: 0.7; font-size: 11px;">${u.time}</span>
                                    </div>
                                    <div style="font-size: 12px; font-weight: 500; margin-bottom: 4px;">${u.action}</div>
                                    <div style="font-size: 11px; opacity: 0.7; font-style: italic; background: var(--vscode-editor-background); padding: 4px; border-radius: 3px;">${u.display}</div>
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
            </html>`}return p==="devtools"?`<!DOCTYPE html>
            <html lang="en">
            <head>
                <meta charset="UTF-8">
                <meta name="viewport" content="width=device-width, initial-scale=1.0">
                <title>Ricwiz DevTools</title>
                ${f}
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
                        <span class="icon">\u{1FA84}</span> Extract Component
                    </button>

                    <button class="btn" title="Capture manual Admin changes via SetupAuditTrail" onclick="sendCommand('captureAdminChanges')">
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
            ${f}
        </head>
        <body>
            <div style="text-align: center; margin-bottom: 12px; margin-top: 8px;">
                <img src="${t}" alt="Ricwiz Logo" style="width: 80px; height: 80px; opacity: 0.9;" />
            </div>

            <div style="display: flex; align-items: center; justify-content: flex-end; gap: 4px; margin-bottom: 6px; padding: 0 4px;">
                <button class="copy-btn" onclick="sendCommand('manualRefresh')" title="Refresh branch status" style="font-size: 13px; padding: 2px 6px; opacity: 0.8;">
                    \u{1F504}
                </button>
                <button class="copy-btn" id="autoRefreshToggle" onclick="sendCommand('toggleAutoRefresh')" title="${this.autoRefreshEnabled?"Auto-refresh is ON \u2014 click to disable":"Auto-refresh is OFF \u2014 click to enable"}" style="font-size: 11px; padding: 2px 6px; border-radius: 3px; ${this.autoRefreshEnabled?"opacity: 0.9; background-color: var(--vscode-button-secondaryBackground);":"opacity: 0.5;"}">
                    ${this.autoRefreshEnabled?"\u26A1 Auto":"\u23F8\uFE0F Auto"}
                </button>
            </div>

            ${o?`<div style="background-color: var(--vscode-editor-inactiveSelectionBackground); padding: 8px; border-radius: 4px; margin-bottom: 12px; text-align: center;">
                    <div style="font-size: 11px; opacity: 0.8; margin-bottom: 4px; display: flex; align-items: center; justify-content: center; gap: 4px;">
                        Current Ticket / Branch
                        <button class="copy-btn" onclick="sendCommand('copyBranch')" title="Copy branch name to clipboard">\u{1F4CB}</button>
                    </div>
                    <div style="font-weight: bold; font-size: 13px; word-break: break-all;">
                        ${S(o)} ${this.currentBranchIsMergedCache?'<span style="margin-left: 4px;" title="Merged to target env">\u2705</span>':""}
                    </div>
                    ${i.length>0?`
                        <div style="margin-top: 8px; border-top: 1px solid var(--vscode-panel-border); padding-top: 8px;">
                            <div style="font-size: 10px; opacity: 0.7; margin-bottom: 4px;">Sister Branches</div>
                            <div style="display: flex; flex-direction: column; gap: 4px;">
                                ${i.map(d=>`
                                    <div class="btn" style="padding: 4px; font-size: 11px; justify-content: center; background-color: var(--vscode-button-secondaryBackground); color: var(--vscode-button-secondaryForeground);" onclick="sendCheckoutCommand('${S(d.name)}', this)" title="Checkout ${S(d.name)}">
                                        ${S(d.name)} ${d.isMerged?'<span style="margin-left: 4px;" title="Merged to target env">\u2705</span>':""}
                                    </div>
                                `).join("")}
                            </div>
                        </div>
                    `:s.length>0?`
                        <div style="margin-top: 8px; border-top: 1px solid var(--vscode-panel-border); padding-top: 8px;">
                            <div style="font-size: 10px; opacity: 0.7; margin-bottom: 4px;">Recent Tickets</div>
                            <div style="display: flex; flex-direction: column; gap: 4px;">
                                ${s.map(d=>`
                                    <div class="btn" style="padding: 4px; font-size: 11px; justify-content: center; background-color: var(--vscode-button-secondaryBackground); color: var(--vscode-button-secondaryForeground);" onclick="sendCheckoutCommand('${S(d)}', this)" title="Checkout ${S(d)}">
                                        ${S(d)}
                                    </div>
                                `).join("")}
                            </div>
                        </div>
                    `:""}
                    <div style="display: flex; gap: 4px; margin-top: 8px; justify-content: flex-end;">
                        <button class="btn" style="width: auto; padding: 4px 6px; font-size: 11px; opacity: 0.8; border: 1px solid var(--vscode-panel-border);" onclick="sendCommand('searchTicket')" title="Search branches by ticket number">
                            <span class="icon" style="font-size: 12px; margin-right: 2px;">\u{1F50D}</span> Search
                        </button>
                        <button class="btn" style="width: auto; padding: 4px 6px; font-size: 11px; opacity: 0.8; border: 1px solid var(--vscode-panel-border);" onclick="sendCommand('openHistory')" title="View recent branches history">
                            <span class="icon" style="font-size: 12px; margin-right: 2px;">\u{1F570}\uFE0F</span> History
                        </button>
                    </div>
                </div>`:""}

            ${r.length>0?`
                <div style="display: flex; gap: 4px; margin-bottom: 12px; flex-wrap: wrap; justify-content: center;">
                    ${r.map(d=>`
                        <button class="btn" style="flex: 1; min-width: 25%; justify-content: center; padding: 6px 4px; font-size: 10px; font-weight: bold; background-color: var(--vscode-button-secondaryBackground); color: var(--vscode-button-secondaryForeground); border: 1px solid var(--vscode-panel-border);" onclick="sendCheckoutCommand('${S(d)}', this)" title="Checkout ${S(d)}">
                            ${S(d.toUpperCase())}
                        </button>
                    `).join("")}
                </div>
            `:""}

            <button class="btn" title="Generates the main and environment branches" onclick="sendCommand('createBranches')">
                <span class="icon">\u{1F33F}</span> Create Branches
            </button>

            <button class="btn" title="Sync environments and merge ticket" onclick="sendCommand('prepareDeploy')">
                <span class="icon">\u{1F500}</span> Prepare Deploy
            </button>

            <div style="display: flex; gap: 4px;">
                <button class="btn" style="flex: 1;" title="Opens Merge Request pages in Browser" onclick="sendCommand('openMRs')">
                    <span class="icon">\u{1F680}</span> Open MRs
                </button>
                <button class="btn" style="width: auto; padding: 6px 8px; font-weight: bold; justify-content: center;" title="Open MRs in VS Code" onclick="sendCommand('openMRsVSCode')">
                    VS
                </button>
            </div>

            <div style="display: flex; gap: 4px;">
                <button class="btn" style="flex: 1;" title="Open Jira Ticket in Browser" onclick="sendCommand('openJira')">
                    <span class="icon">\u{1F3AB}</span> Open Jira Ticket
                </button>
                <button class="btn" style="width: auto; padding: 6px 8px; font-weight: bold; justify-content: center;" title="Open Jira in VS Code" onclick="sendCommand('openJiraVSCode')">
                    VS
                </button>
            </div>

            <div class="separator"></div>

            <button class="btn" title="Fetch and pull all branches of the current ticket" onclick="sendCommand('syncAll')">
                <span class="icon">\u{1F504}</span> Sync All
            </button>

            <button class="btn" title="Merge latest team changes from origin base into environment branches" onclick="sendCommand('updateBases')">
                <span class="icon">\u23EC</span> Update from Base
            </button>

            <button class="btn" title="Delete all branches of a ticket (local and remote)" onclick="sendCommand('deleteUnused')">
                <span class="icon">\u{1F5D1}\uFE0F</span> Delete Unused Branches
            </button>

            ${g}

            <div class="separator"></div>

            <div style="display: flex; gap: 4px;">
                <button class="btn" style="flex: 1; opacity: 0.8;" title="Extension Settings" onclick="sendCommand('openSettings')">
                    <span class="icon">\u2699\uFE0F</span> Settings
                </button>
                <button class="btn" style="flex: 1; opacity: 0.8;" title="Developer Utilities" onclick="sendCommand('openDevTools')">
                    <span class="icon">\u{1F6E0}\uFE0F</span> Dev Tools
                </button>
            </div>
            
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
        </html>`}}});var ae,Xe=k(()=>{"use strict";ae=class{static isValidShellArg(t){return t?/^[a-zA-Z0-9\-_/.]+$/.test(t):!1}}});var we,Ke,$e,G,ve=k(()=>{"use strict";we=b(require("vscode")),Ke=b(require("path")),$e=b(require("fs")),G=class e{style;upstreamRemote;originRemote;ticketSourceBranch;ticketPrefix;environments;static baseConfig=we.workspace.getConfiguration("ricwiz");constructor(t){let o=e.baseConfig;this.style=t?.workflowStyle||o.get("workflowStyle","standard"),this.style==="multi-remote"?(this.upstreamRemote=t?.upstreamRemote||o.get("upstreamRemote","salesforce-master"),this.originRemote=t?.originRemote||o.get("originRemote","origin")):(this.upstreamRemote="origin",this.originRemote="origin"),this.ticketSourceBranch=t?.ticketSourceBranch||o.get("ticketSourceBranch","main"),this.ticketPrefix=t?.ticketPrefix||o.get("ticketPrefix","SFPSCA-");let i=[{name:"Qual",sourceBranch:"quality"},{name:"Val",sourceBranch:"validation"},{name:"Prod",sourceBranch:"main"}];this.environments=t?.environments||o.get("environments",i)}static async initialize(t){let o=e.baseConfig.get("profiles",[]),i=Ke.join(t,"ricwiz.json");if($e.existsSync(i))try{let n=$e.readFileSync(i,"utf-8"),r=JSON.parse(n);r&&Array.isArray(r.profiles)&&(o=[...o,...r.profiles])}catch(n){we.window.showErrorMessage(`Ricwiz: Error parsing ricwiz.json: ${n.message}`)}if(o.length>0){let n=o.map(p=>p.name),r=await we.window.showQuickPick(n,{placeHolder:"Ricwiz: Select Workflow Profile",ignoreFocusOut:!0});if(!r)return;let s=o.find(p=>p.name===r);return new e(s)}return new e}buildUpstreamPath(t){return t.includes("/")?t:`${this.upstreamRemote}/${t}`}getFetchRemote(t){return t.includes("/")?t.split("/")[0]:this.upstreamRemote}getFetchBranch(t){return t.includes("/")?t.substring(t.indexOf("/")+1):t}}});async function et(){let e=y();if(!e){P.window.showErrorMessage("Open a folder or workspace that is a Git repository.");return}let t=await G.initialize(e);if(!t)return;let o=await F(e,{prefix:t.ticketPrefix});if(!o){P.window.showErrorMessage("Branch creation cancelled: Ticket not provided.");return}let{ticketId:i}=o,n=[{label:"Create Main Branch & Environments",description:"Creates the main ticket branch and all environment branches",value:"all"},{label:"Create Environments Only",description:"Creates only the environment branches (skip main branch)",value:"envs"}],r=await P.window.showQuickPick(n,{placeHolder:"What branches do you want to create?",title:"Ricwiz Branch Creation"});if(!r){P.window.showInformationMessage("Branch creation cancelled.");return}let s=t.ticketSourceBranch,p=t.environments,g=i;if(!ae.isValidShellArg(g)){P.window.showErrorMessage(`Invalid format for ticket ID: ${g}`);return}if(!ae.isValidShellArg(s)){P.window.showErrorMessage(`Invalid format for ticketSourceBranch in settings: ${s}`);return}for(let f of p){if(!ae.isValidShellArg(f.name)){P.window.showErrorMessage(`Invalid format for environment name in settings: ${f.name}`);return}if(!ae.isValidShellArg(f.sourceBranch)){P.window.showErrorMessage(`Invalid format for environment sourceBranch in settings: ${f.sourceBranch}`);return}}try{await m("git status",{cwd:e})}catch{P.window.showErrorMessage("The opened folder does not appear to be a valid Git repository.");return}try{await P.window.withProgress({location:P.ProgressLocation.Notification,title:"Ricwiz: Creating Branches",cancellable:!1},async f=>{let d=[];f.report({message:"Checking remote status (git fetch)...",increment:10});try{await m("git fetch",{cwd:e})}catch{}try{if(r.value==="all")if(f.report({message:`Creating main branch ${g}...`,increment:20}),await ee(e,g))P.window.showInformationMessage(`Ricwiz: The branch ${g} already exists. Skipping creation...`),await m(`git checkout ${g}`,{cwd:e});else try{let a=t.getFetchRemote(s),c=t.getFetchBranch(s),l=t.buildUpstreamPath(s);await m(`git fetch ${a} ${c}`,{cwd:e}),await m(`git checkout -b ${g} ${l}`,{cwd:e}),d.push(g)}catch{try{await m(`git checkout -b ${g} ${s}`,{cwd:e}),d.push(g)}catch{throw new Error(`Could not create main branch '${g}' from '${s}'. Does the source branch exist?`)}}let u=50/(p.length||1);for(let a of p){let c=`${i}-to-${a.name}`,l=a.sourceBranch;if(f.report({message:`Processing environment branch ${c}...`,increment:u}),!await ee(e,c))try{let w=t.buildUpstreamPath(l);await m(`git checkout -b ${c} ${w}`,{cwd:e}),d.push(c)}catch{try{await m(`git checkout -b ${c} ${l}`,{cwd:e}),d.push(c)}catch{throw new Error(`Could not create environment branch '${c}' from '${l}'. Does the source branch exist?`)}}}f.report({message:`Publishing branches to ${t.originRemote}...`,increment:10});for(let a of d)try{await m(`git push -u ${t.originRemote} ${a}`,{cwd:e})}catch{P.window.showWarningMessage(`Ricwiz: Branch ${a} was created locally but could not be pushed to ${t.originRemote}.`)}if(r.value==="all"){f.report({message:`Switching to ${g}...`,increment:10});try{await m(`git checkout ${g}`,{cwd:e})}catch{}}f.report({increment:100}),P.window.showInformationMessage("Ricwiz: All set! You can start working on your branches! \u{1F680}")}catch(u){if(P.window.showErrorMessage(`Ricwiz Branch Creation Failed: ${u.message}`),d.length>0){try{await m(`git checkout ${s}`,{cwd:e})}catch{}for(let a of d)try{await m(`git branch -D ${a}`,{cwd:e})}catch{}P.window.showWarningMessage(`Ricwiz: Rolled back (deleted) ${d.length} branch(es) locally due to failure.`)}}})}catch(f){P.window.showErrorMessage(`Ricwiz general error: ${f.message}`)}}var P,tt=k(()=>{"use strict";P=b(require("vscode"));C();Xe();ve()});async function te(e,t,o,i){i&&i.report({message:"CONFLICT! Resolve & click 'Commit & Continue' in Ricwiz panel."});let n=!1,r=!1,s=async()=>{try{let{stdout:d}=await m("git status --porcelain",{cwd:e});return d.split(`
`).filter(u=>{let a=u.substring(0,2);return["UD","DU","DD","AU","UA"].includes(a)}).map(u=>u.substring(3).trim())}catch{return[]}},p=async()=>{try{let{stdout:d}=await m("git status --porcelain",{cwd:e}),u=a=>a==="UU"?"Both Modified":a==="UD"?"Deleted by them":a==="DU"?"Deleted by us":a==="DD"?"Both Deleted":a==="AA"?"Both Added":a==="AU"?"Added by us":a==="UA"?"Added by them":"Conflicted";return d.split(`
`).map(a=>a.trimRight()).filter(a=>a.length>2).filter(a=>{let c=a.substring(0,2);return["UU","AA","UD","DU","AU","UA","DD"].includes(c)}).map(a=>{let c=a.substring(0,2);return{file:a.substring(3).trim(),state:u(c)}})}catch{return[]}},g=async()=>{if(n)return;let d=await s(),u=await p(),{webviewProvider:a}=(ze(),me(Re));a&&a.setConflictState({isConflict:!0,sourceStr:t,targetStr:o,deletionsCount:d.length,files:u})},f=_.commands.registerCommand("ricwiz.conflictAction",async d=>{if(d==="abortDeploy")r=!0;else if(d==="resolveDeletions"){try{let a=(await s()).map(l=>({label:l})),c=await _.window.showQuickPick(a,{canPickMany:!0,placeHolder:"Select conflicted files to DELETE",title:"Ricwiz: Delete Conflicted Files"});if(c&&c.length>0){for(let l of c)try{await m(`git rm --force "${l.label}"`,{cwd:e})}catch{}_.window.showInformationMessage(`Ricwiz: Deleted ${c.length} conflicted file(s).`)}}catch(u){_.window.showErrorMessage(`Ricwiz: Error. (${u.message})`)}g()}else if(d==="commitAndContinue")try{let a=(await s()).filter(l=>ot.existsSync(it.join(e,l)));if(a.length>0&&await _.window.showWarningMessage(`Wait! There are ${a.length} file(s) with deletion conflicts that are still on your disk.

If you commit now, you will KEEP them in the project.

Are you sure you want to KEEP them?`,{modal:!0},"Yes, KEEP them","No, let me DELETE them")!=="Yes, KEEP them"){g();return}let c=!1;try{let{stdout:l}=await m('git grep -E "^<<<<<<< "',{cwd:e});l.trim().length>0&&(c=!0)}catch{}if(c){_.window.showErrorMessage("Ricwiz: You still have unresolved conflict markers (<<<<<<<) in your files. Please resolve them first!"),g();return}await m("git add .",{cwd:e}),await m("git commit --no-edit",{cwd:e})}catch(u){_.window.showErrorMessage(`Ricwiz: Could not commit automatically. (${u.message})`),g()}});for(g();;){if(r){n=!0,f.dispose(),(ze(),me(Re)).webviewProvider?.setConflictState(null);try{await m("git merge --abort",{cwd:e})}catch{}return!1}try{let{stdout:d}=await m("git status --porcelain",{cwd:e});if(d.trim().length===0)return n=!0,f.dispose(),(ze(),me(Re)).webviewProvider?.setConflictState(null),_.window.showInformationMessage("Ricwiz: Changes committed!"),!0}catch{}await new Promise(d=>setTimeout(d,2e3))}}var _,ot,it,Be=k(()=>{"use strict";_=b(require("vscode")),ot=b(require("fs")),it=b(require("path"));C()});async function nt(){let e=y();if(!e){L.window.showErrorMessage("Ricwiz: Open a folder or workspace that is a Git repository.");return}try{await m("git status",{cwd:e})}catch{L.window.showErrorMessage("Ricwiz: The opened folder does not appear to be a valid Git repository.");return}let t=await G.initialize(e);if(!t)return;let o=t.environments,i=await F(e,{prefix:t.ticketPrefix});if(!i){L.window.showErrorMessage("Operation cancelled: Ticket not provided.");return}let{ticketId:n,currentBranch:r}=i,s=n;if(!await ee(e,s)){L.window.showErrorMessage(`Ricwiz: Main branch '${s}' does not exist! Prepare deploy is only available when a main ticket branch is used.`);return}await L.window.withProgress({location:L.ProgressLocation.Notification,title:"Ricwiz: Preparing Deploy",cancellable:!0},async(p,g)=>{let f=0,d=r,u=!1;g.onCancellationRequested(()=>{u=!0}),p.report({message:"Syncing remote information...",increment:10});try{await m("git fetch --all",{cwd:e});let c=10/(o.length||1);for(let l of o)try{if(u)throw new Error("Aborted");p.report({message:`Fetching ${l.sourceBranch}...`,increment:c});let w=t.getFetchRemote(l.sourceBranch),h=t.getFetchBranch(l.sourceBranch);await m(`git fetch ${w} ${h}:${h}`,{cwd:e})}catch{}}catch{}let a=60/(o.length||1);for(let c of o){if(u)break;let l=`${n}-to-${c.name}`,w=c.sourceBranch;try{p.report({message:`Processing ${l}...`,increment:a/4}),await m(`git checkout ${l}`,{cwd:e});try{await m(`git pull ${t.originRemote} ${l}`,{cwd:e})}catch{}try{p.report({message:`Merging ${w} into ${l}...`,increment:a/4});let h=t.getFetchRemote(w),R=t.getFetchBranch(w),$=t.buildUpstreamPath(w);await m(`git fetch ${h} ${R}`,{cwd:e}),await m(`git merge ${$}`,{cwd:e})}catch(h){let R=!1;try{let{stdout:D}=await m("git ls-files -u",{cwd:e});D.trim().length>0&&(R=!0)}catch{}let $=((h.stdout||"")+(h.stderr||"")+(h.message||"")).toLowerCase();if(R||$.includes("conflict")||$.includes("conflit")){let D=t.buildUpstreamPath(w);if(!await te(e,D,l,p))throw u=!0,new Error("Deploy aborted by user.")}else throw h}try{p.report({message:`Merging ${s} into ${l}...`,increment:a/4}),await m(`git merge ${s}`,{cwd:e})}catch(h){let R=!1;try{let{stdout:D}=await m("git ls-files -u",{cwd:e});D.trim().length>0&&(R=!0)}catch{}let $=((h.stdout||"")+(h.stderr||"")+(h.message||"")).toLowerCase();if(R||$.includes("conflict")||$.includes("conflit")){if(!await te(e,s,l,p))throw u=!0,new Error("Deploy aborted by user.")}else throw h}if(u)break;p.report({message:`Pushing ${l}...`,increment:a/4}),await m(`git push ${t.originRemote} ${l}`,{cwd:e}),f++}catch(h){h.message.includes("aborted")?L.window.showInformationMessage("Ricwiz: Deploy cancelled."):L.window.showErrorMessage(`Ricwiz: Failed to process branch ${l}. Detail: ${h.message}`);return}}if(!u){p.report({message:"Finishing up...",increment:10});let c=d;try{await m(`git show-ref --verify --quiet refs/heads/${s}`,{cwd:e}),c=s}catch{}try{let l=await T(e);c&&c!==l?(await m(`git checkout ${c}`,{cwd:e}),L.window.showInformationMessage(`Ricwiz: Operation complete. Back on branch ${c}.`)):L.window.showInformationMessage("Ricwiz: Operation complete.")}catch{L.window.showInformationMessage("Ricwiz: Operation complete.")}}})}var L,st=k(()=>{"use strict";L=b(require("vscode"));C();Be();ve()});async function rt(e=!1){let t=y();if(!t)return;let o=H.workspace.getConfiguration("ricwiz"),i=o.get("environments",[{name:"Qual",sourceBranch:"quality"},{name:"Val",sourceBranch:"validation"},{name:"Prod",sourceBranch:"main"}]),n=await F(t,{prompt:"Enter the full ticket ID for the Merge Requests (e.g., SCPSCA-1234) or just the number"});if(!n)return;let{ticketId:r}=n,s=o.get("gitlabUrlOverride",""),p="";if(s&&s.trim()!=="")p=s.trim();else{let g="";try{let{stdout:f}=await m("git remote get-url origin",{cwd:t});g=f.trim()}catch{H.window.showErrorMessage("Ricwiz: Could not get the remote origin URL. Please configure the URL manually in the extension settings.");return}p=g,p.endsWith(".git")&&(p=p.slice(0,-4)),p.startsWith("git@")&&(p=p.replace("git@","").replace(":","/"),p=`https://${p}`)}for(let g of i){let f=`${r}-to-${g.name}`,d=g.sourceBranch,u=`${p}/-/merge_requests/new?merge_request[source_branch]=${f}&merge_request[target_branch]=${d}`;e?H.commands.executeCommand("simpleBrowser.show",u):H.env.openExternal(H.Uri.parse(u))}H.window.showInformationMessage(`Ricwiz: Opening ${e?"VS Code browser":"external browser"} for Merge Requests!`)}async function at(){return rt(!1)}async function ct(){return rt(!0)}var H,dt=k(()=>{"use strict";H=b(require("vscode"));C()});async function lt(e=!1){let t=y();if(!t)return;let o=q.workspace.getConfiguration("ricwiz"),i=o.get("jiraUrl","");if(!i||i.trim()===""){q.window.showErrorMessage("Ricwiz: Jira URL is not configured. Please set it in the extension settings (e.g., https://jira.company.com/browse/).");return}let{getCurrentBranch:n,resolvePrefix:r,extractTicketSuggestion:s}=(C(),me(Te)),p=await n(t),g=o.get("ticketPrefix","SFPSCA-"),f=r(p,g),u=s(p,f,!0);if(u){let{normalizeTicketId:c}=(C(),me(Te));u=c(u,f)}else{let c=await F(t,{prompt:"Ricwiz could not detect the ticket from the branch name. Enter Jira ticket ID (e.g. SFPSCA-1234)",handleToSuffix:!0});if(!c)return;u=c.ticketId}let a=i.trim();a.endsWith("/")||(a+="/"),a+=u,e?q.commands.executeCommand("simpleBrowser.show",a):q.env.openExternal(q.Uri.parse(a)),q.window.showInformationMessage(`Ricwiz: Opening Jira Ticket ${u} in ${e?"VS Code":"browser"}!`)}async function mt(){return lt(!1)}async function ut(){return lt(!0)}var q,pt=k(()=>{"use strict";q=b(require("vscode"));C()});async function gt(){let e=y();if(!e){Z.window.showErrorMessage("Ricwiz: Open a folder or workspace that is a Git repository.");return}let t=await G.initialize(e);if(!t)return;let o=await F(e,{prefix:t.ticketPrefix,prompt:"Enter the full ticket ID to sync all branches for (e.g., SCPSCA-1234) or just the number"});if(!o)return;let{ticketId:i,currentBranch:n}=o;await Z.window.withProgress({location:Z.ProgressLocation.Notification,title:`Ricwiz: Syncing all branches for ${i}...`,cancellable:!1},async r=>{try{r.report({message:"Fetching from remote..."});try{await m("git fetch --all",{cwd:e})}catch{}let{stdout:s}=await m(`git branch --list "*${i}*"`,{cwd:e}),p=s.split(`
`).map(d=>d.replace("*","").trim()).filter(d=>d.length>0);if(p.length===0){Z.window.showWarningMessage(`Ricwiz: No local branches found for ${i}.`);return}let g=0,f=0;for(let d of p)if(r.report({message:`Syncing ${d}...`}),d===n)try{await m(`git pull ${t.originRemote} ${d}`,{cwd:e}),g++}catch(u){let a=!1;try{let{stdout:l}=await m("git ls-files -u",{cwd:e});l.trim().length>0&&(a=!0)}catch{}let c=((u.stdout||"")+(u.stderr||"")+(u.message||"")).toLowerCase();(a||c.includes("conflict")||c.includes("conflit"))&&await te(e,`${t.originRemote}/${d}`,d,r)?g++:f++}else try{await m(`git fetch ${t.originRemote} ${d}:${d}`,{cwd:e}),g++}catch{try{await m(`git checkout ${d}`,{cwd:e});try{await m(`git pull ${t.originRemote} ${d}`,{cwd:e}),g++}catch(a){let c=!1;try{let{stdout:w}=await m("git ls-files -u",{cwd:e});w.trim().length>0&&(c=!0)}catch{}let l=((a.stdout||"")+(a.stderr||"")+(a.message||"")).toLowerCase();(c||l.includes("conflict")||l.includes("conflit"))&&await te(e,`${t.originRemote}/${d}`,d,r)?g++:f++}await m(`git checkout ${n}`,{cwd:e})}catch{try{await m(`git checkout ${n}`,{cwd:e})}catch{}f++}}f>0?Z.window.showWarningMessage(`Ricwiz: Synced ${g}/${p.length} branches. ${f} branch(es) could not be synced (possible conflicts or diverged history).`):Z.window.showInformationMessage(`Ricwiz: \u{1F504} All ${g} branches for ${i} are up to date!`)}catch(s){Z.window.showErrorMessage(`Ricwiz: Sync failed: ${s.message}`)}})}var Z,ft=k(()=>{"use strict";Z=b(require("vscode"));C();Be();ve()});async function ht(){let e=y();if(!e){X.window.showErrorMessage("Ricwiz: Open a folder or workspace that is a Git repository.");return}try{await m("git status",{cwd:e})}catch{X.window.showErrorMessage("Ricwiz: The opened folder does not appear to be a valid Git repository.");return}let t=await G.initialize(e);if(!t)return;let o=t.environments,i=await F(e,{prefix:t.ticketPrefix});if(!i)return;let{ticketId:n,currentBranch:r}=i;await X.window.withProgress({location:X.ProgressLocation.Notification,title:"Ricwiz: Updating environment branches from their bases",cancellable:!0},async(s,p)=>{let g=0,f=r,d=!1;p.onCancellationRequested(()=>{d=!0}),s.report({message:"Syncing remote information...",increment:10});try{await m("git fetch --all",{cwd:e})}catch{}let u=80/(o.length||1);for(let a of o){if(d)break;let c=`${n}-to-${a.name}`,l=a.sourceBranch;if(await ee(e,c))try{s.report({message:`Processing ${c}...`,increment:u/2}),await m(`git checkout ${c}`,{cwd:e});try{s.report({message:`Merging ${l} into ${c}...`,increment:u/2});let w=t.getFetchRemote(l),h=t.getFetchBranch(l),R=t.buildUpstreamPath(l);await m(`git fetch ${w} ${h}`,{cwd:e}),await m(`git merge ${R}`,{cwd:e})}catch(w){let h=!1;try{let{stdout:$}=await m("git ls-files -u",{cwd:e});$.trim().length>0&&(h=!0)}catch{}let R=((w.stdout||"")+(w.stderr||"")+(w.message||"")).toLowerCase();if(h||R.includes("conflict")||R.includes("conflit")){let $=t.buildUpstreamPath(l);if(!await te(e,$,c,s))throw d=!0,new Error("Update aborted by user.")}else throw w}if(d)break;g++}catch(w){w.message.includes("aborted")?X.window.showInformationMessage("Ricwiz: Update cancelled."):X.window.showErrorMessage(`Ricwiz: Failed to update branch ${c}. Detail: ${w.message}`);return}}if(!d){s.report({message:"Finishing up...",increment:10});try{let a=await T(e);f&&f!==a&&await m(`git checkout ${f}`,{cwd:e})}catch{}X.window.showInformationMessage(`Ricwiz: Successfully updated ${g} environment branches from their bases!`)}})}var X,wt=k(()=>{"use strict";X=b(require("vscode"));C();Be();ve()});async function vt(){let e=y();if(!e){M.window.showErrorMessage("Ricwiz: Open a folder or workspace that is a Git repository.");return}let t=await T(e),o=M.workspace.getConfiguration("ricwiz");await M.window.withProgress({location:M.ProgressLocation.Notification,title:"Ricwiz: Scanning for unused local branches...",cancellable:!1},async()=>{try{await m("git fetch --prune",{cwd:e})}catch{}let i=[];try{let{stdout:u}=await m('git branch --format="%(refname:short)"',{cwd:e});i=u.split(`
`).map(a=>a.trim()).filter(a=>a.length>0)}catch{}if(i.length===0){M.window.showInformationMessage("Ricwiz: No local branches found.");return}let n=[];try{let{stdout:u}=await m('git branch -r --format="%(refname:short)"',{cwd:e});n=u.split(`
`).map(a=>a.trim().replace(/^origin\//,"").replace(/^[^\/]+\//,"")).filter(a=>a.length>0&&!a.includes("HEAD"))}catch{}let r=[];try{let{stdout:u}=await m('git for-each-ref --format="%(refname:short)|||%(upstream:track)" refs/heads/',{cwd:e});r=u.split(`
`).filter(a=>a.includes("[gone]")).map(a=>a.split("|||")[0].trim())}catch{}let s=i.filter(u=>!n.includes(u));if(s.length===0){M.window.showInformationMessage("Ricwiz: Your local repository is totally clean! All local branches exist on the remote.");return}let p=s.map(u=>{let a=r.includes(u),c=u===t,l="Not found on remote";return a&&(l="Deleted on remote [gone]"),c&&(l+=" (Current branch - will checkout main first)"),{label:u,description:l,picked:a&&!c}}),g=await M.window.showQuickPick(p,{canPickMany:!0,placeHolder:"Select local branches to delete",title:"Ricwiz: Delete Unused Branches"});if(!g||g.length===0){M.window.showInformationMessage("Ricwiz: No branches selected for deletion.");return}if(await M.window.showWarningMessage(`Ricwiz: Delete ${g.length} local branch(es)?
This cannot be undone!`,{modal:!0},"Yes, delete them")!=="Yes, delete them"){M.window.showInformationMessage("Ricwiz: Deletion cancelled.");return}let d=0;for(let u of g){let a=u.label;if(a===t){let c=o.get("ticketSourceBranch","main");try{await m(`git checkout ${c}`,{cwd:e}),t=c}catch{M.window.showWarningMessage(`Ricwiz: Could not switch away from ${a}. Skipping.`);continue}}try{await m(`git branch -D ${a}`,{cwd:e}),d++}catch{M.window.showWarningMessage(`Ricwiz: Could not delete local branch ${a}.`)}}M.window.showInformationMessage(`Ricwiz: \u{1F5D1}\uFE0F Cleaned up ${d} unused local branch(es).`)})}var M,yt=k(()=>{"use strict";M=b(require("vscode"));C()});async function pe(e){let t=y();t&&await K.window.withProgress({location:K.ProgressLocation.Notification,title:`Ricwiz: Switching to ${e}...`,cancellable:!1},async()=>{try{let o=await T(t),i=!1;try{let{stdout:n}=await m("git status --porcelain",{cwd:t});i=n.trim().length>0}catch{}if(i&&o)try{await m(`git stash push --include-untracked -m "ricwiz-auto:${o}"`,{cwd:t}),K.window.showInformationMessage(`Ricwiz: \u{1F4E6} Stashed changes from ${o}`)}catch{K.window.showWarningMessage("Ricwiz: Could not stash changes. Checkout may fail if there are conflicts.")}await m(`git checkout ${e}`,{cwd:t});try{let{stdout:n}=await m("git stash list",{cwd:t}),r=n.split(`
`);for(let s=0;s<r.length;s++)if(r[s].includes(`ricwiz-auto:${e}`)){let p=r[s].match(/stash@\{(\d+)\}/);p&&(await m(`git stash pop stash@{${p[1]}}`,{cwd:t}),K.window.showInformationMessage(`Ricwiz: \u{1F4E6} Restored stashed changes on ${e}`));break}}catch{K.window.showWarningMessage(`Ricwiz: Could not restore stashed changes on ${e}. You may need to resolve conflicts manually (check git stash list).`)}}catch{K.window.showErrorMessage(`Ricwiz: Could not checkout branch ${e}.`)}})}var K,Se=k(()=>{"use strict";K=b(require("vscode"));C()});async function bt(){let e=y();if(e)try{let{stdout:t}=await m("git branch --show-current",{cwd:e}),o=t.trim();o&&(await ye.env.clipboard.writeText(o),ye.window.showInformationMessage(`Ricwiz: \u{1F4CB} Copied "${o}" to clipboard`))}catch{ye.window.showErrorMessage("Ricwiz: Could not get the current branch name.")}}var ye,xt=k(()=>{"use strict";ye=b(require("vscode"));C()});async function Ct(){let e=y();if(!e){O.window.showErrorMessage("Ricwiz: Open a folder or workspace that is a Git repository.");return}let t=O.workspace.getConfiguration("ricwiz"),o=t.get("ticketSourceBranch","main"),n=t.get("packageXmlCommand",'sf sgd source delta --to "HEAD" --from "origin/{baseBranch}" --output-dir "."').replace("{baseBranch}",o);await O.window.showWarningMessage("Are you sure you want to generate the package.xml? This may overwrite existing local manifest files.",{modal:!0},"Yes, Generate")==="Yes, Generate"&&await O.window.withProgress({location:O.ProgressLocation.Notification,title:"Ricwiz: Generating package.xml using Salesforce CLI...",cancellable:!1},async()=>{try{await m(n,{cwd:e,maxBuffer:10*1024*1024}),O.window.showInformationMessage("Ricwiz: Successfully generated package.xml!");let s=Pe.join(e,"package","package.xml"),p=Pe.join(e,"package.xml"),g=Pe.join(e,"manifest","package.xml");for(let f of[s,p,g])if(kt.existsSync(f)){let d=await O.workspace.openTextDocument(f);await O.window.showTextDocument(d);break}}catch(s){O.window.showErrorMessage(`Ricwiz: Error running sf command - ${s.message}`)}})}var O,Pe,kt,$t=k(()=>{"use strict";O=b(require("vscode")),Pe=b(require("path")),kt=b(require("fs"));C()});async function Rt(){let e=y();if(!e){N.window.showErrorMessage("Ricwiz: Open a folder or workspace that is a Git repository.");return}let o=N.workspace.getConfiguration("ricwiz").get("deployCommand","sf project deploy start --manifest package/package.xml --post-destructive-changes destructiveChanges/destructiveChanges.xml -c -l NoTestRun -g");await N.window.showWarningMessage("Are you sure you want to deploy to Salesforce? This action modifies your org and cannot be easily undone.",{modal:!0},"Yes, Deploy")==="Yes, Deploy"&&await N.window.withProgress({location:N.ProgressLocation.Notification,title:"Ricwiz: Deploying package...",cancellable:!1},async()=>{try{let{stdout:n,stderr:r}=await m(o,{cwd:e,maxBuffer:52428800}),s=N.window.createOutputChannel("Ricwiz Deploy");s.appendLine(`Executing: ${o}`),s.appendLine(n),r&&(s.appendLine("--- STDERR ---"),s.appendLine(r)),s.show(),N.window.showInformationMessage("Ricwiz: Successfully ran deploy command!")}catch(n){let r=N.window.createOutputChannel("Ricwiz Deploy");r.appendLine(`Error executing: ${o}`),n.stdout&&r.appendLine(n.stdout),n.stderr&&r.appendLine(n.stderr),r.appendLine(n.message),r.show(),N.window.showErrorMessage("Ricwiz: Error running deploy command. See output channel for details.")}})}var N,zt=k(()=>{"use strict";N=b(require("vscode"));C()});async function Bt(){let e=y();if(!e){W.window.showErrorMessage("Ricwiz: Open a folder or workspace that is a Git repository.");return}let o=W.workspace.getConfiguration("ricwiz").get("importDataCommand","sfdx force:data:tree:import --plan data/plan.json");await W.window.showWarningMessage("Are you sure you want to import data into Salesforce? This action modifies records in your org.",{modal:!0},"Yes, Import")==="Yes, Import"&&await W.window.withProgress({location:W.ProgressLocation.Notification,title:"Ricwiz: Importing data...",cancellable:!1},async()=>{try{let{stdout:n,stderr:r}=await m(o,{cwd:e,maxBuffer:52428800}),s=W.window.createOutputChannel("Ricwiz Import Data");s.appendLine(`Executing: ${o}`),s.appendLine(n),r&&(s.appendLine("--- STDERR ---"),s.appendLine(r)),s.show(),W.window.showInformationMessage("Ricwiz: Successfully ran import data command!")}catch(n){let r=W.window.createOutputChannel("Ricwiz Import Data");r.appendLine(`Error executing: ${o}`),n.stdout&&r.appendLine(n.stdout),n.stderr&&r.appendLine(n.stderr),r.appendLine(n.message),r.show(),W.window.showErrorMessage("Ricwiz: Error running import data command. See output channel for details.")}})}var W,St=k(()=>{"use strict";W=b(require("vscode"));C()});async function Pt(){let e=y();if(!e){j.window.showErrorMessage("Ricwiz: Open a folder or workspace that is a Git repository.");return}let t="";try{t=await T(e)}catch{}let i=j.workspace.getConfiguration("ricwiz").get("ticketSourceBranch","main"),n=await j.window.showInputBox({prompt:`Enter the branch name to list modified files (compared to ${i})`,value:t,placeHolder:"SFPSCA-1234"});n&&await j.window.withProgress({location:j.ProgressLocation.Notification,title:`Ricwiz: Finding files for ${n}...`,cancellable:!1},async()=>{try{let r=n.replace(/-to-[a-zA-Z0-9]+$/i,""),s=[];try{let l="";try{let{stdout:w}=await m(`git merge-base origin/${i} ${n}`,{cwd:e});l=w.trim()}catch{let{stdout:w}=await m(`git merge-base ${i} ${n}`,{cwd:e});l=w.trim()}if(l){let{stdout:w}=await m(`git diff --name-only ${l} ${n}`,{cwd:e,maxBuffer:10485760});s=w.split(`
`).map(h=>h.trim()).filter(h=>h.length>0)}}catch{}let p=[];try{let{stdout:l}=await m(`git --no-pager log --grep="\\b${r}\\b" -i -E --name-only -m --first-parent --format=""`,{cwd:e,maxBuffer:10485760});p=l.split(`
`).map(w=>w.trim()).filter(w=>w.length>0)}catch{}let g=[...s,...p];if(g.length===0){j.window.showInformationMessage(`Ricwiz: No modified files found for ${n}.`);return}let f=Array.from(new Set(g)).sort(),d={};for(let l of f){let w=l.match(/default\/([^/]+)/),h=w&&w[1]?w[1].toUpperCase():"OUTROS";d[h]||(d[h]=[]),d[h].push(l)}let u=`Files modified in branch ${n}:
`,a=Object.keys(d).sort();for(let l of a)u+=`
=== ${l} ===
`,u+=d[l].join(`
`)+`
`;let c=await j.workspace.openTextDocument({content:u,language:"plaintext"});await j.window.showTextDocument(c)}catch(r){j.window.showErrorMessage(`Ricwiz: Error running git log - ${r.message}`)}})}var j,Mt=k(()=>{"use strict";j=b(require("vscode"));C()});async function Et(){let e=y();if(!e){V.window.showErrorMessage("Ricwiz: Open a folder or workspace that is a Git repository.");return}let o=V.workspace.getConfiguration("ricwiz").get("resetTrackingCommand","sf org disable tracking && sf project reset tracking --no-prompt");await V.window.withProgress({location:V.ProgressLocation.Notification,title:"Ricwiz: Resetting tracking...",cancellable:!1},async()=>{try{let{stdout:i,stderr:n}=await m(o,{cwd:e,maxBuffer:52428800}),r=V.window.createOutputChannel("Ricwiz Reset Tracking");r.appendLine(`Executing: ${o}`),r.appendLine(i),n&&(r.appendLine("--- STDERR ---"),r.appendLine(n)),r.show(),V.window.showInformationMessage("Ricwiz: Successfully reset tracking!")}catch(i){let n=V.window.createOutputChannel("Ricwiz Reset Tracking");n.appendLine(`Error executing: ${o}`),i.stdout&&n.appendLine(i.stdout),i.stderr&&n.appendLine(i.stderr),n.appendLine(i.message),n.show(),V.window.showErrorMessage("Ricwiz: Error resetting tracking. See output channel for details.")}})}var V,Dt=k(()=>{"use strict";V=b(require("vscode"));C()});async function Tt(){let e=y();if(!e){J.window.showErrorMessage("Ricwiz: Open a workspace first.");return}let t=["ApexClass","ApexTrigger","CustomObject","CustomField","LightningComponentBundle","AuraDefinitionBundle","Flow","CustomLabel","CustomMetadata","StaticResource","Profile","PermissionSet","PermissionSetGroup","Layout","ValidationRule","RecordType","ListView","Report","EmailTemplate","Other (Type manually)..."],o=await J.window.showQuickPick(t,{placeHolder:"Select Metadata Type to extract (e.g., ApexClass)",ignoreFocusOut:!0});if(!o||o==="Other (Type manually)..."&&(o=await J.window.showInputBox({prompt:"Enter Metadata Type (e.g., CustomApplication, Queue)",ignoreFocusOut:!0}),!o))return;let i=await J.window.showInputBox({prompt:`Enter component name for ${o} (use * for all, or exact name e.g. Account)`,placeHolder:"e.g. MyComponent or *",ignoreFocusOut:!0});i&&await J.window.withProgress({location:J.ProgressLocation.Notification,title:`Ricwiz: Extracting ${o}:${i} from Salesforce...`,cancellable:!0},async(n,r)=>{try{Q.show(!0);let s=`${o}:${i}`,{stdout:p,stderr:g}=await m(`sf project retrieve start -m "${s}"`,{cwd:e});p&&Q.appendLine(p),g&&Q.appendLine(g),J.window.showInformationMessage(`Ricwiz: Successfully extracted ${s}.`)}catch(s){Q.appendLine(`ERROR: ${s.message}`),s.stdout&&Q.appendLine(s.stdout),s.stderr&&Q.appendLine(s.stderr),J.window.showErrorMessage("Ricwiz: Extraction failed. See Output channel for details.")}})}var J,At=k(()=>{"use strict";J=b(require("vscode"));C()});async function Ft(){let e=y();if(!e){z.window.showErrorMessage("Ricwiz: Open a folder or workspace that is a Git repository.");return}let t=z.workspace.getConfiguration("ricwiz"),o=t.get("auditUsername",""),i=t.get("auditHours",8),n=await z.window.showInputBox({prompt:"Enter your Salesforce Username to query in SetupAuditTrail",value:o,placeHolder:"admin@tuaorg.com"});if(!n)return;let r=await z.window.showInputBox({prompt:"How many hours back do you want to search?",value:i.toString(),placeHolder:"8"});if(!r)return;let s=parseFloat(r);if(isNaN(s)||s<=0){z.window.showErrorMessage("Ricwiz: Invalid hours specified.");return}let p=new Date(Date.now()-s*60*60*1e3).toISOString(),f=`sf data query -q "${`SELECT Action, Display, Section FROM SetupAuditTrail WHERE CreatedBy.Username = '${n}' AND CreatedDate >= ${p}`}" --json`;await z.window.withProgress({location:z.ProgressLocation.Notification,title:"Ricwiz: Interrogating Setup Audit Trail...",cancellable:!1},async()=>{try{let{stdout:d}=await m(f,{cwd:e,maxBuffer:52428800}),u=JSON.parse(d);if(!u.result||u.result.records.length===0){z.window.showInformationMessage(`Ricwiz: No changes found for ${n} in the last ${s} hours.`);return}let a=u.result.records,c=[],l=new Set;for(let B of a){let U=to(B.Action,B.Display,B.Section);if(U){let ie=`${U.isDelete?"DEL":"ADD"}-${U.metadataFormat}`;if(!l.has(ie)){l.add(ie);let ne=U.isDelete?"$(trash)":"$(plus)";c.push({label:`${ne} ${U.metadataFormat}`,description:`${B.Action} -> ${B.Display}`,metadataFormat:U.metadataFormat,isDelete:U.isDelete})}}}if(c.length===0){z.window.showInformationMessage(`Ricwiz: No extractable metadata changes found for ${n} in the last ${s} hours (ignored passwords/logins).`);return}let w=await z.window.showQuickPick(c,{canPickMany:!0,placeHolder:"Select the changes you want to extract to GitLab",ignoreFocusOut:!0});if(!w||w.length===0){z.window.showInformationMessage("Ricwiz: No changes selected.");return}let h=w.filter(B=>B.isDelete),R=w.filter(B=>!B.isDelete),$=z.window.createOutputChannel("Ricwiz Admin Bridge");if($.show(),h.length>0){let{stdout:B}=await m("git ls-files",{cwd:e}),U=B.split(`
`).map(ne=>ne.trim()),ie=0;for(let ne of h){let E=ne.metadataFormat.split(":"),se=E[0],re=E[1],fe=re;se==="CustomField"&&(fe=re.split(".")[1]);let Jt=U.filter(xe=>{let he=Ee.basename(xe);return he.startsWith(fe+".")&&he.includes(se==="CustomField"?".field":"")});for(let xe of Jt){let he=Ee.join(e,xe);Me.existsSync(he)&&(Me.unlinkSync(he),$.appendLine(`Deleted local file: ${xe}`),ie++)}}z.window.showInformationMessage(`Ricwiz: Deleted ${ie} local files from Git workspace.`)}if(R.length===0)return;let D=R.map(B=>B.metadataFormat).filter(B=>B!=="").join(", "),de=await z.window.showInputBox({prompt:"Review and adjust the metadata components to retrieve",value:D,ignoreFocusOut:!0});if(!de)return;let ge=`sf project retrieve start -m "${de}"`;$.appendLine(`Executing: ${ge}`),z.window.showInformationMessage(`Ricwiz: Extracting ${R.length} components...`);let le=await m(ge,{cwd:e});$.appendLine(le.stdout),le.stderr&&($.appendLine("--- STDERR ---"),$.appendLine(le.stderr)),z.window.showInformationMessage("Ricwiz: Changes extracted successfully! Ready for Git Commit.")}catch(d){z.window.showErrorMessage(`Ricwiz: Error capturing changes - ${d.message}`)}})}function to(e,t,o){if(!e||!t||!o)return null;let i=e.toLowerCase(),n=o.toLowerCase();if(["security controls","network access","session settings","data export","login history","password policies","identity verification","delegated administration"].includes(n)||i.includes("login")||i.includes("password")||i.includes("oauth")||i.includes("session"))return null;let s=i.includes("delete"),p=null;if(i==="permissionsetgroupcomponentadd"||i==="permissionsetgroupcomponentdelete")return null;let g=(f,d=!1)=>{let u=f.replace(/\(.*\)/g,"").trim();u.includes(":")&&!i.includes("calculation")&&(u=u.split(":")[0]);let a=["disabled","deleted","removed","created","changed","updated","from","to","on","assigned","assign","assignment","permission","set","group","apex","class","trigger","custom","field","object","layout","validation","rule","flow","profile"],c=u.split(/\s+/);if(d){for(;c.length>0&&a.includes(c[c.length-1].toLowerCase());)c.pop();for(;c.length>0&&a.includes(c[0].toLowerCase());)c.shift();return c.join(" ").trim().replace(/[^a-zA-Z0-9_ ]/g,"")}else return c.filter(h=>!a.includes(h.toLowerCase())).join("_").replace(/[^a-zA-Z0-9_]/g,"")||u.replace(/\s+/g,"")};if(i.includes("profile"))p=`Profile:${g(t,!0)}`;else if(i.includes("permissionsetgroupcalculation")){let f=t.split(":");p=`PermissionSetGroup:${f.length>1?f[f.length-1].trim():g(t,!1)}`}else if(i.includes("permission set group")||i.includes("permissionsetgroup"))p=`PermissionSetGroup:${g(t,!1)}`;else if(i.includes("permission set")||i.includes("permissionset"))p=`PermissionSet:${g(t,!1)}`;else if(i.includes("apexclass"))p=`ApexClass:${g(t,!1)}`;else if(i.includes("apextrigger")||i.includes("apex trigger"))p=`ApexTrigger:${g(t,!1)}`;else if(i.includes("customfield")){let f=t.match(/([A-Za-z0-9_]+__c)/),d=t.match(/(?:on|na|for)\s+([A-Za-z0-9_]+)/i);f&&d?p=`CustomField:${d[1]}.${f[1]}`:p=`CustomField:${g(t,!1)}`}else if(i.includes("layout"))p=`Layout:${g(t,!0)}`;else if(i.includes("validation"))p=`ValidationRule:${g(t,!1)}`;else if(i.includes("flow"))p=`Flow:${g(t,!1)}`;else if(i.includes("customobject")){let f=t.match(/([A-Za-z0-9_]+__c)/);p=f?`CustomObject:${f[1]}`:`CustomObject:${g(t,!1)}`}else if(!i.includes("created")&&!i.includes("changed")&&!i.includes("deleted"))return null;return p?{metadataFormat:p,isDelete:s}:null}var z,Me,Ee,Lt=k(()=>{"use strict";z=b(require("vscode")),Me=b(require("fs")),Ee=b(require("path"));C()});async function It(){let e=y();if(e)try{let{stdout:t}=await m('git for-each-ref --sort=-committerdate --format="%(refname:short)|||%(committerdate:relative)|||%(subject)" refs/heads/',{cwd:e}),o=t.split(`
`).filter(n=>n.trim()).map(n=>{let r=n.split("|||");return{label:`$(git-branch) ${r[0]}`,description:r[1],detail:r[2],branchName:r[0]}}),i=await Ae.window.showQuickPick(o,{placeHolder:"Select a branch from history to checkout",matchOnDescription:!0,matchOnDetail:!0});i&&await pe(i.branchName)}catch{Ae.window.showErrorMessage("Ricwiz: Failed to get branch history")}}var Ae,Ut=k(()=>{"use strict";Ae=b(require("vscode"));C();Se()});async function Ot(){let e=y();if(!e)return;let t=await be.window.showInputBox({prompt:"Enter ticket number or name (e.g., 48934)",placeHolder:"48934"});if(t)try{let{stdout:o}=await m(`git branch --list "*${t}*"`,{cwd:e}),i=o.split(`
`).map(s=>s.replace("*","").trim()).filter(s=>s);if(i.length===0){be.window.showInformationMessage(`Ricwiz: No branches found matching "${t}"`);return}let n=i.map(s=>({label:`$(git-branch) ${s}`,branchName:s})),r=await be.window.showQuickPick(n,{placeHolder:`Select a branch for ${t}`});r&&await pe(r.branchName)}catch{be.window.showErrorMessage("Ricwiz: Failed to search branches")}}var be,Nt=k(()=>{"use strict";be=b(require("vscode"));C();Se()});async function jt(){let e=ce.window.activeTextEditor;if(!e)return ce.window.showErrorMessage("Ricwiz: Please open a file in the editor to check blame."),null;let t=e.document.fileName,o=Wt.basename(t),i=y();if(!i)return ce.window.showErrorMessage("Ricwiz: Workspace is not a git repository."),null;let n=[];try{let{stdout:d}=await m(`git log -5 --pretty=format:"%an|%ar|%s|%h" -- "${t}"`,{cwd:i}),u=d.trim().split(`
`);for(let a of u){let c=a.split("|");c.length>=4&&n.push({author:c[0],time:c[1],message:c.slice(2,-1).join("|"),hash:c[c.length-1]})}}catch(d){console.error("Git blame error:",d)}let r="Unknown",s="Unknown",p="Unknown",g=[],f=oo(t);if(f)try{await ce.window.withProgress({location:ce.ProgressLocation.Notification,title:`Ricwiz: Analyzing ${f.name} in Salesforce...`,cancellable:!1},async()=>{let d="";if(f.type==="CustomField"){let u=f.name.split(".");u.length===2&&(d=`SELECT LastModifiedBy.Name, LastModifiedDate, CreatedBy.Name FROM CustomField WHERE DeveloperName = '${u[1].replace("__c","")}' AND TableEnumOrId = '${u[0]}'`)}else f.type==="LightningComponentBundle"?d=`SELECT LastModifiedBy.Name, LastModifiedDate, CreatedBy.Name FROM LightningComponentBundle WHERE DeveloperName = '${f.name}'`:d=`SELECT LastModifiedBy.Name, LastModifiedDate, CreatedBy.Name FROM ${f.type} WHERE Name = '${f.name}'`;if(d)try{let{stdout:u}=await m(`sf data query -t -q "${d}" --json`,{cwd:i,maxBuffer:52428800}),a=JSON.parse(u);if(a&&a.result&&a.result.records&&a.result.records.length>0){let c=a.result.records[0];r=c.LastModifiedBy?c.LastModifiedBy.Name:"Unknown",p=c.CreatedBy?c.CreatedBy.Name:"Unknown",s=new Date(c.LastModifiedDate).toLocaleString()}else r="Not found in Org",s="N/A",p="N/A"}catch{r="Query Error",s="N/A",p="N/A"}try{let u="SELECT Action, Display, CreatedBy.Name, CreatedDate FROM SetupAuditTrail ORDER BY CreatedDate DESC LIMIT 1500",{stdout:a}=await m(`sf data query -q "${u}" --json`,{cwd:i,maxBuffer:52428800}),c=JSON.parse(a);if(c&&c.result&&c.result.records){let l=f.name.replace("__c","");g=c.result.records.filter(h=>h.Display&&h.Display.includes(l)).map(h=>({action:h.Action,display:h.Display,author:h.CreatedBy?h.CreatedBy.Name:"Unknown",time:new Date(h.CreatedDate).toLocaleString()})).slice(0,10)}}catch(u){console.error("Audit trail query error:",u)}})}catch(d){console.error("Salesforce query error:",d)}else r="Unsupported Metadata Type",s="N/A";return{fileName:o,gitHistory:n,sfAuthor:r,sfTime:s,sfCreatedBy:p,auditHistory:g}}function oo(e){let t=e.replace(/\\/g,"/");if(t.includes("/classes/")){let o=t.match(/\/classes\/([^/.]+)\.cls/);if(o)return{type:"ApexClass",name:o[1]}}if(t.includes("/triggers/")){let o=t.match(/\/triggers\/([^/.]+)\.trigger/);if(o)return{type:"ApexTrigger",name:o[1]}}if(t.includes("/lwc/")){let o=t.match(/\/lwc\/([^/]+)\//);if(o)return{type:"LightningComponentBundle",name:o[1]}}if(t.includes("/aura/")){let o=t.match(/\/aura\/([^/]+)\//);if(o)return{type:"AuraDefinitionBundle",name:o[1]}}if(t.includes("/objects/")&&t.includes("/fields/")){let o=t.match(/\/objects\/([^/]+)\//),i=t.match(/\/fields\/([^/.]+)\.field/);if(o&&i)return{type:"CustomField",name:`${o[1]}.${i[1]}`}}return null}var ce,Wt,Ht=k(()=>{"use strict";ce=b(require("vscode")),Wt=b(require("path"));C()});async function qt(){let e=y();if(!e){I.window.showErrorMessage("Ricwiz: Open a workspace that is a Git repository.");return}let o=I.workspace.getConfiguration("ricwiz").get("ticketSourceBranch","main");await I.window.withProgress({location:I.ProgressLocation.Notification,title:`Ricwiz: Finding deleted files compared to origin/${o}...`,cancellable:!1},async()=>{try{let{stdout:i}=await m(`git diff --name-only --diff-filter=D origin/${o}...HEAD`,{cwd:e}),n=i.split(`
`).map(a=>a.trim()).filter(a=>a.length>0);if(n.length===0){I.window.showInformationMessage(`Ricwiz: No deleted files found compared to origin/${o}.`);return}let r={},s=(a,c)=>{r[a]||(r[a]=[]),r[a].includes(c)||r[a].push(c)};for(let a of n){let c=a.replace(/\\/g,"/");if(c.includes("/classes/")){let l=c.match(/\/classes\/([^/.]+)\.cls/);l&&s("ApexClass",l[1])}else if(c.includes("/triggers/")){let l=c.match(/\/triggers\/([^/.]+)\.trigger/);l&&s("ApexTrigger",l[1])}else if(c.includes("/lwc/")){let l=c.match(/\/lwc\/([^/]+)\//);l&&s("LightningComponentBundle",l[1])}else if(c.includes("/aura/")){let l=c.match(/\/aura\/([^/]+)\//);l&&s("AuraDefinitionBundle",l[1])}else if(c.includes("/objects/")&&c.includes("/fields/")){let l=c.match(/\/objects\/([^/]+)\//),w=c.match(/\/fields\/([^/.]+)\.field/);l&&w&&s("CustomField",`${l[1]}.${w[1]}`)}else if(c.includes("/objects/")){let l=c.match(/\/objects\/([^/.]+)\.object/);l&&s("CustomObject",l[1])}else if(c.includes("/layouts/")){let l=c.match(/\/layouts\/([^/.]+)\.layout/);l&&s("Layout",l[1])}else if(c.includes("/flows/")){let l=c.match(/\/flows\/([^/.]+)\.flow/);l&&s("Flow",l[1])}else if(c.includes("/permissionsets/")){let l=c.match(/\/permissionsets\/([^/.]+)\.permissionset/);l&&s("PermissionSet",l[1])}else if(c.includes("/profiles/")){let l=c.match(/\/profiles\/([^/.]+)\.profile/);l&&s("Profile",l[1])}else if(c.includes("/customMetadata/")){let l=c.match(/\/customMetadata\/([^/.]+)\.md/);l&&s("CustomMetadata",l[1])}else if(c.includes("/flexipages/")){let l=c.match(/\/flexipages\/([^/.]+)\.flexipage/);l&&s("FlexiPage",l[1])}}if(Object.keys(r).length===0){I.window.showInformationMessage("Ricwiz: Found deleted files in Git, but none mapped to recognizable Salesforce metadata.");return}let p=`<?xml version="1.0" encoding="UTF-8"?>
<Package xmlns="http://soap.sforce.com/2006/04/metadata">
`;for(let a of Object.keys(r).sort()){p+=`    <types>
`;for(let c of r[a].sort())p+=`        <members>${c}</members>
`;p+=`        <name>${a}</name>
    </types>
`}p+=`    <version>58.0</version>
</Package>`;let g=De.join(e,"destructiveChanges");oe.existsSync(g)||oe.mkdirSync(g);let f=De.join(g,"destructiveChanges.xml"),d=De.join(g,"package.xml");oe.writeFileSync(f,p,"utf8"),oe.existsSync(d)||oe.writeFileSync(d,`<?xml version="1.0" encoding="UTF-8"?>
<Package xmlns="http://soap.sforce.com/2006/04/metadata">
    <version>58.0</version>
</Package>`,"utf8");let u=await I.workspace.openTextDocument(f);await I.window.showTextDocument(u),I.window.showInformationMessage("Ricwiz: destructiveChanges.xml generated successfully!")}catch(i){I.window.showErrorMessage(`Ricwiz: Error generating destructive changes: ${i.message}`)}})}var I,De,oe,Vt=k(()=>{"use strict";I=b(require("vscode")),De=b(require("path")),oe=b(require("fs"));C()});async function Gt(){let e=y();if(!e)return;let o=Y.workspace.getConfiguration("ricwiz").get("ticketSourceBranch","main");await Y.window.withProgress({location:Y.ProgressLocation.Notification,title:"Ricwiz: Finding Apex Tests to run...",cancellable:!1},async()=>{try{let{stdout:i}=await m(`git diff --name-status origin/${o}...HEAD`,{cwd:e}),n=i.split(`
`).map(a=>a.trim()).filter(a=>a.length>0),r=new Set,s=new Set;for(let a of n){let c=a.split(/\s+/);if(c[0].startsWith("D"))continue;let l=c[1];if(l&&l.endsWith(".cls")){let w=l.match(/\/classes\/([^/.]+)\.cls/);if(w){let h=w[1];h.toLowerCase().endsWith("test")?r.add(h):s.add(h)}}}for(let a of s)r.add(`${a}Test`);if(r.size===0){Y.window.showInformationMessage("Ricwiz: No Apex Classes were modified in this branch.");return}let p=Array.from(r).map(a=>({label:`$(beaker) ${a}`,description:"Apex Test Class"})),g=await Y.window.showQuickPick(p,{canPickMany:!0,title:"Select Test Classes to Run",placeHolder:"Select tests..."});if(!g||g.length===0)return;let d=`sf apex run test -n ${g.map(a=>a.label.replace("$(beaker) ","").trim()).join(",")} -r human -w 30`,u=Y.window.createTerminal("Ricwiz: Smart Tests");u.show(),u.sendText(d)}catch(i){Y.window.showErrorMessage(`Ricwiz: Error finding tests: ${i.message}`)}})}var Y,_t=k(()=>{"use strict";Y=b(require("vscode"));C()});var Re={};Fe(Re,{activate:()=>io,deactivate:()=>no,webviewProvider:()=>A});module.exports=me(Re);function io(e){A=new Ce(e.extensionUri),e.subscriptions.push(v.window.registerWebviewViewProvider("ricwiz-webview",A));let t=v.window.createStatusBarItem(v.StatusBarAlignment.Left,100);t.command="ricwiz.openJiraTicket",e.subscriptions.push(t);let o,i=v.workspace.getConfiguration("ricwiz").get("autoRefresh",!0);A.setAutoRefresh(i),e.subscriptions.push(v.workspace.onDidChangeConfiguration(r=>{if(r.affectsConfiguration("ricwiz.autoRefresh")){let s=v.workspace.getConfiguration("ricwiz").get("autoRefresh",!0);A?.setAutoRefresh(s)}}));async function n(){let r=v.extensions.getExtension("vscode.git");if(r){let g=function(f){let d="",u;async function a(){let l=v.workspace.workspaceFolders;if(!l)return;let w=l[0].uri.fsPath,h=await T(w);if(h&&h!==d){d=h;let R=v.workspace.getConfiguration("ricwiz"),$=R.get("ticketPrefix","SFPSCA-");if(!h.includes($)){let E=h.match(/([A-Z]+-)\d+/i);E&&($=E[1].toUpperCase())}let D=[],de=[],ge=[],le=[],B=R.get("environments",[{name:"Qual",sourceBranch:"quality"},{name:"Val",sourceBranch:"validation"},{name:"Prod",sourceBranch:"main"}]);try{let se=[R.get("ticketSourceBranch","main"),...B.map(re=>re.sourceBranch)];ge=Array.from(new Set(se))}catch{}let U=h.match(new RegExp(`(${$}\\d+(?:-\\d+)?)`,"i"));if(U){let E=U[1].toUpperCase(),se=R.get("commitMessageSuffix","- "),re=/^[A-Z]+-\d+(?:-\d+)?\s*(?:-\s*|:\s*|\s+)?/i;re.test(f.inputBox.value)?f.inputBox.value.toUpperCase().startsWith(E)||(f.inputBox.value=f.inputBox.value.replace(re,`${E}${se}`)):f.inputBox.value=`${E}${se}`+f.inputBox.value,t.text=`$(bookmark) ${E}`,t.tooltip=`Branch: ${h}
Click to open Jira ticket`,t.show();try{let fe=await Ye(w,E,h);D=await Ve(w,fe,E,B)}catch{}}else{t.hide();try{le=await Je(w)}catch{}}let[ie,ne]=await Promise.all([_e(w,10),Ge(w,h,B)]);de=ie,A?.updateBranch(h,ne,D,de,ge,le)}}function c(){A?.isAutoRefreshEnabled()&&(u&&clearTimeout(u),u=setTimeout(()=>{d="",a()},300))}o=()=>{d="",a()},a(),f.state.onDidChange(()=>c()),v.window.onDidChangeWindowState(l=>{l.focused&&c()})};var s=g;r.isActive||await r.activate();let p=r.exports.getAPI(1);p.repositories.length>0&&p.repositories.forEach(f=>g(f)),p.onDidOpenRepository(f=>g(f))}}n(),e.subscriptions.push(v.commands.registerCommand("ricwiz.generateDestructiveChanges",qt),v.commands.registerCommand("ricwiz.runSmartTests",Gt),v.commands.registerCommand("ricwiz.refreshWebview",()=>{A&&v.commands.executeCommand("workbench.action.webview.reloadWebviewAction")}),v.commands.registerCommand("ricwiz.createBranches",et),v.commands.registerCommand("ricwiz.prepareDeploy",nt),v.commands.registerCommand("ricwiz.createMergeRequests",at),v.commands.registerCommand("ricwiz.createMergeRequestsVSCode",ct),v.commands.registerCommand("ricwiz.openJiraTicket",mt),v.commands.registerCommand("ricwiz.openJiraTicketVSCode",ut),v.commands.registerCommand("ricwiz.syncAll",gt),v.commands.registerCommand("ricwiz.updateBases",ht),v.commands.registerCommand("ricwiz.deleteUnusedBranches",vt),v.commands.registerCommand("ricwiz.checkoutBranch",pe),v.commands.registerCommand("ricwiz.copyBranchName",bt),v.commands.registerCommand("ricwiz.generatePackageXml",Ct),v.commands.registerCommand("ricwiz.deployPackage",Rt),v.commands.registerCommand("ricwiz.importData",Bt),v.commands.registerCommand("ricwiz.listTicketFiles",Pt),v.commands.registerCommand("ricwiz.resetTracking",Et),v.commands.registerCommand("ricwiz.extractComponent",Tt),v.commands.registerCommand("ricwiz.captureAdminChanges",Ft),v.commands.registerCommand("ricwiz.openHistory",It),v.commands.registerCommand("ricwiz.searchTicket",Ot),v.commands.registerCommand("ricwiz.whoToBlame",async()=>{let r=await jt();r&&A&&(A.setBlameData(r),A.setPage("blame"))}),v.commands.registerCommand("ricwiz.manualRefresh",()=>{o&&o()}),v.commands.registerCommand("ricwiz.toggleAutoRefresh",()=>{if(A){let r=!A.isAutoRefreshEnabled();A.setAutoRefresh(r),v.workspace.getConfiguration("ricwiz").update("autoRefresh",r,v.ConfigurationTarget.Global)}}),v.commands.registerCommand("ricwiz.openSettings",()=>{v.commands.executeCommand("workbench.action.openSettings","ricwiz")}))}function no(){}var v,A,ze=k(()=>{v=b(require("vscode"));C();Qe();Ze();tt();st();dt();pt();ft();wt();yt();Se();xt();$t();zt();St();Mt();Dt();At();Lt();Ut();Nt();Ht();Vt();_t()});ze();0&&(module.exports={activate,deactivate,webviewProvider});
