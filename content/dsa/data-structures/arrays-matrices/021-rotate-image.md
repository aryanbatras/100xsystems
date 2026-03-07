---
title: "Rotate Image"
leetcode: "https://leetcode.com/problems/rotate-image/"
difficulty: "Medium"
tags: ["array", "matrix"]
---

## Problem

You are given an n x n 2D matrix representing an image, rotate the image by 90 degrees (clockwise).

You have to rotate the image in-place, which means you have to modify the input 2D matrix directly. DO NOT allocate another 2D matrix and do the rotation.

## Example

**Input:** matrix = [[1,2,3],[4,5,6],[7,8,9]]  
**Output:** [[7,4,1],[8,5,2],[9,6,3]]  

**Input:** matrix = [[5,1,9,11],[2,4,8,10],[13,3,6,7],[15,14,12,16]]  
**Output:** [[15,13,2,5],[14,3,4,1],[12,6,8,9],[16,7,10,11]]

**Input:** matrix = [[1]]  
**Output:** [[1]]

## Solution Approach

### Method 1: Transpose and Reverse Rows
1. Transpose the matrix: for i from 0 to n-1, for j from i+1 to n-1, swap matrix[i][j] and matrix[j][i]
2. Reverse each row: for each row, reverse the elements

### Method 2: Rotate in Cycles
1. For layer from 0 to n/2 - 1:
   - For i from layer to n - layer - 2:
     - Save top-left: temp = matrix[layer][i]
     - top-left = bottom-left: matrix[layer][i] = matrix[n-1-i][layer]
     - bottom-left = bottom-right: matrix[n-1-i][layer] = matrix[n-1-layer][n-1-i]
     - bottom-right = top-right: matrix[n-1-layer][n-1-i] = matrix[i][n-1-layer]
     - top-right = temp: matrix[i][n-1-layer] = temp

## Time Complexity

O(n^2) - Visit each element once.

## Space Complexity

O(1) - In-place rotation.

## Edge Cases

- **n = 1**: No rotation needed
- **n = 2**: Simple swaps
- **Odd n**: Center element stays
- **Empty matrix**: No operation

## Applications

- **Image Processing**: Rotate images
- **Graphics**: Transform coordinates
- **Game Development**: Object rotation
- **Matrix Operations**: Linear algebra

## Practice Tips

- Understand transpose operation
- Practice cycle rotation
- Handle boundaries carefully
- Visualize the rotation
