---
title: "OR in Matrix"
codeforces: "https://codeforces.com/problemset/problem/1365/B"
difficulty: "Easy"
tags: ["implementation", "matrix", "permutation"]
---

## Problem

Check if matrix has at most one 1 per row and column.

## Example

**Input:** 2 2  

1 0  

0 1  

**Output:** YES  

## Solution Approach

### Method 1: Count 1s

n, m = map(int, input().split())

matrix = [list(map(int, input().split())) for _ in range(n)]

row_count = [0] * n

col_count = [0] * m

for i in range(n):

    for j in range(m):

        if matrix[i][j] == 1:

            row_count[i] += 1

            col_count[j] += 1

if all(c <= 1 for c in row_count) and all(c <= 1 for c in col_count):

    print("YES")

else:

    print("NO")

## Time Complexity

O(n*m) - Scan.

## Space Complexity

O(n+m).

## Edge Cases

- **All 0**: YES

- **One 1**: YES

- **Two in row**: NO

- **Two in column**: NO

## Applications

- **Matrix**: Constraints

- **Permutation**: Check

## Practice Tips

- Count per row and column

- Check <=1

- Output YES/NO
