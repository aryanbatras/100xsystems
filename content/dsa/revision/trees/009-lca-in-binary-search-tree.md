---
title: "LCA in Binary Search Tree"
leetcode: "https://leetcode.com/problems/lowest-common-ancestor-of-a-binary-search-tree/"
difficulty: "Medium"
tags: ["tree", "depth-first-search", "binary-search-tree", "binary-tree"]
---

## Problem

Given a binary search tree (BST), find the lowest common ancestor (LCA) of two given nodes in the BST. According to the definition of LCA on Wikipedia: "The lowest common ancestor is defined between two nodes p and q as the lowest node in T that has both p and q as descendants (where we allow a node to be a descendant of itself)."

## Example

**Input:** root = [6,2,8,0,4,7,9,null,null,3,5], p = 2, q = 8  
**Output:** 6  

**Input:** root = [6,2,8,0,4,7,9,null,null,3,5], p = 2, q = 4  
**Output:** 2  

**Input:** root = [2,1], p = 2, q = 1  
**Output:** 2

## Solution Approach

### Method 1: Iterative
1. while root:
   - if p.val < root.val and q.val < root.val:
     - root = root.left
   - elif p.val > root.val and q.val > root.val:
     - root = root.right
   - else:
     - return root

### Method 2: Recursive
1. def lowestCommonAncestor(root, p, q):
   - if p.val < root.val and q.val < root.val:
     - return lowestCommonAncestor(root.left, p, q)
   - if p.val > root.val and q.val > root.val:
     - return lowestCommonAncestor(root.right, p, q)
   - return root

## Time Complexity

O(h) - Height of tree.

## Space Complexity

O(1) for iterative, O(h) for recursive.

## Edge Cases

- **p and q same**: The node
- **One is ancestor**: The ancestor
- **Root is LCA**: Root
- **Leaf nodes**: Parent

## Applications

- **BST Operations**: Lowest common ancestor
- **Tree Traversal**: Property based
- **Binary Search Trees**: Ordered
- **Interview Questions**: Medium

## Practice Tips

- Use BST property
- Move left or right
- Stop when split
- Iterative preferred
