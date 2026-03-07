---
title: "Kth Largest Element in a BST"
difficulty: "Medium"
tags: ["tree", "binary-search-tree", "inorder"]
---

## Problem

Given the root of a binary search tree, and an integer k, return the kth largest value (1-indexed) of all the values of the nodes in the tree.

## Example

**Input:** root = [3,1,4,null,2], k = 1  
**Output:** 4  

**Input:** root = [5,3,6,2,4,null,null,1], k = 3  
**Output:** 4  

**Input:** root = [1], k = 1  
**Output:** 1

## Solution Approach

### Method 1: Reverse Inorder Traversal
1. Perform reverse inorder traversal (right, root, left), collect values
2. Return list[k-1]

### Method 2: Recursive with Count
1. Define helper count_nodes(node)
2. In kth_largest:
   - If not root, return -1
   - right_count = count_nodes(root.right)
   - If k == right_count + 1, return root.val
   - If k <= right_count, return kth_largest(root.right, k)
   - Else, return kth_largest(root.left, k - right_count - 1)

## Time Complexity

O(n) for inorder, O(h + k) for count.

## Space Complexity

O(n) for inorder, O(h) for count.

## Edge Cases

- **k = 1**: Largest element
- **k = n**: Smallest element
- **Single node**: root.val
- **k out of range**: Undefined

## Applications

- **BST Operations**: Kth largest
- **Data Structures**: Ordered access
- **Algorithm Problems**: BST queries
- **Statistics**: Percentiles

## Practice Tips

- Reverse inorder gives descending
- Use count for optimization
- Handle k boundaries
- Test with different k
