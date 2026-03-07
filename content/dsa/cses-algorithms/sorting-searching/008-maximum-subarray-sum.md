---
title: "Maximum Subarray Sum"
cses: "https://cses.fi/problemset/task/1643"
difficulty: "Easy"
tags: ["implementation", "dynamic-programming", "kadane"]
---

## Problem

Given an array of n numbers, your task is to calculate the maximum subarray sum, i.e., the largest possible sum of a sequence of consecutive values in the array.

## Example

**Input:** 8  
-1 3 -2 5 3 -5 2 2  
**Output:** 8  

**Input:** 5  
1 2 3 4 5  
**Output:** 15  

**Input:** 3  
-1 -2 -3  
**Output:** -1

## Solution Approach

### Method 1: Kadane's Algorithm
1. max_so_far = max_ending_here = a[0]
2. for num in a[1:]:
   - max_ending_here = max(num, max_ending_here + num)
   - max_so_far = max(max_so_far, max_ending_here)
3. print(max_so_far)

## Time Complexity

O(n) - Linear.

## Space Complexity

O(1) - Constant.

## Edge Cases

- **All positive**: Sum all
- **All negative**: Max element
- **Mixed**: Max subarray
- **Single element**: The element

## Applications

- **Arrays**: Max subarray
- **Dynamic Programming**: Kadane
- **Optimization**: Sum tracking

## Practice Tips

- Track current and global max
- Reset on negative
- Handle all negative
- Test with examples
