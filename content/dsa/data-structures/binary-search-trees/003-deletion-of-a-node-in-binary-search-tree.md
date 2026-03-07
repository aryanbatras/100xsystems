---
title: "Deletion of a Node in Binary Search Tree"
difficulty: "Medium"
tags: ["tree", "binary-search-tree", "deletion"]
---

## Problem

Given the root of a binary search tree (BST) and an integer val, delete the node with value val from the BST and return the root of the BST. The BST property must be maintained.

## Example

**Input:** root = [5,3,6,2,4,null,7], val = 3  
**Output:** [5,4,6,2,null,null,7]  

**Input:** root = [5,3,6,2,4,null,7], val = 0  
**Output:** [5,3,6,2,4,null,7] (not found)  

**Input:** root = [2,1], val = 2  
**Output:** [1]

## Solution Approach

### Method 1: Recursive
1. If root is null, return null
2. If val < root.val, root.left = delete(root.left, val)
3. Else if val > root.val, root.right = delete(root.right, val)
4. Else (found node to delete):
   - If no children, return null
   - If one child, return that child
   - If two children, find inorder successor (min in right subtree), replace root.val with successor.val, delete successor from right subtree
5. Return root

## Time Complexity

O(h) - h is height of tree.

## Space Complexity

O(h) - Recursion stack.

## Edge Cases

- **Node not found**: No change
- **Leaf node**: Delete directly
- **One child**: Replace with child
- **Two children**: Use successor
- **Root deletion**: Update root

## Applications

- **BST Operations**: Deletion functionality
- **Data Structures**: Tree modifications
- **Algorithm Problems**: BST problems
- **Databases**: Index deletions

## Practice Tips

- Handle all deletion cases
- Find inorder successor
- Maintain BST property
- Test with different nodes
