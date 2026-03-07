---
title: "Diverse Substring"
codeforces: "https://codeforces.com/problemset/problem/1358/A"
difficulty: "Easy"
tags: ["implementation", "string", "sliding-window"]
---

## Problem

Find substring with no repeating chars.

## Example

**Input:** abcda  

**Output:** abcd  

## Solution Approach

### Method 1: Sliding Window

s = input()

n = len(s)

left = 0

seen = set()

max_len = 0

result = ""

for right in range(n):

    while s[right] in seen:

        seen.remove(s[left])

        left += 1

    seen.add(s[right])

    if right - left + 1 > max_len:

        max_len = right - left + 1

        result = s[left:right+1]

print(result)

## Time Complexity

O(n) - Sliding window.

## Space Complexity

O(1) - Set size 26.

## Edge Cases

- **All unique**: Whole string

- **All same**: Single char

- **No unique**: Single char

## Applications

- **String**: Unique chars

- **Sliding Window**: Max length

## Practice Tips

- Use set for chars

- Move window

- Track max

Yes.
