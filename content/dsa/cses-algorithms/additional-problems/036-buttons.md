---
title: "Buttons"
codeforces: "https://codeforces.com/problemset/problem/268/B"
difficulty: "Easy"
tags: ["implementation", "math", "combinatorics"]
---

## Problem

Count ways to press buttons.

## Example

**Input:** 1  

**Output:** 1  

## Solution Approach

### Method 1: Calculate Sum

n = int(input())

ans = 0

for i in range(1, n+1):

    ans += i * (n - i + 1)

print(ans)

## Time Complexity

O(n) - Loop.

## Space Complexity

O(1).

## Edge Cases

- **n=1**: 1

- **n=2**: 1+2=3

- **Large n**: Sum

## Applications

- **Math**: Sum

- **Buttons**: Ways

## Practice Tips

- Loop i to n

- Add i * (n-i+1)

- Output sum
