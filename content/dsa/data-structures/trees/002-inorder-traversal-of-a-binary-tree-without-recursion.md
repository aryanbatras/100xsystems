---
title: "Inorder Traversal of a Binary Tree without Recursion"
leetcode: "https://leetcode.com/problems/binary-tree-inorder-traversal/"
difficulty: "Medium"
tags: ["tree", "stack", "iterative"]
---

## Problem

Given the root of a binary tree, return the inorder traversal of its nodes' values without using recursion.

## Example

**Input:** root = [1,null,2,3]  
**Output:** [1,3,2]  

**Input:** root = []  
**Output:** []  

**Input:** root = [1]  
**Output:** [1]

## Solution Approach

### Method 1: Iterative with Stack
1. Initialize stack, current = root, result = []
2. While current or stack:
   - While current:
     - stack.append(current)
     - current = current.left
   - If stack:
     - current = stack.pop()
     - result.append(current.val)
     - current = current.right
3. Return result

## Time Complexity

O(n) - Visit each node once.

## Space Complexity

O(h) - Stack space, h is height.

## Edge Cases

- **Null root**: Empty list
- **Single node**: [node.val]
- **Left skewed**: Increasing order
- **Right skewed**: Decreasing order

## Applications

- **Tree Traversal**: Iterative DFS
- **Memory Constraints**: Avoid recursion
- **Thread Safety**: No recursion stack
- **Algorithm Problems**: Iterative solutions

## Practice Tips

- Use stack to simulate recursion
- Handle left and right subtrees
- Collect results in order
- Test with balanced/unbalanced trees
