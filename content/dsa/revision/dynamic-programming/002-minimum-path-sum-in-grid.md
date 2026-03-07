---
title: "Minimum path sum in Grid"
leetcode: "https://leetcode.com/problems/minimum-path-sum/"
difficulty: "Medium"
tags: ["array", "dynamic-programming", "matrix"]
---

## Problem

Given a m x n grid filled with non-negative numbers, find a path from top left to bottom right, which minimizes the sum of all numbers along its path. You can only move either down or right at any point in time.

## Example

**Input:** grid = [[1,3,1],[1,5,1],[4,2,1]]  
**Output:** 7 (1->3->1->1->1)  

**Input:** grid = [[1,2,3],[4,5,6]]  
**Output:** 12 (1->2->3->6)  

**Input:** grid = [[1]]  
**Output:** 1

## Solution Approach

### Method 1: DP
1. m, n = len(grid), len(grid[0])
2. dp = [[0] * n for _ in range(m)]
3. dp[0][0] = grid[0][0]
4. for i in range(1, m):
   - dp[i][0] = dp[i-1][0] + grid[i][0]
5. for j in range(1, n):
   - dp[0][j] = dp[0][j-1] + grid[0][j]
6. for i in range(1, m):
   - for j in range(1, n):
     - dp[i][j] = min(dp[i-1][j], dp[i][j-1]) + grid[i][j]
7. return dp[-1][-1]

## Time Complexity

O(m*n) - Grid traversal.

## Space Complexity

O(m*n) - DP table.

## Edge Cases

- **1x1**: Grid[0][0]
- **1 row**: Sum row
- **1 col**: Sum col
- **Large grid**: Ok

## Applications

- **Grid Problems**: Path sum
- **Dynamic Programming**: Min path
- **Matrices**: Bottom up
- **Interview Questions**: Medium

## Practice Tips

- Initialize first row/col
- Fill dp table
- Min from up or left
- Return bottom right
