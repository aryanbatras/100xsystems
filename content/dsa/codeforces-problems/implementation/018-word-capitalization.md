---
title: "Word Capitalization"
codeforces: "https://codeforces.com/problemset/problem/281/A"
difficulty: "Easy"
tags: ["implementation", "string", "capitalization"]
---

## Problem

Capitalize first letter of word.

## Example

**Input:** ApPLe  

**Output:** ApPLe  

## Solution Approach

### Method 1: String Manipulation
s = input()

print(s[0].upper() + s[1:])

## Time Complexity

O(n) - String.

## Space Complexity

O(n).

## Edge Cases

- **Already capital**: Same
- **Single letter**: Upper
- **All lower**: First upper
- **All upper**: Same

## Applications

- **String**: Capitalization
- **Implementation**: Basic

## Practice Tips

- Upper first char
- Concatenate rest
- Handle empty
