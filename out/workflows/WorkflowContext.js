"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.WorkflowContext = void 0;
const vscode = require("vscode");
const path = require("path");
const fs = require("fs");
class WorkflowContext {
    style;
    upstreamRemote;
    originRemote;
    ticketSourceBranch;
    ticketPrefix;
    environments;
    // Original configuration without overrides
    static baseConfig = vscode.workspace.getConfiguration('ricwiz');
    constructor(profile) {
        const config = WorkflowContext.baseConfig;
        this.style = profile?.workflowStyle || config.get('workflowStyle', 'standard');
        if (this.style === 'multi-remote') {
            this.upstreamRemote = profile?.upstreamRemote || config.get('upstreamRemote', 'salesforce-master');
            this.originRemote = profile?.originRemote || config.get('originRemote', 'origin');
        }
        else {
            this.upstreamRemote = 'origin';
            this.originRemote = 'origin';
        }
        this.ticketSourceBranch = profile?.ticketSourceBranch || config.get('ticketSourceBranch', 'main');
        this.ticketPrefix = profile?.ticketPrefix || config.get('ticketPrefix', 'SFPSCA-');
        const defaultEnv = [
            { name: 'Qual', sourceBranch: 'quality' },
            { name: 'Val', sourceBranch: 'validation' },
            { name: 'Prod', sourceBranch: 'main' }
        ];
        this.environments = profile?.environments || config.get('environments', defaultEnv);
    }
    static async initialize(cwd) {
        let profiles = WorkflowContext.baseConfig.get('profiles', []);
        // Also check ricwiz.json as a fallback
        const configPath = path.join(cwd, 'ricwiz.json');
        if (fs.existsSync(configPath)) {
            try {
                const fileContent = fs.readFileSync(configPath, 'utf-8');
                const parsed = JSON.parse(fileContent);
                if (parsed && Array.isArray(parsed.profiles)) {
                    profiles = [...profiles, ...parsed.profiles];
                }
            }
            catch (e) {
                vscode.window.showErrorMessage(`Ricwiz: Error parsing ricwiz.json: ${e.message}`);
            }
        }
        if (profiles.length > 0) {
            const items = profiles.map(p => p.name);
            const selected = await vscode.window.showQuickPick(items, {
                placeHolder: 'Ricwiz: Select Workflow Profile',
                ignoreFocusOut: true
            });
            if (!selected) {
                return undefined; // Cancelled
            }
            const profile = profiles.find(p => p.name === selected);
            return new WorkflowContext(profile);
        }
        return new WorkflowContext(); // Default behavior without profiles
    }
    buildUpstreamPath(sourceBranch) {
        if (sourceBranch.includes('/')) {
            return sourceBranch;
        }
        return `${this.upstreamRemote}/${sourceBranch}`;
    }
    getFetchRemote(sourceBranch) {
        if (sourceBranch.includes('/')) {
            return sourceBranch.split('/')[0];
        }
        return this.upstreamRemote;
    }
    getFetchBranch(sourceBranch) {
        if (sourceBranch.includes('/')) {
            return sourceBranch.substring(sourceBranch.indexOf('/') + 1);
        }
        return sourceBranch;
    }
}
exports.WorkflowContext = WorkflowContext;
//# sourceMappingURL=WorkflowContext.js.map