---
title: "Building the Tool/Plugin System"
order: 1
module: "Tools & Plugins"
track: "typescript"
difficulty: "Advanced"
estimated_time: "60 min"
learning_objectives:
  - "Design an extensible plugin architecture"
  - "Implement dynamic tool loading from plugins"
  - "Build a sandboxed execution environment for tools"
  - "Create plugin discovery and registration mechanisms"
prerequisites:
  - "claude-code/typescript/module-2/lesson-2"
knowledge_refs:
  - "patterns/strategy"
  - "patterns/decorator"
  - "patterns/adapter"
validation:
  - type: file-exists
    path: "src/plugins/loader.ts"
  - type: file-exists
    path: "src/plugins/types.ts"
  - type: file-contains
    path: "src/plugins/types.ts"
    contains: "PluginManifest"
    description: "Has PluginManifest interface"
  - type: npm-test
    script: "build"
---

# Building the Tool/Plugin System

A plugin system allows third-party developers to extend our AI coding agent with custom tools. This lesson covers loading, sandboxing, and managing plugin lifecycles.

## Plugin Architecture

```
┌────────────────────────────────────────────┐
│               PluginManager                 │
│  ┌──────────┐  ┌──────────┐  ┌──────────┐ │
│  │  Plugin  │  │  Plugin  │  │  Plugin  │ │
│  │  Loader  │  │Registry  │  │Sandbox   │ │
│  └────┬─────┘  └────┬─────┘  └────┬─────┘ │
│       │              │              │        │
│       ▼              ▼              ▼        │
│  Scan for      Register     Isolate         │
│  plugins       tools        execution        │
└────────────────────────────────────────────┘
```

## Step 1: Define Plugin Types

Create `src/plugins/types.ts`:

```typescript
export interface PluginManifest {
  name: string;
  version: string;
  description: string;
  author: string;
  tools: PluginToolDefinition[];
  requires?: string[];
}

export interface PluginToolDefinition {
  name: string;
  description: string;
  inputSchema: Record<string, unknown>;
  sandbox?: {
    allowedPaths?: string[];
    allowedCommands?: string[];
    networkAccess?: boolean;
    maxMemory?: number;
    timeout?: number;
  };
}

export interface Plugin {
  manifest: PluginManifest;
  load: () => Promise<void>;
  unload: () => Promise<void>;
  getTool: (name: string) => ToolHandler | undefined;
}

export interface ToolHandler {
  execute: (input: Record<string, unknown>, context: ToolContext) => Promise<unknown>;
}

export interface ToolContext {
  projectDir: string;
  allowedPaths: string[];
  meta: Record<string, unknown>;
}
```

## Validation Checklist

- [ ] `src/plugins/types.ts` defines PluginManifest, Plugin, ToolHandler
- [ ] `src/plugins/loader.ts` discovers plugins from directories
- [ ] Plugin sandbox restricts path access and command execution
- [ ] Plugins can register tools at runtime
- [ ] Plugin lifecycle hooks are called (load/unload)
- [ ] `npm run build` passes without errors
