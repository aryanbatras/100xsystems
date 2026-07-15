---
title: "Implement File & System Tools"
order: 4
module: "CLI Foundations"
track: "typescript"
difficulty: "Intermediate"
estimated_time: "60 min"
learning_objectives:
  - "Implement file read/write tools for the agent"
  - "Build command execution tools with sandboxing"
  - "Create a glob/search tool for codebase exploration"
prerequisites:
  - "claude-code/typescript/lesson-3"
knowledge_refs:
  - "patterns/adapter"
  - "principles/single-responsibility"
validation:
  - type: file-exists
    path: "src/tools/filesystem.ts"
  - type: file-exists
    path: "src/tools/execute.ts"
  - type: file-exists
    path: "src/tools/search.ts"
  - type: file-contains
    path: "src/tools/registry.ts"
    contains: "register"
    description: "Tools are registered in the registry"
  - type: npm-test
    script: "build"
---

# Implement File & System Tools

The tool system is how our agent interacts with the user's environment. Each tool is a capability the agent can use — reading files, writing code, executing commands, searching the codebase.

## Tool Design Principles

Each tool follows a strict contract:

```
┌──────────────────────────────────────┐
│              Tool Contract             │
├──────────────────────────────────────┤
│  name: string                         │
│  description: string                  │
│  inputSchema: JSON Schema             │
│  execute(input): Promise<unknown>     │
└──────────────────────────────────────┘
```

## Step 1: File System Tools

Create `src/tools/filesystem.ts`:

```typescript
import { readFile, writeFile, appendFile } from 'fs/promises';
import { existsSync } from 'fs';
import { relative, resolve, normalize } from 'path';
import { Tool } from './registry.js';

// Security: ensure file operations stay within the project
const PROJECT_ROOT = process.cwd();

function safePath(requestedPath: string): string {
  const resolved = resolve(PROJECT_ROOT, requestedPath);
  const normalized = normalize(resolved);
  if (!normalized.startsWith(PROJECT_ROOT)) {
    throw new Error(`Path traversal detected: ${requestedPath}`);
  }
  return normalized;
}

export const readFileTool: Tool = {
  name: 'read_file',
  description: 'Read the contents of a file from the project',
  inputSchema: {
    type: 'object',
    properties: {
      path: { type: 'string', description: 'Path to the file (relative to project)' },
    },
    required: ['path'],
  },
  async execute(input: Record<string, unknown>) {
    const filePath = safePath(input.path as string);
    const content = await readFile(filePath, 'utf-8');
    return { path: input.path, content, size: content.length };
  },
};

export const writeFileTool: Tool = {
  name: 'write_file',
  description: 'Write content to a file (creates directories if needed)',
  inputSchema: {
    type: 'object',
    properties: {
      path: { type: 'string', description: 'Path to write to' },
      content: { type: 'string', description: 'Content to write' },
    },
    required: ['path', 'content'],
  },
  async execute(input: Record<string, unknown>) {
    const filePath = safePath(input.path as string);
    const { mkdir } = await import('fs/promises');
    const { dirname } = await import('path');

    await mkdir(dirname(filePath), { recursive: true });
    await writeFile(filePath, input.content as string, 'utf-8');
    return { path: input.path, written: (input.content as string).length };
  },
};

export const listFilesTool: Tool = {
  name: 'list_files',
  description: 'List files and directories in a path',
  inputSchema: {
    type: 'object',
    properties: {
      path: { type: 'string', description: 'Directory to list' },
      recursive: { type: 'boolean', description: 'List recursively' },
    },
    required: ['path'],
  },
  async execute(input: Record<string, unknown>) {
    const dirPath = safePath(input.path as string);
    const { readdir } = await import('fs/promises');
    const { statSync } = await import('fs');

    const items = await readdir(dirPath, { withFileTypes: true });
    const files = items
      .filter(item => !item.name.startsWith('.') && item.name !== 'node_modules')
      .map(item => ({
        name: item.name,
        type: item.isDirectory() ? 'directory' : 'file',
        path: relative(PROJECT_ROOT, resolve(dirPath, item.name)),
        size: item.isFile() ? statSync(resolve(dirPath, item.name)).size : undefined,
      }));

    return { path: input.path, files };
  },
};
```

## Step 2: Command Execution Tool

Create `src/tools/execute.ts`:

```typescript
import { exec } from 'child_process';
import { promisify } from 'util';
import { Tool } from './registry.js';

const execAsync = promisify(exec);

export const executeCommandTool: Tool = {
  name: 'execute_command',
  description: 'Execute a shell command and return its output',
  inputSchema: {
    type: 'object',
    properties: {
      command: { type: 'string', description: 'Command to execute' },
      timeout: { type: 'number', description: 'Timeout in ms (default: 30000)' },
    },
    required: ['command'],
  },
  async execute(input: Record<string, unknown>) {
    const command = input.command as string;
    const timeout = (input.timeout as number) || 30000;

    try {
      const { stdout, stderr } = await execAsync(command, {
        timeout,
        maxBuffer: 10 * 1024 * 1024, // 10MB
      });
      return {
        exitCode: 0,
        stdout: stdout.slice(0, 10000),
        stderr: stderr.slice(0, 5000),
        truncated: stdout.length > 10000 || stderr.length > 5000,
      };
    } catch (error: any) {
      return {
        exitCode: error.code || 1,
        stdout: error.stdout?.slice(0, 10000) || '',
        stderr: error.stderr?.slice(0, 5000) || error.message,
      };
    }
  },
};
```

## Step 3: Search/Grep Tool

Create `src/tools/search.ts`:

```typescript
import { exec } from 'child_process';
import { promisify } from 'util';
import { readdirSync, readFileSync, statSync } from 'fs';
import { join, relative } from 'path';
import { Tool } from './registry.js';

const execAsync = promisify(exec);

export const searchCodeTool: Tool = {
  name: 'search_code',
  description: 'Search the codebase for patterns using ripgrep or grep',
  inputSchema: {
    type: 'object',
    properties: {
      pattern: { type: 'string', description: 'Search pattern (regex or literal)' },
      path: { type: 'string', description: 'Search in specific path' },
      maxResults: { type: 'number', description: 'Max results (default: 20)' },
    },
    required: ['pattern'],
  },
  async execute(input: Record<string, unknown>) {
    const pattern = input.pattern as string;
    const searchPath = input.path as string || '.';
    const maxResults = (input.maxResults as number) || 20;

    try {
      // Try ripgrep first (much faster)
      const { stdout } = await execAsync(
        `rg --line-number --max-count ${maxResults} "${pattern}" ${searchPath} 2>/dev/null || true`,
        { timeout: 10000, maxBuffer: 1024 * 1024 }
      );

      const lines = stdout.split('\n').filter(Boolean).slice(0, maxResults);
      return {
        matches: lines.map(line => {
          const [file, lineNum, ...rest] = line.split(':');
          return { file, line: parseInt(lineNum, 10), content: rest.join(':').trim() };
        }),
        totalMatches: lines.length,
      };
    } catch {
      // Fallback: manual search
      const matches: Array<{ file: string; line: number; content: string }> = [];

      function walk(dir: string) {
        if (matches.length >= maxResults) return;
        try {
          const entries = readdirSync(dir, { withFileTypes: true });
          for (const entry of entries) {
            if (entry.name.startsWith('.') || entry.name === 'node_modules') continue;
            const fullPath = join(dir, entry.name);
            if (entry.isDirectory()) walk(fullPath);
            else if (entry.isFile()) {
              try {
                const content = readFileSync(fullPath, 'utf-8');
                const lines = content.split('\n');
                lines.forEach((line, i) => {
                  if (line.includes(pattern) && matches.length < maxResults) {
                    matches.push({ file: relative(process.cwd(), fullPath), line: i + 1, content: line.trim() });
                  }
                });
              } catch { /* skip unreadable */ }
            }
          }
        } catch { /* skip */ }
      }

      walk(process.cwd());
      return { matches, totalMatches: matches.length };
    }
  },
};
```

## Step 4: Register All Tools

Update `src/agent/loop.ts` or create a tool initializer:

```typescript
import { ToolRegistry } from '../tools/registry.js';
import { readFileTool, writeFileTool, listFilesTool } from '../tools/filesystem.js';
import { executeCommandTool } from '../tools/execute.js';
import { searchCodeTool } from '../tools/search.js';

export function initializeTools(): ToolRegistry {
  const registry = new ToolRegistry();

  // File operations
  registry.register(readFileTool);
  registry.register(writeFileTool);
  registry.register(listFilesTool);

  // Command execution
  registry.register(executeCommandTool);

  // Search
  registry.register(searchCodeTool);

  return registry;
}
```

## Security: Path Traversal Prevention

The `safePath()` function is critical — it prevents the agent from reading/writing files outside the project directory. This is a common vulnerability in AI coding agents.

```typescript
function safePath(requestedPath: string): string {
  const resolved = resolve(PROJECT_ROOT, requestedPath);
  const normalized = normalize(resolved);
  if (!normalized.startsWith(PROJECT_ROOT)) {
    throw new Error(`Path traversal detected: ${requestedPath}`);
  }
  return normalized;
}
```

## Validation Checklist

- [ ] Read file tool works with relative paths
- [ ] Write file tool creates directories automatically
- [ ] List files tool distinguishes files from directories
- [ ] Execute command tool returns stdout/stderr/exitCode
- [ ] Search tool finds patterns in the codebase
- [ ] Path traversal is blocked
- [ ] All tools are registered in the registry
