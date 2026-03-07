---
title: "Odd Even Linked List"
leetcode: "https://leetcode.com/problems/odd-even-linked-list/"
difficulty: "Medium"
tags: ["linked-list"]
---

## Problem

Given the head of a singly linked list, group all the nodes with odd indices together followed by the nodes with even indices, and return the reordered list.

Note that the relative order inside both the even and odd groups should remain as it was in the input.

You must solve the problem in O(1) extra space complexity and O(n) time complexity.

## Example

**Input:** head = [1,2,3,4,5]  
**Output:** [1,3,5,2,4]  

**Input:** head = [2,1,3,5,6,4,7]  
**Output:** [2,3,6,7,1,5,4]  

**Input:** head = [1,2,3,4,5,6]  
**Output:** [1,3,5,2,4,6]

## Solution Approach

### Method 1: Separate Chains
1. Initialize odd = head, even = head.next, even_head = even
2. While even and even.next:
   - odd.next = even.next
   - odd = odd.next
   - even.next = odd.next
   - even = even.next
3. odd.next = even_head
4. Return head

## Time Complexity

O(n) - Single pass.

## Space Complexity

O(1) - Constant space.

## Edge Cases

- **Empty list**: Return null
- **Single node**: Return as is
- **Two nodes**: Return as is
- **Odd number of nodes**: Works
- **Even number of nodes**: Works

## Applications

- **Linked List Rearrangement**: Group by indices
- **Data Organization**: Separate odd/even positions
- **Algorithm Problems**: Common linked list problem
- **Interview Questions**: Test pointer manipulation

## Practice Tips

- Maintain two separate chains
- Handle the connections carefully
- Consider odd/even lengths
- Visualize the rearrangement
