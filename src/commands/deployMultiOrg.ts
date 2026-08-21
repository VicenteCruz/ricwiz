import * as vscode from 'vscode';
import * as path from 'path';
import { exec, getWorkspaceCwd, ricwizLogger } from '../git';

export async function deployMultiOrg(): Promise<void> {
    const editor = vscode.window.activeTextEditor;
    if (!editor) {
        vscode.window.showErrorMessage('Ricwiz: Please open the file you want to deploy in the editor first.');
        return;
    }

    const fsPath = editor.document.uri.fsPath;
    const cwd = getWorkspaceCwd();
    if (!cwd) return;

    let orgListJson = '';
    await vscode.window.withProgress({
        location: vscode.ProgressLocation.Notification,
        title: 'Ricwiz: Fetching available Salesforce orgs...',
        cancellable: false
    }, async () => {
        try {
            const { stdout } = await exec('sf org list --json', { cwd });
            orgListJson = stdout;
        } catch (e: any) {
            orgListJson = e.stdout || '';
        }
    });

    if (!orgListJson) {
        vscode.window.showErrorMessage('Ricwiz: Failed to fetch orgs. Is Salesforce CLI installed?');
        return;
    }

    let orgs: any[] = [];
    try {
        const parsed = JSON.parse(orgListJson);
        const nonScratch = parsed.result?.nonScratchOrgs || [];
        const scratch = parsed.result?.scratchOrgs || [];
        orgs = [...nonScratch, ...scratch];
    } catch (e) {
        vscode.window.showErrorMessage('Ricwiz: Failed to parse org list.');
        return;
    }

    if (orgs.length === 0) {
        vscode.window.showInformationMessage('Ricwiz: No authenticated orgs found.');
        return;
    }

    const quickPickItems: vscode.QuickPickItem[] = orgs.map(org => ({
        label: org.alias || org.username,
        description: org.alias ? org.username : '',
        picked: org.isDefaultUsername
    }));

    const selectedOrgs = await vscode.window.showQuickPick(quickPickItems, {
        placeHolder: 'Select the org(s) to deploy this file to',
        canPickMany: true,
        ignoreFocusOut: true
    });

    if (!selectedOrgs || selectedOrgs.length === 0) return;

    const fileName = path.basename(fsPath);
    
    await vscode.window.withProgress({
        location: vscode.ProgressLocation.Notification,
        title: `Ricwiz: Deploying ${fileName} to ${selectedOrgs.length} org(s)...`,
        cancellable: false
    }, async () => {
        ricwizLogger.show(true);
        ricwizLogger.appendLine(`--- Starting Parallel Deploy of ${fileName} ---`);
        
        const promises = selectedOrgs.map(async (org) => {
            const orgIdentifier = org.label;
            ricwizLogger.appendLine(`[${orgIdentifier}] Deploying...`);
            try {
                const { stdout, stderr } = await exec(`sf project deploy start -d "${fsPath}" -o "${orgIdentifier}"`, { cwd });
                ricwizLogger.appendLine(`[${orgIdentifier}] ✅ Success`);
                if (stdout) ricwizLogger.appendLine(stdout);
                return { org: orgIdentifier, success: true };
            } catch (e: any) {
                ricwizLogger.appendLine(`[${orgIdentifier}] ❌ Failed`);
                if (e.stdout) ricwizLogger.appendLine(e.stdout);
                if (e.stderr) ricwizLogger.appendLine(e.stderr);
                return { org: orgIdentifier, success: false };
            }
        });

        const results = await Promise.all(promises);
        
        const successes = results.filter(r => r.success).length;
        const fails = results.filter(r => !r.success).length;
        
        if (fails === 0) {
            vscode.window.showInformationMessage(`Ricwiz: Successfully deployed to all ${successes} orgs!`);
        } else {
            vscode.window.showErrorMessage(`Ricwiz: Deploy finished with errors (${successes} success, ${fails} failed). Check Output channel.`);
        }
    });
}
