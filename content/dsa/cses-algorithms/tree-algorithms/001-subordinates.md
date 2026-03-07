---
title: "Subordinates"
cses: "https://cses.fi/problemset/task/1674"
difficulty: "Easy"
tags: ["implementation", "tree", "dfs", "subtree"]
---

## Problem

Count subordinates for each node in tree.

## Example

**Input:** 5  
1 1 2 3  
1 2  
2 3  
2 4  
1 5  
**Output:** 4 2 0 0 0  

**Input:** 3  
1 2 3  
1 2  
1 3  
**Output:** 2 0 0  

**Input:** 1  
**Output:** 0

## Solution Approach

### Method 1: DFS for Subtree Sizes
1. def dfs(node, parent):
   - count = 1
   - for child in graph[node]:
     - if child != parent:
       - count += dfs(child, node)
   - subordinates[node] = count - 1
   - return count
2. dfs(1, -1)
3. print(' '.join(map(str, subordinates[1:])))

## Time Complexity

O(n) - Single DFS.

## Space Complexity

O(n) - Graph and recursion.

## Edge Cases

- **Single node**: 0
- **Linear tree**: Decreasing counts
- **Star tree**: Root has n-1
- **Disconnected**: But tree

## Applications

- **Trees**: Subtree sizes
- **DFS**: Tree traversal
- **Hierarchy**: Employee counts

## Practice Tips

- Build adjacency list
- DFS for subtree
- Count children
- Handle root
