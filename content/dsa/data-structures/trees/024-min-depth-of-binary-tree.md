---
title: "Min Depth of Binary Tree"
leetcode: "https://leetcode.com/problems/minimum-depth-of-binary-tree/"
difficulty: "Easy"
tags: ["tree", "bfs", "dfs"]
---

## Problem

Given a binary tree, find its minimum depth.

The minimum depth is the number of nodes along the shortest path from the root node down to the nearest leaf node.

Note that a leaf is a node with no children.

## Example

**Input:** root = [3,9,20,null,null,15,7]  
**Output:** 2  

**Input:** root = [2,null,3,null,4,null,5,null,6]  
**Output:** 5  

**Input:** root = []  
**Output:** 0

## Solution Approach

### Method 1: BFS
1. If root is null, return 0
2. Use queue, enqueue root, depth = 0
3. While queue:
   - depth++
   - for _ in range(len(queue)):
     - node = dequeue
     - if not node.left and not node.right: return depth
     - enqueue left and right

### Method 2: Recursive
1. If root is null, return 0
2. If root is leaf, return 1
3. If left is null, return 1 + minDepth(right)
4. If right is null, return 1 + minDepth(left)
5. Return 1 + min(minDepth(left), minDepth(right))

## Time Complexity

O(n) - Visit each node.

## Space Complexity

O(w) for BFS, O(h) for recursive.

## Edge Cases

- **Null root**: 0
- **Single node**: 1
- **Left skewed**: 1 + min of right
- **Balanced**: Small depth

## Applications

- **Tree Properties**: Minimum depth
- **Data Structures**: Tree analysis
- **Algorithm Problems**: BFS/DFS
- **Performance**: Shortest path

## Practice Tips

- BFS for level order
- Check for leaves
- Handle null children
- Recursive base cases
