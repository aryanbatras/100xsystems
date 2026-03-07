---
title: "Dice Combinations"
cses: "https://cses.fi/problemset/task/1633"
difficulty: "Easy"
tags: ["implementation", "dynamic-programming"]
---

## Problem

Find the number of ways to make sum n using dice (1-6).

## Example

**Input:** 3  
**Output:** 4 (1+1+1, 1+2, 2+1, 3)  

**Input:** 1  
**Output:** 1  

**Input:** 0  
**Output:** 1

## Solution Approach

### Method 1: DP
1. MOD = 10**9 + 7
2. dp = [0] * (n + 1)
3. dp[0] = 1
4. for i in range(1, n + 1):
   - for j in range(1, 7):
     - if i - j >= 0:
       - dp[i] = (dp[i] + dp[i - j]) % MOD
5. print(dp[n])

## Time Complexity

O(n) - Linear.

## Space Complexity

O(n) - DP array.

## Edge Cases

- **n=0**: 1
- **n=1**: 1
- **Large n**: Mod

## Applications

- **DP**: Combinatorics
- **Dice**: Sums
- **Modulo**: Large numbers

## Practice Tips

- DP for sums
- Add from previous
- Mod 10^9+7
- Handle base
