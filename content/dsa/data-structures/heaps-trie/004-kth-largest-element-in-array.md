---
title: "Kth Largest Element in Array"
leetcode: "https://leetcode.com/problems/kth-largest-element-in-an-array/"
difficulty: "Medium"
tags: ["heap", "divide-and-conquer"]
---

## Problem

Given an integer array nums and an integer k, return the kth largest element in the array.

Note that it is the kth largest element in the sorted order, not the kth distinct element.

Can you solve it without sorting?

## Example

**Input:** nums = [3,2,1,5,6,4], k = 2  
**Output:** 5  

**Input:** nums = [3,2,3,1,2,4,5,5,6], k = 4  
**Output:** 4  

**Input:** nums = [1], k = 1  
**Output:** 1

## Solution Approach

### Method 1: Min Heap
1. Use a min heap of size k
2. For each num in nums:
   - heap.push(num)
   - if heap.size > k, heap.pop()
3. Return heap.top()

### Method 2: Quickselect
1. Use partition to find the kth largest
2. Choose pivot, partition
3. If index == n - k, return
4. Else recurse on left or right

## Time Complexity

O(n log k) for heap, O(n) average for quickselect.

## Space Complexity

O(k) for heap, O(1) for quickselect.

## Edge Cases

- **k = 1**: Largest element
- **k = n**: Smallest element
- **Duplicates**: Handled
- **Single element**: Itself

## Applications

- **Statistics**: Find kth largest
- **Data Analysis**: Order statistics
- **Algorithms**: Selection problems
- **Interview Questions**: Common

## Practice Tips

- Implement min heap
- Use quickselect for efficiency
- Handle k boundaries
- Test with duplicates
