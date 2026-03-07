---
title: "Find a Value in a Binary Search Tree"
difficulty: "Easy"
tags: ["tree", "binary-search-tree", "search"]
---

## Problem

Given the root of a binary search tree (BST) and an integer val, find the node with value val in the BST. If no such node exists, return null.

## Example

**Input:** root = [4,2,7,1,3], val = 2  
**Output:** Node with value 2  

**Input:** root = [4,2,7,1,3], val = 5  
**Output:** null  

**Input:** root = [], val = 1  
**Output:** null

## Solution Approach

### Method 1: Recursive
1. If root is null or root.val == val, return root
2. If val < root.val, search in left subtree
3. Else, search in right subtree

### Method 2: Iterative
1. While root is not null:
   - If root.val == val, return root
   - If val < root.val, root = root.left
   - Else, root = root.right
2. Return null

## Time Complexity

O(h) - h is height of tree.

## Space Complexity

O(h) for recursive, O(1) for iterative.

## Edge Cases

- **Empty tree**: null
- **Value at root**: root
- **Value in left subtree**: correct node
- **Value in right subtree**: correct node

## Applications

- **BST Operations**: Search functionality
- **Data Structures**: Tree queries
- **Algorithm Problems**: BST problems
- **Databases**: Index searches

## Practice Tips

- Follow BST property
- Recursive or iterative
- Handle null nodes
- Test with different values
