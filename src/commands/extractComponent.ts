import * as vscode from 'vscode';
import { exec, getWorkspaceCwd, ricwizLogger } from '../git';

export async function extractComponent(): Promise<void> {
    const cwd = getWorkspaceCwd();
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

    if (!metadataType) return;

    if (metadataType === 'Other (Type manually)...') {
        metadataType = await vscode.window.showInputBox({
            prompt: 'Enter Metadata Type (e.g., CustomApplication, Queue)',
            ignoreFocusOut: true
        });
        if (!metadataType) return;
    }

    const globMap: Record<string, string> = {
        'ApexClass': '**/*.cls',
        'ApexTrigger': '**/*.trigger',
        'CustomObject': '**/*.{object,object-meta.xml}',
        'CustomField': '**/*.field-meta.xml',
        'LightningComponentBundle': '**/lwc/*/*.js',
        'AuraDefinitionBundle': '**/aura/*/*.cmp',
        'Flow': '**/*.flow-meta.xml',
        'CustomLabel': '**/*.labels-meta.xml',
        'CustomMetadata': '**/*.md-meta.xml',
        'StaticResource': '**/*.resource-meta.xml',
        'Profile': '**/*.profile-meta.xml',
        'PermissionSet': '**/*.permissionset-meta.xml',
        'PermissionSetGroup': '**/*.permissionsetgroup-meta.xml',
        'Layout': '**/*.layout-meta.xml',
        'ValidationRule': '**/*.validationRule-meta.xml',
        'RecordType': '**/*.recordType-meta.xml',
        'ListView': '**/*.listView-meta.xml'
    };

    let localSuggestions: string[] = [];
    const globPattern = globMap[metadataType];
    if (globPattern) {
        try {
            const files = await vscode.workspace.findFiles(globPattern, '**/node_modules/**');
            localSuggestions = files.map(f => {
                const basename = f.fsPath.split(/[\\/]/).pop() || '';
                // For Aura/LWC, folder name is usually the component name
                if (metadataType === 'LightningComponentBundle' || metadataType === 'AuraDefinitionBundle') {
                    const parts = f.fsPath.split(/[\\/]/);
                    return parts[parts.length - 2] || basename.split('.')[0];
                }
                return basename.split('.')[0];
            });
            localSuggestions = [...new Set(localSuggestions)].sort();
        } catch (e) {}
    }

    const componentName = await new Promise<string | undefined>((resolve) => {
        const quickPick = vscode.window.createQuickPick();
        quickPick.title = `Extract ${metadataType}`;
        quickPick.placeholder = `Type name (e.g. MyComponent) or * for all`;
        quickPick.ignoreFocusOut = true;
        quickPick.matchOnDescription = true;
        
        const updateItems = () => {
            const val = quickPick.value.trim();
            const items: vscode.QuickPickItem[] = [];
            
            if (val) {
                items.push({
                    label: `$(cloud-download) Extract "${val}"`,
                    description: 'Extract exact name from Salesforce',
                    alwaysShow: true
                });
            } else {
                items.push({
                    label: `$(cloud-download) Extract "*" (All)`,
                    description: `Extract all ${metadataType}s`,
                    alwaysShow: true
                });
            }
            
            localSuggestions.forEach(sug => {
                if (!val || sug.toLowerCase().includes(val.toLowerCase())) {
                    items.push({
                        label: sug,
                        description: 'Local workspace component'
                    });
                }
            });
            
            quickPick.items = items;
        };

        quickPick.onDidChangeValue(() => updateItems());
        
        quickPick.onDidAccept(() => {
            const selection = quickPick.selectedItems[0];
            if (selection) {
                let result = selection.label;
                if (result.startsWith('$(cloud-download) Extract "')) {
                    result = result.replace('$(cloud-download) Extract "', '').replace('" (All)', '').replace('"', '');
                } else if (result === '$(cloud-download) Extract "*" (All)') {
                    result = '*';
                }
                quickPick.hide();
                resolve(result);
            }
        });

        quickPick.onDidHide(() => {
            quickPick.dispose();
            resolve(undefined);
        });

        updateItems();
        quickPick.show();
    });

    if (!componentName) return;

    await vscode.window.withProgress({
        location: vscode.ProgressLocation.Notification,
        title: `Ricwiz: Extracting ${metadataType}:${componentName} from Salesforce...`,
        cancellable: true
    }, async (progress, token) => {
        try {
            ricwizLogger.show(true); // show without taking focus
            const manifestStr = `${metadataType}:${componentName}`;
            const { stdout, stderr } = await exec(`sf project retrieve start -m "${manifestStr}"`, { cwd });
            if (stdout) ricwizLogger.appendLine(stdout);
            if (stderr) ricwizLogger.appendLine(stderr);
            vscode.window.showInformationMessage(`Ricwiz: Successfully extracted ${manifestStr}.`);
        } catch (e: any) {
            ricwizLogger.appendLine(`ERROR: ${e.message}`);
            if (e.stdout) ricwizLogger.appendLine(e.stdout);
            if (e.stderr) ricwizLogger.appendLine(e.stderr);
            vscode.window.showErrorMessage(`Ricwiz: Extraction failed. See Output channel for details.`);
        }
    });
}

