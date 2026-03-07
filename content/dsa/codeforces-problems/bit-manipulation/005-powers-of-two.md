---
title: "Powers Of Two"
codeforces: "https://codeforces.com/problemset/problem/1095/B"
difficulty: "Easy"
tags: ["bit-manipulation", "math"]
---

## Problem

Find the maximum product of two distinct powers of two that sum to n.

## Example

**Input:** 10  
**Output:** 24  

## Solution Approach

### Method 1: Find largest power less than n

Let p = 2^floor(log2(n-1)), then p * (n - p)

## Time Complexity

O(log n)

## Space Complexity

O(1)

## Edge Cases

- n = 3: 2*1=2

## Applications

- Powers of two

## Practice Tips

- Use bit operations
