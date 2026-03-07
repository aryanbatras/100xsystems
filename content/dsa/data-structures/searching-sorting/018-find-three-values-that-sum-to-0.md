---
title: "Find Three Values that Sum to 0"
leetcode: "https://leetcode.com/problems/3sum/"
difficulty: "Medium"
tags: ["array", "two-pointers"]
---

## Problem

Given an integer array nums, return all the triplets [nums[i], nums[j], nums[k]] such that i != j, i != k, and j != k, and nums[i] + nums[j] + nums[k] == 0.

## Example

**Input:** nums = [-1,0,1,2,-1,-4]  
**Output:** [[-1,-1,2],[-1,0,1]]  

**Input:** nums = []  
**Output:** []  

**Input:** nums = [0]  
**Output:** []

## Solution Approach

### Method 1: Brute Force
1. Generate all possible triplets
2. Check if their sum is 0
3. Add to result if valid

### Method 2: Sort + Two Pointers (Optimal)
1. Sort the array
2. For i from 0 to n-3:
   - If i > 0 and nums[i] == nums[i-1], continue (skip duplicates)
   - Set left = i+1, right = n-1
   - While left < right:
     - sum = nums[i] + nums[left] + nums[right]
     - If sum == 0:
       - Add [nums[i], nums[left], nums[right]] to result
       - While left < right and nums[left] == nums[left+1], left++
       - While left < right and nums[right] == nums[right-1], right--
       - left++, right--
     - Else if sum < 0, left++
     - Else right--

## Time Complexity

O(n^2) - Two nested loops.

## Space Complexity

O(1) - Excluding output space.

## Edge Cases

- **No triplets sum to 0**: Empty result
- **All zeros**: [[0,0,0]]
- **Duplicates**: Handle to avoid duplicate triplets
- **Empty array**: Empty result

## Applications

- **Combination Problems**: Find combinations summing to target
- **Data Analysis**: Identify zero-sum triplets
- **Algorithm Interviews**: Common problem
- **Optimization**: Closest sum variants

## Practice Tips

- Sort the array first
- Use two pointers efficiently
- Skip duplicates carefully
- Handle edge cases
