---
title: "Coin Combinations II"
cses: "https://cses.fi/problemset/task/1636"
difficulty: "Easy"
tags: ["implementation", "dynamic-programming"]
---

## Problem

Find the number of ways to make sum x with given coins, order doesn't matter.

## Example

**Input:** 3 9  
2 3 5  
**Output:** 8  

**Input:** 2 4  
1 2  
**Output:** 3  

**Input:** 1 0  
1  
**Output:** 1

## Solution Approach

### Method 1: DP
1. MOD = 10**9 + 7
2. dp = [0] * (x + 1)
3. dp[0] = 1
4. for coin in coins:
   - for i in range(coin, x + 1):
     - dp[i] = (dp[i] + dp[i - coin]) % MOD
5. print(dp[x])

## Time Complexity

O(len(coins) * x) - DP.

## Space Complexity

O(x) - DP array.

## Edge Cases

- **x=0**: 1
- **No coins**: 0 for x>0
- **Coin=1**: 1 way
- **Duplicates**: Allowed

## Applications

- **DP**: Combinations
- **Coins**: Unordered
- **Modulo**: Large

## Practice Tips

- DP for each coin
- Add ways from previous
- Mod 10^9+7
- Order doesn't matter
