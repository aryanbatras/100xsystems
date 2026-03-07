---
title: "Merge K Sorted Linked Lists"
leetcode: "https://leetcode.com/problems/merge-k-sorted-lists/"
difficulty: "Hard"
tags: ["linked-list", "heap", "divide-and-conquer"]
---

## Problem

You are given an array of k linked-lists lists, each linked-list is sorted in ascending order. Merge all the linked-lists into one sorted linked-list and return it.

## Example

**Input:** lists = [[1,4,5],[1,3,4],[2,6]]  
**Output:** [1,1,2,3,4,4,5,6]  

**Input:** lists = []  
**Output:** []  

**Input:** lists = [[]]  
**Output:** []

## Solution Approach

### Method 1: Min Heap
1. Create a min heap, push head of each non-empty list
2. Initialize dummy head, current = dummy
3. While heap:
   - Pop min node
   - current.next = node
   - current = current.next
   - If node.next, push node.next
4. Return dummy.next

### Method 2: Divide and Conquer
1. If k == 0, return null
2. If k == 1, return lists[0]
3. Mid = k // 2
4. Left = merge(lists[:mid])
5. Right = merge(lists[mid:])
6. Return merge_two(left, right)

## Time Complexity

O(n log k) - n total nodes.

## Space Complexity

O(k) for heap, O(log k) for recursion.

## Edge Cases

- **Empty lists**: []
- **Single list**: Return it
- **All empty**: []
- **Different lengths**: Works

## Applications

- **Linked List Merging**: Multiple lists
- **External Sorting**: Merge sorted lists
- **Data Structures**: Priority merging
- **Algorithms**: K-way merge

## Practice Tips

- Implement min heap for nodes
- Use divide and conquer
- Handle empty lists
- Test with different k
