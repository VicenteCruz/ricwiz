import * as vscode from 'vscode';
import { exec, getWorkspaceCwd, promptForTicketId, checkBranchExists } from '../git';
import { EnvironmentConfig } from '../types';

import { Security } from '../security';
import { WorkflowContext } from '../workflows/WorkflowContext';

export async function createBranches(): Promise<void> {
    const cwd = getWorkspaceCwd();
    if (!cwd) {
        vscode.window.showErrorMessage('Open a folder or workspace that is a Git repository.');
        return;
    }

    const ctx = await WorkflowContext.initialize(cwd);
    if (!ctx) return;

    const result = await promptForTicketId(cwd, { prefix: ctx.ticketPrefix });
    if (!result) {
        vscode.window.showErrorMessage('Branch creation cancelled: Ticket not provided.');
        return;
    }
    const { ticketId } = result;

    const environments = ctx.environments;
    let selectedOptionValue = 'all';

    if (environments.length > 0) {
        const createOptions = [
            { label: 'Create Main Branch & Environments', description: 'Creates the main ticket branch and all environment branches', value: 'all' },
            { label: 'Create Environments Only', description: 'Creates only the environment branches (skip main branch)', value: 'envs' }
        ];

        const selectedOption = await vscode.window.showQuickPick(createOptions, {
            placeHolder: 'What branches do you want to create?',
            title: 'Ricwiz Branch Creation'
        });

        if (!selectedOption) {
            vscode.window.showInformationMessage('Branch creation cancelled.');
            return;
        }
        selectedOptionValue = selectedOption.value;
    }

    let sourceBranchForTicket = ctx.ticketSourceBranch;
    if (selectedOptionValue === 'all') {
        let branches: string[] = [];
        try {
            const { stdout } = await exec(`git branch --all --format="%(refname:short)"`, { cwd });
            branches = stdout.split('\n')
                .map(b => b.trim())
                .filter(b => b && b !== 'origin');
            branches = [...new Set(branches)];
        } catch(e) {}

        const userInput = await new Promise<string | undefined>((resolve) => {
            const quickPick = vscode.window.createQuickPick();
            quickPick.title = 'Ricwiz: Ticket Source Branch';
            quickPick.placeholder = 'Confirm or change the source branch for this ticket';
            quickPick.value = ctx.ticketSourceBranch;
            quickPick.ignoreFocusOut = true;
            
            const updateItems = () => {
                const val = quickPick.value.trim();
                const items: vscode.QuickPickItem[] = [];
                
                if (val) {
                    items.push({
                        label: val,
                        description: 'Use typed branch'
                    });
                }
                
                branches.forEach(b => {
                    if (b === val) return;
                    if (!val || b.toLowerCase().includes(val.toLowerCase())) {
                        items.push({
                            label: b,
                            description: b.startsWith('origin/') || b.includes('/') ? 'Remote branch' : 'Local branch'
                        });
                    }
                });
                
                quickPick.items = items;
            };

            quickPick.onDidChangeValue(() => updateItems());
            
            quickPick.onDidAccept(() => {
                const selection = quickPick.selectedItems[0];
                if (selection) {
                    quickPick.hide();
                    resolve(selection.label);
                } else if (quickPick.value.trim()) {
                    quickPick.hide();
                    resolve(quickPick.value.trim());
                }
            });

            quickPick.onDidHide(() => {
                quickPick.dispose();
                resolve(undefined);
            });

            updateItems();
            quickPick.show();
        });
        
        if (!userInput) {
            vscode.window.showInformationMessage('Branch creation cancelled.');
            return;
        }
        sourceBranchForTicket = userInput.trim();
    }

    const mainBranch = ticketId;

    // Validate inputs to prevent command injection
    if (!Security.isValidShellArg(mainBranch)) {
        vscode.window.showErrorMessage(`Invalid format for ticket ID: ${mainBranch}`);
        return;
    }
    if (!Security.isValidShellArg(sourceBranchForTicket)) {
        vscode.window.showErrorMessage(`Invalid format for ticketSourceBranch in settings: ${sourceBranchForTicket}`);
        return;
    }
    for (const env of environments) {
        if (!Security.isValidShellArg(env.name)) {
            vscode.window.showErrorMessage(`Invalid format for environment name in settings: ${env.name}`);
            return;
        }
        if (!Security.isValidShellArg(env.sourceBranch)) {
            vscode.window.showErrorMessage(`Invalid format for environment sourceBranch in settings: ${env.sourceBranch}`);
            return;
        }
    }

    try {
        await exec('git status', { cwd });
    } catch (e) {
        vscode.window.showErrorMessage('The opened folder does not appear to be a valid Git repository.');
        return;
    }

    try {
        await vscode.window.withProgress({
            location: vscode.ProgressLocation.Notification,
            title: "Ricwiz: Creating Branches",
            cancellable: false
        }, async (progress) => {
            const createdLocalBranches: string[] = [];
            progress.report({ message: 'Checking remote status (git fetch)...', increment: 10 });

            try {
                await exec('git fetch', { cwd });
            } catch (e) {
                // May fail if offline, continue anyway
            }

            try {
                // 1. Create main ticket branch (if requested)
                if (selectedOptionValue === 'all') {
                    progress.report({ message: `Creating main branch ${mainBranch}...`, increment: 10 });
                    if (await checkBranchExists(cwd, mainBranch)) {
                        vscode.window.showInformationMessage(`Ricwiz: The branch ${mainBranch} already exists. Skipping creation...`);
                        await exec(`git checkout ${mainBranch}`, { cwd });
                    } else {
                        try {
                            const fetchRemote = ctx.getFetchRemote(sourceBranchForTicket);
                            const fetchBranch = ctx.getFetchBranch(sourceBranchForTicket);
                            const fullUpstreamPath = ctx.buildUpstreamPath(sourceBranchForTicket);
                            
                            await exec(`git fetch ${fetchRemote} ${fetchBranch}`, { cwd });
                            await exec(`git checkout -b ${mainBranch} ${fullUpstreamPath}`, { cwd });
                            createdLocalBranches.push(mainBranch);
                        } catch (e: any) {
                            try {
                                await exec(`git checkout -b ${mainBranch} ${sourceBranchForTicket}`, { cwd });
                                createdLocalBranches.push(mainBranch);
                            } catch(err: any) {
                                throw new Error(`Could not create main branch '${mainBranch}' from '${sourceBranchForTicket}'. Does the source branch exist?`);
                            } 
                        }
                    }
                }

                // 2. Create environment branches based on configured source branches
                const envProgressStep = 50 / (environments.length || 1);
                for (const env of environments) {
                    const envBranchName = `${ticketId}-to-${env.name}`;
                    const sourceBranch = env.sourceBranch;

                    progress.report({ message: `Processing environment branch ${envBranchName}...`, increment: envProgressStep });

                    if (await checkBranchExists(cwd, envBranchName)) {
                        // Already exists, skip
                    } else {
                        try {
                            const fullUpstreamPath = ctx.buildUpstreamPath(sourceBranch);
                            await exec(`git checkout -b ${envBranchName} ${fullUpstreamPath}`, { cwd });
                            createdLocalBranches.push(envBranchName);
                        } catch (e: any) {
                            try {
                                await exec(`git checkout -b ${envBranchName} ${sourceBranch}`, { cwd });
                                createdLocalBranches.push(envBranchName);
                            } catch(err: any) {
                                throw new Error(`Could not create environment branch '${envBranchName}' from '${sourceBranch}'. Does the source branch exist?`);
                            }
                        }
                    }
                }

                // 3. Publish (push) all branches only at the end
                progress.report({ message: `Publishing branches to ${ctx.originRemote}...`, increment: 10 });
                for (const b of createdLocalBranches) {
                    try { 
                        await exec(`git push -u ${ctx.originRemote} ${b}`, { cwd }); 
                    } catch(e){
                        vscode.window.showWarningMessage(`Ricwiz: Branch ${b} was created locally but could not be pushed to ${ctx.originRemote}.`);
                    } 
                }

                // 4. Switch back to the main branch at the end
                if (selectedOptionValue === 'all') {
                    progress.report({ message: `Switching to ${mainBranch}...`, increment: 10 });
                    try {
                        await exec(`git checkout ${mainBranch}`, { cwd });
                    } catch (e: any) {}
                }

                progress.report({ increment: 100 });
                vscode.window.showInformationMessage(`Ricwiz: All set! You can start working on your branches! 🚀`);

            } catch (err: any) {
                // Rollback any branches created locally during this process
                vscode.window.showErrorMessage(`Ricwiz Branch Creation Failed: ${err.message}`);
                
                if (createdLocalBranches.length > 0) {
                    // Try to checkout the source branch so we can delete the created branches safely
                    try { await exec(`git checkout ${sourceBranchForTicket}`, { cwd }); } catch(e){}
                    
                    for (const b of createdLocalBranches) {
                        try {
                            await exec(`git branch -D ${b}`, { cwd });
                        } catch(e) {}
                    }
                    vscode.window.showWarningMessage(`Ricwiz: Rolled back (deleted) ${createdLocalBranches.length} branch(es) locally due to failure.`);
                }
            }
        });
        
    } catch (error: any) {
        vscode.window.showErrorMessage(`Ricwiz general error: ${error.message}`);
    }
}

