---
title: "Adding a Node at the Front, at the End, after a Node or before a Node"
difficulty: "Easy"
tags: ["linked-list", "doubly-linked-list"]
---

## Problem

Describe the operations to add a new node in a doubly linked list at the front, at the end, after a given node, or before a given node.

## Example

For a doubly linked list: 1 <-> 2 <-> 3

- Add at front (0): 0 <-> 1 <-> 2 <-> 3

- Add at end (4): 1 <-> 2 <-> 3 <-> 4

- Add after node 2 (say 2.5): 1 <-> 2 <-> 2.5 <-> 3

- Add before node 2 (say 1.5): 1 <-> 1.5 <-> 2 <-> 3

## Solution Approach

### Add at Front
1. Create a new node with the given data
2. Set new.next = head
3. If head is not null, set head.prev = new
4. Set head = new
5. If tail is null (empty list), set tail = new

### Add at End
1. Create a new node with the given data
2. If head is null (empty list), set head = new, tail = new
3. Else:
   - Set tail.next = new
   - Set new.prev = tail
   - Set tail = new

### Add after a Given Node
1. Given a node, create a new node with data
2. Set new.next = node.next
3. If node.next is not null, set node.next.prev = new
4. Set node.next = new
5. Set new.prev = node

### Add before a Given Node
1. Given a node, create a new node with data
2. Set new.prev = node.prev
3. If node.prev is not null, set node.prev.next = new
4. Set node.prev = new
5. Set new.next = node

## Time Complexity

O(1) - Constant time for all operations.

## Space Complexity

O(1) - Only one new node.

## Edge Cases

- **Empty list**: For front/end, set head and tail
- **Single node**: Handle prev/next pointers
- **Adding before head**: Update head
- **Adding after tail**: Update tail

## Applications

- **Doubly Linked List Operations**: Basic insertions
- **Data Structures**: Building blocks
- **Dynamic Memory**: Adding elements
- **Algorithm Problems**: Common operations

## Practice Tips

- Always update both prev and next pointers
- Handle empty list cases
- Consider head and tail updates
- Practice with diagrams
