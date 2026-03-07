---
title: "Longest Flight Route"
cses: "https://cses.fi/problemset/task/1680"
difficulty: "Medium"
tags: ["implementation", "graph", "dp", "topological-sort"]
---

## Problem

Find the longest path from 1 to n in a DAG.

## Example

**Input:** 4 5  
1 2  
1 3  
3 2  
2 4  
3 4  
**Output:** 3  
1 3 2 4  

**Input:** 2 1  
1 2  
**Output:** 2  
1 2  

**Input:** 2 0  
**Output:** IMPOSSIBLE

## Solution Approach

### Method 1: Topological DP
1. # Assume DAG, topological order
2. dist = [-1] * (n + 1)
3. parent = [0] * (n + 1)
4. dist[1] = 1
5. # DFS for longest path
6. def dfs(u):
   - if dist[u] != -1: return dist[u]
   - max_len = 0
   - for v in graph[u]:
     - length = dfs(v)
     - if length > max_len:
       - max_len = length
       - parent[v] = u
   - dist[u] = max_len + 1
   - return dist[u]
7. dfs(1)
8. if dist[n] == 0:
   - print("IMPOSSIBLE")
9. else:
   - path = []
   - current = n
   - while current != 0:
     - path.append(current)
     - current = parent[current]
   - path.reverse()
   - print(len(path))
   - print(' '.join(map(str, path)))

## Time Complexity

O(n + m) - DFS.

## Space Complexity

O(n + m) - Graph.

## Edge Cases

- **No path**: IMPOSSIBLE
- **Direct**: 2
- **Long chain**: Length
- **Multiple paths**: Longest

## Applications

- **Graph**: DAG longest path
- **DP**: Memoization
- **Path**: Reconstruction

## Practice Tips

- DFS with memo
- Track max length
- Reconstruct path
- Handle no path
