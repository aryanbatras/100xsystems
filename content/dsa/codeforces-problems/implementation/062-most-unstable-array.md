---
title: "Most Unstable Array"
codeforces: "https://codeforces.com/problemset/problem/1353/A"
difficulty: "Easy"
tags: ["implementation", "math", "array"]
---

## Problem

Max min difference in array.

## Example

**Input:** 3 1 2  

**Output:** 2  

## Solution Approach

### Method 1: Max of Options

n, a, b = map(int, input().split())

if n == 1:

    print(0)

else:

    print(max(a, b))

## Time Complexity

O(1) - Constant.

## Space Complexity

O(1).

## Edge Cases

- **n=1**: 0

- **n=2**: Max

- **Large n**: Max

## Applications

- **Array**: Unstable

- **Math**: Max min

## Practice Tips

- If n==1, 0

- Else max(a,b)

- Output result
