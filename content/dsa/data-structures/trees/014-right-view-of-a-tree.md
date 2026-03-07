---
title: "Right View of a Tree"
difficulty: "Easy"
tags: ["tree", "bfs", "dfs"]
---

## Problem

Given a binary tree, print the rightmost node of each level.

## Example

**Input:** root = [1,2,3,4,5,6,7]  
**Output:** [1,3,7]  

**Input:** root = [1,2,3,null,4]  
**Output:** [1,3,4]  

**Input:** root = []  
**Output:** []

## Solution Approach

### Method 1: Level Order Traversal
1. Use queue, enqueue root
2. While queue:
   - level_size = len(queue)
   - for i in 0 to level_size-1:
     - node = dequeue
     - if i == level_size-1: result.append(node.val)
     - enqueue left and right

### Method 2: Recursive (DFS)
1. result = []
2. def right_view(node, level):
   - if not node: return
   - if level == len(result): result.append(node.val)
   - right_view(node.right, level+1)
   - right_view(node.left, level+1)
3. right_view(root, 0)

## Time Complexity

O(n) - Visit each node once.

## Space Complexity

O(w) for queue, O(h) for recursion.

## Edge Cases

- **Null root**: Empty
- **Single node**: [val]
- **Left skewed**: Only root and left path
- **Right skewed**: All nodes

## Applications

- **Tree Visualization**: Right view
- **Data Structures**: Tree traversals
- **Algorithm Problems**: View problems
- **Graphics**: Rendering

## Practice Tips

- Level order for BFS
- DFS with right first
- Handle null nodes
- Test with different trees
