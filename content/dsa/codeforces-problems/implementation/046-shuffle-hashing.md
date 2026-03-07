---
title: "Shuffle Hashing"
codeforces: "https://codeforces.com/problemset/problem/1278/A"
difficulty: "Easy"
tags: ["implementation", "string", "sorting"]
---

## Problem

Check if strings are equal after shuffling.

## Example

**Input:** abacaba  

abc  

**Output:** YES  

## Solution Approach

### Method 1: Sort and Compare

p = input()

h = input()

if len(p) > len(h):

    print("NO")

else:

    p_sorted = sorted(p)

    for i in range(len(h) - len(p) + 1):

        if sorted(h[i:i+len(p)]) == p_sorted:

            print("YES")

            exit()

    print("NO")

## Time Complexity

O(n log n + m log m) - Sorting.

## Space Complexity

O(n + m).

## Edge Cases

- **p longer**: NO

- **Exact match**: YES

- **Shuffled**: YES

- **No match**: NO

## Applications

- **String**: Anagrams

- **Sorting**: Compare

## Practice Tips

- Sort p

- Check windows in h

- Compare sorted
