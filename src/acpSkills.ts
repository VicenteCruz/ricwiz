
import { fetchJiraIssuesBatch } from './jiraApi';
import { BatchIssueResult } from './types';

/**
 * AI Skills exposed to the ACP agent via the ricwiz Inter-Extension API.
 *
 * These functions implement the Function Calling tools defined in the ACP
 * skill schema. Note: The agent has native access to the terminal to run
 * git commands (like git blame), so git tools are not exposed here.
 * However, the agent does NOT have native Jira access, so we expose Jira fetching.
 */
export const AiSkills = {

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
