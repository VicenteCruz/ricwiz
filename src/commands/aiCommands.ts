import * as vscode from 'vscode';
import * as cp from 'child_process';

/**
 * Helper to run the gemini CLI headless and return its output.
 * Streams output to a VS Code Output Channel if provided.
 */
async function runGeminiCLI(prompt: string, workspacePath: string, channel?: vscode.OutputChannel): Promise<string> {
    return new Promise((resolve, reject) => {
        // We use -y (yolo) to avoid interactive prompts, and --output-format text
        const child = cp.spawn('gemini', ['-y', '-p', prompt, '--output-format', 'text'], {
            cwd: workspacePath,
            shell: true
        });

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

        child.on('close', code => {
            if (code === 0) {
                // Return just the last block of text or the whole output
                resolve(stdout.trim());
            } else {
                reject(new Error(`Gemini CLI failed: ${stderr || stdout}`));
            }
        });
    });
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
            cancellable: false
        }, async () => {
            const prompt = `Generate a single, concise commit message description in English for the following git diff.
Rules:
- Start with a capital letter
- Use the imperative mood
- Under 72 characters
- Do NOT include the ticket number
- Do NOT use backticks, quotes, or any punctuation at the start
- Only return the description itself, no other text.

Diff:
${diff.slice(0, 10000)}`;

            const channel = vscode.window.createOutputChannel('Ricwiz AI: Commit Message');
            channel.show(true);
            channel.appendLine('--- Generating Commit Message ---');
            
            const msg = await runGeminiCLI(prompt, cwd, channel);

            channel.appendLine('\n--- Finished ---');

            // Find the last block of text (the actual message without thoughts)
            // Sometimes Gemini outputs <thought> blocks or just text.
            // In headless text mode, it might output everything. We try to grab the last non-empty line or trust the extension to use the cleaned msg.
            // Actually, we'll try to extract the final message if it's mixed with thinking, or just use it as is if it's clean.
            // A simple heuristic: take the last non-empty line if there's lots of text, but let's just use the whole msg and clean it up.
            
            // Clean up backticks if any
            let cleanedMsg = msg.replace(/^`+|`+$/g, '').trim();
            // If the model output a lot of reasoning, we might want to split by newlines and take the last block
            const lines = cleanedMsg.split('\n');
            if (lines.length > 5) {
                // If it's very long, the actual commit message is likely the last line
                cleanedMsg = lines[lines.length - 1].trim();
            }

            const gitExt = vscode.extensions.getExtension('vscode.git');
            if (gitExt && gitExt.isActive) {
                const git = gitExt.exports.getAPI(1);
                if (git.repositories.length > 0) {
                    const repo = git.repositories[0];
                    const current = repo.inputBox.value;
                    const ticketPattern = /^[A-Z]+-\d+(?:-\d+)?\s*(?:-\s*|:\s*|\s+)?/i;
                    const match = current.match(ticketPattern);
                    if (match) {
                        repo.inputBox.value = match[0] + cleanedMsg;
                    } else {
                        repo.inputBox.value = cleanedMsg;
                    }
                    vscode.window.showInformationMessage('Commit message generated and prefilled!');
                } else {
                    vscode.window.showInformationMessage('Generated: ' + cleanedMsg);
                }
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
            cancellable: false
        }, async () => {
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
                    const ticketPattern = /[A-Z]+-\d+/g;
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

            const answer = await runGeminiCLI(prompt, cwd, channel);
            
            channel.appendLine('\n----------------------------------------');
            channel.appendLine('Finished.');
        });
    } catch (e: any) {
        vscode.window.showErrorMessage('Failed to fetch code context: ' + e.message);
    }
}
