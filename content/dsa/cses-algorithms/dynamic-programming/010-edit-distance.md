---
title: "Edit Distance"
cses: "https://cses.fi/problemset/task/1639"
difficulty: "Medium"
tags: ["implementation", "dynamic-programming", "string"]
---

## Problem

Compute the edit distance between two strings.

## Example

**Input:**  
lorem  
ipsum  
**Output:** 5  

**Input:**  
abc  
abc  
**Output:** 0  

**Input:**  
kitten  
sitting  
**Output:** 3

## Solution Approach

### Method 1: DP
1. m, n = len(s), len(t)
2. dp = [[0] * (n + 1) for _ in range(m + 1)]
3. for i in range(m + 1):
   - dp[i][0] = i
4. for j in range(n + 1):
   - dp[0][j] = j
5. for i in range(1, m + 1):
   - for j in range(1, n + 1):
     - if s[i-1] == t[j-1]:
       - dp[i][j] = dp[i-1][j-1]
     - else:
       - dp[i][j] = min(dp[i-1][j], dp[i][j-1], dp[i-1][j-1]) + 1
6. print(dp[m][n])

## Time Complexity

O(m * n) - DP.

## Space Complexity

O(m * n) - DP table.

## Edge Cases

- **Empty strings**: Length
- **Identical**: 0
- **One char**: 1
- **Long strings**: DP

## Applications

- **Strings**: Edit distance
- **DP**: 2D
- **Levenshtein**: Operations

## Practice Tips

- Initialize borders
- Match or min ops
- Return bottom right
- Optimize space
