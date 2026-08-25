"use strict";var Bo=Object.create;var Ge=Object.defineProperty;var So=Object.getOwnPropertyDescriptor;var Do=Object.getOwnPropertyNames;var Eo=Object.getPrototypeOf,To=Object.prototype.hasOwnProperty;var Mo=(t,e)=>{for(var o in e)Ge(t,o,{get:e[o],enumerable:!0})},ut=(t,e,o,s)=>{if(e&&typeof e=="object"||typeof e=="function")for(let r of Do(e))!To.call(t,r)&&r!==o&&Ge(t,r,{get:()=>e[r],enumerable:!(s=So(e,r))||s.enumerable});return t};var C=(t,e,o)=>(o=t!=null?Bo(Eo(t)):{},ut(e||!t||!t.__esModule?Ge(o,"default",{value:t,enumerable:!0}):o,t)),Lo=t=>ut(Ge({},"__esModule",{value:!0}),t);var Jo={};Mo(Jo,{activate:()=>jo,deactivate:()=>Wo,webviewProvider:()=>ne});module.exports=Lo(Jo);var je=C(require("vscode"));var P=C(require("vscode"));function x(t){return t?t.replace(/&/g,"&amp;").replace(/</g,"&lt;").replace(/>/g,"&gt;").replace(/"/g,"&quot;").replace(/'/g,"&#39;"):""}function He(t){let e=(t||"").toLowerCase().trim();return e==="open"?"#888888":e==="in progress"?"#007acc":e==="waiting for deploy"?"#d7a500":e==="close"||e==="done"||e==="closed"?"#238636":"var(--vscode-badge-background)"}function ye(t){return t?t==="running"?"\u{1F7E1}":t==="success"?"\u{1F7E2}":t==="failed"?"\u{1F534}":t==="canceled"||t==="skipped"?"\u26AA":"":""}function H(){return`
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
    `}function gt(t,e){let o=q(),s=(e.files||[]).map(r=>`
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

        ${H()}
    </body>
    </html>`}function ft(t){return`<!DOCTYPE html>
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

        ${H()}
    </body>
    </html>`}function ht(t){let e=q(),o=t?.ticketId||"Jira",s=t?.summary||"No Title",r=t?.description||"No description provided.",p=t?.relatedBranches||[];return`<!DOCTYPE html>
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
                        ${p.map(n=>{let c=ye(n.pipelineStatus),a="";return n.pipelineStatus==="failed"&&n.projectPath&&n.pipelineId&&(a=`onclick="event.stopPropagation(); sendCommand('showPipelineLogs', { projectPath: '${n.projectPath}', pipelineId: ${n.pipelineId} });" style="cursor: pointer;"`),`
                            <div class="btn" style="padding: 6px 10px; font-size: 12px; display: flex; justify-content: space-between; align-items: center; background-color: var(--vscode-button-secondaryBackground); color: var(--vscode-button-secondaryForeground); border-radius: 4px;" onclick="sendCheckoutCommand('${x(n.name)}', this)" title="Checkout ${x(n.name)}">
                                <div style="display: flex; align-items: center; gap: 6px; overflow: hidden;">
                                    <span style="overflow: hidden; text-overflow: ellipsis; white-space: nowrap; font-weight: bold;">${x(n.name)}</span>
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
    </html>`}function wt(t){let{data:e,showBranches:o}=t,s=q(),r=e||{queries:[],selectedIndex:0,results:[],error:null},p=r.queries.map((c,a)=>`
        <option value="${a}" ${a===r.selectedIndex?"selected":""}>${x(c.name)}</option>
    `).join(""),n=r.error?`
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
                                ${c.detailedBranches.map(a=>{let d=ye(a.pipelineStatus),i="";return a.pipelineStatus==="failed"&&a.projectPath&&a.pipelineId&&(i=`onclick="event.stopPropagation(); sendCommand('showPipelineLogs', { projectPath: '${a.projectPath}', pipelineId: ${a.pipelineId} });" style="cursor: pointer;"`),`
                                    <div style="display: flex; justify-content: space-between; align-items: center; font-size: 10px; background: var(--vscode-editor-background); padding: 2px 6px; border-radius: 3px;">
                                        <div style="display: flex; align-items: center; gap: 6px; overflow: hidden; cursor: pointer; flex: 1;" onclick="sendCheckoutCommand('${x(a.name)}', this)" title="Checkout ${x(a.name)}">
                                            <span style="overflow: hidden; text-overflow: ellipsis; white-space: nowrap;">${x(a.name)}</span>
                                        </div>
                                        <div style="display: flex; gap: 6px; align-items: center;">
                                            ${a.isMerged?'<span style="background-color: var(--vscode-charts-green); color: white; border-radius: 3px; padding: 1px 4px; font-size: 8px; font-weight: bold;">MERGED</span>':""}
                                            ${d?`<span title="Pipeline: ${a.pipelineStatus}" ${i}>${d}</span>`:""}
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
            ${n}
        </div>

        ${H()}
    </body>
    </html>`}function vt(){return`<!DOCTYPE html>
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
    </html>`}function bt(t){let{logoUri:e,currentBranch:o,currentBranchIsMerged:s,relatedBranches:r,commits:p,baseBranches:n,recentTickets:c,ticketTitle:a,ticketStatus:d,autoRefreshEnabled:i}=t,m=q(),l=p.length>0?`
        <div class="separator"></div>
        <div style="padding: 0 4px;">
            <div style="font-size: 11px; opacity: 0.7; margin-bottom: 6px; display: flex; align-items: center; gap: 4px;">
                <span>\u2637</span> Recent Commits
            </div>
            <div style="display: flex; flex-direction: column; gap: 2px;">
                ${p.map(w=>`
                    <div style="font-size: 11px; padding: 3px 4px; border-radius: 2px; display: flex; gap: 6px; align-items: baseline;">
                        <code style="color: var(--vscode-textLink-foreground); font-size: 10px; flex-shrink: 0;">${x(w.hash)}</code>
                        <span style="flex: 1; overflow: hidden; text-overflow: ellipsis; white-space: nowrap;" title="${x(w.message)}">${x(w.message)}</span>
                        <span style="font-size: 9px; opacity: 0.5; flex-shrink: 0;">${x(w.timeAgo)}</span>
                    </div>
                `).join("")}
            </div>
        </div>
    `:"",u=r.find(w=>w.name===o),f="";u&&(f=ye(u.pipelineStatus));let h=u?u.mrUrl:void 0,v=r.filter(w=>w.name!==o),k=o?`
        <div style="background-color: var(--vscode-editor-inactiveSelectionBackground); padding: 10px; border-radius: 6px; margin-bottom: 16px; border: 1px solid var(--vscode-panel-border); box-shadow: 0 2px 4px rgba(0,0,0,0.1); position: relative;">
            ${a&&d?`
            <div style="position: absolute; top: 6px; right: 6px; z-index: 10; cursor: pointer; font-size: 9px; padding: 2px 6px; border-radius: 18px; background-color: ${He(d)}; color: white; border: 1px solid var(--vscode-panel-border); opacity: 0.9; font-weight: bold; text-transform: uppercase; display: flex; align-items: center; gap: 4px;" onclick="sendCommand('changeJiraStatus', null, this)" title="Update Jira Status">
                <span>\u270E</span><span>${x(d)}</span>
            </div>
            `:""}
            <div style="font-size: 10px; opacity: 0.7; margin-bottom: 4px; display: flex; align-items: center; justify-content: center; gap: 4px; text-transform: uppercase;">
                <span>Current Ticket / Branch</span>
                <button class="copy-btn" onclick="sendCommand('copyBranch', null, this)" title="Copy branch name to clipboard">\u2398</button>
            </div>
            <div style="font-weight: bold; font-size: 14px; word-break: break-all; text-align: center; color: var(--vscode-textLink-foreground); display: flex; justify-content: center; align-items: center; gap: 6px;">
                <span>${x(o)}</span>
                ${f?`<span title="Pipeline: ${u.pipelineStatus}" style="font-size: 12px;">${f}</span>`:""}
                ${h?`<span onclick="event.stopPropagation(); sendCommand('openExternal', '${h}');" title="Open Merge Request" style="cursor: pointer; font-size: 12px;">\u{1F517}</span>`:""}
                ${s?'<span style="background-color: var(--vscode-charts-green); color: white; border-radius: 3px; padding: 1px 4px; font-size: 10px; font-weight: bold;" title="Merged to target env">MERGED</span>':""}
            </div>
            ${a?`<div style="font-size: 12px; margin-top: 6px; text-align: center; opacity: 0.9; font-style: italic;">${x(a)}</div>`:""}
            ${v.length>0?`
                <div style="margin-top: 10px; border-top: 1px solid var(--vscode-panel-border); padding-top: 10px;">
                    <div style="font-size: 10px; opacity: 0.7; margin-bottom: 6px; text-transform: uppercase; text-align: center;">Sister Branches</div>
                    <div style="display: flex; flex-direction: column; gap: 4px;">
                        ${v.map(w=>{let y=ye(w.pipelineStatus),R="";return w.pipelineStatus==="failed"&&w.projectPath&&w.pipelineId&&(R=`onclick="event.stopPropagation(); sendCommand('showPipelineLogs', { projectPath: '${w.projectPath}', pipelineId: ${w.pipelineId} });" style="cursor: pointer;"`),`
                            <div class="btn" style="padding: 6px 8px; font-size: 11px; display: flex; justify-content: space-between; align-items: center; background-color: var(--vscode-button-secondaryBackground); color: var(--vscode-button-secondaryForeground); border-radius: 4px; box-sizing: border-box; width: 100%;" onclick="sendCheckoutCommand('${x(w.name)}', this)" title="Checkout ${x(w.name)}">
                                <div style="display: flex; align-items: center; gap: 4px; overflow: hidden;">
                                    <span style="overflow: hidden; text-overflow: ellipsis; white-space: nowrap; font-weight: bold;">${x(w.name)}</span>
                                </div>
                                <div style="display: flex; gap: 4px; align-items: center;">
                                    ${w.isMerged?'<span style="background-color: var(--vscode-charts-green); color: white; border-radius: 3px; padding: 1px 4px; font-size: 9px; font-weight: bold;" title="Merged to target env">MERGED</span>':""}
                                    ${y?`<span title="Pipeline: ${w.pipelineStatus}" style="font-size: 10px;" ${R}>${y}</span>`:""}
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
                            <div class="btn" style="padding: 6px 8px; font-size: 11px; display: flex; justify-content: space-between; align-items: center; background-color: var(--vscode-button-secondaryBackground); color: var(--vscode-button-secondaryForeground); border-radius: 4px; box-sizing: border-box; width: 100%;" onclick="sendCheckoutCommand('${x(w)}', this)" title="Checkout ${x(w)}">
                                <span style="font-weight: bold; overflow: hidden; text-overflow: ellipsis; white-space: nowrap;">${x(w)}</span>
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
                <button class="copy-btn" id="autoRefreshToggle" onclick="sendCommand('toggleAutoRefresh', null, this)" title="${i?"Auto-refresh is ON \u2014 click to disable":"Auto-refresh is OFF \u2014 click to enable"}" style="font-size: 11px; padding: 2px 6px; border-radius: 3px; border: 1px solid var(--vscode-panel-border); ${i?"opacity: 0.9; background-color: var(--vscode-button-secondaryBackground);":"opacity: 0.5;"}">
                    ${i?"\u26A1 Auto":"\u23F8\uFE0F Auto"}
                </button>
            </div>
        </div>

        ${k}

        ${n.length>0?`
            <div style="display: flex; gap: 4px; margin-bottom: 16px; flex-wrap: wrap; justify-content: center;">
                ${n.map(w=>{let y=w.split("/").pop()?.toUpperCase()||w.toUpperCase();return`
                    <button class="btn" style="flex: 1; min-width: 25%; justify-content: center; padding: 6px 4px; font-size: 10px; font-weight: bold; background-color: var(--vscode-button-secondaryBackground); color: var(--vscode-button-secondaryForeground); border-radius: 4px;" onclick="sendCheckoutCommand('${x(w)}', this)" title="Checkout ${x(w)}">
                        ${x(y)}
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
    </html>`}var qe=class{constructor(e){this._extensionUri=e}_extensionUri;webviewView;currentBranchCache="";currentBranchIsMergedCache=!1;relatedBranchesCache=[];commitsCache=[];baseBranchesCache=[];recentTicketsCache=[];ticketTitleCache="";ticketStatusCache="";currentPage="main";blameDataCache=null;jiraDataCache=null;dashboardDataCache=null;dashboardShowBranches=!1;autoRefreshEnabled=!0;conflictState=null;resolveWebviewView(e,o,s){this.webviewView=e,e.webview.options={enableScripts:!0,localResourceRoots:[this._extensionUri]},this.updateView(),e.webview.onDidReceiveMessage(r=>{switch(r.command){case"createBranches":P.commands.executeCommand("ricwiz.createBranches");break;case"createBranchForTicket":P.commands.executeCommand("ricwiz.createBranches",r.args);break;case"prepareDeploy":P.commands.executeCommand("ricwiz.prepareDeploy");break;case"openMRs":P.commands.executeCommand("ricwiz.createMergeRequests");break;case"openMRsVSCode":P.commands.executeCommand("ricwiz.createMergeRequestsVSCode");break;case"openExternal":r.args&&P.env.openExternal(P.Uri.parse(r.args));break;case"openJira":P.commands.executeCommand("ricwiz.openJiraTicket");break;case"showJiraDetails":P.commands.executeCommand("ricwiz.showJiraDetails");break;case"showPipelineLogs":P.commands.executeCommand("ricwiz.showPipelineLogs",r.args.projectPath,r.args.pipelineId);break;case"changeJiraStatus":P.commands.executeCommand("ricwiz.changeJiraStatus");break;case"addJiraComment":P.commands.executeCommand("ricwiz.addJiraComment");break;case"addJiraLabel":P.commands.executeCommand("ricwiz.addJiraLabel");break;case"setPage":this.setPage(r.args);break;case"openDashboard":P.commands.executeCommand("ricwiz.openJiraDashboard");break;case"openJiraDetailsForId":P.commands.executeCommand("ricwiz.openJiraDetailsForId",r.args);break;case"refreshDashboard":P.commands.executeCommand("ricwiz.openJiraDashboard");break;case"switchDashboardQuery":P.commands.executeCommand("ricwiz.openJiraDashboard",parseInt(r.args,10));break;case"toggleDashboardBranches":P.commands.executeCommand("ricwiz.toggleDashboardBranches",r.args);break;case"openJiraVSCode":P.commands.executeCommand("ricwiz.openJiraTicketVSCode");break;case"openSettings":P.commands.executeCommand("ricwiz.openSettings");break;case"checkout":let p=r.branch||r.args;p&&P.commands.executeCommand("ricwiz.checkoutBranch",p);break;case"copyBranch":P.commands.executeCommand("ricwiz.copyBranchName");break;case"generatePackageXml":P.commands.executeCommand("ricwiz.generatePackageXml");break;case"openDevTools":this.setPage("devtools");break;case"openMain":this.setPage("main");break;case"generateDestructiveChanges":P.commands.executeCommand("ricwiz.generateDestructiveChanges");break;case"deployPackage":P.commands.executeCommand("ricwiz.deployPackage");break;case"runSmartTests":P.commands.executeCommand("ricwiz.runSmartTests");break;case"importData":P.commands.executeCommand("ricwiz.importData");break;case"listTicketFiles":P.commands.executeCommand("ricwiz.listTicketFiles");break;case"resetTracking":P.commands.executeCommand("ricwiz.resetTracking");break;case"extractComponent":P.commands.executeCommand("ricwiz.extractComponent");break;case"deployMultiOrg":P.commands.executeCommand("ricwiz.deployMultiOrg");break;case"captureAdminChanges":P.commands.executeCommand("ricwiz.captureAdminChanges");break;case"whoToBlame":P.commands.executeCommand("ricwiz.whoToBlame");break;case"syncAll":P.commands.executeCommand("ricwiz.syncAll");break;case"updateBases":P.commands.executeCommand("ricwiz.updateBases");break;case"deleteUnused":P.commands.executeCommand("ricwiz.deleteUnusedBranches");break;case"conflict_commitAndContinue":P.commands.executeCommand("ricwiz.conflictAction","commitAndContinue");break;case"conflict_resolveDeletions":P.commands.executeCommand("ricwiz.conflictAction","resolveDeletions");break;case"conflict_abortDeploy":P.commands.executeCommand("ricwiz.conflictAction","abortDeploy");break;case"openFile":if(r.file){let n=P.workspace.workspaceFolders;if(n){let c=P.Uri.joinPath(n[0].uri,r.file);P.commands.executeCommand("vscode.open",c)}}break;case"searchTicket":P.commands.executeCommand("ricwiz.searchTicket");break;case"manualRefresh":P.commands.executeCommand("ricwiz.manualRefresh");break;case"toggleAutoRefresh":P.commands.executeCommand("ricwiz.toggleAutoRefresh");break;case"openHistory":P.commands.executeCommand("ricwiz.openHistory");break}})}setConflictState(e){this.conflictState=e,this.updateView()}updateBranch(e,o,s=[],r=[],p=[],n=[],c="",a=""){this.currentBranchCache=e,this.currentBranchIsMergedCache=o,this.relatedBranchesCache=s,this.commitsCache=r,this.baseBranchesCache=p,this.recentTicketsCache=n,this.ticketTitleCache=c,this.ticketStatusCache=a,this.webviewView&&this.updateView()}setDashboardShowBranches(e){this.dashboardShowBranches=e}getDashboardShowBranches(){return this.dashboardShowBranches}setBlameData(e){this.blameDataCache=e}setJiraData(e){this.jiraDataCache=e}setDashboardData(e){this.dashboardDataCache=e}setAutoRefresh(e){this.autoRefreshEnabled=e,this.updateView()}isAutoRefreshEnabled(){return this.autoRefreshEnabled}setPage(e){this.currentPage=e,this.updateView()}updateView(){if(!this.webviewView)return;let e=this.webviewView.webview.asWebviewUri(P.Uri.joinPath(this._extensionUri,"resources","logo.png"));if(this.conflictState){this.webviewView.webview.html=gt(e,this.conflictState);return}switch(this.currentPage){case"blame":this.webviewView.webview.html=ft(this.blameDataCache);break;case"jira":this.webviewView.webview.html=ht(this.jiraDataCache);break;case"dashboard":this.webviewView.webview.html=wt({data:this.dashboardDataCache,showBranches:this.dashboardShowBranches});break;case"devtools":this.webviewView.webview.html=vt();break;default:this.webviewView.webview.html=bt({logoUri:e,currentBranch:this.currentBranchCache,currentBranchIsMerged:this.currentBranchIsMergedCache,relatedBranches:this.relatedBranchesCache,commits:this.commitsCache,baseBranches:this.baseBranchesCache,recentTickets:this.recentTicketsCache,ticketTitle:this.ticketTitleCache,ticketStatus:this.ticketStatusCache,autoRefreshEnabled:this.autoRefreshEnabled});break}}};var de;function yt(t){de=t.secrets}async function xt(t){if(!de)throw new Error("SecretStorage is not initialized.");await de.store("ricwiz.jiraApiToken",t)}async function kt(){if(!de)throw new Error("SecretStorage is not initialized.");return await de.get("ricwiz.jiraApiToken")}async function Ct(t){if(!de)throw new Error("SecretStorage is not initialized.");await de.store("ricwiz.gitlabApiToken",t)}async function Ae(){if(!de)throw new Error("SecretStorage is not initialized.");return await de.get("ricwiz.gitlabApiToken")}var b=C(require("vscode"));var W=C(require("vscode")),Qe=C(require("path")),we=C(require("fs"));var De=C(require("vscode")),$t=C(require("child_process")),Rt=C(require("util")),Ao=Rt.promisify($t.exec),$=De.window.createOutputChannel("Ricwiz"),g=async(t,e)=>{$.appendLine(`[EXEC] ${t}`);let o=await Ao(t,{maxBuffer:50*1024*1024,...e});return{stdout:o.stdout.toString(),stderr:o.stderr.toString()}};function z(){let t=De.workspace.workspaceFolders;if(t)return t[0].uri.fsPath}async function I(t){try{let{stdout:e}=await g("git branch --show-current",{cwd:t});return e.trim()}catch{return""}}function le(t,e){if(!t.includes(e)){let o=t.match(/([A-Z]+-)\d+/i);if(o)return o[1].toUpperCase()}return e}function me(t,e,o=!1){let s=t.match(new RegExp(`(${e}\\d+)`,"i"));return s?s[1].toUpperCase():t.includes(e)&&!t.includes("-to-")?t.substring(t.indexOf(e)):o&&t.includes("-to-")?t.substring(t.indexOf(e)).split("-to-")[0]:""}function tt(t,e){let o=xe(t);return/^\d/.test(o)?`${e}${o}`.toUpperCase():o.toUpperCase()}async function V(t,e){let o=De.workspace.getConfiguration("ricwiz"),s=e?.prefix??o.get("ticketPrefix","SFPSCA-"),r=await I(t),p=le(r,s),n=e?.suggestedValue??me(r,p,e?.handleToSuffix),c=await De.window.showInputBox({prompt:e?.prompt||"Enter the full ticket ID (e.g., SCPSCA-1234) or just the number",placeHolder:e?.placeHolder||"Ticket ID or number",value:n});return c?{ticketId:tt(c,p),currentBranch:r,prefix:p}:void 0}async function ie(t,e){try{return await g(`git show-ref --verify --quiet refs/heads/${e}`,{cwd:t}),!0}catch{}return await Io(t,e)}async function Io(t,e){try{let{stdout:o}=await g(`git branch -r --list "*/${e}"`,{cwd:t});return o.trim().length>0}catch{return!1}}function xe(t){return t.replace(/[&|;$><`\\!"'\r\n]/g,"").trim()}var ke=C(require("vscode")),zt=C(require("path")),Ve=C(require("fs"));var B=class t{style;upstreamRemote;originRemote;ticketSourceBranch;ticketPrefix;branchPrefix;environments;activeProfile;profileName;constructor(e){this.activeProfile=e,this.profileName=e?.name;let o=ke.workspace.getConfiguration("ricwiz");this.style=e?.workflowStyle||o.get("workflowStyle","standard"),this.style==="multi-remote"?(this.upstreamRemote=e?.upstreamRemote||o.get("upstreamRemote","salesforce-master"),this.originRemote=e?.originRemote||o.get("originRemote","origin")):(this.upstreamRemote="origin",this.originRemote="origin"),this.ticketSourceBranch=e?.ticketSourceBranch||o.get("ticketSourceBranch","main"),this.ticketPrefix=e?.ticketPrefix||o.get("ticketPrefix","SFPSCA-"),this.branchPrefix=e?.branchPrefix??o.get("branchPrefix","");let s=[{name:"Qual",sourceBranch:"quality"},{name:"Val",sourceBranch:"validation"},{name:"Prod",sourceBranch:"main"}];this.environments=e?.environments||o.get("environments",s)}getConfig(e,o){return this.activeProfile&&this.activeProfile[e]!==void 0?this.activeProfile[e]:ke.workspace.getConfiguration("ricwiz").get(e,o)}static async initialize(e,o){let r=ke.workspace.getConfiguration("ricwiz").get("profiles",[]),p=zt.join(e,"ricwiz.json");if(Ve.existsSync(p))try{let n=Ve.readFileSync(p,"utf-8"),c=JSON.parse(n);c&&Array.isArray(c.profiles)&&(r=[...r,...c.profiles])}catch(n){ke.window.showErrorMessage(`Ricwiz: Error parsing ricwiz.json: ${n.message}`)}if(r.length>0){if(!o?.forcePrompt)try{let{stdout:d}=await g("git branch --show-current",{cwd:e}),i=d.trim(),m=i;i.includes("-to-")&&(m=i.split("-to-")[0]);let{stdout:l}=await g(`git config branch.${m}.ricwiz-profile`,{cwd:e}),u=l.trim();if(u){let f=r.find(h=>h.name===u);if(f)return new t(f)}}catch{}if(o?.skipPrompt)return new t;let n=r.map(d=>d.name),c=await ke.window.showQuickPick(n,{placeHolder:"Ricwiz: Select Workflow Profile",ignoreFocusOut:!0});if(!c)return;let a=r.find(d=>d.name===c);return new t(a)}return new t}buildUpstreamPath(e){return e.includes("/")?e:`${this.upstreamRemote}/${e}`}getFetchRemote(e){return e.includes("/")?e.split("/")[0]:this.upstreamRemote}getFetchBranch(e){return e.includes("/")?e.substring(e.indexOf("/")+1):e}};function _e(t){let e=t.replace(/\\/g,"/");if(e.includes("/classes/")){let o=e.match(/\/classes\/([^/.]+)\.cls/);if(o)return{type:"ApexClass",name:o[1]}}if(e.includes("/triggers/")){let o=e.match(/\/triggers\/([^/.]+)\.trigger/);if(o)return{type:"ApexTrigger",name:o[1]}}if(e.includes("/lwc/")){let o=e.match(/\/lwc\/([^/]+)\//);if(o)return{type:"LightningComponentBundle",name:o[1]}}if(e.includes("/aura/")){let o=e.match(/\/aura\/([^/]+)\//);if(o)return{type:"AuraDefinitionBundle",name:o[1]}}if(e.includes("/objects/")&&e.includes("/fields/")){let o=e.match(/\/objects\/([^/]+)\//),s=e.match(/\/fields\/([^/.]+)\.field/);if(o&&s)return{type:"CustomField",name:`${o[1]}.${s[1]}`}}if(e.includes("/objects/")){let o=e.match(/\/objects\/([^/.]+)\.object/);if(o)return{type:"CustomObject",name:o[1]}}if(e.includes("/layouts/")){let o=e.match(/\/layouts\/([^/.]+)\.layout/);if(o)return{type:"Layout",name:o[1]}}if(e.includes("/flows/")){let o=e.match(/\/flows\/([^/.]+)\.flow/);if(o)return{type:"Flow",name:o[1]}}if(e.includes("/permissionsets/")){let o=e.match(/\/permissionsets\/([^/.]+)\.permissionset/);if(o)return{type:"PermissionSet",name:o[1]}}if(e.includes("/permissionsetgroups/")){let o=e.match(/\/permissionsetgroups\/([^/.]+)\.permissionsetgroup/);if(o)return{type:"PermissionSetGroup",name:o[1]}}if(e.includes("/profiles/")){let o=e.match(/\/profiles\/([^/.]+)\.profile/);if(o)return{type:"Profile",name:o[1]}}if(e.includes("/customMetadata/")){let o=e.match(/\/customMetadata\/([^/.]+)\.md/);if(o)return{type:"CustomMetadata",name:o[1]}}if(e.includes("/flexipages/")){let o=e.match(/\/flexipages\/([^/.]+)\.flexipage/);if(o)return{type:"FlexiPage",name:o[1]}}return null}async function Pt(){let t=z();if(!t){W.window.showErrorMessage("Ricwiz: Open a workspace that is a Git repository.");return}let e=await B.initialize(t,{skipPrompt:!0}),o=e?e.ticketSourceBranch:W.workspace.getConfiguration("ricwiz").get("ticketSourceBranch","main"),s=e?e.originRemote:"origin";await W.window.withProgress({location:W.ProgressLocation.Notification,title:`Ricwiz: Finding deleted files compared to ${s}/${o}...`,cancellable:!1},async()=>{try{let{stdout:r}=await g(`git diff --name-only --diff-filter=D ${s}/${o}...HEAD`,{cwd:t}),p=r.split(`
`).map(u=>u.trim()).filter(u=>u.length>0);if(p.length===0){W.window.showInformationMessage(`Ricwiz: No deleted files found compared to ${s}/${o}.`);return}let n={},c=(u,f)=>{n[u]||(n[u]=[]),n[u].includes(f)||n[u].push(f)};for(let u of p){let f=_e(u);f&&c(f.type,f.name)}if(Object.keys(n).length===0){W.window.showInformationMessage("Ricwiz: Found deleted files in Git, but none mapped to recognizable Salesforce metadata.");return}let a=`<?xml version="1.0" encoding="UTF-8"?>
<Package xmlns="http://soap.sforce.com/2006/04/metadata">
`;for(let u of Object.keys(n).sort()){a+=`    <types>
`;for(let f of n[u].sort())a+=`        <members>${f}</members>
`;a+=`        <name>${u}</name>
    </types>
`}a+=`    <version>58.0</version>
</Package>`;let d=Qe.join(t,"destructiveChanges");we.existsSync(d)||we.mkdirSync(d);let i=Qe.join(d,"destructiveChanges.xml"),m=Qe.join(d,"package.xml");we.writeFileSync(i,a,"utf8"),we.existsSync(m)||we.writeFileSync(m,`<?xml version="1.0" encoding="UTF-8"?>
<Package xmlns="http://soap.sforce.com/2006/04/metadata">
    <version>58.0</version>
</Package>`,"utf8");let l=await W.workspace.openTextDocument(i);await W.window.showTextDocument(l),W.window.showInformationMessage("Ricwiz: destructiveChanges.xml generated successfully!")}catch(r){W.window.showErrorMessage(`Ricwiz: Error generating destructive changes: ${r.message}`)}})}var re=C(require("vscode"));async function Bt(){let t=z();if(!t)return;let e=await B.initialize(t,{skipPrompt:!0}),o=e?e.ticketSourceBranch:re.workspace.getConfiguration("ricwiz").get("ticketSourceBranch","main"),s=e?e.originRemote:"origin";await re.window.withProgress({location:re.ProgressLocation.Notification,title:"Ricwiz: Finding Apex Tests to run...",cancellable:!1},async()=>{try{let{stdout:r}=await g(`git diff --name-status ${s}/${o}...HEAD`,{cwd:t}),p=r.split(`
`).map(u=>u.trim()).filter(u=>u.length>0),n=new Set,c=new Set;for(let u of p){let f=u.split(/\s+/);if(f[0].startsWith("D"))continue;let h=f[1];if(h&&h.endsWith(".cls")){let v=h.match(/\/classes\/([^/.]+)\.cls/);if(v){let k=v[1];k.toLowerCase().endsWith("test")?n.add(k):c.add(k)}}}for(let u of c)n.add(`${u}Test`);if(n.size===0){re.window.showInformationMessage("Ricwiz: No Apex Classes were modified in this branch.");return}let a=Array.from(n).map(u=>({label:`$(beaker) ${u}`,description:"Apex Test Class"})),d=await re.window.showQuickPick(a,{canPickMany:!0,title:"Select Test Classes to Run",placeHolder:"Select tests..."});if(!d||d.length===0)return;let m=`sf apex run test -n ${d.map(u=>u.label.replace("$(beaker) ","").trim()).join(",")} -r human -w 30`,l=re.window.createTerminal("Ricwiz: Smart Tests");l.show(),l.sendText(m)}catch(r){re.window.showErrorMessage(`Ricwiz: Error finding tests: ${r.message}`)}})}var T=C(require("vscode"));var Ce=class{static isValidShellArg(e){return e?/^[a-zA-Z0-9\-_/.]+$/.test(e):!1}};async function St(t){let e=z();if(!e){T.window.showErrorMessage("Open a folder or workspace that is a Git repository.");return}let o=await B.initialize(e,{forcePrompt:!0});if(!o)return;let s=typeof t=="string"?t:void 0,r=await V(e,{prefix:o.ticketPrefix,suggestedValue:s});if(!r){T.window.showErrorMessage("Branch creation cancelled: Ticket not provided.");return}let{ticketId:p}=r,n=o.environments,c="";if(o.branchPrefix){let f=await T.window.showInputBox({prompt:"Ricwiz: Branch Prefix (leave empty to not use a prefix)",placeHolder:"e.g. CRC-R19-",value:o.branchPrefix,ignoreFocusOut:!0});if(f===void 0){T.window.showInformationMessage("Branch creation cancelled.");return}c=f.trim()}let a=c?`${c}${p}`:p,d=[{label:`$(git-branch) Main Branch (${a})`,description:`Base: ${o.ticketSourceBranch}`,picked:!0,type:"main",branchName:a}];for(let f of n){let h=c?`${c}${p}-to-${f.name}`:`${p}-to-${f.name}`;d.push({label:`$(cloud) ${f.name} (${h})`,description:`Base: ${f.sourceBranch}`,picked:!0,type:"env",branchName:h,envConfig:f})}let i=await T.window.showQuickPick(d,{placeHolder:"Ricwiz: Select branches to create (check/uncheck as needed)",canPickMany:!0,ignoreFocusOut:!0});if(!i||i.length===0){T.window.showInformationMessage("Branch creation cancelled: No branches selected.");return}let m=i.some(f=>f.type==="main"),l=i.filter(f=>f.type==="env").map(f=>({env:f.envConfig,branchName:f.branchName})),u=o.ticketSourceBranch;if(m){let f=[];try{let{stdout:w}=await g('git branch --all --format="%(refname:short)"',{cwd:e});f=w.split(`
`).map(y=>y.trim()).filter(y=>y&&y!=="origin"),f=[...new Set(f)]}catch{}let h=T.window.createQuickPick();h.title=`Ricwiz: Base Source Branch for '${a}'`,h.placeholder="Confirm or change the source branch for this ticket",h.value=o.ticketSourceBranch,h.ignoreFocusOut=!0;let v=()=>{let w=h.value.trim(),y=[];w&&y.push({label:w,description:"Use typed branch"}),y.push(...f.map(R=>({label:R}))),h.items=y};h.onDidChangeValue(v),v();let k=await new Promise(w=>{h.onDidAccept(()=>{let y=h.selectedItems[0];w(y?y.label:h.value),h.hide()}),h.onDidHide(()=>w(void 0)),h.show()});if(!k){T.window.showInformationMessage("Branch creation cancelled.");return}u=k.trim()}if(m&&!Ce.isValidShellArg(a)){T.window.showErrorMessage(`Invalid format for ticket ID: ${a}`);return}if(m&&!Ce.isValidShellArg(u)){T.window.showErrorMessage(`Invalid format for ticketSourceBranch in settings: ${u}`);return}for(let f of l){if(!Ce.isValidShellArg(f.env.name)){T.window.showErrorMessage(`Invalid format for environment name: ${f.env.name}`);return}if(!Ce.isValidShellArg(f.env.sourceBranch)){T.window.showErrorMessage(`Invalid format for environment sourceBranch: ${f.env.sourceBranch}`);return}}try{await g("git status",{cwd:e})}catch{T.window.showErrorMessage("The opened folder does not appear to be a valid Git repository.");return}try{await T.window.withProgress({location:T.ProgressLocation.Notification,title:"Ricwiz: Creating Branches",cancellable:!1},async f=>{let h=[];f.report({message:"Checking remote status (git fetch)...",increment:10});try{await g("git fetch",{cwd:e})}catch{}try{if(m){if(f.report({message:`Creating main branch ${a}...`,increment:15}),await ie(e,a))T.window.showInformationMessage(`Ricwiz: The branch ${a} already exists. Skipping creation...`),await g(`git checkout ${a}`,{cwd:e});else try{let k=o.getFetchRemote(u),w=o.getFetchBranch(u),y=o.buildUpstreamPath(u);await g(`git fetch ${k} ${w}`,{cwd:e}),await g(`git checkout -b ${a} ${y}`,{cwd:e}),h.push(a)}catch{try{await g(`git checkout -b ${a} ${u}`,{cwd:e}),h.push(a)}catch{throw new Error(`Could not create main branch '${a}' from '${u}'. Does the source branch exist?`)}}try{await g(`git config branch.${a}.ricwiz-source "${u}"`,{cwd:e}),o.profileName&&await g(`git config branch.${a}.ricwiz-profile "${o.profileName}"`,{cwd:e})}catch{}}if(l.length>0){let k=50/(l.length||1);for(let w of l){let y=w.branchName,R=w.env.sourceBranch;if(f.report({message:`Processing environment branch ${y}...`,increment:k}),!await ie(e,y))try{let D=o.buildUpstreamPath(R);await g(`git checkout -b ${y} ${D}`,{cwd:e}),h.push(y)}catch{try{await g(`git checkout -b ${y} ${R}`,{cwd:e}),h.push(y)}catch{throw new Error(`Could not create environment branch '${y}' from '${R}'. Does the source branch exist?`)}}}}f.report({message:`Publishing branches to ${o.originRemote}...`,increment:15});for(let k of h)try{await g(`git push -u ${o.originRemote} ${k}`,{cwd:e})}catch{T.window.showWarningMessage(`Ricwiz: Branch ${k} was created locally but could not be pushed to ${o.originRemote}.`)}let v=m?a:l[0]?.branchName||"";if(v){f.report({message:`Switching to ${v}...`,increment:10});try{await g(`git checkout ${v}`,{cwd:e})}catch{}}f.report({increment:100}),T.window.showInformationMessage("Ricwiz: All set! You can start working on your branches! \u{1F680}")}catch(v){if(T.window.showErrorMessage(`Ricwiz Branch Creation Failed: ${v.message}`),h.length>0){try{await g(`git checkout ${u}`,{cwd:e})}catch{}for(let k of h)try{await g(`git branch -D ${k}`,{cwd:e})}catch{}T.window.showWarningMessage(`Ricwiz: Rolled back (deleted) ${h.length} branch(es) locally due to failure.`)}}})}catch(f){T.window.showErrorMessage(`Ricwiz general error: ${f.message}`)}}var F=C(require("vscode"));var ve=C(require("vscode")),Ie=C(require("fs")),Fe=C(require("path"));var it;function ot(t){it=t}async function Dt(t){it&&await it(t)}async function $e(t,e,o,s,r){s&&s.report({message:"CONFLICT! Resolve & click 'Commit & Continue' in Ricwiz panel."});let p=!1,n=!1;r&&r.onCancellationRequested(()=>{n=!0});let c=async()=>{try{let{stdout:i}=await g("git status --porcelain",{cwd:t});return i.split(`
`).filter(m=>{let l=m.substring(0,2);return["UD","DU","DD","AU","UA"].includes(l)}).map(m=>m.substring(3).trim())}catch{return[]}},a=async()=>{try{let i=l=>l==="UU"?"Both Modified":l==="UD"?"Deleted by them":l==="DU"?"Deleted by us":l==="DD"?"Both Deleted":l==="AA"?"Both Added":l==="AU"?"Added by us":l==="UA"?"Added by them":"Conflicted",{stdout:m}=await g("git status --porcelain",{cwd:t});return m.split(`
`).map(l=>l.trimEnd()).filter(l=>l.length>2).filter(l=>{let u=l.substring(0,2);return["UU","AA","UD","DU","AU","UA","DD"].includes(u)}).map(l=>{let u=l.substring(0,2);return{file:l.substring(3).trim(),state:i(u)}})}catch{return[]}},d=async()=>{if(p)return;let i=await c(),m=await a();ne&&ne.setConflictState({isConflict:!0,sourceStr:e,targetStr:o,deletionsCount:i.length,files:m})};for(ot(async i=>{if(i==="abortDeploy")n=!0;else if(i==="resolveDeletions"){try{let l=(await c()).map(f=>({label:f})),u=await ve.window.showQuickPick(l,{canPickMany:!0,placeHolder:"Select conflicted files to DELETE",title:"Ricwiz: Delete Conflicted Files"});if(u&&u.length>0){for(let f of u)try{await g(`git rm --force "${f.label}"`,{cwd:t})}catch{}ve.window.showInformationMessage(`Ricwiz: Deleted ${u.length} conflicted file(s).`)}}catch(m){ve.window.showErrorMessage(`Ricwiz: Error. (${m.message})`)}d()}else if(i==="commitAndContinue")try{let l=(await c()).filter(f=>Ie.existsSync(Fe.join(t,f)));if(l.length>0&&await ve.window.showWarningMessage(`Wait! There are ${l.length} file(s) with deletion conflicts that are still on your disk.

If you commit now, you will KEEP them in the project.

Are you sure you want to KEEP them?`,{modal:!0},"Yes, KEEP them","No, let me DELETE them")!=="Yes, KEEP them"){d();return}let u=!1;try{let{stdout:f}=await g('git grep -E "^<<<<<<< "',{cwd:t});f.trim().length>0&&(u=!0)}catch{}if(u){ve.window.showErrorMessage("Ricwiz: You still have unresolved conflict markers (<<<<<<<) in your files. Please resolve them first!"),d();return}await g("git add .",{cwd:t}),await g("git commit --no-edit",{cwd:t})}catch(m){ve.window.showErrorMessage(`Ricwiz: Could not commit automatically. (${m.message})`),d()}}),d();;){if(n){p=!0,ot(void 0),ne?.setConflictState(null);try{await g("git merge --abort",{cwd:t})}catch{}return!1}try{let{stdout:i}=await g("git status --porcelain",{cwd:t}),m=i.split(`
`).some(v=>{let k=v.substring(0,2);return["UU","AA","UD","DU","AU","UA","DD"].includes(k)}),l=Fe.join(t,".git","MERGE_HEAD"),u=Fe.join(t,".git","REBASE_HEAD"),f=Fe.join(t,".git","CHERRY_PICK_HEAD");if(!(m||Ie.existsSync(l)||Ie.existsSync(u)||Ie.existsSync(f)))return p=!0,ot(void 0),ne?.setConflictState(null),ve.window.showInformationMessage("Ricwiz: Changes committed!"),!0}catch{}await new Promise(i=>setTimeout(i,2e3))}}var Ye=C(require("https")),Et=C(require("vscode"));async function st(){let t=await Ae();return!!(t&&t.trim())}async function Fo(t,e){let o=Et.workspace.getConfiguration("ricwiz"),s=(await Ae())?.trim();if(!s)throw new Error("No GitLab token");let r=e?e.getConfig("gitlabUrlOverride",""):o.get("gitlabUrlOverride",""),p=[];if(r&&r.trim()!=="")p.push(r.trim());else try{let{stdout:c}=await g("git remote",{cwd:t}),a=c.split(`
`).map(i=>i.trim()).filter(i=>i),d=[];e&&e.upstreamRemote&&a.includes(e.upstreamRemote)&&d.push(e.upstreamRemote),e&&e.originRemote&&e.originRemote!==e.upstreamRemote&&a.includes(e.originRemote)&&d.push(e.originRemote),a.includes("upstream")&&!d.includes("upstream")&&d.push("upstream"),a.includes("origin")&&!d.includes("origin")&&d.push("origin"),d.length===0&&a.length>0&&d.push(...a);for(let i of d)try{let{stdout:m}=await g(`git remote get-url ${i}`,{cwd:t}),l=m.trim();l.endsWith(".git")&&(l=l.slice(0,-4)),l.startsWith("git@")&&(l=l.replace("git@","").replace(":","/"),l=`https://${l}`),p.push(l)}catch(m){$.appendLine(`[GitLab API] Error getting remote URL for ${i}: ${m.message}`)}}catch(c){$.appendLine(`[GitLab API] Error getting remotes: ${c.message}`)}if(p.length===0)throw $.appendLine("[GitLab API] No candidate URLs found in getGitlabTargets!"),new Error("Could not get any remote origin URL.");return p.map(c=>{let a=new URL(c),d=`${a.protocol}//${a.host}`,i=a.pathname;i.startsWith("/")&&(i=i.substring(1)),i.endsWith("/")&&(i=i.slice(0,-1)),i.endsWith(".git")&&(i=i.slice(0,-4));let m=encodeURIComponent(i);return{baseUrl:d,token:s,projectPath:m}})}var Uo=new Ye.Agent({keepAlive:!0,maxSockets:10});async function rt(t,e,o,s){let r=new URL(`${t}${s}`);return $.appendLine(`[GitLab API] ${o} ${r.toString()}`),new Promise((p,n)=>{let c=Ye.request(r,{method:o,timeout:5e3,agent:Uo,headers:{"PRIVATE-TOKEN":e,Accept:"application/json"}},a=>{let d="";a.on("data",i=>d+=i),a.on("end",()=>{if($.appendLine(`[GitLab API] Response Code: ${a.statusCode}`),a.statusCode&&a.statusCode>=400)return $.appendLine(`[GitLab API] Error Data: ${d}`),n(new Error(`GitLab API error: ${a.statusCode}`));if(!d)return p({});try{let i=JSON.parse(d);Array.isArray(i)?$.appendLine(`[GitLab API] Returned array with ${i.length} items`):i&&typeof i=="object"&&$.appendLine(`[GitLab API] Returned object with id ${i.id||i.iid||"unknown"}`),p(i)}catch(i){$.appendLine(`[GitLab API] Parse Error: ${i.message}`),n(i)}})});c.on("timeout",()=>{c.destroy(),n(new Error("GitLab request timed out"))}),c.on("error",a=>{$.appendLine(`[GitLab API] Request Failed: ${a.message}`),n(a)}),c.end()})}var nt=new Map,Oo=30*1e3;async function at(t,e,o,s){$.appendLine(`[GitLab API] fetchMergeRequestStatus called for source: ${e}, target: ${o||"any"}`);let r=`${t}:${e}:${o||"any"}`,p=nt.get(r);if(p&&Date.now()-p.timestamp<Oo)return p.data;try{let n=await Fo(t,s),c=null,a=-1;for(let d of n)try{let i=`/api/v4/projects/${d.projectPath}/merge_requests?source_branch=${encodeURIComponent(e)}&order_by=updated_at&sort=desc`;o&&(i+=`&target_branch=${encodeURIComponent(o)}`);let m=await rt(d.baseUrl,d.token,"GET",i);if(m&&m.length>0){let l=m[0];try{let v=await rt(d.baseUrl,d.token,"GET",`/api/v4/projects/${d.projectPath}/merge_requests/${l.iid}`);v&&(l=v)}catch{}let u="none";if(l.head_pipeline&&l.head_pipeline.status){let v=l.head_pipeline.status;v==="success"||v==="failed"||v==="canceled"||v==="skipped"?u=v:u="running"}let f={isMerged:l.state==="merged",isOpen:l.state==="opened",pipelineStatus:u,webUrl:l.web_url,projectPath:d.projectPath,pipelineId:l.head_pipeline?l.head_pipeline.id:void 0},h=0;f.isOpen?h=2:f.isMerged&&(h=1),h>a&&(c=f,a=h)}}catch(i){$.appendLine(`[GitLab API] Error inside target loop: ${i.message}`)}if(c)return nt.set(r,{data:c,timestamp:Date.now()}),c;for(let d of n)try{let i=`/api/v4/projects/${d.projectPath}/pipelines?ref=${encodeURIComponent(e)}&order_by=updated_at&sort=desc`,m=await rt(d.baseUrl,d.token,"GET",i);if(m&&m.length>0){let l=m[0],u="none";if(l.status){let h=l.status;h==="success"||h==="failed"||h==="canceled"||h==="skipped"?u=h:u="running"}let f={isMerged:!1,isOpen:!1,pipelineStatus:u,webUrl:l.web_url,projectPath:d.projectPath,pipelineId:l.id};return nt.set(r,{data:f,timestamp:Date.now()}),f}}catch{}return null}catch(n){return $.appendLine(`[GitLab API] Failed to fetch MR status: ${n.message}`),null}}function Tt(t,e){return e.find(o=>t.endsWith(`-to-${o.name}`))}async function Re(t,e,o,s,r){let p=await st(),n=e.map(async c=>{let a=Tt(c,s);if(p){let d=a?a.sourceBranch:void 0,i=await at(t,c,d,r);if(i)return{name:c,isMerged:i.isMerged,pipelineStatus:i.pipelineStatus,mrUrl:i.webUrl,projectPath:i.projectPath,pipelineId:i.pipelineId}}else $.appendLine(`[GitLab API] Skipping MR check for ${c} because hasGitlabToken() is false`);return{name:c,isMerged:!1,pipelineStatus:"none"}});return await Promise.all(n)}async function Mt(t,e,o,s){let r=Tt(e,o);if(!r)return!1;if(await st()){let p=await at(t,e,r.sourceBranch,s);if(p)return p.isMerged}else $.appendLine(`[GitLab API] Skipping MR check for current branch ${e} because hasGitlabToken() is false`);return!1}async function Lt(t,e=10){try{let{stdout:o}=await g(`git log --oneline -${e} --format="%h|||%s|||%ar"`,{cwd:t});return o.split(`
`).filter(s=>s.trim()).map(s=>{let r=s.split("|||");return{hash:r[0]||"",message:r.length>=3?r.slice(1,-1).join("|||"):r[1]||"",timeAgo:r.length>=3?r[r.length-1]:""}})}catch{return[]}}async function At(t,e=3){try{let{stdout:o}=await g('git for-each-ref --sort=-committerdate --format="%(refname:short)" refs/heads/',{cwd:t}),s=o.split(`
`).map(p=>p.trim()).filter(p=>p),r=/^[A-Z]+-\d+$/i;return s.filter(p=>r.test(p)).slice(0,e)}catch{return[]}}async function ze(t,e,o){let{stdout:s}=await g(`git branch --all --list "*${e}*"`,{cwd:t}),r=new Set,p=new RegExp(`${e}(?!\\d)`,"i");return s.split(`
`).forEach(n=>{let c=n.replace("*","").trim();if(c){if(c.startsWith("remotes/")){let a=c.split("/");a.length>2&&(c=a.slice(2).join("/"))}c&&c!==o&&!c.includes("HEAD")&&p.test(c)&&r.add(c)}}),Array.from(r)}async function se(t,e,o){try{let{stdout:s}=await g(`git branch --all --list "*${e}*"`,{cwd:t}),r=new RegExp(`${e}(?!\\d)`,"i"),p=s.split(`
`).map(c=>c.replace("*","").trim().replace(/^remotes\/[^\/]+\//,"")).filter(c=>c&&!c.includes("HEAD")&&r.test(c)),n=Array.from(new Set(p));if(o){let c=`-to-${o}`,a=n.find(d=>d.endsWith(c));return a||`${e}${c}`}else{let c=n.find(a=>!a.includes("-to-"));return c||e}}catch{return o?`${e}-to-${o}`:e}}async function It(){let t=z();if(!t){F.window.showErrorMessage("Ricwiz: Open a folder or workspace that is a Git repository.");return}try{await g("git status",{cwd:t})}catch{F.window.showErrorMessage("Ricwiz: The opened folder does not appear to be a valid Git repository.");return}let e=await B.initialize(t);if(!e)return;let o=e.environments,s=await V(t,{prefix:e.ticketPrefix});if(!s){F.window.showErrorMessage("Operation cancelled: Ticket not provided.");return}let{ticketId:r,currentBranch:p}=s,n=await se(t,r);if(!await ie(t,n)){F.window.showErrorMessage(`Ricwiz: Main branch '${n}' does not exist! Prepare deploy is only available when a main ticket branch is used.`);return}let c=[];for(let l of o){let u=await se(t,r,l.name);await ie(t,u)&&c.push({env:l,branchName:u})}let a=c.length===0,d="";if(a){let l="";try{let{stdout:f}=await g(`git config branch.${n}.ricwiz-source`,{cwd:t});l=f.trim()}catch{}if(!l&&n.includes(r)&&n!==r){let f=n.split(r)[0].replace(/[-_]+$/,"");f&&(l=f)}l||(l=e.ticketSourceBranch||"main");let u=await F.window.showInputBox({prompt:`Ricwiz: Confirm or enter the Release branch in '${e.originRemote}' to merge into '${n}'`,placeHolder:"e.g. CRC-R19, main, release/v5.0",value:l,ignoreFocusOut:!0});if(u===void 0||!u.trim()){F.window.showInformationMessage("Ricwiz: Prepare deploy cancelled.");return}d=u.trim();try{await g(`git config branch.${n}.ricwiz-source "${d}"`,{cwd:t})}catch{}}let i=e.getConfig("defaultReviewers",""),m="";try{let{stdout:l}=await g(`git config branch.${r}.ricwiz-reviewers`,{cwd:t});m=l.trim()}catch{}if(i.trim()){let l=await F.window.showInputBox({prompt:"Ricwiz: Reviewers for this deploy (optional, comma-separated)",placeHolder:"e.g. @joao, 123456",value:m||i,ignoreFocusOut:!0});if(l===void 0)return;try{l.trim()?await g(`git config branch.${r}.ricwiz-reviewers "${l.trim()}"`,{cwd:t}):m&&await g(`git config --unset branch.${r}.ricwiz-reviewers`,{cwd:t})}catch{}}await F.window.withProgress({location:F.ProgressLocation.Notification,title:"Ricwiz: Preparing Deploy",cancellable:!0},async(l,u)=>{let f=0,h=p,v=!1;u.onCancellationRequested(()=>{v=!0});let k=async(w,y)=>{try{await g(`git merge ${w}`,{cwd:t})}catch(R){let D=!1;try{let{stdout:S}=await g("git ls-files -u",{cwd:t});S.trim().length>0&&(D=!0)}catch{}let M=((R.stdout||"")+(R.stderr||"")+(R.message||"")).toLowerCase();if(D||M.includes("conflict")||M.includes("conflit")){if(!await $e(t,w,y,l,u))throw v=!0,new Error("Deploy aborted by user.")}else throw R}};if(a)try{l.report({message:`Fetching ${d} from ${e.originRemote}...`,increment:15}),await g(`git fetch ${e.originRemote} ${d}`,{cwd:t}),l.report({message:`Switching to ${n}...`,increment:15}),await g(`git checkout ${n}`,{cwd:t});try{await g(`git pull ${e.originRemote} ${n}`,{cwd:t})}catch{}if(l.report({message:`Merging ${e.originRemote}/${d} into ${n}...`,increment:35}),await k(`${e.originRemote}/${d}`,n),v)return;l.report({message:`Pushing ${n} to ${e.originRemote}...`,increment:25}),await g(`git push ${e.originRemote} ${n}`,{cwd:t}),l.report({message:"Finishing up...",increment:10}),F.window.showInformationMessage(`Ricwiz: Release branch '${d}' merged into '${n}' and pushed to ${e.originRemote}! \u{1F680}`)}catch(w){w.message?.includes("aborted")?F.window.showInformationMessage("Ricwiz: Deploy cancelled."):F.window.showErrorMessage(`Ricwiz: Failed to prepare release ticket ${n}. Detail: ${w.message}`)}else{l.report({message:"Syncing remote information...",increment:10});try{await g("git fetch --all",{cwd:t});let y=10/(c.length||1);for(let R of c)try{if(v)throw new Error("Aborted");l.report({message:`Fetching ${R.env.sourceBranch}...`,increment:y});let D=e.getFetchRemote(R.env.sourceBranch),M=e.getFetchBranch(R.env.sourceBranch);await g(`git fetch ${D} ${M}:${M}`,{cwd:t})}catch{}}catch{}let w=60/(c.length||1);for(let y of c){if(v)break;let R=y.branchName,D=y.env.sourceBranch;try{l.report({message:`Processing ${R}...`,increment:w/4}),await g(`git checkout ${R}`,{cwd:t});try{await g(`git pull ${e.originRemote} ${R}`,{cwd:t})}catch{}l.report({message:`Merging ${D} into ${R}...`,increment:w/4});let M=e.getFetchRemote(D),S=e.getFetchBranch(D),U=e.buildUpstreamPath(D);if(await g(`git fetch ${M} ${S}`,{cwd:t}),await k(U,R),l.report({message:`Merging ${n} into ${R}...`,increment:w/4}),await k(n,R),v)break;l.report({message:`Pushing ${R}...`,increment:w/4}),await g(`git push ${e.originRemote} ${R}`,{cwd:t}),f++}catch(M){M.message.includes("aborted")?F.window.showInformationMessage("Ricwiz: Deploy cancelled."):F.window.showErrorMessage(`Ricwiz: Failed to process branch ${R}. Detail: ${M.message}`);return}}if(!v){l.report({message:"Finishing up...",increment:10});let y=h;try{await g(`git show-ref --verify --quiet refs/heads/${n}`,{cwd:t}),y=n}catch{}try{let R=await I(t);y&&y!==R?(await g(`git checkout ${y}`,{cwd:t}),F.window.showInformationMessage(`Ricwiz: Operation complete. Back on branch ${y}.`)):F.window.showInformationMessage("Ricwiz: Operation complete.")}catch{F.window.showInformationMessage("Ricwiz: Operation complete.")}}}})}var X=C(require("vscode"));async function Ft(t=!1){let e=z();if(!e)return;let o=await B.initialize(e);if(!o)return;let s=await V(e,{prefix:o.ticketPrefix,prompt:"Enter the full ticket ID for the Merge Requests (e.g., SFPSCA-1234) or just the number"});if(!s)return;let{ticketId:r}=s,p=o.getConfig("gitlabUrlOverride",""),n="";if(p&&p.trim()!=="")n=p.trim().replace(/\/+$/,"");else{let i="";try{let m=o.originRemote||"origin",{stdout:l}=await g(`git remote get-url ${m}`,{cwd:e});i=l.trim()}catch{X.window.showErrorMessage("Ricwiz: Could not get the remote origin URL. Please configure the URL manually in the extension settings.");return}n=i,n.endsWith(".git")&&(n=n.slice(0,-4)),n.startsWith("git@")?(n=n.replace("git@","").replace(":","/"),n=`https://${n}`):n.startsWith("ssh://git@")&&(n=n.replace("ssh://git@","https://"))}let c=[],a=await se(e,r),d=[];for(let i of o.environments){let m=await se(e,r,i.name);await ie(e,m)&&d.push({envName:i.name,source:m,target:i.sourceBranch})}if(d.length===0){let i="";try{if(a){let{stdout:u}=await g(`git config branch.${a}.ricwiz-source`,{cwd:e});u.trim()&&(i=u.trim())}}catch{}if(!i&&a.includes(r)&&a!==r){let u=a.split(r)[0].replace(/[-_]+$/,"");u&&(i=u)}i||(i=o.ticketSourceBranch||"main");let m=await X.window.showInputBox({prompt:`Ricwiz: Confirm or enter the Target Release branch in GitLab for '${a}'`,placeHolder:"e.g. CRC-R19, main, release/v5.0",value:i,ignoreFocusOut:!0});if(m===void 0||!m.trim()){X.window.showInformationMessage("Ricwiz: Merge request creation cancelled.");return}let l=m.trim();try{await g(`git config branch.${a}.ricwiz-source "${l}"`,{cwd:e})}catch{}c.push({source:a,target:l})}else for(let i of d)c.push({source:i.source,target:i.target});for(let i of c){let m=`${n}/-/merge_requests/new?merge_request[source_branch]=${encodeURIComponent(i.source)}&merge_request[target_branch]=${encodeURIComponent(i.target)}`;t?X.commands.executeCommand("simpleBrowser.show",m):X.env.openExternal(X.Uri.parse(m))}X.window.showInformationMessage(`Ricwiz: Opening ${c.length} Merge Request(s) in ${t?"VS Code browser":"external browser"}!`)}async function Ut(){return Ft(!1)}async function Ot(){return Ft(!0)}var ee=C(require("vscode"));async function Nt(t=!1){let e=z();if(!e)return;let o=ee.workspace.getConfiguration("ricwiz"),s=o.get("jiraUrl","");if(!s||s.trim()===""){ee.window.showErrorMessage("Ricwiz: Jira URL is not configured. Please set it in the extension settings (e.g., https://jira.company.com/browse/).");return}let r=await I(e),p=o.get("ticketPrefix","SFPSCA-"),n=le(r,p),a=me(r,n,!0);if(a)a=tt(a,n);else{let i=await V(e,{prompt:"Ricwiz could not detect the ticket from the branch name. Enter Jira ticket ID (e.g. SFPSCA-1234)",handleToSuffix:!0});if(!i)return;a=i.ticketId}let d=s.trim();d.endsWith("/")||(d+="/"),d+=a,t?ee.commands.executeCommand("simpleBrowser.show",d):ee.env.openExternal(ee.Uri.parse(d)),ee.window.showInformationMessage(`Ricwiz: Opening Jira Ticket ${a} in ${t?"VS Code":"browser"}!`)}async function jt(){return Nt(!1)}async function Wt(){return Nt(!0)}var _=C(require("vscode"));var Jt=C(require("https")),Gt=C(require("vscode"));async function Ht(){let t=Gt.workspace.getConfiguration("ricwiz"),e=t.get("jiraUrl",""),o=t.get("jiraEmail","")?.trim(),s=(await kt())?.trim();if(!e||!s)throw new Error('Jira API Token is not securely configured. Please run the "Ricwiz: Set Secure Jira API Token" command.');let r=e;r.includes("/browse")&&(r=r.split("/browse")[0]),r.endsWith("/")&&(r=r.slice(0,-1));let p=o?`Basic ${Buffer.from(`${o}:${s}`).toString("base64")}`:`Bearer ${s}`;return{baseUrl:r,headerAuth:p}}async function Ee(t,e,o){let{baseUrl:s,headerAuth:r}=await Ht(),p=new URL(`${s}${e}`);return new Promise((n,c)=>{let a=Jt.request(p,{method:t,headers:{Authorization:r,Accept:"application/json",...o?{"Content-Type":"application/json"}:{}}},d=>{let i="";d.on("data",m=>i+=m),d.on("end",()=>{if(d.statusCode===401||d.statusCode===403)return c(new Error(`Authentication failed (HTTP ${d.statusCode}). Please check your Jira settings.`));if(d.statusCode&&d.statusCode>=400){let m="";try{let l=JSON.parse(i);l.errorMessages&&l.errorMessages.length>0&&(m=l.errorMessages.join(", "))}catch{}return d.statusCode===404||d.statusCode===410?c(new Error(`Ticket not found or deleted (HTTP ${d.statusCode}). ${m}`)):c(new Error(`Jira API returned HTTP status ${d.statusCode}. ${m}`))}if(!i)return n({});try{let m=JSON.parse(i);n(m)}catch{c(new Error("Failed to parse Jira response."))}})});a.on("error",d=>c(new Error(`Network error: ${d.message}`))),o&&a.write(JSON.stringify(o)),a.end()})}async function Te(t){let{baseUrl:e}=await Ht(),o=await Ee("GET",`/rest/api/2/issue/${t}`);return o&&o.fields?{summary:o.fields.summary||"",description:o.fields.description||"No description provided.",status:o.fields.status?.name||"Unknown",url:`${e}/browse/${t}`}:null}async function qt(t){let e=await Ee("GET",`/rest/api/2/issue/${t}/transitions`);return e&&e.transitions?e.transitions.map(o=>({id:o.id,name:o.name})):[]}async function Vt(t,e){await Ee("POST",`/rest/api/2/issue/${t}/transitions`,{transition:{id:e}})}async function _t(t,e){await Ee("POST",`/rest/api/2/issue/${t}/comment`,{body:e})}async function Qt(t,e){await Ee("PUT",`/rest/api/2/issue/${t}`,{update:{labels:[{add:e}]}})}async function Yt(t){let e=await Ee("POST","/rest/api/3/search/jql",{jql:t,maxResults:50,fields:["summary","status","assignee"]});return e&&e.issues?e.issues.map(o=>({key:o.key,summary:o.fields?.summary||"No Title",status:o.fields?.status?.name||"Unknown",assignee:o.fields?.assignee?.displayName||"Unassigned"})):[]}async function Kt(t){let e=z();if(e)try{let o=await B.initialize(e);if(!o)return;let s=await I(e),r=le(s,o.ticketPrefix),p=me(s,r,!0);if(p||(p=s.split("-to-")[0]),!p){_.window.showErrorMessage("Ricwiz: You are not currently on a valid ticket branch.");return}await _.window.withProgress({location:_.ProgressLocation.Notification,title:`Fetching details for ${p}...`,cancellable:!1},async()=>{let n=await Te(p);if(n){let c=[];try{let a=o.environments||_.workspace.getConfiguration("ricwiz").get("environments",[{name:"Qual",sourceBranch:"quality"},{name:"Val",sourceBranch:"validation"},{name:"Prod",sourceBranch:"main"}]),d=await ze(e,p,"");c=await Re(e,d,p,a,o)}catch{}t.setJiraData({ticketId:p,relatedBranches:c,...n}),t.setPage("jira")}else _.window.showErrorMessage("Ricwiz: No data found for this ticket.")})}catch(o){o.message&&o.message.includes("securely configured")?await _.window.showErrorMessage(o.message,"Set Token Now")==="Set Token Now"&&_.commands.executeCommand("ricwiz.setJiraToken"):_.window.showErrorMessage(`Ricwiz Jira Error: ${o.message}`)}}var pe=C(require("vscode"));var Pe=0;async function Zt(t,e){let o=pe.workspace.getConfiguration("ricwiz"),s=o.get("jiraDashboards",[]);if(e!==void 0&&(Pe=e),!s||s.length===0){t.setDashboardData({queries:[],selectedIndex:0,results:[],error:"No queries defined in settings. Go to Settings > Ricwiz > Jira Dashboards."}),t.setPage("dashboard");return}Pe>=s.length&&(Pe=0);let r=s[Pe];t.setDashboardData({queries:s,selectedIndex:Pe,results:[],error:"\u23F3 Loading tickets..."}),t.setPage("dashboard");try{let p=await Yt(r.jql),n=z(),c=[],a=t.getDashboardShowBranches();if(n)try{let{stdout:i}=await g("git branch",{cwd:n});c=i.split(`
`).map(m=>m.replace("*","").trim()).filter(m=>m)}catch{}let d=[];if(a&&n)try{let i=await B.initialize(n,{skipPrompt:!0}),m=i?.environments||o.get("environments",[{name:"Qual",sourceBranch:"quality"},{name:"Val",sourceBranch:"validation"},{name:"Prod",sourceBranch:"main"}]);d=await Promise.all(p.map(async l=>{let u=await ze(n,l.key,""),f=await Re(n,u,l.key,m,i);return{...l,detailedBranches:f}}))}catch{d=p}else d=p.map(i=>{let m=c.find(l=>l.includes(i.key));return{...i,branch:m||null}});t.setDashboardData({queries:s,selectedIndex:Pe,results:d,error:null}),t.setPage("dashboard")}catch(p){let n=p.message;n&&(n.includes("ENOTFOUND")||n.includes("network"))&&(n="No Internet or Invalid URL"),t.setDashboardData({queries:s,selectedIndex:Pe,results:[],error:n}),t.setPage("dashboard")}}async function Xt(t,e){await pe.window.withProgress({location:pe.ProgressLocation.Notification,title:`Fetching details for ${e}...`,cancellable:!1},async()=>{try{let o=await Te(e);if(o){let s=[],r=z();if(r)try{let p=await B.initialize(r,{skipPrompt:!0}),n=p?.environments||pe.workspace.getConfiguration("ricwiz").get("environments",[{name:"Qual",sourceBranch:"quality"},{name:"Val",sourceBranch:"validation"},{name:"Prod",sourceBranch:"main"}]),c=await ze(r,e,"");s=await Re(r,c,e,n,p)}catch{}t.setJiraData({ticketId:e,relatedBranches:s,...o}),t.setPage("jira")}else pe.window.showErrorMessage(`Ricwiz: No data found for ticket ${e}.`)}catch(o){pe.window.showErrorMessage(`Ricwiz Jira Error: ${o.message}`)}})}var E=C(require("vscode"));async function ct(){let t=z();if(!t)return;let e=await B.initialize(t,{forcePrompt:!1});if(!e)return;let o=await I(t);if(!o)return;let s=le(o,e.ticketPrefix),r=me(o,s,!0);return r||o.split("-to-")[0]}function dt(t){t.message&&t.message.includes("securely configured")?E.window.showErrorMessage(t.message,"Set Token Now").then(e=>{e==="Set Token Now"&&E.commands.executeCommand("ricwiz.setJiraToken")}):E.window.showErrorMessage(`Ricwiz Jira Error: ${t.message}`)}async function eo(){try{let t=await ct();if(!t){E.window.showErrorMessage("Ricwiz: You are not on a valid ticket branch.");return}let e=await E.window.withProgress({location:E.ProgressLocation.Notification,title:`Fetching available status for ${t}...`,cancellable:!1},()=>qt(t));if(!e||e.length===0){E.window.showInformationMessage(`Ricwiz: No transitions available for ${t}.`);return}let o=e.map(r=>({label:r.name,id:r.id})),s=await E.window.showQuickPick(o,{placeHolder:`Select new status for ${t}`,ignoreFocusOut:!0});s&&(await E.window.withProgress({location:E.ProgressLocation.Notification,title:`Updating status to ${s.label}...`,cancellable:!1},()=>Vt(t,s.id)),E.window.showInformationMessage(`Ricwiz: Status for ${t} updated to ${s.label}.`))}catch(t){dt(t)}}async function to(){try{let t=await ct();if(!t){E.window.showErrorMessage("Ricwiz: You are not on a valid ticket branch.");return}let e=await E.window.showInputBox({prompt:`Add comment to ${t}`,placeHolder:"Type your comment here...",ignoreFocusOut:!0});e&&(await E.window.withProgress({location:E.ProgressLocation.Notification,title:`Adding comment to ${t}...`,cancellable:!1},()=>_t(t,e)),E.window.showInformationMessage(`Ricwiz: Comment added to ${t}.`))}catch(t){dt(t)}}async function oo(){try{let t=await ct();if(!t){E.window.showErrorMessage("Ricwiz: You are not on a valid ticket branch.");return}let e=await E.window.showInputBox({prompt:`Add a label to ${t}`,placeHolder:"e.g. Needs-Review, Bug, High-Priority",ignoreFocusOut:!0});e&&e.trim()&&(await E.window.withProgress({location:E.ProgressLocation.Notification,title:`Adding label to ${t}...`,cancellable:!1},()=>Qt(t,e.trim())),E.window.showInformationMessage(`Ricwiz: Label '${e.trim()}' added to ${t}.`))}catch(t){dt(t)}}async function io(){let t=await E.window.showInputBox({prompt:"Enter your Jira API Token (or Personal Access Token). It will be securely stored in your OS keychain.",password:!0,ignoreFocusOut:!0});if(t)try{await xt(t.trim()),E.window.showInformationMessage("Ricwiz: Jira API Token securely stored!")}catch(e){E.window.showErrorMessage(`Ricwiz: Failed to store token: ${e.message}`)}}var J=C(require("vscode")),ro=C(require("https"));async function no(){let t=await J.window.showInputBox({prompt:"Enter your GitLab Personal Access Token",placeHolder:"glpat-xxxxxxxxxxxxxxxxxxxx",ignoreFocusOut:!0,password:!0});if(t&&t.trim()){let e=t.trim();await J.window.withProgress({location:J.ProgressLocation.Notification,title:"Ricwiz: Validating GitLab Token...",cancellable:!1},async()=>{try{let s=J.workspace.getConfiguration("ricwiz").get("gitlabUrlOverride","").trim();if(!s&&J.workspace.workspaceFolders)try{let c=J.workspace.workspaceFolders[0].uri.fsPath,{stdout:a}=await g("git remote get-url origin",{cwd:c}),d=a.trim();d.startsWith("git@")&&(d=`https://${d.replace("git@","").replace(":","/")}`),d.endsWith(".git")&&(d=d.slice(0,-4)),s=d}catch{}s||(s="https://gitlab.com");let r=new URL(s),p=`${r.protocol}//${r.host}`,n=await new Promise((c,a)=>{let d=ro.request(new URL(`${p}/api/v4/user`),{method:"GET",timeout:5e3,headers:{"PRIVATE-TOKEN":e,Accept:"application/json"}},i=>{if(i.statusCode>=400)return a(new Error(`Status ${i.statusCode}`));let m="";i.on("data",l=>m+=l),i.on("end",()=>c(JSON.parse(m||"{}")))});d.on("error",a),d.on("timeout",()=>{d.destroy(),a(new Error("Timeout"))}),d.end()});await Ct(e),J.window.showInformationMessage(`Ricwiz: \u2705 GitLab API Token saved and validated successfully for ${n.username||"user"}!`),J.commands.executeCommand("ricwiz.manualRefresh")}catch(o){J.window.showErrorMessage(`Ricwiz: \u274C Invalid token or cannot reach GitLab (${o.message}). Please check the token and try again.`)}})}}var ue=C(require("vscode"));async function so(){let t=z();if(!t){ue.window.showErrorMessage("Ricwiz: Open a folder or workspace that is a Git repository.");return}let e=await B.initialize(t);if(!e)return;let o=await V(t,{prefix:e.ticketPrefix,prompt:"Enter the full ticket ID to sync all branches for (e.g., SCPSCA-1234) or just the number"});if(!o)return;let{ticketId:s,currentBranch:r}=o;await ue.window.withProgress({location:ue.ProgressLocation.Notification,title:`Ricwiz: Syncing all branches for ${s}...`,cancellable:!1},async p=>{try{p.report({message:"Fetching from remote..."});try{await g("git fetch --all",{cwd:t})}catch{}let{stdout:n}=await g(`git branch --list "*${s}*"`,{cwd:t}),c=new RegExp(`${s}(?!\\d)`,"i"),a=n.split(`
`).map(m=>m.replace("*","").trim()).filter(m=>m.length>0&&c.test(m));if(a.length===0){ue.window.showWarningMessage(`Ricwiz: No local branches found for ${s}.`);return}let d=0,i=0;for(let m of a)if(p.report({message:`Syncing ${m}...`}),m===r)try{await g(`git pull ${e.originRemote} ${m}`,{cwd:t}),d++}catch(l){let u=!1;try{let{stdout:h}=await g("git ls-files -u",{cwd:t});h.trim().length>0&&(u=!0)}catch{}let f=((l.stdout||"")+(l.stderr||"")+(l.message||"")).toLowerCase();(u||f.includes("conflict")||f.includes("conflit"))&&await $e(t,`${e.originRemote}/${m}`,m,p)?d++:i++}else try{await g(`git fetch ${e.originRemote} ${m}:${m}`,{cwd:t}),d++}catch{try{await g(`git checkout ${m}`,{cwd:t});try{await g(`git pull ${e.originRemote} ${m}`,{cwd:t}),d++}catch(u){let f=!1;try{let{stdout:v}=await g("git ls-files -u",{cwd:t});v.trim().length>0&&(f=!0)}catch{}let h=((u.stdout||"")+(u.stderr||"")+(u.message||"")).toLowerCase();(f||h.includes("conflict")||h.includes("conflit"))&&await $e(t,`${e.originRemote}/${m}`,m,p)?d++:i++}await g(`git checkout ${r}`,{cwd:t})}catch{try{await g(`git checkout ${r}`,{cwd:t})}catch{}i++}}i>0?ue.window.showWarningMessage(`Ricwiz: Synced ${d}/${a.length} branches. ${i} branch(es) could not be synced (possible conflicts or diverged history).`):ue.window.showInformationMessage(`Ricwiz: \u{1F504} All ${d} branches for ${s} are up to date!`)}catch(n){ue.window.showErrorMessage(`Ricwiz: Sync failed: ${n.message}`)}})}var ge=C(require("vscode"));async function ao(){let t=z();if(!t){ge.window.showErrorMessage("Ricwiz: Open a folder or workspace that is a Git repository.");return}try{await g("git status",{cwd:t})}catch{ge.window.showErrorMessage("Ricwiz: The opened folder does not appear to be a valid Git repository.");return}let e=await B.initialize(t);if(!e)return;let o=e.environments,s=await V(t,{prefix:e.ticketPrefix});if(!s)return;let{ticketId:r,currentBranch:p}=s;await ge.window.withProgress({location:ge.ProgressLocation.Notification,title:"Ricwiz: Updating environment branches from their bases",cancellable:!0},async(n,c)=>{let a=0,d=p,i=!1;c.onCancellationRequested(()=>{i=!0}),n.report({message:"Syncing remote information...",increment:10});try{await g("git fetch --all",{cwd:t})}catch{}let m=80/(o.length||1);for(let l of o){if(i)break;let u=await se(t,r,l.name),f=l.sourceBranch;if(await ie(t,u))try{n.report({message:`Processing ${u}...`,increment:m/2}),await g(`git checkout ${u}`,{cwd:t});try{n.report({message:`Merging ${f} into ${u}...`,increment:m/2});let h=e.getFetchRemote(f),v=e.getFetchBranch(f),k=e.buildUpstreamPath(f);await g(`git fetch ${h} ${v}`,{cwd:t}),await g(`git merge ${k}`,{cwd:t})}catch(h){let v=!1;try{let{stdout:w}=await g("git ls-files -u",{cwd:t});w.trim().length>0&&(v=!0)}catch{}let k=((h.stdout||"")+(h.stderr||"")+(h.message||"")).toLowerCase();if(v||k.includes("conflict")||k.includes("conflit")){let w=e.buildUpstreamPath(f);if(!await $e(t,w,u,n,c))throw i=!0,new Error("Update aborted by user.")}else throw h}if(i)break;a++}catch(h){h.message.includes("aborted")?ge.window.showInformationMessage("Ricwiz: Update cancelled."):ge.window.showErrorMessage(`Ricwiz: Failed to update branch ${u}. Detail: ${h.message}`);return}}if(!i){n.report({message:"Finishing up...",increment:10});try{let l=await I(t);d&&d!==l&&await g(`git checkout ${d}`,{cwd:t})}catch{}ge.window.showInformationMessage(`Ricwiz: Successfully updated ${a} environment branches from their bases!`)}})}var O=C(require("vscode"));async function co(){let t=z();if(!t){O.window.showErrorMessage("Ricwiz: Open a folder or workspace that is a Git repository.");return}let e=await I(t),o=O.workspace.getConfiguration("ricwiz");await O.window.withProgress({location:O.ProgressLocation.Notification,title:"Ricwiz: Scanning for unused local branches...",cancellable:!1},async()=>{try{await g("git fetch --prune",{cwd:t})}catch{}let s=[];try{let{stdout:m}=await g('git branch --format="%(refname:short)"',{cwd:t});s=m.split(`
`).map(l=>l.trim()).filter(l=>l.length>0)}catch{}if(s.length===0){O.window.showInformationMessage("Ricwiz: No local branches found.");return}let r=[];try{let{stdout:m}=await g('git branch -r --format="%(refname:short)"',{cwd:t});r=m.split(`
`).map(l=>l.trim().replace(/^[^/]+\//,"")).filter(l=>l.length>0&&!l.includes("HEAD"))}catch{}let p=[];try{let{stdout:m}=await g('git for-each-ref --format="%(refname:short)|||%(upstream:track)" refs/heads/',{cwd:t});p=m.split(`
`).filter(l=>l.includes("[gone]")).map(l=>l.split("|||")[0].trim())}catch{}let n=s.filter(m=>!r.includes(m));if(n.length===0){O.window.showInformationMessage("Ricwiz: Your local repository is totally clean! All local branches exist on the remote.");return}let c=n.map(m=>{let l=p.includes(m),u=m===e,f="Not found on remote";return l&&(f="Deleted on remote [gone]"),u&&(f+=" (Current branch - will checkout main first)"),{label:m,description:f,picked:l&&!u}}),a=await O.window.showQuickPick(c,{canPickMany:!0,placeHolder:"Select local branches to delete",title:"Ricwiz: Delete Unused Branches"});if(!a||a.length===0){O.window.showInformationMessage("Ricwiz: No branches selected for deletion.");return}if(await O.window.showWarningMessage(`Ricwiz: Delete ${a.length} local branch(es)?
This cannot be undone!`,{modal:!0},"Yes, delete them")!=="Yes, delete them"){O.window.showInformationMessage("Ricwiz: Deletion cancelled.");return}let i=0;for(let m of a){let l=m.label;if(l===e){let u=o.get("ticketSourceBranch","main");try{await g(`git checkout ${u}`,{cwd:t}),e=u}catch{O.window.showWarningMessage(`Ricwiz: Could not switch away from ${l}. Skipping.`);continue}}try{await g(`git branch -D ${l}`,{cwd:t}),i++}catch{O.window.showWarningMessage(`Ricwiz: Could not delete local branch ${l}.`)}}O.window.showInformationMessage(`Ricwiz: \u{1F5D1}\uFE0F Cleaned up ${i} unused local branch(es).`)})}var te=C(require("vscode"));async function Me(t){let e=z();e&&await te.window.withProgress({location:te.ProgressLocation.Notification,title:`Ricwiz: Switching to ${t}...`,cancellable:!1},async()=>{try{let o=await I(e),s=!1;try{let{stdout:p}=await g("git status --porcelain",{cwd:e});s=p.trim().length>0}catch{}if(s&&o)try{await g(`git stash push --include-untracked -m "ricwiz-auto:${o}"`,{cwd:e}),te.window.showInformationMessage(`Ricwiz: \u{1F4E6} Stashed changes from ${o}`)}catch{te.window.showWarningMessage("Ricwiz: Could not stash changes. Checkout may fail if there are conflicts.")}let r=t;t.includes("/")&&(r=t.split("/").slice(1).join("/"));try{await g(`git checkout ${r}`,{cwd:e})}catch{let n="";if(t.includes("/"))n=t.split("/")[0];else{let{stdout:c}=await g("git branch -r",{cwd:e}),a=c.split(`
`).map(i=>i.trim()).filter(i=>i),d=[];for(let i of a){let m=i.split(" ")[0];m.endsWith(`/${r}`)&&d.push(m.substring(0,m.lastIndexOf("/")))}if(d.length===0){te.window.showErrorMessage(`Ricwiz: A branch "${r}" n\xE3o existe localmente nem em nenhuma remote!`);return}else if(d.length===1)n=d[0];else{let i=await B.initialize(e);d.includes("origin")?n="origin":i&&d.includes(i.upstreamRemote)?n=i.upstreamRemote:n=d[0]}}try{await g(`git fetch ${n} ${r}`,{cwd:e}),await g(`git checkout -b ${r} --track ${n}/${r}`,{cwd:e})}catch{te.window.showErrorMessage(`Ricwiz: Encontrou na remote ${n} mas falhou a fazer checkout.`);return}}try{let{stdout:p}=await g("git stash list",{cwd:e}),n=p.split(`
`);for(let c=0;c<n.length;c++)if(n[c].includes(`ricwiz-auto:${r}`)){let a=n[c].match(/stash@\{(\d+)\}/);a&&(await g(`git stash pop stash@{${a[1]}}`,{cwd:e}),te.window.showInformationMessage(`Ricwiz: \u{1F4E6} Restored stashed changes on ${r}`));break}}catch{te.window.showWarningMessage(`Ricwiz: Could not restore stashed changes on ${r}. You may need to resolve conflicts manually (check git stash list).`)}}catch{te.window.showErrorMessage(`Ricwiz: Could not checkout branch ${t}.`)}})}var Ue=C(require("vscode"));async function lo(){let t=z();if(t)try{let{stdout:e}=await g("git branch --show-current",{cwd:t}),o=e.trim();o&&(await Ue.env.clipboard.writeText(o),Ue.window.showInformationMessage(`Ricwiz: \u{1F4CB} Copied "${o}" to clipboard`))}catch{Ue.window.showErrorMessage("Ricwiz: Could not get the current branch name.")}}var Q=C(require("vscode")),Ke=C(require("path")),mo=C(require("fs"));async function po(){let t=z();if(!t){Q.window.showErrorMessage("Ricwiz: Open a folder or workspace that is a Git repository.");return}let e=await B.initialize(t,{skipPrompt:!0}),o=Q.workspace.getConfiguration("ricwiz"),s=e?.ticketSourceBranch||o.get("ticketSourceBranch","main"),r=e?.originRemote||"origin",n=o.get("packageXmlCommand",'sf sgd source delta --to "HEAD" --from "{originRemote}/{baseBranch}" --output-dir "."').replace("origin/{baseBranch}","{originRemote}/{baseBranch}").replace(/{originRemote}/g,r).replace(/{baseBranch}/g,s);await Q.window.showWarningMessage("Are you sure you want to generate the package.xml? This may overwrite existing local manifest files.",{modal:!0},"Yes, Generate")==="Yes, Generate"&&await Q.window.withProgress({location:Q.ProgressLocation.Notification,title:"Ricwiz: Generating package.xml using Salesforce CLI...",cancellable:!1},async()=>{try{await g(n,{cwd:t,maxBuffer:10*1024*1024}),Q.window.showInformationMessage("Ricwiz: Successfully generated package.xml!");let a=Ke.join(t,"package","package.xml"),d=Ke.join(t,"package.xml"),i=Ke.join(t,"manifest","package.xml");for(let m of[a,d,i])if(mo.existsSync(m)){let l=await Q.workspace.openTextDocument(m);await Q.window.showTextDocument(l);break}}catch(a){Q.window.showErrorMessage(`Ricwiz: Error running sf command - ${a.message}`)}})}var Y=C(require("vscode"));async function uo(){let t=z();if(!t){Y.window.showErrorMessage("Ricwiz: Open a folder or workspace that is a Git repository.");return}let o=Y.workspace.getConfiguration("ricwiz").get("deployCommand","sf project deploy start --manifest package/package.xml --post-destructive-changes destructiveChanges/destructiveChanges.xml -c -l NoTestRun -g");await Y.window.showWarningMessage("Are you sure you want to deploy to Salesforce? This action modifies your org and cannot be easily undone.",{modal:!0},"Yes, Deploy")==="Yes, Deploy"&&await Y.window.withProgress({location:Y.ProgressLocation.Notification,title:"Ricwiz: Deploying package...",cancellable:!1},async()=>{try{let{stdout:r,stderr:p}=await g(o,{cwd:t,maxBuffer:52428800}),n=Y.window.createOutputChannel("Ricwiz Deploy");n.appendLine(`Executing: ${o}`),n.appendLine(r),p&&(n.appendLine("--- STDERR ---"),n.appendLine(p)),n.show(),Y.window.showInformationMessage("Ricwiz: Successfully ran deploy command!")}catch(r){let p=Y.window.createOutputChannel("Ricwiz Deploy");p.appendLine(`Error executing: ${o}`),r.stdout&&p.appendLine(r.stdout),r.stderr&&p.appendLine(r.stderr),p.appendLine(r.message),p.show(),Y.window.showErrorMessage("Ricwiz: Error running deploy command. See output channel for details.")}})}var K=C(require("vscode"));async function go(){let t=z();if(!t){K.window.showErrorMessage("Ricwiz: Open a folder or workspace that is a Git repository.");return}let o=K.workspace.getConfiguration("ricwiz").get("importDataCommand","sfdx force:data:tree:import --plan data/plan.json");await K.window.showWarningMessage("Are you sure you want to import data into Salesforce? This action modifies records in your org.",{modal:!0},"Yes, Import")==="Yes, Import"&&await K.window.withProgress({location:K.ProgressLocation.Notification,title:"Ricwiz: Importing data...",cancellable:!1},async()=>{try{let{stdout:r,stderr:p}=await g(o,{cwd:t,maxBuffer:52428800}),n=K.window.createOutputChannel("Ricwiz Import Data");n.appendLine(`Executing: ${o}`),n.appendLine(r),p&&(n.appendLine("--- STDERR ---"),n.appendLine(p)),n.show(),K.window.showInformationMessage("Ricwiz: Successfully ran import data command!")}catch(r){let p=K.window.createOutputChannel("Ricwiz Import Data");p.appendLine(`Error executing: ${o}`),r.stdout&&p.appendLine(r.stdout),r.stderr&&p.appendLine(r.stderr),p.appendLine(r.message),p.show(),K.window.showErrorMessage("Ricwiz: Error running import data command. See output channel for details.")}})}var G=C(require("vscode"));async function fo(){let t=z();if(!t){G.window.showErrorMessage("Ricwiz: Open a folder or workspace that is a Git repository.");return}let e=await B.initialize(t,{skipPrompt:!0}),o=e?e.ticketSourceBranch:G.workspace.getConfiguration("ricwiz").get("ticketSourceBranch","main"),s=e?e.originRemote:"origin",r="";try{r=await I(t)}catch{}let p=await G.window.showInputBox({prompt:`Enter the branch name to list modified files (compared to ${o})`,value:r,placeHolder:"SFPSCA-1234"});if(!p)return;let n=xe(p);await G.window.withProgress({location:G.ProgressLocation.Notification,title:`Ricwiz: Finding files for ${n}...`,cancellable:!1},async()=>{try{let c=e?e.ticketPrefix:G.workspace.getConfiguration("ricwiz").get("ticketPrefix","SFPSC-"),a=le(n,c),d=me(n,a,!0)||n.replace(/-to-[a-zA-Z0-9]+$/i,""),i=await se(t,d);$.appendLine(`[ListTicketFiles] targetBranch (raw): ${n}, resolvedTargetBranch: ${i}, ticketId: ${d}, originRemote: ${s}, sourceBranch: ${o}`);let m=[];try{let y="";try{$.appendLine(`[ListTicketFiles] Running: git merge-base ${s}/${o} ${i}`);let{stdout:R}=await g(`git merge-base ${s}/${o} ${i}`,{cwd:t});y=R.trim()}catch(R){$.appendLine(`[ListTicketFiles] First merge-base failed: ${R.message}`);try{$.appendLine(`[ListTicketFiles] Running: git merge-base ${o} ${i}`);let{stdout:D}=await g(`git merge-base ${o} ${i}`,{cwd:t});y=D.trim()}catch(D){$.appendLine(`[ListTicketFiles] Second merge-base failed: ${D.message}`),$.appendLine(`[ListTicketFiles] Running: git merge-base ${s}/${o} ${s}/${i}`);let{stdout:M}=await g(`git merge-base ${s}/${o} ${s}/${i}`,{cwd:t});y=M.trim(),i=`${s}/${i}`}}if(y){$.appendLine(`[ListTicketFiles] Merge base found: ${y}. Running git diff...`);let R=i===r||n===r,D=R?"":` ${i}`,{stdout:M}=await g(`git diff --name-only ${y}${D}`,{cwd:t,maxBuffer:10*1024*1024});if(m=M.split(`
`).map(S=>S.trim()).filter(S=>S.length>0),R)try{let{stdout:S}=await g("git ls-files --others --exclude-standard",{cwd:t,maxBuffer:10485760}),U=S.split(`
`).map(j=>j.trim()).filter(j=>j.length>0);m=[...m,...U],$.appendLine(`[ListTicketFiles] Found ${U.length} untracked files.`)}catch(S){$.appendLine(`[ListTicketFiles] Failed to get untracked files: ${S.message}`)}$.appendLine(`[ListTicketFiles] diff found ${m.length} files total.`)}}catch(y){$.appendLine(`[ListTicketFiles] Diff strategy failed: ${y.message}`)}let l=[];try{$.appendLine(`[ListTicketFiles] Running git log fallback for ticketId: ${d}`);let{stdout:y}=await g(`git --no-pager log --grep="\\b${d}\\b" -i -E --name-only -m --first-parent --format=""`,{cwd:t,maxBuffer:10*1024*1024});l=y.split(`
`).map(R=>R.trim()).filter(R=>R.length>0),$.appendLine(`[ListTicketFiles] git log found ${l.length} files.`)}catch(y){$.appendLine(`[ListTicketFiles] Git log fallback failed: ${y.message}`)}let u=[...m,...l];if(u.length===0){G.window.showInformationMessage(`Ricwiz: No modified files found for ${n}.`);return}let f=Array.from(new Set(u)).sort(),h={};for(let y of f){let R=y.match(/default\/([^/]+)/),D=R&&R[1]?R[1].toUpperCase():"OUTROS";h[D]||(h[D]=[]),h[D].push(y)}let v=`Files modified in branch ${n}:
`,k=Object.keys(h).sort();for(let y of k)v+=`
=== ${y} ===
`,v+=h[y].join(`
`)+`
`;let w=await G.workspace.openTextDocument({content:v,language:"plaintext"});await G.window.showTextDocument(w)}catch(c){G.window.showErrorMessage(`Ricwiz: Error running git log - ${c.message}`)}})}var oe=C(require("vscode"));async function ho(){let t=z();if(!t){oe.window.showErrorMessage("Ricwiz: Open a folder or workspace that is a Git repository.");return}let o=oe.workspace.getConfiguration("ricwiz").get("resetTrackingCommand","sf org disable tracking && sf project reset tracking --no-prompt");await oe.window.withProgress({location:oe.ProgressLocation.Notification,title:"Ricwiz: Resetting tracking...",cancellable:!1},async()=>{try{let{stdout:s,stderr:r}=await g(o,{cwd:t,maxBuffer:52428800}),p=oe.window.createOutputChannel("Ricwiz Reset Tracking");p.appendLine(`Executing: ${o}`),p.appendLine(s),r&&(p.appendLine("--- STDERR ---"),p.appendLine(r)),p.show(),oe.window.showInformationMessage("Ricwiz: Successfully reset tracking!")}catch(s){let r=oe.window.createOutputChannel("Ricwiz Reset Tracking");r.appendLine(`Error executing: ${o}`),s.stdout&&r.appendLine(s.stdout),s.stderr&&r.appendLine(s.stderr),r.appendLine(s.message),r.show(),oe.window.showErrorMessage("Ricwiz: Error resetting tracking. See output channel for details.")}})}var Z=C(require("vscode"));async function wo(){let t=z();if(!t){Z.window.showErrorMessage("Ricwiz: Open a workspace first.");return}let e=["ApexClass","ApexTrigger","CustomObject","CustomField","LightningComponentBundle","AuraDefinitionBundle","Flow","CustomLabel","CustomMetadata","StaticResource","Profile","PermissionSet","PermissionSetGroup","Layout","ValidationRule","RecordType","ListView","Report","EmailTemplate","Other (Type manually)..."],o=await Z.window.showQuickPick(e,{placeHolder:"Select Metadata Type to extract (e.g., ApexClass)",ignoreFocusOut:!0});if(!o||o==="Other (Type manually)..."&&(o=await Z.window.showInputBox({prompt:"Enter Metadata Type (e.g., CustomApplication, Queue)",ignoreFocusOut:!0}),!o))return;let s={ApexClass:"**/*.cls",ApexTrigger:"**/*.trigger",CustomObject:"**/*.{object,object-meta.xml}",CustomField:"**/*.field-meta.xml",LightningComponentBundle:"**/lwc/*/*.js",AuraDefinitionBundle:"**/aura/*/*.cmp",Flow:"**/*.flow-meta.xml",CustomLabel:"**/*.labels-meta.xml",CustomMetadata:"**/*.md-meta.xml",StaticResource:"**/*.resource-meta.xml",Profile:"**/*.profile-meta.xml",PermissionSet:"**/*.permissionset-meta.xml",PermissionSetGroup:"**/*.permissionsetgroup-meta.xml",Layout:"**/*.layout-meta.xml",ValidationRule:"**/*.validationRule-meta.xml",RecordType:"**/*.recordType-meta.xml",ListView:"**/*.listView-meta.xml"},r=[],p=s[o];if(p)try{r=(await Z.workspace.findFiles(p,"**/node_modules/**")).map(a=>{let d=a.fsPath.split(/[\\/]/).pop()||"";if(o==="LightningComponentBundle"||o==="AuraDefinitionBundle"){let i=a.fsPath.split(/[\\/]/);return i[i.length-2]||d.split(".")[0]}return d.split(".")[0]}),r=[...new Set(r)].sort()}catch{}let n=await new Promise(c=>{let a=Z.window.createQuickPick();a.title=`Extract ${o}`,a.placeholder="Type name (e.g. MyComponent) or * for all",a.ignoreFocusOut=!0,a.matchOnDescription=!0;let d=()=>{let i=a.value.trim(),m=[];i?m.push({label:`$(cloud-download) Extract "${i}"`,description:"Extract exact name from Salesforce",alwaysShow:!0}):m.push({label:'$(cloud-download) Extract "*" (All)',description:`Extract all ${o}s`,alwaysShow:!0}),r.forEach(l=>{(!i||l.toLowerCase().includes(i.toLowerCase()))&&m.push({label:l,description:"Local workspace component"})}),a.items=m};a.onDidChangeValue(()=>d()),a.onDidAccept(()=>{let i=a.selectedItems[0];if(i){let m=i.label;m.startsWith('$(cloud-download) Extract "')?m=m.replace('$(cloud-download) Extract "',"").replace('" (All)',"").replace('"',""):m==='$(cloud-download) Extract "*" (All)'&&(m="*"),a.hide(),c(m)}}),a.onDidHide(()=>{a.dispose(),c(void 0)}),d(),a.show()});n&&await Z.window.withProgress({location:Z.ProgressLocation.Notification,title:`Ricwiz: Extracting ${o}:${n} from Salesforce...`,cancellable:!0},async(c,a)=>{try{$.show(!0);let d=`${o}:${n}`,{stdout:i,stderr:m}=await g(`sf project retrieve start -m "${d}"`,{cwd:t});i&&$.appendLine(i),m&&$.appendLine(m),Z.window.showInformationMessage(`Ricwiz: Successfully extracted ${d}.`)}catch(d){$.appendLine(`ERROR: ${d.message}`),d.stdout&&$.appendLine(d.stdout),d.stderr&&$.appendLine(d.stderr),Z.window.showErrorMessage("Ricwiz: Extraction failed. See Output channel for details.")}})}var N=C(require("vscode")),vo=C(require("path"));async function bo(){let t=N.window.activeTextEditor;if(!t){N.window.showErrorMessage("Ricwiz: Please open the file you want to deploy in the editor first.");return}let e=t.document.uri.fsPath,o=z();if(!o)return;let s="";if(await N.window.withProgress({location:N.ProgressLocation.Notification,title:"Ricwiz: Fetching available Salesforce orgs...",cancellable:!1},async()=>{try{let{stdout:a}=await g("sf org list --json",{cwd:o});s=a}catch(a){s=a.stdout||""}}),!s){N.window.showErrorMessage("Ricwiz: Failed to fetch orgs. Is Salesforce CLI installed?");return}let r=[];try{let a=JSON.parse(s),d=a.result?.nonScratchOrgs||[],i=a.result?.scratchOrgs||[];r=[...d,...i]}catch{N.window.showErrorMessage("Ricwiz: Failed to parse org list.");return}if(r.length===0){N.window.showInformationMessage("Ricwiz: No authenticated orgs found.");return}let p=r.map(a=>({label:a.alias||a.username,description:a.alias?a.username:"",picked:a.isDefaultUsername})),n=await N.window.showQuickPick(p,{placeHolder:"Select the org(s) to deploy this file to",canPickMany:!0,ignoreFocusOut:!0});if(!n||n.length===0)return;let c=vo.basename(e);await N.window.withProgress({location:N.ProgressLocation.Notification,title:`Ricwiz: Deploying ${c} to ${n.length} org(s)...`,cancellable:!1},async()=>{$.show(!0),$.appendLine(`--- Starting Parallel Deploy of ${c} ---`);let a=n.map(async l=>{let u=l.label;$.appendLine(`[${u}] Deploying...`);try{let{stdout:f,stderr:h}=await g(`sf project deploy start -d "${e}" -o "${u}"`,{cwd:o});return $.appendLine(`[${u}] \u2705 Success`),f&&$.appendLine(f),{org:u,success:!0}}catch(f){return $.appendLine(`[${u}] \u274C Failed`),f.stdout&&$.appendLine(f.stdout),f.stderr&&$.appendLine(f.stderr),{org:u,success:!1}}}),d=await Promise.all(a),i=d.filter(l=>l.success).length,m=d.filter(l=>!l.success).length;m===0?N.window.showInformationMessage(`Ricwiz: Successfully deployed to all ${i} orgs!`):N.window.showErrorMessage(`Ricwiz: Deploy finished with errors (${i} success, ${m} failed). Check Output channel.`)})}var A=C(require("vscode")),Ze=C(require("fs")),Xe=C(require("path"));async function yo(){let t=z();if(!t){A.window.showErrorMessage("Ricwiz: Open a folder or workspace that is a Git repository.");return}let e=A.workspace.getConfiguration("ricwiz"),o=e.get("auditUsername",""),s=e.get("auditHours",8),r=await A.window.showInputBox({prompt:"Enter your Salesforce Username to query in SetupAuditTrail",value:o,placeHolder:"admin@tuaorg.com"});if(!r)return;r=xe(r);let p=await A.window.showInputBox({prompt:"How many hours back do you want to search?",value:s.toString(),placeHolder:"8"});if(!p)return;let n=parseFloat(p);if(isNaN(n)||n<=0){A.window.showErrorMessage("Ricwiz: Invalid hours specified.");return}let c=new Date(Date.now()-n*60*60*1e3).toISOString(),d=`sf data query -q "${`SELECT Action, Display, Section FROM SetupAuditTrail WHERE CreatedBy.Username = '${r}' AND CreatedDate >= ${c}`}" --json`;await A.window.withProgress({location:A.ProgressLocation.Notification,title:"Ricwiz: Interrogating Setup Audit Trail...",cancellable:!1},async()=>{try{let{stdout:i}=await g(d,{cwd:t,maxBuffer:52428800}),m=JSON.parse(i);if(!m.result||m.result.records.length===0){A.window.showInformationMessage(`Ricwiz: No changes found for ${r} in the last ${n} hours.`);return}let l=m.result.records,u=[],f=new Set;for(let S of l){let U=No(S.Action,S.Display,S.Section);if(U){let j=`${U.isDelete?"DEL":"ADD"}-${U.metadataFormat}`;if(!f.has(j)){f.add(j);let ce=U.isDelete?"$(trash)":"$(plus)";u.push({label:`${ce} ${U.metadataFormat}`,description:`${S.Action} -> ${S.Display}`,metadataFormat:U.metadataFormat,isDelete:U.isDelete})}}}if(u.length===0){A.window.showInformationMessage(`Ricwiz: No extractable metadata changes found for ${r} in the last ${n} hours (ignored passwords/logins).`);return}let h=await A.window.showQuickPick(u,{canPickMany:!0,placeHolder:"Select the changes you want to extract to GitLab",ignoreFocusOut:!0});if(!h||h.length===0){A.window.showInformationMessage("Ricwiz: No changes selected.");return}let v=h.filter(S=>S.isDelete),k=h.filter(S=>!S.isDelete),w=A.window.createOutputChannel("Ricwiz Admin Bridge");if(w.show(),v.length>0){let{stdout:S}=await g("git ls-files",{cwd:t}),U=S.split(`
`).map(ce=>ce.trim()),j=0;for(let ce of v){let Le=ce.metadataFormat.split(":"),We=Le[0],Je=Le[1],be=Je;We==="CustomField"&&(be=Je.split(".")[1]);let et=U.filter(Se=>{let L=Xe.basename(Se);return L.startsWith(be+".")&&L.includes(We==="CustomField"?".field":"")});for(let Se of et){let L=Xe.join(t,Se);Ze.existsSync(L)&&(Ze.unlinkSync(L),w.appendLine(`Deleted local file: ${Se}`),j++)}}A.window.showInformationMessage(`Ricwiz: Deleted ${j} local files from Git workspace.`)}if(k.length===0)return;let y=k.map(S=>S.metadataFormat).filter(S=>S!=="").join(", "),R=await A.window.showInputBox({prompt:"Review and adjust the metadata components to retrieve",value:y,ignoreFocusOut:!0});if(!R)return;let D=`sf project retrieve start -m "${R}"`;w.appendLine(`Executing: ${D}`),A.window.showInformationMessage(`Ricwiz: Extracting ${k.length} components...`);let M=await g(D,{cwd:t});w.appendLine(M.stdout),M.stderr&&(w.appendLine("--- STDERR ---"),w.appendLine(M.stderr)),A.window.showInformationMessage("Ricwiz: Changes extracted successfully! Ready for Git Commit.")}catch(i){A.window.showErrorMessage(`Ricwiz: Error capturing changes - ${i.message}`)}})}function No(t,e,o){if(!t||!e||!o)return null;let s=t.toLowerCase(),r=o.toLowerCase();if(["security controls","network access","session settings","data export","login history","password policies","identity verification","delegated administration"].includes(r)||s.includes("login")||s.includes("password")||s.includes("oauth")||s.includes("session"))return null;let n=s.includes("delete"),c=null;if(s==="permissionsetgroupcomponentadd"||s==="permissionsetgroupcomponentdelete")return null;let a=(d,i=!1)=>{let m=d.replace(/\(.*\)/g,"").trim();m.includes(":")&&!s.includes("calculation")&&(m=m.split(":")[0]);let l=["disabled","deleted","removed","created","changed","updated","from","to","on","assigned","assign","assignment","permission","set","group","apex","class","trigger","custom","field","object","layout","validation","rule","flow","profile"],u=m.split(/\s+/);if(i){for(;u.length>0&&l.includes(u[u.length-1].toLowerCase());)u.pop();for(;u.length>0&&l.includes(u[0].toLowerCase());)u.shift();return u.join(" ").trim().replace(/[^a-zA-Z0-9_ ]/g,"")}else return u.filter(v=>!l.includes(v.toLowerCase())).join("_").replace(/[^a-zA-Z0-9_]/g,"")||m.replace(/\s+/g,"")};if(s.includes("profile"))c=`Profile:${a(e,!0)}`;else if(s.includes("permissionsetgroupcalculation")){let d=e.split(":");c=`PermissionSetGroup:${d.length>1?d[d.length-1].trim():a(e,!1)}`}else if(s.includes("permission set group")||s.includes("permissionsetgroup"))c=`PermissionSetGroup:${a(e,!1)}`;else if(s.includes("permission set")||s.includes("permissionset"))c=`PermissionSet:${a(e,!1)}`;else if(s.includes("apexclass"))c=`ApexClass:${a(e,!1)}`;else if(s.includes("apextrigger")||s.includes("apex trigger"))c=`ApexTrigger:${a(e,!1)}`;else if(s.includes("customfield")){let d=e.match(/([A-Za-z0-9_]+__c)/),i=e.match(/(?:on|na|for)\s+([A-Za-z0-9_]+)/i);d&&i?c=`CustomField:${i[1]}.${d[1]}`:c=`CustomField:${a(e,!1)}`}else if(s.includes("layout"))c=`Layout:${a(e,!0)}`;else if(s.includes("validation"))c=`ValidationRule:${a(e,!1)}`;else if(s.includes("flow"))c=`Flow:${a(e,!1)}`;else if(s.includes("customobject")){let d=e.match(/([A-Za-z0-9_]+__c)/);c=d?`CustomObject:${d[1]}`:`CustomObject:${a(e,!1)}`}else if(!s.includes("created")&&!s.includes("changed")&&!s.includes("deleted"))return null;return c?{metadataFormat:c,isDelete:n}:null}var lt=C(require("vscode"));async function xo(){let t=z();if(t)try{let{stdout:e}=await g('git for-each-ref --sort=-committerdate --format="%(refname:short)|||%(committerdate:relative)|||%(subject)" refs/heads/',{cwd:t}),o=e.split(`
`).filter(r=>r.trim()).map(r=>{let p=r.split("|||");return{label:`$(git-branch) ${p[0]}`,description:p[1],detail:p[2],branchName:p[0]}}),s=await lt.window.showQuickPick(o,{placeHolder:"Select a branch from history to checkout",matchOnDescription:!0,matchOnDetail:!0});s&&await Me(s.branchName)}catch{lt.window.showErrorMessage("Ricwiz: Failed to get branch history")}}var Oe=C(require("vscode"));async function ko(){let t=z();if(!t)return;let e=await Oe.window.showInputBox({prompt:"Enter ticket number or name (e.g., 48934)",placeHolder:"48934"});if(!e)return;let o=xe(e);try{let{stdout:s}=await g(`git branch --list "*${o}*"`,{cwd:t}),r=s.split(`
`).map(c=>c.replace("*","").trim()).filter(c=>c);if(r.length===0){Oe.window.showInformationMessage(`Ricwiz: No branches found matching "${e}"`);return}let p=r.map(c=>({label:`$(git-branch) ${c}`,branchName:c})),n=await Oe.window.showQuickPick(p,{placeHolder:`Select a branch for ${e}`});n&&await Me(n.branchName)}catch{Oe.window.showErrorMessage("Ricwiz: Failed to search branches")}}var Be=C(require("vscode")),Co=C(require("path"));async function $o(){let t=Be.window.activeTextEditor;if(!t)return Be.window.showErrorMessage("Ricwiz: Please open a file in the editor to check blame."),null;let e=t.document.fileName,o=Co.basename(e),s=z();if(!s)return Be.window.showErrorMessage("Ricwiz: Workspace is not a git repository."),null;let r=[];try{let{stdout:i}=await g(`git log -5 --pretty=format:"%an|%ar|%s|%h" -- "${e}"`,{cwd:s}),m=i.trim().split(`
`);for(let l of m){let u=l.split("|");u.length>=4&&r.push({author:u[0],time:u[1],message:u.slice(2,-1).join("|"),hash:u[u.length-1]})}}catch(i){$.appendLine(`[WhoToBlame] Git blame error: ${i.message}`)}let p="Unknown",n="Unknown",c="Unknown",a=[],d=_e(e);if(d)try{await Be.window.withProgress({location:Be.ProgressLocation.Notification,title:`Ricwiz: Analyzing ${d.name} in Salesforce...`,cancellable:!1},async()=>{let i="";if(d.type==="CustomField"){let m=d.name.split(".");m.length===2&&(i=`SELECT LastModifiedBy.Name, LastModifiedDate, CreatedBy.Name FROM CustomField WHERE DeveloperName = '${m[1].replace("__c","")}' AND TableEnumOrId = '${m[0]}'`)}else d.type==="LightningComponentBundle"?i=`SELECT LastModifiedBy.Name, LastModifiedDate, CreatedBy.Name FROM LightningComponentBundle WHERE DeveloperName = '${d.name}'`:i=`SELECT LastModifiedBy.Name, LastModifiedDate, CreatedBy.Name FROM ${d.type} WHERE Name = '${d.name}'`;if(i)try{let{stdout:m}=await g(`sf data query -t -q "${i}" --json`,{cwd:s,maxBuffer:52428800}),l=JSON.parse(m);if(l&&l.result&&l.result.records&&l.result.records.length>0){let u=l.result.records[0];p=u.LastModifiedBy?u.LastModifiedBy.Name:"Unknown",c=u.CreatedBy?u.CreatedBy.Name:"Unknown",n=new Date(u.LastModifiedDate).toLocaleString()}else p="Not found in Org",n="N/A",c="N/A"}catch(m){p="Query Error",n="N/A",c="N/A",$.appendLine(`[WhoToBlame] Query error: ${m.message}`)}try{let m="SELECT Action, Display, CreatedBy.Name, CreatedDate FROM SetupAuditTrail ORDER BY CreatedDate DESC LIMIT 1500",{stdout:l}=await g(`sf data query -q "${m}" --json`,{cwd:s,maxBuffer:52428800}),u=JSON.parse(l);if(u&&u.result&&u.result.records){let f=d.name.replace("__c","");a=u.result.records.filter(v=>v.Display&&v.Display.includes(f)).map(v=>({action:v.Action,display:v.Display,author:v.CreatedBy?v.CreatedBy.Name:"Unknown",time:new Date(v.CreatedDate).toLocaleString()})).slice(0,10)}}catch(m){$.appendLine(`[WhoToBlame] Audit trail query error: ${m.message}`)}})}catch(i){$.appendLine(`[WhoToBlame] Salesforce query error: ${i.message}`)}else p="Unsupported Metadata Type",n="N/A";return{fileName:o,gitHistory:r,sfAuthor:p,sfTime:n,sfCreatedBy:c,auditHistory:a}}var fe=C(require("vscode"));var Ne=C(require("https"));async function Ro(t,e){let o=z();if(!o)return;let s=(await Ae())?.trim();if(!s){fe.window.showErrorMessage("Ricwiz: GitLab token is not configured.");return}try{let r=await B.initialize(o,{skipPrompt:!0});if(!r)return;let n=r.getConfig("gitlabUrlOverride","");if(n){let c=new URL(n);n=`${c.protocol}//${c.host}`}else{let{stdout:c}=await g("git remote",{cwd:o}),a=c.split(`
`).map(i=>i.trim()).filter(i=>i),d=!1;for(let i of a){let{stdout:m}=await g(`git remote get-url ${i}`,{cwd:o}),l=m.trim();l.endsWith(".git")&&(l=l.slice(0,-4)),l.startsWith("git@")&&(l=l.replace("git@","").replace(":","/"),l=`https://${l}`);let u=new URL(l),f=u.pathname;if(f.startsWith("/")&&(f=f.substring(1)),f.endsWith("/")&&(f=f.slice(0,-1)),encodeURIComponent(f)===t||f===t){n=`${u.protocol}//${u.host}`,d=!0;break}}if(!d){fe.window.showErrorMessage(`Ricwiz: Could not determine base URL for project ${t}`);return}}await fe.window.withProgress({location:fe.ProgressLocation.Notification,title:`Fetching failed jobs for Pipeline #${e}...`,cancellable:!1},async()=>{let c=new Ne.Agent({keepAlive:!0}),a=new URL(`${n}/api/v4/projects/${t}/pipelines/${e}/jobs?scope[]=failed`),d=await new Promise(h=>{Ne.get(a,{headers:{"PRIVATE-TOKEN":s},agent:c},v=>{let k="";v.on("data",w=>k+=w),v.on("end",()=>{if(v.statusCode===200)try{h(JSON.parse(k))}catch{h([])}else h([])})}).on("error",()=>h([]))});if(!d||d.length===0){fe.window.showInformationMessage("Ricwiz: No failed jobs found for this pipeline.");return}let i=d[0],m=new URL(`${n}/api/v4/projects/${t}/jobs/${i.id}/trace`),u=(await new Promise(h=>{Ne.get(m,{headers:{"PRIVATE-TOKEN":s},agent:c},v=>{let k="";v.on("data",w=>k+=w),v.on("end",()=>h(k))}).on("error",v=>h(`Failed to fetch log: ${v.message}`))})).replace(/\x1B\[[0-9;]*[mK]/g,""),f=fe.window.createOutputChannel(`Pipeline #${e} - Job ${i.name}`);f.appendLine(`Pipeline ID: ${e}`),f.appendLine(`Job Name: ${i.name}`),f.appendLine(`Status: ${i.status}`),f.appendLine(`URL: ${i.web_url}`),f.appendLine("========================================"),f.appendLine(u),f.show()})}catch(r){fe.window.showErrorMessage(`Ricwiz: Error fetching pipeline logs - ${r.message}`)}}function zo(t,e,o){t.subscriptions.push(b.commands.registerCommand("ricwiz.conflictAction",Dt),b.commands.registerCommand("ricwiz.generateDestructiveChanges",async()=>{try{await Pt()}finally{b.commands.executeCommand("ricwiz.manualRefresh")}}),b.commands.registerCommand("ricwiz.runSmartTests",async()=>{try{await Bt()}finally{b.commands.executeCommand("ricwiz.manualRefresh")}}),b.commands.registerCommand("ricwiz.refreshWebview",()=>{e&&b.commands.executeCommand("workbench.action.webview.reloadWebviewAction")}),b.commands.registerCommand("ricwiz.createBranches",async s=>{try{await St(s)}finally{b.commands.executeCommand("ricwiz.manualRefresh")}}),b.commands.registerCommand("ricwiz.prepareDeploy",async()=>{try{await It()}finally{b.commands.executeCommand("ricwiz.manualRefresh")}}),b.commands.registerCommand("ricwiz.createMergeRequests",async()=>{try{await Ut()}finally{b.commands.executeCommand("ricwiz.manualRefresh")}}),b.commands.registerCommand("ricwiz.createMergeRequestsVSCode",async()=>{try{await Ot()}finally{b.commands.executeCommand("ricwiz.manualRefresh")}}),b.commands.registerCommand("ricwiz.openJiraTicket",async()=>{try{await jt()}finally{b.commands.executeCommand("ricwiz.manualRefresh")}}),b.commands.registerCommand("ricwiz.openJiraTicketVSCode",async()=>{try{await Wt()}finally{b.commands.executeCommand("ricwiz.manualRefresh")}}),b.commands.registerCommand("ricwiz.showJiraDetails",()=>{e&&Kt(e)}),b.commands.registerCommand("ricwiz.openJiraDashboard",s=>{e&&Zt(e,s)}),b.commands.registerCommand("ricwiz.openJiraDetailsForId",s=>{e&&Xt(e,s)}),b.commands.registerCommand("ricwiz.toggleDashboardBranches",s=>{e&&(e.setDashboardShowBranches(s),b.commands.executeCommand("ricwiz.openJiraDashboard"))}),b.commands.registerCommand("ricwiz.changeJiraStatus",async()=>{try{await eo()}finally{b.commands.executeCommand("ricwiz.manualRefresh")}}),b.commands.registerCommand("ricwiz.addJiraComment",async()=>{try{await to()}finally{b.commands.executeCommand("ricwiz.manualRefresh")}}),b.commands.registerCommand("ricwiz.addJiraLabel",async()=>{try{await oo()}finally{b.commands.executeCommand("ricwiz.manualRefresh")}}),b.commands.registerCommand("ricwiz.setJiraToken",io),b.commands.registerCommand("ricwiz.setGitlabToken",no),b.commands.registerCommand("ricwiz.syncAll",async()=>{try{await so()}finally{b.commands.executeCommand("ricwiz.manualRefresh")}}),b.commands.registerCommand("ricwiz.updateBases",async()=>{try{await ao()}finally{b.commands.executeCommand("ricwiz.manualRefresh")}}),b.commands.registerCommand("ricwiz.deleteUnusedBranches",async()=>{try{await co()}finally{b.commands.executeCommand("ricwiz.manualRefresh")}}),b.commands.registerCommand("ricwiz.checkoutBranch",async s=>{try{await Me(s)}finally{b.commands.executeCommand("ricwiz.manualRefresh")}}),b.commands.registerCommand("ricwiz.copyBranchName",async()=>{try{await lo()}finally{b.commands.executeCommand("ricwiz.manualRefresh")}}),b.commands.registerCommand("ricwiz.generatePackageXml",async()=>{try{await po()}finally{b.commands.executeCommand("ricwiz.manualRefresh")}}),b.commands.registerCommand("ricwiz.deployPackage",async()=>{try{await uo()}finally{b.commands.executeCommand("ricwiz.manualRefresh")}}),b.commands.registerCommand("ricwiz.importData",async()=>{try{await go()}finally{b.commands.executeCommand("ricwiz.manualRefresh")}}),b.commands.registerCommand("ricwiz.listTicketFiles",async()=>{try{await fo()}finally{b.commands.executeCommand("ricwiz.manualRefresh")}}),b.commands.registerCommand("ricwiz.resetTracking",async()=>{try{await ho()}finally{b.commands.executeCommand("ricwiz.manualRefresh")}}),b.commands.registerCommand("ricwiz.extractComponent",async()=>{try{await wo()}finally{b.commands.executeCommand("ricwiz.manualRefresh")}}),b.commands.registerCommand("ricwiz.deployMultiOrg",async()=>{try{await bo()}finally{b.commands.executeCommand("ricwiz.manualRefresh")}}),b.commands.registerCommand("ricwiz.captureAdminChanges",async()=>{try{await yo()}finally{b.commands.executeCommand("ricwiz.manualRefresh")}}),b.commands.registerCommand("ricwiz.openHistory",async()=>{try{await xo()}finally{b.commands.executeCommand("ricwiz.manualRefresh")}}),b.commands.registerCommand("ricwiz.searchTicket",async()=>{try{await ko()}finally{b.commands.executeCommand("ricwiz.manualRefresh")}}),b.commands.registerCommand("ricwiz.whoToBlame",async()=>{let s=await $o();s&&e&&(e.setBlameData(s),e.setPage("blame"))}),b.commands.registerCommand("ricwiz.showPipelineLogs",(s,r)=>Ro(s,r)),b.commands.registerCommand("ricwiz.manualRefresh",()=>{o&&o()}),b.commands.registerCommand("ricwiz.toggleAutoRefresh",()=>{if(e){let s=!e.isAutoRefreshEnabled();e.setAutoRefresh(s),b.workspace.getConfiguration("ricwiz").update("autoRefresh",s,b.ConfigurationTarget.Global)}}),b.commands.registerCommand("ricwiz.openSettings",()=>{b.commands.executeCommand("workbench.action.openSettings","ricwiz")}))}var ae=C(require("vscode"));function Po(t,e,o){let s,r=ae.workspace.getConfiguration("ricwiz").get("autoRefresh",!0);e?.setAutoRefresh(r),t.subscriptions.push(ae.workspace.onDidChangeConfiguration(n=>{if(n.affectsConfiguration("ricwiz.autoRefresh")){let c=ae.workspace.getConfiguration("ricwiz").get("autoRefresh",!0);e?.setAutoRefresh(c)}}));async function p(){let n=ae.extensions.getExtension("vscode.git");if(n){let d=function(i){let m="",l;async function u(){let h=ae.workspace.workspaceFolders;if(!h)return;let v=h[0].uri.fsPath,k=await I(v);if(k&&k!==m){m=k;let w=ae.workspace.getConfiguration("ricwiz"),y=w.get("ticketPrefix","SFPSCA-");if(!k.includes(y)){let L=k.match(/([A-Z]+-)\d+/i);L&&(y=L[1].toUpperCase())}let R=[],D=[],M=[],S=[],U=await B.initialize(v,{skipPrompt:!0}),j=U?.environments||w.get("environments",[{name:"Qual",sourceBranch:"quality"},{name:"Val",sourceBranch:"validation"},{name:"Prod",sourceBranch:"main"}]);try{let L=w.get("workspaceCheckoutButtons",["main","quality","validation"]);M=Array.from(new Set(L))}catch{}let ce="",Le=k.match(new RegExp(`(${y}\\d+(?:-\\d+)?)`,"i"));if(Le){let L=Le[1].toUpperCase();ce=L;let he=w.get("commitMessageSuffix","- "),mt=/^[A-Z]+-\d+(?:-\d+)?\s*(?:-\s*|:\s*|\s+)?/i;mt.test(i.inputBox.value)?i.inputBox.value.toUpperCase().startsWith(L)||(i.inputBox.value=i.inputBox.value.replace(mt,`${L}${he}`)):i.inputBox.value=`${L}${he}`+i.inputBox.value,o.text=`$(bookmark) ${L}`,o.tooltip=`Branch: ${k}
Click to open Jira ticket`,o.show();try{let pt=await ze(v,L,"");R=await Re(v,pt,L,j,U)}catch{}}else{o.hide();try{S=await At(v)}catch{}}let[We,Je,be]=await Promise.all([Lt(v,10),Mt(v,k,j,U),ce?Te(ce).catch(L=>{let he=L.message;return he&&(he.includes("ENOTFOUND")||he.includes("network"))&&(he="No Internet or Invalid URL"),{summary:`\u26A0\uFE0F Jira Error: ${he}`,description:"",status:""}}):Promise.resolve(null)]);D=We;let et=be?be.summary:"",Se=be&&be.status||"";e?.updateBranch(k,Je,R,D,M,S,et,Se)}}function f(){e?.isAutoRefreshEnabled()&&(l&&clearTimeout(l),l=setTimeout(()=>{m="",u()},300))}s=()=>{m="",u()},u(),t.subscriptions.push(i.state.onDidChange(()=>f())),t.subscriptions.push(ae.window.onDidChangeWindowState(h=>{h.focused&&f()}))};var c=d;n.isActive||await n.activate();let a=n.exports.getAPI(1);a.repositories.length>0&&a.repositories.forEach(i=>d(i)),a.onDidOpenRepository(i=>d(i))}}return p(),()=>{s&&s()}}var ne;function jo(t){yt(t),ne=new qe(t.extensionUri),t.subscriptions.push(je.window.registerWebviewViewProvider("ricwiz-webview",ne));let e=je.window.createStatusBarItem(je.StatusBarAlignment.Left,100);e.command="ricwiz.openJiraTicket",t.subscriptions.push(e);let o=Po(t,ne,e);zo(t,ne,o)}function Wo(){}0&&(module.exports={activate,deactivate,webviewProvider});
