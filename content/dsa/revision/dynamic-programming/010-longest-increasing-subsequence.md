---
title: "Longest Increasing Subsequence"
leetcode: "https://leetcode.com/problems/longest-increasing-subsequence/"
difficulty: "Medium"
tags: ["array", "dynamic-programming", "binary-search"]
---

## Problem

Given an integer array nums, return the length of the longest strictly increasing subsequence. A subsequence is an array that can be derived from another array by deleting some or no elements without changing the order of the remaining elements.

## Example

**Input:** nums = [10,9,2,5,3,7,101,18]  
**Output:** 4 (2,3,7,101)  

**Input:** nums = [0,1,0,3,2,3]  
**Output:** 4 (0,1,2,3)  

**Input:** nums = [7,7,7,7,7,7,7]  
**Output:** 1

## Solution Approach

### Method 1: DP
1. n = len(nums)
2. dp = [1] * n
3. for i in range(1, n):
   - for j in range(i):
     - if nums[i] > nums[j]:
       - dp[i] = max(dp[i], dp[j] + 1)
4. return max(dp) if dp else 0

### Method 2: Patience Sorting (Binary Search)
1. def lengthOfLIS(nums):
   - tails = []
   - for num in nums:
     - left, right = 0, len(tails) - 1
     - while left <= right:
       - mid = (left + right) // 2
       - if tails[mid] < num:
         - left = mid + 1
       - else:
         - right = mid - 1
     - if left == len(tails):
       - tails.append(num)
     - else:
       - tails[left] = num
   - return len(tails)

## Time Complexity

O(n log n) for binary search, O(n^2) for DP.

## Space Complexity

O(n) - DP or tails.

## Edge Cases

- **Empty**: 0
- **Single**: 1
- **Decreasing**: 1
- **Increasing**: n

## Applications

- **Array Problems**: LIS
- **Dynamic Programming**: Sequences
- **Binary Search**: Optimization
- **Interview Questions**: Medium

## Practice Tips

- DP for O(n^2)
- Binary search for O(n log n)
- Maintain increasing tails
- Find position to replace
