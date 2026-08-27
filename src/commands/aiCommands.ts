import * as vscode from 'vscode';
import * as cp from 'child_process';

/**
 * Helper to run the gemini CLI headless and return its output.
 * Streams output to a VS Code Output Channel if provided.
 */
async function runGeminiCLI(prompt: string, workspacePath: string, channel?: vscode.OutputChannel, token?: vscode.CancellationToken): Promise<string> {
    return new Promise((resolve, reject) => {
        let geminiPath = 'gemini';
        
        // We use -y (yolo) to avoid interactive prompts, and --output-format text
        const child = cp.spawn(geminiPath , ['-y', '--output-format', 'text', prompt], {
            cwd: workspacePath,
            shell: true
        });

        // Close stdin so the process doesn't hang waiting for input
        child.stdin.end();

        if (token) {
            token.onCancellationRequested(() => {
                child.kill();
                reject(new Error("Operation cancelled by user."));
            });
        }

        let stdout = '';
        let stderr = '';

        child.stdout.on('data', data => {
            const text = data.toString();
            stdout += text;
            if (channel) channel.append(text);
        });
        
        child.stderr.on('data', data => {
            const text = data.toString();
            stderr += text;
            if (channel) channel.append(text);
        });

        child.on('error', err => {
            reject(new Error(`Failed to start Gemini CLI: ${err.message}. Is it installed and in your PATH?`));
        });

        child.on('close', code => {
            if (code === 0) {
                // Return just the last block of text or the whole output
                resolve(stdout.trim());
            } else {
                reject(new Error(`Gemini CLI failed with code ${code}: ${stderr || stdout}`));
            }
        });
    });
}

import { getCurrentBranch, resolvePrefix } from '../git';

/**
 * Extracts ONLY the final commit message from raw AI output.
 * Looks for '###<commit message>###' as requested in the prompt,
 * ignores alternative phrases, and cleans ticket numbers and quotes.
 */
export function extractCommitMessage(rawOutput: string): string {
    if (!rawOutput || !rawOutput.trim()) {
        return '';
    }

    let text = rawOutput.trim();

    // 1. Look for ###<commit message>### marker (or ###Answer###: format)
    const hashMatch = text.match(/###\s*([^#\r\n]+)\s*###/);
    if (hashMatch && hashMatch[1]?.trim()) {
        text = hashMatch[1].trim();
    } else {
        const answerMatch = text.match(/###\s*Answer\s*###\s*:?\s*([^\r\n]+)/i);
        if (answerMatch && answerMatch[1]?.trim()) {
            text = answerMatch[1].trim();
        } else {
            // Fallback: strip XML tags or extract tag content
            const tagMatch = text.match(/<(?:commit_message|answer|output)>([\s\S]*?)<\/(?:commit_message|answer|output)>/i);
            if (tagMatch && tagMatch[1]?.trim()) {
                text = tagMatch[1].trim();
            } else {
                text = text.replace(/<(?:thought|think|thinking)[\s\S]*?<\/(?:thought|think|thinking)>/gi, '');
                const validLine = text.split(/\r?\n/)
                    .map(l => l.trim())
                    .find(l => l.length > 0 && !/^alternative\b/i.test(l) && !/^(?:thinking|thought|here\s+is)/i.test(l));
                text = validLine || text;
            }
        }
    }

    // 2. Clean up line (quotes, bullet points, ticket IDs, trailing period)
    let candidate = text.split(/\r?\n/)[0].trim();
    candidate = candidate.replace(/^#+|#+$/g, '').trim();
    candidate = candidate.replace(/^###\s*Answer\s*###\s*:?\s*/i, '');
    candidate = candidate.replace(/^[`"']+|[`"']+$/g, '').trim();
    candidate = candidate.replace(/^[-*•]\s+/, '');
    candidate = candidate.replace(/^\d+[\.\)]\s+/, '');
    // Strip ticket ID prefix if AI added one (e.g., SFPSCA-1234 - or [CRC-R19-123])
    candidate = candidate.replace(/^\[?[A-Z0-9]+(?:-[A-Z0-9]+)*-\d+(?:-\d+)?\]?\s*(?:-\s*|:\s*|\s+)?/i, '');
    candidate = candidate.replace(/\s+/g, ' ').trim();

    // Capitalize first letter (unless conventional commit prefix like feat:)
    if (candidate.length > 0 && /^[a-z]/.test(candidate)) {
        const isConventional = /^(feat|fix|docs|style|refactor|perf|test|build|ci|chore|revert)(\([^\)]+\))?:/.test(candidate);
        if (!isConventional) {
            candidate = candidate.charAt(0).toUpperCase() + candidate.slice(1);
        }
    }

    if (candidate.endsWith('.') && !candidate.endsWith('..')) {
        candidate = candidate.slice(0, -1).trim();
    }

    return candidate;
}

export async function generateCommitMessage() {
    const workspaceFolders = vscode.workspace.workspaceFolders;
    if (!workspaceFolders) {
        vscode.window.showErrorMessage('No workspace folder found.');
        return;
    }
    const cwd = workspaceFolders[0].uri.fsPath;

    try {
        // Get staged diff
        const diff = await new Promise<string>((resolve, reject) => {
            cp.exec('git diff --cached', { cwd, maxBuffer: 1024 * 1024 * 10 }, (err, stdout, stderr) => {
                if (err && !stdout) reject(err);
                else resolve(stdout);
            });
        });

        if (!diff.trim()) {
            vscode.window.showInformationMessage('No staged changes found. Please stage your changes first.');
            return;
        }

        await vscode.window.withProgress({
            location: vscode.ProgressLocation.Notification,
            title: "Generating commit message with Gemini...",
            cancellable: true
        }, async (progress, token) => {
            const prompt = `Generate a single, concise commit message description in English for the following git diff.

Rules:
- Start with a capital letter
- Use the imperative mood (e.g. "Add", "Fix", "Update", "Refactor")
- Under 72 characters
- Do NOT include any ticket numbers
- Do NOT provide multiple options or alternatives
- Output the final message enclosed exactly between ### and ### on its own line like:
###<your commit message here>###

Diff:
${diff.slice(0, 10000)}`;

            const channel = vscode.window.createOutputChannel('Ricwiz AI: Commit Message');
            channel.show(true);
            channel.appendLine('--- Generating Commit Message ---');
            
            const msg = await runGeminiCLI(prompt, cwd, channel, token);

            channel.appendLine('\n--- Finished ---');

            const cleanedMsg = extractCommitMessage(msg);
            if (!cleanedMsg) {
                vscode.window.showWarningMessage('Could not extract a valid commit message from Gemini output.');
                return;
            }

            const gitExt = vscode.extensions.getExtension('vscode.git');
            if (gitExt && gitExt.isActive) {
                const git = gitExt.exports.getAPI(1);
                if (git.repositories.length > 0) {
                    const repo = git.repositories[0];
                    const current = repo.inputBox.value || '';
                    const ticketPattern = /^[A-Z]+-\d+(?:-\d+)?\s*(?:-\s*|:\s*|\s+)?/i;
                    const match = current.match(ticketPattern);
                    if (match) {
                        repo.inputBox.value = match[0] + cleanedMsg;
                    } else {
                        // Check if current branch has a ticket ID that we can prepend
                        const currentBranch = await getCurrentBranch(cwd);
                        const config = vscode.workspace.getConfiguration('ricwiz');
                        const configPrefix = config.get<string>('ticketPrefix', 'SFPSCA-');
                        const prefix = resolvePrefix(currentBranch, configPrefix);
                        const ticketMatch = currentBranch.match(new RegExp(`(${prefix}\\d+(?:-\\d+)?)`, 'i'));
                        if (ticketMatch) {
                            const suffix = config.get<string>('commitMessageSuffix', '- ');
                            repo.inputBox.value = `${ticketMatch[1].toUpperCase()}${suffix}` + cleanedMsg;
                        } else {
                            repo.inputBox.value = cleanedMsg;
                        }
                    }
                    vscode.window.showInformationMessage('Commit message generated and prefilled!');
                } else {
                    vscode.window.showInformationMessage('Generated: ' + cleanedMsg);
                }
            } else {
                vscode.window.showInformationMessage('Generated: ' + cleanedMsg);
            }
        });
    } catch (e: any) {
        vscode.window.showErrorMessage('Failed to generate commit message: ' + e.message);
    }
}

import { fetchJiraIssuesBatch } from '../jiraApi';

export async function askCodeContext(question: string) {
    if (!question) {
        question = await vscode.window.showInputBox({
            prompt: 'Ask a question about the code context (e.g. Why does this do X?)',
            placeHolder: 'Why does this code exist?'
        }) || '';
        if (!question) return;
    }

    const workspaceFolders = vscode.workspace.workspaceFolders;
    if (!workspaceFolders) {
        vscode.window.showErrorMessage('No workspace folder found.');
        return;
    }
    const cwd = workspaceFolders[0].uri.fsPath;

    try {
        await vscode.window.withProgress({
            location: vscode.ProgressLocation.Notification,
            title: "Fetching Code Context via Gemini...",
            cancellable: true
        }, async (progress, token) => {
            let fileContext = '';
            let jiraContext = '';
            const editor = vscode.window.activeTextEditor;
            if (editor) {
                const filePath = vscode.workspace.asRelativePath(editor.document.uri);
                const selection = editor.selection;
                const start = selection.start.line + 1;
                const end = selection.end.line + 1;
                fileContext = `The user is currently looking at file '${filePath}' between lines ${start} and ${end}.`;
                
                try {
                    const blameOutput = cp.execSync(`git blame -w -C -C -L ${start},${end} "${filePath}"`, { cwd, encoding: 'utf8' });
                    const ticketPattern = /[A-Z]+-\\d+/g;
                    const matches = blameOutput.match(ticketPattern) || [];
                    const uniqueIds = [...new Set(matches)];
                    
                    if (uniqueIds.length > 0) {
                        const issues = await fetchJiraIssuesBatch(uniqueIds);
                        jiraContext = 'Related Jira Tickets Context:\\n' + issues.map(i => 
                            `Ticket: ${i.key}\\nSummary: ${i.title}\\nDescription: ${i.description}\\nStatus: ${i.status}`
                        ).join('\\n\\n');
                    }
                } catch (err) {
                    // Ignore git blame errors
                }
            }

            const prompt = `You are a helpful agent that answers code context questions.
User's Question: ${question}
${fileContext}

${jiraContext}

Please use terminal tools like git blame or git log to trace the code history if needed, and answer the user's question directly.
Output your final answer directly in English.`;

            const channel = vscode.window.createOutputChannel('Ricwiz AI: Code Context');
            channel.clear();
            channel.show(true);
            channel.appendLine('Question: ' + question);
            channel.appendLine(fileContext);
            channel.appendLine('----------------------------------------');

            const answer = await runGeminiCLI(prompt, cwd, channel, token);
            
            channel.appendLine('\n----------------------------------------');
            channel.appendLine('Finished.');
        });
    } catch (e: any) {
        vscode.window.showErrorMessage('Failed to fetch code context: ' + e.message);
    }
}
