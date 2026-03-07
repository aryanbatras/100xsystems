---
title: "Mirror of a Tree"
difficulty: "Easy"
tags: ["tree", "dfs", "recursion"]
---

## Problem

Given a binary tree, convert it to its mirror image by swapping the left and right subtrees at every node.

## Example

**Input:** root = [1,2,3,4,5]  
**Output:** [1,3,2,null,4,null,5]  

**Input:** root = [1]  
**Output:** [1]  

**Input:** root = []  
**Output:** []

## Solution Approach

### Method 1: Recursive
1. If node is null, return
2. Swap node.left and node.right
3. Recursively mirror node.left
4. Recursively mirror node.right

### Method 2: Iterative (Level Order)
1. Use queue, enqueue root
2. While queue:
   - node = dequeue
   - swap node.left and node.right
   - if node.left: enqueue
   - if node.right: enqueue

## Time Complexity

O(n) - Visit each node once.

## Space Complexity

O(h) for recursion, O(w) for iterative.

## Edge Cases

- **Null root**: No change
- **Single node**: No change
- **Left skewed**: Becomes right skewed
- **Balanced**: Symmetric

## Applications

- **Tree Symmetry**: Create mirror image
- **Tree Transformations**: Alter structure
- **Algorithm Problems**: Tree manipulation
- **Data Structures**: Tree operations

## Practice Tips

- Swap pointers recursively
- Handle null nodes
- Test with different shapes
- Understand mirror property
