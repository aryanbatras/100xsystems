---
title: "Finding Periods"
cses: "https://cses.fi/problemset/task/1733"
difficulty: "Easy"
tags: ["implementation", "string", "kmp", "periods"]
---

## Problem

Find minimal period of string.

## Example

**Input:** abcabc  

**Output:** 3  

## Solution Approach

### Method 1: KMP
pi = compute_prefix(s)

n = len(s)

period = n - pi[-1]

if n % period == 0:

    print(period)

else:

    print(n)

## Time Complexity

O(n) - KMP.

## Space Complexity

O(n).

## Edge Cases

- **No period**: n

- **Full period**: period

- **Prime length**: n

- **Repeated**: period

## Applications

- **Strings**: Periods

- **KMP**: Border

- **Algorithms**: String properties

## Practice Tips

- Compute pi

- Period = n - pi[n-1]

- Check divisibility

- Handle cases
