import * as vscode from 'vscode';
import { exec, getWorkspaceCwd, promptForTicketId, checkBranchExists, getCurrentBranch } from '../git';
import { EnvironmentConfig } from '../types';

export async function prepareDeploy(): Promise<void> {
    const cwd = getWorkspaceCwd();
    if (!cwd) {
        vscode.window.showErrorMessage('Ricwiz: Open a folder or workspace that is a Git repository.');
        return;
    }

    try {
        await exec('git status', { cwd });
    } catch (e) {
        vscode.window.showErrorMessage('Ricwiz: The opened folder does not appear to be a valid Git repository.');
        return;
    }

    const config = vscode.workspace.getConfiguration('ricwiz');
    const environments = config.get<EnvironmentConfig[]>('environments', [
        { name: 'Qual', sourceBranch: 'quality' },
        { name: 'Val', sourceBranch: 'validation' },
        { name: 'Prod', sourceBranch: 'main' }
    ]);

    const result = await promptForTicketId(cwd);
    if (!result) {
        vscode.window.showErrorMessage('Operation cancelled: Ticket not provided.');
        return;
    }
    const { ticketId, currentBranch } = result;
    const mainBranch = ticketId;

    // Verify the main branch exists
    if (!(await checkBranchExists(cwd, mainBranch))) {
        vscode.window.showErrorMessage(`Ricwiz: Main branch '${mainBranch}' does not exist! Prepare deploy is only available when a main ticket branch is used.`);
        return;
    }

    await vscode.window.withProgress({
        location: vscode.ProgressLocation.Notification,
        title: "Ricwiz: Preparing Deploy",
        cancellable: true
    }, async (progress, token) => {
        let successCount = 0;
        const originalBranch = currentBranch;
        let abortRequested = false;

        token.onCancellationRequested(() => {
            abortRequested = true;
        });

        progress.report({ message: 'Auto-syncing base branches...', increment: 10 });
        
        try {
            await exec('git fetch', { cwd });
            const envSyncStep = 20 / (environments.length || 1);
            for (const env of environments) {
                try {
                    if (abortRequested) throw new Error('Aborted');
                    progress.report({ message: `Fetching ${env.sourceBranch}...`, increment: envSyncStep });
                    await exec(`git fetch origin ${env.sourceBranch}:${env.sourceBranch}`, { cwd });
                } catch(e) {}
            }
        } catch(e) {}

        const processStep = 60 / (environments.length || 1);

        const handleMergeConflict = async (sourceStr: string, targetStr: string) => {
            progress.report({ message: `CONFLICT! Resolve & click 'Commit & Continue'.` });
            
            let isResolved = false;

            const getDeletionConflicts = async () => {
                try {
                    const { stdout } = await exec('git status --porcelain', { cwd });
                    return stdout.split('\n')
                        .filter((line: string) => {
                            const state = line.substring(0, 2);
                            return ['UD', 'DU', 'DD'].includes(state);
                        })
                        .map((line: string) => line.substring(3).trim());
                } catch(e) {
                    return [];
                }
            };

            const showConflictNotification = async () => {
                if (isResolved) return;

                const deletions = await getDeletionConflicts();
                const buttons = ['Commit & Continue'];
                if (deletions.length > 0) {
                    buttons.push('Resolve Deletions...');
                }
                buttons.push('Abort Deploy');

                vscode.window.showWarningMessage(
                    `Ricwiz: CONFLICT! Merging ${sourceStr} into ${targetStr}. Resolve the conflicts in your editor, then click "Commit & Continue".`,
                    ...buttons
                ).then(async selection => {
                    if (isResolved) return;

                    if (selection === 'Abort Deploy') {
                        abortRequested = true;
                    } else if (selection === 'Resolve Deletions...') {
                        try {
                            const { stdout } = await exec('git status --porcelain', { cwd });
                            const unmerged = stdout.split('\n')
                                .filter((line: string) => {
                                    const state = line.substring(0, 2);
                                    return ['UU', 'AA', 'UD', 'DU', 'AU', 'UA', 'DD'].includes(state);
                                })
                                .map((line: string) => line.substring(3).trim());

                            if (unmerged.length === 0) {
                                vscode.window.showInformationMessage('Ricwiz: No conflicted files found.');
                            } else {
                                const items = unmerged.map((file: string) => ({ label: file }));
                                const selected = await vscode.window.showQuickPick(items, {
                                    canPickMany: true,
                                    placeHolder: 'Select conflicted files you want to DELETE to resolve them',
                                    title: 'Ricwiz: Delete Conflicted Files'
                                });

                                if (selected && selected.length > 0) {
                                    for (const item of selected) {
                                        try {
                                            await exec(`git rm --force "${item.label}"`, { cwd });
                                        } catch(e) {}
                                    }
                                    vscode.window.showInformationMessage(`Ricwiz: Deleted ${selected.length} conflicted file(s).`);
                                }
                            }
                        } catch (e: any) {
                            vscode.window.showErrorMessage(`Ricwiz: Error reading conflicts. (${e.message})`);
                        }
                        showConflictNotification(); // Re-show so they can Commit & Continue
                    } else if (selection === 'Commit & Continue') {
                        try {
                            // Safety check for leftover markers
                            let hasMarkers = false;
                            try {
                                const { stdout } = await exec(`git grep -E "^<<<<<<< "`, { cwd });
                                if (stdout.trim().length > 0) hasMarkers = true;
                            } catch(e) {
                                // git grep exits with 1 if no matches (which means no markers, we're good)
                            }
                            if (hasMarkers) {
                                vscode.window.showErrorMessage('Ricwiz: You still have unresolved conflict markers (<<<<<<<) in your files. Please resolve them first!');
                                showConflictNotification();
                                return;
                            }

                            await exec('git add .', { cwd });
                            await exec('git commit --no-edit', { cwd });
                        } catch (e: any) {
                            vscode.window.showErrorMessage(`Ricwiz: Could not commit automatically. (${e.message})`);
                            showConflictNotification(); // Re-show so they can try again
                        }
                    }
                });
            };

            showConflictNotification();

            while (true) {
                if (abortRequested) {
                    try { await exec('git merge --abort', { cwd }); } catch(err) {}
                    isResolved = true;
                    throw new Error('Deploy aborted by user.');
                }
                
                try {
                    const { stdout } = await exec('git status --porcelain', { cwd });
                    if (stdout.trim().length === 0) {
                        isResolved = true;
                        vscode.window.showInformationMessage(`Ricwiz: Changes committed! Resuming deploy...`);
                        break; // Working tree clean, meaning they committed!
                    }
                } catch (e) {}

                await new Promise(resolve => setTimeout(resolve, 2000));
            }
        };

        for (const env of environments) {
            if (abortRequested) break;

            const targetBranch = `${ticketId}-to-${env.name}`;
            const sourceBranch = env.sourceBranch;

            try {
                progress.report({ message: `Processing ${targetBranch}...`, increment: processStep / 4 });
                // Switch to environment branch
                await exec(`git checkout ${targetBranch}`, { cwd });
                
                // Pull to ensure we have the latest remote state
                try {
                    await exec(`git pull origin ${targetBranch}`, { cwd });
                } catch (e) {} // Ignore if it fails
                
                // 1. Merge the source branch (e.g. quality) to keep it up to date
                try {
                    progress.report({ message: `Merging ${sourceBranch} into ${targetBranch}...`, increment: processStep / 4 });
                    await exec(`git fetch origin ${sourceBranch}`, { cwd });
                    await exec(`git merge origin/${sourceBranch}`, { cwd });
                } catch (e: any) {
                    let isConflict = false;
                    try {
                        const { stdout } = await exec('git ls-files -u', { cwd });
                        if (stdout.trim().length > 0) isConflict = true;
                    } catch(err) {}
                    
                    const errStr = ((e.stdout || '') + (e.stderr || '') + (e.message || '')).toLowerCase();
                    if (isConflict || errStr.includes('conflict') || errStr.includes('conflit')) {
                        await handleMergeConflict(`origin/${sourceBranch}`, targetBranch);
                    } else {
                        throw e;
                    }
                }

                // 2. Merge the main branch (the ticket changes)
                try {
                    progress.report({ message: `Merging ${mainBranch} into ${targetBranch}...`, increment: processStep / 4 });
                    await exec(`git merge ${mainBranch}`, { cwd });
                } catch (e: any) {
                    let isConflict = false;
                    try {
                        const { stdout } = await exec('git ls-files -u', { cwd });
                        if (stdout.trim().length > 0) isConflict = true;
                    } catch(err) {}
                    
                    const errStr = ((e.stdout || '') + (e.stderr || '') + (e.message || '')).toLowerCase();
                    if (isConflict || errStr.includes('conflict') || errStr.includes('conflit')) {
                        await handleMergeConflict(mainBranch, targetBranch);
                    } else {
                        throw e;
                    }
                }
                
                if (abortRequested) break;

                // 3. Push to remote
                progress.report({ message: `Pushing ${targetBranch}...`, increment: processStep / 4 });
                await exec(`git push origin ${targetBranch}`, { cwd });
                
                successCount++;
            } catch (e: any) {
                if (e.message.includes('aborted')) {
                    vscode.window.showInformationMessage('Ricwiz: Deploy cancelled.');
                } else {
                    vscode.window.showErrorMessage(`Ricwiz: Failed to process branch ${targetBranch}. Detail: ${e.message}`);
                }
                return; // Stop execution
            }
        }

        if (!abortRequested) {
            progress.report({ message: 'Finishing up...', increment: 10 });
            
            // Prioritize returning to the main branch of the ticket
            let targetReturnBranch = originalBranch;
            try {
                await exec(`git show-ref --verify --quiet refs/heads/${mainBranch}`, { cwd });
                targetReturnBranch = mainBranch;
            } catch(e) {}

            try {
                const current = await getCurrentBranch(cwd);
                if (targetReturnBranch && targetReturnBranch !== current) {
                    await exec(`git checkout ${targetReturnBranch}`, { cwd });
                    vscode.window.showInformationMessage(`Ricwiz: Operation complete. Back on branch ${targetReturnBranch}.`);
                } else {
                    vscode.window.showInformationMessage(`Ricwiz: Operation complete.`);
                }
            } catch (e) {
                vscode.window.showInformationMessage(`Ricwiz: Operation complete.`);
            }
        }
    });
}
