---
title: 100xsystems submit
description: Prepare a review package and create a GitHub Pull Request for human review
auth_required: true
order: 12
category: verification
---

# `100xsystems submit` — Submit for Human Review

Prepare a review package and create a GitHub Pull Request to submit your implementation for human review.

## Usage

```bash
100xsystems submit [system-slug]
```

*If run from a project directory with `.100x.json`, the system slug is auto-detected.*

## The Submission Process

```
Step 1: Validate  → Project checks + lesson completeness check
Step 2: Confirm   → Review validation results
Step 3: Auth      → GitHub authentication
Step 4: Metadata  → Repository URL, language, difficulty
Step 5: Build     → Review package creation
Step 6: PR        → Pull Request to 100xsystems/submissions
```

## Lesson Completeness Check

Before submitting, the CLI checks whether you've completed all lessons in the system:

- If you're **on the last lesson** — no warning, proceed
- If you're **not on the last lesson** — a warning is shown: *"Not all lessons completed. Complete all lessons before submitting."*
- If **no lesson progress is tracked** — a warning is shown: *"No lesson progress found. Run validation with --advance to track lessons."*

You can still submit with warnings, but it's recommended to complete all lessons first.

## Example

```bash
$ 100xsystems submit

  100xSystems — Submitting "Claude Code"

  ● ━━━ ● ━━━ ○ ━━━ ○
  Auth  Meta  Build  PR

  Step 1/4: Authenticating with GitHub...
    A browser window will open for GitHub authorization.

  ✓ Pull Request created successfully!

  → https://github.com/100xsystems/submissions/pull/42

  A reviewer will review your submission. Track the PR for updates.

  Submission details:
    System:   claude-code
    Author:   aryan
    Language: typescript
    Repo:     https://github.com/aryan/claude-code
    PR:       #42
```

## What Gets Submitted

The review package includes:

| Component | Description |
|-----------|-------------|
| `design/architecture.md` | System architecture documentation |
| `design/decisions.md` | Engineering Decision Log |
| `design/tradeoffs.md` | Trade-off analysis |
| `README.md` | Project overview |
| `metadata.json` | System, author, language, repository URL |
| `review-summary.json` | Validation results, file hashes |

## Requirements

- GitHub authentication (handled via browser-based OAuth)
- A repository URL pointing to your implementation
- `100xsystems validate` should pass (you can submit with failures, but it's not recommended)
- All lessons should be completed (warned but not blocked)

## Manual Submission

If PR automation fails, the CLI provides manual git commands:

```bash
git checkout -b submission/claude-code/review-2026-01-15
git add submissions/claude-code/
git commit -m "submission: claude-code by aryan"
git push origin submission/claude-code/review-2026-01-15
```

Then create a PR at: `https://github.com/100xsystems/submissions/compare`

## See Also

- [validate](/cli-docs/validate) — Check before submitting
- [progress](/cli-docs/progress) — Ensure all lessons are complete
- [login](/cli-docs/login) — Authenticate with GitHub
