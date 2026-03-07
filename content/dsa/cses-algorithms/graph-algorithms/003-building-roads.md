---
title: "Building Roads"
cses: "https://cses.fi/problemset/task/1666"
difficulty: "Easy"
tags: ["implementation", "graph", "dfs", "union-find"]
---

## Problem

Connect cities with roads, find min roads to connect all, list them.

## Example

**Input:** 4 2  
1 2  
3 4  
**Output:** 1  
1 3  

**Input:** 3 0  
**Output:** 2  
1 2  
2 3  

**Input:** 1 0  
**Output:** 0

## Solution Approach

### Method 1: DFS Components
1. def dfs(u):
   - visited[u] = True
   - for v in graph[u]:
     - if not visited[v]:
       - dfs(v)
2. components = []
3. for i in range(1, n+1):
   - if not visited[i]:
     - dfs(i)
     - components.append(i)
4. roads = []
5. for i in range(1, len(components)):
   - roads.append((components[0], components[i]))
6. print(len(roads))
7. for a, b in roads:
   - print(a, b)

## Time Complexity

O(n + m) - DFS.

## Space Complexity

O(n + m) - Graph.

## Edge Cases

- **Connected**: 0
- **Disconnected**: n-1 roads
- **Single city**: 0
- **All separate**: n-1

## Applications

- **Graph**: Connectivity
- **Components**: DFS
- **Minimum roads**: Tree

## Practice Tips

- Find components
- Connect with roads
- List roads
- Min spanning
