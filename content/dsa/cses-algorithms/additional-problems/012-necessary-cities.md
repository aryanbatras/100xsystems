---
title: "Necessary Cities"
cses: "https://cses.fi/problemset/task/2077"
difficulty: "Medium"
tags: ["implementation", "graph", "dfs", "articulation-points"]
---

## Problem

Find articulation points in graph.

## Example

**Input:** 5 5  
1 2  
1 3  
2 3  
2 4  
3 5  
**Output:** 2  
2 3  

## Solution Approach

### Method 1: DFS for Articulation Points
timer = 0
disc = [-1] * (n+1)
low = [-1] * (n+1)
parent = [-1] * (n+1)
ap = set()

def dfs(u):
    global timer
    children = 0
    disc[u] = low[u] = timer
    timer += 1
    for v in graph[u]:
        if disc[v] == -1:
            parent[v] = u
            children += 1
            dfs(v)
            low[u] = min(low[u], low[v])
            if parent[u] == -1 and children > 1:
                ap.add(u)
            if parent[u] != -1 and low[v] >= disc[u]:
                ap.add(u)
        elif v != parent[u]:
            low[u] = min(low[u], disc[v])

dfs(1)
ap = sorted(list(ap))
print(len(ap))
for city in ap:
    print(city)

## Time Complexity

O(n + m) - DFS.

## Space Complexity

O(n + m).

## Edge Cases

- **No articulation**: 0
- **All bridges**: All nodes
- **Root with multiple children**: Root
- **Leaf**: No

## Applications

- **Graphs**: Connectivity
- **DFS**: Discovery
- **Networks**: Critical nodes

## Practice Tips

- DFS traversal
- Discovery and low
- Check conditions
- Handle root
