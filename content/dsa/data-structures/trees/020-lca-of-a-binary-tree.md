---
title: "LCA of a Binary Tree"
leetcode: "https://leetcode.com/problems/lowest-common-ancestor-of-a-binary-tree/"
difficulty: "Medium"
tags: ["tree", "dfs", "recursion"]
---

## Problem

Given a binary tree, find the lowest common ancestor (LCA) of two given nodes in the tree.

The lowest common ancestor is defined between two nodes p and q as the lowest node in T that has both p and q as descendants (where we allow a node to be a descendant of itself).

## Example

**Input:** root = [3,5,1,6,2,0,8,null,null,7,4], p = 5, q = 1  
**Output:** 3  

**Input:** root = [3,5,1,6,2,0,8,null,null,7,4], p = 5, q = 4  
**Output:** 5  

**Input:** root = [1,2], p = 1, q = 2  
**Output:** 1

## Solution Approach

### Method 1: Recursive
1. If root is null or root == p or root == q, return root
2. left = lca(root.left, p, q)
3. right = lca(root.right, p, q)
4. If both left and right are not null, return root
5. If left is not null, return left
6. If right is not null, return right
7. Return null

## Time Complexity

O(n) - Worst case visit all nodes.

## Space Complexity

O(h) - Recursion stack.

## Edge Cases

- **p or q is root**: Root
- **p and q in different subtrees**: Root
- **p and q in same subtree**: The LCA in subtree
- **p or q not in tree**: Undefined

## Applications

- **Tree Queries**: Find common ancestor
- **Data Structures**: Tree operations
- **Algorithm Problems**: LCA problems
- **Genealogy**: Family trees

## Practice Tips

- Recursive base cases
- Handle subtree results
- Consider node as descendant of itself
- Test with different positions
