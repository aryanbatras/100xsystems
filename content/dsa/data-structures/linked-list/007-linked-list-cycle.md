---
title: "Linked List Cycle"
leetcode: "https://leetcode.com/problems/linked-list-cycle/"
difficulty: "Easy"
tags: ["linked-list", "two-pointers"]
---

## Problem

Given head, the head of a linked list, determine if the linked list has a cycle in it.

There is a cycle in a linked list if there is some node in the list that can be reached again by continuously following the next pointer. Internally, pos is used to denote the index of the node that tail's next pointer is connected to. Note that pos is not passed as a parameter.

Return true if there is a cycle in the linked list. Otherwise, return false.

## Example

**Input:** head = [3,2,0,-4], pos = 1  
**Output:** true  

**Input:** head = [1,2], pos = 0  
**Output:** true  

**Input:** head = [1], pos = -1  
**Output:** false

## Solution Approach

### Method 1: Hash Set
1. Use a set to store visited nodes
2. Traverse the list, if node in set, cycle
3. Else add to set

### Method 2: Two Pointers (Floyd's Cycle Detection)
1. Initialize slow = head, fast = head
2. While fast and fast.next:
   - slow = slow.next
   - fast = fast.next.next
   - If slow == fast, return true
3. Return false

## Time Complexity

O(n) - n nodes.

## Space Complexity

O(1) for two pointers, O(n) for hash set.

## Edge Cases

- **No cycle**: Return false
- **Cycle at beginning**: Return true
- **Single node**: No cycle
- **Two nodes with cycle**: Return true

## Applications

- **Cycle Detection**: Detect loops in linked lists
- **Graph Algorithms**: Cycle detection in graphs
- **Data Integrity**: Check for corruption
- **Interview Problems**: Classic problem

## Practice Tips

- Implement Floyd's algorithm
- Handle null heads
- Consider different cycle positions
- Practice with different list lengths
