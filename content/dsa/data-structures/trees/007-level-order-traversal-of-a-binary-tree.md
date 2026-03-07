---
title: "Level Order Traversal of a Binary Tree"
leetcode: "https://leetcode.com/problems/binary-tree-level-order-traversal/"
difficulty: "Medium"
tags: ["tree", "bfs", "queue"]
---

## Problem

Given the root of a binary tree, return the level order traversal of its nodes' values. (i.e., from left to right, level by level).

## Example

**Input:** root = [3,9,20,null,null,15,7]  
**Output:** [[3],[9,20],[15,7]]  

**Input:** root = [1]  
**Output:** [[1]]  

**Input:** root = []  
**Output:** []

## Solution Approach

### Method 1: BFS with Queue
1. If root is null, return []
2. Initialize queue with root, result = []
3. While queue:
   - level = []
   - for _ in range(len(queue)):
     - node = queue.popleft()
     - level.append(node.val)
     - if node.left: queue.append(node.left)
     - if node.right: queue.append(node.right)
   - result.append(level)
4. Return result

## Time Complexity

O(n) - Visit each node once.

## Space Complexity

O(w) - Queue space, w is max width.

## Edge Cases

- **Null root**: Empty list
- **Single node**: [[val]]
- **Left skewed**: Each level one node
- **Right skewed**: Each level one node

## Applications

- **Tree Traversal**: BFS
- **Level Processing**: Same level operations
- **Serialization**: Level order
- **Algorithm Problems**: Tree problems

## Practice Tips

- Use queue for BFS
- Process level by level
- Handle null children
- Collect levels in list
