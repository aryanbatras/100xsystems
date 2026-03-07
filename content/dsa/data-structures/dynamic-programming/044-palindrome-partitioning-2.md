---
title: "Palindrome Partitioning 2"
leetcode: "https://leetcode.com/problems/palindrome-partitioning-ii/"
difficulty: "Hard"
tags: ["dynamic-programming", "string"]
---

## Problem

Given a string s, partition s such that every substring of the partition is a palindrome. Return the minimum cuts needed for a palindrome partitioning of s.

## Example

**Input:** s = "aab"  
**Output:** 1 (aa/b)  

**Input:** s = "a"  
**Output:** 0  

**Input:** s = "ab"  
**Output:** 1

## Solution Approach

### Method 1: DP
1. n = len(s)
2. is_pal = [[False] * n for _ in range(n)]
3. for i in range(n):
   - is_pal[i][i] = True
4. for i in range(n-1):
   - if s[i] == s[i+1]:
     - is_pal[i][i+1] = True
5. for length in range(3, n+1):
   - for i in range(n - length + 1):
     - j = i + length - 1
     - if s[i] == s[j] and is_pal[i+1][j-1]:
       - is_pal[i][j] = True
6. cuts = [0] * n
7. for i in range(n):
   - cuts[i] = i
8. for i in range(1, n):
   - if is_pal[0][i]:
     - cuts[i] = 0
   - else:
     - for j in range(i):
       - if is_pal[j+1][i]:
         - cuts[i] = min(cuts[i], cuts[j] + 1)
9. return cuts[n-1]

## Time Complexity

O(n^2) - DP.

## Space Complexity

O(n^2) - Palindrome table.

## Edge Cases

- **Palindrome string**: 0
- **Single character**: 0
- **No palindromes**: n-1
- **All same**: 0

## Applications

- **String Partitioning**: Min cuts
- **Dynamic Programming**: Cuts DP
- **Optimization**: Palindrome partitions
- **Interview Questions**: Hard problem

## Practice Tips

- Precompute palindromes
- DP for min cuts
- Handle base cases
- Optimize if possible
