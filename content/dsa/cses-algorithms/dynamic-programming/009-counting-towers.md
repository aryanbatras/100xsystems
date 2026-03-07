---
title: "Counting Towers"
cses: "https://cses.fi/problemset/task/2413"
difficulty: "Medium"
tags: ["implementation", "dynamic-programming"]
---

## Problem

Count the number of ways to build towers of height n with 2xn tiles.

## Example

**Input:** 4  
**Output:** 11  

**Input:** 1  
**Output:** 2  

**Input:** 2  
**Output:** 7

## Solution Approach

### Method 1: DP
1. MOD = 10**9 + 7
2. dp = [0] * (n + 1)
3. dp[1] = 2
4. if n >= 2:
   - dp[2] = 7
5. for i in range(3, n + 1):
   - dp[i] = (2 * dp[i-1] + dp[i-2]) % MOD
6. print(dp[n])

## Time Complexity

O(n) - Linear.

## Space Complexity

O(n) - DP array.

## Edge Cases

- **n=1**: 2
- **n=2**: 7
- **Large n**: Mod

## Applications

- **DP**: Tile arrangements
- **Towers**: Ways
- **Modulo**: Large

## Practice Tips

- DP recurrence
- Mod 10^9+7
- Base cases
- Linear time
