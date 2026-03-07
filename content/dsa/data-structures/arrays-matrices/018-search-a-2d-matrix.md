---
title: "Search a 2D Matrix"
leetcode: "https://leetcode.com/problems/search-a-2d-matrix/"
difficulty: "Medium"
tags: ["array", "matrix", "binary-search"]
---

## Problem

You are given an m x n integer matrix matrix with the following two properties:

- Each row is sorted in non-decreasing order.
- The first integer of each row is greater than the last integer of the previous row.

Given an integer target, return true if target is in matrix or false otherwise.

You must write a solution in O(log(m * n)) time complexity.

## Example

**Input:** matrix = [[1,3,5,7],[10,11,16,20],[23,30,34,60]], target = 3  
**Output:** true  

**Input:** matrix = [[1,3,5,7],[10,11,16,20],[23,30,34,60]], target = 13  
**Output:** false

**Input:** matrix = [[1]], target = 1  
**Output:** true

## Solution Approach

### Method 1: Binary Search on Flattened Array
1. Treat the 2D matrix as a 1D array of size m*n
2. Perform binary search:
   - low = 0, high = m*n - 1
   - While low <= high:
     - mid = low + (high - low) / 2
     - row = mid / n, col = mid % n
     - If matrix[row][col] == target, return true
     - Else if matrix[row][col] < target, low = mid + 1
     - Else high = mid - 1
3. Return false

### Method 2: Binary Search on Rows
1. Use binary search to find the row where target could be (based on first element of row)
2. Perform binary search in that row

## Time Complexity

O(log(m * n)) - Binary search on m*n elements.

## Space Complexity

O(1) - Constant space.

## Edge Cases

- **Target < matrix[0][0]**: false
- **Target > matrix[m-1][n-1]**: false
- **Matrix 1x1**: Check the single element
- **Target in first row**: true
- **Empty matrix**: false

## Applications

- **Database Search**: Efficient lookup in sorted data
- **File Systems**: Block search
- **Memory Management**: Address translation
- **Algorithm Libraries**: Standard search functions

## Practice Tips

- Treat matrix as 1D for binary search
- Calculate row and column from mid index
- Handle integer division carefully
- Practice with different matrix sizes
