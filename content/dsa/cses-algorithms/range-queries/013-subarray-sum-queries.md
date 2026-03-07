---
title: "Subarray Sum Queries"
cses: "https://cses.fi/problemset/task/1190"
difficulty: "Medium"
tags: ["implementation", "fenwick-tree", "segment-tree", "range-sum"]
---

## Problem

Support subarray sum queries and point updates.

## Example

**Input:** 8 4  
1 2 3 4 5 6 7 8  
2 2 5  
1 3 1  
2 1 4  
2 2 5  
**Output:** 14  
10  
15  

**Input:** 5 3  
1 1 1 1 1  
2 1 5  
1 3 2  
2 1 5  
**Output:** 5  
7  

**Input:** 1 1  
10  
2 1 1  
**Output:** 10

## Solution Approach

### Method 1: Fenwick Tree
1. ft = Fenwick(n+1)
2. for i in range(n):
   - ft.update(i+1, a[i])
3. for query in queries:
   - if type == 1:
     - ft.update(idx, val - a[idx-1])
     - a[idx-1] = val
   - else:
     - print(ft.query(r) - ft.query(l-1))

## Time Complexity

O((n + q) log n) - Operations.

## Space Complexity

O(n) - Fenwick tree.

## Edge Cases

- **l=1**: ft.query(r)
- **r=n**: ft.query(n) - ft.query(l-1)
- **Single element**: Update/query
- **No updates**: Static

## Applications

- **Arrays**: Dynamic sums
- **Prefix Sum**: Efficient queries
- **Updates**: Point updates

## Practice Tips

- Fenwick tree implementation
- Update with difference
- Query prefix sums
- Handle 1-based indexing
