---
title: "Operation on Stacks"
difficulty: "Theory"
tags: ["theory", "data-structures", "stacks", "operations"]
---

## Operations on Stacks

### Core Stack Operations

Stacks support a limited set of operations that maintain the LIFO (Last-In-First-Out) property.

### Push Operation

**Description**: Adds a new element to the top of the stack.

**Algorithm**:
1. Check if stack is full (for bounded stacks)
2. If full, return overflow error
3. Increment top pointer
4. Place new element at top position
5. Return success

**Time Complexity**: O(1)

**Example**:
```
Stack: [1, 2, 3]  (top = 2)
Push(4)
Stack: [1, 2, 3, 4]  (top = 3)
```

### Pop Operation

**Description**: Removes and returns the top element from the stack.

**Algorithm**:
1. Check if stack is empty
2. If empty, return underflow error
3. Store the top element
4. Decrement top pointer
5. Return the stored element

**Time Complexity**: O(1)

**Example**:
```
Stack: [1, 2, 3, 4]  (top = 3)
Pop() -> returns 4
Stack: [1, 2, 3]  (top = 2)
```

### Peek/Top Operation

**Description**: Returns the top element without removing it.

**Algorithm**:
1. Check if stack is empty
2. If empty, return underflow error
3. Return the element at top position

**Time Complexity**: O(1)

**Example**:
```
Stack: [1, 2, 3, 4]  (top = 3)
Peek() -> returns 4
Stack: [1, 2, 3, 4]  (top = 3)
```

### Auxiliary Operations

### isEmpty Operation

**Description**: Checks if the stack contains any elements.

**Algorithm**:
1. Return true if top == -1 (or equivalent empty condition)
2. Return false otherwise

**Time Complexity**: O(1)

### isFull Operation

**Description**: Checks if the stack has reached its maximum capacity.

**Algorithm**:
1. Return true if top == MAX_SIZE - 1
2. Return false otherwise

**Time Complexity**: O(1)

### Size Operation

**Description**: Returns the number of elements currently in the stack.

**Algorithm**:
1. Return top + 1 (for 0-based indexing)

**Time Complexity**: O(1)

### Implementation Considerations

### Array-based Implementation

- **Push**: `arr[++top] = element`
- **Pop**: `element = arr[top--]`
- **Peek**: `return arr[top]`
- **isEmpty**: `return top == -1`
- **isFull**: `return top == MAX_SIZE - 1`

### Linked List Implementation

- **Push**: Create new node, link to current top
- **Pop**: Return top data, move top to next
- **Peek**: Return top data
- **isEmpty**: `return top == null`
- **isFull**: Not applicable (dynamic size)

### Error Handling

- **Stack Overflow**: Attempting push on full stack
- **Stack Underflow**: Attempting pop/peek on empty stack
- Handle gracefully in production code

### Operation Sequences

**Example Sequence**:
```
Initial: []
Push(1): [1]
Push(2): [1, 2]
Push(3): [1, 2, 3]
Peek(): returns 3, stack: [1, 2, 3]
Pop(): returns 3, stack: [1, 2]
Pop(): returns 2, stack: [1]
Pop(): returns 1, stack: []
Pop(): Underflow error
```

## Practice Tips

- Implement all operations using both arrays and linked lists
- Practice error handling for overflow and underflow
- Understand the relationship between operations and LIFO property
- Test operations with various sequences
- Compare time complexities across implementations
