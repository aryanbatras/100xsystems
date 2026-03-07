---
title: "Dynamic Range Sum Queries"
cses: "https://cses.fi/problemset/task/1648"
difficulty: "Easy"
tags: ["implementation", "fenwick-tree", "segment-tree"]
---

## Problem

Given an array, support updates to elements and range sum queries.

## Example

**Input:** 8 4  
1 2 3 4 5 6 7 8  
2 2 5  
3 1 3  
1 1 4  
2 2 4  
**Output:** 14  
6  
10  

**Input:** 5 3  
1 2 3 4 5  
2 1 5  
1 1 1  
2 1 5  
**Output:** 15  
16  

**Input:** 1 2  
10  
2 1 1  
1 1 5  
**Output:** 10  
5

## Solution Approach

### Method 1: Fenwick Tree
1. class Fenwick:
   - def __init__(self, n):
     - self.tree = [0] * (n + 1)
   - def update(self, idx, val):
     - while idx < len(self.tree):
       - self.tree[idx] += val
       - idx += idx & -idx
   - def query(self, idx):
     - res = 0
     - while idx > 0:
       - res += self.tree[idx]
       - idx -= idx & -idx
     - return res
2. ft = Fenwick(n)
3. for i in range(n):
   - ft.update(i + 1, a[i])
4. for type, x, y in queries:
   - if type == 1:
     - ft.update(x, y - a[x-1])
     - a[x-1] = y
   - else:
     - print(ft.query(y) - ft.query(x-1))

## Time Complexity

O((n + q) log n) - Updates and queries.

## Space Complexity

O(n) - Fenwick tree.

## Edge Cases

- **No updates**: Static sums
- **All updates**: Dynamic
- **Single element**: Update/query
- **Whole range**: Sum all

## Applications

- **Arrays**: Dynamic sums
- **Fenwick Tree**: Efficient updates
- **Range Queries**: Prefix sums

## Practice Tips

- Implement Fenwick tree
- Update with difference
- Query prefix sums
- Handle 1-based indexing
