---
title: "Ferris Wheel"
cses: "https://cses.fi/problemset/task/1090"
difficulty: "Easy"
tags: ["implementation", "sorting", "two-pointers"]
---

## Problem

There are n children who want to go on a Ferris wheel, and your task is to find a gondola for each child. Each gondola may have one or two children in it, and the total weight in a gondola may not exceed x. You know the weight of every child.

## Example

**Input:** 4 10  
7 2 3 9  
**Output:** 3  

**Input:** 3 6  
1 2 3  
**Output:** 2  

**Input:** 1 10  
5  
**Output:** 1

## Solution Approach

### Method 1: Sort and Two Pointers
1. p.sort()
2. left = 0
3. right = len(p) - 1
4. count = 0
5. while left <= right:
   - if left == right:
     - count += 1
     - break
   - if p[left] + p[right] <= x:
     - left += 1
   - right -= 1
   - count += 1
6. print(count)

## Time Complexity

O(n log n) - Sorting.

## Space Complexity

O(1) - In-place.

## Edge Cases

- **All single**: n
- **Pairs possible**: Fewer
- **One child**: 1
- **Weights > x**: Impossible, but assume possible

## Applications

- **Greedy**: Pairing
- **Two Pointers**: Ends
- **Sorting**: Weights

## Practice Tips

- Sort weights
- Pair lightest with heaviest
- If fit, pair; else heaviest alone
- Count gondolas
