---
title: "N Queen"
leetcode: "https://leetcode.com/problems/n-queens/"
difficulty: "Hard"
tags: ["array", "backtracking"]
---

## Problem

The n-queens puzzle is the problem of placing n queens on an n x n chessboard such that no two queens attack each other. Given an integer n, return all distinct solutions to the n-queens puzzle. You may return the answer in any order.

## Example

**Input:** n = 4  
**Output:** [[".Q..","...Q","Q...","..Q."],["..Q.","Q...","...Q",".Q.."]]  

**Input:** n = 1  
**Output:** [["Q"]]  

**Input:** n = 2  
**Output:** []

## Solution Approach

### Method 1: Backtracking
1. board = [['.' for _ in range(n)] for _ in range(n)]
2. result = []
3. def backtrack(row):
   - if row == n:
     - result.append([''.join(r) for r in board])
     - return
   - for col in range(n):
     - if is_safe(row, col):
       - board[row][col] = 'Q'
       - backtrack(row + 1)
       - board[row][col] = '.'
4. def is_safe(r, c):
   - for i in range(r):
     - if board[i][c] == 'Q':
       - return False
   - for i, j in zip(range(r-1, -1, -1), range(c-1, -1, -1)):
     - if board[i][j] == 'Q':
       - return False
   - for i, j in zip(range(r-1, -1, -1), range(c+1, n)):
     - if board[i][j] == 'Q':
       - return False
   - return True
5. backtrack(0)
6. return result

## Time Complexity

O(n!) - Exponential.

## Space Complexity

O(n^2) - Board.

## Edge Cases

- **n = 1**: [["Q"]]
- **n = 2**: []
- **n = 3**: []
- **n = 8**: 92 solutions

## Applications

- **Chess Problems**: Queen placement
- **Backtracking**: Constraint satisfaction
- **Combinatorial**: Permutations
- **Interview Questions**: Hard

## Practice Tips

- Place one queen per row
- Check column and diagonals
- Use board or sets for optimization
- Collect all solutions
