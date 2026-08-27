"use strict";var Uo=Object.create;var qe=Object.defineProperty;var Oo=Object.getOwnPropertyDescriptor;var No=Object.getOwnPropertyNames;var Jo=Object.getPrototypeOf,jo=Object.prototype.hasOwnProperty;var Wo=(t,e)=>{for(var o in e)qe(t,o,{get:e[o],enumerable:!0})},vt=(t,e,o,i)=>{if(e&&typeof e=="object"||typeof e=="function")for(let n of No(e))!jo.call(t,n)&&n!==o&&qe(t,n,{get:()=>e[n],enumerable:!(i=Oo(e,n))||i.enumerable});return t};var C=(t,e,o)=>(o=t!=null?Uo(Jo(t)):{},vt(e||!t||!t.__esModule?qe(o,"default",{value:t,enumerable:!0}):o,t)),Go=t=>vt(qe({},"__esModule",{value:!0}),t);var ti={};Wo(ti,{activate:()=>Xo,deactivate:()=>ei,webviewProvider:()=>ce});module.exports=Go(ti);var Me=C(require("vscode"));var z=C(require("vscode"));function $(t){return t?t.replace(/&/g,"&amp;").replace(/</g,"&lt;").replace(/>/g,"&gt;").replace(/"/g,"&quot;").replace(/'/g,"&#39;"):""}function _e(t){let e=(t||"").toLowerCase().trim();return e==="open"?"#888888":e==="in progress"?"#007acc":e==="waiting for deploy"?"#d7a500":e==="close"||e==="done"||e==="closed"?"#238636":"var(--vscode-badge-background)"}function ke(t){return t?t==="running"?"\u{1F7E1}":t==="success"?"\u{1F7E2}":t==="failed"?"\u{1F534}":t==="canceled"||t==="skipped"?"\u26AA":"":""}function q(){return`
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
    `}function yt(t,e){let o=_(),i=(e.files||[]).map(n=>`
        <button class="btn" style="padding: 6px; font-size: 12px; display: flex; justify-content: space-between; align-items: center;" onclick="sendOpenFileCommand('${$(n.file)}')">
            <span style="flex: 1; overflow: hidden; text-overflow: ellipsis; white-space: nowrap; direction: rtl; text-align: left;">&lrm;${$(n.file)}</span>
            <span style="font-size: 10px; opacity: 0.8; flex-shrink: 0; background-color: var(--vscode-badge-background); color: var(--vscode-badge-foreground); padding: 2px 4px; border-radius: 2px;">${$(n.state)}</span>
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
                Merging <b>${$(e.sourceStr)}</b> into <b>${$(e.targetStr)}</b>.<br/>
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
                \u25A4 ${$(t.fileName)}
            </div>

            <div style="margin-bottom: 20px;">
                <div style="font-size: 11px; font-weight: bold; opacity: 0.8; text-transform: uppercase; margin-bottom: 8px;"><span class="icon" style="color: #0A84FF;">\u25F3</span> Local Git (Last Commits)</div>
                <ul style="list-style-type: none; padding: 0; margin: 0; display: flex; flex-direction: column; gap: 8px;">
                    ${t.gitHistory&&t.gitHistory.length>0?t.gitHistory.map(o=>`
                        <li style="background: var(--vscode-editorWidget-background); border: 1px solid var(--vscode-widget-border); padding: 8px 10px; border-radius: 4px; border-left: 4px solid var(--vscode-gitDecoration-modifiedResourceForeground);">
                            <div style="display: flex; justify-content: space-between; margin-bottom: 4px; align-items: center;">
                                <strong style="font-size: 13px;">${$(o.author)}</strong>
                                <span style="opacity: 0.7; font-size: 11px;">${$(o.time)}</span>
                            </div>
                            <div style="font-size: 12px; margin-bottom: 6px; opacity: 0.9; font-style: italic;">"${$(o.message)}"</div>
                            <div style="font-family: monospace; font-size: 10px; opacity: 0.6;">Commit: ${$(o.hash)}</div>
                        </li>
                    `).join(""):'<li style="opacity:0.7; font-size: 12px;">No Git history found.</li>'}
                </ul>
            </div>

            <div style="margin-bottom: 20px;">
                <div style="font-size: 11px; font-weight: bold; opacity: 0.8; text-transform: uppercase; margin-bottom: 8px;"><span class="icon" style="color: #0A84FF;">\u2601</span> Salesforce Metadata</div>
                <div style="display: flex; flex-direction: column; gap: 8px;">
                    <div style="background: var(--vscode-editorWidget-background); border: 1px solid var(--vscode-widget-border); padding: 8px 10px; border-radius: 4px; border-left: 4px solid var(--vscode-gitDecoration-addedResourceForeground);">
                        <div style="font-size: 10px; opacity: 0.7; text-transform: uppercase; margin-bottom: 2px;">Last Modified By</div>
                        <div style="font-weight: bold; font-size: 13px;">${$(t.sfAuthor)}</div>
                        <div style="font-size: 11px; opacity: 0.7; margin-top: 2px;">${$(t.sfTime)}</div>
                    </div>
                    ${t.sfCreatedBy!=="Unknown"&&t.sfCreatedBy!=="N/A"?`
                    <div style="background: var(--vscode-editorWidget-background); border: 1px solid var(--vscode-widget-border); padding: 8px 10px; border-radius: 4px; border-left: 4px solid var(--vscode-gitDecoration-addedResourceForeground);">
                        <div style="font-size: 10px; opacity: 0.7; text-transform: uppercase; margin-bottom: 2px;">Created By</div>
                        <div style="font-weight: bold; font-size: 13px;">${$(t.sfCreatedBy)}</div>
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
                                <strong style="font-size: 13px;">${$(o.author)}</strong>
                                <span style="opacity: 0.7; font-size: 11px;">${$(o.time)}</span>
                            </div>
                            <div style="font-size: 12px; font-weight: 500; margin-bottom: 4px;">${$(o.action)}</div>
                            <div style="font-size: 11px; opacity: 0.7; font-style: italic; background: var(--vscode-editor-background); padding: 4px; border-radius: 3px;">${$(o.display)}</div>
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
            <span style="font-weight: 600; font-size: 13px;">${$(o)} Details</span>
        </div>
        
        <div class="card" style="padding: 16px;">
            <div class="jira-title">${$(i)}</div>
            <div class="jira-desc">${$(n)}</div>
            
            ${p.length>0?`
                <div style="margin-top: 16px; border-top: 1px solid var(--vscode-panel-border); padding-top: 12px;">
                    <div style="font-size: 11px; opacity: 0.7; margin-bottom: 8px; text-transform: uppercase; font-weight: bold;"><span class="icon" style="color: #32D74B;">\u2387</span> Related Branches & MRs</div>
                    <div style="display: flex; flex-direction: column; gap: 4px;">
                        ${p.map(s=>{let c=ke(s.pipelineStatus),d="";return s.pipelineStatus==="failed"&&s.projectPath&&s.pipelineId&&(d=`onclick="event.stopPropagation(); sendCommand('showPipelineLogs', { projectPath: '${s.projectPath}', pipelineId: ${s.pipelineId} });" style="cursor: pointer;"`),`
                            <div class="btn" style="padding: 6px 10px; font-size: 12px; display: flex; justify-content: space-between; align-items: center; background-color: var(--vscode-button-secondaryBackground); color: var(--vscode-button-secondaryForeground); border-radius: 4px;" onclick="sendCheckoutCommand('${$(s.name)}', this)" title="Checkout ${$(s.name)}">
                                <div style="display: flex; align-items: center; gap: 6px; overflow: hidden;">
                                    <span style="overflow: hidden; text-overflow: ellipsis; white-space: nowrap; font-weight: bold;">${$(s.name)}</span>
                                </div>
                                <div style="display: flex; gap: 6px; align-items: center;">
                                    ${c?`<span title="Pipeline: ${s.pipelineStatus}" style="font-size: 11px;" ${d}>${c}</span>`:""}
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
    </html>`}function kt(t){let{data:e,showBranches:o}=t,i=_(),n=e||{queries:[],selectedIndex:0,results:[],error:null},p=n.queries.map((c,d)=>`
        <option value="${d}" ${d===n.selectedIndex?"selected":""}>${$(c.name)}</option>
    `).join(""),s=n.error?`
        <div style="color: var(--vscode-errorForeground); padding: 12px; text-align: center; background: var(--vscode-editorError-background); border-radius: 4px;">
            \u26A0 ${$(n.error)}
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
                ${n.results.map(c=>`
                    <tr style="border-bottom: ${c.detailedBranches&&c.detailedBranches.length>0?"none":"1px solid var(--vscode-panel-border)"}; cursor: pointer;" class="tr-hover" onclick="sendCommand('openJiraDetailsForId', '${$(c.key)}', this)">
                        <td style="padding: 6px; font-weight: bold; color: var(--vscode-textLink-foreground); white-space: nowrap;">${$(c.key)}</td>
                        <td style="padding: 6px; overflow: hidden; text-overflow: ellipsis; max-width: 150px; white-space: nowrap;" title="${$(c.summary)}">${$(c.summary)}</td>
                        <td style="padding: 6px; white-space: nowrap;">
                            <span style="background: ${_e(c.status)}; color: white; padding: 2px 4px; border-radius: 3px; font-size: 9px; font-weight: bold; text-transform: uppercase;">${$(c.status)}</span>
                        </td>
                        <td style="padding: 6px; white-space: nowrap; text-align: center;">
                            ${c.detailedBranches?"":c.branch?`
                                <button class="icon-button" style="background-color: var(--vscode-button-secondaryBackground); color: var(--vscode-button-secondaryForeground); font-size: 10px; padding: 2px 6px;" title="Checkout ${$(c.branch)}" onclick="event.stopPropagation(); sendCommand('checkout', '${$(c.branch)}')">
                                    \u2387 Checkout
                                </button>
                            `:`
                                <button class="icon-button" style="background-color: var(--vscode-button-background); color: var(--vscode-button-foreground); font-size: 10px; padding: 2px 6px;" title="Create Branch for ${$(c.key)}" onclick="event.stopPropagation(); sendCommand('createBranchForTicket', '${$(c.key)}')">
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
                                        <div style="display: flex; align-items: center; gap: 6px; overflow: hidden; cursor: pointer; flex: 1;" onclick="sendCheckoutCommand('${$(d.name)}', this)" title="Checkout ${$(d.name)}">
                                            <span style="overflow: hidden; text-overflow: ellipsis; white-space: nowrap;">${$(d.name)}</span>
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
    </html>`}function $t(t){let{logoUri:e,currentBranch:o,currentBranchIsMerged:i,relatedBranches:n,commits:p,baseBranches:s,recentTickets:c,ticketTitle:d,ticketStatus:a,autoRefreshEnabled:r}=t,m=_(),l=p.length>0?`
        <div class="separator"></div>
        <div style="padding: 0 4px;">
            <div style="font-size: 11px; opacity: 0.7; margin-bottom: 6px; display: flex; align-items: center; gap: 4px;">
                <span>\u2637</span> Recent Commits
            </div>
            <div style="display: flex; flex-direction: column; gap: 2px;">
                ${p.map(v=>`
                    <div style="font-size: 11px; padding: 3px 4px; border-radius: 2px; display: flex; gap: 6px; align-items: baseline;">
                        <code style="color: var(--vscode-textLink-foreground); font-size: 10px; flex-shrink: 0;">${$(v.hash)}</code>
                        <span style="flex: 1; overflow: hidden; text-overflow: ellipsis; white-space: nowrap;" title="${$(v.message)}">${$(v.message)}</span>
                        <span style="font-size: 9px; opacity: 0.5; flex-shrink: 0;">${$(v.timeAgo)}</span>
                    </div>
                `).join("")}
            </div>
        </div>
    `:"",u=n.find(v=>v.name===o),g="";u&&(g=ke(u.pipelineStatus));let h=u?u.mrUrl:void 0,w=n.filter(v=>v.name!==o),k=o?`
        <div style="background-color: var(--vscode-editor-inactiveSelectionBackground); padding: 10px; border-radius: 6px; margin-bottom: 16px; border: 1px solid var(--vscode-panel-border); box-shadow: 0 2px 4px rgba(0,0,0,0.1); position: relative;">
            ${d&&a?`
            <div style="position: absolute; top: 6px; right: 6px; z-index: 10; cursor: pointer; font-size: 9px; padding: 2px 6px; border-radius: 18px; background-color: ${_e(a)}; color: white; border: 1px solid var(--vscode-panel-border); opacity: 0.9; font-weight: bold; text-transform: uppercase; display: flex; align-items: center; gap: 4px;" onclick="sendCommand('changeJiraStatus', null, this)" title="Update Jira Status">
                <span>\u270E</span><span>${$(a)}</span>
            </div>
            `:""}
            <div style="font-size: 10px; opacity: 0.7; margin-bottom: 4px; display: flex; align-items: center; justify-content: center; gap: 4px; text-transform: uppercase;">
                <span>Current Ticket / Branch</span>
                <button class="copy-btn" onclick="sendCommand('copyBranch', null, this)" title="Copy branch name to clipboard">\u2398</button>
            </div>
            <div style="font-weight: bold; font-size: 14px; word-break: break-all; text-align: center; color: var(--vscode-textLink-foreground); display: flex; justify-content: center; align-items: center; gap: 6px;">
                <span>${$(o)}</span>
                ${g?`<span title="Pipeline: ${u.pipelineStatus}" style="font-size: 12px;">${g}</span>`:""}
                ${h?`<span onclick="event.stopPropagation(); sendCommand('openExternal', '${h}');" title="Open Merge Request" style="cursor: pointer; font-size: 12px;">\u{1F517}</span>`:""}
                ${i?'<span style="background-color: var(--vscode-charts-green); color: white; border-radius: 3px; padding: 1px 4px; font-size: 10px; font-weight: bold;" title="Merged to target env">MERGED</span>':""}
            </div>
            ${d?`<div style="font-size: 12px; margin-top: 6px; text-align: center; opacity: 0.9; font-style: italic;">${$(d)}</div>`:""}
            ${w.length>0?`
                <div style="margin-top: 10px; border-top: 1px solid var(--vscode-panel-border); padding-top: 10px;">
                    <div style="font-size: 10px; opacity: 0.7; margin-bottom: 6px; text-transform: uppercase; text-align: center;">Sister Branches</div>
                    <div style="display: flex; flex-direction: column; gap: 4px;">
                        ${w.map(v=>{let x=ke(v.pipelineStatus),b="";return v.pipelineStatus==="failed"&&v.projectPath&&v.pipelineId&&(b=`onclick="event.stopPropagation(); sendCommand('showPipelineLogs', { projectPath: '${v.projectPath}', pipelineId: ${v.pipelineId} });" style="cursor: pointer;"`),`
                            <div class="btn" style="padding: 6px 8px; font-size: 11px; display: flex; justify-content: space-between; align-items: center; background-color: var(--vscode-button-secondaryBackground); color: var(--vscode-button-secondaryForeground); border-radius: 4px; box-sizing: border-box; width: 100%;" onclick="sendCheckoutCommand('${$(v.name)}', this)" title="Checkout ${$(v.name)}">
                                <div style="display: flex; align-items: center; gap: 4px; overflow: hidden;">
                                    <span style="overflow: hidden; text-overflow: ellipsis; white-space: nowrap; font-weight: bold;">${$(v.name)}</span>
                                </div>
                                <div style="display: flex; gap: 4px; align-items: center;">
                                    ${v.isMerged?'<span style="background-color: var(--vscode-charts-green); color: white; border-radius: 3px; padding: 1px 4px; font-size: 9px; font-weight: bold;" title="Merged to target env">MERGED</span>':""}
                                    ${x?`<span title="Pipeline: ${v.pipelineStatus}" style="font-size: 10px;" ${b}>${x}</span>`:""}
                                    ${v.mrUrl?`<span onclick="event.stopPropagation(); sendCommand('openExternal', '${v.mrUrl}');" title="Open Merge Request" style="cursor: pointer; font-size: 10px;">\u{1F517}</span>`:""}
                                </div>
                            </div>`}).join("")}
                    </div>
                </div>
            `:c.length>0?`
                <div style="margin-top: 10px; border-top: 1px solid var(--vscode-panel-border); padding-top: 10px;">
                    <div style="font-size: 10px; opacity: 0.7; margin-bottom: 6px; text-transform: uppercase; text-align: center;">Recent Tickets</div>
                    <div style="display: flex; flex-direction: column; gap: 4px;">
                        ${c.map(v=>`
                            <div class="btn" style="padding: 6px 8px; font-size: 11px; display: flex; justify-content: space-between; align-items: center; background-color: var(--vscode-button-secondaryBackground); color: var(--vscode-button-secondaryForeground); border-radius: 4px; box-sizing: border-box; width: 100%;" onclick="sendCheckoutCommand('${$(v)}', this)" title="Checkout ${$(v)}">
                                <span style="font-weight: bold; overflow: hidden; text-overflow: ellipsis; white-space: nowrap;">${$(v)}</span>
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

        ${k}

        ${s.length>0?`
            <div style="display: flex; gap: 4px; margin-bottom: 16px; flex-wrap: wrap; justify-content: center;">
                ${s.map(v=>{let x=v.split("/").pop()?.toUpperCase()||v.toUpperCase();return`
                    <button class="btn" style="flex: 1; min-width: 25%; justify-content: center; padding: 6px 4px; font-size: 10px; font-weight: bold; background-color: var(--vscode-button-secondaryBackground); color: var(--vscode-button-secondaryForeground); border-radius: 4px;" onclick="sendCheckoutCommand('${$(v)}', this)" title="Checkout ${$(v)}">
                        ${$(x)}
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
    </html>`}var Qe=class{constructor(e){this._extensionUri=e}_extensionUri;webviewView;currentBranchCache="";currentBranchIsMergedCache=!1;relatedBranchesCache=[];commitsCache=[];baseBranchesCache=[];recentTicketsCache=[];ticketTitleCache="";ticketStatusCache="";currentPage="main";blameDataCache=null;jiraDataCache=null;dashboardDataCache=null;dashboardShowBranches=!1;autoRefreshEnabled=!0;conflictState=null;resolveWebviewView(e,o,i){this.webviewView=e,e.webview.options={enableScripts:!0,localResourceRoots:[this._extensionUri]},this.updateView(),e.webview.onDidReceiveMessage(n=>{switch(n.command){case"createBranches":z.commands.executeCommand("ricwiz.createBranches");break;case"createBranchForTicket":z.commands.executeCommand("ricwiz.createBranches",n.args);break;case"prepareDeploy":z.commands.executeCommand("ricwiz.prepareDeploy");break;case"openMRs":z.commands.executeCommand("ricwiz.createMergeRequests");break;case"openMRsVSCode":z.commands.executeCommand("ricwiz.createMergeRequestsVSCode");break;case"openExternal":n.args&&z.env.openExternal(z.Uri.parse(n.args));break;case"openJira":z.commands.executeCommand("ricwiz.openJiraTicket");break;case"showJiraDetails":z.commands.executeCommand("ricwiz.showJiraDetails");break;case"showPipelineLogs":z.commands.executeCommand("ricwiz.showPipelineLogs",n.args.projectPath,n.args.pipelineId);break;case"changeJiraStatus":z.commands.executeCommand("ricwiz.changeJiraStatus");break;case"addJiraComment":z.commands.executeCommand("ricwiz.addJiraComment");break;case"addJiraLabel":z.commands.executeCommand("ricwiz.addJiraLabel");break;case"setPage":this.setPage(n.args);break;case"openDashboard":z.commands.executeCommand("ricwiz.openJiraDashboard");break;case"openJiraDetailsForId":z.commands.executeCommand("ricwiz.openJiraDetailsForId",n.args);break;case"refreshDashboard":z.commands.executeCommand("ricwiz.openJiraDashboard");break;case"switchDashboardQuery":z.commands.executeCommand("ricwiz.openJiraDashboard",parseInt(n.args,10));break;case"toggleDashboardBranches":z.commands.executeCommand("ricwiz.toggleDashboardBranches",n.args);break;case"openJiraVSCode":z.commands.executeCommand("ricwiz.openJiraTicketVSCode");break;case"openSettings":z.commands.executeCommand("ricwiz.openSettings");break;case"checkout":let p=n.branch||n.args;p&&z.commands.executeCommand("ricwiz.checkoutBranch",p);break;case"copyBranch":z.commands.executeCommand("ricwiz.copyBranchName");break;case"generatePackageXml":z.commands.executeCommand("ricwiz.generatePackageXml");break;case"openDevTools":this.setPage("devtools");break;case"openMain":this.setPage("main");break;case"generateDestructiveChanges":z.commands.executeCommand("ricwiz.generateDestructiveChanges");break;case"deployPackage":z.commands.executeCommand("ricwiz.deployPackage");break;case"runSmartTests":z.commands.executeCommand("ricwiz.runSmartTests");break;case"importData":z.commands.executeCommand("ricwiz.importData");break;case"listTicketFiles":z.commands.executeCommand("ricwiz.listTicketFiles");break;case"resetTracking":z.commands.executeCommand("ricwiz.resetTracking");break;case"extractComponent":z.commands.executeCommand("ricwiz.extractComponent");break;case"deployMultiOrg":z.commands.executeCommand("ricwiz.deployMultiOrg");break;case"captureAdminChanges":z.commands.executeCommand("ricwiz.captureAdminChanges");break;case"whoToBlame":z.commands.executeCommand("ricwiz.whoToBlame");break;case"syncAll":z.commands.executeCommand("ricwiz.syncAll");break;case"updateBases":z.commands.executeCommand("ricwiz.updateBases");break;case"deleteUnused":z.commands.executeCommand("ricwiz.deleteUnusedBranches");break;case"conflict_commitAndContinue":z.commands.executeCommand("ricwiz.conflictAction","commitAndContinue");break;case"conflict_resolveDeletions":z.commands.executeCommand("ricwiz.conflictAction","resolveDeletions");break;case"conflict_abortDeploy":z.commands.executeCommand("ricwiz.conflictAction","abortDeploy");break;case"openFile":if(n.file){let s=z.workspace.workspaceFolders;if(s){let c=z.Uri.joinPath(s[0].uri,n.file);z.commands.executeCommand("vscode.open",c)}}break;case"searchTicket":z.commands.executeCommand("ricwiz.searchTicket");break;case"manualRefresh":z.commands.executeCommand("ricwiz.manualRefresh");break;case"toggleAutoRefresh":z.commands.executeCommand("ricwiz.toggleAutoRefresh");break;case"openHistory":z.commands.executeCommand("ricwiz.openHistory");break;case"generateCommitMessage":z.commands.executeCommand("ricwiz.generateCommitMessage");break;case"codeContext":z.commands.executeCommand("ricwiz.codeContext",n.args);break}})}setConflictState(e){this.conflictState=e,this.updateView()}updateBranch(e,o,i=[],n=[],p=[],s=[],c="",d=""){this.currentBranchCache=e,this.currentBranchIsMergedCache=o,this.relatedBranchesCache=i,this.commitsCache=n,this.baseBranchesCache=p,this.recentTicketsCache=s,this.ticketTitleCache=c,this.ticketStatusCache=d,this.webviewView&&this.updateView()}setDashboardShowBranches(e){this.dashboardShowBranches=e}getDashboardShowBranches(){return this.dashboardShowBranches}setBlameData(e){this.blameDataCache=e}setJiraData(e){this.jiraDataCache=e}setDashboardData(e){this.dashboardDataCache=e}setAutoRefresh(e){this.autoRefreshEnabled=e,this.updateView()}isAutoRefreshEnabled(){return this.autoRefreshEnabled}setPage(e){this.currentPage=e,this.updateView()}updateView(){if(!this.webviewView)return;let e=this.webviewView.webview.asWebviewUri(z.Uri.joinPath(this._extensionUri,"resources","logo.png"));if(this.conflictState){this.webviewView.webview.html=yt(e,this.conflictState);return}switch(this.currentPage){case"blame":this.webviewView.webview.html=bt(this.blameDataCache);break;case"jira":this.webviewView.webview.html=xt(this.jiraDataCache);break;case"dashboard":this.webviewView.webview.html=kt({data:this.dashboardDataCache,showBranches:this.dashboardShowBranches});break;case"devtools":this.webviewView.webview.html=Ct();break;default:this.webviewView.webview.html=$t({logoUri:e,currentBranch:this.currentBranchCache,currentBranchIsMerged:this.currentBranchIsMergedCache,relatedBranches:this.relatedBranchesCache,commits:this.commitsCache,baseBranches:this.baseBranchesCache,recentTickets:this.recentTicketsCache,ticketTitle:this.ticketTitleCache,ticketStatus:this.ticketStatusCache,autoRefreshEnabled:this.autoRefreshEnabled});break}}};var ve=C(require("vscode"));var Rt=C(require("vscode")),Ho=Rt.window.createOutputChannel("Ricwiz Debug");function J(t){let e=new Date().toISOString();Ho.appendLine(`[${e}] ${t}`),console.log(`[Ricwiz] ${t}`)}async function zt(t){J("initializeSecrets: No longer using SecretStorage. Tokens are read directly from VS Code configuration.")}async function Pt(t){J("storeJiraToken: Storing token in VS Code global configuration..."),await ve.workspace.getConfiguration("ricwiz").update("jiraApiToken",t,ve.ConfigurationTarget.Global),J("storeJiraToken: Successfully stored")}async function Ye(){J("getJiraToken: Reading token from VS Code configuration...");let e=ve.workspace.getConfiguration("ricwiz").get("jiraApiToken","");if(e)return J("getJiraToken: Successfully read Jira Token from configuration."),e;J("getJiraToken: Token not found in configuration.")}async function Bt(t){J("storeGitlabToken: Storing token in VS Code global configuration..."),await ve.workspace.getConfiguration("ricwiz").update("gitlabApiToken",t,ve.ConfigurationTarget.Global),J("storeGitlabToken: Successfully stored")}async function Ce(){J("getGitlabToken: Reading token from VS Code configuration...");let e=ve.workspace.getConfiguration("ricwiz").get("gitlabApiToken","");if(e)return e}var y=C(require("vscode"));var G=C(require("vscode")),Xe=C(require("path")),ye=C(require("fs"));var Le=C(require("vscode")),St=C(require("child_process")),Tt=C(require("util")),Vo=Tt.promisify(St.exec),R=Le.window.createOutputChannel("Ricwiz"),f=async(t,e)=>{R.appendLine(`[EXEC] ${t}`);let o=await Vo(t,{maxBuffer:50*1024*1024,...e});return{stdout:o.stdout.toString(),stderr:o.stderr.toString()}};function P(){let t=Le.workspace.workspaceFolders;if(t)return t[0].uri.fsPath}async function I(t){try{let{stdout:e}=await f("git branch --show-current",{cwd:t});return e.trim()}catch{return""}}function te(t,e){if(!t.includes(e)){let o=t.match(/([A-Z]+-)\d+/i);if(o)return o[1].toUpperCase()}return e}function pe(t,e,o=!1){let i=t.match(new RegExp(`(${e}\\d+)`,"i"));return i?i[1].toUpperCase():t.includes(e)&&!t.includes("-to-")?t.substring(t.indexOf(e)):o&&t.includes("-to-")?t.substring(t.indexOf(e)).split("-to-")[0]:""}function st(t,e){let o=$e(t);return/^\d/.test(o)?`${e}${o}`.toUpperCase():o.toUpperCase()}async function Q(t,e){let o=Le.workspace.getConfiguration("ricwiz"),i=e?.prefix??o.get("ticketPrefix","SFPSCA-"),n=await I(t),p=te(n,i),s=e?.suggestedValue??pe(n,p,e?.handleToSuffix),c=await Le.window.showInputBox({prompt:e?.prompt||"Enter the full ticket ID (e.g., SCPSCA-1234) or just the number",placeHolder:e?.placeHolder||"Ticket ID or number",value:s,ignoreFocusOut:!0});return c?{ticketId:st(c,p),currentBranch:n,prefix:p}:void 0}async function se(t,e){try{return await f(`git show-ref --verify --quiet refs/heads/${e}`,{cwd:t}),!0}catch{}return await qo(t,e)}async function qo(t,e){try{let{stdout:o}=await f(`git branch -r --list "*/${e}"`,{cwd:t});return o.trim().length>0}catch{return!1}}function $e(t){return t.replace(/[&|;$><`\\!"'\r\n]/g,"").trim()}var Re=C(require("vscode")),Dt=C(require("path")),Ze=C(require("fs"));var S=class t{style;upstreamRemote;originRemote;ticketSourceBranch;ticketPrefix;branchPrefix;environments;activeProfile;profileName;constructor(e){this.activeProfile=e,this.profileName=e?.name;let o=Re.workspace.getConfiguration("ricwiz");this.style=e?.workflowStyle||o.get("workflowStyle","standard"),this.style==="multi-remote"?(this.upstreamRemote=e?.upstreamRemote||o.get("upstreamRemote","salesforce-master"),this.originRemote=e?.originRemote||o.get("originRemote","origin")):(this.upstreamRemote="origin",this.originRemote="origin"),this.ticketSourceBranch=e?.ticketSourceBranch||o.get("ticketSourceBranch","main"),this.ticketPrefix=e?.ticketPrefix||o.get("ticketPrefix","SFPSCA-"),this.branchPrefix=e?.branchPrefix??o.get("branchPrefix","");let i=[{name:"Qual",sourceBranch:"quality"},{name:"Val",sourceBranch:"validation"},{name:"Prod",sourceBranch:"main"}];this.environments=e?.environments||o.get("environments",i)}getConfig(e,o){return this.activeProfile&&this.activeProfile[e]!==void 0?this.activeProfile[e]:Re.workspace.getConfiguration("ricwiz").get(e,o)}static async initialize(e,o){let n=Re.workspace.getConfiguration("ricwiz").get("profiles",[]),p=Dt.join(e,"ricwiz.json");if(Ze.existsSync(p))try{let s=Ze.readFileSync(p,"utf-8"),c=JSON.parse(s);c&&Array.isArray(c.profiles)&&(n=[...n,...c.profiles])}catch(s){Re.window.showErrorMessage(`Ricwiz: Error parsing ricwiz.json: ${s.message}`)}if(n.length>0){if(!o?.forcePrompt)try{let{stdout:a}=await f("git branch --show-current",{cwd:e}),r=a.trim(),m=r;r.includes("-to-")&&(m=r.split("-to-")[0]);let{stdout:l}=await f(`git config branch.${m}.ricwiz-profile`,{cwd:e}),u=l.trim();if(u){let g=n.find(h=>h.name===u);if(g)return new t(g)}}catch{}if(o?.skipPrompt)return new t;let s=n.map(a=>a.name),c=await Re.window.showQuickPick(s,{placeHolder:"Ricwiz: Select Workflow Profile",ignoreFocusOut:!0});if(!c)return;let d=n.find(a=>a.name===c);return new t(d)}return new t}buildUpstreamPath(e){return e.includes("/")?e:`${this.upstreamRemote}/${e}`}getFetchRemote(e){return e.includes("/")?e.split("/")[0]:this.upstreamRemote}getFetchBranch(e){return e.includes("/")?e.substring(e.indexOf("/")+1):e}};function Ke(t){let e=t.replace(/\\/g,"/");if(e.includes("/classes/")){let o=e.match(/\/classes\/([^/.]+)\.cls/);if(o)return{type:"ApexClass",name:o[1]}}if(e.includes("/triggers/")){let o=e.match(/\/triggers\/([^/.]+)\.trigger/);if(o)return{type:"ApexTrigger",name:o[1]}}if(e.includes("/lwc/")){let o=e.match(/\/lwc\/([^/]+)\//);if(o)return{type:"LightningComponentBundle",name:o[1]}}if(e.includes("/aura/")){let o=e.match(/\/aura\/([^/]+)\//);if(o)return{type:"AuraDefinitionBundle",name:o[1]}}if(e.includes("/objects/")&&e.includes("/fields/")){let o=e.match(/\/objects\/([^/]+)\//),i=e.match(/\/fields\/([^/.]+)\.field/);if(o&&i)return{type:"CustomField",name:`${o[1]}.${i[1]}`}}if(e.includes("/objects/")){let o=e.match(/\/objects\/([^/.]+)\.object/);if(o)return{type:"CustomObject",name:o[1]}}if(e.includes("/layouts/")){let o=e.match(/\/layouts\/([^/.]+)\.layout/);if(o)return{type:"Layout",name:o[1]}}if(e.includes("/flows/")){let o=e.match(/\/flows\/([^/.]+)\.flow/);if(o)return{type:"Flow",name:o[1]}}if(e.includes("/permissionsets/")){let o=e.match(/\/permissionsets\/([^/.]+)\.permissionset/);if(o)return{type:"PermissionSet",name:o[1]}}if(e.includes("/permissionsetgroups/")){let o=e.match(/\/permissionsetgroups\/([^/.]+)\.permissionsetgroup/);if(o)return{type:"PermissionSetGroup",name:o[1]}}if(e.includes("/profiles/")){let o=e.match(/\/profiles\/([^/.]+)\.profile/);if(o)return{type:"Profile",name:o[1]}}if(e.includes("/customMetadata/")){let o=e.match(/\/customMetadata\/([^/.]+)\.md/);if(o)return{type:"CustomMetadata",name:o[1]}}if(e.includes("/flexipages/")){let o=e.match(/\/flexipages\/([^/.]+)\.flexipage/);if(o)return{type:"FlexiPage",name:o[1]}}return null}async function Et(){let t=P();if(!t){G.window.showErrorMessage("Ricwiz: Open a workspace that is a Git repository.");return}let e=await S.initialize(t,{skipPrompt:!0}),o=e?e.ticketSourceBranch:G.workspace.getConfiguration("ricwiz").get("ticketSourceBranch","main"),i=e?e.originRemote:"origin";await G.window.withProgress({location:G.ProgressLocation.Notification,title:`Ricwiz: Finding deleted files compared to ${i}/${o}...`,cancellable:!1},async()=>{try{let{stdout:n}=await f(`git diff --name-only --diff-filter=D ${i}/${o}...HEAD`,{cwd:t}),p=n.split(`
`).map(u=>u.trim()).filter(u=>u.length>0);if(p.length===0){G.window.showInformationMessage(`Ricwiz: No deleted files found compared to ${i}/${o}.`);return}let s={},c=(u,g)=>{s[u]||(s[u]=[]),s[u].includes(g)||s[u].push(g)};for(let u of p){let g=Ke(u);g&&c(g.type,g.name)}if(Object.keys(s).length===0){G.window.showInformationMessage("Ricwiz: Found deleted files in Git, but none mapped to recognizable Salesforce metadata.");return}let d=`<?xml version="1.0" encoding="UTF-8"?>
<Package xmlns="http://soap.sforce.com/2006/04/metadata">
`;for(let u of Object.keys(s).sort()){d+=`    <types>
`;for(let g of s[u].sort())d+=`        <members>${g}</members>
`;d+=`        <name>${u}</name>
    </types>
`}d+=`    <version>58.0</version>
</Package>`;let a=Xe.join(t,"destructiveChanges");ye.existsSync(a)||ye.mkdirSync(a);let r=Xe.join(a,"destructiveChanges.xml"),m=Xe.join(a,"package.xml");ye.writeFileSync(r,d,"utf8"),ye.existsSync(m)||ye.writeFileSync(m,`<?xml version="1.0" encoding="UTF-8"?>
<Package xmlns="http://soap.sforce.com/2006/04/metadata">
    <version>58.0</version>
</Package>`,"utf8");let l=await G.workspace.openTextDocument(r);await G.window.showTextDocument(l),G.window.showInformationMessage("Ricwiz: destructiveChanges.xml generated successfully!")}catch(n){G.window.showErrorMessage(`Ricwiz: Error generating destructive changes: ${n.message}`)}})}var ae=C(require("vscode"));async function Mt(){let t=P();if(!t)return;let e=await S.initialize(t,{skipPrompt:!0}),o=e?e.ticketSourceBranch:ae.workspace.getConfiguration("ricwiz").get("ticketSourceBranch","main"),i=e?e.originRemote:"origin";await ae.window.withProgress({location:ae.ProgressLocation.Notification,title:"Ricwiz: Finding Apex Tests to run...",cancellable:!1},async()=>{try{let{stdout:n}=await f(`git diff --name-status ${i}/${o}...HEAD`,{cwd:t}),p=n.split(`
`).map(u=>u.trim()).filter(u=>u.length>0),s=new Set,c=new Set;for(let u of p){let g=u.split(/\s+/);if(g[0].startsWith("D"))continue;let h=g[1];if(h&&h.endsWith(".cls")){let w=h.match(/\/classes\/([^/.]+)\.cls/);if(w){let k=w[1];k.toLowerCase().endsWith("test")?s.add(k):c.add(k)}}}for(let u of c)s.add(`${u}Test`);if(s.size===0){ae.window.showInformationMessage("Ricwiz: No Apex Classes were modified in this branch.");return}let d=Array.from(s).map(u=>({label:`$(beaker) ${u}`,description:"Apex Test Class"})),a=await ae.window.showQuickPick(d,{canPickMany:!0,title:"Select Test Classes to Run",placeHolder:"Select tests..."});if(!a||a.length===0)return;let m=`sf apex run test -n ${a.map(u=>u.label.replace("$(beaker) ","").trim()).join(",")} -r human -w 30`,l=ae.window.createTerminal("Ricwiz: Smart Tests");l.show(),l.sendText(m)}catch(n){ae.window.showErrorMessage(`Ricwiz: Error finding tests: ${n.message}`)}})}var A=C(require("vscode"));var ze=class{static isValidShellArg(e){return e?/^[a-zA-Z0-9\-_/.]+$/.test(e):!1}};async function At(t){let e=P();if(!e){A.window.showErrorMessage("Open a folder or workspace that is a Git repository.");return}let o=await S.initialize(e,{forcePrompt:!0});if(!o)return;let i=typeof t=="string"?t:void 0,n=await Q(e,{prefix:o.ticketPrefix,suggestedValue:i});if(!n){A.window.showErrorMessage("Branch creation cancelled: Ticket not provided.");return}let{ticketId:p}=n,s=o.environments,c="";if(o.branchPrefix){let g=await A.window.showInputBox({prompt:"Ricwiz: Branch Prefix (leave empty to not use a prefix)",placeHolder:"e.g. CRC-R19-",value:o.branchPrefix,ignoreFocusOut:!0});if(g===void 0){A.window.showInformationMessage("Branch creation cancelled.");return}c=g.trim()}let d=c?`${c}${p}`:p,a=[{label:`$(git-branch) Main Branch (${d})`,description:`Base: ${o.ticketSourceBranch}`,picked:!0,type:"main",branchName:d}];for(let g of s){let h=c?`${c}${p}-to-${g.name}`:`${p}-to-${g.name}`;a.push({label:`$(cloud) ${g.name} (${h})`,description:`Base: ${g.sourceBranch}`,picked:!0,type:"env",branchName:h,envConfig:g})}let r=await A.window.showQuickPick(a,{placeHolder:"Ricwiz: Select branches to create (check/uncheck as needed)",canPickMany:!0,ignoreFocusOut:!0});if(!r||r.length===0){A.window.showInformationMessage("Branch creation cancelled: No branches selected.");return}let m=r.some(g=>g.type==="main"),l=r.filter(g=>g.type==="env").map(g=>({env:g.envConfig,branchName:g.branchName})),u=o.ticketSourceBranch;if(m){let g=[];try{let{stdout:x}=await f('git branch --all --format="%(refname:short)"',{cwd:e});g=x.split(`
`).map(b=>b.trim()).filter(b=>b&&b!=="origin"),g=[...new Set(g)]}catch{}let h=A.window.createQuickPick();h.title=`Ricwiz: Base Source Branch for '${d}'`,h.placeholder="Confirm or change the source branch for this ticket";let w=g.find(x=>x.endsWith(`/${o.ticketSourceBranch}`))??o.ticketSourceBranch;h.value=w,h.ignoreFocusOut=!0;let k=()=>{let x=h.value.trim(),b=[];x&&b.push({label:x,description:"Use typed branch"}),b.push(...g.map(T=>({label:T}))),h.items=b};h.onDidChangeValue(k),k();let v=await new Promise(x=>{h.onDidAccept(()=>{let b=h.selectedItems[0];x(b?b.label:h.value),h.hide()}),h.onDidHide(()=>x(void 0)),h.show()});if(!v){A.window.showInformationMessage("Branch creation cancelled.");return}u=v.trim()}if(m&&!ze.isValidShellArg(d)){A.window.showErrorMessage(`Invalid format for ticket ID: ${d}`);return}if(m&&!ze.isValidShellArg(u)){A.window.showErrorMessage(`Invalid format for ticketSourceBranch in settings: ${u}`);return}for(let g of l){if(!ze.isValidShellArg(g.env.name)){A.window.showErrorMessage(`Invalid format for environment name: ${g.env.name}`);return}if(!ze.isValidShellArg(g.env.sourceBranch)){A.window.showErrorMessage(`Invalid format for environment sourceBranch: ${g.env.sourceBranch}`);return}}try{await f("git status",{cwd:e})}catch{A.window.showErrorMessage("The opened folder does not appear to be a valid Git repository.");return}try{await A.window.withProgress({location:A.ProgressLocation.Notification,title:"Ricwiz: Creating Branches",cancellable:!1},async g=>{let h=[];g.report({message:"Checking remote status (git fetch)...",increment:10});try{await f("git fetch",{cwd:e})}catch{}try{if(m){if(g.report({message:`Creating main branch ${d}...`,increment:15}),await se(e,d))A.window.showInformationMessage(`Ricwiz: The branch ${d} already exists. Skipping creation...`),await f(`git checkout ${d}`,{cwd:e});else try{let k=o.getFetchRemote(u),v=o.getFetchBranch(u),x=o.buildUpstreamPath(u);await f(`git fetch ${k} ${v}`,{cwd:e}),await f(`git checkout -b ${d} ${x}`,{cwd:e}),h.push(d)}catch{try{await f(`git checkout -b ${d} ${u}`,{cwd:e}),h.push(d)}catch{throw new Error(`Could not create main branch '${d}' from '${u}'. Does the source branch exist?`)}}try{await f(`git config branch.${d}.ricwiz-source "${u}"`,{cwd:e}),o.profileName&&await f(`git config branch.${d}.ricwiz-profile "${o.profileName}"`,{cwd:e})}catch{}}if(l.length>0){let k=50/(l.length||1);for(let v of l){let x=v.branchName,b=v.env.sourceBranch;if(g.report({message:`Processing environment branch ${x}...`,increment:k}),!await se(e,x))try{let T=o.getFetchRemote(b),M=o.getFetchBranch(b),B=o.buildUpstreamPath(b);await f(`git fetch ${T} ${M}`,{cwd:e}),await f(`git checkout -b ${x} ${B}`,{cwd:e}),h.push(x)}catch{try{await f(`git checkout -b ${x} ${b}`,{cwd:e}),h.push(x)}catch{throw new Error(`Could not create environment branch '${x}' from '${b}'. Does the source branch exist?`)}}}}g.report({message:`Publishing branches to ${o.originRemote}...`,increment:15});for(let k of h)try{await f(`git push -u ${o.originRemote} ${k}`,{cwd:e})}catch{A.window.showWarningMessage(`Ricwiz: Branch ${k} was created locally but could not be pushed to ${o.originRemote}.`)}let w=m?d:l[0]?.branchName||"";if(w){g.report({message:`Switching to ${w}...`,increment:10});try{await f(`git checkout ${w}`,{cwd:e})}catch{}}g.report({increment:100}),A.window.showInformationMessage("Ricwiz: All set! You can start working on your branches! \u{1F680}")}catch(w){if(A.window.showErrorMessage(`Ricwiz Branch Creation Failed: ${w.message}`),h.length>0){try{await f(`git checkout ${u}`,{cwd:e})}catch{}for(let k of h)try{await f(`git branch -D ${k}`,{cwd:e})}catch{}A.window.showWarningMessage(`Ricwiz: Rolled back (deleted) ${h.length} branch(es) locally due to failure.`)}}})}catch(g){A.window.showErrorMessage(`Ricwiz general error: ${g.message}`)}}var U=C(require("vscode"));var be=C(require("vscode")),Ne=C(require("fs")),Je=C(require("path"));var ct;function at(t){ct=t}async function Lt(t){ct&&await ct(t)}async function Pe(t,e,o,i,n){i&&i.report({message:"CONFLICT! Resolve & click 'Commit & Continue' in Ricwiz panel."});let p=!1,s=!1;n&&n.onCancellationRequested(()=>{s=!0});let c=async()=>{try{let{stdout:r}=await f("git status --porcelain",{cwd:t});return r.split(`
`).filter(m=>{let l=m.substring(0,2);return["UD","DU","DD","AU","UA"].includes(l)}).map(m=>m.substring(3).trim())}catch{return[]}},d=async()=>{try{let r=l=>l==="UU"?"Both Modified":l==="UD"?"Deleted by them":l==="DU"?"Deleted by us":l==="DD"?"Both Deleted":l==="AA"?"Both Added":l==="AU"?"Added by us":l==="UA"?"Added by them":"Conflicted",{stdout:m}=await f("git status --porcelain",{cwd:t});return m.split(`
`).map(l=>l.trimEnd()).filter(l=>l.length>2).filter(l=>{let u=l.substring(0,2);return["UU","AA","UD","DU","AU","UA","DD"].includes(u)}).map(l=>{let u=l.substring(0,2);return{file:l.substring(3).trim(),state:r(u)}})}catch{return[]}},a=async()=>{if(p)return;let r=await c(),m=await d();ce&&ce.setConflictState({isConflict:!0,sourceStr:e,targetStr:o,deletionsCount:r.length,files:m})};for(at(async r=>{if(r==="abortDeploy")s=!0;else if(r==="resolveDeletions"){try{let l=(await c()).map(g=>({label:g})),u=await be.window.showQuickPick(l,{canPickMany:!0,placeHolder:"Select conflicted files to DELETE",title:"Ricwiz: Delete Conflicted Files"});if(u&&u.length>0){for(let g of u)try{await f(`git rm --force "${g.label}"`,{cwd:t})}catch{}be.window.showInformationMessage(`Ricwiz: Deleted ${u.length} conflicted file(s).`)}}catch(m){be.window.showErrorMessage(`Ricwiz: Error. (${m.message})`)}a()}else if(r==="commitAndContinue")try{let l=(await c()).filter(g=>Ne.existsSync(Je.join(t,g)));if(l.length>0&&await be.window.showWarningMessage(`Wait! There are ${l.length} file(s) with deletion conflicts that are still on your disk.

If you commit now, you will KEEP them in the project.

Are you sure you want to KEEP them?`,{modal:!0},"Yes, KEEP them","No, let me DELETE them")!=="Yes, KEEP them"){a();return}let u=!1;try{let{stdout:g}=await f('git grep -E "^<<<<<<< "',{cwd:t});g.trim().length>0&&(u=!0)}catch{}if(u){be.window.showErrorMessage("Ricwiz: You still have unresolved conflict markers (<<<<<<<) in your files. Please resolve them first!"),a();return}await f("git add .",{cwd:t}),await f("git commit --no-edit",{cwd:t})}catch(m){be.window.showErrorMessage(`Ricwiz: Could not commit automatically. (${m.message})`),a()}}),a();;){if(s){p=!0,at(void 0),ce?.setConflictState(null);try{await f("git merge --abort",{cwd:t})}catch{}return!1}try{let{stdout:r}=await f("git status --porcelain",{cwd:t}),m=r.split(`
`).some(w=>{let k=w.substring(0,2);return["UU","AA","UD","DU","AU","UA","DD"].includes(k)}),l=Je.join(t,".git","MERGE_HEAD"),u=Je.join(t,".git","REBASE_HEAD"),g=Je.join(t,".git","CHERRY_PICK_HEAD");if(!(m||Ne.existsSync(l)||Ne.existsSync(u)||Ne.existsSync(g)))return p=!0,at(void 0),ce?.setConflictState(null),be.window.showInformationMessage("Ricwiz: Changes committed!"),!0}catch{}await new Promise(r=>setTimeout(r,2e3))}}var et=C(require("https")),It=C(require("vscode"));async function mt(){let t=await Ce();return!!(t&&t.trim())}async function _o(t,e){let o=It.workspace.getConfiguration("ricwiz"),i=(await Ce())?.trim();if(!i)throw new Error("No GitLab token");let n=e?e.getConfig("gitlabUrlOverride",""):o.get("gitlabUrlOverride",""),p=[];if(n&&n.trim()!=="")p.push(n.trim());else try{let{stdout:c}=await f("git remote",{cwd:t}),d=c.split(`
`).map(r=>r.trim()).filter(r=>r),a=[];e&&e.upstreamRemote&&d.includes(e.upstreamRemote)&&a.push(e.upstreamRemote),e&&e.originRemote&&e.originRemote!==e.upstreamRemote&&d.includes(e.originRemote)&&a.push(e.originRemote),d.includes("upstream")&&!a.includes("upstream")&&a.push("upstream"),d.includes("origin")&&!a.includes("origin")&&a.push("origin"),a.length===0&&d.length>0&&a.push(...d);for(let r of a)try{let{stdout:m}=await f(`git remote get-url ${r}`,{cwd:t}),l=m.trim();l.endsWith(".git")&&(l=l.slice(0,-4)),l.startsWith("git@")&&(l=l.replace("git@","").replace(":","/"),l=`https://${l}`),p.push(l)}catch(m){R.appendLine(`[GitLab API] Error getting remote URL for ${r}: ${m.message}`)}}catch(c){R.appendLine(`[GitLab API] Error getting remotes: ${c.message}`)}if(p.length===0)throw R.appendLine("[GitLab API] No candidate URLs found in getGitlabTargets!"),new Error("Could not get any remote origin URL.");return p.map(c=>{let d=new URL(c),a=`${d.protocol}//${d.host}`,r=d.pathname;r.startsWith("/")&&(r=r.substring(1)),r.endsWith("/")&&(r=r.slice(0,-1)),r.endsWith(".git")&&(r=r.slice(0,-4));let m=encodeURIComponent(r);return{baseUrl:a,token:i,projectPath:m}})}var Qo=new et.Agent({keepAlive:!0,maxSockets:10});async function dt(t,e,o,i){let n=new URL(`${t}${i}`);return R.appendLine(`[GitLab API] ${o} ${n.toString()}`),new Promise((p,s)=>{let c=et.request(n,{method:o,timeout:5e3,agent:Qo,headers:{"PRIVATE-TOKEN":e,Accept:"application/json"}},d=>{let a="";d.on("data",r=>a+=r),d.on("end",()=>{if(R.appendLine(`[GitLab API] Response Code: ${d.statusCode}`),d.statusCode&&d.statusCode>=400)return R.appendLine(`[GitLab API] Error Data: ${a}`),s(new Error(`GitLab API error: ${d.statusCode}`));if(!a)return p({});try{let r=JSON.parse(a);Array.isArray(r)?R.appendLine(`[GitLab API] Returned array with ${r.length} items`):r&&typeof r=="object"&&R.appendLine(`[GitLab API] Returned object with id ${r.id||r.iid||"unknown"}`),p(r)}catch(r){R.appendLine(`[GitLab API] Parse Error: ${r.message}`),s(r)}})});c.on("timeout",()=>{c.destroy(),s(new Error("GitLab request timed out"))}),c.on("error",d=>{R.appendLine(`[GitLab API] Request Failed: ${d.message}`),s(d)}),c.end()})}var lt=new Map,Yo=30*1e3;async function pt(t,e,o,i){R.appendLine(`[GitLab API] fetchMergeRequestStatus called for source: ${e}, target: ${o||"any"}`);let n=`${t}:${e}:${o||"any"}`,p=lt.get(n);if(p&&Date.now()-p.timestamp<Yo)return p.data;try{let s=await _o(t,i),c=null,d=-1;for(let a of s)try{let r=`/api/v4/projects/${a.projectPath}/merge_requests?source_branch=${encodeURIComponent(e)}&order_by=updated_at&sort=desc`;o&&(r+=`&target_branch=${encodeURIComponent(o)}`);let m=await dt(a.baseUrl,a.token,"GET",r);if(m&&m.length>0){let l=m[0];try{let w=await dt(a.baseUrl,a.token,"GET",`/api/v4/projects/${a.projectPath}/merge_requests/${l.iid}`);w&&(l=w)}catch{}let u="none";if(l.head_pipeline&&l.head_pipeline.status){let w=l.head_pipeline.status;w==="success"||w==="failed"||w==="canceled"||w==="skipped"?u=w:u="running"}let g={isMerged:l.state==="merged",isOpen:l.state==="opened",pipelineStatus:u,webUrl:l.web_url,projectPath:a.projectPath,pipelineId:l.head_pipeline?l.head_pipeline.id:void 0},h=0;g.isOpen?h=2:g.isMerged&&(h=1),h>d&&(c=g,d=h)}}catch(r){R.appendLine(`[GitLab API] Error inside target loop: ${r.message}`)}if(c)return lt.set(n,{data:c,timestamp:Date.now()}),c;for(let a of s)try{let r=`/api/v4/projects/${a.projectPath}/pipelines?ref=${encodeURIComponent(e)}&order_by=updated_at&sort=desc`,m=await dt(a.baseUrl,a.token,"GET",r);if(m&&m.length>0){let l=m[0],u="none";if(l.status){let h=l.status;h==="success"||h==="failed"||h==="canceled"||h==="skipped"?u=h:u="running"}let g={isMerged:!1,isOpen:!1,pipelineStatus:u,webUrl:l.web_url,projectPath:a.projectPath,pipelineId:l.id};return lt.set(n,{data:g,timestamp:Date.now()}),g}}catch{}return null}catch(s){return R.appendLine(`[GitLab API] Failed to fetch MR status: ${s.message}`),null}}function Ft(t,e){return e.find(o=>t.endsWith(`-to-${o.name}`))}async function Be(t,e,o,i,n){let p=await mt(),s=e.map(async c=>{let d=Ft(c,i);if(p){let a=d?d.sourceBranch:void 0,r=await pt(t,c,a,n);if(r)return{name:c,isMerged:r.isMerged,pipelineStatus:r.pipelineStatus,mrUrl:r.webUrl,projectPath:r.projectPath,pipelineId:r.pipelineId}}else R.appendLine(`[GitLab API] Skipping MR check for ${c} because hasGitlabToken() is false`);return{name:c,isMerged:!1,pipelineStatus:"none"}});return await Promise.all(s)}async function Ut(t,e,o,i){let n=Ft(e,o);if(!n)return!1;if(await mt()){let p=await pt(t,e,n.sourceBranch,i);if(p)return p.isMerged}else R.appendLine(`[GitLab API] Skipping MR check for current branch ${e} because hasGitlabToken() is false`);return!1}async function Ot(t,e=10){try{let{stdout:o}=await f(`git log --oneline -${e} --format="%h|||%s|||%ar"`,{cwd:t});return o.split(`
`).filter(i=>i.trim()).map(i=>{let n=i.split("|||");return{hash:n[0]||"",message:n.length>=3?n.slice(1,-1).join("|||"):n[1]||"",timeAgo:n.length>=3?n[n.length-1]:""}})}catch{return[]}}async function Nt(t,e=3){try{let{stdout:o}=await f('git for-each-ref --sort=-committerdate --format="%(refname:short)" refs/heads/',{cwd:t}),i=o.split(`
`).map(p=>p.trim()).filter(p=>p),n=/^[A-Z]+-\d+$/i;return i.filter(p=>n.test(p)).slice(0,e)}catch{return[]}}async function Se(t,e,o){let{stdout:i}=await f(`git branch --all --list "*${e}*"`,{cwd:t}),n=new Set,p=new RegExp(`${e}(?!\\d)`,"i");return i.split(`
`).forEach(s=>{let c=s.replace("*","").trim();if(c){if(c.startsWith("remotes/")){let d=c.split("/");d.length>2&&(c=d.slice(2).join("/"))}c&&c!==o&&!c.includes("HEAD")&&p.test(c)&&n.add(c)}}),Array.from(n)}async function de(t,e,o){try{let{stdout:i}=await f(`git branch --all --list "*${e}*"`,{cwd:t}),n=new RegExp(`${e}(?!\\d)`,"i"),p=i.split(`
`).map(c=>c.replace("*","").trim().replace(/^remotes\/[^\/]+\//,"")).filter(c=>c&&!c.includes("HEAD")&&n.test(c)),s=Array.from(new Set(p));if(o){let c=`-to-${o}`,d=s.find(a=>a.endsWith(c));return d||`${e}${c}`}else{let c=s.find(d=>!d.includes("-to-"));return c||e}}catch{return o?`${e}-to-${o}`:e}}async function Jt(){let t=P();if(!t){U.window.showErrorMessage("Ricwiz: Open a folder or workspace that is a Git repository.");return}try{await f("git status",{cwd:t})}catch{U.window.showErrorMessage("Ricwiz: The opened folder does not appear to be a valid Git repository.");return}let e=await S.initialize(t);if(!e)return;let o=e.environments,i=await Q(t,{prefix:e.ticketPrefix});if(!i){U.window.showErrorMessage("Operation cancelled: Ticket not provided.");return}let{ticketId:n,currentBranch:p}=i;try{await f("git fetch --all",{cwd:t})}catch{}let s=await de(t,n);if(!await se(t,s)){U.window.showErrorMessage(`Ricwiz: Main branch '${s}' does not exist! Prepare deploy is only available when a main ticket branch is used.`);return}let c=[];for(let l of o){let u=await de(t,n,l.name);await se(t,u)&&c.push({env:l,branchName:u})}let d=c.length===0,a="";if(d){let l="";try{let{stdout:g}=await f(`git config branch.${s}.ricwiz-source`,{cwd:t});l=g.trim()}catch{}if(!l&&s.includes(n)&&s!==n){let g=s.split(n)[0].replace(/[-_]+$/,"");g&&(l=g)}l||(l=e.ticketSourceBranch||"main");let u=await U.window.showInputBox({prompt:`Ricwiz: Confirm or enter the Release branch in '${e.originRemote}' to merge into '${s}'`,placeHolder:"e.g. CRC-R19, main, release/v5.0",value:l,ignoreFocusOut:!0});if(u===void 0||!u.trim()){U.window.showInformationMessage("Ricwiz: Prepare deploy cancelled.");return}a=u.trim();try{await f(`git config branch.${s}.ricwiz-source "${a}"`,{cwd:t})}catch{}}let r=e.getConfig("defaultReviewers",""),m="";try{let{stdout:l}=await f(`git config branch.${s}.ricwiz-reviewers`,{cwd:t});m=l.trim()}catch{}if(r.trim()){let l=await U.window.showInputBox({prompt:"Ricwiz: Reviewers for this deploy (optional, comma-separated)",placeHolder:"e.g. @joao, 123456",value:m||r,ignoreFocusOut:!0});if(l===void 0)return;try{l.trim()?await f(`git config branch.${s}.ricwiz-reviewers "${l.trim()}"`,{cwd:t}):m&&await f(`git config --unset branch.${s}.ricwiz-reviewers`,{cwd:t})}catch{}}await U.window.withProgress({location:U.ProgressLocation.Notification,title:"Ricwiz: Preparing Deploy",cancellable:!0},async(l,u)=>{let g=0,h=p,w=!1;u.onCancellationRequested(()=>{w=!0});let k=async(v,x)=>{try{await f(`git merge ${v}`,{cwd:t})}catch(b){let T=!1;try{let{stdout:B}=await f("git ls-files -u",{cwd:t});B.trim().length>0&&(T=!0)}catch{}let M=((b.stdout||"")+(b.stderr||"")+(b.message||"")).toLowerCase();if(T||M.includes("conflict")||M.includes("conflit")){if(!await Pe(t,v,x,l,u))throw w=!0,new Error("Deploy aborted by user.")}else throw b}};if(d)try{l.report({message:`Fetching ${a} from ${e.originRemote}...`,increment:15}),await f(`git fetch ${e.originRemote} ${a}`,{cwd:t}),l.report({message:`Switching to ${s}...`,increment:15}),await f(`git checkout ${s}`,{cwd:t});try{await f(`git pull ${e.originRemote} ${s}`,{cwd:t})}catch{}if(l.report({message:`Merging ${e.originRemote}/${a} into ${s}...`,increment:35}),await k(`${e.originRemote}/${a}`,s),w)return;l.report({message:`Pushing ${s} to ${e.originRemote}...`,increment:25}),await f(`git push ${e.originRemote} ${s}`,{cwd:t}),l.report({message:"Finishing up...",increment:10}),U.window.showInformationMessage(`Ricwiz: Release branch '${a}' merged into '${s}' and pushed to ${e.originRemote}! \u{1F680}`)}catch(v){v.message?.includes("aborted")?U.window.showInformationMessage("Ricwiz: Deploy cancelled."):U.window.showErrorMessage(`Ricwiz: Failed to prepare release ticket ${s}. Detail: ${v.message}`)}else{l.report({message:"Syncing remote information...",increment:10});try{let x=10/(c.length||1);for(let b of c)try{if(w)throw new Error("Aborted");l.report({message:`Fetching ${b.env.sourceBranch}...`,increment:x});let T=e.getFetchRemote(b.env.sourceBranch),M=e.getFetchBranch(b.env.sourceBranch);await f(`git fetch ${T} ${M}`,{cwd:t})}catch{}}catch{}let v=60/(c.length||1);for(let x of c){if(w)break;let b=x.branchName,T=x.env.sourceBranch;try{l.report({message:`Processing ${b}...`,increment:v/4}),await f(`git checkout ${b}`,{cwd:t});try{await f(`git pull ${e.originRemote} ${b}`,{cwd:t})}catch{}l.report({message:`Merging ${T} into ${b}...`,increment:v/4});let M=e.getFetchRemote(T),B=e.getFetchBranch(T),O=e.buildUpstreamPath(T);if(await f(`git fetch ${M} ${B}`,{cwd:t}),await k(O,b),l.report({message:`Merging ${s} into ${b}...`,increment:v/4}),await k(s,b),w)break;l.report({message:`Pushing ${b}...`,increment:v/4}),await f(`git push ${e.originRemote} ${b}`,{cwd:t}),g++}catch(M){M.message.includes("aborted")?U.window.showInformationMessage("Ricwiz: Deploy cancelled."):U.window.showErrorMessage(`Ricwiz: Failed to process branch ${b}. Detail: ${M.message}`);return}}if(!w){l.report({message:"Finishing up...",increment:10});let x=h;try{await f(`git show-ref --verify --quiet refs/heads/${s}`,{cwd:t}),x=s}catch{}try{let b=await I(t);x&&x!==b?(await f(`git checkout ${x}`,{cwd:t}),U.window.showInformationMessage(`Ricwiz: Operation complete. Back on branch ${x}.`)):U.window.showInformationMessage("Ricwiz: Operation complete.")}catch{U.window.showInformationMessage("Ricwiz: Operation complete.")}}}})}var oe=C(require("vscode"));async function jt(t=!1){let e=P();if(!e)return;let o=await S.initialize(e);if(!o)return;let i=await Q(e,{prefix:o.ticketPrefix,prompt:"Enter the full ticket ID for the Merge Requests (e.g., SFPSCA-1234) or just the number"});if(!i)return;let{ticketId:n}=i,p=o.getConfig("gitlabUrlOverride",""),s="";if(p&&p.trim()!=="")s=p.trim().replace(/\/+$/,"");else{let r="";try{let m=o.originRemote||"origin",{stdout:l}=await f(`git remote get-url ${m}`,{cwd:e});r=l.trim()}catch{oe.window.showErrorMessage("Ricwiz: Could not get the remote origin URL. Please configure the URL manually in the extension settings.");return}s=r,s.endsWith(".git")&&(s=s.slice(0,-4)),s.startsWith("git@")?(s=s.replace("git@","").replace(":","/"),s=`https://${s}`):s.startsWith("ssh://git@")&&(s=s.replace("ssh://git@","https://"))}let c=[],d=await de(e,n),a=[];for(let r of o.environments){let m=await de(e,n,r.name);await se(e,m)&&a.push({envName:r.name,source:m,target:r.sourceBranch})}if(a.length===0){let r="";try{if(d){let{stdout:u}=await f(`git config branch.${d}.ricwiz-source`,{cwd:e});u.trim()&&(r=u.trim())}}catch{}if(!r&&d.includes(n)&&d!==n){let u=d.split(n)[0].replace(/[-_]+$/,"");u&&(r=u)}r||(r=o.ticketSourceBranch||"main");let m=await oe.window.showInputBox({prompt:`Ricwiz: Confirm or enter the Target Release branch in GitLab for '${d}'`,placeHolder:"e.g. CRC-R19, main, release/v5.0",value:r,ignoreFocusOut:!0});if(m===void 0||!m.trim()){oe.window.showInformationMessage("Ricwiz: Merge request creation cancelled.");return}let l=m.trim();try{await f(`git config branch.${d}.ricwiz-source "${l}"`,{cwd:e})}catch{}c.push({source:d,target:l})}else for(let r of a)c.push({source:r.source,target:r.target});for(let r of c){let m=`${s}/-/merge_requests/new?merge_request[source_branch]=${encodeURIComponent(r.source)}&merge_request[target_branch]=${encodeURIComponent(r.target)}`;t?oe.commands.executeCommand("simpleBrowser.show",m):oe.env.openExternal(oe.Uri.parse(m))}oe.window.showInformationMessage(`Ricwiz: Opening ${c.length} Merge Request(s) in ${t?"VS Code browser":"external browser"}!`)}async function Wt(){return jt(!1)}async function Gt(){return jt(!0)}var ie=C(require("vscode"));async function Ht(t=!1){let e=P();if(!e)return;let o=ie.workspace.getConfiguration("ricwiz"),i=o.get("jiraUrl","");if(!i||i.trim()===""){ie.window.showErrorMessage("Ricwiz: Jira URL is not configured. Please set it in the extension settings (e.g., https://jira.company.com/browse/).");return}let n=await I(e),p=o.get("ticketPrefix","SFPSCA-"),s=te(n,p),d=pe(n,s,!0);if(d)d=st(d,s);else{let r=await Q(e,{prompt:"Ricwiz could not detect the ticket from the branch name. Enter Jira ticket ID (e.g. SFPSCA-1234)",handleToSuffix:!0});if(!r)return;d=r.ticketId}let a=i.trim();a.endsWith("/")||(a+="/"),a+=d,t?ie.commands.executeCommand("simpleBrowser.show",a):ie.env.openExternal(ie.Uri.parse(a)),ie.window.showInformationMessage(`Ricwiz: Opening Jira Ticket ${d} in ${t?"VS Code":"browser"}!`)}async function Vt(){return Ht(!1)}async function qt(){return Ht(!0)}var Y=C(require("vscode"));var _t=C(require("https")),Qt=C(require("vscode"));async function Yt(){J("getJiraAuthAndBaseUrl: Starting...");let t=Qt.workspace.getConfiguration("ricwiz"),e=t.get("jiraUrl",""),o=t.get("jiraEmail","")?.trim();J("getJiraAuthAndBaseUrl: Calling getJiraToken()...");let i=(await Ye())?.trim();if(!i&&process.env.RICWIZ_JIRA_TOKEN&&(J("getJiraAuthAndBaseUrl: Token not found in secretStorage, using process.env"),i=process.env.RICWIZ_JIRA_TOKEN.trim()),!e||!i)throw J(`getJiraAuthAndBaseUrl: FAILED. URL: "${e}", hasToken: ${!!i}`),new Error(`[v5.2.0] Jira API Token is not securely configured. URL: "${e}", hasToken: ${!!i}`);let n=e;n.includes("/browse")&&(n=n.split("/browse")[0]),n.endsWith("/")&&(n=n.slice(0,-1));let p=o?`Basic ${Buffer.from(`${o}:${i}`).toString("base64")}`:`Bearer ${i}`;return{baseUrl:n,headerAuth:p}}async function Te(t,e,o){let{baseUrl:i,headerAuth:n}=await Yt(),p=new URL(`${i}${e}`);return new Promise((s,c)=>{let d=_t.request(p,{method:t,headers:{Authorization:n,Accept:"application/json",...o?{"Content-Type":"application/json"}:{}}},a=>{let r="";a.on("data",m=>r+=m),a.on("end",()=>{if(a.statusCode===401||a.statusCode===403)return c(new Error(`Authentication failed (HTTP ${a.statusCode}). Please check your Jira settings.`));if(a.statusCode&&a.statusCode>=400){let m="";try{let l=JSON.parse(r);l.errorMessages&&l.errorMessages.length>0&&(m=l.errorMessages.join(", "))}catch{}return a.statusCode===404||a.statusCode===410?c(new Error(`Ticket not found or deleted (HTTP ${a.statusCode}). ${m}`)):c(new Error(`Jira API returned HTTP status ${a.statusCode}. ${m}`))}if(!r)return s({});try{let m=JSON.parse(r);s(m)}catch{c(new Error("Failed to parse Jira response."))}})});d.on("error",a=>c(new Error(`Network error: ${a.message}`))),o&&d.write(JSON.stringify(o)),d.end()})}async function Ie(t){let{baseUrl:e}=await Yt(),o=await Te("GET",`/rest/api/2/issue/${t}`);return o&&o.fields?{summary:o.fields.summary||"",description:o.fields.description||"No description provided.",status:o.fields.status?.name||"Unknown",url:`${e}/browse/${t}`}:null}async function Zt(t){let e=await Te("GET",`/rest/api/2/issue/${t}/transitions`);return e&&e.transitions?e.transitions.map(o=>({id:o.id,name:o.name})):[]}async function Kt(t,e){await Te("POST",`/rest/api/2/issue/${t}/transitions`,{transition:{id:e}})}async function Xt(t,e){await Te("POST",`/rest/api/2/issue/${t}/comment`,{body:e})}async function eo(t,e){await Te("PUT",`/rest/api/2/issue/${t}`,{update:{labels:[{add:e}]}})}async function to(t){let e=await Te("POST","/rest/api/3/search/jql",{jql:t,maxResults:50,fields:["summary","status","assignee"]});return e&&e.issues?e.issues.map(o=>({key:o.key,summary:o.fields?.summary||"No Title",status:o.fields?.status?.name||"Unknown",assignee:o.fields?.assignee?.displayName||"Unassigned"})):[]}function oo(t){if(!t||typeof t!="object")return"";let e=t;if(e.type==="text")return typeof e.text=="string"?e.text:"";let o="";if(Array.isArray(e.content))for(let i of e.content){let n=oo(i);n&&(o+=n+" ")}return o.trim()}async function tt(t){if(t.length===0)return[];let e=`issueKey IN (${t.join(",")})`,o=await Te("POST","/rest/api/3/search/jql",{jql:e,maxResults:15,fields:["summary","description","parent","subtasks","issuelinks","issuetype","status","assignee","priority","labels","fixVersions"]});return!o||!o.issues?[]:o.issues.map(i=>{let n=i.fields?.parent,p=n?{key:n.key,title:n.fields?.summary||""}:void 0,s=(i.fields?.subtasks??[]).map(a=>({key:a.key,title:a.fields?.summary||""})),c=(i.fields?.issuelinks??[]).map(a=>a.outwardIssue?{type:a.type?.outward||"relates to",issue:{key:a.outwardIssue.key,title:a.outwardIssue.fields?.summary||""}}:{type:a.type?.inward||"relates to",issue:{key:a.inwardIssue.key,title:a.inwardIssue.fields?.summary||""}}),d=(i.fields?.fixVersions??[]).map(a=>a.name).filter(Boolean);return{key:i.key,title:i.fields?.summary||"",type:i.fields?.issuetype?.name||"",status:i.fields?.status?.name||"",assignee:i.fields?.assignee?.displayName||"",priority:i.fields?.priority?.name||"",labels:i.fields?.labels||[],fixVersions:d,description:oo(i.fields?.description),parent:p,subtasks:s,issueLinks:c}})}async function io(t){let e=P();if(e)try{let o=await S.initialize(e);if(!o)return;let i=await I(e),n=te(i,o.ticketPrefix),p=pe(i,n,!0);if(p||(p=i.split("-to-")[0]),!p){Y.window.showErrorMessage("Ricwiz: You are not currently on a valid ticket branch.");return}await Y.window.withProgress({location:Y.ProgressLocation.Notification,title:`Fetching details for ${p}...`,cancellable:!1},async()=>{let s=await Ie(p);if(s){let c=[];try{let d=o.environments||Y.workspace.getConfiguration("ricwiz").get("environments",[{name:"Qual",sourceBranch:"quality"},{name:"Val",sourceBranch:"validation"},{name:"Prod",sourceBranch:"main"}]),a=await Se(e,p,"");c=await Be(e,a,p,d,o)}catch{}t.setJiraData({ticketId:p,relatedBranches:c,...s}),t.setPage("jira")}else Y.window.showErrorMessage("Ricwiz: No data found for this ticket.")})}catch(o){o.message&&o.message.includes("securely configured")?await Y.window.showErrorMessage(o.message,"Set Token Now")==="Set Token Now"&&Y.commands.executeCommand("ricwiz.setJiraToken"):Y.window.showErrorMessage(`Ricwiz Jira Error: ${o.message}`)}}var ue=C(require("vscode"));var De=0;async function no(t,e){let o=ue.workspace.getConfiguration("ricwiz"),i=o.get("jiraDashboards",[]);if(e!==void 0&&(De=e),!i||i.length===0){t.setDashboardData({queries:[],selectedIndex:0,results:[],error:"No queries defined in settings. Go to Settings > Ricwiz > Jira Dashboards."}),t.setPage("dashboard");return}De>=i.length&&(De=0);let n=i[De];t.setDashboardData({queries:i,selectedIndex:De,results:[],error:"\u23F3 Loading tickets..."}),t.setPage("dashboard");try{let p=await to(n.jql),s=P(),c=[],d=t.getDashboardShowBranches();if(s)try{let{stdout:r}=await f("git branch",{cwd:s});c=r.split(`
`).map(m=>m.replace("*","").trim()).filter(m=>m)}catch{}let a=[];if(d&&s)try{let r=await S.initialize(s,{skipPrompt:!0}),m=r?.environments||o.get("environments",[{name:"Qual",sourceBranch:"quality"},{name:"Val",sourceBranch:"validation"},{name:"Prod",sourceBranch:"main"}]);a=await Promise.all(p.map(async l=>{let u=await Se(s,l.key,""),g=await Be(s,u,l.key,m,r);return{...l,detailedBranches:g}}))}catch{a=p}else a=p.map(r=>{let m=c.find(l=>l.includes(r.key));return{...r,branch:m||null}});t.setDashboardData({queries:i,selectedIndex:De,results:a,error:null}),t.setPage("dashboard")}catch(p){let s=p.message;s&&(s.includes("ENOTFOUND")||s.includes("network"))&&(s="No Internet or Invalid URL"),t.setDashboardData({queries:i,selectedIndex:De,results:[],error:s}),t.setPage("dashboard")}}async function ro(t,e){await ue.window.withProgress({location:ue.ProgressLocation.Notification,title:`Fetching details for ${e}...`,cancellable:!1},async()=>{try{let o=await Ie(e);if(o){let i=[],n=P();if(n)try{let p=await S.initialize(n,{skipPrompt:!0}),s=p?.environments||ue.workspace.getConfiguration("ricwiz").get("environments",[{name:"Qual",sourceBranch:"quality"},{name:"Val",sourceBranch:"validation"},{name:"Prod",sourceBranch:"main"}]),c=await Se(n,e,"");i=await Be(n,c,e,s,p)}catch{}t.setJiraData({ticketId:e,relatedBranches:i,...o}),t.setPage("jira")}else ue.window.showErrorMessage(`Ricwiz: No data found for ticket ${e}.`)}catch(o){ue.window.showErrorMessage(`Ricwiz Jira Error: ${o.message}`)}})}var D=C(require("vscode"));async function ut(){let t=P();if(!t)return;let e=await S.initialize(t,{forcePrompt:!1});if(!e)return;let o=await I(t);if(!o)return;let i=te(o,e.ticketPrefix),n=pe(o,i,!0);return n||o.split("-to-")[0]}function gt(t){t.message&&t.message.includes("securely configured")?D.window.showErrorMessage(t.message,"Set Token Now").then(e=>{e==="Set Token Now"&&D.commands.executeCommand("ricwiz.setJiraToken")}):D.window.showErrorMessage(`Ricwiz Jira Error: ${t.message}`)}async function so(){try{let t=await ut();if(!t){D.window.showErrorMessage("Ricwiz: You are not on a valid ticket branch.");return}let e=await D.window.withProgress({location:D.ProgressLocation.Notification,title:`Fetching available status for ${t}...`,cancellable:!1},()=>Zt(t));if(!e||e.length===0){D.window.showInformationMessage(`Ricwiz: No transitions available for ${t}.`);return}let o=e.map(n=>({label:n.name,id:n.id})),i=await D.window.showQuickPick(o,{placeHolder:`Select new status for ${t}`,ignoreFocusOut:!0});i&&(await D.window.withProgress({location:D.ProgressLocation.Notification,title:`Updating status to ${i.label}...`,cancellable:!1},()=>Kt(t,i.id)),D.window.showInformationMessage(`Ricwiz: Status for ${t} updated to ${i.label}.`))}catch(t){gt(t)}}async function ao(){try{let t=await ut();if(!t){D.window.showErrorMessage("Ricwiz: You are not on a valid ticket branch.");return}let e=await D.window.showInputBox({prompt:`Add comment to ${t}`,placeHolder:"Type your comment here...",ignoreFocusOut:!0});e&&(await D.window.withProgress({location:D.ProgressLocation.Notification,title:`Adding comment to ${t}...`,cancellable:!1},()=>Xt(t,e)),D.window.showInformationMessage(`Ricwiz: Comment added to ${t}.`))}catch(t){gt(t)}}async function co(){try{let t=await ut();if(!t){D.window.showErrorMessage("Ricwiz: You are not on a valid ticket branch.");return}let e=await D.window.showInputBox({prompt:`Add a label to ${t}`,placeHolder:"e.g. Needs-Review, Bug, High-Priority",ignoreFocusOut:!0});e&&e.trim()&&(await D.window.withProgress({location:D.ProgressLocation.Notification,title:`Adding label to ${t}...`,cancellable:!1},()=>eo(t,e.trim())),D.window.showInformationMessage(`Ricwiz: Label '${e.trim()}' added to ${t}.`))}catch(t){gt(t)}}async function lo(){let t=await D.window.showInputBox({prompt:"Enter your Jira API Token (or Personal Access Token). It will be stored in your global VS Code settings.",password:!0,ignoreFocusOut:!0});if(t)try{await Pt(t.trim()),D.window.showInformationMessage("Ricwiz: Jira API Token securely stored!")}catch(e){D.window.showErrorMessage(`Ricwiz: Failed to store token: ${e.message}`)}}var H=C(require("vscode")),mo=C(require("https"));async function po(){let t=await H.window.showInputBox({prompt:"Enter your GitLab Personal Access Token",placeHolder:"glpat-xxxxxxxxxxxxxxxxxxxx",ignoreFocusOut:!0,password:!0});if(t&&t.trim()){let e=t.trim();await H.window.withProgress({location:H.ProgressLocation.Notification,title:"Ricwiz: Validating GitLab Token...",cancellable:!1},async()=>{try{let i=H.workspace.getConfiguration("ricwiz").get("gitlabUrlOverride","").trim();if(!i&&H.workspace.workspaceFolders)try{let c=H.workspace.workspaceFolders[0].uri.fsPath,{stdout:d}=await f("git remote get-url origin",{cwd:c}),a=d.trim();a.startsWith("git@")&&(a=`https://${a.replace("git@","").replace(":","/")}`),a.endsWith(".git")&&(a=a.slice(0,-4)),i=a}catch{}i||(i="https://gitlab.com");let n=new URL(i),p=`${n.protocol}//${n.host}`,s=await new Promise((c,d)=>{let a=mo.request(new URL(`${p}/api/v4/user`),{method:"GET",timeout:5e3,headers:{"PRIVATE-TOKEN":e,Accept:"application/json"}},r=>{if(r.statusCode>=400)return d(new Error(`Status ${r.statusCode}`));let m="";r.on("data",l=>m+=l),r.on("end",()=>c(JSON.parse(m||"{}")))});a.on("error",d),a.on("timeout",()=>{a.destroy(),d(new Error("Timeout"))}),a.end()});await Bt(e),H.window.showInformationMessage(`Ricwiz: \u2705 GitLab API Token saved and validated successfully for ${s.username||"user"}!`),H.commands.executeCommand("ricwiz.manualRefresh")}catch(o){H.window.showErrorMessage(`Ricwiz: \u274C Invalid token or cannot reach GitLab (${o.message}). Please check the token and try again.`)}})}}var ge=C(require("vscode"));async function uo(){let t=P();if(!t){ge.window.showErrorMessage("Ricwiz: Open a folder or workspace that is a Git repository.");return}let e=await S.initialize(t);if(!e)return;let o=await Q(t,{prefix:e.ticketPrefix,prompt:"Enter the full ticket ID to sync all branches for (e.g., SCPSCA-1234) or just the number"});if(!o)return;let{ticketId:i,currentBranch:n}=o;await ge.window.withProgress({location:ge.ProgressLocation.Notification,title:`Ricwiz: Syncing all branches for ${i}...`,cancellable:!1},async p=>{try{p.report({message:"Fetching from remote..."});try{await f("git fetch --all",{cwd:t})}catch{}let{stdout:s}=await f(`git branch --list "*${i}*"`,{cwd:t}),c=new RegExp(`${i}(?!\\d)`,"i"),d=s.split(`
`).map(m=>m.replace("*","").trim()).filter(m=>m.length>0&&c.test(m));if(d.length===0){ge.window.showWarningMessage(`Ricwiz: No local branches found for ${i}.`);return}let a=0,r=0;for(let m of d)if(p.report({message:`Syncing ${m}...`}),m===n)try{await f(`git pull ${e.originRemote} ${m}`,{cwd:t}),a++}catch(l){let u=!1;try{let{stdout:h}=await f("git ls-files -u",{cwd:t});h.trim().length>0&&(u=!0)}catch{}let g=((l.stdout||"")+(l.stderr||"")+(l.message||"")).toLowerCase();(u||g.includes("conflict")||g.includes("conflit"))&&await Pe(t,`${e.originRemote}/${m}`,m,p)?a++:r++}else try{await f(`git fetch ${e.originRemote} ${m}:${m}`,{cwd:t}),a++}catch{try{await f(`git checkout ${m}`,{cwd:t});try{await f(`git pull ${e.originRemote} ${m}`,{cwd:t}),a++}catch(u){let g=!1;try{let{stdout:w}=await f("git ls-files -u",{cwd:t});w.trim().length>0&&(g=!0)}catch{}let h=((u.stdout||"")+(u.stderr||"")+(u.message||"")).toLowerCase();(g||h.includes("conflict")||h.includes("conflit"))&&await Pe(t,`${e.originRemote}/${m}`,m,p)?a++:r++}await f(`git checkout ${n}`,{cwd:t})}catch{try{await f(`git checkout ${n}`,{cwd:t})}catch{}r++}}r>0?ge.window.showWarningMessage(`Ricwiz: Synced ${a}/${d.length} branches. ${r} branch(es) could not be synced (possible conflicts or diverged history).`):ge.window.showInformationMessage(`Ricwiz: \u{1F504} All ${a} branches for ${i} are up to date!`)}catch(s){ge.window.showErrorMessage(`Ricwiz: Sync failed: ${s.message}`)}})}var fe=C(require("vscode"));async function go(){let t=P();if(!t){fe.window.showErrorMessage("Ricwiz: Open a folder or workspace that is a Git repository.");return}try{await f("git status",{cwd:t})}catch{fe.window.showErrorMessage("Ricwiz: The opened folder does not appear to be a valid Git repository.");return}let e=await S.initialize(t);if(!e)return;let o=e.environments,i=await Q(t,{prefix:e.ticketPrefix});if(!i)return;let{ticketId:n,currentBranch:p}=i;await fe.window.withProgress({location:fe.ProgressLocation.Notification,title:"Ricwiz: Updating environment branches from their bases",cancellable:!0},async(s,c)=>{let d=0,a=p,r=!1;c.onCancellationRequested(()=>{r=!0}),s.report({message:"Syncing remote information...",increment:10});try{await f("git fetch --all",{cwd:t})}catch{}let m=80/(o.length||1);for(let l of o){if(r)break;let u=await de(t,n,l.name),g=l.sourceBranch;if(await se(t,u))try{s.report({message:`Processing ${u}...`,increment:m/2}),await f(`git checkout ${u}`,{cwd:t});try{s.report({message:`Merging ${g} into ${u}...`,increment:m/2});let h=e.getFetchRemote(g),w=e.getFetchBranch(g),k=e.buildUpstreamPath(g);await f(`git fetch ${h} ${w}`,{cwd:t}),await f(`git merge ${k}`,{cwd:t})}catch(h){let w=!1;try{let{stdout:v}=await f("git ls-files -u",{cwd:t});v.trim().length>0&&(w=!0)}catch{}let k=((h.stdout||"")+(h.stderr||"")+(h.message||"")).toLowerCase();if(w||k.includes("conflict")||k.includes("conflit")){let v=e.buildUpstreamPath(g);if(!await Pe(t,v,u,s,c))throw r=!0,new Error("Update aborted by user.")}else throw h}if(r)break;d++}catch(h){h.message.includes("aborted")?fe.window.showInformationMessage("Ricwiz: Update cancelled."):fe.window.showErrorMessage(`Ricwiz: Failed to update branch ${u}. Detail: ${h.message}`);return}}if(!r){s.report({message:"Finishing up...",increment:10});try{let l=await I(t);a&&a!==l&&await f(`git checkout ${a}`,{cwd:t})}catch{}fe.window.showInformationMessage(`Ricwiz: Successfully updated ${d} environment branches from their bases!`)}})}var N=C(require("vscode"));async function fo(){let t=P();if(!t){N.window.showErrorMessage("Ricwiz: Open a folder or workspace that is a Git repository.");return}let e=await I(t),o=N.workspace.getConfiguration("ricwiz");await N.window.withProgress({location:N.ProgressLocation.Notification,title:"Ricwiz: Scanning for unused local branches...",cancellable:!1},async()=>{try{await f("git fetch --prune",{cwd:t})}catch{}let i=[];try{let{stdout:m}=await f('git branch --format="%(refname:short)"',{cwd:t});i=m.split(`
`).map(l=>l.trim()).filter(l=>l.length>0)}catch{}if(i.length===0){N.window.showInformationMessage("Ricwiz: No local branches found.");return}let n=[];try{let{stdout:m}=await f('git branch -r --format="%(refname:short)"',{cwd:t});n=m.split(`
`).map(l=>l.trim().replace(/^[^/]+\//,"")).filter(l=>l.length>0&&!l.includes("HEAD"))}catch{}let p=[];try{let{stdout:m}=await f('git for-each-ref --format="%(refname:short)|||%(upstream:track)" refs/heads/',{cwd:t});p=m.split(`
`).filter(l=>l.includes("[gone]")).map(l=>l.split("|||")[0].trim())}catch{}let s=i.filter(m=>!n.includes(m));if(s.length===0){N.window.showInformationMessage("Ricwiz: Your local repository is totally clean! All local branches exist on the remote.");return}let c=s.map(m=>{let l=p.includes(m),u=m===e,g="Not found on remote";return l&&(g="Deleted on remote [gone]"),u&&(g+=" (Current branch - will checkout main first)"),{label:m,description:g,picked:l&&!u}}),d=await N.window.showQuickPick(c,{canPickMany:!0,placeHolder:"Select local branches to delete",title:"Ricwiz: Delete Unused Branches"});if(!d||d.length===0){N.window.showInformationMessage("Ricwiz: No branches selected for deletion.");return}if(await N.window.showWarningMessage(`Ricwiz: Delete ${d.length} local branch(es)?
This cannot be undone!`,{modal:!0},"Yes, delete them")!=="Yes, delete them"){N.window.showInformationMessage("Ricwiz: Deletion cancelled.");return}let r=0;for(let m of d){let l=m.label;if(l===e){let u=o.get("ticketSourceBranch","main");try{await f(`git checkout ${u}`,{cwd:t}),e=u}catch{N.window.showWarningMessage(`Ricwiz: Could not switch away from ${l}. Skipping.`);continue}}try{await f(`git branch -D ${l}`,{cwd:t}),r++}catch{N.window.showWarningMessage(`Ricwiz: Could not delete local branch ${l}.`)}}N.window.showInformationMessage(`Ricwiz: \u{1F5D1}\uFE0F Cleaned up ${r} unused local branch(es).`)})}var ne=C(require("vscode"));async function Fe(t){let e=P();e&&await ne.window.withProgress({location:ne.ProgressLocation.Notification,title:`Ricwiz: Switching to ${t}...`,cancellable:!1},async()=>{try{let o=await I(e),i=!1;try{let{stdout:p}=await f("git status --porcelain",{cwd:e});i=p.trim().length>0}catch{}if(i&&o)try{await f(`git stash push --include-untracked -m "ricwiz-auto:${o}"`,{cwd:e}),ne.window.showInformationMessage(`Ricwiz: \u{1F4E6} Stashed changes from ${o}`)}catch{ne.window.showWarningMessage("Ricwiz: Could not stash changes. Checkout may fail if there are conflicts.")}let n=t;t.includes("/")&&(n=t.split("/").slice(1).join("/"));try{await f(`git checkout ${n}`,{cwd:e})}catch{let s="";if(t.includes("/"))s=t.split("/")[0];else{let{stdout:c}=await f("git branch -r",{cwd:e}),d=c.split(`
`).map(r=>r.trim()).filter(r=>r),a=[];for(let r of d){let m=r.split(" ")[0];m.endsWith(`/${n}`)&&a.push(m.substring(0,m.lastIndexOf("/")))}if(a.length===0){ne.window.showErrorMessage(`Ricwiz: A branch "${n}" n\xE3o existe localmente nem em nenhuma remote!`);return}else if(a.length===1)s=a[0];else{let r=await S.initialize(e);a.includes("origin")?s="origin":r&&a.includes(r.upstreamRemote)?s=r.upstreamRemote:s=a[0]}}try{await f(`git fetch ${s} ${n}`,{cwd:e}),await f(`git checkout -b ${n} --track ${s}/${n}`,{cwd:e})}catch{ne.window.showErrorMessage(`Ricwiz: Encontrou na remote ${s} mas falhou a fazer checkout.`);return}}try{let{stdout:p}=await f("git stash list",{cwd:e}),s=p.split(`
`);for(let c=0;c<s.length;c++)if(s[c].includes(`ricwiz-auto:${n}`)){let d=s[c].match(/stash@\{(\d+)\}/);d&&(await f(`git stash pop stash@{${d[1]}}`,{cwd:e}),ne.window.showInformationMessage(`Ricwiz: \u{1F4E6} Restored stashed changes on ${n}`));break}}catch{ne.window.showWarningMessage(`Ricwiz: Could not restore stashed changes on ${n}. You may need to resolve conflicts manually (check git stash list).`)}}catch{ne.window.showErrorMessage(`Ricwiz: Could not checkout branch ${t}.`)}})}var je=C(require("vscode"));async function ho(){let t=P();if(t)try{let{stdout:e}=await f("git branch --show-current",{cwd:t}),o=e.trim();o&&(await je.env.clipboard.writeText(o),je.window.showInformationMessage(`Ricwiz: \u{1F4CB} Copied "${o}" to clipboard`))}catch{je.window.showErrorMessage("Ricwiz: Could not get the current branch name.")}}var Z=C(require("vscode")),ot=C(require("path")),wo=C(require("fs"));async function vo(){let t=P();if(!t){Z.window.showErrorMessage("Ricwiz: Open a folder or workspace that is a Git repository.");return}let e=await S.initialize(t,{skipPrompt:!0}),o=Z.workspace.getConfiguration("ricwiz"),i=e?.ticketSourceBranch||o.get("ticketSourceBranch","main"),n=e?.originRemote||"origin",s=o.get("packageXmlCommand",'sf sgd source delta --to "HEAD" --from "{originRemote}/{baseBranch}" --output-dir "."').replace("origin/{baseBranch}","{originRemote}/{baseBranch}").replace(/{originRemote}/g,n).replace(/{baseBranch}/g,i);await Z.window.showWarningMessage("Are you sure you want to generate the package.xml? This may overwrite existing local manifest files.",{modal:!0},"Yes, Generate")==="Yes, Generate"&&await Z.window.withProgress({location:Z.ProgressLocation.Notification,title:"Ricwiz: Generating package.xml using Salesforce CLI...",cancellable:!1},async()=>{try{await f(s,{cwd:t,maxBuffer:10*1024*1024}),Z.window.showInformationMessage("Ricwiz: Successfully generated package.xml!");let d=ot.join(t,"package","package.xml"),a=ot.join(t,"package.xml"),r=ot.join(t,"manifest","package.xml");for(let m of[d,a,r])if(wo.existsSync(m)){let l=await Z.workspace.openTextDocument(m);await Z.window.showTextDocument(l);break}}catch(d){Z.window.showErrorMessage(`Ricwiz: Error running sf command - ${d.message}`)}})}var K=C(require("vscode"));async function yo(){let t=P();if(!t){K.window.showErrorMessage("Ricwiz: Open a folder or workspace that is a Git repository.");return}let o=K.workspace.getConfiguration("ricwiz").get("deployCommand","sf project deploy start --manifest package/package.xml --post-destructive-changes destructiveChanges/destructiveChanges.xml -c -l NoTestRun -g");await K.window.showWarningMessage("Are you sure you want to deploy to Salesforce? This action modifies your org and cannot be easily undone.",{modal:!0},"Yes, Deploy")==="Yes, Deploy"&&await K.window.withProgress({location:K.ProgressLocation.Notification,title:"Ricwiz: Deploying package...",cancellable:!1},async()=>{try{let{stdout:n,stderr:p}=await f(o,{cwd:t,maxBuffer:52428800}),s=K.window.createOutputChannel("Ricwiz Deploy");s.appendLine(`Executing: ${o}`),s.appendLine(n),p&&(s.appendLine("--- STDERR ---"),s.appendLine(p)),s.show(),K.window.showInformationMessage("Ricwiz: Successfully ran deploy command!")}catch(n){let p=K.window.createOutputChannel("Ricwiz Deploy");p.appendLine(`Error executing: ${o}`),n.stdout&&p.appendLine(n.stdout),n.stderr&&p.appendLine(n.stderr),p.appendLine(n.message),p.show(),K.window.showErrorMessage("Ricwiz: Error running deploy command. See output channel for details.")}})}var X=C(require("vscode"));async function bo(){let t=P();if(!t){X.window.showErrorMessage("Ricwiz: Open a folder or workspace that is a Git repository.");return}let o=X.workspace.getConfiguration("ricwiz").get("importDataCommand","sfdx force:data:tree:import --plan data/plan.json");await X.window.showWarningMessage("Are you sure you want to import data into Salesforce? This action modifies records in your org.",{modal:!0},"Yes, Import")==="Yes, Import"&&await X.window.withProgress({location:X.ProgressLocation.Notification,title:"Ricwiz: Importing data...",cancellable:!1},async()=>{try{let{stdout:n,stderr:p}=await f(o,{cwd:t,maxBuffer:52428800}),s=X.window.createOutputChannel("Ricwiz Import Data");s.appendLine(`Executing: ${o}`),s.appendLine(n),p&&(s.appendLine("--- STDERR ---"),s.appendLine(p)),s.show(),X.window.showInformationMessage("Ricwiz: Successfully ran import data command!")}catch(n){let p=X.window.createOutputChannel("Ricwiz Import Data");p.appendLine(`Error executing: ${o}`),n.stdout&&p.appendLine(n.stdout),n.stderr&&p.appendLine(n.stderr),p.appendLine(n.message),p.show(),X.window.showErrorMessage("Ricwiz: Error running import data command. See output channel for details.")}})}var V=C(require("vscode"));async function xo(){let t=P();if(!t){V.window.showErrorMessage("Ricwiz: Open a folder or workspace that is a Git repository.");return}let e=await S.initialize(t,{skipPrompt:!0}),o=e?e.ticketSourceBranch:V.workspace.getConfiguration("ricwiz").get("ticketSourceBranch","main"),i=e?e.originRemote:"origin",n="";try{n=await I(t)}catch{}let p=await V.window.showInputBox({prompt:`Enter the branch name to list modified files (compared to ${o})`,value:n,placeHolder:"SFPSCA-1234"});if(!p)return;let s=$e(p);await V.window.withProgress({location:V.ProgressLocation.Notification,title:`Ricwiz: Finding files for ${s}...`,cancellable:!1},async()=>{try{let c=e?e.ticketPrefix:V.workspace.getConfiguration("ricwiz").get("ticketPrefix","SFPSC-"),d=te(s,c),a=pe(s,d,!0)||s.replace(/-to-[a-zA-Z0-9]+$/i,""),r=await de(t,a);R.appendLine(`[ListTicketFiles] targetBranch (raw): ${s}, resolvedTargetBranch: ${r}, ticketId: ${a}, originRemote: ${i}, sourceBranch: ${o}`);let m=[];try{let x="";try{R.appendLine(`[ListTicketFiles] Running: git merge-base ${i}/${o} ${r}`);let{stdout:b}=await f(`git merge-base ${i}/${o} ${r}`,{cwd:t});x=b.trim()}catch(b){R.appendLine(`[ListTicketFiles] First merge-base failed: ${b.message}`);try{R.appendLine(`[ListTicketFiles] Running: git merge-base ${o} ${r}`);let{stdout:T}=await f(`git merge-base ${o} ${r}`,{cwd:t});x=T.trim()}catch(T){R.appendLine(`[ListTicketFiles] Second merge-base failed: ${T.message}`),R.appendLine(`[ListTicketFiles] Running: git merge-base ${i}/${o} ${i}/${r}`);let{stdout:M}=await f(`git merge-base ${i}/${o} ${i}/${r}`,{cwd:t});x=M.trim(),r=`${i}/${r}`}}if(x){R.appendLine(`[ListTicketFiles] Merge base found: ${x}. Running git diff...`);let b=r===n||s===n,T=b?"":` ${r}`,{stdout:M}=await f(`git diff --name-only ${x}${T}`,{cwd:t,maxBuffer:10*1024*1024});if(m=M.split(`
`).map(B=>B.trim()).filter(B=>B.length>0),b)try{let{stdout:B}=await f("git ls-files --others --exclude-standard",{cwd:t,maxBuffer:10485760}),O=B.split(`
`).map(W=>W.trim()).filter(W=>W.length>0);m=[...m,...O],R.appendLine(`[ListTicketFiles] Found ${O.length} untracked files.`)}catch(B){R.appendLine(`[ListTicketFiles] Failed to get untracked files: ${B.message}`)}R.appendLine(`[ListTicketFiles] diff found ${m.length} files total.`)}}catch(x){R.appendLine(`[ListTicketFiles] Diff strategy failed: ${x.message}`)}let l=[];try{R.appendLine(`[ListTicketFiles] Running git log fallback for ticketId: ${a}`);let{stdout:x}=await f(`git --no-pager log --grep="\\b${a}\\b" -i -E --name-only -m --first-parent --format=""`,{cwd:t,maxBuffer:10*1024*1024});l=x.split(`
`).map(b=>b.trim()).filter(b=>b.length>0),R.appendLine(`[ListTicketFiles] git log found ${l.length} files.`)}catch(x){R.appendLine(`[ListTicketFiles] Git log fallback failed: ${x.message}`)}let u=[...m,...l];if(u.length===0){V.window.showInformationMessage(`Ricwiz: No modified files found for ${s}.`);return}let g=Array.from(new Set(u)).sort(),h={};for(let x of g){let b=x.match(/default\/([^/]+)/),T=b&&b[1]?b[1].toUpperCase():"OUTROS";h[T]||(h[T]=[]),h[T].push(x)}let w=`Files modified in branch ${s}:
`,k=Object.keys(h).sort();for(let x of k)w+=`
=== ${x} ===
`,w+=h[x].join(`
`)+`
`;let v=await V.workspace.openTextDocument({content:w,language:"plaintext"});await V.window.showTextDocument(v)}catch(c){V.window.showErrorMessage(`Ricwiz: Error running git log - ${c.message}`)}})}var re=C(require("vscode"));async function ko(){let t=P();if(!t){re.window.showErrorMessage("Ricwiz: Open a folder or workspace that is a Git repository.");return}let o=re.workspace.getConfiguration("ricwiz").get("resetTrackingCommand","sf org disable tracking && sf project reset tracking --no-prompt");await re.window.withProgress({location:re.ProgressLocation.Notification,title:"Ricwiz: Resetting tracking...",cancellable:!1},async()=>{try{let{stdout:i,stderr:n}=await f(o,{cwd:t,maxBuffer:52428800}),p=re.window.createOutputChannel("Ricwiz Reset Tracking");p.appendLine(`Executing: ${o}`),p.appendLine(i),n&&(p.appendLine("--- STDERR ---"),p.appendLine(n)),p.show(),re.window.showInformationMessage("Ricwiz: Successfully reset tracking!")}catch(i){let n=re.window.createOutputChannel("Ricwiz Reset Tracking");n.appendLine(`Error executing: ${o}`),i.stdout&&n.appendLine(i.stdout),i.stderr&&n.appendLine(i.stderr),n.appendLine(i.message),n.show(),re.window.showErrorMessage("Ricwiz: Error resetting tracking. See output channel for details.")}})}var ee=C(require("vscode"));async function Co(){let t=P();if(!t){ee.window.showErrorMessage("Ricwiz: Open a workspace first.");return}let e=["ApexClass","ApexTrigger","CustomObject","CustomField","LightningComponentBundle","AuraDefinitionBundle","Flow","CustomLabel","CustomMetadata","StaticResource","Profile","PermissionSet","PermissionSetGroup","Layout","ValidationRule","RecordType","ListView","Report","EmailTemplate","Other (Type manually)..."],o=await ee.window.showQuickPick(e,{placeHolder:"Select Metadata Type to extract (e.g., ApexClass)",ignoreFocusOut:!0});if(!o||o==="Other (Type manually)..."&&(o=await ee.window.showInputBox({prompt:"Enter Metadata Type (e.g., CustomApplication, Queue)",ignoreFocusOut:!0}),!o))return;let i={ApexClass:"**/*.cls",ApexTrigger:"**/*.trigger",CustomObject:"**/*.{object,object-meta.xml}",CustomField:"**/*.field-meta.xml",LightningComponentBundle:"**/lwc/*/*.js",AuraDefinitionBundle:"**/aura/*/*.cmp",Flow:"**/*.flow-meta.xml",CustomLabel:"**/*.labels-meta.xml",CustomMetadata:"**/*.md-meta.xml",StaticResource:"**/*.resource-meta.xml",Profile:"**/*.profile-meta.xml",PermissionSet:"**/*.permissionset-meta.xml",PermissionSetGroup:"**/*.permissionsetgroup-meta.xml",Layout:"**/*.layout-meta.xml",ValidationRule:"**/*.validationRule-meta.xml",RecordType:"**/*.recordType-meta.xml",ListView:"**/*.listView-meta.xml"},n=[],p=i[o];if(p)try{n=(await ee.workspace.findFiles(p,"**/node_modules/**")).map(d=>{let a=d.fsPath.split(/[\\/]/).pop()||"";if(o==="LightningComponentBundle"||o==="AuraDefinitionBundle"){let r=d.fsPath.split(/[\\/]/);return r[r.length-2]||a.split(".")[0]}return a.split(".")[0]}),n=[...new Set(n)].sort()}catch{}let s=await new Promise(c=>{let d=ee.window.createQuickPick();d.title=`Extract ${o}`,d.placeholder="Type name (e.g. MyComponent) or * for all",d.ignoreFocusOut=!0,d.matchOnDescription=!0;let a=()=>{let r=d.value.trim(),m=[];r?m.push({label:`$(cloud-download) Extract "${r}"`,description:"Extract exact name from Salesforce",alwaysShow:!0}):m.push({label:'$(cloud-download) Extract "*" (All)',description:`Extract all ${o}s`,alwaysShow:!0}),n.forEach(l=>{(!r||l.toLowerCase().includes(r.toLowerCase()))&&m.push({label:l,description:"Local workspace component"})}),d.items=m};d.onDidChangeValue(()=>a()),d.onDidAccept(()=>{let r=d.selectedItems[0];if(r){let m=r.label;m.startsWith('$(cloud-download) Extract "')?m=m.replace('$(cloud-download) Extract "',"").replace('" (All)',"").replace('"',""):m==='$(cloud-download) Extract "*" (All)'&&(m="*"),d.hide(),c(m)}}),d.onDidHide(()=>{d.dispose(),c(void 0)}),a(),d.show()});s&&await ee.window.withProgress({location:ee.ProgressLocation.Notification,title:`Ricwiz: Extracting ${o}:${s} from Salesforce...`,cancellable:!0},async(c,d)=>{try{R.show(!0);let a=`${o}:${s}`,{stdout:r,stderr:m}=await f(`sf project retrieve start -m "${a}"`,{cwd:t});r&&R.appendLine(r),m&&R.appendLine(m),ee.window.showInformationMessage(`Ricwiz: Successfully extracted ${a}.`)}catch(a){R.appendLine(`ERROR: ${a.message}`),a.stdout&&R.appendLine(a.stdout),a.stderr&&R.appendLine(a.stderr),ee.window.showErrorMessage("Ricwiz: Extraction failed. See Output channel for details.")}})}var j=C(require("vscode")),$o=C(require("path"));async function Ro(){let t=j.window.activeTextEditor;if(!t){j.window.showErrorMessage("Ricwiz: Please open the file you want to deploy in the editor first.");return}let e=t.document.uri.fsPath,o=P();if(!o)return;let i="";if(await j.window.withProgress({location:j.ProgressLocation.Notification,title:"Ricwiz: Fetching available Salesforce orgs...",cancellable:!1},async()=>{try{let{stdout:d}=await f("sf org list --json",{cwd:o});i=d}catch(d){i=d.stdout||""}}),!i){j.window.showErrorMessage("Ricwiz: Failed to fetch orgs. Is Salesforce CLI installed?");return}let n=[];try{let d=JSON.parse(i),a=d.result?.nonScratchOrgs||[],r=d.result?.scratchOrgs||[];n=[...a,...r]}catch{j.window.showErrorMessage("Ricwiz: Failed to parse org list.");return}if(n.length===0){j.window.showInformationMessage("Ricwiz: No authenticated orgs found.");return}let p=n.map(d=>({label:d.alias||d.username,description:d.alias?d.username:"",picked:d.isDefaultUsername})),s=await j.window.showQuickPick(p,{placeHolder:"Select the org(s) to deploy this file to",canPickMany:!0,ignoreFocusOut:!0});if(!s||s.length===0)return;let c=$o.basename(e);await j.window.withProgress({location:j.ProgressLocation.Notification,title:`Ricwiz: Deploying ${c} to ${s.length} org(s)...`,cancellable:!1},async()=>{R.show(!0),R.appendLine(`--- Starting Parallel Deploy of ${c} ---`);let d=s.map(async l=>{let u=l.label;R.appendLine(`[${u}] Deploying...`);try{let{stdout:g,stderr:h}=await f(`sf project deploy start -d "${e}" -o "${u}"`,{cwd:o});return R.appendLine(`[${u}] \u2705 Success`),g&&R.appendLine(g),{org:u,success:!0}}catch(g){return R.appendLine(`[${u}] \u274C Failed`),g.stdout&&R.appendLine(g.stdout),g.stderr&&R.appendLine(g.stderr),{org:u,success:!1}}}),a=await Promise.all(d),r=a.filter(l=>l.success).length,m=a.filter(l=>!l.success).length;m===0?j.window.showInformationMessage(`Ricwiz: Successfully deployed to all ${r} orgs!`):j.window.showErrorMessage(`Ricwiz: Deploy finished with errors (${r} success, ${m} failed). Check Output channel.`)})}var F=C(require("vscode")),it=C(require("fs")),nt=C(require("path"));async function zo(){let t=P();if(!t){F.window.showErrorMessage("Ricwiz: Open a folder or workspace that is a Git repository.");return}let e=F.workspace.getConfiguration("ricwiz"),o=e.get("auditUsername",""),i=e.get("auditHours",8),n=await F.window.showInputBox({prompt:"Enter your Salesforce Username to query in SetupAuditTrail",value:o,placeHolder:"admin@tuaorg.com"});if(!n)return;n=$e(n);let p=await F.window.showInputBox({prompt:"How many hours back do you want to search?",value:i.toString(),placeHolder:"8"});if(!p)return;let s=parseFloat(p);if(isNaN(s)||s<=0){F.window.showErrorMessage("Ricwiz: Invalid hours specified.");return}let c=new Date(Date.now()-s*60*60*1e3).toISOString(),a=`sf data query -q "${`SELECT Action, Display, Section FROM SetupAuditTrail WHERE CreatedBy.Username = '${n}' AND CreatedDate >= ${c}`}" --json`;await F.window.withProgress({location:F.ProgressLocation.Notification,title:"Ricwiz: Interrogating Setup Audit Trail...",cancellable:!1},async()=>{try{let{stdout:r}=await f(a,{cwd:t,maxBuffer:52428800}),m=JSON.parse(r);if(!m.result||m.result.records.length===0){F.window.showInformationMessage(`Ricwiz: No changes found for ${n} in the last ${s} hours.`);return}let l=m.result.records,u=[],g=new Set;for(let B of l){let O=Zo(B.Action,B.Display,B.Section);if(O){let W=`${O.isDelete?"DEL":"ADD"}-${O.metadataFormat}`;if(!g.has(W)){g.add(W);let me=O.isDelete?"$(trash)":"$(plus)";u.push({label:`${me} ${O.metadataFormat}`,description:`${B.Action} -> ${B.Display}`,metadataFormat:O.metadataFormat,isDelete:O.isDelete})}}}if(u.length===0){F.window.showInformationMessage(`Ricwiz: No extractable metadata changes found for ${n} in the last ${s} hours (ignored passwords/logins).`);return}let h=await F.window.showQuickPick(u,{canPickMany:!0,placeHolder:"Select the changes you want to extract to GitLab",ignoreFocusOut:!0});if(!h||h.length===0){F.window.showInformationMessage("Ricwiz: No changes selected.");return}let w=h.filter(B=>B.isDelete),k=h.filter(B=>!B.isDelete),v=F.window.createOutputChannel("Ricwiz Admin Bridge");if(v.show(),w.length>0){let{stdout:B}=await f("git ls-files",{cwd:t}),O=B.split(`
`).map(me=>me.trim()),W=0;for(let me of w){let Oe=me.metadataFormat.split(":"),He=Oe[0],Ve=Oe[1],xe=Ve;He==="CustomField"&&(xe=Ve.split(".")[1]);let rt=O.filter(Ae=>{let L=nt.basename(Ae);return L.startsWith(xe+".")&&L.includes(He==="CustomField"?".field":"")});for(let Ae of rt){let L=nt.join(t,Ae);it.existsSync(L)&&(it.unlinkSync(L),v.appendLine(`Deleted local file: ${Ae}`),W++)}}F.window.showInformationMessage(`Ricwiz: Deleted ${W} local files from Git workspace.`)}if(k.length===0)return;let x=k.map(B=>B.metadataFormat).filter(B=>B!=="").join(", "),b=await F.window.showInputBox({prompt:"Review and adjust the metadata components to retrieve",value:x,ignoreFocusOut:!0});if(!b)return;let T=`sf project retrieve start -m "${b}"`;v.appendLine(`Executing: ${T}`),F.window.showInformationMessage(`Ricwiz: Extracting ${k.length} components...`);let M=await f(T,{cwd:t});v.appendLine(M.stdout),M.stderr&&(v.appendLine("--- STDERR ---"),v.appendLine(M.stderr)),F.window.showInformationMessage("Ricwiz: Changes extracted successfully! Ready for Git Commit.")}catch(r){F.window.showErrorMessage(`Ricwiz: Error capturing changes - ${r.message}`)}})}function Zo(t,e,o){if(!t||!e||!o)return null;let i=t.toLowerCase(),n=o.toLowerCase();if(["security controls","network access","session settings","data export","login history","password policies","identity verification","delegated administration"].includes(n)||i.includes("login")||i.includes("password")||i.includes("oauth")||i.includes("session"))return null;let s=i.includes("delete"),c=null;if(i==="permissionsetgroupcomponentadd"||i==="permissionsetgroupcomponentdelete")return null;let d=(a,r=!1)=>{let m=a.replace(/\(.*\)/g,"").trim();m.includes(":")&&!i.includes("calculation")&&(m=m.split(":")[0]);let l=["disabled","deleted","removed","created","changed","updated","from","to","on","assigned","assign","assignment","permission","set","group","apex","class","trigger","custom","field","object","layout","validation","rule","flow","profile"],u=m.split(/\s+/);if(r){for(;u.length>0&&l.includes(u[u.length-1].toLowerCase());)u.pop();for(;u.length>0&&l.includes(u[0].toLowerCase());)u.shift();return u.join(" ").trim().replace(/[^a-zA-Z0-9_ ]/g,"")}else return u.filter(w=>!l.includes(w.toLowerCase())).join("_").replace(/[^a-zA-Z0-9_]/g,"")||m.replace(/\s+/g,"")};if(i.includes("profile"))c=`Profile:${d(e,!0)}`;else if(i.includes("permissionsetgroupcalculation")){let a=e.split(":");c=`PermissionSetGroup:${a.length>1?a[a.length-1].trim():d(e,!1)}`}else if(i.includes("permission set group")||i.includes("permissionsetgroup"))c=`PermissionSetGroup:${d(e,!1)}`;else if(i.includes("permission set")||i.includes("permissionset"))c=`PermissionSet:${d(e,!1)}`;else if(i.includes("apexclass"))c=`ApexClass:${d(e,!1)}`;else if(i.includes("apextrigger")||i.includes("apex trigger"))c=`ApexTrigger:${d(e,!1)}`;else if(i.includes("customfield")){let a=e.match(/([A-Za-z0-9_]+__c)/),r=e.match(/(?:on|na|for)\s+([A-Za-z0-9_]+)/i);a&&r?c=`CustomField:${r[1]}.${a[1]}`:c=`CustomField:${d(e,!1)}`}else if(i.includes("layout"))c=`Layout:${d(e,!0)}`;else if(i.includes("validation"))c=`ValidationRule:${d(e,!1)}`;else if(i.includes("flow"))c=`Flow:${d(e,!1)}`;else if(i.includes("customobject")){let a=e.match(/([A-Za-z0-9_]+__c)/);c=a?`CustomObject:${a[1]}`:`CustomObject:${d(e,!1)}`}else if(!i.includes("created")&&!i.includes("changed")&&!i.includes("deleted"))return null;return c?{metadataFormat:c,isDelete:s}:null}var ft=C(require("vscode"));async function Po(){let t=P();if(t)try{let{stdout:e}=await f('git for-each-ref --sort=-committerdate --format="%(refname:short)|||%(committerdate:relative)|||%(subject)" refs/heads/',{cwd:t}),o=e.split(`
`).filter(n=>n.trim()).map(n=>{let p=n.split("|||");return{label:`$(git-branch) ${p[0]}`,description:p[1],detail:p[2],branchName:p[0]}}),i=await ft.window.showQuickPick(o,{placeHolder:"Select a branch from history to checkout",matchOnDescription:!0,matchOnDetail:!0});i&&await Fe(i.branchName)}catch{ft.window.showErrorMessage("Ricwiz: Failed to get branch history")}}var We=C(require("vscode"));async function Bo(){let t=P();if(!t)return;let e=await We.window.showInputBox({prompt:"Enter ticket number or name (e.g., 48934)",placeHolder:"48934"});if(!e)return;let o=$e(e);try{let{stdout:i}=await f(`git branch --list "*${o}*"`,{cwd:t}),n=i.split(`
`).map(c=>c.replace("*","").trim()).filter(c=>c);if(n.length===0){We.window.showInformationMessage(`Ricwiz: No branches found matching "${e}"`);return}let p=n.map(c=>({label:`$(git-branch) ${c}`,branchName:c})),s=await We.window.showQuickPick(p,{placeHolder:`Select a branch for ${e}`});s&&await Fe(s.branchName)}catch{We.window.showErrorMessage("Ricwiz: Failed to search branches")}}var Ee=C(require("vscode")),So=C(require("path"));async function To(){let t=Ee.window.activeTextEditor;if(!t)return Ee.window.showErrorMessage("Ricwiz: Please open a file in the editor to check blame."),null;let e=t.document.fileName,o=So.basename(e),i=P();if(!i)return Ee.window.showErrorMessage("Ricwiz: Workspace is not a git repository."),null;let n=[];try{let{stdout:r}=await f(`git log -5 --pretty=format:"%an|%ar|%s|%h" -- "${e}"`,{cwd:i}),m=r.trim().split(`
`);for(let l of m){let u=l.split("|");u.length>=4&&n.push({author:u[0],time:u[1],message:u.slice(2,-1).join("|"),hash:u[u.length-1]})}}catch(r){R.appendLine(`[WhoToBlame] Git blame error: ${r.message}`)}let p="Unknown",s="Unknown",c="Unknown",d=[],a=Ke(e);if(a)try{await Ee.window.withProgress({location:Ee.ProgressLocation.Notification,title:`Ricwiz: Analyzing ${a.name} in Salesforce...`,cancellable:!1},async()=>{let r="";if(a.type==="CustomField"){let m=a.name.split(".");m.length===2&&(r=`SELECT LastModifiedBy.Name, LastModifiedDate, CreatedBy.Name FROM CustomField WHERE DeveloperName = '${m[1].replace("__c","")}' AND TableEnumOrId = '${m[0]}'`)}else a.type==="LightningComponentBundle"?r=`SELECT LastModifiedBy.Name, LastModifiedDate, CreatedBy.Name FROM LightningComponentBundle WHERE DeveloperName = '${a.name}'`:r=`SELECT LastModifiedBy.Name, LastModifiedDate, CreatedBy.Name FROM ${a.type} WHERE Name = '${a.name}'`;if(r)try{let{stdout:m}=await f(`sf data query -t -q "${r}" --json`,{cwd:i,maxBuffer:52428800}),l=JSON.parse(m);if(l&&l.result&&l.result.records&&l.result.records.length>0){let u=l.result.records[0];p=u.LastModifiedBy?u.LastModifiedBy.Name:"Unknown",c=u.CreatedBy?u.CreatedBy.Name:"Unknown",s=new Date(u.LastModifiedDate).toLocaleString()}else p="Not found in Org",s="N/A",c="N/A"}catch(m){p="Query Error",s="N/A",c="N/A",R.appendLine(`[WhoToBlame] Query error: ${m.message}`)}try{let m="SELECT Action, Display, CreatedBy.Name, CreatedDate FROM SetupAuditTrail ORDER BY CreatedDate DESC LIMIT 1500",{stdout:l}=await f(`sf data query -q "${m}" --json`,{cwd:i,maxBuffer:52428800}),u=JSON.parse(l);if(u&&u.result&&u.result.records){let g=a.name.replace("__c","");d=u.result.records.filter(w=>w.Display&&w.Display.includes(g)).map(w=>({action:w.Action,display:w.Display,author:w.CreatedBy?w.CreatedBy.Name:"Unknown",time:new Date(w.CreatedDate).toLocaleString()})).slice(0,10)}}catch(m){R.appendLine(`[WhoToBlame] Audit trail query error: ${m.message}`)}})}catch(r){R.appendLine(`[WhoToBlame] Salesforce query error: ${r.message}`)}else p="Unsupported Metadata Type",s="N/A";return{fileName:o,gitHistory:n,sfAuthor:p,sfTime:s,sfCreatedBy:c,auditHistory:d}}var he=C(require("vscode"));var Ge=C(require("https"));async function Do(t,e){let o=P();if(!o)return;let i=(await Ce())?.trim();if(!i){he.window.showErrorMessage("Ricwiz: GitLab token is not configured.");return}try{let n=await S.initialize(o,{skipPrompt:!0});if(!n)return;let s=n.getConfig("gitlabUrlOverride","");if(s){let c=new URL(s);s=`${c.protocol}//${c.host}`}else{let{stdout:c}=await f("git remote",{cwd:o}),d=c.split(`
`).map(r=>r.trim()).filter(r=>r),a=!1;for(let r of d){let{stdout:m}=await f(`git remote get-url ${r}`,{cwd:o}),l=m.trim();l.endsWith(".git")&&(l=l.slice(0,-4)),l.startsWith("git@")&&(l=l.replace("git@","").replace(":","/"),l=`https://${l}`);let u=new URL(l),g=u.pathname;if(g.startsWith("/")&&(g=g.substring(1)),g.endsWith("/")&&(g=g.slice(0,-1)),encodeURIComponent(g)===t||g===t){s=`${u.protocol}//${u.host}`,a=!0;break}}if(!a){he.window.showErrorMessage(`Ricwiz: Could not determine base URL for project ${t}`);return}}await he.window.withProgress({location:he.ProgressLocation.Notification,title:`Fetching failed jobs for Pipeline #${e}...`,cancellable:!1},async()=>{let c=new Ge.Agent({keepAlive:!0}),d=new URL(`${s}/api/v4/projects/${t}/pipelines/${e}/jobs?scope[]=failed`),a=await new Promise(h=>{Ge.get(d,{headers:{"PRIVATE-TOKEN":i},agent:c},w=>{let k="";w.on("data",v=>k+=v),w.on("end",()=>{if(w.statusCode===200)try{h(JSON.parse(k))}catch{h([])}else h([])})}).on("error",()=>h([]))});if(!a||a.length===0){he.window.showInformationMessage("Ricwiz: No failed jobs found for this pipeline.");return}let r=a[0],m=new URL(`${s}/api/v4/projects/${t}/jobs/${r.id}/trace`),u=(await new Promise(h=>{Ge.get(m,{headers:{"PRIVATE-TOKEN":i},agent:c},w=>{let k="";w.on("data",v=>k+=v),w.on("end",()=>h(k))}).on("error",w=>h(`Failed to fetch log: ${w.message}`))})).replace(/\x1B\[[0-9;]*[mK]/g,""),g=he.window.createOutputChannel(`Pipeline #${e} - Job ${r.name}`);g.appendLine(`Pipeline ID: ${e}`),g.appendLine(`Job Name: ${r.name}`),g.appendLine(`Status: ${r.status}`),g.appendLine(`URL: ${r.web_url}`),g.appendLine("========================================"),g.appendLine(u),g.show()})}catch(n){he.window.showErrorMessage(`Ricwiz: Error fetching pipeline logs - ${n.message}`)}}var E=C(require("vscode")),Ue=C(require("child_process"));async function Eo(t,e,o,i){return new Promise((n,p)=>{let c=Ue.spawn("gemini",["-y","--output-format","text",t],{cwd:e,shell:!0});c.stdin.end(),i&&i.onCancellationRequested(()=>{c.kill(),p(new Error("Operation cancelled by user."))});let d="",a="";c.stdout.on("data",r=>{let m=r.toString();d+=m,o&&o.append(m)}),c.stderr.on("data",r=>{let m=r.toString();a+=m,o&&o.append(m)}),c.on("error",r=>{p(new Error(`Failed to start Gemini CLI: ${r.message}. Is it installed and in your PATH?`))}),c.on("close",r=>{r===0?n(d.trim()):p(new Error(`Gemini CLI failed with code ${r}: ${a||d}`))})})}function Ko(t){if(!t||!t.trim())return"";let e=t.trim(),o=e.match(/###\s*([^#\r\n]+)\s*###/);if(o&&o[1]?.trim())e=o[1].trim();else{let n=e.match(/###\s*Answer\s*###\s*:?\s*([^\r\n]+)/i);if(n&&n[1]?.trim())e=n[1].trim();else{let p=e.match(/<(?:commit_message|answer|output)>([\s\S]*?)<\/(?:commit_message|answer|output)>/i);p&&p[1]?.trim()?e=p[1].trim():(e=e.replace(/<(?:thought|think|thinking)[\s\S]*?<\/(?:thought|think|thinking)>/gi,""),e=e.split(/\r?\n/).map(c=>c.trim()).find(c=>c.length>0&&!/^alternative\b/i.test(c)&&!/^(?:thinking|thought|here\s+is)/i.test(c))||e)}}let i=e.split(/\r?\n/)[0].trim();return i=i.replace(/^#+|#+$/g,"").trim(),i=i.replace(/^###\s*Answer\s*###\s*:?\s*/i,""),i=i.replace(/^[`"']+|[`"']+$/g,"").trim(),i=i.replace(/^[-*•]\s+/,""),i=i.replace(/^\d+[\.\)]\s+/,""),i=i.replace(/^\[?[A-Z0-9]+(?:-[A-Z0-9]+)*-\d+(?:-\d+)?\]?\s*(?:-\s*|:\s*|\s+)?/i,""),i=i.replace(/\s+/g," ").trim(),i.length>0&&/^[a-z]/.test(i)&&(/^(feat|fix|docs|style|refactor|perf|test|build|ci|chore|revert)(\([^\)]+\))?:/.test(i)||(i=i.charAt(0).toUpperCase()+i.slice(1))),i.endsWith(".")&&!i.endsWith("..")&&(i=i.slice(0,-1).trim()),i}async function Mo(){let t=E.workspace.workspaceFolders;if(!t){E.window.showErrorMessage("No workspace folder found.");return}let e=t[0].uri.fsPath;try{let o=await new Promise((i,n)=>{Ue.exec("git diff --cached",{cwd:e,maxBuffer:10485760},(p,s,c)=>{p&&!s?n(p):i(s)})});if(!o.trim()){E.window.showInformationMessage("No staged changes found. Please stage your changes first.");return}await E.window.withProgress({location:E.ProgressLocation.Notification,title:"Generating commit message with Gemini...",cancellable:!0},async(i,n)=>{let p=`Generate a single, concise commit message description in English for the following git diff.

Rules:
- Start with a capital letter
- Use the imperative mood (e.g. "Add", "Fix", "Update", "Refactor")
- Under 72 characters
- Do NOT include any ticket numbers
- Do NOT provide multiple options or alternatives
- Output the final message enclosed exactly between ### and ### on its own line like:
###<your commit message here>###

Diff:
${o.slice(0,1e4)}`,s=E.window.createOutputChannel("Ricwiz AI: Commit Message");s.show(!0),s.appendLine("--- Generating Commit Message ---");let c=await Eo(p,e,s,n);s.appendLine(`
--- Finished ---`);let d=Ko(c);if(!d){E.window.showWarningMessage("Could not extract a valid commit message from Gemini output.");return}let a=E.extensions.getExtension("vscode.git");if(a&&a.isActive){let r=a.exports.getAPI(1);if(r.repositories.length>0){let m=r.repositories[0],l=m.inputBox.value||"",u=/^[A-Z]+-\d+(?:-\d+)?\s*(?:-\s*|:\s*|\s+)?/i,g=l.match(u);if(g)m.inputBox.value=g[0]+d;else{let h=await I(e),w=E.workspace.getConfiguration("ricwiz"),k=w.get("ticketPrefix","SFPSCA-"),v=te(h,k),x=h.match(new RegExp(`(${v}\\d+(?:-\\d+)?)`,"i"));if(x){let b=w.get("commitMessageSuffix","- ");m.inputBox.value=`${x[1].toUpperCase()}${b}`+d}else m.inputBox.value=d}E.window.showInformationMessage("Commit message generated and prefilled!")}else E.window.showInformationMessage("Generated: "+d)}else E.window.showInformationMessage("Generated: "+d)})}catch(o){E.window.showErrorMessage("Failed to generate commit message: "+o.message)}}async function Ao(t){if(!t&&(t=await E.window.showInputBox({prompt:"Ask a question about the code context (e.g. Why does this do X?)",placeHolder:"Why does this code exist?"})||"",!t))return;let e=E.workspace.workspaceFolders;if(!e){E.window.showErrorMessage("No workspace folder found.");return}let o=e[0].uri.fsPath;try{await E.window.withProgress({location:E.ProgressLocation.Notification,title:"Fetching Code Context via Gemini...",cancellable:!0},async(i,n)=>{let p="",s="",c=E.window.activeTextEditor;if(c){let m=E.workspace.asRelativePath(c.document.uri),l=c.selection,u=l.start.line+1,g=l.end.line+1;p=`The user is currently looking at file '${m}' between lines ${u} and ${g}.`;try{let h=Ue.execSync(`git blame -w -C -C -L ${u},${g} "${m}"`,{cwd:o,encoding:"utf8"}),w=/[A-Z]+-\\d+/g,k=h.match(w)||[],v=[...new Set(k)];v.length>0&&(s="Related Jira Tickets Context:\\n"+(await tt(v)).map(b=>`Ticket: ${b.key}\\nSummary: ${b.title}\\nDescription: ${b.description}\\nStatus: ${b.status}`).join("\\n\\n"))}catch{}}let d=`You are a helpful agent that answers code context questions.
User's Question: ${t}
${p}

${s}

Please use terminal tools like git blame or git log to trace the code history if needed, and answer the user's question directly.
Output your final answer directly in English.`,a=E.window.createOutputChannel("Ricwiz AI: Code Context");a.clear(),a.show(!0),a.appendLine("Question: "+t),a.appendLine(p),a.appendLine("----------------------------------------");let r=await Eo(d,o,a,n);a.appendLine(`
----------------------------------------`),a.appendLine("Finished.")})}catch(i){E.window.showErrorMessage("Failed to fetch code context: "+i.message)}}function Lo(t,e,o){t.subscriptions.push(y.commands.registerCommand("ricwiz.conflictAction",Lt),y.commands.registerCommand("ricwiz.generateDestructiveChanges",async()=>{try{await Et()}finally{y.commands.executeCommand("ricwiz.manualRefresh")}}),y.commands.registerCommand("ricwiz.runSmartTests",async()=>{try{await Mt()}finally{y.commands.executeCommand("ricwiz.manualRefresh")}}),y.commands.registerCommand("ricwiz.refreshWebview",()=>{e&&y.commands.executeCommand("workbench.action.webview.reloadWebviewAction")}),y.commands.registerCommand("ricwiz.createBranches",async i=>{try{await At(i)}finally{y.commands.executeCommand("ricwiz.manualRefresh")}}),y.commands.registerCommand("ricwiz.prepareDeploy",async()=>{try{await Jt()}finally{y.commands.executeCommand("ricwiz.manualRefresh")}}),y.commands.registerCommand("ricwiz.createMergeRequests",async()=>{try{await Wt()}finally{y.commands.executeCommand("ricwiz.manualRefresh")}}),y.commands.registerCommand("ricwiz.createMergeRequestsVSCode",async()=>{try{await Gt()}finally{y.commands.executeCommand("ricwiz.manualRefresh")}}),y.commands.registerCommand("ricwiz.openJiraTicket",async()=>{try{await Vt()}finally{y.commands.executeCommand("ricwiz.manualRefresh")}}),y.commands.registerCommand("ricwiz.openJiraTicketVSCode",async()=>{try{await qt()}finally{y.commands.executeCommand("ricwiz.manualRefresh")}}),y.commands.registerCommand("ricwiz.showJiraDetails",()=>{e&&io(e)}),y.commands.registerCommand("ricwiz.openJiraDashboard",i=>{e&&no(e,i)}),y.commands.registerCommand("ricwiz.openJiraDetailsForId",i=>{e&&ro(e,i)}),y.commands.registerCommand("ricwiz.toggleDashboardBranches",i=>{e&&(e.setDashboardShowBranches(i),y.commands.executeCommand("ricwiz.openJiraDashboard"))}),y.commands.registerCommand("ricwiz.changeJiraStatus",async()=>{try{await so()}finally{y.commands.executeCommand("ricwiz.manualRefresh")}}),y.commands.registerCommand("ricwiz.addJiraComment",async()=>{try{await ao()}finally{y.commands.executeCommand("ricwiz.manualRefresh")}}),y.commands.registerCommand("ricwiz.addJiraLabel",async()=>{try{await co()}finally{y.commands.executeCommand("ricwiz.manualRefresh")}}),y.commands.registerCommand("ricwiz.setJiraToken",lo),y.commands.registerCommand("ricwiz.setGitlabToken",po),y.commands.registerCommand("ricwiz.syncAll",async()=>{try{await uo()}finally{y.commands.executeCommand("ricwiz.manualRefresh")}}),y.commands.registerCommand("ricwiz.updateBases",async()=>{try{await go()}finally{y.commands.executeCommand("ricwiz.manualRefresh")}}),y.commands.registerCommand("ricwiz.deleteUnusedBranches",async()=>{try{await fo()}finally{y.commands.executeCommand("ricwiz.manualRefresh")}}),y.commands.registerCommand("ricwiz.checkoutBranch",async i=>{try{await Fe(i)}finally{y.commands.executeCommand("ricwiz.manualRefresh")}}),y.commands.registerCommand("ricwiz.copyBranchName",async()=>{try{await ho()}finally{y.commands.executeCommand("ricwiz.manualRefresh")}}),y.commands.registerCommand("ricwiz.generatePackageXml",async()=>{try{await vo()}finally{y.commands.executeCommand("ricwiz.manualRefresh")}}),y.commands.registerCommand("ricwiz.deployPackage",async()=>{try{await yo()}finally{y.commands.executeCommand("ricwiz.manualRefresh")}}),y.commands.registerCommand("ricwiz.importData",async()=>{try{await bo()}finally{y.commands.executeCommand("ricwiz.manualRefresh")}}),y.commands.registerCommand("ricwiz.listTicketFiles",async()=>{try{await xo()}finally{y.commands.executeCommand("ricwiz.manualRefresh")}}),y.commands.registerCommand("ricwiz.resetTracking",async()=>{try{await ko()}finally{y.commands.executeCommand("ricwiz.manualRefresh")}}),y.commands.registerCommand("ricwiz.extractComponent",async()=>{try{await Co()}finally{y.commands.executeCommand("ricwiz.manualRefresh")}}),y.commands.registerCommand("ricwiz.deployMultiOrg",async()=>{try{await Ro()}finally{y.commands.executeCommand("ricwiz.manualRefresh")}}),y.commands.registerCommand("ricwiz.captureAdminChanges",async()=>{try{await zo()}finally{y.commands.executeCommand("ricwiz.manualRefresh")}}),y.commands.registerCommand("ricwiz.openHistory",async()=>{try{await Po()}finally{y.commands.executeCommand("ricwiz.manualRefresh")}}),y.commands.registerCommand("ricwiz.searchTicket",async()=>{try{await Bo()}finally{y.commands.executeCommand("ricwiz.manualRefresh")}}),y.commands.registerCommand("ricwiz.whoToBlame",async()=>{let i=await To();i&&e&&(e.setBlameData(i),e.setPage("blame"))}),y.commands.registerCommand("ricwiz.showPipelineLogs",(i,n)=>Do(i,n)),y.commands.registerCommand("ricwiz.manualRefresh",()=>{o&&o()}),y.commands.registerCommand("ricwiz.toggleAutoRefresh",()=>{if(e){let i=!e.isAutoRefreshEnabled();e.setAutoRefresh(i),y.workspace.getConfiguration("ricwiz").update("autoRefresh",i,y.ConfigurationTarget.Global)}}),y.commands.registerCommand("ricwiz.openSettings",()=>{y.commands.executeCommand("workbench.action.openSettings","ricwiz")}),y.commands.registerCommand("ricwiz.generateCommitMessage",async()=>{await Mo()}),y.commands.registerCommand("ricwiz.codeContext",async i=>{await Ao(i||"")}))}var le=C(require("vscode"));function Io(t,e,o){let i,n=le.workspace.getConfiguration("ricwiz").get("autoRefresh",!0);e?.setAutoRefresh(n),t.subscriptions.push(le.workspace.onDidChangeConfiguration(s=>{if(s.affectsConfiguration("ricwiz.autoRefresh")){let c=le.workspace.getConfiguration("ricwiz").get("autoRefresh",!0);e?.setAutoRefresh(c)}}));async function p(){let s=le.extensions.getExtension("vscode.git");if(s){let a=function(r){let m="",l;async function u(){let h=le.workspace.workspaceFolders;if(!h)return;let w=h[0].uri.fsPath,k=await I(w);if(k&&k!==m){m=k;let v=le.workspace.getConfiguration("ricwiz"),x=v.get("ticketPrefix","SFPSCA-");if(!k.includes(x)){let L=k.match(/([A-Z]+-)\d+/i);L&&(x=L[1].toUpperCase())}let b=[],T=[],M=[],B=[],O=await S.initialize(w,{skipPrompt:!0}),W=O?.environments||v.get("environments",[{name:"Qual",sourceBranch:"quality"},{name:"Val",sourceBranch:"validation"},{name:"Prod",sourceBranch:"main"}]);try{let L=v.get("workspaceCheckoutButtons",["main","quality","validation"]);M=Array.from(new Set(L))}catch{}let me="",Oe=k.match(new RegExp(`(${x}\\d+(?:-\\d+)?)`,"i"));if(Oe){let L=Oe[1].toUpperCase();me=L;let we=v.get("commitMessageSuffix","- "),ht=/^[A-Z]+-\d+(?:-\d+)?\s*(?:-\s*|:\s*|\s+)?/i;ht.test(r.inputBox.value)?r.inputBox.value.toUpperCase().startsWith(L)||(r.inputBox.value=r.inputBox.value.replace(ht,`${L}${we}`)):r.inputBox.value=`${L}${we}`+r.inputBox.value,o.text=`$(bookmark) ${L}`,o.tooltip=`Branch: ${k}
Click to open Jira ticket`,o.show();try{let wt=await Se(w,L,"");b=await Be(w,wt,L,W,O)}catch{}}else{o.hide();try{B=await Nt(w)}catch{}}let[He,Ve,xe]=await Promise.all([Ot(w,10),Ut(w,k,W,O),me?Ie(me).catch(L=>{let we=L.message;return we&&(we.includes("ENOTFOUND")||we.includes("network"))&&(we="No Internet or Invalid URL"),{summary:`\u26A0\uFE0F Jira Error: ${we}`,description:"",status:""}}):Promise.resolve(null)]);T=He;let rt=xe?xe.summary:"",Ae=xe&&xe.status||"";e?.updateBranch(k,Ve,b,T,M,B,rt,Ae)}}function g(){e?.isAutoRefreshEnabled()&&(l&&clearTimeout(l),l=setTimeout(()=>{m="",u()},300))}i=()=>{m="",u()},u(),t.subscriptions.push(r.state.onDidChange(()=>g())),t.subscriptions.push(le.window.onDidChangeWindowState(h=>{h.focused&&g()}))};var c=a;s.isActive||await s.activate();let d=s.exports.getAPI(1);d.repositories.length>0&&d.repositories.forEach(r=>a(r)),d.onDidOpenRepository(r=>a(r))}}return p(),()=>{i&&i()}}var Fo={get_tickets_batch:async t=>{let e=await tt(t);return JSON.stringify(e)}};var ce;async function Xo(t){await zt(t),ce=new Qe(t.extensionUri),t.subscriptions.push(Me.window.registerWebviewViewProvider("ricwiz-webview",ce));let e=Me.window.createStatusBarItem(Me.StatusBarAlignment.Left,100);e.command="ricwiz.openJiraTicket",t.subscriptions.push(e);let o=Io(t,ce,e);return Lo(t,ce,o),{getJiraCredentials:async()=>({email:Me.workspace.getConfiguration("ricwiz").get("jiraEmail",""),token:await Ye()}),getGitLabToken:async()=>Ce(),AiSkills:Fo}}function ei(){}0&&(module.exports={activate,deactivate,webviewProvider});
