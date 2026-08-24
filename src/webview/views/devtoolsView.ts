import { getWebviewScript } from '../helpers';
import { getWebviewStyles } from '../styles';

export function renderDevtoolsView(): string {
    const styleHtml = getWebviewStyles();

    return `<!DOCTYPE html>
    <html lang="en">
    <head>
        <meta charset="UTF-8">
        <meta name="viewport" content="width=device-width, initial-scale=1.0">
        <title>Ricwiz DevTools</title>
        ${styleHtml}
    </head>
    <body>
        <div style="display: flex; align-items: center; gap: 8px; margin-bottom: 16px; margin-top: 8px;">
            <button class="btn" style="width: auto; padding: 4px 8px; background-color: var(--vscode-button-secondaryBackground); color: var(--vscode-button-secondaryForeground);" onclick="sendCommand('openMain', null, this)">← Back</button>
            <div style="font-weight: bold; font-size: 13px; flex: 1; text-align: center;">Developer Utilities</div>
        </div>

        <div style="display: flex; flex-direction: column; gap: 8px;">
            <button class="btn" title="Generate Salesforce package.xml from git diff" onclick="sendCommand('generatePackageXml', null, this)">
                <span class="icon" style="color: #FF9F0A;">▢</span> Auto Package.xml
            </button>
            
            <button class="btn" title="Generate destructiveChanges.xml for deleted files" onclick="sendCommand('generateDestructiveChanges', null, this)">
                <span class="icon" style="color: #FF453A;">⨯</span> Auto DestructiveChanges
            </button>

            <button class="btn" title="Deploy the generated package to Salesforce" onclick="sendCommand('deployPackage', null, this)">
                <span class="icon" style="color: #0A84FF;">☁</span> Deploy Package
            </button>

            <button class="btn" title="Smart run modified Apex Test classes" onclick="sendCommand('runSmartTests', null, this)">
                <span class="icon" style="color: #BF5AF2;">⚗</span> Smart Test Runner
            </button>

            <button class="btn" title="Import data using Salesforce CLI" onclick="sendCommand('importData', null, this)">
                <span class="icon" style="color: #64D2FF;">↧</span> Import Data
            </button>

            <div class="separator" style="margin: 4px 0;"></div>

            <button class="btn" title="Find and group all files modified in a specific ticket" onclick="sendCommand('listTicketFiles', null, this)">
                <span class="icon" style="color: #64D2FF;">☰</span> List Ticket Files
            </button>

            <button class="btn" title="Reset Salesforce source tracking" onclick="sendCommand('resetTracking', null, this)">
                <span class="icon" style="color: #FF453A;">⌫</span> Reset Tracking
            </button>

            <button class="btn" title="Extract metadata components quickly from Salesforce" onclick="sendCommand('extractComponent', null, this)">
                <span class="icon" style="color: #0A84FF;">☁</span> Extract Component
            </button>

            <button class="btn" title="Deploy the current open file to multiple orgs simultaneously" onclick="sendCommand('deployMultiOrg', null, this)">
                <span class="icon" style="color: #0A84FF;">⇪</span> Deploy to Multi-Org
            </button>

            <button class="btn" title="Capture admin changes safely" onclick="sendCommand('captureAdminChanges', null, this)">
                <span class="icon" style="color: #FFD60A;">⚲</span> Capture Admin Changes
            </button>
            
            <button class="btn" title="Discover who last modified the current file in Git and Salesforce" onclick="sendCommand('whoToBlame', null, this)" style="background-color: var(--vscode-button-hoverBackground);">
                <span class="icon">⌕</span> Who to Blame
            </button>
        </div>
        
        ${getWebviewScript()}
    </body>
    </html>`;
}
