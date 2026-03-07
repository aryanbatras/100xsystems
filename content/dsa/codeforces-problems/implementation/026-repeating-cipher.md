---
title: "Repeating Cipher"
codeforces: "https://codeforces.com/problemset/problem/1095/A"
difficulty: "Easy"
tags: ["implementation", "string", "decoding"]
---

## Problem

Decode the repeating cipher.

## Example

**Input:** 5  

T h i s i s a t e s t m e s s a g e  

**Output:** Thisisatestmessage  

## Solution Approach

### Method 1: Build String
n = int(input())

s = input().replace(' ', '')

result = []

i = 0

j = 0

while i < len(s):

    result.append(s[i])

    j += 1

    i += j

print(''.join(result))

## Time Complexity

O(n) - Linear.

## Space Complexity

O(n).

## Edge Cases

- **n=1**: First char
- **Short string**: All
- **Long string**: Pattern

## Applications

- **String**: Decoding
- **Pattern**: Repeating

## Practice Tips

- Build result step by step
- Increase step
- Handle end
