"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.generatePackageXml = generatePackageXml;
const vscode = require("vscode");
const path = require("path");
const fs = require("fs");
const git_1 = require("../git");
async function generatePackageXml() {
    const cwd = (0, git_1.getWorkspaceCwd)();
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
            await (0, git_1.exec)(`sf project generate manifest --source-dir force-app`, { cwd });
            vscode.window.showInformationMessage(`Ricwiz: Successfully generated package.xml!`);
            // Try to open the generated file (sf usually places it in the current directory)
            const outputPath = path.join(cwd, 'package.xml');
            if (fs.existsSync(outputPath)) {
                const doc = await vscode.workspace.openTextDocument(outputPath);
                await vscode.window.showTextDocument(doc);
            }
            else {
                // Check if it placed it in manifest/package.xml
                const manifestPath = path.join(cwd, 'manifest', 'package.xml');
                if (fs.existsSync(manifestPath)) {
                    const doc = await vscode.workspace.openTextDocument(manifestPath);
                    await vscode.window.showTextDocument(doc);
                }
            }
        }
        catch (e) {
            vscode.window.showErrorMessage(`Ricwiz: Error running sf command - ${e.message}`);
        }
    });
}
//# sourceMappingURL=generatePackageXml.js.map