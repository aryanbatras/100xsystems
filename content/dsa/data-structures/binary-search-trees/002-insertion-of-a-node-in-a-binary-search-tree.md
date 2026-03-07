---
title: "Insertion of a Node in a Binary Search Tree"
difficulty: "Easy"
tags: ["tree", "binary-search-tree", "insertion"]
---

## Problem

Given the root of a binary search tree (BST) and an integer val, insert val into the BST and return the root of the BST. The new node must be inserted in a way that maintains the BST property.

## Example

**Input:** root = [4,2,7,1,3], val = 5  
**Output:** [4,2,7,1,3,5]  

**Input:** root = [], val = 5  
**Output:** [5]  

**Input:** root = [4,2,7,1,3], val = 0  
**Output:** [4,2,7,1,3,0]

## Solution Approach

### Method 1: Recursive
1. If root is null, return new TreeNode(val)
2. If val < root.val, root.left = insert(root.left, val)
3. Else, root.right = insert(root.right, val)
4. Return root

### Method 2: Iterative
1. If root is null, return new TreeNode(val)
2. Initialize current = root
3. While true:
   - If val < current.val:
     - If current.left is null, current.left = new TreeNode(val), break
     - Else, current = current.left
   - Else:
     - If current.right is null, current.right = new TreeNode(val), break
     - Else, current = current.right
4. Return root

## Time Complexity

O(h) - h is height of tree.

## Space Complexity

O(h) for recursive, O(1) for iterative.

## Edge Cases

- **Empty tree**: New root
- **Insert at leaf**: Works
- **Insert in middle**: Maintains BST
- **Duplicate values**: Assume no duplicates

## Applications

- **BST Operations**: Insertion functionality
- **Data Structures**: Tree modifications
- **Algorithm Problems**: BST problems
- **Databases**: Index insertions

## Practice Tips

- Follow BST property
- Recursive or iterative
- Handle null cases
- Test insertions
