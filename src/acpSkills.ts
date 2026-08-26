import { exec, getWorkspaceCwd } from './git';
import { fetchJiraIssuesBatch } from './jiraApi';
import { BatchIssueResult } from './types';

/**
 * AI Skills exposed to the ACP agent via the ricwiz Inter-Extension API.
 *
 * These functions implement the Function Calling tools defined in the ACP
 * skill schema (get_git_blame, get_tickets_batch). They are intentionally
 * thin wrappers — all heavy lifting is delegated to existing shared modules.
 */
export const AiSkills = {
    /**
     * Runs git blame on a specific line range of a file.
     * Returns the raw git blame output for the ACP agent to parse and reason about.
     *
     * @param filepath - Path to the file, relative to the workspace root
     * @param lines    - Line range in git blame -L format, e.g. "45,50" or "10,10"
     */
    get_git_blame: async (filepath: string, lines: string): Promise<string> => {
        const cwd = getWorkspaceCwd();
        if (!cwd) {
            throw new Error('No workspace folder is open.');
        }

        // The -- separator before filepath prevents ambiguity with branch names
        const { stdout } = await exec(`git blame -L ${lines} -- "${filepath}"`, { cwd });
        return stdout;
    },

    /**
     * Fetches multiple Jira issues in a single JQL batch request (API v3).
     * ADF description fields are converted to plain text to minimise token usage
     * when the result is fed into the AI context window.
     *
     * @param ticketIds - Array of Jira issue keys, e.g. ["SFPSCA-1234", "SFPSCA-5678"]
     * @returns JSON string of BatchIssueResult[] — ready to be returned to the ACP agent
     */
    get_tickets_batch: async (ticketIds: string[]): Promise<string> => {
        const results: BatchIssueResult[] = await fetchJiraIssuesBatch(ticketIds);
        return JSON.stringify(results);
    }
};
