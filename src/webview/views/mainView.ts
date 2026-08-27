import * as vscode from 'vscode';
import { CommitEntry, RelatedBranch } from '../../types';
import { escapeHtml, getJiraStatusColor, getPipelineIcon, getWebviewScript } from '../helpers';
import { getWebviewStyles } from '../styles';

export interface MainViewProps {
    logoUri: vscode.Uri;
    currentBranch: string;
    currentBranchIsMerged: boolean;
    relatedBranches: RelatedBranch[];
    commits: CommitEntry[];
    baseBranches: string[];
    recentTickets: string[];
    ticketTitle: string;
    ticketStatus: string;
    autoRefreshEnabled: boolean;
}

export function renderMainView(props: MainViewProps): string {
    const {
        logoUri,
        currentBranch,
        currentBranchIsMerged,
        relatedBranches,
        commits,
        baseBranches,
        recentTickets,
        ticketTitle,
        ticketStatus,
        autoRefreshEnabled
    } = props;

    const styleHtml = getWebviewStyles();

    const commitsHtml = commits.length > 0 ? `
        <div class="separator"></div>
        <div style="padding: 0 4px;">
            <div style="font-size: 11px; opacity: 0.7; margin-bottom: 6px; display: flex; align-items: center; gap: 4px;">
                <span>☷</span> Recent Commits
            </div>
            <div style="display: flex; flex-direction: column; gap: 2px;">
                ${commits.map(c => `
                    <div style="font-size: 11px; padding: 3px 4px; border-radius: 2px; display: flex; gap: 6px; align-items: baseline;">
                        <code style="color: var(--vscode-textLink-foreground); font-size: 10px; flex-shrink: 0;">${escapeHtml(c.hash)}</code>
                        <span style="flex: 1; overflow: hidden; text-overflow: ellipsis; white-space: nowrap;" title="${escapeHtml(c.message)}">${escapeHtml(c.message)}</span>
                        <span style="font-size: 9px; opacity: 0.5; flex-shrink: 0;">${escapeHtml(c.timeAgo)}</span>
                    </div>
                `).join('')}
            </div>
        </div>
    ` : '';

    let currentBranchObj = relatedBranches.find(b => b.name === currentBranch);
    let currentPipelineIcon = '';
    if (currentBranchObj) {
        currentPipelineIcon = getPipelineIcon(currentBranchObj.pipelineStatus);
    }
    let currentMrUrl = currentBranchObj ? currentBranchObj.mrUrl : undefined;

    const sisterBranches = relatedBranches.filter(b => b.name !== currentBranch);

    const currentBranchHtml = currentBranch ? `
        <div style="background-color: var(--vscode-editor-inactiveSelectionBackground); padding: 10px; border-radius: 6px; margin-bottom: 16px; border: 1px solid var(--vscode-panel-border); box-shadow: 0 2px 4px rgba(0,0,0,0.1); position: relative;">
            ${ticketTitle && ticketStatus ? `
            <div style="position: absolute; top: 6px; right: 6px; z-index: 10; cursor: pointer; font-size: 9px; padding: 2px 6px; border-radius: 18px; background-color: ${getJiraStatusColor(ticketStatus)}; color: white; border: 1px solid var(--vscode-panel-border); opacity: 0.9; font-weight: bold; text-transform: uppercase; display: flex; align-items: center; gap: 4px;" onclick="sendCommand('changeJiraStatus', null, this)" title="Update Jira Status">
                <span>✎</span><span>${escapeHtml(ticketStatus)}</span>
            </div>
            ` : ''}
            <div style="font-size: 10px; opacity: 0.7; margin-bottom: 4px; display: flex; align-items: center; justify-content: center; gap: 4px; text-transform: uppercase;">
                <span>Current Ticket / Branch</span>
                <button class="copy-btn" onclick="sendCommand('copyBranch', null, this)" title="Copy branch name to clipboard">⎘</button>
            </div>
            <div style="font-weight: bold; font-size: 14px; word-break: break-all; text-align: center; color: var(--vscode-textLink-foreground); display: flex; justify-content: center; align-items: center; gap: 6px;">
                <span>${escapeHtml(currentBranch)}</span>
                ${currentPipelineIcon ? `<span title="Pipeline: ${currentBranchObj!.pipelineStatus}" style="font-size: 12px;">${currentPipelineIcon}</span>` : ''}
                ${currentMrUrl ? `<span onclick="event.stopPropagation(); sendCommand('openExternal', '${currentMrUrl}');" title="Open Merge Request" style="cursor: pointer; font-size: 12px;">🔗</span>` : ''}
                ${currentBranchIsMerged ? '<span style="background-color: var(--vscode-charts-green); color: white; border-radius: 3px; padding: 1px 4px; font-size: 10px; font-weight: bold;" title="Merged to target env">MERGED</span>' : ''}
            </div>
            ${ticketTitle ? `<div style="font-size: 12px; margin-top: 6px; text-align: center; opacity: 0.9; font-style: italic;">${escapeHtml(ticketTitle)}</div>` : ''}
            ${sisterBranches.length > 0 ? `
                <div style="margin-top: 10px; border-top: 1px solid var(--vscode-panel-border); padding-top: 10px;">
                    <div style="font-size: 10px; opacity: 0.7; margin-bottom: 6px; text-transform: uppercase; text-align: center;">Sister Branches</div>
                    <div style="display: flex; flex-direction: column; gap: 4px;">
                        ${sisterBranches.map(b => {
                            let pipelineIcon = getPipelineIcon(b.pipelineStatus);
                            let pipelineAction = '';
                            if (b.pipelineStatus === 'failed' && b.projectPath && b.pipelineId) {
                                pipelineAction = `onclick="event.stopPropagation(); sendCommand('showPipelineLogs', { projectPath: '${b.projectPath}', pipelineId: ${b.pipelineId} });" style="cursor: pointer;"`;
                            }
                            
                            return `
                            <div class="btn" style="padding: 6px 8px; font-size: 11px; display: flex; justify-content: space-between; align-items: center; background-color: var(--vscode-button-secondaryBackground); color: var(--vscode-button-secondaryForeground); border-radius: 4px; box-sizing: border-box; width: 100%;" onclick="sendCheckoutCommand('${escapeHtml(b.name)}', this)" title="Checkout ${escapeHtml(b.name)}">
                                <div style="display: flex; align-items: center; gap: 4px; overflow: hidden;">
                                    <span style="overflow: hidden; text-overflow: ellipsis; white-space: nowrap; font-weight: bold;">${escapeHtml(b.name)}</span>
                                </div>
                                <div style="display: flex; gap: 4px; align-items: center;">
                                    ${b.isMerged ? '<span style="background-color: var(--vscode-charts-green); color: white; border-radius: 3px; padding: 1px 4px; font-size: 9px; font-weight: bold;" title="Merged to target env">MERGED</span>' : ''}
                                    ${pipelineIcon ? `<span title="Pipeline: ${b.pipelineStatus}" style="font-size: 10px;" ${pipelineAction}>${pipelineIcon}</span>` : ''}
                                    ${b.mrUrl ? `<span onclick="event.stopPropagation(); sendCommand('openExternal', '${b.mrUrl}');" title="Open Merge Request" style="cursor: pointer; font-size: 10px;">🔗</span>` : ''}
                                </div>
                            </div>`;
                        }).join('')}
                    </div>
                </div>
            ` : (recentTickets.length > 0 ? `
                <div style="margin-top: 10px; border-top: 1px solid var(--vscode-panel-border); padding-top: 10px;">
                    <div style="font-size: 10px; opacity: 0.7; margin-bottom: 6px; text-transform: uppercase; text-align: center;">Recent Tickets</div>
                    <div style="display: flex; flex-direction: column; gap: 4px;">
                        ${recentTickets.map(b => `
                            <div class="btn" style="padding: 6px 8px; font-size: 11px; display: flex; justify-content: space-between; align-items: center; background-color: var(--vscode-button-secondaryBackground); color: var(--vscode-button-secondaryForeground); border-radius: 4px; box-sizing: border-box; width: 100%;" onclick="sendCheckoutCommand('${escapeHtml(b)}', this)" title="Checkout ${escapeHtml(b)}">
                                <span style="font-weight: bold; overflow: hidden; text-overflow: ellipsis; white-space: nowrap;">${escapeHtml(b)}</span>
                            </div>
                        `).join('')}
                    </div>
                </div>
            ` : '')}
            <div style="display: flex; gap: 6px; margin-top: 10px; justify-content: center;">
                <button class="btn" style="width: auto; padding: 4px 10px; font-size: 11px; display: inline-flex; align-items: center; justify-content: center; gap: 5px; background-color: var(--vscode-button-secondaryBackground); border-radius: 4px; border: 1px solid var(--vscode-panel-border); cursor: pointer;" onclick="sendCommand('showJiraDetails', null, this)" title="View Jira Details"><span class="icon" style="font-size: 12px; color: #FF9F0A;">⚑</span><span>Jira Details</span></button>
                <button class="btn" style="width: auto; padding: 4px 10px; font-size: 11px; display: inline-flex; align-items: center; justify-content: center; gap: 5px; background-color: var(--vscode-button-secondaryBackground); border-radius: 4px; border: 1px solid var(--vscode-panel-border); cursor: pointer;" onclick="sendCommand('openDashboard', null, this)" title="View Ticket Dashboard"><span class="icon" style="font-size: 12px; color: #32D74B;">▤</span><span>Dashboard</span></button>
            </div>
        </div>` : '';

    return `<!DOCTYPE html>
    <html lang="en">
    <head>
        <meta charset="UTF-8">
        <meta name="viewport" content="width=device-width, initial-scale=1.0">
        <title>Ricwiz</title>
        ${styleHtml}
    </head>
    <body>
        <div style="text-align: center; margin-bottom: 12px; margin-top: 8px;">
            <img src="${logoUri}" alt="Ricwiz Logo" style="width: 80px; height: 80px; opacity: 0.9; filter: drop-shadow(0 2px 4px rgba(0,0,0,0.2));" />
        </div>

        <!-- SETTINGS & DEV TOOLS (Top Level) -->
        <div style="display: flex; gap: 8px; margin-bottom: 16px;">
            <button class="btn" style="flex: 1; justify-content: center; background-color: var(--vscode-button-secondaryBackground); border: 1px solid var(--vscode-panel-border); border-radius: 4px;" title="Developer Utilities" onclick="sendCommand('openDevTools', null, this)">
                <span class="icon" style="color: #FFD60A;">⚲</span> Dev Tools
            </button>
            <button class="btn" style="flex: 1; justify-content: center; background-color: var(--vscode-button-secondaryBackground); border: 1px solid var(--vscode-panel-border); border-radius: 4px;" title="Extension Settings" onclick="sendCommand('openSettings', null, this)">
                <span class="icon" style="color: #98989D;">⚙</span> Settings
            </button>
        </div>

        <div style="display: flex; align-items: center; justify-content: space-between; margin-bottom: 6px; padding: 0 4px;">
            <div style="font-size: 11px; font-weight: bold; opacity: 0.8; text-transform: uppercase;">Workspace</div>
            <div style="display: flex; gap: 4px;">
                <button class="copy-btn" onclick="sendCommand('manualRefresh', null, this)" title="Refresh branch status" style="font-size: 13px; padding: 2px 6px; opacity: 0.8; border: 1px solid var(--vscode-panel-border);">
                    <span class="icon" style="color: #32D74B; font-size: 14px;">⟳</span>
                </button>
                <button class="copy-btn" id="autoRefreshToggle" onclick="sendCommand('toggleAutoRefresh', null, this)" title="${autoRefreshEnabled ? 'Auto-refresh is ON — click to disable' : 'Auto-refresh is OFF — click to enable'}" style="font-size: 11px; padding: 2px 6px; border-radius: 3px; border: 1px solid var(--vscode-panel-border); ${autoRefreshEnabled ? 'opacity: 0.9; background-color: var(--vscode-button-secondaryBackground);' : 'opacity: 0.5;'}">
                    ${autoRefreshEnabled ? '⚡ Auto' : '⏸️ Auto'}
                </button>
            </div>
        </div>

        ${currentBranchHtml}

        ${baseBranches.length > 0 ? `
            <div style="display: flex; gap: 4px; margin-bottom: 16px; flex-wrap: wrap; justify-content: center;">
                ${baseBranches.map(b => {
                    const displayName = b.split('/').pop()?.toUpperCase() || b.toUpperCase();
                    return `
                    <button class="btn" style="flex: 1; min-width: 25%; justify-content: center; padding: 6px 4px; font-size: 10px; font-weight: bold; background-color: var(--vscode-button-secondaryBackground); color: var(--vscode-button-secondaryForeground); border-radius: 4px;" onclick="sendCheckoutCommand('${escapeHtml(b)}', this)" title="Checkout ${escapeHtml(b)}">
                        ${escapeHtml(displayName)}
                    </button>
                `}).join('')}
            </div>
        ` : ''}

        <!-- PRIMARY ACTIONS CARD -->
        <div style="background-color: var(--vscode-editor-inactiveSelectionBackground); padding: 10px; border-radius: 6px; margin-bottom: 16px; border: 1px solid var(--vscode-panel-border); box-shadow: 0 2px 4px rgba(0,0,0,0.1);">
            <div style="font-size: 10px; opacity: 0.7; margin-bottom: 10px; text-transform: uppercase; font-weight: bold; text-align: center;">Ticket Workflow</div>
            
            <button class="btn" style="background-color: var(--vscode-button-background); color: var(--vscode-button-foreground); font-weight: bold; margin-bottom: 6px; border-radius: 4px; padding: 8px;" title="Generates the main and environment branches" onclick="sendCommand('createBranches', null, this)">
                <span class="icon" style="color: #32D74B;">⎇</span> Create Branches
            </button>

            <button class="btn" style="background-color: var(--vscode-button-secondaryBackground); margin-bottom: 6px; border-radius: 4px;" title="Sync environments and merge ticket" onclick="sendCommand('prepareDeploy', null, this)">
                <span class="icon" style="color: #BF5AF2;">⤨</span> Prepare Deploy
            </button>

            <div style="display: flex; gap: 4px; margin-bottom: 6px;">
                <button class="btn" style="flex: 1; background-color: var(--vscode-button-secondaryBackground); border-radius: 4px;" title="Opens Merge Request pages in Browser" onclick="sendCommand('openMRs', null, this)">
                    <span class="icon" style="color: #0A84FF;">⇪</span> Open MRs
                </button>
                <button class="btn" style="width: auto; padding: 6px 12px; font-weight: bold; justify-content: center; background-color: var(--vscode-button-secondaryBackground); border-radius: 4px;" title="Open MRs in VS Code" onclick="sendCommand('openMRsVSCode', null, this)">
                    VS
                </button>
            </div>

            <button class="btn" style="background-color: var(--vscode-button-secondaryBackground); border-radius: 4px;" title="Open Jira Ticket in Browser" onclick="sendCommand('openJira', null, this)">
                <span class="icon" style="color: #FF9F0A;">⚑</span> Open Jira
            </button>
        </div>

        <!-- SECONDARY ACTIONS CARD -->
        <div style="background-color: var(--vscode-editor-inactiveSelectionBackground); padding: 10px; border-radius: 6px; margin-bottom: 12px; border: 1px solid var(--vscode-panel-border); box-shadow: 0 2px 4px rgba(0,0,0,0.1);">
            <div style="font-size: 10px; opacity: 0.7; margin-bottom: 10px; text-transform: uppercase; font-weight: bold; text-align: center;">Git Operations</div>
            
            <button class="btn" style="margin-bottom: 6px; background-color: var(--vscode-button-secondaryBackground); border-radius: 4px;" title="Fetch and pull all branches of the current ticket" onclick="sendCommand('syncAll', null, this)">
                <span class="icon" style="color: #32D74B;">⟳</span> Sync All
            </button>

            <button class="btn" style="margin-bottom: 6px; background-color: var(--vscode-button-secondaryBackground); border-radius: 4px;" title="Merge latest team changes from origin base into environment branches" onclick="sendCommand('updateBases', null, this)">
                <span class="icon" style="color: #64D2FF;">↧</span> Update from Base
            </button>

            <button class="btn" style="background-color: var(--vscode-button-secondaryBackground); border-radius: 4px;" title="Delete all branches of a ticket (local and remote)" onclick="sendCommand('deleteUnused', null, this)">
                <span class="icon" style="color: #FF453A;">⨯</span> Delete Unused Branches
            </button>
        </div>

        <!-- AI ASSISTANCE CARD -->
        <div style="background-color: var(--vscode-editor-inactiveSelectionBackground); padding: 10px; border-radius: 6px; margin-bottom: 12px; border: 1px solid var(--vscode-panel-border); box-shadow: 0 2px 4px rgba(0,0,0,0.1);">
            <div style="font-size: 10px; opacity: 0.7; margin-bottom: 10px; text-transform: uppercase; font-weight: bold; text-align: center;">AI Assistance</div>
            
            <button class="btn" style="background-color: var(--vscode-button-secondaryBackground); border-radius: 4px;" title="Generate Commit Message with Gemini" onclick="sendCommand('generateCommitMessage', null, this)">
                <span class="icon" style="color: #BF5AF2;">✨</span> Generate Commit Message
            </button>
        </div>

        ${commitsHtml}
        
        ${getWebviewScript()}
    </body>
    </html>`;
}
