---
title: "Unbounded Knapsack"
difficulty: "Medium"
tags: ["dynamic-programming", "array"]
---

## Problem

Given weights and values of n items, put these items in a knapsack of capacity W to get the maximum total value in the knapsack. You can use the same item multiple times.

## Example

**Input:** weights = [1,2,3], values = [10,15,40], W = 6  
**Output:** 80 (2*40)  

**Input:** weights = [1,2,3], values = [60,100,120], W = 5  
**Output:** 300 (5*60)  

**Input:** weights = [1,2,4], values = [1,2,4], W = 5  
**Output:** 5 (5*1)

## Solution Approach

### Method 1: DP
1. dp = [0] * (W + 1)
2. for i in 0 to n-1:
   - for j in weights[i] to W:
     - dp[j] = max(dp[j], dp[j - weights[i]] + values[i])
3. return dp[W]

## Time Complexity

O(n * W) - DP.

## Space Complexity

O(W) - DP array.

## Edge Cases

- **n = 0**: 0
- **W = 0**: 0
- **All weights > W**: 0
- **Single item**: min multiples

## Applications

- **Optimization**: Unlimited items
- **Dynamic Programming**: Knapsack variants
- **Resource Allocation**: Repeated choices
- **Interview Questions**: Common

## Practice Tips

- Update DP for each item
- Iterate j from weight to W
- Compare with 0-1 knapsack
- Test with small inputs
