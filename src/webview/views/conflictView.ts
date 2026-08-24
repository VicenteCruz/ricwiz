import * as vscode from 'vscode';
import { ConflictState } from '../../types';
import { escapeHtml, getWebviewScript } from '../helpers';
import { getWebviewStyles } from '../styles';

export function renderConflictView(logoUri: vscode.Uri, conflictState: ConflictState): string {
    const styleHtml = getWebviewStyles();

    const filesHtml = (conflictState.files || []).map(f => `
        <button class="btn" style="padding: 6px; font-size: 12px; display: flex; justify-content: space-between; align-items: center;" onclick="sendOpenFileCommand('${escapeHtml(f.file)}')">
            <span style="flex: 1; overflow: hidden; text-overflow: ellipsis; white-space: nowrap; direction: rtl; text-align: left;">&lrm;${escapeHtml(f.file)}</span>
            <span style="font-size: 10px; opacity: 0.8; flex-shrink: 0; background-color: var(--vscode-badge-background); color: var(--vscode-badge-foreground); padding: 2px 4px; border-radius: 2px;">${escapeHtml(f.state)}</span>
        </button>
    `).join('');

    return `<!DOCTYPE html>
    <html lang="en">
    <head>
        <meta charset="UTF-8">
        <meta name="viewport" content="width=device-width, initial-scale=1.0">
        <title>Ricwiz Conflict</title>
        ${styleHtml}
    </head>
    <body>
        <div style="text-align: center; margin-bottom: 12px; margin-top: 8px;">
            <img src="${logoUri}" alt="Ricwiz Logo" style="width: 80px; height: 80px; opacity: 0.9;" />
        </div>
        <div style="background-color: var(--vscode-editorError-background); color: var(--vscode-editorError-foreground); padding: 12px; border-radius: 4px; margin-bottom: 12px; text-align: center;">
            <div style="font-size: 14px; font-weight: bold; margin-bottom: 8px;">⚠ MERGE CONFLICT</div>
            <div style="font-size: 11px; margin-bottom: 12px; opacity: 0.9;">
                Merging <b>${escapeHtml(conflictState.sourceStr)}</b> into <b>${escapeHtml(conflictState.targetStr)}</b>.<br/>
                Resolve the conflicts, then click below.
            </div>
            <div style="display: flex; flex-direction: column; gap: 6px;">
                <button class="btn" style="background-color: var(--vscode-button-background); color: var(--vscode-button-foreground); justify-content: center;" onclick="sendCommand('conflict_commitAndContinue', null, this)">
                    ✓ Commit & Continue
                </button>
                ${conflictState.deletionsCount > 0 ? `
                    <button class="btn" style="background-color: var(--vscode-button-secondaryBackground); color: var(--vscode-button-secondaryForeground); justify-content: center;" onclick="sendCommand('conflict_resolveDeletions', null, this)">
                        ⨯ Resolve Deletions (${conflictState.deletionsCount})
                    </button>
                ` : ''}
                <button class="btn" style="background-color: var(--vscode-button-secondaryBackground); color: var(--vscode-button-secondaryForeground); justify-content: center;" onclick="sendCommand('conflict_abortDeploy', null, this)">
                    ✕ Abort Deploy
                </button>
            </div>
        </div>
        
        ${filesHtml ? `
            <div style="font-size: 11px; opacity: 0.7; margin: 8px 4px 4px 4px; text-transform: uppercase;">Conflicted Files</div>
            <div style="display: flex; flex-direction: column; gap: 2px;">
                ${filesHtml}
            </div>
        ` : ''}

        ${getWebviewScript()}
    </body>
    </html>`;
}
