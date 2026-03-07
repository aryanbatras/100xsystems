---
title: "Set Matrix Zeroes"
leetcode: "https://leetcode.com/problems/set-matrix-zeroes/"
difficulty: "Medium"
tags: ["array", "matrix"]
---

## Problem

Given an m x n integer matrix, if an element is 0, set its entire row and column to 0's.

You must do it in place.

## Example

**Input:** matrix = [[1,1,1],[1,0,1],[1,1,1]]  
**Output:** [[1,0,1],[0,0,0],[1,0,1]]  

**Input:** matrix = [[0,1,2,0],[3,4,5,2],[1,3,1,5]]  
**Output:** [[0,0,0,0],[0,4,5,0],[0,3,1,0]]

**Input:** matrix = [[1,2,3,4],[5,6,7,8],[9,10,11,12]]  
**Output:** [[1,2,3,4],[5,6,7,8],[9,10,11,12]] (no zeros)

## Solution Approach

### Method 1: Use Extra Space
1. Use two sets: row_set, col_set
2. Traverse the matrix, if matrix[i][j] == 0, add i to row_set, j to col_set
3. Traverse again, if i in row_set or j in col_set, set matrix[i][j] = 0

### Method 2: Use First Row and Column as Markers (Optimal)
1. Check if first row has zero: row_zero = True if any matrix[0][j] == 0
2. Check if first column has zero: col_zero = True if any matrix[i][0] == 0
3. For i in 1 to m-1, j in 1 to n-1:
   - If matrix[i][j] == 0, set matrix[i][0] = 0, matrix[0][j] = 0
4. For i in 1 to m-1:
   - If matrix[i][0] == 0, set row i to 0
5. For j in 1 to n-1:
   - If matrix[0][j] == 0, set column j to 0
6. If row_zero, set row 0 to 0
7. If col_zero, set column 0 to 0

## Time Complexity

O(m * n) - Two passes through the matrix.

## Space Complexity

O(m + n) for sets, O(1) for markers.

## Edge Cases

- **No zeros**: Matrix unchanged
- **First row has zero**: Set entire first row
- **First column has zero**: Set entire first column
- **Zero at (0,0)**: Set both first row and column
- **Single element zero**: Set entire matrix to zero

## Applications

- **Matrix Operations**: Zero propagation
- **Sparse Matrix Handling**: Mark dependencies
- **Data Cleaning**: Null value handling
- **Image Processing**: Pixel zeroing

## Practice Tips

- Use first row and column as flags
- Handle the first row and column separately
- Avoid overwriting flags prematurely
- Practice with different zero positions
