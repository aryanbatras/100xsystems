---
title: "Rooms and Staircases"
codeforces: "https://codeforces.com/problemset/problem/1244/A"
difficulty: "Easy"
tags: ["implementation", "string", "counting"]
---

## Problem

Max rooms visible.

## Example

**Input:** 01010  

**Output:** 3  

## Solution Approach

### Method 1: Count Segments

s = input()

n = len(s)

max_rooms = 0

current = 0

for c in s:

    if c == '1':

        current += 1

        max_rooms = max(max_rooms, current)

    else:

        current = 0

print(max_rooms)

## Time Complexity

O(n) - Linear.

## Space Complexity

O(1).

## Edge Cases

- **All 0s**: 0

- **All 1s**: n

- **Single 1**: 1

- **Alternating**: 1

## Applications

- **String**: Segments

- **Rooms**: Max consecutive

## Practice Tips

- Track current 1s

- Update max

- Reset on 0
