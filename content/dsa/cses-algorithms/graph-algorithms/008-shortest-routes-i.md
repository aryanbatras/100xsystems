---
title: "Shortest Routes I"
cses: "https://cses.fi/problemset/task/1671"
difficulty: "Easy"
tags: ["implementation", "graph", "dijkstra"]
---

## Problem

Find shortest paths from 1 to all nodes.

## Example

**Input:** 3 4  
1 2 6  
1 3 2  
3 2 3  
1 3 4  
**Output:** 0 5 2  

**Input:** 2 1  
1 2 1  
**Output:** 0 1  

**Input:** 2 0  
**Output:** 0 INF

## Solution Approach

### Method 1: Dijkstra
1. import heapq
2. dist = [float('inf')] * (n + 1)
3. dist[1] = 0
4. pq = [(0, 1)]
5. while pq:
   - d, u = heapq.heappop(pq)
   - if d > dist[u]: continue
   - for v, w in graph[u]:
     - if dist[u] + w < dist[v]:
       - dist[v] = dist[u] + w
       - heapq.heappush(pq, (dist[v], v))
6. for i in range(1, n+1):
   - if dist[i] == float('inf'):
     - print("INF", end=' ')
   - else:
     - print(dist[i], end=' ')

## Time Complexity

O((n + m) log n) - Dijkstra.

## Space Complexity

O(n + m) - Graph and heap.

## Edge Cases

- **Disconnected**: INF
- **Negative weights**: Not allowed
- **Self**: 0
- **Direct**: Weight

## Applications

- **Graph**: Shortest path
- **Dijkstra**: Priority queue
- **Weighted**: Non-negative

## Practice Tips

- Use min heap
- Relax edges
- Handle INF
- Start from 1
