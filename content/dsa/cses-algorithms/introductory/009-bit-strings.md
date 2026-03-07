---
title: "Bit Strings"
cses: "https://cses.fi/problemset/task/1617"
difficulty: "Easy"
tags: ["implementation", "math", "modular-exponentiation"]
---

## Problem

Your task is to count the number of bit strings of length n.

## Example

**Input:** 3  
**Output:** 8  

**Input:** 1  
**Output:** 2  

**Input:** 5  
**Output:** 32

## Solution Approach

### Method 1: Exponentiation
1. MOD = 10**9 + 7
2. def mod_pow(base, exp, mod):
   - result = 1
   - while exp > 0:
     - if exp % 2 == 1:
       - result = (result * base) % mod
     - base = (base * base) % mod
     - exp //= 2
   - return result
3. print(mod_pow(2, n, MOD))

## Time Complexity

O(log n) - Exponentiation.

## Space Complexity

O(1) - Constant.

## Edge Cases

- **n=0**: 1
- **n=1**: 2
- **Large n**: Mod

## Applications

- **Math**: Powers
- **Modular**: Large numbers
- **Implementation**: Fast pow

## Practice Tips

- Use binary exponentiation
- Mod 10^9+7
- Handle exp=0
