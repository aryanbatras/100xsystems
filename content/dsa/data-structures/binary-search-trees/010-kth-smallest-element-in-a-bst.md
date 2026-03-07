---
title: "Kth Smallest Element in a BST"
leetcode: "https://leetcode.com/problems/kth-smallest-element-in-a-bst/"
difficulty: "Medium"
tags: ["tree", "binary-search-tree", "inorder"]
---

## Problem

Given the root of a binary search tree, and an integer k, return the kth smallest value (1-indexed) of all the values of the nodes in the tree.

## Example

**Input:** root = [3,1,4,null,2], k = 1  
**Output:** 1  

**Input:** root = [5,3,6,2,4,null,null,1], k = 3  
**Output:** 3  

**Input:** root = [1], k = 1  
**Output:** 1

## Solution Approach

### Method 1: Inorder Traversal
1. Perform inorder traversal, collect all values in a list
2. Return list[k-1]

### Method 2: Recursive with Count
1. Define helper count_nodes(node)
2. In kth_smallest:
   - If not root, return -1
   - left_count = count_nodes(root.left)
   - If k == left_count + 1, return root.val
   - If k <= left_count, return kth_smallest(root.left, k)
   - Else, return kth_smallest(root.right, k - left_count - 1)

## Time Complexity

O(n) for inorder, O(h + k) for count.

## Space Complexity

O(n) for inorder, O(h) for count.

## Edge Cases

- **k = 1**: Smallest element
- **k = n**: Largest element
- **Single node**: root.val
- **k out of range**: Undefined

## Applications

- **BST Operations**: Kth element
- **Data Structures**: Ordered access
- **Algorithm Problems**: BST queries
- **Statistics**: Percentiles

## Practice Tips

- Inorder gives sorted
- Use count for optimization
- Handle k boundaries
- Test with different k
