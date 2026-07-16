# 100xSystems CLI Documentation

The **100xSystems CLI** (`100xsystems`) is your daily engineering companion. It provides interactive tools for learning, building, testing, and submitting software systems — all from your terminal.

## Quick Start

```bash
# Install globally
npm install -g @100xsystems/cli

# See all available systems
100xsystems

# Start building a system interactively
100xsystems init

# Check your environment
100xsystems doctor
```

## Available Commands

| Command | Description | Auth Required |
|---------|-------------|:---:|
| [100xsystems](/cli-docs/systems) | Master command — interactive dashboard with SYSTEMS/BUILD/DOCTOR tabs | No |
| [init](/cli-docs/init) | Scaffold a new project (interactive wizard) | No |
| [validate](/cli-docs/validate) | Check implementation against spec | No |
| [submit](/cli-docs/submit) | Submit for human review | Yes |
| [progress](/cli-docs/progress) | Per-system and per-lesson progress | No |
| [list](/cli-docs/list) | Quick system listing | No |
| [login](/cli-docs/login) | Authenticate with GitHub | No |
| [logout](/cli-docs/logout) | Clear authentication | No |
| [auth](/cli-docs/auth) | Check auth status | No |
| [doctor](/cli-docs/doctor) | Check dev environment | No |
| [update](/cli-docs/update) | Check for CLI updates | No |
| [contribute](/cli-docs/contribute) | Scaffold curriculum content | No |

## Architecture

The CLI is built with [Ink](https://github.com/vadimdemedes/ink) (React for CLI) and [Pastel](https://github.com/vadimdemedes/pastel) (command framework). It reads all curriculum content from the local filesystem — no server required.

```
CLI Runtime (Ink + Pastel)
    ├── Commands (React components)
    ├── Actions (business logic)
    ├── Readers (curriculum file parsers)
    └── UI (shared components)
            ↓
Curriculum Directory (curriculum/)
    ├── systems/
    ├── knowledge-base/
    └── cli-docs/
```

## Key Concepts

- **Systems** — Complete engineering domains (e.g., Microservices, Kubernetes) with tracks, modules, and lessons
- **Tracks** — Language/framework-specific learning paths within a system
- **Modules** — Grouped lessons within a track
- **Lessons** — Individual learning units with content, quizzes, and challenges
- **Progress Tracking** — Per-lesson state saved locally in `~/.100x/progress.json`
- **Review Packages** — Bundled documentation and metadata submitted for human review

## Workflow

```
1. 100xsystems           → Interactive dashboard with SYSTEMS/BUILD/DOCTOR tabs
2. 100xsystems init      → Interactive wizard: pick system → track → language
3. Build                 → Implement the system in your own repo
4. 100xsystems validate  → Check your implementation (with --lesson or --advance)
5. 100xsystems submit    → Submit for human review via GitHub PR
```
