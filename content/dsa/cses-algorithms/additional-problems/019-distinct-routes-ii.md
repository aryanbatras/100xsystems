---
title: "Distinct Routes II"
cses: "https://cses.fi/problemset/task/1711"
difficulty: "Hard"
tags: ["implementation", "graph", "dp", "matrix-exponentiation", "paths"]
---

## Problem

Count distinct paths from a to b with length k.

## Example

**Input:** 4 4 3  
1 2  
2 3  
3 4  
1 4  
1 4  
**Output:** 2  

## Solution Approach

### Method 1: Matrix Exponentiation
def matrix_mult(a, b):
    n = len(a)
    c = [[0] * n for _ in range(n)]
    for i in range(n):
        for j in range(n):
            for k in range(n):
                c[i][j] += a[i][k] * b[k][j]
    return c

def matrix_pow(mat, exp):
    n = len(mat)
    res = [[1 if i == j else 0 for j in range(n)] for i in range(n)]
    while exp > 0:
        if exp % 2 == 1:
            res = matrix_mult(res, mat)
        mat = matrix_mult(mat, mat)
        exp //= 2
    return res

adj = [[0] * n for _ in range(n)]
for u, v in edges:
    adj[u-1][v-1] = 1

powered = matrix_pow(adj, k)
print(powered[a-1][b-1])

## Time Complexity

O(n^3 log k) - Matrix exponentiation.

## Space Complexity

O(n^2).

## Edge Cases

- **k=0**: 1 if a==b
- **No path**: 0
- **Direct edge**: 1 if k=1
- **Cycles**: Multiple paths

## Applications

- **Graphs**: Path counts
- **Matrix**: Exponentiation
- **DP**: Paths

## Practice Tips

- Adjacency matrix
- Matrix power
- Extract count
- Handle large k
