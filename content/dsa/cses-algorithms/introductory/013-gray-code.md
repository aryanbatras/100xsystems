---
title: "Gray Code"
cses: "https://cses.fi/problemset/task/2205"
difficulty: "Easy"
tags: ["implementation", "bit-manipulation"]
---

## Problem

A Gray code is a list of all 2^n bit strings of length n, where each string differs from the previous one in exactly one bit (with wrap-around).

## Example

**Input:** 2  
**Output:** 00 01 11 10  

**Input:** 1  
**Output:** 0 1  

**Input:** 3  
**Output:** 000 001 011 010 110 111 101 100

## Solution Approach

### Method 1: Iterative
1. result = ['0', '1']
2. for _ in range(2, n+1):
   - new_result = []
   - for code in result:
     - new_result.append('0' + code)
   - for code in reversed(result):
     - new_result.append('1' + code)
   - result = new_result
3. print(' '.join(result))

## Time Complexity

O(2^n) - Exponential.

## Space Complexity

O(2^n) - List.

## Edge Cases

- **n=1**: 0 1
- **n=2**: 00 01 11 10
- **Large n**: Many

## Applications

- **Bit Manipulation**: Gray codes
- **Sequences**: Hamming distance 1
- **Implementation**: Building

## Practice Tips

- Start with n=1
- Add 0 and 1 prefixes
- Reverse for second half
