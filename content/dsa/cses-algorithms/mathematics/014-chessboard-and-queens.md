---
title: "Chessboard and Queens"
cses: "https://cses.fi/problemset/task/1624"
difficulty: "Medium"
tags: ["implementation", "backtracking", "chess", "n-queens"]
---

## Problem

Count ways to place 8 queens on 8x8 board with obstacles.

## Example

**Input:** 8 lines of board  
........  
........  
........  
........  
........  
........  
........  
........  
**Output:** 92  

## Solution Approach

### Method 1: Backtracking
def is_safe(board, row, col):

    # Check column

    for i in range(row):

        if board[i][col] == 'Q':

            return False

    # Check diagonal

    for i, j in zip(range(row-1, -1, -1), range(col-1, -1, -1)):

        if board[i][j] == 'Q':

            return False

    for i, j in zip(range(row-1, -1, -1), range(col+1, 8)):

        if board[i][j] == 'Q':

            return False

    return True

def solve(board, row, count):

    if row == 8:

        count[0] += 1

        return

    for col in range(8):

        if board[row][col] == '.' and is_safe(board, row, col):

            board[row][col] = 'Q'

            solve(board, row+1, count)

            board[row][col] = '.'

count = [0]

solve(board, 0, count)

print(count[0])

## Time Complexity

O(8!) - Backtracking.

## Space Complexity

O(8).

## Edge Cases

- **No obstacles**: 92

- **Some blocked**: Less

- **All blocked**: 0

- **Standard**: N-queens

## Applications

- **Backtracking**: N-queens

- **Chess**: Queen placement

- **Algorithms**: Constraint satisfaction

## Practice Tips

- Backtracking for placement

- Check safety

- Recurse on rows

- Count solutions
