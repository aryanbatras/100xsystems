---
title: "Helpful Maths"
codeforces: "https://codeforces.com/problemset/problem/339/A"
difficulty: "Easy"
tags: ["implementation", "string", "sorting", "digits"]
---

## Problem

Sort numbers in sum.

## Example

**Input:** 3+2+1  

**Output:** 1+2+3  

## Solution Approach

### Method 1: Extract and Sort
s = input()

nums = s.split('+')

nums.sort()

print('+'.join(nums))

## Time Complexity

O(n log n) - Sorting.

## Space Complexity

O(n).

## Edge Cases

- **Single number**: Same
- **Sorted**: Same
- **Reverse**: Sorted
- **Duplicates**: Same

## Applications

- **String**: Parsing
- **Sorting**: Numbers

## Practice Tips

- Split by +
- Sort list
- Join with +
