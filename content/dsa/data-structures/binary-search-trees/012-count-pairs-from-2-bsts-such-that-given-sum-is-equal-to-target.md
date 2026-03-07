---
title: "Count Pairs from 2 BSTs such that Given Sum is Equal to Target"
difficulty: "Medium"
tags: ["tree", "binary-search-tree", "two-pointers"]
---

## Problem

Given two binary search trees and an integer target, count the number of pairs where one element is from the first BST and the other from the second BST, and their sum equals the target.

## Example

**Input:** BST1 = [5,3,7,2,4,6,8], BST2 = [10,6,15,3,8,11,18], target = 16  
**Output:** 3 (pairs: (6,10), (8,8), (7,9) assuming 9 in BST2, but adjust)  

**Input:** BST1 = [2,1,3], BST2 = [3,1,5], target = 4  
**Output:** 2 ( (1,3), (2,2) )  

**Input:** BST1 = [1], BST2 = [1], target = 2  
**Output:** 1

## Solution Approach

### Method 1: Inorder + Two Pointers
1. Get inorder traversal of both BSTs (sorted arrays)
2. Use two pointers: i = 0, j = m-1
3. While i < n and j >= 0:
   - If arr1[i] + arr2[j] == target, count++, i++, j--
   - Else if arr1[i] + arr2[j] < target, i++
   - Else j--
4. Handle duplicates if needed

### Method 2: Traverse One, Search Other
1. For each node in BST1, search for (target - node.val) in BST2
2. Since BST, search is O(log m)

## Time Complexity

O(n + m) for two pointers, O(n log m) for search.

## Space Complexity

O(n + m) for inorder, O(h) for search.

## Edge Cases

- **No pairs**: 0
- **One BST empty**: 0
- **Duplicates**: Count multiple
- **Target not achievable**: 0

## Applications

- **BST Operations**: Sum pairs
- **Data Structures**: Multi-tree queries
- **Algorithm Problems**: Two BST problems
- **Optimization**: Count pairs

## Practice Tips

- Inorder gives sorted
- Two pointers for sum
- Handle BST properties
- Test with different targets
