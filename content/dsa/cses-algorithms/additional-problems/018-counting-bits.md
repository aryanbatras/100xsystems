---
title: "Counting Bits"
cses: "https://cses.fi/problemset/task/1146"
difficulty: "Easy"
tags: ["implementation", "bit-manipulation", "dp", "counting"]
---

## Problem

Count set bits for each number up to n.

## Example

**Input:** 5  

**Output:** 0 1 1 2 1 2  

## Solution Approach

### Method 1: DP for Bit Counts
dp = [0] * (n + 1)

for i in range(1, n + 1):

    dp[i] = dp[i >> 1] + (i & 1)

for i in range(n + 1):

    print(dp[i], end=' ')

## Time Complexity

O(n) - DP.

## Space Complexity

O(n).

## Edge Cases

- **0**: 0

- **1**: 1

- **Powers of 2**: 1

- **Large n**: DP

## Applications

- **Bit Manipulation**: Set bits

- **Numbers**: Binary

- **DP**: Reuse

## Practice Tips

- DP for bit counts

- Build array

- Output all

- Handle n
