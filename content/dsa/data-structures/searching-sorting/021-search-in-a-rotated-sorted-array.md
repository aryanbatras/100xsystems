---
title: "Search in a Rotated Sorted Array"
leetcode: "https://leetcode.com/problems/search-in-rotated-sorted-array/"
difficulty: "Medium"
tags: ["array", "binary-search"]
---

## Problem

There is an integer array nums sorted in ascending order (with distinct values). Prior to being passed to your function, nums is possibly rotated at an unknown pivot index k (1 <= k < nums.length) such that the resulting array is [nums[k], nums[k+1], ..., nums[n-1], nums[0], nums[1], ..., nums[k-1]] (0-indexed). For example, [0,1,2,4,5,6,7] might be rotated at pivot index 3 and become [4,5,6,7,0,1,2].

Given the array nums after the possible rotation and an integer target, return the index of target if it is in nums, or -1 if it is not in nums.

You must write an algorithm with O(log n) runtime complexity.

## Example

**Input:** nums = [4,5,6,7,0,1,2], target = 0  
**Output:** 4  

**Input:** nums = [4,5,6,7,0,1,2], target = 3  
**Output:** -1  

**Input:** nums = [1], target = 0  
**Output:** -1

## Solution Approach

### Method 1: Linear Search
1. Iterate through the array
2. Return the index if nums[i] == target
3. Return -1 if not found

### Method 2: Binary Search (Optimal)
1. Initialize low = 0, high = n-1
2. While low <= high:
   - mid = (low + high) // 2
   - If nums[mid] == target, return mid
   - If nums[low] <= nums[mid], left half is sorted
     - If target >= nums[low] and target < nums[mid], search left: high = mid - 1
     - Else search right: low = mid + 1
   - Else, right half is sorted
     - If target > nums[mid] and target <= nums[high], search right: low = mid + 1
     - Else search left: high = mid - 1
3. Return -1

## Time Complexity

O(log n) - Modified binary search.

## Space Complexity

O(1) - Constant space.

## Edge Cases

- **Not rotated**: Standard binary search
- **Rotated at beginning**: Normal array
- **Target not in array**: -1
- **Single element**: Check if matches

## Applications

- **Rotated Arrays**: Search in pivoted arrays
- **Circular Data**: Handling cyclic data
- **Algorithm Interviews**: Common problem
- **Data Structures**: Rotated sorted arrays

## Practice Tips

- Determine which half is sorted
- Adjust search bounds accordingly
- Handle boundary conditions
- Practice with different rotations
