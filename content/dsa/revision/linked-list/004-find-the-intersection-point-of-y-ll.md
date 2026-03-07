---
title: "Find the intersection point of Y LL"
leetcode: "https://leetcode.com/problems/intersection-of-two-linked-lists/"
difficulty: "Easy"
tags: ["linked-list", "two-pointers", "hash-table"]
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

### Method 1: Two Pointers
1. a = headA
2. b = headB
3. while a != b:
   - a = a.next if a else headB
   - b = b.next if b else headA
4. return a

### Method 2: Hash Set
1. seen = set()
2. current = headA
3. while current:
   - seen.add(current)
   - current = current.next
4. current = headB
5. while current:
   - if current in seen:
     - return current
   - current = current.next
6. return None

## Time Complexity

O(n + m) - Linear.

## Space Complexity

O(1) for two pointers, O(n) for hash.

## Edge Cases

- **No intersection**: Null
- **Intersect at head**: Head
- **Intersect at tail**: Tail
- **One empty**: Null

## Applications

- **Intersection Finding**: Linked lists
- **Two Pointers**: Switch lists
- **Hash Tables**: Visited nodes
- **Interview Questions**: Easy

## Practice Tips

- Traverse both lists
- Switch to other head when null
- Meet at intersection
- Hash for alternative
