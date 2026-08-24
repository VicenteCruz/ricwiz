import * as vscode from 'vscode';
import { getGitlabToken } from '../secrets';
import { getWorkspaceCwd } from '../git';
import { ricwizLogger } from '../gitlabApi';
import * as https from 'https';
import { WorkflowContext } from '../workflows/WorkflowContext';
import { exec } from '../git';

export async function showPipelineLogs(projectPath: string, pipelineId: number): Promise<void> {
    const cwd = getWorkspaceCwd();
    if (!cwd) return;
    
    const token = (await getGitlabToken())?.trim();
    if (!token) {
        vscode.window.showErrorMessage('Ricwiz: GitLab token is not configured.');
        return;
    }

    try {
        const ctx = await WorkflowContext.initialize(cwd, { skipPrompt: true });
        if (!ctx) return;
        const config = vscode.workspace.getConfiguration('ricwiz');
        let webUrlOverride = ctx.getConfig('gitlabUrlOverride', '');
        
        let baseUrl = webUrlOverride;
        if (!baseUrl) {
            // Find remote url that matches project path
            const { stdout: remotesOut } = await exec(`git remote`, { cwd });
            const allRemotes = remotesOut.split('\n').map(r => r.trim()).filter(r => r);
            let found = false;
            for (const remote of allRemotes) {
                const { stdout } = await exec(`git remote get-url ${remote}`, { cwd });
                let remoteUrl = stdout.trim();
                if (remoteUrl.endsWith('.git')) remoteUrl = remoteUrl.slice(0, -4);
                if (remoteUrl.startsWith('git@')) {
                    remoteUrl = remoteUrl.replace('git@', '').replace(':', '/');
                    remoteUrl = `https://${remoteUrl}`;
                }
                const urlObj = new URL(remoteUrl);
                let path = urlObj.pathname;
                if (path.startsWith('/')) path = path.substring(1);
                if (path.endsWith('/')) path = path.slice(0, -1);
                
                if (encodeURIComponent(path) === projectPath || path === projectPath) {
                    baseUrl = `${urlObj.protocol}//${urlObj.host}`;
                    found = true;
                    break;
                }
            }
            if (!found) {
                vscode.window.showErrorMessage(`Ricwiz: Could not determine base URL for project ${projectPath}`);
                return;
            }
        } else {
            const urlObj = new URL(baseUrl);
            baseUrl = `${urlObj.protocol}//${urlObj.host}`;
        }

        await vscode.window.withProgress({
            location: vscode.ProgressLocation.Notification,
            title: `Fetching failed jobs for Pipeline #${pipelineId}...`,
            cancellable: false
        }, async () => {
            const agent = new https.Agent({ keepAlive: true });
            const jobsUrl = new URL(`${baseUrl}/api/v4/projects/${projectPath}/pipelines/${pipelineId}/jobs?scope[]=failed`);
            const jobs = await new Promise<any[]>((resolve, reject) => {
                https.get(jobsUrl, { headers: { 'PRIVATE-TOKEN': token }, agent }, (res) => {
                    let data = '';
                    res.on('data', chunk => data += chunk);
                    res.on('end', () => {
                        if (res.statusCode === 200) {
                            try { resolve(JSON.parse(data)); } catch (e) { resolve([]); }
                        } else {
                            resolve([]);
                        }
                    });
                }).on('error', () => resolve([]));
            });

            if (!jobs || jobs.length === 0) {
                vscode.window.showInformationMessage('Ricwiz: No failed jobs found for this pipeline.');
                return;
            }

            // For now, let's just fetch the log for the first failed job
            const failedJob = jobs[0];
            const traceUrl = new URL(`${baseUrl}/api/v4/projects/${projectPath}/jobs/${failedJob.id}/trace`);
            
            const logData = await new Promise<string>((resolve, reject) => {
                https.get(traceUrl, { headers: { 'PRIVATE-TOKEN': token }, agent }, (res) => {
                    let data = '';
                    res.on('data', chunk => data += chunk);
                    res.on('end', () => resolve(data));
                }).on('error', (err) => resolve(`Failed to fetch log: ${err.message}`));
            });

            // Strip ANSI codes from log
            const cleanLog = logData.replace(/\x1B\[[0-9;]*[mK]/g, '');

            const channel = vscode.window.createOutputChannel(`Pipeline #${pipelineId} - Job ${failedJob.name}`);
            channel.appendLine(`Pipeline ID: ${pipelineId}`);
            channel.appendLine(`Job Name: ${failedJob.name}`);
            channel.appendLine(`Status: ${failedJob.status}`);
            channel.appendLine(`URL: ${failedJob.web_url}`);
            channel.appendLine('========================================');
            channel.appendLine(cleanLog);
            channel.show();
        });

    } catch (e: any) {
        vscode.window.showErrorMessage(`Ricwiz: Error fetching pipeline logs - ${e.message}`);
    }
}
