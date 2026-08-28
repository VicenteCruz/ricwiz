"use strict";var Mo=Object.create;var Ve=Object.defineProperty;var Ao=Object.getOwnPropertyDescriptor;var Lo=Object.getOwnPropertyNames;var Io=Object.getPrototypeOf,Fo=Object.prototype.hasOwnProperty;var Uo=(t,e)=>{for(var o in e)Ve(t,o,{get:e[o],enumerable:!0})},vt=(t,e,o,i)=>{if(e&&typeof e=="object"||typeof e=="function")for(let n of Lo(e))!Fo.call(t,n)&&n!==o&&Ve(t,n,{get:()=>e[n],enumerable:!(i=Ao(e,n))||i.enumerable});return t};var k=(t,e,o)=>(o=t!=null?Mo(Io(t)):{},vt(e||!t||!t.__esModule?Ve(o,"default",{value:t,enumerable:!0}):o,t)),Oo=t=>vt(Ve({},"__esModule",{value:!0}),t);var Zo={};Uo(Zo,{activate:()=>Qo,deactivate:()=>Yo,webviewProvider:()=>ce});module.exports=Oo(Zo);var Ee=k(require("vscode"));var P=k(require("vscode"));function C(t){return t?t.replace(/&/g,"&amp;").replace(/</g,"&lt;").replace(/>/g,"&gt;").replace(/"/g,"&quot;").replace(/'/g,"&#39;"):""}function qe(t){let e=(t||"").toLowerCase().trim();return e==="open"?"#888888":e==="in progress"?"#007acc":e==="waiting for deploy"?"#d7a500":e==="close"||e==="done"||e==="closed"?"#238636":"var(--vscode-badge-background)"}function ke(t){return t?t==="running"?"\u{1F7E1}":t==="success"?"\u{1F7E2}":t==="failed"?"\u{1F534}":t==="canceled"||t==="skipped"?"\u26AA":"":""}function q(){return`
        <script>
            const vscode = acquireVsCodeApi();
            function sendCommand(cmd, args, element) {
                vscode.postMessage({ command: cmd, args: args });
            }
            function sendCheckoutCommand(branchName, element) {
                vscode.postMessage({ command: 'checkout', branch: branchName });
            }
            function sendOpenFileCommand(file, element) {
                vscode.postMessage({ command: 'openFile', file: file });
            }
        </script>
    `}function _(){return`
        <style>
            :root {
                /* Richemont Palette */
                --rich-blue: #003366;
                --rich-gold: #D4AF37;
                --rich-white: #FFFFFF;
                
                /* Apple-style UI elements (Dark Mode) */
                --rich-bg: #000000;
                --rich-text: #F5F5F7;
                --rich-border: #38383A;
                --rich-card: #1C1C1E;
                --rich-btn: #2C2C2E;
                
                --radius-sm: 6px;
                --radius-md: 10px;
                --radius-lg: 14px;
                
                --shadow-sm: 0 1px 2px rgba(0,0,0,0.3);
                --shadow-md: 0 4px 12px rgba(0,0,0,0.5);
            }

            body {
                padding: 16px 12px;
                display: flex;
                flex-direction: column;
                gap: 12px;
                font-family: -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, Helvetica, Arial, sans-serif;
                background-color: var(--rich-bg) !important;
                color: var(--rich-text) !important;
                -webkit-font-smoothing: antialiased;

                /* Override VSCode theme variables for a consistent dark Apple theme */
                --vscode-panel-border: var(--rich-border);
                --vscode-list-hoverBackground: rgba(255, 255, 255, 0.1);
                --vscode-widget-border: var(--rich-border);
                --vscode-dropdown-background: var(--rich-card);
                --vscode-dropdown-foreground: var(--rich-text);
                --vscode-dropdown-border: var(--rich-border);
                --vscode-editorIndentGuide-activeBackground1: var(--rich-gold);
                --vscode-foreground: var(--rich-text);
                --vscode-button-foreground: var(--rich-text);
                --vscode-button-secondaryForeground: var(--rich-text);
            }

            .btn {
                display: flex;
                align-items: center;
                gap: 10px;
                background: var(--rich-btn);
                color: var(--rich-text);
                border: 1px solid var(--rich-border);
                padding: 10px 12px;
                cursor: pointer;
                font-size: 13px;
                font-weight: 500;
                border-radius: var(--radius-md);
                text-align: left;
                width: 100%;
                outline: none;
                transition: all 0.2s cubic-bezier(0.25, 0.8, 0.25, 1);
                box-shadow: var(--shadow-sm);
                box-sizing: border-box;
            }
            
            .btn:hover {
                background-color: var(--rich-blue);
                color: var(--rich-white);
                border-color: var(--rich-blue);
                transform: translateY(-1px);
                box-shadow: 0 4px 8px rgba(0, 51, 102, 0.4);
            }
            
            .btn:active {
                transform: scale(0.98);
            }

            .icon {
                font-size: 15px;
                opacity: 0.9;
            }

            .separator {
                height: 1px;
                background-color: var(--rich-border);
                margin: 12px 4px;
            }

            .copy-btn {
                background: transparent;
                border: none;
                color: var(--rich-text);
                cursor: pointer;
                font-size: 12px;
                opacity: 0.6;
                padding: 4px 6px;
                border-radius: var(--radius-sm);
                transition: all 0.2s ease;
            }
            .copy-btn:hover {
                opacity: 1;
                background-color: rgba(255, 255, 255, 0.1);
            }

            .icon-button {
                background: transparent;
                border: none;
                cursor: pointer;
                color: var(--rich-text);
                padding: 6px;
                border-radius: var(--radius-sm);
                display: inline-flex;
                align-items: center;
                justify-content: center;
                transition: all 0.2s ease;
            }
            .icon-button:hover {
                background: rgba(255, 255, 255, 0.1);
            }
            
            /* Override inline VS Code styles injected in the HTML */
            [style*="var(--vscode-editor-inactiveSelectionBackground)"] {
                background-color: var(--rich-card) !important;
                border: 1px solid var(--rich-border) !important;
                box-shadow: var(--shadow-md) !important;
                border-radius: var(--radius-lg) !important;
                color: var(--rich-text) !important;
                padding: 14px !important;
            }
            
            [style*="var(--vscode-button-background)"] {
                background-color: var(--rich-btn) !important;
                color: var(--rich-text) !important;
                border: 1px solid var(--rich-border) !important;
            }
            
            [style*="var(--vscode-button-background)"]:hover {
                background-color: var(--rich-blue) !important;
                color: var(--rich-white) !important;
                border-color: var(--rich-blue) !important;
            }
            
            [style*="var(--vscode-button-secondaryBackground)"] {
                background-color: var(--rich-btn) !important;
                color: var(--rich-text) !important;
                border: 1px solid var(--rich-border) !important;
            }
            
            [style*="var(--vscode-button-secondaryBackground)"]:hover {
                background-color: var(--rich-blue) !important;
                color: var(--rich-white) !important;
                border-color: var(--rich-blue) !important;
            }

            [style*="var(--vscode-editor-background)"] {
                background-color: var(--rich-card) !important;
                border-color: var(--rich-border) !important;
                color: var(--rich-text) !important;
            }

            [style*="var(--vscode-editorWidget-background)"] {
                background-color: var(--rich-btn) !important;
                border-color: var(--rich-border) !important;
            }

            /* General overrides */
            a {
                color: var(--rich-blue);
            }
            a:hover {
                color: var(--rich-gold);
            }
            
            /* Badges */
            [style*="var(--vscode-charts-green)"] {
                background-color: var(--rich-gold) !important;
                color: var(--rich-bg) !important;
            }
            
            [style*="var(--vscode-badge-background)"] {
                background-color: var(--rich-gold) !important;
                color: var(--rich-bg) !important;
                font-weight: bold;
            }
            
            [style*="var(--vscode-textLink-foreground)"] {
                color: var(--rich-gold) !important;
            }
        </style>
    `}function bt(t,e){let o=_(),i=(e.files||[]).map(n=>`
        <button class="btn" style="padding: 6px; font-size: 12px; display: flex; justify-content: space-between; align-items: center;" onclick="sendOpenFileCommand('${C(n.file)}')">
            <span style="flex: 1; overflow: hidden; text-overflow: ellipsis; white-space: nowrap; direction: rtl; text-align: left;">&lrm;${C(n.file)}</span>
            <span style="font-size: 10px; opacity: 0.8; flex-shrink: 0; background-color: var(--vscode-badge-background); color: var(--vscode-badge-foreground); padding: 2px 4px; border-radius: 2px;">${C(n.state)}</span>
        </button>
    `).join("");return`<!DOCTYPE html>
    <html lang="en">
    <head>
        <meta charset="UTF-8">
        <meta name="viewport" content="width=device-width, initial-scale=1.0">
        <title>Ricwiz Conflict</title>
        ${o}
    </head>
    <body>
        <div style="text-align: center; margin-bottom: 12px; margin-top: 8px;">
            <img src="${t}" alt="Ricwiz Logo" style="width: 80px; height: 80px; opacity: 0.9;" />
        </div>
        <div style="background-color: var(--vscode-editorError-background); color: var(--vscode-editorError-foreground); padding: 12px; border-radius: 4px; margin-bottom: 12px; text-align: center;">
            <div style="font-size: 14px; font-weight: bold; margin-bottom: 8px;">\u26A0 MERGE CONFLICT</div>
            <div style="font-size: 11px; margin-bottom: 12px; opacity: 0.9;">
                Merging <b>${C(e.sourceStr)}</b> into <b>${C(e.targetStr)}</b>.<br/>
                Resolve the conflicts, then click below.
            </div>
            <div style="display: flex; flex-direction: column; gap: 6px;">
                <button class="btn" style="background-color: var(--vscode-button-background); color: var(--vscode-button-foreground); justify-content: center;" onclick="sendCommand('conflict_commitAndContinue', null, this)">
                    \u2713 Commit & Continue
                </button>
                ${e.deletionsCount>0?`
                    <button class="btn" style="background-color: var(--vscode-button-secondaryBackground); color: var(--vscode-button-secondaryForeground); justify-content: center;" onclick="sendCommand('conflict_resolveDeletions', null, this)">
                        \u2A2F Resolve Deletions (${e.deletionsCount})
                    </button>
                `:""}
                <button class="btn" style="background-color: var(--vscode-button-secondaryBackground); color: var(--vscode-button-secondaryForeground); justify-content: center;" onclick="sendCommand('conflict_abortDeploy', null, this)">
                    \u2715 Abort Deploy
                </button>
            </div>
        </div>
        
        ${i?`
            <div style="font-size: 11px; opacity: 0.7; margin: 8px 4px 4px 4px; text-transform: uppercase;">Conflicted Files</div>
            <div style="display: flex; flex-direction: column; gap: 2px;">
                ${i}
            </div>
        `:""}

        ${q()}
    </body>
    </html>`}function yt(t){return`<!DOCTYPE html>
    <html lang="en">
    <head>
        <meta charset="UTF-8">
        <meta name="viewport" content="width=device-width, initial-scale=1.0">
        <title>Ricwiz Blame</title>
        ${_()}
    </head>
    <body>
        <div style="display: flex; align-items: center; gap: 8px; margin-bottom: 16px; margin-top: 8px;">
            <button class="btn" style="width: auto; padding: 4px 8px; background-color: var(--vscode-button-secondaryBackground); color: var(--vscode-button-secondaryForeground);" onclick="sendCommand('openDevTools', null, this)">\u2190 Back</button>
            <div style="font-weight: bold; font-size: 13px; flex: 1; text-align: center;">Who to Blame</div>
        </div>

        ${t?`
        <div style="padding: 12px; background: var(--vscode-editor-background); border: 1px solid var(--vscode-widget-border); border-radius: 6px; margin-bottom: 12px;">
            <div style="font-weight: bold; margin-bottom: 12px; font-size: 14px; text-align: center; color: var(--vscode-textLink-foreground); word-break: break-all;">
                \u25A4 ${C(t.fileName)}
            </div>

            <div style="margin-bottom: 20px;">
                <div style="font-size: 11px; font-weight: bold; opacity: 0.8; text-transform: uppercase; margin-bottom: 8px;"><span class="icon" style="color: #0A84FF;">\u25F3</span> Local Git (Last Commits)</div>
                <ul style="list-style-type: none; padding: 0; margin: 0; display: flex; flex-direction: column; gap: 8px;">
                    ${t.gitHistory&&t.gitHistory.length>0?t.gitHistory.map(o=>`
                        <li style="background: var(--vscode-editorWidget-background); border: 1px solid var(--vscode-widget-border); padding: 8px 10px; border-radius: 4px; border-left: 4px solid var(--vscode-gitDecoration-modifiedResourceForeground);">
                            <div style="display: flex; justify-content: space-between; margin-bottom: 4px; align-items: center;">
                                <strong style="font-size: 13px;">${C(o.author)}</strong>
                                <span style="opacity: 0.7; font-size: 11px;">${C(o.time)}</span>
                            </div>
                            <div style="font-size: 12px; margin-bottom: 6px; opacity: 0.9; font-style: italic;">"${C(o.message)}"</div>
                            <div style="font-family: monospace; font-size: 10px; opacity: 0.6;">Commit: ${C(o.hash)}</div>
                        </li>
                    `).join(""):'<li style="opacity:0.7; font-size: 12px;">No Git history found.</li>'}
                </ul>
            </div>

            <div style="margin-bottom: 20px;">
                <div style="font-size: 11px; font-weight: bold; opacity: 0.8; text-transform: uppercase; margin-bottom: 8px;"><span class="icon" style="color: #0A84FF;">\u2601</span> Salesforce Metadata</div>
                <div style="display: flex; flex-direction: column; gap: 8px;">
                    <div style="background: var(--vscode-editorWidget-background); border: 1px solid var(--vscode-widget-border); padding: 8px 10px; border-radius: 4px; border-left: 4px solid var(--vscode-gitDecoration-addedResourceForeground);">
                        <div style="font-size: 10px; opacity: 0.7; text-transform: uppercase; margin-bottom: 2px;">Last Modified By</div>
                        <div style="font-weight: bold; font-size: 13px;">${C(t.sfAuthor)}</div>
                        <div style="font-size: 11px; opacity: 0.7; margin-top: 2px;">${C(t.sfTime)}</div>
                    </div>
                    ${t.sfCreatedBy!=="Unknown"&&t.sfCreatedBy!=="N/A"?`
                    <div style="background: var(--vscode-editorWidget-background); border: 1px solid var(--vscode-widget-border); padding: 8px 10px; border-radius: 4px; border-left: 4px solid var(--vscode-gitDecoration-addedResourceForeground);">
                        <div style="font-size: 10px; opacity: 0.7; text-transform: uppercase; margin-bottom: 2px;">Created By</div>
                        <div style="font-weight: bold; font-size: 13px;">${C(t.sfCreatedBy)}</div>
                    </div>
                    `:""}
                </div>
            </div>

            <div>
                <div style="font-size: 11px; font-weight: bold; opacity: 0.8; text-transform: uppercase; margin-bottom: 8px;"><span class="icon" style="color: #FFD60A;">\u26B2</span> Setup Audit Trail (Recent)</div>
                <ul style="list-style-type: none; padding: 0; margin: 0; display: flex; flex-direction: column; gap: 8px;">
                    ${t.auditHistory&&t.auditHistory.length>0?t.auditHistory.map(o=>`
                        <li style="background: var(--vscode-editorWidget-background); border: 1px solid var(--vscode-widget-border); padding: 8px 10px; border-radius: 4px; border-left: 4px solid var(--vscode-gitDecoration-untrackedResourceForeground);">
                            <div style="display: flex; justify-content: space-between; margin-bottom: 4px; align-items: center;">
                                <strong style="font-size: 13px;">${C(o.author)}</strong>
                                <span style="opacity: 0.7; font-size: 11px;">${C(o.time)}</span>
                            </div>
                            <div style="font-size: 12px; font-weight: 500; margin-bottom: 4px;">${C(o.action)}</div>
                            <div style="font-size: 11px; opacity: 0.7; font-style: italic; background: var(--vscode-editor-background); padding: 4px; border-radius: 3px;">${C(o.display)}</div>
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

        ${q()}
    </body>
    </html>`}function xt(t){let e=_(),o=t?.ticketId||"Jira",i=t?.summary||"No Title",n=t?.description||"No description provided.",p=t?.relatedBranches||[];return`<!DOCTYPE html>
    <html lang="en">
    <head>
        <meta charset="UTF-8">
        <meta name="viewport" content="width=device-width, initial-scale=1.0">
        <title>Ricwiz Jira Details</title>
        ${e}
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
            <button class="icon-button" onclick="sendCommand('setPage', 'main', this)" style="font-weight: bold; font-size: 16px;" title="Back">\u2B9C</button>
            <span style="font-weight: 600; font-size: 13px;">${C(o)} Details</span>
        </div>
        
        <div class="card" style="padding: 16px;">
            <div class="jira-title">${C(i)}</div>
            <div class="jira-desc">${C(n)}</div>
            
            ${p.length>0?`
                <div style="margin-top: 16px; border-top: 1px solid var(--vscode-panel-border); padding-top: 12px;">
                    <div style="font-size: 11px; opacity: 0.7; margin-bottom: 8px; text-transform: uppercase; font-weight: bold;"><span class="icon" style="color: #32D74B;">\u2387</span> Related Branches & MRs</div>
                    <div style="display: flex; flex-direction: column; gap: 4px;">
                        ${p.map(s=>{let a=ke(s.pipelineStatus),d="";return s.pipelineStatus==="failed"&&s.projectPath&&s.pipelineId&&(d=`onclick="event.stopPropagation(); sendCommand('showPipelineLogs', { projectPath: '${s.projectPath}', pipelineId: ${s.pipelineId} });" style="cursor: pointer;"`),`
                            <div class="btn" style="padding: 6px 10px; font-size: 12px; display: flex; justify-content: space-between; align-items: center; background-color: var(--vscode-button-secondaryBackground); color: var(--vscode-button-secondaryForeground); border-radius: 4px;" onclick="sendCheckoutCommand('${C(s.name)}', this)" title="Checkout ${C(s.name)}">
                                <div style="display: flex; align-items: center; gap: 6px; overflow: hidden;">
                                    <span style="overflow: hidden; text-overflow: ellipsis; white-space: nowrap; font-weight: bold;">${C(s.name)}</span>
                                </div>
                                <div style="display: flex; gap: 6px; align-items: center;">
                                    ${a?`<span title="Pipeline: ${s.pipelineStatus}" style="font-size: 11px;" ${d}>${a}</span>`:""}
                                    ${s.mrUrl?`<span onclick="event.stopPropagation(); sendCommand('openExternal', '${s.mrUrl}');" title="Open Merge Request" style="cursor: pointer; font-size: 12px;">\u{1F517}</span>`:""}
                                    ${s.isMerged?'<span style="background-color: var(--vscode-charts-green); color: white; border-radius: 3px; padding: 2px 6px; font-size: 10px; font-weight: bold;" title="Merged to target env">MERGED</span>':""}
                                </div>
                            </div>
                            `}).join("")}
                    </div>
                </div>
            `:""}
            
        <div style="display: flex; gap: 4px; margin-top: 16px;">
            <button class="btn" style="flex: 1; background-color: var(--vscode-button-secondaryBackground); border-radius: 4px;" onclick="sendCommand('changeJiraStatus', null, this)">
                <span class="icon" style="color: #32D74B;">\u27F3</span> Change Status
            </button>
            <button class="btn" style="flex: 1; background-color: var(--vscode-button-secondaryBackground); border-radius: 4px;" onclick="sendCommand('addJiraComment', null, this)">
                <span class="icon" style="color: #64D2FF;">\u2709</span> Add Comment
            </button>
            <button class="btn" style="flex: 1; background-color: var(--vscode-button-secondaryBackground); border-radius: 4px;" onclick="sendCommand('addJiraLabel', null, this)">
                <span class="icon" style="color: #BF5AF2;">\u2637</span> Add Label
            </button>
            ${t?.url?`
            <button class="btn" style="flex: 1; background-color: var(--vscode-button-secondaryBackground); border-radius: 4px;" onclick="sendCommand('openExternal', '${t.url}', this)">
                <span class="icon" style="color: #0A84FF;">\u2388</span> Open Browser
            </button>
            `:""}
        </div>
        </div>

        ${q()}
    </body>
    </html>`}function kt(t){let{data:e,showBranches:o}=t,i=_(),n=e||{queries:[],selectedIndex:0,results:[],error:null},p=n.queries.map((a,d)=>`
        <option value="${d}" ${d===n.selectedIndex?"selected":""}>${C(a.name)}</option>
    `).join(""),s=n.error?`
        <div style="color: var(--vscode-errorForeground); padding: 12px; text-align: center; background: var(--vscode-editorError-background); border-radius: 4px;">
            \u26A0 ${C(n.error)}
        </div>
    `:n.results.length===0?`
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
                ${n.results.map(a=>`
                    <tr style="border-bottom: ${a.detailedBranches&&a.detailedBranches.length>0?"none":"1px solid var(--vscode-panel-border)"}; cursor: pointer;" class="tr-hover" onclick="sendCommand('openJiraDetailsForId', '${C(a.key)}', this)">
                        <td style="padding: 6px; font-weight: bold; color: var(--vscode-textLink-foreground); white-space: nowrap;">${C(a.key)}</td>
                        <td style="padding: 6px; overflow: hidden; text-overflow: ellipsis; max-width: 150px; white-space: nowrap;" title="${C(a.summary)}">${C(a.summary)}</td>
                        <td style="padding: 6px; white-space: nowrap;">
                            <span style="background: ${qe(a.status)}; color: white; padding: 2px 4px; border-radius: 3px; font-size: 9px; font-weight: bold; text-transform: uppercase;">${C(a.status)}</span>
                        </td>
                        <td style="padding: 6px; white-space: nowrap; text-align: center;">
                            ${a.detailedBranches?"":a.branch?`
                                <button class="icon-button" style="background-color: var(--vscode-button-secondaryBackground); color: var(--vscode-button-secondaryForeground); font-size: 10px; padding: 2px 6px;" title="Checkout ${C(a.branch)}" onclick="event.stopPropagation(); sendCommand('checkout', '${C(a.branch)}')">
                                    \u2387 Checkout
                                </button>
                            `:`
                                <button class="icon-button" style="background-color: var(--vscode-button-background); color: var(--vscode-button-foreground); font-size: 10px; padding: 2px 6px;" title="Create Branch for ${C(a.key)}" onclick="event.stopPropagation(); sendCommand('createBranchForTicket', '${C(a.key)}')">
                                    + Create
                                </button>
                            `}
                        </td>
                    </tr>
                    ${a.detailedBranches&&a.detailedBranches.length>0?`
                    <tr style="border-bottom: 1px solid var(--vscode-panel-border);">
                        <td colspan="4" style="padding: 0 6px 8px 6px;">
                            <div style="display: flex; flex-direction: column; gap: 4px; padding-left: 8px; border-left: 2px solid var(--vscode-editorIndentGuide-activeBackground1);">
                                ${a.detailedBranches.map(d=>{let c=ke(d.pipelineStatus);return`
                                    <div style="display: flex; justify-content: space-between; align-items: center; font-size: 10px; background: var(--vscode-editor-background); padding: 2px 6px; border-radius: 3px;">
                                        <div style="display: flex; align-items: center; gap: 6px; overflow: hidden; cursor: pointer; flex: 1;" onclick="sendCheckoutCommand('${C(d.name)}', this)" title="Checkout ${C(d.name)}">
                                            <span style="overflow: hidden; text-overflow: ellipsis; white-space: nowrap;">${C(d.name)}</span>
                                        </div>
                                        <div style="display: flex; gap: 6px; align-items: center;">
                                            ${d.isMerged?'<span style="background-color: var(--vscode-charts-green); color: white; border-radius: 3px; padding: 1px 4px; font-size: 8px; font-weight: bold;">MERGED</span>':""}
                                            ${c?`<span title="Pipeline: ${d.pipelineStatus}" >${c}</span>`:""}
                                            ${d.mrUrl?`<span onclick="event.stopPropagation(); sendCommand('openExternal', '${d.mrUrl}');" title="Open Merge Request" style="cursor: pointer;">\u{1F517}</span>`:""}
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
        ${i}
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
            <button class="icon-button" onclick="sendCommand('setPage', 'main', this)" style="font-weight: bold; font-size: 16px;" title="Back">\u2B9C</button>
            <span style="font-weight: 600; font-size: 13px; flex: 1;">Ticket Dashboard</span>
            <button class="icon-button" onclick="sendCommand('refreshDashboard', null, this)" title="Refresh">\u27F3</button>
        </div>
        
        ${n.queries.length>0?`
        <div style="margin-bottom: 12px;">
            <select id="querySelect" onchange="sendCommand('switchDashboardQuery', this.value)">
                ${p}
            </select>
        </div>
        <div style="margin-bottom: 12px; display: flex; align-items: center; gap: 6px;">
            <input type="checkbox" id="showBranchesCheck" ${o?"checked":""} onchange="sendCommand('toggleDashboardBranches', this.checked)" style="margin: 0; cursor: pointer;">
            <label for="showBranchesCheck" style="font-size: 11px; cursor: pointer;">Show all Branches (MRs & Pipelines)</label>
        </div>
        `:`
        <div style="padding: 12px; opacity: 0.7; text-align: center;">No queries defined in settings.</div>
        `}

        <div style="background: var(--vscode-editor-background); border: 1px solid var(--vscode-panel-border); border-radius: 4px; overflow-x: auto; overflow-y: auto; flex: 1; display: flex; flex-direction: column;">
            ${s}
        </div>

        ${q()}
    </body>
    </html>`}function Ct(){return`<!DOCTYPE html>
    <html lang="en">
    <head>
        <meta charset="UTF-8">
        <meta name="viewport" content="width=device-width, initial-scale=1.0">
        <title>Ricwiz DevTools</title>
        ${_()}
    </head>
    <body>
        <div style="display: flex; align-items: center; gap: 8px; margin-bottom: 16px; margin-top: 8px;">
            <button class="btn" style="width: auto; padding: 4px 8px; background-color: var(--vscode-button-secondaryBackground); color: var(--vscode-button-secondaryForeground);" onclick="sendCommand('openMain', null, this)">\u2190 Back</button>
            <div style="font-weight: bold; font-size: 13px; flex: 1; text-align: center;">Developer Utilities</div>
        </div>

        <div style="display: flex; flex-direction: column; gap: 8px;">
            <button class="btn" title="Generate Salesforce package.xml from git diff" onclick="sendCommand('generatePackageXml', null, this)">
                <span class="icon" style="color: #FF9F0A;">\u25A2</span> Auto Package.xml
            </button>
            
            <button class="btn" title="Generate destructiveChanges.xml for deleted files" onclick="sendCommand('generateDestructiveChanges', null, this)">
                <span class="icon" style="color: #FF453A;">\u2A2F</span> Auto DestructiveChanges
            </button>

            <button class="btn" title="Deploy the generated package to Salesforce" onclick="sendCommand('deployPackage', null, this)">
                <span class="icon" style="color: #0A84FF;">\u2601</span> Deploy Package
            </button>

            <button class="btn" title="Smart run modified Apex Test classes" onclick="sendCommand('runSmartTests', null, this)">
                <span class="icon" style="color: #BF5AF2;">\u2697</span> Smart Test Runner
            </button>

            <button class="btn" title="Import data using Salesforce CLI" onclick="sendCommand('importData', null, this)">
                <span class="icon" style="color: #64D2FF;">\u21A7</span> Import Data
            </button>

            <div class="separator" style="margin: 4px 0;"></div>

            <button class="btn" title="Find and group all files modified in a specific ticket" onclick="sendCommand('listTicketFiles', null, this)">
                <span class="icon" style="color: #64D2FF;">\u2630</span> List Ticket Files
            </button>

            <button class="btn" title="Reset Salesforce source tracking" onclick="sendCommand('resetTracking', null, this)">
                <span class="icon" style="color: #FF453A;">\u232B</span> Reset Tracking
            </button>

            <button class="btn" title="Extract metadata components quickly from Salesforce" onclick="sendCommand('extractComponent', null, this)">
                <span class="icon" style="color: #0A84FF;">\u2601</span> Extract Component
            </button>

            <button class="btn" title="Deploy the current open file to multiple orgs simultaneously" onclick="sendCommand('deployMultiOrg', null, this)">
                <span class="icon" style="color: #0A84FF;">\u21EA</span> Deploy to Multi-Org
            </button>

            <button class="btn" title="Capture admin changes safely" onclick="sendCommand('captureAdminChanges', null, this)">
                <span class="icon" style="color: #FFD60A;">\u26B2</span> Capture Admin Changes
            </button>
            
            <button class="btn" title="Discover who last modified the current file in Git and Salesforce" onclick="sendCommand('whoToBlame', null, this)" style="background-color: var(--vscode-button-hoverBackground);">
                <span class="icon">\u2315</span> Who to Blame
            </button>
        </div>
        
        ${q()}
    </body>
    </html>`}function $t(t){let{logoUri:e,currentBranch:o,currentBranchIsMerged:i,relatedBranches:n,commits:p,baseBranches:s,recentTickets:a,ticketTitle:d,ticketStatus:c,autoRefreshEnabled:r}=t,m=_(),l=p.length>0?`
        <div class="separator"></div>
        <div style="padding: 0 4px;">
            <div style="font-size: 11px; opacity: 0.7; margin-bottom: 6px; display: flex; align-items: center; gap: 4px;">
                <span>\u2637</span> Recent Commits
            </div>
            <div style="display: flex; flex-direction: column; gap: 2px;">
                ${p.map(v=>`
                    <div style="font-size: 11px; padding: 3px 4px; border-radius: 2px; display: flex; gap: 6px; align-items: baseline;">
                        <code style="color: var(--vscode-textLink-foreground); font-size: 10px; flex-shrink: 0;">${C(v.hash)}</code>
                        <span style="flex: 1; overflow: hidden; text-overflow: ellipsis; white-space: nowrap;" title="${C(v.message)}">${C(v.message)}</span>
                        <span style="font-size: 9px; opacity: 0.5; flex-shrink: 0;">${C(v.timeAgo)}</span>
                    </div>
                `).join("")}
            </div>
        </div>
    `:"",u=n.find(v=>v.name===o),f="";u&&(f=ke(u.pipelineStatus));let h=u?u.mrUrl:void 0,w=n.filter(v=>v.name!==o),$=o?`
        <div style="background-color: var(--vscode-editor-inactiveSelectionBackground); padding: 10px; border-radius: 6px; margin-bottom: 16px; border: 1px solid var(--vscode-panel-border); box-shadow: 0 2px 4px rgba(0,0,0,0.1); position: relative;">
            ${d&&c?`
            <div style="position: absolute; top: 6px; right: 6px; z-index: 10; cursor: pointer; font-size: 9px; padding: 2px 6px; border-radius: 18px; background-color: ${qe(c)}; color: white; border: 1px solid var(--vscode-panel-border); opacity: 0.9; font-weight: bold; text-transform: uppercase; display: flex; align-items: center; gap: 4px;" onclick="sendCommand('changeJiraStatus', null, this)" title="Update Jira Status">
                <span>\u270E</span><span>${C(c)}</span>
            </div>
            `:""}
            <div style="font-size: 10px; opacity: 0.7; margin-bottom: 4px; display: flex; align-items: center; justify-content: center; gap: 4px; text-transform: uppercase;">
                <span>Current Ticket / Branch</span>
                <button class="copy-btn" onclick="sendCommand('copyBranch', null, this)" title="Copy branch name to clipboard">\u2398</button>
            </div>
            <div style="font-weight: bold; font-size: 14px; word-break: break-all; text-align: center; color: var(--vscode-textLink-foreground); display: flex; justify-content: center; align-items: center; gap: 6px;">
                <span>${C(o)}</span>
                ${f?`<span title="Pipeline: ${u.pipelineStatus}" style="font-size: 12px;">${f}</span>`:""}
                ${h?`<span onclick="event.stopPropagation(); sendCommand('openExternal', '${h}');" title="Open Merge Request" style="cursor: pointer; font-size: 12px;">\u{1F517}</span>`:""}
                ${i?'<span style="background-color: var(--vscode-charts-green); color: white; border-radius: 3px; padding: 1px 4px; font-size: 10px; font-weight: bold;" title="Merged to target env">MERGED</span>':""}
            </div>
            ${d?`<div style="font-size: 12px; margin-top: 6px; text-align: center; opacity: 0.9; font-style: italic;">${C(d)}</div>`:""}
            ${w.length>0?`
                <div style="margin-top: 10px; border-top: 1px solid var(--vscode-panel-border); padding-top: 10px;">
                    <div style="font-size: 10px; opacity: 0.7; margin-bottom: 6px; text-transform: uppercase; text-align: center;">Sister Branches</div>
                    <div style="display: flex; flex-direction: column; gap: 4px;">
                        ${w.map(v=>{let x=ke(v.pipelineStatus),y="";return v.pipelineStatus==="failed"&&v.projectPath&&v.pipelineId&&(y=`onclick="event.stopPropagation(); sendCommand('showPipelineLogs', { projectPath: '${v.projectPath}', pipelineId: ${v.pipelineId} });" style="cursor: pointer;"`),`
                            <div class="btn" style="padding: 6px 8px; font-size: 11px; display: flex; justify-content: space-between; align-items: center; background-color: var(--vscode-button-secondaryBackground); color: var(--vscode-button-secondaryForeground); border-radius: 4px; box-sizing: border-box; width: 100%;" onclick="sendCheckoutCommand('${C(v.name)}', this)" title="Checkout ${C(v.name)}">
                                <div style="display: flex; align-items: center; gap: 4px; overflow: hidden;">
                                    <span style="overflow: hidden; text-overflow: ellipsis; white-space: nowrap; font-weight: bold;">${C(v.name)}</span>
                                </div>
                                <div style="display: flex; gap: 4px; align-items: center;">
                                    ${v.isMerged?'<span style="background-color: var(--vscode-charts-green); color: white; border-radius: 3px; padding: 1px 4px; font-size: 9px; font-weight: bold;" title="Merged to target env">MERGED</span>':""}
                                    ${x?`<span title="Pipeline: ${v.pipelineStatus}" style="font-size: 10px;" ${y}>${x}</span>`:""}
                                    ${v.mrUrl?`<span onclick="event.stopPropagation(); sendCommand('openExternal', '${v.mrUrl}');" title="Open Merge Request" style="cursor: pointer; font-size: 10px;">\u{1F517}</span>`:""}
                                </div>
                            </div>`}).join("")}
                    </div>
                </div>
            `:a.length>0?`
                <div style="margin-top: 10px; border-top: 1px solid var(--vscode-panel-border); padding-top: 10px;">
                    <div style="font-size: 10px; opacity: 0.7; margin-bottom: 6px; text-transform: uppercase; text-align: center;">Recent Tickets</div>
                    <div style="display: flex; flex-direction: column; gap: 4px;">
                        ${a.map(v=>`
                            <div class="btn" style="padding: 6px 8px; font-size: 11px; display: flex; justify-content: space-between; align-items: center; background-color: var(--vscode-button-secondaryBackground); color: var(--vscode-button-secondaryForeground); border-radius: 4px; box-sizing: border-box; width: 100%;" onclick="sendCheckoutCommand('${C(v)}', this)" title="Checkout ${C(v)}">
                                <span style="font-weight: bold; overflow: hidden; text-overflow: ellipsis; white-space: nowrap;">${C(v)}</span>
                            </div>
                        `).join("")}
                    </div>
                </div>
            `:""}
            <div style="display: flex; gap: 6px; margin-top: 10px; justify-content: center;">
                <button class="btn" style="width: auto; padding: 4px 10px; font-size: 11px; display: inline-flex; align-items: center; justify-content: center; gap: 5px; background-color: var(--vscode-button-secondaryBackground); border-radius: 4px; border: 1px solid var(--vscode-panel-border); cursor: pointer;" onclick="sendCommand('showJiraDetails', null, this)" title="View Jira Details"><span class="icon" style="font-size: 12px; color: #FF9F0A;">\u2691</span><span>Jira Details</span></button>
                <button class="btn" style="width: auto; padding: 4px 10px; font-size: 11px; display: inline-flex; align-items: center; justify-content: center; gap: 5px; background-color: var(--vscode-button-secondaryBackground); border-radius: 4px; border: 1px solid var(--vscode-panel-border); cursor: pointer;" onclick="sendCommand('openDashboard', null, this)" title="View Ticket Dashboard"><span class="icon" style="font-size: 12px; color: #32D74B;">\u25A4</span><span>Dashboard</span></button>
            </div>
        </div>`:"";return`<!DOCTYPE html>
    <html lang="en">
    <head>
        <meta charset="UTF-8">
        <meta name="viewport" content="width=device-width, initial-scale=1.0">
        <title>Ricwiz</title>
        ${m}
    </head>
    <body>
        <div style="text-align: center; margin-bottom: 12px; margin-top: 8px;">
            <img src="${e}" alt="Ricwiz Logo" style="width: 80px; height: 80px; opacity: 0.9; filter: drop-shadow(0 2px 4px rgba(0,0,0,0.2));" />
        </div>

        <!-- SETTINGS & DEV TOOLS (Top Level) -->
        <div style="display: flex; gap: 8px; margin-bottom: 16px;">
            <button class="btn" style="flex: 1; justify-content: center; background-color: var(--vscode-button-secondaryBackground); border: 1px solid var(--vscode-panel-border); border-radius: 4px;" title="Developer Utilities" onclick="sendCommand('openDevTools', null, this)">
                <span class="icon" style="color: #FFD60A;">\u26B2</span> Dev Tools
            </button>
            <button class="btn" style="flex: 1; justify-content: center; background-color: var(--vscode-button-secondaryBackground); border: 1px solid var(--vscode-panel-border); border-radius: 4px;" title="Extension Settings" onclick="sendCommand('openSettings', null, this)">
                <span class="icon" style="color: #98989D;">\u2699</span> Settings
            </button>
        </div>

        <div style="display: flex; align-items: center; justify-content: space-between; margin-bottom: 6px; padding: 0 4px;">
            <div style="font-size: 11px; font-weight: bold; opacity: 0.8; text-transform: uppercase;">Workspace</div>
            <div style="display: flex; gap: 4px;">
                <button class="copy-btn" onclick="sendCommand('manualRefresh', null, this)" title="Refresh branch status" style="font-size: 13px; padding: 2px 6px; opacity: 0.8; border: 1px solid var(--vscode-panel-border);">
                    <span class="icon" style="color: #32D74B; font-size: 14px;">\u27F3</span>
                </button>
                <button class="copy-btn" id="autoRefreshToggle" onclick="sendCommand('toggleAutoRefresh', null, this)" title="${r?"Auto-refresh is ON \u2014 click to disable":"Auto-refresh is OFF \u2014 click to enable"}" style="font-size: 11px; padding: 2px 6px; border-radius: 3px; border: 1px solid var(--vscode-panel-border); ${r?"opacity: 0.9; background-color: var(--vscode-button-secondaryBackground);":"opacity: 0.5;"}">
                    ${r?"\u26A1 Auto":"\u23F8\uFE0F Auto"}
                </button>
            </div>
        </div>

        ${$}

        ${s.length>0?`
            <div style="display: flex; gap: 4px; margin-bottom: 16px; flex-wrap: wrap; justify-content: center;">
                ${s.map(v=>{let x=v.split("/").pop()?.toUpperCase()||v.toUpperCase();return`
                    <button class="btn" style="flex: 1; min-width: 25%; justify-content: center; padding: 6px 4px; font-size: 10px; font-weight: bold; background-color: var(--vscode-button-secondaryBackground); color: var(--vscode-button-secondaryForeground); border-radius: 4px;" onclick="sendCheckoutCommand('${C(v)}', this)" title="Checkout ${C(v)}">
                        ${C(x)}
                    </button>
                `}).join("")}
            </div>
        `:""}

        <!-- PRIMARY ACTIONS CARD -->
        <div style="background-color: var(--vscode-editor-inactiveSelectionBackground); padding: 10px; border-radius: 6px; margin-bottom: 16px; border: 1px solid var(--vscode-panel-border); box-shadow: 0 2px 4px rgba(0,0,0,0.1);">
            <div style="font-size: 10px; opacity: 0.7; margin-bottom: 10px; text-transform: uppercase; font-weight: bold; text-align: center;">Ticket Workflow</div>
            
            <button class="btn" style="background-color: var(--vscode-button-background); color: var(--vscode-button-foreground); font-weight: bold; margin-bottom: 6px; border-radius: 4px; padding: 8px;" title="Generates the main and environment branches" onclick="sendCommand('createBranches', null, this)">
                <span class="icon" style="color: #32D74B;">\u2387</span> Create Branches
            </button>

            <button class="btn" style="background-color: var(--vscode-button-secondaryBackground); margin-bottom: 6px; border-radius: 4px;" title="Sync environments and merge ticket" onclick="sendCommand('prepareDeploy', null, this)">
                <span class="icon" style="color: #BF5AF2;">\u2928</span> Prepare Deploy
            </button>

            <div style="display: flex; gap: 4px; margin-bottom: 6px;">
                <button class="btn" style="flex: 1; background-color: var(--vscode-button-secondaryBackground); border-radius: 4px;" title="Opens Merge Request pages in Browser" onclick="sendCommand('openMRs', null, this)">
                    <span class="icon" style="color: #0A84FF;">\u21EA</span> Open MRs
                </button>
                <button class="btn" style="width: auto; padding: 6px 12px; font-weight: bold; justify-content: center; background-color: var(--vscode-button-secondaryBackground); border-radius: 4px;" title="Open MRs in VS Code" onclick="sendCommand('openMRsVSCode', null, this)">
                    VS
                </button>
            </div>

            <button class="btn" style="background-color: var(--vscode-button-secondaryBackground); border-radius: 4px;" title="Open Jira Ticket in Browser" onclick="sendCommand('openJira', null, this)">
                <span class="icon" style="color: #FF9F0A;">\u2691</span> Open Jira
            </button>
        </div>

        <!-- SECONDARY ACTIONS CARD -->
        <div style="background-color: var(--vscode-editor-inactiveSelectionBackground); padding: 10px; border-radius: 6px; margin-bottom: 12px; border: 1px solid var(--vscode-panel-border); box-shadow: 0 2px 4px rgba(0,0,0,0.1);">
            <div style="font-size: 10px; opacity: 0.7; margin-bottom: 10px; text-transform: uppercase; font-weight: bold; text-align: center;">Git Operations</div>
            
            <button class="btn" style="margin-bottom: 6px; background-color: var(--vscode-button-secondaryBackground); border-radius: 4px;" title="Fetch and pull all branches of the current ticket" onclick="sendCommand('syncAll', null, this)">
                <span class="icon" style="color: #32D74B;">\u27F3</span> Sync All
            </button>

            <button class="btn" style="margin-bottom: 6px; background-color: var(--vscode-button-secondaryBackground); border-radius: 4px;" title="Merge latest team changes from origin base into environment branches" onclick="sendCommand('updateBases', null, this)">
                <span class="icon" style="color: #64D2FF;">\u21A7</span> Update from Base
            </button>

            <button class="btn" style="background-color: var(--vscode-button-secondaryBackground); border-radius: 4px;" title="Delete all branches of a ticket (local and remote)" onclick="sendCommand('deleteUnused', null, this)">
                <span class="icon" style="color: #FF453A;">\u2A2F</span> Delete Unused Branches
            </button>
        </div>

        <!-- AI ASSISTANCE CARD -->
        <div style="background-color: var(--vscode-editor-inactiveSelectionBackground); padding: 10px; border-radius: 6px; margin-bottom: 12px; border: 1px solid var(--vscode-panel-border); box-shadow: 0 2px 4px rgba(0,0,0,0.1);">
            <div style="font-size: 10px; opacity: 0.7; margin-bottom: 10px; text-transform: uppercase; font-weight: bold; text-align: center;">AI Assistance</div>
            
            <button class="btn" style="background-color: var(--vscode-button-secondaryBackground); border-radius: 4px;" title="Generate Commit Message with Gemini" onclick="sendCommand('generateCommitMessage', null, this)">
                <span class="icon" style="color: #BF5AF2;">\u2728</span> Generate Commit Message
            </button>
        </div>

        ${l}
        
        ${q()}
    </body>
    </html>`}var _e=class{constructor(e){this._extensionUri=e}_extensionUri;webviewView;currentBranchCache="";currentBranchIsMergedCache=!1;relatedBranchesCache=[];commitsCache=[];baseBranchesCache=[];recentTicketsCache=[];ticketTitleCache="";ticketStatusCache="";currentPage="main";blameDataCache=null;jiraDataCache=null;dashboardDataCache=null;dashboardShowBranches=!1;autoRefreshEnabled=!0;conflictState=null;resolveWebviewView(e,o,i){this.webviewView=e,e.webview.options={enableScripts:!0,localResourceRoots:[this._extensionUri]},this.updateView(),e.webview.onDidReceiveMessage(n=>{switch(n.command){case"createBranches":P.commands.executeCommand("ricwiz.createBranches");break;case"createBranchForTicket":P.commands.executeCommand("ricwiz.createBranches",n.args);break;case"prepareDeploy":P.commands.executeCommand("ricwiz.prepareDeploy");break;case"openMRs":P.commands.executeCommand("ricwiz.createMergeRequests");break;case"openMRsVSCode":P.commands.executeCommand("ricwiz.createMergeRequestsVSCode");break;case"openExternal":n.args&&P.env.openExternal(P.Uri.parse(n.args));break;case"openJira":P.commands.executeCommand("ricwiz.openJiraTicket");break;case"showJiraDetails":P.commands.executeCommand("ricwiz.showJiraDetails");break;case"showPipelineLogs":P.commands.executeCommand("ricwiz.showPipelineLogs",n.args.projectPath,n.args.pipelineId);break;case"changeJiraStatus":P.commands.executeCommand("ricwiz.changeJiraStatus");break;case"addJiraComment":P.commands.executeCommand("ricwiz.addJiraComment");break;case"addJiraLabel":P.commands.executeCommand("ricwiz.addJiraLabel");break;case"setPage":this.setPage(n.args);break;case"openDashboard":P.commands.executeCommand("ricwiz.openJiraDashboard");break;case"openJiraDetailsForId":P.commands.executeCommand("ricwiz.openJiraDetailsForId",n.args);break;case"refreshDashboard":P.commands.executeCommand("ricwiz.openJiraDashboard");break;case"switchDashboardQuery":P.commands.executeCommand("ricwiz.openJiraDashboard",parseInt(n.args,10));break;case"toggleDashboardBranches":P.commands.executeCommand("ricwiz.toggleDashboardBranches",n.args);break;case"openJiraVSCode":P.commands.executeCommand("ricwiz.openJiraTicketVSCode");break;case"openSettings":P.commands.executeCommand("ricwiz.openSettings");break;case"checkout":let p=n.branch||n.args;p&&P.commands.executeCommand("ricwiz.checkoutBranch",p);break;case"copyBranch":P.commands.executeCommand("ricwiz.copyBranchName");break;case"generatePackageXml":P.commands.executeCommand("ricwiz.generatePackageXml");break;case"openDevTools":this.setPage("devtools");break;case"openMain":this.setPage("main");break;case"generateDestructiveChanges":P.commands.executeCommand("ricwiz.generateDestructiveChanges");break;case"deployPackage":P.commands.executeCommand("ricwiz.deployPackage");break;case"runSmartTests":P.commands.executeCommand("ricwiz.runSmartTests");break;case"importData":P.commands.executeCommand("ricwiz.importData");break;case"listTicketFiles":P.commands.executeCommand("ricwiz.listTicketFiles");break;case"resetTracking":P.commands.executeCommand("ricwiz.resetTracking");break;case"extractComponent":P.commands.executeCommand("ricwiz.extractComponent");break;case"deployMultiOrg":P.commands.executeCommand("ricwiz.deployMultiOrg");break;case"captureAdminChanges":P.commands.executeCommand("ricwiz.captureAdminChanges");break;case"whoToBlame":P.commands.executeCommand("ricwiz.whoToBlame");break;case"syncAll":P.commands.executeCommand("ricwiz.syncAll");break;case"updateBases":P.commands.executeCommand("ricwiz.updateBases");break;case"deleteUnused":P.commands.executeCommand("ricwiz.deleteUnusedBranches");break;case"conflict_commitAndContinue":P.commands.executeCommand("ricwiz.conflictAction","commitAndContinue");break;case"conflict_resolveDeletions":P.commands.executeCommand("ricwiz.conflictAction","resolveDeletions");break;case"conflict_abortDeploy":P.commands.executeCommand("ricwiz.conflictAction","abortDeploy");break;case"openFile":if(n.file){let s=P.workspace.workspaceFolders;if(s){let a=P.Uri.joinPath(s[0].uri,n.file);P.commands.executeCommand("vscode.open",a)}}break;case"searchTicket":P.commands.executeCommand("ricwiz.searchTicket");break;case"manualRefresh":P.commands.executeCommand("ricwiz.manualRefresh");break;case"toggleAutoRefresh":P.commands.executeCommand("ricwiz.toggleAutoRefresh");break;case"openHistory":P.commands.executeCommand("ricwiz.openHistory");break;case"generateCommitMessage":P.commands.executeCommand("ricwiz.generateCommitMessage");break}})}setConflictState(e){this.conflictState=e,this.updateView()}updateBranch(e,o,i=[],n=[],p=[],s=[],a="",d=""){this.currentBranchCache=e,this.currentBranchIsMergedCache=o,this.relatedBranchesCache=i,this.commitsCache=n,this.baseBranchesCache=p,this.recentTicketsCache=s,this.ticketTitleCache=a,this.ticketStatusCache=d,this.webviewView&&this.updateView()}setDashboardShowBranches(e){this.dashboardShowBranches=e}getDashboardShowBranches(){return this.dashboardShowBranches}setBlameData(e){this.blameDataCache=e}setJiraData(e){this.jiraDataCache=e}setDashboardData(e){this.dashboardDataCache=e}setAutoRefresh(e){this.autoRefreshEnabled=e,this.updateView()}isAutoRefreshEnabled(){return this.autoRefreshEnabled}setPage(e){this.currentPage=e,this.updateView()}updateView(){if(!this.webviewView)return;let e=this.webviewView.webview.asWebviewUri(P.Uri.joinPath(this._extensionUri,"resources","logo.png"));if(this.conflictState){this.webviewView.webview.html=bt(e,this.conflictState);return}switch(this.currentPage){case"blame":this.webviewView.webview.html=yt(this.blameDataCache);break;case"jira":this.webviewView.webview.html=xt(this.jiraDataCache);break;case"dashboard":this.webviewView.webview.html=kt({data:this.dashboardDataCache,showBranches:this.dashboardShowBranches});break;case"devtools":this.webviewView.webview.html=Ct();break;default:this.webviewView.webview.html=$t({logoUri:e,currentBranch:this.currentBranchCache,currentBranchIsMerged:this.currentBranchIsMergedCache,relatedBranches:this.relatedBranchesCache,commits:this.commitsCache,baseBranches:this.baseBranchesCache,recentTickets:this.recentTicketsCache,ticketTitle:this.ticketTitleCache,ticketStatus:this.ticketStatusCache,autoRefreshEnabled:this.autoRefreshEnabled});break}}};var ve=k(require("vscode"));var Rt=k(require("vscode")),No=Rt.window.createOutputChannel("Ricwiz Debug");function J(t){let e=new Date().toISOString();No.appendLine(`[${e}] ${t}`),console.log(`[Ricwiz] ${t}`)}async function zt(t){J("initializeSecrets: No longer using SecretStorage. Tokens are read directly from VS Code configuration.")}async function Pt(t){J("storeJiraToken: Storing token in VS Code global configuration..."),await ve.workspace.getConfiguration("ricwiz").update("jiraApiToken",t,ve.ConfigurationTarget.Global),J("storeJiraToken: Successfully stored")}async function Qe(){J("getJiraToken: Reading token from VS Code configuration...");let e=ve.workspace.getConfiguration("ricwiz").get("jiraApiToken","");if(e)return J("getJiraToken: Successfully read Jira Token from configuration."),e;J("getJiraToken: Token not found in configuration.")}async function Bt(t){J("storeGitlabToken: Storing token in VS Code global configuration..."),await ve.workspace.getConfiguration("ricwiz").update("gitlabApiToken",t,ve.ConfigurationTarget.Global),J("storeGitlabToken: Successfully stored")}async function Ce(){J("getGitlabToken: Reading token from VS Code configuration...");let e=ve.workspace.getConfiguration("ricwiz").get("gitlabApiToken","");if(e)return e}var b=k(require("vscode"));var G=k(require("vscode")),Xe=k(require("path")),be=k(require("fs"));var Ae=k(require("vscode")),Ye=k(require("child_process")),St=k(require("util")),Jo=St.promisify(Ye.exec),R=Ae.window.createOutputChannel("Ricwiz"),g=async(t,e)=>{R.appendLine(`[EXEC] ${t}`);let o=await Jo(t,{maxBuffer:50*1024*1024,...e});return{stdout:o.stdout.toString(),stderr:o.stderr.toString()}};function z(){let t=Ae.workspace.workspaceFolders;if(t)return t[0].uri.fsPath}async function L(t){try{return(await new Promise((o,i)=>{Ye.execFile("git",["branch","--show-current"],{cwd:t},(n,p)=>{n?i(n):o(p)})})).trim()}catch{return""}}function te(t,e){if(!t.includes(e)){let o=t.match(/([A-Z]+-)\d+/i);if(o)return o[1].toUpperCase()}return e}function pe(t,e,o=!1){let i=t.match(new RegExp(`(${e}\\d+)`,"i"));return i?i[1].toUpperCase():t.includes(e)&&!t.includes("-to-")?t.substring(t.indexOf(e)):o&&t.includes("-to-")?t.substring(t.indexOf(e)).split("-to-")[0]:""}function st(t,e){let o=$e(t);return/^\d/.test(o)?`${e}${o}`.toUpperCase():o.toUpperCase()}async function Q(t,e){let o=Ae.workspace.getConfiguration("ricwiz"),i=e?.prefix??o.get("ticketPrefix","SFPSCA-"),n=await L(t),p=te(n,i),s=e?.suggestedValue??pe(n,p,e?.handleToSuffix),a=await Ae.window.showInputBox({prompt:e?.prompt||"Enter the full ticket ID (e.g., SCPSCA-1234) or just the number",placeHolder:e?.placeHolder||"Ticket ID or number",value:s,ignoreFocusOut:!0});return a?{ticketId:st(a,p),currentBranch:n,prefix:p}:void 0}async function se(t,e){try{return await g(`git show-ref --verify --quiet refs/heads/${e}`,{cwd:t}),!0}catch{}return await jo(t,e)}async function jo(t,e){try{let{stdout:o}=await g(`git branch -r --list "*/${e}"`,{cwd:t});return o.trim().length>0}catch{return!1}}function $e(t){return t.replace(/[&|;$><`\\!"'\r\n]/g,"").trim()}var Re=k(require("vscode")),Dt=k(require("path")),Ze=k(require("fs"));var D=class t{style;upstreamRemote;originRemote;ticketSourceBranch;ticketPrefix;branchPrefix;environments;activeProfile;profileName;constructor(e){this.activeProfile=e,this.profileName=e?.name;let o=Re.workspace.getConfiguration("ricwiz");this.style=e?.workflowStyle||o.get("workflowStyle","standard"),this.style==="multi-remote"?(this.upstreamRemote=e?.upstreamRemote||o.get("upstreamRemote","salesforce-master"),this.originRemote=e?.originRemote||o.get("originRemote","origin")):(this.upstreamRemote="origin",this.originRemote="origin"),this.ticketSourceBranch=e?.ticketSourceBranch||o.get("ticketSourceBranch","main"),this.ticketPrefix=e?.ticketPrefix||o.get("ticketPrefix","SFPSCA-"),this.branchPrefix=e?.branchPrefix??o.get("branchPrefix","");let i=[{name:"Qual",sourceBranch:"quality"},{name:"Val",sourceBranch:"validation"},{name:"Prod",sourceBranch:"main"}];this.environments=e?.environments||o.get("environments",i)}getConfig(e,o){return this.activeProfile&&this.activeProfile[e]!==void 0?this.activeProfile[e]:Re.workspace.getConfiguration("ricwiz").get(e,o)}static async initialize(e,o){let n=Re.workspace.getConfiguration("ricwiz").get("profiles",[]),p=Dt.join(e,"ricwiz.json");if(Ze.existsSync(p))try{let s=Ze.readFileSync(p,"utf-8"),a=JSON.parse(s);a&&Array.isArray(a.profiles)&&(n=[...n,...a.profiles])}catch(s){Re.window.showErrorMessage(`Ricwiz: Error parsing ricwiz.json: ${s.message}`)}if(n.length>0){if(!o?.forcePrompt)try{let{stdout:c}=await g("git branch --show-current",{cwd:e}),r=c.trim(),m=r;r.includes("-to-")&&(m=r.split("-to-")[0]);let{stdout:l}=await g(`git config branch.${m}.ricwiz-profile`,{cwd:e}),u=l.trim();if(u){let f=n.find(h=>h.name===u);if(f)return new t(f)}}catch{}if(o?.skipPrompt)return new t;let s=n.map(c=>c.name),a=await Re.window.showQuickPick(s,{placeHolder:"Ricwiz: Select Workflow Profile",ignoreFocusOut:!0});if(!a)return;let d=n.find(c=>c.name===a);return new t(d)}return new t}buildUpstreamPath(e){return e.includes("/")?e:`${this.upstreamRemote}/${e}`}getFetchRemote(e){return e.includes("/")?e.split("/")[0]:this.upstreamRemote}getFetchBranch(e){return e.includes("/")?e.substring(e.indexOf("/")+1):e}};function Ke(t){let e=t.replace(/\\/g,"/");if(e.includes("/classes/")){let o=e.match(/\/classes\/([^/.]+)\.cls/);if(o)return{type:"ApexClass",name:o[1]}}if(e.includes("/triggers/")){let o=e.match(/\/triggers\/([^/.]+)\.trigger/);if(o)return{type:"ApexTrigger",name:o[1]}}if(e.includes("/lwc/")){let o=e.match(/\/lwc\/([^/]+)\//);if(o)return{type:"LightningComponentBundle",name:o[1]}}if(e.includes("/aura/")){let o=e.match(/\/aura\/([^/]+)\//);if(o)return{type:"AuraDefinitionBundle",name:o[1]}}if(e.includes("/objects/")&&e.includes("/fields/")){let o=e.match(/\/objects\/([^/]+)\//),i=e.match(/\/fields\/([^/.]+)\.field/);if(o&&i)return{type:"CustomField",name:`${o[1]}.${i[1]}`}}if(e.includes("/objects/")){let o=e.match(/\/objects\/([^/.]+)\.object/);if(o)return{type:"CustomObject",name:o[1]}}if(e.includes("/layouts/")){let o=e.match(/\/layouts\/([^/.]+)\.layout/);if(o)return{type:"Layout",name:o[1]}}if(e.includes("/flows/")){let o=e.match(/\/flows\/([^/.]+)\.flow/);if(o)return{type:"Flow",name:o[1]}}if(e.includes("/permissionsets/")){let o=e.match(/\/permissionsets\/([^/.]+)\.permissionset/);if(o)return{type:"PermissionSet",name:o[1]}}if(e.includes("/permissionsetgroups/")){let o=e.match(/\/permissionsetgroups\/([^/.]+)\.permissionsetgroup/);if(o)return{type:"PermissionSetGroup",name:o[1]}}if(e.includes("/profiles/")){let o=e.match(/\/profiles\/([^/.]+)\.profile/);if(o)return{type:"Profile",name:o[1]}}if(e.includes("/customMetadata/")){let o=e.match(/\/customMetadata\/([^/.]+)\.md/);if(o)return{type:"CustomMetadata",name:o[1]}}if(e.includes("/flexipages/")){let o=e.match(/\/flexipages\/([^/.]+)\.flexipage/);if(o)return{type:"FlexiPage",name:o[1]}}return null}async function Tt(){let t=z();if(!t){G.window.showErrorMessage("Ricwiz: Open a workspace that is a Git repository.");return}let e=await D.initialize(t,{skipPrompt:!0}),o=e?e.ticketSourceBranch:G.workspace.getConfiguration("ricwiz").get("ticketSourceBranch","main"),i=e?e.originRemote:"origin";await G.window.withProgress({location:G.ProgressLocation.Notification,title:`Ricwiz: Finding deleted files compared to ${i}/${o}...`,cancellable:!1},async()=>{try{let{stdout:n}=await g(`git diff --name-only --diff-filter=D ${i}/${o}...HEAD`,{cwd:t}),p=n.split(`
`).map(u=>u.trim()).filter(u=>u.length>0);if(p.length===0){G.window.showInformationMessage(`Ricwiz: No deleted files found compared to ${i}/${o}.`);return}let s={},a=(u,f)=>{s[u]||(s[u]=[]),s[u].includes(f)||s[u].push(f)};for(let u of p){let f=Ke(u);f&&a(f.type,f.name)}if(Object.keys(s).length===0){G.window.showInformationMessage("Ricwiz: Found deleted files in Git, but none mapped to recognizable Salesforce metadata.");return}let d=`<?xml version="1.0" encoding="UTF-8"?>
<Package xmlns="http://soap.sforce.com/2006/04/metadata">
`;for(let u of Object.keys(s).sort()){d+=`    <types>
`;for(let f of s[u].sort())d+=`        <members>${f}</members>
`;d+=`        <name>${u}</name>
    </types>
`}d+=`    <version>58.0</version>
</Package>`;let c=Xe.join(t,"destructiveChanges");be.existsSync(c)||be.mkdirSync(c);let r=Xe.join(c,"destructiveChanges.xml"),m=Xe.join(c,"package.xml");be.writeFileSync(r,d,"utf8"),be.existsSync(m)||be.writeFileSync(m,`<?xml version="1.0" encoding="UTF-8"?>
<Package xmlns="http://soap.sforce.com/2006/04/metadata">
    <version>58.0</version>
</Package>`,"utf8");let l=await G.workspace.openTextDocument(r);await G.window.showTextDocument(l),G.window.showInformationMessage("Ricwiz: destructiveChanges.xml generated successfully!")}catch(n){G.window.showErrorMessage(`Ricwiz: Error generating destructive changes: ${n.message}`)}})}var ae=k(require("vscode"));async function Et(){let t=z();if(!t)return;let e=await D.initialize(t,{skipPrompt:!0}),o=e?e.ticketSourceBranch:ae.workspace.getConfiguration("ricwiz").get("ticketSourceBranch","main"),i=e?e.originRemote:"origin";await ae.window.withProgress({location:ae.ProgressLocation.Notification,title:"Ricwiz: Finding Apex Tests to run...",cancellable:!1},async()=>{try{let{stdout:n}=await g(`git diff --name-status ${i}/${o}...HEAD`,{cwd:t}),p=n.split(`
`).map(u=>u.trim()).filter(u=>u.length>0),s=new Set,a=new Set;for(let u of p){let f=u.split(/\s+/);if(f[0].startsWith("D"))continue;let h=f[1];if(h&&h.endsWith(".cls")){let w=h.match(/\/classes\/([^/.]+)\.cls/);if(w){let $=w[1];$.toLowerCase().endsWith("test")?s.add($):a.add($)}}}for(let u of a)s.add(`${u}Test`);if(s.size===0){ae.window.showInformationMessage("Ricwiz: No Apex Classes were modified in this branch.");return}let d=Array.from(s).map(u=>({label:`$(beaker) ${u}`,description:"Apex Test Class"})),c=await ae.window.showQuickPick(d,{canPickMany:!0,title:"Select Test Classes to Run",placeHolder:"Select tests..."});if(!c||c.length===0)return;let m=`sf apex run test -n ${c.map(u=>u.label.replace("$(beaker) ","").trim()).join(",")} -r human -w 30`,l=ae.window.createTerminal("Ricwiz: Smart Tests");l.show(),l.sendText(m)}catch(n){ae.window.showErrorMessage(`Ricwiz: Error finding tests: ${n.message}`)}})}var M=k(require("vscode"));var ze=class{static isValidShellArg(e){return e?/^[a-zA-Z0-9\-_/.]+$/.test(e):!1}};async function Mt(t){let e=z();if(!e){M.window.showErrorMessage("Open a folder or workspace that is a Git repository.");return}let o=await D.initialize(e,{forcePrompt:!0});if(!o)return;let i=typeof t=="string"?t:void 0,n=await Q(e,{prefix:o.ticketPrefix,suggestedValue:i});if(!n){M.window.showErrorMessage("Branch creation cancelled: Ticket not provided.");return}let{ticketId:p}=n,s=o.environments,a="";if(o.branchPrefix){let f=await M.window.showInputBox({prompt:"Ricwiz: Branch Prefix (leave empty to not use a prefix)",placeHolder:"e.g. CRC-R19-",value:o.branchPrefix,ignoreFocusOut:!0});if(f===void 0){M.window.showInformationMessage("Branch creation cancelled.");return}a=f.trim()}let d=a?`${a}${p}`:p,c=[{label:`$(git-branch) Main Branch (${d})`,description:`Base: ${o.ticketSourceBranch}`,picked:!0,type:"main",branchName:d}];for(let f of s){let h=a?`${a}${p}-to-${f.name}`:`${p}-to-${f.name}`;c.push({label:`$(cloud) ${f.name} (${h})`,description:`Base: ${f.sourceBranch}`,picked:!0,type:"env",branchName:h,envConfig:f})}let r=await M.window.showQuickPick(c,{placeHolder:"Ricwiz: Select branches to create (check/uncheck as needed)",canPickMany:!0,ignoreFocusOut:!0});if(!r||r.length===0){M.window.showInformationMessage("Branch creation cancelled: No branches selected.");return}let m=r.some(f=>f.type==="main"),l=r.filter(f=>f.type==="env").map(f=>({env:f.envConfig,branchName:f.branchName})),u=o.ticketSourceBranch;if(m){let f=[];try{let{stdout:x}=await g('git branch --all --format="%(refname:short)"',{cwd:e});f=x.split(`
`).map(y=>y.trim()).filter(y=>y&&y!=="origin"),f=[...new Set(f)]}catch{}let h=M.window.createQuickPick();h.title=`Ricwiz: Base Source Branch for '${d}'`,h.placeholder="Confirm or change the source branch for this ticket";let w=f.find(x=>x.endsWith(`/${o.ticketSourceBranch}`))??o.ticketSourceBranch;h.value=w,h.ignoreFocusOut=!0;let $=()=>{let x=h.value.trim(),y=[];x&&y.push({label:x,description:"Use typed branch"}),y.push(...f.map(S=>({label:S}))),h.items=y};h.onDidChangeValue($),$();let v=await new Promise(x=>{h.onDidAccept(()=>{let y=h.selectedItems[0];x(y?y.label:h.value),h.hide()}),h.onDidHide(()=>x(void 0)),h.show()});if(!v){M.window.showInformationMessage("Branch creation cancelled.");return}u=v.trim()}if(m&&!ze.isValidShellArg(d)){M.window.showErrorMessage(`Invalid format for ticket ID: ${d}`);return}if(m&&!ze.isValidShellArg(u)){M.window.showErrorMessage(`Invalid format for ticketSourceBranch in settings: ${u}`);return}for(let f of l){if(!ze.isValidShellArg(f.env.name)){M.window.showErrorMessage(`Invalid format for environment name: ${f.env.name}`);return}if(!ze.isValidShellArg(f.env.sourceBranch)){M.window.showErrorMessage(`Invalid format for environment sourceBranch: ${f.env.sourceBranch}`);return}}try{await g("git status",{cwd:e})}catch{M.window.showErrorMessage("The opened folder does not appear to be a valid Git repository.");return}try{await M.window.withProgress({location:M.ProgressLocation.Notification,title:"Ricwiz: Creating Branches",cancellable:!1},async f=>{let h=[];f.report({message:"Checking remote status (git fetch)...",increment:10});try{await g("git fetch",{cwd:e})}catch{}try{if(m){if(f.report({message:`Creating main branch ${d}...`,increment:15}),await se(e,d))M.window.showInformationMessage(`Ricwiz: The branch ${d} already exists. Skipping creation...`),await g(`git checkout ${d}`,{cwd:e});else try{let $=o.getFetchRemote(u),v=o.getFetchBranch(u),x=o.buildUpstreamPath(u);await g(`git fetch ${$} ${v}`,{cwd:e}),await g(`git checkout -b ${d} ${x}`,{cwd:e}),h.push(d)}catch{try{await g(`git checkout -b ${d} ${u}`,{cwd:e}),h.push(d)}catch{throw new Error(`Could not create main branch '${d}' from '${u}'. Does the source branch exist?`)}}try{await g(`git config branch.${d}.ricwiz-source "${u}"`,{cwd:e}),o.profileName&&await g(`git config branch.${d}.ricwiz-profile "${o.profileName}"`,{cwd:e})}catch{}}if(l.length>0){let $=50/(l.length||1);for(let v of l){let x=v.branchName,y=v.env.sourceBranch;if(f.report({message:`Processing environment branch ${x}...`,increment:$}),!await se(e,x))try{let S=o.getFetchRemote(y),E=o.getFetchBranch(y),B=o.buildUpstreamPath(y);await g(`git fetch ${S} ${E}`,{cwd:e}),await g(`git checkout -b ${x} ${B}`,{cwd:e}),h.push(x)}catch{try{await g(`git checkout -b ${x} ${y}`,{cwd:e}),h.push(x)}catch{throw new Error(`Could not create environment branch '${x}' from '${y}'. Does the source branch exist?`)}}}}f.report({message:`Publishing branches to ${o.originRemote}...`,increment:15});for(let $ of h)try{await g(`git push -u ${o.originRemote} ${$}`,{cwd:e})}catch{M.window.showWarningMessage(`Ricwiz: Branch ${$} was created locally but could not be pushed to ${o.originRemote}.`)}let w=m?d:l[0]?.branchName||"";if(w){f.report({message:`Switching to ${w}...`,increment:10});try{await g(`git checkout ${w}`,{cwd:e})}catch{}}f.report({increment:100}),M.window.showInformationMessage("Ricwiz: All set! You can start working on your branches! \u{1F680}")}catch(w){if(M.window.showErrorMessage(`Ricwiz Branch Creation Failed: ${w.message}`),h.length>0){try{await g(`git checkout ${u}`,{cwd:e})}catch{}for(let $ of h)try{await g(`git branch -D ${$}`,{cwd:e})}catch{}M.window.showWarningMessage(`Ricwiz: Rolled back (deleted) ${h.length} branch(es) locally due to failure.`)}}})}catch(f){M.window.showErrorMessage(`Ricwiz general error: ${f.message}`)}}var F=k(require("vscode"));var ye=k(require("vscode")),Oe=k(require("fs")),Ne=k(require("path"));var ct;function at(t){ct=t}async function At(t){ct&&await ct(t)}async function Pe(t,e,o,i,n){i&&i.report({message:"CONFLICT! Resolve & click 'Commit & Continue' in Ricwiz panel."});let p=!1,s=!1;n&&n.onCancellationRequested(()=>{s=!0});let a=async()=>{try{let{stdout:r}=await g("git status --porcelain",{cwd:t});return r.split(`
`).filter(m=>{let l=m.substring(0,2);return["UD","DU","DD","AU","UA"].includes(l)}).map(m=>m.substring(3).trim())}catch{return[]}},d=async()=>{try{let r=l=>l==="UU"?"Both Modified":l==="UD"?"Deleted by them":l==="DU"?"Deleted by us":l==="DD"?"Both Deleted":l==="AA"?"Both Added":l==="AU"?"Added by us":l==="UA"?"Added by them":"Conflicted",{stdout:m}=await g("git status --porcelain",{cwd:t});return m.split(`
`).map(l=>l.trimEnd()).filter(l=>l.length>2).filter(l=>{let u=l.substring(0,2);return["UU","AA","UD","DU","AU","UA","DD"].includes(u)}).map(l=>{let u=l.substring(0,2);return{file:l.substring(3).trim(),state:r(u)}})}catch{return[]}},c=async()=>{if(p)return;let r=await a(),m=await d();ce&&ce.setConflictState({isConflict:!0,sourceStr:e,targetStr:o,deletionsCount:r.length,files:m})};for(at(async r=>{if(r==="abortDeploy")s=!0;else if(r==="resolveDeletions"){try{let l=(await a()).map(f=>({label:f})),u=await ye.window.showQuickPick(l,{canPickMany:!0,placeHolder:"Select conflicted files to DELETE",title:"Ricwiz: Delete Conflicted Files"});if(u&&u.length>0){for(let f of u)try{await g(`git rm --force "${f.label}"`,{cwd:t})}catch{}ye.window.showInformationMessage(`Ricwiz: Deleted ${u.length} conflicted file(s).`)}}catch(m){ye.window.showErrorMessage(`Ricwiz: Error. (${m.message})`)}c()}else if(r==="commitAndContinue")try{let l=(await a()).filter(f=>Oe.existsSync(Ne.join(t,f)));if(l.length>0&&await ye.window.showWarningMessage(`Wait! There are ${l.length} file(s) with deletion conflicts that are still on your disk.

If you commit now, you will KEEP them in the project.

Are you sure you want to KEEP them?`,{modal:!0},"Yes, KEEP them","No, let me DELETE them")!=="Yes, KEEP them"){c();return}let u=!1;try{let{stdout:f}=await g('git grep -E "^<<<<<<< "',{cwd:t});f.trim().length>0&&(u=!0)}catch{}if(u){ye.window.showErrorMessage("Ricwiz: You still have unresolved conflict markers (<<<<<<<) in your files. Please resolve them first!"),c();return}await g("git add .",{cwd:t}),await g("git commit --no-edit",{cwd:t})}catch(m){ye.window.showErrorMessage(`Ricwiz: Could not commit automatically. (${m.message})`),c()}}),c();;){if(s){p=!0,at(void 0),ce?.setConflictState(null);try{await g("git merge --abort",{cwd:t})}catch{}return!1}try{let{stdout:r}=await g("git status --porcelain",{cwd:t}),m=r.split(`
`).some(w=>{let $=w.substring(0,2);return["UU","AA","UD","DU","AU","UA","DD"].includes($)}),l=Ne.join(t,".git","MERGE_HEAD"),u=Ne.join(t,".git","REBASE_HEAD"),f=Ne.join(t,".git","CHERRY_PICK_HEAD");if(!(m||Oe.existsSync(l)||Oe.existsSync(u)||Oe.existsSync(f)))return p=!0,at(void 0),ce?.setConflictState(null),ye.window.showInformationMessage("Ricwiz: Changes committed!"),!0}catch{}await new Promise(r=>setTimeout(r,2e3))}}var et=k(require("https")),Lt=k(require("vscode"));async function mt(){let t=await Ce();return!!(t&&t.trim())}async function Wo(t,e){let o=Lt.workspace.getConfiguration("ricwiz"),i=(await Ce())?.trim();if(!i)throw new Error("No GitLab token");let n=e?e.getConfig("gitlabUrlOverride",""):o.get("gitlabUrlOverride",""),p=[];if(n&&n.trim()!=="")p.push(n.trim());else try{let{stdout:a}=await g("git remote",{cwd:t}),d=a.split(`
`).map(r=>r.trim()).filter(r=>r),c=[];e&&e.upstreamRemote&&d.includes(e.upstreamRemote)&&c.push(e.upstreamRemote),e&&e.originRemote&&e.originRemote!==e.upstreamRemote&&d.includes(e.originRemote)&&c.push(e.originRemote),d.includes("upstream")&&!c.includes("upstream")&&c.push("upstream"),d.includes("origin")&&!c.includes("origin")&&c.push("origin"),c.length===0&&d.length>0&&c.push(...d);for(let r of c)try{let{stdout:m}=await g(`git remote get-url ${r}`,{cwd:t}),l=m.trim();l.endsWith(".git")&&(l=l.slice(0,-4)),l.startsWith("git@")&&(l=l.replace("git@","").replace(":","/"),l=`https://${l}`),p.push(l)}catch(m){R.appendLine(`[GitLab API] Error getting remote URL for ${r}: ${m.message}`)}}catch(a){R.appendLine(`[GitLab API] Error getting remotes: ${a.message}`)}if(p.length===0)throw R.appendLine("[GitLab API] No candidate URLs found in getGitlabTargets!"),new Error("Could not get any remote origin URL.");return p.map(a=>{let d=new URL(a),c=`${d.protocol}//${d.host}`,r=d.pathname;r.startsWith("/")&&(r=r.substring(1)),r.endsWith("/")&&(r=r.slice(0,-1)),r.endsWith(".git")&&(r=r.slice(0,-4));let m=encodeURIComponent(r);return{baseUrl:c,token:i,projectPath:m}})}var Go=new et.Agent({keepAlive:!0,maxSockets:10});async function dt(t,e,o,i){let n=new URL(`${t}${i}`);return R.appendLine(`[GitLab API] ${o} ${n.toString()}`),new Promise((p,s)=>{let a=et.request(n,{method:o,timeout:5e3,agent:Go,headers:{"PRIVATE-TOKEN":e,Accept:"application/json"}},d=>{let c="";d.on("data",r=>c+=r),d.on("end",()=>{if(R.appendLine(`[GitLab API] Response Code: ${d.statusCode}`),d.statusCode&&d.statusCode>=400)return R.appendLine(`[GitLab API] Error Data: ${c}`),s(new Error(`GitLab API error: ${d.statusCode}`));if(!c)return p({});try{let r=JSON.parse(c);Array.isArray(r)?R.appendLine(`[GitLab API] Returned array with ${r.length} items`):r&&typeof r=="object"&&R.appendLine(`[GitLab API] Returned object with id ${r.id||r.iid||"unknown"}`),p(r)}catch(r){R.appendLine(`[GitLab API] Parse Error: ${r.message}`),s(r)}})});a.on("timeout",()=>{a.destroy(),s(new Error("GitLab request timed out"))}),a.on("error",d=>{R.appendLine(`[GitLab API] Request Failed: ${d.message}`),s(d)}),a.end()})}var lt=new Map,Ho=30*1e3;async function pt(t,e,o,i){R.appendLine(`[GitLab API] fetchMergeRequestStatus called for source: ${e}, target: ${o||"any"}`);let n=`${t}:${e}:${o||"any"}`,p=lt.get(n);if(p&&Date.now()-p.timestamp<Ho)return p.data;try{let s=await Wo(t,i),a=null,d=-1;for(let c of s)try{let r=`/api/v4/projects/${c.projectPath}/merge_requests?source_branch=${encodeURIComponent(e)}&order_by=updated_at&sort=desc`;o&&(r+=`&target_branch=${encodeURIComponent(o)}`);let m=await dt(c.baseUrl,c.token,"GET",r);if(m&&m.length>0){let l=m[0];try{let w=await dt(c.baseUrl,c.token,"GET",`/api/v4/projects/${c.projectPath}/merge_requests/${l.iid}`);w&&(l=w)}catch{}let u="none";if(l.head_pipeline&&l.head_pipeline.status){let w=l.head_pipeline.status;w==="success"||w==="failed"||w==="canceled"||w==="skipped"?u=w:u="running"}let f={isMerged:l.state==="merged",isOpen:l.state==="opened",pipelineStatus:u,webUrl:l.web_url,projectPath:c.projectPath,pipelineId:l.head_pipeline?l.head_pipeline.id:void 0},h=0;f.isOpen?h=2:f.isMerged&&(h=1),h>d&&(a=f,d=h)}}catch(r){R.appendLine(`[GitLab API] Error inside target loop: ${r.message}`)}if(a)return lt.set(n,{data:a,timestamp:Date.now()}),a;for(let c of s)try{let r=`/api/v4/projects/${c.projectPath}/pipelines?ref=${encodeURIComponent(e)}&order_by=updated_at&sort=desc`,m=await dt(c.baseUrl,c.token,"GET",r);if(m&&m.length>0){let l=m[0],u="none";if(l.status){let h=l.status;h==="success"||h==="failed"||h==="canceled"||h==="skipped"?u=h:u="running"}let f={isMerged:!1,isOpen:!1,pipelineStatus:u,webUrl:l.web_url,projectPath:c.projectPath,pipelineId:l.id};return lt.set(n,{data:f,timestamp:Date.now()}),f}}catch{}return null}catch(s){return R.appendLine(`[GitLab API] Failed to fetch MR status: ${s.message}`),null}}function It(t,e){return e.find(o=>t.endsWith(`-to-${o.name}`))}async function Be(t,e,o,i,n){let p=await mt(),s=e.map(async a=>{let d=It(a,i);if(p){let c=d?d.sourceBranch:void 0,r=await pt(t,a,c,n);if(r)return{name:a,isMerged:r.isMerged,pipelineStatus:r.pipelineStatus,mrUrl:r.webUrl,projectPath:r.projectPath,pipelineId:r.pipelineId}}else R.appendLine(`[GitLab API] Skipping MR check for ${a} because hasGitlabToken() is false`);return{name:a,isMerged:!1,pipelineStatus:"none"}});return await Promise.all(s)}async function Ft(t,e,o,i){let n=It(e,o);if(!n)return!1;if(await mt()){let p=await pt(t,e,n.sourceBranch,i);if(p)return p.isMerged}else R.appendLine(`[GitLab API] Skipping MR check for current branch ${e} because hasGitlabToken() is false`);return!1}async function Ut(t,e=10){try{let{stdout:o}=await g(`git log --oneline -${e} --format="%h|||%s|||%ar"`,{cwd:t});return o.split(`
`).filter(i=>i.trim()).map(i=>{let n=i.split("|||");return{hash:n[0]||"",message:n.length>=3?n.slice(1,-1).join("|||"):n[1]||"",timeAgo:n.length>=3?n[n.length-1]:""}})}catch{return[]}}async function Ot(t,e=3){try{let{stdout:o}=await g('git for-each-ref --sort=-committerdate --format="%(refname:short)" refs/heads/',{cwd:t}),i=o.split(`
`).map(p=>p.trim()).filter(p=>p),n=/^[A-Z]+-\d+$/i;return i.filter(p=>n.test(p)).slice(0,e)}catch{return[]}}async function Se(t,e,o){let{stdout:i}=await g(`git branch --all --list "*${e}*"`,{cwd:t}),n=new Set,p=new RegExp(`${e}(?!\\d)`,"i");return i.split(`
`).forEach(s=>{let a=s.replace("*","").trim();if(a){if(a.startsWith("remotes/")){let d=a.split("/");d.length>2&&(a=d.slice(2).join("/"))}a&&a!==o&&!a.includes("HEAD")&&p.test(a)&&n.add(a)}}),Array.from(n)}async function de(t,e,o){try{let{stdout:i}=await g(`git branch --all --list "*${e}*"`,{cwd:t}),n=new RegExp(`${e}(?!\\d)`,"i"),p=i.split(`
`).map(a=>a.replace("*","").trim().replace(/^remotes\/[^\/]+\//,"")).filter(a=>a&&!a.includes("HEAD")&&n.test(a)),s=Array.from(new Set(p));if(o){let a=`-to-${o}`,d=s.find(c=>c.endsWith(a));return d||`${e}${a}`}else{let a=s.find(d=>!d.includes("-to-"));return a||e}}catch{return o?`${e}-to-${o}`:e}}async function Nt(){let t=z();if(!t){F.window.showErrorMessage("Ricwiz: Open a folder or workspace that is a Git repository.");return}try{await g("git status",{cwd:t})}catch{F.window.showErrorMessage("Ricwiz: The opened folder does not appear to be a valid Git repository.");return}let e=await D.initialize(t);if(!e)return;let o=e.environments,i=await Q(t,{prefix:e.ticketPrefix});if(!i){F.window.showErrorMessage("Operation cancelled: Ticket not provided.");return}let{ticketId:n,currentBranch:p}=i;try{await g("git fetch --all",{cwd:t})}catch{}let s=await de(t,n);if(!await se(t,s)){F.window.showErrorMessage(`Ricwiz: Main branch '${s}' does not exist! Prepare deploy is only available when a main ticket branch is used.`);return}let a=[];for(let l of o){let u=await de(t,n,l.name);await se(t,u)&&a.push({env:l,branchName:u})}let d=a.length===0,c="";if(d){let l="";try{let{stdout:f}=await g(`git config branch.${s}.ricwiz-source`,{cwd:t});l=f.trim()}catch{}if(!l&&s.includes(n)&&s!==n){let f=s.split(n)[0].replace(/[-_]+$/,"");f&&(l=f)}l||(l=e.ticketSourceBranch||"main");let u=await F.window.showInputBox({prompt:`Ricwiz: Confirm or enter the Release branch in '${e.originRemote}' to merge into '${s}'`,placeHolder:"e.g. CRC-R19, main, release/v5.0",value:l,ignoreFocusOut:!0});if(u===void 0||!u.trim()){F.window.showInformationMessage("Ricwiz: Prepare deploy cancelled.");return}c=u.trim();try{await g(`git config branch.${s}.ricwiz-source "${c}"`,{cwd:t})}catch{}}let r=e.getConfig("defaultReviewers",""),m="";try{let{stdout:l}=await g(`git config branch.${s}.ricwiz-reviewers`,{cwd:t});m=l.trim()}catch{}if(r.trim()){let l=await F.window.showInputBox({prompt:"Ricwiz: Reviewers for this deploy (optional, comma-separated)",placeHolder:"e.g. @joao, 123456",value:m||r,ignoreFocusOut:!0});if(l===void 0)return;try{l.trim()?await g(`git config branch.${s}.ricwiz-reviewers "${l.trim()}"`,{cwd:t}):m&&await g(`git config --unset branch.${s}.ricwiz-reviewers`,{cwd:t})}catch{}}await F.window.withProgress({location:F.ProgressLocation.Notification,title:"Ricwiz: Preparing Deploy",cancellable:!0},async(l,u)=>{let f=0,h=p,w=!1;u.onCancellationRequested(()=>{w=!0});let $=async(v,x)=>{try{await g(`git merge ${v}`,{cwd:t})}catch(y){let S=!1;try{let{stdout:B}=await g("git ls-files -u",{cwd:t});B.trim().length>0&&(S=!0)}catch{}let E=((y.stdout||"")+(y.stderr||"")+(y.message||"")).toLowerCase();if(S||E.includes("conflict")||E.includes("conflit")){if(!await Pe(t,v,x,l,u))throw w=!0,new Error("Deploy aborted by user.")}else throw y}};if(d)try{l.report({message:`Fetching ${c} from ${e.originRemote}...`,increment:15}),await g(`git fetch ${e.originRemote} ${c}`,{cwd:t}),l.report({message:`Switching to ${s}...`,increment:15}),await g(`git checkout ${s}`,{cwd:t});try{await g(`git pull ${e.originRemote} ${s}`,{cwd:t})}catch{}if(l.report({message:`Merging ${e.originRemote}/${c} into ${s}...`,increment:35}),await $(`${e.originRemote}/${c}`,s),w)return;l.report({message:`Pushing ${s} to ${e.originRemote}...`,increment:25}),await g(`git push ${e.originRemote} ${s}`,{cwd:t}),l.report({message:"Finishing up...",increment:10}),F.window.showInformationMessage(`Ricwiz: Release branch '${c}' merged into '${s}' and pushed to ${e.originRemote}! \u{1F680}`)}catch(v){v.message?.includes("aborted")?F.window.showInformationMessage("Ricwiz: Deploy cancelled."):F.window.showErrorMessage(`Ricwiz: Failed to prepare release ticket ${s}. Detail: ${v.message}`)}else{l.report({message:"Syncing remote information...",increment:10});try{let x=10/(a.length||1);for(let y of a)try{if(w)throw new Error("Aborted");l.report({message:`Fetching ${y.env.sourceBranch}...`,increment:x});let S=e.getFetchRemote(y.env.sourceBranch),E=e.getFetchBranch(y.env.sourceBranch);await g(`git fetch ${S} ${E}`,{cwd:t})}catch{}}catch{}let v=60/(a.length||1);for(let x of a){if(w)break;let y=x.branchName,S=x.env.sourceBranch;try{l.report({message:`Processing ${y}...`,increment:v/4}),await g(`git checkout ${y}`,{cwd:t});try{await g(`git pull ${e.originRemote} ${y}`,{cwd:t})}catch{}l.report({message:`Merging ${S} into ${y}...`,increment:v/4});let E=e.getFetchRemote(S),B=e.getFetchBranch(S),U=e.buildUpstreamPath(S);if(await g(`git fetch ${E} ${B}`,{cwd:t}),await $(U,y),l.report({message:`Merging ${s} into ${y}...`,increment:v/4}),await $(s,y),w)break;l.report({message:`Pushing ${y}...`,increment:v/4}),await g(`git push ${e.originRemote} ${y}`,{cwd:t}),f++}catch(E){E.message.includes("aborted")?F.window.showInformationMessage("Ricwiz: Deploy cancelled."):F.window.showErrorMessage(`Ricwiz: Failed to process branch ${y}. Detail: ${E.message}`);return}}if(!w){l.report({message:"Finishing up...",increment:10});let x=h;try{await g(`git show-ref --verify --quiet refs/heads/${s}`,{cwd:t}),x=s}catch{}try{let y=await L(t);x&&x!==y?(await g(`git checkout ${x}`,{cwd:t}),F.window.showInformationMessage(`Ricwiz: Operation complete. Back on branch ${x}.`)):F.window.showInformationMessage("Ricwiz: Operation complete.")}catch{F.window.showInformationMessage("Ricwiz: Operation complete.")}}}})}var oe=k(require("vscode"));async function Jt(t=!1){let e=z();if(!e)return;let o=await D.initialize(e);if(!o)return;let i=await Q(e,{prefix:o.ticketPrefix,prompt:"Enter the full ticket ID for the Merge Requests (e.g., SFPSCA-1234) or just the number"});if(!i)return;let{ticketId:n}=i,p=o.getConfig("gitlabUrlOverride",""),s="";if(p&&p.trim()!=="")s=p.trim().replace(/\/+$/,"");else{let r="";try{let m=o.originRemote||"origin",{stdout:l}=await g(`git remote get-url ${m}`,{cwd:e});r=l.trim()}catch{oe.window.showErrorMessage("Ricwiz: Could not get the remote origin URL. Please configure the URL manually in the extension settings.");return}s=r,s.endsWith(".git")&&(s=s.slice(0,-4)),s.startsWith("git@")?(s=s.replace("git@","").replace(":","/"),s=`https://${s}`):s.startsWith("ssh://git@")&&(s=s.replace("ssh://git@","https://"))}let a=[],d=await de(e,n),c=[];for(let r of o.environments){let m=await de(e,n,r.name);await se(e,m)&&c.push({envName:r.name,source:m,target:r.sourceBranch})}if(c.length===0){let r="";try{if(d){let{stdout:u}=await g(`git config branch.${d}.ricwiz-source`,{cwd:e});u.trim()&&(r=u.trim())}}catch{}if(!r&&d.includes(n)&&d!==n){let u=d.split(n)[0].replace(/[-_]+$/,"");u&&(r=u)}r||(r=o.ticketSourceBranch||"main");let m=await oe.window.showInputBox({prompt:`Ricwiz: Confirm or enter the Target Release branch in GitLab for '${d}'`,placeHolder:"e.g. CRC-R19, main, release/v5.0",value:r,ignoreFocusOut:!0});if(m===void 0||!m.trim()){oe.window.showInformationMessage("Ricwiz: Merge request creation cancelled.");return}let l=m.trim();try{await g(`git config branch.${d}.ricwiz-source "${l}"`,{cwd:e})}catch{}a.push({source:d,target:l})}else for(let r of c)a.push({source:r.source,target:r.target});for(let r of a){let m=`${s}/-/merge_requests/new?merge_request[source_branch]=${encodeURIComponent(r.source)}&merge_request[target_branch]=${encodeURIComponent(r.target)}`;t?oe.commands.executeCommand("simpleBrowser.show",m):oe.env.openExternal(oe.Uri.parse(m))}oe.window.showInformationMessage(`Ricwiz: Opening ${a.length} Merge Request(s) in ${t?"VS Code browser":"external browser"}!`)}async function jt(){return Jt(!1)}async function Wt(){return Jt(!0)}var ie=k(require("vscode"));async function Gt(t=!1){let e=z();if(!e)return;let o=ie.workspace.getConfiguration("ricwiz"),i=o.get("jiraUrl","");if(!i||i.trim()===""){ie.window.showErrorMessage("Ricwiz: Jira URL is not configured. Please set it in the extension settings (e.g., https://jira.company.com/browse/).");return}let n=await L(e),p=o.get("ticketPrefix","SFPSCA-"),s=te(n,p),d=pe(n,s,!0);if(d)d=st(d,s);else{let r=await Q(e,{prompt:"Ricwiz could not detect the ticket from the branch name. Enter Jira ticket ID (e.g. SFPSCA-1234)",handleToSuffix:!0});if(!r)return;d=r.ticketId}let c=i.trim();c.endsWith("/")||(c+="/"),c+=d,t?ie.commands.executeCommand("simpleBrowser.show",c):ie.env.openExternal(ie.Uri.parse(c)),ie.window.showInformationMessage(`Ricwiz: Opening Jira Ticket ${d} in ${t?"VS Code":"browser"}!`)}async function Ht(){return Gt(!1)}async function Vt(){return Gt(!0)}var Y=k(require("vscode"));var qt=k(require("https")),_t=k(require("vscode"));async function Qt(){J("getJiraAuthAndBaseUrl: Starting...");let t=_t.workspace.getConfiguration("ricwiz"),e=t.get("jiraUrl",""),o=t.get("jiraEmail","")?.trim();J("getJiraAuthAndBaseUrl: Calling getJiraToken()...");let i=(await Qe())?.trim();if(!i&&process.env.RICWIZ_JIRA_TOKEN&&(J("getJiraAuthAndBaseUrl: Token not found in secretStorage, using process.env"),i=process.env.RICWIZ_JIRA_TOKEN.trim()),!e||!i)throw J(`getJiraAuthAndBaseUrl: FAILED. URL: "${e}", hasToken: ${!!i}`),new Error(`[v5.2.0] Jira API Token is not securely configured. URL: "${e}", hasToken: ${!!i}`);let n=e;n.includes("/browse")&&(n=n.split("/browse")[0]),n.endsWith("/")&&(n=n.slice(0,-1));let p=o?`Basic ${Buffer.from(`${o}:${i}`).toString("base64")}`:`Bearer ${i}`;return{baseUrl:n,headerAuth:p}}async function Le(t,e,o){let{baseUrl:i,headerAuth:n}=await Qt(),p=new URL(`${i}${e}`);return new Promise((s,a)=>{let d=qt.request(p,{method:t,headers:{Authorization:n,Accept:"application/json",...o?{"Content-Type":"application/json"}:{}}},c=>{let r="";c.on("data",m=>r+=m),c.on("end",()=>{if(c.statusCode===401||c.statusCode===403)return a(new Error(`Authentication failed (HTTP ${c.statusCode}). Please check your Jira settings.`));if(c.statusCode&&c.statusCode>=400){let m="";try{let l=JSON.parse(r);l.errorMessages&&l.errorMessages.length>0&&(m=l.errorMessages.join(", "))}catch{}return c.statusCode===404||c.statusCode===410?a(new Error(`Ticket not found or deleted (HTTP ${c.statusCode}). ${m}`)):a(new Error(`Jira API returned HTTP status ${c.statusCode}. ${m}`))}if(!r)return s({});try{let m=JSON.parse(r);s(m)}catch{a(new Error("Failed to parse Jira response."))}})});d.on("error",c=>a(new Error(`Network error: ${c.message}`))),o&&d.write(JSON.stringify(o)),d.end()})}async function Ie(t){let{baseUrl:e}=await Qt(),o=await Le("GET",`/rest/api/2/issue/${t}`);return o&&o.fields?{summary:o.fields.summary||"",description:o.fields.description||"No description provided.",status:o.fields.status?.name||"Unknown",url:`${e}/browse/${t}`}:null}async function Yt(t){let e=await Le("GET",`/rest/api/2/issue/${t}/transitions`);return e&&e.transitions?e.transitions.map(o=>({id:o.id,name:o.name})):[]}async function Zt(t,e){await Le("POST",`/rest/api/2/issue/${t}/transitions`,{transition:{id:e}})}async function Kt(t,e){await Le("POST",`/rest/api/2/issue/${t}/comment`,{body:e})}async function Xt(t,e){await Le("PUT",`/rest/api/2/issue/${t}`,{update:{labels:[{add:e}]}})}async function eo(t){let e=await Le("POST","/rest/api/3/search/jql",{jql:t,maxResults:50,fields:["summary","status","assignee"]});return e&&e.issues?e.issues.map(o=>({key:o.key,summary:o.fields?.summary||"No Title",status:o.fields?.status?.name||"Unknown",assignee:o.fields?.assignee?.displayName||"Unassigned"})):[]}async function to(t){let e=z();if(e)try{let o=await D.initialize(e);if(!o)return;let i=await L(e),n=te(i,o.ticketPrefix),p=pe(i,n,!0);if(p||(p=i.split("-to-")[0]),!p){Y.window.showErrorMessage("Ricwiz: You are not currently on a valid ticket branch.");return}await Y.window.withProgress({location:Y.ProgressLocation.Notification,title:`Fetching details for ${p}...`,cancellable:!1},async()=>{let s=await Ie(p);if(s){let a=[];try{let d=o.environments||Y.workspace.getConfiguration("ricwiz").get("environments",[{name:"Qual",sourceBranch:"quality"},{name:"Val",sourceBranch:"validation"},{name:"Prod",sourceBranch:"main"}]),c=await Se(e,p,"");a=await Be(e,c,p,d,o)}catch{}t.setJiraData({ticketId:p,relatedBranches:a,...s}),t.setPage("jira")}else Y.window.showErrorMessage("Ricwiz: No data found for this ticket.")})}catch(o){o.message&&o.message.includes("securely configured")?await Y.window.showErrorMessage(o.message,"Set Token Now")==="Set Token Now"&&Y.commands.executeCommand("ricwiz.setJiraToken"):Y.window.showErrorMessage(`Ricwiz Jira Error: ${o.message}`)}}var ue=k(require("vscode"));var De=0;async function oo(t,e){let o=ue.workspace.getConfiguration("ricwiz"),i=o.get("jiraDashboards",[]);if(e!==void 0&&(De=e),!i||i.length===0){t.setDashboardData({queries:[],selectedIndex:0,results:[],error:"No queries defined in settings. Go to Settings > Ricwiz > Jira Dashboards."}),t.setPage("dashboard");return}De>=i.length&&(De=0);let n=i[De];t.setDashboardData({queries:i,selectedIndex:De,results:[],error:"\u23F3 Loading tickets..."}),t.setPage("dashboard");try{let p=await eo(n.jql),s=z(),a=[],d=t.getDashboardShowBranches();if(s)try{let{stdout:r}=await g("git branch",{cwd:s});a=r.split(`
`).map(m=>m.replace("*","").trim()).filter(m=>m)}catch{}let c=[];if(d&&s)try{let r=await D.initialize(s,{skipPrompt:!0}),m=r?.environments||o.get("environments",[{name:"Qual",sourceBranch:"quality"},{name:"Val",sourceBranch:"validation"},{name:"Prod",sourceBranch:"main"}]);c=await Promise.all(p.map(async l=>{let u=await Se(s,l.key,""),f=await Be(s,u,l.key,m,r);return{...l,detailedBranches:f}}))}catch{c=p}else c=p.map(r=>{let m=a.find(l=>l.includes(r.key));return{...r,branch:m||null}});t.setDashboardData({queries:i,selectedIndex:De,results:c,error:null}),t.setPage("dashboard")}catch(p){let s=p.message;s&&(s.includes("ENOTFOUND")||s.includes("network"))&&(s="No Internet or Invalid URL"),t.setDashboardData({queries:i,selectedIndex:De,results:[],error:s}),t.setPage("dashboard")}}async function io(t,e){await ue.window.withProgress({location:ue.ProgressLocation.Notification,title:`Fetching details for ${e}...`,cancellable:!1},async()=>{try{let o=await Ie(e);if(o){let i=[],n=z();if(n)try{let p=await D.initialize(n,{skipPrompt:!0}),s=p?.environments||ue.workspace.getConfiguration("ricwiz").get("environments",[{name:"Qual",sourceBranch:"quality"},{name:"Val",sourceBranch:"validation"},{name:"Prod",sourceBranch:"main"}]),a=await Se(n,e,"");i=await Be(n,a,e,s,p)}catch{}t.setJiraData({ticketId:e,relatedBranches:i,...o}),t.setPage("jira")}else ue.window.showErrorMessage(`Ricwiz: No data found for ticket ${e}.`)}catch(o){ue.window.showErrorMessage(`Ricwiz Jira Error: ${o.message}`)}})}var T=k(require("vscode"));async function ut(){let t=z();if(!t)return;let e=await D.initialize(t,{forcePrompt:!1});if(!e)return;let o=await L(t);if(!o)return;let i=te(o,e.ticketPrefix),n=pe(o,i,!0);return n||o.split("-to-")[0]}function gt(t){t.message&&t.message.includes("securely configured")?T.window.showErrorMessage(t.message,"Set Token Now").then(e=>{e==="Set Token Now"&&T.commands.executeCommand("ricwiz.setJiraToken")}):T.window.showErrorMessage(`Ricwiz Jira Error: ${t.message}`)}async function ro(){try{let t=await ut();if(!t){T.window.showErrorMessage("Ricwiz: You are not on a valid ticket branch.");return}let e=await T.window.withProgress({location:T.ProgressLocation.Notification,title:`Fetching available status for ${t}...`,cancellable:!1},()=>Yt(t));if(!e||e.length===0){T.window.showInformationMessage(`Ricwiz: No transitions available for ${t}.`);return}let o=e.map(n=>({label:n.name,id:n.id})),i=await T.window.showQuickPick(o,{placeHolder:`Select new status for ${t}`,ignoreFocusOut:!0});i&&(await T.window.withProgress({location:T.ProgressLocation.Notification,title:`Updating status to ${i.label}...`,cancellable:!1},()=>Zt(t,i.id)),T.window.showInformationMessage(`Ricwiz: Status for ${t} updated to ${i.label}.`))}catch(t){gt(t)}}async function no(){try{let t=await ut();if(!t){T.window.showErrorMessage("Ricwiz: You are not on a valid ticket branch.");return}let e=await T.window.showInputBox({prompt:`Add comment to ${t}`,placeHolder:"Type your comment here...",ignoreFocusOut:!0});e&&(await T.window.withProgress({location:T.ProgressLocation.Notification,title:`Adding comment to ${t}...`,cancellable:!1},()=>Kt(t,e)),T.window.showInformationMessage(`Ricwiz: Comment added to ${t}.`))}catch(t){gt(t)}}async function so(){try{let t=await ut();if(!t){T.window.showErrorMessage("Ricwiz: You are not on a valid ticket branch.");return}let e=await T.window.showInputBox({prompt:`Add a label to ${t}`,placeHolder:"e.g. Needs-Review, Bug, High-Priority",ignoreFocusOut:!0});e&&e.trim()&&(await T.window.withProgress({location:T.ProgressLocation.Notification,title:`Adding label to ${t}...`,cancellable:!1},()=>Xt(t,e.trim())),T.window.showInformationMessage(`Ricwiz: Label '${e.trim()}' added to ${t}.`))}catch(t){gt(t)}}async function ao(){let t=await T.window.showInputBox({prompt:"Enter your Jira API Token (or Personal Access Token). It will be stored in your global VS Code settings.",password:!0,ignoreFocusOut:!0});if(t)try{await Pt(t.trim()),T.window.showInformationMessage("Ricwiz: Jira API Token securely stored!")}catch(e){T.window.showErrorMessage(`Ricwiz: Failed to store token: ${e.message}`)}}var H=k(require("vscode")),co=k(require("https"));async function lo(){let t=await H.window.showInputBox({prompt:"Enter your GitLab Personal Access Token",placeHolder:"glpat-xxxxxxxxxxxxxxxxxxxx",ignoreFocusOut:!0,password:!0});if(t&&t.trim()){let e=t.trim();await H.window.withProgress({location:H.ProgressLocation.Notification,title:"Ricwiz: Validating GitLab Token...",cancellable:!1},async()=>{try{let i=H.workspace.getConfiguration("ricwiz").get("gitlabUrlOverride","").trim();if(!i&&H.workspace.workspaceFolders)try{let a=H.workspace.workspaceFolders[0].uri.fsPath,{stdout:d}=await g("git remote get-url origin",{cwd:a}),c=d.trim();c.startsWith("git@")&&(c=`https://${c.replace("git@","").replace(":","/")}`),c.endsWith(".git")&&(c=c.slice(0,-4)),i=c}catch{}i||(i="https://gitlab.com");let n=new URL(i),p=`${n.protocol}//${n.host}`,s=await new Promise((a,d)=>{let c=co.request(new URL(`${p}/api/v4/user`),{method:"GET",timeout:5e3,headers:{"PRIVATE-TOKEN":e,Accept:"application/json"}},r=>{if(r.statusCode>=400)return d(new Error(`Status ${r.statusCode}`));let m="";r.on("data",l=>m+=l),r.on("end",()=>a(JSON.parse(m||"{}")))});c.on("error",d),c.on("timeout",()=>{c.destroy(),d(new Error("Timeout"))}),c.end()});await Bt(e),H.window.showInformationMessage(`Ricwiz: \u2705 GitLab API Token saved and validated successfully for ${s.username||"user"}!`),H.commands.executeCommand("ricwiz.manualRefresh")}catch(o){H.window.showErrorMessage(`Ricwiz: \u274C Invalid token or cannot reach GitLab (${o.message}). Please check the token and try again.`)}})}}var ge=k(require("vscode"));async function mo(){let t=z();if(!t){ge.window.showErrorMessage("Ricwiz: Open a folder or workspace that is a Git repository.");return}let e=await D.initialize(t);if(!e)return;let o=await Q(t,{prefix:e.ticketPrefix,prompt:"Enter the full ticket ID to sync all branches for (e.g., SCPSCA-1234) or just the number"});if(!o)return;let{ticketId:i,currentBranch:n}=o;await ge.window.withProgress({location:ge.ProgressLocation.Notification,title:`Ricwiz: Syncing all branches for ${i}...`,cancellable:!1},async p=>{try{p.report({message:"Fetching from remote..."});try{await g("git fetch --all",{cwd:t})}catch{}let{stdout:s}=await g(`git branch --list "*${i}*"`,{cwd:t}),a=new RegExp(`${i}(?!\\d)`,"i"),d=s.split(`
`).map(m=>m.replace("*","").trim()).filter(m=>m.length>0&&a.test(m));if(d.length===0){ge.window.showWarningMessage(`Ricwiz: No local branches found for ${i}.`);return}let c=0,r=0;for(let m of d)if(p.report({message:`Syncing ${m}...`}),m===n)try{await g(`git pull ${e.originRemote} ${m}`,{cwd:t}),c++}catch(l){let u=!1;try{let{stdout:h}=await g("git ls-files -u",{cwd:t});h.trim().length>0&&(u=!0)}catch{}let f=((l.stdout||"")+(l.stderr||"")+(l.message||"")).toLowerCase();(u||f.includes("conflict")||f.includes("conflit"))&&await Pe(t,`${e.originRemote}/${m}`,m,p)?c++:r++}else try{await g(`git fetch ${e.originRemote} ${m}:${m}`,{cwd:t}),c++}catch{try{await g(`git checkout ${m}`,{cwd:t});try{await g(`git pull ${e.originRemote} ${m}`,{cwd:t}),c++}catch(u){let f=!1;try{let{stdout:w}=await g("git ls-files -u",{cwd:t});w.trim().length>0&&(f=!0)}catch{}let h=((u.stdout||"")+(u.stderr||"")+(u.message||"")).toLowerCase();(f||h.includes("conflict")||h.includes("conflit"))&&await Pe(t,`${e.originRemote}/${m}`,m,p)?c++:r++}await g(`git checkout ${n}`,{cwd:t})}catch{try{await g(`git checkout ${n}`,{cwd:t})}catch{}r++}}r>0?ge.window.showWarningMessage(`Ricwiz: Synced ${c}/${d.length} branches. ${r} branch(es) could not be synced (possible conflicts or diverged history).`):ge.window.showInformationMessage(`Ricwiz: \u{1F504} All ${c} branches for ${i} are up to date!`)}catch(s){ge.window.showErrorMessage(`Ricwiz: Sync failed: ${s.message}`)}})}var fe=k(require("vscode"));async function po(){let t=z();if(!t){fe.window.showErrorMessage("Ricwiz: Open a folder or workspace that is a Git repository.");return}try{await g("git status",{cwd:t})}catch{fe.window.showErrorMessage("Ricwiz: The opened folder does not appear to be a valid Git repository.");return}let e=await D.initialize(t);if(!e)return;let o=e.environments,i=await Q(t,{prefix:e.ticketPrefix});if(!i)return;let{ticketId:n,currentBranch:p}=i;await fe.window.withProgress({location:fe.ProgressLocation.Notification,title:"Ricwiz: Updating environment branches from their bases",cancellable:!0},async(s,a)=>{let d=0,c=p,r=!1;a.onCancellationRequested(()=>{r=!0}),s.report({message:"Syncing remote information...",increment:10});try{await g("git fetch --all",{cwd:t})}catch{}let m=80/(o.length||1);for(let l of o){if(r)break;let u=await de(t,n,l.name),f=l.sourceBranch;if(await se(t,u))try{s.report({message:`Processing ${u}...`,increment:m/2}),await g(`git checkout ${u}`,{cwd:t});try{s.report({message:`Merging ${f} into ${u}...`,increment:m/2});let h=e.getFetchRemote(f),w=e.getFetchBranch(f),$=e.buildUpstreamPath(f);await g(`git fetch ${h} ${w}`,{cwd:t}),await g(`git merge ${$}`,{cwd:t})}catch(h){let w=!1;try{let{stdout:v}=await g("git ls-files -u",{cwd:t});v.trim().length>0&&(w=!0)}catch{}let $=((h.stdout||"")+(h.stderr||"")+(h.message||"")).toLowerCase();if(w||$.includes("conflict")||$.includes("conflit")){let v=e.buildUpstreamPath(f);if(!await Pe(t,v,u,s,a))throw r=!0,new Error("Update aborted by user.")}else throw h}if(r)break;d++}catch(h){h.message.includes("aborted")?fe.window.showInformationMessage("Ricwiz: Update cancelled."):fe.window.showErrorMessage(`Ricwiz: Failed to update branch ${u}. Detail: ${h.message}`);return}}if(!r){s.report({message:"Finishing up...",increment:10});try{let l=await L(t);c&&c!==l&&await g(`git checkout ${c}`,{cwd:t})}catch{}fe.window.showInformationMessage(`Ricwiz: Successfully updated ${d} environment branches from their bases!`)}})}var N=k(require("vscode"));async function uo(){let t=z();if(!t){N.window.showErrorMessage("Ricwiz: Open a folder or workspace that is a Git repository.");return}let e=await L(t),o=N.workspace.getConfiguration("ricwiz");await N.window.withProgress({location:N.ProgressLocation.Notification,title:"Ricwiz: Scanning for unused local branches...",cancellable:!1},async()=>{try{await g("git fetch --prune",{cwd:t})}catch{}let i=[];try{let{stdout:m}=await g('git branch --format="%(refname:short)"',{cwd:t});i=m.split(`
`).map(l=>l.trim()).filter(l=>l.length>0)}catch{}if(i.length===0){N.window.showInformationMessage("Ricwiz: No local branches found.");return}let n=[];try{let{stdout:m}=await g('git branch -r --format="%(refname:short)"',{cwd:t});n=m.split(`
`).map(l=>l.trim().replace(/^[^/]+\//,"")).filter(l=>l.length>0&&!l.includes("HEAD"))}catch{}let p=[];try{let{stdout:m}=await g('git for-each-ref --format="%(refname:short)|||%(upstream:track)" refs/heads/',{cwd:t});p=m.split(`
`).filter(l=>l.includes("[gone]")).map(l=>l.split("|||")[0].trim())}catch{}let s=i.filter(m=>!n.includes(m));if(s.length===0){N.window.showInformationMessage("Ricwiz: Your local repository is totally clean! All local branches exist on the remote.");return}let a=s.map(m=>{let l=p.includes(m),u=m===e,f="Not found on remote";return l&&(f="Deleted on remote [gone]"),u&&(f+=" (Current branch - will checkout main first)"),{label:m,description:f,picked:l&&!u}}),d=await N.window.showQuickPick(a,{canPickMany:!0,placeHolder:"Select local branches to delete",title:"Ricwiz: Delete Unused Branches"});if(!d||d.length===0){N.window.showInformationMessage("Ricwiz: No branches selected for deletion.");return}if(await N.window.showWarningMessage(`Ricwiz: Delete ${d.length} local branch(es)?
This cannot be undone!`,{modal:!0},"Yes, delete them")!=="Yes, delete them"){N.window.showInformationMessage("Ricwiz: Deletion cancelled.");return}let r=0;for(let m of d){let l=m.label;if(l===e){let u=o.get("ticketSourceBranch","main");try{await g(`git checkout ${u}`,{cwd:t}),e=u}catch{N.window.showWarningMessage(`Ricwiz: Could not switch away from ${l}. Skipping.`);continue}}try{await g(`git branch -D ${l}`,{cwd:t}),r++}catch{N.window.showWarningMessage(`Ricwiz: Could not delete local branch ${l}.`)}}N.window.showInformationMessage(`Ricwiz: \u{1F5D1}\uFE0F Cleaned up ${r} unused local branch(es).`)})}var re=k(require("vscode"));async function Fe(t){let e=z();e&&await re.window.withProgress({location:re.ProgressLocation.Notification,title:`Ricwiz: Switching to ${t}...`,cancellable:!1},async()=>{try{let o=await L(e),i=!1;try{let{stdout:p}=await g("git status --porcelain",{cwd:e});i=p.trim().length>0}catch{}if(i&&o)try{await g(`git stash push --include-untracked -m "ricwiz-auto:${o}"`,{cwd:e}),re.window.showInformationMessage(`Ricwiz: \u{1F4E6} Stashed changes from ${o}`)}catch{re.window.showWarningMessage("Ricwiz: Could not stash changes. Checkout may fail if there are conflicts.")}let n=t;t.includes("/")&&(n=t.split("/").slice(1).join("/"));try{await g(`git checkout ${n}`,{cwd:e})}catch{let s="";if(t.includes("/"))s=t.split("/")[0];else{let{stdout:a}=await g("git branch -r",{cwd:e}),d=a.split(`
`).map(r=>r.trim()).filter(r=>r),c=[];for(let r of d){let m=r.split(" ")[0];m.endsWith(`/${n}`)&&c.push(m.substring(0,m.lastIndexOf("/")))}if(c.length===0){re.window.showErrorMessage(`Ricwiz: A branch "${n}" n\xE3o existe localmente nem em nenhuma remote!`);return}else if(c.length===1)s=c[0];else{let r=await D.initialize(e);c.includes("origin")?s="origin":r&&c.includes(r.upstreamRemote)?s=r.upstreamRemote:s=c[0]}}try{await g(`git fetch ${s} ${n}`,{cwd:e}),await g(`git checkout -b ${n} --track ${s}/${n}`,{cwd:e})}catch{re.window.showErrorMessage(`Ricwiz: Encontrou na remote ${s} mas falhou a fazer checkout.`);return}}try{let{stdout:p}=await g("git stash list",{cwd:e}),s=p.split(`
`);for(let a=0;a<s.length;a++)if(s[a].includes(`ricwiz-auto:${n}`)){let d=s[a].match(/stash@\{(\d+)\}/);d&&(await g(`git stash pop stash@{${d[1]}}`,{cwd:e}),re.window.showInformationMessage(`Ricwiz: \u{1F4E6} Restored stashed changes on ${n}`));break}}catch{re.window.showWarningMessage(`Ricwiz: Could not restore stashed changes on ${n}. You may need to resolve conflicts manually (check git stash list).`)}}catch{re.window.showErrorMessage(`Ricwiz: Could not checkout branch ${t}.`)}})}var Je=k(require("vscode"));async function go(){let t=z();if(t)try{let{stdout:e}=await g("git branch --show-current",{cwd:t}),o=e.trim();o&&(await Je.env.clipboard.writeText(o),Je.window.showInformationMessage(`Ricwiz: \u{1F4CB} Copied "${o}" to clipboard`))}catch{Je.window.showErrorMessage("Ricwiz: Could not get the current branch name.")}}var Z=k(require("vscode")),tt=k(require("path")),fo=k(require("fs"));async function ho(){let t=z();if(!t){Z.window.showErrorMessage("Ricwiz: Open a folder or workspace that is a Git repository.");return}let e=await D.initialize(t,{skipPrompt:!0}),o=Z.workspace.getConfiguration("ricwiz"),i=e?.ticketSourceBranch||o.get("ticketSourceBranch","main"),n=e?.originRemote||"origin",s=o.get("packageXmlCommand",'sf sgd source delta --to "HEAD" --from "{originRemote}/{baseBranch}" --output-dir "."').replace("origin/{baseBranch}","{originRemote}/{baseBranch}").replace(/{originRemote}/g,n).replace(/{baseBranch}/g,i);await Z.window.showWarningMessage("Are you sure you want to generate the package.xml? This may overwrite existing local manifest files.",{modal:!0},"Yes, Generate")==="Yes, Generate"&&await Z.window.withProgress({location:Z.ProgressLocation.Notification,title:"Ricwiz: Generating package.xml using Salesforce CLI...",cancellable:!1},async()=>{try{await g(s,{cwd:t,maxBuffer:10*1024*1024}),Z.window.showInformationMessage("Ricwiz: Successfully generated package.xml!");let d=tt.join(t,"package","package.xml"),c=tt.join(t,"package.xml"),r=tt.join(t,"manifest","package.xml");for(let m of[d,c,r])if(fo.existsSync(m)){let l=await Z.workspace.openTextDocument(m);await Z.window.showTextDocument(l);break}}catch(d){Z.window.showErrorMessage(`Ricwiz: Error running sf command - ${d.message}`)}})}var K=k(require("vscode"));async function wo(){let t=z();if(!t){K.window.showErrorMessage("Ricwiz: Open a folder or workspace that is a Git repository.");return}let o=K.workspace.getConfiguration("ricwiz").get("deployCommand","sf project deploy start --manifest package/package.xml --post-destructive-changes destructiveChanges/destructiveChanges.xml -c -l NoTestRun -g");await K.window.showWarningMessage("Are you sure you want to deploy to Salesforce? This action modifies your org and cannot be easily undone.",{modal:!0},"Yes, Deploy")==="Yes, Deploy"&&await K.window.withProgress({location:K.ProgressLocation.Notification,title:"Ricwiz: Deploying package...",cancellable:!1},async()=>{try{let{stdout:n,stderr:p}=await g(o,{cwd:t,maxBuffer:52428800}),s=K.window.createOutputChannel("Ricwiz Deploy");s.appendLine(`Executing: ${o}`),s.appendLine(n),p&&(s.appendLine("--- STDERR ---"),s.appendLine(p)),s.show(),K.window.showInformationMessage("Ricwiz: Successfully ran deploy command!")}catch(n){let p=K.window.createOutputChannel("Ricwiz Deploy");p.appendLine(`Error executing: ${o}`),n.stdout&&p.appendLine(n.stdout),n.stderr&&p.appendLine(n.stderr),p.appendLine(n.message),p.show(),K.window.showErrorMessage("Ricwiz: Error running deploy command. See output channel for details.")}})}var X=k(require("vscode"));async function vo(){let t=z();if(!t){X.window.showErrorMessage("Ricwiz: Open a folder or workspace that is a Git repository.");return}let o=X.workspace.getConfiguration("ricwiz").get("importDataCommand","sfdx force:data:tree:import --plan data/plan.json");await X.window.showWarningMessage("Are you sure you want to import data into Salesforce? This action modifies records in your org.",{modal:!0},"Yes, Import")==="Yes, Import"&&await X.window.withProgress({location:X.ProgressLocation.Notification,title:"Ricwiz: Importing data...",cancellable:!1},async()=>{try{let{stdout:n,stderr:p}=await g(o,{cwd:t,maxBuffer:52428800}),s=X.window.createOutputChannel("Ricwiz Import Data");s.appendLine(`Executing: ${o}`),s.appendLine(n),p&&(s.appendLine("--- STDERR ---"),s.appendLine(p)),s.show(),X.window.showInformationMessage("Ricwiz: Successfully ran import data command!")}catch(n){let p=X.window.createOutputChannel("Ricwiz Import Data");p.appendLine(`Error executing: ${o}`),n.stdout&&p.appendLine(n.stdout),n.stderr&&p.appendLine(n.stderr),p.appendLine(n.message),p.show(),X.window.showErrorMessage("Ricwiz: Error running import data command. See output channel for details.")}})}var V=k(require("vscode"));async function bo(){let t=z();if(!t){V.window.showErrorMessage("Ricwiz: Open a folder or workspace that is a Git repository.");return}let e=await D.initialize(t,{skipPrompt:!0}),o=e?e.ticketSourceBranch:V.workspace.getConfiguration("ricwiz").get("ticketSourceBranch","main"),i=e?e.originRemote:"origin",n="";try{n=await L(t)}catch{}let p=await V.window.showInputBox({prompt:`Enter the branch name to list modified files (compared to ${o})`,value:n,placeHolder:"SFPSCA-1234"});if(!p)return;let s=$e(p);await V.window.withProgress({location:V.ProgressLocation.Notification,title:`Ricwiz: Finding files for ${s}...`,cancellable:!1},async()=>{try{let a=e?e.ticketPrefix:V.workspace.getConfiguration("ricwiz").get("ticketPrefix","SFPSC-"),d=te(s,a),c=pe(s,d,!0)||s.replace(/-to-[a-zA-Z0-9]+$/i,""),r=await de(t,c);R.appendLine(`[ListTicketFiles] targetBranch (raw): ${s}, resolvedTargetBranch: ${r}, ticketId: ${c}, originRemote: ${i}, sourceBranch: ${o}`);let m=[];try{let x="";try{R.appendLine(`[ListTicketFiles] Running: git merge-base ${i}/${o} ${r}`);let{stdout:y}=await g(`git merge-base ${i}/${o} ${r}`,{cwd:t});x=y.trim()}catch(y){R.appendLine(`[ListTicketFiles] First merge-base failed: ${y.message}`);try{R.appendLine(`[ListTicketFiles] Running: git merge-base ${o} ${r}`);let{stdout:S}=await g(`git merge-base ${o} ${r}`,{cwd:t});x=S.trim()}catch(S){R.appendLine(`[ListTicketFiles] Second merge-base failed: ${S.message}`),R.appendLine(`[ListTicketFiles] Running: git merge-base ${i}/${o} ${i}/${r}`);let{stdout:E}=await g(`git merge-base ${i}/${o} ${i}/${r}`,{cwd:t});x=E.trim(),r=`${i}/${r}`}}if(x){R.appendLine(`[ListTicketFiles] Merge base found: ${x}. Running git diff...`);let y=r===n||s===n,S=y?"":` ${r}`,{stdout:E}=await g(`git diff --name-only ${x}${S}`,{cwd:t,maxBuffer:10*1024*1024});if(m=E.split(`
`).map(B=>B.trim()).filter(B=>B.length>0),y)try{let{stdout:B}=await g("git ls-files --others --exclude-standard",{cwd:t,maxBuffer:10485760}),U=B.split(`
`).map(W=>W.trim()).filter(W=>W.length>0);m=[...m,...U],R.appendLine(`[ListTicketFiles] Found ${U.length} untracked files.`)}catch(B){R.appendLine(`[ListTicketFiles] Failed to get untracked files: ${B.message}`)}R.appendLine(`[ListTicketFiles] diff found ${m.length} files total.`)}}catch(x){R.appendLine(`[ListTicketFiles] Diff strategy failed: ${x.message}`)}let l=[];try{R.appendLine(`[ListTicketFiles] Running git log fallback for ticketId: ${c}`);let{stdout:x}=await g(`git --no-pager log --grep="\\b${c}\\b" -i -E --name-only -m --first-parent --format=""`,{cwd:t,maxBuffer:10*1024*1024});l=x.split(`
`).map(y=>y.trim()).filter(y=>y.length>0),R.appendLine(`[ListTicketFiles] git log found ${l.length} files.`)}catch(x){R.appendLine(`[ListTicketFiles] Git log fallback failed: ${x.message}`)}let u=[...m,...l];if(u.length===0){V.window.showInformationMessage(`Ricwiz: No modified files found for ${s}.`);return}let f=Array.from(new Set(u)).sort(),h={};for(let x of f){let y=x.match(/default\/([^/]+)/),S=y&&y[1]?y[1].toUpperCase():"OUTROS";h[S]||(h[S]=[]),h[S].push(x)}let w=`Files modified in branch ${s}:
`,$=Object.keys(h).sort();for(let x of $)w+=`
=== ${x} ===
`,w+=h[x].join(`
`)+`
`;let v=await V.workspace.openTextDocument({content:w,language:"plaintext"});await V.window.showTextDocument(v)}catch(a){V.window.showErrorMessage(`Ricwiz: Error running git log - ${a.message}`)}})}var ne=k(require("vscode"));async function yo(){let t=z();if(!t){ne.window.showErrorMessage("Ricwiz: Open a folder or workspace that is a Git repository.");return}let o=ne.workspace.getConfiguration("ricwiz").get("resetTrackingCommand","sf org disable tracking && sf project reset tracking --no-prompt");await ne.window.withProgress({location:ne.ProgressLocation.Notification,title:"Ricwiz: Resetting tracking...",cancellable:!1},async()=>{try{let{stdout:i,stderr:n}=await g(o,{cwd:t,maxBuffer:52428800}),p=ne.window.createOutputChannel("Ricwiz Reset Tracking");p.appendLine(`Executing: ${o}`),p.appendLine(i),n&&(p.appendLine("--- STDERR ---"),p.appendLine(n)),p.show(),ne.window.showInformationMessage("Ricwiz: Successfully reset tracking!")}catch(i){let n=ne.window.createOutputChannel("Ricwiz Reset Tracking");n.appendLine(`Error executing: ${o}`),i.stdout&&n.appendLine(i.stdout),i.stderr&&n.appendLine(i.stderr),n.appendLine(i.message),n.show(),ne.window.showErrorMessage("Ricwiz: Error resetting tracking. See output channel for details.")}})}var ee=k(require("vscode"));async function xo(){let t=z();if(!t){ee.window.showErrorMessage("Ricwiz: Open a workspace first.");return}let e=["ApexClass","ApexTrigger","CustomObject","CustomField","LightningComponentBundle","AuraDefinitionBundle","Flow","CustomLabel","CustomMetadata","StaticResource","Profile","PermissionSet","PermissionSetGroup","Layout","ValidationRule","RecordType","ListView","Report","EmailTemplate","Other (Type manually)..."],o=await ee.window.showQuickPick(e,{placeHolder:"Select Metadata Type to extract (e.g., ApexClass)",ignoreFocusOut:!0});if(!o||o==="Other (Type manually)..."&&(o=await ee.window.showInputBox({prompt:"Enter Metadata Type (e.g., CustomApplication, Queue)",ignoreFocusOut:!0}),!o))return;let i={ApexClass:"**/*.cls",ApexTrigger:"**/*.trigger",CustomObject:"**/*.{object,object-meta.xml}",CustomField:"**/*.field-meta.xml",LightningComponentBundle:"**/lwc/*/*.js",AuraDefinitionBundle:"**/aura/*/*.cmp",Flow:"**/*.flow-meta.xml",CustomLabel:"**/*.labels-meta.xml",CustomMetadata:"**/*.md-meta.xml",StaticResource:"**/*.resource-meta.xml",Profile:"**/*.profile-meta.xml",PermissionSet:"**/*.permissionset-meta.xml",PermissionSetGroup:"**/*.permissionsetgroup-meta.xml",Layout:"**/*.layout-meta.xml",ValidationRule:"**/*.validationRule-meta.xml",RecordType:"**/*.recordType-meta.xml",ListView:"**/*.listView-meta.xml"},n=[],p=i[o];if(p)try{n=(await ee.workspace.findFiles(p,"**/node_modules/**")).map(d=>{let c=d.fsPath.split(/[\\/]/).pop()||"";if(o==="LightningComponentBundle"||o==="AuraDefinitionBundle"){let r=d.fsPath.split(/[\\/]/);return r[r.length-2]||c.split(".")[0]}return c.split(".")[0]}),n=[...new Set(n)].sort()}catch{}let s=await new Promise(a=>{let d=ee.window.createQuickPick();d.title=`Extract ${o}`,d.placeholder="Type name (e.g. MyComponent) or * for all",d.ignoreFocusOut=!0,d.matchOnDescription=!0;let c=()=>{let r=d.value.trim(),m=[];r?m.push({label:`$(cloud-download) Extract "${r}"`,description:"Extract exact name from Salesforce",alwaysShow:!0}):m.push({label:'$(cloud-download) Extract "*" (All)',description:`Extract all ${o}s`,alwaysShow:!0}),n.forEach(l=>{(!r||l.toLowerCase().includes(r.toLowerCase()))&&m.push({label:l,description:"Local workspace component"})}),d.items=m};d.onDidChangeValue(()=>c()),d.onDidAccept(()=>{let r=d.selectedItems[0];if(r){let m=r.label;m.startsWith('$(cloud-download) Extract "')?m=m.replace('$(cloud-download) Extract "',"").replace('" (All)',"").replace('"',""):m==='$(cloud-download) Extract "*" (All)'&&(m="*"),d.hide(),a(m)}}),d.onDidHide(()=>{d.dispose(),a(void 0)}),c(),d.show()});s&&await ee.window.withProgress({location:ee.ProgressLocation.Notification,title:`Ricwiz: Extracting ${o}:${s} from Salesforce...`,cancellable:!0},async(a,d)=>{try{R.show(!0);let c=`${o}:${s}`,{stdout:r,stderr:m}=await g(`sf project retrieve start -m "${c}"`,{cwd:t});r&&R.appendLine(r),m&&R.appendLine(m),ee.window.showInformationMessage(`Ricwiz: Successfully extracted ${c}.`)}catch(c){R.appendLine(`ERROR: ${c.message}`),c.stdout&&R.appendLine(c.stdout),c.stderr&&R.appendLine(c.stderr),ee.window.showErrorMessage("Ricwiz: Extraction failed. See Output channel for details.")}})}var j=k(require("vscode")),ko=k(require("path"));async function Co(){let t=j.window.activeTextEditor;if(!t){j.window.showErrorMessage("Ricwiz: Please open the file you want to deploy in the editor first.");return}let e=t.document.uri.fsPath,o=z();if(!o)return;let i="";if(await j.window.withProgress({location:j.ProgressLocation.Notification,title:"Ricwiz: Fetching available Salesforce orgs...",cancellable:!1},async()=>{try{let{stdout:d}=await g("sf org list --json",{cwd:o});i=d}catch(d){i=d.stdout||""}}),!i){j.window.showErrorMessage("Ricwiz: Failed to fetch orgs. Is Salesforce CLI installed?");return}let n=[];try{let d=JSON.parse(i),c=d.result?.nonScratchOrgs||[],r=d.result?.scratchOrgs||[];n=[...c,...r]}catch{j.window.showErrorMessage("Ricwiz: Failed to parse org list.");return}if(n.length===0){j.window.showInformationMessage("Ricwiz: No authenticated orgs found.");return}let p=n.map(d=>({label:d.alias||d.username,description:d.alias?d.username:"",picked:d.isDefaultUsername})),s=await j.window.showQuickPick(p,{placeHolder:"Select the org(s) to deploy this file to",canPickMany:!0,ignoreFocusOut:!0});if(!s||s.length===0)return;let a=ko.basename(e);await j.window.withProgress({location:j.ProgressLocation.Notification,title:`Ricwiz: Deploying ${a} to ${s.length} org(s)...`,cancellable:!1},async()=>{R.show(!0),R.appendLine(`--- Starting Parallel Deploy of ${a} ---`);let d=s.map(async l=>{let u=l.label;R.appendLine(`[${u}] Deploying...`);try{let{stdout:f,stderr:h}=await g(`sf project deploy start -d "${e}" -o "${u}"`,{cwd:o});return R.appendLine(`[${u}] \u2705 Success`),f&&R.appendLine(f),{org:u,success:!0}}catch(f){return R.appendLine(`[${u}] \u274C Failed`),f.stdout&&R.appendLine(f.stdout),f.stderr&&R.appendLine(f.stderr),{org:u,success:!1}}}),c=await Promise.all(d),r=c.filter(l=>l.success).length,m=c.filter(l=>!l.success).length;m===0?j.window.showInformationMessage(`Ricwiz: Successfully deployed to all ${r} orgs!`):j.window.showErrorMessage(`Ricwiz: Deploy finished with errors (${r} success, ${m} failed). Check Output channel.`)})}var I=k(require("vscode")),ot=k(require("fs")),it=k(require("path"));async function $o(){let t=z();if(!t){I.window.showErrorMessage("Ricwiz: Open a folder or workspace that is a Git repository.");return}let e=I.workspace.getConfiguration("ricwiz"),o=e.get("auditUsername",""),i=e.get("auditHours",8),n=await I.window.showInputBox({prompt:"Enter your Salesforce Username to query in SetupAuditTrail",value:o,placeHolder:"admin@tuaorg.com"});if(!n)return;n=$e(n);let p=await I.window.showInputBox({prompt:"How many hours back do you want to search?",value:i.toString(),placeHolder:"8"});if(!p)return;let s=parseFloat(p);if(isNaN(s)||s<=0){I.window.showErrorMessage("Ricwiz: Invalid hours specified.");return}let a=new Date(Date.now()-s*60*60*1e3).toISOString(),c=`sf data query -q "${`SELECT Action, Display, Section FROM SetupAuditTrail WHERE CreatedBy.Username = '${n}' AND CreatedDate >= ${a}`}" --json`;await I.window.withProgress({location:I.ProgressLocation.Notification,title:"Ricwiz: Interrogating Setup Audit Trail...",cancellable:!1},async()=>{try{let{stdout:r}=await g(c,{cwd:t,maxBuffer:52428800}),m=JSON.parse(r);if(!m.result||m.result.records.length===0){I.window.showInformationMessage(`Ricwiz: No changes found for ${n} in the last ${s} hours.`);return}let l=m.result.records,u=[],f=new Set;for(let B of l){let U=Vo(B.Action,B.Display,B.Section);if(U){let W=`${U.isDelete?"DEL":"ADD"}-${U.metadataFormat}`;if(!f.has(W)){f.add(W);let me=U.isDelete?"$(trash)":"$(plus)";u.push({label:`${me} ${U.metadataFormat}`,description:`${B.Action} -> ${B.Display}`,metadataFormat:U.metadataFormat,isDelete:U.isDelete})}}}if(u.length===0){I.window.showInformationMessage(`Ricwiz: No extractable metadata changes found for ${n} in the last ${s} hours (ignored passwords/logins).`);return}let h=await I.window.showQuickPick(u,{canPickMany:!0,placeHolder:"Select the changes you want to extract to GitLab",ignoreFocusOut:!0});if(!h||h.length===0){I.window.showInformationMessage("Ricwiz: No changes selected.");return}let w=h.filter(B=>B.isDelete),$=h.filter(B=>!B.isDelete),v=I.window.createOutputChannel("Ricwiz Admin Bridge");if(v.show(),w.length>0){let{stdout:B}=await g("git ls-files",{cwd:t}),U=B.split(`
`).map(me=>me.trim()),W=0;for(let me of w){let Ue=me.metadataFormat.split(":"),Ge=Ue[0],He=Ue[1],xe=He;Ge==="CustomField"&&(xe=He.split(".")[1]);let nt=U.filter(Me=>{let A=it.basename(Me);return A.startsWith(xe+".")&&A.includes(Ge==="CustomField"?".field":"")});for(let Me of nt){let A=it.join(t,Me);ot.existsSync(A)&&(ot.unlinkSync(A),v.appendLine(`Deleted local file: ${Me}`),W++)}}I.window.showInformationMessage(`Ricwiz: Deleted ${W} local files from Git workspace.`)}if($.length===0)return;let x=$.map(B=>B.metadataFormat).filter(B=>B!=="").join(", "),y=await I.window.showInputBox({prompt:"Review and adjust the metadata components to retrieve",value:x,ignoreFocusOut:!0});if(!y)return;let S=`sf project retrieve start -m "${y}"`;v.appendLine(`Executing: ${S}`),I.window.showInformationMessage(`Ricwiz: Extracting ${$.length} components...`);let E=await g(S,{cwd:t});v.appendLine(E.stdout),E.stderr&&(v.appendLine("--- STDERR ---"),v.appendLine(E.stderr)),I.window.showInformationMessage("Ricwiz: Changes extracted successfully! Ready for Git Commit.")}catch(r){I.window.showErrorMessage(`Ricwiz: Error capturing changes - ${r.message}`)}})}function Vo(t,e,o){if(!t||!e||!o)return null;let i=t.toLowerCase(),n=o.toLowerCase();if(["security controls","network access","session settings","data export","login history","password policies","identity verification","delegated administration"].includes(n)||i.includes("login")||i.includes("password")||i.includes("oauth")||i.includes("session"))return null;let s=i.includes("delete"),a=null;if(i==="permissionsetgroupcomponentadd"||i==="permissionsetgroupcomponentdelete")return null;let d=(c,r=!1)=>{let m=c.replace(/\(.*\)/g,"").trim();m.includes(":")&&!i.includes("calculation")&&(m=m.split(":")[0]);let l=["disabled","deleted","removed","created","changed","updated","from","to","on","assigned","assign","assignment","permission","set","group","apex","class","trigger","custom","field","object","layout","validation","rule","flow","profile"],u=m.split(/\s+/);if(r){for(;u.length>0&&l.includes(u[u.length-1].toLowerCase());)u.pop();for(;u.length>0&&l.includes(u[0].toLowerCase());)u.shift();return u.join(" ").trim().replace(/[^a-zA-Z0-9_ ]/g,"")}else return u.filter(w=>!l.includes(w.toLowerCase())).join("_").replace(/[^a-zA-Z0-9_]/g,"")||m.replace(/\s+/g,"")};if(i.includes("profile"))a=`Profile:${d(e,!0)}`;else if(i.includes("permissionsetgroupcalculation")){let c=e.split(":");a=`PermissionSetGroup:${c.length>1?c[c.length-1].trim():d(e,!1)}`}else if(i.includes("permission set group")||i.includes("permissionsetgroup"))a=`PermissionSetGroup:${d(e,!1)}`;else if(i.includes("permission set")||i.includes("permissionset"))a=`PermissionSet:${d(e,!1)}`;else if(i.includes("apexclass"))a=`ApexClass:${d(e,!1)}`;else if(i.includes("apextrigger")||i.includes("apex trigger"))a=`ApexTrigger:${d(e,!1)}`;else if(i.includes("customfield")){let c=e.match(/([A-Za-z0-9_]+__c)/),r=e.match(/(?:on|na|for)\s+([A-Za-z0-9_]+)/i);c&&r?a=`CustomField:${r[1]}.${c[1]}`:a=`CustomField:${d(e,!1)}`}else if(i.includes("layout"))a=`Layout:${d(e,!0)}`;else if(i.includes("validation"))a=`ValidationRule:${d(e,!1)}`;else if(i.includes("flow"))a=`Flow:${d(e,!1)}`;else if(i.includes("customobject")){let c=e.match(/([A-Za-z0-9_]+__c)/);a=c?`CustomObject:${c[1]}`:`CustomObject:${d(e,!1)}`}else if(!i.includes("created")&&!i.includes("changed")&&!i.includes("deleted"))return null;return a?{metadataFormat:a,isDelete:s}:null}var ft=k(require("vscode"));async function Ro(){let t=z();if(t)try{let{stdout:e}=await g('git for-each-ref --sort=-committerdate --format="%(refname:short)|||%(committerdate:relative)|||%(subject)" refs/heads/',{cwd:t}),o=e.split(`
`).filter(n=>n.trim()).map(n=>{let p=n.split("|||");return{label:`$(git-branch) ${p[0]}`,description:p[1],detail:p[2],branchName:p[0]}}),i=await ft.window.showQuickPick(o,{placeHolder:"Select a branch from history to checkout",matchOnDescription:!0,matchOnDetail:!0});i&&await Fe(i.branchName)}catch{ft.window.showErrorMessage("Ricwiz: Failed to get branch history")}}var je=k(require("vscode"));async function zo(){let t=z();if(!t)return;let e=await je.window.showInputBox({prompt:"Enter ticket number or name (e.g., 48934)",placeHolder:"48934"});if(!e)return;let o=$e(e);try{let{stdout:i}=await g(`git branch --list "*${o}*"`,{cwd:t}),n=i.split(`
`).map(a=>a.replace("*","").trim()).filter(a=>a);if(n.length===0){je.window.showInformationMessage(`Ricwiz: No branches found matching "${e}"`);return}let p=n.map(a=>({label:`$(git-branch) ${a}`,branchName:a})),s=await je.window.showQuickPick(p,{placeHolder:`Select a branch for ${e}`});s&&await Fe(s.branchName)}catch{je.window.showErrorMessage("Ricwiz: Failed to search branches")}}var Te=k(require("vscode")),Po=k(require("path"));async function Bo(){let t=Te.window.activeTextEditor;if(!t)return Te.window.showErrorMessage("Ricwiz: Please open a file in the editor to check blame."),null;let e=t.document.fileName,o=Po.basename(e),i=z();if(!i)return Te.window.showErrorMessage("Ricwiz: Workspace is not a git repository."),null;let n=[];try{let{stdout:r}=await g(`git log -5 --pretty=format:"%an|%ar|%s|%h" -- "${e}"`,{cwd:i}),m=r.trim().split(`
`);for(let l of m){let u=l.split("|");u.length>=4&&n.push({author:u[0],time:u[1],message:u.slice(2,-1).join("|"),hash:u[u.length-1]})}}catch(r){R.appendLine(`[WhoToBlame] Git blame error: ${r.message}`)}let p="Unknown",s="Unknown",a="Unknown",d=[],c=Ke(e);if(c)try{await Te.window.withProgress({location:Te.ProgressLocation.Notification,title:`Ricwiz: Analyzing ${c.name} in Salesforce...`,cancellable:!1},async()=>{let r="";if(c.type==="CustomField"){let m=c.name.split(".");m.length===2&&(r=`SELECT LastModifiedBy.Name, LastModifiedDate, CreatedBy.Name FROM CustomField WHERE DeveloperName = '${m[1].replace("__c","")}' AND TableEnumOrId = '${m[0]}'`)}else c.type==="LightningComponentBundle"?r=`SELECT LastModifiedBy.Name, LastModifiedDate, CreatedBy.Name FROM LightningComponentBundle WHERE DeveloperName = '${c.name}'`:r=`SELECT LastModifiedBy.Name, LastModifiedDate, CreatedBy.Name FROM ${c.type} WHERE Name = '${c.name}'`;if(r)try{let{stdout:m}=await g(`sf data query -t -q "${r}" --json`,{cwd:i,maxBuffer:52428800}),l=JSON.parse(m);if(l&&l.result&&l.result.records&&l.result.records.length>0){let u=l.result.records[0];p=u.LastModifiedBy?u.LastModifiedBy.Name:"Unknown",a=u.CreatedBy?u.CreatedBy.Name:"Unknown",s=new Date(u.LastModifiedDate).toLocaleString()}else p="Not found in Org",s="N/A",a="N/A"}catch(m){p="Query Error",s="N/A",a="N/A",R.appendLine(`[WhoToBlame] Query error: ${m.message}`)}try{let m="SELECT Action, Display, CreatedBy.Name, CreatedDate FROM SetupAuditTrail ORDER BY CreatedDate DESC LIMIT 1500",{stdout:l}=await g(`sf data query -q "${m}" --json`,{cwd:i,maxBuffer:52428800}),u=JSON.parse(l);if(u&&u.result&&u.result.records){let f=c.name.replace("__c","");d=u.result.records.filter(w=>w.Display&&w.Display.includes(f)).map(w=>({action:w.Action,display:w.Display,author:w.CreatedBy?w.CreatedBy.Name:"Unknown",time:new Date(w.CreatedDate).toLocaleString()})).slice(0,10)}}catch(m){R.appendLine(`[WhoToBlame] Audit trail query error: ${m.message}`)}})}catch(r){R.appendLine(`[WhoToBlame] Salesforce query error: ${r.message}`)}else p="Unsupported Metadata Type",s="N/A";return{fileName:o,gitHistory:n,sfAuthor:p,sfTime:s,sfCreatedBy:a,auditHistory:d}}var he=k(require("vscode"));var We=k(require("https"));async function So(t,e){let o=z();if(!o)return;let i=(await Ce())?.trim();if(!i){he.window.showErrorMessage("Ricwiz: GitLab token is not configured.");return}try{let n=await D.initialize(o,{skipPrompt:!0});if(!n)return;let s=n.getConfig("gitlabUrlOverride","");if(s){let a=new URL(s);s=`${a.protocol}//${a.host}`}else{let{stdout:a}=await g("git remote",{cwd:o}),d=a.split(`
`).map(r=>r.trim()).filter(r=>r),c=!1;for(let r of d){let{stdout:m}=await g(`git remote get-url ${r}`,{cwd:o}),l=m.trim();l.endsWith(".git")&&(l=l.slice(0,-4)),l.startsWith("git@")&&(l=l.replace("git@","").replace(":","/"),l=`https://${l}`);let u=new URL(l),f=u.pathname;if(f.startsWith("/")&&(f=f.substring(1)),f.endsWith("/")&&(f=f.slice(0,-1)),encodeURIComponent(f)===t||f===t){s=`${u.protocol}//${u.host}`,c=!0;break}}if(!c){he.window.showErrorMessage(`Ricwiz: Could not determine base URL for project ${t}`);return}}await he.window.withProgress({location:he.ProgressLocation.Notification,title:`Fetching failed jobs for Pipeline #${e}...`,cancellable:!1},async()=>{let a=new We.Agent({keepAlive:!0}),d=new URL(`${s}/api/v4/projects/${t}/pipelines/${e}/jobs?scope[]=failed`),c=await new Promise(h=>{We.get(d,{headers:{"PRIVATE-TOKEN":i},agent:a},w=>{let $="";w.on("data",v=>$+=v),w.on("end",()=>{if(w.statusCode===200)try{h(JSON.parse($))}catch{h([])}else h([])})}).on("error",()=>h([]))});if(!c||c.length===0){he.window.showInformationMessage("Ricwiz: No failed jobs found for this pipeline.");return}let r=c[0],m=new URL(`${s}/api/v4/projects/${t}/jobs/${r.id}/trace`),u=(await new Promise(h=>{We.get(m,{headers:{"PRIVATE-TOKEN":i},agent:a},w=>{let $="";w.on("data",v=>$+=v),w.on("end",()=>h($))}).on("error",w=>h(`Failed to fetch log: ${w.message}`))})).replace(/\x1B\[[0-9;]*[mK]/g,""),f=he.window.createOutputChannel(`Pipeline #${e} - Job ${r.name}`);f.appendLine(`Pipeline ID: ${e}`),f.appendLine(`Job Name: ${r.name}`),f.appendLine(`Status: ${r.status}`),f.appendLine(`URL: ${r.web_url}`),f.appendLine("========================================"),f.appendLine(u),f.show()})}catch(n){he.window.showErrorMessage(`Ricwiz: Error fetching pipeline logs - ${n.message}`)}}var O=k(require("vscode")),rt=k(require("child_process"));async function qo(t,e,o,i){return new Promise((n,p)=>{let a=rt.spawn("gemini",["-y","--output-format","text"],{cwd:e,shell:!0});a.stdin.write(t),a.stdin.end(),i&&i.onCancellationRequested(()=>{a.kill(),p(new Error("Operation cancelled by user."))});let d="",c="";a.stdout.on("data",r=>{let m=r.toString();d+=m,o&&o.append(m)}),a.stderr.on("data",r=>{let m=r.toString();c+=m,o&&o.append(m)}),a.on("error",r=>{p(new Error(`Failed to start Gemini CLI: ${r.message}. Is it installed and in your PATH?`))}),a.on("close",r=>{r===0?n(d.trim()):p(new Error(`Gemini CLI failed with code ${r}: ${c||d}`))})})}function _o(t){if(!t||!t.trim())return"";let e=t.trim(),o=e.match(/###\s*([^#\r\n]+)\s*###/);if(o&&o[1]?.trim())e=o[1].trim();else{let n=e.match(/###\s*Answer\s*###\s*:?\s*([^\r\n]+)/i);if(n&&n[1]?.trim())e=n[1].trim();else{let p=e.match(/<(?:commit_message|answer|output)>([\s\S]*?)<\/(?:commit_message|answer|output)>/i);p&&p[1]?.trim()?e=p[1].trim():(e=e.replace(/<(?:thought|think|thinking)[\s\S]*?<\/(?:thought|think|thinking)>/gi,""),e=e.split(/\r?\n/).map(a=>a.trim()).find(a=>a.length>0&&!/^alternative\b/i.test(a)&&!/^(?:thinking|thought|here\s+is)/i.test(a))||e)}}let i=e.split(/\r?\n/)[0].trim();return i=i.replace(/^#+|#+$/g,"").trim(),i=i.replace(/^###\s*Answer\s*###\s*:?\s*/i,""),i=i.replace(/^[`"']+|[`"']+$/g,"").trim(),i=i.replace(/^[-*•]\s+/,""),i=i.replace(/^\d+[\.\)]\s+/,""),i=i.replace(/^\[?[A-Z0-9]+(?:-[A-Z0-9]+)*-\d+(?:-\d+)?\]?\s*(?:-\s*|:\s*|\s+)?/i,""),i=i.replace(/\s+/g," ").trim(),i.length>0&&/^[a-z]/.test(i)&&(/^(feat|fix|docs|style|refactor|perf|test|build|ci|chore|revert)(\([^\)]+\))?:/.test(i)||(i=i.charAt(0).toUpperCase()+i.slice(1))),i.endsWith(".")&&!i.endsWith("..")&&(i=i.slice(0,-1).trim()),i}async function Do(){let t=O.workspace.workspaceFolders;if(!t){O.window.showErrorMessage("No workspace folder found.");return}let e=t[0].uri.fsPath;try{let o=await new Promise((i,n)=>{rt.execFile("git",["diff","--cached","-U1","--no-ext-diff","--no-color","--",".",":(exclude)package-lock.json",":(exclude)yarn.lock",":(exclude)*.map",":(exclude)*.min.js",":(exclude)*.min.css"],{cwd:e,maxBuffer:10485760},(s,a,d)=>{s&&!a?n(s):i(a)})});if(!o.trim()){O.window.showInformationMessage("No staged changes found. Please stage your changes first.");return}await O.window.withProgress({location:O.ProgressLocation.Notification,title:"Generating commit message with Gemini...",cancellable:!0},async(i,n)=>{let p=`Generate a single, concise commit message description in English for the following git diff.

Rules:
- Start with a capital letter
- Use the imperative mood (e.g. "Add", "Fix", "Update", "Refactor")
- Under 72 characters
- Do NOT include any ticket numbers
- Do NOT provide multiple options or alternatives
- Output the final message enclosed exactly between ### and ### on its own line like:
###<your commit message here>###

Diff:
${o.slice(0,1e4)}`,s=O.window.createOutputChannel("Ricwiz AI: Commit Message");s.show(!0),s.appendLine("--- Generating Commit Message ---");let a=L(e),d=await qo(p,e,s,n);s.appendLine(`
--- Finished ---`);let c=_o(d);if(!c){O.window.showWarningMessage("Could not extract a valid commit message from Gemini output.");return}let r=O.extensions.getExtension("vscode.git");if(r&&r.isActive){let m=r.exports.getAPI(1);if(m.repositories.length>0){let l=m.repositories[0],u=l.inputBox.value||"",f=/^[A-Z]+-\d+(?:-\d+)?\s*(?:-\s*|:\s*|\s+)?/i,h=u.match(f);if(h)l.inputBox.value=h[0]+c;else{let w=await a,$=O.workspace.getConfiguration("ricwiz"),v=$.get("ticketPrefix","SFPSCA-"),x=te(w,v),y=w.match(new RegExp(`(${x}\\d+(?:-\\d+)?)`,"i"));if(y){let S=$.get("commitMessageSuffix","- ");l.inputBox.value=`${y[1].toUpperCase()}${S}`+c}else l.inputBox.value=c}O.window.showInformationMessage("Commit message generated and prefilled!")}else O.window.showInformationMessage("Generated: "+c)}else O.window.showInformationMessage("Generated: "+c)})}catch(o){O.window.showErrorMessage("Failed to generate commit message: "+o.message)}}function To(t,e,o){t.subscriptions.push(b.commands.registerCommand("ricwiz.conflictAction",At),b.commands.registerCommand("ricwiz.generateDestructiveChanges",async()=>{try{await Tt()}finally{b.commands.executeCommand("ricwiz.manualRefresh")}}),b.commands.registerCommand("ricwiz.runSmartTests",async()=>{try{await Et()}finally{b.commands.executeCommand("ricwiz.manualRefresh")}}),b.commands.registerCommand("ricwiz.refreshWebview",()=>{e&&b.commands.executeCommand("workbench.action.webview.reloadWebviewAction")}),b.commands.registerCommand("ricwiz.createBranches",async i=>{try{await Mt(i)}finally{b.commands.executeCommand("ricwiz.manualRefresh")}}),b.commands.registerCommand("ricwiz.prepareDeploy",async()=>{try{await Nt()}finally{b.commands.executeCommand("ricwiz.manualRefresh")}}),b.commands.registerCommand("ricwiz.createMergeRequests",async()=>{try{await jt()}finally{b.commands.executeCommand("ricwiz.manualRefresh")}}),b.commands.registerCommand("ricwiz.createMergeRequestsVSCode",async()=>{try{await Wt()}finally{b.commands.executeCommand("ricwiz.manualRefresh")}}),b.commands.registerCommand("ricwiz.openJiraTicket",async()=>{try{await Ht()}finally{b.commands.executeCommand("ricwiz.manualRefresh")}}),b.commands.registerCommand("ricwiz.openJiraTicketVSCode",async()=>{try{await Vt()}finally{b.commands.executeCommand("ricwiz.manualRefresh")}}),b.commands.registerCommand("ricwiz.showJiraDetails",()=>{e&&to(e)}),b.commands.registerCommand("ricwiz.openJiraDashboard",i=>{e&&oo(e,i)}),b.commands.registerCommand("ricwiz.openJiraDetailsForId",i=>{e&&io(e,i)}),b.commands.registerCommand("ricwiz.toggleDashboardBranches",i=>{e&&(e.setDashboardShowBranches(i),b.commands.executeCommand("ricwiz.openJiraDashboard"))}),b.commands.registerCommand("ricwiz.changeJiraStatus",async()=>{try{await ro()}finally{b.commands.executeCommand("ricwiz.manualRefresh")}}),b.commands.registerCommand("ricwiz.addJiraComment",async()=>{try{await no()}finally{b.commands.executeCommand("ricwiz.manualRefresh")}}),b.commands.registerCommand("ricwiz.addJiraLabel",async()=>{try{await so()}finally{b.commands.executeCommand("ricwiz.manualRefresh")}}),b.commands.registerCommand("ricwiz.setJiraToken",ao),b.commands.registerCommand("ricwiz.setGitlabToken",lo),b.commands.registerCommand("ricwiz.syncAll",async()=>{try{await mo()}finally{b.commands.executeCommand("ricwiz.manualRefresh")}}),b.commands.registerCommand("ricwiz.updateBases",async()=>{try{await po()}finally{b.commands.executeCommand("ricwiz.manualRefresh")}}),b.commands.registerCommand("ricwiz.deleteUnusedBranches",async()=>{try{await uo()}finally{b.commands.executeCommand("ricwiz.manualRefresh")}}),b.commands.registerCommand("ricwiz.checkoutBranch",async i=>{try{await Fe(i)}finally{b.commands.executeCommand("ricwiz.manualRefresh")}}),b.commands.registerCommand("ricwiz.copyBranchName",async()=>{try{await go()}finally{b.commands.executeCommand("ricwiz.manualRefresh")}}),b.commands.registerCommand("ricwiz.generatePackageXml",async()=>{try{await ho()}finally{b.commands.executeCommand("ricwiz.manualRefresh")}}),b.commands.registerCommand("ricwiz.deployPackage",async()=>{try{await wo()}finally{b.commands.executeCommand("ricwiz.manualRefresh")}}),b.commands.registerCommand("ricwiz.importData",async()=>{try{await vo()}finally{b.commands.executeCommand("ricwiz.manualRefresh")}}),b.commands.registerCommand("ricwiz.listTicketFiles",async()=>{try{await bo()}finally{b.commands.executeCommand("ricwiz.manualRefresh")}}),b.commands.registerCommand("ricwiz.resetTracking",async()=>{try{await yo()}finally{b.commands.executeCommand("ricwiz.manualRefresh")}}),b.commands.registerCommand("ricwiz.extractComponent",async()=>{try{await xo()}finally{b.commands.executeCommand("ricwiz.manualRefresh")}}),b.commands.registerCommand("ricwiz.deployMultiOrg",async()=>{try{await Co()}finally{b.commands.executeCommand("ricwiz.manualRefresh")}}),b.commands.registerCommand("ricwiz.captureAdminChanges",async()=>{try{await $o()}finally{b.commands.executeCommand("ricwiz.manualRefresh")}}),b.commands.registerCommand("ricwiz.openHistory",async()=>{try{await Ro()}finally{b.commands.executeCommand("ricwiz.manualRefresh")}}),b.commands.registerCommand("ricwiz.searchTicket",async()=>{try{await zo()}finally{b.commands.executeCommand("ricwiz.manualRefresh")}}),b.commands.registerCommand("ricwiz.whoToBlame",async()=>{let i=await Bo();i&&e&&(e.setBlameData(i),e.setPage("blame"))}),b.commands.registerCommand("ricwiz.showPipelineLogs",(i,n)=>So(i,n)),b.commands.registerCommand("ricwiz.manualRefresh",()=>{o&&o()}),b.commands.registerCommand("ricwiz.toggleAutoRefresh",()=>{if(e){let i=!e.isAutoRefreshEnabled();e.setAutoRefresh(i),b.workspace.getConfiguration("ricwiz").update("autoRefresh",i,b.ConfigurationTarget.Global)}}),b.commands.registerCommand("ricwiz.openSettings",()=>{b.commands.executeCommand("workbench.action.openSettings","ricwiz")}),b.commands.registerCommand("ricwiz.generateCommitMessage",async()=>{await Do()}))}var le=k(require("vscode"));function Eo(t,e,o){let i,n=le.workspace.getConfiguration("ricwiz").get("autoRefresh",!0);e?.setAutoRefresh(n),t.subscriptions.push(le.workspace.onDidChangeConfiguration(s=>{if(s.affectsConfiguration("ricwiz.autoRefresh")){let a=le.workspace.getConfiguration("ricwiz").get("autoRefresh",!0);e?.setAutoRefresh(a)}}));async function p(){let s=le.extensions.getExtension("vscode.git");if(s){let c=function(r){let m="",l;async function u(){let h=le.workspace.workspaceFolders;if(!h)return;let w=h[0].uri.fsPath,$=await L(w);if($&&$!==m){m=$;let v=le.workspace.getConfiguration("ricwiz"),x=v.get("ticketPrefix","SFPSCA-");if(!$.includes(x)){let A=$.match(/([A-Z]+-)\d+/i);A&&(x=A[1].toUpperCase())}let y=[],S=[],E=[],B=[],U=await D.initialize(w,{skipPrompt:!0}),W=U?.environments||v.get("environments",[{name:"Qual",sourceBranch:"quality"},{name:"Val",sourceBranch:"validation"},{name:"Prod",sourceBranch:"main"}]);try{let A=v.get("workspaceCheckoutButtons",["main","quality","validation"]);E=Array.from(new Set(A))}catch{}let me="",Ue=$.match(new RegExp(`(${x}\\d+(?:-\\d+)?)`,"i"));if(Ue){let A=Ue[1].toUpperCase();me=A;let we=v.get("commitMessageSuffix","- "),ht=/^[A-Z]+-\d+(?:-\d+)?\s*(?:-\s*|:\s*|\s+)?/i;ht.test(r.inputBox.value)?r.inputBox.value.toUpperCase().startsWith(A)||(r.inputBox.value=r.inputBox.value.replace(ht,`${A}${we}`)):r.inputBox.value=`${A}${we}`+r.inputBox.value,o.text=`$(bookmark) ${A}`,o.tooltip=`Branch: ${$}
Click to open Jira ticket`,o.show();try{let wt=await Se(w,A,"");y=await Be(w,wt,A,W,U)}catch{}}else{o.hide();try{B=await Ot(w)}catch{}}let[Ge,He,xe]=await Promise.all([Ut(w,10),Ft(w,$,W,U),me?Ie(me).catch(A=>{let we=A.message;return we&&(we.includes("ENOTFOUND")||we.includes("network"))&&(we="No Internet or Invalid URL"),{summary:`\u26A0\uFE0F Jira Error: ${we}`,description:"",status:""}}):Promise.resolve(null)]);S=Ge;let nt=xe?xe.summary:"",Me=xe&&xe.status||"";e?.updateBranch($,He,y,S,E,B,nt,Me)}}function f(){e?.isAutoRefreshEnabled()&&(l&&clearTimeout(l),l=setTimeout(()=>{m="",u()},300))}i=()=>{m="",u()},u(),t.subscriptions.push(r.state.onDidChange(()=>f())),t.subscriptions.push(le.window.onDidChangeWindowState(h=>{h.focused&&f()}))};var a=c;s.isActive||await s.activate();let d=s.exports.getAPI(1);d.repositories.length>0&&d.repositories.forEach(r=>c(r)),d.onDidOpenRepository(r=>c(r))}}return p(),()=>{i&&i()}}var ce;async function Qo(t){await zt(t),ce=new _e(t.extensionUri),t.subscriptions.push(Ee.window.registerWebviewViewProvider("ricwiz-webview",ce));let e=Ee.window.createStatusBarItem(Ee.StatusBarAlignment.Left,100);e.command="ricwiz.openJiraTicket",t.subscriptions.push(e);let o=Eo(t,ce,e);return To(t,ce,o),{getJiraCredentials:async()=>({email:Ee.workspace.getConfiguration("ricwiz").get("jiraEmail",""),token:await Qe()}),getGitLabToken:async()=>Ce()}}function Yo(){}0&&(module.exports={activate,deactivate,webviewProvider});
