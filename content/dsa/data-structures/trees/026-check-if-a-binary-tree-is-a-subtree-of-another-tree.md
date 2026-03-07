---
title: "Check if a Binary Tree is a Subtree of Another Tree"
leetcode: "https://leetcode.com/problems/subtree-of-another-tree/"
difficulty: "Easy"
tags: ["tree", "dfs", "recursion"]
---

## Problem

Given the roots of two binary trees root and subRoot, return true if there is a subtree of root with the same structure and node values of subRoot and false otherwise.

A subtree of a binary tree tree is a tree that consists of a node in tree and all of this node's descendants. The tree tree could also be considered as a subtree of itself.

## Example

**Input:** root = [3,4,5,1,2], subRoot = [4,1,2]  
**Output:** true  

**Input:** root = [3,4,5,1,2,null,null,null,null,0], subRoot = [4,1,2]  
**Output:** false  

**Input:** root = [], subRoot = []  
**Output:** true

## Solution Approach

### Method 1: Recursive
1. def isSubtree(root, subRoot):
   - if not root: return False
   - if isSameTree(root, subRoot): return True
   - return isSubtree(root.left, subRoot) or isSubtree(root.right, subRoot)
2. def isSameTree(a, b):
   - if not a and not b: return True
   - if not a or not b: return False
   - return a.val == b.val and isSameTree(a.left, b.left) and isSameTree(a.right, b.right)

## Time Complexity

O(n * m) - n nodes in root, m in subRoot.

## Space Complexity

O(h) - Recursion stack.

## Edge Cases

- **subRoot null**: true
- **root null**: false
- **subRoot is root**: true
- **No subtree match**: false

## Applications

- **Tree Comparisons**: Subtree existence
- **Data Structures**: Tree operations
- **Algorithm Problems**: Tree matching
- **Pattern Recognition**: Substructure checks

## Practice Tips

- Check same tree function
- Recurse on subtrees
- Handle null cases
- Consider tree sizes
