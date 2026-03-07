---
title: "Find a Specific Pair in Matrix"
geeksforgeeks: "https://www.geeksforgeeks.org/find-a-specific-pair-in-matrix/"
difficulty: "Medium"
tags: ["array", "matrix", "dynamic-programming"]
---

## Problem

Given an n x n matrix mat[n][n] of integers, find the maximum value of mat[c][d] – mat[a][b] over all choices of indexes such that both c > a and d > b.

## Example

**Input:** mat = [[1, 2, -1, -4, -20],  
                [-8, -3, 4, 2, 1],  
                [3, 8, 6, 1, 3],  
                [-4, -1, 1, 7, -6],  
                [0, -4, 10, -5, 1]]  
**Output:** 18 (10 - (-8))

**Input:** mat = [[1, 2], [3, 4]]  
**Output:** 4 - 1 = 3

**Input:** mat = [[5]]  
**Output:** No valid pair

## Solution Approach

### Method 1: Brute Force
1. Initialize max_diff = -INF
2. For a from 0 to n-2:
   - For b from 0 to n-2:
     - For c from a+1 to n-1:
       - For d from b+1 to n-1:
         - max_diff = max(max_diff, mat[c][d] - mat[a][b])
3. Return max_diff

### Method 2: Dynamic Programming (Optimal)
1. Create suffix_max[n][n] where suffix_max[i][j] is the maximum in submatrix from (i,j) to (n-1,n-1)
2. suffix_max[n-1][n-1] = mat[n-1][n-1]
3. For i from n-2 downto 0:
   - For j from n-2 downto 0:
     - suffix_max[i][j] = max(mat[i][j], suffix_max[i+1][j], suffix_max[i][j+1], suffix_max[i+1][j+1])
4. Initialize max_diff = -INF
5. For a from 0 to n-2:
   - For b from 0 to n-2:
     - If a+1 < n and b+1 < n:
       - max_diff = max(max_diff, suffix_max[a+1][b+1] - mat[a][b])
6. Return max_diff

## Time Complexity

O(n^4) for brute force, O(n^2) for DP.

## Space Complexity

O(1) for brute, O(n^2) for DP.

## Edge Cases

- **n < 2**: No valid pair, return appropriate value
- **All equal elements**: Difference 0
- **Increasing matrix**: Small differences
- **Matrix with negatives**: Can have large positive differences

## Applications

- **Matrix Analysis**: Finding maximum differences
- **Optimization Problems**: Submatrix maximums
- **Game Theory**: Position differences
- **Data Analysis**: Range queries

## Practice Tips

- Understand the constraints c > a and d > b
- Use suffix maximum for efficiency
- Handle boundary cases
- Practice with small matrices
