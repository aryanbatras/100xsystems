---
title: "Palindrome Reorder"
cses: "https://cses.fi/problemset/task/1755"
difficulty: "Easy"
tags: ["implementation", "string", "greedy"]
---

## Problem

Given a string, your task is to reorder its letters in such a way that it becomes a palindrome (i.e., it reads the same forwards and backwards).

## Example

**Input:** AAAACACBA  
**Output:** AACABACAAA  

**Input:** AABB  
**Output:** ABBA  

**Input:** AAABBBB  
**Output:** IMPOSSIBLE

## Solution Approach

### Method 1: Frequency Count
1. from collections import Counter
2. count = Counter(s)
3. odd_count = 0
4. odd_char = ''
5. for char, cnt in count.items():
   - if cnt % 2 == 1:
     - odd_count += 1
     - odd_char = char
6. if odd_count > 1:
   - print("IMPOSSIBLE")
7. else:
   - half = ''
   - for char in sorted(count):
     - half += char * (count[char] // 2)
   - result = half
   - if odd_char:
     - result += odd_char
   - result += half[::-1]
   - print(result)

## Time Complexity

O(n) - Counting and building.

## Space Complexity

O(1) - Fixed alphabet.

## Edge Cases

- **All even**: Palindrome
- **One odd**: In middle
- **Multiple odd**: IMPOSSIBLE
- **Single char**: Itself

## Applications

- **Strings**: Palindrome construction
- **Frequency**: Counts
- **Implementation**: Building

## Practice Tips

- Count frequencies
- Check odd counts
- Build half string
- Add middle if odd
