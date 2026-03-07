---
title: "Subset Sum Problem"
difficulty: "Medium"
tags: ["dynamic-programming", "array"]
---

## Problem

Given a set of non-negative integers, and a value sum, determine if there is a subset of the given set with sum equal to given sum.

## Example

**Input:** arr = [3,34,4,12,5,2], sum = 9  
**Output:** true (4+5)  

**Input:** arr = [3,34,4,12,5,2], sum = 30  
**Output:** false  

**Input:** arr = [1,2,3], sum = 0  
**Output:** true

## Solution Approach

### Method 1: Recursive
1. def subsetSum(arr, n, sum):
   - if sum == 0: return True
   - if n == 0: return False
   - if arr[n-1] > sum: return subsetSum(arr, n-1, sum)
   - return subsetSum(arr, n-1, sum) or subsetSum(arr, n-1, sum - arr[n-1])

### Method 2: DP
1. n = len(arr), dp = [[False for _ in range(sum+1)] for _ in range(n+1)]
2. for i in 0 to n: dp[i][0] = True
3. for i in 1 to n:
   - for j in 1 to sum:
     - if arr[i-1] <= j:
       - dp[i][j] = dp[i-1][j] or dp[i-1][j - arr[i-1]]
     - else:
       - dp[i][j] = dp[i-1][j]
4. return dp[n][sum]

## Time Complexity

O(n * sum) - DP.

## Space Complexity

O(n * sum) - DP table.

## Edge Cases

- **sum = 0**: true
- **n = 0**: false
- **All elements > sum**: false
- **Single element == sum**: true

## Applications

- **Subset Problems**: Sum subsets
- **Dynamic Programming**: Classic DP
- **Combinatorics**: Subset sums
- **Interview Questions**: Common

## Practice Tips

- Fill DP table
- Consider include/exclude
- Optimize space to O(sum)
- Test with small arrays
