---
title: "Postorder Traversal of a Binary Tree using Recursion"
leetcode: "https://leetcode.com/problems/binary-tree-postorder-traversal/"
difficulty: "Easy"
tags: ["tree", "dfs", "recursion"]
---

## Problem

Given the root of a binary tree, return the postorder traversal of its nodes' values.

## Example

**Input:** root = [1,null,2,3]  
**Output:** [3,2,1]  

**Input:** root = []  
**Output:** []  

**Input:** root = [1]  
**Output:** [1]

## Solution Approach

### Method 1: Recursive Traversal
1. Define a helper function postorder(node)
2. If node is null, return
3. Recursively call postorder on node.left
4. Recursively call postorder on node.right
5. Append node.val to result

## Time Complexity

O(n) - Visit each node once.

## Space Complexity

O(h) - Recursion stack.

## Edge Cases

- **Null root**: Empty list
- **Single node**: [node.val]
- **Left skewed**: Left subtree then root
- **Right skewed**: Right subtree then root

## Applications

- **Tree Traversal**: Standard DFS
- **Delete Operations**: Postorder deletion
- **Expression Trees**: Evaluation
- **Algorithm Problems**: Tree problems

## Practice Tips

- Left, right, then root
- Handle null nodes
- Recursion base case
- Collect results
