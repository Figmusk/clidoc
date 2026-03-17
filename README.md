# clidoc

**The designer's git commit — capture thinking, not just code.**

Git tracks what you built. Clidoc tracks **why you built it**.

After any terminal AI session (Claude, Copilot, Cursor, or just coding), run one command and get a structured markdown doc of what happened, what you decided, and what's next.

---

## Quick Start

```bash
npx clidoc -n "what you worked on"
```

First run asks for your API key (OpenAI or Anthropic). After that, it just works.

---

## Why

If you use AI tools in the terminal, you know this problem:

- You finish a session and close the tab
- The reasoning behind your changes is gone
- Decisions disappear into chat history
- There's no record of *why* things were built the way they were

Git solves code history. Clidoc solves **thinking history**.

---

## Commands

### Document a session

```bash
npx clidoc
npx clidoc -n "refactored auth flow to use JWT"
```

Generates a structured session log in `docs/sessions/`. Reads your git diff, recent commits, and branch — then uses an LLM to create a clean summary of what happened and why.

### Record a decision

```bash
npx clidoc decision -n "chose Postgres over Redis for session storage"
```

Saves a decision record to `docs/decisions/`. Captures the reasoning and trade-offs behind a specific choice.

### Quick progress update

```bash
npx clidoc update -n "auth module 80% done, blocking on rate limiting"
```

Lightweight status note saved to `docs/updates/`.

### Review current state

```bash
npx clidoc review
```

Summarizes the current state of your work based on recent git activity.

### View your timeline

```bash
npx clidoc timeline
```

Prints a timeline of all your documented sessions. No API key needed.

```
  Clidoc Timeline

  2026-03-17 14:32 – refactored auth flow to use JWT
  2026-03-17 16:05 – chose Postgres over Redis for session storage
  2026-03-16 11:20 – initial project scaffolding
```

---

## What it generates

Each run creates a markdown file like this:

```markdown
# 2026-03-17 – Session Log

> Refactored auth flow to use JWT

## Summary
Replaced cookie-based sessions with JWT tokens across the auth module.

## Changes
- Removed express-session dependency
- Added jsonwebtoken for token signing
- Updated middleware to validate Bearer tokens

## Decisions
- Chose JWT over session cookies for stateless scaling

## Reasoning
- App is moving to a multi-region deployment where sticky sessions aren't viable

## Next Steps
- Add refresh token rotation
- Write tests for token expiry edge cases
```

---

## Setup

No install needed. Just run with `npx`.

On first run, clidoc asks for your API key and saves it to `~/.clidoc/config.json`. You only do this once.

**Supported providers:**
- OpenAI (default)
- Anthropic

You can also set your key via environment variable:

```bash
export OPENAI_API_KEY=sk-...
# or
export ANTHROPIC_API_KEY=sk-...
```

---

## How it works

1. You run `npx clidoc` from any git project
2. Clidoc reads your git diff, recent commits, and branch name
3. It sends that context (plus your optional note) to an LLM
4. The LLM generates structured documentation
5. A markdown file is saved to `docs/` in your project
6. An index is updated for easy navigation

Everything stays local, in your repo, as markdown files.

---

## File structure

Clidoc creates a `docs/` folder in your project:

```
docs/
  sessions/       # Session logs
  decisions/      # Decision records
  updates/        # Progress updates
  index.md        # Timeline index
```

---

## Configuration

Set via environment variables:

| Variable | Default | Description |
|---|---|---|
| `OPENAI_API_KEY` | — | OpenAI API key |
| `ANTHROPIC_API_KEY` | — | Anthropic API key |
| `CLIDOC_PROVIDER` | `openai` | LLM provider (`openai` or `anthropic`) |
| `CLIDOC_MODEL` | `gpt-4o` | Model to use |
| `CLIDOC_OUTPUT_DIR` | `docs` | Output directory |

---

## Requirements

- Node.js 18+
- A git repository with at least one commit
- An OpenAI or Anthropic API key

---

## Who is this for

- Designers building in code
- AI-native developers
- Indie hackers
- Anyone who uses terminal AI tools and wants to remember what they did and why

---

## License

MIT
