---
title: "LCS (string)"
leetcode: "https://leetcode.com/problems/longest-common-subsequence/"
difficulty: "Medium"
tags: ["dynamic-programming", "string"]
---

## Problem

Given two strings text1 and text2, return the longest common subsequence string. If there is no common subsequence, return "".

## Example

**Input:** text1 = "abcde", text2 = "ace"  
**Output:** "ace"  

**Input:** text1 = "abc", text2 = "abc"  
**Output:** "abc"  

**Input:** text1 = "abc", text2 = "def"  
**Output:** ""

## Solution Approach

### Method 1: DP with Reconstruction
1. m, n = len(text1), len(text2)
2. dp = [[0] * (n+1) for _ in range(m+1)]
3. for i in range(1, m+1):
   - for j in range(1, n+1):
     - if text1[i-1] == text2[j-1]:
       - dp[i][j] = dp[i-1][j-1] + 1
     - else:
       - dp[i][j] = max(dp[i-1][j], dp[i][j-1])
4. # Reconstruct the string
5. lcs = []
6. i, j = m, n
7. while i > 0 and j > 0:
   - if text1[i-1] == text2[j-1]:
     - lcs.append(text1[i-1])
     - i -= 1
     - j -= 1
   - elif dp[i-1][j] > dp[i][j-1]:
     - i -= 1
   - else:
     - j -= 1
8. return ''.join(reversed(lcs))

## Time Complexity

O(m * n) - DP.

## Space Complexity

O(m * n) - DP table.

## Edge Cases

- **Empty strings**: ""
- **One empty**: ""
- **Identical**: The string
- **No common**: ""

## Applications

- **String Comparison**: Common subsequences
- **Dynamic Programming**: Sequence DP
- **Bioinformatics**: DNA sequences
- **Interview Questions**: Variant

## Practice Tips

- Fill DP table
- Reconstruct from DP
- Traverse from bottom right
- Handle empty cases
