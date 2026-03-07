---
title: "Implement a Min Heap"
difficulty: "Medium"
tags: ["heap", "priority-queue", "data-structure"]
---

## Problem

Implement a min heap data structure.

A min heap is a complete binary tree where each node is less than or equal to its children.

## Example

Operations: insert(3), insert(2), insert(4), extract_min() -> 2

## Solution Approach

### Min Heap Implementation
1. Use an array to represent the heap
2. Root at index 0
3. Left child: 2*i + 1, Right child: 2*i + 2
4. Parent: (i-1)//2

### Insert
1. Append the value to the array
2. Heapify up from the new index

### Heapify Up
1. While current > 0 and arr[parent] > arr[current]:
   - Swap arr[parent] and arr[current]
   - current = parent

### Extract Min
1. If heap empty, error
2. min_val = arr[0]
3. arr[0] = arr[-1], remove last
4. Heapify down from 0

### Heapify Down
1. smallest = current
2. left = 2*current + 1, right = 2*current + 2
3. If left < size and arr[left] < arr[smallest], smallest = left
4. If right < size and arr[right] < arr[smallest], smallest = right
5. If smallest != current, swap, heapify_down(smallest)

## Time Complexity

O(log n) for insert and extract.

## Space Complexity

O(n) - For the array.

## Edge Cases

- **Empty heap**: Extract error
- **Single element**: Works
- **Insert duplicates**: Allowed
- **Heapify**: Maintains property

## Applications

- **Priority Queues**: Min priority
- **Sorting**: Heap sort variant
- **Algorithms**: Prim, Dijkstra
- **Data Structures**: Min heap

## Practice Tips

- Implement heapify correctly
- Use array indices
- Test insert and extract
- Handle edge cases
