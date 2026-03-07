---
title: "Check if a Binary Tree is a BST or Not"
difficulty: "Medium"
tags: ["tree", "binary-search-tree", "validation"]
---

## Problem

Given the root of a binary tree, determine if it is a valid binary search tree (BST).

A valid BST is defined as follows:

- The left subtree of a node contains only nodes with keys less than the node's key.
- The right subtree of a node contains only nodes with keys greater than the node's key.
- Both the left and right subtrees must also be binary search trees.

## Example

**Input:** root = [2,1,3]  
**Output:** true  

**Input:** root = [5,1,4,null,null,3,6]  
**Output:** false  

**Input:** root = [2,2,2]  
**Output:** false

## Solution Approach

### Method 1: Recursive with Range
1. Define helper isBST(node, min_val, max_val)
2. If node is null, return true
3. If node.val <= min_val or node.val >= max_val, return false
4. Return isBST(node.left, min_val, node.val) and isBST(node.right, node.val, max_val)
5. Call isBST(root, float('-inf'), float('inf'))

### Method 2: Inorder Traversal
1. Perform inorder traversal, store values
2. Check if the list is strictly increasing

## Time Complexity

O(n) - Visit each node.

## Space Complexity

O(h) for recursive, O(n) for inorder.

## Edge Cases

- **Empty tree**: true
- **Single node**: true
- **Left skewed**: Check order
- **Right skewed**: Check order

## Applications

- **Tree Validation**: Check BST property
- **Data Structures**: BST verification
- **Algorithm Problems**: Tree problems
- **Debugging**: Validate tree

## Practice Tips

- Use range constraints
- Inorder should be sorted
- Handle duplicates (usually not allowed)
- Test with invalid trees
