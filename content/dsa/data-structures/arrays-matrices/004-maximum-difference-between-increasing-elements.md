---
title: "Maximum Difference Between Increasing Elements"
leetcode: "https://leetcode.com/problems/maximum-difference-between-increasing-elements/"
difficulty: "Easy"
tags: ["array", "greedy"]
---

## Problem

Given a 0-indexed integer array nums of size n, find the maximum difference between nums[j] and nums[i] (i.e., nums[j] - nums[i]), such that 0 <= i < j < n and nums[i] < nums[j]. Return the maximum difference. If no such i and j exists, return -1.

## Example

**Input:** nums = [7,1,5,4]  
**Output:** 4  
**Explanation:** The maximum difference occurs with i=1, j=2, nums[j]-nums[i]=5-1=4. Note that it is not 7-1=6, since i must be before j.

**Input:** nums = [9,4,3,2]  
**Output:** -1  
**Explanation:** There is no increasing pair.

**Input:** nums = [1,2,3,4]  
**Output:** 3  
**Explanation:** The maximum difference is 4-1=3.

## Solution Approach

### Method 1: Brute Force
1. Initialize max_diff = -1
2. Iterate through all pairs (i, j) where i < j
3. If nums[j] > nums[i], update max_diff = max(max_diff, nums[j] - nums[i])
4. Return max_diff

### Method 2: Single Pass (Optimal)
1. If array has less than 2 elements, return -1
2. Initialize min_so_far = nums[0], max_diff = -1
3. Iterate from index 1 to end:
   - If nums[i] > min_so_far, update max_diff = max(max_diff, nums[i] - min_so_far)
   - Update min_so_far = min(min_so_far, nums[i])
4. Return max_diff

## Time Complexity

O(n) - We make a single pass through the array.

## Space Complexity

O(1) - We use only constant extra space.

## Edge Cases

- **Array with 0 or 1 element**: Return -1 (no valid pair)
- **All elements equal**: Return -1 (no increasing pair)
- **Strictly decreasing array**: Return -1
- **Strictly increasing array**: Return nums[n-1] - nums[0]
- **Negative numbers**: Handle correctly, differences can be negative but we only consider positive differences

## Applications

- **Stock Trading**: Find maximum profit by buying low and selling high
- **Array Analysis**: Determine the largest gain in a sequence
- **Optimization Problems**: Problems requiring maximum difference with order constraints

## Practice Tips

- Understand the constraint that i must be before j
- Consider edge cases with small arrays
- Practice both brute force and optimal approaches
- Think about how to extend to k differences or other variations
