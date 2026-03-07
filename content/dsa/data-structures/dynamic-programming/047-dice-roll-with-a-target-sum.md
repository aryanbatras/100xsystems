---
title: "Dice Roll With a Target Sum"
difficulty: "Medium"
tags: ["dynamic-programming", "array"]
---

## Problem

Given n dice, each with k faces numbered from 1 to k, find the number of ways to get a sum of target.

## Example

**Input:** n = 1, k = 6, target = 3  
**Output:** 1  

**Input:** n = 2, k = 6, target = 7  
**Output:** 6  

**Input:** n = 3, k = 6, target = 15  
**Output:** 1

## Solution Approach

### Method 1: DP
1. dp = [[0] * (target + 1) for _ in range(n + 1)]
2. dp[0][0] = 1
3. for i in range(1, n + 1):
   - for j in range(target + 1):
     - for face in range(1, min(k, j) + 1):
       - dp[i][j] += dp[i-1][j - face]
4. return dp[n][target]

## Time Complexity

O(n * target * k) - DP.

## Space Complexity

O(n * target) - DP table.

## Edge Cases

- **target < n**: 0
- **target > n*k**: 0
- **n = 1**: 1 if 1 <= target <= k
- **k = 1**: 1 if target = n

## Applications

- **Probability**: Dice sums
- **Dynamic Programming**: Combinatorial DP
- **Counting**: Ways to sum
- **Interview Questions**: Common

## Practice Tips

- Initialize dp[0][0] = 1
- Update for each die
- Handle modulo if large
- Optimize space
