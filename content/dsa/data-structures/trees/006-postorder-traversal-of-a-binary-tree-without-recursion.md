---
title: "Postorder Traversal of a Binary Tree without Recursion"
leetcode: "https://leetcode.com/problems/binary-tree-postorder-traversal/"
difficulty: "Hard"
tags: ["tree", "stack", "iterative"]
---

## Problem

Given the root of a binary tree, return the postorder traversal of its nodes' values without using recursion.

## Example

**Input:** root = [1,null,2,3]  
**Output:** [3,2,1]  

**Input:** root = []  
**Output:** []  

**Input:** root = [1]  
**Output:** [1]

## Solution Approach

### Method 1: Two Stacks
1. Initialize stack1, stack2, result = []
2. If root, stack1.append(root)
3. While stack1:
   - node = stack1.pop()
   - stack2.append(node)
   - if node.left: stack1.append(node.left)
   - if node.right: stack1.append(node.right)
4. While stack2:
   - result.append(stack2.pop().val)
5. Return result

### Method 2: One Stack with prev
1. Use stack, prev = None
2. While root or stack:
   - While root:
     - stack.append(root)
     - root = root.left
   - node = stack[-1]
   - if node.right and node.right != prev:
     - root = node.right
   - else:
     - result.append(node.val)
     - prev = stack.pop()

## Time Complexity

O(n) - Visit each node once.

## Space Complexity

O(h) for one stack, O(n) for two stacks.

## Edge Cases

- **Null root**: Empty list
- **Single node**: [node.val]
- **Left skewed**: Left then root
- **Right skewed**: Right then root

## Applications

- **Tree Traversal**: Iterative DFS
- **Memory Constraints**: Avoid recursion
- **Thread Safety**: No recursion
- **Algorithm Problems**: Iterative solutions

## Practice Tips

- Two stacks method is straightforward
- One stack requires careful prev tracking
- Handle right subtrees
- Test with different trees
