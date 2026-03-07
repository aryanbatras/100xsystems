---
title: "Largest BST in Binary Tree"
difficulty: "Medium"
tags: ["tree", "depth-first-search", "binary-search-tree", "dynamic-programming", "binary-tree"]
---

## Problem

Given a binary tree, find the size of the largest BST subtree. A BST subtree is defined as a subtree in which the left subtree of a node contains only nodes with keys less than the node's key, and the right subtree contains only nodes with keys greater than the node's key.

## Example

**Input:** root = [10,5,15,1,8,null,7]  
**Output:** 3 (5,1,8)  

**Input:** root = [4,2,7,2,3,5,null,2,null,null,null,null,null,1]  
**Output:** 2  

**Input:** root = [1,2,3]  
**Output:** 2 (1,2 or 1,3)

## Solution Approach

### Method 1: DFS with Info
1. class Info:
   - def __init__(self, size, min_val, max_val, is_bst):
     - self.size = size
     - self.min_val = min_val
     - self.max_val = max_val
     - self.is_bst = is_bst

2. def largestBST(root):
   - max_size = 0
   - def dfs(node):
     - nonlocal max_size
     - if not node: return Info(0, float('inf'), float('-inf'), True)
     - left = dfs(node.left)
     - right = dfs(node.right)
     - if left.is_bst and right.is_bst and left.max_val < node.val < right.min_val:
       - size = 1 + left.size + right.size
       - max_size = max(max_size, size)
       - min_val = min(left.min_val, node.val)
       - max_val = max(right.max_val, node.val)
       - return Info(size, min_val, max_val, True)
     - else:
       - return Info(0, 0, 0, False)
   - dfs(root)
   - return max_size

## Time Complexity

O(n) - Traverse all nodes.

## Space Complexity

O(h) - Recursion stack.

## Edge Cases

- **Whole tree BST**: n
- **Single node**: 1
- **No BST**: 0
- **Multiple BSTs**: Max size

## Applications

- **Tree Problems**: Largest BST subtree
- **DFS**: Bottom-up
- **Binary Trees**: BST check
- **Interview Questions**: Medium

## Practice Tips

- Return info for each subtree
- Check BST conditions
- Track size, min, max
- Update global max
