---
title: "Balanced Array"
codeforces: "https://codeforces.com/problemset/problem/1343/A"
difficulty: "Easy"
tags: ["implementation", "array", "sum"]
---

## Problem

Check if array can be balanced.

## Example

**Input:** 4  

1 2 3 4  

**Output:** YES  

## Solution Approach

### Method 1: Check Sums

n = int(input())

a = list(map(int, input().split()))

even_sum = sum(a[i] for i in range(0, n, 2))

odd_sum = sum(a[i] for i in range(1, n, 2))

if even_sum == odd_sum:

    print("YES")

else:

    print("NO")

## Time Complexity

O(n) - Linear.

## Space Complexity

O(n).

## Edge Cases

- **Equal sums**: YES

- **Unequal**: NO

- **Single element**: YES

- **Two elements**: If equal YES

## Applications

- **Array**: Balance

- **Sums**: Equal

## Practice Tips

- Sum even and odd indices

- Compare sums

- Output YES/NO
