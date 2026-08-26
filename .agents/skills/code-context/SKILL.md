---
name: code-context
description: >-
  When the user has a doubt or question about a piece of code, fetches full
  business and technical context from Jira by tracing the code back to its
  origin ticket via git blame, then batch-fetching all related tickets.
  Use this skill when the user asks "why does this code do X?", "what was the
  requirement for this?", "can I change this?", or any question about the
  intent or context behind existing code.
---

# Code Context — Jira-Backed Code Intelligence

## When to use this skill

Activate when the user:
- Has a doubt or question about why a piece of code exists or works a certain way
- Asks "what was the requirement for this?", "why is this here?", "can I change this?"
- Needs business context before changing existing code
- Wants to understand the intent behind a function, class, or configuration

---

## Procedure

### Step 1 — Identify the file and lines in question

From the user's question, determine:
- Which **file** the doubt is about (ask if unclear)
- Which **line range** is relevant (e.g. "45,60")

If the user pastes code directly, identify the file it belongs to using the workspace.

### Step 2 — Run git blame (Surgical Analysis)

Call `get_git_blame` with the identified file and line range:

```
get_git_blame(filepath, lines)
```

Parse the output to extract **commit hashes** and **commit messages** from each blamed line.

### Step 3 — Extract ticket IDs from blame output

Scan the commit messages for ticket IDs matching patterns like:
- `SFPSCA-1234`
- `SPF-1234`
- Any `[A-Z]+-\d+` pattern

Collect all unique ticket IDs found across the blamed lines.

### Step 4 — Fetch full Jira context (Scatter-Gather)

Call `get_tickets_batch` with all extracted ticket IDs:

```
get_tickets_batch(ticketIds)
```

The response includes for each ticket:
- `title` — the ticket summary
- `description` — full plain-text description (includes DoD if in description field)
- `parent` — epic or parent ticket
- `subtasks` — child tasks
- `issueLinks` — related, blocking, or blocked-by tickets

If any `issueLinks` reference tickets not already in the batch, fetch those too for complete context.

### Step 5 — Answer the user's question

With the full context gathered, answer the user's original question using:
- The **business requirement** from the ticket description
- The **technical spec** from the DoD or description
- The **relationships** (parent epic, linked tickets) for broader context
- The **git blame** to show exactly which commit introduced the code and why

Structure the answer as:

```
## Context for <file>:<lines>

**Origin:** <ticket ID> — <ticket title>
**Requirement:** <summary of what was required>
**Technical spec:** <DoD or relevant technical detail>

**Answer to your question:**
<direct answer informed by the context above>

**Related tickets:** (if relevant)
- <ticket> — <title> (<relationship>)
```

---

## Rules

- All output must be in English
- Always show WHICH ticket the code traces back to — never answer without the blame step
- If no ticket ID is found in blame (e.g. an old commit predating the convention), say so clearly and answer based on code analysis only
- If `get_git_blame` or `get_tickets_batch` are unavailable, fall back to code analysis only and inform the user that Jira context could not be fetched
- Never guess at business requirements — only state what is in the ticket
