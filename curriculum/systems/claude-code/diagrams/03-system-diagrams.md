---
title: "System Diagrams"
order: 3
difficulty: "Beginner"
---

Visual representations of the Claude Code system architecture and data flow.

## Flow Diagram

```
User Input → Agent Loop → Tool Selection → Execution → Response
     ↑                                                │
     └────────────────────────────────────────────────┘
```

## Data Flow

1. User sends a prompt
2. Agent Loop analyzes the request
3. Selects appropriate tool
4. Executes the tool
5. Observes the result
6. Responds to user or continues
