"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.captureAdminChanges = captureAdminChanges;
const vscode = require("vscode");
const fs = require("fs");
const path = require("path");
const git_1 = require("../git");
async function captureAdminChanges() {
    const cwd = (0, git_1.getWorkspaceCwd)();
    if (!cwd) {
        vscode.window.showErrorMessage('Ricwiz: Open a folder or workspace that is a Git repository.');
        return;
    }
    const config = vscode.workspace.getConfiguration('ricwiz');
    const defaultUsername = config.get('auditUsername', '');
    const defaultHours = config.get('auditHours', 8);
    // Prompt for Username
    const username = await vscode.window.showInputBox({
        prompt: 'Enter your Salesforce Username to query in SetupAuditTrail',
        value: defaultUsername,
        placeHolder: 'admin@tuaorg.com'
    });
    if (!username)
        return;
    // Prompt for Hours
    const hoursStr = await vscode.window.showInputBox({
        prompt: 'How many hours back do you want to search?',
        value: defaultHours.toString(),
        placeHolder: '8'
    });
    if (!hoursStr)
        return;
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
            const { stdout } = await (0, git_1.exec)(command, { cwd, maxBuffer: 50 * 1024 * 1024 });
            const result = JSON.parse(stdout);
            if (!result.result || result.result.records.length === 0) {
                vscode.window.showInformationMessage(`Ricwiz: No changes found for ${username} in the last ${hours} hours.`);
                return;
            }
            const records = result.result.records;
            // Generate QuickPick items, filtering out known noisy/non-metadata events
            const items = [];
            for (const record of records) {
                const metaObj = translateToMetadata(record.Action, record.Display, record.Section);
                if (metaObj) {
                    const icon = metaObj.isDelete ? '$(trash)' : '$(plus)';
                    items.push({
                        label: `${icon} ${record.Section}: ${record.Display}`,
                        description: record.Action,
                        metadataFormat: metaObj.metadataFormat,
                        isDelete: metaObj.isDelete
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
            const toDelete = selection.filter(i => i.isDelete);
            const toRetrieve = selection.filter(i => !i.isDelete);
            const outputChannel = vscode.window.createOutputChannel('Ricwiz Admin Bridge');
            outputChannel.show();
            // Handle Deletions
            if (toDelete.length > 0) {
                const { stdout: lsFiles } = await (0, git_1.exec)(`git ls-files`, { cwd });
                const allFiles = lsFiles.split('\n').map((f) => f.trim());
                let deletedCount = 0;
                for (const del of toDelete) {
                    const metaParts = del.metadataFormat.split(':');
                    const metaType = metaParts[0];
                    const metaName = metaParts[1];
                    // Naive matching, we look for file ending with the name
                    // e.g. ApexClass:MyClass -> MyClass.cls and MyClass.cls-meta.xml
                    // CustomField:Account.Status__c -> Account/fields/Status__c.field-meta.xml
                    let searchName = metaName;
                    if (metaType === 'CustomField') {
                        searchName = metaName.split('.')[1];
                    }
                    const matchingFiles = allFiles.filter((f) => {
                        const base = path.basename(f);
                        return base.startsWith(searchName + '.') && base.includes(metaType === 'CustomField' ? '.field' : '');
                    });
                    for (const f of matchingFiles) {
                        const fullPath = path.join(cwd, f);
                        if (fs.existsSync(fullPath)) {
                            fs.unlinkSync(fullPath);
                            outputChannel.appendLine(`Deleted local file: ${f}`);
                            deletedCount++;
                        }
                    }
                }
                vscode.window.showInformationMessage(`Ricwiz: Deleted ${deletedCount} local files from Git workspace.`);
            }
            if (toRetrieve.length === 0) {
                return;
            }
            // Build metadata string for retrieve
            let initialMetadata = toRetrieve
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
            outputChannel.appendLine(`Executing: ${retrieveCmd}`);
            vscode.window.showInformationMessage(`Ricwiz: Extracting ${toRetrieve.length} components...`);
            const retrieveResult = await (0, git_1.exec)(retrieveCmd, { cwd });
            outputChannel.appendLine(retrieveResult.stdout);
            if (retrieveResult.stderr) {
                outputChannel.appendLine('--- STDERR ---');
                outputChannel.appendLine(retrieveResult.stderr);
            }
            vscode.window.showInformationMessage('Ricwiz: Changes extracted successfully! Ready for Git Commit.');
        }
        catch (e) {
            vscode.window.showErrorMessage(`Ricwiz: Error capturing changes - ${e.message}`);
        }
    });
}
function translateToMetadata(action, display, section) {
    if (!action || !display || !section)
        return null;
    const act = action.toLowerCase();
    const sec = section.toLowerCase();
    // 1. Filter out known noisy / non-extractable sections
    const ignoredSections = ['security controls', 'network access', 'session settings', 'data export', 'login history', 'password policies', 'identity verification', 'delegated administration'];
    if (ignoredSections.includes(sec))
        return null;
    // Filter out user/login/password actions specifically
    if (act.includes('login') || act.includes('password') || act.includes('oauth') || act.includes('session'))
        return null;
    const isDelete = act.includes('delete') || act.includes('remove') || act.includes('disable');
    let metaString = null;
    // 2. Map standard metadata
    if (act.includes('profile')) {
        const parts = display.split(' ');
        metaString = `Profile:${parts[parts.length - 1]}`;
    }
    else if (act.includes('permission set')) {
        const parts = display.split(' ');
        metaString = `PermissionSet:${parts[parts.length - 1]}`;
    }
    else if (act.includes('apexclass')) {
        const parts = display.split(' ');
        metaString = `ApexClass:${parts[parts.length - 1]}`;
    }
    else if (act.includes('customfield')) {
        const fieldMatch = display.match(/([A-Za-z0-9_]+__c)/);
        const objMatch = display.match(/(?:on|na|for)\s+([A-Za-z0-9_]+)/i);
        if (fieldMatch && objMatch) {
            metaString = `CustomField:${objMatch[1]}.${fieldMatch[1]}`;
        }
        else {
            metaString = `CustomField:${display.replace(/\s+/g, '')}`;
        }
    }
    else if (act.includes('layout')) {
        metaString = `Layout:${display.trim()}`;
    }
    else if (act.includes('validation')) {
        metaString = `ValidationRule:${display.replace(/\s+/g, '')}`;
    }
    else if (act.includes('flow')) {
        metaString = `Flow:${display.replace(/\s+/g, '')}`;
    }
    else if (act.includes('customobject')) {
        const objMatch = display.match(/([A-Za-z0-9_]+__c)/);
        metaString = objMatch ? `CustomObject:${objMatch[1]}` : `CustomObject:${display.replace(/\s+/g, '')}`;
    }
    else {
        if (!act.includes('created') && !act.includes('changed') && !act.includes('deleted')) {
            return null;
        }
    }
    if (metaString) {
        return { metadataFormat: metaString, isDelete };
    }
    return null;
}
//# sourceMappingURL=captureAdminChanges.js.map