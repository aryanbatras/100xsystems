---
title: "Distributing Apples"
cses: "https://cses.fi/problemset/task/1715"
difficulty: "Easy"
tags: ["implementation", "mathematics", "combinatorics", "stars-and-bars"]
---

## Problem

Number of ways to distribute n identical apples to k distinct baskets with at least one apple each.

## Example

**Input:** 3  
3 2  
5 3  
10 4  
**Output:** 2  
6  
84  

## Solution Approach

### Method 1: Stars and Bars
C(n-1, k-1)

Precompute binomial coefficients.

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

For each (n, k), print binom(n-1, k-1)

## Time Complexity

O(MAXN + q) - Precompute and queries.

## Space Complexity

O(MAXN).

## Edge Cases

- **n < k**: 0

- **k=1**: 1

- **n=1, k=1**: 1

- **Large n**: Precompute

## Applications

- **Combinatorics**: Distributions

- **Mathematics**: Stars and bars

- **Algorithms**: Binomial coefficients

## Practice Tips

- Stars and bars formula

- Precompute binomials

- Handle edge cases

- Modular arithmetic
