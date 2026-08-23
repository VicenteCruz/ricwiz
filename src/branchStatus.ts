import { exec } from './git';
import { CommitEntry, EnvironmentConfig } from './types';
import { fetchMergeRequestStatus, hasGitlabToken } from './gitlabApi';

/** A related branch with its merge status */
export interface RelatedBranch {
    name: string;
    isMerged: boolean;
    pipelineStatus?: 'running' | 'success' | 'failed' | 'canceled' | 'skipped' | 'none';
    mrUrl?: string;
}

/**
 * Creates a ref-resolution cache that avoids calling `git rev-parse` multiple
 * times for the same ref within a single update cycle.
 */
function createRefCache() {
    const cache = new Map<string, Promise<string>>();

    /**
     * Resolves a git ref to its SHA, returning a cached promise if available.
     * Tries `origin/<ref>` first, falls back to `<ref>`.
     */
    function resolveEnvRef(cwd: string, sourceBranch: string): Promise<string> {
        const key = sourceBranch;
        const cached = cache.get(key);
        if (cached) {
            return cached;
        }

        const promise = (async () => {
            try {
                const { stdout } = await exec(`git rev-parse origin/${sourceBranch}`, { cwd });
                return stdout.trim();
            } catch {
                const { stdout } = await exec(`git rev-parse ${sourceBranch}`, { cwd });
                return stdout.trim();
            }
        })();

        cache.set(key, promise);
        return promise;
    }

    /**
     * Resolves the SHA of a specific branch ref.
     */
    function resolveBranchRef(cwd: string, branch: string): Promise<string> {
        const key = `branch:${branch}`;
        const cached = cache.get(key);
        if (cached) {
            return cached;
        }

        const promise = (async () => {
            const { stdout } = await exec(`git rev-parse ${branch}`, { cwd });
            return stdout.trim();
        })();

        cache.set(key, promise);
        return promise;
    }

    return { resolveEnvRef, resolveBranchRef };
}

/**
 * Checks whether a branch has been merged into its target environment branch.
 *
 * The check involves:
 * 1. Verifying the branch has a commit mentioning the ticket ID (via git log)
 * 2. Comparing SHAs — if identical, the branch tip is the env tip (merged)
 * 3. Using `git merge-base --is-ancestor` to confirm ancestry
 *
 * @param cwd - The workspace directory
 * @param branch - The branch to check (e.g., "SFPSC-1234-to-Qual")
 * @param ticketId - The ticket ID to grep for in commit messages
 * @param env - The target environment config
 * @param refCache - A ref cache to avoid duplicate rev-parse calls
 * @returns true if the branch is merged into the environment
 */
async function checkBranchMergeStatus(
    cwd: string,
    branch: string,
    ticketId: string,
    env: EnvironmentConfig,
    refCache: ReturnType<typeof createRefCache>
): Promise<boolean> {
    try {
        // 1. Check if the branch has commits mentioning this ticket
        const logCheck = await exec(
            `git --no-pager log ${branch} --grep="\\\\b${ticketId}\\\\b" -i -E -1 --format="%h"`,
            { cwd }
        ).catch(() => ({ stdout: '', stderr: '' }));

        if (!logCheck.stdout.trim()) {
            return false;
        }

        // 2. Compare branch SHA vs environment SHA
        const [branchSha, envSha] = await Promise.all([
            refCache.resolveBranchRef(cwd, branch),
            refCache.resolveEnvRef(cwd, env.sourceBranch)
        ]);

        if (branchSha === envSha) {
            // Same commit — branch tip is the env tip, consider not merged (same as original logic)
            return false;
        }

        // 3. Check ancestry: is the branch an ancestor of the env branch?
        try {
            await exec(`git merge-base --is-ancestor ${branch} origin/${env.sourceBranch}`, { cwd });
            return true;
        } catch {
            try {
                await exec(`git merge-base --is-ancestor ${branch} ${env.sourceBranch}`, { cwd });
                return true;
            } catch {
                return false;
            }
        }
    } catch {
        return false;
    }
}

/**
 * Finds the matching environment for a `-to-<EnvName>` style branch.
 * Returns undefined if the branch doesn't match any environment.
 */
function findMatchingEnv(branch: string, environments: EnvironmentConfig[]): EnvironmentConfig | undefined {
    return environments.find(env => branch.endsWith(`-to-${env.name}`));
}

/**
 * Collects merge status for all related branches in parallel.
 *
 * For each branch that matches a `-to-<Env>` pattern, checks whether it has
 * been merged into the corresponding environment. Branches that don't match
 * any environment are marked as not merged.
 *
 * Uses a shared ref cache so that `rev-parse` for the same environment ref
 * (e.g., `origin/quality`) is only executed once across all branches.
 *
 * @param cwd - The workspace directory
 * @param branches - Array of related branch names
 * @param ticketId - The ticket ID to verify in commit messages
 * @param environments - The configured environments
 * @returns Array of RelatedBranch objects with merge status
 */
export async function getRelatedBranchesStatus(
    cwd: string,
    branches: string[],
    ticketId: string,
    environments: EnvironmentConfig[]
): Promise<RelatedBranch[]> {
    const refCache = createRefCache();

    const hasGitlab = await hasGitlabToken();

    const results = await Promise.all(
        branches.map(async (branch): Promise<RelatedBranch> => {
            const env = findMatchingEnv(branch, environments);
            if (!env) {
                return { name: branch, isMerged: false };
            }

            if (hasGitlab) {
                const mrStatus = await fetchMergeRequestStatus(cwd, branch, env.sourceBranch);
                if (mrStatus) {
                    return { 
                        name: branch, 
                        isMerged: mrStatus.isMerged, 
                        pipelineStatus: mrStatus.pipelineStatus,
                        mrUrl: mrStatus.webUrl
                    };
                }
            }

            const isMerged = await checkBranchMergeStatus(cwd, branch, ticketId, env, refCache);
            return { name: branch, isMerged };
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
    environments: EnvironmentConfig[]
): Promise<boolean> {
    const env = findMatchingEnv(currentBranch, environments);
    if (!env) {
        return false;
    }

    const currentTicketId = currentBranch.replace(new RegExp(`-to-${env.name}$`, 'i'), '');
    
    if (await hasGitlabToken()) {
        const mrStatus = await fetchMergeRequestStatus(cwd, currentBranch, env.sourceBranch);
        if (mrStatus) {
            return mrStatus.isMerged;
        }
    }

    const refCache = createRefCache();
    return checkBranchMergeStatus(cwd, currentBranch, currentTicketId, env, refCache);
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
    const { stdout } = await exec(`git branch --list "*${ticketId}*"`, { cwd });
    return stdout.split('\n')
        .map((b: string) => b.replace('*', '').trim())
        .filter((b: string) => b && b !== currentBranch);
}
