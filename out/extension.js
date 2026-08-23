"use strict";var ro=Object.create;var $e=Object.defineProperty;var ao=Object.getOwnPropertyDescriptor;var co=Object.getOwnPropertyNames;var lo=Object.getPrototypeOf,mo=Object.prototype.hasOwnProperty;var C=(t,e,i)=>()=>{if(i)throw i[0];try{return t&&(e=t(t=0)),e}catch(a){throw i=[a],a}};var Fe=(t,e)=>{for(var i in e)$e(t,i,{get:e[i],enumerable:!0})},Oe=(t,e,i,a)=>{if(e&&typeof e=="object"||typeof e=="function")for(let n of co(e))!mo.call(t,n)&&n!==i&&$e(t,n,{get:()=>e[n],enumerable:!(a=ao(e,n))||a.enumerable});return t};var b=(t,e,i)=>(i=t!=null?ro(lo(t)):{},Oe(e||!t||!t.__esModule?$e(i,"default",{value:t,enumerable:!0}):i,t)),le=t=>Oe($e({},"__esModule",{value:!0}),t);var Re={};Fe(Re,{checkBranchExists:()=>ie,exec:()=>p,extractTicketSuggestion:()=>We,getCurrentBranch:()=>D,getWorkspaceCwd:()=>y,normalizeTicketId:()=>qe,promptForTicketId:()=>U,resolvePrefix:()=>Ue,ricwizLogger:()=>E});function y(){let t=ge.workspace.workspaceFolders;if(t)return t[0].uri.fsPath}async function D(t){try{let{stdout:e}=await p("git branch --show-current",{cwd:t});return e.trim()}catch{return""}}function Ue(t,e){if(!t.includes(e)){let i=t.match(/([A-Z]+-)\d+/i);if(i)return i[1].toUpperCase()}return e}function We(t,e,i=!1){let a=t.match(new RegExp(`(${e}\\d+)`,"i"));return a?a[1].toUpperCase():t.includes(e)&&!t.includes("-to-")?t.substring(t.indexOf(e)):i&&t.includes("-to-")?t.substring(t.indexOf(e)).split("-to-")[0]:""}function qe(t,e){let i=t.trim();return/^\d/.test(i)?`${e}${i}`.toUpperCase():i.toUpperCase()}async function U(t,e){let i=ge.workspace.getConfiguration("ricwiz"),a=e?.prefix??i.get("ticketPrefix","SFPSCA-"),n=await D(t),r=Ue(n,a),l=We(n,r,e?.handleToSuffix),f=await ge.window.showInputBox({prompt:e?.prompt||"Enter the full ticket ID (e.g., SCPSCA-1234) or just the number",placeHolder:e?.placeHolder||"Ticket ID or number",value:l});return f?{ticketId:qe(f,r),currentBranch:n,prefix:r}:void 0}async function ie(t,e){try{return await p(`git show-ref --verify --quiet refs/heads/${e}`,{cwd:t}),!0}catch{}try{return await p(`git show-ref --verify --quiet refs/remotes/origin/${e}`,{cwd:t}),!0}catch{}return!1}var ge,Ne,je,uo,E,p,$=C(()=>{"use strict";ge=b(require("vscode")),Ne=b(require("child_process")),je=b(require("util")),uo=je.promisify(Ne.exec),E=ge.window.createOutputChannel("Ricwiz"),p=async(t,e)=>{E.appendLine(`[EXEC] ${t}`);let i=await uo(t,{maxBuffer:50*1024*1024,...e});return{stdout:i.stdout.toString(),stderr:i.stderr.toString()}}});function He(){let t=new Map;function e(a,n){let r=n,l=t.get(r);if(l)return l;let f=(async()=>{try{let{stdout:u}=await p(`git rev-parse origin/${n}`,{cwd:a});return u.trim()}catch{let{stdout:u}=await p(`git rev-parse ${n}`,{cwd:a});return u.trim()}})();return t.set(r,f),f}function i(a,n){let r=`branch:${n}`,l=t.get(r);if(l)return l;let f=(async()=>{let{stdout:u}=await p(`git rev-parse ${n}`,{cwd:a});return u.trim()})();return t.set(r,f),f}return{resolveEnvRef:e,resolveBranchRef:i}}async function Ve(t,e,i,a,n){try{if(!(await p(`git --no-pager log ${e} --grep="\\\\b${i}\\\\b" -i -E -1 --format="%h"`,{cwd:t}).catch(()=>({stdout:"",stderr:""}))).stdout.trim())return!1;let[l,f]=await Promise.all([n.resolveBranchRef(t,e),n.resolveEnvRef(t,a.sourceBranch)]);if(l===f)return!1;try{return await p(`git merge-base --is-ancestor ${e} origin/${a.sourceBranch}`,{cwd:t}),!0}catch{try{return await p(`git merge-base --is-ancestor ${e} ${a.sourceBranch}`,{cwd:t}),!0}catch{return!1}}}catch{return!1}}function Je(t,e){return e.find(i=>t.endsWith(`-to-${i.name}`))}async function Ge(t,e,i,a){let n=He();return await Promise.all(e.map(async l=>{let f=Je(l,a);if(!f)return{name:l,isMerged:!1};let u=await Ve(t,l,i,f,n);return{name:l,isMerged:u}}))}async function _e(t,e,i){let a=Je(e,i);if(!a)return!1;let n=e.replace(new RegExp(`-to-${a.name}$`,"i"),""),r=He();return Ve(t,e,n,a,r)}async function Qe(t,e=10){try{let{stdout:i}=await p(`git log --oneline -${e} --format="%h|||%s|||%ar"`,{cwd:t});return i.split(`
`).filter(a=>a.trim()).map(a=>{let n=a.split("|||");return{hash:n[0]||"",message:n.length>=3?n.slice(1,-1).join("|||"):n[1]||"",timeAgo:n.length>=3?n[n.length-1]:""}})}catch{return[]}}async function Ye(t,e=3){try{let{stdout:i}=await p('git for-each-ref --sort=-committerdate --format="%(refname:short)" refs/heads/',{cwd:t}),a=i.split(`
`).map(r=>r.trim()).filter(r=>r),n=/^[A-Z]+-\d+$/i;return a.filter(r=>n.test(r)).slice(0,e)}catch{return[]}}async function Ze(t,e,i){let{stdout:a}=await p(`git branch --list "*${e}*"`,{cwd:t});return a.split(`
`).map(n=>n.replace("*","").trim()).filter(n=>n&&n!==i)}var Xe=C(()=>{"use strict";$()});function z(t){return t.replace(/&/g,"&amp;").replace(/</g,"&lt;").replace(/>/g,"&gt;").replace(/"/g,"&quot;").replace(/'/g,"&#39;")}var x,ze,Ke=C(()=>{"use strict";x=b(require("vscode"));ze=class{constructor(e){this._extensionUri=e}_extensionUri;webviewView;resolveWebviewView(e,i,a){this.webviewView=e,e.webview.options={enableScripts:!0,localResourceRoots:[this._extensionUri]},this.updateBranch("",!1),e.webview.onDidReceiveMessage(n=>{switch(n.command){case"createBranches":x.commands.executeCommand("ricwiz.createBranches");break;case"prepareDeploy":x.commands.executeCommand("ricwiz.prepareDeploy");break;case"openMRs":x.commands.executeCommand("ricwiz.createMergeRequests");break;case"openMRsVSCode":x.commands.executeCommand("ricwiz.createMergeRequestsVSCode");break;case"openJira":x.commands.executeCommand("ricwiz.openJiraTicket");break;case"showJiraDetails":x.commands.executeCommand("ricwiz.showJiraDetails");break;case"openJiraVSCode":x.commands.executeCommand("ricwiz.openJiraTicketVSCode");break;case"openSettings":x.commands.executeCommand("ricwiz.openSettings");break;case"checkout":n.branch&&x.commands.executeCommand("ricwiz.checkoutBranch",n.branch);break;case"copyBranch":x.commands.executeCommand("ricwiz.copyBranchName");break;case"generatePackageXml":x.commands.executeCommand("ricwiz.generatePackageXml");break;case"openDevTools":this.setPage("devtools");break;case"openMain":this.setPage("main");break;case"generateDestructiveChanges":x.commands.executeCommand("ricwiz.generateDestructiveChanges");break;case"deployPackage":x.commands.executeCommand("ricwiz.deployPackage");break;case"runSmartTests":x.commands.executeCommand("ricwiz.runSmartTests");break;case"importData":x.commands.executeCommand("ricwiz.importData");break;case"listTicketFiles":x.commands.executeCommand("ricwiz.listTicketFiles");break;case"resetTracking":x.commands.executeCommand("ricwiz.resetTracking");break;case"extractComponent":x.commands.executeCommand("ricwiz.extractComponent");break;case"deployMultiOrg":x.commands.executeCommand("ricwiz.deployMultiOrg");break;case"captureAdminChanges":x.commands.executeCommand("ricwiz.captureAdminChanges");break;case"whoToBlame":x.commands.executeCommand("ricwiz.whoToBlame");break;case"syncAll":x.commands.executeCommand("ricwiz.syncAll");break;case"updateBases":x.commands.executeCommand("ricwiz.updateBases");break;case"deleteUnused":x.commands.executeCommand("ricwiz.deleteUnusedBranches");break;case"conflict_commitAndContinue":x.commands.executeCommand("ricwiz.conflictAction","commitAndContinue");break;case"conflict_resolveDeletions":x.commands.executeCommand("ricwiz.conflictAction","resolveDeletions");break;case"conflict_abortDeploy":x.commands.executeCommand("ricwiz.conflictAction","abortDeploy");break;case"openFile":if(n.file){let r=x.workspace.workspaceFolders;if(r){let l=x.Uri.joinPath(r[0].uri,n.file);x.commands.executeCommand("vscode.open",l)}}break;case"searchTicket":x.commands.executeCommand("ricwiz.searchTicket");break;case"manualRefresh":x.commands.executeCommand("ricwiz.manualRefresh");break;case"toggleAutoRefresh":x.commands.executeCommand("ricwiz.toggleAutoRefresh");break;case"openHistory":x.commands.executeCommand("ricwiz.openHistory");break}})}conflictState=null;setConflictState(e){this.conflictState=e,this.updateView()}updateBranch(e,i,a=[],n=[],r=[],l=[]){this.webviewView&&(this.currentBranchCache=e,this.currentBranchIsMergedCache=i,this.relatedBranchesCache=a,this.commitsCache=n,this.baseBranchesCache=r,this.recentTicketsCache=l,this.updateView())}currentBranchCache="";currentBranchIsMergedCache=!1;relatedBranchesCache=[];commitsCache=[];baseBranchesCache=[];recentTicketsCache=[];currentPage="main";blameDataCache=null;jiraDataCache=null;autoRefreshEnabled=!0;setBlameData(e){this.blameDataCache=e}setJiraData(e){this.jiraDataCache=e}setAutoRefresh(e){this.autoRefreshEnabled=e,this.updateView()}isAutoRefreshEnabled(){return this.autoRefreshEnabled}setPage(e){this.currentPage=e,this.updateView()}updateView(){if(!this.webviewView)return;let e=this.webviewView.webview.asWebviewUri(x.Uri.joinPath(this._extensionUri,"resources","logo.png"));this.webviewView.webview.html=this._getHtmlForWebview(e,this.currentBranchCache,this.relatedBranchesCache,this.commitsCache,this.baseBranchesCache,this.recentTicketsCache,this.currentPage)}_getHtmlForWebview(e,i,a,n,r,l,f){let u=n.length>0?`
            <div class="separator"></div>
            <div style="padding: 0 4px;">
                <div style="font-size: 11px; opacity: 0.7; margin-bottom: 6px; display: flex; align-items: center; gap: 4px;">
                    <span>\u{1F4DC}</span> Recent Commits
                </div>
                <div style="display: flex; flex-direction: column; gap: 2px;">
                    ${n.map(o=>`
                        <div style="font-size: 11px; padding: 3px 4px; border-radius: 2px; display: flex; gap: 6px; align-items: baseline;">
                            <code style="color: var(--vscode-textLink-foreground); font-size: 10px; flex-shrink: 0;">${z(o.hash)}</code>
                            <span style="flex: 1; overflow: hidden; text-overflow: ellipsis; white-space: nowrap;" title="${z(o.message)}">${z(o.message)}</span>
                            <span style="font-size: 9px; opacity: 0.5; flex-shrink: 0;">${z(o.timeAgo)}</span>
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
            </style>
        `;if(this.conflictState){let o=(this.conflictState.files||[]).map(s=>`
                <button class="btn" style="padding: 6px; font-size: 12px; display: flex; justify-content: space-between; align-items: center;" onclick="sendOpenFileCommand('${z(s.file)}')">
                    <span style="flex: 1; overflow: hidden; text-overflow: ellipsis; white-space: nowrap; direction: rtl; text-align: left;">&lrm;${z(s.file)}</span>
                    <span style="font-size: 10px; opacity: 0.8; flex-shrink: 0; background-color: var(--vscode-badge-background); color: var(--vscode-badge-foreground); padding: 2px 4px; border-radius: 2px;">${z(s.state)}</span>
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
                    function sendCommand(cmd) { vscode.postMessage({ command: cmd }); }
                    function sendOpenFileCommand(file) { vscode.postMessage({ command: 'openFile', file: file }); }
                </script>
            </body>
            </html>`}if(f==="blame"){let o=this.blameDataCache;return`<!DOCTYPE html>
            <html lang="en">
            <head>
                <meta charset="UTF-8">
                <meta name="viewport" content="width=device-width, initial-scale=1.0">
                <title>Ricwiz Blame</title>
                ${d}
            </head>
            <body>
                <div style="display: flex; align-items: center; gap: 8px; margin-bottom: 16px; margin-top: 8px;">
                    <button class="btn" style="width: auto; padding: 4px 8px; background-color: var(--vscode-button-secondaryBackground); color: var(--vscode-button-secondaryForeground);" onclick="sendCommand('openDevTools')">\u2B05\uFE0F Back</button>
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
                            ${o.gitHistory&&o.gitHistory.length>0?o.gitHistory.map(s=>`
                                <li style="background: var(--vscode-editorWidget-background); border: 1px solid var(--vscode-widget-border); padding: 8px 10px; border-radius: 4px; border-left: 4px solid var(--vscode-gitDecoration-modifiedResourceForeground);">
                                    <div style="display: flex; justify-content: space-between; margin-bottom: 4px; align-items: center;">
                                        <strong style="font-size: 13px;">${s.author}</strong>
                                        <span style="opacity: 0.7; font-size: 11px;">${s.time}</span>
                                    </div>
                                    <div style="font-size: 12px; margin-bottom: 6px; opacity: 0.9; font-style: italic;">"${s.message}"</div>
                                    <div style="font-family: monospace; font-size: 10px; opacity: 0.6;">Commit: ${s.hash}</div>
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
                            ${o.auditHistory&&o.auditHistory.length>0?o.auditHistory.map(s=>`
                                <li style="background: var(--vscode-editorWidget-background); border: 1px solid var(--vscode-widget-border); padding: 8px 10px; border-radius: 4px; border-left: 4px solid var(--vscode-gitDecoration-untrackedResourceForeground);">
                                    <div style="display: flex; justify-content: space-between; margin-bottom: 4px; align-items: center;">
                                        <strong style="font-size: 13px;">${s.author}</strong>
                                        <span style="opacity: 0.7; font-size: 11px;">${s.time}</span>
                                    </div>
                                    <div style="font-size: 12px; font-weight: 500; margin-bottom: 4px;">${s.action}</div>
                                    <div style="font-size: 11px; opacity: 0.7; font-style: italic; background: var(--vscode-editor-background); padding: 4px; border-radius: 3px;">${s.display}</div>
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
            </html>`}if(f==="jira"){let o=this.jiraDataCache,s=o?.ticketId||"Jira",m=o?.summary||"No Title",c=o?.description||"No description provided.";return`<!DOCTYPE html>
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
                    <button class="icon-button" onclick="sendCommand('setPage', 'main')" title="Back">dY! </button>
                    <span style="font-weight: 600; font-size: 13px;">${s} Details</span>
                </div>
                
                <div class="card" style="padding: 16px;">
                    <div class="jira-title">${z(m)}</div>
                    <div class="jira-desc">${z(c)}</div>
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
                ${d}
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
                    function sendCommand(cmd) { vscode.postMessage({ command: cmd }); }
                </script>
            </body>
            </html>`:`<!DOCTYPE html>
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

            ${i?`<div style="background-color: var(--vscode-editor-inactiveSelectionBackground); padding: 10px; border-radius: 6px; margin-bottom: 16px; border: 1px solid var(--vscode-panel-border); box-shadow: 0 2px 4px rgba(0,0,0,0.1);">
                    <div style="font-size: 10px; opacity: 0.7; margin-bottom: 4px; display: flex; align-items: center; justify-content: center; gap: 4px; text-transform: uppercase;">
                        Current Ticket / Branch
                        <button class="copy-btn" onclick="sendCommand('copyBranch')" title="Copy branch name to clipboard">\u{1F4CB}</button>
                    </div>
                    <div style="font-weight: bold; font-size: 14px; word-break: break-all; text-align: center; color: var(--vscode-textLink-foreground);">
                        ${z(i)} ${this.currentBranchIsMergedCache?'<span style="margin-left: 4px; background-color: var(--vscode-charts-green); color: white; border-radius: 3px; padding: 1px 4px; font-size: 10px; font-weight: bold;" title="Merged to target env">MERGED</span>':""}
                    </div>
                    ${a.length>0?`
                        <div style="margin-top: 10px; border-top: 1px solid var(--vscode-panel-border); padding-top: 10px;">
                            <div style="font-size: 10px; opacity: 0.7; margin-bottom: 6px; text-transform: uppercase; text-align: center;">Sister Branches</div>
                            <div style="display: flex; flex-direction: column; gap: 4px;">
                                ${a.map(o=>`
                                    <div class="btn" style="padding: 4px 8px; font-size: 11px; display: flex; justify-content: space-between; align-items: center; background-color: var(--vscode-button-secondaryBackground); color: var(--vscode-button-secondaryForeground); border-radius: 4px;" onclick="sendCheckoutCommand('${z(o.name)}', this)" title="Checkout ${z(o.name)}">
                                        <span style="overflow: hidden; text-overflow: ellipsis; white-space: nowrap; font-weight: bold;">${z(o.name)}</span>
                                        ${o.isMerged?'<span style="background-color: var(--vscode-charts-green); color: white; border-radius: 3px; padding: 1px 4px; font-size: 9px; font-weight: bold;" title="Merged to target env">MERGED</span>':""}
                                    </div>
                                `).join("")}
                            </div>
                        </div>
                    `:l.length>0?`
                        <div style="margin-top: 10px; border-top: 1px solid var(--vscode-panel-border); padding-top: 10px;">
                            <div style="font-size: 10px; opacity: 0.7; margin-bottom: 6px; text-transform: uppercase; text-align: center;">Recent Tickets</div>
                            <div style="display: flex; flex-direction: column; gap: 4px;">
                                ${l.map(o=>`
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

            ${r.length>0?`
                <div style="display: flex; gap: 4px; margin-bottom: 16px; flex-wrap: wrap; justify-content: center;">
                    ${r.map(o=>`
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
        </html>`}}});var me,et=C(()=>{"use strict";me=class{static isValidShellArg(e){return e?/^[a-zA-Z0-9\-_/.]+$/.test(e):!1}}});var be,tt,Pe,T,ne=C(()=>{"use strict";be=b(require("vscode")),tt=b(require("path")),Pe=b(require("fs")),T=class t{style;upstreamRemote;originRemote;ticketSourceBranch;ticketPrefix;environments;static baseConfig=be.workspace.getConfiguration("ricwiz");activeProfile;profileName;constructor(e){this.activeProfile=e,this.profileName=e?.name;let i=t.baseConfig;this.style=e?.workflowStyle||i.get("workflowStyle","standard"),this.style==="multi-remote"?(this.upstreamRemote=e?.upstreamRemote||i.get("upstreamRemote","salesforce-master"),this.originRemote=e?.originRemote||i.get("originRemote","origin")):(this.upstreamRemote="origin",this.originRemote="origin"),this.ticketSourceBranch=e?.ticketSourceBranch||i.get("ticketSourceBranch","main"),this.ticketPrefix=e?.ticketPrefix||i.get("ticketPrefix","SFPSCA-");let a=[{name:"Qual",sourceBranch:"quality"},{name:"Val",sourceBranch:"validation"},{name:"Prod",sourceBranch:"main"}];this.environments=e?.environments||i.get("environments",a)}getConfig(e,i){return this.activeProfile&&this.activeProfile[e]!==void 0?this.activeProfile[e]:t.baseConfig.get(e,i)}static async initialize(e,i){let a=t.baseConfig.get("profiles",[]),n=tt.join(e,"ricwiz.json");if(Pe.existsSync(n))try{let r=Pe.readFileSync(n,"utf-8"),l=JSON.parse(r);l&&Array.isArray(l.profiles)&&(a=[...a,...l.profiles])}catch(r){be.window.showErrorMessage(`Ricwiz: Error parsing ricwiz.json: ${r.message}`)}if(a.length>0){if(!i?.forcePrompt)try{let{exec:u}=($(),le(Re)),{stdout:d}=await u("git branch --show-current",{cwd:e}),o=d.trim(),s=o;o.includes("-to-")&&(s=o.split("-to-")[0]);let{stdout:m}=await u(`git config branch.${s}.ricwiz-profile`,{cwd:e}),c=m.trim();if(c){let g=a.find(h=>h.name===c);if(g)return new t(g)}}catch{}let r=a.map(u=>u.name),l=await be.window.showQuickPick(r,{placeHolder:"Ricwiz: Select Workflow Profile",ignoreFocusOut:!0});if(!l)return;let f=a.find(u=>u.name===l);return new t(f)}return new t}buildUpstreamPath(e){return e.includes("/")?e:`${this.upstreamRemote}/${e}`}getFetchRemote(e){return e.includes("/")?e.split("/")[0]:this.upstreamRemote}getFetchBranch(e){return e.includes("/")?e.substring(e.indexOf("/")+1):e}}});async function ot(){let t=y();if(!t){P.window.showErrorMessage("Open a folder or workspace that is a Git repository.");return}let e=await T.initialize(t,{forcePrompt:!0});if(!e)return;let i=await U(t,{prefix:e.ticketPrefix});if(!i){P.window.showErrorMessage("Branch creation cancelled: Ticket not provided.");return}let{ticketId:a}=i,n=e.environments,r="all",l=[{label:"Create Main Branch & Environments",description:"Creates the main ticket branch and all environment branches",value:"all"},{label:"Create Main Branch Only",description:"Creates only the main ticket branch (skips environments)",value:"mainOnly"},{label:"Create Environments Only",description:"Creates only the environment branches (skip main branch)",value:"envs"}];if(n.length>0){let d=await P.window.showQuickPick(l,{placeHolder:"Ricwiz: What do you want to create?",ignoreFocusOut:!0});if(!d)return;r=d.value}let f=e.ticketSourceBranch;if(r==="all"||r==="mainOnly"){let d=[];try{let{stdout:c}=await p('git branch --all --format="%(refname:short)"',{cwd:t});d=c.split(`
`).map(g=>g.trim()).filter(g=>g&&g!=="origin"),d=[...new Set(d)]}catch{}let o=P.window.createQuickPick();o.title="Ricwiz: Ticket Source Branch",o.placeholder="Confirm or change the source branch for this ticket",o.value=e.ticketSourceBranch,o.ignoreFocusOut=!0;let s=()=>{let c=o.value.trim(),g=[];c&&g.push({label:c,description:"Use typed branch"}),g.push(...d.map(h=>({label:h}))),o.items=g};o.onDidChangeValue(s),s();let m=await new Promise(c=>{o.onDidAccept(()=>{let g=o.selectedItems[0];c(g?g.label:o.value),o.hide()}),o.onDidHide(()=>c(void 0)),o.show()});if(!m){P.window.showInformationMessage("Branch creation cancelled.");return}f=m.trim()}let u=a;if(!me.isValidShellArg(u)){P.window.showErrorMessage(`Invalid format for ticket ID: ${u}`);return}if(!me.isValidShellArg(f)){P.window.showErrorMessage(`Invalid format for ticketSourceBranch in settings: ${f}`);return}for(let d of n){if(!me.isValidShellArg(d.name)){P.window.showErrorMessage(`Invalid format for environment name in settings: ${d.name}`);return}if(!me.isValidShellArg(d.sourceBranch)){P.window.showErrorMessage(`Invalid format for environment sourceBranch in settings: ${d.sourceBranch}`);return}}try{await p("git status",{cwd:t})}catch{P.window.showErrorMessage("The opened folder does not appear to be a valid Git repository.");return}try{await P.window.withProgress({location:P.ProgressLocation.Notification,title:"Ricwiz: Creating Branches",cancellable:!1},async d=>{let o=[];d.report({message:"Checking remote status (git fetch)...",increment:10});try{await p("git fetch",{cwd:t})}catch{}try{if(r==="all"||r==="mainOnly"){if(d.report({message:`Creating main branch ${u}...`,increment:10}),await ie(t,u))P.window.showInformationMessage(`Ricwiz: The branch ${u} already exists. Skipping creation...`),await p(`git checkout ${u}`,{cwd:t});else try{let s=e.getFetchRemote(f),m=e.getFetchBranch(f),c=e.buildUpstreamPath(f);await p(`git fetch ${s} ${m}`,{cwd:t}),await p(`git checkout -b ${u} ${c}`,{cwd:t}),o.push(u)}catch{try{await p(`git checkout -b ${u} ${f}`,{cwd:t}),o.push(u)}catch{throw new Error(`Could not create main branch '${u}' from '${f}'. Does the source branch exist?`)}}try{await p(`git config branch.${u}.ricwiz-source "${f}"`,{cwd:t}),e.profileName&&await p(`git config branch.${u}.ricwiz-profile "${e.profileName}"`,{cwd:t})}catch{}}if(r==="all"||r==="envs"){let s=50/(n.length||1);for(let m of n){let c=`${a}-to-${m.name}`,g=m.sourceBranch;if(d.report({message:`Processing environment branch ${c}...`,increment:s}),!await ie(t,c))try{let h=e.buildUpstreamPath(g);await p(`git checkout -b ${c} ${h}`,{cwd:t}),o.push(c)}catch{try{await p(`git checkout -b ${c} ${g}`,{cwd:t}),o.push(c)}catch{throw new Error(`Could not create environment branch '${c}' from '${g}'. Does the source branch exist?`)}}}}d.report({message:`Publishing branches to ${e.originRemote}...`,increment:10});for(let s of o)try{await p(`git push -u ${e.originRemote} ${s}`,{cwd:t})}catch{P.window.showWarningMessage(`Ricwiz: Branch ${s} was created locally but could not be pushed to ${e.originRemote}.`)}if(r==="all"||r==="mainOnly"){d.report({message:`Switching to ${u}...`,increment:10});try{await p(`git checkout ${u}`,{cwd:t})}catch{}}d.report({increment:100}),P.window.showInformationMessage("Ricwiz: All set! You can start working on your branches! \u{1F680}")}catch(s){if(P.window.showErrorMessage(`Ricwiz Branch Creation Failed: ${s.message}`),o.length>0){try{await p(`git checkout ${f}`,{cwd:t})}catch{}for(let m of o)try{await p(`git branch -D ${m}`,{cwd:t})}catch{}P.window.showWarningMessage(`Ricwiz: Rolled back (deleted) ${o.length} branch(es) locally due to failure.`)}}})}catch(d){P.window.showErrorMessage(`Ricwiz general error: ${d.message}`)}}var P,it=C(()=>{"use strict";P=b(require("vscode"));$();et();ne()});async function se(t,e,i,a){a&&a.report({message:"CONFLICT! Resolve & click 'Commit & Continue' in Ricwiz panel."});let n=!1,r=!1,l=async()=>{try{let{stdout:o}=await p("git status --porcelain",{cwd:t});return o.split(`
`).filter(s=>{let m=s.substring(0,2);return["UD","DU","DD","AU","UA"].includes(m)}).map(s=>s.substring(3).trim())}catch{return[]}},f=async()=>{try{let{stdout:o}=await p("git status --porcelain",{cwd:t}),s=m=>m==="UU"?"Both Modified":m==="UD"?"Deleted by them":m==="DU"?"Deleted by us":m==="DD"?"Both Deleted":m==="AA"?"Both Added":m==="AU"?"Added by us":m==="UA"?"Added by them":"Conflicted";return o.split(`
`).map(m=>m.trimRight()).filter(m=>m.length>2).filter(m=>{let c=m.substring(0,2);return["UU","AA","UD","DU","AU","UA","DD"].includes(c)}).map(m=>{let c=m.substring(0,2);return{file:m.substring(3).trim(),state:s(c)}})}catch{return[]}},u=async()=>{if(n)return;let o=await l(),s=await f(),{webviewProvider:m}=(Se(),le(Be));m&&m.setConflictState({isConflict:!0,sourceStr:e,targetStr:i,deletionsCount:o.length,files:s})},d=K.commands.registerCommand("ricwiz.conflictAction",async o=>{if(o==="abortDeploy")r=!0;else if(o==="resolveDeletions"){try{let m=(await l()).map(g=>({label:g})),c=await K.window.showQuickPick(m,{canPickMany:!0,placeHolder:"Select conflicted files to DELETE",title:"Ricwiz: Delete Conflicted Files"});if(c&&c.length>0){for(let g of c)try{await p(`git rm --force "${g.label}"`,{cwd:t})}catch{}K.window.showInformationMessage(`Ricwiz: Deleted ${c.length} conflicted file(s).`)}}catch(s){K.window.showErrorMessage(`Ricwiz: Error. (${s.message})`)}u()}else if(o==="commitAndContinue")try{let m=(await l()).filter(g=>nt.existsSync(st.join(t,g)));if(m.length>0&&await K.window.showWarningMessage(`Wait! There are ${m.length} file(s) with deletion conflicts that are still on your disk.

If you commit now, you will KEEP them in the project.

Are you sure you want to KEEP them?`,{modal:!0},"Yes, KEEP them","No, let me DELETE them")!=="Yes, KEEP them"){u();return}let c=!1;try{let{stdout:g}=await p('git grep -E "^<<<<<<< "',{cwd:t});g.trim().length>0&&(c=!0)}catch{}if(c){K.window.showErrorMessage("Ricwiz: You still have unresolved conflict markers (<<<<<<<) in your files. Please resolve them first!"),u();return}await p("git add .",{cwd:t}),await p("git commit --no-edit",{cwd:t})}catch(s){K.window.showErrorMessage(`Ricwiz: Could not commit automatically. (${s.message})`),u()}});for(u();;){if(r){n=!0,d.dispose(),(Se(),le(Be)).webviewProvider?.setConflictState(null);try{await p("git merge --abort",{cwd:t})}catch{}return!1}try{let{stdout:o}=await p("git status --porcelain",{cwd:t});if(o.trim().length===0)return n=!0,d.dispose(),(Se(),le(Be)).webviewProvider?.setConflictState(null),K.window.showInformationMessage("Ricwiz: Changes committed!"),!0}catch{}await new Promise(o=>setTimeout(o,2e3))}}var K,nt,st,Ee=C(()=>{"use strict";K=b(require("vscode")),nt=b(require("fs")),st=b(require("path"));$()});async function rt(){let t=y();if(!t){F.window.showErrorMessage("Ricwiz: Open a folder or workspace that is a Git repository.");return}try{await p("git status",{cwd:t})}catch{F.window.showErrorMessage("Ricwiz: The opened folder does not appear to be a valid Git repository.");return}let e=await T.initialize(t);if(!e)return;let i=e.environments,a=await U(t,{prefix:e.ticketPrefix});if(!a){F.window.showErrorMessage("Operation cancelled: Ticket not provided.");return}let{ticketId:n,currentBranch:r}=a,l=n;if(!await ie(t,l)){F.window.showErrorMessage(`Ricwiz: Main branch '${l}' does not exist! Prepare deploy is only available when a main ticket branch is used.`);return}let f=e.getConfig("defaultReviewers",""),u="";try{let{stdout:d}=await p(`git config branch.${n}.ricwiz-reviewers`,{cwd:t});u=d.trim()}catch{}if(f.trim()){let d=await F.window.showInputBox({prompt:"Ricwiz: Reviewers for this deploy (optional, comma-separated)",placeHolder:"e.g. @joao, 123456",value:u||f,ignoreFocusOut:!0});if(d===void 0)return;try{d.trim()?await p(`git config branch.${n}.ricwiz-reviewers "${d.trim()}"`,{cwd:t}):u&&await p(`git config --unset branch.${n}.ricwiz-reviewers`,{cwd:t})}catch{}}await F.window.withProgress({location:F.ProgressLocation.Notification,title:"Ricwiz: Preparing Deploy",cancellable:!0},async(d,o)=>{let s=0,m=r,c=!1;o.onCancellationRequested(()=>{c=!0}),d.report({message:"Syncing remote information...",increment:10});try{await p("git fetch --all",{cwd:t});let h=10/(i.length||1);for(let w of i)try{if(c)throw new Error("Aborted");d.report({message:`Fetching ${w.sourceBranch}...`,increment:h});let R=e.getFetchRemote(w.sourceBranch),k=e.getFetchBranch(w.sourceBranch);await p(`git fetch ${R} ${k}:${k}`,{cwd:t})}catch{}}catch{}let g=60/(i.length||1);for(let h of i){if(c)break;let w=`${n}-to-${h.name}`,R=h.sourceBranch;try{d.report({message:`Processing ${w}...`,increment:g/4}),await p(`git checkout ${w}`,{cwd:t});try{await p(`git pull ${e.originRemote} ${w}`,{cwd:t})}catch{}try{d.report({message:`Merging ${R} into ${w}...`,increment:g/4});let k=e.getFetchRemote(R),N=e.getFetchBranch(R),j=e.buildUpstreamPath(R);await p(`git fetch ${k} ${N}`,{cwd:t}),await p(`git merge ${j}`,{cwd:t})}catch(k){let N=!1;try{let{stdout:L}=await p("git ls-files -u",{cwd:t});L.trim().length>0&&(N=!0)}catch{}let j=((k.stdout||"")+(k.stderr||"")+(k.message||"")).toLowerCase();if(N||j.includes("conflict")||j.includes("conflit")){let L=e.buildUpstreamPath(R);if(!await se(t,L,w,d))throw c=!0,new Error("Deploy aborted by user.")}else throw k}try{d.report({message:`Merging ${l} into ${w}...`,increment:g/4}),await p(`git merge ${l}`,{cwd:t})}catch(k){let N=!1;try{let{stdout:L}=await p("git ls-files -u",{cwd:t});L.trim().length>0&&(N=!0)}catch{}let j=((k.stdout||"")+(k.stderr||"")+(k.message||"")).toLowerCase();if(N||j.includes("conflict")||j.includes("conflit")){if(!await se(t,l,w,d))throw c=!0,new Error("Deploy aborted by user.")}else throw k}if(c)break;d.report({message:`Pushing ${w}...`,increment:g/4}),await p(`git push ${e.originRemote} ${w}`,{cwd:t}),s++}catch(k){k.message.includes("aborted")?F.window.showInformationMessage("Ricwiz: Deploy cancelled."):F.window.showErrorMessage(`Ricwiz: Failed to process branch ${w}. Detail: ${k.message}`);return}}if(!c){d.report({message:"Finishing up...",increment:10});let h=m;try{await p(`git show-ref --verify --quiet refs/heads/${l}`,{cwd:t}),h=l}catch{}try{let w=await D(t);h&&h!==w?(await p(`git checkout ${h}`,{cwd:t}),F.window.showInformationMessage(`Ricwiz: Operation complete. Back on branch ${h}.`)):F.window.showInformationMessage("Ricwiz: Operation complete.")}catch{F.window.showInformationMessage("Ricwiz: Operation complete.")}}})}var F,at=C(()=>{"use strict";F=b(require("vscode"));$();Ee();ne()});async function ct(t=!1){let e=y();if(!e)return;let i=await T.initialize(e);if(!i)return;let a=await U(e,{prompt:"Enter the full ticket ID for the Merge Requests (e.g., SCPSCA-1234) or just the number"});if(!a)return;let{ticketId:n}=a,l=Q.workspace.getConfiguration("ricwiz").get("gitlabUrlOverride",""),f="";if(l&&l.trim()!=="")f=l.trim();else{let o="";try{let{stdout:s}=await p("git remote get-url origin",{cwd:e});o=s.trim()}catch{Q.window.showErrorMessage("Ricwiz: Could not get the remote origin URL. Please configure the URL manually in the extension settings.");return}f=o,f.endsWith(".git")&&(f=f.slice(0,-4)),f.startsWith("git@")&&(f=f.replace("git@","").replace(":","/"),f=`https://${f}`)}let u=[],d=i.ticketSourceBranch;try{let{stdout:o}=await p(`git config branch.${n}.ricwiz-source`,{cwd:e});o.trim()&&(d=o.trim())}catch{}if(i.environments.length===0)u.push({source:n,target:d});else for(let o of i.environments)u.push({source:`${n}-to-${o.name}`,target:o.sourceBranch});for(let o of u){let s=`${f}/-/merge_requests/new?merge_request[source_branch]=${o.source}&merge_request[target_branch]=${o.target}`;t?Q.commands.executeCommand("simpleBrowser.show",s):Q.env.openExternal(Q.Uri.parse(s))}Q.window.showInformationMessage(`Ricwiz: Opening ${t?"VS Code browser":"external browser"} for Merge Requests!`)}async function dt(){return ct(!1)}async function lt(){return ct(!0)}var Q,mt=C(()=>{"use strict";Q=b(require("vscode"));$();ne()});async function ut(t=!1){let e=y();if(!e)return;let i=Y.workspace.getConfiguration("ricwiz"),a=i.get("jiraUrl","");if(!a||a.trim()===""){Y.window.showErrorMessage("Ricwiz: Jira URL is not configured. Please set it in the extension settings (e.g., https://jira.company.com/browse/).");return}let{getCurrentBranch:n,resolvePrefix:r,extractTicketSuggestion:l}=($(),le(Re)),f=await n(e),u=i.get("ticketPrefix","SFPSCA-"),d=r(f,u),s=l(f,d,!0);if(s){let{normalizeTicketId:c}=($(),le(Re));s=c(s,d)}else{let c=await U(e,{prompt:"Ricwiz could not detect the ticket from the branch name. Enter Jira ticket ID (e.g. SFPSCA-1234)",handleToSuffix:!0});if(!c)return;s=c.ticketId}let m=a.trim();m.endsWith("/")||(m+="/"),m+=s,t?Y.commands.executeCommand("simpleBrowser.show",m):Y.env.openExternal(Y.Uri.parse(m)),Y.window.showInformationMessage(`Ricwiz: Opening Jira Ticket ${s} in ${t?"VS Code":"browser"}!`)}async function pt(){return ut(!1)}async function gt(){return ut(!0)}var Y,ft=C(()=>{"use strict";Y=b(require("vscode"));$()});async function ht(){let t=y();if(!t){te.window.showErrorMessage("Ricwiz: Open a folder or workspace that is a Git repository.");return}let e=await T.initialize(t);if(!e)return;let i=await U(t,{prefix:e.ticketPrefix,prompt:"Enter the full ticket ID to sync all branches for (e.g., SCPSCA-1234) or just the number"});if(!i)return;let{ticketId:a,currentBranch:n}=i;await te.window.withProgress({location:te.ProgressLocation.Notification,title:`Ricwiz: Syncing all branches for ${a}...`,cancellable:!1},async r=>{try{r.report({message:"Fetching from remote..."});try{await p("git fetch --all",{cwd:t})}catch{}let{stdout:l}=await p(`git branch --list "*${a}*"`,{cwd:t}),f=l.split(`
`).map(o=>o.replace("*","").trim()).filter(o=>o.length>0);if(f.length===0){te.window.showWarningMessage(`Ricwiz: No local branches found for ${a}.`);return}let u=0,d=0;for(let o of f)if(r.report({message:`Syncing ${o}...`}),o===n)try{await p(`git pull ${e.originRemote} ${o}`,{cwd:t}),u++}catch(s){let m=!1;try{let{stdout:g}=await p("git ls-files -u",{cwd:t});g.trim().length>0&&(m=!0)}catch{}let c=((s.stdout||"")+(s.stderr||"")+(s.message||"")).toLowerCase();(m||c.includes("conflict")||c.includes("conflit"))&&await se(t,`${e.originRemote}/${o}`,o,r)?u++:d++}else try{await p(`git fetch ${e.originRemote} ${o}:${o}`,{cwd:t}),u++}catch{try{await p(`git checkout ${o}`,{cwd:t});try{await p(`git pull ${e.originRemote} ${o}`,{cwd:t}),u++}catch(m){let c=!1;try{let{stdout:h}=await p("git ls-files -u",{cwd:t});h.trim().length>0&&(c=!0)}catch{}let g=((m.stdout||"")+(m.stderr||"")+(m.message||"")).toLowerCase();(c||g.includes("conflict")||g.includes("conflit"))&&await se(t,`${e.originRemote}/${o}`,o,r)?u++:d++}await p(`git checkout ${n}`,{cwd:t})}catch{try{await p(`git checkout ${n}`,{cwd:t})}catch{}d++}}d>0?te.window.showWarningMessage(`Ricwiz: Synced ${u}/${f.length} branches. ${d} branch(es) could not be synced (possible conflicts or diverged history).`):te.window.showInformationMessage(`Ricwiz: \u{1F504} All ${u} branches for ${a} are up to date!`)}catch(l){te.window.showErrorMessage(`Ricwiz: Sync failed: ${l.message}`)}})}var te,wt=C(()=>{"use strict";te=b(require("vscode"));$();Ee();ne()});async function vt(){let t=y();if(!t){oe.window.showErrorMessage("Ricwiz: Open a folder or workspace that is a Git repository.");return}try{await p("git status",{cwd:t})}catch{oe.window.showErrorMessage("Ricwiz: The opened folder does not appear to be a valid Git repository.");return}let e=await T.initialize(t);if(!e)return;let i=e.environments,a=await U(t,{prefix:e.ticketPrefix});if(!a)return;let{ticketId:n,currentBranch:r}=a;await oe.window.withProgress({location:oe.ProgressLocation.Notification,title:"Ricwiz: Updating environment branches from their bases",cancellable:!0},async(l,f)=>{let u=0,d=r,o=!1;f.onCancellationRequested(()=>{o=!0}),l.report({message:"Syncing remote information...",increment:10});try{await p("git fetch --all",{cwd:t})}catch{}let s=80/(i.length||1);for(let m of i){if(o)break;let c=`${n}-to-${m.name}`,g=m.sourceBranch;if(await ie(t,c))try{l.report({message:`Processing ${c}...`,increment:s/2}),await p(`git checkout ${c}`,{cwd:t});try{l.report({message:`Merging ${g} into ${c}...`,increment:s/2});let h=e.getFetchRemote(g),w=e.getFetchBranch(g),R=e.buildUpstreamPath(g);await p(`git fetch ${h} ${w}`,{cwd:t}),await p(`git merge ${R}`,{cwd:t})}catch(h){let w=!1;try{let{stdout:k}=await p("git ls-files -u",{cwd:t});k.trim().length>0&&(w=!0)}catch{}let R=((h.stdout||"")+(h.stderr||"")+(h.message||"")).toLowerCase();if(w||R.includes("conflict")||R.includes("conflit")){let k=e.buildUpstreamPath(g);if(!await se(t,k,c,l))throw o=!0,new Error("Update aborted by user.")}else throw h}if(o)break;u++}catch(h){h.message.includes("aborted")?oe.window.showInformationMessage("Ricwiz: Update cancelled."):oe.window.showErrorMessage(`Ricwiz: Failed to update branch ${c}. Detail: ${h.message}`);return}}if(!o){l.report({message:"Finishing up...",increment:10});try{let m=await D(t);d&&d!==m&&await p(`git checkout ${d}`,{cwd:t})}catch{}oe.window.showInformationMessage(`Ricwiz: Successfully updated ${u} environment branches from their bases!`)}})}var oe,yt=C(()=>{"use strict";oe=b(require("vscode"));$();Ee();ne()});async function bt(){let t=y();if(!t){A.window.showErrorMessage("Ricwiz: Open a folder or workspace that is a Git repository.");return}let e=await D(t),i=A.workspace.getConfiguration("ricwiz");await A.window.withProgress({location:A.ProgressLocation.Notification,title:"Ricwiz: Scanning for unused local branches...",cancellable:!1},async()=>{try{await p("git fetch --prune",{cwd:t})}catch{}let a=[];try{let{stdout:s}=await p('git branch --format="%(refname:short)"',{cwd:t});a=s.split(`
`).map(m=>m.trim()).filter(m=>m.length>0)}catch{}if(a.length===0){A.window.showInformationMessage("Ricwiz: No local branches found.");return}let n=[];try{let{stdout:s}=await p('git branch -r --format="%(refname:short)"',{cwd:t});n=s.split(`
`).map(m=>m.trim().replace(/^origin\//,"").replace(/^[^\/]+\//,"")).filter(m=>m.length>0&&!m.includes("HEAD"))}catch{}let r=[];try{let{stdout:s}=await p('git for-each-ref --format="%(refname:short)|||%(upstream:track)" refs/heads/',{cwd:t});r=s.split(`
`).filter(m=>m.includes("[gone]")).map(m=>m.split("|||")[0].trim())}catch{}let l=a.filter(s=>!n.includes(s));if(l.length===0){A.window.showInformationMessage("Ricwiz: Your local repository is totally clean! All local branches exist on the remote.");return}let f=l.map(s=>{let m=r.includes(s),c=s===e,g="Not found on remote";return m&&(g="Deleted on remote [gone]"),c&&(g+=" (Current branch - will checkout main first)"),{label:s,description:g,picked:m&&!c}}),u=await A.window.showQuickPick(f,{canPickMany:!0,placeHolder:"Select local branches to delete",title:"Ricwiz: Delete Unused Branches"});if(!u||u.length===0){A.window.showInformationMessage("Ricwiz: No branches selected for deletion.");return}if(await A.window.showWarningMessage(`Ricwiz: Delete ${u.length} local branch(es)?
This cannot be undone!`,{modal:!0},"Yes, delete them")!=="Yes, delete them"){A.window.showInformationMessage("Ricwiz: Deletion cancelled.");return}let o=0;for(let s of u){let m=s.label;if(m===e){let c=i.get("ticketSourceBranch","main");try{await p(`git checkout ${c}`,{cwd:t}),e=c}catch{A.window.showWarningMessage(`Ricwiz: Could not switch away from ${m}. Skipping.`);continue}}try{await p(`git branch -D ${m}`,{cwd:t}),o++}catch{A.window.showWarningMessage(`Ricwiz: Could not delete local branch ${m}.`)}}A.window.showInformationMessage(`Ricwiz: \u{1F5D1}\uFE0F Cleaned up ${o} unused local branch(es).`)})}var A,xt=C(()=>{"use strict";A=b(require("vscode"));$()});async function fe(t){let e=y();e&&await Z.window.withProgress({location:Z.ProgressLocation.Notification,title:`Ricwiz: Switching to ${t}...`,cancellable:!1},async()=>{try{let i=await D(e),a=!1;try{let{stdout:r}=await p("git status --porcelain",{cwd:e});a=r.trim().length>0}catch{}if(a&&i)try{await p(`git stash push --include-untracked -m "ricwiz-auto:${i}"`,{cwd:e}),Z.window.showInformationMessage(`Ricwiz: \u{1F4E6} Stashed changes from ${i}`)}catch{Z.window.showWarningMessage("Ricwiz: Could not stash changes. Checkout may fail if there are conflicts.")}let n=t;t.includes("/")&&(n=t.split("/").slice(1).join("/"));try{await p(`git checkout ${n}`,{cwd:e})}catch{let l="";if(t.includes("/"))l=t.split("/")[0];else{let{stdout:f}=await p("git branch -r",{cwd:e}),u=f.split(`
`).map(o=>o.trim()).filter(o=>o),d=[];for(let o of u){let s=o.split(" ")[0];s.endsWith(`/${n}`)&&d.push(s.substring(0,s.lastIndexOf("/")))}if(d.length===0){Z.window.showErrorMessage(`Ricwiz: A branch "${n}" n\xE3o existe localmente nem em nenhuma remote!`);return}else if(d.length===1)l=d[0];else{let o=await T.initialize(e);d.includes("origin")?l="origin":o&&d.includes(o.upstreamRemote)?l=o.upstreamRemote:l=d[0]}}try{await p(`git fetch ${l} ${n}`,{cwd:e}),await p(`git checkout -b ${n} --track ${l}/${n}`,{cwd:e})}catch{Z.window.showErrorMessage(`Ricwiz: Encontrou na remote ${l} mas falhou a fazer checkout.`);return}}try{let{stdout:r}=await p("git stash list",{cwd:e}),l=r.split(`
`);for(let f=0;f<l.length;f++)if(l[f].includes(`ricwiz-auto:${n}`)){let u=l[f].match(/stash@\{(\d+)\}/);u&&(await p(`git stash pop stash@{${u[1]}}`,{cwd:e}),Z.window.showInformationMessage(`Ricwiz: \u{1F4E6} Restored stashed changes on ${n}`));break}}catch{Z.window.showWarningMessage(`Ricwiz: Could not restore stashed changes on ${n}. You may need to resolve conflicts manually (check git stash list).`)}}catch{Z.window.showErrorMessage(`Ricwiz: Could not checkout branch ${t}.`)}})}var Z,Me=C(()=>{"use strict";Z=b(require("vscode"));$();ne()});async function kt(){let t=y();if(t)try{let{stdout:e}=await p("git branch --show-current",{cwd:t}),i=e.trim();i&&(await xe.env.clipboard.writeText(i),xe.window.showInformationMessage(`Ricwiz: \u{1F4CB} Copied "${i}" to clipboard`))}catch{xe.window.showErrorMessage("Ricwiz: Could not get the current branch name.")}}var xe,Ct=C(()=>{"use strict";xe=b(require("vscode"));$()});async function Rt(){let t=y();if(!t){H.window.showErrorMessage("Ricwiz: Open a folder or workspace that is a Git repository.");return}let e=H.workspace.getConfiguration("ricwiz"),i=e.get("ticketSourceBranch","main"),n=e.get("packageXmlCommand",'sf sgd source delta --to "HEAD" --from "origin/{baseBranch}" --output-dir "."').replace("{baseBranch}",i);await H.window.showWarningMessage("Are you sure you want to generate the package.xml? This may overwrite existing local manifest files.",{modal:!0},"Yes, Generate")==="Yes, Generate"&&await H.window.withProgress({location:H.ProgressLocation.Notification,title:"Ricwiz: Generating package.xml using Salesforce CLI...",cancellable:!1},async()=>{try{await p(n,{cwd:t,maxBuffer:10*1024*1024}),H.window.showInformationMessage("Ricwiz: Successfully generated package.xml!");let l=De.join(t,"package","package.xml"),f=De.join(t,"package.xml"),u=De.join(t,"manifest","package.xml");for(let d of[l,f,u])if($t.existsSync(d)){let o=await H.workspace.openTextDocument(d);await H.window.showTextDocument(o);break}}catch(l){H.window.showErrorMessage(`Ricwiz: Error running sf command - ${l.message}`)}})}var H,De,$t,zt=C(()=>{"use strict";H=b(require("vscode")),De=b(require("path")),$t=b(require("fs"));$()});async function Pt(){let t=y();if(!t){V.window.showErrorMessage("Ricwiz: Open a folder or workspace that is a Git repository.");return}let i=V.workspace.getConfiguration("ricwiz").get("deployCommand","sf project deploy start --manifest package/package.xml --post-destructive-changes destructiveChanges/destructiveChanges.xml -c -l NoTestRun -g");await V.window.showWarningMessage("Are you sure you want to deploy to Salesforce? This action modifies your org and cannot be easily undone.",{modal:!0},"Yes, Deploy")==="Yes, Deploy"&&await V.window.withProgress({location:V.ProgressLocation.Notification,title:"Ricwiz: Deploying package...",cancellable:!1},async()=>{try{let{stdout:n,stderr:r}=await p(i,{cwd:t,maxBuffer:52428800}),l=V.window.createOutputChannel("Ricwiz Deploy");l.appendLine(`Executing: ${i}`),l.appendLine(n),r&&(l.appendLine("--- STDERR ---"),l.appendLine(r)),l.show(),V.window.showInformationMessage("Ricwiz: Successfully ran deploy command!")}catch(n){let r=V.window.createOutputChannel("Ricwiz Deploy");r.appendLine(`Error executing: ${i}`),n.stdout&&r.appendLine(n.stdout),n.stderr&&r.appendLine(n.stderr),r.appendLine(n.message),r.show(),V.window.showErrorMessage("Ricwiz: Error running deploy command. See output channel for details.")}})}var V,Bt=C(()=>{"use strict";V=b(require("vscode"));$()});async function St(){let t=y();if(!t){J.window.showErrorMessage("Ricwiz: Open a folder or workspace that is a Git repository.");return}let i=J.workspace.getConfiguration("ricwiz").get("importDataCommand","sfdx force:data:tree:import --plan data/plan.json");await J.window.showWarningMessage("Are you sure you want to import data into Salesforce? This action modifies records in your org.",{modal:!0},"Yes, Import")==="Yes, Import"&&await J.window.withProgress({location:J.ProgressLocation.Notification,title:"Ricwiz: Importing data...",cancellable:!1},async()=>{try{let{stdout:n,stderr:r}=await p(i,{cwd:t,maxBuffer:52428800}),l=J.window.createOutputChannel("Ricwiz Import Data");l.appendLine(`Executing: ${i}`),l.appendLine(n),r&&(l.appendLine("--- STDERR ---"),l.appendLine(r)),l.show(),J.window.showInformationMessage("Ricwiz: Successfully ran import data command!")}catch(n){let r=J.window.createOutputChannel("Ricwiz Import Data");r.appendLine(`Error executing: ${i}`),n.stdout&&r.appendLine(n.stdout),n.stderr&&r.appendLine(n.stderr),r.appendLine(n.message),r.show(),J.window.showErrorMessage("Ricwiz: Error running import data command. See output channel for details.")}})}var J,Et=C(()=>{"use strict";J=b(require("vscode"));$()});async function Mt(){let t=y();if(!t){G.window.showErrorMessage("Ricwiz: Open a folder or workspace that is a Git repository.");return}let e="";try{e=await D(t)}catch{}let a=G.workspace.getConfiguration("ricwiz").get("ticketSourceBranch","main"),n=await G.window.showInputBox({prompt:`Enter the branch name to list modified files (compared to ${a})`,value:e,placeHolder:"SFPSCA-1234"});n&&await G.window.withProgress({location:G.ProgressLocation.Notification,title:`Ricwiz: Finding files for ${n}...`,cancellable:!1},async()=>{try{let r=n.replace(/-to-[a-zA-Z0-9]+$/i,""),l=[];try{let g="";try{let{stdout:h}=await p(`git merge-base origin/${a} ${n}`,{cwd:t});g=h.trim()}catch{let{stdout:h}=await p(`git merge-base ${a} ${n}`,{cwd:t});g=h.trim()}if(g){let{stdout:h}=await p(`git diff --name-only ${g} ${n}`,{cwd:t,maxBuffer:10485760});l=h.split(`
`).map(w=>w.trim()).filter(w=>w.length>0)}}catch{}let f=[];try{let{stdout:g}=await p(`git --no-pager log --grep="\\b${r}\\b" -i -E --name-only -m --first-parent --format=""`,{cwd:t,maxBuffer:10485760});f=g.split(`
`).map(h=>h.trim()).filter(h=>h.length>0)}catch{}let u=[...l,...f];if(u.length===0){G.window.showInformationMessage(`Ricwiz: No modified files found for ${n}.`);return}let d=Array.from(new Set(u)).sort(),o={};for(let g of d){let h=g.match(/default\/([^/]+)/),w=h&&h[1]?h[1].toUpperCase():"OUTROS";o[w]||(o[w]=[]),o[w].push(g)}let s=`Files modified in branch ${n}:
`,m=Object.keys(o).sort();for(let g of m)s+=`
=== ${g} ===
`,s+=o[g].join(`
`)+`
`;let c=await G.workspace.openTextDocument({content:s,language:"plaintext"});await G.window.showTextDocument(c)}catch(r){G.window.showErrorMessage(`Ricwiz: Error running git log - ${r.message}`)}})}var G,Dt=C(()=>{"use strict";G=b(require("vscode"));$()});async function Tt(){let t=y();if(!t){X.window.showErrorMessage("Ricwiz: Open a folder or workspace that is a Git repository.");return}let i=X.workspace.getConfiguration("ricwiz").get("resetTrackingCommand","sf org disable tracking && sf project reset tracking --no-prompt");await X.window.withProgress({location:X.ProgressLocation.Notification,title:"Ricwiz: Resetting tracking...",cancellable:!1},async()=>{try{let{stdout:a,stderr:n}=await p(i,{cwd:t,maxBuffer:52428800}),r=X.window.createOutputChannel("Ricwiz Reset Tracking");r.appendLine(`Executing: ${i}`),r.appendLine(a),n&&(r.appendLine("--- STDERR ---"),r.appendLine(n)),r.show(),X.window.showInformationMessage("Ricwiz: Successfully reset tracking!")}catch(a){let n=X.window.createOutputChannel("Ricwiz Reset Tracking");n.appendLine(`Error executing: ${i}`),a.stdout&&n.appendLine(a.stdout),a.stderr&&n.appendLine(a.stderr),n.appendLine(a.message),n.show(),X.window.showErrorMessage("Ricwiz: Error resetting tracking. See output channel for details.")}})}var X,At=C(()=>{"use strict";X=b(require("vscode"));$()});async function It(){let t=y();if(!t){_.window.showErrorMessage("Ricwiz: Open a workspace first.");return}let e=["ApexClass","ApexTrigger","CustomObject","CustomField","LightningComponentBundle","AuraDefinitionBundle","Flow","CustomLabel","CustomMetadata","StaticResource","Profile","PermissionSet","PermissionSetGroup","Layout","ValidationRule","RecordType","ListView","Report","EmailTemplate","Other (Type manually)..."],i=await _.window.showQuickPick(e,{placeHolder:"Select Metadata Type to extract (e.g., ApexClass)",ignoreFocusOut:!0});if(!i||i==="Other (Type manually)..."&&(i=await _.window.showInputBox({prompt:"Enter Metadata Type (e.g., CustomApplication, Queue)",ignoreFocusOut:!0}),!i))return;let a={ApexClass:"**/*.cls",ApexTrigger:"**/*.trigger",CustomObject:"**/*.{object,object-meta.xml}",CustomField:"**/*.field-meta.xml",LightningComponentBundle:"**/lwc/*/*.js",AuraDefinitionBundle:"**/aura/*/*.cmp",Flow:"**/*.flow-meta.xml",CustomLabel:"**/*.labels-meta.xml",CustomMetadata:"**/*.md-meta.xml",StaticResource:"**/*.resource-meta.xml",Profile:"**/*.profile-meta.xml",PermissionSet:"**/*.permissionset-meta.xml",PermissionSetGroup:"**/*.permissionsetgroup-meta.xml",Layout:"**/*.layout-meta.xml",ValidationRule:"**/*.validationRule-meta.xml",RecordType:"**/*.recordType-meta.xml",ListView:"**/*.listView-meta.xml"},n=[],r=a[i];if(r)try{n=(await _.workspace.findFiles(r,"**/node_modules/**")).map(u=>{let d=u.fsPath.split(/[\\/]/).pop()||"";if(i==="LightningComponentBundle"||i==="AuraDefinitionBundle"){let o=u.fsPath.split(/[\\/]/);return o[o.length-2]||d.split(".")[0]}return d.split(".")[0]}),n=[...new Set(n)].sort()}catch{}let l=await new Promise(f=>{let u=_.window.createQuickPick();u.title=`Extract ${i}`,u.placeholder="Type name (e.g. MyComponent) or * for all",u.ignoreFocusOut=!0,u.matchOnDescription=!0;let d=()=>{let o=u.value.trim(),s=[];o?s.push({label:`$(cloud-download) Extract "${o}"`,description:"Extract exact name from Salesforce",alwaysShow:!0}):s.push({label:'$(cloud-download) Extract "*" (All)',description:`Extract all ${i}s`,alwaysShow:!0}),n.forEach(m=>{(!o||m.toLowerCase().includes(o.toLowerCase()))&&s.push({label:m,description:"Local workspace component"})}),u.items=s};u.onDidChangeValue(()=>d()),u.onDidAccept(()=>{let o=u.selectedItems[0];if(o){let s=o.label;s.startsWith('$(cloud-download) Extract "')?s=s.replace('$(cloud-download) Extract "',"").replace('" (All)',"").replace('"',""):s==='$(cloud-download) Extract "*" (All)'&&(s="*"),u.hide(),f(s)}}),u.onDidHide(()=>{u.dispose(),f(void 0)}),d(),u.show()});l&&await _.window.withProgress({location:_.ProgressLocation.Notification,title:`Ricwiz: Extracting ${i}:${l} from Salesforce...`,cancellable:!0},async(f,u)=>{try{E.show(!0);let d=`${i}:${l}`,{stdout:o,stderr:s}=await p(`sf project retrieve start -m "${d}"`,{cwd:t});o&&E.appendLine(o),s&&E.appendLine(s),_.window.showInformationMessage(`Ricwiz: Successfully extracted ${d}.`)}catch(d){E.appendLine(`ERROR: ${d.message}`),d.stdout&&E.appendLine(d.stdout),d.stderr&&E.appendLine(d.stderr),_.window.showErrorMessage("Ricwiz: Extraction failed. See Output channel for details.")}})}var _,Lt=C(()=>{"use strict";_=b(require("vscode"));$()});async function Ot(){let t=O.window.activeTextEditor;if(!t){O.window.showErrorMessage("Ricwiz: Please open the file you want to deploy in the editor first.");return}let e=t.document.uri.fsPath,i=y();if(!i)return;let a="";if(await O.window.withProgress({location:O.ProgressLocation.Notification,title:"Ricwiz: Fetching available Salesforce orgs...",cancellable:!1},async()=>{try{let{stdout:u}=await p("sf org list --json",{cwd:i});a=u}catch(u){a=u.stdout||""}}),!a){O.window.showErrorMessage("Ricwiz: Failed to fetch orgs. Is Salesforce CLI installed?");return}let n=[];try{let u=JSON.parse(a),d=u.result?.nonScratchOrgs||[],o=u.result?.scratchOrgs||[];n=[...d,...o]}catch{O.window.showErrorMessage("Ricwiz: Failed to parse org list.");return}if(n.length===0){O.window.showInformationMessage("Ricwiz: No authenticated orgs found.");return}let r=n.map(u=>({label:u.alias||u.username,description:u.alias?u.username:"",picked:u.isDefaultUsername})),l=await O.window.showQuickPick(r,{placeHolder:"Select the org(s) to deploy this file to",canPickMany:!0,ignoreFocusOut:!0});if(!l||l.length===0)return;let f=Ft.basename(e);await O.window.withProgress({location:O.ProgressLocation.Notification,title:`Ricwiz: Deploying ${f} to ${l.length} org(s)...`,cancellable:!1},async()=>{E.show(!0),E.appendLine(`--- Starting Parallel Deploy of ${f} ---`);let u=l.map(async m=>{let c=m.label;E.appendLine(`[${c}] Deploying...`);try{let{stdout:g,stderr:h}=await p(`sf project deploy start -d "${e}" -o "${c}"`,{cwd:i});return E.appendLine(`[${c}] \u2705 Success`),g&&E.appendLine(g),{org:c,success:!0}}catch(g){return E.appendLine(`[${c}] \u274C Failed`),g.stdout&&E.appendLine(g.stdout),g.stderr&&E.appendLine(g.stderr),{org:c,success:!1}}}),d=await Promise.all(u),o=d.filter(m=>m.success).length,s=d.filter(m=>!m.success).length;s===0?O.window.showInformationMessage(`Ricwiz: Successfully deployed to all ${o} orgs!`):O.window.showErrorMessage(`Ricwiz: Deploy finished with errors (${o} success, ${s} failed). Check Output channel.`)})}var O,Ft,Nt=C(()=>{"use strict";O=b(require("vscode")),Ft=b(require("path"));$()});async function jt(){let t=y();if(!t){B.window.showErrorMessage("Ricwiz: Open a folder or workspace that is a Git repository.");return}let e=B.workspace.getConfiguration("ricwiz"),i=e.get("auditUsername",""),a=e.get("auditHours",8),n=await B.window.showInputBox({prompt:"Enter your Salesforce Username to query in SetupAuditTrail",value:i,placeHolder:"admin@tuaorg.com"});if(!n)return;let r=await B.window.showInputBox({prompt:"How many hours back do you want to search?",value:a.toString(),placeHolder:"8"});if(!r)return;let l=parseFloat(r);if(isNaN(l)||l<=0){B.window.showErrorMessage("Ricwiz: Invalid hours specified.");return}let f=new Date(Date.now()-l*60*60*1e3).toISOString(),d=`sf data query -q "${`SELECT Action, Display, Section FROM SetupAuditTrail WHERE CreatedBy.Username = '${n}' AND CreatedDate >= ${f}`}" --json`;await B.window.withProgress({location:B.ProgressLocation.Notification,title:"Ricwiz: Interrogating Setup Audit Trail...",cancellable:!1},async()=>{try{let{stdout:o}=await p(d,{cwd:t,maxBuffer:52428800}),s=JSON.parse(o);if(!s.result||s.result.records.length===0){B.window.showInformationMessage(`Ricwiz: No changes found for ${n} in the last ${l} hours.`);return}let m=s.result.records,c=[],g=new Set;for(let S of m){let q=po(S.Action,S.Display,S.Section);if(q){let ce=`${q.isDelete?"DEL":"ADD"}-${q.metadataFormat}`;if(!g.has(ce)){g.add(ce);let de=q.isDelete?"$(trash)":"$(plus)";c.push({label:`${de} ${q.metadataFormat}`,description:`${S.Action} -> ${S.Display}`,metadataFormat:q.metadataFormat,isDelete:q.isDelete})}}}if(c.length===0){B.window.showInformationMessage(`Ricwiz: No extractable metadata changes found for ${n} in the last ${l} hours (ignored passwords/logins).`);return}let h=await B.window.showQuickPick(c,{canPickMany:!0,placeHolder:"Select the changes you want to extract to GitLab",ignoreFocusOut:!0});if(!h||h.length===0){B.window.showInformationMessage("Ricwiz: No changes selected.");return}let w=h.filter(S=>S.isDelete),R=h.filter(S=>!S.isDelete),k=B.window.createOutputChannel("Ricwiz Admin Bridge");if(k.show(),w.length>0){let{stdout:S}=await p("git ls-files",{cwd:t}),q=S.split(`
`).map(de=>de.trim()),ce=0;for(let de of w){let M=de.metadataFormat.split(":"),he=M[0],we=M[1],ve=we;he==="CustomField"&&(ve=we.split(".")[1]);let so=q.filter(Ce=>{let ye=Ae.basename(Ce);return ye.startsWith(ve+".")&&ye.includes(he==="CustomField"?".field":"")});for(let Ce of so){let ye=Ae.join(t,Ce);Te.existsSync(ye)&&(Te.unlinkSync(ye),k.appendLine(`Deleted local file: ${Ce}`),ce++)}}B.window.showInformationMessage(`Ricwiz: Deleted ${ce} local files from Git workspace.`)}if(R.length===0)return;let N=R.map(S=>S.metadataFormat).filter(S=>S!=="").join(", "),j=await B.window.showInputBox({prompt:"Review and adjust the metadata components to retrieve",value:N,ignoreFocusOut:!0});if(!j)return;let L=`sf project retrieve start -m "${j}"`;k.appendLine(`Executing: ${L}`),B.window.showInformationMessage(`Ricwiz: Extracting ${R.length} components...`);let ae=await p(L,{cwd:t});k.appendLine(ae.stdout),ae.stderr&&(k.appendLine("--- STDERR ---"),k.appendLine(ae.stderr)),B.window.showInformationMessage("Ricwiz: Changes extracted successfully! Ready for Git Commit.")}catch(o){B.window.showErrorMessage(`Ricwiz: Error capturing changes - ${o.message}`)}})}function po(t,e,i){if(!t||!e||!i)return null;let a=t.toLowerCase(),n=i.toLowerCase();if(["security controls","network access","session settings","data export","login history","password policies","identity verification","delegated administration"].includes(n)||a.includes("login")||a.includes("password")||a.includes("oauth")||a.includes("session"))return null;let l=a.includes("delete"),f=null;if(a==="permissionsetgroupcomponentadd"||a==="permissionsetgroupcomponentdelete")return null;let u=(d,o=!1)=>{let s=d.replace(/\(.*\)/g,"").trim();s.includes(":")&&!a.includes("calculation")&&(s=s.split(":")[0]);let m=["disabled","deleted","removed","created","changed","updated","from","to","on","assigned","assign","assignment","permission","set","group","apex","class","trigger","custom","field","object","layout","validation","rule","flow","profile"],c=s.split(/\s+/);if(o){for(;c.length>0&&m.includes(c[c.length-1].toLowerCase());)c.pop();for(;c.length>0&&m.includes(c[0].toLowerCase());)c.shift();return c.join(" ").trim().replace(/[^a-zA-Z0-9_ ]/g,"")}else return c.filter(w=>!m.includes(w.toLowerCase())).join("_").replace(/[^a-zA-Z0-9_]/g,"")||s.replace(/\s+/g,"")};if(a.includes("profile"))f=`Profile:${u(e,!0)}`;else if(a.includes("permissionsetgroupcalculation")){let d=e.split(":");f=`PermissionSetGroup:${d.length>1?d[d.length-1].trim():u(e,!1)}`}else if(a.includes("permission set group")||a.includes("permissionsetgroup"))f=`PermissionSetGroup:${u(e,!1)}`;else if(a.includes("permission set")||a.includes("permissionset"))f=`PermissionSet:${u(e,!1)}`;else if(a.includes("apexclass"))f=`ApexClass:${u(e,!1)}`;else if(a.includes("apextrigger")||a.includes("apex trigger"))f=`ApexTrigger:${u(e,!1)}`;else if(a.includes("customfield")){let d=e.match(/([A-Za-z0-9_]+__c)/),o=e.match(/(?:on|na|for)\s+([A-Za-z0-9_]+)/i);d&&o?f=`CustomField:${o[1]}.${d[1]}`:f=`CustomField:${u(e,!1)}`}else if(a.includes("layout"))f=`Layout:${u(e,!0)}`;else if(a.includes("validation"))f=`ValidationRule:${u(e,!1)}`;else if(a.includes("flow"))f=`Flow:${u(e,!1)}`;else if(a.includes("customobject")){let d=e.match(/([A-Za-z0-9_]+__c)/);f=d?`CustomObject:${d[1]}`:`CustomObject:${u(e,!1)}`}else if(!a.includes("created")&&!a.includes("changed")&&!a.includes("deleted"))return null;return f?{metadataFormat:f,isDelete:l}:null}var B,Te,Ae,Ut=C(()=>{"use strict";B=b(require("vscode")),Te=b(require("fs")),Ae=b(require("path"));$()});async function Wt(){let t=y();if(t)try{let{stdout:e}=await p('git for-each-ref --sort=-committerdate --format="%(refname:short)|||%(committerdate:relative)|||%(subject)" refs/heads/',{cwd:t}),i=e.split(`
`).filter(n=>n.trim()).map(n=>{let r=n.split("|||");return{label:`$(git-branch) ${r[0]}`,description:r[1],detail:r[2],branchName:r[0]}}),a=await Le.window.showQuickPick(i,{placeHolder:"Select a branch from history to checkout",matchOnDescription:!0,matchOnDetail:!0});a&&await fe(a.branchName)}catch{Le.window.showErrorMessage("Ricwiz: Failed to get branch history")}}var Le,qt=C(()=>{"use strict";Le=b(require("vscode"));$();Me()});async function Ht(){let t=y();if(!t)return;let e=await ke.window.showInputBox({prompt:"Enter ticket number or name (e.g., 48934)",placeHolder:"48934"});if(e)try{let{stdout:i}=await p(`git branch --list "*${e}*"`,{cwd:t}),a=i.split(`
`).map(l=>l.replace("*","").trim()).filter(l=>l);if(a.length===0){ke.window.showInformationMessage(`Ricwiz: No branches found matching "${e}"`);return}let n=a.map(l=>({label:`$(git-branch) ${l}`,branchName:l})),r=await ke.window.showQuickPick(n,{placeHolder:`Select a branch for ${e}`});r&&await fe(r.branchName)}catch{ke.window.showErrorMessage("Ricwiz: Failed to search branches")}}var ke,Vt=C(()=>{"use strict";ke=b(require("vscode"));$();Me()});async function Gt(){let t=ue.window.activeTextEditor;if(!t)return ue.window.showErrorMessage("Ricwiz: Please open a file in the editor to check blame."),null;let e=t.document.fileName,i=Jt.basename(e),a=y();if(!a)return ue.window.showErrorMessage("Ricwiz: Workspace is not a git repository."),null;let n=[];try{let{stdout:o}=await p(`git log -5 --pretty=format:"%an|%ar|%s|%h" -- "${e}"`,{cwd:a}),s=o.trim().split(`
`);for(let m of s){let c=m.split("|");c.length>=4&&n.push({author:c[0],time:c[1],message:c.slice(2,-1).join("|"),hash:c[c.length-1]})}}catch(o){console.error("Git blame error:",o)}let r="Unknown",l="Unknown",f="Unknown",u=[],d=go(e);if(d)try{await ue.window.withProgress({location:ue.ProgressLocation.Notification,title:`Ricwiz: Analyzing ${d.name} in Salesforce...`,cancellable:!1},async()=>{let o="";if(d.type==="CustomField"){let s=d.name.split(".");s.length===2&&(o=`SELECT LastModifiedBy.Name, LastModifiedDate, CreatedBy.Name FROM CustomField WHERE DeveloperName = '${s[1].replace("__c","")}' AND TableEnumOrId = '${s[0]}'`)}else d.type==="LightningComponentBundle"?o=`SELECT LastModifiedBy.Name, LastModifiedDate, CreatedBy.Name FROM LightningComponentBundle WHERE DeveloperName = '${d.name}'`:o=`SELECT LastModifiedBy.Name, LastModifiedDate, CreatedBy.Name FROM ${d.type} WHERE Name = '${d.name}'`;if(o)try{let{stdout:s}=await p(`sf data query -t -q "${o}" --json`,{cwd:a,maxBuffer:52428800}),m=JSON.parse(s);if(m&&m.result&&m.result.records&&m.result.records.length>0){let c=m.result.records[0];r=c.LastModifiedBy?c.LastModifiedBy.Name:"Unknown",f=c.CreatedBy?c.CreatedBy.Name:"Unknown",l=new Date(c.LastModifiedDate).toLocaleString()}else r="Not found in Org",l="N/A",f="N/A"}catch{r="Query Error",l="N/A",f="N/A"}try{let s="SELECT Action, Display, CreatedBy.Name, CreatedDate FROM SetupAuditTrail ORDER BY CreatedDate DESC LIMIT 1500",{stdout:m}=await p(`sf data query -q "${s}" --json`,{cwd:a,maxBuffer:52428800}),c=JSON.parse(m);if(c&&c.result&&c.result.records){let g=d.name.replace("__c","");u=c.result.records.filter(w=>w.Display&&w.Display.includes(g)).map(w=>({action:w.Action,display:w.Display,author:w.CreatedBy?w.CreatedBy.Name:"Unknown",time:new Date(w.CreatedDate).toLocaleString()})).slice(0,10)}}catch(s){console.error("Audit trail query error:",s)}})}catch(o){console.error("Salesforce query error:",o)}else r="Unsupported Metadata Type",l="N/A";return{fileName:i,gitHistory:n,sfAuthor:r,sfTime:l,sfCreatedBy:f,auditHistory:u}}function go(t){let e=t.replace(/\\/g,"/");if(e.includes("/classes/")){let i=e.match(/\/classes\/([^/.]+)\.cls/);if(i)return{type:"ApexClass",name:i[1]}}if(e.includes("/triggers/")){let i=e.match(/\/triggers\/([^/.]+)\.trigger/);if(i)return{type:"ApexTrigger",name:i[1]}}if(e.includes("/lwc/")){let i=e.match(/\/lwc\/([^/]+)\//);if(i)return{type:"LightningComponentBundle",name:i[1]}}if(e.includes("/aura/")){let i=e.match(/\/aura\/([^/]+)\//);if(i)return{type:"AuraDefinitionBundle",name:i[1]}}if(e.includes("/objects/")&&e.includes("/fields/")){let i=e.match(/\/objects\/([^/]+)\//),a=e.match(/\/fields\/([^/.]+)\.field/);if(i&&a)return{type:"CustomField",name:`${i[1]}.${a[1]}`}}return null}var ue,Jt,_t=C(()=>{"use strict";ue=b(require("vscode")),Jt=b(require("path"));$()});async function Qt(){let t=y();if(!t){W.window.showErrorMessage("Ricwiz: Open a workspace that is a Git repository.");return}let i=W.workspace.getConfiguration("ricwiz").get("ticketSourceBranch","main");await W.window.withProgress({location:W.ProgressLocation.Notification,title:`Ricwiz: Finding deleted files compared to origin/${i}...`,cancellable:!1},async()=>{try{let{stdout:a}=await p(`git diff --name-only --diff-filter=D origin/${i}...HEAD`,{cwd:t}),n=a.split(`
`).map(m=>m.trim()).filter(m=>m.length>0);if(n.length===0){W.window.showInformationMessage(`Ricwiz: No deleted files found compared to origin/${i}.`);return}let r={},l=(m,c)=>{r[m]||(r[m]=[]),r[m].includes(c)||r[m].push(c)};for(let m of n){let c=m.replace(/\\/g,"/");if(c.includes("/classes/")){let g=c.match(/\/classes\/([^/.]+)\.cls/);g&&l("ApexClass",g[1])}else if(c.includes("/triggers/")){let g=c.match(/\/triggers\/([^/.]+)\.trigger/);g&&l("ApexTrigger",g[1])}else if(c.includes("/lwc/")){let g=c.match(/\/lwc\/([^/]+)\//);g&&l("LightningComponentBundle",g[1])}else if(c.includes("/aura/")){let g=c.match(/\/aura\/([^/]+)\//);g&&l("AuraDefinitionBundle",g[1])}else if(c.includes("/objects/")&&c.includes("/fields/")){let g=c.match(/\/objects\/([^/]+)\//),h=c.match(/\/fields\/([^/.]+)\.field/);g&&h&&l("CustomField",`${g[1]}.${h[1]}`)}else if(c.includes("/objects/")){let g=c.match(/\/objects\/([^/.]+)\.object/);g&&l("CustomObject",g[1])}else if(c.includes("/layouts/")){let g=c.match(/\/layouts\/([^/.]+)\.layout/);g&&l("Layout",g[1])}else if(c.includes("/flows/")){let g=c.match(/\/flows\/([^/.]+)\.flow/);g&&l("Flow",g[1])}else if(c.includes("/permissionsets/")){let g=c.match(/\/permissionsets\/([^/.]+)\.permissionset/);g&&l("PermissionSet",g[1])}else if(c.includes("/profiles/")){let g=c.match(/\/profiles\/([^/.]+)\.profile/);g&&l("Profile",g[1])}else if(c.includes("/customMetadata/")){let g=c.match(/\/customMetadata\/([^/.]+)\.md/);g&&l("CustomMetadata",g[1])}else if(c.includes("/flexipages/")){let g=c.match(/\/flexipages\/([^/.]+)\.flexipage/);g&&l("FlexiPage",g[1])}}if(Object.keys(r).length===0){W.window.showInformationMessage("Ricwiz: Found deleted files in Git, but none mapped to recognizable Salesforce metadata.");return}let f=`<?xml version="1.0" encoding="UTF-8"?>
<Package xmlns="http://soap.sforce.com/2006/04/metadata">
`;for(let m of Object.keys(r).sort()){f+=`    <types>
`;for(let c of r[m].sort())f+=`        <members>${c}</members>
`;f+=`        <name>${m}</name>
    </types>
`}f+=`    <version>58.0</version>
</Package>`;let u=Ie.join(t,"destructiveChanges");re.existsSync(u)||re.mkdirSync(u);let d=Ie.join(u,"destructiveChanges.xml"),o=Ie.join(u,"package.xml");re.writeFileSync(d,f,"utf8"),re.existsSync(o)||re.writeFileSync(o,`<?xml version="1.0" encoding="UTF-8"?>
<Package xmlns="http://soap.sforce.com/2006/04/metadata">
    <version>58.0</version>
</Package>`,"utf8");let s=await W.workspace.openTextDocument(d);await W.window.showTextDocument(s),W.window.showInformationMessage("Ricwiz: destructiveChanges.xml generated successfully!")}catch(a){W.window.showErrorMessage(`Ricwiz: Error generating destructive changes: ${a.message}`)}})}var W,Ie,re,Yt=C(()=>{"use strict";W=b(require("vscode")),Ie=b(require("path")),re=b(require("fs"));$()});async function Zt(){let t=y();if(!t)return;let i=ee.workspace.getConfiguration("ricwiz").get("ticketSourceBranch","main");await ee.window.withProgress({location:ee.ProgressLocation.Notification,title:"Ricwiz: Finding Apex Tests to run...",cancellable:!1},async()=>{try{let{stdout:a}=await p(`git diff --name-status origin/${i}...HEAD`,{cwd:t}),n=a.split(`
`).map(m=>m.trim()).filter(m=>m.length>0),r=new Set,l=new Set;for(let m of n){let c=m.split(/\s+/);if(c[0].startsWith("D"))continue;let g=c[1];if(g&&g.endsWith(".cls")){let h=g.match(/\/classes\/([^/.]+)\.cls/);if(h){let w=h[1];w.toLowerCase().endsWith("test")?r.add(w):l.add(w)}}}for(let m of l)r.add(`${m}Test`);if(r.size===0){ee.window.showInformationMessage("Ricwiz: No Apex Classes were modified in this branch.");return}let f=Array.from(r).map(m=>({label:`$(beaker) ${m}`,description:"Apex Test Class"})),u=await ee.window.showQuickPick(f,{canPickMany:!0,title:"Select Test Classes to Run",placeHolder:"Select tests..."});if(!u||u.length===0)return;let o=`sf apex run test -n ${u.map(m=>m.label.replace("$(beaker) ","").trim()).join(",")} -r human -w 30`,s=ee.window.createTerminal("Ricwiz: Smart Tests");s.show(),s.sendText(o)}catch(a){ee.window.showErrorMessage(`Ricwiz: Error finding tests: ${a.message}`)}})}var ee,Xt=C(()=>{"use strict";ee=b(require("vscode"));$()});async function to(t){let e=eo.workspace.getConfiguration("ricwiz"),i=e.get("jiraUrl",""),a=e.get("jiraEmail","")?.trim(),n=e.get("jiraApiToken","")?.trim();if(!i||!n)throw new Error("Jira API Token is not configured in Ricwiz Settings.");let r=i;r.includes("/browse")&&(r=r.split("/browse")[0]),r.endsWith("/")&&(r=r.slice(0,-1));let l=a?`Basic ${Buffer.from(`${a}:${n}`).toString("base64")}`:`Bearer ${n}`,f=new URL(`${r}/rest/api/2/issue/${t}`);return new Promise((u,d)=>{let o=Kt.request(f,{method:"GET",headers:{Authorization:l,Accept:"application/json"}},s=>{if(s.statusCode===401||s.statusCode===403)return d(new Error(`Authentication failed (HTTP ${s.statusCode}). Please check your Jira Email and API Token in settings.`));if(s.statusCode===404)return d(new Error(`Ticket ${t} not found in Jira.`));if(s.statusCode&&s.statusCode>=400)return d(new Error(`Jira API returned HTTP status ${s.statusCode}`));let m="";s.on("data",c=>m+=c),s.on("end",()=>{try{let c=JSON.parse(m);c&&c.fields?u({summary:c.fields.summary||"",description:c.fields.description||"No description provided."}):u(null)}catch{d(new Error("Failed to parse Jira response."))}})});o.on("error",s=>d(new Error(`Network error connecting to Jira: ${s.message}`))),o.end()})}var Kt,eo,oo=C(()=>{"use strict";Kt=b(require("https")),eo=b(require("vscode"))});async function io(t){let e=y();if(e)try{if(!await T.initialize(e))return;let n=(await D(e)).split("-to-")[0];if(!n){pe.window.showErrorMessage("Ricwiz: You are not currently on a valid ticket branch.");return}await pe.window.withProgress({location:pe.ProgressLocation.Notification,title:`Fetching details for ${n}...`,cancellable:!1},async r=>{let l=await to(n);l?(t.setJiraData({ticketId:n,...l}),t.setPage("jira")):pe.window.showErrorMessage("Ricwiz: No data found for this ticket.")})}catch(i){pe.window.showErrorMessage(`Ricwiz Jira Error: ${i.message}`)}}var pe,no=C(()=>{"use strict";pe=b(require("vscode"));$();ne();oo()});var Be={};Fe(Be,{activate:()=>fo,deactivate:()=>ho,webviewProvider:()=>I});module.exports=le(Be);function fo(t){I=new ze(t.extensionUri),t.subscriptions.push(v.window.registerWebviewViewProvider("ricwiz-webview",I));let e=v.window.createStatusBarItem(v.StatusBarAlignment.Left,100);e.command="ricwiz.openJiraTicket",t.subscriptions.push(e);let i,a=v.workspace.getConfiguration("ricwiz").get("autoRefresh",!0);I.setAutoRefresh(a),t.subscriptions.push(v.workspace.onDidChangeConfiguration(r=>{if(r.affectsConfiguration("ricwiz.autoRefresh")){let l=v.workspace.getConfiguration("ricwiz").get("autoRefresh",!0);I?.setAutoRefresh(l)}}));async function n(){let r=v.extensions.getExtension("vscode.git");if(r){let u=function(d){let o="",s;async function m(){let g=v.workspace.workspaceFolders;if(!g)return;let h=g[0].uri.fsPath,w=await D(h);if(w&&w!==o){o=w;let R=v.workspace.getConfiguration("ricwiz"),k=R.get("ticketPrefix","SFPSCA-");if(!w.includes(k)){let M=w.match(/([A-Z]+-)\d+/i);M&&(k=M[1].toUpperCase())}let N=[],j=[],L=[],ae=[],S=R.get("environments",[{name:"Qual",sourceBranch:"quality"},{name:"Val",sourceBranch:"validation"},{name:"Prod",sourceBranch:"main"}]);try{let M=R.get("workspaceCheckoutButtons",["main","quality","validation"]);L=Array.from(new Set(M))}catch{}let q=w.match(new RegExp(`(${k}\\d+(?:-\\d+)?)`,"i"));if(q){let M=q[1].toUpperCase(),he=R.get("commitMessageSuffix","- "),we=/^[A-Z]+-\d+(?:-\d+)?\s*(?:-\s*|:\s*|\s+)?/i;we.test(d.inputBox.value)?d.inputBox.value.toUpperCase().startsWith(M)||(d.inputBox.value=d.inputBox.value.replace(we,`${M}${he}`)):d.inputBox.value=`${M}${he}`+d.inputBox.value,e.text=`$(bookmark) ${M}`,e.tooltip=`Branch: ${w}
Click to open Jira ticket`,e.show();try{let ve=await Ze(h,M,w);N=await Ge(h,ve,M,S)}catch{}}else{e.hide();try{ae=await Ye(h)}catch{}}let[ce,de]=await Promise.all([Qe(h,10),_e(h,w,S)]);j=ce,I?.updateBranch(w,de,N,j,L,ae)}}function c(){I?.isAutoRefreshEnabled()&&(s&&clearTimeout(s),s=setTimeout(()=>{o="",m()},300))}i=()=>{o="",m()},m(),d.state.onDidChange(()=>c()),v.window.onDidChangeWindowState(g=>{g.focused&&c()})};var l=u;r.isActive||await r.activate();let f=r.exports.getAPI(1);f.repositories.length>0&&f.repositories.forEach(d=>u(d)),f.onDidOpenRepository(d=>u(d))}}n(),t.subscriptions.push(v.commands.registerCommand("ricwiz.generateDestructiveChanges",Qt),v.commands.registerCommand("ricwiz.runSmartTests",Zt),v.commands.registerCommand("ricwiz.refreshWebview",()=>{I&&v.commands.executeCommand("workbench.action.webview.reloadWebviewAction")}),v.commands.registerCommand("ricwiz.createBranches",ot),v.commands.registerCommand("ricwiz.prepareDeploy",rt),v.commands.registerCommand("ricwiz.createMergeRequests",dt),v.commands.registerCommand("ricwiz.createMergeRequestsVSCode",lt),v.commands.registerCommand("ricwiz.openJiraTicket",pt),v.commands.registerCommand("ricwiz.openJiraTicketVSCode",gt),v.commands.registerCommand("ricwiz.showJiraDetails",()=>{I&&io(I)}),v.commands.registerCommand("ricwiz.syncAll",ht),v.commands.registerCommand("ricwiz.updateBases",vt),v.commands.registerCommand("ricwiz.deleteUnusedBranches",bt),v.commands.registerCommand("ricwiz.checkoutBranch",fe),v.commands.registerCommand("ricwiz.copyBranchName",kt),v.commands.registerCommand("ricwiz.generatePackageXml",Rt),v.commands.registerCommand("ricwiz.deployPackage",Pt),v.commands.registerCommand("ricwiz.importData",St),v.commands.registerCommand("ricwiz.listTicketFiles",Mt),v.commands.registerCommand("ricwiz.resetTracking",Tt),v.commands.registerCommand("ricwiz.extractComponent",It),v.commands.registerCommand("ricwiz.deployMultiOrg",Ot),v.commands.registerCommand("ricwiz.captureAdminChanges",jt),v.commands.registerCommand("ricwiz.openHistory",Wt),v.commands.registerCommand("ricwiz.searchTicket",Ht),v.commands.registerCommand("ricwiz.whoToBlame",async()=>{let r=await Gt();r&&I&&(I.setBlameData(r),I.setPage("blame"))}),v.commands.registerCommand("ricwiz.manualRefresh",()=>{i&&i()}),v.commands.registerCommand("ricwiz.toggleAutoRefresh",()=>{if(I){let r=!I.isAutoRefreshEnabled();I.setAutoRefresh(r),v.workspace.getConfiguration("ricwiz").update("autoRefresh",r,v.ConfigurationTarget.Global)}}),v.commands.registerCommand("ricwiz.openSettings",()=>{v.commands.executeCommand("workbench.action.openSettings","ricwiz")}))}function ho(){}var v,I,Se=C(()=>{v=b(require("vscode"));$();Xe();Ke();it();at();mt();ft();wt();yt();xt();Me();Ct();zt();Bt();Et();Dt();At();Lt();Nt();Ut();qt();Vt();_t();Yt();Xt();no()});Se();0&&(module.exports={activate,deactivate,webviewProvider});
