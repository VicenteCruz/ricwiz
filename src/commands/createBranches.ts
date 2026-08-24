import * as vscode from 'vscode';
import { exec, getWorkspaceCwd, promptForTicketId, checkBranchExists } from '../git';
import { EnvironmentConfig } from '../types';

import { Security } from '../security';
import { WorkflowContext } from '../workflows/WorkflowContext';

export async function createBranches(prefilledTicket?: any): Promise<void> {
    const cwd = getWorkspaceCwd();
    if (!cwd) {
        vscode.window.showErrorMessage('Open a folder or workspace that is a Git repository.');
        return;
    }

    const ctx = await WorkflowContext.initialize(cwd, { forcePrompt: true });
    if (!ctx) return;

    const suggestedTicket = typeof prefilledTicket === 'string' ? prefilledTicket : undefined;
    const result = await promptForTicketId(cwd, { prefix: ctx.ticketPrefix, suggestedValue: suggestedTicket });
    if (!result) {
        vscode.window.showErrorMessage('Branch creation cancelled: Ticket not provided.');
        return;
    }
    const { ticketId } = result;

    const environments = ctx.environments;
    let selectedOptionValue = 'all';

    const quickPickOptions: vscode.QuickPickItem[] = [
        { label: 'Create Main Branch & Environments', description: 'Creates the main ticket branch and all environment branches', value: 'all' } as any,
        { label: 'Create Main Branch Only', description: 'Creates only the main ticket branch (skips environments)', value: 'mainOnly' } as any,
        { label: 'Create Environments Only', description: 'Creates only the environment branches (skip main branch)', value: 'envs' } as any
    ];

    if (environments.length > 0) {
        const selectedOption = await vscode.window.showQuickPick(quickPickOptions, {
            placeHolder: 'Ricwiz: What do you want to create?',
            ignoreFocusOut: true
        });

        if (!selectedOption) {
            return;
        }
        selectedOptionValue = (selectedOption as any).value;
    }

    let sourceBranchForTicket = ctx.ticketSourceBranch;
    if (selectedOptionValue === 'all' || selectedOptionValue === 'mainOnly') {
        let branches: string[] = [];
        try {
            const { stdout } = await exec(`git branch --all --format="%(refname:short)"`, { cwd });
            branches = stdout.split('\n')
                .map(b => b.trim())
                .filter(b => b && b !== 'origin');
            branches = [...new Set(branches)];
        } catch(e) {}

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
            items.push(...branches.map(b => ({ label: b })));
            quickPick.items = items;
        };

        quickPick.onDidChangeValue(updateItems);
        updateItems();

        const userInput = await new Promise<string | undefined>(resolve => {
            quickPick.onDidAccept(() => {
                const selected = quickPick.selectedItems[0];
                resolve(selected ? selected.label : quickPick.value);
                quickPick.hide();
            });
            quickPick.onDidHide(() => resolve(undefined));
            quickPick.show();
        });

        if (!userInput) {
            vscode.window.showInformationMessage('Branch creation cancelled.');
            return;
        }
        sourceBranchForTicket = userInput.trim();
    }

    let actualBranchPrefix = '';
    if (ctx.branchPrefix) {
        const prefixInput = await vscode.window.showInputBox({
            prompt: 'Ricwiz: Branch Prefix (leave empty to not use a prefix)',
            placeHolder: 'e.g. CRC-R19-',
            value: ctx.branchPrefix,
            ignoreFocusOut: true
        });
        if (prefixInput === undefined) {
            vscode.window.showInformationMessage('Branch creation cancelled.');
            return;
        }
        actualBranchPrefix = prefixInput.trim();
    }

    const mainBranch = actualBranchPrefix ? `${actualBranchPrefix}${ticketId}` : ticketId;

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
                if (selectedOptionValue === 'all' || selectedOptionValue === 'mainOnly') {
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

                    // Save the actual source branch used for this ticket into git config
                    // so that the Merge Request command knows exactly where it came from!
                    try {
                        await exec(`git config branch.${mainBranch}.ricwiz-source "${sourceBranchForTicket}"`, { cwd });
                        
                        if (ctx.profileName) {
                            await exec(`git config branch.${mainBranch}.ricwiz-profile "${ctx.profileName}"`, { cwd });
                        }
                    } catch(e) {}
                }

                // 2. Create environment branches based on configured source branches
                if (selectedOptionValue === 'all' || selectedOptionValue === 'envs') {
                    const envProgressStep = 50 / (environments.length || 1);
                    for (const env of environments) {
                        const envBranchName = actualBranchPrefix ? `${actualBranchPrefix}${ticketId}-to-${env.name}` : `${ticketId}-to-${env.name}`;
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
                if (selectedOptionValue === 'all' || selectedOptionValue === 'mainOnly') {
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

