---
title: "Delete a Node in Binary Search Tree"
leetcode: "https://leetcode.com/problems/delete-node-in-a-bst/"
difficulty: "Medium"
tags: ["tree", "binary-search-tree", "binary-tree"]
---

## Problem

Given a root node reference of a BST and a key, delete the node with the given key in the BST. Return the root node reference (possibly updated) of the BST.

## Example

**Input:** root = [5,3,6,2,4,null,7], key = 3  
**Output:** [5,2,6,null,4,null,7]  

**Input:** root = [5,3,6,2,4,null,7], key = 0  
**Output:** [5,3,6,2,4,null,7]  

**Input:** root = [5], key = 5  
**Output:** []

## Solution Approach

### Method 1: Recursion
1. def deleteNode(root, key):
   - if not root: return None
   - if key < root.val:
     - root.left = deleteNode(root.left, key)
   - elif key > root.val:
     - root.right = deleteNode(root.right, key)
   - else:
     - if not root.left: return root.right
     - if not root.right: return root.left
     - # Find inorder successor
     - temp = root.right
     - while temp.left:
       - temp = temp.left
     - root.val = temp.val
     - root.right = deleteNode(root.right, temp.val)
   - return root

## Time Complexity

O(h) - Height of tree.

## Space Complexity

O(h) - Recursion stack.

## Edge Cases

- **Delete leaf**: Remove node
- **Delete node with one child**: Replace with child
- **Delete node with two children**: Replace with successor
- **Key not found**: No change

## Applications

- **BST Operations**: Deletion
- **Recursion**: Tree modification
- **Binary Search Trees**: Maintain property
- **Interview Questions**: Medium

## Practice Tips

- Search for node
- Handle three cases
- Find successor for two children
- Recur on subtrees
