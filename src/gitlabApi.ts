import * as https from 'https';
import * as vscode from 'vscode';
import { getGitlabToken } from './secrets';
import { exec } from './git';

export interface GitLabMRStatus {
    isMerged: boolean;
    isOpen: boolean;
    pipelineStatus: 'running' | 'success' | 'failed' | 'canceled' | 'skipped' | 'none';
    webUrl: string;
}

let projectPathCache: { [cwd: string]: string } = {};
let cachedWebUrl: string | null = null;

export async function hasGitlabToken(): Promise<boolean> {
    const token = await getGitlabToken();
    return !!(token && token.trim());
}

async function getGitlabTargets(cwd: string, ctx?: any): Promise<{baseUrl: string, token: string, projectPath: string}[]> {
    const config = vscode.workspace.getConfiguration('ricwiz');
    const token = (await getGitlabToken())?.trim();

    if (!token) {
        throw new Error('No GitLab token');
    }

    let webUrlOverride = ctx ? ctx.getConfig('gitlabUrlOverride', '') : config.get<string>('gitlabUrlOverride', '');
    
    let candidateUrls: string[] = [];
    if (webUrlOverride && webUrlOverride.trim() !== '') {
        candidateUrls.push(webUrlOverride.trim());
    } else {
        // Find all remotes
        try {
            const { stdout: remotesOut } = await exec(`git remote`, { cwd });
            const allRemotes = remotesOut.split('\n').map(r => r.trim()).filter(r => r);
            
            // Prioritize remotes
            const remotesToTry: string[] = [];
            if (ctx && ctx.upstreamRemote && allRemotes.includes(ctx.upstreamRemote)) {
                remotesToTry.push(ctx.upstreamRemote);
            }
            if (ctx && ctx.originRemote && ctx.originRemote !== ctx.upstreamRemote && allRemotes.includes(ctx.originRemote)) {
                remotesToTry.push(ctx.originRemote);
            }
            if (allRemotes.includes('upstream') && !remotesToTry.includes('upstream')) {
                remotesToTry.push('upstream');
            }
            if (allRemotes.includes('origin') && !remotesToTry.includes('origin')) {
                remotesToTry.push('origin');
            }
            
            // Fallback: If no recognized remotes were found, just try all available remotes!
            if (remotesToTry.length === 0 && allRemotes.length > 0) {
                remotesToTry.push(...allRemotes);
            }

            for (const remote of remotesToTry) {
                try {
                    const { stdout } = await exec(`git remote get-url ${remote}`, { cwd });
                    let remoteUrl = stdout.trim();
                    if (remoteUrl.endsWith('.git')) remoteUrl = remoteUrl.slice(0, -4);
                    if (remoteUrl.startsWith('git@')) {
                         remoteUrl = remoteUrl.replace('git@', '').replace(':', '/');
                         remoteUrl = `https://${remoteUrl}`;
                    }
                    candidateUrls.push(remoteUrl);
                } catch(e: any) {
                    ricwizLogger.appendLine(`[GitLab API] Error getting remote URL for ${remote}: ${e.message}`);
                }
            }
        } catch(e: any) {
            ricwizLogger.appendLine(`[GitLab API] Error getting remotes: ${e.message}`);
        }
    }

    if (candidateUrls.length === 0) {
        ricwizLogger.appendLine(`[GitLab API] No candidate URLs found in getGitlabTargets!`);
        throw new Error('Could not get any remote origin URL.');
    }

    // Map candidate URLs to Project Targets
    const targets = candidateUrls.map(webUrl => {
        const urlObj = new URL(webUrl);
        const baseUrl = `${urlObj.protocol}//${urlObj.host}`;
        let path = urlObj.pathname;
        if (path.startsWith('/')) path = path.substring(1);
        if (path.endsWith('/')) path = path.slice(0, -1);
        if (path.endsWith('.git')) path = path.slice(0, -4);
        const projectPath = encodeURIComponent(path);
        return { baseUrl, token, projectPath };
    });

    return targets;
}

export const ricwizLogger = vscode.window.createOutputChannel("Ricwiz Debug");

async function gitlabRequest<T>(cwd: string, baseUrl: string, token: string, method: string, path: string): Promise<T> {
    const url = new URL(`${baseUrl}${path}`);
    ricwizLogger.appendLine(`[GitLab API] ${method} ${url.toString()}`);

    return new Promise((resolve, reject) => {
        const req = https.request(url, {
            method,
            timeout: 5000,
            headers: {
                'PRIVATE-TOKEN': token,
                'Accept': 'application/json'
            }
        }, (res) => {
            let data = '';
            res.on('data', chunk => data += chunk);
            res.on('end', () => {
                ricwizLogger.appendLine(`[GitLab API] Response Code: ${res.statusCode}`);
                if (res.statusCode && res.statusCode >= 400) {
                    ricwizLogger.appendLine(`[GitLab API] Error Data: ${data}`);
                    return reject(new Error(`GitLab API error: ${res.statusCode}`));
                }
                if (!data) return resolve({} as T);
                try {
                    const json = JSON.parse(data);
                    if (Array.isArray(json)) {
                        ricwizLogger.appendLine(`[GitLab API] Returned array with ${json.length} items`);
                    } else if (json && typeof json === 'object') {
                        ricwizLogger.appendLine(`[GitLab API] Returned object with id ${json.id || json.iid || 'unknown'}`);
                    }
                    resolve(json as T);
                } catch (err: any) {
                    ricwizLogger.appendLine(`[GitLab API] Parse Error: ${err.message}`);
                    reject(err);
                }
            });
        });

        req.on('timeout', () => {
            req.destroy();
            reject(new Error('GitLab request timed out'));
        });

        req.on('error', (err) => {
            ricwizLogger.appendLine(`[GitLab API] Request Failed: ${err.message}`);
            reject(err);
        });
        req.end();
    });
}

// Caches for API responses to avoid rate limits
const mrCache = new Map<string, { data: GitLabMRStatus, timestamp: number }>();
const CACHE_TTL = 30 * 1000; // 30 seconds

export async function fetchMergeRequestStatus(cwd: string, sourceBranch: string, targetBranch?: string, ctx?: any): Promise<GitLabMRStatus | null> {
    ricwizLogger.appendLine(`[GitLab API] fetchMergeRequestStatus called for source: ${sourceBranch}, target: ${targetBranch || 'any'}`);
    const cacheKey = `${cwd}:${sourceBranch}:${targetBranch || 'any'}`;
    const cached = mrCache.get(cacheKey);
    if (cached && Date.now() - cached.timestamp < CACHE_TTL) {
        return cached.data;
    }

    try {
        const targets = await getGitlabTargets(cwd, ctx);
        let bestStatus: GitLabMRStatus | null = null;
        let bestMrWeight = -1; // Higher is better (2 = open, 1 = merged, 0 = closed)

        for (const target of targets) {
            try {
                let path = `/api/v4/projects/${target.projectPath}/merge_requests?source_branch=${encodeURIComponent(sourceBranch)}&order_by=updated_at&sort=desc`;
                if (targetBranch) {
                    path += `&target_branch=${encodeURIComponent(targetBranch)}`;
                }
                
                const mrs = await gitlabRequest<any[]>(cwd, target.baseUrl, target.token, 'GET', path);
                if (mrs && mrs.length > 0) {
                    let mr = mrs[0]; // most recently updated for this target
                    
                    try {
                        const detailedMr = await gitlabRequest<any>(cwd, target.baseUrl, target.token, 'GET', `/api/v4/projects/${target.projectPath}/merge_requests/${mr.iid}`);
                        if (detailedMr) {
                            mr = detailedMr;
                        }
                    } catch (e) {}

                    let pipelineStatus: GitLabMRStatus['pipelineStatus'] = 'none';
                    if (mr.head_pipeline && mr.head_pipeline.status) {
                        const s = mr.head_pipeline.status;
                        if (s === 'success' || s === 'failed' || s === 'canceled' || s === 'skipped') {
                            pipelineStatus = s;
                        } else {
                            pipelineStatus = 'running';
                        }
                    }

                    const status: GitLabMRStatus = {
                        isMerged: mr.state === 'merged',
                        isOpen: mr.state === 'opened',
                        pipelineStatus,
                        webUrl: mr.web_url
                    };
                    
                    let weight = 0;
                    if (status.isOpen) weight = 2;
                    else if (status.isMerged) weight = 1;

                    // If it's a better MR (e.g. open vs merged), or if it's the first one we found
                    if (weight > bestMrWeight) {
                        bestStatus = status;
                        bestMrWeight = weight;
                    }
                }
            } catch (e: any) {
                ricwizLogger.appendLine(`[GitLab API] Error inside target loop: ${e.message}`);
                // If it fails for this target, continue to the next
            }
        }
        
        if (bestStatus) {
            mrCache.set(cacheKey, { data: bestStatus, timestamp: Date.now() });
            return bestStatus;
        }

        // If no MR was found in ANY target, try to find a branch pipeline!
        for (const target of targets) {
            try {
                const path = `/api/v4/projects/${target.projectPath}/pipelines?ref=${encodeURIComponent(sourceBranch)}&order_by=updated_at&sort=desc`;
                const pipelines = await gitlabRequest<any[]>(cwd, target.baseUrl, target.token, 'GET', path);
                if (pipelines && pipelines.length > 0) {
                    const p = pipelines[0];
                    let pipelineStatus: GitLabMRStatus['pipelineStatus'] = 'none';
                    if (p.status) {
                        const s = p.status;
                        if (s === 'success' || s === 'failed' || s === 'canceled' || s === 'skipped') {
                            pipelineStatus = s;
                        } else {
                            pipelineStatus = 'running';
                        }
                    }
                    const status: GitLabMRStatus = {
                        isMerged: false,
                        isOpen: false,
                        pipelineStatus,
                        webUrl: p.web_url
                    };
                    mrCache.set(cacheKey, { data: status, timestamp: Date.now() });
                    return status;
                }
            } catch (e) {}
        }

        return null;
    } catch (e: any) {
        ricwizLogger.appendLine(`[GitLab API] Failed to fetch MR status: ${e.message}`);
        return null;
    }
}
