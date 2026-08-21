"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.extractComponent = extractComponent;
const vscode = require("vscode");
const git_1 = require("../git");
async function extractComponent() {
    const cwd = (0, git_1.getWorkspaceCwd)();
    if (!cwd) {
        vscode.window.showErrorMessage('Ricwiz: Open a workspace first.');
        return;
    }
    const commonTypes = [
        'ApexClass', 'ApexTrigger', 'CustomObject', 'CustomField',
        'LightningComponentBundle', 'AuraDefinitionBundle', 'Flow',
        'CustomLabel', 'CustomMetadata', 'StaticResource',
        'Profile', 'PermissionSet', 'PermissionSetGroup', 'Layout', 'ValidationRule',
        'RecordType', 'ListView', 'Report', 'EmailTemplate', 'Other (Type manually)...'
    ];
    let metadataType = await vscode.window.showQuickPick(commonTypes, {
        placeHolder: 'Select Metadata Type to extract (e.g., ApexClass)',
        ignoreFocusOut: true
    });
    if (!metadataType)
        return;
    if (metadataType === 'Other (Type manually)...') {
        metadataType = await vscode.window.showInputBox({
            prompt: 'Enter Metadata Type (e.g., CustomApplication, Queue)',
            ignoreFocusOut: true
        });
        if (!metadataType)
            return;
    }
    const componentName = await vscode.window.showInputBox({
        prompt: `Enter component name for ${metadataType} (use * for all, or exact name e.g. Account)`,
        placeHolder: 'e.g. MyComponent or *',
        ignoreFocusOut: true
    });
    if (!componentName)
        return;
    await vscode.window.withProgress({
        location: vscode.ProgressLocation.Notification,
        title: `Ricwiz: Extracting ${metadataType}:${componentName} from Salesforce...`,
        cancellable: true
    }, async (progress, token) => {
        try {
            git_1.ricwizLogger.show(true); // show without taking focus
            const manifestStr = `${metadataType}:${componentName}`;
            const { stdout, stderr } = await (0, git_1.exec)(`sf project retrieve start -m "${manifestStr}"`, { cwd });
            if (stdout)
                git_1.ricwizLogger.appendLine(stdout);
            if (stderr)
                git_1.ricwizLogger.appendLine(stderr);
            vscode.window.showInformationMessage(`Ricwiz: Successfully extracted ${manifestStr}.`);
        }
        catch (e) {
            git_1.ricwizLogger.appendLine(`ERROR: ${e.message}`);
            if (e.stdout)
                git_1.ricwizLogger.appendLine(e.stdout);
            if (e.stderr)
                git_1.ricwizLogger.appendLine(e.stderr);
            vscode.window.showErrorMessage(`Ricwiz: Extraction failed. See Output channel for details.`);
        }
    });
}
//# sourceMappingURL=extractComponent.js.map