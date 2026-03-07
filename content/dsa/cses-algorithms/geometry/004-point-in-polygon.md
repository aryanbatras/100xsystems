---
title: "Point in Polygon"
cses: "https://cses.fi/problemset/task/2193"
difficulty: "Medium"
tags: ["implementation", "geometry", "point-in-polygon", "ray-casting"]
---

## Problem

Check if point is inside polygon.

## Example

**Input:** 4  
0 0  
1 0  
1 1  
0 1  
2  
0 0  
1 1  
**Output:** INSIDE  
INSIDE  

## Solution Approach

### Method 1: Ray Casting
def on_segment(p, q, r):
    if min(p[0], r[0]) <= q[0] <= max(p[0], r[0]) and min(p[1], r[1]) <= q[1] <= max(p[1], r[1]):
        return True
    return False

def orientation(p, q, r):
    val = (q[1] - p[1]) * (r[0] - q[0]) - (q[0] - p[0]) * (r[1] - q[1])
    if val == 0:
        return 0
    return 1 if val > 0 else 2

def do_intersect(p1, q1, p2, q2):
    o1 = orientation(p1, q1, p2)
    o2 = orientation(p1, q1, q2)
    o3 = orientation(p2, q2, p1)
    o4 = orientation(p2, q2, q1)
    if o1 != o2 and o3 != o4:
        return True
    if o1 == 0 and on_segment(p1, p2, q1):
        return True
    if o2 == 0 and on_segment(p1, q2, q1):
        return True
    if o3 == 0 and on_segment(p2, p1, q2):
        return True
    if o4 == 0 and on_segment(p2, q1, q2):
        return True
    return False

def is_inside(polygon, p):
    n = len(polygon)
    extreme = (10**9, p[1])
    count = 0
    i = 0
    while True:
        next = (i + 1) % n
        if do_intersect(polygon[i], polygon[next], p, extreme):
            if orientation(polygon[i], p, polygon[next]) == 0:
                return on_segment(polygon[i], p, polygon[next])
            count += 1
        i = next
        if i == 0:
            break
    return count % 2 == 1

for point in points:
    if is_inside(polygon, point):
        print("INSIDE")
    else:
        print("OUTSIDE")

## Time Complexity

O(n) per query - Ray casting.

## Space Complexity

O(n).

## Edge Cases

- **On boundary**: INSIDE
- **Outside**: OUTSIDE
- **Vertex**: INSIDE
- **Collinear**: Handle

## Applications

- **Geometry**: Point in polygon
- **Ray Casting**: Standard method
- **Computational Geometry**: Basic

## Practice Tips

- Implement ray casting
- Handle intersections
- Orientation
- Edge cases
