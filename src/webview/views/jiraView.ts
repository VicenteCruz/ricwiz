import { JiraDetailsData } from '../../types';
import { escapeHtml, getPipelineIcon, getWebviewScript } from '../helpers';
import { getWebviewStyles } from '../styles';

export function renderJiraView(data: JiraDetailsData | null): string {
    const styleHtml = getWebviewStyles();
    const ticketId = data?.ticketId || 'Jira';
    const summary = data?.summary || 'No Title';
    const desc = data?.description || 'No description provided.';
    const relatedBranches = data?.relatedBranches || [];

    return `<!DOCTYPE html>
    <html lang="en">
    <head>
        <meta charset="UTF-8">
        <meta name="viewport" content="width=device-width, initial-scale=1.0">
        <title>Ricwiz Jira Details</title>
        ${styleHtml}
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
            <button class="icon-button" onclick="sendCommand('setPage', 'main', this)" style="font-weight: bold; font-size: 16px;" title="Back">⮜</button>
            <span style="font-weight: 600; font-size: 13px;">${escapeHtml(ticketId)} Details</span>
        </div>
        
        <div class="card" style="padding: 16px;">
            <div class="jira-title">${escapeHtml(summary)}</div>
            <div class="jira-desc">${escapeHtml(desc)}</div>
            
            ${relatedBranches.length > 0 ? `
                <div style="margin-top: 16px; border-top: 1px solid var(--vscode-panel-border); padding-top: 12px;">
                    <div style="font-size: 11px; opacity: 0.7; margin-bottom: 8px; text-transform: uppercase; font-weight: bold;"><span class="icon" style="color: #32D74B;">⎇</span> Related Branches & MRs</div>
                    <div style="display: flex; flex-direction: column; gap: 4px;">
                        ${relatedBranches.map(b => {
                            let pipelineIcon = getPipelineIcon(b.pipelineStatus);
                            let pipelineAction = '';
                            if (b.pipelineStatus === 'failed' && b.projectPath && b.pipelineId) {
                                pipelineAction = `onclick="event.stopPropagation(); sendCommand('showPipelineLogs', { projectPath: '${b.projectPath}', pipelineId: ${b.pipelineId} });" style="cursor: pointer;"`;
                            }
                            
                            return `
                            <div class="btn" style="padding: 6px 10px; font-size: 12px; display: flex; justify-content: space-between; align-items: center; background-color: var(--vscode-button-secondaryBackground); color: var(--vscode-button-secondaryForeground); border-radius: 4px;" onclick="sendCheckoutCommand('${escapeHtml(b.name)}', this)" title="Checkout ${escapeHtml(b.name)}">
                                <div style="display: flex; align-items: center; gap: 6px; overflow: hidden;">
                                    <span style="overflow: hidden; text-overflow: ellipsis; white-space: nowrap; font-weight: bold;">${escapeHtml(b.name)}</span>
                                </div>
                                <div style="display: flex; gap: 6px; align-items: center;">
                                    ${pipelineIcon ? `<span title="Pipeline: ${b.pipelineStatus}" style="font-size: 11px;" ${pipelineAction}>${pipelineIcon}</span>` : ''}
                                    ${b.mrUrl ? `<span onclick="event.stopPropagation(); sendCommand('openExternal', '${b.mrUrl}');" title="Open Merge Request" style="cursor: pointer; font-size: 12px;">🔗</span>` : ''}
                                    ${b.isMerged ? '<span style="background-color: var(--vscode-charts-green); color: white; border-radius: 3px; padding: 2px 6px; font-size: 10px; font-weight: bold;" title="Merged to target env">MERGED</span>' : ''}
                                </div>
                            </div>
                            `;
                        }).join('')}
                    </div>
                </div>
            ` : ''}
            
        <div style="display: flex; gap: 4px; margin-top: 16px;">
            <button class="btn" style="flex: 1; background-color: var(--vscode-button-secondaryBackground); border-radius: 4px;" onclick="sendCommand('changeJiraStatus', null, this)">
                <span class="icon" style="color: #32D74B;">⟳</span> Change Status
            </button>
            <button class="btn" style="flex: 1; background-color: var(--vscode-button-secondaryBackground); border-radius: 4px;" onclick="sendCommand('addJiraComment', null, this)">
                <span class="icon" style="color: #64D2FF;">✉</span> Add Comment
            </button>
            <button class="btn" style="flex: 1; background-color: var(--vscode-button-secondaryBackground); border-radius: 4px;" onclick="sendCommand('addJiraLabel', null, this)">
                <span class="icon" style="color: #BF5AF2;">☷</span> Add Label
            </button>
            ${data?.url ? `
            <button class="btn" style="flex: 1; background-color: var(--vscode-button-secondaryBackground); border-radius: 4px;" onclick="sendCommand('openExternal', '${data.url}', this)">
                <span class="icon" style="color: #0A84FF;">⎈</span> Open Browser
            </button>
            ` : ''}
        </div>
        </div>

        ${getWebviewScript()}
    </body>
    </html>`;
}
