---
title: "Sudoku Solver"
leetcode: "https://leetcode.com/problems/sudoku-solver/"
difficulty: "Hard"
tags: ["array", "backtracking", "matrix"]
---

## Problem

Write a program to solve a Sudoku puzzle by filling the empty cells. A sudoku solution must satisfy all of the following rules: Each of the digits 1-9 must occur exactly once in each row. Each of the digits 1-9 must occur exactly once in each column. Each of the digits 1-9 must occur exactly once in each of the 9 3x3 sub-boxes of the grid.

## Example

**Input:** board = [["5","3",".",".","7",".",".",".","."],["6",".",".","1","9","5",".",".","."],[".","9","8",".",".",".",".","6","."],["8",".",".",".","6",".",".",".","3"],["4",".",".","8",".","3",".",".","1"],["7",".",".",".","2",".",".",".","6"],[".","6",".",".",".",".","2","8","."],[".",".",".","4","1","9",".",".","5"],[".",".",".",".","8",".",".","7","9"]]  
**Output:** Solved board  

**Input:** board = [["."]]  
**Output:** [["1"]]

## Solution Approach

### Method 1: Backtracking
1. def solve(board):
   - for row in range(9):
     - for col in range(9):
       - if board[row][col] == '.':
         - for num in '1' to '9':
           - if is_valid(board, row, col, num):
             - board[row][col] = num
             - if solve(board):
               - return True
             - board[row][col] = '.'
         - return False
   - return True

2. def is_valid(board, row, col, num):
   - for i in range(9):
     - if board[row][i] == num or board[i][col] == num:
       - return False
   - box_row = (row // 3) * 3
   - box_col = (col // 3) * 3
   - for i in range(3):
     - for j in range(3):
       - if board[box_row + i][box_col + j] == num:
         - return False
   - return True

## Time Complexity

O(9^k) - k empty cells.

## Space Complexity

O(1) - Board modification.

## Edge Cases

- **Already solved**: True
- **No solution**: False
- **Single cell**: Fill
- **Complex**: Backtrack

## Applications

- **Sudoku**: Solving puzzles
- **Backtracking**: Constraint satisfaction
- **Matrix**: Row/col/box checks
- **Interview Questions**: Hard problem

## Practice Tips

- Check validity for row, col, box
- Try numbers 1-9
- Recurse on next empty
- Backtrack on failure
