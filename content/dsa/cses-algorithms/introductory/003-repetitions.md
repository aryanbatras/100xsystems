---
title: "Repetitions"
cses: "https://cses.fi/problemset/task/1069"
difficulty: "Easy"
tags: ["implementation", "string"]
---

## Problem

You are given a DNA sequence: a string consisting of characters A, C, G, and T. Your task is to find the longest repetition in the sequence. This is a maximum number of consecutive symbols that are the same.

## Example

**Input:** ATTCGGGA  
**Output:** 3  

**Input:** AAAA  
**Output:** 4  

**Input:** ATCG  
**Output:** 1

## Solution Approach

### Method 1: Iteration
1. max_count = 1
2. current_count = 1
3. for i in range(1, len(s)):
   - if s[i] == s[i-1]:
     - current_count += 1
     - max_count = max(max_count, current_count)
   - else:
     - current_count = 1
4. return max_count

## Time Complexity

O(n) - Linear scan.

## Space Complexity

O(1) - Constant.

## Edge Cases

- **Single char**: 1
- **All same**: n
- **No repeats**: 1

## Applications

- **Strings**: Consecutive counts
- **Sequences**: Max streak
- **Implementation**: Simple loop

## Practice Tips

- Track current and max
- Reset on change
- Handle empty string
