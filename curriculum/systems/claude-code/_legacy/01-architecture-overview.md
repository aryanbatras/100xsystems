---
title: "Architecture Overview"
order: 1
difficulty: "Intermediate"
---

Claude Code is an AI-powered coding agent that operates directly in your terminal.

## High-Level Architecture

```
User → Agent Loop → Tool Layer → LLM API → Response
```

## Core Components

1. **User Interface** — Terminal-based interaction
2. **Agent Loop** — Think → Act → Observe cycle
3. **Tool System** — Extensible tool registry (Read, Write, Bash)
4. **LLM Client** — Streams responses from Anthropic API
5. **Context Management** — File tree, conversation history

## Key Design Decisions

- **Stateless** — Each turn is self-contained
- **Streaming** — Real-time token-by-token output
- **Tool-based** — All actions go through defined tools
