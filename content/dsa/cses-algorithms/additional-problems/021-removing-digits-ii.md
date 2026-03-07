---
title: "Removing Digits II"
cses: "https://cses.fi/problemset/task/2174"
difficulty: "Medium"
tags: ["implementation", "dp", "digits", "reduction"]
---

## Problem

Min steps to reduce n to 0 by subtracting digits.

## Example

**Input:** 27  

**Output:** 3  

## Solution Approach

### Method 1: DP
dp = [float('inf')] * (n + 1)

dp[0] = 0

for i in range(1, n + 1):

    s = str(i)

    for d in s:

        digit = int(d)

        if digit <= i:

            dp[i] = min(dp[i], dp[i - digit] + 1)

print(dp[n])

## Time Complexity

O(n * log n) - DP.

## Space Complexity

O(n).

## Edge Cases

- **0**: 0

- **1-9**: 1

- **10**: 2

- **Large n**: DP

## Applications

- **Numbers**: Digit operations

- **DP**: Min steps

- **Reduction**: Subtract digits

## Practice Tips

- DP for min steps

- Iterate digits

- Update dp

- Handle n
