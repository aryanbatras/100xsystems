---
title: "Maximum Size Square Sub Matrix with All 1s"
difficulty: "Medium"
tags: ["dynamic-programming", "matrix", "array"]
---

## Problem

Given a binary matrix, find the side length of the largest square submatrix with all 1s.

## Example

**Input:** matrix = [[1,0,1,0,0],[1,0,1,1,1],[1,1,1,1,1],[1,0,0,1,0]]  
**Output:** 3  

**Input:** matrix = [[0,1],[1,1]]  
**Output:** 2  

**Input:** matrix = [[1]]  
**Output:** 1

## Solution Approach

### Method 1: DP
1. if not matrix: return 0
2. m, n = len(matrix), len(matrix[0])
3. dp = [[0] * n for _ in range(m)]
4. max_side = 0
5. for i in range(m):
   - for j in range(n):
     - if matrix[i][j] == 1:
       - if i == 0 or j == 0:
         - dp[i][j] = 1
       - else:
         - dp[i][j] = min(dp[i-1][j], dp[i][j-1], dp[i-1][j-1]) + 1
       - max_side = max(max_side, dp[i][j])
6. return max_side

## Time Complexity

O(m * n) - DP.

## Space Complexity

O(m * n) - DP table.

## Edge Cases

- **No 1s**: 0
- **Single 1**: 1
- **All 1s**: min(m,n)
- **Rows/columns of 1s**: min dimension

## Applications

- **Matrix Analysis**: Largest square
- **Image Processing**: Block detection
- **Dynamic Programming**: Submatrix problems
- **Interview Questions**: Common

## Practice Tips

- Fill DP table
- Min of three neighbors +1
- Track max side
- Test with small matrices
