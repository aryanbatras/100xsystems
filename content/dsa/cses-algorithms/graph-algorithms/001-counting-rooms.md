---
title: "Counting Rooms"
cses: "https://cses.fi/problemset/task/1192"
difficulty: "Easy"
tags: ["implementation", "graph", "dfs", "bfs"]
---

## Problem

Count the number of rooms in a grid, where rooms are separated by walls.

## Example

**Input:** 5 8  
########  
#..#...#  
####.#.#  
#..#...#  
########  
**Output:** 3  

**Input:** 1 1  
.  
**Output:** 1  

**Input:** 1 1  
#  
**Output:** 0

## Solution Approach

### Method 1: DFS
1. def dfs(i, j):
   - if 0 <= i < n and 0 <= j < m and grid[i][j] == '.':
     - grid[i][j] = '#'
     - dfs(i+1, j)
     - dfs(i-1, j)
     - dfs(i, j+1)
     - dfs(i, j-1)
2. count = 0
3. for i in range(n):
   - for j in range(m):
     - if grid[i][j] == '.':
       - dfs(i, j)
       - count += 1
4. print(count)

## Time Complexity

O(n * m) - Grid traversal.

## Space Complexity

O(n * m) - Recursion stack.

## Edge Cases

- **All walls**: 0
- **All floors**: 1
- **Single cell**: 1 or 0
- **Disconnected**: Count

## Applications

- **Grid**: Connected components
- **DFS**: Flood fill
- **Counting**: Rooms

## Practice Tips

- DFS on grid
- Mark visited
- Count components
- Handle boundaries
