---
title: "Deleting a Node from the Front, from the End, after a Node or before a Node"
difficulty: "Easy"
tags: ["linked-list", "doubly-linked-list"]
---

## Problem

Describe the operations to delete a node in a doubly linked list from the front, from the end, after a given node, or before a given node.

## Example

For a doubly linked list: 1 <-> 2 <-> 3

- Delete from front: 2 <-> 3

- Delete from end: 1 <-> 2

- Delete after node 1: 1 <-> 3

- Delete before node 3: 1 <-> 2

## Solution Approach

### Delete from Front
1. If head is null, return
2. temp = head
3. head = head.next
4. If head is not null, head.prev = null
5. Else, tail = null
6. Free temp

### Delete from End
1. If tail is null, return
2. temp = tail
3. tail = tail.prev
4. If tail is not null, tail.next = null
5. Else, head = null
6. Free temp

### Delete after a Given Node
1. Given node, if node.next is null, return
2. temp = node.next
3. node.next = temp.next
4. If temp.next is not null, temp.next.prev = node
5. Free temp

### Delete before a Given Node
1. Given node, if node.prev is null, return
2. temp = node.prev
3. node.prev = temp.prev
4. If temp.prev is not null, temp.prev.next = node
5. Free temp

## Time Complexity

O(1) - Constant time for all operations.

## Space Complexity

O(1) - No extra space.

## Edge Cases

- **Empty list**: No operation
- **Single node**: Set head and tail to null
- **Deleting head/tail**: Update head/tail pointers
- **Node not found**: No operation

## Applications

- **Doubly Linked List Operations**: Basic deletions
- **Data Structures**: Removing elements
- **Dynamic Memory**: Freeing nodes
- **Algorithm Problems**: Common operations

## Practice Tips

- Always update both prev and next pointers
- Handle head and tail updates
- Free memory properly
- Practice with diagrams
