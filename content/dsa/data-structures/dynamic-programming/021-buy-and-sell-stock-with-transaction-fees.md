---
title: "Buy and Sell Stock with Transaction Fees"
leetcode: "https://leetcode.com/problems/best-time-to-buy-and-sell-stock-with-transaction-fee/"
difficulty: "Medium"
tags: ["dynamic-programming", "array"]
---

## Problem

You are given an array prices where prices[i] is the price of a given stock on the ith day, and an integer fee representing a transaction fee. Find the maximum profit you can achieve. You may complete as many transactions as you like, but you need to pay the transaction fee for each transaction.

## Example

**Input:** prices = [1,3,2,8,4,9], fee = 2  
**Output:** 8  

**Input:** prices = [1,3,7,5,10,3], fee = 3  
**Output:** 6  

**Input:** prices = [1], fee = 1  
**Output:** 0

## Solution Approach

### Method 1: DP
1. hold = -prices[0], sold = 0
2. for price in prices[1:]:
   - hold = max(hold, sold - price)
   - sold = max(sold, hold + price - fee)
3. return sold

## Time Complexity

O(n) - Linear.

## Space Complexity

O(1) - Constant space.

## Edge Cases

- **Fee > profit**: 0
- **No transactions**: 0
- **Single day**: 0
- **Fee = 0**: same as unlimited

## Applications

- **Stock Trading**: With fees
- **Dynamic Programming**: Fee consideration
- **Optimization**: Net profit
- **Interview Questions**: Medium problem

## Practice Tips

- Track hold and sold
- Subtract fee on sell
- Update states
- Test with different fees
