---
title: "Binary Tree into DLL"
difficulty: "Medium"
tags: ["tree", "linked-list", "dfs"]
---

## Problem

Convert a binary tree to a doubly linked list in inorder traversal order.

## Example

**Input:** root = [1,2,3,4,5,6,7]  
**Output:** 4 <-> 2 <-> 5 <-> 1 <-> 6 <-> 3 <-> 7  

**Input:** root = [1,2,3]  
**Output:** 2 <-> 1 <-> 3  

**Input:** root = []  
**Output:** null

## Solution Approach

### Method 1: Inorder Traversal with prev
1. Initialize prev = None
2. def convert(node):
   - if not node: return
   - convert(node.left)
   - node.left = prev
   - if prev: prev.right = node
   - prev = node
   - convert(node.right)
3. Call convert(root)
4. Find head: start from root, go leftmost
5. Find tail: start from root, go rightmost

## Time Complexity

O(n) - Visit each node once.

## Space Complexity

O(h) - Recursion stack.

## Edge Cases

- **Null root**: null
- **Single node**: same
- **Left skewed**: chain
- **Right skewed**: chain

## Applications

- **Tree Conversions**: Tree to list
- **Data Structures**: Linked list from tree
- **Algorithm Problems**: Inorder flattening
- **Memory Layout**: Different representations

## Practice Tips

- Inorder traversal
- Maintain prev pointer
- Update left and right
- Find head and tail
