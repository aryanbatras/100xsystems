---
title: "Finding a Centroid"
cses: "https://cses.fi/problemset/task/2079"
difficulty: "Easy"
tags: ["implementation", "tree", "centroid", "dfs"]
---

## Problem

Find centroid of tree.

## Example

**Input:** 5  
1 2  
2 3  
3 4  
4 5  
**Output:** 3  

**Input:** 3  
1 2  
2 3  
**Output:** 2  

**Input:** 1  
**Output:** 1

## Solution Approach

### Method 1: DFS for Subtree Sizes
1. def dfs(node, parent):
   - size = 1
   - max_sub = 0
   - for child in graph[node]:
     - if child != parent:
       - child_size = dfs(child, node)
       - size += child_size
       - max_sub = max(max_sub, child_size)
   - # Check if centroid
   - max_sub = max(max_sub, n - size)
   - if max_sub <= n // 2:
     - centroid = node
   - return size
2. dfs(1, -1)
3. print(centroid)

## Time Complexity

O(n) - Single DFS.

## Space Complexity

O(n) - Recursion and graph.

## Edge Cases

- **Single node**: 1
- **Two nodes**: Either
- **Odd n**: Middle
- **Even n**: Either of two

## Applications

- **Trees**: Centroid decomposition
- **DFS**: Subtree sizes
- **Graph Algorithms**: Divide and conquer

## Practice Tips

- DFS for sizes
- Check centroid condition
- Handle parent sizes
- Find minimal max subtree
