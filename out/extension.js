"use strict";var Io=Object.create;var Ve=Object.defineProperty;var Fo=Object.getOwnPropertyDescriptor;var Uo=Object.getOwnPropertyNames;var Oo=Object.getPrototypeOf,No=Object.prototype.hasOwnProperty;var jo=(t,e)=>{for(var o in e)Ve(t,o,{get:e[o],enumerable:!0})},vt=(t,e,o,i)=>{if(e&&typeof e=="object"||typeof e=="function")for(let r of Uo(e))!No.call(t,r)&&r!==o&&Ve(t,r,{get:()=>e[r],enumerable:!(i=Fo(e,r))||i.enumerable});return t};var k=(t,e,o)=>(o=t!=null?Io(Oo(t)):{},vt(e||!t||!t.__esModule?Ve(o,"default",{value:t,enumerable:!0}):o,t)),Jo=t=>vt(Ve({},"__esModule",{value:!0}),t);var ei={};jo(ei,{activate:()=>Zo,deactivate:()=>Xo,webviewProvider:()=>ce});module.exports=Jo(ei);var Me=k(require("vscode"));var P=k(require("vscode"));function C(t){return t?t.replace(/&/g,"&amp;").replace(/</g,"&lt;").replace(/>/g,"&gt;").replace(/"/g,"&quot;").replace(/'/g,"&#39;"):""}function qe(t){let e=(t||"").toLowerCase().trim();return e==="open"?"#888888":e==="in progress"?"#007acc":e==="waiting for deploy"?"#d7a500":e==="close"||e==="done"||e==="closed"?"#238636":"var(--vscode-badge-background)"}function ke(t){return t?t==="running"?"\u{1F7E1}":t==="success"?"\u{1F7E2}":t==="failed"?"\u{1F534}":t==="canceled"||t==="skipped"?"\u26AA":"":""}function q(){return`
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
    `}function yt(t,e){let o=_(),i=(e.files||[]).map(r=>`
        <button class="btn" style="padding: 6px; font-size: 12px; display: flex; justify-content: space-between; align-items: center;" onclick="sendOpenFileCommand('${C(r.file)}')">
            <span style="flex: 1; overflow: hidden; text-overflow: ellipsis; white-space: nowrap; direction: rtl; text-align: left;">&lrm;${C(r.file)}</span>
            <span style="font-size: 10px; opacity: 0.8; flex-shrink: 0; background-color: var(--vscode-badge-background); color: var(--vscode-badge-foreground); padding: 2px 4px; border-radius: 2px;">${C(r.state)}</span>
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
    </html>`}function xt(t){let e=_(),o=t?.ticketId||"Jira",i=t?.summary||"No Title",r=t?.description||"No description provided.",p=t?.relatedBranches||[];return`<!DOCTYPE html>
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
            <div class="jira-desc">${C(r)}</div>
            
            ${p.length>0?`
                <div style="margin-top: 16px; border-top: 1px solid var(--vscode-panel-border); padding-top: 12px;">
                    <div style="font-size: 11px; opacity: 0.7; margin-bottom: 8px; text-transform: uppercase; font-weight: bold;"><span class="icon" style="color: #32D74B;">\u2387</span> Related Branches & MRs</div>
                    <div style="display: flex; flex-direction: column; gap: 4px;">
                        ${p.map(s=>{let c=ke(s.pipelineStatus),d="";return s.pipelineStatus==="failed"&&s.projectPath&&s.pipelineId&&(d=`onclick="event.stopPropagation(); sendCommand('showPipelineLogs', { projectPath: '${s.projectPath}', pipelineId: ${s.pipelineId} });" style="cursor: pointer;"`),`
                            <div class="btn" style="padding: 6px 10px; font-size: 12px; display: flex; justify-content: space-between; align-items: center; background-color: var(--vscode-button-secondaryBackground); color: var(--vscode-button-secondaryForeground); border-radius: 4px;" onclick="sendCheckoutCommand('${C(s.name)}', this)" title="Checkout ${C(s.name)}">
                                <div style="display: flex; align-items: center; gap: 6px; overflow: hidden;">
                                    <span style="overflow: hidden; text-overflow: ellipsis; white-space: nowrap; font-weight: bold;">${C(s.name)}</span>
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
    </html>`}function kt(t){let{data:e,showBranches:o}=t,i=_(),r=e||{queries:[],selectedIndex:0,results:[],error:null},p=r.queries.map((c,d)=>`
        <option value="${d}" ${d===r.selectedIndex?"selected":""}>${C(c.name)}</option>
    `).join(""),s=r.error?`
        <div style="color: var(--vscode-errorForeground); padding: 12px; text-align: center; background: var(--vscode-editorError-background); border-radius: 4px;">
            \u26A0 ${C(r.error)}
        </div>
    `:r.results.length===0?`
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
                ${r.results.map(c=>`
                    <tr style="border-bottom: ${c.detailedBranches&&c.detailedBranches.length>0?"none":"1px solid var(--vscode-panel-border)"}; cursor: pointer;" class="tr-hover" onclick="sendCommand('openJiraDetailsForId', '${C(c.key)}', this)">
                        <td style="padding: 6px; font-weight: bold; color: var(--vscode-textLink-foreground); white-space: nowrap;">${C(c.key)}</td>
                        <td style="padding: 6px; overflow: hidden; text-overflow: ellipsis; max-width: 150px; white-space: nowrap;" title="${C(c.summary)}">${C(c.summary)}</td>
                        <td style="padding: 6px; white-space: nowrap;">
                            <span style="background: ${qe(c.status)}; color: white; padding: 2px 4px; border-radius: 3px; font-size: 9px; font-weight: bold; text-transform: uppercase;">${C(c.status)}</span>
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
        
        ${r.queries.length>0?`
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
    </html>`}function $t(t){let{logoUri:e,currentBranch:o,currentBranchIsMerged:i,relatedBranches:r,commits:p,baseBranches:s,recentTickets:c,ticketTitle:d,ticketStatus:a,autoRefreshEnabled:n}=t,m=_(),l=p.length>0?`
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
    `:"",u=r.find(v=>v.name===o),f="";u&&(f=ke(u.pipelineStatus));let h=u?u.mrUrl:void 0,w=r.filter(v=>v.name!==o),$=o?`
        <div style="background-color: var(--vscode-editor-inactiveSelectionBackground); padding: 10px; border-radius: 6px; margin-bottom: 16px; border: 1px solid var(--vscode-panel-border); box-shadow: 0 2px 4px rgba(0,0,0,0.1); position: relative;">
            ${d&&a?`
            <div style="position: absolute; top: 6px; right: 6px; z-index: 10; cursor: pointer; font-size: 9px; padding: 2px 6px; border-radius: 18px; background-color: ${qe(a)}; color: white; border: 1px solid var(--vscode-panel-border); opacity: 0.9; font-weight: bold; text-transform: uppercase; display: flex; align-items: center; gap: 4px;" onclick="sendCommand('changeJiraStatus', null, this)" title="Update Jira Status">
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
                ${i?'<span style="background-color: var(--vscode-charts-green); color: white; border-radius: 3px; padding: 1px 4px; font-size: 10px; font-weight: bold;" title="Merged to target env">MERGED</span>':""}
            </div>
            ${d?`<div style="font-size: 12px; margin-top: 6px; text-align: center; opacity: 0.9; font-style: italic;">${C(d)}</div>`:""}
            ${w.length>0?`
                <div style="margin-top: 10px; border-top: 1px solid var(--vscode-panel-border); padding-top: 10px;">
                    <div style="font-size: 10px; opacity: 0.7; margin-bottom: 6px; text-transform: uppercase; text-align: center;">Sister Branches</div>
                    <div style="display: flex; flex-direction: column; gap: 4px;">
                        ${w.map(v=>{let x=ke(v.pipelineStatus),b="";return v.pipelineStatus==="failed"&&v.projectPath&&v.pipelineId&&(b=`onclick="event.stopPropagation(); sendCommand('showPipelineLogs', { projectPath: '${v.projectPath}', pipelineId: ${v.pipelineId} });" style="cursor: pointer;"`),`
                            <div class="btn" style="padding: 6px 8px; font-size: 11px; display: flex; justify-content: space-between; align-items: center; background-color: var(--vscode-button-secondaryBackground); color: var(--vscode-button-secondaryForeground); border-radius: 4px; box-sizing: border-box; width: 100%;" onclick="sendCheckoutCommand('${C(v.name)}', this)" title="Checkout ${C(v.name)}">
                                <div style="display: flex; align-items: center; gap: 4px; overflow: hidden;">
                                    <span style="overflow: hidden; text-overflow: ellipsis; white-space: nowrap; font-weight: bold;">${C(v.name)}</span>
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
                <button class="copy-btn" id="autoRefreshToggle" onclick="sendCommand('toggleAutoRefresh', null, this)" title="${n?"Auto-refresh is ON \u2014 click to disable":"Auto-refresh is OFF \u2014 click to enable"}" style="font-size: 11px; padding: 2px 6px; border-radius: 3px; border: 1px solid var(--vscode-panel-border); ${n?"opacity: 0.9; background-color: var(--vscode-button-secondaryBackground);":"opacity: 0.5;"}">
                    ${n?"\u26A1 Auto":"\u23F8\uFE0F Auto"}
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
    </html>`}var _e=class{constructor(e){this._extensionUri=e}_extensionUri;webviewView;currentBranchCache="";currentBranchIsMergedCache=!1;relatedBranchesCache=[];commitsCache=[];baseBranchesCache=[];recentTicketsCache=[];ticketTitleCache="";ticketStatusCache="";currentPage="main";blameDataCache=null;jiraDataCache=null;dashboardDataCache=null;dashboardShowBranches=!1;autoRefreshEnabled=!0;conflictState=null;resolveWebviewView(e,o,i){this.webviewView=e,e.webview.options={enableScripts:!0,localResourceRoots:[this._extensionUri]},this.updateView(),e.webview.onDidReceiveMessage(r=>{switch(r.command){case"createBranches":P.commands.executeCommand("ricwiz.createBranches");break;case"createBranchForTicket":P.commands.executeCommand("ricwiz.createBranches",r.args);break;case"prepareDeploy":P.commands.executeCommand("ricwiz.prepareDeploy");break;case"openMRs":P.commands.executeCommand("ricwiz.createMergeRequests");break;case"openMRsVSCode":P.commands.executeCommand("ricwiz.createMergeRequestsVSCode");break;case"openExternal":r.args&&P.env.openExternal(P.Uri.parse(r.args));break;case"openJira":P.commands.executeCommand("ricwiz.openJiraTicket");break;case"showJiraDetails":P.commands.executeCommand("ricwiz.showJiraDetails");break;case"showPipelineLogs":P.commands.executeCommand("ricwiz.showPipelineLogs",r.args.projectPath,r.args.pipelineId);break;case"changeJiraStatus":P.commands.executeCommand("ricwiz.changeJiraStatus");break;case"addJiraComment":P.commands.executeCommand("ricwiz.addJiraComment");break;case"addJiraLabel":P.commands.executeCommand("ricwiz.addJiraLabel");break;case"setPage":this.setPage(r.args);break;case"openDashboard":P.commands.executeCommand("ricwiz.openJiraDashboard");break;case"openJiraDetailsForId":P.commands.executeCommand("ricwiz.openJiraDetailsForId",r.args);break;case"refreshDashboard":P.commands.executeCommand("ricwiz.openJiraDashboard");break;case"switchDashboardQuery":P.commands.executeCommand("ricwiz.openJiraDashboard",parseInt(r.args,10));break;case"toggleDashboardBranches":P.commands.executeCommand("ricwiz.toggleDashboardBranches",r.args);break;case"openJiraVSCode":P.commands.executeCommand("ricwiz.openJiraTicketVSCode");break;case"openSettings":P.commands.executeCommand("ricwiz.openSettings");break;case"checkout":let p=r.branch||r.args;p&&P.commands.executeCommand("ricwiz.checkoutBranch",p);break;case"copyBranch":P.commands.executeCommand("ricwiz.copyBranchName");break;case"generatePackageXml":P.commands.executeCommand("ricwiz.generatePackageXml");break;case"openDevTools":this.setPage("devtools");break;case"openMain":this.setPage("main");break;case"generateDestructiveChanges":P.commands.executeCommand("ricwiz.generateDestructiveChanges");break;case"deployPackage":P.commands.executeCommand("ricwiz.deployPackage");break;case"runSmartTests":P.commands.executeCommand("ricwiz.runSmartTests");break;case"importData":P.commands.executeCommand("ricwiz.importData");break;case"listTicketFiles":P.commands.executeCommand("ricwiz.listTicketFiles");break;case"resetTracking":P.commands.executeCommand("ricwiz.resetTracking");break;case"extractComponent":P.commands.executeCommand("ricwiz.extractComponent");break;case"deployMultiOrg":P.commands.executeCommand("ricwiz.deployMultiOrg");break;case"captureAdminChanges":P.commands.executeCommand("ricwiz.captureAdminChanges");break;case"whoToBlame":P.commands.executeCommand("ricwiz.whoToBlame");break;case"syncAll":P.commands.executeCommand("ricwiz.syncAll");break;case"updateBases":P.commands.executeCommand("ricwiz.updateBases");break;case"deleteUnused":P.commands.executeCommand("ricwiz.deleteUnusedBranches");break;case"conflict_commitAndContinue":P.commands.executeCommand("ricwiz.conflictAction","commitAndContinue");break;case"conflict_resolveDeletions":P.commands.executeCommand("ricwiz.conflictAction","resolveDeletions");break;case"conflict_abortDeploy":P.commands.executeCommand("ricwiz.conflictAction","abortDeploy");break;case"openFile":if(r.file){let s=P.workspace.workspaceFolders;if(s){let c=P.Uri.joinPath(s[0].uri,r.file);P.commands.executeCommand("vscode.open",c)}}break;case"searchTicket":P.commands.executeCommand("ricwiz.searchTicket");break;case"manualRefresh":P.commands.executeCommand("ricwiz.manualRefresh");break;case"toggleAutoRefresh":P.commands.executeCommand("ricwiz.toggleAutoRefresh");break;case"openHistory":P.commands.executeCommand("ricwiz.openHistory");break;case"generateCommitMessage":P.commands.executeCommand("ricwiz.generateCommitMessage");break}})}setConflictState(e){this.conflictState=e,this.updateView()}updateBranch(e,o,i=[],r=[],p=[],s=[],c="",d=""){this.currentBranchCache=e,this.currentBranchIsMergedCache=o,this.relatedBranchesCache=i,this.commitsCache=r,this.baseBranchesCache=p,this.recentTicketsCache=s,this.ticketTitleCache=c,this.ticketStatusCache=d,this.webviewView&&this.updateView()}setDashboardShowBranches(e){this.dashboardShowBranches=e}getDashboardShowBranches(){return this.dashboardShowBranches}setBlameData(e){this.blameDataCache=e}setJiraData(e){this.jiraDataCache=e}setDashboardData(e){this.dashboardDataCache=e}setAutoRefresh(e){this.autoRefreshEnabled=e,this.updateView()}isAutoRefreshEnabled(){return this.autoRefreshEnabled}setPage(e){this.currentPage=e,this.updateView()}updateView(){if(!this.webviewView)return;let e=this.webviewView.webview.asWebviewUri(P.Uri.joinPath(this._extensionUri,"resources","logo.png"));if(this.conflictState){this.webviewView.webview.html=yt(e,this.conflictState);return}switch(this.currentPage){case"blame":this.webviewView.webview.html=bt(this.blameDataCache);break;case"jira":this.webviewView.webview.html=xt(this.jiraDataCache);break;case"dashboard":this.webviewView.webview.html=kt({data:this.dashboardDataCache,showBranches:this.dashboardShowBranches});break;case"devtools":this.webviewView.webview.html=Ct();break;default:this.webviewView.webview.html=$t({logoUri:e,currentBranch:this.currentBranchCache,currentBranchIsMerged:this.currentBranchIsMergedCache,relatedBranches:this.relatedBranchesCache,commits:this.commitsCache,baseBranches:this.baseBranchesCache,recentTickets:this.recentTicketsCache,ticketTitle:this.ticketTitleCache,ticketStatus:this.ticketStatusCache,autoRefreshEnabled:this.autoRefreshEnabled});break}}};var ve=k(require("vscode"));var Rt=k(require("vscode")),Wo=Rt.window.createOutputChannel("Ricwiz Debug");function j(t){let e=new Date().toISOString();Wo.appendLine(`[${e}] ${t}`),console.log(`[Ricwiz] ${t}`)}async function zt(t){j("initializeSecrets: No longer using SecretStorage. Tokens are read directly from VS Code configuration.")}async function Pt(t){j("storeJiraToken: Storing token in VS Code global configuration..."),await ve.workspace.getConfiguration("ricwiz").update("jiraApiToken",t,ve.ConfigurationTarget.Global),j("storeJiraToken: Successfully stored")}async function Qe(){j("getJiraToken: Reading token from VS Code configuration...");let e=ve.workspace.getConfiguration("ricwiz").get("jiraApiToken","");if(e)return j("getJiraToken: Successfully read Jira Token from configuration."),e;j("getJiraToken: Token not found in configuration.")}async function Bt(t){j("storeGitlabToken: Storing token in VS Code global configuration..."),await ve.workspace.getConfiguration("ricwiz").update("gitlabApiToken",t,ve.ConfigurationTarget.Global),j("storeGitlabToken: Successfully stored")}async function Ce(){j("getGitlabToken: Reading token from VS Code configuration...");let e=ve.workspace.getConfiguration("ricwiz").get("gitlabApiToken","");if(e)return e}var y=k(require("vscode"));var G=k(require("vscode")),Xe=k(require("path")),ye=k(require("fs"));var Le=k(require("vscode")),Ye=k(require("child_process")),St=k(require("util")),Go=St.promisify(Ye.exec),R=Le.window.createOutputChannel("Ricwiz"),g=async(t,e)=>{R.appendLine(`[EXEC] ${t}`);let o=await Go(t,{maxBuffer:50*1024*1024,...e});return{stdout:o.stdout.toString(),stderr:o.stderr.toString()}};function z(){let t=Le.workspace.workspaceFolders;if(t)return t[0].uri.fsPath}async function L(t){try{return(await new Promise((o,i)=>{Ye.execFile("git",["branch","--show-current"],{cwd:t},(r,p)=>{r?i(r):o(p)})})).trim()}catch{return""}}function te(t,e){if(!t.includes(e)){let o=t.match(/([A-Z]+-)\d+/i);if(o)return o[1].toUpperCase()}return e}function pe(t,e,o=!1){let i=t.match(new RegExp(`(${e}\\d+)`,"i"));return i?i[1].toUpperCase():t.includes(e)&&!t.includes("-to-")?t.substring(t.indexOf(e)):o&&t.includes("-to-")?t.substring(t.indexOf(e)).split("-to-")[0]:""}function st(t,e){let o=$e(t);return/^\d/.test(o)?`${e}${o}`.toUpperCase():o.toUpperCase()}async function Q(t,e){let o=Le.workspace.getConfiguration("ricwiz"),i=e?.prefix??o.get("ticketPrefix","SFPSCA-"),r=await L(t),p=te(r,i),s=e?.suggestedValue??pe(r,p,e?.handleToSuffix),c=await Le.window.showInputBox({prompt:e?.prompt||"Enter the full ticket ID (e.g., SCPSCA-1234) or just the number",placeHolder:e?.placeHolder||"Ticket ID or number",value:s,ignoreFocusOut:!0});return c?{ticketId:st(c,p),currentBranch:r,prefix:p}:void 0}async function se(t,e){try{return await g(`git show-ref --verify --quiet refs/heads/${e}`,{cwd:t}),!0}catch{}return await Ho(t,e)}async function Ho(t,e){try{let{stdout:o}=await g(`git branch -r --list "*/${e}"`,{cwd:t});return o.trim().length>0}catch{return!1}}function $e(t){return t.replace(/[&|;$><`\\!"'\r\n]/g,"").trim()}var Re=k(require("vscode")),Tt=k(require("path")),Ke=k(require("fs"));var T=class t{style;upstreamRemote;originRemote;ticketSourceBranch;ticketPrefix;branchPrefix;environments;activeProfile;profileName;constructor(e){this.activeProfile=e,this.profileName=e?.name;let o=Re.workspace.getConfiguration("ricwiz");this.style=e?.workflowStyle||o.get("workflowStyle","standard"),this.style==="multi-remote"?(this.upstreamRemote=e?.upstreamRemote||o.get("upstreamRemote","salesforce-master"),this.originRemote=e?.originRemote||o.get("originRemote","origin")):(this.upstreamRemote="origin",this.originRemote="origin"),this.ticketSourceBranch=e?.ticketSourceBranch||o.get("ticketSourceBranch","main"),this.ticketPrefix=e?.ticketPrefix||o.get("ticketPrefix","SFPSCA-"),this.branchPrefix=e?.branchPrefix??o.get("branchPrefix","");let i=[{name:"Qual",sourceBranch:"quality"},{name:"Val",sourceBranch:"validation"},{name:"Prod",sourceBranch:"main"}];this.environments=e?.environments||o.get("environments",i)}getConfig(e,o){return this.activeProfile&&this.activeProfile[e]!==void 0?this.activeProfile[e]:Re.workspace.getConfiguration("ricwiz").get(e,o)}static async initialize(e,o){let r=Re.workspace.getConfiguration("ricwiz").get("profiles",[]),p=Tt.join(e,"ricwiz.json");if(Ke.existsSync(p))try{let s=Ke.readFileSync(p,"utf-8"),c=JSON.parse(s);c&&Array.isArray(c.profiles)&&(r=[...r,...c.profiles])}catch(s){Re.window.showErrorMessage(`Ricwiz: Error parsing ricwiz.json: ${s.message}`)}if(r.length>0){if(!o?.forcePrompt)try{let{stdout:a}=await g("git branch --show-current",{cwd:e}),n=a.trim(),m=n;n.includes("-to-")&&(m=n.split("-to-")[0]);let{stdout:l}=await g(`git config branch.${m}.ricwiz-profile`,{cwd:e}),u=l.trim();if(u){let f=r.find(h=>h.name===u);if(f)return new t(f)}}catch{}if(o?.skipPrompt)return new t;let s=r.map(a=>a.name),c=await Re.window.showQuickPick(s,{placeHolder:"Ricwiz: Select Workflow Profile",ignoreFocusOut:!0});if(!c)return;let d=r.find(a=>a.name===c);return new t(d)}return new t}buildUpstreamPath(e){return e.includes("/")?e:`${this.upstreamRemote}/${e}`}getFetchRemote(e){return e.includes("/")?e.split("/")[0]:this.upstreamRemote}getFetchBranch(e){return e.includes("/")?e.substring(e.indexOf("/")+1):e}};function Ze(t){let e=t.replace(/\\/g,"/");if(e.includes("/classes/")){let o=e.match(/\/classes\/([^/.]+)\.cls/);if(o)return{type:"ApexClass",name:o[1]}}if(e.includes("/triggers/")){let o=e.match(/\/triggers\/([^/.]+)\.trigger/);if(o)return{type:"ApexTrigger",name:o[1]}}if(e.includes("/lwc/")){let o=e.match(/\/lwc\/([^/]+)\//);if(o)return{type:"LightningComponentBundle",name:o[1]}}if(e.includes("/aura/")){let o=e.match(/\/aura\/([^/]+)\//);if(o)return{type:"AuraDefinitionBundle",name:o[1]}}if(e.includes("/objects/")&&e.includes("/fields/")){let o=e.match(/\/objects\/([^/]+)\//),i=e.match(/\/fields\/([^/.]+)\.field/);if(o&&i)return{type:"CustomField",name:`${o[1]}.${i[1]}`}}if(e.includes("/objects/")){let o=e.match(/\/objects\/([^/.]+)\.object/);if(o)return{type:"CustomObject",name:o[1]}}if(e.includes("/layouts/")){let o=e.match(/\/layouts\/([^/.]+)\.layout/);if(o)return{type:"Layout",name:o[1]}}if(e.includes("/flows/")){let o=e.match(/\/flows\/([^/.]+)\.flow/);if(o)return{type:"Flow",name:o[1]}}if(e.includes("/permissionsets/")){let o=e.match(/\/permissionsets\/([^/.]+)\.permissionset/);if(o)return{type:"PermissionSet",name:o[1]}}if(e.includes("/permissionsetgroups/")){let o=e.match(/\/permissionsetgroups\/([^/.]+)\.permissionsetgroup/);if(o)return{type:"PermissionSetGroup",name:o[1]}}if(e.includes("/profiles/")){let o=e.match(/\/profiles\/([^/.]+)\.profile/);if(o)return{type:"Profile",name:o[1]}}if(e.includes("/customMetadata/")){let o=e.match(/\/customMetadata\/([^/.]+)\.md/);if(o)return{type:"CustomMetadata",name:o[1]}}if(e.includes("/flexipages/")){let o=e.match(/\/flexipages\/([^/.]+)\.flexipage/);if(o)return{type:"FlexiPage",name:o[1]}}return null}async function Dt(){let t=z();if(!t){G.window.showErrorMessage("Ricwiz: Open a workspace that is a Git repository.");return}let e=await T.initialize(t,{skipPrompt:!0}),o=e?e.ticketSourceBranch:G.workspace.getConfiguration("ricwiz").get("ticketSourceBranch","main"),i=e?e.originRemote:"origin";await G.window.withProgress({location:G.ProgressLocation.Notification,title:`Ricwiz: Finding deleted files compared to ${i}/${o}...`,cancellable:!1},async()=>{try{let{stdout:r}=await g(`git diff --name-only --diff-filter=D ${i}/${o}...HEAD`,{cwd:t}),p=r.split(`
`).map(u=>u.trim()).filter(u=>u.length>0);if(p.length===0){G.window.showInformationMessage(`Ricwiz: No deleted files found compared to ${i}/${o}.`);return}let s={},c=(u,f)=>{s[u]||(s[u]=[]),s[u].includes(f)||s[u].push(f)};for(let u of p){let f=Ze(u);f&&c(f.type,f.name)}if(Object.keys(s).length===0){G.window.showInformationMessage("Ricwiz: Found deleted files in Git, but none mapped to recognizable Salesforce metadata.");return}let d=`<?xml version="1.0" encoding="UTF-8"?>
<Package xmlns="http://soap.sforce.com/2006/04/metadata">
`;for(let u of Object.keys(s).sort()){d+=`    <types>
`;for(let f of s[u].sort())d+=`        <members>${f}</members>
`;d+=`        <name>${u}</name>
    </types>
`}d+=`    <version>58.0</version>
</Package>`;let a=Xe.join(t,"destructiveChanges");ye.existsSync(a)||ye.mkdirSync(a);let n=Xe.join(a,"destructiveChanges.xml"),m=Xe.join(a,"package.xml");ye.writeFileSync(n,d,"utf8"),ye.existsSync(m)||ye.writeFileSync(m,`<?xml version="1.0" encoding="UTF-8"?>
<Package xmlns="http://soap.sforce.com/2006/04/metadata">
    <version>58.0</version>
</Package>`,"utf8");let l=await G.workspace.openTextDocument(n);await G.window.showTextDocument(l),G.window.showInformationMessage("Ricwiz: destructiveChanges.xml generated successfully!")}catch(r){G.window.showErrorMessage(`Ricwiz: Error generating destructive changes: ${r.message}`)}})}var ae=k(require("vscode"));async function Et(){let t=z();if(!t)return;let e=await T.initialize(t,{skipPrompt:!0}),o=e?e.ticketSourceBranch:ae.workspace.getConfiguration("ricwiz").get("ticketSourceBranch","main"),i=e?e.originRemote:"origin";await ae.window.withProgress({location:ae.ProgressLocation.Notification,title:"Ricwiz: Finding Apex Tests to run...",cancellable:!1},async()=>{try{let{stdout:r}=await g(`git diff --name-status ${i}/${o}...HEAD`,{cwd:t}),p=r.split(`
`).map(u=>u.trim()).filter(u=>u.length>0),s=new Set,c=new Set;for(let u of p){let f=u.split(/\s+/);if(f[0].startsWith("D"))continue;let h=f[1];if(h&&h.endsWith(".cls")){let w=h.match(/\/classes\/([^/.]+)\.cls/);if(w){let $=w[1];$.toLowerCase().endsWith("test")?s.add($):c.add($)}}}for(let u of c)s.add(`${u}Test`);if(s.size===0){ae.window.showInformationMessage("Ricwiz: No Apex Classes were modified in this branch.");return}let d=Array.from(s).map(u=>({label:`$(beaker) ${u}`,description:"Apex Test Class"})),a=await ae.window.showQuickPick(d,{canPickMany:!0,title:"Select Test Classes to Run",placeHolder:"Select tests..."});if(!a||a.length===0)return;let m=`sf apex run test -n ${a.map(u=>u.label.replace("$(beaker) ","").trim()).join(",")} -r human -w 30`,l=ae.window.createTerminal("Ricwiz: Smart Tests");l.show(),l.sendText(m)}catch(r){ae.window.showErrorMessage(`Ricwiz: Error finding tests: ${r.message}`)}})}var M=k(require("vscode"));var ze=class{static isValidShellArg(e){return e?/^[a-zA-Z0-9\-_/.]+$/.test(e):!1}};async function Mt(t){let e=z();if(!e){M.window.showErrorMessage("Open a folder or workspace that is a Git repository.");return}let o=await T.initialize(e,{forcePrompt:!0});if(!o)return;let i=typeof t=="string"?t:void 0,r=await Q(e,{prefix:o.ticketPrefix,suggestedValue:i});if(!r){M.window.showErrorMessage("Branch creation cancelled: Ticket not provided.");return}let{ticketId:p}=r,s=o.environments,c="";if(o.branchPrefix){let f=await M.window.showInputBox({prompt:"Ricwiz: Branch Prefix (leave empty to not use a prefix)",placeHolder:"e.g. CRC-R19-",value:o.branchPrefix,ignoreFocusOut:!0});if(f===void 0){M.window.showInformationMessage("Branch creation cancelled.");return}c=f.trim()}let d=c?`${c}${p}`:p,a=[{label:`$(git-branch) Main Branch (${d})`,description:`Base: ${o.ticketSourceBranch}`,picked:!0,type:"main",branchName:d}];for(let f of s){let h=c?`${c}${p}-to-${f.name}`:`${p}-to-${f.name}`;a.push({label:`$(cloud) ${f.name} (${h})`,description:`Base: ${f.sourceBranch}`,picked:!0,type:"env",branchName:h,envConfig:f})}let n=await M.window.showQuickPick(a,{placeHolder:"Ricwiz: Select branches to create (check/uncheck as needed)",canPickMany:!0,ignoreFocusOut:!0});if(!n||n.length===0){M.window.showInformationMessage("Branch creation cancelled: No branches selected.");return}let m=n.some(f=>f.type==="main"),l=n.filter(f=>f.type==="env").map(f=>({env:f.envConfig,branchName:f.branchName})),u=o.ticketSourceBranch;if(m){let f=[];try{let{stdout:x}=await g('git branch --all --format="%(refname:short)"',{cwd:e});f=x.split(`
`).map(b=>b.trim()).filter(b=>b&&b!=="origin"),f=[...new Set(f)]}catch{}let h=M.window.createQuickPick();h.title=`Ricwiz: Base Source Branch for '${d}'`,h.placeholder="Confirm or change the source branch for this ticket";let w=f.find(x=>x.endsWith(`/${o.ticketSourceBranch}`))??o.ticketSourceBranch;h.value=w,h.ignoreFocusOut=!0;let $=()=>{let x=h.value.trim(),b=[];x&&b.push({label:x,description:"Use typed branch"}),b.push(...f.map(S=>({label:S}))),h.items=b};h.onDidChangeValue($),$();let v=await new Promise(x=>{h.onDidAccept(()=>{let b=h.selectedItems[0];x(b?b.label:h.value),h.hide()}),h.onDidHide(()=>x(void 0)),h.show()});if(!v){M.window.showInformationMessage("Branch creation cancelled.");return}u=v.trim()}if(m&&!ze.isValidShellArg(d)){M.window.showErrorMessage(`Invalid format for ticket ID: ${d}`);return}if(m&&!ze.isValidShellArg(u)){M.window.showErrorMessage(`Invalid format for ticketSourceBranch in settings: ${u}`);return}for(let f of l){if(!ze.isValidShellArg(f.env.name)){M.window.showErrorMessage(`Invalid format for environment name: ${f.env.name}`);return}if(!ze.isValidShellArg(f.env.sourceBranch)){M.window.showErrorMessage(`Invalid format for environment sourceBranch: ${f.env.sourceBranch}`);return}}try{await g("git status",{cwd:e})}catch{M.window.showErrorMessage("The opened folder does not appear to be a valid Git repository.");return}try{await M.window.withProgress({location:M.ProgressLocation.Notification,title:"Ricwiz: Creating Branches",cancellable:!1},async f=>{let h=[];f.report({message:"Checking remote status (git fetch)...",increment:10});try{await g("git fetch",{cwd:e})}catch{}try{if(m){if(f.report({message:`Creating main branch ${d}...`,increment:15}),await se(e,d))M.window.showInformationMessage(`Ricwiz: The branch ${d} already exists. Skipping creation...`),await g(`git checkout ${d}`,{cwd:e});else try{let $=o.getFetchRemote(u),v=o.getFetchBranch(u),x=o.buildUpstreamPath(u);await g(`git fetch ${$} ${v}`,{cwd:e}),await g(`git checkout -b ${d} ${x}`,{cwd:e}),h.push(d)}catch{try{await g(`git checkout -b ${d} ${u}`,{cwd:e}),h.push(d)}catch{throw new Error(`Could not create main branch '${d}' from '${u}'. Does the source branch exist?`)}}try{await g(`git config branch.${d}.ricwiz-source "${u}"`,{cwd:e}),o.profileName&&await g(`git config branch.${d}.ricwiz-profile "${o.profileName}"`,{cwd:e})}catch{}}if(l.length>0){let $=50/(l.length||1);for(let v of l){let x=v.branchName,b=v.env.sourceBranch;if(f.report({message:`Processing environment branch ${x}...`,increment:$}),!await se(e,x))try{let S=o.getFetchRemote(b),E=o.getFetchBranch(b),B=o.buildUpstreamPath(b);await g(`git fetch ${S} ${E}`,{cwd:e}),await g(`git checkout -b ${x} ${B}`,{cwd:e}),h.push(x)}catch{try{await g(`git checkout -b ${x} ${b}`,{cwd:e}),h.push(x)}catch{throw new Error(`Could not create environment branch '${x}' from '${b}'. Does the source branch exist?`)}}}}f.report({message:`Publishing branches to ${o.originRemote}...`,increment:15});for(let $ of h)try{await g(`git push -u ${o.originRemote} ${$}`,{cwd:e})}catch{M.window.showWarningMessage(`Ricwiz: Branch ${$} was created locally but could not be pushed to ${o.originRemote}.`)}let w=m?d:l[0]?.branchName||"";if(w){f.report({message:`Switching to ${w}...`,increment:10});try{await g(`git checkout ${w}`,{cwd:e})}catch{}}f.report({increment:100}),M.window.showInformationMessage("Ricwiz: All set! You can start working on your branches! \u{1F680}")}catch(w){if(M.window.showErrorMessage(`Ricwiz Branch Creation Failed: ${w.message}`),h.length>0){try{await g(`git checkout ${u}`,{cwd:e})}catch{}for(let $ of h)try{await g(`git branch -D ${$}`,{cwd:e})}catch{}M.window.showWarningMessage(`Ricwiz: Rolled back (deleted) ${h.length} branch(es) locally due to failure.`)}}})}catch(f){M.window.showErrorMessage(`Ricwiz general error: ${f.message}`)}}var F=k(require("vscode"));var be=k(require("vscode")),Oe=k(require("fs")),Ne=k(require("path"));var ct;function at(t){ct=t}async function At(t){ct&&await ct(t)}async function Pe(t,e,o,i,r){i&&i.report({message:"CONFLICT! Resolve & click 'Commit & Continue' in Ricwiz panel."});let p=!1,s=!1;r&&r.onCancellationRequested(()=>{s=!0});let c=async()=>{try{let{stdout:n}=await g("git status --porcelain",{cwd:t});return n.split(`
`).filter(m=>{let l=m.substring(0,2);return["UD","DU","DD","AU","UA"].includes(l)}).map(m=>m.substring(3).trim())}catch{return[]}},d=async()=>{try{let n=l=>l==="UU"?"Both Modified":l==="UD"?"Deleted by them":l==="DU"?"Deleted by us":l==="DD"?"Both Deleted":l==="AA"?"Both Added":l==="AU"?"Added by us":l==="UA"?"Added by them":"Conflicted",{stdout:m}=await g("git status --porcelain",{cwd:t});return m.split(`
`).map(l=>l.trimEnd()).filter(l=>l.length>2).filter(l=>{let u=l.substring(0,2);return["UU","AA","UD","DU","AU","UA","DD"].includes(u)}).map(l=>{let u=l.substring(0,2);return{file:l.substring(3).trim(),state:n(u)}})}catch{return[]}},a=async()=>{if(p)return;let n=await c(),m=await d();ce&&ce.setConflictState({isConflict:!0,sourceStr:e,targetStr:o,deletionsCount:n.length,files:m})};for(at(async n=>{if(n==="abortDeploy")s=!0;else if(n==="resolveDeletions"){try{let l=(await c()).map(f=>({label:f})),u=await be.window.showQuickPick(l,{canPickMany:!0,placeHolder:"Select conflicted files to DELETE",title:"Ricwiz: Delete Conflicted Files"});if(u&&u.length>0){for(let f of u)try{await g(`git rm --force "${f.label}"`,{cwd:t})}catch{}be.window.showInformationMessage(`Ricwiz: Deleted ${u.length} conflicted file(s).`)}}catch(m){be.window.showErrorMessage(`Ricwiz: Error. (${m.message})`)}a()}else if(n==="commitAndContinue")try{let l=(await c()).filter(f=>Oe.existsSync(Ne.join(t,f)));if(l.length>0&&await be.window.showWarningMessage(`Wait! There are ${l.length} file(s) with deletion conflicts that are still on your disk.

If you commit now, you will KEEP them in the project.

Are you sure you want to KEEP them?`,{modal:!0},"Yes, KEEP them","No, let me DELETE them")!=="Yes, KEEP them"){a();return}let u=!1;try{let{stdout:f}=await g('git grep -E "^<<<<<<< "',{cwd:t});f.trim().length>0&&(u=!0)}catch{}if(u){be.window.showErrorMessage("Ricwiz: You still have unresolved conflict markers (<<<<<<<) in your files. Please resolve them first!"),a();return}await g("git add .",{cwd:t}),await g("git commit --no-edit",{cwd:t})}catch(m){be.window.showErrorMessage(`Ricwiz: Could not commit automatically. (${m.message})`),a()}}),a();;){if(s){p=!0,at(void 0),ce?.setConflictState(null);try{await g("git merge --abort",{cwd:t})}catch{}return!1}try{let{stdout:n}=await g("git status --porcelain",{cwd:t}),m=n.split(`
`).some(w=>{let $=w.substring(0,2);return["UU","AA","UD","DU","AU","UA","DD"].includes($)}),l=Ne.join(t,".git","MERGE_HEAD"),u=Ne.join(t,".git","REBASE_HEAD"),f=Ne.join(t,".git","CHERRY_PICK_HEAD");if(!(m||Oe.existsSync(l)||Oe.existsSync(u)||Oe.existsSync(f)))return p=!0,at(void 0),ce?.setConflictState(null),be.window.showInformationMessage("Ricwiz: Changes committed!"),!0}catch{}await new Promise(n=>setTimeout(n,2e3))}}var et=k(require("https")),Lt=k(require("vscode"));async function mt(){let t=await Ce();return!!(t&&t.trim())}async function Vo(t,e){let o=Lt.workspace.getConfiguration("ricwiz"),i=(await Ce())?.trim();if(!i)throw new Error("No GitLab token");let r=e?e.getConfig("gitlabUrlOverride",""):o.get("gitlabUrlOverride",""),p=[];if(r&&r.trim()!=="")p.push(r.trim());else try{let{stdout:c}=await g("git remote",{cwd:t}),d=c.split(`
`).map(n=>n.trim()).filter(n=>n),a=[];e&&e.upstreamRemote&&d.includes(e.upstreamRemote)&&a.push(e.upstreamRemote),e&&e.originRemote&&e.originRemote!==e.upstreamRemote&&d.includes(e.originRemote)&&a.push(e.originRemote),d.includes("upstream")&&!a.includes("upstream")&&a.push("upstream"),d.includes("origin")&&!a.includes("origin")&&a.push("origin"),a.length===0&&d.length>0&&a.push(...d);for(let n of a)try{let{stdout:m}=await g(`git remote get-url ${n}`,{cwd:t}),l=m.trim();l.endsWith(".git")&&(l=l.slice(0,-4)),l.startsWith("git@")&&(l=l.replace("git@","").replace(":","/"),l=`https://${l}`),p.push(l)}catch(m){R.appendLine(`[GitLab API] Error getting remote URL for ${n}: ${m.message}`)}}catch(c){R.appendLine(`[GitLab API] Error getting remotes: ${c.message}`)}if(p.length===0)throw R.appendLine("[GitLab API] No candidate URLs found in getGitlabTargets!"),new Error("Could not get any remote origin URL.");return p.map(c=>{let d=new URL(c),a=`${d.protocol}//${d.host}`,n=d.pathname;n.startsWith("/")&&(n=n.substring(1)),n.endsWith("/")&&(n=n.slice(0,-1)),n.endsWith(".git")&&(n=n.slice(0,-4));let m=encodeURIComponent(n);return{baseUrl:a,token:i,projectPath:m}})}var qo=new et.Agent({keepAlive:!0,maxSockets:10});async function dt(t,e,o,i){let r=new URL(`${t}${i}`);return R.appendLine(`[GitLab API] ${o} ${r.toString()}`),new Promise((p,s)=>{let c=et.request(r,{method:o,timeout:5e3,agent:qo,headers:{"PRIVATE-TOKEN":e,Accept:"application/json"}},d=>{let a="";d.on("data",n=>a+=n),d.on("end",()=>{if(R.appendLine(`[GitLab API] Response Code: ${d.statusCode}`),d.statusCode&&d.statusCode>=400)return R.appendLine(`[GitLab API] Error Data: ${a}`),s(new Error(`GitLab API error: ${d.statusCode}`));if(!a)return p({});try{let n=JSON.parse(a);Array.isArray(n)?R.appendLine(`[GitLab API] Returned array with ${n.length} items`):n&&typeof n=="object"&&R.appendLine(`[GitLab API] Returned object with id ${n.id||n.iid||"unknown"}`),p(n)}catch(n){R.appendLine(`[GitLab API] Parse Error: ${n.message}`),s(n)}})});c.on("timeout",()=>{c.destroy(),s(new Error("GitLab request timed out"))}),c.on("error",d=>{R.appendLine(`[GitLab API] Request Failed: ${d.message}`),s(d)}),c.end()})}var lt=new Map,_o=30*1e3;async function pt(t,e,o,i){R.appendLine(`[GitLab API] fetchMergeRequestStatus called for source: ${e}, target: ${o||"any"}`);let r=`${t}:${e}:${o||"any"}`,p=lt.get(r);if(p&&Date.now()-p.timestamp<_o)return p.data;try{let s=await Vo(t,i),c=null,d=-1;for(let a of s)try{let n=`/api/v4/projects/${a.projectPath}/merge_requests?source_branch=${encodeURIComponent(e)}&order_by=updated_at&sort=desc`;o&&(n+=`&target_branch=${encodeURIComponent(o)}`);let m=await dt(a.baseUrl,a.token,"GET",n);if(m&&m.length>0){let l=m[0];try{let w=await dt(a.baseUrl,a.token,"GET",`/api/v4/projects/${a.projectPath}/merge_requests/${l.iid}`);w&&(l=w)}catch{}let u="none";if(l.head_pipeline&&l.head_pipeline.status){let w=l.head_pipeline.status;w==="success"||w==="failed"||w==="canceled"||w==="skipped"?u=w:u="running"}let f={isMerged:l.state==="merged",isOpen:l.state==="opened",pipelineStatus:u,webUrl:l.web_url,projectPath:a.projectPath,pipelineId:l.head_pipeline?l.head_pipeline.id:void 0},h=0;f.isOpen?h=2:f.isMerged&&(h=1),h>d&&(c=f,d=h)}}catch(n){R.appendLine(`[GitLab API] Error inside target loop: ${n.message}`)}if(c)return lt.set(r,{data:c,timestamp:Date.now()}),c;for(let a of s)try{let n=`/api/v4/projects/${a.projectPath}/pipelines?ref=${encodeURIComponent(e)}&order_by=updated_at&sort=desc`,m=await dt(a.baseUrl,a.token,"GET",n);if(m&&m.length>0){let l=m[0],u="none";if(l.status){let h=l.status;h==="success"||h==="failed"||h==="canceled"||h==="skipped"?u=h:u="running"}let f={isMerged:!1,isOpen:!1,pipelineStatus:u,webUrl:l.web_url,projectPath:a.projectPath,pipelineId:l.id};return lt.set(r,{data:f,timestamp:Date.now()}),f}}catch{}return null}catch(s){return R.appendLine(`[GitLab API] Failed to fetch MR status: ${s.message}`),null}}function It(t,e){return e.find(o=>t.endsWith(`-to-${o.name}`))}async function Be(t,e,o,i,r){let p=await mt(),s=e.map(async c=>{let d=It(c,i);if(p){let a=d?d.sourceBranch:void 0,n=await pt(t,c,a,r);if(n)return{name:c,isMerged:n.isMerged,pipelineStatus:n.pipelineStatus,mrUrl:n.webUrl,projectPath:n.projectPath,pipelineId:n.pipelineId}}else R.appendLine(`[GitLab API] Skipping MR check for ${c} because hasGitlabToken() is false`);return{name:c,isMerged:!1,pipelineStatus:"none"}});return await Promise.all(s)}async function Ft(t,e,o,i){let r=It(e,o);if(!r)return!1;if(await mt()){let p=await pt(t,e,r.sourceBranch,i);if(p)return p.isMerged}else R.appendLine(`[GitLab API] Skipping MR check for current branch ${e} because hasGitlabToken() is false`);return!1}async function Ut(t,e=10){try{let{stdout:o}=await g(`git log --oneline -${e} --format="%h|||%s|||%ar"`,{cwd:t});return o.split(`
`).filter(i=>i.trim()).map(i=>{let r=i.split("|||");return{hash:r[0]||"",message:r.length>=3?r.slice(1,-1).join("|||"):r[1]||"",timeAgo:r.length>=3?r[r.length-1]:""}})}catch{return[]}}async function Ot(t,e=3){try{let{stdout:o}=await g('git for-each-ref --sort=-committerdate --format="%(refname:short)" refs/heads/',{cwd:t}),i=o.split(`
`).map(p=>p.trim()).filter(p=>p),r=/^[A-Z]+-\d+$/i;return i.filter(p=>r.test(p)).slice(0,e)}catch{return[]}}async function Se(t,e,o){let{stdout:i}=await g(`git branch --all --list "*${e}*"`,{cwd:t}),r=new Set,p=new RegExp(`${e}(?!\\d)`,"i");return i.split(`
`).forEach(s=>{let c=s.replace("*","").trim();if(c){if(c.startsWith("remotes/")){let d=c.split("/");d.length>2&&(c=d.slice(2).join("/"))}c&&c!==o&&!c.includes("HEAD")&&p.test(c)&&r.add(c)}}),Array.from(r)}async function de(t,e,o){try{let{stdout:i}=await g(`git branch --all --list "*${e}*"`,{cwd:t}),r=new RegExp(`${e}(?!\\d)`,"i"),p=i.split(`
`).map(c=>c.replace("*","").trim().replace(/^remotes\/[^\/]+\//,"")).filter(c=>c&&!c.includes("HEAD")&&r.test(c)),s=Array.from(new Set(p));if(o){let c=`-to-${o}`,d=s.find(a=>a.endsWith(c));return d||`${e}${c}`}else{let c=s.find(d=>!d.includes("-to-"));return c||e}}catch{return o?`${e}-to-${o}`:e}}async function Nt(){let t=z();if(!t){F.window.showErrorMessage("Ricwiz: Open a folder or workspace that is a Git repository.");return}try{await g("git status",{cwd:t})}catch{F.window.showErrorMessage("Ricwiz: The opened folder does not appear to be a valid Git repository.");return}let e=await T.initialize(t);if(!e)return;let o=e.environments,i=await Q(t,{prefix:e.ticketPrefix});if(!i){F.window.showErrorMessage("Operation cancelled: Ticket not provided.");return}let{ticketId:r,currentBranch:p}=i;try{await g("git fetch --all",{cwd:t})}catch{}let s=await de(t,r);if(!await se(t,s)){F.window.showErrorMessage(`Ricwiz: Main branch '${s}' does not exist! Prepare deploy is only available when a main ticket branch is used.`);return}let c=[];for(let l of o){let u=await de(t,r,l.name);await se(t,u)&&c.push({env:l,branchName:u})}let d=c.length===0,a="";if(d){let l="";try{let{stdout:f}=await g(`git config branch.${s}.ricwiz-source`,{cwd:t});l=f.trim()}catch{}if(!l&&s.includes(r)&&s!==r){let f=s.split(r)[0].replace(/[-_]+$/,"");f&&(l=f)}l||(l=e.ticketSourceBranch||"main");let u=await F.window.showInputBox({prompt:`Ricwiz: Confirm or enter the Release branch in '${e.originRemote}' to merge into '${s}'`,placeHolder:"e.g. CRC-R19, main, release/v5.0",value:l,ignoreFocusOut:!0});if(u===void 0||!u.trim()){F.window.showInformationMessage("Ricwiz: Prepare deploy cancelled.");return}a=u.trim();try{await g(`git config branch.${s}.ricwiz-source "${a}"`,{cwd:t})}catch{}}let n=e.getConfig("defaultReviewers",""),m="";try{let{stdout:l}=await g(`git config branch.${s}.ricwiz-reviewers`,{cwd:t});m=l.trim()}catch{}if(n.trim()){let l=await F.window.showInputBox({prompt:"Ricwiz: Reviewers for this deploy (optional, comma-separated)",placeHolder:"e.g. @joao, 123456",value:m||n,ignoreFocusOut:!0});if(l===void 0)return;try{l.trim()?await g(`git config branch.${s}.ricwiz-reviewers "${l.trim()}"`,{cwd:t}):m&&await g(`git config --unset branch.${s}.ricwiz-reviewers`,{cwd:t})}catch{}}await F.window.withProgress({location:F.ProgressLocation.Notification,title:"Ricwiz: Preparing Deploy",cancellable:!0},async(l,u)=>{let f=0,h=p,w=!1;u.onCancellationRequested(()=>{w=!0});let $=async(v,x)=>{try{await g(`git merge ${v}`,{cwd:t})}catch(b){let S=!1;try{let{stdout:B}=await g("git ls-files -u",{cwd:t});B.trim().length>0&&(S=!0)}catch{}let E=((b.stdout||"")+(b.stderr||"")+(b.message||"")).toLowerCase();if(S||E.includes("conflict")||E.includes("conflit")){if(!await Pe(t,v,x,l,u))throw w=!0,new Error("Deploy aborted by user.")}else throw b}};if(d)try{l.report({message:`Fetching ${a} from ${e.originRemote}...`,increment:15}),await g(`git fetch ${e.originRemote} ${a}`,{cwd:t}),l.report({message:`Switching to ${s}...`,increment:15}),await g(`git checkout ${s}`,{cwd:t});try{await g(`git pull ${e.originRemote} ${s}`,{cwd:t})}catch{}if(l.report({message:`Merging ${e.originRemote}/${a} into ${s}...`,increment:35}),await $(`${e.originRemote}/${a}`,s),w)return;l.report({message:`Pushing ${s} to ${e.originRemote}...`,increment:25}),await g(`git push ${e.originRemote} ${s}`,{cwd:t}),l.report({message:"Finishing up...",increment:10}),F.window.showInformationMessage(`Ricwiz: Release branch '${a}' merged into '${s}' and pushed to ${e.originRemote}! \u{1F680}`)}catch(v){v.message?.includes("aborted")?F.window.showInformationMessage("Ricwiz: Deploy cancelled."):F.window.showErrorMessage(`Ricwiz: Failed to prepare release ticket ${s}. Detail: ${v.message}`)}else{l.report({message:"Syncing remote information...",increment:10});try{let x=10/(c.length||1);for(let b of c)try{if(w)throw new Error("Aborted");l.report({message:`Fetching ${b.env.sourceBranch}...`,increment:x});let S=e.getFetchRemote(b.env.sourceBranch),E=e.getFetchBranch(b.env.sourceBranch);await g(`git fetch ${S} ${E}`,{cwd:t})}catch{}}catch{}let v=60/(c.length||1);for(let x of c){if(w)break;let b=x.branchName,S=x.env.sourceBranch;try{l.report({message:`Processing ${b}...`,increment:v/4}),await g(`git checkout ${b}`,{cwd:t});try{await g(`git pull ${e.originRemote} ${b}`,{cwd:t})}catch{}l.report({message:`Merging ${S} into ${b}...`,increment:v/4});let E=e.getFetchRemote(S),B=e.getFetchBranch(S),U=e.buildUpstreamPath(S);if(await g(`git fetch ${E} ${B}`,{cwd:t}),await $(U,b),l.report({message:`Merging ${s} into ${b}...`,increment:v/4}),await $(s,b),w)break;l.report({message:`Pushing ${b}...`,increment:v/4}),await g(`git push ${e.originRemote} ${b}`,{cwd:t}),f++}catch(E){E.message.includes("aborted")?F.window.showInformationMessage("Ricwiz: Deploy cancelled."):F.window.showErrorMessage(`Ricwiz: Failed to process branch ${b}. Detail: ${E.message}`);return}}if(!w){l.report({message:"Finishing up...",increment:10});let x=h;try{await g(`git show-ref --verify --quiet refs/heads/${s}`,{cwd:t}),x=s}catch{}try{let b=await L(t);x&&x!==b?(await g(`git checkout ${x}`,{cwd:t}),F.window.showInformationMessage(`Ricwiz: Operation complete. Back on branch ${x}.`)):F.window.showInformationMessage("Ricwiz: Operation complete.")}catch{F.window.showInformationMessage("Ricwiz: Operation complete.")}}}})}var oe=k(require("vscode"));async function jt(t=!1){let e=z();if(!e)return;let o=await T.initialize(e);if(!o)return;let i=await Q(e,{prefix:o.ticketPrefix,prompt:"Enter the full ticket ID for the Merge Requests (e.g., SFPSCA-1234) or just the number"});if(!i)return;let{ticketId:r}=i,p=o.getConfig("gitlabUrlOverride",""),s="";if(p&&p.trim()!=="")s=p.trim().replace(/\/+$/,"");else{let n="";try{let m=o.originRemote||"origin",{stdout:l}=await g(`git remote get-url ${m}`,{cwd:e});n=l.trim()}catch{oe.window.showErrorMessage("Ricwiz: Could not get the remote origin URL. Please configure the URL manually in the extension settings.");return}s=n,s.endsWith(".git")&&(s=s.slice(0,-4)),s.startsWith("git@")?(s=s.replace("git@","").replace(":","/"),s=`https://${s}`):s.startsWith("ssh://git@")&&(s=s.replace("ssh://git@","https://"))}let c=[],d=await de(e,r),a=[];for(let n of o.environments){let m=await de(e,r,n.name);await se(e,m)&&a.push({envName:n.name,source:m,target:n.sourceBranch})}if(a.length===0){let n="";try{if(d){let{stdout:u}=await g(`git config branch.${d}.ricwiz-source`,{cwd:e});u.trim()&&(n=u.trim())}}catch{}if(!n&&d.includes(r)&&d!==r){let u=d.split(r)[0].replace(/[-_]+$/,"");u&&(n=u)}n||(n=o.ticketSourceBranch||"main");let m=await oe.window.showInputBox({prompt:`Ricwiz: Confirm or enter the Target Release branch in GitLab for '${d}'`,placeHolder:"e.g. CRC-R19, main, release/v5.0",value:n,ignoreFocusOut:!0});if(m===void 0||!m.trim()){oe.window.showInformationMessage("Ricwiz: Merge request creation cancelled.");return}let l=m.trim();try{await g(`git config branch.${d}.ricwiz-source "${l}"`,{cwd:e})}catch{}c.push({source:d,target:l})}else for(let n of a)c.push({source:n.source,target:n.target});for(let n of c){let m=`${s}/-/merge_requests/new?merge_request[source_branch]=${encodeURIComponent(n.source)}&merge_request[target_branch]=${encodeURIComponent(n.target)}`;t?oe.commands.executeCommand("simpleBrowser.show",m):oe.env.openExternal(oe.Uri.parse(m))}oe.window.showInformationMessage(`Ricwiz: Opening ${c.length} Merge Request(s) in ${t?"VS Code browser":"external browser"}!`)}async function Jt(){return jt(!1)}async function Wt(){return jt(!0)}var ie=k(require("vscode"));async function Gt(t=!1){let e=z();if(!e)return;let o=ie.workspace.getConfiguration("ricwiz"),i=o.get("jiraUrl","");if(!i||i.trim()===""){ie.window.showErrorMessage("Ricwiz: Jira URL is not configured. Please set it in the extension settings (e.g., https://jira.company.com/browse/).");return}let r=await L(e),p=o.get("ticketPrefix","SFPSCA-"),s=te(r,p),d=pe(r,s,!0);if(d)d=st(d,s);else{let n=await Q(e,{prompt:"Ricwiz could not detect the ticket from the branch name. Enter Jira ticket ID (e.g. SFPSCA-1234)",handleToSuffix:!0});if(!n)return;d=n.ticketId}let a=i.trim();a.endsWith("/")||(a+="/"),a+=d,t?ie.commands.executeCommand("simpleBrowser.show",a):ie.env.openExternal(ie.Uri.parse(a)),ie.window.showInformationMessage(`Ricwiz: Opening Jira Ticket ${d} in ${t?"VS Code":"browser"}!`)}async function Ht(){return Gt(!1)}async function Vt(){return Gt(!0)}var Y=k(require("vscode"));var qt=k(require("https")),_t=k(require("vscode"));async function Qt(){j("getJiraAuthAndBaseUrl: Starting...");let t=_t.workspace.getConfiguration("ricwiz"),e=t.get("jiraUrl",""),o=t.get("jiraEmail","")?.trim();j("getJiraAuthAndBaseUrl: Calling getJiraToken()...");let i=(await Qe())?.trim();if(!i&&process.env.RICWIZ_JIRA_TOKEN&&(j("getJiraAuthAndBaseUrl: Token not found in secretStorage, using process.env"),i=process.env.RICWIZ_JIRA_TOKEN.trim()),!e||!i)throw j(`getJiraAuthAndBaseUrl: FAILED. URL: "${e}", hasToken: ${!!i}`),new Error(`[v5.2.0] Jira API Token is not securely configured. URL: "${e}", hasToken: ${!!i}`);let r=e;r.includes("/browse")&&(r=r.split("/browse")[0]),r.endsWith("/")&&(r=r.slice(0,-1));let p=o?`Basic ${Buffer.from(`${o}:${i}`).toString("base64")}`:`Bearer ${i}`;return{baseUrl:r,headerAuth:p}}async function Te(t,e,o){let{baseUrl:i,headerAuth:r}=await Qt(),p=new URL(`${i}${e}`);return new Promise((s,c)=>{let d=qt.request(p,{method:t,headers:{Authorization:r,Accept:"application/json",...o?{"Content-Type":"application/json"}:{}}},a=>{let n="";a.on("data",m=>n+=m),a.on("end",()=>{if(a.statusCode===401||a.statusCode===403)return c(new Error(`Authentication failed (HTTP ${a.statusCode}). Please check your Jira settings.`));if(a.statusCode&&a.statusCode>=400){let m="";try{let l=JSON.parse(n);l.errorMessages&&l.errorMessages.length>0&&(m=l.errorMessages.join(", "))}catch{}return a.statusCode===404||a.statusCode===410?c(new Error(`Ticket not found or deleted (HTTP ${a.statusCode}). ${m}`)):c(new Error(`Jira API returned HTTP status ${a.statusCode}. ${m}`))}if(!n)return s({});try{let m=JSON.parse(n);s(m)}catch{c(new Error("Failed to parse Jira response."))}})});d.on("error",a=>c(new Error(`Network error: ${a.message}`))),o&&d.write(JSON.stringify(o)),d.end()})}async function Ie(t){let{baseUrl:e}=await Qt(),o=await Te("GET",`/rest/api/2/issue/${t}`);return o&&o.fields?{summary:o.fields.summary||"",description:o.fields.description||"No description provided.",status:o.fields.status?.name||"Unknown",url:`${e}/browse/${t}`}:null}async function Yt(t){let e=await Te("GET",`/rest/api/2/issue/${t}/transitions`);return e&&e.transitions?e.transitions.map(o=>({id:o.id,name:o.name})):[]}async function Kt(t,e){await Te("POST",`/rest/api/2/issue/${t}/transitions`,{transition:{id:e}})}async function Zt(t,e){await Te("POST",`/rest/api/2/issue/${t}/comment`,{body:e})}async function Xt(t,e){await Te("PUT",`/rest/api/2/issue/${t}`,{update:{labels:[{add:e}]}})}async function eo(t){let e=await Te("POST","/rest/api/3/search/jql",{jql:t,maxResults:50,fields:["summary","status","assignee"]});return e&&e.issues?e.issues.map(o=>({key:o.key,summary:o.fields?.summary||"No Title",status:o.fields?.status?.name||"Unknown",assignee:o.fields?.assignee?.displayName||"Unassigned"})):[]}function to(t){if(!t||typeof t!="object")return"";let e=t;if(e.type==="text")return typeof e.text=="string"?e.text:"";let o="";if(Array.isArray(e.content))for(let i of e.content){let r=to(i);r&&(o+=r+" ")}return o.trim()}async function oo(t){if(t.length===0)return[];let e=`issueKey IN (${t.join(",")})`,o=await Te("POST","/rest/api/3/search/jql",{jql:e,maxResults:15,fields:["summary","description","parent","subtasks","issuelinks","issuetype","status","assignee","priority","labels","fixVersions"]});return!o||!o.issues?[]:o.issues.map(i=>{let r=i.fields?.parent,p=r?{key:r.key,title:r.fields?.summary||""}:void 0,s=(i.fields?.subtasks??[]).map(a=>({key:a.key,title:a.fields?.summary||""})),c=(i.fields?.issuelinks??[]).map(a=>a.outwardIssue?{type:a.type?.outward||"relates to",issue:{key:a.outwardIssue.key,title:a.outwardIssue.fields?.summary||""}}:{type:a.type?.inward||"relates to",issue:{key:a.inwardIssue.key,title:a.inwardIssue.fields?.summary||""}}),d=(i.fields?.fixVersions??[]).map(a=>a.name).filter(Boolean);return{key:i.key,title:i.fields?.summary||"",type:i.fields?.issuetype?.name||"",status:i.fields?.status?.name||"",assignee:i.fields?.assignee?.displayName||"",priority:i.fields?.priority?.name||"",labels:i.fields?.labels||[],fixVersions:d,description:to(i.fields?.description),parent:p,subtasks:s,issueLinks:c}})}async function io(t){let e=z();if(e)try{let o=await T.initialize(e);if(!o)return;let i=await L(e),r=te(i,o.ticketPrefix),p=pe(i,r,!0);if(p||(p=i.split("-to-")[0]),!p){Y.window.showErrorMessage("Ricwiz: You are not currently on a valid ticket branch.");return}await Y.window.withProgress({location:Y.ProgressLocation.Notification,title:`Fetching details for ${p}...`,cancellable:!1},async()=>{let s=await Ie(p);if(s){let c=[];try{let d=o.environments||Y.workspace.getConfiguration("ricwiz").get("environments",[{name:"Qual",sourceBranch:"quality"},{name:"Val",sourceBranch:"validation"},{name:"Prod",sourceBranch:"main"}]),a=await Se(e,p,"");c=await Be(e,a,p,d,o)}catch{}t.setJiraData({ticketId:p,relatedBranches:c,...s}),t.setPage("jira")}else Y.window.showErrorMessage("Ricwiz: No data found for this ticket.")})}catch(o){o.message&&o.message.includes("securely configured")?await Y.window.showErrorMessage(o.message,"Set Token Now")==="Set Token Now"&&Y.commands.executeCommand("ricwiz.setJiraToken"):Y.window.showErrorMessage(`Ricwiz Jira Error: ${o.message}`)}}var ue=k(require("vscode"));var De=0;async function ro(t,e){let o=ue.workspace.getConfiguration("ricwiz"),i=o.get("jiraDashboards",[]);if(e!==void 0&&(De=e),!i||i.length===0){t.setDashboardData({queries:[],selectedIndex:0,results:[],error:"No queries defined in settings. Go to Settings > Ricwiz > Jira Dashboards."}),t.setPage("dashboard");return}De>=i.length&&(De=0);let r=i[De];t.setDashboardData({queries:i,selectedIndex:De,results:[],error:"\u23F3 Loading tickets..."}),t.setPage("dashboard");try{let p=await eo(r.jql),s=z(),c=[],d=t.getDashboardShowBranches();if(s)try{let{stdout:n}=await g("git branch",{cwd:s});c=n.split(`
`).map(m=>m.replace("*","").trim()).filter(m=>m)}catch{}let a=[];if(d&&s)try{let n=await T.initialize(s,{skipPrompt:!0}),m=n?.environments||o.get("environments",[{name:"Qual",sourceBranch:"quality"},{name:"Val",sourceBranch:"validation"},{name:"Prod",sourceBranch:"main"}]);a=await Promise.all(p.map(async l=>{let u=await Se(s,l.key,""),f=await Be(s,u,l.key,m,n);return{...l,detailedBranches:f}}))}catch{a=p}else a=p.map(n=>{let m=c.find(l=>l.includes(n.key));return{...n,branch:m||null}});t.setDashboardData({queries:i,selectedIndex:De,results:a,error:null}),t.setPage("dashboard")}catch(p){let s=p.message;s&&(s.includes("ENOTFOUND")||s.includes("network"))&&(s="No Internet or Invalid URL"),t.setDashboardData({queries:i,selectedIndex:De,results:[],error:s}),t.setPage("dashboard")}}async function no(t,e){await ue.window.withProgress({location:ue.ProgressLocation.Notification,title:`Fetching details for ${e}...`,cancellable:!1},async()=>{try{let o=await Ie(e);if(o){let i=[],r=z();if(r)try{let p=await T.initialize(r,{skipPrompt:!0}),s=p?.environments||ue.workspace.getConfiguration("ricwiz").get("environments",[{name:"Qual",sourceBranch:"quality"},{name:"Val",sourceBranch:"validation"},{name:"Prod",sourceBranch:"main"}]),c=await Se(r,e,"");i=await Be(r,c,e,s,p)}catch{}t.setJiraData({ticketId:e,relatedBranches:i,...o}),t.setPage("jira")}else ue.window.showErrorMessage(`Ricwiz: No data found for ticket ${e}.`)}catch(o){ue.window.showErrorMessage(`Ricwiz Jira Error: ${o.message}`)}})}var D=k(require("vscode"));async function ut(){let t=z();if(!t)return;let e=await T.initialize(t,{forcePrompt:!1});if(!e)return;let o=await L(t);if(!o)return;let i=te(o,e.ticketPrefix),r=pe(o,i,!0);return r||o.split("-to-")[0]}function gt(t){t.message&&t.message.includes("securely configured")?D.window.showErrorMessage(t.message,"Set Token Now").then(e=>{e==="Set Token Now"&&D.commands.executeCommand("ricwiz.setJiraToken")}):D.window.showErrorMessage(`Ricwiz Jira Error: ${t.message}`)}async function so(){try{let t=await ut();if(!t){D.window.showErrorMessage("Ricwiz: You are not on a valid ticket branch.");return}let e=await D.window.withProgress({location:D.ProgressLocation.Notification,title:`Fetching available status for ${t}...`,cancellable:!1},()=>Yt(t));if(!e||e.length===0){D.window.showInformationMessage(`Ricwiz: No transitions available for ${t}.`);return}let o=e.map(r=>({label:r.name,id:r.id})),i=await D.window.showQuickPick(o,{placeHolder:`Select new status for ${t}`,ignoreFocusOut:!0});i&&(await D.window.withProgress({location:D.ProgressLocation.Notification,title:`Updating status to ${i.label}...`,cancellable:!1},()=>Kt(t,i.id)),D.window.showInformationMessage(`Ricwiz: Status for ${t} updated to ${i.label}.`))}catch(t){gt(t)}}async function ao(){try{let t=await ut();if(!t){D.window.showErrorMessage("Ricwiz: You are not on a valid ticket branch.");return}let e=await D.window.showInputBox({prompt:`Add comment to ${t}`,placeHolder:"Type your comment here...",ignoreFocusOut:!0});e&&(await D.window.withProgress({location:D.ProgressLocation.Notification,title:`Adding comment to ${t}...`,cancellable:!1},()=>Zt(t,e)),D.window.showInformationMessage(`Ricwiz: Comment added to ${t}.`))}catch(t){gt(t)}}async function co(){try{let t=await ut();if(!t){D.window.showErrorMessage("Ricwiz: You are not on a valid ticket branch.");return}let e=await D.window.showInputBox({prompt:`Add a label to ${t}`,placeHolder:"e.g. Needs-Review, Bug, High-Priority",ignoreFocusOut:!0});e&&e.trim()&&(await D.window.withProgress({location:D.ProgressLocation.Notification,title:`Adding label to ${t}...`,cancellable:!1},()=>Xt(t,e.trim())),D.window.showInformationMessage(`Ricwiz: Label '${e.trim()}' added to ${t}.`))}catch(t){gt(t)}}async function lo(){let t=await D.window.showInputBox({prompt:"Enter your Jira API Token (or Personal Access Token). It will be stored in your global VS Code settings.",password:!0,ignoreFocusOut:!0});if(t)try{await Pt(t.trim()),D.window.showInformationMessage("Ricwiz: Jira API Token securely stored!")}catch(e){D.window.showErrorMessage(`Ricwiz: Failed to store token: ${e.message}`)}}var H=k(require("vscode")),mo=k(require("https"));async function po(){let t=await H.window.showInputBox({prompt:"Enter your GitLab Personal Access Token",placeHolder:"glpat-xxxxxxxxxxxxxxxxxxxx",ignoreFocusOut:!0,password:!0});if(t&&t.trim()){let e=t.trim();await H.window.withProgress({location:H.ProgressLocation.Notification,title:"Ricwiz: Validating GitLab Token...",cancellable:!1},async()=>{try{let i=H.workspace.getConfiguration("ricwiz").get("gitlabUrlOverride","").trim();if(!i&&H.workspace.workspaceFolders)try{let c=H.workspace.workspaceFolders[0].uri.fsPath,{stdout:d}=await g("git remote get-url origin",{cwd:c}),a=d.trim();a.startsWith("git@")&&(a=`https://${a.replace("git@","").replace(":","/")}`),a.endsWith(".git")&&(a=a.slice(0,-4)),i=a}catch{}i||(i="https://gitlab.com");let r=new URL(i),p=`${r.protocol}//${r.host}`,s=await new Promise((c,d)=>{let a=mo.request(new URL(`${p}/api/v4/user`),{method:"GET",timeout:5e3,headers:{"PRIVATE-TOKEN":e,Accept:"application/json"}},n=>{if(n.statusCode>=400)return d(new Error(`Status ${n.statusCode}`));let m="";n.on("data",l=>m+=l),n.on("end",()=>c(JSON.parse(m||"{}")))});a.on("error",d),a.on("timeout",()=>{a.destroy(),d(new Error("Timeout"))}),a.end()});await Bt(e),H.window.showInformationMessage(`Ricwiz: \u2705 GitLab API Token saved and validated successfully for ${s.username||"user"}!`),H.commands.executeCommand("ricwiz.manualRefresh")}catch(o){H.window.showErrorMessage(`Ricwiz: \u274C Invalid token or cannot reach GitLab (${o.message}). Please check the token and try again.`)}})}}var ge=k(require("vscode"));async function uo(){let t=z();if(!t){ge.window.showErrorMessage("Ricwiz: Open a folder or workspace that is a Git repository.");return}let e=await T.initialize(t);if(!e)return;let o=await Q(t,{prefix:e.ticketPrefix,prompt:"Enter the full ticket ID to sync all branches for (e.g., SCPSCA-1234) or just the number"});if(!o)return;let{ticketId:i,currentBranch:r}=o;await ge.window.withProgress({location:ge.ProgressLocation.Notification,title:`Ricwiz: Syncing all branches for ${i}...`,cancellable:!1},async p=>{try{p.report({message:"Fetching from remote..."});try{await g("git fetch --all",{cwd:t})}catch{}let{stdout:s}=await g(`git branch --list "*${i}*"`,{cwd:t}),c=new RegExp(`${i}(?!\\d)`,"i"),d=s.split(`
`).map(m=>m.replace("*","").trim()).filter(m=>m.length>0&&c.test(m));if(d.length===0){ge.window.showWarningMessage(`Ricwiz: No local branches found for ${i}.`);return}let a=0,n=0;for(let m of d)if(p.report({message:`Syncing ${m}...`}),m===r)try{await g(`git pull ${e.originRemote} ${m}`,{cwd:t}),a++}catch(l){let u=!1;try{let{stdout:h}=await g("git ls-files -u",{cwd:t});h.trim().length>0&&(u=!0)}catch{}let f=((l.stdout||"")+(l.stderr||"")+(l.message||"")).toLowerCase();(u||f.includes("conflict")||f.includes("conflit"))&&await Pe(t,`${e.originRemote}/${m}`,m,p)?a++:n++}else try{await g(`git fetch ${e.originRemote} ${m}:${m}`,{cwd:t}),a++}catch{try{await g(`git checkout ${m}`,{cwd:t});try{await g(`git pull ${e.originRemote} ${m}`,{cwd:t}),a++}catch(u){let f=!1;try{let{stdout:w}=await g("git ls-files -u",{cwd:t});w.trim().length>0&&(f=!0)}catch{}let h=((u.stdout||"")+(u.stderr||"")+(u.message||"")).toLowerCase();(f||h.includes("conflict")||h.includes("conflit"))&&await Pe(t,`${e.originRemote}/${m}`,m,p)?a++:n++}await g(`git checkout ${r}`,{cwd:t})}catch{try{await g(`git checkout ${r}`,{cwd:t})}catch{}n++}}n>0?ge.window.showWarningMessage(`Ricwiz: Synced ${a}/${d.length} branches. ${n} branch(es) could not be synced (possible conflicts or diverged history).`):ge.window.showInformationMessage(`Ricwiz: \u{1F504} All ${a} branches for ${i} are up to date!`)}catch(s){ge.window.showErrorMessage(`Ricwiz: Sync failed: ${s.message}`)}})}var fe=k(require("vscode"));async function go(){let t=z();if(!t){fe.window.showErrorMessage("Ricwiz: Open a folder or workspace that is a Git repository.");return}try{await g("git status",{cwd:t})}catch{fe.window.showErrorMessage("Ricwiz: The opened folder does not appear to be a valid Git repository.");return}let e=await T.initialize(t);if(!e)return;let o=e.environments,i=await Q(t,{prefix:e.ticketPrefix});if(!i)return;let{ticketId:r,currentBranch:p}=i;await fe.window.withProgress({location:fe.ProgressLocation.Notification,title:"Ricwiz: Updating environment branches from their bases",cancellable:!0},async(s,c)=>{let d=0,a=p,n=!1;c.onCancellationRequested(()=>{n=!0}),s.report({message:"Syncing remote information...",increment:10});try{await g("git fetch --all",{cwd:t})}catch{}let m=80/(o.length||1);for(let l of o){if(n)break;let u=await de(t,r,l.name),f=l.sourceBranch;if(await se(t,u))try{s.report({message:`Processing ${u}...`,increment:m/2}),await g(`git checkout ${u}`,{cwd:t});try{s.report({message:`Merging ${f} into ${u}...`,increment:m/2});let h=e.getFetchRemote(f),w=e.getFetchBranch(f),$=e.buildUpstreamPath(f);await g(`git fetch ${h} ${w}`,{cwd:t}),await g(`git merge ${$}`,{cwd:t})}catch(h){let w=!1;try{let{stdout:v}=await g("git ls-files -u",{cwd:t});v.trim().length>0&&(w=!0)}catch{}let $=((h.stdout||"")+(h.stderr||"")+(h.message||"")).toLowerCase();if(w||$.includes("conflict")||$.includes("conflit")){let v=e.buildUpstreamPath(f);if(!await Pe(t,v,u,s,c))throw n=!0,new Error("Update aborted by user.")}else throw h}if(n)break;d++}catch(h){h.message.includes("aborted")?fe.window.showInformationMessage("Ricwiz: Update cancelled."):fe.window.showErrorMessage(`Ricwiz: Failed to update branch ${u}. Detail: ${h.message}`);return}}if(!n){s.report({message:"Finishing up...",increment:10});try{let l=await L(t);a&&a!==l&&await g(`git checkout ${a}`,{cwd:t})}catch{}fe.window.showInformationMessage(`Ricwiz: Successfully updated ${d} environment branches from their bases!`)}})}var N=k(require("vscode"));async function fo(){let t=z();if(!t){N.window.showErrorMessage("Ricwiz: Open a folder or workspace that is a Git repository.");return}let e=await L(t),o=N.workspace.getConfiguration("ricwiz");await N.window.withProgress({location:N.ProgressLocation.Notification,title:"Ricwiz: Scanning for unused local branches...",cancellable:!1},async()=>{try{await g("git fetch --prune",{cwd:t})}catch{}let i=[];try{let{stdout:m}=await g('git branch --format="%(refname:short)"',{cwd:t});i=m.split(`
`).map(l=>l.trim()).filter(l=>l.length>0)}catch{}if(i.length===0){N.window.showInformationMessage("Ricwiz: No local branches found.");return}let r=[];try{let{stdout:m}=await g('git branch -r --format="%(refname:short)"',{cwd:t});r=m.split(`
`).map(l=>l.trim().replace(/^[^/]+\//,"")).filter(l=>l.length>0&&!l.includes("HEAD"))}catch{}let p=[];try{let{stdout:m}=await g('git for-each-ref --format="%(refname:short)|||%(upstream:track)" refs/heads/',{cwd:t});p=m.split(`
`).filter(l=>l.includes("[gone]")).map(l=>l.split("|||")[0].trim())}catch{}let s=i.filter(m=>!r.includes(m));if(s.length===0){N.window.showInformationMessage("Ricwiz: Your local repository is totally clean! All local branches exist on the remote.");return}let c=s.map(m=>{let l=p.includes(m),u=m===e,f="Not found on remote";return l&&(f="Deleted on remote [gone]"),u&&(f+=" (Current branch - will checkout main first)"),{label:m,description:f,picked:l&&!u}}),d=await N.window.showQuickPick(c,{canPickMany:!0,placeHolder:"Select local branches to delete",title:"Ricwiz: Delete Unused Branches"});if(!d||d.length===0){N.window.showInformationMessage("Ricwiz: No branches selected for deletion.");return}if(await N.window.showWarningMessage(`Ricwiz: Delete ${d.length} local branch(es)?
This cannot be undone!`,{modal:!0},"Yes, delete them")!=="Yes, delete them"){N.window.showInformationMessage("Ricwiz: Deletion cancelled.");return}let n=0;for(let m of d){let l=m.label;if(l===e){let u=o.get("ticketSourceBranch","main");try{await g(`git checkout ${u}`,{cwd:t}),e=u}catch{N.window.showWarningMessage(`Ricwiz: Could not switch away from ${l}. Skipping.`);continue}}try{await g(`git branch -D ${l}`,{cwd:t}),n++}catch{N.window.showWarningMessage(`Ricwiz: Could not delete local branch ${l}.`)}}N.window.showInformationMessage(`Ricwiz: \u{1F5D1}\uFE0F Cleaned up ${n} unused local branch(es).`)})}var re=k(require("vscode"));async function Fe(t){let e=z();e&&await re.window.withProgress({location:re.ProgressLocation.Notification,title:`Ricwiz: Switching to ${t}...`,cancellable:!1},async()=>{try{let o=await L(e),i=!1;try{let{stdout:p}=await g("git status --porcelain",{cwd:e});i=p.trim().length>0}catch{}if(i&&o)try{await g(`git stash push --include-untracked -m "ricwiz-auto:${o}"`,{cwd:e}),re.window.showInformationMessage(`Ricwiz: \u{1F4E6} Stashed changes from ${o}`)}catch{re.window.showWarningMessage("Ricwiz: Could not stash changes. Checkout may fail if there are conflicts.")}let r=t;t.includes("/")&&(r=t.split("/").slice(1).join("/"));try{await g(`git checkout ${r}`,{cwd:e})}catch{let s="";if(t.includes("/"))s=t.split("/")[0];else{let{stdout:c}=await g("git branch -r",{cwd:e}),d=c.split(`
`).map(n=>n.trim()).filter(n=>n),a=[];for(let n of d){let m=n.split(" ")[0];m.endsWith(`/${r}`)&&a.push(m.substring(0,m.lastIndexOf("/")))}if(a.length===0){re.window.showErrorMessage(`Ricwiz: A branch "${r}" n\xE3o existe localmente nem em nenhuma remote!`);return}else if(a.length===1)s=a[0];else{let n=await T.initialize(e);a.includes("origin")?s="origin":n&&a.includes(n.upstreamRemote)?s=n.upstreamRemote:s=a[0]}}try{await g(`git fetch ${s} ${r}`,{cwd:e}),await g(`git checkout -b ${r} --track ${s}/${r}`,{cwd:e})}catch{re.window.showErrorMessage(`Ricwiz: Encontrou na remote ${s} mas falhou a fazer checkout.`);return}}try{let{stdout:p}=await g("git stash list",{cwd:e}),s=p.split(`
`);for(let c=0;c<s.length;c++)if(s[c].includes(`ricwiz-auto:${r}`)){let d=s[c].match(/stash@\{(\d+)\}/);d&&(await g(`git stash pop stash@{${d[1]}}`,{cwd:e}),re.window.showInformationMessage(`Ricwiz: \u{1F4E6} Restored stashed changes on ${r}`));break}}catch{re.window.showWarningMessage(`Ricwiz: Could not restore stashed changes on ${r}. You may need to resolve conflicts manually (check git stash list).`)}}catch{re.window.showErrorMessage(`Ricwiz: Could not checkout branch ${t}.`)}})}var je=k(require("vscode"));async function ho(){let t=z();if(t)try{let{stdout:e}=await g("git branch --show-current",{cwd:t}),o=e.trim();o&&(await je.env.clipboard.writeText(o),je.window.showInformationMessage(`Ricwiz: \u{1F4CB} Copied "${o}" to clipboard`))}catch{je.window.showErrorMessage("Ricwiz: Could not get the current branch name.")}}var K=k(require("vscode")),tt=k(require("path")),wo=k(require("fs"));async function vo(){let t=z();if(!t){K.window.showErrorMessage("Ricwiz: Open a folder or workspace that is a Git repository.");return}let e=await T.initialize(t,{skipPrompt:!0}),o=K.workspace.getConfiguration("ricwiz"),i=e?.ticketSourceBranch||o.get("ticketSourceBranch","main"),r=e?.originRemote||"origin",s=o.get("packageXmlCommand",'sf sgd source delta --to "HEAD" --from "{originRemote}/{baseBranch}" --output-dir "."').replace("origin/{baseBranch}","{originRemote}/{baseBranch}").replace(/{originRemote}/g,r).replace(/{baseBranch}/g,i);await K.window.showWarningMessage("Are you sure you want to generate the package.xml? This may overwrite existing local manifest files.",{modal:!0},"Yes, Generate")==="Yes, Generate"&&await K.window.withProgress({location:K.ProgressLocation.Notification,title:"Ricwiz: Generating package.xml using Salesforce CLI...",cancellable:!1},async()=>{try{await g(s,{cwd:t,maxBuffer:10*1024*1024}),K.window.showInformationMessage("Ricwiz: Successfully generated package.xml!");let d=tt.join(t,"package","package.xml"),a=tt.join(t,"package.xml"),n=tt.join(t,"manifest","package.xml");for(let m of[d,a,n])if(wo.existsSync(m)){let l=await K.workspace.openTextDocument(m);await K.window.showTextDocument(l);break}}catch(d){K.window.showErrorMessage(`Ricwiz: Error running sf command - ${d.message}`)}})}var Z=k(require("vscode"));async function yo(){let t=z();if(!t){Z.window.showErrorMessage("Ricwiz: Open a folder or workspace that is a Git repository.");return}let o=Z.workspace.getConfiguration("ricwiz").get("deployCommand","sf project deploy start --manifest package/package.xml --post-destructive-changes destructiveChanges/destructiveChanges.xml -c -l NoTestRun -g");await Z.window.showWarningMessage("Are you sure you want to deploy to Salesforce? This action modifies your org and cannot be easily undone.",{modal:!0},"Yes, Deploy")==="Yes, Deploy"&&await Z.window.withProgress({location:Z.ProgressLocation.Notification,title:"Ricwiz: Deploying package...",cancellable:!1},async()=>{try{let{stdout:r,stderr:p}=await g(o,{cwd:t,maxBuffer:52428800}),s=Z.window.createOutputChannel("Ricwiz Deploy");s.appendLine(`Executing: ${o}`),s.appendLine(r),p&&(s.appendLine("--- STDERR ---"),s.appendLine(p)),s.show(),Z.window.showInformationMessage("Ricwiz: Successfully ran deploy command!")}catch(r){let p=Z.window.createOutputChannel("Ricwiz Deploy");p.appendLine(`Error executing: ${o}`),r.stdout&&p.appendLine(r.stdout),r.stderr&&p.appendLine(r.stderr),p.appendLine(r.message),p.show(),Z.window.showErrorMessage("Ricwiz: Error running deploy command. See output channel for details.")}})}var X=k(require("vscode"));async function bo(){let t=z();if(!t){X.window.showErrorMessage("Ricwiz: Open a folder or workspace that is a Git repository.");return}let o=X.workspace.getConfiguration("ricwiz").get("importDataCommand","sfdx force:data:tree:import --plan data/plan.json");await X.window.showWarningMessage("Are you sure you want to import data into Salesforce? This action modifies records in your org.",{modal:!0},"Yes, Import")==="Yes, Import"&&await X.window.withProgress({location:X.ProgressLocation.Notification,title:"Ricwiz: Importing data...",cancellable:!1},async()=>{try{let{stdout:r,stderr:p}=await g(o,{cwd:t,maxBuffer:52428800}),s=X.window.createOutputChannel("Ricwiz Import Data");s.appendLine(`Executing: ${o}`),s.appendLine(r),p&&(s.appendLine("--- STDERR ---"),s.appendLine(p)),s.show(),X.window.showInformationMessage("Ricwiz: Successfully ran import data command!")}catch(r){let p=X.window.createOutputChannel("Ricwiz Import Data");p.appendLine(`Error executing: ${o}`),r.stdout&&p.appendLine(r.stdout),r.stderr&&p.appendLine(r.stderr),p.appendLine(r.message),p.show(),X.window.showErrorMessage("Ricwiz: Error running import data command. See output channel for details.")}})}var V=k(require("vscode"));async function xo(){let t=z();if(!t){V.window.showErrorMessage("Ricwiz: Open a folder or workspace that is a Git repository.");return}let e=await T.initialize(t,{skipPrompt:!0}),o=e?e.ticketSourceBranch:V.workspace.getConfiguration("ricwiz").get("ticketSourceBranch","main"),i=e?e.originRemote:"origin",r="";try{r=await L(t)}catch{}let p=await V.window.showInputBox({prompt:`Enter the branch name to list modified files (compared to ${o})`,value:r,placeHolder:"SFPSCA-1234"});if(!p)return;let s=$e(p);await V.window.withProgress({location:V.ProgressLocation.Notification,title:`Ricwiz: Finding files for ${s}...`,cancellable:!1},async()=>{try{let c=e?e.ticketPrefix:V.workspace.getConfiguration("ricwiz").get("ticketPrefix","SFPSC-"),d=te(s,c),a=pe(s,d,!0)||s.replace(/-to-[a-zA-Z0-9]+$/i,""),n=await de(t,a);R.appendLine(`[ListTicketFiles] targetBranch (raw): ${s}, resolvedTargetBranch: ${n}, ticketId: ${a}, originRemote: ${i}, sourceBranch: ${o}`);let m=[];try{let x="";try{R.appendLine(`[ListTicketFiles] Running: git merge-base ${i}/${o} ${n}`);let{stdout:b}=await g(`git merge-base ${i}/${o} ${n}`,{cwd:t});x=b.trim()}catch(b){R.appendLine(`[ListTicketFiles] First merge-base failed: ${b.message}`);try{R.appendLine(`[ListTicketFiles] Running: git merge-base ${o} ${n}`);let{stdout:S}=await g(`git merge-base ${o} ${n}`,{cwd:t});x=S.trim()}catch(S){R.appendLine(`[ListTicketFiles] Second merge-base failed: ${S.message}`),R.appendLine(`[ListTicketFiles] Running: git merge-base ${i}/${o} ${i}/${n}`);let{stdout:E}=await g(`git merge-base ${i}/${o} ${i}/${n}`,{cwd:t});x=E.trim(),n=`${i}/${n}`}}if(x){R.appendLine(`[ListTicketFiles] Merge base found: ${x}. Running git diff...`);let b=n===r||s===r,S=b?"":` ${n}`,{stdout:E}=await g(`git diff --name-only ${x}${S}`,{cwd:t,maxBuffer:10*1024*1024});if(m=E.split(`
`).map(B=>B.trim()).filter(B=>B.length>0),b)try{let{stdout:B}=await g("git ls-files --others --exclude-standard",{cwd:t,maxBuffer:10485760}),U=B.split(`
`).map(W=>W.trim()).filter(W=>W.length>0);m=[...m,...U],R.appendLine(`[ListTicketFiles] Found ${U.length} untracked files.`)}catch(B){R.appendLine(`[ListTicketFiles] Failed to get untracked files: ${B.message}`)}R.appendLine(`[ListTicketFiles] diff found ${m.length} files total.`)}}catch(x){R.appendLine(`[ListTicketFiles] Diff strategy failed: ${x.message}`)}let l=[];try{R.appendLine(`[ListTicketFiles] Running git log fallback for ticketId: ${a}`);let{stdout:x}=await g(`git --no-pager log --grep="\\b${a}\\b" -i -E --name-only -m --first-parent --format=""`,{cwd:t,maxBuffer:10*1024*1024});l=x.split(`
`).map(b=>b.trim()).filter(b=>b.length>0),R.appendLine(`[ListTicketFiles] git log found ${l.length} files.`)}catch(x){R.appendLine(`[ListTicketFiles] Git log fallback failed: ${x.message}`)}let u=[...m,...l];if(u.length===0){V.window.showInformationMessage(`Ricwiz: No modified files found for ${s}.`);return}let f=Array.from(new Set(u)).sort(),h={};for(let x of f){let b=x.match(/default\/([^/]+)/),S=b&&b[1]?b[1].toUpperCase():"OUTROS";h[S]||(h[S]=[]),h[S].push(x)}let w=`Files modified in branch ${s}:
`,$=Object.keys(h).sort();for(let x of $)w+=`
=== ${x} ===
`,w+=h[x].join(`
`)+`
`;let v=await V.workspace.openTextDocument({content:w,language:"plaintext"});await V.window.showTextDocument(v)}catch(c){V.window.showErrorMessage(`Ricwiz: Error running git log - ${c.message}`)}})}var ne=k(require("vscode"));async function ko(){let t=z();if(!t){ne.window.showErrorMessage("Ricwiz: Open a folder or workspace that is a Git repository.");return}let o=ne.workspace.getConfiguration("ricwiz").get("resetTrackingCommand","sf org disable tracking && sf project reset tracking --no-prompt");await ne.window.withProgress({location:ne.ProgressLocation.Notification,title:"Ricwiz: Resetting tracking...",cancellable:!1},async()=>{try{let{stdout:i,stderr:r}=await g(o,{cwd:t,maxBuffer:52428800}),p=ne.window.createOutputChannel("Ricwiz Reset Tracking");p.appendLine(`Executing: ${o}`),p.appendLine(i),r&&(p.appendLine("--- STDERR ---"),p.appendLine(r)),p.show(),ne.window.showInformationMessage("Ricwiz: Successfully reset tracking!")}catch(i){let r=ne.window.createOutputChannel("Ricwiz Reset Tracking");r.appendLine(`Error executing: ${o}`),i.stdout&&r.appendLine(i.stdout),i.stderr&&r.appendLine(i.stderr),r.appendLine(i.message),r.show(),ne.window.showErrorMessage("Ricwiz: Error resetting tracking. See output channel for details.")}})}var ee=k(require("vscode"));async function Co(){let t=z();if(!t){ee.window.showErrorMessage("Ricwiz: Open a workspace first.");return}let e=["ApexClass","ApexTrigger","CustomObject","CustomField","LightningComponentBundle","AuraDefinitionBundle","Flow","CustomLabel","CustomMetadata","StaticResource","Profile","PermissionSet","PermissionSetGroup","Layout","ValidationRule","RecordType","ListView","Report","EmailTemplate","Other (Type manually)..."],o=await ee.window.showQuickPick(e,{placeHolder:"Select Metadata Type to extract (e.g., ApexClass)",ignoreFocusOut:!0});if(!o||o==="Other (Type manually)..."&&(o=await ee.window.showInputBox({prompt:"Enter Metadata Type (e.g., CustomApplication, Queue)",ignoreFocusOut:!0}),!o))return;let i={ApexClass:"**/*.cls",ApexTrigger:"**/*.trigger",CustomObject:"**/*.{object,object-meta.xml}",CustomField:"**/*.field-meta.xml",LightningComponentBundle:"**/lwc/*/*.js",AuraDefinitionBundle:"**/aura/*/*.cmp",Flow:"**/*.flow-meta.xml",CustomLabel:"**/*.labels-meta.xml",CustomMetadata:"**/*.md-meta.xml",StaticResource:"**/*.resource-meta.xml",Profile:"**/*.profile-meta.xml",PermissionSet:"**/*.permissionset-meta.xml",PermissionSetGroup:"**/*.permissionsetgroup-meta.xml",Layout:"**/*.layout-meta.xml",ValidationRule:"**/*.validationRule-meta.xml",RecordType:"**/*.recordType-meta.xml",ListView:"**/*.listView-meta.xml"},r=[],p=i[o];if(p)try{r=(await ee.workspace.findFiles(p,"**/node_modules/**")).map(d=>{let a=d.fsPath.split(/[\\/]/).pop()||"";if(o==="LightningComponentBundle"||o==="AuraDefinitionBundle"){let n=d.fsPath.split(/[\\/]/);return n[n.length-2]||a.split(".")[0]}return a.split(".")[0]}),r=[...new Set(r)].sort()}catch{}let s=await new Promise(c=>{let d=ee.window.createQuickPick();d.title=`Extract ${o}`,d.placeholder="Type name (e.g. MyComponent) or * for all",d.ignoreFocusOut=!0,d.matchOnDescription=!0;let a=()=>{let n=d.value.trim(),m=[];n?m.push({label:`$(cloud-download) Extract "${n}"`,description:"Extract exact name from Salesforce",alwaysShow:!0}):m.push({label:'$(cloud-download) Extract "*" (All)',description:`Extract all ${o}s`,alwaysShow:!0}),r.forEach(l=>{(!n||l.toLowerCase().includes(n.toLowerCase()))&&m.push({label:l,description:"Local workspace component"})}),d.items=m};d.onDidChangeValue(()=>a()),d.onDidAccept(()=>{let n=d.selectedItems[0];if(n){let m=n.label;m.startsWith('$(cloud-download) Extract "')?m=m.replace('$(cloud-download) Extract "',"").replace('" (All)',"").replace('"',""):m==='$(cloud-download) Extract "*" (All)'&&(m="*"),d.hide(),c(m)}}),d.onDidHide(()=>{d.dispose(),c(void 0)}),a(),d.show()});s&&await ee.window.withProgress({location:ee.ProgressLocation.Notification,title:`Ricwiz: Extracting ${o}:${s} from Salesforce...`,cancellable:!0},async(c,d)=>{try{R.show(!0);let a=`${o}:${s}`,{stdout:n,stderr:m}=await g(`sf project retrieve start -m "${a}"`,{cwd:t});n&&R.appendLine(n),m&&R.appendLine(m),ee.window.showInformationMessage(`Ricwiz: Successfully extracted ${a}.`)}catch(a){R.appendLine(`ERROR: ${a.message}`),a.stdout&&R.appendLine(a.stdout),a.stderr&&R.appendLine(a.stderr),ee.window.showErrorMessage("Ricwiz: Extraction failed. See Output channel for details.")}})}var J=k(require("vscode")),$o=k(require("path"));async function Ro(){let t=J.window.activeTextEditor;if(!t){J.window.showErrorMessage("Ricwiz: Please open the file you want to deploy in the editor first.");return}let e=t.document.uri.fsPath,o=z();if(!o)return;let i="";if(await J.window.withProgress({location:J.ProgressLocation.Notification,title:"Ricwiz: Fetching available Salesforce orgs...",cancellable:!1},async()=>{try{let{stdout:d}=await g("sf org list --json",{cwd:o});i=d}catch(d){i=d.stdout||""}}),!i){J.window.showErrorMessage("Ricwiz: Failed to fetch orgs. Is Salesforce CLI installed?");return}let r=[];try{let d=JSON.parse(i),a=d.result?.nonScratchOrgs||[],n=d.result?.scratchOrgs||[];r=[...a,...n]}catch{J.window.showErrorMessage("Ricwiz: Failed to parse org list.");return}if(r.length===0){J.window.showInformationMessage("Ricwiz: No authenticated orgs found.");return}let p=r.map(d=>({label:d.alias||d.username,description:d.alias?d.username:"",picked:d.isDefaultUsername})),s=await J.window.showQuickPick(p,{placeHolder:"Select the org(s) to deploy this file to",canPickMany:!0,ignoreFocusOut:!0});if(!s||s.length===0)return;let c=$o.basename(e);await J.window.withProgress({location:J.ProgressLocation.Notification,title:`Ricwiz: Deploying ${c} to ${s.length} org(s)...`,cancellable:!1},async()=>{R.show(!0),R.appendLine(`--- Starting Parallel Deploy of ${c} ---`);let d=s.map(async l=>{let u=l.label;R.appendLine(`[${u}] Deploying...`);try{let{stdout:f,stderr:h}=await g(`sf project deploy start -d "${e}" -o "${u}"`,{cwd:o});return R.appendLine(`[${u}] \u2705 Success`),f&&R.appendLine(f),{org:u,success:!0}}catch(f){return R.appendLine(`[${u}] \u274C Failed`),f.stdout&&R.appendLine(f.stdout),f.stderr&&R.appendLine(f.stderr),{org:u,success:!1}}}),a=await Promise.all(d),n=a.filter(l=>l.success).length,m=a.filter(l=>!l.success).length;m===0?J.window.showInformationMessage(`Ricwiz: Successfully deployed to all ${n} orgs!`):J.window.showErrorMessage(`Ricwiz: Deploy finished with errors (${n} success, ${m} failed). Check Output channel.`)})}var I=k(require("vscode")),ot=k(require("fs")),it=k(require("path"));async function zo(){let t=z();if(!t){I.window.showErrorMessage("Ricwiz: Open a folder or workspace that is a Git repository.");return}let e=I.workspace.getConfiguration("ricwiz"),o=e.get("auditUsername",""),i=e.get("auditHours",8),r=await I.window.showInputBox({prompt:"Enter your Salesforce Username to query in SetupAuditTrail",value:o,placeHolder:"admin@tuaorg.com"});if(!r)return;r=$e(r);let p=await I.window.showInputBox({prompt:"How many hours back do you want to search?",value:i.toString(),placeHolder:"8"});if(!p)return;let s=parseFloat(p);if(isNaN(s)||s<=0){I.window.showErrorMessage("Ricwiz: Invalid hours specified.");return}let c=new Date(Date.now()-s*60*60*1e3).toISOString(),a=`sf data query -q "${`SELECT Action, Display, Section FROM SetupAuditTrail WHERE CreatedBy.Username = '${r}' AND CreatedDate >= ${c}`}" --json`;await I.window.withProgress({location:I.ProgressLocation.Notification,title:"Ricwiz: Interrogating Setup Audit Trail...",cancellable:!1},async()=>{try{let{stdout:n}=await g(a,{cwd:t,maxBuffer:52428800}),m=JSON.parse(n);if(!m.result||m.result.records.length===0){I.window.showInformationMessage(`Ricwiz: No changes found for ${r} in the last ${s} hours.`);return}let l=m.result.records,u=[],f=new Set;for(let B of l){let U=Qo(B.Action,B.Display,B.Section);if(U){let W=`${U.isDelete?"DEL":"ADD"}-${U.metadataFormat}`;if(!f.has(W)){f.add(W);let me=U.isDelete?"$(trash)":"$(plus)";u.push({label:`${me} ${U.metadataFormat}`,description:`${B.Action} -> ${B.Display}`,metadataFormat:U.metadataFormat,isDelete:U.isDelete})}}}if(u.length===0){I.window.showInformationMessage(`Ricwiz: No extractable metadata changes found for ${r} in the last ${s} hours (ignored passwords/logins).`);return}let h=await I.window.showQuickPick(u,{canPickMany:!0,placeHolder:"Select the changes you want to extract to GitLab",ignoreFocusOut:!0});if(!h||h.length===0){I.window.showInformationMessage("Ricwiz: No changes selected.");return}let w=h.filter(B=>B.isDelete),$=h.filter(B=>!B.isDelete),v=I.window.createOutputChannel("Ricwiz Admin Bridge");if(v.show(),w.length>0){let{stdout:B}=await g("git ls-files",{cwd:t}),U=B.split(`
`).map(me=>me.trim()),W=0;for(let me of w){let Ue=me.metadataFormat.split(":"),Ge=Ue[0],He=Ue[1],xe=He;Ge==="CustomField"&&(xe=He.split(".")[1]);let nt=U.filter(Ae=>{let A=it.basename(Ae);return A.startsWith(xe+".")&&A.includes(Ge==="CustomField"?".field":"")});for(let Ae of nt){let A=it.join(t,Ae);ot.existsSync(A)&&(ot.unlinkSync(A),v.appendLine(`Deleted local file: ${Ae}`),W++)}}I.window.showInformationMessage(`Ricwiz: Deleted ${W} local files from Git workspace.`)}if($.length===0)return;let x=$.map(B=>B.metadataFormat).filter(B=>B!=="").join(", "),b=await I.window.showInputBox({prompt:"Review and adjust the metadata components to retrieve",value:x,ignoreFocusOut:!0});if(!b)return;let S=`sf project retrieve start -m "${b}"`;v.appendLine(`Executing: ${S}`),I.window.showInformationMessage(`Ricwiz: Extracting ${$.length} components...`);let E=await g(S,{cwd:t});v.appendLine(E.stdout),E.stderr&&(v.appendLine("--- STDERR ---"),v.appendLine(E.stderr)),I.window.showInformationMessage("Ricwiz: Changes extracted successfully! Ready for Git Commit.")}catch(n){I.window.showErrorMessage(`Ricwiz: Error capturing changes - ${n.message}`)}})}function Qo(t,e,o){if(!t||!e||!o)return null;let i=t.toLowerCase(),r=o.toLowerCase();if(["security controls","network access","session settings","data export","login history","password policies","identity verification","delegated administration"].includes(r)||i.includes("login")||i.includes("password")||i.includes("oauth")||i.includes("session"))return null;let s=i.includes("delete"),c=null;if(i==="permissionsetgroupcomponentadd"||i==="permissionsetgroupcomponentdelete")return null;let d=(a,n=!1)=>{let m=a.replace(/\(.*\)/g,"").trim();m.includes(":")&&!i.includes("calculation")&&(m=m.split(":")[0]);let l=["disabled","deleted","removed","created","changed","updated","from","to","on","assigned","assign","assignment","permission","set","group","apex","class","trigger","custom","field","object","layout","validation","rule","flow","profile"],u=m.split(/\s+/);if(n){for(;u.length>0&&l.includes(u[u.length-1].toLowerCase());)u.pop();for(;u.length>0&&l.includes(u[0].toLowerCase());)u.shift();return u.join(" ").trim().replace(/[^a-zA-Z0-9_ ]/g,"")}else return u.filter(w=>!l.includes(w.toLowerCase())).join("_").replace(/[^a-zA-Z0-9_]/g,"")||m.replace(/\s+/g,"")};if(i.includes("profile"))c=`Profile:${d(e,!0)}`;else if(i.includes("permissionsetgroupcalculation")){let a=e.split(":");c=`PermissionSetGroup:${a.length>1?a[a.length-1].trim():d(e,!1)}`}else if(i.includes("permission set group")||i.includes("permissionsetgroup"))c=`PermissionSetGroup:${d(e,!1)}`;else if(i.includes("permission set")||i.includes("permissionset"))c=`PermissionSet:${d(e,!1)}`;else if(i.includes("apexclass"))c=`ApexClass:${d(e,!1)}`;else if(i.includes("apextrigger")||i.includes("apex trigger"))c=`ApexTrigger:${d(e,!1)}`;else if(i.includes("customfield")){let a=e.match(/([A-Za-z0-9_]+__c)/),n=e.match(/(?:on|na|for)\s+([A-Za-z0-9_]+)/i);a&&n?c=`CustomField:${n[1]}.${a[1]}`:c=`CustomField:${d(e,!1)}`}else if(i.includes("layout"))c=`Layout:${d(e,!0)}`;else if(i.includes("validation"))c=`ValidationRule:${d(e,!1)}`;else if(i.includes("flow"))c=`Flow:${d(e,!1)}`;else if(i.includes("customobject")){let a=e.match(/([A-Za-z0-9_]+__c)/);c=a?`CustomObject:${a[1]}`:`CustomObject:${d(e,!1)}`}else if(!i.includes("created")&&!i.includes("changed")&&!i.includes("deleted"))return null;return c?{metadataFormat:c,isDelete:s}:null}var ft=k(require("vscode"));async function Po(){let t=z();if(t)try{let{stdout:e}=await g('git for-each-ref --sort=-committerdate --format="%(refname:short)|||%(committerdate:relative)|||%(subject)" refs/heads/',{cwd:t}),o=e.split(`
`).filter(r=>r.trim()).map(r=>{let p=r.split("|||");return{label:`$(git-branch) ${p[0]}`,description:p[1],detail:p[2],branchName:p[0]}}),i=await ft.window.showQuickPick(o,{placeHolder:"Select a branch from history to checkout",matchOnDescription:!0,matchOnDetail:!0});i&&await Fe(i.branchName)}catch{ft.window.showErrorMessage("Ricwiz: Failed to get branch history")}}var Je=k(require("vscode"));async function Bo(){let t=z();if(!t)return;let e=await Je.window.showInputBox({prompt:"Enter ticket number or name (e.g., 48934)",placeHolder:"48934"});if(!e)return;let o=$e(e);try{let{stdout:i}=await g(`git branch --list "*${o}*"`,{cwd:t}),r=i.split(`
`).map(c=>c.replace("*","").trim()).filter(c=>c);if(r.length===0){Je.window.showInformationMessage(`Ricwiz: No branches found matching "${e}"`);return}let p=r.map(c=>({label:`$(git-branch) ${c}`,branchName:c})),s=await Je.window.showQuickPick(p,{placeHolder:`Select a branch for ${e}`});s&&await Fe(s.branchName)}catch{Je.window.showErrorMessage("Ricwiz: Failed to search branches")}}var Ee=k(require("vscode")),So=k(require("path"));async function To(){let t=Ee.window.activeTextEditor;if(!t)return Ee.window.showErrorMessage("Ricwiz: Please open a file in the editor to check blame."),null;let e=t.document.fileName,o=So.basename(e),i=z();if(!i)return Ee.window.showErrorMessage("Ricwiz: Workspace is not a git repository."),null;let r=[];try{let{stdout:n}=await g(`git log -5 --pretty=format:"%an|%ar|%s|%h" -- "${e}"`,{cwd:i}),m=n.trim().split(`
`);for(let l of m){let u=l.split("|");u.length>=4&&r.push({author:u[0],time:u[1],message:u.slice(2,-1).join("|"),hash:u[u.length-1]})}}catch(n){R.appendLine(`[WhoToBlame] Git blame error: ${n.message}`)}let p="Unknown",s="Unknown",c="Unknown",d=[],a=Ze(e);if(a)try{await Ee.window.withProgress({location:Ee.ProgressLocation.Notification,title:`Ricwiz: Analyzing ${a.name} in Salesforce...`,cancellable:!1},async()=>{let n="";if(a.type==="CustomField"){let m=a.name.split(".");m.length===2&&(n=`SELECT LastModifiedBy.Name, LastModifiedDate, CreatedBy.Name FROM CustomField WHERE DeveloperName = '${m[1].replace("__c","")}' AND TableEnumOrId = '${m[0]}'`)}else a.type==="LightningComponentBundle"?n=`SELECT LastModifiedBy.Name, LastModifiedDate, CreatedBy.Name FROM LightningComponentBundle WHERE DeveloperName = '${a.name}'`:n=`SELECT LastModifiedBy.Name, LastModifiedDate, CreatedBy.Name FROM ${a.type} WHERE Name = '${a.name}'`;if(n)try{let{stdout:m}=await g(`sf data query -t -q "${n}" --json`,{cwd:i,maxBuffer:52428800}),l=JSON.parse(m);if(l&&l.result&&l.result.records&&l.result.records.length>0){let u=l.result.records[0];p=u.LastModifiedBy?u.LastModifiedBy.Name:"Unknown",c=u.CreatedBy?u.CreatedBy.Name:"Unknown",s=new Date(u.LastModifiedDate).toLocaleString()}else p="Not found in Org",s="N/A",c="N/A"}catch(m){p="Query Error",s="N/A",c="N/A",R.appendLine(`[WhoToBlame] Query error: ${m.message}`)}try{let m="SELECT Action, Display, CreatedBy.Name, CreatedDate FROM SetupAuditTrail ORDER BY CreatedDate DESC LIMIT 1500",{stdout:l}=await g(`sf data query -q "${m}" --json`,{cwd:i,maxBuffer:52428800}),u=JSON.parse(l);if(u&&u.result&&u.result.records){let f=a.name.replace("__c","");d=u.result.records.filter(w=>w.Display&&w.Display.includes(f)).map(w=>({action:w.Action,display:w.Display,author:w.CreatedBy?w.CreatedBy.Name:"Unknown",time:new Date(w.CreatedDate).toLocaleString()})).slice(0,10)}}catch(m){R.appendLine(`[WhoToBlame] Audit trail query error: ${m.message}`)}})}catch(n){R.appendLine(`[WhoToBlame] Salesforce query error: ${n.message}`)}else p="Unsupported Metadata Type",s="N/A";return{fileName:o,gitHistory:r,sfAuthor:p,sfTime:s,sfCreatedBy:c,auditHistory:d}}var he=k(require("vscode"));var We=k(require("https"));async function Do(t,e){let o=z();if(!o)return;let i=(await Ce())?.trim();if(!i){he.window.showErrorMessage("Ricwiz: GitLab token is not configured.");return}try{let r=await T.initialize(o,{skipPrompt:!0});if(!r)return;let s=r.getConfig("gitlabUrlOverride","");if(s){let c=new URL(s);s=`${c.protocol}//${c.host}`}else{let{stdout:c}=await g("git remote",{cwd:o}),d=c.split(`
`).map(n=>n.trim()).filter(n=>n),a=!1;for(let n of d){let{stdout:m}=await g(`git remote get-url ${n}`,{cwd:o}),l=m.trim();l.endsWith(".git")&&(l=l.slice(0,-4)),l.startsWith("git@")&&(l=l.replace("git@","").replace(":","/"),l=`https://${l}`);let u=new URL(l),f=u.pathname;if(f.startsWith("/")&&(f=f.substring(1)),f.endsWith("/")&&(f=f.slice(0,-1)),encodeURIComponent(f)===t||f===t){s=`${u.protocol}//${u.host}`,a=!0;break}}if(!a){he.window.showErrorMessage(`Ricwiz: Could not determine base URL for project ${t}`);return}}await he.window.withProgress({location:he.ProgressLocation.Notification,title:`Fetching failed jobs for Pipeline #${e}...`,cancellable:!1},async()=>{let c=new We.Agent({keepAlive:!0}),d=new URL(`${s}/api/v4/projects/${t}/pipelines/${e}/jobs?scope[]=failed`),a=await new Promise(h=>{We.get(d,{headers:{"PRIVATE-TOKEN":i},agent:c},w=>{let $="";w.on("data",v=>$+=v),w.on("end",()=>{if(w.statusCode===200)try{h(JSON.parse($))}catch{h([])}else h([])})}).on("error",()=>h([]))});if(!a||a.length===0){he.window.showInformationMessage("Ricwiz: No failed jobs found for this pipeline.");return}let n=a[0],m=new URL(`${s}/api/v4/projects/${t}/jobs/${n.id}/trace`),u=(await new Promise(h=>{We.get(m,{headers:{"PRIVATE-TOKEN":i},agent:c},w=>{let $="";w.on("data",v=>$+=v),w.on("end",()=>h($))}).on("error",w=>h(`Failed to fetch log: ${w.message}`))})).replace(/\x1B\[[0-9;]*[mK]/g,""),f=he.window.createOutputChannel(`Pipeline #${e} - Job ${n.name}`);f.appendLine(`Pipeline ID: ${e}`),f.appendLine(`Job Name: ${n.name}`),f.appendLine(`Status: ${n.status}`),f.appendLine(`URL: ${n.web_url}`),f.appendLine("========================================"),f.appendLine(u),f.show()})}catch(r){he.window.showErrorMessage(`Ricwiz: Error fetching pipeline logs - ${r.message}`)}}var O=k(require("vscode")),rt=k(require("child_process"));async function Yo(t,e,o,i){return new Promise((r,p)=>{let c=rt.spawn("gemini",["-y","--output-format","text"],{cwd:e,shell:!0});c.stdin.write(t),c.stdin.end(),i&&i.onCancellationRequested(()=>{c.kill(),p(new Error("Operation cancelled by user."))});let d="",a="";c.stdout.on("data",n=>{let m=n.toString();d+=m,o&&o.append(m)}),c.stderr.on("data",n=>{let m=n.toString();a+=m,o&&o.append(m)}),c.on("error",n=>{p(new Error(`Failed to start Gemini CLI: ${n.message}. Is it installed and in your PATH?`))}),c.on("close",n=>{n===0?r(d.trim()):p(new Error(`Gemini CLI failed with code ${n}: ${a||d}`))})})}function Ko(t){if(!t||!t.trim())return"";let e=t.trim(),o=e.match(/###\s*([^#\r\n]+)\s*###/);if(o&&o[1]?.trim())e=o[1].trim();else{let r=e.match(/###\s*Answer\s*###\s*:?\s*([^\r\n]+)/i);if(r&&r[1]?.trim())e=r[1].trim();else{let p=e.match(/<(?:commit_message|answer|output)>([\s\S]*?)<\/(?:commit_message|answer|output)>/i);p&&p[1]?.trim()?e=p[1].trim():(e=e.replace(/<(?:thought|think|thinking)[\s\S]*?<\/(?:thought|think|thinking)>/gi,""),e=e.split(/\r?\n/).map(c=>c.trim()).find(c=>c.length>0&&!/^alternative\b/i.test(c)&&!/^(?:thinking|thought|here\s+is)/i.test(c))||e)}}let i=e.split(/\r?\n/)[0].trim();return i=i.replace(/^#+|#+$/g,"").trim(),i=i.replace(/^###\s*Answer\s*###\s*:?\s*/i,""),i=i.replace(/^[`"']+|[`"']+$/g,"").trim(),i=i.replace(/^[-*•]\s+/,""),i=i.replace(/^\d+[\.\)]\s+/,""),i=i.replace(/^\[?[A-Z0-9]+(?:-[A-Z0-9]+)*-\d+(?:-\d+)?\]?\s*(?:-\s*|:\s*|\s+)?/i,""),i=i.replace(/\s+/g," ").trim(),i.length>0&&/^[a-z]/.test(i)&&(/^(feat|fix|docs|style|refactor|perf|test|build|ci|chore|revert)(\([^\)]+\))?:/.test(i)||(i=i.charAt(0).toUpperCase()+i.slice(1))),i.endsWith(".")&&!i.endsWith("..")&&(i=i.slice(0,-1).trim()),i}async function Eo(){let t=O.workspace.workspaceFolders;if(!t){O.window.showErrorMessage("No workspace folder found.");return}let e=t[0].uri.fsPath;try{let o=await new Promise((i,r)=>{rt.execFile("git",["diff","--cached","-U1","--no-ext-diff","--no-color","--",".",":(exclude)package-lock.json",":(exclude)yarn.lock",":(exclude)*.map",":(exclude)*.min.js",":(exclude)*.min.css"],{cwd:e,maxBuffer:10485760},(s,c,d)=>{s&&!c?r(s):i(c)})});if(!o.trim()){O.window.showInformationMessage("No staged changes found. Please stage your changes first.");return}await O.window.withProgress({location:O.ProgressLocation.Notification,title:"Generating commit message with Gemini...",cancellable:!0},async(i,r)=>{let p=`Generate a single, concise commit message description in English for the following git diff.

Rules:
- Start with a capital letter
- Use the imperative mood (e.g. "Add", "Fix", "Update", "Refactor")
- Under 72 characters
- Do NOT include any ticket numbers
- Do NOT provide multiple options or alternatives
- Output the final message enclosed exactly between ### and ### on its own line like:
###<your commit message here>###

Diff:
${o.slice(0,1e4)}`,s=O.window.createOutputChannel("Ricwiz AI: Commit Message");s.show(!0),s.appendLine("--- Generating Commit Message ---");let c=L(e),d=await Yo(p,e,s,r);s.appendLine(`
--- Finished ---`);let a=Ko(d);if(!a){O.window.showWarningMessage("Could not extract a valid commit message from Gemini output.");return}let n=O.extensions.getExtension("vscode.git");if(n&&n.isActive){let m=n.exports.getAPI(1);if(m.repositories.length>0){let l=m.repositories[0],u=l.inputBox.value||"",f=/^[A-Z]+-\d+(?:-\d+)?\s*(?:-\s*|:\s*|\s+)?/i,h=u.match(f);if(h)l.inputBox.value=h[0]+a;else{let w=await c,$=O.workspace.getConfiguration("ricwiz"),v=$.get("ticketPrefix","SFPSCA-"),x=te(w,v),b=w.match(new RegExp(`(${x}\\d+(?:-\\d+)?)`,"i"));if(b){let S=$.get("commitMessageSuffix","- ");l.inputBox.value=`${b[1].toUpperCase()}${S}`+a}else l.inputBox.value=a}O.window.showInformationMessage("Commit message generated and prefilled!")}else O.window.showInformationMessage("Generated: "+a)}else O.window.showInformationMessage("Generated: "+a)})}catch(o){O.window.showErrorMessage("Failed to generate commit message: "+o.message)}}function Mo(t,e,o){t.subscriptions.push(y.commands.registerCommand("ricwiz.conflictAction",At),y.commands.registerCommand("ricwiz.generateDestructiveChanges",async()=>{try{await Dt()}finally{y.commands.executeCommand("ricwiz.manualRefresh")}}),y.commands.registerCommand("ricwiz.runSmartTests",async()=>{try{await Et()}finally{y.commands.executeCommand("ricwiz.manualRefresh")}}),y.commands.registerCommand("ricwiz.refreshWebview",()=>{e&&y.commands.executeCommand("workbench.action.webview.reloadWebviewAction")}),y.commands.registerCommand("ricwiz.createBranches",async i=>{try{await Mt(i)}finally{y.commands.executeCommand("ricwiz.manualRefresh")}}),y.commands.registerCommand("ricwiz.prepareDeploy",async()=>{try{await Nt()}finally{y.commands.executeCommand("ricwiz.manualRefresh")}}),y.commands.registerCommand("ricwiz.createMergeRequests",async()=>{try{await Jt()}finally{y.commands.executeCommand("ricwiz.manualRefresh")}}),y.commands.registerCommand("ricwiz.createMergeRequestsVSCode",async()=>{try{await Wt()}finally{y.commands.executeCommand("ricwiz.manualRefresh")}}),y.commands.registerCommand("ricwiz.openJiraTicket",async()=>{try{await Ht()}finally{y.commands.executeCommand("ricwiz.manualRefresh")}}),y.commands.registerCommand("ricwiz.openJiraTicketVSCode",async()=>{try{await Vt()}finally{y.commands.executeCommand("ricwiz.manualRefresh")}}),y.commands.registerCommand("ricwiz.showJiraDetails",()=>{e&&io(e)}),y.commands.registerCommand("ricwiz.openJiraDashboard",i=>{e&&ro(e,i)}),y.commands.registerCommand("ricwiz.openJiraDetailsForId",i=>{e&&no(e,i)}),y.commands.registerCommand("ricwiz.toggleDashboardBranches",i=>{e&&(e.setDashboardShowBranches(i),y.commands.executeCommand("ricwiz.openJiraDashboard"))}),y.commands.registerCommand("ricwiz.changeJiraStatus",async()=>{try{await so()}finally{y.commands.executeCommand("ricwiz.manualRefresh")}}),y.commands.registerCommand("ricwiz.addJiraComment",async()=>{try{await ao()}finally{y.commands.executeCommand("ricwiz.manualRefresh")}}),y.commands.registerCommand("ricwiz.addJiraLabel",async()=>{try{await co()}finally{y.commands.executeCommand("ricwiz.manualRefresh")}}),y.commands.registerCommand("ricwiz.setJiraToken",lo),y.commands.registerCommand("ricwiz.setGitlabToken",po),y.commands.registerCommand("ricwiz.syncAll",async()=>{try{await uo()}finally{y.commands.executeCommand("ricwiz.manualRefresh")}}),y.commands.registerCommand("ricwiz.updateBases",async()=>{try{await go()}finally{y.commands.executeCommand("ricwiz.manualRefresh")}}),y.commands.registerCommand("ricwiz.deleteUnusedBranches",async()=>{try{await fo()}finally{y.commands.executeCommand("ricwiz.manualRefresh")}}),y.commands.registerCommand("ricwiz.checkoutBranch",async i=>{try{await Fe(i)}finally{y.commands.executeCommand("ricwiz.manualRefresh")}}),y.commands.registerCommand("ricwiz.copyBranchName",async()=>{try{await ho()}finally{y.commands.executeCommand("ricwiz.manualRefresh")}}),y.commands.registerCommand("ricwiz.generatePackageXml",async()=>{try{await vo()}finally{y.commands.executeCommand("ricwiz.manualRefresh")}}),y.commands.registerCommand("ricwiz.deployPackage",async()=>{try{await yo()}finally{y.commands.executeCommand("ricwiz.manualRefresh")}}),y.commands.registerCommand("ricwiz.importData",async()=>{try{await bo()}finally{y.commands.executeCommand("ricwiz.manualRefresh")}}),y.commands.registerCommand("ricwiz.listTicketFiles",async()=>{try{await xo()}finally{y.commands.executeCommand("ricwiz.manualRefresh")}}),y.commands.registerCommand("ricwiz.resetTracking",async()=>{try{await ko()}finally{y.commands.executeCommand("ricwiz.manualRefresh")}}),y.commands.registerCommand("ricwiz.extractComponent",async()=>{try{await Co()}finally{y.commands.executeCommand("ricwiz.manualRefresh")}}),y.commands.registerCommand("ricwiz.deployMultiOrg",async()=>{try{await Ro()}finally{y.commands.executeCommand("ricwiz.manualRefresh")}}),y.commands.registerCommand("ricwiz.captureAdminChanges",async()=>{try{await zo()}finally{y.commands.executeCommand("ricwiz.manualRefresh")}}),y.commands.registerCommand("ricwiz.openHistory",async()=>{try{await Po()}finally{y.commands.executeCommand("ricwiz.manualRefresh")}}),y.commands.registerCommand("ricwiz.searchTicket",async()=>{try{await Bo()}finally{y.commands.executeCommand("ricwiz.manualRefresh")}}),y.commands.registerCommand("ricwiz.whoToBlame",async()=>{let i=await To();i&&e&&(e.setBlameData(i),e.setPage("blame"))}),y.commands.registerCommand("ricwiz.showPipelineLogs",(i,r)=>Do(i,r)),y.commands.registerCommand("ricwiz.manualRefresh",()=>{o&&o()}),y.commands.registerCommand("ricwiz.toggleAutoRefresh",()=>{if(e){let i=!e.isAutoRefreshEnabled();e.setAutoRefresh(i),y.workspace.getConfiguration("ricwiz").update("autoRefresh",i,y.ConfigurationTarget.Global)}}),y.commands.registerCommand("ricwiz.openSettings",()=>{y.commands.executeCommand("workbench.action.openSettings","ricwiz")}),y.commands.registerCommand("ricwiz.generateCommitMessage",async()=>{await Eo()}))}var le=k(require("vscode"));function Ao(t,e,o){let i,r=le.workspace.getConfiguration("ricwiz").get("autoRefresh",!0);e?.setAutoRefresh(r),t.subscriptions.push(le.workspace.onDidChangeConfiguration(s=>{if(s.affectsConfiguration("ricwiz.autoRefresh")){let c=le.workspace.getConfiguration("ricwiz").get("autoRefresh",!0);e?.setAutoRefresh(c)}}));async function p(){let s=le.extensions.getExtension("vscode.git");if(s){let a=function(n){let m="",l;async function u(){let h=le.workspace.workspaceFolders;if(!h)return;let w=h[0].uri.fsPath,$=await L(w);if($&&$!==m){m=$;let v=le.workspace.getConfiguration("ricwiz"),x=v.get("ticketPrefix","SFPSCA-");if(!$.includes(x)){let A=$.match(/([A-Z]+-)\d+/i);A&&(x=A[1].toUpperCase())}let b=[],S=[],E=[],B=[],U=await T.initialize(w,{skipPrompt:!0}),W=U?.environments||v.get("environments",[{name:"Qual",sourceBranch:"quality"},{name:"Val",sourceBranch:"validation"},{name:"Prod",sourceBranch:"main"}]);try{let A=v.get("workspaceCheckoutButtons",["main","quality","validation"]);E=Array.from(new Set(A))}catch{}let me="",Ue=$.match(new RegExp(`(${x}\\d+(?:-\\d+)?)`,"i"));if(Ue){let A=Ue[1].toUpperCase();me=A;let we=v.get("commitMessageSuffix","- "),ht=/^[A-Z]+-\d+(?:-\d+)?\s*(?:-\s*|:\s*|\s+)?/i;ht.test(n.inputBox.value)?n.inputBox.value.toUpperCase().startsWith(A)||(n.inputBox.value=n.inputBox.value.replace(ht,`${A}${we}`)):n.inputBox.value=`${A}${we}`+n.inputBox.value,o.text=`$(bookmark) ${A}`,o.tooltip=`Branch: ${$}
Click to open Jira ticket`,o.show();try{let wt=await Se(w,A,"");b=await Be(w,wt,A,W,U)}catch{}}else{o.hide();try{B=await Ot(w)}catch{}}let[Ge,He,xe]=await Promise.all([Ut(w,10),Ft(w,$,W,U),me?Ie(me).catch(A=>{let we=A.message;return we&&(we.includes("ENOTFOUND")||we.includes("network"))&&(we="No Internet or Invalid URL"),{summary:`\u26A0\uFE0F Jira Error: ${we}`,description:"",status:""}}):Promise.resolve(null)]);S=Ge;let nt=xe?xe.summary:"",Ae=xe&&xe.status||"";e?.updateBranch($,He,b,S,E,B,nt,Ae)}}function f(){e?.isAutoRefreshEnabled()&&(l&&clearTimeout(l),l=setTimeout(()=>{m="",u()},300))}i=()=>{m="",u()},u(),t.subscriptions.push(n.state.onDidChange(()=>f())),t.subscriptions.push(le.window.onDidChangeWindowState(h=>{h.focused&&f()}))};var c=a;s.isActive||await s.activate();let d=s.exports.getAPI(1);d.repositories.length>0&&d.repositories.forEach(n=>a(n)),d.onDidOpenRepository(n=>a(n))}}return p(),()=>{i&&i()}}var Lo={get_tickets_batch:async t=>{let e=await oo(t);return JSON.stringify(e)}};var ce;async function Zo(t){await zt(t),ce=new _e(t.extensionUri),t.subscriptions.push(Me.window.registerWebviewViewProvider("ricwiz-webview",ce));let e=Me.window.createStatusBarItem(Me.StatusBarAlignment.Left,100);e.command="ricwiz.openJiraTicket",t.subscriptions.push(e);let o=Ao(t,ce,e);return Mo(t,ce,o),{getJiraCredentials:async()=>({email:Me.workspace.getConfiguration("ricwiz").get("jiraEmail",""),token:await Qe()}),getGitLabToken:async()=>Ce(),AiSkills:Lo}}function Xo(){}0&&(module.exports={activate,deactivate,webviewProvider});
