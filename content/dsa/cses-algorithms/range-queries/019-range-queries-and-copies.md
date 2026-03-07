---
title: "Range Queries and Copies"
cses: "https://cses.fi/problemset/task/1737"
difficulty: "Hard"
tags: ["implementation", "persistent-segment-tree", "range-sum", "versions"]
---

## Problem

Support range sum queries on different array versions.

## Example

**Input:** 8 4  
1 2 3 4 5 6 7 8  
1 2 3 1  
2 1 3 1  
1 1 4 2  
2 2 5 2  
**Output:** 6  
15  

**Input:** 5 2  
1 1 1 1 1  
1 1 5 10  
2 1 5 1  
**Output:** 55  

**Input:** 1 1  
10  
2 1 1 1  
**Output:** 10

## Solution Approach

### Method 1: Persistent Segment Tree
1. class Node:
   - def __init__(self, val=0):
     - self.val = val
     - self.left = None
     - self.right = None
2. def build(l, r):
   - if l == r:
     - return Node(a[l])
   - mid = (l + r) // 2
   - node = Node()
   - node.left = build(l, mid)
   - node.right = build(mid+1, r)
   - node.val = node.left.val + node.right.val
   - return node
3. def update(node, l, r, idx, val):
   - if l == r:
     - new_node = Node(val)
     - return new_node
   - mid = (l + r) // 2
   - new_node = Node()
   - if idx <= mid:
     - new_node.left = update(node.left, l, mid, idx, val)
     - new_node.right = node.right
   - else:
     - new_node.left = node.left
     - new_node.right = update(node.right, mid+1, r, idx, val)
   - new_node.val = new_node.left.val + new_node.right.val
   - return new_node
4. def query(node, l, r, ql, qr):
   - if ql > r or qr < l:
     - return 0
   - if ql <= l and r <= qr:
     - return node.val
   - mid = (l + r) // 2
   - return query(node.left, l, mid, ql, qr) + query(node.right, mid+1, r, ql, qr)
5. root = [build(0, n-1)]
6. for query in queries:
   - if type == 1:
     - k, idx, val = query[1:]
     - root.append(update(root[k-1], 0, n-1, idx-1, val))
   - else:
     - k, l, r = query[1:]
     - print(query(root[k-1], 0, n-1, l-1, r-1))

## Time Complexity

O(log n) per operation - Persistent updates.

## Space Complexity

O(log n) per update - Shared structure.

## Edge Cases

- **No copies**: Single version
- **Updates on copies**: New versions
- **Range queries**: Sum ranges
- **Version management**: Correct versions

## Applications

- **Version Control**: Persistent structures
- **Range Queries**: Immutable versions
- **Undo Systems**: Revert changes
- **Concurrent Access**: Shared history

## Practice Tips

- Persistent segment tree
- Version management
- Range queries on versions
- Handle updates carefully
