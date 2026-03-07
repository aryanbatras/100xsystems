---
title: "Present from Lena"
codeforces: "https://codeforces.com/problemset/problem/118/B"
difficulty: "Easy"
tags: ["implementation", "grid", "pattern"]
---

## Problem

Print the present pattern.

## Example

**Input:** 2  

**Output:**  

0 0 1 0 0  

0 1 2 1 0  

1 2 3 2 1  

0 1 2 1 0  

0 0 1 0 0  

## Solution Approach

### Method 1: Generate Pattern

n = int(input())

size = 2*n + 1

for i in range(size):

    for j in range(size):

        val = n - max(abs(i - n), abs(j - n))

        print(max(0, val), end=' ')

    print()

## Time Complexity

O(n^2) - Printing.

## Space Complexity

O(1).

## Edge Cases

- **n=0**: 0

- **n=1**: Small pattern

- **Large n**: Big grid

## Applications

- **Grid**: Pattern generation

- **Math**: Distance

## Practice Tips

- Calculate for each cell

- Use max and abs

- Print grid
