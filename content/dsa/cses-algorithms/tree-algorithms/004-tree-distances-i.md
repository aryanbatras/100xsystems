---
title: "Tree Distances I"
cses: "https://cses.fi/problemset/task/1132"
difficulty: "Medium"
tags: ["implementation", "tree", "bfs", "distances"]
---

## Problem

Max distance from each node in tree.

## Example

**Input:** 5  
1 2  
1 3  
3 4  
3 5  
**Output:** 2 3 2 3 3  

**Input:** 3  
1 2  
2 3  
**Output:** 2 1 2  

**Input:** 1  
**Output:** 0

## Solution Approach

### Method 1: Two BFS
1. # Find one end of diameter
2. far1 = bfs(1)[1]
3. # BFS from far1, get distances
4. dist1 = bfs(far1)[0]
5. # Find other end
6. far2 = dist1.index(max(dist1))
7. # BFS from far2, get distances
8. dist2 = bfs(far2)[0]
9. # For each node, max of dist1[i], dist2[i]
10. for i in range(1, n+1):
    - print(max(dist1[i-1], dist2[i-1]), end=' ')

## Time Complexity

O(n) - Two BFS.

## Space Complexity

O(n) - Distances.

## Edge Cases

- **Single node**: 0
- **Two nodes**: 1
- **Center**: Min distance
- **Leaves**: Max distance

## Applications

- **Trees**: Node distances
- **BFS**: Tree traversal
- **Diameter**: Farthest nodes

## Practice Tips

- Two BFS for diameter
- Compute distances
- Max for each node
- Handle indexing
