---
title: "Message Route"
cses: "https://cses.fi/problemset/task/1667"
difficulty: "Easy"
tags: ["implementation", "graph", "bfs"]
---

## Problem

Find shortest path from 1 to n, print length and path.

## Example

**Input:** 5 5  
1 2  
1 3  
1 5  
2 3  
5 4  
**Output:** 3  
1 5 4  

**Input:** 2 1  
1 2  
**Output:** 2  
1 2  

**Input:** 3 1  
1 2  
**Output:** IMPOSSIBLE

## Solution Approach

### Method 1: BFS
1. from collections import deque
2. queue = deque([1])
3. visited = [False] * (n + 1)
4. visited[1] = True
5. parent = [0] * (n + 1)
6. found = False
7. while queue:
   - u = queue.popleft()
   - if u == n:
     - found = True
     - break
   - for v in graph[u]:
     - if not visited[v]:
       - visited[v] = True
       - parent[v] = u
       - queue.append(v)
8. if not found:
   - print("IMPOSSIBLE")
9. else:
   - path = []
   - current = n
   - while current != 0:
     - path.append(current)
     - current = parent[current]
   - path.reverse()
   - print(len(path))
   - print(' '.join(map(str, path)))

## Time Complexity

O(n + m) - BFS.

## Space Complexity

O(n + m) - Graph and queue.

## Edge Cases

- **1 to n direct**: 2
- **No path**: IMPOSSIBLE
- **Self**: 1
- **Disconnected**: IMPOSSIBLE

## Applications

- **Graph**: Shortest path
- **BFS**: Unweighted
- **Path reconstruction**: Parent

## Practice Tips

- BFS from 1
- Track parent
- Reconstruct path
- Handle not found
