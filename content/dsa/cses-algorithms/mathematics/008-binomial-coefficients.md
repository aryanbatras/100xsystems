---
title: "Binomial Coefficients"
cses: "https://cses.fi/problemset/task/1079"
difficulty: "Easy"
tags: ["implementation", "mathematics", "combinatorics", "modular-arithmetic"]
---

## Problem

Compute C(n,k) mod 10^9+7.

## Example

**Input:** 3  
5 2  
10 5  
49 6  
**Output:** 10  
252  
13983816  

## Solution Approach

### Method 1: Precompute Factorials
MOD = 10**9 + 7

MAXN = 10**6 + 10

fact = [1] * MAXN

for i in range(1, MAXN):

    fact[i] = fact[i-1] * i % MOD

def mod_inverse(a, m):

    return pow(a, m-2, m)

def binom(n, k):

    if k < 0 or k > n:

        return 0

    return fact[n] * mod_inverse(fact[k], MOD) * mod_inverse(fact[n-k], MOD) % MOD

For each (n, k), print binom(n, k)

## Time Complexity

O(MAXN + q) - Precompute and queries.

## Space Complexity

O(MAXN).

## Edge Cases

- **k=0 or k=n**: 1

- **k > n**: 0

- **n=0**: 1 if k=0

- **Large n**: Precompute

## Applications

- **Combinatorics**: Binomial coefficients

- **Mathematics**: Combinations

- **Algorithms**: DP, paths

## Practice Tips

- Precompute factorials

- Modular inverse

- Handle edge cases

- Efficient computation
