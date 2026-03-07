---
title: "Find the Index of Last Occurrence in a Sorted Array"
leetcode: "https://leetcode.com/problems/find-first-and-last-position-of-element-in-sorted-array/"
difficulty: "Medium"
tags: ["array", "binary-search"]
---

## Problem

Given an array of integers nums sorted in non-decreasing order, find the ending position of a given target value. If target is not found in the array, return -1.

## Example

**Input:** nums = [5,7,7,8,8,10], target = 8  
**Output:** 4  

**Input:** nums = [5,7,7,8,8,10], target = 6  
**Output:** -1  

**Input:** nums = [1,2,2,2,3], target = 2  
**Output:** 3

## Solution Approach

### Method 1: Linear Search
1. Iterate through the array from the end
2. Return the last index where nums[i] == target
3. If not found, return -1

### Method 2: Binary Search (Optimal)
1. Initialize low = 0, high = len(nums) - 1
2. While low <= high:
   - mid = low + (high - low) // 2
   - If nums[mid] <= target, low = mid + 1
   - Else, high = mid - 1
3. If high >= 0 and nums[high] == target, return high
4. Return -1

## Time Complexity

O(n) for linear, O(log n) for binary search.

## Space Complexity

O(1) - Constant space.

## Edge Cases

- **Target not in array**: Return -1
- **Target appears once**: Return that index
- **Target appears multiple times**: Return last index
- **Empty array**: Return -1
- **Single element matches**: Return 0

## Applications

- **Search Algorithms**: Find last occurrence
- **Data Processing**: Locate ending points
- **Range Queries**: Binary search variants
- **Sorted Array Operations**: Efficient lookups

## Practice Tips

- Understand the binary search modification
- Handle the post-loop check
- Practice with duplicates
- Compare with finding first occurrence
