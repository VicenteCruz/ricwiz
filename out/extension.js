"use strict";var Uo=Object.create;var qe=Object.defineProperty;var Oo=Object.getOwnPropertyDescriptor;var No=Object.getOwnPropertyNames;var jo=Object.getPrototypeOf,Jo=Object.prototype.hasOwnProperty;var Wo=(t,e)=>{for(var o in e)qe(t,o,{get:e[o],enumerable:!0})},vt=(t,e,o,n)=>{if(e&&typeof e=="object"||typeof e=="function")for(let i of No(e))!Jo.call(t,i)&&i!==o&&qe(t,i,{get:()=>e[i],enumerable:!(n=Oo(e,i))||n.enumerable});return t};var k=(t,e,o)=>(o=t!=null?Uo(jo(t)):{},vt(e||!t||!t.__esModule?qe(o,"default",{value:t,enumerable:!0}):o,t)),Go=t=>vt(qe({},"__esModule",{value:!0}),t);var ei={};Wo(ei,{activate:()=>Zo,deactivate:()=>Xo,webviewProvider:()=>ae});module.exports=Go(ei);var Me=k(require("vscode"));var z=k(require("vscode"));function C(t){return t?t.replace(/&/g,"&amp;").replace(/</g,"&lt;").replace(/>/g,"&gt;").replace(/"/g,"&quot;").replace(/'/g,"&#39;"):""}function _e(t){let e=(t||"").toLowerCase().trim();return e==="open"?"#888888":e==="in progress"?"#007acc":e==="waiting for deploy"?"#d7a500":e==="close"||e==="done"||e==="closed"?"#238636":"var(--vscode-badge-background)"}function ke(t){return t?t==="running"?"\u{1F7E1}":t==="success"?"\u{1F7E2}":t==="failed"?"\u{1F534}":t==="canceled"||t==="skipped"?"\u26AA":"":""}function q(){return`
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
    `}function yt(t,e){let o=_(),n=(e.files||[]).map(i=>`
        <button class="btn" style="padding: 6px; font-size: 12px; display: flex; justify-content: space-between; align-items: center;" onclick="sendOpenFileCommand('${C(i.file)}')">
            <span style="flex: 1; overflow: hidden; text-overflow: ellipsis; white-space: nowrap; direction: rtl; text-align: left;">&lrm;${C(i.file)}</span>
            <span style="font-size: 10px; opacity: 0.8; flex-shrink: 0; background-color: var(--vscode-badge-background); color: var(--vscode-badge-foreground); padding: 2px 4px; border-radius: 2px;">${C(i.state)}</span>
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
        
        ${n?`
            <div style="font-size: 11px; opacity: 0.7; margin: 8px 4px 4px 4px; text-transform: uppercase;">Conflicted Files</div>
            <div style="display: flex; flex-direction: column; gap: 2px;">
                ${n}
            </div>
        `:""}

        ${q()}
    </body>
    </html>`}function bt(t){return`<!DOCTYPE html>
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
    </html>`}function xt(t){let e=_(),o=t?.ticketId||"Jira",n=t?.summary||"No Title",i=t?.description||"No description provided.",p=t?.relatedBranches||[];return`<!DOCTYPE html>
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
            <div class="jira-title">${C(n)}</div>
            <div class="jira-desc">${C(i)}</div>
            
            ${p.length>0?`
                <div style="margin-top: 16px; border-top: 1px solid var(--vscode-panel-border); padding-top: 12px;">
                    <div style="font-size: 11px; opacity: 0.7; margin-bottom: 8px; text-transform: uppercase; font-weight: bold;"><span class="icon" style="color: #32D74B;">\u2387</span> Related Branches & MRs</div>
                    <div style="display: flex; flex-direction: column; gap: 4px;">
                        ${p.map(r=>{let c=ke(r.pipelineStatus),d="";return r.pipelineStatus==="failed"&&r.projectPath&&r.pipelineId&&(d=`onclick="event.stopPropagation(); sendCommand('showPipelineLogs', { projectPath: '${r.projectPath}', pipelineId: ${r.pipelineId} });" style="cursor: pointer;"`),`
                            <div class="btn" style="padding: 6px 10px; font-size: 12px; display: flex; justify-content: space-between; align-items: center; background-color: var(--vscode-button-secondaryBackground); color: var(--vscode-button-secondaryForeground); border-radius: 4px;" onclick="sendCheckoutCommand('${C(r.name)}', this)" title="Checkout ${C(r.name)}">
                                <div style="display: flex; align-items: center; gap: 6px; overflow: hidden;">
                                    <span style="overflow: hidden; text-overflow: ellipsis; white-space: nowrap; font-weight: bold;">${C(r.name)}</span>
                                </div>
                                <div style="display: flex; gap: 6px; align-items: center;">
                                    ${c?`<span title="Pipeline: ${r.pipelineStatus}" style="font-size: 11px;" ${d}>${c}</span>`:""}
                                    ${r.mrUrl?`<span onclick="event.stopPropagation(); sendCommand('openExternal', '${r.mrUrl}');" title="Open Merge Request" style="cursor: pointer; font-size: 12px;">\u{1F517}</span>`:""}
                                    ${r.isMerged?'<span style="background-color: var(--vscode-charts-green); color: white; border-radius: 3px; padding: 2px 6px; font-size: 10px; font-weight: bold;" title="Merged to target env">MERGED</span>':""}
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
    </html>`}function kt(t){let{data:e,showBranches:o}=t,n=_(),i=e||{queries:[],selectedIndex:0,results:[],error:null},p=i.queries.map((c,d)=>`
        <option value="${d}" ${d===i.selectedIndex?"selected":""}>${C(c.name)}</option>
    `).join(""),r=i.error?`
        <div style="color: var(--vscode-errorForeground); padding: 12px; text-align: center; background: var(--vscode-editorError-background); border-radius: 4px;">
            \u26A0 ${C(i.error)}
        </div>
    `:i.results.length===0?`
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
                ${i.results.map(c=>`
                    <tr style="border-bottom: ${c.detailedBranches&&c.detailedBranches.length>0?"none":"1px solid var(--vscode-panel-border)"}; cursor: pointer;" class="tr-hover" onclick="sendCommand('openJiraDetailsForId', '${C(c.key)}', this)">
                        <td style="padding: 6px; font-weight: bold; color: var(--vscode-textLink-foreground); white-space: nowrap;">${C(c.key)}</td>
                        <td style="padding: 6px; overflow: hidden; text-overflow: ellipsis; max-width: 150px; white-space: nowrap;" title="${C(c.summary)}">${C(c.summary)}</td>
                        <td style="padding: 6px; white-space: nowrap;">
                            <span style="background: ${_e(c.status)}; color: white; padding: 2px 4px; border-radius: 3px; font-size: 9px; font-weight: bold; text-transform: uppercase;">${C(c.status)}</span>
                        </td>
                        <td style="padding: 6px; white-space: nowrap; text-align: center;">
                            ${c.detailedBranches?"":c.branch?`
                                <button class="icon-button" style="background-color: var(--vscode-button-secondaryBackground); color: var(--vscode-button-secondaryForeground); font-size: 10px; padding: 2px 6px;" title="Checkout ${C(c.branch)}" onclick="event.stopPropagation(); sendCommand('checkout', '${C(c.branch)}')">
                                    \u2387 Checkout
                                </button>
                            `:`
                                <button class="icon-button" style="background-color: var(--vscode-button-background); color: var(--vscode-button-foreground); font-size: 10px; padding: 2px 6px;" title="Create Branch for ${C(c.key)}" onclick="event.stopPropagation(); sendCommand('createBranchForTicket', '${C(c.key)}')">
                                    + Create
                                </button>
                            `}
                        </td>
                    </tr>
                    ${c.detailedBranches&&c.detailedBranches.length>0?`
                    <tr style="border-bottom: 1px solid var(--vscode-panel-border);">
                        <td colspan="4" style="padding: 0 6px 8px 6px;">
                            <div style="display: flex; flex-direction: column; gap: 4px; padding-left: 8px; border-left: 2px solid var(--vscode-editorIndentGuide-activeBackground1);">
                                ${c.detailedBranches.map(d=>{let a=ke(d.pipelineStatus);return`
                                    <div style="display: flex; justify-content: space-between; align-items: center; font-size: 10px; background: var(--vscode-editor-background); padding: 2px 6px; border-radius: 3px;">
                                        <div style="display: flex; align-items: center; gap: 6px; overflow: hidden; cursor: pointer; flex: 1;" onclick="sendCheckoutCommand('${C(d.name)}', this)" title="Checkout ${C(d.name)}">
                                            <span style="overflow: hidden; text-overflow: ellipsis; white-space: nowrap;">${C(d.name)}</span>
                                        </div>
                                        <div style="display: flex; gap: 6px; align-items: center;">
                                            ${d.isMerged?'<span style="background-color: var(--vscode-charts-green); color: white; border-radius: 3px; padding: 1px 4px; font-size: 8px; font-weight: bold;">MERGED</span>':""}
                                            ${a?`<span title="Pipeline: ${d.pipelineStatus}" >${a}</span>`:""}
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
        ${n}
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
        
        ${i.queries.length>0?`
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
            ${r}
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
    </html>`}function $t(t){let{logoUri:e,currentBranch:o,currentBranchIsMerged:n,relatedBranches:i,commits:p,baseBranches:r,recentTickets:c,ticketTitle:d,ticketStatus:a,autoRefreshEnabled:s}=t,m=_(),l=p.length>0?`
        <div class="separator"></div>
        <div style="padding: 0 4px;">
            <div style="font-size: 11px; opacity: 0.7; margin-bottom: 6px; display: flex; align-items: center; gap: 4px;">
                <span>\u2637</span> Recent Commits
            </div>
            <div style="display: flex; flex-direction: column; gap: 2px;">
                ${p.map(w=>`
                    <div style="font-size: 11px; padding: 3px 4px; border-radius: 2px; display: flex; gap: 6px; align-items: baseline;">
                        <code style="color: var(--vscode-textLink-foreground); font-size: 10px; flex-shrink: 0;">${C(w.hash)}</code>
                        <span style="flex: 1; overflow: hidden; text-overflow: ellipsis; white-space: nowrap;" title="${C(w.message)}">${C(w.message)}</span>
                        <span style="font-size: 9px; opacity: 0.5; flex-shrink: 0;">${C(w.timeAgo)}</span>
                    </div>
                `).join("")}
            </div>
        </div>
    `:"",u=i.find(w=>w.name===o),f="";u&&(f=ke(u.pipelineStatus));let h=u?u.mrUrl:void 0,v=i.filter(w=>w.name!==o),$=o?`
        <div style="background-color: var(--vscode-editor-inactiveSelectionBackground); padding: 10px; border-radius: 6px; margin-bottom: 16px; border: 1px solid var(--vscode-panel-border); box-shadow: 0 2px 4px rgba(0,0,0,0.1); position: relative;">
            ${d&&a?`
            <div style="position: absolute; top: 6px; right: 6px; z-index: 10; cursor: pointer; font-size: 9px; padding: 2px 6px; border-radius: 18px; background-color: ${_e(a)}; color: white; border: 1px solid var(--vscode-panel-border); opacity: 0.9; font-weight: bold; text-transform: uppercase; display: flex; align-items: center; gap: 4px;" onclick="sendCommand('changeJiraStatus', null, this)" title="Update Jira Status">
                <span>\u270E</span><span>${C(a)}</span>
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
                ${n?'<span style="background-color: var(--vscode-charts-green); color: white; border-radius: 3px; padding: 1px 4px; font-size: 10px; font-weight: bold;" title="Merged to target env">MERGED</span>':""}
            </div>
            ${d?`<div style="font-size: 12px; margin-top: 6px; text-align: center; opacity: 0.9; font-style: italic;">${C(d)}</div>`:""}
            ${v.length>0?`
                <div style="margin-top: 10px; border-top: 1px solid var(--vscode-panel-border); padding-top: 10px;">
                    <div style="font-size: 10px; opacity: 0.7; margin-bottom: 6px; text-transform: uppercase; text-align: center;">Sister Branches</div>
                    <div style="display: flex; flex-direction: column; gap: 4px;">
                        ${v.map(w=>{let b=ke(w.pipelineStatus),x="";return w.pipelineStatus==="failed"&&w.projectPath&&w.pipelineId&&(x=`onclick="event.stopPropagation(); sendCommand('showPipelineLogs', { projectPath: '${w.projectPath}', pipelineId: ${w.pipelineId} });" style="cursor: pointer;"`),`
                            <div class="btn" style="padding: 6px 8px; font-size: 11px; display: flex; justify-content: space-between; align-items: center; background-color: var(--vscode-button-secondaryBackground); color: var(--vscode-button-secondaryForeground); border-radius: 4px; box-sizing: border-box; width: 100%;" onclick="sendCheckoutCommand('${C(w.name)}', this)" title="Checkout ${C(w.name)}">
                                <div style="display: flex; align-items: center; gap: 4px; overflow: hidden;">
                                    <span style="overflow: hidden; text-overflow: ellipsis; white-space: nowrap; font-weight: bold;">${C(w.name)}</span>
                                </div>
                                <div style="display: flex; gap: 4px; align-items: center;">
                                    ${w.isMerged?'<span style="background-color: var(--vscode-charts-green); color: white; border-radius: 3px; padding: 1px 4px; font-size: 9px; font-weight: bold;" title="Merged to target env">MERGED</span>':""}
                                    ${b?`<span title="Pipeline: ${w.pipelineStatus}" style="font-size: 10px;" ${x}>${b}</span>`:""}
                                    ${w.mrUrl?`<span onclick="event.stopPropagation(); sendCommand('openExternal', '${w.mrUrl}');" title="Open Merge Request" style="cursor: pointer; font-size: 10px;">\u{1F517}</span>`:""}
                                </div>
                            </div>`}).join("")}
                    </div>
                </div>
            `:c.length>0?`
                <div style="margin-top: 10px; border-top: 1px solid var(--vscode-panel-border); padding-top: 10px;">
                    <div style="font-size: 10px; opacity: 0.7; margin-bottom: 6px; text-transform: uppercase; text-align: center;">Recent Tickets</div>
                    <div style="display: flex; flex-direction: column; gap: 4px;">
                        ${c.map(w=>`
                            <div class="btn" style="padding: 6px 8px; font-size: 11px; display: flex; justify-content: space-between; align-items: center; background-color: var(--vscode-button-secondaryBackground); color: var(--vscode-button-secondaryForeground); border-radius: 4px; box-sizing: border-box; width: 100%;" onclick="sendCheckoutCommand('${C(w)}', this)" title="Checkout ${C(w)}">
                                <span style="font-weight: bold; overflow: hidden; text-overflow: ellipsis; white-space: nowrap;">${C(w)}</span>
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
                <button class="copy-btn" id="autoRefreshToggle" onclick="sendCommand('toggleAutoRefresh', null, this)" title="${s?"Auto-refresh is ON \u2014 click to disable":"Auto-refresh is OFF \u2014 click to enable"}" style="font-size: 11px; padding: 2px 6px; border-radius: 3px; border: 1px solid var(--vscode-panel-border); ${s?"opacity: 0.9; background-color: var(--vscode-button-secondaryBackground);":"opacity: 0.5;"}">
                    ${s?"\u26A1 Auto":"\u23F8\uFE0F Auto"}
                </button>
            </div>
        </div>

        ${$}

        ${r.length>0?`
            <div style="display: flex; gap: 4px; margin-bottom: 16px; flex-wrap: wrap; justify-content: center;">
                ${r.map(w=>{let b=w.split("/").pop()?.toUpperCase()||w.toUpperCase();return`
                    <button class="btn" style="flex: 1; min-width: 25%; justify-content: center; padding: 6px 4px; font-size: 10px; font-weight: bold; background-color: var(--vscode-button-secondaryBackground); color: var(--vscode-button-secondaryForeground); border-radius: 4px;" onclick="sendCheckoutCommand('${C(w)}', this)" title="Checkout ${C(w)}">
                        ${C(b)}
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
            
            <button class="btn" style="margin-bottom: 10px; background-color: var(--vscode-button-secondaryBackground); border-radius: 4px;" title="Generate Commit Message with Gemini" onclick="sendCommand('generateCommitMessage', null, this)">
                <span class="icon" style="color: #BF5AF2;">\u2728</span> Generate Commit Message
            </button>

            <div style="display: flex; gap: 4px;">
                <input type="text" id="aiContextInput" placeholder="Ask AI about code context..." style="flex: 1; padding: 4px 8px; background: var(--vscode-input-background); color: var(--vscode-input-foreground); border: 1px solid var(--vscode-input-border); border-radius: 4px; font-size: 11px;" onkeydown="if(event.key === 'Enter') { const input = document.getElementById('aiContextInput'); sendCommand('codeContext', input.value, this); input.value = ''; }">
                <button class="btn" style="width: auto; padding: 4px 10px; background-color: var(--vscode-button-secondaryBackground); border-radius: 4px;" onclick="const input = document.getElementById('aiContextInput'); sendCommand('codeContext', input.value, this); input.value = '';">Ask</button>
            </div>
        </div>

        ${l}
        
        ${q()}
    </body>
    </html>`}var Qe=class{constructor(e){this._extensionUri=e}_extensionUri;webviewView;currentBranchCache="";currentBranchIsMergedCache=!1;relatedBranchesCache=[];commitsCache=[];baseBranchesCache=[];recentTicketsCache=[];ticketTitleCache="";ticketStatusCache="";currentPage="main";blameDataCache=null;jiraDataCache=null;dashboardDataCache=null;dashboardShowBranches=!1;autoRefreshEnabled=!0;conflictState=null;resolveWebviewView(e,o,n){this.webviewView=e,e.webview.options={enableScripts:!0,localResourceRoots:[this._extensionUri]},this.updateView(),e.webview.onDidReceiveMessage(i=>{switch(i.command){case"createBranches":z.commands.executeCommand("ricwiz.createBranches");break;case"createBranchForTicket":z.commands.executeCommand("ricwiz.createBranches",i.args);break;case"prepareDeploy":z.commands.executeCommand("ricwiz.prepareDeploy");break;case"openMRs":z.commands.executeCommand("ricwiz.createMergeRequests");break;case"openMRsVSCode":z.commands.executeCommand("ricwiz.createMergeRequestsVSCode");break;case"openExternal":i.args&&z.env.openExternal(z.Uri.parse(i.args));break;case"openJira":z.commands.executeCommand("ricwiz.openJiraTicket");break;case"showJiraDetails":z.commands.executeCommand("ricwiz.showJiraDetails");break;case"showPipelineLogs":z.commands.executeCommand("ricwiz.showPipelineLogs",i.args.projectPath,i.args.pipelineId);break;case"changeJiraStatus":z.commands.executeCommand("ricwiz.changeJiraStatus");break;case"addJiraComment":z.commands.executeCommand("ricwiz.addJiraComment");break;case"addJiraLabel":z.commands.executeCommand("ricwiz.addJiraLabel");break;case"setPage":this.setPage(i.args);break;case"openDashboard":z.commands.executeCommand("ricwiz.openJiraDashboard");break;case"openJiraDetailsForId":z.commands.executeCommand("ricwiz.openJiraDetailsForId",i.args);break;case"refreshDashboard":z.commands.executeCommand("ricwiz.openJiraDashboard");break;case"switchDashboardQuery":z.commands.executeCommand("ricwiz.openJiraDashboard",parseInt(i.args,10));break;case"toggleDashboardBranches":z.commands.executeCommand("ricwiz.toggleDashboardBranches",i.args);break;case"openJiraVSCode":z.commands.executeCommand("ricwiz.openJiraTicketVSCode");break;case"openSettings":z.commands.executeCommand("ricwiz.openSettings");break;case"checkout":let p=i.branch||i.args;p&&z.commands.executeCommand("ricwiz.checkoutBranch",p);break;case"copyBranch":z.commands.executeCommand("ricwiz.copyBranchName");break;case"generatePackageXml":z.commands.executeCommand("ricwiz.generatePackageXml");break;case"openDevTools":this.setPage("devtools");break;case"openMain":this.setPage("main");break;case"generateDestructiveChanges":z.commands.executeCommand("ricwiz.generateDestructiveChanges");break;case"deployPackage":z.commands.executeCommand("ricwiz.deployPackage");break;case"runSmartTests":z.commands.executeCommand("ricwiz.runSmartTests");break;case"importData":z.commands.executeCommand("ricwiz.importData");break;case"listTicketFiles":z.commands.executeCommand("ricwiz.listTicketFiles");break;case"resetTracking":z.commands.executeCommand("ricwiz.resetTracking");break;case"extractComponent":z.commands.executeCommand("ricwiz.extractComponent");break;case"deployMultiOrg":z.commands.executeCommand("ricwiz.deployMultiOrg");break;case"captureAdminChanges":z.commands.executeCommand("ricwiz.captureAdminChanges");break;case"whoToBlame":z.commands.executeCommand("ricwiz.whoToBlame");break;case"syncAll":z.commands.executeCommand("ricwiz.syncAll");break;case"updateBases":z.commands.executeCommand("ricwiz.updateBases");break;case"deleteUnused":z.commands.executeCommand("ricwiz.deleteUnusedBranches");break;case"conflict_commitAndContinue":z.commands.executeCommand("ricwiz.conflictAction","commitAndContinue");break;case"conflict_resolveDeletions":z.commands.executeCommand("ricwiz.conflictAction","resolveDeletions");break;case"conflict_abortDeploy":z.commands.executeCommand("ricwiz.conflictAction","abortDeploy");break;case"openFile":if(i.file){let r=z.workspace.workspaceFolders;if(r){let c=z.Uri.joinPath(r[0].uri,i.file);z.commands.executeCommand("vscode.open",c)}}break;case"searchTicket":z.commands.executeCommand("ricwiz.searchTicket");break;case"manualRefresh":z.commands.executeCommand("ricwiz.manualRefresh");break;case"toggleAutoRefresh":z.commands.executeCommand("ricwiz.toggleAutoRefresh");break;case"openHistory":z.commands.executeCommand("ricwiz.openHistory");break;case"generateCommitMessage":z.commands.executeCommand("ricwiz.generateCommitMessage");break;case"codeContext":z.commands.executeCommand("ricwiz.codeContext",i.args);break}})}setConflictState(e){this.conflictState=e,this.updateView()}updateBranch(e,o,n=[],i=[],p=[],r=[],c="",d=""){this.currentBranchCache=e,this.currentBranchIsMergedCache=o,this.relatedBranchesCache=n,this.commitsCache=i,this.baseBranchesCache=p,this.recentTicketsCache=r,this.ticketTitleCache=c,this.ticketStatusCache=d,this.webviewView&&this.updateView()}setDashboardShowBranches(e){this.dashboardShowBranches=e}getDashboardShowBranches(){return this.dashboardShowBranches}setBlameData(e){this.blameDataCache=e}setJiraData(e){this.jiraDataCache=e}setDashboardData(e){this.dashboardDataCache=e}setAutoRefresh(e){this.autoRefreshEnabled=e,this.updateView()}isAutoRefreshEnabled(){return this.autoRefreshEnabled}setPage(e){this.currentPage=e,this.updateView()}updateView(){if(!this.webviewView)return;let e=this.webviewView.webview.asWebviewUri(z.Uri.joinPath(this._extensionUri,"resources","logo.png"));if(this.conflictState){this.webviewView.webview.html=yt(e,this.conflictState);return}switch(this.currentPage){case"blame":this.webviewView.webview.html=bt(this.blameDataCache);break;case"jira":this.webviewView.webview.html=xt(this.jiraDataCache);break;case"dashboard":this.webviewView.webview.html=kt({data:this.dashboardDataCache,showBranches:this.dashboardShowBranches});break;case"devtools":this.webviewView.webview.html=Ct();break;default:this.webviewView.webview.html=$t({logoUri:e,currentBranch:this.currentBranchCache,currentBranchIsMerged:this.currentBranchIsMergedCache,relatedBranches:this.relatedBranchesCache,commits:this.commitsCache,baseBranches:this.baseBranchesCache,recentTickets:this.recentTicketsCache,ticketTitle:this.ticketTitleCache,ticketStatus:this.ticketStatusCache,autoRefreshEnabled:this.autoRefreshEnabled});break}}};var ve=k(require("vscode"));var Rt=k(require("vscode")),Ho=Rt.window.createOutputChannel("Ricwiz Debug");function j(t){let e=new Date().toISOString();Ho.appendLine(`[${e}] ${t}`),console.log(`[Ricwiz] ${t}`)}async function zt(t){j("initializeSecrets: No longer using SecretStorage. Tokens are read directly from VS Code configuration.")}async function Bt(t){j("storeJiraToken: Storing token in VS Code global configuration..."),await ve.workspace.getConfiguration("ricwiz").update("jiraApiToken",t,ve.ConfigurationTarget.Global),j("storeJiraToken: Successfully stored")}async function Ye(){j("getJiraToken: Reading token from VS Code configuration...");let e=ve.workspace.getConfiguration("ricwiz").get("jiraApiToken","");if(e)return j("getJiraToken: Successfully read Jira Token from configuration."),e;j("getJiraToken: Token not found in configuration.")}async function Pt(t){j("storeGitlabToken: Storing token in VS Code global configuration..."),await ve.workspace.getConfiguration("ricwiz").update("gitlabApiToken",t,ve.ConfigurationTarget.Global),j("storeGitlabToken: Successfully stored")}async function Ce(){j("getGitlabToken: Reading token from VS Code configuration...");let e=ve.workspace.getConfiguration("ricwiz").get("gitlabApiToken","");if(e)return e}var y=k(require("vscode"));var G=k(require("vscode")),Xe=k(require("path")),ye=k(require("fs"));var Le=k(require("vscode")),St=k(require("child_process")),Tt=k(require("util")),Vo=Tt.promisify(St.exec),R=Le.window.createOutputChannel("Ricwiz"),g=async(t,e)=>{R.appendLine(`[EXEC] ${t}`);let o=await Vo(t,{maxBuffer:50*1024*1024,...e});return{stdout:o.stdout.toString(),stderr:o.stderr.toString()}};function B(){let t=Le.workspace.workspaceFolders;if(t)return t[0].uri.fsPath}async function F(t){try{let{stdout:e}=await g("git branch --show-current",{cwd:t});return e.trim()}catch{return""}}function me(t,e){if(!t.includes(e)){let o=t.match(/([A-Z]+-)\d+/i);if(o)return o[1].toUpperCase()}return e}function pe(t,e,o=!1){let n=t.match(new RegExp(`(${e}\\d+)`,"i"));return n?n[1].toUpperCase():t.includes(e)&&!t.includes("-to-")?t.substring(t.indexOf(e)):o&&t.includes("-to-")?t.substring(t.indexOf(e)).split("-to-")[0]:""}function st(t,e){let o=$e(t);return/^\d/.test(o)?`${e}${o}`.toUpperCase():o.toUpperCase()}async function Q(t,e){let o=Le.workspace.getConfiguration("ricwiz"),n=e?.prefix??o.get("ticketPrefix","SFPSCA-"),i=await F(t),p=me(i,n),r=e?.suggestedValue??pe(i,p,e?.handleToSuffix),c=await Le.window.showInputBox({prompt:e?.prompt||"Enter the full ticket ID (e.g., SCPSCA-1234) or just the number",placeHolder:e?.placeHolder||"Ticket ID or number",value:r,ignoreFocusOut:!0});return c?{ticketId:st(c,p),currentBranch:i,prefix:p}:void 0}async function re(t,e){try{return await g(`git show-ref --verify --quiet refs/heads/${e}`,{cwd:t}),!0}catch{}return await qo(t,e)}async function qo(t,e){try{let{stdout:o}=await g(`git branch -r --list "*/${e}"`,{cwd:t});return o.trim().length>0}catch{return!1}}function $e(t){return t.replace(/[&|;$><`\\!"'\r\n]/g,"").trim()}var Re=k(require("vscode")),Dt=k(require("path")),Ke=k(require("fs"));var S=class t{style;upstreamRemote;originRemote;ticketSourceBranch;ticketPrefix;branchPrefix;environments;activeProfile;profileName;constructor(e){this.activeProfile=e,this.profileName=e?.name;let o=Re.workspace.getConfiguration("ricwiz");this.style=e?.workflowStyle||o.get("workflowStyle","standard"),this.style==="multi-remote"?(this.upstreamRemote=e?.upstreamRemote||o.get("upstreamRemote","salesforce-master"),this.originRemote=e?.originRemote||o.get("originRemote","origin")):(this.upstreamRemote="origin",this.originRemote="origin"),this.ticketSourceBranch=e?.ticketSourceBranch||o.get("ticketSourceBranch","main"),this.ticketPrefix=e?.ticketPrefix||o.get("ticketPrefix","SFPSCA-"),this.branchPrefix=e?.branchPrefix??o.get("branchPrefix","");let n=[{name:"Qual",sourceBranch:"quality"},{name:"Val",sourceBranch:"validation"},{name:"Prod",sourceBranch:"main"}];this.environments=e?.environments||o.get("environments",n)}getConfig(e,o){return this.activeProfile&&this.activeProfile[e]!==void 0?this.activeProfile[e]:Re.workspace.getConfiguration("ricwiz").get(e,o)}static async initialize(e,o){let i=Re.workspace.getConfiguration("ricwiz").get("profiles",[]),p=Dt.join(e,"ricwiz.json");if(Ke.existsSync(p))try{let r=Ke.readFileSync(p,"utf-8"),c=JSON.parse(r);c&&Array.isArray(c.profiles)&&(i=[...i,...c.profiles])}catch(r){Re.window.showErrorMessage(`Ricwiz: Error parsing ricwiz.json: ${r.message}`)}if(i.length>0){if(!o?.forcePrompt)try{let{stdout:a}=await g("git branch --show-current",{cwd:e}),s=a.trim(),m=s;s.includes("-to-")&&(m=s.split("-to-")[0]);let{stdout:l}=await g(`git config branch.${m}.ricwiz-profile`,{cwd:e}),u=l.trim();if(u){let f=i.find(h=>h.name===u);if(f)return new t(f)}}catch{}if(o?.skipPrompt)return new t;let r=i.map(a=>a.name),c=await Re.window.showQuickPick(r,{placeHolder:"Ricwiz: Select Workflow Profile",ignoreFocusOut:!0});if(!c)return;let d=i.find(a=>a.name===c);return new t(d)}return new t}buildUpstreamPath(e){return e.includes("/")?e:`${this.upstreamRemote}/${e}`}getFetchRemote(e){return e.includes("/")?e.split("/")[0]:this.upstreamRemote}getFetchBranch(e){return e.includes("/")?e.substring(e.indexOf("/")+1):e}};function Ze(t){let e=t.replace(/\\/g,"/");if(e.includes("/classes/")){let o=e.match(/\/classes\/([^/.]+)\.cls/);if(o)return{type:"ApexClass",name:o[1]}}if(e.includes("/triggers/")){let o=e.match(/\/triggers\/([^/.]+)\.trigger/);if(o)return{type:"ApexTrigger",name:o[1]}}if(e.includes("/lwc/")){let o=e.match(/\/lwc\/([^/]+)\//);if(o)return{type:"LightningComponentBundle",name:o[1]}}if(e.includes("/aura/")){let o=e.match(/\/aura\/([^/]+)\//);if(o)return{type:"AuraDefinitionBundle",name:o[1]}}if(e.includes("/objects/")&&e.includes("/fields/")){let o=e.match(/\/objects\/([^/]+)\//),n=e.match(/\/fields\/([^/.]+)\.field/);if(o&&n)return{type:"CustomField",name:`${o[1]}.${n[1]}`}}if(e.includes("/objects/")){let o=e.match(/\/objects\/([^/.]+)\.object/);if(o)return{type:"CustomObject",name:o[1]}}if(e.includes("/layouts/")){let o=e.match(/\/layouts\/([^/.]+)\.layout/);if(o)return{type:"Layout",name:o[1]}}if(e.includes("/flows/")){let o=e.match(/\/flows\/([^/.]+)\.flow/);if(o)return{type:"Flow",name:o[1]}}if(e.includes("/permissionsets/")){let o=e.match(/\/permissionsets\/([^/.]+)\.permissionset/);if(o)return{type:"PermissionSet",name:o[1]}}if(e.includes("/permissionsetgroups/")){let o=e.match(/\/permissionsetgroups\/([^/.]+)\.permissionsetgroup/);if(o)return{type:"PermissionSetGroup",name:o[1]}}if(e.includes("/profiles/")){let o=e.match(/\/profiles\/([^/.]+)\.profile/);if(o)return{type:"Profile",name:o[1]}}if(e.includes("/customMetadata/")){let o=e.match(/\/customMetadata\/([^/.]+)\.md/);if(o)return{type:"CustomMetadata",name:o[1]}}if(e.includes("/flexipages/")){let o=e.match(/\/flexipages\/([^/.]+)\.flexipage/);if(o)return{type:"FlexiPage",name:o[1]}}return null}async function Et(){let t=B();if(!t){G.window.showErrorMessage("Ricwiz: Open a workspace that is a Git repository.");return}let e=await S.initialize(t,{skipPrompt:!0}),o=e?e.ticketSourceBranch:G.workspace.getConfiguration("ricwiz").get("ticketSourceBranch","main"),n=e?e.originRemote:"origin";await G.window.withProgress({location:G.ProgressLocation.Notification,title:`Ricwiz: Finding deleted files compared to ${n}/${o}...`,cancellable:!1},async()=>{try{let{stdout:i}=await g(`git diff --name-only --diff-filter=D ${n}/${o}...HEAD`,{cwd:t}),p=i.split(`
`).map(u=>u.trim()).filter(u=>u.length>0);if(p.length===0){G.window.showInformationMessage(`Ricwiz: No deleted files found compared to ${n}/${o}.`);return}let r={},c=(u,f)=>{r[u]||(r[u]=[]),r[u].includes(f)||r[u].push(f)};for(let u of p){let f=Ze(u);f&&c(f.type,f.name)}if(Object.keys(r).length===0){G.window.showInformationMessage("Ricwiz: Found deleted files in Git, but none mapped to recognizable Salesforce metadata.");return}let d=`<?xml version="1.0" encoding="UTF-8"?>
<Package xmlns="http://soap.sforce.com/2006/04/metadata">
`;for(let u of Object.keys(r).sort()){d+=`    <types>
`;for(let f of r[u].sort())d+=`        <members>${f}</members>
`;d+=`        <name>${u}</name>
    </types>
`}d+=`    <version>58.0</version>
</Package>`;let a=Xe.join(t,"destructiveChanges");ye.existsSync(a)||ye.mkdirSync(a);let s=Xe.join(a,"destructiveChanges.xml"),m=Xe.join(a,"package.xml");ye.writeFileSync(s,d,"utf8"),ye.existsSync(m)||ye.writeFileSync(m,`<?xml version="1.0" encoding="UTF-8"?>
<Package xmlns="http://soap.sforce.com/2006/04/metadata">
    <version>58.0</version>
</Package>`,"utf8");let l=await G.workspace.openTextDocument(s);await G.window.showTextDocument(l),G.window.showInformationMessage("Ricwiz: destructiveChanges.xml generated successfully!")}catch(i){G.window.showErrorMessage(`Ricwiz: Error generating destructive changes: ${i.message}`)}})}var se=k(require("vscode"));async function Mt(){let t=B();if(!t)return;let e=await S.initialize(t,{skipPrompt:!0}),o=e?e.ticketSourceBranch:se.workspace.getConfiguration("ricwiz").get("ticketSourceBranch","main"),n=e?e.originRemote:"origin";await se.window.withProgress({location:se.ProgressLocation.Notification,title:"Ricwiz: Finding Apex Tests to run...",cancellable:!1},async()=>{try{let{stdout:i}=await g(`git diff --name-status ${n}/${o}...HEAD`,{cwd:t}),p=i.split(`
`).map(u=>u.trim()).filter(u=>u.length>0),r=new Set,c=new Set;for(let u of p){let f=u.split(/\s+/);if(f[0].startsWith("D"))continue;let h=f[1];if(h&&h.endsWith(".cls")){let v=h.match(/\/classes\/([^/.]+)\.cls/);if(v){let $=v[1];$.toLowerCase().endsWith("test")?r.add($):c.add($)}}}for(let u of c)r.add(`${u}Test`);if(r.size===0){se.window.showInformationMessage("Ricwiz: No Apex Classes were modified in this branch.");return}let d=Array.from(r).map(u=>({label:`$(beaker) ${u}`,description:"Apex Test Class"})),a=await se.window.showQuickPick(d,{canPickMany:!0,title:"Select Test Classes to Run",placeHolder:"Select tests..."});if(!a||a.length===0)return;let m=`sf apex run test -n ${a.map(u=>u.label.replace("$(beaker) ","").trim()).join(",")} -r human -w 30`,l=se.window.createTerminal("Ricwiz: Smart Tests");l.show(),l.sendText(m)}catch(i){se.window.showErrorMessage(`Ricwiz: Error finding tests: ${i.message}`)}})}var M=k(require("vscode"));var ze=class{static isValidShellArg(e){return e?/^[a-zA-Z0-9\-_/.]+$/.test(e):!1}};async function At(t){let e=B();if(!e){M.window.showErrorMessage("Open a folder or workspace that is a Git repository.");return}let o=await S.initialize(e,{forcePrompt:!0});if(!o)return;let n=typeof t=="string"?t:void 0,i=await Q(e,{prefix:o.ticketPrefix,suggestedValue:n});if(!i){M.window.showErrorMessage("Branch creation cancelled: Ticket not provided.");return}let{ticketId:p}=i,r=o.environments,c="";if(o.branchPrefix){let f=await M.window.showInputBox({prompt:"Ricwiz: Branch Prefix (leave empty to not use a prefix)",placeHolder:"e.g. CRC-R19-",value:o.branchPrefix,ignoreFocusOut:!0});if(f===void 0){M.window.showInformationMessage("Branch creation cancelled.");return}c=f.trim()}let d=c?`${c}${p}`:p,a=[{label:`$(git-branch) Main Branch (${d})`,description:`Base: ${o.ticketSourceBranch}`,picked:!0,type:"main",branchName:d}];for(let f of r){let h=c?`${c}${p}-to-${f.name}`:`${p}-to-${f.name}`;a.push({label:`$(cloud) ${f.name} (${h})`,description:`Base: ${f.sourceBranch}`,picked:!0,type:"env",branchName:h,envConfig:f})}let s=await M.window.showQuickPick(a,{placeHolder:"Ricwiz: Select branches to create (check/uncheck as needed)",canPickMany:!0,ignoreFocusOut:!0});if(!s||s.length===0){M.window.showInformationMessage("Branch creation cancelled: No branches selected.");return}let m=s.some(f=>f.type==="main"),l=s.filter(f=>f.type==="env").map(f=>({env:f.envConfig,branchName:f.branchName})),u=o.ticketSourceBranch;if(m){let f=[];try{let{stdout:b}=await g('git branch --all --format="%(refname:short)"',{cwd:e});f=b.split(`
`).map(x=>x.trim()).filter(x=>x&&x!=="origin"),f=[...new Set(f)]}catch{}let h=M.window.createQuickPick();h.title=`Ricwiz: Base Source Branch for '${d}'`,h.placeholder="Confirm or change the source branch for this ticket";let v=f.find(b=>b.endsWith(`/${o.ticketSourceBranch}`))??o.ticketSourceBranch;h.value=v,h.ignoreFocusOut=!0;let $=()=>{let b=h.value.trim(),x=[];b&&x.push({label:b,description:"Use typed branch"}),x.push(...f.map(T=>({label:T}))),h.items=x};h.onDidChangeValue($),$();let w=await new Promise(b=>{h.onDidAccept(()=>{let x=h.selectedItems[0];b(x?x.label:h.value),h.hide()}),h.onDidHide(()=>b(void 0)),h.show()});if(!w){M.window.showInformationMessage("Branch creation cancelled.");return}u=w.trim()}if(m&&!ze.isValidShellArg(d)){M.window.showErrorMessage(`Invalid format for ticket ID: ${d}`);return}if(m&&!ze.isValidShellArg(u)){M.window.showErrorMessage(`Invalid format for ticketSourceBranch in settings: ${u}`);return}for(let f of l){if(!ze.isValidShellArg(f.env.name)){M.window.showErrorMessage(`Invalid format for environment name: ${f.env.name}`);return}if(!ze.isValidShellArg(f.env.sourceBranch)){M.window.showErrorMessage(`Invalid format for environment sourceBranch: ${f.env.sourceBranch}`);return}}try{await g("git status",{cwd:e})}catch{M.window.showErrorMessage("The opened folder does not appear to be a valid Git repository.");return}try{await M.window.withProgress({location:M.ProgressLocation.Notification,title:"Ricwiz: Creating Branches",cancellable:!1},async f=>{let h=[];f.report({message:"Checking remote status (git fetch)...",increment:10});try{await g("git fetch",{cwd:e})}catch{}try{if(m){if(f.report({message:`Creating main branch ${d}...`,increment:15}),await re(e,d))M.window.showInformationMessage(`Ricwiz: The branch ${d} already exists. Skipping creation...`),await g(`git checkout ${d}`,{cwd:e});else try{let $=o.getFetchRemote(u),w=o.getFetchBranch(u),b=o.buildUpstreamPath(u);await g(`git fetch ${$} ${w}`,{cwd:e}),await g(`git checkout -b ${d} ${b}`,{cwd:e}),h.push(d)}catch{try{await g(`git checkout -b ${d} ${u}`,{cwd:e}),h.push(d)}catch{throw new Error(`Could not create main branch '${d}' from '${u}'. Does the source branch exist?`)}}try{await g(`git config branch.${d}.ricwiz-source "${u}"`,{cwd:e}),o.profileName&&await g(`git config branch.${d}.ricwiz-profile "${o.profileName}"`,{cwd:e})}catch{}}if(l.length>0){let $=50/(l.length||1);for(let w of l){let b=w.branchName,x=w.env.sourceBranch;if(f.report({message:`Processing environment branch ${b}...`,increment:$}),!await re(e,b))try{let T=o.getFetchRemote(x),E=o.getFetchBranch(x),P=o.buildUpstreamPath(x);await g(`git fetch ${T} ${E}`,{cwd:e}),await g(`git checkout -b ${b} ${P}`,{cwd:e}),h.push(b)}catch{try{await g(`git checkout -b ${b} ${x}`,{cwd:e}),h.push(b)}catch{throw new Error(`Could not create environment branch '${b}' from '${x}'. Does the source branch exist?`)}}}}f.report({message:`Publishing branches to ${o.originRemote}...`,increment:15});for(let $ of h)try{await g(`git push -u ${o.originRemote} ${$}`,{cwd:e})}catch{M.window.showWarningMessage(`Ricwiz: Branch ${$} was created locally but could not be pushed to ${o.originRemote}.`)}let v=m?d:l[0]?.branchName||"";if(v){f.report({message:`Switching to ${v}...`,increment:10});try{await g(`git checkout ${v}`,{cwd:e})}catch{}}f.report({increment:100}),M.window.showInformationMessage("Ricwiz: All set! You can start working on your branches! \u{1F680}")}catch(v){if(M.window.showErrorMessage(`Ricwiz Branch Creation Failed: ${v.message}`),h.length>0){try{await g(`git checkout ${u}`,{cwd:e})}catch{}for(let $ of h)try{await g(`git branch -D ${$}`,{cwd:e})}catch{}M.window.showWarningMessage(`Ricwiz: Rolled back (deleted) ${h.length} branch(es) locally due to failure.`)}}})}catch(f){M.window.showErrorMessage(`Ricwiz general error: ${f.message}`)}}var U=k(require("vscode"));var be=k(require("vscode")),Ne=k(require("fs")),je=k(require("path"));var ct;function at(t){ct=t}async function Lt(t){ct&&await ct(t)}async function Be(t,e,o,n,i){n&&n.report({message:"CONFLICT! Resolve & click 'Commit & Continue' in Ricwiz panel."});let p=!1,r=!1;i&&i.onCancellationRequested(()=>{r=!0});let c=async()=>{try{let{stdout:s}=await g("git status --porcelain",{cwd:t});return s.split(`
`).filter(m=>{let l=m.substring(0,2);return["UD","DU","DD","AU","UA"].includes(l)}).map(m=>m.substring(3).trim())}catch{return[]}},d=async()=>{try{let s=l=>l==="UU"?"Both Modified":l==="UD"?"Deleted by them":l==="DU"?"Deleted by us":l==="DD"?"Both Deleted":l==="AA"?"Both Added":l==="AU"?"Added by us":l==="UA"?"Added by them":"Conflicted",{stdout:m}=await g("git status --porcelain",{cwd:t});return m.split(`
`).map(l=>l.trimEnd()).filter(l=>l.length>2).filter(l=>{let u=l.substring(0,2);return["UU","AA","UD","DU","AU","UA","DD"].includes(u)}).map(l=>{let u=l.substring(0,2);return{file:l.substring(3).trim(),state:s(u)}})}catch{return[]}},a=async()=>{if(p)return;let s=await c(),m=await d();ae&&ae.setConflictState({isConflict:!0,sourceStr:e,targetStr:o,deletionsCount:s.length,files:m})};for(at(async s=>{if(s==="abortDeploy")r=!0;else if(s==="resolveDeletions"){try{let l=(await c()).map(f=>({label:f})),u=await be.window.showQuickPick(l,{canPickMany:!0,placeHolder:"Select conflicted files to DELETE",title:"Ricwiz: Delete Conflicted Files"});if(u&&u.length>0){for(let f of u)try{await g(`git rm --force "${f.label}"`,{cwd:t})}catch{}be.window.showInformationMessage(`Ricwiz: Deleted ${u.length} conflicted file(s).`)}}catch(m){be.window.showErrorMessage(`Ricwiz: Error. (${m.message})`)}a()}else if(s==="commitAndContinue")try{let l=(await c()).filter(f=>Ne.existsSync(je.join(t,f)));if(l.length>0&&await be.window.showWarningMessage(`Wait! There are ${l.length} file(s) with deletion conflicts that are still on your disk.

If you commit now, you will KEEP them in the project.

Are you sure you want to KEEP them?`,{modal:!0},"Yes, KEEP them","No, let me DELETE them")!=="Yes, KEEP them"){a();return}let u=!1;try{let{stdout:f}=await g('git grep -E "^<<<<<<< "',{cwd:t});f.trim().length>0&&(u=!0)}catch{}if(u){be.window.showErrorMessage("Ricwiz: You still have unresolved conflict markers (<<<<<<<) in your files. Please resolve them first!"),a();return}await g("git add .",{cwd:t}),await g("git commit --no-edit",{cwd:t})}catch(m){be.window.showErrorMessage(`Ricwiz: Could not commit automatically. (${m.message})`),a()}}),a();;){if(r){p=!0,at(void 0),ae?.setConflictState(null);try{await g("git merge --abort",{cwd:t})}catch{}return!1}try{let{stdout:s}=await g("git status --porcelain",{cwd:t}),m=s.split(`
`).some(v=>{let $=v.substring(0,2);return["UU","AA","UD","DU","AU","UA","DD"].includes($)}),l=je.join(t,".git","MERGE_HEAD"),u=je.join(t,".git","REBASE_HEAD"),f=je.join(t,".git","CHERRY_PICK_HEAD");if(!(m||Ne.existsSync(l)||Ne.existsSync(u)||Ne.existsSync(f)))return p=!0,at(void 0),ae?.setConflictState(null),be.window.showInformationMessage("Ricwiz: Changes committed!"),!0}catch{}await new Promise(s=>setTimeout(s,2e3))}}var et=k(require("https")),It=k(require("vscode"));async function mt(){let t=await Ce();return!!(t&&t.trim())}async function _o(t,e){let o=It.workspace.getConfiguration("ricwiz"),n=(await Ce())?.trim();if(!n)throw new Error("No GitLab token");let i=e?e.getConfig("gitlabUrlOverride",""):o.get("gitlabUrlOverride",""),p=[];if(i&&i.trim()!=="")p.push(i.trim());else try{let{stdout:c}=await g("git remote",{cwd:t}),d=c.split(`
`).map(s=>s.trim()).filter(s=>s),a=[];e&&e.upstreamRemote&&d.includes(e.upstreamRemote)&&a.push(e.upstreamRemote),e&&e.originRemote&&e.originRemote!==e.upstreamRemote&&d.includes(e.originRemote)&&a.push(e.originRemote),d.includes("upstream")&&!a.includes("upstream")&&a.push("upstream"),d.includes("origin")&&!a.includes("origin")&&a.push("origin"),a.length===0&&d.length>0&&a.push(...d);for(let s of a)try{let{stdout:m}=await g(`git remote get-url ${s}`,{cwd:t}),l=m.trim();l.endsWith(".git")&&(l=l.slice(0,-4)),l.startsWith("git@")&&(l=l.replace("git@","").replace(":","/"),l=`https://${l}`),p.push(l)}catch(m){R.appendLine(`[GitLab API] Error getting remote URL for ${s}: ${m.message}`)}}catch(c){R.appendLine(`[GitLab API] Error getting remotes: ${c.message}`)}if(p.length===0)throw R.appendLine("[GitLab API] No candidate URLs found in getGitlabTargets!"),new Error("Could not get any remote origin URL.");return p.map(c=>{let d=new URL(c),a=`${d.protocol}//${d.host}`,s=d.pathname;s.startsWith("/")&&(s=s.substring(1)),s.endsWith("/")&&(s=s.slice(0,-1)),s.endsWith(".git")&&(s=s.slice(0,-4));let m=encodeURIComponent(s);return{baseUrl:a,token:n,projectPath:m}})}var Qo=new et.Agent({keepAlive:!0,maxSockets:10});async function dt(t,e,o,n){let i=new URL(`${t}${n}`);return R.appendLine(`[GitLab API] ${o} ${i.toString()}`),new Promise((p,r)=>{let c=et.request(i,{method:o,timeout:5e3,agent:Qo,headers:{"PRIVATE-TOKEN":e,Accept:"application/json"}},d=>{let a="";d.on("data",s=>a+=s),d.on("end",()=>{if(R.appendLine(`[GitLab API] Response Code: ${d.statusCode}`),d.statusCode&&d.statusCode>=400)return R.appendLine(`[GitLab API] Error Data: ${a}`),r(new Error(`GitLab API error: ${d.statusCode}`));if(!a)return p({});try{let s=JSON.parse(a);Array.isArray(s)?R.appendLine(`[GitLab API] Returned array with ${s.length} items`):s&&typeof s=="object"&&R.appendLine(`[GitLab API] Returned object with id ${s.id||s.iid||"unknown"}`),p(s)}catch(s){R.appendLine(`[GitLab API] Parse Error: ${s.message}`),r(s)}})});c.on("timeout",()=>{c.destroy(),r(new Error("GitLab request timed out"))}),c.on("error",d=>{R.appendLine(`[GitLab API] Request Failed: ${d.message}`),r(d)}),c.end()})}var lt=new Map,Yo=30*1e3;async function pt(t,e,o,n){R.appendLine(`[GitLab API] fetchMergeRequestStatus called for source: ${e}, target: ${o||"any"}`);let i=`${t}:${e}:${o||"any"}`,p=lt.get(i);if(p&&Date.now()-p.timestamp<Yo)return p.data;try{let r=await _o(t,n),c=null,d=-1;for(let a of r)try{let s=`/api/v4/projects/${a.projectPath}/merge_requests?source_branch=${encodeURIComponent(e)}&order_by=updated_at&sort=desc`;o&&(s+=`&target_branch=${encodeURIComponent(o)}`);let m=await dt(a.baseUrl,a.token,"GET",s);if(m&&m.length>0){let l=m[0];try{let v=await dt(a.baseUrl,a.token,"GET",`/api/v4/projects/${a.projectPath}/merge_requests/${l.iid}`);v&&(l=v)}catch{}let u="none";if(l.head_pipeline&&l.head_pipeline.status){let v=l.head_pipeline.status;v==="success"||v==="failed"||v==="canceled"||v==="skipped"?u=v:u="running"}let f={isMerged:l.state==="merged",isOpen:l.state==="opened",pipelineStatus:u,webUrl:l.web_url,projectPath:a.projectPath,pipelineId:l.head_pipeline?l.head_pipeline.id:void 0},h=0;f.isOpen?h=2:f.isMerged&&(h=1),h>d&&(c=f,d=h)}}catch(s){R.appendLine(`[GitLab API] Error inside target loop: ${s.message}`)}if(c)return lt.set(i,{data:c,timestamp:Date.now()}),c;for(let a of r)try{let s=`/api/v4/projects/${a.projectPath}/pipelines?ref=${encodeURIComponent(e)}&order_by=updated_at&sort=desc`,m=await dt(a.baseUrl,a.token,"GET",s);if(m&&m.length>0){let l=m[0],u="none";if(l.status){let h=l.status;h==="success"||h==="failed"||h==="canceled"||h==="skipped"?u=h:u="running"}let f={isMerged:!1,isOpen:!1,pipelineStatus:u,webUrl:l.web_url,projectPath:a.projectPath,pipelineId:l.id};return lt.set(i,{data:f,timestamp:Date.now()}),f}}catch{}return null}catch(r){return R.appendLine(`[GitLab API] Failed to fetch MR status: ${r.message}`),null}}function Ft(t,e){return e.find(o=>t.endsWith(`-to-${o.name}`))}async function Pe(t,e,o,n,i){let p=await mt(),r=e.map(async c=>{let d=Ft(c,n);if(p){let a=d?d.sourceBranch:void 0,s=await pt(t,c,a,i);if(s)return{name:c,isMerged:s.isMerged,pipelineStatus:s.pipelineStatus,mrUrl:s.webUrl,projectPath:s.projectPath,pipelineId:s.pipelineId}}else R.appendLine(`[GitLab API] Skipping MR check for ${c} because hasGitlabToken() is false`);return{name:c,isMerged:!1,pipelineStatus:"none"}});return await Promise.all(r)}async function Ut(t,e,o,n){let i=Ft(e,o);if(!i)return!1;if(await mt()){let p=await pt(t,e,i.sourceBranch,n);if(p)return p.isMerged}else R.appendLine(`[GitLab API] Skipping MR check for current branch ${e} because hasGitlabToken() is false`);return!1}async function Ot(t,e=10){try{let{stdout:o}=await g(`git log --oneline -${e} --format="%h|||%s|||%ar"`,{cwd:t});return o.split(`
`).filter(n=>n.trim()).map(n=>{let i=n.split("|||");return{hash:i[0]||"",message:i.length>=3?i.slice(1,-1).join("|||"):i[1]||"",timeAgo:i.length>=3?i[i.length-1]:""}})}catch{return[]}}async function Nt(t,e=3){try{let{stdout:o}=await g('git for-each-ref --sort=-committerdate --format="%(refname:short)" refs/heads/',{cwd:t}),n=o.split(`
`).map(p=>p.trim()).filter(p=>p),i=/^[A-Z]+-\d+$/i;return n.filter(p=>i.test(p)).slice(0,e)}catch{return[]}}async function Se(t,e,o){let{stdout:n}=await g(`git branch --all --list "*${e}*"`,{cwd:t}),i=new Set,p=new RegExp(`${e}(?!\\d)`,"i");return n.split(`
`).forEach(r=>{let c=r.replace("*","").trim();if(c){if(c.startsWith("remotes/")){let d=c.split("/");d.length>2&&(c=d.slice(2).join("/"))}c&&c!==o&&!c.includes("HEAD")&&p.test(c)&&i.add(c)}}),Array.from(i)}async function ce(t,e,o){try{let{stdout:n}=await g(`git branch --all --list "*${e}*"`,{cwd:t}),i=new RegExp(`${e}(?!\\d)`,"i"),p=n.split(`
`).map(c=>c.replace("*","").trim().replace(/^remotes\/[^\/]+\//,"")).filter(c=>c&&!c.includes("HEAD")&&i.test(c)),r=Array.from(new Set(p));if(o){let c=`-to-${o}`,d=r.find(a=>a.endsWith(c));return d||`${e}${c}`}else{let c=r.find(d=>!d.includes("-to-"));return c||e}}catch{return o?`${e}-to-${o}`:e}}async function jt(){let t=B();if(!t){U.window.showErrorMessage("Ricwiz: Open a folder or workspace that is a Git repository.");return}try{await g("git status",{cwd:t})}catch{U.window.showErrorMessage("Ricwiz: The opened folder does not appear to be a valid Git repository.");return}let e=await S.initialize(t);if(!e)return;let o=e.environments,n=await Q(t,{prefix:e.ticketPrefix});if(!n){U.window.showErrorMessage("Operation cancelled: Ticket not provided.");return}let{ticketId:i,currentBranch:p}=n;try{await g("git fetch --all",{cwd:t})}catch{}let r=await ce(t,i);if(!await re(t,r)){U.window.showErrorMessage(`Ricwiz: Main branch '${r}' does not exist! Prepare deploy is only available when a main ticket branch is used.`);return}let c=[];for(let l of o){let u=await ce(t,i,l.name);await re(t,u)&&c.push({env:l,branchName:u})}let d=c.length===0,a="";if(d){let l="";try{let{stdout:f}=await g(`git config branch.${r}.ricwiz-source`,{cwd:t});l=f.trim()}catch{}if(!l&&r.includes(i)&&r!==i){let f=r.split(i)[0].replace(/[-_]+$/,"");f&&(l=f)}l||(l=e.ticketSourceBranch||"main");let u=await U.window.showInputBox({prompt:`Ricwiz: Confirm or enter the Release branch in '${e.originRemote}' to merge into '${r}'`,placeHolder:"e.g. CRC-R19, main, release/v5.0",value:l,ignoreFocusOut:!0});if(u===void 0||!u.trim()){U.window.showInformationMessage("Ricwiz: Prepare deploy cancelled.");return}a=u.trim();try{await g(`git config branch.${r}.ricwiz-source "${a}"`,{cwd:t})}catch{}}let s=e.getConfig("defaultReviewers",""),m="";try{let{stdout:l}=await g(`git config branch.${r}.ricwiz-reviewers`,{cwd:t});m=l.trim()}catch{}if(s.trim()){let l=await U.window.showInputBox({prompt:"Ricwiz: Reviewers for this deploy (optional, comma-separated)",placeHolder:"e.g. @joao, 123456",value:m||s,ignoreFocusOut:!0});if(l===void 0)return;try{l.trim()?await g(`git config branch.${r}.ricwiz-reviewers "${l.trim()}"`,{cwd:t}):m&&await g(`git config --unset branch.${r}.ricwiz-reviewers`,{cwd:t})}catch{}}await U.window.withProgress({location:U.ProgressLocation.Notification,title:"Ricwiz: Preparing Deploy",cancellable:!0},async(l,u)=>{let f=0,h=p,v=!1;u.onCancellationRequested(()=>{v=!0});let $=async(w,b)=>{try{await g(`git merge ${w}`,{cwd:t})}catch(x){let T=!1;try{let{stdout:P}=await g("git ls-files -u",{cwd:t});P.trim().length>0&&(T=!0)}catch{}let E=((x.stdout||"")+(x.stderr||"")+(x.message||"")).toLowerCase();if(T||E.includes("conflict")||E.includes("conflit")){if(!await Be(t,w,b,l,u))throw v=!0,new Error("Deploy aborted by user.")}else throw x}};if(d)try{l.report({message:`Fetching ${a} from ${e.originRemote}...`,increment:15}),await g(`git fetch ${e.originRemote} ${a}`,{cwd:t}),l.report({message:`Switching to ${r}...`,increment:15}),await g(`git checkout ${r}`,{cwd:t});try{await g(`git pull ${e.originRemote} ${r}`,{cwd:t})}catch{}if(l.report({message:`Merging ${e.originRemote}/${a} into ${r}...`,increment:35}),await $(`${e.originRemote}/${a}`,r),v)return;l.report({message:`Pushing ${r} to ${e.originRemote}...`,increment:25}),await g(`git push ${e.originRemote} ${r}`,{cwd:t}),l.report({message:"Finishing up...",increment:10}),U.window.showInformationMessage(`Ricwiz: Release branch '${a}' merged into '${r}' and pushed to ${e.originRemote}! \u{1F680}`)}catch(w){w.message?.includes("aborted")?U.window.showInformationMessage("Ricwiz: Deploy cancelled."):U.window.showErrorMessage(`Ricwiz: Failed to prepare release ticket ${r}. Detail: ${w.message}`)}else{l.report({message:"Syncing remote information...",increment:10});try{let b=10/(c.length||1);for(let x of c)try{if(v)throw new Error("Aborted");l.report({message:`Fetching ${x.env.sourceBranch}...`,increment:b});let T=e.getFetchRemote(x.env.sourceBranch),E=e.getFetchBranch(x.env.sourceBranch);await g(`git fetch ${T} ${E}`,{cwd:t})}catch{}}catch{}let w=60/(c.length||1);for(let b of c){if(v)break;let x=b.branchName,T=b.env.sourceBranch;try{l.report({message:`Processing ${x}...`,increment:w/4}),await g(`git checkout ${x}`,{cwd:t});try{await g(`git pull ${e.originRemote} ${x}`,{cwd:t})}catch{}l.report({message:`Merging ${T} into ${x}...`,increment:w/4});let E=e.getFetchRemote(T),P=e.getFetchBranch(T),O=e.buildUpstreamPath(T);if(await g(`git fetch ${E} ${P}`,{cwd:t}),await $(O,x),l.report({message:`Merging ${r} into ${x}...`,increment:w/4}),await $(r,x),v)break;l.report({message:`Pushing ${x}...`,increment:w/4}),await g(`git push ${e.originRemote} ${x}`,{cwd:t}),f++}catch(E){E.message.includes("aborted")?U.window.showInformationMessage("Ricwiz: Deploy cancelled."):U.window.showErrorMessage(`Ricwiz: Failed to process branch ${x}. Detail: ${E.message}`);return}}if(!v){l.report({message:"Finishing up...",increment:10});let b=h;try{await g(`git show-ref --verify --quiet refs/heads/${r}`,{cwd:t}),b=r}catch{}try{let x=await F(t);b&&b!==x?(await g(`git checkout ${b}`,{cwd:t}),U.window.showInformationMessage(`Ricwiz: Operation complete. Back on branch ${b}.`)):U.window.showInformationMessage("Ricwiz: Operation complete.")}catch{U.window.showInformationMessage("Ricwiz: Operation complete.")}}}})}var te=k(require("vscode"));async function Jt(t=!1){let e=B();if(!e)return;let o=await S.initialize(e);if(!o)return;let n=await Q(e,{prefix:o.ticketPrefix,prompt:"Enter the full ticket ID for the Merge Requests (e.g., SFPSCA-1234) or just the number"});if(!n)return;let{ticketId:i}=n,p=o.getConfig("gitlabUrlOverride",""),r="";if(p&&p.trim()!=="")r=p.trim().replace(/\/+$/,"");else{let s="";try{let m=o.originRemote||"origin",{stdout:l}=await g(`git remote get-url ${m}`,{cwd:e});s=l.trim()}catch{te.window.showErrorMessage("Ricwiz: Could not get the remote origin URL. Please configure the URL manually in the extension settings.");return}r=s,r.endsWith(".git")&&(r=r.slice(0,-4)),r.startsWith("git@")?(r=r.replace("git@","").replace(":","/"),r=`https://${r}`):r.startsWith("ssh://git@")&&(r=r.replace("ssh://git@","https://"))}let c=[],d=await ce(e,i),a=[];for(let s of o.environments){let m=await ce(e,i,s.name);await re(e,m)&&a.push({envName:s.name,source:m,target:s.sourceBranch})}if(a.length===0){let s="";try{if(d){let{stdout:u}=await g(`git config branch.${d}.ricwiz-source`,{cwd:e});u.trim()&&(s=u.trim())}}catch{}if(!s&&d.includes(i)&&d!==i){let u=d.split(i)[0].replace(/[-_]+$/,"");u&&(s=u)}s||(s=o.ticketSourceBranch||"main");let m=await te.window.showInputBox({prompt:`Ricwiz: Confirm or enter the Target Release branch in GitLab for '${d}'`,placeHolder:"e.g. CRC-R19, main, release/v5.0",value:s,ignoreFocusOut:!0});if(m===void 0||!m.trim()){te.window.showInformationMessage("Ricwiz: Merge request creation cancelled.");return}let l=m.trim();try{await g(`git config branch.${d}.ricwiz-source "${l}"`,{cwd:e})}catch{}c.push({source:d,target:l})}else for(let s of a)c.push({source:s.source,target:s.target});for(let s of c){let m=`${r}/-/merge_requests/new?merge_request[source_branch]=${encodeURIComponent(s.source)}&merge_request[target_branch]=${encodeURIComponent(s.target)}`;t?te.commands.executeCommand("simpleBrowser.show",m):te.env.openExternal(te.Uri.parse(m))}te.window.showInformationMessage(`Ricwiz: Opening ${c.length} Merge Request(s) in ${t?"VS Code browser":"external browser"}!`)}async function Wt(){return Jt(!1)}async function Gt(){return Jt(!0)}var oe=k(require("vscode"));async function Ht(t=!1){let e=B();if(!e)return;let o=oe.workspace.getConfiguration("ricwiz"),n=o.get("jiraUrl","");if(!n||n.trim()===""){oe.window.showErrorMessage("Ricwiz: Jira URL is not configured. Please set it in the extension settings (e.g., https://jira.company.com/browse/).");return}let i=await F(e),p=o.get("ticketPrefix","SFPSCA-"),r=me(i,p),d=pe(i,r,!0);if(d)d=st(d,r);else{let s=await Q(e,{prompt:"Ricwiz could not detect the ticket from the branch name. Enter Jira ticket ID (e.g. SFPSCA-1234)",handleToSuffix:!0});if(!s)return;d=s.ticketId}let a=n.trim();a.endsWith("/")||(a+="/"),a+=d,t?oe.commands.executeCommand("simpleBrowser.show",a):oe.env.openExternal(oe.Uri.parse(a)),oe.window.showInformationMessage(`Ricwiz: Opening Jira Ticket ${d} in ${t?"VS Code":"browser"}!`)}async function Vt(){return Ht(!1)}async function qt(){return Ht(!0)}var Y=k(require("vscode"));var _t=k(require("https")),Qt=k(require("vscode"));async function Yt(){j("getJiraAuthAndBaseUrl: Starting...");let t=Qt.workspace.getConfiguration("ricwiz"),e=t.get("jiraUrl",""),o=t.get("jiraEmail","")?.trim();j("getJiraAuthAndBaseUrl: Calling getJiraToken()...");let n=(await Ye())?.trim();if(!n&&process.env.RICWIZ_JIRA_TOKEN&&(j("getJiraAuthAndBaseUrl: Token not found in secretStorage, using process.env"),n=process.env.RICWIZ_JIRA_TOKEN.trim()),!e||!n)throw j(`getJiraAuthAndBaseUrl: FAILED. URL: "${e}", hasToken: ${!!n}`),new Error(`[v5.2.0] Jira API Token is not securely configured. URL: "${e}", hasToken: ${!!n}`);let i=e;i.includes("/browse")&&(i=i.split("/browse")[0]),i.endsWith("/")&&(i=i.slice(0,-1));let p=o?`Basic ${Buffer.from(`${o}:${n}`).toString("base64")}`:`Bearer ${n}`;return{baseUrl:i,headerAuth:p}}async function Te(t,e,o){let{baseUrl:n,headerAuth:i}=await Yt(),p=new URL(`${n}${e}`);return new Promise((r,c)=>{let d=_t.request(p,{method:t,headers:{Authorization:i,Accept:"application/json",...o?{"Content-Type":"application/json"}:{}}},a=>{let s="";a.on("data",m=>s+=m),a.on("end",()=>{if(a.statusCode===401||a.statusCode===403)return c(new Error(`Authentication failed (HTTP ${a.statusCode}). Please check your Jira settings.`));if(a.statusCode&&a.statusCode>=400){let m="";try{let l=JSON.parse(s);l.errorMessages&&l.errorMessages.length>0&&(m=l.errorMessages.join(", "))}catch{}return a.statusCode===404||a.statusCode===410?c(new Error(`Ticket not found or deleted (HTTP ${a.statusCode}). ${m}`)):c(new Error(`Jira API returned HTTP status ${a.statusCode}. ${m}`))}if(!s)return r({});try{let m=JSON.parse(s);r(m)}catch{c(new Error("Failed to parse Jira response."))}})});d.on("error",a=>c(new Error(`Network error: ${a.message}`))),o&&d.write(JSON.stringify(o)),d.end()})}async function Ie(t){let{baseUrl:e}=await Yt(),o=await Te("GET",`/rest/api/2/issue/${t}`);return o&&o.fields?{summary:o.fields.summary||"",description:o.fields.description||"No description provided.",status:o.fields.status?.name||"Unknown",url:`${e}/browse/${t}`}:null}async function Kt(t){let e=await Te("GET",`/rest/api/2/issue/${t}/transitions`);return e&&e.transitions?e.transitions.map(o=>({id:o.id,name:o.name})):[]}async function Zt(t,e){await Te("POST",`/rest/api/2/issue/${t}/transitions`,{transition:{id:e}})}async function Xt(t,e){await Te("POST",`/rest/api/2/issue/${t}/comment`,{body:e})}async function eo(t,e){await Te("PUT",`/rest/api/2/issue/${t}`,{update:{labels:[{add:e}]}})}async function to(t){let e=await Te("POST","/rest/api/3/search/jql",{jql:t,maxResults:50,fields:["summary","status","assignee"]});return e&&e.issues?e.issues.map(o=>({key:o.key,summary:o.fields?.summary||"No Title",status:o.fields?.status?.name||"Unknown",assignee:o.fields?.assignee?.displayName||"Unassigned"})):[]}function oo(t){if(!t||typeof t!="object")return"";let e=t;if(e.type==="text")return typeof e.text=="string"?e.text:"";let o="";if(Array.isArray(e.content))for(let n of e.content){let i=oo(n);i&&(o+=i+" ")}return o.trim()}async function tt(t){if(t.length===0)return[];let e=`issueKey IN (${t.join(",")})`,o=await Te("POST","/rest/api/3/search/jql",{jql:e,maxResults:15,fields:["summary","description","parent","subtasks","issuelinks","issuetype","status","assignee","priority","labels","fixVersions"]});return!o||!o.issues?[]:o.issues.map(n=>{let i=n.fields?.parent,p=i?{key:i.key,title:i.fields?.summary||""}:void 0,r=(n.fields?.subtasks??[]).map(a=>({key:a.key,title:a.fields?.summary||""})),c=(n.fields?.issuelinks??[]).map(a=>a.outwardIssue?{type:a.type?.outward||"relates to",issue:{key:a.outwardIssue.key,title:a.outwardIssue.fields?.summary||""}}:{type:a.type?.inward||"relates to",issue:{key:a.inwardIssue.key,title:a.inwardIssue.fields?.summary||""}}),d=(n.fields?.fixVersions??[]).map(a=>a.name).filter(Boolean);return{key:n.key,title:n.fields?.summary||"",type:n.fields?.issuetype?.name||"",status:n.fields?.status?.name||"",assignee:n.fields?.assignee?.displayName||"",priority:n.fields?.priority?.name||"",labels:n.fields?.labels||[],fixVersions:d,description:oo(n.fields?.description),parent:p,subtasks:r,issueLinks:c}})}async function io(t){let e=B();if(e)try{let o=await S.initialize(e);if(!o)return;let n=await F(e),i=me(n,o.ticketPrefix),p=pe(n,i,!0);if(p||(p=n.split("-to-")[0]),!p){Y.window.showErrorMessage("Ricwiz: You are not currently on a valid ticket branch.");return}await Y.window.withProgress({location:Y.ProgressLocation.Notification,title:`Fetching details for ${p}...`,cancellable:!1},async()=>{let r=await Ie(p);if(r){let c=[];try{let d=o.environments||Y.workspace.getConfiguration("ricwiz").get("environments",[{name:"Qual",sourceBranch:"quality"},{name:"Val",sourceBranch:"validation"},{name:"Prod",sourceBranch:"main"}]),a=await Se(e,p,"");c=await Pe(e,a,p,d,o)}catch{}t.setJiraData({ticketId:p,relatedBranches:c,...r}),t.setPage("jira")}else Y.window.showErrorMessage("Ricwiz: No data found for this ticket.")})}catch(o){o.message&&o.message.includes("securely configured")?await Y.window.showErrorMessage(o.message,"Set Token Now")==="Set Token Now"&&Y.commands.executeCommand("ricwiz.setJiraToken"):Y.window.showErrorMessage(`Ricwiz Jira Error: ${o.message}`)}}var ue=k(require("vscode"));var De=0;async function no(t,e){let o=ue.workspace.getConfiguration("ricwiz"),n=o.get("jiraDashboards",[]);if(e!==void 0&&(De=e),!n||n.length===0){t.setDashboardData({queries:[],selectedIndex:0,results:[],error:"No queries defined in settings. Go to Settings > Ricwiz > Jira Dashboards."}),t.setPage("dashboard");return}De>=n.length&&(De=0);let i=n[De];t.setDashboardData({queries:n,selectedIndex:De,results:[],error:"\u23F3 Loading tickets..."}),t.setPage("dashboard");try{let p=await to(i.jql),r=B(),c=[],d=t.getDashboardShowBranches();if(r)try{let{stdout:s}=await g("git branch",{cwd:r});c=s.split(`
`).map(m=>m.replace("*","").trim()).filter(m=>m)}catch{}let a=[];if(d&&r)try{let s=await S.initialize(r,{skipPrompt:!0}),m=s?.environments||o.get("environments",[{name:"Qual",sourceBranch:"quality"},{name:"Val",sourceBranch:"validation"},{name:"Prod",sourceBranch:"main"}]);a=await Promise.all(p.map(async l=>{let u=await Se(r,l.key,""),f=await Pe(r,u,l.key,m,s);return{...l,detailedBranches:f}}))}catch{a=p}else a=p.map(s=>{let m=c.find(l=>l.includes(s.key));return{...s,branch:m||null}});t.setDashboardData({queries:n,selectedIndex:De,results:a,error:null}),t.setPage("dashboard")}catch(p){let r=p.message;r&&(r.includes("ENOTFOUND")||r.includes("network"))&&(r="No Internet or Invalid URL"),t.setDashboardData({queries:n,selectedIndex:De,results:[],error:r}),t.setPage("dashboard")}}async function ro(t,e){await ue.window.withProgress({location:ue.ProgressLocation.Notification,title:`Fetching details for ${e}...`,cancellable:!1},async()=>{try{let o=await Ie(e);if(o){let n=[],i=B();if(i)try{let p=await S.initialize(i,{skipPrompt:!0}),r=p?.environments||ue.workspace.getConfiguration("ricwiz").get("environments",[{name:"Qual",sourceBranch:"quality"},{name:"Val",sourceBranch:"validation"},{name:"Prod",sourceBranch:"main"}]),c=await Se(i,e,"");n=await Pe(i,c,e,r,p)}catch{}t.setJiraData({ticketId:e,relatedBranches:n,...o}),t.setPage("jira")}else ue.window.showErrorMessage(`Ricwiz: No data found for ticket ${e}.`)}catch(o){ue.window.showErrorMessage(`Ricwiz Jira Error: ${o.message}`)}})}var D=k(require("vscode"));async function ut(){let t=B();if(!t)return;let e=await S.initialize(t,{forcePrompt:!1});if(!e)return;let o=await F(t);if(!o)return;let n=me(o,e.ticketPrefix),i=pe(o,n,!0);return i||o.split("-to-")[0]}function gt(t){t.message&&t.message.includes("securely configured")?D.window.showErrorMessage(t.message,"Set Token Now").then(e=>{e==="Set Token Now"&&D.commands.executeCommand("ricwiz.setJiraToken")}):D.window.showErrorMessage(`Ricwiz Jira Error: ${t.message}`)}async function so(){try{let t=await ut();if(!t){D.window.showErrorMessage("Ricwiz: You are not on a valid ticket branch.");return}let e=await D.window.withProgress({location:D.ProgressLocation.Notification,title:`Fetching available status for ${t}...`,cancellable:!1},()=>Kt(t));if(!e||e.length===0){D.window.showInformationMessage(`Ricwiz: No transitions available for ${t}.`);return}let o=e.map(i=>({label:i.name,id:i.id})),n=await D.window.showQuickPick(o,{placeHolder:`Select new status for ${t}`,ignoreFocusOut:!0});n&&(await D.window.withProgress({location:D.ProgressLocation.Notification,title:`Updating status to ${n.label}...`,cancellable:!1},()=>Zt(t,n.id)),D.window.showInformationMessage(`Ricwiz: Status for ${t} updated to ${n.label}.`))}catch(t){gt(t)}}async function ao(){try{let t=await ut();if(!t){D.window.showErrorMessage("Ricwiz: You are not on a valid ticket branch.");return}let e=await D.window.showInputBox({prompt:`Add comment to ${t}`,placeHolder:"Type your comment here...",ignoreFocusOut:!0});e&&(await D.window.withProgress({location:D.ProgressLocation.Notification,title:`Adding comment to ${t}...`,cancellable:!1},()=>Xt(t,e)),D.window.showInformationMessage(`Ricwiz: Comment added to ${t}.`))}catch(t){gt(t)}}async function co(){try{let t=await ut();if(!t){D.window.showErrorMessage("Ricwiz: You are not on a valid ticket branch.");return}let e=await D.window.showInputBox({prompt:`Add a label to ${t}`,placeHolder:"e.g. Needs-Review, Bug, High-Priority",ignoreFocusOut:!0});e&&e.trim()&&(await D.window.withProgress({location:D.ProgressLocation.Notification,title:`Adding label to ${t}...`,cancellable:!1},()=>eo(t,e.trim())),D.window.showInformationMessage(`Ricwiz: Label '${e.trim()}' added to ${t}.`))}catch(t){gt(t)}}async function lo(){let t=await D.window.showInputBox({prompt:"Enter your Jira API Token (or Personal Access Token). It will be stored in your global VS Code settings.",password:!0,ignoreFocusOut:!0});if(t)try{await Bt(t.trim()),D.window.showInformationMessage("Ricwiz: Jira API Token securely stored!")}catch(e){D.window.showErrorMessage(`Ricwiz: Failed to store token: ${e.message}`)}}var H=k(require("vscode")),mo=k(require("https"));async function po(){let t=await H.window.showInputBox({prompt:"Enter your GitLab Personal Access Token",placeHolder:"glpat-xxxxxxxxxxxxxxxxxxxx",ignoreFocusOut:!0,password:!0});if(t&&t.trim()){let e=t.trim();await H.window.withProgress({location:H.ProgressLocation.Notification,title:"Ricwiz: Validating GitLab Token...",cancellable:!1},async()=>{try{let n=H.workspace.getConfiguration("ricwiz").get("gitlabUrlOverride","").trim();if(!n&&H.workspace.workspaceFolders)try{let c=H.workspace.workspaceFolders[0].uri.fsPath,{stdout:d}=await g("git remote get-url origin",{cwd:c}),a=d.trim();a.startsWith("git@")&&(a=`https://${a.replace("git@","").replace(":","/")}`),a.endsWith(".git")&&(a=a.slice(0,-4)),n=a}catch{}n||(n="https://gitlab.com");let i=new URL(n),p=`${i.protocol}//${i.host}`,r=await new Promise((c,d)=>{let a=mo.request(new URL(`${p}/api/v4/user`),{method:"GET",timeout:5e3,headers:{"PRIVATE-TOKEN":e,Accept:"application/json"}},s=>{if(s.statusCode>=400)return d(new Error(`Status ${s.statusCode}`));let m="";s.on("data",l=>m+=l),s.on("end",()=>c(JSON.parse(m||"{}")))});a.on("error",d),a.on("timeout",()=>{a.destroy(),d(new Error("Timeout"))}),a.end()});await Pt(e),H.window.showInformationMessage(`Ricwiz: \u2705 GitLab API Token saved and validated successfully for ${r.username||"user"}!`),H.commands.executeCommand("ricwiz.manualRefresh")}catch(o){H.window.showErrorMessage(`Ricwiz: \u274C Invalid token or cannot reach GitLab (${o.message}). Please check the token and try again.`)}})}}var ge=k(require("vscode"));async function uo(){let t=B();if(!t){ge.window.showErrorMessage("Ricwiz: Open a folder or workspace that is a Git repository.");return}let e=await S.initialize(t);if(!e)return;let o=await Q(t,{prefix:e.ticketPrefix,prompt:"Enter the full ticket ID to sync all branches for (e.g., SCPSCA-1234) or just the number"});if(!o)return;let{ticketId:n,currentBranch:i}=o;await ge.window.withProgress({location:ge.ProgressLocation.Notification,title:`Ricwiz: Syncing all branches for ${n}...`,cancellable:!1},async p=>{try{p.report({message:"Fetching from remote..."});try{await g("git fetch --all",{cwd:t})}catch{}let{stdout:r}=await g(`git branch --list "*${n}*"`,{cwd:t}),c=new RegExp(`${n}(?!\\d)`,"i"),d=r.split(`
`).map(m=>m.replace("*","").trim()).filter(m=>m.length>0&&c.test(m));if(d.length===0){ge.window.showWarningMessage(`Ricwiz: No local branches found for ${n}.`);return}let a=0,s=0;for(let m of d)if(p.report({message:`Syncing ${m}...`}),m===i)try{await g(`git pull ${e.originRemote} ${m}`,{cwd:t}),a++}catch(l){let u=!1;try{let{stdout:h}=await g("git ls-files -u",{cwd:t});h.trim().length>0&&(u=!0)}catch{}let f=((l.stdout||"")+(l.stderr||"")+(l.message||"")).toLowerCase();(u||f.includes("conflict")||f.includes("conflit"))&&await Be(t,`${e.originRemote}/${m}`,m,p)?a++:s++}else try{await g(`git fetch ${e.originRemote} ${m}:${m}`,{cwd:t}),a++}catch{try{await g(`git checkout ${m}`,{cwd:t});try{await g(`git pull ${e.originRemote} ${m}`,{cwd:t}),a++}catch(u){let f=!1;try{let{stdout:v}=await g("git ls-files -u",{cwd:t});v.trim().length>0&&(f=!0)}catch{}let h=((u.stdout||"")+(u.stderr||"")+(u.message||"")).toLowerCase();(f||h.includes("conflict")||h.includes("conflit"))&&await Be(t,`${e.originRemote}/${m}`,m,p)?a++:s++}await g(`git checkout ${i}`,{cwd:t})}catch{try{await g(`git checkout ${i}`,{cwd:t})}catch{}s++}}s>0?ge.window.showWarningMessage(`Ricwiz: Synced ${a}/${d.length} branches. ${s} branch(es) could not be synced (possible conflicts or diverged history).`):ge.window.showInformationMessage(`Ricwiz: \u{1F504} All ${a} branches for ${n} are up to date!`)}catch(r){ge.window.showErrorMessage(`Ricwiz: Sync failed: ${r.message}`)}})}var fe=k(require("vscode"));async function go(){let t=B();if(!t){fe.window.showErrorMessage("Ricwiz: Open a folder or workspace that is a Git repository.");return}try{await g("git status",{cwd:t})}catch{fe.window.showErrorMessage("Ricwiz: The opened folder does not appear to be a valid Git repository.");return}let e=await S.initialize(t);if(!e)return;let o=e.environments,n=await Q(t,{prefix:e.ticketPrefix});if(!n)return;let{ticketId:i,currentBranch:p}=n;await fe.window.withProgress({location:fe.ProgressLocation.Notification,title:"Ricwiz: Updating environment branches from their bases",cancellable:!0},async(r,c)=>{let d=0,a=p,s=!1;c.onCancellationRequested(()=>{s=!0}),r.report({message:"Syncing remote information...",increment:10});try{await g("git fetch --all",{cwd:t})}catch{}let m=80/(o.length||1);for(let l of o){if(s)break;let u=await ce(t,i,l.name),f=l.sourceBranch;if(await re(t,u))try{r.report({message:`Processing ${u}...`,increment:m/2}),await g(`git checkout ${u}`,{cwd:t});try{r.report({message:`Merging ${f} into ${u}...`,increment:m/2});let h=e.getFetchRemote(f),v=e.getFetchBranch(f),$=e.buildUpstreamPath(f);await g(`git fetch ${h} ${v}`,{cwd:t}),await g(`git merge ${$}`,{cwd:t})}catch(h){let v=!1;try{let{stdout:w}=await g("git ls-files -u",{cwd:t});w.trim().length>0&&(v=!0)}catch{}let $=((h.stdout||"")+(h.stderr||"")+(h.message||"")).toLowerCase();if(v||$.includes("conflict")||$.includes("conflit")){let w=e.buildUpstreamPath(f);if(!await Be(t,w,u,r,c))throw s=!0,new Error("Update aborted by user.")}else throw h}if(s)break;d++}catch(h){h.message.includes("aborted")?fe.window.showInformationMessage("Ricwiz: Update cancelled."):fe.window.showErrorMessage(`Ricwiz: Failed to update branch ${u}. Detail: ${h.message}`);return}}if(!s){r.report({message:"Finishing up...",increment:10});try{let l=await F(t);a&&a!==l&&await g(`git checkout ${a}`,{cwd:t})}catch{}fe.window.showInformationMessage(`Ricwiz: Successfully updated ${d} environment branches from their bases!`)}})}var N=k(require("vscode"));async function fo(){let t=B();if(!t){N.window.showErrorMessage("Ricwiz: Open a folder or workspace that is a Git repository.");return}let e=await F(t),o=N.workspace.getConfiguration("ricwiz");await N.window.withProgress({location:N.ProgressLocation.Notification,title:"Ricwiz: Scanning for unused local branches...",cancellable:!1},async()=>{try{await g("git fetch --prune",{cwd:t})}catch{}let n=[];try{let{stdout:m}=await g('git branch --format="%(refname:short)"',{cwd:t});n=m.split(`
`).map(l=>l.trim()).filter(l=>l.length>0)}catch{}if(n.length===0){N.window.showInformationMessage("Ricwiz: No local branches found.");return}let i=[];try{let{stdout:m}=await g('git branch -r --format="%(refname:short)"',{cwd:t});i=m.split(`
`).map(l=>l.trim().replace(/^[^/]+\//,"")).filter(l=>l.length>0&&!l.includes("HEAD"))}catch{}let p=[];try{let{stdout:m}=await g('git for-each-ref --format="%(refname:short)|||%(upstream:track)" refs/heads/',{cwd:t});p=m.split(`
`).filter(l=>l.includes("[gone]")).map(l=>l.split("|||")[0].trim())}catch{}let r=n.filter(m=>!i.includes(m));if(r.length===0){N.window.showInformationMessage("Ricwiz: Your local repository is totally clean! All local branches exist on the remote.");return}let c=r.map(m=>{let l=p.includes(m),u=m===e,f="Not found on remote";return l&&(f="Deleted on remote [gone]"),u&&(f+=" (Current branch - will checkout main first)"),{label:m,description:f,picked:l&&!u}}),d=await N.window.showQuickPick(c,{canPickMany:!0,placeHolder:"Select local branches to delete",title:"Ricwiz: Delete Unused Branches"});if(!d||d.length===0){N.window.showInformationMessage("Ricwiz: No branches selected for deletion.");return}if(await N.window.showWarningMessage(`Ricwiz: Delete ${d.length} local branch(es)?
This cannot be undone!`,{modal:!0},"Yes, delete them")!=="Yes, delete them"){N.window.showInformationMessage("Ricwiz: Deletion cancelled.");return}let s=0;for(let m of d){let l=m.label;if(l===e){let u=o.get("ticketSourceBranch","main");try{await g(`git checkout ${u}`,{cwd:t}),e=u}catch{N.window.showWarningMessage(`Ricwiz: Could not switch away from ${l}. Skipping.`);continue}}try{await g(`git branch -D ${l}`,{cwd:t}),s++}catch{N.window.showWarningMessage(`Ricwiz: Could not delete local branch ${l}.`)}}N.window.showInformationMessage(`Ricwiz: \u{1F5D1}\uFE0F Cleaned up ${s} unused local branch(es).`)})}var ie=k(require("vscode"));async function Fe(t){let e=B();e&&await ie.window.withProgress({location:ie.ProgressLocation.Notification,title:`Ricwiz: Switching to ${t}...`,cancellable:!1},async()=>{try{let o=await F(e),n=!1;try{let{stdout:p}=await g("git status --porcelain",{cwd:e});n=p.trim().length>0}catch{}if(n&&o)try{await g(`git stash push --include-untracked -m "ricwiz-auto:${o}"`,{cwd:e}),ie.window.showInformationMessage(`Ricwiz: \u{1F4E6} Stashed changes from ${o}`)}catch{ie.window.showWarningMessage("Ricwiz: Could not stash changes. Checkout may fail if there are conflicts.")}let i=t;t.includes("/")&&(i=t.split("/").slice(1).join("/"));try{await g(`git checkout ${i}`,{cwd:e})}catch{let r="";if(t.includes("/"))r=t.split("/")[0];else{let{stdout:c}=await g("git branch -r",{cwd:e}),d=c.split(`
`).map(s=>s.trim()).filter(s=>s),a=[];for(let s of d){let m=s.split(" ")[0];m.endsWith(`/${i}`)&&a.push(m.substring(0,m.lastIndexOf("/")))}if(a.length===0){ie.window.showErrorMessage(`Ricwiz: A branch "${i}" n\xE3o existe localmente nem em nenhuma remote!`);return}else if(a.length===1)r=a[0];else{let s=await S.initialize(e);a.includes("origin")?r="origin":s&&a.includes(s.upstreamRemote)?r=s.upstreamRemote:r=a[0]}}try{await g(`git fetch ${r} ${i}`,{cwd:e}),await g(`git checkout -b ${i} --track ${r}/${i}`,{cwd:e})}catch{ie.window.showErrorMessage(`Ricwiz: Encontrou na remote ${r} mas falhou a fazer checkout.`);return}}try{let{stdout:p}=await g("git stash list",{cwd:e}),r=p.split(`
`);for(let c=0;c<r.length;c++)if(r[c].includes(`ricwiz-auto:${i}`)){let d=r[c].match(/stash@\{(\d+)\}/);d&&(await g(`git stash pop stash@{${d[1]}}`,{cwd:e}),ie.window.showInformationMessage(`Ricwiz: \u{1F4E6} Restored stashed changes on ${i}`));break}}catch{ie.window.showWarningMessage(`Ricwiz: Could not restore stashed changes on ${i}. You may need to resolve conflicts manually (check git stash list).`)}}catch{ie.window.showErrorMessage(`Ricwiz: Could not checkout branch ${t}.`)}})}var Je=k(require("vscode"));async function ho(){let t=B();if(t)try{let{stdout:e}=await g("git branch --show-current",{cwd:t}),o=e.trim();o&&(await Je.env.clipboard.writeText(o),Je.window.showInformationMessage(`Ricwiz: \u{1F4CB} Copied "${o}" to clipboard`))}catch{Je.window.showErrorMessage("Ricwiz: Could not get the current branch name.")}}var K=k(require("vscode")),ot=k(require("path")),wo=k(require("fs"));async function vo(){let t=B();if(!t){K.window.showErrorMessage("Ricwiz: Open a folder or workspace that is a Git repository.");return}let e=await S.initialize(t,{skipPrompt:!0}),o=K.workspace.getConfiguration("ricwiz"),n=e?.ticketSourceBranch||o.get("ticketSourceBranch","main"),i=e?.originRemote||"origin",r=o.get("packageXmlCommand",'sf sgd source delta --to "HEAD" --from "{originRemote}/{baseBranch}" --output-dir "."').replace("origin/{baseBranch}","{originRemote}/{baseBranch}").replace(/{originRemote}/g,i).replace(/{baseBranch}/g,n);await K.window.showWarningMessage("Are you sure you want to generate the package.xml? This may overwrite existing local manifest files.",{modal:!0},"Yes, Generate")==="Yes, Generate"&&await K.window.withProgress({location:K.ProgressLocation.Notification,title:"Ricwiz: Generating package.xml using Salesforce CLI...",cancellable:!1},async()=>{try{await g(r,{cwd:t,maxBuffer:10*1024*1024}),K.window.showInformationMessage("Ricwiz: Successfully generated package.xml!");let d=ot.join(t,"package","package.xml"),a=ot.join(t,"package.xml"),s=ot.join(t,"manifest","package.xml");for(let m of[d,a,s])if(wo.existsSync(m)){let l=await K.workspace.openTextDocument(m);await K.window.showTextDocument(l);break}}catch(d){K.window.showErrorMessage(`Ricwiz: Error running sf command - ${d.message}`)}})}var Z=k(require("vscode"));async function yo(){let t=B();if(!t){Z.window.showErrorMessage("Ricwiz: Open a folder or workspace that is a Git repository.");return}let o=Z.workspace.getConfiguration("ricwiz").get("deployCommand","sf project deploy start --manifest package/package.xml --post-destructive-changes destructiveChanges/destructiveChanges.xml -c -l NoTestRun -g");await Z.window.showWarningMessage("Are you sure you want to deploy to Salesforce? This action modifies your org and cannot be easily undone.",{modal:!0},"Yes, Deploy")==="Yes, Deploy"&&await Z.window.withProgress({location:Z.ProgressLocation.Notification,title:"Ricwiz: Deploying package...",cancellable:!1},async()=>{try{let{stdout:i,stderr:p}=await g(o,{cwd:t,maxBuffer:52428800}),r=Z.window.createOutputChannel("Ricwiz Deploy");r.appendLine(`Executing: ${o}`),r.appendLine(i),p&&(r.appendLine("--- STDERR ---"),r.appendLine(p)),r.show(),Z.window.showInformationMessage("Ricwiz: Successfully ran deploy command!")}catch(i){let p=Z.window.createOutputChannel("Ricwiz Deploy");p.appendLine(`Error executing: ${o}`),i.stdout&&p.appendLine(i.stdout),i.stderr&&p.appendLine(i.stderr),p.appendLine(i.message),p.show(),Z.window.showErrorMessage("Ricwiz: Error running deploy command. See output channel for details.")}})}var X=k(require("vscode"));async function bo(){let t=B();if(!t){X.window.showErrorMessage("Ricwiz: Open a folder or workspace that is a Git repository.");return}let o=X.workspace.getConfiguration("ricwiz").get("importDataCommand","sfdx force:data:tree:import --plan data/plan.json");await X.window.showWarningMessage("Are you sure you want to import data into Salesforce? This action modifies records in your org.",{modal:!0},"Yes, Import")==="Yes, Import"&&await X.window.withProgress({location:X.ProgressLocation.Notification,title:"Ricwiz: Importing data...",cancellable:!1},async()=>{try{let{stdout:i,stderr:p}=await g(o,{cwd:t,maxBuffer:52428800}),r=X.window.createOutputChannel("Ricwiz Import Data");r.appendLine(`Executing: ${o}`),r.appendLine(i),p&&(r.appendLine("--- STDERR ---"),r.appendLine(p)),r.show(),X.window.showInformationMessage("Ricwiz: Successfully ran import data command!")}catch(i){let p=X.window.createOutputChannel("Ricwiz Import Data");p.appendLine(`Error executing: ${o}`),i.stdout&&p.appendLine(i.stdout),i.stderr&&p.appendLine(i.stderr),p.appendLine(i.message),p.show(),X.window.showErrorMessage("Ricwiz: Error running import data command. See output channel for details.")}})}var V=k(require("vscode"));async function xo(){let t=B();if(!t){V.window.showErrorMessage("Ricwiz: Open a folder or workspace that is a Git repository.");return}let e=await S.initialize(t,{skipPrompt:!0}),o=e?e.ticketSourceBranch:V.workspace.getConfiguration("ricwiz").get("ticketSourceBranch","main"),n=e?e.originRemote:"origin",i="";try{i=await F(t)}catch{}let p=await V.window.showInputBox({prompt:`Enter the branch name to list modified files (compared to ${o})`,value:i,placeHolder:"SFPSCA-1234"});if(!p)return;let r=$e(p);await V.window.withProgress({location:V.ProgressLocation.Notification,title:`Ricwiz: Finding files for ${r}...`,cancellable:!1},async()=>{try{let c=e?e.ticketPrefix:V.workspace.getConfiguration("ricwiz").get("ticketPrefix","SFPSC-"),d=me(r,c),a=pe(r,d,!0)||r.replace(/-to-[a-zA-Z0-9]+$/i,""),s=await ce(t,a);R.appendLine(`[ListTicketFiles] targetBranch (raw): ${r}, resolvedTargetBranch: ${s}, ticketId: ${a}, originRemote: ${n}, sourceBranch: ${o}`);let m=[];try{let b="";try{R.appendLine(`[ListTicketFiles] Running: git merge-base ${n}/${o} ${s}`);let{stdout:x}=await g(`git merge-base ${n}/${o} ${s}`,{cwd:t});b=x.trim()}catch(x){R.appendLine(`[ListTicketFiles] First merge-base failed: ${x.message}`);try{R.appendLine(`[ListTicketFiles] Running: git merge-base ${o} ${s}`);let{stdout:T}=await g(`git merge-base ${o} ${s}`,{cwd:t});b=T.trim()}catch(T){R.appendLine(`[ListTicketFiles] Second merge-base failed: ${T.message}`),R.appendLine(`[ListTicketFiles] Running: git merge-base ${n}/${o} ${n}/${s}`);let{stdout:E}=await g(`git merge-base ${n}/${o} ${n}/${s}`,{cwd:t});b=E.trim(),s=`${n}/${s}`}}if(b){R.appendLine(`[ListTicketFiles] Merge base found: ${b}. Running git diff...`);let x=s===i||r===i,T=x?"":` ${s}`,{stdout:E}=await g(`git diff --name-only ${b}${T}`,{cwd:t,maxBuffer:10*1024*1024});if(m=E.split(`
`).map(P=>P.trim()).filter(P=>P.length>0),x)try{let{stdout:P}=await g("git ls-files --others --exclude-standard",{cwd:t,maxBuffer:10485760}),O=P.split(`
`).map(W=>W.trim()).filter(W=>W.length>0);m=[...m,...O],R.appendLine(`[ListTicketFiles] Found ${O.length} untracked files.`)}catch(P){R.appendLine(`[ListTicketFiles] Failed to get untracked files: ${P.message}`)}R.appendLine(`[ListTicketFiles] diff found ${m.length} files total.`)}}catch(b){R.appendLine(`[ListTicketFiles] Diff strategy failed: ${b.message}`)}let l=[];try{R.appendLine(`[ListTicketFiles] Running git log fallback for ticketId: ${a}`);let{stdout:b}=await g(`git --no-pager log --grep="\\b${a}\\b" -i -E --name-only -m --first-parent --format=""`,{cwd:t,maxBuffer:10*1024*1024});l=b.split(`
`).map(x=>x.trim()).filter(x=>x.length>0),R.appendLine(`[ListTicketFiles] git log found ${l.length} files.`)}catch(b){R.appendLine(`[ListTicketFiles] Git log fallback failed: ${b.message}`)}let u=[...m,...l];if(u.length===0){V.window.showInformationMessage(`Ricwiz: No modified files found for ${r}.`);return}let f=Array.from(new Set(u)).sort(),h={};for(let b of f){let x=b.match(/default\/([^/]+)/),T=x&&x[1]?x[1].toUpperCase():"OUTROS";h[T]||(h[T]=[]),h[T].push(b)}let v=`Files modified in branch ${r}:
`,$=Object.keys(h).sort();for(let b of $)v+=`
=== ${b} ===
`,v+=h[b].join(`
`)+`
`;let w=await V.workspace.openTextDocument({content:v,language:"plaintext"});await V.window.showTextDocument(w)}catch(c){V.window.showErrorMessage(`Ricwiz: Error running git log - ${c.message}`)}})}var ne=k(require("vscode"));async function ko(){let t=B();if(!t){ne.window.showErrorMessage("Ricwiz: Open a folder or workspace that is a Git repository.");return}let o=ne.workspace.getConfiguration("ricwiz").get("resetTrackingCommand","sf org disable tracking && sf project reset tracking --no-prompt");await ne.window.withProgress({location:ne.ProgressLocation.Notification,title:"Ricwiz: Resetting tracking...",cancellable:!1},async()=>{try{let{stdout:n,stderr:i}=await g(o,{cwd:t,maxBuffer:52428800}),p=ne.window.createOutputChannel("Ricwiz Reset Tracking");p.appendLine(`Executing: ${o}`),p.appendLine(n),i&&(p.appendLine("--- STDERR ---"),p.appendLine(i)),p.show(),ne.window.showInformationMessage("Ricwiz: Successfully reset tracking!")}catch(n){let i=ne.window.createOutputChannel("Ricwiz Reset Tracking");i.appendLine(`Error executing: ${o}`),n.stdout&&i.appendLine(n.stdout),n.stderr&&i.appendLine(n.stderr),i.appendLine(n.message),i.show(),ne.window.showErrorMessage("Ricwiz: Error resetting tracking. See output channel for details.")}})}var ee=k(require("vscode"));async function Co(){let t=B();if(!t){ee.window.showErrorMessage("Ricwiz: Open a workspace first.");return}let e=["ApexClass","ApexTrigger","CustomObject","CustomField","LightningComponentBundle","AuraDefinitionBundle","Flow","CustomLabel","CustomMetadata","StaticResource","Profile","PermissionSet","PermissionSetGroup","Layout","ValidationRule","RecordType","ListView","Report","EmailTemplate","Other (Type manually)..."],o=await ee.window.showQuickPick(e,{placeHolder:"Select Metadata Type to extract (e.g., ApexClass)",ignoreFocusOut:!0});if(!o||o==="Other (Type manually)..."&&(o=await ee.window.showInputBox({prompt:"Enter Metadata Type (e.g., CustomApplication, Queue)",ignoreFocusOut:!0}),!o))return;let n={ApexClass:"**/*.cls",ApexTrigger:"**/*.trigger",CustomObject:"**/*.{object,object-meta.xml}",CustomField:"**/*.field-meta.xml",LightningComponentBundle:"**/lwc/*/*.js",AuraDefinitionBundle:"**/aura/*/*.cmp",Flow:"**/*.flow-meta.xml",CustomLabel:"**/*.labels-meta.xml",CustomMetadata:"**/*.md-meta.xml",StaticResource:"**/*.resource-meta.xml",Profile:"**/*.profile-meta.xml",PermissionSet:"**/*.permissionset-meta.xml",PermissionSetGroup:"**/*.permissionsetgroup-meta.xml",Layout:"**/*.layout-meta.xml",ValidationRule:"**/*.validationRule-meta.xml",RecordType:"**/*.recordType-meta.xml",ListView:"**/*.listView-meta.xml"},i=[],p=n[o];if(p)try{i=(await ee.workspace.findFiles(p,"**/node_modules/**")).map(d=>{let a=d.fsPath.split(/[\\/]/).pop()||"";if(o==="LightningComponentBundle"||o==="AuraDefinitionBundle"){let s=d.fsPath.split(/[\\/]/);return s[s.length-2]||a.split(".")[0]}return a.split(".")[0]}),i=[...new Set(i)].sort()}catch{}let r=await new Promise(c=>{let d=ee.window.createQuickPick();d.title=`Extract ${o}`,d.placeholder="Type name (e.g. MyComponent) or * for all",d.ignoreFocusOut=!0,d.matchOnDescription=!0;let a=()=>{let s=d.value.trim(),m=[];s?m.push({label:`$(cloud-download) Extract "${s}"`,description:"Extract exact name from Salesforce",alwaysShow:!0}):m.push({label:'$(cloud-download) Extract "*" (All)',description:`Extract all ${o}s`,alwaysShow:!0}),i.forEach(l=>{(!s||l.toLowerCase().includes(s.toLowerCase()))&&m.push({label:l,description:"Local workspace component"})}),d.items=m};d.onDidChangeValue(()=>a()),d.onDidAccept(()=>{let s=d.selectedItems[0];if(s){let m=s.label;m.startsWith('$(cloud-download) Extract "')?m=m.replace('$(cloud-download) Extract "',"").replace('" (All)',"").replace('"',""):m==='$(cloud-download) Extract "*" (All)'&&(m="*"),d.hide(),c(m)}}),d.onDidHide(()=>{d.dispose(),c(void 0)}),a(),d.show()});r&&await ee.window.withProgress({location:ee.ProgressLocation.Notification,title:`Ricwiz: Extracting ${o}:${r} from Salesforce...`,cancellable:!0},async(c,d)=>{try{R.show(!0);let a=`${o}:${r}`,{stdout:s,stderr:m}=await g(`sf project retrieve start -m "${a}"`,{cwd:t});s&&R.appendLine(s),m&&R.appendLine(m),ee.window.showInformationMessage(`Ricwiz: Successfully extracted ${a}.`)}catch(a){R.appendLine(`ERROR: ${a.message}`),a.stdout&&R.appendLine(a.stdout),a.stderr&&R.appendLine(a.stderr),ee.window.showErrorMessage("Ricwiz: Extraction failed. See Output channel for details.")}})}var J=k(require("vscode")),$o=k(require("path"));async function Ro(){let t=J.window.activeTextEditor;if(!t){J.window.showErrorMessage("Ricwiz: Please open the file you want to deploy in the editor first.");return}let e=t.document.uri.fsPath,o=B();if(!o)return;let n="";if(await J.window.withProgress({location:J.ProgressLocation.Notification,title:"Ricwiz: Fetching available Salesforce orgs...",cancellable:!1},async()=>{try{let{stdout:d}=await g("sf org list --json",{cwd:o});n=d}catch(d){n=d.stdout||""}}),!n){J.window.showErrorMessage("Ricwiz: Failed to fetch orgs. Is Salesforce CLI installed?");return}let i=[];try{let d=JSON.parse(n),a=d.result?.nonScratchOrgs||[],s=d.result?.scratchOrgs||[];i=[...a,...s]}catch{J.window.showErrorMessage("Ricwiz: Failed to parse org list.");return}if(i.length===0){J.window.showInformationMessage("Ricwiz: No authenticated orgs found.");return}let p=i.map(d=>({label:d.alias||d.username,description:d.alias?d.username:"",picked:d.isDefaultUsername})),r=await J.window.showQuickPick(p,{placeHolder:"Select the org(s) to deploy this file to",canPickMany:!0,ignoreFocusOut:!0});if(!r||r.length===0)return;let c=$o.basename(e);await J.window.withProgress({location:J.ProgressLocation.Notification,title:`Ricwiz: Deploying ${c} to ${r.length} org(s)...`,cancellable:!1},async()=>{R.show(!0),R.appendLine(`--- Starting Parallel Deploy of ${c} ---`);let d=r.map(async l=>{let u=l.label;R.appendLine(`[${u}] Deploying...`);try{let{stdout:f,stderr:h}=await g(`sf project deploy start -d "${e}" -o "${u}"`,{cwd:o});return R.appendLine(`[${u}] \u2705 Success`),f&&R.appendLine(f),{org:u,success:!0}}catch(f){return R.appendLine(`[${u}] \u274C Failed`),f.stdout&&R.appendLine(f.stdout),f.stderr&&R.appendLine(f.stderr),{org:u,success:!1}}}),a=await Promise.all(d),s=a.filter(l=>l.success).length,m=a.filter(l=>!l.success).length;m===0?J.window.showInformationMessage(`Ricwiz: Successfully deployed to all ${s} orgs!`):J.window.showErrorMessage(`Ricwiz: Deploy finished with errors (${s} success, ${m} failed). Check Output channel.`)})}var I=k(require("vscode")),it=k(require("fs")),nt=k(require("path"));async function zo(){let t=B();if(!t){I.window.showErrorMessage("Ricwiz: Open a folder or workspace that is a Git repository.");return}let e=I.workspace.getConfiguration("ricwiz"),o=e.get("auditUsername",""),n=e.get("auditHours",8),i=await I.window.showInputBox({prompt:"Enter your Salesforce Username to query in SetupAuditTrail",value:o,placeHolder:"admin@tuaorg.com"});if(!i)return;i=$e(i);let p=await I.window.showInputBox({prompt:"How many hours back do you want to search?",value:n.toString(),placeHolder:"8"});if(!p)return;let r=parseFloat(p);if(isNaN(r)||r<=0){I.window.showErrorMessage("Ricwiz: Invalid hours specified.");return}let c=new Date(Date.now()-r*60*60*1e3).toISOString(),a=`sf data query -q "${`SELECT Action, Display, Section FROM SetupAuditTrail WHERE CreatedBy.Username = '${i}' AND CreatedDate >= ${c}`}" --json`;await I.window.withProgress({location:I.ProgressLocation.Notification,title:"Ricwiz: Interrogating Setup Audit Trail...",cancellable:!1},async()=>{try{let{stdout:s}=await g(a,{cwd:t,maxBuffer:52428800}),m=JSON.parse(s);if(!m.result||m.result.records.length===0){I.window.showInformationMessage(`Ricwiz: No changes found for ${i} in the last ${r} hours.`);return}let l=m.result.records,u=[],f=new Set;for(let P of l){let O=Ko(P.Action,P.Display,P.Section);if(O){let W=`${O.isDelete?"DEL":"ADD"}-${O.metadataFormat}`;if(!f.has(W)){f.add(W);let le=O.isDelete?"$(trash)":"$(plus)";u.push({label:`${le} ${O.metadataFormat}`,description:`${P.Action} -> ${P.Display}`,metadataFormat:O.metadataFormat,isDelete:O.isDelete})}}}if(u.length===0){I.window.showInformationMessage(`Ricwiz: No extractable metadata changes found for ${i} in the last ${r} hours (ignored passwords/logins).`);return}let h=await I.window.showQuickPick(u,{canPickMany:!0,placeHolder:"Select the changes you want to extract to GitLab",ignoreFocusOut:!0});if(!h||h.length===0){I.window.showInformationMessage("Ricwiz: No changes selected.");return}let v=h.filter(P=>P.isDelete),$=h.filter(P=>!P.isDelete),w=I.window.createOutputChannel("Ricwiz Admin Bridge");if(w.show(),v.length>0){let{stdout:P}=await g("git ls-files",{cwd:t}),O=P.split(`
`).map(le=>le.trim()),W=0;for(let le of v){let Oe=le.metadataFormat.split(":"),He=Oe[0],Ve=Oe[1],xe=Ve;He==="CustomField"&&(xe=Ve.split(".")[1]);let rt=O.filter(Ae=>{let L=nt.basename(Ae);return L.startsWith(xe+".")&&L.includes(He==="CustomField"?".field":"")});for(let Ae of rt){let L=nt.join(t,Ae);it.existsSync(L)&&(it.unlinkSync(L),w.appendLine(`Deleted local file: ${Ae}`),W++)}}I.window.showInformationMessage(`Ricwiz: Deleted ${W} local files from Git workspace.`)}if($.length===0)return;let b=$.map(P=>P.metadataFormat).filter(P=>P!=="").join(", "),x=await I.window.showInputBox({prompt:"Review and adjust the metadata components to retrieve",value:b,ignoreFocusOut:!0});if(!x)return;let T=`sf project retrieve start -m "${x}"`;w.appendLine(`Executing: ${T}`),I.window.showInformationMessage(`Ricwiz: Extracting ${$.length} components...`);let E=await g(T,{cwd:t});w.appendLine(E.stdout),E.stderr&&(w.appendLine("--- STDERR ---"),w.appendLine(E.stderr)),I.window.showInformationMessage("Ricwiz: Changes extracted successfully! Ready for Git Commit.")}catch(s){I.window.showErrorMessage(`Ricwiz: Error capturing changes - ${s.message}`)}})}function Ko(t,e,o){if(!t||!e||!o)return null;let n=t.toLowerCase(),i=o.toLowerCase();if(["security controls","network access","session settings","data export","login history","password policies","identity verification","delegated administration"].includes(i)||n.includes("login")||n.includes("password")||n.includes("oauth")||n.includes("session"))return null;let r=n.includes("delete"),c=null;if(n==="permissionsetgroupcomponentadd"||n==="permissionsetgroupcomponentdelete")return null;let d=(a,s=!1)=>{let m=a.replace(/\(.*\)/g,"").trim();m.includes(":")&&!n.includes("calculation")&&(m=m.split(":")[0]);let l=["disabled","deleted","removed","created","changed","updated","from","to","on","assigned","assign","assignment","permission","set","group","apex","class","trigger","custom","field","object","layout","validation","rule","flow","profile"],u=m.split(/\s+/);if(s){for(;u.length>0&&l.includes(u[u.length-1].toLowerCase());)u.pop();for(;u.length>0&&l.includes(u[0].toLowerCase());)u.shift();return u.join(" ").trim().replace(/[^a-zA-Z0-9_ ]/g,"")}else return u.filter(v=>!l.includes(v.toLowerCase())).join("_").replace(/[^a-zA-Z0-9_]/g,"")||m.replace(/\s+/g,"")};if(n.includes("profile"))c=`Profile:${d(e,!0)}`;else if(n.includes("permissionsetgroupcalculation")){let a=e.split(":");c=`PermissionSetGroup:${a.length>1?a[a.length-1].trim():d(e,!1)}`}else if(n.includes("permission set group")||n.includes("permissionsetgroup"))c=`PermissionSetGroup:${d(e,!1)}`;else if(n.includes("permission set")||n.includes("permissionset"))c=`PermissionSet:${d(e,!1)}`;else if(n.includes("apexclass"))c=`ApexClass:${d(e,!1)}`;else if(n.includes("apextrigger")||n.includes("apex trigger"))c=`ApexTrigger:${d(e,!1)}`;else if(n.includes("customfield")){let a=e.match(/([A-Za-z0-9_]+__c)/),s=e.match(/(?:on|na|for)\s+([A-Za-z0-9_]+)/i);a&&s?c=`CustomField:${s[1]}.${a[1]}`:c=`CustomField:${d(e,!1)}`}else if(n.includes("layout"))c=`Layout:${d(e,!0)}`;else if(n.includes("validation"))c=`ValidationRule:${d(e,!1)}`;else if(n.includes("flow"))c=`Flow:${d(e,!1)}`;else if(n.includes("customobject")){let a=e.match(/([A-Za-z0-9_]+__c)/);c=a?`CustomObject:${a[1]}`:`CustomObject:${d(e,!1)}`}else if(!n.includes("created")&&!n.includes("changed")&&!n.includes("deleted"))return null;return c?{metadataFormat:c,isDelete:r}:null}var ft=k(require("vscode"));async function Bo(){let t=B();if(t)try{let{stdout:e}=await g('git for-each-ref --sort=-committerdate --format="%(refname:short)|||%(committerdate:relative)|||%(subject)" refs/heads/',{cwd:t}),o=e.split(`
`).filter(i=>i.trim()).map(i=>{let p=i.split("|||");return{label:`$(git-branch) ${p[0]}`,description:p[1],detail:p[2],branchName:p[0]}}),n=await ft.window.showQuickPick(o,{placeHolder:"Select a branch from history to checkout",matchOnDescription:!0,matchOnDetail:!0});n&&await Fe(n.branchName)}catch{ft.window.showErrorMessage("Ricwiz: Failed to get branch history")}}var We=k(require("vscode"));async function Po(){let t=B();if(!t)return;let e=await We.window.showInputBox({prompt:"Enter ticket number or name (e.g., 48934)",placeHolder:"48934"});if(!e)return;let o=$e(e);try{let{stdout:n}=await g(`git branch --list "*${o}*"`,{cwd:t}),i=n.split(`
`).map(c=>c.replace("*","").trim()).filter(c=>c);if(i.length===0){We.window.showInformationMessage(`Ricwiz: No branches found matching "${e}"`);return}let p=i.map(c=>({label:`$(git-branch) ${c}`,branchName:c})),r=await We.window.showQuickPick(p,{placeHolder:`Select a branch for ${e}`});r&&await Fe(r.branchName)}catch{We.window.showErrorMessage("Ricwiz: Failed to search branches")}}var Ee=k(require("vscode")),So=k(require("path"));async function To(){let t=Ee.window.activeTextEditor;if(!t)return Ee.window.showErrorMessage("Ricwiz: Please open a file in the editor to check blame."),null;let e=t.document.fileName,o=So.basename(e),n=B();if(!n)return Ee.window.showErrorMessage("Ricwiz: Workspace is not a git repository."),null;let i=[];try{let{stdout:s}=await g(`git log -5 --pretty=format:"%an|%ar|%s|%h" -- "${e}"`,{cwd:n}),m=s.trim().split(`
`);for(let l of m){let u=l.split("|");u.length>=4&&i.push({author:u[0],time:u[1],message:u.slice(2,-1).join("|"),hash:u[u.length-1]})}}catch(s){R.appendLine(`[WhoToBlame] Git blame error: ${s.message}`)}let p="Unknown",r="Unknown",c="Unknown",d=[],a=Ze(e);if(a)try{await Ee.window.withProgress({location:Ee.ProgressLocation.Notification,title:`Ricwiz: Analyzing ${a.name} in Salesforce...`,cancellable:!1},async()=>{let s="";if(a.type==="CustomField"){let m=a.name.split(".");m.length===2&&(s=`SELECT LastModifiedBy.Name, LastModifiedDate, CreatedBy.Name FROM CustomField WHERE DeveloperName = '${m[1].replace("__c","")}' AND TableEnumOrId = '${m[0]}'`)}else a.type==="LightningComponentBundle"?s=`SELECT LastModifiedBy.Name, LastModifiedDate, CreatedBy.Name FROM LightningComponentBundle WHERE DeveloperName = '${a.name}'`:s=`SELECT LastModifiedBy.Name, LastModifiedDate, CreatedBy.Name FROM ${a.type} WHERE Name = '${a.name}'`;if(s)try{let{stdout:m}=await g(`sf data query -t -q "${s}" --json`,{cwd:n,maxBuffer:52428800}),l=JSON.parse(m);if(l&&l.result&&l.result.records&&l.result.records.length>0){let u=l.result.records[0];p=u.LastModifiedBy?u.LastModifiedBy.Name:"Unknown",c=u.CreatedBy?u.CreatedBy.Name:"Unknown",r=new Date(u.LastModifiedDate).toLocaleString()}else p="Not found in Org",r="N/A",c="N/A"}catch(m){p="Query Error",r="N/A",c="N/A",R.appendLine(`[WhoToBlame] Query error: ${m.message}`)}try{let m="SELECT Action, Display, CreatedBy.Name, CreatedDate FROM SetupAuditTrail ORDER BY CreatedDate DESC LIMIT 1500",{stdout:l}=await g(`sf data query -q "${m}" --json`,{cwd:n,maxBuffer:52428800}),u=JSON.parse(l);if(u&&u.result&&u.result.records){let f=a.name.replace("__c","");d=u.result.records.filter(v=>v.Display&&v.Display.includes(f)).map(v=>({action:v.Action,display:v.Display,author:v.CreatedBy?v.CreatedBy.Name:"Unknown",time:new Date(v.CreatedDate).toLocaleString()})).slice(0,10)}}catch(m){R.appendLine(`[WhoToBlame] Audit trail query error: ${m.message}`)}})}catch(s){R.appendLine(`[WhoToBlame] Salesforce query error: ${s.message}`)}else p="Unsupported Metadata Type",r="N/A";return{fileName:o,gitHistory:i,sfAuthor:p,sfTime:r,sfCreatedBy:c,auditHistory:d}}var he=k(require("vscode"));var Ge=k(require("https"));async function Do(t,e){let o=B();if(!o)return;let n=(await Ce())?.trim();if(!n){he.window.showErrorMessage("Ricwiz: GitLab token is not configured.");return}try{let i=await S.initialize(o,{skipPrompt:!0});if(!i)return;let r=i.getConfig("gitlabUrlOverride","");if(r){let c=new URL(r);r=`${c.protocol}//${c.host}`}else{let{stdout:c}=await g("git remote",{cwd:o}),d=c.split(`
`).map(s=>s.trim()).filter(s=>s),a=!1;for(let s of d){let{stdout:m}=await g(`git remote get-url ${s}`,{cwd:o}),l=m.trim();l.endsWith(".git")&&(l=l.slice(0,-4)),l.startsWith("git@")&&(l=l.replace("git@","").replace(":","/"),l=`https://${l}`);let u=new URL(l),f=u.pathname;if(f.startsWith("/")&&(f=f.substring(1)),f.endsWith("/")&&(f=f.slice(0,-1)),encodeURIComponent(f)===t||f===t){r=`${u.protocol}//${u.host}`,a=!0;break}}if(!a){he.window.showErrorMessage(`Ricwiz: Could not determine base URL for project ${t}`);return}}await he.window.withProgress({location:he.ProgressLocation.Notification,title:`Fetching failed jobs for Pipeline #${e}...`,cancellable:!1},async()=>{let c=new Ge.Agent({keepAlive:!0}),d=new URL(`${r}/api/v4/projects/${t}/pipelines/${e}/jobs?scope[]=failed`),a=await new Promise(h=>{Ge.get(d,{headers:{"PRIVATE-TOKEN":n},agent:c},v=>{let $="";v.on("data",w=>$+=w),v.on("end",()=>{if(v.statusCode===200)try{h(JSON.parse($))}catch{h([])}else h([])})}).on("error",()=>h([]))});if(!a||a.length===0){he.window.showInformationMessage("Ricwiz: No failed jobs found for this pipeline.");return}let s=a[0],m=new URL(`${r}/api/v4/projects/${t}/jobs/${s.id}/trace`),u=(await new Promise(h=>{Ge.get(m,{headers:{"PRIVATE-TOKEN":n},agent:c},v=>{let $="";v.on("data",w=>$+=w),v.on("end",()=>h($))}).on("error",v=>h(`Failed to fetch log: ${v.message}`))})).replace(/\x1B\[[0-9;]*[mK]/g,""),f=he.window.createOutputChannel(`Pipeline #${e} - Job ${s.name}`);f.appendLine(`Pipeline ID: ${e}`),f.appendLine(`Job Name: ${s.name}`),f.appendLine(`Status: ${s.status}`),f.appendLine(`URL: ${s.web_url}`),f.appendLine("========================================"),f.appendLine(u),f.show()})}catch(i){he.window.showErrorMessage(`Ricwiz: Error fetching pipeline logs - ${i.message}`)}}var A=k(require("vscode")),Ue=k(require("child_process"));async function Eo(t,e,o){return new Promise((n,i)=>{let p=Ue.spawn("gemini",["-y","-p",t,"--output-format","text"],{cwd:e,shell:!0}),r="",c="";p.stdout.on("data",d=>{let a=d.toString();r+=a,o&&o.append(a)}),p.stderr.on("data",d=>{let a=d.toString();c+=a,o&&o.append(a)}),p.on("close",d=>{d===0?n(r.trim()):i(new Error(`Gemini CLI failed: ${c||r}`))})})}async function Mo(){let t=A.workspace.workspaceFolders;if(!t){A.window.showErrorMessage("No workspace folder found.");return}let e=t[0].uri.fsPath;try{let o=await new Promise((n,i)=>{Ue.exec("git diff --cached",{cwd:e,maxBuffer:10485760},(p,r,c)=>{p&&!r?i(p):n(r)})});if(!o.trim()){A.window.showInformationMessage("No staged changes found. Please stage your changes first.");return}await A.window.withProgress({location:A.ProgressLocation.Notification,title:"Generating commit message with Gemini...",cancellable:!1},async()=>{let n=`Generate a single, concise commit message description in English for the following git diff.
Rules:
- Start with a capital letter
- Use the imperative mood
- Under 72 characters
- Do NOT include the ticket number
- Do NOT use backticks, quotes, or any punctuation at the start
- Only return the description itself, no other text.

Diff:
${o.slice(0,1e4)}`,i=A.window.createOutputChannel("Ricwiz AI: Commit Message");i.show(!0),i.appendLine("--- Generating Commit Message ---");let p=await Eo(n,e,i);i.appendLine(`
--- Finished ---`);let r=p.replace(/^`+|`+$/g,"").trim(),c=r.split(`
`);c.length>5&&(r=c[c.length-1].trim());let d=A.extensions.getExtension("vscode.git");if(d&&d.isActive){let a=d.exports.getAPI(1);if(a.repositories.length>0){let s=a.repositories[0],m=s.inputBox.value,l=/^[A-Z]+-\d+(?:-\d+)?\s*(?:-\s*|:\s*|\s+)?/i,u=m.match(l);u?s.inputBox.value=u[0]+r:s.inputBox.value=r,A.window.showInformationMessage("Commit message generated and prefilled!")}else A.window.showInformationMessage("Generated: "+r)}})}catch(o){A.window.showErrorMessage("Failed to generate commit message: "+o.message)}}async function Ao(t){if(!t&&(t=await A.window.showInputBox({prompt:"Ask a question about the code context (e.g. Why does this do X?)",placeHolder:"Why does this code exist?"})||"",!t))return;let e=A.workspace.workspaceFolders;if(!e){A.window.showErrorMessage("No workspace folder found.");return}let o=e[0].uri.fsPath;try{await A.window.withProgress({location:A.ProgressLocation.Notification,title:"Fetching Code Context via Gemini...",cancellable:!1},async()=>{let n="",i="",p=A.window.activeTextEditor;if(p){let a=A.workspace.asRelativePath(p.document.uri),s=p.selection,m=s.start.line+1,l=s.end.line+1;n=`The user is currently looking at file '${a}' between lines ${m} and ${l}.`;try{let u=Ue.execSync(`git blame -w -C -C -L ${m},${l} "${a}"`,{cwd:o,encoding:"utf8"}),f=/[A-Z]+-\d+/g,h=u.match(f)||[],v=[...new Set(h)];v.length>0&&(i="Related Jira Tickets Context:\\n"+(await tt(v)).map(w=>`Ticket: ${w.key}\\nSummary: ${w.title}\\nDescription: ${w.description}\\nStatus: ${w.status}`).join("\\n\\n"))}catch{}}let r=`You are a helpful agent that answers code context questions.
User's Question: ${t}
${n}

${i}

Please use terminal tools like git blame or git log to trace the code history if needed, and answer the user's question directly.
Output your final answer directly in English.`,c=A.window.createOutputChannel("Ricwiz AI: Code Context");c.clear(),c.show(!0),c.appendLine("Question: "+t),c.appendLine(n),c.appendLine("----------------------------------------");let d=await Eo(r,o,c);c.appendLine(`
----------------------------------------`),c.appendLine("Finished.")})}catch(n){A.window.showErrorMessage("Failed to fetch code context: "+n.message)}}function Lo(t,e,o){t.subscriptions.push(y.commands.registerCommand("ricwiz.conflictAction",Lt),y.commands.registerCommand("ricwiz.generateDestructiveChanges",async()=>{try{await Et()}finally{y.commands.executeCommand("ricwiz.manualRefresh")}}),y.commands.registerCommand("ricwiz.runSmartTests",async()=>{try{await Mt()}finally{y.commands.executeCommand("ricwiz.manualRefresh")}}),y.commands.registerCommand("ricwiz.refreshWebview",()=>{e&&y.commands.executeCommand("workbench.action.webview.reloadWebviewAction")}),y.commands.registerCommand("ricwiz.createBranches",async n=>{try{await At(n)}finally{y.commands.executeCommand("ricwiz.manualRefresh")}}),y.commands.registerCommand("ricwiz.prepareDeploy",async()=>{try{await jt()}finally{y.commands.executeCommand("ricwiz.manualRefresh")}}),y.commands.registerCommand("ricwiz.createMergeRequests",async()=>{try{await Wt()}finally{y.commands.executeCommand("ricwiz.manualRefresh")}}),y.commands.registerCommand("ricwiz.createMergeRequestsVSCode",async()=>{try{await Gt()}finally{y.commands.executeCommand("ricwiz.manualRefresh")}}),y.commands.registerCommand("ricwiz.openJiraTicket",async()=>{try{await Vt()}finally{y.commands.executeCommand("ricwiz.manualRefresh")}}),y.commands.registerCommand("ricwiz.openJiraTicketVSCode",async()=>{try{await qt()}finally{y.commands.executeCommand("ricwiz.manualRefresh")}}),y.commands.registerCommand("ricwiz.showJiraDetails",()=>{e&&io(e)}),y.commands.registerCommand("ricwiz.openJiraDashboard",n=>{e&&no(e,n)}),y.commands.registerCommand("ricwiz.openJiraDetailsForId",n=>{e&&ro(e,n)}),y.commands.registerCommand("ricwiz.toggleDashboardBranches",n=>{e&&(e.setDashboardShowBranches(n),y.commands.executeCommand("ricwiz.openJiraDashboard"))}),y.commands.registerCommand("ricwiz.changeJiraStatus",async()=>{try{await so()}finally{y.commands.executeCommand("ricwiz.manualRefresh")}}),y.commands.registerCommand("ricwiz.addJiraComment",async()=>{try{await ao()}finally{y.commands.executeCommand("ricwiz.manualRefresh")}}),y.commands.registerCommand("ricwiz.addJiraLabel",async()=>{try{await co()}finally{y.commands.executeCommand("ricwiz.manualRefresh")}}),y.commands.registerCommand("ricwiz.setJiraToken",lo),y.commands.registerCommand("ricwiz.setGitlabToken",po),y.commands.registerCommand("ricwiz.syncAll",async()=>{try{await uo()}finally{y.commands.executeCommand("ricwiz.manualRefresh")}}),y.commands.registerCommand("ricwiz.updateBases",async()=>{try{await go()}finally{y.commands.executeCommand("ricwiz.manualRefresh")}}),y.commands.registerCommand("ricwiz.deleteUnusedBranches",async()=>{try{await fo()}finally{y.commands.executeCommand("ricwiz.manualRefresh")}}),y.commands.registerCommand("ricwiz.checkoutBranch",async n=>{try{await Fe(n)}finally{y.commands.executeCommand("ricwiz.manualRefresh")}}),y.commands.registerCommand("ricwiz.copyBranchName",async()=>{try{await ho()}finally{y.commands.executeCommand("ricwiz.manualRefresh")}}),y.commands.registerCommand("ricwiz.generatePackageXml",async()=>{try{await vo()}finally{y.commands.executeCommand("ricwiz.manualRefresh")}}),y.commands.registerCommand("ricwiz.deployPackage",async()=>{try{await yo()}finally{y.commands.executeCommand("ricwiz.manualRefresh")}}),y.commands.registerCommand("ricwiz.importData",async()=>{try{await bo()}finally{y.commands.executeCommand("ricwiz.manualRefresh")}}),y.commands.registerCommand("ricwiz.listTicketFiles",async()=>{try{await xo()}finally{y.commands.executeCommand("ricwiz.manualRefresh")}}),y.commands.registerCommand("ricwiz.resetTracking",async()=>{try{await ko()}finally{y.commands.executeCommand("ricwiz.manualRefresh")}}),y.commands.registerCommand("ricwiz.extractComponent",async()=>{try{await Co()}finally{y.commands.executeCommand("ricwiz.manualRefresh")}}),y.commands.registerCommand("ricwiz.deployMultiOrg",async()=>{try{await Ro()}finally{y.commands.executeCommand("ricwiz.manualRefresh")}}),y.commands.registerCommand("ricwiz.captureAdminChanges",async()=>{try{await zo()}finally{y.commands.executeCommand("ricwiz.manualRefresh")}}),y.commands.registerCommand("ricwiz.openHistory",async()=>{try{await Bo()}finally{y.commands.executeCommand("ricwiz.manualRefresh")}}),y.commands.registerCommand("ricwiz.searchTicket",async()=>{try{await Po()}finally{y.commands.executeCommand("ricwiz.manualRefresh")}}),y.commands.registerCommand("ricwiz.whoToBlame",async()=>{let n=await To();n&&e&&(e.setBlameData(n),e.setPage("blame"))}),y.commands.registerCommand("ricwiz.showPipelineLogs",(n,i)=>Do(n,i)),y.commands.registerCommand("ricwiz.manualRefresh",()=>{o&&o()}),y.commands.registerCommand("ricwiz.toggleAutoRefresh",()=>{if(e){let n=!e.isAutoRefreshEnabled();e.setAutoRefresh(n),y.workspace.getConfiguration("ricwiz").update("autoRefresh",n,y.ConfigurationTarget.Global)}}),y.commands.registerCommand("ricwiz.openSettings",()=>{y.commands.executeCommand("workbench.action.openSettings","ricwiz")}),y.commands.registerCommand("ricwiz.generateCommitMessage",async()=>{await Mo()}),y.commands.registerCommand("ricwiz.codeContext",async n=>{await Ao(n||"")}))}var de=k(require("vscode"));function Io(t,e,o){let n,i=de.workspace.getConfiguration("ricwiz").get("autoRefresh",!0);e?.setAutoRefresh(i),t.subscriptions.push(de.workspace.onDidChangeConfiguration(r=>{if(r.affectsConfiguration("ricwiz.autoRefresh")){let c=de.workspace.getConfiguration("ricwiz").get("autoRefresh",!0);e?.setAutoRefresh(c)}}));async function p(){let r=de.extensions.getExtension("vscode.git");if(r){let a=function(s){let m="",l;async function u(){let h=de.workspace.workspaceFolders;if(!h)return;let v=h[0].uri.fsPath,$=await F(v);if($&&$!==m){m=$;let w=de.workspace.getConfiguration("ricwiz"),b=w.get("ticketPrefix","SFPSCA-");if(!$.includes(b)){let L=$.match(/([A-Z]+-)\d+/i);L&&(b=L[1].toUpperCase())}let x=[],T=[],E=[],P=[],O=await S.initialize(v,{skipPrompt:!0}),W=O?.environments||w.get("environments",[{name:"Qual",sourceBranch:"quality"},{name:"Val",sourceBranch:"validation"},{name:"Prod",sourceBranch:"main"}]);try{let L=w.get("workspaceCheckoutButtons",["main","quality","validation"]);E=Array.from(new Set(L))}catch{}let le="",Oe=$.match(new RegExp(`(${b}\\d+(?:-\\d+)?)`,"i"));if(Oe){let L=Oe[1].toUpperCase();le=L;let we=w.get("commitMessageSuffix","- "),ht=/^[A-Z]+-\d+(?:-\d+)?\s*(?:-\s*|:\s*|\s+)?/i;ht.test(s.inputBox.value)?s.inputBox.value.toUpperCase().startsWith(L)||(s.inputBox.value=s.inputBox.value.replace(ht,`${L}${we}`)):s.inputBox.value=`${L}${we}`+s.inputBox.value,o.text=`$(bookmark) ${L}`,o.tooltip=`Branch: ${$}
Click to open Jira ticket`,o.show();try{let wt=await Se(v,L,"");x=await Pe(v,wt,L,W,O)}catch{}}else{o.hide();try{P=await Nt(v)}catch{}}let[He,Ve,xe]=await Promise.all([Ot(v,10),Ut(v,$,W,O),le?Ie(le).catch(L=>{let we=L.message;return we&&(we.includes("ENOTFOUND")||we.includes("network"))&&(we="No Internet or Invalid URL"),{summary:`\u26A0\uFE0F Jira Error: ${we}`,description:"",status:""}}):Promise.resolve(null)]);T=He;let rt=xe?xe.summary:"",Ae=xe&&xe.status||"";e?.updateBranch($,Ve,x,T,E,P,rt,Ae)}}function f(){e?.isAutoRefreshEnabled()&&(l&&clearTimeout(l),l=setTimeout(()=>{m="",u()},300))}n=()=>{m="",u()},u(),t.subscriptions.push(s.state.onDidChange(()=>f())),t.subscriptions.push(de.window.onDidChangeWindowState(h=>{h.focused&&f()}))};var c=a;r.isActive||await r.activate();let d=r.exports.getAPI(1);d.repositories.length>0&&d.repositories.forEach(s=>a(s)),d.onDidOpenRepository(s=>a(s))}}return p(),()=>{n&&n()}}var Fo={get_tickets_batch:async t=>{let e=await tt(t);return JSON.stringify(e)}};var ae;async function Zo(t){await zt(t),ae=new Qe(t.extensionUri),t.subscriptions.push(Me.window.registerWebviewViewProvider("ricwiz-webview",ae));let e=Me.window.createStatusBarItem(Me.StatusBarAlignment.Left,100);e.command="ricwiz.openJiraTicket",t.subscriptions.push(e);let o=Io(t,ae,e);return Lo(t,ae,o),{getJiraCredentials:async()=>({email:Me.workspace.getConfiguration("ricwiz").get("jiraEmail",""),token:await Ye()}),getGitLabToken:async()=>Ce(),AiSkills:Fo}}function Xo(){}0&&(module.exports={activate,deactivate,webviewProvider});
