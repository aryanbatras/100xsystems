---
title: "Bridges in Graph"
difficulty: "Medium"
tags: ["graph", "depth-first-search", "data-structure"]
---

## Problem

Given an undirected graph, find all bridges in the graph. A bridge is an edge whose removal increases the number of connected components.

## Example

**Input:** graph = [[1,2],[0,2],[0,1,3,4],[2,4],[2,3]], n = 5  
**Output:** [(2,3),(3,4)]  

**Input:** graph = [[1],[0,2],[1]], n = 3  
**Output:** [(1,2)]  

**Input:** graph = [[1],[0]], n = 2  
**Output:** [(0,1)]

## Solution Approach

### Method 1: DFS with Discovery and Low Values
1. disc = [-1] * n
2. low = [-1] * n
3. time = 0
4. bridges = []
5. def dfs(u, parent):
   - nonlocal time
   - disc[u] = low[u] = time
   - time += 1
   - for v in graph[u]:
     - if v == parent: continue
     - if disc[v] == -1:
       - dfs(v, u)
       - low[u] = min(low[u], low[v])
       - if low[v] > disc[u]:
         - bridges.append((min(u,v), max(u,v)))
     - else:
       - low[u] = min(low[u], disc[v])
6. for i in range(n):
   - if disc[i] == -1:
     - dfs(i, -1)
7. return bridges

## Time Complexity

O(v + e) - DFS traversal.

## Space Complexity

O(v) - Arrays.

## Edge Cases

- **No bridges**: []
- **All bridges**: Tree edges
- **Disconnected**: Per component
- **Single edge**: Bridge

## Applications

- **Graph Algorithms**: Connectivity
- **DFS**: Tarjan's algorithm
- **Networks**: Critical edges
- **Interview Questions**: Medium

## Practice Tips

- Track discovery time
- Update low values
- Bridge if low[v] > disc[u]
- Handle undirected graph
