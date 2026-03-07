---
title: "Rabin Karp"
difficulty: "Medium"
tags: ["string", "hashing", "rolling-hash"]
---

## Problem

Implement the Rabin-Karp algorithm for string matching. Given a text string and a pattern string, find all occurrences of the pattern in the text.

## Example

**Input:** text = "ababc", pattern = "abc"  
**Output:** [2]  

**Input:** text = "aaaa", pattern = "aa"  
**Output:** [0,1,2]  

**Input:** text = "abc", pattern = "d"  
**Output:** []

## Solution Approach

### Method 1: Rolling Hash
1. def rabin_karp(text, pattern):
   - n, m = len(text), len(pattern)
   - if m > n or m == 0: return []
   - d = 256  # number of characters
   - q = 101  # prime number
   - p_hash = 0  # hash of pattern
   - t_hash = 0  # hash of text substring
   - h = 1  # d^(m-1) % q
   - for i in range(m-1):
     - h = (h * d) % q
   - for i in range(m):
     - p_hash = (d * p_hash + ord(pattern[i])) % q
     - t_hash = (d * t_hash + ord(text[i])) % q
   - result = []
   - for i in range(n - m + 1):
     - if p_hash == t_hash:
       - # Check for false positive
       - if text[i:i+m] == pattern:
         - result.append(i)
     - if i < n - m:
       - t_hash = (d * (t_hash - ord(text[i]) * h) + ord(text[i+m])) % q
       - if t_hash < 0:
         - t_hash += q
   - return result

## Time Complexity

O(n + m) - Average case.

## Space Complexity

O(1) - Constant.

## Edge Cases

- **Pattern longer than text**: []
- **Pattern empty**: []
- **No match**: []
- **Multiple matches**: All indices

## Applications

- **String Matching**: Efficient search
- **Hashing**: Rolling hash
- **Pattern Recognition**: Substring find
- **Interview Questions**: Medium

## Practice Tips

- Compute initial hashes
- Slide window with hash update
- Check for collisions
- Use prime modulus
