---
title: "Nested Ranges Check"
cses: "https://cses.fi/problemset/task/2168"
difficulty: "Easy"
tags: ["implementation", "sorting", "ranges"]
---

## Problem

You are given n ranges, and for each range, determine if there is a range that contains it and if it contains a range.

## Example

**Input:** 4  
1 6  
2 4  
4 8  
3 6  
**Output:** 0 1 0 1  
1 0 1 0  

**Input:** 3  
1 3  
2 4  
3 5  
**Output:** 1 1 0  
0 0 1  

**Input:** 1  
1 2  
**Output:** 0  
0

## Solution Approach

### Method 1: Sort and Check
1. ranges = [(l, r, i) for i, (l, r) in enumerate(ranges)]
2. # For contains
3. contains = [0] * n
4. ranges.sort(key=lambda x: (x[0], -x[1]))
5. max_end = 0
6. for l, r, i in ranges:
   - if r <= max_end:
     - contains[i] = 1
   - max_end = max(max_end, r)
7. # For contained
8. contained = [0] * n
9. ranges.sort(key=lambda x: (-x[0], x[1]))
10. min_end = float('inf')
11. for l, r, i in ranges:
   - if r >= min_end:
     - contained[i] = 1
   - min_end = min(min_end, r)
12. for c in contains:
   - print(c, end=' ')
13. print()
14. for c in contained:
   - print(c, end=' ')

## Time Complexity

O(n log n) - Sorting.

## Space Complexity

O(n) - Ranges list.

## Edge Cases

- **No nesting**: 0 0
- **All nested**: 1 1
- **Single**: 0 0
- **Overlapping**: Check

## Applications

- **Ranges**: Containment
- **Sorting**: Order
- **Checks**: Contains/contained

## Practice Tips

- Sort for contains
- Sort for contained
- Track max/min end
- Output for each
