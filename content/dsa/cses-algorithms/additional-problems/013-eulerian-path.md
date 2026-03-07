---
title: "Eulerian Path"
cses: "https://cses.fi/problemset/task/1693"
difficulty: "Medium"
tags: ["implementation", "graph", "eulerian-path", "dfs"]
---

## Problem

Find Eulerian path in graph.

## Example

**Input:** 5 6  
1 2  
1 3  
2 3  
2 4  
3 4  
4 5  
**Output:** 1 2 4 3 2 3 4 5  

## Solution Approach

### Method 1: Hierholzer's Algorithm
from collections import defaultdict

graph = defaultdict(list)

for u, v in edges:
    graph[u].append(v)
    graph[v].append(u)

def find_eulerian_path(start):
    path = []
    stack = [start]
    while stack:
        u = stack[-1]
        if graph[u]:
            v = graph[u].pop()
            stack.append(v)
        else:
            path.append(stack.pop())
    path.reverse()
    return path

# Check degrees
odd = []
for u in range(1, n+1):
    if len(graph[u]) % 2 == 1:
        odd.append(u)

if len(odd) not in [0, 2]:
    print("IMPOSSIBLE")
else:
    start = odd[0] if odd else 1
    path = find_eulerian_path(start)
    if len(path) == m + 1:
        print(' '.join(map(str, path)))
    else:
        print("IMPOSSIBLE")

## Time Complexity

O(n + m) - DFS.

## Space Complexity

O(n + m).

## Edge Cases

- **Eulerian circuit**: Any start
- **Path**: Two odd degrees
- **Not connected**: IMPOSSIBLE
- **No edges**: Single node

## Applications

- **Graphs**: Eulerian paths
- **DFS**: Hierholzer's
- **Circuits**: Route finding

## Practice Tips

- Check degrees
- Hierholzer's algorithm
- DFS for path
- Handle impossible
