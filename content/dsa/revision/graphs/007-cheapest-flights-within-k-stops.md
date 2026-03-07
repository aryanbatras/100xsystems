---
title: "Cheapest flights within k stops"
leetcode: "https://leetcode.com/problems/cheapest-flights-within-k-stops/"
difficulty: "Medium"
tags: ["dynamic-programming", "breadth-first-search", "graph", "heap", "shortest-path"]
---

## Problem

There are n cities connected by some number of flights. You are given an array flights where flights[i] = [fromi, toi, pricei] indicates that there is a flight from city fromi to city toi with cost pricei. You are also given three integers src, dst, and k, return the cheapest price from src to dst with at most k stops. If there is no such route, return -1.

## Example

**Input:** n = 4, flights = [[0,1,100],[1,2,100],[2,0,100],[1,3,600],[2,3,200]], src = 0, dst = 3, k = 1  
**Output:** 700 (0->1->3 or 0->2->3)  

**Input:** n = 3, flights = [[0,1,100],[1,2,100],[0,2,500]], src = 0, dst = 2, k = 1  
**Output:** 200  

**Input:** n = 3, flights = [[0,1,100],[1,2,100],[0,2,500]], src = 0, dst = 2, k = 0  
**Output:** 500

## Solution Approach

### Method 1: BFS
1. from collections import deque
2. graph = [[] for _ in range(n)]
3. for u, v, w in flights:
   - graph[u].append((v, w))
4. queue = deque([(src, 0, 0)])  # city, cost, stops
5. min_cost = [float('inf')] * n
6. min_cost[src] = 0
7. while queue:
   - city, cost, stops = queue.popleft()
   - if stops > k: continue
   - for nei, w in graph[city]:
     - new_cost = cost + w
     - if new_cost < min_cost[nei]:
       - min_cost[nei] = new_cost
       - queue.append((nei, new_cost, stops + 1))
8. return min_cost[dst] if min_cost[dst] != float('inf') else -1

## Time Complexity

O(n + e) - BFS.

## Space Complexity

O(n) - Queue and cost.

## Edge Cases

- **k = 0**: Direct flight
- **No path**: -1
- **Multiple paths**: Cheapest
- **k >= n**: Shortest path

## Applications

- **Graph Problems**: Shortest path with constraints
- **BFS**: Level by stops
- **Flights**: Cheapest with stops
- **Interview Questions**: Medium

## Practice Tips

- Build graph
- BFS with cost and stops
- Update min cost
- Check stops <= k
