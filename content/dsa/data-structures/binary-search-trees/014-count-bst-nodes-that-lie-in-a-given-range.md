---
title: "Count BST Nodes that Lie in a Given Range"
difficulty: "Easy"
tags: ["tree", "binary-search-tree", "range"]
---

## Problem

Given a binary search tree and a range [low, high], count the number of nodes whose values lie within the given range.

## Example

**Input:** root = [10,5,15,3,7,null,18], low = 7, high = 15  
**Output:** 4 (7,10,15, and possibly others)  

**Input:** root = [10,5,15,3,7,13,18,1,null,6], low = 6, high = 10  
**Output:** 3 (6,7,10)  

**Input:** root = [1], low = 0, high = 2  
**Output:** 1

## Solution Approach

### Method 1: Traverse All
1. Recursively traverse the tree
2. If node.val >= low and node.val <= high, count++
3. Return count

### Method 2: Use BST Property
1. If root is null, return 0
2. If root.val < low, search only right subtree
3. If root.val > high, search only left subtree
4. Else, count 1 + count in left + count in right

## Time Complexity

O(n) for traverse, O(h + k) for BST.

## Space Complexity

O(h) - Recursion stack.

## Edge Cases

- **No nodes in range**: 0
- **All nodes in range**: n
- **Range includes root**: Include subtrees
- **Empty tree**: 0

## Applications

- **BST Operations**: Range queries
- **Data Structures**: Count in range
- **Algorithm Problems**: BST ranges
- **Databases**: Range counts

## Practice Tips

- Utilize BST ordering
- Prune irrelevant subtrees
- Recursive counting
- Test with different ranges
