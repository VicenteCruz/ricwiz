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
}
