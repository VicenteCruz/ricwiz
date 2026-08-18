import * as vscode from 'vscode';
import * as path from 'path';
import * as fs from 'fs';
import { exec, getWorkspaceCwd } from '../git';

// A basic mapping of Salesforce directory names to Metadata API names
const METADATA_MAP: Record<string, string> = {
    'classes': 'ApexClass',
    'triggers': 'ApexTrigger',
    'pages': 'ApexPage',
    'components': 'ApexComponent',
    'lwc': 'LightningComponentBundle',
    'aura': 'AuraDefinitionBundle',
    'objects': 'CustomObject',
    'fields': 'CustomField',
    'layouts': 'Layout',
    'permissionsets': 'PermissionSet',
    'profiles': 'Profile',
    'staticresources': 'StaticResource',
    'tabs': 'CustomTab',
    'applications': 'CustomApplication',
    'flexipages': 'FlexiPage',
    'labels': 'CustomLabels',
    'workflows': 'Workflow',
    'flows': 'Flow',
    'email': 'EmailTemplate',
    'reports': 'Report',
    'dashboards': 'Dashboard',
    'quickActions': 'QuickAction',
    'globalValueSets': 'GlobalValueSet',
    'standardValueSets': 'StandardValueSet',
    'roles': 'Role',
    'groups': 'Group',
    'queues': 'Queue',
    'assignmentRules': 'AssignmentRules',
    'autoResponseRules': 'AutoResponseRules',
    'escalationRules': 'EscalationRules',
    'sharingRules': 'SharingRules',
    'matchingRules': 'MatchingRules',
    'duplicateRules': 'DuplicateRule',
    'validationRules': 'ValidationRule',
    'weblinks': 'CustomPageWebLink',
    'recordTypes': 'RecordType',
    'listViews': 'ListView',
    'compactLayouts': 'CompactLayout',
    'webLinks': 'WebLink',
    'customMetadata': 'CustomMetadata',
};

export async function generatePackageXml(): Promise<void> {
    const cwd = getWorkspaceCwd();
    if (!cwd) {
        vscode.window.showErrorMessage('Ricwiz: Open a folder or workspace that is a Git repository.');
        return;
    }

    const config = vscode.workspace.getConfiguration('ricwiz');
    const sourceBranch = config.get<string>('ticketSourceBranch', 'main');

    await vscode.window.withProgress({
        location: vscode.ProgressLocation.Notification,
        title: `Ricwiz: Generating package.xml compared to ${sourceBranch}...`,
        cancellable: false
    }, async () => {
        try {
            // Find files changed compared to the source branch (using merge-base)
            let diffOutput = '';
            try {
                const { stdout: mergeBase } = await exec(`git merge-base origin/${sourceBranch} HEAD`, { cwd });
                const baseCommit = mergeBase.trim();
                const { stdout } = await exec(`git diff --name-only ${baseCommit}..HEAD`, { cwd });
                diffOutput = stdout;
            } catch (e) {
                // Fallback to local source branch
                try {
                    const { stdout: mergeBase } = await exec(`git merge-base ${sourceBranch} HEAD`, { cwd });
                    const baseCommit = mergeBase.trim();
                    const { stdout } = await exec(`git diff --name-only ${baseCommit}..HEAD`, { cwd });
                    diffOutput = stdout;
                } catch(err) {
                    vscode.window.showErrorMessage(`Ricwiz: Could not find diff against ${sourceBranch}.`);
                    return;
                }
            }

            const files = diffOutput.split('\n').map(f => f.trim()).filter(f => f.length > 0);
            
            if (files.length === 0) {
                vscode.window.showInformationMessage('Ricwiz: No changed files found.');
                return;
            }

            const typeMap = new Map<string, Set<string>>();

            for (const file of files) {
                // Ignore hidden files or dot files
                if (file.startsWith('.')) continue;

                // Example path: force-app/main/default/classes/MyClass.cls
                const parts = file.split('/');
                
                // Try to find a mapped directory
                for (let i = 0; i < parts.length; i++) {
                    const dir = parts[i];
                    if (METADATA_MAP[dir]) {
                        const typeName = METADATA_MAP[dir];
                        let memberName = '';

                        // For bundles like lwc or aura, the member name is the folder name
                        if (typeName === 'LightningComponentBundle' || typeName === 'AuraDefinitionBundle') {
                            if (i + 1 < parts.length) {
                                memberName = parts[i + 1];
                            }
                        } 
                        // For sub-components like CustomField (objects/Account/fields/MyField__c)
                        else if (dir === 'fields' && i >= 2 && parts[i-2] === 'objects') {
                            const objName = parts[i-1];
                            const fieldName = parts[i+1].split('.')[0];
                            memberName = `${objName}.${fieldName}`;
                        }
                        // Standard files
                        else {
                            if (i + 1 < parts.length) {
                                const filename = parts[parts.length - 1];
                                memberName = filename.split('.')[0];
                                
                                // Handle special case for -meta.xml
                                if (filename.endsWith('-meta.xml')) {
                                    memberName = filename.replace('-meta.xml', '').split('.')[0];
                                }
                            }
                        }

                        if (memberName) {
                            if (!typeMap.has(typeName)) {
                                typeMap.set(typeName, new Set());
                            }
                            typeMap.get(typeName)!.add(memberName);
                            break;
                        }
                    }
                }
            }

            if (typeMap.size === 0) {
                vscode.window.showInformationMessage('Ricwiz: Changed files did not match any known Salesforce metadata types.');
                return;
            }

            let xml = `<?xml version="1.0" encoding="UTF-8"?>\n<Package xmlns="http://soap.sforce.com/2006/04/metadata">\n`;
            
            // Sort types alphabetically
            const sortedTypes = Array.from(typeMap.keys()).sort();
            
            for (const type of sortedTypes) {
                xml += `    <types>\n`;
                const members = Array.from(typeMap.get(type)!).sort();
                for (const member of members) {
                    xml += `        <members>${member}</members>\n`;
                }
                xml += `        <name>${type}</name>\n`;
                xml += `    </types>\n`;
            }

            xml += `    <version>58.0</version>\n</Package>\n`;

            const outputPath = path.join(cwd, 'package.xml');
            fs.writeFileSync(outputPath, xml);

            vscode.window.showInformationMessage(`Ricwiz: Successfully generated package.xml with ${typeMap.size} component types!`);
            
            // Open the file in editor
            const doc = await vscode.workspace.openTextDocument(outputPath);
            await vscode.window.showTextDocument(doc);

        } catch (e: any) {
            vscode.window.showErrorMessage(`Ricwiz: Error generating package.xml - ${e.message}`);
        }
    });
}
