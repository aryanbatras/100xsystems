---
title: "Tree Distances II"
cses: "https://cses.fi/problemset/task/1133"
difficulty: "Medium"
tags: ["implementation", "tree", "dfs", "rerooting", "distances"]
---

## Problem

Sum of distances from each node in tree.

## Example

**Input:** 5  
1 2  
1 3  
3 4  
3 5  
**Output:** 6 7 4 7 7  

**Input:** 3  
1 2  
2 3  
**Output:** 3 2 3  

**Input:** 1  
**Output:** 0

## Solution Approach

### Method 1: Rerooting Technique
1. # First DFS: compute subtree sizes and sum for root 1
2. def dfs1(node, parent, depth):
   - size[node] = 1
   - for child in graph[node]:
     - if child != parent:
       - dfs1(child, node, depth + 1)
       - size[node] += size[child]
       - sum_dist[1] += depth + 1
3. # Second DFS: reroot
4. def dfs2(node, parent, parent_sum):
   - sum_dist[node] = parent_sum
   - for child in graph[node]:
     - if child != parent:
       - # When moving to child, adjust sum
       - new_sum = parent_sum - size[child] + (n - size[child])
       - dfs2(child, node, new_sum)
5. dfs1(1, -1, 0)
6. dfs2(1, -1, sum_dist[1])
7. for i in range(1, n+1):
   - print(sum_dist[i], end=' ')

## Time Complexity

O(n) - Two DFS.

## Space Complexity

O(n) - Graph and arrays.

## Edge Cases

- **Single node**: 0
- **Two nodes**: 1 each
- **Star tree**: Root sum high
- **Linear tree**: Ends low

## Applications

- **Trees**: Distance sums
- **DFS**: Tree traversal
- **Rerooting**: Dynamic programming

## Practice Tips

- Two DFS for rerooting
- Compute subtree sizes
- Adjust sums when moving
- Handle root case
