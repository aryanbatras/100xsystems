---
title: "Tree Diameter"
cses: "https://cses.fi/problemset/task/1131"
difficulty: "Easy"
tags: ["implementation", "tree", "dfs", "diameter"]
---

## Problem

Find longest path in tree.

## Example

**Input:** 5  
1 2  
1 3  
3 4  
3 5  
**Output:** 3  

**Input:** 3  
1 2  
2 3  
**Output:** 2  

**Input:** 1  
**Output:** 0

## Solution Approach

### Method 1: BFS Twice
1. def bfs(start):
   - dist = [-1] * (n+1)
   - dist[start] = 0
   - queue = deque([start])
   - farthest = start
   - while queue:
     - u = queue.popleft()
     - for v in graph[u]:
       - if dist[v] == -1:
         - dist[v] = dist[u] + 1
         - if dist[v] > dist[farthest]:
           - farthest = v
         - queue.append(v)
   - return farthest, dist
2. # First BFS from any node
3. far1, _ = bfs(1)
4. # Second BFS from farthest
5. far2, dist = bfs(far1)
6. print(max(dist))

## Time Complexity

O(n) - Two BFS.

## Space Complexity

O(n) - Graph and queue.

## Edge Cases

- **Single node**: 0
- **Two nodes**: 1
- **Linear tree**: n-1
- **Balanced tree**: Smaller

## Applications

- **Trees**: Diameter
- **Graphs**: Longest path
- **BFS**: Farthest nodes

## Practice Tips

- BFS for distances
- Find farthest twice
- Max distance
- Handle tree
