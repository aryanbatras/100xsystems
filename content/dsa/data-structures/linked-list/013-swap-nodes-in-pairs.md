---
title: "Swap Nodes in Pairs"
leetcode: "https://leetcode.com/problems/swap-nodes-in-pairs/"
difficulty: "Medium"
tags: ["linked-list", "recursion"]
---

## Problem

Given a linked list, swap every two adjacent nodes and return its head. You must solve the problem without modifying the values in the list's nodes (i.e., only nodes themselves may be changed.)

## Example

**Input:** head = [1,2,3,4]  
**Output:** [2,1,4,3]  

**Input:** head = []  
**Output:** []  

**Input:** head = [1]  
**Output:** [1]

## Solution Approach

### Method 1: Iterative
1. Create dummy node pointing to head
2. current = dummy
3. While current.next and current.next.next:
   - first = current.next
   - second = current.next.next
   - first.next = second.next
   - second.next = first
   - current.next = second
   - current = first
4. Return dummy.next

### Method 2: Recursive
1. If head is null or head.next is null, return head
2. new_head = head.next
3. head.next = swapPairs(new_head.next)
4. new_head.next = head
5. Return new_head

## Time Complexity

O(n) - Traverse the list.

## Space Complexity

O(1) for iterative, O(n) for recursive stack.

## Edge Cases

- **Empty list**: Return null
- **Single node**: Return as is
- **Odd number of nodes**: Last node unchanged
- **Even number of nodes**: All pairs swapped

## Applications

- **Linked List Rearrangement**: Swap adjacent nodes
- **Data Structures**: Common operation
- **Algorithm Problems**: Pointer manipulation
- **Interview Questions**: Classic problem

## Practice Tips

- Swap nodes, not values
- Handle pairs carefully
- Consider recursive vs iterative
- Practice with different lengths
