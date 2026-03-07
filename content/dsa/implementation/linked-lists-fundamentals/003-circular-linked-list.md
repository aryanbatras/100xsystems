---
title: "Circular Linked List"
difficulty: "Theory"
tags: ["theory", "data-structures", "linked-lists", "circular-linked-list"]
---

## Circular Linked List

### What is a Circular Linked List?

A circular linked list is a variation of the linked list where the last node points back to the first node, forming a circular structure. This eliminates the null pointer at the end and allows continuous traversal.

### Types of Circular Linked Lists

#### Singly Circular Linked List
- Each node has data and next pointer
- Last node's next points to the first node
- Can traverse in one direction only

#### Doubly Circular Linked List
- Each node has data, previous, and next pointers
- Last node's next points to first node
- First node's previous points to last node
- Can traverse in both directions

### Key Characteristics

- **Circular Structure**: No null termination, forms a loop
- **Continuous Traversal**: Can traverse indefinitely
- **Memory Efficient**: No need for separate head/tail pointers in some cases
- **Flexible Access**: Any node can be starting point

### Basic Operations

#### Insertion

**Insert at Beginning**:
1. Create a new node with given data
2. If list is empty:
   - Set new node as head
   - Point next to itself
3. Otherwise:
   - Set new node's next to current head
   - Find last node and point its next to new node
   - Update head to new node

**Insert at End**:
1. Create a new node with given data
2. If list is empty, set as head pointing to itself
3. Otherwise:
   - Find last node
   - Set last node's next to new node
   - Set new node's next to head

**Insert at Specific Position**:
1. Traverse to the position before insertion
2. Create a new node with given data
3. Set new node's next to current node's next
4. Set current node's next to new node

#### Deletion

**Delete from Beginning**:
1. If list is empty, return error
2. If only one node, set head to null
3. Otherwise:
   - Find last node
   - Set last node's next to head's next
   - Update head to head's next

**Delete from End**:
1. If list is empty, return error
2. If only one node, set head to null
3. Otherwise:
   - Traverse to second last node
   - Set its next to head

**Delete Specific Node**:
1. Traverse to find the node to delete
2. Set previous node's next to target node's next
3. Free the target node

#### Traversal

**Traversal in Circular List**:
1. Start from head
2. Visit each node until back to head
3. Use a counter or marker to prevent infinite loop

**Finding Length**:
1. Start from head, count nodes
2. Stop when back to head

### Advantages

- **Continuous Access**: No end of list issues
- **Circular Buffers**: Efficient for fixed-size buffers
- **Round-Robin Scheduling**: Fair resource allocation
- **Memory Utilization**: Better space usage in some cases

### Disadvantages

- **Infinite Loops**: Risk during traversal if not careful
- **Complex Operations**: More complex insertion/deletion
- **End Detection**: Need special handling for traversal termination
- **Memory Overhead**: Similar to linear lists

### Applications

- **CPU Scheduling**: Round-robin algorithms
- **Music Playlists**: Continuous playback
- **Multiplayer Games**: Turn-based systems
- **Traffic Light Systems**: Cyclic control
- **Buffer Management**: Circular buffers in networking

### Implementation Considerations

#### Singly Circular Linked List
- **Head Pointer**: Points to first node
- **Traversal**: Continue until back to head
- **Operations**: Careful handling of circular nature

#### Doubly Circular Linked List
- **Head and Tail Pointers**: For efficient operations
- **Bidirectional Traversal**: Forward and backward movement
- **Complex Operations**: More pointers to manage

### Comparison with Linear Linked List

| Feature | Linear Linked List | Circular Linked List |
|---------|-------------------|---------------------|
| Structure | Linear, null-terminated | Circular, loops back |
| Traversal | Stop at null | Continue until back to start |
| Memory | Similar | Similar |
| Access | Sequential | Sequential, continuous |
| Applications | General purpose | Cyclic operations |

### Error Handling

- **Empty List**: Check for null head
- **Single Node**: Special case handling
- **Traversal Bounds**: Prevent infinite loops
- **Memory Management**: Proper node allocation/deallocation

### Special Cases

- **Josephus Problem**: Circular list simulation
- **Round-Robin**: Fair scheduling implementation
- **Music Player**: Playlist looping functionality
- **Token Ring Networks**: Network topology simulation

## Practice Tips

- Implement both singly and doubly circular linked lists
- Practice circular traversal with proper termination
- Study applications requiring circular structures
- Understand differences from linear linked lists
- Implement operations with careful pointer management
