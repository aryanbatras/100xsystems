---
title: "Arrival of the General"
codeforces: "https://codeforces.com/problemset/problem/144/A"
difficulty: "Easy"
tags: ["implementation", "array", "max-min"]
---

## Problem

Min moves to rearrange soldiers.

## Example

**Input:** 5  

3 4 1 2 5  

**Output:** 3  

## Solution Approach

### Method 1: Find Positions
max_val = max(a)

min_val = min(a)

max_pos = a.index(max_val)

min_pos = len(a) - 1 - a[::-1].index(min_val)

moves = max_pos + (len(a) - 1 - min_pos)

if max_pos > min_pos:

    moves -= 1

print(moves)

## Time Complexity

O(n) - Linear.

## Space Complexity

O(1).

## Edge Cases

- **Sorted ascending**: 0
- **Sorted descending**: n-1
- **Max and min adjacent**: 0

## Applications

- **Array**: Position finding
- **Max-min**: Rearrangement

## Practice Tips

- Find max and min positions
- Calculate moves
- Adjust if overlap
