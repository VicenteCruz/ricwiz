import * as vscode from 'vscode';
import { exec, getWorkspaceCwd } from '../git';

export async function resetTracking(): Promise<void> {
    const cwd = getWorkspaceCwd();
    if (!cwd) {
        vscode.window.showErrorMessage('Ricwiz: Open a folder or workspace that is a Git repository.');
        return;
    }

    const config = vscode.workspace.getConfiguration('ricwiz');
    const command = config.get<string>('resetTrackingCommand', 'sf org disable tracking && sf project reset tracking --no-prompt');

    await vscode.window.withProgress({
        location: vscode.ProgressLocation.Notification,
        title: `Ricwiz: Resetting tracking...`,
        cancellable: false
    }, async () => {
        try {
            const { stdout, stderr } = await exec(command, { cwd });
            
            const outputChannel = vscode.window.createOutputChannel('Ricwiz Reset Tracking');
            outputChannel.appendLine(`Executing: ${command}`);
            outputChannel.appendLine(stdout);
            if (stderr) {
                outputChannel.appendLine('--- STDERR ---');
                outputChannel.appendLine(stderr);
            }
            outputChannel.show();

            vscode.window.showInformationMessage(`Ricwiz: Successfully reset tracking!`);
        } catch (e: any) {
            const outputChannel = vscode.window.createOutputChannel('Ricwiz Reset Tracking');
            outputChannel.appendLine(`Error executing: ${command}`);
            if (e.stdout) outputChannel.appendLine(e.stdout);
            if (e.stderr) outputChannel.appendLine(e.stderr);
            outputChannel.appendLine(e.message);
            outputChannel.show();
            
            vscode.window.showErrorMessage(`Ricwiz: Error resetting tracking. See output channel for details.`);
        }
    });
}
