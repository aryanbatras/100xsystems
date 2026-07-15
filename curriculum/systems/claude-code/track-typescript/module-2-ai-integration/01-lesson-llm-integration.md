---
title: "LLM API Integration with Streaming"
order: 1
module: "AI Integration"
track: "typescript"
difficulty: "Advanced"
estimated_time: "60 min"
learning_objectives:
  - "Integrate with the Anthropic API (or any LLM provider)"
  - "Implement streaming and non-streaming response handling"
  - "Build message history management with token limits"
  - "Create system prompts and response parsers"
prerequisites:
  - "claude-code/typescript/lesson-4"
knowledge_refs:
  - "principles/single-responsibility"
  - "patterns/adapter"
  - "technologies/kafka"
validation:
  - type: file-exists
    path: "src/llm/client.ts"
  - type: file-exists
    path: "src/llm/streaming.ts"
  - type: file-contains
    path: "src/llm/client.ts"
    contains: "fetch"
    description: "LLM client uses fetch API"
  - type: file-contains
    path: "src/llm/prompts.ts"
    contains: "system"
    description: "Has system prompt templates"
  - type: npm-test
    script: "build"
---

# LLM API Integration with Streaming

This is where we connect our agent to an actual LLM. We'll build a client that handles streaming responses, manages message history, calculates token usage, and handles API errors gracefully.

## Architecture

```
Agent Loop
    │
    ▼
┌─────────────────────────────────────┐
│         LLM Client                    │
│  ┌─────────────────────────────────┐ │
│  │  send(messages, tools)          │ │ ← Buffered mode
│  │  sendStreaming(messages, tools) │ │ ← Streaming mode (SSE)
│  └─────────────────────────────────┘ │
│                                       │
│  ┌─────────────────────────────────┐ │
│  │  Context Manager                │ │ ← Token tracking
│  │  Message History                │ │ ← Window management
│  │  Token Counter                  │ │ ← Budget enforcement
│  └─────────────────────────────────┘ │
└─────────────────────────────────────┘
```

## Step 1: Create the LLM Client

Create `src/llm/client.ts`:

```typescript
import { StreamProcessor } from './streaming.js';
import { Message, AgentConfig } from '../agent/types.js';

export class LLMClient {
  private apiKey: string;
  private apiUrl: string;

  constructor(private config: AgentConfig) {
    this.apiKey = process.env.ANTHROPIC_API_KEY || '';
    this.apiUrl = process.env.LLM_API_URL || 'https://api.anthropic.com/v1/messages';

    if (!this.apiKey && !process.env.LLM_API_URL) {
      console.warn('⚠️ No ANTHROPIC_API_KEY set. The agent will use a mock LLM.');
    }
  }

  async send(
    messages: Message[],
    tools?: Array<Record<string, unknown>>
  ): Promise<{ content: string; toolCalls?: any[]; usage?: any }> {
    if (!this.apiKey) return this.mockResponse(messages);

    const response = await fetch(this.apiUrl, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'x-api-key': this.apiKey,
        'anthropic-version': '2023-06-01',
      },
      body: JSON.stringify({
        model: this.config.model,
        max_tokens: this.config.maxTokens,
        temperature: this.config.temperature,
        system: this.config.systemPrompt,
        messages: messages.map(m => ({
          role: m.role === 'tool' ? 'user' : m.role,
          content: m.content,
        })),
        tools,
      }),
    });

    if (!response.ok) {
      const error = await response.text();
      throw new Error(`LLM API error (${response.status}): ${error}`);
    }

    const data = await response.json();
    return this.parseResponse(data);
  }

  async sendStreaming(
    messages: Message[],
    tools?: Array<Record<string, unknown>>
  ): Promise<{ content: string; toolCalls?: any[]; usage?: any }> {
    if (!this.apiKey) return this.mockResponse(messages);

    const response = await fetch(this.apiUrl, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'x-api-key': this.apiKey,
        'anthropic-version': '2023-06-01',
      },
      body: JSON.stringify({
        model: this.config.model,
        max_tokens: this.config.maxTokens,
        temperature: this.config.temperature,
        system: this.config.systemPrompt,
        messages: messages.map(m => ({
          role: m.role === 'tool' ? 'user' : m.role,
          content: m.content,
        })),
        tools,
        stream: true,
      }),
    });

    if (!response.ok) {
      const error = await response.text();
      throw new Error(`LLM API error (${response.status}): ${error}`);
    }

    const reader = response.body?.getReader();
    if (!reader) throw new Error('Response body is not readable');

    const decoder = new TextDecoder();
    let fullContent = '';
    let toolCalls: any[] = [];

    const processor = new StreamProcessor({
      onToken: (token) => {
        fullContent += token;
        process.stdout.write(token);
      },
      onComplete: () => process.stdout.write('\n'),
      onError: (err) => console.error('\n❌ Stream error:', err.message),
    });

    while (true) {
      const { done, value } = await reader.read();
      if (done) break;

      const chunk = decoder.decode(value, { stream: true });
      processor.processChunk(chunk);
    }

    processor.finish();

    return { content: fullContent, toolCalls };
  }

  private parseResponse(data: any): { content: string; toolCalls?: any[] } {
    const content = data.content?.[0]?.text || '';
    const toolCalls = data.content
      ?.filter((c: any) => c.type === 'tool_use')
      ?.map((c: any) => ({
        id: c.id,
        type: 'tool_use',
        name: c.name,
        input: c.input,
      })) || [];

    return { content, toolCalls };
  }

  private mockResponse(messages: Message[]): { content: string; toolCalls?: any[] } {
    const lastMsg = messages[messages.length - 1];
    const hasTools = lastMsg?.role === 'tool';

    if (hasTools) {
      return {
        content: 'Based on the tool results, I can see the implementation is progressing well.',
        toolCalls: [],
      };
    }

    return {
      content: `I understand you want me to work on this task. Let me start by examining the project structure.

I'll use the tools available to me to understand what we're working with.

What would you like me to build or modify?`,
      toolCalls: [{
        id: 'mock-tool-1',
        type: 'tool_use',
        name: 'list_files',
        input: { path: '.', recursive: false },
      }],
    };
  }
}
```

## Step 2: Create System Prompts

Create `src/llm/prompts.ts`:

```typescript
export function getSystemPrompt(): string {
  return `You are Claude Code, an AI-powered coding agent.

## Your Capabilities
You have access to tools that allow you to:
- Read and write files
- Execute shell commands
- Search codebases for patterns
- List directory contents

## How to Work
1. First, understand the user's request completely
2. Use the available tools to investigate and modify the codebase
3. Think step by step — break complex tasks into smaller actions
4. After completing a task, summarize what was done

## Guidelines
- Always verify file contents before modifying them
- Run tests after making changes
- Explain your reasoning when making architectural decisions
- Respect existing code conventions and style
- Ask for clarification when requirements are ambiguous

## Tool Usage
- Use search_code to find relevant files before reading them
- Use read_file to understand existing code
- Use write_file for creating or updating files
- Use execute_command to run builds and tests
- Never use execute_command for destructive operations without user confirmation
`;
}
```

## Step 3: Context Window Management

Add to `src/llm/client.ts`:

```typescript
export class ContextManager {
  private maxTokens: number;
  private tokenCount: number;

  constructor(maxTokens = 128000) {
    this.maxTokens = maxTokens;
    this.tokenCount = 0;
  }

  addMessage(message: Message): void {
    this.tokenCount += this.estimateTokens(message.content);
    this.pruneIfNeeded();
  }

  estimateTokens(text: string): number {
    // Rough estimation: ~4 chars per token for code
    return Math.ceil(text.length / 3.5);
  }

  private pruneIfNeeded(): void {
    if (this.tokenCount > this.maxTokens * 0.8) {
      // Prune by summarizing older messages
      console.warn('⚠️ Context window at 80% capacity');
    }
  }

  getUsage(): { used: number; max: number; percentage: number } {
    return {
      used: this.tokenCount,
      max: this.maxTokens,
      percentage: Math.round((this.tokenCount / this.maxTokens) * 100),
    };
  }
}
```

## Engineering Decision: Streaming Architecture

**Context:** LLM responses can take 5-30 seconds. Without streaming, the user sees nothing during that time.

**Decision:** We implement streaming via Server-Sent Events (SSE), which is the standard for LLM APIs.

**Alternatives Considered:**
1. **WebSockets** — More complex, overkill for unidirectional streaming
2. **Polling** — Inefficient, higher latency
3. **Server-Sent Events** ✅ — Simple, standard, efficient

## Validation Checklist

- [ ] `src/llm/client.ts` sends requests to the LLM API
- [ ] Streaming mode shows tokens in real-time
- [ ] Non-streaming mode returns complete response
- [ ] API errors are caught and reported gracefully
- [ ] Mock mode works without API key (for development)
- [ ] Context manager tracks token usage
- [ ] `npm run build` passes without errors
