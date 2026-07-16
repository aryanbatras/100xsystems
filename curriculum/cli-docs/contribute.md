---
title: "100xsystems contribute"
description: "Scaffold curriculum content — init systems, add tracks, and create lessons"
sidebar_position: 100
---

# 100xsystems contribute

Scaffold curriculum content directly from the CLI. Use this to create new systems, add language tracks, or add lessons to existing tracks inside the `curriculum/` directory.

> **Note:** This command is for **curriculum contributors** who are working inside the 100xSystems monorepo. It writes files directly to `curriculum/systems/`.

## Usage

```bash
100xsystems contribute init <slug> [options]
100xsystems contribute track <system> <language> [options]
100xsystems contribute lesson <system> [options]
```

## Actions

### `init` — Create a new system

Scaffolds a brand-new system with one track, one module, and one starter lesson.

```bash
100xsystems contribute init my-system --title "My System" --description "Learn my system" --difficulty Beginner
```

**Options:**

| Option | Alias | Description |
|--------|:-----:|-------------|
| `--title` | `-t` | System display title |
| `--description` | `-d` | Short system description |
| `--difficulty` | `-D` | Beginner, Intermediate, or Advanced |
| `--language` | `-l` | Programming language for the track (default: typescript) |
| `--tags` | `-g` | Comma-separated tags |

**Example output:**

```
  100xSystems — Curriculum Contribution

  ✓ Curriculum content created

  Location: /Users/you/100xsystems/curriculum/systems/my-system

  Files created:
    📄 index.md
    📄 track-typescript/module-1-introduction/lesson-01-introduction.md

  Next steps:
    1. Edit the generated Markdown files with lesson content
    2. Add knowledge_refs to link to knowledge base entries
    3. Run tests to validate your lessons
    4. Commit and push your changes

  Tip: Run 100xsystems contribute track my-system java to add another language track
```

### `track` — Add a language track

Add a new language track to an existing system.

```bash
100xsystems contribute track microservices rust --title "Rust Track" --difficulty Advanced
```

**Options:**

| Option | Alias | Description |
|--------|:-----:|-------------|
| `--title` | `-t` | Track display title (auto-generated if omitted) |
| `--difficulty` | `-D` | Difficulty level |

### `lesson` — Add a lesson

Add a new lesson to a module within a system's track.

```bash
100xsystems contribute lesson microservices --language rust --title "Async Messaging" --description "Implement async communication with message queues"
```

**Options:**

| Option | Alias | Description |
|--------|:-----:|-------------|
| `--language` | `-l` | Language to determine the track slug (default: typescript) |
| `--title` | `-t` | Lesson title (default: "New Lesson") |
| `--description` | `-d` | Lesson description |

The third positional argument specifies the module title (e.g., "New Module").

## Curriculum Directory Structure

After running `contribute init`, you get:

```
curriculum/systems/<slug>/
├── index.md                    # System metadata (title, description, difficulty, tags)
└── track-<language>/           # Language-specific track
    └── module-1-introduction/   # Module folder
        └── 01-lesson-intro-and-setup.md  # Lesson file
```

## See Also

- [init](/cli-docs/init) — Scaffold a user project (for learners, not contributors)
- [systems](/cli-docs/systems) — Browse available systems
