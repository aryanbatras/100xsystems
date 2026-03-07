---
title: "Find peak element"
leetcode: "https://leetcode.com/problems/find-peak-element/"
difficulty: "Medium"
tags: ["array", "binary-search"]
---

## Problem

A peak element is an element that is strictly greater than its neighbors. Given a 0-indexed integer array nums, find a peak element, and return its index. If the array contains multiple peaks, return the index to any of the peaks.

## Example

**Input:** nums = [1,2,3,1]  
**Output:** 2  

**Input:** nums = [1,2,1,3,5,6,4]  
**Output:** 5  

**Input:** nums = [1]  
**Output:** 0

## Solution Approach

### Method 1: Binary Search
1. left = 0, right = len(nums) - 1
2. while left < right:
   - mid = (left + right) // 2
   - if nums[mid] > nums[mid + 1]:
     - right = mid
   - else:
     - left = mid + 1
3. return left

## Time Complexity

O(log n) - Binary search.

## Space Complexity

O(1) - Constant.

## Edge Cases

- **Single element**: 0
- **Increasing**: Last index
- **Decreasing**: First index
- **Plateau**: Any peak

## Applications

- **Array Analysis**: Peak finding
- **Binary Search**: Iterative
- **Optimization Problems**: Local maxima
- **Interview Questions**: Medium

## Practice Tips

- Assume edges are -inf
- Move towards larger side
- Converge to peak
- Handle multiple peaks
