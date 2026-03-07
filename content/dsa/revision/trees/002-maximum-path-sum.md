---
title: "Maximum path sum"
leetcode: "https://leetcode.com/problems/binary-tree-maximum-path-sum/"
difficulty: "Hard"
tags: ["tree", "depth-first-search", "dynamic-programming", "binary-tree"]
---

## Problem

A path in a binary tree is a sequence of nodes where each pair of adjacent nodes in the sequence has an edge connecting them. A node can only appear in the sequence at most once. The path sum of a path is the sum of the node's values in the path. Given the root of a binary tree, return the maximum path sum of any non-empty path.

## Example

**Input:** root = [1,2,3]  
**Output:** 6  

**Input:** root = [-10,9,20,null,null,15,7]  
**Output:** 42  

**Input:** root = [1]  
**Output:** 1

## Solution Approach

### Method 1: DFS
1. max_sum = float('-inf')
2. def dfs(node):
   - nonlocal max_sum
   - if not node: return 0
   - left = max(dfs(node.left), 0)
   - right = max(dfs(node.right), 0)
   - max_sum = max(max_sum, node.val + left + right)
   - return node.val + max(left, right)
3. dfs(root)
4. return max_sum

## Time Complexity

O(n) - Traverse all nodes.

## Space Complexity

O(h) - Recursion stack.

## Edge Cases

- **Single node**: Node value
- **All negative**: Max node
- **Path through root**: Sum with subtrees
- **Leaf path**: Leaf value

## Applications

- **Tree Problems**: Max path sum
- **DFS**: Recur on subtrees
- **Binary Trees**: Path calculations
- **Interview Questions**: Hard

## Practice Tips

- DFS for subtree sums
- Update global max
- Return max path to parent
- Handle negative values
