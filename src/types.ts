export interface CommitEntry {
    hash: string;
    message: string;
    timeAgo: string;
}

export interface EnvironmentConfig {
    name: string;
    sourceBranch: string;
}
