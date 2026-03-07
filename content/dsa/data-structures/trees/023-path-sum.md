---
title: "Path Sum"
leetcode: "https://leetcode.com/problems/path-sum/"
difficulty: "Easy"
tags: ["tree", "dfs", "recursion"]
---

## Problem

Given the root of a binary tree and an integer targetSum, return true if the tree has a root-to-leaf path such that adding up all the values along the path equals targetSum.

A leaf is a node with no children.

## Example

**Input:** root = [5,4,8,11,null,13,4,7,2,null,null,null,1], targetSum = 22  
**Output:** true (5->4->11->2 = 22)  

**Input:** root = [1,2,3], targetSum = 5  
**Output:** false  

**Input:** root = [], targetSum = 0  
**Output:** false

## Solution Approach

### Method 1: Recursive
1. def hasPathSum(node, sum):
   - if not node: return False
   - sum -= node.val
   - if not node.left and not node.right: return sum == 0
   - return hasPathSum(node.left, sum) or hasPathSum(node.right, sum)
2. Call hasPathSum(root, targetSum)

## Time Complexity

O(n) - Visit each node once.

## Space Complexity

O(h) - Recursion stack.

## Edge Cases

- **Null root**: false
- **Single node**: true if val == target
- **No path sums to target**: false
- **Negative values**: possible

## Applications

- **Tree Searches**: Path existence
- **Data Structures**: Tree queries
- **Algorithm Problems**: Path problems
- **Graph Traversals**: Similar to paths

## Practice Tips

- Subtract node value
- Check at leaves
- Recursion base cases
- Handle null nodes
