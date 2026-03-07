---
title: "Rotten Oranges"
leetcode: "https://leetcode.com/problems/rotting-oranges/"
difficulty: "Medium"
tags: ["array", "breadth-first-search", "matrix"]
---

## Problem

You are given an m x n grid where each cell can have one of three values: 0 representing an empty cell, 1 representing a fresh orange, or 2 representing a rotten orange. Every minute, any fresh orange that is 4-directionally adjacent to a rotten orange becomes rotten. Return the minimum number of minutes that must elapse until no cell has a fresh orange. If this is impossible, return -1.

## Example

**Input:** grid = [[2,1,1],[1,1,0],[0,1,1]]  
**Output:** 4  

**Input:** grid = [[2,1,1],[0,1,1],[1,0,1]]  
**Output:** -1  

**Input:** grid = [[0,2]]  
**Output:** 0

## Solution Approach

### Method 1: BFS Multisource
1. from collections import deque
2. queue = deque()
3. fresh = 0
4. for i in range(len(grid)):
   - for j in range(len(grid[0])):
     - if grid[i][j] == 2:
       - queue.append((i, j, 0))
     - elif grid[i][j] == 1:
       - fresh += 1
5. if fresh == 0: return 0
6. dirs = [(-1,0),(1,0),(0,-1),(0,1)]
7. while queue:
   - i, j, time = queue.popleft()
   - for di, dj in dirs:
     - ni, nj = i + di, j + dj
     - if 0 <= ni < len(grid) and 0 <= nj < len(grid[0]) and grid[ni][nj] == 1:
       - grid[ni][nj] = 2
       - fresh -= 1
       - queue.append((ni, nj, time + 1))
8. return time if fresh == 0 else -1

## Time Complexity

O(m*n) - Grid cells.

## Space Complexity

O(m*n) - Queue.

## Edge Cases

- **No fresh oranges**: 0
- **All rotten**: 0
- **Impossible**: -1
- **Single cell**: 0 or -1

## Applications

- **Grid Problems**: Propagation
- **BFS**: Multisource
- **Matrices**: Adjacent updates
- **Interview Questions**: Medium

## Practice Tips

- Queue all rotten initially
- Count fresh oranges
- BFS with time
- Check if all rotten
