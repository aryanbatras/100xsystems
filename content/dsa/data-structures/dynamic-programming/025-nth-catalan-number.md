---
title: "Nth Catalan Number"
difficulty: "Medium"
tags: ["dynamic-programming", "math", "combinatorics"]
---

## Problem

The Catalan numbers are a sequence of natural numbers that occur in various counting problems, often involving recursively defined objects. Find the nth Catalan number.

## Example

**Input:** n = 3  
**Output:** 5 (1,1,2,5,14,...)  

**Input:** n = 0  
**Output:** 1  

**Input:** n = 1  
**Output:** 1

## Solution Approach

### Method 1: DP
1. dp = [0] * (n+1)
2. dp[0] = 1
3. for i in 1 to n:
   - for j in 0 to i-1:
     - dp[i] += dp[j] * dp[i-1-j]
4. return dp[n]

### Method 2: Formula
1. return (2n)! / ((n+1)! * n!)

## Time Complexity

O(n^2) for DP.

## Space Complexity

O(n) - DP array.

## Edge Cases

- **n = 0**: 1
- **n = 1**: 1
- **n = 2**: 2

## Applications

- **Combinatorics**: Counting problems
- **Tree Structures**: Binary trees
- **Parentheses**: Balanced expressions
- **Dynamic Programming**: Sequence generation

## Practice Tips

- Understand recurrence
- Implement DP carefully
- Handle large n with formula
- Test with small n
