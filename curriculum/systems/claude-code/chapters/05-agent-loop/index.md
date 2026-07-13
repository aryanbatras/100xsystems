---
title: "Implement the Agent Loop"
description: "Build the core loop that lets the AI think, act, and observe results"
order: 5
estimatedTime: "1.5 hours"
---

# Implement the Agent Loop

The agent loop is the heart of Claude Code. It's a cycle that repeats until a task is complete: **think → act → observe**.

## The Loop Architecture

```
┌─────────────────────────────────────────┐
│           1. Send context + tools        │
│              to the LLM                  │
└────────────────┬────────────────────────┘
                 │
                 ▼
┌─────────────────────────────────────────┐
│    2. LLM responds with action          │
│       (tool call or text response)      │
└────────────────┬────────────────────────┘
                 │
                 ▼
┌─────────────────────────────────────────┐
│   3. Execute the tool (read, write,     │
│      bash) and get the result           │
└────────────────┬────────────────────────┘
                 │
                 ▼
┌─────────────────────────────────────────┐
│   4. Send the result back to the LLM    │
│      → Go to step 2                     │
└─────────────────────────────────────────┘
```

## Basic Agent Loop Implementation

```java
package com.claudecode.agent;

import com.claudecode.ai.AiService;
import com.claudecode.tools.ToolRegistry;
import com.claudecode.tools.ToolResult;
import java.util.ArrayList;
import java.util.List;
import java.util.Map;

public class AgentLoop {

    private final AiService aiService;
    private final ToolRegistry toolRegistry;
    private final List<Map<String, Object>> messages;

    public AgentLoop(AiService aiService, ToolRegistry toolRegistry) {
        this.aiService = aiService;
        this.toolRegistry = toolRegistry;
        this.messages = new ArrayList<>();
    }

    public String execute(String userPrompt) {
        // Add the user's message to conversation history
        messages.add(Map.of("role", "user", "content", userPrompt));

        int maxIterations = 25;

        for (int i = 0; i < maxIterations; i++) {
            System.out.println("\n─── Iteration " + (i + 1) + " ───");

            // Step 1: Send messages + tools to the LLM
            var response = aiService.sendWithTools(
                messages,
                toolRegistry.getDefinitions()
            );

            var stopReason = (String) response.get("stop_reason");

            // Step 2: Check if the LLM is done
            if ("end_turn".equals(stopReason)) {
                // Extract the final text response
                var content = extractTextContent(response);
                messages.add(Map.of("role", "assistant", "content", content));
                return content;
            }

            // Step 3: Extract tool calls from the response
            var toolCalls = extractToolCalls(response);
            messages.add(Map.of("role", "assistant", "content", toolCalls));

            // Step 4: Execute each tool
            for (var toolCall : toolCalls) {
                var name = (String) toolCall.get("name");
                var args = (Map<String, Object>) toolCall.get("args");

                System.out.println("→ Executing " + name + "(" + args + ")");

                var result = toolRegistry.execute(name, args);

                // Step 5: Send the result back
                messages.add(Map.of(
                    "role", "user",
                    "content", formatToolResult(name, result)
                ));
            }

            // Step 6: Continue the loop
        }

        return "Reached maximum iteration limit of " + maxIterations;
    }

    private String extractTextContent(Map<String, Object> response) {
        // Extract text from the response content blocks
        var content = (List<Map<String, Object>>) response.get("content");
        var sb = new StringBuilder();
        for (var block : content) {
            if ("text".equals(block.get("type"))) {
                sb.append(block.get("text"));
            }
        }
        return sb.toString();
    }

    private List<Map<String, Object>> extractToolCalls(Map<String, Object> response) {
        var content = (List<Map<String, Object>>) response.get("content");
        var calls = new ArrayList<Map<String, Object>>();
        for (var block : content) {
            if ("tool_use".equals(block.get("type"))) {
                calls.add(Map.of(
                    "id", block.get("id"),
                    "name", block.get("name"),
                    "args", block.get("input")
                ));
            }
        }
        return calls;
    }

    private String formatToolResult(String name, ToolResult result) {
        return String.format(
            "Tool '%s' returned:\nSuccess: %s\n%s",
            name, result.success(), result.output()
        );
    }
}
```

## Streaming the Agent Loop

For real-time feedback, stream the LLM's thinking process to the user:

```java
public Flux<String> executeStreaming(String userPrompt) {
    // Return a reactive stream that emits the LLM's thoughts
    // and tool execution status as they happen
    return Flux.create(sink -> {
        messages.add(Map.of("role", "user", "content", userPrompt));

        aiService.streamWithTools(messages, toolRegistry.getDefinitions())
            .doOnNext(sink::next)
            .doOnComplete(sink::complete)
            .subscribe();
    });
}
```

## Managing Context Windows

LLMs have limited context windows. Keep conversation history from growing too large:

```java
private void trimHistoryIfNeeded() {
    int estimatedTokens = estimateTokenCount(messages);
    int maxTokens = 100_000; // Claude's context window

    if (estimatedTokens > maxTokens * 0.7) {
        // Remove oldest messages, keep system prompt and recent context
        var systemMessage = messages.get(0);
        var recentMessages = messages.subList(
            Math.max(1, messages.size() - 10),
            messages.size()
        );
        messages.clear();
        messages.add(systemMessage);
        messages.add(Map.of("role", "user", "content",
            "[Previous conversation context was summarized...]"));
        messages.addAll(recentMessages);
    }
}
```

## Knowledge Check

```knowledgecheck
{
  "question": "Why is the agent loop designed as a continuous cycle rather than a single request-response?",
  "explanation": "Complex tasks require multiple steps. When you ask Claude Code to 'refactor main.py to use a class', it needs to: read the file, analyze it, plan the refactor, write the new version, and verify the result. Each of these steps is a tool call. The loop lets the LLM iteratively discover what needs to happen next based on what it just observed. Without this loop, you'd need to manually prompt it at every step — defeating the purpose of an autonomous agent."
}
```
