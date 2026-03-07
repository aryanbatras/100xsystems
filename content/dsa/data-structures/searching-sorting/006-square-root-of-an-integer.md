---
title: "Square Root of an Integer"
leetcode: "https://leetcode.com/problems/sqrtx/"
difficulty: "Easy"
tags: ["math", "binary-search"]
---

## Problem

Given a non-negative integer x, compute and return the square root of x. Since the return type is an integer, the decimal digits are truncated, and only the integer part of the result is returned.

Note: You are not allowed to use any built-in exponent function or operator, such as pow(x, 0.5) or x ** 0.5.

## Example

**Input:** x = 4  
**Output:** 2  

**Input:** x = 8  
**Output:** 2 (since 2.828... truncated to 2)  

**Input:** x = 0  
**Output:** 0  

**Input:** x = 1  
**Output:** 1

## Solution Approach

### Method 1: Binary Search
1. Initialize low = 0, high = x
2. While low <= high:
   - mid = low + (high - low) // 2
   - If mid * mid <= x, low = mid + 1
   - Else, high = mid - 1
3. Return high (the largest integer whose square <= x)

### Method 2: Newton's Method
1. Start with an initial guess, e.g., x
2. Iterate: guess = (guess + x / guess) / 2
3. Repeat until convergence
4. Return the integer part

## Time Complexity

O(log x) for binary search.

## Space Complexity

O(1) - Constant space.

## Edge Cases

- **x = 0**: Return 0
- **x = 1**: Return 1
- **Perfect square**: Return exact square root
- **Large x**: Handle integer overflow in multiplication

## Applications

- **Mathematical Computations**: Square root calculations
- **Algorithm Building Blocks**: Used in other algorithms
- **Performance Optimization**: Efficient square root
- **Data Processing**: Statistical computations

## Practice Tips

- Be careful with integer overflow (use long for mid*mid)
- Understand binary search bounds
- Practice Newton's method for comparison
- Handle edge cases properly
