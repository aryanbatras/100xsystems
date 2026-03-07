---
title: "Cycle Finding"
cses: "https://cses.fi/problemset/task/1197"
difficulty: "Medium"
tags: ["implementation", "graph", "bellman-ford"]
---

## Problem

Find if there is a negative cycle in the graph.

## Example

**Input:** 4 5  
1 2 3  
2 4 -1  
1 3 -2  
3 4 7  
1 4 4  
**Output:** -1  

**Input:** 3 3  
1 2 5  
2 3 -1  
1 3 1  
**Output:** -1  

**Input:** 2 2  
1 2 3  
2 1 -5  
**Output:** 2  

## Solution Approach

### Method 1: Bellman Ford
1. dist = [0] * (n + 1)
2. for _ in range(n):
   - for u, v, w in edges:
     - if dist[u] + w < dist[v]:
       - dist[v] = dist[u] + w
3. # Check for negative cycle
4. for u, v, w in edges:
   - if dist[u] + w < dist[v]:
     - print(-1)
     - return
5. print(0)

## Time Complexity

O(n * m) - Bellman.

## Space Complexity

O(n) - Dist.

## Edge Cases

- **No negative cycle**: 0
- **Negative cycle**: -1
- **Positive only**: 0
- **Single node**: 0

## Applications

- **Graph**: Cycle detection
- **Bellman Ford**: Negative
- **Weights**: Negative

## Practice Tips

- Relax n times
- Check nth time
- If update, cycle
- Handle negative
