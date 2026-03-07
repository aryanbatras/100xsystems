---
title: "Round Trip II"
cses: "https://cses.fi/problemset/task/1678"
difficulty: "Medium"
tags: ["implementation", "graph", "dfs", "cycle"]
---

## Problem

Find a cycle in a directed graph and print it.

## Example

**Input:** 4 5  
1 3  
2 1  
2 4  
3 2  
3 4  
**Output:** 3  
2 1 3 2  

**Input:** 4 4  
1 2  
4 1  
2 3  
3 4  
**Output:** IMPOSSIBLE  

**Input:** 1 0  
**Output:** IMPOSSIBLE

## Solution Approach

### Method 1: DFS Color
1. color = [0] * (n + 1)  # 0 white, 1 gray, 2 black
2. def dfs(u, path):
   - color[u] = 1
   - path.append(u)
   - for v in graph[u]:
     - if color[v] == 0:
       - if dfs(v, path):
         - return True
     - elif color[v] == 1:
       - # Cycle found
       - idx = path.index(v)
       - cycle = path[idx:] + [v]
       - print(len(cycle))
       - print(' '.join(map(str, cycle)))
       - return True
   - path.pop()
   - color[u] = 2
   - return False
3. for i in range(1, n + 1):
   - if color[i] == 0:
     - if dfs(i, []):
       - exit()
4. print("IMPOSSIBLE")

## Time Complexity

O(n + m) - DFS.

## Space Complexity

O(n + m) - Graph and path.

## Edge Cases

- **No cycle**: IMPOSSIBLE
- **Cycle exists**: Print cycle
- **Self loop**: Cycle
- **Multiple components**: Check all

## Applications

- **Graph**: Directed cycle
- **DFS**: Color coding
- **Path**: Cycle reconstruction

## Practice Tips

- DFS with color
- Track path
- Detect back to gray
- Extract cycle
