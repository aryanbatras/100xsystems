---
title: "Types of Queues - Priority Queues, Circular Queues, Double Ended Queues"
difficulty: "Theory"
tags: ["theory", "data-structures", "queues", "advanced-queues"]
---

## Types of Queues

### Priority Queues

**Definition**: A priority queue is an abstract data type where each element has a priority associated with it. Elements with higher priority are served before elements with lower priority.

**Key Characteristics**:
- **Priority-based**: Elements processed based on priority, not insertion order
- **Not strictly FIFO/LIFO**: Order determined by priority values
- **Dynamic priorities**: Priorities can change during execution

**Operations**:
- **Insert**: Add element with associated priority
- **Extract-Max/Min**: Remove and return highest/lowest priority element
- **Peek**: Return highest/lowest priority element without removal
- **Change Priority**: Update priority of existing element

**Implementations**:
- **Binary Heap**: Most common, O(log n) operations
- **Fibonacci Heap**: Better amortized complexity for some operations
- **Sorted Array/List**: Simple but slower operations

**Applications**:
- **CPU Scheduling**: Process scheduling based on priority
- **Dijkstra's Algorithm**: Finding minimum distance nodes
- **Huffman Coding**: Building optimal prefix codes
- **Event Simulation**: Processing events in chronological order

### Circular Queues

**Definition**: A circular queue is a linear data structure that uses a single, fixed-size buffer as if it were connected end-to-end. Also known as a ring buffer.

**Key Characteristics**:
- **Circular Buffer**: Front and rear wrap around array bounds
- **Fixed Size**: Maximum capacity predefined
- **Efficient Space Usage**: No wasted space from linear queue limitations
- **Modulo Arithmetic**: Uses modulo operation for index calculations

**Operations**:
- **Enqueue**: Add element at rear, wrap around if necessary
- **Dequeue**: Remove element from front, wrap around if necessary
- **isFull**: Check if (rear + 1) % size == front
- **isEmpty**: Check if front == rear

**Advantages over Linear Queue**:
- **Better Space Utilization**: No unused space between front and array start
- **No Shifting**: Elements don't need to be shifted after dequeue
- **Memory Efficient**: All allocated space can be used

**Implementation Example**:
```python
class CircularQueue:
    def __init__(self, size):
        self.queue = [None] * size
        self.front = self.rear = -1
        self.size = size
    
    def enqueue(self, item):
        if (self.rear + 1) % self.size == self.front:
            return "Queue is full"
        elif self.front == -1:
            self.front = self.rear = 0
        else:
            self.rear = (self.rear + 1) % self.size
        self.queue[self.rear] = item
    
    def dequeue(self):
        if self.front == -1:
            return "Queue is empty"
        item = self.queue[self.front]
        if self.front == self.rear:
            self.front = self.rear = -1
        else:
            self.front = (self.front + 1) % self.size
        return item
```

**Applications**:
- **Producer-Consumer Problems**: Managing shared buffers
- **Traffic Management**: Handling network packets
- **Audio/Video Buffers**: Streaming media processing
- **Keyboard Input Buffers**: Managing keystroke inputs

### Double Ended Queues (Deque)

**Definition**: A deque (double-ended queue) is a data structure that allows insertion and deletion from both ends. It combines features of both stacks and queues.

**Key Characteristics**:
- **Two Ends**: Operations possible at both front and rear
- **Flexible Access**: Can function as stack, queue, or both
- **Dynamic Size**: Can grow and shrink from both ends
- **Versatile**: Supports multiple access patterns

**Operations**:
- **Insert Front**: Add element at the front
- **Insert Rear**: Add element at the rear
- **Delete Front**: Remove element from the front
- **Delete Rear**: Remove element from the rear
- **Peek Front**: Return front element without removal
- **Peek Rear**: Return rear element without removal

**Types of Deques**:
- **Input Restricted**: Insertions only at one end, deletions at both
- **Output Restricted**: Deletions only at one end, insertions at both

**Implementations**:
- **Doubly Linked List**: O(1) operations at both ends
- **Dynamic Array**: Amortized O(1) operations
- **Circular Array**: Fixed size with wrap-around

**Applications**:
- **Palindrome Checking**: Comparing elements from both ends
- **Browser History**: Forward and backward navigation
- **Undo/Redo Operations**: Managing operation history
- **Sliding Window Problems**: Maintaining window of elements
- **Cache Implementations**: LRU cache with efficient operations

### Comparison of Queue Types

| Feature | Regular Queue | Priority Queue | Circular Queue | Deque |
|---------|---------------|----------------|----------------|-------|
| Access Pattern | FIFO | Priority-based | FIFO | Both ends |
| Time Complexity | O(1) | O(log n) | O(1) | O(1) |
| Space Usage | Good | Good | Excellent | Good |
| Flexibility | Low | Medium | Low | High |
| Use Case | Simple ordering | Scheduling | Buffers | Flexible access |

### Implementation Considerations

- **Priority Queue**: Choose heap implementation for efficiency
- **Circular Queue**: Handle wrap-around carefully
- **Deque**: Consider use case to choose implementation
- **Thread Safety**: Important for concurrent access

## Practice Tips

- Implement each queue type from scratch
- Understand the trade-offs between different implementations
- Practice problems requiring specific queue types
- Study real-world applications of advanced queue structures
- Compare performance characteristics of different approaches
