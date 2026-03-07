---
title: "Forest Queries"
cses: "https://cses.fi/problemset/task/1652"
difficulty: "Easy"
tags: ["implementation", "2d-prefix-sum", "range-queries"]
---

## Problem

Given a forest grid with trees (*), answer rectangle sum queries.

## Example

**Input:** 4 7  
.*..*.  
.*.....  
...*..*  
*......  
2  
2 2 3 4  
3 1 3 4  

**Output:** 3  
2  

**Input:** 1 1  
.  
1  
1 1 1 1  
**Output:** 0

## Solution Approach

### Method 1: 2D Prefix Sum
1. prefix = [[0] * (m + 1) for _ in range(n + 1)]
2. for i in range(1, n + 1):
   - for j in range(1, m + 1):
     - prefix[i][j] = prefix[i-1][j] + prefix[i][j-1] - prefix[i-1][j-1] + (grid[i-1][j-1] == '*')
3. for queries:
   - x1, y1, x2, y2 = query
   - print(prefix[x2][y2] - prefix[x1-1][y2] - prefix[x2][y1-1] + prefix[x1-1][y1-1])

## Time Complexity

O(n*m + q) - Build + queries.

## Space Complexity

O(n*m) - Prefix.

## Edge Cases

- **No trees**: 0
- **Whole grid**: Total trees
- **Single cell**: 1 or 0
- **Adjacent**: Sum

## Applications

- **2D Arrays**: Range sums
- **Prefix Sum**: 2D extension
- **Queries**: Rectangle sums

## Practice Tips

- Build 2D prefix
- Query rectangle
- Handle 1-based indexing
- Sum trees
