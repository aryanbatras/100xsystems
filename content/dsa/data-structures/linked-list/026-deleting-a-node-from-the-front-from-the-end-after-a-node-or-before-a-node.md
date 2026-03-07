---
title: "Deleting a Node from the Front, from the End, after a Node or before a Node in Circular Doubly Linked List"
difficulty: "Easy"
tags: ["linked-list", "circular-doubly-linked-list"]
---

## Problem

Describe the operations to delete a node in a circular doubly linked list from the front, from the end, after a given node, or before a given node.

## Example

For a circular doubly linked list: 1 <-> 2 <-> 3 <-> 1

- Delete from front: 2 <-> 3 <-> 2

- Delete from end: 1 <-> 2 <-> 1

- Delete after node 1: 1 <-> 3 <-> 1

- Delete before node 3: 1 <-> 2 <-> 1

## Solution Approach

### Delete from Front
1. If head is null, return
2. If head.next == head:
   - head = null
3. Else:
   - head.prev.next = head.next
   - head.next.prev = head.prev
   - head = head.next
4. Free the old head

### Delete from End
1. If head is null, return
2. If head.next == head:
   - head = null
3. Else:
   - tail = head.prev
   - tail.prev.next = head
   - head.prev = tail.prev
4. Free tail

### Delete after a Given Node
1. Given node, if node.next == head, return (can't delete head this way)
2. temp = node.next
3. node.next = temp.next
4. temp.next.prev = node
5. Free temp

### Delete before a Given Node
1. Given node, if node.prev == head, return (can't delete head this way)
2. temp = node.prev
3. node.prev = temp.prev
4. temp.prev.next = node
5. Free temp

## Time Complexity

O(1) - Constant time for all operations.

## Space Complexity

O(1) - No extra space.

## Edge Cases

- **Empty list**: No operation
- **Single node**: Set head to null
- **Deleting head/tail**: Update head pointer
- **Node not found**: No operation

## Applications

- **Circular Doubly Linked List Operations**: Basic deletions
- **Data Structures**: Removing elements in circular lists
- **Dynamic Memory**: Freeing nodes
- **Algorithm Problems**: Common operations

## Practice Tips

- Maintain circular pointers
- Handle head updates
- Free memory properly
- Practice with diagrams
