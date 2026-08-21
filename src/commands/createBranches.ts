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

    const config = vscode.workspace.getConfiguration('ricwiz');
    const ctx = new WorkflowContext();

    const result = await promptForTicketId(cwd);
    if (!result) {
        vscode.window.showErrorMessage('Branch creation cancelled: Ticket not provided.');
        return;
    }
    const { ticketId } = result;

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

    const sourceBranchForTicket = config.get<string>('ticketSourceBranch', 'main');
    const environments = config.get<EnvironmentConfig[]>('environments', [
        { name: 'Qual', sourceBranch: 'quality' },
        { name: 'Val', sourceBranch: 'validation' },
        { name: 'Prod', sourceBranch: 'main' }
    ]);

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
                // 1. Create the main branch from the configured source branch (e.g. main)
                if (selectedOption.value === 'all') {
                    progress.report({ message: `Creating main branch ${mainBranch}...`, increment: 20 });
                    if (await checkBranchExists(cwd, mainBranch)) {
                        vscode.window.showInformationMessage(`Ricwiz: The branch ${mainBranch} already exists. Skipping creation...`);
                        await exec(`git checkout ${mainBranch}`, { cwd });
                    } else {
                        try {
                            await exec(`git fetch ${ctx.upstreamRemote} ${sourceBranchForTicket}`, { cwd });
                            await exec(`git checkout -b ${mainBranch} ${ctx.upstreamRemote}/${sourceBranchForTicket}`, { cwd });
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
                            await exec(`git checkout -b ${envBranchName} ${ctx.upstreamRemote}/${sourceBranch}`, { cwd });
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
                if (selectedOption.value === 'all') {
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
