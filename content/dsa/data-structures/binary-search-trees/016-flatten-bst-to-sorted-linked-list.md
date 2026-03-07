---
title: "Flatten BST to Sorted Linked List"
difficulty: "Medium"
tags: ["tree", "binary-search-tree", "linked-list"]
---

## Problem

Given the root of a binary search tree, flatten it to a sorted linked list in-place. The flattened tree should use the same TreeNode class where the right child pointer points to the next node in the list and the left child pointer is always null. The linked list should be in the same order as an inorder traversal of the BST.

## Example

**Input:** root = [1,null,2,null,3,null,4,null,5]  
**Output:** [1,null,2,null,3,null,4,null,5] (flattened to 1->2->3->4->5)  

**Input:** root = [0]  
**Output:** [0]  

**Input:** root = []  
**Output:** []

## Solution Approach

### Method 1: Inorder Traversal + Relink
1. Perform inorder traversal, collect nodes in a list
2. For each node in list, set left = null, right = next if exists

### Method 2: Recursive Flatten
1. If root is null, return
2. Flatten left subtree
3. Flatten right subtree
4. Find the rightmost of left subtree, set its right to root.right
5. Set root.right = root.left
6. Set root.left = null

## Time Complexity

O(n) - Visit each node.

## Space Complexity

O(n) for list, O(h) for recursive.

## Edge Cases

- **Single node**: Unchanged
- **Left skewed**: Chain
- **Right skewed**: Already chain
- **Empty tree**: Null

## Applications

- **Tree Transformations**: Flatten to list
- **Data Structures**: BST to linked list
- **Algorithm Problems**: In-place modifications
- **Serialization**: Linear representation

## Practice Tips

- Inorder gives sorted order
- Modify right pointers
- Set left to null
- Handle root changes
