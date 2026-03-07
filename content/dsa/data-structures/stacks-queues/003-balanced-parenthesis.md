---
title: "Balanced Parenthesis"
leetcode: "https://leetcode.com/problems/valid-parentheses/"
difficulty: "Easy"
tags: ["string", "stack"]
---

## Problem

Given a string s containing just the characters '(', ')', '{', '}', '[' and ']', determine if the input string is valid.

An input string is valid if:

1. Open brackets must be closed by the same type of brackets.
2. Open brackets must be closed in the correct order.
3. Every close bracket has a corresponding open bracket of the same type.

## Example

**Input:** s = "()"  
**Output:** true  

**Input:** s = "()[]{}"  
**Output:** true  

**Input:** s = "(]"  
**Output:** false  

**Input:** s = "([)]"  
**Output:** false  

**Input:** s = "{[]}"  
**Output:** true

## Solution Approach

### Method 1: Stack
1. Initialize an empty stack
2. For each character in the string:
   - If it's an opening bracket ('(', '{', '['), push it onto the stack
   - If it's a closing bracket (')', '}', ']'):
     - If the stack is empty, return false
     - Pop the top of the stack
     - If the popped bracket doesn't match the current closing bracket, return false
3. After processing all characters, if the stack is empty, return true; otherwise, return false

## Time Complexity

O(n) - Single pass through the string.

## Space Complexity

O(n) - Worst case for stack.

## Edge Cases

- **Empty string**: true
- **Single bracket**: false
- **Only opening brackets**: false
- **Only closing brackets**: false
- **Nested brackets**: true
- **Wrong order**: false

## Applications

- **Code Parsing**: Syntax checking
- **Expression Validation**: Mathematical expressions
- **Text Processing**: Balanced tags
- **Compiler Design**: Bracket matching

## Practice Tips

- Use a stack for LIFO
- Map closing to opening brackets
- Handle all types of brackets
- Check stack state at end
