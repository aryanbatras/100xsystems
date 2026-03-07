---
title: "Morris Preorder Traversal of a Binary Tree"
leetcode: "https://leetcode.com/problems/binary-tree-preorder-traversal/"
difficulty: "Medium"
tags: ["tree", "depth-first-search", "binary-tree"]
---

## Problem

Given the root of a binary tree, return the preorder traversal of its nodes' values without using recursion or stack.

## Example

**Input:** root = [1,null,2,3]  
**Output:** [1,2,3]  

**Input:** root = [1,2,3,4,5,null,6]  
**Output:** [1,2,4,5,3,6]  

**Input:** root = [1]  
**Output:** [1]

## Solution Approach

### Method 1: Morris Traversal
1. result = []
2. current = root
3. while current:
   - if not current.left:
     - result.append(current.val)
     - current = current.right
   - else:
     - predecessor = current.left
     - while predecessor.right and predecessor.right != current:
       - predecessor = predecessor.right
     - if not predecessor.right:
       - result.append(current.val)
       - predecessor.right = current
       - current = current.left
     - else:
       - predecessor.right = None
       - current = current.right
4. return result

## Time Complexity

O(n) - Linear.

## Space Complexity

O(1) - Constant.

## Edge Cases

- **Null root**: []
- **Single node**: [val]
- **Left skewed**: All left
- **Right skewed**: Preorder

## Applications

- **Tree Traversal**: Space efficient
- **Morris Algorithm**: Threading
- **Binary Trees**: Preorder
- **Interview Questions**: Medium

## Practice Tips

- Find predecessor
- Thread rightmost to current
- Visit root before left
- Unthread when back
