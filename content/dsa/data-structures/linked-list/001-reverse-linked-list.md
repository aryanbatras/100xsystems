---
title: "Reverse a Linked List"
leetcode: "https://leetcode.com/problems/reverse-linked-list/"
difficulty: "Easy"
tags: ["linked-list", "pointers", "basics"]
---

## Problem

Given the head of a singly linked list, reverse the list and return the reversed list.

## Example

**Input:** head = [1,2,3,4,5]
**Output:** [5,4,3,2,1]
**Explanation:** The linked list is completely reversed.

**Input:** head = [1,2]
**Output:** [2,1]
**Explanation:** The two nodes are swapped.

**Input:** head = []
**Output:** []
**Explanation:** Empty list remains empty.

## Solution Approach

### Iterative Method
1. Initialize three pointers: `prev = null`, `current = head`, `next = null`
2. Traverse the list:
   - Store `next = current.next` (before changing the link)
   - Point `current.next` to `prev` (reverse the link)
   - Move `prev = current` and `current = next`
3. When `current` becomes null, `prev` is the new head

### Recursive Method
1. Base case: If head is null or has only one node, return head
2. Recursively reverse the rest of the list
3. Adjust the links:
   - `head.next.next = head` (make current head point to previous node)
   - `head.next = null` (break original forward link)
4. Return the new head from recursive call

## Time Complexity

O(n) - We visit each node exactly once.

## Space Complexity

- **Iterative**: O(1) - Only constant extra space
- **Recursive**: O(n) - Due to recursion stack

## Implementation

```python
# Definition for singly-linked list
class ListNode:
    def __init__(self, val=0, next=None):
        self.val = val
        self.next = next

# Iterative solution
def reverse_linked_list_iterative(head):
    prev = None
    current = head
    
    while current:
        next_node = current.next  # Store next node
        current.next = prev        # Reverse current node's pointer
        prev = current           # Move prev one step forward
        current = next_node       # Move current one step forward
    
    return prev  # prev is the new head

# Recursive solution
def reverse_linked_list_recursive(head):
    # Base case
    if not head or not head.next:
        return head
    
    # Recursively reverse the rest of the list
    new_head = reverse_linked_list_recursive(head.next)
    
    # Adjust links
    head.next.next = head
    head.next = None
    
    return new_head

# Helper function to create linked list for testing
def create_linked_list(values):
    if not values:
        return None
    
    head = ListNode(values[0])
    current = head
    
    for val in values[1:]:
        current.next = ListNode(val)
        current = current.next
    
    return head

# Helper function to convert linked list to list
def linked_list_to_list(head):
    result = []
    current = head
    
    while current:
        result.append(current.val)
        current = current.next
    
    return result

# Test the implementation
def test_reverse():
    # Test case 1
    head1 = create_linked_list([1, 2, 3, 4, 5])
    reversed1 = reverse_linked_list_iterative(head1)
    print(f"Original: [1,2,3,4,5], Reversed: {linked_list_to_list(reversed1)}")
    
    # Test case 2
    head2 = create_linked_list([1, 2])
    reversed2 = reverse_linked_list_iterative(head2)
    print(f"Original: [1,2], Reversed: {linked_list_to_list(reversed2)}")
    
    # Test case 3
    head3 = create_linked_list([])
    reversed3 = reverse_linked_list_iterative(head3)
    print(f"Original: [], Reversed: {linked_list_to_list(reversed3)}")

# In-place modification version
def reverse_linked_list_inplace(head):
    """
    Reverses the linked list in place and returns the new head.
    """
    prev = None
    current = head
    
    while current is not None:
        # Store the next node before we overwrite current.next
        next_temp = current.next
        
        # Reverse the pointer
        current.next = prev
        
        # Move pointers one position ahead
        prev = current
        current = next_temp
    
    # prev is now the head of the reversed list
    return prev
```

## Step-by-Step Example (Iterative)

For list [1,2,3,4,5]:

1. **Initial**: prev=None, current=1→2→3→4→5
2. **Step 1**: 
   - next=2→3→4→5
   - 1.next=null
   - prev=1, current=2→3→4→5
3. **Step 2**:
   - next=3→4→5
   - 2.next=1
   - prev=2→1, current=3→4→5
4. **Step 3**:
   - next=4→5
   - 3.next=2→1
   - prev=3→2→1, current=4→5
5. **Step 4**:
   - next=5
   - 4.next=3→2→1
   - prev=4→3→2→1, current=5
6. **Step 5**:
   - next=null
   - 5.next=4→3→2→1
   - prev=5→4→3→2→1, current=null
7. **Result**: Return prev = 5→4→3→2→1

## Edge Cases

- **Empty List**: Return null
- **Single Node**: Return the same node
- **Two Nodes**: Swap their positions
- **Circular List**: Would cause infinite loop (not in this problem)
- **Large List**: Algorithm works for any size

## Variations

### Reverse Between Positions
```python
def reverse_between(head, left, right):
    """
    Reverse nodes from position left to right.
    """
    if not head or left == right:
        return head
    
    # Dummy node to handle edge cases
    dummy = ListNode(0)
    dummy.next = head
    prev = dummy
    
    # Move to node before position left
    for _ in range(left - 1):
        prev = prev.next
    
    # Reverse the sublist
    reverse_start = prev.next
    reverse_end = reverse_start
    
    for _ in range(right - left):
        reverse_end = reverse_end.next
    
    # Reverse the sublist
    prev.next = reverse_sublist(reverse_start, reverse_end)
    
    return dummy.next
```

### Reverse in Groups of K
```python
def reverse_in_groups(head, k):
    """
    Reverse nodes of the list in groups of size k.
    """
    if not head or k == 1:
        return head
    
    dummy = ListNode(0)
    dummy.next = head
    prev = dummy
    
    while prev.next:
        # Check if there are k nodes remaining
        tail = prev
        for _ in range(k):
            tail = tail.next
            if not tail:
                return dummy.next
        
        # Reverse k nodes
        reverse_head = reverse_k_nodes(prev.next, tail)
        prev.next = reverse_head
        prev = prev.next
    
    return dummy.next
```

## Applications

- **Data Structure Manipulation**: Fundamental linked list operation
- **Algorithm Building**: Used in many other algorithms
- **Memory Management**: Reversing memory allocation order
- **Data Processing**: Reverse order processing
- **Interview Preparation**: Classic pointer manipulation problem

## Practice Tips

- Draw the list and pointer movements on paper
- Practice both iterative and recursive approaches
- Understand the three-pointer technique
- Master edge case handling
- Test with various list sizes

## Common Mistakes

- Losing reference to remaining list when reversing
- Not handling empty list correctly
- Forgetting to update all three pointers
- Creating cycles instead of reversing
- Not returning the correct new head

## Related Problems

- Reverse linked list II (reverse between positions)
- Reverse nodes in k-group
- Palindrome linked list
- Add two numbers represented by linked lists
- Swap nodes in pairs
