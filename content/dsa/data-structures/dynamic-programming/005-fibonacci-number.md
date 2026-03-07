---
title: "Fibonacci Number"
leetcode: "https://leetcode.com/problems/fibonacci-number/"
difficulty: "Easy"
tags: ["dynamic-programming", "math", "recursion"]
---

## Problem

The Fibonacci numbers, commonly denoted F(n) form a sequence, called the Fibonacci sequence, such that each number is the sum of the two preceding ones, starting from 0 and 1. Given n, calculate F(n).

## Example

**Input:** n = 2  
**Output:** 1  

**Input:** n = 3  
**Output:** 2  

**Input:** n = 4  
**Output:** 3

## Solution Approach

### Method 1: Recursive
1. def fib(n):
   - if n <= 1: return n
   - return fib(n-1) + fib(n-2)

### Method 2: DP
1. if n <= 1: return n
2. dp = [0] * (n+1)
3. dp[1] = 1
4. for i in 2 to n:
   - dp[i] = dp[i-1] + dp[i-2]
5. return dp[n]

### Method 3: Iterative
1. if n <= 1: return n
2. a = 0, b = 1
3. for i in 2 to n:
   - c = a + b
   - a = b
   - b = c
4. return b

## Time Complexity

O(n) - Linear.

## Space Complexity

O(1) for iterative.

## Edge Cases

- **n = 0**: 0
- **n = 1**: 1
- **n = 2**: 1

## Applications

- **Mathematics**: Fibonacci sequence
- **Dynamic Programming**: Basic DP
- **Algorithms**: Recurrence relations
- **Interview Questions**: Common

## Practice Tips

- Use iterative for efficiency
- Handle base cases
- Avoid recursion for large n
- Understand the sequence
