---
title: "Z-Function"
difficulty: "Medium"
tags: ["string", "z-algorithm"]
---

## Problem

Given a string s, compute the Z-array where z[i] is the length of the longest substring starting at i that matches a prefix of s.

## Example

**Input:** s = "aaabaab"  
**Output:** [0,2,1,0,2,1,0]  

**Input:** s = "abc"  
**Output:** [0,0,0]  

**Input:** s = "aaaaa"  
**Output:** [0,4,3,2,1]

## Solution Approach

### Method 1: Z Algorithm
1. def z_function(s):
   - n = len(s)
   - z = [0] * n
   - l = r = 0
   - for i in range(1, n):
     - if i < r:
       - z[i] = min(r - i, z[i - l])
     - while i + z[i] < n and s[z[i]] == s[i + z[i]]:
       - z[i] += 1
     - if i + z[i] > r:
       - l = i
       - r = i + z[i]
   - return z

## Time Complexity

O(n) - Linear.

## Space Complexity

O(n) - Z array.

## Edge Cases

- **Single char**: [0]
- **All same**: Decreasing lengths
- **No matches**: All 0
- **Prefix repeats**: Z values

## Applications

- **String Matching**: Prefix matches
- **Pattern Searching**: Z algorithm
- **Substrings**: Common prefixes
- **Interview Questions**: Medium

## Practice Tips

- Use l and r for window
- Copy from previous if in window
- Extend manually
- Update window
