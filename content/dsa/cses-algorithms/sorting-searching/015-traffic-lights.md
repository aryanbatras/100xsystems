---
title: "Traffic Lights"
cses: "https://cses.fi/problemset/task/1163"
difficulty: "Easy"
tags: ["implementation", "sorting", "data-structure"]
---

## Problem

There is a road of length x. You are given n positions where traffic lights will be built. Your task is to find the maximum distance between two consecutive traffic lights after each addition.

## Example

**Input:** 8 3  
3 6 2  
**Output:** 5  
3  
3  

**Input:** 10 2  
4 7  
**Output:** 4  
4  

**Input:** 5 1  
2  
**Output:** 3

## Solution Approach

### Method 1: Sets and Gaps
1. from sortedcontainers import SortedSet
2. positions = SortedSet([0, x])
3. gaps = SortedSet([x])
4. for p in positions:
   - # Find the gap that contains p
   - left = positions.bisect_left(p) - 1
   - right = positions.bisect_right(p)
   - old_gap = positions[right] - positions[left]
   - gaps.remove(old_gap)
   - new_gap1 = p - positions[left]
   - new_gap2 = positions[right] - p
   - gaps.add(new_gap1)
   - gaps.add(new_gap2)
   - positions.add(p)
   - print(gaps[-1])

## Time Complexity

O(n log n) - Set operations.

## Space Complexity

O(n) - Sets.

## Edge Cases

- **First light**: x
- **Middle**: Split gap
- **Ends**: Smaller
- **All added**: Min gaps

## Applications

- **Intervals**: Gaps
- **Sorted Sets**: Positions
- **Max Gap**: Tracking

## Practice Tips

- Maintain sorted positions
- Track gap sizes
- Update on addition
- Max gap
