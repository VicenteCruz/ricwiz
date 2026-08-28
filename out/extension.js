"use strict";
var __create = Object.create;
var __defProp = Object.defineProperty;
var __getOwnPropDesc = Object.getOwnPropertyDescriptor;
var __getOwnPropNames = Object.getOwnPropertyNames;
var __getProtoOf = Object.getPrototypeOf;
var __hasOwnProp = Object.prototype.hasOwnProperty;
var __esm = (fn, res, err) => function __init() {
  if (err) throw err[0];
  try {
    return fn && (res = (0, fn[__getOwnPropNames(fn)[0]])(fn = 0)), res;
  } catch (e) {
    throw err = [e], e;
  }
};
var __export = (target, all) => {
  for (var name in all)
    __defProp(target, name, { get: all[name], enumerable: true });
};
var __copyProps = (to, from, except, desc) => {
  if (from && typeof from === "object" || typeof from === "function") {
    for (let key of __getOwnPropNames(from))
      if (!__hasOwnProp.call(to, key) && key !== except)
        __defProp(to, key, { get: () => from[key], enumerable: !(desc = __getOwnPropDesc(from, key)) || desc.enumerable });
  }
  return to;
};
var __toESM = (mod, isNodeMode, target) => (target = mod != null ? __create(__getProtoOf(mod)) : {}, __copyProps(
  // If the importer is in node compatibility mode or this is not an ESM
  // file that has been converted to a CommonJS file using a Babel-
  // compatible transform (i.e. "__esModule" has not been set), then set
  // "default" to the CommonJS "module.exports" for node compatibility.
  isNodeMode || !mod || !mod.__esModule ? __defProp(target, "default", { value: mod, enumerable: true }) : target,
  mod
));
var __toCommonJS = (mod) => __copyProps(__defProp({}, "__esModule", { value: true }), mod);

// src/logger.ts
function logDebug(message) {
  const timestamp = (/* @__PURE__ */ new Date()).toISOString();
  ricwizLogger.appendLine(`[${timestamp}] ${message}`);
  console.log(`[Ricwiz] ${message}`);
}
var vscode2, ricwizLogger;
var init_logger = __esm({
  "src/logger.ts"() {
    "use strict";
    vscode2 = __toESM(require("vscode"));
    ricwizLogger = vscode2.window.createOutputChannel("Ricwiz Debug");
  }
});

// src/secrets.ts
async function initializeSecrets(context) {
  logDebug("initializeSecrets: No longer using SecretStorage. Tokens are read directly from VS Code configuration.");
}
async function storeJiraToken(token) {
  logDebug("storeJiraToken: Storing token in VS Code global configuration...");
  const config = vscode3.workspace.getConfiguration("ricwiz");
  await config.update("jiraApiToken", token, vscode3.ConfigurationTarget.Global);
  logDebug("storeJiraToken: Successfully stored");
}
async function getJiraToken() {
  logDebug("getJiraToken: Reading token from VS Code configuration...");
  const config = vscode3.workspace.getConfiguration("ricwiz");
  const token = config.get("jiraApiToken", "");
  if (token) {
    logDebug("getJiraToken: Successfully read Jira Token from configuration.");
    return token;
  }
  logDebug("getJiraToken: Token not found in configuration.");
  return void 0;
}
async function storeGitlabToken(token) {
  logDebug("storeGitlabToken: Storing token in VS Code global configuration...");
  const config = vscode3.workspace.getConfiguration("ricwiz");
  await config.update("gitlabApiToken", token, vscode3.ConfigurationTarget.Global);
  logDebug("storeGitlabToken: Successfully stored");
}
async function getGitlabToken() {
  logDebug("getGitlabToken: Reading token from VS Code configuration...");
  const config = vscode3.workspace.getConfiguration("ricwiz");
  const token = config.get("gitlabApiToken", "");
  if (token) {
    return token;
  }
  return void 0;
}
var vscode3;
var init_secrets = __esm({
  "src/secrets.ts"() {
    "use strict";
    vscode3 = __toESM(require("vscode"));
    init_logger();
  }
});

// src/jiraApi.ts
var jiraApi_exports = {};
__export(jiraApi_exports, {
  addJiraComment: () => addJiraComment,
  addJiraLabel: () => addJiraLabel,
  extractTextFromADF: () => extractTextFromADF,
  fetchJiraIssue: () => fetchJiraIssue,
  fetchJiraIssuesBatch: () => fetchJiraIssuesBatch,
  fetchJiraTransitions: () => fetchJiraTransitions,
  searchJira: () => searchJira,
  transitionJiraIssue: () => transitionJiraIssue
});
async function getJiraAuthAndBaseUrl() {
  logDebug("getJiraAuthAndBaseUrl: Starting...");
  const config = vscode14.workspace.getConfiguration("ricwiz");
  const jiraUrlStr = config.get("jiraUrl", "");
  const email = config.get("jiraEmail", "")?.trim();
  logDebug("getJiraAuthAndBaseUrl: Calling getJiraToken()...");
  let token = (await getJiraToken())?.trim();
  if (!token && process.env.RICWIZ_JIRA_TOKEN) {
    logDebug("getJiraAuthAndBaseUrl: Token not found in secretStorage, using process.env");
    token = process.env.RICWIZ_JIRA_TOKEN.trim();
  }
  if (!jiraUrlStr || !token) {
    logDebug(`getJiraAuthAndBaseUrl: FAILED. URL: "${jiraUrlStr}", hasToken: ${!!token}`);
    throw new Error(`[v5.2.0] Jira API Token is not securely configured. URL: "${jiraUrlStr}", hasToken: ${!!token}`);
  }
  let baseUrl = jiraUrlStr;
  if (baseUrl.includes("/browse")) {
    baseUrl = baseUrl.split("/browse")[0];
  }
  if (baseUrl.endsWith("/")) {
    baseUrl = baseUrl.slice(0, -1);
  }
  const headerAuth = email ? `Basic ${Buffer.from(`${email}:${token}`).toString("base64")}` : `Bearer ${token}`;
  return { baseUrl, headerAuth };
}
async function jiraRequest(method, path8, body) {
  const { baseUrl, headerAuth } = await getJiraAuthAndBaseUrl();
  const url = new URL(`${baseUrl}${path8}`);
  return new Promise((resolve, reject) => {
    const req = https2.request(url, {
      method,
      headers: {
        "Authorization": headerAuth,
        "Accept": "application/json",
        ...body ? { "Content-Type": "application/json" } : {}
      }
    }, (res) => {
      let data = "";
      res.on("data", (chunk) => data += chunk);
      res.on("end", () => {
        if (res.statusCode === 401 || res.statusCode === 403) {
          return reject(new Error(`Authentication failed (HTTP ${res.statusCode}). Please check your Jira settings.`));
        }
        if (res.statusCode && res.statusCode >= 400) {
          let jiraErrorStr = "";
          try {
            const errJson = JSON.parse(data);
            if (errJson.errorMessages && errJson.errorMessages.length > 0) {
              jiraErrorStr = errJson.errorMessages.join(", ");
            }
          } catch (e) {
          }
          if (res.statusCode === 404 || res.statusCode === 410) {
            return reject(new Error(`Ticket not found or deleted (HTTP ${res.statusCode}). ${jiraErrorStr}`));
          }
          return reject(new Error(`Jira API returned HTTP status ${res.statusCode}. ${jiraErrorStr}`));
        }
        if (!data) return resolve({});
        try {
          const json = JSON.parse(data);
          resolve(json);
        } catch (e) {
          reject(new Error("Failed to parse Jira response."));
        }
      });
    });
    req.on("error", (e) => reject(new Error(`Network error: ${e.message}`)));
    if (body) {
      req.write(JSON.stringify(body));
    }
    req.end();
  });
}
async function fetchJiraIssue(ticketId) {
  const { baseUrl } = await getJiraAuthAndBaseUrl();
  const json = await jiraRequest("GET", `/rest/api/2/issue/${ticketId}`);
  if (json && json.fields) {
    return {
      summary: json.fields.summary || "",
      description: json.fields.description || "No description provided.",
      status: json.fields.status?.name || "Unknown",
      url: `${baseUrl}/browse/${ticketId}`
    };
  }
  return null;
}
async function fetchJiraTransitions(ticketId) {
  const json = await jiraRequest("GET", `/rest/api/2/issue/${ticketId}/transitions`);
  if (json && json.transitions) {
    return json.transitions.map((t) => ({
      id: t.id,
      name: t.name
    }));
  }
  return [];
}
async function transitionJiraIssue(ticketId, transitionId) {
  await jiraRequest("POST", `/rest/api/2/issue/${ticketId}/transitions`, {
    transition: {
      id: transitionId
    }
  });
}
async function addJiraComment(ticketId, comment) {
  await jiraRequest("POST", `/rest/api/2/issue/${ticketId}/comment`, {
    body: comment
  });
}
async function addJiraLabel(ticketId, label) {
  await jiraRequest("PUT", `/rest/api/2/issue/${ticketId}`, {
    update: {
      labels: [
        { add: label }
      ]
    }
  });
}
async function searchJira(jql) {
  const json = await jiraRequest("POST", "/rest/api/3/search/jql", {
    jql,
    maxResults: 50,
    fields: ["summary", "status", "assignee"]
  });
  if (json && json.issues) {
    return json.issues.map((issue) => ({
      key: issue.key,
      summary: issue.fields?.summary || "No Title",
      status: issue.fields?.status?.name || "Unknown",
      assignee: issue.fields?.assignee?.displayName || "Unassigned"
    }));
  }
  return [];
}
function extractTextFromADF(adfNode) {
  if (!adfNode || typeof adfNode !== "object") {
    return "";
  }
  const node = adfNode;
  if (node.type === "text") {
    return typeof node.text === "string" ? node.text : "";
  }
  let text = "";
  if (Array.isArray(node.content)) {
    for (const child of node.content) {
      const childText = extractTextFromADF(child);
      if (childText) {
        text += childText + " ";
      }
    }
  }
  return text.trim();
}
async function fetchJiraIssuesBatch(ticketIds) {
  if (ticketIds.length === 0) {
    return [];
  }
  const jql = `issueKey IN (${ticketIds.join(",")})`;
  const json = await jiraRequest("POST", "/rest/api/3/search/jql", {
    jql,
    maxResults: 15,
    fields: ["summary", "description", "parent", "subtasks", "issuelinks", "issuetype", "status", "assignee", "priority", "labels", "fixVersions"]
  });
  if (!json || !json.issues) {
    return [];
  }
  return json.issues.map((issue) => {
    const parentRaw = issue.fields?.parent;
    const parent = parentRaw ? { key: parentRaw.key, title: parentRaw.fields?.summary || "" } : void 0;
    const subtasks = (issue.fields?.subtasks ?? []).map(
      (s) => ({ key: s.key, title: s.fields?.summary || "" })
    );
    const issueLinks = (issue.fields?.issuelinks ?? []).map(
      (link) => {
        if (link.outwardIssue) {
          return {
            type: link.type?.outward || "relates to",
            issue: { key: link.outwardIssue.key, title: link.outwardIssue.fields?.summary || "" }
          };
        }
        return {
          type: link.type?.inward || "relates to",
          issue: { key: link.inwardIssue.key, title: link.inwardIssue.fields?.summary || "" }
        };
      }
    );
    const fixVersions = (issue.fields?.fixVersions ?? []).map((v) => v.name).filter(Boolean);
    return {
      key: issue.key,
      title: issue.fields?.summary || "",
      type: issue.fields?.issuetype?.name || "",
      status: issue.fields?.status?.name || "",
      assignee: issue.fields?.assignee?.displayName || "",
      priority: issue.fields?.priority?.name || "",
      labels: issue.fields?.labels || [],
      fixVersions,
      description: extractTextFromADF(issue.fields?.description),
      parent,
      subtasks,
      issueLinks
    };
  });
}
var https2, vscode14;
var init_jiraApi = __esm({
  "src/jiraApi.ts"() {
    "use strict";
    https2 = __toESM(require("https"));
    vscode14 = __toESM(require("vscode"));
    init_secrets();
    init_logger();
  }
});

// src/extension.ts
var extension_exports = {};
__export(extension_exports, {
  activate: () => activate,
  deactivate: () => deactivate,
  webviewProvider: () => webviewProvider
});
module.exports = __toCommonJS(extension_exports);
var vscode39 = __toESM(require("vscode"));

// src/webview.ts
var vscode = __toESM(require("vscode"));

// src/webview/helpers.ts
function escapeHtml(text) {
  if (!text) return "";
  return text.replace(/&/g, "&amp;").replace(/</g, "&lt;").replace(/>/g, "&gt;").replace(/"/g, "&quot;").replace(/'/g, "&#39;");
}
function getJiraStatusColor(status) {
  const s = (status || "").toLowerCase().trim();
  if (s === "open") return "#888888";
  if (s === "in progress") return "#007acc";
  if (s === "waiting for deploy") return "#d7a500";
  if (s === "close" || s === "done" || s === "closed") return "#238636";
  return "var(--vscode-badge-background)";
}
function getPipelineIcon(status) {
  if (!status) return "";
  if (status === "running") return "\u{1F7E1}";
  if (status === "success") return "\u{1F7E2}";
  if (status === "failed") return "\u{1F534}";
  if (status === "canceled" || status === "skipped") return "\u26AA";
  return "";
}
function getWebviewScript() {
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

// src/webview/styles.ts
function getWebviewStyles() {
  return `
        <style>
            :root {
                /* Richemont Palette */
                --rich-blue: #003366;
                --rich-gold: #D4AF37;
                --rich-white: #FFFFFF;
                
                /* Apple-style UI elements (Dark Mode) */
                --rich-bg: #000000;
                --rich-text: #F5F5F7;
                --rich-border: #38383A;
                --rich-card: #1C1C1E;
                --rich-btn: #2C2C2E;
                
                --radius-sm: 6px;
                --radius-md: 10px;
                --radius-lg: 14px;
                
                --shadow-sm: 0 1px 2px rgba(0,0,0,0.3);
                --shadow-md: 0 4px 12px rgba(0,0,0,0.5);
            }

            body {
                padding: 16px 12px;
                display: flex;
                flex-direction: column;
                gap: 12px;
                font-family: -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, Helvetica, Arial, sans-serif;
                background-color: var(--rich-bg) !important;
                color: var(--rich-text) !important;
                -webkit-font-smoothing: antialiased;

                /* Override VSCode theme variables for a consistent dark Apple theme */
                --vscode-panel-border: var(--rich-border);
                --vscode-list-hoverBackground: rgba(255, 255, 255, 0.1);
                --vscode-widget-border: var(--rich-border);
                --vscode-dropdown-background: var(--rich-card);
                --vscode-dropdown-foreground: var(--rich-text);
                --vscode-dropdown-border: var(--rich-border);
                --vscode-editorIndentGuide-activeBackground1: var(--rich-gold);
                --vscode-foreground: var(--rich-text);
                --vscode-button-foreground: var(--rich-text);
                --vscode-button-secondaryForeground: var(--rich-text);
            }

            .btn {
                display: flex;
                align-items: center;
                gap: 10px;
                background: var(--rich-btn);
                color: var(--rich-text);
                border: 1px solid var(--rich-border);
                padding: 10px 12px;
                cursor: pointer;
                font-size: 13px;
                font-weight: 500;
                border-radius: var(--radius-md);
                text-align: left;
                width: 100%;
                outline: none;
                transition: all 0.2s cubic-bezier(0.25, 0.8, 0.25, 1);
                box-shadow: var(--shadow-sm);
                box-sizing: border-box;
            }
            
            .btn:hover {
                background-color: var(--rich-blue);
                color: var(--rich-white);
                border-color: var(--rich-blue);
                transform: translateY(-1px);
                box-shadow: 0 4px 8px rgba(0, 51, 102, 0.4);
            }
            
            .btn:active {
                transform: scale(0.98);
            }

            .icon {
                font-size: 15px;
                opacity: 0.9;
            }

            .separator {
                height: 1px;
                background-color: var(--rich-border);
                margin: 12px 4px;
            }

            .copy-btn {
                background: transparent;
                border: none;
                color: var(--rich-text);
                cursor: pointer;
                font-size: 12px;
                opacity: 0.6;
                padding: 4px 6px;
                border-radius: var(--radius-sm);
                transition: all 0.2s ease;
            }
            .copy-btn:hover {
                opacity: 1;
                background-color: rgba(255, 255, 255, 0.1);
            }

            .icon-button {
                background: transparent;
                border: none;
                cursor: pointer;
                color: var(--rich-text);
                padding: 6px;
                border-radius: var(--radius-sm);
                display: inline-flex;
                align-items: center;
                justify-content: center;
                transition: all 0.2s ease;
            }
            .icon-button:hover {
                background: rgba(255, 255, 255, 0.1);
            }
            
            /* Override inline VS Code styles injected in the HTML */
            [style*="var(--vscode-editor-inactiveSelectionBackground)"] {
                background-color: var(--rich-card) !important;
                border: 1px solid var(--rich-border) !important;
                box-shadow: var(--shadow-md) !important;
                border-radius: var(--radius-lg) !important;
                color: var(--rich-text) !important;
                padding: 14px !important;
            }
            
            [style*="var(--vscode-button-background)"] {
                background-color: var(--rich-btn) !important;
                color: var(--rich-text) !important;
                border: 1px solid var(--rich-border) !important;
            }
            
            [style*="var(--vscode-button-background)"]:hover {
                background-color: var(--rich-blue) !important;
                color: var(--rich-white) !important;
                border-color: var(--rich-blue) !important;
            }
            
            [style*="var(--vscode-button-secondaryBackground)"] {
                background-color: var(--rich-btn) !important;
                color: var(--rich-text) !important;
                border: 1px solid var(--rich-border) !important;
            }
            
            [style*="var(--vscode-button-secondaryBackground)"]:hover {
                background-color: var(--rich-blue) !important;
                color: var(--rich-white) !important;
                border-color: var(--rich-blue) !important;
            }

            [style*="var(--vscode-editor-background)"] {
                background-color: var(--rich-card) !important;
                border-color: var(--rich-border) !important;
                color: var(--rich-text) !important;
            }

            [style*="var(--vscode-editorWidget-background)"] {
                background-color: var(--rich-btn) !important;
                border-color: var(--rich-border) !important;
            }

            /* General overrides */
            a {
                color: var(--rich-blue);
            }
            a:hover {
                color: var(--rich-gold);
            }
            
            /* Badges */
            [style*="var(--vscode-charts-green)"] {
                background-color: var(--rich-gold) !important;
                color: var(--rich-bg) !important;
            }
            
            [style*="var(--vscode-badge-background)"] {
                background-color: var(--rich-gold) !important;
                color: var(--rich-bg) !important;
                font-weight: bold;
            }
            
            [style*="var(--vscode-textLink-foreground)"] {
                color: var(--rich-gold) !important;
            }
        </style>
    `;
}

// src/webview/views/conflictView.ts
function renderConflictView(logoUri, conflictState) {
  const styleHtml = getWebviewStyles();
  const filesHtml = (conflictState.files || []).map((f) => `
        <button class="btn" style="padding: 6px; font-size: 12px; display: flex; justify-content: space-between; align-items: center;" onclick="sendOpenFileCommand('${escapeHtml(f.file)}')">
            <span style="flex: 1; overflow: hidden; text-overflow: ellipsis; white-space: nowrap; direction: rtl; text-align: left;">&lrm;${escapeHtml(f.file)}</span>
            <span style="font-size: 10px; opacity: 0.8; flex-shrink: 0; background-color: var(--vscode-badge-background); color: var(--vscode-badge-foreground); padding: 2px 4px; border-radius: 2px;">${escapeHtml(f.state)}</span>
        </button>
    `).join("");
  return `<!DOCTYPE html>
    <html lang="en">
    <head>
        <meta charset="UTF-8">
        <meta name="viewport" content="width=device-width, initial-scale=1.0">
        <title>Ricwiz Conflict</title>
        ${styleHtml}
    </head>
    <body>
        <div style="text-align: center; margin-bottom: 12px; margin-top: 8px;">
            <img src="${logoUri}" alt="Ricwiz Logo" style="width: 80px; height: 80px; opacity: 0.9;" />
        </div>
        <div style="background-color: var(--vscode-editorError-background); color: var(--vscode-editorError-foreground); padding: 12px; border-radius: 4px; margin-bottom: 12px; text-align: center;">
            <div style="font-size: 14px; font-weight: bold; margin-bottom: 8px;">\u26A0 MERGE CONFLICT</div>
            <div style="font-size: 11px; margin-bottom: 12px; opacity: 0.9;">
                Merging <b>${escapeHtml(conflictState.sourceStr)}</b> into <b>${escapeHtml(conflictState.targetStr)}</b>.<br/>
                Resolve the conflicts, then click below.
            </div>
            <div style="display: flex; flex-direction: column; gap: 6px;">
                <button class="btn" style="background-color: var(--vscode-button-background); color: var(--vscode-button-foreground); justify-content: center;" onclick="sendCommand('conflict_commitAndContinue', null, this)">
                    \u2713 Commit & Continue
                </button>
                ${conflictState.deletionsCount > 0 ? `
                    <button class="btn" style="background-color: var(--vscode-button-secondaryBackground); color: var(--vscode-button-secondaryForeground); justify-content: center;" onclick="sendCommand('conflict_resolveDeletions', null, this)">
                        \u2A2F Resolve Deletions (${conflictState.deletionsCount})
                    </button>
                ` : ""}
                <button class="btn" style="background-color: var(--vscode-button-secondaryBackground); color: var(--vscode-button-secondaryForeground); justify-content: center;" onclick="sendCommand('conflict_abortDeploy', null, this)">
                    \u2715 Abort Deploy
                </button>
            </div>
        </div>
        
        ${filesHtml ? `
            <div style="font-size: 11px; opacity: 0.7; margin: 8px 4px 4px 4px; text-transform: uppercase;">Conflicted Files</div>
            <div style="display: flex; flex-direction: column; gap: 2px;">
                ${filesHtml}
            </div>
        ` : ""}

        ${getWebviewScript()}
    </body>
    </html>`;
}

// src/webview/views/blameView.ts
function renderBlameView(data) {
  const styleHtml = getWebviewStyles();
  return `<!DOCTYPE html>
    <html lang="en">
    <head>
        <meta charset="UTF-8">
        <meta name="viewport" content="width=device-width, initial-scale=1.0">
        <title>Ricwiz Blame</title>
        ${styleHtml}
    </head>
    <body>
        <div style="display: flex; align-items: center; gap: 8px; margin-bottom: 16px; margin-top: 8px;">
            <button class="btn" style="width: auto; padding: 4px 8px; background-color: var(--vscode-button-secondaryBackground); color: var(--vscode-button-secondaryForeground);" onclick="sendCommand('openDevTools', null, this)">\u2190 Back</button>
            <div style="font-weight: bold; font-size: 13px; flex: 1; text-align: center;">Who to Blame</div>
        </div>

        ${data ? `
        <div style="padding: 12px; background: var(--vscode-editor-background); border: 1px solid var(--vscode-widget-border); border-radius: 6px; margin-bottom: 12px;">
            <div style="font-weight: bold; margin-bottom: 12px; font-size: 14px; text-align: center; color: var(--vscode-textLink-foreground); word-break: break-all;">
                \u25A4 ${escapeHtml(data.fileName)}
            </div>

            <div style="margin-bottom: 20px;">
                <div style="font-size: 11px; font-weight: bold; opacity: 0.8; text-transform: uppercase; margin-bottom: 8px;"><span class="icon" style="color: #0A84FF;">\u25F3</span> Local Git (Last Commits)</div>
                <ul style="list-style-type: none; padding: 0; margin: 0; display: flex; flex-direction: column; gap: 8px;">
                    ${data.gitHistory && data.gitHistory.length > 0 ? data.gitHistory.map((h) => `
                        <li style="background: var(--vscode-editorWidget-background); border: 1px solid var(--vscode-widget-border); padding: 8px 10px; border-radius: 4px; border-left: 4px solid var(--vscode-gitDecoration-modifiedResourceForeground);">
                            <div style="display: flex; justify-content: space-between; margin-bottom: 4px; align-items: center;">
                                <strong style="font-size: 13px;">${escapeHtml(h.author)}</strong>
                                <span style="opacity: 0.7; font-size: 11px;">${escapeHtml(h.time)}</span>
                            </div>
                            <div style="font-size: 12px; margin-bottom: 6px; opacity: 0.9; font-style: italic;">"${escapeHtml(h.message)}"</div>
                            <div style="font-family: monospace; font-size: 10px; opacity: 0.6;">Commit: ${escapeHtml(h.hash)}</div>
                        </li>
                    `).join("") : '<li style="opacity:0.7; font-size: 12px;">No Git history found.</li>'}
                </ul>
            </div>

            <div style="margin-bottom: 20px;">
                <div style="font-size: 11px; font-weight: bold; opacity: 0.8; text-transform: uppercase; margin-bottom: 8px;"><span class="icon" style="color: #0A84FF;">\u2601</span> Salesforce Metadata</div>
                <div style="display: flex; flex-direction: column; gap: 8px;">
                    <div style="background: var(--vscode-editorWidget-background); border: 1px solid var(--vscode-widget-border); padding: 8px 10px; border-radius: 4px; border-left: 4px solid var(--vscode-gitDecoration-addedResourceForeground);">
                        <div style="font-size: 10px; opacity: 0.7; text-transform: uppercase; margin-bottom: 2px;">Last Modified By</div>
                        <div style="font-weight: bold; font-size: 13px;">${escapeHtml(data.sfAuthor)}</div>
                        <div style="font-size: 11px; opacity: 0.7; margin-top: 2px;">${escapeHtml(data.sfTime)}</div>
                    </div>
                    ${data.sfCreatedBy !== "Unknown" && data.sfCreatedBy !== "N/A" ? `
                    <div style="background: var(--vscode-editorWidget-background); border: 1px solid var(--vscode-widget-border); padding: 8px 10px; border-radius: 4px; border-left: 4px solid var(--vscode-gitDecoration-addedResourceForeground);">
                        <div style="font-size: 10px; opacity: 0.7; text-transform: uppercase; margin-bottom: 2px;">Created By</div>
                        <div style="font-weight: bold; font-size: 13px;">${escapeHtml(data.sfCreatedBy)}</div>
                    </div>
                    ` : ""}
                </div>
            </div>

            <div>
                <div style="font-size: 11px; font-weight: bold; opacity: 0.8; text-transform: uppercase; margin-bottom: 8px;"><span class="icon" style="color: #FFD60A;">\u26B2</span> Setup Audit Trail (Recent)</div>
                <ul style="list-style-type: none; padding: 0; margin: 0; display: flex; flex-direction: column; gap: 8px;">
                    ${data.auditHistory && data.auditHistory.length > 0 ? data.auditHistory.map((a) => `
                        <li style="background: var(--vscode-editorWidget-background); border: 1px solid var(--vscode-widget-border); padding: 8px 10px; border-radius: 4px; border-left: 4px solid var(--vscode-gitDecoration-untrackedResourceForeground);">
                            <div style="display: flex; justify-content: space-between; margin-bottom: 4px; align-items: center;">
                                <strong style="font-size: 13px;">${escapeHtml(a.author)}</strong>
                                <span style="opacity: 0.7; font-size: 11px;">${escapeHtml(a.time)}</span>
                            </div>
                            <div style="font-size: 12px; font-weight: 500; margin-bottom: 4px;">${escapeHtml(a.action)}</div>
                            <div style="font-size: 11px; opacity: 0.7; font-style: italic; background: var(--vscode-editor-background); padding: 4px; border-radius: 3px;">${escapeHtml(a.display)}</div>
                        </li>
                    `).join("") : '<li style="opacity:0.7; font-size: 12px;">No recent setup changes found in Audit Trail.</li>'}
                </ul>
            </div>
        </div>
        ` : `
        <div style="text-align: center; padding: 20px; opacity: 0.7;">
            No blame data available. Make sure you have a file open in the editor.
        </div>
        `}

        ${getWebviewScript()}
    </body>
    </html>`;
}

// src/webview/views/jiraView.ts
function renderJiraView(data) {
  const styleHtml = getWebviewStyles();
  const ticketId = data?.ticketId || "Jira";
  const summary = data?.summary || "No Title";
  const desc = data?.description || "No description provided.";
  const relatedBranches = data?.relatedBranches || [];
  return `<!DOCTYPE html>
    <html lang="en">
    <head>
        <meta charset="UTF-8">
        <meta name="viewport" content="width=device-width, initial-scale=1.0">
        <title>Ricwiz Jira Details</title>
        ${styleHtml}
        <style>
            .jira-title {
                font-size: 16px;
                font-weight: 600;
                margin-bottom: 12px;
                line-height: 1.4;
            }
            .jira-desc {
                font-size: 12px;
                line-height: 1.5;
                opacity: 0.9;
                white-space: pre-wrap;
                background: var(--vscode-editor-background);
                padding: 12px;
                border-radius: 4px;
                border: 1px solid var(--vscode-panel-border);
            }
        </style>
    </head>
    <body>
        <div style="display: flex; align-items: center; gap: 8px; margin-bottom: 16px; margin-top: 8px;">
            <button class="icon-button" onclick="sendCommand('setPage', 'main', this)" style="font-weight: bold; font-size: 16px;" title="Back">\u2B9C</button>
            <span style="font-weight: 600; font-size: 13px;">${escapeHtml(ticketId)} Details</span>
        </div>
        
        <div class="card" style="padding: 16px;">
            <div class="jira-title">${escapeHtml(summary)}</div>
            <div class="jira-desc">${escapeHtml(desc)}</div>
            
            ${relatedBranches.length > 0 ? `
                <div style="margin-top: 16px; border-top: 1px solid var(--vscode-panel-border); padding-top: 12px;">
                    <div style="font-size: 11px; opacity: 0.7; margin-bottom: 8px; text-transform: uppercase; font-weight: bold;"><span class="icon" style="color: #32D74B;">\u2387</span> Related Branches & MRs</div>
                    <div style="display: flex; flex-direction: column; gap: 4px;">
                        ${relatedBranches.map((b) => {
    let pipelineIcon = getPipelineIcon(b.pipelineStatus);
    let pipelineAction = "";
    if (b.pipelineStatus === "failed" && b.projectPath && b.pipelineId) {
      pipelineAction = `onclick="event.stopPropagation(); sendCommand('showPipelineLogs', { projectPath: '${b.projectPath}', pipelineId: ${b.pipelineId} });" style="cursor: pointer;"`;
    }
    return `
                            <div class="btn" style="padding: 6px 10px; font-size: 12px; display: flex; justify-content: space-between; align-items: center; background-color: var(--vscode-button-secondaryBackground); color: var(--vscode-button-secondaryForeground); border-radius: 4px;" onclick="sendCheckoutCommand('${escapeHtml(b.name)}', this)" title="Checkout ${escapeHtml(b.name)}">
                                <div style="display: flex; align-items: center; gap: 6px; overflow: hidden;">
                                    <span style="overflow: hidden; text-overflow: ellipsis; white-space: nowrap; font-weight: bold;">${escapeHtml(b.name)}</span>
                                </div>
                                <div style="display: flex; gap: 6px; align-items: center;">
                                    ${pipelineIcon ? `<span title="Pipeline: ${b.pipelineStatus}" style="font-size: 11px;" ${pipelineAction}>${pipelineIcon}</span>` : ""}
                                    ${b.mrUrl ? `<span onclick="event.stopPropagation(); sendCommand('openExternal', '${b.mrUrl}');" title="Open Merge Request" style="cursor: pointer; font-size: 12px;">\u{1F517}</span>` : ""}
                                    ${b.isMerged ? '<span style="background-color: var(--vscode-charts-green); color: white; border-radius: 3px; padding: 2px 6px; font-size: 10px; font-weight: bold;" title="Merged to target env">MERGED</span>' : ""}
                                </div>
                            </div>
                            `;
  }).join("")}
                    </div>
                </div>
            ` : ""}
            
        <div style="display: flex; gap: 4px; margin-top: 16px;">
            <button class="btn" style="flex: 1; background-color: var(--vscode-button-secondaryBackground); border-radius: 4px;" onclick="sendCommand('changeJiraStatus', null, this)">
                <span class="icon" style="color: #32D74B;">\u27F3</span> Change Status
            </button>
            <button class="btn" style="flex: 1; background-color: var(--vscode-button-secondaryBackground); border-radius: 4px;" onclick="sendCommand('addJiraComment', null, this)">
                <span class="icon" style="color: #64D2FF;">\u2709</span> Add Comment
            </button>
            <button class="btn" style="flex: 1; background-color: var(--vscode-button-secondaryBackground); border-radius: 4px;" onclick="sendCommand('addJiraLabel', null, this)">
                <span class="icon" style="color: #BF5AF2;">\u2637</span> Add Label
            </button>
            ${data?.url ? `
            <button class="btn" style="flex: 1; background-color: var(--vscode-button-secondaryBackground); border-radius: 4px;" onclick="sendCommand('openExternal', '${data.url}', this)">
                <span class="icon" style="color: #0A84FF;">\u2388</span> Open Browser
            </button>
            ` : ""}
        </div>
        </div>

        ${getWebviewScript()}
    </body>
    </html>`;
}

// src/webview/views/dashboardView.ts
function renderDashboardView(props) {
  const { data: rawData, showBranches } = props;
  const styleHtml = getWebviewStyles();
  const data = rawData || { queries: [], selectedIndex: 0, results: [], error: null };
  const queriesHtml = data.queries.map((q, idx) => `
        <option value="${idx}" ${idx === data.selectedIndex ? "selected" : ""}>${escapeHtml(q.name)}</option>
    `).join("");
  const resultsHtml = data.error ? `
        <div style="color: var(--vscode-errorForeground); padding: 12px; text-align: center; background: var(--vscode-editorError-background); border-radius: 4px;">
            \u26A0 ${escapeHtml(data.error)}
        </div>
    ` : data.results.length === 0 ? `
        <div style="padding: 20px; text-align: center; opacity: 0.7;">No tickets found for this query.</div>
    ` : `
        <table style="width: 100%; border-collapse: collapse; font-size: 11px;">
            <thead>
                <tr style="border-bottom: 1px solid var(--vscode-panel-border); opacity: 0.7; text-align: left;">
                    <th style="padding: 6px;">Key</th>
                    <th style="padding: 6px;">Summary</th>
                    <th style="padding: 6px;">Status</th>
                    <th style="padding: 6px; text-align: center;">Branch</th>
                </tr>
            </thead>
            <tbody>
                ${data.results.map((r) => `
                    <tr style="border-bottom: ${r.detailedBranches && r.detailedBranches.length > 0 ? "none" : "1px solid var(--vscode-panel-border)"}; cursor: pointer;" class="tr-hover" onclick="sendCommand('openJiraDetailsForId', '${escapeHtml(r.key)}', this)">
                        <td style="padding: 6px; font-weight: bold; color: var(--vscode-textLink-foreground); white-space: nowrap;">${escapeHtml(r.key)}</td>
                        <td style="padding: 6px; overflow: hidden; text-overflow: ellipsis; max-width: 150px; white-space: nowrap;" title="${escapeHtml(r.summary)}">${escapeHtml(r.summary)}</td>
                        <td style="padding: 6px; white-space: nowrap;">
                            <span style="background: ${getJiraStatusColor(r.status)}; color: white; padding: 2px 4px; border-radius: 3px; font-size: 9px; font-weight: bold; text-transform: uppercase;">${escapeHtml(r.status)}</span>
                        </td>
                        <td style="padding: 6px; white-space: nowrap; text-align: center;">
                            ${r.detailedBranches ? "" : r.branch ? `
                                <button class="icon-button" style="background-color: var(--vscode-button-secondaryBackground); color: var(--vscode-button-secondaryForeground); font-size: 10px; padding: 2px 6px;" title="Checkout ${escapeHtml(r.branch)}" onclick="event.stopPropagation(); sendCommand('checkout', '${escapeHtml(r.branch)}')">
                                    \u2387 Checkout
                                </button>
                            ` : `
                                <button class="icon-button" style="background-color: var(--vscode-button-background); color: var(--vscode-button-foreground); font-size: 10px; padding: 2px 6px;" title="Create Branch for ${escapeHtml(r.key)}" onclick="event.stopPropagation(); sendCommand('createBranchForTicket', '${escapeHtml(r.key)}')">
                                    + Create
                                </button>
                            `}
                        </td>
                    </tr>
                    ${r.detailedBranches && r.detailedBranches.length > 0 ? `
                    <tr style="border-bottom: 1px solid var(--vscode-panel-border);">
                        <td colspan="4" style="padding: 0 6px 8px 6px;">
                            <div style="display: flex; flex-direction: column; gap: 4px; padding-left: 8px; border-left: 2px solid var(--vscode-editorIndentGuide-activeBackground1);">
                                ${r.detailedBranches.map((b) => {
    let pipelineIcon = getPipelineIcon(b.pipelineStatus);
    let pipelineAction = "";
    return `
                                    <div style="display: flex; justify-content: space-between; align-items: center; font-size: 10px; background: var(--vscode-editor-background); padding: 2px 6px; border-radius: 3px;">
                                        <div style="display: flex; align-items: center; gap: 6px; overflow: hidden; cursor: pointer; flex: 1;" onclick="sendCheckoutCommand('${escapeHtml(b.name)}', this)" title="Checkout ${escapeHtml(b.name)}">
                                            <span style="overflow: hidden; text-overflow: ellipsis; white-space: nowrap;">${escapeHtml(b.name)}</span>
                                        </div>
                                        <div style="display: flex; gap: 6px; align-items: center;">
                                            ${b.isMerged ? '<span style="background-color: var(--vscode-charts-green); color: white; border-radius: 3px; padding: 1px 4px; font-size: 8px; font-weight: bold;">MERGED</span>' : ""}
                                            ${pipelineIcon ? `<span title="Pipeline: ${b.pipelineStatus}" ${pipelineAction}>${pipelineIcon}</span>` : ""}
                                            ${b.mrUrl ? `<span onclick="event.stopPropagation(); sendCommand('openExternal', '${b.mrUrl}');" title="Open Merge Request" style="cursor: pointer;">\u{1F517}</span>` : ""}
                                        </div>
                                    </div>
                                    `;
  }).join("")}
                            </div>
                        </td>
                    </tr>
                    ` : ""}
                `).join("")}
            </tbody>
        </table>
    `;
  return `<!DOCTYPE html>
    <html lang="en">
    <head>
        <meta charset="UTF-8">
        <meta name="viewport" content="width=device-width, initial-scale=1.0">
        <title>Ricwiz Ticket Dashboard</title>
        ${styleHtml}
        <style>
            body {
                height: 100vh;
                box-sizing: border-box;
                overflow: hidden;
            }
            .tr-hover:hover {
                background-color: var(--vscode-list-hoverBackground);
            }
            select {
                background-color: var(--vscode-dropdown-background);
                color: var(--vscode-dropdown-foreground);
                border: 1px solid var(--vscode-dropdown-border);
                padding: 4px 8px;
                border-radius: 4px;
                width: 100%;
                font-family: var(--vscode-font-family);
            }
        </style>
    </head>
    <body>
        <div style="display: flex; align-items: center; gap: 8px; margin-bottom: 16px; margin-top: 8px;">
            <button class="icon-button" onclick="sendCommand('setPage', 'main', this)" style="font-weight: bold; font-size: 16px;" title="Back">\u2B9C</button>
            <span style="font-weight: 600; font-size: 13px; flex: 1;">Ticket Dashboard</span>
            <button class="icon-button" onclick="sendCommand('refreshDashboard', null, this)" title="Refresh">\u27F3</button>
        </div>
        
        ${data.queries.length > 0 ? `
        <div style="margin-bottom: 12px;">
            <select id="querySelect" onchange="sendCommand('switchDashboardQuery', this.value)">
                ${queriesHtml}
            </select>
        </div>
        <div style="margin-bottom: 12px; display: flex; align-items: center; gap: 6px;">
            <input type="checkbox" id="showBranchesCheck" ${showBranches ? "checked" : ""} onchange="sendCommand('toggleDashboardBranches', this.checked)" style="margin: 0; cursor: pointer;">
            <label for="showBranchesCheck" style="font-size: 11px; cursor: pointer;">Show all Branches (MRs & Pipelines)</label>
        </div>
        ` : `
        <div style="padding: 12px; opacity: 0.7; text-align: center;">No queries defined in settings.</div>
        `}

        <div style="background: var(--vscode-editor-background); border: 1px solid var(--vscode-panel-border); border-radius: 4px; overflow-x: auto; overflow-y: auto; flex: 1; display: flex; flex-direction: column;">
            ${resultsHtml}
        </div>

        ${getWebviewScript()}
    </body>
    </html>`;
}

// src/webview/views/devtoolsView.ts
function renderDevtoolsView() {
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
            <button class="btn" style="width: auto; padding: 4px 8px; background-color: var(--vscode-button-secondaryBackground); color: var(--vscode-button-secondaryForeground);" onclick="sendCommand('openMain', null, this)">\u2190 Back</button>
            <div style="font-weight: bold; font-size: 13px; flex: 1; text-align: center;">Developer Utilities</div>
        </div>

        <div style="display: flex; flex-direction: column; gap: 8px;">
            <button class="btn" title="Generate Salesforce package.xml from git diff" onclick="sendCommand('generatePackageXml', null, this)">
                <span class="icon" style="color: #FF9F0A;">\u25A2</span> Auto Package.xml
            </button>
            
            <button class="btn" title="Generate destructiveChanges.xml for deleted files" onclick="sendCommand('generateDestructiveChanges', null, this)">
                <span class="icon" style="color: #FF453A;">\u2A2F</span> Auto DestructiveChanges
            </button>

            <button class="btn" title="Deploy the generated package to Salesforce" onclick="sendCommand('deployPackage', null, this)">
                <span class="icon" style="color: #0A84FF;">\u2601</span> Deploy Package
            </button>

            <button class="btn" title="Smart run modified Apex Test classes" onclick="sendCommand('runSmartTests', null, this)">
                <span class="icon" style="color: #BF5AF2;">\u2697</span> Smart Test Runner
            </button>

            <button class="btn" title="Import data using Salesforce CLI" onclick="sendCommand('importData', null, this)">
                <span class="icon" style="color: #64D2FF;">\u21A7</span> Import Data
            </button>

            <div class="separator" style="margin: 4px 0;"></div>

            <button class="btn" title="Find and group all files modified in a specific ticket" onclick="sendCommand('listTicketFiles', null, this)">
                <span class="icon" style="color: #64D2FF;">\u2630</span> List Ticket Files
            </button>

            <button class="btn" title="Reset Salesforce source tracking" onclick="sendCommand('resetTracking', null, this)">
                <span class="icon" style="color: #FF453A;">\u232B</span> Reset Tracking
            </button>

            <button class="btn" title="Extract metadata components quickly from Salesforce" onclick="sendCommand('extractComponent', null, this)">
                <span class="icon" style="color: #0A84FF;">\u2601</span> Extract Component
            </button>

            <button class="btn" title="Deploy the current open file to multiple orgs simultaneously" onclick="sendCommand('deployMultiOrg', null, this)">
                <span class="icon" style="color: #0A84FF;">\u21EA</span> Deploy to Multi-Org
            </button>

            <button class="btn" title="Capture admin changes safely" onclick="sendCommand('captureAdminChanges', null, this)">
                <span class="icon" style="color: #FFD60A;">\u26B2</span> Capture Admin Changes
            </button>
            
            <button class="btn" title="Discover who last modified the current file in Git and Salesforce" onclick="sendCommand('whoToBlame', null, this)" style="background-color: var(--vscode-button-hoverBackground);">
                <span class="icon">\u2315</span> Who to Blame
            </button>
        </div>
        
        ${getWebviewScript()}
    </body>
    </html>`;
}

// src/webview/views/mainView.ts
function renderMainView(props) {
  const {
    logoUri,
    currentBranch,
    currentBranchIsMerged,
    relatedBranches,
    commits,
    baseBranches,
    recentTickets,
    ticketTitle,
    ticketStatus,
    autoRefreshEnabled
  } = props;
  const styleHtml = getWebviewStyles();
  const commitsHtml = commits.length > 0 ? `
        <div class="separator"></div>
        <div style="padding: 0 4px;">
            <div style="font-size: 11px; opacity: 0.7; margin-bottom: 6px; display: flex; align-items: center; gap: 4px;">
                <span>\u2637</span> Recent Commits
            </div>
            <div style="display: flex; flex-direction: column; gap: 2px;">
                ${commits.map((c) => `
                    <div style="font-size: 11px; padding: 3px 4px; border-radius: 2px; display: flex; gap: 6px; align-items: baseline;">
                        <code style="color: var(--vscode-textLink-foreground); font-size: 10px; flex-shrink: 0;">${escapeHtml(c.hash)}</code>
                        <span style="flex: 1; overflow: hidden; text-overflow: ellipsis; white-space: nowrap;" title="${escapeHtml(c.message)}">${escapeHtml(c.message)}</span>
                        <span style="font-size: 9px; opacity: 0.5; flex-shrink: 0;">${escapeHtml(c.timeAgo)}</span>
                    </div>
                `).join("")}
            </div>
        </div>
    ` : "";
  let currentBranchObj = relatedBranches.find((b) => b.name === currentBranch);
  let currentPipelineIcon = "";
  if (currentBranchObj) {
    currentPipelineIcon = getPipelineIcon(currentBranchObj.pipelineStatus);
  }
  let currentMrUrl = currentBranchObj ? currentBranchObj.mrUrl : void 0;
  const sisterBranches = relatedBranches.filter((b) => b.name !== currentBranch);
  const currentBranchHtml = currentBranch ? `
        <div style="background-color: var(--vscode-editor-inactiveSelectionBackground); padding: 10px; border-radius: 6px; margin-bottom: 16px; border: 1px solid var(--vscode-panel-border); box-shadow: 0 2px 4px rgba(0,0,0,0.1); position: relative;">
            ${ticketTitle && ticketStatus ? `
            <div style="position: absolute; top: 6px; right: 6px; z-index: 10; cursor: pointer; font-size: 9px; padding: 2px 6px; border-radius: 18px; background-color: ${getJiraStatusColor(ticketStatus)}; color: white; border: 1px solid var(--vscode-panel-border); opacity: 0.9; font-weight: bold; text-transform: uppercase; display: flex; align-items: center; gap: 4px;" onclick="sendCommand('changeJiraStatus', null, this)" title="Update Jira Status">
                <span>\u270E</span><span>${escapeHtml(ticketStatus)}</span>
            </div>
            ` : ""}
            <div style="font-size: 10px; opacity: 0.7; margin-bottom: 4px; display: flex; align-items: center; justify-content: center; gap: 4px; text-transform: uppercase;">
                <span>Current Ticket / Branch</span>
                <button class="copy-btn" onclick="sendCommand('copyBranch', null, this)" title="Copy branch name to clipboard">\u2398</button>
            </div>
            <div style="font-weight: bold; font-size: 14px; word-break: break-all; text-align: center; color: var(--vscode-textLink-foreground); display: flex; justify-content: center; align-items: center; gap: 6px;">
                <span>${escapeHtml(currentBranch)}</span>
                ${currentPipelineIcon ? `<span title="Pipeline: ${currentBranchObj.pipelineStatus}" style="font-size: 12px;">${currentPipelineIcon}</span>` : ""}
                ${currentMrUrl ? `<span onclick="event.stopPropagation(); sendCommand('openExternal', '${currentMrUrl}');" title="Open Merge Request" style="cursor: pointer; font-size: 12px;">\u{1F517}</span>` : ""}
                ${currentBranchIsMerged ? '<span style="background-color: var(--vscode-charts-green); color: white; border-radius: 3px; padding: 1px 4px; font-size: 10px; font-weight: bold;" title="Merged to target env">MERGED</span>' : ""}
            </div>
            ${ticketTitle ? `<div style="font-size: 12px; margin-top: 6px; text-align: center; opacity: 0.9; font-style: italic;">${escapeHtml(ticketTitle)}</div>` : ""}
            ${sisterBranches.length > 0 ? `
                <div style="margin-top: 10px; border-top: 1px solid var(--vscode-panel-border); padding-top: 10px;">
                    <div style="font-size: 10px; opacity: 0.7; margin-bottom: 6px; text-transform: uppercase; text-align: center;">Sister Branches</div>
                    <div style="display: flex; flex-direction: column; gap: 4px;">
                        ${sisterBranches.map((b) => {
    let pipelineIcon = getPipelineIcon(b.pipelineStatus);
    let pipelineAction = "";
    if (b.pipelineStatus === "failed" && b.projectPath && b.pipelineId) {
      pipelineAction = `onclick="event.stopPropagation(); sendCommand('showPipelineLogs', { projectPath: '${b.projectPath}', pipelineId: ${b.pipelineId} });" style="cursor: pointer;"`;
    }
    return `
                            <div class="btn" style="padding: 6px 8px; font-size: 11px; display: flex; justify-content: space-between; align-items: center; background-color: var(--vscode-button-secondaryBackground); color: var(--vscode-button-secondaryForeground); border-radius: 4px; box-sizing: border-box; width: 100%;" onclick="sendCheckoutCommand('${escapeHtml(b.name)}', this)" title="Checkout ${escapeHtml(b.name)}">
                                <div style="display: flex; align-items: center; gap: 4px; overflow: hidden;">
                                    <span style="overflow: hidden; text-overflow: ellipsis; white-space: nowrap; font-weight: bold;">${escapeHtml(b.name)}</span>
                                </div>
                                <div style="display: flex; gap: 4px; align-items: center;">
                                    ${b.isMerged ? '<span style="background-color: var(--vscode-charts-green); color: white; border-radius: 3px; padding: 1px 4px; font-size: 9px; font-weight: bold;" title="Merged to target env">MERGED</span>' : ""}
                                    ${pipelineIcon ? `<span title="Pipeline: ${b.pipelineStatus}" style="font-size: 10px;" ${pipelineAction}>${pipelineIcon}</span>` : ""}
                                    ${b.mrUrl ? `<span onclick="event.stopPropagation(); sendCommand('openExternal', '${b.mrUrl}');" title="Open Merge Request" style="cursor: pointer; font-size: 10px;">\u{1F517}</span>` : ""}
                                </div>
                            </div>`;
  }).join("")}
                    </div>
                </div>
            ` : recentTickets.length > 0 ? `
                <div style="margin-top: 10px; border-top: 1px solid var(--vscode-panel-border); padding-top: 10px;">
                    <div style="font-size: 10px; opacity: 0.7; margin-bottom: 6px; text-transform: uppercase; text-align: center;">Recent Tickets</div>
                    <div style="display: flex; flex-direction: column; gap: 4px;">
                        ${recentTickets.map((b) => `
                            <div class="btn" style="padding: 6px 8px; font-size: 11px; display: flex; justify-content: space-between; align-items: center; background-color: var(--vscode-button-secondaryBackground); color: var(--vscode-button-secondaryForeground); border-radius: 4px; box-sizing: border-box; width: 100%;" onclick="sendCheckoutCommand('${escapeHtml(b)}', this)" title="Checkout ${escapeHtml(b)}">
                                <span style="font-weight: bold; overflow: hidden; text-overflow: ellipsis; white-space: nowrap;">${escapeHtml(b)}</span>
                            </div>
                        `).join("")}
                    </div>
                </div>
            ` : ""}
            <div style="display: flex; gap: 6px; margin-top: 10px; justify-content: center;">
                <button class="btn" style="width: auto; padding: 4px 10px; font-size: 11px; display: inline-flex; align-items: center; justify-content: center; gap: 5px; background-color: var(--vscode-button-secondaryBackground); border-radius: 4px; border: 1px solid var(--vscode-panel-border); cursor: pointer;" onclick="sendCommand('showJiraDetails', null, this)" title="View Jira Details"><span class="icon" style="font-size: 12px; color: #FF9F0A;">\u2691</span><span>Jira Details</span></button>
                <button class="btn" style="width: auto; padding: 4px 10px; font-size: 11px; display: inline-flex; align-items: center; justify-content: center; gap: 5px; background-color: var(--vscode-button-secondaryBackground); border-radius: 4px; border: 1px solid var(--vscode-panel-border); cursor: pointer;" onclick="sendCommand('openDashboard', null, this)" title="View Ticket Dashboard"><span class="icon" style="font-size: 12px; color: #32D74B;">\u25A4</span><span>Dashboard</span></button>
            </div>
        </div>` : "";
  return `<!DOCTYPE html>
    <html lang="en">
    <head>
        <meta charset="UTF-8">
        <meta name="viewport" content="width=device-width, initial-scale=1.0">
        <title>Ricwiz</title>
        ${styleHtml}
    </head>
    <body>
        <div style="text-align: center; margin-bottom: 12px; margin-top: 8px;">
            <img src="${logoUri}" alt="Ricwiz Logo" style="width: 80px; height: 80px; opacity: 0.9; filter: drop-shadow(0 2px 4px rgba(0,0,0,0.2));" />
        </div>

        <!-- SETTINGS & DEV TOOLS (Top Level) -->
        <div style="display: flex; gap: 8px; margin-bottom: 16px;">
            <button class="btn" style="flex: 1; justify-content: center; background-color: var(--vscode-button-secondaryBackground); border: 1px solid var(--vscode-panel-border); border-radius: 4px;" title="Developer Utilities" onclick="sendCommand('openDevTools', null, this)">
                <span class="icon" style="color: #FFD60A;">\u26B2</span> Dev Tools
            </button>
            <button class="btn" style="flex: 1; justify-content: center; background-color: var(--vscode-button-secondaryBackground); border: 1px solid var(--vscode-panel-border); border-radius: 4px;" title="Extension Settings" onclick="sendCommand('openSettings', null, this)">
                <span class="icon" style="color: #98989D;">\u2699</span> Settings
            </button>
        </div>

        <div style="display: flex; align-items: center; justify-content: space-between; margin-bottom: 6px; padding: 0 4px;">
            <div style="font-size: 11px; font-weight: bold; opacity: 0.8; text-transform: uppercase;">Workspace</div>
            <div style="display: flex; gap: 4px;">
                <button class="copy-btn" onclick="sendCommand('manualRefresh', null, this)" title="Refresh branch status" style="font-size: 13px; padding: 2px 6px; opacity: 0.8; border: 1px solid var(--vscode-panel-border);">
                    <span class="icon" style="color: #32D74B; font-size: 14px;">\u27F3</span>
                </button>
                <button class="copy-btn" id="autoRefreshToggle" onclick="sendCommand('toggleAutoRefresh', null, this)" title="${autoRefreshEnabled ? "Auto-refresh is ON \u2014 click to disable" : "Auto-refresh is OFF \u2014 click to enable"}" style="font-size: 11px; padding: 2px 6px; border-radius: 3px; border: 1px solid var(--vscode-panel-border); ${autoRefreshEnabled ? "opacity: 0.9; background-color: var(--vscode-button-secondaryBackground);" : "opacity: 0.5;"}">
                    ${autoRefreshEnabled ? "\u26A1 Auto" : "\u23F8\uFE0F Auto"}
                </button>
            </div>
        </div>

        ${currentBranchHtml}

        ${baseBranches.length > 0 ? `
            <div style="display: flex; gap: 4px; margin-bottom: 16px; flex-wrap: wrap; justify-content: center;">
                ${baseBranches.map((b) => {
    const displayName = b.split("/").pop()?.toUpperCase() || b.toUpperCase();
    return `
                    <button class="btn" style="flex: 1; min-width: 25%; justify-content: center; padding: 6px 4px; font-size: 10px; font-weight: bold; background-color: var(--vscode-button-secondaryBackground); color: var(--vscode-button-secondaryForeground); border-radius: 4px;" onclick="sendCheckoutCommand('${escapeHtml(b)}', this)" title="Checkout ${escapeHtml(b)}">
                        ${escapeHtml(displayName)}
                    </button>
                `;
  }).join("")}
            </div>
        ` : ""}

        <!-- PRIMARY ACTIONS CARD -->
        <div style="background-color: var(--vscode-editor-inactiveSelectionBackground); padding: 10px; border-radius: 6px; margin-bottom: 16px; border: 1px solid var(--vscode-panel-border); box-shadow: 0 2px 4px rgba(0,0,0,0.1);">
            <div style="font-size: 10px; opacity: 0.7; margin-bottom: 10px; text-transform: uppercase; font-weight: bold; text-align: center;">Ticket Workflow</div>
            
            <button class="btn" style="background-color: var(--vscode-button-background); color: var(--vscode-button-foreground); font-weight: bold; margin-bottom: 6px; border-radius: 4px; padding: 8px;" title="Generates the main and environment branches" onclick="sendCommand('createBranches', null, this)">
                <span class="icon" style="color: #32D74B;">\u2387</span> Create Branches
            </button>

            <button class="btn" style="background-color: var(--vscode-button-secondaryBackground); margin-bottom: 6px; border-radius: 4px;" title="Sync environments and merge ticket" onclick="sendCommand('prepareDeploy', null, this)">
                <span class="icon" style="color: #BF5AF2;">\u2928</span> Prepare Deploy
            </button>

            <div style="display: flex; gap: 4px; margin-bottom: 6px;">
                <button class="btn" style="flex: 1; background-color: var(--vscode-button-secondaryBackground); border-radius: 4px;" title="Opens Merge Request pages in Browser" onclick="sendCommand('openMRs', null, this)">
                    <span class="icon" style="color: #0A84FF;">\u21EA</span> Open MRs
                </button>
                <button class="btn" style="width: auto; padding: 6px 12px; font-weight: bold; justify-content: center; background-color: var(--vscode-button-secondaryBackground); border-radius: 4px;" title="Open MRs in VS Code" onclick="sendCommand('openMRsVSCode', null, this)">
                    VS
                </button>
            </div>

            <button class="btn" style="background-color: var(--vscode-button-secondaryBackground); border-radius: 4px;" title="Open Jira Ticket in Browser" onclick="sendCommand('openJira', null, this)">
                <span class="icon" style="color: #FF9F0A;">\u2691</span> Open Jira
            </button>
        </div>

        <!-- SECONDARY ACTIONS CARD -->
        <div style="background-color: var(--vscode-editor-inactiveSelectionBackground); padding: 10px; border-radius: 6px; margin-bottom: 12px; border: 1px solid var(--vscode-panel-border); box-shadow: 0 2px 4px rgba(0,0,0,0.1);">
            <div style="font-size: 10px; opacity: 0.7; margin-bottom: 10px; text-transform: uppercase; font-weight: bold; text-align: center;">Git Operations</div>
            
            <button class="btn" style="margin-bottom: 6px; background-color: var(--vscode-button-secondaryBackground); border-radius: 4px;" title="Fetch and pull all branches of the current ticket" onclick="sendCommand('syncAll', null, this)">
                <span class="icon" style="color: #32D74B;">\u27F3</span> Sync All
            </button>

            <button class="btn" style="margin-bottom: 6px; background-color: var(--vscode-button-secondaryBackground); border-radius: 4px;" title="Merge latest team changes from origin base into environment branches" onclick="sendCommand('updateBases', null, this)">
                <span class="icon" style="color: #64D2FF;">\u21A7</span> Update from Base
            </button>

            <button class="btn" style="background-color: var(--vscode-button-secondaryBackground); border-radius: 4px;" title="Delete all branches of a ticket (local and remote)" onclick="sendCommand('deleteUnused', null, this)">
                <span class="icon" style="color: #FF453A;">\u2A2F</span> Delete Unused Branches
            </button>
        </div>

        <!-- AI ASSISTANCE CARD -->
        <div style="background-color: var(--vscode-editor-inactiveSelectionBackground); padding: 10px; border-radius: 6px; margin-bottom: 12px; border: 1px solid var(--vscode-panel-border); box-shadow: 0 2px 4px rgba(0,0,0,0.1);">
            <div style="font-size: 10px; opacity: 0.7; margin-bottom: 10px; text-transform: uppercase; font-weight: bold; text-align: center;">AI Assistance</div>
            
            <button class="btn" style="background-color: var(--vscode-button-secondaryBackground); border-radius: 4px;" title="Generate Commit Message with Gemini" onclick="sendCommand('generateCommitMessage', null, this)">
                <span class="icon" style="color: #BF5AF2;">\u2728</span> Generate Commit Message
            </button>
        </div>

        ${commitsHtml}
        
        ${getWebviewScript()}
    </body>
    </html>`;
}

// src/webview.ts
var RicwizWebviewProvider = class {
  constructor(_extensionUri) {
    this._extensionUri = _extensionUri;
  }
  _extensionUri;
  webviewView;
  currentBranchCache = "";
  currentBranchIsMergedCache = false;
  relatedBranchesCache = [];
  commitsCache = [];
  baseBranchesCache = [];
  recentTicketsCache = [];
  ticketTitleCache = "";
  ticketStatusCache = "";
  currentPage = "main";
  blameDataCache = null;
  jiraDataCache = null;
  dashboardDataCache = null;
  dashboardShowBranches = false;
  autoRefreshEnabled = true;
  conflictState = null;
  resolveWebviewView(webviewView, _context, _token) {
    this.webviewView = webviewView;
    webviewView.webview.options = {
      enableScripts: true,
      localResourceRoots: [this._extensionUri]
    };
    this.updateView();
    webviewView.webview.onDidReceiveMessage((data) => {
      switch (data.command) {
        case "createBranches":
          vscode.commands.executeCommand("ricwiz.createBranches");
          break;
        case "createBranchForTicket":
          vscode.commands.executeCommand("ricwiz.createBranches", data.args);
          break;
        case "prepareDeploy":
          vscode.commands.executeCommand("ricwiz.prepareDeploy");
          break;
        case "openMRs":
          vscode.commands.executeCommand("ricwiz.createMergeRequests");
          break;
        case "openMRsVSCode":
          vscode.commands.executeCommand("ricwiz.createMergeRequestsVSCode");
          break;
        case "openExternal":
          if (data.args) {
            vscode.env.openExternal(vscode.Uri.parse(data.args));
          }
          break;
        case "openJira":
          vscode.commands.executeCommand("ricwiz.openJiraTicket");
          break;
        case "showJiraDetails":
          vscode.commands.executeCommand("ricwiz.showJiraDetails");
          break;
        case "showPipelineLogs":
          vscode.commands.executeCommand("ricwiz.showPipelineLogs", data.args.projectPath, data.args.pipelineId);
          break;
        case "changeJiraStatus":
          vscode.commands.executeCommand("ricwiz.changeJiraStatus");
          break;
        case "addJiraComment":
          vscode.commands.executeCommand("ricwiz.addJiraComment");
          break;
        case "addJiraLabel":
          vscode.commands.executeCommand("ricwiz.addJiraLabel");
          break;
        case "setPage":
          this.setPage(data.args);
          break;
        case "openDashboard":
          vscode.commands.executeCommand("ricwiz.openJiraDashboard");
          break;
        case "openJiraDetailsForId":
          vscode.commands.executeCommand("ricwiz.openJiraDetailsForId", data.args);
          break;
        case "refreshDashboard":
          vscode.commands.executeCommand("ricwiz.openJiraDashboard");
          break;
        case "switchDashboardQuery":
          vscode.commands.executeCommand("ricwiz.openJiraDashboard", parseInt(data.args, 10));
          break;
        case "toggleDashboardBranches":
          vscode.commands.executeCommand("ricwiz.toggleDashboardBranches", data.args);
          break;
        case "openJiraVSCode":
          vscode.commands.executeCommand("ricwiz.openJiraTicketVSCode");
          break;
        case "openSettings":
          vscode.commands.executeCommand("ricwiz.openSettings");
          break;
        case "checkout":
          const branchName = data.branch || data.args;
          if (branchName) {
            vscode.commands.executeCommand("ricwiz.checkoutBranch", branchName);
          }
          break;
        case "copyBranch":
          vscode.commands.executeCommand("ricwiz.copyBranchName");
          break;
        case "generatePackageXml":
          vscode.commands.executeCommand("ricwiz.generatePackageXml");
          break;
        case "openDevTools":
          this.setPage("devtools");
          break;
        case "openMain":
          this.setPage("main");
          break;
        case "generateDestructiveChanges":
          vscode.commands.executeCommand("ricwiz.generateDestructiveChanges");
          break;
        case "deployPackage":
          vscode.commands.executeCommand("ricwiz.deployPackage");
          break;
        case "runSmartTests":
          vscode.commands.executeCommand("ricwiz.runSmartTests");
          break;
        case "importData":
          vscode.commands.executeCommand("ricwiz.importData");
          break;
        case "listTicketFiles":
          vscode.commands.executeCommand("ricwiz.listTicketFiles");
          break;
        case "resetTracking":
          vscode.commands.executeCommand("ricwiz.resetTracking");
          break;
        case "extractComponent":
          vscode.commands.executeCommand("ricwiz.extractComponent");
          break;
        case "deployMultiOrg":
          vscode.commands.executeCommand("ricwiz.deployMultiOrg");
          break;
        case "captureAdminChanges":
          vscode.commands.executeCommand("ricwiz.captureAdminChanges");
          break;
        case "whoToBlame":
          vscode.commands.executeCommand("ricwiz.whoToBlame");
          break;
        case "syncAll":
          vscode.commands.executeCommand("ricwiz.syncAll");
          break;
        case "updateBases":
          vscode.commands.executeCommand("ricwiz.updateBases");
          break;
        case "deleteUnused":
          vscode.commands.executeCommand("ricwiz.deleteUnusedBranches");
          break;
        case "conflict_commitAndContinue":
          vscode.commands.executeCommand("ricwiz.conflictAction", "commitAndContinue");
          break;
        case "conflict_resolveDeletions":
          vscode.commands.executeCommand("ricwiz.conflictAction", "resolveDeletions");
          break;
        case "conflict_abortDeploy":
          vscode.commands.executeCommand("ricwiz.conflictAction", "abortDeploy");
          break;
        case "openFile":
          if (data.file) {
            const workspaceFolders = vscode.workspace.workspaceFolders;
            if (workspaceFolders) {
              const uri = vscode.Uri.joinPath(workspaceFolders[0].uri, data.file);
              vscode.commands.executeCommand("vscode.open", uri);
            }
          }
          break;
        case "searchTicket":
          vscode.commands.executeCommand("ricwiz.searchTicket");
          break;
        case "manualRefresh":
          vscode.commands.executeCommand("ricwiz.manualRefresh");
          break;
        case "toggleAutoRefresh":
          vscode.commands.executeCommand("ricwiz.toggleAutoRefresh");
          break;
        case "openHistory":
          vscode.commands.executeCommand("ricwiz.openHistory");
          break;
        case "generateCommitMessage":
          vscode.commands.executeCommand("ricwiz.generateCommitMessage");
          break;
      }
    });
  }
  setConflictState(state) {
    this.conflictState = state;
    this.updateView();
  }
  updateBranch(branchName, isMerged, relatedBranches = [], commits = [], baseBranches = [], recentTickets = [], ticketTitle = "", ticketStatus = "") {
    this.currentBranchCache = branchName;
    this.currentBranchIsMergedCache = isMerged;
    this.relatedBranchesCache = relatedBranches;
    this.commitsCache = commits;
    this.baseBranchesCache = baseBranches;
    this.recentTicketsCache = recentTickets;
    this.ticketTitleCache = ticketTitle;
    this.ticketStatusCache = ticketStatus;
    if (!this.webviewView) return;
    this.updateView();
  }
  setDashboardShowBranches(show) {
    this.dashboardShowBranches = show;
  }
  getDashboardShowBranches() {
    return this.dashboardShowBranches;
  }
  setBlameData(data) {
    this.blameDataCache = data;
  }
  setJiraData(data) {
    this.jiraDataCache = data;
  }
  setDashboardData(data) {
    this.dashboardDataCache = data;
  }
  /** Updates the auto-refresh toggle state and refreshes the view */
  setAutoRefresh(enabled) {
    this.autoRefreshEnabled = enabled;
    this.updateView();
  }
  /** Returns whether auto-refresh is currently enabled */
  isAutoRefreshEnabled() {
    return this.autoRefreshEnabled;
  }
  setPage(page) {
    this.currentPage = page;
    this.updateView();
  }
  updateView() {
    if (!this.webviewView) return;
    const logoUri = this.webviewView.webview.asWebviewUri(
      vscode.Uri.joinPath(this._extensionUri, "resources", "logo.png")
    );
    if (this.conflictState) {
      this.webviewView.webview.html = renderConflictView(logoUri, this.conflictState);
      return;
    }
    switch (this.currentPage) {
      case "blame":
        this.webviewView.webview.html = renderBlameView(this.blameDataCache);
        break;
      case "jira":
        this.webviewView.webview.html = renderJiraView(this.jiraDataCache);
        break;
      case "dashboard":
        this.webviewView.webview.html = renderDashboardView({
          data: this.dashboardDataCache,
          showBranches: this.dashboardShowBranches
        });
        break;
      case "devtools":
        this.webviewView.webview.html = renderDevtoolsView();
        break;
      case "main":
      default:
        this.webviewView.webview.html = renderMainView({
          logoUri,
          currentBranch: this.currentBranchCache,
          currentBranchIsMerged: this.currentBranchIsMergedCache,
          relatedBranches: this.relatedBranchesCache,
          commits: this.commitsCache,
          baseBranches: this.baseBranchesCache,
          recentTickets: this.recentTicketsCache,
          ticketTitle: this.ticketTitleCache,
          ticketStatus: this.ticketStatusCache,
          autoRefreshEnabled: this.autoRefreshEnabled
        });
        break;
    }
  }
};

// src/extension.ts
init_secrets();

// src/commands/index.ts
var vscode37 = __toESM(require("vscode"));

// src/commands/generateDestructiveChanges.ts
var vscode6 = __toESM(require("vscode"));
var path2 = __toESM(require("path"));
var fs2 = __toESM(require("fs"));

// src/git.ts
var vscode4 = __toESM(require("vscode"));
var cp = __toESM(require("child_process"));
var util = __toESM(require("util"));
var promisifiedExec = util.promisify(cp.exec);
var ricwizLogger2 = vscode4.window.createOutputChannel("Ricwiz");
var exec2 = async (command, options) => {
  ricwizLogger2.appendLine(`[EXEC] ${command}`);
  const result = await promisifiedExec(command, { maxBuffer: 50 * 1024 * 1024, ...options });
  return {
    stdout: result.stdout.toString(),
    stderr: result.stderr.toString()
  };
};
function getWorkspaceCwd() {
  const workspaceFolders = vscode4.workspace.workspaceFolders;
  if (!workspaceFolders) {
    return void 0;
  }
  return workspaceFolders[0].uri.fsPath;
}
async function getCurrentBranch(cwd) {
  try {
    const stdout = await new Promise((resolve, reject) => {
      cp.execFile("git", ["branch", "--show-current"], { cwd }, (err, stdout2) => {
        if (err) reject(err);
        else resolve(stdout2);
      });
    });
    return stdout.trim();
  } catch (e) {
    return "";
  }
}
function resolvePrefix(currentBranch, configPrefix) {
  if (!currentBranch.includes(configPrefix)) {
    const guessMatch = currentBranch.match(/([A-Z]+-)\d+/i);
    if (guessMatch) {
      return guessMatch[1].toUpperCase();
    }
  }
  return configPrefix;
}
function extractTicketSuggestion(currentBranch, prefix, handleToSuffix = false) {
  const match = currentBranch.match(new RegExp(`(${prefix}\\d+)`, "i"));
  if (match) {
    return match[1].toUpperCase();
  } else if (currentBranch.includes(prefix) && !currentBranch.includes("-to-")) {
    return currentBranch.substring(currentBranch.indexOf(prefix));
  } else if (handleToSuffix && currentBranch.includes("-to-")) {
    return currentBranch.substring(currentBranch.indexOf(prefix)).split("-to-")[0];
  }
  return "";
}
function normalizeTicketId(input, prefix) {
  const trimmed = sanitizeShellInput(input);
  if (/^\d/.test(trimmed)) {
    return `${prefix}${trimmed}`.toUpperCase();
  }
  return trimmed.toUpperCase();
}
async function promptForTicketId(cwd, options) {
  const config = vscode4.workspace.getConfiguration("ricwiz");
  const configPrefix = options?.prefix ?? config.get("ticketPrefix", "SFPSCA-");
  const currentBranch = await getCurrentBranch(cwd);
  const prefix = resolvePrefix(currentBranch, configPrefix);
  const suggestedTicket = options?.suggestedValue ?? extractTicketSuggestion(currentBranch, prefix, options?.handleToSuffix);
  const input = await vscode4.window.showInputBox({
    prompt: options?.prompt || "Enter the full ticket ID (e.g., SCPSCA-1234) or just the number",
    placeHolder: options?.placeHolder || "Ticket ID or number",
    value: suggestedTicket,
    ignoreFocusOut: true
  });
  if (!input) {
    return void 0;
  }
  const ticketId = normalizeTicketId(input, prefix);
  return { ticketId, currentBranch, prefix };
}
async function checkBranchExists(cwd, branchName) {
  try {
    await exec2(`git show-ref --verify --quiet refs/heads/${branchName}`, { cwd });
    return true;
  } catch (e) {
  }
  return await checkRemoteBranchExists(cwd, branchName);
}
async function checkRemoteBranchExists(cwd, branchName) {
  try {
    const { stdout } = await exec2(`git branch -r --list "*/${branchName}"`, { cwd });
    return stdout.trim().length > 0;
  } catch (e) {
    return false;
  }
}
function sanitizeShellInput(input) {
  return input.replace(/[&|;$><`\\!"'\r\n]/g, "").trim();
}

// src/workflows/WorkflowContext.ts
var vscode5 = __toESM(require("vscode"));
var path = __toESM(require("path"));
var fs = __toESM(require("fs"));
var WorkflowContext = class _WorkflowContext {
  style;
  upstreamRemote;
  originRemote;
  ticketSourceBranch;
  ticketPrefix;
  branchPrefix;
  environments;
  activeProfile;
  profileName;
  constructor(profile) {
    this.activeProfile = profile;
    this.profileName = profile?.name;
    const config = vscode5.workspace.getConfiguration("ricwiz");
    this.style = profile?.workflowStyle || config.get("workflowStyle", "standard");
    if (this.style === "multi-remote") {
      this.upstreamRemote = profile?.upstreamRemote || config.get("upstreamRemote", "salesforce-master");
      this.originRemote = profile?.originRemote || config.get("originRemote", "origin");
    } else {
      this.upstreamRemote = "origin";
      this.originRemote = "origin";
    }
    this.ticketSourceBranch = profile?.ticketSourceBranch || config.get("ticketSourceBranch", "main");
    this.ticketPrefix = profile?.ticketPrefix || config.get("ticketPrefix", "SFPSCA-");
    this.branchPrefix = profile?.branchPrefix ?? config.get("branchPrefix", "");
    const defaultEnv = [
      { name: "Qual", sourceBranch: "quality" },
      { name: "Val", sourceBranch: "validation" },
      { name: "Prod", sourceBranch: "main" }
    ];
    this.environments = profile?.environments || config.get("environments", defaultEnv);
  }
  /**
   * Gets a configuration value, prioritizing the active profile override, then global settings, then default.
   */
  getConfig(key, defaultValue) {
    if (this.activeProfile && this.activeProfile[key] !== void 0) {
      return this.activeProfile[key];
    }
    return vscode5.workspace.getConfiguration("ricwiz").get(key, defaultValue);
  }
  static async initialize(cwd, options) {
    const config = vscode5.workspace.getConfiguration("ricwiz");
    let profiles = config.get("profiles", []);
    const configPath = path.join(cwd, "ricwiz.json");
    if (fs.existsSync(configPath)) {
      try {
        const fileContent = fs.readFileSync(configPath, "utf-8");
        const parsed = JSON.parse(fileContent);
        if (parsed && Array.isArray(parsed.profiles)) {
          profiles = [...profiles, ...parsed.profiles];
        }
      } catch (e) {
        vscode5.window.showErrorMessage(`Ricwiz: Error parsing ricwiz.json: ${e.message}`);
      }
    }
    if (profiles.length > 0) {
      if (!options?.forcePrompt) {
        try {
          const { stdout: branchOut } = await exec2("git branch --show-current", { cwd });
          const currentBranch = branchOut.trim();
          let ticketId = currentBranch;
          if (currentBranch.includes("-to-")) {
            ticketId = currentBranch.split("-to-")[0];
          }
          const { stdout: profileOut } = await exec2(`git config branch.${ticketId}.ricwiz-profile`, { cwd });
          const savedProfileName = profileOut.trim();
          if (savedProfileName) {
            const profile2 = profiles.find((p) => p.name === savedProfileName);
            if (profile2) {
              return new _WorkflowContext(profile2);
            }
          }
        } catch (e) {
        }
      }
      if (options?.skipPrompt) {
        return new _WorkflowContext();
      }
      const items = profiles.map((p) => p.name);
      const selected = await vscode5.window.showQuickPick(items, {
        placeHolder: "Ricwiz: Select Workflow Profile",
        ignoreFocusOut: true
      });
      if (!selected) {
        return void 0;
      }
      const profile = profiles.find((p) => p.name === selected);
      return new _WorkflowContext(profile);
    }
    return new _WorkflowContext();
  }
  buildUpstreamPath(sourceBranch) {
    if (sourceBranch.includes("/")) {
      return sourceBranch;
    }
    return `${this.upstreamRemote}/${sourceBranch}`;
  }
  getFetchRemote(sourceBranch) {
    if (sourceBranch.includes("/")) {
      return sourceBranch.split("/")[0];
    }
    return this.upstreamRemote;
  }
  getFetchBranch(sourceBranch) {
    if (sourceBranch.includes("/")) {
      return sourceBranch.substring(sourceBranch.indexOf("/") + 1);
    }
    return sourceBranch;
  }
};

// src/salesforce/metadata.ts
function parseMetadataFromPath(filePath) {
  const normalized = filePath.replace(/\\/g, "/");
  if (normalized.includes("/classes/")) {
    const match = normalized.match(/\/classes\/([^/.]+)\.cls/);
    if (match) return { type: "ApexClass", name: match[1] };
  }
  if (normalized.includes("/triggers/")) {
    const match = normalized.match(/\/triggers\/([^/.]+)\.trigger/);
    if (match) return { type: "ApexTrigger", name: match[1] };
  }
  if (normalized.includes("/lwc/")) {
    const match = normalized.match(/\/lwc\/([^/]+)\//);
    if (match) return { type: "LightningComponentBundle", name: match[1] };
  }
  if (normalized.includes("/aura/")) {
    const match = normalized.match(/\/aura\/([^/]+)\//);
    if (match) return { type: "AuraDefinitionBundle", name: match[1] };
  }
  if (normalized.includes("/objects/") && normalized.includes("/fields/")) {
    const objMatch = normalized.match(/\/objects\/([^/]+)\//);
    const fieldMatch = normalized.match(/\/fields\/([^/.]+)\.field/);
    if (objMatch && fieldMatch) {
      return { type: "CustomField", name: `${objMatch[1]}.${fieldMatch[1]}` };
    }
  }
  if (normalized.includes("/objects/")) {
    const match = normalized.match(/\/objects\/([^/.]+)\.object/);
    if (match) return { type: "CustomObject", name: match[1] };
  }
  if (normalized.includes("/layouts/")) {
    const match = normalized.match(/\/layouts\/([^/.]+)\.layout/);
    if (match) return { type: "Layout", name: match[1] };
  }
  if (normalized.includes("/flows/")) {
    const match = normalized.match(/\/flows\/([^/.]+)\.flow/);
    if (match) return { type: "Flow", name: match[1] };
  }
  if (normalized.includes("/permissionsets/")) {
    const match = normalized.match(/\/permissionsets\/([^/.]+)\.permissionset/);
    if (match) return { type: "PermissionSet", name: match[1] };
  }
  if (normalized.includes("/permissionsetgroups/")) {
    const match = normalized.match(/\/permissionsetgroups\/([^/.]+)\.permissionsetgroup/);
    if (match) return { type: "PermissionSetGroup", name: match[1] };
  }
  if (normalized.includes("/profiles/")) {
    const match = normalized.match(/\/profiles\/([^/.]+)\.profile/);
    if (match) return { type: "Profile", name: match[1] };
  }
  if (normalized.includes("/customMetadata/")) {
    const match = normalized.match(/\/customMetadata\/([^/.]+)\.md/);
    if (match) return { type: "CustomMetadata", name: match[1] };
  }
  if (normalized.includes("/flexipages/")) {
    const match = normalized.match(/\/flexipages\/([^/.]+)\.flexipage/);
    if (match) return { type: "FlexiPage", name: match[1] };
  }
  return null;
}

// src/commands/generateDestructiveChanges.ts
async function generateDestructiveChanges() {
  const cwd = getWorkspaceCwd();
  if (!cwd) {
    vscode6.window.showErrorMessage("Ricwiz: Open a workspace that is a Git repository.");
    return;
  }
  const ctx = await WorkflowContext.initialize(cwd, { skipPrompt: true });
  const sourceBranch = ctx ? ctx.ticketSourceBranch : vscode6.workspace.getConfiguration("ricwiz").get("ticketSourceBranch", "main");
  const originRemote = ctx ? ctx.originRemote : "origin";
  await vscode6.window.withProgress({
    location: vscode6.ProgressLocation.Notification,
    title: `Ricwiz: Finding deleted files compared to ${originRemote}/${sourceBranch}...`,
    cancellable: false
  }, async () => {
    try {
      const { stdout } = await exec2(`git diff --name-only --diff-filter=D ${originRemote}/${sourceBranch}...HEAD`, { cwd });
      const files = stdout.split("\n").map((f) => f.trim()).filter((f) => f.length > 0);
      if (files.length === 0) {
        vscode6.window.showInformationMessage(`Ricwiz: No deleted files found compared to ${originRemote}/${sourceBranch}.`);
        return;
      }
      const metadataMap = {};
      const addMeta = (type, name) => {
        if (!metadataMap[type]) metadataMap[type] = [];
        if (!metadataMap[type].includes(name)) metadataMap[type].push(name);
      };
      for (const file of files) {
        const meta = parseMetadataFromPath(file);
        if (meta) {
          addMeta(meta.type, meta.name);
        }
      }
      if (Object.keys(metadataMap).length === 0) {
        vscode6.window.showInformationMessage(`Ricwiz: Found deleted files in Git, but none mapped to recognizable Salesforce metadata.`);
        return;
      }
      let xml = `<?xml version="1.0" encoding="UTF-8"?>
<Package xmlns="http://soap.sforce.com/2006/04/metadata">
`;
      for (const type of Object.keys(metadataMap).sort()) {
        xml += `    <types>
`;
        for (const member of metadataMap[type].sort()) {
          xml += `        <members>${member}</members>
`;
        }
        xml += `        <name>${type}</name>
    </types>
`;
      }
      xml += `    <version>58.0</version>
</Package>`;
      const destructiveDir = path2.join(cwd, "destructiveChanges");
      if (!fs2.existsSync(destructiveDir)) {
        fs2.mkdirSync(destructiveDir);
      }
      const outPath = path2.join(destructiveDir, "destructiveChanges.xml");
      const emptyPackagePath = path2.join(destructiveDir, "package.xml");
      fs2.writeFileSync(outPath, xml, "utf8");
      if (!fs2.existsSync(emptyPackagePath)) {
        fs2.writeFileSync(emptyPackagePath, `<?xml version="1.0" encoding="UTF-8"?>
<Package xmlns="http://soap.sforce.com/2006/04/metadata">
    <version>58.0</version>
</Package>`, "utf8");
      }
      const doc = await vscode6.workspace.openTextDocument(outPath);
      await vscode6.window.showTextDocument(doc);
      vscode6.window.showInformationMessage(`Ricwiz: destructiveChanges.xml generated successfully!`);
    } catch (e) {
      vscode6.window.showErrorMessage(`Ricwiz: Error generating destructive changes: ${e.message}`);
    }
  });
}

// src/commands/runSmartTests.ts
var vscode7 = __toESM(require("vscode"));
async function runSmartTests() {
  const cwd = getWorkspaceCwd();
  if (!cwd) return;
  const ctx = await WorkflowContext.initialize(cwd, { skipPrompt: true });
  const sourceBranch = ctx ? ctx.ticketSourceBranch : vscode7.workspace.getConfiguration("ricwiz").get("ticketSourceBranch", "main");
  const originRemote = ctx ? ctx.originRemote : "origin";
  await vscode7.window.withProgress({
    location: vscode7.ProgressLocation.Notification,
    title: "Ricwiz: Finding Apex Tests to run...",
    cancellable: false
  }, async () => {
    try {
      const { stdout } = await exec2(`git diff --name-status ${originRemote}/${sourceBranch}...HEAD`, { cwd });
      const lines = stdout.split("\n").map((l) => l.trim()).filter((l) => l.length > 0);
      const testClassesToRun = /* @__PURE__ */ new Set();
      const modifiedClasses = /* @__PURE__ */ new Set();
      for (const line of lines) {
        const parts = line.split(/\s+/);
        if (parts[0].startsWith("D")) continue;
        const file = parts[1];
        if (!file) continue;
        if (file.endsWith(".cls")) {
          const match = file.match(/\/classes\/([^/.]+)\.cls/);
          if (match) {
            const className = match[1];
            if (className.toLowerCase().endsWith("test")) {
              testClassesToRun.add(className);
            } else {
              modifiedClasses.add(className);
            }
          }
        }
      }
      for (const cls of modifiedClasses) {
        testClassesToRun.add(`${cls}Test`);
      }
      if (testClassesToRun.size === 0) {
        vscode7.window.showInformationMessage(`Ricwiz: No Apex Classes were modified in this branch.`);
        return;
      }
      const items = Array.from(testClassesToRun).map((t) => ({
        label: `$(beaker) ${t}`,
        description: "Apex Test Class"
      }));
      const selection = await vscode7.window.showQuickPick(items, {
        canPickMany: true,
        title: "Select Test Classes to Run",
        placeHolder: "Select tests..."
      });
      if (!selection || selection.length === 0) return;
      const classNames = selection.map((s) => s.label.replace("$(beaker) ", "").trim());
      const command = `sf apex run test -n ${classNames.join(",")} -r human -w 30`;
      const terminal = vscode7.window.createTerminal("Ricwiz: Smart Tests");
      terminal.show();
      terminal.sendText(command);
    } catch (e) {
      vscode7.window.showErrorMessage(`Ricwiz: Error finding tests: ${e.message}`);
    }
  });
}

// src/commands/createBranches.ts
var vscode8 = __toESM(require("vscode"));

// src/security.ts
var Security = class {
  /**
   * Validates if a string is safe to be interpolated directly into shell commands.
   * Prevents Command Injection by allowing only strict alphanumeric patterns, hyphens, underscores, slashes, and dots.
   * Blocks spaces, semicolons, ampersands, pipes, backticks, quotes, and other dangerous characters.
   */
  static isValidShellArg(arg) {
    if (!arg) {
      return false;
    }
    return /^[a-zA-Z0-9\-_/.]+$/.test(arg);
  }
};

// src/commands/createBranches.ts
async function createBranches(prefilledTicket) {
  const cwd = getWorkspaceCwd();
  if (!cwd) {
    vscode8.window.showErrorMessage("Open a folder or workspace that is a Git repository.");
    return;
  }
  const ctx = await WorkflowContext.initialize(cwd, { forcePrompt: true });
  if (!ctx) return;
  const suggestedTicket = typeof prefilledTicket === "string" ? prefilledTicket : void 0;
  const result = await promptForTicketId(cwd, { prefix: ctx.ticketPrefix, suggestedValue: suggestedTicket });
  if (!result) {
    vscode8.window.showErrorMessage("Branch creation cancelled: Ticket not provided.");
    return;
  }
  const { ticketId } = result;
  const environments = ctx.environments;
  let actualBranchPrefix = "";
  if (ctx.branchPrefix) {
    const prefixInput = await vscode8.window.showInputBox({
      prompt: "Ricwiz: Branch Prefix (leave empty to not use a prefix)",
      placeHolder: "e.g. CRC-R19-",
      value: ctx.branchPrefix,
      ignoreFocusOut: true
    });
    if (prefixInput === void 0) {
      vscode8.window.showInformationMessage("Branch creation cancelled.");
      return;
    }
    actualBranchPrefix = prefixInput.trim();
  }
  const mainBranch = actualBranchPrefix ? `${actualBranchPrefix}${ticketId}` : ticketId;
  const pickItems = [
    {
      label: `$(git-branch) Main Branch (${mainBranch})`,
      description: `Base: ${ctx.ticketSourceBranch}`,
      picked: true,
      type: "main",
      branchName: mainBranch
    }
  ];
  for (const env5 of environments) {
    const envBranchName = actualBranchPrefix ? `${actualBranchPrefix}${ticketId}-to-${env5.name}` : `${ticketId}-to-${env5.name}`;
    pickItems.push({
      label: `$(cloud) ${env5.name} (${envBranchName})`,
      description: `Base: ${env5.sourceBranch}`,
      picked: true,
      type: "env",
      branchName: envBranchName,
      envConfig: env5
    });
  }
  const selectedItems = await vscode8.window.showQuickPick(pickItems, {
    placeHolder: "Ricwiz: Select branches to create (check/uncheck as needed)",
    canPickMany: true,
    ignoreFocusOut: true
  });
  if (!selectedItems || selectedItems.length === 0) {
    vscode8.window.showInformationMessage("Branch creation cancelled: No branches selected.");
    return;
  }
  const createMain = selectedItems.some((i) => i.type === "main");
  const selectedEnvs = selectedItems.filter((i) => i.type === "env").map((i) => ({ env: i.envConfig, branchName: i.branchName }));
  let sourceBranchForTicket = ctx.ticketSourceBranch;
  if (createMain) {
    let branches = [];
    try {
      const { stdout } = await exec2(`git branch --all --format="%(refname:short)"`, { cwd });
      branches = stdout.split("\n").map((b) => b.trim()).filter((b) => b && b !== "origin");
      branches = [...new Set(branches)];
    } catch (e) {
    }
    const quickPick = vscode8.window.createQuickPick();
    quickPick.title = `Ricwiz: Base Source Branch for '${mainBranch}'`;
    quickPick.placeholder = "Confirm or change the source branch for this ticket";
    const defaultSourceBranch = branches.find((b) => b.endsWith(`/${ctx.ticketSourceBranch}`)) ?? ctx.ticketSourceBranch;
    quickPick.value = defaultSourceBranch;
    quickPick.ignoreFocusOut = true;
    const updateItems = () => {
      const val = quickPick.value.trim();
      const items = [];
      if (val) {
        items.push({
          label: val,
          description: "Use typed branch"
        });
      }
      items.push(...branches.map((b) => ({ label: b })));
      quickPick.items = items;
    };
    quickPick.onDidChangeValue(updateItems);
    updateItems();
    const userInput = await new Promise((resolve) => {
      quickPick.onDidAccept(() => {
        const selected = quickPick.selectedItems[0];
        resolve(selected ? selected.label : quickPick.value);
        quickPick.hide();
      });
      quickPick.onDidHide(() => resolve(void 0));
      quickPick.show();
    });
    if (!userInput) {
      vscode8.window.showInformationMessage("Branch creation cancelled.");
      return;
    }
    sourceBranchForTicket = userInput.trim();
  }
  if (createMain && !Security.isValidShellArg(mainBranch)) {
    vscode8.window.showErrorMessage(`Invalid format for ticket ID: ${mainBranch}`);
    return;
  }
  if (createMain && !Security.isValidShellArg(sourceBranchForTicket)) {
    vscode8.window.showErrorMessage(`Invalid format for ticketSourceBranch in settings: ${sourceBranchForTicket}`);
    return;
  }
  for (const item of selectedEnvs) {
    if (!Security.isValidShellArg(item.env.name)) {
      vscode8.window.showErrorMessage(`Invalid format for environment name: ${item.env.name}`);
      return;
    }
    if (!Security.isValidShellArg(item.env.sourceBranch)) {
      vscode8.window.showErrorMessage(`Invalid format for environment sourceBranch: ${item.env.sourceBranch}`);
      return;
    }
  }
  try {
    await exec2("git status", { cwd });
  } catch (e) {
    vscode8.window.showErrorMessage("The opened folder does not appear to be a valid Git repository.");
    return;
  }
  try {
    await vscode8.window.withProgress({
      location: vscode8.ProgressLocation.Notification,
      title: "Ricwiz: Creating Branches",
      cancellable: false
    }, async (progress) => {
      const createdLocalBranches = [];
      progress.report({ message: "Checking remote status (git fetch)...", increment: 10 });
      try {
        await exec2("git fetch", { cwd });
      } catch (e) {
      }
      try {
        if (createMain) {
          progress.report({ message: `Creating main branch ${mainBranch}...`, increment: 15 });
          if (await checkBranchExists(cwd, mainBranch)) {
            vscode8.window.showInformationMessage(`Ricwiz: The branch ${mainBranch} already exists. Skipping creation...`);
            await exec2(`git checkout ${mainBranch}`, { cwd });
          } else {
            try {
              const fetchRemote = ctx.getFetchRemote(sourceBranchForTicket);
              const fetchBranch = ctx.getFetchBranch(sourceBranchForTicket);
              const fullUpstreamPath = ctx.buildUpstreamPath(sourceBranchForTicket);
              await exec2(`git fetch ${fetchRemote} ${fetchBranch}`, { cwd });
              await exec2(`git checkout -b ${mainBranch} ${fullUpstreamPath}`, { cwd });
              createdLocalBranches.push(mainBranch);
            } catch (e) {
              try {
                await exec2(`git checkout -b ${mainBranch} ${sourceBranchForTicket}`, { cwd });
                createdLocalBranches.push(mainBranch);
              } catch (err) {
                throw new Error(`Could not create main branch '${mainBranch}' from '${sourceBranchForTicket}'. Does the source branch exist?`);
              }
            }
          }
          try {
            await exec2(`git config branch.${mainBranch}.ricwiz-source "${sourceBranchForTicket}"`, { cwd });
            if (ctx.profileName) {
              await exec2(`git config branch.${mainBranch}.ricwiz-profile "${ctx.profileName}"`, { cwd });
            }
          } catch (e) {
          }
        }
        if (selectedEnvs.length > 0) {
          const envProgressStep = 50 / (selectedEnvs.length || 1);
          for (const item of selectedEnvs) {
            const envBranchName = item.branchName;
            const sourceBranch = item.env.sourceBranch;
            progress.report({ message: `Processing environment branch ${envBranchName}...`, increment: envProgressStep });
            if (await checkBranchExists(cwd, envBranchName)) {
            } else {
              try {
                const fetchRemote = ctx.getFetchRemote(sourceBranch);
                const fetchBranch = ctx.getFetchBranch(sourceBranch);
                const fullUpstreamPath = ctx.buildUpstreamPath(sourceBranch);
                await exec2(`git fetch ${fetchRemote} ${fetchBranch}`, { cwd });
                await exec2(`git checkout -b ${envBranchName} ${fullUpstreamPath}`, { cwd });
                createdLocalBranches.push(envBranchName);
              } catch (e) {
                try {
                  await exec2(`git checkout -b ${envBranchName} ${sourceBranch}`, { cwd });
                  createdLocalBranches.push(envBranchName);
                } catch (err) {
                  throw new Error(`Could not create environment branch '${envBranchName}' from '${sourceBranch}'. Does the source branch exist?`);
                }
              }
            }
          }
        }
        progress.report({ message: `Publishing branches to ${ctx.originRemote}...`, increment: 15 });
        for (const b of createdLocalBranches) {
          try {
            await exec2(`git push -u ${ctx.originRemote} ${b}`, { cwd });
          } catch (e) {
            vscode8.window.showWarningMessage(`Ricwiz: Branch ${b} was created locally but could not be pushed to ${ctx.originRemote}.`);
          }
        }
        const finalCheckoutBranch = createMain ? mainBranch : selectedEnvs[0]?.branchName || "";
        if (finalCheckoutBranch) {
          progress.report({ message: `Switching to ${finalCheckoutBranch}...`, increment: 10 });
          try {
            await exec2(`git checkout ${finalCheckoutBranch}`, { cwd });
          } catch (e) {
          }
        }
        progress.report({ increment: 100 });
        vscode8.window.showInformationMessage(`Ricwiz: All set! You can start working on your branches! \u{1F680}`);
      } catch (err) {
        vscode8.window.showErrorMessage(`Ricwiz Branch Creation Failed: ${err.message}`);
        if (createdLocalBranches.length > 0) {
          try {
            await exec2(`git checkout ${sourceBranchForTicket}`, { cwd });
          } catch (e) {
          }
          for (const b of createdLocalBranches) {
            try {
              await exec2(`git branch -D ${b}`, { cwd });
            } catch (e) {
            }
          }
          vscode8.window.showWarningMessage(`Ricwiz: Rolled back (deleted) ${createdLocalBranches.length} branch(es) locally due to failure.`);
        }
      }
    });
  } catch (error) {
    vscode8.window.showErrorMessage(`Ricwiz general error: ${error.message}`);
  }
}

// src/commands/prepareDeploy.ts
var vscode11 = __toESM(require("vscode"));

// src/conflictResolver.ts
var vscode9 = __toESM(require("vscode"));
var fs3 = __toESM(require("fs"));
var path3 = __toESM(require("path"));
var activeConflictActionHandler;
function setActiveConflictHandler(handler) {
  activeConflictActionHandler = handler;
}
async function executeConflictAction(action) {
  if (activeConflictActionHandler) {
    await activeConflictActionHandler(action);
  }
}
async function handleMergeConflict(cwd, sourceStr, targetStr, progress, token) {
  if (progress) {
    progress.report({ message: `CONFLICT! Resolve & click 'Commit & Continue' in Ricwiz panel.` });
  }
  let isResolved = false;
  let abortRequested = false;
  if (token) {
    token.onCancellationRequested(() => {
      abortRequested = true;
    });
  }
  const getDeletionConflicts = async () => {
    try {
      const { stdout } = await exec2("git status --porcelain", { cwd });
      return stdout.split("\n").filter((line) => {
        const state = line.substring(0, 2);
        return ["UD", "DU", "DD", "AU", "UA"].includes(state);
      }).map((line) => line.substring(3).trim());
    } catch (e) {
      return [];
    }
  };
  const getUnmergedFilesData = async () => {
    try {
      const mapState = (state) => {
        if (state === "UU") return "Both Modified";
        if (state === "UD") return "Deleted by them";
        if (state === "DU") return "Deleted by us";
        if (state === "DD") return "Both Deleted";
        if (state === "AA") return "Both Added";
        if (state === "AU") return "Added by us";
        if (state === "UA") return "Added by them";
        return "Conflicted";
      };
      const { stdout } = await exec2("git status --porcelain", { cwd });
      return stdout.split("\n").map((line) => line.trimEnd()).filter((line) => line.length > 2).filter((line) => {
        const state = line.substring(0, 2);
        return ["UU", "AA", "UD", "DU", "AU", "UA", "DD"].includes(state);
      }).map((line) => {
        const stateCode = line.substring(0, 2);
        const file = line.substring(3).trim();
        return { file, state: mapState(stateCode) };
      });
    } catch (e) {
      return [];
    }
  };
  const updateWebviewState = async () => {
    if (isResolved) return;
    const deletions = await getDeletionConflicts();
    const allConflicts = await getUnmergedFilesData();
    if (webviewProvider) {
      webviewProvider.setConflictState({
        isConflict: true,
        sourceStr,
        targetStr,
        deletionsCount: deletions.length,
        files: allConflicts
      });
    }
  };
  setActiveConflictHandler(async (action) => {
    if (action === "abortDeploy") {
      abortRequested = true;
    } else if (action === "resolveDeletions") {
      try {
        const deletions = await getDeletionConflicts();
        const items = deletions.map((file) => ({ label: file }));
        const toDelete = await vscode9.window.showQuickPick(items, {
          canPickMany: true,
          placeHolder: "Select conflicted files to DELETE",
          title: "Ricwiz: Delete Conflicted Files"
        });
        if (toDelete && toDelete.length > 0) {
          for (const item of toDelete) {
            try {
              await exec2(`git rm --force "${item.label}"`, { cwd });
            } catch (e) {
            }
          }
          vscode9.window.showInformationMessage(`Ricwiz: Deleted ${toDelete.length} conflicted file(s).`);
        }
      } catch (e) {
        vscode9.window.showErrorMessage(`Ricwiz: Error. (${e.message})`);
      }
      updateWebviewState();
    } else if (action === "commitAndContinue") {
      try {
        const deletions = await getDeletionConflicts();
        const keptFiles = deletions.filter((file) => fs3.existsSync(path3.join(cwd, file)));
        if (keptFiles.length > 0) {
          const confirm = await vscode9.window.showWarningMessage(
            `Wait! There are ${keptFiles.length} file(s) with deletion conflicts that are still on your disk.

If you commit now, you will KEEP them in the project.

Are you sure you want to KEEP them?`,
            { modal: true },
            "Yes, KEEP them",
            "No, let me DELETE them"
          );
          if (confirm !== "Yes, KEEP them") {
            updateWebviewState();
            return;
          }
        }
        let hasMarkers = false;
        try {
          const { stdout } = await exec2(`git grep -E "^<<<<<<< "`, { cwd });
          if (stdout.trim().length > 0) hasMarkers = true;
        } catch (e) {
        }
        if (hasMarkers) {
          vscode9.window.showErrorMessage("Ricwiz: You still have unresolved conflict markers (<<<<<<<) in your files. Please resolve them first!");
          updateWebviewState();
          return;
        }
        await exec2("git add .", { cwd });
        await exec2("git commit --no-edit", { cwd });
      } catch (e) {
        vscode9.window.showErrorMessage(`Ricwiz: Could not commit automatically. (${e.message})`);
        updateWebviewState();
      }
    }
  });
  updateWebviewState();
  while (true) {
    if (abortRequested) {
      isResolved = true;
      setActiveConflictHandler(void 0);
      webviewProvider?.setConflictState(null);
      try {
        await exec2("git merge --abort", { cwd });
      } catch (err) {
      }
      return false;
    }
    try {
      const { stdout } = await exec2("git status --porcelain", { cwd });
      const hasUnmerged = stdout.split("\n").some((line) => {
        const state = line.substring(0, 2);
        return ["UU", "AA", "UD", "DU", "AU", "UA", "DD"].includes(state);
      });
      const mergeHeadPath = path3.join(cwd, ".git", "MERGE_HEAD");
      const rebaseHeadPath = path3.join(cwd, ".git", "REBASE_HEAD");
      const cherryPickHeadPath = path3.join(cwd, ".git", "CHERRY_PICK_HEAD");
      const isMergeOngoing = hasUnmerged || fs3.existsSync(mergeHeadPath) || fs3.existsSync(rebaseHeadPath) || fs3.existsSync(cherryPickHeadPath);
      if (!isMergeOngoing) {
        isResolved = true;
        setActiveConflictHandler(void 0);
        webviewProvider?.setConflictState(null);
        vscode9.window.showInformationMessage(`Ricwiz: Changes committed!`);
        return true;
      }
    } catch (e) {
    }
    await new Promise((resolve) => setTimeout(resolve, 2e3));
  }
}

// src/gitlabApi.ts
var https = __toESM(require("https"));
var vscode10 = __toESM(require("vscode"));
init_secrets();
async function hasGitlabToken() {
  const token = await getGitlabToken();
  return !!(token && token.trim());
}
async function getGitlabTargets(cwd, ctx) {
  const config = vscode10.workspace.getConfiguration("ricwiz");
  const token = (await getGitlabToken())?.trim();
  if (!token) {
    throw new Error("No GitLab token");
  }
  let webUrlOverride = ctx ? ctx.getConfig("gitlabUrlOverride", "") : config.get("gitlabUrlOverride", "");
  let candidateUrls = [];
  if (webUrlOverride && webUrlOverride.trim() !== "") {
    candidateUrls.push(webUrlOverride.trim());
  } else {
    try {
      const { stdout: remotesOut } = await exec2(`git remote`, { cwd });
      const allRemotes = remotesOut.split("\n").map((r) => r.trim()).filter((r) => r);
      const remotesToTry = [];
      if (ctx && ctx.upstreamRemote && allRemotes.includes(ctx.upstreamRemote)) {
        remotesToTry.push(ctx.upstreamRemote);
      }
      if (ctx && ctx.originRemote && ctx.originRemote !== ctx.upstreamRemote && allRemotes.includes(ctx.originRemote)) {
        remotesToTry.push(ctx.originRemote);
      }
      if (allRemotes.includes("upstream") && !remotesToTry.includes("upstream")) {
        remotesToTry.push("upstream");
      }
      if (allRemotes.includes("origin") && !remotesToTry.includes("origin")) {
        remotesToTry.push("origin");
      }
      if (remotesToTry.length === 0 && allRemotes.length > 0) {
        remotesToTry.push(...allRemotes);
      }
      for (const remote of remotesToTry) {
        try {
          const { stdout } = await exec2(`git remote get-url ${remote}`, { cwd });
          let remoteUrl = stdout.trim();
          if (remoteUrl.endsWith(".git")) remoteUrl = remoteUrl.slice(0, -4);
          if (remoteUrl.startsWith("git@")) {
            remoteUrl = remoteUrl.replace("git@", "").replace(":", "/");
            remoteUrl = `https://${remoteUrl}`;
          }
          candidateUrls.push(remoteUrl);
        } catch (e) {
          ricwizLogger2.appendLine(`[GitLab API] Error getting remote URL for ${remote}: ${e.message}`);
        }
      }
    } catch (e) {
      ricwizLogger2.appendLine(`[GitLab API] Error getting remotes: ${e.message}`);
    }
  }
  if (candidateUrls.length === 0) {
    ricwizLogger2.appendLine(`[GitLab API] No candidate URLs found in getGitlabTargets!`);
    throw new Error("Could not get any remote origin URL.");
  }
  const targets = candidateUrls.map((webUrl) => {
    const urlObj = new URL(webUrl);
    const baseUrl = `${urlObj.protocol}//${urlObj.host}`;
    let path8 = urlObj.pathname;
    if (path8.startsWith("/")) path8 = path8.substring(1);
    if (path8.endsWith("/")) path8 = path8.slice(0, -1);
    if (path8.endsWith(".git")) path8 = path8.slice(0, -4);
    const projectPath = encodeURIComponent(path8);
    return { baseUrl, token, projectPath };
  });
  return targets;
}
var gitlabAgent = new https.Agent({ keepAlive: true, maxSockets: 10 });
async function gitlabRequest(baseUrl, token, method, path8) {
  const url = new URL(`${baseUrl}${path8}`);
  ricwizLogger2.appendLine(`[GitLab API] ${method} ${url.toString()}`);
  return new Promise((resolve, reject) => {
    const req = https.request(url, {
      method,
      timeout: 5e3,
      agent: gitlabAgent,
      headers: {
        "PRIVATE-TOKEN": token,
        "Accept": "application/json"
      }
    }, (res) => {
      let data = "";
      res.on("data", (chunk) => data += chunk);
      res.on("end", () => {
        ricwizLogger2.appendLine(`[GitLab API] Response Code: ${res.statusCode}`);
        if (res.statusCode && res.statusCode >= 400) {
          ricwizLogger2.appendLine(`[GitLab API] Error Data: ${data}`);
          return reject(new Error(`GitLab API error: ${res.statusCode}`));
        }
        if (!data) return resolve({});
        try {
          const json = JSON.parse(data);
          if (Array.isArray(json)) {
            ricwizLogger2.appendLine(`[GitLab API] Returned array with ${json.length} items`);
          } else if (json && typeof json === "object") {
            ricwizLogger2.appendLine(`[GitLab API] Returned object with id ${json.id || json.iid || "unknown"}`);
          }
          resolve(json);
        } catch (err) {
          ricwizLogger2.appendLine(`[GitLab API] Parse Error: ${err.message}`);
          reject(err);
        }
      });
    });
    req.on("timeout", () => {
      req.destroy();
      reject(new Error("GitLab request timed out"));
    });
    req.on("error", (err) => {
      ricwizLogger2.appendLine(`[GitLab API] Request Failed: ${err.message}`);
      reject(err);
    });
    req.end();
  });
}
var mrCache = /* @__PURE__ */ new Map();
var CACHE_TTL = 30 * 1e3;
async function fetchMergeRequestStatus(cwd, sourceBranch, targetBranch, ctx) {
  ricwizLogger2.appendLine(`[GitLab API] fetchMergeRequestStatus called for source: ${sourceBranch}, target: ${targetBranch || "any"}`);
  const cacheKey = `${cwd}:${sourceBranch}:${targetBranch || "any"}`;
  const cached = mrCache.get(cacheKey);
  if (cached && Date.now() - cached.timestamp < CACHE_TTL) {
    return cached.data;
  }
  try {
    const targets = await getGitlabTargets(cwd, ctx);
    let bestStatus = null;
    let bestMrWeight = -1;
    for (const target of targets) {
      try {
        let path8 = `/api/v4/projects/${target.projectPath}/merge_requests?source_branch=${encodeURIComponent(sourceBranch)}&order_by=updated_at&sort=desc`;
        if (targetBranch) {
          path8 += `&target_branch=${encodeURIComponent(targetBranch)}`;
        }
        const mrs = await gitlabRequest(target.baseUrl, target.token, "GET", path8);
        if (mrs && mrs.length > 0) {
          let mr = mrs[0];
          try {
            const detailedMr = await gitlabRequest(target.baseUrl, target.token, "GET", `/api/v4/projects/${target.projectPath}/merge_requests/${mr.iid}`);
            if (detailedMr) {
              mr = detailedMr;
            }
          } catch (e) {
          }
          let pipelineStatus = "none";
          if (mr.head_pipeline && mr.head_pipeline.status) {
            const s = mr.head_pipeline.status;
            if (s === "success" || s === "failed" || s === "canceled" || s === "skipped") {
              pipelineStatus = s;
            } else {
              pipelineStatus = "running";
            }
          }
          const status = {
            isMerged: mr.state === "merged",
            isOpen: mr.state === "opened",
            pipelineStatus,
            webUrl: mr.web_url,
            projectPath: target.projectPath,
            pipelineId: mr.head_pipeline ? mr.head_pipeline.id : void 0
          };
          let weight = 0;
          if (status.isOpen) weight = 2;
          else if (status.isMerged) weight = 1;
          if (weight > bestMrWeight) {
            bestStatus = status;
            bestMrWeight = weight;
          }
        }
      } catch (e) {
        ricwizLogger2.appendLine(`[GitLab API] Error inside target loop: ${e.message}`);
      }
    }
    if (bestStatus) {
      mrCache.set(cacheKey, { data: bestStatus, timestamp: Date.now() });
      return bestStatus;
    }
    for (const target of targets) {
      try {
        const path8 = `/api/v4/projects/${target.projectPath}/pipelines?ref=${encodeURIComponent(sourceBranch)}&order_by=updated_at&sort=desc`;
        const pipelines = await gitlabRequest(target.baseUrl, target.token, "GET", path8);
        if (pipelines && pipelines.length > 0) {
          const p = pipelines[0];
          let pipelineStatus = "none";
          if (p.status) {
            const s = p.status;
            if (s === "success" || s === "failed" || s === "canceled" || s === "skipped") {
              pipelineStatus = s;
            } else {
              pipelineStatus = "running";
            }
          }
          const status = {
            isMerged: false,
            isOpen: false,
            pipelineStatus,
            webUrl: p.web_url,
            projectPath: target.projectPath,
            pipelineId: p.id
          };
          mrCache.set(cacheKey, { data: status, timestamp: Date.now() });
          return status;
        }
      } catch (e) {
      }
    }
    return null;
  } catch (e) {
    ricwizLogger2.appendLine(`[GitLab API] Failed to fetch MR status: ${e.message}`);
    return null;
  }
}

// src/branchStatus.ts
function findMatchingEnv(branch, environments) {
  return environments.find((env5) => branch.endsWith(`-to-${env5.name}`));
}
async function getRelatedBranchesStatus(cwd, branches, _ticketId, environments, ctx) {
  const hasGitlab = await hasGitlabToken();
  const promises = branches.map(async (branch) => {
    const env5 = findMatchingEnv(branch, environments);
    if (hasGitlab) {
      const targetBranch = env5 ? env5.sourceBranch : void 0;
      const mrStatus = await fetchMergeRequestStatus(cwd, branch, targetBranch, ctx);
      if (mrStatus) {
        return {
          name: branch,
          isMerged: mrStatus.isMerged,
          pipelineStatus: mrStatus.pipelineStatus,
          mrUrl: mrStatus.webUrl,
          projectPath: mrStatus.projectPath,
          pipelineId: mrStatus.pipelineId
        };
      }
    } else {
      ricwizLogger2.appendLine(`[GitLab API] Skipping MR check for ${branch} because hasGitlabToken() is false`);
    }
    return { name: branch, isMerged: false, pipelineStatus: "none" };
  });
  return await Promise.all(promises);
}
async function getCurrentBranchMergeStatus(cwd, currentBranch, environments, ctx) {
  const env5 = findMatchingEnv(currentBranch, environments);
  if (!env5) {
    return false;
  }
  if (await hasGitlabToken()) {
    const mrStatus = await fetchMergeRequestStatus(cwd, currentBranch, env5.sourceBranch, ctx);
    if (mrStatus) {
      return mrStatus.isMerged;
    }
  } else {
    ricwizLogger2.appendLine(`[GitLab API] Skipping MR check for current branch ${currentBranch} because hasGitlabToken() is false`);
  }
  return false;
}
async function getRecentCommits(cwd, count = 10) {
  try {
    const { stdout } = await exec2(`git log --oneline -${count} --format="%h|||%s|||%ar"`, { cwd });
    return stdout.split("\n").filter((line) => line.trim()).map((line) => {
      const parts = line.split("|||");
      return {
        hash: parts[0] || "",
        message: parts.length >= 3 ? parts.slice(1, -1).join("|||") : parts[1] || "",
        timeAgo: parts.length >= 3 ? parts[parts.length - 1] : ""
      };
    });
  } catch {
    return [];
  }
}
async function getRecentTickets(cwd, limit = 3) {
  try {
    const { stdout } = await exec2(
      `git for-each-ref --sort=-committerdate --format="%(refname:short)" refs/heads/`,
      { cwd }
    );
    const allBranches = stdout.split("\n").map((b) => b.trim()).filter((b) => b);
    const ticketPattern = /^[A-Z]+-\d+$/i;
    return allBranches.filter((b) => ticketPattern.test(b)).slice(0, limit);
  } catch {
    return [];
  }
}
async function findRelatedBranches(cwd, ticketId, currentBranch) {
  const { stdout } = await exec2(`git branch --all --list "*${ticketId}*"`, { cwd });
  const branches = /* @__PURE__ */ new Set();
  const exactTicketRegex = new RegExp(`${ticketId}(?!\\d)`, "i");
  stdout.split("\n").forEach((b) => {
    let cleanName = b.replace("*", "").trim();
    if (!cleanName) return;
    if (cleanName.startsWith("remotes/")) {
      const parts = cleanName.split("/");
      if (parts.length > 2) {
        cleanName = parts.slice(2).join("/");
      }
    }
    if (cleanName && cleanName !== currentBranch && !cleanName.includes("HEAD") && exactTicketRegex.test(cleanName)) {
      branches.add(cleanName);
    }
  });
  return Array.from(branches);
}
async function resolveExistingBranchName(cwd, ticketId, envName) {
  try {
    const { stdout } = await exec2(`git branch --all --list "*${ticketId}*"`, { cwd });
    const exactTicketRegex = new RegExp(`${ticketId}(?!\\d)`, "i");
    const branches = stdout.split("\n").map((b) => b.replace("*", "").trim().replace(/^remotes\/[^\/]+\//, "")).filter((b) => b && !b.includes("HEAD") && exactTicketRegex.test(b));
    const uniqueBranches = Array.from(new Set(branches));
    if (envName) {
      const suffix = `-to-${envName}`;
      const match = uniqueBranches.find((b) => b.endsWith(suffix));
      if (match) return match;
      return `${ticketId}${suffix}`;
    } else {
      const match = uniqueBranches.find((b) => !b.includes("-to-"));
      if (match) return match;
      return ticketId;
    }
  } catch (e) {
    return envName ? `${ticketId}-to-${envName}` : ticketId;
  }
}

// src/commands/prepareDeploy.ts
async function prepareDeploy() {
  const cwd = getWorkspaceCwd();
  if (!cwd) {
    vscode11.window.showErrorMessage("Ricwiz: Open a folder or workspace that is a Git repository.");
    return;
  }
  try {
    await exec2("git status", { cwd });
  } catch (e) {
    vscode11.window.showErrorMessage("Ricwiz: The opened folder does not appear to be a valid Git repository.");
    return;
  }
  const ctx = await WorkflowContext.initialize(cwd);
  if (!ctx) return;
  const environments = ctx.environments;
  const result = await promptForTicketId(cwd, { prefix: ctx.ticketPrefix });
  if (!result) {
    vscode11.window.showErrorMessage("Operation cancelled: Ticket not provided.");
    return;
  }
  const { ticketId, currentBranch } = result;
  try {
    await exec2("git fetch --all", { cwd });
  } catch (e) {
  }
  const mainBranch = await resolveExistingBranchName(cwd, ticketId);
  if (!await checkBranchExists(cwd, mainBranch)) {
    vscode11.window.showErrorMessage(`Ricwiz: Main branch '${mainBranch}' does not exist! Prepare deploy is only available when a main ticket branch is used.`);
    return;
  }
  const existingEnvBranches = [];
  for (const env5 of environments) {
    const targetBranch = await resolveExistingBranchName(cwd, ticketId, env5.name);
    if (await checkBranchExists(cwd, targetBranch)) {
      existingEnvBranches.push({ env: env5, branchName: targetBranch });
    }
  }
  const isReleaseTicket = existingEnvBranches.length === 0;
  let confirmedReleaseBranch = "";
  if (isReleaseTicket) {
    let candidateSource = "";
    try {
      const { stdout } = await exec2(`git config branch.${mainBranch}.ricwiz-source`, { cwd });
      candidateSource = stdout.trim();
    } catch (e) {
    }
    if (!candidateSource) {
      if (mainBranch.includes(ticketId) && mainBranch !== ticketId) {
        const prefixPart = mainBranch.split(ticketId)[0].replace(/[-_]+$/, "");
        if (prefixPart) candidateSource = prefixPart;
      }
    }
    if (!candidateSource) {
      candidateSource = ctx.ticketSourceBranch || "main";
    }
    const releaseInput = await vscode11.window.showInputBox({
      prompt: `Ricwiz: Confirm or enter the Release branch in '${ctx.originRemote}' to merge into '${mainBranch}'`,
      placeHolder: "e.g. CRC-R19, main, release/v5.0",
      value: candidateSource,
      ignoreFocusOut: true
    });
    if (releaseInput === void 0 || !releaseInput.trim()) {
      vscode11.window.showInformationMessage("Ricwiz: Prepare deploy cancelled.");
      return;
    }
    confirmedReleaseBranch = releaseInput.trim();
    try {
      await exec2(`git config branch.${mainBranch}.ricwiz-source "${confirmedReleaseBranch}"`, { cwd });
    } catch (e) {
    }
  }
  const defaultReviewers = ctx.getConfig("defaultReviewers", "");
  let currentSavedReviewers = "";
  try {
    const { stdout } = await exec2(`git config branch.${mainBranch}.ricwiz-reviewers`, { cwd });
    currentSavedReviewers = stdout.trim();
  } catch (e) {
  }
  if (defaultReviewers.trim()) {
    const reviewerInput = await vscode11.window.showInputBox({
      prompt: "Ricwiz: Reviewers for this deploy (optional, comma-separated)",
      placeHolder: "e.g. @joao, 123456",
      value: currentSavedReviewers || defaultReviewers,
      ignoreFocusOut: true
    });
    if (reviewerInput === void 0) {
      return;
    }
    try {
      if (reviewerInput.trim()) {
        await exec2(`git config branch.${mainBranch}.ricwiz-reviewers "${reviewerInput.trim()}"`, { cwd });
      } else if (currentSavedReviewers) {
        await exec2(`git config --unset branch.${mainBranch}.ricwiz-reviewers`, { cwd });
      }
    } catch (e) {
    }
  }
  await vscode11.window.withProgress({
    location: vscode11.ProgressLocation.Notification,
    title: "Ricwiz: Preparing Deploy",
    cancellable: true
  }, async (progress, token) => {
    let successCount = 0;
    const originalBranch = currentBranch;
    let abortRequested = false;
    token.onCancellationRequested(() => {
      abortRequested = true;
    });
    const performSafeMerge = async (branchToMerge, currentActiveBranch) => {
      try {
        await exec2(`git merge ${branchToMerge}`, { cwd });
      } catch (e) {
        let isConflict = false;
        try {
          const { stdout } = await exec2("git ls-files -u", { cwd });
          if (stdout.trim().length > 0) isConflict = true;
        } catch (err) {
        }
        const errStr = ((e.stdout || "") + (e.stderr || "") + (e.message || "")).toLowerCase();
        if (isConflict || errStr.includes("conflict") || errStr.includes("conflit")) {
          const resolved = await handleMergeConflict(cwd, branchToMerge, currentActiveBranch, progress, token);
          if (!resolved) {
            abortRequested = true;
            throw new Error("Deploy aborted by user.");
          }
        } else {
          throw e;
        }
      }
    };
    if (isReleaseTicket) {
      try {
        progress.report({ message: `Fetching ${confirmedReleaseBranch} from ${ctx.originRemote}...`, increment: 15 });
        await exec2(`git fetch ${ctx.originRemote} ${confirmedReleaseBranch}`, { cwd });
        progress.report({ message: `Switching to ${mainBranch}...`, increment: 15 });
        await exec2(`git checkout ${mainBranch}`, { cwd });
        try {
          await exec2(`git pull ${ctx.originRemote} ${mainBranch}`, { cwd });
        } catch (e) {
        }
        progress.report({ message: `Merging ${ctx.originRemote}/${confirmedReleaseBranch} into ${mainBranch}...`, increment: 35 });
        await performSafeMerge(`${ctx.originRemote}/${confirmedReleaseBranch}`, mainBranch);
        if (abortRequested) return;
        progress.report({ message: `Pushing ${mainBranch} to ${ctx.originRemote}...`, increment: 25 });
        await exec2(`git push ${ctx.originRemote} ${mainBranch}`, { cwd });
        progress.report({ message: "Finishing up...", increment: 10 });
        vscode11.window.showInformationMessage(`Ricwiz: Release branch '${confirmedReleaseBranch}' merged into '${mainBranch}' and pushed to ${ctx.originRemote}! \u{1F680}`);
      } catch (e) {
        if (e.message?.includes("aborted")) {
          vscode11.window.showInformationMessage("Ricwiz: Deploy cancelled.");
        } else {
          vscode11.window.showErrorMessage(`Ricwiz: Failed to prepare release ticket ${mainBranch}. Detail: ${e.message}`);
        }
      }
    } else {
      progress.report({ message: "Syncing remote information...", increment: 10 });
      try {
        const envSyncStep = 10 / (existingEnvBranches.length || 1);
        for (const item of existingEnvBranches) {
          try {
            if (abortRequested) throw new Error("Aborted");
            progress.report({ message: `Fetching ${item.env.sourceBranch}...`, increment: envSyncStep });
            const fetchRemote = ctx.getFetchRemote(item.env.sourceBranch);
            const fetchBranch = ctx.getFetchBranch(item.env.sourceBranch);
            await exec2(`git fetch ${fetchRemote} ${fetchBranch}`, { cwd });
          } catch (e) {
          }
        }
      } catch (e) {
      }
      const processStep = 60 / (existingEnvBranches.length || 1);
      for (const item of existingEnvBranches) {
        if (abortRequested) break;
        const targetBranch = item.branchName;
        const sourceBranch = item.env.sourceBranch;
        try {
          progress.report({ message: `Processing ${targetBranch}...`, increment: processStep / 4 });
          await exec2(`git checkout ${targetBranch}`, { cwd });
          try {
            await exec2(`git pull ${ctx.originRemote} ${targetBranch}`, { cwd });
          } catch (e) {
          }
          progress.report({ message: `Merging ${sourceBranch} into ${targetBranch}...`, increment: processStep / 4 });
          const fetchRemote = ctx.getFetchRemote(sourceBranch);
          const fetchBranch = ctx.getFetchBranch(sourceBranch);
          const fullUpstreamPath = ctx.buildUpstreamPath(sourceBranch);
          await exec2(`git fetch ${fetchRemote} ${fetchBranch}`, { cwd });
          await performSafeMerge(fullUpstreamPath, targetBranch);
          progress.report({ message: `Merging ${mainBranch} into ${targetBranch}...`, increment: processStep / 4 });
          await performSafeMerge(mainBranch, targetBranch);
          if (abortRequested) break;
          progress.report({ message: `Pushing ${targetBranch}...`, increment: processStep / 4 });
          await exec2(`git push ${ctx.originRemote} ${targetBranch}`, { cwd });
          successCount++;
        } catch (e) {
          if (e.message.includes("aborted")) {
            vscode11.window.showInformationMessage("Ricwiz: Deploy cancelled.");
          } else {
            vscode11.window.showErrorMessage(`Ricwiz: Failed to process branch ${targetBranch}. Detail: ${e.message}`);
          }
          return;
        }
      }
      if (!abortRequested) {
        progress.report({ message: "Finishing up...", increment: 10 });
        let targetReturnBranch = originalBranch;
        try {
          await exec2(`git show-ref --verify --quiet refs/heads/${mainBranch}`, { cwd });
          targetReturnBranch = mainBranch;
        } catch (e) {
        }
        try {
          const current = await getCurrentBranch(cwd);
          if (targetReturnBranch && targetReturnBranch !== current) {
            await exec2(`git checkout ${targetReturnBranch}`, { cwd });
            vscode11.window.showInformationMessage(`Ricwiz: Operation complete. Back on branch ${targetReturnBranch}.`);
          } else {
            vscode11.window.showInformationMessage(`Ricwiz: Operation complete.`);
          }
        } catch (e) {
          vscode11.window.showInformationMessage(`Ricwiz: Operation complete.`);
        }
      }
    }
  });
}

// src/commands/mergeRequests.ts
var vscode12 = __toESM(require("vscode"));
async function doCreateMergeRequests(openInVSCode = false) {
  const cwd = getWorkspaceCwd();
  if (!cwd) return;
  const ctx = await WorkflowContext.initialize(cwd);
  if (!ctx) return;
  const result = await promptForTicketId(cwd, {
    prefix: ctx.ticketPrefix,
    prompt: "Enter the full ticket ID for the Merge Requests (e.g., SFPSCA-1234) or just the number"
  });
  if (!result) return;
  const { ticketId } = result;
  const gitlabUrlOverride = ctx.getConfig("gitlabUrlOverride", "");
  let webUrl = "";
  if (gitlabUrlOverride && gitlabUrlOverride.trim() !== "") {
    webUrl = gitlabUrlOverride.trim().replace(/\/+$/, "");
  } else {
    let remoteUrl = "";
    try {
      const targetRemote = ctx.originRemote || "origin";
      const { stdout } = await exec2(`git remote get-url ${targetRemote}`, { cwd });
      remoteUrl = stdout.trim();
    } catch (e) {
      vscode12.window.showErrorMessage("Ricwiz: Could not get the remote origin URL. Please configure the URL manually in the extension settings.");
      return;
    }
    webUrl = remoteUrl;
    if (webUrl.endsWith(".git")) {
      webUrl = webUrl.slice(0, -4);
    }
    if (webUrl.startsWith("git@")) {
      webUrl = webUrl.replace("git@", "").replace(":", "/");
      webUrl = `https://${webUrl}`;
    } else if (webUrl.startsWith("ssh://git@")) {
      webUrl = webUrl.replace("ssh://git@", "https://");
    }
  }
  const mrLinks = [];
  const actualMainBranch = await resolveExistingBranchName(cwd, ticketId);
  const existingEnvBranches = [];
  for (const env5 of ctx.environments) {
    const actualEnvBranch = await resolveExistingBranchName(cwd, ticketId, env5.name);
    if (await checkBranchExists(cwd, actualEnvBranch)) {
      existingEnvBranches.push({
        envName: env5.name,
        source: actualEnvBranch,
        target: env5.sourceBranch
      });
    }
  }
  if (existingEnvBranches.length === 0) {
    let candidateTarget = "";
    try {
      if (actualMainBranch) {
        const { stdout } = await exec2(`git config branch.${actualMainBranch}.ricwiz-source`, { cwd });
        if (stdout.trim()) {
          candidateTarget = stdout.trim();
        }
      }
    } catch (e) {
    }
    if (!candidateTarget) {
      if (actualMainBranch.includes(ticketId) && actualMainBranch !== ticketId) {
        const prefixPart = actualMainBranch.split(ticketId)[0].replace(/[-_]+$/, "");
        if (prefixPart) candidateTarget = prefixPart;
      }
    }
    if (!candidateTarget) {
      candidateTarget = ctx.ticketSourceBranch || "main";
    }
    const targetInput = await vscode12.window.showInputBox({
      prompt: `Ricwiz: Confirm or enter the Target Release branch in GitLab for '${actualMainBranch}'`,
      placeHolder: "e.g. CRC-R19, main, release/v5.0",
      value: candidateTarget,
      ignoreFocusOut: true
    });
    if (targetInput === void 0 || !targetInput.trim()) {
      vscode12.window.showInformationMessage("Ricwiz: Merge request creation cancelled.");
      return;
    }
    const confirmedTarget = targetInput.trim();
    try {
      await exec2(`git config branch.${actualMainBranch}.ricwiz-source "${confirmedTarget}"`, { cwd });
    } catch (e) {
    }
    mrLinks.push({
      source: actualMainBranch,
      target: confirmedTarget
    });
  } else {
    for (const envBranch of existingEnvBranches) {
      mrLinks.push({
        source: envBranch.source,
        target: envBranch.target
      });
    }
  }
  for (const link of mrLinks) {
    const url = `${webUrl}/-/merge_requests/new?merge_request[source_branch]=${encodeURIComponent(link.source)}&merge_request[target_branch]=${encodeURIComponent(link.target)}`;
    if (openInVSCode) {
      vscode12.commands.executeCommand("simpleBrowser.show", url);
    } else {
      vscode12.env.openExternal(vscode12.Uri.parse(url));
    }
  }
  vscode12.window.showInformationMessage(`Ricwiz: Opening ${mrLinks.length} Merge Request(s) in ${openInVSCode ? "VS Code browser" : "external browser"}!`);
}
async function createMergeRequests() {
  return doCreateMergeRequests(false);
}
async function createMergeRequestsVSCode() {
  return doCreateMergeRequests(true);
}

// src/commands/jira.ts
var vscode13 = __toESM(require("vscode"));
async function doOpenJiraTicket(openInVSCode = false) {
  const cwd = getWorkspaceCwd();
  if (!cwd) return;
  const config = vscode13.workspace.getConfiguration("ricwiz");
  const jiraUrl = config.get("jiraUrl", "");
  if (!jiraUrl || jiraUrl.trim() === "") {
    vscode13.window.showErrorMessage("Ricwiz: Jira URL is not configured. Please set it in the extension settings (e.g., https://jira.company.com/browse/).");
    return;
  }
  const currentBranch = await getCurrentBranch(cwd);
  const configPrefix = config.get("ticketPrefix", "SFPSCA-");
  const prefix = resolvePrefix(currentBranch, configPrefix);
  const suggestedTicket = extractTicketSuggestion(currentBranch, prefix, true);
  let finalTicketId = suggestedTicket;
  if (!finalTicketId) {
    const result = await promptForTicketId(cwd, {
      prompt: "Ricwiz could not detect the ticket from the branch name. Enter Jira ticket ID (e.g. SFPSCA-1234)",
      handleToSuffix: true
    });
    if (!result) return;
    finalTicketId = result.ticketId;
  } else {
    finalTicketId = normalizeTicketId(finalTicketId, prefix);
  }
  let url = jiraUrl.trim();
  if (!url.endsWith("/")) {
    url += "/";
  }
  url += finalTicketId;
  if (openInVSCode) {
    vscode13.commands.executeCommand("simpleBrowser.show", url);
  } else {
    vscode13.env.openExternal(vscode13.Uri.parse(url));
  }
  vscode13.window.showInformationMessage(`Ricwiz: Opening Jira Ticket ${finalTicketId} in ${openInVSCode ? "VS Code" : "browser"}!`);
}
async function openJiraTicket() {
  return doOpenJiraTicket(false);
}
async function openJiraTicketVSCode() {
  return doOpenJiraTicket(true);
}

// src/commands/showJiraDetails.ts
var vscode15 = __toESM(require("vscode"));
init_jiraApi();
async function showJiraDetails(webviewProvider2) {
  const cwd = getWorkspaceCwd();
  if (!cwd) return;
  try {
    const ctx = await WorkflowContext.initialize(cwd);
    if (!ctx) return;
    const currentBranch = await getCurrentBranch(cwd);
    const prefix = resolvePrefix(currentBranch, ctx.ticketPrefix);
    let ticketId = extractTicketSuggestion(currentBranch, prefix, true);
    if (!ticketId) {
      ticketId = currentBranch.split("-to-")[0];
    }
    if (!ticketId) {
      vscode15.window.showErrorMessage("Ricwiz: You are not currently on a valid ticket branch.");
      return;
    }
    await vscode15.window.withProgress({
      location: vscode15.ProgressLocation.Notification,
      title: `Fetching details for ${ticketId}...`,
      cancellable: false
    }, async () => {
      const data = await fetchJiraIssue(ticketId);
      if (data) {
        let relatedBranches = [];
        try {
          const environments = ctx.environments || vscode15.workspace.getConfiguration("ricwiz").get("environments", [
            { name: "Qual", sourceBranch: "quality" },
            { name: "Val", sourceBranch: "validation" },
            { name: "Prod", sourceBranch: "main" }
          ]);
          const relatedBranchNames = await findRelatedBranches(cwd, ticketId, "");
          relatedBranches = await getRelatedBranchesStatus(cwd, relatedBranchNames, ticketId, environments, ctx);
        } catch (e) {
        }
        webviewProvider2.setJiraData({ ticketId, relatedBranches, ...data });
        webviewProvider2.setPage("jira");
      } else {
        vscode15.window.showErrorMessage("Ricwiz: No data found for this ticket.");
      }
    });
  } catch (e) {
    if (e.message && e.message.includes("securely configured")) {
      const action = await vscode15.window.showErrorMessage(e.message, "Set Token Now");
      if (action === "Set Token Now") {
        vscode15.commands.executeCommand("ricwiz.setJiraToken");
      }
    } else {
      vscode15.window.showErrorMessage(`Ricwiz Jira Error: ${e.message}`);
    }
  }
}

// src/commands/openDashboard.ts
var vscode16 = __toESM(require("vscode"));
init_jiraApi();
var currentSelectedIndex = 0;
async function openJiraDashboard(webviewProvider2, indexOverride) {
  const config = vscode16.workspace.getConfiguration("ricwiz");
  const queries = config.get("jiraDashboards", []);
  if (indexOverride !== void 0) {
    currentSelectedIndex = indexOverride;
  }
  if (!queries || queries.length === 0) {
    webviewProvider2.setDashboardData({ queries: [], selectedIndex: 0, results: [], error: "No queries defined in settings. Go to Settings > Ricwiz > Jira Dashboards." });
    webviewProvider2.setPage("dashboard");
    return;
  }
  if (currentSelectedIndex >= queries.length) {
    currentSelectedIndex = 0;
  }
  const currentQuery = queries[currentSelectedIndex];
  webviewProvider2.setDashboardData({ queries, selectedIndex: currentSelectedIndex, results: [], error: "\u23F3 Loading tickets..." });
  webviewProvider2.setPage("dashboard");
  try {
    const results = await searchJira(currentQuery.jql);
    const cwd = getWorkspaceCwd();
    let localBranches = [];
    const showAllBranches = webviewProvider2.getDashboardShowBranches();
    if (cwd) {
      try {
        const { stdout } = await exec2("git branch", { cwd });
        localBranches = stdout.split("\n").map((b) => b.replace("*", "").trim()).filter((b) => b);
      } catch (e) {
      }
    }
    let enrichedResults = [];
    if (showAllBranches && cwd) {
      try {
        const ctx = await WorkflowContext.initialize(cwd, { skipPrompt: true });
        const environments = ctx?.environments || config.get("environments", [
          { name: "Qual", sourceBranch: "quality" },
          { name: "Val", sourceBranch: "validation" },
          { name: "Prod", sourceBranch: "main" }
        ]);
        enrichedResults = await Promise.all(results.map(async (r) => {
          const relatedBranchNames = await findRelatedBranches(cwd, r.key, "");
          const detailedBranches = await getRelatedBranchesStatus(cwd, relatedBranchNames, r.key, environments, ctx);
          return {
            ...r,
            detailedBranches
          };
        }));
      } catch (e) {
        enrichedResults = results;
      }
    } else {
      enrichedResults = results.map((r) => {
        const matchingBranch = localBranches.find((b) => b.includes(r.key));
        return {
          ...r,
          branch: matchingBranch || null
        };
      });
    }
    webviewProvider2.setDashboardData({ queries, selectedIndex: currentSelectedIndex, results: enrichedResults, error: null });
    webviewProvider2.setPage("dashboard");
  } catch (e) {
    let msg = e.message;
    if (msg && (msg.includes("ENOTFOUND") || msg.includes("network"))) {
      msg = "No Internet or Invalid URL";
    }
    webviewProvider2.setDashboardData({ queries, selectedIndex: currentSelectedIndex, results: [], error: msg });
    webviewProvider2.setPage("dashboard");
  }
}
async function openJiraDetailsForId(webviewProvider2, ticketId) {
  await vscode16.window.withProgress({
    location: vscode16.ProgressLocation.Notification,
    title: `Fetching details for ${ticketId}...`,
    cancellable: false
  }, async () => {
    try {
      const data = await fetchJiraIssue(ticketId);
      if (data) {
        let relatedBranches = [];
        const cwd = getWorkspaceCwd();
        if (cwd) {
          try {
            const ctx = await WorkflowContext.initialize(cwd, { skipPrompt: true });
            const environments = ctx?.environments || vscode16.workspace.getConfiguration("ricwiz").get("environments", [
              { name: "Qual", sourceBranch: "quality" },
              { name: "Val", sourceBranch: "validation" },
              { name: "Prod", sourceBranch: "main" }
            ]);
            const relatedBranchNames = await findRelatedBranches(cwd, ticketId, "");
            relatedBranches = await getRelatedBranchesStatus(cwd, relatedBranchNames, ticketId, environments, ctx);
          } catch (e) {
          }
        }
        webviewProvider2.setJiraData({ ticketId, relatedBranches, ...data });
        webviewProvider2.setPage("jira");
      } else {
        vscode16.window.showErrorMessage(`Ricwiz: No data found for ticket ${ticketId}.`);
      }
    } catch (e) {
      vscode16.window.showErrorMessage(`Ricwiz Jira Error: ${e.message}`);
    }
  });
}

// src/commands/jiraOperations.ts
var vscode17 = __toESM(require("vscode"));
init_jiraApi();
init_secrets();
async function getTicketId() {
  const cwd = getWorkspaceCwd();
  if (!cwd) return;
  const ctx = await WorkflowContext.initialize(cwd, { forcePrompt: false });
  if (!ctx) return;
  const currentBranch = await getCurrentBranch(cwd);
  if (!currentBranch) return;
  const prefix = resolvePrefix(currentBranch, ctx.ticketPrefix);
  const match = extractTicketSuggestion(currentBranch, prefix, true);
  if (match) {
    return match;
  }
  return currentBranch.split("-to-")[0];
}
function handleJiraError(e) {
  if (e.message && e.message.includes("securely configured")) {
    vscode17.window.showErrorMessage(e.message, "Set Token Now").then((action) => {
      if (action === "Set Token Now") {
        vscode17.commands.executeCommand("ricwiz.setJiraToken");
      }
    });
  } else {
    vscode17.window.showErrorMessage(`Ricwiz Jira Error: ${e.message}`);
  }
}
async function changeJiraStatus() {
  try {
    const ticketId = await getTicketId();
    if (!ticketId) {
      vscode17.window.showErrorMessage("Ricwiz: You are not on a valid ticket branch.");
      return;
    }
    const transitions = await vscode17.window.withProgress({
      location: vscode17.ProgressLocation.Notification,
      title: `Fetching available status for ${ticketId}...`,
      cancellable: false
    }, () => fetchJiraTransitions(ticketId));
    if (!transitions || transitions.length === 0) {
      vscode17.window.showInformationMessage(`Ricwiz: No transitions available for ${ticketId}.`);
      return;
    }
    const items = transitions.map((t) => ({ label: t.name, id: t.id }));
    const selected = await vscode17.window.showQuickPick(items, {
      placeHolder: `Select new status for ${ticketId}`,
      ignoreFocusOut: true
    });
    if (selected) {
      await vscode17.window.withProgress({
        location: vscode17.ProgressLocation.Notification,
        title: `Updating status to ${selected.label}...`,
        cancellable: false
      }, () => transitionJiraIssue(ticketId, selected.id));
      vscode17.window.showInformationMessage(`Ricwiz: Status for ${ticketId} updated to ${selected.label}.`);
    }
  } catch (e) {
    handleJiraError(e);
  }
}
async function addJiraCommentCommand() {
  try {
    const ticketId = await getTicketId();
    if (!ticketId) {
      vscode17.window.showErrorMessage("Ricwiz: You are not on a valid ticket branch.");
      return;
    }
    const comment = await vscode17.window.showInputBox({
      prompt: `Add comment to ${ticketId}`,
      placeHolder: "Type your comment here...",
      ignoreFocusOut: true
    });
    if (comment) {
      await vscode17.window.withProgress({
        location: vscode17.ProgressLocation.Notification,
        title: `Adding comment to ${ticketId}...`,
        cancellable: false
      }, () => addJiraComment(ticketId, comment));
      vscode17.window.showInformationMessage(`Ricwiz: Comment added to ${ticketId}.`);
    }
  } catch (e) {
    handleJiraError(e);
  }
}
async function addJiraLabelCommand() {
  try {
    const ticketId = await getTicketId();
    if (!ticketId) {
      vscode17.window.showErrorMessage("Ricwiz: You are not on a valid ticket branch.");
      return;
    }
    const label = await vscode17.window.showInputBox({
      prompt: `Add a label to ${ticketId}`,
      placeHolder: "e.g. Needs-Review, Bug, High-Priority",
      ignoreFocusOut: true
    });
    if (label && label.trim()) {
      await vscode17.window.withProgress({
        location: vscode17.ProgressLocation.Notification,
        title: `Adding label to ${ticketId}...`,
        cancellable: false
      }, () => addJiraLabel(ticketId, label.trim()));
      vscode17.window.showInformationMessage(`Ricwiz: Label '${label.trim()}' added to ${ticketId}.`);
    }
  } catch (e) {
    handleJiraError(e);
  }
}
async function setJiraTokenCommand() {
  const token = await vscode17.window.showInputBox({
    prompt: "Enter your Jira API Token (or Personal Access Token). It will be stored in your global VS Code settings.",
    password: true,
    ignoreFocusOut: true
  });
  if (token) {
    try {
      await storeJiraToken(token.trim());
      vscode17.window.showInformationMessage("Ricwiz: Jira API Token securely stored!");
    } catch (e) {
      vscode17.window.showErrorMessage(`Ricwiz: Failed to store token: ${e.message}`);
    }
  }
}

// src/commands/gitlabOperations.ts
var vscode18 = __toESM(require("vscode"));
var https3 = __toESM(require("https"));
init_secrets();
async function setGitlabTokenCommand() {
  const token = await vscode18.window.showInputBox({
    prompt: "Enter your GitLab Personal Access Token",
    placeHolder: "glpat-xxxxxxxxxxxxxxxxxxxx",
    ignoreFocusOut: true,
    password: true
  });
  if (token && token.trim()) {
    const cleanToken = token.trim();
    await vscode18.window.withProgress({
      location: vscode18.ProgressLocation.Notification,
      title: "Ricwiz: Validating GitLab Token...",
      cancellable: false
    }, async () => {
      try {
        const config = vscode18.workspace.getConfiguration("ricwiz");
        let webUrl = config.get("gitlabUrlOverride", "").trim();
        if (!webUrl && vscode18.workspace.workspaceFolders) {
          try {
            const cwd = vscode18.workspace.workspaceFolders[0].uri.fsPath;
            const { stdout } = await exec2("git remote get-url origin", { cwd });
            let remoteUrl = stdout.trim();
            if (remoteUrl.startsWith("git@")) remoteUrl = `https://${remoteUrl.replace("git@", "").replace(":", "/")}`;
            if (remoteUrl.endsWith(".git")) remoteUrl = remoteUrl.slice(0, -4);
            webUrl = remoteUrl;
          } catch (e) {
          }
        }
        if (!webUrl) {
          webUrl = "https://gitlab.com";
        }
        const urlObj = new URL(webUrl);
        const baseUrl = `${urlObj.protocol}//${urlObj.host}`;
        const user = await new Promise((resolve, reject) => {
          const req = https3.request(new URL(`${baseUrl}/api/v4/user`), {
            method: "GET",
            timeout: 5e3,
            headers: { "PRIVATE-TOKEN": cleanToken, "Accept": "application/json" }
          }, (res) => {
            if (res.statusCode >= 400) return reject(new Error(`Status ${res.statusCode}`));
            let data = "";
            res.on("data", (c) => data += c);
            res.on("end", () => resolve(JSON.parse(data || "{}")));
          });
          req.on("error", reject);
          req.on("timeout", () => {
            req.destroy();
            reject(new Error("Timeout"));
          });
          req.end();
        });
        await storeGitlabToken(cleanToken);
        vscode18.window.showInformationMessage(`Ricwiz: \u2705 GitLab API Token saved and validated successfully for ${user.username || "user"}!`);
        vscode18.commands.executeCommand("ricwiz.manualRefresh");
      } catch (error) {
        vscode18.window.showErrorMessage(`Ricwiz: \u274C Invalid token or cannot reach GitLab (${error.message}). Please check the token and try again.`);
      }
    });
  }
}

// src/commands/syncAll.ts
var vscode19 = __toESM(require("vscode"));
async function syncAll() {
  const cwd = getWorkspaceCwd();
  if (!cwd) {
    vscode19.window.showErrorMessage("Ricwiz: Open a folder or workspace that is a Git repository.");
    return;
  }
  const ctx = await WorkflowContext.initialize(cwd);
  if (!ctx) return;
  const result = await promptForTicketId(cwd, {
    prefix: ctx.ticketPrefix,
    prompt: "Enter the full ticket ID to sync all branches for (e.g., SCPSCA-1234) or just the number"
  });
  if (!result) return;
  const { ticketId, currentBranch } = result;
  await vscode19.window.withProgress({
    location: vscode19.ProgressLocation.Notification,
    title: `Ricwiz: Syncing all branches for ${ticketId}...`,
    cancellable: false
  }, async (progress) => {
    try {
      progress.report({ message: "Fetching from remote..." });
      try {
        await exec2("git fetch --all", { cwd });
      } catch (e) {
      }
      const { stdout } = await exec2(`git branch --list "*${ticketId}*"`, { cwd });
      const exactTicketRegex = new RegExp(`${ticketId}(?!\\d)`, "i");
      const branches = stdout.split("\n").map((b) => b.replace("*", "").trim()).filter((b) => b.length > 0 && exactTicketRegex.test(b));
      if (branches.length === 0) {
        vscode19.window.showWarningMessage(`Ricwiz: No local branches found for ${ticketId}.`);
        return;
      }
      let synced = 0;
      let failed = 0;
      for (const branch of branches) {
        progress.report({ message: `Syncing ${branch}...` });
        if (branch === currentBranch) {
          try {
            await exec2(`git pull ${ctx.originRemote} ${branch}`, { cwd });
            synced++;
          } catch (e) {
            let isConflict = false;
            try {
              const { stdout: lsOut } = await exec2("git ls-files -u", { cwd });
              if (lsOut.trim().length > 0) isConflict = true;
            } catch (err) {
            }
            const errStr = ((e.stdout || "") + (e.stderr || "") + (e.message || "")).toLowerCase();
            if (isConflict || errStr.includes("conflict") || errStr.includes("conflit")) {
              const resolved = await handleMergeConflict(cwd, `${ctx.originRemote}/${branch}`, branch, progress);
              if (resolved) {
                synced++;
              } else {
                failed++;
              }
            } else {
              failed++;
            }
          }
        } else {
          try {
            await exec2(`git fetch ${ctx.originRemote} ${branch}:${branch}`, { cwd });
            synced++;
          } catch (e) {
            try {
              await exec2(`git checkout ${branch}`, { cwd });
              try {
                await exec2(`git pull ${ctx.originRemote} ${branch}`, { cwd });
                synced++;
              } catch (errPull) {
                let isConflict = false;
                try {
                  const { stdout: lsOut } = await exec2("git ls-files -u", { cwd });
                  if (lsOut.trim().length > 0) isConflict = true;
                } catch (err) {
                }
                const errStr = ((errPull.stdout || "") + (errPull.stderr || "") + (errPull.message || "")).toLowerCase();
                if (isConflict || errStr.includes("conflict") || errStr.includes("conflit")) {
                  const resolved = await handleMergeConflict(cwd, `${ctx.originRemote}/${branch}`, branch, progress);
                  if (resolved) {
                    synced++;
                  } else {
                    failed++;
                  }
                } else {
                  failed++;
                }
              }
              await exec2(`git checkout ${currentBranch}`, { cwd });
            } catch (e2) {
              try {
                await exec2(`git checkout ${currentBranch}`, { cwd });
              } catch (e3) {
              }
              failed++;
            }
          }
        }
      }
      if (failed > 0) {
        vscode19.window.showWarningMessage(`Ricwiz: Synced ${synced}/${branches.length} branches. ${failed} branch(es) could not be synced (possible conflicts or diverged history).`);
      } else {
        vscode19.window.showInformationMessage(`Ricwiz: \u{1F504} All ${synced} branches for ${ticketId} are up to date!`);
      }
    } catch (e) {
      vscode19.window.showErrorMessage(`Ricwiz: Sync failed: ${e.message}`);
    }
  });
}

// src/commands/updateBases.ts
var vscode20 = __toESM(require("vscode"));
async function updateBases() {
  const cwd = getWorkspaceCwd();
  if (!cwd) {
    vscode20.window.showErrorMessage("Ricwiz: Open a folder or workspace that is a Git repository.");
    return;
  }
  try {
    await exec2("git status", { cwd });
  } catch (e) {
    vscode20.window.showErrorMessage("Ricwiz: The opened folder does not appear to be a valid Git repository.");
    return;
  }
  const ctx = await WorkflowContext.initialize(cwd);
  if (!ctx) return;
  const environments = ctx.environments;
  const result = await promptForTicketId(cwd, { prefix: ctx.ticketPrefix });
  if (!result) {
    return;
  }
  const { ticketId, currentBranch } = result;
  await vscode20.window.withProgress({
    location: vscode20.ProgressLocation.Notification,
    title: "Ricwiz: Updating environment branches from their bases",
    cancellable: true
  }, async (progress, token) => {
    let successCount = 0;
    const originalBranch = currentBranch;
    let abortRequested = false;
    token.onCancellationRequested(() => {
      abortRequested = true;
    });
    progress.report({ message: "Syncing remote information...", increment: 10 });
    try {
      await exec2("git fetch --all", { cwd });
    } catch (e) {
    }
    const processStep = 80 / (environments.length || 1);
    for (const env5 of environments) {
      if (abortRequested) break;
      const targetBranch = await resolveExistingBranchName(cwd, ticketId, env5.name);
      const sourceBranch = env5.sourceBranch;
      if (!await checkBranchExists(cwd, targetBranch)) {
        continue;
      }
      try {
        progress.report({ message: `Processing ${targetBranch}...`, increment: processStep / 2 });
        await exec2(`git checkout ${targetBranch}`, { cwd });
        try {
          progress.report({ message: `Merging ${sourceBranch} into ${targetBranch}...`, increment: processStep / 2 });
          const fetchRemote = ctx.getFetchRemote(sourceBranch);
          const fetchBranch = ctx.getFetchBranch(sourceBranch);
          const fullUpstreamPath = ctx.buildUpstreamPath(sourceBranch);
          await exec2(`git fetch ${fetchRemote} ${fetchBranch}`, { cwd });
          await exec2(`git merge ${fullUpstreamPath}`, { cwd });
        } catch (e) {
          let isConflict = false;
          try {
            const { stdout } = await exec2("git ls-files -u", { cwd });
            if (stdout.trim().length > 0) isConflict = true;
          } catch (err) {
          }
          const errStr = ((e.stdout || "") + (e.stderr || "") + (e.message || "")).toLowerCase();
          if (isConflict || errStr.includes("conflict") || errStr.includes("conflit")) {
            const fullUpstreamPath = ctx.buildUpstreamPath(sourceBranch);
            const resolved = await handleMergeConflict(cwd, fullUpstreamPath, targetBranch, progress, token);
            if (!resolved) {
              abortRequested = true;
              throw new Error("Update aborted by user.");
            }
          } else {
            throw e;
          }
        }
        if (abortRequested) break;
        successCount++;
      } catch (e) {
        if (e.message.includes("aborted")) {
          vscode20.window.showInformationMessage("Ricwiz: Update cancelled.");
        } else {
          vscode20.window.showErrorMessage(`Ricwiz: Failed to update branch ${targetBranch}. Detail: ${e.message}`);
        }
        return;
      }
    }
    if (!abortRequested) {
      progress.report({ message: "Finishing up...", increment: 10 });
      try {
        const current = await getCurrentBranch(cwd);
        if (originalBranch && originalBranch !== current) {
          await exec2(`git checkout ${originalBranch}`, { cwd });
        }
      } catch (e) {
      }
      vscode20.window.showInformationMessage(`Ricwiz: Successfully updated ${successCount} environment branches from their bases!`);
    }
  });
}

// src/commands/deleteUnused.ts
var vscode21 = __toESM(require("vscode"));
async function deleteUnusedBranches() {
  const cwd = getWorkspaceCwd();
  if (!cwd) {
    vscode21.window.showErrorMessage("Ricwiz: Open a folder or workspace that is a Git repository.");
    return;
  }
  let currentBranch = await getCurrentBranch(cwd);
  const config = vscode21.workspace.getConfiguration("ricwiz");
  await vscode21.window.withProgress({
    location: vscode21.ProgressLocation.Notification,
    title: `Ricwiz: Scanning for unused local branches...`,
    cancellable: false
  }, async () => {
    try {
      await exec2("git fetch --prune", { cwd });
    } catch (e) {
    }
    let localBranches = [];
    try {
      const { stdout } = await exec2(`git branch --format="%(refname:short)"`, { cwd });
      localBranches = stdout.split("\n").map((b) => b.trim()).filter((b) => b.length > 0);
    } catch (e) {
    }
    if (localBranches.length === 0) {
      vscode21.window.showInformationMessage(`Ricwiz: No local branches found.`);
      return;
    }
    let remoteBranchNames = [];
    try {
      const { stdout } = await exec2(`git branch -r --format="%(refname:short)"`, { cwd });
      remoteBranchNames = stdout.split("\n").map((b) => b.trim().replace(/^[^/]+\//, "")).filter((b) => b.length > 0 && !b.includes("HEAD"));
    } catch (e) {
    }
    let goneBranches = [];
    try {
      const { stdout } = await exec2(`git for-each-ref --format="%(refname:short)|||%(upstream:track)" refs/heads/`, { cwd });
      goneBranches = stdout.split("\n").filter((line) => line.includes("[gone]")).map((line) => line.split("|||")[0].trim());
    } catch (e) {
    }
    const orphanedBranches = localBranches.filter((b) => !remoteBranchNames.includes(b));
    if (orphanedBranches.length === 0) {
      vscode21.window.showInformationMessage(`Ricwiz: Your local repository is totally clean! All local branches exist on the remote.`);
      return;
    }
    const items = orphanedBranches.map((name) => {
      const isGone = goneBranches.includes(name);
      const isCurrent = name === currentBranch;
      let description = "Not found on remote";
      if (isGone) description = "Deleted on remote [gone]";
      if (isCurrent) description += " (Current branch - will checkout main first)";
      return {
        label: name,
        description,
        // Automatically select branches that we KNOW were deleted on remote (gone)
        picked: isGone && !isCurrent
      };
    });
    const selected = await vscode21.window.showQuickPick(items, {
      canPickMany: true,
      placeHolder: `Select local branches to delete`,
      title: "Ricwiz: Delete Unused Branches"
    });
    if (!selected || selected.length === 0) {
      vscode21.window.showInformationMessage("Ricwiz: No branches selected for deletion.");
      return;
    }
    const confirm = await vscode21.window.showWarningMessage(
      `Ricwiz: Delete ${selected.length} local branch(es)?
This cannot be undone!`,
      { modal: true },
      "Yes, delete them"
    );
    if (confirm !== "Yes, delete them") {
      vscode21.window.showInformationMessage("Ricwiz: Deletion cancelled.");
      return;
    }
    let deleted = 0;
    for (const item of selected) {
      const name = item.label;
      if (name === currentBranch) {
        const fallbackBranch = config.get("ticketSourceBranch", "main");
        try {
          await exec2(`git checkout ${fallbackBranch}`, { cwd });
          currentBranch = fallbackBranch;
        } catch (e) {
          vscode21.window.showWarningMessage(`Ricwiz: Could not switch away from ${name}. Skipping.`);
          continue;
        }
      }
      try {
        await exec2(`git branch -D ${name}`, { cwd });
        deleted++;
      } catch (e) {
        vscode21.window.showWarningMessage(`Ricwiz: Could not delete local branch ${name}.`);
      }
    }
    vscode21.window.showInformationMessage(`Ricwiz: \u{1F5D1}\uFE0F Cleaned up ${deleted} unused local branch(es).`);
  });
}

// src/commands/checkoutBranch.ts
var vscode22 = __toESM(require("vscode"));
async function checkoutBranch(branchName) {
  const cwd = getWorkspaceCwd();
  if (!cwd) return;
  await vscode22.window.withProgress({
    location: vscode22.ProgressLocation.Notification,
    title: `Ricwiz: Switching to ${branchName}...`,
    cancellable: false
  }, async () => {
    try {
      const currentBranch = await getCurrentBranch(cwd);
      let hasChanges = false;
      try {
        const { stdout } = await exec2("git status --porcelain", { cwd });
        hasChanges = stdout.trim().length > 0;
      } catch (e) {
      }
      if (hasChanges && currentBranch) {
        try {
          await exec2(`git stash push --include-untracked -m "ricwiz-auto:${currentBranch}"`, { cwd });
          vscode22.window.showInformationMessage(`Ricwiz: \u{1F4E6} Stashed changes from ${currentBranch}`);
        } catch (e) {
          vscode22.window.showWarningMessage(`Ricwiz: Could not stash changes. Checkout may fail if there are conflicts.`);
        }
      }
      let targetLocalBranch = branchName;
      if (branchName.includes("/")) {
        const parts = branchName.split("/");
        targetLocalBranch = parts.slice(1).join("/");
      }
      try {
        await exec2(`git checkout ${targetLocalBranch}`, { cwd });
      } catch (e) {
        let remoteToUse = "";
        if (branchName.includes("/")) {
          remoteToUse = branchName.split("/")[0];
        } else {
          const { stdout: remotesOut } = await exec2(`git branch -r`, { cwd });
          const remoteBranches = remotesOut.split("\n").map((l) => l.trim()).filter((l) => l);
          const matchingRemotes = [];
          for (const rb of remoteBranches) {
            const nameOnly = rb.split(" ")[0];
            if (nameOnly.endsWith(`/${targetLocalBranch}`)) {
              matchingRemotes.push(nameOnly.substring(0, nameOnly.lastIndexOf("/")));
            }
          }
          if (matchingRemotes.length === 0) {
            vscode22.window.showErrorMessage(`Ricwiz: A branch "${targetLocalBranch}" n\xE3o existe localmente nem em nenhuma remote!`);
            return;
          } else if (matchingRemotes.length === 1) {
            remoteToUse = matchingRemotes[0];
          } else {
            const ctx = await WorkflowContext.initialize(cwd);
            if (matchingRemotes.includes("origin")) {
              remoteToUse = "origin";
            } else if (ctx && matchingRemotes.includes(ctx.upstreamRemote)) {
              remoteToUse = ctx.upstreamRemote;
            } else {
              remoteToUse = matchingRemotes[0];
            }
          }
        }
        try {
          await exec2(`git fetch ${remoteToUse} ${targetLocalBranch}`, { cwd });
          await exec2(`git checkout -b ${targetLocalBranch} --track ${remoteToUse}/${targetLocalBranch}`, { cwd });
        } catch (fallbackError) {
          vscode22.window.showErrorMessage(`Ricwiz: Encontrou na remote ${remoteToUse} mas falhou a fazer checkout.`);
          return;
        }
      }
      try {
        const { stdout } = await exec2("git stash list", { cwd });
        const lines = stdout.split("\n");
        for (let i = 0; i < lines.length; i++) {
          if (lines[i].includes(`ricwiz-auto:${targetLocalBranch}`)) {
            const stashMatch = lines[i].match(/stash@\{(\d+)\}/);
            if (stashMatch) {
              await exec2(`git stash pop stash@{${stashMatch[1]}}`, { cwd });
              vscode22.window.showInformationMessage(`Ricwiz: \u{1F4E6} Restored stashed changes on ${targetLocalBranch}`);
            }
            break;
          }
        }
      } catch (e) {
        vscode22.window.showWarningMessage(`Ricwiz: Could not restore stashed changes on ${targetLocalBranch}. You may need to resolve conflicts manually (check git stash list).`);
      }
    } catch (e) {
      vscode22.window.showErrorMessage(`Ricwiz: Could not checkout branch ${branchName}.`);
    }
  });
}

// src/commands/copyBranch.ts
var vscode23 = __toESM(require("vscode"));
async function copyBranchName() {
  const cwd = getWorkspaceCwd();
  if (!cwd) return;
  try {
    const { stdout } = await exec2("git branch --show-current", { cwd });
    const branchName = stdout.trim();
    if (branchName) {
      await vscode23.env.clipboard.writeText(branchName);
      vscode23.window.showInformationMessage(`Ricwiz: \u{1F4CB} Copied "${branchName}" to clipboard`);
    }
  } catch (e) {
    vscode23.window.showErrorMessage("Ricwiz: Could not get the current branch name.");
  }
}

// src/commands/generatePackageXml.ts
var vscode24 = __toESM(require("vscode"));
var path4 = __toESM(require("path"));
var fs4 = __toESM(require("fs"));
async function generatePackageXml() {
  const cwd = getWorkspaceCwd();
  if (!cwd) {
    vscode24.window.showErrorMessage("Ricwiz: Open a folder or workspace that is a Git repository.");
    return;
  }
  const ctx = await WorkflowContext.initialize(cwd, { skipPrompt: true });
  const config = vscode24.workspace.getConfiguration("ricwiz");
  const sourceBranch = ctx?.ticketSourceBranch || config.get("ticketSourceBranch", "main");
  const originRemote = ctx?.originRemote || "origin";
  const rawCommand = config.get(
    "packageXmlCommand",
    'sf sgd source delta --to "HEAD" --from "{originRemote}/{baseBranch}" --output-dir "."'
  );
  const command = rawCommand.replace("origin/{baseBranch}", "{originRemote}/{baseBranch}").replace(/{originRemote}/g, originRemote).replace(/{baseBranch}/g, sourceBranch);
  const confirm = await vscode24.window.showWarningMessage(
    "Are you sure you want to generate the package.xml? This may overwrite existing local manifest files.",
    { modal: true },
    "Yes, Generate"
  );
  if (confirm !== "Yes, Generate") {
    return;
  }
  await vscode24.window.withProgress({
    location: vscode24.ProgressLocation.Notification,
    title: `Ricwiz: Generating package.xml using Salesforce CLI...`,
    cancellable: false
  }, async () => {
    try {
      await exec2(command, { cwd, maxBuffer: 10 * 1024 * 1024 });
      vscode24.window.showInformationMessage(`Ricwiz: Successfully generated package.xml!`);
      const sgdPath = path4.join(cwd, "package", "package.xml");
      const rootPath = path4.join(cwd, "package.xml");
      const manifestPath = path4.join(cwd, "manifest", "package.xml");
      for (const p of [sgdPath, rootPath, manifestPath]) {
        if (fs4.existsSync(p)) {
          const doc = await vscode24.workspace.openTextDocument(p);
          await vscode24.window.showTextDocument(doc);
          break;
        }
      }
    } catch (e) {
      vscode24.window.showErrorMessage(`Ricwiz: Error running sf command - ${e.message}`);
    }
  });
}

// src/commands/deployPackage.ts
var vscode25 = __toESM(require("vscode"));
async function deployPackage() {
  const cwd = getWorkspaceCwd();
  if (!cwd) {
    vscode25.window.showErrorMessage("Ricwiz: Open a folder or workspace that is a Git repository.");
    return;
  }
  const config = vscode25.workspace.getConfiguration("ricwiz");
  const command = config.get("deployCommand", "sf project deploy start --manifest package/package.xml --post-destructive-changes destructiveChanges/destructiveChanges.xml -c -l NoTestRun -g");
  const confirm = await vscode25.window.showWarningMessage(
    "Are you sure you want to deploy to Salesforce? This action modifies your org and cannot be easily undone.",
    { modal: true },
    "Yes, Deploy"
  );
  if (confirm !== "Yes, Deploy") {
    return;
  }
  await vscode25.window.withProgress({
    location: vscode25.ProgressLocation.Notification,
    title: `Ricwiz: Deploying package...`,
    cancellable: false
  }, async () => {
    try {
      const { stdout, stderr } = await exec2(command, { cwd, maxBuffer: 50 * 1024 * 1024 });
      const outputChannel = vscode25.window.createOutputChannel("Ricwiz Deploy");
      outputChannel.appendLine(`Executing: ${command}`);
      outputChannel.appendLine(stdout);
      if (stderr) {
        outputChannel.appendLine("--- STDERR ---");
        outputChannel.appendLine(stderr);
      }
      outputChannel.show();
      vscode25.window.showInformationMessage(`Ricwiz: Successfully ran deploy command!`);
    } catch (e) {
      const outputChannel = vscode25.window.createOutputChannel("Ricwiz Deploy");
      outputChannel.appendLine(`Error executing: ${command}`);
      if (e.stdout) outputChannel.appendLine(e.stdout);
      if (e.stderr) outputChannel.appendLine(e.stderr);
      outputChannel.appendLine(e.message);
      outputChannel.show();
      vscode25.window.showErrorMessage(`Ricwiz: Error running deploy command. See output channel for details.`);
    }
  });
}

// src/commands/importData.ts
var vscode26 = __toESM(require("vscode"));
async function importData() {
  const cwd = getWorkspaceCwd();
  if (!cwd) {
    vscode26.window.showErrorMessage("Ricwiz: Open a folder or workspace that is a Git repository.");
    return;
  }
  const config = vscode26.workspace.getConfiguration("ricwiz");
  const command = config.get("importDataCommand", "sfdx force:data:tree:import --plan data/plan.json");
  const confirm = await vscode26.window.showWarningMessage(
    "Are you sure you want to import data into Salesforce? This action modifies records in your org.",
    { modal: true },
    "Yes, Import"
  );
  if (confirm !== "Yes, Import") {
    return;
  }
  await vscode26.window.withProgress({
    location: vscode26.ProgressLocation.Notification,
    title: `Ricwiz: Importing data...`,
    cancellable: false
  }, async () => {
    try {
      const { stdout, stderr } = await exec2(command, { cwd, maxBuffer: 50 * 1024 * 1024 });
      const outputChannel = vscode26.window.createOutputChannel("Ricwiz Import Data");
      outputChannel.appendLine(`Executing: ${command}`);
      outputChannel.appendLine(stdout);
      if (stderr) {
        outputChannel.appendLine("--- STDERR ---");
        outputChannel.appendLine(stderr);
      }
      outputChannel.show();
      vscode26.window.showInformationMessage(`Ricwiz: Successfully ran import data command!`);
    } catch (e) {
      const outputChannel = vscode26.window.createOutputChannel("Ricwiz Import Data");
      outputChannel.appendLine(`Error executing: ${command}`);
      if (e.stdout) outputChannel.appendLine(e.stdout);
      if (e.stderr) outputChannel.appendLine(e.stderr);
      outputChannel.appendLine(e.message);
      outputChannel.show();
      vscode26.window.showErrorMessage(`Ricwiz: Error running import data command. See output channel for details.`);
    }
  });
}

// src/commands/listTicketFiles.ts
var vscode27 = __toESM(require("vscode"));
async function listTicketFiles() {
  const cwd = getWorkspaceCwd();
  if (!cwd) {
    vscode27.window.showErrorMessage("Ricwiz: Open a folder or workspace that is a Git repository.");
    return;
  }
  const ctx = await WorkflowContext.initialize(cwd, { skipPrompt: true });
  const sourceBranch = ctx ? ctx.ticketSourceBranch : vscode27.workspace.getConfiguration("ricwiz").get("ticketSourceBranch", "main");
  const originRemote = ctx ? ctx.originRemote : "origin";
  let currentBranch = "";
  try {
    currentBranch = await getCurrentBranch(cwd);
  } catch (e) {
  }
  const targetBranch = await vscode27.window.showInputBox({
    prompt: `Enter the branch name to list modified files (compared to ${sourceBranch})`,
    value: currentBranch,
    placeHolder: "SFPSCA-1234"
  });
  if (!targetBranch) {
    return;
  }
  const sanitizedTarget = sanitizeShellInput(targetBranch);
  await vscode27.window.withProgress({
    location: vscode27.ProgressLocation.Notification,
    title: `Ricwiz: Finding files for ${sanitizedTarget}...`,
    cancellable: false
  }, async () => {
    try {
      const configPrefix = ctx ? ctx.ticketPrefix : vscode27.workspace.getConfiguration("ricwiz").get("ticketPrefix", "SFPSC-");
      const prefix = resolvePrefix(sanitizedTarget, configPrefix);
      const ticketId = extractTicketSuggestion(sanitizedTarget, prefix, true) || sanitizedTarget.replace(/-to-[a-zA-Z0-9]+$/i, "");
      let resolvedTargetBranch = await resolveExistingBranchName(cwd, ticketId);
      ricwizLogger2.appendLine(`[ListTicketFiles] targetBranch (raw): ${sanitizedTarget}, resolvedTargetBranch: ${resolvedTargetBranch}, ticketId: ${ticketId}, originRemote: ${originRemote}, sourceBranch: ${sourceBranch}`);
      let diffLines = [];
      try {
        let mergeBase = "";
        try {
          ricwizLogger2.appendLine(`[ListTicketFiles] Running: git merge-base ${originRemote}/${sourceBranch} ${resolvedTargetBranch}`);
          const { stdout } = await exec2(`git merge-base ${originRemote}/${sourceBranch} ${resolvedTargetBranch}`, { cwd });
          mergeBase = stdout.trim();
        } catch (e) {
          ricwizLogger2.appendLine(`[ListTicketFiles] First merge-base failed: ${e.message}`);
          try {
            ricwizLogger2.appendLine(`[ListTicketFiles] Running: git merge-base ${sourceBranch} ${resolvedTargetBranch}`);
            const { stdout } = await exec2(`git merge-base ${sourceBranch} ${resolvedTargetBranch}`, { cwd });
            mergeBase = stdout.trim();
          } catch (e2) {
            ricwizLogger2.appendLine(`[ListTicketFiles] Second merge-base failed: ${e2.message}`);
            ricwizLogger2.appendLine(`[ListTicketFiles] Running: git merge-base ${originRemote}/${sourceBranch} ${originRemote}/${resolvedTargetBranch}`);
            const { stdout } = await exec2(`git merge-base ${originRemote}/${sourceBranch} ${originRemote}/${resolvedTargetBranch}`, { cwd });
            mergeBase = stdout.trim();
            resolvedTargetBranch = `${originRemote}/${resolvedTargetBranch}`;
          }
        }
        if (mergeBase) {
          ricwizLogger2.appendLine(`[ListTicketFiles] Merge base found: ${mergeBase}. Running git diff...`);
          const isCurrent = resolvedTargetBranch === currentBranch || sanitizedTarget === currentBranch;
          const diffTarget = isCurrent ? "" : ` ${resolvedTargetBranch}`;
          const { stdout } = await exec2(`git diff --name-only ${mergeBase}${diffTarget}`, { cwd, maxBuffer: 10 * 1024 * 1024 });
          diffLines = stdout.split("\n").map((l) => l.trim()).filter((l) => l.length > 0);
          if (isCurrent) {
            try {
              const { stdout: untracked } = await exec2(`git ls-files --others --exclude-standard`, { cwd, maxBuffer: 10 * 1024 * 1024 });
              const untrackedLines = untracked.split("\n").map((l) => l.trim()).filter((l) => l.length > 0);
              diffLines = [...diffLines, ...untrackedLines];
              ricwizLogger2.appendLine(`[ListTicketFiles] Found ${untrackedLines.length} untracked files.`);
            } catch (e) {
              ricwizLogger2.appendLine(`[ListTicketFiles] Failed to get untracked files: ${e.message}`);
            }
          }
          ricwizLogger2.appendLine(`[ListTicketFiles] diff found ${diffLines.length} files total.`);
        }
      } catch (e) {
        ricwizLogger2.appendLine(`[ListTicketFiles] Diff strategy failed: ${e.message}`);
      }
      let logLines = [];
      try {
        ricwizLogger2.appendLine(`[ListTicketFiles] Running git log fallback for ticketId: ${ticketId}`);
        const { stdout } = await exec2(`git --no-pager log --grep="\\b${ticketId}\\b" -i -E --name-only -m --first-parent --format=""`, { cwd, maxBuffer: 10 * 1024 * 1024 });
        logLines = stdout.split("\n").map((l) => l.trim()).filter((l) => l.length > 0);
        ricwizLogger2.appendLine(`[ListTicketFiles] git log found ${logLines.length} files.`);
      } catch (e) {
        ricwizLogger2.appendLine(`[ListTicketFiles] Git log fallback failed: ${e.message}`);
      }
      const lines = [...diffLines, ...logLines];
      if (lines.length === 0) {
        vscode27.window.showInformationMessage(`Ricwiz: No modified files found for ${sanitizedTarget}.`);
        return;
      }
      const uniqueFiles = Array.from(new Set(lines)).sort();
      const groups = {};
      for (const file of uniqueFiles) {
        const match = file.match(/default\/([^/]+)/);
        const groupName = match && match[1] ? match[1].toUpperCase() : "OUTROS";
        if (!groups[groupName]) {
          groups[groupName] = [];
        }
        groups[groupName].push(file);
      }
      let output = `Files modified in branch ${sanitizedTarget}:
`;
      const sortedGroupNames = Object.keys(groups).sort();
      for (const group of sortedGroupNames) {
        output += `
=== ${group} ===
`;
        output += groups[group].join("\n") + "\n";
      }
      const doc = await vscode27.workspace.openTextDocument({
        content: output,
        language: "plaintext"
      });
      await vscode27.window.showTextDocument(doc);
    } catch (e) {
      vscode27.window.showErrorMessage(`Ricwiz: Error running git log - ${e.message}`);
    }
  });
}

// src/commands/resetTracking.ts
var vscode28 = __toESM(require("vscode"));
async function resetTracking() {
  const cwd = getWorkspaceCwd();
  if (!cwd) {
    vscode28.window.showErrorMessage("Ricwiz: Open a folder or workspace that is a Git repository.");
    return;
  }
  const config = vscode28.workspace.getConfiguration("ricwiz");
  const command = config.get("resetTrackingCommand", "sf org disable tracking && sf project reset tracking --no-prompt");
  await vscode28.window.withProgress({
    location: vscode28.ProgressLocation.Notification,
    title: `Ricwiz: Resetting tracking...`,
    cancellable: false
  }, async () => {
    try {
      const { stdout, stderr } = await exec2(command, { cwd, maxBuffer: 50 * 1024 * 1024 });
      const outputChannel = vscode28.window.createOutputChannel("Ricwiz Reset Tracking");
      outputChannel.appendLine(`Executing: ${command}`);
      outputChannel.appendLine(stdout);
      if (stderr) {
        outputChannel.appendLine("--- STDERR ---");
        outputChannel.appendLine(stderr);
      }
      outputChannel.show();
      vscode28.window.showInformationMessage(`Ricwiz: Successfully reset tracking!`);
    } catch (e) {
      const outputChannel = vscode28.window.createOutputChannel("Ricwiz Reset Tracking");
      outputChannel.appendLine(`Error executing: ${command}`);
      if (e.stdout) outputChannel.appendLine(e.stdout);
      if (e.stderr) outputChannel.appendLine(e.stderr);
      outputChannel.appendLine(e.message);
      outputChannel.show();
      vscode28.window.showErrorMessage(`Ricwiz: Error resetting tracking. See output channel for details.`);
    }
  });
}

// src/commands/extractComponent.ts
var vscode29 = __toESM(require("vscode"));
async function extractComponent() {
  const cwd = getWorkspaceCwd();
  if (!cwd) {
    vscode29.window.showErrorMessage("Ricwiz: Open a workspace first.");
    return;
  }
  const commonTypes = [
    "ApexClass",
    "ApexTrigger",
    "CustomObject",
    "CustomField",
    "LightningComponentBundle",
    "AuraDefinitionBundle",
    "Flow",
    "CustomLabel",
    "CustomMetadata",
    "StaticResource",
    "Profile",
    "PermissionSet",
    "PermissionSetGroup",
    "Layout",
    "ValidationRule",
    "RecordType",
    "ListView",
    "Report",
    "EmailTemplate",
    "Other (Type manually)..."
  ];
  let metadataType = await vscode29.window.showQuickPick(commonTypes, {
    placeHolder: "Select Metadata Type to extract (e.g., ApexClass)",
    ignoreFocusOut: true
  });
  if (!metadataType) return;
  if (metadataType === "Other (Type manually)...") {
    metadataType = await vscode29.window.showInputBox({
      prompt: "Enter Metadata Type (e.g., CustomApplication, Queue)",
      ignoreFocusOut: true
    });
    if (!metadataType) return;
  }
  const globMap = {
    "ApexClass": "**/*.cls",
    "ApexTrigger": "**/*.trigger",
    "CustomObject": "**/*.{object,object-meta.xml}",
    "CustomField": "**/*.field-meta.xml",
    "LightningComponentBundle": "**/lwc/*/*.js",
    "AuraDefinitionBundle": "**/aura/*/*.cmp",
    "Flow": "**/*.flow-meta.xml",
    "CustomLabel": "**/*.labels-meta.xml",
    "CustomMetadata": "**/*.md-meta.xml",
    "StaticResource": "**/*.resource-meta.xml",
    "Profile": "**/*.profile-meta.xml",
    "PermissionSet": "**/*.permissionset-meta.xml",
    "PermissionSetGroup": "**/*.permissionsetgroup-meta.xml",
    "Layout": "**/*.layout-meta.xml",
    "ValidationRule": "**/*.validationRule-meta.xml",
    "RecordType": "**/*.recordType-meta.xml",
    "ListView": "**/*.listView-meta.xml"
  };
  let localSuggestions = [];
  const globPattern = globMap[metadataType];
  if (globPattern) {
    try {
      const files = await vscode29.workspace.findFiles(globPattern, "**/node_modules/**");
      localSuggestions = files.map((f) => {
        const basename4 = f.fsPath.split(/[\\/]/).pop() || "";
        if (metadataType === "LightningComponentBundle" || metadataType === "AuraDefinitionBundle") {
          const parts = f.fsPath.split(/[\\/]/);
          return parts[parts.length - 2] || basename4.split(".")[0];
        }
        return basename4.split(".")[0];
      });
      localSuggestions = [...new Set(localSuggestions)].sort();
    } catch (e) {
    }
  }
  const componentName = await new Promise((resolve) => {
    const quickPick = vscode29.window.createQuickPick();
    quickPick.title = `Extract ${metadataType}`;
    quickPick.placeholder = `Type name (e.g. MyComponent) or * for all`;
    quickPick.ignoreFocusOut = true;
    quickPick.matchOnDescription = true;
    const updateItems = () => {
      const val = quickPick.value.trim();
      const items = [];
      if (val) {
        items.push({
          label: `$(cloud-download) Extract "${val}"`,
          description: "Extract exact name from Salesforce",
          alwaysShow: true
        });
      } else {
        items.push({
          label: `$(cloud-download) Extract "*" (All)`,
          description: `Extract all ${metadataType}s`,
          alwaysShow: true
        });
      }
      localSuggestions.forEach((sug) => {
        if (!val || sug.toLowerCase().includes(val.toLowerCase())) {
          items.push({
            label: sug,
            description: "Local workspace component"
          });
        }
      });
      quickPick.items = items;
    };
    quickPick.onDidChangeValue(() => updateItems());
    quickPick.onDidAccept(() => {
      const selection = quickPick.selectedItems[0];
      if (selection) {
        let result = selection.label;
        if (result.startsWith('$(cloud-download) Extract "')) {
          result = result.replace('$(cloud-download) Extract "', "").replace('" (All)', "").replace('"', "");
        } else if (result === '$(cloud-download) Extract "*" (All)') {
          result = "*";
        }
        quickPick.hide();
        resolve(result);
      }
    });
    quickPick.onDidHide(() => {
      quickPick.dispose();
      resolve(void 0);
    });
    updateItems();
    quickPick.show();
  });
  if (!componentName) return;
  await vscode29.window.withProgress({
    location: vscode29.ProgressLocation.Notification,
    title: `Ricwiz: Extracting ${metadataType}:${componentName} from Salesforce...`,
    cancellable: true
  }, async (progress, token) => {
    try {
      ricwizLogger2.show(true);
      const manifestStr = `${metadataType}:${componentName}`;
      const { stdout, stderr } = await exec2(`sf project retrieve start -m "${manifestStr}"`, { cwd });
      if (stdout) ricwizLogger2.appendLine(stdout);
      if (stderr) ricwizLogger2.appendLine(stderr);
      vscode29.window.showInformationMessage(`Ricwiz: Successfully extracted ${manifestStr}.`);
    } catch (e) {
      ricwizLogger2.appendLine(`ERROR: ${e.message}`);
      if (e.stdout) ricwizLogger2.appendLine(e.stdout);
      if (e.stderr) ricwizLogger2.appendLine(e.stderr);
      vscode29.window.showErrorMessage(`Ricwiz: Extraction failed. See Output channel for details.`);
    }
  });
}

// src/commands/deployMultiOrg.ts
var vscode30 = __toESM(require("vscode"));
var path5 = __toESM(require("path"));
async function deployMultiOrg() {
  const editor = vscode30.window.activeTextEditor;
  if (!editor) {
    vscode30.window.showErrorMessage("Ricwiz: Please open the file you want to deploy in the editor first.");
    return;
  }
  const fsPath = editor.document.uri.fsPath;
  const cwd = getWorkspaceCwd();
  if (!cwd) return;
  let orgListJson = "";
  await vscode30.window.withProgress({
    location: vscode30.ProgressLocation.Notification,
    title: "Ricwiz: Fetching available Salesforce orgs...",
    cancellable: false
  }, async () => {
    try {
      const { stdout } = await exec2("sf org list --json", { cwd });
      orgListJson = stdout;
    } catch (e) {
      orgListJson = e.stdout || "";
    }
  });
  if (!orgListJson) {
    vscode30.window.showErrorMessage("Ricwiz: Failed to fetch orgs. Is Salesforce CLI installed?");
    return;
  }
  let orgs = [];
  try {
    const parsed = JSON.parse(orgListJson);
    const nonScratch = parsed.result?.nonScratchOrgs || [];
    const scratch = parsed.result?.scratchOrgs || [];
    orgs = [...nonScratch, ...scratch];
  } catch (e) {
    vscode30.window.showErrorMessage("Ricwiz: Failed to parse org list.");
    return;
  }
  if (orgs.length === 0) {
    vscode30.window.showInformationMessage("Ricwiz: No authenticated orgs found.");
    return;
  }
  const quickPickItems = orgs.map((org) => ({
    label: org.alias || org.username,
    description: org.alias ? org.username : "",
    picked: org.isDefaultUsername
  }));
  const selectedOrgs = await vscode30.window.showQuickPick(quickPickItems, {
    placeHolder: "Select the org(s) to deploy this file to",
    canPickMany: true,
    ignoreFocusOut: true
  });
  if (!selectedOrgs || selectedOrgs.length === 0) return;
  const fileName = path5.basename(fsPath);
  await vscode30.window.withProgress({
    location: vscode30.ProgressLocation.Notification,
    title: `Ricwiz: Deploying ${fileName} to ${selectedOrgs.length} org(s)...`,
    cancellable: false
  }, async () => {
    ricwizLogger2.show(true);
    ricwizLogger2.appendLine(`--- Starting Parallel Deploy of ${fileName} ---`);
    const promises = selectedOrgs.map(async (org) => {
      const orgIdentifier = org.label;
      ricwizLogger2.appendLine(`[${orgIdentifier}] Deploying...`);
      try {
        const { stdout, stderr } = await exec2(`sf project deploy start -d "${fsPath}" -o "${orgIdentifier}"`, { cwd });
        ricwizLogger2.appendLine(`[${orgIdentifier}] \u2705 Success`);
        if (stdout) ricwizLogger2.appendLine(stdout);
        return { org: orgIdentifier, success: true };
      } catch (e) {
        ricwizLogger2.appendLine(`[${orgIdentifier}] \u274C Failed`);
        if (e.stdout) ricwizLogger2.appendLine(e.stdout);
        if (e.stderr) ricwizLogger2.appendLine(e.stderr);
        return { org: orgIdentifier, success: false };
      }
    });
    const results = await Promise.all(promises);
    const successes = results.filter((r) => r.success).length;
    const fails = results.filter((r) => !r.success).length;
    if (fails === 0) {
      vscode30.window.showInformationMessage(`Ricwiz: Successfully deployed to all ${successes} orgs!`);
    } else {
      vscode30.window.showErrorMessage(`Ricwiz: Deploy finished with errors (${successes} success, ${fails} failed). Check Output channel.`);
    }
  });
}

// src/commands/captureAdminChanges.ts
var vscode31 = __toESM(require("vscode"));
var fs5 = __toESM(require("fs"));
var path6 = __toESM(require("path"));
async function captureAdminChanges() {
  const cwd = getWorkspaceCwd();
  if (!cwd) {
    vscode31.window.showErrorMessage("Ricwiz: Open a folder or workspace that is a Git repository.");
    return;
  }
  const config = vscode31.workspace.getConfiguration("ricwiz");
  const defaultUsername = config.get("auditUsername", "");
  const defaultHours = config.get("auditHours", 8);
  let username = await vscode31.window.showInputBox({
    prompt: "Enter your Salesforce Username to query in SetupAuditTrail",
    value: defaultUsername,
    placeHolder: "admin@tuaorg.com"
  });
  if (!username) return;
  username = sanitizeShellInput(username);
  const hoursStr = await vscode31.window.showInputBox({
    prompt: "How many hours back do you want to search?",
    value: defaultHours.toString(),
    placeHolder: "8"
  });
  if (!hoursStr) return;
  const hours = parseFloat(hoursStr);
  if (isNaN(hours) || hours <= 0) {
    vscode31.window.showErrorMessage("Ricwiz: Invalid hours specified.");
    return;
  }
  const searchDate = new Date(Date.now() - hours * 60 * 60 * 1e3).toISOString();
  const query = `SELECT Action, Display, Section FROM SetupAuditTrail WHERE CreatedBy.Username = '${username}' AND CreatedDate >= ${searchDate}`;
  const command = `sf data query -q "${query}" --json`;
  await vscode31.window.withProgress({
    location: vscode31.ProgressLocation.Notification,
    title: `Ricwiz: Interrogating Setup Audit Trail...`,
    cancellable: false
  }, async () => {
    try {
      const { stdout } = await exec2(command, { cwd, maxBuffer: 50 * 1024 * 1024 });
      const result = JSON.parse(stdout);
      if (!result.result || result.result.records.length === 0) {
        vscode31.window.showInformationMessage(`Ricwiz: No changes found for ${username} in the last ${hours} hours.`);
        return;
      }
      const records = result.result.records;
      const items = [];
      const seen = /* @__PURE__ */ new Set();
      for (const record of records) {
        const metaObj = translateToMetadata(record.Action, record.Display, record.Section);
        if (metaObj) {
          const uniqueKey = `${metaObj.isDelete ? "DEL" : "ADD"}-${metaObj.metadataFormat}`;
          if (!seen.has(uniqueKey)) {
            seen.add(uniqueKey);
            const icon = metaObj.isDelete ? "$(trash)" : "$(plus)";
            items.push({
              label: `${icon} ${metaObj.metadataFormat}`,
              description: `${record.Action} -> ${record.Display}`,
              metadataFormat: metaObj.metadataFormat,
              isDelete: metaObj.isDelete
            });
          }
        }
      }
      if (items.length === 0) {
        vscode31.window.showInformationMessage(`Ricwiz: No extractable metadata changes found for ${username} in the last ${hours} hours (ignored passwords/logins).`);
        return;
      }
      const selection = await vscode31.window.showQuickPick(items, {
        canPickMany: true,
        placeHolder: "Select the changes you want to extract to GitLab",
        ignoreFocusOut: true
      });
      if (!selection || selection.length === 0) {
        vscode31.window.showInformationMessage("Ricwiz: No changes selected.");
        return;
      }
      const toDelete = selection.filter((i) => i.isDelete);
      const toRetrieve = selection.filter((i) => !i.isDelete);
      const outputChannel = vscode31.window.createOutputChannel("Ricwiz Admin Bridge");
      outputChannel.show();
      if (toDelete.length > 0) {
        const { stdout: lsFiles } = await exec2(`git ls-files`, { cwd });
        const allFiles = lsFiles.split("\n").map((f) => f.trim());
        let deletedCount = 0;
        for (const del of toDelete) {
          const metaParts = del.metadataFormat.split(":");
          const metaType = metaParts[0];
          const metaName = metaParts[1];
          let searchName = metaName;
          if (metaType === "CustomField") {
            searchName = metaName.split(".")[1];
          }
          const matchingFiles = allFiles.filter((f) => {
            const base = path6.basename(f);
            return base.startsWith(searchName + ".") && base.includes(metaType === "CustomField" ? ".field" : "");
          });
          for (const f of matchingFiles) {
            const fullPath = path6.join(cwd, f);
            if (fs5.existsSync(fullPath)) {
              fs5.unlinkSync(fullPath);
              outputChannel.appendLine(`Deleted local file: ${f}`);
              deletedCount++;
            }
          }
        }
        vscode31.window.showInformationMessage(`Ricwiz: Deleted ${deletedCount} local files from Git workspace.`);
      }
      if (toRetrieve.length === 0) {
        return;
      }
      let initialMetadata = toRetrieve.map((item) => item.metadataFormat).filter((m) => m !== "").join(", ");
      let finalMetadata = await vscode31.window.showInputBox({
        prompt: "Review and adjust the metadata components to retrieve",
        value: initialMetadata,
        ignoreFocusOut: true
      });
      if (!finalMetadata) {
        return;
      }
      const retrieveCmd = `sf project retrieve start -m "${finalMetadata}"`;
      outputChannel.appendLine(`Executing: ${retrieveCmd}`);
      vscode31.window.showInformationMessage(`Ricwiz: Extracting ${toRetrieve.length} components...`);
      const retrieveResult = await exec2(retrieveCmd, { cwd });
      outputChannel.appendLine(retrieveResult.stdout);
      if (retrieveResult.stderr) {
        outputChannel.appendLine("--- STDERR ---");
        outputChannel.appendLine(retrieveResult.stderr);
      }
      vscode31.window.showInformationMessage("Ricwiz: Changes extracted successfully! Ready for Git Commit.");
    } catch (e) {
      vscode31.window.showErrorMessage(`Ricwiz: Error capturing changes - ${e.message}`);
    }
  });
}
function translateToMetadata(action, display, section) {
  if (!action || !display || !section) return null;
  const act = action.toLowerCase();
  const sec = section.toLowerCase();
  const ignoredSections = ["security controls", "network access", "session settings", "data export", "login history", "password policies", "identity verification", "delegated administration"];
  if (ignoredSections.includes(sec)) return null;
  if (act.includes("login") || act.includes("password") || act.includes("oauth") || act.includes("session")) return null;
  const isDelete = act.includes("delete");
  let metaString = null;
  if (act === "permissionsetgroupcomponentadd" || act === "permissionsetgroupcomponentdelete") {
    return null;
  }
  const extractName = (d, allowSpaces = false) => {
    let clean = d.replace(/\(.*\)/g, "").trim();
    if (clean.includes(":") && !act.includes("calculation")) {
      clean = clean.split(":")[0];
    }
    const stopWords = [
      "disabled",
      "deleted",
      "removed",
      "created",
      "changed",
      "updated",
      "from",
      "to",
      "on",
      "assigned",
      "assign",
      "assignment",
      "permission",
      "set",
      "group",
      "apex",
      "class",
      "trigger",
      "custom",
      "field",
      "object",
      "layout",
      "validation",
      "rule",
      "flow",
      "profile"
    ];
    let words = clean.split(/\s+/);
    if (!allowSpaces) {
      const nameWords = words.filter((w) => !stopWords.includes(w.toLowerCase()));
      const joinedName = nameWords.join("_").replace(/[^a-zA-Z0-9_]/g, "");
      return joinedName || clean.replace(/\s+/g, "");
    } else {
      while (words.length > 0 && stopWords.includes(words[words.length - 1].toLowerCase())) {
        words.pop();
      }
      while (words.length > 0 && stopWords.includes(words[0].toLowerCase())) {
        words.shift();
      }
      return words.join(" ").trim().replace(/[^a-zA-Z0-9_ ]/g, "");
    }
  };
  if (act.includes("profile")) {
    metaString = `Profile:${extractName(display, true)}`;
  } else if (act.includes("permissionsetgroupcalculation")) {
    const parts = display.split(":");
    const apiName = parts.length > 1 ? parts[parts.length - 1].trim() : extractName(display, false);
    metaString = `PermissionSetGroup:${apiName}`;
  } else if (act.includes("permission set group") || act.includes("permissionsetgroup")) {
    metaString = `PermissionSetGroup:${extractName(display, false)}`;
  } else if (act.includes("permission set") || act.includes("permissionset")) {
    metaString = `PermissionSet:${extractName(display, false)}`;
  } else if (act.includes("apexclass")) {
    metaString = `ApexClass:${extractName(display, false)}`;
  } else if (act.includes("apextrigger") || act.includes("apex trigger")) {
    metaString = `ApexTrigger:${extractName(display, false)}`;
  } else if (act.includes("customfield")) {
    const fieldMatch = display.match(/([A-Za-z0-9_]+__c)/);
    const objMatch = display.match(/(?:on|na|for)\s+([A-Za-z0-9_]+)/i);
    if (fieldMatch && objMatch) {
      metaString = `CustomField:${objMatch[1]}.${fieldMatch[1]}`;
    } else {
      metaString = `CustomField:${extractName(display, false)}`;
    }
  } else if (act.includes("layout")) {
    metaString = `Layout:${extractName(display, true)}`;
  } else if (act.includes("validation")) {
    metaString = `ValidationRule:${extractName(display, false)}`;
  } else if (act.includes("flow")) {
    metaString = `Flow:${extractName(display, false)}`;
  } else if (act.includes("customobject")) {
    const objMatch = display.match(/([A-Za-z0-9_]+__c)/);
    metaString = objMatch ? `CustomObject:${objMatch[1]}` : `CustomObject:${extractName(display, false)}`;
  } else {
    if (!act.includes("created") && !act.includes("changed") && !act.includes("deleted")) {
      return null;
    }
  }
  if (metaString) {
    return { metadataFormat: metaString, isDelete };
  }
  return null;
}

// src/commands/openHistory.ts
var vscode32 = __toESM(require("vscode"));
async function openHistory() {
  const cwd = getWorkspaceCwd();
  if (!cwd) return;
  try {
    const { stdout } = await exec2(`git for-each-ref --sort=-committerdate --format="%(refname:short)|||%(committerdate:relative)|||%(subject)" refs/heads/`, { cwd });
    const branches = stdout.split("\n").filter((l) => l.trim()).map((line) => {
      const parts = line.split("|||");
      return {
        label: `$(git-branch) ${parts[0]}`,
        description: parts[1],
        detail: parts[2],
        branchName: parts[0]
      };
    });
    const selected = await vscode32.window.showQuickPick(branches, {
      placeHolder: "Select a branch from history to checkout",
      matchOnDescription: true,
      matchOnDetail: true
    });
    if (selected) {
      await checkoutBranch(selected.branchName);
    }
  } catch (e) {
    vscode32.window.showErrorMessage("Ricwiz: Failed to get branch history");
  }
}

// src/commands/searchTicket.ts
var vscode33 = __toESM(require("vscode"));
async function searchTicket() {
  const cwd = getWorkspaceCwd();
  if (!cwd) return;
  const ticketId = await vscode33.window.showInputBox({
    prompt: "Enter ticket number or name (e.g., 48934)",
    placeHolder: "48934"
  });
  if (!ticketId) return;
  const sanitizedSearch = sanitizeShellInput(ticketId);
  try {
    const { stdout } = await exec2(`git branch --list "*${sanitizedSearch}*"`, { cwd });
    const branches = stdout.split("\n").map((b) => b.replace("*", "").trim()).filter((b) => b);
    if (branches.length === 0) {
      vscode33.window.showInformationMessage(`Ricwiz: No branches found matching "${ticketId}"`);
      return;
    }
    const items = branches.map((b) => ({
      label: `$(git-branch) ${b}`,
      branchName: b
    }));
    const selected = await vscode33.window.showQuickPick(items, {
      placeHolder: `Select a branch for ${ticketId}`
    });
    if (selected) {
      await checkoutBranch(selected.branchName);
    }
  } catch (e) {
    vscode33.window.showErrorMessage("Ricwiz: Failed to search branches");
  }
}

// src/commands/whoToBlame.ts
var vscode34 = __toESM(require("vscode"));
var path7 = __toESM(require("path"));
async function getBlameData() {
  const editor = vscode34.window.activeTextEditor;
  if (!editor) {
    vscode34.window.showErrorMessage("Ricwiz: Please open a file in the editor to check blame.");
    return null;
  }
  const filePath = editor.document.fileName;
  const fileName = path7.basename(filePath);
  const cwd = getWorkspaceCwd();
  if (!cwd) {
    vscode34.window.showErrorMessage("Ricwiz: Workspace is not a git repository.");
    return null;
  }
  let gitHistory = [];
  try {
    const { stdout } = await exec2(`git log -5 --pretty=format:"%an|%ar|%s|%h" -- "${filePath}"`, { cwd });
    const lines = stdout.trim().split("\n");
    for (const line of lines) {
      const parts = line.split("|");
      if (parts.length >= 4) {
        gitHistory.push({
          author: parts[0],
          time: parts[1],
          message: parts.slice(2, -1).join("|"),
          hash: parts[parts.length - 1]
        });
      }
    }
  } catch (e) {
    ricwizLogger2.appendLine(`[WhoToBlame] Git blame error: ${e.message}`);
  }
  let sfAuthor = "Unknown";
  let sfTime = "Unknown";
  let sfCreatedBy = "Unknown";
  let auditHistory = [];
  const metaInfo = parseMetadataFromPath(filePath);
  if (metaInfo) {
    try {
      await vscode34.window.withProgress({
        location: vscode34.ProgressLocation.Notification,
        title: `Ricwiz: Analyzing ${metaInfo.name} in Salesforce...`,
        cancellable: false
      }, async () => {
        let query = "";
        if (metaInfo.type === "CustomField") {
          const parts = metaInfo.name.split(".");
          if (parts.length === 2) {
            query = `SELECT LastModifiedBy.Name, LastModifiedDate, CreatedBy.Name FROM CustomField WHERE DeveloperName = '${parts[1].replace("__c", "")}' AND TableEnumOrId = '${parts[0]}'`;
          }
        } else if (metaInfo.type === "LightningComponentBundle") {
          query = `SELECT LastModifiedBy.Name, LastModifiedDate, CreatedBy.Name FROM LightningComponentBundle WHERE DeveloperName = '${metaInfo.name}'`;
        } else {
          query = `SELECT LastModifiedBy.Name, LastModifiedDate, CreatedBy.Name FROM ${metaInfo.type} WHERE Name = '${metaInfo.name}'`;
        }
        if (query) {
          try {
            const { stdout } = await exec2(`sf data query -t -q "${query}" --json`, { cwd, maxBuffer: 50 * 1024 * 1024 });
            const res = JSON.parse(stdout);
            if (res && res.result && res.result.records && res.result.records.length > 0) {
              const record = res.result.records[0];
              sfAuthor = record.LastModifiedBy ? record.LastModifiedBy.Name : "Unknown";
              sfCreatedBy = record.CreatedBy ? record.CreatedBy.Name : "Unknown";
              sfTime = new Date(record.LastModifiedDate).toLocaleString();
            } else {
              sfAuthor = "Not found in Org";
              sfTime = "N/A";
              sfCreatedBy = "N/A";
            }
          } catch (e) {
            sfAuthor = "Query Error";
            sfTime = "N/A";
            sfCreatedBy = "N/A";
            ricwizLogger2.appendLine(`[WhoToBlame] Query error: ${e.message}`);
          }
        }
        try {
          const auditQuery = `SELECT Action, Display, CreatedBy.Name, CreatedDate FROM SetupAuditTrail ORDER BY CreatedDate DESC LIMIT 1500`;
          const { stdout: auditOut } = await exec2(`sf data query -q "${auditQuery}" --json`, { cwd, maxBuffer: 50 * 1024 * 1024 });
          const auditRes = JSON.parse(auditOut);
          if (auditRes && auditRes.result && auditRes.result.records) {
            const searchName = metaInfo.name.replace("__c", "");
            const matches = auditRes.result.records.filter(
              (r) => r.Display && r.Display.includes(searchName)
            );
            auditHistory = matches.map((r) => ({
              action: r.Action,
              display: r.Display,
              author: r.CreatedBy ? r.CreatedBy.Name : "Unknown",
              time: new Date(r.CreatedDate).toLocaleString()
            })).slice(0, 10);
          }
        } catch (e) {
          ricwizLogger2.appendLine(`[WhoToBlame] Audit trail query error: ${e.message}`);
        }
      });
    } catch (e) {
      ricwizLogger2.appendLine(`[WhoToBlame] Salesforce query error: ${e.message}`);
    }
  } else {
    sfAuthor = "Unsupported Metadata Type";
    sfTime = "N/A";
  }
  return {
    fileName,
    gitHistory,
    sfAuthor,
    sfTime,
    sfCreatedBy,
    auditHistory
  };
}

// src/commands/showPipelineLogs.ts
var vscode35 = __toESM(require("vscode"));
init_secrets();
var https4 = __toESM(require("https"));
async function showPipelineLogs(projectPath, pipelineId) {
  const cwd = getWorkspaceCwd();
  if (!cwd) return;
  const token = (await getGitlabToken())?.trim();
  if (!token) {
    vscode35.window.showErrorMessage("Ricwiz: GitLab token is not configured.");
    return;
  }
  try {
    const ctx = await WorkflowContext.initialize(cwd, { skipPrompt: true });
    if (!ctx) return;
    let webUrlOverride = ctx.getConfig("gitlabUrlOverride", "");
    let baseUrl = webUrlOverride;
    if (!baseUrl) {
      const { stdout: remotesOut } = await exec2(`git remote`, { cwd });
      const allRemotes = remotesOut.split("\n").map((r) => r.trim()).filter((r) => r);
      let found = false;
      for (const remote of allRemotes) {
        const { stdout } = await exec2(`git remote get-url ${remote}`, { cwd });
        let remoteUrl = stdout.trim();
        if (remoteUrl.endsWith(".git")) remoteUrl = remoteUrl.slice(0, -4);
        if (remoteUrl.startsWith("git@")) {
          remoteUrl = remoteUrl.replace("git@", "").replace(":", "/");
          remoteUrl = `https://${remoteUrl}`;
        }
        const urlObj = new URL(remoteUrl);
        let path8 = urlObj.pathname;
        if (path8.startsWith("/")) path8 = path8.substring(1);
        if (path8.endsWith("/")) path8 = path8.slice(0, -1);
        if (encodeURIComponent(path8) === projectPath || path8 === projectPath) {
          baseUrl = `${urlObj.protocol}//${urlObj.host}`;
          found = true;
          break;
        }
      }
      if (!found) {
        vscode35.window.showErrorMessage(`Ricwiz: Could not determine base URL for project ${projectPath}`);
        return;
      }
    } else {
      const urlObj = new URL(baseUrl);
      baseUrl = `${urlObj.protocol}//${urlObj.host}`;
    }
    await vscode35.window.withProgress({
      location: vscode35.ProgressLocation.Notification,
      title: `Fetching failed jobs for Pipeline #${pipelineId}...`,
      cancellable: false
    }, async () => {
      const agent = new https4.Agent({ keepAlive: true });
      const jobsUrl = new URL(`${baseUrl}/api/v4/projects/${projectPath}/pipelines/${pipelineId}/jobs?scope[]=failed`);
      const jobs = await new Promise((resolve) => {
        https4.get(jobsUrl, { headers: { "PRIVATE-TOKEN": token }, agent }, (res) => {
          let data = "";
          res.on("data", (chunk) => data += chunk);
          res.on("end", () => {
            if (res.statusCode === 200) {
              try {
                resolve(JSON.parse(data));
              } catch (e) {
                resolve([]);
              }
            } else {
              resolve([]);
            }
          });
        }).on("error", () => resolve([]));
      });
      if (!jobs || jobs.length === 0) {
        vscode35.window.showInformationMessage("Ricwiz: No failed jobs found for this pipeline.");
        return;
      }
      const failedJob = jobs[0];
      const traceUrl = new URL(`${baseUrl}/api/v4/projects/${projectPath}/jobs/${failedJob.id}/trace`);
      const logData = await new Promise((resolve) => {
        https4.get(traceUrl, { headers: { "PRIVATE-TOKEN": token }, agent }, (res) => {
          let data = "";
          res.on("data", (chunk) => data += chunk);
          res.on("end", () => resolve(data));
        }).on("error", (err) => resolve(`Failed to fetch log: ${err.message}`));
      });
      const cleanLog = logData.replace(/\x1B\[[0-9;]*[mK]/g, "");
      const channel = vscode35.window.createOutputChannel(`Pipeline #${pipelineId} - Job ${failedJob.name}`);
      channel.appendLine(`Pipeline ID: ${pipelineId}`);
      channel.appendLine(`Job Name: ${failedJob.name}`);
      channel.appendLine(`Status: ${failedJob.status}`);
      channel.appendLine(`URL: ${failedJob.web_url}`);
      channel.appendLine("========================================");
      channel.appendLine(cleanLog);
      channel.show();
    });
  } catch (e) {
    vscode35.window.showErrorMessage(`Ricwiz: Error fetching pipeline logs - ${e.message}`);
  }
}

// src/commands/aiCommands.ts
var vscode36 = __toESM(require("vscode"));
var cp2 = __toESM(require("child_process"));
async function runGeminiCLI(prompt, workspacePath, channel, token) {
  return new Promise((resolve, reject) => {
    let geminiPath = "gemini";
    const child = cp2.spawn(geminiPath, ["-y", "--output-format", "text"], {
      cwd: workspacePath,
      shell: true
    });
    child.stdin.write(prompt);
    child.stdin.end();
    if (token) {
      token.onCancellationRequested(() => {
        child.kill();
        reject(new Error("Operation cancelled by user."));
      });
    }
    let stdout = "";
    let stderr = "";
    child.stdout.on("data", (data) => {
      const text = data.toString();
      stdout += text;
      if (channel) channel.append(text);
    });
    child.stderr.on("data", (data) => {
      const text = data.toString();
      stderr += text;
      if (channel) channel.append(text);
    });
    child.on("error", (err) => {
      reject(new Error(`Failed to start Gemini CLI: ${err.message}. Is it installed and in your PATH?`));
    });
    child.on("close", (code) => {
      if (code === 0) {
        resolve(stdout.trim());
      } else {
        reject(new Error(`Gemini CLI failed with code ${code}: ${stderr || stdout}`));
      }
    });
  });
}
function extractCommitMessage(rawOutput) {
  if (!rawOutput || !rawOutput.trim()) {
    return "";
  }
  let text = rawOutput.trim();
  const hashMatch = text.match(/###\s*([^#\r\n]+)\s*###/);
  if (hashMatch && hashMatch[1]?.trim()) {
    text = hashMatch[1].trim();
  } else {
    const answerMatch = text.match(/###\s*Answer\s*###\s*:?\s*([^\r\n]+)/i);
    if (answerMatch && answerMatch[1]?.trim()) {
      text = answerMatch[1].trim();
    } else {
      const tagMatch = text.match(/<(?:commit_message|answer|output)>([\s\S]*?)<\/(?:commit_message|answer|output)>/i);
      if (tagMatch && tagMatch[1]?.trim()) {
        text = tagMatch[1].trim();
      } else {
        text = text.replace(/<(?:thought|think|thinking)[\s\S]*?<\/(?:thought|think|thinking)>/gi, "");
        const validLine = text.split(/\r?\n/).map((l) => l.trim()).find((l) => l.length > 0 && !/^alternative\b/i.test(l) && !/^(?:thinking|thought|here\s+is)/i.test(l));
        text = validLine || text;
      }
    }
  }
  let candidate = text.split(/\r?\n/)[0].trim();
  candidate = candidate.replace(/^#+|#+$/g, "").trim();
  candidate = candidate.replace(/^###\s*Answer\s*###\s*:?\s*/i, "");
  candidate = candidate.replace(/^[`"']+|[`"']+$/g, "").trim();
  candidate = candidate.replace(/^[-*•]\s+/, "");
  candidate = candidate.replace(/^\d+[\.\)]\s+/, "");
  candidate = candidate.replace(/^\[?[A-Z0-9]+(?:-[A-Z0-9]+)*-\d+(?:-\d+)?\]?\s*(?:-\s*|:\s*|\s+)?/i, "");
  candidate = candidate.replace(/\s+/g, " ").trim();
  if (candidate.length > 0 && /^[a-z]/.test(candidate)) {
    const isConventional = /^(feat|fix|docs|style|refactor|perf|test|build|ci|chore|revert)(\([^\)]+\))?:/.test(candidate);
    if (!isConventional) {
      candidate = candidate.charAt(0).toUpperCase() + candidate.slice(1);
    }
  }
  if (candidate.endsWith(".") && !candidate.endsWith("..")) {
    candidate = candidate.slice(0, -1).trim();
  }
  return candidate;
}
async function generateCommitMessage() {
  const workspaceFolders = vscode36.workspace.workspaceFolders;
  if (!workspaceFolders) {
    vscode36.window.showErrorMessage("No workspace folder found.");
    return;
  }
  const cwd = workspaceFolders[0].uri.fsPath;
  try {
    const diff = await new Promise((resolve, reject) => {
      const args = ["diff", "--cached", "-U1", "--no-ext-diff", "--no-color", "--", ".", ":(exclude)package-lock.json", ":(exclude)yarn.lock", ":(exclude)*.map", ":(exclude)*.min.js", ":(exclude)*.min.css"];
      cp2.execFile("git", args, { cwd, maxBuffer: 1024 * 1024 * 10 }, (err, stdout, stderr) => {
        if (err && !stdout) reject(err);
        else resolve(stdout);
      });
    });
    if (!diff.trim()) {
      vscode36.window.showInformationMessage("No staged changes found. Please stage your changes first.");
      return;
    }
    await vscode36.window.withProgress({
      location: vscode36.ProgressLocation.Notification,
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
${diff.slice(0, 1e4)}`;
      const channel = vscode36.window.createOutputChannel("Ricwiz AI: Commit Message");
      channel.show(true);
      channel.appendLine("--- Generating Commit Message ---");
      const branchPromise = getCurrentBranch(cwd);
      const msg = await runGeminiCLI(prompt, cwd, channel, token);
      channel.appendLine("\n--- Finished ---");
      const cleanedMsg = extractCommitMessage(msg);
      if (!cleanedMsg) {
        vscode36.window.showWarningMessage("Could not extract a valid commit message from Gemini output.");
        return;
      }
      const gitExt = vscode36.extensions.getExtension("vscode.git");
      if (gitExt && gitExt.isActive) {
        const git = gitExt.exports.getAPI(1);
        if (git.repositories.length > 0) {
          const repo = git.repositories[0];
          const current = repo.inputBox.value || "";
          const ticketPattern = /^[A-Z]+-\d+(?:-\d+)?\s*(?:-\s*|:\s*|\s+)?/i;
          const match = current.match(ticketPattern);
          if (match) {
            repo.inputBox.value = match[0] + cleanedMsg;
          } else {
            const currentBranch = await branchPromise;
            const config = vscode36.workspace.getConfiguration("ricwiz");
            const configPrefix = config.get("ticketPrefix", "SFPSCA-");
            const prefix = resolvePrefix(currentBranch, configPrefix);
            const ticketMatch = currentBranch.match(new RegExp(`(${prefix}\\d+(?:-\\d+)?)`, "i"));
            if (ticketMatch) {
              const suffix = config.get("commitMessageSuffix", "- ");
              repo.inputBox.value = `${ticketMatch[1].toUpperCase()}${suffix}` + cleanedMsg;
            } else {
              repo.inputBox.value = cleanedMsg;
            }
          }
          vscode36.window.showInformationMessage("Commit message generated and prefilled!");
        } else {
          vscode36.window.showInformationMessage("Generated: " + cleanedMsg);
        }
      } else {
        vscode36.window.showInformationMessage("Generated: " + cleanedMsg);
      }
    });
  } catch (e) {
    vscode36.window.showErrorMessage("Failed to generate commit message: " + e.message);
  }
}

// src/commands/index.ts
function registerAllCommands(context, webviewProvider2, forceUpdate) {
  context.subscriptions.push(
    vscode37.commands.registerCommand("ricwiz.conflictAction", executeConflictAction),
    vscode37.commands.registerCommand("ricwiz.generateDestructiveChanges", async () => {
      try {
        await generateDestructiveChanges();
      } finally {
        vscode37.commands.executeCommand("ricwiz.manualRefresh");
      }
    }),
    vscode37.commands.registerCommand("ricwiz.runSmartTests", async () => {
      try {
        await runSmartTests();
      } finally {
        vscode37.commands.executeCommand("ricwiz.manualRefresh");
      }
    }),
    vscode37.commands.registerCommand("ricwiz.refreshWebview", () => {
      if (webviewProvider2) vscode37.commands.executeCommand("workbench.action.webview.reloadWebviewAction");
    }),
    vscode37.commands.registerCommand("ricwiz.createBranches", async (ticket) => {
      try {
        await createBranches(ticket);
      } finally {
        vscode37.commands.executeCommand("ricwiz.manualRefresh");
      }
    }),
    vscode37.commands.registerCommand("ricwiz.prepareDeploy", async () => {
      try {
        await prepareDeploy();
      } finally {
        vscode37.commands.executeCommand("ricwiz.manualRefresh");
      }
    }),
    vscode37.commands.registerCommand("ricwiz.createMergeRequests", async () => {
      try {
        await createMergeRequests();
      } finally {
        vscode37.commands.executeCommand("ricwiz.manualRefresh");
      }
    }),
    vscode37.commands.registerCommand("ricwiz.createMergeRequestsVSCode", async () => {
      try {
        await createMergeRequestsVSCode();
      } finally {
        vscode37.commands.executeCommand("ricwiz.manualRefresh");
      }
    }),
    vscode37.commands.registerCommand("ricwiz.openJiraTicket", async () => {
      try {
        await openJiraTicket();
      } finally {
        vscode37.commands.executeCommand("ricwiz.manualRefresh");
      }
    }),
    vscode37.commands.registerCommand("ricwiz.openJiraTicketVSCode", async () => {
      try {
        await openJiraTicketVSCode();
      } finally {
        vscode37.commands.executeCommand("ricwiz.manualRefresh");
      }
    }),
    vscode37.commands.registerCommand("ricwiz.showJiraDetails", () => {
      if (webviewProvider2) showJiraDetails(webviewProvider2);
    }),
    vscode37.commands.registerCommand("ricwiz.openJiraDashboard", (indexOverride) => {
      if (webviewProvider2) openJiraDashboard(webviewProvider2, indexOverride);
    }),
    vscode37.commands.registerCommand("ricwiz.openJiraDetailsForId", (ticketId) => {
      if (webviewProvider2) openJiraDetailsForId(webviewProvider2, ticketId);
    }),
    vscode37.commands.registerCommand("ricwiz.toggleDashboardBranches", (show) => {
      if (webviewProvider2) {
        webviewProvider2.setDashboardShowBranches(show);
        vscode37.commands.executeCommand("ricwiz.openJiraDashboard");
      }
    }),
    vscode37.commands.registerCommand("ricwiz.changeJiraStatus", async () => {
      try {
        await changeJiraStatus();
      } finally {
        vscode37.commands.executeCommand("ricwiz.manualRefresh");
      }
    }),
    vscode37.commands.registerCommand("ricwiz.addJiraComment", async () => {
      try {
        await addJiraCommentCommand();
      } finally {
        vscode37.commands.executeCommand("ricwiz.manualRefresh");
      }
    }),
    vscode37.commands.registerCommand("ricwiz.addJiraLabel", async () => {
      try {
        await addJiraLabelCommand();
      } finally {
        vscode37.commands.executeCommand("ricwiz.manualRefresh");
      }
    }),
    vscode37.commands.registerCommand("ricwiz.setJiraToken", setJiraTokenCommand),
    vscode37.commands.registerCommand("ricwiz.setGitlabToken", setGitlabTokenCommand),
    vscode37.commands.registerCommand("ricwiz.syncAll", async () => {
      try {
        await syncAll();
      } finally {
        vscode37.commands.executeCommand("ricwiz.manualRefresh");
      }
    }),
    vscode37.commands.registerCommand("ricwiz.updateBases", async () => {
      try {
        await updateBases();
      } finally {
        vscode37.commands.executeCommand("ricwiz.manualRefresh");
      }
    }),
    vscode37.commands.registerCommand("ricwiz.deleteUnusedBranches", async () => {
      try {
        await deleteUnusedBranches();
      } finally {
        vscode37.commands.executeCommand("ricwiz.manualRefresh");
      }
    }),
    vscode37.commands.registerCommand("ricwiz.checkoutBranch", async (branchName) => {
      try {
        await checkoutBranch(branchName);
      } finally {
        vscode37.commands.executeCommand("ricwiz.manualRefresh");
      }
    }),
    vscode37.commands.registerCommand("ricwiz.copyBranchName", async () => {
      try {
        await copyBranchName();
      } finally {
        vscode37.commands.executeCommand("ricwiz.manualRefresh");
      }
    }),
    vscode37.commands.registerCommand("ricwiz.generatePackageXml", async () => {
      try {
        await generatePackageXml();
      } finally {
        vscode37.commands.executeCommand("ricwiz.manualRefresh");
      }
    }),
    vscode37.commands.registerCommand("ricwiz.deployPackage", async () => {
      try {
        await deployPackage();
      } finally {
        vscode37.commands.executeCommand("ricwiz.manualRefresh");
      }
    }),
    vscode37.commands.registerCommand("ricwiz.importData", async () => {
      try {
        await importData();
      } finally {
        vscode37.commands.executeCommand("ricwiz.manualRefresh");
      }
    }),
    vscode37.commands.registerCommand("ricwiz.listTicketFiles", async () => {
      try {
        await listTicketFiles();
      } finally {
        vscode37.commands.executeCommand("ricwiz.manualRefresh");
      }
    }),
    vscode37.commands.registerCommand("ricwiz.resetTracking", async () => {
      try {
        await resetTracking();
      } finally {
        vscode37.commands.executeCommand("ricwiz.manualRefresh");
      }
    }),
    vscode37.commands.registerCommand("ricwiz.extractComponent", async () => {
      try {
        await extractComponent();
      } finally {
        vscode37.commands.executeCommand("ricwiz.manualRefresh");
      }
    }),
    vscode37.commands.registerCommand("ricwiz.deployMultiOrg", async () => {
      try {
        await deployMultiOrg();
      } finally {
        vscode37.commands.executeCommand("ricwiz.manualRefresh");
      }
    }),
    vscode37.commands.registerCommand("ricwiz.captureAdminChanges", async () => {
      try {
        await captureAdminChanges();
      } finally {
        vscode37.commands.executeCommand("ricwiz.manualRefresh");
      }
    }),
    vscode37.commands.registerCommand("ricwiz.openHistory", async () => {
      try {
        await openHistory();
      } finally {
        vscode37.commands.executeCommand("ricwiz.manualRefresh");
      }
    }),
    vscode37.commands.registerCommand("ricwiz.searchTicket", async () => {
      try {
        await searchTicket();
      } finally {
        vscode37.commands.executeCommand("ricwiz.manualRefresh");
      }
    }),
    vscode37.commands.registerCommand("ricwiz.whoToBlame", async () => {
      const data = await getBlameData();
      if (data && webviewProvider2) {
        webviewProvider2.setBlameData(data);
        webviewProvider2.setPage("blame");
      }
    }),
    vscode37.commands.registerCommand("ricwiz.showPipelineLogs", (projectPath, pipelineId) => showPipelineLogs(projectPath, pipelineId)),
    vscode37.commands.registerCommand("ricwiz.manualRefresh", () => {
      if (forceUpdate) {
        forceUpdate();
      }
    }),
    vscode37.commands.registerCommand("ricwiz.toggleAutoRefresh", () => {
      if (webviewProvider2) {
        const newState = !webviewProvider2.isAutoRefreshEnabled();
        webviewProvider2.setAutoRefresh(newState);
        vscode37.workspace.getConfiguration("ricwiz").update("autoRefresh", newState, vscode37.ConfigurationTarget.Global);
      }
    }),
    vscode37.commands.registerCommand("ricwiz.openSettings", () => {
      vscode37.commands.executeCommand("workbench.action.openSettings", "ricwiz");
    }),
    vscode37.commands.registerCommand("ricwiz.generateCommitMessage", async () => {
      await generateCommitMessage();
    }),
    vscode37.commands.registerCommand("ricwiz.getTicketsBatch", async (ticketIds) => {
      const { fetchJiraIssuesBatch: fetchJiraIssuesBatch2 } = await Promise.resolve().then(() => (init_jiraApi(), jiraApi_exports));
      const results = await fetchJiraIssuesBatch2(ticketIds);
      return JSON.stringify(results);
    })
  );
}

// src/gitMonitor.ts
var vscode38 = __toESM(require("vscode"));
init_jiraApi();
function initializeGitMonitor(context, webviewProvider2, statusBarItem) {
  let forceUpdate;
  const initialAutoRefresh = vscode38.workspace.getConfiguration("ricwiz").get("autoRefresh", true);
  webviewProvider2?.setAutoRefresh(initialAutoRefresh);
  context.subscriptions.push(
    vscode38.workspace.onDidChangeConfiguration((e) => {
      if (e.affectsConfiguration("ricwiz.autoRefresh")) {
        const enabled = vscode38.workspace.getConfiguration("ricwiz").get("autoRefresh", true);
        webviewProvider2?.setAutoRefresh(enabled);
      }
    })
  );
  async function initGit() {
    const gitExtension = vscode38.extensions.getExtension("vscode.git");
    if (gitExtension) {
      let setupRepo2 = function(repo) {
        let lastBranch = "";
        let updateTimer;
        async function update() {
          const workspaceFolders = vscode38.workspace.workspaceFolders;
          if (!workspaceFolders) return;
          const cwd = workspaceFolders[0].uri.fsPath;
          const currentBranch = await getCurrentBranch(cwd);
          if (currentBranch && currentBranch !== lastBranch) {
            lastBranch = currentBranch;
            const config = vscode38.workspace.getConfiguration("ricwiz");
            let prefix = config.get("ticketPrefix", "SFPSCA-");
            if (!currentBranch.includes(prefix)) {
              const guessMatch = currentBranch.match(/([A-Z]+-)\d+/i);
              if (guessMatch) {
                prefix = guessMatch[1].toUpperCase();
              }
            }
            let relatedBranches = [];
            let commits = [];
            let baseBranches = [];
            let recentTickets = [];
            const ctx = await WorkflowContext.initialize(cwd, { skipPrompt: true });
            const environments = ctx?.environments || config.get("environments", [
              { name: "Qual", sourceBranch: "quality" },
              { name: "Val", sourceBranch: "validation" },
              { name: "Prod", sourceBranch: "main" }
            ]);
            try {
              const buttons = config.get("workspaceCheckoutButtons", ["main", "quality", "validation"]);
              baseBranches = Array.from(new Set(buttons));
            } catch (e) {
            }
            let ticketIdForJira = "";
            const match = currentBranch.match(new RegExp(`(${prefix}\\d+(?:-\\d+)?)`, "i"));
            if (match) {
              const ticketId = match[1].toUpperCase();
              ticketIdForJira = ticketId;
              const suffix = config.get("commitMessageSuffix", "- ");
              const existingTicketPattern = /^[A-Z]+-\d+(?:-\d+)?\s*(?:-\s*|:\s*|\s+)?/i;
              if (existingTicketPattern.test(repo.inputBox.value)) {
                if (!repo.inputBox.value.toUpperCase().startsWith(ticketId)) {
                  repo.inputBox.value = repo.inputBox.value.replace(existingTicketPattern, `${ticketId}${suffix}`);
                }
              } else {
                repo.inputBox.value = `${ticketId}${suffix}` + repo.inputBox.value;
              }
              statusBarItem.text = `$(bookmark) ${ticketId}`;
              statusBarItem.tooltip = `Branch: ${currentBranch}
Click to open Jira ticket`;
              statusBarItem.show();
              try {
                const relatedBranchNames = await findRelatedBranches(cwd, ticketId, "");
                relatedBranches = await getRelatedBranchesStatus(cwd, relatedBranchNames, ticketId, environments, ctx);
              } catch (e) {
              }
            } else {
              statusBarItem.hide();
              try {
                recentTickets = await getRecentTickets(cwd);
              } catch (e) {
              }
            }
            const [fetchedCommits, currentBranchIsMerged, jiraIssue] = await Promise.all([
              getRecentCommits(cwd, 10),
              getCurrentBranchMergeStatus(cwd, currentBranch, environments, ctx),
              ticketIdForJira ? fetchJiraIssue(ticketIdForJira).catch((e) => {
                let msg = e.message;
                if (msg && (msg.includes("ENOTFOUND") || msg.includes("network"))) {
                  msg = "No Internet or Invalid URL";
                }
                return { summary: `\u26A0\uFE0F Jira Error: ${msg}`, description: "", status: "" };
              }) : Promise.resolve(null)
            ]);
            commits = fetchedCommits;
            const ticketTitle = jiraIssue ? jiraIssue.summary : "";
            const ticketStatus = jiraIssue ? jiraIssue.status || "" : "";
            webviewProvider2?.updateBranch(currentBranch, currentBranchIsMerged, relatedBranches, commits, baseBranches, recentTickets, ticketTitle, ticketStatus);
          }
        }
        function scheduleUpdate() {
          if (!webviewProvider2?.isAutoRefreshEnabled()) {
            return;
          }
          if (updateTimer) {
            clearTimeout(updateTimer);
          }
          updateTimer = setTimeout(() => {
            lastBranch = "";
            update();
          }, 300);
        }
        forceUpdate = () => {
          lastBranch = "";
          update();
        };
        update();
        context.subscriptions.push(repo.state.onDidChange(() => scheduleUpdate()));
        context.subscriptions.push(vscode38.window.onDidChangeWindowState((e) => {
          if (e.focused) {
            scheduleUpdate();
          }
        }));
      };
      var setupRepo = setupRepo2;
      if (!gitExtension.isActive) {
        await gitExtension.activate();
      }
      const git = gitExtension.exports.getAPI(1);
      if (git.repositories.length > 0) {
        git.repositories.forEach((repo) => setupRepo2(repo));
      }
      git.onDidOpenRepository((repo) => setupRepo2(repo));
    }
  }
  initGit();
  return () => {
    if (forceUpdate) {
      forceUpdate();
    }
  };
}

// src/extension.ts
var webviewProvider;
async function activate(context) {
  await initializeSecrets(context);
  webviewProvider = new RicwizWebviewProvider(context.extensionUri);
  context.subscriptions.push(
    vscode39.window.registerWebviewViewProvider("ricwiz-webview", webviewProvider)
  );
  const statusBarItem = vscode39.window.createStatusBarItem(vscode39.StatusBarAlignment.Left, 100);
  statusBarItem.command = "ricwiz.openJiraTicket";
  context.subscriptions.push(statusBarItem);
  const forceUpdate = initializeGitMonitor(context, webviewProvider, statusBarItem);
  registerAllCommands(context, webviewProvider, forceUpdate);
  return {
    getJiraCredentials: async () => ({
      email: vscode39.workspace.getConfiguration("ricwiz").get("jiraEmail", ""),
      token: await getJiraToken()
    }),
    getGitLabToken: async () => getGitlabToken()
  };
}
function deactivate() {
}
// Annotate the CommonJS export names for ESM import in node:
0 && (module.exports = {
  activate,
  deactivate,
  webviewProvider
});
//# sourceMappingURL=extension.js.map
