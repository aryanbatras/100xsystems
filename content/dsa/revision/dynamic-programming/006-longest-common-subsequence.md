---
title: "Longest Common Subsequence"
leetcode: "https://leetcode.com/problems/longest-common-subsequence/"
difficulty: "Medium"
tags: ["string", "dynamic-programming"]
---

## Problem

Given two strings text1 and text2, return the length of their longest common subsequence. A subsequence of a string is a new string generated from the original string with some characters (can be none) deleted without changing the relative order of the remaining characters.

## Example

**Input:** text1 = "abcde", text2 = "ace"  
**Output:** 3 (ace)  

**Input:** text1 = "abc", text2 = "abc"  
**Output:** 3  

**Input:** text1 = "abc", text2 = "def"  
**Output:** 0

## Solution Approach

### Method 1: DP
1. m, n = len(text1), len(text2)
2. dp = [[0] * (n + 1) for _ in range(m + 1)]
3. for i in range(1, m + 1):
   - for j in range(1, n + 1):
     - if text1[i-1] == text2[j-1]:
       - dp[i][j] = dp[i-1][j-1] + 1
     - else:
       - dp[i][j] = max(dp[i-1][j], dp[i][j-1])
4. return dp[m][n]

## Time Complexity

O(m*n) - DP table.

## Space Complexity

O(m*n) - DP table.

## Edge Cases

- **One empty**: 0
- **Identical**: Min length
- **No common**: 0
- **Single char**: 1 if match

## Applications

- **String Problems**: LCS
- **Dynamic Programming**: 2D DP
- **Sequences**: Common subsequence
- **Interview Questions**: Medium

## Practice Tips

- DP for lengths
- If match, +1 diagonal
- Else max up or left
- Return bottom right
