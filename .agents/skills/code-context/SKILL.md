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

# Code Context — Jira-Backed Code Intelligence

## When to use this skill

Activate when the user:
- Has a doubt or question about why a piece of code exists or works a certain way
- Asks "what was the requirement for this?", "why is this here?", "can I change this?"
- Needs business context before changing existing code
- Wants to understand the full history of a function, class, or configuration

---

## Procedure

### Step 1 — Identify the file and lines in question

From the user's question, determine:
- Which **file** the doubt is about (ask if unclear)
- Which **line range** is relevant (e.g. "45,60")

If the user pastes code directly, identify the file it belongs to using the workspace.

---

### Step 2 — Surgical Analysis (git blame)

Use the `get_git_blame` tool (provided by the ricwiz extension) for the identified file and line range. 
Do NOT prefix it with `default_api:`.

```json
{
  "filepath": "path/to/file",
  "lines": "start,end"
}
```

Parse the output to extract:
- **Commit hashes** for each blamed line
- **Commit messages** — these contain the ticket IDs (e.g. `SFPSCA-1234 - Fix validation`)
- **Author** and **date** of each change

---

### Step 3 — Context Discovery (git log history)

Run git log to find ALL commits that ever touched the file, not just the current state:

```bash
git log --oneline --follow -- <filepath>
```

For deeper discovery, search the entire repo history for a relevant term (function name, variable, class):

```bash
git log -S "<search_term>" --oneline -- <filepath>
```

The `-S` flag (pickaxe) finds commits where the term was **added or removed** — revealing the full evolution of the code.

Also get the full message of the most relevant commits:

```bash
git show <commit_hash> --stat
```

---

### Step 4 — Extract all ticket IDs

From **both** the blame output and the git log history, scan commit messages for ticket IDs matching:
- `SFPSCA-1234`
- `SPF-1234`
- Any `[A-Z]+-\d+` pattern

Collect **all unique ticket IDs** found — blame gives the current state, log gives the full history.

---

### Step 5 — Fetch full Jira context

Use the `get_tickets_batch` tool (provided by the ricwiz extension) to fetch all extracted ticket IDs in a single request. 
Do NOT prefix it with `default_api:` and make sure to use the exact name `get_tickets_batch`.

```json
{
  "ticketIds": ["SFPSCA-1234", "SFPSCA-5678"]
}
```

The response includes for each ticket:
- `title` — the ticket summary
- `description` — full plain-text description (includes DoD/technical spec)
- `parent` — epic or parent ticket
- `subtasks` — child tasks
- `issueLinks` — related, blocking, or blocked-by tickets

If any `issueLinks` reference tickets not already in the batch, fetch those too for complete context.

---

### Step 6 — Answer the user's question

With the full context gathered, answer using:
- The **business requirement** from the ticket description
- The **technical spec** from the DoD or description
- The **git history** to show how the code evolved over time
- The **relationships** (parent epic, linked tickets) for broader context

Structure the answer as:

```
## Context for <file>:<lines>

**Origin:** <ticket ID> — <ticket title>
**Introduced:** <date> by <author> (<commit hash>)
**Requirement:** <summary of what was required>
**Technical spec:** <DoD or relevant technical detail>

**History:** (if the code changed multiple times)
- <commit> — <ticket> — <what changed>

**Answer to your question:**
<direct answer informed by all the context above>

**Related tickets:** (if relevant)
- <ticket> — <title> (<relationship>)
```

---

## Rules

- All output must be in English
- Always run **both** git blame AND git log — blame shows the current state, log shows the full story
- Always show WHICH ticket the code traces back to — never answer without the blame step
- If no ticket ID is found (e.g. an old commit predating the convention), say so clearly and answer based on code analysis and git history only
- If `get_git_blame` or `get_tickets_batch` tools fail or are unavailable, fall back to git log analysis only and inform the user that Jira context could not be fetched
- Never guess at business requirements — only state what is in the ticket
