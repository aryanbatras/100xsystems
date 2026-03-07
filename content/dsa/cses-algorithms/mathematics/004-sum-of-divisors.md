---
title: "Sum of Divisors"
cses: "https://cses.fi/problemset/task/1082"
difficulty: "Easy"
tags: ["implementation", "mathematics", "number-theory", "divisors"]
---

## Problem

Compute sum of divisors of n.

## Example

**Input:** 3  
6  
9  
10  
**Output:** 12  
13  
18  

## Solution Approach

### Method 1: Factorization
def sum_divisors(n):
    if n == 1:
        return 1
    sum_d = 1
    i = 2
    while i * i <= n:
        if n % i == 0:
            curr_sum = 1
            while n % i == 0:
                n //= i
                curr_sum = curr_sum * i + 1
            sum_d *= curr_sum
        i += 1
    if n > 1:
        sum_d *= (1 + n)
    return sum_d

For each n, print sum_divisors(n)

## Time Complexity

O(sqrt n) per query.

## Space Complexity

O(1).

## Edge Cases

- **n=1**: 1
- **Prime**: n+1
- **Square**: Sum includes square
- **Large n**: Factorization

## Applications

- **Number Theory**: Divisor sum
- **Mathematics**: Arithmetic functions
- **Algorithms**: Factorization

## Practice Tips

- Factorize n
- Sum geometric series
- Handle primes
- Efficient computation
