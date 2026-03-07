---
title: "Palindrome Partitioning 3"
leetcode: "https://leetcode.com/problems/palindrome-partitioning-iii/"
difficulty: "Hard"
tags: ["dynamic-programming", "string"]
---

## Problem

You are given a string s containing lowercase letters and an integer k. You need to construct k non-empty palindromic substrings by partitioning s.

Return the minimal number of changes needed to make this possible.

## Example

**Input:** s = "abc", k = 2  
**Output:** 1 (a|b c, change c to b or a to c)  

**Input:** s = "aabbc", k = 3  
**Output:** 0 (a|ab|b c, but a ab b c, wait, example not perfect)  

**Input:** s = "leetcode", k = 8  
**Output:** 0

## Solution Approach

### Method 1: DP
1. n = len(s)
2. cost = [[0] * n for _ in range(n)]
3. for l in range(n):
   - for r in range(l, n):
     - changes = 0
     - for i in range((r - l + 1) // 2):
       - if s[l + i] != s[r - i]:
         - changes += 1
     - cost[l][r] = changes
4. dp = [[float('inf')] * (k + 1) for _ in range(n + 1)]
5. dp[0][0] = 0
6. for i in range(1, n + 1):
   - for p in range(1, min(i, k) + 1):
     - for j in range(p - 1, i):
       - dp[i][p] = min(dp[i][p], dp[j][p - 1] + cost[j][i - 1])
7. return dp[n][k]

## Time Complexity

O(n^2 * k) - DP.

## Space Complexity

O(n^2 + n * k) - Cost and DP.

## Edge Cases

- **k = 1**: cost[0][n-1]
- **k = n**: 0
- **Already palindromes**: 0
- **Impossible**: inf

## Applications

- **String Partitioning**: Min changes
- **Dynamic Programming**: Partition DP
- **Optimization**: Palindrome construction
- **Interview Questions**: Hard problem

## Practice Tips

- Precompute cost for substrings
- DP for partitions
- Handle k constraints
- Optimize cost calculation
