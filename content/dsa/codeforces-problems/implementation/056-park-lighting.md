---
title: "Park Lighting"
codeforces: "https://codeforces.com/problemset/problem/1358/A"
difficulty: "Easy"
tags: ["implementation", "math", "grid"]
---

## Problem

Min lamps to light park.

## Example

**Input:** 2 2  

**Output:** 2  

## Solution Approach

### Method 1: Ceiling Division

n, m = map(int, input().split())

print((n * m + 1) // 2)

## Time Complexity

O(1) - Constant.

## Space Complexity

O(1).

## Edge Cases

- **1x1**: 1

- **1x2**: 1

- **2x2**: 2

- **Odd total**: Ceiling

## Applications

- **Grid**: Lighting

- **Math**: Min lamps

## Practice Tips

- Calculate (n*m + 1) // 2

- Output result
