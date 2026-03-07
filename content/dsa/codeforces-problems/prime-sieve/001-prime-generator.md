---
title: "Prime Generator"
codeforces: "https://codeforces.com/problemset/gymProblem/102267/B"
difficulty: "Easy"
tags: ["prime-sieve", "math", "number theory"]
---

## Problem

For a given prime number n, find any two prime numbers a and b such that a + b = n, or state that no such pair exists.

## Example

**Input:** 5  

**Output:** 2 3  

**Input:** 7  

**Output:** 2 5  

## Solution Approach

### Method 1: Check Goldbach for odd primes

Since n is prime and odd (except 2, but n > 2), check if n-2 is prime, then a=2, b=n-2.

If not, try other small primes.

But for simplicity, since n small, a=2, b=n-2 if both prime.

## Time Complexity

O(sqrt(n)) for primality check

## Space Complexity

O(1)

## Edge Cases

- Small n like 5, 7

- Larger n where n-2 not prime

## Applications

- Goldbach conjecture

## Practice Tips

- Implement primality test

- Handle input correctly
