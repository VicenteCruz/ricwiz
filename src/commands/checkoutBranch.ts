import * as vscode from 'vscode';
import { exec, getWorkspaceCwd, getCurrentBranch } from '../git';
import { WorkflowContext } from '../workflows/WorkflowContext';

export async function checkoutBranch(branchName: string): Promise<void> {
    const cwd = getWorkspaceCwd();
    if (!cwd) return;

    await vscode.window.withProgress({
        location: vscode.ProgressLocation.Notification,
        title: `Ricwiz: Switching to ${branchName}...`,
        cancellable: false
    }, async () => {
        try {
            // 1. Get current branch before checkout
            const currentBranch = await getCurrentBranch(cwd);

            // 2. Check for uncommitted changes (staged + unstaged + untracked)
            let hasChanges = false;
            try {
                const { stdout } = await exec('git status --porcelain', { cwd });
                hasChanges = stdout.trim().length > 0;
            } catch(e) {}

            // 3. Auto-stash if there are uncommitted changes
            if (hasChanges && currentBranch) {
                try {
                    await exec(`git stash push --include-untracked -m "ricwiz-auto:${currentBranch}"`, { cwd });
                    vscode.window.showInformationMessage(`Ricwiz: 📦 Stashed changes from ${currentBranch}`);
                } catch(e) {
                    vscode.window.showWarningMessage(`Ricwiz: Could not stash changes. Checkout may fail if there are conflicts.`);
                }
            }

            // 4. Checkout the target branch
            let targetLocalBranch = branchName;
            
            if (branchName.includes('/')) {
                // E.g., user clicked "upstream/uat"
                const parts = branchName.split('/');
                targetLocalBranch = parts.slice(1).join('/');
            }

            try {
                // Try checking out the local branch directly (Git's default magic)
                await exec(`git checkout ${targetLocalBranch}`, { cwd });
            } catch (e: any) {
                // If it fails, maybe it doesn't exist locally. Try to fetch and track from upstream.
                try {
                    const ctx = await WorkflowContext.initialize(cwd);
                    
                    if (ctx) {
                        const remotePrefix = branchName.includes('/') ? branchName.split('/')[0] : ctx.upstreamRemote;
                        await exec(`git fetch ${remotePrefix} ${targetLocalBranch}`, { cwd });
                        await exec(`git checkout -b ${targetLocalBranch} --track ${remotePrefix}/${targetLocalBranch}`, { cwd });
                    } else {
                        throw e; // Context failed, rethrow original error
                    }
                } catch (fallbackError) {
                    throw e; // Throw original error if fallback also fails
                }
            }

            // 5. Look for a saved stash for the new branch and restore it
            try {
                const { stdout } = await exec('git stash list', { cwd });
                const lines = stdout.split('\n');
                for (let i = 0; i < lines.length; i++) {
                    if (lines[i].includes(`ricwiz-auto:${targetLocalBranch}`)) {
                        const stashMatch = lines[i].match(/stash@\{(\d+)\}/);
                        if (stashMatch) {
                            await exec(`git stash pop stash@{${stashMatch[1]}}`, { cwd });
                            vscode.window.showInformationMessage(`Ricwiz: 📦 Restored stashed changes on ${targetLocalBranch}`);
                        }
                        break;
                    }
                }
            } catch(e) {
                vscode.window.showWarningMessage(`Ricwiz: Could not restore stashed changes on ${targetLocalBranch}. You may need to resolve conflicts manually (check git stash list).`);
            }

        } catch(e: any) {
            vscode.window.showErrorMessage(`Ricwiz: Could not checkout branch ${branchName}.`);
        }
    });
}
