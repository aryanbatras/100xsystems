---
title: "Convex Hull"
cses: "https://cses.fi/problemset/task/2195"
difficulty: "Medium"
tags: ["implementation", "geometry", "convex-hull", "graham-scan"]
---

## Problem

Compute convex hull of points.

## Example

**Input:** 6  
2 1  
2 5  
3 3  
4 3  
4 1  
3 2  
**Output:** 4  
2 1  
4 1  
4 3  
2 5  

## Solution Approach

### Method 1: Graham Scan
def orientation(p, q, r):
    val = (q[1] - p[1]) * (r[0] - q[0]) - (q[0] - p[0]) * (r[1] - q[1])
    if val == 0:
        return 0
    return 1 if val > 0 else 2

def convex_hull(points):
    n = len(points)
    if n < 3:
        return points
    
    # Find the bottommost point
    min_idx = 0
    for i in range(1, n):
        if points[i][1] < points[min_idx][1] or (points[i][1] == points[min_idx][1] and points[i][0] < points[min_idx][0]):
            min_idx = i
    
    # Swap
    points[0], points[min_idx] = points[min_idx], points[0]
    
    # Sort by polar angle
    p0 = points[0]
    points[1:] = sorted(points[1:], key=lambda p: (orientation(p0, p, points[1] if len(points) > 1 else p), (p[0] - p0[0])**2 + (p[1] - p0[1])**2))
    
    # Build hull
    hull = [points[0], points[1]]
    for p in points[2:]:
        while len(hull) >= 2 and orientation(hull[-2], hull[-1], p) <= 0:
            hull.pop()
        hull.append(p)
    
    return hull

hull = convex_hull(points)
print(len(hull))
for p in hull:
    print(p[0], p[1])

## Time Complexity

O(n log n) - Sorting.

## Space Complexity

O(n).

## Edge Cases

- **Collinear**: Include all
- **All same**: Single point
- **Line**: Two points
- **Triangle**: Three points

## Applications

- **Geometry**: Convex hull
- **Computational Geometry**: Basic
- **Algorithms**: Sorting based

## Practice Tips

- Sort points
- Build hull
- Handle collinear
- Output format
