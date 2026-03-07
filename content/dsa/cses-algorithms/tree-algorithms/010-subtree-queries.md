---
title: "Subtree Queries"
cses: "https://cses.fi/problemset/task/1137"
difficulty: "Medium"
tags: ["implementation", "tree", "euler-tour", "fenwick-tree", "subtree"]
---

## Problem

Subtree sum queries and point updates.

## Example

**Input:** 5 3  
4 2 5 2 1  
1 2  
1 3  
3 4  
3 5  
2 3  
1 5 3  
2 2  
**Output:** 11  
5  
9  

**Input:** 3 2  
1 1 1  
1 2  
1 3  
2 1  
1 2 2  
2 1  
**Output:** 1  
3  

**Input:** 1 1  
10  
2 1  
**Output:** 10

## Solution Approach

### Method 1: Euler Tour + Fenwick Tree
1. def euler_tour(node, parent):
   - entry[node] = timer
   - timer += 1
   - for child in graph[node]:
     - if child != parent:
       - euler_tour(child, node)
   - exit[node] = timer - 1
2. ft = Fenwick(n+1)
3. for i in range(1, n+1):
   - ft.update(entry[i] + 1, a[i])
4. for query in queries:
   - if type == 1:
     - # Update a[idx] to val
     - ft.update(entry[idx] + 1, val - a[idx])
     - a[idx] = val
   - else:
     - # Sum in subtree of idx
     - print(ft.query(exit[idx] + 1) - ft.query(entry[idx]))

## Time Complexity

O(n log n + q log n) - Euler tour and queries.

## Space Complexity

O(n) - Fenwick tree and arrays.

## Edge Cases

- **Root subtree**: Whole tree
- **Leaf subtree**: Single node
- **Updates**: Change values
- **Multiple queries**: Correct sums

## Applications

- **Trees**: Subtree operations
- **Euler Tour**: Flatten tree
- **Fenwick Tree**: Range queries

## Practice Tips

- Euler tour technique
- Entry and exit times
- Fenwick tree for sums
- Handle updates and queries
