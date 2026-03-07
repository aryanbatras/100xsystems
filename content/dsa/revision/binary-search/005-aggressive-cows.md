---
title: "Aggressive Cows"
difficulty: "Medium"
tags: ["array", "binary-search", "sorting"]
---

## Problem

You are given an array of integers representing positions of stalls. You have to place k cows in these stalls such that the minimum distance between any two cows is maximized.

## Example

**Input:** positions = [1,2,8,4,9], k = 3  
**Output:** 3 (positions 1,4,8 or 1,4,9)  

**Input:** positions = [1,2,4,8,9], k = 2  
**Output:** 8 (positions 1,9)  

**Input:** positions = [1,2,3], k = 2  
**Output:** 2

## Solution Approach

### Method 1: Binary Search
1. positions.sort()
2. left = 1, right = positions[-1] - positions[0]
3. while left < right:
   - mid = (left + right + 1) // 2
   - if can_place(positions, k, mid):
     - left = mid
   - else:
     - right = mid - 1
4. return left

5. def can_place(pos, k, dist):
   - count = 1
   - last = pos[0]
   - for p in pos[1:]:
     - if p - last >= dist:
       - count += 1
       - last = p
       - if count >= k:
         - return True
   - return False

## Time Complexity

O(n log max_pos) - Binary search on distance.

## Space Complexity

O(1) - Constant.

## Edge Cases

- **k = 1**: Max position
- **k = n**: Min difference
- **All same**: 0
- **Two positions**: Difference

## Applications

- **Placement Problems**: Maximize min distance
- **Binary Search**: On answer
- **Arrays**: Sorted positions
- **Interview Questions**: Common

## Practice Tips

- Sort positions
- Binary search on distance
- Check if can place k cows
- Maximize min distance
