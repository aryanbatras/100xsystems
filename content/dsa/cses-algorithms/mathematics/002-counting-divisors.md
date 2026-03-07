---
title: "Counting Divisors"
cses: "https://cses.fi/problemset/task/1713"
difficulty: "Easy"
tags: ["implementation", "mathematics", "number-theory", "divisors"]
---

## Problem

Count number of divisors of n.

## Example

**Input:** 3  
6  
9  
10  
**Output:** 4  
3  
4  

## Solution Approach

### Method 1: Factorization
def count_divisors(n):
    count = 1
    i = 2
    while i * i <= n:
        if n % i == 0:
            cnt = 0
            while n % i == 0:
                n //= i
                cnt += 1
            count *= (cnt + 1)
        i += 1
    if n > 1:
        count *= 2
    return count

For each n, print count_divisors(n)

## Time Complexity

O(sqrt n) per query.

## Space Complexity

O(1).

## Edge Cases

- **n=1**: 1
- **Prime**: 2
- **Square**: Odd number of divisors
- **Large n**: Up to 10^12

## Applications

- **Number Theory**: Divisor function
- **Mathematics**: Prime factorization
- **Algorithms**: Sieve variants

## Practice Tips

- Factorize n
- Count exponents
- Multiply (e+1)
- Handle large n
