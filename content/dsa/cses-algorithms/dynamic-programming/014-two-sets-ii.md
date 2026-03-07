---
title: "Two Sets II"
cses: "https://cses.fi/problemset/task/1093"
difficulty: "Medium"
tags: ["implementation", "dynamic-programming"]
---

## Problem

Number of ways to divide 1 to n into two sets with equal sum.

## Example

**Input:** 7  
**Output:** 4  

**Input:** 1  
**Output:** 0  

**Input:** 4  
**Output:** 3

## Solution Approach

### Method 1: DP
1. total = n * (n + 1) // 2
2. if total % 2 != 0:
   - print(0)
3. else:
   - target = total // 2
   - MOD = 10**9 + 7
   - dp = [0] * (target + 1)
   - dp[0] = 1
   - for i in range(1, n + 1):
     - for j in range(target, i - 1, -1):
       - dp[j] = (dp[j] + dp[j - i]) % MOD
   - print(dp[target])

## Time Complexity

O(n * target) - DP.

## Space Complexity

O(target) - DP array.

## Edge Cases

- **Odd sum**: 0
- **n=1**: 0
- **n=2**: 0
- **Even sum**: Ways

## Applications

- **Partitions**: Equal sum
- **DP**: Subset count
- **Modulo**: Large

## Practice Tips

- Check sum parity
- DP for subset sums
- Backward update
- Mod 10^9+7
