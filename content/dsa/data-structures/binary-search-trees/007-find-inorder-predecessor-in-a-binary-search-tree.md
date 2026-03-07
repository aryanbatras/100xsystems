---
title: "Find Inorder Predecessor in a Binary Search Tree"
difficulty: "Medium"
tags: ["tree", "binary-search-tree", "predecessor"]
---

## Problem

Given a binary search tree (BST) and a node in it, find the inorder predecessor of that node.

The inorder predecessor of a node is the previous node in the inorder traversal of the BST.

## Example

**Input:** root = [2,1,3], node = 3  
**Output:** 2  

**Input:** root = [5,3,6,2,4,null,null,1], node = 1  
**Output:** null  

**Input:** root = [2,1], node = 1  
**Output:** null

## Solution Approach

### Method 1: With Parent Pointers
1. If node.left is not null, return max in left subtree
2. Else, traverse up using parent until find node that is right child of parent, return parent

### Method 2: Without Parent Pointers
1. If node.left, return max in left
2. Else, do inorder traversal from root, find previous before node

## Time Complexity

O(h) - h is height of tree.

## Space Complexity

O(1) with parent, O(n) without.

## Edge Cases

- **Node has left subtree**: Max in left
- **Node is min**: null
- **Node is leaf**: Predecessor or null
- **Root predecessor**: null

## Applications

- **BST Operations**: Predecessor finding
- **Data Structures**: Tree navigation
- **Algorithm Problems**: BST problems
- **Deletion**: Find predecessor for deletion

## Practice Tips

- Handle left subtree
- Traverse up for ancestor
- Without parent, use traversal
- Test with different nodes
