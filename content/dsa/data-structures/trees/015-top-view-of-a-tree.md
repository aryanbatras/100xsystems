---
title: "Top View of a Tree"
difficulty: "Medium"
tags: ["tree", "bfs", "hash-table"]
---

## Problem

Given a binary tree, print the top view of the tree.

Top view is the nodes visible when viewed from the top, i.e., the first node at each horizontal distance from the root.

## Example

**Input:** root = [1,2,3,4,5,6,7]  
**Output:** [4,2,1,3,7]  

**Input:** root = [1,2,3,null,4]  
**Output:** [2,1,3,4]  

**Input:** root = []  
**Output:** []

## Solution Approach

### Method 1: Level Order with Horizontal Distance
1. Use queue with (node, hd), hd root = 0
2. Use map hd -> node.val, only set if hd not in map
3. While queue:
   - node, hd = dequeue
   - if hd not in map: map[hd] = node.val
   - enqueue left with hd-1, right with hd+1
4. Collect map values in sorted hd order

### Method 2: DFS with Map
1. Use map hd -> node.val
2. DFS, pass hd, min_hd
3. If hd not in map: map[hd] = node.val
4. Recurse left hd-1, right hd+1

## Time Complexity

O(n) - Visit each node once.

## Space Complexity

O(n) - Map and queue.

## Edge Cases

- **Null root**: Empty
- **Single node**: [val]
- **Left skewed**: All left nodes
- **Right skewed**: All right nodes

## Applications

- **Tree Visualization**: Top view
- **Data Structures**: Tree views
- **Algorithm Problems**: Distance problems
- **Graphics**: 2D representation

## Practice Tips

- Use horizontal distance
- Map for first occurrence
- Level order or DFS
- Sort hd for output
