"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.WorkflowContext = void 0;
const vscode = require("vscode");
class WorkflowContext {
    style;
    upstreamRemote;
    originRemote;
    constructor() {
        const config = vscode.workspace.getConfiguration('ricwiz');
        this.style = config.get('workflowStyle', 'standard');
        if (this.style === 'multi-remote') {
            this.upstreamRemote = config.get('upstreamRemote', 'salesforce-master');
            this.originRemote = config.get('originRemote', 'origin');
        }
        else {
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
    buildUpstreamPath(sourceBranch) {
        if (sourceBranch.includes('/')) {
            return sourceBranch;
        }
        return `${this.upstreamRemote}/${sourceBranch}`;
    }
    /**
     * Returns just the remote name for a fetch command, based on whether the branch name includes a remote.
     */
    getFetchRemote(sourceBranch) {
        if (sourceBranch.includes('/')) {
            return sourceBranch.split('/')[0];
        }
        return this.upstreamRemote;
    }
    /**
     * Returns just the branch name, stripping any explicit remote prefix.
     */
    getFetchBranch(sourceBranch) {
        if (sourceBranch.includes('/')) {
            return sourceBranch.substring(sourceBranch.indexOf('/') + 1);
        }
        return sourceBranch;
    }
}
exports.WorkflowContext = WorkflowContext;
//# sourceMappingURL=WorkflowContext.js.map