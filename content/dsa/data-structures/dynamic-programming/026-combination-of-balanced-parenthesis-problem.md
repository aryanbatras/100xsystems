---
title: "Combination of Balanced Parenthesis Problem"
difficulty: "Medium"
tags: ["dynamic-programming", "backtracking", "string"]
---

## Problem

Generate all combinations of n pairs of balanced parentheses.

## Example

**Input:** n = 2  
**Output:** ["(())", "()()"]  

**Input:** n = 1  
**Output:** ["()"]  

**Input:** n = 3  
**Output:** ["((()))", "(()())", "(())()", "()(())", "()()()"]

## Solution Approach

### Method 1: Backtracking
1. result = []
2. def backtrack(open_count, close_count, current):
   - if open_count == n and close_count == n:
     - result.append(current)
     - return
   - if open_count < n:
     - backtrack(open_count + 1, close_count, current + '(')
   - if close_count < open_count:
     - backtrack(open_count, close_count + 1, current + ')')
3. backtrack(0, 0, "")
4. return result

## Time Complexity

O(4^n) - Catalan number.

## Space Complexity

O(n) - Recursion stack.

## Edge Cases

- **n = 0**: []
- **n = 1**: ["()"]
- **Large n**: Many combinations

## Applications

- **Expression Generation**: Balanced expressions
- **Parsing**: Valid structures
- **Combinatorics**: Catalan numbers
- **Interview Questions**: Backtracking

## Practice Tips

- Track open and close counts
- Add '(' if open < n
- Add ')' if close < open
- Collect at base case
