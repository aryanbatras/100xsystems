---
title: "Remove Nth Node From Linked List"
leetcode: "https://leetcode.com/problems/remove-nth-node-from-end-of-list/"
difficulty: "Medium"
tags: ["linked-list", "two-pointers"]
---

## Problem

Given the head of a linked list, remove the nth node from the end of the list and return its head.

## Example

**Input:** head = [1,2,3,4,5], n = 2  
**Output:** [1,2,3,5]  

**Input:** head = [1], n = 1  
**Output:** []  

**Input:** head = [1,2], n = 1  
**Output:** [1]

## Solution Approach

### Method 1: Two Pointers
1. Create a dummy node pointing to head
2. Initialize fast = dummy, slow = dummy
3. Move fast n+1 steps ahead
4. While fast:
   - slow = slow.next
   - fast = fast.next
5. slow.next = slow.next.next
6. Return dummy.next

## Time Complexity

O(n) - Traverse the list.

## Space Complexity

O(1) - Constant space.

## Edge Cases

- **Remove head**: n = length
- **Remove last**: n = 1
- **Single node**: n = 1, return null
- **n > length**: Invalid, assume n valid

## Applications

- **Linked List Operations**: Remove by position from end
- **Data Structures**: Common operation
- **Algorithm Problems**: Two pointers technique
- **Interview Questions**: Classic problem

## Practice Tips

- Use dummy node for head removal
- Calculate steps carefully
- Handle edge cases
- Practice with different n values
