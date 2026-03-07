---
title: "Monsters"
cses: "https://cses.fi/problemset/task/1194"
difficulty: "Medium"
tags: ["implementation", "graph", "bfs", "grid"]
---

## Problem

Player must escape monsters in grid, find shortest path.

## Example

**Input:** 5 8  
########  
#M.....#  
#......#  
#......#  
########  
**Output:** 10  
RRDDRRRRU  

**Input:** 1 1  
A  
**Output:** 0  

**Input:** 2 2  
M#  
#A  
**Output:** IMPOSSIBLE

## Solution Approach

### Method 1: Multi-source BFS
1. from collections import deque
2. monster_queue = deque()
3. player_queue = deque()
4. monster_dist = [[-1] * m for _ in range(n)]
5. player_dist = [[-1] * m for _ in range(n)]
6. dirs = [(-1,0),(1,0),(0,-1),(0,1)]
7. dir_char = ['U','D','L','R']
8. # Init monster BFS
9. for i in range(n):
   - for j in range(m):
     - if grid[i][j] == 'M':
       - monster_queue.append((i,j))
       - monster_dist[i][j] = 0
     - elif grid[i][j] == 'A':
       - player_queue.append((i,j))
       - player_dist[i][j] = 0
10. # Monster BFS
11. while monster_queue:
   - i,j = monster_queue.popleft()
   - for di,dj in dirs:
     - ni,nj = i+di, j+dj
     - if 0<=ni<n and 0<=nj<m and grid[ni][nj] != '#' and monster_dist[ni][nj] == -1:
       - monster_dist[ni][nj] = monster_dist[i][j] + 1
       - monster_queue.append((ni,nj))
12. # Player BFS with path
13. parent = [[None] * m for _ in range(n)]
14. found = False
15. end_i, end_j = -1, -1
16. while player_queue:
   - i,j = player_queue.popleft()
   - if i == 0 or i == n-1 or j == 0 or j == m-1:
     - found = True
     - end_i, end_j = i, j
     - break
   - for d, (di,dj) in enumerate(dirs):
     - ni,nj = i+di, j+dj
     - if 0<=ni<n and 0<=nj<m and grid[ni][nj] != '#' and player_dist[ni][nj] == -1 and (monster_dist[ni][nj] == -1 or player_dist[i][j] + 1 < monster_dist[ni][nj]):
       - player_dist[ni][nj] = player_dist[i][j] + 1
       - parent[ni][nj] = (i,j, dir_char[d])
       - player_queue.append((ni,nj))
17. if not found:
   - print("IMPOSSIBLE")
18. else:
   - path = []
   - current = end_i, end_j
   - while current[0] != -1:
     - i,j,d = parent[current[0]][current[1]]
     - if d:
       - path.append(d)
     - current = i,j
   - path.reverse()
   - print(len(path))
   - print(''.join(path))

## Time Complexity

O(n * m) - BFS.

## Space Complexity

O(n * m) - Queues and dist.

## Edge Cases

- **No escape**: IMPOSSIBLE
- **Direct escape**: Short path
- **Monsters block**: Avoid
- **Corner**: 0

## Applications

- **Grid**: Multi-agent
- **BFS**: Monster first
- **Path**: Player second

## Practice Tips

- Monster BFS first
- Player BFS with condition
- Reconstruct path
- Check boundaries
