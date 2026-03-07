---
title: "Dynamic Range Minimum Queries"
cses: "https://cses.fi/problemset/task/1649"
difficulty: "Easy"
tags: ["implementation", "segment-tree", "range-queries"]
---

## Problem

Given an array, support updates to elements and range minimum queries.

## Example

**Input:** 8 4  
1 2 3 4 5 6 7 8  
2 2 5  
3 1 3  
1 1 4  
2 2 4  
**Output:** 2  
3  
1  

**Input:** 5 3  
5 4 3 2 1  
2 1 5  
1 1 1  
2 1 5  
**Output:** 1  
1  

**Input:** 1 2  
10  
2 1 1  
1 1 5  
**Output:** 10  
5

## Solution Approach

### Method 1: Segment Tree
1. class SegmentTree:
   - def __init__(self, n):
     - self.tree = [float('inf')] * (4 * n)
     - self.n = n
   - def build(self, a, node, start, end):
     - if start == end:
       - self.tree[node] = a[start]
       - return
     - mid = (start + end) // 2
     - self.build(a, 2*node, start, mid)
     - self.build(a, 2*node+1, mid+1, end)
     - self.tree[node] = min(self.tree[2*node], self.tree[2*node+1])
   - def update(self, node, start, end, idx, val):
     - if start == end:
       - self.tree[node] = val
       - return
     - mid = (start + end) // 2
     - if idx <= mid:
       - self.update(2*node, start, mid, idx, val)
     - else:
       - self.update(2*node+1, mid+1, end, idx, val)
     - self.tree[node] = min(self.tree[2*node], self.tree[2*node+1])
   - def query(self, node, start, end, l, r):
     - if r < start or end < l:
       - return float('inf')
     - if l <= start and end <= r:
       - return self.tree[node]
     - mid = (start + end) // 2
     - left = self.query(2*node, start, mid, l, r)
     - right = self.query(2*node+1, mid+1, end, l, r)
     - return min(left, right)
2. st = SegmentTree(n)
3. st.build(a, 1, 0, n-1)
4. for type, x, y in queries:
   - if type == 1:
     - st.update(1, 0, n-1, x-1, y)
   - else:
     - print(st.query(1, 0, n-1, x-1, y-1))

## Time Complexity

O((n + q) log n) - Build + updates/queries.

## Space Complexity

O(n) - Segment tree.

## Edge Cases

- **No updates**: Static mins
- **All updates**: Dynamic
- **Single element**: Update/query
- **Whole range**: Min all

## Applications

- **Arrays**: Dynamic mins
- **Segment Tree**: Range queries
- **Updates**: Point updates

## Practice Tips

- Implement segment tree
- Build recursively
- Update path
- Query overlap
