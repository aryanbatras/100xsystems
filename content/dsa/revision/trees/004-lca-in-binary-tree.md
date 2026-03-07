---
title: "LCA in Binary Tree"
leetcode: "https://leetcode.com/problems/lowest-common-ancestor-of-a-binary-tree/"
difficulty: "Medium"
tags: ["tree", "depth-first-search", "binary-tree"]
---

## Problem

Given a binary tree, find the lowest common ancestor (LCA) of two given nodes in the tree. According to the definition of LCA on Wikipedia: "The lowest common ancestor is defined between two nodes p and q as the lowest node in T that has both p and q as descendants (where we allow a node to be a descendant of itself)."

## Example

**Input:** root = [3,5,1,6,2,0,8,null,null,7,4], p = 5, q = 1  
**Output:** 3  

**Input:** root = [3,5,1,6,2,0,8,null,null,7,4], p = 5, q = 4  
**Output:** 5  

**Input:** root = [1,2], p = 1, q = 2  
**Output:** 1

## Solution Approach

### Method 1: DFS
1. def lowestCommonAncestor(root, p, q):
   - if not root or root == p or root == q: return root
   - left = lowestCommonAncestor(root.left, p, q)
   - right = lowestCommonAncestor(root.right, p, q)
   - if left and right: return root
   - return left or right

## Time Complexity

O(n) - Worst case traverse all.

## Space Complexity

O(h) - Recursion stack.

## Edge Cases

- **p or q is root**: Root
- **p and q in different subtrees**: Current
- **One is ancestor of other**: Ancestor
- **Same node**: The node

## Applications

- **Tree Problems**: Lowest common ancestor
- **DFS**: Recursive search
- **Binary Trees**: Node relations
- **Interview Questions**: Medium

## Practice Tips

- Recur on left and right
- If both sides return, current is LCA
- Return found node up
- Handle base cases
