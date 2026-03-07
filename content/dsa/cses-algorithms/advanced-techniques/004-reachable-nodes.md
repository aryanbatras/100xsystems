---
title: "Reachable Nodes"
cses: "https://cses.fi/problemset/task/2138"
difficulty: "Easy"
tags: ["implementation", "graph", "dfs", "bfs", "reachability"]
---

## Problem

Count nodes reachable from each node.

## Example

**Input:** 5 5  

1 2  

1 3  

2 3  

2 4  

3 5  

**Output:** 5 4 3 1 1  

## Solution Approach

### Method 1: DFS from Each Node
visited = [False] * (n+1)

def dfs(node):

    visited[node] = True

    count = 1

    for nei in graph[node]:

        if not visited[nei]:

            count += dfs(nei)

    return count

for i in range(1, n+1):

    visited = [False] * (n+1)

    print(dfs(i), end=' ')

## Time Complexity

O(n * (n + m)) - Each DFS.

## Space Complexity

O(n + m).

## Edge Cases

- **Disconnected**: Components

- **Single node**: 1

- **All connected**: n

- **Cycles**: No issue

## Applications

- **Graphs**: Reachability

- **DFS/BFS**: Traversal

- **Connectivity**: Components

## Practice Tips

- Adjacency list

- DFS/BFS

- Count visited

- Handle large n
