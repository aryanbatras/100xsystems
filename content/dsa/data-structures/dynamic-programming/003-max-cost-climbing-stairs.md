---
title: "Max Cost Climbing Stairs"
difficulty: "Easy"
tags: ["dynamic-programming", "array"]
---

## Problem

Given an array cost where cost[i] is the cost of ith step, find the maximum cost to reach the top.

## Example

**Input:** cost = [10,15,20]  
**Output:** 35 (10 + 15 + 20)  

**Input:** cost = [1,100,1,1,1,100,1,1,100,1]  
**Output:** 505  

**Input:** cost = [0,0,0,0]  
**Output:** 0

## Solution Approach

### Method 1: DP
1. n = len(cost)
2. dp = [0] * (n + 1)
3. dp[0] = 0, dp[1] = 0
4. for i in 2 to n:
   - dp[i] = cost[i-1] + max(dp[i-1], dp[i-2])
5. return dp[n]

## Time Complexity

O(n) - Linear.

## Space Complexity

O(1) - Constant space.

## Edge Cases

- **n = 1**: 0
- **n = 2**: max(cost[0], cost[1])
- **All zeros**: 0
- **Increasing costs**: Sum all

## Applications

- **Optimization**: Max cost path
- **Dynamic Programming**: Staircase problems
- **Decision Making**: Choose steps
- **Interview Questions**: Variant

## Practice Tips

- Define dp[i] as max cost to reach step i
- Consider starting positions
- Optimize space
- Test with examples
