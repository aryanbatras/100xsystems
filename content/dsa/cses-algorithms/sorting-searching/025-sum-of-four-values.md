---
title: "Sum of Four Values"
cses: "https://cses.fi/problemset/task/1642"
difficulty: "Easy"
tags: ["implementation", "sorting", "two-pointers"]
---

## Problem

Given an array and a target sum x, find four distinct elements that sum to x.

## Example

**Input:** 5 10  
1 2 3 4 5  
**Output:** 1 2 3 4  

**Input:** 4 8  
2 7 5 1  
**Output:** 1 2 3 4  

**Input:** 3 10  
1 2 3  
**Output:** IMPOSSIBLE

## Solution Approach

### Method 1: Sort and Two Pointers
1. a = [(val, i+1) for i, val in enumerate(a)]
2. a.sort()
3. for i in range(len(a) - 3):
   - for j in range(i + 1, len(a) - 2):
     - left = j + 1
     - right = len(a) - 1
     - while left < right:
       - s = a[i][0] + a[j][0] + a[left][0] + a[right][0]
       - if s == x:
         - indices = sorted([a[i][1], a[j][1], a[left][1], a[right][1]])
         - print(' '.join(map(str, indices)))
         - return
       - elif s < x:
         - left += 1
       - else:
         - right -= 1
4. print("IMPOSSIBLE")

## Time Complexity

O(n^3) - Triple nested.

## Space Complexity

O(n) - Pairs.

## Edge Cases

- **No quadruplet**: IMPOSSIBLE
- **Multiple**: Any
- **Duplicates**: Distinct
- **x = sum**: Indices

## Applications

- **Arrays**: Four sum
- **Sorting**: Prerequisites
- **Two Pointers**: Converge

## Practice Tips

- Sort with indices
- Fix two, two pointers
- Check sum
- Output sorted indices
