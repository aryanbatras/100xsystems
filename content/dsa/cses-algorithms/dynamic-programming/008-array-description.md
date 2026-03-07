---
title: "Array Description"
cses: "https://cses.fi/problemset/task/1746"
difficulty: "Medium"
tags: ["implementation", "dynamic-programming"]
---

## Problem

Fill array with some fixed values, rest 1 to m, adjacent differ by at most 1, count ways.

## Example

**Input:** 3 5  
2 0 2  
**Output:** 4  

**Input:** 4 10  
0 0 0 0  
**Output:** 125  

**Input:** 1 1  
1  
**Output:** 1

## Solution Approach

### Method 1: DP
1. MOD = 10**9 + 7
2. dp = [[0] * (m + 1) for _ in range(n)]
3. if a[0] == 0:
   - for j in range(1, m + 1):
     - dp[0][j] = 1
4. else:
   - dp[0][a[0]] = 1
5. for i in range(1, n):
   - for j in range(1, m + 1):
     - if a[i] == 0 or a[i] == j:
       - for k in range(max(1, j - 1), min(m, j + 1) + 1):
         - dp[i][j] = (dp[i][j] + dp[i-1][k]) % MOD
6. print(sum(dp[-1]) % MOD)

## Time Complexity

O(n * m) - DP.

## Space Complexity

O(n * m) - DP table.

## Edge Cases

- **All fixed**: 1 if valid
- **No constraints**: Complex
- **m=1**: 1 if all 1
- **Invalid**: 0

## Applications

- **DP**: Array filling
- **Constraints**: Adjacent
- **Counting**: Ways

## Practice Tips

- DP for position and value
- Check fixed values
- Sum from possible previous
- Mod 10^9+7
