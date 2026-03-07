---
title: "Combination Sum"
leetcode: "https://leetcode.com/problems/combination-sum/"
difficulty: "Medium"
tags: ["array", "backtracking"]
---

## Problem

Given an array of distinct integers candidates and a target integer target, return a list of all unique combinations of candidates where the chosen numbers sum to target. The same number may be chosen from candidates an unlimited number of times. Two combinations are unique if the frequency of at least one of the chosen numbers is different.

## Example

**Input:** candidates = [2,3,6,7], target = 7  
**Output:** [[2,2,3],[7]]  

**Input:** candidates = [2], target = 1  
**Output:** []  

**Input:** candidates = [1], target = 1  
**Output:** [[1]]

## Solution Approach

### Method 1: Backtracking
1. result = []
2. def backtrack(start, current, total):
   - if total == target:
     - result.append(current[:])
     - return
   - if total > target:
     - return
   - for i in range(start, len(candidates)):
     - current.append(candidates[i])
     - backtrack(i, current, total + candidates[i])
     - current.pop()
3. backtrack(0, [], 0)
4. return result

## Time Complexity

O(2^target) - Worst case.

## Space Complexity

O(target) - Recursion depth.

## Edge Cases

- **No combinations**: []
- **Target 0**: [[]] if allowed
- **Single candidate**: Multiples
- **Duplicates in candidates**: Assume distinct

## Applications

- **Combinations**: Sum to target
- **Backtracking**: Exhaustive search
- **Dynamic Programming**: Can optimize
- **Interview Questions**: Medium

## Practice Tips

- Sort candidates if needed
- Start from index to allow reuse
- Stop when sum > target
- Collect valid combinations
