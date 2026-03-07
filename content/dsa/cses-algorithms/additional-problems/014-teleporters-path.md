---
title: "Teleporters Path"
cses: "https://cses.fi/problemset/task/1693"
difficulty: "Hard"
tags: ["implementation", "graph", "eulerian-path", "teleporters"]
---

## Problem

Find path using all teleporters.

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

### Method 1: Eulerian Path on Graph
# Model teleporters as undirected edges
# Find Eulerian path

from collections import defaultdict

graph = defaultdict(list)

for u, v in teleporters:
    graph[u].append(v)
    graph[v].append(u)

# Check degrees
odd = []
for u in graph:
    if len(graph[u]) % 2 == 1:
        odd.append(u)

if len(odd) not in [0, 2]:
    print("IMPOSSIBLE")
else:
    start = odd[0] if odd else 1
    path = find_eulerian_path(graph, start)
    if len(path) == len(teleporters) + 1:
        print(' '.join(map(str, path)))
    else:
        print("IMPOSSIBLE")

## Time Complexity

O(n + m) - DFS.

## Space Complexity

O(n + m).

## Edge Cases

- **Eulerian path**: Path
- **Not possible**: IMPOSSIBLE
- **Single teleporter**: Path
- **Cycles**: Multiple paths

## Applications

- **Graphs**: Path finding
- **Teleporters**: Game paths
- **Eulerian**: Edge traversal

## Practice Tips

- Model as graph
- Find Eulerian path
- Hierholzer's algorithm
- Check connectivity
