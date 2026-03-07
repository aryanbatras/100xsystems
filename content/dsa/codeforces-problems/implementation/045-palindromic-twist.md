---
title: "Palindromic Twist"
codeforces: "https://codeforces.com/problemset/problem/1027/A"
difficulty: "Easy"
tags: ["implementation", "string", "palindrome"]
---

## Problem

Check if can make palindrome by changing chars.

## Example

**Input:** 2  
ab  
**Output:** YES  

## Solution Approach

### Method 1: Check Pairs

n = int(input())

s = input()

can = True

for i in range(n//2):

    diff = abs(ord(s[i]) - ord(s[n-1-i]))

    if diff != 0 and diff != 2 * k and s[i] != s[n-1-i]:

        can = False

        break

print("YES" if can else "NO")

## Time Complexity

O(n) - Linear.

## Space Complexity

O(1).

## Edge Cases

- **Already palindrome**: YES

- **k=0**: Only exact match

- **k large**: Always YES

- **Single char**: YES

## Applications

- **String**: Palindrome

- **Changes**: Limited

## Practice Tips

- Check each pair

- Allow changes within k

- Verify conditions
