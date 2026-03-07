---
title: "Minimum time taken to BURN the Binary Tree from a Node"
difficulty: "Medium"
tags: ["tree", "depth-first-search", "binary-tree"]
---

## Problem

Given a binary tree and a node, find the minimum time to burn the entire tree starting from that node. Burning spreads to adjacent nodes each second.

## Example

**Input:** root = [1,2,3,4,5,6,7], target = 3  
**Output:** 3 (3->6->1->2->4->5->7)  

**Input:** root = [1,2,3], target = 1  
**Output:** 2 (1->2->3 or 1->3->2)  

**Input:** root = [1], target = 1  
**Output:** 0

## Solution Approach

### Method 1: DFS with Parent
1. def burnTime(root, target):
   - def find(node):
     - if not node or node.val == target: return node
     - left = find(node.left)
     - if left: return left
     - return find(node.right)
   - start = find(root)
   - if not start: return 0
   - max_time = 0
   - def dfs(node, parent, time):
     - nonlocal max_time
     - max_time = max(max_time, time)
     - if node.left and node.left != parent:
       - dfs(node.left, node, time + 1)
     - if node.right and node.right != parent:
       - dfs(node.right, node, time + 1)
   - dfs(start, None, 0)
   - return max_time

## Time Complexity

O(n) - Traverse all nodes.

## Space Complexity

O(h) - Recursion stack.

## Edge Cases

- **Target is root**: Height of tree
- **Target is leaf**: Distance to farthest
- **Single node**: 0
- **Balanced tree**: Max distance

## Applications

- **Tree Problems**: Burning simulation
- **DFS**: Distance calculation
- **Binary Trees**: Node distances
- **Interview Questions**: Medium

## Practice Tips

- Find target node
- DFS from target with parent
- Track max time
- Avoid going back to parent
