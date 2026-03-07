---
title: "Insertion Sort on Linked List"
leetcode: "https://leetcode.com/problems/insertion-sort-list/"
difficulty: "Medium"
tags: ["linked-list", "sorting"]
---

## Problem

Given the head of a singly linked list, sort the list using insertion sort, and return the sorted list's head.

All the values of the linked list are unique.

## Example

**Input:** head = [4,2,1,3]  
**Output:** [1,2,3,4]  

**Input:** head = [-1,5,3,4,0]  
**Output:** [-1,0,3,4,5]  

**Input:** head = [1]  
**Output:** [1]

## Solution Approach

### Method 1: Maintain Sorted Prefix
1. Create a dummy node pointing to head
2. current = head
3. While current:
   - next_node = current.next
   - prev = dummy
   - while prev.next and prev.next.val < current.val:
     - prev = prev.next
   - current.next = prev.next
   - prev.next = current
   - current = next_node
4. Return dummy.next

## Time Complexity

O(n^2) worst case, O(n) best case.

## Space Complexity

O(1) - In-place sorting.

## Edge Cases

- **Already sorted**: O(n) time
- **Reverse sorted**: O(n^2) time
- **Single node**: Unchanged
- **Negative numbers**: Works

## Applications

- **Linked List Sorting**: When space is limited
- **Adaptive Sorting**: Good for nearly sorted lists
- **Stable Sorting**: Maintains relative order
- **Online Algorithms**: Sort as elements arrive

## Practice Tips

- Understand insertion into sorted part
- Handle dummy node
- Consider time complexity
- Practice with different orders
