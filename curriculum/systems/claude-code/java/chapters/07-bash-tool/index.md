---
title: "Implement the Bash Tool"
description: "Let Claude Code run terminal commands and see their output"
order: 7
estimatedTime: "1 hour"
---

# Implement the Bash Tool

The most powerful tool in Claude Code is the ability to **run commands**. With bash access, Claude can install dependencies, run tests, start servers, and debug issues — just like a human developer.

## The Bash Tool Definition

```java
public static ToolDefinition bashTool() {
    return new ToolDefinition(
        "bash",
        "Execute a bash command in the project's terminal. " +
        "Use this to run build commands, execute tests, install " +
        "dependencies, or debug issues.",
        Map.of(
            "type", "object",
            "properties", Map.of(
                "command", Map.of(
                    "type", "string",
                    "description", "The bash command to execute"
                ),
                "timeout", Map.of(
                    "type", "number",
                    "description", "Maximum execution time in seconds",
                    "default", 30
                )
            ),
            "required", java.util.List.of("command")
        )
    );
}
```

## The Bash Handler

```java
package com.claudecode.tools;

import java.io.*;
import java.nio.file.Path;
import java.nio.file.Paths;
import java.util.Map;
import java.util.concurrent.TimeUnit;

public class BashToolHandler implements ToolHandler {

    private final Path projectRoot;

    public BashToolHandler() {
        this.projectRoot = Paths.get(System.getProperty("user.dir"));
    }

    @Override
    public ToolDefinition getDefinition() {
        return ToolDefinition.bashTool();
    }

    @Override
    public ToolResult execute(Map<String, Object> args) {
        var command = (String) args.get("command");
        var timeout = args.containsKey("timeout")
            ? ((Number) args.get("timeout")).intValue()
            : 30;

        try {
            var processBuilder = new ProcessBuilder(
                "bash", "-c", command
            );
            processBuilder.directory(projectRoot.toFile());
            processBuilder.redirectErrorStream(true);

            var process = processBuilder.start();

            // Read output in a separate thread to prevent deadlocks
            var output = new StringBuilder();
            var reader = new Thread(() -> {
                try (var br = new BufferedReader(
                        new InputStreamReader(process.getInputStream()))) {
                    String line;
                    while ((line = br.readLine()) != null) {
                        output.append(line).append("\n");
                    }
                } catch (IOException e) {
                    // Stream closed when process ends
                }
            });
            reader.start();

            boolean finished = process.waitFor(timeout, TimeUnit.SECONDS);

            if (!finished) {
                process.destroyForcibly();
                return new ToolResult(false,
                    "Command timed out after " + timeout + " seconds:\n" +
                    output.toString());
            }

            reader.join(1000);

            int exitCode = process.exitValue();
            var result = output.toString();

            // Truncate very long output
            if (result.length() > 50_000) {
                result = result.substring(0, 50_000) +
                    "\n... [output truncated at 50,000 characters]";
            }

            return new ToolResult(
                exitCode == 0,
                String.format("Exit code: %d\n%s", exitCode, result)
            );

        } catch (Exception e) {
            return new ToolResult(false,
                "Error executing command: " + e.getMessage());
        }
    }
}
```

## Sandboxing Commands

For safety, implement command allowlists and blocklists:

```java
public class CommandValidator {

    private static final java.util.Set<String> BLOCKED_PREFIXES = java.util.Set.of(
        "rm -rf /", "sudo ", "reboot", "shutdown",
        ":(){ :|:& };:", "dd if=", "mkfs"
    );

    private static final java.util.Set<String> DESTRUCTIVE_PATTERNS = java.util.Set.of(
        "drop table", "truncate", "> /dev/", "> /proc/"
    );

    public static boolean isSafe(String command) {
        var lower = command.toLowerCase().trim();

        // Check blocked prefixes
        for (var prefix : BLOCKED_PREFIXES) {
            if (lower.startsWith(prefix)) {
                return false;
            }
        }

        // Check destructive patterns
        for (var pattern : DESTRUCTIVE_PATTERNS) {
            if (lower.contains(pattern)) {
                return false;
            }
        }

        return true;
    }
}
```

## Interactive Processes

Some commands (like `python` or `node`) start interactive shells. Detect and handle these:

```java
private boolean isInteractiveCommand(String command) {
    return command.trim().equals("python") ||
           command.trim().equals("python3") ||
           command.trim().equals("node") ||
           command.trim().matches("^(python|node|bash|sh)\\s*$");
}

// In execute():
if (isInteractiveCommand(command)) {
    return new ToolResult(false,
        "Cannot start interactive session. " +
        "Use explicit commands instead (e.g., 'python script.py')");
}
```

## Knowledge Check

```knowledgecheck
{
  "question": "Why is the bash tool potentially the most dangerous — and most powerful — tool in Claude Code?",
  "explanation": "Bash access gives Claude the ability to do anything a developer can do: run tests, install packages, check logs, and debug issues. But it also means Claude could accidentally delete files, corrupt data, or run destructive commands. That's why sandboxing is essential — validating commands before execution, setting timeouts to prevent hung processes, truncating output to prevent token overflow, and rejecting interactive shells that would hang the agent. The power comes with responsibility."
}
```
