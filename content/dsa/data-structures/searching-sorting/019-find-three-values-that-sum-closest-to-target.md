---
title: "Find Three Values that Sum Closest to Target"
leetcode: "https://leetcode.com/problems/3sum-closest/"
difficulty: "Medium"
tags: ["array", "two-pointers"]
---

## Problem

Given an integer array nums of length n and an integer target, find three integers in nums such that the sum is closest to target. Return the sum of the three integers.

## Example

**Input:** nums = [-1,2,1,-4], target = 1  
**Output:** 2 (-1 + 2 + 1 = 2)  

**Input:** nums = [0,0,0], target = 1  
**Output:** 0  

**Input:** nums = [1,1,1,0], target = 100  
**Output:** 3

## Solution Approach

### Method 1: Brute Force
1. Initialize closest = inf
2. For each triplet i,j,k:
   - sum = nums[i] + nums[j] + nums[k]
   - If abs(sum - target) < abs(closest - target), closest = sum
3. Return closest

### Method 2: Sort + Two Pointers (Optimal)
1. Sort the array
2. Initialize closest = inf
3. For i from 0 to n-3:
   - left = i+1, right = n-1
   - While left < right:
     - sum = nums[i] + nums[left] + nums[right]
     - If abs(sum - target) < abs(closest - target), closest = sum
     - If sum == target, return sum
     - Else if sum < target, left++
     - Else right--
4. Return closest

## Time Complexity

O(n^2) - Two nested loops.

## Space Complexity

O(1) - Excluding sorting space.

## Edge Cases

- **n < 3**: Undefined, assume n >= 3
- **Exact match**: Return target
- **All elements same**: Sum of first three
- **Target very large/small**: Closest possible sum

## Applications

- **Closest Sum Problems**: Find closest combination
- **Optimization**: Minimize difference
- **Data Analysis**: Approximate matching
- **Algorithm Variants**: Extension of 3Sum

## Practice Tips

- Sort the array first
- Track the closest sum
- Handle exact matches early
- Practice with different targets
