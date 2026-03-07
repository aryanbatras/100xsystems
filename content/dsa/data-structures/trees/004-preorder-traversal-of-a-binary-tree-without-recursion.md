---
title: "Preorder Traversal of a Binary Tree without Recursion"
leetcode: "https://leetcode.com/problems/binary-tree-preorder-traversal/"
difficulty: "Medium"
tags: ["tree", "stack", "iterative"]
---

## Problem

Given the root of a binary tree, return the preorder traversal of its nodes' values without using recursion.

## Example

**Input:** root = [1,null,2,3]  
**Output:** [1,2,3]  

**Input:** root = []  
**Output:** []  

**Input:** root = [1]  
**Output:** [1]

## Solution Approach

### Method 1: Iterative with Stack
1. If root is null, return []
2. Initialize stack, result = []
3. stack.append(root)
4. While stack:
   - node = stack.pop()
   - result.append(node.val)
   - if node.right: stack.append(node.right)
   - if node.left: stack.append(node.left)
5. Return result

## Time Complexity

O(n) - Visit each node once.

## Space Complexity

O(h) - Stack space.

## Edge Cases

- **Null root**: Empty list
- **Single node**: [node.val]
- **Left skewed**: Root then left
- **Right skewed**: Root then right

## Applications

- **Tree Traversal**: Iterative DFS
- **Memory Constraints**: Avoid recursion
- **Thread Safety**: No recursion
- **Algorithm Problems**: Iterative solutions

## Practice Tips

- Push right before left
- Use stack for simulation
- Handle root separately
- Test with different trees
