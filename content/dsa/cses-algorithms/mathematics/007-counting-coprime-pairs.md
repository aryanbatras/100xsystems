---
title: "Counting Coprime Pairs"
cses: "https://cses.fi/problemset/task/2417"
difficulty: "Medium"
tags: ["implementation", "mathematics", "number-theory", "mobius-inversion", "coprime"]
---

## Problem

Count pairs (a,b) with 1 <= a < b <= n and gcd(a,b) = 1.

## Example

**Input:** 3  
5  
10  
15  
**Output:** 6  
22  
51  

## Solution Approach

### Method 1: Mobius Inversion
Precompute mobius function.

mu = [0] * (MAXN + 1)

prime = [True] * (MAXN + 1)

mu[1] = 1

for i in range(2, MAXN + 1):

    if prime[i]:

        mu[i] = -1

        for j in range(i*2, MAXN + 1, i):

            prime[j] = False

            if (j // i) % i == 0:

                mu[j] = 0

            else:

                mu[j] = -mu[j // i]

Then, for each n:

    ans = 0

    for d in range(1, n+1):

        if mu[d] != 0:

            ans += mu[d] * (n // d) * (n // d - 1) // 2

    print(ans)

## Time Complexity

O(MAXN log log MAXN + q * n) - Precompute and queries.

## Space Complexity

O(MAXN).

## Edge Cases

- **n=1**: 0

- **n=2**: 1

- **n=3**: 2

- **Large n**: Precompute

## Applications

- **Number Theory**: Coprime pairs

- **Mobius Inversion**: Inclusion-exclusion

- **Combinatorics**: Pair counting

## Practice Tips

- Precompute mobius

- Use the formula

- Handle large n

- Efficient computation
