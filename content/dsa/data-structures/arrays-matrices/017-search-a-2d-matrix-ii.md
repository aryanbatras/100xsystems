---
title: "Search a 2D Matrix II"
leetcode: "https://leetcode.com/problems/search-a-2d-matrix-ii/"
difficulty: "Medium"
tags: ["array", "matrix", "binary-search"]
---

## Problem

Write an efficient algorithm that searches for a value in an m x n matrix. This matrix has the following properties:

- Integers in each row are sorted in ascending from left to right.

- Integers in each column are sorted in ascending from top to bottom.

## Example

**Input:** matrix = [[1,4,7,11],[2,5,8,12],[3,6,9,16]], target = 5  
**Output:** true  

**Input:** matrix = [[1,4,7,11],[2,5,8,12],[3,6,9,16]], target = 13  
**Output:** false

**Input:** matrix = [[1]], target = 1  
**Output:** true

## Solution Approach

### Method 1: Start from Top-Right Corner
1. Start from top-right corner: i = 0, j = n-1
2. While i < m and j >= 0:
   - If matrix[i][j] == target, return true
   - If matrix[i][j] > target, move left: j--
   - If matrix[i][j] < target, move down: i++

## Time Complexity

O(m + n) - Worst case traverses m + n cells.

## Space Complexity

O(1) - Constant space.

## Edge Cases

- **Target not in matrix**: false
- **Empty matrix**: false
- **Single element**: Check if matches
- **Target smaller than all**: false
- **Target larger than all**: false

## Applications

- **Database Search**: Multi-dimensional search
- **Image Processing**: Pixel value search
- **Game Maps**: Coordinate search
- **Optimization Problems**: Efficient lookups

## Practice Tips

- Understand the diagonal movement
- Start from correct corner
- Handle boundary conditions
- Practice with different matrix sizes
