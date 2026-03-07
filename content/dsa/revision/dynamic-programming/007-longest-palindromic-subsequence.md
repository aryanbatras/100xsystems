---
title: "Longest Palindromic Subsequence"
leetcode: "https://leetcode.com/problems/longest-palindromic-subsequence/"
difficulty: "Medium"
tags: ["string", "dynamic-programming"]
---

## Problem

Given a string s, find the length of the longest palindromic subsequence. A subsequence is a sequence that can be derived from another sequence by deleting some or no elements without changing the order of the remaining elements.

## Example

**Input:** s = "bbbab"  
**Output:** 4 (bbbb)  

**Input:** s = "cbbd"  
**Output:** 2 (bb)  

**Input:** s = "a"  
**Output:** 1

## Solution Approach

### Method 1: DP
1. n = len(s)
2. dp = [[0] * n for _ in range(n)]
3. for i in range(n):
   - dp[i][i] = 1
4. for length in range(2, n + 1):
   - for i in range(n - length + 1):
     - j = i + length - 1
     - if s[i] == s[j]:
       - dp[i][j] = dp[i+1][j-1] + 2
     - else:
       - dp[i][j] = max(dp[i+1][j], dp[i][j-1])
5. return dp[0][n-1]

## Time Complexity

O(n^2) - DP table.

## Space Complexity

O(n^2) - DP table.

## Edge Cases

- **Single char**: 1
- **All same**: n
- **No palindrome**: 1
- **Even length**: Ok

## Applications

- **String Problems**: LPS
- **Dynamic Programming**: 2D DP
- **Palindromes**: Subsequence
- **Interview Questions**: Medium

## Practice Tips

- DP for i to j
- If match, +2 + inner
- Else max left or right
- Diagonal base 1
