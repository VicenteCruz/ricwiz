"use strict";var Bo=Object.create;var Ge=Object.defineProperty;var So=Object.getOwnPropertyDescriptor;var Do=Object.getOwnPropertyNames;var Eo=Object.getPrototypeOf,To=Object.prototype.hasOwnProperty;var Mo=(t,e)=>{for(var o in e)Ge(t,o,{get:e[o],enumerable:!0})},ut=(t,e,o,s)=>{if(e&&typeof e=="object"||typeof e=="function")for(let r of Do(e))!To.call(t,r)&&r!==o&&Ge(t,r,{get:()=>e[r],enumerable:!(s=So(e,r))||s.enumerable});return t};var k=(t,e,o)=>(o=t!=null?Bo(Eo(t)):{},ut(e||!t||!t.__esModule?Ge(o,"default",{value:t,enumerable:!0}):o,t)),Lo=t=>ut(Ge({},"__esModule",{value:!0}),t);var Jo={};Mo(Jo,{activate:()=>No,deactivate:()=>Wo,webviewProvider:()=>re});module.exports=Lo(Jo);var Ne=k(require("vscode"));var $=k(require("vscode"));function x(t){return t?t.replace(/&/g,"&amp;").replace(/</g,"&lt;").replace(/>/g,"&gt;").replace(/"/g,"&quot;").replace(/'/g,"&#39;"):""}function He(t){let e=(t||"").toLowerCase().trim();return e==="open"?"#888888":e==="in progress"?"#007acc":e==="waiting for deploy"?"#d7a500":e==="close"||e==="done"||e==="closed"?"#238636":"var(--vscode-badge-background)"}function be(t){return t?t==="running"?"\u{1F7E1}":t==="success"?"\u{1F7E2}":t==="failed"?"\u{1F534}":t==="canceled"||t==="skipped"?"\u26AA":"":""}function G(){return`
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
    `}function H(){return`
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
    `}function gt(t,e){let o=H(),s=(e.files||[]).map(r=>`
        <button class="btn" style="padding: 6px; font-size: 12px; display: flex; justify-content: space-between; align-items: center;" onclick="sendOpenFileCommand('${x(r.file)}')">
            <span style="flex: 1; overflow: hidden; text-overflow: ellipsis; white-space: nowrap; direction: rtl; text-align: left;">&lrm;${x(r.file)}</span>
            <span style="font-size: 10px; opacity: 0.8; flex-shrink: 0; background-color: var(--vscode-badge-background); color: var(--vscode-badge-foreground); padding: 2px 4px; border-radius: 2px;">${x(r.state)}</span>
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
                Merging <b>${x(e.sourceStr)}</b> into <b>${x(e.targetStr)}</b>.<br/>
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

        ${G()}
    </body>
    </html>`}function ft(t){return`<!DOCTYPE html>
    <html lang="en">
    <head>
        <meta charset="UTF-8">
        <meta name="viewport" content="width=device-width, initial-scale=1.0">
        <title>Ricwiz Blame</title>
        ${H()}
    </head>
    <body>
        <div style="display: flex; align-items: center; gap: 8px; margin-bottom: 16px; margin-top: 8px;">
            <button class="btn" style="width: auto; padding: 4px 8px; background-color: var(--vscode-button-secondaryBackground); color: var(--vscode-button-secondaryForeground);" onclick="sendCommand('openDevTools', null, this)">\u2190 Back</button>
            <div style="font-weight: bold; font-size: 13px; flex: 1; text-align: center;">Who to Blame</div>
        </div>

        ${t?`
        <div style="padding: 12px; background: var(--vscode-editor-background); border: 1px solid var(--vscode-widget-border); border-radius: 6px; margin-bottom: 12px;">
            <div style="font-weight: bold; margin-bottom: 12px; font-size: 14px; text-align: center; color: var(--vscode-textLink-foreground); word-break: break-all;">
                \u25A4 ${x(t.fileName)}
            </div>

            <div style="margin-bottom: 20px;">
                <div style="font-size: 11px; font-weight: bold; opacity: 0.8; text-transform: uppercase; margin-bottom: 8px;"><span class="icon" style="color: #0A84FF;">\u25F3</span> Local Git (Last Commits)</div>
                <ul style="list-style-type: none; padding: 0; margin: 0; display: flex; flex-direction: column; gap: 8px;">
                    ${t.gitHistory&&t.gitHistory.length>0?t.gitHistory.map(o=>`
                        <li style="background: var(--vscode-editorWidget-background); border: 1px solid var(--vscode-widget-border); padding: 8px 10px; border-radius: 4px; border-left: 4px solid var(--vscode-gitDecoration-modifiedResourceForeground);">
                            <div style="display: flex; justify-content: space-between; margin-bottom: 4px; align-items: center;">
                                <strong style="font-size: 13px;">${x(o.author)}</strong>
                                <span style="opacity: 0.7; font-size: 11px;">${x(o.time)}</span>
                            </div>
                            <div style="font-size: 12px; margin-bottom: 6px; opacity: 0.9; font-style: italic;">"${x(o.message)}"</div>
                            <div style="font-family: monospace; font-size: 10px; opacity: 0.6;">Commit: ${x(o.hash)}</div>
                        </li>
                    `).join(""):'<li style="opacity:0.7; font-size: 12px;">No Git history found.</li>'}
                </ul>
            </div>

            <div style="margin-bottom: 20px;">
                <div style="font-size: 11px; font-weight: bold; opacity: 0.8; text-transform: uppercase; margin-bottom: 8px;"><span class="icon" style="color: #0A84FF;">\u2601</span> Salesforce Metadata</div>
                <div style="display: flex; flex-direction: column; gap: 8px;">
                    <div style="background: var(--vscode-editorWidget-background); border: 1px solid var(--vscode-widget-border); padding: 8px 10px; border-radius: 4px; border-left: 4px solid var(--vscode-gitDecoration-addedResourceForeground);">
                        <div style="font-size: 10px; opacity: 0.7; text-transform: uppercase; margin-bottom: 2px;">Last Modified By</div>
                        <div style="font-weight: bold; font-size: 13px;">${x(t.sfAuthor)}</div>
                        <div style="font-size: 11px; opacity: 0.7; margin-top: 2px;">${x(t.sfTime)}</div>
                    </div>
                    ${t.sfCreatedBy!=="Unknown"&&t.sfCreatedBy!=="N/A"?`
                    <div style="background: var(--vscode-editorWidget-background); border: 1px solid var(--vscode-widget-border); padding: 8px 10px; border-radius: 4px; border-left: 4px solid var(--vscode-gitDecoration-addedResourceForeground);">
                        <div style="font-size: 10px; opacity: 0.7; text-transform: uppercase; margin-bottom: 2px;">Created By</div>
                        <div style="font-weight: bold; font-size: 13px;">${x(t.sfCreatedBy)}</div>
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
                                <strong style="font-size: 13px;">${x(o.author)}</strong>
                                <span style="opacity: 0.7; font-size: 11px;">${x(o.time)}</span>
                            </div>
                            <div style="font-size: 12px; font-weight: 500; margin-bottom: 4px;">${x(o.action)}</div>
                            <div style="font-size: 11px; opacity: 0.7; font-style: italic; background: var(--vscode-editor-background); padding: 4px; border-radius: 3px;">${x(o.display)}</div>
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

        ${G()}
    </body>
    </html>`}function ht(t){let e=H(),o=t?.ticketId||"Jira",s=t?.summary||"No Title",r=t?.description||"No description provided.",p=t?.relatedBranches||[];return`<!DOCTYPE html>
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
            <span style="font-weight: 600; font-size: 13px;">${x(o)} Details</span>
        </div>
        
        <div class="card" style="padding: 16px;">
            <div class="jira-title">${x(s)}</div>
            <div class="jira-desc">${x(r)}</div>
            
            ${p.length>0?`
                <div style="margin-top: 16px; border-top: 1px solid var(--vscode-panel-border); padding-top: 12px;">
                    <div style="font-size: 11px; opacity: 0.7; margin-bottom: 8px; text-transform: uppercase; font-weight: bold;"><span class="icon" style="color: #32D74B;">\u2387</span> Related Branches & MRs</div>
                    <div style="display: flex; flex-direction: column; gap: 4px;">
                        ${p.map(a=>{let c=be(a.pipelineStatus),d="";return a.pipelineStatus==="failed"&&a.projectPath&&a.pipelineId&&(d=`onclick="event.stopPropagation(); sendCommand('showPipelineLogs', { projectPath: '${a.projectPath}', pipelineId: ${a.pipelineId} });" style="cursor: pointer;"`),`
                            <div class="btn" style="padding: 6px 10px; font-size: 12px; display: flex; justify-content: space-between; align-items: center; background-color: var(--vscode-button-secondaryBackground); color: var(--vscode-button-secondaryForeground); border-radius: 4px;" onclick="sendCheckoutCommand('${x(a.name)}', this)" title="Checkout ${x(a.name)}">
                                <div style="display: flex; align-items: center; gap: 6px; overflow: hidden;">
                                    <span style="overflow: hidden; text-overflow: ellipsis; white-space: nowrap; font-weight: bold;">${x(a.name)}</span>
                                </div>
                                <div style="display: flex; gap: 6px; align-items: center;">
                                    ${c?`<span title="Pipeline: ${a.pipelineStatus}" style="font-size: 11px;" ${d}>${c}</span>`:""}
                                    ${a.mrUrl?`<span onclick="event.stopPropagation(); sendCommand('openExternal', '${a.mrUrl}');" title="Open Merge Request" style="cursor: pointer; font-size: 12px;">\u{1F517}</span>`:""}
                                    ${a.isMerged?'<span style="background-color: var(--vscode-charts-green); color: white; border-radius: 3px; padding: 2px 6px; font-size: 10px; font-weight: bold;" title="Merged to target env">MERGED</span>':""}
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

        ${G()}
    </body>
    </html>`}function wt(t){let{data:e,showBranches:o}=t,s=H(),r=e||{queries:[],selectedIndex:0,results:[],error:null},p=r.queries.map((c,d)=>`
        <option value="${d}" ${d===r.selectedIndex?"selected":""}>${x(c.name)}</option>
    `).join(""),a=r.error?`
        <div style="color: var(--vscode-errorForeground); padding: 12px; text-align: center; background: var(--vscode-editorError-background); border-radius: 4px;">
            \u26A0 ${x(r.error)}
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
                    <tr style="border-bottom: ${c.detailedBranches&&c.detailedBranches.length>0?"none":"1px solid var(--vscode-panel-border)"}; cursor: pointer;" class="tr-hover" onclick="sendCommand('openJiraDetailsForId', '${x(c.key)}', this)">
                        <td style="padding: 6px; font-weight: bold; color: var(--vscode-textLink-foreground); white-space: nowrap;">${x(c.key)}</td>
                        <td style="padding: 6px; overflow: hidden; text-overflow: ellipsis; max-width: 150px; white-space: nowrap;" title="${x(c.summary)}">${x(c.summary)}</td>
                        <td style="padding: 6px; white-space: nowrap;">
                            <span style="background: ${He(c.status)}; color: white; padding: 2px 4px; border-radius: 3px; font-size: 9px; font-weight: bold; text-transform: uppercase;">${x(c.status)}</span>
                        </td>
                        <td style="padding: 6px; white-space: nowrap; text-align: center;">
                            ${c.detailedBranches?"":c.branch?`
                                <button class="icon-button" style="background-color: var(--vscode-button-secondaryBackground); color: var(--vscode-button-secondaryForeground); font-size: 10px; padding: 2px 6px;" title="Checkout ${x(c.branch)}" onclick="event.stopPropagation(); sendCommand('checkout', '${x(c.branch)}')">
                                    \u2387 Checkout
                                </button>
                            `:`
                                <button class="icon-button" style="background-color: var(--vscode-button-background); color: var(--vscode-button-foreground); font-size: 10px; padding: 2px 6px;" title="Create Branch for ${x(c.key)}" onclick="event.stopPropagation(); sendCommand('createBranchForTicket', '${x(c.key)}')">
                                    + Create
                                </button>
                            `}
                        </td>
                    </tr>
                    ${c.detailedBranches&&c.detailedBranches.length>0?`
                    <tr style="border-bottom: 1px solid var(--vscode-panel-border);">
                        <td colspan="4" style="padding: 0 6px 8px 6px;">
                            <div style="display: flex; flex-direction: column; gap: 4px; padding-left: 8px; border-left: 2px solid var(--vscode-editorIndentGuide-activeBackground1);">
                                ${c.detailedBranches.map(d=>{let n=be(d.pipelineStatus),i="";return d.pipelineStatus==="failed"&&d.projectPath&&d.pipelineId&&(i=`onclick="event.stopPropagation(); sendCommand('showPipelineLogs', { projectPath: '${d.projectPath}', pipelineId: ${d.pipelineId} });" style="cursor: pointer;"`),`
                                    <div style="display: flex; justify-content: space-between; align-items: center; font-size: 10px; background: var(--vscode-editor-background); padding: 2px 6px; border-radius: 3px;">
                                        <div style="display: flex; align-items: center; gap: 6px; overflow: hidden; cursor: pointer; flex: 1;" onclick="sendCheckoutCommand('${x(d.name)}', this)" title="Checkout ${x(d.name)}">
                                            <span style="overflow: hidden; text-overflow: ellipsis; white-space: nowrap;">${x(d.name)}</span>
                                            ${n?`<span title="Pipeline: ${d.pipelineStatus}" ${i}>${n}</span>`:""}
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
            ${a}
        </div>

        ${G()}
    </body>
    </html>`}function vt(){return`<!DOCTYPE html>
    <html lang="en">
    <head>
        <meta charset="UTF-8">
        <meta name="viewport" content="width=device-width, initial-scale=1.0">
        <title>Ricwiz DevTools</title>
        ${H()}
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
        
        ${G()}
    </body>
    </html>`}function bt(t){let{logoUri:e,currentBranch:o,currentBranchIsMerged:s,relatedBranches:r,commits:p,baseBranches:a,recentTickets:c,ticketTitle:d,ticketStatus:n,autoRefreshEnabled:i}=t,l=H(),m=p.length>0?`
        <div class="separator"></div>
        <div style="padding: 0 4px;">
            <div style="font-size: 11px; opacity: 0.7; margin-bottom: 6px; display: flex; align-items: center; gap: 4px;">
                <span>\u2637</span> Recent Commits
            </div>
            <div style="display: flex; flex-direction: column; gap: 2px;">
                ${p.map(b=>`
                    <div style="font-size: 11px; padding: 3px 4px; border-radius: 2px; display: flex; gap: 6px; align-items: baseline;">
                        <code style="color: var(--vscode-textLink-foreground); font-size: 10px; flex-shrink: 0;">${x(b.hash)}</code>
                        <span style="flex: 1; overflow: hidden; text-overflow: ellipsis; white-space: nowrap;" title="${x(b.message)}">${x(b.message)}</span>
                        <span style="font-size: 9px; opacity: 0.5; flex-shrink: 0;">${x(b.timeAgo)}</span>
                    </div>
                `).join("")}
            </div>
        </div>
    `:"",u=r.find(b=>b.name===o),f="";u&&(f=be(u.pipelineStatus));let w=u?u.mrUrl:void 0,h=r.filter(b=>b.name!==o),y=o?`
        <div style="background-color: var(--vscode-editor-inactiveSelectionBackground); padding: 10px; border-radius: 6px; margin-bottom: 16px; border: 1px solid var(--vscode-panel-border); box-shadow: 0 2px 4px rgba(0,0,0,0.1); position: relative;">
            ${d&&n?`
            <div style="position: absolute; top: 6px; right: 6px; z-index: 10; cursor: pointer; font-size: 9px; padding: 2px 6px; border-radius: 4px; background-color: ${He(n)}; color: white; border: 1px solid var(--vscode-panel-border); opacity: 0.9; font-weight: bold; text-transform: uppercase; display: flex; align-items: center; gap: 4px;" onclick="sendCommand('changeJiraStatus', null, this)" title="Update Jira Status">
                <span>\u270E</span><span>${x(n)}</span>
            </div>
            `:""}
            <div style="font-size: 10px; opacity: 0.7; margin-bottom: 4px; display: flex; align-items: center; justify-content: center; gap: 4px; text-transform: uppercase;">
                <span>Current Ticket / Branch</span>
                <button class="copy-btn" onclick="sendCommand('copyBranch', null, this)" title="Copy branch name to clipboard">\u2398</button>
            </div>
            <div style="font-weight: bold; font-size: 14px; word-break: break-all; text-align: center; color: var(--vscode-textLink-foreground); display: flex; justify-content: center; align-items: center; gap: 6px;">
                <span>${x(o)}</span>
                ${f?`<span title="Pipeline: ${u.pipelineStatus}" style="font-size: 12px;">${f}</span>`:""}
                ${w?`<span onclick="event.stopPropagation(); sendCommand('openExternal', '${w}');" title="Open Merge Request" style="cursor: pointer; font-size: 12px;">\u{1F517}</span>`:""}
                ${s?'<span style="background-color: var(--vscode-charts-green); color: white; border-radius: 3px; padding: 1px 4px; font-size: 10px; font-weight: bold;" title="Merged to target env">MERGED</span>':""}
            </div>
            ${d?`<div style="font-size: 12px; margin-top: 6px; text-align: center; opacity: 0.9; font-style: italic;">${x(d)}</div>`:""}
            ${h.length>0?`
                <div style="margin-top: 10px; border-top: 1px solid var(--vscode-panel-border); padding-top: 10px;">
                    <div style="font-size: 10px; opacity: 0.7; margin-bottom: 6px; text-transform: uppercase; text-align: center;">Sister Branches</div>
                    <div style="display: flex; flex-direction: column; gap: 4px;">
                        ${h.map(b=>{let P=be(b.pipelineStatus),S="";return b.pipelineStatus==="failed"&&b.projectPath&&b.pipelineId&&(S=`onclick="event.stopPropagation(); sendCommand('showPipelineLogs', { projectPath: '${b.projectPath}', pipelineId: ${b.pipelineId} });" style="cursor: pointer;"`),`
                            <div class="btn" style="padding: 6px 8px; font-size: 11px; display: flex; justify-content: space-between; align-items: center; background-color: var(--vscode-button-secondaryBackground); color: var(--vscode-button-secondaryForeground); border-radius: 4px; box-sizing: border-box; width: 100%;" onclick="sendCheckoutCommand('${x(b.name)}', this)" title="Checkout ${x(b.name)}">
                                <div style="display: flex; align-items: center; gap: 4px; overflow: hidden;">
                                    <span style="overflow: hidden; text-overflow: ellipsis; white-space: nowrap; font-weight: bold;">${x(b.name)}</span>
                                </div>
                                <div style="display: flex; gap: 4px; align-items: center;">
                                    ${P?`<span title="Pipeline: ${b.pipelineStatus}" style="font-size: 10px;" ${S}>${P}</span>`:""}
                                    ${b.mrUrl?`<span onclick="event.stopPropagation(); sendCommand('openExternal', '${b.mrUrl}');" title="Open Merge Request" style="cursor: pointer; font-size: 10px;">\u{1F517}</span>`:""}
                                    ${b.isMerged?'<span style="background-color: var(--vscode-charts-green); color: white; border-radius: 3px; padding: 1px 4px; font-size: 9px; font-weight: bold;" title="Merged to target env">MERGED</span>':""}
                                </div>
                            </div>`}).join("")}
                    </div>
                </div>
            `:c.length>0?`
                <div style="margin-top: 10px; border-top: 1px solid var(--vscode-panel-border); padding-top: 10px;">
                    <div style="font-size: 10px; opacity: 0.7; margin-bottom: 6px; text-transform: uppercase; text-align: center;">Recent Tickets</div>
                    <div style="display: flex; flex-direction: column; gap: 4px;">
                        ${c.map(b=>`
                            <div class="btn" style="padding: 6px 8px; font-size: 11px; display: flex; justify-content: space-between; align-items: center; background-color: var(--vscode-button-secondaryBackground); color: var(--vscode-button-secondaryForeground); border-radius: 4px; box-sizing: border-box; width: 100%;" onclick="sendCheckoutCommand('${x(b)}', this)" title="Checkout ${x(b)}">
                                <span style="font-weight: bold; overflow: hidden; text-overflow: ellipsis; white-space: nowrap;">${x(b)}</span>
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
                <button class="copy-btn" id="autoRefreshToggle" onclick="sendCommand('toggleAutoRefresh', null, this)" title="${i?"Auto-refresh is ON \u2014 click to disable":"Auto-refresh is OFF \u2014 click to enable"}" style="font-size: 11px; padding: 2px 6px; border-radius: 3px; border: 1px solid var(--vscode-panel-border); ${i?"opacity: 0.9; background-color: var(--vscode-button-secondaryBackground);":"opacity: 0.5;"}">
                    ${i?"\u26A1 Auto":"\u23F8\uFE0F Auto"}
                </button>
            </div>
        </div>

        ${y}

        ${a.length>0?`
            <div style="display: flex; gap: 4px; margin-bottom: 16px; flex-wrap: wrap; justify-content: center;">
                ${a.map(b=>{let P=b.split("/").pop()?.toUpperCase()||b.toUpperCase();return`
                    <button class="btn" style="flex: 1; min-width: 25%; justify-content: center; padding: 6px 4px; font-size: 10px; font-weight: bold; background-color: var(--vscode-button-secondaryBackground); color: var(--vscode-button-secondaryForeground); border-radius: 4px;" onclick="sendCheckoutCommand('${x(b)}', this)" title="Checkout ${x(b)}">
                        ${x(P)}
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

        ${m}
        
        ${G()}
    </body>
    </html>`}var Ve=class{constructor(e){this._extensionUri=e}_extensionUri;webviewView;currentBranchCache="";currentBranchIsMergedCache=!1;relatedBranchesCache=[];commitsCache=[];baseBranchesCache=[];recentTicketsCache=[];ticketTitleCache="";ticketStatusCache="";currentPage="main";blameDataCache=null;jiraDataCache=null;dashboardDataCache=null;dashboardShowBranches=!1;autoRefreshEnabled=!0;conflictState=null;resolveWebviewView(e,o,s){this.webviewView=e,e.webview.options={enableScripts:!0,localResourceRoots:[this._extensionUri]},this.updateView(),e.webview.onDidReceiveMessage(r=>{switch(r.command){case"createBranches":$.commands.executeCommand("ricwiz.createBranches");break;case"createBranchForTicket":$.commands.executeCommand("ricwiz.createBranches",r.args);break;case"prepareDeploy":$.commands.executeCommand("ricwiz.prepareDeploy");break;case"openMRs":$.commands.executeCommand("ricwiz.createMergeRequests");break;case"openMRsVSCode":$.commands.executeCommand("ricwiz.createMergeRequestsVSCode");break;case"openExternal":r.args&&$.env.openExternal($.Uri.parse(r.args));break;case"openJira":$.commands.executeCommand("ricwiz.openJiraTicket");break;case"showJiraDetails":$.commands.executeCommand("ricwiz.showJiraDetails");break;case"showPipelineLogs":$.commands.executeCommand("ricwiz.showPipelineLogs",r.args.projectPath,r.args.pipelineId);break;case"changeJiraStatus":$.commands.executeCommand("ricwiz.changeJiraStatus");break;case"addJiraComment":$.commands.executeCommand("ricwiz.addJiraComment");break;case"addJiraLabel":$.commands.executeCommand("ricwiz.addJiraLabel");break;case"setPage":this.setPage(r.args);break;case"openDashboard":$.commands.executeCommand("ricwiz.openJiraDashboard");break;case"openJiraDetailsForId":$.commands.executeCommand("ricwiz.openJiraDetailsForId",r.args);break;case"refreshDashboard":$.commands.executeCommand("ricwiz.openJiraDashboard");break;case"switchDashboardQuery":$.commands.executeCommand("ricwiz.openJiraDashboard",parseInt(r.args,10));break;case"toggleDashboardBranches":$.commands.executeCommand("ricwiz.toggleDashboardBranches",r.args);break;case"openJiraVSCode":$.commands.executeCommand("ricwiz.openJiraTicketVSCode");break;case"openSettings":$.commands.executeCommand("ricwiz.openSettings");break;case"checkout":let p=r.branch||r.args;p&&$.commands.executeCommand("ricwiz.checkoutBranch",p);break;case"copyBranch":$.commands.executeCommand("ricwiz.copyBranchName");break;case"generatePackageXml":$.commands.executeCommand("ricwiz.generatePackageXml");break;case"openDevTools":this.setPage("devtools");break;case"openMain":this.setPage("main");break;case"generateDestructiveChanges":$.commands.executeCommand("ricwiz.generateDestructiveChanges");break;case"deployPackage":$.commands.executeCommand("ricwiz.deployPackage");break;case"runSmartTests":$.commands.executeCommand("ricwiz.runSmartTests");break;case"importData":$.commands.executeCommand("ricwiz.importData");break;case"listTicketFiles":$.commands.executeCommand("ricwiz.listTicketFiles");break;case"resetTracking":$.commands.executeCommand("ricwiz.resetTracking");break;case"extractComponent":$.commands.executeCommand("ricwiz.extractComponent");break;case"deployMultiOrg":$.commands.executeCommand("ricwiz.deployMultiOrg");break;case"captureAdminChanges":$.commands.executeCommand("ricwiz.captureAdminChanges");break;case"whoToBlame":$.commands.executeCommand("ricwiz.whoToBlame");break;case"syncAll":$.commands.executeCommand("ricwiz.syncAll");break;case"updateBases":$.commands.executeCommand("ricwiz.updateBases");break;case"deleteUnused":$.commands.executeCommand("ricwiz.deleteUnusedBranches");break;case"conflict_commitAndContinue":$.commands.executeCommand("ricwiz.conflictAction","commitAndContinue");break;case"conflict_resolveDeletions":$.commands.executeCommand("ricwiz.conflictAction","resolveDeletions");break;case"conflict_abortDeploy":$.commands.executeCommand("ricwiz.conflictAction","abortDeploy");break;case"openFile":if(r.file){let a=$.workspace.workspaceFolders;if(a){let c=$.Uri.joinPath(a[0].uri,r.file);$.commands.executeCommand("vscode.open",c)}}break;case"searchTicket":$.commands.executeCommand("ricwiz.searchTicket");break;case"manualRefresh":$.commands.executeCommand("ricwiz.manualRefresh");break;case"toggleAutoRefresh":$.commands.executeCommand("ricwiz.toggleAutoRefresh");break;case"openHistory":$.commands.executeCommand("ricwiz.openHistory");break}})}setConflictState(e){this.conflictState=e,this.updateView()}updateBranch(e,o,s=[],r=[],p=[],a=[],c="",d=""){this.currentBranchCache=e,this.currentBranchIsMergedCache=o,this.relatedBranchesCache=s,this.commitsCache=r,this.baseBranchesCache=p,this.recentTicketsCache=a,this.ticketTitleCache=c,this.ticketStatusCache=d,this.webviewView&&this.updateView()}setDashboardShowBranches(e){this.dashboardShowBranches=e}getDashboardShowBranches(){return this.dashboardShowBranches}setBlameData(e){this.blameDataCache=e}setJiraData(e){this.jiraDataCache=e}setDashboardData(e){this.dashboardDataCache=e}setAutoRefresh(e){this.autoRefreshEnabled=e,this.updateView()}isAutoRefreshEnabled(){return this.autoRefreshEnabled}setPage(e){this.currentPage=e,this.updateView()}updateView(){if(!this.webviewView)return;let e=this.webviewView.webview.asWebviewUri($.Uri.joinPath(this._extensionUri,"resources","logo.png"));if(this.conflictState){this.webviewView.webview.html=gt(e,this.conflictState);return}switch(this.currentPage){case"blame":this.webviewView.webview.html=ft(this.blameDataCache);break;case"jira":this.webviewView.webview.html=ht(this.jiraDataCache);break;case"dashboard":this.webviewView.webview.html=wt({data:this.dashboardDataCache,showBranches:this.dashboardShowBranches});break;case"devtools":this.webviewView.webview.html=vt();break;default:this.webviewView.webview.html=bt({logoUri:e,currentBranch:this.currentBranchCache,currentBranchIsMerged:this.currentBranchIsMergedCache,relatedBranches:this.relatedBranchesCache,commits:this.commitsCache,baseBranches:this.baseBranchesCache,recentTickets:this.recentTicketsCache,ticketTitle:this.ticketTitleCache,ticketStatus:this.ticketStatusCache,autoRefreshEnabled:this.autoRefreshEnabled});break}}};var ae;function yt(t){ae=t.secrets}async function xt(t){if(!ae)throw new Error("SecretStorage is not initialized.");await ae.store("ricwiz.jiraApiToken",t)}async function kt(){if(!ae)throw new Error("SecretStorage is not initialized.");return await ae.get("ricwiz.jiraApiToken")}async function Ct(t){if(!ae)throw new Error("SecretStorage is not initialized.");await ae.store("ricwiz.gitlabApiToken",t)}async function Ae(){if(!ae)throw new Error("SecretStorage is not initialized.");return await ae.get("ricwiz.gitlabApiToken")}var v=k(require("vscode"));var N=k(require("vscode")),Qe=k(require("path")),he=k(require("fs"));var De=k(require("vscode")),$t=k(require("child_process")),Rt=k(require("util")),Ao=Rt.promisify($t.exec),R=De.window.createOutputChannel("Ricwiz"),g=async(t,e)=>{R.appendLine(`[EXEC] ${t}`);let o=await Ao(t,{maxBuffer:50*1024*1024,...e});return{stdout:o.stdout.toString(),stderr:o.stderr.toString()}};function C(){let t=De.workspace.workspaceFolders;if(t)return t[0].uri.fsPath}async function L(t){try{let{stdout:e}=await g("git branch --show-current",{cwd:t});return e.trim()}catch{return""}}function ce(t,e){if(!t.includes(e)){let o=t.match(/([A-Z]+-)\d+/i);if(o)return o[1].toUpperCase()}return e}function de(t,e,o=!1){let s=t.match(new RegExp(`(${e}\\d+)`,"i"));return s?s[1].toUpperCase():t.includes(e)&&!t.includes("-to-")?t.substring(t.indexOf(e)):o&&t.includes("-to-")?t.substring(t.indexOf(e)).split("-to-")[0]:""}function tt(t,e){let o=xe(t);return/^\d/.test(o)?`${e}${o}`.toUpperCase():o.toUpperCase()}async function V(t,e){let o=De.workspace.getConfiguration("ricwiz"),s=e?.prefix??o.get("ticketPrefix","SFPSCA-"),r=await L(t),p=ce(r,s),a=e?.suggestedValue??de(r,p,e?.handleToSuffix),c=await De.window.showInputBox({prompt:e?.prompt||"Enter the full ticket ID (e.g., SCPSCA-1234) or just the number",placeHolder:e?.placeHolder||"Ticket ID or number",value:a});return c?{ticketId:tt(c,p),currentBranch:r,prefix:p}:void 0}async function ye(t,e){try{return await g(`git show-ref --verify --quiet refs/heads/${e}`,{cwd:t}),!0}catch{}return await Io(t,e)}async function Io(t,e){try{let{stdout:o}=await g(`git branch -r --list "*/${e}"`,{cwd:t});return o.trim().length>0}catch{return!1}}function xe(t){return t.replace(/[&|;$><`\\!"'\r\n]/g,"").trim()}var ke=k(require("vscode")),zt=k(require("path")),qe=k(require("fs"));var z=class t{style;upstreamRemote;originRemote;ticketSourceBranch;ticketPrefix;branchPrefix;environments;activeProfile;profileName;constructor(e){this.activeProfile=e,this.profileName=e?.name;let o=ke.workspace.getConfiguration("ricwiz");this.style=e?.workflowStyle||o.get("workflowStyle","standard"),this.style==="multi-remote"?(this.upstreamRemote=e?.upstreamRemote||o.get("upstreamRemote","salesforce-master"),this.originRemote=e?.originRemote||o.get("originRemote","origin")):(this.upstreamRemote="origin",this.originRemote="origin"),this.ticketSourceBranch=e?.ticketSourceBranch||o.get("ticketSourceBranch","main"),this.ticketPrefix=e?.ticketPrefix||o.get("ticketPrefix","SFPSCA-"),this.branchPrefix=e?.branchPrefix??o.get("branchPrefix","");let s=[{name:"Qual",sourceBranch:"quality"},{name:"Val",sourceBranch:"validation"},{name:"Prod",sourceBranch:"main"}];this.environments=e?.environments||o.get("environments",s)}getConfig(e,o){return this.activeProfile&&this.activeProfile[e]!==void 0?this.activeProfile[e]:ke.workspace.getConfiguration("ricwiz").get(e,o)}static async initialize(e,o){let r=ke.workspace.getConfiguration("ricwiz").get("profiles",[]),p=zt.join(e,"ricwiz.json");if(qe.existsSync(p))try{let a=qe.readFileSync(p,"utf-8"),c=JSON.parse(a);c&&Array.isArray(c.profiles)&&(r=[...r,...c.profiles])}catch(a){ke.window.showErrorMessage(`Ricwiz: Error parsing ricwiz.json: ${a.message}`)}if(r.length>0){if(!o?.forcePrompt)try{let{stdout:n}=await g("git branch --show-current",{cwd:e}),i=n.trim(),l=i;i.includes("-to-")&&(l=i.split("-to-")[0]);let{stdout:m}=await g(`git config branch.${l}.ricwiz-profile`,{cwd:e}),u=m.trim();if(u){let f=r.find(w=>w.name===u);if(f)return new t(f)}}catch{}if(o?.skipPrompt)return new t;let a=r.map(n=>n.name),c=await ke.window.showQuickPick(a,{placeHolder:"Ricwiz: Select Workflow Profile",ignoreFocusOut:!0});if(!c)return;let d=r.find(n=>n.name===c);return new t(d)}return new t}buildUpstreamPath(e){return e.includes("/")?e:`${this.upstreamRemote}/${e}`}getFetchRemote(e){return e.includes("/")?e.split("/")[0]:this.upstreamRemote}getFetchBranch(e){return e.includes("/")?e.substring(e.indexOf("/")+1):e}};function _e(t){let e=t.replace(/\\/g,"/");if(e.includes("/classes/")){let o=e.match(/\/classes\/([^/.]+)\.cls/);if(o)return{type:"ApexClass",name:o[1]}}if(e.includes("/triggers/")){let o=e.match(/\/triggers\/([^/.]+)\.trigger/);if(o)return{type:"ApexTrigger",name:o[1]}}if(e.includes("/lwc/")){let o=e.match(/\/lwc\/([^/]+)\//);if(o)return{type:"LightningComponentBundle",name:o[1]}}if(e.includes("/aura/")){let o=e.match(/\/aura\/([^/]+)\//);if(o)return{type:"AuraDefinitionBundle",name:o[1]}}if(e.includes("/objects/")&&e.includes("/fields/")){let o=e.match(/\/objects\/([^/]+)\//),s=e.match(/\/fields\/([^/.]+)\.field/);if(o&&s)return{type:"CustomField",name:`${o[1]}.${s[1]}`}}if(e.includes("/objects/")){let o=e.match(/\/objects\/([^/.]+)\.object/);if(o)return{type:"CustomObject",name:o[1]}}if(e.includes("/layouts/")){let o=e.match(/\/layouts\/([^/.]+)\.layout/);if(o)return{type:"Layout",name:o[1]}}if(e.includes("/flows/")){let o=e.match(/\/flows\/([^/.]+)\.flow/);if(o)return{type:"Flow",name:o[1]}}if(e.includes("/permissionsets/")){let o=e.match(/\/permissionsets\/([^/.]+)\.permissionset/);if(o)return{type:"PermissionSet",name:o[1]}}if(e.includes("/permissionsetgroups/")){let o=e.match(/\/permissionsetgroups\/([^/.]+)\.permissionsetgroup/);if(o)return{type:"PermissionSetGroup",name:o[1]}}if(e.includes("/profiles/")){let o=e.match(/\/profiles\/([^/.]+)\.profile/);if(o)return{type:"Profile",name:o[1]}}if(e.includes("/customMetadata/")){let o=e.match(/\/customMetadata\/([^/.]+)\.md/);if(o)return{type:"CustomMetadata",name:o[1]}}if(e.includes("/flexipages/")){let o=e.match(/\/flexipages\/([^/.]+)\.flexipage/);if(o)return{type:"FlexiPage",name:o[1]}}return null}async function Pt(){let t=C();if(!t){N.window.showErrorMessage("Ricwiz: Open a workspace that is a Git repository.");return}let e=await z.initialize(t,{skipPrompt:!0}),o=e?e.ticketSourceBranch:N.workspace.getConfiguration("ricwiz").get("ticketSourceBranch","main"),s=e?e.originRemote:"origin";await N.window.withProgress({location:N.ProgressLocation.Notification,title:`Ricwiz: Finding deleted files compared to ${s}/${o}...`,cancellable:!1},async()=>{try{let{stdout:r}=await g(`git diff --name-only --diff-filter=D ${s}/${o}...HEAD`,{cwd:t}),p=r.split(`
`).map(u=>u.trim()).filter(u=>u.length>0);if(p.length===0){N.window.showInformationMessage(`Ricwiz: No deleted files found compared to ${s}/${o}.`);return}let a={},c=(u,f)=>{a[u]||(a[u]=[]),a[u].includes(f)||a[u].push(f)};for(let u of p){let f=_e(u);f&&c(f.type,f.name)}if(Object.keys(a).length===0){N.window.showInformationMessage("Ricwiz: Found deleted files in Git, but none mapped to recognizable Salesforce metadata.");return}let d=`<?xml version="1.0" encoding="UTF-8"?>
<Package xmlns="http://soap.sforce.com/2006/04/metadata">
`;for(let u of Object.keys(a).sort()){d+=`    <types>
`;for(let f of a[u].sort())d+=`        <members>${f}</members>
`;d+=`        <name>${u}</name>
    </types>
`}d+=`    <version>58.0</version>
</Package>`;let n=Qe.join(t,"destructiveChanges");he.existsSync(n)||he.mkdirSync(n);let i=Qe.join(n,"destructiveChanges.xml"),l=Qe.join(n,"package.xml");he.writeFileSync(i,d,"utf8"),he.existsSync(l)||he.writeFileSync(l,`<?xml version="1.0" encoding="UTF-8"?>
<Package xmlns="http://soap.sforce.com/2006/04/metadata">
    <version>58.0</version>
</Package>`,"utf8");let m=await N.workspace.openTextDocument(i);await N.window.showTextDocument(m),N.window.showInformationMessage("Ricwiz: destructiveChanges.xml generated successfully!")}catch(r){N.window.showErrorMessage(`Ricwiz: Error generating destructive changes: ${r.message}`)}})}var ie=k(require("vscode"));async function Bt(){let t=C();if(!t)return;let e=await z.initialize(t,{skipPrompt:!0}),o=e?e.ticketSourceBranch:ie.workspace.getConfiguration("ricwiz").get("ticketSourceBranch","main"),s=e?e.originRemote:"origin";await ie.window.withProgress({location:ie.ProgressLocation.Notification,title:"Ricwiz: Finding Apex Tests to run...",cancellable:!1},async()=>{try{let{stdout:r}=await g(`git diff --name-status ${s}/${o}...HEAD`,{cwd:t}),p=r.split(`
`).map(u=>u.trim()).filter(u=>u.length>0),a=new Set,c=new Set;for(let u of p){let f=u.split(/\s+/);if(f[0].startsWith("D"))continue;let w=f[1];if(w&&w.endsWith(".cls")){let h=w.match(/\/classes\/([^/.]+)\.cls/);if(h){let y=h[1];y.toLowerCase().endsWith("test")?a.add(y):c.add(y)}}}for(let u of c)a.add(`${u}Test`);if(a.size===0){ie.window.showInformationMessage("Ricwiz: No Apex Classes were modified in this branch.");return}let d=Array.from(a).map(u=>({label:`$(beaker) ${u}`,description:"Apex Test Class"})),n=await ie.window.showQuickPick(d,{canPickMany:!0,title:"Select Test Classes to Run",placeHolder:"Select tests..."});if(!n||n.length===0)return;let l=`sf apex run test -n ${n.map(u=>u.label.replace("$(beaker) ","").trim()).join(",")} -r human -w 30`,m=ie.window.createTerminal("Ricwiz: Smart Tests");m.show(),m.sendText(l)}catch(r){ie.window.showErrorMessage(`Ricwiz: Error finding tests: ${r.message}`)}})}var T=k(require("vscode"));var Ce=class{static isValidShellArg(e){return e?/^[a-zA-Z0-9\-_/.]+$/.test(e):!1}};async function St(t){let e=C();if(!e){T.window.showErrorMessage("Open a folder or workspace that is a Git repository.");return}let o=await z.initialize(e,{forcePrompt:!0});if(!o)return;let s=typeof t=="string"?t:void 0,r=await V(e,{prefix:o.ticketPrefix,suggestedValue:s});if(!r){T.window.showErrorMessage("Branch creation cancelled: Ticket not provided.");return}let{ticketId:p}=r,a=o.environments,c="all",d=[{label:"Create Main Branch & Environments",description:"Creates the main ticket branch and all environment branches",value:"all"},{label:"Create Main Branch Only",description:"Creates only the main ticket branch (skips environments)",value:"mainOnly"},{label:"Create Environments Only",description:"Creates only the environment branches (skip main branch)",value:"envs"}];if(a.length>0){let m=await T.window.showQuickPick(d,{placeHolder:"Ricwiz: What do you want to create?",ignoreFocusOut:!0});if(!m)return;c=m.value}let n=o.ticketSourceBranch;if(c==="all"||c==="mainOnly"){let m=[];try{let{stdout:h}=await g('git branch --all --format="%(refname:short)"',{cwd:e});m=h.split(`
`).map(y=>y.trim()).filter(y=>y&&y!=="origin"),m=[...new Set(m)]}catch{}let u=T.window.createQuickPick();u.title="Ricwiz: Ticket Source Branch",u.placeholder="Confirm or change the source branch for this ticket",u.value=o.ticketSourceBranch,u.ignoreFocusOut=!0;let f=()=>{let h=u.value.trim(),y=[];h&&y.push({label:h,description:"Use typed branch"}),y.push(...m.map(b=>({label:b}))),u.items=y};u.onDidChangeValue(f),f();let w=await new Promise(h=>{u.onDidAccept(()=>{let y=u.selectedItems[0];h(y?y.label:u.value),u.hide()}),u.onDidHide(()=>h(void 0)),u.show()});if(!w){T.window.showInformationMessage("Branch creation cancelled.");return}n=w.trim()}let i="";if(o.branchPrefix){let m=await T.window.showInputBox({prompt:"Ricwiz: Branch Prefix (leave empty to not use a prefix)",placeHolder:"e.g. CRC-R19-",value:o.branchPrefix,ignoreFocusOut:!0});if(m===void 0){T.window.showInformationMessage("Branch creation cancelled.");return}i=m.trim()}let l=i?`${i}${p}`:p;if(!Ce.isValidShellArg(l)){T.window.showErrorMessage(`Invalid format for ticket ID: ${l}`);return}if(!Ce.isValidShellArg(n)){T.window.showErrorMessage(`Invalid format for ticketSourceBranch in settings: ${n}`);return}for(let m of a){if(!Ce.isValidShellArg(m.name)){T.window.showErrorMessage(`Invalid format for environment name in settings: ${m.name}`);return}if(!Ce.isValidShellArg(m.sourceBranch)){T.window.showErrorMessage(`Invalid format for environment sourceBranch in settings: ${m.sourceBranch}`);return}}try{await g("git status",{cwd:e})}catch{T.window.showErrorMessage("The opened folder does not appear to be a valid Git repository.");return}try{await T.window.withProgress({location:T.ProgressLocation.Notification,title:"Ricwiz: Creating Branches",cancellable:!1},async m=>{let u=[];m.report({message:"Checking remote status (git fetch)...",increment:10});try{await g("git fetch",{cwd:e})}catch{}try{if(c==="all"||c==="mainOnly"){if(m.report({message:`Creating main branch ${l}...`,increment:10}),await ye(e,l))T.window.showInformationMessage(`Ricwiz: The branch ${l} already exists. Skipping creation...`),await g(`git checkout ${l}`,{cwd:e});else try{let f=o.getFetchRemote(n),w=o.getFetchBranch(n),h=o.buildUpstreamPath(n);await g(`git fetch ${f} ${w}`,{cwd:e}),await g(`git checkout -b ${l} ${h}`,{cwd:e}),u.push(l)}catch{try{await g(`git checkout -b ${l} ${n}`,{cwd:e}),u.push(l)}catch{throw new Error(`Could not create main branch '${l}' from '${n}'. Does the source branch exist?`)}}try{await g(`git config branch.${l}.ricwiz-source "${n}"`,{cwd:e}),o.profileName&&await g(`git config branch.${l}.ricwiz-profile "${o.profileName}"`,{cwd:e})}catch{}}if(c==="all"||c==="envs"){let f=50/(a.length||1);for(let w of a){let h=i?`${i}${p}-to-${w.name}`:`${p}-to-${w.name}`,y=w.sourceBranch;if(m.report({message:`Processing environment branch ${h}...`,increment:f}),!await ye(e,h))try{let b=o.buildUpstreamPath(y);await g(`git checkout -b ${h} ${b}`,{cwd:e}),u.push(h)}catch{try{await g(`git checkout -b ${h} ${y}`,{cwd:e}),u.push(h)}catch{throw new Error(`Could not create environment branch '${h}' from '${y}'. Does the source branch exist?`)}}}}m.report({message:`Publishing branches to ${o.originRemote}...`,increment:10});for(let f of u)try{await g(`git push -u ${o.originRemote} ${f}`,{cwd:e})}catch{T.window.showWarningMessage(`Ricwiz: Branch ${f} was created locally but could not be pushed to ${o.originRemote}.`)}if(c==="all"||c==="mainOnly"){m.report({message:`Switching to ${l}...`,increment:10});try{await g(`git checkout ${l}`,{cwd:e})}catch{}}m.report({increment:100}),T.window.showInformationMessage("Ricwiz: All set! You can start working on your branches! \u{1F680}")}catch(f){if(T.window.showErrorMessage(`Ricwiz Branch Creation Failed: ${f.message}`),u.length>0){try{await g(`git checkout ${n}`,{cwd:e})}catch{}for(let w of u)try{await g(`git branch -D ${w}`,{cwd:e})}catch{}T.window.showWarningMessage(`Ricwiz: Rolled back (deleted) ${u.length} branch(es) locally due to failure.`)}}})}catch(m){T.window.showErrorMessage(`Ricwiz general error: ${m.message}`)}}var U=k(require("vscode"));var we=k(require("vscode")),Ie=k(require("fs")),Fe=k(require("path"));var it;function ot(t){it=t}async function Dt(t){it&&await it(t)}async function $e(t,e,o,s,r){s&&s.report({message:"CONFLICT! Resolve & click 'Commit & Continue' in Ricwiz panel."});let p=!1,a=!1;r&&r.onCancellationRequested(()=>{a=!0});let c=async()=>{try{let{stdout:i}=await g("git status --porcelain",{cwd:t});return i.split(`
`).filter(l=>{let m=l.substring(0,2);return["UD","DU","DD","AU","UA"].includes(m)}).map(l=>l.substring(3).trim())}catch{return[]}},d=async()=>{try{let i=m=>m==="UU"?"Both Modified":m==="UD"?"Deleted by them":m==="DU"?"Deleted by us":m==="DD"?"Both Deleted":m==="AA"?"Both Added":m==="AU"?"Added by us":m==="UA"?"Added by them":"Conflicted",{stdout:l}=await g("git status --porcelain",{cwd:t});return l.split(`
`).map(m=>m.trimEnd()).filter(m=>m.length>2).filter(m=>{let u=m.substring(0,2);return["UU","AA","UD","DU","AU","UA","DD"].includes(u)}).map(m=>{let u=m.substring(0,2);return{file:m.substring(3).trim(),state:i(u)}})}catch{return[]}},n=async()=>{if(p)return;let i=await c(),l=await d();re&&re.setConflictState({isConflict:!0,sourceStr:e,targetStr:o,deletionsCount:i.length,files:l})};for(ot(async i=>{if(i==="abortDeploy")a=!0;else if(i==="resolveDeletions"){try{let m=(await c()).map(f=>({label:f})),u=await we.window.showQuickPick(m,{canPickMany:!0,placeHolder:"Select conflicted files to DELETE",title:"Ricwiz: Delete Conflicted Files"});if(u&&u.length>0){for(let f of u)try{await g(`git rm --force "${f.label}"`,{cwd:t})}catch{}we.window.showInformationMessage(`Ricwiz: Deleted ${u.length} conflicted file(s).`)}}catch(l){we.window.showErrorMessage(`Ricwiz: Error. (${l.message})`)}n()}else if(i==="commitAndContinue")try{let m=(await c()).filter(f=>Ie.existsSync(Fe.join(t,f)));if(m.length>0&&await we.window.showWarningMessage(`Wait! There are ${m.length} file(s) with deletion conflicts that are still on your disk.

If you commit now, you will KEEP them in the project.

Are you sure you want to KEEP them?`,{modal:!0},"Yes, KEEP them","No, let me DELETE them")!=="Yes, KEEP them"){n();return}let u=!1;try{let{stdout:f}=await g('git grep -E "^<<<<<<< "',{cwd:t});f.trim().length>0&&(u=!0)}catch{}if(u){we.window.showErrorMessage("Ricwiz: You still have unresolved conflict markers (<<<<<<<) in your files. Please resolve them first!"),n();return}await g("git add .",{cwd:t}),await g("git commit --no-edit",{cwd:t})}catch(l){we.window.showErrorMessage(`Ricwiz: Could not commit automatically. (${l.message})`),n()}}),n();;){if(a){p=!0,ot(void 0),re?.setConflictState(null);try{await g("git merge --abort",{cwd:t})}catch{}return!1}try{let{stdout:i}=await g("git status --porcelain",{cwd:t}),l=i.split(`
`).some(h=>{let y=h.substring(0,2);return["UU","AA","UD","DU","AU","UA","DD"].includes(y)}),m=Fe.join(t,".git","MERGE_HEAD"),u=Fe.join(t,".git","REBASE_HEAD"),f=Fe.join(t,".git","CHERRY_PICK_HEAD");if(!(l||Ie.existsSync(m)||Ie.existsSync(u)||Ie.existsSync(f)))return p=!0,ot(void 0),re?.setConflictState(null),we.window.showInformationMessage("Ricwiz: Changes committed!"),!0}catch{}await new Promise(i=>setTimeout(i,2e3))}}var Ye=k(require("https")),Et=k(require("vscode"));async function st(){let t=await Ae();return!!(t&&t.trim())}async function Fo(t,e){let o=Et.workspace.getConfiguration("ricwiz"),s=(await Ae())?.trim();if(!s)throw new Error("No GitLab token");let r=e?e.getConfig("gitlabUrlOverride",""):o.get("gitlabUrlOverride",""),p=[];if(r&&r.trim()!=="")p.push(r.trim());else try{let{stdout:c}=await g("git remote",{cwd:t}),d=c.split(`
`).map(i=>i.trim()).filter(i=>i),n=[];e&&e.upstreamRemote&&d.includes(e.upstreamRemote)&&n.push(e.upstreamRemote),e&&e.originRemote&&e.originRemote!==e.upstreamRemote&&d.includes(e.originRemote)&&n.push(e.originRemote),d.includes("upstream")&&!n.includes("upstream")&&n.push("upstream"),d.includes("origin")&&!n.includes("origin")&&n.push("origin"),n.length===0&&d.length>0&&n.push(...d);for(let i of n)try{let{stdout:l}=await g(`git remote get-url ${i}`,{cwd:t}),m=l.trim();m.endsWith(".git")&&(m=m.slice(0,-4)),m.startsWith("git@")&&(m=m.replace("git@","").replace(":","/"),m=`https://${m}`),p.push(m)}catch(l){R.appendLine(`[GitLab API] Error getting remote URL for ${i}: ${l.message}`)}}catch(c){R.appendLine(`[GitLab API] Error getting remotes: ${c.message}`)}if(p.length===0)throw R.appendLine("[GitLab API] No candidate URLs found in getGitlabTargets!"),new Error("Could not get any remote origin URL.");return p.map(c=>{let d=new URL(c),n=`${d.protocol}//${d.host}`,i=d.pathname;i.startsWith("/")&&(i=i.substring(1)),i.endsWith("/")&&(i=i.slice(0,-1)),i.endsWith(".git")&&(i=i.slice(0,-4));let l=encodeURIComponent(i);return{baseUrl:n,token:s,projectPath:l}})}var Uo=new Ye.Agent({keepAlive:!0,maxSockets:10});async function rt(t,e,o,s){let r=new URL(`${t}${s}`);return R.appendLine(`[GitLab API] ${o} ${r.toString()}`),new Promise((p,a)=>{let c=Ye.request(r,{method:o,timeout:5e3,agent:Uo,headers:{"PRIVATE-TOKEN":e,Accept:"application/json"}},d=>{let n="";d.on("data",i=>n+=i),d.on("end",()=>{if(R.appendLine(`[GitLab API] Response Code: ${d.statusCode}`),d.statusCode&&d.statusCode>=400)return R.appendLine(`[GitLab API] Error Data: ${n}`),a(new Error(`GitLab API error: ${d.statusCode}`));if(!n)return p({});try{let i=JSON.parse(n);Array.isArray(i)?R.appendLine(`[GitLab API] Returned array with ${i.length} items`):i&&typeof i=="object"&&R.appendLine(`[GitLab API] Returned object with id ${i.id||i.iid||"unknown"}`),p(i)}catch(i){R.appendLine(`[GitLab API] Parse Error: ${i.message}`),a(i)}})});c.on("timeout",()=>{c.destroy(),a(new Error("GitLab request timed out"))}),c.on("error",d=>{R.appendLine(`[GitLab API] Request Failed: ${d.message}`),a(d)}),c.end()})}var nt=new Map,Oo=30*1e3;async function at(t,e,o,s){R.appendLine(`[GitLab API] fetchMergeRequestStatus called for source: ${e}, target: ${o||"any"}`);let r=`${t}:${e}:${o||"any"}`,p=nt.get(r);if(p&&Date.now()-p.timestamp<Oo)return p.data;try{let a=await Fo(t,s),c=null,d=-1;for(let n of a)try{let i=`/api/v4/projects/${n.projectPath}/merge_requests?source_branch=${encodeURIComponent(e)}&order_by=updated_at&sort=desc`;o&&(i+=`&target_branch=${encodeURIComponent(o)}`);let l=await rt(n.baseUrl,n.token,"GET",i);if(l&&l.length>0){let m=l[0];try{let h=await rt(n.baseUrl,n.token,"GET",`/api/v4/projects/${n.projectPath}/merge_requests/${m.iid}`);h&&(m=h)}catch{}let u="none";if(m.head_pipeline&&m.head_pipeline.status){let h=m.head_pipeline.status;h==="success"||h==="failed"||h==="canceled"||h==="skipped"?u=h:u="running"}let f={isMerged:m.state==="merged",isOpen:m.state==="opened",pipelineStatus:u,webUrl:m.web_url,projectPath:n.projectPath,pipelineId:m.head_pipeline?m.head_pipeline.id:void 0},w=0;f.isOpen?w=2:f.isMerged&&(w=1),w>d&&(c=f,d=w)}}catch(i){R.appendLine(`[GitLab API] Error inside target loop: ${i.message}`)}if(c)return nt.set(r,{data:c,timestamp:Date.now()}),c;for(let n of a)try{let i=`/api/v4/projects/${n.projectPath}/pipelines?ref=${encodeURIComponent(e)}&order_by=updated_at&sort=desc`,l=await rt(n.baseUrl,n.token,"GET",i);if(l&&l.length>0){let m=l[0],u="none";if(m.status){let w=m.status;w==="success"||w==="failed"||w==="canceled"||w==="skipped"?u=w:u="running"}let f={isMerged:!1,isOpen:!1,pipelineStatus:u,webUrl:m.web_url,projectPath:n.projectPath,pipelineId:m.id};return nt.set(r,{data:f,timestamp:Date.now()}),f}}catch{}return null}catch(a){return R.appendLine(`[GitLab API] Failed to fetch MR status: ${a.message}`),null}}function Tt(t,e){return e.find(o=>t.endsWith(`-to-${o.name}`))}async function Re(t,e,o,s,r){let p=await st(),a=e.map(async c=>{let d=Tt(c,s);if(p){let n=d?d.sourceBranch:void 0,i=await at(t,c,n,r);if(i)return{name:c,isMerged:i.isMerged,pipelineStatus:i.pipelineStatus,mrUrl:i.webUrl,projectPath:i.projectPath,pipelineId:i.pipelineId}}else R.appendLine(`[GitLab API] Skipping MR check for ${c} because hasGitlabToken() is false`);return{name:c,isMerged:!1,pipelineStatus:"none"}});return await Promise.all(a)}async function Mt(t,e,o,s){let r=Tt(e,o);if(!r)return!1;if(await st()){let p=await at(t,e,r.sourceBranch,s);if(p)return p.isMerged}else R.appendLine(`[GitLab API] Skipping MR check for current branch ${e} because hasGitlabToken() is false`);return!1}async function Lt(t,e=10){try{let{stdout:o}=await g(`git log --oneline -${e} --format="%h|||%s|||%ar"`,{cwd:t});return o.split(`
`).filter(s=>s.trim()).map(s=>{let r=s.split("|||");return{hash:r[0]||"",message:r.length>=3?r.slice(1,-1).join("|||"):r[1]||"",timeAgo:r.length>=3?r[r.length-1]:""}})}catch{return[]}}async function At(t,e=3){try{let{stdout:o}=await g('git for-each-ref --sort=-committerdate --format="%(refname:short)" refs/heads/',{cwd:t}),s=o.split(`
`).map(p=>p.trim()).filter(p=>p),r=/^[A-Z]+-\d+$/i;return s.filter(p=>r.test(p)).slice(0,e)}catch{return[]}}async function ze(t,e,o){let{stdout:s}=await g(`git branch --all --list "*${e}*"`,{cwd:t}),r=new Set,p=new RegExp(`${e}(?!\\d)`,"i");return s.split(`
`).forEach(a=>{let c=a.replace("*","").trim();if(c){if(c.startsWith("remotes/")){let d=c.split("/");d.length>2&&(c=d.slice(2).join("/"))}c&&c!==o&&!c.includes("HEAD")&&p.test(c)&&r.add(c)}}),Array.from(r)}async function ne(t,e,o){try{let{stdout:s}=await g(`git branch --all --list "*${e}*"`,{cwd:t}),r=new RegExp(`${e}(?!\\d)`,"i"),p=s.split(`
`).map(c=>c.replace("*","").trim().replace(/^remotes\/[^\/]+\//,"")).filter(c=>c&&!c.includes("HEAD")&&r.test(c)),a=Array.from(new Set(p));if(o){let c=`-to-${o}`,d=a.find(n=>n.endsWith(c));return d||`${e}${c}`}else{let c=a.find(d=>!d.includes("-to-"));return c||e}}catch{return o?`${e}-to-${o}`:e}}async function It(){let t=C();if(!t){U.window.showErrorMessage("Ricwiz: Open a folder or workspace that is a Git repository.");return}try{await g("git status",{cwd:t})}catch{U.window.showErrorMessage("Ricwiz: The opened folder does not appear to be a valid Git repository.");return}let e=await z.initialize(t);if(!e)return;let o=e.environments,s=await V(t,{prefix:e.ticketPrefix});if(!s){U.window.showErrorMessage("Operation cancelled: Ticket not provided.");return}let{ticketId:r,currentBranch:p}=s,a=await ne(t,r);if(!await ye(t,a)){U.window.showErrorMessage(`Ricwiz: Main branch '${a}' does not exist! Prepare deploy is only available when a main ticket branch is used.`);return}let c=e.getConfig("defaultReviewers",""),d="";try{let{stdout:n}=await g(`git config branch.${r}.ricwiz-reviewers`,{cwd:t});d=n.trim()}catch{}if(c.trim()){let n=await U.window.showInputBox({prompt:"Ricwiz: Reviewers for this deploy (optional, comma-separated)",placeHolder:"e.g. @joao, 123456",value:d||c,ignoreFocusOut:!0});if(n===void 0)return;try{n.trim()?await g(`git config branch.${r}.ricwiz-reviewers "${n.trim()}"`,{cwd:t}):d&&await g(`git config --unset branch.${r}.ricwiz-reviewers`,{cwd:t})}catch{}}await U.window.withProgress({location:U.ProgressLocation.Notification,title:"Ricwiz: Preparing Deploy",cancellable:!0},async(n,i)=>{let l=0,m=p,u=!1;i.onCancellationRequested(()=>{u=!0}),n.report({message:"Syncing remote information...",increment:10});try{await g("git fetch --all",{cwd:t});let w=10/(o.length||1);for(let h of o)try{if(u)throw new Error("Aborted");n.report({message:`Fetching ${h.sourceBranch}...`,increment:w});let y=e.getFetchRemote(h.sourceBranch),b=e.getFetchBranch(h.sourceBranch);await g(`git fetch ${y} ${b}:${b}`,{cwd:t})}catch{}}catch{}let f=60/(o.length||1);for(let w of o){if(u)break;let h=await ne(t,r,w.name),y=w.sourceBranch;try{n.report({message:`Processing ${h}...`,increment:f/4}),await g(`git checkout ${h}`,{cwd:t});try{await g(`git pull ${e.originRemote} ${h}`,{cwd:t})}catch{}let b=async oe=>{try{await g(`git merge ${oe}`,{cwd:t})}catch(D){let I=!1;try{let{stdout:j}=await g("git ls-files -u",{cwd:t});j.trim().length>0&&(I=!0)}catch{}let Z=((D.stdout||"")+(D.stderr||"")+(D.message||"")).toLowerCase();if(I||Z.includes("conflict")||Z.includes("conflit")){if(!await $e(t,oe,h,n,i))throw u=!0,new Error("Deploy aborted by user.")}else throw D}};n.report({message:`Merging ${y} into ${h}...`,increment:f/4});let P=e.getFetchRemote(y),S=e.getFetchBranch(y),A=e.buildUpstreamPath(y);if(await g(`git fetch ${P} ${S}`,{cwd:t}),await b(A),n.report({message:`Merging ${a} into ${h}...`,increment:f/4}),await b(a),u)break;n.report({message:`Pushing ${h}...`,increment:f/4}),await g(`git push ${e.originRemote} ${h}`,{cwd:t}),l++}catch(b){b.message.includes("aborted")?U.window.showInformationMessage("Ricwiz: Deploy cancelled."):U.window.showErrorMessage(`Ricwiz: Failed to process branch ${h}. Detail: ${b.message}`);return}}if(!u){n.report({message:"Finishing up...",increment:10});let w=m;try{await g(`git show-ref --verify --quiet refs/heads/${a}`,{cwd:t}),w=a}catch{}try{let h=await L(t);w&&w!==h?(await g(`git checkout ${w}`,{cwd:t}),U.window.showInformationMessage(`Ricwiz: Operation complete. Back on branch ${w}.`)):U.window.showInformationMessage("Ricwiz: Operation complete.")}catch{U.window.showInformationMessage("Ricwiz: Operation complete.")}}})}var le=k(require("vscode"));async function Ft(t=!1){let e=C();if(!e)return;let o=await z.initialize(e);if(!o)return;let s=await V(e,{prompt:"Enter the full ticket ID for the Merge Requests (e.g., SCPSCA-1234) or just the number"});if(!s)return;let{ticketId:r}=s,p=o.getConfig("gitlabUrlOverride",""),a="";if(p&&p.trim()!=="")a=p.trim().replace(/\/+$/,"");else{let i="";try{let l=o.originRemote||"origin",{stdout:m}=await g(`git remote get-url ${l}`,{cwd:e});i=m.trim()}catch{le.window.showErrorMessage("Ricwiz: Could not get the remote origin URL. Please configure the URL manually in the extension settings.");return}a=i,a.endsWith(".git")&&(a=a.slice(0,-4)),a.startsWith("git@")&&(a=a.replace("git@","").replace(":","/"),a=`https://${a}`)}let c=[],d=await ne(e,r),n=o.ticketSourceBranch;try{if(d){let{stdout:i}=await g(`git config branch.${d}.ricwiz-source`,{cwd:e});i.trim()&&(n=i.trim())}}catch{}if(o.environments.length===0)c.push({source:d,target:n});else for(let i of o.environments){let l=await ne(e,r,i.name);c.push({source:l,target:i.sourceBranch})}for(let i of c){let l=`${a}/-/merge_requests/new?merge_request[source_branch]=${encodeURIComponent(i.source)}&merge_request[target_branch]=${encodeURIComponent(i.target)}`;t?le.commands.executeCommand("simpleBrowser.show",l):le.env.openExternal(le.Uri.parse(l))}le.window.showInformationMessage(`Ricwiz: Opening ${t?"VS Code browser":"external browser"} for Merge Requests!`)}async function Ut(){return Ft(!1)}async function Ot(){return Ft(!0)}var X=k(require("vscode"));async function jt(t=!1){let e=C();if(!e)return;let o=X.workspace.getConfiguration("ricwiz"),s=o.get("jiraUrl","");if(!s||s.trim()===""){X.window.showErrorMessage("Ricwiz: Jira URL is not configured. Please set it in the extension settings (e.g., https://jira.company.com/browse/).");return}let r=await L(e),p=o.get("ticketPrefix","SFPSCA-"),a=ce(r,p),d=de(r,a,!0);if(d)d=tt(d,a);else{let i=await V(e,{prompt:"Ricwiz could not detect the ticket from the branch name. Enter Jira ticket ID (e.g. SFPSCA-1234)",handleToSuffix:!0});if(!i)return;d=i.ticketId}let n=s.trim();n.endsWith("/")||(n+="/"),n+=d,t?X.commands.executeCommand("simpleBrowser.show",n):X.env.openExternal(X.Uri.parse(n)),X.window.showInformationMessage(`Ricwiz: Opening Jira Ticket ${d} in ${t?"VS Code":"browser"}!`)}async function Nt(){return jt(!1)}async function Wt(){return jt(!0)}var q=k(require("vscode"));var Jt=k(require("https")),Gt=k(require("vscode"));async function Ht(){let t=Gt.workspace.getConfiguration("ricwiz"),e=t.get("jiraUrl",""),o=t.get("jiraEmail","")?.trim(),s=(await kt())?.trim();if(!e||!s)throw new Error('Jira API Token is not securely configured. Please run the "Ricwiz: Set Secure Jira API Token" command.');let r=e;r.includes("/browse")&&(r=r.split("/browse")[0]),r.endsWith("/")&&(r=r.slice(0,-1));let p=o?`Basic ${Buffer.from(`${o}:${s}`).toString("base64")}`:`Bearer ${s}`;return{baseUrl:r,headerAuth:p}}async function Ee(t,e,o){let{baseUrl:s,headerAuth:r}=await Ht(),p=new URL(`${s}${e}`);return new Promise((a,c)=>{let d=Jt.request(p,{method:t,headers:{Authorization:r,Accept:"application/json",...o?{"Content-Type":"application/json"}:{}}},n=>{let i="";n.on("data",l=>i+=l),n.on("end",()=>{if(n.statusCode===401||n.statusCode===403)return c(new Error(`Authentication failed (HTTP ${n.statusCode}). Please check your Jira settings.`));if(n.statusCode&&n.statusCode>=400){let l="";try{let m=JSON.parse(i);m.errorMessages&&m.errorMessages.length>0&&(l=m.errorMessages.join(", "))}catch{}return n.statusCode===404||n.statusCode===410?c(new Error(`Ticket not found or deleted (HTTP ${n.statusCode}). ${l}`)):c(new Error(`Jira API returned HTTP status ${n.statusCode}. ${l}`))}if(!i)return a({});try{let l=JSON.parse(i);a(l)}catch{c(new Error("Failed to parse Jira response."))}})});d.on("error",n=>c(new Error(`Network error: ${n.message}`))),o&&d.write(JSON.stringify(o)),d.end()})}async function Te(t){let{baseUrl:e}=await Ht(),o=await Ee("GET",`/rest/api/2/issue/${t}`);return o&&o.fields?{summary:o.fields.summary||"",description:o.fields.description||"No description provided.",status:o.fields.status?.name||"Unknown",url:`${e}/browse/${t}`}:null}async function Vt(t){let e=await Ee("GET",`/rest/api/2/issue/${t}/transitions`);return e&&e.transitions?e.transitions.map(o=>({id:o.id,name:o.name})):[]}async function qt(t,e){await Ee("POST",`/rest/api/2/issue/${t}/transitions`,{transition:{id:e}})}async function _t(t,e){await Ee("POST",`/rest/api/2/issue/${t}/comment`,{body:e})}async function Qt(t,e){await Ee("PUT",`/rest/api/2/issue/${t}`,{update:{labels:[{add:e}]}})}async function Yt(t){let e=await Ee("POST","/rest/api/3/search/jql",{jql:t,maxResults:50,fields:["summary","status","assignee"]});return e&&e.issues?e.issues.map(o=>({key:o.key,summary:o.fields?.summary||"No Title",status:o.fields?.status?.name||"Unknown",assignee:o.fields?.assignee?.displayName||"Unassigned"})):[]}async function Kt(t){let e=C();if(e)try{let o=await z.initialize(e);if(!o)return;let s=await L(e),r=ce(s,o.ticketPrefix),p=de(s,r,!0);if(p||(p=s.split("-to-")[0]),!p){q.window.showErrorMessage("Ricwiz: You are not currently on a valid ticket branch.");return}await q.window.withProgress({location:q.ProgressLocation.Notification,title:`Fetching details for ${p}...`,cancellable:!1},async()=>{let a=await Te(p);if(a){let c=[];try{let d=o.environments||q.workspace.getConfiguration("ricwiz").get("environments",[{name:"Qual",sourceBranch:"quality"},{name:"Val",sourceBranch:"validation"},{name:"Prod",sourceBranch:"main"}]),n=await ze(e,p,"");c=await Re(e,n,p,d,o)}catch{}t.setJiraData({ticketId:p,relatedBranches:c,...a}),t.setPage("jira")}else q.window.showErrorMessage("Ricwiz: No data found for this ticket.")})}catch(o){o.message&&o.message.includes("securely configured")?await q.window.showErrorMessage(o.message,"Set Token Now")==="Set Token Now"&&q.commands.executeCommand("ricwiz.setJiraToken"):q.window.showErrorMessage(`Ricwiz Jira Error: ${o.message}`)}}var me=k(require("vscode"));var Pe=0;async function Zt(t,e){let o=me.workspace.getConfiguration("ricwiz"),s=o.get("jiraDashboards",[]);if(e!==void 0&&(Pe=e),!s||s.length===0){t.setDashboardData({queries:[],selectedIndex:0,results:[],error:"No queries defined in settings. Go to Settings > Ricwiz > Jira Dashboards."}),t.setPage("dashboard");return}Pe>=s.length&&(Pe=0);let r=s[Pe];t.setDashboardData({queries:s,selectedIndex:Pe,results:[],error:"\u23F3 Loading tickets..."}),t.setPage("dashboard");try{let p=await Yt(r.jql),a=C(),c=[],d=t.getDashboardShowBranches();if(a)try{let{stdout:i}=await g("git branch",{cwd:a});c=i.split(`
`).map(l=>l.replace("*","").trim()).filter(l=>l)}catch{}let n=[];if(d&&a)try{let i=await z.initialize(a,{skipPrompt:!0}),l=i?.environments||o.get("environments",[{name:"Qual",sourceBranch:"quality"},{name:"Val",sourceBranch:"validation"},{name:"Prod",sourceBranch:"main"}]);n=await Promise.all(p.map(async m=>{let u=await ze(a,m.key,""),f=await Re(a,u,m.key,l,i);return{...m,detailedBranches:f}}))}catch{n=p}else n=p.map(i=>{let l=c.find(m=>m.includes(i.key));return{...i,branch:l||null}});t.setDashboardData({queries:s,selectedIndex:Pe,results:n,error:null}),t.setPage("dashboard")}catch(p){let a=p.message;a&&(a.includes("ENOTFOUND")||a.includes("network"))&&(a="No Internet or Invalid URL"),t.setDashboardData({queries:s,selectedIndex:Pe,results:[],error:a}),t.setPage("dashboard")}}async function Xt(t,e){await me.window.withProgress({location:me.ProgressLocation.Notification,title:`Fetching details for ${e}...`,cancellable:!1},async()=>{try{let o=await Te(e);if(o){let s=[],r=C();if(r)try{let p=await z.initialize(r,{skipPrompt:!0}),a=p?.environments||me.workspace.getConfiguration("ricwiz").get("environments",[{name:"Qual",sourceBranch:"quality"},{name:"Val",sourceBranch:"validation"},{name:"Prod",sourceBranch:"main"}]),c=await ze(r,e,"");s=await Re(r,c,e,a,p)}catch{}t.setJiraData({ticketId:e,relatedBranches:s,...o}),t.setPage("jira")}else me.window.showErrorMessage(`Ricwiz: No data found for ticket ${e}.`)}catch(o){me.window.showErrorMessage(`Ricwiz Jira Error: ${o.message}`)}})}var B=k(require("vscode"));async function ct(){let t=C();if(!t)return;let e=await z.initialize(t,{forcePrompt:!1});if(!e)return;let o=await L(t);if(!o)return;let s=ce(o,e.ticketPrefix),r=de(o,s,!0);return r||o.split("-to-")[0]}function dt(t){t.message&&t.message.includes("securely configured")?B.window.showErrorMessage(t.message,"Set Token Now").then(e=>{e==="Set Token Now"&&B.commands.executeCommand("ricwiz.setJiraToken")}):B.window.showErrorMessage(`Ricwiz Jira Error: ${t.message}`)}async function eo(){try{let t=await ct();if(!t){B.window.showErrorMessage("Ricwiz: You are not on a valid ticket branch.");return}let e=await B.window.withProgress({location:B.ProgressLocation.Notification,title:`Fetching available status for ${t}...`,cancellable:!1},()=>Vt(t));if(!e||e.length===0){B.window.showInformationMessage(`Ricwiz: No transitions available for ${t}.`);return}let o=e.map(r=>({label:r.name,id:r.id})),s=await B.window.showQuickPick(o,{placeHolder:`Select new status for ${t}`,ignoreFocusOut:!0});s&&(await B.window.withProgress({location:B.ProgressLocation.Notification,title:`Updating status to ${s.label}...`,cancellable:!1},()=>qt(t,s.id)),B.window.showInformationMessage(`Ricwiz: Status for ${t} updated to ${s.label}.`))}catch(t){dt(t)}}async function to(){try{let t=await ct();if(!t){B.window.showErrorMessage("Ricwiz: You are not on a valid ticket branch.");return}let e=await B.window.showInputBox({prompt:`Add comment to ${t}`,placeHolder:"Type your comment here...",ignoreFocusOut:!0});e&&(await B.window.withProgress({location:B.ProgressLocation.Notification,title:`Adding comment to ${t}...`,cancellable:!1},()=>_t(t,e)),B.window.showInformationMessage(`Ricwiz: Comment added to ${t}.`))}catch(t){dt(t)}}async function oo(){try{let t=await ct();if(!t){B.window.showErrorMessage("Ricwiz: You are not on a valid ticket branch.");return}let e=await B.window.showInputBox({prompt:`Add a label to ${t}`,placeHolder:"e.g. Needs-Review, Bug, High-Priority",ignoreFocusOut:!0});e&&e.trim()&&(await B.window.withProgress({location:B.ProgressLocation.Notification,title:`Adding label to ${t}...`,cancellable:!1},()=>Qt(t,e.trim())),B.window.showInformationMessage(`Ricwiz: Label '${e.trim()}' added to ${t}.`))}catch(t){dt(t)}}async function io(){let t=await B.window.showInputBox({prompt:"Enter your Jira API Token (or Personal Access Token). It will be securely stored in your OS keychain.",password:!0,ignoreFocusOut:!0});if(t)try{await xt(t.trim()),B.window.showInformationMessage("Ricwiz: Jira API Token securely stored!")}catch(e){B.window.showErrorMessage(`Ricwiz: Failed to store token: ${e.message}`)}}var W=k(require("vscode")),ro=k(require("https"));async function no(){let t=await W.window.showInputBox({prompt:"Enter your GitLab Personal Access Token",placeHolder:"glpat-xxxxxxxxxxxxxxxxxxxx",ignoreFocusOut:!0,password:!0});if(t&&t.trim()){let e=t.trim();await W.window.withProgress({location:W.ProgressLocation.Notification,title:"Ricwiz: Validating GitLab Token...",cancellable:!1},async()=>{try{let s=W.workspace.getConfiguration("ricwiz").get("gitlabUrlOverride","").trim();if(!s&&W.workspace.workspaceFolders)try{let c=W.workspace.workspaceFolders[0].uri.fsPath,{stdout:d}=await g("git remote get-url origin",{cwd:c}),n=d.trim();n.startsWith("git@")&&(n=`https://${n.replace("git@","").replace(":","/")}`),n.endsWith(".git")&&(n=n.slice(0,-4)),s=n}catch{}s||(s="https://gitlab.com");let r=new URL(s),p=`${r.protocol}//${r.host}`,a=await new Promise((c,d)=>{let n=ro.request(new URL(`${p}/api/v4/user`),{method:"GET",timeout:5e3,headers:{"PRIVATE-TOKEN":e,Accept:"application/json"}},i=>{if(i.statusCode>=400)return d(new Error(`Status ${i.statusCode}`));let l="";i.on("data",m=>l+=m),i.on("end",()=>c(JSON.parse(l||"{}")))});n.on("error",d),n.on("timeout",()=>{n.destroy(),d(new Error("Timeout"))}),n.end()});await Ct(e),W.window.showInformationMessage(`Ricwiz: \u2705 GitLab API Token saved and validated successfully for ${a.username||"user"}!`),W.commands.executeCommand("ricwiz.manualRefresh")}catch(o){W.window.showErrorMessage(`Ricwiz: \u274C Invalid token or cannot reach GitLab (${o.message}). Please check the token and try again.`)}})}}var pe=k(require("vscode"));async function so(){let t=C();if(!t){pe.window.showErrorMessage("Ricwiz: Open a folder or workspace that is a Git repository.");return}let e=await z.initialize(t);if(!e)return;let o=await V(t,{prefix:e.ticketPrefix,prompt:"Enter the full ticket ID to sync all branches for (e.g., SCPSCA-1234) or just the number"});if(!o)return;let{ticketId:s,currentBranch:r}=o;await pe.window.withProgress({location:pe.ProgressLocation.Notification,title:`Ricwiz: Syncing all branches for ${s}...`,cancellable:!1},async p=>{try{p.report({message:"Fetching from remote..."});try{await g("git fetch --all",{cwd:t})}catch{}let{stdout:a}=await g(`git branch --list "*${s}*"`,{cwd:t}),c=new RegExp(`${s}(?!\\d)`,"i"),d=a.split(`
`).map(l=>l.replace("*","").trim()).filter(l=>l.length>0&&c.test(l));if(d.length===0){pe.window.showWarningMessage(`Ricwiz: No local branches found for ${s}.`);return}let n=0,i=0;for(let l of d)if(p.report({message:`Syncing ${l}...`}),l===r)try{await g(`git pull ${e.originRemote} ${l}`,{cwd:t}),n++}catch(m){let u=!1;try{let{stdout:w}=await g("git ls-files -u",{cwd:t});w.trim().length>0&&(u=!0)}catch{}let f=((m.stdout||"")+(m.stderr||"")+(m.message||"")).toLowerCase();(u||f.includes("conflict")||f.includes("conflit"))&&await $e(t,`${e.originRemote}/${l}`,l,p)?n++:i++}else try{await g(`git fetch ${e.originRemote} ${l}:${l}`,{cwd:t}),n++}catch{try{await g(`git checkout ${l}`,{cwd:t});try{await g(`git pull ${e.originRemote} ${l}`,{cwd:t}),n++}catch(u){let f=!1;try{let{stdout:h}=await g("git ls-files -u",{cwd:t});h.trim().length>0&&(f=!0)}catch{}let w=((u.stdout||"")+(u.stderr||"")+(u.message||"")).toLowerCase();(f||w.includes("conflict")||w.includes("conflit"))&&await $e(t,`${e.originRemote}/${l}`,l,p)?n++:i++}await g(`git checkout ${r}`,{cwd:t})}catch{try{await g(`git checkout ${r}`,{cwd:t})}catch{}i++}}i>0?pe.window.showWarningMessage(`Ricwiz: Synced ${n}/${d.length} branches. ${i} branch(es) could not be synced (possible conflicts or diverged history).`):pe.window.showInformationMessage(`Ricwiz: \u{1F504} All ${n} branches for ${s} are up to date!`)}catch(a){pe.window.showErrorMessage(`Ricwiz: Sync failed: ${a.message}`)}})}var ue=k(require("vscode"));async function ao(){let t=C();if(!t){ue.window.showErrorMessage("Ricwiz: Open a folder or workspace that is a Git repository.");return}try{await g("git status",{cwd:t})}catch{ue.window.showErrorMessage("Ricwiz: The opened folder does not appear to be a valid Git repository.");return}let e=await z.initialize(t);if(!e)return;let o=e.environments,s=await V(t,{prefix:e.ticketPrefix});if(!s)return;let{ticketId:r,currentBranch:p}=s;await ue.window.withProgress({location:ue.ProgressLocation.Notification,title:"Ricwiz: Updating environment branches from their bases",cancellable:!0},async(a,c)=>{let d=0,n=p,i=!1;c.onCancellationRequested(()=>{i=!0}),a.report({message:"Syncing remote information...",increment:10});try{await g("git fetch --all",{cwd:t})}catch{}let l=80/(o.length||1);for(let m of o){if(i)break;let u=await ne(t,r,m.name),f=m.sourceBranch;if(await ye(t,u))try{a.report({message:`Processing ${u}...`,increment:l/2}),await g(`git checkout ${u}`,{cwd:t});try{a.report({message:`Merging ${f} into ${u}...`,increment:l/2});let w=e.getFetchRemote(f),h=e.getFetchBranch(f),y=e.buildUpstreamPath(f);await g(`git fetch ${w} ${h}`,{cwd:t}),await g(`git merge ${y}`,{cwd:t})}catch(w){let h=!1;try{let{stdout:b}=await g("git ls-files -u",{cwd:t});b.trim().length>0&&(h=!0)}catch{}let y=((w.stdout||"")+(w.stderr||"")+(w.message||"")).toLowerCase();if(h||y.includes("conflict")||y.includes("conflit")){let b=e.buildUpstreamPath(f);if(!await $e(t,b,u,a,c))throw i=!0,new Error("Update aborted by user.")}else throw w}if(i)break;d++}catch(w){w.message.includes("aborted")?ue.window.showInformationMessage("Ricwiz: Update cancelled."):ue.window.showErrorMessage(`Ricwiz: Failed to update branch ${u}. Detail: ${w.message}`);return}}if(!i){a.report({message:"Finishing up...",increment:10});try{let m=await L(t);n&&n!==m&&await g(`git checkout ${n}`,{cwd:t})}catch{}ue.window.showInformationMessage(`Ricwiz: Successfully updated ${d} environment branches from their bases!`)}})}var F=k(require("vscode"));async function co(){let t=C();if(!t){F.window.showErrorMessage("Ricwiz: Open a folder or workspace that is a Git repository.");return}let e=await L(t),o=F.workspace.getConfiguration("ricwiz");await F.window.withProgress({location:F.ProgressLocation.Notification,title:"Ricwiz: Scanning for unused local branches...",cancellable:!1},async()=>{try{await g("git fetch --prune",{cwd:t})}catch{}let s=[];try{let{stdout:l}=await g('git branch --format="%(refname:short)"',{cwd:t});s=l.split(`
`).map(m=>m.trim()).filter(m=>m.length>0)}catch{}if(s.length===0){F.window.showInformationMessage("Ricwiz: No local branches found.");return}let r=[];try{let{stdout:l}=await g('git branch -r --format="%(refname:short)"',{cwd:t});r=l.split(`
`).map(m=>m.trim().replace(/^[^/]+\//,"")).filter(m=>m.length>0&&!m.includes("HEAD"))}catch{}let p=[];try{let{stdout:l}=await g('git for-each-ref --format="%(refname:short)|||%(upstream:track)" refs/heads/',{cwd:t});p=l.split(`
`).filter(m=>m.includes("[gone]")).map(m=>m.split("|||")[0].trim())}catch{}let a=s.filter(l=>!r.includes(l));if(a.length===0){F.window.showInformationMessage("Ricwiz: Your local repository is totally clean! All local branches exist on the remote.");return}let c=a.map(l=>{let m=p.includes(l),u=l===e,f="Not found on remote";return m&&(f="Deleted on remote [gone]"),u&&(f+=" (Current branch - will checkout main first)"),{label:l,description:f,picked:m&&!u}}),d=await F.window.showQuickPick(c,{canPickMany:!0,placeHolder:"Select local branches to delete",title:"Ricwiz: Delete Unused Branches"});if(!d||d.length===0){F.window.showInformationMessage("Ricwiz: No branches selected for deletion.");return}if(await F.window.showWarningMessage(`Ricwiz: Delete ${d.length} local branch(es)?
This cannot be undone!`,{modal:!0},"Yes, delete them")!=="Yes, delete them"){F.window.showInformationMessage("Ricwiz: Deletion cancelled.");return}let i=0;for(let l of d){let m=l.label;if(m===e){let u=o.get("ticketSourceBranch","main");try{await g(`git checkout ${u}`,{cwd:t}),e=u}catch{F.window.showWarningMessage(`Ricwiz: Could not switch away from ${m}. Skipping.`);continue}}try{await g(`git branch -D ${m}`,{cwd:t}),i++}catch{F.window.showWarningMessage(`Ricwiz: Could not delete local branch ${m}.`)}}F.window.showInformationMessage(`Ricwiz: \u{1F5D1}\uFE0F Cleaned up ${i} unused local branch(es).`)})}var ee=k(require("vscode"));async function Me(t){let e=C();e&&await ee.window.withProgress({location:ee.ProgressLocation.Notification,title:`Ricwiz: Switching to ${t}...`,cancellable:!1},async()=>{try{let o=await L(e),s=!1;try{let{stdout:p}=await g("git status --porcelain",{cwd:e});s=p.trim().length>0}catch{}if(s&&o)try{await g(`git stash push --include-untracked -m "ricwiz-auto:${o}"`,{cwd:e}),ee.window.showInformationMessage(`Ricwiz: \u{1F4E6} Stashed changes from ${o}`)}catch{ee.window.showWarningMessage("Ricwiz: Could not stash changes. Checkout may fail if there are conflicts.")}let r=t;t.includes("/")&&(r=t.split("/").slice(1).join("/"));try{await g(`git checkout ${r}`,{cwd:e})}catch{let a="";if(t.includes("/"))a=t.split("/")[0];else{let{stdout:c}=await g("git branch -r",{cwd:e}),d=c.split(`
`).map(i=>i.trim()).filter(i=>i),n=[];for(let i of d){let l=i.split(" ")[0];l.endsWith(`/${r}`)&&n.push(l.substring(0,l.lastIndexOf("/")))}if(n.length===0){ee.window.showErrorMessage(`Ricwiz: A branch "${r}" n\xE3o existe localmente nem em nenhuma remote!`);return}else if(n.length===1)a=n[0];else{let i=await z.initialize(e);n.includes("origin")?a="origin":i&&n.includes(i.upstreamRemote)?a=i.upstreamRemote:a=n[0]}}try{await g(`git fetch ${a} ${r}`,{cwd:e}),await g(`git checkout -b ${r} --track ${a}/${r}`,{cwd:e})}catch{ee.window.showErrorMessage(`Ricwiz: Encontrou na remote ${a} mas falhou a fazer checkout.`);return}}try{let{stdout:p}=await g("git stash list",{cwd:e}),a=p.split(`
`);for(let c=0;c<a.length;c++)if(a[c].includes(`ricwiz-auto:${r}`)){let d=a[c].match(/stash@\{(\d+)\}/);d&&(await g(`git stash pop stash@{${d[1]}}`,{cwd:e}),ee.window.showInformationMessage(`Ricwiz: \u{1F4E6} Restored stashed changes on ${r}`));break}}catch{ee.window.showWarningMessage(`Ricwiz: Could not restore stashed changes on ${r}. You may need to resolve conflicts manually (check git stash list).`)}}catch{ee.window.showErrorMessage(`Ricwiz: Could not checkout branch ${t}.`)}})}var Ue=k(require("vscode"));async function lo(){let t=C();if(t)try{let{stdout:e}=await g("git branch --show-current",{cwd:t}),o=e.trim();o&&(await Ue.env.clipboard.writeText(o),Ue.window.showInformationMessage(`Ricwiz: \u{1F4CB} Copied "${o}" to clipboard`))}catch{Ue.window.showErrorMessage("Ricwiz: Could not get the current branch name.")}}var _=k(require("vscode")),Ke=k(require("path")),mo=k(require("fs"));async function po(){let t=C();if(!t){_.window.showErrorMessage("Ricwiz: Open a folder or workspace that is a Git repository.");return}let e=await z.initialize(t,{skipPrompt:!0}),o=_.workspace.getConfiguration("ricwiz"),s=e?.ticketSourceBranch||o.get("ticketSourceBranch","main"),r=e?.originRemote||"origin",a=o.get("packageXmlCommand",'sf sgd source delta --to "HEAD" --from "{originRemote}/{baseBranch}" --output-dir "."').replace("origin/{baseBranch}","{originRemote}/{baseBranch}").replace(/{originRemote}/g,r).replace(/{baseBranch}/g,s);await _.window.showWarningMessage("Are you sure you want to generate the package.xml? This may overwrite existing local manifest files.",{modal:!0},"Yes, Generate")==="Yes, Generate"&&await _.window.withProgress({location:_.ProgressLocation.Notification,title:"Ricwiz: Generating package.xml using Salesforce CLI...",cancellable:!1},async()=>{try{await g(a,{cwd:t,maxBuffer:10*1024*1024}),_.window.showInformationMessage("Ricwiz: Successfully generated package.xml!");let d=Ke.join(t,"package","package.xml"),n=Ke.join(t,"package.xml"),i=Ke.join(t,"manifest","package.xml");for(let l of[d,n,i])if(mo.existsSync(l)){let m=await _.workspace.openTextDocument(l);await _.window.showTextDocument(m);break}}catch(d){_.window.showErrorMessage(`Ricwiz: Error running sf command - ${d.message}`)}})}var Q=k(require("vscode"));async function uo(){let t=C();if(!t){Q.window.showErrorMessage("Ricwiz: Open a folder or workspace that is a Git repository.");return}let o=Q.workspace.getConfiguration("ricwiz").get("deployCommand","sf project deploy start --manifest package/package.xml --post-destructive-changes destructiveChanges/destructiveChanges.xml -c -l NoTestRun -g");await Q.window.showWarningMessage("Are you sure you want to deploy to Salesforce? This action modifies your org and cannot be easily undone.",{modal:!0},"Yes, Deploy")==="Yes, Deploy"&&await Q.window.withProgress({location:Q.ProgressLocation.Notification,title:"Ricwiz: Deploying package...",cancellable:!1},async()=>{try{let{stdout:r,stderr:p}=await g(o,{cwd:t,maxBuffer:52428800}),a=Q.window.createOutputChannel("Ricwiz Deploy");a.appendLine(`Executing: ${o}`),a.appendLine(r),p&&(a.appendLine("--- STDERR ---"),a.appendLine(p)),a.show(),Q.window.showInformationMessage("Ricwiz: Successfully ran deploy command!")}catch(r){let p=Q.window.createOutputChannel("Ricwiz Deploy");p.appendLine(`Error executing: ${o}`),r.stdout&&p.appendLine(r.stdout),r.stderr&&p.appendLine(r.stderr),p.appendLine(r.message),p.show(),Q.window.showErrorMessage("Ricwiz: Error running deploy command. See output channel for details.")}})}var Y=k(require("vscode"));async function go(){let t=C();if(!t){Y.window.showErrorMessage("Ricwiz: Open a folder or workspace that is a Git repository.");return}let o=Y.workspace.getConfiguration("ricwiz").get("importDataCommand","sfdx force:data:tree:import --plan data/plan.json");await Y.window.showWarningMessage("Are you sure you want to import data into Salesforce? This action modifies records in your org.",{modal:!0},"Yes, Import")==="Yes, Import"&&await Y.window.withProgress({location:Y.ProgressLocation.Notification,title:"Ricwiz: Importing data...",cancellable:!1},async()=>{try{let{stdout:r,stderr:p}=await g(o,{cwd:t,maxBuffer:52428800}),a=Y.window.createOutputChannel("Ricwiz Import Data");a.appendLine(`Executing: ${o}`),a.appendLine(r),p&&(a.appendLine("--- STDERR ---"),a.appendLine(p)),a.show(),Y.window.showInformationMessage("Ricwiz: Successfully ran import data command!")}catch(r){let p=Y.window.createOutputChannel("Ricwiz Import Data");p.appendLine(`Error executing: ${o}`),r.stdout&&p.appendLine(r.stdout),r.stderr&&p.appendLine(r.stderr),p.appendLine(r.message),p.show(),Y.window.showErrorMessage("Ricwiz: Error running import data command. See output channel for details.")}})}var J=k(require("vscode"));async function fo(){let t=C();if(!t){J.window.showErrorMessage("Ricwiz: Open a folder or workspace that is a Git repository.");return}let e=await z.initialize(t,{skipPrompt:!0}),o=e?e.ticketSourceBranch:J.workspace.getConfiguration("ricwiz").get("ticketSourceBranch","main"),s=e?e.originRemote:"origin",r="";try{r=await L(t)}catch{}let p=await J.window.showInputBox({prompt:`Enter the branch name to list modified files (compared to ${o})`,value:r,placeHolder:"SFPSCA-1234"});if(!p)return;let a=xe(p);await J.window.withProgress({location:J.ProgressLocation.Notification,title:`Ricwiz: Finding files for ${a}...`,cancellable:!1},async()=>{try{let c=e?e.ticketPrefix:J.workspace.getConfiguration("ricwiz").get("ticketPrefix","SFPSC-"),d=ce(a,c),n=de(a,d,!0)||a.replace(/-to-[a-zA-Z0-9]+$/i,""),i=await ne(t,n);R.appendLine(`[ListTicketFiles] targetBranch (raw): ${a}, resolvedTargetBranch: ${i}, ticketId: ${n}, originRemote: ${s}, sourceBranch: ${o}`);let l=[];try{let P="";try{R.appendLine(`[ListTicketFiles] Running: git merge-base ${s}/${o} ${i}`);let{stdout:S}=await g(`git merge-base ${s}/${o} ${i}`,{cwd:t});P=S.trim()}catch(S){R.appendLine(`[ListTicketFiles] First merge-base failed: ${S.message}`),R.appendLine(`[ListTicketFiles] Running: git merge-base ${o} ${i}`);let{stdout:A}=await g(`git merge-base ${o} ${i}`,{cwd:t});P=A.trim()}if(P){R.appendLine(`[ListTicketFiles] Merge base found: ${P}. Running git diff...`);let{stdout:S}=await g(`git diff --name-only ${P} ${i}`,{cwd:t,maxBuffer:10*1024*1024});l=S.split(`
`).map(A=>A.trim()).filter(A=>A.length>0),R.appendLine(`[ListTicketFiles] diff found ${l.length} files.`)}}catch(P){R.appendLine(`[ListTicketFiles] Diff strategy failed: ${P.message}`)}let m=[];try{R.appendLine(`[ListTicketFiles] Running git log fallback for ticketId: ${n}`);let{stdout:P}=await g(`git --no-pager log --grep="\\b${n}\\b" -i -E --name-only -m --first-parent --format=""`,{cwd:t,maxBuffer:10*1024*1024});m=P.split(`
`).map(S=>S.trim()).filter(S=>S.length>0),R.appendLine(`[ListTicketFiles] git log found ${m.length} files.`)}catch(P){R.appendLine(`[ListTicketFiles] Git log fallback failed: ${P.message}`)}let u=[...l,...m];if(u.length===0){J.window.showInformationMessage(`Ricwiz: No modified files found for ${a}.`);return}let f=Array.from(new Set(u)).sort(),w={};for(let P of f){let S=P.match(/default\/([^/]+)/),A=S&&S[1]?S[1].toUpperCase():"OUTROS";w[A]||(w[A]=[]),w[A].push(P)}let h=`Files modified in branch ${a}:
`,y=Object.keys(w).sort();for(let P of y)h+=`
=== ${P} ===
`,h+=w[P].join(`
`)+`
`;let b=await J.workspace.openTextDocument({content:h,language:"plaintext"});await J.window.showTextDocument(b)}catch(c){J.window.showErrorMessage(`Ricwiz: Error running git log - ${c.message}`)}})}var te=k(require("vscode"));async function ho(){let t=C();if(!t){te.window.showErrorMessage("Ricwiz: Open a folder or workspace that is a Git repository.");return}let o=te.workspace.getConfiguration("ricwiz").get("resetTrackingCommand","sf org disable tracking && sf project reset tracking --no-prompt");await te.window.withProgress({location:te.ProgressLocation.Notification,title:"Ricwiz: Resetting tracking...",cancellable:!1},async()=>{try{let{stdout:s,stderr:r}=await g(o,{cwd:t,maxBuffer:52428800}),p=te.window.createOutputChannel("Ricwiz Reset Tracking");p.appendLine(`Executing: ${o}`),p.appendLine(s),r&&(p.appendLine("--- STDERR ---"),p.appendLine(r)),p.show(),te.window.showInformationMessage("Ricwiz: Successfully reset tracking!")}catch(s){let r=te.window.createOutputChannel("Ricwiz Reset Tracking");r.appendLine(`Error executing: ${o}`),s.stdout&&r.appendLine(s.stdout),s.stderr&&r.appendLine(s.stderr),r.appendLine(s.message),r.show(),te.window.showErrorMessage("Ricwiz: Error resetting tracking. See output channel for details.")}})}var K=k(require("vscode"));async function wo(){let t=C();if(!t){K.window.showErrorMessage("Ricwiz: Open a workspace first.");return}let e=["ApexClass","ApexTrigger","CustomObject","CustomField","LightningComponentBundle","AuraDefinitionBundle","Flow","CustomLabel","CustomMetadata","StaticResource","Profile","PermissionSet","PermissionSetGroup","Layout","ValidationRule","RecordType","ListView","Report","EmailTemplate","Other (Type manually)..."],o=await K.window.showQuickPick(e,{placeHolder:"Select Metadata Type to extract (e.g., ApexClass)",ignoreFocusOut:!0});if(!o||o==="Other (Type manually)..."&&(o=await K.window.showInputBox({prompt:"Enter Metadata Type (e.g., CustomApplication, Queue)",ignoreFocusOut:!0}),!o))return;let s={ApexClass:"**/*.cls",ApexTrigger:"**/*.trigger",CustomObject:"**/*.{object,object-meta.xml}",CustomField:"**/*.field-meta.xml",LightningComponentBundle:"**/lwc/*/*.js",AuraDefinitionBundle:"**/aura/*/*.cmp",Flow:"**/*.flow-meta.xml",CustomLabel:"**/*.labels-meta.xml",CustomMetadata:"**/*.md-meta.xml",StaticResource:"**/*.resource-meta.xml",Profile:"**/*.profile-meta.xml",PermissionSet:"**/*.permissionset-meta.xml",PermissionSetGroup:"**/*.permissionsetgroup-meta.xml",Layout:"**/*.layout-meta.xml",ValidationRule:"**/*.validationRule-meta.xml",RecordType:"**/*.recordType-meta.xml",ListView:"**/*.listView-meta.xml"},r=[],p=s[o];if(p)try{r=(await K.workspace.findFiles(p,"**/node_modules/**")).map(d=>{let n=d.fsPath.split(/[\\/]/).pop()||"";if(o==="LightningComponentBundle"||o==="AuraDefinitionBundle"){let i=d.fsPath.split(/[\\/]/);return i[i.length-2]||n.split(".")[0]}return n.split(".")[0]}),r=[...new Set(r)].sort()}catch{}let a=await new Promise(c=>{let d=K.window.createQuickPick();d.title=`Extract ${o}`,d.placeholder="Type name (e.g. MyComponent) or * for all",d.ignoreFocusOut=!0,d.matchOnDescription=!0;let n=()=>{let i=d.value.trim(),l=[];i?l.push({label:`$(cloud-download) Extract "${i}"`,description:"Extract exact name from Salesforce",alwaysShow:!0}):l.push({label:'$(cloud-download) Extract "*" (All)',description:`Extract all ${o}s`,alwaysShow:!0}),r.forEach(m=>{(!i||m.toLowerCase().includes(i.toLowerCase()))&&l.push({label:m,description:"Local workspace component"})}),d.items=l};d.onDidChangeValue(()=>n()),d.onDidAccept(()=>{let i=d.selectedItems[0];if(i){let l=i.label;l.startsWith('$(cloud-download) Extract "')?l=l.replace('$(cloud-download) Extract "',"").replace('" (All)',"").replace('"',""):l==='$(cloud-download) Extract "*" (All)'&&(l="*"),d.hide(),c(l)}}),d.onDidHide(()=>{d.dispose(),c(void 0)}),n(),d.show()});a&&await K.window.withProgress({location:K.ProgressLocation.Notification,title:`Ricwiz: Extracting ${o}:${a} from Salesforce...`,cancellable:!0},async(c,d)=>{try{R.show(!0);let n=`${o}:${a}`,{stdout:i,stderr:l}=await g(`sf project retrieve start -m "${n}"`,{cwd:t});i&&R.appendLine(i),l&&R.appendLine(l),K.window.showInformationMessage(`Ricwiz: Successfully extracted ${n}.`)}catch(n){R.appendLine(`ERROR: ${n.message}`),n.stdout&&R.appendLine(n.stdout),n.stderr&&R.appendLine(n.stderr),K.window.showErrorMessage("Ricwiz: Extraction failed. See Output channel for details.")}})}var O=k(require("vscode")),vo=k(require("path"));async function bo(){let t=O.window.activeTextEditor;if(!t){O.window.showErrorMessage("Ricwiz: Please open the file you want to deploy in the editor first.");return}let e=t.document.uri.fsPath,o=C();if(!o)return;let s="";if(await O.window.withProgress({location:O.ProgressLocation.Notification,title:"Ricwiz: Fetching available Salesforce orgs...",cancellable:!1},async()=>{try{let{stdout:d}=await g("sf org list --json",{cwd:o});s=d}catch(d){s=d.stdout||""}}),!s){O.window.showErrorMessage("Ricwiz: Failed to fetch orgs. Is Salesforce CLI installed?");return}let r=[];try{let d=JSON.parse(s),n=d.result?.nonScratchOrgs||[],i=d.result?.scratchOrgs||[];r=[...n,...i]}catch{O.window.showErrorMessage("Ricwiz: Failed to parse org list.");return}if(r.length===0){O.window.showInformationMessage("Ricwiz: No authenticated orgs found.");return}let p=r.map(d=>({label:d.alias||d.username,description:d.alias?d.username:"",picked:d.isDefaultUsername})),a=await O.window.showQuickPick(p,{placeHolder:"Select the org(s) to deploy this file to",canPickMany:!0,ignoreFocusOut:!0});if(!a||a.length===0)return;let c=vo.basename(e);await O.window.withProgress({location:O.ProgressLocation.Notification,title:`Ricwiz: Deploying ${c} to ${a.length} org(s)...`,cancellable:!1},async()=>{R.show(!0),R.appendLine(`--- Starting Parallel Deploy of ${c} ---`);let d=a.map(async m=>{let u=m.label;R.appendLine(`[${u}] Deploying...`);try{let{stdout:f,stderr:w}=await g(`sf project deploy start -d "${e}" -o "${u}"`,{cwd:o});return R.appendLine(`[${u}] \u2705 Success`),f&&R.appendLine(f),{org:u,success:!0}}catch(f){return R.appendLine(`[${u}] \u274C Failed`),f.stdout&&R.appendLine(f.stdout),f.stderr&&R.appendLine(f.stderr),{org:u,success:!1}}}),n=await Promise.all(d),i=n.filter(m=>m.success).length,l=n.filter(m=>!m.success).length;l===0?O.window.showInformationMessage(`Ricwiz: Successfully deployed to all ${i} orgs!`):O.window.showErrorMessage(`Ricwiz: Deploy finished with errors (${i} success, ${l} failed). Check Output channel.`)})}var M=k(require("vscode")),Ze=k(require("fs")),Xe=k(require("path"));async function yo(){let t=C();if(!t){M.window.showErrorMessage("Ricwiz: Open a folder or workspace that is a Git repository.");return}let e=M.workspace.getConfiguration("ricwiz"),o=e.get("auditUsername",""),s=e.get("auditHours",8),r=await M.window.showInputBox({prompt:"Enter your Salesforce Username to query in SetupAuditTrail",value:o,placeHolder:"admin@tuaorg.com"});if(!r)return;r=xe(r);let p=await M.window.showInputBox({prompt:"How many hours back do you want to search?",value:s.toString(),placeHolder:"8"});if(!p)return;let a=parseFloat(p);if(isNaN(a)||a<=0){M.window.showErrorMessage("Ricwiz: Invalid hours specified.");return}let c=new Date(Date.now()-a*60*60*1e3).toISOString(),n=`sf data query -q "${`SELECT Action, Display, Section FROM SetupAuditTrail WHERE CreatedBy.Username = '${r}' AND CreatedDate >= ${c}`}" --json`;await M.window.withProgress({location:M.ProgressLocation.Notification,title:"Ricwiz: Interrogating Setup Audit Trail...",cancellable:!1},async()=>{try{let{stdout:i}=await g(n,{cwd:t,maxBuffer:52428800}),l=JSON.parse(i);if(!l.result||l.result.records.length===0){M.window.showInformationMessage(`Ricwiz: No changes found for ${r} in the last ${a} hours.`);return}let m=l.result.records,u=[],f=new Set;for(let D of m){let I=jo(D.Action,D.Display,D.Section);if(I){let Z=`${I.isDelete?"DEL":"ADD"}-${I.metadataFormat}`;if(!f.has(Z)){f.add(Z);let j=I.isDelete?"$(trash)":"$(plus)";u.push({label:`${j} ${I.metadataFormat}`,description:`${D.Action} -> ${D.Display}`,metadataFormat:I.metadataFormat,isDelete:I.isDelete})}}}if(u.length===0){M.window.showInformationMessage(`Ricwiz: No extractable metadata changes found for ${r} in the last ${a} hours (ignored passwords/logins).`);return}let w=await M.window.showQuickPick(u,{canPickMany:!0,placeHolder:"Select the changes you want to extract to GitLab",ignoreFocusOut:!0});if(!w||w.length===0){M.window.showInformationMessage("Ricwiz: No changes selected.");return}let h=w.filter(D=>D.isDelete),y=w.filter(D=>!D.isDelete),b=M.window.createOutputChannel("Ricwiz Admin Bridge");if(b.show(),h.length>0){let{stdout:D}=await g("git ls-files",{cwd:t}),I=D.split(`
`).map(j=>j.trim()),Z=0;for(let j of h){let Le=j.metadataFormat.split(":"),We=Le[0],Je=Le[1],ve=Je;We==="CustomField"&&(ve=Je.split(".")[1]);let et=I.filter(Se=>{let E=Xe.basename(Se);return E.startsWith(ve+".")&&E.includes(We==="CustomField"?".field":"")});for(let Se of et){let E=Xe.join(t,Se);Ze.existsSync(E)&&(Ze.unlinkSync(E),b.appendLine(`Deleted local file: ${Se}`),Z++)}}M.window.showInformationMessage(`Ricwiz: Deleted ${Z} local files from Git workspace.`)}if(y.length===0)return;let P=y.map(D=>D.metadataFormat).filter(D=>D!=="").join(", "),S=await M.window.showInputBox({prompt:"Review and adjust the metadata components to retrieve",value:P,ignoreFocusOut:!0});if(!S)return;let A=`sf project retrieve start -m "${S}"`;b.appendLine(`Executing: ${A}`),M.window.showInformationMessage(`Ricwiz: Extracting ${y.length} components...`);let oe=await g(A,{cwd:t});b.appendLine(oe.stdout),oe.stderr&&(b.appendLine("--- STDERR ---"),b.appendLine(oe.stderr)),M.window.showInformationMessage("Ricwiz: Changes extracted successfully! Ready for Git Commit.")}catch(i){M.window.showErrorMessage(`Ricwiz: Error capturing changes - ${i.message}`)}})}function jo(t,e,o){if(!t||!e||!o)return null;let s=t.toLowerCase(),r=o.toLowerCase();if(["security controls","network access","session settings","data export","login history","password policies","identity verification","delegated administration"].includes(r)||s.includes("login")||s.includes("password")||s.includes("oauth")||s.includes("session"))return null;let a=s.includes("delete"),c=null;if(s==="permissionsetgroupcomponentadd"||s==="permissionsetgroupcomponentdelete")return null;let d=(n,i=!1)=>{let l=n.replace(/\(.*\)/g,"").trim();l.includes(":")&&!s.includes("calculation")&&(l=l.split(":")[0]);let m=["disabled","deleted","removed","created","changed","updated","from","to","on","assigned","assign","assignment","permission","set","group","apex","class","trigger","custom","field","object","layout","validation","rule","flow","profile"],u=l.split(/\s+/);if(i){for(;u.length>0&&m.includes(u[u.length-1].toLowerCase());)u.pop();for(;u.length>0&&m.includes(u[0].toLowerCase());)u.shift();return u.join(" ").trim().replace(/[^a-zA-Z0-9_ ]/g,"")}else return u.filter(h=>!m.includes(h.toLowerCase())).join("_").replace(/[^a-zA-Z0-9_]/g,"")||l.replace(/\s+/g,"")};if(s.includes("profile"))c=`Profile:${d(e,!0)}`;else if(s.includes("permissionsetgroupcalculation")){let n=e.split(":");c=`PermissionSetGroup:${n.length>1?n[n.length-1].trim():d(e,!1)}`}else if(s.includes("permission set group")||s.includes("permissionsetgroup"))c=`PermissionSetGroup:${d(e,!1)}`;else if(s.includes("permission set")||s.includes("permissionset"))c=`PermissionSet:${d(e,!1)}`;else if(s.includes("apexclass"))c=`ApexClass:${d(e,!1)}`;else if(s.includes("apextrigger")||s.includes("apex trigger"))c=`ApexTrigger:${d(e,!1)}`;else if(s.includes("customfield")){let n=e.match(/([A-Za-z0-9_]+__c)/),i=e.match(/(?:on|na|for)\s+([A-Za-z0-9_]+)/i);n&&i?c=`CustomField:${i[1]}.${n[1]}`:c=`CustomField:${d(e,!1)}`}else if(s.includes("layout"))c=`Layout:${d(e,!0)}`;else if(s.includes("validation"))c=`ValidationRule:${d(e,!1)}`;else if(s.includes("flow"))c=`Flow:${d(e,!1)}`;else if(s.includes("customobject")){let n=e.match(/([A-Za-z0-9_]+__c)/);c=n?`CustomObject:${n[1]}`:`CustomObject:${d(e,!1)}`}else if(!s.includes("created")&&!s.includes("changed")&&!s.includes("deleted"))return null;return c?{metadataFormat:c,isDelete:a}:null}var lt=k(require("vscode"));async function xo(){let t=C();if(t)try{let{stdout:e}=await g('git for-each-ref --sort=-committerdate --format="%(refname:short)|||%(committerdate:relative)|||%(subject)" refs/heads/',{cwd:t}),o=e.split(`
`).filter(r=>r.trim()).map(r=>{let p=r.split("|||");return{label:`$(git-branch) ${p[0]}`,description:p[1],detail:p[2],branchName:p[0]}}),s=await lt.window.showQuickPick(o,{placeHolder:"Select a branch from history to checkout",matchOnDescription:!0,matchOnDetail:!0});s&&await Me(s.branchName)}catch{lt.window.showErrorMessage("Ricwiz: Failed to get branch history")}}var Oe=k(require("vscode"));async function ko(){let t=C();if(!t)return;let e=await Oe.window.showInputBox({prompt:"Enter ticket number or name (e.g., 48934)",placeHolder:"48934"});if(!e)return;let o=xe(e);try{let{stdout:s}=await g(`git branch --list "*${o}*"`,{cwd:t}),r=s.split(`
`).map(c=>c.replace("*","").trim()).filter(c=>c);if(r.length===0){Oe.window.showInformationMessage(`Ricwiz: No branches found matching "${e}"`);return}let p=r.map(c=>({label:`$(git-branch) ${c}`,branchName:c})),a=await Oe.window.showQuickPick(p,{placeHolder:`Select a branch for ${e}`});a&&await Me(a.branchName)}catch{Oe.window.showErrorMessage("Ricwiz: Failed to search branches")}}var Be=k(require("vscode")),Co=k(require("path"));async function $o(){let t=Be.window.activeTextEditor;if(!t)return Be.window.showErrorMessage("Ricwiz: Please open a file in the editor to check blame."),null;let e=t.document.fileName,o=Co.basename(e),s=C();if(!s)return Be.window.showErrorMessage("Ricwiz: Workspace is not a git repository."),null;let r=[];try{let{stdout:i}=await g(`git log -5 --pretty=format:"%an|%ar|%s|%h" -- "${e}"`,{cwd:s}),l=i.trim().split(`
`);for(let m of l){let u=m.split("|");u.length>=4&&r.push({author:u[0],time:u[1],message:u.slice(2,-1).join("|"),hash:u[u.length-1]})}}catch(i){R.appendLine(`[WhoToBlame] Git blame error: ${i.message}`)}let p="Unknown",a="Unknown",c="Unknown",d=[],n=_e(e);if(n)try{await Be.window.withProgress({location:Be.ProgressLocation.Notification,title:`Ricwiz: Analyzing ${n.name} in Salesforce...`,cancellable:!1},async()=>{let i="";if(n.type==="CustomField"){let l=n.name.split(".");l.length===2&&(i=`SELECT LastModifiedBy.Name, LastModifiedDate, CreatedBy.Name FROM CustomField WHERE DeveloperName = '${l[1].replace("__c","")}' AND TableEnumOrId = '${l[0]}'`)}else n.type==="LightningComponentBundle"?i=`SELECT LastModifiedBy.Name, LastModifiedDate, CreatedBy.Name FROM LightningComponentBundle WHERE DeveloperName = '${n.name}'`:i=`SELECT LastModifiedBy.Name, LastModifiedDate, CreatedBy.Name FROM ${n.type} WHERE Name = '${n.name}'`;if(i)try{let{stdout:l}=await g(`sf data query -t -q "${i}" --json`,{cwd:s,maxBuffer:52428800}),m=JSON.parse(l);if(m&&m.result&&m.result.records&&m.result.records.length>0){let u=m.result.records[0];p=u.LastModifiedBy?u.LastModifiedBy.Name:"Unknown",c=u.CreatedBy?u.CreatedBy.Name:"Unknown",a=new Date(u.LastModifiedDate).toLocaleString()}else p="Not found in Org",a="N/A",c="N/A"}catch(l){p="Query Error",a="N/A",c="N/A",R.appendLine(`[WhoToBlame] Query error: ${l.message}`)}try{let l="SELECT Action, Display, CreatedBy.Name, CreatedDate FROM SetupAuditTrail ORDER BY CreatedDate DESC LIMIT 1500",{stdout:m}=await g(`sf data query -q "${l}" --json`,{cwd:s,maxBuffer:52428800}),u=JSON.parse(m);if(u&&u.result&&u.result.records){let f=n.name.replace("__c","");d=u.result.records.filter(h=>h.Display&&h.Display.includes(f)).map(h=>({action:h.Action,display:h.Display,author:h.CreatedBy?h.CreatedBy.Name:"Unknown",time:new Date(h.CreatedDate).toLocaleString()})).slice(0,10)}}catch(l){R.appendLine(`[WhoToBlame] Audit trail query error: ${l.message}`)}})}catch(i){R.appendLine(`[WhoToBlame] Salesforce query error: ${i.message}`)}else p="Unsupported Metadata Type",a="N/A";return{fileName:o,gitHistory:r,sfAuthor:p,sfTime:a,sfCreatedBy:c,auditHistory:d}}var ge=k(require("vscode"));var je=k(require("https"));async function Ro(t,e){let o=C();if(!o)return;let s=(await Ae())?.trim();if(!s){ge.window.showErrorMessage("Ricwiz: GitLab token is not configured.");return}try{let r=await z.initialize(o,{skipPrompt:!0});if(!r)return;let a=r.getConfig("gitlabUrlOverride","");if(a){let c=new URL(a);a=`${c.protocol}//${c.host}`}else{let{stdout:c}=await g("git remote",{cwd:o}),d=c.split(`
`).map(i=>i.trim()).filter(i=>i),n=!1;for(let i of d){let{stdout:l}=await g(`git remote get-url ${i}`,{cwd:o}),m=l.trim();m.endsWith(".git")&&(m=m.slice(0,-4)),m.startsWith("git@")&&(m=m.replace("git@","").replace(":","/"),m=`https://${m}`);let u=new URL(m),f=u.pathname;if(f.startsWith("/")&&(f=f.substring(1)),f.endsWith("/")&&(f=f.slice(0,-1)),encodeURIComponent(f)===t||f===t){a=`${u.protocol}//${u.host}`,n=!0;break}}if(!n){ge.window.showErrorMessage(`Ricwiz: Could not determine base URL for project ${t}`);return}}await ge.window.withProgress({location:ge.ProgressLocation.Notification,title:`Fetching failed jobs for Pipeline #${e}...`,cancellable:!1},async()=>{let c=new je.Agent({keepAlive:!0}),d=new URL(`${a}/api/v4/projects/${t}/pipelines/${e}/jobs?scope[]=failed`),n=await new Promise(w=>{je.get(d,{headers:{"PRIVATE-TOKEN":s},agent:c},h=>{let y="";h.on("data",b=>y+=b),h.on("end",()=>{if(h.statusCode===200)try{w(JSON.parse(y))}catch{w([])}else w([])})}).on("error",()=>w([]))});if(!n||n.length===0){ge.window.showInformationMessage("Ricwiz: No failed jobs found for this pipeline.");return}let i=n[0],l=new URL(`${a}/api/v4/projects/${t}/jobs/${i.id}/trace`),u=(await new Promise(w=>{je.get(l,{headers:{"PRIVATE-TOKEN":s},agent:c},h=>{let y="";h.on("data",b=>y+=b),h.on("end",()=>w(y))}).on("error",h=>w(`Failed to fetch log: ${h.message}`))})).replace(/\x1B\[[0-9;]*[mK]/g,""),f=ge.window.createOutputChannel(`Pipeline #${e} - Job ${i.name}`);f.appendLine(`Pipeline ID: ${e}`),f.appendLine(`Job Name: ${i.name}`),f.appendLine(`Status: ${i.status}`),f.appendLine(`URL: ${i.web_url}`),f.appendLine("========================================"),f.appendLine(u),f.show()})}catch(r){ge.window.showErrorMessage(`Ricwiz: Error fetching pipeline logs - ${r.message}`)}}function zo(t,e,o){t.subscriptions.push(v.commands.registerCommand("ricwiz.conflictAction",Dt),v.commands.registerCommand("ricwiz.generateDestructiveChanges",async()=>{try{await Pt()}finally{v.commands.executeCommand("ricwiz.manualRefresh")}}),v.commands.registerCommand("ricwiz.runSmartTests",async()=>{try{await Bt()}finally{v.commands.executeCommand("ricwiz.manualRefresh")}}),v.commands.registerCommand("ricwiz.refreshWebview",()=>{e&&v.commands.executeCommand("workbench.action.webview.reloadWebviewAction")}),v.commands.registerCommand("ricwiz.createBranches",async s=>{try{await St(s)}finally{v.commands.executeCommand("ricwiz.manualRefresh")}}),v.commands.registerCommand("ricwiz.prepareDeploy",async()=>{try{await It()}finally{v.commands.executeCommand("ricwiz.manualRefresh")}}),v.commands.registerCommand("ricwiz.createMergeRequests",async()=>{try{await Ut()}finally{v.commands.executeCommand("ricwiz.manualRefresh")}}),v.commands.registerCommand("ricwiz.createMergeRequestsVSCode",async()=>{try{await Ot()}finally{v.commands.executeCommand("ricwiz.manualRefresh")}}),v.commands.registerCommand("ricwiz.openJiraTicket",async()=>{try{await Nt()}finally{v.commands.executeCommand("ricwiz.manualRefresh")}}),v.commands.registerCommand("ricwiz.openJiraTicketVSCode",async()=>{try{await Wt()}finally{v.commands.executeCommand("ricwiz.manualRefresh")}}),v.commands.registerCommand("ricwiz.showJiraDetails",()=>{e&&Kt(e)}),v.commands.registerCommand("ricwiz.openJiraDashboard",s=>{e&&Zt(e,s)}),v.commands.registerCommand("ricwiz.openJiraDetailsForId",s=>{e&&Xt(e,s)}),v.commands.registerCommand("ricwiz.toggleDashboardBranches",s=>{e&&(e.setDashboardShowBranches(s),v.commands.executeCommand("ricwiz.openJiraDashboard"))}),v.commands.registerCommand("ricwiz.changeJiraStatus",async()=>{try{await eo()}finally{v.commands.executeCommand("ricwiz.manualRefresh")}}),v.commands.registerCommand("ricwiz.addJiraComment",async()=>{try{await to()}finally{v.commands.executeCommand("ricwiz.manualRefresh")}}),v.commands.registerCommand("ricwiz.addJiraLabel",async()=>{try{await oo()}finally{v.commands.executeCommand("ricwiz.manualRefresh")}}),v.commands.registerCommand("ricwiz.setJiraToken",io),v.commands.registerCommand("ricwiz.setGitlabToken",no),v.commands.registerCommand("ricwiz.syncAll",async()=>{try{await so()}finally{v.commands.executeCommand("ricwiz.manualRefresh")}}),v.commands.registerCommand("ricwiz.updateBases",async()=>{try{await ao()}finally{v.commands.executeCommand("ricwiz.manualRefresh")}}),v.commands.registerCommand("ricwiz.deleteUnusedBranches",async()=>{try{await co()}finally{v.commands.executeCommand("ricwiz.manualRefresh")}}),v.commands.registerCommand("ricwiz.checkoutBranch",async s=>{try{await Me(s)}finally{v.commands.executeCommand("ricwiz.manualRefresh")}}),v.commands.registerCommand("ricwiz.copyBranchName",async()=>{try{await lo()}finally{v.commands.executeCommand("ricwiz.manualRefresh")}}),v.commands.registerCommand("ricwiz.generatePackageXml",async()=>{try{await po()}finally{v.commands.executeCommand("ricwiz.manualRefresh")}}),v.commands.registerCommand("ricwiz.deployPackage",async()=>{try{await uo()}finally{v.commands.executeCommand("ricwiz.manualRefresh")}}),v.commands.registerCommand("ricwiz.importData",async()=>{try{await go()}finally{v.commands.executeCommand("ricwiz.manualRefresh")}}),v.commands.registerCommand("ricwiz.listTicketFiles",async()=>{try{await fo()}finally{v.commands.executeCommand("ricwiz.manualRefresh")}}),v.commands.registerCommand("ricwiz.resetTracking",async()=>{try{await ho()}finally{v.commands.executeCommand("ricwiz.manualRefresh")}}),v.commands.registerCommand("ricwiz.extractComponent",async()=>{try{await wo()}finally{v.commands.executeCommand("ricwiz.manualRefresh")}}),v.commands.registerCommand("ricwiz.deployMultiOrg",async()=>{try{await bo()}finally{v.commands.executeCommand("ricwiz.manualRefresh")}}),v.commands.registerCommand("ricwiz.captureAdminChanges",async()=>{try{await yo()}finally{v.commands.executeCommand("ricwiz.manualRefresh")}}),v.commands.registerCommand("ricwiz.openHistory",async()=>{try{await xo()}finally{v.commands.executeCommand("ricwiz.manualRefresh")}}),v.commands.registerCommand("ricwiz.searchTicket",async()=>{try{await ko()}finally{v.commands.executeCommand("ricwiz.manualRefresh")}}),v.commands.registerCommand("ricwiz.whoToBlame",async()=>{let s=await $o();s&&e&&(e.setBlameData(s),e.setPage("blame"))}),v.commands.registerCommand("ricwiz.showPipelineLogs",(s,r)=>Ro(s,r)),v.commands.registerCommand("ricwiz.manualRefresh",()=>{o&&o()}),v.commands.registerCommand("ricwiz.toggleAutoRefresh",()=>{if(e){let s=!e.isAutoRefreshEnabled();e.setAutoRefresh(s),v.workspace.getConfiguration("ricwiz").update("autoRefresh",s,v.ConfigurationTarget.Global)}}),v.commands.registerCommand("ricwiz.openSettings",()=>{v.commands.executeCommand("workbench.action.openSettings","ricwiz")}))}var se=k(require("vscode"));function Po(t,e,o){let s,r=se.workspace.getConfiguration("ricwiz").get("autoRefresh",!0);e?.setAutoRefresh(r),t.subscriptions.push(se.workspace.onDidChangeConfiguration(a=>{if(a.affectsConfiguration("ricwiz.autoRefresh")){let c=se.workspace.getConfiguration("ricwiz").get("autoRefresh",!0);e?.setAutoRefresh(c)}}));async function p(){let a=se.extensions.getExtension("vscode.git");if(a){let n=function(i){let l="",m;async function u(){let w=se.workspace.workspaceFolders;if(!w)return;let h=w[0].uri.fsPath,y=await L(h);if(y&&y!==l){l=y;let b=se.workspace.getConfiguration("ricwiz"),P=b.get("ticketPrefix","SFPSCA-");if(!y.includes(P)){let E=y.match(/([A-Z]+-)\d+/i);E&&(P=E[1].toUpperCase())}let S=[],A=[],oe=[],D=[],I=await z.initialize(h,{skipPrompt:!0}),Z=I?.environments||b.get("environments",[{name:"Qual",sourceBranch:"quality"},{name:"Val",sourceBranch:"validation"},{name:"Prod",sourceBranch:"main"}]);try{let E=b.get("workspaceCheckoutButtons",["main","quality","validation"]);oe=Array.from(new Set(E))}catch{}let j="",Le=y.match(new RegExp(`(${P}\\d+(?:-\\d+)?)`,"i"));if(Le){let E=Le[1].toUpperCase();j=E;let fe=b.get("commitMessageSuffix","- "),mt=/^[A-Z]+-\d+(?:-\d+)?\s*(?:-\s*|:\s*|\s+)?/i;mt.test(i.inputBox.value)?i.inputBox.value.toUpperCase().startsWith(E)||(i.inputBox.value=i.inputBox.value.replace(mt,`${E}${fe}`)):i.inputBox.value=`${E}${fe}`+i.inputBox.value,o.text=`$(bookmark) ${E}`,o.tooltip=`Branch: ${y}
Click to open Jira ticket`,o.show();try{let pt=await ze(h,E,"");S=await Re(h,pt,E,Z,I)}catch{}}else{o.hide();try{D=await At(h)}catch{}}let[We,Je,ve]=await Promise.all([Lt(h,10),Mt(h,y,Z,I),j?Te(j).catch(E=>{let fe=E.message;return fe&&(fe.includes("ENOTFOUND")||fe.includes("network"))&&(fe="No Internet or Invalid URL"),{summary:`\u26A0\uFE0F Jira Error: ${fe}`,description:"",status:""}}):Promise.resolve(null)]);A=We;let et=ve?ve.summary:"",Se=ve&&ve.status||"";e?.updateBranch(y,Je,S,A,oe,D,et,Se)}}function f(){e?.isAutoRefreshEnabled()&&(m&&clearTimeout(m),m=setTimeout(()=>{l="",u()},300))}s=()=>{l="",u()},u(),t.subscriptions.push(i.state.onDidChange(()=>f())),t.subscriptions.push(se.window.onDidChangeWindowState(w=>{w.focused&&f()}))};var c=n;a.isActive||await a.activate();let d=a.exports.getAPI(1);d.repositories.length>0&&d.repositories.forEach(i=>n(i)),d.onDidOpenRepository(i=>n(i))}}return p(),()=>{s&&s()}}var re;function No(t){yt(t),re=new Ve(t.extensionUri),t.subscriptions.push(Ne.window.registerWebviewViewProvider("ricwiz-webview",re));let e=Ne.window.createStatusBarItem(Ne.StatusBarAlignment.Left,100);e.command="ricwiz.openJiraTicket",t.subscriptions.push(e);let o=Po(t,re,e);zo(t,re,o)}function Wo(){}0&&(module.exports={activate,deactivate,webviewProvider});
