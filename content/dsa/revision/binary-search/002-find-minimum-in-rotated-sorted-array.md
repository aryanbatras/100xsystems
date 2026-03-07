---
title: "Find minimum in Rotated Sorted Array"
leetcode: "https://leetcode.com/problems/find-minimum-in-rotated-sorted-array/"
difficulty: "Medium"
tags: ["array", "binary-search"]
---

## Problem

Suppose an array of length n sorted in ascending order is rotated between 1 and n times. For example, the array nums = [0,1,2,4,5,6,7] might become [4,5,6,7,0,1,2] if it was rotated 4 times. Given the sorted rotated array nums of unique elements, return the minimum element of this array.

## Example

**Input:** nums = [3,4,5,1,2]  
**Output:** 1  

**Input:** nums = [4,5,6,7,0,1,2]  
**Output:** 0  

**Input:** nums = [11,13,15,17]  
**Output:** 11

## Solution Approach

### Method 1: Binary Search
1. left = 0, right = len(nums) - 1
2. while left < right:
   - mid = (left + right) // 2
   - if nums[mid] > nums[right]:
     - left = mid + 1
   - else:
     - right = mid
3. return nums[left]

## Time Complexity

O(log n) - Binary search.

## Space Complexity

O(1) - Constant.

## Edge Cases

- **Not rotated**: nums[0]
- **Rotated once**: nums[1]
- **All increasing**: nums[0]
- **Two elements**: min

## Applications

- **Rotated Arrays**: Find minimum
- **Binary Search**: Pivot finding
- **Arrays**: Sorted rotated
- **Interview Questions**: Medium

## Practice Tips

- Check mid vs right
- Move left or right
- Converge to minimum
- Handle unique elements
