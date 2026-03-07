---
title: "Doubly Linked List"
difficulty: "Theory"
tags: ["theory", "data-structures", "linked-lists", "doubly-linked-list"]
---

## Doubly Linked List

### What is a Doubly Linked List?

A doubly linked list is a linear data structure where each node contains three fields: data, a reference to the previous node, and a reference to the next node. This bidirectional linking allows traversal in both directions.

### Node Structure

Each node in a doubly linked list contains:
- **Data**: The actual information stored
- **Previous Pointer**: Reference to the previous node
- **Next Pointer**: Reference to the next node

### Key Characteristics

- **Bidirectional Traversal**: Can traverse forward and backward
- **Dynamic Size**: Can grow and shrink dynamically
- **Memory Overhead**: Requires extra space for previous pointers
- **Flexible Operations**: Efficient insertions and deletions at both ends

### Basic Operations

#### Insertion

**Insert at Beginning**:
1. Create a new node with given data
2. Set new node's next to current head
3. Set new node's previous to null
4. If head exists, set head's previous to new node
5. Update head to new node

**Insert at End**:
1. Create a new node with given data
2. If list is empty, set head and tail to new node
3. Otherwise, set new node's previous to current tail
4. Set tail's next to new node
5. Update tail to new node

**Insert at Specific Position**:
1. Traverse to the position before insertion
2. Create a new node with given data
3. Set new node's next to current node's next
4. Set new node's previous to current node
5. If current node has next, set next node's previous to new node
6. Set current node's next to new node

#### Deletion

**Delete from Beginning**:
1. If list is empty, return error
2. Store head node
3. Update head to head's next
4. If new head exists, set its previous to null
5. Free the stored node

**Delete from End**:
1. If list is empty, return error
2. Store tail node
3. Update tail to tail's previous
4. If new tail exists, set its next to null
5. Free the stored node

**Delete at Specific Position**:
1. Traverse to the target node
2. Set previous node's next to target node's next
3. Set next node's previous to target node's previous
4. Free the target node

#### Traversal

**Forward Traversal**:
1. Start from head
2. While current node is not null:
   - Process current node's data
   - Move to next node

**Backward Traversal**:
1. Start from tail
2. While current node is not null:
   - Process current node's data
   - Move to previous node

### Advantages

- **Bidirectional Access**: Can traverse in both directions
- **Efficient End Operations**: O(1) insertions/deletions at ends
- **Flexible Navigation**: Easy to move forward and backward
- **No Size Limitations**: Can grow dynamically

### Disadvantages

- **Memory Overhead**: Extra space for previous pointers
- **Complexity**: More complex implementation than singly linked list
- **Pointer Management**: Need to maintain both next and previous links
- **Memory Usage**: Higher memory consumption

### Comparison with Singly Linked List

| Feature | Singly Linked List | Doubly Linked List |
|---------|-------------------|-------------------|
| Memory | Less (one pointer) | More (two pointers) |
| Traversal | Forward only | Bidirectional |
| End Operations | O(n) | O(1) |
| Insertion/Deletion | O(1) with node reference | O(1) with node reference |
| Complexity | Simpler | More complex |

### Applications

- **Browser History**: Forward and backward navigation
- **Undo/Redo Operations**: Bidirectional operation tracking
- **Music Playlist**: Previous and next track navigation
- **LRU Cache**: Efficient removal of least recently used items
- **Text Editors**: Bidirectional text manipulation

### Implementation Considerations

- **Head and Tail Pointers**: Maintain both for efficient operations
- **Null Handling**: Proper handling of head and tail pointers
- **Memory Management**: Careful allocation and deallocation
- **Circular Doubly Linked List**: Connect head and tail for special cases

### Error Handling

- **Empty List**: Check for null head/tail
- **Invalid Position**: Ensure position within list bounds
- **Memory Allocation**: Handle failed allocations
- **Boundary Operations**: Special care for head and tail operations

## Practice Tips

- Implement all operations using doubly linked nodes
- Practice bidirectional traversal
- Compare with singly linked list implementations
- Study real-world applications requiring bidirectional access
- Understand memory trade-offs and when to use doubly linked lists
