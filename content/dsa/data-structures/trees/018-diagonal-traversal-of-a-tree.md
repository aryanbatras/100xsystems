---
title: "Diagonal Traversal of a Tree"
difficulty: "Medium"
tags: ["tree", "bfs", "queue"]
---

## Problem

Given a binary tree, print the diagonal traversal of the tree.

Diagonal traversal groups nodes with the same diagonal (right diagonal, where nodes have the same horizontal distance from root in a certain way).

## Example

**Input:** root = [1,2,3,4,5,6,7]  
**Output:** [[1],[2,3],[4,5,6],[7]]  

**Input:** root = [1,2,3,null,4]  
**Output:** [[1],[2,4],[3]]  

**Input:** root = []  
**Output:** []

## Solution Approach

### Method 1: Using Queue
1. Use queue, enqueue root
2. While queue:
   - diagonal = []
   - node = queue.front
   - while node:
     - diagonal.append(node.val)
     - if node.left: queue.enqueue(node.left)
     - node = node.right
   - result.append(diagonal)
   - dequeue the processed node

### Method 2: Recursive with Map
1. Use map diagonal -> list
2. DFS, pass diagonal (e.g., hd)
3. map[diagonal].append(node.val)
4. recurse left with diagonal, right with diagonal+1 or something

## Time Complexity

O(n) - Visit each node once.

## Space Complexity

O(n) - Queue and result.

## Edge Cases

- **Null root**: Empty
- **Single node**: [[val]]
- **Left skewed**: One diagonal
- **Right skewed**: Multiple diagonals

## Applications

- **Tree Visualization**: Diagonal view
- **Data Structures**: Tree traversals
- **Algorithm Problems**: Grouping by diagonals
- **Graphics**: Diagonal rendering

## Practice Tips

- Use queue for BFS diagonal
- Handle right children
- Collect diagonals
- Test with different trees
