"use strict";var Kt=Object.create;var Ce=Object.defineProperty;var eo=Object.getOwnPropertyDescriptor;var to=Object.getOwnPropertyNames;var oo=Object.getPrototypeOf,io=Object.prototype.hasOwnProperty;var k=(e,t,o)=>()=>{if(o)throw o[0];try{return e&&(t=e(e=0)),t}catch(s){throw o=[s],s}};var Le=(e,t)=>{for(var o in t)Ce(e,o,{get:t[o],enumerable:!0})},Ie=(e,t,o,s)=>{if(t&&typeof t=="object"||typeof t=="function")for(let i of to(t))!io.call(e,i)&&i!==o&&Ce(e,i,{get:()=>t[i],enumerable:!(s=eo(t,i))||s.enumerable});return e};var b=(e,t,o)=>(o=e!=null?Kt(oo(e)):{},Ie(t||!e||!e.__esModule?Ce(o,"default",{value:e,enumerable:!0}):o,e)),ue=e=>Ie(Ce({},"__esModule",{value:!0}),e);var Ae={};Le(Ae,{checkBranchExists:()=>te,exec:()=>p,extractTicketSuggestion:()=>je,getCurrentBranch:()=>A,getWorkspaceCwd:()=>y,normalizeTicketId:()=>We,promptForTicketId:()=>I,resolvePrefix:()=>Ne,ricwizLogger:()=>M});function y(){let e=pe.workspace.workspaceFolders;if(e)return e[0].uri.fsPath}async function A(e){try{let{stdout:t}=await p("git branch --show-current",{cwd:e});return t.trim()}catch{return""}}function Ne(e,t){if(!e.includes(t)){let o=e.match(/([A-Z]+-)\d+/i);if(o)return o[1].toUpperCase()}return t}function je(e,t,o=!1){let s=e.match(new RegExp(`(${t}\\d+)`,"i"));return s?s[1].toUpperCase():e.includes(t)&&!e.includes("-to-")?e.substring(e.indexOf(t)):o&&e.includes("-to-")?e.substring(e.indexOf(t)).split("-to-")[0]:""}function We(e,t){let o=e.trim();return/^\d/.test(o)?`${t}${o}`.toUpperCase():o.toUpperCase()}async function I(e,t){let o=pe.workspace.getConfiguration("ricwiz"),s=t?.prefix??o.get("ticketPrefix","SFPSCA-"),i=await A(e),c=Ne(i,s),d=je(i,c,t?.handleToSuffix),g=await pe.window.showInputBox({prompt:t?.prompt||"Enter the full ticket ID (e.g., SCPSCA-1234) or just the number",placeHolder:t?.placeHolder||"Ticket ID or number",value:d});return g?{ticketId:We(g,c),currentBranch:i,prefix:c}:void 0}async function te(e,t){try{return await p(`git show-ref --verify --quiet refs/heads/${t}`,{cwd:e}),!0}catch{}try{return await p(`git show-ref --verify --quiet refs/remotes/origin/${t}`,{cwd:e}),!0}catch{}return!1}var pe,Oe,Ue,no,M,p,C=k(()=>{"use strict";pe=b(require("vscode")),Oe=b(require("child_process")),Ue=b(require("util")),no=Ue.promisify(Oe.exec),M=pe.window.createOutputChannel("Ricwiz"),p=async(e,t)=>{M.appendLine(`[EXEC] ${e}`);let o=await no(e,{maxBuffer:50*1024*1024,...t});return{stdout:o.stdout.toString(),stderr:o.stderr.toString()}}});function qe(){let e=new Map;function t(s,i){let c=i,d=e.get(c);if(d)return d;let g=(async()=>{try{let{stdout:u}=await p(`git rev-parse origin/${i}`,{cwd:s});return u.trim()}catch{let{stdout:u}=await p(`git rev-parse ${i}`,{cwd:s});return u.trim()}})();return e.set(c,g),g}function o(s,i){let c=`branch:${i}`,d=e.get(c);if(d)return d;let g=(async()=>{let{stdout:u}=await p(`git rev-parse ${i}`,{cwd:s});return u.trim()})();return e.set(c,g),g}return{resolveEnvRef:t,resolveBranchRef:o}}async function He(e,t,o,s,i){try{if(!(await p(`git --no-pager log ${t} --grep="\\\\b${o}\\\\b" -i -E -1 --format="%h"`,{cwd:e}).catch(()=>({stdout:"",stderr:""}))).stdout.trim())return!1;let[d,g]=await Promise.all([i.resolveBranchRef(e,t),i.resolveEnvRef(e,s.sourceBranch)]);if(d===g)return!1;try{return await p(`git merge-base --is-ancestor ${t} origin/${s.sourceBranch}`,{cwd:e}),!0}catch{try{return await p(`git merge-base --is-ancestor ${t} ${s.sourceBranch}`,{cwd:e}),!0}catch{return!1}}}catch{return!1}}function Ve(e,t){return t.find(o=>e.endsWith(`-to-${o.name}`))}async function Ge(e,t,o,s){let i=qe();return await Promise.all(t.map(async d=>{let g=Ve(d,s);if(!g)return{name:d,isMerged:!1};let u=await He(e,d,o,g,i);return{name:d,isMerged:u}}))}async function _e(e,t,o){let s=Ve(t,o);if(!s)return!1;let i=t.replace(new RegExp(`-to-${s.name}$`,"i"),""),c=qe();return He(e,t,i,s,c)}async function Je(e,t=10){try{let{stdout:o}=await p(`git log --oneline -${t} --format="%h|||%s|||%ar"`,{cwd:e});return o.split(`
`).filter(s=>s.trim()).map(s=>{let i=s.split("|||");return{hash:i[0]||"",message:i.length>=3?i.slice(1,-1).join("|||"):i[1]||"",timeAgo:i.length>=3?i[i.length-1]:""}})}catch{return[]}}async function Qe(e,t=3){try{let{stdout:o}=await p('git for-each-ref --sort=-committerdate --format="%(refname:short)" refs/heads/',{cwd:e}),s=o.split(`
`).map(c=>c.trim()).filter(c=>c),i=/^[A-Z]+-\d+$/i;return s.filter(c=>i.test(c)).slice(0,t)}catch{return[]}}async function Ye(e,t,o){let{stdout:s}=await p(`git branch --list "*${t}*"`,{cwd:e});return s.split(`
`).map(i=>i.replace("*","").trim()).filter(i=>i&&i!==o)}var Ze=k(()=>{"use strict";C()});function S(e){return e.replace(/&/g,"&amp;").replace(/</g,"&lt;").replace(/>/g,"&gt;").replace(/"/g,"&quot;").replace(/'/g,"&#39;")}var x,$e,Xe=k(()=>{"use strict";x=b(require("vscode"));$e=class{constructor(t){this._extensionUri=t}_extensionUri;webviewView;resolveWebviewView(t,o,s){this.webviewView=t,t.webview.options={enableScripts:!0,localResourceRoots:[this._extensionUri]},this.updateBranch("",!1),t.webview.onDidReceiveMessage(i=>{switch(i.command){case"createBranches":x.commands.executeCommand("ricwiz.createBranches");break;case"prepareDeploy":x.commands.executeCommand("ricwiz.prepareDeploy");break;case"openMRs":x.commands.executeCommand("ricwiz.createMergeRequests");break;case"openMRsVSCode":x.commands.executeCommand("ricwiz.createMergeRequestsVSCode");break;case"openJira":x.commands.executeCommand("ricwiz.openJiraTicket");break;case"openJiraVSCode":x.commands.executeCommand("ricwiz.openJiraTicketVSCode");break;case"openSettings":x.commands.executeCommand("ricwiz.openSettings");break;case"checkout":i.branch&&x.commands.executeCommand("ricwiz.checkoutBranch",i.branch);break;case"copyBranch":x.commands.executeCommand("ricwiz.copyBranchName");break;case"generatePackageXml":x.commands.executeCommand("ricwiz.generatePackageXml");break;case"openDevTools":this.setPage("devtools");break;case"openMain":this.setPage("main");break;case"generateDestructiveChanges":x.commands.executeCommand("ricwiz.generateDestructiveChanges");break;case"deployPackage":x.commands.executeCommand("ricwiz.deployPackage");break;case"runSmartTests":x.commands.executeCommand("ricwiz.runSmartTests");break;case"importData":x.commands.executeCommand("ricwiz.importData");break;case"listTicketFiles":x.commands.executeCommand("ricwiz.listTicketFiles");break;case"resetTracking":x.commands.executeCommand("ricwiz.resetTracking");break;case"extractComponent":x.commands.executeCommand("ricwiz.extractComponent");break;case"deployMultiOrg":x.commands.executeCommand("ricwiz.deployMultiOrg");break;case"captureAdminChanges":x.commands.executeCommand("ricwiz.captureAdminChanges");break;case"whoToBlame":x.commands.executeCommand("ricwiz.whoToBlame");break;case"syncAll":x.commands.executeCommand("ricwiz.syncAll");break;case"updateBases":x.commands.executeCommand("ricwiz.updateBases");break;case"deleteUnused":x.commands.executeCommand("ricwiz.deleteUnusedBranches");break;case"conflict_commitAndContinue":x.commands.executeCommand("ricwiz.conflictAction","commitAndContinue");break;case"conflict_resolveDeletions":x.commands.executeCommand("ricwiz.conflictAction","resolveDeletions");break;case"conflict_abortDeploy":x.commands.executeCommand("ricwiz.conflictAction","abortDeploy");break;case"openFile":if(i.file){let c=x.workspace.workspaceFolders;if(c){let d=x.Uri.joinPath(c[0].uri,i.file);x.commands.executeCommand("vscode.open",d)}}break;case"searchTicket":x.commands.executeCommand("ricwiz.searchTicket");break;case"manualRefresh":x.commands.executeCommand("ricwiz.manualRefresh");break;case"toggleAutoRefresh":x.commands.executeCommand("ricwiz.toggleAutoRefresh");break;case"openHistory":x.commands.executeCommand("ricwiz.openHistory");break}})}conflictState=null;setConflictState(t){this.conflictState=t,this.updateView()}updateBranch(t,o,s=[],i=[],c=[],d=[]){this.webviewView&&(this.currentBranchCache=t,this.currentBranchIsMergedCache=o,this.relatedBranchesCache=s,this.commitsCache=i,this.baseBranchesCache=c,this.recentTicketsCache=d,this.updateView())}currentBranchCache="";currentBranchIsMergedCache=!1;relatedBranchesCache=[];commitsCache=[];baseBranchesCache=[];recentTicketsCache=[];currentPage="main";blameDataCache=null;autoRefreshEnabled=!0;setBlameData(t){this.blameDataCache=t}setAutoRefresh(t){this.autoRefreshEnabled=t,this.updateView()}isAutoRefreshEnabled(){return this.autoRefreshEnabled}setPage(t){this.currentPage=t,this.updateView()}updateView(){if(!this.webviewView)return;let t=this.webviewView.webview.asWebviewUri(x.Uri.joinPath(this._extensionUri,"resources","logo.png"));this.webviewView.webview.html=this._getHtmlForWebview(t,this.currentBranchCache,this.relatedBranchesCache,this.commitsCache,this.baseBranchesCache,this.recentTicketsCache,this.currentPage)}_getHtmlForWebview(t,o,s,i,c,d,g){let u=i.length>0?`
            <div class="separator"></div>
            <div style="padding: 0 4px;">
                <div style="font-size: 11px; opacity: 0.7; margin-bottom: 6px; display: flex; align-items: center; gap: 4px;">
                    <span>\u{1F4DC}</span> Recent Commits
                </div>
                <div style="display: flex; flex-direction: column; gap: 2px;">
                    ${i.map(n=>`
                        <div style="font-size: 11px; padding: 3px 4px; border-radius: 2px; display: flex; gap: 6px; align-items: baseline;">
                            <code style="color: var(--vscode-textLink-foreground); font-size: 10px; flex-shrink: 0;">${S(n.hash)}</code>
                            <span style="flex: 1; overflow: hidden; text-overflow: ellipsis; white-space: nowrap;" title="${S(n.message)}">${S(n.message)}</span>
                            <span style="font-size: 9px; opacity: 0.5; flex-shrink: 0;">${S(n.timeAgo)}</span>
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
        `;if(this.conflictState){let n=(this.conflictState.files||[]).map(l=>`
                <button class="btn" style="padding: 6px; font-size: 12px; display: flex; justify-content: space-between; align-items: center;" onclick="sendOpenFileCommand('${S(l.file)}')">
                    <span style="flex: 1; overflow: hidden; text-overflow: ellipsis; white-space: nowrap; direction: rtl; text-align: left;">&lrm;${S(l.file)}</span>
                    <span style="font-size: 10px; opacity: 0.8; flex-shrink: 0; background-color: var(--vscode-badge-background); color: var(--vscode-badge-foreground); padding: 2px 4px; border-radius: 2px;">${S(l.state)}</span>
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
                
                ${n?`
                    <div style="font-size: 11px; opacity: 0.7; margin: 8px 4px 4px 4px; text-transform: uppercase;">Conflicted Files</div>
                    <div style="display: flex; flex-direction: column; gap: 2px;">
                        ${n}
                    </div>
                `:""}

                <script>
                    const vscode = acquireVsCodeApi();
                    function sendCommand(cmd) { vscode.postMessage({ command: cmd }); }
                    function sendOpenFileCommand(file) { vscode.postMessage({ command: 'openFile', file: file }); }
                </script>
            </body>
            </html>`}if(g==="blame"){let n=this.blameDataCache;return`<!DOCTYPE html>
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

                ${n?`
                <div style="padding: 12px; background: var(--vscode-editor-background); border: 1px solid var(--vscode-widget-border); border-radius: 6px; margin-bottom: 12px;">
                    <div style="font-weight: bold; margin-bottom: 12px; font-size: 14px; text-align: center; color: var(--vscode-textLink-foreground); word-break: break-all;">
                        \u{1F4C4} ${n.fileName}
                    </div>


                    <div style="margin-bottom: 20px;">
                        <div style="font-size: 11px; font-weight: bold; opacity: 0.8; text-transform: uppercase; margin-bottom: 8px;"><span class="icon">\u{1F4BB}</span> Local Git (Last Commits)</div>
                        <ul style="list-style-type: none; padding: 0; margin: 0; display: flex; flex-direction: column; gap: 8px;">
                            ${n.gitHistory&&n.gitHistory.length>0?n.gitHistory.map(l=>`
                                <li style="background: var(--vscode-editorWidget-background); border: 1px solid var(--vscode-widget-border); padding: 8px 10px; border-radius: 4px; border-left: 4px solid var(--vscode-gitDecoration-modifiedResourceForeground);">
                                    <div style="display: flex; justify-content: space-between; margin-bottom: 4px; align-items: center;">
                                        <strong style="font-size: 13px;">${l.author}</strong>
                                        <span style="opacity: 0.7; font-size: 11px;">${l.time}</span>
                                    </div>
                                    <div style="font-size: 12px; margin-bottom: 6px; opacity: 0.9; font-style: italic;">"${l.message}"</div>
                                    <div style="font-family: monospace; font-size: 10px; opacity: 0.6;">Commit: ${l.hash}</div>
                                </li>
                            `).join(""):'<li style="opacity:0.7; font-size: 12px;">No Git history found.</li>'}
                        </ul>
                    </div>

                    <div style="margin-bottom: 20px;">
                        <div style="font-size: 11px; font-weight: bold; opacity: 0.8; text-transform: uppercase; margin-bottom: 8px;"><span class="icon">\u2601\uFE0F</span> Salesforce Metadata</div>
                        <div style="display: flex; flex-direction: column; gap: 8px;">
                            <div style="background: var(--vscode-editorWidget-background); border: 1px solid var(--vscode-widget-border); padding: 8px 10px; border-radius: 4px; border-left: 4px solid var(--vscode-gitDecoration-addedResourceForeground);">
                                <div style="font-size: 10px; opacity: 0.7; text-transform: uppercase; margin-bottom: 2px;">Last Modified By</div>
                                <div style="font-weight: bold; font-size: 13px;">${n.sfAuthor}</div>
                                <div style="font-size: 11px; opacity: 0.7; margin-top: 2px;">${n.sfTime}</div>
                            </div>
                            ${n.sfCreatedBy!=="Unknown"&&n.sfCreatedBy!=="N/A"?`
                            <div style="background: var(--vscode-editorWidget-background); border: 1px solid var(--vscode-widget-border); padding: 8px 10px; border-radius: 4px; border-left: 4px solid var(--vscode-gitDecoration-addedResourceForeground);">
                                <div style="font-size: 10px; opacity: 0.7; text-transform: uppercase; margin-bottom: 2px;">Created By</div>
                                <div style="font-weight: bold; font-size: 13px;">${n.sfCreatedBy}</div>
                            </div>
                            `:""}
                        </div>
                    </div>

                    <div>
                        <div style="font-size: 11px; font-weight: bold; opacity: 0.8; text-transform: uppercase; margin-bottom: 8px;"><span class="icon">\u{1F575}\uFE0F</span> Setup Audit Trail (Recent)</div>
                        <ul style="list-style-type: none; padding: 0; margin: 0; display: flex; flex-direction: column; gap: 8px;">
                            ${n.auditHistory&&n.auditHistory.length>0?n.auditHistory.map(l=>`
                                <li style="background: var(--vscode-editorWidget-background); border: 1px solid var(--vscode-widget-border); padding: 8px 10px; border-radius: 4px; border-left: 4px solid var(--vscode-gitDecoration-untrackedResourceForeground);">
                                    <div style="display: flex; justify-content: space-between; margin-bottom: 4px; align-items: center;">
                                        <strong style="font-size: 13px;">${l.author}</strong>
                                        <span style="opacity: 0.7; font-size: 11px;">${l.time}</span>
                                    </div>
                                    <div style="font-size: 12px; font-weight: 500; margin-bottom: 4px;">${l.action}</div>
                                    <div style="font-size: 11px; opacity: 0.7; font-style: italic; background: var(--vscode-editor-background); padding: 4px; border-radius: 3px;">${l.display}</div>
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
            </html>`}return g==="devtools"?`<!DOCTYPE html>
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
                    ${s.length>0?`
                        <div style="margin-top: 8px; border-top: 1px solid var(--vscode-panel-border); padding-top: 8px;">
                            <div style="font-size: 10px; opacity: 0.7; margin-bottom: 4px;">Sister Branches</div>
                            <div style="display: flex; flex-direction: column; gap: 4px;">
                                ${s.map(n=>`
                                    <div class="btn" style="padding: 4px; font-size: 11px; justify-content: center; background-color: var(--vscode-button-secondaryBackground); color: var(--vscode-button-secondaryForeground);" onclick="sendCheckoutCommand('${S(n.name)}', this)" title="Checkout ${S(n.name)}">
                                        ${S(n.name)} ${n.isMerged?'<span style="margin-left: 4px;" title="Merged to target env">\u2705</span>':""}
                                    </div>
                                `).join("")}
                            </div>
                        </div>
                    `:d.length>0?`
                        <div style="margin-top: 8px; border-top: 1px solid var(--vscode-panel-border); padding-top: 8px;">
                            <div style="font-size: 10px; opacity: 0.7; margin-bottom: 4px;">Recent Tickets</div>
                            <div style="display: flex; flex-direction: column; gap: 4px;">
                                ${d.map(n=>`
                                    <div class="btn" style="padding: 4px; font-size: 11px; justify-content: center; background-color: var(--vscode-button-secondaryBackground); color: var(--vscode-button-secondaryForeground);" onclick="sendCheckoutCommand('${S(n)}', this)" title="Checkout ${S(n)}">
                                        ${S(n)}
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

            ${c.length>0?`
                <div style="display: flex; gap: 4px; margin-bottom: 12px; flex-wrap: wrap; justify-content: center;">
                    ${c.map(n=>`
                        <button class="btn" style="flex: 1; min-width: 25%; justify-content: center; padding: 6px 4px; font-size: 10px; font-weight: bold; background-color: var(--vscode-button-secondaryBackground); color: var(--vscode-button-secondaryForeground); border: 1px solid var(--vscode-panel-border);" onclick="sendCheckoutCommand('${S(n)}', this)" title="Checkout ${S(n)}">
                            ${S(n.toUpperCase())}
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

            ${u}

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
        </html>`}}});var ce,Ke=k(()=>{"use strict";ce=class{static isValidShellArg(t){return t?/^[a-zA-Z0-9\-_/.]+$/.test(t):!1}}});var ve,et,Re,Q,ye=k(()=>{"use strict";ve=b(require("vscode")),et=b(require("path")),Re=b(require("fs")),Q=class e{style;upstreamRemote;originRemote;ticketSourceBranch;ticketPrefix;environments;static baseConfig=ve.workspace.getConfiguration("ricwiz");constructor(t){let o=e.baseConfig;this.style=t?.workflowStyle||o.get("workflowStyle","standard"),this.style==="multi-remote"?(this.upstreamRemote=t?.upstreamRemote||o.get("upstreamRemote","salesforce-master"),this.originRemote=t?.originRemote||o.get("originRemote","origin")):(this.upstreamRemote="origin",this.originRemote="origin"),this.ticketSourceBranch=t?.ticketSourceBranch||o.get("ticketSourceBranch","main"),this.ticketPrefix=t?.ticketPrefix||o.get("ticketPrefix","SFPSCA-");let s=[{name:"Qual",sourceBranch:"quality"},{name:"Val",sourceBranch:"validation"},{name:"Prod",sourceBranch:"main"}];this.environments=t?.environments||o.get("environments",s)}static async initialize(t){let o=e.baseConfig.get("profiles",[]),s=et.join(t,"ricwiz.json");if(Re.existsSync(s))try{let i=Re.readFileSync(s,"utf-8"),c=JSON.parse(i);c&&Array.isArray(c.profiles)&&(o=[...o,...c.profiles])}catch(i){ve.window.showErrorMessage(`Ricwiz: Error parsing ricwiz.json: ${i.message}`)}if(o.length>0){let i=o.map(g=>g.name),c=await ve.window.showQuickPick(i,{placeHolder:"Ricwiz: Select Workflow Profile",ignoreFocusOut:!0});if(!c)return;let d=o.find(g=>g.name===c);return new e(d)}return new e}buildUpstreamPath(t){return t.includes("/")?t:`${this.upstreamRemote}/${t}`}getFetchRemote(t){return t.includes("/")?t.split("/")[0]:this.upstreamRemote}getFetchBranch(t){return t.includes("/")?t.substring(t.indexOf("/")+1):t}}});async function tt(){let e=y();if(!e){P.window.showErrorMessage("Open a folder or workspace that is a Git repository.");return}let t=await Q.initialize(e);if(!t)return;let o=await I(e,{prefix:t.ticketPrefix});if(!o){P.window.showErrorMessage("Branch creation cancelled: Ticket not provided.");return}let{ticketId:s}=o,i=[{label:"Create Main Branch & Environments",description:"Creates the main ticket branch and all environment branches",value:"all"},{label:"Create Environments Only",description:"Creates only the environment branches (skip main branch)",value:"envs"}],c=await P.window.showQuickPick(i,{placeHolder:"What branches do you want to create?",title:"Ricwiz Branch Creation"});if(!c){P.window.showInformationMessage("Branch creation cancelled.");return}let d=t.ticketSourceBranch,g=t.environments,u=s;if(!ce.isValidShellArg(u)){P.window.showErrorMessage(`Invalid format for ticket ID: ${u}`);return}if(!ce.isValidShellArg(d)){P.window.showErrorMessage(`Invalid format for ticketSourceBranch in settings: ${d}`);return}for(let f of g){if(!ce.isValidShellArg(f.name)){P.window.showErrorMessage(`Invalid format for environment name in settings: ${f.name}`);return}if(!ce.isValidShellArg(f.sourceBranch)){P.window.showErrorMessage(`Invalid format for environment sourceBranch in settings: ${f.sourceBranch}`);return}}try{await p("git status",{cwd:e})}catch{P.window.showErrorMessage("The opened folder does not appear to be a valid Git repository.");return}try{await P.window.withProgress({location:P.ProgressLocation.Notification,title:"Ricwiz: Creating Branches",cancellable:!1},async f=>{let n=[];f.report({message:"Checking remote status (git fetch)...",increment:10});try{await p("git fetch",{cwd:e})}catch{}try{if(c.value==="all")if(f.report({message:`Creating main branch ${u}...`,increment:20}),await te(e,u))P.window.showInformationMessage(`Ricwiz: The branch ${u} already exists. Skipping creation...`),await p(`git checkout ${u}`,{cwd:e});else try{let r=t.getFetchRemote(d),a=t.getFetchBranch(d),m=t.buildUpstreamPath(d);await p(`git fetch ${r} ${a}`,{cwd:e}),await p(`git checkout -b ${u} ${m}`,{cwd:e}),n.push(u)}catch{try{await p(`git checkout -b ${u} ${d}`,{cwd:e}),n.push(u)}catch{throw new Error(`Could not create main branch '${u}' from '${d}'. Does the source branch exist?`)}}let l=50/(g.length||1);for(let r of g){let a=`${s}-to-${r.name}`,m=r.sourceBranch;if(f.report({message:`Processing environment branch ${a}...`,increment:l}),!await te(e,a))try{let h=t.buildUpstreamPath(m);await p(`git checkout -b ${a} ${h}`,{cwd:e}),n.push(a)}catch{try{await p(`git checkout -b ${a} ${m}`,{cwd:e}),n.push(a)}catch{throw new Error(`Could not create environment branch '${a}' from '${m}'. Does the source branch exist?`)}}}f.report({message:`Publishing branches to ${t.originRemote}...`,increment:10});for(let r of n)try{await p(`git push -u ${t.originRemote} ${r}`,{cwd:e})}catch{P.window.showWarningMessage(`Ricwiz: Branch ${r} was created locally but could not be pushed to ${t.originRemote}.`)}if(c.value==="all"){f.report({message:`Switching to ${u}...`,increment:10});try{await p(`git checkout ${u}`,{cwd:e})}catch{}}f.report({increment:100}),P.window.showInformationMessage("Ricwiz: All set! You can start working on your branches! \u{1F680}")}catch(l){if(P.window.showErrorMessage(`Ricwiz Branch Creation Failed: ${l.message}`),n.length>0){try{await p(`git checkout ${d}`,{cwd:e})}catch{}for(let r of n)try{await p(`git branch -D ${r}`,{cwd:e})}catch{}P.window.showWarningMessage(`Ricwiz: Rolled back (deleted) ${n.length} branch(es) locally due to failure.`)}}})}catch(f){P.window.showErrorMessage(`Ricwiz general error: ${f.message}`)}}var P,ot=k(()=>{"use strict";P=b(require("vscode"));C();Ke();ye()});async function oe(e,t,o,s){s&&s.report({message:"CONFLICT! Resolve & click 'Commit & Continue' in Ricwiz panel."});let i=!1,c=!1,d=async()=>{try{let{stdout:n}=await p("git status --porcelain",{cwd:e});return n.split(`
`).filter(l=>{let r=l.substring(0,2);return["UD","DU","DD","AU","UA"].includes(r)}).map(l=>l.substring(3).trim())}catch{return[]}},g=async()=>{try{let{stdout:n}=await p("git status --porcelain",{cwd:e}),l=r=>r==="UU"?"Both Modified":r==="UD"?"Deleted by them":r==="DU"?"Deleted by us":r==="DD"?"Both Deleted":r==="AA"?"Both Added":r==="AU"?"Added by us":r==="UA"?"Added by them":"Conflicted";return n.split(`
`).map(r=>r.trimRight()).filter(r=>r.length>2).filter(r=>{let a=r.substring(0,2);return["UU","AA","UD","DU","AU","UA","DD"].includes(a)}).map(r=>{let a=r.substring(0,2);return{file:r.substring(3).trim(),state:l(a)}})}catch{return[]}},u=async()=>{if(i)return;let n=await d(),l=await g(),{webviewProvider:r}=(Be(),ue(ze));r&&r.setConflictState({isConflict:!0,sourceStr:t,targetStr:o,deletionsCount:n.length,files:l})},f=Y.commands.registerCommand("ricwiz.conflictAction",async n=>{if(n==="abortDeploy")c=!0;else if(n==="resolveDeletions"){try{let r=(await d()).map(m=>({label:m})),a=await Y.window.showQuickPick(r,{canPickMany:!0,placeHolder:"Select conflicted files to DELETE",title:"Ricwiz: Delete Conflicted Files"});if(a&&a.length>0){for(let m of a)try{await p(`git rm --force "${m.label}"`,{cwd:e})}catch{}Y.window.showInformationMessage(`Ricwiz: Deleted ${a.length} conflicted file(s).`)}}catch(l){Y.window.showErrorMessage(`Ricwiz: Error. (${l.message})`)}u()}else if(n==="commitAndContinue")try{let r=(await d()).filter(m=>it.existsSync(nt.join(e,m)));if(r.length>0&&await Y.window.showWarningMessage(`Wait! There are ${r.length} file(s) with deletion conflicts that are still on your disk.

If you commit now, you will KEEP them in the project.

Are you sure you want to KEEP them?`,{modal:!0},"Yes, KEEP them","No, let me DELETE them")!=="Yes, KEEP them"){u();return}let a=!1;try{let{stdout:m}=await p('git grep -E "^<<<<<<< "',{cwd:e});m.trim().length>0&&(a=!0)}catch{}if(a){Y.window.showErrorMessage("Ricwiz: You still have unresolved conflict markers (<<<<<<<) in your files. Please resolve them first!"),u();return}await p("git add .",{cwd:e}),await p("git commit --no-edit",{cwd:e})}catch(l){Y.window.showErrorMessage(`Ricwiz: Could not commit automatically. (${l.message})`),u()}});for(u();;){if(c){i=!0,f.dispose(),(Be(),ue(ze)).webviewProvider?.setConflictState(null);try{await p("git merge --abort",{cwd:e})}catch{}return!1}try{let{stdout:n}=await p("git status --porcelain",{cwd:e});if(n.trim().length===0)return i=!0,f.dispose(),(Be(),ue(ze)).webviewProvider?.setConflictState(null),Y.window.showInformationMessage("Ricwiz: Changes committed!"),!0}catch{}await new Promise(n=>setTimeout(n,2e3))}}var Y,it,nt,Se=k(()=>{"use strict";Y=b(require("vscode")),it=b(require("fs")),nt=b(require("path"));C()});async function st(){let e=y();if(!e){O.window.showErrorMessage("Ricwiz: Open a folder or workspace that is a Git repository.");return}try{await p("git status",{cwd:e})}catch{O.window.showErrorMessage("Ricwiz: The opened folder does not appear to be a valid Git repository.");return}let t=await Q.initialize(e);if(!t)return;let o=t.environments,s=await I(e,{prefix:t.ticketPrefix});if(!s){O.window.showErrorMessage("Operation cancelled: Ticket not provided.");return}let{ticketId:i,currentBranch:c}=s,d=i;if(!await te(e,d)){O.window.showErrorMessage(`Ricwiz: Main branch '${d}' does not exist! Prepare deploy is only available when a main ticket branch is used.`);return}await O.window.withProgress({location:O.ProgressLocation.Notification,title:"Ricwiz: Preparing Deploy",cancellable:!0},async(g,u)=>{let f=0,n=c,l=!1;u.onCancellationRequested(()=>{l=!0}),g.report({message:"Syncing remote information...",increment:10});try{await p("git fetch --all",{cwd:e});let a=10/(o.length||1);for(let m of o)try{if(l)throw new Error("Aborted");g.report({message:`Fetching ${m.sourceBranch}...`,increment:a});let h=t.getFetchRemote(m.sourceBranch),w=t.getFetchBranch(m.sourceBranch);await p(`git fetch ${h} ${w}:${w}`,{cwd:e})}catch{}}catch{}let r=60/(o.length||1);for(let a of o){if(l)break;let m=`${i}-to-${a.name}`,h=a.sourceBranch;try{g.report({message:`Processing ${m}...`,increment:r/4}),await p(`git checkout ${m}`,{cwd:e});try{await p(`git pull ${t.originRemote} ${m}`,{cwd:e})}catch{}try{g.report({message:`Merging ${h} into ${m}...`,increment:r/4});let w=t.getFetchRemote(h),R=t.getFetchBranch(h),$=t.buildUpstreamPath(h);await p(`git fetch ${w} ${R}`,{cwd:e}),await p(`git merge ${$}`,{cwd:e})}catch(w){let R=!1;try{let{stdout:T}=await p("git ls-files -u",{cwd:e});T.trim().length>0&&(R=!0)}catch{}let $=((w.stdout||"")+(w.stderr||"")+(w.message||"")).toLowerCase();if(R||$.includes("conflict")||$.includes("conflit")){let T=t.buildUpstreamPath(h);if(!await oe(e,T,m,g))throw l=!0,new Error("Deploy aborted by user.")}else throw w}try{g.report({message:`Merging ${d} into ${m}...`,increment:r/4}),await p(`git merge ${d}`,{cwd:e})}catch(w){let R=!1;try{let{stdout:T}=await p("git ls-files -u",{cwd:e});T.trim().length>0&&(R=!0)}catch{}let $=((w.stdout||"")+(w.stderr||"")+(w.message||"")).toLowerCase();if(R||$.includes("conflict")||$.includes("conflit")){if(!await oe(e,d,m,g))throw l=!0,new Error("Deploy aborted by user.")}else throw w}if(l)break;g.report({message:`Pushing ${m}...`,increment:r/4}),await p(`git push ${t.originRemote} ${m}`,{cwd:e}),f++}catch(w){w.message.includes("aborted")?O.window.showInformationMessage("Ricwiz: Deploy cancelled."):O.window.showErrorMessage(`Ricwiz: Failed to process branch ${m}. Detail: ${w.message}`);return}}if(!l){g.report({message:"Finishing up...",increment:10});let a=n;try{await p(`git show-ref --verify --quiet refs/heads/${d}`,{cwd:e}),a=d}catch{}try{let m=await A(e);a&&a!==m?(await p(`git checkout ${a}`,{cwd:e}),O.window.showInformationMessage(`Ricwiz: Operation complete. Back on branch ${a}.`)):O.window.showInformationMessage("Ricwiz: Operation complete.")}catch{O.window.showInformationMessage("Ricwiz: Operation complete.")}}})}var O,rt=k(()=>{"use strict";O=b(require("vscode"));C();Se();ye()});async function at(e=!1){let t=y();if(!t)return;let o=G.workspace.getConfiguration("ricwiz"),s=o.get("environments",[{name:"Qual",sourceBranch:"quality"},{name:"Val",sourceBranch:"validation"},{name:"Prod",sourceBranch:"main"}]),i=await I(t,{prompt:"Enter the full ticket ID for the Merge Requests (e.g., SCPSCA-1234) or just the number"});if(!i)return;let{ticketId:c}=i,d=o.get("gitlabUrlOverride",""),g="";if(d&&d.trim()!=="")g=d.trim();else{let u="";try{let{stdout:f}=await p("git remote get-url origin",{cwd:t});u=f.trim()}catch{G.window.showErrorMessage("Ricwiz: Could not get the remote origin URL. Please configure the URL manually in the extension settings.");return}g=u,g.endsWith(".git")&&(g=g.slice(0,-4)),g.startsWith("git@")&&(g=g.replace("git@","").replace(":","/"),g=`https://${g}`)}for(let u of s){let f=`${c}-to-${u.name}`,n=u.sourceBranch,l=`${g}/-/merge_requests/new?merge_request[source_branch]=${f}&merge_request[target_branch]=${n}`;e?G.commands.executeCommand("simpleBrowser.show",l):G.env.openExternal(G.Uri.parse(l))}G.window.showInformationMessage(`Ricwiz: Opening ${e?"VS Code browser":"external browser"} for Merge Requests!`)}async function ct(){return at(!1)}async function dt(){return at(!0)}var G,lt=k(()=>{"use strict";G=b(require("vscode"));C()});async function mt(e=!1){let t=y();if(!t)return;let o=_.workspace.getConfiguration("ricwiz"),s=o.get("jiraUrl","");if(!s||s.trim()===""){_.window.showErrorMessage("Ricwiz: Jira URL is not configured. Please set it in the extension settings (e.g., https://jira.company.com/browse/).");return}let{getCurrentBranch:i,resolvePrefix:c,extractTicketSuggestion:d}=(C(),ue(Ae)),g=await i(t),u=o.get("ticketPrefix","SFPSCA-"),f=c(g,u),l=d(g,f,!0);if(l){let{normalizeTicketId:a}=(C(),ue(Ae));l=a(l,f)}else{let a=await I(t,{prompt:"Ricwiz could not detect the ticket from the branch name. Enter Jira ticket ID (e.g. SFPSCA-1234)",handleToSuffix:!0});if(!a)return;l=a.ticketId}let r=s.trim();r.endsWith("/")||(r+="/"),r+=l,e?_.commands.executeCommand("simpleBrowser.show",r):_.env.openExternal(_.Uri.parse(r)),_.window.showInformationMessage(`Ricwiz: Opening Jira Ticket ${l} in ${e?"VS Code":"browser"}!`)}async function ut(){return mt(!1)}async function pt(){return mt(!0)}var _,gt=k(()=>{"use strict";_=b(require("vscode"));C()});async function ft(){let e=y();if(!e){X.window.showErrorMessage("Ricwiz: Open a folder or workspace that is a Git repository.");return}let t=await Q.initialize(e);if(!t)return;let o=await I(e,{prefix:t.ticketPrefix,prompt:"Enter the full ticket ID to sync all branches for (e.g., SCPSCA-1234) or just the number"});if(!o)return;let{ticketId:s,currentBranch:i}=o;await X.window.withProgress({location:X.ProgressLocation.Notification,title:`Ricwiz: Syncing all branches for ${s}...`,cancellable:!1},async c=>{try{c.report({message:"Fetching from remote..."});try{await p("git fetch --all",{cwd:e})}catch{}let{stdout:d}=await p(`git branch --list "*${s}*"`,{cwd:e}),g=d.split(`
`).map(n=>n.replace("*","").trim()).filter(n=>n.length>0);if(g.length===0){X.window.showWarningMessage(`Ricwiz: No local branches found for ${s}.`);return}let u=0,f=0;for(let n of g)if(c.report({message:`Syncing ${n}...`}),n===i)try{await p(`git pull ${t.originRemote} ${n}`,{cwd:e}),u++}catch(l){let r=!1;try{let{stdout:m}=await p("git ls-files -u",{cwd:e});m.trim().length>0&&(r=!0)}catch{}let a=((l.stdout||"")+(l.stderr||"")+(l.message||"")).toLowerCase();(r||a.includes("conflict")||a.includes("conflit"))&&await oe(e,`${t.originRemote}/${n}`,n,c)?u++:f++}else try{await p(`git fetch ${t.originRemote} ${n}:${n}`,{cwd:e}),u++}catch{try{await p(`git checkout ${n}`,{cwd:e});try{await p(`git pull ${t.originRemote} ${n}`,{cwd:e}),u++}catch(r){let a=!1;try{let{stdout:h}=await p("git ls-files -u",{cwd:e});h.trim().length>0&&(a=!0)}catch{}let m=((r.stdout||"")+(r.stderr||"")+(r.message||"")).toLowerCase();(a||m.includes("conflict")||m.includes("conflit"))&&await oe(e,`${t.originRemote}/${n}`,n,c)?u++:f++}await p(`git checkout ${i}`,{cwd:e})}catch{try{await p(`git checkout ${i}`,{cwd:e})}catch{}f++}}f>0?X.window.showWarningMessage(`Ricwiz: Synced ${u}/${g.length} branches. ${f} branch(es) could not be synced (possible conflicts or diverged history).`):X.window.showInformationMessage(`Ricwiz: \u{1F504} All ${u} branches for ${s} are up to date!`)}catch(d){X.window.showErrorMessage(`Ricwiz: Sync failed: ${d.message}`)}})}var X,ht=k(()=>{"use strict";X=b(require("vscode"));C();Se();ye()});async function wt(){let e=y();if(!e){K.window.showErrorMessage("Ricwiz: Open a folder or workspace that is a Git repository.");return}try{await p("git status",{cwd:e})}catch{K.window.showErrorMessage("Ricwiz: The opened folder does not appear to be a valid Git repository.");return}let t=await Q.initialize(e);if(!t)return;let o=t.environments,s=await I(e,{prefix:t.ticketPrefix});if(!s)return;let{ticketId:i,currentBranch:c}=s;await K.window.withProgress({location:K.ProgressLocation.Notification,title:"Ricwiz: Updating environment branches from their bases",cancellable:!0},async(d,g)=>{let u=0,f=c,n=!1;g.onCancellationRequested(()=>{n=!0}),d.report({message:"Syncing remote information...",increment:10});try{await p("git fetch --all",{cwd:e})}catch{}let l=80/(o.length||1);for(let r of o){if(n)break;let a=`${i}-to-${r.name}`,m=r.sourceBranch;if(await te(e,a))try{d.report({message:`Processing ${a}...`,increment:l/2}),await p(`git checkout ${a}`,{cwd:e});try{d.report({message:`Merging ${m} into ${a}...`,increment:l/2});let h=t.getFetchRemote(m),w=t.getFetchBranch(m),R=t.buildUpstreamPath(m);await p(`git fetch ${h} ${w}`,{cwd:e}),await p(`git merge ${R}`,{cwd:e})}catch(h){let w=!1;try{let{stdout:$}=await p("git ls-files -u",{cwd:e});$.trim().length>0&&(w=!0)}catch{}let R=((h.stdout||"")+(h.stderr||"")+(h.message||"")).toLowerCase();if(w||R.includes("conflict")||R.includes("conflit")){let $=t.buildUpstreamPath(m);if(!await oe(e,$,a,d))throw n=!0,new Error("Update aborted by user.")}else throw h}if(n)break;u++}catch(h){h.message.includes("aborted")?K.window.showInformationMessage("Ricwiz: Update cancelled."):K.window.showErrorMessage(`Ricwiz: Failed to update branch ${a}. Detail: ${h.message}`);return}}if(!n){d.report({message:"Finishing up...",increment:10});try{let r=await A(e);f&&f!==r&&await p(`git checkout ${f}`,{cwd:e})}catch{}K.window.showInformationMessage(`Ricwiz: Successfully updated ${u} environment branches from their bases!`)}})}var K,vt=k(()=>{"use strict";K=b(require("vscode"));C();Se();ye()});async function yt(){let e=y();if(!e){E.window.showErrorMessage("Ricwiz: Open a folder or workspace that is a Git repository.");return}let t=await A(e),o=E.workspace.getConfiguration("ricwiz");await E.window.withProgress({location:E.ProgressLocation.Notification,title:"Ricwiz: Scanning for unused local branches...",cancellable:!1},async()=>{try{await p("git fetch --prune",{cwd:e})}catch{}let s=[];try{let{stdout:l}=await p('git branch --format="%(refname:short)"',{cwd:e});s=l.split(`
`).map(r=>r.trim()).filter(r=>r.length>0)}catch{}if(s.length===0){E.window.showInformationMessage("Ricwiz: No local branches found.");return}let i=[];try{let{stdout:l}=await p('git branch -r --format="%(refname:short)"',{cwd:e});i=l.split(`
`).map(r=>r.trim().replace(/^origin\//,"").replace(/^[^\/]+\//,"")).filter(r=>r.length>0&&!r.includes("HEAD"))}catch{}let c=[];try{let{stdout:l}=await p('git for-each-ref --format="%(refname:short)|||%(upstream:track)" refs/heads/',{cwd:e});c=l.split(`
`).filter(r=>r.includes("[gone]")).map(r=>r.split("|||")[0].trim())}catch{}let d=s.filter(l=>!i.includes(l));if(d.length===0){E.window.showInformationMessage("Ricwiz: Your local repository is totally clean! All local branches exist on the remote.");return}let g=d.map(l=>{let r=c.includes(l),a=l===t,m="Not found on remote";return r&&(m="Deleted on remote [gone]"),a&&(m+=" (Current branch - will checkout main first)"),{label:l,description:m,picked:r&&!a}}),u=await E.window.showQuickPick(g,{canPickMany:!0,placeHolder:"Select local branches to delete",title:"Ricwiz: Delete Unused Branches"});if(!u||u.length===0){E.window.showInformationMessage("Ricwiz: No branches selected for deletion.");return}if(await E.window.showWarningMessage(`Ricwiz: Delete ${u.length} local branch(es)?
This cannot be undone!`,{modal:!0},"Yes, delete them")!=="Yes, delete them"){E.window.showInformationMessage("Ricwiz: Deletion cancelled.");return}let n=0;for(let l of u){let r=l.label;if(r===t){let a=o.get("ticketSourceBranch","main");try{await p(`git checkout ${a}`,{cwd:e}),t=a}catch{E.window.showWarningMessage(`Ricwiz: Could not switch away from ${r}. Skipping.`);continue}}try{await p(`git branch -D ${r}`,{cwd:e}),n++}catch{E.window.showWarningMessage(`Ricwiz: Could not delete local branch ${r}.`)}}E.window.showInformationMessage(`Ricwiz: \u{1F5D1}\uFE0F Cleaned up ${n} unused local branch(es).`)})}var E,bt=k(()=>{"use strict";E=b(require("vscode"));C()});async function ge(e){let t=y();t&&await ee.window.withProgress({location:ee.ProgressLocation.Notification,title:`Ricwiz: Switching to ${e}...`,cancellable:!1},async()=>{try{let o=await A(t),s=!1;try{let{stdout:i}=await p("git status --porcelain",{cwd:t});s=i.trim().length>0}catch{}if(s&&o)try{await p(`git stash push --include-untracked -m "ricwiz-auto:${o}"`,{cwd:t}),ee.window.showInformationMessage(`Ricwiz: \u{1F4E6} Stashed changes from ${o}`)}catch{ee.window.showWarningMessage("Ricwiz: Could not stash changes. Checkout may fail if there are conflicts.")}await p(`git checkout ${e}`,{cwd:t});try{let{stdout:i}=await p("git stash list",{cwd:t}),c=i.split(`
`);for(let d=0;d<c.length;d++)if(c[d].includes(`ricwiz-auto:${e}`)){let g=c[d].match(/stash@\{(\d+)\}/);g&&(await p(`git stash pop stash@{${g[1]}}`,{cwd:t}),ee.window.showInformationMessage(`Ricwiz: \u{1F4E6} Restored stashed changes on ${e}`));break}}catch{ee.window.showWarningMessage(`Ricwiz: Could not restore stashed changes on ${e}. You may need to resolve conflicts manually (check git stash list).`)}}catch{ee.window.showErrorMessage(`Ricwiz: Could not checkout branch ${e}.`)}})}var ee,Pe=k(()=>{"use strict";ee=b(require("vscode"));C()});async function xt(){let e=y();if(e)try{let{stdout:t}=await p("git branch --show-current",{cwd:e}),o=t.trim();o&&(await be.env.clipboard.writeText(o),be.window.showInformationMessage(`Ricwiz: \u{1F4CB} Copied "${o}" to clipboard`))}catch{be.window.showErrorMessage("Ricwiz: Could not get the current branch name.")}}var be,kt=k(()=>{"use strict";be=b(require("vscode"));C()});async function $t(){let e=y();if(!e){j.window.showErrorMessage("Ricwiz: Open a folder or workspace that is a Git repository.");return}let t=j.workspace.getConfiguration("ricwiz"),o=t.get("ticketSourceBranch","main"),i=t.get("packageXmlCommand",'sf sgd source delta --to "HEAD" --from "origin/{baseBranch}" --output-dir "."').replace("{baseBranch}",o);await j.window.showWarningMessage("Are you sure you want to generate the package.xml? This may overwrite existing local manifest files.",{modal:!0},"Yes, Generate")==="Yes, Generate"&&await j.window.withProgress({location:j.ProgressLocation.Notification,title:"Ricwiz: Generating package.xml using Salesforce CLI...",cancellable:!1},async()=>{try{await p(i,{cwd:e,maxBuffer:10*1024*1024}),j.window.showInformationMessage("Ricwiz: Successfully generated package.xml!");let d=Me.join(e,"package","package.xml"),g=Me.join(e,"package.xml"),u=Me.join(e,"manifest","package.xml");for(let f of[d,g,u])if(Ct.existsSync(f)){let n=await j.workspace.openTextDocument(f);await j.window.showTextDocument(n);break}}catch(d){j.window.showErrorMessage(`Ricwiz: Error running sf command - ${d.message}`)}})}var j,Me,Ct,Rt=k(()=>{"use strict";j=b(require("vscode")),Me=b(require("path")),Ct=b(require("fs"));C()});async function zt(){let e=y();if(!e){W.window.showErrorMessage("Ricwiz: Open a folder or workspace that is a Git repository.");return}let o=W.workspace.getConfiguration("ricwiz").get("deployCommand","sf project deploy start --manifest package/package.xml --post-destructive-changes destructiveChanges/destructiveChanges.xml -c -l NoTestRun -g");await W.window.showWarningMessage("Are you sure you want to deploy to Salesforce? This action modifies your org and cannot be easily undone.",{modal:!0},"Yes, Deploy")==="Yes, Deploy"&&await W.window.withProgress({location:W.ProgressLocation.Notification,title:"Ricwiz: Deploying package...",cancellable:!1},async()=>{try{let{stdout:i,stderr:c}=await p(o,{cwd:e,maxBuffer:52428800}),d=W.window.createOutputChannel("Ricwiz Deploy");d.appendLine(`Executing: ${o}`),d.appendLine(i),c&&(d.appendLine("--- STDERR ---"),d.appendLine(c)),d.show(),W.window.showInformationMessage("Ricwiz: Successfully ran deploy command!")}catch(i){let c=W.window.createOutputChannel("Ricwiz Deploy");c.appendLine(`Error executing: ${o}`),i.stdout&&c.appendLine(i.stdout),i.stderr&&c.appendLine(i.stderr),c.appendLine(i.message),c.show(),W.window.showErrorMessage("Ricwiz: Error running deploy command. See output channel for details.")}})}var W,Bt=k(()=>{"use strict";W=b(require("vscode"));C()});async function St(){let e=y();if(!e){q.window.showErrorMessage("Ricwiz: Open a folder or workspace that is a Git repository.");return}let o=q.workspace.getConfiguration("ricwiz").get("importDataCommand","sfdx force:data:tree:import --plan data/plan.json");await q.window.showWarningMessage("Are you sure you want to import data into Salesforce? This action modifies records in your org.",{modal:!0},"Yes, Import")==="Yes, Import"&&await q.window.withProgress({location:q.ProgressLocation.Notification,title:"Ricwiz: Importing data...",cancellable:!1},async()=>{try{let{stdout:i,stderr:c}=await p(o,{cwd:e,maxBuffer:52428800}),d=q.window.createOutputChannel("Ricwiz Import Data");d.appendLine(`Executing: ${o}`),d.appendLine(i),c&&(d.appendLine("--- STDERR ---"),d.appendLine(c)),d.show(),q.window.showInformationMessage("Ricwiz: Successfully ran import data command!")}catch(i){let c=q.window.createOutputChannel("Ricwiz Import Data");c.appendLine(`Error executing: ${o}`),i.stdout&&c.appendLine(i.stdout),i.stderr&&c.appendLine(i.stderr),c.appendLine(i.message),c.show(),q.window.showErrorMessage("Ricwiz: Error running import data command. See output channel for details.")}})}var q,Pt=k(()=>{"use strict";q=b(require("vscode"));C()});async function Mt(){let e=y();if(!e){H.window.showErrorMessage("Ricwiz: Open a folder or workspace that is a Git repository.");return}let t="";try{t=await A(e)}catch{}let s=H.workspace.getConfiguration("ricwiz").get("ticketSourceBranch","main"),i=await H.window.showInputBox({prompt:`Enter the branch name to list modified files (compared to ${s})`,value:t,placeHolder:"SFPSCA-1234"});i&&await H.window.withProgress({location:H.ProgressLocation.Notification,title:`Ricwiz: Finding files for ${i}...`,cancellable:!1},async()=>{try{let c=i.replace(/-to-[a-zA-Z0-9]+$/i,""),d=[];try{let m="";try{let{stdout:h}=await p(`git merge-base origin/${s} ${i}`,{cwd:e});m=h.trim()}catch{let{stdout:h}=await p(`git merge-base ${s} ${i}`,{cwd:e});m=h.trim()}if(m){let{stdout:h}=await p(`git diff --name-only ${m} ${i}`,{cwd:e,maxBuffer:10485760});d=h.split(`
`).map(w=>w.trim()).filter(w=>w.length>0)}}catch{}let g=[];try{let{stdout:m}=await p(`git --no-pager log --grep="\\b${c}\\b" -i -E --name-only -m --first-parent --format=""`,{cwd:e,maxBuffer:10485760});g=m.split(`
`).map(h=>h.trim()).filter(h=>h.length>0)}catch{}let u=[...d,...g];if(u.length===0){H.window.showInformationMessage(`Ricwiz: No modified files found for ${i}.`);return}let f=Array.from(new Set(u)).sort(),n={};for(let m of f){let h=m.match(/default\/([^/]+)/),w=h&&h[1]?h[1].toUpperCase():"OUTROS";n[w]||(n[w]=[]),n[w].push(m)}let l=`Files modified in branch ${i}:
`,r=Object.keys(n).sort();for(let m of r)l+=`
=== ${m} ===
`,l+=n[m].join(`
`)+`
`;let a=await H.workspace.openTextDocument({content:l,language:"plaintext"});await H.window.showTextDocument(a)}catch(c){H.window.showErrorMessage(`Ricwiz: Error running git log - ${c.message}`)}})}var H,Et=k(()=>{"use strict";H=b(require("vscode"));C()});async function Dt(){let e=y();if(!e){J.window.showErrorMessage("Ricwiz: Open a folder or workspace that is a Git repository.");return}let o=J.workspace.getConfiguration("ricwiz").get("resetTrackingCommand","sf org disable tracking && sf project reset tracking --no-prompt");await J.window.withProgress({location:J.ProgressLocation.Notification,title:"Ricwiz: Resetting tracking...",cancellable:!1},async()=>{try{let{stdout:s,stderr:i}=await p(o,{cwd:e,maxBuffer:52428800}),c=J.window.createOutputChannel("Ricwiz Reset Tracking");c.appendLine(`Executing: ${o}`),c.appendLine(s),i&&(c.appendLine("--- STDERR ---"),c.appendLine(i)),c.show(),J.window.showInformationMessage("Ricwiz: Successfully reset tracking!")}catch(s){let i=J.window.createOutputChannel("Ricwiz Reset Tracking");i.appendLine(`Error executing: ${o}`),s.stdout&&i.appendLine(s.stdout),s.stderr&&i.appendLine(s.stderr),i.appendLine(s.message),i.show(),J.window.showErrorMessage("Ricwiz: Error resetting tracking. See output channel for details.")}})}var J,Tt=k(()=>{"use strict";J=b(require("vscode"));C()});async function At(){let e=y();if(!e){V.window.showErrorMessage("Ricwiz: Open a workspace first.");return}let t=["ApexClass","ApexTrigger","CustomObject","CustomField","LightningComponentBundle","AuraDefinitionBundle","Flow","CustomLabel","CustomMetadata","StaticResource","Profile","PermissionSet","PermissionSetGroup","Layout","ValidationRule","RecordType","ListView","Report","EmailTemplate","Other (Type manually)..."],o=await V.window.showQuickPick(t,{placeHolder:"Select Metadata Type to extract (e.g., ApexClass)",ignoreFocusOut:!0});if(!o||o==="Other (Type manually)..."&&(o=await V.window.showInputBox({prompt:"Enter Metadata Type (e.g., CustomApplication, Queue)",ignoreFocusOut:!0}),!o))return;let s={ApexClass:"**/*.cls",ApexTrigger:"**/*.trigger",CustomObject:"**/*.{object,object-meta.xml}",CustomField:"**/*.field-meta.xml",LightningComponentBundle:"**/lwc/*/*.js",AuraDefinitionBundle:"**/aura/*/*.cmp",Flow:"**/*.flow-meta.xml",CustomLabel:"**/*.labels-meta.xml",CustomMetadata:"**/*.md-meta.xml",StaticResource:"**/*.resource-meta.xml",Profile:"**/*.profile-meta.xml",PermissionSet:"**/*.permissionset-meta.xml",PermissionSetGroup:"**/*.permissionsetgroup-meta.xml",Layout:"**/*.layout-meta.xml",ValidationRule:"**/*.validationRule-meta.xml",RecordType:"**/*.recordType-meta.xml",ListView:"**/*.listView-meta.xml"},i=[],c=s[o];if(c)try{i=(await V.workspace.findFiles(c,"**/node_modules/**")).map(u=>{let f=u.fsPath.split(/[\\/]/).pop()||"";if(o==="LightningComponentBundle"||o==="AuraDefinitionBundle"){let n=u.fsPath.split(/[\\/]/);return n[n.length-2]||f.split(".")[0]}return f.split(".")[0]}),i=[...new Set(i)].sort()}catch{}let d=await new Promise(g=>{let u=V.window.createQuickPick();u.title=`Extract ${o}`,u.placeholder="Type name (e.g. MyComponent) or * for all",u.ignoreFocusOut=!0,u.matchOnDescription=!0;let f=()=>{let n=u.value.trim(),l=[];n?l.push({label:`$(cloud-download) Extract "${n}"`,description:"Extract exact name from Salesforce",alwaysShow:!0}):l.push({label:'$(cloud-download) Extract "*" (All)',description:`Extract all ${o}s`,alwaysShow:!0}),i.forEach(r=>{(!n||r.toLowerCase().includes(n.toLowerCase()))&&l.push({label:r,description:"Local workspace component"})}),u.items=l};u.onDidChangeValue(()=>f()),u.onDidAccept(()=>{let n=u.selectedItems[0];if(n){let l=n.label;l.startsWith('$(cloud-download) Extract "')?l=l.replace('$(cloud-download) Extract "',"").replace('" (All)',"").replace('"',""):l==='$(cloud-download) Extract "*" (All)'&&(l="*"),u.hide(),g(l)}}),u.onDidHide(()=>{u.dispose(),g(void 0)}),f(),u.show()});d&&await V.window.withProgress({location:V.ProgressLocation.Notification,title:`Ricwiz: Extracting ${o}:${d} from Salesforce...`,cancellable:!0},async(g,u)=>{try{M.show(!0);let f=`${o}:${d}`,{stdout:n,stderr:l}=await p(`sf project retrieve start -m "${f}"`,{cwd:e});n&&M.appendLine(n),l&&M.appendLine(l),V.window.showInformationMessage(`Ricwiz: Successfully extracted ${f}.`)}catch(f){M.appendLine(`ERROR: ${f.message}`),f.stdout&&M.appendLine(f.stdout),f.stderr&&M.appendLine(f.stderr),V.window.showErrorMessage("Ricwiz: Extraction failed. See Output channel for details.")}})}var V,Ft=k(()=>{"use strict";V=b(require("vscode"));C()});async function It(){let e=F.window.activeTextEditor;if(!e){F.window.showErrorMessage("Ricwiz: Please open the file you want to deploy in the editor first.");return}let t=e.document.uri.fsPath,o=y();if(!o)return;let s="";if(await F.window.withProgress({location:F.ProgressLocation.Notification,title:"Ricwiz: Fetching available Salesforce orgs...",cancellable:!1},async()=>{try{let{stdout:u}=await p("sf org list --json",{cwd:o});s=u}catch(u){s=u.stdout||""}}),!s){F.window.showErrorMessage("Ricwiz: Failed to fetch orgs. Is Salesforce CLI installed?");return}let i=[];try{let u=JSON.parse(s),f=u.result?.nonScratchOrgs||[],n=u.result?.scratchOrgs||[];i=[...f,...n]}catch{F.window.showErrorMessage("Ricwiz: Failed to parse org list.");return}if(i.length===0){F.window.showInformationMessage("Ricwiz: No authenticated orgs found.");return}let c=i.map(u=>({label:u.alias||u.username,description:u.alias?u.username:"",picked:u.isDefaultUsername})),d=await F.window.showQuickPick(c,{placeHolder:"Select the org(s) to deploy this file to",canPickMany:!0,ignoreFocusOut:!0});if(!d||d.length===0)return;let g=Lt.basename(t);await F.window.withProgress({location:F.ProgressLocation.Notification,title:`Ricwiz: Deploying ${g} to ${d.length} org(s)...`,cancellable:!1},async()=>{M.show(!0),M.appendLine(`--- Starting Parallel Deploy of ${g} ---`);let u=d.map(async r=>{let a=r.label;M.appendLine(`[${a}] Deploying...`);try{let{stdout:m,stderr:h}=await p(`sf project deploy start -d "${t}" -o "${a}"`,{cwd:o});return M.appendLine(`[${a}] \u2705 Success`),m&&M.appendLine(m),{org:a,success:!0}}catch(m){return M.appendLine(`[${a}] \u274C Failed`),m.stdout&&M.appendLine(m.stdout),m.stderr&&M.appendLine(m.stderr),{org:a,success:!1}}}),f=await Promise.all(u),n=f.filter(r=>r.success).length,l=f.filter(r=>!r.success).length;l===0?F.window.showInformationMessage(`Ricwiz: Successfully deployed to all ${n} orgs!`):F.window.showErrorMessage(`Ricwiz: Deploy finished with errors (${n} success, ${l} failed). Check Output channel.`)})}var F,Lt,Ot=k(()=>{"use strict";F=b(require("vscode")),Lt=b(require("path"));C()});async function Ut(){let e=y();if(!e){z.window.showErrorMessage("Ricwiz: Open a folder or workspace that is a Git repository.");return}let t=z.workspace.getConfiguration("ricwiz"),o=t.get("auditUsername",""),s=t.get("auditHours",8),i=await z.window.showInputBox({prompt:"Enter your Salesforce Username to query in SetupAuditTrail",value:o,placeHolder:"admin@tuaorg.com"});if(!i)return;let c=await z.window.showInputBox({prompt:"How many hours back do you want to search?",value:s.toString(),placeHolder:"8"});if(!c)return;let d=parseFloat(c);if(isNaN(d)||d<=0){z.window.showErrorMessage("Ricwiz: Invalid hours specified.");return}let g=new Date(Date.now()-d*60*60*1e3).toISOString(),f=`sf data query -q "${`SELECT Action, Display, Section FROM SetupAuditTrail WHERE CreatedBy.Username = '${i}' AND CreatedDate >= ${g}`}" --json`;await z.window.withProgress({location:z.ProgressLocation.Notification,title:"Ricwiz: Interrogating Setup Audit Trail...",cancellable:!1},async()=>{try{let{stdout:n}=await p(f,{cwd:e,maxBuffer:52428800}),l=JSON.parse(n);if(!l.result||l.result.records.length===0){z.window.showInformationMessage(`Ricwiz: No changes found for ${i} in the last ${d} hours.`);return}let r=l.result.records,a=[],m=new Set;for(let B of r){let N=so(B.Action,B.Display,B.Section);if(N){let ne=`${N.isDelete?"DEL":"ADD"}-${N.metadataFormat}`;if(!m.has(ne)){m.add(ne);let se=N.isDelete?"$(trash)":"$(plus)";a.push({label:`${se} ${N.metadataFormat}`,description:`${B.Action} -> ${B.Display}`,metadataFormat:N.metadataFormat,isDelete:N.isDelete})}}}if(a.length===0){z.window.showInformationMessage(`Ricwiz: No extractable metadata changes found for ${i} in the last ${d} hours (ignored passwords/logins).`);return}let h=await z.window.showQuickPick(a,{canPickMany:!0,placeHolder:"Select the changes you want to extract to GitLab",ignoreFocusOut:!0});if(!h||h.length===0){z.window.showInformationMessage("Ricwiz: No changes selected.");return}let w=h.filter(B=>B.isDelete),R=h.filter(B=>!B.isDelete),$=z.window.createOutputChannel("Ricwiz Admin Bridge");if($.show(),w.length>0){let{stdout:B}=await p("git ls-files",{cwd:e}),N=B.split(`
`).map(se=>se.trim()),ne=0;for(let se of w){let D=se.metadataFormat.split(":"),re=D[0],ae=D[1],he=ae;re==="CustomField"&&(he=ae.split(".")[1]);let Xt=N.filter(ke=>{let we=De.basename(ke);return we.startsWith(he+".")&&we.includes(re==="CustomField"?".field":"")});for(let ke of Xt){let we=De.join(e,ke);Ee.existsSync(we)&&(Ee.unlinkSync(we),$.appendLine(`Deleted local file: ${ke}`),ne++)}}z.window.showInformationMessage(`Ricwiz: Deleted ${ne} local files from Git workspace.`)}if(R.length===0)return;let T=R.map(B=>B.metadataFormat).filter(B=>B!=="").join(", "),le=await z.window.showInputBox({prompt:"Review and adjust the metadata components to retrieve",value:T,ignoreFocusOut:!0});if(!le)return;let fe=`sf project retrieve start -m "${le}"`;$.appendLine(`Executing: ${fe}`),z.window.showInformationMessage(`Ricwiz: Extracting ${R.length} components...`);let me=await p(fe,{cwd:e});$.appendLine(me.stdout),me.stderr&&($.appendLine("--- STDERR ---"),$.appendLine(me.stderr)),z.window.showInformationMessage("Ricwiz: Changes extracted successfully! Ready for Git Commit.")}catch(n){z.window.showErrorMessage(`Ricwiz: Error capturing changes - ${n.message}`)}})}function so(e,t,o){if(!e||!t||!o)return null;let s=e.toLowerCase(),i=o.toLowerCase();if(["security controls","network access","session settings","data export","login history","password policies","identity verification","delegated administration"].includes(i)||s.includes("login")||s.includes("password")||s.includes("oauth")||s.includes("session"))return null;let d=s.includes("delete"),g=null;if(s==="permissionsetgroupcomponentadd"||s==="permissionsetgroupcomponentdelete")return null;let u=(f,n=!1)=>{let l=f.replace(/\(.*\)/g,"").trim();l.includes(":")&&!s.includes("calculation")&&(l=l.split(":")[0]);let r=["disabled","deleted","removed","created","changed","updated","from","to","on","assigned","assign","assignment","permission","set","group","apex","class","trigger","custom","field","object","layout","validation","rule","flow","profile"],a=l.split(/\s+/);if(n){for(;a.length>0&&r.includes(a[a.length-1].toLowerCase());)a.pop();for(;a.length>0&&r.includes(a[0].toLowerCase());)a.shift();return a.join(" ").trim().replace(/[^a-zA-Z0-9_ ]/g,"")}else return a.filter(w=>!r.includes(w.toLowerCase())).join("_").replace(/[^a-zA-Z0-9_]/g,"")||l.replace(/\s+/g,"")};if(s.includes("profile"))g=`Profile:${u(t,!0)}`;else if(s.includes("permissionsetgroupcalculation")){let f=t.split(":");g=`PermissionSetGroup:${f.length>1?f[f.length-1].trim():u(t,!1)}`}else if(s.includes("permission set group")||s.includes("permissionsetgroup"))g=`PermissionSetGroup:${u(t,!1)}`;else if(s.includes("permission set")||s.includes("permissionset"))g=`PermissionSet:${u(t,!1)}`;else if(s.includes("apexclass"))g=`ApexClass:${u(t,!1)}`;else if(s.includes("apextrigger")||s.includes("apex trigger"))g=`ApexTrigger:${u(t,!1)}`;else if(s.includes("customfield")){let f=t.match(/([A-Za-z0-9_]+__c)/),n=t.match(/(?:on|na|for)\s+([A-Za-z0-9_]+)/i);f&&n?g=`CustomField:${n[1]}.${f[1]}`:g=`CustomField:${u(t,!1)}`}else if(s.includes("layout"))g=`Layout:${u(t,!0)}`;else if(s.includes("validation"))g=`ValidationRule:${u(t,!1)}`;else if(s.includes("flow"))g=`Flow:${u(t,!1)}`;else if(s.includes("customobject")){let f=t.match(/([A-Za-z0-9_]+__c)/);g=f?`CustomObject:${f[1]}`:`CustomObject:${u(t,!1)}`}else if(!s.includes("created")&&!s.includes("changed")&&!s.includes("deleted"))return null;return g?{metadataFormat:g,isDelete:d}:null}var z,Ee,De,Nt=k(()=>{"use strict";z=b(require("vscode")),Ee=b(require("fs")),De=b(require("path"));C()});async function jt(){let e=y();if(e)try{let{stdout:t}=await p('git for-each-ref --sort=-committerdate --format="%(refname:short)|||%(committerdate:relative)|||%(subject)" refs/heads/',{cwd:e}),o=t.split(`
`).filter(i=>i.trim()).map(i=>{let c=i.split("|||");return{label:`$(git-branch) ${c[0]}`,description:c[1],detail:c[2],branchName:c[0]}}),s=await Fe.window.showQuickPick(o,{placeHolder:"Select a branch from history to checkout",matchOnDescription:!0,matchOnDetail:!0});s&&await ge(s.branchName)}catch{Fe.window.showErrorMessage("Ricwiz: Failed to get branch history")}}var Fe,Wt=k(()=>{"use strict";Fe=b(require("vscode"));C();Pe()});async function qt(){let e=y();if(!e)return;let t=await xe.window.showInputBox({prompt:"Enter ticket number or name (e.g., 48934)",placeHolder:"48934"});if(t)try{let{stdout:o}=await p(`git branch --list "*${t}*"`,{cwd:e}),s=o.split(`
`).map(d=>d.replace("*","").trim()).filter(d=>d);if(s.length===0){xe.window.showInformationMessage(`Ricwiz: No branches found matching "${t}"`);return}let i=s.map(d=>({label:`$(git-branch) ${d}`,branchName:d})),c=await xe.window.showQuickPick(i,{placeHolder:`Select a branch for ${t}`});c&&await ge(c.branchName)}catch{xe.window.showErrorMessage("Ricwiz: Failed to search branches")}}var xe,Ht=k(()=>{"use strict";xe=b(require("vscode"));C();Pe()});async function Gt(){let e=de.window.activeTextEditor;if(!e)return de.window.showErrorMessage("Ricwiz: Please open a file in the editor to check blame."),null;let t=e.document.fileName,o=Vt.basename(t),s=y();if(!s)return de.window.showErrorMessage("Ricwiz: Workspace is not a git repository."),null;let i=[];try{let{stdout:n}=await p(`git log -5 --pretty=format:"%an|%ar|%s|%h" -- "${t}"`,{cwd:s}),l=n.trim().split(`
`);for(let r of l){let a=r.split("|");a.length>=4&&i.push({author:a[0],time:a[1],message:a.slice(2,-1).join("|"),hash:a[a.length-1]})}}catch(n){console.error("Git blame error:",n)}let c="Unknown",d="Unknown",g="Unknown",u=[],f=ro(t);if(f)try{await de.window.withProgress({location:de.ProgressLocation.Notification,title:`Ricwiz: Analyzing ${f.name} in Salesforce...`,cancellable:!1},async()=>{let n="";if(f.type==="CustomField"){let l=f.name.split(".");l.length===2&&(n=`SELECT LastModifiedBy.Name, LastModifiedDate, CreatedBy.Name FROM CustomField WHERE DeveloperName = '${l[1].replace("__c","")}' AND TableEnumOrId = '${l[0]}'`)}else f.type==="LightningComponentBundle"?n=`SELECT LastModifiedBy.Name, LastModifiedDate, CreatedBy.Name FROM LightningComponentBundle WHERE DeveloperName = '${f.name}'`:n=`SELECT LastModifiedBy.Name, LastModifiedDate, CreatedBy.Name FROM ${f.type} WHERE Name = '${f.name}'`;if(n)try{let{stdout:l}=await p(`sf data query -t -q "${n}" --json`,{cwd:s,maxBuffer:52428800}),r=JSON.parse(l);if(r&&r.result&&r.result.records&&r.result.records.length>0){let a=r.result.records[0];c=a.LastModifiedBy?a.LastModifiedBy.Name:"Unknown",g=a.CreatedBy?a.CreatedBy.Name:"Unknown",d=new Date(a.LastModifiedDate).toLocaleString()}else c="Not found in Org",d="N/A",g="N/A"}catch{c="Query Error",d="N/A",g="N/A"}try{let l="SELECT Action, Display, CreatedBy.Name, CreatedDate FROM SetupAuditTrail ORDER BY CreatedDate DESC LIMIT 1500",{stdout:r}=await p(`sf data query -q "${l}" --json`,{cwd:s,maxBuffer:52428800}),a=JSON.parse(r);if(a&&a.result&&a.result.records){let m=f.name.replace("__c","");u=a.result.records.filter(w=>w.Display&&w.Display.includes(m)).map(w=>({action:w.Action,display:w.Display,author:w.CreatedBy?w.CreatedBy.Name:"Unknown",time:new Date(w.CreatedDate).toLocaleString()})).slice(0,10)}}catch(l){console.error("Audit trail query error:",l)}})}catch(n){console.error("Salesforce query error:",n)}else c="Unsupported Metadata Type",d="N/A";return{fileName:o,gitHistory:i,sfAuthor:c,sfTime:d,sfCreatedBy:g,auditHistory:u}}function ro(e){let t=e.replace(/\\/g,"/");if(t.includes("/classes/")){let o=t.match(/\/classes\/([^/.]+)\.cls/);if(o)return{type:"ApexClass",name:o[1]}}if(t.includes("/triggers/")){let o=t.match(/\/triggers\/([^/.]+)\.trigger/);if(o)return{type:"ApexTrigger",name:o[1]}}if(t.includes("/lwc/")){let o=t.match(/\/lwc\/([^/]+)\//);if(o)return{type:"LightningComponentBundle",name:o[1]}}if(t.includes("/aura/")){let o=t.match(/\/aura\/([^/]+)\//);if(o)return{type:"AuraDefinitionBundle",name:o[1]}}if(t.includes("/objects/")&&t.includes("/fields/")){let o=t.match(/\/objects\/([^/]+)\//),s=t.match(/\/fields\/([^/.]+)\.field/);if(o&&s)return{type:"CustomField",name:`${o[1]}.${s[1]}`}}return null}var de,Vt,_t=k(()=>{"use strict";de=b(require("vscode")),Vt=b(require("path"));C()});async function Jt(){let e=y();if(!e){U.window.showErrorMessage("Ricwiz: Open a workspace that is a Git repository.");return}let o=U.workspace.getConfiguration("ricwiz").get("ticketSourceBranch","main");await U.window.withProgress({location:U.ProgressLocation.Notification,title:`Ricwiz: Finding deleted files compared to origin/${o}...`,cancellable:!1},async()=>{try{let{stdout:s}=await p(`git diff --name-only --diff-filter=D origin/${o}...HEAD`,{cwd:e}),i=s.split(`
`).map(r=>r.trim()).filter(r=>r.length>0);if(i.length===0){U.window.showInformationMessage(`Ricwiz: No deleted files found compared to origin/${o}.`);return}let c={},d=(r,a)=>{c[r]||(c[r]=[]),c[r].includes(a)||c[r].push(a)};for(let r of i){let a=r.replace(/\\/g,"/");if(a.includes("/classes/")){let m=a.match(/\/classes\/([^/.]+)\.cls/);m&&d("ApexClass",m[1])}else if(a.includes("/triggers/")){let m=a.match(/\/triggers\/([^/.]+)\.trigger/);m&&d("ApexTrigger",m[1])}else if(a.includes("/lwc/")){let m=a.match(/\/lwc\/([^/]+)\//);m&&d("LightningComponentBundle",m[1])}else if(a.includes("/aura/")){let m=a.match(/\/aura\/([^/]+)\//);m&&d("AuraDefinitionBundle",m[1])}else if(a.includes("/objects/")&&a.includes("/fields/")){let m=a.match(/\/objects\/([^/]+)\//),h=a.match(/\/fields\/([^/.]+)\.field/);m&&h&&d("CustomField",`${m[1]}.${h[1]}`)}else if(a.includes("/objects/")){let m=a.match(/\/objects\/([^/.]+)\.object/);m&&d("CustomObject",m[1])}else if(a.includes("/layouts/")){let m=a.match(/\/layouts\/([^/.]+)\.layout/);m&&d("Layout",m[1])}else if(a.includes("/flows/")){let m=a.match(/\/flows\/([^/.]+)\.flow/);m&&d("Flow",m[1])}else if(a.includes("/permissionsets/")){let m=a.match(/\/permissionsets\/([^/.]+)\.permissionset/);m&&d("PermissionSet",m[1])}else if(a.includes("/profiles/")){let m=a.match(/\/profiles\/([^/.]+)\.profile/);m&&d("Profile",m[1])}else if(a.includes("/customMetadata/")){let m=a.match(/\/customMetadata\/([^/.]+)\.md/);m&&d("CustomMetadata",m[1])}else if(a.includes("/flexipages/")){let m=a.match(/\/flexipages\/([^/.]+)\.flexipage/);m&&d("FlexiPage",m[1])}}if(Object.keys(c).length===0){U.window.showInformationMessage("Ricwiz: Found deleted files in Git, but none mapped to recognizable Salesforce metadata.");return}let g=`<?xml version="1.0" encoding="UTF-8"?>
<Package xmlns="http://soap.sforce.com/2006/04/metadata">
`;for(let r of Object.keys(c).sort()){g+=`    <types>
`;for(let a of c[r].sort())g+=`        <members>${a}</members>
`;g+=`        <name>${r}</name>
    </types>
`}g+=`    <version>58.0</version>
</Package>`;let u=Te.join(e,"destructiveChanges");ie.existsSync(u)||ie.mkdirSync(u);let f=Te.join(u,"destructiveChanges.xml"),n=Te.join(u,"package.xml");ie.writeFileSync(f,g,"utf8"),ie.existsSync(n)||ie.writeFileSync(n,`<?xml version="1.0" encoding="UTF-8"?>
<Package xmlns="http://soap.sforce.com/2006/04/metadata">
    <version>58.0</version>
</Package>`,"utf8");let l=await U.workspace.openTextDocument(f);await U.window.showTextDocument(l),U.window.showInformationMessage("Ricwiz: destructiveChanges.xml generated successfully!")}catch(s){U.window.showErrorMessage(`Ricwiz: Error generating destructive changes: ${s.message}`)}})}var U,Te,ie,Qt=k(()=>{"use strict";U=b(require("vscode")),Te=b(require("path")),ie=b(require("fs"));C()});async function Yt(){let e=y();if(!e)return;let o=Z.workspace.getConfiguration("ricwiz").get("ticketSourceBranch","main");await Z.window.withProgress({location:Z.ProgressLocation.Notification,title:"Ricwiz: Finding Apex Tests to run...",cancellable:!1},async()=>{try{let{stdout:s}=await p(`git diff --name-status origin/${o}...HEAD`,{cwd:e}),i=s.split(`
`).map(r=>r.trim()).filter(r=>r.length>0),c=new Set,d=new Set;for(let r of i){let a=r.split(/\s+/);if(a[0].startsWith("D"))continue;let m=a[1];if(m&&m.endsWith(".cls")){let h=m.match(/\/classes\/([^/.]+)\.cls/);if(h){let w=h[1];w.toLowerCase().endsWith("test")?c.add(w):d.add(w)}}}for(let r of d)c.add(`${r}Test`);if(c.size===0){Z.window.showInformationMessage("Ricwiz: No Apex Classes were modified in this branch.");return}let g=Array.from(c).map(r=>({label:`$(beaker) ${r}`,description:"Apex Test Class"})),u=await Z.window.showQuickPick(g,{canPickMany:!0,title:"Select Test Classes to Run",placeHolder:"Select tests..."});if(!u||u.length===0)return;let n=`sf apex run test -n ${u.map(r=>r.label.replace("$(beaker) ","").trim()).join(",")} -r human -w 30`,l=Z.window.createTerminal("Ricwiz: Smart Tests");l.show(),l.sendText(n)}catch(s){Z.window.showErrorMessage(`Ricwiz: Error finding tests: ${s.message}`)}})}var Z,Zt=k(()=>{"use strict";Z=b(require("vscode"));C()});var ze={};Le(ze,{activate:()=>ao,deactivate:()=>co,webviewProvider:()=>L});module.exports=ue(ze);function ao(e){L=new $e(e.extensionUri),e.subscriptions.push(v.window.registerWebviewViewProvider("ricwiz-webview",L));let t=v.window.createStatusBarItem(v.StatusBarAlignment.Left,100);t.command="ricwiz.openJiraTicket",e.subscriptions.push(t);let o,s=v.workspace.getConfiguration("ricwiz").get("autoRefresh",!0);L.setAutoRefresh(s),e.subscriptions.push(v.workspace.onDidChangeConfiguration(c=>{if(c.affectsConfiguration("ricwiz.autoRefresh")){let d=v.workspace.getConfiguration("ricwiz").get("autoRefresh",!0);L?.setAutoRefresh(d)}}));async function i(){let c=v.extensions.getExtension("vscode.git");if(c){let u=function(f){let n="",l;async function r(){let m=v.workspace.workspaceFolders;if(!m)return;let h=m[0].uri.fsPath,w=await A(h);if(w&&w!==n){n=w;let R=v.workspace.getConfiguration("ricwiz"),$=R.get("ticketPrefix","SFPSCA-");if(!w.includes($)){let D=w.match(/([A-Z]+-)\d+/i);D&&($=D[1].toUpperCase())}let T=[],le=[],fe=[],me=[],B=R.get("environments",[{name:"Qual",sourceBranch:"quality"},{name:"Val",sourceBranch:"validation"},{name:"Prod",sourceBranch:"main"}]);try{let re=[R.get("ticketSourceBranch","main"),...B.map(ae=>ae.sourceBranch)];fe=Array.from(new Set(re))}catch{}let N=w.match(new RegExp(`(${$}\\d+(?:-\\d+)?)`,"i"));if(N){let D=N[1].toUpperCase(),re=R.get("commitMessageSuffix","- "),ae=/^[A-Z]+-\d+(?:-\d+)?\s*(?:-\s*|:\s*|\s+)?/i;ae.test(f.inputBox.value)?f.inputBox.value.toUpperCase().startsWith(D)||(f.inputBox.value=f.inputBox.value.replace(ae,`${D}${re}`)):f.inputBox.value=`${D}${re}`+f.inputBox.value,t.text=`$(bookmark) ${D}`,t.tooltip=`Branch: ${w}
Click to open Jira ticket`,t.show();try{let he=await Ye(h,D,w);T=await Ge(h,he,D,B)}catch{}}else{t.hide();try{me=await Qe(h)}catch{}}let[ne,se]=await Promise.all([Je(h,10),_e(h,w,B)]);le=ne,L?.updateBranch(w,se,T,le,fe,me)}}function a(){L?.isAutoRefreshEnabled()&&(l&&clearTimeout(l),l=setTimeout(()=>{n="",r()},300))}o=()=>{n="",r()},r(),f.state.onDidChange(()=>a()),v.window.onDidChangeWindowState(m=>{m.focused&&a()})};var d=u;c.isActive||await c.activate();let g=c.exports.getAPI(1);g.repositories.length>0&&g.repositories.forEach(f=>u(f)),g.onDidOpenRepository(f=>u(f))}}i(),e.subscriptions.push(v.commands.registerCommand("ricwiz.generateDestructiveChanges",Jt),v.commands.registerCommand("ricwiz.runSmartTests",Yt),v.commands.registerCommand("ricwiz.refreshWebview",()=>{L&&v.commands.executeCommand("workbench.action.webview.reloadWebviewAction")}),v.commands.registerCommand("ricwiz.createBranches",tt),v.commands.registerCommand("ricwiz.prepareDeploy",st),v.commands.registerCommand("ricwiz.createMergeRequests",ct),v.commands.registerCommand("ricwiz.createMergeRequestsVSCode",dt),v.commands.registerCommand("ricwiz.openJiraTicket",ut),v.commands.registerCommand("ricwiz.openJiraTicketVSCode",pt),v.commands.registerCommand("ricwiz.syncAll",ft),v.commands.registerCommand("ricwiz.updateBases",wt),v.commands.registerCommand("ricwiz.deleteUnusedBranches",yt),v.commands.registerCommand("ricwiz.checkoutBranch",ge),v.commands.registerCommand("ricwiz.copyBranchName",xt),v.commands.registerCommand("ricwiz.generatePackageXml",$t),v.commands.registerCommand("ricwiz.deployPackage",zt),v.commands.registerCommand("ricwiz.importData",St),v.commands.registerCommand("ricwiz.listTicketFiles",Mt),v.commands.registerCommand("ricwiz.resetTracking",Dt),v.commands.registerCommand("ricwiz.extractComponent",At),v.commands.registerCommand("ricwiz.deployMultiOrg",It),v.commands.registerCommand("ricwiz.captureAdminChanges",Ut),v.commands.registerCommand("ricwiz.openHistory",jt),v.commands.registerCommand("ricwiz.searchTicket",qt),v.commands.registerCommand("ricwiz.whoToBlame",async()=>{let c=await Gt();c&&L&&(L.setBlameData(c),L.setPage("blame"))}),v.commands.registerCommand("ricwiz.manualRefresh",()=>{o&&o()}),v.commands.registerCommand("ricwiz.toggleAutoRefresh",()=>{if(L){let c=!L.isAutoRefreshEnabled();L.setAutoRefresh(c),v.workspace.getConfiguration("ricwiz").update("autoRefresh",c,v.ConfigurationTarget.Global)}}),v.commands.registerCommand("ricwiz.openSettings",()=>{v.commands.executeCommand("workbench.action.openSettings","ricwiz")}))}function co(){}var v,L,Be=k(()=>{v=b(require("vscode"));C();Ze();Xe();ot();rt();lt();gt();ht();vt();bt();Pe();kt();Rt();Bt();Pt();Et();Tt();Ft();Ot();Nt();Wt();Ht();_t();Qt();Zt()});Be();0&&(module.exports={activate,deactivate,webviewProvider});
