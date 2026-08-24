import * as vscode from 'vscode';
import * as path from 'path';
import * as fs from 'fs';
import { exec, getWorkspaceCwd } from '../git';
import { WorkflowContext } from '../workflows/WorkflowContext';

export async function generateDestructiveChanges(): Promise<void> {
    const cwd = getWorkspaceCwd();
    if (!cwd) {
        vscode.window.showErrorMessage('Ricwiz: Open a workspace that is a Git repository.');
        return;
    }

    const ctx = await WorkflowContext.initialize(cwd, { skipPrompt: true });
    const sourceBranch = ctx ? ctx.ticketSourceBranch : vscode.workspace.getConfiguration('ricwiz').get<string>('ticketSourceBranch', 'main');
    const originRemote = ctx ? ctx.originRemote : 'origin';

    await vscode.window.withProgress({
        location: vscode.ProgressLocation.Notification,
        title: `Ricwiz: Finding deleted files compared to ${originRemote}/${sourceBranch}...`,
        cancellable: false
    }, async () => {
        try {
            const { stdout } = await exec(`git diff --name-only --diff-filter=D ${originRemote}/${sourceBranch}...HEAD`, { cwd });
            
            const files = stdout.split('\n').map(f => f.trim()).filter(f => f.length > 0);

            if (files.length === 0) {
                vscode.window.showInformationMessage(`Ricwiz: No deleted files found compared to ${originRemote}/${sourceBranch}.`);
                return;
            }

            const metadataMap: Record<string, string[]> = {};
            
            const addMeta = (type: string, name: string) => {
                if (!metadataMap[type]) metadataMap[type] = [];
                if (!metadataMap[type].includes(name)) metadataMap[type].push(name);
            };

            for (const file of files) {
                const normalized = file.replace(/\\/g, '/');
                if (normalized.includes('/classes/')) {
                    const match = normalized.match(/\/classes\/([^/.]+)\.cls/);
                    if (match) addMeta('ApexClass', match[1]);
                } else if (normalized.includes('/triggers/')) {
                    const match = normalized.match(/\/triggers\/([^/.]+)\.trigger/);
                    if (match) addMeta('ApexTrigger', match[1]);
                } else if (normalized.includes('/lwc/')) {
                    const match = normalized.match(/\/lwc\/([^/]+)\//);
                    if (match) addMeta('LightningComponentBundle', match[1]);
                } else if (normalized.includes('/aura/')) {
                    const match = normalized.match(/\/aura\/([^/]+)\//);
                    if (match) addMeta('AuraDefinitionBundle', match[1]);
                } else if (normalized.includes('/objects/') && normalized.includes('/fields/')) {
                    const objMatch = normalized.match(/\/objects\/([^/]+)\//);
                    const fieldMatch = normalized.match(/\/fields\/([^/.]+)\.field/);
                    if (objMatch && fieldMatch) addMeta('CustomField', `${objMatch[1]}.${fieldMatch[1]}`);
                } else if (normalized.includes('/objects/')) {
                    const match = normalized.match(/\/objects\/([^/.]+)\.object/);
                    if (match) addMeta('CustomObject', match[1]);
                } else if (normalized.includes('/layouts/')) {
                    const match = normalized.match(/\/layouts\/([^/.]+)\.layout/);
                    if (match) addMeta('Layout', match[1]);
                } else if (normalized.includes('/flows/')) {
                    const match = normalized.match(/\/flows\/([^/.]+)\.flow/);
                    if (match) addMeta('Flow', match[1]);
                } else if (normalized.includes('/permissionsets/')) {
                    const match = normalized.match(/\/permissionsets\/([^/.]+)\.permissionset/);
                    if (match) addMeta('PermissionSet', match[1]);
                } else if (normalized.includes('/profiles/')) {
                    const match = normalized.match(/\/profiles\/([^/.]+)\.profile/);
                    if (match) addMeta('Profile', match[1]);
                } else if (normalized.includes('/customMetadata/')) {
                    const match = normalized.match(/\/customMetadata\/([^/.]+)\.md/);
                    if (match) addMeta('CustomMetadata', match[1]);
                } else if (normalized.includes('/flexipages/')) {
                    const match = normalized.match(/\/flexipages\/([^/.]+)\.flexipage/);
                    if (match) addMeta('FlexiPage', match[1]);
                }
            }

            if (Object.keys(metadataMap).length === 0) {
                vscode.window.showInformationMessage(`Ricwiz: Found deleted files in Git, but none mapped to recognizable Salesforce metadata.`);
                return;
            }

            let xml = `<?xml version="1.0" encoding="UTF-8"?>\n<Package xmlns="http://soap.sforce.com/2006/04/metadata">\n`;
            for (const type of Object.keys(metadataMap).sort()) {
                xml += `    <types>\n`;
                for (const member of metadataMap[type].sort()) {
                    xml += `        <members>${member}</members>\n`;
                }
                xml += `        <name>${type}</name>\n    </types>\n`;
            }
            xml += `    <version>58.0</version>\n</Package>`;

            const destructiveDir = path.join(cwd, 'destructiveChanges');
            if (!fs.existsSync(destructiveDir)) {
                fs.mkdirSync(destructiveDir);
            }
            
            const outPath = path.join(destructiveDir, 'destructiveChanges.xml');
            // Write an empty package.xml in the same folder as required by sf
            const emptyPackagePath = path.join(destructiveDir, 'package.xml');
            
            fs.writeFileSync(outPath, xml, 'utf8');
            if (!fs.existsSync(emptyPackagePath)) {
                fs.writeFileSync(emptyPackagePath, `<?xml version="1.0" encoding="UTF-8"?>\n<Package xmlns="http://soap.sforce.com/2006/04/metadata">\n    <version>58.0</version>\n</Package>`, 'utf8');
            }

            const doc = await vscode.workspace.openTextDocument(outPath);
            await vscode.window.showTextDocument(doc);
            
            vscode.window.showInformationMessage(`Ricwiz: destructiveChanges.xml generated successfully!`);

        } catch(e: any) {
            vscode.window.showErrorMessage(`Ricwiz: Error generating destructive changes: ${e.message}`);
        }
    });
}
