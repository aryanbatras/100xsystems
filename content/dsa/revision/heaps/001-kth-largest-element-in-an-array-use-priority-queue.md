---
title: "Kth largest element in an array [use priority queue]"
leetcode: "https://leetcode.com/problems/kth-largest-element-in-an-array/"
difficulty: "Medium"
tags: ["array", "divide-and-conquer", "sorting", "heap", "priority-queue"]
---

## Problem

Given an integer array nums and an integer k, return the kth largest element in the array. Note that it is the kth largest element in the sorted order, not the kth distinct element.

## Example

**Input:** nums = [3,2,1,5,6,4], k = 2  
**Output:** 5  

**Input:** nums = [3,2,3,1,2,4,5,5,6], k = 4  
**Output:** 4  

**Input:** nums = [1], k = 1  
**Output:** 1

## Solution Approach

### Method 1: Min Heap
1. heap = []
2. for num in nums:
   - heapq.heappush(heap, num)
   - if len(heap) > k:
     - heapq.heappop(heap)
3. return heap[0]

## Time Complexity

O(n log k) - Heap operations.

## Space Complexity

O(k) - Heap size.

## Edge Cases

- **k = 1**: Largest element
- **k = n**: Smallest element
- **Duplicates**: Allowed
- **Sorted array**: kth from end

## Applications

- **Heap Problems**: Kth element
- **Priority Queue**: Min heap
- **Arrays**: Selection
- **Interview Questions**: Medium

## Practice Tips

- Use min heap of size k
- Keep k largest
- Root is kth largest
- Handle duplicates
