---
title: "Swapping Nodes in a Linked List"
leetcode: "https://leetcode.com/problems/swapping-nodes-in-a-linked-list/"
difficulty: "Medium"
tags: ["linked-list", "two-pointers"]
---

## Problem

You are given the head of a linked list, and an integer k.

Return the head of the linked list after swapping the values of the kth node from the beginning and the kth node from the end (the list is 1-indexed).

## Example

**Input:** head = [1,2,3,4,5], k = 2  
**Output:** [1,4,3,2,5]  

**Input:** head = [7,9,6,6,7,8,3,0,9,5], k = 5  
**Output:** [7,9,6,6,8,7,3,0,9,5]  

**Input:** head = [1], k = 1  
**Output:** [1]

## Solution Approach

### Method 1: Find and Swap
1. Find the length of the list
2. Find the kth node from start: traverse k-1 steps
3. Find the kth node from end: traverse length - k steps
4. Swap their values
5. Return head

## Time Complexity

O(n) - Traverse the list.

## Space Complexity

O(1) - Constant space.

## Edge Cases

- **k = 1**: Swap first and last
- **k = length**: Swap the same node
- **Single node**: No change
- **k > length/2**: Still works

## Applications

- **Linked List Operations**: Swap nodes by position
- **Data Manipulation**: Rearrange elements
- **Algorithm Problems**: Position-based operations
- **Interview Questions**: Common variant

## Practice Tips

- Handle 1-indexing
- Find both nodes efficiently
- Consider edge positions
- Practice with different k values
