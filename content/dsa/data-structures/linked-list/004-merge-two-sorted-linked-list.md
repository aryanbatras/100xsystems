---
title: "Merge Two Sorted Linked List"
leetcode: "https://leetcode.com/problems/merge-two-sorted-lists/"
difficulty: "Easy"
tags: ["linked-list"]
---

## Problem

You are given the heads of two sorted linked lists list1 and list2.

Merge the two lists in a one sorted list. The list should be made by splicing together the nodes of the first two lists.

Return the head of the merged linked list.

## Example

**Input:** list1 = [1,2,4], list2 = [1,3,4]  
**Output:** [1,1,2,3,4,4]  

**Input:** list1 = [], list2 = []  
**Output:** []  

**Input:** list1 = [], list2 = [0]  
**Output:** [0]

## Solution Approach

### Method 1: Iterative
1. Create a dummy node to simplify code
2. Initialize current = dummy
3. While both lists are not empty:
   - If list1.val <= list2.val:
     - current.next = list1
     - list1 = list1.next
   - Else:
     - current.next = list2
     - list2 = list2.next
   - current = current.next
4. Append the remaining list to current
5. Return dummy.next

### Method 2: Recursive
1. If list1 is null, return list2
2. If list2 is null, return list1
3. If list1.val <= list2.val:
   - list1.next = mergeTwoLists(list1.next, list2)
   - Return list1
4. Else:
   - list2.next = mergeTwoLists(list1, list2.next)
   - Return list2

## Time Complexity

O(m + n) - Where m and n are lengths of lists.

## Space Complexity

O(1) for iterative, O(m + n) for recursive stack.

## Edge Cases

- **One list empty**: Return the other list
- **Both lists empty**: Return null
- **Lists of different lengths**: Works fine
- **Duplicate values**: Maintains sorted order

## Applications

- **Merge Operations**: Combining sorted data
- **External Sorting**: Merge phase
- **Data Structures**: Linked list operations
- **Algorithm Problems**: Common in interviews

## Practice Tips

- Use a dummy node for iterative approach
- Handle null lists
- Consider recursive vs iterative
- Practice with different list sizes
