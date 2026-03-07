---
title: "Diameter of a Binary Tree"
leetcode: "https://leetcode.com/problems/diameter-of-binary-tree/"
difficulty: "Easy"
tags: ["tree", "dfs", "recursion"]
---

## Problem

Given the root of a binary tree, return the length of the diameter of the tree.

The diameter of a binary tree is the length of the longest path between any two nodes in a tree. This path may or may not pass through the root.

The length of a path between two nodes is represented by the number of edges between them.

## Example

**Input:** root = [1,2,3,4,5]  
**Output:** 3 (path 4-2-1-3 or 5-2-1-3)  

**Input:** root = [1,2]  
**Output:** 1  

**Input:** root = []  
**Output:** 0

## Solution Approach

### Method 1: Recursive
1. Use a helper function to calculate height and update diameter
2. def height(node):
   - if not node: return 0
   - left = height(node.left)
   - right = height(node.right)
   - diameter = max(diameter, left + right)
   - return 1 + max(left, right)
3. Call height(root), return diameter

## Time Complexity

O(n) - Visit each node once.

## Space Complexity

O(h) - Recursion stack.

## Edge Cases

- **Null root**: 0
- **Single node**: 0
- **Two nodes**: 1
- **Line**: n-1

## Applications

- **Tree Properties**: Longest path
- **Network Analysis**: Diameter in graphs
- **Data Structures**: Tree metrics
- **Algorithm Problems**: Path problems

## Practice Tips

- Combine height and diameter
- Update global max
- Handle null nodes
- Test with different shapes
