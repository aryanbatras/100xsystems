---
title: "Middle of the Linked List"
leetcode: "https://leetcode.com/problems/middle-of-the-linked-list/"
difficulty: "Easy"
tags: ["linked-list", "two-pointers", "tortoise-hare"]
---

## Problem

Given the head of a singly linked list, return the middle node of the linked list. If there are two middle nodes, return the second middle node.

## Example

**Input:** head = [1,2,3,4,5]
**Output:** [3,4,5]
**Explanation:** The middle node is 3 (second node of first half).

**Input:** head = [1,2,3,4,5,6]
**Output:** [4,5,6]
**Explanation:** Since the list has an even number of nodes, we return the second middle node (4).

## Solution Approaches

### Method 1: Brute Force (Two Pass)
1. First pass: Count the total number of nodes (n)
2. Second pass: Go to node at position n//2 + 1
3. Return that node

### Method 2: Tortoise and Hare (Optimal)
1. Use two pointers: `slow` and `fast`
2. `slow` moves one step at a time
3. `fast` moves two steps at a time
4. When `fast` reaches the end, `slow` is at the middle
5. For even length, `slow` will be at the second middle node

## Time Complexity

- **Method 1**: O(n) - Two passes through the list
- **Method 2**: O(n) - Single pass through the list

## Space Complexity

O(1) - Only constant extra space for pointers.

## Implementation

```python
# Definition for singly-linked list
class ListNode:
    def __init__(self, val=0, next=None):
        self.val = val
        self.next = next

# Method 1: Two pass approach
def middle_node_two_pass(head):
    """
    Find middle node using two passes.
    """
    if not head:
        return None
    
    # First pass: count nodes
    count = 0
    current = head
    while current:
        count += 1
        current = current.next
    
    # Second pass: find middle
    middle_pos = count // 2 + 1  # Second middle for even length
    current = head
    
    for _ in range(middle_pos - 1):
        current = current.next
    
    return current

# Method 2: Tortoise and Hare (Optimal)
def middle_node_tortoise_hare(head):
    """
    Find middle node using slow and fast pointers.
    """
    if not head:
        return None
    
    slow = head
    fast = head
    
    # Move fast twice as fast as slow
    while fast and fast.next:
        slow = slow.next      # Move one step
        fast = fast.next.next  # Move two steps
    
    # When fast reaches end, slow is at middle
    return slow

# Detailed version with comments
def middle_node_detailed(head):
    """
    Detailed implementation with step-by-step comments.
    """
    if not head:
        print("Empty list")
        return None
    
    slow = head
    fast = head
    step = 0
    
    print("Starting Tortoise and Hare algorithm")
    print(f"Initial: slow={slow.val}, fast={fast.val}")
    
    while fast and fast.next:
        step += 1
        slow = slow.next
        fast = fast.next.next
        
        if fast:
            print(f"Step {step}: slow={slow.val}, fast={fast.val}")
        else:
            print(f"Step {step}: slow={slow.val}, fast reached end")
    
    print(f"Middle node found: {slow.val}")
    return slow

# Helper functions for testing
def create_linked_list(values):
    if not values:
        return None
    
    head = ListNode(values[0])
    current = head
    
    for val in values[1:]:
        current.next = ListNode(val)
        current = current.next
    
    return head

def linked_list_to_list(head):
    result = []
    current = head
    
    while current:
        result.append(current.val)
        current = current.next
    
    return result

def get_tail_and_length(head):
    """Helper to get tail and length for testing"""
    length = 0
    current = head
    
    while current:
        length += 1
        if not current.next:
            return current, length
        current = current.next
    
    return None, length

# Test function
def test_middle_node():
    test_cases = [
        [1, 2, 3, 4, 5],      # Odd length
        [1, 2, 3, 4, 5, 6],   # Even length
        [1],                      # Single node
        [],                        # Empty list
        [1, 2]                    # Two nodes
    ]
    
    for i, values in enumerate(test_cases):
        print(f"\nTest Case {i + 1}: {values}")
        
        head = create_linked_list(values)
        
        # Test both methods
        result1 = middle_node_two_pass(head)
        head2 = create_linked_list(values)  # Recreate for second test
        result2 = middle_node_tortoise_hare(head2)
        
        if result1:
            print(f"Two Pass Method: {result1.val}")
        if result2:
            print(f"Tortoise Hare: {result2.val}")
        
        # Verify both methods give same result
        assert result1 == result2, "Methods should give same result"
```

## Step-by-Step Example (Tortoise and Hare)

For list [1,2,3,4,5,6]:

1. **Initial**: slow=1, fast=1
2. **Step 1**: 
   - slow moves to 2
   - fast moves to 3
   - State: slow=2, fast=3
3. **Step 2**:
   - slow moves to 3
   - fast moves to 5
   - State: slow=3, fast=5
4. **Step 3**:
   - slow moves to 4
   - fast moves to null (5.next.next)
   - Loop ends
5. **Result**: slow is at 4 (second middle node)

For list [1,2,3,4,5]:

1. **Initial**: slow=1, fast=1
2. **Step 1**: 
   - slow moves to 2
   - fast moves to 3
   - State: slow=2, fast=3
3. **Step 2**:
   - slow moves to 3
   - fast moves to null (3.next.next)
   - Loop ends
4. **Result**: slow is at 3 (middle node)

## Why Tortoise and Hare Works

- **Speed Ratio**: Fast pointer moves twice as fast as slow
- **Position Relationship**: When fast travels 2x distance, slow travels x distance
- **Middle Detection**: When fast reaches end, slow has traveled half the distance
- **Even Length**: Fast reaches null, slow is at second middle
- **Odd Length**: Fast reaches last node, slow is at exact middle

## Edge Cases

- **Empty List**: Return null
- **Single Node**: Return that node
- **Two Nodes**: Return second node (as per problem requirement)
- **Large List**: Algorithm works efficiently for any size

## Variations

### Return First Middle for Even Length
```python
def middle_node_first_even(head):
    """
    Return first middle node for even length lists.
    """
    slow = head
    fast = head
    
    while fast and fast.next and fast.next.next:
        slow = slow.next
        fast = fast.next.next
    
    return slow
```

### Find Both Middles for Even Length
```python
def middle_nodes_even(head):
    """
    Return both middle nodes for even length lists.
    """
    slow = head
    fast = head
    
    while fast and fast.next and fast.next.next:
        slow = slow.next
        fast = fast.next.next
    
    # For even length, slow is at first middle
    if fast and fast.next:
        return slow, slow.next  # Both middle nodes
    else:
        return slow, None  # Only one middle (odd length)
```

## Applications

- **Data Partitioning**: Split list into two halves
- **Algorithm Optimization**: Find median in linked list
- **Load Balancing**: Distribute workload evenly
- **Tree Construction**: Build balanced BST from linked list
- **Performance Analysis**: Middle element access patterns

## Practice Tips

- Understand the pointer speed relationship
- Practice with both odd and even length lists
- Visualize the pointer movements
- Master the while loop condition
- Test edge cases thoroughly

## Common Mistakes

- Wrong loop condition (`fast.next.next` without checking `fast.next`)
- Not handling empty list case
- Forgetting to move slow pointer correctly
- Off-by-one errors in position calculation
- Not understanding why we get second middle for even length

## Related Problems

- Delete middle node
- Palindrome linked list
- Reverse linked list
- Merge two sorted lists
- Detect cycle in linked list
