---
title: "Target Sum Problem"
leetcode: "https://leetcode.com/problems/target-sum/"
difficulty: "Medium"
tags: ["dynamic-programming", "array"]
---

## Problem

You are given an integer array nums and an integer target. You want to build an expression out of nums by adding one of the symbols '+' and '-' before each number in nums and then concatenate all the numbers. For example, if nums = [2, 1], you can add a '+' before 2 and a '-' before 1 and concatenate them to build the expression "+2-1". Return the number of different expressions that you can build, which evaluates to target.

## Example

**Input:** nums = [1,1,1,1,1], target = 3  
**Output:** 5  

**Input:** nums = [1], target = 1  
**Output:** 1  

**Input:** nums = [1,0], target = 1  
**Output:** 2

## Solution Approach

### Method 1: DP
1. total = sum(nums)
2. if (total + target) % 2 != 0 or total + target < 0: return 0
3. sum_P = (total + target) // 2
4. Use subset sum DP to count subsets with sum sum_P
5. dp = [0] * (sum_P + 1)
6. dp[0] = 1
7. for num in nums:
   - for j in sum_P downto num:
     - dp[j] += dp[j - num]
8. return dp[sum_P]

## Time Complexity

O(n * sum) - DP.

## Space Complexity

O(sum) - DP array.

## Edge Cases

- **target > total**: 0
- **total + target odd**: 0
- **nums has 0**: multiple ways
- **Single num**: if num == target or -num == target

## Applications

- **Expression Evaluation**: Sign assignments
- **Dynamic Programming**: Subset sums
- **Combinatorics**: Ways to reach target
- **Interview Questions**: Common

## Practice Tips

- Reduce to subset sum
- Handle zeros
- Use 1D DP for space
- Test with small arrays
