---
title: 100xsystems list
description: List all available systems or view details for a specific system
order: 2
category: system
---

# `100xsystems list` — Browse Available Systems

List all available systems in the curriculum, or view detailed information about a specific system.

## Usage

```bash
# List all systems
100xsystems list

# View details for a specific system
100xsystems list <system-slug>
```

## Examples

### List all systems

```bash
$ 100xsystems list

  100xSystems — Available Systems

  Claude Code
  Build an AI-powered coding assistant using Claude Code
  Intermediate · AI · CLI · TypeScript
  100xsystems list claude-code → see sections
  100xsystems init claude-code → start building

  Microservices
  Design and implement a production-ready microservices architecture
  Advanced · Architecture · Distributed Systems
  100xsystems list microservices → see sections
  100xsystems init microservices → start building
```

### View system details

```bash
$ 100xsystems list claude-code

  Claude Code
  Build an AI-powered coding assistant using Claude Code
  Intermediate · AI · CLI · TypeScript

  Architecture (2 items)
    📄 System Architecture
    📄 Key Decisions

  Implementation (3 items)
    📄 Project Setup
    📄 Core Agent Loop
    📄 Tool Registry
```

## Behavior

- Without arguments: Lists **all** systems with title, description, difficulty, and tags
- With a system slug: Shows the system's **folder structure** including architecture docs, implementation guides, specifications, and resources
- Systems without any sections show a `No sections found` message
- Systems are read from `curriculum/systems/` on the filesystem

## See Also

- [init](/cli-docs/init) — Start building a system
- [validate](/cli-docs/validate) — Check your implementation
