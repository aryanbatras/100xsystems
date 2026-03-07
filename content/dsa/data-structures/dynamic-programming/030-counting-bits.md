---
title: "Counting Bits"
leetcode: "https://leetcode.com/problems/counting-bits/"
difficulty: "Easy"
tags: ["dynamic-programming", "bit-manipulation"]
---

## Problem

Given an integer n, return an array ans of length n + 1 such that for each i (0 <= i <= n), ans[i] is the number of 1's in the binary representation of i.

## Example

**Input:** n = 2  
**Output:** [0,1,1]  

**Input:** n = 5  
**Output:** [0,1,1,2,1,2]  

**Input:** n = 0  
**Output:** [0]

## Solution Approach

### Method 1: DP
1. ans = [0] * (n + 1)
2. for i in range(1, n + 1):
   - ans[i] = ans[i >> 1] + (i & 1)
3. return ans

### Method 2: Bit Manipulation
1. for i in range(n+1):
   - count = 0
   - while i:
     - count += i & 1
     - i >>= 1
   - ans.append(count)

## Time Complexity

O(n) for DP.

## Space Complexity

O(n) - Array.

## Edge Cases

- **n = 0**: [0]
- **n = 1**: [0,1]
- **Powers of 2**: One 1

## Applications

- **Bit Analysis**: Count set bits
- **Dynamic Programming**: Bit DP
- **Optimization**: Hamming weight
- **Interview Questions**: Common

## Practice Tips

- Use i >> 1 and i & 1
- Build array iteratively
- Handle n = 0
- Test with small n
