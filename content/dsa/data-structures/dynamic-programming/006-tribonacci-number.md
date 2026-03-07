---
title: "Tribonacci Number"
leetcode: "https://leetcode.com/problems/n-th-tribonacci-number/"
difficulty: "Easy"
tags: ["dynamic-programming", "math", "memoization"]
---

## Problem

The Tribonacci sequence Tn is defined as follows: T0 = 0, T1 = 1, T2 = 1, and Tn+3 = Tn + Tn+1 + Tn+2 for n >= 0. Given n, return the value of Tn.

## Example

**Input:** n = 4  
**Output:** 4 (0,1,1,2,4)  

**Input:** n = 25  
**Output:** 1389537  

**Input:** n = 0  
**Output:** 0

## Solution Approach

### Method 1: Recursive
1. def tribonacci(n):
   - if n == 0: return 0
   - if n == 1 or n == 2: return 1
   - return tribonacci(n-1) + tribonacci(n-2) + tribonacci(n-3)

### Method 2: DP
1. if n == 0: return 0
2. if n == 1 or n == 2: return 1
3. dp = [0] * (n+1)
4. dp[0] = 0, dp[1] = 1, dp[2] = 1
5. for i in 3 to n:
   - dp[i] = dp[i-1] + dp[i-2] + dp[i-3]
6. return dp[n]

### Method 3: Iterative
1. if n == 0: return 0
2. if n == 1 or n == 2: return 1
3. a = 0, b = 1, c = 1
4. for i in 3 to n:
   - d = a + b + c
   - a = b
   - b = c
   - c = d
5. return c

## Time Complexity

O(n) - Linear.

## Space Complexity

O(1) for iterative.

## Edge Cases

- **n = 0**: 0
- **n = 1**: 1
- **n = 2**: 1

## Applications

- **Mathematics**: Tribonacci sequence
- **Dynamic Programming**: Basic DP
- **Algorithms**: Recurrence relations
- **Interview Questions**: Variant of fib

## Practice Tips

- Use iterative for efficiency
- Handle base cases
- Avoid recursion for large n
- Understand the recurrence
