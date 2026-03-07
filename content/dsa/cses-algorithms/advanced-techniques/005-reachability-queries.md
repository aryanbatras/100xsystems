---
title: "Reachability Queries"
cses: "https://cses.fi/problemset/task/2143"
difficulty: "Medium"
tags: ["implementation", "graph", "dfs", "transitive-closure", "reachability"]
---

## Problem

Answer reachability queries.

## Example

**Input:** 5 5 3  

1 2  

1 3  

2 3  

2 4  

3 5  

2 4  

3 5  

1 5  

**Output:** YES  

YES  

NO  

## Solution Approach

### Method 1: Transitive Closure
reach = [[False] * (n+1) for _ in range(n+1)]

for i in range(1, n+1):

    reach[i][i] = True

for u, v in edges:

    reach[u][v] = True

for k in range(1, n+1):

    for i in range(1, n+1):

        for j in range(1, n+1):

            if reach[i][k] and reach[k][j]:

                reach[i][j] = True

for u, v in queries:

    print("YES" if reach[u][v] else "NO")

## Time Complexity

O(n^3) - Floyd Warshall.

## Space Complexity

O(n^2).

## Edge Cases

- **Same node**: YES

- **Direct edge**: YES

- **No path**: NO

- **Cycles**: YES

## Applications

- **Graphs**: Reachability

- **Transitive Closure**: Floyd Warshall

- **Queries**: Fast answers

## Practice Tips

- Adjacency matrix

- Floyd Warshall

- Answer queries

- Handle large n
