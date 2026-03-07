---
title: "Smallest Sum Continuous Subarray"
difficulty: "Easy"
tags: ["dynamic-programming", "array"]
---

## Problem

Given an array of integers, find the contiguous subarray with the smallest sum.

## Example

**Input:** nums = [3,-4,2,-3,-1,7,-5]  
**Output:** -6 (-4+2-3-1 = -6)  

**Input:** nums = [1]  
**Output:** 1  

**Input:** nums = [-1,-2,-3,-4]  
**Output:** -10 (-1-2-3-4)

## Solution Approach

### Method 1: Kadane Variant
1. min_ending_here = min_so_far = nums[0]
2. for num in nums[1:]:
   - min_ending_here = min(num, min_ending_here + num)
   - min_so_far = min(min_so_far, min_ending_here)
3. return min_so_far

### Method 2: DP
1. dp[0] = nums[0]
2. min_sum = dp[0]
3. for i in 1 to len(nums)-1:
   - dp[i] = min(nums[i], dp[i-1] + nums[i])
   - min_sum = min(min_sum, dp[i])
4. return min_sum

## Time Complexity

O(n) - Linear.

## Space Complexity

O(1) for Kadane, O(n) for DP.

## Edge Cases

- **Single element**: The element
- **All positive**: Smallest element
- **All negative**: Sum all
- **Mixed**: Min subarray sum

## Applications

- **Array Analysis**: Min sum subarray
- **Dynamic Programming**: Kadane variant
- **Optimization**: Subarray sums
- **Interview Questions**: Variant

## Practice Tips

- Handle negative numbers
- Track min ending here
- Similar to max subarray
- Test with all negative
