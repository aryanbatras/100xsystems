---
title: "Boundary Traversal of a Tree"
difficulty: "Medium"
tags: ["tree", "dfs", "recursion"]
---

## Problem

Given a binary tree, print the boundary traversal of the tree.

Boundary includes: the root, all left boundary nodes (excluding leaves), all leaf nodes, and all right boundary nodes in reverse order (excluding leaves).

## Example

**Input:** root = [1,2,3,4,5,6,7]  
**Output:** [1,2,4,5,6,7,3]  

**Input:** root = [1,2,3,null,4]  
**Output:** [1,2,4,3]  

**Input:** root = []  
**Output:** []

## Solution Approach

### Method 1: Separate Functions
1. If root is null, return
2. Print root
3. Print left boundary: from root.left down, print nodes with left child or leaf
4. Print leaves: inorder traversal, print leaves
5. Print right boundary reverse: from root.right down, collect nodes, print reverse

### Detailed Steps
1. **Left Boundary**: Start from root.left, go left as much as possible, print non-leaf nodes
2. **Leaves**: Traverse inorder, print nodes with no children
3. **Right Boundary**: Start from root.right, go right as much as possible, collect non-leaf nodes, print in reverse

## Time Complexity

O(n) - Visit each node once.

## Space Complexity

O(h) - Recursion stack.

## Edge Cases

- **Null root**: Empty
- **Single node**: [val]
- **No left/right**: Handle appropriately
- **Only leaves**: All boundary

## Applications

- **Tree Visualization**: Boundary view
- **Data Structures**: Tree traversals
- **Algorithm Problems**: Complex traversals
- **Graphics**: Outline rendering

## Practice Tips

- Separate boundary parts
- Exclude duplicates (leaves in boundary)
- Handle root separately
- Test with different trees
