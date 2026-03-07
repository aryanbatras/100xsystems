---
title: "Implement Heap Sort"
difficulty: "Medium"
tags: ["heap", "sorting", "array"]
---

## Problem

Implement heap sort to sort an array in ascending order.

## Example

**Input:** arr = [12,11,13,5,6,7]  
**Output:** [5,6,7,11,12,13]  

**Input:** arr = [4,3,2,1]  
**Output:** [1,2,3,4]  

**Input:** arr = [1]  
**Output:** [1]

## Solution Approach

### Method 1: Max Heap Sort
1. Build a max heap from the array
2. For i from n-1 downto 0:
   - Swap arr[0] with arr[i]
   - Heapify the heap from 0 to i-1

### Build Heap
1. For i from n//2 - 1 downto 0:
   - heapify(arr, n, i)

### Heapify
1. largest = i
2. left = 2*i + 1, right = 2*i + 2
3. If left < n and arr[left] > arr[largest], largest = left
4. If right < n and arr[right] > arr[largest], largest = right
5. If largest != i, swap arr[i] and arr[largest], heapify(arr, n, largest)

## Time Complexity

O(n log n) - Build O(n), extract O(n log n).

## Space Complexity

O(1) - In-place.

## Edge Cases

- **Single element**: Sorted
- **Already sorted**: Still O(n log n)
- **Reverse sorted**: Works
- **Duplicates**: Handled

## Applications

- **Sorting Algorithms**: Efficient sorting
- **Priority Queues**: Based on heaps
- **Data Structures**: Heap operations
- **Performance**: Good worst case

## Practice Tips

- Implement heapify
- Build heap correctly
- Extract elements
- Test with different arrays
