---
title: "Merge K Sorted Linked List"
leetcode: "https://leetcode.com/problems/merge-k-sorted-lists/"
difficulty: "Hard"
tags: ["linked-list", "divide-and-conquer", "heap"]
---

## Problem

You are given an array of k linked-lists lists, each linked-list is sorted in ascending order.

Merge all the linked-lists into one sorted linked-list and return it.

## Example

**Input:** lists = [[1,4,5],[1,3,4],[2,6]]  
**Output:** [1,1,2,3,4,4,5,6]  

**Input:** lists = []  
**Output:** []  

**Input:** lists = [[]]  
**Output:** []

## Solution Approach

### Method 1: Divide and Conquer
1. If k == 0, return null
2. If k == 1, return lists[0]
3. Recursively merge left half and right half
4. Merge the two sorted lists

### Method 2: Priority Queue (Min Heap)
1. Create a min heap, add the head of each list
2. While heap not empty:
   - Pop the smallest, add to result
   - If the popped node has next, add next to heap
3. Return result head

## Time Complexity

O(n log k) - n total nodes, k lists.

## Space Complexity

O(1) for divide and conquer, O(k) for heap.

## Edge Cases

- **Empty lists**: Return null
- **Single list**: Return it
- **Some empty lists**: Ignore them
- **All empty**: Return null

## Applications

- **External Sorting**: Merge sorted files
- **Data Merging**: Combine multiple sorted streams
- **Database Operations**: Merge sorted results
- **Algorithm Problems**: Common in interviews

## Practice Tips

- Implement merge function
- Choose appropriate method based on k
- Handle empty lists
- Practice with different k values
