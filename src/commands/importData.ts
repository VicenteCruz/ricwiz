import * as vscode from 'vscode';
import { exec, getWorkspaceCwd } from '../git';

export async function importData(): Promise<void> {
    const cwd = getWorkspaceCwd();
    if (!cwd) {
        vscode.window.showErrorMessage('Ricwiz: Open a folder or workspace that is a Git repository.');
        return;
    }

    const config = vscode.workspace.getConfiguration('ricwiz');
    const command = config.get<string>('importDataCommand', 'sfdx force:data:tree:import --plan data/plan.json');

    await vscode.window.withProgress({
        location: vscode.ProgressLocation.Notification,
        title: `Ricwiz: Importing data...`,
        cancellable: false
    }, async () => {
        try {
            const { stdout, stderr } = await exec(command, { cwd });
            
            const outputChannel = vscode.window.createOutputChannel('Ricwiz Import Data');
            outputChannel.appendLine(`Executing: ${command}`);
            outputChannel.appendLine(stdout);
            if (stderr) {
                outputChannel.appendLine('--- STDERR ---');
                outputChannel.appendLine(stderr);
            }
            outputChannel.show();

            vscode.window.showInformationMessage(`Ricwiz: Successfully ran import data command!`);
        } catch (e: any) {
            const outputChannel = vscode.window.createOutputChannel('Ricwiz Import Data');
            outputChannel.appendLine(`Error executing: ${command}`);
            if (e.stdout) outputChannel.appendLine(e.stdout);
            if (e.stderr) outputChannel.appendLine(e.stderr);
            outputChannel.appendLine(e.message);
            outputChannel.show();
            
            vscode.window.showErrorMessage(`Ricwiz: Error running import data command. See output channel for details.`);
        }
    });
}
