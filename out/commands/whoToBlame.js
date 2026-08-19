"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.getBlameData = getBlameData;
const vscode = require("vscode");
const path = require("path");
const git_1 = require("../git");
async function getBlameData() {
    const editor = vscode.window.activeTextEditor;
    if (!editor) {
        vscode.window.showErrorMessage('Ricwiz: Please open a file in the editor to check blame.');
        return null;
    }
    const filePath = editor.document.fileName;
    const fileName = path.basename(filePath);
    const cwd = (0, git_1.getWorkspaceCwd)();
    if (!cwd) {
        vscode.window.showErrorMessage('Ricwiz: Workspace is not a git repository.');
        return null;
    }
    // 1. Get Git Blame (last commit for this file)
    let gitAuthor = 'Unknown';
    let gitTime = 'Unknown';
    let gitCommit = 'Unknown';
    try {
        const { stdout } = await (0, git_1.exec)(`git log -1 --pretty=format:"%an|%ar|%s" -- "${filePath}"`, { cwd });
        const parts = stdout.trim().split('|');
        if (parts.length >= 3) {
            gitAuthor = parts[0];
            gitTime = parts[1];
            gitCommit = parts.slice(2).join('|');
        }
    }
    catch (e) {
        console.error('Git blame error:', e);
    }
    // 2. Get Salesforce Blame
    let sfAuthor = 'Unknown';
    let sfTime = 'Unknown';
    // Parse Metadata Type and Name from filepath
    const metaInfo = parseMetadataInfo(filePath);
    if (metaInfo) {
        try {
            await vscode.window.withProgress({
                location: vscode.ProgressLocation.Notification,
                title: `Ricwiz: Querying Salesforce for ${metaInfo.name}...`,
                cancellable: false
            }, async () => {
                let query = '';
                if (metaInfo.type === 'CustomField') {
                    // Custom fields are tricky in Tooling API, querying SetupAuditTrail is more generic or we just query FieldDefinition
                    // Actually, Tooling API allows querying CustomField by DeveloperName and TableEnumOrId
                    const parts = metaInfo.name.split('.');
                    if (parts.length === 2) {
                        query = `SELECT LastModifiedBy.Name, LastModifiedDate FROM CustomField WHERE DeveloperName = '${parts[1].replace('__c', '')}' AND TableEnumOrId = '${parts[0]}'`;
                    }
                }
                else if (metaInfo.type === 'LightningComponentBundle') {
                    query = `SELECT LastModifiedBy.Name, LastModifiedDate FROM LightningComponentBundle WHERE DeveloperName = '${metaInfo.name}'`;
                }
                else {
                    query = `SELECT LastModifiedBy.Name, LastModifiedDate FROM ${metaInfo.type} WHERE Name = '${metaInfo.name}'`;
                }
                if (query) {
                    const { stdout } = await (0, git_1.exec)(`sf data query -t -q "${query}" --json`, { cwd });
                    const res = JSON.parse(stdout);
                    if (res && res.result && res.result.records && res.result.records.length > 0) {
                        const record = res.result.records[0];
                        sfAuthor = record.LastModifiedBy ? record.LastModifiedBy.Name : 'Unknown';
                        // Format date nicely
                        const d = new Date(record.LastModifiedDate);
                        sfTime = d.toLocaleString();
                    }
                    else {
                        sfAuthor = 'Not found in Org';
                        sfTime = 'N/A';
                    }
                }
            });
        }
        catch (e) {
            console.error('Salesforce query error:', e);
            sfAuthor = 'Query Error';
            sfTime = 'N/A';
        }
    }
    else {
        sfAuthor = 'Unsupported Metadata Type';
        sfTime = 'N/A';
    }
    return {
        fileName,
        gitAuthor,
        gitTime,
        gitCommit,
        sfAuthor,
        sfTime
    };
}
function parseMetadataInfo(filePath) {
    const normalized = filePath.replace(/\\/g, '/');
    if (normalized.includes('/classes/')) {
        const match = normalized.match(/\/classes\/([^/.]+)\.cls/);
        if (match)
            return { type: 'ApexClass', name: match[1] };
    }
    if (normalized.includes('/triggers/')) {
        const match = normalized.match(/\/triggers\/([^/.]+)\.trigger/);
        if (match)
            return { type: 'ApexTrigger', name: match[1] };
    }
    if (normalized.includes('/lwc/')) {
        const match = normalized.match(/\/lwc\/([^/]+)\//);
        if (match)
            return { type: 'LightningComponentBundle', name: match[1] };
    }
    if (normalized.includes('/aura/')) {
        const match = normalized.match(/\/aura\/([^/]+)\//);
        if (match)
            return { type: 'AuraDefinitionBundle', name: match[1] };
    }
    if (normalized.includes('/objects/') && normalized.includes('/fields/')) {
        const objMatch = normalized.match(/\/objects\/([^/]+)\//);
        const fieldMatch = normalized.match(/\/fields\/([^/.]+)\.field/);
        if (objMatch && fieldMatch) {
            return { type: 'CustomField', name: `${objMatch[1]}.${fieldMatch[1]}` };
        }
    }
    return null;
}
//# sourceMappingURL=whoToBlame.js.map