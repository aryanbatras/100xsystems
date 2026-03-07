---
title: "Kth Ancestor of a Node in a Binary Tree"
difficulty: "Medium"
tags: ["tree", "dfs", "binary-lifting"]
---

## Problem

Given a binary tree, find the kth ancestor of a given node.

The kth ancestor is the node that is k levels above the given node in the tree.

## Example

**Input:** root = [1,2,3,4,5], node = 4, k = 1  
**Output:** 2 (1st ancestor)  

**Input:** root = [1,2,3,4,5], node = 4, k = 2  
**Output:** 1 (2nd ancestor)  

**Input:** root = [1,2,3,4,5], node = 4, k = 3  
**Output:** null (no 3rd ancestor)

## Solution Approach

### Method 1: Find Path and Traverse
1. Find the path from root to the node using DFS
2. If path length > k, return path[len(path) - k - 1]
3. Else, return null

### Method 2: Binary Lifting
1. Precompute ancestors for each node using binary lifting
2. For each node, store 2^i th ancestor
3. To find kth ancestor, jump using binary representation of k
4. Requires O(n log n) preprocessing, O(log n) query

## Time Complexity

O(n) for path method, O(log n) for binary lifting.

## Space Complexity

O(n) - Path or ancestor table.

## Edge Cases

- **k = 0**: The node itself
- **k > depth**: null
- **node is root**: null for k >= 1
- **node not in tree**: null

## Applications

- **Tree Queries**: Ancestor finding
- **Data Structures**: Tree operations
- **Algorithm Problems**: LCA variants
- **Genealogy**: Family tree ancestors

## Practice Tips

- Find path to node
- Traverse back k steps
- Binary lifting for efficiency
- Handle edge cases
