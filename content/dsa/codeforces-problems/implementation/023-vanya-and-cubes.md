---
title: "Vanya and Cubes"
codeforces: "https://codeforces.com/problemset/problem/492/A"
difficulty: "Easy"
tags: ["implementation", "math", "binary-search"]
---

## Problem

Max height of pyramid.

## Example

**Input:** 25  

**Output:** 4  

## Solution Approach

### Method 1: Loop or Binary Search
n = int(input())

h = 0

total = 0

while True:

    h += 1

    total += h * (h + 1) // 2

    if total > n:

        print(h - 1)

        break

## Time Complexity

O(sqrt n) - Loop.

## Space Complexity

O(1).

## Edge Cases

- **n=1**: 1
- **n=2**: 1
- **n=3**: 1
- **n=4**: 2

## Applications

- **Math**: Sum of sums
- **Pyramid**: Height

## Practice Tips

- Loop h
- Add cubes
- Check total
