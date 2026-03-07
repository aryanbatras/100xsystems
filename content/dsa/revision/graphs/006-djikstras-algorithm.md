---
title: "Djisktra's Algorithm"
difficulty: "Medium"
tags: ["graph", "heap", "shortest-path"]
---

## Problem

Given a weighted graph and a source vertex, find the shortest path from source to all other vertices.

## Example

**Input:** graph = [[(1,4),(2,1)],[(3,1)],[(1,2),(3,5)],[]], src = 0  
**Output:** [0,3,1,6]  

**Input:** graph = [[(1,2)],[(2,3)],[]], src = 0  
**Output:** [0,2,5]  

**Input:** graph = [[],[]], src = 0  
**Output:** [0,inf]

## Solution Approach

### Method 1: Priority Queue
1. import heapq
2. def dijkstra(graph, src):
   - n = len(graph)
   - dist = [float('inf')] * n
   - dist[src] = 0
   - pq = [(0, src)]
   - while pq:
     - d, u = heapq.heappop(pq)
     - if d > dist[u]: continue
     - for v, w in graph[u]:
       - if dist[u] + w < dist[v]:
         - dist[v] = dist[u] + w
         - heapq.heappush(pq, (dist[v], v))
   - return dist

## Time Complexity

O((v + e) log v) - Priority queue.

## Space Complexity

O(v) - Distance array.

## Edge Cases

- **No edges**: [0, inf, ...]
- **Negative weights**: Not allowed
- **Disconnected**: inf for unreachable
- **Single node**: [0]

## Applications

- **Graph Algorithms**: Shortest path
- **Weighted Graphs**: Non-negative
- **Routing**: GPS, networks
- **Interview Questions**: Medium

## Practice Tips

- Use min heap for dist
- Relax edges
- Skip if longer dist
- Handle unreachable
