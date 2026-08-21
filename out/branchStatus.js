"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.getRelatedBranchesStatus = getRelatedBranchesStatus;
exports.getCurrentBranchMergeStatus = getCurrentBranchMergeStatus;
exports.getRecentCommits = getRecentCommits;
exports.getRecentTickets = getRecentTickets;
exports.findRelatedBranches = findRelatedBranches;
const git_1 = require("./git");
/**
 * Creates a ref-resolution cache that avoids calling `git rev-parse` multiple
 * times for the same ref within a single update cycle.
 */
function createRefCache() {
    const cache = new Map();
    /**
     * Resolves a git ref to its SHA, returning a cached promise if available.
     * Tries `origin/<ref>` first, falls back to `<ref>`.
     */
    function resolveEnvRef(cwd, sourceBranch) {
        const key = sourceBranch;
        const cached = cache.get(key);
        if (cached) {
            return cached;
        }
        const promise = (async () => {
            try {
                const { stdout } = await (0, git_1.exec)(`git rev-parse origin/${sourceBranch}`, { cwd });
                return stdout.trim();
            }
            catch {
                const { stdout } = await (0, git_1.exec)(`git rev-parse ${sourceBranch}`, { cwd });
                return stdout.trim();
            }
        })();
        cache.set(key, promise);
        return promise;
    }
    /**
     * Resolves the SHA of a specific branch ref.
     */
    function resolveBranchRef(cwd, branch) {
        const key = `branch:${branch}`;
        const cached = cache.get(key);
        if (cached) {
            return cached;
        }
        const promise = (async () => {
            const { stdout } = await (0, git_1.exec)(`git rev-parse ${branch}`, { cwd });
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
async function checkBranchMergeStatus(cwd, branch, ticketId, env, refCache) {
    try {
        // 1. Check if the branch has commits mentioning this ticket
        const logCheck = await (0, git_1.exec)(`git --no-pager log ${branch} --grep="\\\\b${ticketId}\\\\b" -i -E -1 --format="%h"`, { cwd }).catch(() => ({ stdout: '', stderr: '' }));
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
            await (0, git_1.exec)(`git merge-base --is-ancestor ${branch} origin/${env.sourceBranch}`, { cwd });
            return true;
        }
        catch {
            try {
                await (0, git_1.exec)(`git merge-base --is-ancestor ${branch} ${env.sourceBranch}`, { cwd });
                return true;
            }
            catch {
                return false;
            }
        }
    }
    catch {
        return false;
    }
}
/**
 * Finds the matching environment for a `-to-<EnvName>` style branch.
 * Returns undefined if the branch doesn't match any environment.
 */
function findMatchingEnv(branch, environments) {
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
async function getRelatedBranchesStatus(cwd, branches, ticketId, environments) {
    const refCache = createRefCache();
    const results = await Promise.all(branches.map(async (branch) => {
        const env = findMatchingEnv(branch, environments);
        if (!env) {
            return { name: branch, isMerged: false };
        }
        const isMerged = await checkBranchMergeStatus(cwd, branch, ticketId, env, refCache);
        return { name: branch, isMerged };
    }));
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
async function getCurrentBranchMergeStatus(cwd, currentBranch, environments) {
    const env = findMatchingEnv(currentBranch, environments);
    if (!env) {
        return false;
    }
    const currentTicketId = currentBranch.replace(new RegExp(`-to-${env.name}$`, 'i'), '');
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
async function getRecentCommits(cwd, count = 10) {
    try {
        const { stdout } = await (0, git_1.exec)(`git log --oneline -${count} --format="%h|||%s|||%ar"`, { cwd });
        return stdout.split('\n')
            .filter((line) => line.trim())
            .map((line) => {
            const parts = line.split('|||');
            return {
                hash: parts[0] || '',
                message: parts.length >= 3 ? parts.slice(1, -1).join('|||') : (parts[1] || ''),
                timeAgo: parts.length >= 3 ? parts[parts.length - 1] : ''
            };
        });
    }
    catch {
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
async function getRecentTickets(cwd, limit = 3) {
    try {
        const { stdout } = await (0, git_1.exec)(`git for-each-ref --sort=-committerdate --format="%(refname:short)" refs/heads/`, { cwd });
        const allBranches = stdout.split('\n').map((b) => b.trim()).filter((b) => b);
        // Match ticket patterns (e.g., SFPSC-11111) but NOT environment branches (-to-Qual)
        const ticketPattern = /^[A-Z]+-\d+$/i;
        return allBranches.filter((b) => ticketPattern.test(b)).slice(0, limit);
    }
    catch {
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
async function findRelatedBranches(cwd, ticketId, currentBranch) {
    const { stdout } = await (0, git_1.exec)(`git branch --list "*${ticketId}*"`, { cwd });
    return stdout.split('\n')
        .map((b) => b.replace('*', '').trim())
        .filter((b) => b && b !== currentBranch);
}
//# sourceMappingURL=branchStatus.js.map