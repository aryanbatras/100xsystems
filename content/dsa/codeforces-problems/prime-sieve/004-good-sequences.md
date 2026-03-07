---
title: "Good Sequences"
codeforces: "https://codeforces.com/problemset/problem/264/B"
difficulty: "Medium"
tags: ["math", "dp", "number theory"]
---

## Problem

Find the length of the longest good sequence from given good integers, where good sequence is strictly increasing and no adjacent coprime.

## Example

**Input:** 5  
2 3 4 6 9  
**Output:** 4  

## Solution Approach

### Method 1: DP

dp[i] = max length ending at a[i]

For each j < i, if a[i] > a[j] and gcd(a[i], a[j]) > 1, update dp[i]

## Time Complexity

O(n^2 log max_a)

## Space Complexity

O(n)

## Edge Cases

- All coprime

## Applications

- Sequence DP

## Practice Tips

- Use fast gcd
