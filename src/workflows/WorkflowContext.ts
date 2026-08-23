import * as vscode from 'vscode';
import * as path from 'path';
import * as fs from 'fs';
import { EnvironmentConfig } from '../types';

export interface WorkflowProfile {
    name: string;
    [key: string]: any; // Allow arbitrary property overrides (like defaultReviewers, jiraUrl, etc)
}

export class WorkflowContext {
    public readonly style: string;
    public readonly upstreamRemote: string;
    public readonly originRemote: string;
    public readonly ticketSourceBranch: string;
    public readonly ticketPrefix: string;
    public readonly environments: EnvironmentConfig[];
    
    // Original configuration without overrides
    private static baseConfig = vscode.workspace.getConfiguration('ricwiz');
    private activeProfile?: WorkflowProfile;

    private constructor(profile?: WorkflowProfile) {
        this.activeProfile = profile;
        const config = WorkflowContext.baseConfig;
        
        this.style = profile?.workflowStyle || config.get<string>('workflowStyle', 'standard');
        
        if (this.style === 'multi-remote') {
            this.upstreamRemote = profile?.upstreamRemote || config.get<string>('upstreamRemote', 'salesforce-master');
            this.originRemote = profile?.originRemote || config.get<string>('originRemote', 'origin');
        } else {
            this.upstreamRemote = 'origin';
            this.originRemote = 'origin';
        }

        this.ticketSourceBranch = profile?.ticketSourceBranch || config.get<string>('ticketSourceBranch', 'main');
        this.ticketPrefix = profile?.ticketPrefix || config.get<string>('ticketPrefix', 'SFPSCA-');
        
        const defaultEnv = [
            { name: 'Qual', sourceBranch: 'quality' },
            { name: 'Val', sourceBranch: 'validation' },
            { name: 'Prod', sourceBranch: 'main' }
        ];
        this.environments = profile?.environments || config.get<EnvironmentConfig[]>('environments', defaultEnv);
    }

    /**
     * Gets a configuration value, prioritizing the active profile override, then global settings, then default.
     */
    public getConfig<T>(key: string, defaultValue: T): T {
        if (this.activeProfile && this.activeProfile[key] !== undefined) {
            return this.activeProfile[key] as T;
        }
        return WorkflowContext.baseConfig.get<T>(key, defaultValue);
    }

    public static async initialize(cwd: string): Promise<WorkflowContext | undefined> {
        let profiles: WorkflowProfile[] = WorkflowContext.baseConfig.get<WorkflowProfile[]>('profiles', []);

        // Also check ricwiz.json as a fallback
        const configPath = path.join(cwd, 'ricwiz.json');
        if (fs.existsSync(configPath)) {
            try {
                const fileContent = fs.readFileSync(configPath, 'utf-8');
                const parsed = JSON.parse(fileContent);
                if (parsed && Array.isArray(parsed.profiles)) {
                    profiles = [...profiles, ...parsed.profiles];
                }
            } catch (e: any) {
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

    public buildUpstreamPath(sourceBranch: string): string {
        if (sourceBranch.includes('/')) {
            return sourceBranch;
        }
        return `${this.upstreamRemote}/${sourceBranch}`;
    }

    public getFetchRemote(sourceBranch: string): string {
        if (sourceBranch.includes('/')) {
            return sourceBranch.split('/')[0];
        }
        return this.upstreamRemote;
    }

    public getFetchBranch(sourceBranch: string): string {
        if (sourceBranch.includes('/')) {
            return sourceBranch.substring(sourceBranch.indexOf('/') + 1);
        }
        return sourceBranch;
    }
}

