---
title: "Soldier and Bananas"
codeforces: "https://codeforces.com/problemset/problem/546/A"
difficulty: "Easy"
tags: ["implementation", "math", "arithmetic"]
---

## Problem

Min money needed to buy bananas.

## Example

**Input:** 3 10 4  

**Output:** 13  

## Solution Approach

### Method 1: Arithmetic Sum
k, n, w = map(int, input().split())

cost = k * w * (w + 1) // 2

if cost > n:

    print(cost - n)

else:

    print(0)

## Time Complexity

O(1) - Constant.

## Space Complexity

O(1).

## Edge Cases

- **w=1**: k
- **Enough money**: 0
- **Large w**: Sum

## Applications

- **Math**: Arithmetic series
- **Cost calculation**: Total

## Practice Tips

- Calculate total cost
- Compare with money
- Output difference
