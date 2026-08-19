import * as vscode from 'vscode';
import { exec, getWorkspaceCwd, getCurrentBranch } from '../git';

export async function listTicketFiles(): Promise<void> {
    const cwd = getWorkspaceCwd();
    if (!cwd) {
        vscode.window.showErrorMessage('Ricwiz: Open a folder or workspace that is a Git repository.');
        return;
    }

    // Try to extract a ticket number from current branch (e.g. SFPSC-19271 -> 19271)
    let defaultTicket = '';
    try {
        const currentBranch = await getCurrentBranch(cwd);
        const match = currentBranch.match(/\d+/);
        if (match) {
            defaultTicket = match[0];
        }
    } catch (e) {}

    const ticketId = await vscode.window.showInputBox({
        prompt: 'Enter the ticket ID to search for (e.g. 19271)',
        value: defaultTicket,
        placeHolder: '19271'
    });

    if (!ticketId) {
        return; // User cancelled
    }

    await vscode.window.withProgress({
        location: vscode.ProgressLocation.Notification,
        title: `Ricwiz: Finding files for ticket ${ticketId}...`,
        cancellable: false
    }, async () => {
        try {
            // Equivalent to: git --no-pager log --grep="19271" --name-only -m --first-parent --format=""
            const { stdout } = await exec(`git --no-pager log --grep="${ticketId}" --name-only -m --first-parent --format=""`, { cwd, maxBuffer: 10 * 1024 * 1024 });
            
            // Where-Object { $_ -match '\w' } | Sort-Object -Unique
            const lines = stdout.split('\n')
                .map(l => l.trim())
                .filter(l => l.length > 0);
                
            if (lines.length === 0) {
                vscode.window.showInformationMessage(`Ricwiz: No files found for ticket ${ticketId}.`);
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
            let output = `Files modified in ticket ${ticketId}:\n`;
            
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
