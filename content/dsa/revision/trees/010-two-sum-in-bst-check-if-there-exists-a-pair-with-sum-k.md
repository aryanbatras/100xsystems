---
title: "Two Sum In BST | Check if there exists a pair with Sum K"
difficulty: "Easy"
tags: ["tree", "depth-first-search", "breadth-first-search", "binary-search-tree", "binary-tree", "two-pointers"]
---

## Problem

Given a Binary Search Tree and a target sum k, check if there exist two nodes in the BST whose sum equals k.

## Example

**Input:** root = [5,3,6,2,4,null,7], k = 9  
**Output:** true (4+5)  

**Input:** root = [5,3,6,2,4,null,7], k = 28  
**Output:** false  

**Input:** root = [2,1,3], k = 4  
**Output:** true (1+3)

## Solution Approach

### Method 1: Inorder and Two Pointers
1. inorder = []
2. def ino(node):
   - if node:
     - ino(node.left)
     - inorder.append(node.val)
     - ino(node.right)
3. ino(root)
4. left = 0, right = len(inorder) - 1
5. while left < right:
   - if inorder[left] + inorder[right] == k:
     - return True
   - elif inorder[left] + inorder[right] < k:
     - left += 1
   - else:
     - right -= 1
6. return False

### Method 2: Hash Set
1. s = set()
2. def find(node):
   - if not node: return False
   - if k - node.val in s: return True
   - s.add(node.val)
   - return find(node.left) or find(node.right)
3. return find(root)

## Time Complexity

O(n) - Linear.

## Space Complexity

O(n) - Inorder or set.

## Edge Cases

- **No pair**: false
- **Root and leaf**: true if sum
- **Duplicates**: Assume unique
- **k = 2*root**: false

## Applications

- **BST Problems**: Pair sum
- **Two Pointers**: Sorted array
- **Hash Set**: Lookup
- **Interview Questions**: Easy

## Practice Tips

- Get inorder for sorted
- Two pointers on sorted
- Or use set for lookup
- Handle BST property
