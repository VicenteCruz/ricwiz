#!/usr/bin/env node

import * as fs from 'fs';
import * as path from 'path';
import * as os from 'os';

// Helper to load settings from VS Code global config and workspace config
function loadVSCodeSettings() {
    const settings: any = {};
    
    try {
        const appData = process.env.APPDATA || (process.platform === 'darwin' ? path.join(os.homedir(), 'Library', 'Application Support') : path.join(os.homedir(), '.config'));
        const globalSettingsPath = path.join(appData, 'Code', 'User', 'settings.json');
        if (fs.existsSync(globalSettingsPath)) {
            const content = fs.readFileSync(globalSettingsPath, 'utf8');
            const cleaned = content.replace(/\/\/.*$/gm, '').replace(/\/\*[\s\S]*?\*\//g, '');
            Object.assign(settings, JSON.parse(cleaned));
        }
    } catch (e) {}

    try {
        const localSettingsPath = path.join(process.cwd(), '.vscode', 'settings.json');
        if (fs.existsSync(localSettingsPath)) {
            const content = fs.readFileSync(localSettingsPath, 'utf8');
            const cleaned = content.replace(/\/\/.*$/gm, '').replace(/\/\*[\s\S]*?\*\//g, '');
            Object.assign(settings, JSON.parse(cleaned));
        }
    } catch (e) {}

    return settings;
}

const settings = loadVSCodeSettings();

// MOCK VSCODE module to allow importing jiraApi.ts outside of extension host
const mockVscode = {
    workspace: {
        getConfiguration: (section: string) => {
            if (section === 'ricwiz') {
                return {
                    get: (key: string, defaultValue: any) => {
                        const envKey = `RICWIZ_${key.toUpperCase()}`;
                        return process.env[envKey] || settings[`ricwiz.${key}`] || defaultValue;
                    },
                    update: () => Promise.resolve()
                };
            }
            return { get: () => undefined, update: () => Promise.resolve() };
        }
    },
    window: {
        showInformationMessage: () => Promise.resolve(),
        showErrorMessage: () => Promise.resolve(),
        createStatusBarItem: () => ({ show: () => {}, hide: () => {}, text: '', command: '' }),
        createOutputChannel: () => ({ appendLine: () => {} })
    }
};

const Module = require('module');
const originalRequire = Module.prototype.require;
Module.prototype.require = function(id: string) {
    if (id === 'vscode') {
        return mockVscode;
    }
    return originalRequire.apply(this, arguments);
};

// Now import the required module
const jiraApi = require('./jiraApi');

async function run() {
    const args = process.argv.slice(2);
    if (args[0] === 'get-tickets') {
        const tickets = args.slice(1).flatMap(arg => arg.split(/[,\s]+/)).map(t => t.trim().toUpperCase()).filter(Boolean);
        if (tickets.length === 0) {
            console.error('No tickets provided.');
            process.exit(1);
        }
        
        try {
            const results = await jiraApi.fetchJiraIssuesBatch(tickets);
            console.log(JSON.stringify(results, null, 2));
        } catch(e: any) {
            console.error('Error fetching tickets:', e.message);
            process.exit(1);
        }
    } else {
        console.log('Usage: npx ricwiz get-tickets <TICKET_ID>...');
    }
}

run();
