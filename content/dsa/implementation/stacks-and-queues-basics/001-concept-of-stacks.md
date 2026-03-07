---
title: "Concept of Stacks"
difficulty: "Theory"
tags: ["theory", "data-structures", "stacks"]
---

## Concept of Stacks

### What is a Stack?

A stack is a linear data structure that follows the Last-In-First-Out (LIFO) principle. Elements are added and removed from the same end, called the top of the stack.

### Key Characteristics

- **LIFO Principle**: Last element added is the first to be removed
- **Single Access Point**: All operations occur at the top
- **Linear Structure**: Elements arranged in a straight line
- **Dynamic Size**: Can grow and shrink as elements are added/removed

### Stack Operations

**Primary Operations:**
- **Push**: Add an element to the top of the stack
- **Pop**: Remove and return the top element
- **Peek/Top**: Return the top element without removing it

**Auxiliary Operations:**
- **isEmpty**: Check if stack is empty
- **isFull**: Check if stack is full (for bounded stacks)
- **Size**: Return number of elements in stack

### Stack Implementation

**Using Arrays:**
- Fixed or dynamic array to store elements
- Top pointer/index to track current top position
- Push: Add element at top index, increment top
- Pop: Decrement top, return element at top

**Using Linked Lists:**
- Each node points to the next element
- Top pointer points to the first node
- Push: Create new node, point to current top, update top
- Pop: Return top element, move top to next node

### Stack Applications

- **Function Call Management**: Call stack in programming languages
- **Expression Evaluation**: Converting infix to postfix/prefix
- **Backtracking Algorithms**: Exploring different paths
- **Undo Mechanisms**: Reversing operations
- **Browser History**: Back button functionality
- **Text Editors**: Undo/redo operations

### Stack in Programming Languages

- **Java**: `java.util.Stack`
- **C++**: `std::stack`
- **Python**: `list` with append/pop operations
- **JavaScript**: Arrays with push/pop methods

### Advantages

- **Simple Implementation**: Easy to understand and implement
- **Efficient Operations**: O(1) time for push, pop, peek
- **Memory Efficient**: Minimal overhead
- **Versatile**: Used in many algorithms and applications

### Limitations

- **Limited Access**: Only top element accessible
- **No Random Access**: Cannot access elements in middle
- **Potential Overflow**: Fixed-size stacks can overflow
- **No Built-in Search**: Cannot search for specific elements

### Stack Overflow and Underflow

- **Stack Overflow**: Attempting to push onto a full stack
- **Stack Underflow**: Attempting to pop from an empty stack
- Both conditions require proper error handling

## Practice Tips

- Implement stack using both arrays and linked lists
- Practice basic stack operations
- Understand LIFO principle through examples
- Study real-world applications of stacks
- Learn about call stack and recursion relationship
