---
title: "Tram"
codeforces: "https://codeforces.com/problemset/problem/116/A"
difficulty: "Easy"
tags: ["implementation", "simulation", "max"]
---

## Problem

Find max passengers in tram.

## Example

**Input:** 4  

0 3  

2 5  

4 2  

4 0  

**Output:** 6  

## Solution Approach

### Method 1: Simulation
n = int(input())

current = 0

max_pass = 0

for _ in range(n):

    a, b = map(int, input().split())

    current -= a

    current += b

    max_pass = max(max_pass, current)

print(max_pass)

## Time Complexity

O(n) - Linear.

## Space Complexity

O(1).

## Edge Cases

- **No passengers**: 0
- **Increasing**: Final
- **Decreasing**: Max at start

## Applications

- **Simulation**: Passenger flow
- **Max**: Peak capacity

## Practice Tips

- Track current
- Update max
- Handle exits and enters
