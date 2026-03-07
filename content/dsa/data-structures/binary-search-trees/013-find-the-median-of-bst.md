---
title: "Find the Median of BST"
difficulty: "Easy"
tags: ["tree", "binary-search-tree", "median"]
---

## Problem

Given a binary search tree, find the median of the BST.

The median is the middle value in the sorted order. If the number of nodes is odd, return the middle value. If even, return the average of the two middle values.

## Example

**Input:** root = [6,3,8,1,4,7,9]  
**Output:** 6 (sorted: 1,3,4,6,7,8,9, median 6)  

**Input:** root = [6,3,8,1,4,7]  
**Output:** 5 (sorted: 1,3,4,6,7,8, median (4+6)/2 = 5)  

**Input:** root = [1]  
**Output:** 1

## Solution Approach

### Method 1: Inorder Traversal
1. Perform inorder traversal to get the sorted list
2. If n % 2 == 1, return list[n//2]
3. Else, return (list[n//2 - 1] + list[n//2]) / 2

### Method 2: Find Kth Smallest
1. Find the total number of nodes n
2. If n % 2 == 1, return kth smallest with k = n//2 + 1
3. Else, return average of kth with k = n//2 and k = n//2 + 1

## Time Complexity

O(n) - Inorder or multiple kth.

## Space Complexity

O(n) for inorder, O(h) for kth.

## Edge Cases

- **Single node**: The node
- **Odd number**: Middle value
- **Even number**: Average of two middle
- **All same**: Same value

## Applications

- **Statistics**: Median in BST
- **Data Structures**: BST queries
- **Algorithm Problems**: Median finding
- **Analysis**: Central tendency

## Practice Tips

- Inorder gives sorted
- Handle even/odd cases
- Use kth smallest for optimization
- Test with different sizes
