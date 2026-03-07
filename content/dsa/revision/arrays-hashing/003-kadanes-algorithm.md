---
title: "Kadane's Algorithm"
leetcode: "https://leetcode.com/problems/maximum-subarray/"
difficulty: "Medium"
tags: ["array", "divide-and-conquer", "dynamic-programming"]
---

## Problem

Given an integer array nums, find the contiguous subarray (containing at least one number) which has the largest sum and return its sum.

## Example

**Input:** nums = [-2,1,-3,4,-1,2,1,-5,4]  
**Output:** 6 (4,-1,2,1)  

**Input:** nums = [1]  
**Output:** 1  

**Input:** nums = [5,4,-1,7,8]  
**Output:** 23 (5,4,-1,7,8)

## Solution Approach

### Method 1: Kadane's Algorithm
1. max_ending_here = max_so_far = nums[0]
2. for num in nums[1:]:
   - max_ending_here = max(num, max_ending_here + num)
   - max_so_far = max(max_so_far, max_ending_here)
3. return max_so_far

### Method 2: DP
1. dp[0] = nums[0]
2. max_sum = dp[0]
3. for i in 1 to len(nums)-1:
   - dp[i] = max(nums[i], dp[i-1] + nums[i])
   - max_sum = max(max_sum, dp[i])
4. return max_sum

## Time Complexity

O(n) - Linear.

## Space Complexity

O(1) for Kadane, O(n) for DP.

## Edge Cases

- **Single element**: The element
- **All negative**: Largest negative
- **All positive**: Sum all
- **Mixed**: Max subarray

## Applications

- **Array Analysis**: Max sum subarray
- **Dynamic Programming**: Kadane
- **Optimization**: Subarray sums
- **Interview Questions**: Classic

## Practice Tips

- Handle negative numbers
- Reset when negative
- Track global max
- Test with all negative
