---
title: "List of Sums"
cses: "https://cses.fi/problemset/task/2414"
difficulty: "Easy"
tags: ["implementation", "array", "prefix-sum", "sums"]
---

## Problem

Compute sums of sublists.

## Example

**Input:** 3  
1 2 3  
**Output:** 6 5 3  

## Solution Approach

### Method 1: Prefix Sums
prefix = [0] * (n+1)
for i in range(1, n+1):
    prefix[i] = prefix[i-1] + a[i-1]
for i in range(1, n+1):
    sum_val = prefix[n] - prefix[i-1]
    print(sum_val, end=' ')

## Time Complexity

O(n) - Prefix.

## Space Complexity

O(n).

## Edge Cases

- **Single element**: Itself
- **All same**: n * value
- **Increasing**: Sum from i to n
- **Empty**: N/A

## Applications

- **Arrays**: Sublist sums
- **Prefix Sum**: Efficient sums
- **Queries**: Range sums

## Practice Tips

- Prefix sum array
- Sum from i to n
- Handle indices
- Output sums
