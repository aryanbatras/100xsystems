---
title: "Petr and Book"
codeforces: "https://codeforces.com/problemset/problem/139/A"
difficulty: "Easy"
tags: ["implementation", "array", "simulation"]
---

## Problem

Max pages Petr can read.

## Example

**Input:** 5  

1 2 3 4 5  

**Output:** 3  

## Solution Approach

### Method 1: Simulate Days

n = int(input())

a = list(map(int, input().split()))

day = 0

while n > 0:

    day = (day % 7) + 1

    n -= a[day - 1]

print(day)

## Time Complexity

O(n) - Worst case.

## Space Complexity

O(1).

## Edge Cases

- **n=0**: 0

- **Small n**: Early day

- **Large n**: Cycle

## Applications

- **Simulation**: Days

- **Reading**: Pages

## Practice Tips

- Loop days

- Subtract pages

- Handle week cycle
