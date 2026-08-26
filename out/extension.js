"use strict";var jo=Object.create;var _e=Object.defineProperty;var No=Object.getOwnPropertyDescriptor;var Jo=Object.getOwnPropertyNames;var Wo=Object.getPrototypeOf,Go=Object.prototype.hasOwnProperty;var Ho=(t,e)=>{for(var o in e)_e(t,o,{get:e[o],enumerable:!0})},bt=(t,e,o,s)=>{if(e&&typeof e=="object"||typeof e=="function")for(let i of Jo(e))!Go.call(t,i)&&i!==o&&_e(t,i,{get:()=>e[i],enumerable:!(s=No(e,i))||s.enumerable});return t};var k=(t,e,o)=>(o=t!=null?jo(Wo(t)):{},bt(e||!t||!t.__esModule?_e(o,"default",{value:t,enumerable:!0}):o,t)),qo=t=>bt(_e({},"__esModule",{value:!0}),t);var oi={};Ho(oi,{activate:()=>ei,deactivate:()=>ti,webviewProvider:()=>se});module.exports=qo(oi);var Me=k(require("vscode"));var P=k(require("vscode"));function C(t){return t?t.replace(/&/g,"&amp;").replace(/</g,"&lt;").replace(/>/g,"&gt;").replace(/"/g,"&quot;").replace(/'/g,"&#39;"):""}function Qe(t){let e=(t||"").toLowerCase().trim();return e==="open"?"#888888":e==="in progress"?"#007acc":e==="waiting for deploy"?"#d7a500":e==="close"||e==="done"||e==="closed"?"#238636":"var(--vscode-badge-background)"}function be(t){return t?t==="running"?"\u{1F7E1}":t==="success"?"\u{1F7E2}":t==="failed"?"\u{1F534}":t==="canceled"||t==="skipped"?"\u26AA":"":""}function H(){return`
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
    `}function q(){return`
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
    `}function xt(t,e){let o=q(),s=(e.files||[]).map(i=>`
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
        
        ${s?`
            <div style="font-size: 11px; opacity: 0.7; margin: 8px 4px 4px 4px; text-transform: uppercase;">Conflicted Files</div>
            <div style="display: flex; flex-direction: column; gap: 2px;">
                ${s}
            </div>
        `:""}

        ${H()}
    </body>
    </html>`}function kt(t){return`<!DOCTYPE html>
    <html lang="en">
    <head>
        <meta charset="UTF-8">
        <meta name="viewport" content="width=device-width, initial-scale=1.0">
        <title>Ricwiz Blame</title>
        ${q()}
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

        ${H()}
    </body>
    </html>`}function Ct(t){let e=q(),o=t?.ticketId||"Jira",s=t?.summary||"No Title",i=t?.description||"No description provided.",p=t?.relatedBranches||[];return`<!DOCTYPE html>
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
            <div class="jira-title">${C(s)}</div>
            <div class="jira-desc">${C(i)}</div>
            
            ${p.length>0?`
                <div style="margin-top: 16px; border-top: 1px solid var(--vscode-panel-border); padding-top: 12px;">
                    <div style="font-size: 11px; opacity: 0.7; margin-bottom: 8px; text-transform: uppercase; font-weight: bold;"><span class="icon" style="color: #32D74B;">\u2387</span> Related Branches & MRs</div>
                    <div style="display: flex; flex-direction: column; gap: 4px;">
                        ${p.map(n=>{let c=be(n.pipelineStatus),a="";return n.pipelineStatus==="failed"&&n.projectPath&&n.pipelineId&&(a=`onclick="event.stopPropagation(); sendCommand('showPipelineLogs', { projectPath: '${n.projectPath}', pipelineId: ${n.pipelineId} });" style="cursor: pointer;"`),`
                            <div class="btn" style="padding: 6px 10px; font-size: 12px; display: flex; justify-content: space-between; align-items: center; background-color: var(--vscode-button-secondaryBackground); color: var(--vscode-button-secondaryForeground); border-radius: 4px;" onclick="sendCheckoutCommand('${C(n.name)}', this)" title="Checkout ${C(n.name)}">
                                <div style="display: flex; align-items: center; gap: 6px; overflow: hidden;">
                                    <span style="overflow: hidden; text-overflow: ellipsis; white-space: nowrap; font-weight: bold;">${C(n.name)}</span>
                                </div>
                                <div style="display: flex; gap: 6px; align-items: center;">
                                    ${c?`<span title="Pipeline: ${n.pipelineStatus}" style="font-size: 11px;" ${a}>${c}</span>`:""}
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

        ${H()}
    </body>
    </html>`}function $t(t){let{data:e,showBranches:o}=t,s=q(),i=e||{queries:[],selectedIndex:0,results:[],error:null},p=i.queries.map((c,a)=>`
        <option value="${a}" ${a===i.selectedIndex?"selected":""}>${C(c.name)}</option>
    `).join(""),n=i.error?`
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
                            <span style="background: ${Qe(c.status)}; color: white; padding: 2px 4px; border-radius: 3px; font-size: 9px; font-weight: bold; text-transform: uppercase;">${C(c.status)}</span>
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
                                ${c.detailedBranches.map(a=>{let d=be(a.pipelineStatus);return`
                                    <div style="display: flex; justify-content: space-between; align-items: center; font-size: 10px; background: var(--vscode-editor-background); padding: 2px 6px; border-radius: 3px;">
                                        <div style="display: flex; align-items: center; gap: 6px; overflow: hidden; cursor: pointer; flex: 1;" onclick="sendCheckoutCommand('${C(a.name)}', this)" title="Checkout ${C(a.name)}">
                                            <span style="overflow: hidden; text-overflow: ellipsis; white-space: nowrap;">${C(a.name)}</span>
                                        </div>
                                        <div style="display: flex; gap: 6px; align-items: center;">
                                            ${a.isMerged?'<span style="background-color: var(--vscode-charts-green); color: white; border-radius: 3px; padding: 1px 4px; font-size: 8px; font-weight: bold;">MERGED</span>':""}
                                            ${d?`<span title="Pipeline: ${a.pipelineStatus}" >${d}</span>`:""}
                                            ${a.mrUrl?`<span onclick="event.stopPropagation(); sendCommand('openExternal', '${a.mrUrl}');" title="Open Merge Request" style="cursor: pointer;">\u{1F517}</span>`:""}
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
            ${n}
        </div>

        ${H()}
    </body>
    </html>`}function Rt(){return`<!DOCTYPE html>
    <html lang="en">
    <head>
        <meta charset="UTF-8">
        <meta name="viewport" content="width=device-width, initial-scale=1.0">
        <title>Ricwiz DevTools</title>
        ${q()}
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
        
        ${H()}
    </body>
    </html>`}function zt(t){let{logoUri:e,currentBranch:o,currentBranchIsMerged:s,relatedBranches:i,commits:p,baseBranches:n,recentTickets:c,ticketTitle:a,ticketStatus:d,autoRefreshEnabled:r}=t,m=q(),l=p.length>0?`
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
    `:"",u=i.find(v=>v.name===o),f="";u&&(f=be(u.pipelineStatus));let h=u?u.mrUrl:void 0,w=i.filter(v=>v.name!==o),$=o?`
        <div style="background-color: var(--vscode-editor-inactiveSelectionBackground); padding: 10px; border-radius: 6px; margin-bottom: 16px; border: 1px solid var(--vscode-panel-border); box-shadow: 0 2px 4px rgba(0,0,0,0.1); position: relative;">
            ${a&&d?`
            <div style="position: absolute; top: 6px; right: 6px; z-index: 10; cursor: pointer; font-size: 9px; padding: 2px 6px; border-radius: 18px; background-color: ${Qe(d)}; color: white; border: 1px solid var(--vscode-panel-border); opacity: 0.9; font-weight: bold; text-transform: uppercase; display: flex; align-items: center; gap: 4px;" onclick="sendCommand('changeJiraStatus', null, this)" title="Update Jira Status">
                <span>\u270E</span><span>${C(d)}</span>
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
                ${s?'<span style="background-color: var(--vscode-charts-green); color: white; border-radius: 3px; padding: 1px 4px; font-size: 10px; font-weight: bold;" title="Merged to target env">MERGED</span>':""}
            </div>
            ${a?`<div style="font-size: 12px; margin-top: 6px; text-align: center; opacity: 0.9; font-style: italic;">${C(a)}</div>`:""}
            ${w.length>0?`
                <div style="margin-top: 10px; border-top: 1px solid var(--vscode-panel-border); padding-top: 10px;">
                    <div style="font-size: 10px; opacity: 0.7; margin-bottom: 6px; text-transform: uppercase; text-align: center;">Sister Branches</div>
                    <div style="display: flex; flex-direction: column; gap: 4px;">
                        ${w.map(v=>{let b=be(v.pipelineStatus),x="";return v.pipelineStatus==="failed"&&v.projectPath&&v.pipelineId&&(x=`onclick="event.stopPropagation(); sendCommand('showPipelineLogs', { projectPath: '${v.projectPath}', pipelineId: ${v.pipelineId} });" style="cursor: pointer;"`),`
                            <div class="btn" style="padding: 6px 8px; font-size: 11px; display: flex; justify-content: space-between; align-items: center; background-color: var(--vscode-button-secondaryBackground); color: var(--vscode-button-secondaryForeground); border-radius: 4px; box-sizing: border-box; width: 100%;" onclick="sendCheckoutCommand('${C(v.name)}', this)" title="Checkout ${C(v.name)}">
                                <div style="display: flex; align-items: center; gap: 4px; overflow: hidden;">
                                    <span style="overflow: hidden; text-overflow: ellipsis; white-space: nowrap; font-weight: bold;">${C(v.name)}</span>
                                </div>
                                <div style="display: flex; gap: 4px; align-items: center;">
                                    ${v.isMerged?'<span style="background-color: var(--vscode-charts-green); color: white; border-radius: 3px; padding: 1px 4px; font-size: 9px; font-weight: bold;" title="Merged to target env">MERGED</span>':""}
                                    ${b?`<span title="Pipeline: ${v.pipelineStatus}" style="font-size: 10px;" ${x}>${b}</span>`:""}
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
                <button class="copy-btn" id="autoRefreshToggle" onclick="sendCommand('toggleAutoRefresh', null, this)" title="${r?"Auto-refresh is ON \u2014 click to disable":"Auto-refresh is OFF \u2014 click to enable"}" style="font-size: 11px; padding: 2px 6px; border-radius: 3px; border: 1px solid var(--vscode-panel-border); ${r?"opacity: 0.9; background-color: var(--vscode-button-secondaryBackground);":"opacity: 0.5;"}">
                    ${r?"\u26A1 Auto":"\u23F8\uFE0F Auto"}
                </button>
            </div>
        </div>

        ${$}

        ${n.length>0?`
            <div style="display: flex; gap: 4px; margin-bottom: 16px; flex-wrap: wrap; justify-content: center;">
                ${n.map(v=>{let b=v.split("/").pop()?.toUpperCase()||v.toUpperCase();return`
                    <button class="btn" style="flex: 1; min-width: 25%; justify-content: center; padding: 6px 4px; font-size: 10px; font-weight: bold; background-color: var(--vscode-button-secondaryBackground); color: var(--vscode-button-secondaryForeground); border-radius: 4px;" onclick="sendCheckoutCommand('${C(v)}', this)" title="Checkout ${C(v)}">
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

        ${l}
        
        ${H()}
    </body>
    </html>`}var Ye=class{constructor(e){this._extensionUri=e}_extensionUri;webviewView;currentBranchCache="";currentBranchIsMergedCache=!1;relatedBranchesCache=[];commitsCache=[];baseBranchesCache=[];recentTicketsCache=[];ticketTitleCache="";ticketStatusCache="";currentPage="main";blameDataCache=null;jiraDataCache=null;dashboardDataCache=null;dashboardShowBranches=!1;autoRefreshEnabled=!0;conflictState=null;resolveWebviewView(e,o,s){this.webviewView=e,e.webview.options={enableScripts:!0,localResourceRoots:[this._extensionUri]},this.updateView(),e.webview.onDidReceiveMessage(i=>{switch(i.command){case"createBranches":P.commands.executeCommand("ricwiz.createBranches");break;case"createBranchForTicket":P.commands.executeCommand("ricwiz.createBranches",i.args);break;case"prepareDeploy":P.commands.executeCommand("ricwiz.prepareDeploy");break;case"openMRs":P.commands.executeCommand("ricwiz.createMergeRequests");break;case"openMRsVSCode":P.commands.executeCommand("ricwiz.createMergeRequestsVSCode");break;case"openExternal":i.args&&P.env.openExternal(P.Uri.parse(i.args));break;case"openJira":P.commands.executeCommand("ricwiz.openJiraTicket");break;case"showJiraDetails":P.commands.executeCommand("ricwiz.showJiraDetails");break;case"showPipelineLogs":P.commands.executeCommand("ricwiz.showPipelineLogs",i.args.projectPath,i.args.pipelineId);break;case"changeJiraStatus":P.commands.executeCommand("ricwiz.changeJiraStatus");break;case"addJiraComment":P.commands.executeCommand("ricwiz.addJiraComment");break;case"addJiraLabel":P.commands.executeCommand("ricwiz.addJiraLabel");break;case"setPage":this.setPage(i.args);break;case"openDashboard":P.commands.executeCommand("ricwiz.openJiraDashboard");break;case"openJiraDetailsForId":P.commands.executeCommand("ricwiz.openJiraDetailsForId",i.args);break;case"refreshDashboard":P.commands.executeCommand("ricwiz.openJiraDashboard");break;case"switchDashboardQuery":P.commands.executeCommand("ricwiz.openJiraDashboard",parseInt(i.args,10));break;case"toggleDashboardBranches":P.commands.executeCommand("ricwiz.toggleDashboardBranches",i.args);break;case"openJiraVSCode":P.commands.executeCommand("ricwiz.openJiraTicketVSCode");break;case"openSettings":P.commands.executeCommand("ricwiz.openSettings");break;case"checkout":let p=i.branch||i.args;p&&P.commands.executeCommand("ricwiz.checkoutBranch",p);break;case"copyBranch":P.commands.executeCommand("ricwiz.copyBranchName");break;case"generatePackageXml":P.commands.executeCommand("ricwiz.generatePackageXml");break;case"openDevTools":this.setPage("devtools");break;case"openMain":this.setPage("main");break;case"generateDestructiveChanges":P.commands.executeCommand("ricwiz.generateDestructiveChanges");break;case"deployPackage":P.commands.executeCommand("ricwiz.deployPackage");break;case"runSmartTests":P.commands.executeCommand("ricwiz.runSmartTests");break;case"importData":P.commands.executeCommand("ricwiz.importData");break;case"listTicketFiles":P.commands.executeCommand("ricwiz.listTicketFiles");break;case"resetTracking":P.commands.executeCommand("ricwiz.resetTracking");break;case"extractComponent":P.commands.executeCommand("ricwiz.extractComponent");break;case"deployMultiOrg":P.commands.executeCommand("ricwiz.deployMultiOrg");break;case"captureAdminChanges":P.commands.executeCommand("ricwiz.captureAdminChanges");break;case"whoToBlame":P.commands.executeCommand("ricwiz.whoToBlame");break;case"syncAll":P.commands.executeCommand("ricwiz.syncAll");break;case"updateBases":P.commands.executeCommand("ricwiz.updateBases");break;case"deleteUnused":P.commands.executeCommand("ricwiz.deleteUnusedBranches");break;case"conflict_commitAndContinue":P.commands.executeCommand("ricwiz.conflictAction","commitAndContinue");break;case"conflict_resolveDeletions":P.commands.executeCommand("ricwiz.conflictAction","resolveDeletions");break;case"conflict_abortDeploy":P.commands.executeCommand("ricwiz.conflictAction","abortDeploy");break;case"openFile":if(i.file){let n=P.workspace.workspaceFolders;if(n){let c=P.Uri.joinPath(n[0].uri,i.file);P.commands.executeCommand("vscode.open",c)}}break;case"searchTicket":P.commands.executeCommand("ricwiz.searchTicket");break;case"manualRefresh":P.commands.executeCommand("ricwiz.manualRefresh");break;case"toggleAutoRefresh":P.commands.executeCommand("ricwiz.toggleAutoRefresh");break;case"openHistory":P.commands.executeCommand("ricwiz.openHistory");break}})}setConflictState(e){this.conflictState=e,this.updateView()}updateBranch(e,o,s=[],i=[],p=[],n=[],c="",a=""){this.currentBranchCache=e,this.currentBranchIsMergedCache=o,this.relatedBranchesCache=s,this.commitsCache=i,this.baseBranchesCache=p,this.recentTicketsCache=n,this.ticketTitleCache=c,this.ticketStatusCache=a,this.webviewView&&this.updateView()}setDashboardShowBranches(e){this.dashboardShowBranches=e}getDashboardShowBranches(){return this.dashboardShowBranches}setBlameData(e){this.blameDataCache=e}setJiraData(e){this.jiraDataCache=e}setDashboardData(e){this.dashboardDataCache=e}setAutoRefresh(e){this.autoRefreshEnabled=e,this.updateView()}isAutoRefreshEnabled(){return this.autoRefreshEnabled}setPage(e){this.currentPage=e,this.updateView()}updateView(){if(!this.webviewView)return;let e=this.webviewView.webview.asWebviewUri(P.Uri.joinPath(this._extensionUri,"resources","logo.png"));if(this.conflictState){this.webviewView.webview.html=xt(e,this.conflictState);return}switch(this.currentPage){case"blame":this.webviewView.webview.html=kt(this.blameDataCache);break;case"jira":this.webviewView.webview.html=Ct(this.jiraDataCache);break;case"dashboard":this.webviewView.webview.html=$t({data:this.dashboardDataCache,showBranches:this.dashboardShowBranches});break;case"devtools":this.webviewView.webview.html=Rt();break;default:this.webviewView.webview.html=zt({logoUri:e,currentBranch:this.currentBranchCache,currentBranchIsMerged:this.currentBranchIsMergedCache,relatedBranches:this.relatedBranchesCache,commits:this.commitsCache,baseBranches:this.baseBranchesCache,recentTickets:this.recentTicketsCache,ticketTitle:this.ticketTitleCache,ticketStatus:this.ticketStatusCache,autoRefreshEnabled:this.autoRefreshEnabled});break}}};var X,Oe,je;function Pt(t){X=t.secrets,X.get("ricwiz.jiraApiToken").then(e=>Oe=e),X.get("ricwiz.gitlabApiToken").then(e=>je=e)}async function Bt(t){if(!X)throw new Error("SecretStorage is not initialized.");Oe=t,await X.store("ricwiz.jiraApiToken",t)}async function Ke(){if(Oe)return Oe;if(!X)throw new Error("SecretStorage is not initialized.");let t=await X.get("ricwiz.jiraApiToken");return t&&(Oe=t),t}async function St(t){if(!X)throw new Error("SecretStorage is not initialized.");je=t,await X.store("ricwiz.gitlabApiToken",t)}async function xe(){if(je)return je;if(!X)throw new Error("SecretStorage is not initialized.");let t=await X.get("ricwiz.gitlabApiToken");return t&&(je=t),t}var y=k(require("vscode"));var J=k(require("vscode")),et=k(require("path")),we=k(require("fs"));var Ie=k(require("vscode")),Dt=k(require("child_process")),Tt=k(require("util")),Vo=Tt.promisify(Dt.exec),R=Ie.window.createOutputChannel("Ricwiz"),g=async(t,e)=>{R.appendLine(`[EXEC] ${t}`);let o=await Vo(t,{maxBuffer:50*1024*1024,...e});return{stdout:o.stdout.toString(),stderr:o.stderr.toString()}};function z(){let t=Ie.workspace.workspaceFolders;if(t)return t[0].uri.fsPath}async function A(t){try{let{stdout:e}=await g("git branch --show-current",{cwd:t});return e.trim()}catch{return""}}function le(t,e){if(!t.includes(e)){let o=t.match(/([A-Z]+-)\d+/i);if(o)return o[1].toUpperCase()}return e}function me(t,e,o=!1){let s=t.match(new RegExp(`(${e}\\d+)`,"i"));return s?s[1].toUpperCase():t.includes(e)&&!t.includes("-to-")?t.substring(t.indexOf(e)):o&&t.includes("-to-")?t.substring(t.indexOf(e)).split("-to-")[0]:""}function ct(t,e){let o=ke(t);return/^\d/.test(o)?`${e}${o}`.toUpperCase():o.toUpperCase()}async function V(t,e){let o=Ie.workspace.getConfiguration("ricwiz"),s=e?.prefix??o.get("ticketPrefix","SFPSCA-"),i=await A(t),p=le(i,s),n=e?.suggestedValue??me(i,p,e?.handleToSuffix),c=await Ie.window.showInputBox({prompt:e?.prompt||"Enter the full ticket ID (e.g., SCPSCA-1234) or just the number",placeHolder:e?.placeHolder||"Ticket ID or number",value:n,ignoreFocusOut:!0});return c?{ticketId:ct(c,p),currentBranch:i,prefix:p}:void 0}async function re(t,e){try{return await g(`git show-ref --verify --quiet refs/heads/${e}`,{cwd:t}),!0}catch{}return await _o(t,e)}async function _o(t,e){try{let{stdout:o}=await g(`git branch -r --list "*/${e}"`,{cwd:t});return o.trim().length>0}catch{return!1}}function ke(t){return t.replace(/[&|;$><`\\!"'\r\n]/g,"").trim()}var Ce=k(require("vscode")),Et=k(require("path")),Ze=k(require("fs"));var S=class t{style;upstreamRemote;originRemote;ticketSourceBranch;ticketPrefix;branchPrefix;environments;activeProfile;profileName;constructor(e){this.activeProfile=e,this.profileName=e?.name;let o=Ce.workspace.getConfiguration("ricwiz");this.style=e?.workflowStyle||o.get("workflowStyle","standard"),this.style==="multi-remote"?(this.upstreamRemote=e?.upstreamRemote||o.get("upstreamRemote","salesforce-master"),this.originRemote=e?.originRemote||o.get("originRemote","origin")):(this.upstreamRemote="origin",this.originRemote="origin"),this.ticketSourceBranch=e?.ticketSourceBranch||o.get("ticketSourceBranch","main"),this.ticketPrefix=e?.ticketPrefix||o.get("ticketPrefix","SFPSCA-"),this.branchPrefix=e?.branchPrefix??o.get("branchPrefix","");let s=[{name:"Qual",sourceBranch:"quality"},{name:"Val",sourceBranch:"validation"},{name:"Prod",sourceBranch:"main"}];this.environments=e?.environments||o.get("environments",s)}getConfig(e,o){return this.activeProfile&&this.activeProfile[e]!==void 0?this.activeProfile[e]:Ce.workspace.getConfiguration("ricwiz").get(e,o)}static async initialize(e,o){let i=Ce.workspace.getConfiguration("ricwiz").get("profiles",[]),p=Et.join(e,"ricwiz.json");if(Ze.existsSync(p))try{let n=Ze.readFileSync(p,"utf-8"),c=JSON.parse(n);c&&Array.isArray(c.profiles)&&(i=[...i,...c.profiles])}catch(n){Ce.window.showErrorMessage(`Ricwiz: Error parsing ricwiz.json: ${n.message}`)}if(i.length>0){if(!o?.forcePrompt)try{let{stdout:d}=await g("git branch --show-current",{cwd:e}),r=d.trim(),m=r;r.includes("-to-")&&(m=r.split("-to-")[0]);let{stdout:l}=await g(`git config branch.${m}.ricwiz-profile`,{cwd:e}),u=l.trim();if(u){let f=i.find(h=>h.name===u);if(f)return new t(f)}}catch{}if(o?.skipPrompt)return new t;let n=i.map(d=>d.name),c=await Ce.window.showQuickPick(n,{placeHolder:"Ricwiz: Select Workflow Profile",ignoreFocusOut:!0});if(!c)return;let a=i.find(d=>d.name===c);return new t(a)}return new t}buildUpstreamPath(e){return e.includes("/")?e:`${this.upstreamRemote}/${e}`}getFetchRemote(e){return e.includes("/")?e.split("/")[0]:this.upstreamRemote}getFetchBranch(e){return e.includes("/")?e.substring(e.indexOf("/")+1):e}};function Xe(t){let e=t.replace(/\\/g,"/");if(e.includes("/classes/")){let o=e.match(/\/classes\/([^/.]+)\.cls/);if(o)return{type:"ApexClass",name:o[1]}}if(e.includes("/triggers/")){let o=e.match(/\/triggers\/([^/.]+)\.trigger/);if(o)return{type:"ApexTrigger",name:o[1]}}if(e.includes("/lwc/")){let o=e.match(/\/lwc\/([^/]+)\//);if(o)return{type:"LightningComponentBundle",name:o[1]}}if(e.includes("/aura/")){let o=e.match(/\/aura\/([^/]+)\//);if(o)return{type:"AuraDefinitionBundle",name:o[1]}}if(e.includes("/objects/")&&e.includes("/fields/")){let o=e.match(/\/objects\/([^/]+)\//),s=e.match(/\/fields\/([^/.]+)\.field/);if(o&&s)return{type:"CustomField",name:`${o[1]}.${s[1]}`}}if(e.includes("/objects/")){let o=e.match(/\/objects\/([^/.]+)\.object/);if(o)return{type:"CustomObject",name:o[1]}}if(e.includes("/layouts/")){let o=e.match(/\/layouts\/([^/.]+)\.layout/);if(o)return{type:"Layout",name:o[1]}}if(e.includes("/flows/")){let o=e.match(/\/flows\/([^/.]+)\.flow/);if(o)return{type:"Flow",name:o[1]}}if(e.includes("/permissionsets/")){let o=e.match(/\/permissionsets\/([^/.]+)\.permissionset/);if(o)return{type:"PermissionSet",name:o[1]}}if(e.includes("/permissionsetgroups/")){let o=e.match(/\/permissionsetgroups\/([^/.]+)\.permissionsetgroup/);if(o)return{type:"PermissionSetGroup",name:o[1]}}if(e.includes("/profiles/")){let o=e.match(/\/profiles\/([^/.]+)\.profile/);if(o)return{type:"Profile",name:o[1]}}if(e.includes("/customMetadata/")){let o=e.match(/\/customMetadata\/([^/.]+)\.md/);if(o)return{type:"CustomMetadata",name:o[1]}}if(e.includes("/flexipages/")){let o=e.match(/\/flexipages\/([^/.]+)\.flexipage/);if(o)return{type:"FlexiPage",name:o[1]}}return null}async function Mt(){let t=z();if(!t){J.window.showErrorMessage("Ricwiz: Open a workspace that is a Git repository.");return}let e=await S.initialize(t,{skipPrompt:!0}),o=e?e.ticketSourceBranch:J.workspace.getConfiguration("ricwiz").get("ticketSourceBranch","main"),s=e?e.originRemote:"origin";await J.window.withProgress({location:J.ProgressLocation.Notification,title:`Ricwiz: Finding deleted files compared to ${s}/${o}...`,cancellable:!1},async()=>{try{let{stdout:i}=await g(`git diff --name-only --diff-filter=D ${s}/${o}...HEAD`,{cwd:t}),p=i.split(`
`).map(u=>u.trim()).filter(u=>u.length>0);if(p.length===0){J.window.showInformationMessage(`Ricwiz: No deleted files found compared to ${s}/${o}.`);return}let n={},c=(u,f)=>{n[u]||(n[u]=[]),n[u].includes(f)||n[u].push(f)};for(let u of p){let f=Xe(u);f&&c(f.type,f.name)}if(Object.keys(n).length===0){J.window.showInformationMessage("Ricwiz: Found deleted files in Git, but none mapped to recognizable Salesforce metadata.");return}let a=`<?xml version="1.0" encoding="UTF-8"?>
<Package xmlns="http://soap.sforce.com/2006/04/metadata">
`;for(let u of Object.keys(n).sort()){a+=`    <types>
`;for(let f of n[u].sort())a+=`        <members>${f}</members>
`;a+=`        <name>${u}</name>
    </types>
`}a+=`    <version>58.0</version>
</Package>`;let d=et.join(t,"destructiveChanges");we.existsSync(d)||we.mkdirSync(d);let r=et.join(d,"destructiveChanges.xml"),m=et.join(d,"package.xml");we.writeFileSync(r,a,"utf8"),we.existsSync(m)||we.writeFileSync(m,`<?xml version="1.0" encoding="UTF-8"?>
<Package xmlns="http://soap.sforce.com/2006/04/metadata">
    <version>58.0</version>
</Package>`,"utf8");let l=await J.workspace.openTextDocument(r);await J.window.showTextDocument(l),J.window.showInformationMessage("Ricwiz: destructiveChanges.xml generated successfully!")}catch(i){J.window.showErrorMessage(`Ricwiz: Error generating destructive changes: ${i.message}`)}})}var ne=k(require("vscode"));async function Lt(){let t=z();if(!t)return;let e=await S.initialize(t,{skipPrompt:!0}),o=e?e.ticketSourceBranch:ne.workspace.getConfiguration("ricwiz").get("ticketSourceBranch","main"),s=e?e.originRemote:"origin";await ne.window.withProgress({location:ne.ProgressLocation.Notification,title:"Ricwiz: Finding Apex Tests to run...",cancellable:!1},async()=>{try{let{stdout:i}=await g(`git diff --name-status ${s}/${o}...HEAD`,{cwd:t}),p=i.split(`
`).map(u=>u.trim()).filter(u=>u.length>0),n=new Set,c=new Set;for(let u of p){let f=u.split(/\s+/);if(f[0].startsWith("D"))continue;let h=f[1];if(h&&h.endsWith(".cls")){let w=h.match(/\/classes\/([^/.]+)\.cls/);if(w){let $=w[1];$.toLowerCase().endsWith("test")?n.add($):c.add($)}}}for(let u of c)n.add(`${u}Test`);if(n.size===0){ne.window.showInformationMessage("Ricwiz: No Apex Classes were modified in this branch.");return}let a=Array.from(n).map(u=>({label:`$(beaker) ${u}`,description:"Apex Test Class"})),d=await ne.window.showQuickPick(a,{canPickMany:!0,title:"Select Test Classes to Run",placeHolder:"Select tests..."});if(!d||d.length===0)return;let m=`sf apex run test -n ${d.map(u=>u.label.replace("$(beaker) ","").trim()).join(",")} -r human -w 30`,l=ne.window.createTerminal("Ricwiz: Smart Tests");l.show(),l.sendText(m)}catch(i){ne.window.showErrorMessage(`Ricwiz: Error finding tests: ${i.message}`)}})}var M=k(require("vscode"));var $e=class{static isValidShellArg(e){return e?/^[a-zA-Z0-9\-_/.]+$/.test(e):!1}};async function It(t){let e=z();if(!e){M.window.showErrorMessage("Open a folder or workspace that is a Git repository.");return}let o=await S.initialize(e,{forcePrompt:!0});if(!o)return;let s=typeof t=="string"?t:void 0,i=await V(e,{prefix:o.ticketPrefix,suggestedValue:s});if(!i){M.window.showErrorMessage("Branch creation cancelled: Ticket not provided.");return}let{ticketId:p}=i,n=o.environments,c="";if(o.branchPrefix){let f=await M.window.showInputBox({prompt:"Ricwiz: Branch Prefix (leave empty to not use a prefix)",placeHolder:"e.g. CRC-R19-",value:o.branchPrefix,ignoreFocusOut:!0});if(f===void 0){M.window.showInformationMessage("Branch creation cancelled.");return}c=f.trim()}let a=c?`${c}${p}`:p,d=[{label:`$(git-branch) Main Branch (${a})`,description:`Base: ${o.ticketSourceBranch}`,picked:!0,type:"main",branchName:a}];for(let f of n){let h=c?`${c}${p}-to-${f.name}`:`${p}-to-${f.name}`;d.push({label:`$(cloud) ${f.name} (${h})`,description:`Base: ${f.sourceBranch}`,picked:!0,type:"env",branchName:h,envConfig:f})}let r=await M.window.showQuickPick(d,{placeHolder:"Ricwiz: Select branches to create (check/uncheck as needed)",canPickMany:!0,ignoreFocusOut:!0});if(!r||r.length===0){M.window.showInformationMessage("Branch creation cancelled: No branches selected.");return}let m=r.some(f=>f.type==="main"),l=r.filter(f=>f.type==="env").map(f=>({env:f.envConfig,branchName:f.branchName})),u=o.ticketSourceBranch;if(m){let f=[];try{let{stdout:b}=await g('git branch --all --format="%(refname:short)"',{cwd:e});f=b.split(`
`).map(x=>x.trim()).filter(x=>x&&x!=="origin"),f=[...new Set(f)]}catch{}let h=M.window.createQuickPick();h.title=`Ricwiz: Base Source Branch for '${a}'`,h.placeholder="Confirm or change the source branch for this ticket";let w=f.find(b=>b.endsWith(`/${o.ticketSourceBranch}`))??o.ticketSourceBranch;h.value=w,h.ignoreFocusOut=!0;let $=()=>{let b=h.value.trim(),x=[];b&&x.push({label:b,description:"Use typed branch"}),x.push(...f.map(D=>({label:D}))),h.items=x};h.onDidChangeValue($),$();let v=await new Promise(b=>{h.onDidAccept(()=>{let x=h.selectedItems[0];b(x?x.label:h.value),h.hide()}),h.onDidHide(()=>b(void 0)),h.show()});if(!v){M.window.showInformationMessage("Branch creation cancelled.");return}u=v.trim()}if(m&&!$e.isValidShellArg(a)){M.window.showErrorMessage(`Invalid format for ticket ID: ${a}`);return}if(m&&!$e.isValidShellArg(u)){M.window.showErrorMessage(`Invalid format for ticketSourceBranch in settings: ${u}`);return}for(let f of l){if(!$e.isValidShellArg(f.env.name)){M.window.showErrorMessage(`Invalid format for environment name: ${f.env.name}`);return}if(!$e.isValidShellArg(f.env.sourceBranch)){M.window.showErrorMessage(`Invalid format for environment sourceBranch: ${f.env.sourceBranch}`);return}}try{await g("git status",{cwd:e})}catch{M.window.showErrorMessage("The opened folder does not appear to be a valid Git repository.");return}try{await M.window.withProgress({location:M.ProgressLocation.Notification,title:"Ricwiz: Creating Branches",cancellable:!1},async f=>{let h=[];f.report({message:"Checking remote status (git fetch)...",increment:10});try{await g("git fetch",{cwd:e})}catch{}try{if(m){if(f.report({message:`Creating main branch ${a}...`,increment:15}),await re(e,a))M.window.showInformationMessage(`Ricwiz: The branch ${a} already exists. Skipping creation...`),await g(`git checkout ${a}`,{cwd:e});else try{let $=o.getFetchRemote(u),v=o.getFetchBranch(u),b=o.buildUpstreamPath(u);await g(`git fetch ${$} ${v}`,{cwd:e}),await g(`git checkout -b ${a} ${b}`,{cwd:e}),h.push(a)}catch{try{await g(`git checkout -b ${a} ${u}`,{cwd:e}),h.push(a)}catch{throw new Error(`Could not create main branch '${a}' from '${u}'. Does the source branch exist?`)}}try{await g(`git config branch.${a}.ricwiz-source "${u}"`,{cwd:e}),o.profileName&&await g(`git config branch.${a}.ricwiz-profile "${o.profileName}"`,{cwd:e})}catch{}}if(l.length>0){let $=50/(l.length||1);for(let v of l){let b=v.branchName,x=v.env.sourceBranch;if(f.report({message:`Processing environment branch ${b}...`,increment:$}),!await re(e,b))try{let D=o.getFetchRemote(x),E=o.getFetchBranch(x),B=o.buildUpstreamPath(x);await g(`git fetch ${D} ${E}`,{cwd:e}),await g(`git checkout -b ${b} ${B}`,{cwd:e}),h.push(b)}catch{try{await g(`git checkout -b ${b} ${x}`,{cwd:e}),h.push(b)}catch{throw new Error(`Could not create environment branch '${b}' from '${x}'. Does the source branch exist?`)}}}}f.report({message:`Publishing branches to ${o.originRemote}...`,increment:15});for(let $ of h)try{await g(`git push -u ${o.originRemote} ${$}`,{cwd:e})}catch{M.window.showWarningMessage(`Ricwiz: Branch ${$} was created locally but could not be pushed to ${o.originRemote}.`)}let w=m?a:l[0]?.branchName||"";if(w){f.report({message:`Switching to ${w}...`,increment:10});try{await g(`git checkout ${w}`,{cwd:e})}catch{}}f.report({increment:100}),M.window.showInformationMessage("Ricwiz: All set! You can start working on your branches! \u{1F680}")}catch(w){if(M.window.showErrorMessage(`Ricwiz Branch Creation Failed: ${w.message}`),h.length>0){try{await g(`git checkout ${u}`,{cwd:e})}catch{}for(let $ of h)try{await g(`git branch -D ${$}`,{cwd:e})}catch{}M.window.showWarningMessage(`Ricwiz: Rolled back (deleted) ${h.length} branch(es) locally due to failure.`)}}})}catch(f){M.window.showErrorMessage(`Ricwiz general error: ${f.message}`)}}var F=k(require("vscode"));var ve=k(require("vscode")),Ne=k(require("fs")),Je=k(require("path"));var lt;function dt(t){lt=t}async function At(t){lt&&await lt(t)}async function Re(t,e,o,s,i){s&&s.report({message:"CONFLICT! Resolve & click 'Commit & Continue' in Ricwiz panel."});let p=!1,n=!1;i&&i.onCancellationRequested(()=>{n=!0});let c=async()=>{try{let{stdout:r}=await g("git status --porcelain",{cwd:t});return r.split(`
`).filter(m=>{let l=m.substring(0,2);return["UD","DU","DD","AU","UA"].includes(l)}).map(m=>m.substring(3).trim())}catch{return[]}},a=async()=>{try{let r=l=>l==="UU"?"Both Modified":l==="UD"?"Deleted by them":l==="DU"?"Deleted by us":l==="DD"?"Both Deleted":l==="AA"?"Both Added":l==="AU"?"Added by us":l==="UA"?"Added by them":"Conflicted",{stdout:m}=await g("git status --porcelain",{cwd:t});return m.split(`
`).map(l=>l.trimEnd()).filter(l=>l.length>2).filter(l=>{let u=l.substring(0,2);return["UU","AA","UD","DU","AU","UA","DD"].includes(u)}).map(l=>{let u=l.substring(0,2);return{file:l.substring(3).trim(),state:r(u)}})}catch{return[]}},d=async()=>{if(p)return;let r=await c(),m=await a();se&&se.setConflictState({isConflict:!0,sourceStr:e,targetStr:o,deletionsCount:r.length,files:m})};for(dt(async r=>{if(r==="abortDeploy")n=!0;else if(r==="resolveDeletions"){try{let l=(await c()).map(f=>({label:f})),u=await ve.window.showQuickPick(l,{canPickMany:!0,placeHolder:"Select conflicted files to DELETE",title:"Ricwiz: Delete Conflicted Files"});if(u&&u.length>0){for(let f of u)try{await g(`git rm --force "${f.label}"`,{cwd:t})}catch{}ve.window.showInformationMessage(`Ricwiz: Deleted ${u.length} conflicted file(s).`)}}catch(m){ve.window.showErrorMessage(`Ricwiz: Error. (${m.message})`)}d()}else if(r==="commitAndContinue")try{let l=(await c()).filter(f=>Ne.existsSync(Je.join(t,f)));if(l.length>0&&await ve.window.showWarningMessage(`Wait! There are ${l.length} file(s) with deletion conflicts that are still on your disk.

If you commit now, you will KEEP them in the project.

Are you sure you want to KEEP them?`,{modal:!0},"Yes, KEEP them","No, let me DELETE them")!=="Yes, KEEP them"){d();return}let u=!1;try{let{stdout:f}=await g('git grep -E "^<<<<<<< "',{cwd:t});f.trim().length>0&&(u=!0)}catch{}if(u){ve.window.showErrorMessage("Ricwiz: You still have unresolved conflict markers (<<<<<<<) in your files. Please resolve them first!"),d();return}await g("git add .",{cwd:t}),await g("git commit --no-edit",{cwd:t})}catch(m){ve.window.showErrorMessage(`Ricwiz: Could not commit automatically. (${m.message})`),d()}}),d();;){if(n){p=!0,dt(void 0),se?.setConflictState(null);try{await g("git merge --abort",{cwd:t})}catch{}return!1}try{let{stdout:r}=await g("git status --porcelain",{cwd:t}),m=r.split(`
`).some(w=>{let $=w.substring(0,2);return["UU","AA","UD","DU","AU","UA","DD"].includes($)}),l=Je.join(t,".git","MERGE_HEAD"),u=Je.join(t,".git","REBASE_HEAD"),f=Je.join(t,".git","CHERRY_PICK_HEAD");if(!(m||Ne.existsSync(l)||Ne.existsSync(u)||Ne.existsSync(f)))return p=!0,dt(void 0),se?.setConflictState(null),ve.window.showInformationMessage("Ricwiz: Changes committed!"),!0}catch{}await new Promise(r=>setTimeout(r,2e3))}}var tt=k(require("https")),Ft=k(require("vscode"));async function ut(){let t=await xe();return!!(t&&t.trim())}async function Qo(t,e){let o=Ft.workspace.getConfiguration("ricwiz"),s=(await xe())?.trim();if(!s)throw new Error("No GitLab token");let i=e?e.getConfig("gitlabUrlOverride",""):o.get("gitlabUrlOverride",""),p=[];if(i&&i.trim()!=="")p.push(i.trim());else try{let{stdout:c}=await g("git remote",{cwd:t}),a=c.split(`
`).map(r=>r.trim()).filter(r=>r),d=[];e&&e.upstreamRemote&&a.includes(e.upstreamRemote)&&d.push(e.upstreamRemote),e&&e.originRemote&&e.originRemote!==e.upstreamRemote&&a.includes(e.originRemote)&&d.push(e.originRemote),a.includes("upstream")&&!d.includes("upstream")&&d.push("upstream"),a.includes("origin")&&!d.includes("origin")&&d.push("origin"),d.length===0&&a.length>0&&d.push(...a);for(let r of d)try{let{stdout:m}=await g(`git remote get-url ${r}`,{cwd:t}),l=m.trim();l.endsWith(".git")&&(l=l.slice(0,-4)),l.startsWith("git@")&&(l=l.replace("git@","").replace(":","/"),l=`https://${l}`),p.push(l)}catch(m){R.appendLine(`[GitLab API] Error getting remote URL for ${r}: ${m.message}`)}}catch(c){R.appendLine(`[GitLab API] Error getting remotes: ${c.message}`)}if(p.length===0)throw R.appendLine("[GitLab API] No candidate URLs found in getGitlabTargets!"),new Error("Could not get any remote origin URL.");return p.map(c=>{let a=new URL(c),d=`${a.protocol}//${a.host}`,r=a.pathname;r.startsWith("/")&&(r=r.substring(1)),r.endsWith("/")&&(r=r.slice(0,-1)),r.endsWith(".git")&&(r=r.slice(0,-4));let m=encodeURIComponent(r);return{baseUrl:d,token:s,projectPath:m}})}var Yo=new tt.Agent({keepAlive:!0,maxSockets:10});async function mt(t,e,o,s){let i=new URL(`${t}${s}`);return R.appendLine(`[GitLab API] ${o} ${i.toString()}`),new Promise((p,n)=>{let c=tt.request(i,{method:o,timeout:5e3,agent:Yo,headers:{"PRIVATE-TOKEN":e,Accept:"application/json"}},a=>{let d="";a.on("data",r=>d+=r),a.on("end",()=>{if(R.appendLine(`[GitLab API] Response Code: ${a.statusCode}`),a.statusCode&&a.statusCode>=400)return R.appendLine(`[GitLab API] Error Data: ${d}`),n(new Error(`GitLab API error: ${a.statusCode}`));if(!d)return p({});try{let r=JSON.parse(d);Array.isArray(r)?R.appendLine(`[GitLab API] Returned array with ${r.length} items`):r&&typeof r=="object"&&R.appendLine(`[GitLab API] Returned object with id ${r.id||r.iid||"unknown"}`),p(r)}catch(r){R.appendLine(`[GitLab API] Parse Error: ${r.message}`),n(r)}})});c.on("timeout",()=>{c.destroy(),n(new Error("GitLab request timed out"))}),c.on("error",a=>{R.appendLine(`[GitLab API] Request Failed: ${a.message}`),n(a)}),c.end()})}var pt=new Map,Ko=30*1e3;async function gt(t,e,o,s){R.appendLine(`[GitLab API] fetchMergeRequestStatus called for source: ${e}, target: ${o||"any"}`);let i=`${t}:${e}:${o||"any"}`,p=pt.get(i);if(p&&Date.now()-p.timestamp<Ko)return p.data;try{let n=await Qo(t,s),c=null,a=-1;for(let d of n)try{let r=`/api/v4/projects/${d.projectPath}/merge_requests?source_branch=${encodeURIComponent(e)}&order_by=updated_at&sort=desc`;o&&(r+=`&target_branch=${encodeURIComponent(o)}`);let m=await mt(d.baseUrl,d.token,"GET",r);if(m&&m.length>0){let l=m[0];try{let w=await mt(d.baseUrl,d.token,"GET",`/api/v4/projects/${d.projectPath}/merge_requests/${l.iid}`);w&&(l=w)}catch{}let u="none";if(l.head_pipeline&&l.head_pipeline.status){let w=l.head_pipeline.status;w==="success"||w==="failed"||w==="canceled"||w==="skipped"?u=w:u="running"}let f={isMerged:l.state==="merged",isOpen:l.state==="opened",pipelineStatus:u,webUrl:l.web_url,projectPath:d.projectPath,pipelineId:l.head_pipeline?l.head_pipeline.id:void 0},h=0;f.isOpen?h=2:f.isMerged&&(h=1),h>a&&(c=f,a=h)}}catch(r){R.appendLine(`[GitLab API] Error inside target loop: ${r.message}`)}if(c)return pt.set(i,{data:c,timestamp:Date.now()}),c;for(let d of n)try{let r=`/api/v4/projects/${d.projectPath}/pipelines?ref=${encodeURIComponent(e)}&order_by=updated_at&sort=desc`,m=await mt(d.baseUrl,d.token,"GET",r);if(m&&m.length>0){let l=m[0],u="none";if(l.status){let h=l.status;h==="success"||h==="failed"||h==="canceled"||h==="skipped"?u=h:u="running"}let f={isMerged:!1,isOpen:!1,pipelineStatus:u,webUrl:l.web_url,projectPath:d.projectPath,pipelineId:l.id};return pt.set(i,{data:f,timestamp:Date.now()}),f}}catch{}return null}catch(n){return R.appendLine(`[GitLab API] Failed to fetch MR status: ${n.message}`),null}}function Ut(t,e){return e.find(o=>t.endsWith(`-to-${o.name}`))}async function ze(t,e,o,s,i){let p=await ut(),n=e.map(async c=>{let a=Ut(c,s);if(p){let d=a?a.sourceBranch:void 0,r=await gt(t,c,d,i);if(r)return{name:c,isMerged:r.isMerged,pipelineStatus:r.pipelineStatus,mrUrl:r.webUrl,projectPath:r.projectPath,pipelineId:r.pipelineId}}else R.appendLine(`[GitLab API] Skipping MR check for ${c} because hasGitlabToken() is false`);return{name:c,isMerged:!1,pipelineStatus:"none"}});return await Promise.all(n)}async function Ot(t,e,o,s){let i=Ut(e,o);if(!i)return!1;if(await ut()){let p=await gt(t,e,i.sourceBranch,s);if(p)return p.isMerged}else R.appendLine(`[GitLab API] Skipping MR check for current branch ${e} because hasGitlabToken() is false`);return!1}async function jt(t,e=10){try{let{stdout:o}=await g(`git log --oneline -${e} --format="%h|||%s|||%ar"`,{cwd:t});return o.split(`
`).filter(s=>s.trim()).map(s=>{let i=s.split("|||");return{hash:i[0]||"",message:i.length>=3?i.slice(1,-1).join("|||"):i[1]||"",timeAgo:i.length>=3?i[i.length-1]:""}})}catch{return[]}}async function Nt(t,e=3){try{let{stdout:o}=await g('git for-each-ref --sort=-committerdate --format="%(refname:short)" refs/heads/',{cwd:t}),s=o.split(`
`).map(p=>p.trim()).filter(p=>p),i=/^[A-Z]+-\d+$/i;return s.filter(p=>i.test(p)).slice(0,e)}catch{return[]}}async function Pe(t,e,o){let{stdout:s}=await g(`git branch --all --list "*${e}*"`,{cwd:t}),i=new Set,p=new RegExp(`${e}(?!\\d)`,"i");return s.split(`
`).forEach(n=>{let c=n.replace("*","").trim();if(c){if(c.startsWith("remotes/")){let a=c.split("/");a.length>2&&(c=a.slice(2).join("/"))}c&&c!==o&&!c.includes("HEAD")&&p.test(c)&&i.add(c)}}),Array.from(i)}async function ae(t,e,o){try{let{stdout:s}=await g(`git branch --all --list "*${e}*"`,{cwd:t}),i=new RegExp(`${e}(?!\\d)`,"i"),p=s.split(`
`).map(c=>c.replace("*","").trim().replace(/^remotes\/[^\/]+\//,"")).filter(c=>c&&!c.includes("HEAD")&&i.test(c)),n=Array.from(new Set(p));if(o){let c=`-to-${o}`,a=n.find(d=>d.endsWith(c));return a||`${e}${c}`}else{let c=n.find(a=>!a.includes("-to-"));return c||e}}catch{return o?`${e}-to-${o}`:e}}async function Jt(){let t=z();if(!t){F.window.showErrorMessage("Ricwiz: Open a folder or workspace that is a Git repository.");return}try{await g("git status",{cwd:t})}catch{F.window.showErrorMessage("Ricwiz: The opened folder does not appear to be a valid Git repository.");return}let e=await S.initialize(t);if(!e)return;let o=e.environments,s=await V(t,{prefix:e.ticketPrefix});if(!s){F.window.showErrorMessage("Operation cancelled: Ticket not provided.");return}let{ticketId:i,currentBranch:p}=s;try{await g("git fetch --all",{cwd:t})}catch{}let n=await ae(t,i);if(!await re(t,n)){F.window.showErrorMessage(`Ricwiz: Main branch '${n}' does not exist! Prepare deploy is only available when a main ticket branch is used.`);return}let c=[];for(let l of o){let u=await ae(t,i,l.name);await re(t,u)&&c.push({env:l,branchName:u})}let a=c.length===0,d="";if(a){let l="";try{let{stdout:f}=await g(`git config branch.${n}.ricwiz-source`,{cwd:t});l=f.trim()}catch{}if(!l&&n.includes(i)&&n!==i){let f=n.split(i)[0].replace(/[-_]+$/,"");f&&(l=f)}l||(l=e.ticketSourceBranch||"main");let u=await F.window.showInputBox({prompt:`Ricwiz: Confirm or enter the Release branch in '${e.originRemote}' to merge into '${n}'`,placeHolder:"e.g. CRC-R19, main, release/v5.0",value:l,ignoreFocusOut:!0});if(u===void 0||!u.trim()){F.window.showInformationMessage("Ricwiz: Prepare deploy cancelled.");return}d=u.trim();try{await g(`git config branch.${n}.ricwiz-source "${d}"`,{cwd:t})}catch{}}let r=e.getConfig("defaultReviewers",""),m="";try{let{stdout:l}=await g(`git config branch.${n}.ricwiz-reviewers`,{cwd:t});m=l.trim()}catch{}if(r.trim()){let l=await F.window.showInputBox({prompt:"Ricwiz: Reviewers for this deploy (optional, comma-separated)",placeHolder:"e.g. @joao, 123456",value:m||r,ignoreFocusOut:!0});if(l===void 0)return;try{l.trim()?await g(`git config branch.${n}.ricwiz-reviewers "${l.trim()}"`,{cwd:t}):m&&await g(`git config --unset branch.${n}.ricwiz-reviewers`,{cwd:t})}catch{}}await F.window.withProgress({location:F.ProgressLocation.Notification,title:"Ricwiz: Preparing Deploy",cancellable:!0},async(l,u)=>{let f=0,h=p,w=!1;u.onCancellationRequested(()=>{w=!0});let $=async(v,b)=>{try{await g(`git merge ${v}`,{cwd:t})}catch(x){let D=!1;try{let{stdout:B}=await g("git ls-files -u",{cwd:t});B.trim().length>0&&(D=!0)}catch{}let E=((x.stdout||"")+(x.stderr||"")+(x.message||"")).toLowerCase();if(D||E.includes("conflict")||E.includes("conflit")){if(!await Re(t,v,b,l,u))throw w=!0,new Error("Deploy aborted by user.")}else throw x}};if(a)try{l.report({message:`Fetching ${d} from ${e.originRemote}...`,increment:15}),await g(`git fetch ${e.originRemote} ${d}`,{cwd:t}),l.report({message:`Switching to ${n}...`,increment:15}),await g(`git checkout ${n}`,{cwd:t});try{await g(`git pull ${e.originRemote} ${n}`,{cwd:t})}catch{}if(l.report({message:`Merging ${e.originRemote}/${d} into ${n}...`,increment:35}),await $(`${e.originRemote}/${d}`,n),w)return;l.report({message:`Pushing ${n} to ${e.originRemote}...`,increment:25}),await g(`git push ${e.originRemote} ${n}`,{cwd:t}),l.report({message:"Finishing up...",increment:10}),F.window.showInformationMessage(`Ricwiz: Release branch '${d}' merged into '${n}' and pushed to ${e.originRemote}! \u{1F680}`)}catch(v){v.message?.includes("aborted")?F.window.showInformationMessage("Ricwiz: Deploy cancelled."):F.window.showErrorMessage(`Ricwiz: Failed to prepare release ticket ${n}. Detail: ${v.message}`)}else{l.report({message:"Syncing remote information...",increment:10});try{let b=10/(c.length||1);for(let x of c)try{if(w)throw new Error("Aborted");l.report({message:`Fetching ${x.env.sourceBranch}...`,increment:b});let D=e.getFetchRemote(x.env.sourceBranch),E=e.getFetchBranch(x.env.sourceBranch);await g(`git fetch ${D} ${E}`,{cwd:t})}catch{}}catch{}let v=60/(c.length||1);for(let b of c){if(w)break;let x=b.branchName,D=b.env.sourceBranch;try{l.report({message:`Processing ${x}...`,increment:v/4}),await g(`git checkout ${x}`,{cwd:t});try{await g(`git pull ${e.originRemote} ${x}`,{cwd:t})}catch{}l.report({message:`Merging ${D} into ${x}...`,increment:v/4});let E=e.getFetchRemote(D),B=e.getFetchBranch(D),U=e.buildUpstreamPath(D);if(await g(`git fetch ${E} ${B}`,{cwd:t}),await $(U,x),l.report({message:`Merging ${n} into ${x}...`,increment:v/4}),await $(n,x),w)break;l.report({message:`Pushing ${x}...`,increment:v/4}),await g(`git push ${e.originRemote} ${x}`,{cwd:t}),f++}catch(E){E.message.includes("aborted")?F.window.showInformationMessage("Ricwiz: Deploy cancelled."):F.window.showErrorMessage(`Ricwiz: Failed to process branch ${x}. Detail: ${E.message}`);return}}if(!w){l.report({message:"Finishing up...",increment:10});let b=h;try{await g(`git show-ref --verify --quiet refs/heads/${n}`,{cwd:t}),b=n}catch{}try{let x=await A(t);b&&b!==x?(await g(`git checkout ${b}`,{cwd:t}),F.window.showInformationMessage(`Ricwiz: Operation complete. Back on branch ${b}.`)):F.window.showInformationMessage("Ricwiz: Operation complete.")}catch{F.window.showInformationMessage("Ricwiz: Operation complete.")}}}})}var ee=k(require("vscode"));async function Wt(t=!1){let e=z();if(!e)return;let o=await S.initialize(e);if(!o)return;let s=await V(e,{prefix:o.ticketPrefix,prompt:"Enter the full ticket ID for the Merge Requests (e.g., SFPSCA-1234) or just the number"});if(!s)return;let{ticketId:i}=s,p=o.getConfig("gitlabUrlOverride",""),n="";if(p&&p.trim()!=="")n=p.trim().replace(/\/+$/,"");else{let r="";try{let m=o.originRemote||"origin",{stdout:l}=await g(`git remote get-url ${m}`,{cwd:e});r=l.trim()}catch{ee.window.showErrorMessage("Ricwiz: Could not get the remote origin URL. Please configure the URL manually in the extension settings.");return}n=r,n.endsWith(".git")&&(n=n.slice(0,-4)),n.startsWith("git@")?(n=n.replace("git@","").replace(":","/"),n=`https://${n}`):n.startsWith("ssh://git@")&&(n=n.replace("ssh://git@","https://"))}let c=[],a=await ae(e,i),d=[];for(let r of o.environments){let m=await ae(e,i,r.name);await re(e,m)&&d.push({envName:r.name,source:m,target:r.sourceBranch})}if(d.length===0){let r="";try{if(a){let{stdout:u}=await g(`git config branch.${a}.ricwiz-source`,{cwd:e});u.trim()&&(r=u.trim())}}catch{}if(!r&&a.includes(i)&&a!==i){let u=a.split(i)[0].replace(/[-_]+$/,"");u&&(r=u)}r||(r=o.ticketSourceBranch||"main");let m=await ee.window.showInputBox({prompt:`Ricwiz: Confirm or enter the Target Release branch in GitLab for '${a}'`,placeHolder:"e.g. CRC-R19, main, release/v5.0",value:r,ignoreFocusOut:!0});if(m===void 0||!m.trim()){ee.window.showInformationMessage("Ricwiz: Merge request creation cancelled.");return}let l=m.trim();try{await g(`git config branch.${a}.ricwiz-source "${l}"`,{cwd:e})}catch{}c.push({source:a,target:l})}else for(let r of d)c.push({source:r.source,target:r.target});for(let r of c){let m=`${n}/-/merge_requests/new?merge_request[source_branch]=${encodeURIComponent(r.source)}&merge_request[target_branch]=${encodeURIComponent(r.target)}`;t?ee.commands.executeCommand("simpleBrowser.show",m):ee.env.openExternal(ee.Uri.parse(m))}ee.window.showInformationMessage(`Ricwiz: Opening ${c.length} Merge Request(s) in ${t?"VS Code browser":"external browser"}!`)}async function Gt(){return Wt(!1)}async function Ht(){return Wt(!0)}var te=k(require("vscode"));async function qt(t=!1){let e=z();if(!e)return;let o=te.workspace.getConfiguration("ricwiz"),s=o.get("jiraUrl","");if(!s||s.trim()===""){te.window.showErrorMessage("Ricwiz: Jira URL is not configured. Please set it in the extension settings (e.g., https://jira.company.com/browse/).");return}let i=await A(e),p=o.get("ticketPrefix","SFPSCA-"),n=le(i,p),a=me(i,n,!0);if(a)a=ct(a,n);else{let r=await V(e,{prompt:"Ricwiz could not detect the ticket from the branch name. Enter Jira ticket ID (e.g. SFPSCA-1234)",handleToSuffix:!0});if(!r)return;a=r.ticketId}let d=s.trim();d.endsWith("/")||(d+="/"),d+=a,t?te.commands.executeCommand("simpleBrowser.show",d):te.env.openExternal(te.Uri.parse(d)),te.window.showInformationMessage(`Ricwiz: Opening Jira Ticket ${a} in ${t?"VS Code":"browser"}!`)}async function Vt(){return qt(!1)}async function _t(){return qt(!0)}var _=k(require("vscode"));var Qt=k(require("https")),Yt=k(require("vscode"));async function Kt(){let t=Yt.workspace.getConfiguration("ricwiz"),e=t.get("jiraUrl",""),o=t.get("jiraEmail","")?.trim(),s=(await Ke())?.trim();if(!e||!s)throw new Error(`[v5.1.2] Jira API Token is not securely configured. URL: "${e}", hasToken: ${!!s}`);let i=e;i.includes("/browse")&&(i=i.split("/browse")[0]),i.endsWith("/")&&(i=i.slice(0,-1));let p=o?`Basic ${Buffer.from(`${o}:${s}`).toString("base64")}`:`Bearer ${s}`;return{baseUrl:i,headerAuth:p}}async function Be(t,e,o){let{baseUrl:s,headerAuth:i}=await Kt(),p=new URL(`${s}${e}`);return new Promise((n,c)=>{let a=Qt.request(p,{method:t,headers:{Authorization:i,Accept:"application/json",...o?{"Content-Type":"application/json"}:{}}},d=>{let r="";d.on("data",m=>r+=m),d.on("end",()=>{if(d.statusCode===401||d.statusCode===403)return c(new Error(`Authentication failed (HTTP ${d.statusCode}). Please check your Jira settings.`));if(d.statusCode&&d.statusCode>=400){let m="";try{let l=JSON.parse(r);l.errorMessages&&l.errorMessages.length>0&&(m=l.errorMessages.join(", "))}catch{}return d.statusCode===404||d.statusCode===410?c(new Error(`Ticket not found or deleted (HTTP ${d.statusCode}). ${m}`)):c(new Error(`Jira API returned HTTP status ${d.statusCode}. ${m}`))}if(!r)return n({});try{let m=JSON.parse(r);n(m)}catch{c(new Error("Failed to parse Jira response."))}})});a.on("error",d=>c(new Error(`Network error: ${d.message}`))),o&&a.write(JSON.stringify(o)),a.end()})}async function Ae(t){let{baseUrl:e}=await Kt(),o=await Be("GET",`/rest/api/2/issue/${t}`);return o&&o.fields?{summary:o.fields.summary||"",description:o.fields.description||"No description provided.",status:o.fields.status?.name||"Unknown",url:`${e}/browse/${t}`}:null}async function Zt(t){let e=await Be("GET",`/rest/api/2/issue/${t}/transitions`);return e&&e.transitions?e.transitions.map(o=>({id:o.id,name:o.name})):[]}async function Xt(t,e){await Be("POST",`/rest/api/2/issue/${t}/transitions`,{transition:{id:e}})}async function eo(t,e){await Be("POST",`/rest/api/2/issue/${t}/comment`,{body:e})}async function to(t,e){await Be("PUT",`/rest/api/2/issue/${t}`,{update:{labels:[{add:e}]}})}async function oo(t){let e=await Be("POST","/rest/api/3/search/jql",{jql:t,maxResults:50,fields:["summary","status","assignee"]});return e&&e.issues?e.issues.map(o=>({key:o.key,summary:o.fields?.summary||"No Title",status:o.fields?.status?.name||"Unknown",assignee:o.fields?.assignee?.displayName||"Unassigned"})):[]}function io(t){if(!t||typeof t!="object")return"";let e=t;if(e.type==="text")return typeof e.text=="string"?e.text:"";let o="";if(Array.isArray(e.content))for(let s of e.content){let i=io(s);i&&(o+=i+" ")}return o.trim()}async function ot(t){if(t.length===0)return[];let e=`issueKey IN (${t.join(",")})`,o=await Be("POST","/rest/api/3/search/jql",{jql:e,maxResults:15,fields:["summary","description","parent","subtasks","issuelinks"]});return!o||!o.issues?[]:o.issues.map(s=>{let i=s.fields?.parent,p=i?{key:i.key,title:i.fields?.summary||""}:void 0,n=(s.fields?.subtasks??[]).map(a=>({key:a.key,title:a.fields?.summary||""})),c=(s.fields?.issuelinks??[]).map(a=>a.outwardIssue?{type:a.type?.outward||"relates to",issue:{key:a.outwardIssue.key,title:a.outwardIssue.fields?.summary||""}}:{type:a.type?.inward||"relates to",issue:{key:a.inwardIssue.key,title:a.inwardIssue.fields?.summary||""}});return{key:s.key,title:s.fields?.summary||"",description:io(s.fields?.description),parent:p,subtasks:n,issueLinks:c}})}async function ro(t){let e=z();if(e)try{let o=await S.initialize(e);if(!o)return;let s=await A(e),i=le(s,o.ticketPrefix),p=me(s,i,!0);if(p||(p=s.split("-to-")[0]),!p){_.window.showErrorMessage("Ricwiz: You are not currently on a valid ticket branch.");return}await _.window.withProgress({location:_.ProgressLocation.Notification,title:`Fetching details for ${p}...`,cancellable:!1},async()=>{let n=await Ae(p);if(n){let c=[];try{let a=o.environments||_.workspace.getConfiguration("ricwiz").get("environments",[{name:"Qual",sourceBranch:"quality"},{name:"Val",sourceBranch:"validation"},{name:"Prod",sourceBranch:"main"}]),d=await Pe(e,p,"");c=await ze(e,d,p,a,o)}catch{}t.setJiraData({ticketId:p,relatedBranches:c,...n}),t.setPage("jira")}else _.window.showErrorMessage("Ricwiz: No data found for this ticket.")})}catch(o){o.message&&o.message.includes("securely configured")?await _.window.showErrorMessage(o.message,"Set Token Now")==="Set Token Now"&&_.commands.executeCommand("ricwiz.setJiraToken"):_.window.showErrorMessage(`Ricwiz Jira Error: ${o.message}`)}}var pe=k(require("vscode"));var Se=0;async function no(t,e){let o=pe.workspace.getConfiguration("ricwiz"),s=o.get("jiraDashboards",[]);if(e!==void 0&&(Se=e),!s||s.length===0){t.setDashboardData({queries:[],selectedIndex:0,results:[],error:"No queries defined in settings. Go to Settings > Ricwiz > Jira Dashboards."}),t.setPage("dashboard");return}Se>=s.length&&(Se=0);let i=s[Se];t.setDashboardData({queries:s,selectedIndex:Se,results:[],error:"\u23F3 Loading tickets..."}),t.setPage("dashboard");try{let p=await oo(i.jql),n=z(),c=[],a=t.getDashboardShowBranches();if(n)try{let{stdout:r}=await g("git branch",{cwd:n});c=r.split(`
`).map(m=>m.replace("*","").trim()).filter(m=>m)}catch{}let d=[];if(a&&n)try{let r=await S.initialize(n,{skipPrompt:!0}),m=r?.environments||o.get("environments",[{name:"Qual",sourceBranch:"quality"},{name:"Val",sourceBranch:"validation"},{name:"Prod",sourceBranch:"main"}]);d=await Promise.all(p.map(async l=>{let u=await Pe(n,l.key,""),f=await ze(n,u,l.key,m,r);return{...l,detailedBranches:f}}))}catch{d=p}else d=p.map(r=>{let m=c.find(l=>l.includes(r.key));return{...r,branch:m||null}});t.setDashboardData({queries:s,selectedIndex:Se,results:d,error:null}),t.setPage("dashboard")}catch(p){let n=p.message;n&&(n.includes("ENOTFOUND")||n.includes("network"))&&(n="No Internet or Invalid URL"),t.setDashboardData({queries:s,selectedIndex:Se,results:[],error:n}),t.setPage("dashboard")}}async function so(t,e){await pe.window.withProgress({location:pe.ProgressLocation.Notification,title:`Fetching details for ${e}...`,cancellable:!1},async()=>{try{let o=await Ae(e);if(o){let s=[],i=z();if(i)try{let p=await S.initialize(i,{skipPrompt:!0}),n=p?.environments||pe.workspace.getConfiguration("ricwiz").get("environments",[{name:"Qual",sourceBranch:"quality"},{name:"Val",sourceBranch:"validation"},{name:"Prod",sourceBranch:"main"}]),c=await Pe(i,e,"");s=await ze(i,c,e,n,p)}catch{}t.setJiraData({ticketId:e,relatedBranches:s,...o}),t.setPage("jira")}else pe.window.showErrorMessage(`Ricwiz: No data found for ticket ${e}.`)}catch(o){pe.window.showErrorMessage(`Ricwiz Jira Error: ${o.message}`)}})}var T=k(require("vscode"));async function ft(){let t=z();if(!t)return;let e=await S.initialize(t,{forcePrompt:!1});if(!e)return;let o=await A(t);if(!o)return;let s=le(o,e.ticketPrefix),i=me(o,s,!0);return i||o.split("-to-")[0]}function ht(t){t.message&&t.message.includes("securely configured")?T.window.showErrorMessage(t.message,"Set Token Now").then(e=>{e==="Set Token Now"&&T.commands.executeCommand("ricwiz.setJiraToken")}):T.window.showErrorMessage(`Ricwiz Jira Error: ${t.message}`)}async function ao(){try{let t=await ft();if(!t){T.window.showErrorMessage("Ricwiz: You are not on a valid ticket branch.");return}let e=await T.window.withProgress({location:T.ProgressLocation.Notification,title:`Fetching available status for ${t}...`,cancellable:!1},()=>Zt(t));if(!e||e.length===0){T.window.showInformationMessage(`Ricwiz: No transitions available for ${t}.`);return}let o=e.map(i=>({label:i.name,id:i.id})),s=await T.window.showQuickPick(o,{placeHolder:`Select new status for ${t}`,ignoreFocusOut:!0});s&&(await T.window.withProgress({location:T.ProgressLocation.Notification,title:`Updating status to ${s.label}...`,cancellable:!1},()=>Xt(t,s.id)),T.window.showInformationMessage(`Ricwiz: Status for ${t} updated to ${s.label}.`))}catch(t){ht(t)}}async function co(){try{let t=await ft();if(!t){T.window.showErrorMessage("Ricwiz: You are not on a valid ticket branch.");return}let e=await T.window.showInputBox({prompt:`Add comment to ${t}`,placeHolder:"Type your comment here...",ignoreFocusOut:!0});e&&(await T.window.withProgress({location:T.ProgressLocation.Notification,title:`Adding comment to ${t}...`,cancellable:!1},()=>eo(t,e)),T.window.showInformationMessage(`Ricwiz: Comment added to ${t}.`))}catch(t){ht(t)}}async function lo(){try{let t=await ft();if(!t){T.window.showErrorMessage("Ricwiz: You are not on a valid ticket branch.");return}let e=await T.window.showInputBox({prompt:`Add a label to ${t}`,placeHolder:"e.g. Needs-Review, Bug, High-Priority",ignoreFocusOut:!0});e&&e.trim()&&(await T.window.withProgress({location:T.ProgressLocation.Notification,title:`Adding label to ${t}...`,cancellable:!1},()=>to(t,e.trim())),T.window.showInformationMessage(`Ricwiz: Label '${e.trim()}' added to ${t}.`))}catch(t){ht(t)}}async function mo(){let t=await T.window.showInputBox({prompt:"Enter your Jira API Token (or Personal Access Token). It will be securely stored in your OS keychain.",password:!0,ignoreFocusOut:!0});if(t)try{await Bt(t.trim()),T.window.showInformationMessage("Ricwiz: Jira API Token securely stored!")}catch(e){T.window.showErrorMessage(`Ricwiz: Failed to store token: ${e.message}`)}}var W=k(require("vscode")),po=k(require("https"));async function uo(){let t=await W.window.showInputBox({prompt:"Enter your GitLab Personal Access Token",placeHolder:"glpat-xxxxxxxxxxxxxxxxxxxx",ignoreFocusOut:!0,password:!0});if(t&&t.trim()){let e=t.trim();await W.window.withProgress({location:W.ProgressLocation.Notification,title:"Ricwiz: Validating GitLab Token...",cancellable:!1},async()=>{try{let s=W.workspace.getConfiguration("ricwiz").get("gitlabUrlOverride","").trim();if(!s&&W.workspace.workspaceFolders)try{let c=W.workspace.workspaceFolders[0].uri.fsPath,{stdout:a}=await g("git remote get-url origin",{cwd:c}),d=a.trim();d.startsWith("git@")&&(d=`https://${d.replace("git@","").replace(":","/")}`),d.endsWith(".git")&&(d=d.slice(0,-4)),s=d}catch{}s||(s="https://gitlab.com");let i=new URL(s),p=`${i.protocol}//${i.host}`,n=await new Promise((c,a)=>{let d=po.request(new URL(`${p}/api/v4/user`),{method:"GET",timeout:5e3,headers:{"PRIVATE-TOKEN":e,Accept:"application/json"}},r=>{if(r.statusCode>=400)return a(new Error(`Status ${r.statusCode}`));let m="";r.on("data",l=>m+=l),r.on("end",()=>c(JSON.parse(m||"{}")))});d.on("error",a),d.on("timeout",()=>{d.destroy(),a(new Error("Timeout"))}),d.end()});await St(e),W.window.showInformationMessage(`Ricwiz: \u2705 GitLab API Token saved and validated successfully for ${n.username||"user"}!`),W.commands.executeCommand("ricwiz.manualRefresh")}catch(o){W.window.showErrorMessage(`Ricwiz: \u274C Invalid token or cannot reach GitLab (${o.message}). Please check the token and try again.`)}})}}var ue=k(require("vscode"));async function go(){let t=z();if(!t){ue.window.showErrorMessage("Ricwiz: Open a folder or workspace that is a Git repository.");return}let e=await S.initialize(t);if(!e)return;let o=await V(t,{prefix:e.ticketPrefix,prompt:"Enter the full ticket ID to sync all branches for (e.g., SCPSCA-1234) or just the number"});if(!o)return;let{ticketId:s,currentBranch:i}=o;await ue.window.withProgress({location:ue.ProgressLocation.Notification,title:`Ricwiz: Syncing all branches for ${s}...`,cancellable:!1},async p=>{try{p.report({message:"Fetching from remote..."});try{await g("git fetch --all",{cwd:t})}catch{}let{stdout:n}=await g(`git branch --list "*${s}*"`,{cwd:t}),c=new RegExp(`${s}(?!\\d)`,"i"),a=n.split(`
`).map(m=>m.replace("*","").trim()).filter(m=>m.length>0&&c.test(m));if(a.length===0){ue.window.showWarningMessage(`Ricwiz: No local branches found for ${s}.`);return}let d=0,r=0;for(let m of a)if(p.report({message:`Syncing ${m}...`}),m===i)try{await g(`git pull ${e.originRemote} ${m}`,{cwd:t}),d++}catch(l){let u=!1;try{let{stdout:h}=await g("git ls-files -u",{cwd:t});h.trim().length>0&&(u=!0)}catch{}let f=((l.stdout||"")+(l.stderr||"")+(l.message||"")).toLowerCase();(u||f.includes("conflict")||f.includes("conflit"))&&await Re(t,`${e.originRemote}/${m}`,m,p)?d++:r++}else try{await g(`git fetch ${e.originRemote} ${m}:${m}`,{cwd:t}),d++}catch{try{await g(`git checkout ${m}`,{cwd:t});try{await g(`git pull ${e.originRemote} ${m}`,{cwd:t}),d++}catch(u){let f=!1;try{let{stdout:w}=await g("git ls-files -u",{cwd:t});w.trim().length>0&&(f=!0)}catch{}let h=((u.stdout||"")+(u.stderr||"")+(u.message||"")).toLowerCase();(f||h.includes("conflict")||h.includes("conflit"))&&await Re(t,`${e.originRemote}/${m}`,m,p)?d++:r++}await g(`git checkout ${i}`,{cwd:t})}catch{try{await g(`git checkout ${i}`,{cwd:t})}catch{}r++}}r>0?ue.window.showWarningMessage(`Ricwiz: Synced ${d}/${a.length} branches. ${r} branch(es) could not be synced (possible conflicts or diverged history).`):ue.window.showInformationMessage(`Ricwiz: \u{1F504} All ${d} branches for ${s} are up to date!`)}catch(n){ue.window.showErrorMessage(`Ricwiz: Sync failed: ${n.message}`)}})}var ge=k(require("vscode"));async function fo(){let t=z();if(!t){ge.window.showErrorMessage("Ricwiz: Open a folder or workspace that is a Git repository.");return}try{await g("git status",{cwd:t})}catch{ge.window.showErrorMessage("Ricwiz: The opened folder does not appear to be a valid Git repository.");return}let e=await S.initialize(t);if(!e)return;let o=e.environments,s=await V(t,{prefix:e.ticketPrefix});if(!s)return;let{ticketId:i,currentBranch:p}=s;await ge.window.withProgress({location:ge.ProgressLocation.Notification,title:"Ricwiz: Updating environment branches from their bases",cancellable:!0},async(n,c)=>{let a=0,d=p,r=!1;c.onCancellationRequested(()=>{r=!0}),n.report({message:"Syncing remote information...",increment:10});try{await g("git fetch --all",{cwd:t})}catch{}let m=80/(o.length||1);for(let l of o){if(r)break;let u=await ae(t,i,l.name),f=l.sourceBranch;if(await re(t,u))try{n.report({message:`Processing ${u}...`,increment:m/2}),await g(`git checkout ${u}`,{cwd:t});try{n.report({message:`Merging ${f} into ${u}...`,increment:m/2});let h=e.getFetchRemote(f),w=e.getFetchBranch(f),$=e.buildUpstreamPath(f);await g(`git fetch ${h} ${w}`,{cwd:t}),await g(`git merge ${$}`,{cwd:t})}catch(h){let w=!1;try{let{stdout:v}=await g("git ls-files -u",{cwd:t});v.trim().length>0&&(w=!0)}catch{}let $=((h.stdout||"")+(h.stderr||"")+(h.message||"")).toLowerCase();if(w||$.includes("conflict")||$.includes("conflit")){let v=e.buildUpstreamPath(f);if(!await Re(t,v,u,n,c))throw r=!0,new Error("Update aborted by user.")}else throw h}if(r)break;a++}catch(h){h.message.includes("aborted")?ge.window.showInformationMessage("Ricwiz: Update cancelled."):ge.window.showErrorMessage(`Ricwiz: Failed to update branch ${u}. Detail: ${h.message}`);return}}if(!r){n.report({message:"Finishing up...",increment:10});try{let l=await A(t);d&&d!==l&&await g(`git checkout ${d}`,{cwd:t})}catch{}ge.window.showInformationMessage(`Ricwiz: Successfully updated ${a} environment branches from their bases!`)}})}var O=k(require("vscode"));async function ho(){let t=z();if(!t){O.window.showErrorMessage("Ricwiz: Open a folder or workspace that is a Git repository.");return}let e=await A(t),o=O.workspace.getConfiguration("ricwiz");await O.window.withProgress({location:O.ProgressLocation.Notification,title:"Ricwiz: Scanning for unused local branches...",cancellable:!1},async()=>{try{await g("git fetch --prune",{cwd:t})}catch{}let s=[];try{let{stdout:m}=await g('git branch --format="%(refname:short)"',{cwd:t});s=m.split(`
`).map(l=>l.trim()).filter(l=>l.length>0)}catch{}if(s.length===0){O.window.showInformationMessage("Ricwiz: No local branches found.");return}let i=[];try{let{stdout:m}=await g('git branch -r --format="%(refname:short)"',{cwd:t});i=m.split(`
`).map(l=>l.trim().replace(/^[^/]+\//,"")).filter(l=>l.length>0&&!l.includes("HEAD"))}catch{}let p=[];try{let{stdout:m}=await g('git for-each-ref --format="%(refname:short)|||%(upstream:track)" refs/heads/',{cwd:t});p=m.split(`
`).filter(l=>l.includes("[gone]")).map(l=>l.split("|||")[0].trim())}catch{}let n=s.filter(m=>!i.includes(m));if(n.length===0){O.window.showInformationMessage("Ricwiz: Your local repository is totally clean! All local branches exist on the remote.");return}let c=n.map(m=>{let l=p.includes(m),u=m===e,f="Not found on remote";return l&&(f="Deleted on remote [gone]"),u&&(f+=" (Current branch - will checkout main first)"),{label:m,description:f,picked:l&&!u}}),a=await O.window.showQuickPick(c,{canPickMany:!0,placeHolder:"Select local branches to delete",title:"Ricwiz: Delete Unused Branches"});if(!a||a.length===0){O.window.showInformationMessage("Ricwiz: No branches selected for deletion.");return}if(await O.window.showWarningMessage(`Ricwiz: Delete ${a.length} local branch(es)?
This cannot be undone!`,{modal:!0},"Yes, delete them")!=="Yes, delete them"){O.window.showInformationMessage("Ricwiz: Deletion cancelled.");return}let r=0;for(let m of a){let l=m.label;if(l===e){let u=o.get("ticketSourceBranch","main");try{await g(`git checkout ${u}`,{cwd:t}),e=u}catch{O.window.showWarningMessage(`Ricwiz: Could not switch away from ${l}. Skipping.`);continue}}try{await g(`git branch -D ${l}`,{cwd:t}),r++}catch{O.window.showWarningMessage(`Ricwiz: Could not delete local branch ${l}.`)}}O.window.showInformationMessage(`Ricwiz: \u{1F5D1}\uFE0F Cleaned up ${r} unused local branch(es).`)})}var oe=k(require("vscode"));async function Fe(t){let e=z();e&&await oe.window.withProgress({location:oe.ProgressLocation.Notification,title:`Ricwiz: Switching to ${t}...`,cancellable:!1},async()=>{try{let o=await A(e),s=!1;try{let{stdout:p}=await g("git status --porcelain",{cwd:e});s=p.trim().length>0}catch{}if(s&&o)try{await g(`git stash push --include-untracked -m "ricwiz-auto:${o}"`,{cwd:e}),oe.window.showInformationMessage(`Ricwiz: \u{1F4E6} Stashed changes from ${o}`)}catch{oe.window.showWarningMessage("Ricwiz: Could not stash changes. Checkout may fail if there are conflicts.")}let i=t;t.includes("/")&&(i=t.split("/").slice(1).join("/"));try{await g(`git checkout ${i}`,{cwd:e})}catch{let n="";if(t.includes("/"))n=t.split("/")[0];else{let{stdout:c}=await g("git branch -r",{cwd:e}),a=c.split(`
`).map(r=>r.trim()).filter(r=>r),d=[];for(let r of a){let m=r.split(" ")[0];m.endsWith(`/${i}`)&&d.push(m.substring(0,m.lastIndexOf("/")))}if(d.length===0){oe.window.showErrorMessage(`Ricwiz: A branch "${i}" n\xE3o existe localmente nem em nenhuma remote!`);return}else if(d.length===1)n=d[0];else{let r=await S.initialize(e);d.includes("origin")?n="origin":r&&d.includes(r.upstreamRemote)?n=r.upstreamRemote:n=d[0]}}try{await g(`git fetch ${n} ${i}`,{cwd:e}),await g(`git checkout -b ${i} --track ${n}/${i}`,{cwd:e})}catch{oe.window.showErrorMessage(`Ricwiz: Encontrou na remote ${n} mas falhou a fazer checkout.`);return}}try{let{stdout:p}=await g("git stash list",{cwd:e}),n=p.split(`
`);for(let c=0;c<n.length;c++)if(n[c].includes(`ricwiz-auto:${i}`)){let a=n[c].match(/stash@\{(\d+)\}/);a&&(await g(`git stash pop stash@{${a[1]}}`,{cwd:e}),oe.window.showInformationMessage(`Ricwiz: \u{1F4E6} Restored stashed changes on ${i}`));break}}catch{oe.window.showWarningMessage(`Ricwiz: Could not restore stashed changes on ${i}. You may need to resolve conflicts manually (check git stash list).`)}}catch{oe.window.showErrorMessage(`Ricwiz: Could not checkout branch ${t}.`)}})}var We=k(require("vscode"));async function wo(){let t=z();if(t)try{let{stdout:e}=await g("git branch --show-current",{cwd:t}),o=e.trim();o&&(await We.env.clipboard.writeText(o),We.window.showInformationMessage(`Ricwiz: \u{1F4CB} Copied "${o}" to clipboard`))}catch{We.window.showErrorMessage("Ricwiz: Could not get the current branch name.")}}var Q=k(require("vscode")),it=k(require("path")),vo=k(require("fs"));async function yo(){let t=z();if(!t){Q.window.showErrorMessage("Ricwiz: Open a folder or workspace that is a Git repository.");return}let e=await S.initialize(t,{skipPrompt:!0}),o=Q.workspace.getConfiguration("ricwiz"),s=e?.ticketSourceBranch||o.get("ticketSourceBranch","main"),i=e?.originRemote||"origin",n=o.get("packageXmlCommand",'sf sgd source delta --to "HEAD" --from "{originRemote}/{baseBranch}" --output-dir "."').replace("origin/{baseBranch}","{originRemote}/{baseBranch}").replace(/{originRemote}/g,i).replace(/{baseBranch}/g,s);await Q.window.showWarningMessage("Are you sure you want to generate the package.xml? This may overwrite existing local manifest files.",{modal:!0},"Yes, Generate")==="Yes, Generate"&&await Q.window.withProgress({location:Q.ProgressLocation.Notification,title:"Ricwiz: Generating package.xml using Salesforce CLI...",cancellable:!1},async()=>{try{await g(n,{cwd:t,maxBuffer:10*1024*1024}),Q.window.showInformationMessage("Ricwiz: Successfully generated package.xml!");let a=it.join(t,"package","package.xml"),d=it.join(t,"package.xml"),r=it.join(t,"manifest","package.xml");for(let m of[a,d,r])if(vo.existsSync(m)){let l=await Q.workspace.openTextDocument(m);await Q.window.showTextDocument(l);break}}catch(a){Q.window.showErrorMessage(`Ricwiz: Error running sf command - ${a.message}`)}})}var Y=k(require("vscode"));async function bo(){let t=z();if(!t){Y.window.showErrorMessage("Ricwiz: Open a folder or workspace that is a Git repository.");return}let o=Y.workspace.getConfiguration("ricwiz").get("deployCommand","sf project deploy start --manifest package/package.xml --post-destructive-changes destructiveChanges/destructiveChanges.xml -c -l NoTestRun -g");await Y.window.showWarningMessage("Are you sure you want to deploy to Salesforce? This action modifies your org and cannot be easily undone.",{modal:!0},"Yes, Deploy")==="Yes, Deploy"&&await Y.window.withProgress({location:Y.ProgressLocation.Notification,title:"Ricwiz: Deploying package...",cancellable:!1},async()=>{try{let{stdout:i,stderr:p}=await g(o,{cwd:t,maxBuffer:52428800}),n=Y.window.createOutputChannel("Ricwiz Deploy");n.appendLine(`Executing: ${o}`),n.appendLine(i),p&&(n.appendLine("--- STDERR ---"),n.appendLine(p)),n.show(),Y.window.showInformationMessage("Ricwiz: Successfully ran deploy command!")}catch(i){let p=Y.window.createOutputChannel("Ricwiz Deploy");p.appendLine(`Error executing: ${o}`),i.stdout&&p.appendLine(i.stdout),i.stderr&&p.appendLine(i.stderr),p.appendLine(i.message),p.show(),Y.window.showErrorMessage("Ricwiz: Error running deploy command. See output channel for details.")}})}var K=k(require("vscode"));async function xo(){let t=z();if(!t){K.window.showErrorMessage("Ricwiz: Open a folder or workspace that is a Git repository.");return}let o=K.workspace.getConfiguration("ricwiz").get("importDataCommand","sfdx force:data:tree:import --plan data/plan.json");await K.window.showWarningMessage("Are you sure you want to import data into Salesforce? This action modifies records in your org.",{modal:!0},"Yes, Import")==="Yes, Import"&&await K.window.withProgress({location:K.ProgressLocation.Notification,title:"Ricwiz: Importing data...",cancellable:!1},async()=>{try{let{stdout:i,stderr:p}=await g(o,{cwd:t,maxBuffer:52428800}),n=K.window.createOutputChannel("Ricwiz Import Data");n.appendLine(`Executing: ${o}`),n.appendLine(i),p&&(n.appendLine("--- STDERR ---"),n.appendLine(p)),n.show(),K.window.showInformationMessage("Ricwiz: Successfully ran import data command!")}catch(i){let p=K.window.createOutputChannel("Ricwiz Import Data");p.appendLine(`Error executing: ${o}`),i.stdout&&p.appendLine(i.stdout),i.stderr&&p.appendLine(i.stderr),p.appendLine(i.message),p.show(),K.window.showErrorMessage("Ricwiz: Error running import data command. See output channel for details.")}})}var G=k(require("vscode"));async function ko(){let t=z();if(!t){G.window.showErrorMessage("Ricwiz: Open a folder or workspace that is a Git repository.");return}let e=await S.initialize(t,{skipPrompt:!0}),o=e?e.ticketSourceBranch:G.workspace.getConfiguration("ricwiz").get("ticketSourceBranch","main"),s=e?e.originRemote:"origin",i="";try{i=await A(t)}catch{}let p=await G.window.showInputBox({prompt:`Enter the branch name to list modified files (compared to ${o})`,value:i,placeHolder:"SFPSCA-1234"});if(!p)return;let n=ke(p);await G.window.withProgress({location:G.ProgressLocation.Notification,title:`Ricwiz: Finding files for ${n}...`,cancellable:!1},async()=>{try{let c=e?e.ticketPrefix:G.workspace.getConfiguration("ricwiz").get("ticketPrefix","SFPSC-"),a=le(n,c),d=me(n,a,!0)||n.replace(/-to-[a-zA-Z0-9]+$/i,""),r=await ae(t,d);R.appendLine(`[ListTicketFiles] targetBranch (raw): ${n}, resolvedTargetBranch: ${r}, ticketId: ${d}, originRemote: ${s}, sourceBranch: ${o}`);let m=[];try{let b="";try{R.appendLine(`[ListTicketFiles] Running: git merge-base ${s}/${o} ${r}`);let{stdout:x}=await g(`git merge-base ${s}/${o} ${r}`,{cwd:t});b=x.trim()}catch(x){R.appendLine(`[ListTicketFiles] First merge-base failed: ${x.message}`);try{R.appendLine(`[ListTicketFiles] Running: git merge-base ${o} ${r}`);let{stdout:D}=await g(`git merge-base ${o} ${r}`,{cwd:t});b=D.trim()}catch(D){R.appendLine(`[ListTicketFiles] Second merge-base failed: ${D.message}`),R.appendLine(`[ListTicketFiles] Running: git merge-base ${s}/${o} ${s}/${r}`);let{stdout:E}=await g(`git merge-base ${s}/${o} ${s}/${r}`,{cwd:t});b=E.trim(),r=`${s}/${r}`}}if(b){R.appendLine(`[ListTicketFiles] Merge base found: ${b}. Running git diff...`);let x=r===i||n===i,D=x?"":` ${r}`,{stdout:E}=await g(`git diff --name-only ${b}${D}`,{cwd:t,maxBuffer:10*1024*1024});if(m=E.split(`
`).map(B=>B.trim()).filter(B=>B.length>0),x)try{let{stdout:B}=await g("git ls-files --others --exclude-standard",{cwd:t,maxBuffer:10485760}),U=B.split(`
`).map(N=>N.trim()).filter(N=>N.length>0);m=[...m,...U],R.appendLine(`[ListTicketFiles] Found ${U.length} untracked files.`)}catch(B){R.appendLine(`[ListTicketFiles] Failed to get untracked files: ${B.message}`)}R.appendLine(`[ListTicketFiles] diff found ${m.length} files total.`)}}catch(b){R.appendLine(`[ListTicketFiles] Diff strategy failed: ${b.message}`)}let l=[];try{R.appendLine(`[ListTicketFiles] Running git log fallback for ticketId: ${d}`);let{stdout:b}=await g(`git --no-pager log --grep="\\b${d}\\b" -i -E --name-only -m --first-parent --format=""`,{cwd:t,maxBuffer:10*1024*1024});l=b.split(`
`).map(x=>x.trim()).filter(x=>x.length>0),R.appendLine(`[ListTicketFiles] git log found ${l.length} files.`)}catch(b){R.appendLine(`[ListTicketFiles] Git log fallback failed: ${b.message}`)}let u=[...m,...l];if(u.length===0){G.window.showInformationMessage(`Ricwiz: No modified files found for ${n}.`);return}let f=Array.from(new Set(u)).sort(),h={};for(let b of f){let x=b.match(/default\/([^/]+)/),D=x&&x[1]?x[1].toUpperCase():"OUTROS";h[D]||(h[D]=[]),h[D].push(b)}let w=`Files modified in branch ${n}:
`,$=Object.keys(h).sort();for(let b of $)w+=`
=== ${b} ===
`,w+=h[b].join(`
`)+`
`;let v=await G.workspace.openTextDocument({content:w,language:"plaintext"});await G.window.showTextDocument(v)}catch(c){G.window.showErrorMessage(`Ricwiz: Error running git log - ${c.message}`)}})}var ie=k(require("vscode"));async function Co(){let t=z();if(!t){ie.window.showErrorMessage("Ricwiz: Open a folder or workspace that is a Git repository.");return}let o=ie.workspace.getConfiguration("ricwiz").get("resetTrackingCommand","sf org disable tracking && sf project reset tracking --no-prompt");await ie.window.withProgress({location:ie.ProgressLocation.Notification,title:"Ricwiz: Resetting tracking...",cancellable:!1},async()=>{try{let{stdout:s,stderr:i}=await g(o,{cwd:t,maxBuffer:52428800}),p=ie.window.createOutputChannel("Ricwiz Reset Tracking");p.appendLine(`Executing: ${o}`),p.appendLine(s),i&&(p.appendLine("--- STDERR ---"),p.appendLine(i)),p.show(),ie.window.showInformationMessage("Ricwiz: Successfully reset tracking!")}catch(s){let i=ie.window.createOutputChannel("Ricwiz Reset Tracking");i.appendLine(`Error executing: ${o}`),s.stdout&&i.appendLine(s.stdout),s.stderr&&i.appendLine(s.stderr),i.appendLine(s.message),i.show(),ie.window.showErrorMessage("Ricwiz: Error resetting tracking. See output channel for details.")}})}var Z=k(require("vscode"));async function $o(){let t=z();if(!t){Z.window.showErrorMessage("Ricwiz: Open a workspace first.");return}let e=["ApexClass","ApexTrigger","CustomObject","CustomField","LightningComponentBundle","AuraDefinitionBundle","Flow","CustomLabel","CustomMetadata","StaticResource","Profile","PermissionSet","PermissionSetGroup","Layout","ValidationRule","RecordType","ListView","Report","EmailTemplate","Other (Type manually)..."],o=await Z.window.showQuickPick(e,{placeHolder:"Select Metadata Type to extract (e.g., ApexClass)",ignoreFocusOut:!0});if(!o||o==="Other (Type manually)..."&&(o=await Z.window.showInputBox({prompt:"Enter Metadata Type (e.g., CustomApplication, Queue)",ignoreFocusOut:!0}),!o))return;let s={ApexClass:"**/*.cls",ApexTrigger:"**/*.trigger",CustomObject:"**/*.{object,object-meta.xml}",CustomField:"**/*.field-meta.xml",LightningComponentBundle:"**/lwc/*/*.js",AuraDefinitionBundle:"**/aura/*/*.cmp",Flow:"**/*.flow-meta.xml",CustomLabel:"**/*.labels-meta.xml",CustomMetadata:"**/*.md-meta.xml",StaticResource:"**/*.resource-meta.xml",Profile:"**/*.profile-meta.xml",PermissionSet:"**/*.permissionset-meta.xml",PermissionSetGroup:"**/*.permissionsetgroup-meta.xml",Layout:"**/*.layout-meta.xml",ValidationRule:"**/*.validationRule-meta.xml",RecordType:"**/*.recordType-meta.xml",ListView:"**/*.listView-meta.xml"},i=[],p=s[o];if(p)try{i=(await Z.workspace.findFiles(p,"**/node_modules/**")).map(a=>{let d=a.fsPath.split(/[\\/]/).pop()||"";if(o==="LightningComponentBundle"||o==="AuraDefinitionBundle"){let r=a.fsPath.split(/[\\/]/);return r[r.length-2]||d.split(".")[0]}return d.split(".")[0]}),i=[...new Set(i)].sort()}catch{}let n=await new Promise(c=>{let a=Z.window.createQuickPick();a.title=`Extract ${o}`,a.placeholder="Type name (e.g. MyComponent) or * for all",a.ignoreFocusOut=!0,a.matchOnDescription=!0;let d=()=>{let r=a.value.trim(),m=[];r?m.push({label:`$(cloud-download) Extract "${r}"`,description:"Extract exact name from Salesforce",alwaysShow:!0}):m.push({label:'$(cloud-download) Extract "*" (All)',description:`Extract all ${o}s`,alwaysShow:!0}),i.forEach(l=>{(!r||l.toLowerCase().includes(r.toLowerCase()))&&m.push({label:l,description:"Local workspace component"})}),a.items=m};a.onDidChangeValue(()=>d()),a.onDidAccept(()=>{let r=a.selectedItems[0];if(r){let m=r.label;m.startsWith('$(cloud-download) Extract "')?m=m.replace('$(cloud-download) Extract "',"").replace('" (All)',"").replace('"',""):m==='$(cloud-download) Extract "*" (All)'&&(m="*"),a.hide(),c(m)}}),a.onDidHide(()=>{a.dispose(),c(void 0)}),d(),a.show()});n&&await Z.window.withProgress({location:Z.ProgressLocation.Notification,title:`Ricwiz: Extracting ${o}:${n} from Salesforce...`,cancellable:!0},async(c,a)=>{try{R.show(!0);let d=`${o}:${n}`,{stdout:r,stderr:m}=await g(`sf project retrieve start -m "${d}"`,{cwd:t});r&&R.appendLine(r),m&&R.appendLine(m),Z.window.showInformationMessage(`Ricwiz: Successfully extracted ${d}.`)}catch(d){R.appendLine(`ERROR: ${d.message}`),d.stdout&&R.appendLine(d.stdout),d.stderr&&R.appendLine(d.stderr),Z.window.showErrorMessage("Ricwiz: Extraction failed. See Output channel for details.")}})}var j=k(require("vscode")),Ro=k(require("path"));async function zo(){let t=j.window.activeTextEditor;if(!t){j.window.showErrorMessage("Ricwiz: Please open the file you want to deploy in the editor first.");return}let e=t.document.uri.fsPath,o=z();if(!o)return;let s="";if(await j.window.withProgress({location:j.ProgressLocation.Notification,title:"Ricwiz: Fetching available Salesforce orgs...",cancellable:!1},async()=>{try{let{stdout:a}=await g("sf org list --json",{cwd:o});s=a}catch(a){s=a.stdout||""}}),!s){j.window.showErrorMessage("Ricwiz: Failed to fetch orgs. Is Salesforce CLI installed?");return}let i=[];try{let a=JSON.parse(s),d=a.result?.nonScratchOrgs||[],r=a.result?.scratchOrgs||[];i=[...d,...r]}catch{j.window.showErrorMessage("Ricwiz: Failed to parse org list.");return}if(i.length===0){j.window.showInformationMessage("Ricwiz: No authenticated orgs found.");return}let p=i.map(a=>({label:a.alias||a.username,description:a.alias?a.username:"",picked:a.isDefaultUsername})),n=await j.window.showQuickPick(p,{placeHolder:"Select the org(s) to deploy this file to",canPickMany:!0,ignoreFocusOut:!0});if(!n||n.length===0)return;let c=Ro.basename(e);await j.window.withProgress({location:j.ProgressLocation.Notification,title:`Ricwiz: Deploying ${c} to ${n.length} org(s)...`,cancellable:!1},async()=>{R.show(!0),R.appendLine(`--- Starting Parallel Deploy of ${c} ---`);let a=n.map(async l=>{let u=l.label;R.appendLine(`[${u}] Deploying...`);try{let{stdout:f,stderr:h}=await g(`sf project deploy start -d "${e}" -o "${u}"`,{cwd:o});return R.appendLine(`[${u}] \u2705 Success`),f&&R.appendLine(f),{org:u,success:!0}}catch(f){return R.appendLine(`[${u}] \u274C Failed`),f.stdout&&R.appendLine(f.stdout),f.stderr&&R.appendLine(f.stderr),{org:u,success:!1}}}),d=await Promise.all(a),r=d.filter(l=>l.success).length,m=d.filter(l=>!l.success).length;m===0?j.window.showInformationMessage(`Ricwiz: Successfully deployed to all ${r} orgs!`):j.window.showErrorMessage(`Ricwiz: Deploy finished with errors (${r} success, ${m} failed). Check Output channel.`)})}var I=k(require("vscode")),rt=k(require("fs")),nt=k(require("path"));async function Po(){let t=z();if(!t){I.window.showErrorMessage("Ricwiz: Open a folder or workspace that is a Git repository.");return}let e=I.workspace.getConfiguration("ricwiz"),o=e.get("auditUsername",""),s=e.get("auditHours",8),i=await I.window.showInputBox({prompt:"Enter your Salesforce Username to query in SetupAuditTrail",value:o,placeHolder:"admin@tuaorg.com"});if(!i)return;i=ke(i);let p=await I.window.showInputBox({prompt:"How many hours back do you want to search?",value:s.toString(),placeHolder:"8"});if(!p)return;let n=parseFloat(p);if(isNaN(n)||n<=0){I.window.showErrorMessage("Ricwiz: Invalid hours specified.");return}let c=new Date(Date.now()-n*60*60*1e3).toISOString(),d=`sf data query -q "${`SELECT Action, Display, Section FROM SetupAuditTrail WHERE CreatedBy.Username = '${i}' AND CreatedDate >= ${c}`}" --json`;await I.window.withProgress({location:I.ProgressLocation.Notification,title:"Ricwiz: Interrogating Setup Audit Trail...",cancellable:!1},async()=>{try{let{stdout:r}=await g(d,{cwd:t,maxBuffer:52428800}),m=JSON.parse(r);if(!m.result||m.result.records.length===0){I.window.showInformationMessage(`Ricwiz: No changes found for ${i} in the last ${n} hours.`);return}let l=m.result.records,u=[],f=new Set;for(let B of l){let U=Zo(B.Action,B.Display,B.Section);if(U){let N=`${U.isDelete?"DEL":"ADD"}-${U.metadataFormat}`;if(!f.has(N)){f.add(N);let de=U.isDelete?"$(trash)":"$(plus)";u.push({label:`${de} ${U.metadataFormat}`,description:`${B.Action} -> ${B.Display}`,metadataFormat:U.metadataFormat,isDelete:U.isDelete})}}}if(u.length===0){I.window.showInformationMessage(`Ricwiz: No extractable metadata changes found for ${i} in the last ${n} hours (ignored passwords/logins).`);return}let h=await I.window.showQuickPick(u,{canPickMany:!0,placeHolder:"Select the changes you want to extract to GitLab",ignoreFocusOut:!0});if(!h||h.length===0){I.window.showInformationMessage("Ricwiz: No changes selected.");return}let w=h.filter(B=>B.isDelete),$=h.filter(B=>!B.isDelete),v=I.window.createOutputChannel("Ricwiz Admin Bridge");if(v.show(),w.length>0){let{stdout:B}=await g("git ls-files",{cwd:t}),U=B.split(`
`).map(de=>de.trim()),N=0;for(let de of w){let Ue=de.metadataFormat.split(":"),qe=Ue[0],Ve=Ue[1],ye=Ve;qe==="CustomField"&&(ye=Ve.split(".")[1]);let at=U.filter(Le=>{let L=nt.basename(Le);return L.startsWith(ye+".")&&L.includes(qe==="CustomField"?".field":"")});for(let Le of at){let L=nt.join(t,Le);rt.existsSync(L)&&(rt.unlinkSync(L),v.appendLine(`Deleted local file: ${Le}`),N++)}}I.window.showInformationMessage(`Ricwiz: Deleted ${N} local files from Git workspace.`)}if($.length===0)return;let b=$.map(B=>B.metadataFormat).filter(B=>B!=="").join(", "),x=await I.window.showInputBox({prompt:"Review and adjust the metadata components to retrieve",value:b,ignoreFocusOut:!0});if(!x)return;let D=`sf project retrieve start -m "${x}"`;v.appendLine(`Executing: ${D}`),I.window.showInformationMessage(`Ricwiz: Extracting ${$.length} components...`);let E=await g(D,{cwd:t});v.appendLine(E.stdout),E.stderr&&(v.appendLine("--- STDERR ---"),v.appendLine(E.stderr)),I.window.showInformationMessage("Ricwiz: Changes extracted successfully! Ready for Git Commit.")}catch(r){I.window.showErrorMessage(`Ricwiz: Error capturing changes - ${r.message}`)}})}function Zo(t,e,o){if(!t||!e||!o)return null;let s=t.toLowerCase(),i=o.toLowerCase();if(["security controls","network access","session settings","data export","login history","password policies","identity verification","delegated administration"].includes(i)||s.includes("login")||s.includes("password")||s.includes("oauth")||s.includes("session"))return null;let n=s.includes("delete"),c=null;if(s==="permissionsetgroupcomponentadd"||s==="permissionsetgroupcomponentdelete")return null;let a=(d,r=!1)=>{let m=d.replace(/\(.*\)/g,"").trim();m.includes(":")&&!s.includes("calculation")&&(m=m.split(":")[0]);let l=["disabled","deleted","removed","created","changed","updated","from","to","on","assigned","assign","assignment","permission","set","group","apex","class","trigger","custom","field","object","layout","validation","rule","flow","profile"],u=m.split(/\s+/);if(r){for(;u.length>0&&l.includes(u[u.length-1].toLowerCase());)u.pop();for(;u.length>0&&l.includes(u[0].toLowerCase());)u.shift();return u.join(" ").trim().replace(/[^a-zA-Z0-9_ ]/g,"")}else return u.filter(w=>!l.includes(w.toLowerCase())).join("_").replace(/[^a-zA-Z0-9_]/g,"")||m.replace(/\s+/g,"")};if(s.includes("profile"))c=`Profile:${a(e,!0)}`;else if(s.includes("permissionsetgroupcalculation")){let d=e.split(":");c=`PermissionSetGroup:${d.length>1?d[d.length-1].trim():a(e,!1)}`}else if(s.includes("permission set group")||s.includes("permissionsetgroup"))c=`PermissionSetGroup:${a(e,!1)}`;else if(s.includes("permission set")||s.includes("permissionset"))c=`PermissionSet:${a(e,!1)}`;else if(s.includes("apexclass"))c=`ApexClass:${a(e,!1)}`;else if(s.includes("apextrigger")||s.includes("apex trigger"))c=`ApexTrigger:${a(e,!1)}`;else if(s.includes("customfield")){let d=e.match(/([A-Za-z0-9_]+__c)/),r=e.match(/(?:on|na|for)\s+([A-Za-z0-9_]+)/i);d&&r?c=`CustomField:${r[1]}.${d[1]}`:c=`CustomField:${a(e,!1)}`}else if(s.includes("layout"))c=`Layout:${a(e,!0)}`;else if(s.includes("validation"))c=`ValidationRule:${a(e,!1)}`;else if(s.includes("flow"))c=`Flow:${a(e,!1)}`;else if(s.includes("customobject")){let d=e.match(/([A-Za-z0-9_]+__c)/);c=d?`CustomObject:${d[1]}`:`CustomObject:${a(e,!1)}`}else if(!s.includes("created")&&!s.includes("changed")&&!s.includes("deleted"))return null;return c?{metadataFormat:c,isDelete:n}:null}var wt=k(require("vscode"));async function Bo(){let t=z();if(t)try{let{stdout:e}=await g('git for-each-ref --sort=-committerdate --format="%(refname:short)|||%(committerdate:relative)|||%(subject)" refs/heads/',{cwd:t}),o=e.split(`
`).filter(i=>i.trim()).map(i=>{let p=i.split("|||");return{label:`$(git-branch) ${p[0]}`,description:p[1],detail:p[2],branchName:p[0]}}),s=await wt.window.showQuickPick(o,{placeHolder:"Select a branch from history to checkout",matchOnDescription:!0,matchOnDetail:!0});s&&await Fe(s.branchName)}catch{wt.window.showErrorMessage("Ricwiz: Failed to get branch history")}}var Ge=k(require("vscode"));async function So(){let t=z();if(!t)return;let e=await Ge.window.showInputBox({prompt:"Enter ticket number or name (e.g., 48934)",placeHolder:"48934"});if(!e)return;let o=ke(e);try{let{stdout:s}=await g(`git branch --list "*${o}*"`,{cwd:t}),i=s.split(`
`).map(c=>c.replace("*","").trim()).filter(c=>c);if(i.length===0){Ge.window.showInformationMessage(`Ricwiz: No branches found matching "${e}"`);return}let p=i.map(c=>({label:`$(git-branch) ${c}`,branchName:c})),n=await Ge.window.showQuickPick(p,{placeHolder:`Select a branch for ${e}`});n&&await Fe(n.branchName)}catch{Ge.window.showErrorMessage("Ricwiz: Failed to search branches")}}var De=k(require("vscode")),Do=k(require("path"));async function To(){let t=De.window.activeTextEditor;if(!t)return De.window.showErrorMessage("Ricwiz: Please open a file in the editor to check blame."),null;let e=t.document.fileName,o=Do.basename(e),s=z();if(!s)return De.window.showErrorMessage("Ricwiz: Workspace is not a git repository."),null;let i=[];try{let{stdout:r}=await g(`git log -5 --pretty=format:"%an|%ar|%s|%h" -- "${e}"`,{cwd:s}),m=r.trim().split(`
`);for(let l of m){let u=l.split("|");u.length>=4&&i.push({author:u[0],time:u[1],message:u.slice(2,-1).join("|"),hash:u[u.length-1]})}}catch(r){R.appendLine(`[WhoToBlame] Git blame error: ${r.message}`)}let p="Unknown",n="Unknown",c="Unknown",a=[],d=Xe(e);if(d)try{await De.window.withProgress({location:De.ProgressLocation.Notification,title:`Ricwiz: Analyzing ${d.name} in Salesforce...`,cancellable:!1},async()=>{let r="";if(d.type==="CustomField"){let m=d.name.split(".");m.length===2&&(r=`SELECT LastModifiedBy.Name, LastModifiedDate, CreatedBy.Name FROM CustomField WHERE DeveloperName = '${m[1].replace("__c","")}' AND TableEnumOrId = '${m[0]}'`)}else d.type==="LightningComponentBundle"?r=`SELECT LastModifiedBy.Name, LastModifiedDate, CreatedBy.Name FROM LightningComponentBundle WHERE DeveloperName = '${d.name}'`:r=`SELECT LastModifiedBy.Name, LastModifiedDate, CreatedBy.Name FROM ${d.type} WHERE Name = '${d.name}'`;if(r)try{let{stdout:m}=await g(`sf data query -t -q "${r}" --json`,{cwd:s,maxBuffer:52428800}),l=JSON.parse(m);if(l&&l.result&&l.result.records&&l.result.records.length>0){let u=l.result.records[0];p=u.LastModifiedBy?u.LastModifiedBy.Name:"Unknown",c=u.CreatedBy?u.CreatedBy.Name:"Unknown",n=new Date(u.LastModifiedDate).toLocaleString()}else p="Not found in Org",n="N/A",c="N/A"}catch(m){p="Query Error",n="N/A",c="N/A",R.appendLine(`[WhoToBlame] Query error: ${m.message}`)}try{let m="SELECT Action, Display, CreatedBy.Name, CreatedDate FROM SetupAuditTrail ORDER BY CreatedDate DESC LIMIT 1500",{stdout:l}=await g(`sf data query -q "${m}" --json`,{cwd:s,maxBuffer:52428800}),u=JSON.parse(l);if(u&&u.result&&u.result.records){let f=d.name.replace("__c","");a=u.result.records.filter(w=>w.Display&&w.Display.includes(f)).map(w=>({action:w.Action,display:w.Display,author:w.CreatedBy?w.CreatedBy.Name:"Unknown",time:new Date(w.CreatedDate).toLocaleString()})).slice(0,10)}}catch(m){R.appendLine(`[WhoToBlame] Audit trail query error: ${m.message}`)}})}catch(r){R.appendLine(`[WhoToBlame] Salesforce query error: ${r.message}`)}else p="Unsupported Metadata Type",n="N/A";return{fileName:o,gitHistory:i,sfAuthor:p,sfTime:n,sfCreatedBy:c,auditHistory:a}}var fe=k(require("vscode"));var He=k(require("https"));async function Eo(t,e){let o=z();if(!o)return;let s=(await xe())?.trim();if(!s){fe.window.showErrorMessage("Ricwiz: GitLab token is not configured.");return}try{let i=await S.initialize(o,{skipPrompt:!0});if(!i)return;let n=i.getConfig("gitlabUrlOverride","");if(n){let c=new URL(n);n=`${c.protocol}//${c.host}`}else{let{stdout:c}=await g("git remote",{cwd:o}),a=c.split(`
`).map(r=>r.trim()).filter(r=>r),d=!1;for(let r of a){let{stdout:m}=await g(`git remote get-url ${r}`,{cwd:o}),l=m.trim();l.endsWith(".git")&&(l=l.slice(0,-4)),l.startsWith("git@")&&(l=l.replace("git@","").replace(":","/"),l=`https://${l}`);let u=new URL(l),f=u.pathname;if(f.startsWith("/")&&(f=f.substring(1)),f.endsWith("/")&&(f=f.slice(0,-1)),encodeURIComponent(f)===t||f===t){n=`${u.protocol}//${u.host}`,d=!0;break}}if(!d){fe.window.showErrorMessage(`Ricwiz: Could not determine base URL for project ${t}`);return}}await fe.window.withProgress({location:fe.ProgressLocation.Notification,title:`Fetching failed jobs for Pipeline #${e}...`,cancellable:!1},async()=>{let c=new He.Agent({keepAlive:!0}),a=new URL(`${n}/api/v4/projects/${t}/pipelines/${e}/jobs?scope[]=failed`),d=await new Promise(h=>{He.get(a,{headers:{"PRIVATE-TOKEN":s},agent:c},w=>{let $="";w.on("data",v=>$+=v),w.on("end",()=>{if(w.statusCode===200)try{h(JSON.parse($))}catch{h([])}else h([])})}).on("error",()=>h([]))});if(!d||d.length===0){fe.window.showInformationMessage("Ricwiz: No failed jobs found for this pipeline.");return}let r=d[0],m=new URL(`${n}/api/v4/projects/${t}/jobs/${r.id}/trace`),u=(await new Promise(h=>{He.get(m,{headers:{"PRIVATE-TOKEN":s},agent:c},w=>{let $="";w.on("data",v=>$+=v),w.on("end",()=>h($))}).on("error",w=>h(`Failed to fetch log: ${w.message}`))})).replace(/\x1B\[[0-9;]*[mK]/g,""),f=fe.window.createOutputChannel(`Pipeline #${e} - Job ${r.name}`);f.appendLine(`Pipeline ID: ${e}`),f.appendLine(`Job Name: ${r.name}`),f.appendLine(`Status: ${r.status}`),f.appendLine(`URL: ${r.web_url}`),f.appendLine("========================================"),f.appendLine(u),f.show()})}catch(i){fe.window.showErrorMessage(`Ricwiz: Error fetching pipeline logs - ${i.message}`)}}function Mo(t,e,o){t.subscriptions.push(y.commands.registerCommand("ricwiz.conflictAction",At),y.commands.registerCommand("ricwiz.generateDestructiveChanges",async()=>{try{await Mt()}finally{y.commands.executeCommand("ricwiz.manualRefresh")}}),y.commands.registerCommand("ricwiz.runSmartTests",async()=>{try{await Lt()}finally{y.commands.executeCommand("ricwiz.manualRefresh")}}),y.commands.registerCommand("ricwiz.refreshWebview",()=>{e&&y.commands.executeCommand("workbench.action.webview.reloadWebviewAction")}),y.commands.registerCommand("ricwiz.createBranches",async s=>{try{await It(s)}finally{y.commands.executeCommand("ricwiz.manualRefresh")}}),y.commands.registerCommand("ricwiz.prepareDeploy",async()=>{try{await Jt()}finally{y.commands.executeCommand("ricwiz.manualRefresh")}}),y.commands.registerCommand("ricwiz.createMergeRequests",async()=>{try{await Gt()}finally{y.commands.executeCommand("ricwiz.manualRefresh")}}),y.commands.registerCommand("ricwiz.createMergeRequestsVSCode",async()=>{try{await Ht()}finally{y.commands.executeCommand("ricwiz.manualRefresh")}}),y.commands.registerCommand("ricwiz.openJiraTicket",async()=>{try{await Vt()}finally{y.commands.executeCommand("ricwiz.manualRefresh")}}),y.commands.registerCommand("ricwiz.openJiraTicketVSCode",async()=>{try{await _t()}finally{y.commands.executeCommand("ricwiz.manualRefresh")}}),y.commands.registerCommand("ricwiz.showJiraDetails",()=>{e&&ro(e)}),y.commands.registerCommand("ricwiz.openJiraDashboard",s=>{e&&no(e,s)}),y.commands.registerCommand("ricwiz.openJiraDetailsForId",s=>{e&&so(e,s)}),y.commands.registerCommand("ricwiz.toggleDashboardBranches",s=>{e&&(e.setDashboardShowBranches(s),y.commands.executeCommand("ricwiz.openJiraDashboard"))}),y.commands.registerCommand("ricwiz.changeJiraStatus",async()=>{try{await ao()}finally{y.commands.executeCommand("ricwiz.manualRefresh")}}),y.commands.registerCommand("ricwiz.addJiraComment",async()=>{try{await co()}finally{y.commands.executeCommand("ricwiz.manualRefresh")}}),y.commands.registerCommand("ricwiz.addJiraLabel",async()=>{try{await lo()}finally{y.commands.executeCommand("ricwiz.manualRefresh")}}),y.commands.registerCommand("ricwiz.setJiraToken",mo),y.commands.registerCommand("ricwiz.setGitlabToken",uo),y.commands.registerCommand("ricwiz.syncAll",async()=>{try{await go()}finally{y.commands.executeCommand("ricwiz.manualRefresh")}}),y.commands.registerCommand("ricwiz.updateBases",async()=>{try{await fo()}finally{y.commands.executeCommand("ricwiz.manualRefresh")}}),y.commands.registerCommand("ricwiz.deleteUnusedBranches",async()=>{try{await ho()}finally{y.commands.executeCommand("ricwiz.manualRefresh")}}),y.commands.registerCommand("ricwiz.checkoutBranch",async s=>{try{await Fe(s)}finally{y.commands.executeCommand("ricwiz.manualRefresh")}}),y.commands.registerCommand("ricwiz.copyBranchName",async()=>{try{await wo()}finally{y.commands.executeCommand("ricwiz.manualRefresh")}}),y.commands.registerCommand("ricwiz.generatePackageXml",async()=>{try{await yo()}finally{y.commands.executeCommand("ricwiz.manualRefresh")}}),y.commands.registerCommand("ricwiz.deployPackage",async()=>{try{await bo()}finally{y.commands.executeCommand("ricwiz.manualRefresh")}}),y.commands.registerCommand("ricwiz.importData",async()=>{try{await xo()}finally{y.commands.executeCommand("ricwiz.manualRefresh")}}),y.commands.registerCommand("ricwiz.listTicketFiles",async()=>{try{await ko()}finally{y.commands.executeCommand("ricwiz.manualRefresh")}}),y.commands.registerCommand("ricwiz.resetTracking",async()=>{try{await Co()}finally{y.commands.executeCommand("ricwiz.manualRefresh")}}),y.commands.registerCommand("ricwiz.extractComponent",async()=>{try{await $o()}finally{y.commands.executeCommand("ricwiz.manualRefresh")}}),y.commands.registerCommand("ricwiz.deployMultiOrg",async()=>{try{await zo()}finally{y.commands.executeCommand("ricwiz.manualRefresh")}}),y.commands.registerCommand("ricwiz.captureAdminChanges",async()=>{try{await Po()}finally{y.commands.executeCommand("ricwiz.manualRefresh")}}),y.commands.registerCommand("ricwiz.openHistory",async()=>{try{await Bo()}finally{y.commands.executeCommand("ricwiz.manualRefresh")}}),y.commands.registerCommand("ricwiz.searchTicket",async()=>{try{await So()}finally{y.commands.executeCommand("ricwiz.manualRefresh")}}),y.commands.registerCommand("ricwiz.whoToBlame",async()=>{let s=await To();s&&e&&(e.setBlameData(s),e.setPage("blame"))}),y.commands.registerCommand("ricwiz.showPipelineLogs",(s,i)=>Eo(s,i)),y.commands.registerCommand("ricwiz.manualRefresh",()=>{o&&o()}),y.commands.registerCommand("ricwiz.toggleAutoRefresh",()=>{if(e){let s=!e.isAutoRefreshEnabled();e.setAutoRefresh(s),y.workspace.getConfiguration("ricwiz").update("autoRefresh",s,y.ConfigurationTarget.Global)}}),y.commands.registerCommand("ricwiz.openSettings",()=>{y.commands.executeCommand("workbench.action.openSettings","ricwiz")}))}var ce=k(require("vscode"));function Lo(t,e,o){let s,i=ce.workspace.getConfiguration("ricwiz").get("autoRefresh",!0);e?.setAutoRefresh(i),t.subscriptions.push(ce.workspace.onDidChangeConfiguration(n=>{if(n.affectsConfiguration("ricwiz.autoRefresh")){let c=ce.workspace.getConfiguration("ricwiz").get("autoRefresh",!0);e?.setAutoRefresh(c)}}));async function p(){let n=ce.extensions.getExtension("vscode.git");if(n){let d=function(r){let m="",l;async function u(){let h=ce.workspace.workspaceFolders;if(!h)return;let w=h[0].uri.fsPath,$=await A(w);if($&&$!==m){m=$;let v=ce.workspace.getConfiguration("ricwiz"),b=v.get("ticketPrefix","SFPSCA-");if(!$.includes(b)){let L=$.match(/([A-Z]+-)\d+/i);L&&(b=L[1].toUpperCase())}let x=[],D=[],E=[],B=[],U=await S.initialize(w,{skipPrompt:!0}),N=U?.environments||v.get("environments",[{name:"Qual",sourceBranch:"quality"},{name:"Val",sourceBranch:"validation"},{name:"Prod",sourceBranch:"main"}]);try{let L=v.get("workspaceCheckoutButtons",["main","quality","validation"]);E=Array.from(new Set(L))}catch{}let de="",Ue=$.match(new RegExp(`(${b}\\d+(?:-\\d+)?)`,"i"));if(Ue){let L=Ue[1].toUpperCase();de=L;let he=v.get("commitMessageSuffix","- "),vt=/^[A-Z]+-\d+(?:-\d+)?\s*(?:-\s*|:\s*|\s+)?/i;vt.test(r.inputBox.value)?r.inputBox.value.toUpperCase().startsWith(L)||(r.inputBox.value=r.inputBox.value.replace(vt,`${L}${he}`)):r.inputBox.value=`${L}${he}`+r.inputBox.value,o.text=`$(bookmark) ${L}`,o.tooltip=`Branch: ${$}
Click to open Jira ticket`,o.show();try{let yt=await Pe(w,L,"");x=await ze(w,yt,L,N,U)}catch{}}else{o.hide();try{B=await Nt(w)}catch{}}let[qe,Ve,ye]=await Promise.all([jt(w,10),Ot(w,$,N,U),de?Ae(de).catch(L=>{let he=L.message;return he&&(he.includes("ENOTFOUND")||he.includes("network"))&&(he="No Internet or Invalid URL"),{summary:`\u26A0\uFE0F Jira Error: ${he}`,description:"",status:""}}):Promise.resolve(null)]);D=qe;let at=ye?ye.summary:"",Le=ye&&ye.status||"";e?.updateBranch($,Ve,x,D,E,B,at,Le)}}function f(){e?.isAutoRefreshEnabled()&&(l&&clearTimeout(l),l=setTimeout(()=>{m="",u()},300))}s=()=>{m="",u()},u(),t.subscriptions.push(r.state.onDidChange(()=>f())),t.subscriptions.push(ce.window.onDidChangeWindowState(h=>{h.focused&&f()}))};var c=d;n.isActive||await n.activate();let a=n.exports.getAPI(1);a.repositories.length>0&&a.repositories.forEach(r=>d(r)),a.onDidOpenRepository(r=>d(r))}}return p(),()=>{s&&s()}}var Io={get_tickets_batch:async t=>{let e=await ot(t);return JSON.stringify(e)}};var Ao=k(require("http")),Ee=k(require("fs")),st=k(require("path")),Fo=k(require("os"));var Te;function Uo(){Te||(Te=Ao.createServer(async(t,e)=>{try{let o=new URL(t.url||"",`http://${t.headers.host}`);if(o.pathname==="/tickets_batch"&&t.method==="GET"){let s=o.searchParams.get("ids");if(!s)return e.writeHead(400),e.end(JSON.stringify({error:"Missing ids parameter"}));let i=s.split(",").map(n=>n.trim()).filter(Boolean),p=await ot(i);return e.writeHead(200,{"Content-Type":"application/json"}),e.end(JSON.stringify(p))}e.writeHead(404),e.end()}catch(o){e.writeHead(500),e.end(JSON.stringify({error:o.message||"Internal error"}))}}),Te.listen(0,"127.0.0.1",()=>{let t=Te?.address();t&&typeof t!="string"&&Xo(t.port)}))}function Xo(t){let e=st.join(Fo.homedir(),".ricwiz");Ee.existsSync(e)||Ee.mkdirSync(e,{recursive:!0}),Ee.writeFileSync(st.join(e,"port.txt"),t.toString(),"utf8"),Ee.writeFileSync(st.join(e,"jira-cli.js"),`
const http = require('http');
const fs = require('fs');
const path = require('path');
const os = require('os');

const portFile = path.join(os.homedir(), '.ricwiz', 'port.txt');
if (!fs.existsSync(portFile)) {
    console.error('Ricwiz extension is not running (port.txt missing).');
    process.exit(1);
}

const port = fs.readFileSync(portFile, 'utf8').trim();
const ids = process.argv.slice(2).join(',');

if (!ids) {
    console.error('Please provide at least one Jira ticket ID.');
    process.exit(1);
}

const options = {
    hostname: '127.0.0.1',
    port: parseInt(port, 10),
    path: '/tickets_batch?ids=' + encodeURIComponent(ids),
    method: 'GET'
};

const req = http.request(options, (res) => {
    let data = '';
    res.on('data', chunk => data += chunk);
    res.on('end', () => {
        if (res.statusCode !== 200) {
            console.error('Error fetching tickets:', data);
            process.exit(1);
        }
        console.log(data); // Print the raw JSON output for the agent
    });
});

req.on('error', (e) => {
    console.error('Failed to connect to Ricwiz extension. Is VS Code open?', e.message);
    process.exit(1);
});

req.end();
`.trim(),"utf8")}function Oo(){Te&&(Te.close(),Te=void 0)}var se;function ei(t){Pt(t),Uo(),se=new Ye(t.extensionUri),t.subscriptions.push(Me.window.registerWebviewViewProvider("ricwiz-webview",se));let e=Me.window.createStatusBarItem(Me.StatusBarAlignment.Left,100);e.command="ricwiz.openJiraTicket",t.subscriptions.push(e);let o=Lo(t,se,e);return Mo(t,se,o),{getJiraCredentials:async()=>({email:Me.workspace.getConfiguration("ricwiz").get("jiraEmail",""),token:await Ke()}),getGitLabToken:async()=>xe(),AiSkills:Io}}function ti(){Oo()}0&&(module.exports={activate,deactivate,webviewProvider});
