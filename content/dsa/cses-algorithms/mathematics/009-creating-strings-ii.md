---
title: "Creating Strings II"
cses: "https://cses.fi/problemset/task/1622"
difficulty: "Easy"
tags: ["implementation", "mathematics", "combinatorics", "permutations"]
---

## Problem

Count distinct permutations of string.

## Example

**Input:** 3  
aab  
aaa  
abc  
**Output:** 3  
1  
6  

## Solution Approach

### Method 1: Multinomial Coefficient
MOD = 10**9 + 7

MAXN = 10**6 + 10

fact = [1] * MAXN

for i in range(1, MAXN):

    fact[i] = fact[i-1] * i % MOD

def mod_inverse(a, m):

    return pow(a, m-2, m)

for s in strings:

    n = len(s)

    freq = [0] * 26

    for c in s:

        freq[ord(c) - ord('a')] += 1

    denom = 1

    for f in freq:

        if f > 0:

            denom = denom * fact[f] % MOD

    ans = fact[n] * mod_inverse(denom, MOD) % MOD

    print(ans)

## Time Complexity

O(MAXN + q * n) - Precompute and queries.

## Space Complexity

O(MAXN + 26).

## Edge Cases

- **All unique**: n!

- **All same**: 1

- **Empty**: 1

- **Large n**: Precompute

## Applications

- **Combinatorics**: Permutations

- **Strings**: Distinct arrangements

- **Mathematics**: Multinomial coefficient

## Practice Tips

- Precompute factorials

- Count frequencies

- Compute multinomial

- Modular inverse
