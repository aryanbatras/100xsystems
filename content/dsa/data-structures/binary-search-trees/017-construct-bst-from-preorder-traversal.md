---
title: "Construct BST from Preorder Traversal"
leetcode: "https://leetcode.com/problems/construct-binary-search-tree-from-preorder-traversal/"
difficulty: "Medium"
tags: ["tree", "binary-search-tree", "array"]
---

## Problem

Given an array of integers preorder, which is the preorder traversal of a BST, construct the tree and return its root.

## Example

**Input:** preorder = [8,5,1,7,10,12]  
**Output:** [8,5,10,1,7,null,12]  

**Input:** preorder = [1,3]  
**Output:** [1,null,3]  

**Input:** preorder = [1]  
**Output:** [1]

## Solution Approach

### Method 1: Recursive with Bound
1. Use a global index
2. def build(bound):
   - if index == len(preorder) or preorder[index] > bound: return None
   - root = TreeNode(preorder[index])
   - index += 1
   - root.left = build(root.val)
   - root.right = build(bound)
   - return root
3. index = 0
4. return build(float('inf'))

### Method 2: Iterative with Stack
1. Use stack, push root
2. For each next, while stack and next > stack.top, pop and set as left of next
3. Push next

## Time Complexity

O(n) - Each node processed.

## Space Complexity

O(h) for recursive, O(n) for iterative.

## Edge Cases

- **Single node**: Root
- **Increasing**: Right skewed
- **Decreasing**: Left skewed
- **Empty**: Null

## Applications

- **Tree Construction**: From preorder
- **Data Structures**: BST building
- **Algorithm Problems**: Traversal reconstruction
- **Serialization**: Inverse preorder

## Practice Tips

- Use bound for subtrees
- Recursive helper
- Handle index carefully
- Test with different orders
