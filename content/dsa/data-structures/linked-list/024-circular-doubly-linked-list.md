---
title: "Circular Doubly Linked List"
difficulty: "Easy"
tags: ["linked-list", "data-structure"]
---

## Problem

Explain the concept of a circular doubly linked list, its structure, advantages, disadvantages, and basic operations.

## Example

A circular doubly linked list is a variation of doubly linked list where the last node points to the first node, and the first node points back to the last node.

Example: 1 <-> 2 <-> 3 <-> 1 (circular)

## Solution Approach

### Structure
- Each node has data, next, prev
- Last.next = first
- First.prev = last
- No null pointers

### Advantages
- Can traverse from any node in both directions
- No need to check for null during traversal
- Efficient for circular operations

### Disadvantages
- More complex to implement
- Extra space for prev pointer
- Harder to detect cycles (but it's designed to be circular)

### Basic Operations
- Insertion: at beginning, end, middle
- Deletion: at beginning, end, middle
- Traversal: forward and backward (infinite loop if not careful)
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
- Single node (points to itself)
- Operations at boundaries

## Applications

- **Round-Robin Scheduling**: CPU scheduling
- **Music Players**: Playlist with loop
- **Undo/Redo**: Circular buffer
- **Game Development**: Circular menus

## Practice Tips

- Understand the circular pointers
- Practice insertion/deletion carefully
- Handle empty and single node cases
- Compare with linear lists
