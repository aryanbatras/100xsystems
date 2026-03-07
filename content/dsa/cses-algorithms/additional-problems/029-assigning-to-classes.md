---
title: "Assigning to Classes"
codeforces: "https://codeforces.com/problemset/problem/1300/A"
difficulty: "Easy"
tags: ["implementation", "array", "sorting", "assignment"]
---

## Problem

Assign students to classes.

## Example

**Input:** 3  

1 2 3  

**Output:** 1  

## Solution Approach

### Method 1: Sort and Assign

n = int(input())

a = sorted(map(int, input().split()))

count = 0

i = 0

while i < n:

    # Find group

    j = i

    while j < n and a[j] <= a[i] + 1:

        j += 1

    count += 1

    i = j

print(count)

## Time Complexity

O(n log n) - Sorting.

## Space Complexity

O(n).

## Edge Cases

- **All same**: 1

- **Increasing**: n

- **Close**: Few groups

- **Spread**: Many groups

## Applications

- **Array**: Grouping

- **Sorting**: Assignment

## Practice Tips

- Sort scores

- Group close ones

- Count groups

- Handle ranges
