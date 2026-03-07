---
title: "Add Two Numbers"
leetcode: "https://leetcode.com/problems/add-two-numbers/"
difficulty: "Medium"
tags: ["linked-list", "math"]
---

## Problem

You are given two non-empty linked lists representing two non-negative integers. The digits are stored in reverse order, and each of their nodes contains a single digit. Add the two numbers and return the sum as a linked list.

You may assume the two numbers do not contain any leading zero, except the number 0 itself.

## Example

**Input:** l1 = [2,4,3], l2 = [5,6,4]  
**Output:** [7,0,8] (342 + 465 = 807)  

**Input:** l1 = [0], l2 = [0]  
**Output:** [0]  

**Input:** l1 = [9,9,9,9,9,9,9], l2 = [9,9,9,9]  
**Output:** [8,9,9,9,0,0,0,1]

## Solution Approach

### Method 1: Iterative Addition with Carry
1. Initialize dummy node, current = dummy, carry = 0
2. While l1 or l2 or carry:
   - val1 = l1.val if l1 else 0
   - val2 = l2.val if l2 else 0
   - total = val1 + val2 + carry
   - carry = total // 10
   - current.next = ListNode(total % 10)
   - current = current.next
   - if l1: l1 = l1.next
   - if l2: l2 = l2.next
3. Return dummy.next

## Time Complexity

O(max(m, n)) - Length of longer list.

## Space Complexity

O(max(m, n)) - For result list.

## Edge Cases

- **Different lengths**: Handles with zeros
- **Carry propagation**: Adds extra digit
- **One list empty**: Treat as zero
- **Both zero**: Returns [0]

## Applications

- **Large Number Addition**: Add numbers larger than int
- **Linked List Operations**: Common problem
- **Mathematical Computations**: Digit-wise addition
- **Interview Questions**: Classic problem

## Practice Tips

- Handle carry correctly
- Use dummy node for result
- Consider different list lengths
- Practice with large numbers
