---
title: "Buy and Stock Sell IV"
leetcode: "https://leetcode.com/problems/best-time-to-buy-and-sell-stock-iv/"
difficulty: "Hard"
tags: ["array", "dynamic-programming"]
---

## Problem

You are given an integer array prices where prices[i] is the price of a given stock on the ith day, and an integer k. Find the maximum profit you can achieve. You may complete at most k transactions. You may not engage in multiple transactions simultaneously (i.e., you must sell the stock before you buy again).

## Example

**Input:** k = 2, prices = [2,4,1]  
**Output:** 2 (buy 2, sell 4, profit 2)  

**Input:** k = 2, prices = [3,2,6,5,0,3]  
**Output:** 7 (buy 2 sell 6, buy 0 sell 3)  

**Input:** k = 1, prices = [1,2]  
**Output:** 1

## Solution Approach

### Method 1: DP
1. if not prices or k == 0: return 0
2. n = len(prices)
3. if k >= n // 2:
   - # Unlimited transactions
   - profit = 0
   - for i in range(1, n):
     - if prices[i] > prices[i-1]:
       - profit += prices[i] - prices[i-1]
   - return profit
4. buy = [float('-inf')] * (k + 1)
5. sell = [0] * (k + 1)
6. for price in prices:
   - for t in range(1, k + 1):
     - buy[t] = max(buy[t], sell[t-1] - price)
     - sell[t] = max(sell[t], buy[t] + price)
7. return sell[k]

## Time Complexity

O(n * k) - Nested loops.

## Space Complexity

O(k) - Arrays.

## Edge Cases

- **k = 0**: 0
- **k >= n/2**: Unlimited
- **Decreasing**: 0
- **Single day**: 0

## Applications

- **Stock Problems**: K transactions
- **Dynamic Programming**: State machine
- **Arrays**: Price changes
- **Interview Questions**: Hard

## Practice Tips

- Handle unlimited case
- Track buy and sell per transaction
- Update for each price
- Max profit
