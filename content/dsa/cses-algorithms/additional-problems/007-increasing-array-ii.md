---
title: "Increasing Array II"
cses: "https://cses.fi/problemset/task/2132"
difficulty: "Hard"
tags: ["implementation", "array", "segment-tree", "range-updates"]
---

## Problem

Make array increasing with min cost, range updates.

## Example

**Input:** 5 3  

1 2 3 4 5  

1 2 3 1  

2 1 3  

1 1 5 2  

2 1 5  

**Output:** 4  

8  

## Solution Approach

### Method 1: Segment Tree for DP

Use segment tree to keep track of min cost to make prefix increasing.

For updates, update the tree.

## Time Complexity

O((n + q) log n) - Operations.

## Space Complexity

O(n).

## Edge Cases

- **Already increasing**: 0

- **Decreasing**: High cost

- **Updates**: Change costs

- **Range queries**: Min cost

## Applications

- **Arrays**: Increasing sequences

- **DP**: Optimization

- **Segment Tree**: Range queries

## Practice Tips

- Segment tree for min

- DP for increasing

- Handle updates

- Compute costs
