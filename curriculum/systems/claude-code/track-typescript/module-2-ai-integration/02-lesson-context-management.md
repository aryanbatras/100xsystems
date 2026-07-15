---
title: "Context Window & Token Management"
order: 2
module: "AI Integration"
track: "typescript"
difficulty: "Advanced"
estimated_time: "45 min"
learning_objectives:
  - "Implement context window management with token tracking"
  - "Build a message history pruning system"
  - "Handle token limits gracefully"
prerequisites:
  - "claude-code/typescript/module-2/lesson-1"
knowledge_refs:
  - "technologies/kafka"
  - "patterns/strategy"
validation:
  - type: file-exists
    path: "src/llm/context.ts"
  - type: file-contains
    path: "src/llm/context.ts"
    contains: "prune"
    description: "Context manager has pruning logic"
  - type: npm-test
    script: "build"
---

# Context Window & Token Management

LLMs have finite context windows (128K tokens for Claude, 200K for GPT-4). Managing this window effectively is critical for a coding agent that needs to maintain coherent conversations across many tool calls.

## The Challenge

```
User: "Build a REST API"
  ↓
Agent: Let me start... [reads files, plans architecture]
  ↓
Agent: Creates project structure [writes 5 files]
  ↓
Agent: Implements models [writes 3 files]
  ↓
Agent: Implements controllers [writes 4 files]
  ↓
Agent: Runs tests [executes 3 commands]
  ↓  ← CONTEXT WINDOW NEARING LIMIT
Agent: Fixes failing tests [needs more context but can't fit it]
```

## Step 1: Token Estimation

Create `src/llm/tokens.ts`:

```typescript
/**
 * Token estimation for various content types.
 * Uses character-based estimation (roughly 4 chars ≈ 1 token for code).
 */

const CHARS_PER_TOKEN = 3.5;
const TOOL_CALL_OVERHEAD = 50;

export function estimateTokens(text: string): number {
  return Math.ceil(text.length / CHARS_PER_TOKEN);
}

export function estimateMessageTokens(msg: { role: string; content: string }): number {
  let tokens = estimateTokens(msg.content);
  // System prompt overhead
  tokens += msg.role === 'system' ? 10 : 5;
  // Role prefix tokens
  tokens += msg.role.length;
  return tokens;
}

export function estimateToolTokens(schema: Record<string, unknown>): number {
  return estimateTokens(JSON.stringify(schema)) + TOOL_CALL_OVERHEAD;
}
```

## Step 2: Context Manager

Create `src/llm/context.ts`:

```typescript
import { Message } from '../agent/types.js';
import { estimateTokens, estimateMessageTokens } from './tokens.js';

export class ContextManager {
  private maxTokens: number;
  private reservedTokens: number;  // Reserved for response generation
  private usageLog: Array<{ size: number; type: string; timestamp: number }> = [];

  constructor(maxTokens = 128000) {
    this.maxTokens = maxTokens;
    this.reservedTokens = Math.floor(maxTokens * 0.15); // 15% for response
  }

  canAdd(message: Message, history: Message[]): boolean {
    const currentUsage = this.calculateUsage(history);
    const messageTokens = estimateMessageTokens(message);
    return (currentUsage + messageTokens + this.reservedTokens) <= this.maxTokens;
  }

  calculateUsage(messages: Message[]): number {
    return messages.reduce((total, msg) => total + estimateMessageTokens(msg), 0);
  }

  pruneHistory(history: Message[], targetTokens?: number): Message[] {
    const target = targetTokens || Math.floor(this.maxTokens * 0.6);
    let usage = this.calculateUsage(history);

    if (usage <= target) return history;

    this.usageLog.push({
      size: usage,
      type: 'prune',
      timestamp: Date.now(),
    });

    // Strategy 1: Summarize older tool results
    let pruned = [...history];
    let i = 1; // Skip first message (system prompt)

    while (usage > target && i < pruned.length) {
      const msg = pruned[i];

      // Tool results are the bulkiest — summarize them
      if (msg.role === 'tool') {
        const summary = this.summarizeToolResult(msg);
        if (summary.length < msg.content.length) {
          usage -= estimateMessageTokens(msg) - estimateMessageTokens({ ...msg, content: summary });
          pruned[i] = { ...msg, content: summary };
        }
      }

      // Old user messages — truncate if too long
      if (msg.role === 'user' && msg.content.length > 1000) {
        const truncated = msg.content.slice(0, 500) +
          '\n\n...[previous content summarized]...\n\n' +
          msg.content.slice(-200);
        usage -= estimateMessageTokens(msg) - estimateMessageTokens({ ...msg, content: truncated });
        pruned[i] = { ...msg, content: truncated };
      }

      i++;
      if (i > 50) break; // Safety limit
    }

    // Strategy 2: If still over, remove oldest non-essential messages
    while (usage > target && pruned.length > 2) {
      const removed = pruned.splice(1, 1)[0];
      usage -= estimateMessageTokens(removed);

      this.usageLog.push({
        size: estimateMessageTokens(removed),
        type: 'remove',
        timestamp: Date.now(),
      });
    }

    return pruned;
  }

  private summarizeToolResult(msg: Message): string {
    const lines = msg.content.split('\n');
    if (lines.length <= 10) return msg.content;

    return [
      ...lines.slice(0, 5),
      `\n[...${lines.length - 10} lines omitted by context manager...]\n`,
      ...lines.slice(-5),
    ].join('\n');
  }

  getUsageStats(messages: Message[]): {
    used: number;
    max: number;
    percentage: number;
    reserved: number;
    available: number;
  } {
    const used = this.calculateUsage(messages);
    return {
      used,
      max: this.maxTokens,
      percentage: Math.round((used / this.maxTokens) * 100),
      reserved: this.reservedTokens,
      available: this.maxTokens - used - this.reservedTokens,
    };
  }
}
```

## Step 3: Integrate into the Agent Loop

Update `src/agent/loop.ts` to use the context manager:

```typescript
import { ContextManager } from '../llm/context.js';

export class Agent {
  private contextManager = new ContextManager();

  private async runLoop(stream: boolean): Promise<void> {
    let iterations = 0;

    while (iterations < this.config.maxToolIterations) {
      iterations++;

      // Check if we need to prune before sending
      if (!this.contextManager.canAdd(
        { role: 'user', content: '' },
        this.messages
      )) {
        this.messages = this.contextManager.pruneHistory(this.messages);
        const stats = this.contextManager.getUsageStats(this.messages);
        console.warn(`⚠️ Context: ${stats.percentage}% used (${stats.available} tokens remaining)`);
      }

      // Send to LLM...
      const response = stream
        ? await this.llm.sendStreaming(this.messages, this.tools.getToolSchemas())
        : await this.llm.send(this.messages, this.tools.getToolSchemas());

      this.contextManager.usageLog.push({
        size: this.contextManager.calculateUsage(this.messages),
        type: 'llm-call',
        timestamp: Date.now(),
      });
    }
  }
}
```

## Engineering Decision: Pruning Strategy

**Context:** We need to reduce context usage without losing critical information.

**Decision:** Two-stage pruning:
1. **Summarize bulky tool results** — replace verbose file contents with summaries
2. **Remove oldest non-essential messages** — drop old user messages if still over limit

**Alternatives Considered:**
1. **Always keep first N messages** — loses recent context
2. **Semantic summarization** — too slow (requires another LLM call)
3. **Two-stage pruning** ✅ — fast, retains recent context, summarizes bulk

## Validation Checklist

- [ ] `src/llm/tokens.ts` has accurate token estimation
- [ ] `src/llm/context.ts` manages context with pruning
- [ ] Tool results are summarized when needed
- [ ] Usage stats are reported to the user
- [ ] Pruning doesn't remove system prompts
- [ ] `npm run build` passes without errors
