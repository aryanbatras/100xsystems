---
title: "Rectangle Cutting"
cses: "https://cses.fi/problemset/task/1744"
difficulty: "Medium"
tags: ["implementation", "dynamic-programming"]
---

## Problem

Min cuts to divide h x w rectangle into squares.

## Example

**Input:** 2 3  
**Output:** 2  

**Input:** 1 1  
**Output:** 0  

**Input:** 2 2  
**Output:** 1

## Solution Approach

### Method 1: DP
1. dp = [[0] * (w + 1) for _ in range(h + 1)]
2. for i in range(1, h + 1):
   - for j in range(1, w + 1):
     - if i == j:
       - dp[i][j] = 0
     - else:
       - dp[i][j] = float('inf')
       - for k in range(1, i):
         - dp[i][j] = min(dp[i][j], dp[k][j] + dp[i-k][j] + 1)
       - for k in range(1, j):
         - dp[i][j] = min(dp[i][j], dp[i][k] + dp[i][j-k] + 1)
3. print(dp[h][w])

## Time Complexity

O(h * w * max(h, w)) - DP.

## Space Complexity

O(h * w) - DP table.

## Edge Cases

- **Square**: 0
- **1x1**: 0
- **1xn**: n-1
- **Large h,w**: DP

## Applications

- **DP**: Cutting
- **Rectangles**: Squares
- **Min cuts**: Optimization

## Practice Tips

- DP for dimensions
- Cuts horizontal/vertical
- Min over possibilities
- Base square 0
