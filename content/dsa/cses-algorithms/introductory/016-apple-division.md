---
title: "Apple Division"
cses: "https://cses.fi/problemset/task/1623"
difficulty: "Easy"
tags: ["implementation", "bit-manipulation", "meet-in-the-middle"]
---

## Problem

There are n apples with known weights. Your task is to divide the apples into two groups so that the difference between the weights of the groups is minimal.

## Example

**Input:** 5  
3 2 7 4 1  
**Output:** 1  

**Input:** 3  
1 2 3  
**Output:** 0  

**Input:** 4  
1 1 1 1  
**Output:** 0

## Solution Approach

### Method 1: Meet in Middle
1. n = len(p)
2. mid = n // 2
3. left = p[:mid]
4. right = p[mid:]
5. left_sums = set()
6. for mask in range(1 << len(left)):
   - s = 0
   - for i in range(len(left)):
     - if mask & (1 << i):
       - s += left[i]
   - left_sums.add(s)
7. total = sum(p)
8. min_diff = float('inf')
9. for s in left_sums:
   - remaining = total - s
   - # Find closest in right
   - right_sums = set()
   - for mask in range(1 << len(right)):
     - t = 0
     - for i in range(len(right)):
       - if mask & (1 << i):
         - t += right[i]
     - right_sums.add(t)
   - for t in right_sums:
     - group1 = s + t
     - group2 = total - group1
     - diff = abs(group1 - group2)
     - min_diff = min(min_diff, diff)
10. print(min_diff)

## Time Complexity

O(2^{n/2}) - Meet in middle.

## Space Complexity

O(2^{n/2}) - Sets.

## Edge Cases

- **Even sum**: 0
- **n=1**: Difference
- **All equal**: 0
- **Large n**: Split

## Applications

- **Subsets**: Sum differences
- **Meet in Middle**: Optimization
- **Bit Manipulation**: Masks

## Practice Tips

- Split into halves
- Generate subset sums
- Find closest to total/2
- Minimize difference
