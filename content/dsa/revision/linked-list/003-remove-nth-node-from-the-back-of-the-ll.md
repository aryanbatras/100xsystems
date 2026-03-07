---
title: "Remove Nth node from the back of the LL"
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
1. dummy = ListNode(0, head)
2. fast = dummy
3. for _ in range(n + 1):
   - fast = fast.next
4. slow = dummy
5. while fast:
   - slow = slow.next
   - fast = fast.next
6. slow.next = slow.next.next
7. return dummy.next

## Time Complexity

O(n) - Linear.

## Space Complexity

O(1) - Constant.

## Edge Cases

- **Remove head**: n = length
- **Remove last**: n = 1
- **Single node**: n = 1
- **n > length**: Invalid

## Applications

- **Linked List Modification**: Remove node
- **Two Pointers**: Distance
- **Algorithms**: Dummy head
- **Interview Questions**: Medium

## Practice Tips

- Use dummy head
- Fast pointer ahead by n+1
- Slow follows fast
- Remove slow.next
