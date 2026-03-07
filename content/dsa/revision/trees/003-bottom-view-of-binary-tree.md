---
title: "Bottom View of Binary Tree"
difficulty: "Medium"
tags: ["tree", "breadth-first-search", "binary-tree"]
---

## Problem

Given a binary tree, print the bottom view of the tree. The bottom view of a binary tree is the set of nodes visible when the tree is viewed from the bottom.

## Example

**Input:** root = [1,2,3,4,5,6,7]  
**Output:** [4,2,6,3,7]  

**Input:** root = [1,2,3]  
**Output:** [2,1,3]  

**Input:** root = [1]  
**Output:** [1]

## Solution Approach

### Method 1: BFS with Horizontal Distance
1. from collections import deque
2. def bottomView(root):
   - if not root: return []
   - queue = deque([(root, 0)])
   - map = {}
   - while queue:
     - node, hd = queue.popleft()
     - map[hd] = node.val
     - if node.left:
       - queue.append((node.left, hd - 1))
     - if node.right:
       - queue.append((node.right, hd + 1))
   - return [map[hd] for hd in sorted(map)]

## Time Complexity

O(n) - BFS traversal.

## Space Complexity

O(n) - Queue and map.

## Edge Cases

- **Single node**: [node.val]
- **Left skewed**: All left nodes
- **Right skewed**: All right nodes
- **Complete tree**: Bottom level

## Applications

- **Tree Views**: Bottom perspective
- **BFS**: Level order
- **Binary Trees**: Horizontal distance
- **Interview Questions**: Medium

## Practice Tips

- Use queue for BFS
- Track horizontal distance
- Overwrite map for same hd
- Sort hd for order
