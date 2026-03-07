---
title: "Range Updates and Sums"
cses: "https://cses.fi/problemset/task/1735"
difficulty: "Medium"
tags: ["implementation", "segment-tree", "lazy-propagation", "range-updates"]
---

## Problem

Support range add updates and range sum queries.

## Example

**Input:** 8 4  
1 2 3 4 5 6 7 8  
1 2 5 1  
2 2 5  
1 1 3 3  
2 1 4  
**Output:** 18  
21  

**Input:** 5 2  
1 1 1 1 1  
1 1 5 10  
2 1 5  
**Output:** 55  

**Input:** 1 1  
10  
1 1 1 5  
2 1 1  
**Output:** 15

## Solution Approach

### Method 1: Segment Tree with Lazy Propagation
1. class SegmentTree:
   - def __init__(self, arr):
     - self.n = len(arr)
     - self.tree = [0] * (4 * self.n)
     - self.lazy = [0] * (4 * self.n)
     - self.build(arr, 1, 0, self.n - 1)
   - def build(self, arr, node, start, end):
     - if start == end:
       - self.tree[node] = arr[start]
       - return
     - mid = (start + end) // 2
     - self.build(arr, 2*node, start, mid)
     - self.build(arr, 2*node+1, mid+1, end)
     - self.tree[node] = self.tree[2*node] + self.tree[2*node+1]
   - def propagate(self, node, start, end):
     - if self.lazy[node] != 0:
       - self.tree[node] += (end - start + 1) * self.lazy[node]
       - if start != end:
         - self.lazy[2*node] += self.lazy[node]
         - self.lazy[2*node+1] += self.lazy[node]
       - self.lazy[node] = 0
   - def update_range(self, node, start, end, l, r, val):
     - self.propagate(node, start, end)
     - if start > end or start > r or end < l:
       - return
     - if l <= start and end <= r:
       - self.lazy[node] += val
       - self.propagate(node, start, end)
       - return
     - mid = (start + end) // 2
     - self.update_range(2*node, start, mid, l, r, val)
     - self.update_range(2*node+1, mid+1, end, l, r, val)
     - self.tree[node] = self.tree[2*node] + self.tree[2*node+1]
   - def query_range(self, node, start, end, l, r):
     - self.propagate(node, start, end)
     - if start > end or start > r or end < l:
       - return 0
     - if l <= start and end <= r:
       - return self.tree[node]
     - mid = (start + end) // 2
     - left = self.query_range(2*node, start, mid, l, r)
     - right = self.query_range(2*node+1, mid+1, end, l, r)
     - return left + right
2. st = SegmentTree(a)
3. for query in queries:
   - if type == 1:
     - st.update_range(1, 0, n-1, l-1, r-1, val)
   - else:
     - print(st.query_range(1, 0, n-1, l-1, r-1))

## Time Complexity

O((n + q) log n) - Operations.

## Space Complexity

O(n) - Segment tree.

## Edge Cases

- **No updates**: Original sums
- **Whole range**: Total sum
- **Single element**: Update/query
- **Overlapping**: Correct propagation

## Applications

- **Arrays**: Range updates and sums
- **Lazy Propagation**: Efficient updates
- **Segment Tree**: Advanced operations

## Practice Tips

- Segment tree with lazy
- Propagate updates
- Range queries
- Handle lazy flags
