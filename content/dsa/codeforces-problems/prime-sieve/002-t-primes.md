---
title: "T-primes"
codeforces: "https://codeforces.com/problemset/problem/230/B"
difficulty: "Easy"
tags: ["prime-sieve", "math"]
---

## Problem

Determine if each number has exactly three divisors.

## Example

**Input:** 3  
4 5 6  
**Output:** YES  
NO  
NO  

## Solution Approach

### Method 1: Check divisors

For each x, if x is square of prime, it has 3 divisors.

Check if sqrt(x) is integer and prime.

## Time Complexity

O(n * sqrt(max_x))

## Space Complexity

O(1)

## Edge Cases

- x = 1: NO

- x = 4: YES

## Applications

- Prime checking

## Practice Tips

- Precompute primes
