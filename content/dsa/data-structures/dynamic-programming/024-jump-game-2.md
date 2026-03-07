---
title: "Jump Game 2"
leetcode: "https://leetcode.com/problems/jump-game-ii/"
difficulty: "Medium"
tags: ["dynamic-programming", "greedy", "array"]
---

## Problem

Given an array of non-negative integers nums, you are initially positioned at the first index of the array. Each element in the array represents your maximum jump length at that position. Your goal is to reach the last index in the minimum number of jumps. Return the minimum number of jumps to reach the last index of the array.

## Example

**Input:** nums = [2,3,1,1,4]  
**Output:** 2 (0->1->4)  

**Input:** nums = [2,3,0,1,4]  
**Output:** 2  

**Input:** nums = [0]  
**Output:** 0

## Solution Approach

### Method 1: Greedy
1. jumps = 0, current_end = 0, farthest = 0
2. for i in 0 to len(nums)-2:
   - farthest = max(farthest, i + nums[i])
   - if i == current_end:
     - jumps += 1
     - current_end = farthest
     - if current_end >= len(nums)-1: break
3. return jumps

### Method 2: DP
1. dp = [float('inf')] * len(nums)
2. dp[0] = 0
3. for i in 0 to len(nums)-1:
   - for j in i+1 to min(i + nums[i] + 1, len(nums)):
     - dp[j] = min(dp[j], dp[i] + 1)
4. return dp[-1]

## Time Complexity

O(n) for greedy, O(n^2) for DP.

## Space Complexity

O(1) for greedy, O(n) for DP.

## Edge Cases

- **Single element**: 0
- **Last reachable in one jump**: 1
- **Farthest covers all**: correct jumps
- **0 jumps**: 0 if n=1

## Applications

- **Jump Problems**: Minimum jumps
- **Dynamic Programming**: Optimal path
- **Greedy Algorithms**: Local optimal
- **Interview Questions**: Medium problem

## Practice Tips

- Greedy for efficiency
- Track current and farthest
- Update jumps at end of range
- Test with sequences
