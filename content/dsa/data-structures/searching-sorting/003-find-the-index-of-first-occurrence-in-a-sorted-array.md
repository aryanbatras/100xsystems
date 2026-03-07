---
title: "Find the Index of First Occurrence in a Sorted Array"
leetcode: "https://leetcode.com/problems/find-first-and-last-position-of-element-in-sorted-array/"
difficulty: "Medium"
tags: ["array", "binary-search"]
---

## Problem

Given an array of integers nums sorted in non-decreasing order, find the starting position of a given target value. If target is not found in the array, return -1.

## Example

**Input:** nums = [5,7,7,8,8,10], target = 8  
**Output:** 3  

**Input:** nums = [5,7,7,8,8,10], target = 6  
**Output:** -1  

**Input:** nums = [1,2,2,2,3], target = 2  
**Output:** 1

## Solution Approach

### Method 1: Linear Search
1. Iterate through the array from index 0
2. Return the first index where nums[i] == target
3. If not found, return -1

### Method 2: Binary Search (Optimal)
1. Initialize low = 0, high = len(nums) - 1
2. While low <= high:
   - mid = low + (high - low) // 2
   - If nums[mid] >= target, high = mid - 1
   - Else, low = mid + 1
3. If low < len(nums) and nums[low] == target, return low
4. Return -1

## Time Complexity

O(n) for linear, O(log n) for binary search.

## Space Complexity

O(1) - Constant space.

## Edge Cases

- **Target not in array**: Return -1
- **Target appears once**: Return that index
- **Target appears multiple times**: Return first index
- **Empty array**: Return -1
- **Single element matches**: Return 0

## Applications

- **Search Algorithms**: Find first occurrence
- **Data Processing**: Locate starting points
- **Range Queries**: Binary search variants
- **Sorted Array Operations**: Efficient lookups

## Practice Tips

- Understand the binary search modification
- Handle the post-loop check
- Practice with duplicates
- Compare with finding last occurrence
