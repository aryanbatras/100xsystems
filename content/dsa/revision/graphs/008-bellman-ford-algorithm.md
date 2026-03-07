---
title: "Bellman Ford Algorithm"
difficulty: "Medium"
tags: ["graph", "dynamic-programming", "shortest-path"]
---

## Problem

Given a weighted graph with possible negative weights and a source vertex, find the shortest path from source to all other vertices. Detect negative cycles.

## Example

**Input:** graph = [[(1,4),(2,1)],[(3,1)],[(1,2),(3,5)],[]], src = 0  
**Output:** [0,3,1,6]  

**Input:** graph = [[(1,-1)],[(2,-1)],[(0,-1)]], src = 0  
**Output:** "Negative cycle"  

**Input:** graph = [[(1,2)],[]], src = 0  
**Output:** [0,2]

## Solution Approach

### Method 1: Relaxation
1. def bellman_ford(graph, src):
   - n = len(graph)
   - dist = [float('inf')] * n
   - dist[src] = 0
   - for _ in range(n - 1):
     - for u in range(n):
       - for v, w in graph[u]:
         - if dist[u] != float('inf') and dist[u] + w < dist[v]:
           - dist[v] = dist[u] + w
   - # Check negative cycle
   - for u in range(n):
     - for v, w in graph[u]:
       - if dist[u] != float('inf') and dist[u] + w < dist[v]:
         - return "Negative cycle"
   - return dist

## Time Complexity

O(n * e) - Iterations and edges.

## Space Complexity

O(n) - Distance array.

## Edge Cases

- **Negative cycle**: Detect
- **No negative**: Works like Dijkstra
- **Unreachable**: inf
- **Negative self loop**: Cycle

## Applications

- **Graph Algorithms**: Shortest path with negatives
- **Dynamic Programming**: Relaxation
- **Networks**: Routing with negatives
- **Interview Questions**: Medium

## Practice Tips

- Relax all edges n-1 times
- Check for further relaxation
- Handle negative cycles
- Initialize dist properly
