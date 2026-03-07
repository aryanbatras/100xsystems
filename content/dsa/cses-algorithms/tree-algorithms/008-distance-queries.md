---
title: "Distance Queries"
cses: "https://cses.fi/problemset/task/1135"
difficulty: "Medium"
tags: ["implementation", "tree", "binary-lifting", "lca", "distances"]
---

## Problem

Distance between nodes in tree.

## Example

**Input:** 5 3  
1 2  
1 3  
3 4  
3 5  
2 4  
3 5  
1 5  
**Output:** 3  
2  
2  

**Input:** 3 2  
1 2  
2 3  
1 3  
2 3  
**Output:** 2  
1  

**Input:** 1 1  
1 1  
**Output:** 0

## Solution Approach

### Method 1: LCA with Binary Lifting
1. # Preprocess LCA as above
2. def get_distance(a, b):
   - lca = get_lca(a, b)
   - return depth[a] + depth[b] - 2 * depth[lca]
3. for u, v in queries:
   - print(get_distance(u, v))

## Time Complexity

O(n log n + q log n) - Preprocess and queries.

## Space Complexity

O(n log n) - Binary lifting.

## Edge Cases

- **Same node**: 0
- **Parent-child**: 1
- **Siblings**: 2
- **Root-path**: Depth difference

## Applications

- **Trees**: Node distances
- **LCA**: Distance calculation
- **Graph Problems**: Tree queries

## Practice Tips

- Binary lifting for LCA
- Depth calculations
- Distance formula
- Handle queries
