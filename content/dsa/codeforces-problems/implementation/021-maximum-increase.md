---
title: "Maximum Increase"
codeforces: "https://codeforces.com/problemset/problem/702/A"
difficulty: "Easy"
tags: ["implementation", "array", "subarray", "increasing"]
---

## Problem

Max length of strictly increasing subarray.

## Example

**Input:** 5  

1 7 2 11 15  

**Output:** 3  

## Solution Approach

### Method 1: Linear Scan
n = int(input())

a = list(map(int, input().split()))

max_len = 1

current = 1

for i in range(1, n):

    if a[i] > a[i-1]:

        current += 1

        max_len = max(max_len, current)

    else:

        current = 1

print(max_len)

## Time Complexity

O(n) - Linear.

## Space Complexity

O(n).

## Edge Cases

- **All increasing**: n
- **All decreasing**: 1
- **Single element**: 1
- **Duplicates**: 1

## Applications

- **Array**: Subarray length
- **Increasing**: Strict

## Practice Tips

- Track current length
- Reset on decrease
- Update max
