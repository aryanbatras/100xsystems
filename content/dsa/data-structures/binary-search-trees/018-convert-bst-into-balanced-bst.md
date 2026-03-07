---
title: "Convert BST into Balanced BST"
difficulty: "Medium"
tags: ["tree", "binary-search-tree", "balance"]
---

## Problem

Given a BST, convert it into a balanced BST.

A balanced BST is a BST where the height difference between left and right subtrees of any node is at most 1.

## Example

**Input:** root = [4,3,5,2,null,null,6,1] (skewed)  
**Output:** Balanced BST, e.g., [3,2,5,1,4,6]  

**Input:** root = [1]  
**Output:** [1]  

**Input:** root = [1,2,3,4,5]  
**Output:** Balanced version

## Solution Approach

### Method 1: Inorder to Array, Build Balanced
1. Perform inorder traversal, store nodes in a sorted array
2. Build a balanced BST from the sorted array
3. def build(arr, start, end):
   - if start > end: return None
   - mid = (start + end) // 2
   - root = TreeNode(arr[mid])
   - root.left = build(arr, start, mid-1)
   - root.right = build(arr, mid+1, end)
   - return root

## Time Complexity

O(n) - Inorder and build.

## Space Complexity

O(n) - Array storage.

## Edge Cases

- **Already balanced**: Unchanged
- **Single node**: Same
- **Left skewed**: Balanced
- **Right skewed**: Balanced

## Applications

- **Tree Balancing**: Improve performance
- **Data Structures**: Balanced BST
- **Algorithm Problems**: BST optimization
- **Databases**: Balanced search trees

## Practice Tips

- Inorder gives sorted order
- Build from middle
- Recursive construction
- Test balance property
