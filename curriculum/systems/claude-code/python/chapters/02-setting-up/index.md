---
title: "Setting Up the CLI Framework"
description: "Build the command-line interface for Claude Code using Click"
order: 2
estimatedTime: "45 minutes"
---

# Setting Up the CLI Framework

The foundation of Claude Code is its command-line interface. We'll use Click to build a professional CLI.

## Project Structure

```
claude-code/
├── cli/
│   ├── __init__.py
│   ├── main.py          # Entry point
│   └── commands.py      # CLI commands
├── ai/
│   ├── __init__.py
│   └── service.py       # LLM communication
├── tools/
│   ├── __init__.py
│   ├── registry.py      # Tool definitions
│   ├── read.py          # Read tool
│   └── bash.py          # Bash tool
└── pyproject.toml
```

## Creating the CLI Entry Point

```python
# cli/main.py
import click
from rich.console import Console
from rich.markdown import Markdown

console = Console()

@click.group()
@click.version_option(version="0.1.0")
def cli():
    """Claude Code — AI-powered coding assistant"""
    pass

@cli.command()
@click.argument("prompt", nargs=-1, required=True)
@click.option("--verbose", "-v", is_flag=True, help="Show detailed output")
def ask(prompt, verbose):
    """Ask Claude to perform a coding task"""
    prompt_text = " ".join(prompt)
    console.print(f"[bold]Thinking about:[/bold] {prompt_text}")

if __name__ == "__main__":
    cli()
```

## Configuration

```python
# config.py
import os
from dataclasses import dataclass

@dataclass
class Config:
    api_key: str = os.getenv("ANTHROPIC_API_KEY", "")
    model: str = "claude-sonnet-4-20250514"
    max_tokens: int = 4096
    temperature: float = 0.7
    max_iterations: int = 25
    project_root: str = os.getcwd()

config = Config()
```

## Knowledge Check

```knowledgecheck
{
    "question": "Why does Click use decorators (@click.command) instead of a command registry pattern like argparse?",
    "explanation": "Decorators keep the command definition right next to the function that handles it — you don't have to scroll between the argument parsing logic and the handler logic. Click also handles type conversion, validation, help text formatting, and nested command groups automatically. The decorator approach makes adding a new command as simple as writing a single function with a decorator, which is essential when building a CLI with many commands."
}
```
