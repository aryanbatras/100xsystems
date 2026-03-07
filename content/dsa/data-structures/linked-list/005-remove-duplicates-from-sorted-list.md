---
title: "Remove Duplicates from Sorted List"
leetcode: "https://leetcode.com/problems/remove-duplicates-from-sorted-list/"
difficulty: "Easy"
tags: ["linked-list"]
---

## Problem

Given the head of a sorted linked list, delete all duplicates such that each element appears only once. Return the linked list sorted as well.

## Example

**Input:** head = [1,1,2]  
**Output:** [1,2]  

**Input:** head = [1,1,2,3,3]  
**Output:** [1,2,3]  

**Input:** head = [1,2,3]  
**Output:** [1,2,3]

## Solution Approach

### Method 1: Iterative Traversal
1. If head is null, return null
2. Initialize current = head
3. While current and current.next exist:
   - If current.val == current.next.val:
     - current.next = current.next.next
   - Else:
     - current = current.next
4. Return head

## Time Complexity

O(n) - Single pass through the list.

## Space Complexity

O(1) - Constant space.

## Edge Cases

- **Empty list**: Return null
- **Single node**: Return as is
- **All duplicates**: Return single node
- **No duplicates**: Return original list

## Applications

- **Data Cleaning**: Remove duplicates in sorted data
- **Linked List Operations**: Common operation
- **Algorithm Problems**: Basic linked list problem
- **Data Structures**: Maintaining unique elements

## Practice Tips

- Handle the sorted property
- Use current pointer carefully
- Consider edge cases
- Practice with different duplicate patterns
