import * as vscode from 'vscode';

export class WorkflowContext {
    public readonly style: string;
    public readonly upstreamRemote: string;
    public readonly originRemote: string;

    constructor() {
        const config = vscode.workspace.getConfiguration('ricwiz');
        this.style = config.get<string>('workflowStyle', 'standard');
        
        if (this.style === 'multi-remote') {
            this.upstreamRemote = config.get<string>('upstreamRemote', 'salesforce-master');
            this.originRemote = config.get<string>('originRemote', 'origin');
        } else {
            // Standard workflow always uses 'origin' for everything
            this.upstreamRemote = 'origin';
            this.originRemote = 'origin';
        }
    }

    /**
     * Intelligently builds a remote/branch path.
     * If the user explicitly provided a remote prefix (e.g. 'origin/master'), it uses it.
     * Otherwise, it prefixes it with the upstream remote (e.g. 'salesforce-master' + '/' + 'master').
     */
    public buildUpstreamPath(sourceBranch: string): string {
        if (sourceBranch.includes('/')) {
            return sourceBranch;
        }
        return `${this.upstreamRemote}/${sourceBranch}`;
    }

    /**
     * Returns just the remote name for a fetch command, based on whether the branch name includes a remote.
     */
    public getFetchRemote(sourceBranch: string): string {
        if (sourceBranch.includes('/')) {
            return sourceBranch.split('/')[0];
        }
        return this.upstreamRemote;
    }

    /**
     * Returns just the branch name, stripping any explicit remote prefix.
     */
    public getFetchBranch(sourceBranch: string): string {
        if (sourceBranch.includes('/')) {
            return sourceBranch.substring(sourceBranch.indexOf('/') + 1);
        }
        return sourceBranch;
    }
}
