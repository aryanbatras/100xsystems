---
title: "Adding a Node at the Front, at the End, after a Node or before a Node in Circular Doubly Linked List"
difficulty: "Easy"
tags: ["linked-list", "circular-doubly-linked-list"]
---

## Problem

Describe the operations to add a new node in a circular doubly linked list at the front, at the end, after a given node, or before a given node.

## Example

For a circular doubly linked list: 1 <-> 2 <-> 3 <-> 1

- Add at front (0): 0 <-> 1 <-> 2 <-> 3 <-> 0

- Add at end (4): 1 <-> 2 <-> 3 <-> 4 <-> 1

- Add after node 2 (2.5): 1 <-> 2 <-> 2.5 <-> 3 <-> 1

- Add before node 2 (1.5): 1 <-> 1.5 <-> 2 <-> 3 <-> 1

## Solution Approach

### Add at Front
1. Create a new node with the given data
2. If head is null:
   - head = new
   - new.next = new
   - new.prev = new
3. Else:
   - new.next = head
   - new.prev = head.prev
   - head.prev.next = new
   - head.prev = new
   - head = new

### Add at End
1. Create a new node with the given data
2. If head is null:
   - head = new
   - new.next = new
   - new.prev = new
3. Else:
   - new.next = head
   - new.prev = head.prev
   - head.prev.next = new
   - head.prev = new

### Add after a Given Node
1. Given a node, create a new node with data
2. new.next = node.next
3. new.prev = node
4. node.next.prev = new
5. node.next = new

### Add before a Given Node
1. Given a node, create a new node with data
2. new.prev = node.prev
3. new.next = node
4. node.prev.next = new
5. node.prev = new

## Time Complexity

O(1) - Constant time for all operations.

## Space Complexity

O(1) - Only one new node.

## Edge Cases

- **Empty list**: For front/end, create first node
- **Single node**: Handle circular pointers
- **Adding before/after**: Update all pointers
- **Node is the only one**: Maintain circularity

## Applications

- **Circular Doubly Linked List Operations**: Basic insertions
- **Data Structures**: Building blocks for circular structures
- **Dynamic Memory**: Adding elements in circular lists
- **Algorithm Problems**: Common operations

## Practice Tips

- Always maintain circular pointers
- Handle empty list cases
- Update prev and next for all affected nodes
- Practice with diagrams
