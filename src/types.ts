export interface CommitEntry {
    hash: string;
    message: string;
    timeAgo: string;
}

export interface EnvironmentConfig {
    name: string;
    sourceBranch: string;
}

export interface WorkflowProfile {
    name: string;
    workflowStyle?: 'standard' | 'multi-remote' | string;
    upstreamRemote?: string;
    originRemote?: string;
    ticketSourceBranch?: string;
    ticketPrefix?: string;
    branchPrefix?: string;
    environments?: EnvironmentConfig[];
    [key: string]: any;
}

export interface RelatedBranch {
    name: string;
    isMerged: boolean;
    pipelineStatus?: 'running' | 'success' | 'failed' | 'canceled' | 'skipped' | 'none';
    mrUrl?: string;
    projectPath?: string;
    pipelineId?: number;
}

export interface GitLabMRStatus {
    isMerged: boolean;
    isOpen: boolean;
    pipelineStatus: 'running' | 'success' | 'failed' | 'canceled' | 'skipped' | 'none';
    webUrl: string;
    projectPath?: string;
    pipelineId?: number;
}

export interface JiraIssueData {
    summary: string;
    description: string;
    status: string;
    url?: string;
}

export interface JiraTransition {
    id: string;
    name: string;
}

export interface JiraSearchResult {
    key: string;
    summary: string;
    status: string;
    assignee: string;
}

export interface BlameGitHistoryItem {
    author: string;
    time: string;
    message: string;
    hash: string;
}

export interface BlameAuditHistoryItem {
    action: string;
    display: string;
    author: string;
    time: string;
}

export interface BlameData {
    fileName: string;
    gitHistory: BlameGitHistoryItem[];
    sfAuthor: string;
    sfTime: string;
    sfCreatedBy: string;
    auditHistory: BlameAuditHistoryItem[];
}


export interface ConflictedFileData {
    file: string;
    state: string;
}

export interface ConflictState {
    isConflict: boolean;
    sourceStr: string;
    targetStr: string;
    deletionsCount: number;
    files?: ConflictedFileData[];
}

export interface JiraDashboardQuery {
    name: string;
    jql: string;
}

export interface EnrichedJiraSearchResult extends JiraSearchResult {
    branch?: string | null;
    detailedBranches?: RelatedBranch[];
}

export interface JiraDashboardData {
    queries: JiraDashboardQuery[];
    selectedIndex: number;
    results: EnrichedJiraSearchResult[];
    error: string | null;
}

export interface JiraDetailsData extends JiraIssueData {
    ticketId: string;
    relatedBranches: RelatedBranch[];
}

/** Minimal reference to a related Jira issue (used in parent, subtasks, and issueLinks) */
export interface IssueSummary {
    key: string;
    title: string;
}

/** A directional link between two Jira issues */
export interface IssueLink {
    /** Relationship label from the perspective of this issue, e.g. "blocks", "is blocked by", "relates to" */
    type: string;
    issue: IssueSummary;
}

/** Result of a single issue in a batch Jira fetch */
export interface BatchIssueResult {
    key: string;
    title: string;
    description: string;
    /** Direct parent ticket (Epic, Story, etc.) if this issue has one */
    parent?: IssueSummary;
    /** Child sub-tasks of this issue */
    subtasks: IssueSummary[];
    /** Linked issues with their relationship type */
    issueLinks: IssueLink[];
}


/** Jira credentials exposed via the Inter-Extension API */
export interface JiraCredentials {
    email: string;
    token: string | undefined;
}

/**
 * Public API contract exported by the ricwiz extension's activate() function.
 * Consumed by the ACP extension via vscode.extensions.getExtension(...).exports
 */
export interface RicwizPublicApi {
    /** Returns Jira email (from settings) and API token (from SecretStorage) */
    getJiraCredentials: () => Promise<JiraCredentials>;
    /** Returns the GitLab API token from SecretStorage */
    getGitLabToken: () => Promise<string | undefined>;
    /** AI Skills invocable by the ACP agent via Function Calling */
    AiSkills: {
        /**
         * Runs git blame on a specific line range of a file.
         * @param filepath - Relative path to the file from workspace root
         * @param lines - Line range in git blame -L format, e.g. "45,50"
         */
        get_git_blame: (filepath: string, lines: string) => Promise<string>;
        /**
         * Fetches multiple Jira tickets in a single JQL batch request (API v3).
         * Returns a JSON string of BatchIssueResult[] with ADF descriptions converted to plain text.
         * @param ticketIds - Array of Jira issue keys, e.g. ["SFPSCA-1234", "SFPSCA-5678"]
         */
        get_tickets_batch: (ticketIds: string[]) => Promise<string>;
    };
}
