---
title: "Eulerian Subgraph"
cses: "https://cses.fi/problemset/task/2078"
difficulty: "Medium"
tags: ["implementation", "graph", "eulerian", "subgraph"]
---

## Problem

Find subgraph with Eulerian path.

## Example

**Input:** 6 7  
1 2  
1 4  
2 3  
3 4  
4 5  
5 6  
6 4  
**Output:** 4  
1 4  
4 5  
5 6  
6 4  

## Solution Approach

### Method 1: Find Connected Components with Even Degrees
visited = [False] * (n+1)
component_edges = []

def dfs(node, edges):
    visited[node] = True
    for nei in graph[node]:
        if not visited[nei]:
            edges.append((node, nei))
            dfs(nei, edges)

for i in range(1, n+1):
    if not visited[i]:
        edges = []
        dfs(i, edges)
        # Check degrees in component
        deg = [0] * (n+1)
        for u, v in edges:
            deg[u] += 1
            deg[v] += 1
        even = True
        for d in deg:
            if d % 2 == 1:
                even = False
                break
        if even and edges:
            component_edges = edges
            break

if component_edges:
    print(len(component_edges))
    for u, v in component_edges:
        print(u, v)
else:
    print(0)

## Time Complexity

O(n + m) - DFS.

## Space Complexity

O(n + m).

## Edge Cases

- **No Eulerian**: 0
- **Whole graph**: All edges
- **Disconnected**: Largest component
- **Cycles**: Component

## Applications

- **Graphs**: Eulerian subgraphs
- **Connectivity**: Components
- **Degrees**: Even degrees

## Practice Tips

- DFS for components
- Check degrees
- Collect edges
- Handle multiple
