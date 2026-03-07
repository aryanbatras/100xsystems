---
title: "LPS (string)"
leetcode: "https://leetcode.com/problems/longest-palindromic-substring/"
difficulty: "Medium"
tags: ["dynamic-programming", "string"]
---

## Problem

Given a string s, return the longest palindromic substring in s.

## Example

**Input:** s = "babad"  
**Output:** "bab"  

**Input:** s = "cbbd"  
**Output:** "bb"  

**Input:** s = "a"  
**Output:** "a"

## Solution Approach

### Method 1: DP
1. n = len(s)
2. dp = [[False] * n for _ in range(n)]
3. start = 0
4. max_length = 1
5. for i in range(n):
   - dp[i][i] = True
6. for i in range(n-1):
   - if s[i] == s[i+1]:
     - dp[i][i+1] = True
     - start = i
     - max_length = 2
7. for length in range(3, n+1):
   - for i in range(n - length + 1):
     - j = i + length - 1
     - if dp[i+1][j-1] and s[i] == s[j]:
       - dp[i][j] = True
       - start = i
       - max_length = length
8. return s[start:start + max_length]

## Time Complexity

O(n^2) - DP.

## Space Complexity

O(n^2) - DP table.

## Edge Cases

- **Single character**: "a"
- **All same**: Whole string
- **No palindrome**: Single char
- **Even length**: "aa"

## Applications

- **String Analysis**: Palindromic substrings
- **Dynamic Programming**: Substring DP
- **Pattern Recognition**: Palindromes
- **Interview Questions**: Classic

## Practice Tips

- DP for lengths
- Track start and max_length
- Handle even and odd
- Optimize to O(n) space if needed
