---
title: "Path Queries II"
cses: "https://cses.fi/problemset/task/2134"
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

## Solution Approach

### Method 1: Heavy-Light Decomposition + Segment Tree

Implement HLD for path queries and point updates.

## Time Complexity

O((n + q) log² n) - HLD and queries.

## Space Complexity

O(n).

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
