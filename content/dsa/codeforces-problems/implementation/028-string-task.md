---
title: "String Task"
codeforces: "https://codeforces.com/problemset/problem/118/A"
difficulty: "Easy"
tags: ["implementation", "string", "processing"]
---

## Problem

Process string for codeforces.

## Example

**Input:** Codeforces  

**Output:** .c.d.f.r.c.s  

## Solution Approach

### Method 1: Process String
s = input().lower()

result = []

vowels = 'aeiouy'

for c in s:

    if c not in vowels:

        result.append('.' + c)

print(''.join(result))

## Time Complexity

O(n) - Linear.

## Space Complexity

O(n).

## Edge Cases

- **No vowels**: All dotted
- **All vowels**: Empty
- **Mixed**: Processed
- **Upper case**: Lowered

## Applications

- **String**: Processing
- **Vowels**: Removal

## Practice Tips

- Lower case
- Check vowels
- Add dots
- Build result
