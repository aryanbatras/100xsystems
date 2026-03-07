---
title: "Total Number of Ways to Reach Last Cell"
difficulty: "Medium"
tags: ["dynamic-programming", "grid", "array"]
---

## Problem

Given a m x n grid, find the number of ways to reach the bottom-right cell from the top-left cell, moving only right or down.

## Example

**Input:** m = 2, n = 3  
**Output:** 3 (RRDD, RDRD, DRRD)  

**Input:** m = 1, n = 1  
**Output:** 1  

**Input:** m = 3, n = 1  
**Output:** 1

## Solution Approach

### Method 1: DP
1. dp = [[0 for _ in range(n)] for _ in range(m)]
2. for i in range(m):
   - for j in range(n):
     - if i == 0 and j == 0:
       - dp[0][0] = 1
     - else:
       - up = dp[i-1][j] if i > 0 else 0
       - left = dp[i][j-1] if j > 0 else 0
       - dp[i][j] = up + left
3. return dp[m-1][n-1]

## Time Complexity

O(m * n) - DP.

## Space Complexity

O(m * n) - DP table.

## Edge Cases

- **1x1**: 1
- **1xn**: 1
- **nx1**: 1
- **Large m,n**: Combinatorial

## Applications

- **Grid Paths**: Movement problems
- **Combinatorics**: Binomial coefficients
- **Dynamic Programming**: Grid DP
- **Interview Questions**: Classic

## Practice Tips

- Fill DP table
- Handle boundaries
- Optimize space if needed
- Test with small grids
