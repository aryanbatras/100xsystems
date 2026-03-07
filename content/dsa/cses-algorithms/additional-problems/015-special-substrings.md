---
title: "Special Substrings"
cses: "https://cses.fi/problemset/task/2080"
difficulty: "Medium"
tags: ["implementation", "string", "kmp", "z-algorithm", "substrings"]
---

## Problem

Count special substrings.

## Example

**Input:** abcabc  

**Output:** 6  

## Solution Approach

### Method 1: Z-algorithm
def z_algorithm(s):
    n = len(s)
    z = [0] * n
    l, r = 0, 0
    for i in range(1, n):
        if i < r:
            z[i] = min(r - i, z[i - l])
        while i + z[i] < n and s[z[i]] == s[i + z[i]]:
            z[i] += 1
        if i + z[i] > r:
            l, r = i, i + z[i]
    return z

z = z_algorithm(s)
count = 0
for i in range(1, len(z)):
    if z[i] == len(s) - i:
        count += 1
print(count)

## Time Complexity

O(n) - Z-algorithm.

## Space Complexity

O(n).

## Edge Cases

- **All same**: All substrings
- **No special**: 0
- **Whole string**: 1
- **Overlaps**: Count all

## Applications

- **Strings**: Substring counts
- **Z-algorithm**: Linear time
- **Patterns**: Special properties

## Practice Tips

- Z-algorithm
- Compute Z-array
- Count special
- Handle indices
