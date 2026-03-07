---
title: "Implement Queue using Linked List"
difficulty: "Easy"
tags: ["queue", "linked-list", "data-structure"]
---

## Problem

Implement a queue data structure using a linked list.

## Example

Queue operations: enqueue(1), enqueue(2), peek() -> 1, dequeue() -> 1, dequeue() -> 2

## Solution Approach

### Enqueue
1. Create a new node with the given data
2. If rear is null (queue empty), set front = rear = new
3. Else, set rear.next = new, rear = new

### Dequeue
1. If front is null, return underflow error
2. data = front.data
3. temp = front
4. front = front.next
5. If front is null, rear = null
6. Free temp
7. Return data

### Peek
1. If front is null, return underflow error
2. Return front.data

### IsEmpty
1. Return front == null

## Time Complexity

O(1) for all operations.

## Space Complexity

O(n) - n elements in queue.

## Edge Cases

- **Dequeue on empty queue**: Underflow
- **Peek on empty queue**: Underflow
- **Single element**: Works for all operations

## Applications

- **Task Scheduling**: Operating systems
- **Print Queues**: Printers
- **BFS Traversal**: Graphs
- **Resource Management**: Shared resources

## Practice Tips

- Use linked list for dynamic size
- Maintain front and rear pointers
- Handle empty queue cases
- Implement all basic operations
