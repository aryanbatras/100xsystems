---
title: "Construct Binary Tree from Given Inorder and Preorder Traversal"
leetcode: "https://leetcode.com/problems/construct-binary-tree-from-preorder-and-inorder-traversal/"
difficulty: "Medium"
tags: ["tree", "array", "hash-table"]
---

## Problem

Given two integer arrays preorder and inorder where preorder is the preorder traversal of a binary tree and inorder is the inorder traversal of the same tree, construct and return the binary tree.

## Example

**Input:** preorder = [3,9,20,15,7], inorder = [9,3,15,20,7]  
**Output:** [3,9,20,null,null,15,7]  

**Input:** preorder = [-1], inorder = [-1]  
**Output:** [-1]  

**Input:** preorder = [1,2], inorder = [1,2]  
**Output:** [1,null,2]

## Solution Approach

### Method 1: Recursive with HashMap
1. Create a map from value to index in inorder
2. Use a preorder index starting at 0
3. def build(in_start, in_end):
   - if in_start > in_end: return None
   - root_val = preorder[pre_idx]
   - pre_idx += 1
   - root = TreeNode(root_val)
   - root_index = map[root_val]
   - root.left = build(in_start, root_index - 1)
   - root.right = build(root_index + 1, in_end)
   - return root
4. Call build(0, len(inorder) - 1)

## Time Complexity

O(n) - Each node processed once.

## Space Complexity

O(n) - HashMap and recursion.

## Edge Cases

- **Single node**: Works
- **Left skewed**: Works
- **Right skewed**: Works
- **Invalid inputs**: Assume valid

## Applications

- **Tree Construction**: From traversals
- **Data Structures**: Tree building
- **Algorithm Problems**: Traversal reconstruction
- **Serialization**: Inverse operations

## Practice Tips

- Map inorder indices
- Recursive build
- Handle index ranges
- Test with examples
