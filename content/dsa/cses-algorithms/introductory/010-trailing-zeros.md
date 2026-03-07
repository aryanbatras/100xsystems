---
title: "Trailing Zeros"
cses: "https://cses.fi/problemset/task/1082"
difficulty: "Easy"
tags: ["implementation", "math"]
---

## Problem

Your task is to calculate the number of trailing zeros in the factorial n!.

## Example

**Input:** 5  
**Output:** 1  

**Input:** 10  
**Output:** 2  

**Input:** 20  
**Output:** 4

## Solution Approach

### Method 1: Count Fives
1. count = 0
2. i = 5
3. while i <= n:
   - count += n // i
   - i *= 5
4. return count

## Time Complexity

O(log n) - Loop.

## Space Complexity

O(1) - Constant.

## Edge Cases

- **n < 5**: 0
- **n = 5**: 1
- **Large n**: Sum

## Applications

- **Factorials**: Trailing zeros
- **Math**: Prime factors
- **Implementation**: Loop

## Practice Tips

- Count multiples of 5,25,...
- Sum the counts
- Handle small n
