---
title: "Maximum Product Subarray"
leetcode: "https://leetcode.com/problems/maximum-product-subarray/"
difficulty: "Medium"
tags: ["array", "dynamic-programming"]
---

## Problem

Given an integer array nums, find a contiguous non-empty subarray that has the largest product, and return the product.

## Example

**Input:** nums = [2,3,-2,4]  
**Output:** 6 (2,3)  

**Input:** nums = [-2,0,-1]  
**Output:** 0  

**Input:** nums = [-2,3,-4]  
**Output:** 24 (-2,3,-4)

## Solution Approach

### Method 1: DP
1. max_so_far = min_so_far = result = nums[0]
2. for num in nums[1:]:
   - candidates = [num, max_so_far * num, min_so_far * num]
   - max_so_far = max(candidates)
   - min_so_far = min(candidates)
   - result = max(result, max_so_far)
3. return result

## Time Complexity

O(n) - Linear.

## Space Complexity

O(1) - Constant.

## Edge Cases

- **Negative numbers**: Can make positive
- **Zeros**: Reset product
- **Single element**: The element
- **All positive**: Product all

## Applications

- **Array Analysis**: Max product subarray
- **Dynamic Programming**: Track max and min
- **Optimization**: Handle negatives
- **Interview Questions**: Classic

## Practice Tips

- Track max and min products
- Reset on zero
- Consider negative * negative
- Update global max
