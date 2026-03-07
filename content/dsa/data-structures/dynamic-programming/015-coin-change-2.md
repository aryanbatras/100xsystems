---
title: "Coin Change 2"
leetcode: "https://leetcode.com/problems/coin-change-2/"
difficulty: "Medium"
tags: ["dynamic-programming", "array"]
---

## Problem

You are given an integer array coins representing coins of different denominations and an integer amount representing a total amount of money. Return the number of combinations that make up that amount. If that amount of money cannot be made up by any combination of the coins, return 0. You may assume that you have an infinite number of each kind of coin.

## Example

**Input:** coins = [1,2,5], amount = 5  
**Output:** 4 (5, 2+3, 1+4, 1+2+2)  

**Input:** coins = [2], amount = 3  
**Output:** 0  

**Input:** coins = [1], amount = 0  
**Output:** 1

## Solution Approach

### Method 1: DP
1. dp = [0] * (amount + 1)
2. dp[0] = 1
3. for coin in coins:
   - for j in coin to amount:
     - dp[j] += dp[j - coin]
4. return dp[amount]

## Time Complexity

O(amount * len(coins)) - DP.

## Space Complexity

O(amount) - DP array.

## Edge Cases

- **amount = 0**: 1
- **No coins**: 0
- **Coins can't make amount**: 0
- **1 in coins**: C(amount, amount)

## Applications

- **Coin Problems**: Number of ways
- **Dynamic Programming**: Unbounded combinations
- **Combinatorics**: Combination sums
- **Interview Questions**: Common

## Practice Tips

- Initialize dp[0] = 1
- Coin loop outside
- Update dp[j] += dp[j - coin]
- Test with small amounts
