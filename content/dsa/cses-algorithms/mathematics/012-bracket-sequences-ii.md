---
title: "Bracket Sequences II"
cses: "https://cses.fi/problemset/task/2187"
difficulty: "Easy"
tags: ["implementation", "mathematics", "combinatorics", "catalan-numbers"]
---

## Problem

Count the number of valid bracket sequences of length 2n.

## Example

**Input:** 3  
1  
2  
3  
**Output:** 1  
2  
5  

## Solution Approach

### Method 1: Catalan Number
C_n = (2n)! / ((n+1)! * n!)

Precompute factorials.

MOD = 10**9 + 7

MAXN = 10**6 + 10

fact = [1] * (2*MAXN)

for i in range(1, 2*MAXN):

    fact[i] = fact[i-1] * i % MOD

def mod_inverse(a, m):

    return pow(a, m-2, m)

def catalan(n):

    return fact[2*n] * mod_inverse(fact[n+1], MOD) * mod_inverse(fact[n], MOD) % MOD

For each n, print catalan(n)

## Time Complexity

O(MAXN + q) - Precompute and queries.

## Space Complexity

O(MAXN).

## Edge Cases

- **n=0**: 1

- **n=1**: 1

- **Large n**: Precompute

- **n=2**: 2

## Applications

- **Combinatorics**: Bracket sequences

- **Mathematics**: Catalan numbers

- **Algorithms**: DP, trees

## Practice Tips

- Precompute factorials

- Compute catalan

- Modular inverse

- Efficient computation
