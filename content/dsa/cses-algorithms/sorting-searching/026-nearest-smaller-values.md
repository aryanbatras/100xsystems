---
title: "Nearest Smaller Values"
cses: "https://cses.fi/problemset/task/1645"
difficulty: "Easy"
tags: ["implementation", "stack", "monotonic-stack"]
---

## Problem

Given an array, for each element, find the nearest smaller element to its left. If none, 0.

## Example

**Input:** 8  
2 5 1 4 8 3 2 5  
**Output:** 0 2 0 1 4 1 0 2  

**Input:** 4  
1 2 3 4  
**Output:** 0 1 2 3  

**Input:** 3  
3 2 1  
**Output:** 0 0 0

## Solution Approach

### Method 1: Stack
1. stack = []
2. result = []
3. for num in a:
   - while stack and stack[-1] >= num:
     - stack.pop()
   - if stack:
     - result.append(stack[-1])
   - else:
     - result.append(0)
   - stack.append(num)
4. print(' '.join(map(str, result)))

## Time Complexity

O(n) - Linear.

## Space Complexity

O(n) - Stack.

## Edge Cases

- **Decreasing**: 0
- **Increasing**: Previous
- **Duplicates**: Smaller
- **First**: 0

## Applications

- **Arrays**: Nearest smaller
- **Stack**: Monotonic
- **Queries**: Left neighbor

## Practice Tips

- Use stack for candidates
- Pop larger
- Push current
- Record nearest
