"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.runSmartTests = runSmartTests;
const vscode = require("vscode");
const git_1 = require("../git");
async function runSmartTests() {
    const cwd = (0, git_1.getWorkspaceCwd)();
    if (!cwd)
        return;
    const config = vscode.workspace.getConfiguration('ricwiz');
    const sourceBranch = config.get('ticketSourceBranch', 'main');
    await vscode.window.withProgress({
        location: vscode.ProgressLocation.Notification,
        title: "Ricwiz: Finding Apex Tests to run...",
        cancellable: false
    }, async () => {
        try {
            const { stdout } = await (0, git_1.exec)(`git diff --name-status origin/${sourceBranch}...HEAD`, { cwd });
            const lines = stdout.split('\n').map(l => l.trim()).filter(l => l.length > 0);
            const testClassesToRun = new Set();
            const modifiedClasses = new Set();
            for (const line of lines) {
                const parts = line.split(/\s+/);
                if (parts[0].startsWith('D'))
                    continue; // skip deleted
                const file = parts[1];
                if (!file)
                    continue;
                if (file.endsWith('.cls')) {
                    const match = file.match(/\/classes\/([^/.]+)\.cls/);
                    if (match) {
                        const className = match[1];
                        if (className.toLowerCase().endsWith('test')) {
                            testClassesToRun.add(className);
                        }
                        else {
                            modifiedClasses.add(className);
                        }
                    }
                }
            }
            // Guess test classes for modified classes
            for (const cls of modifiedClasses) {
                // If a test class is not already added, we suggest it
                // We will assume Standard naming: cls + "Test"
                testClassesToRun.add(`${cls}Test`);
            }
            if (testClassesToRun.size === 0) {
                vscode.window.showInformationMessage(`Ricwiz: No Apex Classes were modified in this branch.`);
                return;
            }
            const items = Array.from(testClassesToRun).map(t => ({
                label: `$(beaker) ${t}`,
                description: 'Apex Test Class'
            }));
            const selection = await vscode.window.showQuickPick(items, {
                canPickMany: true,
                title: 'Select Test Classes to Run',
                placeHolder: 'Select tests...',
            });
            if (!selection || selection.length === 0)
                return;
            const classNames = selection.map(s => s.label.replace('$(beaker) ', '').trim());
            const command = `sf apex run test -n ${classNames.join(',')} -r human -w 30`;
            const terminal = vscode.window.createTerminal('Ricwiz: Smart Tests');
            terminal.show();
            terminal.sendText(command);
        }
        catch (e) {
            vscode.window.showErrorMessage(`Ricwiz: Error finding tests: ${e.message}`);
        }
    });
}
//# sourceMappingURL=runSmartTests.js.map