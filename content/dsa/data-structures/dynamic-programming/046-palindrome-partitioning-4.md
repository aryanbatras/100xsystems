---
title: "Palindrome Partitioning 4"
leetcode: "https://leetcode.com/problems/palindrome-partitioning-iv/"
difficulty: "Hard"
tags: ["dynamic-programming", "string"]
---

## Problem

Given a string s, return true if it is possible to split the string s into three non-empty palindromic substrings. Otherwise, return false.

## Example

**Input:** s = "abcbdd"  
**Output:** true (a, bcb, dd)  

**Input:** s = "bcbddxy"  
**Output:** false  

**Input:** s = "aaa"  
**Output:** true (a, a, a)

## Solution Approach

### Method 1: DP
1. n = len(s)
2. if n < 3: return False
3. is_pal = [[False] * n for _ in range(n)]
4. for i in range(n):
   - is_pal[i][i] = True
5. for i in range(n-1):
   - if s[i] == s[i+1]:
     - is_pal[i][i+1] = True
6. for length in range(3, n+1):
   - for i in range(n - length + 1):
     - j = i + length - 1
     - if s[i] == s[j] and is_pal[i+1][j-1]:
       - is_pal[i][j] = True
7. for i in range(1, n):
   - for j in range(i+1, n):
     - if is_pal[0][i-1] and is_pal[i][j-1] and is_pal[j][n-1]:
       - return True
8. return False

## Time Complexity

O(n^2) - DP.

## Space Complexity

O(n^2) - Palindrome table.

## Edge Cases

- **n < 3**: False
- **Three single chars**: True if n=3
- **Whole string palindrome**: True
- **No valid split**: False

## Applications

- **String Partitioning**: Three palindromes
- **Dynamic Programming**: Palindrome check
- **Validation**: Possible splits
- **Interview Questions**: Hard problem

## Practice Tips

- Precompute palindromes
- Check all i,j splits
- Ensure non-empty
- Handle small n
