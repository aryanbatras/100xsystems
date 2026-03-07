---
title: "MSIS"
difficulty: "Medium"
tags: ["dynamic-programming", "array"]
---

## Problem

Given an array of n positive integers, find the maximum sum of an increasing subsequence.

## Example

**Input:** arr = [1,101,2,3,100,4,5]  
**Output:** 106 (1+2+3+100)  

**Input:** arr = [3,4,5,10]  
**Output:** 22 (3+4+5+10)  

**Input:** arr = [10,9,8,7]  
**Output:** 10

## Solution Approach

### Method 1: DP
1. n = len(arr)
2. dp = [0] * n
3. for i in range(n):
   - dp[i] = arr[i]
   - for j in range(i):
     - if arr[j] < arr[i]:
       - dp[i] = max(dp[i], dp[j] + arr[i])
4. return max(dp)

## Time Complexity

O(n^2) - DP.

## Space Complexity

O(n) - DP array.

## Edge Cases

- **All increasing**: Sum all
- **All decreasing**: Max element
- **Single element**: The element
- **No increasing**: Max element

## Applications

- **Sequence Analysis**: Max sum increasing
- **Dynamic Programming**: Subsequence DP
- **Optimization**: Sum constraints
- **Interview Questions**: Variant of LIS

## Practice Tips

- Initialize dp[i] = arr[i]
- Update with previous smaller
- Find max in dp
- Test with small arrays
