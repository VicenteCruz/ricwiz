import * as vscode from 'vscode';
import { exec, getWorkspaceCwd, promptForTicketId, checkBranchExists } from '../git';
import { EnvironmentConfig } from '../types';

export async function createBranches(): Promise<void> {
    const cwd = getWorkspaceCwd();
    if (!cwd) {
        vscode.window.showErrorMessage('Open a folder or workspace that is a Git repository.');
        return;
    }

    const config = vscode.workspace.getConfiguration('ricwiz');

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

    try {
        await exec('git status', { cwd });
    } catch (e) {
        vscode.window.showErrorMessage('The opened folder does not appear to be a valid Git repository.');
        return;
    }

    const mainBranch = ticketId;

    try {
        await vscode.window.withProgress({
            location: vscode.ProgressLocation.Notification,
            title: "Ricwiz: Creating Branches",
            cancellable: false
        }, async (progress) => {
            let createdCount = 0;
            progress.report({ message: 'Checking remote status (git fetch)...', increment: 10 });

            try {
                await exec('git fetch', { cwd });
            } catch (e) {
                // May fail if offline, continue anyway
            }

            // 1. Create the main branch from the configured source branch (e.g. main)
            if (selectedOption.value === 'all') {
                progress.report({ message: `Creating main branch ${mainBranch}...`, increment: 20 });
                if (await checkBranchExists(cwd, mainBranch)) {
                    vscode.window.showInformationMessage(`Ricwiz: The branch ${mainBranch} already exists. Skipping creation...`);
                    // Checkout to ensure we have it locally
                    await exec(`git checkout ${mainBranch}`, { cwd });
                } else {
                    try {
                        await exec(`git fetch origin ${sourceBranchForTicket}`, { cwd });
                        await exec(`git checkout -b ${mainBranch} origin/${sourceBranchForTicket}`, { cwd });
                        createdCount++;
                    } catch (e: any) {
                        try {
                            await exec(`git checkout -b ${mainBranch} ${sourceBranchForTicket}`, { cwd });
                            createdCount++;
                        } catch(err) {} 
                    }
                    
                    try { 
                        await exec(`git push -u origin ${mainBranch}`, { cwd }); 
                    } catch(e){} 
                }
            }

            // 2. Create environment branches based on configured source branches
            const envProgressStep = 60 / (environments.length || 1);
            for (const env of environments) {
                const envBranchName = `${ticketId}-to-${env.name}`;
                const sourceBranch = env.sourceBranch;

                progress.report({ message: `Processing environment branch ${envBranchName}...`, increment: envProgressStep });

                if (await checkBranchExists(cwd, envBranchName)) {
                    // Already exists, skip
                } else {
                    try {
                        // Checkout source branch and pull
                        await exec(`git checkout ${sourceBranch}`, { cwd });
                        try { await exec(`git pull origin ${sourceBranch}`, { cwd }); } catch(e){}
                        
                        // Create the environment branch based on it
                        await exec(`git checkout -b ${envBranchName}`, { cwd });
                        createdCount++;
                        
                        // Push
                        await exec(`git push -u origin ${envBranchName}`, { cwd });
                    } catch (e: any) {
                        vscode.window.showWarningMessage(`Ricwiz: Could not create/sync branch ${envBranchName} from ${sourceBranch}. Does the source branch exist?`);
                    }
                }
            }

            // 3. Switch back to the main branch at the end
            if (selectedOption.value === 'all') {
                progress.report({ message: `Switching to ${mainBranch}...`, increment: 10 });
                try {
                    await exec(`git checkout ${mainBranch}`, { cwd });
                } catch (e: any) {
                    vscode.window.showErrorMessage(`Ricwiz: Failed to switch to main branch: ${e.message}`);
                }
            }

            progress.report({ increment: 100 });
            vscode.window.showInformationMessage(`Ricwiz: All set! You can start working on your branches! 🚀`);
        });
        
    } catch (error: any) {
        vscode.window.showErrorMessage(`Ricwiz general error: ${error.message}`);
    }
}
