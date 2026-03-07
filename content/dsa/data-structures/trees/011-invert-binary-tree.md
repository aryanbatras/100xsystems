---
title: "Invert Binary Tree"
leetcode: "https://leetcode.com/problems/invert-binary-tree/"
difficulty: "Easy"
tags: ["tree", "dfs", "recursion"]
---

## Problem

Given the root of a binary tree, invert the tree, and return its root.

## Example

**Input:** root = [4,2,7,1,3,6,9]  
**Output:** [4,7,2,9,6,3,1]  

**Input:** root = [2,1,3]  
**Output:** [2,3,1]  

**Input:** root = []  
**Output:** []

## Solution Approach

### Method 1: Recursive
1. If root is null, return null
2. Swap root.left and root.right
3. Recursively invert root.left
4. Recursively invert root.right
5. Return root

### Method 2: Iterative (Level Order)
1. If root is null, return null
2. Use queue, enqueue root
3. While queue:
   - node = dequeue
   - swap node.left and node.right
   - if node.left: enqueue
   - if node.right: enqueue
4. Return root

## Time Complexity

O(n) - Visit each node once.

## Space Complexity

O(h) for recursion, O(w) for iterative.

## Edge Cases

- **Null root**: Return null
- **Single node**: Return as is
- **Left skewed**: Becomes right skewed
- **Symmetric**: Stays same

## Applications

- **Tree Transformations**: Mirror image
- **Data Structures**: Tree manipulation
- **Algorithm Problems**: Tree problems
- **Graphics**: Tree rendering

## Practice Tips

- Swap left and right
- Recurse on subtrees
- Handle null nodes
- Test with different trees
