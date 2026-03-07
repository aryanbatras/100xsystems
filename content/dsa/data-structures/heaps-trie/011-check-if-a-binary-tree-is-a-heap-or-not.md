---
title: "Check if a Binary Tree is a Heap or Not"
difficulty: "Medium"
tags: ["tree", "heap", "validation"]
---

## Problem

Given a binary tree, determine if it is a heap.

A heap is a complete binary tree that satisfies the heap property (max heap: parent >= children).

## Example

**Input:** root = [10,9,8,7,6,5,4] (complete, max heap)  
**Output:** true  

**Input:** root = [10,9,8,7,null,5,4] (not complete)  
**Output:** false  

**Input:** root = [1]  
**Output:** true

## Solution Approach

### Method 1: Level Order and Check
1. Use queue for level order
2. Check complete: no node after a null, and all levels full except last left
3. Check heap: for each node, value >= children

## Time Complexity

O(n) - Visit each node.

## Space Complexity

O(w) - Queue.

## Edge Cases

- **Single node**: true
- **Null root**: true or false
- **Not complete**: false
- **Violates heap property**: false

## Applications

- **Tree Validation**: Check heap property
- **Data Structures**: Heap verification
- **Algorithms**: Tree checks
- **Interview Questions**: Common

## Practice Tips

- Check completeness
- Verify heap property
- Use level order
- Test with examples
