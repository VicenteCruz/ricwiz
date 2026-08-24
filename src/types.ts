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

export interface TicketInfo {
    ticketId: string;
    currentBranch: string;
    prefix: string;
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
