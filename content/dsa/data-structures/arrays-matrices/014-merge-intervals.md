---
title: "Merge Intervals"
leetcode: "https://leetcode.com/problems/merge-intervals/"
difficulty: "Medium"
tags: ["array", "sorting"]
---

## Problem

Given an array of intervals where intervals[i] = [starti, endi], merge all overlapping intervals, and return an array of the non-overlapping intervals that cover all the intervals in the input.

## Example

**Input:** intervals = [[1,3],[2,6],[8,10],[15,18]]  
**Output:** [[1,6],[8,10],[15,18]]  
**Explanation:** Since intervals [1,3] and [2,6] overlap, merge them into [1,6].

**Input:** intervals = [[1,4],[4,5]]  
**Output:** [[1,5]]  
**Explanation:** Intervals [1,4] and [4,5] are considered overlapping.

**Input:** intervals = [[1,4],[0,4]]  
**Output:** [[0,4]]

## Solution Approach

### Method 1: Sort and Merge
1. Sort the intervals by start time
2. Initialize result list
3. For each interval in sorted list:
   - If result is empty or current.start > result.last.end, add current
   - Else, result.last.end = max(result.last.end, current.end)

## Time Complexity

O(n log n) - Due to sorting.

## Space Complexity

O(n) - For result and sorting.

## Edge Cases

- **No intervals**: Empty result
- **Single interval**: Same interval
- **All overlapping**: Single merged interval
- **No overlapping**: Same as input

## Applications

- **Calendar Scheduling**: Merge busy times
- **Resource Allocation**: Combine overlapping ranges
- **Data Compression**: Merge intervals
- **Interval Problems**: Common in coding interviews

## Practice Tips

- Always sort first
- Understand overlap condition
- Handle edge cases
- Consider intervals with equal start/end
