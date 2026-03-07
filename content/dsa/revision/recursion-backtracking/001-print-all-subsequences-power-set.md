---
title: "Print all subsequences/Power Set"
difficulty: "Medium"
tags: ["array", "backtracking", "bit-manipulation"]
---

## Problem

Given an integer array nums of unique elements, return all possible subsets (the power set). The solution set must not contain duplicate subsets. Return the solution in any order.

## Example

**Input:** nums = [1,2,3]  
**Output:** [[],[1],[2],[1,2],[3],[1,3],[2,3],[1,2,3]]  

**Input:** nums = [0]  
**Output:** [[],[0]]  

**Input:** nums = []  
**Output:** [[]]

## Solution Approach

### Method 1: Backtracking
1. result = []
2. def backtrack(start, current):
   - result.append(current[:])
   - for i in range(start, len(nums)):
     - current.append(nums[i])
     - backtrack(i + 1, current)
     - current.pop()
3. backtrack(0, [])
4. return result

### Method 2: Bit Manipulation
1. n = len(nums)
2. result = []
3. for i in range(1 << n):
   - subset = []
   - for j in range(n):
     - if i & (1 << j):
       - subset.append(nums[j])
   - result.append(subset)
4. return result

## Time Complexity

O(2^n) - Exponential.

## Space Complexity

O(2^n) - All subsets.

## Edge Cases

- **Empty array**: [[]]
- **Single element**: [[], [num]]
- **No duplicates**: As given
- **Large n**: Time/space

## Applications

- **Subsets Generation**: Power set
- **Backtracking**: Include/exclude
- **Bit Manipulation**: Masks
- **Interview Questions**: Medium

## Practice Tips

- Use backtracking for recursion
- Bit manipulation for iterative
- Start from index to avoid duplicates
- Collect all subsets
