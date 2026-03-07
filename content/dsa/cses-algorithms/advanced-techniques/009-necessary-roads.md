---
title: "Necessary Roads"
cses: "https://cses.fi/problemset/task/2076"
difficulty: "Medium"
tags: ["implementation", "graph", "dfs", "bridges"]
---

## Problem

Find bridges in the graph.

## Example

**Input:** 5 5  

1 2  

1 3  

2 3  

2 4  

3 5  

**Output:** 3  

2 4  

3 5  

1 3  

## Solution Approach

### Method 1: DFS for Bridges
timer = 0

disc = [-1] * (n+1)

low = [-1] * (n+1)

parent = [-1] * (n+1)

bridges = []

def dfs(u):

    global timer

    disc[u] = low[u] = timer

    timer += 1

    for v in graph[u]:

        if disc[v] == -1:

            parent[v] = u

            dfs(v)

            low[u] = min(low[u], low[v])

            if low[v] > disc[u]:

                bridges.append((min(u, v), max(u, v)))

        elif v != parent[u]:

            low[u] = min(low[u], disc[v])

dfs(1)

bridges.sort()

print(len(bridges))

for u, v in bridges:

    print(u, v)

## Time Complexity

O(n + m) - DFS.

## Space Complexity

O(n + m).

## Edge Cases

- **No bridges**: 0

- **Tree**: All edges

- **Cycle**: 0

- **Disconnected**: Bridges in components

## Applications

- **Graphs**: Bridges

- **DFS**: Discovery

- **Connectivity**: Articulation

## Practice Tips

- DFS traversal

- Discovery and low

- Find bridges

- Handle undirected
