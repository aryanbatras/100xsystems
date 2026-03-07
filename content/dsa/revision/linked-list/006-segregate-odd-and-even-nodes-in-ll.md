---
title: "Segregate odd and even nodes in LL"
leetcode: "https://leetcode.com/problems/odd-even-linked-list/"
difficulty: "Medium"
tags: ["linked-list"]
---

## Problem

Given the head of a singly linked list, group all the nodes with odd indices together followed by the nodes with even indices, and return the reordered list. Note that the relative order inside both the even and odd groups should remain as it was in the input.

## Example

**Input:** head = [1,2,3,4,5]  
**Output:** [1,3,5,2,4]  

**Input:** head = [2,1,3,5,6,4,7]  
**Output:** [2,3,6,7,1,5,4]  

**Input:** head = [1,2,3,4]  
**Output:** [1,3,2,4]

## Solution Approach

### Method 1: Two Pointers
1. if not head: return head
2. odd = head
3. even = head.next
4. even_head = even
5. while even and even.next:
   - odd.next = even.next
   - odd = odd.next
   - even.next = odd.next
   - even = even.next
6. odd.next = even_head
7. return head

## Time Complexity

O(n) - Linear.

## Space Complexity

O(1) - Constant.

## Edge Cases

- **All odd positions**: Same order
- **All even positions**: Same order
- **Single node**: Same
- **Two nodes**: Swap if needed

## Applications

- **Linked List Rearrangement**: Odd even indices
- **In-place**: No extra space
- **Algorithms**: Pointer manipulation
- **Interview Questions**: Medium

## Practice Tips

- Separate odd and even chains
- Connect odd next to even next
- Append even head to odd tail
- Handle indices correctly
