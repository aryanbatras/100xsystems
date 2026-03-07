---
title: "Doubly Linked List"
difficulty: "Easy"
tags: ["linked-list", "data-structure"]
---

## Problem

Explain the concept of a doubly linked list, its structure, advantages, disadvantages, and basic operations.

## Example

A doubly linked list is a linear data structure where each node contains three fields: data, next pointer, and prev pointer.

Example: 1 <-> 2 <-> 3 <-> null

## Solution Approach

### Structure
- Each node has:
  - data: the value
  - next: pointer to next node
  - prev: pointer to previous node

### Advantages
- Can traverse in both directions
- Easier insertion and deletion (no need to traverse from head for some operations)
- Can be used for stacks, queues, deques

### Disadvantages
- Extra space for prev pointer
- More complex operations

### Basic Operations
- Insertion: at beginning, end, middle
- Deletion: at beginning, end, middle
- Traversal: forward and backward
- Search: linear search

## Time Complexity

- Access: O(n)
- Search: O(n)
- Insertion: O(1) at ends, O(n) in middle
- Deletion: O(1) at ends, O(n) in middle

## Space Complexity

O(n) - For n nodes.

## Edge Cases

- Empty list
- Single node
- Operations at boundaries

## Applications

- Browser history (forward/backward)
- Undo/Redo functionality
- LRU Cache implementation
- Music player playlists

## Practice Tips

- Understand the pointers
- Practice insertion/deletion
- Compare with singly linked list
- Implement basic operations
