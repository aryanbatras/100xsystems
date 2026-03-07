---
title: "Maximum Product Subarray"
leetcode: "https://leetcode.com/problems/maximum-product-subarray/"
difficulty: "Medium"
tags: ["dynamic-programming", "array"]
---

## Problem

Given an integer array nums, find a contiguous non-empty subarray within the array that has the largest product, and return the product.

## Example

**Input:** nums = [2,3,-2,4]  
**Output:** 6 (2*3)  

**Input:** nums = [-2,0,-1]  
**Output:** 0 (0)  

**Input:** nums = [-2]  
**Output:** -2

## Solution Approach

### Method 1: DP with Max and Min
1. if not nums: return 0
2. max_prod = min_prod = result = nums[0]
3. for num in nums[1:]:
   - if num < 0:
     - max_prod, min_prod = min_prod, max_prod
   - max_prod = max(num, max_prod * num)
   - min_prod = min(num, min_prod * num)
   - result = max(result, max_prod)
4. return result

## Time Complexity

O(n) - Linear.

## Space Complexity

O(1) - Constant.

## Edge Cases

- **Single element**: The element
- **Contains zero**: 0 if max
- **All negative**: Largest negative
- **Mixed signs**: Handle properly

## Applications

- **Array Analysis**: Max product subarray
- **Dynamic Programming**: Product tracking
- **Optimization**: Subarray products
- **Interview Questions**: Classic

## Practice Tips

- Track max and min products
- Swap on negative
- Update result
- Handle zeros
