---
title: "Burst Balloons"
leetcode: "https://leetcode.com/problems/burst-balloons/"
difficulty: "Hard"
tags: ["array", "dynamic-programming"]
---

## Problem

You are given n balloons, indexed from 0 to n-1. Each balloon is painted with a number on it represented by an array nums. You are asked to burst all the balloons. If you burst the ith balloon, you will get nums[i-1] * nums[i] * nums[i+1] coins. If i-1 or i+1 goes out of bounds of the array, then treat it as if there is a balloon with a 1 painted on it. Return the maximum coins you can collect by bursting the balloons wisely.

## Example

**Input:** nums = [3,1,5,8]  
**Output:** 167  

**Input:** nums = [1,5]  
**Output:** 10  

**Input:** nums = [1]  
**Output:** 1

## Solution Approach

### Method 1: DP
1. nums = [1] + nums + [1]
2. n = len(nums)
3. dp = [[0] * n for _ in range(n)]
4. for length in range(2, n):
   - for left in range(n - length):
     - right = left + length
     - for k in range(left + 1, right):
       - dp[left][right] = max(dp[left][right], dp[left][k] + dp[k][right] + nums[left] * nums[k] * nums[right])
5. return dp[0][n-1]

## Time Complexity

O(n^3) - Triple loop.

## Space Complexity

O(n^2) - DP table.

## Edge Cases

- **Single balloon**: nums[0]
- **Two balloons**: max of orders
- **All same**: Factorials
- **With 1s**: Boundary

## Applications

- **Array Problems**: Burst order
- **Dynamic Programming**: Interval DP
- **Optimization**: Max coins
- **Interview Questions**: Hard

## Practice Tips

- Add 1s at ends
- DP on subarrays
- Last burst in subarray
- Sum left + right + product
