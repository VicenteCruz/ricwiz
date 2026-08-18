"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.deployPackage = deployPackage;
const vscode = require("vscode");
const git_1 = require("../git");
async function deployPackage() {
    const cwd = (0, git_1.getWorkspaceCwd)();
    if (!cwd) {
        vscode.window.showErrorMessage('Ricwiz: Open a folder or workspace that is a Git repository.');
        return;
    }
    const config = vscode.workspace.getConfiguration('ricwiz');
    const command = config.get('deployCommand', 'sf project deploy start --manifest package/package.xml --post-destructive-changes destructiveChanges/destructiveChanges.xml -c -l NoTestRun -g');
    const confirm = await vscode.window.showWarningMessage('Are you sure you want to deploy to Salesforce? This action modifies your org and cannot be easily undone.', { modal: true }, 'Yes, Deploy');
    if (confirm !== 'Yes, Deploy') {
        return;
    }
    await vscode.window.withProgress({
        location: vscode.ProgressLocation.Notification,
        title: `Ricwiz: Deploying package...`,
        cancellable: false
    }, async () => {
        try {
            const { stdout, stderr } = await (0, git_1.exec)(command, { cwd });
            // Because Salesforce commands can output useful information or errors to stdout/stderr,
            // we should show an output channel if there's significant output.
            const outputChannel = vscode.window.createOutputChannel('Ricwiz Deploy');
            outputChannel.appendLine(`Executing: ${command}`);
            outputChannel.appendLine(stdout);
            if (stderr) {
                outputChannel.appendLine('--- STDERR ---');
                outputChannel.appendLine(stderr);
            }
            outputChannel.show();
            vscode.window.showInformationMessage(`Ricwiz: Successfully ran deploy command!`);
        }
        catch (e) {
            const outputChannel = vscode.window.createOutputChannel('Ricwiz Deploy');
            outputChannel.appendLine(`Error executing: ${command}`);
            if (e.stdout)
                outputChannel.appendLine(e.stdout);
            if (e.stderr)
                outputChannel.appendLine(e.stderr);
            outputChannel.appendLine(e.message);
            outputChannel.show();
            vscode.window.showErrorMessage(`Ricwiz: Error running deploy command. See output channel for details.`);
        }
    });
}
//# sourceMappingURL=deployPackage.js.map