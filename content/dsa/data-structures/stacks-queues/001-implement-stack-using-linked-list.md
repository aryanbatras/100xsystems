---
title: "Implement Stack using Linked List"
difficulty: "Easy"
tags: ["stack", "linked-list", "data-structure"]
---

## Problem

Implement a stack data structure using a linked list.

## Example

Stack operations: push(1), push(2), peek() -> 2, pop() -> 2, pop() -> 1

## Solution Approach

### Push
1. Create a new node with the given data
2. Set new.next = top
3. Set top = new

### Pop
1. If top is null, return underflow error
2. data = top.data
3. temp = top
4. top = top.next
5. Free temp
6. Return data

### Peek
1. If top is null, return underflow error
2. Return top.data

### IsEmpty
1. Return top == null

## Time Complexity

O(1) for all operations.

## Space Complexity

O(n) - n elements in stack.

## Edge Cases

- **Pop on empty stack**: Underflow
- **Peek on empty stack**: Underflow
- **Single element**: Works for all operations

## Applications

- **Function Call Stack**: Programming languages
- **Undo Operations**: Text editors
- **Expression Evaluation**: Parsers
- **Browser History**: Back button

## Practice Tips

- Use linked list for dynamic size
- Maintain top pointer
- Handle empty stack cases
- Implement all basic operations
