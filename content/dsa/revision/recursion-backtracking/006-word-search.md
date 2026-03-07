---
title: "Word Search"
leetcode: "https://leetcode.com/problems/word-search/"
difficulty: "Medium"
tags: ["array", "backtracking", "matrix"]
---

## Problem

Given an m x n grid of characters board and a string word, return true if word exists in the grid. The word can be constructed from letters of sequentially adjacent cells, where adjacent cells are horizontally or vertically neighboring. The same letter cell may not be used more than once.

## Example

**Input:** board = [["A","B","C","E"],["S","F","C","S"],["A","D","E","E"]], word = "ABCCED"  
**Output:** true  

**Input:** board = [["A","B","C","E"],["S","F","C","S"],["A","D","E","E"]], word = "SEE"  
**Output:** true  

**Input:** board = [["A","B","C","E"],["S","F","C","S"],["A","D","E","E"]], word = "ABCB"  
**Output:** false

## Solution Approach

### Method 1: Backtracking
1. m, n = len(board), len(board[0])
2. def dfs(i, j, k):
   - if k == len(word):
     - return True
   - if i < 0 or i >= m or j < 0 or j >= n or board[i][j] != word[k]:
     - return False
   - temp = board[i][j]
   - board[i][j] = ''
   - found = dfs(i+1, j, k+1) or dfs(i-1, j, k+1) or dfs(i, j+1, k+1) or dfs(i, j-1, k+1)
   - board[i][j] = temp
   - return found
3. for i in range(m):
   - for j in range(n):
     - if dfs(i, j, 0):
       - return True
4. return False

## Time Complexity

O(m*n*4^L) - L word length.

## Space Complexity

O(L) - Recursion depth.

## Edge Cases

- **Word not present**: false
- **Word length 1**: Check if in board
- **Word longer than board**: false
- **Multiple paths**: Find one

## Applications

- **Grid Search**: Word finding
- **Backtracking**: Path exploration
- **Matrix**: Adjacent cells
- **Interview Questions**: Medium

## Practice Tips

- Start from each cell
- DFS with visited (modify board)
- Check bounds and match
- Restore board after
