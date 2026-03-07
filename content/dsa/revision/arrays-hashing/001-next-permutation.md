---
title: "Next Permutation"
leetcode: "https://leetcode.com/problems/next-permutation/"
difficulty: "Medium"
tags: ["array", "two-pointers"]
---

## Problem

Implement next permutation, which rearranges numbers into the lexicographically next greater permutation of numbers. If such an arrangement is not possible, it must rearrange it as the lowest possible order (i.e., sorted in ascending order).

## Example

**Input:** nums = [1,2,3]  
**Output:** [1,3,2]  

**Input:** nums = [3,2,1]  
**Output:** [1,2,3]  

**Input:** nums = [1,1,5]  
**Output:** [1,5,1]

## Solution Approach

### Method 1: Find and Swap
1. n = len(nums)
2. i = n - 2
3. while i >= 0 and nums[i] >= nums[i+1]:
   - i -= 1
4. if i >= 0:
   - j = n - 1
   - while nums[j] <= nums[i]:
     - j -= 1
   - nums[i], nums[j] = nums[j], nums[i]
5. nums[i+1:] = nums[i+1:][::-1]

## Time Complexity

O(n) - Linear.

## Space Complexity

O(1) - Constant.

## Edge Cases

- **Descending**: Reverse to ascending
- **Single element**: Same
- **Already largest**: Reverse
- **Duplicates**: Handle correctly

## Applications

- **Permutations**: Next in sequence
- **Arrays**: Rearrangement
- **Algorithms**: Lex order
- **Interview Questions**: Classic

## Practice Tips

- Find first decreasing
- Swap with next larger
- Reverse suffix
- Handle descending case
