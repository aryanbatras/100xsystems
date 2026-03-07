---
title: "Sum of Two Values"
cses: "https://cses.fi/problemset/task/1640"
difficulty: "Easy"
tags: ["implementation", "sorting", "two-pointers"]
---

## Problem

You are given an array of n numbers and a target sum x. Find two array values such that their sum is x, or report that no such values exist.

## Example

**Input:** 4 8  
2 7 5 1  
**Output:** 1 4  

**Input:** 5 6  
1 2 3 4 5  
**Output:** 1 5  

**Input:** 2 5  
1 2  
**Output:** IMPOSSIBLE

## Solution Approach

### Method 1: Sort and Two Pointers
1. a = [(val, i+1) for i, val in enumerate(a)]
2. a.sort()
3. left = 0
4. right = len(a) - 1
5. while left < right:
   - s = a[left][0] + a[right][0]
   - if s == x:
     - print(min(a[left][1], a[right][1]), max(a[left][1], a[right][1]))
     - return
   - elif s < x:
     - left += 1
   - else:
     - right -= 1
6. print("IMPOSSIBLE")

## Time Complexity

O(n log n) - Sorting.

## Space Complexity

O(n) - Pairs.

## Edge Cases

- **No pair**: IMPOSSIBLE
- **Same indices**: Different
- **Duplicates**: Ok
- **x = 2*num**: If two nums

## Applications

- **Two Sum**: Sorted array
- **Two Pointers**: Converge
- **Sorting**: Prerequisites

## Practice Tips

- Sort with indices
- Two pointers
- Check sum
- Output indices
