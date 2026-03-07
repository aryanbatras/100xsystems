---
title: "Find an Element in an Infinite Size Sorted Array"
geeksforgeeks: "https://www.geeksforgeeks.org/find-position-element-sorted-array-infinite-numbers/"
difficulty: "Medium"
tags: ["array", "binary-search"]
---

## Problem

Given an infinite sorted array (or an array that appears infinite), find the index of a target element. Since the array is conceptually infinite, you cannot use the length of the array.

## Example

**Input:** arr = [1,2,3,4,5,6,7,8,9,...], target = 5  
**Output:** 4  

**Input:** arr = [1,2,3,4,5,6,7,8,9,...], target = 10  
**Output:** -1 (if not found)  

**Input:** arr = [1,2,3,4,5,6,7,8,9,...], target = 1  
**Output:** 0

## Solution Approach

### Method 1: Exponential Search + Binary Search
1. Initialize low = 0, high = 1
2. While arr[high] < target:
   - low = high
   - high = high * 2
3. Now, target is between low and high
4. Perform binary search between low and high to find target
5. Return the index if found, else -1

## Time Complexity

O(log n) - Exponential search finds range, binary search finds element.

## Space Complexity

O(1) - Constant space.

## Edge Cases

- **Target at index 0**: Return 0
- **Target not in array**: Return -1
- **Target larger than all accessible elements**: Return -1
- **Single element array**: Check if matches

## Applications

- **Unbounded Search**: Search in infinite or very large arrays
- **External Data**: When data size is unknown
- **Online Algorithms**: Streaming data search
- **Optimization**: Efficient search in unbounded spaces

## Practice Tips

- Implement exponential search carefully
- Handle potential index out of bounds
- Combine with binary search
- Practice with different target positions
