---
title: "Christmas Party"
cses: "https://cses.fi/problemset/task/1717"
difficulty: "Easy"
tags: ["implementation", "mathematics", "combinatorics", "derangements"]
---

## Problem

Compute the number of derangements of n items.

## Example

**Input:** 5  
1  
2  
3  
4  
5  
**Output:** 0  
1  
2  
9  
44  

## Solution Approach

### Method 1: DP for Derangements
dp = [0] * (MAXN + 1)

dp[0] = 1

dp[1] = 0

for i in range(2, MAXN + 1):

    dp[i] = (i - 1) * (dp[i-1] + dp[i-2]) % MOD

For each n, print dp[n]

## Time Complexity

O(MAXN + q) - Precompute and queries.

## Space Complexity

O(MAXN).

## Edge Cases

- **n=0**: 1

- **n=1**: 0

- **n=2**: 1

- **Large n**: Precompute

## Applications

- **Combinatorics**: Derangements

- **Mathematics**: Permutations with restrictions

- **Algorithms**: DP

## Practice Tips

- DP for derangements

- Precompute

- Handle large n

- Modular arithmetic
