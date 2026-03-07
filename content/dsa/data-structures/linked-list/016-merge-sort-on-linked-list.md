---
title: "Merge Sort on Linked List"
leetcode: "https://leetcode.com/problems/sort-list/"
difficulty: "Medium"
tags: ["linked-list", "sorting", "divide-and-conquer"]
---

## Problem

Given the head of a linked list, return the list after sorting it in ascending order.

## Example

**Input:** head = [4,2,1,3]  
**Output:** [1,2,3,4]  

**Input:** head = [-1,5,3,4,0]  
**Output:** [-1,0,3,4,5]  

**Input:** head = [1]  
**Output:** [1]

## Solution Approach

### Method 1: Top-Down Merge Sort
1. If head is null or head.next is null, return head
2. Find the middle of the list using slow and fast pointers
3. Split the list into two halves
4. Recursively sort the left half
5. Recursively sort the right half
6. Merge the two sorted halves

### Find Middle
1. slow = head, fast = head.next
2. While fast and fast.next:
   - slow = slow.next
   - fast = fast.next.next
3. Return slow

### Merge
1. As in merge two sorted lists

## Time Complexity

O(n log n) - Divide and conquer.

## Space Complexity

O(log n) - Recursion stack.

## Edge Cases

- **Empty list**: Return null
- **Single node**: Return as is
- **Already sorted**: Still O(n log n)
- **Reverse sorted**: Correctly sorted

## Applications

- **Linked List Sorting**: Efficient for linked structures
- **Stable Sorting**: Maintains relative order
- **External Sorting**: Adaptable for large data
- **Data Structures**: Common operation

## Practice Tips

- Find middle using slow/fast pointers
- Split the list carefully
- Implement merge function
- Handle base cases
