---
title: "Buy and Sell Stock 2"
leetcode: "https://leetcode.com/problems/best-time-to-buy-and-sell-stock-ii/"
difficulty: "Medium"
tags: ["dynamic-programming", "array"]
---

## Problem

You are given an integer array prices where prices[i] is the price of a given stock on the ith day. On each day, you may decide to buy and/or sell the stock. You can only hold at most one share of the stock at any time. However, you can buy it then immediately sell it on the same day. Find and return the maximum profit you can achieve.

## Example

**Input:** prices = [7,1,5,3,6,4]  
**Output:** 7 (1->5, 3->6)  

**Input:** prices = [1,2,3,4,5]  
**Output:** 4 (1->2,2->3,3->4,4->5)  

**Input:** prices = [7,6,4,3,1]  
**Output:** 0

## Solution Approach

### Method 1: Sum Positive Differences
1. profit = 0
2. for i in 1 to len(prices)-1:
   - if prices[i] > prices[i-1]:
     - profit += prices[i] - prices[i-1]
3. return profit

### Method 2: DP
1. dp = [[0, 0] for _ in range(len(prices))]
2. dp[0][0] = 0  # no stock
3. dp[0][1] = -prices[0]  # have stock
4. for i in 1 to len(prices)-1:
   - dp[i][0] = max(dp[i-1][0], dp[i-1][1] + prices[i])
   - dp[i][1] = max(dp[i-1][1], dp[i-1][0] - prices[i])
5. return dp[-1][0]

## Time Complexity

O(n) - Linear.

## Space Complexity

O(1) for sum, O(n) for DP.

## Edge Cases

- **No profit**: 0
- **All increasing**: sum differences
- **Single day**: 0
- **Two days**: max(0, diff)

## Applications

- **Stock Trading**: Multiple transactions
- **Dynamic Programming**: State transitions
- **Optimization**: Maximize profit
- **Interview Questions**: Common

## Practice Tips

- Sum positive changes
- DP for states
- Handle boundaries
- Test with patterns
