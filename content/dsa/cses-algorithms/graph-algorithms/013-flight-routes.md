---
title: "Flight Routes"
cses: "https://cses.fi/problemset/task/1196"
difficulty: "Medium"
tags: ["implementation", "graph", "dijkstra"]
---

## Problem

Find the k shortest paths from 1 to n.

## Example

**Input:** 4 6 2  
1 2 4  
1 3 2  
3 2 3  
1 3 4  
2 4 1  
3 4 1  
**Output:** 2  
5  

**Input:** 2 2 1  
1 2 1  
1 2 5  
**Output:** 1  

**Input:** 2 0 1  
**Output:**  

## Solution Approach

### Method 1: Dijkstra with K
1. import heapq
2. dist = [[] for _ in range(n + 1)]
3. pq = [(0, 1)]  # cost, node
4. while pq:
   - cost, u = heapq.heappop(pq)
   - if len(dist[u]) >= k: continue
   - dist[u].append(cost)
   - for v, w in graph[u]:
     - if len(dist[v]) < k:
       - heapq.heappush(pq, (cost + w, v))
5. for d in dist[n][:k]:
   - print(d)

## Time Complexity

O(k * (n + m) log n) - Dijkstra.

## Space Complexity

O(k * n) - Dist.

## Edge Cases

- **Less than k paths**: Print available
- **No path**: Nothing
- **k=1**: Shortest
- **Multiple same**: Duplicates

## Applications

- **Graph**: K shortest
- **Dijkstra**: Modified
- **Paths**: Multiple

## Practice Tips

- Keep k smallest per node
- Push only if needed
- Heap for priority
- Collect for n
