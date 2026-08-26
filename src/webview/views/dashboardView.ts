import { JiraDashboardData } from '../../types';
import { escapeHtml, getJiraStatusColor, getPipelineIcon, getWebviewScript } from '../helpers';
import { getWebviewStyles } from '../styles';

export interface DashboardViewProps {
    data: JiraDashboardData | null;
    showBranches: boolean;
}

export function renderDashboardView(props: DashboardViewProps): string {
    const { data: rawData, showBranches } = props;
    const styleHtml = getWebviewStyles();
    const data: JiraDashboardData = rawData || { queries: [], selectedIndex: 0, results: [], error: null };

    const queriesHtml = data.queries.map((q, idx) => `
        <option value="${idx}" ${idx === data.selectedIndex ? 'selected' : ''}>${escapeHtml(q.name)}</option>
    `).join('');

    const resultsHtml = data.error ? `
        <div style="color: var(--vscode-errorForeground); padding: 12px; text-align: center; background: var(--vscode-editorError-background); border-radius: 4px;">
            ⚠ ${escapeHtml(data.error)}
        </div>
    ` : data.results.length === 0 ? `
        <div style="padding: 20px; text-align: center; opacity: 0.7;">No tickets found for this query.</div>
    ` : `
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
                ${data.results.map(r => `
                    <tr style="border-bottom: ${r.detailedBranches && r.detailedBranches.length > 0 ? 'none' : '1px solid var(--vscode-panel-border)'}; cursor: pointer;" class="tr-hover" onclick="sendCommand('openJiraDetailsForId', '${escapeHtml(r.key)}', this)">
                        <td style="padding: 6px; font-weight: bold; color: var(--vscode-textLink-foreground); white-space: nowrap;">${escapeHtml(r.key)}</td>
                        <td style="padding: 6px; overflow: hidden; text-overflow: ellipsis; max-width: 150px; white-space: nowrap;" title="${escapeHtml(r.summary)}">${escapeHtml(r.summary)}</td>
                        <td style="padding: 6px; white-space: nowrap;">
                            <span style="background: ${getJiraStatusColor(r.status)}; color: white; padding: 2px 4px; border-radius: 3px; font-size: 9px; font-weight: bold; text-transform: uppercase;">${escapeHtml(r.status)}</span>
                        </td>
                        <td style="padding: 6px; white-space: nowrap; text-align: center;">
                            ${r.detailedBranches ? '' : r.branch ? `
                                <button class="icon-button" style="background-color: var(--vscode-button-secondaryBackground); color: var(--vscode-button-secondaryForeground); font-size: 10px; padding: 2px 6px;" title="Checkout ${escapeHtml(r.branch)}" onclick="event.stopPropagation(); sendCommand('checkout', '${escapeHtml(r.branch)}')">
                                    ⎇ Checkout
                                </button>
                            ` : `
                                <button class="icon-button" style="background-color: var(--vscode-button-background); color: var(--vscode-button-foreground); font-size: 10px; padding: 2px 6px;" title="Create Branch for ${escapeHtml(r.key)}" onclick="event.stopPropagation(); sendCommand('createBranchForTicket', '${escapeHtml(r.key)}')">
                                    + Create
                                </button>
                            `}
                        </td>
                    </tr>
                    ${r.detailedBranches && r.detailedBranches.length > 0 ? `
                    <tr style="border-bottom: 1px solid var(--vscode-panel-border);">
                        <td colspan="4" style="padding: 0 6px 8px 6px;">
                            <div style="display: flex; flex-direction: column; gap: 4px; padding-left: 8px; border-left: 2px solid var(--vscode-editorIndentGuide-activeBackground1);">
                                ${r.detailedBranches.map(b => {
                                    let pipelineIcon = getPipelineIcon(b.pipelineStatus);
                                    let pipelineAction = '';

                                    return `
                                    <div style="display: flex; justify-content: space-between; align-items: center; font-size: 10px; background: var(--vscode-editor-background); padding: 2px 6px; border-radius: 3px;">
                                        <div style="display: flex; align-items: center; gap: 6px; overflow: hidden; cursor: pointer; flex: 1;" onclick="sendCheckoutCommand('${escapeHtml(b.name)}', this)" title="Checkout ${escapeHtml(b.name)}">
                                            <span style="overflow: hidden; text-overflow: ellipsis; white-space: nowrap;">${escapeHtml(b.name)}</span>
                                        </div>
                                        <div style="display: flex; gap: 6px; align-items: center;">
                                            ${b.isMerged ? '<span style="background-color: var(--vscode-charts-green); color: white; border-radius: 3px; padding: 1px 4px; font-size: 8px; font-weight: bold;">MERGED</span>' : ''}
                                            ${pipelineIcon ? `<span title="Pipeline: ${b.pipelineStatus}" ${pipelineAction}>${pipelineIcon}</span>` : ''}
                                            ${b.mrUrl ? `<span onclick="event.stopPropagation(); sendCommand('openExternal', '${b.mrUrl}');" title="Open Merge Request" style="cursor: pointer;">🔗</span>` : ''}
                                        </div>
                                    </div>
                                    `;
                                }).join('')}
                            </div>
                        </td>
                    </tr>
                    ` : ''}
                `).join('')}
            </tbody>
        </table>
    `;

    return `<!DOCTYPE html>
    <html lang="en">
    <head>
        <meta charset="UTF-8">
        <meta name="viewport" content="width=device-width, initial-scale=1.0">
        <title>Ricwiz Ticket Dashboard</title>
        ${styleHtml}
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
            <button class="icon-button" onclick="sendCommand('setPage', 'main', this)" style="font-weight: bold; font-size: 16px;" title="Back">⮜</button>
            <span style="font-weight: 600; font-size: 13px; flex: 1;">Ticket Dashboard</span>
            <button class="icon-button" onclick="sendCommand('refreshDashboard', null, this)" title="Refresh">⟳</button>
        </div>
        
        ${data.queries.length > 0 ? `
        <div style="margin-bottom: 12px;">
            <select id="querySelect" onchange="sendCommand('switchDashboardQuery', this.value)">
                ${queriesHtml}
            </select>
        </div>
        <div style="margin-bottom: 12px; display: flex; align-items: center; gap: 6px;">
            <input type="checkbox" id="showBranchesCheck" ${showBranches ? 'checked' : ''} onchange="sendCommand('toggleDashboardBranches', this.checked)" style="margin: 0; cursor: pointer;">
            <label for="showBranchesCheck" style="font-size: 11px; cursor: pointer;">Show all Branches (MRs & Pipelines)</label>
        </div>
        ` : `
        <div style="padding: 12px; opacity: 0.7; text-align: center;">No queries defined in settings.</div>
        `}

        <div style="background: var(--vscode-editor-background); border: 1px solid var(--vscode-panel-border); border-radius: 4px; overflow-x: auto; overflow-y: auto; flex: 1; display: flex; flex-direction: column;">
            ${resultsHtml}
        </div>

        ${getWebviewScript()}
    </body>
    </html>`;
}
