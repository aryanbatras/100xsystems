---
title: "Shortest Routes II"
cses: "https://cses.fi/problemset/task/1672"
difficulty: "Medium"
tags: ["implementation", "graph", "floyd-warshall"]
---

## Problem

Find all pairs shortest paths.

## Example

**Input:** 3 2  
1 2 2  
1 3 5  
**Output:** 0 2 5  
INF 0 3  
INF INF 0  

**Input:** 2 1  
1 2 1  
**Output:** 0 1  
INF 0  

**Input:** 2 0  
**Output:** 0 INF  
INF 0

## Solution Approach

### Method 1: Floyd Warshall
1. dist = [[float('inf')] * n for _ in range(n)]
2. for i in range(n):
   - dist[i][i] = 0
3. for u, v, w in edges:
   - dist[u-1][v-1] = min(dist[u-1][v-1], w)
   - dist[v-1][u-1] = min(dist[v-1][u-1], w)  # if undirected
4. for k in range(n):
   - for i in range(n):
     - for j in range(n):
       - if dist[i][k] != float('inf') and dist[k][j] != float('inf'):
         - dist[i][j] = min(dist[i][j], dist[i][k] + dist[k][j])
5. for row in dist:
   - for d in row:
     - if d == float('inf'):
       - print("INF", end=' ')
     - else:
       - print(d, end=' ')
   - print()

## Time Complexity

O(n^3) - Floyd.

## Space Complexity

O(n^2) - Dist matrix.

## Edge Cases

- **No paths**: INF
- **Self**: 0
- **Direct**: Weight
- **Negative**: Not

## Applications

- **Graph**: All pairs
- **Floyd Warshall**: DP
- **Shortest paths**: Dense

## Practice Tips

- Initialize dist
- Add edges
- Relax via k
- Handle INF
