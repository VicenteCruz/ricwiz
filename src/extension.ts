import * as vscode from 'vscode';
import * as cp from 'child_process';
import * as util from 'util';

const exec = util.promisify(cp.exec);

interface CommitEntry {
    hash: string;
    message: string;
    timeAgo: string;
}

function escapeHtml(text: string): string {
    return text
        .replace(/&/g, '&amp;')
        .replace(/</g, '&lt;')
        .replace(/>/g, '&gt;')
        .replace(/"/g, '&quot;')
        .replace(/'/g, '&#39;');
}

class RicwizWebviewProvider implements vscode.WebviewViewProvider {
    private webviewView?: vscode.WebviewView;

    constructor(private readonly _extensionUri: vscode.Uri) { }

    resolveWebviewView(
        webviewView: vscode.WebviewView,
        context: vscode.WebviewViewResolveContext,
        _token: vscode.CancellationToken,
    ) {
        this.webviewView = webviewView;
        webviewView.webview.options = {
            enableScripts: true,
            localResourceRoots: [this._extensionUri]
        };

        this.updateBranch('');

        webviewView.webview.onDidReceiveMessage(data => {
            switch (data.command) {
                case 'createBranches':
                    vscode.commands.executeCommand('ricwiz.createBranches');
                    break;
                case 'prepareDeploy':
                    vscode.commands.executeCommand('ricwiz.prepareDeploy');
                    break;
                case 'openMRs':
                    vscode.commands.executeCommand('ricwiz.createMergeRequests');
                    break;
                case 'openMRsVSCode':
                    vscode.commands.executeCommand('ricwiz.createMergeRequestsVSCode');
                    break;
                case 'openJira':
                    vscode.commands.executeCommand('ricwiz.openJiraTicket');
                    break;
                case 'openJiraVSCode':
                    vscode.commands.executeCommand('ricwiz.openJiraTicketVSCode');
                    break;
                case 'openSettings':
                    vscode.commands.executeCommand('ricwiz.openSettings');
                    break;
                case 'checkout':
                    if (data.branch) {
                        vscode.commands.executeCommand('ricwiz.checkoutBranch', data.branch);
                    }
                    break;
                case 'copyBranch':
                    vscode.commands.executeCommand('ricwiz.copyBranchName');
                    break;
                case 'syncAll':
                    vscode.commands.executeCommand('ricwiz.syncAll');
                    break;
                case 'deleteUnused':
                    vscode.commands.executeCommand('ricwiz.deleteUnusedBranches');
                    break;
            }
        });
    }

    public updateBranch(branchName: string, relatedBranches: string[] = [], commits: CommitEntry[] = []) {
        if (!this.webviewView) return;
        const logoUri = this.webviewView.webview.asWebviewUri(
            vscode.Uri.joinPath(this._extensionUri, 'resources', 'logo.png')
        );
        this.webviewView.webview.html = this._getHtmlForWebview(logoUri, branchName, relatedBranches, commits);
    }

    private _getHtmlForWebview(logoUri: vscode.Uri, currentBranch: string, relatedBranches: string[], commits: CommitEntry[]) {
        const commitsHtml = commits.length > 0 ? `
            <div class="separator"></div>
            <div style="padding: 0 4px;">
                <div style="font-size: 11px; opacity: 0.7; margin-bottom: 6px; display: flex; align-items: center; gap: 4px;">
                    <span>📜</span> Recent Commits
                </div>
                <div style="display: flex; flex-direction: column; gap: 2px;">
                    ${commits.map(c => `
                        <div style="font-size: 11px; padding: 3px 4px; border-radius: 2px; display: flex; gap: 6px; align-items: baseline;">
                            <code style="color: var(--vscode-textLink-foreground); font-size: 10px; flex-shrink: 0;">${escapeHtml(c.hash)}</code>
                            <span style="flex: 1; overflow: hidden; text-overflow: ellipsis; white-space: nowrap;" title="${escapeHtml(c.message)}">${escapeHtml(c.message)}</span>
                            <span style="font-size: 9px; opacity: 0.5; flex-shrink: 0;">${escapeHtml(c.timeAgo)}</span>
                        </div>
                    `).join('')}
                </div>
            </div>
        ` : '';

        return `<!DOCTYPE html>
        <html lang="en">
        <head>
            <meta charset="UTF-8">
            <meta name="viewport" content="width=device-width, initial-scale=1.0">
            <title>Ricwiz</title>
            <style>
                body {
                    padding: 10px 8px;
                    display: flex;
                    flex-direction: column;
                    gap: 4px;
                    font-family: var(--vscode-font-family);
                    color: var(--vscode-foreground);
                }
                .btn {
                    display: flex;
                    align-items: center;
                    gap: 8px;
                    background: transparent;
                    color: var(--vscode-foreground);
                    border: 1px solid transparent;
                    padding: 6px 8px;
                    cursor: pointer;
                    font-size: 13px;
                    border-radius: 3px;
                    text-align: left;
                    width: 100%;
                    outline: none;
                }
                .btn:hover {
                    background-color: var(--vscode-list-hoverBackground);
                }
                .btn:focus {
                    border-color: var(--vscode-focusBorder);
                }
                .icon {
                    font-size: 14px;
                    opacity: 0.8;
                }
                .separator {
                    height: 1px;
                    background-color: var(--vscode-panel-border);
                    margin: 8px 4px;
                }
                .copy-btn {
                    background: transparent;
                    border: none;
                    color: var(--vscode-foreground);
                    cursor: pointer;
                    font-size: 12px;
                    opacity: 0.6;
                    padding: 2px 4px;
                    border-radius: 3px;
                }
                .copy-btn:hover {
                    opacity: 1;
                    background-color: var(--vscode-list-hoverBackground);
                }
            </style>
        </head>
        <body>
            <div style="text-align: center; margin-bottom: 12px; margin-top: 8px;">
                <img src="${logoUri}" alt="Ricwiz Logo" style="width: 80px; height: 80px; opacity: 0.9;" />
            </div>

            ${currentBranch ? 
                `<div style="background-color: var(--vscode-editor-inactiveSelectionBackground); padding: 8px; border-radius: 4px; margin-bottom: 12px; text-align: center;">
                    <div style="font-size: 11px; opacity: 0.8; margin-bottom: 4px; display: flex; align-items: center; justify-content: center; gap: 4px;">
                        Current Ticket / Branch
                        <button class="copy-btn" onclick="sendCommand('copyBranch')" title="Copy branch name to clipboard">📋</button>
                    </div>
                    <div style="font-weight: bold; font-size: 13px; word-break: break-all;">${escapeHtml(currentBranch)}</div>
                    ${relatedBranches.length > 0 ? `
                        <div style="margin-top: 8px; border-top: 1px solid var(--vscode-panel-border); padding-top: 8px;">
                            <div style="font-size: 10px; opacity: 0.7; margin-bottom: 4px;">Sister Branches</div>
                            <div style="display: flex; flex-direction: column; gap: 4px;">
                                ${relatedBranches.map(b => `
                                    <div class="btn" style="padding: 4px; font-size: 11px; justify-content: center; background-color: var(--vscode-button-secondaryBackground); color: var(--vscode-button-secondaryForeground);" onclick="sendCheckoutCommand('${escapeHtml(b)}', this)" title="Checkout ${escapeHtml(b)}">
                                        ${escapeHtml(b)}
                                    </div>
                                `).join('')}
                            </div>
                        </div>
                    ` : ''}
                </div>` : ''
            }

            <button class="btn" title="Generates the main and environment branches" onclick="sendCommand('createBranches')">
                <span class="icon">🌿</span> Create Branches
            </button>

            <button class="btn" title="Sync environments and merge ticket" onclick="sendCommand('prepareDeploy')">
                <span class="icon">🔀</span> Prepare Deploy
            </button>

            <div style="display: flex; gap: 4px;">
                <button class="btn" style="flex: 1;" title="Opens Merge Request pages in Browser" onclick="sendCommand('openMRs')">
                    <span class="icon">🚀</span> Open MRs
                </button>
                <button class="btn" style="width: auto; padding: 6px 8px; font-weight: bold; justify-content: center;" title="Open MRs in VS Code" onclick="sendCommand('openMRsVSCode')">
                    VS
                </button>
            </div>

            <div style="display: flex; gap: 4px;">
                <button class="btn" style="flex: 1;" title="Open Jira Ticket in Browser" onclick="sendCommand('openJira')">
                    <span class="icon">🎫</span> Open Jira Ticket
                </button>
                <button class="btn" style="width: auto; padding: 6px 8px; font-weight: bold; justify-content: center;" title="Open Jira in VS Code" onclick="sendCommand('openJiraVSCode')">
                    VS
                </button>
            </div>

            <div class="separator"></div>

            <button class="btn" title="Fetch and pull all branches of the current ticket" onclick="sendCommand('syncAll')">
                <span class="icon">🔄</span> Sync All
            </button>

            <button class="btn" title="Delete all branches of a ticket (local and remote)" onclick="sendCommand('deleteUnused')">
                <span class="icon">🗑️</span> Delete Unused Branches
            </button>

            ${commitsHtml}

            <div class="separator"></div>

            <button class="btn" style="opacity: 0.8;" title="Extension Settings" onclick="sendCommand('openSettings')">
                <span class="icon">⚙️</span> Settings
            </button>
            
            <script>
                const vscode = acquireVsCodeApi();
                function sendCommand(cmd) {
                    vscode.postMessage({ command: cmd });
                }
                function sendCheckoutCommand(branchName, element) {
                    if (element) {
                        element.style.opacity = '0.5';
                        element.innerHTML = '⏳ Checking out...';
                        element.style.pointerEvents = 'none';
                    }
                    vscode.postMessage({ command: 'checkout', branch: branchName });
                }
            </script>
        </body>
        </html>`;
    }
}

export function activate(context: vscode.ExtensionContext) {
    const provider = new RicwizWebviewProvider(context.extensionUri);
    context.subscriptions.push(
        vscode.window.registerWebviewViewProvider('ricwiz-webview', provider)
    );

    // Status Bar Item — shows current ticket, click opens Jira
    const statusBarItem = vscode.window.createStatusBarItem(vscode.StatusBarAlignment.Left, 100);
    statusBarItem.command = 'ricwiz.openJiraTicket';
    context.subscriptions.push(statusBarItem);

    // Git Integration (Auto Commit Message, Webview Update, Status Bar Update)
    async function initGit() {
        const gitExtension = vscode.extensions.getExtension('vscode.git');
        if (gitExtension) {
            if (!gitExtension.isActive) {
                await gitExtension.activate();
            }
            const git = gitExtension.exports.getAPI(1);
            if (git.repositories.length > 0) {
                git.repositories.forEach((repo: any) => setupRepo(repo));
            }
            git.onDidOpenRepository((repo: any) => setupRepo(repo));
            
            function setupRepo(repo: any) {
                let lastBranch = '';
                
                async function update() {
                    const currentBranch = repo.state.HEAD?.name;
                    if (currentBranch && currentBranch !== lastBranch) {
                        lastBranch = currentBranch;
                        
                        const config = vscode.workspace.getConfiguration('ricwiz');
                        let prefix = config.get<string>('ticketPrefix', 'SFPSCA-');
                        
                        if (!currentBranch.includes(prefix)) {
                            const guessMatch = currentBranch.match(/([A-Z]+-)\d+/i);
                            if (guessMatch) {
                                prefix = guessMatch[1].toUpperCase();
                            }
                        }

                        let relatedBranches: string[] = [];
                        let commits: CommitEntry[] = [];
                        const match = currentBranch.match(new RegExp(`(${prefix}\\d+)`, 'i'));
                        if (match) {
                            const ticketId = match[1].toUpperCase();
                            const suffix = config.get<string>('commitMessageSuffix', '- ');
                            if (!repo.inputBox.value.toUpperCase().startsWith(ticketId)) {
                                repo.inputBox.value = `${ticketId}${suffix}` + repo.inputBox.value;
                            }

                            // Update status bar with ticket ID
                            statusBarItem.text = `$(bookmark) ${ticketId}`;
                            statusBarItem.tooltip = `Branch: ${currentBranch}\nClick to open Jira ticket`;
                            statusBarItem.show();

                            try {
                                const workspaceFolders = vscode.workspace.workspaceFolders;
                                if (workspaceFolders) {
                                    const cwd = workspaceFolders[0].uri.fsPath;
                                    const { stdout } = await exec(`git branch --list "*${ticketId}*"`, { cwd });
                                    relatedBranches = stdout.split('\n')
                                        .map((b: string) => b.replace('*', '').trim())
                                        .filter((b: string) => b && b !== currentBranch);
                                }
                            } catch (e) {}
                        } else {
                            // Not on a ticket branch — hide status bar
                            statusBarItem.hide();
                        }

                        // Fetch recent commits for the Git Log
                        try {
                            const workspaceFolders = vscode.workspace.workspaceFolders;
                            if (workspaceFolders) {
                                const cwd = workspaceFolders[0].uri.fsPath;
                                const { stdout } = await exec(`git log --oneline -10 --format="%h|||%s|||%ar"`, { cwd });
                                commits = stdout.split('\n')
                                    .filter((line: string) => line.trim())
                                    .map((line: string) => {
                                        const parts = line.split('|||');
                                        return {
                                            hash: parts[0] || '',
                                            message: parts.length >= 3 ? parts.slice(1, -1).join('|||') : (parts[1] || ''),
                                            timeAgo: parts.length >= 3 ? parts[parts.length - 1] : ''
                                        };
                                    });
                            }
                        } catch (e) {}
                        
                        provider.updateBranch(currentBranch, relatedBranches, commits);
                    }
                }

                update();
                repo.state.onDidChange(update);
            }
        }
    }
    initGit();

    // ─── Checkout Branch with Stash & Switch ────────────────────────────
    // When switching between sister branches, auto-stash uncommitted changes
    // tagged to the source branch. When arriving at a branch, auto-restore
    // its stash if one exists. Each branch keeps its own independent stash.
    context.subscriptions.push(vscode.commands.registerCommand('ricwiz.checkoutBranch', async (branchName: string) => {
        const workspaceFolders = vscode.workspace.workspaceFolders;
        if (!workspaceFolders) return;
        const cwd = workspaceFolders[0].uri.fsPath;

        await vscode.window.withProgress({
            location: vscode.ProgressLocation.Notification,
            title: `Ricwiz: Switching to ${branchName}...`,
            cancellable: false
        }, async () => {
            try {
                // 1. Get current branch before checkout
                let currentBranch = '';
                try {
                    const { stdout } = await exec('git branch --show-current', { cwd });
                    currentBranch = stdout.trim();
                } catch(e) {}

                // 2. Check for uncommitted changes (staged + unstaged + untracked)
                let hasChanges = false;
                try {
                    const { stdout } = await exec('git status --porcelain', { cwd });
                    hasChanges = stdout.trim().length > 0;
                } catch(e) {}

                // 3. Auto-stash if there are uncommitted changes
                if (hasChanges && currentBranch) {
                    try {
                        await exec(`git stash push --include-untracked -m "ricwiz-auto:${currentBranch}"`, { cwd });
                        vscode.window.showInformationMessage(`Ricwiz: 📦 Stashed changes from ${currentBranch}`);
                    } catch(e) {
                        vscode.window.showWarningMessage(`Ricwiz: Could not stash changes. Checkout may fail if there are conflicts.`);
                    }
                }

                // 4. Checkout the target branch
                await exec(`git checkout ${branchName}`, { cwd });

                // 5. Look for a saved stash for the new branch and restore it
                try {
                    const { stdout } = await exec('git stash list', { cwd });
                    const lines = stdout.split('\n');
                    for (let i = 0; i < lines.length; i++) {
                        if (lines[i].includes(`ricwiz-auto:${branchName}`)) {
                            const stashMatch = lines[i].match(/stash@\{(\d+)\}/);
                            if (stashMatch) {
                                await exec(`git stash pop stash@{${stashMatch[1]}}`, { cwd });
                                vscode.window.showInformationMessage(`Ricwiz: 📦 Restored stashed changes on ${branchName}`);
                            }
                            break;
                        }
                    }
                } catch(e) {
                    vscode.window.showWarningMessage(`Ricwiz: Could not restore stashed changes on ${branchName}. You may need to resolve conflicts manually (check git stash list).`);
                }

            } catch(e: any) {
                vscode.window.showErrorMessage(`Ricwiz: Could not checkout branch ${branchName}.`);
            }
        });
    }));

    // ─── Copy Branch Name ───────────────────────────────────────────────
    context.subscriptions.push(vscode.commands.registerCommand('ricwiz.copyBranchName', async () => {
        const workspaceFolders = vscode.workspace.workspaceFolders;
        if (!workspaceFolders) return;
        const cwd = workspaceFolders[0].uri.fsPath;

        try {
            const { stdout } = await exec('git branch --show-current', { cwd });
            const branchName = stdout.trim();
            if (branchName) {
                await vscode.env.clipboard.writeText(branchName);
                vscode.window.showInformationMessage(`Ricwiz: 📋 Copied "${branchName}" to clipboard`);
            }
        } catch (e) {
            vscode.window.showErrorMessage('Ricwiz: Could not get the current branch name.');
        }
    }));

    // ─── Create Branches (existing) ─────────────────────────────────────
    let disposable = vscode.commands.registerCommand('ricwiz.createBranches', async () => {
        const workspaceFolders = vscode.workspace.workspaceFolders;
        if (!workspaceFolders) {
            vscode.window.showErrorMessage('Open a folder or workspace that is a Git repository.');
            return;
        }
        const cwd = workspaceFolders[0].uri.fsPath;
        const config = vscode.workspace.getConfiguration('ricwiz');
        const prefix = config.get<string>('ticketPrefix', 'SFPSCA-');
        
        let currentBranch = '';
        try {
            const { stdout } = await exec('git branch --show-current', { cwd });
            currentBranch = stdout.trim();
        } catch (e) {}

        let actualPrefix = prefix;
        if (!currentBranch.includes(prefix)) {
            const guessMatch = currentBranch.match(/([A-Z]+-)\d+/i);
            if (guessMatch) actualPrefix = guessMatch[1].toUpperCase();
        }

        let suggestedTicket = '';
        const match = currentBranch.match(new RegExp(`(${actualPrefix}\\d+)`, 'i'));
        if (match) {
            suggestedTicket = match[1].toUpperCase();
        } else if (currentBranch.includes(actualPrefix) && !currentBranch.includes('-to-')) {
            suggestedTicket = currentBranch.substring(currentBranch.indexOf(actualPrefix));
        }

        const input = await vscode.window.showInputBox({
            prompt: 'Enter the full ticket ID (e.g., SCPSCA-1234) or just the number',
            placeHolder: 'Ticket ID or number',
            value: suggestedTicket
        });

        if (!input) {
            vscode.window.showErrorMessage('Branch creation cancelled: Ticket not provided.');
            return;
        }

        // Se o user escrever só números (ex: 1239), adiciona o prefixo. Caso contrário, usa o que o user escreveu.
        const ticketId = /^\d+$/.test(input.trim()) ? `${actualPrefix}${input.trim()}` : input.trim().toUpperCase();

        const createOptions = [
            { label: 'Create Main Branch & Environments', description: 'Creates the main ticket branch and all environment branches', value: 'all' },
            { label: 'Create Environments Only', description: 'Creates only the environment branches (skip main branch)', value: 'envs' }
        ];

        const selectedOption = await vscode.window.showQuickPick(createOptions, {
            placeHolder: 'What branches do you want to create?',
            title: 'Ricwiz Branch Creation'
        });

        if (!selectedOption) {
            vscode.window.showInformationMessage('Branch creation cancelled.');
            return;
        }

        const sourceBranchForTicket = config.get<string>('ticketSourceBranch', 'main');
        const environments = config.get<any[]>('environments', [
            { name: 'Qual', sourceBranch: 'quality' },
            { name: 'Val', sourceBranch: 'validation' },
            { name: 'Prod', sourceBranch: 'main' }
        ]);
        
        try {
            await exec('git status', { cwd });
        } catch (e) {
            vscode.window.showErrorMessage('The opened folder does not appear to be a valid Git repository.');
            return;
        }

        const mainBranch = ticketId;

        try {
            await vscode.window.withProgress({
                location: vscode.ProgressLocation.Notification,
                title: "Ricwiz: Creating Branches",
                cancellable: false
            }, async (progress) => {
                // Guardar branch inicial para caso dê erro ou para criar a mainBranch a partir da atual
                let initialBranch = '';
                try {
                    const { stdout } = await exec('git branch --show-current', { cwd });
                    initialBranch = stdout.trim();
                } catch(e) {}
                
                let createdCount = 0;
                progress.report({ message: 'Checking remote status (git fetch)...', increment: 10 });
                
                try {
                    await exec('git fetch', { cwd });
                } catch (e) {
                    // Pode falhar se estiver offline, continuamos mesmo assim
                }

                // Função auxiliar para ver se a branch existe local ou remotamente
                const checkBranchExists = async (b: string) => {
                    try {
                        await exec(`git show-ref --verify --quiet refs/heads/${b}`, { cwd });
                        return true;
                    } catch(e) {}
                    try {
                        await exec(`git show-ref --verify --quiet refs/remotes/origin/${b}`, { cwd });
                        return true;
                    } catch(e) {}
                    return false;
                };

                // 1. Criar a branch principal a partir da branch base configurada (ex: main)
                if (selectedOption.value === 'all') {
                    progress.report({ message: `Creating main branch ${mainBranch}...`, increment: 20 });
                    if (await checkBranchExists(mainBranch)) {
                        vscode.window.showInformationMessage(`Ricwiz: The branch ${mainBranch} already exists. Skipping creation...`);
                        // Checkout para garantir que a temos localmente
                        await exec(`git checkout ${mainBranch}`, { cwd });
                    } else {
                        try {
                            await exec(`git fetch origin ${sourceBranchForTicket}`, { cwd });
                            await exec(`git checkout -b ${mainBranch} origin/${sourceBranchForTicket}`, { cwd });
                            createdCount++;
                        } catch (e: any) {
                            try {
                                await exec(`git checkout -b ${mainBranch} ${sourceBranchForTicket}`, { cwd });
                                createdCount++;
                            } catch(err) {} 
                        }
                        
                        try { 
                            await exec(`git push -u origin ${mainBranch}`, { cwd }); 
                        } catch(e){} 
                    }
                }

                // 2. Criar branches de ambiente baseadas nas sourceBranches configuradas
                const envProgressStep = 60 / (environments.length || 1);
                for (const env of environments) {
                    const envBranchName = `${ticketId}-to-${env.name}`;
                    const sourceBranch = env.sourceBranch;

                    progress.report({ message: `Processing environment branch ${envBranchName}...`, increment: envProgressStep });

                    if (await checkBranchExists(envBranchName)) {
                        // Já existe, não criamos nem apagamos nada
                    } else {
                        try {
                            // Checkout source branch e pull
                            await exec(`git checkout ${sourceBranch}`, { cwd });
                            try { await exec(`git pull origin ${sourceBranch}`, { cwd }); } catch(e){}
                            
                            // Criar a branch de ambiente baseada nela
                            await exec(`git checkout -b ${envBranchName}`, { cwd });
                            createdCount++;
                            
                            // Push
                            await exec(`git push -u origin ${envBranchName}`, { cwd });
                        } catch (e: any) {
                            vscode.window.showWarningMessage(`Ricwiz: Could not create/sync branch ${envBranchName} from ${sourceBranch}. Does the source branch exist?`);
                        }
                    }
                }

                // 3. Voltar para a main branch no final (se aplicável)
                if (selectedOption.value === 'all') {
                    progress.report({ message: `Switching to ${mainBranch}...`, increment: 10 });
                    try {
                        await exec(`git checkout ${mainBranch}`, { cwd });
                    } catch (e: any) {
                        vscode.window.showErrorMessage(`Ricwiz: Failed to switch to main branch: ${e.message}`);
                    }
                }

                progress.report({ increment: 100 });
                vscode.window.showInformationMessage(`Ricwiz: All set! You can start working on your branches! 🚀`);
            });
            
        } catch (error: any) {
            vscode.window.showErrorMessage(`Ricwiz general error: ${error.message}`);
        }
    });

    context.subscriptions.push(disposable);

    // ─── Prepare Deploy (existing) ──────────────────────────────────────
    let prepareDeployDisposable = vscode.commands.registerCommand('ricwiz.prepareDeploy', async () => {
        const workspaceFolders = vscode.workspace.workspaceFolders;
        if (!workspaceFolders) {
            vscode.window.showErrorMessage('Ricwiz: Open a folder or workspace that is a Git repository.');
            return;
        }

        const cwd = workspaceFolders[0].uri.fsPath;
        
        try {
            await exec('git status', { cwd });
        } catch (e) {
            vscode.window.showErrorMessage('Ricwiz: The opened folder does not appear to be a valid Git repository.');
            return;
        }

        const config = vscode.workspace.getConfiguration('ricwiz');
        const prefix = config.get<string>('ticketPrefix', 'SFPSCA-');
        const environments = config.get<any[]>('environments', [
            { name: 'Qual', sourceBranch: 'quality' },
            { name: 'Val', sourceBranch: 'validation' },
            { name: 'Prod', sourceBranch: 'main' }
        ]);

        let currentBranch = '';
        try {
            const { stdout } = await exec('git branch --show-current', { cwd });
            currentBranch = stdout.trim();
        } catch (e) {}

        let actualPrefix = prefix;
        if (!currentBranch.includes(prefix)) {
            const guessMatch = currentBranch.match(/([A-Z]+-)\d+/i);
            if (guessMatch) actualPrefix = guessMatch[1].toUpperCase();
        }

        let suggestedTicket = '';
        const match = currentBranch.match(new RegExp(`(${actualPrefix}\\d+)`, 'i'));
        if (match) {
            suggestedTicket = match[1].toUpperCase();
        } else if (currentBranch.includes(actualPrefix) && !currentBranch.includes('-to-')) {
            suggestedTicket = currentBranch.substring(currentBranch.indexOf(actualPrefix));
        }

        const input = await vscode.window.showInputBox({
            prompt: 'Enter the full ticket ID (e.g., SCPSCA-1234) or just the number',
            placeHolder: 'Ticket ID or number',
            value: suggestedTicket
        });

        if (!input) {
            vscode.window.showErrorMessage('Operation cancelled: Ticket not provided.');
            return;
        }

        const ticketId = /^\d+$/.test(input.trim()) ? `${actualPrefix}${input.trim()}` : input.trim().toUpperCase();
        const mainBranch = ticketId;

        try {
            await exec(`git show-ref --verify --quiet refs/heads/${mainBranch}`, { cwd });
        } catch (e) {
            try {
                await exec(`git show-ref --verify --quiet refs/remotes/origin/${mainBranch}`, { cwd });
            } catch (err) {
                vscode.window.showErrorMessage(`Ricwiz: Main branch '${mainBranch}' does not exist! Prepare deploy is only available when a main ticket branch is used.`);
                return;
            }
        }

        await vscode.window.withProgress({
            location: vscode.ProgressLocation.Notification,
            title: "Ricwiz: Preparing Deploy",
            cancellable: false
        }, async (progress) => {
            let successCount = 0;
            const originalBranch = currentBranch;

            progress.report({ message: 'Auto-syncing base branches...', increment: 10 });
            
            try {
                await exec('git fetch', { cwd });
                const envSyncStep = 20 / (environments.length || 1);
                for (const env of environments) {
                    try {
                        progress.report({ message: `Fetching ${env.sourceBranch}...`, increment: envSyncStep });
                        await exec(`git fetch origin ${env.sourceBranch}:${env.sourceBranch}`, { cwd });
                    } catch(e) {}
                }
            } catch(e) {}

            const processStep = 60 / (environments.length || 1);

            const handleMergeConflict = async (sourceStr: string, targetStr: string) => {
                while (true) {
                    const options = [
                        { label: '$(check) Continue', description: 'I have resolved the conflicts and COMMITTED the changes' },
                        { label: '$(x) Abort', description: 'Cancel the deploy process' }
                    ];

                    const choice = await vscode.window.showQuickPick(options, {
                        placeHolder: `CONFLICT! Merging ${sourceStr} into ${targetStr}. Resolve & Commit, then choose Continue.`,
                        ignoreFocusOut: true,
                        title: 'Ricwiz Merge Conflict'
                    });
                    
                    if (!choice || choice.label.includes('Abort')) {
                        try { await exec('git merge --abort', { cwd }); } catch(err) {}
                        throw new Error('Deploy aborted by user.');
                    }
                    
                    // Verifies if the working tree is clean
                    const { stdout } = await exec('git status --porcelain', { cwd });
                    if (stdout.trim().length > 0) {
                        vscode.window.showErrorMessage('Ricwiz: There are still uncommitted changes. Please commit your resolved conflicts before continuing.');
                    } else {
                        break; // Resolved and committed!
                    }
                }
            };

            for (const env of environments) {
                const targetBranch = `${ticketId}-to-${env.name}`;
                const sourceBranch = env.sourceBranch;

                try {
                    progress.report({ message: `Processing ${targetBranch}...`, increment: processStep / 4 });
                    // Mudar para a branch de ambiente
                    await exec(`git checkout ${targetBranch}`, { cwd });
                    
                    // Fazer pull para garantir que tem o estado mais recente do remote (da própria branch)
                    try {
                        await exec(`git pull origin ${targetBranch}`, { cwd });
                    } catch (e) {} // Ignora se não conseguir
                    
                    // 1. Fazer merge da branch de origem (ex: quality) para mantê-la atualizada com o estado global
                    try {
                        progress.report({ message: `Merging ${sourceBranch} into ${targetBranch}...`, increment: processStep / 4 });
                        await exec(`git fetch origin ${sourceBranch}`, { cwd });
                        await exec(`git merge origin/${sourceBranch}`, { cwd });
                    } catch (e) {
                        await handleMergeConflict(`origin/${sourceBranch}`, targetBranch);
                    }

                    // 2. Fazer merge da main branch (as alterações do ticket)
                    try {
                        progress.report({ message: `Merging ${mainBranch} into ${targetBranch}...`, increment: processStep / 4 });
                        await exec(`git merge ${mainBranch}`, { cwd });
                    } catch (e) {
                        await handleMergeConflict(mainBranch, targetBranch);
                    }
                    
                    // 3. Sincronizar com o remote
                    progress.report({ message: `Pushing ${targetBranch}...`, increment: processStep / 4 });
                    await exec(`git push origin ${targetBranch}`, { cwd });
                    
                    successCount++;
                } catch (e: any) {
                    vscode.window.showErrorMessage(`Ricwiz: Failed to process branch ${targetBranch}. Detail: ${e.message}`);
                    return; // Interrompe execução perante erro crítico ou abort do user
                }
            }

            progress.report({ message: 'Finishing up...', increment: 10 });
            // Tentar voltar para a branch original
            if (originalBranch && originalBranch !== currentBranch) {
                try {
                    await exec(`git checkout ${originalBranch}`, { cwd });
                    vscode.window.showInformationMessage(`Ricwiz: Operation complete. Back on branch ${originalBranch}.`);
                } catch (e) {}
            } else {
                vscode.window.showInformationMessage(`Ricwiz: Operation complete.`);
            }
        });
    });

    context.subscriptions.push(prepareDeployDisposable);

    // ─── Create Merge Requests (existing) ───────────────────────────────
    const doCreateMergeRequests = async (openInVSCode: boolean = false) => {
        const workspaceFolders = vscode.workspace.workspaceFolders;
        if (!workspaceFolders) return;
        const cwd = workspaceFolders[0].uri.fsPath;

        const config = vscode.workspace.getConfiguration('ricwiz');
        const prefix = config.get<string>('ticketPrefix', 'SFPSCA-');
        const environments = config.get<any[]>('environments', [
            { name: 'Qual', sourceBranch: 'quality' },
            { name: 'Val', sourceBranch: 'validation' },
            { name: 'Prod', sourceBranch: 'main' }
        ]);

        let currentBranch = '';
        try {
            const { stdout } = await exec('git branch --show-current', { cwd });
            currentBranch = stdout.trim();
        } catch (e) {}

        let actualPrefix = prefix;
        if (!currentBranch.includes(prefix)) {
            const guessMatch = currentBranch.match(/([A-Z]+-)\d+/i);
            if (guessMatch) actualPrefix = guessMatch[1].toUpperCase();
        }

        let suggestedTicket = '';
        const match = currentBranch.match(new RegExp(`(${actualPrefix}\\d+)`, 'i'));
        if (match) {
            suggestedTicket = match[1].toUpperCase();
        } else if (currentBranch.includes(actualPrefix) && !currentBranch.includes('-to-')) {
            suggestedTicket = currentBranch.substring(currentBranch.indexOf(actualPrefix));
        }

        const input = await vscode.window.showInputBox({
            prompt: 'Enter the full ticket ID for the Merge Requests (e.g., SCPSCA-1234) or just the number',
            placeHolder: 'Ticket ID or number',
            value: suggestedTicket
        });
        if (!input) return;

        const ticketId = /^\d+$/.test(input.trim()) ? `${actualPrefix}${input.trim()}` : input.trim().toUpperCase();

        const gitlabUrlOverride = config.get<string>('gitlabUrlOverride', '');

        let webUrl = '';
        if (gitlabUrlOverride && gitlabUrlOverride.trim() !== '') {
            webUrl = gitlabUrlOverride.trim();
        } else {
            let remoteUrl = '';
            try {
                const { stdout } = await exec('git remote get-url origin', { cwd });
                remoteUrl = stdout.trim();
            } catch (e) {
                vscode.window.showErrorMessage('Ricwiz: Could not get the remote origin URL. Please configure the URL manually in the extension settings.');
                return;
            }

            // Converter URL do Git para URL Web (GitLab/GitHub)
            webUrl = remoteUrl;
            if (webUrl.endsWith('.git')) {
                webUrl = webUrl.slice(0, -4);
            }
            if (webUrl.startsWith('git@')) {
                // git@gitlab.com:empresa/projeto -> gitlab.com/empresa/projeto
                webUrl = webUrl.replace('git@', '').replace(':', '/');
                webUrl = `https://${webUrl}`;
            }
        }

        // Abrir um separador para cada ambiente
        for (const env of environments) {
            const mrSourceBranch = `${ticketId}-to-${env.name}`;
            const mrTargetBranch = env.sourceBranch;
            
            // GitLab MR URL Format
            const url = `${webUrl}/-/merge_requests/new?merge_request[source_branch]=${mrSourceBranch}&merge_request[target_branch]=${mrTargetBranch}`;
            
            if (openInVSCode) {
                vscode.commands.executeCommand('simpleBrowser.show', url);
            } else {
                vscode.env.openExternal(vscode.Uri.parse(url));
            }
        }

        vscode.window.showInformationMessage(`Ricwiz: Opening ${openInVSCode ? 'VS Code browser' : 'external browser'} for Merge Requests!`);
    };

    let createMRDisposable = vscode.commands.registerCommand('ricwiz.createMergeRequests', () => doCreateMergeRequests(false));
    let createMRVSCodeDisposable = vscode.commands.registerCommand('ricwiz.createMergeRequestsVSCode', () => doCreateMergeRequests(true));

    context.subscriptions.push(createMRDisposable);
    context.subscriptions.push(createMRVSCodeDisposable);

    // ─── Open Jira Ticket (existing) ────────────────────────────────────
    const doOpenJiraTicket = async (openInVSCode: boolean = false) => {
        const workspaceFolders = vscode.workspace.workspaceFolders;
        if (!workspaceFolders) return;
        const cwd = workspaceFolders[0].uri.fsPath;

        const config = vscode.workspace.getConfiguration('ricwiz');
        const jiraUrl = config.get<string>('jiraUrl', '');
        const prefix = config.get<string>('ticketPrefix', 'SFPSCA-');

        if (!jiraUrl || jiraUrl.trim() === '') {
            vscode.window.showErrorMessage('Ricwiz: Jira URL is not configured. Please set it in the extension settings (e.g., https://jira.company.com/browse/).');
            return;
        }

        let currentBranch = '';
        try {
            const { stdout } = await exec('git branch --show-current', { cwd });
            currentBranch = stdout.trim();
        } catch (e) {}

        let actualPrefix = prefix;
        if (!currentBranch.includes(prefix)) {
            const guessMatch = currentBranch.match(/([A-Z]+-)\d+/i);
            if (guessMatch) actualPrefix = guessMatch[1].toUpperCase();
        }

        let suggestedTicket = '';
        const match = currentBranch.match(new RegExp(`(${actualPrefix}\\d+)`, 'i'));
        if (match) {
            suggestedTicket = match[1].toUpperCase();
        } else if (currentBranch.includes(actualPrefix) && !currentBranch.includes('-to-')) {
            suggestedTicket = currentBranch.substring(currentBranch.indexOf(actualPrefix));
        } else if (currentBranch.includes('-to-')) {
            suggestedTicket = currentBranch.substring(currentBranch.indexOf(actualPrefix)).split('-to-')[0];
        }

        const input = await vscode.window.showInputBox({
            prompt: 'Enter the full Jira ticket ID (e.g., SFPSCA-1234) or just the number',
            value: suggestedTicket
        });
        if (!input) return;
        const ticketId = /^\d+$/.test(input.trim()) ? `${actualPrefix}${input.trim()}` : input.trim().toUpperCase();

        let url = jiraUrl.trim();
        if (!url.endsWith('/')) {
            url += '/';
        }
        url += ticketId;

        if (openInVSCode) {
            vscode.commands.executeCommand('simpleBrowser.show', url);
        } else {
            vscode.env.openExternal(vscode.Uri.parse(url));
        }
        vscode.window.showInformationMessage(`Ricwiz: Opening Jira Ticket ${ticketId} in ${openInVSCode ? 'VS Code' : 'browser'}!`);
    };

    let openJiraDisposable = vscode.commands.registerCommand('ricwiz.openJiraTicket', () => doOpenJiraTicket(false));
    let openJiraVSCodeDisposable = vscode.commands.registerCommand('ricwiz.openJiraTicketVSCode', () => doOpenJiraTicket(true));

    context.subscriptions.push(openJiraDisposable);
    context.subscriptions.push(openJiraVSCodeDisposable);

    // ─── Sync All ───────────────────────────────────────────────────────
    // Fetches and syncs all branches of the current ticket at once.
    // Non-current branches are updated via git fetch origin branch:branch (fast-forward).
    // The current branch is updated via git pull.
    context.subscriptions.push(vscode.commands.registerCommand('ricwiz.syncAll', async () => {
        const workspaceFolders = vscode.workspace.workspaceFolders;
        if (!workspaceFolders) {
            vscode.window.showErrorMessage('Ricwiz: Open a folder or workspace that is a Git repository.');
            return;
        }
        const cwd = workspaceFolders[0].uri.fsPath;

        const config = vscode.workspace.getConfiguration('ricwiz');
        const prefix = config.get<string>('ticketPrefix', 'SFPSCA-');

        let currentBranch = '';
        try {
            const { stdout } = await exec('git branch --show-current', { cwd });
            currentBranch = stdout.trim();
        } catch (e) {}

        let actualPrefix = prefix;
        if (!currentBranch.includes(prefix)) {
            const guessMatch = currentBranch.match(/([A-Z]+-)\d+/i);
            if (guessMatch) actualPrefix = guessMatch[1].toUpperCase();
        }

        let suggestedTicket = '';
        const match = currentBranch.match(new RegExp(`(${actualPrefix}\\d+)`, 'i'));
        if (match) {
            suggestedTicket = match[1].toUpperCase();
        } else if (currentBranch.includes(actualPrefix) && !currentBranch.includes('-to-')) {
            suggestedTicket = currentBranch.substring(currentBranch.indexOf(actualPrefix));
        }

        const input = await vscode.window.showInputBox({
            prompt: 'Enter the full ticket ID to sync all branches for (e.g., SCPSCA-1234) or just the number',
            placeHolder: 'Ticket ID or number',
            value: suggestedTicket
        });
        if (!input) return;

        const ticketId = /^\d+$/.test(input.trim()) ? `${actualPrefix}${input.trim()}` : input.trim().toUpperCase();

        await vscode.window.withProgress({
            location: vscode.ProgressLocation.Notification,
            title: `Ricwiz: Syncing all branches for ${ticketId}...`,
            cancellable: false
        }, async (progress) => {
            try {
                // 1. Fetch everything from remote
                progress.report({ message: 'Fetching from remote...' });
                try { await exec('git fetch --all', { cwd }); } catch(e) {}

                // 2. Find all local branches matching the ticket
                const { stdout } = await exec(`git branch --list "*${ticketId}*"`, { cwd });
                const branches = stdout.split('\n')
                    .map((b: string) => b.replace('*', '').trim())
                    .filter((b: string) => b.length > 0);

                if (branches.length === 0) {
                    vscode.window.showWarningMessage(`Ricwiz: No local branches found for ${ticketId}.`);
                    return;
                }

                let synced = 0;
                let failed = 0;

                for (const branch of branches) {
                    progress.report({ message: `Syncing ${branch}...` });

                    if (branch === currentBranch) {
                        // For the current branch, do a pull
                        try {
                            await exec(`git pull origin ${branch}`, { cwd });
                            synced++;
                        } catch(e) {
                            failed++;
                        }
                    } else {
                        // For other branches, fast-forward update without checkout
                        try {
                            await exec(`git fetch origin ${branch}:${branch}`, { cwd });
                            synced++;
                        } catch(e) {
                            // Fast-forward failed (diverged history) — try checkout+pull as fallback
                            try {
                                await exec(`git checkout ${branch}`, { cwd });
                                await exec(`git pull origin ${branch}`, { cwd });
                                await exec(`git checkout ${currentBranch}`, { cwd });
                                synced++;
                            } catch(e2) {
                                // Revert to original branch if possible
                                try { await exec(`git checkout ${currentBranch}`, { cwd }); } catch(e3) {}
                                failed++;
                            }
                        }
                    }
                }

                if (failed > 0) {
                    vscode.window.showWarningMessage(`Ricwiz: Synced ${synced}/${branches.length} branches. ${failed} branch(es) could not be synced (possible conflicts or diverged history).`);
                } else {
                    vscode.window.showInformationMessage(`Ricwiz: 🔄 All ${synced} branches for ${ticketId} are up to date!`);
                }

            } catch (e: any) {
                vscode.window.showErrorMessage(`Ricwiz: Sync failed: ${e.message}`);
            }
        });
    }));

    // ─── Delete Unused Branches ─────────────────────────────────────────
    // Finds local branches for a ticket that no longer exist on the remote
    // (already merged/deleted) and deletes them locally.
    context.subscriptions.push(vscode.commands.registerCommand('ricwiz.deleteUnusedBranches', async () => {
        const workspaceFolders = vscode.workspace.workspaceFolders;
        if (!workspaceFolders) {
            vscode.window.showErrorMessage('Ricwiz: Open a folder or workspace that is a Git repository.');
            return;
        }
        const cwd = workspaceFolders[0].uri.fsPath;

        const config = vscode.workspace.getConfiguration('ricwiz');
        const prefix = config.get<string>('ticketPrefix', 'SFPSCA-');

        let currentBranch = '';
        try {
            const { stdout } = await exec('git branch --show-current', { cwd });
            currentBranch = stdout.trim();
        } catch (e) {}

        let actualPrefix = prefix;
        if (!currentBranch.includes(prefix)) {
            const guessMatch = currentBranch.match(/([A-Z]+-)\d+/i);
            if (guessMatch) actualPrefix = guessMatch[1].toUpperCase();
        }

        let suggestedTicket = '';
        const match = currentBranch.match(new RegExp(`(${actualPrefix}\\d+)`, 'i'));
        if (match) {
            suggestedTicket = match[1].toUpperCase();
        } else if (currentBranch.includes(actualPrefix) && !currentBranch.includes('-to-')) {
            suggestedTicket = currentBranch.substring(currentBranch.indexOf(actualPrefix));
        }

        const input = await vscode.window.showInputBox({
            prompt: 'Enter the full ticket ID whose unused branches you want to clean up (e.g., SCPSCA-1234) or just the number',
            placeHolder: 'Ticket ID or number',
            value: suggestedTicket
        });
        if (!input) return;
        
        const ticketId = /^\d+$/.test(input.trim()) ? `${actualPrefix}${input.trim()}` : input.trim().toUpperCase();

        await vscode.window.withProgress({
            location: vscode.ProgressLocation.Notification,
            title: `Ricwiz: Scanning branches for ${ticketId}...`,
            cancellable: false
        }, async () => {
            // Fetch and prune to update remote tracking info
            try { await exec('git fetch --prune', { cwd }); } catch(e) {}

            // Find local branches matching the ticket
            let localBranches: string[] = [];
            try {
                const { stdout } = await exec(`git branch --list "*${ticketId}*"`, { cwd });
                localBranches = stdout.split('\n')
                    .map((b: string) => b.replace('*', '').trim())
                    .filter((b: string) => b.length > 0);
            } catch(e) {}

            if (localBranches.length === 0) {
                vscode.window.showInformationMessage(`Ricwiz: No local branches found for ${ticketId}.`);
                return;
            }

            // Find remote branches matching the ticket
            let remoteBranchNames: string[] = [];
            try {
                const { stdout } = await exec(`git branch -r --list "*${ticketId}*"`, { cwd });
                remoteBranchNames = stdout.split('\n')
                    .map((b: string) => b.trim().replace(/^origin\//, ''))
                    .filter((b: string) => b.length > 0 && !b.includes('->'));
            } catch(e) {}

            // Filter: keep only local branches that do NOT exist on remote
            const orphanedBranches = localBranches.filter(b => !remoteBranchNames.includes(b));

            if (orphanedBranches.length === 0) {
                vscode.window.showInformationMessage(`Ricwiz: All local branches for ${ticketId} still exist on the remote. Nothing to clean up.`);
                return;
            }

            // Show which branches will be deleted
            const items: vscode.QuickPickItem[] = orphanedBranches.map(name => ({
                label: name,
                description: name === currentBranch ? 'current branch — will switch away first' : 'no longer on remote',
                picked: name !== currentBranch
            }));

            const selected = await vscode.window.showQuickPick(items, {
                canPickMany: true,
                placeHolder: `These local branches no longer exist on the remote. Select which to delete:`,
                title: 'Ricwiz: Delete Unused Branches'
            });

            if (!selected || selected.length === 0) {
                vscode.window.showInformationMessage('Ricwiz: No branches selected for deletion.');
                return;
            }

            // Final confirmation
            const branchList = selected.map(s => s.label).join(', ');
            const confirm = await vscode.window.showWarningMessage(
                `Ricwiz: Delete ${selected.length} local branch(es)?\n${branchList}`,
                { modal: true },
                'Yes, delete them'
            );

            if (confirm !== 'Yes, delete them') {
                vscode.window.showInformationMessage('Ricwiz: Deletion cancelled.');
                return;
            }

            let deleted = 0;
            for (const item of selected) {
                const name = item.label;

                // If on this branch, switch away first
                if (name === currentBranch) {
                    const fallbackBranch = config.get<string>('ticketSourceBranch', 'main');
                    try {
                        await exec(`git checkout ${fallbackBranch}`, { cwd });
                        currentBranch = fallbackBranch;
                    } catch(e) {
                        vscode.window.showWarningMessage(`Ricwiz: Could not switch away from ${name}. Skipping.`);
                        continue;
                    }
                }

                try {
                    await exec(`git branch -D ${name}`, { cwd });
                    deleted++;
                } catch(e) {
                    vscode.window.showWarningMessage(`Ricwiz: Could not delete local branch ${name}.`);
                }
            }

            vscode.window.showInformationMessage(`Ricwiz: 🗑️ Cleaned up ${deleted} unused local branch(es) for ${ticketId}.`);
        });
    }));

    // ─── Open Settings (existing) ───────────────────────────────────────
    let openSettingsDisposable = vscode.commands.registerCommand('ricwiz.openSettings', () => {
        vscode.commands.executeCommand('workbench.action.openSettings', 'ricwiz');
    });

    context.subscriptions.push(openSettingsDisposable);
}

export function deactivate() {}
