---
title: "Cd and pwd commands"
codeforces: "https://codeforces.com/problemset/problem/158/C"
difficulty: "Easy"
tags: ["stacks-queues-priorityqueues", "simulation"]
---

## Problem

Simulate cd and pwd commands.

## Example

**Input:** 5  
pwd  
cd /  
pwd  
cd home  
pwd  
**Output:** /  
/  
/home  

## Solution Approach

### Method 1: Stack for path

Maintain current directory with stack.

## Time Complexity

O(n)

## Space Complexity

O(n)

## Edge Cases

- cd ..

## Applications

- File system simulation

## Practice Tips

- Handle / and ..
