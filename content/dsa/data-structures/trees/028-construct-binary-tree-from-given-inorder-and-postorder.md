---
title: "Construct Binary Tree from Given Inorder and Postorder"
leetcode: "https://leetcode.com/problems/construct-binary-tree-from-inorder-and-postorder-traversal/"
difficulty: "Medium"
tags: ["tree", "array", "hash-table"]
---

## Problem

Given two integer arrays inorder and postorder where inorder is the inorder traversal of a binary tree and postorder is the postorder traversal of the same tree, construct and return the binary tree.

## Example

**Input:** inorder = [9,3,15,20,7], postorder = [9,15,7,20,3]  
**Output:** [3,9,20,null,null,15,7]  

**Input:** inorder = [-1], postorder = [-1]  
**Output:** [-1]  

**Input:** inorder = [1,2], postorder = [2,1]  
**Output:** [1,null,2]

## Solution Approach

### Method 1: Recursive with HashMap
1. Create a map from value to index in inorder
2. Use a postorder index starting at len-1
3. def build(in_start, in_end):
   - if in_start > in_end: return None
   - root_val = postorder[post_idx]
   - post_idx -= 1
   - root = TreeNode(root_val)
   - root_index = map[root_val]
   - root.right = build(root_index + 1, in_end)
   - root.left = build(in_start, root_index - 1)
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
- Postorder from end
- Recursive build
- Handle index ranges
