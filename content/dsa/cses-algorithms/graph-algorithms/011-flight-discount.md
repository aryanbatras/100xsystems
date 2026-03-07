---
title: "Flight Discount"
cses: "https://cses.fi/problemset/task/1195"
difficulty: "Medium"
tags: ["implementation", "graph", "dijkstra"]
---

## Problem

Find cheapest path from 1 to n with at most one discount (half price).

## Example

**Input:** 3 4  
1 2 3  
1 3 2  
3 2 3  
1 3 4  
**Output:** 3  

**Input:** 2 1  
1 2 5  
**Output:** 3  

**Input:** 2 1  
1 2 1  
**Output:** 1

## Solution Approach

### Method 1: Dijkstra with State
1. import heapq
2. dist = [[float('inf')] * 2 for _ in range(n + 1)]
3. dist[1][0] = 0
4. dist[1][1] = 0
5. pq = [(0, 1, 0)]  # cost, node, used
6. while pq:
   - cost, u, used = heapq.heappop(pq)
   - if cost > dist[u][used]: continue
   - for v, w in graph[u]:
     - # Not used discount
     - if dist[v][used] > cost + w:
       - dist[v][used] = cost + w
       - heapq.heappush(pq, (dist[v][used], v, used))
     - # Use discount if not used
     - if used == 0 and dist[v][1] > cost + w // 2:
       - dist[v][1] = cost + w // 2
       - heapq.heappush(pq, (dist[v][1], v, 1))
7. print(min(dist[n]))

## Time Complexity

O((n + m) log n) - Dijkstra.

## Space Complexity

O(n) - Dist and heap.

## Edge Cases

- **No discount better**: Normal
- **Discount helps**: Lower
- **No path**: INF
- **Self**: 0

## Applications

- **Graph**: Shortest with option
- **Dijkstra**: State
- **Discount**: Half

## Practice Tips

- State for discount used
- Relax with and without
- Min of both for n
- Handle half
