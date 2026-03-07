---
title: "Find Minimum Value in a Binary Search Tree"
difficulty: "Easy"
tags: ["tree", "binary-search-tree", "minimum"]
---

## Problem

Given the root of a binary search tree (BST), find the minimum value in the BST.

## Example

**Input:** root = [2,1,3]  
**Output:** 1  

**Input:** root = [5,3,6,2,4,null,7]  
**Output:** 2  

**Input:** root = [1]  
**Output:** 1

## Solution Approach

### Method 1: Iterative
1. If root is null, return null
2. Initialize current = root
3. While current.left is not null, current = current.left
4. Return current.val

### Method 2: Recursive
1. If root is null, return null
2. If root.left is null, return root.val
3. Return findMin(root.left)

## Time Complexity

O(h) - h is height of tree.

## Space Complexity

O(1) for iterative, O(h) for recursive.

## Edge Cases

- **Empty tree**: null
- **Single node**: root.val
- **Left skewed**: leftmost value
- **Balanced tree**: correct min

## Applications

- **BST Operations**: Find minimum
- **Data Structures**: Tree queries
- **Algorithm Problems**: BST properties
- **Priority Queues**: Min value

## Practice Tips

- Follow left pointers
- Handle null cases
- Iterative or recursive
- Test with different trees
