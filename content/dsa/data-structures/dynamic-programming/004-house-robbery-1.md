---
title: "House Robbery 1"
leetcode: "https://leetcode.com/problems/house-robber/"
difficulty: "Medium"
tags: ["dynamic-programming", "array"]
---

## Problem

You are a professional robber planning to rob houses along a street. Each house has a certain amount of money stashed, the only constraint stopping you from robbing each of them is that adjacent houses have security systems connected and it will automatically contact the police if two adjacent houses were broken into on the same night. Given an integer array nums representing the amount of money of each house, return the maximum amount of money you can rob tonight without alerting the police.

## Example

**Input:** nums = [1,2,3,1]  
**Output:** 4 (1 + 3)  

**Input:** nums = [2,7,9,3,1]  
**Output:** 12 (2 + 9 + 1)  

**Input:** nums = [2,1,1,2]  
**Output:** 4 (2 + 2)

## Solution Approach

### Method 1: DP
1. if not nums: return 0
2. n = len(nums)
3. if n == 1: return nums[0]
4. dp = [0] * n
5. dp[0] = nums[0]
6. dp[1] = max(nums[0], nums[1])
7. for i in 2 to n-1:
   - dp[i] = max(dp[i-1], dp[i-2] + nums[i])
8. return dp[n-1]

### Method 2: Iterative
1. prev2 = 0, prev1 = 0
2. for num in nums:
   - current = max(prev1, prev2 + num)
   - prev2 = prev1
   - prev1 = current
3. return prev1

## Time Complexity

O(n) - Linear.

## Space Complexity

O(1) - Constant space.

## Edge Cases

- **Empty array**: 0
- **Single house**: nums[0]
- **Two houses**: max(nums[0], nums[1])
- **All zeros**: 0

## Applications

- **Optimization**: Max non-adjacent sum
- **Dynamic Programming**: Classic DP
- **Robbery Problem**: Decision making
- **Interview Questions**: Common

## Practice Tips

- Use DP for subproblems
- Optimize to O(1) space
- Handle small arrays
- Test with examples
