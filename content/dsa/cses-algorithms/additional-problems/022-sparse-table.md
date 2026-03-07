---
title: "Sparse Table"
cses: "https://cses.fi/problemset/task/1647"
difficulty: "Easy"
tags: ["implementation", "sparse-table", "range-minimum", "preprocessing"]
---

## Problem

Range minimum queries.

## Example

**Input:** 8 4  
1 2 3 4 5 6 7 8  
2 1 8  
3 2 5  
4 3 6  
1 1 1  
**Output:** 1  
2  
3  
1  

## Solution Approach

### Method 1: Sparse Table
LOG = 20  # log(1e5)

st = [[0] * LOG for _ in range(n)]

for i in range(n):

    st[i][0] = a[i]

for j in range(1, LOG):

    for i in range(n - (1 << j) + 1):

        st[i][j] = min(st[i][j-1], st[i + (1 << (j-1))][j-1])

def query(l, r):

    k = 0

    while (1 << (k + 1)) <= r - l + 1:

        k += 1

    return min(st[l][k], st[r - (1 << k) + 1][k])

for l, r in queries:

    print(query(l-1, r-1))

## Time Complexity

O(n log n + q) - Preprocess and queries.

## Space Complexity

O(n log n).

## Edge Cases

- **l=r**: a[l]

- **Whole array**: min(a)

- **Single element**: itself

- **Large range**: min

## Applications

- **Arrays**: Range queries

- **Sparse Table**: Fast queries

- **Static Arrays**: Preprocessing

## Practice Tips

- Build sparse table

- Query with log

- Handle indices

- Efficient min
