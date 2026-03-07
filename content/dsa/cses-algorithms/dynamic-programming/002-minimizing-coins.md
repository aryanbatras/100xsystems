---
title: "Minimizing Coins"
cses: "https://cses.fi/problemset/task/1634"
difficulty: "Easy"
tags: ["implementation", "dynamic-programming"]
---

## Problem

Find the minimum number of coins needed to make sum x with given coin denominations.

## Example

**Input:** 3 11  
1 5 7  
**Output:** 3  

**Input:** 2 10  
1 2  
**Output:** 5  

**Input:** 1 0  
1  
**Output:** 0

## Solution Approach

### Method 1: DP
1. dp = [float('inf')] * (x + 1)
2. dp[0] = 0
3. for coin in coins:
   - for i in range(coin, x + 1):
     - dp[i] = min(dp[i], dp[i - coin] + 1)
4. print(dp[x] if dp[x] != float('inf') else -1)

## Time Complexity

O(len(coins) * x) - DP.

## Space Complexity

O(x) - DP array.

## Edge Cases

- **x=0**: 0
- **No way**: -1
- **Coin=1**: x
- **Large x**: DP

## Applications

- **DP**: Coin change
- **Minimization**: Counts
- **Greedy**: Sometimes works

## Practice Tips

- DP for each amount
- Min from coin reductions
- Handle impossible
- Initialize inf
