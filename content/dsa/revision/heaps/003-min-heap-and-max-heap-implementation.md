---
title: "Min Heap and Max Heap Implementation"
difficulty: "Easy"
tags: ["heap", "data-structure", "priority-queue"]
---

## Problem

Implement a min heap and a max heap data structure.

## Example

**Min Heap:** push 3,1,4,1,5 -> pop -> 1

**Max Heap:** push 3,1,4,1,5 -> pop -> 5

## Solution Approach

### Method 1: Array Implementation
1. class MinHeap:
   - def __init__(self):
     - self.heap = []
   - def push(self, val):
     - self.heap.append(val)
     - self._heapify_up(len(self.heap) - 1)
   - def pop(self):
     - if not self.heap: return None
     - min_val = self.heap[0]
     - self.heap[0] = self.heap[-1]
     - self.heap.pop()
     - self._heapify_down(0)
     - return min_val
   - def _heapify_up(self, i):
     - parent = (i - 1) // 2
     - if i > 0 and self.heap[i] < self.heap[parent]:
       - self.heap[i], self.heap[parent] = self.heap[parent], self.heap[i]
       - self._heapify_up(parent)
   - def _heapify_down(self, i):
     - left = 2 * i + 1
     - right = 2 * i + 2
     - smallest = i
     - if left < len(self.heap) and self.heap[left] < self.heap[smallest]:
       - smallest = left
     - if right < len(self.heap) and self.heap[right] < self.heap[smallest]:
       - smallest = right
     - if smallest != i:
       - self.heap[i], self.heap[smallest] = self.heap[smallest], self.heap[i]
       - self._heapify_down(smallest)

2. class MaxHeap:
   - def __init__(self):
     - self.heap = []
   - def push(self, val):
     - self.heap.append(val)
     - self._heapify_up(len(self.heap) - 1)
   - def pop(self):
     - if not self.heap: return None
     - max_val = self.heap[0]
     - self.heap[0] = self.heap[-1]
     - self.heap.pop()
     - self._heapify_down(0)
     - return max_val
   - def _heapify_up(self, i):
     - parent = (i - 1) // 2
     - if i > 0 and self.heap[i] > self.heap[parent]:
       - self.heap[i], self.heap[parent] = self.heap[parent], self.heap[i]
       - self._heapify_up(parent)
   - def _heapify_down(self, i):
     - left = 2 * i + 1
     - right = 2 * i + 2
     - largest = i
     - if left < len(self.heap) and self.heap[left] > self.heap[largest]:
       - largest = left
     - if right < len(self.heap) and self.heap[right] > self.heap[largest]:
       - largest = right
     - if largest != i:
       - self.heap[i], self.heap[largest] = self.heap[largest], self.heap[i]
       - self._heapify_down(largest)

## Time Complexity

O(log n) per operation.

## Space Complexity

O(n) - Array.

## Edge Cases

- **Empty heap**: Pop None
- **Single element**: Push and pop
- **Duplicates**: Allowed
- **Negative numbers**: Ok

## Applications

- **Priority Queues**: Min/Max heap
- **Data Structures**: Heap implementation
- **Sorting**: Heap sort
- **Interview Questions**: Easy

## Practice Tips

- Use array for storage
- Heapify up on push
- Heapify down on pop
- Parent/child indices
