"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.exec = void 0;
exports.getWorkspaceCwd = getWorkspaceCwd;
exports.getCurrentBranch = getCurrentBranch;
exports.resolvePrefix = resolvePrefix;
exports.extractTicketSuggestion = extractTicketSuggestion;
exports.normalizeTicketId = normalizeTicketId;
exports.promptForTicketId = promptForTicketId;
exports.checkBranchExists = checkBranchExists;
const vscode = require("vscode");
const cp = require("child_process");
const util = require("util");
const promisifiedExec = util.promisify(cp.exec);
const exec = async (command, options) => {
    const result = await promisifiedExec(command, { maxBuffer: 50 * 1024 * 1024, ...options });
    return {
        stdout: result.stdout.toString(),
        stderr: result.stderr.toString()
    };
};
exports.exec = exec;
/**
 * Returns the filesystem path of the first workspace folder, or undefined if none is open.
 */
function getWorkspaceCwd() {
    const workspaceFolders = vscode.workspace.workspaceFolders;
    if (!workspaceFolders) {
        return undefined;
    }
    return workspaceFolders[0].uri.fsPath;
}
/**
 * Gets the name of the currently checked-out git branch.
 */
async function getCurrentBranch(cwd) {
    try {
        const { stdout } = await (0, exports.exec)('git branch --show-current', { cwd });
        return stdout.trim();
    }
    catch (e) {
        return '';
    }
}
/**
 * Detects the ticket prefix from the current branch name.
 * Falls back to the configured prefix if auto-detection fails.
 */
function resolvePrefix(currentBranch, configPrefix) {
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
function extractTicketSuggestion(currentBranch, prefix, handleToSuffix = false) {
    const match = currentBranch.match(new RegExp(`(${prefix}\\d+)`, 'i'));
    if (match) {
        return match[1].toUpperCase();
    }
    else if (currentBranch.includes(prefix) && !currentBranch.includes('-to-')) {
        return currentBranch.substring(currentBranch.indexOf(prefix));
    }
    else if (handleToSuffix && currentBranch.includes('-to-')) {
        return currentBranch.substring(currentBranch.indexOf(prefix)).split('-to-')[0];
    }
    return '';
}
/**
 * Normalizes user input into a ticket ID.
 * If the input is purely numeric, prepends the prefix.
 */
function normalizeTicketId(input, prefix) {
    return /^\d+$/.test(input.trim()) ? `${prefix}${input.trim()}` : input.trim().toUpperCase();
}
/**
 * Full ticket resolution flow: get branch → detect prefix → suggest ticket → prompt user → normalize.
 * Returns undefined if the user cancels the input box.
 */
async function promptForTicketId(cwd, options) {
    const config = vscode.workspace.getConfiguration('ricwiz');
    const configPrefix = config.get('ticketPrefix', 'SFPSCA-');
    const currentBranch = await getCurrentBranch(cwd);
    const prefix = resolvePrefix(currentBranch, configPrefix);
    const suggestedTicket = extractTicketSuggestion(currentBranch, prefix, options?.handleToSuffix);
    const input = await vscode.window.showInputBox({
        prompt: options?.prompt || 'Enter the full ticket ID (e.g., SCPSCA-1234) or just the number',
        placeHolder: options?.placeHolder || 'Ticket ID or number',
        value: suggestedTicket
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
async function checkBranchExists(cwd, branchName) {
    try {
        await (0, exports.exec)(`git show-ref --verify --quiet refs/heads/${branchName}`, { cwd });
        return true;
    }
    catch (e) { }
    try {
        await (0, exports.exec)(`git show-ref --verify --quiet refs/remotes/origin/${branchName}`, { cwd });
        return true;
    }
    catch (e) { }
    return false;
}
//# sourceMappingURL=git.js.map