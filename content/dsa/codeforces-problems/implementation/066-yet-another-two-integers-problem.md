---
title: "Yet Another Two Integers Problem"
codeforces: "https://codeforces.com/problemset/problem/1409/A"
difficulty: "Easy"
tags: ["implementation", "math", "operations"]
---

## Problem

Min operations to make a == b.

## Example

**Input:** 1 10  

**Output:** 1  

## Solution Approach

### Method 1: Calculate

a, b = map(int, input().split())

diff = abs(a - b)

print((diff + 9) // 10)

## Time Complexity

O(1) - Constant.

## Space Complexity

O(1).

## Edge Cases

- **Equal**: 0

- **Diff <10**: 1

- **Diff=10**: 1

- **Large diff**: Ceiling

## Applications

- **Math**: Operations

- **Difference**: Min steps

## Practice Tips

- Abs difference

- (diff + 9) // 10

- Output result
