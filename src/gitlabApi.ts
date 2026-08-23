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

export async function hasGitlabToken(): Promise<boolean> {
    const token = await getGitlabToken();
    return !!(token && token.trim());
}

async function getGitlabAuthAndBaseUrl(cwd: string) {
    const config = vscode.workspace.getConfiguration('ricwiz');
    const token = (await getGitlabToken())?.trim();

    if (!token) {
        throw new Error('No GitLab token');
    }

    let webUrl = config.get<string>('gitlabUrlOverride', '');
    if (!webUrl || webUrl.trim() === '') {
        try {
            const { stdout } = await exec('git remote get-url origin', { cwd });
            let remoteUrl = stdout.trim();
            
            if (remoteUrl.endsWith('.git')) {
                remoteUrl = remoteUrl.slice(0, -4);
            }
            if (remoteUrl.startsWith('git@')) {
                remoteUrl = remoteUrl.replace('git@', '').replace(':', '/');
                remoteUrl = `https://${remoteUrl}`;
            }
            
            // remoteUrl is now something like https://gitlab.com/empresa/projeto
            webUrl = remoteUrl;
        } catch (e) {
            throw new Error('Could not get remote origin URL.');
        }
    }
    
    // Extract domain and project path
    // https://gitlab.com/empresa/projeto
    const urlObj = new URL(webUrl);
    const baseUrl = `${urlObj.protocol}//${urlObj.host}`;
    
    let projectPath = projectPathCache[cwd];
    if (!projectPath) {
        let path = urlObj.pathname;
        if (path.startsWith('/')) path = path.substring(1);
        if (path.endsWith('/')) path = path.slice(0, -1);
        if (path.endsWith('.git')) path = path.slice(0, -4);
        projectPath = encodeURIComponent(path);
        projectPathCache[cwd] = projectPath;
    }

    return { baseUrl, token, projectPath };
}

async function gitlabRequest<T>(cwd: string, method: string, path: string): Promise<T> {
    const { baseUrl, token } = await getGitlabAuthAndBaseUrl(cwd);
    const url = new URL(`${baseUrl}${path}`);

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
                if (res.statusCode && res.statusCode >= 400) {
                    return reject(new Error(`GitLab API error: ${res.statusCode}`));
                }
                if (!data) return resolve({} as T);
                try {
                    const json = JSON.parse(data);
                    resolve(json as T);
                } catch(e) {
                    reject(new Error('Failed to parse GitLab response.'));
                }
            });
        });

        req.on('timeout', () => {
            req.destroy();
            reject(new Error('GitLab request timed out'));
        });
        
        req.on('error', (e) => reject(new Error(`Network error: ${e.message}`)));
        req.end();
    });
}

// Caches for API responses to avoid rate limits
const mrCache = new Map<string, { data: GitLabMRStatus, timestamp: number }>();
const CACHE_TTL = 30 * 1000; // 30 seconds

export async function fetchMergeRequestStatus(cwd: string, sourceBranch: string, targetBranch: string): Promise<GitLabMRStatus | null> {
    const cacheKey = `${cwd}:${sourceBranch}:${targetBranch}`;
    const cached = mrCache.get(cacheKey);
    if (cached && Date.now() - cached.timestamp < CACHE_TTL) {
        return cached.data;
    }

    try {
        const { projectPath } = await getGitlabAuthAndBaseUrl(cwd);
        // We query MRs where source_branch = sourceBranch and target_branch = targetBranch
        const path = `/api/v4/projects/${projectPath}/merge_requests?source_branch=${encodeURIComponent(sourceBranch)}&target_branch=${encodeURIComponent(targetBranch)}&order_by=updated_at&sort=desc`;
        
        const mrs = await gitlabRequest<any[]>(cwd, 'GET', path);
        if (mrs && mrs.length > 0) {
            const mr = mrs[0]; // most recently updated
            
            let pipelineStatus: GitLabMRStatus['pipelineStatus'] = 'none';
            if (mr.head_pipeline && mr.head_pipeline.status) {
                // GitLab statuses: running, pending, success, failed, canceled, skipped
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
            
            mrCache.set(cacheKey, { data: status, timestamp: Date.now() });
            return status;
        }
        return null;
    } catch (e) {
        return null;
    }
}
