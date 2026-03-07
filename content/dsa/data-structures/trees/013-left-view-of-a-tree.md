---
title: "Left View of a Tree"
difficulty: "Easy"
tags: ["tree", "bfs", "dfs"]
---

## Problem

Given a binary tree, print the leftmost node of each level.

## Example

**Input:** root = [1,2,3,4,5,6,7]  
**Output:** [1,2,4]  

**Input:** root = [1,2,3,null,4]  
**Output:** [1,2,4]  

**Input:** root = []  
**Output:** []

## Solution Approach

### Method 1: Level Order Traversal
1. Use queue, enqueue root
2. While queue:
   - level_size = len(queue)
   - for i in 0 to level_size-1:
     - node = dequeue
     - if i == 0: result.append(node.val)
     - enqueue left and right

### Method 2: Recursive (DFS)
1. result = []
2. def left_view(node, level):
   - if not node: return
   - if level == len(result): result.append(node.val)
   - left_view(node.left, level+1)
   - left_view(node.right, level+1)
3. left_view(root, 0)

## Time Complexity

O(n) - Visit each node once.

## Space Complexity

O(w) for queue, O(h) for recursion.

## Edge Cases

- **Null root**: Empty
- **Single node**: [val]
- **Left skewed**: All nodes
- **Right skewed**: Only root and right path

## Applications

- **Tree Visualization**: Left view
- **Data Structures**: Tree traversals
- **Algorithm Problems**: View problems
- **Graphics**: Rendering

## Practice Tips

- Level order for BFS
- DFS with level tracking
- Handle null nodes
- Test with different trees
