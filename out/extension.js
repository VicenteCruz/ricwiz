"use strict";var ro=Object.create;var $e=Object.defineProperty;var ao=Object.getOwnPropertyDescriptor;var co=Object.getOwnPropertyNames;var lo=Object.getPrototypeOf,mo=Object.prototype.hasOwnProperty;var C=(e,t,s)=>()=>{if(s)throw s[0];try{return e&&(t=e(e=0)),t}catch(a){throw s=[a],a}};var Fe=(e,t)=>{for(var s in t)$e(e,s,{get:t[s],enumerable:!0})},Oe=(e,t,s,a)=>{if(t&&typeof t=="object"||typeof t=="function")for(let i of co(t))!mo.call(e,i)&&i!==s&&$e(e,i,{get:()=>t[i],enumerable:!(a=ao(t,i))||a.enumerable});return e};var b=(e,t,s)=>(s=e!=null?ro(lo(e)):{},Oe(t||!e||!e.__esModule?$e(s,"default",{value:e,enumerable:!0}):s,e)),pe=e=>Oe($e({},"__esModule",{value:!0}),e);var Le={};Fe(Le,{checkBranchExists:()=>ne,exec:()=>u,extractTicketSuggestion:()=>We,getCurrentBranch:()=>T,getWorkspaceCwd:()=>y,normalizeTicketId:()=>qe,promptForTicketId:()=>W,resolvePrefix:()=>Ue,ricwizLogger:()=>M});function y(){let e=ge.workspace.workspaceFolders;if(e)return e[0].uri.fsPath}async function T(e){try{let{stdout:t}=await u("git branch --show-current",{cwd:e});return t.trim()}catch{return""}}function Ue(e,t){if(!e.includes(t)){let s=e.match(/([A-Z]+-)\d+/i);if(s)return s[1].toUpperCase()}return t}function We(e,t,s=!1){let a=e.match(new RegExp(`(${t}\\d+)`,"i"));return a?a[1].toUpperCase():e.includes(t)&&!e.includes("-to-")?e.substring(e.indexOf(t)):s&&e.includes("-to-")?e.substring(e.indexOf(t)).split("-to-")[0]:""}function qe(e,t){let s=e.trim();return/^\d/.test(s)?`${t}${s}`.toUpperCase():s.toUpperCase()}async function W(e,t){let s=ge.workspace.getConfiguration("ricwiz"),a=t?.prefix??s.get("ticketPrefix","SFPSCA-"),i=await T(e),r=Ue(i,a),c=We(i,r,t?.handleToSuffix),g=await ge.window.showInputBox({prompt:t?.prompt||"Enter the full ticket ID (e.g., SCPSCA-1234) or just the number",placeHolder:t?.placeHolder||"Ticket ID or number",value:c});return g?{ticketId:qe(g,r),currentBranch:i,prefix:r}:void 0}async function ne(e,t){try{return await u(`git show-ref --verify --quiet refs/heads/${t}`,{cwd:e}),!0}catch{}try{return await u(`git show-ref --verify --quiet refs/remotes/origin/${t}`,{cwd:e}),!0}catch{}return!1}var ge,je,Ne,uo,M,u,$=C(()=>{"use strict";ge=b(require("vscode")),je=b(require("child_process")),Ne=b(require("util")),uo=Ne.promisify(je.exec),M=ge.window.createOutputChannel("Ricwiz"),u=async(e,t)=>{M.appendLine(`[EXEC] ${e}`);let s=await uo(e,{maxBuffer:50*1024*1024,...t});return{stdout:s.stdout.toString(),stderr:s.stderr.toString()}}});function He(){let e=new Map;function t(a,i){let r=i,c=e.get(r);if(c)return c;let g=(async()=>{try{let{stdout:m}=await u(`git rev-parse origin/${i}`,{cwd:a});return m.trim()}catch{let{stdout:m}=await u(`git rev-parse ${i}`,{cwd:a});return m.trim()}})();return e.set(r,g),g}function s(a,i){let r=`branch:${i}`,c=e.get(r);if(c)return c;let g=(async()=>{let{stdout:m}=await u(`git rev-parse ${i}`,{cwd:a});return m.trim()})();return e.set(r,g),g}return{resolveEnvRef:t,resolveBranchRef:s}}async function Ve(e,t,s,a,i){try{if(!(await u(`git --no-pager log ${t} --grep="\\\\b${s}\\\\b" -i -E -1 --format="%h"`,{cwd:e}).catch(()=>({stdout:"",stderr:""}))).stdout.trim())return!1;let[c,g]=await Promise.all([i.resolveBranchRef(e,t),i.resolveEnvRef(e,a.sourceBranch)]);if(c===g)return!1;try{return await u(`git merge-base --is-ancestor ${t} origin/${a.sourceBranch}`,{cwd:e}),!0}catch{try{return await u(`git merge-base --is-ancestor ${t} ${a.sourceBranch}`,{cwd:e}),!0}catch{return!1}}}catch{return!1}}function Je(e,t){return t.find(s=>e.endsWith(`-to-${s.name}`))}async function Ge(e,t,s,a){let i=He();return await Promise.all(t.map(async c=>{let g=Je(c,a);if(!g)return{name:c,isMerged:!1};let m=await Ve(e,c,s,g,i);return{name:c,isMerged:m}}))}async function _e(e,t,s){let a=Je(t,s);if(!a)return!1;let i=t.replace(new RegExp(`-to-${a.name}$`,"i"),""),r=He();return Ve(e,t,i,a,r)}async function Ye(e,t=10){try{let{stdout:s}=await u(`git log --oneline -${t} --format="%h|||%s|||%ar"`,{cwd:e});return s.split(`
`).filter(a=>a.trim()).map(a=>{let i=a.split("|||");return{hash:i[0]||"",message:i.length>=3?i.slice(1,-1).join("|||"):i[1]||"",timeAgo:i.length>=3?i[i.length-1]:""}})}catch{return[]}}async function Qe(e,t=3){try{let{stdout:s}=await u('git for-each-ref --sort=-committerdate --format="%(refname:short)" refs/heads/',{cwd:e}),a=s.split(`
`).map(r=>r.trim()).filter(r=>r),i=/^[A-Z]+-\d+$/i;return a.filter(r=>i.test(r)).slice(0,t)}catch{return[]}}async function Ze(e,t,s){let{stdout:a}=await u(`git branch --list "*${t}*"`,{cwd:e});return a.split(`
`).map(i=>i.replace("*","").trim()).filter(i=>i&&i!==s)}var Xe=C(()=>{"use strict";$()});function B(e){return e.replace(/&/g,"&amp;").replace(/</g,"&lt;").replace(/>/g,"&gt;").replace(/"/g,"&quot;").replace(/'/g,"&#39;")}var x,Re,Ke=C(()=>{"use strict";x=b(require("vscode"));Re=class{constructor(t){this._extensionUri=t}_extensionUri;webviewView;resolveWebviewView(t,s,a){this.webviewView=t,t.webview.options={enableScripts:!0,localResourceRoots:[this._extensionUri]},this.updateBranch("",!1),t.webview.onDidReceiveMessage(i=>{switch(i.command){case"createBranches":x.commands.executeCommand("ricwiz.createBranches");break;case"prepareDeploy":x.commands.executeCommand("ricwiz.prepareDeploy");break;case"openMRs":x.commands.executeCommand("ricwiz.createMergeRequests");break;case"openMRsVSCode":x.commands.executeCommand("ricwiz.createMergeRequestsVSCode");break;case"openJira":x.commands.executeCommand("ricwiz.openJiraTicket");break;case"showJiraDetails":x.commands.executeCommand("ricwiz.showJiraDetails");break;case"openJiraVSCode":x.commands.executeCommand("ricwiz.openJiraTicketVSCode");break;case"openSettings":x.commands.executeCommand("ricwiz.openSettings");break;case"checkout":i.branch&&x.commands.executeCommand("ricwiz.checkoutBranch",i.branch);break;case"copyBranch":x.commands.executeCommand("ricwiz.copyBranchName");break;case"generatePackageXml":x.commands.executeCommand("ricwiz.generatePackageXml");break;case"openDevTools":this.setPage("devtools");break;case"openMain":this.setPage("main");break;case"generateDestructiveChanges":x.commands.executeCommand("ricwiz.generateDestructiveChanges");break;case"deployPackage":x.commands.executeCommand("ricwiz.deployPackage");break;case"runSmartTests":x.commands.executeCommand("ricwiz.runSmartTests");break;case"importData":x.commands.executeCommand("ricwiz.importData");break;case"listTicketFiles":x.commands.executeCommand("ricwiz.listTicketFiles");break;case"resetTracking":x.commands.executeCommand("ricwiz.resetTracking");break;case"extractComponent":x.commands.executeCommand("ricwiz.extractComponent");break;case"deployMultiOrg":x.commands.executeCommand("ricwiz.deployMultiOrg");break;case"captureAdminChanges":x.commands.executeCommand("ricwiz.captureAdminChanges");break;case"whoToBlame":x.commands.executeCommand("ricwiz.whoToBlame");break;case"syncAll":x.commands.executeCommand("ricwiz.syncAll");break;case"updateBases":x.commands.executeCommand("ricwiz.updateBases");break;case"deleteUnused":x.commands.executeCommand("ricwiz.deleteUnusedBranches");break;case"conflict_commitAndContinue":x.commands.executeCommand("ricwiz.conflictAction","commitAndContinue");break;case"conflict_resolveDeletions":x.commands.executeCommand("ricwiz.conflictAction","resolveDeletions");break;case"conflict_abortDeploy":x.commands.executeCommand("ricwiz.conflictAction","abortDeploy");break;case"openFile":if(i.file){let r=x.workspace.workspaceFolders;if(r){let c=x.Uri.joinPath(r[0].uri,i.file);x.commands.executeCommand("vscode.open",c)}}break;case"searchTicket":x.commands.executeCommand("ricwiz.searchTicket");break;case"manualRefresh":x.commands.executeCommand("ricwiz.manualRefresh");break;case"toggleAutoRefresh":x.commands.executeCommand("ricwiz.toggleAutoRefresh");break;case"openHistory":x.commands.executeCommand("ricwiz.openHistory");break}})}conflictState=null;setConflictState(t){this.conflictState=t,this.updateView()}updateBranch(t,s,a=[],i=[],r=[],c=[]){this.webviewView&&(this.currentBranchCache=t,this.currentBranchIsMergedCache=s,this.relatedBranchesCache=a,this.commitsCache=i,this.baseBranchesCache=r,this.recentTicketsCache=c,this.updateView())}currentBranchCache="";currentBranchIsMergedCache=!1;relatedBranchesCache=[];commitsCache=[];baseBranchesCache=[];recentTicketsCache=[];currentPage="main";blameDataCache=null;jiraDataCache=null;autoRefreshEnabled=!0;setBlameData(t){this.blameDataCache=t}setJiraData(t){this.jiraDataCache=t}setAutoRefresh(t){this.autoRefreshEnabled=t,this.updateView()}isAutoRefreshEnabled(){return this.autoRefreshEnabled}setPage(t){this.currentPage=t,this.updateView()}updateView(){if(!this.webviewView)return;let t=this.webviewView.webview.asWebviewUri(x.Uri.joinPath(this._extensionUri,"resources","logo.png"));this.webviewView.webview.html=this._getHtmlForWebview(t,this.currentBranchCache,this.relatedBranchesCache,this.commitsCache,this.baseBranchesCache,this.recentTicketsCache,this.currentPage)}_getHtmlForWebview(t,s,a,i,r,c,g){let m=i.length>0?`
            <div class="separator"></div>
            <div style="padding: 0 4px;">
                <div style="font-size: 11px; opacity: 0.7; margin-bottom: 6px; display: flex; align-items: center; gap: 4px;">
                    <span>\u{1F4DC}</span> Recent Commits
                </div>
                <div style="display: flex; flex-direction: column; gap: 2px;">
                    ${i.map(o=>`
                        <div style="font-size: 11px; padding: 3px 4px; border-radius: 2px; display: flex; gap: 6px; align-items: baseline;">
                            <code style="color: var(--vscode-textLink-foreground); font-size: 10px; flex-shrink: 0;">${B(o.hash)}</code>
                            <span style="flex: 1; overflow: hidden; text-overflow: ellipsis; white-space: nowrap;" title="${B(o.message)}">${B(o.message)}</span>
                            <span style="font-size: 9px; opacity: 0.5; flex-shrink: 0;">${B(o.timeAgo)}</span>
                        </div>
                    `).join("")}
                </div>
            </div>
        `:"",p=`
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
        `;if(this.conflictState){let o=(this.conflictState.files||[]).map(n=>`
                <button class="btn" style="padding: 6px; font-size: 12px; display: flex; justify-content: space-between; align-items: center;" onclick="sendOpenFileCommand('${B(n.file)}')">
                    <span style="flex: 1; overflow: hidden; text-overflow: ellipsis; white-space: nowrap; direction: rtl; text-align: left;">&lrm;${B(n.file)}</span>
                    <span style="font-size: 10px; opacity: 0.8; flex-shrink: 0; background-color: var(--vscode-badge-background); color: var(--vscode-badge-foreground); padding: 2px 4px; border-radius: 2px;">${B(n.state)}</span>
                </button>
            `).join("");return`<!DOCTYPE html>
            <html lang="en">
            <head>
                <meta charset="UTF-8">
                <meta name="viewport" content="width=device-width, initial-scale=1.0">
                <title>Ricwiz Conflict</title>
                ${p}
            </head>
            <body>
                <div style="text-align: center; margin-bottom: 12px; margin-top: 8px;">
                    <img src="${t}" alt="Ricwiz Logo" style="width: 80px; height: 80px; opacity: 0.9;" />
                </div>
                <div style="background-color: var(--vscode-editorError-background); color: var(--vscode-editorError-foreground); padding: 12px; border-radius: 4px; margin-bottom: 12px; text-align: center;">
                    <div style="font-size: 14px; font-weight: bold; margin-bottom: 8px;">\u26A0\uFE0F MERGE CONFLICT</div>
                    <div style="font-size: 11px; margin-bottom: 12px; opacity: 0.9;">
                        Merging <b>${B(this.conflictState.sourceStr)}</b> into <b>${B(this.conflictState.targetStr)}</b>.<br/>
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
                ${p}
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
                            ${o.gitHistory&&o.gitHistory.length>0?o.gitHistory.map(n=>`
                                <li style="background: var(--vscode-editorWidget-background); border: 1px solid var(--vscode-widget-border); padding: 8px 10px; border-radius: 4px; border-left: 4px solid var(--vscode-gitDecoration-modifiedResourceForeground);">
                                    <div style="display: flex; justify-content: space-between; margin-bottom: 4px; align-items: center;">
                                        <strong style="font-size: 13px;">${n.author}</strong>
                                        <span style="opacity: 0.7; font-size: 11px;">${n.time}</span>
                                    </div>
                                    <div style="font-size: 12px; margin-bottom: 6px; opacity: 0.9; font-style: italic;">"${n.message}"</div>
                                    <div style="font-family: monospace; font-size: 10px; opacity: 0.6;">Commit: ${n.hash}</div>
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
                            ${o.auditHistory&&o.auditHistory.length>0?o.auditHistory.map(n=>`
                                <li style="background: var(--vscode-editorWidget-background); border: 1px solid var(--vscode-widget-border); padding: 8px 10px; border-radius: 4px; border-left: 4px solid var(--vscode-gitDecoration-untrackedResourceForeground);">
                                    <div style="display: flex; justify-content: space-between; margin-bottom: 4px; align-items: center;">
                                        <strong style="font-size: 13px;">${n.author}</strong>
                                        <span style="opacity: 0.7; font-size: 11px;">${n.time}</span>
                                    </div>
                                    <div style="font-size: 12px; font-weight: 500; margin-bottom: 4px;">${n.action}</div>
                                    <div style="font-size: 11px; opacity: 0.7; font-style: italic; background: var(--vscode-editor-background); padding: 4px; border-radius: 3px;">${n.display}</div>
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
            </html>`}if(g==="jira"){let o=this.jiraDataCache,n=o?.ticketId||"Jira",d=o?.summary||"No Title",l=o?.description||"No description provided.";return`<!DOCTYPE html>
            <html lang="en">
            <head>
                <meta charset="UTF-8">
                <meta name="viewport" content="width=device-width, initial-scale=1.0">
                <title>Ricwiz Jira Details</title>
                ${p}
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
                    <span style="font-weight: 600; font-size: 13px;">${n} Details</span>
                </div>
                
                <div class="card" style="padding: 16px;">
                    <div class="jira-title">${B(d)}</div>
                    <div class="jira-desc">${B(l)}</div>
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
                ${p}
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
            ${p}
        </head>
        <body>
            <div style="text-align: center; margin-bottom: 12px; margin-top: 8px;">
                <img src="${t}" alt="Ricwiz Logo" style="width: 80px; height: 80px; opacity: 0.9; filter: drop-shadow(0 2px 4px rgba(0,0,0,0.2));" />
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

            ${s?`<div style="background-color: var(--vscode-editor-inactiveSelectionBackground); padding: 10px; border-radius: 6px; margin-bottom: 16px; border: 1px solid var(--vscode-panel-border); box-shadow: 0 2px 4px rgba(0,0,0,0.1);">
                    <div style="font-size: 10px; opacity: 0.7; margin-bottom: 4px; display: flex; align-items: center; justify-content: center; gap: 4px; text-transform: uppercase;">
                        Current Ticket / Branch
                        <button class="copy-btn" onclick="sendCommand('copyBranch')" title="Copy branch name to clipboard">\u{1F4CB}</button>
                    </div>
                    <div style="font-weight: bold; font-size: 14px; word-break: break-all; text-align: center; color: var(--vscode-textLink-foreground);">
                        ${B(s)} ${this.currentBranchIsMergedCache?'<span style="margin-left: 4px; background-color: var(--vscode-charts-green); color: white; border-radius: 3px; padding: 1px 4px; font-size: 10px; font-weight: bold;" title="Merged to target env">MERGED</span>':""}
                    </div>
                    ${a.length>0?`
                        <div style="margin-top: 10px; border-top: 1px solid var(--vscode-panel-border); padding-top: 10px;">
                            <div style="font-size: 10px; opacity: 0.7; margin-bottom: 6px; text-transform: uppercase; text-align: center;">Sister Branches</div>
                            <div style="display: flex; flex-direction: column; gap: 4px;">
                                ${a.map(o=>`
                                    <div class="btn" style="padding: 4px 8px; font-size: 11px; display: flex; justify-content: space-between; align-items: center; background-color: var(--vscode-button-secondaryBackground); color: var(--vscode-button-secondaryForeground); border-radius: 4px;" onclick="sendCheckoutCommand('${B(o.name)}', this)" title="Checkout ${B(o.name)}">
                                        <span style="overflow: hidden; text-overflow: ellipsis; white-space: nowrap; font-weight: bold;">${B(o.name)}</span>
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
                                    <div class="btn" style="padding: 4px 8px; font-size: 11px; display: flex; align-items: center; background-color: var(--vscode-button-secondaryBackground); color: var(--vscode-button-secondaryForeground); border-radius: 4px;" onclick="sendCheckoutCommand('${B(o)}', this)" title="Checkout ${B(o)}">
                                        <span style="font-weight: bold;">${B(o)}</span>
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
                        <button class="btn" style="flex: 1; min-width: 25%; justify-content: center; padding: 6px 4px; font-size: 10px; font-weight: bold; background-color: var(--vscode-button-secondaryBackground); color: var(--vscode-button-secondaryForeground); border-radius: 4px;" onclick="sendCheckoutCommand('${B(o)}', this)" title="Checkout ${B(o)}">
                            ${B(o.toUpperCase())}
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
        </html>`}}});var le,et=C(()=>{"use strict";le=class{static isValidShellArg(t){return t?/^[a-zA-Z0-9\-_/.]+$/.test(t):!1}}});var be,tt,ze,A,se=C(()=>{"use strict";be=b(require("vscode")),tt=b(require("path")),ze=b(require("fs")),A=class e{style;upstreamRemote;originRemote;ticketSourceBranch;ticketPrefix;environments;static baseConfig=be.workspace.getConfiguration("ricwiz");constructor(t){let s=e.baseConfig;this.style=t?.workflowStyle||s.get("workflowStyle","standard"),this.style==="multi-remote"?(this.upstreamRemote=t?.upstreamRemote||s.get("upstreamRemote","salesforce-master"),this.originRemote=t?.originRemote||s.get("originRemote","origin")):(this.upstreamRemote="origin",this.originRemote="origin"),this.ticketSourceBranch=t?.ticketSourceBranch||s.get("ticketSourceBranch","main"),this.ticketPrefix=t?.ticketPrefix||s.get("ticketPrefix","SFPSCA-");let a=[{name:"Qual",sourceBranch:"quality"},{name:"Val",sourceBranch:"validation"},{name:"Prod",sourceBranch:"main"}];this.environments=t?.environments||s.get("environments",a)}static async initialize(t){let s=e.baseConfig.get("profiles",[]),a=tt.join(t,"ricwiz.json");if(ze.existsSync(a))try{let i=ze.readFileSync(a,"utf-8"),r=JSON.parse(i);r&&Array.isArray(r.profiles)&&(s=[...s,...r.profiles])}catch(i){be.window.showErrorMessage(`Ricwiz: Error parsing ricwiz.json: ${i.message}`)}if(s.length>0){let i=s.map(g=>g.name),r=await be.window.showQuickPick(i,{placeHolder:"Ricwiz: Select Workflow Profile",ignoreFocusOut:!0});if(!r)return;let c=s.find(g=>g.name===r);return new e(c)}return new e}buildUpstreamPath(t){return t.includes("/")?t:`${this.upstreamRemote}/${t}`}getFetchRemote(t){return t.includes("/")?t.split("/")[0]:this.upstreamRemote}getFetchBranch(t){return t.includes("/")?t.substring(t.indexOf("/")+1):t}}});async function ot(){let e=y();if(!e){P.window.showErrorMessage("Open a folder or workspace that is a Git repository.");return}let t=await A.initialize(e);if(!t)return;let s=await W(e,{prefix:t.ticketPrefix});if(!s){P.window.showErrorMessage("Branch creation cancelled: Ticket not provided.");return}let{ticketId:a}=s,i=t.environments,r="all";if(i.length>0){let m=[{label:"Create Main Branch & Environments",description:"Creates the main ticket branch and all environment branches",value:"all"},{label:"Create Main Branch Only",description:"Creates only the main ticket branch (skips environments)",value:"mainOnly"},{label:"Create Environments Only",description:"Creates only the environment branches (skip main branch)",value:"envs"}],p=await P.window.showQuickPick(m,{placeHolder:"What branches do you want to create?",title:"Ricwiz Branch Creation"});if(!p){P.window.showInformationMessage("Branch creation cancelled.");return}r=p.value}let c=t.ticketSourceBranch;if(r==="all"||r==="mainOnly"){let m=[];try{let{stdout:o}=await u('git branch --all --format="%(refname:short)"',{cwd:e});m=o.split(`
`).map(n=>n.trim()).filter(n=>n&&n!=="origin"),m=[...new Set(m)]}catch{}let p=await new Promise(o=>{let n=P.window.createQuickPick();n.title="Ricwiz: Ticket Source Branch",n.placeholder="Confirm or change the source branch for this ticket",n.value=t.ticketSourceBranch,n.ignoreFocusOut=!0;let d=()=>{let l=n.value.trim(),f=[];l&&f.push({label:l,description:"Use typed branch"}),m.forEach(h=>{h!==l&&(!l||h.toLowerCase().includes(l.toLowerCase()))&&f.push({label:h,description:h.startsWith("origin/")||h.includes("/")?"Remote branch":"Local branch"})}),n.items=f};n.onDidChangeValue(()=>d()),n.onDidAccept(()=>{let l=n.selectedItems[0];l?(n.hide(),o(l.label)):n.value.trim()&&(n.hide(),o(n.value.trim()))}),n.onDidHide(()=>{n.dispose(),o(void 0)}),d(),n.show()});if(!p){P.window.showInformationMessage("Branch creation cancelled.");return}c=p.trim()}let g=a;if(!le.isValidShellArg(g)){P.window.showErrorMessage(`Invalid format for ticket ID: ${g}`);return}if(!le.isValidShellArg(c)){P.window.showErrorMessage(`Invalid format for ticketSourceBranch in settings: ${c}`);return}for(let m of i){if(!le.isValidShellArg(m.name)){P.window.showErrorMessage(`Invalid format for environment name in settings: ${m.name}`);return}if(!le.isValidShellArg(m.sourceBranch)){P.window.showErrorMessage(`Invalid format for environment sourceBranch in settings: ${m.sourceBranch}`);return}}try{await u("git status",{cwd:e})}catch{P.window.showErrorMessage("The opened folder does not appear to be a valid Git repository.");return}try{await P.window.withProgress({location:P.ProgressLocation.Notification,title:"Ricwiz: Creating Branches",cancellable:!1},async m=>{let p=[];m.report({message:"Checking remote status (git fetch)...",increment:10});try{await u("git fetch",{cwd:e})}catch{}try{if(r==="all"||r==="mainOnly"){if(m.report({message:`Creating main branch ${g}...`,increment:10}),await ne(e,g))P.window.showInformationMessage(`Ricwiz: The branch ${g} already exists. Skipping creation...`),await u(`git checkout ${g}`,{cwd:e});else try{let o=t.getFetchRemote(c),n=t.getFetchBranch(c),d=t.buildUpstreamPath(c);await u(`git fetch ${o} ${n}`,{cwd:e}),await u(`git checkout -b ${g} ${d}`,{cwd:e}),p.push(g)}catch{try{await u(`git checkout -b ${g} ${c}`,{cwd:e}),p.push(g)}catch{throw new Error(`Could not create main branch '${g}' from '${c}'. Does the source branch exist?`)}}try{await u(`git config branch.${g}.ricwiz-source "${c}"`,{cwd:e})}catch{}}if(r==="all"||r==="envs"){let o=50/(i.length||1);for(let n of i){let d=`${a}-to-${n.name}`,l=n.sourceBranch;if(m.report({message:`Processing environment branch ${d}...`,increment:o}),!await ne(e,d))try{let f=t.buildUpstreamPath(l);await u(`git checkout -b ${d} ${f}`,{cwd:e}),p.push(d)}catch{try{await u(`git checkout -b ${d} ${l}`,{cwd:e}),p.push(d)}catch{throw new Error(`Could not create environment branch '${d}' from '${l}'. Does the source branch exist?`)}}}}m.report({message:`Publishing branches to ${t.originRemote}...`,increment:10});for(let o of p)try{await u(`git push -u ${t.originRemote} ${o}`,{cwd:e})}catch{P.window.showWarningMessage(`Ricwiz: Branch ${o} was created locally but could not be pushed to ${t.originRemote}.`)}if(r==="all"||r==="mainOnly"){m.report({message:`Switching to ${g}...`,increment:10});try{await u(`git checkout ${g}`,{cwd:e})}catch{}}m.report({increment:100}),P.window.showInformationMessage("Ricwiz: All set! You can start working on your branches! \u{1F680}")}catch(o){if(P.window.showErrorMessage(`Ricwiz Branch Creation Failed: ${o.message}`),p.length>0){try{await u(`git checkout ${c}`,{cwd:e})}catch{}for(let n of p)try{await u(`git branch -D ${n}`,{cwd:e})}catch{}P.window.showWarningMessage(`Ricwiz: Rolled back (deleted) ${p.length} branch(es) locally due to failure.`)}}})}catch(m){P.window.showErrorMessage(`Ricwiz general error: ${m.message}`)}}var P,it=C(()=>{"use strict";P=b(require("vscode"));$();et();se()});async function re(e,t,s,a){a&&a.report({message:"CONFLICT! Resolve & click 'Commit & Continue' in Ricwiz panel."});let i=!1,r=!1,c=async()=>{try{let{stdout:o}=await u("git status --porcelain",{cwd:e});return o.split(`
`).filter(n=>{let d=n.substring(0,2);return["UD","DU","DD","AU","UA"].includes(d)}).map(n=>n.substring(3).trim())}catch{return[]}},g=async()=>{try{let{stdout:o}=await u("git status --porcelain",{cwd:e}),n=d=>d==="UU"?"Both Modified":d==="UD"?"Deleted by them":d==="DU"?"Deleted by us":d==="DD"?"Both Deleted":d==="AA"?"Both Added":d==="AU"?"Added by us":d==="UA"?"Added by them":"Conflicted";return o.split(`
`).map(d=>d.trimRight()).filter(d=>d.length>2).filter(d=>{let l=d.substring(0,2);return["UU","AA","UD","DU","AU","UA","DD"].includes(l)}).map(d=>{let l=d.substring(0,2);return{file:d.substring(3).trim(),state:n(l)}})}catch{return[]}},m=async()=>{if(i)return;let o=await c(),n=await g(),{webviewProvider:d}=(Pe(),pe(Be));d&&d.setConflictState({isConflict:!0,sourceStr:t,targetStr:s,deletionsCount:o.length,files:n})},p=ee.commands.registerCommand("ricwiz.conflictAction",async o=>{if(o==="abortDeploy")r=!0;else if(o==="resolveDeletions"){try{let d=(await c()).map(f=>({label:f})),l=await ee.window.showQuickPick(d,{canPickMany:!0,placeHolder:"Select conflicted files to DELETE",title:"Ricwiz: Delete Conflicted Files"});if(l&&l.length>0){for(let f of l)try{await u(`git rm --force "${f.label}"`,{cwd:e})}catch{}ee.window.showInformationMessage(`Ricwiz: Deleted ${l.length} conflicted file(s).`)}}catch(n){ee.window.showErrorMessage(`Ricwiz: Error. (${n.message})`)}m()}else if(o==="commitAndContinue")try{let d=(await c()).filter(f=>nt.existsSync(st.join(e,f)));if(d.length>0&&await ee.window.showWarningMessage(`Wait! There are ${d.length} file(s) with deletion conflicts that are still on your disk.

If you commit now, you will KEEP them in the project.

Are you sure you want to KEEP them?`,{modal:!0},"Yes, KEEP them","No, let me DELETE them")!=="Yes, KEEP them"){m();return}let l=!1;try{let{stdout:f}=await u('git grep -E "^<<<<<<< "',{cwd:e});f.trim().length>0&&(l=!0)}catch{}if(l){ee.window.showErrorMessage("Ricwiz: You still have unresolved conflict markers (<<<<<<<) in your files. Please resolve them first!"),m();return}await u("git add .",{cwd:e}),await u("git commit --no-edit",{cwd:e})}catch(n){ee.window.showErrorMessage(`Ricwiz: Could not commit automatically. (${n.message})`),m()}});for(m();;){if(r){i=!0,p.dispose(),(Pe(),pe(Be)).webviewProvider?.setConflictState(null);try{await u("git merge --abort",{cwd:e})}catch{}return!1}try{let{stdout:o}=await u("git status --porcelain",{cwd:e});if(o.trim().length===0)return i=!0,p.dispose(),(Pe(),pe(Be)).webviewProvider?.setConflictState(null),ee.window.showInformationMessage("Ricwiz: Changes committed!"),!0}catch{}await new Promise(o=>setTimeout(o,2e3))}}var ee,nt,st,Se=C(()=>{"use strict";ee=b(require("vscode")),nt=b(require("fs")),st=b(require("path"));$()});async function rt(){let e=y();if(!e){L.window.showErrorMessage("Ricwiz: Open a folder or workspace that is a Git repository.");return}try{await u("git status",{cwd:e})}catch{L.window.showErrorMessage("Ricwiz: The opened folder does not appear to be a valid Git repository.");return}let t=await A.initialize(e);if(!t)return;let s=t.environments,a=await W(e,{prefix:t.ticketPrefix});if(!a){L.window.showErrorMessage("Operation cancelled: Ticket not provided.");return}let{ticketId:i,currentBranch:r}=a,c=i;if(!await ne(e,c)){L.window.showErrorMessage(`Ricwiz: Main branch '${c}' does not exist! Prepare deploy is only available when a main ticket branch is used.`);return}let m=L.workspace.getConfiguration("ricwiz").get("defaultReviewers",""),p="";try{let{stdout:o}=await u(`git config branch.${i}.ricwiz-reviewers`,{cwd:e});p=o.trim()}catch{}if(m.trim()){let o=await L.window.showInputBox({prompt:"Ricwiz: Reviewers for this deploy (optional, comma-separated)",placeHolder:"e.g. @joao, 123456",value:p||m,ignoreFocusOut:!0});if(o===void 0)return;try{o.trim()?await u(`git config branch.${i}.ricwiz-reviewers "${o.trim()}"`,{cwd:e}):p&&await u(`git config --unset branch.${i}.ricwiz-reviewers`,{cwd:e})}catch{}}await L.window.withProgress({location:L.ProgressLocation.Notification,title:"Ricwiz: Preparing Deploy",cancellable:!0},async(o,n)=>{let d=0,l=r,f=!1;n.onCancellationRequested(()=>{f=!0}),o.report({message:"Syncing remote information...",increment:10});try{await u("git fetch --all",{cwd:e});let w=10/(s.length||1);for(let k of s)try{if(f)throw new Error("Aborted");o.report({message:`Fetching ${k.sourceBranch}...`,increment:w});let R=t.getFetchRemote(k.sourceBranch),z=t.getFetchBranch(k.sourceBranch);await u(`git fetch ${R} ${z}:${z}`,{cwd:e})}catch{}}catch{}let h=60/(s.length||1);for(let w of s){if(f)break;let k=`${i}-to-${w.name}`,R=w.sourceBranch;try{o.report({message:`Processing ${k}...`,increment:h/4}),await u(`git checkout ${k}`,{cwd:e});try{await u(`git pull ${t.originRemote} ${k}`,{cwd:e})}catch{}try{o.report({message:`Merging ${R} into ${k}...`,increment:h/4});let z=t.getFetchRemote(R),N=t.getFetchBranch(R),U=t.buildUpstreamPath(R);await u(`git fetch ${z} ${N}`,{cwd:e}),await u(`git merge ${U}`,{cwd:e})}catch(z){let N=!1;try{let{stdout:O}=await u("git ls-files -u",{cwd:e});O.trim().length>0&&(N=!0)}catch{}let U=((z.stdout||"")+(z.stderr||"")+(z.message||"")).toLowerCase();if(N||U.includes("conflict")||U.includes("conflit")){let O=t.buildUpstreamPath(R);if(!await re(e,O,k,o))throw f=!0,new Error("Deploy aborted by user.")}else throw z}try{o.report({message:`Merging ${c} into ${k}...`,increment:h/4}),await u(`git merge ${c}`,{cwd:e})}catch(z){let N=!1;try{let{stdout:O}=await u("git ls-files -u",{cwd:e});O.trim().length>0&&(N=!0)}catch{}let U=((z.stdout||"")+(z.stderr||"")+(z.message||"")).toLowerCase();if(N||U.includes("conflict")||U.includes("conflit")){if(!await re(e,c,k,o))throw f=!0,new Error("Deploy aborted by user.")}else throw z}if(f)break;o.report({message:`Pushing ${k}...`,increment:h/4}),await u(`git push ${t.originRemote} ${k}`,{cwd:e}),d++}catch(z){z.message.includes("aborted")?L.window.showInformationMessage("Ricwiz: Deploy cancelled."):L.window.showErrorMessage(`Ricwiz: Failed to process branch ${k}. Detail: ${z.message}`);return}}if(!f){o.report({message:"Finishing up...",increment:10});let w=l;try{await u(`git show-ref --verify --quiet refs/heads/${c}`,{cwd:e}),w=c}catch{}try{let k=await T(e);w&&w!==k?(await u(`git checkout ${w}`,{cwd:e}),L.window.showInformationMessage(`Ricwiz: Operation complete. Back on branch ${w}.`)):L.window.showInformationMessage("Ricwiz: Operation complete.")}catch{L.window.showInformationMessage("Ricwiz: Operation complete.")}}})}var L,at=C(()=>{"use strict";L=b(require("vscode"));$();Se();se()});async function ct(e=!1){let t=y();if(!t)return;let s=await A.initialize(t);if(!s)return;let a=await W(t,{prompt:"Enter the full ticket ID for the Merge Requests (e.g., SCPSCA-1234) or just the number"});if(!a)return;let{ticketId:i}=a,c=Q.workspace.getConfiguration("ricwiz").get("gitlabUrlOverride",""),g="";if(c&&c.trim()!=="")g=c.trim();else{let o="";try{let{stdout:n}=await u("git remote get-url origin",{cwd:t});o=n.trim()}catch{Q.window.showErrorMessage("Ricwiz: Could not get the remote origin URL. Please configure the URL manually in the extension settings.");return}g=o,g.endsWith(".git")&&(g=g.slice(0,-4)),g.startsWith("git@")&&(g=g.replace("git@","").replace(":","/"),g=`https://${g}`)}let m=[],p=s.ticketSourceBranch;try{let{stdout:o}=await u(`git config branch.${i}.ricwiz-source`,{cwd:t});o.trim()&&(p=o.trim())}catch{}if(s.environments.length===0)m.push({source:i,target:p});else for(let o of s.environments)m.push({source:`${i}-to-${o.name}`,target:o.sourceBranch});for(let o of m){let n=`${g}/-/merge_requests/new?merge_request[source_branch]=${o.source}&merge_request[target_branch]=${o.target}`;e?Q.commands.executeCommand("simpleBrowser.show",n):Q.env.openExternal(Q.Uri.parse(n))}Q.window.showInformationMessage(`Ricwiz: Opening ${e?"VS Code browser":"external browser"} for Merge Requests!`)}async function dt(){return ct(!1)}async function lt(){return ct(!0)}var Q,mt=C(()=>{"use strict";Q=b(require("vscode"));$();se()});async function ut(e=!1){let t=y();if(!t)return;let s=Z.workspace.getConfiguration("ricwiz"),a=s.get("jiraUrl","");if(!a||a.trim()===""){Z.window.showErrorMessage("Ricwiz: Jira URL is not configured. Please set it in the extension settings (e.g., https://jira.company.com/browse/).");return}let{getCurrentBranch:i,resolvePrefix:r,extractTicketSuggestion:c}=($(),pe(Le)),g=await i(t),m=s.get("ticketPrefix","SFPSCA-"),p=r(g,m),n=c(g,p,!0);if(n){let{normalizeTicketId:l}=($(),pe(Le));n=l(n,p)}else{let l=await W(t,{prompt:"Ricwiz could not detect the ticket from the branch name. Enter Jira ticket ID (e.g. SFPSCA-1234)",handleToSuffix:!0});if(!l)return;n=l.ticketId}let d=a.trim();d.endsWith("/")||(d+="/"),d+=n,e?Z.commands.executeCommand("simpleBrowser.show",d):Z.env.openExternal(Z.Uri.parse(d)),Z.window.showInformationMessage(`Ricwiz: Opening Jira Ticket ${n} in ${e?"VS Code":"browser"}!`)}async function pt(){return ut(!1)}async function gt(){return ut(!0)}var Z,ft=C(()=>{"use strict";Z=b(require("vscode"));$()});async function ht(){let e=y();if(!e){oe.window.showErrorMessage("Ricwiz: Open a folder or workspace that is a Git repository.");return}let t=await A.initialize(e);if(!t)return;let s=await W(e,{prefix:t.ticketPrefix,prompt:"Enter the full ticket ID to sync all branches for (e.g., SCPSCA-1234) or just the number"});if(!s)return;let{ticketId:a,currentBranch:i}=s;await oe.window.withProgress({location:oe.ProgressLocation.Notification,title:`Ricwiz: Syncing all branches for ${a}...`,cancellable:!1},async r=>{try{r.report({message:"Fetching from remote..."});try{await u("git fetch --all",{cwd:e})}catch{}let{stdout:c}=await u(`git branch --list "*${a}*"`,{cwd:e}),g=c.split(`
`).map(o=>o.replace("*","").trim()).filter(o=>o.length>0);if(g.length===0){oe.window.showWarningMessage(`Ricwiz: No local branches found for ${a}.`);return}let m=0,p=0;for(let o of g)if(r.report({message:`Syncing ${o}...`}),o===i)try{await u(`git pull ${t.originRemote} ${o}`,{cwd:e}),m++}catch(n){let d=!1;try{let{stdout:f}=await u("git ls-files -u",{cwd:e});f.trim().length>0&&(d=!0)}catch{}let l=((n.stdout||"")+(n.stderr||"")+(n.message||"")).toLowerCase();(d||l.includes("conflict")||l.includes("conflit"))&&await re(e,`${t.originRemote}/${o}`,o,r)?m++:p++}else try{await u(`git fetch ${t.originRemote} ${o}:${o}`,{cwd:e}),m++}catch{try{await u(`git checkout ${o}`,{cwd:e});try{await u(`git pull ${t.originRemote} ${o}`,{cwd:e}),m++}catch(d){let l=!1;try{let{stdout:h}=await u("git ls-files -u",{cwd:e});h.trim().length>0&&(l=!0)}catch{}let f=((d.stdout||"")+(d.stderr||"")+(d.message||"")).toLowerCase();(l||f.includes("conflict")||f.includes("conflit"))&&await re(e,`${t.originRemote}/${o}`,o,r)?m++:p++}await u(`git checkout ${i}`,{cwd:e})}catch{try{await u(`git checkout ${i}`,{cwd:e})}catch{}p++}}p>0?oe.window.showWarningMessage(`Ricwiz: Synced ${m}/${g.length} branches. ${p} branch(es) could not be synced (possible conflicts or diverged history).`):oe.window.showInformationMessage(`Ricwiz: \u{1F504} All ${m} branches for ${a} are up to date!`)}catch(c){oe.window.showErrorMessage(`Ricwiz: Sync failed: ${c.message}`)}})}var oe,wt=C(()=>{"use strict";oe=b(require("vscode"));$();Se();se()});async function vt(){let e=y();if(!e){ie.window.showErrorMessage("Ricwiz: Open a folder or workspace that is a Git repository.");return}try{await u("git status",{cwd:e})}catch{ie.window.showErrorMessage("Ricwiz: The opened folder does not appear to be a valid Git repository.");return}let t=await A.initialize(e);if(!t)return;let s=t.environments,a=await W(e,{prefix:t.ticketPrefix});if(!a)return;let{ticketId:i,currentBranch:r}=a;await ie.window.withProgress({location:ie.ProgressLocation.Notification,title:"Ricwiz: Updating environment branches from their bases",cancellable:!0},async(c,g)=>{let m=0,p=r,o=!1;g.onCancellationRequested(()=>{o=!0}),c.report({message:"Syncing remote information...",increment:10});try{await u("git fetch --all",{cwd:e})}catch{}let n=80/(s.length||1);for(let d of s){if(o)break;let l=`${i}-to-${d.name}`,f=d.sourceBranch;if(await ne(e,l))try{c.report({message:`Processing ${l}...`,increment:n/2}),await u(`git checkout ${l}`,{cwd:e});try{c.report({message:`Merging ${f} into ${l}...`,increment:n/2});let h=t.getFetchRemote(f),w=t.getFetchBranch(f),k=t.buildUpstreamPath(f);await u(`git fetch ${h} ${w}`,{cwd:e}),await u(`git merge ${k}`,{cwd:e})}catch(h){let w=!1;try{let{stdout:R}=await u("git ls-files -u",{cwd:e});R.trim().length>0&&(w=!0)}catch{}let k=((h.stdout||"")+(h.stderr||"")+(h.message||"")).toLowerCase();if(w||k.includes("conflict")||k.includes("conflit")){let R=t.buildUpstreamPath(f);if(!await re(e,R,l,c))throw o=!0,new Error("Update aborted by user.")}else throw h}if(o)break;m++}catch(h){h.message.includes("aborted")?ie.window.showInformationMessage("Ricwiz: Update cancelled."):ie.window.showErrorMessage(`Ricwiz: Failed to update branch ${l}. Detail: ${h.message}`);return}}if(!o){c.report({message:"Finishing up...",increment:10});try{let d=await T(e);p&&p!==d&&await u(`git checkout ${p}`,{cwd:e})}catch{}ie.window.showInformationMessage(`Ricwiz: Successfully updated ${m} environment branches from their bases!`)}})}var ie,yt=C(()=>{"use strict";ie=b(require("vscode"));$();Se();se()});async function bt(){let e=y();if(!e){I.window.showErrorMessage("Ricwiz: Open a folder or workspace that is a Git repository.");return}let t=await T(e),s=I.workspace.getConfiguration("ricwiz");await I.window.withProgress({location:I.ProgressLocation.Notification,title:"Ricwiz: Scanning for unused local branches...",cancellable:!1},async()=>{try{await u("git fetch --prune",{cwd:e})}catch{}let a=[];try{let{stdout:n}=await u('git branch --format="%(refname:short)"',{cwd:e});a=n.split(`
`).map(d=>d.trim()).filter(d=>d.length>0)}catch{}if(a.length===0){I.window.showInformationMessage("Ricwiz: No local branches found.");return}let i=[];try{let{stdout:n}=await u('git branch -r --format="%(refname:short)"',{cwd:e});i=n.split(`
`).map(d=>d.trim().replace(/^origin\//,"").replace(/^[^\/]+\//,"")).filter(d=>d.length>0&&!d.includes("HEAD"))}catch{}let r=[];try{let{stdout:n}=await u('git for-each-ref --format="%(refname:short)|||%(upstream:track)" refs/heads/',{cwd:e});r=n.split(`
`).filter(d=>d.includes("[gone]")).map(d=>d.split("|||")[0].trim())}catch{}let c=a.filter(n=>!i.includes(n));if(c.length===0){I.window.showInformationMessage("Ricwiz: Your local repository is totally clean! All local branches exist on the remote.");return}let g=c.map(n=>{let d=r.includes(n),l=n===t,f="Not found on remote";return d&&(f="Deleted on remote [gone]"),l&&(f+=" (Current branch - will checkout main first)"),{label:n,description:f,picked:d&&!l}}),m=await I.window.showQuickPick(g,{canPickMany:!0,placeHolder:"Select local branches to delete",title:"Ricwiz: Delete Unused Branches"});if(!m||m.length===0){I.window.showInformationMessage("Ricwiz: No branches selected for deletion.");return}if(await I.window.showWarningMessage(`Ricwiz: Delete ${m.length} local branch(es)?
This cannot be undone!`,{modal:!0},"Yes, delete them")!=="Yes, delete them"){I.window.showInformationMessage("Ricwiz: Deletion cancelled.");return}let o=0;for(let n of m){let d=n.label;if(d===t){let l=s.get("ticketSourceBranch","main");try{await u(`git checkout ${l}`,{cwd:e}),t=l}catch{I.window.showWarningMessage(`Ricwiz: Could not switch away from ${d}. Skipping.`);continue}}try{await u(`git branch -D ${d}`,{cwd:e}),o++}catch{I.window.showWarningMessage(`Ricwiz: Could not delete local branch ${d}.`)}}I.window.showInformationMessage(`Ricwiz: \u{1F5D1}\uFE0F Cleaned up ${o} unused local branch(es).`)})}var I,xt=C(()=>{"use strict";I=b(require("vscode"));$()});async function fe(e){let t=y();t&&await X.window.withProgress({location:X.ProgressLocation.Notification,title:`Ricwiz: Switching to ${e}...`,cancellable:!1},async()=>{try{let s=await T(t),a=!1;try{let{stdout:r}=await u("git status --porcelain",{cwd:t});a=r.trim().length>0}catch{}if(a&&s)try{await u(`git stash push --include-untracked -m "ricwiz-auto:${s}"`,{cwd:t}),X.window.showInformationMessage(`Ricwiz: \u{1F4E6} Stashed changes from ${s}`)}catch{X.window.showWarningMessage("Ricwiz: Could not stash changes. Checkout may fail if there are conflicts.")}let i=e;e.includes("/")&&(i=e.split("/").slice(1).join("/"));try{await u(`git checkout ${i}`,{cwd:t})}catch{let c="";if(e.includes("/"))c=e.split("/")[0];else{let{stdout:g}=await u("git branch -r",{cwd:t}),m=g.split(`
`).map(o=>o.trim()).filter(o=>o),p=[];for(let o of m){let n=o.split(" ")[0];n.endsWith(`/${i}`)&&p.push(n.substring(0,n.lastIndexOf("/")))}if(p.length===0){X.window.showErrorMessage(`Ricwiz: A branch "${i}" n\xE3o existe localmente nem em nenhuma remote!`);return}else if(p.length===1)c=p[0];else{let o=await A.initialize(t);p.includes("origin")?c="origin":o&&p.includes(o.upstreamRemote)?c=o.upstreamRemote:c=p[0]}}try{await u(`git fetch ${c} ${i}`,{cwd:t}),await u(`git checkout -b ${i} --track ${c}/${i}`,{cwd:t})}catch{X.window.showErrorMessage(`Ricwiz: Encontrou na remote ${c} mas falhou a fazer checkout.`);return}}try{let{stdout:r}=await u("git stash list",{cwd:t}),c=r.split(`
`);for(let g=0;g<c.length;g++)if(c[g].includes(`ricwiz-auto:${i}`)){let m=c[g].match(/stash@\{(\d+)\}/);m&&(await u(`git stash pop stash@{${m[1]}}`,{cwd:t}),X.window.showInformationMessage(`Ricwiz: \u{1F4E6} Restored stashed changes on ${i}`));break}}catch{X.window.showWarningMessage(`Ricwiz: Could not restore stashed changes on ${i}. You may need to resolve conflicts manually (check git stash list).`)}}catch{X.window.showErrorMessage(`Ricwiz: Could not checkout branch ${e}.`)}})}var X,Ee=C(()=>{"use strict";X=b(require("vscode"));$();se()});async function kt(){let e=y();if(e)try{let{stdout:t}=await u("git branch --show-current",{cwd:e}),s=t.trim();s&&(await xe.env.clipboard.writeText(s),xe.window.showInformationMessage(`Ricwiz: \u{1F4CB} Copied "${s}" to clipboard`))}catch{xe.window.showErrorMessage("Ricwiz: Could not get the current branch name.")}}var xe,Ct=C(()=>{"use strict";xe=b(require("vscode"));$()});async function Rt(){let e=y();if(!e){V.window.showErrorMessage("Ricwiz: Open a folder or workspace that is a Git repository.");return}let t=V.workspace.getConfiguration("ricwiz"),s=t.get("ticketSourceBranch","main"),i=t.get("packageXmlCommand",'sf sgd source delta --to "HEAD" --from "origin/{baseBranch}" --output-dir "."').replace("{baseBranch}",s);await V.window.showWarningMessage("Are you sure you want to generate the package.xml? This may overwrite existing local manifest files.",{modal:!0},"Yes, Generate")==="Yes, Generate"&&await V.window.withProgress({location:V.ProgressLocation.Notification,title:"Ricwiz: Generating package.xml using Salesforce CLI...",cancellable:!1},async()=>{try{await u(i,{cwd:e,maxBuffer:10*1024*1024}),V.window.showInformationMessage("Ricwiz: Successfully generated package.xml!");let c=Me.join(e,"package","package.xml"),g=Me.join(e,"package.xml"),m=Me.join(e,"manifest","package.xml");for(let p of[c,g,m])if($t.existsSync(p)){let o=await V.workspace.openTextDocument(p);await V.window.showTextDocument(o);break}}catch(c){V.window.showErrorMessage(`Ricwiz: Error running sf command - ${c.message}`)}})}var V,Me,$t,zt=C(()=>{"use strict";V=b(require("vscode")),Me=b(require("path")),$t=b(require("fs"));$()});async function Bt(){let e=y();if(!e){J.window.showErrorMessage("Ricwiz: Open a folder or workspace that is a Git repository.");return}let s=J.workspace.getConfiguration("ricwiz").get("deployCommand","sf project deploy start --manifest package/package.xml --post-destructive-changes destructiveChanges/destructiveChanges.xml -c -l NoTestRun -g");await J.window.showWarningMessage("Are you sure you want to deploy to Salesforce? This action modifies your org and cannot be easily undone.",{modal:!0},"Yes, Deploy")==="Yes, Deploy"&&await J.window.withProgress({location:J.ProgressLocation.Notification,title:"Ricwiz: Deploying package...",cancellable:!1},async()=>{try{let{stdout:i,stderr:r}=await u(s,{cwd:e,maxBuffer:52428800}),c=J.window.createOutputChannel("Ricwiz Deploy");c.appendLine(`Executing: ${s}`),c.appendLine(i),r&&(c.appendLine("--- STDERR ---"),c.appendLine(r)),c.show(),J.window.showInformationMessage("Ricwiz: Successfully ran deploy command!")}catch(i){let r=J.window.createOutputChannel("Ricwiz Deploy");r.appendLine(`Error executing: ${s}`),i.stdout&&r.appendLine(i.stdout),i.stderr&&r.appendLine(i.stderr),r.appendLine(i.message),r.show(),J.window.showErrorMessage("Ricwiz: Error running deploy command. See output channel for details.")}})}var J,Pt=C(()=>{"use strict";J=b(require("vscode"));$()});async function St(){let e=y();if(!e){G.window.showErrorMessage("Ricwiz: Open a folder or workspace that is a Git repository.");return}let s=G.workspace.getConfiguration("ricwiz").get("importDataCommand","sfdx force:data:tree:import --plan data/plan.json");await G.window.showWarningMessage("Are you sure you want to import data into Salesforce? This action modifies records in your org.",{modal:!0},"Yes, Import")==="Yes, Import"&&await G.window.withProgress({location:G.ProgressLocation.Notification,title:"Ricwiz: Importing data...",cancellable:!1},async()=>{try{let{stdout:i,stderr:r}=await u(s,{cwd:e,maxBuffer:52428800}),c=G.window.createOutputChannel("Ricwiz Import Data");c.appendLine(`Executing: ${s}`),c.appendLine(i),r&&(c.appendLine("--- STDERR ---"),c.appendLine(r)),c.show(),G.window.showInformationMessage("Ricwiz: Successfully ran import data command!")}catch(i){let r=G.window.createOutputChannel("Ricwiz Import Data");r.appendLine(`Error executing: ${s}`),i.stdout&&r.appendLine(i.stdout),i.stderr&&r.appendLine(i.stderr),r.appendLine(i.message),r.show(),G.window.showErrorMessage("Ricwiz: Error running import data command. See output channel for details.")}})}var G,Et=C(()=>{"use strict";G=b(require("vscode"));$()});async function Mt(){let e=y();if(!e){_.window.showErrorMessage("Ricwiz: Open a folder or workspace that is a Git repository.");return}let t="";try{t=await T(e)}catch{}let a=_.workspace.getConfiguration("ricwiz").get("ticketSourceBranch","main"),i=await _.window.showInputBox({prompt:`Enter the branch name to list modified files (compared to ${a})`,value:t,placeHolder:"SFPSCA-1234"});i&&await _.window.withProgress({location:_.ProgressLocation.Notification,title:`Ricwiz: Finding files for ${i}...`,cancellable:!1},async()=>{try{let r=i.replace(/-to-[a-zA-Z0-9]+$/i,""),c=[];try{let f="";try{let{stdout:h}=await u(`git merge-base origin/${a} ${i}`,{cwd:e});f=h.trim()}catch{let{stdout:h}=await u(`git merge-base ${a} ${i}`,{cwd:e});f=h.trim()}if(f){let{stdout:h}=await u(`git diff --name-only ${f} ${i}`,{cwd:e,maxBuffer:10485760});c=h.split(`
`).map(w=>w.trim()).filter(w=>w.length>0)}}catch{}let g=[];try{let{stdout:f}=await u(`git --no-pager log --grep="\\b${r}\\b" -i -E --name-only -m --first-parent --format=""`,{cwd:e,maxBuffer:10485760});g=f.split(`
`).map(h=>h.trim()).filter(h=>h.length>0)}catch{}let m=[...c,...g];if(m.length===0){_.window.showInformationMessage(`Ricwiz: No modified files found for ${i}.`);return}let p=Array.from(new Set(m)).sort(),o={};for(let f of p){let h=f.match(/default\/([^/]+)/),w=h&&h[1]?h[1].toUpperCase():"OUTROS";o[w]||(o[w]=[]),o[w].push(f)}let n=`Files modified in branch ${i}:
`,d=Object.keys(o).sort();for(let f of d)n+=`
=== ${f} ===
`,n+=o[f].join(`
`)+`
`;let l=await _.workspace.openTextDocument({content:n,language:"plaintext"});await _.window.showTextDocument(l)}catch(r){_.window.showErrorMessage(`Ricwiz: Error running git log - ${r.message}`)}})}var _,Dt=C(()=>{"use strict";_=b(require("vscode"));$()});async function Tt(){let e=y();if(!e){K.window.showErrorMessage("Ricwiz: Open a folder or workspace that is a Git repository.");return}let s=K.workspace.getConfiguration("ricwiz").get("resetTrackingCommand","sf org disable tracking && sf project reset tracking --no-prompt");await K.window.withProgress({location:K.ProgressLocation.Notification,title:"Ricwiz: Resetting tracking...",cancellable:!1},async()=>{try{let{stdout:a,stderr:i}=await u(s,{cwd:e,maxBuffer:52428800}),r=K.window.createOutputChannel("Ricwiz Reset Tracking");r.appendLine(`Executing: ${s}`),r.appendLine(a),i&&(r.appendLine("--- STDERR ---"),r.appendLine(i)),r.show(),K.window.showInformationMessage("Ricwiz: Successfully reset tracking!")}catch(a){let i=K.window.createOutputChannel("Ricwiz Reset Tracking");i.appendLine(`Error executing: ${s}`),a.stdout&&i.appendLine(a.stdout),a.stderr&&i.appendLine(a.stderr),i.appendLine(a.message),i.show(),K.window.showErrorMessage("Ricwiz: Error resetting tracking. See output channel for details.")}})}var K,At=C(()=>{"use strict";K=b(require("vscode"));$()});async function Lt(){let e=y();if(!e){Y.window.showErrorMessage("Ricwiz: Open a workspace first.");return}let t=["ApexClass","ApexTrigger","CustomObject","CustomField","LightningComponentBundle","AuraDefinitionBundle","Flow","CustomLabel","CustomMetadata","StaticResource","Profile","PermissionSet","PermissionSetGroup","Layout","ValidationRule","RecordType","ListView","Report","EmailTemplate","Other (Type manually)..."],s=await Y.window.showQuickPick(t,{placeHolder:"Select Metadata Type to extract (e.g., ApexClass)",ignoreFocusOut:!0});if(!s||s==="Other (Type manually)..."&&(s=await Y.window.showInputBox({prompt:"Enter Metadata Type (e.g., CustomApplication, Queue)",ignoreFocusOut:!0}),!s))return;let a={ApexClass:"**/*.cls",ApexTrigger:"**/*.trigger",CustomObject:"**/*.{object,object-meta.xml}",CustomField:"**/*.field-meta.xml",LightningComponentBundle:"**/lwc/*/*.js",AuraDefinitionBundle:"**/aura/*/*.cmp",Flow:"**/*.flow-meta.xml",CustomLabel:"**/*.labels-meta.xml",CustomMetadata:"**/*.md-meta.xml",StaticResource:"**/*.resource-meta.xml",Profile:"**/*.profile-meta.xml",PermissionSet:"**/*.permissionset-meta.xml",PermissionSetGroup:"**/*.permissionsetgroup-meta.xml",Layout:"**/*.layout-meta.xml",ValidationRule:"**/*.validationRule-meta.xml",RecordType:"**/*.recordType-meta.xml",ListView:"**/*.listView-meta.xml"},i=[],r=a[s];if(r)try{i=(await Y.workspace.findFiles(r,"**/node_modules/**")).map(m=>{let p=m.fsPath.split(/[\\/]/).pop()||"";if(s==="LightningComponentBundle"||s==="AuraDefinitionBundle"){let o=m.fsPath.split(/[\\/]/);return o[o.length-2]||p.split(".")[0]}return p.split(".")[0]}),i=[...new Set(i)].sort()}catch{}let c=await new Promise(g=>{let m=Y.window.createQuickPick();m.title=`Extract ${s}`,m.placeholder="Type name (e.g. MyComponent) or * for all",m.ignoreFocusOut=!0,m.matchOnDescription=!0;let p=()=>{let o=m.value.trim(),n=[];o?n.push({label:`$(cloud-download) Extract "${o}"`,description:"Extract exact name from Salesforce",alwaysShow:!0}):n.push({label:'$(cloud-download) Extract "*" (All)',description:`Extract all ${s}s`,alwaysShow:!0}),i.forEach(d=>{(!o||d.toLowerCase().includes(o.toLowerCase()))&&n.push({label:d,description:"Local workspace component"})}),m.items=n};m.onDidChangeValue(()=>p()),m.onDidAccept(()=>{let o=m.selectedItems[0];if(o){let n=o.label;n.startsWith('$(cloud-download) Extract "')?n=n.replace('$(cloud-download) Extract "',"").replace('" (All)',"").replace('"',""):n==='$(cloud-download) Extract "*" (All)'&&(n="*"),m.hide(),g(n)}}),m.onDidHide(()=>{m.dispose(),g(void 0)}),p(),m.show()});c&&await Y.window.withProgress({location:Y.ProgressLocation.Notification,title:`Ricwiz: Extracting ${s}:${c} from Salesforce...`,cancellable:!0},async(g,m)=>{try{M.show(!0);let p=`${s}:${c}`,{stdout:o,stderr:n}=await u(`sf project retrieve start -m "${p}"`,{cwd:e});o&&M.appendLine(o),n&&M.appendLine(n),Y.window.showInformationMessage(`Ricwiz: Successfully extracted ${p}.`)}catch(p){M.appendLine(`ERROR: ${p.message}`),p.stdout&&M.appendLine(p.stdout),p.stderr&&M.appendLine(p.stderr),Y.window.showErrorMessage("Ricwiz: Extraction failed. See Output channel for details.")}})}var Y,It=C(()=>{"use strict";Y=b(require("vscode"));$()});async function Ot(){let e=j.window.activeTextEditor;if(!e){j.window.showErrorMessage("Ricwiz: Please open the file you want to deploy in the editor first.");return}let t=e.document.uri.fsPath,s=y();if(!s)return;let a="";if(await j.window.withProgress({location:j.ProgressLocation.Notification,title:"Ricwiz: Fetching available Salesforce orgs...",cancellable:!1},async()=>{try{let{stdout:m}=await u("sf org list --json",{cwd:s});a=m}catch(m){a=m.stdout||""}}),!a){j.window.showErrorMessage("Ricwiz: Failed to fetch orgs. Is Salesforce CLI installed?");return}let i=[];try{let m=JSON.parse(a),p=m.result?.nonScratchOrgs||[],o=m.result?.scratchOrgs||[];i=[...p,...o]}catch{j.window.showErrorMessage("Ricwiz: Failed to parse org list.");return}if(i.length===0){j.window.showInformationMessage("Ricwiz: No authenticated orgs found.");return}let r=i.map(m=>({label:m.alias||m.username,description:m.alias?m.username:"",picked:m.isDefaultUsername})),c=await j.window.showQuickPick(r,{placeHolder:"Select the org(s) to deploy this file to",canPickMany:!0,ignoreFocusOut:!0});if(!c||c.length===0)return;let g=Ft.basename(t);await j.window.withProgress({location:j.ProgressLocation.Notification,title:`Ricwiz: Deploying ${g} to ${c.length} org(s)...`,cancellable:!1},async()=>{M.show(!0),M.appendLine(`--- Starting Parallel Deploy of ${g} ---`);let m=c.map(async d=>{let l=d.label;M.appendLine(`[${l}] Deploying...`);try{let{stdout:f,stderr:h}=await u(`sf project deploy start -d "${t}" -o "${l}"`,{cwd:s});return M.appendLine(`[${l}] \u2705 Success`),f&&M.appendLine(f),{org:l,success:!0}}catch(f){return M.appendLine(`[${l}] \u274C Failed`),f.stdout&&M.appendLine(f.stdout),f.stderr&&M.appendLine(f.stderr),{org:l,success:!1}}}),p=await Promise.all(m),o=p.filter(d=>d.success).length,n=p.filter(d=>!d.success).length;n===0?j.window.showInformationMessage(`Ricwiz: Successfully deployed to all ${o} orgs!`):j.window.showErrorMessage(`Ricwiz: Deploy finished with errors (${o} success, ${n} failed). Check Output channel.`)})}var j,Ft,jt=C(()=>{"use strict";j=b(require("vscode")),Ft=b(require("path"));$()});async function Nt(){let e=y();if(!e){S.window.showErrorMessage("Ricwiz: Open a folder or workspace that is a Git repository.");return}let t=S.workspace.getConfiguration("ricwiz"),s=t.get("auditUsername",""),a=t.get("auditHours",8),i=await S.window.showInputBox({prompt:"Enter your Salesforce Username to query in SetupAuditTrail",value:s,placeHolder:"admin@tuaorg.com"});if(!i)return;let r=await S.window.showInputBox({prompt:"How many hours back do you want to search?",value:a.toString(),placeHolder:"8"});if(!r)return;let c=parseFloat(r);if(isNaN(c)||c<=0){S.window.showErrorMessage("Ricwiz: Invalid hours specified.");return}let g=new Date(Date.now()-c*60*60*1e3).toISOString(),p=`sf data query -q "${`SELECT Action, Display, Section FROM SetupAuditTrail WHERE CreatedBy.Username = '${i}' AND CreatedDate >= ${g}`}" --json`;await S.window.withProgress({location:S.ProgressLocation.Notification,title:"Ricwiz: Interrogating Setup Audit Trail...",cancellable:!1},async()=>{try{let{stdout:o}=await u(p,{cwd:e,maxBuffer:52428800}),n=JSON.parse(o);if(!n.result||n.result.records.length===0){S.window.showInformationMessage(`Ricwiz: No changes found for ${i} in the last ${c} hours.`);return}let d=n.result.records,l=[],f=new Set;for(let E of d){let H=po(E.Action,E.Display,E.Section);if(H){let ce=`${H.isDelete?"DEL":"ADD"}-${H.metadataFormat}`;if(!f.has(ce)){f.add(ce);let de=H.isDelete?"$(trash)":"$(plus)";l.push({label:`${de} ${H.metadataFormat}`,description:`${E.Action} -> ${E.Display}`,metadataFormat:H.metadataFormat,isDelete:H.isDelete})}}}if(l.length===0){S.window.showInformationMessage(`Ricwiz: No extractable metadata changes found for ${i} in the last ${c} hours (ignored passwords/logins).`);return}let h=await S.window.showQuickPick(l,{canPickMany:!0,placeHolder:"Select the changes you want to extract to GitLab",ignoreFocusOut:!0});if(!h||h.length===0){S.window.showInformationMessage("Ricwiz: No changes selected.");return}let w=h.filter(E=>E.isDelete),k=h.filter(E=>!E.isDelete),R=S.window.createOutputChannel("Ricwiz Admin Bridge");if(R.show(),w.length>0){let{stdout:E}=await u("git ls-files",{cwd:e}),H=E.split(`
`).map(de=>de.trim()),ce=0;for(let de of w){let D=de.metadataFormat.split(":"),he=D[0],we=D[1],ve=we;he==="CustomField"&&(ve=we.split(".")[1]);let so=H.filter(Ce=>{let ye=Te.basename(Ce);return ye.startsWith(ve+".")&&ye.includes(he==="CustomField"?".field":"")});for(let Ce of so){let ye=Te.join(e,Ce);De.existsSync(ye)&&(De.unlinkSync(ye),R.appendLine(`Deleted local file: ${Ce}`),ce++)}}S.window.showInformationMessage(`Ricwiz: Deleted ${ce} local files from Git workspace.`)}if(k.length===0)return;let z=k.map(E=>E.metadataFormat).filter(E=>E!=="").join(", "),N=await S.window.showInputBox({prompt:"Review and adjust the metadata components to retrieve",value:z,ignoreFocusOut:!0});if(!N)return;let U=`sf project retrieve start -m "${N}"`;R.appendLine(`Executing: ${U}`),S.window.showInformationMessage(`Ricwiz: Extracting ${k.length} components...`);let O=await u(U,{cwd:e});R.appendLine(O.stdout),O.stderr&&(R.appendLine("--- STDERR ---"),R.appendLine(O.stderr)),S.window.showInformationMessage("Ricwiz: Changes extracted successfully! Ready for Git Commit.")}catch(o){S.window.showErrorMessage(`Ricwiz: Error capturing changes - ${o.message}`)}})}function po(e,t,s){if(!e||!t||!s)return null;let a=e.toLowerCase(),i=s.toLowerCase();if(["security controls","network access","session settings","data export","login history","password policies","identity verification","delegated administration"].includes(i)||a.includes("login")||a.includes("password")||a.includes("oauth")||a.includes("session"))return null;let c=a.includes("delete"),g=null;if(a==="permissionsetgroupcomponentadd"||a==="permissionsetgroupcomponentdelete")return null;let m=(p,o=!1)=>{let n=p.replace(/\(.*\)/g,"").trim();n.includes(":")&&!a.includes("calculation")&&(n=n.split(":")[0]);let d=["disabled","deleted","removed","created","changed","updated","from","to","on","assigned","assign","assignment","permission","set","group","apex","class","trigger","custom","field","object","layout","validation","rule","flow","profile"],l=n.split(/\s+/);if(o){for(;l.length>0&&d.includes(l[l.length-1].toLowerCase());)l.pop();for(;l.length>0&&d.includes(l[0].toLowerCase());)l.shift();return l.join(" ").trim().replace(/[^a-zA-Z0-9_ ]/g,"")}else return l.filter(w=>!d.includes(w.toLowerCase())).join("_").replace(/[^a-zA-Z0-9_]/g,"")||n.replace(/\s+/g,"")};if(a.includes("profile"))g=`Profile:${m(t,!0)}`;else if(a.includes("permissionsetgroupcalculation")){let p=t.split(":");g=`PermissionSetGroup:${p.length>1?p[p.length-1].trim():m(t,!1)}`}else if(a.includes("permission set group")||a.includes("permissionsetgroup"))g=`PermissionSetGroup:${m(t,!1)}`;else if(a.includes("permission set")||a.includes("permissionset"))g=`PermissionSet:${m(t,!1)}`;else if(a.includes("apexclass"))g=`ApexClass:${m(t,!1)}`;else if(a.includes("apextrigger")||a.includes("apex trigger"))g=`ApexTrigger:${m(t,!1)}`;else if(a.includes("customfield")){let p=t.match(/([A-Za-z0-9_]+__c)/),o=t.match(/(?:on|na|for)\s+([A-Za-z0-9_]+)/i);p&&o?g=`CustomField:${o[1]}.${p[1]}`:g=`CustomField:${m(t,!1)}`}else if(a.includes("layout"))g=`Layout:${m(t,!0)}`;else if(a.includes("validation"))g=`ValidationRule:${m(t,!1)}`;else if(a.includes("flow"))g=`Flow:${m(t,!1)}`;else if(a.includes("customobject")){let p=t.match(/([A-Za-z0-9_]+__c)/);g=p?`CustomObject:${p[1]}`:`CustomObject:${m(t,!1)}`}else if(!a.includes("created")&&!a.includes("changed")&&!a.includes("deleted"))return null;return g?{metadataFormat:g,isDelete:c}:null}var S,De,Te,Ut=C(()=>{"use strict";S=b(require("vscode")),De=b(require("fs")),Te=b(require("path"));$()});async function Wt(){let e=y();if(e)try{let{stdout:t}=await u('git for-each-ref --sort=-committerdate --format="%(refname:short)|||%(committerdate:relative)|||%(subject)" refs/heads/',{cwd:e}),s=t.split(`
`).filter(i=>i.trim()).map(i=>{let r=i.split("|||");return{label:`$(git-branch) ${r[0]}`,description:r[1],detail:r[2],branchName:r[0]}}),a=await Ie.window.showQuickPick(s,{placeHolder:"Select a branch from history to checkout",matchOnDescription:!0,matchOnDetail:!0});a&&await fe(a.branchName)}catch{Ie.window.showErrorMessage("Ricwiz: Failed to get branch history")}}var Ie,qt=C(()=>{"use strict";Ie=b(require("vscode"));$();Ee()});async function Ht(){let e=y();if(!e)return;let t=await ke.window.showInputBox({prompt:"Enter ticket number or name (e.g., 48934)",placeHolder:"48934"});if(t)try{let{stdout:s}=await u(`git branch --list "*${t}*"`,{cwd:e}),a=s.split(`
`).map(c=>c.replace("*","").trim()).filter(c=>c);if(a.length===0){ke.window.showInformationMessage(`Ricwiz: No branches found matching "${t}"`);return}let i=a.map(c=>({label:`$(git-branch) ${c}`,branchName:c})),r=await ke.window.showQuickPick(i,{placeHolder:`Select a branch for ${t}`});r&&await fe(r.branchName)}catch{ke.window.showErrorMessage("Ricwiz: Failed to search branches")}}var ke,Vt=C(()=>{"use strict";ke=b(require("vscode"));$();Ee()});async function Gt(){let e=me.window.activeTextEditor;if(!e)return me.window.showErrorMessage("Ricwiz: Please open a file in the editor to check blame."),null;let t=e.document.fileName,s=Jt.basename(t),a=y();if(!a)return me.window.showErrorMessage("Ricwiz: Workspace is not a git repository."),null;let i=[];try{let{stdout:o}=await u(`git log -5 --pretty=format:"%an|%ar|%s|%h" -- "${t}"`,{cwd:a}),n=o.trim().split(`
`);for(let d of n){let l=d.split("|");l.length>=4&&i.push({author:l[0],time:l[1],message:l.slice(2,-1).join("|"),hash:l[l.length-1]})}}catch(o){console.error("Git blame error:",o)}let r="Unknown",c="Unknown",g="Unknown",m=[],p=go(t);if(p)try{await me.window.withProgress({location:me.ProgressLocation.Notification,title:`Ricwiz: Analyzing ${p.name} in Salesforce...`,cancellable:!1},async()=>{let o="";if(p.type==="CustomField"){let n=p.name.split(".");n.length===2&&(o=`SELECT LastModifiedBy.Name, LastModifiedDate, CreatedBy.Name FROM CustomField WHERE DeveloperName = '${n[1].replace("__c","")}' AND TableEnumOrId = '${n[0]}'`)}else p.type==="LightningComponentBundle"?o=`SELECT LastModifiedBy.Name, LastModifiedDate, CreatedBy.Name FROM LightningComponentBundle WHERE DeveloperName = '${p.name}'`:o=`SELECT LastModifiedBy.Name, LastModifiedDate, CreatedBy.Name FROM ${p.type} WHERE Name = '${p.name}'`;if(o)try{let{stdout:n}=await u(`sf data query -t -q "${o}" --json`,{cwd:a,maxBuffer:52428800}),d=JSON.parse(n);if(d&&d.result&&d.result.records&&d.result.records.length>0){let l=d.result.records[0];r=l.LastModifiedBy?l.LastModifiedBy.Name:"Unknown",g=l.CreatedBy?l.CreatedBy.Name:"Unknown",c=new Date(l.LastModifiedDate).toLocaleString()}else r="Not found in Org",c="N/A",g="N/A"}catch{r="Query Error",c="N/A",g="N/A"}try{let n="SELECT Action, Display, CreatedBy.Name, CreatedDate FROM SetupAuditTrail ORDER BY CreatedDate DESC LIMIT 1500",{stdout:d}=await u(`sf data query -q "${n}" --json`,{cwd:a,maxBuffer:52428800}),l=JSON.parse(d);if(l&&l.result&&l.result.records){let f=p.name.replace("__c","");m=l.result.records.filter(w=>w.Display&&w.Display.includes(f)).map(w=>({action:w.Action,display:w.Display,author:w.CreatedBy?w.CreatedBy.Name:"Unknown",time:new Date(w.CreatedDate).toLocaleString()})).slice(0,10)}}catch(n){console.error("Audit trail query error:",n)}})}catch(o){console.error("Salesforce query error:",o)}else r="Unsupported Metadata Type",c="N/A";return{fileName:s,gitHistory:i,sfAuthor:r,sfTime:c,sfCreatedBy:g,auditHistory:m}}function go(e){let t=e.replace(/\\/g,"/");if(t.includes("/classes/")){let s=t.match(/\/classes\/([^/.]+)\.cls/);if(s)return{type:"ApexClass",name:s[1]}}if(t.includes("/triggers/")){let s=t.match(/\/triggers\/([^/.]+)\.trigger/);if(s)return{type:"ApexTrigger",name:s[1]}}if(t.includes("/lwc/")){let s=t.match(/\/lwc\/([^/]+)\//);if(s)return{type:"LightningComponentBundle",name:s[1]}}if(t.includes("/aura/")){let s=t.match(/\/aura\/([^/]+)\//);if(s)return{type:"AuraDefinitionBundle",name:s[1]}}if(t.includes("/objects/")&&t.includes("/fields/")){let s=t.match(/\/objects\/([^/]+)\//),a=t.match(/\/fields\/([^/.]+)\.field/);if(s&&a)return{type:"CustomField",name:`${s[1]}.${a[1]}`}}return null}var me,Jt,_t=C(()=>{"use strict";me=b(require("vscode")),Jt=b(require("path"));$()});async function Yt(){let e=y();if(!e){q.window.showErrorMessage("Ricwiz: Open a workspace that is a Git repository.");return}let s=q.workspace.getConfiguration("ricwiz").get("ticketSourceBranch","main");await q.window.withProgress({location:q.ProgressLocation.Notification,title:`Ricwiz: Finding deleted files compared to origin/${s}...`,cancellable:!1},async()=>{try{let{stdout:a}=await u(`git diff --name-only --diff-filter=D origin/${s}...HEAD`,{cwd:e}),i=a.split(`
`).map(d=>d.trim()).filter(d=>d.length>0);if(i.length===0){q.window.showInformationMessage(`Ricwiz: No deleted files found compared to origin/${s}.`);return}let r={},c=(d,l)=>{r[d]||(r[d]=[]),r[d].includes(l)||r[d].push(l)};for(let d of i){let l=d.replace(/\\/g,"/");if(l.includes("/classes/")){let f=l.match(/\/classes\/([^/.]+)\.cls/);f&&c("ApexClass",f[1])}else if(l.includes("/triggers/")){let f=l.match(/\/triggers\/([^/.]+)\.trigger/);f&&c("ApexTrigger",f[1])}else if(l.includes("/lwc/")){let f=l.match(/\/lwc\/([^/]+)\//);f&&c("LightningComponentBundle",f[1])}else if(l.includes("/aura/")){let f=l.match(/\/aura\/([^/]+)\//);f&&c("AuraDefinitionBundle",f[1])}else if(l.includes("/objects/")&&l.includes("/fields/")){let f=l.match(/\/objects\/([^/]+)\//),h=l.match(/\/fields\/([^/.]+)\.field/);f&&h&&c("CustomField",`${f[1]}.${h[1]}`)}else if(l.includes("/objects/")){let f=l.match(/\/objects\/([^/.]+)\.object/);f&&c("CustomObject",f[1])}else if(l.includes("/layouts/")){let f=l.match(/\/layouts\/([^/.]+)\.layout/);f&&c("Layout",f[1])}else if(l.includes("/flows/")){let f=l.match(/\/flows\/([^/.]+)\.flow/);f&&c("Flow",f[1])}else if(l.includes("/permissionsets/")){let f=l.match(/\/permissionsets\/([^/.]+)\.permissionset/);f&&c("PermissionSet",f[1])}else if(l.includes("/profiles/")){let f=l.match(/\/profiles\/([^/.]+)\.profile/);f&&c("Profile",f[1])}else if(l.includes("/customMetadata/")){let f=l.match(/\/customMetadata\/([^/.]+)\.md/);f&&c("CustomMetadata",f[1])}else if(l.includes("/flexipages/")){let f=l.match(/\/flexipages\/([^/.]+)\.flexipage/);f&&c("FlexiPage",f[1])}}if(Object.keys(r).length===0){q.window.showInformationMessage("Ricwiz: Found deleted files in Git, but none mapped to recognizable Salesforce metadata.");return}let g=`<?xml version="1.0" encoding="UTF-8"?>
<Package xmlns="http://soap.sforce.com/2006/04/metadata">
`;for(let d of Object.keys(r).sort()){g+=`    <types>
`;for(let l of r[d].sort())g+=`        <members>${l}</members>
`;g+=`        <name>${d}</name>
    </types>
`}g+=`    <version>58.0</version>
</Package>`;let m=Ae.join(e,"destructiveChanges");ae.existsSync(m)||ae.mkdirSync(m);let p=Ae.join(m,"destructiveChanges.xml"),o=Ae.join(m,"package.xml");ae.writeFileSync(p,g,"utf8"),ae.existsSync(o)||ae.writeFileSync(o,`<?xml version="1.0" encoding="UTF-8"?>
<Package xmlns="http://soap.sforce.com/2006/04/metadata">
    <version>58.0</version>
</Package>`,"utf8");let n=await q.workspace.openTextDocument(p);await q.window.showTextDocument(n),q.window.showInformationMessage("Ricwiz: destructiveChanges.xml generated successfully!")}catch(a){q.window.showErrorMessage(`Ricwiz: Error generating destructive changes: ${a.message}`)}})}var q,Ae,ae,Qt=C(()=>{"use strict";q=b(require("vscode")),Ae=b(require("path")),ae=b(require("fs"));$()});async function Zt(){let e=y();if(!e)return;let s=te.workspace.getConfiguration("ricwiz").get("ticketSourceBranch","main");await te.window.withProgress({location:te.ProgressLocation.Notification,title:"Ricwiz: Finding Apex Tests to run...",cancellable:!1},async()=>{try{let{stdout:a}=await u(`git diff --name-status origin/${s}...HEAD`,{cwd:e}),i=a.split(`
`).map(d=>d.trim()).filter(d=>d.length>0),r=new Set,c=new Set;for(let d of i){let l=d.split(/\s+/);if(l[0].startsWith("D"))continue;let f=l[1];if(f&&f.endsWith(".cls")){let h=f.match(/\/classes\/([^/.]+)\.cls/);if(h){let w=h[1];w.toLowerCase().endsWith("test")?r.add(w):c.add(w)}}}for(let d of c)r.add(`${d}Test`);if(r.size===0){te.window.showInformationMessage("Ricwiz: No Apex Classes were modified in this branch.");return}let g=Array.from(r).map(d=>({label:`$(beaker) ${d}`,description:"Apex Test Class"})),m=await te.window.showQuickPick(g,{canPickMany:!0,title:"Select Test Classes to Run",placeHolder:"Select tests..."});if(!m||m.length===0)return;let o=`sf apex run test -n ${m.map(d=>d.label.replace("$(beaker) ","").trim()).join(",")} -r human -w 30`,n=te.window.createTerminal("Ricwiz: Smart Tests");n.show(),n.sendText(o)}catch(a){te.window.showErrorMessage(`Ricwiz: Error finding tests: ${a.message}`)}})}var te,Xt=C(()=>{"use strict";te=b(require("vscode"));$()});async function to(e){let t=eo.workspace.getConfiguration("ricwiz"),s=t.get("jiraUrl",""),a=t.get("jiraEmail","")?.trim(),i=t.get("jiraApiToken","")?.trim();if(!s||!i)throw new Error("Jira API Token is not configured in Ricwiz Settings.");let r=s;r.includes("/browse")&&(r=r.split("/browse")[0]),r.endsWith("/")&&(r=r.slice(0,-1));let c=a?`Basic ${Buffer.from(`${a}:${i}`).toString("base64")}`:`Bearer ${i}`,g=new URL(`${r}/rest/api/2/issue/${e}`);return new Promise((m,p)=>{let o=Kt.request(g,{method:"GET",headers:{Authorization:c,Accept:"application/json"}},n=>{if(n.statusCode===401||n.statusCode===403)return p(new Error(`Authentication failed (HTTP ${n.statusCode}). Please check your Jira Email and API Token in settings.`));if(n.statusCode===404)return p(new Error(`Ticket ${e} not found in Jira.`));if(n.statusCode&&n.statusCode>=400)return p(new Error(`Jira API returned HTTP status ${n.statusCode}`));let d="";n.on("data",l=>d+=l),n.on("end",()=>{try{let l=JSON.parse(d);l&&l.fields?m({summary:l.fields.summary||"",description:l.fields.description||"No description provided."}):m(null)}catch{p(new Error("Failed to parse Jira response."))}})});o.on("error",n=>p(new Error(`Network error connecting to Jira: ${n.message}`))),o.end()})}var Kt,eo,oo=C(()=>{"use strict";Kt=b(require("https")),eo=b(require("vscode"))});async function io(e){let t=y();if(t)try{if(!await A.initialize(t))return;let i=(await T(t)).split("-to-")[0];if(!i){ue.window.showErrorMessage("Ricwiz: You are not currently on a valid ticket branch.");return}await ue.window.withProgress({location:ue.ProgressLocation.Notification,title:`Fetching details for ${i}...`,cancellable:!1},async r=>{let c=await to(i);c?(e.setJiraData({ticketId:i,...c}),e.setPage("jira")):ue.window.showErrorMessage("Ricwiz: No data found for this ticket.")})}catch(s){ue.window.showErrorMessage(`Ricwiz Jira Error: ${s.message}`)}}var ue,no=C(()=>{"use strict";ue=b(require("vscode"));$();se();oo()});var Be={};Fe(Be,{activate:()=>fo,deactivate:()=>ho,webviewProvider:()=>F});module.exports=pe(Be);function fo(e){F=new Re(e.extensionUri),e.subscriptions.push(v.window.registerWebviewViewProvider("ricwiz-webview",F));let t=v.window.createStatusBarItem(v.StatusBarAlignment.Left,100);t.command="ricwiz.openJiraTicket",e.subscriptions.push(t);let s,a=v.workspace.getConfiguration("ricwiz").get("autoRefresh",!0);F.setAutoRefresh(a),e.subscriptions.push(v.workspace.onDidChangeConfiguration(r=>{if(r.affectsConfiguration("ricwiz.autoRefresh")){let c=v.workspace.getConfiguration("ricwiz").get("autoRefresh",!0);F?.setAutoRefresh(c)}}));async function i(){let r=v.extensions.getExtension("vscode.git");if(r){let m=function(p){let o="",n;async function d(){let f=v.workspace.workspaceFolders;if(!f)return;let h=f[0].uri.fsPath,w=await T(h);if(w&&w!==o){o=w;let k=v.workspace.getConfiguration("ricwiz"),R=k.get("ticketPrefix","SFPSCA-");if(!w.includes(R)){let D=w.match(/([A-Z]+-)\d+/i);D&&(R=D[1].toUpperCase())}let z=[],N=[],U=[],O=[],E=k.get("environments",[{name:"Qual",sourceBranch:"quality"},{name:"Val",sourceBranch:"validation"},{name:"Prod",sourceBranch:"main"}]);try{let D=k.get("workspaceCheckoutButtons",["main","quality","validation"]);U=Array.from(new Set(D))}catch{}let H=w.match(new RegExp(`(${R}\\d+(?:-\\d+)?)`,"i"));if(H){let D=H[1].toUpperCase(),he=k.get("commitMessageSuffix","- "),we=/^[A-Z]+-\d+(?:-\d+)?\s*(?:-\s*|:\s*|\s+)?/i;we.test(p.inputBox.value)?p.inputBox.value.toUpperCase().startsWith(D)||(p.inputBox.value=p.inputBox.value.replace(we,`${D}${he}`)):p.inputBox.value=`${D}${he}`+p.inputBox.value,t.text=`$(bookmark) ${D}`,t.tooltip=`Branch: ${w}
Click to open Jira ticket`,t.show();try{let ve=await Ze(h,D,w);z=await Ge(h,ve,D,E)}catch{}}else{t.hide();try{O=await Qe(h)}catch{}}let[ce,de]=await Promise.all([Ye(h,10),_e(h,w,E)]);N=ce,F?.updateBranch(w,de,z,N,U,O)}}function l(){F?.isAutoRefreshEnabled()&&(n&&clearTimeout(n),n=setTimeout(()=>{o="",d()},300))}s=()=>{o="",d()},d(),p.state.onDidChange(()=>l()),v.window.onDidChangeWindowState(f=>{f.focused&&l()})};var c=m;r.isActive||await r.activate();let g=r.exports.getAPI(1);g.repositories.length>0&&g.repositories.forEach(p=>m(p)),g.onDidOpenRepository(p=>m(p))}}i(),e.subscriptions.push(v.commands.registerCommand("ricwiz.generateDestructiveChanges",Yt),v.commands.registerCommand("ricwiz.runSmartTests",Zt),v.commands.registerCommand("ricwiz.refreshWebview",()=>{F&&v.commands.executeCommand("workbench.action.webview.reloadWebviewAction")}),v.commands.registerCommand("ricwiz.createBranches",ot),v.commands.registerCommand("ricwiz.prepareDeploy",rt),v.commands.registerCommand("ricwiz.createMergeRequests",dt),v.commands.registerCommand("ricwiz.createMergeRequestsVSCode",lt),v.commands.registerCommand("ricwiz.openJiraTicket",pt),v.commands.registerCommand("ricwiz.openJiraTicketVSCode",gt),v.commands.registerCommand("ricwiz.showJiraDetails",()=>{F&&io(F)}),v.commands.registerCommand("ricwiz.syncAll",ht),v.commands.registerCommand("ricwiz.updateBases",vt),v.commands.registerCommand("ricwiz.deleteUnusedBranches",bt),v.commands.registerCommand("ricwiz.checkoutBranch",fe),v.commands.registerCommand("ricwiz.copyBranchName",kt),v.commands.registerCommand("ricwiz.generatePackageXml",Rt),v.commands.registerCommand("ricwiz.deployPackage",Bt),v.commands.registerCommand("ricwiz.importData",St),v.commands.registerCommand("ricwiz.listTicketFiles",Mt),v.commands.registerCommand("ricwiz.resetTracking",Tt),v.commands.registerCommand("ricwiz.extractComponent",Lt),v.commands.registerCommand("ricwiz.deployMultiOrg",Ot),v.commands.registerCommand("ricwiz.captureAdminChanges",Nt),v.commands.registerCommand("ricwiz.openHistory",Wt),v.commands.registerCommand("ricwiz.searchTicket",Ht),v.commands.registerCommand("ricwiz.whoToBlame",async()=>{let r=await Gt();r&&F&&(F.setBlameData(r),F.setPage("blame"))}),v.commands.registerCommand("ricwiz.manualRefresh",()=>{s&&s()}),v.commands.registerCommand("ricwiz.toggleAutoRefresh",()=>{if(F){let r=!F.isAutoRefreshEnabled();F.setAutoRefresh(r),v.workspace.getConfiguration("ricwiz").update("autoRefresh",r,v.ConfigurationTarget.Global)}}),v.commands.registerCommand("ricwiz.openSettings",()=>{v.commands.executeCommand("workbench.action.openSettings","ricwiz")}))}function ho(){}var v,F,Pe=C(()=>{v=b(require("vscode"));$();Xe();Ke();it();at();mt();ft();wt();yt();xt();Ee();Ct();zt();Pt();Et();Dt();At();It();jt();Ut();qt();Vt();_t();Qt();Xt();no()});Pe();0&&(module.exports={activate,deactivate,webviewProvider});
