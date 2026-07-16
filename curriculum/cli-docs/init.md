---
title: 100xsystems init
description: Scaffold a new project — with an interactive wizard or direct mode
order: 1
category: setup
---

# `100xsystems init` — Scaffold a New Project

Create a new project directory with documentation templates, code scaffolding, and specification. This is the entry point for building any system.

## Usage

### Interactive Wizard (recommended)

```bash
100xsystems init
```

Without arguments, `init` launches an interactive wizard:

```
  ⚡ Choose a System
  Select which system you want to build:

    Claude Code  — Intermediate  (AI, CLI, TypeScript)
    Microservices  — Advanced  (Architecture, Distributed)
    Kubernetes  — Advanced  (Infrastructure, DevOps)
    ...

  ⚡ Choose a Language
    TypeScript
    Java

  ⚡ Ready to Scaffold
    System:   Claude Code
    Language: typescript
    Output:   ./claude-code-implementation

    ✅ Yes, scaffold it!
    ❌ Cancel
```

### Direct Mode (power users)

```bash
100xsystems init <system-slug> [options]
```

## Options

| Option | Alias | Description |
|--------|:-----:|-------------|
| `--lang <language>` | `-l` | Programming language (`typescript` or `java`) |
| `--output <path>` | `-o` | Output directory (default: `./<system>-implementation`) |
| `--author <username>` | `-a` | Your GitHub username (for templates) |

## Examples

```bash
# Interactive wizard — pick system, track, language
$ 100xsystems init
  ⚡ Choose a System → ⚡ Choose a Language → ⚡ Confirm

# Direct scaffold for claude-code with TypeScript
$ 100xsystems init claude-code

  100xSystems — "Claude Code" initialized

  ✓ Project created successfully!

  Documentation:
    📝 README.md
    📝 design/architecture.md
    📝 design/decisions.md
    📝 design/tradeoffs.md
    📝 specification/specification.md

  Code:
    📄 src/index.ts
    📄 package.json
    📄 tsconfig.json

  Config:
    ⚙️  .100x.json

  Next steps:
    cd claude-code-implementation
    100xsystems validate  → check your implementation

  Ready to submit? 100xsystems submit to create a review package
```

```bash
# Scaffold a Java project to a custom directory
100xsystems init microservices --lang java --output ./my-microservices -a john
```

## Behavior

- **No args**: Launches the interactive wizard (system → track → language → confirm)
- **With slug**: Scaffolds directly with the given system
- Validates that the system exists in `curriculum/systems/`
- Checks for required dependencies (Node.js, npm, Git) before scaffolding
- Creates the output directory (fails if it already exists and is non-empty)
- Reads the system specification and includes it in the template
- **Automatically marks the system as in-progress** in your progress tracker
- If authenticated with GitHub, uses your cached GitHub username as the author

## What Gets Created

| File | Purpose |
|------|---------|
| `README.md` | Project overview and setup instructions |
| `design/architecture.md` | Architecture documentation template |
| `design/decisions.md` | Engineering Decision Log template |
| `design/tradeoffs.md` | Trade-off analysis template |
| `specification/specification.md` | System specification with version |
| `src/` | Language-specific source code template |
| `.100x.json` | Project configuration (system slug, language, author) |

## See Also

- [systems](/cli-docs/systems) — Browse available systems
- [validate](/cli-docs/validate) — Check your implementation
- [submit](/cli-docs/submit) — Submit for review
