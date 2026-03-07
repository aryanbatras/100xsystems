---
title: "Subset sum equal to target"
difficulty: "Medium"
tags: ["array", "dynamic-programming", "backtracking"]
---

## Problem

Given an array of non-negative integers and a target sum, determine if there is a subset of the array with sum equal to the given target.

## Example

**Input:** nums = [3,34,4,12,5,2], target = 9  
**Output:** true (4+5)  

**Input:** nums = [1,2,7,1], target = 10  
**Output:** false  

**Input:** nums = [1], target = 1  
**Output:** true

## Solution Approach

### Method 1: DP
1. n = len(nums)
2. dp = [[False] * (target + 1) for _ in range(n + 1)]
3. for i in range(n + 1):
   - dp[i][0] = True
4. for i in range(1, n + 1):
   - for j in range(1, target + 1):
     - dp[i][j] = dp[i-1][j]
     - if j >= nums[i-1]:
       - dp[i][j] = dp[i][j] or dp[i-1][j - nums[i-1]]
5. return dp[n][target]

### Method 2: Recursive with Memo
1. def subset_sum(nums, target, index, memo):
   - if target == 0: return True
   - if index == len(nums): return False
   - key = (index, target)
   - if key in memo: return memo[key]
   - # Skip
   - take = subset_sum(nums, target, index + 1, memo)
   - # Take
   - if target >= nums[index]:
     - take = take or subset_sum(nums, target - nums[index], index + 1, memo)
   - memo[key] = take
   - return take

## Time Complexity

O(n * target) - DP.

## Space Complexity

O(n * target) - DP table.

## Edge Cases

- **Target 0**: true
- **Empty array**: false if target > 0
- **Single element**: if == target
- **All zeros**: true if target 0

## Applications

- **Subset Problems**: Sum target
- **Dynamic Programming**: Knapsack 0/1
- **Backtracking**: Exhaustive
- **Interview Questions**: Medium

## Practice Tips

- DP table for sum
- Fill first row/col
- Choose take or skip
- Optimize space to O(target)
