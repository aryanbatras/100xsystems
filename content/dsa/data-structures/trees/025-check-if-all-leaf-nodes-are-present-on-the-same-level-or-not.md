---
title: "Check if All Leaf Nodes are Present on the Same Level or Not"
difficulty: "Easy"
tags: ["tree", "bfs", "dfs"]
---

## Problem

Given a binary tree, check if all leaf nodes are present on the same level.

## Example

**Input:** root = [1,2,3,4,5]  
**Output:** true (leaves 4 and 5 at level 2)  

**Input:** root = [1,2,3,4,5,6]  
**Output:** false (leaves at different levels)  

**Input:** root = []  
**Output:** true

## Solution Approach

### Method 1: BFS
1. If root is null, return true
2. Use queue, enqueue root, level = 0
3. Initialize leaf_level = -1
4. While queue:
   - for _ in range(len(queue)):
     - node = dequeue
     - if not node.left and not node.right:
       - if leaf_level == -1: leaf_level = level
       - elif leaf_level != level: return false
     - enqueue left and right if exist
   - level++

### Method 2: DFS
1. Use a set to store leaf levels
2. DFS to find all leaf levels
3. Check if set size == 1

## Time Complexity

O(n) - Visit each node.

## Space Complexity

O(w) for BFS, O(h) for DFS.

## Edge Cases

- **Null root**: true
- **Single node**: true
- **All leaves same level**: true
- **Leaves different levels**: false

## Applications

- **Tree Properties**: Leaf level check
- **Data Structures**: Tree validation
- **Algorithm Problems**: Level checks
- **Tree Balancing**: Similar checks

## Practice Tips

- BFS for level tracking
- Check leaves only
- Update leaf level
- Handle null nodes
