import * as vscode from 'vscode';

export const ricwizLogger = vscode.window.createOutputChannel("Ricwiz Debug");

export function logDebug(message: string) {
    const timestamp = new Date().toISOString();
    ricwizLogger.appendLine(`[${timestamp}] ${message}`);
    console.log(`[Ricwiz] ${message}`);
}
