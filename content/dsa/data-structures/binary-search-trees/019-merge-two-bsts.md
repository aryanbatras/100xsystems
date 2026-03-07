---
title: "Merge Two BSTs"
difficulty: "Medium"
tags: ["tree", "binary-search-tree", "merge"]
---

## Problem

Given two binary search trees, merge them into a single BST.

The merged BST should contain all elements from both trees and maintain the BST property.

## Example

**Input:** root1 = [2,1,3], root2 = [7,6,8]  
**Output:** [4,2,7,1,3,6,8] (merged BST)  

**Input:** root1 = [1], root2 = [2]  
**Output:** [2,1,3] or balanced  

**Input:** root1 = [], root2 = [1]  
**Output:** [1]

## Solution Approach

### Method 1: Inorder Merge and Build
1. Get inorder traversal of both BSTs (sorted arrays)
2. Merge the two sorted arrays into one sorted array
3. Build a balanced BST from the merged sorted array

### Method 2: Convert to Lists and Merge
1. Flatten both BSTs to sorted linked lists using inorder
2. Merge two sorted linked lists
3. Convert the merged list back to BST

## Time Complexity

O(m + n) - Traversals and merge.

## Space Complexity

O(m + n) - For arrays or lists.

## Edge Cases

- **One tree empty**: Return the other
- **Both empty**: Null
- **Overlapping values**: Handle duplicates?
- **Single nodes**: Merge correctly

## Applications

- **Tree Merging**: Combine BSTs
- **Data Structures**: Union of BSTs
- **Algorithm Problems**: BST operations
- **Databases**: Merge sorted data

## Practice Tips

- Inorder gives sorted order
- Merge sorted arrays
- Build balanced BST
- Handle duplicates if any
