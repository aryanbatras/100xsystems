---
title: "Largest BST in a Binary Tree"
difficulty: "Hard"
tags: ["tree", "binary-search-tree", "dynamic-programming"]
---

## Problem

Given a binary tree, find the size of the largest subtree which is also a Binary Search Tree (BST).

## Example

**Input:** root = [10,5,15,1,8,null,7]  
**Output:** 3 (subtree 5,1,8)  

**Input:** root = [4,2,7,2,3,6,9]  
**Output:** 2  

**Input:** root = [1]  
**Output:** 1

## Solution Approach

### Method 1: Brute Force
1. For each node, check if its subtree is BST
2. If yes, calculate size, keep max

### Method 2: Postorder with Info
1. Define Info: is_bst, min, max, size
2. For each node:
   - Get left and right info
   - If left.is_bst and right.is_bst and node.val > left.max and node.val < right.min:
     - is_bst = True, size = 1 + left.size + right.size, min = left.min, max = right.max
   - Else:
     - is_bst = False, size = max(left.size, right.size)
3. Return max size

## Time Complexity

O(n^2) for brute, O(n) for info.

## Space Complexity

O(h) - Recursion stack.

## Edge Cases

- **Whole tree is BST**: n
- **No BST subtrees**: 1
- **Single node**: 1
- **Balanced tree**: Correct size

## Applications

- **Tree Validation**: Largest BST
- **Data Structures**: Subtree analysis
- **Algorithm Problems**: BST in binary tree
- **Optimization**: Find valid subtrees

## Practice Tips

- Use postorder traversal
- Pass info up the tree
- Check BST conditions
- Handle null nodes
