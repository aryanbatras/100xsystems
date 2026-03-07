---
title: "Chocolates"
codeforces: "https://codeforces.com/problemset/problem/168/A"
difficulty: "Easy"
tags: ["implementation", "math", "greedy"]
---

## Problem

Max chocolates.

## Example

**Input:** 10 2 3  

**Output:** 16  

## Solution Approach

### Method 1: Calculate

n, a, b = map(int, input().split())

full = n // a

extra = min(n % a, b - 1)

print(full * b + extra)

## Time Complexity

O(1) - Constant.

## Space Complexity

O(1).

## Edge Cases

- **n < a**: 0

- **b=1**: n

- **n % a =0**: full * b

## Applications

- **Math**: Calculation

- **Greedy**: Max

## Practice Tips

- Compute full and extra

- Add chocolates

- Handle limits
