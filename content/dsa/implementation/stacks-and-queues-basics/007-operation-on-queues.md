---
title: "Operation on Queues"
difficulty: "Theory"
tags: ["theory", "data-structures", "queues", "operations"]
---

## Operations on Queues

### Core Queue Operations

Queues support operations that maintain the FIFO (First-In-First-Out) property.

### Enqueue Operation

**Description**: Adds a new element to the rear of the queue.

**Algorithm**:
1. Check if queue is full (for bounded queues)
2. If full, return overflow error
3. Add new element at rear position
4. Update rear pointer
5. Return success

**Time Complexity**: O(1)

**Example**:
```
Queue: [1, 2, 3]  (front = 0, rear = 2)
Enqueue(4)
Queue: [1, 2, 3, 4]  (front = 0, rear = 3)
```

### Dequeue Operation

**Description**: Removes and returns the front element from the queue.

**Algorithm**:
1. Check if queue is empty
2. If empty, return underflow error
3. Store the front element
4. Update front pointer
5. Return the stored element

**Time Complexity**: O(1)

**Example**:
```
Queue: [1, 2, 3, 4]  (front = 0, rear = 3)
Dequeue() -> returns 1
Queue: [1, 2, 3, 4]  (front = 1, rear = 3)
```

### Front/Peek Operation

**Description**: Returns the front element without removing it.

**Algorithm**:
1. Check if queue is empty
2. If empty, return underflow error
3. Return the element at front position

**Time Complexity**: O(1)

**Example**:
```
Queue: [1, 2, 3, 4]  (front = 1, rear = 3)
Front() -> returns 2
Queue: [1, 2, 3, 4]  (front = 1, rear = 3)
```

### Auxiliary Operations

### isEmpty Operation

**Description**: Checks if the queue contains any elements.

**Algorithm**:
1. Return true if front == rear (or equivalent empty condition)
2. Return false otherwise

**Time Complexity**: O(1)

### isFull Operation

**Description**: Checks if the queue has reached its maximum capacity.

**Algorithm**:
1. Return true if (rear + 1) % MAX_SIZE == front
2. Return false otherwise

**Time Complexity**: O(1)

### Size Operation

**Description**: Returns the number of elements currently in the queue.

**Algorithm**:
1. Return (rear - front + MAX_SIZE) % MAX_SIZE

**Time Complexity**: O(1)

### Implementation Considerations

### Array-based Implementation

- **Linear Queue**: Simple but inefficient space usage
- **Enqueue**: `arr[rear] = element; rear++`
- **Dequeue**: `element = arr[front]; front++`
- **Front**: `return arr[front]`
- **isEmpty**: `return front == rear`
- **isFull**: `return rear == MAX_SIZE`

### Circular Queue Implementation

- **Efficient space usage**: Wraps around array bounds
- **Enqueue**: `arr[rear] = element; rear = (rear + 1) % MAX_SIZE`
- **Dequeue**: `element = arr[front]; front = (front + 1) % MAX_SIZE`
- **Front**: `return arr[front]`
- **isEmpty**: `return front == rear`
- **isFull**: `return (rear + 1) % MAX_SIZE == front`

### Linked List Implementation

- **Dynamic size**: No overflow issues
- **Enqueue**: Add to rear, update rear pointer
- **Dequeue**: Remove from front, update front pointer
- **Front**: Return front data
- **isEmpty**: `return front == null`
- **isFull**: Not applicable

### Error Handling

- **Queue Overflow**: Attempting to enqueue into a full queue
- **Queue Underflow**: Attempting to dequeue from an empty queue
- Handle gracefully in production code

### Operation Sequences

**Example Sequence**:
```
Initial: []
Enqueue(1): [1]
Enqueue(2): [1, 2]
Enqueue(3): [1, 2, 3]
Front(): returns 1, queue: [1, 2, 3]
Dequeue(): returns 1, queue: [2, 3]
Dequeue(): returns 2, queue: [3]
Dequeue(): returns 3, queue: []
Dequeue(): Underflow error
```

### Comparison with Stacks

| Operation | Queue | Stack |
|-----------|-------|-------|
| Insert | Enqueue (rear) | Push (top) |
| Remove | Dequeue (front) | Pop (top) |
| Peek | Front | Top |
| Principle | FIFO | LIFO |
| Ends | Two | One |

## Practice Tips

- Implement queue using arrays, circular arrays, and linked lists
- Practice error handling for overflow and underflow
- Understand the relationship between operations and FIFO property
- Test operations with various sequences
- Compare time complexities across implementations
