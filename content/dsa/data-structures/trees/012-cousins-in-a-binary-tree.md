---
title: "Cousins in a Binary Tree"
leetcode: "https://leetcode.com/problems/cousins-in-a-binary-tree/"
difficulty: "Easy"
tags: ["tree", "bfs", "dfs"]
---

## Problem

Given the root of a binary tree with unique values and two distinct values x and y, determine if the nodes corresponding to the values x and y are cousins.

Two nodes are cousins if they have the same depth but different parents.

## Example

**Input:** root = [1,2,3,4], x = 4, y = 3  
**Output:** false  

**Input:** root = [1,2,3,null,4,null,5], x = 5, y = 4  
**Output:** true  

**Input:** root = [1,2,3,4], x = 2, y = 3  
**Output:** false

## Solution Approach

### Method 1: BFS
1. Use queue, enqueue (node, parent, depth)
2. Initialize x_info, y_info = None
3. While queue:
   - for each level, process
   - if node.val == x, x_info = (parent, depth)
   - if node.val == y, y_info = (parent, depth)
   - enqueue children with current node as parent, depth+1
4. Return x_info and y_info exist and depths equal and parents different

### Method 2: DFS
1. Define dfs(node, parent, depth, target)
2. If node.val == target, return (parent, depth)
3. Recurse left and right
4. Call for x and y, compare

## Time Complexity

O(n) - Visit each node.

## Space Complexity

O(w) for BFS, O(h) for DFS.

## Edge Cases

- **x or y not in tree**: false
- **Same node**: false
- **Root children**: false
- **Deep nodes**: true if conditions met

## Applications

- **Tree Relationships**: Family tree analysis
- **Data Structures**: Tree queries
- **Algorithm Problems**: Tree traversals
- **Graph Theory**: Node relationships

## Practice Tips

- Use BFS for levels
- Track parent and depth
- Handle not found cases
- Test with different positions
