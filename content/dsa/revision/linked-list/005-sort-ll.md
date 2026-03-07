---
title: "Sort LL"
leetcode: "https://leetcode.com/problems/sort-list/"
difficulty: "Medium"
tags: ["linked-list", "divide-and-conquer", "merge-sort", "sorting"]
---

## Problem

Given the head of a linked list, return the list after sorting it in ascending order.

## Example

**Input:** head = [4,2,1,3]  
**Output:** [1,2,3,4]  

**Input:** head = [-1,5,3,4,0]  
**Output:** [-1,0,3,4,5]  

**Input:** head = []  
**Output:** []

## Solution Approach

### Method 1: Merge Sort
1. def sortList(head):
   - if not head or not head.next:
     - return head
   - mid = find_mid(head)
   - right = sortList(mid.next)
   - mid.next = None
   - left = sortList(head)
   - return merge(left, right)

2. def find_mid(head):
   - slow = fast = head
   - while fast.next and fast.next.next:
     - slow = slow.next
     - fast = fast.next.next
   - return slow

3. def merge(a, b):
   - dummy = ListNode()
   - tail = dummy
   - while a and b:
     - if a.val < b.val:
       - tail.next = a
       - a = a.next
     - else:
       - tail.next = b
       - b = b.next
     - tail = tail.next
   - tail.next = a or b
   - return dummy.next

## Time Complexity

O(n log n) - Merge sort.

## Space Complexity

O(log n) - Recursion stack.

## Edge Cases

- **Empty list**: Null
- **One node**: Same
- **Already sorted**: Same
- **Reverse sorted**: Sorted

## Applications

- **Linked List Sorting**: Merge sort
- **Divide and Conquer**: Split and merge
- **In-place**: No extra space except recursion
- **Interview Questions**: Medium

## Practice Tips

- Find middle with two pointers
- Recursively sort halves
- Merge two sorted lists
- Handle null pointers
