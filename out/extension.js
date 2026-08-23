"use strict";var ro=Object.create;var $e=Object.defineProperty;var ao=Object.getOwnPropertyDescriptor;var co=Object.getOwnPropertyNames;var lo=Object.getPrototypeOf,mo=Object.prototype.hasOwnProperty;var C=(t,e,i)=>()=>{if(i)throw i[0];try{return t&&(e=t(t=0)),e}catch(a){throw i=[a],a}};var Fe=(t,e)=>{for(var i in e)$e(t,i,{get:e[i],enumerable:!0})},Oe=(t,e,i,a)=>{if(e&&typeof e=="object"||typeof e=="function")for(let n of co(e))!mo.call(t,n)&&n!==i&&$e(t,n,{get:()=>e[n],enumerable:!(a=ao(e,n))||a.enumerable});return t};var b=(t,e,i)=>(i=t!=null?ro(lo(t)):{},Oe(e||!t||!t.__esModule?$e(i,"default",{value:t,enumerable:!0}):i,t)),pe=t=>Oe($e({},"__esModule",{value:!0}),t);var Le={};Fe(Le,{checkBranchExists:()=>ie,exec:()=>p,extractTicketSuggestion:()=>We,getCurrentBranch:()=>D,getWorkspaceCwd:()=>y,normalizeTicketId:()=>qe,promptForTicketId:()=>U,resolvePrefix:()=>Ue,ricwizLogger:()=>E});function y(){let t=ge.workspace.workspaceFolders;if(t)return t[0].uri.fsPath}async function D(t){try{let{stdout:e}=await p("git branch --show-current",{cwd:t});return e.trim()}catch{return""}}function Ue(t,e){if(!t.includes(e)){let i=t.match(/([A-Z]+-)\d+/i);if(i)return i[1].toUpperCase()}return e}function We(t,e,i=!1){let a=t.match(new RegExp(`(${e}\\d+)`,"i"));return a?a[1].toUpperCase():t.includes(e)&&!t.includes("-to-")?t.substring(t.indexOf(e)):i&&t.includes("-to-")?t.substring(t.indexOf(e)).split("-to-")[0]:""}function qe(t,e){let i=t.trim();return/^\d/.test(i)?`${e}${i}`.toUpperCase():i.toUpperCase()}async function U(t,e){let i=ge.workspace.getConfiguration("ricwiz"),a=e?.prefix??i.get("ticketPrefix","SFPSCA-"),n=await D(t),r=Ue(n,a),c=We(n,r,e?.handleToSuffix),g=await ge.window.showInputBox({prompt:e?.prompt||"Enter the full ticket ID (e.g., SCPSCA-1234) or just the number",placeHolder:e?.placeHolder||"Ticket ID or number",value:c});return g?{ticketId:qe(g,r),currentBranch:n,prefix:r}:void 0}async function ie(t,e){try{return await p(`git show-ref --verify --quiet refs/heads/${e}`,{cwd:t}),!0}catch{}try{return await p(`git show-ref --verify --quiet refs/remotes/origin/${e}`,{cwd:t}),!0}catch{}return!1}var ge,je,Ne,uo,E,p,$=C(()=>{"use strict";ge=b(require("vscode")),je=b(require("child_process")),Ne=b(require("util")),uo=Ne.promisify(je.exec),E=ge.window.createOutputChannel("Ricwiz"),p=async(t,e)=>{E.appendLine(`[EXEC] ${t}`);let i=await uo(t,{maxBuffer:50*1024*1024,...e});return{stdout:i.stdout.toString(),stderr:i.stderr.toString()}}});function He(){let t=new Map;function e(a,n){let r=n,c=t.get(r);if(c)return c;let g=(async()=>{try{let{stdout:m}=await p(`git rev-parse origin/${n}`,{cwd:a});return m.trim()}catch{let{stdout:m}=await p(`git rev-parse ${n}`,{cwd:a});return m.trim()}})();return t.set(r,g),g}function i(a,n){let r=`branch:${n}`,c=t.get(r);if(c)return c;let g=(async()=>{let{stdout:m}=await p(`git rev-parse ${n}`,{cwd:a});return m.trim()})();return t.set(r,g),g}return{resolveEnvRef:e,resolveBranchRef:i}}async function Ve(t,e,i,a,n){try{if(!(await p(`git --no-pager log ${e} --grep="\\\\b${i}\\\\b" -i -E -1 --format="%h"`,{cwd:t}).catch(()=>({stdout:"",stderr:""}))).stdout.trim())return!1;let[c,g]=await Promise.all([n.resolveBranchRef(t,e),n.resolveEnvRef(t,a.sourceBranch)]);if(c===g)return!1;try{return await p(`git merge-base --is-ancestor ${e} origin/${a.sourceBranch}`,{cwd:t}),!0}catch{try{return await p(`git merge-base --is-ancestor ${e} ${a.sourceBranch}`,{cwd:t}),!0}catch{return!1}}}catch{return!1}}function Je(t,e){return e.find(i=>t.endsWith(`-to-${i.name}`))}async function Ge(t,e,i,a){let n=He();return await Promise.all(e.map(async c=>{let g=Je(c,a);if(!g)return{name:c,isMerged:!1};let m=await Ve(t,c,i,g,n);return{name:c,isMerged:m}}))}async function _e(t,e,i){let a=Je(e,i);if(!a)return!1;let n=e.replace(new RegExp(`-to-${a.name}$`,"i"),""),r=He();return Ve(t,e,n,a,r)}async function Ye(t,e=10){try{let{stdout:i}=await p(`git log --oneline -${e} --format="%h|||%s|||%ar"`,{cwd:t});return i.split(`
`).filter(a=>a.trim()).map(a=>{let n=a.split("|||");return{hash:n[0]||"",message:n.length>=3?n.slice(1,-1).join("|||"):n[1]||"",timeAgo:n.length>=3?n[n.length-1]:""}})}catch{return[]}}async function Qe(t,e=3){try{let{stdout:i}=await p('git for-each-ref --sort=-committerdate --format="%(refname:short)" refs/heads/',{cwd:t}),a=i.split(`
`).map(r=>r.trim()).filter(r=>r),n=/^[A-Z]+-\d+$/i;return a.filter(r=>n.test(r)).slice(0,e)}catch{return[]}}async function Ze(t,e,i){let{stdout:a}=await p(`git branch --list "*${e}*"`,{cwd:t});return a.split(`
`).map(n=>n.replace("*","").trim()).filter(n=>n&&n!==i)}var Xe=C(()=>{"use strict";$()});function z(t){return t.replace(/&/g,"&amp;").replace(/</g,"&lt;").replace(/>/g,"&gt;").replace(/"/g,"&quot;").replace(/'/g,"&#39;")}var x,Re,Ke=C(()=>{"use strict";x=b(require("vscode"));Re=class{constructor(e){this._extensionUri=e}_extensionUri;webviewView;resolveWebviewView(e,i,a){this.webviewView=e,e.webview.options={enableScripts:!0,localResourceRoots:[this._extensionUri]},this.updateBranch("",!1),e.webview.onDidReceiveMessage(n=>{switch(n.command){case"createBranches":x.commands.executeCommand("ricwiz.createBranches");break;case"prepareDeploy":x.commands.executeCommand("ricwiz.prepareDeploy");break;case"openMRs":x.commands.executeCommand("ricwiz.createMergeRequests");break;case"openMRsVSCode":x.commands.executeCommand("ricwiz.createMergeRequestsVSCode");break;case"openJira":x.commands.executeCommand("ricwiz.openJiraTicket");break;case"showJiraDetails":x.commands.executeCommand("ricwiz.showJiraDetails");break;case"openJiraVSCode":x.commands.executeCommand("ricwiz.openJiraTicketVSCode");break;case"openSettings":x.commands.executeCommand("ricwiz.openSettings");break;case"checkout":n.branch&&x.commands.executeCommand("ricwiz.checkoutBranch",n.branch);break;case"copyBranch":x.commands.executeCommand("ricwiz.copyBranchName");break;case"generatePackageXml":x.commands.executeCommand("ricwiz.generatePackageXml");break;case"openDevTools":this.setPage("devtools");break;case"openMain":this.setPage("main");break;case"generateDestructiveChanges":x.commands.executeCommand("ricwiz.generateDestructiveChanges");break;case"deployPackage":x.commands.executeCommand("ricwiz.deployPackage");break;case"runSmartTests":x.commands.executeCommand("ricwiz.runSmartTests");break;case"importData":x.commands.executeCommand("ricwiz.importData");break;case"listTicketFiles":x.commands.executeCommand("ricwiz.listTicketFiles");break;case"resetTracking":x.commands.executeCommand("ricwiz.resetTracking");break;case"extractComponent":x.commands.executeCommand("ricwiz.extractComponent");break;case"deployMultiOrg":x.commands.executeCommand("ricwiz.deployMultiOrg");break;case"captureAdminChanges":x.commands.executeCommand("ricwiz.captureAdminChanges");break;case"whoToBlame":x.commands.executeCommand("ricwiz.whoToBlame");break;case"syncAll":x.commands.executeCommand("ricwiz.syncAll");break;case"updateBases":x.commands.executeCommand("ricwiz.updateBases");break;case"deleteUnused":x.commands.executeCommand("ricwiz.deleteUnusedBranches");break;case"conflict_commitAndContinue":x.commands.executeCommand("ricwiz.conflictAction","commitAndContinue");break;case"conflict_resolveDeletions":x.commands.executeCommand("ricwiz.conflictAction","resolveDeletions");break;case"conflict_abortDeploy":x.commands.executeCommand("ricwiz.conflictAction","abortDeploy");break;case"openFile":if(n.file){let r=x.workspace.workspaceFolders;if(r){let c=x.Uri.joinPath(r[0].uri,n.file);x.commands.executeCommand("vscode.open",c)}}break;case"searchTicket":x.commands.executeCommand("ricwiz.searchTicket");break;case"manualRefresh":x.commands.executeCommand("ricwiz.manualRefresh");break;case"toggleAutoRefresh":x.commands.executeCommand("ricwiz.toggleAutoRefresh");break;case"openHistory":x.commands.executeCommand("ricwiz.openHistory");break}})}conflictState=null;setConflictState(e){this.conflictState=e,this.updateView()}updateBranch(e,i,a=[],n=[],r=[],c=[]){this.webviewView&&(this.currentBranchCache=e,this.currentBranchIsMergedCache=i,this.relatedBranchesCache=a,this.commitsCache=n,this.baseBranchesCache=r,this.recentTicketsCache=c,this.updateView())}currentBranchCache="";currentBranchIsMergedCache=!1;relatedBranchesCache=[];commitsCache=[];baseBranchesCache=[];recentTicketsCache=[];currentPage="main";blameDataCache=null;jiraDataCache=null;autoRefreshEnabled=!0;setBlameData(e){this.blameDataCache=e}setJiraData(e){this.jiraDataCache=e}setAutoRefresh(e){this.autoRefreshEnabled=e,this.updateView()}isAutoRefreshEnabled(){return this.autoRefreshEnabled}setPage(e){this.currentPage=e,this.updateView()}updateView(){if(!this.webviewView)return;let e=this.webviewView.webview.asWebviewUri(x.Uri.joinPath(this._extensionUri,"resources","logo.png"));this.webviewView.webview.html=this._getHtmlForWebview(e,this.currentBranchCache,this.relatedBranchesCache,this.commitsCache,this.baseBranchesCache,this.recentTicketsCache,this.currentPage)}_getHtmlForWebview(e,i,a,n,r,c,g){let m=n.length>0?`
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
        `:"",u=`
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
                ${u}
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
            </html>`}if(g==="blame"){let o=this.blameDataCache;return`<!DOCTYPE html>
            <html lang="en">
            <head>
                <meta charset="UTF-8">
                <meta name="viewport" content="width=device-width, initial-scale=1.0">
                <title>Ricwiz Blame</title>
                ${u}
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
            </html>`}if(g==="jira"){let o=this.jiraDataCache,s=o?.ticketId||"Jira",l=o?.summary||"No Title",d=o?.description||"No description provided.";return`<!DOCTYPE html>
            <html lang="en">
            <head>
                <meta charset="UTF-8">
                <meta name="viewport" content="width=device-width, initial-scale=1.0">
                <title>Ricwiz Jira Details</title>
                ${u}
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
                    <div class="jira-title">${z(l)}</div>
                    <div class="jira-desc">${z(d)}</div>
                </div>

                <script>
                    const vscode = acquireVsCodeApi();
                    function sendCommand(command, args) {
                        vscode.postMessage({ command, args });
                    }
                </script>
            </body>
            </html>`}return g==="devtools"?`<!DOCTYPE html>
            <html lang="en">
            <head>
                <meta charset="UTF-8">
                <meta name="viewport" content="width=device-width, initial-scale=1.0">
                <title>Ricwiz DevTools</title>
                ${u}
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
            ${u}
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
                    `:c.length>0?`
                        <div style="margin-top: 10px; border-top: 1px solid var(--vscode-panel-border); padding-top: 10px;">
                            <div style="font-size: 10px; opacity: 0.7; margin-bottom: 6px; text-transform: uppercase; text-align: center;">Recent Tickets</div>
                            <div style="display: flex; flex-direction: column; gap: 4px;">
                                ${c.map(o=>`
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

            ${m}
            
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
        </html>`}}});var le,et=C(()=>{"use strict";le=class{static isValidShellArg(e){return e?/^[a-zA-Z0-9\-_/.]+$/.test(e):!1}}});var be,tt,ze,T,ne=C(()=>{"use strict";be=b(require("vscode")),tt=b(require("path")),ze=b(require("fs")),T=class t{style;upstreamRemote;originRemote;ticketSourceBranch;ticketPrefix;environments;static baseConfig=be.workspace.getConfiguration("ricwiz");activeProfile;constructor(e){this.activeProfile=e;let i=t.baseConfig;this.style=e?.workflowStyle||i.get("workflowStyle","standard"),this.style==="multi-remote"?(this.upstreamRemote=e?.upstreamRemote||i.get("upstreamRemote","salesforce-master"),this.originRemote=e?.originRemote||i.get("originRemote","origin")):(this.upstreamRemote="origin",this.originRemote="origin"),this.ticketSourceBranch=e?.ticketSourceBranch||i.get("ticketSourceBranch","main"),this.ticketPrefix=e?.ticketPrefix||i.get("ticketPrefix","SFPSCA-");let a=[{name:"Qual",sourceBranch:"quality"},{name:"Val",sourceBranch:"validation"},{name:"Prod",sourceBranch:"main"}];this.environments=e?.environments||i.get("environments",a)}getConfig(e,i){return this.activeProfile&&this.activeProfile[e]!==void 0?this.activeProfile[e]:t.baseConfig.get(e,i)}static async initialize(e){let i=t.baseConfig.get("profiles",[]),a=tt.join(e,"ricwiz.json");if(ze.existsSync(a))try{let n=ze.readFileSync(a,"utf-8"),r=JSON.parse(n);r&&Array.isArray(r.profiles)&&(i=[...i,...r.profiles])}catch(n){be.window.showErrorMessage(`Ricwiz: Error parsing ricwiz.json: ${n.message}`)}if(i.length>0){let n=i.map(g=>g.name),r=await be.window.showQuickPick(n,{placeHolder:"Ricwiz: Select Workflow Profile",ignoreFocusOut:!0});if(!r)return;let c=i.find(g=>g.name===r);return new t(c)}return new t}buildUpstreamPath(e){return e.includes("/")?e:`${this.upstreamRemote}/${e}`}getFetchRemote(e){return e.includes("/")?e.split("/")[0]:this.upstreamRemote}getFetchBranch(e){return e.includes("/")?e.substring(e.indexOf("/")+1):e}}});async function ot(){let t=y();if(!t){B.window.showErrorMessage("Open a folder or workspace that is a Git repository.");return}let e=await T.initialize(t);if(!e)return;let i=await U(t,{prefix:e.ticketPrefix});if(!i){B.window.showErrorMessage("Branch creation cancelled: Ticket not provided.");return}let{ticketId:a}=i,n=e.environments,r="all";if(n.length>0){let m=[{label:"Create Main Branch & Environments",description:"Creates the main ticket branch and all environment branches",value:"all"},{label:"Create Main Branch Only",description:"Creates only the main ticket branch (skips environments)",value:"mainOnly"},{label:"Create Environments Only",description:"Creates only the environment branches (skip main branch)",value:"envs"}],u=await B.window.showQuickPick(m,{placeHolder:"What branches do you want to create?",title:"Ricwiz Branch Creation"});if(!u){B.window.showInformationMessage("Branch creation cancelled.");return}r=u.value}let c=e.ticketSourceBranch;if(r==="all"||r==="mainOnly"){let m=[];try{let{stdout:o}=await p('git branch --all --format="%(refname:short)"',{cwd:t});m=o.split(`
`).map(s=>s.trim()).filter(s=>s&&s!=="origin"),m=[...new Set(m)]}catch{}let u=await new Promise(o=>{let s=B.window.createQuickPick();s.title="Ricwiz: Ticket Source Branch",s.placeholder="Confirm or change the source branch for this ticket",s.value=e.ticketSourceBranch,s.ignoreFocusOut=!0;let l=()=>{let d=s.value.trim(),f=[];d&&f.push({label:d,description:"Use typed branch"}),m.forEach(h=>{h!==d&&(!d||h.toLowerCase().includes(d.toLowerCase()))&&f.push({label:h,description:h.startsWith("origin/")||h.includes("/")?"Remote branch":"Local branch"})}),s.items=f};s.onDidChangeValue(()=>l()),s.onDidAccept(()=>{let d=s.selectedItems[0];d?(s.hide(),o(d.label)):s.value.trim()&&(s.hide(),o(s.value.trim()))}),s.onDidHide(()=>{s.dispose(),o(void 0)}),l(),s.show()});if(!u){B.window.showInformationMessage("Branch creation cancelled.");return}c=u.trim()}let g=a;if(!le.isValidShellArg(g)){B.window.showErrorMessage(`Invalid format for ticket ID: ${g}`);return}if(!le.isValidShellArg(c)){B.window.showErrorMessage(`Invalid format for ticketSourceBranch in settings: ${c}`);return}for(let m of n){if(!le.isValidShellArg(m.name)){B.window.showErrorMessage(`Invalid format for environment name in settings: ${m.name}`);return}if(!le.isValidShellArg(m.sourceBranch)){B.window.showErrorMessage(`Invalid format for environment sourceBranch in settings: ${m.sourceBranch}`);return}}try{await p("git status",{cwd:t})}catch{B.window.showErrorMessage("The opened folder does not appear to be a valid Git repository.");return}try{await B.window.withProgress({location:B.ProgressLocation.Notification,title:"Ricwiz: Creating Branches",cancellable:!1},async m=>{let u=[];m.report({message:"Checking remote status (git fetch)...",increment:10});try{await p("git fetch",{cwd:t})}catch{}try{if(r==="all"||r==="mainOnly"){if(m.report({message:`Creating main branch ${g}...`,increment:10}),await ie(t,g))B.window.showInformationMessage(`Ricwiz: The branch ${g} already exists. Skipping creation...`),await p(`git checkout ${g}`,{cwd:t});else try{let o=e.getFetchRemote(c),s=e.getFetchBranch(c),l=e.buildUpstreamPath(c);await p(`git fetch ${o} ${s}`,{cwd:t}),await p(`git checkout -b ${g} ${l}`,{cwd:t}),u.push(g)}catch{try{await p(`git checkout -b ${g} ${c}`,{cwd:t}),u.push(g)}catch{throw new Error(`Could not create main branch '${g}' from '${c}'. Does the source branch exist?`)}}try{await p(`git config branch.${g}.ricwiz-source "${c}"`,{cwd:t})}catch{}}if(r==="all"||r==="envs"){let o=50/(n.length||1);for(let s of n){let l=`${a}-to-${s.name}`,d=s.sourceBranch;if(m.report({message:`Processing environment branch ${l}...`,increment:o}),!await ie(t,l))try{let f=e.buildUpstreamPath(d);await p(`git checkout -b ${l} ${f}`,{cwd:t}),u.push(l)}catch{try{await p(`git checkout -b ${l} ${d}`,{cwd:t}),u.push(l)}catch{throw new Error(`Could not create environment branch '${l}' from '${d}'. Does the source branch exist?`)}}}}m.report({message:`Publishing branches to ${e.originRemote}...`,increment:10});for(let o of u)try{await p(`git push -u ${e.originRemote} ${o}`,{cwd:t})}catch{B.window.showWarningMessage(`Ricwiz: Branch ${o} was created locally but could not be pushed to ${e.originRemote}.`)}if(r==="all"||r==="mainOnly"){m.report({message:`Switching to ${g}...`,increment:10});try{await p(`git checkout ${g}`,{cwd:t})}catch{}}m.report({increment:100}),B.window.showInformationMessage("Ricwiz: All set! You can start working on your branches! \u{1F680}")}catch(o){if(B.window.showErrorMessage(`Ricwiz Branch Creation Failed: ${o.message}`),u.length>0){try{await p(`git checkout ${c}`,{cwd:t})}catch{}for(let s of u)try{await p(`git branch -D ${s}`,{cwd:t})}catch{}B.window.showWarningMessage(`Ricwiz: Rolled back (deleted) ${u.length} branch(es) locally due to failure.`)}}})}catch(m){B.window.showErrorMessage(`Ricwiz general error: ${m.message}`)}}var B,it=C(()=>{"use strict";B=b(require("vscode"));$();et();ne()});async function se(t,e,i,a){a&&a.report({message:"CONFLICT! Resolve & click 'Commit & Continue' in Ricwiz panel."});let n=!1,r=!1,c=async()=>{try{let{stdout:o}=await p("git status --porcelain",{cwd:t});return o.split(`
`).filter(s=>{let l=s.substring(0,2);return["UD","DU","DD","AU","UA"].includes(l)}).map(s=>s.substring(3).trim())}catch{return[]}},g=async()=>{try{let{stdout:o}=await p("git status --porcelain",{cwd:t}),s=l=>l==="UU"?"Both Modified":l==="UD"?"Deleted by them":l==="DU"?"Deleted by us":l==="DD"?"Both Deleted":l==="AA"?"Both Added":l==="AU"?"Added by us":l==="UA"?"Added by them":"Conflicted";return o.split(`
`).map(l=>l.trimRight()).filter(l=>l.length>2).filter(l=>{let d=l.substring(0,2);return["UU","AA","UD","DU","AU","UA","DD"].includes(d)}).map(l=>{let d=l.substring(0,2);return{file:l.substring(3).trim(),state:s(d)}})}catch{return[]}},m=async()=>{if(n)return;let o=await c(),s=await g(),{webviewProvider:l}=(Pe(),pe(Be));l&&l.setConflictState({isConflict:!0,sourceStr:e,targetStr:i,deletionsCount:o.length,files:s})},u=K.commands.registerCommand("ricwiz.conflictAction",async o=>{if(o==="abortDeploy")r=!0;else if(o==="resolveDeletions"){try{let l=(await c()).map(f=>({label:f})),d=await K.window.showQuickPick(l,{canPickMany:!0,placeHolder:"Select conflicted files to DELETE",title:"Ricwiz: Delete Conflicted Files"});if(d&&d.length>0){for(let f of d)try{await p(`git rm --force "${f.label}"`,{cwd:t})}catch{}K.window.showInformationMessage(`Ricwiz: Deleted ${d.length} conflicted file(s).`)}}catch(s){K.window.showErrorMessage(`Ricwiz: Error. (${s.message})`)}m()}else if(o==="commitAndContinue")try{let l=(await c()).filter(f=>nt.existsSync(st.join(t,f)));if(l.length>0&&await K.window.showWarningMessage(`Wait! There are ${l.length} file(s) with deletion conflicts that are still on your disk.

If you commit now, you will KEEP them in the project.

Are you sure you want to KEEP them?`,{modal:!0},"Yes, KEEP them","No, let me DELETE them")!=="Yes, KEEP them"){m();return}let d=!1;try{let{stdout:f}=await p('git grep -E "^<<<<<<< "',{cwd:t});f.trim().length>0&&(d=!0)}catch{}if(d){K.window.showErrorMessage("Ricwiz: You still have unresolved conflict markers (<<<<<<<) in your files. Please resolve them first!"),m();return}await p("git add .",{cwd:t}),await p("git commit --no-edit",{cwd:t})}catch(s){K.window.showErrorMessage(`Ricwiz: Could not commit automatically. (${s.message})`),m()}});for(m();;){if(r){n=!0,u.dispose(),(Pe(),pe(Be)).webviewProvider?.setConflictState(null);try{await p("git merge --abort",{cwd:t})}catch{}return!1}try{let{stdout:o}=await p("git status --porcelain",{cwd:t});if(o.trim().length===0)return n=!0,u.dispose(),(Pe(),pe(Be)).webviewProvider?.setConflictState(null),K.window.showInformationMessage("Ricwiz: Changes committed!"),!0}catch{}await new Promise(o=>setTimeout(o,2e3))}}var K,nt,st,Se=C(()=>{"use strict";K=b(require("vscode")),nt=b(require("fs")),st=b(require("path"));$()});async function rt(){let t=y();if(!t){F.window.showErrorMessage("Ricwiz: Open a folder or workspace that is a Git repository.");return}try{await p("git status",{cwd:t})}catch{F.window.showErrorMessage("Ricwiz: The opened folder does not appear to be a valid Git repository.");return}let e=await T.initialize(t);if(!e)return;let i=e.environments,a=await U(t,{prefix:e.ticketPrefix});if(!a){F.window.showErrorMessage("Operation cancelled: Ticket not provided.");return}let{ticketId:n,currentBranch:r}=a,c=n;if(!await ie(t,c)){F.window.showErrorMessage(`Ricwiz: Main branch '${c}' does not exist! Prepare deploy is only available when a main ticket branch is used.`);return}let g=e.getConfig("defaultReviewers",""),m="";try{let{stdout:u}=await p(`git config branch.${n}.ricwiz-reviewers`,{cwd:t});m=u.trim()}catch{}if(g.trim()){let u=await F.window.showInputBox({prompt:"Ricwiz: Reviewers for this deploy (optional, comma-separated)",placeHolder:"e.g. @joao, 123456",value:m||g,ignoreFocusOut:!0});if(u===void 0)return;try{u.trim()?await p(`git config branch.${n}.ricwiz-reviewers "${u.trim()}"`,{cwd:t}):m&&await p(`git config --unset branch.${n}.ricwiz-reviewers`,{cwd:t})}catch{}}await F.window.withProgress({location:F.ProgressLocation.Notification,title:"Ricwiz: Preparing Deploy",cancellable:!0},async(u,o)=>{let s=0,l=r,d=!1;o.onCancellationRequested(()=>{d=!0}),u.report({message:"Syncing remote information...",increment:10});try{await p("git fetch --all",{cwd:t});let h=10/(i.length||1);for(let w of i)try{if(d)throw new Error("Aborted");u.report({message:`Fetching ${w.sourceBranch}...`,increment:h});let R=e.getFetchRemote(w.sourceBranch),k=e.getFetchBranch(w.sourceBranch);await p(`git fetch ${R} ${k}:${k}`,{cwd:t})}catch{}}catch{}let f=60/(i.length||1);for(let h of i){if(d)break;let w=`${n}-to-${h.name}`,R=h.sourceBranch;try{u.report({message:`Processing ${w}...`,increment:f/4}),await p(`git checkout ${w}`,{cwd:t});try{await p(`git pull ${e.originRemote} ${w}`,{cwd:t})}catch{}try{u.report({message:`Merging ${R} into ${w}...`,increment:f/4});let k=e.getFetchRemote(R),j=e.getFetchBranch(R),N=e.buildUpstreamPath(R);await p(`git fetch ${k} ${j}`,{cwd:t}),await p(`git merge ${N}`,{cwd:t})}catch(k){let j=!1;try{let{stdout:I}=await p("git ls-files -u",{cwd:t});I.trim().length>0&&(j=!0)}catch{}let N=((k.stdout||"")+(k.stderr||"")+(k.message||"")).toLowerCase();if(j||N.includes("conflict")||N.includes("conflit")){let I=e.buildUpstreamPath(R);if(!await se(t,I,w,u))throw d=!0,new Error("Deploy aborted by user.")}else throw k}try{u.report({message:`Merging ${c} into ${w}...`,increment:f/4}),await p(`git merge ${c}`,{cwd:t})}catch(k){let j=!1;try{let{stdout:I}=await p("git ls-files -u",{cwd:t});I.trim().length>0&&(j=!0)}catch{}let N=((k.stdout||"")+(k.stderr||"")+(k.message||"")).toLowerCase();if(j||N.includes("conflict")||N.includes("conflit")){if(!await se(t,c,w,u))throw d=!0,new Error("Deploy aborted by user.")}else throw k}if(d)break;u.report({message:`Pushing ${w}...`,increment:f/4}),await p(`git push ${e.originRemote} ${w}`,{cwd:t}),s++}catch(k){k.message.includes("aborted")?F.window.showInformationMessage("Ricwiz: Deploy cancelled."):F.window.showErrorMessage(`Ricwiz: Failed to process branch ${w}. Detail: ${k.message}`);return}}if(!d){u.report({message:"Finishing up...",increment:10});let h=l;try{await p(`git show-ref --verify --quiet refs/heads/${c}`,{cwd:t}),h=c}catch{}try{let w=await D(t);h&&h!==w?(await p(`git checkout ${h}`,{cwd:t}),F.window.showInformationMessage(`Ricwiz: Operation complete. Back on branch ${h}.`)):F.window.showInformationMessage("Ricwiz: Operation complete.")}catch{F.window.showInformationMessage("Ricwiz: Operation complete.")}}})}var F,at=C(()=>{"use strict";F=b(require("vscode"));$();Se();ne()});async function ct(t=!1){let e=y();if(!e)return;let i=await T.initialize(e);if(!i)return;let a=await U(e,{prompt:"Enter the full ticket ID for the Merge Requests (e.g., SCPSCA-1234) or just the number"});if(!a)return;let{ticketId:n}=a,c=Y.workspace.getConfiguration("ricwiz").get("gitlabUrlOverride",""),g="";if(c&&c.trim()!=="")g=c.trim();else{let o="";try{let{stdout:s}=await p("git remote get-url origin",{cwd:e});o=s.trim()}catch{Y.window.showErrorMessage("Ricwiz: Could not get the remote origin URL. Please configure the URL manually in the extension settings.");return}g=o,g.endsWith(".git")&&(g=g.slice(0,-4)),g.startsWith("git@")&&(g=g.replace("git@","").replace(":","/"),g=`https://${g}`)}let m=[],u=i.ticketSourceBranch;try{let{stdout:o}=await p(`git config branch.${n}.ricwiz-source`,{cwd:e});o.trim()&&(u=o.trim())}catch{}if(i.environments.length===0)m.push({source:n,target:u});else for(let o of i.environments)m.push({source:`${n}-to-${o.name}`,target:o.sourceBranch});for(let o of m){let s=`${g}/-/merge_requests/new?merge_request[source_branch]=${o.source}&merge_request[target_branch]=${o.target}`;t?Y.commands.executeCommand("simpleBrowser.show",s):Y.env.openExternal(Y.Uri.parse(s))}Y.window.showInformationMessage(`Ricwiz: Opening ${t?"VS Code browser":"external browser"} for Merge Requests!`)}async function dt(){return ct(!1)}async function lt(){return ct(!0)}var Y,mt=C(()=>{"use strict";Y=b(require("vscode"));$();ne()});async function ut(t=!1){let e=y();if(!e)return;let i=Q.workspace.getConfiguration("ricwiz"),a=i.get("jiraUrl","");if(!a||a.trim()===""){Q.window.showErrorMessage("Ricwiz: Jira URL is not configured. Please set it in the extension settings (e.g., https://jira.company.com/browse/).");return}let{getCurrentBranch:n,resolvePrefix:r,extractTicketSuggestion:c}=($(),pe(Le)),g=await n(e),m=i.get("ticketPrefix","SFPSCA-"),u=r(g,m),s=c(g,u,!0);if(s){let{normalizeTicketId:d}=($(),pe(Le));s=d(s,u)}else{let d=await U(e,{prompt:"Ricwiz could not detect the ticket from the branch name. Enter Jira ticket ID (e.g. SFPSCA-1234)",handleToSuffix:!0});if(!d)return;s=d.ticketId}let l=a.trim();l.endsWith("/")||(l+="/"),l+=s,t?Q.commands.executeCommand("simpleBrowser.show",l):Q.env.openExternal(Q.Uri.parse(l)),Q.window.showInformationMessage(`Ricwiz: Opening Jira Ticket ${s} in ${t?"VS Code":"browser"}!`)}async function pt(){return ut(!1)}async function gt(){return ut(!0)}var Q,ft=C(()=>{"use strict";Q=b(require("vscode"));$()});async function ht(){let t=y();if(!t){te.window.showErrorMessage("Ricwiz: Open a folder or workspace that is a Git repository.");return}let e=await T.initialize(t);if(!e)return;let i=await U(t,{prefix:e.ticketPrefix,prompt:"Enter the full ticket ID to sync all branches for (e.g., SCPSCA-1234) or just the number"});if(!i)return;let{ticketId:a,currentBranch:n}=i;await te.window.withProgress({location:te.ProgressLocation.Notification,title:`Ricwiz: Syncing all branches for ${a}...`,cancellable:!1},async r=>{try{r.report({message:"Fetching from remote..."});try{await p("git fetch --all",{cwd:t})}catch{}let{stdout:c}=await p(`git branch --list "*${a}*"`,{cwd:t}),g=c.split(`
`).map(o=>o.replace("*","").trim()).filter(o=>o.length>0);if(g.length===0){te.window.showWarningMessage(`Ricwiz: No local branches found for ${a}.`);return}let m=0,u=0;for(let o of g)if(r.report({message:`Syncing ${o}...`}),o===n)try{await p(`git pull ${e.originRemote} ${o}`,{cwd:t}),m++}catch(s){let l=!1;try{let{stdout:f}=await p("git ls-files -u",{cwd:t});f.trim().length>0&&(l=!0)}catch{}let d=((s.stdout||"")+(s.stderr||"")+(s.message||"")).toLowerCase();(l||d.includes("conflict")||d.includes("conflit"))&&await se(t,`${e.originRemote}/${o}`,o,r)?m++:u++}else try{await p(`git fetch ${e.originRemote} ${o}:${o}`,{cwd:t}),m++}catch{try{await p(`git checkout ${o}`,{cwd:t});try{await p(`git pull ${e.originRemote} ${o}`,{cwd:t}),m++}catch(l){let d=!1;try{let{stdout:h}=await p("git ls-files -u",{cwd:t});h.trim().length>0&&(d=!0)}catch{}let f=((l.stdout||"")+(l.stderr||"")+(l.message||"")).toLowerCase();(d||f.includes("conflict")||f.includes("conflit"))&&await se(t,`${e.originRemote}/${o}`,o,r)?m++:u++}await p(`git checkout ${n}`,{cwd:t})}catch{try{await p(`git checkout ${n}`,{cwd:t})}catch{}u++}}u>0?te.window.showWarningMessage(`Ricwiz: Synced ${m}/${g.length} branches. ${u} branch(es) could not be synced (possible conflicts or diverged history).`):te.window.showInformationMessage(`Ricwiz: \u{1F504} All ${m} branches for ${a} are up to date!`)}catch(c){te.window.showErrorMessage(`Ricwiz: Sync failed: ${c.message}`)}})}var te,wt=C(()=>{"use strict";te=b(require("vscode"));$();Se();ne()});async function vt(){let t=y();if(!t){oe.window.showErrorMessage("Ricwiz: Open a folder or workspace that is a Git repository.");return}try{await p("git status",{cwd:t})}catch{oe.window.showErrorMessage("Ricwiz: The opened folder does not appear to be a valid Git repository.");return}let e=await T.initialize(t);if(!e)return;let i=e.environments,a=await U(t,{prefix:e.ticketPrefix});if(!a)return;let{ticketId:n,currentBranch:r}=a;await oe.window.withProgress({location:oe.ProgressLocation.Notification,title:"Ricwiz: Updating environment branches from their bases",cancellable:!0},async(c,g)=>{let m=0,u=r,o=!1;g.onCancellationRequested(()=>{o=!0}),c.report({message:"Syncing remote information...",increment:10});try{await p("git fetch --all",{cwd:t})}catch{}let s=80/(i.length||1);for(let l of i){if(o)break;let d=`${n}-to-${l.name}`,f=l.sourceBranch;if(await ie(t,d))try{c.report({message:`Processing ${d}...`,increment:s/2}),await p(`git checkout ${d}`,{cwd:t});try{c.report({message:`Merging ${f} into ${d}...`,increment:s/2});let h=e.getFetchRemote(f),w=e.getFetchBranch(f),R=e.buildUpstreamPath(f);await p(`git fetch ${h} ${w}`,{cwd:t}),await p(`git merge ${R}`,{cwd:t})}catch(h){let w=!1;try{let{stdout:k}=await p("git ls-files -u",{cwd:t});k.trim().length>0&&(w=!0)}catch{}let R=((h.stdout||"")+(h.stderr||"")+(h.message||"")).toLowerCase();if(w||R.includes("conflict")||R.includes("conflit")){let k=e.buildUpstreamPath(f);if(!await se(t,k,d,c))throw o=!0,new Error("Update aborted by user.")}else throw h}if(o)break;m++}catch(h){h.message.includes("aborted")?oe.window.showInformationMessage("Ricwiz: Update cancelled."):oe.window.showErrorMessage(`Ricwiz: Failed to update branch ${d}. Detail: ${h.message}`);return}}if(!o){c.report({message:"Finishing up...",increment:10});try{let l=await D(t);u&&u!==l&&await p(`git checkout ${u}`,{cwd:t})}catch{}oe.window.showInformationMessage(`Ricwiz: Successfully updated ${m} environment branches from their bases!`)}})}var oe,yt=C(()=>{"use strict";oe=b(require("vscode"));$();Se();ne()});async function bt(){let t=y();if(!t){A.window.showErrorMessage("Ricwiz: Open a folder or workspace that is a Git repository.");return}let e=await D(t),i=A.workspace.getConfiguration("ricwiz");await A.window.withProgress({location:A.ProgressLocation.Notification,title:"Ricwiz: Scanning for unused local branches...",cancellable:!1},async()=>{try{await p("git fetch --prune",{cwd:t})}catch{}let a=[];try{let{stdout:s}=await p('git branch --format="%(refname:short)"',{cwd:t});a=s.split(`
`).map(l=>l.trim()).filter(l=>l.length>0)}catch{}if(a.length===0){A.window.showInformationMessage("Ricwiz: No local branches found.");return}let n=[];try{let{stdout:s}=await p('git branch -r --format="%(refname:short)"',{cwd:t});n=s.split(`
`).map(l=>l.trim().replace(/^origin\//,"").replace(/^[^\/]+\//,"")).filter(l=>l.length>0&&!l.includes("HEAD"))}catch{}let r=[];try{let{stdout:s}=await p('git for-each-ref --format="%(refname:short)|||%(upstream:track)" refs/heads/',{cwd:t});r=s.split(`
`).filter(l=>l.includes("[gone]")).map(l=>l.split("|||")[0].trim())}catch{}let c=a.filter(s=>!n.includes(s));if(c.length===0){A.window.showInformationMessage("Ricwiz: Your local repository is totally clean! All local branches exist on the remote.");return}let g=c.map(s=>{let l=r.includes(s),d=s===e,f="Not found on remote";return l&&(f="Deleted on remote [gone]"),d&&(f+=" (Current branch - will checkout main first)"),{label:s,description:f,picked:l&&!d}}),m=await A.window.showQuickPick(g,{canPickMany:!0,placeHolder:"Select local branches to delete",title:"Ricwiz: Delete Unused Branches"});if(!m||m.length===0){A.window.showInformationMessage("Ricwiz: No branches selected for deletion.");return}if(await A.window.showWarningMessage(`Ricwiz: Delete ${m.length} local branch(es)?
This cannot be undone!`,{modal:!0},"Yes, delete them")!=="Yes, delete them"){A.window.showInformationMessage("Ricwiz: Deletion cancelled.");return}let o=0;for(let s of m){let l=s.label;if(l===e){let d=i.get("ticketSourceBranch","main");try{await p(`git checkout ${d}`,{cwd:t}),e=d}catch{A.window.showWarningMessage(`Ricwiz: Could not switch away from ${l}. Skipping.`);continue}}try{await p(`git branch -D ${l}`,{cwd:t}),o++}catch{A.window.showWarningMessage(`Ricwiz: Could not delete local branch ${l}.`)}}A.window.showInformationMessage(`Ricwiz: \u{1F5D1}\uFE0F Cleaned up ${o} unused local branch(es).`)})}var A,xt=C(()=>{"use strict";A=b(require("vscode"));$()});async function fe(t){let e=y();e&&await Z.window.withProgress({location:Z.ProgressLocation.Notification,title:`Ricwiz: Switching to ${t}...`,cancellable:!1},async()=>{try{let i=await D(e),a=!1;try{let{stdout:r}=await p("git status --porcelain",{cwd:e});a=r.trim().length>0}catch{}if(a&&i)try{await p(`git stash push --include-untracked -m "ricwiz-auto:${i}"`,{cwd:e}),Z.window.showInformationMessage(`Ricwiz: \u{1F4E6} Stashed changes from ${i}`)}catch{Z.window.showWarningMessage("Ricwiz: Could not stash changes. Checkout may fail if there are conflicts.")}let n=t;t.includes("/")&&(n=t.split("/").slice(1).join("/"));try{await p(`git checkout ${n}`,{cwd:e})}catch{let c="";if(t.includes("/"))c=t.split("/")[0];else{let{stdout:g}=await p("git branch -r",{cwd:e}),m=g.split(`
`).map(o=>o.trim()).filter(o=>o),u=[];for(let o of m){let s=o.split(" ")[0];s.endsWith(`/${n}`)&&u.push(s.substring(0,s.lastIndexOf("/")))}if(u.length===0){Z.window.showErrorMessage(`Ricwiz: A branch "${n}" n\xE3o existe localmente nem em nenhuma remote!`);return}else if(u.length===1)c=u[0];else{let o=await T.initialize(e);u.includes("origin")?c="origin":o&&u.includes(o.upstreamRemote)?c=o.upstreamRemote:c=u[0]}}try{await p(`git fetch ${c} ${n}`,{cwd:e}),await p(`git checkout -b ${n} --track ${c}/${n}`,{cwd:e})}catch{Z.window.showErrorMessage(`Ricwiz: Encontrou na remote ${c} mas falhou a fazer checkout.`);return}}try{let{stdout:r}=await p("git stash list",{cwd:e}),c=r.split(`
`);for(let g=0;g<c.length;g++)if(c[g].includes(`ricwiz-auto:${n}`)){let m=c[g].match(/stash@\{(\d+)\}/);m&&(await p(`git stash pop stash@{${m[1]}}`,{cwd:e}),Z.window.showInformationMessage(`Ricwiz: \u{1F4E6} Restored stashed changes on ${n}`));break}}catch{Z.window.showWarningMessage(`Ricwiz: Could not restore stashed changes on ${n}. You may need to resolve conflicts manually (check git stash list).`)}}catch{Z.window.showErrorMessage(`Ricwiz: Could not checkout branch ${t}.`)}})}var Z,Ee=C(()=>{"use strict";Z=b(require("vscode"));$();ne()});async function kt(){let t=y();if(t)try{let{stdout:e}=await p("git branch --show-current",{cwd:t}),i=e.trim();i&&(await xe.env.clipboard.writeText(i),xe.window.showInformationMessage(`Ricwiz: \u{1F4CB} Copied "${i}" to clipboard`))}catch{xe.window.showErrorMessage("Ricwiz: Could not get the current branch name.")}}var xe,Ct=C(()=>{"use strict";xe=b(require("vscode"));$()});async function Rt(){let t=y();if(!t){H.window.showErrorMessage("Ricwiz: Open a folder or workspace that is a Git repository.");return}let e=H.workspace.getConfiguration("ricwiz"),i=e.get("ticketSourceBranch","main"),n=e.get("packageXmlCommand",'sf sgd source delta --to "HEAD" --from "origin/{baseBranch}" --output-dir "."').replace("{baseBranch}",i);await H.window.showWarningMessage("Are you sure you want to generate the package.xml? This may overwrite existing local manifest files.",{modal:!0},"Yes, Generate")==="Yes, Generate"&&await H.window.withProgress({location:H.ProgressLocation.Notification,title:"Ricwiz: Generating package.xml using Salesforce CLI...",cancellable:!1},async()=>{try{await p(n,{cwd:t,maxBuffer:10*1024*1024}),H.window.showInformationMessage("Ricwiz: Successfully generated package.xml!");let c=Me.join(t,"package","package.xml"),g=Me.join(t,"package.xml"),m=Me.join(t,"manifest","package.xml");for(let u of[c,g,m])if($t.existsSync(u)){let o=await H.workspace.openTextDocument(u);await H.window.showTextDocument(o);break}}catch(c){H.window.showErrorMessage(`Ricwiz: Error running sf command - ${c.message}`)}})}var H,Me,$t,zt=C(()=>{"use strict";H=b(require("vscode")),Me=b(require("path")),$t=b(require("fs"));$()});async function Bt(){let t=y();if(!t){V.window.showErrorMessage("Ricwiz: Open a folder or workspace that is a Git repository.");return}let i=V.workspace.getConfiguration("ricwiz").get("deployCommand","sf project deploy start --manifest package/package.xml --post-destructive-changes destructiveChanges/destructiveChanges.xml -c -l NoTestRun -g");await V.window.showWarningMessage("Are you sure you want to deploy to Salesforce? This action modifies your org and cannot be easily undone.",{modal:!0},"Yes, Deploy")==="Yes, Deploy"&&await V.window.withProgress({location:V.ProgressLocation.Notification,title:"Ricwiz: Deploying package...",cancellable:!1},async()=>{try{let{stdout:n,stderr:r}=await p(i,{cwd:t,maxBuffer:52428800}),c=V.window.createOutputChannel("Ricwiz Deploy");c.appendLine(`Executing: ${i}`),c.appendLine(n),r&&(c.appendLine("--- STDERR ---"),c.appendLine(r)),c.show(),V.window.showInformationMessage("Ricwiz: Successfully ran deploy command!")}catch(n){let r=V.window.createOutputChannel("Ricwiz Deploy");r.appendLine(`Error executing: ${i}`),n.stdout&&r.appendLine(n.stdout),n.stderr&&r.appendLine(n.stderr),r.appendLine(n.message),r.show(),V.window.showErrorMessage("Ricwiz: Error running deploy command. See output channel for details.")}})}var V,Pt=C(()=>{"use strict";V=b(require("vscode"));$()});async function St(){let t=y();if(!t){J.window.showErrorMessage("Ricwiz: Open a folder or workspace that is a Git repository.");return}let i=J.workspace.getConfiguration("ricwiz").get("importDataCommand","sfdx force:data:tree:import --plan data/plan.json");await J.window.showWarningMessage("Are you sure you want to import data into Salesforce? This action modifies records in your org.",{modal:!0},"Yes, Import")==="Yes, Import"&&await J.window.withProgress({location:J.ProgressLocation.Notification,title:"Ricwiz: Importing data...",cancellable:!1},async()=>{try{let{stdout:n,stderr:r}=await p(i,{cwd:t,maxBuffer:52428800}),c=J.window.createOutputChannel("Ricwiz Import Data");c.appendLine(`Executing: ${i}`),c.appendLine(n),r&&(c.appendLine("--- STDERR ---"),c.appendLine(r)),c.show(),J.window.showInformationMessage("Ricwiz: Successfully ran import data command!")}catch(n){let r=J.window.createOutputChannel("Ricwiz Import Data");r.appendLine(`Error executing: ${i}`),n.stdout&&r.appendLine(n.stdout),n.stderr&&r.appendLine(n.stderr),r.appendLine(n.message),r.show(),J.window.showErrorMessage("Ricwiz: Error running import data command. See output channel for details.")}})}var J,Et=C(()=>{"use strict";J=b(require("vscode"));$()});async function Mt(){let t=y();if(!t){G.window.showErrorMessage("Ricwiz: Open a folder or workspace that is a Git repository.");return}let e="";try{e=await D(t)}catch{}let a=G.workspace.getConfiguration("ricwiz").get("ticketSourceBranch","main"),n=await G.window.showInputBox({prompt:`Enter the branch name to list modified files (compared to ${a})`,value:e,placeHolder:"SFPSCA-1234"});n&&await G.window.withProgress({location:G.ProgressLocation.Notification,title:`Ricwiz: Finding files for ${n}...`,cancellable:!1},async()=>{try{let r=n.replace(/-to-[a-zA-Z0-9]+$/i,""),c=[];try{let f="";try{let{stdout:h}=await p(`git merge-base origin/${a} ${n}`,{cwd:t});f=h.trim()}catch{let{stdout:h}=await p(`git merge-base ${a} ${n}`,{cwd:t});f=h.trim()}if(f){let{stdout:h}=await p(`git diff --name-only ${f} ${n}`,{cwd:t,maxBuffer:10485760});c=h.split(`
`).map(w=>w.trim()).filter(w=>w.length>0)}}catch{}let g=[];try{let{stdout:f}=await p(`git --no-pager log --grep="\\b${r}\\b" -i -E --name-only -m --first-parent --format=""`,{cwd:t,maxBuffer:10485760});g=f.split(`
`).map(h=>h.trim()).filter(h=>h.length>0)}catch{}let m=[...c,...g];if(m.length===0){G.window.showInformationMessage(`Ricwiz: No modified files found for ${n}.`);return}let u=Array.from(new Set(m)).sort(),o={};for(let f of u){let h=f.match(/default\/([^/]+)/),w=h&&h[1]?h[1].toUpperCase():"OUTROS";o[w]||(o[w]=[]),o[w].push(f)}let s=`Files modified in branch ${n}:
`,l=Object.keys(o).sort();for(let f of l)s+=`
=== ${f} ===
`,s+=o[f].join(`
`)+`
`;let d=await G.workspace.openTextDocument({content:s,language:"plaintext"});await G.window.showTextDocument(d)}catch(r){G.window.showErrorMessage(`Ricwiz: Error running git log - ${r.message}`)}})}var G,Dt=C(()=>{"use strict";G=b(require("vscode"));$()});async function Tt(){let t=y();if(!t){X.window.showErrorMessage("Ricwiz: Open a folder or workspace that is a Git repository.");return}let i=X.workspace.getConfiguration("ricwiz").get("resetTrackingCommand","sf org disable tracking && sf project reset tracking --no-prompt");await X.window.withProgress({location:X.ProgressLocation.Notification,title:"Ricwiz: Resetting tracking...",cancellable:!1},async()=>{try{let{stdout:a,stderr:n}=await p(i,{cwd:t,maxBuffer:52428800}),r=X.window.createOutputChannel("Ricwiz Reset Tracking");r.appendLine(`Executing: ${i}`),r.appendLine(a),n&&(r.appendLine("--- STDERR ---"),r.appendLine(n)),r.show(),X.window.showInformationMessage("Ricwiz: Successfully reset tracking!")}catch(a){let n=X.window.createOutputChannel("Ricwiz Reset Tracking");n.appendLine(`Error executing: ${i}`),a.stdout&&n.appendLine(a.stdout),a.stderr&&n.appendLine(a.stderr),n.appendLine(a.message),n.show(),X.window.showErrorMessage("Ricwiz: Error resetting tracking. See output channel for details.")}})}var X,At=C(()=>{"use strict";X=b(require("vscode"));$()});async function Lt(){let t=y();if(!t){_.window.showErrorMessage("Ricwiz: Open a workspace first.");return}let e=["ApexClass","ApexTrigger","CustomObject","CustomField","LightningComponentBundle","AuraDefinitionBundle","Flow","CustomLabel","CustomMetadata","StaticResource","Profile","PermissionSet","PermissionSetGroup","Layout","ValidationRule","RecordType","ListView","Report","EmailTemplate","Other (Type manually)..."],i=await _.window.showQuickPick(e,{placeHolder:"Select Metadata Type to extract (e.g., ApexClass)",ignoreFocusOut:!0});if(!i||i==="Other (Type manually)..."&&(i=await _.window.showInputBox({prompt:"Enter Metadata Type (e.g., CustomApplication, Queue)",ignoreFocusOut:!0}),!i))return;let a={ApexClass:"**/*.cls",ApexTrigger:"**/*.trigger",CustomObject:"**/*.{object,object-meta.xml}",CustomField:"**/*.field-meta.xml",LightningComponentBundle:"**/lwc/*/*.js",AuraDefinitionBundle:"**/aura/*/*.cmp",Flow:"**/*.flow-meta.xml",CustomLabel:"**/*.labels-meta.xml",CustomMetadata:"**/*.md-meta.xml",StaticResource:"**/*.resource-meta.xml",Profile:"**/*.profile-meta.xml",PermissionSet:"**/*.permissionset-meta.xml",PermissionSetGroup:"**/*.permissionsetgroup-meta.xml",Layout:"**/*.layout-meta.xml",ValidationRule:"**/*.validationRule-meta.xml",RecordType:"**/*.recordType-meta.xml",ListView:"**/*.listView-meta.xml"},n=[],r=a[i];if(r)try{n=(await _.workspace.findFiles(r,"**/node_modules/**")).map(m=>{let u=m.fsPath.split(/[\\/]/).pop()||"";if(i==="LightningComponentBundle"||i==="AuraDefinitionBundle"){let o=m.fsPath.split(/[\\/]/);return o[o.length-2]||u.split(".")[0]}return u.split(".")[0]}),n=[...new Set(n)].sort()}catch{}let c=await new Promise(g=>{let m=_.window.createQuickPick();m.title=`Extract ${i}`,m.placeholder="Type name (e.g. MyComponent) or * for all",m.ignoreFocusOut=!0,m.matchOnDescription=!0;let u=()=>{let o=m.value.trim(),s=[];o?s.push({label:`$(cloud-download) Extract "${o}"`,description:"Extract exact name from Salesforce",alwaysShow:!0}):s.push({label:'$(cloud-download) Extract "*" (All)',description:`Extract all ${i}s`,alwaysShow:!0}),n.forEach(l=>{(!o||l.toLowerCase().includes(o.toLowerCase()))&&s.push({label:l,description:"Local workspace component"})}),m.items=s};m.onDidChangeValue(()=>u()),m.onDidAccept(()=>{let o=m.selectedItems[0];if(o){let s=o.label;s.startsWith('$(cloud-download) Extract "')?s=s.replace('$(cloud-download) Extract "',"").replace('" (All)',"").replace('"',""):s==='$(cloud-download) Extract "*" (All)'&&(s="*"),m.hide(),g(s)}}),m.onDidHide(()=>{m.dispose(),g(void 0)}),u(),m.show()});c&&await _.window.withProgress({location:_.ProgressLocation.Notification,title:`Ricwiz: Extracting ${i}:${c} from Salesforce...`,cancellable:!0},async(g,m)=>{try{E.show(!0);let u=`${i}:${c}`,{stdout:o,stderr:s}=await p(`sf project retrieve start -m "${u}"`,{cwd:t});o&&E.appendLine(o),s&&E.appendLine(s),_.window.showInformationMessage(`Ricwiz: Successfully extracted ${u}.`)}catch(u){E.appendLine(`ERROR: ${u.message}`),u.stdout&&E.appendLine(u.stdout),u.stderr&&E.appendLine(u.stderr),_.window.showErrorMessage("Ricwiz: Extraction failed. See Output channel for details.")}})}var _,It=C(()=>{"use strict";_=b(require("vscode"));$()});async function Ot(){let t=O.window.activeTextEditor;if(!t){O.window.showErrorMessage("Ricwiz: Please open the file you want to deploy in the editor first.");return}let e=t.document.uri.fsPath,i=y();if(!i)return;let a="";if(await O.window.withProgress({location:O.ProgressLocation.Notification,title:"Ricwiz: Fetching available Salesforce orgs...",cancellable:!1},async()=>{try{let{stdout:m}=await p("sf org list --json",{cwd:i});a=m}catch(m){a=m.stdout||""}}),!a){O.window.showErrorMessage("Ricwiz: Failed to fetch orgs. Is Salesforce CLI installed?");return}let n=[];try{let m=JSON.parse(a),u=m.result?.nonScratchOrgs||[],o=m.result?.scratchOrgs||[];n=[...u,...o]}catch{O.window.showErrorMessage("Ricwiz: Failed to parse org list.");return}if(n.length===0){O.window.showInformationMessage("Ricwiz: No authenticated orgs found.");return}let r=n.map(m=>({label:m.alias||m.username,description:m.alias?m.username:"",picked:m.isDefaultUsername})),c=await O.window.showQuickPick(r,{placeHolder:"Select the org(s) to deploy this file to",canPickMany:!0,ignoreFocusOut:!0});if(!c||c.length===0)return;let g=Ft.basename(e);await O.window.withProgress({location:O.ProgressLocation.Notification,title:`Ricwiz: Deploying ${g} to ${c.length} org(s)...`,cancellable:!1},async()=>{E.show(!0),E.appendLine(`--- Starting Parallel Deploy of ${g} ---`);let m=c.map(async l=>{let d=l.label;E.appendLine(`[${d}] Deploying...`);try{let{stdout:f,stderr:h}=await p(`sf project deploy start -d "${e}" -o "${d}"`,{cwd:i});return E.appendLine(`[${d}] \u2705 Success`),f&&E.appendLine(f),{org:d,success:!0}}catch(f){return E.appendLine(`[${d}] \u274C Failed`),f.stdout&&E.appendLine(f.stdout),f.stderr&&E.appendLine(f.stderr),{org:d,success:!1}}}),u=await Promise.all(m),o=u.filter(l=>l.success).length,s=u.filter(l=>!l.success).length;s===0?O.window.showInformationMessage(`Ricwiz: Successfully deployed to all ${o} orgs!`):O.window.showErrorMessage(`Ricwiz: Deploy finished with errors (${o} success, ${s} failed). Check Output channel.`)})}var O,Ft,jt=C(()=>{"use strict";O=b(require("vscode")),Ft=b(require("path"));$()});async function Nt(){let t=y();if(!t){P.window.showErrorMessage("Ricwiz: Open a folder or workspace that is a Git repository.");return}let e=P.workspace.getConfiguration("ricwiz"),i=e.get("auditUsername",""),a=e.get("auditHours",8),n=await P.window.showInputBox({prompt:"Enter your Salesforce Username to query in SetupAuditTrail",value:i,placeHolder:"admin@tuaorg.com"});if(!n)return;let r=await P.window.showInputBox({prompt:"How many hours back do you want to search?",value:a.toString(),placeHolder:"8"});if(!r)return;let c=parseFloat(r);if(isNaN(c)||c<=0){P.window.showErrorMessage("Ricwiz: Invalid hours specified.");return}let g=new Date(Date.now()-c*60*60*1e3).toISOString(),u=`sf data query -q "${`SELECT Action, Display, Section FROM SetupAuditTrail WHERE CreatedBy.Username = '${n}' AND CreatedDate >= ${g}`}" --json`;await P.window.withProgress({location:P.ProgressLocation.Notification,title:"Ricwiz: Interrogating Setup Audit Trail...",cancellable:!1},async()=>{try{let{stdout:o}=await p(u,{cwd:t,maxBuffer:52428800}),s=JSON.parse(o);if(!s.result||s.result.records.length===0){P.window.showInformationMessage(`Ricwiz: No changes found for ${n} in the last ${c} hours.`);return}let l=s.result.records,d=[],f=new Set;for(let S of l){let q=po(S.Action,S.Display,S.Section);if(q){let ce=`${q.isDelete?"DEL":"ADD"}-${q.metadataFormat}`;if(!f.has(ce)){f.add(ce);let de=q.isDelete?"$(trash)":"$(plus)";d.push({label:`${de} ${q.metadataFormat}`,description:`${S.Action} -> ${S.Display}`,metadataFormat:q.metadataFormat,isDelete:q.isDelete})}}}if(d.length===0){P.window.showInformationMessage(`Ricwiz: No extractable metadata changes found for ${n} in the last ${c} hours (ignored passwords/logins).`);return}let h=await P.window.showQuickPick(d,{canPickMany:!0,placeHolder:"Select the changes you want to extract to GitLab",ignoreFocusOut:!0});if(!h||h.length===0){P.window.showInformationMessage("Ricwiz: No changes selected.");return}let w=h.filter(S=>S.isDelete),R=h.filter(S=>!S.isDelete),k=P.window.createOutputChannel("Ricwiz Admin Bridge");if(k.show(),w.length>0){let{stdout:S}=await p("git ls-files",{cwd:t}),q=S.split(`
`).map(de=>de.trim()),ce=0;for(let de of w){let M=de.metadataFormat.split(":"),he=M[0],we=M[1],ve=we;he==="CustomField"&&(ve=we.split(".")[1]);let so=q.filter(Ce=>{let ye=Te.basename(Ce);return ye.startsWith(ve+".")&&ye.includes(he==="CustomField"?".field":"")});for(let Ce of so){let ye=Te.join(t,Ce);De.existsSync(ye)&&(De.unlinkSync(ye),k.appendLine(`Deleted local file: ${Ce}`),ce++)}}P.window.showInformationMessage(`Ricwiz: Deleted ${ce} local files from Git workspace.`)}if(R.length===0)return;let j=R.map(S=>S.metadataFormat).filter(S=>S!=="").join(", "),N=await P.window.showInputBox({prompt:"Review and adjust the metadata components to retrieve",value:j,ignoreFocusOut:!0});if(!N)return;let I=`sf project retrieve start -m "${N}"`;k.appendLine(`Executing: ${I}`),P.window.showInformationMessage(`Ricwiz: Extracting ${R.length} components...`);let ae=await p(I,{cwd:t});k.appendLine(ae.stdout),ae.stderr&&(k.appendLine("--- STDERR ---"),k.appendLine(ae.stderr)),P.window.showInformationMessage("Ricwiz: Changes extracted successfully! Ready for Git Commit.")}catch(o){P.window.showErrorMessage(`Ricwiz: Error capturing changes - ${o.message}`)}})}function po(t,e,i){if(!t||!e||!i)return null;let a=t.toLowerCase(),n=i.toLowerCase();if(["security controls","network access","session settings","data export","login history","password policies","identity verification","delegated administration"].includes(n)||a.includes("login")||a.includes("password")||a.includes("oauth")||a.includes("session"))return null;let c=a.includes("delete"),g=null;if(a==="permissionsetgroupcomponentadd"||a==="permissionsetgroupcomponentdelete")return null;let m=(u,o=!1)=>{let s=u.replace(/\(.*\)/g,"").trim();s.includes(":")&&!a.includes("calculation")&&(s=s.split(":")[0]);let l=["disabled","deleted","removed","created","changed","updated","from","to","on","assigned","assign","assignment","permission","set","group","apex","class","trigger","custom","field","object","layout","validation","rule","flow","profile"],d=s.split(/\s+/);if(o){for(;d.length>0&&l.includes(d[d.length-1].toLowerCase());)d.pop();for(;d.length>0&&l.includes(d[0].toLowerCase());)d.shift();return d.join(" ").trim().replace(/[^a-zA-Z0-9_ ]/g,"")}else return d.filter(w=>!l.includes(w.toLowerCase())).join("_").replace(/[^a-zA-Z0-9_]/g,"")||s.replace(/\s+/g,"")};if(a.includes("profile"))g=`Profile:${m(e,!0)}`;else if(a.includes("permissionsetgroupcalculation")){let u=e.split(":");g=`PermissionSetGroup:${u.length>1?u[u.length-1].trim():m(e,!1)}`}else if(a.includes("permission set group")||a.includes("permissionsetgroup"))g=`PermissionSetGroup:${m(e,!1)}`;else if(a.includes("permission set")||a.includes("permissionset"))g=`PermissionSet:${m(e,!1)}`;else if(a.includes("apexclass"))g=`ApexClass:${m(e,!1)}`;else if(a.includes("apextrigger")||a.includes("apex trigger"))g=`ApexTrigger:${m(e,!1)}`;else if(a.includes("customfield")){let u=e.match(/([A-Za-z0-9_]+__c)/),o=e.match(/(?:on|na|for)\s+([A-Za-z0-9_]+)/i);u&&o?g=`CustomField:${o[1]}.${u[1]}`:g=`CustomField:${m(e,!1)}`}else if(a.includes("layout"))g=`Layout:${m(e,!0)}`;else if(a.includes("validation"))g=`ValidationRule:${m(e,!1)}`;else if(a.includes("flow"))g=`Flow:${m(e,!1)}`;else if(a.includes("customobject")){let u=e.match(/([A-Za-z0-9_]+__c)/);g=u?`CustomObject:${u[1]}`:`CustomObject:${m(e,!1)}`}else if(!a.includes("created")&&!a.includes("changed")&&!a.includes("deleted"))return null;return g?{metadataFormat:g,isDelete:c}:null}var P,De,Te,Ut=C(()=>{"use strict";P=b(require("vscode")),De=b(require("fs")),Te=b(require("path"));$()});async function Wt(){let t=y();if(t)try{let{stdout:e}=await p('git for-each-ref --sort=-committerdate --format="%(refname:short)|||%(committerdate:relative)|||%(subject)" refs/heads/',{cwd:t}),i=e.split(`
`).filter(n=>n.trim()).map(n=>{let r=n.split("|||");return{label:`$(git-branch) ${r[0]}`,description:r[1],detail:r[2],branchName:r[0]}}),a=await Ie.window.showQuickPick(i,{placeHolder:"Select a branch from history to checkout",matchOnDescription:!0,matchOnDetail:!0});a&&await fe(a.branchName)}catch{Ie.window.showErrorMessage("Ricwiz: Failed to get branch history")}}var Ie,qt=C(()=>{"use strict";Ie=b(require("vscode"));$();Ee()});async function Ht(){let t=y();if(!t)return;let e=await ke.window.showInputBox({prompt:"Enter ticket number or name (e.g., 48934)",placeHolder:"48934"});if(e)try{let{stdout:i}=await p(`git branch --list "*${e}*"`,{cwd:t}),a=i.split(`
`).map(c=>c.replace("*","").trim()).filter(c=>c);if(a.length===0){ke.window.showInformationMessage(`Ricwiz: No branches found matching "${e}"`);return}let n=a.map(c=>({label:`$(git-branch) ${c}`,branchName:c})),r=await ke.window.showQuickPick(n,{placeHolder:`Select a branch for ${e}`});r&&await fe(r.branchName)}catch{ke.window.showErrorMessage("Ricwiz: Failed to search branches")}}var ke,Vt=C(()=>{"use strict";ke=b(require("vscode"));$();Ee()});async function Gt(){let t=me.window.activeTextEditor;if(!t)return me.window.showErrorMessage("Ricwiz: Please open a file in the editor to check blame."),null;let e=t.document.fileName,i=Jt.basename(e),a=y();if(!a)return me.window.showErrorMessage("Ricwiz: Workspace is not a git repository."),null;let n=[];try{let{stdout:o}=await p(`git log -5 --pretty=format:"%an|%ar|%s|%h" -- "${e}"`,{cwd:a}),s=o.trim().split(`
`);for(let l of s){let d=l.split("|");d.length>=4&&n.push({author:d[0],time:d[1],message:d.slice(2,-1).join("|"),hash:d[d.length-1]})}}catch(o){console.error("Git blame error:",o)}let r="Unknown",c="Unknown",g="Unknown",m=[],u=go(e);if(u)try{await me.window.withProgress({location:me.ProgressLocation.Notification,title:`Ricwiz: Analyzing ${u.name} in Salesforce...`,cancellable:!1},async()=>{let o="";if(u.type==="CustomField"){let s=u.name.split(".");s.length===2&&(o=`SELECT LastModifiedBy.Name, LastModifiedDate, CreatedBy.Name FROM CustomField WHERE DeveloperName = '${s[1].replace("__c","")}' AND TableEnumOrId = '${s[0]}'`)}else u.type==="LightningComponentBundle"?o=`SELECT LastModifiedBy.Name, LastModifiedDate, CreatedBy.Name FROM LightningComponentBundle WHERE DeveloperName = '${u.name}'`:o=`SELECT LastModifiedBy.Name, LastModifiedDate, CreatedBy.Name FROM ${u.type} WHERE Name = '${u.name}'`;if(o)try{let{stdout:s}=await p(`sf data query -t -q "${o}" --json`,{cwd:a,maxBuffer:52428800}),l=JSON.parse(s);if(l&&l.result&&l.result.records&&l.result.records.length>0){let d=l.result.records[0];r=d.LastModifiedBy?d.LastModifiedBy.Name:"Unknown",g=d.CreatedBy?d.CreatedBy.Name:"Unknown",c=new Date(d.LastModifiedDate).toLocaleString()}else r="Not found in Org",c="N/A",g="N/A"}catch{r="Query Error",c="N/A",g="N/A"}try{let s="SELECT Action, Display, CreatedBy.Name, CreatedDate FROM SetupAuditTrail ORDER BY CreatedDate DESC LIMIT 1500",{stdout:l}=await p(`sf data query -q "${s}" --json`,{cwd:a,maxBuffer:52428800}),d=JSON.parse(l);if(d&&d.result&&d.result.records){let f=u.name.replace("__c","");m=d.result.records.filter(w=>w.Display&&w.Display.includes(f)).map(w=>({action:w.Action,display:w.Display,author:w.CreatedBy?w.CreatedBy.Name:"Unknown",time:new Date(w.CreatedDate).toLocaleString()})).slice(0,10)}}catch(s){console.error("Audit trail query error:",s)}})}catch(o){console.error("Salesforce query error:",o)}else r="Unsupported Metadata Type",c="N/A";return{fileName:i,gitHistory:n,sfAuthor:r,sfTime:c,sfCreatedBy:g,auditHistory:m}}function go(t){let e=t.replace(/\\/g,"/");if(e.includes("/classes/")){let i=e.match(/\/classes\/([^/.]+)\.cls/);if(i)return{type:"ApexClass",name:i[1]}}if(e.includes("/triggers/")){let i=e.match(/\/triggers\/([^/.]+)\.trigger/);if(i)return{type:"ApexTrigger",name:i[1]}}if(e.includes("/lwc/")){let i=e.match(/\/lwc\/([^/]+)\//);if(i)return{type:"LightningComponentBundle",name:i[1]}}if(e.includes("/aura/")){let i=e.match(/\/aura\/([^/]+)\//);if(i)return{type:"AuraDefinitionBundle",name:i[1]}}if(e.includes("/objects/")&&e.includes("/fields/")){let i=e.match(/\/objects\/([^/]+)\//),a=e.match(/\/fields\/([^/.]+)\.field/);if(i&&a)return{type:"CustomField",name:`${i[1]}.${a[1]}`}}return null}var me,Jt,_t=C(()=>{"use strict";me=b(require("vscode")),Jt=b(require("path"));$()});async function Yt(){let t=y();if(!t){W.window.showErrorMessage("Ricwiz: Open a workspace that is a Git repository.");return}let i=W.workspace.getConfiguration("ricwiz").get("ticketSourceBranch","main");await W.window.withProgress({location:W.ProgressLocation.Notification,title:`Ricwiz: Finding deleted files compared to origin/${i}...`,cancellable:!1},async()=>{try{let{stdout:a}=await p(`git diff --name-only --diff-filter=D origin/${i}...HEAD`,{cwd:t}),n=a.split(`
`).map(l=>l.trim()).filter(l=>l.length>0);if(n.length===0){W.window.showInformationMessage(`Ricwiz: No deleted files found compared to origin/${i}.`);return}let r={},c=(l,d)=>{r[l]||(r[l]=[]),r[l].includes(d)||r[l].push(d)};for(let l of n){let d=l.replace(/\\/g,"/");if(d.includes("/classes/")){let f=d.match(/\/classes\/([^/.]+)\.cls/);f&&c("ApexClass",f[1])}else if(d.includes("/triggers/")){let f=d.match(/\/triggers\/([^/.]+)\.trigger/);f&&c("ApexTrigger",f[1])}else if(d.includes("/lwc/")){let f=d.match(/\/lwc\/([^/]+)\//);f&&c("LightningComponentBundle",f[1])}else if(d.includes("/aura/")){let f=d.match(/\/aura\/([^/]+)\//);f&&c("AuraDefinitionBundle",f[1])}else if(d.includes("/objects/")&&d.includes("/fields/")){let f=d.match(/\/objects\/([^/]+)\//),h=d.match(/\/fields\/([^/.]+)\.field/);f&&h&&c("CustomField",`${f[1]}.${h[1]}`)}else if(d.includes("/objects/")){let f=d.match(/\/objects\/([^/.]+)\.object/);f&&c("CustomObject",f[1])}else if(d.includes("/layouts/")){let f=d.match(/\/layouts\/([^/.]+)\.layout/);f&&c("Layout",f[1])}else if(d.includes("/flows/")){let f=d.match(/\/flows\/([^/.]+)\.flow/);f&&c("Flow",f[1])}else if(d.includes("/permissionsets/")){let f=d.match(/\/permissionsets\/([^/.]+)\.permissionset/);f&&c("PermissionSet",f[1])}else if(d.includes("/profiles/")){let f=d.match(/\/profiles\/([^/.]+)\.profile/);f&&c("Profile",f[1])}else if(d.includes("/customMetadata/")){let f=d.match(/\/customMetadata\/([^/.]+)\.md/);f&&c("CustomMetadata",f[1])}else if(d.includes("/flexipages/")){let f=d.match(/\/flexipages\/([^/.]+)\.flexipage/);f&&c("FlexiPage",f[1])}}if(Object.keys(r).length===0){W.window.showInformationMessage("Ricwiz: Found deleted files in Git, but none mapped to recognizable Salesforce metadata.");return}let g=`<?xml version="1.0" encoding="UTF-8"?>
<Package xmlns="http://soap.sforce.com/2006/04/metadata">
`;for(let l of Object.keys(r).sort()){g+=`    <types>
`;for(let d of r[l].sort())g+=`        <members>${d}</members>
`;g+=`        <name>${l}</name>
    </types>
`}g+=`    <version>58.0</version>
</Package>`;let m=Ae.join(t,"destructiveChanges");re.existsSync(m)||re.mkdirSync(m);let u=Ae.join(m,"destructiveChanges.xml"),o=Ae.join(m,"package.xml");re.writeFileSync(u,g,"utf8"),re.existsSync(o)||re.writeFileSync(o,`<?xml version="1.0" encoding="UTF-8"?>
<Package xmlns="http://soap.sforce.com/2006/04/metadata">
    <version>58.0</version>
</Package>`,"utf8");let s=await W.workspace.openTextDocument(u);await W.window.showTextDocument(s),W.window.showInformationMessage("Ricwiz: destructiveChanges.xml generated successfully!")}catch(a){W.window.showErrorMessage(`Ricwiz: Error generating destructive changes: ${a.message}`)}})}var W,Ae,re,Qt=C(()=>{"use strict";W=b(require("vscode")),Ae=b(require("path")),re=b(require("fs"));$()});async function Zt(){let t=y();if(!t)return;let i=ee.workspace.getConfiguration("ricwiz").get("ticketSourceBranch","main");await ee.window.withProgress({location:ee.ProgressLocation.Notification,title:"Ricwiz: Finding Apex Tests to run...",cancellable:!1},async()=>{try{let{stdout:a}=await p(`git diff --name-status origin/${i}...HEAD`,{cwd:t}),n=a.split(`
`).map(l=>l.trim()).filter(l=>l.length>0),r=new Set,c=new Set;for(let l of n){let d=l.split(/\s+/);if(d[0].startsWith("D"))continue;let f=d[1];if(f&&f.endsWith(".cls")){let h=f.match(/\/classes\/([^/.]+)\.cls/);if(h){let w=h[1];w.toLowerCase().endsWith("test")?r.add(w):c.add(w)}}}for(let l of c)r.add(`${l}Test`);if(r.size===0){ee.window.showInformationMessage("Ricwiz: No Apex Classes were modified in this branch.");return}let g=Array.from(r).map(l=>({label:`$(beaker) ${l}`,description:"Apex Test Class"})),m=await ee.window.showQuickPick(g,{canPickMany:!0,title:"Select Test Classes to Run",placeHolder:"Select tests..."});if(!m||m.length===0)return;let o=`sf apex run test -n ${m.map(l=>l.label.replace("$(beaker) ","").trim()).join(",")} -r human -w 30`,s=ee.window.createTerminal("Ricwiz: Smart Tests");s.show(),s.sendText(o)}catch(a){ee.window.showErrorMessage(`Ricwiz: Error finding tests: ${a.message}`)}})}var ee,Xt=C(()=>{"use strict";ee=b(require("vscode"));$()});async function to(t){let e=eo.workspace.getConfiguration("ricwiz"),i=e.get("jiraUrl",""),a=e.get("jiraEmail","")?.trim(),n=e.get("jiraApiToken","")?.trim();if(!i||!n)throw new Error("Jira API Token is not configured in Ricwiz Settings.");let r=i;r.includes("/browse")&&(r=r.split("/browse")[0]),r.endsWith("/")&&(r=r.slice(0,-1));let c=a?`Basic ${Buffer.from(`${a}:${n}`).toString("base64")}`:`Bearer ${n}`,g=new URL(`${r}/rest/api/2/issue/${t}`);return new Promise((m,u)=>{let o=Kt.request(g,{method:"GET",headers:{Authorization:c,Accept:"application/json"}},s=>{if(s.statusCode===401||s.statusCode===403)return u(new Error(`Authentication failed (HTTP ${s.statusCode}). Please check your Jira Email and API Token in settings.`));if(s.statusCode===404)return u(new Error(`Ticket ${t} not found in Jira.`));if(s.statusCode&&s.statusCode>=400)return u(new Error(`Jira API returned HTTP status ${s.statusCode}`));let l="";s.on("data",d=>l+=d),s.on("end",()=>{try{let d=JSON.parse(l);d&&d.fields?m({summary:d.fields.summary||"",description:d.fields.description||"No description provided."}):m(null)}catch{u(new Error("Failed to parse Jira response."))}})});o.on("error",s=>u(new Error(`Network error connecting to Jira: ${s.message}`))),o.end()})}var Kt,eo,oo=C(()=>{"use strict";Kt=b(require("https")),eo=b(require("vscode"))});async function io(t){let e=y();if(e)try{if(!await T.initialize(e))return;let n=(await D(e)).split("-to-")[0];if(!n){ue.window.showErrorMessage("Ricwiz: You are not currently on a valid ticket branch.");return}await ue.window.withProgress({location:ue.ProgressLocation.Notification,title:`Fetching details for ${n}...`,cancellable:!1},async r=>{let c=await to(n);c?(t.setJiraData({ticketId:n,...c}),t.setPage("jira")):ue.window.showErrorMessage("Ricwiz: No data found for this ticket.")})}catch(i){ue.window.showErrorMessage(`Ricwiz Jira Error: ${i.message}`)}}var ue,no=C(()=>{"use strict";ue=b(require("vscode"));$();ne();oo()});var Be={};Fe(Be,{activate:()=>fo,deactivate:()=>ho,webviewProvider:()=>L});module.exports=pe(Be);function fo(t){L=new Re(t.extensionUri),t.subscriptions.push(v.window.registerWebviewViewProvider("ricwiz-webview",L));let e=v.window.createStatusBarItem(v.StatusBarAlignment.Left,100);e.command="ricwiz.openJiraTicket",t.subscriptions.push(e);let i,a=v.workspace.getConfiguration("ricwiz").get("autoRefresh",!0);L.setAutoRefresh(a),t.subscriptions.push(v.workspace.onDidChangeConfiguration(r=>{if(r.affectsConfiguration("ricwiz.autoRefresh")){let c=v.workspace.getConfiguration("ricwiz").get("autoRefresh",!0);L?.setAutoRefresh(c)}}));async function n(){let r=v.extensions.getExtension("vscode.git");if(r){let m=function(u){let o="",s;async function l(){let f=v.workspace.workspaceFolders;if(!f)return;let h=f[0].uri.fsPath,w=await D(h);if(w&&w!==o){o=w;let R=v.workspace.getConfiguration("ricwiz"),k=R.get("ticketPrefix","SFPSCA-");if(!w.includes(k)){let M=w.match(/([A-Z]+-)\d+/i);M&&(k=M[1].toUpperCase())}let j=[],N=[],I=[],ae=[],S=R.get("environments",[{name:"Qual",sourceBranch:"quality"},{name:"Val",sourceBranch:"validation"},{name:"Prod",sourceBranch:"main"}]);try{let M=R.get("workspaceCheckoutButtons",["main","quality","validation"]);I=Array.from(new Set(M))}catch{}let q=w.match(new RegExp(`(${k}\\d+(?:-\\d+)?)`,"i"));if(q){let M=q[1].toUpperCase(),he=R.get("commitMessageSuffix","- "),we=/^[A-Z]+-\d+(?:-\d+)?\s*(?:-\s*|:\s*|\s+)?/i;we.test(u.inputBox.value)?u.inputBox.value.toUpperCase().startsWith(M)||(u.inputBox.value=u.inputBox.value.replace(we,`${M}${he}`)):u.inputBox.value=`${M}${he}`+u.inputBox.value,e.text=`$(bookmark) ${M}`,e.tooltip=`Branch: ${w}
Click to open Jira ticket`,e.show();try{let ve=await Ze(h,M,w);j=await Ge(h,ve,M,S)}catch{}}else{e.hide();try{ae=await Qe(h)}catch{}}let[ce,de]=await Promise.all([Ye(h,10),_e(h,w,S)]);N=ce,L?.updateBranch(w,de,j,N,I,ae)}}function d(){L?.isAutoRefreshEnabled()&&(s&&clearTimeout(s),s=setTimeout(()=>{o="",l()},300))}i=()=>{o="",l()},l(),u.state.onDidChange(()=>d()),v.window.onDidChangeWindowState(f=>{f.focused&&d()})};var c=m;r.isActive||await r.activate();let g=r.exports.getAPI(1);g.repositories.length>0&&g.repositories.forEach(u=>m(u)),g.onDidOpenRepository(u=>m(u))}}n(),t.subscriptions.push(v.commands.registerCommand("ricwiz.generateDestructiveChanges",Yt),v.commands.registerCommand("ricwiz.runSmartTests",Zt),v.commands.registerCommand("ricwiz.refreshWebview",()=>{L&&v.commands.executeCommand("workbench.action.webview.reloadWebviewAction")}),v.commands.registerCommand("ricwiz.createBranches",ot),v.commands.registerCommand("ricwiz.prepareDeploy",rt),v.commands.registerCommand("ricwiz.createMergeRequests",dt),v.commands.registerCommand("ricwiz.createMergeRequestsVSCode",lt),v.commands.registerCommand("ricwiz.openJiraTicket",pt),v.commands.registerCommand("ricwiz.openJiraTicketVSCode",gt),v.commands.registerCommand("ricwiz.showJiraDetails",()=>{L&&io(L)}),v.commands.registerCommand("ricwiz.syncAll",ht),v.commands.registerCommand("ricwiz.updateBases",vt),v.commands.registerCommand("ricwiz.deleteUnusedBranches",bt),v.commands.registerCommand("ricwiz.checkoutBranch",fe),v.commands.registerCommand("ricwiz.copyBranchName",kt),v.commands.registerCommand("ricwiz.generatePackageXml",Rt),v.commands.registerCommand("ricwiz.deployPackage",Bt),v.commands.registerCommand("ricwiz.importData",St),v.commands.registerCommand("ricwiz.listTicketFiles",Mt),v.commands.registerCommand("ricwiz.resetTracking",Tt),v.commands.registerCommand("ricwiz.extractComponent",Lt),v.commands.registerCommand("ricwiz.deployMultiOrg",Ot),v.commands.registerCommand("ricwiz.captureAdminChanges",Nt),v.commands.registerCommand("ricwiz.openHistory",Wt),v.commands.registerCommand("ricwiz.searchTicket",Ht),v.commands.registerCommand("ricwiz.whoToBlame",async()=>{let r=await Gt();r&&L&&(L.setBlameData(r),L.setPage("blame"))}),v.commands.registerCommand("ricwiz.manualRefresh",()=>{i&&i()}),v.commands.registerCommand("ricwiz.toggleAutoRefresh",()=>{if(L){let r=!L.isAutoRefreshEnabled();L.setAutoRefresh(r),v.workspace.getConfiguration("ricwiz").update("autoRefresh",r,v.ConfigurationTarget.Global)}}),v.commands.registerCommand("ricwiz.openSettings",()=>{v.commands.executeCommand("workbench.action.openSettings","ricwiz")}))}function ho(){}var v,L,Pe=C(()=>{v=b(require("vscode"));$();Xe();Ke();it();at();mt();ft();wt();yt();xt();Ee();Ct();zt();Pt();Et();Dt();At();It();jt();Ut();qt();Vt();_t();Qt();Xt();no()});Pe();0&&(module.exports={activate,deactivate,webviewProvider});
