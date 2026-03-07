---
title: "Range Update Queries"
cses: "https://cses.fi/problemset/task/1651"
difficulty: "Medium"
tags: ["implementation", "segment-tree", "fenwick-tree", "range-updates"]
---

## Problem

Given an array, support range add operations and point queries.

## Example

**Input:** 5 3  
1 2 3 4 5  
1 3 6  
2 3  
1 2 5  
**Output:** 2  
9  
4  

**Input:** 4 2  
1 1 1 1  
1 1 4  
2 2  
**Output:** 1  
5  

**Input:** 1 1  
10  
1 1 5  
**Output:** 10

## Solution Approach

### Method 1: Fenwick Tree for Difference
1. ft = Fenwick(n+1)
2. a = [0] + a  # 1-based
3. for i in range(1, len(a)):
   - ft.update(i, a[i])
   - ft.update(i+1, -a[i])
4. for type, x, y in queries:
   - if type == 1:
     - ft.update(x, y)
     - ft.update(y+1, -y)
   - else:
     - print(ft.query(x))

## Time Complexity

O((n + q) log n) - Updates and queries.

## Space Complexity

O(n) - Fenwick tree.

## Edge Cases

- **No updates**: Original values
- **Multiple updates**: Accumulate
- **Point updates**: Range of 1
- **Whole range**: Add to all

## Applications

- **Arrays**: Range updates
- **Fenwick Tree**: Difference array
- **Lazy Propagation**: Alternative

## Practice Tips

- Use difference array
- Fenwick for prefix sums
- Handle range updates
- Point queries
