---
title: "Building Teams"
cses: "https://cses.fi/problemset/task/1668"
difficulty: "Easy"
tags: ["implementation", "graph", "dfs", "bipartite"]
---

## Problem

Color the graph with 2 colors, assign teams.

## Example

**Input:** 5 3  
1 2  
1 3  
4 5  
**Output:** 1 2 2 1 2  

**Input:** 3 3  
1 2  
2 3  
3 1  
**Output:** IMPOSSIBLE  

**Input:** 1 0  
**Output:** 1

## Solution Approach

### Method 1: DFS Coloring
1. color = [0] * (n + 1)
2. def dfs(u, c):
   - color[u] = c
   - for v in graph[u]:
     - if color[v] == 0:
       - if not dfs(v, 3 - c):
         - return False
     - elif color[v] == c:
       - return False
   - return True
3. for i in range(1, n + 1):
   - if color[i] == 0:
     - if not dfs(i, 1):
       - print("IMPOSSIBLE")
       - exit()
4. print(' '.join(map(str, color[1:])))

## Time Complexity

O(n + m) - DFS.

## Space Complexity

O(n + m) - Graph.

## Edge Cases

- **Bipartite**: Colors
- **Odd cycle**: IMPOSSIBLE
- **Single node**: 1
- **Disconnected**: Colors

## Applications

- **Graph**: Bipartite check
- **Coloring**: Teams
- **DFS**: Recursive

## Practice Tips

- DFS coloring
- Check conflicts
- Assign 1 or 2
- Handle all components
