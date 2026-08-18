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

    await vscode.window.withProgress({
        location: vscode.ProgressLocation.Notification,
        title: `Ricwiz: Generating package.xml using Salesforce CLI...`,
        cancellable: false
    }, async () => {
        try {
            // Run the user's preferred Salesforce CLI command
            await exec(`sf project generate manifest --source-dir force-app`, { cwd });

            vscode.window.showInformationMessage(`Ricwiz: Successfully generated package.xml!`);
            
            // Try to open the generated file (sf usually places it in the current directory)
            const outputPath = path.join(cwd, 'package.xml');
            if (fs.existsSync(outputPath)) {
                const doc = await vscode.workspace.openTextDocument(outputPath);
                await vscode.window.showTextDocument(doc);
            } else {
                // Check if it placed it in manifest/package.xml
                const manifestPath = path.join(cwd, 'manifest', 'package.xml');
                if (fs.existsSync(manifestPath)) {
                    const doc = await vscode.workspace.openTextDocument(manifestPath);
                    await vscode.window.showTextDocument(doc);
                }
            }
        } catch (e: any) {
            vscode.window.showErrorMessage(`Ricwiz: Error running sf command - ${e.message}`);
        }
    });
}
