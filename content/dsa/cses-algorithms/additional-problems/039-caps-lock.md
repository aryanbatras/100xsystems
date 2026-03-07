---
title: "Caps Lock"
codeforces: "https://codeforces.com/problemset/problem/131/A"
difficulty: "Easy"
tags: ["implementation", "string", "case"]
---

## Problem

Fix caps lock.

## Example

**Input:** cAPS  

**Output:** Caps  

## Solution Approach

### Method 1: Check Cases

s = input()

if s[1:] == s[1:].upper() and (s[0].islower() or s[0].isupper()):

    if s[0].isupper():

        print(s.lower())

    else:

        print(s[0].upper() + s[1:].lower())

else:

    print(s)

## Time Complexity

O(n) - String.

## Space Complexity

O(n).

## Edge Cases

- **Already capital**: Same

- **First lower, rest upper**: Capitalize first, lower rest

- **Other**: Same

## Applications

- **String**: Case handling

- **Caps lock**: Fix

## Practice Tips

- Check conditions

- Adjust case

- Output result
