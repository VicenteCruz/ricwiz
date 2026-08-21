"use strict";var Kt=Object.create;var Ce=Object.defineProperty;var eo=Object.getOwnPropertyDescriptor;var to=Object.getOwnPropertyNames;var oo=Object.getPrototypeOf,io=Object.prototype.hasOwnProperty;var k=(e,t,o)=>()=>{if(o)throw o[0];try{return e&&(t=e(e=0)),t}catch(s){throw o=[s],s}};var Le=(e,t)=>{for(var o in t)Ce(e,o,{get:t[o],enumerable:!0})},Ie=(e,t,o,s)=>{if(t&&typeof t=="object"||typeof t=="function")for(let i of to(t))!io.call(e,i)&&i!==o&&Ce(e,i,{get:()=>t[i],enumerable:!(s=eo(t,i))||s.enumerable});return e};var b=(e,t,o)=>(o=e!=null?Kt(oo(e)):{},Ie(t||!e||!e.__esModule?Ce(o,"default",{value:e,enumerable:!0}):o,e)),ue=e=>Ie(Ce({},"__esModule",{value:!0}),e);var Ae={};Le(Ae,{checkBranchExists:()=>te,exec:()=>g,extractTicketSuggestion:()=>je,getCurrentBranch:()=>A,getWorkspaceCwd:()=>y,normalizeTicketId:()=>We,promptForTicketId:()=>I,resolvePrefix:()=>Ne,ricwizLogger:()=>M});function y(){let e=pe.workspace.workspaceFolders;if(e)return e[0].uri.fsPath}async function A(e){try{let{stdout:t}=await g("git branch --show-current",{cwd:e});return t.trim()}catch{return""}}function Ne(e,t){if(!e.includes(t)){let o=e.match(/([A-Z]+-)\d+/i);if(o)return o[1].toUpperCase()}return t}function je(e,t,o=!1){let s=e.match(new RegExp(`(${t}\\d+)`,"i"));return s?s[1].toUpperCase():e.includes(t)&&!e.includes("-to-")?e.substring(e.indexOf(t)):o&&e.includes("-to-")?e.substring(e.indexOf(t)).split("-to-")[0]:""}function We(e,t){let o=e.trim();return/^\d/.test(o)?`${t}${o}`.toUpperCase():o.toUpperCase()}async function I(e,t){let o=pe.workspace.getConfiguration("ricwiz"),s=t?.prefix??o.get("ticketPrefix","SFPSCA-"),i=await A(e),a=Ne(i,s),c=je(i,a,t?.handleToSuffix),p=await pe.window.showInputBox({prompt:t?.prompt||"Enter the full ticket ID (e.g., SCPSCA-1234) or just the number",placeHolder:t?.placeHolder||"Ticket ID or number",value:c});return p?{ticketId:We(p,a),currentBranch:i,prefix:a}:void 0}async function te(e,t){try{return await g(`git show-ref --verify --quiet refs/heads/${t}`,{cwd:e}),!0}catch{}try{return await g(`git show-ref --verify --quiet refs/remotes/origin/${t}`,{cwd:e}),!0}catch{}return!1}var pe,Oe,Ue,no,M,g,C=k(()=>{"use strict";pe=b(require("vscode")),Oe=b(require("child_process")),Ue=b(require("util")),no=Ue.promisify(Oe.exec),M=pe.window.createOutputChannel("Ricwiz"),g=async(e,t)=>{M.appendLine(`[EXEC] ${e}`);let o=await no(e,{maxBuffer:50*1024*1024,...t});return{stdout:o.stdout.toString(),stderr:o.stderr.toString()}}});function He(){let e=new Map;function t(s,i){let a=i,c=e.get(a);if(c)return c;let p=(async()=>{try{let{stdout:m}=await g(`git rev-parse origin/${i}`,{cwd:s});return m.trim()}catch{let{stdout:m}=await g(`git rev-parse ${i}`,{cwd:s});return m.trim()}})();return e.set(a,p),p}function o(s,i){let a=`branch:${i}`,c=e.get(a);if(c)return c;let p=(async()=>{let{stdout:m}=await g(`git rev-parse ${i}`,{cwd:s});return m.trim()})();return e.set(a,p),p}return{resolveEnvRef:t,resolveBranchRef:o}}async function qe(e,t,o,s,i){try{if(!(await g(`git --no-pager log ${t} --grep="\\\\b${o}\\\\b" -i -E -1 --format="%h"`,{cwd:e}).catch(()=>({stdout:"",stderr:""}))).stdout.trim())return!1;let[c,p]=await Promise.all([i.resolveBranchRef(e,t),i.resolveEnvRef(e,s.sourceBranch)]);if(c===p)return!1;try{return await g(`git merge-base --is-ancestor ${t} origin/${s.sourceBranch}`,{cwd:e}),!0}catch{try{return await g(`git merge-base --is-ancestor ${t} ${s.sourceBranch}`,{cwd:e}),!0}catch{return!1}}}catch{return!1}}function Ve(e,t){return t.find(o=>e.endsWith(`-to-${o.name}`))}async function Ge(e,t,o,s){let i=He();return await Promise.all(t.map(async c=>{let p=Ve(c,s);if(!p)return{name:c,isMerged:!1};let m=await qe(e,c,o,p,i);return{name:c,isMerged:m}}))}async function _e(e,t,o){let s=Ve(t,o);if(!s)return!1;let i=t.replace(new RegExp(`-to-${s.name}$`,"i"),""),a=He();return qe(e,t,i,s,a)}async function Je(e,t=10){try{let{stdout:o}=await g(`git log --oneline -${t} --format="%h|||%s|||%ar"`,{cwd:e});return o.split(`
`).filter(s=>s.trim()).map(s=>{let i=s.split("|||");return{hash:i[0]||"",message:i.length>=3?i.slice(1,-1).join("|||"):i[1]||"",timeAgo:i.length>=3?i[i.length-1]:""}})}catch{return[]}}async function Qe(e,t=3){try{let{stdout:o}=await g('git for-each-ref --sort=-committerdate --format="%(refname:short)" refs/heads/',{cwd:e}),s=o.split(`
`).map(a=>a.trim()).filter(a=>a),i=/^[A-Z]+-\d+$/i;return s.filter(a=>i.test(a)).slice(0,t)}catch{return[]}}async function Ye(e,t,o){let{stdout:s}=await g(`git branch --list "*${t}*"`,{cwd:e});return s.split(`
`).map(i=>i.replace("*","").trim()).filter(i=>i&&i!==o)}var Ze=k(()=>{"use strict";C()});function S(e){return e.replace(/&/g,"&amp;").replace(/</g,"&lt;").replace(/>/g,"&gt;").replace(/"/g,"&quot;").replace(/'/g,"&#39;")}var x,$e,Xe=k(()=>{"use strict";x=b(require("vscode"));$e=class{constructor(t){this._extensionUri=t}_extensionUri;webviewView;resolveWebviewView(t,o,s){this.webviewView=t,t.webview.options={enableScripts:!0,localResourceRoots:[this._extensionUri]},this.updateBranch("",!1),t.webview.onDidReceiveMessage(i=>{switch(i.command){case"createBranches":x.commands.executeCommand("ricwiz.createBranches");break;case"prepareDeploy":x.commands.executeCommand("ricwiz.prepareDeploy");break;case"openMRs":x.commands.executeCommand("ricwiz.createMergeRequests");break;case"openMRsVSCode":x.commands.executeCommand("ricwiz.createMergeRequestsVSCode");break;case"openJira":x.commands.executeCommand("ricwiz.openJiraTicket");break;case"openJiraVSCode":x.commands.executeCommand("ricwiz.openJiraTicketVSCode");break;case"openSettings":x.commands.executeCommand("ricwiz.openSettings");break;case"checkout":i.branch&&x.commands.executeCommand("ricwiz.checkoutBranch",i.branch);break;case"copyBranch":x.commands.executeCommand("ricwiz.copyBranchName");break;case"generatePackageXml":x.commands.executeCommand("ricwiz.generatePackageXml");break;case"openDevTools":this.setPage("devtools");break;case"openMain":this.setPage("main");break;case"generateDestructiveChanges":x.commands.executeCommand("ricwiz.generateDestructiveChanges");break;case"deployPackage":x.commands.executeCommand("ricwiz.deployPackage");break;case"runSmartTests":x.commands.executeCommand("ricwiz.runSmartTests");break;case"importData":x.commands.executeCommand("ricwiz.importData");break;case"listTicketFiles":x.commands.executeCommand("ricwiz.listTicketFiles");break;case"resetTracking":x.commands.executeCommand("ricwiz.resetTracking");break;case"extractComponent":x.commands.executeCommand("ricwiz.extractComponent");break;case"deployMultiOrg":x.commands.executeCommand("ricwiz.deployMultiOrg");break;case"captureAdminChanges":x.commands.executeCommand("ricwiz.captureAdminChanges");break;case"whoToBlame":x.commands.executeCommand("ricwiz.whoToBlame");break;case"syncAll":x.commands.executeCommand("ricwiz.syncAll");break;case"updateBases":x.commands.executeCommand("ricwiz.updateBases");break;case"deleteUnused":x.commands.executeCommand("ricwiz.deleteUnusedBranches");break;case"conflict_commitAndContinue":x.commands.executeCommand("ricwiz.conflictAction","commitAndContinue");break;case"conflict_resolveDeletions":x.commands.executeCommand("ricwiz.conflictAction","resolveDeletions");break;case"conflict_abortDeploy":x.commands.executeCommand("ricwiz.conflictAction","abortDeploy");break;case"openFile":if(i.file){let a=x.workspace.workspaceFolders;if(a){let c=x.Uri.joinPath(a[0].uri,i.file);x.commands.executeCommand("vscode.open",c)}}break;case"searchTicket":x.commands.executeCommand("ricwiz.searchTicket");break;case"manualRefresh":x.commands.executeCommand("ricwiz.manualRefresh");break;case"toggleAutoRefresh":x.commands.executeCommand("ricwiz.toggleAutoRefresh");break;case"openHistory":x.commands.executeCommand("ricwiz.openHistory");break}})}conflictState=null;setConflictState(t){this.conflictState=t,this.updateView()}updateBranch(t,o,s=[],i=[],a=[],c=[]){this.webviewView&&(this.currentBranchCache=t,this.currentBranchIsMergedCache=o,this.relatedBranchesCache=s,this.commitsCache=i,this.baseBranchesCache=a,this.recentTicketsCache=c,this.updateView())}currentBranchCache="";currentBranchIsMergedCache=!1;relatedBranchesCache=[];commitsCache=[];baseBranchesCache=[];recentTicketsCache=[];currentPage="main";blameDataCache=null;autoRefreshEnabled=!0;setBlameData(t){this.blameDataCache=t}setAutoRefresh(t){this.autoRefreshEnabled=t,this.updateView()}isAutoRefreshEnabled(){return this.autoRefreshEnabled}setPage(t){this.currentPage=t,this.updateView()}updateView(){if(!this.webviewView)return;let t=this.webviewView.webview.asWebviewUri(x.Uri.joinPath(this._extensionUri,"resources","logo.png"));this.webviewView.webview.html=this._getHtmlForWebview(t,this.currentBranchCache,this.relatedBranchesCache,this.commitsCache,this.baseBranchesCache,this.recentTicketsCache,this.currentPage)}_getHtmlForWebview(t,o,s,i,a,c,p){let m=i.length>0?`
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
        `;if(this.conflictState){let n=(this.conflictState.files||[]).map(d=>`
                <button class="btn" style="padding: 6px; font-size: 12px; display: flex; justify-content: space-between; align-items: center;" onclick="sendOpenFileCommand('${S(d.file)}')">
                    <span style="flex: 1; overflow: hidden; text-overflow: ellipsis; white-space: nowrap; direction: rtl; text-align: left;">&lrm;${S(d.file)}</span>
                    <span style="font-size: 10px; opacity: 0.8; flex-shrink: 0; background-color: var(--vscode-badge-background); color: var(--vscode-badge-foreground); padding: 2px 4px; border-radius: 2px;">${S(d.state)}</span>
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
            </html>`}if(p==="blame"){let n=this.blameDataCache;return`<!DOCTYPE html>
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
                            ${n.gitHistory&&n.gitHistory.length>0?n.gitHistory.map(d=>`
                                <li style="background: var(--vscode-editorWidget-background); border: 1px solid var(--vscode-widget-border); padding: 8px 10px; border-radius: 4px; border-left: 4px solid var(--vscode-gitDecoration-modifiedResourceForeground);">
                                    <div style="display: flex; justify-content: space-between; margin-bottom: 4px; align-items: center;">
                                        <strong style="font-size: 13px;">${d.author}</strong>
                                        <span style="opacity: 0.7; font-size: 11px;">${d.time}</span>
                                    </div>
                                    <div style="font-size: 12px; margin-bottom: 6px; opacity: 0.9; font-style: italic;">"${d.message}"</div>
                                    <div style="font-family: monospace; font-size: 10px; opacity: 0.6;">Commit: ${d.hash}</div>
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
                            ${n.auditHistory&&n.auditHistory.length>0?n.auditHistory.map(d=>`
                                <li style="background: var(--vscode-editorWidget-background); border: 1px solid var(--vscode-widget-border); padding: 8px 10px; border-radius: 4px; border-left: 4px solid var(--vscode-gitDecoration-untrackedResourceForeground);">
                                    <div style="display: flex; justify-content: space-between; margin-bottom: 4px; align-items: center;">
                                        <strong style="font-size: 13px;">${d.author}</strong>
                                        <span style="opacity: 0.7; font-size: 11px;">${d.time}</span>
                                    </div>
                                    <div style="font-size: 12px; font-weight: 500; margin-bottom: 4px;">${d.action}</div>
                                    <div style="font-size: 11px; opacity: 0.7; font-style: italic; background: var(--vscode-editor-background); padding: 4px; border-radius: 3px;">${d.display}</div>
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
                    `:c.length>0?`
                        <div style="margin-top: 8px; border-top: 1px solid var(--vscode-panel-border); padding-top: 8px;">
                            <div style="font-size: 10px; opacity: 0.7; margin-bottom: 4px;">Recent Tickets</div>
                            <div style="display: flex; flex-direction: column; gap: 4px;">
                                ${c.map(n=>`
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

            ${a.length>0?`
                <div style="display: flex; gap: 4px; margin-bottom: 12px; flex-wrap: wrap; justify-content: center;">
                    ${a.map(n=>`
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

            ${m}

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
        </html>`}}});var ce,Ke=k(()=>{"use strict";ce=class{static isValidShellArg(t){return t?/^[a-zA-Z0-9\-_/.]+$/.test(t):!1}}});var ye,et,Re,j,ge=k(()=>{"use strict";ye=b(require("vscode")),et=b(require("path")),Re=b(require("fs")),j=class e{style;upstreamRemote;originRemote;ticketSourceBranch;ticketPrefix;environments;static baseConfig=ye.workspace.getConfiguration("ricwiz");constructor(t){let o=e.baseConfig;this.style=t?.workflowStyle||o.get("workflowStyle","standard"),this.style==="multi-remote"?(this.upstreamRemote=t?.upstreamRemote||o.get("upstreamRemote","salesforce-master"),this.originRemote=t?.originRemote||o.get("originRemote","origin")):(this.upstreamRemote="origin",this.originRemote="origin"),this.ticketSourceBranch=t?.ticketSourceBranch||o.get("ticketSourceBranch","main"),this.ticketPrefix=t?.ticketPrefix||o.get("ticketPrefix","SFPSCA-");let s=[{name:"Qual",sourceBranch:"quality"},{name:"Val",sourceBranch:"validation"},{name:"Prod",sourceBranch:"main"}];this.environments=t?.environments||o.get("environments",s)}static async initialize(t){let o=e.baseConfig.get("profiles",[]),s=et.join(t,"ricwiz.json");if(Re.existsSync(s))try{let i=Re.readFileSync(s,"utf-8"),a=JSON.parse(i);a&&Array.isArray(a.profiles)&&(o=[...o,...a.profiles])}catch(i){ye.window.showErrorMessage(`Ricwiz: Error parsing ricwiz.json: ${i.message}`)}if(o.length>0){let i=o.map(p=>p.name),a=await ye.window.showQuickPick(i,{placeHolder:"Ricwiz: Select Workflow Profile",ignoreFocusOut:!0});if(!a)return;let c=o.find(p=>p.name===a);return new e(c)}return new e}buildUpstreamPath(t){return t.includes("/")?t:`${this.upstreamRemote}/${t}`}getFetchRemote(t){return t.includes("/")?t.split("/")[0]:this.upstreamRemote}getFetchBranch(t){return t.includes("/")?t.substring(t.indexOf("/")+1):t}}});async function tt(){let e=y();if(!e){P.window.showErrorMessage("Open a folder or workspace that is a Git repository.");return}let t=await j.initialize(e);if(!t)return;let o=await I(e,{prefix:t.ticketPrefix});if(!o){P.window.showErrorMessage("Branch creation cancelled: Ticket not provided.");return}let{ticketId:s}=o,i=t.environments,a="all";if(i.length>0){let m=[{label:"Create Main Branch & Environments",description:"Creates the main ticket branch and all environment branches",value:"all"},{label:"Create Environments Only",description:"Creates only the environment branches (skip main branch)",value:"envs"}],f=await P.window.showQuickPick(m,{placeHolder:"What branches do you want to create?",title:"Ricwiz Branch Creation"});if(!f){P.window.showInformationMessage("Branch creation cancelled.");return}a=f.value}let c=t.ticketSourceBranch,p=s;if(!ce.isValidShellArg(p)){P.window.showErrorMessage(`Invalid format for ticket ID: ${p}`);return}if(!ce.isValidShellArg(c)){P.window.showErrorMessage(`Invalid format for ticketSourceBranch in settings: ${c}`);return}for(let m of i){if(!ce.isValidShellArg(m.name)){P.window.showErrorMessage(`Invalid format for environment name in settings: ${m.name}`);return}if(!ce.isValidShellArg(m.sourceBranch)){P.window.showErrorMessage(`Invalid format for environment sourceBranch in settings: ${m.sourceBranch}`);return}}try{await g("git status",{cwd:e})}catch{P.window.showErrorMessage("The opened folder does not appear to be a valid Git repository.");return}try{await P.window.withProgress({location:P.ProgressLocation.Notification,title:"Ricwiz: Creating Branches",cancellable:!1},async m=>{let f=[];m.report({message:"Checking remote status (git fetch)...",increment:10});try{await g("git fetch",{cwd:e})}catch{}try{if(a==="all")if(m.report({message:`Creating main branch ${p}...`,increment:10}),await te(e,p))P.window.showInformationMessage(`Ricwiz: The branch ${p} already exists. Skipping creation...`),await g(`git checkout ${p}`,{cwd:e});else try{let d=t.getFetchRemote(c),r=t.getFetchBranch(c),l=t.buildUpstreamPath(c);await g(`git fetch ${d} ${r}`,{cwd:e}),await g(`git checkout -b ${p} ${l}`,{cwd:e}),f.push(p)}catch{try{await g(`git checkout -b ${p} ${c}`,{cwd:e}),f.push(p)}catch{throw new Error(`Could not create main branch '${p}' from '${c}'. Does the source branch exist?`)}}let n=50/(i.length||1);for(let d of i){let r=`${s}-to-${d.name}`,l=d.sourceBranch;if(m.report({message:`Processing environment branch ${r}...`,increment:n}),!await te(e,r))try{let u=t.buildUpstreamPath(l);await g(`git checkout -b ${r} ${u}`,{cwd:e}),f.push(r)}catch{try{await g(`git checkout -b ${r} ${l}`,{cwd:e}),f.push(r)}catch{throw new Error(`Could not create environment branch '${r}' from '${l}'. Does the source branch exist?`)}}}m.report({message:`Publishing branches to ${t.originRemote}...`,increment:10});for(let d of f)try{await g(`git push -u ${t.originRemote} ${d}`,{cwd:e})}catch{P.window.showWarningMessage(`Ricwiz: Branch ${d} was created locally but could not be pushed to ${t.originRemote}.`)}if(a==="all"){m.report({message:`Switching to ${p}...`,increment:10});try{await g(`git checkout ${p}`,{cwd:e})}catch{}}m.report({increment:100}),P.window.showInformationMessage("Ricwiz: All set! You can start working on your branches! \u{1F680}")}catch(n){if(P.window.showErrorMessage(`Ricwiz Branch Creation Failed: ${n.message}`),f.length>0){try{await g(`git checkout ${c}`,{cwd:e})}catch{}for(let d of f)try{await g(`git branch -D ${d}`,{cwd:e})}catch{}P.window.showWarningMessage(`Ricwiz: Rolled back (deleted) ${f.length} branch(es) locally due to failure.`)}}})}catch(m){P.window.showErrorMessage(`Ricwiz general error: ${m.message}`)}}var P,ot=k(()=>{"use strict";P=b(require("vscode"));C();Ke();ge()});async function oe(e,t,o,s){s&&s.report({message:"CONFLICT! Resolve & click 'Commit & Continue' in Ricwiz panel."});let i=!1,a=!1,c=async()=>{try{let{stdout:n}=await g("git status --porcelain",{cwd:e});return n.split(`
`).filter(d=>{let r=d.substring(0,2);return["UD","DU","DD","AU","UA"].includes(r)}).map(d=>d.substring(3).trim())}catch{return[]}},p=async()=>{try{let{stdout:n}=await g("git status --porcelain",{cwd:e}),d=r=>r==="UU"?"Both Modified":r==="UD"?"Deleted by them":r==="DU"?"Deleted by us":r==="DD"?"Both Deleted":r==="AA"?"Both Added":r==="AU"?"Added by us":r==="UA"?"Added by them":"Conflicted";return n.split(`
`).map(r=>r.trimRight()).filter(r=>r.length>2).filter(r=>{let l=r.substring(0,2);return["UU","AA","UD","DU","AU","UA","DD"].includes(l)}).map(r=>{let l=r.substring(0,2);return{file:r.substring(3).trim(),state:d(l)}})}catch{return[]}},m=async()=>{if(i)return;let n=await c(),d=await p(),{webviewProvider:r}=(Be(),ue(ze));r&&r.setConflictState({isConflict:!0,sourceStr:t,targetStr:o,deletionsCount:n.length,files:d})},f=Y.commands.registerCommand("ricwiz.conflictAction",async n=>{if(n==="abortDeploy")a=!0;else if(n==="resolveDeletions"){try{let r=(await c()).map(u=>({label:u})),l=await Y.window.showQuickPick(r,{canPickMany:!0,placeHolder:"Select conflicted files to DELETE",title:"Ricwiz: Delete Conflicted Files"});if(l&&l.length>0){for(let u of l)try{await g(`git rm --force "${u.label}"`,{cwd:e})}catch{}Y.window.showInformationMessage(`Ricwiz: Deleted ${l.length} conflicted file(s).`)}}catch(d){Y.window.showErrorMessage(`Ricwiz: Error. (${d.message})`)}m()}else if(n==="commitAndContinue")try{let r=(await c()).filter(u=>it.existsSync(nt.join(e,u)));if(r.length>0&&await Y.window.showWarningMessage(`Wait! There are ${r.length} file(s) with deletion conflicts that are still on your disk.

If you commit now, you will KEEP them in the project.

Are you sure you want to KEEP them?`,{modal:!0},"Yes, KEEP them","No, let me DELETE them")!=="Yes, KEEP them"){m();return}let l=!1;try{let{stdout:u}=await g('git grep -E "^<<<<<<< "',{cwd:e});u.trim().length>0&&(l=!0)}catch{}if(l){Y.window.showErrorMessage("Ricwiz: You still have unresolved conflict markers (<<<<<<<) in your files. Please resolve them first!"),m();return}await g("git add .",{cwd:e}),await g("git commit --no-edit",{cwd:e})}catch(d){Y.window.showErrorMessage(`Ricwiz: Could not commit automatically. (${d.message})`),m()}});for(m();;){if(a){i=!0,f.dispose(),(Be(),ue(ze)).webviewProvider?.setConflictState(null);try{await g("git merge --abort",{cwd:e})}catch{}return!1}try{let{stdout:n}=await g("git status --porcelain",{cwd:e});if(n.trim().length===0)return i=!0,f.dispose(),(Be(),ue(ze)).webviewProvider?.setConflictState(null),Y.window.showInformationMessage("Ricwiz: Changes committed!"),!0}catch{}await new Promise(n=>setTimeout(n,2e3))}}var Y,it,nt,Se=k(()=>{"use strict";Y=b(require("vscode")),it=b(require("fs")),nt=b(require("path"));C()});async function st(){let e=y();if(!e){O.window.showErrorMessage("Ricwiz: Open a folder or workspace that is a Git repository.");return}try{await g("git status",{cwd:e})}catch{O.window.showErrorMessage("Ricwiz: The opened folder does not appear to be a valid Git repository.");return}let t=await j.initialize(e);if(!t)return;let o=t.environments,s=await I(e,{prefix:t.ticketPrefix});if(!s){O.window.showErrorMessage("Operation cancelled: Ticket not provided.");return}let{ticketId:i,currentBranch:a}=s,c=i;if(!await te(e,c)){O.window.showErrorMessage(`Ricwiz: Main branch '${c}' does not exist! Prepare deploy is only available when a main ticket branch is used.`);return}await O.window.withProgress({location:O.ProgressLocation.Notification,title:"Ricwiz: Preparing Deploy",cancellable:!0},async(p,m)=>{let f=0,n=a,d=!1;m.onCancellationRequested(()=>{d=!0}),p.report({message:"Syncing remote information...",increment:10});try{await g("git fetch --all",{cwd:e});let l=10/(o.length||1);for(let u of o)try{if(d)throw new Error("Aborted");p.report({message:`Fetching ${u.sourceBranch}...`,increment:l});let w=t.getFetchRemote(u.sourceBranch),h=t.getFetchBranch(u.sourceBranch);await g(`git fetch ${w} ${h}:${h}`,{cwd:e})}catch{}}catch{}let r=60/(o.length||1);for(let l of o){if(d)break;let u=`${i}-to-${l.name}`,w=l.sourceBranch;try{p.report({message:`Processing ${u}...`,increment:r/4}),await g(`git checkout ${u}`,{cwd:e});try{await g(`git pull ${t.originRemote} ${u}`,{cwd:e})}catch{}try{p.report({message:`Merging ${w} into ${u}...`,increment:r/4});let h=t.getFetchRemote(w),R=t.getFetchBranch(w),$=t.buildUpstreamPath(w);await g(`git fetch ${h} ${R}`,{cwd:e}),await g(`git merge ${$}`,{cwd:e})}catch(h){let R=!1;try{let{stdout:T}=await g("git ls-files -u",{cwd:e});T.trim().length>0&&(R=!0)}catch{}let $=((h.stdout||"")+(h.stderr||"")+(h.message||"")).toLowerCase();if(R||$.includes("conflict")||$.includes("conflit")){let T=t.buildUpstreamPath(w);if(!await oe(e,T,u,p))throw d=!0,new Error("Deploy aborted by user.")}else throw h}try{p.report({message:`Merging ${c} into ${u}...`,increment:r/4}),await g(`git merge ${c}`,{cwd:e})}catch(h){let R=!1;try{let{stdout:T}=await g("git ls-files -u",{cwd:e});T.trim().length>0&&(R=!0)}catch{}let $=((h.stdout||"")+(h.stderr||"")+(h.message||"")).toLowerCase();if(R||$.includes("conflict")||$.includes("conflit")){if(!await oe(e,c,u,p))throw d=!0,new Error("Deploy aborted by user.")}else throw h}if(d)break;p.report({message:`Pushing ${u}...`,increment:r/4}),await g(`git push ${t.originRemote} ${u}`,{cwd:e}),f++}catch(h){h.message.includes("aborted")?O.window.showInformationMessage("Ricwiz: Deploy cancelled."):O.window.showErrorMessage(`Ricwiz: Failed to process branch ${u}. Detail: ${h.message}`);return}}if(!d){p.report({message:"Finishing up...",increment:10});let l=n;try{await g(`git show-ref --verify --quiet refs/heads/${c}`,{cwd:e}),l=c}catch{}try{let u=await A(e);l&&l!==u?(await g(`git checkout ${l}`,{cwd:e}),O.window.showInformationMessage(`Ricwiz: Operation complete. Back on branch ${l}.`)):O.window.showInformationMessage("Ricwiz: Operation complete.")}catch{O.window.showInformationMessage("Ricwiz: Operation complete.")}}})}var O,rt=k(()=>{"use strict";O=b(require("vscode"));C();Se();ge()});async function at(e=!1){let t=y();if(!t)return;let o=await j.initialize(t);if(!o)return;let s=await I(t,{prompt:"Enter the full ticket ID for the Merge Requests (e.g., SCPSCA-1234) or just the number"});if(!s)return;let{ticketId:i}=s,c=_.workspace.getConfiguration("ricwiz").get("gitlabUrlOverride",""),p="";if(c&&c.trim()!=="")p=c.trim();else{let f="";try{let{stdout:n}=await g("git remote get-url origin",{cwd:t});f=n.trim()}catch{_.window.showErrorMessage("Ricwiz: Could not get the remote origin URL. Please configure the URL manually in the extension settings.");return}p=f,p.endsWith(".git")&&(p=p.slice(0,-4)),p.startsWith("git@")&&(p=p.replace("git@","").replace(":","/"),p=`https://${p}`)}let m=[];if(o.environments.length===0)m.push({source:i,target:o.ticketSourceBranch});else for(let f of o.environments)m.push({source:`${i}-to-${f.name}`,target:f.sourceBranch});for(let f of m){let n=`${p}/-/merge_requests/new?merge_request[source_branch]=${f.source}&merge_request[target_branch]=${f.target}`;e?_.commands.executeCommand("simpleBrowser.show",n):_.env.openExternal(_.Uri.parse(n))}_.window.showInformationMessage(`Ricwiz: Opening ${e?"VS Code browser":"external browser"} for Merge Requests!`)}async function ct(){return at(!1)}async function dt(){return at(!0)}var _,lt=k(()=>{"use strict";_=b(require("vscode"));C();ge()});async function mt(e=!1){let t=y();if(!t)return;let o=J.workspace.getConfiguration("ricwiz"),s=o.get("jiraUrl","");if(!s||s.trim()===""){J.window.showErrorMessage("Ricwiz: Jira URL is not configured. Please set it in the extension settings (e.g., https://jira.company.com/browse/).");return}let{getCurrentBranch:i,resolvePrefix:a,extractTicketSuggestion:c}=(C(),ue(Ae)),p=await i(t),m=o.get("ticketPrefix","SFPSCA-"),f=a(p,m),d=c(p,f,!0);if(d){let{normalizeTicketId:l}=(C(),ue(Ae));d=l(d,f)}else{let l=await I(t,{prompt:"Ricwiz could not detect the ticket from the branch name. Enter Jira ticket ID (e.g. SFPSCA-1234)",handleToSuffix:!0});if(!l)return;d=l.ticketId}let r=s.trim();r.endsWith("/")||(r+="/"),r+=d,e?J.commands.executeCommand("simpleBrowser.show",r):J.env.openExternal(J.Uri.parse(r)),J.window.showInformationMessage(`Ricwiz: Opening Jira Ticket ${d} in ${e?"VS Code":"browser"}!`)}async function ut(){return mt(!1)}async function pt(){return mt(!0)}var J,gt=k(()=>{"use strict";J=b(require("vscode"));C()});async function ft(){let e=y();if(!e){X.window.showErrorMessage("Ricwiz: Open a folder or workspace that is a Git repository.");return}let t=await j.initialize(e);if(!t)return;let o=await I(e,{prefix:t.ticketPrefix,prompt:"Enter the full ticket ID to sync all branches for (e.g., SCPSCA-1234) or just the number"});if(!o)return;let{ticketId:s,currentBranch:i}=o;await X.window.withProgress({location:X.ProgressLocation.Notification,title:`Ricwiz: Syncing all branches for ${s}...`,cancellable:!1},async a=>{try{a.report({message:"Fetching from remote..."});try{await g("git fetch --all",{cwd:e})}catch{}let{stdout:c}=await g(`git branch --list "*${s}*"`,{cwd:e}),p=c.split(`
`).map(n=>n.replace("*","").trim()).filter(n=>n.length>0);if(p.length===0){X.window.showWarningMessage(`Ricwiz: No local branches found for ${s}.`);return}let m=0,f=0;for(let n of p)if(a.report({message:`Syncing ${n}...`}),n===i)try{await g(`git pull ${t.originRemote} ${n}`,{cwd:e}),m++}catch(d){let r=!1;try{let{stdout:u}=await g("git ls-files -u",{cwd:e});u.trim().length>0&&(r=!0)}catch{}let l=((d.stdout||"")+(d.stderr||"")+(d.message||"")).toLowerCase();(r||l.includes("conflict")||l.includes("conflit"))&&await oe(e,`${t.originRemote}/${n}`,n,a)?m++:f++}else try{await g(`git fetch ${t.originRemote} ${n}:${n}`,{cwd:e}),m++}catch{try{await g(`git checkout ${n}`,{cwd:e});try{await g(`git pull ${t.originRemote} ${n}`,{cwd:e}),m++}catch(r){let l=!1;try{let{stdout:w}=await g("git ls-files -u",{cwd:e});w.trim().length>0&&(l=!0)}catch{}let u=((r.stdout||"")+(r.stderr||"")+(r.message||"")).toLowerCase();(l||u.includes("conflict")||u.includes("conflit"))&&await oe(e,`${t.originRemote}/${n}`,n,a)?m++:f++}await g(`git checkout ${i}`,{cwd:e})}catch{try{await g(`git checkout ${i}`,{cwd:e})}catch{}f++}}f>0?X.window.showWarningMessage(`Ricwiz: Synced ${m}/${p.length} branches. ${f} branch(es) could not be synced (possible conflicts or diverged history).`):X.window.showInformationMessage(`Ricwiz: \u{1F504} All ${m} branches for ${s} are up to date!`)}catch(c){X.window.showErrorMessage(`Ricwiz: Sync failed: ${c.message}`)}})}var X,ht=k(()=>{"use strict";X=b(require("vscode"));C();Se();ge()});async function wt(){let e=y();if(!e){K.window.showErrorMessage("Ricwiz: Open a folder or workspace that is a Git repository.");return}try{await g("git status",{cwd:e})}catch{K.window.showErrorMessage("Ricwiz: The opened folder does not appear to be a valid Git repository.");return}let t=await j.initialize(e);if(!t)return;let o=t.environments,s=await I(e,{prefix:t.ticketPrefix});if(!s)return;let{ticketId:i,currentBranch:a}=s;await K.window.withProgress({location:K.ProgressLocation.Notification,title:"Ricwiz: Updating environment branches from their bases",cancellable:!0},async(c,p)=>{let m=0,f=a,n=!1;p.onCancellationRequested(()=>{n=!0}),c.report({message:"Syncing remote information...",increment:10});try{await g("git fetch --all",{cwd:e})}catch{}let d=80/(o.length||1);for(let r of o){if(n)break;let l=`${i}-to-${r.name}`,u=r.sourceBranch;if(await te(e,l))try{c.report({message:`Processing ${l}...`,increment:d/2}),await g(`git checkout ${l}`,{cwd:e});try{c.report({message:`Merging ${u} into ${l}...`,increment:d/2});let w=t.getFetchRemote(u),h=t.getFetchBranch(u),R=t.buildUpstreamPath(u);await g(`git fetch ${w} ${h}`,{cwd:e}),await g(`git merge ${R}`,{cwd:e})}catch(w){let h=!1;try{let{stdout:$}=await g("git ls-files -u",{cwd:e});$.trim().length>0&&(h=!0)}catch{}let R=((w.stdout||"")+(w.stderr||"")+(w.message||"")).toLowerCase();if(h||R.includes("conflict")||R.includes("conflit")){let $=t.buildUpstreamPath(u);if(!await oe(e,$,l,c))throw n=!0,new Error("Update aborted by user.")}else throw w}if(n)break;m++}catch(w){w.message.includes("aborted")?K.window.showInformationMessage("Ricwiz: Update cancelled."):K.window.showErrorMessage(`Ricwiz: Failed to update branch ${l}. Detail: ${w.message}`);return}}if(!n){c.report({message:"Finishing up...",increment:10});try{let r=await A(e);f&&f!==r&&await g(`git checkout ${f}`,{cwd:e})}catch{}K.window.showInformationMessage(`Ricwiz: Successfully updated ${m} environment branches from their bases!`)}})}var K,vt=k(()=>{"use strict";K=b(require("vscode"));C();Se();ge()});async function yt(){let e=y();if(!e){E.window.showErrorMessage("Ricwiz: Open a folder or workspace that is a Git repository.");return}let t=await A(e),o=E.workspace.getConfiguration("ricwiz");await E.window.withProgress({location:E.ProgressLocation.Notification,title:"Ricwiz: Scanning for unused local branches...",cancellable:!1},async()=>{try{await g("git fetch --prune",{cwd:e})}catch{}let s=[];try{let{stdout:d}=await g('git branch --format="%(refname:short)"',{cwd:e});s=d.split(`
`).map(r=>r.trim()).filter(r=>r.length>0)}catch{}if(s.length===0){E.window.showInformationMessage("Ricwiz: No local branches found.");return}let i=[];try{let{stdout:d}=await g('git branch -r --format="%(refname:short)"',{cwd:e});i=d.split(`
`).map(r=>r.trim().replace(/^origin\//,"").replace(/^[^\/]+\//,"")).filter(r=>r.length>0&&!r.includes("HEAD"))}catch{}let a=[];try{let{stdout:d}=await g('git for-each-ref --format="%(refname:short)|||%(upstream:track)" refs/heads/',{cwd:e});a=d.split(`
`).filter(r=>r.includes("[gone]")).map(r=>r.split("|||")[0].trim())}catch{}let c=s.filter(d=>!i.includes(d));if(c.length===0){E.window.showInformationMessage("Ricwiz: Your local repository is totally clean! All local branches exist on the remote.");return}let p=c.map(d=>{let r=a.includes(d),l=d===t,u="Not found on remote";return r&&(u="Deleted on remote [gone]"),l&&(u+=" (Current branch - will checkout main first)"),{label:d,description:u,picked:r&&!l}}),m=await E.window.showQuickPick(p,{canPickMany:!0,placeHolder:"Select local branches to delete",title:"Ricwiz: Delete Unused Branches"});if(!m||m.length===0){E.window.showInformationMessage("Ricwiz: No branches selected for deletion.");return}if(await E.window.showWarningMessage(`Ricwiz: Delete ${m.length} local branch(es)?
This cannot be undone!`,{modal:!0},"Yes, delete them")!=="Yes, delete them"){E.window.showInformationMessage("Ricwiz: Deletion cancelled.");return}let n=0;for(let d of m){let r=d.label;if(r===t){let l=o.get("ticketSourceBranch","main");try{await g(`git checkout ${l}`,{cwd:e}),t=l}catch{E.window.showWarningMessage(`Ricwiz: Could not switch away from ${r}. Skipping.`);continue}}try{await g(`git branch -D ${r}`,{cwd:e}),n++}catch{E.window.showWarningMessage(`Ricwiz: Could not delete local branch ${r}.`)}}E.window.showInformationMessage(`Ricwiz: \u{1F5D1}\uFE0F Cleaned up ${n} unused local branch(es).`)})}var E,bt=k(()=>{"use strict";E=b(require("vscode"));C()});async function fe(e){let t=y();t&&await ee.window.withProgress({location:ee.ProgressLocation.Notification,title:`Ricwiz: Switching to ${e}...`,cancellable:!1},async()=>{try{let o=await A(t),s=!1;try{let{stdout:i}=await g("git status --porcelain",{cwd:t});s=i.trim().length>0}catch{}if(s&&o)try{await g(`git stash push --include-untracked -m "ricwiz-auto:${o}"`,{cwd:t}),ee.window.showInformationMessage(`Ricwiz: \u{1F4E6} Stashed changes from ${o}`)}catch{ee.window.showWarningMessage("Ricwiz: Could not stash changes. Checkout may fail if there are conflicts.")}await g(`git checkout ${e}`,{cwd:t});try{let{stdout:i}=await g("git stash list",{cwd:t}),a=i.split(`
`);for(let c=0;c<a.length;c++)if(a[c].includes(`ricwiz-auto:${e}`)){let p=a[c].match(/stash@\{(\d+)\}/);p&&(await g(`git stash pop stash@{${p[1]}}`,{cwd:t}),ee.window.showInformationMessage(`Ricwiz: \u{1F4E6} Restored stashed changes on ${e}`));break}}catch{ee.window.showWarningMessage(`Ricwiz: Could not restore stashed changes on ${e}. You may need to resolve conflicts manually (check git stash list).`)}}catch{ee.window.showErrorMessage(`Ricwiz: Could not checkout branch ${e}.`)}})}var ee,Pe=k(()=>{"use strict";ee=b(require("vscode"));C()});async function xt(){let e=y();if(e)try{let{stdout:t}=await g("git branch --show-current",{cwd:e}),o=t.trim();o&&(await be.env.clipboard.writeText(o),be.window.showInformationMessage(`Ricwiz: \u{1F4CB} Copied "${o}" to clipboard`))}catch{be.window.showErrorMessage("Ricwiz: Could not get the current branch name.")}}var be,kt=k(()=>{"use strict";be=b(require("vscode"));C()});async function $t(){let e=y();if(!e){W.window.showErrorMessage("Ricwiz: Open a folder or workspace that is a Git repository.");return}let t=W.workspace.getConfiguration("ricwiz"),o=t.get("ticketSourceBranch","main"),i=t.get("packageXmlCommand",'sf sgd source delta --to "HEAD" --from "origin/{baseBranch}" --output-dir "."').replace("{baseBranch}",o);await W.window.showWarningMessage("Are you sure you want to generate the package.xml? This may overwrite existing local manifest files.",{modal:!0},"Yes, Generate")==="Yes, Generate"&&await W.window.withProgress({location:W.ProgressLocation.Notification,title:"Ricwiz: Generating package.xml using Salesforce CLI...",cancellable:!1},async()=>{try{await g(i,{cwd:e,maxBuffer:10*1024*1024}),W.window.showInformationMessage("Ricwiz: Successfully generated package.xml!");let c=Me.join(e,"package","package.xml"),p=Me.join(e,"package.xml"),m=Me.join(e,"manifest","package.xml");for(let f of[c,p,m])if(Ct.existsSync(f)){let n=await W.workspace.openTextDocument(f);await W.window.showTextDocument(n);break}}catch(c){W.window.showErrorMessage(`Ricwiz: Error running sf command - ${c.message}`)}})}var W,Me,Ct,Rt=k(()=>{"use strict";W=b(require("vscode")),Me=b(require("path")),Ct=b(require("fs"));C()});async function zt(){let e=y();if(!e){H.window.showErrorMessage("Ricwiz: Open a folder or workspace that is a Git repository.");return}let o=H.workspace.getConfiguration("ricwiz").get("deployCommand","sf project deploy start --manifest package/package.xml --post-destructive-changes destructiveChanges/destructiveChanges.xml -c -l NoTestRun -g");await H.window.showWarningMessage("Are you sure you want to deploy to Salesforce? This action modifies your org and cannot be easily undone.",{modal:!0},"Yes, Deploy")==="Yes, Deploy"&&await H.window.withProgress({location:H.ProgressLocation.Notification,title:"Ricwiz: Deploying package...",cancellable:!1},async()=>{try{let{stdout:i,stderr:a}=await g(o,{cwd:e,maxBuffer:52428800}),c=H.window.createOutputChannel("Ricwiz Deploy");c.appendLine(`Executing: ${o}`),c.appendLine(i),a&&(c.appendLine("--- STDERR ---"),c.appendLine(a)),c.show(),H.window.showInformationMessage("Ricwiz: Successfully ran deploy command!")}catch(i){let a=H.window.createOutputChannel("Ricwiz Deploy");a.appendLine(`Error executing: ${o}`),i.stdout&&a.appendLine(i.stdout),i.stderr&&a.appendLine(i.stderr),a.appendLine(i.message),a.show(),H.window.showErrorMessage("Ricwiz: Error running deploy command. See output channel for details.")}})}var H,Bt=k(()=>{"use strict";H=b(require("vscode"));C()});async function St(){let e=y();if(!e){q.window.showErrorMessage("Ricwiz: Open a folder or workspace that is a Git repository.");return}let o=q.workspace.getConfiguration("ricwiz").get("importDataCommand","sfdx force:data:tree:import --plan data/plan.json");await q.window.showWarningMessage("Are you sure you want to import data into Salesforce? This action modifies records in your org.",{modal:!0},"Yes, Import")==="Yes, Import"&&await q.window.withProgress({location:q.ProgressLocation.Notification,title:"Ricwiz: Importing data...",cancellable:!1},async()=>{try{let{stdout:i,stderr:a}=await g(o,{cwd:e,maxBuffer:52428800}),c=q.window.createOutputChannel("Ricwiz Import Data");c.appendLine(`Executing: ${o}`),c.appendLine(i),a&&(c.appendLine("--- STDERR ---"),c.appendLine(a)),c.show(),q.window.showInformationMessage("Ricwiz: Successfully ran import data command!")}catch(i){let a=q.window.createOutputChannel("Ricwiz Import Data");a.appendLine(`Error executing: ${o}`),i.stdout&&a.appendLine(i.stdout),i.stderr&&a.appendLine(i.stderr),a.appendLine(i.message),a.show(),q.window.showErrorMessage("Ricwiz: Error running import data command. See output channel for details.")}})}var q,Pt=k(()=>{"use strict";q=b(require("vscode"));C()});async function Mt(){let e=y();if(!e){V.window.showErrorMessage("Ricwiz: Open a folder or workspace that is a Git repository.");return}let t="";try{t=await A(e)}catch{}let s=V.workspace.getConfiguration("ricwiz").get("ticketSourceBranch","main"),i=await V.window.showInputBox({prompt:`Enter the branch name to list modified files (compared to ${s})`,value:t,placeHolder:"SFPSCA-1234"});i&&await V.window.withProgress({location:V.ProgressLocation.Notification,title:`Ricwiz: Finding files for ${i}...`,cancellable:!1},async()=>{try{let a=i.replace(/-to-[a-zA-Z0-9]+$/i,""),c=[];try{let u="";try{let{stdout:w}=await g(`git merge-base origin/${s} ${i}`,{cwd:e});u=w.trim()}catch{let{stdout:w}=await g(`git merge-base ${s} ${i}`,{cwd:e});u=w.trim()}if(u){let{stdout:w}=await g(`git diff --name-only ${u} ${i}`,{cwd:e,maxBuffer:10485760});c=w.split(`
`).map(h=>h.trim()).filter(h=>h.length>0)}}catch{}let p=[];try{let{stdout:u}=await g(`git --no-pager log --grep="\\b${a}\\b" -i -E --name-only -m --first-parent --format=""`,{cwd:e,maxBuffer:10485760});p=u.split(`
`).map(w=>w.trim()).filter(w=>w.length>0)}catch{}let m=[...c,...p];if(m.length===0){V.window.showInformationMessage(`Ricwiz: No modified files found for ${i}.`);return}let f=Array.from(new Set(m)).sort(),n={};for(let u of f){let w=u.match(/default\/([^/]+)/),h=w&&w[1]?w[1].toUpperCase():"OUTROS";n[h]||(n[h]=[]),n[h].push(u)}let d=`Files modified in branch ${i}:
`,r=Object.keys(n).sort();for(let u of r)d+=`
=== ${u} ===
`,d+=n[u].join(`
`)+`
`;let l=await V.workspace.openTextDocument({content:d,language:"plaintext"});await V.window.showTextDocument(l)}catch(a){V.window.showErrorMessage(`Ricwiz: Error running git log - ${a.message}`)}})}var V,Et=k(()=>{"use strict";V=b(require("vscode"));C()});async function Dt(){let e=y();if(!e){Q.window.showErrorMessage("Ricwiz: Open a folder or workspace that is a Git repository.");return}let o=Q.workspace.getConfiguration("ricwiz").get("resetTrackingCommand","sf org disable tracking && sf project reset tracking --no-prompt");await Q.window.withProgress({location:Q.ProgressLocation.Notification,title:"Ricwiz: Resetting tracking...",cancellable:!1},async()=>{try{let{stdout:s,stderr:i}=await g(o,{cwd:e,maxBuffer:52428800}),a=Q.window.createOutputChannel("Ricwiz Reset Tracking");a.appendLine(`Executing: ${o}`),a.appendLine(s),i&&(a.appendLine("--- STDERR ---"),a.appendLine(i)),a.show(),Q.window.showInformationMessage("Ricwiz: Successfully reset tracking!")}catch(s){let i=Q.window.createOutputChannel("Ricwiz Reset Tracking");i.appendLine(`Error executing: ${o}`),s.stdout&&i.appendLine(s.stdout),s.stderr&&i.appendLine(s.stderr),i.appendLine(s.message),i.show(),Q.window.showErrorMessage("Ricwiz: Error resetting tracking. See output channel for details.")}})}var Q,Tt=k(()=>{"use strict";Q=b(require("vscode"));C()});async function At(){let e=y();if(!e){G.window.showErrorMessage("Ricwiz: Open a workspace first.");return}let t=["ApexClass","ApexTrigger","CustomObject","CustomField","LightningComponentBundle","AuraDefinitionBundle","Flow","CustomLabel","CustomMetadata","StaticResource","Profile","PermissionSet","PermissionSetGroup","Layout","ValidationRule","RecordType","ListView","Report","EmailTemplate","Other (Type manually)..."],o=await G.window.showQuickPick(t,{placeHolder:"Select Metadata Type to extract (e.g., ApexClass)",ignoreFocusOut:!0});if(!o||o==="Other (Type manually)..."&&(o=await G.window.showInputBox({prompt:"Enter Metadata Type (e.g., CustomApplication, Queue)",ignoreFocusOut:!0}),!o))return;let s={ApexClass:"**/*.cls",ApexTrigger:"**/*.trigger",CustomObject:"**/*.{object,object-meta.xml}",CustomField:"**/*.field-meta.xml",LightningComponentBundle:"**/lwc/*/*.js",AuraDefinitionBundle:"**/aura/*/*.cmp",Flow:"**/*.flow-meta.xml",CustomLabel:"**/*.labels-meta.xml",CustomMetadata:"**/*.md-meta.xml",StaticResource:"**/*.resource-meta.xml",Profile:"**/*.profile-meta.xml",PermissionSet:"**/*.permissionset-meta.xml",PermissionSetGroup:"**/*.permissionsetgroup-meta.xml",Layout:"**/*.layout-meta.xml",ValidationRule:"**/*.validationRule-meta.xml",RecordType:"**/*.recordType-meta.xml",ListView:"**/*.listView-meta.xml"},i=[],a=s[o];if(a)try{i=(await G.workspace.findFiles(a,"**/node_modules/**")).map(m=>{let f=m.fsPath.split(/[\\/]/).pop()||"";if(o==="LightningComponentBundle"||o==="AuraDefinitionBundle"){let n=m.fsPath.split(/[\\/]/);return n[n.length-2]||f.split(".")[0]}return f.split(".")[0]}),i=[...new Set(i)].sort()}catch{}let c=await new Promise(p=>{let m=G.window.createQuickPick();m.title=`Extract ${o}`,m.placeholder="Type name (e.g. MyComponent) or * for all",m.ignoreFocusOut=!0,m.matchOnDescription=!0;let f=()=>{let n=m.value.trim(),d=[];n?d.push({label:`$(cloud-download) Extract "${n}"`,description:"Extract exact name from Salesforce",alwaysShow:!0}):d.push({label:'$(cloud-download) Extract "*" (All)',description:`Extract all ${o}s`,alwaysShow:!0}),i.forEach(r=>{(!n||r.toLowerCase().includes(n.toLowerCase()))&&d.push({label:r,description:"Local workspace component"})}),m.items=d};m.onDidChangeValue(()=>f()),m.onDidAccept(()=>{let n=m.selectedItems[0];if(n){let d=n.label;d.startsWith('$(cloud-download) Extract "')?d=d.replace('$(cloud-download) Extract "',"").replace('" (All)',"").replace('"',""):d==='$(cloud-download) Extract "*" (All)'&&(d="*"),m.hide(),p(d)}}),m.onDidHide(()=>{m.dispose(),p(void 0)}),f(),m.show()});c&&await G.window.withProgress({location:G.ProgressLocation.Notification,title:`Ricwiz: Extracting ${o}:${c} from Salesforce...`,cancellable:!0},async(p,m)=>{try{M.show(!0);let f=`${o}:${c}`,{stdout:n,stderr:d}=await g(`sf project retrieve start -m "${f}"`,{cwd:e});n&&M.appendLine(n),d&&M.appendLine(d),G.window.showInformationMessage(`Ricwiz: Successfully extracted ${f}.`)}catch(f){M.appendLine(`ERROR: ${f.message}`),f.stdout&&M.appendLine(f.stdout),f.stderr&&M.appendLine(f.stderr),G.window.showErrorMessage("Ricwiz: Extraction failed. See Output channel for details.")}})}var G,Ft=k(()=>{"use strict";G=b(require("vscode"));C()});async function It(){let e=F.window.activeTextEditor;if(!e){F.window.showErrorMessage("Ricwiz: Please open the file you want to deploy in the editor first.");return}let t=e.document.uri.fsPath,o=y();if(!o)return;let s="";if(await F.window.withProgress({location:F.ProgressLocation.Notification,title:"Ricwiz: Fetching available Salesforce orgs...",cancellable:!1},async()=>{try{let{stdout:m}=await g("sf org list --json",{cwd:o});s=m}catch(m){s=m.stdout||""}}),!s){F.window.showErrorMessage("Ricwiz: Failed to fetch orgs. Is Salesforce CLI installed?");return}let i=[];try{let m=JSON.parse(s),f=m.result?.nonScratchOrgs||[],n=m.result?.scratchOrgs||[];i=[...f,...n]}catch{F.window.showErrorMessage("Ricwiz: Failed to parse org list.");return}if(i.length===0){F.window.showInformationMessage("Ricwiz: No authenticated orgs found.");return}let a=i.map(m=>({label:m.alias||m.username,description:m.alias?m.username:"",picked:m.isDefaultUsername})),c=await F.window.showQuickPick(a,{placeHolder:"Select the org(s) to deploy this file to",canPickMany:!0,ignoreFocusOut:!0});if(!c||c.length===0)return;let p=Lt.basename(t);await F.window.withProgress({location:F.ProgressLocation.Notification,title:`Ricwiz: Deploying ${p} to ${c.length} org(s)...`,cancellable:!1},async()=>{M.show(!0),M.appendLine(`--- Starting Parallel Deploy of ${p} ---`);let m=c.map(async r=>{let l=r.label;M.appendLine(`[${l}] Deploying...`);try{let{stdout:u,stderr:w}=await g(`sf project deploy start -d "${t}" -o "${l}"`,{cwd:o});return M.appendLine(`[${l}] \u2705 Success`),u&&M.appendLine(u),{org:l,success:!0}}catch(u){return M.appendLine(`[${l}] \u274C Failed`),u.stdout&&M.appendLine(u.stdout),u.stderr&&M.appendLine(u.stderr),{org:l,success:!1}}}),f=await Promise.all(m),n=f.filter(r=>r.success).length,d=f.filter(r=>!r.success).length;d===0?F.window.showInformationMessage(`Ricwiz: Successfully deployed to all ${n} orgs!`):F.window.showErrorMessage(`Ricwiz: Deploy finished with errors (${n} success, ${d} failed). Check Output channel.`)})}var F,Lt,Ot=k(()=>{"use strict";F=b(require("vscode")),Lt=b(require("path"));C()});async function Ut(){let e=y();if(!e){z.window.showErrorMessage("Ricwiz: Open a folder or workspace that is a Git repository.");return}let t=z.workspace.getConfiguration("ricwiz"),o=t.get("auditUsername",""),s=t.get("auditHours",8),i=await z.window.showInputBox({prompt:"Enter your Salesforce Username to query in SetupAuditTrail",value:o,placeHolder:"admin@tuaorg.com"});if(!i)return;let a=await z.window.showInputBox({prompt:"How many hours back do you want to search?",value:s.toString(),placeHolder:"8"});if(!a)return;let c=parseFloat(a);if(isNaN(c)||c<=0){z.window.showErrorMessage("Ricwiz: Invalid hours specified.");return}let p=new Date(Date.now()-c*60*60*1e3).toISOString(),f=`sf data query -q "${`SELECT Action, Display, Section FROM SetupAuditTrail WHERE CreatedBy.Username = '${i}' AND CreatedDate >= ${p}`}" --json`;await z.window.withProgress({location:z.ProgressLocation.Notification,title:"Ricwiz: Interrogating Setup Audit Trail...",cancellable:!1},async()=>{try{let{stdout:n}=await g(f,{cwd:e,maxBuffer:52428800}),d=JSON.parse(n);if(!d.result||d.result.records.length===0){z.window.showInformationMessage(`Ricwiz: No changes found for ${i} in the last ${c} hours.`);return}let r=d.result.records,l=[],u=new Set;for(let B of r){let N=so(B.Action,B.Display,B.Section);if(N){let ne=`${N.isDelete?"DEL":"ADD"}-${N.metadataFormat}`;if(!u.has(ne)){u.add(ne);let se=N.isDelete?"$(trash)":"$(plus)";l.push({label:`${se} ${N.metadataFormat}`,description:`${B.Action} -> ${B.Display}`,metadataFormat:N.metadataFormat,isDelete:N.isDelete})}}}if(l.length===0){z.window.showInformationMessage(`Ricwiz: No extractable metadata changes found for ${i} in the last ${c} hours (ignored passwords/logins).`);return}let w=await z.window.showQuickPick(l,{canPickMany:!0,placeHolder:"Select the changes you want to extract to GitLab",ignoreFocusOut:!0});if(!w||w.length===0){z.window.showInformationMessage("Ricwiz: No changes selected.");return}let h=w.filter(B=>B.isDelete),R=w.filter(B=>!B.isDelete),$=z.window.createOutputChannel("Ricwiz Admin Bridge");if($.show(),h.length>0){let{stdout:B}=await g("git ls-files",{cwd:e}),N=B.split(`
`).map(se=>se.trim()),ne=0;for(let se of h){let D=se.metadataFormat.split(":"),re=D[0],ae=D[1],we=ae;re==="CustomField"&&(we=ae.split(".")[1]);let Xt=N.filter(ke=>{let ve=De.basename(ke);return ve.startsWith(we+".")&&ve.includes(re==="CustomField"?".field":"")});for(let ke of Xt){let ve=De.join(e,ke);Ee.existsSync(ve)&&(Ee.unlinkSync(ve),$.appendLine(`Deleted local file: ${ke}`),ne++)}}z.window.showInformationMessage(`Ricwiz: Deleted ${ne} local files from Git workspace.`)}if(R.length===0)return;let T=R.map(B=>B.metadataFormat).filter(B=>B!=="").join(", "),le=await z.window.showInputBox({prompt:"Review and adjust the metadata components to retrieve",value:T,ignoreFocusOut:!0});if(!le)return;let he=`sf project retrieve start -m "${le}"`;$.appendLine(`Executing: ${he}`),z.window.showInformationMessage(`Ricwiz: Extracting ${R.length} components...`);let me=await g(he,{cwd:e});$.appendLine(me.stdout),me.stderr&&($.appendLine("--- STDERR ---"),$.appendLine(me.stderr)),z.window.showInformationMessage("Ricwiz: Changes extracted successfully! Ready for Git Commit.")}catch(n){z.window.showErrorMessage(`Ricwiz: Error capturing changes - ${n.message}`)}})}function so(e,t,o){if(!e||!t||!o)return null;let s=e.toLowerCase(),i=o.toLowerCase();if(["security controls","network access","session settings","data export","login history","password policies","identity verification","delegated administration"].includes(i)||s.includes("login")||s.includes("password")||s.includes("oauth")||s.includes("session"))return null;let c=s.includes("delete"),p=null;if(s==="permissionsetgroupcomponentadd"||s==="permissionsetgroupcomponentdelete")return null;let m=(f,n=!1)=>{let d=f.replace(/\(.*\)/g,"").trim();d.includes(":")&&!s.includes("calculation")&&(d=d.split(":")[0]);let r=["disabled","deleted","removed","created","changed","updated","from","to","on","assigned","assign","assignment","permission","set","group","apex","class","trigger","custom","field","object","layout","validation","rule","flow","profile"],l=d.split(/\s+/);if(n){for(;l.length>0&&r.includes(l[l.length-1].toLowerCase());)l.pop();for(;l.length>0&&r.includes(l[0].toLowerCase());)l.shift();return l.join(" ").trim().replace(/[^a-zA-Z0-9_ ]/g,"")}else return l.filter(h=>!r.includes(h.toLowerCase())).join("_").replace(/[^a-zA-Z0-9_]/g,"")||d.replace(/\s+/g,"")};if(s.includes("profile"))p=`Profile:${m(t,!0)}`;else if(s.includes("permissionsetgroupcalculation")){let f=t.split(":");p=`PermissionSetGroup:${f.length>1?f[f.length-1].trim():m(t,!1)}`}else if(s.includes("permission set group")||s.includes("permissionsetgroup"))p=`PermissionSetGroup:${m(t,!1)}`;else if(s.includes("permission set")||s.includes("permissionset"))p=`PermissionSet:${m(t,!1)}`;else if(s.includes("apexclass"))p=`ApexClass:${m(t,!1)}`;else if(s.includes("apextrigger")||s.includes("apex trigger"))p=`ApexTrigger:${m(t,!1)}`;else if(s.includes("customfield")){let f=t.match(/([A-Za-z0-9_]+__c)/),n=t.match(/(?:on|na|for)\s+([A-Za-z0-9_]+)/i);f&&n?p=`CustomField:${n[1]}.${f[1]}`:p=`CustomField:${m(t,!1)}`}else if(s.includes("layout"))p=`Layout:${m(t,!0)}`;else if(s.includes("validation"))p=`ValidationRule:${m(t,!1)}`;else if(s.includes("flow"))p=`Flow:${m(t,!1)}`;else if(s.includes("customobject")){let f=t.match(/([A-Za-z0-9_]+__c)/);p=f?`CustomObject:${f[1]}`:`CustomObject:${m(t,!1)}`}else if(!s.includes("created")&&!s.includes("changed")&&!s.includes("deleted"))return null;return p?{metadataFormat:p,isDelete:c}:null}var z,Ee,De,Nt=k(()=>{"use strict";z=b(require("vscode")),Ee=b(require("fs")),De=b(require("path"));C()});async function jt(){let e=y();if(e)try{let{stdout:t}=await g('git for-each-ref --sort=-committerdate --format="%(refname:short)|||%(committerdate:relative)|||%(subject)" refs/heads/',{cwd:e}),o=t.split(`
`).filter(i=>i.trim()).map(i=>{let a=i.split("|||");return{label:`$(git-branch) ${a[0]}`,description:a[1],detail:a[2],branchName:a[0]}}),s=await Fe.window.showQuickPick(o,{placeHolder:"Select a branch from history to checkout",matchOnDescription:!0,matchOnDetail:!0});s&&await fe(s.branchName)}catch{Fe.window.showErrorMessage("Ricwiz: Failed to get branch history")}}var Fe,Wt=k(()=>{"use strict";Fe=b(require("vscode"));C();Pe()});async function Ht(){let e=y();if(!e)return;let t=await xe.window.showInputBox({prompt:"Enter ticket number or name (e.g., 48934)",placeHolder:"48934"});if(t)try{let{stdout:o}=await g(`git branch --list "*${t}*"`,{cwd:e}),s=o.split(`
`).map(c=>c.replace("*","").trim()).filter(c=>c);if(s.length===0){xe.window.showInformationMessage(`Ricwiz: No branches found matching "${t}"`);return}let i=s.map(c=>({label:`$(git-branch) ${c}`,branchName:c})),a=await xe.window.showQuickPick(i,{placeHolder:`Select a branch for ${t}`});a&&await fe(a.branchName)}catch{xe.window.showErrorMessage("Ricwiz: Failed to search branches")}}var xe,qt=k(()=>{"use strict";xe=b(require("vscode"));C();Pe()});async function Gt(){let e=de.window.activeTextEditor;if(!e)return de.window.showErrorMessage("Ricwiz: Please open a file in the editor to check blame."),null;let t=e.document.fileName,o=Vt.basename(t),s=y();if(!s)return de.window.showErrorMessage("Ricwiz: Workspace is not a git repository."),null;let i=[];try{let{stdout:n}=await g(`git log -5 --pretty=format:"%an|%ar|%s|%h" -- "${t}"`,{cwd:s}),d=n.trim().split(`
`);for(let r of d){let l=r.split("|");l.length>=4&&i.push({author:l[0],time:l[1],message:l.slice(2,-1).join("|"),hash:l[l.length-1]})}}catch(n){console.error("Git blame error:",n)}let a="Unknown",c="Unknown",p="Unknown",m=[],f=ro(t);if(f)try{await de.window.withProgress({location:de.ProgressLocation.Notification,title:`Ricwiz: Analyzing ${f.name} in Salesforce...`,cancellable:!1},async()=>{let n="";if(f.type==="CustomField"){let d=f.name.split(".");d.length===2&&(n=`SELECT LastModifiedBy.Name, LastModifiedDate, CreatedBy.Name FROM CustomField WHERE DeveloperName = '${d[1].replace("__c","")}' AND TableEnumOrId = '${d[0]}'`)}else f.type==="LightningComponentBundle"?n=`SELECT LastModifiedBy.Name, LastModifiedDate, CreatedBy.Name FROM LightningComponentBundle WHERE DeveloperName = '${f.name}'`:n=`SELECT LastModifiedBy.Name, LastModifiedDate, CreatedBy.Name FROM ${f.type} WHERE Name = '${f.name}'`;if(n)try{let{stdout:d}=await g(`sf data query -t -q "${n}" --json`,{cwd:s,maxBuffer:52428800}),r=JSON.parse(d);if(r&&r.result&&r.result.records&&r.result.records.length>0){let l=r.result.records[0];a=l.LastModifiedBy?l.LastModifiedBy.Name:"Unknown",p=l.CreatedBy?l.CreatedBy.Name:"Unknown",c=new Date(l.LastModifiedDate).toLocaleString()}else a="Not found in Org",c="N/A",p="N/A"}catch{a="Query Error",c="N/A",p="N/A"}try{let d="SELECT Action, Display, CreatedBy.Name, CreatedDate FROM SetupAuditTrail ORDER BY CreatedDate DESC LIMIT 1500",{stdout:r}=await g(`sf data query -q "${d}" --json`,{cwd:s,maxBuffer:52428800}),l=JSON.parse(r);if(l&&l.result&&l.result.records){let u=f.name.replace("__c","");m=l.result.records.filter(h=>h.Display&&h.Display.includes(u)).map(h=>({action:h.Action,display:h.Display,author:h.CreatedBy?h.CreatedBy.Name:"Unknown",time:new Date(h.CreatedDate).toLocaleString()})).slice(0,10)}}catch(d){console.error("Audit trail query error:",d)}})}catch(n){console.error("Salesforce query error:",n)}else a="Unsupported Metadata Type",c="N/A";return{fileName:o,gitHistory:i,sfAuthor:a,sfTime:c,sfCreatedBy:p,auditHistory:m}}function ro(e){let t=e.replace(/\\/g,"/");if(t.includes("/classes/")){let o=t.match(/\/classes\/([^/.]+)\.cls/);if(o)return{type:"ApexClass",name:o[1]}}if(t.includes("/triggers/")){let o=t.match(/\/triggers\/([^/.]+)\.trigger/);if(o)return{type:"ApexTrigger",name:o[1]}}if(t.includes("/lwc/")){let o=t.match(/\/lwc\/([^/]+)\//);if(o)return{type:"LightningComponentBundle",name:o[1]}}if(t.includes("/aura/")){let o=t.match(/\/aura\/([^/]+)\//);if(o)return{type:"AuraDefinitionBundle",name:o[1]}}if(t.includes("/objects/")&&t.includes("/fields/")){let o=t.match(/\/objects\/([^/]+)\//),s=t.match(/\/fields\/([^/.]+)\.field/);if(o&&s)return{type:"CustomField",name:`${o[1]}.${s[1]}`}}return null}var de,Vt,_t=k(()=>{"use strict";de=b(require("vscode")),Vt=b(require("path"));C()});async function Jt(){let e=y();if(!e){U.window.showErrorMessage("Ricwiz: Open a workspace that is a Git repository.");return}let o=U.workspace.getConfiguration("ricwiz").get("ticketSourceBranch","main");await U.window.withProgress({location:U.ProgressLocation.Notification,title:`Ricwiz: Finding deleted files compared to origin/${o}...`,cancellable:!1},async()=>{try{let{stdout:s}=await g(`git diff --name-only --diff-filter=D origin/${o}...HEAD`,{cwd:e}),i=s.split(`
`).map(r=>r.trim()).filter(r=>r.length>0);if(i.length===0){U.window.showInformationMessage(`Ricwiz: No deleted files found compared to origin/${o}.`);return}let a={},c=(r,l)=>{a[r]||(a[r]=[]),a[r].includes(l)||a[r].push(l)};for(let r of i){let l=r.replace(/\\/g,"/");if(l.includes("/classes/")){let u=l.match(/\/classes\/([^/.]+)\.cls/);u&&c("ApexClass",u[1])}else if(l.includes("/triggers/")){let u=l.match(/\/triggers\/([^/.]+)\.trigger/);u&&c("ApexTrigger",u[1])}else if(l.includes("/lwc/")){let u=l.match(/\/lwc\/([^/]+)\//);u&&c("LightningComponentBundle",u[1])}else if(l.includes("/aura/")){let u=l.match(/\/aura\/([^/]+)\//);u&&c("AuraDefinitionBundle",u[1])}else if(l.includes("/objects/")&&l.includes("/fields/")){let u=l.match(/\/objects\/([^/]+)\//),w=l.match(/\/fields\/([^/.]+)\.field/);u&&w&&c("CustomField",`${u[1]}.${w[1]}`)}else if(l.includes("/objects/")){let u=l.match(/\/objects\/([^/.]+)\.object/);u&&c("CustomObject",u[1])}else if(l.includes("/layouts/")){let u=l.match(/\/layouts\/([^/.]+)\.layout/);u&&c("Layout",u[1])}else if(l.includes("/flows/")){let u=l.match(/\/flows\/([^/.]+)\.flow/);u&&c("Flow",u[1])}else if(l.includes("/permissionsets/")){let u=l.match(/\/permissionsets\/([^/.]+)\.permissionset/);u&&c("PermissionSet",u[1])}else if(l.includes("/profiles/")){let u=l.match(/\/profiles\/([^/.]+)\.profile/);u&&c("Profile",u[1])}else if(l.includes("/customMetadata/")){let u=l.match(/\/customMetadata\/([^/.]+)\.md/);u&&c("CustomMetadata",u[1])}else if(l.includes("/flexipages/")){let u=l.match(/\/flexipages\/([^/.]+)\.flexipage/);u&&c("FlexiPage",u[1])}}if(Object.keys(a).length===0){U.window.showInformationMessage("Ricwiz: Found deleted files in Git, but none mapped to recognizable Salesforce metadata.");return}let p=`<?xml version="1.0" encoding="UTF-8"?>
<Package xmlns="http://soap.sforce.com/2006/04/metadata">
`;for(let r of Object.keys(a).sort()){p+=`    <types>
`;for(let l of a[r].sort())p+=`        <members>${l}</members>
`;p+=`        <name>${r}</name>
    </types>
`}p+=`    <version>58.0</version>
</Package>`;let m=Te.join(e,"destructiveChanges");ie.existsSync(m)||ie.mkdirSync(m);let f=Te.join(m,"destructiveChanges.xml"),n=Te.join(m,"package.xml");ie.writeFileSync(f,p,"utf8"),ie.existsSync(n)||ie.writeFileSync(n,`<?xml version="1.0" encoding="UTF-8"?>
<Package xmlns="http://soap.sforce.com/2006/04/metadata">
    <version>58.0</version>
</Package>`,"utf8");let d=await U.workspace.openTextDocument(f);await U.window.showTextDocument(d),U.window.showInformationMessage("Ricwiz: destructiveChanges.xml generated successfully!")}catch(s){U.window.showErrorMessage(`Ricwiz: Error generating destructive changes: ${s.message}`)}})}var U,Te,ie,Qt=k(()=>{"use strict";U=b(require("vscode")),Te=b(require("path")),ie=b(require("fs"));C()});async function Yt(){let e=y();if(!e)return;let o=Z.workspace.getConfiguration("ricwiz").get("ticketSourceBranch","main");await Z.window.withProgress({location:Z.ProgressLocation.Notification,title:"Ricwiz: Finding Apex Tests to run...",cancellable:!1},async()=>{try{let{stdout:s}=await g(`git diff --name-status origin/${o}...HEAD`,{cwd:e}),i=s.split(`
`).map(r=>r.trim()).filter(r=>r.length>0),a=new Set,c=new Set;for(let r of i){let l=r.split(/\s+/);if(l[0].startsWith("D"))continue;let u=l[1];if(u&&u.endsWith(".cls")){let w=u.match(/\/classes\/([^/.]+)\.cls/);if(w){let h=w[1];h.toLowerCase().endsWith("test")?a.add(h):c.add(h)}}}for(let r of c)a.add(`${r}Test`);if(a.size===0){Z.window.showInformationMessage("Ricwiz: No Apex Classes were modified in this branch.");return}let p=Array.from(a).map(r=>({label:`$(beaker) ${r}`,description:"Apex Test Class"})),m=await Z.window.showQuickPick(p,{canPickMany:!0,title:"Select Test Classes to Run",placeHolder:"Select tests..."});if(!m||m.length===0)return;let n=`sf apex run test -n ${m.map(r=>r.label.replace("$(beaker) ","").trim()).join(",")} -r human -w 30`,d=Z.window.createTerminal("Ricwiz: Smart Tests");d.show(),d.sendText(n)}catch(s){Z.window.showErrorMessage(`Ricwiz: Error finding tests: ${s.message}`)}})}var Z,Zt=k(()=>{"use strict";Z=b(require("vscode"));C()});var ze={};Le(ze,{activate:()=>ao,deactivate:()=>co,webviewProvider:()=>L});module.exports=ue(ze);function ao(e){L=new $e(e.extensionUri),e.subscriptions.push(v.window.registerWebviewViewProvider("ricwiz-webview",L));let t=v.window.createStatusBarItem(v.StatusBarAlignment.Left,100);t.command="ricwiz.openJiraTicket",e.subscriptions.push(t);let o,s=v.workspace.getConfiguration("ricwiz").get("autoRefresh",!0);L.setAutoRefresh(s),e.subscriptions.push(v.workspace.onDidChangeConfiguration(a=>{if(a.affectsConfiguration("ricwiz.autoRefresh")){let c=v.workspace.getConfiguration("ricwiz").get("autoRefresh",!0);L?.setAutoRefresh(c)}}));async function i(){let a=v.extensions.getExtension("vscode.git");if(a){let m=function(f){let n="",d;async function r(){let u=v.workspace.workspaceFolders;if(!u)return;let w=u[0].uri.fsPath,h=await A(w);if(h&&h!==n){n=h;let R=v.workspace.getConfiguration("ricwiz"),$=R.get("ticketPrefix","SFPSCA-");if(!h.includes($)){let D=h.match(/([A-Z]+-)\d+/i);D&&($=D[1].toUpperCase())}let T=[],le=[],he=[],me=[],B=R.get("environments",[{name:"Qual",sourceBranch:"quality"},{name:"Val",sourceBranch:"validation"},{name:"Prod",sourceBranch:"main"}]);try{let re=[R.get("ticketSourceBranch","main"),...B.map(ae=>ae.sourceBranch)];he=Array.from(new Set(re))}catch{}let N=h.match(new RegExp(`(${$}\\d+(?:-\\d+)?)`,"i"));if(N){let D=N[1].toUpperCase(),re=R.get("commitMessageSuffix","- "),ae=/^[A-Z]+-\d+(?:-\d+)?\s*(?:-\s*|:\s*|\s+)?/i;ae.test(f.inputBox.value)?f.inputBox.value.toUpperCase().startsWith(D)||(f.inputBox.value=f.inputBox.value.replace(ae,`${D}${re}`)):f.inputBox.value=`${D}${re}`+f.inputBox.value,t.text=`$(bookmark) ${D}`,t.tooltip=`Branch: ${h}
Click to open Jira ticket`,t.show();try{let we=await Ye(w,D,h);T=await Ge(w,we,D,B)}catch{}}else{t.hide();try{me=await Qe(w)}catch{}}let[ne,se]=await Promise.all([Je(w,10),_e(w,h,B)]);le=ne,L?.updateBranch(h,se,T,le,he,me)}}function l(){L?.isAutoRefreshEnabled()&&(d&&clearTimeout(d),d=setTimeout(()=>{n="",r()},300))}o=()=>{n="",r()},r(),f.state.onDidChange(()=>l()),v.window.onDidChangeWindowState(u=>{u.focused&&l()})};var c=m;a.isActive||await a.activate();let p=a.exports.getAPI(1);p.repositories.length>0&&p.repositories.forEach(f=>m(f)),p.onDidOpenRepository(f=>m(f))}}i(),e.subscriptions.push(v.commands.registerCommand("ricwiz.generateDestructiveChanges",Jt),v.commands.registerCommand("ricwiz.runSmartTests",Yt),v.commands.registerCommand("ricwiz.refreshWebview",()=>{L&&v.commands.executeCommand("workbench.action.webview.reloadWebviewAction")}),v.commands.registerCommand("ricwiz.createBranches",tt),v.commands.registerCommand("ricwiz.prepareDeploy",st),v.commands.registerCommand("ricwiz.createMergeRequests",ct),v.commands.registerCommand("ricwiz.createMergeRequestsVSCode",dt),v.commands.registerCommand("ricwiz.openJiraTicket",ut),v.commands.registerCommand("ricwiz.openJiraTicketVSCode",pt),v.commands.registerCommand("ricwiz.syncAll",ft),v.commands.registerCommand("ricwiz.updateBases",wt),v.commands.registerCommand("ricwiz.deleteUnusedBranches",yt),v.commands.registerCommand("ricwiz.checkoutBranch",fe),v.commands.registerCommand("ricwiz.copyBranchName",xt),v.commands.registerCommand("ricwiz.generatePackageXml",$t),v.commands.registerCommand("ricwiz.deployPackage",zt),v.commands.registerCommand("ricwiz.importData",St),v.commands.registerCommand("ricwiz.listTicketFiles",Mt),v.commands.registerCommand("ricwiz.resetTracking",Dt),v.commands.registerCommand("ricwiz.extractComponent",At),v.commands.registerCommand("ricwiz.deployMultiOrg",It),v.commands.registerCommand("ricwiz.captureAdminChanges",Ut),v.commands.registerCommand("ricwiz.openHistory",jt),v.commands.registerCommand("ricwiz.searchTicket",Ht),v.commands.registerCommand("ricwiz.whoToBlame",async()=>{let a=await Gt();a&&L&&(L.setBlameData(a),L.setPage("blame"))}),v.commands.registerCommand("ricwiz.manualRefresh",()=>{o&&o()}),v.commands.registerCommand("ricwiz.toggleAutoRefresh",()=>{if(L){let a=!L.isAutoRefreshEnabled();L.setAutoRefresh(a),v.workspace.getConfiguration("ricwiz").update("autoRefresh",a,v.ConfigurationTarget.Global)}}),v.commands.registerCommand("ricwiz.openSettings",()=>{v.commands.executeCommand("workbench.action.openSettings","ricwiz")}))}function co(){}var v,L,Be=k(()=>{v=b(require("vscode"));C();Ze();Xe();ot();rt();lt();gt();ht();vt();bt();Pe();kt();Rt();Bt();Pt();Et();Tt();Ft();Ot();Nt();Wt();qt();_t();Qt();Zt()});Be();0&&(module.exports={activate,deactivate,webviewProvider});
