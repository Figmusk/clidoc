---
name: clidoc
description: Turn terminal AI sessions into structured documentation. Use this skill when a user wants to document what they worked on, record decisions, create progress updates, or view a timeline of their sessions. Works like "git commit" for thinking — captures reasoning, not just code.
---

# Clidoc

Clidoc generates structured markdown documentation from your git changes. It reads your diffs, commits, and branch context, sends it to an LLM, and saves a clean session log to your repo.

## When to Use This Skill

Use this when the user:

- Finishes a coding session and wants to document what happened
- Wants to record a design or product decision with reasoning
- Needs a quick progress update
- Wants to review the current state of their work
- Asks to see a timeline of past sessions

## Commands

### Document a session (default)

```bash
npx clidoc
npx clidoc -n "refactored auth flow to use JWT"
```

Generates a session log in `docs/sessions/` with a summary, changes, decisions, reasoning, and next steps.

### Record a decision

```bash
npx clidoc decision -n "chose Postgres over Redis for session storage"
```

Saves a decision record to `docs/decisions/` capturing the reasoning and trade-offs.

### Quick progress update

```bash
npx clidoc update -n "auth module 80% done, blocking on rate limiting"
```

Lightweight status note saved to `docs/updates/`.

### Review current state

```bash
npx clidoc review
```

Summarizes the current state of work based on recent git activity.

### View timeline

```bash
npx clidoc timeline
```

Prints a timeline of all documented sessions. No API key needed.

## Setup

No install needed. First run asks for an OpenAI or Anthropic API key and saves it to `~/.clidoc/config.json`. Each user provides their own key.

## Requirements

- Node.js 18+
- A git repository with at least one commit
- An OpenAI or Anthropic API key

## How It Works

1. Reads git diff, recent commits, and current branch
2. Sends context (plus optional note) to an LLM
3. LLM generates structured documentation
4. Markdown file saved to `docs/` in the project
5. Index updated for timeline navigation

## Output Structure

```
docs/
  sessions/       # Session logs
  decisions/      # Decision records
  updates/        # Progress updates
  index.md        # Timeline index
```
