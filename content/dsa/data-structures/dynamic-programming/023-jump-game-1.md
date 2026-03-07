---
title: "Jump Game 1"
leetcode: "https://leetcode.com/problems/jump-game/"
difficulty: "Medium"
tags: ["dynamic-programming", "greedy", "array"]
---

## Problem

You are given an integer array nums. You are initially positioned at the first index, and each element in the array represents your maximum jump length at that position. Return true if you can reach the last index, or false otherwise.

## Example

**Input:** nums = [2,3,1,1,4]  
**Output:** true  

**Input:** nums = [3,2,1,0,4]  
**Output:** false  

**Input:** nums = [0]  
**Output:** true

## Solution Approach

### Method 1: Greedy
1. max_reach = 0
2. for i in 0 to len(nums)-1:
   - if i > max_reach: return false
   - max_reach = max(max_reach, i + nums[i])
3. return max_reach >= len(nums)-1

### Method 2: DP
1. dp = [False] * len(nums)
2. dp[0] = True
3. for i in 0 to len(nums)-1:
   - if dp[i]:
     - for j in i+1 to min(i + nums[i] + 1, len(nums)):
       - dp[j] = True
4. return dp[-1]

## Time Complexity

O(n) for greedy, O(n^2) for DP.

## Space Complexity

O(1) for greedy, O(n) for DP.

## Edge Cases

- **Last index reachable**: true
- **0 jump at start**: true if n=1
- **0 jump elsewhere**: may block
- **All 0s except last**: false

## Applications

- **Jump Problems**: Reachability
- **Dynamic Programming**: Path finding
- **Greedy Algorithms**: Optimal choice
- **Interview Questions**: Classic

## Practice Tips

- Greedy for efficiency
- Track max reach
- Handle 0 jumps
- Test with examples
