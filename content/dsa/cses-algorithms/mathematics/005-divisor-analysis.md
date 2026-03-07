---
title: "Divisor Analysis"
cses: "https://cses.fi/problemset/task/1987"
difficulty: "Easy"
tags: ["implementation", "mathematics", "number-theory", "divisors"]
---

## Problem

For each n, find number of divisors and sum of divisors.

## Example

**Input:** 3  
6  
9  
10  
**Output:** 4 12  
3 13  
4 18  

## Solution Approach

### Method 1: Factorization
def analyze_divisors(n):
    num_div = 1
    sum_div = 1
    i = 2
    while i * i <= n:
        if n % i == 0:
            cnt = 0
            curr_sum = 1
            while n % i == 0:
                n //= i
                cnt += 1
                curr_sum = curr_sum * i + 1
            num_div *= (cnt + 1)
            sum_div *= curr_sum
        i += 1
    if n > 1:
        num_div *= 2
        sum_div *= (1 + n)
    return num_div, sum_div

For each n, print analyze_divisors(n)

## Time Complexity

O(sqrt n) per query.

## Space Complexity

O(1).

## Edge Cases

- **n=1**: 1 1
- **Prime**: 2 n+1
- **Square**: Odd number, sum includes square
- **Large n**: Factorization

## Applications

- **Number Theory**: Divisor functions
- **Mathematics**: Arithmetic functions
- **Algorithms**: Factorization

## Practice Tips

- Factorize n
- Compute both count and sum
- Handle exponents
- Efficient sqrt
