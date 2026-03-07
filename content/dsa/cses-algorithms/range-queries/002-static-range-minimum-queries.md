---
title: "Static Range Minimum Queries"
cses: "https://cses.fi/problemset/task/1647"
difficulty: "Easy"
tags: ["implementation", "sparse-table", "range-queries"]
---

## Problem

Given an array and multiple range minimum queries, find the minimum in range l to r.

## Example

**Input:** 8 4  
1 2 3 4 5 6 7 8  
2 5  
3 3  
1 8  
2 2  
**Output:** 2  
3  
1  
2  

**Input:** 5 3  
5 4 3 2 1  
1 5  
2 4  
3 3  
**Output:** 1  
2  
3  

**Input:** 1 1  
10  
1 1  
**Output:** 10

## Solution Approach

### Method 1: Sparse Table
1. log = [0] * (n + 1)
2. for i in range(2, n + 1):
   - log[i] = log[i // 2] + 1
3. st = [[0] * (log[n] + 1) for _ in range(n)]
4. for i in range(n):
   - st[i][0] = a[i]
5. for j in range(1, log[n] + 1):
   - for i in range(n - (1 << j) + 1):
     - st[i][j] = min(st[i][j-1], st[i + (1 << (j-1))][j-1])
6. def query(l, r):
   - k = log[r - l + 1]
   - return min(st[l][k], st[r - (1 << k) + 1][k])
7. for l, r in queries:
   - print(query(l-1, r-1))

## Time Complexity

O(n log n + q) - Preprocess + queries.

## Space Complexity

O(n log n) - Sparse table.

## Edge Cases

- **l = r**: a[l-1]
- **Whole array**: min(a)
- **Single element**: a[0]
- **Adjacent**: min of two

## Applications

- **Arrays**: Range minimum
- **Sparse Table**: Fast queries
- **Static**: No updates

## Practice Tips

- Precompute log
- Build sparse table
- Query with k
- Handle 0-based indexing
