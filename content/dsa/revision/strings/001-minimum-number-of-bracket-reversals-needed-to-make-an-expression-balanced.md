---
title: "Minimum number of bracket reversals needed to make an expression balanced"
difficulty: "Medium"
tags: ["string", "stack"]
---

## Problem

Given a string s consisting of '(' and ')', find the minimum number of bracket reversals needed to make the expression balanced.

## Example

**Input:** s = "(()"  
**Output:** 1 (change last to ')')  

**Input:** s = "())"  
**Output:** 1 (change first to '(')  

**Input:** s = "))(("  
**Output:** 4 (all need reversal)

## Solution Approach

### Method 1: Stack
1. stack = []
2. reversals = 0
3. for char in s:
   - if char == '(':
     - stack.append(char)
   - else:
     - if stack:
       - stack.pop()
     - else:
       - reversals += 1
       - stack.append(char)
4. reversals += len(stack) // 2
5. return reversals

## Time Complexity

O(n) - Linear.

## Space Complexity

O(n) - Stack.

## Edge Cases

- **Balanced**: 0
- **All open**: n/2
- **All close**: n/2
- **Mixed**: Count unmatched

## Applications

- **String Problems**: Balancing
- **Stack**: Parentheses
- **Expressions**: Validation
- **Interview Questions**: Medium

## Practice Tips

- Use stack for matching
- Count extra closes
- Handle remaining opens
- Min reversals
