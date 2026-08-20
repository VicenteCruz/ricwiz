import * as vscode from 'vscode';
import { exec, getWorkspaceCwd, getCurrentBranch } from '../git';

export async function listTicketFiles(): Promise<void> {
    const cwd = getWorkspaceCwd();
    if (!cwd) {
        vscode.window.showErrorMessage('Ricwiz: Open a folder or workspace that is a Git repository.');
        return;
    }

    let currentBranch = '';
    try {
        currentBranch = await getCurrentBranch(cwd);
    } catch (e) {}

    const config = vscode.workspace.getConfiguration('ricwiz');
    const sourceBranch = config.get<string>('ticketSourceBranch', 'main');

    const targetBranch = await vscode.window.showInputBox({
        prompt: `Enter the branch name to list modified files (compared to ${sourceBranch})`,
        value: currentBranch,
        placeHolder: 'SFPSCA-1234'
    });

    if (!targetBranch) {
        return; // User cancelled
    }

    await vscode.window.withProgress({
        location: vscode.ProgressLocation.Notification,
        title: `Ricwiz: Finding files for ${targetBranch}...`,
        cancellable: false
    }, async () => {
        try {
            // Find merge-base
            let mergeBase = '';
            try {
                const { stdout } = await exec(`git merge-base origin/${sourceBranch} ${targetBranch}`, { cwd });
                mergeBase = stdout.trim();
            } catch {
                try {
                    const { stdout } = await exec(`git merge-base ${sourceBranch} ${targetBranch}`, { cwd });
                    mergeBase = stdout.trim();
                } catch {
                    vscode.window.showErrorMessage(`Ricwiz: Could not find common ancestor between ${sourceBranch} and ${targetBranch}`);
                    return;
                }
            }

            const { stdout } = await exec(`git diff --name-only ${mergeBase} ${targetBranch}`, { cwd, maxBuffer: 10 * 1024 * 1024 });
            
            const lines = stdout.split('\n')
                .map(l => l.trim())
                .filter(l => l.length > 0);
                
            if (lines.length === 0) {
                vscode.window.showInformationMessage(`Ricwiz: No modified files found in ${targetBranch} compared to ${sourceBranch}.`);
                return;
            }

            const uniqueFiles = Array.from(new Set(lines)).sort();

            // Group-Object { if ($_ -match 'default/([^/]+)') { $matches[1].ToUpper() } else { 'OUTROS' } }
            const groups: Record<string, string[]> = {};
            for (const file of uniqueFiles) {
                const match = file.match(/default\/([^/]+)/);
                const groupName = match && match[1] ? match[1].toUpperCase() : 'OUTROS';
                if (!groups[groupName]) {
                    groups[groupName] = [];
                }
                groups[groupName].push(file);
            }

            // ForEach-Object { "`n=== $($.Name) ===`n" + ($.Group -join "`n") }
            let output = `Files modified in branch ${targetBranch}:\n`;
            
            // Sort group names
            const sortedGroupNames = Object.keys(groups).sort();
            
            for (const group of sortedGroupNames) {
                output += `\n=== ${group} ===\n`;
                output += groups[group].join('\n') + '\n';
            }

            // Open in an untitled text document so the user can easily read and copy it
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
