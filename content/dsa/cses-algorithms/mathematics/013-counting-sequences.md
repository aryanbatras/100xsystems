---
title: "Counting Sequences"
cses: "https://cses.fi/problemset/task/2418"
difficulty: "Easy"
tags: ["implementation", "mathematics", "combinatorics", "dynamic-programming"]
---

## Problem

Count sequences of length n with elements 1 to k, no two consecutive equal.

## Example

**Input:** 3  
3 2  
4 3  
5 4  
**Output:** 6  
24  
120  

## Solution Approach

### Method 1: DP
dp = [[0] * (k+1) for _ in range(n+1)]

for j in range(1, k+1):

    dp[1][j] = 1

for i in range(2, n+1):

    for j in range(1, k+1):

        for m in range(1, k+1):

            if m != j:

                dp[i][j] += dp[i-1][m]

ans = 0

for j in range(1, k+1):

    ans += dp[n][j]

print(ans)

## Time Complexity

O(n * k^2) - DP.

## Space Complexity

O(n * k).

## Edge Cases

- **n=1**: k

- **k=1**: 1

- **n=2**: k*(k-1)

- **Large n,k**: DP

## Applications

- **Combinatorics**: Sequences

- **Mathematics**: Recurrence

- **Algorithms**: DP

## Practice Tips

- DP for sequences

- No consecutive equal

- Sum over possibilities

- Handle large numbers
