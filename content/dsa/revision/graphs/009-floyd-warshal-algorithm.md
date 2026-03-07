---
title: "Floyd Warshal Algorithm"
difficulty: "Medium"
tags: ["graph", "dynamic-programming", "shortest-path"]
---

## Problem

Given a weighted graph, find the shortest path between all pairs of vertices.

## Example

**Input:** graph = [[(1,4),(2,1)],[(3,1)],[(1,2),(3,5)],[]]  
**Output:** [[0,3,1,6],[inf,0,inf,1],[inf,2,0,5],[inf,inf,inf,0]]  

**Input:** graph = [[(1,2)],[(2,3)],[]]  
**Output:** [[0,2,5],[inf,0,3],[inf,inf,0]]  

**Input:** graph = [[],[]]  
**Output:** [[0,inf],[inf,0]]

## Solution Approach

### Method 1: DP
1. def floyd_warshall(graph):
   - n = len(graph)
   - dist = [[float('inf')] * n for _ in range(n)]
   - for i in range(n):
     - dist[i][i] = 0
   - for u in range(n):
     - for v, w in graph[u]:
       - dist[u][v] = w
   - for k in range(n):
     - for i in range(n):
       - for j in range(n):
         - if dist[i][k] != float('inf') and dist[k][j] != float('inf') and dist[i][k] + dist[k][j] < dist[i][j]:
           - dist[i][j] = dist[i][k] + dist[k][j]
   - return dist

## Time Complexity

O(n^3) - Cubic.

## Space Complexity

O(n^2) - Distance matrix.

## Edge Cases

- **No edges**: inf except diagonal
- **Negative weights**: Works if no cycle
- **Disconnected**: inf
- **Single node**: [[0]]

## Applications

- **Graph Algorithms**: All pairs shortest paths
- **Dynamic Programming**: Relaxation
- **Networks**: Routing tables
- **Interview Questions**: Medium

## Practice Tips

- Initialize dist matrix
- Add direct edges
- Relax via intermediate k
- Handle inf carefully
