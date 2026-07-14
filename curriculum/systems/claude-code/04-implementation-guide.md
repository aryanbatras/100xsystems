---
title: "Implementation Guide"
order: 4
difficulty: "Advanced"
---

Core implementation pattern for Claude Code.

```typescript
interface Tool {
  name: string;
  description: string;
  execute(input: any): Promise<ToolResult>;
}

class Agent {
  private tools: Map<string, Tool>;
  private llm: LLMClient;

  async turn(userInput: string): Promise<Response> {
    const thought = await this.think(userInput);
    const action = this.selectAction(thought);
    const result = await action.execute();
    return this.respond(result);
  }
}
```

Reference implementations: [Java](/systems/claude-code/java), [Python](/systems/claude-code/python)
