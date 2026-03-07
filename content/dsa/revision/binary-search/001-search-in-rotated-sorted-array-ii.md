---
title: "Search in Rotated Sorted Array II"
leetcode: "https://leetcode.com/problems/search-in-rotated-sorted-array-ii/"
difficulty: "Medium"
tags: ["array", "binary-search"]
---

## Problem

There is an integer array nums sorted in non-decreasing order (not necessarily with distinct values). Before being passed to your function, nums is rotated at an unknown pivot index k (0 <= k < nums.length) such that the resulting array is [nums[k], nums[k+1], ..., nums[n-1], nums[0], nums[1], ..., nums[k-1]] (0-indexed). Given the array nums after the rotation and an integer target, return true if target is in nums, or false if it is not in nums.

## Example

**Input:** nums = [2,5,6,0,0,1,2], target = 0  
**Output:** true  

**Input:** nums = [2,5,6,0,0,1,2], target = 3  
**Output:** false  

**Input:** nums = [1,0,1,1,1], target = 0  
**Output:** true

## Solution Approach

### Method 1: Binary Search
1. left = 0, right = len(nums) - 1
2. while left <= right:
   - mid = (left + right) // 2
   - if nums[mid] == target:
     - return true
   - if nums[left] == nums[mid] == nums[right]:
     - left += 1
     - right -= 1
   - elif nums[left] <= nums[mid]:
     - if nums[left] <= target < nums[mid]:
       - right = mid - 1
     - else:
       - left = mid + 1
   - else:
     - if nums[mid] < target <= nums[right]:
       - left = mid + 1
     - else:
       - right = mid - 1
3. return false

## Time Complexity

O(log n) average, O(n) worst - Duplicates.

## Space Complexity

O(1) - Constant.

## Edge Cases

- **Duplicates**: Handle equal values
- **Not rotated**: Standard binary search
- **Target not present**: false
- **All duplicates**: Linear search

## Applications

- **Rotated Arrays**: Search with duplicates
- **Binary Search**: Modified
- **Arrays**: Non-decreasing
- **Interview Questions**: Medium

## Practice Tips

- Handle duplicates at ends
- Shrink range when equal
- Determine sorted half
- Adjust pointers
