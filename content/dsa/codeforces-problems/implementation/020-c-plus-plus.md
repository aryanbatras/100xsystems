---
title: "C++"
codeforces: "https://codeforces.com/problemset/problem/282/A"
difficulty: "Easy"
tags: ["implementation", "string", "counting"]
---

## Problem

Simulate C++ operations.

## Example

**Input:** 1  

++  

**Output:** ++  

## Solution Approach

### Method 1: Count Operations
x = 0

n = int(input())

for _ in range(n):

    s = input()

    if '++' in s:

        x += 1

    else:

        x -= 1

print(x)

## Time Complexity

O(n) - Linear.

## Space Complexity

O(1).

## Edge Cases

- **All ++**: n
- **All --**: -n
- **Mixed**: Difference

## Applications

- **Simulation**: Operations
- **Counting**: ++ and --

## Practice Tips

- Read statements
- Count ++ and --
- Output final value
