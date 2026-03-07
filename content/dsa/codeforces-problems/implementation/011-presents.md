---
title: "Presents"
codeforces: "https://codeforces.com/problemset/problem/136/A"
difficulty: "Easy"
tags: ["implementation", "array", "permutation"]
---

## Problem

Find who gave present to whom.

## Example

**Input:** 3  

2 3 1  

**Output:** 3 1 2  

## Solution Approach

### Method 1: Array Mapping
n = int(input())

a = list(map(int, input().split()))

result = [0] * n

for i in range(n):

    result[a[i]-1] = i+1

print(' '.join(map(str, result)))

## Time Complexity

O(n) - Linear.

## Space Complexity

O(n).

## Edge Cases

- **Identity**: Same
- **Reverse**: Reversed
- **Cycle**: Cycle

## Applications

- **Array**: Mapping
- **Permutation**: Inverse

## Practice Tips

- Read giver array
- Map to receiver
- Output result
