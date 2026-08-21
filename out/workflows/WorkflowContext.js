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
}
exports.WorkflowContext = WorkflowContext;
//# sourceMappingURL=WorkflowContext.js.map