import * as vscode from 'vscode';
import { exec, getWorkspaceCwd, getCurrentBranch, promptForTicketId } from '../git';

export async function deleteUnusedBranches(): Promise<void> {
    const cwd = getWorkspaceCwd();
    if (!cwd) {
        vscode.window.showErrorMessage('Ricwiz: Open a folder or workspace that is a Git repository.');
        return;
    }

    const result = await promptForTicketId(cwd, {
        prompt: 'Enter the full ticket ID whose unused branches you want to clean up (e.g., SCPSCA-1234) or just the number'
    });
    if (!result) return;
    const { ticketId } = result;
    let currentBranch = result.currentBranch;

    const config = vscode.workspace.getConfiguration('ricwiz');

    await vscode.window.withProgress({
        location: vscode.ProgressLocation.Notification,
        title: `Ricwiz: Scanning branches for ${ticketId}...`,
        cancellable: false
    }, async () => {
        // Fetch and prune to update remote tracking info
        try { await exec('git fetch --prune', { cwd }); } catch(e) {}

        // Find local branches matching the ticket
        let localBranches: string[] = [];
        try {
            const { stdout } = await exec(`git branch --list "*${ticketId}*"`, { cwd });
            localBranches = stdout.split('\n')
                .map((b: string) => b.replace('*', '').trim())
                .filter((b: string) => b.length > 0);
        } catch(e) {}

        if (localBranches.length === 0) {
            vscode.window.showInformationMessage(`Ricwiz: No local branches found for ${ticketId}.`);
            return;
        }

        // Find remote branches matching the ticket
        let remoteBranchNames: string[] = [];
        try {
            const { stdout } = await exec(`git branch -r --list "*${ticketId}*"`, { cwd });
            remoteBranchNames = stdout.split('\n')
                .map((b: string) => b.trim().replace(/^origin\//, ''))
                .filter((b: string) => b.length > 0 && !b.includes('->'));
        } catch(e) {}

        // Filter: keep only local branches that do NOT exist on remote
        const orphanedBranches = localBranches.filter(b => !remoteBranchNames.includes(b));

        if (orphanedBranches.length === 0) {
            vscode.window.showInformationMessage(`Ricwiz: All local branches for ${ticketId} still exist on the remote. Nothing to clean up.`);
            return;
        }

        // Show which branches will be deleted
        const items: vscode.QuickPickItem[] = orphanedBranches.map(name => ({
            label: name,
            description: name === currentBranch ? 'current branch — will switch away first' : 'no longer on remote',
            picked: name !== currentBranch
        }));

        const selected = await vscode.window.showQuickPick(items, {
            canPickMany: true,
            placeHolder: `These local branches no longer exist on the remote. Select which to delete:`,
            title: 'Ricwiz: Delete Unused Branches'
        });

        if (!selected || selected.length === 0) {
            vscode.window.showInformationMessage('Ricwiz: No branches selected for deletion.');
            return;
        }

        // Final confirmation
        const branchList = selected.map(s => s.label).join(', ');
        const confirm = await vscode.window.showWarningMessage(
            `Ricwiz: Delete ${selected.length} local branch(es)?\n${branchList}`,
            { modal: true },
            'Yes, delete them'
        );

        if (confirm !== 'Yes, delete them') {
            vscode.window.showInformationMessage('Ricwiz: Deletion cancelled.');
            return;
        }

        let deleted = 0;
        for (const item of selected) {
            const name = item.label;

            // If on this branch, switch away first
            if (name === currentBranch) {
                const fallbackBranch = config.get<string>('ticketSourceBranch', 'main');
                try {
                    await exec(`git checkout ${fallbackBranch}`, { cwd });
                    currentBranch = fallbackBranch;
                } catch(e) {
                    vscode.window.showWarningMessage(`Ricwiz: Could not switch away from ${name}. Skipping.`);
                    continue;
                }
            }

            try {
                await exec(`git branch -D ${name}`, { cwd });
                deleted++;
            } catch(e) {
                vscode.window.showWarningMessage(`Ricwiz: Could not delete local branch ${name}.`);
            }
        }

        vscode.window.showInformationMessage(`Ricwiz: 🗑️ Cleaned up ${deleted} unused local branch(es) for ${ticketId}.`);
    });
}
