---
title: 100xsystems (master)
description: Interactive terminal dashboard with SYSTEMS/BUILD/DOCTOR tabs
order: 0
category: setup
---

# `100xsystems` — Interactive Dashboard (Master Command)

The brand-anchor command for 100xSystems CLI. Opens an interactive terminal dashboard with tabbed panels and a command input bar. This is the **first command** every user should run after installing the CLI.

## Usage

```bash
# Open the interactive dashboard (no arguments)
100xsystems

# Type commands directly in the input bar at the bottom
# e.g., "init claude-code", "doctor", "validate"
```

## Dashboard Layout

```
  ⚡ 100xsystems SYSTEMS ENGINE                    [Tab] modes · [Ctrl+M] menu

  ┌─────────┐  ┌──────┐  ┌────────┐
  │● SYSTEMS│  │ BUILD│  │ DOCTOR │
  └─────────┘  └──────┘  └────────┘

  ┌─── Workspace ─────────────────────┐  ╔═══ Tab Content ═══════════════════╗
  │                                  ║  ║                                    ║
  │ Systems: 11                      ║  ║  [Content changes based on        ║
  │ Templates: TypeScript / Java     ║  ║   active tab]                      ║
  │                                  ║  ║                                    ║
  │ ──────────────────────────────── ║  ║                                    ║
  │                                  ║  ║                                    ║
  │ Available Systems                ║  ║                                    ║
  │   init claude-code               ║  ║                                    ║
  │   init kubernetes                ║  ║                                    ║
  │   init microservices             ║  ║                                    ║
  │   ...                            ║  ║                                    ║
  └──────────────────────────────────┘  ╚════════════════════════════════════╝

  ╔══ 100xsystems ❯ ═══════════════════════════════════════════════════════╗
  ║ Type a command: init, validate, submit, progress, doctor, list...     ║
  ╚═══════════════════════════════════════════════════════════════════════╝
```

## Tabs (press `Tab` to cycle)

### SYSTEMS Tab
Shows an overview of the system catalog. Switch to the BUILD tab or type `init <slug>` in the input bar to start building a system.

### BUILD Tab
Quick-start building any system. Shows available systems with one-click access. Type the system name to scaffold a project.

### DOCTOR Tab
Overview of the environment doctor. Run `doctor` in the input bar to check your development environment for required tools (Node.js, Git, Docker, etc.).

## Command Input Bar

Type any command in the input bar at the bottom and press `Enter` to execute it. Supported commands:

| Command | Description |
|---------|-------------|
| `init <system>` | Scaffold a new project |
| `list` | Quick system listing |
| `doctor` | Check development environment |
| `validate` | Check implementation against spec |
| `submit` | Submit for human review |
| `progress` | Per-system and per-lesson progress |
| `auth` | Check authentication status |
| `login` | Authenticate with GitHub |
| `logout` | Clear authentication |
| `update` | Check for CLI updates |
| `contribute` | Scaffold curriculum content |

Typing an unknown command shows a temporary message.

## Keyboard Shortcuts

| Key | Action |
|:---:|--------|
| **Tab** | Cycle through tabs (SYSTEMS → BUILD → DOCTOR) |
| **Ctrl+M** | Toggle command palette |
| **Esc** | Close command palette |
| **Enter** | Execute typed command |
| **Backspace** | Edit input |

## Why `100xsystems`?

This is the **master command** — the default entry point to the CLI. Instead of remembering which subcommand does what, everything is visible:

- **SYSTEMS tab** — Discover available systems
- **BUILD tab** — Quick-start building
- **DOCTOR tab** — Environment overview
- **Input bar** — Run any subcommand by name
- **Command palette** (Ctrl+M) — Browse all available commands

## See Also

- [init](/cli-docs/init) — Start building a system (interactive wizard)
- [validate](/cli-docs/validate) — Check your implementation
- [submit](/cli-docs/submit) — Submit for review
- [progress](/cli-docs/progress) — Per-lesson progress detail
- [doctor](/cli-docs/doctor) — Check development environment
