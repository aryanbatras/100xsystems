---
title: "Noldbach problem"
codeforces: "https://codeforces.com/problemset/problem/17/A"
difficulty: "Medium"
tags: ["prime-sieve", "math"]
---

## Problem

Check if at least k primes ≤ n can be expressed as sum of two neighboring primes plus 1.

## Example

**Input:** 27 2  
**Output:** YES  

## Solution Approach

### Method 1: Generate primes

Find neighboring prime pairs, check for each prime p if p - 1 = a + b where a, b neighboring.

## Time Complexity

O(n log log n)

## Space Complexity

O(n)

## Edge Cases

- k = 0: YES

## Applications

- Prime conjectures

## Practice Tips

- Implement sieve
