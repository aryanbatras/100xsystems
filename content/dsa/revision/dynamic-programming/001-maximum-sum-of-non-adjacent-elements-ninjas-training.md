---
title: "Maximum sum of non-adjacent elements Ninja's Training"
difficulty: "Medium"
tags: ["array", "dynamic-programming"]
---

## Problem

Given an array of integers, find the maximum sum of non-adjacent elements.

## Example

**Input:** nums = [1,2,3,1]  
**Output:** 4 (1+3)  

**Input:** nums = [2,7,9,3,1]  
**Output:** 12 (2+9+1)  

**Input:** nums = [1]  
**Output:** 1

## Solution Approach

### Method 1: DP
1. def max_sum(nums):
   - if not nums: return 0
   - n = len(nums)
   - if n == 1: return nums[0]
   - dp = [0] * n
   - dp[0] = nums[0]
   - dp[1] = max(nums[0], nums[1])
   - for i in range(2, n):
     - dp[i] = max(dp[i-1], dp[i-2] + nums[i])
   - return dp[-1]

## Time Complexity

O(n) - Linear.

## Space Complexity

O(n) - DP array.

## Edge Cases

- **Empty**: 0
- **Single**: Value
- **Two**: Max
- **All negative**: Max negative

## Applications

- **Array Problems**: Non-adjacent sum
- **Dynamic Programming**: House robber
- **Optimization**: Max sum
- **Interview Questions**: Medium

## Practice Tips

- DP for include/exclude
- Max of skip or take
- Handle base cases
- Optimize to O(1) space
