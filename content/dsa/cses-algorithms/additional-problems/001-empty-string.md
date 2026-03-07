---
title: "Empty String"
cses: "https://cses.fi/problemset/task/1080"
difficulty: "Medium"
tags: ["implementation", "string", "dynamic-programming", "substrings"]
---

## Problem

Number of ways to build string from substrings.

## Example

**Input:** abc  
2  
a  
bc  
**Output:** 1  

## Solution Approach

### Method 1: DP
dp = [0] * (n + 1)

dp[0] = 1

for i in range(1, n + 1):

    for sub in substrings:

        len_sub = len(sub)

        if i >= len_sub and s[i - len_sub:i] == sub:

            dp[i] = (dp[i] + dp[i - len_sub]) % MOD

print(dp[n])

## Time Complexity

O(n * m) - DP.

## Space Complexity

O(n).

## Edge Cases

- **No ways**: 0

- **Single substring**: 1 if matches

- **Overlapping**: Sum

- **Empty**: 1

## Applications

- **Strings**: Construction

- **DP**: Ways

- **Substrings**: Matching

## Practice Tips

- DP for positions

- Substring matching

- Modular arithmetic

- Handle large n
