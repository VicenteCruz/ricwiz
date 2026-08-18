import * as vscode from 'vscode';
import * as path from 'path';
import * as fs from 'fs';
import { exec, getWorkspaceCwd } from '../git';

export async function generatePackageXml(): Promise<void> {
    const cwd = getWorkspaceCwd();
    if (!cwd) {
        vscode.window.showErrorMessage('Ricwiz: Open a folder or workspace that is a Git repository.');
        return;
    }

    const config = vscode.workspace.getConfiguration('ricwiz');
    const sourceBranch = config.get<string>('ticketSourceBranch', 'main');
    const rawCommand = config.get<string>('packageXmlCommand', 'sf sgd source delta --to "HEAD" --from "origin/{baseBranch}" --output-dir "."');
    const command = rawCommand.replace('{baseBranch}', sourceBranch);

    const confirm = await vscode.window.showWarningMessage(
        'Are you sure you want to generate the package.xml? This may overwrite existing local manifest files.',
        { modal: true },
        'Yes, Generate'
    );
    if (confirm !== 'Yes, Generate') {
        return;
    }

    await vscode.window.withProgress({
        location: vscode.ProgressLocation.Notification,
        title: `Ricwiz: Generating package.xml using Salesforce CLI...`,
        cancellable: false
    }, async () => {
        try {
            // Run the user's preferred Salesforce CLI command
            await exec(command, { cwd });

            vscode.window.showInformationMessage(`Ricwiz: Successfully generated package.xml!`);
            
            // Try to open the generated file
            // sfdx-git-delta usually places it in a 'package' subfolder
            const sgdPath = path.join(cwd, 'package', 'package.xml');
            const rootPath = path.join(cwd, 'package.xml');
            const manifestPath = path.join(cwd, 'manifest', 'package.xml');

            for (const p of [sgdPath, rootPath, manifestPath]) {
                if (fs.existsSync(p)) {
                    const doc = await vscode.workspace.openTextDocument(p);
                    await vscode.window.showTextDocument(doc);
                    break;
                }
            }
        } catch (e: any) {
            vscode.window.showErrorMessage(`Ricwiz: Error running sf command - ${e.message}`);
        }
    });
}
