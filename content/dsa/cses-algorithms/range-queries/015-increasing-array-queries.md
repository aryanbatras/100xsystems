---
title: "Increasing Array Queries"
cses: "https://cses.fi/problemset/task/2416"
difficulty: "Hard"
tags: ["implementation", "segment-tree", "range-minimum", "dynamic-programming"]
---

## Problem

Make array increasing with min operations.

## Example

**Input:** 5 3  
1 2 3 4 5  
1 2  
2 4  
1 5  
**Output:** 0  
0  
0  

**Input:** 4 2  
1 3 2 4  
1 3  
2 4  
**Output:** 1  
1  

**Input:** 1 1  
5  
1 1  
**Output:** 0

## Solution Approach

### Method 1: Segment Tree for DP
1. dp[i] = min cost to make first i increasing
2. Use segment tree for range min queries
3. For each position, update dp[i] = min over j < i where a[j] <= a[i] of dp[j] + (i-j-1)

## Time Complexity

O(n log n + q log n) - DP + queries.

## Space Complexity

O(n) - DP and segment tree.

## Edge Cases

- **Already increasing**: 0
- **Single element**: 0
- **Reverse sorted**: High cost
- **Duplicates**: Allowed

## Applications

- **Arrays**: Increasing sequences
- **DP**: Optimization
- **Segment Tree**: Range queries

## Practice Tips

- DP for increasing
- Segment tree for min
- Handle range queries
- Compute costs
