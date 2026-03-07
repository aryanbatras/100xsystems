---
title: "Detect a loop in LL"
leetcode: "https://leetcode.com/problems/linked-list-cycle/"
difficulty: "Easy"
tags: ["linked-list", "two-pointers", "hash-table"]
---

## Problem

Given head, the head of a linked list, determine if the linked list has a cycle in it.

## Example

**Input:** head = [3,2,0,-4], pos = 1  
**Output:** true  

**Input:** head = [1,2], pos = 0  
**Output:** true  

**Input:** head = [1], pos = -1  
**Output:** false

## Solution Approach

### Method 1: Two Pointers
1. slow = fast = head
2. while fast and fast.next:
   - slow = slow.next
   - fast = fast.next.next
   - if slow == fast:
     - return True
3. return False

### Method 2: Hash Set
1. seen = set()
2. current = head
3. while current:
   - if current in seen:
     - return True
   - seen.add(current)
   - current = current.next
4. return False

## Time Complexity

O(n) - Linear.

## Space Complexity

O(1) for two pointers, O(n) for hash.

## Edge Cases

- **No cycle**: False
- **Cycle at start**: True
- **Cycle at end**: True
- **Single node**: False

## Applications

- **Cycle Detection**: Linked lists
- **Two Pointers**: Floyd's algorithm
- **Hash Tables**: Visited nodes
- **Interview Questions**: Easy

## Practice Tips

- Use slow and fast pointers
- If they meet, cycle exists
- Hash for simplicity
- Handle null pointers
