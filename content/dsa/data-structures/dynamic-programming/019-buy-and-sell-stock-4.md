---
title: "Buy and Sell Stock 4"
leetcode: "https://leetcode.com/problems/best-time-to-buy-and-sell-stock-iv/"
difficulty: "Hard"
tags: ["dynamic-programming", "array"]
---

## Problem

You are given an integer array prices where prices[i] is the price of a given stock on the ith day, and an integer k. Find the maximum profit you can achieve. You may complete at most k transactions. You may not engage in multiple transactions simultaneously (i.e., you must sell the stock before you buy again).

## Example

**Input:** prices = [2,4,1], k = 2  
**Output:** 2 (2->4)  

**Input:** prices = [3,2,6,5,0,3], k = 2  
**Output:** 7 (2->6, 0->3)  

**Input:** prices = [1], k = 0  
**Output:** 0

## Solution Approach

### Method 1: DP
1. if k >= len(prices)//2: return buy_sell_2(prices)
2. dp = [[[0, 0] for _ in range(k+1)] for _ in range(len(prices))]
3. for i in 0 to len(prices)-1:
   - for j in 1 to k:
     - if i > 0:
       - dp[i][j][0] = max(dp[i-1][j][0], dp[i-1][j][1] + prices[i])
       - dp[i][j][1] = max(dp[i-1][j][1], dp[i-1][j-1][0] - prices[i])
     - else:
       - dp[i][j][0] = 0
       - dp[i][j][1] = -prices[i]
4. return dp[-1][k][0]

## Time Complexity

O(n * k) - DP.

## Space Complexity

O(n * k) - DP table.

## Edge Cases

- **k = 0**: 0
- **k >= n/2**: same as unlimited
- **Decreasing prices**: 0
- **Single day**: 0

## Applications

- **Stock Trading**: At most k transactions
- **Dynamic Programming**: State with transactions
- **Optimization**: Limited buys/sells
- **Interview Questions**: Hard problem

## Practice Tips

- DP with transactions
- Optimize for large k
- Handle boundaries
- Test with small k
