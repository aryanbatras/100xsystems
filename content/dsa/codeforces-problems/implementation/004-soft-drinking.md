---
title: "Soft Drinking"
codeforces: "https://codeforces.com/problemset/problem/151/A"
difficulty: "Easy"
tags: ["implementation", "math", "min"]
---

## Problem

Calculate max toasts possible.

## Example

**Input:** 3 4 5 10 8 100 3 1  

**Output:** 2  

## Solution Approach

### Method 1: Min Calculation
n, k, l, c, d, p, nl, np = map(int, input().split())

drink = k * l // nl

lime = c * d

salt = p // np

toasts = min(drink, lime, salt) // n

print(toasts)

## Time Complexity

O(1) - Constant.

## Space Complexity

O(1).

## Edge Cases

- **Large ingredients**: High toasts
- **Small n**: Low toasts
- **Zero**: 0

## Applications

- **Math**: Calculations
- **Min**: Constraints

## Practice Tips

- Read inputs
- Compute each limit
- Take min per person
