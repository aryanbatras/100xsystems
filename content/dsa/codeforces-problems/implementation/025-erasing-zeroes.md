---
title: "Erasing Zeroes"
codeforces: "https://codeforces.com/problemset/problem/1303/A"
difficulty: "Easy"
tags: ["implementation", "string", "zeros"]
---

## Problem

Min operations to erase zeros.

## Example

**Input:** 010011  

**Output:** 2  

## Solution Approach

### Method 1: Find Range
s = input()

first = s.find('1')

last = s.rfind('1')

if first == -1:

    print(0)

else:

    zeros = s[first:last+1].count('0')

    print(zeros)

## Time Complexity

O(n) - String.

## Space Complexity

O(n).

## Edge Cases

- **No 1s**: 0
- **No zeros between**: 0
- **All zeros**: 0
- **Ends with 1**: Zeros in middle

## Applications

- **String**: Substring
- **Counting**: Zeros

## Practice Tips

- Find first and last 1
- Count zeros between
- Handle no 1s
