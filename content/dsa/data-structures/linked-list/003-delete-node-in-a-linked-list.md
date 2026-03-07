---
title: "Delete Node in a Linked List"
leetcode: "https://leetcode.com/problems/delete-node-in-a-linked-list/"
difficulty: "Medium"
tags: ["linked-list"]
---

## Problem

Write a function to delete a node in a singly-linked list. You will not be given access to the head of the list, instead you will be given access to the node to be deleted directly.

It is guaranteed that the node to be deleted is not a tail node in the list.

## Example

**Input:** head = [4,5,1,9], node = 5  
**Output:** [4,1,9]  

**Input:** head = [4,5,1,9], node = 1  
**Output:** [4,5,9]  

**Input:** head = [1,2,3,4], node = 2  
**Output:** [1,3,4]

## Solution Approach

### Method 1: Copy Next Node Value
1. Since we can't access the previous node, copy the value of the next node to the current node
2. Set the current node's next to the next node's next
3. Effectively "deletes" the next node by overwriting it

## Time Complexity

O(1) - Constant time.

## Space Complexity

O(1) - No extra space.

## Edge Cases

- **Node is not tail**: Guaranteed by problem
- **Next node exists**: Always true
- **Single node list**: Won't happen
- **Node in middle**: Works

## Applications

- **Linked List Operations**: Delete without head access
- **Node Removal**: In-place deletion
- **Data Structures**: Linked list manipulation
- **Interview Problems**: Common trick question

## Practice Tips

- Understand the constraint of no head access
- Realize you can't delete the node directly
- Practice with different positions
- Consider the linked list structure
