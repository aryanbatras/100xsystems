---
title: "Path Queries"
cses: "https://cses.fi/problemset/task/1138"
difficulty: "Hard"
tags: ["implementation", "tree", "heavy-light-decomposition", "segment-tree", "path-queries"]
---

## Problem

Path sum queries and point updates on tree.

## Example

**Input:** 5 3  
4 2 5 2 1  
1 2  
1 3  
3 4  
3 5  
2 4 5  
1 5 3  
2 2 4  
**Output:** 12  
5  
9  

**Input:** 3 2  
1 1 1  
1 2  
1 3  
2 1 3  
1 2 2  
2 1 2  
**Output:** 2  
3  

**Input:** 1 1  
10  
2 1 1  
**Output:** 10

## Solution Approach

### Method 1: Heavy-Light Decomposition + Segment Tree
1. Perform heavy-light decomposition to assign chains
2. Each chain gets a segment tree for path sums
3. For path queries:
   - Lift u and v to same chain using head jumps
   - Query segment trees for chain parts
   - Combine results
4. For updates:
   - Update in the chain's segment tree

## Time Complexity

O((n + q) log² n) - HLD and queries.

## Space Complexity

O(n) - Segment trees and arrays.

## Edge Cases

- **Same node**: 0
- **Parent-child**: Direct edge
- **Root path**: From root
- **Updates**: Change values

## Applications

- **Trees**: Path operations
- **HLD**: Chain decomposition
- **Segment Tree**: Range queries

## Practice Tips

- Heavy-light decomposition
- Chain assignment
- Segment tree per chain
- Path query implementation
