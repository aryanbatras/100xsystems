---
title: "Finding Borders"
cses: "https://cses.fi/problemset/task/1732"
difficulty: "Easy"
tags: ["implementation", "string", "kmp", "borders"]
---

## Problem

Find all border lengths of string.

## Example

**Input:** aabaabaa  

**Output:** 0 1 3 5  

## Solution Approach

### Method 1: KMP Prefix Table
def compute_prefix(s):

    n = len(s)

    pi = [0] * n

    j = 0

    for i in range(1, n):

        while j > 0 and s[i] != s[j]:

            j = pi[j-1]

        if s[i] == s[j]:

            j += 1

        pi[i] = j

    return pi

pi = compute_prefix(s)

borders = set()

j = pi[-1]

while j > 0:

    borders.add(j)

    j = pi[j-1]

borders.add(0)

print(' '.join(map(str, sorted(borders))))

## Time Complexity

O(n) - KMP.

## Space Complexity

O(n) - Prefix table.

## Edge Cases

- **No borders**: 0

- **Whole string**: n

- **Repeated**: All

- **Single char**: 0

## Applications

- **Strings**: Borders

- **KMP**: Prefix function

- **Algorithms**: String matching

## Practice Tips

- Compute pi

- Follow pi for borders

- Handle duplicates

- Output sorted
