---
title: "Balanced Rating Changes"
codeforces: "https://codeforces.com/problemset/problem/1237/A"
difficulty: "Easy"
tags: ["implementation", "array", "greedy"]
---

## Problem

Make ratings non-decreasing with min changes.

## Example

**Input:** 5  

1 2 3 4 5  

**Output:** 0  

1 2 3 4 5  

## Solution Approach

### Method 1: Adjust Values

n = int(input())

a = list(map(int, input().split()))

changes = 0

for i in range(1, n):

    if a[i] <= a[i-1]:

        diff = a[i-1] - a[i] + 1

        a[i] += diff

        changes += diff

print(changes)

print(' '.join(map(str, a)))

## Time Complexity

O(n) - Linear.

## Space Complexity

O(n).

## Edge Cases

- **Non-decreasing**: 0

- **Decreasing**: Many changes

- **Equal**: 0

## Applications

- **Array**: Adjustments

- **Greedy**: Min changes

## Practice Tips

- Check order

- Adjust values

- Count changes
