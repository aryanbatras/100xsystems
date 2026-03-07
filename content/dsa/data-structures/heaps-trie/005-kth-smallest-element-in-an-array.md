---
title: "Kth Smallest Element in an Array"
difficulty: "Medium"
tags: ["heap", "divide-and-conquer"]
---

## Problem

Given an array and an integer k, find the kth smallest element in the array.

## Example

**Input:** arr = [7,10,4,3,20,15], k = 3  
**Output:** 7  

**Input:** arr = [7,10,4,20,15], k = 4  
**Output:** 15  

**Input:** arr = [1], k = 1  
**Output:** 1

## Solution Approach

### Method 1: Max Heap
1. Use a max heap of size k
2. For each num in arr:
   - heap.push(num)
   - if heap.size > k, heap.pop()
3. Return heap.top()

### Method 2: Quickselect
1. Use partition to find the kth smallest
2. Choose pivot, partition
3. If index == k-1, return
4. Else recurse on left or right

### Method 3: Sort and Return
1. Sort the array
2. Return arr[k-1]

## Time Complexity

O(n log k) for heap, O(n) for quickselect, O(n log n) for sort.

## Space Complexity

O(k) for heap, O(1) for quickselect, O(1) for sort.

## Edge Cases

- **k = 1**: Smallest element
- **k = n**: Largest element
- **Duplicates**: Handled
- **Single element**: Itself

## Applications

- **Statistics**: Find kth smallest
- **Data Analysis**: Order statistics
- **Algorithms**: Selection problems
- **Interview Questions**: Common

## Practice Tips

- Implement max heap
- Use quickselect for efficiency
- Handle k boundaries
- Test with duplicates
