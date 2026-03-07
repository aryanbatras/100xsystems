---
title: "Common Divisors"
cses: "https://cses.fi/problemset/task/1081"
difficulty: "Easy"
tags: ["implementation", "mathematics", "number-theory", "gcd", "divisors"]
---

## Problem

Find number of common divisors of a and b.

## Example

**Input:** 3  
12 18  
9 12  
10 15  
**Output:** 6  
3  
2  

## Solution Approach

### Method 1: GCD and Divisors
import math

def count_common_divisors(a, b):
    g = math.gcd(a, b)
    count = 0
    for i in range(1, int(g**0.5) + 1):
        if g % i == 0:
            count += 1
            if i != g // i:
                count += 1
    return count

For each pair (a, b), print count_common_divisors(a, b)

## Time Complexity

O(sqrt(gcd)) per query.

## Space Complexity

O(1).

## Edge Cases

- **Coprime**: 1
- **Equal**: Divisors of a
- **One is 1**: 1
- **Large gcd**: Square root time

## Applications

- **Number Theory**: Common divisors
- **GCD**: Greatest common divisor
- **Divisors**: Counting

## Practice Tips

- Compute gcd
- Count divisors of gcd
- Handle squares
- Efficient sqrt
