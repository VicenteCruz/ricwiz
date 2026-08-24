import * as vscode from 'vscode';
import * as path from 'path';
import { exec, getWorkspaceCwd, ricwizLogger } from '../git';
import { BlameData, BlameGitHistoryItem, BlameAuditHistoryItem } from '../types';
import { parseMetadataFromPath } from '../salesforce/metadata';

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
    let gitHistory: BlameGitHistoryItem[] = [];
    
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
    } catch (e: any) {
        ricwizLogger.appendLine(`[WhoToBlame] Git blame error: ${e.message}`);
    }

    // 2. Get Salesforce Blame
    let sfAuthor = 'Unknown';
    let sfTime = 'Unknown';
    let sfCreatedBy = 'Unknown';
    let auditHistory: BlameAuditHistoryItem[] = [];

    // Parse Metadata Type and Name from filepath
    const metaInfo = parseMetadataFromPath(filePath);
    
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
                    } catch(e: any) {
                        sfAuthor = 'Query Error';
                        sfTime = 'N/A';
                        sfCreatedBy = 'N/A';
                        ricwizLogger.appendLine(`[WhoToBlame] Query error: ${e.message}`);
                    }
                }

                // 3. Query Audit Trail for this specific component
                try {
                    const auditQuery = `SELECT Action, Display, CreatedBy.Name, CreatedDate FROM SetupAuditTrail ORDER BY CreatedDate DESC LIMIT 1500`;
                    const { stdout: auditOut } = await exec(`sf data query -q "${auditQuery}" --json`, { cwd, maxBuffer: 50 * 1024 * 1024 });
                    const auditRes = JSON.parse(auditOut);
                    
                    if (auditRes && auditRes.result && auditRes.result.records) {
                        const searchName = metaInfo.name.replace('__c', '');
                        const matches = auditRes.result.records.filter((r: any) => 
                            r.Display && r.Display.includes(searchName)
                        );
                        
                        auditHistory = matches.map((r: any): BlameAuditHistoryItem => ({
                            action: r.Action,
                            display: r.Display,
                            author: r.CreatedBy ? r.CreatedBy.Name : 'Unknown',
                            time: new Date(r.CreatedDate).toLocaleString()
                        })).slice(0, 10);
                    }
                } catch(e: any) {
                    ricwizLogger.appendLine(`[WhoToBlame] Audit trail query error: ${e.message}`);
                }
            });
        } catch (e: any) {
            ricwizLogger.appendLine(`[WhoToBlame] Salesforce query error: ${e.message}`);
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
