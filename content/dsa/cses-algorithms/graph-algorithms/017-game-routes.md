---
title: "Game Routes"
cses: "https://cses.fi/problemset/task/1681"
difficulty: "Medium"
tags: ["implementation", "graph", "dp", "topological-sort"]
---

## Problem

Count the number of paths from 1 to n in a DAG.

## Example

**Input:** 4 5  
1 2  
1 3  
3 2  
2 4  
3 4  
**Output:** 3  

**Input:** 2 1  
1 2  
**Output:** 1  

**Input:** 2 0  
**Output:** 0

## Solution Approach

### Method 1: DP on DAG
1. MOD = 10**9 + 7
2. # Assume topological order or use memo
3. ways = [0] * (n + 1)
4. ways[1] = 1
5. def dfs(u):
   - if ways[u] != 0: return ways[u]
   - for v in graph[u]:
     - ways[u] = (ways[u] + dfs(v)) % MOD
   - return ways[u]
6. print(dfs(n))

## Time Complexity

O(n + m) - DFS.

## Space Complexity

O(n + m) - Graph.

## Edge Cases

- **No path**: 0
- **Direct**: 1
- **Multiple**: Sum
- **Cycles**: Assume DAG

## Applications

- **Graph**: Path counting
- **DP**: Memoization
- **DAG**: Acyclic

## Practice Tips

- DFS with memo
- Sum from children
- Mod 10^9+7
- Start from 1
