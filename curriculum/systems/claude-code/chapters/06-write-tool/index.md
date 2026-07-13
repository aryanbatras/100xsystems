---
title: "Implement the Write Tool"
description: "Let Claude Code create and modify files in the project"
order: 6
estimatedTime: "1 hour"
---

# Implement the Write Tool

The read tool lets Claude examine code. The write tool lets it **change** code. This is where Claude Code becomes truly useful — it can refactor, fix bugs, and add features autonomously.

## Writing vs Editing

There are two approaches to modifying files:

| Approach | When to Use |
|---|---|
| **Write entire file** | Creating new files, small files |
| **Edit specific lines** | Making targeted changes to large files |

For a practical agent, implement both. But start with simple whole-file writes.

## The Write Tool Definition

```java
public static ToolDefinition writeTool() {
    return new ToolDefinition(
        "write",
        "Write content to a file in the project. " +
        "Creates the file if it doesn't exist, " +
        "overwrites if it does. " +
        "Use this to create new files or update entire files.",
        Map.of(
            "type", "object",
            "properties", Map.of(
                "filePath", Map.of(
                    "type", "string",
                    "description", "Path relative to project root"
                ),
                "content", Map.of(
                    "type", "string",
                    "description", "The full content to write"
                )
            ),
            "required", java.util.List.of("filePath", "content")
        )
    );
}
```

## The Write Handler

```java
package com.claudecode.tools;

import java.io.IOException;
import java.nio.file.Files;
import java.nio.file.Path;
import java.nio.file.Paths;
import java.util.Map;

public class WriteToolHandler implements ToolHandler {

    private final Path projectRoot;

    public WriteToolHandler() {
        this.projectRoot = Paths.get(System.getProperty("user.dir"));
    }

    @Override
    public ToolDefinition getDefinition() {
        return ToolDefinition.writeTool();
    }

    @Override
    public ToolResult execute(Map<String, Object> args) {
        try {
            var filePath = (String) args.get("filePath");
            var content = (String) args.get("content");
            var resolved = projectRoot.resolve(filePath).normalize();

            // Security: prevent path traversal
            if (!resolved.startsWith(projectRoot)) {
                return new ToolResult(false,
                    "Access denied: path outside project directory");
            }

            // Create parent directories if they don't exist
            Files.createDirectories(resolved.getParent());

            // Write the file
            Files.writeString(resolved, content);

            var fileSize = Files.size(resolved);
            return new ToolResult(true, String.format(
                "Written %d bytes to %s", fileSize, filePath));

        } catch (IOException e) {
            return new ToolResult(false,
                "Error writing file: " + e.getMessage());
        }
    }
}
```

## Line-Level Editing

For large files, whole-file writes waste tokens. Implement surgical edits:

```java
public class EditToolHandler implements ToolHandler {

    @Override
    public ToolResult execute(Map<String, Object> args) {
        var filePath = (String) args.get("filePath");
        var oldString = (String) args.get("oldString");
        var newString = (String) args.get("newString");

        try {
            var resolved = projectRoot.resolve(filePath).normalize();
            var content = Files.readString(resolved);

            // Find and replace
            if (!content.contains(oldString)) {
                return new ToolResult(false,
                    "Could not find the specified text in the file. " +
                    "The exact string must match for the edit to work.");
            }

            var updated = content.replace(oldString, newString);
            Files.writeString(resolved, updated);

            return new ToolResult(true, "Edit applied successfully");

        } catch (IOException e) {
            return new ToolResult(false,
                "Error editing file: " + e.getMessage());
        }
    }
}
```

## Error Recovery

When an edit fails (e.g., the old string wasn't found), Claude should retry with a more careful approach:

```java
// The agent loop handles this naturally — if the tool returns
// an error, Claude sees the error message and tries again with
// a corrected version of the edit.
//
// Example conversation:
// Claude: Let me read the file first to see the exact content.
// → read("src/main.py")
// → File content returned
// Claude: Now I can make the edit with the exact text.
// → edit("src/main.py", "...", "...")
// → Edit applied successfully
```

## Knowledge Check

```knowledgecheck
{
  "question": "Why is line-level editing (find-and-replace) better than writing entire files for an AI coding agent?",
  "explanation": "When modifying a large file, rewriting the entire thing wastes tokens and risks introducing subtle errors in parts of the code the agent wasn't trying to change. Line-level edits let the agent make targeted changes with surgical precision. The LLM only needs to generate the search/replace strings, which are much shorter than the full file. If the edit fails because the text doesn't match exactly, Claude reads the file again and retries — this self-correcting behavior is a core strength of the agent loop."
}
```
