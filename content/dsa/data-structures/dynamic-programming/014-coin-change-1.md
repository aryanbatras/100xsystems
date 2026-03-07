---
title: "Coin Change 1"
leetcode: "https://leetcode.com/problems/coin-change/"
difficulty: "Medium"
tags: ["dynamic-programming", "array"]
---

## Problem

You are given an integer array coins representing coins of different denominations and an integer amount representing a total amount of money. Return the fewest number of coins that you need to make up that amount. If that amount of money cannot be made up by any combination of the coins, return -1.

## Example

**Input:** coins = [1,2,5], amount = 11  
**Output:** 3 (5+5+1)  

**Input:** coins = [2], amount = 3  
**Output:** -1  

**Input:** coins = [1], amount = 0  
**Output:** 0

## Solution Approach

### Method 1: DP
1. dp = [float('inf')] * (amount + 1)
2. dp[0] = 0
3. for coin in coins:
   - for j in coin to amount:
     - if dp[j - coin] != float('inf'):
       - dp[j] = min(dp[j], dp[j - coin] + 1)
4. return dp[amount] if dp[amount] != float('inf') else -1

## Time Complexity

O(amount * len(coins)) - DP.

## Space Complexity

O(amount) - DP array.

## Edge Cases

- **amount = 0**: 0
- **No coins**: -1
- **Coins can't make amount**: -1
- **1 in coins**: always possible

## Applications

- **Coin Problems**: Minimum coins
- **Dynamic Programming**: Unbounded choices
- **Optimization**: Greedy fails
- **Interview Questions**: Classic

## Practice Tips

- Initialize dp with inf
- Update for each coin
- Handle impossible cases
- Test with small amounts
