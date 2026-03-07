---
title: "Split Linked List in Parts"
leetcode: "https://leetcode.com/problems/split-linked-list-in-parts/"
difficulty: "Medium"
tags: ["linked-list"]
---

## Problem

Given the head of a singly linked list and an integer k, split the linked list into k consecutive linked list parts.

The length of each part should be as equal as possible: no two parts should have a size differing by more than one. This may lead to some parts being null.

The parts should be in the same order as they occur in the input list, and parts occurring earlier should always have a size greater than or equal to parts occurring later.

Return an array of the k linked list parts.

## Example

**Input:** head = [1,2,3], k = 5  
**Output:** [[1],[2],[3],[],[]]  

**Input:** head = [1,2,3,4,5,6,7,8,9,10], k = 3  
**Output:** [[1,2,3,4],[5,6,7],[8,9,10]]  

**Input:** head = [1,2,3,4], k = 2  
**Output:** [[1,2],[3,4]]

## Solution Approach

### Method 1: Calculate Sizes and Split
1. Find the length n of the list
2. Calculate base_size = n // k, extra = n % k
3. Initialize result array of size k
4. current = head
5. For i in 0 to k-1:
   - size = base_size + (1 if i < extra else 0)
   - part_head = current
   - for j in 0 to size-1:
     - if current: current = current.next
   - if part_head:
     - temp = part_head
     - for j in 0 to size-2:
       - temp = temp.next
     - if temp: temp.next = null
   - result[i] = part_head
6. Return result

## Time Complexity

O(n + k) - Traverse list and build result.

## Space Complexity

O(k) - For result array.

## Edge Cases

- **k > n**: Extra parts are null
- **k = 1**: Whole list in one part
- **n = 0**: k null parts
- **Equal division**: All parts same size

## Applications

- **Linked List Partitioning**: Split into equal parts
- **Data Distribution**: Divide data into chunks
- **Algorithm Problems**: Common operation
- **Load Balancing**: Distribute work

## Practice Tips

- Calculate sizes for each part
- Handle null parts
- Maintain order
- Practice with different k and n
