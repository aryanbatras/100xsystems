---
title: "Spiral Matrix"
leetcode: "https://leetcode.com/problems/spiral-matrix/"
difficulty: "Medium"
tags: ["array", "matrix"]
---

## Problem

Given an m x n matrix, return all elements of the matrix in spiral order.

## Example

**Input:** matrix = [[1,2,3],[4,5,6],[7,8,9]]  
**Output:** [1,2,3,6,9,8,7,4,5]  

**Input:** matrix = [[1,2,3,4],[5,6,7,8],[9,10,11,12]]  
**Output:** [1,2,3,4,8,12,11,10,9,5,6,7]

**Input:** matrix = [[1]]  
**Output:** [1]

## Solution Approach

### Method 1: Layer by Layer Traversal
1. Initialize boundaries: top = 0, bottom = m-1, left = 0, right = n-1
2. While top <= bottom and left <= right:
   - Traverse right: for col from left to right, add matrix[top][col], then top++
   - Traverse down: for row from top to bottom, add matrix[row][right], then right--
   - Traverse left (if needed): if top <= bottom, for col from right to left, add matrix[bottom][col], then bottom--
   - Traverse up (if needed): if left <= right, for row from bottom to top, add matrix[row][left], then left++

## Time Complexity

O(m * n) - Visit each element once.

## Space Complexity

O(1) - Excluding output space.

## Edge Cases

- **1x1 matrix**: Single element
- **1xN matrix**: The single row
- **Nx1 matrix**: The single column
- **Empty matrix**: Empty result

## Applications

- **Matrix Printing**: Spiral order display
- **Image Processing**: Pixel traversal
- **Game Development**: Grid traversal
- **Algorithm Visualization**: Demonstrate traversal patterns

## Practice Tips

- Carefully manage boundary updates
- Handle rectangular matrices
- Visualize the spiral path
- Practice with different sizes
