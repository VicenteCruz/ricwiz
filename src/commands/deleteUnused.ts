import * as vscode from 'vscode';
import { exec, getWorkspaceCwd, getCurrentBranch, promptForTicketId } from '../git';

export async function deleteUnusedBranches(): Promise<void> {
    const cwd = getWorkspaceCwd();
    if (!cwd) {
        vscode.window.showErrorMessage('Ricwiz: Open a folder or workspace that is a Git repository.');
        return;
    }

    let currentBranch = await getCurrentBranch(cwd);
    const config = vscode.workspace.getConfiguration('ricwiz');

    await vscode.window.withProgress({
        location: vscode.ProgressLocation.Notification,
        title: `Ricwiz: Scanning for unused local branches...`,
        cancellable: false
    }, async () => {
        // Fetch and prune to update remote tracking info
        try { await exec('git fetch --prune', { cwd }); } catch(e) {}

        // Find all local branches
        let localBranches: string[] = [];
        try {
            const { stdout } = await exec(`git branch --format="%(refname:short)"`, { cwd });
            localBranches = stdout.split('\n').map((b: string) => b.trim()).filter((b: string) => b.length > 0);
        } catch(e) {}

        if (localBranches.length === 0) {
            vscode.window.showInformationMessage(`Ricwiz: No local branches found.`);
            return;
        }

        // Find all remote branches
        let remoteBranchNames: string[] = [];
        try {
            const { stdout } = await exec(`git branch -r --format="%(refname:short)"`, { cwd });
            remoteBranchNames = stdout.split('\n')
                .map((b: string) => b.trim().replace(/^origin\//, '').replace(/^[^\/]+\//, '')) // handle origin/ and other remotes
                .filter((b: string) => b.length > 0 && !b.includes('HEAD'));
        } catch(e) {}

        // Find local branches that track a [gone] remote
        let goneBranches: string[] = [];
        try {
            const { stdout } = await exec(`git for-each-ref --format="%(refname:short)|||%(upstream:track)" refs/heads/`, { cwd });
            goneBranches = stdout.split('\n')
                .filter((line: string) => line.includes('[gone]'))
                .map((line: string) => line.split('|||')[0].trim());
        } catch(e) {}

        // Filter: keep only local branches that do NOT exist on remote
        const orphanedBranches = localBranches.filter(b => !remoteBranchNames.includes(b));

        if (orphanedBranches.length === 0) {
            vscode.window.showInformationMessage(`Ricwiz: Your local repository is totally clean! All local branches exist on the remote.`);
            return;
        }

        // Show which branches will be deleted
        const items: vscode.QuickPickItem[] = orphanedBranches.map(name => {
            const isGone = goneBranches.includes(name);
            const isCurrent = name === currentBranch;
            let description = 'Not found on remote';
            if (isGone) description = 'Deleted on remote [gone]';
            if (isCurrent) description += ' (Current branch - will checkout main first)';

            return {
                label: name,
                description,
                // Automatically select branches that we KNOW were deleted on remote (gone)
                picked: isGone && !isCurrent
            };
        });

        const selected = await vscode.window.showQuickPick(items, {
            canPickMany: true,
            placeHolder: `Select local branches to delete`,
            title: 'Ricwiz: Delete Unused Branches'
        });

        if (!selected || selected.length === 0) {
            vscode.window.showInformationMessage('Ricwiz: No branches selected for deletion.');
            return;
        }

        // Final confirmation
        const confirm = await vscode.window.showWarningMessage(
            `Ricwiz: Delete ${selected.length} local branch(es)?\nThis cannot be undone!`,
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
                const fallbackBranch = config.get<string>('ticketSourceBranch', 'master');
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

        vscode.window.showInformationMessage(`Ricwiz: 🗑️ Cleaned up ${deleted} unused local branch(es).`);
    });
}
