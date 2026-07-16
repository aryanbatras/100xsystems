---
title: 100xsystems validate
description: Check your implementation against the system specification — with per-lesson validation and auto-advance
order: 10
category: verification
---

# `100xsystems validate` — Check Your Implementation

The core validation command. Checks your project against documentation standards, structure requirements, lesson-specific validators, and the system specification.

## Usage

```bash
100xsystems validate [options]
```

*Must be run from a project directory created by `100xsystems init`.*

## Options

| Option | Alias | Description |
|--------|:-----:|-------------|
| `--lesson <slug>` | `-l` | Only validate a specific lesson by its slug |
| `--advance` | `-a` | Auto-advance to the next lesson on successful validation |

## Examples

### Basic validation (auto-detects current lesson from progress)

```bash
$ 100xsystems validate

  100xSystems — Validation Report
  Project: Claude Code

  📘 Validating
  Introduction to Claude Code

  ✓ README.md exists
  ✓ Architecture documentation exists
  ✓ Engineering decisions documented
  ✓ Trade-offs documented
  ✓ Source code directory exists
  ✓ Project configuration (.100x.json) has valid schema
  ✓ Git repository initialized and has commits
  ✓ Lesson validators passed
  ✓ Specification checks passed

  ─────────────────────────────────────
  Result: 9 passed, 0 failed, 0 warnings
  All checks passed!
```

### Validate a specific lesson

```bash
100xsystems validate --lesson lesson-03-tool-registry
```

### Validate and auto-advance

When you finish a lesson, use `--advance` to mark it complete and move to the next one:

```bash
100xsystems validate --advance
```

If all checks pass, you'll see:

```
  📘 Validating
  Introduction to Claude Code

  ✓ Advanced to next lesson
  ✓ All checks passed!
```

If some checks fail, `--advance` won't advance — you must fix the issues first.

### Combine with specific lesson

```bash
100xsystems validate --lesson lesson-03-tool-registry --advance
```

## How Lesson Targeting Works

1. If `--lesson <slug>` is provided, **only that lesson's validators run**
2. If `--lesson` is omitted, the CLI looks up your **current lesson** from `~/.100x/progress.json`
3. If no current lesson is set, only doc/structure/spec checks run (no lesson-specific validators)
4. Use `100xsystems validate --advance` to start tracking your current lesson

## Validation Categories

### Documentation (4 checks)

| Check | Description |
|-------|-------------|
| `README.md` | Project must have a README file |
| Architecture | `design/architecture.md` must describe components |
| Decisions | `design/decisions.md` must document engineering decisions |
| Trade-offs | `design/tradeoffs.md` must acknowledge trade-offs |

### Structure (2 checks)

| Check | Description |
|-------|-------------|
| Source code | `src/` directory must exist with code files |
| Config | `.100x.json` must have valid schema |

### Git (2 checks)

| Check | Description |
|-------|-------------|
| Repository | Must be a Git repo with at least one commit |
| Doc sync | Documentation is up-to-date with code changes |

### Lesson Validators (from curriculum)

Executes any validation steps defined in the lesson frontmatter of the system's track. These are system-specific checks written by the curriculum author. When `--lesson` is specified, only that lesson's validators run.

### Specification Checks (from SPECIFICATION.md)

Runs machine-readable checks defined in the system's specification:
- **file-exists** — Required files exist
- **doc-section** — Required sections in documentation
- **doc-contains** — Keywords mentioned in docs
- **file-count-min** — Minimum files in a directory
- **test-passes** — Test commands exit successfully
- **custom-command** — Arbitrary validation commands

## Behavior

- Reads the project configuration from `.100x.json`
- Detects which system and language the project uses
- If `--lesson` is given, only runs validators for that lesson
- If `--lesson` is omitted, uses the current lesson from progress tracking
- If `--advance` is set and all checks pass, moves to the next lesson in the track
- Returns a structured report with pass/warn/fail per check
- Results are sorted: failures first, then warnings, then passes

## See Also

- [init](/cli-docs/init) — Create a new project
- [progress](/cli-docs/progress) — Track per-lesson progress
- [submit](/cli-docs/submit) — Submit for review
