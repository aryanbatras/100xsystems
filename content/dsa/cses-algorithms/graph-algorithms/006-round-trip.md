---
title: "Round Trip"
cses: "https://cses.fi/problemset/task/1669"
difficulty: "Easy"
tags: ["implementation", "graph", "dfs", "cycle"]
---

## Problem

Find a cycle in the graph and print it.

## Example

**Input:** 5 6  
1 3  
1 2  
5 3  
1 5  
2 4  
4 5  
**Output:** 4  
2 4 5 1 2  

**Input:** 4 3  
1 2  
2 3  
3 4  
**Output:** IMPOSSIBLE  

**Input:** 1 0  
**Output:** IMPOSSIBLE

## Solution Approach

### Method 1: DFS Cycle Detection
1. def dfs(u, parent):
   - visited[u] = True
   - for v in graph[u]:
     - if v == parent:
       - continue
     - if visited[v]:
       - # Cycle found
       - # Reconstruct path
       - path = []
       - current = u
       - while current != v:
         - path.append(current)
         - current = parent_array[current]
       - path.append(v)
       - path.append(u)
       - print(len(path))
       - print(' '.join(map(str, path)))
       - exit()
     - else:
       - parent_array[v] = u
       - dfs(v, u)
2. visited = [False] * (n + 1)
3. parent_array = [0] * (n + 1)
4. for i in range(1, n + 1):
   - if not visited[i]:
     - dfs(i, -1)
5. print("IMPOSSIBLE")

## Time Complexity

O(n + m) - DFS.

## Space Complexity

O(n + m) - Graph.

## Edge Cases

- **No cycle**: IMPOSSIBLE
- **Cycle exists**: Print cycle
- **Self loop**: Cycle
- **Disconnected**: Check all

## Applications

- **Graph**: Cycle detection
- **DFS**: Back edges
- **Path reconstruction**: Cycle

## Practice Tips

- DFS with parent
- Detect visited back edge
- Reconstruct cycle
- Handle multiple components
