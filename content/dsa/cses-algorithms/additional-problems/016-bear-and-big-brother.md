---
title: "Bear and Big Brother"
codeforces: "https://codeforces.com/problemset/problem/791/A"
difficulty: "Easy"
tags: ["implementation", "simulation", "growth"]
---

## Problem

Min years for bear to surpass brother.

## Example

**Input:** 4 7  

**Output:** 2  

## Solution Approach

### Method 1: Simulation
a, b = map(int, input().split())

years = 0

while a <= b:

    a *= 3

    b *= 2

    years += 1

print(years)

## Time Complexity

O(log max(a,b)) - Exponential growth.

## Space Complexity

O(1).

## Edge Cases

- **a > b**: 0
- **Equal**: 1
- **Large difference**: 0
- **Small a**: More years

## Applications

- **Simulation**: Growth
- **Comparison**: Surpass

## Practice Tips

- Loop while a <= b
- Multiply a by 3, b by 2
- Count years
