---
title: "Kruskal's Algorithm"
difficulty: "Medium"
tags: ["graph", "union-find", "minimum-spanning-tree"]
---

## Problem

Given an undirected weighted graph, find the minimum spanning tree using Kruskal's algorithm.

## Example

**Input:** graph = [[(1,4),(2,1)],[(0,4),(3,1)],[(0,1),(1,2),(3,5)],[(1,1),(2,5)]], n = 4  
**Output:** [(0,2,1),(1,3,1),(1,2,2)]  

**Input:** graph = [[(1,2)],[(0,2),(2,3)],[(1,3)]], n = 3  
**Output:** [(0,1,2),(1,2,3)]  

**Input:** graph = [[],[]], n = 2  
**Output:** []

## Solution Approach

### Method 1: Union Find
1. def kruskal(graph, n):
   - edges = []
   - for u in range(n):
     - for v, w in graph[u]:
       - if u < v:
         - edges.append((w, u, v))
   - edges.sort()
   - parent = list(range(n))
   - def find(x):
     - if parent[x] != x:
       - parent[x] = find(parent[x])
     - return parent[x]
   - def union(x, y):
     - px, py = find(x), find(y)
     - if px != py:
       - parent[px] = py
       - return True
     - return False
   - mst = []
   - for w, u, v in edges:
     - if union(u, v):
       - mst.append((u, v, w))
       - if len(mst) == n - 1:
         - break
   - return mst

## Time Complexity

O(e log e) - Sort edges.

## Space Complexity

O(e) - Edges list.

## Edge Cases

- **Disconnected**: Partial MST
- **No edges**: []
- **Single node**: []
- **Cycle**: Avoid

## Applications

- **Graph Algorithms**: MST
- **Union Find**: Cycle detection
- **Networks**: Minimum cost
- **Interview Questions**: Medium

## Practice Tips

- Collect all edges
- Sort by weight
- Union find for components
- Add if no cycle
