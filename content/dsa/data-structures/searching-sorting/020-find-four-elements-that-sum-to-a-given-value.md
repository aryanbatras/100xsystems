---
title: "Find Four Elements that Sum to a Given Value"
leetcode: "https://leetcode.com/problems/4sum/"
difficulty: "Medium"
tags: ["array", "two-pointers"]
---

## Problem

Given an array nums of n integers, return an array of all the unique quadruplets [nums[a], nums[b], nums[c], nums[d]] such that 0 <= a, b, c, d < n and a, b, c, d are distinct and nums[a] + nums[b] + nums[c] + nums[d] == target.

## Example

**Input:** nums = [1,0,-1,0,-2,2], target = 0  
**Output:** [[-2,-1,1,2],[-2,0,0,2],[-1,0,0,1]]  

**Input:** nums = [2,2,2,2,2], target = 8  
**Output:** [[2,2,2,2]]  

**Input:** nums = [1,2,3,4], target = 10  
**Output:** []

## Solution Approach

### Method 1: Brute Force
1. Generate all possible quadruplets
2. Check if their sum equals target
3. Add to result if valid and unique

### Method 2: Sort + Two Pointers (Optimal)
1. Sort the array
2. For i from 0 to n-4:
   - If i > 0 and nums[i] == nums[i-1], continue
   - For j from i+1 to n-3:
     - If j > i+1 and nums[j] == nums[j-1], continue
     - left = j+1, right = n-1
     - While left < right:
       - sum = nums[i] + nums[j] + nums[left] + nums[right]
       - If sum == target:
         - Add [nums[i], nums[j], nums[left], nums[right]] to result
         - While left < right and nums[left] == nums[left+1], left++
         - While left < right and nums[right] == nums[right-1], right--
         - left++, right--
       - Else if sum < target, left++
       - Else right--

## Time Complexity

O(n^3) - Three nested loops.

## Space Complexity

O(1) - Excluding output space.

## Edge Cases

- **No quadruplets**: Empty result
- **Duplicates**: Handle to avoid duplicate quadruplets
- **All same elements**: Correct if sum matches
- **Target not achievable**: Empty result

## Applications

- **Combination Problems**: Find combinations summing to target
- **Data Analysis**: Identify sum combinations
- **Algorithm Interviews**: Common extension of 3Sum
- **Optimization**: Closest sum variants

## Practice Tips

- Sort the array first
- Use nested loops with two pointers
- Skip duplicates carefully
- Handle large inputs efficiently
