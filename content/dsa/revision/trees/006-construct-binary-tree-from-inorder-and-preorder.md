---
title: "Construct Binary Tree from inorder and preorder"
leetcode: "https://leetcode.com/problems/construct-binary-tree-from-preorder-and-inorder-traversal/"
difficulty: "Medium"
tags: ["tree", "depth-first-search", "array", "hash-table", "divide-and-conquer", "binary-tree"]
---

## Problem

Given two integer arrays preorder and inorder where preorder is the preorder traversal of a binary tree and inorder is the inorder traversal of the same tree, construct and return the binary tree.

## Example

**Input:** preorder = [3,9,20,15,7], inorder = [9,3,15,20,7]  
**Output:** [3,9,20,null,null,15,7]  

**Input:** preorder = [1,2], inorder = [1,2]  
**Output:** [1,null,2]  

**Input:** preorder = [1], inorder = [1]  
**Output:** [1]

## Solution Approach

### Method 1: Recursion with Hash
1. inorder_map = {val: i for i, val in enumerate(inorder)}
2. pre_idx = 0
3. def build(left, right):
   - nonlocal pre_idx
   - if left > right: return None
   - root_val = preorder[pre_idx]
   - pre_idx += 1
   - root = TreeNode(root_val)
   - idx = inorder_map[root_val]
   - root.left = build(left, idx - 1)
   - root.right = build(idx + 1, right)
   - return root
4. return build(0, len(inorder) - 1)

## Time Complexity

O(n) - Linear.

## Space Complexity

O(n) - Hash map.

## Edge Cases

- **Single node**: [val]
- **Left skewed**: All left
- **Right skewed**: All right
- **Balanced**: Standard

## Applications

- **Tree Construction**: From traversals
- **Recursion**: Divide and conquer
- **Binary Trees**: Preorder and inorder
- **Interview Questions**: Medium

## Practice Tips

- Hash inorder for indices
- Use preorder index
- Recur on left and right
- Handle bounds
