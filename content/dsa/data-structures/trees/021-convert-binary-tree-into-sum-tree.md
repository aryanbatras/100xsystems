---
title: "Convert Binary Tree into Sum Tree"
difficulty: "Easy"
tags: ["tree", "dfs", "recursion"]
---

## Problem

Given a binary tree, convert it to a sum tree where each node contains the sum of the left and right subtrees in the original tree.

## Example

**Input:** root = [10, -2, 6, 8, -4, 7, 5]  
**Output:** [20, 4, 12, 0, 0, 0, 0]  

**Input:** root = [1,2,3]  
**Output:** [6,0,0]  

**Input:** root = []  
**Output:** []

## Solution Approach

### Method 1: Postorder Traversal
1. Use a helper function to convert and return sum
2. def convert(node):
   - if not node: return 0
   - left_sum = convert(node.left)
   - right_sum = convert(node.right)
   - total = left_sum + right_sum + node.val
   - node.val = left_sum + right_sum
   - return total
3. Call convert(root)

## Time Complexity

O(n) - Visit each node once.

## Space Complexity

O(h) - Recursion stack.

## Edge Cases

- **Null root**: No change
- **Single node**: Becomes 0
- **Leaf node**: Becomes 0
- **Balanced tree**: Correct sums

## Applications

- **Tree Transformations**: Sum tree
- **Data Structures**: Tree modifications
- **Algorithm Problems**: Tree updates
- **Calculations**: Subtree sums

## Practice Tips

- Postorder traversal
- Update node value
- Return subtree sum
- Handle null nodes
