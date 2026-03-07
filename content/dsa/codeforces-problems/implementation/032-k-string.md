---
title: "k-String"
codeforces: "https://codeforces.com/problemset/problem/219/A"
difficulty: "Easy"
tags: ["implementation", "string", "repeating"]
---

## Problem

Check if string is k-string.

## Example

**Input:** 2  

aabb  

**Output:** YES  

## Solution Approach

### Method 1: Check Repeating

k = int(input())

s = input()

n = len(s)

if n % k != 0:

    print("NO")

else:

    part_len = n // k

    part = s[:part_len]

    for i in range(1, k):

        if s[i*part_len:(i+1)*part_len] != part:

            print("NO")

            break

    else:

        print("YES")

## Time Complexity

O(n) - Linear.

## Space Complexity

O(n).

## Edge Cases

- **k=1**: YES

- **Not divisible**: NO

- **Different parts**: NO

- **Same parts**: YES

## Applications

- **String**: Repeating

- **k times**: Substring

## Practice Tips

- Check length divisible

- Compare parts

- Output YES/NO
