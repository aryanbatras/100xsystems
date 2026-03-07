---
title: "Forest Queries II"
cses: "https://cses.fi/problemset/task/1739"
difficulty: "Medium"
tags: ["implementation", "2d-fenwick-tree", "range-updates", "point-queries"]
---

## Problem

2D grid with updates and point queries.

## Example

**Input:** 4 3  
*...  
....  
.*..  
....  
1 1  
3 1  
2 3  
**Output:** *  
.  
*  

## Solution Approach

### Method 1: 2D Fenwick Tree
class Fenwick2D:
    def __init__(self, n, m):
        self.ft = [[0] * (m + 1) for _ in range(n + 1)]
    
    def update(self, x, y, val):
        i, j = x, y
        while i < len(self.ft):
            j = y
            while j < len(self.ft[0]):
                self.ft[i][j] += val
                j += j & -j
            i += i & -i
    
    def query(self, x, y):
        res = 0
        i, j = x, y
        while i > 0:
            j = y
            while j > 0:
                res += self.ft[i][j]
                j -= j & -j
            i -= i & -i
        return res

ft = Fenwick2D(n, m)
for i in range(n):
    for j in range(m):
        if grid[i][j] == '*':
            ft.update(i+1, j+1, 1)

for query in queries:
    if type == 1:
        x, y = pos
        current = 1 if grid[x-1][y-1] == '*' else 0
        ft.update(x, y, 1 - current)
        grid[x-1][y-1] = '*' if current == 0 else '.'
    else:
        x, y = pos
        print('*' if ft.query(x, y) % 2 == 1 else '.')

## Time Complexity

O((n*m + q) log² n) - Operations.

## Space Complexity

O(n*m).

## Edge Cases

- **Empty grid**: No
- **Single cell**: Update/query
- **Boundaries**: 1 to n
- **Multiple updates**: Correct state

## Applications

- **2D Arrays**: Point updates and queries
- **Fenwick Tree**: 2D extension
- **Range Sums**: 2D prefix

## Practice Tips

- 2D Fenwick tree
- Update points
- Query points
- Handle grid states
