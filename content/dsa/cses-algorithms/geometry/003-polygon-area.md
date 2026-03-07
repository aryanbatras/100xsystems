---
title: "Polygon Area"
cses: "https://cses.fi/problemset/task/2191"
difficulty: "Easy"
tags: ["implementation", "geometry", "polygon", "area"]
---

## Problem

Compute area of polygon.

## Example

**Input:** 4  
0 0  
1 0  
1 1  
0 1  
**Output:** 1  

## Solution Approach

### Method 1: Shoelace Formula
area = 0
n = len(points)
for i in range(n):
    j = (i + 1) % n
    area += points[i][0] * points[j][1]
    area -= points[j][0] * points[i][1]
print(abs(area) / 2)

## Time Complexity

O(n) - Linear.

## Space Complexity

O(n).

## Edge Cases

- **Triangle**: 0.5
- **Square**: side^2
- **Concave**: Negative, take abs
- **Collinear**: 0

## Applications

- **Geometry**: Polygon area
- **Shoelace**: Standard
- **Computational Geometry**: Basic

## Practice Tips

- Shoelace formula
- Sum products
- Absolute value
- Handle coordinates
