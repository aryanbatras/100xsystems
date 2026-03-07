---
title: "Fix You"
codeforces: "https://codeforces.com/problemset/problem/1365/A"
difficulty: "Easy"
tags: ["implementation", "string", "palindrome"]
---

## Problem

Make string palindrome by changing one char.

## Example

**Input:** abba  

**Output:** abba  

## Solution Approach

### Method 1: Check Palindrome
s = input()

n = len(s)

for i in range(n//2):

    if s[i] != s[n-1-i]:

        # Change s[i] to s[n-1-i]

        s = s[:i] + s[n-1-i] + s[i+1:]

        break

print(s)

## Time Complexity

O(n) - Linear.

## Space Complexity

O(n).

## Edge Cases

- **Already palindrome**: Same
- **Need change**: Change first mismatch
- **Odd length**: Middle ok
- **All same**: Same

## Applications

- **String**: Palindrome
- **Change**: One char

## Practice Tips

- Check for mismatches
- Change first one
- Output result
