---
title: "Counting Tilings"
cses: "https://cses.fi/problemset/task/2181"
difficulty: "Medium"
tags: ["implementation", "dynamic-programming"]
---

## Problem

Number of ways to tile 2xn board with 1x2 and 2x1 tiles.

## Example

**Input:** 4  
**Output:** 5  

**Input:** 1  
**Output:** 1  

**Input:** 2  
**Output:** 2

## Solution Approach

### Method 1: DP
1. MOD = 10**9 + 7
2. dp = [0] * (n + 1)
3. dp[0] = 1
4. dp[1] = 1
5. for i in range(2, n + 1):
   - dp[i] = (dp[i-1] + dp[i-2]) % MOD
6. print(dp[n])

## Time Complexity

O(n) - Linear.

## Space Complexity

O(n) - DP array.

## Edge Cases

- **n=0**: 1
- **n=1**: 1
- **Large n**: Mod

## Applications

- **DP**: Tilings
- **Fibonacci**: Ways
- **Modulo**: Large

## Practice Tips

- DP recurrence
- Mod 10^9+7
- Base cases
- Linear time
