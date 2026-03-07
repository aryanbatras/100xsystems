---
title: "Floor Number"
codeforces: "https://codeforces.com/problemset/problem/1426/A"
difficulty: "Easy"
tags: ["implementation", "math", "floor"]
---

## Problem

Find floor number for apartment.

## Example

**Input:** 4 3  

**Output:** 2  

## Solution Approach

### Method 1: Calculate

n, x = map(int, input().split())

if n <= 2:

    print(1)

else:

    n -= 2

    floor = (n + x - 1) // x + 1

    print(floor)

## Time Complexity

O(1) - Constant.

## Space Complexity

O(1).

## Edge Cases

- **n=1**: 1

- **n=2**: 1

- **n=3**: 2

- **Large n**: Correct floor

## Applications

- **Math**: Calculation

- **Apartment**: Floor

## Practice Tips

- Handle n<=2

- Calculate floor

- Output number
