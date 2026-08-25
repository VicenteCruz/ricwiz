import * as vscode from 'vscode';
import * as cp from 'child_process';
import * as util from 'util';

const promisifiedExec = util.promisify(cp.exec);

export const ricwizLogger = vscode.window.createOutputChannel("Ricwiz");

export const exec = async (command: string, options?: cp.ExecOptions): Promise<{ stdout: string, stderr: string }> => {
    ricwizLogger.appendLine(`[EXEC] ${command}`);
    const result = await promisifiedExec(command, { maxBuffer: 50 * 1024 * 1024, ...options });
    return {
        stdout: result.stdout.toString(),
        stderr: result.stderr.toString()
    };
};

/**
 * Returns the filesystem path of the first workspace folder, or undefined if none is open.
 */
export function getWorkspaceCwd(): string | undefined {
    const workspaceFolders = vscode.workspace.workspaceFolders;
    if (!workspaceFolders) {
        return undefined;
    }
    return workspaceFolders[0].uri.fsPath;
}

/**
 * Gets the name of the currently checked-out git branch.
 */
export async function getCurrentBranch(cwd: string): Promise<string> {
    try {
        const { stdout } = await exec('git branch --show-current', { cwd });
        return stdout.trim();
    } catch (e) {
        return '';
    }
}

/**
 * Detects the ticket prefix from the current branch name.
 * Falls back to the configured prefix if auto-detection fails.
 */
export function resolvePrefix(currentBranch: string, configPrefix: string): string {
    if (!currentBranch.includes(configPrefix)) {
        const guessMatch = currentBranch.match(/([A-Z]+-)\d+/i);
        if (guessMatch) {
            return guessMatch[1].toUpperCase();
        }
    }
    return configPrefix;
}

/**
 * Extracts a suggested ticket ID from the current branch name.
 * When handleToSuffix is true, also handles "-to-Env" style branches (used by Jira command).
 */
export function extractTicketSuggestion(currentBranch: string, prefix: string, handleToSuffix: boolean = false): string {
    const match = currentBranch.match(new RegExp(`(${prefix}\\d+)`, 'i'));
    if (match) {
        return match[1].toUpperCase();
    } else if (currentBranch.includes(prefix) && !currentBranch.includes('-to-')) {
        return currentBranch.substring(currentBranch.indexOf(prefix));
    } else if (handleToSuffix && currentBranch.includes('-to-')) {
        return currentBranch.substring(currentBranch.indexOf(prefix)).split('-to-')[0];
    }
    return '';
}

/**
 * Normalizes user input into a ticket ID.
 * If the input is purely numeric, prepends the prefix.
 */
export function normalizeTicketId(input: string, prefix: string): string {
    const trimmed = sanitizeShellInput(input);
    if (/^\d/.test(trimmed)) {
        return `${prefix}${trimmed}`.toUpperCase();
    }
    return trimmed.toUpperCase();
}

export interface TicketInfo {
    ticketId: string;
    currentBranch: string;
    prefix: string;
}

/**
 * Full ticket resolution flow: get branch → detect prefix → suggest ticket → prompt user → normalize.
 * Returns undefined if the user cancels the input box.
 */
export async function promptForTicketId(
    cwd: string,
    options?: { prompt?: string; placeHolder?: string; handleToSuffix?: boolean; prefix?: string; suggestedValue?: string }
): Promise<TicketInfo | undefined> {
    const config = vscode.workspace.getConfiguration('ricwiz');
    const configPrefix = options?.prefix ?? config.get<string>('ticketPrefix', 'SFPSCA-');

    const currentBranch = await getCurrentBranch(cwd);
    const prefix = resolvePrefix(currentBranch, configPrefix);
    const suggestedTicket = options?.suggestedValue ?? extractTicketSuggestion(currentBranch, prefix, options?.handleToSuffix);

    const input = await vscode.window.showInputBox({
        prompt: options?.prompt || 'Enter the full ticket ID (e.g., SCPSCA-1234) or just the number',
        placeHolder: options?.placeHolder || 'Ticket ID or number',
        value: suggestedTicket,
        ignoreFocusOut: true
    });

    if (!input) {
        return undefined;
    }

    const ticketId = normalizeTicketId(input, prefix);
    return { ticketId, currentBranch, prefix };
}

/**
 * Checks whether a branch exists locally or on the remote.
 */
export async function checkBranchExists(cwd: string, branchName: string): Promise<boolean> {
    try {
        await exec(`git show-ref --verify --quiet refs/heads/${branchName}`, { cwd });
        return true;
    } catch (e) {}
    return await checkRemoteBranchExists(cwd, branchName);
}

/**
 * Checks whether a branch exists on any remote.
 */
export async function checkRemoteBranchExists(cwd: string, branchName: string): Promise<boolean> {
    try {
        // Find if the branch exists on ANY remote
        const { stdout } = await exec(`git branch -r --list "*/${branchName}"`, { cwd });
        return stdout.trim().length > 0;
    } catch (e) {
        return false;
    }
}

/**
 * Sanitizes user input before placing it into shell commands to prevent command injection.
 */
export function sanitizeShellInput(input: string): string {
    return input.replace(/[&|;$><`\\!"'\r\n]/g, '').trim();
}
