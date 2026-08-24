/**
 * Webview HTML & UI Helper Functions
 */

export function escapeHtml(text: string): string {
    if (!text) return '';
    return text
        .replace(/&/g, '&amp;')
        .replace(/</g, '&lt;')
        .replace(/>/g, '&gt;')
        .replace(/"/g, '&quot;')
        .replace(/'/g, '&#39;');
}

export function getJiraStatusColor(status: string): string {
    const s = (status || '').toLowerCase().trim();
    if (s === 'open') return '#888888'; // gray
    if (s === 'in progress') return '#007acc'; // blue
    if (s === 'waiting for deploy') return '#d7a500'; // yellow
    if (s === 'close' || s === 'done' || s === 'closed') return '#238636'; // green
    return 'var(--vscode-badge-background)';
}

/** Returns the colored circle emoji for a given pipeline status */
export function getPipelineIcon(status?: string): string {
    if (!status) return '';
    if (status === 'running') return '🟡';
    if (status === 'success') return '🟢';
    if (status === 'failed') return '🔴';
    if (status === 'canceled' || status === 'skipped') return '⚪';
    return '';
}

/** Returns the common client script used to send commands back to VS Code */
export function getWebviewScript(): string {
    return `
        <script>
            const vscode = acquireVsCodeApi();
            function sendCommand(cmd, args, element) {
                vscode.postMessage({ command: cmd, args: args });
            }
            function sendCheckoutCommand(branchName, element) {
                vscode.postMessage({ command: 'checkout', branch: branchName });
            }
            function sendOpenFileCommand(file, element) {
                vscode.postMessage({ command: 'openFile', file: file });
            }
        </script>
    `;
}
