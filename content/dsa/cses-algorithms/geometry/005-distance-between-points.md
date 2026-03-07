---
title: "Distance Between Points"
cses: "https://cses.fi/problemset/task/2194"
difficulty: "Easy"
tags: ["implementation", "geometry", "distance", "euclidean"]
---

## Problem

Compute distance between two points.

## Example

**Input:** 0 0 3 4  

**Output:** 5.000000  

## Solution Approach

### Method 1: Euclidean Distance
dx = x2 - x1
dy = y2 - y1
print((dx*dx + dy*dy)**0.5)

## Time Complexity

O(1) - Constant.

## Space Complexity

O(1).

## Edge Cases

- **Same point**: 0
- **Axis aligned**: dx or dy
- **Diagonal**: sqrt
- **Negative**: Abs

## Applications

- **Geometry**: Distance
- **Euclidean**: Standard
- **Algorithms**: Proximity

## Practice Tips

- Distance formula
- Floating point
- Handle precision
- Square root
