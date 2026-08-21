import * as vscode from 'vscode';
import * as path from 'path';
import { exec, getWorkspaceCwd } from '../git';

export interface BlameData {
    fileName: string;
    gitHistory: { author: string, time: string, message: string, hash: string }[];
    sfAuthor: string;
    sfTime: string;
    sfCreatedBy: string;
    auditHistory: { action: string, display: string, author: string, time: string }[];
}

export async function getBlameData(): Promise<BlameData | null> {
    const editor = vscode.window.activeTextEditor;
    if (!editor) {
        vscode.window.showErrorMessage('Ricwiz: Please open a file in the editor to check blame.');
        return null;
    }

    const filePath = editor.document.fileName;
    const fileName = path.basename(filePath);
    const cwd = getWorkspaceCwd();

    if (!cwd) {
        vscode.window.showErrorMessage('Ricwiz: Workspace is not a git repository.');
        return null;
    }

    // 1. Get Git Blame (last 5 commits for this file)
    let gitHistory: { author: string, time: string, message: string, hash: string }[] = [];
    
    try {
        const { stdout } = await exec(`git log -5 --pretty=format:"%an|%ar|%s|%h" -- "${filePath}"`, { cwd });
        const lines = stdout.trim().split('\n');
        for (const line of lines) {
            const parts = line.split('|');
            if (parts.length >= 4) {
                gitHistory.push({
                    author: parts[0],
                    time: parts[1],
                    message: parts.slice(2, -1).join('|'),
                    hash: parts[parts.length - 1]
                });
            }
        }
    } catch (e) {
        console.error('Git blame error:', e);
    }

    // 2. Get Salesforce Blame
    let sfAuthor = 'Unknown';
    let sfTime = 'Unknown';
    let sfCreatedBy = 'Unknown';
    let auditHistory: { action: string, display: string, author: string, time: string }[] = [];

    // Parse Metadata Type and Name from filepath
    const metaInfo = parseMetadataInfo(filePath);
    
    if (metaInfo) {
        try {
            await vscode.window.withProgress({
                location: vscode.ProgressLocation.Notification,
                title: `Ricwiz: Analyzing ${metaInfo.name} in Salesforce...`,
                cancellable: false
            }, async () => {
                let query = '';
                if (metaInfo.type === 'CustomField') {
                    const parts = metaInfo.name.split('.');
                    if (parts.length === 2) {
                        query = `SELECT LastModifiedBy.Name, LastModifiedDate, CreatedBy.Name FROM CustomField WHERE DeveloperName = '${parts[1].replace('__c', '')}' AND TableEnumOrId = '${parts[0]}'`;
                    }
                } else if (metaInfo.type === 'LightningComponentBundle') {
                    query = `SELECT LastModifiedBy.Name, LastModifiedDate, CreatedBy.Name FROM LightningComponentBundle WHERE DeveloperName = '${metaInfo.name}'`;
                } else {
                    query = `SELECT LastModifiedBy.Name, LastModifiedDate, CreatedBy.Name FROM ${metaInfo.type} WHERE Name = '${metaInfo.name}'`;
                }

                if (query) {
                    try {
                        const { stdout } = await exec(`sf data query -t -q "${query}" --json`, { cwd, maxBuffer: 50 * 1024 * 1024 });
                        const res = JSON.parse(stdout);
                        if (res && res.result && res.result.records && res.result.records.length > 0) {
                            const record = res.result.records[0];
                            sfAuthor = record.LastModifiedBy ? record.LastModifiedBy.Name : 'Unknown';
                            sfCreatedBy = record.CreatedBy ? record.CreatedBy.Name : 'Unknown';
                            sfTime = new Date(record.LastModifiedDate).toLocaleString();
                        } else {
                            sfAuthor = 'Not found in Org';
                            sfTime = 'N/A';
                            sfCreatedBy = 'N/A';
                        }
                    } catch(e) {
                        sfAuthor = 'Query Error';
                        sfTime = 'N/A';
                        sfCreatedBy = 'N/A';
                    }
                }

                // 3. Query Audit Trail for this specific component
                // Fetch last 1500 audit trail events and filter in memory to avoid SOQL LIKE restrictions
                try {
                    const auditQuery = `SELECT Action, Display, CreatedBy.Name, CreatedDate FROM SetupAuditTrail ORDER BY CreatedDate DESC LIMIT 1500`;
                    const { stdout: auditOut } = await exec(`sf data query -q "${auditQuery}" --json`, { cwd, maxBuffer: 50 * 1024 * 1024 });
                    const auditRes = JSON.parse(auditOut);
                    
                    if (auditRes && auditRes.result && auditRes.result.records) {
                        const searchName = metaInfo.name.replace('__c', ''); // broaden search
                        const matches = auditRes.result.records.filter((r: any) => 
                            r.Display && r.Display.includes(searchName)
                        );
                        
                        auditHistory = matches.map((r: any) => ({
                            action: r.Action,
                            display: r.Display,
                            author: r.CreatedBy ? r.CreatedBy.Name : 'Unknown',
                            time: new Date(r.CreatedDate).toLocaleString()
                        })).slice(0, 10); // keep up to 10
                    }
                } catch(e) {
                    console.error('Audit trail query error:', e);
                }
            });
        } catch (e) {
            console.error('Salesforce query error:', e);
        }
    } else {
        sfAuthor = 'Unsupported Metadata Type';
        sfTime = 'N/A';
    }

    return {
        fileName,
        gitHistory,
        sfAuthor,
        sfTime,
        sfCreatedBy,
        auditHistory
    };
}

function parseMetadataInfo(filePath: string): { type: string, name: string } | null {
    const normalized = filePath.replace(/\\/g, '/');
    
    if (normalized.includes('/classes/')) {
        const match = normalized.match(/\/classes\/([^/.]+)\.cls/);
        if (match) return { type: 'ApexClass', name: match[1] };
    }
    if (normalized.includes('/triggers/')) {
        const match = normalized.match(/\/triggers\/([^/.]+)\.trigger/);
        if (match) return { type: 'ApexTrigger', name: match[1] };
    }
    if (normalized.includes('/lwc/')) {
        const match = normalized.match(/\/lwc\/([^/]+)\//);
        if (match) return { type: 'LightningComponentBundle', name: match[1] };
    }
    if (normalized.includes('/aura/')) {
        const match = normalized.match(/\/aura\/([^/]+)\//);
        if (match) return { type: 'AuraDefinitionBundle', name: match[1] };
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
