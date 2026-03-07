---
title: "Minimum Falling Path Sum"
leetcode: "https://leetcode.com/problems/minimum-falling-path-sum/"
difficulty: "Medium"
tags: ["dynamic-programming", "array"]
---

## Problem

Given an n x n array of integers matrix, return the minimum sum of any falling path through matrix. A falling path starts at any element in the first row and chooses the element in the next row that is either directly below or diagonally left/right.

## Example

**Input:** matrix = [[2,1,3],[6,5,4],[7,8,9]]  
**Output:** 13 (1 + 4 + 8)  

**Input:** matrix = [[-19,57],[-40,-5]]  
**Output:** -61 (-19 + -40 -5? Wait, -19 + -40 = -59, -19 + -5 = -24, min -59)  

**Input:** matrix = [[1]]  
**Output:** 1

## Solution Approach

### Method 1: DP
1. n = len(matrix)
2. for i in range(1, n):
   - for j in range(n):
     - left = matrix[i-1][j-1] if j > 0 else float('inf')
     - mid = matrix[i-1][j]
     - right = matrix[i-1][j+1] if j < n-1 else float('inf')
     - matrix[i][j] += min(left, mid, right)
3. return min(matrix[n-1])

## Time Complexity

O(n^2) - DP.

## Space Complexity

O(1) - In place.

## Edge Cases

- **n = 1**: min of first row
- **All positive**: minimum path
- **Negative numbers**: may choose negatives
- **Boundaries**: handle j=0 and j=n-1

## Applications

- **Path Finding**: Minimum sum path
- **Dynamic Programming**: Matrix DP
- **Optimization**: Falling paths
- **Interview Questions**: Common

## Practice Tips

- Modify matrix in place
- Consider three choices
- Return min of last row
- Test with small matrices
