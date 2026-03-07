---
title: "Minimal Square"
codeforces: "https://codeforces.com/problemset/problem/1360/A"
difficulty: "Easy"
tags: ["implementation", "math", "geometry"]
---

## Problem

Min square side to cover two rectangles.

## Example

**Input:** 1 2 3 4  

**Output:** 4  

## Solution Approach

### Method 1: Max of Options

a, b, c, d = map(int, input().split())

side1 = a + c

side2 = b + d

side3 = max(a + d, b + c)

print(min(side1, side2, side3))

## Time Complexity

O(1) - Constant.

## Space Complexity

O(1).

## Edge Cases

- **Small rectangles**: Sum sides

- **Large**: Max

- **Square**: Side

## Applications

- **Geometry**: Covering

- **Math**: Min side

## Practice Tips

- Calculate three options

- Take min

- Output side
