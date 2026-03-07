---
title: "Digit Queries"
cses: "https://cses.fi/problemset/task/2431"
difficulty: "Easy"
tags: ["implementation", "math", "binary-search"]
---

## Problem

Consider the infinite string S formed by concatenating the numbers 1, 2, 3, ... in order. What is the k-th digit in this string?

## Example

**Input:** 1  
**Output:** 1  

**Input:** 11  
**Output:** 0  

**Input:** 15  
**Output:** 2

## Solution Approach

### Method 1: Math
1. k -= 1  # 0-based
2. digits = 1
3. while True:
   - nums = 9 * 10**(digits-1)
   - total_digits = nums * digits
   - if k < total_digits:
     - break
   - k -= total_digits
   - digits += 1
4. start = 10**(digits-1)
5. num = start + k // digits
6. pos = k % digits
7. print(str(num)[pos])

## Time Complexity

O(log k) - Loop.

## Space Complexity

O(1) - Constant.

## Edge Cases

- **k=1**: 1
- **k=10**: 1 (from 10)
- **Large k**: Compute

## Applications

- **Strings**: Infinite concatenation
- **Math**: Digit counts
- **Implementation**: Calculation

## Practice Tips

- Find digit length group
- Find number and position
- Extract digit
