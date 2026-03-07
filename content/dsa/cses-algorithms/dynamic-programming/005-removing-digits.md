---
title: "Removing Digits"
cses: "https://cses.fi/problemset/task/1637"
difficulty: "Easy"
tags: ["implementation", "dynamic-programming", "greedy"]
---

## Problem

Find the minimum number of operations to reduce n to 0 by subtracting a digit from n.

## Example

**Input:** 27  
**Output:** 3 (27-7=20,20-2=18,18-8=10,10-1=9,9-9=0)  

**Input:** 1  
**Output:** 1  

**Input:** 10  
**Output:** 2

## Solution Approach

### Method 1: DP
1. dp = [float('inf')] * (n + 1)
2. dp[0] = 0
3. for i in range(1, n + 1):
   - s = str(i)
   - for c in s:
     - d = int(c)
     - if i - d >= 0:
       - dp[i] = min(dp[i], dp[i - d] + 1)
4. print(dp[n])

## Time Complexity

O(n) - Linear.

## Space Complexity

O(n) - DP array.

## Edge Cases

- **n=0**: 0
- **n=1**: 1
- **Digits include 0**: Skip 0
- **Large n**: DP

## Applications

- **DP**: Reduction
- **Digits**: Subtraction
- **Min operations**: Counts

## Practice Tips

- DP for each number
- Subtract each digit
- Min from previous
- Handle 0 digit
