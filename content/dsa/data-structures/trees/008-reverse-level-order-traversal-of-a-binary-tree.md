---
title: "Reverse Level Order Traversal of a Binary Tree"
difficulty: "Easy"
tags: ["tree", "bfs", "queue"]
---

## Problem

Given the root of a binary tree, return the bottom-up level order traversal of its nodes' values. (i.e., from left to right, level by level from leaf to root).

## Example

**Input:** root = [3,9,20,null,null,15,7]  
**Output:** [[15,7],[9,20],[3]]  

**Input:** root = [1]  
**Output:** [[1]]  

**Input:** root = []  
**Output:** []

## Solution Approach

### Method 1: BFS with Queue, Insert Levels at Front
1. If root is null, return []
2. Initialize queue with root, result = []
3. While queue:
   - level = []
   - for _ in range(len(queue)):
     - node = queue.popleft()
     - level.append(node.val)
     - if node.left: queue.append(node.left)
     - if node.right: queue.append(node.right)
   - result.insert(0, level)  # Insert at front
4. Return result

### Method 2: DFS with Level Tracking
1. result = defaultdict(list)
2. def dfs(node, level):
   - if not node: return
   - result[level].append(node.val)
   - dfs(node.left, level+1)
   - dfs(node.right, level+1)
3. dfs(root, 0)
4. Return list(result.values())[::-1]

## Time Complexity

O(n) - Visit each node once.

## Space Complexity

O(w) - Queue or result space.

## Edge Cases

- **Null root**: Empty list
- **Single node**: [[val]]
- **Left skewed**: Reversed levels
- **Right skewed**: Reversed levels

## Applications

- **Tree Traversal**: Bottom-up BFS
- **Level Processing**: Reverse order
- **Serialization**: Reverse level order
- **Algorithm Problems**: Tree problems

## Practice Tips

- Insert levels at front of list
- Use DFS for level tracking
- Handle null children
- Reverse the result list
