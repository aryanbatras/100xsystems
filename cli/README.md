# 100xSystems CLI

**Learn production system design by building real systems — then get them reviewed by experts.**

The 100xSystems CLI is a terminal-based learning platform that guides you through designing, building, and submitting real-world software systems. Instead of watching tutorials, you scaffold a project, make engineering decisions, document your architecture, and submit your implementation for review.

Built with [Ink](https://github.com/vadimdemedes/ink) (React for CLIs) and [Pastel](https://github.com/vadimdemedes/pastel) (Next.js-like framework for CLIs).

---

## Table of Contents

- [Why 100xSystems?](#why-100xsystems)
- [Installation](#installation)
- [Quick Start](#quick-start)
- [Commands Reference](#commands-reference)
  - [Dashboard](#100x---dashboard)
  - [list](#100x-list)
  - [init](#100x-init)
  - [validate](#100x-validate)
  - [verify](#100x-verify)
  - [submit](#100x-submit)
  - [quiz](#100x-quiz)
  - [challenge](#100x-challenge)
  - [doctor](#100x-doctor)
  - [progress](#100x-progress)
  - [resources](#100x-resources)
  - [login](#100x-login)
  - [auth](#100x-auth)
- [User Flow](#user-flow)
- [Architecture](#architecture)
  - [Tech Stack](#tech-stack)
  - [Project Structure](#project-structure)
  - [Data Flow](#data-flow)
- [Authentication](#authentication)
- [Development Guide](#development-guide)
- [Publishing](#publishing)

---

## Why 100xSystems?

Most system-design learning is passive — you watch videos, read blog posts, or sketch diagrams on a whiteboard. But the real learning happens when you **build**.

100xSystems takes a different approach:

1. **Learn by building** — Each system (Claude Code, Microservices, Kubernetes, etc.) has a specification with concrete requirements
2. **Document your decisions** — Fill out an Engineering Decision Log, Architecture Document, and Trade-offs Analysis — just like in the real world
3. **Get reviewed** — Submit your implementation and get feedback from experienced engineers
4. **Track your progress** — See which systems you've completed and what's next

The CLI handles:
- **Scaffolding** — Project templates with the right structure
- **Validation** — Checks your documentation is complete
- **Verification** — Runs spec-defined checks against your implementation
- **Submission** — Packages everything up for review
- **Progress tracking** — Keeps track of what you've built

---

## Installation

```bash
# Global install
npm install -g @100xsystems/cli

# Or run without installing
npx @100xsystems/cli
```

### Requirements

- **Node.js** >= 18 (recommended: 22+)
- **Git** — for version control and submissions
- **npm** — included with Node.js

### Verify Installation

```bash
100x doctor
```

This checks your development environment and shows which tools are available.

---

## Quick Start

```bash
# 1. See what systems are available
100x list

# 2. Scaffold a project for a system
100x init claude-code

# 3. Enter the project
cd claude-code-implementation

# 4. Fill out documentation and write code
#    (README.md, design/decisions.md, design/architecture.md,
#     design/tradeoffs.md, verification/checklist.md, src/)

# 5. Check your documentation is complete
100x validate

# 6. Verify against the system specification
100x verify

# 7. Submit for review (requires GitHub auth)
100x submit
```

---

## Commands Reference

### `100x` — Dashboard

The default command opens an interactive dashboard with a tabbed interface:

```
╔══ 100x SYSTEMS ENGINE ═══════════════════════╗
║ [Tab] modes · [Ctrl+M] menu                 ║
║                                              ║
║ ┌BUILD┐ ┌QUIZ┐ ┌DOCTOR┐ ┌RESOURCES┐         ║
║                                              ║
║ ┌─ Workspace ──────────┐ ┌─ Tab Content ──┐ ║
║ │ Systems: 2           │ │                │ ║
║ │ Quizzes: available   │ │                │ ║
║ │ Templates: TS/Java   │ │                │ ║
║ └──────────────────────┘ └────────────────┘ ║
║                                              ║
║ 100x ❯ _                                     ║
╚══════════════════════════════════════════════╝
```

**Keyboard shortcuts:**
- `Tab` — Switch between BUILD / QUIZ / DOCTOR / RESOURCES tabs
- `Ctrl+M` — Open command palette
- Type a command in the prompt bar and press Enter to execute it

---

### `100x list`

List all available systems or view details of a specific system.

```bash
# List all systems
100x list

# Show sections of a specific system
100x list claude-code
100x list microservices
```

Each system shows:
- Title and description
- Difficulty level (Beginner / Intermediate / Advanced)
- Tags (e.g., AI, CLI, Distributed Systems)
- Sections: quizzes, challenges, specification, implementation templates

---

### `100x init`

Scaffold a new implementation project for a system. Creates a complete project structure with all the documentation templates and starter code you need.

```bash
# Create a project with default settings (TypeScript)
100x init claude-code

# Specify output directory
100x init claude-code --output ./my-claude-project

# Choose a language
100x init claude-code --lang java

# Pre-fill your GitHub username in templates
100x init claude-code --author your-username
```

**Options:**
| Flag | Alias | Description |
|---|---|---|
| `--lang` | `-l` | Programming language: `typescript` or `java` (default: typescript) |
| `--output` | `-o` | Output directory (default: `./<system>-implementation`) |
| `--author` | `-a` | GitHub username to pre-fill in templates |

**Created structure:**
```
<system>-implementation/
├── .100x.json                 # Project config (auto-detected by commands)
├── README.md                  # Project overview template
├── design/
│   ├── decisions.md           # Engineering Decision Log
│   ├── architecture.md        # Architecture explanation
│   └── tradeoffs.md           # Trade-offs analysis
├── specification/
│   └── SPECIFICATION.md       # System specification from curriculum
├── verification/
│   └── checklist.md           # Self-assessment checklist
└── src/                       # Language-specific code templates
    ├── index.ts               # (or Main.java)
    ├── package.json           # (or pom.xml)
    └── tsconfig.json
```

After init, progress is automatically tracked so `100x progress` will show it.

---

### `100x validate`

Check that your implementation project has all required documentation and structure. Run this from inside your project directory.

```bash
cd my-project
100x validate
```

**Checks performed:**

| Category | Check | What it looks for |
|---|---|---|
| **Documentation** | README.md | Exists with meaningful content (≥50 chars) |
| | design/decisions.md | Has Context + Decision sections |
| | design/architecture.md | Describes components (≥100 chars) |
| | design/tradeoffs.md | Acknowledges trade-offs (≥100 chars) |
| | verification/checklist.md | Exists for self-assessment |
| **Structure** | .100x.json | Project config found |
| | src/ directory | Source code files present |
| | design/ directory | Documentation files present |
| **Git** | Repository | Git history with commits |
| | Doc sync | Docs are up-to-date with code changes |

**Output:**
```
  100xSystems — Validating "Claude Code"

  Documentation
  ✓ README.md exists with content
  ✓ design/decisions.md has proper decision log format
  ⚠ design/architecture.md exists but may be incomplete
  ✓ design/tradeoffs.md acknowledges trade-offs
  ✓ verification/checklist.md exists

  Structure
  ✓ .100x.json project config found
  ✓ Source code directory with 1 file(s)
  ✓ design/ directory with 4 file(s)

  ──────────────────────────────────────────
  Validation Results: 8 passed, 0 failed
  Your project is ready for submission!
```

---

### `100x verify`

Verify your implementation against the system's specification. This runs spec-defined checks (file existence, content checks, test commands) plus built-in documentation and structure checks.

```bash
cd my-project
100x verify
```

**Spec checks vary by system.** Example for a system with spec checks:
```
  100xSystems — Verifying "Claude Code"
  Specification: Claude Code Architecture (v1.0)

  Specification Checks
  ✓ file-exists design/decisions.md
  ✓ doc-section README.md Technical Overview
  ✓ test-passes npm test

  Documentation Completeness
  ✓ README.md exists with sufficient content
  ✓ Engineering Decision Log exists with sufficient content
  ...

  Project Structure
  ✓ .100x.json project config found
  ✓ Source code directory (src/) found
  ...

  ──────────────────────────────────────────
  Results: 12 passed, 0 failed
  All checks passed! Your implementation looks good.
```

---

### `100x submit`

Package your implementation and prepare it for review. This is a multi-step wizard:

```bash
cd my-project
100x submit [system-slug]
```

**Flow:**
1. **Loading** — Reads your `.100x.json` config
2. **Validation** — Runs `100x validate` automatically and shows results
3. **Confirm** — Shows validation summary and asks "Submit for review?" (with Ink ConfirmInput)
4. **Auth** — Authenticates with GitHub (PKCE browser flow or device flow fallback)
5. **Metadata** — Collects:
   - Repository URL (auto-detected from git remote)
   - Implementation language (select from list)
   - Difficulty level
6. **Building** — Creates a review package with:
   - Copies of all documentation files
   - Metadata JSON with system, author, language, etc.
   - Updates submissions index
7. **Done** — Shows submission details and next steps (git branch/PR instructions)

**Output (Done screen):**
```
  ✓ Submission prepared successfully!

  Since you are inside the 100xsystems repository:

  → Create a git branch and commit:
    git checkout -b submission/claude-code/username-ts-1234567890
    git add submissions/claude-code/username-ts-1234567890
    git commit -m "submission: claude-code by username"
    git push origin submission/claude-code/username-ts-1234567890

  → Then create a Pull Request to 100xsystems:
    https://github.com/aryanbatras/100xsystems/compare

  Submission details:
  System:    claude-code
  Author:    username
  Language:  typescript
  Repository: https://github.com/username/my-implementation
```

---

### `100x quiz`

Take interactive quizzes for a system. Questions are defined in the curriculum's `quizzes/` folder.

```bash
100x quiz claude-code
```

The QuizApp component renders multiple-choice and true/false questions with keyboard navigation.

---

### `100x challenge`

List and start challenges for a system. Challenges are hands-on coding exercises defined in the curriculum's `challenges/` folder.

```bash
# List all challenges for a system
100x challenge claude-code

# Start a specific challenge
100x challenge claude-code --start challenge-1
```

**Output (list view):**
```
  Claude Code Challenges

  #1. Implement a Context Manager
    Build a context window manager that tracks token usage
    Advanced
    Requirements:
      • Token counting
      • Context window management
      100x challenge claude-code --start challenge-1  → start this challenge
```

---

### `100x doctor`

Check your development environment for required and optional tools.

```bash
# Check all tools
100x doctor

# Check tools relevant to a specific system
100x doctor claude-code
100x doctor kubernetes
```

**Output:**
```
  100xSystems — Environment Doctor
  Checking all available tools...

  ✓ Node.js          v26.0.0
  ✓ Git              v2.50.1
  ✓ npm              v11.12.1
  ✓ TypeScript       v5.9.3
  ✓ Java (JDK)       v17.0.19
  ✓ Maven            Apache Maven 3.9.15
  ✓ Docker           v29.5.2
  ✓ Docker Compose   v5.1.4
  ○ Kubernetes (kubectl) not found (optional)
  ○ AWS CLI               not found (optional)
  ✓ Terraform        v1.7.0
  ✓ Python 3         v3.14.5
  ○ Go                     not found (optional)
  ○ Rust (cargo)           not found (optional)

  ──────────────────────────────────────────
  Summary:
  3 required tools OK
  6 optional tools found
  Environment looks good!
```

**System-specific tool mappings:**

| System | Tools checked |
|---|---|
| `claude-code` | Node.js, Git, npm, TypeScript, Docker |
| `microservices` | Node.js, Git, npm, Docker, Docker Compose |
| `kubernetes` | Node.js, Git, npm, Docker, kubectl, Docker Compose |
| `terraform` | Node.js, Git, npm, Terraform |
| `aws-infrastructure` | Node.js, Git, npm, AWS CLI, Terraform |
| `java-microservices` | Node.js, Git, npm, Java (JDK), Maven, Docker |
| `go-service` | Node.js, Git, npm, Go, Docker |
| `rust-tool` | Node.js, Git, npm, Rust (cargo) |

---

### `100x progress`

View your learning progress across all systems.

```bash
# Show overall progress
100x progress

# Show details for a specific system
100x progress claude-code
```

**Output:**
```
  100xSystems — Your Progress

  ✓ Completed

  ⟳ In Progress
    ● Claude Code
      /Users/me/projects/claude-code-implementation
      Language: typescript

  ○ Not Started
    ○ Microservices

  ──────────────────────────────────────────
  Progress: 0/2 systems completed (0%)
  Next: 100x init microservices — Distributed systems architecture
```

Progress is automatically detected by scanning common project directories for `.100x.json` files and tracked when you run `100x init`.

---

### `100x resources`

Browse curated learning resources (papers, videos, blog posts, documentation) for each system.

```bash
# List systems that have resources
100x resources

# View resources for a specific system
100x resources claude-code
```

Resources are defined in the curriculum at `curriculum/systems/[slug]/resources/`.

---

### `100x login`

Authenticate with GitHub. This is the explicit login command (separate from the implicit auth in `100x submit`).

```bash
# Login (will skip if already authenticated)
100x login

# Force re-authentication even if already logged in
100x login --force
100x login -f
```

**Flow:**
1. Checks for cached token in `~/.100x/auth.json`
2. If authenticated and no `--force`: shows current user
3. If not authenticated or `--force`: triggers PKCE OAuth flow
4. Opens your browser automatically to the auth proxy
5. You authorize on GitHub
6. The proxy redirects back to the CLI with a token
7. Token is cached locally for future use

---

### `100x auth`

Check authentication status or log out.

```bash
# Show current auth status
100x auth

# Log out (clear cached token)
100x auth logout
```

**Output (authenticated):**
```
  Authenticated as: Your Name (your-username)
```

**Output (not authenticated):**
```
  Not authenticated.
  Run 100x submit to authenticate.
```

---

## User Flow

The typical learning journey on 100xSystems:

```
  ┌────────────────────────────────────────────────────┐
  │ 1. Explore                                        │
  │    100x list                                      │
  │    → See available systems, pick one              │
  └────────────────────┬───────────────────────────────┘
                       │
  ┌────────────────────▼───────────────────────────────┐
  │ 2. Scaffold                                       │
  │    100x init claude-code                          │
  │    → Project created with docs, templates, spec    │
  └────────────────────┬───────────────────────────────┘
                       │
  ┌────────────────────▼───────────────────────────────┐
  │ 3. Build & Document                               │
  │    README.md  ← Project overview                  │
  │    design/decisions.md  ← Engineering decisions    │
  │    design/architecture.md  ← System architecture   │
  │    design/tradeoffs.md  ← Trade-offs analysis      │
  │    src/  ← Your implementation code                │
  └────────────────────┬───────────────────────────────┘
                       │
  ┌────────────────────▼───────────────────────────────┐
  │ 4. Validate                                       │
  │    100x validate                                   │
  │    → Checks documentation completeness             │
  └────────────────────┬───────────────────────────────┘
                       │
  ┌────────────────────▼───────────────────────────────┐
  │ 5. Verify                                         │
  │    100x verify                                     │
  │    → Runs spec checks against requirements         │
  └────────────────────┬───────────────────────────────┘
                       │
  ┌────────────────────▼───────────────────────────────┐
  │ 6. Submit                                         │
  │    100x submit                                     │
  │    → Auth with GitHub                              │
  │    → Package docs + metadata                       │
  │    → Create PR for review                          │
  └────────────────────┬───────────────────────────────┘
                       │
  ┌────────────────────▼───────────────────────────────┐
  │ 7. Repeat                                         │
  │    100x progress                                   │
  │    → Track completed systems                       │
  │    100x init microservices                         │
  │    → Start the next system                         │
  └────────────────────────────────────────────────────┘
```

---

## Architecture

### Tech Stack

| Layer | Technology |
|---|---|
| **Rendering** | [Ink v7](https://github.com/vadimdemedes/ink) — React renderer for CLIs |
| **Framework** | [Pastel v4](https://github.com/vadimdemedes/pastel) — Next.js-like CLI framework |
| **Language** | TypeScript (ESM, `"type": "module"`) |
| **Runtime** | Node.js 18+ |
| **UI Components** | Ink (Box, Text, useInput) + Custom components (TextInput, ConfirmInput, etc.) |
| **Validation** | [Zod v4](https://zod.dev) — Schema validation for command args/options |
| **Auth** | GitHub OAuth PKCE flow + Device Flow fallback |
| **Process spawning** | [execa v9](https://github.com/sindresorhus/execa) — Modern child_process replacement |
| **Browser launcher** | [open v11](https://github.com/sindresorhus/open) — Opens URLs in the default browser |
| **Extra UI** | [ink-gradient](https://github.com/vadimdemedes/ink-gradient) — Gradient text |
| | [ink-select-input](https://github.com/vadimdemedes/ink-select-input) — Select/dropdown |
| | [ink-spinner](https://github.com/vadimdemedes/ink-spinner) — Loading spinners |

### Project Structure

```
cli/
├── package.json               # Package config (@100xsystems/cli)
├── tsconfig.json              # TypeScript config (strict, ESNext modules)
├── README.md                  # This file
├── src/
│   ├── index.ts               # Entry point — Pastel app initialization
│   ├── commands/              # Pastel commands (auto-discovered by file name)
│   │   ├── index.tsx          # Default command — Dashboard UI
│   │   ├── list.tsx           # `100x list` — Browse systems
│   │   ├── init.tsx           # `100x init` — Scaffold projects
│   │   ├── validate.tsx       # `100x validate` — Check docs
│   │   ├── verify.tsx         # `100x verify` — Spec checks
│   │   ├── submit.tsx         # `100x submit` — Multi-step wizard
│   │   ├── quiz.tsx           # `100x quiz` — Interactive quizzes
│   │   ├── challenge.tsx      # `100x challenge` — Challenges
│   │   ├── doctor.tsx         # `100x doctor` — Environment checks
│   │   ├── progress.tsx       # `100x progress` — Track progress
│   │   ├── resources.tsx      # `100x resources` — Learning resources
│   │   ├── login.tsx          # `100x login` — GitHub auth
│   │   ├── auth.tsx           # `100x auth` — Auth status/logout
│   │   └── _app.tsx           # Pastel app wrapper (error boundary)
│   ├── actions/               # Data-only functions (no display logic)
│   │   ├── validate.ts        # Validation checks (exported: runValidation, checkDocumentation, checkStructure)
│   │   ├── verify.ts          # Spec check runner (exported: runSpecCheck, SpecCheckResult)
│   │   ├── progress.ts        # Progress tracking (exported: loadProgress, markInProgress, markCompleted, detectInProgressProjects)
│   │   ├── challenge.ts       # Challenge reading (exported: readChallenges, ChallengeInfo)
│   │   ├── submit.ts          # Submission logic (build review packages, git detection)
│   │   └── resources.ts       # Resource helpers
│   ├── auth/                  # Authentication module
│   │   ├── index.ts           # Public API: ensureAuthenticated, clearAuth, isAuthenticated, getCachedUser
│   │   └── pkce-auth.ts       # PKCE loopback + Device Flow implementation
│   ├── scaffold/              # Project scaffolding
│   │   └── index.ts           # scaffoldProject, readProjectConfig
│   ├── reader/                # Curriculum content readers
│   │   ├── index.ts           # Path resolution, frontmatter parser, types, shared utilities
│   │   ├── system-reader.ts   # System metadata, folder tags, file content
│   │   ├── spec-reader.ts     # Specification reading
│   │   ├── quiz-reader.ts     # Quiz data reading
│   │   └── resource-reader.ts # Resource reading
│   ├── ui/                    # Reusable Ink UI components
│   │   ├── index.ts           # Re-exports all UI components
│   │   ├── TextInput.tsx      # Text input with validation
│   │   ├── ConfirmInput.tsx   # Yes/No confirmation input
│   │   ├── ValidationReport.tsx  # Full validation report display
│   │   ├── Dashboard.tsx      # OpenCode-inspired tabbed dashboard
│   │   ├── Quiz.tsx           # Interactive quiz component
│   │   ├── TaskList.tsx       # Task list for challenge steps
│   │   ├── Table.tsx          # Data table component
│   │   ├── SystemCard.tsx     # System information card
│   │   ├── Divider.tsx        # Visual divider line
│   │   ├── Spinner.tsx        # Loading spinner
│   │   └── ProgressBar.tsx    # Progress bar component
│   └── templates/             # Scaffold templates
│       ├── review-package/    # Documentation templates (README, design docs, etc.)
│       ├── typescript/        # TypeScript starter template
│       └── java/              # Java starter template
├── dist/                      # Compiled output (gitignored)
└── website/                   # (separate) Website with auth proxy
```

### Data Flow

```
  ┌──────────┐    ┌──────────────┐    ┌───────────┐    ┌───────────────┐
  │ Pastel   │───►│ Command      │───►│ Action    │───►│ Reader /      │
  │ (router) │    │ (.tsx file)  │    │ (data fn) │    │ Scaffold / FS │
  └──────────┘    └──────┬───────┘    └───────────┘    └───────────────┘
                         │
                    ┌────▼───────┐
                    │ Ink UI     │
                    │ (render)   │
                    └────────────┘
```

**Key principle:** Command files (`.tsx`) handle ONLY rendering (Ink JSX). Action files handle ONLY data/logic. No display code in actions, no I/O logic in commands.

### Curriculum Path Resolution

The CLI finds the curriculum directory (`curriculum/`) by walking up from the current working directory:

```
CWD → parent → parent → ... → finds `curriculum/`
```

This means the CLI must be run from within (or below) the cloned curriculum repository.

---

## Authentication

### OAuth Architecture

```
  ┌─────────┐   PKCE challenge     ┌──────────────┐   Authorize       ┌────────┐
  │  CLI    │   + redirect_uri     │  Vercel Proxy  │ ──────────────► │ GitHub │
  │ (localhost│ ──────────────────► │ (client_secret │                 │ OAuth  │
  │  port)  │                      │  safe here)    │ ◄────────────── │        │
  │         │ ◄─────────────────── │                │   Auth code      │        │
  │   Token │   Token + user       │  Code exchange  │                 │        │
  └─────────┘                      └──────────────┘                 └────────┘
```

### Auth Methods (in order of preference)

1. **PKCE Loopback** (primary) — For desktop environments
   - CLI starts a local HTTP server on a random port
   - Opens browser to the Vercel auth proxy with PKCE challenge
   - User authorizes on GitHub
   - Proxy exchanges code for token (using server-side `client_secret`)
   - Proxy redirects back to CLI's localhost with the token
   - Token is cached at `~/.100x/auth.json`

2. **Device Flow** (fallback) — For headless/CI environments
   - CLI requests a device code from GitHub
   - Shows a code for the user to enter at `github.com/login/device`
   - Polls GitHub until the user authorizes
   - Fetches and caches the token

### Auth Proxy (Vercel Serverless)

The auth proxy lives at `website/app/api/auth/github/route.ts` and:
- Initiates the OAuth flow with PKCE params
- Handles the callback from GitHub
- Exchanges the code for a token using the server-side `client_secret`
- Fetches user info and redirects back to the CLI
- **Never exposes the `client_secret` to the CLI**

**Required environment variables on Vercel:**
```
GITHUB_CLIENT_ID=<your-oauth-app-client-id>
GITHUB_CLIENT_SECRET=<your-oauth-app-client-secret>
```

### Token Storage

- Location: `~/.100x/auth.json`
- Contents: Encrypted OAuth token + user info (login, name, email, avatar URL)
- Permissions: `chmod 600` (owner read/write only)

---

## Development Guide

### Setup

```bash
# Clone the repository
git clone https://github.com/100xsystems/100xsystems
cd 100xsystems/cli

# Install dependencies
npm install

# Build
npm run build

# Link globally for testing
npm link
100x doctor  # Test it works
```

### Development Commands

```bash
# Build once
npm run build

# Watch mode (auto-rebuild on changes)
npm run dev

# TypeScript check (no build)
npx tsc --noEmit
```

### Project Conventions

1. **Each command is a file in `src/commands/`** — Pastel auto-discovers them by filename
2. **Commands render Ink JSX** — No `console.log` or `chalk` in commands
3. **Actions are data-only** — No display logic in `src/actions/` files
4. **UI components in `src/ui/`** — Reusable Ink components with `.tsx` extension
5. **Auth in `src/auth/`** — All authentication logic separated from commands
6. **ESM modules** — All imports use `.js` extensions (TypeScript convention for ESM)
7. **Zod for args/options** — Every command exports `args` and/or `options` Zod schemas
8. **Strict TypeScript** — `strict: true` in tsconfig

### Adding a New Command

```typescript
// src/commands/example.tsx
import React, { useState, useEffect } from 'react';
import { Box, Text } from '../ui/index.js';
import zod from 'zod';

// Define arguments (positional)
export const args = zod.tuple([
  zod.string().describe('Your name'),
]);

// Define options (named flags)
export const options = zod.object({
  greeting: zod.string().optional().describe('Custom greeting'),
});

type Props = {
  args: zod.infer<typeof args>;
  options: zod.infer<typeof options>;
};

export default function Example({ args, options }: Props) {
  const [name] = args;
  const [output, setOutput] = useState<React.ReactNode>(null);

  useEffect(() => {
    setOutput(
      <Box flexDirection="column" paddingX={2}>
        <Text>{options.greeting || 'Hello'}, <Text bold>{name}</Text>!</Text>
      </Box>
    );
  }, []);

  return (
    <Box flexDirection="column" paddingX={2}>
      {output || <Text dimColor>Loading...</Text>}
    </Box>
  );
}
```

Then run: `100x example World` or `100x example World --greeting "Hi there"`.

### Code Organization Rules

- **No `chalk`** — All text styling uses Ink's `<Text color="...">` component
- **No `inquirer`** — All interactive input uses Ink components (TextInput, ConfirmInput, SelectInput)
- **No `console.log` in commands** — Use Ink rendering instead
- **No `child_process.execSync`** — Use `execa` (already imported in commands that need it)
- **Comments in action files** describe the data function, not the display

---

## Publishing

### To npm

```bash
# 1. Bump version
npm version patch   # 0.1.0 → 0.1.1

# 2. Build (runs automatically via prepublishOnly)
npm run build

# 3. Publish
npm publish

# Or for scoped packages:
npm publish --access public
```

### Prerequisites

- An npm account: `npm login`
- Package name `@100xsystems/cli` available on npm
- `GITHUB_CLIENT_ID` and `GITHUB_CLIENT_SECRET` set on Vercel for the auth proxy

### CI/CD (GitHub Actions)

A GitHub Actions workflow can auto-publish on tags:

```yaml
# .github/workflows/publish.yml
name: Publish CLI to npm
on:
  push:
    tags: ['cli-v*']
jobs:
  publish:
    runs-on: ubuntu-latest
    defaults:
      run:
        working-directory: cli
    steps:
      - uses: actions/checkout@v4
      - uses: actions/setup-node@v4
        with:
          node-version: '22'
          registry-url: 'https://registry.npmjs.org'
      - run: npm ci
      - run: npm run build
      - run: npm publish
        env:
          NODE_AUTH_TOKEN: ${{ secrets.NPM_TOKEN }}
```

---

## Current Status

| Feature | Status |
|---|---|
| 14 Pastel commands | ✅ Built |
| Ink JSX rendering (no chalk) | ✅ Complete |
| OpenCode-inspired Dashboard | ✅ Complete |
| PKCE OAuth loopback auth | ✅ Written (needs proxy deployment) |
| Project scaffolding | ✅ Complete |
| Documentation validation | ✅ Complete |
| Spec verification | ✅ Complete |
| Submission packaging | ✅ Complete |
| Interactive quizzes | ✅ Complete |
| Challenges browsing | ✅ Complete |
| Progress tracking | ✅ Complete |
| Resource browsing | ✅ Complete |
| Environment doctor | ✅ Complete |
| Auth proxy (Vercel) | ✅ Written (needs env vars) |
| npm package | ⏳ Not yet published |
| Unit tests | ⏳ TBD (ink-testing-library compatibility concerns) |

---

## License

MIT — see [LICENSE](./LICENSE) in the repository root.
