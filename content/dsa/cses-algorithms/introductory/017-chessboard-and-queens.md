---
title: "Chessboard and Queens"
cses: "https://cses.fi/problemset/task/1624"
difficulty: "Easy"
tags: ["implementation", "backtracking"]
---

## Problem

Your task is to place eight queens on a chessboard so that no two queens are attacking each other. As an additional challenge, each square is either free or reserved, and you can only place queens on the free squares. However, the reserved squares do not prevent queens from attacking each other.

## Example

**Input:** 8x8 board with some '.' and '*'  
**Output:** Number of ways  

**Input:** Standard 8 queens  
**Output:** 92

## Solution Approach

### Method 1: Backtracking
1. board = [input() for _ in range(8)]
2. cols = [False] * 8
3. diag1 = [False] * 15
4. diag2 = [False] * 15
5. count = 0
6. def place(row):
   - nonlocal count
   - if row == 8:
     - count += 1
     - return
   - for col in range(8):
     - if board[row][col] == '.' and not cols[col] and not diag1[row - col + 7] and not diag2[row + col]:
       - cols[col] = True
       - diag1[row - col + 7] = True
       - diag2[row + col] = True
       - place(row + 1)
       - cols[col] = False
       - diag1[row - col + 7] = False
       - diag2[row + col] = False
7. place(0)
8. print(count)

## Time Complexity

O(8!) - Backtracking.

## Space Complexity

O(1) - Fixed size.

## Edge Cases

- **No obstacles**: 92
- **Obstacles**: Fewer
- **Impossible**: 0
- **Blocked rows**: 0

## Applications

- **Backtracking**: N queens
- **Chess**: Queen placement
- **Implementation**: Constraints

## Practice Tips

- One queen per row
- Check free squares
- Track columns, diagonals
- Count solutions
