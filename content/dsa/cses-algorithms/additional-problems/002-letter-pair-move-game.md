---
title: "Letter Pair Move Game"
cses: "https://cses.fi/problemset/task/2422"
difficulty: "Easy"
tags: ["implementation", "string", "stack", "game"]
---

## Problem

Game with string, remove pairs.

## Example

**Input:** abba  

**Output:** A  

## Solution Approach

### Method 1: Stack
stack = []

for c in s:

    if stack and stack[-1] == c:

        stack.pop()

    else:

        stack.append(c)

if not stack:

    print("Empty")

else:

    print(''.join(stack))

## Time Complexity

O(n) - Stack.

## Space Complexity

O(n).

## Edge Cases

- **All pairs**: Empty

- **No pairs**: Original

- **Single**: Itself

- **Alternating**: Remains

## Applications

- **Strings**: Pair removal

- **Stack**: Simulation

- **Games**: Moves

## Practice Tips

- Stack for pairs

- Remove matching

- Handle game rules

- Output result
