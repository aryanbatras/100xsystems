---
title: "Preorder Traversal of a Binary Tree using Recursion"
leetcode: "https://leetcode.com/problems/binary-tree-preorder-traversal/"
difficulty: "Easy"
tags: ["tree", "dfs", "recursion"]
---

## Problem

Given the root of a binary tree, return the preorder traversal of its nodes' values.

## Example

**Input:** root = [1,null,2,3]  
**Output:** [1,2,3]  

**Input:** root = []  
**Output:** []  

**Input:** root = [1]  
**Output:** [1]

## Solution Approach

### Method 1: Recursive Traversal
1. Define a helper function preorder(node)
2. If node is null, return
3. Append node.val to result
4. Recursively call preorder on node.left
5. Recursively call preorder on node.right

## Time Complexity

O(n) - Visit each node once.

## Space Complexity

O(h) - Recursion stack.

## Edge Cases

- **Null root**: Empty list
- **Single node**: [node.val]
- **Left skewed**: Root then left subtree
- **Right skewed**: Root then right subtree

## Applications

- **Tree Traversal**: Standard DFS
- **Expression Trees**: Preorder evaluation
- **Tree Serialization**: Root first
- **Algorithm Problems**: Tree problems

## Practice Tips

- Root first in traversal
- Handle null nodes
- Recursion base case
- Collect results
