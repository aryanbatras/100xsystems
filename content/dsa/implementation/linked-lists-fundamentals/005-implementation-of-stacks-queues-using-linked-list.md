---
title: "Implementation of Stacks & Queues using Linked List"
difficulty: "Theory"
tags: ["theory", "data-structures", "linked-lists", "stacks", "queues"]
---

## Implementation of Stacks & Queues using Linked List

### Why Linked Lists for Stack/Queue Implementation?

Linked lists provide dynamic memory allocation and efficient insertions/deletions, making them ideal for implementing stacks and queues that need to grow and shrink dynamically.

### Stack Implementation using Linked List

#### Node Structure
- **Data**: Element to be stored
- **Next**: Pointer to next node

#### Stack Operations

**Push Operation**:
1. Create a new node with given data
2. Set new node's next to current top
3. Update top to new node
4. Increment size

**Time Complexity**: O(1)

**Pop Operation**:
1. If stack is empty, return error
2. Store current top node
3. Update top to top's next
4. Decrement size
5. Return stored node's data

**Time Complexity**: O(1)

**Peek Operation**:
1. If stack is empty, return error
2. Return top node's data

**Time Complexity**: O(1)

#### Advantages over Array Implementation
- **Dynamic Size**: No overflow issues
- **Memory Efficient**: No pre-allocated space
- **No Size Limit**: Can grow as needed

#### Linked List Stack Code Structure
```python
class Node:
    def __init__(self, data):
        self.data = data
        self.next = None

class LinkedStack:
    def __init__(self):
        self.top = None
        self.size = 0
    
    def push(self, data):
        new_node = Node(data)
        new_node.next = self.top
        self.top = new_node
        self.size += 1
    
    def pop(self):
        if self.is_empty():
            return None
        data = self.top.data
        self.top = self.top.next
        self.size -= 1
        return data
    
    def peek(self):
        return self.top.data if not self.is_empty() else None
    
    def is_empty(self):
        return self.top is None
```

### Queue Implementation using Linked List

#### Node Structure
- **Data**: Element to be stored
- **Next**: Pointer to next node

#### Queue Operations

**Enqueue Operation**:
1. Create a new node with given data
2. If queue is empty:
   - Set front and rear to new node
3. Otherwise:
   - Set rear's next to new node
   - Update rear to new node
4. Increment size

**Time Complexity**: O(1)

**Dequeue Operation**:
1. If queue is empty, return error
2. Store front node's data
3. Update front to front's next
4. If front becomes null, set rear to null
5. Decrement size
6. Return stored data

**Time Complexity**: O(1)

**Front Operation**:
1. If queue is empty, return error
2. Return front node's data

**Time Complexity**: O(1)

#### Advantages over Array Implementation
- **No Circular Array Complexity**: Simpler implementation
- **Dynamic Size**: No fixed capacity
- **Memory Efficient**: No wasted space
- **No Size Constraints**: Can grow indefinitely

#### Linked List Queue Code Structure
```python
class Node:
    def __init__(self, data):
        self.data = data
        self.next = None

class LinkedQueue:
    def __init__(self):
        self.front = None
        self.rear = None
        self.size = 0
    
    def enqueue(self, data):
        new_node = Node(data)
        if self.is_empty():
            self.front = self.rear = new_node
        else:
            self.rear.next = new_node
            self.rear = new_node
        self.size += 1
    
    def dequeue(self):
        if self.is_empty():
            return None
        data = self.front.data
        self.front = self.front.next
        if self.front is None:
            self.rear = None
        self.size -= 1
        return data
    
    def front(self):
        return self.front.data if not self.is_empty() else None
    
    def is_empty(self):
        return self.front is None
```

### Comparison: Linked List vs Array Implementation

#### Stack Comparison

| Aspect | Array Implementation | Linked List Implementation |
|--------|---------------------|---------------------------|
| Push | O(1) amortized | O(1) |
| Pop | O(1) | O(1) |
| Peek | O(1) | O(1) |
| Memory | Fixed size, may waste space | Dynamic, efficient |
| Overflow | Possible | No |

#### Queue Comparison

| Aspect | Array Implementation | Linked List Implementation |
|--------|---------------------|---------------------------|
| Enqueue | O(1) amortized | O(1) |
| Dequeue | O(1) amortized | O(1) |
| Front | O(1) | O(1) |
| Memory | Fixed size, may waste space | Dynamic, efficient |
| Complexity | Circular array needed | Simpler |

### Memory Management

- **Dynamic Allocation**: Nodes allocated as needed
- **No Wasted Space**: Only used nodes consume memory
- **Garbage Collection**: Proper deallocation prevents memory leaks
- **Cache Performance**: May have poorer locality than arrays

### Applications

- **Function Call Stack**: Runtime stack implementation
- **Expression Evaluation**: Stack for parsing
- **Breadth-First Search**: Queue for level-order traversal
- **Job Scheduling**: Queue for task management
- **Undo Mechanisms**: Stack for operation reversal

### Implementation Considerations

- **Null Pointer Handling**: Careful management of front/rear pointers
- **Memory Leaks**: Proper node deallocation
- **Thread Safety**: Synchronization for concurrent access
- **Performance**: Linked lists may have overhead vs arrays

### When to Use Linked Implementation

- **Dynamic Size Requirements**: When size is unpredictable
- **Frequent Insertions/Deletions**: When operations are common
- **Memory Constraints**: When avoiding fixed-size arrays
- **Simplicity**: When implementation simplicity is preferred

## Practice Tips

- Implement both stack and queue using linked lists
- Compare with array-based implementations
- Practice memory management and deallocation
- Study performance differences in different scenarios
- Understand trade-offs between linked and array implementations
