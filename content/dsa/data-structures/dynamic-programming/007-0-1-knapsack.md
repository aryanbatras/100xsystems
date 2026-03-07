---
title: "0-1 Knapsack"
difficulty: "Medium"
tags: ["dynamic-programming", "array"]
---

## Problem

Given weights and values of n items, put these items in a knapsack of capacity W to get the maximum total value in the knapsack. You cannot use the same item more than once.

## Example

**Input:** weights = [1,2,3], values = [10,15,40], W = 6  
**Output:** 65 (items 2 and 3: 2+3=5 <=6, 15+40=55? Wait, 40+15=55, but 1+2+3=6, 10+15+40=65)  

**Input:** weights = [1,2,3], values = [60,100,120], W = 5  
**Output:** 220 (2+3, 100+120)  

**Input:** weights = [1,2,4], values = [1,2,4], W = 5  
**Output:** 6 (1+4, 1+2+4=7>5, so 1+4=5, 1+4=5)

## Solution Approach

### Method 1: Recursive
1. def knapsack(w, val, W, n):
   - if n == 0 or W == 0: return 0
   - if w[n-1] > W: return knapsack(w, val, W, n-1)
   - return max(val[n-1] + knapsack(w, val, W - w[n-1], n-1), knapsack(w, val, W, n-1))

### Method 2: DP
1. dp = [[0 for _ in range(W+1)] for _ in range(n+1)]
2. for i in 1 to n:
   - for j in 0 to W:
     - if w[i-1] <= j:
       - dp[i][j] = max(dp[i-1][j], val[i-1] + dp[i-1][j - w[i-1]])
     - else:
       - dp[i][j] = dp[i-1][j]
3. return dp[n][W]

## Time Complexity

O(n * W) - DP.

## Space Complexity

O(n * W) - DP table.

## Edge Cases

- **n = 0**: 0
- **W = 0**: 0
- **All weights > W**: 0
- **Single item**: if w <= W, val

## Applications

- **Optimization**: Knapsack problems
- **Resource Allocation**: Maximize value
- **Dynamic Programming**: Classic DP
- **Interview Questions**: Common

## Practice Tips

- Fill DP table
- Consider include/exclude
- Optimize space to O(W)
- Test with small inputs
