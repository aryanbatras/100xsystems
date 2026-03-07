---
title: "High Score"
cses: "https://cses.fi/problemset/task/1673"
difficulty: "Medium"
tags: ["implementation", "graph", "bellman-ford"]
---

## Problem

Find the maximum score path from 1 to n, handle negative cycles.

## Example

**Input:** 4 5  
1 2 3  
2 4 -1  
1 3 -2  
3 4 7  
1 4 4  
**Output:** 5  

**Input:** 3 3  
1 2 5  
2 3 -1  
1 3 1  
**Output:** 5  

**Input:** 2 2  
1 2 3  
2 1 -5  
**Output:** INF

## Solution Approach

### Method 1: Bellman Ford for Max
1. dist = [float('-inf')] * (n + 1)
2. dist[1] = 0
3. for _ in range(n - 1):
   - for u, v, w in edges:
     - if dist[u] != float('-inf'):
       - dist[v] = max(dist[v], dist[u] + w)
4. # Check for positive cycles
5. has_cycle = False
6. for u, v, w in edges:
   - if dist[u] != float('-inf') and dist[u] + w > dist[v]:
     - has_cycle = True
     - break
7. if has_cycle:
   - print("INF")
8. else:
   - print(dist[n] if dist[n] != float('-inf') else "INF")

## Time Complexity

O(n * m) - Bellman.

## Space Complexity

O(n) - Dist.

## Edge Cases

- **No path**: INF
- **Positive cycle**: INF
- **Negative only**: Max
- **Direct**: Weight

## Applications

- **Graph**: Max path
- **Bellman Ford**: Relax
- **Cycles**: Positive

## Practice Tips

- Relax for max
- Check for cycles
- Handle INF
- Negative weights
