---
title: "Buy and Sell Stock 3"
leetcode: "https://leetcode.com/problems/best-time-to-buy-and-sell-stock-iii/"
difficulty: "Hard"
tags: ["dynamic-programming", "array"]
---

## Problem

You are given an array prices where prices[i] is the price of a given stock on the ith day. Find the maximum profit you can achieve. You may complete at most two transactions. You may not engage in multiple transactions simultaneously (i.e., you must sell the stock before you buy again).

## Example

**Input:** prices = [3,3,5,0,0,3,1,4]  
**Output:** 6 (0->3, 1->4)  

**Input:** prices = [1,2,3,4,5]  
**Output:** 4 (1->5)  

**Input:** prices = [7,6,4,3,1]  
**Output:** 0

## Solution Approach

### Method 1: DP
1. buy1 = sell1 = buy2 = sell2 = float('-inf')
2. buy1 = -prices[0]
3. for price in prices[1:]:
   - buy1 = max(buy1, -price)
   - sell1 = max(sell1, buy1 + price)
   - buy2 = max(buy2, sell1 - price)
   - sell2 = max(sell2, buy2 + price)
4. return max(0, sell2)

## Time Complexity

O(n) - Linear.

## Space Complexity

O(1) - Constant space.

## Edge Cases

- **No profit**: 0
- **One transaction**: same as 1
- **Two transactions**: optimal
- **Decreasing**: 0

## Applications

- **Stock Trading**: At most two transactions
- **Dynamic Programming**: State tracking
- **Optimization**: Multiple buys/sells
- **Interview Questions**: Hard problem

## Practice Tips

- Track four states
- Update in order
- Handle at most two
- Test with examples
