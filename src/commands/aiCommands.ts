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
 * Sanitizes and extracts ONLY the final commit message from raw AI output.
 * Handles thought/reasoning tags, thinking process blocks, markdown fences,
 * preamble text, conversational filler, bullet lists, quotes, and ticket prefixes.
 */
export function extractCommitMessage(rawOutput: string): string {
    if (!rawOutput || !rawOutput.trim()) {
        return '';
    }

    let text = rawOutput.trim();

    // 0. If output is JSON (e.g. {"commit_message": "..."} or {"message": "..."}), extract from JSON
    if (text.startsWith('{') && text.endsWith('}')) {
        try {
            const parsed = JSON.parse(text);
            const val = parsed.commit_message || parsed.message || parsed.commit || parsed.description || parsed.summary;
            if (typeof val === 'string' && val.trim()) {
                text = val.trim();
            }
        } catch (e) {
            // Not valid JSON, continue with standard parsing
        }
    }

    // 1. If explicitly enclosed in <commit_message>...</commit_message> (or similar tags), extract that directly first
    const tagMatch = text.match(/<commit_message>([\s\S]*?)<\/commit_message>/i)
        || text.match(/<commit>([\s\S]*?)<\/commit>/i)
        || text.match(/<message>([\s\S]*?)<\/message>/i)
        || text.match(/<final_answer>([\s\S]*?)<\/final_answer>/i)
        || text.match(/<answer>([\s\S]*?)<\/answer>/i)
        || text.match(/<output>([\s\S]*?)<\/output>/i)
        || text.match(/<result>([\s\S]*?)<\/result>/i);

    if (tagMatch && tagMatch[1]?.trim()) {
        text = tagMatch[1].trim();
    }

    // 2. Strip XML-style thinking/reasoning/scratchpad tags (closed and unclosed)
    text = text.replace(/<thought[\s\S]*?<\/thought>/gi, '');
    text = text.replace(/<think[\s\S]*?<\/think>/gi, '');
    text = text.replace(/<thinking[\s\S]*?<\/thinking>/gi, '');
    text = text.replace(/<reasoning[\s\S]*?<\/reasoning>/gi, '');
    text = text.replace(/<reflection[\s\S]*?<\/reflection>/gi, '');
    text = text.replace(/<scratchpad[\s\S]*?<\/scratchpad>/gi, '');
    text = text.replace(/<context[\s\S]*?<\/context>/gi, '');
    // In case tags were cut off / unclosed
    text = text.replace(/<(?:thought|think|thinking|reasoning|reflection|scratchpad)[\s\S]*$/gi, '');

    // 2b. Strip whole multiline "Thinking Process: ... \n\n" blocks if present
    text = text.replace(/(?:^|\n)(?:thinking|thought|reasoning|analysis)(?:\s+process)?\s*:[\s\S]*?(?=\n\s*\n|\n\s*[A-Z]|$)/gi, '\n');

    // 2c. Strip trailing explanation/details/why sections (e.g. "\nWhy this message? ...")
    text = text.replace(/\n\s*(?:why(?:\s+this\s+message|\s+this\s+commit)?|explanation|details|notes?|summary|rationale)\s*[:?][\s\S]*$/gi, '');

    // 3. Strip Markdown code fences (e.g. ```commit ... ``` or ```text ... ``` or ``` ... ```)
    text = text.replace(/^```[a-zA-Z0-9_-]*\s*\n?/gm, '');
    text = text.replace(/```$/gm, '');
    text = text.replace(/`+/g, '');

    // 4. Split into lines and filter out thoughts/preambles/explanations
    const rawLines = text.split(/\r?\n/).map(l => l.trim()).filter(l => l.length > 0);

    const ignoreLinePatterns: RegExp[] = [
        /^(?:thinking|thought|reasoning|analysis|diff analysis|summary|explanation|notes?|details?)(?:\s+process)?\s*:/i,
        /^(?:here\s+is|here's|based\s+on|according\s+to|i\s+have|i\s+suggest|suggested|proposed|output)\b.*?:/i,
        /^(?:sure|certainly|okay|ok|here\s+you\s+go)[!.,]?/i,
        /^(?:let\s+me\s+know|hope\s+this\s+helps|feel\s+free|this\s+commit)\b/i,
        /^(?:why\s+this\s+message|changes\s+included|key\s+changes|files\s+changed|diff\s+summary|reasons?)\b/i,
        /^[-=*_]{3,}$/, // Markdown thematic breaks / horizontal rules
    ];

    const validLines = rawLines.filter(line => {
        for (const pattern of ignoreLinePatterns) {
            if (pattern.test(line)) {
                return false;
            }
        }
        return true;
    });

    let candidate = '';

    if (validLines.length === 0) {
        candidate = rawLines[rawLines.length - 1] || '';
    } else if (validLines.length === 1) {
        candidate = validLines[0];
    } else {
        const explicitCommitLine = validLines.find(l => /^(?:commit\s+message|commit\s+description|commit|message)\s*:/i.test(l));
        if (explicitCommitLine) {
            candidate = explicitCommitLine;
        } else {
            const goodLine = validLines.find(l => l.length <= 120 && !/^[-*•]\s+(?:why|because|fixes|changes|note|added|updated)/i.test(l));
            candidate = goodLine || validLines[0];
        }
    }

    // 5. Clean up the candidate line
    // Strip common labels at the start
    candidate = candidate.replace(/^(?:commit\s+message|commit\s+description|commit|description|message|title|summary)\s*:\s*/i, '');
    
    // Strip bullet markers and list numbers at the start
    candidate = candidate.replace(/^[-*•]\s+/, '');
    candidate = candidate.replace(/^\d+[\.\)]\s+/, '');

    // Strip bold/italic markdown (**text** or *text* or __text__)
    candidate = candidate.replace(/^\*\*([\s\S]*)\*\*$/g, '$1');
    candidate = candidate.replace(/^__([\s\S]*)__$/g, '$1');
    candidate = candidate.replace(/^\*([\s\S]*)\*$/g, '$1');
    candidate = candidate.replace(/^_([\s\S]*)_$/g, '$1');

    // Strip surrounding quotes
    candidate = candidate.replace(/^["'`]+|["'`]+$/g, '').trim();

    // Strip any HTML tags (e.g. <b>...</b>)
    candidate = candidate.replace(/<\/?[a-zA-Z0-9]+(?:\s+[^>]*)?>/g, '');

    // Strip any ticket IDs or prefixes accidentally added by the model at the beginning (e.g., "SFPSCA-123: ", "[CRC-R19-123] - ")
    candidate = candidate.replace(/^\[?[A-Z0-9]+(?:-[A-Z0-9]+)*-\d+(?:-\d+)?\]?\s*(?:-\s*|:\s*|\s+)?/i, '');

    // Strip blockquote markers
    candidate = candidate.replace(/^>\s*/, '');

    // Normalize whitespace
    candidate = candidate.replace(/\s+/g, ' ').trim();

    // Ensure it starts with a capital letter if it starts with an alphabetical character
    if (candidate.length > 0 && /^[a-z]/.test(candidate)) {
        const isConventional = /^(feat|fix|docs|style|refactor|perf|test|build|ci|chore|revert)(\([^\)]+\))?:/.test(candidate);
        if (!isConventional) {
            candidate = candidate.charAt(0).toUpperCase() + candidate.slice(1);
        }
    }

    // Strip trailing period if single line short message
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
            const prompt = `You are an expert developer. Generate a single, concise Git commit message description in English for the provided git diff.

STRICT INSTRUCTIONS:
- You must output ONLY the commit message enclosed inside <commit_message> and </commit_message> tags.
- Example output: <commit_message>Add unit tests for commit message parser</commit_message>
- Do NOT output any thinking, reasoning, chain of thought, explanations, preambles, or markdown backticks outside or inside the tags.
- Start with a capital letter and use the imperative mood (e.g., "Add", "Fix", "Update", "Refactor").
- Keep it under 72 characters.
- Do NOT include any Jira ticket number or ticket prefix.
- Do NOT include quotes around the message.

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
