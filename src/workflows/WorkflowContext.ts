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
}
