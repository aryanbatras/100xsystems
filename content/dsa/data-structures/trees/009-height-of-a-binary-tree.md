---
title: "Height of a Binary Tree"
difficulty: "Easy"
tags: ["tree", "dfs", "recursion"]
---

## Problem

Given the root of a binary tree, return its height.

Height is the number of edges on the longest path from the root to a leaf.

## Example

**Input:** root = [3,9,20,null,null,15,7]  
**Output:** 2  

**Input:** root = [1,null,2]  
**Output:** 1  

**Input:** root = []  
**Output:** 0

## Solution Approach

### Method 1: Recursive
1. If node is null, return 0
2. Return 1 + max(height(node.left), height(node.right))

### Method 2: Iterative (Level Order)
1. Use queue, count levels
2. Return level count - 1

## Time Complexity

O(n) - Visit each node.

## Space Complexity

O(h) for recursion, O(w) for iterative.

## Edge Cases

- **Null root**: 0
- **Single node**: 0 (no edges)
- **Left skewed**: n-1 edges
- **Balanced**: log n

## Applications

- **Tree Properties**: Balance check
- **Algorithms**: Many tree algorithms use height
- **Data Structures**: Tree analysis
- **Performance**: Tree complexity

## Practice Tips

- Base case null
- Max of subheights
- Handle skewed trees
- Iterative for large trees
