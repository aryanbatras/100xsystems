---
title: "Buy and Sell Stock 1"
leetcode: "https://leetcode.com/problems/best-time-to-buy-and-sell-stock/"
difficulty: "Easy"
tags: ["dynamic-programming", "array"]
---

## Problem

You are given an array prices where prices[i] is the price of a given stock on the ith day. You want to maximize your profit by choosing a single day to buy one stock and choosing a different day in the future to sell that stock. Return the maximum profit you can achieve from this transaction. If you cannot achieve any profit, return 0.

## Example

**Input:** prices = [7,1,5,3,6,4]  
**Output:** 5 (buy 1, sell 6)  

**Input:** prices = [7,6,4,3,1]  
**Output:** 0  

**Input:** prices = [1,2]  
**Output:** 1

## Solution Approach

### Method 1: Track Min Price
1. min_price = float('inf')
2. max_profit = 0
3. for price in prices:
   - min_price = min(min_price, price)
   - max_profit = max(max_profit, price - min_price)
4. return max_profit

## Time Complexity

O(n) - Single pass.

## Space Complexity

O(1) - Constant space.

## Edge Cases

- **Decreasing prices**: 0
- **Increasing prices**: max - min
- **Single price**: 0
- **Two prices**: max(0, diff)

## Applications

- **Stock Trading**: Single transaction
- **Optimization**: Max difference
- **Dynamic Programming**: Kadane variant
- **Interview Questions**: Classic

## Practice Tips

- Track minimum price
- Update max profit
- No need for DP
- Handle empty array
