---
title: 100xsystems progress
description: Shows per-lesson progress for the current project
order: 4
category: assessment
---

# `100xsystems progress` — Project Progress

Shows your per-lesson progress for the current project. Must be run **inside a project directory** that was scaffolded with `100xsystems init`.

## Usage

```bash
# Run inside a scaffolded project directory
cd my-project
100xsystems progress
```

If run outside a project (no `.100x.json` found), it shows an error with guidance.

## What It Shows

```
  📊 Claude Code — Progress

  System:   Claude Code
  Language: typescript
  Status:   ▶ in-progress · Started Apr 1, 2026
  Project:  /home/user/projects/claude-code

  Track: TypeScript Track

    Module 1: CLI Foundations
      4 lessons
      ✓ Introduction to Claude Code
      ✓ Setting up your environment
      ▶ Building your first command  ← current
      ○ Testing the CLI

    Module 2: Advanced Features
      3 lessons
      ○ File system operations
      ○ AI integration
      ○ Package and publish

  Actions
  100xsystems validate --lesson building-your-first-command  → validate current lesson
  100xsystems validate --advance                              → validate & advance
  100xsystems submit                                          → submit for review
```

## Status Icons

| Icon | Meaning |
|:----:|---------|
| `✓` | Lesson completed (past) |
| `▶` | Current lesson |
| `○` | Not yet started |

## Integration with `validate`

The progress command reads the `currentLesson` from your progress tracking (stored in `~/.100x/progress.json`). Use `100xsystems validate --advance` to move to the next lesson after passing validation.

## See Also

- [validate](/cli-docs/validate) — Check your implementation
- [submit](/cli-docs/submit) — Submit for review
- [init](/cli-docs/init) — Start a new project
