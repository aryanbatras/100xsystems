---
title: "Climbing Stairs"
leetcode: "https://leetcode.com/problems/climbing-stairs/"
difficulty: "Easy"
tags: ["dynamic-programming", "math", "memoization"]
---

## Problem

You are climbing a staircase. It takes n steps to reach the top. Each time you can climb 1 or 2 steps. In how many distinct ways can you climb to the top?

## Example

**Input:** n = 2  
**Output:** 2 (1+1, 2)  

**Input:** n = 3  
**Output:** 3 (1+1+1, 1+2, 2+1)  

**Input:** n = 1  
**Output:** 1

## Solution Approach

### Method 1: DP Bottom Up
1. if n <= 2: return n
2. dp = [0] * (n+1)
3. dp[1] = 1, dp[2] = 2
4. for i in 3 to n: dp[i] = dp[i-1] + dp[i-2]
5. return dp[n]

### Method 2: Iterative
1. if n <= 2: return n
2. a = 1, b = 2
3. for i in 3 to n:
   - c = a + b
   - a = b
   - b = c
4. return b

## Time Complexity

O(n) - Linear.

## Space Complexity

O(1) for iterative.

## Edge Cases

- **n = 0**: 1 (already at top)
- **n = 1**: 1
- **n = 2**: 2

## Applications

- **Combinatorics**: Ways to reach
- **Fibonacci**: Similar sequence
- **Dynamic Programming**: Basic DP
- **Interview Questions**: Classic

## Practice Tips

- Use bottom up DP
- Optimize to O(1) space
- Handle small n
- Understand recurrence
