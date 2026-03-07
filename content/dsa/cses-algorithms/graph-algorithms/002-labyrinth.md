---
title: "Labyrinth"
cses: "https://cses.fi/problemset/task/1193"
difficulty: "Easy"
tags: ["implementation", "graph", "bfs", "grid"]
---

## Problem

Find the shortest path from A to B in a grid with walls.

## Example

**Input:** 5 8  
########  
#......#  
#......#  
#......#  
########  
**Output:** 10  
URRRRRRD  

**Input:** 1 1  
A  
**Output:** 0  

**Input:** 2 2  
A#  
#B  
**Output:** IMPOSSIBLE

## Solution Approach

### Method 1: BFS
1. from collections import deque
2. queue = deque([(si, sj, '')])
3. visited = set([(si, sj)])
4. dirs = {'U': (-1, 0), 'D': (1, 0), 'L': (0, -1), 'R': (0, 1)}
5. while queue:
   - i, j, path = queue.popleft()
   - if grid[i][j] == 'B':
     - print(len(path))
     - print(path)
     - return
   - for d, (di, dj) in dirs.items():
     - ni, nj = i + di, j + dj
     - if 0 <= ni < n and 0 <= nj < m and grid[ni][nj] != '#' and (ni, nj) not in visited:
       - visited.add((ni, nj))
       - queue.append((ni, nj, path + d))
6. print("IMPOSSIBLE")

## Time Complexity

O(n * m) - BFS.

## Space Complexity

O(n * m) - Queue and visited.

## Edge Cases

- **A and B adjacent**: 1
- **No path**: IMPOSSIBLE
- **Same cell**: 0
- **Walls block**: BFS

## Applications

- **Grid**: Shortest path
- **BFS**: Unweighted
- **Path finding**: Directions

## Practice Tips

- BFS from A
- Track path
- Use directions
- Find B
