---
name: code-context
description: >-
  When the user has a doubt or question about a piece of code, fetches full
  business and technical context from Jira by tracing the code back to its
  origin ticket via git blame and git log history, then batch-fetching all
  related tickets. Use this skill when the user asks "why does this code do X?",
  "what was the requirement for this?", "can I change this?", or any question
  about the intent or context behind existing code.
---

# Code Context – Jira-Backed Code Intelligence

## When to use this skill

Activate when the user:
- Has a doubt or question about why a piece of code exists or works a certain way
- Asks "what was the requirement for this?", "why is this here?", "can I change this?"
- Needs business context before changing existing code
- Wants to understand the full history of a function, class, or configuration

---

## Procedure

### Step 1 – Identify the file and lines in question

From the user's question, determine:
- Which **file** the doubt is about (ask if unclear)
- Which **line range** is relevant (e.g. "45,60")

If the user pastes code directly, identify the file it belongs to using the workspace.

---

### Step 2 – Surgical Analysis (git blame)

Use your native ability to run terminal commands to execute `git blame` on the identified lines. To ignore whitespace and detect moved code, use:

```bash
git blame -w -C -C -L <start_line>,<end_line> <filepath>
```

Parse the output to extract:
- **Commit hashes** for each blamed line
- **Commit messages** – these contain the ticket IDs (e.g. `SFPSCA-1234 - Fix validation`)
- **Author** and **date** of each change

---

### Step 3 – Context Discovery (git log history)

Run git log to find ALL commits that ever touched the file, not just the current state:

```bash
git log --oneline --follow -- <filepath>
```

For deeper discovery, search the entire repo history for a relevant term (function name, variable, class):

```bash
git log -S "<search_term>" --oneline -- <filepath>
```

The `-S` flag (pickaxe) finds commits where the term was **added or removed** – revealing the full evolution of the code.

Also get the full message of the most relevant commits:

```bash
git show <commit_hash> --stat
```

---

### Step 4 – Extract all ticket IDs

From **both** the blame output and the git log history, scan commit messages for ticket IDs matching:
- `SFPSCA-1234`
- `SPF-1234`
- Any `[A-Z]+-\d+` pattern

Collect **all unique ticket IDs** found – blame gives the current state, log gives the full history.

---

### Step 5 – Fetch full Jira context

To get all the details from Jira, the `ricwiz` extension provides a local CLI script on the user's machine.
Run the following command in the terminal (using the `run_command` tool), passing all comma-separated IDs:

```bash
node ~/.ricwiz/jira-cli.js SFPSCA-1234,SFPSCA-5678
```

The command will return a JSON array. Parse this output. The relevant details for you will be:
- `title` – the ticket summary
- `description` – full plain-text description (includes DoD/technical spec)
- `type`, `status`, `assignee`, `priority` – issue metadata
- `labels`, `fixVersions` – useful for tracking releases and tags
- `parent` – epic or parent ticket
- `subtasks` – child tasks
- `issueLinks` – related, blocking, or blocked-by tickets (clones, etc.)

**Important Follow-ups**: If any `issueLinks` reference tickets not already in the batch, fetch those too for complete context by running the command again.

---

### Step 6 – Answer the user's question

With the full context gathered, answer using:
- The **business requirement** from the ticket description
- The **technical spec** from the DoD or description
- The **git history** to show how the code evolved over time
- The **relationships** (parent epic, fix versions, linked tickets) for broader context

Structure the answer as:

```
## Context for <file>:<lines>

**Origin:** <ticket ID> – <ticket title> (<type>, <status>)
**Introduced:** <date> by <author> (<commit hash>)
**Labels & Fix Versions:** <labels>, <fixVersions>
**Requirement:** <summary of what was required>
**Technical spec:** <DoD or relevant technical detail>

**History:** (if the code changed multiple times)
- <commit> – <ticket> – <what changed>

**Answer to your question:**
<direct answer informed by all the context above>

**Related tickets:** (if relevant)
- <ticket> – <title> (<relationship>)
```

---

## Critical Rules & Hints for Deep Analysis

1. **Check all issueLinks (clones and related) of the baseline story**: If a ticket description mentions future enhancements (e.g., "Additional enhancements will be covered in ticket X") or if you are explicitly asked to check linked tickets, **do a deep investigation**. Follow the links to validate if those "future" tickets were already implemented and merged into the current code, instead of just assuming they remain planned for the future.
2. **Analyze functional/architectural logic changes, not just fixes**: Commits for large enhancements are sometimes vaguely described (e.g. "Logic Update" or "Phase 2"). Always look beyond bug fixes and actively identify behavioral or structural logic changes.
3. **Look for references to 'enhancements' in ticket descriptions**: Prioritize cross-referencing phrases like "Additional enhancements to the flexibility... will be covered in ticket X" to trace the full narrative of a feature's evolution.
4. **Search tickets in the corresponding Epic or Fix Version**: If you know a ticket is part of a larger project (e.g., Epic C360, Release 16, or a specific `fixVersion` returned by the API), check how other tickets in that same Epic/Version might have affected the file in question.

## General Rules
- All output must be in English.
- Always run **both** git blame AND git log – blame shows the current state, log shows the full story.
- Always show WHICH ticket the code traces back to – never answer without the blame step.
- If no ticket ID is found (e.g. an old commit predating the convention), say so clearly and answer based on code analysis and git history only.
- If the `~/.ricwiz/jira-cli.js` script fails (e.g. extension inactive) or is unavailable, fail gracefully and answer based on `git log` analysis alone, informing the user that Jira context could not be loaded.
- Never guess at business requirements – only state what is explicitly documented in the ticket or git history.
