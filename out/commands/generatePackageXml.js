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
    const config = vscode.workspace.getConfiguration('ricwiz');
    const sourceBranch = config.get('ticketSourceBranch', 'main');
    const rawCommand = config.get('packageXmlCommand', 'sf sgd source delta --to "HEAD" --from "origin/{baseBranch}" --output-dir "."');
    const command = rawCommand.replace('{baseBranch}', sourceBranch);
    await vscode.window.withProgress({
        location: vscode.ProgressLocation.Notification,
        title: `Ricwiz: Generating package.xml using Salesforce CLI...`,
        cancellable: false
    }, async () => {
        try {
            // Run the user's preferred Salesforce CLI command
            await (0, git_1.exec)(command, { cwd });
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
        }
        catch (e) {
            vscode.window.showErrorMessage(`Ricwiz: Error running sf command - ${e.message}`);
        }
    });
}
//# sourceMappingURL=generatePackageXml.js.map