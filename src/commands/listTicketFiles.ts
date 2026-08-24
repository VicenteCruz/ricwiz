import * as vscode from 'vscode';
import {
    exec,
    getWorkspaceCwd,
    getCurrentBranch,
    extractTicketSuggestion,
    resolvePrefix,
    ricwizLogger,
    sanitizeShellInput
} from '../git';
import { WorkflowContext } from '../workflows/WorkflowContext';
import { resolveExistingBranchName } from '../branchStatus';

export async function listTicketFiles(): Promise<void> {
    const cwd = getWorkspaceCwd();
    if (!cwd) {
        vscode.window.showErrorMessage('Ricwiz: Open a folder or workspace that is a Git repository.');
        return;
    }

    const ctx = await WorkflowContext.initialize(cwd, { skipPrompt: true });
    const sourceBranch = ctx ? ctx.ticketSourceBranch : vscode.workspace.getConfiguration('ricwiz').get<string>('ticketSourceBranch', 'main');
    const originRemote = ctx ? ctx.originRemote : 'origin';

    let currentBranch = '';
    try {
        currentBranch = await getCurrentBranch(cwd);
    } catch (e) {}

    const targetBranch = await vscode.window.showInputBox({
        prompt: `Enter the branch name to list modified files (compared to ${sourceBranch})`,
        value: currentBranch,
        placeHolder: 'SFPSCA-1234'
    });

    if (!targetBranch) {
        return; // User cancelled
    }
    
    const sanitizedTarget = sanitizeShellInput(targetBranch);

    await vscode.window.withProgress({
        location: vscode.ProgressLocation.Notification,
        title: `Ricwiz: Finding files for ${sanitizedTarget}...`,
        cancellable: false
    }, async () => {
        try {
            // Extract the actual ticket ID (e.g. DSSCCRC-1234) even if branch is CRC-R19-DSSCCRC-1234
            const configPrefix = ctx ? ctx.ticketPrefix : vscode.workspace.getConfiguration('ricwiz').get<string>('ticketPrefix', 'SFPSC-');
            const prefix = resolvePrefix(sanitizedTarget, configPrefix);
            const ticketId = extractTicketSuggestion(sanitizedTarget, prefix, true) || sanitizedTarget.replace(/-to-[a-zA-Z0-9]+$/i, '');
            
            // Resolve the actual branch name if the user just typed "DSSCCRC-1234"
            let resolvedTargetBranch = await resolveExistingBranchName(cwd, ticketId);
            
            ricwizLogger.appendLine(`[ListTicketFiles] targetBranch (raw): ${sanitizedTarget}, resolvedTargetBranch: ${resolvedTargetBranch}, ticketId: ${ticketId}, originRemote: ${originRemote}, sourceBranch: ${sourceBranch}`);
            
            let diffLines: string[] = [];
            
            // 1. Try to get diff against base branch (works for unmerged active branches)
            try {
                let mergeBase = '';
                try {
                    ricwizLogger.appendLine(`[ListTicketFiles] Running: git merge-base ${originRemote}/${sourceBranch} ${resolvedTargetBranch}`);
                    const { stdout } = await exec(`git merge-base ${originRemote}/${sourceBranch} ${resolvedTargetBranch}`, { cwd });
                    mergeBase = stdout.trim();
                } catch(e: any) {
                    ricwizLogger.appendLine(`[ListTicketFiles] First merge-base failed: ${e.message}`);
                    try {
                        ricwizLogger.appendLine(`[ListTicketFiles] Running: git merge-base ${sourceBranch} ${resolvedTargetBranch}`);
                        const { stdout } = await exec(`git merge-base ${sourceBranch} ${resolvedTargetBranch}`, { cwd });
                        mergeBase = stdout.trim();
                    } catch (e2: any) {
                        ricwizLogger.appendLine(`[ListTicketFiles] Second merge-base failed: ${e2.message}`);
                        ricwizLogger.appendLine(`[ListTicketFiles] Running: git merge-base ${originRemote}/${sourceBranch} ${originRemote}/${resolvedTargetBranch}`);
                        const { stdout } = await exec(`git merge-base ${originRemote}/${sourceBranch} ${originRemote}/${resolvedTargetBranch}`, { cwd });
                        mergeBase = stdout.trim();
                        // Update resolvedTargetBranch so git diff uses the remote branch
                        resolvedTargetBranch = `${originRemote}/${resolvedTargetBranch}`;
                    }
                }

                if (mergeBase) {
                    ricwizLogger.appendLine(`[ListTicketFiles] Merge base found: ${mergeBase}. Running git diff...`);
                    const isCurrent = resolvedTargetBranch === currentBranch || sanitizedTarget === currentBranch;
                    const diffTarget = isCurrent ? '' : ` ${resolvedTargetBranch}`;
                    const { stdout } = await exec(`git diff --name-only ${mergeBase}${diffTarget}`, { cwd, maxBuffer: 10 * 1024 * 1024 });
                    diffLines = stdout.split('\n').map(l => l.trim()).filter(l => l.length > 0);
                    ricwizLogger.appendLine(`[ListTicketFiles] diff found ${diffLines.length} files.`);
                }
            } catch (e: any) {
                ricwizLogger.appendLine(`[ListTicketFiles] Diff strategy failed: ${e.message}`);
            }

            // 2. Fallback / Combine with git log (works for already merged tickets)
            let logLines: string[] = [];
            try {
                ricwizLogger.appendLine(`[ListTicketFiles] Running git log fallback for ticketId: ${ticketId}`);
                const { stdout } = await exec(`git --no-pager log --grep="\\b${ticketId}\\b" -i -E --name-only -m --first-parent --format=""`, { cwd, maxBuffer: 10 * 1024 * 1024 });
                logLines = stdout.split('\n').map(l => l.trim()).filter(l => l.length > 0);
                ricwizLogger.appendLine(`[ListTicketFiles] git log found ${logLines.length} files.`);
            } catch(e: any) {
                ricwizLogger.appendLine(`[ListTicketFiles] Git log fallback failed: ${e.message}`);
            }

            const lines = [...diffLines, ...logLines];
                
            if (lines.length === 0) {
                vscode.window.showInformationMessage(`Ricwiz: No modified files found for ${sanitizedTarget}.`);
                return;
            }

            const uniqueFiles = Array.from(new Set(lines)).sort();

            const groups: Record<string, string[]> = {};
            for (const file of uniqueFiles) {
                const match = file.match(/default\/([^/]+)/);
                const groupName = match && match[1] ? match[1].toUpperCase() : 'OUTROS';
                if (!groups[groupName]) {
                    groups[groupName] = [];
                }
                groups[groupName].push(file);
            }

            let output = `Files modified in branch ${sanitizedTarget}:\n`;
            
            const sortedGroupNames = Object.keys(groups).sort();
            for (const group of sortedGroupNames) {
                output += `\n=== ${group} ===\n`;
                output += groups[group].join('\n') + '\n';
            }

            const doc = await vscode.workspace.openTextDocument({
                content: output,
                language: 'plaintext'
            });
            await vscode.window.showTextDocument(doc);
            
        } catch (e: any) {
            vscode.window.showErrorMessage(`Ricwiz: Error running git log - ${e.message}`);
        }
    });
}
