---
title: "Missing Number"
cses: "https://cses.fi/problemset/task/1083"
difficulty: "Easy"
tags: ["implementation", "math"]
---

## Problem

You are given all numbers between 1 and n except one. Find the missing number.

## Example

**Input:** 5  
1 2 3 4 6  
**Output:** 5  

**Input:** 3  
1 3  
**Output:** 2  

**Input:** 1  
**Output:** 1

## Solution Approach

### Method 1: Sum Formula
1. sum_expected = n * (n + 1) // 2
2. sum_actual = sum of given numbers
3. missing = sum_expected - sum_actual

## Time Complexity

O(n) - Sum array.

## Space Complexity

O(1) - Constant.

## Edge Cases

- **n = 1**: Missing 1
- **Missing first**: 1
- **Missing last**: n

## Applications

- **Math**: Sum formulas
- **Arrays**: Missing element
- **Implementation**: Simple calc

## Practice Tips

- Use sum formula
- Handle large n
- Input n and array
