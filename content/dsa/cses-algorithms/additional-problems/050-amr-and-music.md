---
title: "Amr and Music"
codeforces: "https://codeforces.com/problemset/problem/507/A"
difficulty: "Easy"
tags: ["implementation", "array", "sorting", "greedy"]
---

## Problem

Max songs within time.

## Example

**Input:** 4 5  

1 2 3 4  

**Output:** 2  

1 2  

## Solution Approach

### Method 1: Sort and Select

n, k = map(int, input().split())

a = list(map(int, input().split()))

a = sorted((v, i+1) for i, v in enumerate(a))

songs = []

total = 0

for v, idx in a:

    if total + v <= k:

        total += v

        songs.append(idx)

    else:

        break

print(len(songs))

print(' '.join(map(str, songs)))

## Time Complexity

O(n log n) - Sorting.

## Space Complexity

O(n).

## Edge Cases

- **k=0**: 0

- **All fit**: n

- **None fit**: 0

- **Some fit**: Count

## Applications

- **Array**: Selection

- **Greedy**: Min time

## Practice Tips

- Sort by time

- Add until exceed

- Output count and indices
