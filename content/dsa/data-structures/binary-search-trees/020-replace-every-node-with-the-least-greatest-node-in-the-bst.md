---
title: "Replace Every Node with the Least Greatest Node in the BST"
difficulty: "Medium"
tags: ["tree", "binary-search-tree", "inorder"]
---

## Problem

Given a BST, replace every node with the smallest node that is greater than it in the BST. If no such node exists, replace with -1.

## Example

**Input:** root = [4,2,6,1,3,5,7]  
**Output:** [5,3,7,2,4,6,-1] (2->3, 3->4, 4->5, 5->6, 6->7, 7->-1, 1->2)  

**Input:** root = [2,1]  
**Output:** [ -1,2 ] wait, 1->2, 2->-1  

**Input:** root = [1]  
**Output:** [-1]

## Solution Approach

### Method 1: Inorder Traversal and Update
1. Perform inorder traversal, collect nodes in a list (sorted order)
2. For i from 0 to n-2, list[i].val = list[i+1].val
3. list[n-1].val = -1

## Time Complexity

O(n) - Inorder and update.

## Space Complexity

O(n) - List storage.

## Edge Cases

- **Single node**: -1
- **Two nodes**: first to second, second to -1
- **All increasing**: each to next, last to -1
- **Duplicates**: Assume no

## Applications

- **BST Modifications**: Replace with successors
- **Data Structures**: Tree updates
- **Algorithm Problems**: BST operations
- **Inorder Successors**: Bulk update

## Practice Tips

- Inorder gives sorted order
- Update to next value
- Handle last node
- Test with examples
