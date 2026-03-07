---
title: "Maximum Building I"
cses: "https://cses.fi/problemset/task/1147"
difficulty: "Medium"
tags: ["implementation", "grid", "histogram", "stack"]
---

## Problem

Maximum area of rectangle in binary grid.

## Example

**Input:** 4 5  
1 1 1 1 1  
1 1 1 0 1  
1 1 1 1 1  
1 0 0 1 1  
**Output:** 9  

## Solution Approach

### Method 1: Histogram for Each Row
def largest_rectangle_area(heights):
    stack = []
    max_area = 0
    for i in range(len(heights) + 1):
        h = heights[i] if i < len(heights) else 0
        while stack and heights[stack[-1]] > h:
            height = heights[stack.pop()]
            width = i if not stack else i - stack[-1] - 1
            max_area = max(max_area, height * width)
        stack.append(i)
    return max_area

max_area = 0
heights = [0] * m
for i in range(n):
    for j in range(m):
        if grid[i][j] == '1':
            heights[j] += 1
        else:
            heights[j] = 0
    max_area = max(max_area, largest_rectangle_area(heights))
print(max_area)

## Time Complexity

O(n*m) - Histogram.

## Space Complexity

O(m).

## Edge Cases

- **No 1s**: 0
- **All 1s**: n*m
- **Single 1**: 1
- **Column**: n

## Applications

- **Grids**: Rectangle area
- **Histogram**: Largest rectangle
- **Stack**: Monotonic

## Practice Tips

- Histogram per row
- Largest rectangle in histogram
- Stack for area
- Update heights
