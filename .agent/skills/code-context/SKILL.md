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

Run `git blame` in the terminal for the identified file and line range:

```bash
git blame -L <start>,<end> -- <filepath>
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

**Formatting Rules**:
- Clean extracted keys: strip surrounding brackets, colons, or dashes (e.g. `"[SFPSCA-1234]"` → `"SFPSCA-1234"`).
- Normalize to uppercase (e.g. `"sfpsca-1234"` → `"SFPSCA-1234"`).
- Deduplicate into a clean `string[]` array.

---

### Step 5 — Fetch full Jira context (Scatter-Gather)

Fetch the full Jira context in a **single batch request** by executing the internal `ricwiz` CLI tool:

```bash
node out/cli.js get-tickets SFPSCA-1234 SFPSCA-5678
```

*(You can pass multiple ticket IDs separated by spaces).*

**Response Format (`BatchIssueResult[]`)**:
The script returns a JSON array of issue objects:
```json
[
  {
    "key": "SFPSCA-1234",
    "title": "Add validation for checkout branch",
    "status": "In Progress",
    "assignee": "Vicente Cruz",
    "priority": "High",
    "description": "Plain-text ticket description and DoD requirements...",
    "parent": { "key": "SFPSCA-1000", "title": "Epic: Branch Helper" },
    "subtasks": [{ "key": "SFPSCA-1235", "title": "Unit tests" }],
    "issueLinks": [{ "type": "blocks", "issue": { "key": "SFPSCA-1240", "title": "Deploy to Qual" } }]
  }
]
```

If any `issueLinks` or `parent` reference tickets not already in the batch, fetch those too if needed for complete context.

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
- If `get_tickets_batch` or Jira credentials are unavailable, fall back to git blame and git log analysis only and inform the user that Jira context could not be fetched
- Never guess at business requirements — only state what is in the ticket
- The more inportant are the User Stories and Technical Stories. Everything else can be put after each user stories and technical stories to give context like bugs, etc. If you can't relate, create a section with all the changes that are not User Stories and Technical Storie