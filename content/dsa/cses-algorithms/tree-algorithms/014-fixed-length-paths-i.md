---
title: "Fixed-Length Paths I"
cses: "https://cses.fi/problemset/task/2413"
difficulty: "Medium"
tags: ["implementation", "tree", "dynamic-programming", "rerooting", "paths"]
---

## Problem

Count paths of exactly length k.

## Example

**Input:** 5 2  
1 2  
2 3  
3 4  
4 5  
1  
2  
**Output:** 4  
1  

**Input:** 3 1  
1 2  
2 3  
1  
**Output:** 2  

**Input:** 1 1  
0  
**Output:** 1

## Solution Approach

### Method 1: Rerooting DP
1. def dfs1(node, parent, dist):
   - if dist > k:
     - return
   - count[dist] += 1
   - for child in graph[node]:
     - if child != parent:
       - dfs1(child, node, dist + 1)
2. def dfs2(node, parent, dist):
   - # Combine counts from subtrees and parent
   - # Update global count for paths through node
3. # For each node as root, run dfs1 and dfs2
4. # But optimized: two DFS with rerooting
5. # Use arrays for counts at each distance

## Time Complexity

O(n) - Linear.

## Space Complexity

O(n) - DP arrays.

## Edge Cases

- **k=0**: n
- **k=1**: Edges
- **k large**: 0
- **Linear tree**: Min paths

## Applications

- **Trees**: Path lengths
- **DP**: Distance counts
- **Rerooting**: Global counts

## Practice Tips

- DP for subtree paths
- Rerooting technique
- Combine counts
- Handle distances
