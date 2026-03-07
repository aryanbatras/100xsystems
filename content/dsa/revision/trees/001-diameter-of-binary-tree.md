---
title: "Diameter of Binary Tree"
leetcode: "https://leetcode.com/problems/diameter-of-binary-tree/"
difficulty: "Easy"
tags: ["tree", "depth-first-search", "binary-tree"]
---

## Problem

Given the root of a binary tree, return the length of the diameter of the tree. The diameter of a binary tree is the length of the longest path between any two nodes in a tree. This path may or may not pass through the root. The length of a path between two nodes is represented by the number of edges between them.

## Example

**Input:** root = [1,2,3,4,5]  
**Output:** 3  

**Input:** root = [1,2]  
**Output:** 1  

**Input:** root = [1]  
**Output:** 0

## Solution Approach

### Method 1: DFS
1. max_diam = 0
2. def dfs(node):
   - nonlocal max_diam
   - if not node: return 0
   - left = dfs(node.left)
   - right = dfs(node.right)
   - max_diam = max(max_diam, left + right)
   - return max(left, right) + 1
3. dfs(root)
4. return max_diam

## Time Complexity

O(n) - Traverse all nodes.

## Space Complexity

O(h) - Recursion stack.

## Edge Cases

- **Single node**: 0
- **Linear tree**: n-1
- **Balanced tree**: Max diameter
- **Null root**: 0

## Applications

- **Tree Problems**: Diameter calculation
- **DFS**: Height and path
- **Binary Trees**: Path lengths
- **Interview Questions**: Easy

## Practice Tips

- DFS for height
- Update global max
- Return height
- Handle null nodes
