---
title: "Reversing a Queue"
difficulty: "Easy"
tags: ["queue", "stack"]
---

## Problem

Reverse the elements of a queue.

## Example

Queue: [1,2,3,4,5] -> [5,4,3,2,1]

## Solution Approach

### Method 1: Using Stack
1. Create an empty stack
2. Dequeue all elements from the queue and push them onto the stack
3. Pop all elements from the stack and enqueue them back into the queue

### Method 2: Recursive
1. If the queue is empty, return
2. Dequeue the front element
3. Recursively reverse the remaining queue
4. Enqueue the dequeued element back to the queue

## Time Complexity

O(n) - Each element processed once.

## Space Complexity

O(n) - For stack or recursion.

## Edge Cases

- **Empty queue**: No change
- **Single element**: No change
- **Even number of elements**: Correct reversal
- **Odd number of elements**: Correct reversal

## Applications

- **Queue Manipulation**: Reverse order
- **Algorithm Problems**: Queue operations
- **Data Processing**: Reordering elements
- **Interview Questions**: Common problem

## Practice Tips

- Use stack for straightforward reversal
- Implement recursive version
- Handle empty queue
- Test with different sizes
