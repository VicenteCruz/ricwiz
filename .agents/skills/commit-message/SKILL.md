---
name: commit-message
description: >-
  Generates the description part of a git commit message based on staged changes (git diff --cached).
  The ticket prefix (e.g. SFPSCA-1234 - ) is already handled by the ricwiz VS Code extension.
  Use this skill when the user asks to generate, suggest, or write a commit message.
---

# Commit Message Generator

## When to use this skill

Activate when the user asks to:
- Generate a commit message
- Suggest what to write in the commit
- "What should I write in the commit?"
- Any variation of needing a git commit description

---

## Procedure

### Step 1 — Get the staged diff

Always run these commands in the workspace root to get the state:

```bash
git status
```
This lets you check if there are any modified but unstaged files. If so, you may want to ask the user if they intended to stage them.

```bash
git diff --cached --stat
```

This gives an overview of which files changed and how many lines. Use it to understand the scope and identify the most important files.

Then run:

```bash
git diff --cached
```

This gives the full diff. Se o output for demasiado longo (ex: ficheiros gerados, locks), cancela e corre `git diff --cached -- <ficheiros chave>` apenas para os ficheiros cruciais identificados no `--stat`.

If both commands return empty output, inform the user: _"No staged files found. Run `git add <files>` first."_

### Step 2 — Analyze the diff

Read the diff carefully and identify:
- **What changed**: which files, which logic, which data structures
- **Why it likely changed**: infer the intent from the code (e.g., bug fix, new field, refactor, config update)
- **Scope**: is it isolated to one component or cross-cutting?

### Step 3 — Generate the description

Write a **single, concise commit message description** in English that:
- Starts with a capital letter
- Uses the imperative mood ("Add", "Fix", "Update", "Remove", "Refactor")
- Is **under 72 characters**
- Describes WHAT changed and WHY (if inferrable), NOT how
- Does **NOT** include the ticket number (the ricwiz extension already handles that)
- Does **NOT** use backticks, quotes, or any punctuation at the start

### Step 4 – Output & Auto-Prefill

If the user just asks for suggestions, present the result clearly so they can copy it:

```
<description>
```
Alternative: `<description>`

**AUTO-PREFILL COMMAND:**
If the user explicitly asks you to "prefill", "write it", "apply it", or "put it in the box", you MUST automatically inject the message into their VS Code Source Control input box. 
To do this, use your terminal to run the following command (replacing `<generated_message>` with URL-encoded text):

```bash
node -e "require('child_process').exec('code --open-url \"vscode://VicenteCruz.ricwiz/setCommitMessage?msg=' + encodeURIComponent('<generated_message>') + '\"')"
```
*Note: We wrap it in a Node script to easily URL-encode the message so spaces and special characters don't break the URI.*

After running it, tell the user: *"I have prefilled the commit message in your Source Control panel! You can review and click Commit."*

---

## Examples

| Diff summary | Good description |
|---|---|
| Added CPF field to checkout form with validation | `Add CPF field with validation to checkout form` |
| Fixed null pointer on UserService.getById | `Fix null pointer exception in UserService.getById` |
| Changed API timeout from 5s to 30s in config | `Increase API timeout to 30s in configuration` |
| Added 3 new profiles to custom metadata | `Add custom metadata records for new profiles` |
| Refactored deployment script to use loops | `Refactor deployment script to remove duplication` |

---

## Rules

- **All output must be in English** — commit message, alternatives, and any explanations
- Se a intenção do código for ambígua e impossível de deduzir, pergunta ao utilizador o motivo da alteração antes de gerares a mensagem final.
- Never include the ticket ID — the extension already prepends it
- Never generate multi-line commit messages unless explicitly asked
- Prefer specificity over vagueness ("Fix null check on Account trigger" > "Fix bug")
- Ignore build artifact files (`out/`, `dist/`, `*.map`) when forming the description
- If the diff is very large, use the `--stat` summary to identify the most important files first
