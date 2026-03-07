---
title: "Inorder Traversal of a Binary Tree using Recursion"
leetcode: "https://leetcode.com/problems/binary-tree-inorder-traversal/"
difficulty: "Easy"
tags: ["tree", "dfs", "recursion"]
---

## Problem

Given the root of a binary tree, return the inorder traversal of its nodes' values.

## Example

**Input:** root = [1,null,2,3]  
**Output:** [1,3,2]  

**Input:** root = []  
**Output:** []  

**Input:** root = [1]  
**Output:** [1]

## Solution Approach

### Method 1: Recursive Traversal
1. Define a helper function inorder(node)
2. If node is null, return
3. Recursively call inorder on node.left
4. Append node.val to result
5. Recursively call inorder on node.right

## Time Complexity

O(n) - Visit each node once.

## Space Complexity

O(h) - Recursion stack, h is height.

## Edge Cases

- **Null root**: Empty list
- **Single node**: [node.val]
- **Left skewed**: Increasing order
- **Right skewed**: Decreasing order

## Applications

- **Tree Traversal**: Standard DFS
- **BST Operations**: Inorder gives sorted
- **Tree Serialization**: Order preservation
- **Algorithm Problems**: Tree problems

## Practice Tips

- Handle null nodes
- Recursion base case
- Collect results in list
- Understand traversal order
