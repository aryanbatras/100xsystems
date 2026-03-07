---
title: "Intersection of Two Linked List"
leetcode: "https://leetcode.com/problems/intersection-of-two-linked-lists/"
difficulty: "Easy"
tags: ["linked-list"]
---

## Problem

Given the heads of two singly linked-lists headA and headB, return the node at which the two lists intersect. If the two linked lists have no intersection at all, return null.

## Example

**Input:** intersectVal = 8, listA = [4,1,8,4,5], listB = [5,6,1,8,4,5], skipA = 2, skipB = 3  
**Output:** Intersected at '8'  

**Input:** intersectVal = 2, listA = [1,9,1,2,4], listB = [3,2,4], skipA = 3, skipB = 1  
**Output:** Intersected at '2'  

**Input:** intersectVal = 0, listA = [2,6,4], listB = [1,5], skipA = 3, skipB = 2  
**Output:** No intersection

## Solution Approach

### Method 1: Hash Set
1. Traverse list A, store all nodes in a set
2. Traverse list B, return the first node that is in the set

### Method 2: Two Pointers (Optimal)
1. Initialize pointerA = headA, pointerB = headB
2. While pointerA != pointerB:
   - If pointerA is null, set to headB
   - Else pointerA = pointerA.next
   - If pointerB is null, set to headA
   - Else pointerB = pointerB.next
3. Return pointerA (will be intersection or null)

## Time Complexity

O(m + n) - Lengths of both lists.

## Space Complexity

O(1) for two pointers, O(m) for hash set.

## Edge Cases

- **No intersection**: Return null
- **Intersection at head**: Return head
- **One list empty**: Return null
- **Different lengths**: Works due to switching

## Applications

- **Linked List Problems**: Find common nodes
- **Cycle Detection Variants**: Intersection detection
- **Data Structures**: List operations
- **Algorithm Interviews**: Common problem

## Practice Tips

- Understand the two pointers switching
- Handle different list lengths
- Consider intersection scenarios
- Practice with diagrams
