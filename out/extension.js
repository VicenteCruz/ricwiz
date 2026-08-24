"use strict";var $o=Object.create;var Ne=Object.defineProperty;var Ro=Object.getOwnPropertyDescriptor;var zo=Object.getOwnPropertyNames;var Po=Object.getPrototypeOf,Bo=Object.prototype.hasOwnProperty;var So=(t,e)=>{for(var o in e)Ne(t,o,{get:e[o],enumerable:!0})},ct=(t,e,o,s)=>{if(e&&typeof e=="object"||typeof e=="function")for(let r of zo(e))!Bo.call(t,r)&&r!==o&&Ne(t,r,{get:()=>e[r],enumerable:!(s=Ro(e,r))||s.enumerable});return t};var k=(t,e,o)=>(o=t!=null?$o(Po(t)):{},ct(e||!t||!t.__esModule?Ne(o,"default",{value:t,enumerable:!0}):o,t)),Do=t=>ct(Ne({},"__esModule",{value:!0}),t);var Uo={};So(Uo,{activate:()=>Io,deactivate:()=>Oo,webviewProvider:()=>re});module.exports=Do(Uo);var Oe=k(require("vscode"));var $=k(require("vscode"));function y(t){return t?t.replace(/&/g,"&amp;").replace(/</g,"&lt;").replace(/>/g,"&gt;").replace(/"/g,"&quot;").replace(/'/g,"&#39;"):""}function We(t){let e=(t||"").toLowerCase().trim();return e==="open"?"#888888":e==="in progress"?"#007acc":e==="waiting for deploy"?"#d7a500":e==="close"||e==="done"||e==="closed"?"#238636":"var(--vscode-badge-background)"}function be(t){return t?t==="running"?"\u{1F7E1}":t==="success"?"\u{1F7E2}":t==="failed"?"\u{1F534}":t==="canceled"||t==="skipped"?"\u26AA":"":""}function J(){return`
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
    `}function G(){return`
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
    `}function dt(t,e){let o=G(),s=(e.files||[]).map(r=>`
        <button class="btn" style="padding: 6px; font-size: 12px; display: flex; justify-content: space-between; align-items: center;" onclick="sendOpenFileCommand('${y(r.file)}')">
            <span style="flex: 1; overflow: hidden; text-overflow: ellipsis; white-space: nowrap; direction: rtl; text-align: left;">&lrm;${y(r.file)}</span>
            <span style="font-size: 10px; opacity: 0.8; flex-shrink: 0; background-color: var(--vscode-badge-background); color: var(--vscode-badge-foreground); padding: 2px 4px; border-radius: 2px;">${y(r.state)}</span>
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
                Merging <b>${y(e.sourceStr)}</b> into <b>${y(e.targetStr)}</b>.<br/>
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
        
        ${s?`
            <div style="font-size: 11px; opacity: 0.7; margin: 8px 4px 4px 4px; text-transform: uppercase;">Conflicted Files</div>
            <div style="display: flex; flex-direction: column; gap: 2px;">
                ${s}
            </div>
        `:""}

        ${J()}
    </body>
    </html>`}function lt(t){return`<!DOCTYPE html>
    <html lang="en">
    <head>
        <meta charset="UTF-8">
        <meta name="viewport" content="width=device-width, initial-scale=1.0">
        <title>Ricwiz Blame</title>
        ${G()}
    </head>
    <body>
        <div style="display: flex; align-items: center; gap: 8px; margin-bottom: 16px; margin-top: 8px;">
            <button class="btn" style="width: auto; padding: 4px 8px; background-color: var(--vscode-button-secondaryBackground); color: var(--vscode-button-secondaryForeground);" onclick="sendCommand('openDevTools', null, this)">\u2190 Back</button>
            <div style="font-weight: bold; font-size: 13px; flex: 1; text-align: center;">Who to Blame</div>
        </div>

        ${t?`
        <div style="padding: 12px; background: var(--vscode-editor-background); border: 1px solid var(--vscode-widget-border); border-radius: 6px; margin-bottom: 12px;">
            <div style="font-weight: bold; margin-bottom: 12px; font-size: 14px; text-align: center; color: var(--vscode-textLink-foreground); word-break: break-all;">
                \u25A4 ${y(t.fileName)}
            </div>

            <div style="margin-bottom: 20px;">
                <div style="font-size: 11px; font-weight: bold; opacity: 0.8; text-transform: uppercase; margin-bottom: 8px;"><span class="icon" style="color: #0A84FF;">\u25F3</span> Local Git (Last Commits)</div>
                <ul style="list-style-type: none; padding: 0; margin: 0; display: flex; flex-direction: column; gap: 8px;">
                    ${t.gitHistory&&t.gitHistory.length>0?t.gitHistory.map(o=>`
                        <li style="background: var(--vscode-editorWidget-background); border: 1px solid var(--vscode-widget-border); padding: 8px 10px; border-radius: 4px; border-left: 4px solid var(--vscode-gitDecoration-modifiedResourceForeground);">
                            <div style="display: flex; justify-content: space-between; margin-bottom: 4px; align-items: center;">
                                <strong style="font-size: 13px;">${y(o.author)}</strong>
                                <span style="opacity: 0.7; font-size: 11px;">${y(o.time)}</span>
                            </div>
                            <div style="font-size: 12px; margin-bottom: 6px; opacity: 0.9; font-style: italic;">"${y(o.message)}"</div>
                            <div style="font-family: monospace; font-size: 10px; opacity: 0.6;">Commit: ${y(o.hash)}</div>
                        </li>
                    `).join(""):'<li style="opacity:0.7; font-size: 12px;">No Git history found.</li>'}
                </ul>
            </div>

            <div style="margin-bottom: 20px;">
                <div style="font-size: 11px; font-weight: bold; opacity: 0.8; text-transform: uppercase; margin-bottom: 8px;"><span class="icon" style="color: #0A84FF;">\u2601</span> Salesforce Metadata</div>
                <div style="display: flex; flex-direction: column; gap: 8px;">
                    <div style="background: var(--vscode-editorWidget-background); border: 1px solid var(--vscode-widget-border); padding: 8px 10px; border-radius: 4px; border-left: 4px solid var(--vscode-gitDecoration-addedResourceForeground);">
                        <div style="font-size: 10px; opacity: 0.7; text-transform: uppercase; margin-bottom: 2px;">Last Modified By</div>
                        <div style="font-weight: bold; font-size: 13px;">${y(t.sfAuthor)}</div>
                        <div style="font-size: 11px; opacity: 0.7; margin-top: 2px;">${y(t.sfTime)}</div>
                    </div>
                    ${t.sfCreatedBy!=="Unknown"&&t.sfCreatedBy!=="N/A"?`
                    <div style="background: var(--vscode-editorWidget-background); border: 1px solid var(--vscode-widget-border); padding: 8px 10px; border-radius: 4px; border-left: 4px solid var(--vscode-gitDecoration-addedResourceForeground);">
                        <div style="font-size: 10px; opacity: 0.7; text-transform: uppercase; margin-bottom: 2px;">Created By</div>
                        <div style="font-weight: bold; font-size: 13px;">${y(t.sfCreatedBy)}</div>
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
                                <strong style="font-size: 13px;">${y(o.author)}</strong>
                                <span style="opacity: 0.7; font-size: 11px;">${y(o.time)}</span>
                            </div>
                            <div style="font-size: 12px; font-weight: 500; margin-bottom: 4px;">${y(o.action)}</div>
                            <div style="font-size: 11px; opacity: 0.7; font-style: italic; background: var(--vscode-editor-background); padding: 4px; border-radius: 3px;">${y(o.display)}</div>
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

        ${J()}
    </body>
    </html>`}function mt(t){let e=G(),o=t?.ticketId||"Jira",s=t?.summary||"No Title",r=t?.description||"No description provided.",m=t?.relatedBranches||[];return`<!DOCTYPE html>
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
            <span style="font-weight: 600; font-size: 13px;">${y(o)} Details</span>
        </div>
        
        <div class="card" style="padding: 16px;">
            <div class="jira-title">${y(s)}</div>
            <div class="jira-desc">${y(r)}</div>
            
            ${m.length>0?`
                <div style="margin-top: 16px; border-top: 1px solid var(--vscode-panel-border); padding-top: 12px;">
                    <div style="font-size: 11px; opacity: 0.7; margin-bottom: 8px; text-transform: uppercase; font-weight: bold;"><span class="icon" style="color: #32D74B;">\u2387</span> Related Branches & MRs</div>
                    <div style="display: flex; flex-direction: column; gap: 4px;">
                        ${m.map(n=>{let c=be(n.pipelineStatus),d="";return n.pipelineStatus==="failed"&&n.projectPath&&n.pipelineId&&(d=`onclick="event.stopPropagation(); sendCommand('showPipelineLogs', { projectPath: '${n.projectPath}', pipelineId: ${n.pipelineId} });" style="cursor: pointer;"`),`
                            <div class="btn" style="padding: 6px 10px; font-size: 12px; display: flex; justify-content: space-between; align-items: center; background-color: var(--vscode-button-secondaryBackground); color: var(--vscode-button-secondaryForeground); border-radius: 4px;" onclick="sendCheckoutCommand('${y(n.name)}', this)" title="Checkout ${y(n.name)}">
                                <div style="display: flex; align-items: center; gap: 6px; overflow: hidden;">
                                    <span style="overflow: hidden; text-overflow: ellipsis; white-space: nowrap; font-weight: bold;">${y(n.name)}</span>
                                </div>
                                <div style="display: flex; gap: 6px; align-items: center;">
                                    ${c?`<span title="Pipeline: ${n.pipelineStatus}" style="font-size: 11px;" ${d}>${c}</span>`:""}
                                    ${n.mrUrl?`<span onclick="event.stopPropagation(); sendCommand('openExternal', '${n.mrUrl}');" title="Open Merge Request" style="cursor: pointer; font-size: 12px;">\u{1F517}</span>`:""}
                                    ${n.isMerged?'<span style="background-color: var(--vscode-charts-green); color: white; border-radius: 3px; padding: 2px 6px; font-size: 10px; font-weight: bold;" title="Merged to target env">MERGED</span>':""}
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

        ${J()}
    </body>
    </html>`}function pt(t){let{data:e,showBranches:o}=t,s=G(),r=e||{queries:[],selectedIndex:0,results:[],error:null},m=r.queries.map((c,d)=>`
        <option value="${d}" ${d===r.selectedIndex?"selected":""}>${y(c.name)}</option>
    `).join(""),n=r.error?`
        <div style="color: var(--vscode-errorForeground); padding: 12px; text-align: center; background: var(--vscode-editorError-background); border-radius: 4px;">
            \u26A0 ${y(r.error)}
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
                    <tr style="border-bottom: ${c.detailedBranches&&c.detailedBranches.length>0?"none":"1px solid var(--vscode-panel-border)"}; cursor: pointer;" class="tr-hover" onclick="sendCommand('openJiraDetailsForId', '${y(c.key)}', this)">
                        <td style="padding: 6px; font-weight: bold; color: var(--vscode-textLink-foreground); white-space: nowrap;">${y(c.key)}</td>
                        <td style="padding: 6px; overflow: hidden; text-overflow: ellipsis; max-width: 150px; white-space: nowrap;" title="${y(c.summary)}">${y(c.summary)}</td>
                        <td style="padding: 6px; white-space: nowrap;">
                            <span style="background: ${We(c.status)}; color: white; padding: 2px 4px; border-radius: 3px; font-size: 9px; font-weight: bold; text-transform: uppercase;">${y(c.status)}</span>
                        </td>
                        <td style="padding: 6px; white-space: nowrap; text-align: center;">
                            ${c.detailedBranches?"":c.branch?`
                                <button class="icon-button" style="background-color: var(--vscode-button-secondaryBackground); color: var(--vscode-button-secondaryForeground); font-size: 10px; padding: 2px 6px;" title="Checkout ${y(c.branch)}" onclick="event.stopPropagation(); sendCommand('checkout', '${y(c.branch)}')">
                                    \u2387 Checkout
                                </button>
                            `:`
                                <button class="icon-button" style="background-color: var(--vscode-button-background); color: var(--vscode-button-foreground); font-size: 10px; padding: 2px 6px;" title="Create Branch for ${y(c.key)}" onclick="event.stopPropagation(); sendCommand('createBranchForTicket', '${y(c.key)}')">
                                    + Create
                                </button>
                            `}
                        </td>
                    </tr>
                    ${c.detailedBranches&&c.detailedBranches.length>0?`
                    <tr style="border-bottom: 1px solid var(--vscode-panel-border);">
                        <td colspan="4" style="padding: 0 6px 8px 6px;">
                            <div style="display: flex; flex-direction: column; gap: 4px; padding-left: 8px; border-left: 2px solid var(--vscode-editorIndentGuide-activeBackground1);">
                                ${c.detailedBranches.map(d=>{let i=be(d.pipelineStatus),a="";return d.pipelineStatus==="failed"&&d.projectPath&&d.pipelineId&&(a=`onclick="event.stopPropagation(); sendCommand('showPipelineLogs', { projectPath: '${d.projectPath}', pipelineId: ${d.pipelineId} });" style="cursor: pointer;"`),`
                                    <div style="display: flex; justify-content: space-between; align-items: center; font-size: 10px; background: var(--vscode-editor-background); padding: 2px 6px; border-radius: 3px;">
                                        <div style="display: flex; align-items: center; gap: 6px; overflow: hidden; cursor: pointer; flex: 1;" onclick="sendCheckoutCommand('${y(d.name)}', this)" title="Checkout ${y(d.name)}">
                                            <span style="overflow: hidden; text-overflow: ellipsis; white-space: nowrap;">${y(d.name)}</span>
                                            ${i?`<span title="Pipeline: ${d.pipelineStatus}" ${a}>${i}</span>`:""}
                                        </div>
                                        <div style="display: flex; gap: 6px; align-items: center;">
                                            ${d.mrUrl?`<span onclick="event.stopPropagation(); sendCommand('openExternal', '${d.mrUrl}');" title="Open Merge Request" style="cursor: pointer;">\u{1F517}</span>`:""}
                                            ${d.isMerged?'<span style="background-color: var(--vscode-charts-green); color: white; border-radius: 3px; padding: 1px 4px; font-size: 8px; font-weight: bold;">MERGED</span>':""}
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
        ${s}
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
                ${m}
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
            ${n}
        </div>

        ${J()}
    </body>
    </html>`}function ut(){return`<!DOCTYPE html>
    <html lang="en">
    <head>
        <meta charset="UTF-8">
        <meta name="viewport" content="width=device-width, initial-scale=1.0">
        <title>Ricwiz DevTools</title>
        ${G()}
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
        
        ${J()}
    </body>
    </html>`}function gt(t){let{logoUri:e,currentBranch:o,currentBranchIsMerged:s,relatedBranches:r,commits:m,baseBranches:n,recentTickets:c,ticketTitle:d,ticketStatus:i,autoRefreshEnabled:a}=t,l=G(),u=m.length>0?`
        <div class="separator"></div>
        <div style="padding: 0 4px;">
            <div style="font-size: 11px; opacity: 0.7; margin-bottom: 6px; display: flex; align-items: center; gap: 4px;">
                <span>\u2637</span> Recent Commits
            </div>
            <div style="display: flex; flex-direction: column; gap: 2px;">
                ${m.map(v=>`
                    <div style="font-size: 11px; padding: 3px 4px; border-radius: 2px; display: flex; gap: 6px; align-items: baseline;">
                        <code style="color: var(--vscode-textLink-foreground); font-size: 10px; flex-shrink: 0;">${y(v.hash)}</code>
                        <span style="flex: 1; overflow: hidden; text-overflow: ellipsis; white-space: nowrap;" title="${y(v.message)}">${y(v.message)}</span>
                        <span style="font-size: 9px; opacity: 0.5; flex-shrink: 0;">${y(v.timeAgo)}</span>
                    </div>
                `).join("")}
            </div>
        </div>
    `:"",p=r.find(v=>v.name===o),f="";p&&(f=be(p.pipelineStatus));let h=p?p.mrUrl:void 0,w=r.filter(v=>v.name!==o),x=o?`
        <div style="background-color: var(--vscode-editor-inactiveSelectionBackground); padding: 10px; border-radius: 6px; margin-bottom: 16px; border: 1px solid var(--vscode-panel-border); box-shadow: 0 2px 4px rgba(0,0,0,0.1); position: relative;">
            ${d&&i?`
            <div style="position: absolute; top: 6px; right: 6px; z-index: 10; cursor: pointer; font-size: 9px; padding: 2px 6px; border-radius: 4px; background-color: ${We(i)}; color: white; border: 1px solid var(--vscode-panel-border); opacity: 0.9; font-weight: bold; text-transform: uppercase; display: flex; align-items: center; gap: 4px;" onclick="sendCommand('changeJiraStatus', null, this)" title="Update Jira Status">
                <span>\u270E</span><span>${y(i)}</span>
            </div>
            `:""}
            <div style="font-size: 10px; opacity: 0.7; margin-bottom: 4px; display: flex; align-items: center; justify-content: center; gap: 4px; text-transform: uppercase;">
                <span>Current Ticket / Branch</span>
                <button class="copy-btn" onclick="sendCommand('copyBranch', null, this)" title="Copy branch name to clipboard">\u2398</button>
            </div>
            <div style="font-weight: bold; font-size: 14px; word-break: break-all; text-align: center; color: var(--vscode-textLink-foreground); display: flex; justify-content: center; align-items: center; gap: 6px;">
                <span>${y(o)}</span>
                ${f?`<span title="Pipeline: ${p.pipelineStatus}" style="font-size: 12px;">${f}</span>`:""}
                ${h?`<span onclick="event.stopPropagation(); sendCommand('openExternal', '${h}');" title="Open Merge Request" style="cursor: pointer; font-size: 12px;">\u{1F517}</span>`:""}
                ${s?'<span style="background-color: var(--vscode-charts-green); color: white; border-radius: 3px; padding: 1px 4px; font-size: 10px; font-weight: bold;" title="Merged to target env">MERGED</span>':""}
            </div>
            ${d?`<div style="font-size: 12px; margin-top: 6px; text-align: center; opacity: 0.9; font-style: italic;">${y(d)}</div>`:""}
            ${w.length>0?`
                <div style="margin-top: 10px; border-top: 1px solid var(--vscode-panel-border); padding-top: 10px;">
                    <div style="font-size: 10px; opacity: 0.7; margin-bottom: 6px; text-transform: uppercase; text-align: center;">Sister Branches</div>
                    <div style="display: flex; flex-direction: column; gap: 4px;">
                        ${w.map(v=>{let P=be(v.pipelineStatus),T="";return v.pipelineStatus==="failed"&&v.projectPath&&v.pipelineId&&(T=`onclick="event.stopPropagation(); sendCommand('showPipelineLogs', { projectPath: '${v.projectPath}', pipelineId: ${v.pipelineId} });" style="cursor: pointer;"`),`
                            <div class="btn" style="padding: 6px 8px; font-size: 11px; display: flex; justify-content: space-between; align-items: center; background-color: var(--vscode-button-secondaryBackground); color: var(--vscode-button-secondaryForeground); border-radius: 4px; box-sizing: border-box; width: 100%;" onclick="sendCheckoutCommand('${y(v.name)}', this)" title="Checkout ${y(v.name)}">
                                <div style="display: flex; align-items: center; gap: 4px; overflow: hidden;">
                                    <span style="overflow: hidden; text-overflow: ellipsis; white-space: nowrap; font-weight: bold;">${y(v.name)}</span>
                                </div>
                                <div style="display: flex; gap: 4px; align-items: center;">
                                    ${P?`<span title="Pipeline: ${v.pipelineStatus}" style="font-size: 10px;" ${T}>${P}</span>`:""}
                                    ${v.mrUrl?`<span onclick="event.stopPropagation(); sendCommand('openExternal', '${v.mrUrl}');" title="Open Merge Request" style="cursor: pointer; font-size: 10px;">\u{1F517}</span>`:""}
                                    ${v.isMerged?'<span style="background-color: var(--vscode-charts-green); color: white; border-radius: 3px; padding: 1px 4px; font-size: 9px; font-weight: bold;" title="Merged to target env">MERGED</span>':""}
                                </div>
                            </div>`}).join("")}
                    </div>
                </div>
            `:c.length>0?`
                <div style="margin-top: 10px; border-top: 1px solid var(--vscode-panel-border); padding-top: 10px;">
                    <div style="font-size: 10px; opacity: 0.7; margin-bottom: 6px; text-transform: uppercase; text-align: center;">Recent Tickets</div>
                    <div style="display: flex; flex-direction: column; gap: 4px;">
                        ${c.map(v=>`
                            <div class="btn" style="padding: 6px 8px; font-size: 11px; display: flex; justify-content: space-between; align-items: center; background-color: var(--vscode-button-secondaryBackground); color: var(--vscode-button-secondaryForeground); border-radius: 4px; box-sizing: border-box; width: 100%;" onclick="sendCheckoutCommand('${y(v)}', this)" title="Checkout ${y(v)}">
                                <span style="font-weight: bold; overflow: hidden; text-overflow: ellipsis; white-space: nowrap;">${y(v)}</span>
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
        ${l}
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
                <button class="copy-btn" id="autoRefreshToggle" onclick="sendCommand('toggleAutoRefresh', null, this)" title="${a?"Auto-refresh is ON \u2014 click to disable":"Auto-refresh is OFF \u2014 click to enable"}" style="font-size: 11px; padding: 2px 6px; border-radius: 3px; border: 1px solid var(--vscode-panel-border); ${a?"opacity: 0.9; background-color: var(--vscode-button-secondaryBackground);":"opacity: 0.5;"}">
                    ${a?"\u26A1 Auto":"\u23F8\uFE0F Auto"}
                </button>
            </div>
        </div>

        ${x}

        ${n.length>0?`
            <div style="display: flex; gap: 4px; margin-bottom: 16px; flex-wrap: wrap; justify-content: center;">
                ${n.map(v=>{let P=v.split("/").pop()?.toUpperCase()||v.toUpperCase();return`
                    <button class="btn" style="flex: 1; min-width: 25%; justify-content: center; padding: 6px 4px; font-size: 10px; font-weight: bold; background-color: var(--vscode-button-secondaryBackground); color: var(--vscode-button-secondaryForeground); border-radius: 4px;" onclick="sendCheckoutCommand('${y(v)}', this)" title="Checkout ${y(v)}">
                        ${y(P)}
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

        ${u}
        
        ${J()}
    </body>
    </html>`}var Je=class{constructor(e){this._extensionUri=e}_extensionUri;webviewView;currentBranchCache="";currentBranchIsMergedCache=!1;relatedBranchesCache=[];commitsCache=[];baseBranchesCache=[];recentTicketsCache=[];ticketTitleCache="";ticketStatusCache="";currentPage="main";blameDataCache=null;jiraDataCache=null;dashboardDataCache=null;dashboardShowBranches=!1;autoRefreshEnabled=!0;conflictState=null;resolveWebviewView(e,o,s){this.webviewView=e,e.webview.options={enableScripts:!0,localResourceRoots:[this._extensionUri]},this.updateView(),e.webview.onDidReceiveMessage(r=>{switch(r.command){case"createBranches":$.commands.executeCommand("ricwiz.createBranches");break;case"createBranchForTicket":$.commands.executeCommand("ricwiz.createBranches",r.args);break;case"prepareDeploy":$.commands.executeCommand("ricwiz.prepareDeploy");break;case"openMRs":$.commands.executeCommand("ricwiz.createMergeRequests");break;case"openMRsVSCode":$.commands.executeCommand("ricwiz.createMergeRequestsVSCode");break;case"openExternal":r.args&&$.env.openExternal($.Uri.parse(r.args));break;case"openJira":$.commands.executeCommand("ricwiz.openJiraTicket");break;case"showJiraDetails":$.commands.executeCommand("ricwiz.showJiraDetails");break;case"showPipelineLogs":$.commands.executeCommand("ricwiz.showPipelineLogs",r.args.projectPath,r.args.pipelineId);break;case"changeJiraStatus":$.commands.executeCommand("ricwiz.changeJiraStatus");break;case"addJiraComment":$.commands.executeCommand("ricwiz.addJiraComment");break;case"addJiraLabel":$.commands.executeCommand("ricwiz.addJiraLabel");break;case"setPage":this.setPage(r.args);break;case"openDashboard":$.commands.executeCommand("ricwiz.openJiraDashboard");break;case"openJiraDetailsForId":$.commands.executeCommand("ricwiz.openJiraDetailsForId",r.args);break;case"refreshDashboard":$.commands.executeCommand("ricwiz.openJiraDashboard");break;case"switchDashboardQuery":$.commands.executeCommand("ricwiz.openJiraDashboard",parseInt(r.args,10));break;case"toggleDashboardBranches":$.commands.executeCommand("ricwiz.toggleDashboardBranches",r.args);break;case"openJiraVSCode":$.commands.executeCommand("ricwiz.openJiraTicketVSCode");break;case"openSettings":$.commands.executeCommand("ricwiz.openSettings");break;case"checkout":r.branch&&$.commands.executeCommand("ricwiz.checkoutBranch",r.branch);break;case"copyBranch":$.commands.executeCommand("ricwiz.copyBranchName");break;case"generatePackageXml":$.commands.executeCommand("ricwiz.generatePackageXml");break;case"openDevTools":this.setPage("devtools");break;case"openMain":this.setPage("main");break;case"generateDestructiveChanges":$.commands.executeCommand("ricwiz.generateDestructiveChanges");break;case"deployPackage":$.commands.executeCommand("ricwiz.deployPackage");break;case"runSmartTests":$.commands.executeCommand("ricwiz.runSmartTests");break;case"importData":$.commands.executeCommand("ricwiz.importData");break;case"listTicketFiles":$.commands.executeCommand("ricwiz.listTicketFiles");break;case"resetTracking":$.commands.executeCommand("ricwiz.resetTracking");break;case"extractComponent":$.commands.executeCommand("ricwiz.extractComponent");break;case"deployMultiOrg":$.commands.executeCommand("ricwiz.deployMultiOrg");break;case"captureAdminChanges":$.commands.executeCommand("ricwiz.captureAdminChanges");break;case"whoToBlame":$.commands.executeCommand("ricwiz.whoToBlame");break;case"syncAll":$.commands.executeCommand("ricwiz.syncAll");break;case"updateBases":$.commands.executeCommand("ricwiz.updateBases");break;case"deleteUnused":$.commands.executeCommand("ricwiz.deleteUnusedBranches");break;case"conflict_commitAndContinue":$.commands.executeCommand("ricwiz.conflictAction","commitAndContinue");break;case"conflict_resolveDeletions":$.commands.executeCommand("ricwiz.conflictAction","resolveDeletions");break;case"conflict_abortDeploy":$.commands.executeCommand("ricwiz.conflictAction","abortDeploy");break;case"openFile":if(r.file){let m=$.workspace.workspaceFolders;if(m){let n=$.Uri.joinPath(m[0].uri,r.file);$.commands.executeCommand("vscode.open",n)}}break;case"searchTicket":$.commands.executeCommand("ricwiz.searchTicket");break;case"manualRefresh":$.commands.executeCommand("ricwiz.manualRefresh");break;case"toggleAutoRefresh":$.commands.executeCommand("ricwiz.toggleAutoRefresh");break;case"openHistory":$.commands.executeCommand("ricwiz.openHistory");break}})}setConflictState(e){this.conflictState=e,this.updateView()}updateBranch(e,o,s=[],r=[],m=[],n=[],c="",d=""){this.currentBranchCache=e,this.currentBranchIsMergedCache=o,this.relatedBranchesCache=s,this.commitsCache=r,this.baseBranchesCache=m,this.recentTicketsCache=n,this.ticketTitleCache=c,this.ticketStatusCache=d,this.webviewView&&this.updateView()}setDashboardShowBranches(e){this.dashboardShowBranches=e}getDashboardShowBranches(){return this.dashboardShowBranches}setBlameData(e){this.blameDataCache=e}setJiraData(e){this.jiraDataCache=e}setDashboardData(e){this.dashboardDataCache=e}setAutoRefresh(e){this.autoRefreshEnabled=e,this.updateView()}isAutoRefreshEnabled(){return this.autoRefreshEnabled}setPage(e){this.currentPage=e,this.updateView()}updateView(){if(!this.webviewView)return;let e=this.webviewView.webview.asWebviewUri($.Uri.joinPath(this._extensionUri,"resources","logo.png"));if(this.conflictState){this.webviewView.webview.html=dt(e,this.conflictState);return}switch(this.currentPage){case"blame":this.webviewView.webview.html=lt(this.blameDataCache);break;case"jira":this.webviewView.webview.html=mt(this.jiraDataCache);break;case"dashboard":this.webviewView.webview.html=pt({data:this.dashboardDataCache,showBranches:this.dashboardShowBranches});break;case"devtools":this.webviewView.webview.html=ut();break;default:this.webviewView.webview.html=gt({logoUri:e,currentBranch:this.currentBranchCache,currentBranchIsMerged:this.currentBranchIsMergedCache,relatedBranches:this.relatedBranchesCache,commits:this.commitsCache,baseBranches:this.baseBranchesCache,recentTickets:this.recentTicketsCache,ticketTitle:this.ticketTitleCache,ticketStatus:this.ticketStatusCache,autoRefreshEnabled:this.autoRefreshEnabled});break}}};var ae;function ft(t){ae=t.secrets}async function ht(t){if(!ae)throw new Error("SecretStorage is not initialized.");await ae.store("ricwiz.jiraApiToken",t)}async function wt(){if(!ae)throw new Error("SecretStorage is not initialized.");return await ae.get("ricwiz.jiraApiToken")}async function vt(t){if(!ae)throw new Error("SecretStorage is not initialized.");await ae.store("ricwiz.gitlabApiToken",t)}async function Le(){if(!ae)throw new Error("SecretStorage is not initialized.");return await ae.get("ricwiz.gitlabApiToken")}var b=k(require("vscode"));var j=k(require("vscode")),qe=k(require("path")),he=k(require("fs"));var Se=k(require("vscode")),bt=k(require("child_process")),yt=k(require("util")),Eo=yt.promisify(bt.exec),R=Se.window.createOutputChannel("Ricwiz"),g=async(t,e)=>{R.appendLine(`[EXEC] ${t}`);let o=await Eo(t,{maxBuffer:50*1024*1024,...e});return{stdout:o.stdout.toString(),stderr:o.stderr.toString()}};function C(){let t=Se.workspace.workspaceFolders;if(t)return t[0].uri.fsPath}async function L(t){try{let{stdout:e}=await g("git branch --show-current",{cwd:t});return e.trim()}catch{return""}}function ce(t,e){if(!t.includes(e)){let o=t.match(/([A-Z]+-)\d+/i);if(o)return o[1].toUpperCase()}return e}function de(t,e,o=!1){let s=t.match(new RegExp(`(${e}\\d+)`,"i"));return s?s[1].toUpperCase():t.includes(e)&&!t.includes("-to-")?t.substring(t.indexOf(e)):o&&t.includes("-to-")?t.substring(t.indexOf(e)).split("-to-")[0]:""}function Ze(t,e){let o=t.trim();return/^\d/.test(o)?`${e}${o}`.toUpperCase():o.toUpperCase()}async function V(t,e){let o=Se.workspace.getConfiguration("ricwiz"),s=e?.prefix??o.get("ticketPrefix","SFPSCA-"),r=await L(t),m=ce(r,s),n=e?.suggestedValue??de(r,m,e?.handleToSuffix),c=await Se.window.showInputBox({prompt:e?.prompt||"Enter the full ticket ID (e.g., SCPSCA-1234) or just the number",placeHolder:e?.placeHolder||"Ticket ID or number",value:n});return c?{ticketId:Ze(c,m),currentBranch:r,prefix:m}:void 0}async function ye(t,e){try{return await g(`git show-ref --verify --quiet refs/heads/${e}`,{cwd:t}),!0}catch{}return await To(t,e)}async function To(t,e){try{let{stdout:o}=await g(`git branch -r --list "*/${e}"`,{cwd:t});return o.trim().length>0}catch{return!1}}var xe=k(require("vscode")),xt=k(require("path")),Ge=k(require("fs"));var z=class t{style;upstreamRemote;originRemote;ticketSourceBranch;ticketPrefix;branchPrefix;environments;activeProfile;profileName;constructor(e){this.activeProfile=e,this.profileName=e?.name;let o=xe.workspace.getConfiguration("ricwiz");this.style=e?.workflowStyle||o.get("workflowStyle","standard"),this.style==="multi-remote"?(this.upstreamRemote=e?.upstreamRemote||o.get("upstreamRemote","salesforce-master"),this.originRemote=e?.originRemote||o.get("originRemote","origin")):(this.upstreamRemote="origin",this.originRemote="origin"),this.ticketSourceBranch=e?.ticketSourceBranch||o.get("ticketSourceBranch","main"),this.ticketPrefix=e?.ticketPrefix||o.get("ticketPrefix","SFPSCA-"),this.branchPrefix=e?.branchPrefix??o.get("branchPrefix","");let s=[{name:"Qual",sourceBranch:"quality"},{name:"Val",sourceBranch:"validation"},{name:"Prod",sourceBranch:"main"}];this.environments=e?.environments||o.get("environments",s)}getConfig(e,o){return this.activeProfile&&this.activeProfile[e]!==void 0?this.activeProfile[e]:xe.workspace.getConfiguration("ricwiz").get(e,o)}static async initialize(e,o){let r=xe.workspace.getConfiguration("ricwiz").get("profiles",[]),m=xt.join(e,"ricwiz.json");if(Ge.existsSync(m))try{let n=Ge.readFileSync(m,"utf-8"),c=JSON.parse(n);c&&Array.isArray(c.profiles)&&(r=[...r,...c.profiles])}catch(n){xe.window.showErrorMessage(`Ricwiz: Error parsing ricwiz.json: ${n.message}`)}if(r.length>0){if(!o?.forcePrompt)try{let{stdout:i}=await g("git branch --show-current",{cwd:e}),a=i.trim(),l=a;a.includes("-to-")&&(l=a.split("-to-")[0]);let{stdout:u}=await g(`git config branch.${l}.ricwiz-profile`,{cwd:e}),p=u.trim();if(p){let f=r.find(h=>h.name===p);if(f)return new t(f)}}catch{}if(o?.skipPrompt)return new t;let n=r.map(i=>i.name),c=await xe.window.showQuickPick(n,{placeHolder:"Ricwiz: Select Workflow Profile",ignoreFocusOut:!0});if(!c)return;let d=r.find(i=>i.name===c);return new t(d)}return new t}buildUpstreamPath(e){return e.includes("/")?e:`${this.upstreamRemote}/${e}`}getFetchRemote(e){return e.includes("/")?e.split("/")[0]:this.upstreamRemote}getFetchBranch(e){return e.includes("/")?e.substring(e.indexOf("/")+1):e}};function Ve(t){let e=t.replace(/\\/g,"/");if(e.includes("/classes/")){let o=e.match(/\/classes\/([^/.]+)\.cls/);if(o)return{type:"ApexClass",name:o[1]}}if(e.includes("/triggers/")){let o=e.match(/\/triggers\/([^/.]+)\.trigger/);if(o)return{type:"ApexTrigger",name:o[1]}}if(e.includes("/lwc/")){let o=e.match(/\/lwc\/([^/]+)\//);if(o)return{type:"LightningComponentBundle",name:o[1]}}if(e.includes("/aura/")){let o=e.match(/\/aura\/([^/]+)\//);if(o)return{type:"AuraDefinitionBundle",name:o[1]}}if(e.includes("/objects/")&&e.includes("/fields/")){let o=e.match(/\/objects\/([^/]+)\//),s=e.match(/\/fields\/([^/.]+)\.field/);if(o&&s)return{type:"CustomField",name:`${o[1]}.${s[1]}`}}if(e.includes("/objects/")){let o=e.match(/\/objects\/([^/.]+)\.object/);if(o)return{type:"CustomObject",name:o[1]}}if(e.includes("/layouts/")){let o=e.match(/\/layouts\/([^/.]+)\.layout/);if(o)return{type:"Layout",name:o[1]}}if(e.includes("/flows/")){let o=e.match(/\/flows\/([^/.]+)\.flow/);if(o)return{type:"Flow",name:o[1]}}if(e.includes("/permissionsets/")){let o=e.match(/\/permissionsets\/([^/.]+)\.permissionset/);if(o)return{type:"PermissionSet",name:o[1]}}if(e.includes("/permissionsetgroups/")){let o=e.match(/\/permissionsetgroups\/([^/.]+)\.permissionsetgroup/);if(o)return{type:"PermissionSetGroup",name:o[1]}}if(e.includes("/profiles/")){let o=e.match(/\/profiles\/([^/.]+)\.profile/);if(o)return{type:"Profile",name:o[1]}}if(e.includes("/customMetadata/")){let o=e.match(/\/customMetadata\/([^/.]+)\.md/);if(o)return{type:"CustomMetadata",name:o[1]}}if(e.includes("/flexipages/")){let o=e.match(/\/flexipages\/([^/.]+)\.flexipage/);if(o)return{type:"FlexiPage",name:o[1]}}return null}async function kt(){let t=C();if(!t){j.window.showErrorMessage("Ricwiz: Open a workspace that is a Git repository.");return}let e=await z.initialize(t,{skipPrompt:!0}),o=e?e.ticketSourceBranch:j.workspace.getConfiguration("ricwiz").get("ticketSourceBranch","main"),s=e?e.originRemote:"origin";await j.window.withProgress({location:j.ProgressLocation.Notification,title:`Ricwiz: Finding deleted files compared to ${s}/${o}...`,cancellable:!1},async()=>{try{let{stdout:r}=await g(`git diff --name-only --diff-filter=D ${s}/${o}...HEAD`,{cwd:t}),m=r.split(`
`).map(p=>p.trim()).filter(p=>p.length>0);if(m.length===0){j.window.showInformationMessage(`Ricwiz: No deleted files found compared to ${s}/${o}.`);return}let n={},c=(p,f)=>{n[p]||(n[p]=[]),n[p].includes(f)||n[p].push(f)};for(let p of m){let f=Ve(p);f&&c(f.type,f.name)}if(Object.keys(n).length===0){j.window.showInformationMessage("Ricwiz: Found deleted files in Git, but none mapped to recognizable Salesforce metadata.");return}let d=`<?xml version="1.0" encoding="UTF-8"?>
<Package xmlns="http://soap.sforce.com/2006/04/metadata">
`;for(let p of Object.keys(n).sort()){d+=`    <types>
`;for(let f of n[p].sort())d+=`        <members>${f}</members>
`;d+=`        <name>${p}</name>
    </types>
`}d+=`    <version>58.0</version>
</Package>`;let i=qe.join(t,"destructiveChanges");he.existsSync(i)||he.mkdirSync(i);let a=qe.join(i,"destructiveChanges.xml"),l=qe.join(i,"package.xml");he.writeFileSync(a,d,"utf8"),he.existsSync(l)||he.writeFileSync(l,`<?xml version="1.0" encoding="UTF-8"?>
<Package xmlns="http://soap.sforce.com/2006/04/metadata">
    <version>58.0</version>
</Package>`,"utf8");let u=await j.workspace.openTextDocument(a);await j.window.showTextDocument(u),j.window.showInformationMessage("Ricwiz: destructiveChanges.xml generated successfully!")}catch(r){j.window.showErrorMessage(`Ricwiz: Error generating destructive changes: ${r.message}`)}})}var oe=k(require("vscode"));async function Ct(){let t=C();if(!t)return;let e=await z.initialize(t,{skipPrompt:!0}),o=e?e.ticketSourceBranch:oe.workspace.getConfiguration("ricwiz").get("ticketSourceBranch","main"),s=e?e.originRemote:"origin";await oe.window.withProgress({location:oe.ProgressLocation.Notification,title:"Ricwiz: Finding Apex Tests to run...",cancellable:!1},async()=>{try{let{stdout:r}=await g(`git diff --name-status ${s}/${o}...HEAD`,{cwd:t}),m=r.split(`
`).map(p=>p.trim()).filter(p=>p.length>0),n=new Set,c=new Set;for(let p of m){let f=p.split(/\s+/);if(f[0].startsWith("D"))continue;let h=f[1];if(h&&h.endsWith(".cls")){let w=h.match(/\/classes\/([^/.]+)\.cls/);if(w){let x=w[1];x.toLowerCase().endsWith("test")?n.add(x):c.add(x)}}}for(let p of c)n.add(`${p}Test`);if(n.size===0){oe.window.showInformationMessage("Ricwiz: No Apex Classes were modified in this branch.");return}let d=Array.from(n).map(p=>({label:`$(beaker) ${p}`,description:"Apex Test Class"})),i=await oe.window.showQuickPick(d,{canPickMany:!0,title:"Select Test Classes to Run",placeHolder:"Select tests..."});if(!i||i.length===0)return;let l=`sf apex run test -n ${i.map(p=>p.label.replace("$(beaker) ","").trim()).join(",")} -r human -w 30`,u=oe.window.createTerminal("Ricwiz: Smart Tests");u.show(),u.sendText(l)}catch(r){oe.window.showErrorMessage(`Ricwiz: Error finding tests: ${r.message}`)}})}var E=k(require("vscode"));var ke=class{static isValidShellArg(e){return e?/^[a-zA-Z0-9\-_/.]+$/.test(e):!1}};async function $t(t){let e=C();if(!e){E.window.showErrorMessage("Open a folder or workspace that is a Git repository.");return}let o=await z.initialize(e,{forcePrompt:!0});if(!o)return;let s=typeof t=="string"?t:void 0,r=await V(e,{prefix:o.ticketPrefix,suggestedValue:s});if(!r){E.window.showErrorMessage("Branch creation cancelled: Ticket not provided.");return}let{ticketId:m}=r,n=o.environments,c="all",d=[{label:"Create Main Branch & Environments",description:"Creates the main ticket branch and all environment branches",value:"all"},{label:"Create Main Branch Only",description:"Creates only the main ticket branch (skips environments)",value:"mainOnly"},{label:"Create Environments Only",description:"Creates only the environment branches (skip main branch)",value:"envs"}];if(n.length>0){let u=await E.window.showQuickPick(d,{placeHolder:"Ricwiz: What do you want to create?",ignoreFocusOut:!0});if(!u)return;c=u.value}let i=o.ticketSourceBranch;if(c==="all"||c==="mainOnly"){let u=[];try{let{stdout:w}=await g('git branch --all --format="%(refname:short)"',{cwd:e});u=w.split(`
`).map(x=>x.trim()).filter(x=>x&&x!=="origin"),u=[...new Set(u)]}catch{}let p=E.window.createQuickPick();p.title="Ricwiz: Ticket Source Branch",p.placeholder="Confirm or change the source branch for this ticket",p.value=o.ticketSourceBranch,p.ignoreFocusOut=!0;let f=()=>{let w=p.value.trim(),x=[];w&&x.push({label:w,description:"Use typed branch"}),x.push(...u.map(v=>({label:v}))),p.items=x};p.onDidChangeValue(f),f();let h=await new Promise(w=>{p.onDidAccept(()=>{let x=p.selectedItems[0];w(x?x.label:p.value),p.hide()}),p.onDidHide(()=>w(void 0)),p.show()});if(!h){E.window.showInformationMessage("Branch creation cancelled.");return}i=h.trim()}let a="";if(o.branchPrefix){let u=await E.window.showInputBox({prompt:"Ricwiz: Branch Prefix (leave empty to not use a prefix)",placeHolder:"e.g. CRC-R19-",value:o.branchPrefix,ignoreFocusOut:!0});if(u===void 0){E.window.showInformationMessage("Branch creation cancelled.");return}a=u.trim()}let l=a?`${a}${m}`:m;if(!ke.isValidShellArg(l)){E.window.showErrorMessage(`Invalid format for ticket ID: ${l}`);return}if(!ke.isValidShellArg(i)){E.window.showErrorMessage(`Invalid format for ticketSourceBranch in settings: ${i}`);return}for(let u of n){if(!ke.isValidShellArg(u.name)){E.window.showErrorMessage(`Invalid format for environment name in settings: ${u.name}`);return}if(!ke.isValidShellArg(u.sourceBranch)){E.window.showErrorMessage(`Invalid format for environment sourceBranch in settings: ${u.sourceBranch}`);return}}try{await g("git status",{cwd:e})}catch{E.window.showErrorMessage("The opened folder does not appear to be a valid Git repository.");return}try{await E.window.withProgress({location:E.ProgressLocation.Notification,title:"Ricwiz: Creating Branches",cancellable:!1},async u=>{let p=[];u.report({message:"Checking remote status (git fetch)...",increment:10});try{await g("git fetch",{cwd:e})}catch{}try{if(c==="all"||c==="mainOnly"){if(u.report({message:`Creating main branch ${l}...`,increment:10}),await ye(e,l))E.window.showInformationMessage(`Ricwiz: The branch ${l} already exists. Skipping creation...`),await g(`git checkout ${l}`,{cwd:e});else try{let f=o.getFetchRemote(i),h=o.getFetchBranch(i),w=o.buildUpstreamPath(i);await g(`git fetch ${f} ${h}`,{cwd:e}),await g(`git checkout -b ${l} ${w}`,{cwd:e}),p.push(l)}catch{try{await g(`git checkout -b ${l} ${i}`,{cwd:e}),p.push(l)}catch{throw new Error(`Could not create main branch '${l}' from '${i}'. Does the source branch exist?`)}}try{await g(`git config branch.${l}.ricwiz-source "${i}"`,{cwd:e}),o.profileName&&await g(`git config branch.${l}.ricwiz-profile "${o.profileName}"`,{cwd:e})}catch{}}if(c==="all"||c==="envs"){let f=50/(n.length||1);for(let h of n){let w=a?`${a}${m}-to-${h.name}`:`${m}-to-${h.name}`,x=h.sourceBranch;if(u.report({message:`Processing environment branch ${w}...`,increment:f}),!await ye(e,w))try{let v=o.buildUpstreamPath(x);await g(`git checkout -b ${w} ${v}`,{cwd:e}),p.push(w)}catch{try{await g(`git checkout -b ${w} ${x}`,{cwd:e}),p.push(w)}catch{throw new Error(`Could not create environment branch '${w}' from '${x}'. Does the source branch exist?`)}}}}u.report({message:`Publishing branches to ${o.originRemote}...`,increment:10});for(let f of p)try{await g(`git push -u ${o.originRemote} ${f}`,{cwd:e})}catch{E.window.showWarningMessage(`Ricwiz: Branch ${f} was created locally but could not be pushed to ${o.originRemote}.`)}if(c==="all"||c==="mainOnly"){u.report({message:`Switching to ${l}...`,increment:10});try{await g(`git checkout ${l}`,{cwd:e})}catch{}}u.report({increment:100}),E.window.showInformationMessage("Ricwiz: All set! You can start working on your branches! \u{1F680}")}catch(f){if(E.window.showErrorMessage(`Ricwiz Branch Creation Failed: ${f.message}`),p.length>0){try{await g(`git checkout ${i}`,{cwd:e})}catch{}for(let h of p)try{await g(`git branch -D ${h}`,{cwd:e})}catch{}E.window.showWarningMessage(`Ricwiz: Rolled back (deleted) ${p.length} branch(es) locally due to failure.`)}}})}catch(u){E.window.showErrorMessage(`Ricwiz general error: ${u.message}`)}}var I=k(require("vscode"));var ie=k(require("vscode")),Rt=k(require("fs")),zt=k(require("path"));async function Ce(t,e,o,s,r){s&&s.report({message:"CONFLICT! Resolve & click 'Commit & Continue' in Ricwiz panel."});let m=!1,n=!1;r&&r.onCancellationRequested(()=>{n=!0});let c=async()=>{try{let{stdout:l}=await g("git status --porcelain",{cwd:t});return l.split(`
`).filter(u=>{let p=u.substring(0,2);return["UD","DU","DD","AU","UA"].includes(p)}).map(u=>u.substring(3).trim())}catch{return[]}},d=async()=>{try{let l=p=>p==="UU"?"Both Modified":p==="UD"?"Deleted by them":p==="DU"?"Deleted by us":p==="DD"?"Both Deleted":p==="AA"?"Both Added":p==="AU"?"Added by us":p==="UA"?"Added by them":"Conflicted",{stdout:u}=await g("git status --porcelain",{cwd:t});return u.split(`
`).map(p=>p.trimEnd()).filter(p=>p.length>2).filter(p=>{let f=p.substring(0,2);return["UU","AA","UD","DU","AU","UA","DD"].includes(f)}).map(p=>{let f=p.substring(0,2);return{file:p.substring(3).trim(),state:l(f)}})}catch{return[]}},i=async()=>{if(m)return;let l=await c(),u=await d();re&&re.setConflictState({isConflict:!0,sourceStr:e,targetStr:o,deletionsCount:l.length,files:u})},a=ie.commands.registerCommand("ricwiz.conflictAction",async l=>{if(l==="abortDeploy")n=!0;else if(l==="resolveDeletions"){try{let p=(await c()).map(h=>({label:h})),f=await ie.window.showQuickPick(p,{canPickMany:!0,placeHolder:"Select conflicted files to DELETE",title:"Ricwiz: Delete Conflicted Files"});if(f&&f.length>0){for(let h of f)try{await g(`git rm --force "${h.label}"`,{cwd:t})}catch{}ie.window.showInformationMessage(`Ricwiz: Deleted ${f.length} conflicted file(s).`)}}catch(u){ie.window.showErrorMessage(`Ricwiz: Error. (${u.message})`)}i()}else if(l==="commitAndContinue")try{let p=(await c()).filter(h=>Rt.existsSync(zt.join(t,h)));if(p.length>0&&await ie.window.showWarningMessage(`Wait! There are ${p.length} file(s) with deletion conflicts that are still on your disk.

If you commit now, you will KEEP them in the project.

Are you sure you want to KEEP them?`,{modal:!0},"Yes, KEEP them","No, let me DELETE them")!=="Yes, KEEP them"){i();return}let f=!1;try{let{stdout:h}=await g('git grep -E "^<<<<<<< "',{cwd:t});h.trim().length>0&&(f=!0)}catch{}if(f){ie.window.showErrorMessage("Ricwiz: You still have unresolved conflict markers (<<<<<<<) in your files. Please resolve them first!"),i();return}await g("git add .",{cwd:t}),await g("git commit --no-edit",{cwd:t})}catch(u){ie.window.showErrorMessage(`Ricwiz: Could not commit automatically. (${u.message})`),i()}});for(i();;){if(n){m=!0,a.dispose(),re?.setConflictState(null);try{await g("git merge --abort",{cwd:t})}catch{}return!1}try{let{stdout:l}=await g("git status --porcelain",{cwd:t});if(l.trim().length===0)return m=!0,a.dispose(),re?.setConflictState(null),ie.window.showInformationMessage("Ricwiz: Changes committed!"),!0}catch{}await new Promise(l=>setTimeout(l,2e3))}}var He=k(require("https")),Pt=k(require("vscode"));async function tt(){let t=await Le();return!!(t&&t.trim())}async function Mo(t,e){let o=Pt.workspace.getConfiguration("ricwiz"),s=(await Le())?.trim();if(!s)throw new Error("No GitLab token");let r=e?e.getConfig("gitlabUrlOverride",""):o.get("gitlabUrlOverride",""),m=[];if(r&&r.trim()!=="")m.push(r.trim());else try{let{stdout:c}=await g("git remote",{cwd:t}),d=c.split(`
`).map(a=>a.trim()).filter(a=>a),i=[];e&&e.upstreamRemote&&d.includes(e.upstreamRemote)&&i.push(e.upstreamRemote),e&&e.originRemote&&e.originRemote!==e.upstreamRemote&&d.includes(e.originRemote)&&i.push(e.originRemote),d.includes("upstream")&&!i.includes("upstream")&&i.push("upstream"),d.includes("origin")&&!i.includes("origin")&&i.push("origin"),i.length===0&&d.length>0&&i.push(...d);for(let a of i)try{let{stdout:l}=await g(`git remote get-url ${a}`,{cwd:t}),u=l.trim();u.endsWith(".git")&&(u=u.slice(0,-4)),u.startsWith("git@")&&(u=u.replace("git@","").replace(":","/"),u=`https://${u}`),m.push(u)}catch(l){R.appendLine(`[GitLab API] Error getting remote URL for ${a}: ${l.message}`)}}catch(c){R.appendLine(`[GitLab API] Error getting remotes: ${c.message}`)}if(m.length===0)throw R.appendLine("[GitLab API] No candidate URLs found in getGitlabTargets!"),new Error("Could not get any remote origin URL.");return m.map(c=>{let d=new URL(c),i=`${d.protocol}//${d.host}`,a=d.pathname;a.startsWith("/")&&(a=a.substring(1)),a.endsWith("/")&&(a=a.slice(0,-1)),a.endsWith(".git")&&(a=a.slice(0,-4));let l=encodeURIComponent(a);return{baseUrl:i,token:s,projectPath:l}})}var Lo=new He.Agent({keepAlive:!0,maxSockets:10});async function Xe(t,e,o,s){let r=new URL(`${t}${s}`);return R.appendLine(`[GitLab API] ${o} ${r.toString()}`),new Promise((m,n)=>{let c=He.request(r,{method:o,timeout:5e3,agent:Lo,headers:{"PRIVATE-TOKEN":e,Accept:"application/json"}},d=>{let i="";d.on("data",a=>i+=a),d.on("end",()=>{if(R.appendLine(`[GitLab API] Response Code: ${d.statusCode}`),d.statusCode&&d.statusCode>=400)return R.appendLine(`[GitLab API] Error Data: ${i}`),n(new Error(`GitLab API error: ${d.statusCode}`));if(!i)return m({});try{let a=JSON.parse(i);Array.isArray(a)?R.appendLine(`[GitLab API] Returned array with ${a.length} items`):a&&typeof a=="object"&&R.appendLine(`[GitLab API] Returned object with id ${a.id||a.iid||"unknown"}`),m(a)}catch(a){R.appendLine(`[GitLab API] Parse Error: ${a.message}`),n(a)}})});c.on("timeout",()=>{c.destroy(),n(new Error("GitLab request timed out"))}),c.on("error",d=>{R.appendLine(`[GitLab API] Request Failed: ${d.message}`),n(d)}),c.end()})}var et=new Map,Ao=30*1e3;async function ot(t,e,o,s){R.appendLine(`[GitLab API] fetchMergeRequestStatus called for source: ${e}, target: ${o||"any"}`);let r=`${t}:${e}:${o||"any"}`,m=et.get(r);if(m&&Date.now()-m.timestamp<Ao)return m.data;try{let n=await Mo(t,s),c=null,d=-1;for(let i of n)try{let a=`/api/v4/projects/${i.projectPath}/merge_requests?source_branch=${encodeURIComponent(e)}&order_by=updated_at&sort=desc`;o&&(a+=`&target_branch=${encodeURIComponent(o)}`);let l=await Xe(i.baseUrl,i.token,"GET",a);if(l&&l.length>0){let u=l[0];try{let w=await Xe(i.baseUrl,i.token,"GET",`/api/v4/projects/${i.projectPath}/merge_requests/${u.iid}`);w&&(u=w)}catch{}let p="none";if(u.head_pipeline&&u.head_pipeline.status){let w=u.head_pipeline.status;w==="success"||w==="failed"||w==="canceled"||w==="skipped"?p=w:p="running"}let f={isMerged:u.state==="merged",isOpen:u.state==="opened",pipelineStatus:p,webUrl:u.web_url,projectPath:i.projectPath,pipelineId:u.head_pipeline?u.head_pipeline.id:void 0},h=0;f.isOpen?h=2:f.isMerged&&(h=1),h>d&&(c=f,d=h)}}catch(a){R.appendLine(`[GitLab API] Error inside target loop: ${a.message}`)}if(c)return et.set(r,{data:c,timestamp:Date.now()}),c;for(let i of n)try{let a=`/api/v4/projects/${i.projectPath}/pipelines?ref=${encodeURIComponent(e)}&order_by=updated_at&sort=desc`,l=await Xe(i.baseUrl,i.token,"GET",a);if(l&&l.length>0){let u=l[0],p="none";if(u.status){let h=u.status;h==="success"||h==="failed"||h==="canceled"||h==="skipped"?p=h:p="running"}let f={isMerged:!1,isOpen:!1,pipelineStatus:p,webUrl:u.web_url,projectPath:i.projectPath,pipelineId:u.id};return et.set(r,{data:f,timestamp:Date.now()}),f}}catch{}return null}catch(n){return R.appendLine(`[GitLab API] Failed to fetch MR status: ${n.message}`),null}}function Bt(t,e){return e.find(o=>t.endsWith(`-to-${o.name}`))}async function $e(t,e,o,s,r){let m=await tt(),n=e.map(async c=>{let d=Bt(c,s);if(m){let i=d?d.sourceBranch:void 0,a=await ot(t,c,i,r);if(a)return{name:c,isMerged:a.isMerged,pipelineStatus:a.pipelineStatus,mrUrl:a.webUrl,projectPath:a.projectPath,pipelineId:a.pipelineId}}else R.appendLine(`[GitLab API] Skipping MR check for ${c} because hasGitlabToken() is false`);return{name:c,isMerged:!1,pipelineStatus:"none"}});return await Promise.all(n)}async function St(t,e,o,s){let r=Bt(e,o);if(!r)return!1;if(await tt()){let m=await ot(t,e,r.sourceBranch,s);if(m)return m.isMerged}else R.appendLine(`[GitLab API] Skipping MR check for current branch ${e} because hasGitlabToken() is false`);return!1}async function Dt(t,e=10){try{let{stdout:o}=await g(`git log --oneline -${e} --format="%h|||%s|||%ar"`,{cwd:t});return o.split(`
`).filter(s=>s.trim()).map(s=>{let r=s.split("|||");return{hash:r[0]||"",message:r.length>=3?r.slice(1,-1).join("|||"):r[1]||"",timeAgo:r.length>=3?r[r.length-1]:""}})}catch{return[]}}async function Et(t,e=3){try{let{stdout:o}=await g('git for-each-ref --sort=-committerdate --format="%(refname:short)" refs/heads/',{cwd:t}),s=o.split(`
`).map(m=>m.trim()).filter(m=>m),r=/^[A-Z]+-\d+$/i;return s.filter(m=>r.test(m)).slice(0,e)}catch{return[]}}async function Re(t,e,o){let{stdout:s}=await g(`git branch --all --list "*${e}*"`,{cwd:t}),r=new Set,m=new RegExp(`${e}(?!\\d)`,"i");return s.split(`
`).forEach(n=>{let c=n.replace("*","").trim();if(c){if(c.startsWith("remotes/")){let d=c.split("/");d.length>2&&(c=d.slice(2).join("/"))}c&&c!==o&&!c.includes("HEAD")&&m.test(c)&&r.add(c)}}),Array.from(r)}async function ne(t,e,o){try{let{stdout:s}=await g(`git branch --all --list "*${e}*"`,{cwd:t}),r=new RegExp(`${e}(?!\\d)`,"i"),m=s.split(`
`).map(c=>c.replace("*","").trim().replace(/^remotes\/[^\/]+\//,"")).filter(c=>c&&!c.includes("HEAD")&&r.test(c)),n=Array.from(new Set(m));if(o){let c=`-to-${o}`,d=n.find(i=>i.endsWith(c));return d||`${e}${c}`}else{let c=n.find(d=>!d.includes("-to-"));return c||e}}catch{return o?`${e}-to-${o}`:e}}async function Tt(){let t=C();if(!t){I.window.showErrorMessage("Ricwiz: Open a folder or workspace that is a Git repository.");return}try{await g("git status",{cwd:t})}catch{I.window.showErrorMessage("Ricwiz: The opened folder does not appear to be a valid Git repository.");return}let e=await z.initialize(t);if(!e)return;let o=e.environments,s=await V(t,{prefix:e.ticketPrefix});if(!s){I.window.showErrorMessage("Operation cancelled: Ticket not provided.");return}let{ticketId:r,currentBranch:m}=s,n=await ne(t,r);if(!await ye(t,n)){I.window.showErrorMessage(`Ricwiz: Main branch '${n}' does not exist! Prepare deploy is only available when a main ticket branch is used.`);return}let c=e.getConfig("defaultReviewers",""),d="";try{let{stdout:i}=await g(`git config branch.${r}.ricwiz-reviewers`,{cwd:t});d=i.trim()}catch{}if(c.trim()){let i=await I.window.showInputBox({prompt:"Ricwiz: Reviewers for this deploy (optional, comma-separated)",placeHolder:"e.g. @joao, 123456",value:d||c,ignoreFocusOut:!0});if(i===void 0)return;try{i.trim()?await g(`git config branch.${r}.ricwiz-reviewers "${i.trim()}"`,{cwd:t}):d&&await g(`git config --unset branch.${r}.ricwiz-reviewers`,{cwd:t})}catch{}}await I.window.withProgress({location:I.ProgressLocation.Notification,title:"Ricwiz: Preparing Deploy",cancellable:!0},async(i,a)=>{let l=0,u=m,p=!1;a.onCancellationRequested(()=>{p=!0}),i.report({message:"Syncing remote information...",increment:10});try{await g("git fetch --all",{cwd:t});let h=10/(o.length||1);for(let w of o)try{if(p)throw new Error("Aborted");i.report({message:`Fetching ${w.sourceBranch}...`,increment:h});let x=e.getFetchRemote(w.sourceBranch),v=e.getFetchBranch(w.sourceBranch);await g(`git fetch ${x} ${v}:${v}`,{cwd:t})}catch{}}catch{}let f=60/(o.length||1);for(let h of o){if(p)break;let w=await ne(t,r,h.name),x=h.sourceBranch;try{i.report({message:`Processing ${w}...`,increment:f/4}),await g(`git checkout ${w}`,{cwd:t});try{await g(`git pull ${e.originRemote} ${w}`,{cwd:t})}catch{}let v=async te=>{try{await g(`git merge ${te}`,{cwd:t})}catch(S){let A=!1;try{let{stdout:U}=await g("git ls-files -u",{cwd:t});U.trim().length>0&&(A=!0)}catch{}let K=((S.stdout||"")+(S.stderr||"")+(S.message||"")).toLowerCase();if(A||K.includes("conflict")||K.includes("conflit")){if(!await Ce(t,te,w,i,a))throw p=!0,new Error("Deploy aborted by user.")}else throw S}};i.report({message:`Merging ${x} into ${w}...`,increment:f/4});let P=e.getFetchRemote(x),T=e.getFetchBranch(x),we=e.buildUpstreamPath(x);if(await g(`git fetch ${P} ${T}`,{cwd:t}),await v(we),i.report({message:`Merging ${n} into ${w}...`,increment:f/4}),await v(n),p)break;i.report({message:`Pushing ${w}...`,increment:f/4}),await g(`git push ${e.originRemote} ${w}`,{cwd:t}),l++}catch(v){v.message.includes("aborted")?I.window.showInformationMessage("Ricwiz: Deploy cancelled."):I.window.showErrorMessage(`Ricwiz: Failed to process branch ${w}. Detail: ${v.message}`);return}}if(!p){i.report({message:"Finishing up...",increment:10});let h=u;try{await g(`git show-ref --verify --quiet refs/heads/${n}`,{cwd:t}),h=n}catch{}try{let w=await L(t);h&&h!==w?(await g(`git checkout ${h}`,{cwd:t}),I.window.showInformationMessage(`Ricwiz: Operation complete. Back on branch ${h}.`)):I.window.showInformationMessage("Ricwiz: Operation complete.")}catch{I.window.showInformationMessage("Ricwiz: Operation complete.")}}})}var le=k(require("vscode"));async function Mt(t=!1){let e=C();if(!e)return;let o=await z.initialize(e);if(!o)return;let s=await V(e,{prompt:"Enter the full ticket ID for the Merge Requests (e.g., SCPSCA-1234) or just the number"});if(!s)return;let{ticketId:r}=s,m=o.getConfig("gitlabUrlOverride",""),n="";if(m&&m.trim()!=="")n=m.trim().replace(/\/+$/,"");else{let i="";try{let a=o.originRemote||"origin",{stdout:l}=await g(`git remote get-url ${a}`,{cwd:e});i=l.trim()}catch{le.window.showErrorMessage("Ricwiz: Could not get the remote origin URL. Please configure the URL manually in the extension settings.");return}n=i,n.endsWith(".git")&&(n=n.slice(0,-4)),n.startsWith("git@")&&(n=n.replace("git@","").replace(":","/"),n=`https://${n}`)}let c=[],d=o.ticketSourceBranch;try{let{stdout:i}=await g(`git config branch.${r}.ricwiz-source`,{cwd:e});i.trim()&&(d=i.trim())}catch{}if(o.environments.length===0){let i=await ne(e,r);c.push({source:i,target:d})}else for(let i of o.environments){let a=await ne(e,r,i.name);c.push({source:a,target:i.sourceBranch})}for(let i of c){let a=`${n}/-/merge_requests/new?merge_request[source_branch]=${encodeURIComponent(i.source)}&merge_request[target_branch]=${encodeURIComponent(i.target)}`;t?le.commands.executeCommand("simpleBrowser.show",a):le.env.openExternal(le.Uri.parse(a))}le.window.showInformationMessage(`Ricwiz: Opening ${t?"VS Code browser":"external browser"} for Merge Requests!`)}async function Lt(){return Mt(!1)}async function At(){return Mt(!0)}var Z=k(require("vscode"));async function Ft(t=!1){let e=C();if(!e)return;let o=Z.workspace.getConfiguration("ricwiz"),s=o.get("jiraUrl","");if(!s||s.trim()===""){Z.window.showErrorMessage("Ricwiz: Jira URL is not configured. Please set it in the extension settings (e.g., https://jira.company.com/browse/).");return}let r=await L(e),m=o.get("ticketPrefix","SFPSCA-"),n=ce(r,m),d=de(r,n,!0);if(d)d=Ze(d,n);else{let a=await V(e,{prompt:"Ricwiz could not detect the ticket from the branch name. Enter Jira ticket ID (e.g. SFPSCA-1234)",handleToSuffix:!0});if(!a)return;d=a.ticketId}let i=s.trim();i.endsWith("/")||(i+="/"),i+=d,t?Z.commands.executeCommand("simpleBrowser.show",i):Z.env.openExternal(Z.Uri.parse(i)),Z.window.showInformationMessage(`Ricwiz: Opening Jira Ticket ${d} in ${t?"VS Code":"browser"}!`)}async function It(){return Ft(!1)}async function Ot(){return Ft(!0)}var q=k(require("vscode"));var Ut=k(require("https")),jt=k(require("vscode"));async function Nt(){let t=jt.workspace.getConfiguration("ricwiz"),e=t.get("jiraUrl",""),o=t.get("jiraEmail","")?.trim(),s=(await wt())?.trim();if(!e||!s)throw new Error('Jira API Token is not securely configured. Please run the "Ricwiz: Set Secure Jira API Token" command.');let r=e;r.includes("/browse")&&(r=r.split("/browse")[0]),r.endsWith("/")&&(r=r.slice(0,-1));let m=o?`Basic ${Buffer.from(`${o}:${s}`).toString("base64")}`:`Bearer ${s}`;return{baseUrl:r,headerAuth:m}}async function De(t,e,o){let{baseUrl:s,headerAuth:r}=await Nt(),m=new URL(`${s}${e}`);return new Promise((n,c)=>{let d=Ut.request(m,{method:t,headers:{Authorization:r,Accept:"application/json",...o?{"Content-Type":"application/json"}:{}}},i=>{let a="";i.on("data",l=>a+=l),i.on("end",()=>{if(i.statusCode===401||i.statusCode===403)return c(new Error(`Authentication failed (HTTP ${i.statusCode}). Please check your Jira settings.`));if(i.statusCode&&i.statusCode>=400){let l="";try{let u=JSON.parse(a);u.errorMessages&&u.errorMessages.length>0&&(l=u.errorMessages.join(", "))}catch{}return i.statusCode===404||i.statusCode===410?c(new Error(`Ticket not found or deleted (HTTP ${i.statusCode}). ${l}`)):c(new Error(`Jira API returned HTTP status ${i.statusCode}. ${l}`))}if(!a)return n({});try{let l=JSON.parse(a);n(l)}catch{c(new Error("Failed to parse Jira response."))}})});d.on("error",i=>c(new Error(`Network error: ${i.message}`))),o&&d.write(JSON.stringify(o)),d.end()})}async function Ee(t){let{baseUrl:e}=await Nt(),o=await De("GET",`/rest/api/2/issue/${t}`);return o&&o.fields?{summary:o.fields.summary||"",description:o.fields.description||"No description provided.",status:o.fields.status?.name||"Unknown",url:`${e}/browse/${t}`}:null}async function Wt(t){let e=await De("GET",`/rest/api/2/issue/${t}/transitions`);return e&&e.transitions?e.transitions.map(o=>({id:o.id,name:o.name})):[]}async function Jt(t,e){await De("POST",`/rest/api/2/issue/${t}/transitions`,{transition:{id:e}})}async function Gt(t,e){await De("POST",`/rest/api/2/issue/${t}/comment`,{body:e})}async function Vt(t,e){await De("PUT",`/rest/api/2/issue/${t}`,{update:{labels:[{add:e}]}})}async function qt(t){let e=await De("POST","/rest/api/3/search/jql",{jql:t,maxResults:50,fields:["summary","status","assignee"]});return e&&e.issues?e.issues.map(o=>({key:o.key,summary:o.fields?.summary||"No Title",status:o.fields?.status?.name||"Unknown",assignee:o.fields?.assignee?.displayName||"Unassigned"})):[]}async function Ht(t){let e=C();if(e)try{let o=await z.initialize(e);if(!o)return;let s=await L(e),r=ce(s,o.ticketPrefix),m=de(s,r,!0);if(m||(m=s.split("-to-")[0]),!m){q.window.showErrorMessage("Ricwiz: You are not currently on a valid ticket branch.");return}await q.window.withProgress({location:q.ProgressLocation.Notification,title:`Fetching details for ${m}...`,cancellable:!1},async()=>{let n=await Ee(m);if(n){let c=[];try{let d=o.environments||q.workspace.getConfiguration("ricwiz").get("environments",[{name:"Qual",sourceBranch:"quality"},{name:"Val",sourceBranch:"validation"},{name:"Prod",sourceBranch:"main"}]),i=await Re(e,m,"");c=await $e(e,i,m,d,o)}catch{}t.setJiraData({ticketId:m,relatedBranches:c,...n}),t.setPage("jira")}else q.window.showErrorMessage("Ricwiz: No data found for this ticket.")})}catch(o){o.message&&o.message.includes("securely configured")?await q.window.showErrorMessage(o.message,"Set Token Now")==="Set Token Now"&&q.commands.executeCommand("ricwiz.setJiraToken"):q.window.showErrorMessage(`Ricwiz Jira Error: ${o.message}`)}}var me=k(require("vscode"));var ze=0;async function _t(t,e){let o=me.workspace.getConfiguration("ricwiz"),s=o.get("jiraDashboards",[]);if(e!==void 0&&(ze=e),!s||s.length===0){t.setDashboardData({queries:[],selectedIndex:0,results:[],error:"No queries defined in settings. Go to Settings > Ricwiz > Jira Dashboards."}),t.setPage("dashboard");return}ze>=s.length&&(ze=0);let r=s[ze];t.setDashboardData({queries:s,selectedIndex:ze,results:[],error:"\u23F3 Loading tickets..."}),t.setPage("dashboard");try{let m=await qt(r.jql),n=C(),c=[],d=t.getDashboardShowBranches();if(n)try{let{stdout:a}=await g("git branch",{cwd:n});c=a.split(`
`).map(l=>l.replace("*","").trim()).filter(l=>l)}catch{}let i=[];if(d&&n)try{let a=await z.initialize(n,{skipPrompt:!0}),l=a?.environments||o.get("environments",[{name:"Qual",sourceBranch:"quality"},{name:"Val",sourceBranch:"validation"},{name:"Prod",sourceBranch:"main"}]);i=await Promise.all(m.map(async u=>{let p=await Re(n,u.key,""),f=await $e(n,p,u.key,l,a);return{...u,detailedBranches:f}}))}catch{i=m}else i=m.map(a=>{let l=c.find(u=>u.includes(a.key));return{...a,branch:l||null}});t.setDashboardData({queries:s,selectedIndex:ze,results:i,error:null}),t.setPage("dashboard")}catch(m){let n=m.message;n&&(n.includes("ENOTFOUND")||n.includes("network"))&&(n="No Internet or Invalid URL"),t.setDashboardData({queries:s,selectedIndex:ze,results:[],error:n}),t.setPage("dashboard")}}async function Qt(t,e){await me.window.withProgress({location:me.ProgressLocation.Notification,title:`Fetching details for ${e}...`,cancellable:!1},async()=>{try{let o=await Ee(e);if(o){let s=[],r=C();if(r)try{let m=await z.initialize(r,{skipPrompt:!0}),n=m?.environments||me.workspace.getConfiguration("ricwiz").get("environments",[{name:"Qual",sourceBranch:"quality"},{name:"Val",sourceBranch:"validation"},{name:"Prod",sourceBranch:"main"}]),c=await Re(r,e,"");s=await $e(r,c,e,n,m)}catch{}t.setJiraData({ticketId:e,relatedBranches:s,...o}),t.setPage("jira")}else me.window.showErrorMessage(`Ricwiz: No data found for ticket ${e}.`)}catch(o){me.window.showErrorMessage(`Ricwiz Jira Error: ${o.message}`)}})}var B=k(require("vscode"));async function it(){let t=C();if(!t)return;let e=await z.initialize(t,{forcePrompt:!1});if(!e)return;let o=await L(t);if(!o)return;let s=ce(o,e.ticketPrefix),r=de(o,s,!0);return r||o.split("-to-")[0]}function rt(t){t.message&&t.message.includes("securely configured")?B.window.showErrorMessage(t.message,"Set Token Now").then(e=>{e==="Set Token Now"&&B.commands.executeCommand("ricwiz.setJiraToken")}):B.window.showErrorMessage(`Ricwiz Jira Error: ${t.message}`)}async function Yt(){try{let t=await it();if(!t){B.window.showErrorMessage("Ricwiz: You are not on a valid ticket branch.");return}let e=await B.window.withProgress({location:B.ProgressLocation.Notification,title:`Fetching available status for ${t}...`,cancellable:!1},()=>Wt(t));if(!e||e.length===0){B.window.showInformationMessage(`Ricwiz: No transitions available for ${t}.`);return}let o=e.map(r=>({label:r.name,id:r.id})),s=await B.window.showQuickPick(o,{placeHolder:`Select new status for ${t}`,ignoreFocusOut:!0});s&&(await B.window.withProgress({location:B.ProgressLocation.Notification,title:`Updating status to ${s.label}...`,cancellable:!1},()=>Jt(t,s.id)),B.window.showInformationMessage(`Ricwiz: Status for ${t} updated to ${s.label}.`))}catch(t){rt(t)}}async function Kt(){try{let t=await it();if(!t){B.window.showErrorMessage("Ricwiz: You are not on a valid ticket branch.");return}let e=await B.window.showInputBox({prompt:`Add comment to ${t}`,placeHolder:"Type your comment here...",ignoreFocusOut:!0});e&&(await B.window.withProgress({location:B.ProgressLocation.Notification,title:`Adding comment to ${t}...`,cancellable:!1},()=>Gt(t,e)),B.window.showInformationMessage(`Ricwiz: Comment added to ${t}.`))}catch(t){rt(t)}}async function Zt(){try{let t=await it();if(!t){B.window.showErrorMessage("Ricwiz: You are not on a valid ticket branch.");return}let e=await B.window.showInputBox({prompt:`Add a label to ${t}`,placeHolder:"e.g. Needs-Review, Bug, High-Priority",ignoreFocusOut:!0});e&&e.trim()&&(await B.window.withProgress({location:B.ProgressLocation.Notification,title:`Adding label to ${t}...`,cancellable:!1},()=>Vt(t,e.trim())),B.window.showInformationMessage(`Ricwiz: Label '${e.trim()}' added to ${t}.`))}catch(t){rt(t)}}async function Xt(){let t=await B.window.showInputBox({prompt:"Enter your Jira API Token (or Personal Access Token). It will be securely stored in your OS keychain.",password:!0,ignoreFocusOut:!0});if(t)try{await ht(t.trim()),B.window.showInformationMessage("Ricwiz: Jira API Token securely stored!")}catch(e){B.window.showErrorMessage(`Ricwiz: Failed to store token: ${e.message}`)}}var N=k(require("vscode")),eo=k(require("https"));async function to(){let t=await N.window.showInputBox({prompt:"Enter your GitLab Personal Access Token",placeHolder:"glpat-xxxxxxxxxxxxxxxxxxxx",ignoreFocusOut:!0,password:!0});if(t&&t.trim()){let e=t.trim();await N.window.withProgress({location:N.ProgressLocation.Notification,title:"Ricwiz: Validating GitLab Token...",cancellable:!1},async()=>{try{let s=N.workspace.getConfiguration("ricwiz").get("gitlabUrlOverride","").trim();if(!s&&N.workspace.workspaceFolders)try{let c=N.workspace.workspaceFolders[0].uri.fsPath,{stdout:d}=await g("git remote get-url origin",{cwd:c}),i=d.trim();i.startsWith("git@")&&(i=`https://${i.replace("git@","").replace(":","/")}`),i.endsWith(".git")&&(i=i.slice(0,-4)),s=i}catch{}s||(s="https://gitlab.com");let r=new URL(s),m=`${r.protocol}//${r.host}`,n=await new Promise((c,d)=>{let i=eo.request(new URL(`${m}/api/v4/user`),{method:"GET",timeout:5e3,headers:{"PRIVATE-TOKEN":e,Accept:"application/json"}},a=>{if(a.statusCode>=400)return d(new Error(`Status ${a.statusCode}`));let l="";a.on("data",u=>l+=u),a.on("end",()=>c(JSON.parse(l||"{}")))});i.on("error",d),i.on("timeout",()=>{i.destroy(),d(new Error("Timeout"))}),i.end()});await vt(e),N.window.showInformationMessage(`Ricwiz: \u2705 GitLab API Token saved and validated successfully for ${n.username||"user"}!`),N.commands.executeCommand("ricwiz.manualRefresh")}catch(o){N.window.showErrorMessage(`Ricwiz: \u274C Invalid token or cannot reach GitLab (${o.message}). Please check the token and try again.`)}})}}var pe=k(require("vscode"));async function oo(){let t=C();if(!t){pe.window.showErrorMessage("Ricwiz: Open a folder or workspace that is a Git repository.");return}let e=await z.initialize(t);if(!e)return;let o=await V(t,{prefix:e.ticketPrefix,prompt:"Enter the full ticket ID to sync all branches for (e.g., SCPSCA-1234) or just the number"});if(!o)return;let{ticketId:s,currentBranch:r}=o;await pe.window.withProgress({location:pe.ProgressLocation.Notification,title:`Ricwiz: Syncing all branches for ${s}...`,cancellable:!1},async m=>{try{m.report({message:"Fetching from remote..."});try{await g("git fetch --all",{cwd:t})}catch{}let{stdout:n}=await g(`git branch --list "*${s}*"`,{cwd:t}),c=new RegExp(`${s}(?!\\d)`,"i"),d=n.split(`
`).map(l=>l.replace("*","").trim()).filter(l=>l.length>0&&c.test(l));if(d.length===0){pe.window.showWarningMessage(`Ricwiz: No local branches found for ${s}.`);return}let i=0,a=0;for(let l of d)if(m.report({message:`Syncing ${l}...`}),l===r)try{await g(`git pull ${e.originRemote} ${l}`,{cwd:t}),i++}catch(u){let p=!1;try{let{stdout:h}=await g("git ls-files -u",{cwd:t});h.trim().length>0&&(p=!0)}catch{}let f=((u.stdout||"")+(u.stderr||"")+(u.message||"")).toLowerCase();(p||f.includes("conflict")||f.includes("conflit"))&&await Ce(t,`${e.originRemote}/${l}`,l,m)?i++:a++}else try{await g(`git fetch ${e.originRemote} ${l}:${l}`,{cwd:t}),i++}catch{try{await g(`git checkout ${l}`,{cwd:t});try{await g(`git pull ${e.originRemote} ${l}`,{cwd:t}),i++}catch(p){let f=!1;try{let{stdout:w}=await g("git ls-files -u",{cwd:t});w.trim().length>0&&(f=!0)}catch{}let h=((p.stdout||"")+(p.stderr||"")+(p.message||"")).toLowerCase();(f||h.includes("conflict")||h.includes("conflit"))&&await Ce(t,`${e.originRemote}/${l}`,l,m)?i++:a++}await g(`git checkout ${r}`,{cwd:t})}catch{try{await g(`git checkout ${r}`,{cwd:t})}catch{}a++}}a>0?pe.window.showWarningMessage(`Ricwiz: Synced ${i}/${d.length} branches. ${a} branch(es) could not be synced (possible conflicts or diverged history).`):pe.window.showInformationMessage(`Ricwiz: \u{1F504} All ${i} branches for ${s} are up to date!`)}catch(n){pe.window.showErrorMessage(`Ricwiz: Sync failed: ${n.message}`)}})}var ue=k(require("vscode"));async function io(){let t=C();if(!t){ue.window.showErrorMessage("Ricwiz: Open a folder or workspace that is a Git repository.");return}try{await g("git status",{cwd:t})}catch{ue.window.showErrorMessage("Ricwiz: The opened folder does not appear to be a valid Git repository.");return}let e=await z.initialize(t);if(!e)return;let o=e.environments,s=await V(t,{prefix:e.ticketPrefix});if(!s)return;let{ticketId:r,currentBranch:m}=s;await ue.window.withProgress({location:ue.ProgressLocation.Notification,title:"Ricwiz: Updating environment branches from their bases",cancellable:!0},async(n,c)=>{let d=0,i=m,a=!1;c.onCancellationRequested(()=>{a=!0}),n.report({message:"Syncing remote information...",increment:10});try{await g("git fetch --all",{cwd:t})}catch{}let l=80/(o.length||1);for(let u of o){if(a)break;let p=await ne(t,r,u.name),f=u.sourceBranch;if(await ye(t,p))try{n.report({message:`Processing ${p}...`,increment:l/2}),await g(`git checkout ${p}`,{cwd:t});try{n.report({message:`Merging ${f} into ${p}...`,increment:l/2});let h=e.getFetchRemote(f),w=e.getFetchBranch(f),x=e.buildUpstreamPath(f);await g(`git fetch ${h} ${w}`,{cwd:t}),await g(`git merge ${x}`,{cwd:t})}catch(h){let w=!1;try{let{stdout:v}=await g("git ls-files -u",{cwd:t});v.trim().length>0&&(w=!0)}catch{}let x=((h.stdout||"")+(h.stderr||"")+(h.message||"")).toLowerCase();if(w||x.includes("conflict")||x.includes("conflit")){let v=e.buildUpstreamPath(f);if(!await Ce(t,v,p,n,c))throw a=!0,new Error("Update aborted by user.")}else throw h}if(a)break;d++}catch(h){h.message.includes("aborted")?ue.window.showInformationMessage("Ricwiz: Update cancelled."):ue.window.showErrorMessage(`Ricwiz: Failed to update branch ${p}. Detail: ${h.message}`);return}}if(!a){n.report({message:"Finishing up...",increment:10});try{let u=await L(t);i&&i!==u&&await g(`git checkout ${i}`,{cwd:t})}catch{}ue.window.showInformationMessage(`Ricwiz: Successfully updated ${d} environment branches from their bases!`)}})}var F=k(require("vscode"));async function ro(){let t=C();if(!t){F.window.showErrorMessage("Ricwiz: Open a folder or workspace that is a Git repository.");return}let e=await L(t),o=F.workspace.getConfiguration("ricwiz");await F.window.withProgress({location:F.ProgressLocation.Notification,title:"Ricwiz: Scanning for unused local branches...",cancellable:!1},async()=>{try{await g("git fetch --prune",{cwd:t})}catch{}let s=[];try{let{stdout:l}=await g('git branch --format="%(refname:short)"',{cwd:t});s=l.split(`
`).map(u=>u.trim()).filter(u=>u.length>0)}catch{}if(s.length===0){F.window.showInformationMessage("Ricwiz: No local branches found.");return}let r=[];try{let{stdout:l}=await g('git branch -r --format="%(refname:short)"',{cwd:t});r=l.split(`
`).map(u=>u.trim().replace(/^[^/]+\//,"")).filter(u=>u.length>0&&!u.includes("HEAD"))}catch{}let m=[];try{let{stdout:l}=await g('git for-each-ref --format="%(refname:short)|||%(upstream:track)" refs/heads/',{cwd:t});m=l.split(`
`).filter(u=>u.includes("[gone]")).map(u=>u.split("|||")[0].trim())}catch{}let n=s.filter(l=>!r.includes(l));if(n.length===0){F.window.showInformationMessage("Ricwiz: Your local repository is totally clean! All local branches exist on the remote.");return}let c=n.map(l=>{let u=m.includes(l),p=l===e,f="Not found on remote";return u&&(f="Deleted on remote [gone]"),p&&(f+=" (Current branch - will checkout main first)"),{label:l,description:f,picked:u&&!p}}),d=await F.window.showQuickPick(c,{canPickMany:!0,placeHolder:"Select local branches to delete",title:"Ricwiz: Delete Unused Branches"});if(!d||d.length===0){F.window.showInformationMessage("Ricwiz: No branches selected for deletion.");return}if(await F.window.showWarningMessage(`Ricwiz: Delete ${d.length} local branch(es)?
This cannot be undone!`,{modal:!0},"Yes, delete them")!=="Yes, delete them"){F.window.showInformationMessage("Ricwiz: Deletion cancelled.");return}let a=0;for(let l of d){let u=l.label;if(u===e){let p=o.get("ticketSourceBranch","main");try{await g(`git checkout ${p}`,{cwd:t}),e=p}catch{F.window.showWarningMessage(`Ricwiz: Could not switch away from ${u}. Skipping.`);continue}}try{await g(`git branch -D ${u}`,{cwd:t}),a++}catch{F.window.showWarningMessage(`Ricwiz: Could not delete local branch ${u}.`)}}F.window.showInformationMessage(`Ricwiz: \u{1F5D1}\uFE0F Cleaned up ${a} unused local branch(es).`)})}var X=k(require("vscode"));async function Te(t){let e=C();e&&await X.window.withProgress({location:X.ProgressLocation.Notification,title:`Ricwiz: Switching to ${t}...`,cancellable:!1},async()=>{try{let o=await L(e),s=!1;try{let{stdout:m}=await g("git status --porcelain",{cwd:e});s=m.trim().length>0}catch{}if(s&&o)try{await g(`git stash push --include-untracked -m "ricwiz-auto:${o}"`,{cwd:e}),X.window.showInformationMessage(`Ricwiz: \u{1F4E6} Stashed changes from ${o}`)}catch{X.window.showWarningMessage("Ricwiz: Could not stash changes. Checkout may fail if there are conflicts.")}let r=t;t.includes("/")&&(r=t.split("/").slice(1).join("/"));try{await g(`git checkout ${r}`,{cwd:e})}catch{let n="";if(t.includes("/"))n=t.split("/")[0];else{let{stdout:c}=await g("git branch -r",{cwd:e}),d=c.split(`
`).map(a=>a.trim()).filter(a=>a),i=[];for(let a of d){let l=a.split(" ")[0];l.endsWith(`/${r}`)&&i.push(l.substring(0,l.lastIndexOf("/")))}if(i.length===0){X.window.showErrorMessage(`Ricwiz: A branch "${r}" n\xE3o existe localmente nem em nenhuma remote!`);return}else if(i.length===1)n=i[0];else{let a=await z.initialize(e);i.includes("origin")?n="origin":a&&i.includes(a.upstreamRemote)?n=a.upstreamRemote:n=i[0]}}try{await g(`git fetch ${n} ${r}`,{cwd:e}),await g(`git checkout -b ${r} --track ${n}/${r}`,{cwd:e})}catch{X.window.showErrorMessage(`Ricwiz: Encontrou na remote ${n} mas falhou a fazer checkout.`);return}}try{let{stdout:m}=await g("git stash list",{cwd:e}),n=m.split(`
`);for(let c=0;c<n.length;c++)if(n[c].includes(`ricwiz-auto:${r}`)){let d=n[c].match(/stash@\{(\d+)\}/);d&&(await g(`git stash pop stash@{${d[1]}}`,{cwd:e}),X.window.showInformationMessage(`Ricwiz: \u{1F4E6} Restored stashed changes on ${r}`));break}}catch{X.window.showWarningMessage(`Ricwiz: Could not restore stashed changes on ${r}. You may need to resolve conflicts manually (check git stash list).`)}}catch{X.window.showErrorMessage(`Ricwiz: Could not checkout branch ${t}.`)}})}var Ae=k(require("vscode"));async function no(){let t=C();if(t)try{let{stdout:e}=await g("git branch --show-current",{cwd:t}),o=e.trim();o&&(await Ae.env.clipboard.writeText(o),Ae.window.showInformationMessage(`Ricwiz: \u{1F4CB} Copied "${o}" to clipboard`))}catch{Ae.window.showErrorMessage("Ricwiz: Could not get the current branch name.")}}var H=k(require("vscode")),_e=k(require("path")),so=k(require("fs"));async function ao(){let t=C();if(!t){H.window.showErrorMessage("Ricwiz: Open a folder or workspace that is a Git repository.");return}let e=H.workspace.getConfiguration("ricwiz"),o=e.get("ticketSourceBranch","main"),r=e.get("packageXmlCommand",'sf sgd source delta --to "HEAD" --from "origin/{baseBranch}" --output-dir "."').replace("{baseBranch}",o);await H.window.showWarningMessage("Are you sure you want to generate the package.xml? This may overwrite existing local manifest files.",{modal:!0},"Yes, Generate")==="Yes, Generate"&&await H.window.withProgress({location:H.ProgressLocation.Notification,title:"Ricwiz: Generating package.xml using Salesforce CLI...",cancellable:!1},async()=>{try{await g(r,{cwd:t,maxBuffer:10*1024*1024}),H.window.showInformationMessage("Ricwiz: Successfully generated package.xml!");let n=_e.join(t,"package","package.xml"),c=_e.join(t,"package.xml"),d=_e.join(t,"manifest","package.xml");for(let i of[n,c,d])if(so.existsSync(i)){let a=await H.workspace.openTextDocument(i);await H.window.showTextDocument(a);break}}catch(n){H.window.showErrorMessage(`Ricwiz: Error running sf command - ${n.message}`)}})}var _=k(require("vscode"));async function co(){let t=C();if(!t){_.window.showErrorMessage("Ricwiz: Open a folder or workspace that is a Git repository.");return}let o=_.workspace.getConfiguration("ricwiz").get("deployCommand","sf project deploy start --manifest package/package.xml --post-destructive-changes destructiveChanges/destructiveChanges.xml -c -l NoTestRun -g");await _.window.showWarningMessage("Are you sure you want to deploy to Salesforce? This action modifies your org and cannot be easily undone.",{modal:!0},"Yes, Deploy")==="Yes, Deploy"&&await _.window.withProgress({location:_.ProgressLocation.Notification,title:"Ricwiz: Deploying package...",cancellable:!1},async()=>{try{let{stdout:r,stderr:m}=await g(o,{cwd:t,maxBuffer:52428800}),n=_.window.createOutputChannel("Ricwiz Deploy");n.appendLine(`Executing: ${o}`),n.appendLine(r),m&&(n.appendLine("--- STDERR ---"),n.appendLine(m)),n.show(),_.window.showInformationMessage("Ricwiz: Successfully ran deploy command!")}catch(r){let m=_.window.createOutputChannel("Ricwiz Deploy");m.appendLine(`Error executing: ${o}`),r.stdout&&m.appendLine(r.stdout),r.stderr&&m.appendLine(r.stderr),m.appendLine(r.message),m.show(),_.window.showErrorMessage("Ricwiz: Error running deploy command. See output channel for details.")}})}var Q=k(require("vscode"));async function lo(){let t=C();if(!t){Q.window.showErrorMessage("Ricwiz: Open a folder or workspace that is a Git repository.");return}let o=Q.workspace.getConfiguration("ricwiz").get("importDataCommand","sfdx force:data:tree:import --plan data/plan.json");await Q.window.showWarningMessage("Are you sure you want to import data into Salesforce? This action modifies records in your org.",{modal:!0},"Yes, Import")==="Yes, Import"&&await Q.window.withProgress({location:Q.ProgressLocation.Notification,title:"Ricwiz: Importing data...",cancellable:!1},async()=>{try{let{stdout:r,stderr:m}=await g(o,{cwd:t,maxBuffer:52428800}),n=Q.window.createOutputChannel("Ricwiz Import Data");n.appendLine(`Executing: ${o}`),n.appendLine(r),m&&(n.appendLine("--- STDERR ---"),n.appendLine(m)),n.show(),Q.window.showInformationMessage("Ricwiz: Successfully ran import data command!")}catch(r){let m=Q.window.createOutputChannel("Ricwiz Import Data");m.appendLine(`Error executing: ${o}`),r.stdout&&m.appendLine(r.stdout),r.stderr&&m.appendLine(r.stderr),m.appendLine(r.message),m.show(),Q.window.showErrorMessage("Ricwiz: Error running import data command. See output channel for details.")}})}var W=k(require("vscode"));async function mo(){let t=C();if(!t){W.window.showErrorMessage("Ricwiz: Open a folder or workspace that is a Git repository.");return}let e=await z.initialize(t,{skipPrompt:!0}),o=e?e.ticketSourceBranch:W.workspace.getConfiguration("ricwiz").get("ticketSourceBranch","main"),s=e?e.originRemote:"origin",r="";try{r=await L(t)}catch{}let m=await W.window.showInputBox({prompt:`Enter the branch name to list modified files (compared to ${o})`,value:r,placeHolder:"SFPSCA-1234"});m&&await W.window.withProgress({location:W.ProgressLocation.Notification,title:`Ricwiz: Finding files for ${m}...`,cancellable:!1},async()=>{try{let n=e?e.ticketPrefix:W.workspace.getConfiguration("ricwiz").get("ticketPrefix","SFPSC-"),c=ce(m,n),d=de(m,c,!0)||m.replace(/-to-[a-zA-Z0-9]+$/i,""),i=await ne(t,d);R.appendLine(`[ListTicketFiles] targetBranch (raw): ${m}, resolvedTargetBranch: ${i}, ticketId: ${d}, originRemote: ${s}, sourceBranch: ${o}`);let a=[];try{let v="";try{R.appendLine(`[ListTicketFiles] Running: git merge-base ${s}/${o} ${i}`);let{stdout:P}=await g(`git merge-base ${s}/${o} ${i}`,{cwd:t});v=P.trim()}catch(P){R.appendLine(`[ListTicketFiles] First merge-base failed: ${P.message}`),R.appendLine(`[ListTicketFiles] Running: git merge-base ${o} ${i}`);let{stdout:T}=await g(`git merge-base ${o} ${i}`,{cwd:t});v=T.trim()}if(v){R.appendLine(`[ListTicketFiles] Merge base found: ${v}. Running git diff...`);let{stdout:P}=await g(`git diff --name-only ${v} ${i}`,{cwd:t,maxBuffer:10*1024*1024});a=P.split(`
`).map(T=>T.trim()).filter(T=>T.length>0),R.appendLine(`[ListTicketFiles] diff found ${a.length} files.`)}}catch(v){R.appendLine(`[ListTicketFiles] Diff strategy failed: ${v.message}`)}let l=[];try{R.appendLine(`[ListTicketFiles] Running git log fallback for ticketId: ${d}`);let{stdout:v}=await g(`git --no-pager log --grep="\\b${d}\\b" -i -E --name-only -m --first-parent --format=""`,{cwd:t,maxBuffer:10*1024*1024});l=v.split(`
`).map(P=>P.trim()).filter(P=>P.length>0),R.appendLine(`[ListTicketFiles] git log found ${l.length} files.`)}catch(v){R.appendLine(`[ListTicketFiles] Git log fallback failed: ${v.message}`)}let u=[...a,...l];if(u.length===0){W.window.showInformationMessage(`Ricwiz: No modified files found for ${m}.`);return}let p=Array.from(new Set(u)).sort(),f={};for(let v of p){let P=v.match(/default\/([^/]+)/),T=P&&P[1]?P[1].toUpperCase():"OUTROS";f[T]||(f[T]=[]),f[T].push(v)}let h=`Files modified in branch ${m}:
`,w=Object.keys(f).sort();for(let v of w)h+=`
=== ${v} ===
`,h+=f[v].join(`
`)+`
`;let x=await W.workspace.openTextDocument({content:h,language:"plaintext"});await W.window.showTextDocument(x)}catch(n){W.window.showErrorMessage(`Ricwiz: Error running git log - ${n.message}`)}})}var ee=k(require("vscode"));async function po(){let t=C();if(!t){ee.window.showErrorMessage("Ricwiz: Open a folder or workspace that is a Git repository.");return}let o=ee.workspace.getConfiguration("ricwiz").get("resetTrackingCommand","sf org disable tracking && sf project reset tracking --no-prompt");await ee.window.withProgress({location:ee.ProgressLocation.Notification,title:"Ricwiz: Resetting tracking...",cancellable:!1},async()=>{try{let{stdout:s,stderr:r}=await g(o,{cwd:t,maxBuffer:52428800}),m=ee.window.createOutputChannel("Ricwiz Reset Tracking");m.appendLine(`Executing: ${o}`),m.appendLine(s),r&&(m.appendLine("--- STDERR ---"),m.appendLine(r)),m.show(),ee.window.showInformationMessage("Ricwiz: Successfully reset tracking!")}catch(s){let r=ee.window.createOutputChannel("Ricwiz Reset Tracking");r.appendLine(`Error executing: ${o}`),s.stdout&&r.appendLine(s.stdout),s.stderr&&r.appendLine(s.stderr),r.appendLine(s.message),r.show(),ee.window.showErrorMessage("Ricwiz: Error resetting tracking. See output channel for details.")}})}var Y=k(require("vscode"));async function uo(){let t=C();if(!t){Y.window.showErrorMessage("Ricwiz: Open a workspace first.");return}let e=["ApexClass","ApexTrigger","CustomObject","CustomField","LightningComponentBundle","AuraDefinitionBundle","Flow","CustomLabel","CustomMetadata","StaticResource","Profile","PermissionSet","PermissionSetGroup","Layout","ValidationRule","RecordType","ListView","Report","EmailTemplate","Other (Type manually)..."],o=await Y.window.showQuickPick(e,{placeHolder:"Select Metadata Type to extract (e.g., ApexClass)",ignoreFocusOut:!0});if(!o||o==="Other (Type manually)..."&&(o=await Y.window.showInputBox({prompt:"Enter Metadata Type (e.g., CustomApplication, Queue)",ignoreFocusOut:!0}),!o))return;let s={ApexClass:"**/*.cls",ApexTrigger:"**/*.trigger",CustomObject:"**/*.{object,object-meta.xml}",CustomField:"**/*.field-meta.xml",LightningComponentBundle:"**/lwc/*/*.js",AuraDefinitionBundle:"**/aura/*/*.cmp",Flow:"**/*.flow-meta.xml",CustomLabel:"**/*.labels-meta.xml",CustomMetadata:"**/*.md-meta.xml",StaticResource:"**/*.resource-meta.xml",Profile:"**/*.profile-meta.xml",PermissionSet:"**/*.permissionset-meta.xml",PermissionSetGroup:"**/*.permissionsetgroup-meta.xml",Layout:"**/*.layout-meta.xml",ValidationRule:"**/*.validationRule-meta.xml",RecordType:"**/*.recordType-meta.xml",ListView:"**/*.listView-meta.xml"},r=[],m=s[o];if(m)try{r=(await Y.workspace.findFiles(m,"**/node_modules/**")).map(d=>{let i=d.fsPath.split(/[\\/]/).pop()||"";if(o==="LightningComponentBundle"||o==="AuraDefinitionBundle"){let a=d.fsPath.split(/[\\/]/);return a[a.length-2]||i.split(".")[0]}return i.split(".")[0]}),r=[...new Set(r)].sort()}catch{}let n=await new Promise(c=>{let d=Y.window.createQuickPick();d.title=`Extract ${o}`,d.placeholder="Type name (e.g. MyComponent) or * for all",d.ignoreFocusOut=!0,d.matchOnDescription=!0;let i=()=>{let a=d.value.trim(),l=[];a?l.push({label:`$(cloud-download) Extract "${a}"`,description:"Extract exact name from Salesforce",alwaysShow:!0}):l.push({label:'$(cloud-download) Extract "*" (All)',description:`Extract all ${o}s`,alwaysShow:!0}),r.forEach(u=>{(!a||u.toLowerCase().includes(a.toLowerCase()))&&l.push({label:u,description:"Local workspace component"})}),d.items=l};d.onDidChangeValue(()=>i()),d.onDidAccept(()=>{let a=d.selectedItems[0];if(a){let l=a.label;l.startsWith('$(cloud-download) Extract "')?l=l.replace('$(cloud-download) Extract "',"").replace('" (All)',"").replace('"',""):l==='$(cloud-download) Extract "*" (All)'&&(l="*"),d.hide(),c(l)}}),d.onDidHide(()=>{d.dispose(),c(void 0)}),i(),d.show()});n&&await Y.window.withProgress({location:Y.ProgressLocation.Notification,title:`Ricwiz: Extracting ${o}:${n} from Salesforce...`,cancellable:!0},async(c,d)=>{try{R.show(!0);let i=`${o}:${n}`,{stdout:a,stderr:l}=await g(`sf project retrieve start -m "${i}"`,{cwd:t});a&&R.appendLine(a),l&&R.appendLine(l),Y.window.showInformationMessage(`Ricwiz: Successfully extracted ${i}.`)}catch(i){R.appendLine(`ERROR: ${i.message}`),i.stdout&&R.appendLine(i.stdout),i.stderr&&R.appendLine(i.stderr),Y.window.showErrorMessage("Ricwiz: Extraction failed. See Output channel for details.")}})}var O=k(require("vscode")),go=k(require("path"));async function fo(){let t=O.window.activeTextEditor;if(!t){O.window.showErrorMessage("Ricwiz: Please open the file you want to deploy in the editor first.");return}let e=t.document.uri.fsPath,o=C();if(!o)return;let s="";if(await O.window.withProgress({location:O.ProgressLocation.Notification,title:"Ricwiz: Fetching available Salesforce orgs...",cancellable:!1},async()=>{try{let{stdout:d}=await g("sf org list --json",{cwd:o});s=d}catch(d){s=d.stdout||""}}),!s){O.window.showErrorMessage("Ricwiz: Failed to fetch orgs. Is Salesforce CLI installed?");return}let r=[];try{let d=JSON.parse(s),i=d.result?.nonScratchOrgs||[],a=d.result?.scratchOrgs||[];r=[...i,...a]}catch{O.window.showErrorMessage("Ricwiz: Failed to parse org list.");return}if(r.length===0){O.window.showInformationMessage("Ricwiz: No authenticated orgs found.");return}let m=r.map(d=>({label:d.alias||d.username,description:d.alias?d.username:"",picked:d.isDefaultUsername})),n=await O.window.showQuickPick(m,{placeHolder:"Select the org(s) to deploy this file to",canPickMany:!0,ignoreFocusOut:!0});if(!n||n.length===0)return;let c=go.basename(e);await O.window.withProgress({location:O.ProgressLocation.Notification,title:`Ricwiz: Deploying ${c} to ${n.length} org(s)...`,cancellable:!1},async()=>{R.show(!0),R.appendLine(`--- Starting Parallel Deploy of ${c} ---`);let d=n.map(async u=>{let p=u.label;R.appendLine(`[${p}] Deploying...`);try{let{stdout:f,stderr:h}=await g(`sf project deploy start -d "${e}" -o "${p}"`,{cwd:o});return R.appendLine(`[${p}] \u2705 Success`),f&&R.appendLine(f),{org:p,success:!0}}catch(f){return R.appendLine(`[${p}] \u274C Failed`),f.stdout&&R.appendLine(f.stdout),f.stderr&&R.appendLine(f.stderr),{org:p,success:!1}}}),i=await Promise.all(d),a=i.filter(u=>u.success).length,l=i.filter(u=>!u.success).length;l===0?O.window.showInformationMessage(`Ricwiz: Successfully deployed to all ${a} orgs!`):O.window.showErrorMessage(`Ricwiz: Deploy finished with errors (${a} success, ${l} failed). Check Output channel.`)})}var M=k(require("vscode")),Qe=k(require("fs")),Ye=k(require("path"));async function ho(){let t=C();if(!t){M.window.showErrorMessage("Ricwiz: Open a folder or workspace that is a Git repository.");return}let e=M.workspace.getConfiguration("ricwiz"),o=e.get("auditUsername",""),s=e.get("auditHours",8),r=await M.window.showInputBox({prompt:"Enter your Salesforce Username to query in SetupAuditTrail",value:o,placeHolder:"admin@tuaorg.com"});if(!r)return;let m=await M.window.showInputBox({prompt:"How many hours back do you want to search?",value:s.toString(),placeHolder:"8"});if(!m)return;let n=parseFloat(m);if(isNaN(n)||n<=0){M.window.showErrorMessage("Ricwiz: Invalid hours specified.");return}let c=new Date(Date.now()-n*60*60*1e3).toISOString(),i=`sf data query -q "${`SELECT Action, Display, Section FROM SetupAuditTrail WHERE CreatedBy.Username = '${r}' AND CreatedDate >= ${c}`}" --json`;await M.window.withProgress({location:M.ProgressLocation.Notification,title:"Ricwiz: Interrogating Setup Audit Trail...",cancellable:!1},async()=>{try{let{stdout:a}=await g(i,{cwd:t,maxBuffer:52428800}),l=JSON.parse(a);if(!l.result||l.result.records.length===0){M.window.showInformationMessage(`Ricwiz: No changes found for ${r} in the last ${n} hours.`);return}let u=l.result.records,p=[],f=new Set;for(let S of u){let A=Fo(S.Action,S.Display,S.Section);if(A){let K=`${A.isDelete?"DEL":"ADD"}-${A.metadataFormat}`;if(!f.has(K)){f.add(K);let U=A.isDelete?"$(trash)":"$(plus)";p.push({label:`${U} ${A.metadataFormat}`,description:`${S.Action} -> ${S.Display}`,metadataFormat:A.metadataFormat,isDelete:A.isDelete})}}}if(p.length===0){M.window.showInformationMessage(`Ricwiz: No extractable metadata changes found for ${r} in the last ${n} hours (ignored passwords/logins).`);return}let h=await M.window.showQuickPick(p,{canPickMany:!0,placeHolder:"Select the changes you want to extract to GitLab",ignoreFocusOut:!0});if(!h||h.length===0){M.window.showInformationMessage("Ricwiz: No changes selected.");return}let w=h.filter(S=>S.isDelete),x=h.filter(S=>!S.isDelete),v=M.window.createOutputChannel("Ricwiz Admin Bridge");if(v.show(),w.length>0){let{stdout:S}=await g("git ls-files",{cwd:t}),A=S.split(`
`).map(U=>U.trim()),K=0;for(let U of w){let Me=U.metadataFormat.split(":"),Ue=Me[0],je=Me[1],ve=je;Ue==="CustomField"&&(ve=je.split(".")[1]);let Ke=A.filter(Be=>{let D=Ye.basename(Be);return D.startsWith(ve+".")&&D.includes(Ue==="CustomField"?".field":"")});for(let Be of Ke){let D=Ye.join(t,Be);Qe.existsSync(D)&&(Qe.unlinkSync(D),v.appendLine(`Deleted local file: ${Be}`),K++)}}M.window.showInformationMessage(`Ricwiz: Deleted ${K} local files from Git workspace.`)}if(x.length===0)return;let P=x.map(S=>S.metadataFormat).filter(S=>S!=="").join(", "),T=await M.window.showInputBox({prompt:"Review and adjust the metadata components to retrieve",value:P,ignoreFocusOut:!0});if(!T)return;let we=`sf project retrieve start -m "${T}"`;v.appendLine(`Executing: ${we}`),M.window.showInformationMessage(`Ricwiz: Extracting ${x.length} components...`);let te=await g(we,{cwd:t});v.appendLine(te.stdout),te.stderr&&(v.appendLine("--- STDERR ---"),v.appendLine(te.stderr)),M.window.showInformationMessage("Ricwiz: Changes extracted successfully! Ready for Git Commit.")}catch(a){M.window.showErrorMessage(`Ricwiz: Error capturing changes - ${a.message}`)}})}function Fo(t,e,o){if(!t||!e||!o)return null;let s=t.toLowerCase(),r=o.toLowerCase();if(["security controls","network access","session settings","data export","login history","password policies","identity verification","delegated administration"].includes(r)||s.includes("login")||s.includes("password")||s.includes("oauth")||s.includes("session"))return null;let n=s.includes("delete"),c=null;if(s==="permissionsetgroupcomponentadd"||s==="permissionsetgroupcomponentdelete")return null;let d=(i,a=!1)=>{let l=i.replace(/\(.*\)/g,"").trim();l.includes(":")&&!s.includes("calculation")&&(l=l.split(":")[0]);let u=["disabled","deleted","removed","created","changed","updated","from","to","on","assigned","assign","assignment","permission","set","group","apex","class","trigger","custom","field","object","layout","validation","rule","flow","profile"],p=l.split(/\s+/);if(a){for(;p.length>0&&u.includes(p[p.length-1].toLowerCase());)p.pop();for(;p.length>0&&u.includes(p[0].toLowerCase());)p.shift();return p.join(" ").trim().replace(/[^a-zA-Z0-9_ ]/g,"")}else return p.filter(w=>!u.includes(w.toLowerCase())).join("_").replace(/[^a-zA-Z0-9_]/g,"")||l.replace(/\s+/g,"")};if(s.includes("profile"))c=`Profile:${d(e,!0)}`;else if(s.includes("permissionsetgroupcalculation")){let i=e.split(":");c=`PermissionSetGroup:${i.length>1?i[i.length-1].trim():d(e,!1)}`}else if(s.includes("permission set group")||s.includes("permissionsetgroup"))c=`PermissionSetGroup:${d(e,!1)}`;else if(s.includes("permission set")||s.includes("permissionset"))c=`PermissionSet:${d(e,!1)}`;else if(s.includes("apexclass"))c=`ApexClass:${d(e,!1)}`;else if(s.includes("apextrigger")||s.includes("apex trigger"))c=`ApexTrigger:${d(e,!1)}`;else if(s.includes("customfield")){let i=e.match(/([A-Za-z0-9_]+__c)/),a=e.match(/(?:on|na|for)\s+([A-Za-z0-9_]+)/i);i&&a?c=`CustomField:${a[1]}.${i[1]}`:c=`CustomField:${d(e,!1)}`}else if(s.includes("layout"))c=`Layout:${d(e,!0)}`;else if(s.includes("validation"))c=`ValidationRule:${d(e,!1)}`;else if(s.includes("flow"))c=`Flow:${d(e,!1)}`;else if(s.includes("customobject")){let i=e.match(/([A-Za-z0-9_]+__c)/);c=i?`CustomObject:${i[1]}`:`CustomObject:${d(e,!1)}`}else if(!s.includes("created")&&!s.includes("changed")&&!s.includes("deleted"))return null;return c?{metadataFormat:c,isDelete:n}:null}var nt=k(require("vscode"));async function wo(){let t=C();if(t)try{let{stdout:e}=await g('git for-each-ref --sort=-committerdate --format="%(refname:short)|||%(committerdate:relative)|||%(subject)" refs/heads/',{cwd:t}),o=e.split(`
`).filter(r=>r.trim()).map(r=>{let m=r.split("|||");return{label:`$(git-branch) ${m[0]}`,description:m[1],detail:m[2],branchName:m[0]}}),s=await nt.window.showQuickPick(o,{placeHolder:"Select a branch from history to checkout",matchOnDescription:!0,matchOnDetail:!0});s&&await Te(s.branchName)}catch{nt.window.showErrorMessage("Ricwiz: Failed to get branch history")}}var Fe=k(require("vscode"));async function vo(){let t=C();if(!t)return;let e=await Fe.window.showInputBox({prompt:"Enter ticket number or name (e.g., 48934)",placeHolder:"48934"});if(e)try{let{stdout:o}=await g(`git branch --list "*${e}*"`,{cwd:t}),s=o.split(`
`).map(n=>n.replace("*","").trim()).filter(n=>n);if(s.length===0){Fe.window.showInformationMessage(`Ricwiz: No branches found matching "${e}"`);return}let r=s.map(n=>({label:`$(git-branch) ${n}`,branchName:n})),m=await Fe.window.showQuickPick(r,{placeHolder:`Select a branch for ${e}`});m&&await Te(m.branchName)}catch{Fe.window.showErrorMessage("Ricwiz: Failed to search branches")}}var Pe=k(require("vscode")),bo=k(require("path"));async function yo(){let t=Pe.window.activeTextEditor;if(!t)return Pe.window.showErrorMessage("Ricwiz: Please open a file in the editor to check blame."),null;let e=t.document.fileName,o=bo.basename(e),s=C();if(!s)return Pe.window.showErrorMessage("Ricwiz: Workspace is not a git repository."),null;let r=[];try{let{stdout:a}=await g(`git log -5 --pretty=format:"%an|%ar|%s|%h" -- "${e}"`,{cwd:s}),l=a.trim().split(`
`);for(let u of l){let p=u.split("|");p.length>=4&&r.push({author:p[0],time:p[1],message:p.slice(2,-1).join("|"),hash:p[p.length-1]})}}catch(a){R.appendLine(`[WhoToBlame] Git blame error: ${a.message}`)}let m="Unknown",n="Unknown",c="Unknown",d=[],i=Ve(e);if(i)try{await Pe.window.withProgress({location:Pe.ProgressLocation.Notification,title:`Ricwiz: Analyzing ${i.name} in Salesforce...`,cancellable:!1},async()=>{let a="";if(i.type==="CustomField"){let l=i.name.split(".");l.length===2&&(a=`SELECT LastModifiedBy.Name, LastModifiedDate, CreatedBy.Name FROM CustomField WHERE DeveloperName = '${l[1].replace("__c","")}' AND TableEnumOrId = '${l[0]}'`)}else i.type==="LightningComponentBundle"?a=`SELECT LastModifiedBy.Name, LastModifiedDate, CreatedBy.Name FROM LightningComponentBundle WHERE DeveloperName = '${i.name}'`:a=`SELECT LastModifiedBy.Name, LastModifiedDate, CreatedBy.Name FROM ${i.type} WHERE Name = '${i.name}'`;if(a)try{let{stdout:l}=await g(`sf data query -t -q "${a}" --json`,{cwd:s,maxBuffer:52428800}),u=JSON.parse(l);if(u&&u.result&&u.result.records&&u.result.records.length>0){let p=u.result.records[0];m=p.LastModifiedBy?p.LastModifiedBy.Name:"Unknown",c=p.CreatedBy?p.CreatedBy.Name:"Unknown",n=new Date(p.LastModifiedDate).toLocaleString()}else m="Not found in Org",n="N/A",c="N/A"}catch(l){m="Query Error",n="N/A",c="N/A",R.appendLine(`[WhoToBlame] Query error: ${l.message}`)}try{let l="SELECT Action, Display, CreatedBy.Name, CreatedDate FROM SetupAuditTrail ORDER BY CreatedDate DESC LIMIT 1500",{stdout:u}=await g(`sf data query -q "${l}" --json`,{cwd:s,maxBuffer:52428800}),p=JSON.parse(u);if(p&&p.result&&p.result.records){let f=i.name.replace("__c","");d=p.result.records.filter(w=>w.Display&&w.Display.includes(f)).map(w=>({action:w.Action,display:w.Display,author:w.CreatedBy?w.CreatedBy.Name:"Unknown",time:new Date(w.CreatedDate).toLocaleString()})).slice(0,10)}}catch(l){R.appendLine(`[WhoToBlame] Audit trail query error: ${l.message}`)}})}catch(a){R.appendLine(`[WhoToBlame] Salesforce query error: ${a.message}`)}else m="Unsupported Metadata Type",n="N/A";return{fileName:o,gitHistory:r,sfAuthor:m,sfTime:n,sfCreatedBy:c,auditHistory:d}}var ge=k(require("vscode"));var Ie=k(require("https"));async function xo(t,e){let o=C();if(!o)return;let s=(await Le())?.trim();if(!s){ge.window.showErrorMessage("Ricwiz: GitLab token is not configured.");return}try{let r=await z.initialize(o,{skipPrompt:!0});if(!r)return;let n=r.getConfig("gitlabUrlOverride","");if(n){let c=new URL(n);n=`${c.protocol}//${c.host}`}else{let{stdout:c}=await g("git remote",{cwd:o}),d=c.split(`
`).map(a=>a.trim()).filter(a=>a),i=!1;for(let a of d){let{stdout:l}=await g(`git remote get-url ${a}`,{cwd:o}),u=l.trim();u.endsWith(".git")&&(u=u.slice(0,-4)),u.startsWith("git@")&&(u=u.replace("git@","").replace(":","/"),u=`https://${u}`);let p=new URL(u),f=p.pathname;if(f.startsWith("/")&&(f=f.substring(1)),f.endsWith("/")&&(f=f.slice(0,-1)),encodeURIComponent(f)===t||f===t){n=`${p.protocol}//${p.host}`,i=!0;break}}if(!i){ge.window.showErrorMessage(`Ricwiz: Could not determine base URL for project ${t}`);return}}await ge.window.withProgress({location:ge.ProgressLocation.Notification,title:`Fetching failed jobs for Pipeline #${e}...`,cancellable:!1},async()=>{let c=new Ie.Agent({keepAlive:!0}),d=new URL(`${n}/api/v4/projects/${t}/pipelines/${e}/jobs?scope[]=failed`),i=await new Promise(h=>{Ie.get(d,{headers:{"PRIVATE-TOKEN":s},agent:c},w=>{let x="";w.on("data",v=>x+=v),w.on("end",()=>{if(w.statusCode===200)try{h(JSON.parse(x))}catch{h([])}else h([])})}).on("error",()=>h([]))});if(!i||i.length===0){ge.window.showInformationMessage("Ricwiz: No failed jobs found for this pipeline.");return}let a=i[0],l=new URL(`${n}/api/v4/projects/${t}/jobs/${a.id}/trace`),p=(await new Promise(h=>{Ie.get(l,{headers:{"PRIVATE-TOKEN":s},agent:c},w=>{let x="";w.on("data",v=>x+=v),w.on("end",()=>h(x))}).on("error",w=>h(`Failed to fetch log: ${w.message}`))})).replace(/\x1B\[[0-9;]*[mK]/g,""),f=ge.window.createOutputChannel(`Pipeline #${e} - Job ${a.name}`);f.appendLine(`Pipeline ID: ${e}`),f.appendLine(`Job Name: ${a.name}`),f.appendLine(`Status: ${a.status}`),f.appendLine(`URL: ${a.web_url}`),f.appendLine("========================================"),f.appendLine(p),f.show()})}catch(r){ge.window.showErrorMessage(`Ricwiz: Error fetching pipeline logs - ${r.message}`)}}function ko(t,e,o){t.subscriptions.push(b.commands.registerCommand("ricwiz.generateDestructiveChanges",async()=>{try{await kt()}finally{b.commands.executeCommand("ricwiz.manualRefresh")}}),b.commands.registerCommand("ricwiz.runSmartTests",async()=>{try{await Ct()}finally{b.commands.executeCommand("ricwiz.manualRefresh")}}),b.commands.registerCommand("ricwiz.refreshWebview",()=>{e&&b.commands.executeCommand("workbench.action.webview.reloadWebviewAction")}),b.commands.registerCommand("ricwiz.createBranches",async s=>{try{await $t(s)}finally{b.commands.executeCommand("ricwiz.manualRefresh")}}),b.commands.registerCommand("ricwiz.prepareDeploy",async()=>{try{await Tt()}finally{b.commands.executeCommand("ricwiz.manualRefresh")}}),b.commands.registerCommand("ricwiz.createMergeRequests",async()=>{try{await Lt()}finally{b.commands.executeCommand("ricwiz.manualRefresh")}}),b.commands.registerCommand("ricwiz.createMergeRequestsVSCode",async()=>{try{await At()}finally{b.commands.executeCommand("ricwiz.manualRefresh")}}),b.commands.registerCommand("ricwiz.openJiraTicket",async()=>{try{await It()}finally{b.commands.executeCommand("ricwiz.manualRefresh")}}),b.commands.registerCommand("ricwiz.openJiraTicketVSCode",async()=>{try{await Ot()}finally{b.commands.executeCommand("ricwiz.manualRefresh")}}),b.commands.registerCommand("ricwiz.showJiraDetails",()=>{e&&Ht(e)}),b.commands.registerCommand("ricwiz.openJiraDashboard",s=>{e&&_t(e,s)}),b.commands.registerCommand("ricwiz.openJiraDetailsForId",s=>{e&&Qt(e,s)}),b.commands.registerCommand("ricwiz.toggleDashboardBranches",s=>{e&&(e.setDashboardShowBranches(s),b.commands.executeCommand("ricwiz.openJiraDashboard"))}),b.commands.registerCommand("ricwiz.changeJiraStatus",async()=>{try{await Yt()}finally{b.commands.executeCommand("ricwiz.manualRefresh")}}),b.commands.registerCommand("ricwiz.addJiraComment",async()=>{try{await Kt()}finally{b.commands.executeCommand("ricwiz.manualRefresh")}}),b.commands.registerCommand("ricwiz.addJiraLabel",async()=>{try{await Zt()}finally{b.commands.executeCommand("ricwiz.manualRefresh")}}),b.commands.registerCommand("ricwiz.setJiraToken",Xt),b.commands.registerCommand("ricwiz.setGitlabToken",to),b.commands.registerCommand("ricwiz.syncAll",async()=>{try{await oo()}finally{b.commands.executeCommand("ricwiz.manualRefresh")}}),b.commands.registerCommand("ricwiz.updateBases",async()=>{try{await io()}finally{b.commands.executeCommand("ricwiz.manualRefresh")}}),b.commands.registerCommand("ricwiz.deleteUnusedBranches",async()=>{try{await ro()}finally{b.commands.executeCommand("ricwiz.manualRefresh")}}),b.commands.registerCommand("ricwiz.checkoutBranch",async s=>{try{await Te(s)}finally{b.commands.executeCommand("ricwiz.manualRefresh")}}),b.commands.registerCommand("ricwiz.copyBranchName",async()=>{try{await no()}finally{b.commands.executeCommand("ricwiz.manualRefresh")}}),b.commands.registerCommand("ricwiz.generatePackageXml",async()=>{try{await ao()}finally{b.commands.executeCommand("ricwiz.manualRefresh")}}),b.commands.registerCommand("ricwiz.deployPackage",async()=>{try{await co()}finally{b.commands.executeCommand("ricwiz.manualRefresh")}}),b.commands.registerCommand("ricwiz.importData",async()=>{try{await lo()}finally{b.commands.executeCommand("ricwiz.manualRefresh")}}),b.commands.registerCommand("ricwiz.listTicketFiles",async()=>{try{await mo()}finally{b.commands.executeCommand("ricwiz.manualRefresh")}}),b.commands.registerCommand("ricwiz.resetTracking",async()=>{try{await po()}finally{b.commands.executeCommand("ricwiz.manualRefresh")}}),b.commands.registerCommand("ricwiz.extractComponent",async()=>{try{await uo()}finally{b.commands.executeCommand("ricwiz.manualRefresh")}}),b.commands.registerCommand("ricwiz.deployMultiOrg",async()=>{try{await fo()}finally{b.commands.executeCommand("ricwiz.manualRefresh")}}),b.commands.registerCommand("ricwiz.captureAdminChanges",async()=>{try{await ho()}finally{b.commands.executeCommand("ricwiz.manualRefresh")}}),b.commands.registerCommand("ricwiz.openHistory",async()=>{try{await wo()}finally{b.commands.executeCommand("ricwiz.manualRefresh")}}),b.commands.registerCommand("ricwiz.searchTicket",async()=>{try{await vo()}finally{b.commands.executeCommand("ricwiz.manualRefresh")}}),b.commands.registerCommand("ricwiz.whoToBlame",async()=>{let s=await yo();s&&e&&(e.setBlameData(s),e.setPage("blame"))}),b.commands.registerCommand("ricwiz.showPipelineLogs",(s,r)=>xo(s,r)),b.commands.registerCommand("ricwiz.manualRefresh",()=>{o&&o()}),b.commands.registerCommand("ricwiz.toggleAutoRefresh",()=>{if(e){let s=!e.isAutoRefreshEnabled();e.setAutoRefresh(s),b.workspace.getConfiguration("ricwiz").update("autoRefresh",s,b.ConfigurationTarget.Global)}}),b.commands.registerCommand("ricwiz.openSettings",()=>{b.commands.executeCommand("workbench.action.openSettings","ricwiz")}))}var se=k(require("vscode"));function Co(t,e,o){let s,r=se.workspace.getConfiguration("ricwiz").get("autoRefresh",!0);e?.setAutoRefresh(r),t.subscriptions.push(se.workspace.onDidChangeConfiguration(n=>{if(n.affectsConfiguration("ricwiz.autoRefresh")){let c=se.workspace.getConfiguration("ricwiz").get("autoRefresh",!0);e?.setAutoRefresh(c)}}));async function m(){let n=se.extensions.getExtension("vscode.git");if(n){let i=function(a){let l="",u;async function p(){let h=se.workspace.workspaceFolders;if(!h)return;let w=h[0].uri.fsPath,x=await L(w);if(x&&x!==l){l=x;let v=se.workspace.getConfiguration("ricwiz"),P=v.get("ticketPrefix","SFPSCA-");if(!x.includes(P)){let D=x.match(/([A-Z]+-)\d+/i);D&&(P=D[1].toUpperCase())}let T=[],we=[],te=[],S=[],A=await z.initialize(w,{skipPrompt:!0}),K=A?.environments||v.get("environments",[{name:"Qual",sourceBranch:"quality"},{name:"Val",sourceBranch:"validation"},{name:"Prod",sourceBranch:"main"}]);try{let D=v.get("workspaceCheckoutButtons",["main","quality","validation"]);te=Array.from(new Set(D))}catch{}let U="",Me=x.match(new RegExp(`(${P}\\d+(?:-\\d+)?)`,"i"));if(Me){let D=Me[1].toUpperCase();U=D;let fe=v.get("commitMessageSuffix","- "),st=/^[A-Z]+-\d+(?:-\\d+)?\s*(?:-\s*|:\s*|\s+)?/i;st.test(a.inputBox.value)?a.inputBox.value.toUpperCase().startsWith(D)||(a.inputBox.value=a.inputBox.value.replace(st,`${D}${fe}`)):a.inputBox.value=`${D}${fe}`+a.inputBox.value,o.text=`$(bookmark) ${D}`,o.tooltip=`Branch: ${x}
Click to open Jira ticket`,o.show();try{let at=await Re(w,D,"");T=await $e(w,at,D,K,A)}catch{}}else{o.hide();try{S=await Et(w)}catch{}}let[Ue,je,ve]=await Promise.all([Dt(w,10),St(w,x,K,A),U?Ee(U).catch(D=>{let fe=D.message;return fe&&(fe.includes("ENOTFOUND")||fe.includes("network"))&&(fe="No Internet or Invalid URL"),{summary:`\u26A0\uFE0F Jira Error: ${fe}`,description:"",status:""}}):Promise.resolve(null)]);we=Ue;let Ke=ve?ve.summary:"",Be=ve&&ve.status||"";e?.updateBranch(x,je,T,we,te,S,Ke,Be)}}function f(){e?.isAutoRefreshEnabled()&&(u&&clearTimeout(u),u=setTimeout(()=>{l="",p()},300))}s=()=>{l="",p()},p(),t.subscriptions.push(a.state.onDidChange(()=>f())),t.subscriptions.push(se.window.onDidChangeWindowState(h=>{h.focused&&f()}))};var c=i;n.isActive||await n.activate();let d=n.exports.getAPI(1);d.repositories.length>0&&d.repositories.forEach(a=>i(a)),d.onDidOpenRepository(a=>i(a))}}return m(),()=>{s&&s()}}var re;function Io(t){ft(t),re=new Je(t.extensionUri),t.subscriptions.push(Oe.window.registerWebviewViewProvider("ricwiz-webview",re));let e=Oe.window.createStatusBarItem(Oe.StatusBarAlignment.Left,100);e.command="ricwiz.openJiraTicket",t.subscriptions.push(e);let o=Co(t,re,e);ko(t,re,o)}function Oo(){}0&&(module.exports={activate,deactivate,webviewProvider});
