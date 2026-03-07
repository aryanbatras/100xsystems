---
title: "Number with given number of divisors"
codeforces: "https://codeforces.com/problemset/problem/27/E"
difficulty: "Medium"
tags: ["math", "number theory"]
---

## Problem

Find the smallest number with exactly n divisors.

## Example

**Input:** 4  
**Output:** 6  

## Solution Approach

### Method 1: Factorize n

Write n as product of exponents +1, assign to smallest primes.

## Time Complexity

O(sqrt(n))

## Space Complexity

O(number of factors)

## Edge Cases

- n = 1: 1

## Applications

- Number theory

## Practice Tips

- Use greedy exponents
