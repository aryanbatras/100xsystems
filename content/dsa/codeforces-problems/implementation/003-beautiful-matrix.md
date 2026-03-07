---
title: "Beautiful Matrix"
codeforces: "https://codeforces.com/problemset/problem/263/A"
difficulty: "Easy"
tags: ["implementation", "grid", "manhattan"]
---

## Problem

Find moves to center the 1 in 5x5 grid.

## Example

**Input:**  
0 0 0 0 0  
0 0 0 0 0  
0 0 0 0 0  
0 0 0 0 0  
0 0 1 0 0  
**Output:** 3  

## Solution Approach

### Method 1: Find Position
row, col = -1, -1
for i in range(5):
    line = list(map(int, input().split()))
    if 1 in line:
        row = i
        col = line.index(1)
moves = abs(2 - row) + abs(2 - col)
print(moves)

## Time Complexity

O(1) - Constant.

## Space Complexity

O(1).

## Edge Cases

- **Center**: 0
- **Corner**: 4
- **Edge**: 2 or 3

## Applications

- **Grid**: Position finding
- **Manhattan**: Distance

## Practice Tips

- Read grid
- Find 1
- Calculate distance
