---
title: "Find Inorder Successor in a Binary Search Tree"
difficulty: "Medium"
tags: ["tree", "binary-search-tree", "successor"]
---

## Problem

Given a binary search tree (BST) and a node in it, find the inorder successor of that node.

The inorder successor of a node is the next node in the inorder traversal of the BST.

## Example

**Input:** root = [2,1,3], node = 1  
**Output:** 2  

**Input:** root = [5,3,6,2,4,null,null,1], node = 6  
**Output:** null  

**Input:** root = [2,1], node = 2  
**Output:** null

## Solution Approach

### Method 1: With Parent Pointers
1. If node.right is not null, return min in right subtree
2. Else, traverse up using parent until find node that is left child of parent, return parent

### Method 2: Without Parent Pointers
1. If node.right, return min in right
2. Else, do inorder traversal from root, find next after node

## Time Complexity

O(h) - h is height of tree.

## Space Complexity

O(1) with parent, O(n) without.

## Edge Cases

- **Node has right subtree**: Min in right
- **Node is max**: null
- **Node is leaf**: Successor or null
- **Root successor**: Next in inorder

## Applications

- **BST Operations**: Successor finding
- **Data Structures**: Tree navigation
- **Algorithm Problems**: BST problems
- **Deletion**: Find successor for deletion

## Practice Tips

- Handle right subtree
- Traverse up for ancestor
- Without parent, use traversal
- Test with different nodes
