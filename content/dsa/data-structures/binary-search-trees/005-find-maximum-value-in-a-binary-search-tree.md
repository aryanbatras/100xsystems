---
title: "Find Maximum Value in a Binary Search Tree"
difficulty: "Easy"
tags: ["tree", "binary-search-tree", "maximum"]
---

## Problem

Given the root of a binary search tree (BST), find the maximum value in the BST.

## Example

**Input:** root = [2,1,3]  
**Output:** 3  

**Input:** root = [5,3,6,2,4,null,7]  
**Output:** 7  

**Input:** root = [1]  
**Output:** 1

## Solution Approach

### Method 1: Iterative
1. If root is null, return null
2. Initialize current = root
3. While current.right is not null, current = current.right
4. Return current.val

### Method 2: Recursive
1. If root is null, return null
2. If root.right is null, return root.val
3. Return findMax(root.right)

## Time Complexity

O(h) - h is height of tree.

## Space Complexity

O(1) for iterative, O(h) for recursive.

## Edge Cases

- **Empty tree**: null
- **Single node**: root.val
- **Right skewed**: rightmost value
- **Balanced tree**: correct max

## Applications

- **BST Operations**: Find maximum
- **Data Structures**: Tree queries
- **Algorithm Problems**: BST properties
- **Priority Queues**: Max value

## Practice Tips

- Follow right pointers
- Handle null cases
- Iterative or recursive
- Test with different trees
