---
title: "Tree Matching"
cses: "https://cses.fi/problemset/task/1678"
difficulty: "Medium"
tags: ["implementation", "tree", "dynamic-programming", "matching"]
---

## Problem

Max matching in tree.

## Example

**Input:** 5  
1 2  
2 3  
3 4  
3 5  
**Output:** 2  

**Input:** 3  
1 2  
1 3  
**Output:** 1  

**Input:** 1  
**Output:** 0

## Solution Approach

### Method 1: DP on Trees
1. def dfs(node, parent):
   - # dp0: not taken, dp1: taken
   - dp0, dp1 = 0, 1
   - for child in graph[node]:
     - if child != parent:
       - c0, c1 = dfs(child, node)
       - dp0 += max(c0, c1)
       - dp1 += c0  # Can't take child if parent taken
   - return dp0, dp1
2. dp0, dp1 = dfs(1, -1)
3. print(max(dp0, dp1))

## Time Complexity

O(n) - Linear.

## Space Complexity

O(n) - Recursion.

## Edge Cases

- **Single node**: 0
- **Two nodes**: 1
- **Linear tree**: Floor(n/2)
- **Star**: 1

## Applications

- **Trees**: Matching
- **DP**: Tree DP
- **Graphs**: Tree algorithms

## Practice Tips

- Tree DP states
- Max matching
- DFS traversal
- Combine results
