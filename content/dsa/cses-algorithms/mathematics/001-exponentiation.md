---
title: "Exponentiation"
cses: "https://cses.fi/problemset/task/1095"
difficulty: "Easy"
tags: ["implementation", "mathematics", "modular-arithmetic", "binary-exponentiation"]
---

## Problem

Compute a^b mod m for multiple queries.

## Example

**Input:** 3  
3 4 5  
2 3 10  
123 456 1000000007  
**Output:** 1  
8  
940637990  

## Solution Approach

### Method 1: Binary Exponentiation
def mod_pow(base, exp, mod):
    result = 1
    base %= mod
    while exp > 0:
        if exp % 2 == 1:
            result = (result * base) % mod
        base = (base * base) % mod
        exp //= 2
    return result

For each query (a, b, m), print mod_pow(a, b, m)

## Time Complexity

O(log b) per query.

## Space Complexity

O(1).

## Edge Cases

- **b=0**: 1 (if a != 0)
- **m=1**: 0
- **a % m == 0**: 0
- **Large b**: Log time

## Applications

- **Cryptography**: RSA, Diffie-Hellman
- **Mathematics**: Fast power
- **Modular Arithmetic**: Efficient computation

## Practice Tips

- Implement binary exponentiation
- Handle modular arithmetic
- Edge cases for b=0, m=1
- Use 64-bit integers
