import * as vscode from 'vscode';
import { exec, getWorkspaceCwd } from '../git';

export async function captureAdminChanges(): Promise<void> {
    const cwd = getWorkspaceCwd();
    if (!cwd) {
        vscode.window.showErrorMessage('Ricwiz: Open a folder or workspace that is a Git repository.');
        return;
    }

    const config = vscode.workspace.getConfiguration('ricwiz');
    const defaultUsername = config.get<string>('auditUsername', '');
    const defaultHours = config.get<number>('auditHours', 8);

    // Prompt for Username
    const username = await vscode.window.showInputBox({
        prompt: 'Enter your Salesforce Username to query in SetupAuditTrail',
        value: defaultUsername,
        placeHolder: 'admin@tuaorg.com'
    });
    if (!username) return;

    // Prompt for Hours
    const hoursStr = await vscode.window.showInputBox({
        prompt: 'How many hours back do you want to search?',
        value: defaultHours.toString(),
        placeHolder: '8'
    });
    if (!hoursStr) return;
    
    const hours = parseFloat(hoursStr);
    if (isNaN(hours) || hours <= 0) {
        vscode.window.showErrorMessage('Ricwiz: Invalid hours specified.');
        return;
    }

    // Calculate ISO Date
    const searchDate = new Date(Date.now() - hours * 60 * 60 * 1000).toISOString();

    const query = `SELECT Action, Display, Section FROM SetupAuditTrail WHERE CreatedBy.Username = '${username}' AND CreatedDate >= ${searchDate}`;
    const command = `sf data query -q "${query}" --json`;

    await vscode.window.withProgress({
        location: vscode.ProgressLocation.Notification,
        title: `Ricwiz: Interrogating Setup Audit Trail...`,
        cancellable: false
    }, async () => {
        try {
            const { stdout } = await exec(command, { cwd });
            const result = JSON.parse(stdout);
            
            if (!result.result || result.result.records.length === 0) {
                vscode.window.showInformationMessage(`Ricwiz: No changes found for ${username} in the last ${hours} hours.`);
                return;
            }

            const records = result.result.records;

            // Generate QuickPick items, filtering out known noisy/non-metadata events
            const items: (vscode.QuickPickItem & { metadataFormat: string })[] = [];
            
            for (const record of records) {
                const metadataStr = translateToMetadata(record.Action, record.Display, record.Section);
                if (metadataStr) {
                    items.push({
                        label: `$(plus) ${record.Section}: ${record.Display}`,
                        description: record.Action,
                        metadataFormat: metadataStr
                    });
                }
            }

            if (items.length === 0) {
                vscode.window.showInformationMessage(`Ricwiz: No extractable metadata changes found for ${username} in the last ${hours} hours (ignored passwords/logins).`);
                return;
            }

            // Show QuickPick
            const selection = await vscode.window.showQuickPick(items, {
                canPickMany: true,
                placeHolder: 'Select the changes you want to extract to GitLab',
                ignoreFocusOut: true
            });

            if (!selection || selection.length === 0) {
                vscode.window.showInformationMessage('Ricwiz: No changes selected.');
                return;
            }

            // Build metadata string, ignoring unparsable ones
            let initialMetadata = selection
                .map(item => item.metadataFormat)
                .filter(m => m !== '')
                .join(', ');

            // Let the user edit the final metadata string before executing
            const finalMetadata = await vscode.window.showInputBox({
                prompt: 'Review and adjust the metadata components to retrieve',
                value: initialMetadata,
                ignoreFocusOut: true
            });

            if (!finalMetadata) {
                return; // User cancelled
            }

            const retrieveCmd = `sf project retrieve start -m "${finalMetadata}"`;

            // Run retrieve
            const outputChannel = vscode.window.createOutputChannel('Ricwiz Admin Bridge');
            outputChannel.show();
            outputChannel.appendLine(`Executing: ${retrieveCmd}`);
            
            vscode.window.showInformationMessage(`Ricwiz: Extracting ${selection.length} components...`);
            
            const retrieveResult = await exec(retrieveCmd, { cwd });
            
            outputChannel.appendLine(retrieveResult.stdout);
            if (retrieveResult.stderr) {
                outputChannel.appendLine('--- STDERR ---');
                outputChannel.appendLine(retrieveResult.stderr);
            }

            vscode.window.showInformationMessage('Ricwiz: Changes extracted successfully! Ready for Git Commit.');

        } catch (e: any) {
            vscode.window.showErrorMessage(`Ricwiz: Error capturing changes - ${e.message}`);
        }
    });
}

function translateToMetadata(action: string, display: string, section: string): string | null {
    const act = action.toLowerCase();
    const sec = section.toLowerCase();

    // 1. Filter out known noisy / non-extractable sections
    const ignoredSections = ['security controls', 'network access', 'session settings', 'data export', 'login history', 'password policies', 'identity verification', 'delegated administration'];
    if (ignoredSections.includes(sec)) return null;

    // Filter out user/login/password actions specifically (this keeps "Manage Users" clean of data-only noise)
    if (act.includes('login') || act.includes('password') || act.includes('oauth') || act.includes('session')) return null;

    // 2. Map standard metadata
    if (act.includes('profile')) {
        // e.g., "Changed profile System Administrator"
        const parts = display.split(' ');
        return `Profile:${parts[parts.length - 1]}`;
    }
    if (act.includes('permission set')) {
        const parts = display.split(' ');
        return `PermissionSet:${parts[parts.length - 1]}`;
    }
    if (act.includes('apexclass')) {
        const parts = display.split(' ');
        return `ApexClass:${parts[parts.length - 1]}`;
    }
    if (act.includes('customfield')) {
        const fieldMatch = display.match(/([A-Za-z0-9_]+__c)/);
        const objMatch = display.match(/(?:on|na|for)\s+([A-Za-z0-9_]+)/i);
        if (fieldMatch && objMatch) {
            return `CustomField:${objMatch[1]}.${fieldMatch[1]}`;
        }
        return `CustomField:${display.replace(/\s+/g, '')}`;
    }
    if (act.includes('layout')) {
        return `Layout:${display.trim()}`;
    }
    if (act.includes('validation')) {
        return `ValidationRule:${display.replace(/\s+/g, '')}`;
    }
    if (act.includes('flow')) {
        return `Flow:${display.replace(/\s+/g, '')}`;
    }
    if (act.includes('customobject')) {
        const objMatch = display.match(/([A-Za-z0-9_]+__c)/);
        return objMatch ? `CustomObject:${objMatch[1]}` : `CustomObject:${display.replace(/\s+/g, '')}`;
    }
    
    // Only return fallback for things we think MIGHT be metadata, otherwise null
    // If we reach here, it's not a known clear-cut metadata type.
    // Let's filter out general 'changed', 'deleted', 'created' unless they mention a component
    if (act.includes('created') || act.includes('changed') || act.includes('deleted')) {
        // If it's a generic word with no specific metadata tie, we discard it
        return null; 
    }

    // For any other unexpected action, discard to reduce noise
    return null;
}
