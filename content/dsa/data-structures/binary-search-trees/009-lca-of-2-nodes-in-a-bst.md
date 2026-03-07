---
title: "LCA of 2 Nodes in a BST"
leetcode: "https://leetcode.com/problems/lowest-common-ancestor-of-a-binary-search-tree/"
difficulty: "Easy"
tags: ["tree", "binary-search-tree", "lca"]
---

## Problem

Given a binary search tree (BST), find the lowest common ancestor (LCA) of two given nodes in the BST.

The lowest common ancestor is defined between two nodes p and q as the lowest node in T that has both p and q as descendants (where we allow a node to be a descendant of itself).

## Example

**Input:** root = [6,2,8,0,4,7,9,null,null,3,5], p = 2, q = 8  
**Output:** 6  

**Input:** root = [6,2,8,0,4,7,9,null,null,3,5], p = 2, q = 4  
**Output:** 2  

**Input:** root = [2,1], p = 2, q = 1  
**Output:** 2

## Solution Approach

### Method 1: Recursive
1. If root is null, return null
2. If both p and q are less than root.val, search in left subtree
3. If both p and q are greater than root.val, search in right subtree
4. Else, root is LCA

### Method 2: Iterative
1. While root:
   - If both p and q < root.val, root = root.left
   - Else if both p and q > root.val, root = root.right
   - Else, return root

## Time Complexity

O(h) - h is height of tree.

## Space Complexity

O(h) for recursive, O(1) for iterative.

## Edge Cases

- **One node is ancestor**: The ancestor
- **Root is LCA**: Root
- **p and q in different subtrees**: Root
- **p or q is root**: Root

## Applications

- **BST Operations**: LCA queries
- **Data Structures**: Tree queries
- **Algorithm Problems**: BST problems
- **Genealogy**: Common ancestors

## Practice Tips

- Utilize BST property
- Recursive or iterative
- Handle node values
- Test with different positions
