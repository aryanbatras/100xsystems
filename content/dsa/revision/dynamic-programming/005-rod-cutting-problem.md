---
title: "Rod Cutting Problem"
difficulty: "Medium"
tags: ["dynamic-programming", "array"]
---

## Problem

Given a rod of length n and prices for lengths 1 to n, find the maximum value obtainable by cutting up the rod and selling the pieces.

## Example

**Input:** n = 8, prices = [1,5,8,9,10,17,17,20]  
**Output:** 22 (cut into 2 and 6, 5+17)  

**Input:** n = 4, prices = [2,5,7,8]  
**Output:** 10 (2+2+2+2 or 4)  

**Input:** n = 1, prices = [1]  
**Output:** 1

## Solution Approach

### Method 1: DP
1. dp = [0] * (n + 1)
2. for i in range(1, n + 1):
   - for j in range(1, i + 1):
     - dp[i] = max(dp[i], prices[j-1] + dp[i - j])
3. return dp[n]

## Time Complexity

O(n^2) - DP.

## Space Complexity

O(n) - DP array.

## Edge Cases

- **n = 0**: 0
- **n = 1**: prices[0]
- **No cuts**: prices[n-1]
- **All cuts**: sum

## Applications

- **DP Problems**: Unbounded knapsack
- **Optimization**: Max value
- **Arrays**: Price list
- **Interview Questions**: Medium

## Practice Tips

- DP for each length
- Try all cuts
- Max of cut or no cut
- Bottom up
