---
title: "Company Queries II"
cses: "https://cses.fi/problemset/task/1688"
difficulty: "Medium"
tags: ["implementation", "tree", "binary-lifting", "lca"]
---

## Problem

Find LCA of two nodes.

## Example

**Input:** 5 3  
1 1 2 3  
1 2  
2 3  
2 4  
1 5  
4 5  
3 4  
2 3  
**Output:** 1  
2  
2  

**Input:** 3 2  
1 2 3  
1 2  
1 3  
2 3  
1 3  
**Output:** 1  
1  

**Input:** 1 1  
1  
1 1  
**Output:** 1

## Solution Approach

### Method 1: Binary Lifting for LCA
1. LOG = 20
2. up = [[-1] * LOG for _ in range(n+1)]
3. depth = [0] * (n+1)
4. def dfs(node, parent, d):
   - depth[node] = d
   - up[node][0] = parent
   - for i in range(1, LOG):
     - if up[node][i-1] != -1:
       - up[node][i] = up[ up[node][i-1] ][i-1]
   - for child in graph[node]:
     - if child != parent:
       - dfs(child, node, d+1)
5. dfs(1, -1, 0)
6. def get_lca(a, b):
   - if depth[a] > depth[b]:
     - a, b = b, a
   - # Lift b to same depth as a
   - diff = depth[b] - depth[a]
   - for i in range(LOG):
     - if diff & (1 << i):
       - b = up[b][i]
   - if a == b:
     - return a
   - # Lift both until parents match
   - for i in range(LOG-1, -1, -1):
     - if up[a][i] != up[b][i]:
       - a = up[a][i]
       - b = up[b][i]
   - return up[a][0]
7. for u, v in queries:
   - print(get_lca(u, v))

## Time Complexity

O(n log n + q log n) - Preprocess and queries.

## Space Complexity

O(n log n) - Binary lifting table.

## Edge Cases

- **Same node**: Node itself
- **Parent-child**: Parent
- **Root involved**: Root
- **Deep tree**: Log jumps

## Applications

- **Trees**: LCA queries
- **Binary Lifting**: Efficient ancestors
- **Graph Algorithms**: Tree-based problems

## Practice Tips

- Binary lifting setup
- DFS for preprocessing
- Lift to same depth
- Find LCA
