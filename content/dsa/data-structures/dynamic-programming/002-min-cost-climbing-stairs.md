---
title: "Min Cost Climbing Stairs"
leetcode: "https://leetcode.com/problems/min-cost-climbing-stairs/"
difficulty: "Easy"
tags: ["dynamic-programming", "array"]
---

## Problem

You are given an integer array cost where cost[i] is the cost of ith step on a staircase. Once you pay the cost, you can either climb one or two steps. You can either start from the step with index 0, or the step with index 1. Return the minimum cost to reach the top of the floor.

## Example

**Input:** cost = [10,15,20]  
**Output:** 15 (start at 1, pay 15, reach top)  

**Input:** cost = [1,100,1,1,1,100,1,1,100,1]  
**Output:** 6  

**Input:** cost = [0,0,0,0]  
**Output:** 0

## Solution Approach

### Method 1: DP
1. n = len(cost)
2. dp = [0] * (n + 1)
3. dp[0] = 0, dp[1] = 0
4. for i in 2 to n:
   - dp[i] = min(dp[i-1] + cost[i-1], dp[i-2] + cost[i-2])
5. return dp[n]

## Time Complexity

O(n) - Linear.

## Space Complexity

O(1) - Constant space.

## Edge Cases

- **n = 1**: 0
- **n = 2**: min(cost[0], cost[1])
- **All zeros**: 0
- **Increasing costs**: Choose cheaper path

## Applications

- **Optimization**: Min cost path
- **Dynamic Programming**: Staircase problems
- **Decision Making**: Choose steps
- **Interview Questions**: Common

## Practice Tips

- Define dp[i] as cost to reach step i
- Consider starting positions
- Optimize space
- Test with examples
