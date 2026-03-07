---
title: "Buy and Sell Stock with Cooldown"
leetcode: "https://leetcode.com/problems/best-time-to-buy-and-sell-stock-with-cooldown/"
difficulty: "Medium"
tags: ["dynamic-programming", "array"]
---

## Problem

You are given an array prices where prices[i] is the price of a given stock on the ith day. Find the maximum profit you can achieve. You may complete as many transactions as you like but you have to sell the stock before you buy again and you cannot buy on the next day after you sell (cooldown 1 day).

## Example

**Input:** prices = [1,2,3,0,2]  
**Output:** 3 (1->2, 0->2)  

**Input:** prices = [1]  
**Output:** 0  

**Input:** prices = [1,2]  
**Output:** 1

## Solution Approach

### Method 1: DP
1. sold = 0, hold = -prices[0], cooldown = float('-inf')
2. for price in prices[1:]:
   - prev_sold = sold
   - sold = max(sold, hold + price)
   - hold = max(hold, cooldown - price)
   - cooldown = prev_sold
3. return sold

## Time Complexity

O(n) - Linear.

## Space Complexity

O(1) - Constant space.

## Edge Cases

- **Single day**: 0
- **Cooldown prevents next buy**: Adjust
- **No profit**: 0
- **Increasing with cooldown**: Skip days

## Applications

- **Stock Trading**: With cooldown
- **Dynamic Programming**: State with restrictions
- **Optimization**: Constrained transactions
- **Interview Questions**: Medium problem

## Practice Tips

- Track three states
- Update in order
- Handle cooldown
- Test with sequences
