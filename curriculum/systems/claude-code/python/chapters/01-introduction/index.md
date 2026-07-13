---
title: "Introduction to Claude Code"
description: "Understand what we're building and the system architecture"
order: 1
estimatedTime: "30 minutes"
---

# Introduction to Claude Code

Welcome! In this system, you'll build **Claude Code** — an AI-powered CLI coding assistant that helps developers write, debug, and understand code directly from the terminal.

## What We're Building

Claude Code is an interactive terminal application that uses AI to understand natural language prompts. You can ask it to explain code, generate new features, find bugs, refactor, and much more.

## Project Setup (Python)

We'll use Click for the CLI and httpx for API calls:

```bash
mkdir claude-code && cd claude-code
python -m venv venv
source venv/bin/activate
pip install click httpx rich pydantic
```

## System Architecture

The system consists of four main components:

1. **CLI Interface** — Click-based terminal application
2. **AI Service** — httpx client for AI API communication
3. **Session Manager** — Conversation context and history
4. **File System Agent** — Reads and modifies project files

## Knowledge Check

```knowledgecheck
{
  "question": "Why use Click and Rich instead of argparse for building a CLI?",
  "explanation": "argparse is built-in but lacks the developer experience of Click's decorator-based approach and automatic help generation. Rich transforms the terminal into a rich display with tables, markdown rendering, colored output, and progress spinners. Together, they let you build a professional CLI in hours instead of days."
}
```
