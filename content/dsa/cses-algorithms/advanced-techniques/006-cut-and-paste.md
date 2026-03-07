---
title: "Cut and Paste"
cses: "https://cses.fi/problemset/task/2110"
difficulty: "Hard"
tags: ["implementation", "string", "dynamic-programming", "palindrome"]
---

## Problem

Minimum operations to make string palindrome by cutting and pasting.

## Example

**Input:** abc  

**Output:** 2  

## Solution Approach

### Method 1: DP
dp = [[0] * n for _ in range(n)]

for i in range(n):

    dp[i][i] = 0

for length in range(2, n+1):

    for i in range(n - length + 1):

        j = i + length - 1

        if s[i] == s[j]:

            dp[i][j] = dp[i+1][j-1]

        else:

            dp[i][j] = min(dp[i+1][j], dp[i][j-1]) + 1

print(dp[0][n-1])

## Time Complexity

O(n^2) - DP.

## Space Complexity

O(n^2).

## Edge Cases

- **Already palindrome**: 0

- **Single char**: 0

- **All same**: 0

- **Reverse**: n-1

## Applications

- **Strings**: Palindrome

- **DP**: Edit distance

- **Operations**: Cut paste

## Practice Tips

- DP for substring

- Palindrome check

- Min operations

- Handle large n
