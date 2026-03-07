---
title: "Removal Game"
cses: "https://cses.fi/problemset/task/1097"
difficulty: "Medium"
tags: ["implementation", "dynamic-programming", "game-theory"]
---

## Problem

Two players remove numbers from ends, first maximizes score difference.

## Example

**Input:** 4  
1 2 3 4  
**Output:** 2  

**Input:** 1  
10  
**Output:** 10  

**Input:** 2  
1 2  
**Output:** 1

## Solution Approach

### Method 1: DP
1. dp = [[0] * n for _ in range(n)]
2. for i in range(n):
   - dp[i][i] = a[i]
3. for length in range(2, n + 1):
   - for i in range(n - length + 1):
     - j = i + length - 1
     - dp[i][j] = max(a[i] - dp[i+1][j], a[j] - dp[i][j-1])
4. print(dp[0][n-1])

## Time Complexity

O(n^2) - DP.

## Space Complexity

O(n^2) - DP table.

## Edge Cases

- **n=1**: a[0]
- **n=2**: max - min
- **Even n**: Difference
- **Odd n**: Extra

## Applications

- **DP**: Game theory
- **Intervals**: Subarrays
- **Maximization**: Score

## Practice Tips

- DP for subarrays
- Max over choices
- Base single element
- Compute difference
