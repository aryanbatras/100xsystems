---
title: "Next Permutation"
leetcode: "https://leetcode.com/problems/next-permutation/"
difficulty: "Medium"
tags: ["array", "permutation"]
---

## Problem

Implement next permutation, which rearranges numbers into the lexicographically next greater permutation of numbers. If such an arrangement is not possible, it must rearrange it as the lowest possible order (i.e., sorted in ascending order). The replacement must be in place and use only constant extra memory.

## Example

**Input:** nums = [1,2,3]  
**Output:** [1,3,2]  

**Input:** nums = [3,2,1]  
**Output:** [1,2,3]  

**Input:** nums = [1,1,5]  
**Output:** [1,5,1]

## Solution Approach

### Method 1: Standard Algorithm
1. Find the largest index i such that nums[i] < nums[i+1]. If no such index exists, the permutation is the last permutation.
2. Find the largest index j > i such that nums[i] < nums[j].
3. Swap nums[i] and nums[j].
4. Reverse the sub-array nums[i+1:].

## Time Complexity

O(n) - Linear time.

## Space Complexity

O(1) - In-place modification.

## Edge Cases

- **Already last permutation**: Reverse to first
- **Single element**: No change
- **All equal**: No change
- **Empty array**: No operation

## Applications

- **Permutation Generation**: Next in sequence
- **Combinatorics**: Lexicographical ordering
- **Algorithm Libraries**: Built-in next_permutation
- **Puzzle Solving**: State transitions

## Practice Tips

- Understand the pivot finding logic
- Practice the swap and reverse steps
- Handle edge cases carefully
- Visualize with small arrays
