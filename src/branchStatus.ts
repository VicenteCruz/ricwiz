import { exec } from './git';
import { CommitEntry, EnvironmentConfig } from './types';
import { fetchMergeRequestStatus, hasGitlabToken } from './gitlabApi';

/** A related branch with its merge status */
export interface RelatedBranch {
    name: string;
    isMerged: boolean;
    pipelineStatus?: 'running' | 'success' | 'failed' | 'canceled' | 'skipped' | 'none';
    mrUrl?: string;
    projectPath?: string;
    pipelineId?: number;
}

/**
 * Finds the matching environment for a `-to-<EnvName>` style branch.
 * Returns undefined if the branch doesn't match any environment.
 */
function findMatchingEnv(branch: string, environments: EnvironmentConfig[]): EnvironmentConfig | undefined {
    return environments.find(env => branch.endsWith(`-to-${env.name}`));
}

/**
 * Collects merge status for all related branches in parallel using GitLab API.
 * Branches that don't match any environment are marked as not merged.
 * If no GitLab token is configured, no merge status will be retrieved.
 *
 * @param cwd - The workspace directory
 * @param branches - Array of related branch names
 * @param ticketId - The ticket ID (unused now, kept for signature compatibility)
 * @param environments - The configured environments
 * @returns Array of RelatedBranch objects with merge status
 */
export async function getRelatedBranchesStatus(
    cwd: string,
    branches: string[],
    ticketId: string,
    environments: EnvironmentConfig[],
    ctx?: any
): Promise<RelatedBranch[]> {
    const hasGitlab = await hasGitlabToken();

    const results = await Promise.all(
        branches.map(async (branch): Promise<RelatedBranch> => {
            const env = findMatchingEnv(branch, environments);

            if (hasGitlab) {
                // If it's a deploy branch, we know exactly what target branch to look for.
                // If it's the main branch, we just look for any MR originating from it.
                const targetBranch = env ? env.sourceBranch : undefined;
                const mrStatus = await fetchMergeRequestStatus(cwd, branch, targetBranch, ctx);
                if (mrStatus) {
                    return { 
                        name: branch, 
                        isMerged: mrStatus.isMerged, 
                        pipelineStatus: mrStatus.pipelineStatus,
                        mrUrl: mrStatus.webUrl,
                        projectPath: mrStatus.projectPath,
                        pipelineId: mrStatus.pipelineId
                    };
                }
            } else {
                const { ricwizLogger } = require('./gitlabApi');
                ricwizLogger.appendLine(`[GitLab API] Skipping MR check for ${branch} because hasGitlabToken() is false`);
            }

            return { name: branch, isMerged: false };
        })
    );

    return results;
}

/**
 * Checks whether the current branch (if it's a `-to-<Env>` branch) has been
 * merged into its target environment.
 *
 * @param cwd - The workspace directory
 * @param currentBranch - The currently checked-out branch name
 * @param environments - The configured environments
 * @returns true if the current branch is merged into its target environment
 */
export async function getCurrentBranchMergeStatus(
    cwd: string,
    currentBranch: string,
    environments: EnvironmentConfig[],
    ctx?: any
): Promise<boolean> {
    const env = findMatchingEnv(currentBranch, environments);
    if (!env) {
        return false;
    }

    if (await hasGitlabToken()) {
        const mrStatus = await fetchMergeRequestStatus(cwd, currentBranch, env.sourceBranch, ctx);
        if (mrStatus) {
            return mrStatus.isMerged;
        }
    } else {
        const { ricwizLogger } = require('./gitlabApi');
        ricwizLogger.appendLine(`[GitLab API] Skipping MR check for current branch ${currentBranch} because hasGitlabToken() is false`);
    }

    return false;
}

/**
 * Fetches the most recent commits from the current branch.
 *
 * @param cwd - The workspace directory
 * @param count - Number of commits to fetch (default 10)
 * @returns Array of CommitEntry objects
 */
export async function getRecentCommits(cwd: string, count: number = 10): Promise<CommitEntry[]> {
    try {
        const { stdout } = await exec(`git log --oneline -${count} --format="%h|||%s|||%ar"`, { cwd });
        return stdout.split('\n')
            .filter((line: string) => line.trim())
            .map((line: string) => {
                const parts = line.split('|||');
                return {
                    hash: parts[0] || '',
                    message: parts.length >= 3 ? parts.slice(1, -1).join('|||') : (parts[1] || ''),
                    timeAgo: parts.length >= 3 ? parts[parts.length - 1] : ''
                };
            });
    } catch {
        return [];
    }
}

/**
 * Fetches recent ticket branch names (branches matching a ticket pattern
 * like `SFPSC-1234`) sorted by most recent commit date.
 *
 * Used when the current branch is not a ticket branch, to show quick-access
 * links in the sidebar.
 *
 * @param cwd - The workspace directory
 * @param limit - Maximum number of tickets to return (default 3)
 * @returns Array of ticket branch names
 */
export async function getRecentTickets(cwd: string, limit: number = 3): Promise<string[]> {
    try {
        const { stdout } = await exec(
            `git for-each-ref --sort=-committerdate --format="%(refname:short)" refs/heads/`,
            { cwd }
        );
        const allBranches = stdout.split('\n').map((b: string) => b.trim()).filter((b: string) => b);

        // Match ticket patterns (e.g., SFPSC-11111) but NOT environment branches (-to-Qual)
        const ticketPattern = /^[A-Z]+-\d+$/i;
        return allBranches.filter((b: string) => ticketPattern.test(b)).slice(0, limit);
    } catch {
        return [];
    }
}

/**
 * Finds all local branches whose name contains the given ticket ID,
 * excluding the current branch.
 *
 * @param cwd - The workspace directory
 * @param ticketId - The ticket ID to search for
 * @param currentBranch - The current branch to exclude from results
 * @returns Array of matching branch names
 */
export async function findRelatedBranches(cwd: string, ticketId: string, currentBranch: string): Promise<string[]> {
    const { stdout } = await exec(`git branch --all --list "*${ticketId}*"`, { cwd });
    
    const branches = new Set<string>();
    // Ensure the ticket ID is not immediately followed by another digit (e.g. searching CRC-123 doesn't match CRC-1234)
    const exactTicketRegex = new RegExp(`${ticketId}(?!\\d)`, 'i');
    
    stdout.split('\n').forEach((b: string) => {
        let cleanName = b.replace('*', '').trim();
        if (!cleanName) return;
        
        if (cleanName.startsWith('remotes/')) {
            const parts = cleanName.split('/');
            if (parts.length > 2) {
                cleanName = parts.slice(2).join('/');
            }
        }
        
        if (cleanName && cleanName !== currentBranch && !cleanName.includes('HEAD') && exactTicketRegex.test(cleanName)) {
            branches.add(cleanName);
        }
    });

    return Array.from(branches);
}

/**
 * Dynamically resolves the actual name of a ticket branch (main or env) 
 * by checking what actually exists in the local git repository.
 * This handles cases where branches have custom prefixes (e.g. CRC-R19-).
 */
export async function resolveExistingBranchName(cwd: string, ticketId: string, envName?: string): Promise<string> {
    try {
        const cp = require('child_process');
        const util = require('util');
        const exec = util.promisify(cp.exec);
        
        const { stdout } = await exec(`git branch --all --list "*${ticketId}*"`, { cwd });
        const exactTicketRegex = new RegExp(`${ticketId}(?!\\d)`, 'i');
        
        const branches = stdout.split('\n')
            .map((b: string) => b.replace('*', '').trim().replace(/^remotes\/[^\/]+\//, ''))
            .filter((b: string) => b && !b.includes('HEAD') && exactTicketRegex.test(b));
            
        const uniqueBranches = Array.from<string>(new Set<string>(branches));

        if (envName) {
            const suffix = `-to-${envName}`;
            const match = uniqueBranches.find((b: string) => b.endsWith(suffix));
            if (match) return match;
            return `${ticketId}${suffix}`;
        } else {
            const match = uniqueBranches.find((b: string) => !b.includes('-to-'));
            if (match) return match;
            return ticketId;
        }
    } catch (e) {
        return envName ? `${ticketId}-to-${envName}` : ticketId;
    }
}
