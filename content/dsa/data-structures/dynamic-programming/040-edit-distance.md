---
title: "Edit Distance"
leetcode: "https://leetcode.com/problems/edit-distance/"
difficulty: "Medium"
tags: ["dynamic-programming", "string"]
---

## Problem

Given two strings word1 and word2, return the minimum number of operations required to convert word1 to word2.

Operations: insert, delete, replace.

## Example

**Input:** word1 = "horse", word2 = "ros"  
**Output:** 3  

**Input:** word1 = "intention", word2 = "execution"  
**Output:** 5  

**Input:** word1 = "a", word2 = "a"  
**Output:** 0

## Solution Approach

### Method 1: DP
1. m, n = len(word1), len(word2)
2. dp = [[0] * (n+1) for _ in range(m+1)]
3. for i in range(m+1):
   - dp[i][0] = i
4. for j in range(n+1):
   - dp[0][j] = j
5. for i in range(1, m+1):
   - for j in range(1, n+1):
     - if word1[i-1] == word2[j-1]:
       - dp[i][j] = dp[i-1][j-1]
     - else:
       - dp[i][j] = 1 + min(dp[i-1][j], dp[i][j-1], dp[i-1][j-1])
6. return dp[m][n]

## Time Complexity

O(m * n) - DP.

## Space Complexity

O(m * n) - DP table.

## Edge Cases

- **Empty strings**: Max length
- **Identical**: 0
- **One empty**: Length
- **Single char**: 1 if different

## Applications

- **String Editing**: Minimum operations
- **Dynamic Programming**: Edit DP
- **Text Processing**: Similarity
- **Interview Questions**: Classic

## Practice Tips

- Initialize base cases
- Fill DP table
- Min of three operations
- Optimize space to O(min(m,n))
