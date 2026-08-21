"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.WorkflowFactory = void 0;
const vscode = require("vscode");
// import { StandardWorkflow } from './StandardWorkflow';
// import { MultiRepoWorkflow } from './MultiRepoWorkflow';
class WorkflowFactory {
    static getWorkflow() {
        const config = vscode.workspace.getConfiguration('ricwiz');
        const style = config.get('workflowStyle', 'standard');
        if (style === 'multi-repo') {
            // return new MultiRepoWorkflow();
            throw new Error('Multi-Repo Workflow is not yet fully implemented.');
        }
        // Default to standard single-repo workflow
        // return new StandardWorkflow();
        throw new Error('Standard Workflow is not yet fully extracted.');
    }
}
exports.WorkflowFactory = WorkflowFactory;
//# sourceMappingURL=WorkflowFactory.js.map