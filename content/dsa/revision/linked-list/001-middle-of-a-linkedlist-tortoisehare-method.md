---
title: "Middle of a LinkedList [TortoiseHare Method]"
leetcode: "https://leetcode.com/problems/middle-of-the-linked-list/"
difficulty: "Easy"
tags: ["linked-list", "two-pointers"]
---

## Problem

Given the head of a singly linked list, return the middle node of the linked list. If there are two middle nodes, return the second middle node.

## Example

**Input:** head = [1,2,3,4,5]  
**Output:** [3,4,5]  

**Input:** head = [1,2,3,4,5,6]  
**Output:** [4,5,6]  

**Input:** head = [1]  
**Output:** [1]

## Solution Approach

### Method 1: Two Pointers
1. slow = fast = head
2. while fast and fast.next:
   - slow = slow.next
   - fast = fast.next.next
3. return slow

## Time Complexity

O(n) - Linear.

## Space Complexity

O(1) - Constant.

## Edge Cases

- **Odd length**: Middle node
- **Even length**: Second middle
- **Single node**: Head
- **Two nodes**: Second

## Applications

- **Linked List Traversal**: Middle finding
- **Two Pointers**: Slow and fast
- **Algorithms**: Floyd's cycle detection variant
- **Interview Questions**: Easy

## Practice Tips

- Use slow and fast pointers
- Fast moves twice as fast
- Slow at middle when fast ends
- Handle even/odd lengths
