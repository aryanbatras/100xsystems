---
title: "Number of Distinct Islands [dfs multisource]"
difficulty: "Medium"
tags: ["array", "depth-first-search", "breadth-first-search", "union-find", "hash-table", "matrix"]
---

## Problem

Given a non-empty 2D array grid of 0's and 1's, an island is a group of 1's (representing land) connected 4-directionally (horizontal or vertical). You may assume all four edges of the grid are surrounded by water. Count the number of distinct islands. Two islands are considered the same if one can be translated (not rotated or reflected) to equal the other.

## Example

**Input:** grid = [[1,1,0,0,0],[1,1,0,0,0],[0,0,0,1,1],[0,0,0,1,1]]  
**Output:** 1 (both islands same shape)  

**Input:** grid = [[1,1,0,1,1],[1,0,0,0,0],[0,0,0,0,1],[1,1,0,1,1]]  
**Output:** 3  

**Input:** grid = [[1,1],[1,1]]  
**Output:** 1

## Solution Approach

### Method 1: DFS with Path
1. def numDistinctIslands(grid):
   - if not grid or not grid[0]: return 0
   - m, n = len(grid), len(grid[0])
   - islands = set()
   - def dfs(i, j, path, di, dj):
     - if 0 <= i < m and 0 <= j < n and grid[i][j] == 1:
       - grid[i][j] = 0
       - path.append((di, dj))
       - dfs(i+1, j, path, di+1, dj)
       - dfs(i-1, j, path, di-1, dj)
       - dfs(i, j+1, path, di, dj+1)
       - dfs(i, j-1, path, di, dj-1)
       - path.append((-1, -1))  # delimiter
   - for i in range(m):
     - for j in range(n):
       - if grid[i][j] == 1:
         - path = []
         - dfs(i, j, path, 0, 0)
         - islands.add(tuple(path))
   - return len(islands)

## Time Complexity

O(m*n) - Grid cells.

## Space Complexity

O(m*n) - Set and path.

## Edge Cases

- **No islands**: 0
- **All connected**: 1
- **Same shapes**: 1
- **Different shapes**: Count

## Applications

- **Grid Problems**: Island shapes
- **DFS**: Path recording
- **Hash Sets**: Unique shapes
- **Interview Questions**: Medium

## Practice Tips

- DFS to mark visited
- Record relative positions
- Use tuple for path
- Add to set
