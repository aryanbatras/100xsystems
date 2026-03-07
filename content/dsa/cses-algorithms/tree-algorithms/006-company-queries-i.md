---
title: "Company Queries I"
cses: "https://cses.fi/problemset/task/1687"
difficulty: "Medium"
tags: ["implementation", "tree", "binary-lifting", "ancestors"]
---

## Problem

Find k-th ancestor of node.

## Example

**Input:** 5 3  
1 1 2 3  
1 2  
2 3  
2 4  
1 5  
4  
2 1  
3 2  
4 1  
**Output:** 1  
2  
3  

**Input:** 3 2  
1 2 3  
1 2  
1 3  
2  
2 2  
3 2  
**Output:** 1  
1  

**Input:** 1 1  
1  
1  
1 1  
**Output:** 1

## Solution Approach

### Method 1: Binary Lifting
1. LOG = 20  # log(1e5)
2. up = [[-1] * LOG for _ in range(n+1)]
3. depth = [0] * (n+1)
4. def dfs(node, parent, d):
   - depth[node] = d
   - up[node][0] = parent
   - for i in range(1, LOG):
     - if up[node][i-1] != -1:
       - up[node][i-1][i] = up[ up[node][i-1] ][i-1]
   - for child in graph[node]:
     - if child != parent:
       - dfs(child, node, d+1)
5. dfs(1, -1, 0)
6. def get_kth_ancestor(node, k):
   - for i in range(LOG):
     - if k & (1 << i):
       - if node == -1:
         - return -1
       - node = up[node][i]
   - return node
7. for query in queries:
   - x, k = query
   - ans = get_kth_ancestor(x, k)
   - print(ans if ans != -1 else -1)

## Time Complexity

O(n log n + q log n) - Preprocess and queries.

## Space Complexity

O(n log n) - Binary lifting table.

## Edge Cases

- **k=0**: Node itself
- **k > depth**: -1
- **Root**: Ancestor -1
- **Deep tree**: Log jumps

## Applications

- **Trees**: Ancestor queries
- **Binary Lifting**: Efficient jumps
- **LCA**: Basis for LCA

## Practice Tips

- Binary lifting setup
- DFS for preprocessing
- Jump by powers of 2
- Handle invalid cases
