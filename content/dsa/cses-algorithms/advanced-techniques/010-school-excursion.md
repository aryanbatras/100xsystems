---
title: "School Excursion"
cses: "https://cses.fi/problemset/task/1709"
difficulty: "Medium"
tags: ["implementation", "greedy", "sorting", "buses"]
---

## Problem

Minimum buses for school excursion.

## Example

**Input:** 5  

1 3 2 5 4  

**Output:** 3  

## Solution Approach

### Method 1: Greedy
a.sort()

count = 0

i = 0

while i < n:

    count += 1

    j = i

    while j < n and a[j] <= a[i] + 1:

        j += 1

    i = j

print(count)

## Time Complexity

O(n log n) - Sorting.

## Space Complexity

O(n).

## Edge Cases

- **All 1**: n

- **All same**: 1

- **Increasing**: 1

- **Large gap**: More buses

## Applications

- **Greedy**: Assignment

- **Sorting**: Groups

- **Optimization**: Minimum buses

## Practice Tips

- Sort groups

- Greedy assignment

- Count buses

- Handle constraints
