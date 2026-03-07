---
title: "Substring Reversals"
cses: "https://cses.fi/problemset/task/2073"
difficulty: "Hard"
tags: ["implementation", "string", "dynamic-programming", "reversals"]
---

## Problem

Minimum substring reversals to sort string.

## Example

**Input:** abac  

**Output:** 1  

## Solution Approach

### Method 1: DP
dp = [[float('inf')] * n for _ in range(n)]

for i in range(n):

    dp[i][i] = 0

for length in range(2, n+1):

    for i in range(n - length + 1):

        j = i + length - 1

        if ''.join(sorted(s[i:j+1])) == s[i:j+1]:

            dp[i][j] = 0

        else:

            for k in range(i, j):

                dp[i][j] = min(dp[i][j], dp[i][k] + dp[k+1][j] + 1)

print(dp[0][n-1])

## Time Complexity

O(n^3) - DP.

## Space Complexity

O(n^2).

## Edge Cases

- **Sorted**: 0

- **Reverse**: 1

- **Single**: 0

- **Palindrome**: 0

## Applications

- **Strings**: Sorting

- **DP**: Substring

- **Reversals**: Operations

## Practice Tips

- DP for substring

- Check sorted

- Min reversals

- Handle large n
